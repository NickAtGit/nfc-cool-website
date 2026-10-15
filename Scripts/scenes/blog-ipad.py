"""blog_ipad raw GLB: the iPad with the external USB-C NFC reader, for the blog's phone figures.

NFCcoolScenes' External Reader scene (scripts/ipadreader_scene.py) tells how an iPad, which has
no NFC, reads a card through a desktop reader plugged into its USB-C port. This takes that
scene's props, built by the scene's own functions, at the beat after the first read: the iPad
lying face up, the reader below it with its light green, the cable in the iPad's port and the
NFC.cool card resting on the reader. No phone, no waves, no check badge, no camera or lights.

Two things differ from the scene. The iPad is the 13-inch size (215.5 x 281.6 mm, the scene's
is the 11-inch), because the app's iPad captures are 2064 x 2752: its display is exactly 3 : 4,
so a capture maps onto it unstretched. And its screen is a single plain black panel, mesh
IPadDisplay, UVs over the whole display (v = 1 at the top), which the player paints.

The desk lies in the figure's screen plane: everything hangs under the root node Device, turned
so the display faces Blender +Y (glTF -Z) with the iPad's top up, the scenes' phone convention.
Seen straight on, it is a flat lay from above. Slim the result like the blog phone
(Scripts/scenes/blog-phone.mjs).

  SCENES=~/Developer/NFCcoolScenes
  $SCENES/scripts/blender.sh -P "$PWD/Scripts/scenes/blog-ipad.py" -- <out.glb>
"""

import math
import sys
from pathlib import Path

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
from scenelib import materials  # noqa: E402

out = Path(sys.argv[sys.argv.index("--") + 1]).resolve()
# The scene's beat after the first read: plug in the iPad, card on the reader, light green.
FRAME = 140

bpy.ops.wm.read_factory_settings(use_empty=True)

# The 13-inch iPad, its bottom edge (and so its port) where the scene's 11-inch one has it.
WIDTH, DEPTH, BEZEL = 0.2155, 0.2816, 0.0086
bottom = curves.IPAD_CENTER[1] - curves.IPAD_D / 2
centre = (curves.IPAD_CENTER[0], bottom + DEPTH / 2, 0.0)
curves.IPAD_W = scene.IPAD_W = WIDTH
curves.IPAD_D = scene.IPAD_D = DEPTH
curves.IPAD["bezelM"] = BEZEL
scene.DISPLAY_W, scene.DISPLAY_H = WIDTH - 2 * BEZEL, DEPTH - 2 * BEZEL
curves.IPAD_CENTER = centre
curves.IPAD_PORT = (centre[0], bottom - 0.0002, curves.IPAD_T / 2)
# The reader a little closer in and further right than in the scene, whose camera looks across
# the desk: seen from above, that keeps the figure compact.
curves.READER_CENTER = (0.07, -0.135, 0.0)

ipad = scene.build_ipad()
ipad.matrix_world = Matrix.Translation(centre)
display_material = materials.principled("IPadDisplay", "#000000", roughness=0.4)
display = scene.panel("IPadDisplay", scene.DISPLAY_W, scene.DISPLAY_H, curves.IPAD["displayCornerM"],
                      display_material, ipad, Matrix.Translation((0, 0, scene.GLASS_TOP + 0.00006)))

reader, leds = scene.build_reader()
reader.matrix_world = scene.reader_matrix(FRAME)
# The light: the green dot alone, as a plain emissive surface (the scene fades its colours and
# halos over the film, which a static model does not need).
for obj in (*leds["blue"], leds["green"][1]):
    bpy.data.objects.remove(obj)
green = materials.principled("ReaderLedGreen", curves.READER["green"], roughness=0.3)
bsdf = next(n for n in green.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
bsdf.inputs["Emission Color"].default_value = scene_kit.hex_linear(curves.READER["green"])
bsdf.inputs["Emission Strength"].default_value = 2.0
leds["green"][0].data.materials[0] = green

sheath = materials.principled("CableSheath", curves.CABLE["color"], roughness=0.5)
plug = scene.build_plug(sheath)
plug.matrix_world = scene.plug_matrix(FRAME)


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


cable = cable_tube("Cable", curves.cable_points(FRAME, count=48), curves.CABLE["radiusM"], sheath)

card = scene.build_card()
card.matrix_world = scene.yaw_tilt((*curves.READER_CENTER[:2], curves.CARD_ON_READER_Z), -6)
# The card's face is a 2568 px print; at figure size 512 px is plenty.
face = next(n for n in bpy.data.materials["CardFace"].node_tree.nodes if n.type == "TEX_IMAGE").image
face.scale(512, round(512 * face.size[1] / face.size[0]))

# One root, turned from the desk (Z up, screen up, iPad top +Y) into the phone convention
# (+Z top, +Y out of the screen), and centred on the composition's bounding box.
bpy.context.view_layer.update()
parts = [ipad, reader, plug, cable, card]
corners = [o.matrix_world @ Vector(c) for o in bpy.context.scene.objects if o.type == "MESH" for c in o.bound_box]
low = Vector(tuple(min(c[i] for c in corners) for i in range(3)))
high = Vector(tuple(max(c[i] for c in corners) for i in range(3)))
root = bpy.data.objects.new("Device", None)
bpy.context.scene.collection.objects.link(root)
root.matrix_world = (Matrix.Rotation(math.pi, 4, "Z") @ Matrix.Rotation(math.pi / 2, 4, "X")
                     @ Matrix.Translation(-(low + high) / 2))
for part in parts:
    world = part.matrix_world.copy()
    part.parent = root
    part.matrix_basis = world
bpy.context.view_layer.update()

bpy.ops.object.select_all(action="SELECT")
bpy.ops.export_scene.gltf(filepath=str(out), export_format="GLB", use_selection=True,
                          export_apply=True, export_cameras=False, export_lights=False,
                          export_animations=False, export_image_format="WEBP")
size = high - low
print(f"DISPLAY {display.name} {scene.DISPLAY_W:.4f} x {scene.DISPLAY_H:.4f} m, aspect {scene.DISPLAY_W / scene.DISPLAY_H:.4f}")
print(f"DESK BOX {size.x:.4f} x {size.y:.4f} x {size.z:.4f} m")
print(f"EXPORT {out}")
