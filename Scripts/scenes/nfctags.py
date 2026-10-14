"""The nfctags scene (the home page hero): a still phone reads one NFC tag after another. Each tag
glides in and fades in, touches the phone's top edge, and while the phone reads it the NFC
symbol's three waves grow out of the top edge; on the read the screen shows a check and the
tag's name (nfctags_screen.py), and the tag glides out as the next one comes. The clock is
nfctags_timeline.py.

  NFCcoolScenes/scripts/blender.sh -b -P Scripts/scenes/nfctags.py -- \
    <NFCcoolScenes> <textures dir> <screen frames dir> <out dir> [--still <frame> <out.png>] [--preview <dir> <px>]

Writes <out dir>/nfctags.glb (the tags, effects and camera with the baked animation; the phone
is only its Phone node, the player hangs the shared phone under it) and <out dir>/nfctags.json,
the manifest live-scenes.mjs reads. --still renders one frame with Cycles and --preview the whole
loop with Eevee as PNGs, for checking the look and the motion in Blender instead.
Scripts/scenes/build.sh runs it.

The props are built here, at real sizes: a 38 mm sticker, ISO cards, a 30 mm coin, an ICODE
inlay, a key fob, a wristband, and the original figure of NFCcoolScenes' Amiibo scene (no
real character). The look is the card fan's: satin materials, a warm key from the upper right
that throws the tags' shadows onto the phone, a cool fill from the left.
"""

import json
import math
import sys
from pathlib import Path

import bmesh
import bpy
from bpy_extras import anim_utils
from io_scene_gltf2.io.exp import meshopt
from mathutils import Matrix, Quaternion, Vector

sys.path.insert(0, str(Path(__file__).resolve().parent))
import nfctags_timeline as tl  # noqa: E402

# Blender's meshopt export rounds rotations to 8 bits and positions and key times to 12: the
# tags would tremble. 16 bits (24 for key times) keeps every key within a hair.
meshopt.QUAT_FILTER_BITS = 16
_encode = meshopt.MeshoptEncoder.encode_attribute


def _encode_precisely(name, data, stride, settings):
    meshopt.EXP_FILTER_BITS = 24 if name == "TIME" else 16
    return _encode(name, data, stride, settings)


meshopt.MeshoptEncoder.encode_attribute = staticmethod(_encode_precisely)

argv = sys.argv[sys.argv.index("--") + 1:]
SCENES, TEXTURES, SCREEN, OUT = (Path(p) for p in argv[:4])
STILL = (int(argv[5]), argv[6]) if len(argv) > 6 and argv[4] == "--still" else None
PREVIEW = (Path(argv[5]), int(argv[6])) if len(argv) > 6 and argv[4] == "--preview" else None
SITE = Path(__file__).resolve().parent.parent.parent

V = Vector
BLUE, YELLOW, WHITE = (0.04, 0.52, 1.0), (1.0, 0.78, 0.0), (0.85, 0.93, 1.0)
EXPOSURE, WORLD = -0.3, 0.2
KEY = ("Key", 6.0, (1.0, 0.98, 0.95), 0.35, (0.50, 0.40, 0.25))
FILL = ("Fill", 0.9, (0.80, 0.87, 1.0), 1.6, (-0.60, -0.10, 0.30))
RIM = ("Rim", 2.0, (0.85, 0.9, 1.0), 0.6, (-0.35, 0.40, -0.15))

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
FRAMES = tl.FRAMES


def basis(z, y, pos=(0, 0, 0)):
    """A matrix whose local Z is `z` and local Y is `y` (made square to z), at pos."""
    z = V(z).normalized()
    y = (V(y) - z * V(y).dot(z)).normalized()
    m = Matrix((y.cross(z), y, z)).transposed().to_4x4()
    m.translation = V(pos)
    return m


def link(obj):
    scene.collection.objects.link(obj)
    return obj


# The stage: the phone stands with its top edge at the origin, turned a little to the left and
# leaning back; the camera looks at it from the front, a little from the right and above.
TOP = V((0, -0.10, 1)).normalized()
SCREEN_DIR = (V((-0.22, 1, 0.08)) - TOP * V((-0.22, 1, 0.08)).dot(TOP)).normalized()
VIEW = V((0.20, 1, 0.36)).normalized()
CAM_RIGHT = V((0, 0, 1)).cross(VIEW).normalized()
CAM_UP = VIEW.cross(CAM_RIGHT).normalized()

