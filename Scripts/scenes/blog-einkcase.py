"""blog_einkcase.glb: the iPhone in the orange NFC e-ink case, for the blog's phone figures.

The phone figures show it from the back: its e-ink panel (mesh EInkPanel, UVs over the 240 x 416
active area) is the screen the player paints the looks onto. The case and the phone come from
NFCcoolScenes' E-ink Case scene (scripts/einkcase_case.py, studio.import_phone), so it is the same
model as the scene's; this only builds it once, still, and exports it. Slim the result like the
blog phone (Scripts/scenes/blog-phone.mjs).

  SCENES=~/Developer/eink-scene/NFCcoolScenes
  $SCENES/scripts/blender.sh -P "$PWD/Scripts/scenes/blog-einkcase.py" -- <out.glb>
"""

import sys
from pathlib import Path

import bpy

SCENES = Path(bpy.path.abspath("//")) if bpy.data.filepath else Path.cwd()
sys.path.insert(0, str(SCENES / "scripts"))
import einkcase_case  # noqa: E402
import studio  # noqa: E402

out = Path(sys.argv[sys.argv.index("--") + 1]).resolve()

bpy.ops.wm.read_factory_settings(use_empty=True)
panel_look = studio.ASSETS / "einkcase" / "look_blank.png"
phone = studio.import_phone(panel_look)
frames = Path(bpy.app.tempdir) / "einkcase_panel"
frames.mkdir(parents=True, exist_ok=True)
(frames / "0001.png").write_bytes(panel_look.read_bytes())
einkcase_case.build(phone, frames)

# The player paints the phone's screen and the panel itself: export them without their images
# (an image sequence does not survive glTF anyway), as plain black surfaces.
for name in ("PhoneScreen", "EInkPanel"):
    material = bpy.data.materials.get(name)
    if not material:
        continue
    for node in [n for n in material.node_tree.nodes if n.type == "TEX_IMAGE"]:
        material.node_tree.nodes.remove(node)
    bsdf = next(n for n in material.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
    bsdf.inputs["Base Color"].default_value = (0, 0, 0, 1)

bpy.ops.object.select_all(action="SELECT")
bpy.ops.export_scene.gltf(filepath=str(out), export_format="GLB", use_selection=True,
                          export_apply=True, export_cameras=False, export_lights=False,
                          export_animations=False, export_image_format="WEBP")
print(f"EXPORT {out}")
