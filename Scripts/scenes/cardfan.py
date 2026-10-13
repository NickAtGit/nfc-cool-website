"""The cardfan scene (the /affiliate-links/ hero): the six NFC.cool cards of NFCcoolScenes' batch
scene open into a fan of a bit more than a half circle, sway, close and open again.

  NFCcoolScenes/scripts/blender.sh NFCcoolScenes/scenes/csvbatch.blend \
    -P Scripts/scenes/cardfan.py -- <faces dir> <out dir> [--still <frame> <out.png>]

Takes the batch scene's cards, camera and lights, poses the cards per frame, and writes
<out dir>/cardfan.glb (cards + camera + the baked animation) and <out dir>/cardfan.json, the
manifest live-scenes.mjs reads: camera, lights, exposure. --still renders one frame in Blender
instead, for comparing the look with the browser's. <faces dir> is cardfan_faces.py's output.
Scripts/scenes/build.sh runs it.

The look: satin cards rather than the batch scene's glossy ones, a warm key from the upper right
and a cool fill from the left. The front cards sit to the right, so the key throws each card's
shadow onto the one behind it, which is most of what makes the fan read as real.
"""

import json
import math
import sys
from pathlib import Path

import bpy
from mathutils import Matrix, Vector

argv = sys.argv[sys.argv.index("--") + 1:]
FACES, OUT = Path(argv[0]), Path(argv[1])
STILL = (int(argv[3]), argv[4]) if len(argv) > 4 and argv[2] == "--still" else None

FPS, LOOP = 30, 150
SPREAD = 100.0          # outer card angle either side, degrees
CLOSED = 4.0            # the closed deck keeps a hint of spread
LEAN = 14.0             # the fan leans back, degrees
INSET = 0.011           # pivot above the cards' bottom edge, metres
LAYER = 0.0025          # each card this far in front of the last, so the shadows show
OPEN = (10, 26)         # first card's open start and duration, frames
STAGGER = 2.5           # frames between cards
CLOSE = (112, 22)       # close start and duration
SWAY_DEG, BOB_M = 2.2, 0.0012
CARD_W, CARD_L = 0.054, 0.0856

EXPOSURE = -0.35        # the batch scene's view exposure
WORLD = 0.25            # studio HDRI strength
# name: watts, colour, disk size (m), offset from the fan's centre in (right, up, toward camera) m
KEY = ("Key", 14.0, (1.0, 0.93, 0.84), 0.35, (0.50, 0.40, 0.25))
FILL = ("Fill", 0.9, (0.80, 0.87, 1.0), 1.6, (-0.60, -0.10, 0.30))
RIM = ("Rim1", 2.0, (0.85, 0.9, 1.0), 0.6, (-0.35, 0.40, -0.15))

scene = bpy.context.scene
cards = [bpy.data.objects[f"Card{i}"] for i in range(1, 7)]
camera = scene.camera

# Only the cards and the camera stay; the lights stay for --still.
keep = {c.name for c in cards} | {camera.name, KEY[0], FILL[0], RIM[0]}
scene.frame_set(1)
camera_world = camera.matrix_world.copy()
for obj in list(bpy.data.objects):
    if obj.name not in keep:
        bpy.data.objects.remove(obj, do_unlink=True)
for obj in bpy.data.objects:
    obj.hide_render = obj.hide_viewport = False
    obj.animation_data_clear()
    obj.parent = None
camera.matrix_world = camera_world

for i, card in enumerate(cards, 1):
    face = next(n for n in bpy.data.materials[f"CardFace{i}"].node_tree.nodes if n.type == "TEX_IMAGE")
    face.image = bpy.data.images.load(str(FACES / f"card_face_{i}.png"))


def principled(material):
    return next(n for n in material.node_tree.nodes if n.type == "BSDF_PRINCIPLED")


for material in bpy.data.materials:
    if material.name.startswith(("CardFace", "CardBack")):
        values = {"Roughness": 0.5, "Coat Weight": 0.1, "Coat Roughness": 0.35, "Specular IOR Level": 0.38}
    elif material.name == "CardEdge":
        values = {"Roughness": 0.6, "Coat Weight": 0.0, "Specular IOR Level": 0.3}
    else:
        continue
    for name, value in values.items():
        principled(material).inputs[name].default_value = value

# The fan lies in the camera's view plane, leaning back.
rotation = camera_world.to_quaternion()
right, up, toward = (rotation @ Vector(v) for v in ((1, 0, 0), (0, 1, 0), (0, 0, 1)))
basis = Matrix((right, up, toward)).transposed().to_4x4()
lean = Matrix.Rotation(math.radians(-LEAN), 4, right)


def ease_out_back(t, s=1.5):
    t -= 1
    return 1 + t * t * ((s + 1) * t + s)


def ease_in_out(t):
    return 4 * t ** 3 if t < 0.5 else 1 - (-2 * t + 2) ** 3 / 2


def openness(frame, i):
    start = OPEN[0] + STAGGER * i
    if frame < start:
        return 0.0
    if frame < CLOSE[0] + STAGGER * (5 - i):
        return ease_out_back(min(1.0, (frame - start) / OPEN[1]))
    t = min(1.0, (frame - CLOSE[0] - STAGGER * (5 - i)) / CLOSE[1])
    return 1 - ease_in_out(t)