# A tag reads lying against the phone's back, at the top edge, its face turned to the viewer.
# The NFC scan scene's waves and spacing (NFCcoolScenes params/nfc.json): wave.3.forward arcs in
# the gap behind the phone's back, the inner arc's ends just clear of the top edge; the tag is
# read floating clear above them, so phone, waves and tag read as three separate things.
NFC = json.loads((SCENES / "params/nfc.json").read_text())
WAVES, GAP = NFC["waves"], NFC["card"]["gapM"]
PHONE_BACK = -0.0087                  # the phone's back, from its top-edge centre along the screen normal
WAVE_REACH = WAVES["strokeM"] * WAVES["halo"]["strokeScale"] / 2
WAVE_ORIGIN = (SCREEN_DIR * (PHONE_BACK - GAP / 2)
               + TOP * (WAVES["phoneClearanceM"] + WAVE_REACH - WAVES["radiiM"][0] * math.cos(math.radians(WAVES["halfSpanDeg"]))))
WAVES_TOP = WAVE_ORIGIN.dot(TOP) + WAVES["radiiM"][-1] + WAVE_REACH
REST = SCREEN_DIR * (PHONE_BACK - GAP) + TOP * (WAVES_TOP + NFC["card"]["wavesClearanceM"])


# Materials ------------------------------------------------------------------------------------

def material(name, color=(1, 1, 1), rough=0.5, metal=0.0, coat=0.0, image=None, emit=None, strength=1.0, alpha=False, glow=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    p = next(n for n in nt.nodes if n.type == "BSDF_PRINCIPLED")
    p.inputs["Base Color"].default_value = (*color, 1)
    p.inputs["Roughness"].default_value = rough
    p.inputs["Metallic"].default_value = metal
    p.inputs["Coat Weight"].default_value = coat
    p.inputs["Coat Roughness"].default_value = 0.35
    p.inputs["Specular IOR Level"].default_value = 0.38
    if image:
        t = nt.nodes.new("ShaderNodeTexImage")
        t.image = bpy.data.images.load(str(image))
        nt.links.new(t.outputs["Color"], p.inputs["Base Color"])
        if glow:  # the print lights itself a little, so its colours hold under the studio light
            nt.links.new(t.outputs["Color"], p.inputs["Emission Color"])
            p.inputs["Emission Strength"].default_value = glow
        if alpha:
            nt.links.new(t.outputs["Alpha"], p.inputs["Alpha"])
            m.surface_render_method = "BLENDED"
    if emit:
        p.inputs["Base Color"].default_value = (*emit, 1)
        p.inputs["Emission Color"].default_value = (*emit, 1)
        p.inputs["Emission Strength"].default_value = strength
    return m


def satin(name, color, rough=0.5, coat=0.1, **kw):
    return material(name, color, rough, coat=coat, **kw)


# Geometry -------------------------------------------------------------------------------------

def mesh_obj(name, bm, mats, smooth=False):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    for m in mats:
        me.materials.append(m)
    for poly in me.polygons:
        poly.use_smooth = smooth
    return link(bpy.data.objects.new(name, me))


def slab(name, outline, thickness, top, side, bevel=0.0005):
    """An outline (list of (x, y)) extruded `thickness`, centred on z=0; UVs span its bounds."""
    bm = bmesh.new()
    face = bm.faces.new([bm.verts.new((x, y, 0)) for x, y in outline])
    xs, ys = [p[0] for p in outline], [p[1] for p in outline]
    uv = bm.loops.layers.uv.new("UVMap")
    for loop in face.loops:
        loop[uv].uv = ((loop.vert.co.x - min(xs)) / (max(xs) - min(xs)), (loop.vert.co.y - min(ys)) / (max(ys) - min(ys)))
    ext = bmesh.ops.extrude_face_region(bm, geom=[face])
    bmesh.ops.translate(bm, verts=[g for g in ext["geom"] if isinstance(g, bmesh.types.BMVert)], vec=(0, 0, thickness))
    bmesh.ops.translate(bm, verts=bm.verts[:], vec=(0, 0, -thickness / 2))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    for f in bm.faces:
        f.material_index = 0 if abs(f.normal.z) > 0.9 else 1
    obj = mesh_obj(name, bm, [top, side])
    if bevel:
        b = obj.modifiers.new("Bevel", "BEVEL")
        b.width, b.segments, b.limit_method = bevel, 2, "ANGLE"
    return obj


def rounded_rect(w, h, r, seg=8):
    pts = []
    for cx, cy, a0 in ((w / 2 - r, h / 2 - r, 0), (-w / 2 + r, h / 2 - r, 90), (-w / 2 + r, -h / 2 + r, 180), (w / 2 - r, -h / 2 + r, 270)):
        pts += [(cx + r * math.cos(math.radians(a0 + 90 * i / seg)), cy + r * math.sin(math.radians(a0 + 90 * i / seg))) for i in range(seg + 1)]
    return pts


def circle(r, n=40, cx=0.0, cy=0.0):
    return [(cx + r * math.cos(2 * math.pi * i / n), cy + r * math.sin(2 * math.pi * i / n)) for i in range(n)]


def hull(points):
    pts = sorted(set(points))

    def cross(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    lower, upper = [], []
    for p in pts:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)
    for p in reversed(pts):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)
    return lower[:-1] + upper[:-1]


