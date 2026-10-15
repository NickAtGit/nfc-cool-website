"""blog_mac raw GLB: a MacBook with the external USB-C NFC reader, for the blog's phone figures.

A generic 14-inch MacBook, built here from plain shapes (no model exists in NFCcoolScenes):
silver aluminium, the lid open about 108 degrees, a black glass front with a thin bezel and the
notch, a 16:10 display, a black keyboard well with a key grid, and the trackpad. No logo or
wordmark, like every prop in the scenes. Beside it on the right sits the External Reader scene's
desktop reader (NFCcoolScenes scripts/ipadreader_scene.py, built by the scene's own functions,
light green, the NFC.cool card on it), its cable plugged into the laptop's right-hand USB-C port.

The player paints the display: mesh MacDisplay, a plain black 16:10 rectangle with UVs over it
(v = 1 at the top). The notch (MacNotch) sits just in front of the display's top edge, over the
middle of the menu bar, as on the real machine, so a full-screen capture lands under it the way
macOS draws it.

Everything hangs under the root node Device, turned so the display faces Blender +Y (glTF -Z)
with its top up, the scenes' phone convention. The desk tilts with it: seen straight on, the
laptop is seen from a little above, the keyboard deck and the reader foreshortened below the
lid. Slim the result like the blog phone (Scripts/scenes/blog-phone.mjs).

  SCENES=~/Developer/NFCcoolScenes
  $SCENES/scripts/blender.sh -P "$PWD/Scripts/scenes/blog-mac.py" -- <out.glb>
"""

import math
import sys
from pathlib import Path

import bmesh
import bpy
from mathutils import Matrix, Vector

SCENES = Path.cwd()  # blender.sh runs from the NFCcoolScenes root
sys.path.insert(0, str(SCENES / "scripts"))
import scene_kit  # noqa: E402

# Importing the scene module runs its command line (kit.run) at the bottom: make that a no-op,
# so only its builders are loaded.
scene_kit.run = lambda *args, **kwargs: None
import ipadreader_params as curves  # noqa: E402
import ipadreader_scene as scene  # noqa: E402
import motion  # noqa: E402
from scene_kit import rot  # noqa: E402
from scenelib import materials, mesh, shapes  # noqa: E402

out = Path(sys.argv[sys.argv.index("--") + 1]).resolve()

# The desk: Z up, the laptop's front towards -Y, its right side towards +X. Metres.
BASE_W, BASE_D, BASE_H = 0.3126, 0.2212, 0.0105
CORNER = 0.0105
LID_H, LID_T = 0.2140, 0.0048
OPEN_DEG = 108
GLASS_RIM = 0.0012
DISPLAY_W = 0.3000
DISPLAY_H = DISPLAY_W * 10 / 16
TOP_BEZEL = 0.0045
NOTCH_W, NOTCH_H = 0.031, 0.0062
PITCH = 0.0185  # key pitch: the 14.5-unit rows are 268 mm wide
KEY_GAP = 0.0026
PORT_Y, PORT_Z = 0.068, BASE_H * 0.47
READER_AT = (BASE_W / 2 + 0.072, -0.035)
READER_YAW = 22

bpy.ops.wm.read_factory_settings(use_empty=True)

aluminium = materials.principled("MacAluminium", "#D3D7DD", roughness=0.4, metallic=0.8)
glass = materials.principled("MacGlass", "#08090B", roughness=0.35)
display_material = materials.principled("MacDisplay", "#000000", roughness=0.4)
well = materials.principled("MacKeyboardWell", "#0D0E10", roughness=0.7)
keycap = materials.principled("MacKeys", "#151618", roughness=0.62)
pad_gap = materials.principled("MacTrackpadGap", "#8C8F94", roughness=0.5, metallic=0.5)
trackpad = materials.principled("MacTrackpad", "#C9CCD1", roughness=0.28, metallic=0.7)
hinge = materials.principled("MacHinge", "#26272A", roughness=0.45, metallic=0.4)
port = materials.principled("MacPort", "#050506", roughness=0.7)


def rounded_prisms(name, rects, z0, z1, material, parent, steps=3):
    """One mesh of rounded-rectangle prisms, (x0, x1, y0, y1, radius) each: the keys."""
    shape = bmesh.new()
    for x0, x1, y0, y1, radius in rects:
        outline = shapes.rounded_outline(x0, x1, y0, y1, radius, steps)
        low = [shape.verts.new((x, y, z0)) for x, y in outline]
        high = [shape.verts.new((x, y, z1)) for x, y in outline]
        shape.faces.new(high)
        shape.faces.new(list(reversed(low)))
        count = len(outline)
        for i in range(count):
            j = (i + 1) % count
            shape.faces.new((low[i], low[j], high[j], high[i]))
    return mesh._object(name, shape, [material], parent, smooth=False, recalc=True)