def card_matrix(frame, i):
    """Card i (0 at the back, on the left) at frame; the dark card 6 ends up in front."""
    target = SPREAD - 2 * SPREAD * i / 5
    closed = CLOSED - 2 * CLOSED * i / 5
    angle = closed + (target - closed) * openness(frame, i)
    phase = 2 * math.pi * frame / LOOP
    sway = SWAY_DEG * math.sin(phase * 2)
    bob = BOB_M * math.sin(phase * 2 + 0.6)
    local = (Matrix.Translation((0, bob, LAYER * i))
             @ Matrix.Rotation(math.radians(angle + sway), 4, "Z")
             @ Matrix.Translation((0, CARD_L / 2 - INSET, 0)))
    return lean @ basis @ local


for i, card in enumerate(cards):
    card.parent = None
    card.rotation_mode = "QUATERNION"
    for frame in range(1, LOOP + 1):
        location, quaternion, _ = card_matrix(frame, i).decompose()
        card.location, card.rotation_quaternion, card.scale = location, quaternion, (1, 1, 1)
        for path in ("location", "rotation_quaternion", "scale"):
            card.keyframe_insert(path, frame=frame)

# Frame every pose of the loop, then back off a little.
corners = [m @ Vector((x, y, 0)) for frame in range(1, LOOP + 1, 3) for m in (card_matrix(frame, i) for i in range(6))
           for x, y in ((-CARD_W / 2, -CARD_L / 2), (CARD_W / 2, -CARD_L / 2), (CARD_W / 2, CARD_L / 2), (-CARD_W / 2, CARD_L / 2))]
center = sum(corners, Vector()) / len(corners)
bpy.context.view_layer.update()
location, _ = camera.camera_fit_coords(bpy.context.evaluated_depsgraph_get(), [v for c in corners for v in c])
camera.location = Vector(location) + toward * (Vector(location) - center).dot(toward) * 0.12

scene.view_settings.exposure = EXPOSURE
next(n for n in scene.world.node_tree.nodes if n.type == "BACKGROUND").inputs["Strength"].default_value = WORLD
lights = []
for name, watts, color, size, (x, y, z) in (KEY, FILL, RIM):
    light = bpy.data.objects[name]
    light.data.energy, light.data.color, light.data.size, light.data.shape = watts, color, size, "DISK"
    light.data.shadow_maximum_resolution = 0.0001
    light.location = center + right * x + up * y + toward * z
    light.rotation_mode = "QUATERNION"
    light.rotation_quaternion = (center - light.location).to_track_quat("-Z", "Y")
    lights.append((name, watts, color, light.location.copy()))
for obj in bpy.data.objects:
    if obj.type == "LIGHT" and obj.name not in {KEY[0], FILL[0], RIM[0]}:
        obj.hide_render = True

scene.frame_start, scene.frame_end = 1, LOOP
scene.render.fps = FPS
scene.render.resolution_x = scene.render.resolution_y = 960
scene.render.film_transparent = True

if STILL:
    scene.frame_set(STILL[0])
    scene.render.filepath = STILL[1]
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    bpy.ops.render.render(write_still=True)
    print("RENDERED", STILL[1])
    sys.exit(0)


def y_up(v):
    return [round(v.x, 5), round(v.z, 5), round(-v.y, 5)]


def hex_color(rgb):
    return "#" + "".join(f"{round(c * 255):02X}" for c in rgb)


radius = max((c - center).length for c in corners)
# The render is square, so the camera's view angle (sensor width) is its vertical one too.
manifest = {
    "version": 1,
    "fps": FPS,
    "frameCount": LOOP,
    "camera": {"entity": camera.name, "projection": "perspective", "verticalFovDegrees": round(math.degrees(camera.data.angle), 3)},
    "exposure": EXPOSURE,
    "environmentIntensity": WORLD,
    "shadows": True,
    "lights": [
        {"name": name, "color": hex_color(color), "energyW": watts, "position": y_up(position),
         **({"type": "spot", "target": y_up(center), "shadow": {"extent": round(radius * 1.1, 4)}} if name == KEY[0] else {})}
        for name, watts, color, position in lights
    ],
}
OUT.mkdir(parents=True, exist_ok=True)
(OUT / "cardfan.json").write_text(json.dumps(manifest))

for obj in bpy.data.objects:
    obj.select_set(obj.type in {"MESH", "CAMERA"})
scene.frame_set(1)
bpy.ops.export_scene.gltf(
    filepath=str(OUT / "cardfan.glb"),
    use_selection=True,
    export_format="GLB",
    export_yup=True,
    export_apply=True,
    export_cameras=True,
    export_lights=False,
    export_materials="EXPORT",
    export_image_format="WEBP",
    export_image_quality=88,
    export_animations=True,
    export_animation_mode="SCENE",
    export_frame_range=True,
    export_force_sampling=True,
    export_frame_step=1,
    export_optimize_animation_size=True,
    export_anim_slide_to_zero=True,
    export_meshopt_compression_enable=True,
    export_meshopt_extension="EXT_meshopt_compression",
)
print("EXPORT cardfan.glb", json.dumps(manifest["camera"]), len(manifest["lights"]), "lights")