def torus(name, major, minor, mat, rings=64, segs=12, arc=2 * math.pi):
    bm = bmesh.new()
    closed = arc >= 2 * math.pi - 1e-6
    n = rings if closed else rings + 1
    grid = [[bm.verts.new(((major + minor * math.cos(b)) * math.cos(a), (major + minor * math.cos(b)) * math.sin(a), minor * math.sin(b)))
             for b in (2 * math.pi * j / segs for j in range(segs))]
            for a in (arc * i / rings - (0 if closed else arc / 2) for i in range(n))]
    for i in range(rings if closed else rings):
        for j in range(segs):
            i2 = (i + 1) % n
            bm.faces.new((grid[i][j], grid[i2][j], grid[i2][(j + 1) % segs], grid[i][(j + 1) % segs]))
    return mesh_obj(name, bm, [mat], smooth=True)


def capsule(name, length, radius, mat):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=12, v_segments=8, radius=radius)
    for v in bm.verts:
        v.co.z += length / 2 if v.co.z > 0 else -length / 2 if v.co.z < 0 else 0
    return mesh_obj(name, bm, [mat], smooth=True)


# The tags. Each returns (root object, its reach below its centre along local Y). -------------

def tag_card(name, texture, gloss=False, glow=0.0):
    w, h = 0.0856, 0.054
    # A matte print: the studio's reflections would turn the black card grey and wash out the
    # rainbow's stripes.
    face = material(name + "Face", (1, 1, 1), 0.7, image=texture, glow=glow)
    next(n for n in face.node_tree.nodes if n.type == "BSDF_PRINCIPLED").inputs["Specular IOR Level"].default_value = 0.15
    edge = satin(name + "Edge", (0.07, 0.07, 0.08) if gloss else (0.9, 0.9, 0.9), 0.5, 0)
    return slab(name, rounded_rect(w, h, 0.0032), 0.0008, face, edge), h / 2


def tag_sticker(name):
    r = 0.019
    return slab(name, circle(r, 48), 0.0003, satin(name + "Top", (1, 1, 1), 0.45, 0.2, image=TEXTURES / "sticker.png"), satin(name + "Edge", (1.0, 0.6, 0.0), 0.5, 0), bevel=0), r


def tag_coin(name):
    r = 0.015
    return slab(name, circle(r, 48), 0.0018, material(name + "Top", (1, 1, 1), 0.3, coat=0.6, image=TEXTURES / "coin.png"), material(name + "Edge", (0.08, 0.45, 0.88), 0.3, coat=0.6), bevel=0.0005), r


def tag_inlay(name):
    w, h = 0.070, 0.0445
    film = material(name + "Film", (1, 1, 1), 0.25, coat=0.3, image=TEXTURES / "inlay.png", alpha=True)
    return slab(name, rounded_rect(w, h, 0.002), 0.0002, film, film, bevel=0), h / 2