def flat(name, x0, x1, y0, y1, radius, z, material, parent, steps=6):
    return scene_kit.flat_mesh_object(name, shapes.rounded_outline(x0, x1, y0, y1, radius, steps), material,
                                      parent, Matrix.Translation((0, 0, z)))


# The base ---------------------------------------------------------------------------------------

base = bpy.data.objects.new("MacBase", None)
bpy.context.scene.collection.objects.link(base)
profile = [(0.0016, 0.0), (0.0005, 0.0005), (0.0, 0.0018), (0.0, BASE_H - 0.0009),
           (0.0003, BASE_H - 0.0002), (0.0008, BASE_H)]
scene.profiled_slab("MacBaseBody", BASE_W, BASE_D, CORNER, profile, [aluminium, aluminium, aluminium], base, steps=12)

# Keyboard: an Apple-style layout in key units, rows back to front. Each entry is a width, or
# (width, "arrows") for the inverted-T block.
ROWS = [
    [1.5] + [1] * 12 + [1],                    # esc, F1-F12, Touch ID
    [1] * 13 + [1.5],                          # ` 1-0 - = delete
    [1.5] + [1] * 13,                          # tab q-] \
    [1.75] + [1] * 11 + [1.75],                # caps a-' return
    [2.25] + [1] * 10 + [2.25],                # shift z-/ shift
    [1, 1, 1, 1.25, 5, 1.25, 1, "arrows"],     # fn ctrl opt cmd space cmd opt, arrows
]
rows_d = len(ROWS) * PITCH
kb_w = 14.5 * PITCH
kb_back = BASE_D / 2 - 0.0165
keys = []
for r, row in enumerate(ROWS):
    y1 = kb_back - r * PITCH - KEY_GAP / 2
    y0 = y1 - PITCH + KEY_GAP
    x = -kb_w / 2
    for width in row:
        if width == "arrows":
            half = (PITCH - KEY_GAP) / 2 - 0.0004
            for k in range(3):
                kx0, kx1 = x + k * PITCH + KEY_GAP / 2, x + (k + 1) * PITCH - KEY_GAP / 2
                if k == 1:
                    keys.append((kx0, kx1, y1 - half, y1, 0.0012))
                keys.append((kx0, kx1, y0, y0 + half, 0.0012))
            x += 3 * PITCH
            continue
        keys.append((x + KEY_GAP / 2, x + width * PITCH - KEY_GAP / 2, y0, y1, 0.0016))
        x += width * PITCH
margin = 0.0016
flat("MacKeyboardWell", -kb_w / 2 - margin, kb_w / 2 + margin, kb_back - rows_d - margin, kb_back + margin, 0.003,
     BASE_H + 0.00004, well, base)
rounded_prisms("MacKeys", keys, BASE_H, BASE_H + 0.0007, keycap, base)

pad_w, pad_d = 0.136, 0.082
pad_y = kb_back - rows_d - 0.011 - pad_d / 2
flat("MacTrackpadGap", -pad_w / 2 - 0.0007, pad_w / 2 + 0.0007, pad_y - pad_d / 2 - 0.0007, pad_y + pad_d / 2 + 0.0007,
     0.0055, BASE_H + 0.00004, pad_gap, base)
flat("MacTrackpad", -pad_w / 2, pad_w / 2, pad_y - pad_d / 2, pad_y + pad_d / 2, 0.005, BASE_H + 0.00008, trackpad, base)

# The right-hand USB-C port, a dark stadium in the side, towards the back.
slot = shapes.rounded_outline(-0.0045, 0.0045, -0.00135, 0.00135, 0.00134, 8)
scene_kit.flat_mesh_object("MacPort", slot, port, base,
                           Matrix.Translation((BASE_W / 2 + 0.00004, PORT_Y, PORT_Z)) @ rot("Y", 90) @ rot("Z", 90))

# The hinge: a dark bar along the back, between the base and the lid.
hinge_bar = mesh.lathe("MacHinge", [(0.0, -0.13), (0.0036, -0.13), (0.0036, 0.13), (0.0, 0.13)], hinge, base, segments=20)
hinge_bar.matrix_basis = Matrix.Translation((0, BASE_D / 2 - 0.0036, BASE_H - 0.0006)) @ rot("Y", 90)

# The lid ----------------------------------------------------------------------------------------
# Built lying flat, its hinge edge on the local X axis, up the lid along +Y and the screen on +Z;
# opened about the hinge so the screen faces the viewer, tilted back by OPEN_DEG - 90.

lid = bpy.data.objects.new("MacLid", None)
bpy.context.scene.collection.objects.link(lid)
lid_body = scene.profiled_slab("MacLidBody", BASE_W, LID_H, CORNER,
                               [(0.0006, 0.0), (0.0, 0.0006), (0.0, LID_T - 0.0010), (0.0003, LID_T - 0.0005)],
                               [aluminium, aluminium, aluminium], lid, steps=12)
glass_slab = scene.profiled_slab("MacGlass", BASE_W - 2 * GLASS_RIM, LID_H - 2 * GLASS_RIM, CORNER - GLASS_RIM,
                                 [(0.0, LID_T - 0.0009), (0.0, LID_T - 0.0001), (0.0001, LID_T)], [glass, glass, glass],
                                 lid, steps=12)
for part in (lid_body, glass_slab):
    part.matrix_basis = Matrix.Translation((0, LID_H / 2, 0))
display_top = LID_H - GLASS_RIM - TOP_BEZEL
display_y = display_top - DISPLAY_H / 2
display_mesh = bpy.data.meshes.new("MacDisplay")
w2, h2 = DISPLAY_W / 2, DISPLAY_H / 2
display_mesh.from_pydata([(-w2, -h2, 0), (w2, -h2, 0), (w2, h2, 0), (-w2, h2, 0)], [], [(0, 1, 2, 3)])
display_mesh.uv_layers.new(name="UVMap")
for loop in display_mesh.loops:
    co = display_mesh.vertices[loop.vertex_index].co
    display_mesh.uv_layers[0].data[loop.index].uv = (co.x / DISPLAY_W + 0.5, co.y / DISPLAY_H + 0.5)
display_mesh.materials.append(display_material)
display = bpy.data.objects.new("MacDisplay", display_mesh)
bpy.context.scene.collection.objects.link(display)
display.parent = lid
display.matrix_basis = Matrix.Translation((0, display_y, LID_T + 0.00006))
# The notch: rounded at the bottom; its top reaches into the black bezel, where its corners vanish.
notch = shapes.rounded_outline(-NOTCH_W / 2, NOTCH_W / 2, -NOTCH_H, 0.0012, 0.0022, 6)
scene_kit.flat_mesh_object("MacNotch", notch, glass, lid, Matrix.Translation((0, display_top, LID_T + 0.00012)))
hinge_point = Vector((0, BASE_D / 2 - 0.0036, BASE_H - 0.0006 + 0.0036 - 0.0009))
lid.matrix_world = Matrix.Translation(hinge_point) @ rot("X", 180 - OPEN_DEG)

# The reader, its cable and the card ------------------------------------------------------------

reader, leds = scene.build_reader()
reader_matrix = Matrix.Translation((*READER_AT, 0.0)) @ rot("Z", READER_YAW)
reader.matrix_world = reader_matrix
for obj in (*leds["blue"], leds["green"][1]):
    bpy.data.objects.remove(obj)