def tag_fob(name):
    body = satin(name + "Body", (0.02, 0.55, 0.24), 0.42, 0.2)
    obj = slab(name, hull(circle(0.0155, 32) + circle(0.0065, 20, 0, 0.0205)), 0.0044, body, body, bevel=0.0014)
    cutter = link(bpy.data.objects.new(name + "Hole", bpy.data.meshes.new(name + "HoleMesh")))
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=32, radius1=0.003, radius2=0.003, depth=0.02)
    bm.to_mesh(cutter.data)
    bm.free()
    cutter.location = (0, 0.0212, 0)
    hole = obj.modifiers.new("Hole", "BOOLEAN")
    hole.object, hole.operation = cutter, "DIFFERENCE"
    obj.modifiers.move(len(obj.modifiers) - 1, 0)
    bpy.context.view_layer.objects.active = obj
    for mod in list(obj.modifiers):
        bpy.ops.object.modifier_apply(modifier=mod.name)
    bpy.data.objects.remove(cutter)
    ring = torus(name + "Ring", 0.0105, 0.0008, material(name + "Steel", (0.82, 0.82, 0.84), 0.28, metal=1.0), rings=40, segs=8)
    ring.parent = obj
    ring.matrix_basis = Matrix.Translation((0, 0.0212 + 0.0105 - 0.003, 0)) @ Matrix.Rotation(math.radians(75), 4, "Y")
    return obj, 0.0155