green = materials.principled("ReaderLedGreen", curves.READER["green"], roughness=0.3)
bsdf = next(n for n in green.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
bsdf.inputs["Emission Color"].default_value = scene_kit.hex_linear(curves.READER["green"])
bsdf.inputs["Emission Strength"].default_value = 2.0
leds["green"][0].data.materials[0] = green

sheath = materials.principled("CableSheath", curves.CABLE["color"], roughness=0.5)
plug = scene.build_plug(sheath)
port_front = Vector((BASE_W / 2 + 0.0002, PORT_Y, PORT_Z))
plug.matrix_world = Matrix.Translation(port_front) @ rot("Z", 90)  # pointing -X, into the port


def cable_points(count=48):
    """The scene's cable shape (ipadreader_params.cable_points): a Bezier in plan from the
    reader's strain relief to the plug's tail, rising from the desk only near each end."""
    radius = curves.CABLE["radiusM"]
    start = reader_matrix @ Vector(curves.CABLE_EXIT_LOCAL)
    start_dir = (reader_matrix.to_3x3() @ Vector((0, 1, 0))).normalized()
    tail = port_front + Vector((curves.PLUG_TAIL, 0, 0))
    gap = (tail.xy - start.xy).length
    handle = min(max(curves.CABLE["handle"] * gap, 0.012), 0.07)
    dense = curves._flat_curve(tuple(start.xy), tuple(start_dir.xy), tuple(tail.xy), (-1.0, 0.0), handle, samples=240)
    cumulative = [0.0]
    for a, b in zip(dense, dense[1:]):
        cumulative.append(cumulative[-1] + math.dist(a, b))
    points, j = [], 0
    for i in range(count + 1):
        s = cumulative[-1] * i / count
        while j < len(dense) - 2 and cumulative[j + 1] < s:
            j += 1
        t_seg = (s - cumulative[j]) / ((cumulative[j + 1] - cumulative[j]) or 1.0)
        x, y = curves.lerp(dense[j], dense[j + 1], t_seg)
        t = i / count
        rise_start = 1 - motion.smoothstep(0.0, 0.16, t)
        rise_end = motion.smoothstep(0.62, 1.0, t) ** 2
        z = radius + (start.z - radius) * rise_start + (tail.z - radius) * rise_end
        points.append((x, y, max(radius, z)))
    points[-1] = tuple(tail)
    return points


def cable_tube(name, points, radius, material):
    """One smooth tube along the points (the scene keys 40 rigid capsules instead)."""
    curve = bpy.data.curves.new(name, "CURVE")
    curve.dimensions = "3D"
    curve.bevel_depth = radius
    curve.bevel_resolution = 3
    curve.use_fill_caps = True
    spline = curve.splines.new("POLY")
    spline.points.add(len(points) - 1)
    for point, co in zip(spline.points, points):
        point.co = (*co, 1.0)
    holder = bpy.data.objects.new(name + "Curve", curve)
    bpy.context.scene.collection.objects.link(holder)
    depsgraph = bpy.context.evaluated_depsgraph_get()
    data = bpy.data.meshes.new_from_object(holder.evaluated_get(depsgraph))
    bpy.data.objects.remove(holder)
    data.name = name
    data.materials.clear()
    data.materials.append(material)
    for polygon in data.polygons:
        polygon.use_smooth = True
    obj = bpy.data.objects.new(name, data)
    bpy.context.scene.collection.objects.link(obj)
    return obj


cable = cable_tube("Cable", cable_points(), curves.CABLE["radiusM"], sheath)

card = scene.build_card()
card.matrix_world = reader_matrix @ scene.yaw_tilt((0, 0, curves.CARD_ON_READER_Z), -6)
face = next(n for n in bpy.data.materials["CardFace"].node_tree.nodes if n.type == "TEX_IMAGE").image
face.scale(512, round(512 * face.size[1] / face.size[0]))

# One root: the desk tilted towards the viewer until the screen faces straight out, then turned
# into the phone convention (+Z top, +Y out of the screen), centred on the bounding box.
bpy.context.view_layer.update()
turn = rot("Z", 180) @ rot("X", OPEN_DEG - 90)
corners = [turn @ o.matrix_world @ Vector(c) for o in bpy.context.scene.objects if o.type == "MESH" for c in o.bound_box]
low = Vector(tuple(min(c[i] for c in corners) for i in range(3)))
high = Vector(tuple(max(c[i] for c in corners) for i in range(3)))
root = bpy.data.objects.new("Device", None)
bpy.context.scene.collection.objects.link(root)
root.matrix_world = Matrix.Translation(-(low + high) / 2) @ turn
for part in (base, lid, reader, plug, cable, card):
    world = part.matrix_world.copy()
    part.parent = root
    part.matrix_basis = world
bpy.context.view_layer.update()
normal = (display.matrix_world.to_3x3() @ Vector((0, 0, 1))).normalized()

bpy.ops.object.select_all(action="SELECT")
bpy.ops.export_scene.gltf(filepath=str(out), export_format="GLB", use_selection=True,
                          export_apply=True, export_cameras=False, export_lights=False,
                          export_animations=False, export_image_format="WEBP")
size = high - low
print(f"DISPLAY {display.name} {DISPLAY_W:.4f} x {DISPLAY_H:.4f} m, aspect {DISPLAY_W / DISPLAY_H:.4f}, "
      f"normal {tuple(round(v, 4) for v in normal)}")
print(f"BOX {size.x:.4f} x {size.y:.4f} x {size.z:.4f} m (Blender, viewer's frame)")
print(f"EXPORT {out}")