def tag_wristband(name):
    """A slim silicone band round an oval wrist; at the bottom it swells smoothly into the flush
    pad that holds the chip, instead of carrying a separate puck."""
    sil = material(name + "Silicone", (0.22, 0.14, 0.85), 0.42, coat=0.15)
    a, b, width, n, m = 0.034, 0.029, 0.012, 96, 20
    bm = bmesh.new()
    rings = []
    for i in range(n):
        u = 2 * math.pi * i / n
        centre = V((a * math.cos(u), b * math.sin(u), 0))
        out = V((b * math.cos(u), a * math.sin(u), 0)).normalized()
        pad = max(0.0, -math.sin(u)) ** 10                     # 1 at the bottom (local -Y)
        thick = 0.0022 + 0.0024 * pad
        wide = width * (1 + 0.25 * pad)
        ring = []
        for j in range(m):
            v = 2 * math.pi * j / m
            c, s_ = math.cos(v), math.sin(v)
            r_off = thick / 2 * math.copysign(abs(c) ** 0.45, c)   # a squircle profile: flat faces, soft edges
            z_off = wide / 2 * math.copysign(abs(s_) ** 0.45, s_)
            ring.append(bm.verts.new(centre + out * (thick / 2 + r_off) + V((0, 0, z_off))))
        rings.append(ring)
    for i in range(n):
        for j in range(m):
            r0, r1 = rings[i], rings[(i + 1) % n]
            bm.faces.new((r0[j], r1[j], r1[(j + 1) % m], r0[(j + 1) % m]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    return mesh_obj(name, bm, [sil], smooth=True), b + 0.0046


def tag_figure(name):
    with bpy.data.libraries.load(str(SCENES / "assets/amiibo/figure.blend")) as (src, dst):
        dst.objects = [n for n in src.objects if n.startswith("Figure")]
    for obj in dst.objects:
        link(obj)
    root = bpy.data.objects["Figure"]
    root.name = name
    # The sculpt is 58k vertices and its paint 2K: a tenth and 512 px look the same at hero size.
    for obj in root.children_recursive:
        if obj.type == "MESH" and len(obj.data.vertices) > 800:
            dec = obj.modifiers.new("Decimate", "DECIMATE")
            dec.ratio = 1800 / len(obj.data.vertices) if len(obj.data.vertices) > 20000 else 0.3
    for image in bpy.data.images:
        if image.name.startswith("figure_paint") and max(image.size) > 512:
            image.scale(512, 512)
    return root, 0.0


BUILDERS = {
    "sticker": tag_sticker,
    "brandcard": lambda n: tag_card(n, TEXTURES / "card_424.png", gloss=True),
    "card": lambda n: tag_card(n, TEXTURES / "card_216.png", glow=0.35),
    "inlay": tag_inlay,
    "coin": tag_coin,
    "fob": tag_fob,
    "wristband": tag_wristband,
    "figure": tag_figure,
}


# The figure stands a head taller than every other tag: smaller, it fits the frame with them.
FIGURE_SCALE = 0.72


def read_matrix(prop, reach):
    """Where a tag floats while the phone reads it: upright in the phone's plane, its face to
    the viewer, its lowest point clear above the waves."""
    if prop == "figure":  # the figure stands, facing the viewer
        return basis(TOP, -SCREEN_DIR, REST + TOP * 0.0068 * FIGURE_SCALE)
    return basis(SCREEN_DIR, TOP, REST + TOP * reach)


# Motion ---------------------------------------------------------------------------------------

PARKED = 0.001


def tag_pose(i, frame, read, reach):
    """(location, rotation, scale) of tag i at timeline frame `frame`: it glides in from above
    and to one side while it fades in, touches the top edge, stays while it is read, and glides
    on out the other way while it fades. It never turns."""
    t = tl.local(frame, i)
    side = tl.TAGS[i][2]
    size = FIGURE_SCALE if tl.TAGS[i][1] == "figure" else 1.0
    exit_side = -side if side else (1 if i % 2 else -1)
    p0, q0 = read.translation.copy(), read.to_quaternion()
    start = p0 + CAM_RIGHT * side * 0.07 + CAM_UP * 0.03
    end = p0 + CAM_RIGHT * exit_side * 0.07 + CAM_UP * 0.035
    if t < 0 or t >= tl.SEGMENT + tl.OVERLAP:
        # Never quite 0: the exporter works out a child's transform (the figure's parts, the
        # fob's ring) through its parent's, and a zero scale has no inverse.
        return start, q0, PARKED
    if t < tl.CONTACT:
        return start.lerp(p0, tl.ease_out_cubic(t / tl.CONTACT)), q0, size
    if t < tl.LEAVE:
        return p0, q0, size
    return p0.lerp(end, tl.ease_in_out(tl.progress(t, tl.LEAVE, tl.SEGMENT + tl.OVERLAP))), q0, size


def tag_opacity(i, frame):
    """Tags fade in as they arrive and out as they leave."""
    t = tl.local(frame, i)
    if t < 0 or t >= tl.SEGMENT + tl.OVERLAP:
        return 0.0
    # Gone before the next one starts to show.
    return min(tl.progress(t, 0, tl.ARRIVE * 0.7), 1 - tl.progress(t, tl.LEAVE, tl.SEGMENT - 1))


def key_transform(obj, poses):
    """Keys every frame where obj moves, and only the two ends of a still stretch: with linear
    keys that is the same motion, and a tag that waits off screen most of the loop costs a pair
    of keys there instead of four hundred."""
    obj.rotation_mode = "QUATERNION"
    pose = [poses(f % FRAMES) for f in range(FRAMES + 1)]
    flat = [(*loc, *q, s) for loc, q, s in pose]
    same = lambda a, b: all(abs(x - y) < 1e-7 for x, y in zip(flat[a], flat[b]))  # noqa: E731
    for f, (loc, q, s) in enumerate(pose):
        if 0 < f < FRAMES and same(f, f - 1) and same(f, f + 1):
            continue
        obj.location, obj.rotation_quaternion, obj.scale = loc, q, (s, s, s)
        for path in ("location", "rotation_quaternion", "scale"):
            obj.keyframe_insert(path, frame=f)
    linear(obj.animation_data)


def linear(animation_data):
    """Every key linear. Blender's default Bezier exports as a cubic spline, and between the two
    keys that hold a tag still the curve bulges: the tag drifts and tilts where it should rest."""
    action = animation_data.action
    channelbag = anim_utils.action_get_channelbag_for_slot(action, animation_data.action_slot)
    for curve in channelbag.fcurves:
        for point in curve.keyframe_points:
            point.interpolation = "LINEAR"


OPACITY = {}


def fade(obj, values):
    """Opacity per timeline frame: in the manifest for the player, keyed on the material here."""
    OPACITY[obj.name] = [round(v, 3) for v in values]
    obj.visible_shadow = False
    for slot in obj.material_slots:
        slot.material = slot.material.copy()
        slot.material.surface_render_method = "BLENDED"
        p = next(n for n in slot.material.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
        for f, v in enumerate(values + [values[0]]):
            p.inputs["Alpha"].default_value = v
            p.inputs["Alpha"].keyframe_insert("default_value", frame=f)
        linear(slot.material.node_tree.animation_data)


# Build ----------------------------------------------------------------------------------------

bpy.ops.import_scene.gltf(filepath=str(SITE / "Content/StaticFiles/scenes/feature_phone.glb"))
phone = bpy.data.objects["Phone"]
phone_parts = [o for o in phone.children_recursive]
x_axis = SCREEN_DIR.cross(TOP)
phone.matrix_world = Matrix.Translation(-TOP * 0.1631) @ Matrix((x_axis, SCREEN_DIR, TOP)).transposed().to_4x4()

tags = []
for i, (label, prop, side) in enumerate(tl.TAGS):
    obj, reach = BUILDERS[prop](f"Tag{i + 1}{prop.capitalize()}")
    read = read_matrix(prop, reach)
    tags.append((obj, read, reach))
    key_transform(obj, lambda f, i=i, read=read, reach=reach: tag_pose(i, f, read, reach))
    OPACITY[obj.name] = [round(tag_opacity(i, f), 3) for f in range(FRAMES)]

# While the phone reads, the NFC scan scene's three wave.3.forward arcs light up inner to outer
# in the gap between the top edge and the tag, and leave outer first as the check lands
# (scenelib/effects.nfc_waves, staging.wave_alpha).
def smoothstep(a, b, x):
    u = tl.clamp01((x - a) / (b - a))
    return u * u * (3 - 2 * u)


def wave_alpha(t, start, end, k):
    """Arc k (0 inner) lights up from `start` inner to outer (staging.wave_alpha's entrance),
    holds the full three, and leaves outer first, gone at `end`."""
    rise, settle, stagger = WAVES["enterRiseFrames"], WAVES["enterSettleFrames"], WAVES["arcStaggerFrames"]
    x = t - start - k * stagger
    if x <= 0:
        return 0.0
    settled = smoothstep(rise, rise + settle, x)
    arrive = smoothstep(0, rise, x) * (1 - settled) + WAVES["glowLevel"] * settled
    return arrive * smoothstep(0, rise, end - t - k * stagger)


def wave_arc(name, radius, half_span, stroke, mat, matrix, steps=48, cap=12):
    """One round-capped arc of wave.3.forward opening towards local +X (the shape of
    scenelib/shapes.arc_outline), built as a strip of quads with fan caps: a concave outline
    filled as one polygon triangulates over itself."""
    half = stroke / 2
    bm = bmesh.new()
    angles = [-half_span + 2 * half_span * i / steps for i in range(steps + 1)]
    outer = [bm.verts.new(((radius + half) * math.cos(a), (radius + half) * math.sin(a), 0)) for a in angles]
    inner = [bm.verts.new(((radius - half) * math.cos(a), (radius - half) * math.sin(a), 0)) for a in angles]
    for k in range(steps):
        bm.faces.new((inner[k], inner[k + 1], outer[k + 1], outer[k]))
    for end, sign in ((steps, 1), (0, -1)):
        a = angles[end]
        centre = bm.verts.new((radius * math.cos(a), radius * math.sin(a), 0))
        start = math.atan2(math.sin(a), math.cos(a))  # direction from the arc's centre outward
        ring = [outer[end]]
        for k in range(1, cap):
            t = start + sign * math.pi * k / cap
            ring.append(bm.verts.new((radius * math.cos(a) + half * math.cos(t), radius * math.sin(a) + half * math.sin(t), 0)))
        ring.append(inner[end])
        for k in range(len(ring) - 1):
            face = (centre, ring[k], ring[k + 1]) if sign > 0 else (centre, ring[k + 1], ring[k])
            bm.faces.new(face)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    obj = mesh_obj(name, bm, [mat])
    obj.matrix_world = matrix
    return obj


def hex_linear(hex_color):
    srgb = [int(hex_color[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    return tuple(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in srgb)


# Plain arcs, no halo, in the brand blue on the light page and the brand yellow on the dark one
# (the manifest's themeColors; the player follows the site's theme).
WAVE_COLORS = {"light": "#1A60CE", "dark": "#FFC700"}
wave_frame = basis(SCREEN_DIR, SCREEN_DIR.cross(TOP), WAVE_ORIGIN)   # arcs open towards the top
half_span = math.radians(WAVES["halfSpanDeg"])
for k, radius in enumerate(WAVES["radiiM"]):
    core = wave_arc(f"Wave{k + 1}", radius, half_span, WAVES["strokeM"],
                    material(f"Wave{k + 1}Glow", emit=hex_linear(WAVE_COLORS["light"]), strength=1.0), wave_frame)
    fade(core, [wave_alpha(tl.local(f, tl.active(f)), tl.CONTACT, tl.LEAVE + 4, k) for f in range(FRAMES)])


# Camera: fixed, framing the phone and every tag where it is read.
cam = link(bpy.data.objects.new("Camera", bpy.data.cameras.new("Camera")))
cam.data.lens, cam.data.sensor_width = 50, 36
scene.camera = cam
scene.render.resolution_x = scene.render.resolution_y = 960


def mesh_corners(obj):
    return [o.matrix_world @ V(c) for o in [obj, *obj.children_recursive] if o.type == "MESH" for c in o.bound_box]


# The phone and the tags where they are read sit in the middle of the frame; the camera then
# stands back just far enough that every tag, wherever it shows on its way in and out, keeps
# MARGIN of the frame clear.
MARGIN = 0.06
held = [c for part in phone_parts if part.type == "MESH" for c in mesh_corners(part)]
passing = []
for i, (obj, read, reach) in enumerate(tags):
    for t in (1, tl.CONTACT, tl.SEGMENT - 2):
        loc, q, s = tag_pose(i, i * tl.SEGMENT + t, read, reach)
        obj.matrix_world = Matrix.LocRotScale(loc, q, V((s, s, s)))
        bpy.context.view_layer.update()
        (held if t == tl.CONTACT else passing).extend(mesh_corners(obj))
half = math.tan(cam.data.angle / 2)


def on_screen(points, eye):
    """Points in the frame, -1..1 across, for a camera at `eye` looking along -VIEW."""
    return [((p - eye).dot(CAM_RIGHT) / ((eye - p).dot(VIEW) * half), (p - eye).dot(CAM_UP) / ((eye - p).dot(VIEW) * half)) for p in points]


eye = sum(held, V()) / len(held) + VIEW * 0.6
for _ in range(60):
    depth = sum((eye - p).dot(VIEW) for p in held) / len(held)
    xs, ys = zip(*on_screen(held, eye))
    eye += (CAM_RIGHT * (max(xs) + min(xs)) / 2 + CAM_UP * (max(ys) + min(ys)) / 2) * depth * half
    reach_out = max(max(abs(x), abs(y)) for x, y in on_screen(held + passing, eye))
    eye += VIEW * depth * (reach_out / (1 - MARGIN) - 1)
cam.matrix_world = basis(VIEW, CAM_UP, eye)
corners = held + passing  # the lights aim at, and the key's shadow covers, all of it
center = sum(corners, V()) / len(corners)
scene.frame_set(0)

# Light.
lights = []
for name, watts, color, size, (x, y, z) in (KEY, FILL, RIM):
    ld = bpy.data.lights.new(name, "AREA")
    ld.energy, ld.color, ld.shape, ld.size = watts, color, "DISK", size
    lo = link(bpy.data.objects.new(name, ld))
    lo.location = center + CAM_RIGHT * x + CAM_UP * y + VIEW * z
    lo.rotation_mode = "QUATERNION"
    lo.rotation_quaternion = (center - lo.location).to_track_quat("-Z", "Y")
    lights.append((name, watts, color, lo.location.copy()))
world = bpy.data.worlds.new("World")
scene.world = world
world.use_nodes = True
env = world.node_tree.nodes.new("ShaderNodeTexEnvironment")
env.image = bpy.data.images.load(str(SCENES / "assets/hdri/studio_small_09_2k.hdr"))
bg = next(n for n in world.node_tree.nodes if n.type == "BACKGROUND")
world.node_tree.links.new(env.outputs["Color"], bg.inputs["Color"])
bg.inputs["Strength"].default_value = WORLD
try:
    scene.view_settings.view_transform = "Khronos PBR Neutral"
except TypeError:
    pass
scene.view_settings.exposure = EXPOSURE
scene.render.fps = tl.FPS
scene.frame_start, scene.frame_end = 0, FRAMES
scene.render.film_transparent = True

if STILL or PREVIEW:
    screen = bpy.data.objects["Object_13"]
    m = material("Screen")
    nt = m.node_tree
    p = next(n for n in nt.nodes if n.type == "BSDF_PRINCIPLED")
    tex = nt.nodes.new("ShaderNodeTexImage")
    tex.image = bpy.data.images.load(str(SCREEN / "0000.png"))
    tex.image.source = "SEQUENCE"
    tex.image_user.frame_duration = FRAMES
    tex.image_user.frame_start = 0
    tex.image_user.frame_offset = -1
    tex.image_user.use_auto_refresh = True
    nt.links.new(tex.outputs["Color"], p.inputs["Emission Color"])
    # The player draws the screen untouched by tone mapping and exposure; here it has to
    # shine through both to come out the same white.
    p.inputs["Emission Strength"].default_value = 2 ** -EXPOSURE * 1.25
    p.inputs["Base Color"].default_value = (0, 0, 0, 1)
    p.inputs["Roughness"].default_value = 0.15
    screen.data.materials[0] = m
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    if STILL:
        scene.render.engine = "CYCLES"
        prefs = bpy.context.preferences.addons["cycles"].preferences
        try:
            prefs.compute_device_type = "METAL"
            prefs.get_devices()
            for d in prefs.devices:
                d.use = True
            scene.cycles.device = "GPU"
        except Exception as e:  # noqa: BLE001
            print("GPU", e)
        scene.cycles.samples, scene.cycles.use_denoising = 128, True
        scene.frame_set(STILL[0])
        scene.render.filepath = STILL[1]
        bpy.ops.render.render(write_still=True)
        print("RENDERED", STILL[1])
    else:
        scene.render.engine = "BLENDER_EEVEE"
        scene.eevee.taa_render_samples = 32
        scene.render.resolution_x = scene.render.resolution_y = PREVIEW[1]
        scene.frame_end = FRAMES - 1
        scene.render.filepath = str(PREVIEW[0]) + "/"
        bpy.ops.render.render(animation=True)
        print("RENDERED", PREVIEW[0])
    sys.exit(0)


# Export ---------------------------------------------------------------------------------------

def y_up(v):
    return [round(v.x, 5), round(v.z, 5), round(-v.y, 5)]


def hex_color(rgb):
    return "#" + "".join(f"{round(c * 255):02X}" for c in rgb)


for part in phone_parts:
    bpy.data.objects.remove(part, do_unlink=True)
for mat in bpy.data.materials:  # the fades live in the manifest, which scales the material's own
    if mat.node_tree and mat.node_tree.animation_data:  # opacity: leave that at 1
        mat.node_tree.animation_data_clear()
        next(n for n in mat.node_tree.nodes if n.type == "BSDF_PRINCIPLED").inputs["Alpha"].default_value = 1.0
radius = max((c - center).length for c in corners)
manifest = {
    "version": 1,
    "fps": tl.FPS,
    "frameCount": FRAMES,
    "camera": {"entity": cam.name, "projection": "perspective", "verticalFovDegrees": round(math.degrees(cam.data.angle), 3)},
    "phone": {"entity": "Phone", "asset": "feature_phone", "screenEntity": "Object_13", "hiddenEntities": []},
    "screenVideo": "nfctags_screen",
    "exposure": EXPOSURE,
    "environmentIntensity": WORLD,
    "shadows": True,
    "shadowless": sorted(name for name in OPACITY if not name.startswith("Tag")),
    "themeColors": {f"Wave{k + 1}": WAVE_COLORS for k in range(len(WAVES["radiiM"]))},
    "doubleSided": [f"Wave{k + 1}" for k in range(len(WAVES["radiiM"]))],
    "opacity": OPACITY,
    "lights": [
        {"name": name, "color": hex_color(color), "energyW": watts, "position": y_up(position),
         **({"type": "spot", "target": y_up(center), "shadow": {"extent": round(radius * 1.1, 4), "mapSize": 2048, "normalBias": 0.004}} if name == KEY[0] else {})}
        for name, watts, color, position in lights
    ],
}
OUT.mkdir(parents=True, exist_ok=True)
(OUT / "nfctags.json").write_text(json.dumps(manifest, separators=(",", ":")))
for obj in bpy.data.objects:
    obj.select_set(obj.type in {"MESH", "CAMERA", "EMPTY"})
scene.frame_set(0)
bpy.ops.export_scene.gltf(
    filepath=str(OUT / "nfctags.glb"),
    use_selection=True,
    export_format="GLB",
    export_yup=True,
    export_apply=True,
    export_cameras=True,
    export_lights=False,
    export_materials="EXPORT",
    export_image_format="WEBP",
    export_image_quality=86,
    export_animations=True,
    export_animation_mode="ACTIONS",
    export_frame_range=True,
    export_force_sampling=False,
    export_frame_step=1,
    export_optimize_animation_size=True,
    export_anim_slide_to_zero=False,
    export_meshopt_compression_enable=True,
    export_meshopt_extension="EXT_meshopt_compression",
)
print("EXPORT nfctags.glb", json.dumps(manifest["camera"]), FRAMES, "frames")
