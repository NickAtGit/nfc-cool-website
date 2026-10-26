# /fidget Figure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** An unlisted, unbranded `/fidget/` page where a Blender-built collectible figure fills the viewport and can be spun, poked and played with, with baked animations, a live canvas face, particle FX and synthesized sound.

**Architecture:** Blender 5.2 builds, rigs, animates and exports `figure.glb` from Python scripts in `Scripts/fidget/blender/`. A self-contained page in `Content/StaticFiles/fidget/` (copied verbatim by the existing `StaticRootFilesRenderer`) runs three.js r186 from one vendored, tree-shaken bundle. Pure logic modules (turntable physics, gestures, behavior, face model, quality tiers) are unit-tested with `node --test`. The DOM, WebGL and audio glue is verified in a real browser.

**Tech Stack:** Blender 5.2.2 (Python, Cycles, Workbench), three.js 0.186.1, esbuild 0.28.2 (vendoring only), Web Audio API, Node 22 test runner, SiteKit (existing Swift build).

**Spec:** `docs/superpowers/specs/2026-09-26-fidget-figure-design.md`

## Global Constraints

- Blender binary: `/Applications/Blender.app/Contents/MacOS/Blender` (5.2.2). Always run it with `--background --factory-startup`.
- three.js `0.186.1` and esbuild `0.28.2`, pinned in `Scripts/fidget/vendor-three.sh`. No other runtime dependency and no CDN.
- Every runtime script ends in `.mjs`. SiteKit's `AssetMinifier` rewrites `.js`/`.css` files with a regex minifier and would corrupt them.
- `index.html` must never contain the literal string `<head>`. Its head tag is `<head data-standalone>`, which keeps the Smart App Banner, font preloads, robots, theme-color, Search Console and twitter:site injectors out.
- The page is `noindex, nofollow`, titled `Fidget`, linked from nowhere, and carries no logo, product name or brand colour.
- Budgets:
  - `figure.glb` ≤ 1,048,576 bytes and ≤ 60,000 triangles (target 25-40k).
  - Our JS plus the bundle ≤ about 200 KB gzip.
  - Under 50 draw calls.
  - 60 fps at the `medium` tier on an iPhone 13-class phone.
- GLB contract: names in `Content/StaticFiles/fidget/contract.mjs` must match the Blender scripts exactly.
  - Bone names use underscores, because three.js strips `.` from node names.
  - No mesh object may share a name with a bone.
- Respect `prefers-reduced-motion`. Audio stays silent until the first user gesture. The mute flag lives in `localStorage` behind try/catch.
- No em or en dashes in any user-facing text, code comment or commit (repo rule). English headings use Title Case.
- **Do not commit unless Nico asks** (spec and repo rule). Each task ends with a suggested commit message for when he does.
- Tests: `node --test "Scripts/fidget/tests/*.test.mjs"` from the repo root.
- Blender, three.js and site-build output land in `Scripts/fidget/out/` (gitignored).

## Review Focus

The most likely ways this breaks for a real person, none of which the spec tests directly. Each one has a pinned test or check in the task named in brackets.

1. **Second finger lands mid-spin** (iOS/Android pinch while dragging): the spin must let go with zero velocity and the gesture must become a pinch zoom, never a stuck grab or a wild fling. [Task 6, gesture test]
2. **Storage that throws** (Safari private mode, blocked site data): reading or writing the mute flag must not crash the audio system, and the default is "not muted". [Task 10, audio test]
3. **Returning to a hidden tab** mid-dance or mid-scan: no giant animation step, and the music scheduler must skip ahead instead of firing a burst of queued notes. [Task 5 `frameDt` test, Task 10 `stepsToSchedule` test]
4. **Rotating the phone or the iOS toolbar collapsing**: the canvas, composer and camera distance refit, and the base never leaves the frame in portrait. [Task 5 `distanceScale` test, Task 11 browser check]
5. **A weak GPU or lost WebGL context**: the quality tier drops at most once per slowdown and never climbs back, and a lost context shows the fallback instead of a frozen canvas. [Task 5 tier test, Task 11 context-loss check]

---

## File Structure

| File | Responsibility |
| --- | --- |
| `Scripts/fidget/blender/common.py` | Scene reset, colour conversion, materials, mesh primitives (rounded box/cylinder, sphere, capsule), modifier apply, triangle count |
| `Scripts/fidget/blender/face_image.py` | Neutral face as a numpy-drawn image, so Cycles renders show the same face as the runtime canvas |
| `Scripts/fidget/blender/model.py` | The robot: parts, materials, face UV island. Returns `(object, region, bone)` tuples |
| `Scripts/fidget/blender/concepts.py` | M1 blockouts (astronaut, sprite) + palettes for all three concepts |
| `Scripts/fidget/blender/studio.py` | Cycles studio: render settings, world, sweep, softboxes, named camera views |
| `Scripts/fidget/blender/rig.py` | Bone table, armature build, bone-parenting of parts |
| `Scripts/fidget/blender/anims.py` | Pose helpers + the 13 clips |
| `Scripts/fidget/blender/export.py` | AO bake to vertex colours, Workbench playblast, glTF export |
| `Scripts/fidget/blender/build_figure.py` | CLI entry (`--concepts`, `--final`) |
| `Scripts/fidget/vendor-three.sh` + `three-entry.mjs` | Rebuild the tree-shaken three bundle from pinned versions |
| `Scripts/fidget/check-site-output.sh` | Proves the built page survived SiteKit's processors untouched |
| `Scripts/fidget/tests/*.test.mjs` + `glb.mjs` | Node tests (pure modules, GLB contract, bundle exports, page shell) |
| `Content/StaticFiles/fidget/index.html` | Bare document: markup, inline CSS, importmap |
| `…/contract.mjs` | Clip, bone, region, material names shared with Blender |
| `…/math.mjs` | `damp`, `clamp`, easings, spring, seeded PRNG, `frameDt` |
| `…/quality.mjs` | Initial tier pick + one-way tier monitor |
| `…/layout.mjs` | DPR cap per tier, portrait camera distance fit |
| `…/scene.mjs` | Studio environment, key light, floor shadow, backdrop pass, post chain, tiers |
| `…/figure.mjs` | GLB load, clip crossfades, gaze, spin lag, antenna spring, tap regions |
| `…/turntable.mjs` | Spin physics, detents, dizziness meter |
| `…/gesture.mjs` | Pointer sequences → spin/tilt/pinch/tap/release intents |
| `…/controls.mjs` | Camera rig + DOM input binding + keyboard map |
| `…/behavior.mjs` | State machine: intro, idle, glance, yawn, sleep, reactions, actions, dizzy, scan |
| `…/face-model.mjs` | Parametric eyes/mouth, expressions, gaze, blinking |
| `…/face.mjs` | Canvas renderer for the face model → `CanvasTexture` |
| `…/fx.mjs` | Dizzy stars, Zzz, confetti, scan rings, glow, phone prop |
| `…/audio.mjs` | Web Audio synth: SFX, babble voice, whoosh, ticks, dance loop, mute |
| `…/fidget.mjs` | Boot and per-frame orchestration |
| `…/figure.glb`, `…/poster.webp`, `…/vendor/three.bundle.min.mjs` | Built artifacts (committed) |

The pure modules (`math`, `quality`, `layout`, `turntable`, `gesture`, `behavior`, `face-model`, the pure exports of `audio`, `contract`) import nothing from `three`, so Node can test them.

---

### Task 1: Blender Toolkit, Studio and Concept Montage (Checkpoint M1)

**Files:**
- Create: `Scripts/fidget/blender/common.py`, `face_image.py`, `model.py`, `concepts.py`, `studio.py`, `build_figure.py`
- Modify: `.gitignore` (append `Scripts/fidget/out/`)

**Interfaces:**
- Produces:
  - `common.material(name, color, roughness=0.4, metallic=0.0, coat=0.0, coat_roughness=0.06, emission=None, emission_strength=0.0, transmission=0.0, ior=1.45) -> Material`
  - `common.rounded_box(name, size, radius, mat, location, rotation, segments=6, bulge=0.0) -> Object`
  - `common.rounded_cylinder(name, radius, depth, mat, location, rotation, edge=0.01, segments=48) -> Object`
  - `common.sphere(...)` and `common.capsule(...)`
  - `common.apply_modifiers(obj)`, `common.triangles(objs) -> int`, `common.remove(objs)`
  - `model.build_robot(palette: dict, key: str|None) -> list[(Object, region: str, bone: str|None)]`
  - `model.Z0 = 0.075`
  - `concepts.PALETTES[concept][key] -> {'primary','secondary','accent'}` and `concepts.BUILDERS`
  - `studio.build(scene, samples, res)`, `studio.render(path, view)`, `studio.camera(view)`, `studio.VIEWS`

- [ ] **Step 1: Ignore build output**

```bash
printf '\n# /fidget: Blender renders, playblasts, scratch output\nScripts/fidget/out/\n' >> .gitignore
```

- [ ] **Step 2: Write `Scripts/fidget/blender/common.py`**

```python
"""Shared helpers for the /fidget figure build (Blender 5.2, run headless)."""
import math

import bmesh
import bpy
from mathutils import Vector


def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    return bpy.context.scene


def _srgb_to_linear(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def hex_rgba(hex_color):
    """'#RRGGBB' -> linear RGBA. Blender colour sockets are scene-linear."""
    h = hex_color.lstrip('#')
    return tuple(_srgb_to_linear(int(h[i:i + 2], 16) / 255) for i in (0, 2, 4)) + (1.0,)


def principled(mat):
    if mat.node_tree is None:
        mat.use_nodes = True
    return next(n for n in mat.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')


def material(name, color, roughness=0.4, metallic=0.0, coat=0.0, coat_roughness=0.06,
             emission=None, emission_strength=0.0, transmission=0.0, ior=1.45):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    i = principled(mat).inputs
    i['Base Color'].default_value = hex_rgba(color)
    i['Roughness'].default_value = roughness
    i['Metallic'].default_value = metallic
    i['Coat Weight'].default_value = coat
    i['Coat Roughness'].default_value = coat_roughness
    i['Transmission Weight'].default_value = transmission
    i['IOR'].default_value = ior
    if emission:
        i['Emission Color'].default_value = hex_rgba(emission)
        i['Emission Strength'].default_value = emission_strength
    mat.diffuse_color = hex_rgba(color)  # what Workbench playblasts show
    return mat


def screen_material(name, image, strength=3.0):
    """Glossy black glass whose emission is the face image (renders only; export strips it)."""
    mat = material(name, '#07090D', roughness=0.1, coat=1.0, coat_roughness=0.02)
    bsdf = principled(mat)
    tex = mat.node_tree.nodes.new('ShaderNodeTexImage')
    tex.image = image
    mat.node_tree.links.new(tex.outputs['Color'], bsdf.inputs['Emission Color'])
    bsdf.inputs['Emission Strength'].default_value = strength
    return mat


def _object(name, bm, mat, smooth=True):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    if mat is not None:
        me.materials.append(mat)
    for poly in me.polygons:
        poly.use_smooth = smooth
    obj = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(obj)
    return obj


def _bevel(obj, width, segments, angle=None):
    mod = obj.modifiers.new('bevel', 'BEVEL')
    mod.width = width
    mod.segments = segments
    mod.use_clamp_overlap = True
    mod.harden_normals = True  # keeps flat faces flat under smooth shading
    if angle is None:
        mod.limit_method = 'NONE'
    else:
        mod.limit_method = 'ANGLE'
        mod.angle_limit = math.radians(angle)
    return mod


def rounded_box(name, size, radius, mat, location=(0, 0, 0), rotation=(0, 0, 0), segments=6, bulge=0.0):
    """A soft vinyl block. `bulge` pushes the -Y face outward, like a curved screen."""
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    bmesh.ops.scale(bm, vec=Vector(size), verts=bm.verts)
    angle = None
    if bulge:
        bmesh.ops.subdivide_edges(bm, edges=bm.edges[:], cuts=8, use_grid_fill=True)
        hw, hh = size[0] / 2, size[2] / 2
        for v in bm.verts:
            if v.co.y < 0:
                v.co.y -= bulge * (1 - (v.co.x / hw) ** 2) * (1 - 0.5 * (v.co.z / hh) ** 2)
        angle = 35  # bevel the box edges only, not the grid
    obj = _object(name, bm, mat)
    obj.location = location
    obj.rotation_euler = rotation
    _bevel(obj, radius, segments, angle)
    return obj


def rounded_cylinder(name, radius, depth, mat, location=(0, 0, 0), rotation=(0, 0, 0), edge=0.01, segments=48):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=segments,
                          radius1=radius, radius2=radius, depth=depth)
    obj = _object(name, bm, mat)
    obj.location = location
    obj.rotation_euler = rotation
    _bevel(obj, edge, 4, angle=30)
    return obj


def sphere(name, radius, mat, location=(0, 0, 0), scale=(1, 1, 1), segments=32, rings=16):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=segments, v_segments=rings, radius=radius)
    obj = _object(name, bm, mat)
    obj.location = location
    obj.scale = scale
    return obj


def capsule(name, radius, length, mat, location=(0, 0, 0), rotation=(0, 0, 0), segments=32, rings=17):
    """A sphere split at the equator and stretched: a pill `length` taller than it is wide.
    An odd ring count means no vertex sits exactly on the equator."""
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=segments, v_segments=rings, radius=radius)
    for v in bm.verts:
        v.co.z += length / 2 if v.co.z > 0 else -length / 2
    obj = _object(name, bm, mat)
    obj.location = location
    obj.rotation_euler = rotation
    return obj


def apply_modifiers(obj):
    """Bake the modifier stack into the mesh (needed before AO baking and UV edits)."""
    if not obj.modifiers:
        return
    dg = bpy.context.evaluated_depsgraph_get()
    mesh = bpy.data.meshes.new_from_object(obj.evaluated_get(dg), preserve_all_data_layers=True, depsgraph=dg)
    old = obj.data
    obj.modifiers.clear()
    obj.data = mesh
    if old.users == 0:
        bpy.data.meshes.remove(old)


def triangles(objs):
    dg = bpy.context.evaluated_depsgraph_get()
    total = 0
    for obj in objs:
        if obj.type != 'MESH':
            continue
        me = obj.evaluated_get(dg).to_mesh()
        total += sum(len(p.vertices) - 2 for p in me.polygons)
        obj.evaluated_get(dg).to_mesh_clear()
    return total


def remove(objs):
    for obj in objs:
        bpy.data.objects.remove(obj, do_unlink=True)
```

- [ ] **Step 3: Write `Scripts/fidget/blender/face_image.py`**

```python
"""The neutral face, drawn with numpy distance fields, so Cycles renders show the
same face the runtime canvas draws (face.mjs uses the same sizes and positions)."""
import bpy
import numpy as np

W, H = 512, 320
COLOR = (0.28, 0.93, 1.0)  # linear #8FF6FF


def _rounded_rect(x, y, cx, cy, hw, hh, r):
    qx = np.abs(x - cx) - (hw - r)
    qy = np.abs(y - cy) - (hh - r)
    return np.hypot(np.maximum(qx, 0), np.maximum(qy, 0)) + np.minimum(np.maximum(qx, qy), 0) - r


def neutral(name):
    image = bpy.data.images.get(name)
    if image:
        return image
    rows, x = np.mgrid[0:H, 0:W].astype(np.float32)
    y = H - 1 - rows  # Blender stores the bottom row first; draw in top-down canvas coordinates
    d = np.minimum(_rounded_rect(x, y, 0.32 * W, 0.47 * H, 36, 59, 34),
                   _rounded_rect(x, y, 0.68 * W, 0.47 * H, 36, 59, 34))
    mx = (x - 0.5 * W) / 42.0
    smile = 0.8 * H + 6 * (1 - mx ** 2)
    d = np.minimum(d, np.where(np.abs(mx) <= 1, np.abs(y - smile) - 5, 1e3))
    ink = np.clip(0.5 - d, 0, 1)
    glow = 0.35 * np.exp(-np.maximum(d, 0) / 8.0)
    v = np.clip(ink + glow * (1 - ink), 0, 1)
    rgba = np.zeros((H, W, 4), np.float32)
    for c in range(3):
        rgba[..., c] = v * COLOR[c]
    rgba[..., 3] = 1.0
    image = bpy.data.images.new(name, W, H, alpha=False, float_buffer=True)
    image.pixels.foreach_set(rgba.ravel())
    return image
```

- [ ] **Step 4: Write `Scripts/fidget/blender/model.py`**

Mesh objects never reuse a bone name (see Global Constraints), so parts carry suffixes such as `_shell` and `_rubber`.

```python
"""The robot with a screen face: about 1.06 tall on a 0.62 wide collectible base.
Z is up and the figure faces -Y (Blender front view)."""
import math

import face_image
from common import apply_modifiers, capsule, material, rounded_box, rounded_cylinder, screen_material, sphere

Z0 = 0.075  # top of the base: the figure stands here
RIGHT = math.radians(90)


def face_uvs(obj):
    """The runtime canvas maps onto the -Y facing part of the screen as one 0..1 island.
    Every other face samples UV (0, 0), which the canvas keeps black."""
    me = obj.data
    uv = me.uv_layers[0] if me.uv_layers else me.uv_layers.new(name='UVMap')
    front = [p for p in me.polygons if p.normal.y < -0.5]
    xs = [me.vertices[i].co.x for p in front for i in p.vertices]
    zs = [me.vertices[i].co.z for p in front for i in p.vertices]
    x0, x1, z0, z1 = min(xs), max(xs), min(zs), max(zs)
    for p in me.polygons:
        for li in p.loop_indices:
            co = me.vertices[me.loops[li].vertex_index].co
            uv.data[li].uv = ((co.x - x0) / (x1 - x0), (co.z - z0) / (z1 - z0)) if p.normal.y < -0.5 else (0.0, 0.0)


def build_robot(palette, key=None):
    """Returns [(object, region, bone)]. `key` prefixes names so several palettes can
    coexist in one concept scene; the final export passes key=None so materials and
    objects carry the contract names."""
    n = (lambda s: s) if key is None else (lambda s: f'{key}_{s}')
    shell = material(n('shell_primary'), palette['primary'], roughness=0.36, coat=0.35)
    shell2 = material(n('shell_secondary'), palette['secondary'], roughness=0.42, coat=0.25)
    rubber = material(n('rubber'), '#2A2C33', roughness=0.7)
    metal = material(n('metal'), '#C8CCD4', roughness=0.26, metallic=1.0)
    accent = material(n('accent'), palette['accent'], roughness=0.3, coat=0.5)
    core = material(n('core_light'), '#7DF9FF', roughness=0.3, emission='#7DF9FF', emission_strength=3.0)
    screen = screen_material(n('face_screen'), face_image.neutral(n('face')))
    rim = material(n('base_rim'), palette['accent'], roughness=0.34, coat=0.4)
    top = material(n('base_top'), '#F7F4EE', roughness=0.22, coat=0.6)

    parts = []

    def add(obj, region, bone):
        parts.append((obj, region, bone))
        return obj

    # Base: never rigged, so it stays put when the figure jumps.
    add(rounded_cylinder(n('base_body'), 0.31, 0.075, rim, (0, 0, 0.0375), edge=0.014), 'base', None)
    add(rounded_cylinder(n('base_top'), 0.285, 0.012, top, (0, 0, 0.078), edge=0.004), 'base', None)

    for side, x in (('L', 1), ('R', -1)):
        add(rounded_box(n(f'foot_{side}_shell'), (0.12, 0.17, 0.06), 0.026, shell2, (0.085 * x, -0.015, Z0 + 0.03)), 'belly', f'foot_{side}')
        add(rounded_cylinder(n(f'shin_{side}_rubber'), 0.032, 0.075, rubber, (0.085 * x, 0, Z0 + 0.095), edge=0.008, segments=32), 'belly', f'shin_{side}')
        add(sphere(n(f'shoulder_{side}_ball'), 0.045, rubber, (0.175 * x, 0, 0.50)), 'belly', f'upper_arm_{side}')
        add(rounded_cylinder(n(f'upper_arm_{side}_rubber'), 0.03, 0.075, rubber, (0.187 * x, 0, 0.445),
                             rotation=(0, math.radians(8 * x), 0), edge=0.008, segments=32), 'belly', f'upper_arm_{side}')
        add(capsule(n(f'forearm_{side}_shell'), 0.042, 0.05, shell, (0.203 * x, 0, 0.365),
                    rotation=(0, math.radians(6 * x), 0)), 'belly', f'forearm_{side}')
        add(sphere(n(f'hand_{side}_mitten'), 0.05, shell2, (0.212 * x, 0, 0.29), scale=(1, 0.9, 1.1)), 'belly', f'hand_{side}')
        add(sphere(n(f'thumb_{side}'), 0.02, shell2, (0.19 * x, -0.04, 0.31), segments=16, rings=8), 'belly', f'hand_{side}')
        add(rounded_cylinder(n(f'ear_{side}'), 0.075, 0.05, shell2, (0.265 * x, 0, 0.745),
                             rotation=(0, RIGHT, 0), edge=0.012, segments=40), 'head', 'head')
        add(rounded_cylinder(n(f'ear_cap_{side}'), 0.04, 0.02, metal, (0.295 * x, 0, 0.745),
                             rotation=(0, RIGHT, 0), edge=0.005, segments=32), 'head', 'head')

    add(rounded_box(n('pelvis_shell'), (0.25, 0.19, 0.08), 0.035, shell2, (0, 0, 0.245)), 'belly', 'hips')
    add(rounded_box(n('torso_shell'), (0.30, 0.25, 0.26), 0.08, shell, (0, 0, 0.415)), 'belly', 'chest')
    add(rounded_cylinder(n('chest_plate'), 0.07, 0.018, shell2, (0, -0.129, 0.42), rotation=(RIGHT, 0, 0), edge=0.005), 'belly', 'chest')
    add(rounded_cylinder(n('core_light'), 0.02, 0.01, core, (0, -0.139, 0.42), rotation=(RIGHT, 0, 0), edge=0.003, segments=24), 'belly', 'chest')
    for i in range(4):
        a = math.radians(45 + 90 * i)
        add(rounded_cylinder(n(f'screw_{i}'), 0.0065, 0.004, metal, (0.05 * math.cos(a), -0.139, 0.42 + 0.05 * math.sin(a)),
                             rotation=(RIGHT, 0, 0), edge=0.0015, segments=16), 'belly', 'chest')
    add(rounded_box(n('backpack'), (0.2, 0.08, 0.17), 0.03, shell2, (0, 0.15, 0.42)), 'belly', 'chest')
    for i, z in enumerate((0.455, 0.42, 0.385)):
        add(rounded_box(n(f'vent_{i}'), (0.12, 0.014, 0.012), 0.005, rubber, (0, 0.19, z), segments=3), 'belly', 'chest')
    add(rounded_cylinder(n('neck_rubber'), 0.045, 0.045, rubber, (0, 0, 0.56), edge=0.008, segments=32), 'belly', 'neck')
    add(rounded_box(n('head_shell'), (0.5, 0.4, 0.36), 0.11, shell, (0, 0, 0.745)), 'head', 'head')
    visor = add(rounded_box(n('visor'), (0.4, 0.06, 0.25), 0.05, screen, (0, -0.19, 0.745), bulge=0.012), 'head', 'head')
    apply_modifiers(visor)
    face_uvs(visor)
    add(rounded_cylinder(n('antenna_base'), 0.022, 0.03, metal, (0.1, 0.02, 0.935), edge=0.006, segments=24), 'head', 'head')
    add(rounded_cylinder(n('antenna_stem_1'), 0.008, 0.065, metal, (0.1, 0.02, 0.9675), edge=0.002, segments=16), 'head', 'antenna_1')
    add(rounded_cylinder(n('antenna_stem_2'), 0.007, 0.055, metal, (0.1, 0.02, 1.0225), edge=0.002, segments=16), 'head', 'antenna_2')
    add(sphere(n('antenna_tip'), 0.028, accent, (0.1, 0.02, 1.062)), 'head', 'antenna_2')
    return parts
```

- [ ] **Step 5: Write `Scripts/fidget/blender/concepts.py`**

```python
"""Checkpoint M1: three concepts on the same base, in the same studio, two palettes each."""
import math

from common import capsule, material, rounded_box, rounded_cylinder, sphere
from model import Z0, build_robot

PALETTES = {
    'robot': {'A': dict(primary='#F26B5B', secondary='#F4EDE4', accent='#F2B84B'),
              'B': dict(primary='#7FD1B9', secondary='#243049', accent='#FF8A65')},
    'astronaut': {'A': dict(primary='#F2F1EC', secondary='#FF7A3D', accent='#B79CFF'),
                  'B': dict(primary='#F2F1EC', secondary='#1FB5A8', accent='#FFB38A')},
    'sprite': {'A': dict(primary='#E5484D', secondary='#F6E7CF', accent='#FFD166'),
               'B': dict(primary='#8E6CF0', secondary='#DDF3E4', accent='#FF9ECF')},
}


def _base(key, p):
    rim = material(f'{key}_rim', p['accent'], roughness=0.34, coat=0.4)
    top = material(f'{key}_top', '#F7F4EE', roughness=0.22, coat=0.6)
    return [rounded_cylinder(f'{key}_base', 0.31, 0.075, rim, (0, 0, 0.0375), edge=0.014),
            rounded_cylinder(f'{key}_base_top', 0.285, 0.012, top, (0, 0, 0.078), edge=0.004)]


def robot(key, p):
    return [obj for obj, _, _ in build_robot(p, key)]


def astronaut(key, p):
    suit = material(f'{key}_suit', p['primary'], roughness=0.5, coat=0.2)
    trim = material(f'{key}_trim', p['secondary'], roughness=0.35, coat=0.4)
    skin = material(f'{key}_skin', p['accent'], roughness=0.45, coat=0.3)
    glass = material(f'{key}_glass', '#FFFFFF', roughness=0.02, transmission=1.0, ior=1.45)
    eye = material(f'{key}_eye', '#15161A', roughness=0.08, coat=1.0)
    objs = _base(key, p)
    for side, x in (('L', 1), ('R', -1)):
        objs += [
            rounded_box(f'{key}_boot_{side}', (0.12, 0.16, 0.07), 0.03, trim, (0.08 * x, -0.01, Z0 + 0.035)),
            capsule(f'{key}_arm_{side}', 0.05, 0.12, suit, (0.19 * x, 0, Z0 + 0.3), rotation=(0, math.radians(-15 * x), 0)),
            sphere(f'{key}_glove_{side}', 0.055, trim, (0.215 * x, 0, Z0 + 0.19)),
            sphere(f'{key}_eye_{side}', 0.035, eye, (0.07 * x, -0.17, Z0 + 0.68), scale=(1, 0.6, 1.3)),
        ]
    objs += [
        capsule(f'{key}_body', 0.15, 0.14, suit, (0, 0, Z0 + 0.25)),
        rounded_box(f'{key}_pack', (0.24, 0.12, 0.24), 0.05, suit, (0, 0.13, Z0 + 0.3)),
        rounded_cylinder(f'{key}_collar', 0.15, 0.04, trim, (0, 0, Z0 + 0.46), edge=0.012),
        sphere(f'{key}_head', 0.19, skin, (0, 0, Z0 + 0.66)),
        sphere(f'{key}_helmet', 0.26, glass, (0, 0, Z0 + 0.66), segments=64, rings=32),
        rounded_cylinder(f'{key}_antenna', 0.007, 0.1, trim, (0.11, 0.09, Z0 + 0.95), edge=0.002, segments=16),
        sphere(f'{key}_antenna_tip', 0.025, trim, (0.11, 0.09, Z0 + 1.01)),
    ]
    return objs


def sprite(key, p):
    cap = material(f'{key}_cap', p['primary'], roughness=0.38, coat=0.35)
    body = material(f'{key}_body', p['secondary'], roughness=0.5, coat=0.15)
    spot = material(f'{key}_spot', '#FFFDF7', roughness=0.4, coat=0.3)
    blush = material(f'{key}_blush', p['accent'], roughness=0.6)
    eye = material(f'{key}_eye', '#15161A', roughness=0.08, coat=1.0)
    glint = material(f'{key}_glint', '#FFFFFF', roughness=0.2, emission='#FFFFFF', emission_strength=2.0)
    objs = _base(key, p)
    for side, x in (('L', 1), ('R', -1)):
        objs += [
            sphere(f'{key}_foot_{side}', 0.07, body, (0.085 * x, -0.02, Z0 + 0.04), scale=(1, 1.3, 0.6)),
            capsule(f'{key}_arm_{side}', 0.04, 0.05, body, (0.18 * x, 0, Z0 + 0.25), rotation=(0, math.radians(-30 * x), 0)),
            sphere(f'{key}_eye_{side}', 0.04, eye, (0.075 * x, -0.155, Z0 + 0.33), scale=(1, 0.5, 1.35)),
            sphere(f'{key}_glint_{side}', 0.012, glint, (0.085 * x, -0.172, Z0 + 0.35), segments=12, rings=6),
            sphere(f'{key}_blush_{side}', 0.03, blush, (0.12 * x, -0.14, Z0 + 0.27), scale=(1.4, 0.3, 0.8)),
        ]
    objs += [
        capsule(f'{key}_stem', 0.17, 0.12, body, (0, 0, Z0 + 0.27)),
        sphere(f'{key}_cap', 0.34, cap, (0, 0, Z0 + 0.62), scale=(1, 1, 0.62), segments=64, rings=32),
    ]
    a, c = 0.34, 0.34 * 0.62
    for i, (az, el) in enumerate([(-90, 50), (-45, 25), (-135, 25), (0, 45), (180, 45), (90, 40), (-90, 86)]):
        t, f = math.radians(az), math.radians(el)
        s = sphere(f'{key}_spot_{i}', 0.055, spot, (a * math.cos(f) * math.cos(t), a * math.cos(f) * math.sin(t), Z0 + 0.62 + c * math.sin(f)),
                   scale=(1, 1, 0.35), segments=24, rings=12)
        normal = s.location.copy()
        normal.z -= Z0 + 0.62
        normal.x /= a * a
        normal.y /= a * a
        normal.z /= c * c
        s.rotation_euler = normal.to_track_quat('Z', 'Y').to_euler()
        objs.append(s)
    return objs


BUILDERS = {'robot': robot, 'astronaut': astronaut, 'sprite': sprite}
```

- [ ] **Step 6: Write `Scripts/fidget/blender/studio.py`**

```python
"""A seamless photo-studio sweep with softboxes, for concept and reference renders."""
import math

import bmesh
import bpy
from mathutils import Vector

from common import hex_rgba, material

BACKDROP = '#E9E5DF'
VIEWS = {  # name: (camera location, look-at target)
    'front': ((0, -3.6, 0.62), (0, 0, 0.5)),
    'three_quarter': ((-2.3, -2.8, 0.95), (0, 0, 0.5)),
    'back': ((0.9, 3.4, 0.9), (0, 0, 0.5)),
    'closeup': ((-0.75, -1.45, 0.98), (0, 0, 0.74)),
}


def _look_at(obj, target):
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat('-Z', 'Y').to_euler()


def _render_settings(scene, samples, res):
    scene.render.engine = 'CYCLES'
    prefs = bpy.context.preferences.addons['cycles'].preferences
    prefs.compute_device_type = 'METAL'
    prefs.get_devices()
    for device in prefs.devices:
        device.use = True
    scene.cycles.device = 'GPU'
    scene.cycles.samples = samples
    scene.cycles.use_adaptive_sampling = True
    scene.cycles.use_denoising = True
    scene.render.use_persistent_data = True
    scene.render.resolution_x, scene.render.resolution_y = res
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = 'PNG'
    try:
        scene.view_settings.view_transform = 'AgX'
        scene.view_settings.look = 'AgX - Medium High Contrast'
    except TypeError:
        pass  # look names differ between builds; AgX alone is fine


def _world(scene):
    world = bpy.data.worlds.new('studio')
    scene.world = world
    if world.node_tree is None:
        world.use_nodes = True
    bg = next(n for n in world.node_tree.nodes if n.type == 'BACKGROUND')
    bg.inputs['Color'].default_value = hex_rgba(BACKDROP)
    bg.inputs['Strength'].default_value = 0.35


def _sweep():
    """Floor that curves up into a wall behind the figure: no horizon line."""
    profile = [(-4 + i * 5.5 / 12, 0.0) for i in range(13)]
    radius = 1.2
    for i in range(1, 13):
        t = i / 12 * math.pi / 2
        profile.append((1.5 + radius * math.sin(t), radius - radius * math.cos(t)))
    profile.append((1.5 + radius, 5.0))
    bm = bmesh.new()
    rows = []
    for x in (-6.0, 6.0):
        rows.append([bm.verts.new((x, y, z)) for y, z in profile])
    for i in range(len(profile) - 1):
        bm.faces.new((rows[0][i], rows[0][i + 1], rows[1][i + 1], rows[1][i]))
    me = bpy.data.meshes.new('sweep')
    bm.to_mesh(me)
    bm.free()
    for poly in me.polygons:
        poly.use_smooth = True
    me.materials.append(material('studio_sweep', BACKDROP, roughness=0.9))
    obj = bpy.data.objects.new('sweep', me)
    bpy.context.scene.collection.objects.link(obj)


def _softbox(name, location, size, energy, color='#FFFFFF', size_y=None, target=(0, 0, 0.5)):
    data = bpy.data.lights.new(name, 'AREA')
    data.shape = 'RECTANGLE'
    data.size = size
    data.size_y = size_y or size
    data.energy = energy
    data.color = hex_rgba(color)[:3]
    obj = bpy.data.objects.new(name, data)
    bpy.context.scene.collection.objects.link(obj)
    obj.location = location
    _look_at(obj, target)


def build(scene, samples=128, res=(900, 1100)):
    _render_settings(scene, samples, res)
    _world(scene)
    _sweep()
    _softbox('key', (-1.6, -2.0, 2.4), 1.6, 380, '#FFF6EC')
    _softbox('rim', (1.8, 1.4, 1.6), 0.35, 260, '#EAF2FF', size_y=1.8)
    _softbox('fill', (0.6, -2.8, 0.5), 2.4, 70, size_y=1.0)
    _softbox('top', (0, 0, 3.2), 2.0, 120)


def camera(view, lens=70):
    location, target = VIEWS[view]
    data = bpy.data.cameras.new(f'cam_{view}')
    data.lens = lens
    cam = bpy.data.objects.new(f'cam_{view}', data)
    bpy.context.scene.collection.objects.link(cam)
    cam.location = location
    _look_at(cam, target)
    bpy.context.scene.camera = cam
    return cam


def render(path, view):
    cam = camera(view)
    bpy.context.scene.render.filepath = str(path)
    bpy.ops.render.render(write_still=True)
    bpy.data.objects.remove(cam, do_unlink=True)
```

- [ ] **Step 7: Write `Scripts/fidget/blender/build_figure.py` (concepts mode)**

```python
"""Builds the /fidget figure headless.

  Blender --background --factory-startup --python Scripts/fidget/blender/build_figure.py -- --concepts DIR
"""
import argparse
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import common  # noqa: E402
import concepts  # noqa: E402
import studio  # noqa: E402


def parse():
    argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
    p = argparse.ArgumentParser(prog='build_figure.py')
    p.add_argument('--concepts', metavar='DIR', help='render the M1 concept tiles into DIR')
    p.add_argument('--samples', type=int)
    return p.parse_args(argv)


def run_concepts(out_dir, samples):
    os.makedirs(out_dir, exist_ok=True)
    scene = common.reset_scene()
    studio.build(scene, samples=samples or 128, res=(900, 1100))
    for concept, builder in concepts.BUILDERS.items():
        for palette in ('A', 'B'):
            objs = builder(f'{concept}{palette}', concepts.PALETTES[concept][palette])
            views = ['three_quarter', 'front'] if palette == 'A' else ['three_quarter']
            for view in views:
                studio.render(os.path.join(out_dir, f'{concept}-{palette}-{view}.png'), view)
            common.remove(objs)
    print(f'CONCEPTS_OK {out_dir}')


if __name__ == '__main__':
    args = parse()
    if args.concepts:
        run_concepts(args.concepts, args.samples)
```

- [ ] **Step 8: Run the concept render (takes several minutes; run it in the background)**

Run:
```bash
/Applications/Blender.app/Contents/MacOS/Blender --background --factory-startup \
  --python Scripts/fidget/blender/build_figure.py -- --concepts Scripts/fidget/out/concepts 2>&1 | tail -5
ls Scripts/fidget/out/concepts/*.png | wc -l
```
Expected: the last log line is `CONCEPTS_OK Scripts/fidget/out/concepts`, and the count is `9`. On a Python traceback, fix the named line and rerun. Typical causes are an input socket name that differs in 5.2, or a `bmesh.ops` keyword.

- [ ] **Step 9: Look at every tile yourself before showing Nico**

Open each PNG with the Read tool. Check for:
- no floating or intersecting parts
- the base sitting on the sweep with a soft contact shadow
- the robot's face visible on its visor
- the helmet glass reading as glass

Fix geometry offsets in `concepts.py`/`model.py` and rerun Step 8 until all nine pass.

- [ ] **Step 10: Montage and hand to Nico (CHECKPOINT M1: stop here)**

```bash
cd Scripts/fidget/out/concepts && magick montage \
  robot-A-three_quarter.png robot-B-three_quarter.png robot-A-front.png \
  astronaut-A-three_quarter.png astronaut-B-three_quarter.png astronaut-A-front.png \
  sprite-A-three_quarter.png sprite-B-three_quarter.png sprite-A-front.png \
  -tile 3x3 -geometry 600x733+10+10 -background '#FFFFFF' -label '%t' concepts.png && open concepts.png
```
Ask Nico which concept and which palette he wants, and whether any colour should change. Do not start Task 2 until he answers. Record the answer (concept, palette, any colour edits) at the top of Task 2 in this plan.

- [ ] **Step 11: Suggested commit (only when Nico asks)**

`Add Blender toolkit and concept renders for the /fidget figure`

---
### Task 2: Final Model and Reference Renders (Checkpoint M2)

**M1 decision:** (fill in from Nico's answer: concept, palette, colour edits)

**Files:**
- Modify: `Scripts/fidget/blender/concepts.py` (palette values, if Nico asked for colour edits)
- Modify: `Scripts/fidget/blender/build_figure.py` (add `--final`, `--palette`, `--renders`)
- Create: `Content/StaticFiles/fidget/poster.webp`

**Interfaces:**
- Consumes: `model.build_robot`, `concepts.PALETTES`, `studio.build/render/VIEWS`, `common.apply_modifiers/triangles` (Task 1)
- Produces: `Scripts/fidget/out/hero/{front,three_quarter,back,closeup}.png`. These are the reference the web version is compared against in Task 5.

**If Nico picked the astronaut or the sprite instead of the robot:**
1. Port that builder from `concepts.py` into `model.py` as `build_<concept>(palette, key=None)`, returning `(object, region, bone)` tuples exactly like `build_robot`.
2. Give it the contract material names: `face_screen` for the face surface, `core_light` for one small emissive detail, `base_rim` for the base.
   - Sprite: the face is a flattened disc on the stem front.
   - Astronaut: the face is a front patch on the head sphere, inside the helmet.
3. Run `face_uvs` on the face object.
4. Name no mesh object like a bone.
5. Re-derive the joint positions in `rig.BONES` (Task 3) from that body.

Everything downstream reads names from the contract, so nothing else changes.

- [ ] **Step 1: Apply Nico's M1 notes**

Edit the chosen palette in `concepts.PALETTES` (hex values only) if he asked for colour changes.

- [ ] **Step 2: Replace `Scripts/fidget/blender/build_figure.py`**

```python
"""Builds the /fidget figure headless.

  Blender --background --factory-startup --python Scripts/fidget/blender/build_figure.py -- --concepts DIR
  Blender --background --factory-startup --python Scripts/fidget/blender/build_figure.py -- --final [--palette A] [--renders DIR]
"""
import argparse
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import common  # noqa: E402
import concepts  # noqa: E402
import model  # noqa: E402
import studio  # noqa: E402


def parse():
    argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
    p = argparse.ArgumentParser(prog='build_figure.py')
    p.add_argument('--concepts', metavar='DIR', help='render the M1 concept tiles into DIR')
    p.add_argument('--final', action='store_true', help='build the chosen figure')
    p.add_argument('--palette', default='A')
    p.add_argument('--renders', metavar='DIR', help='Cycles reference renders into DIR')
    p.add_argument('--samples', type=int)
    return p.parse_args(argv)


def run_concepts(out_dir, samples):
    os.makedirs(out_dir, exist_ok=True)
    scene = common.reset_scene()
    studio.build(scene, samples=samples or 128, res=(900, 1100))
    for concept, builder in concepts.BUILDERS.items():
        for palette in ('A', 'B'):
            objs = builder(f'{concept}{palette}', concepts.PALETTES[concept][palette])
            views = ['three_quarter', 'front'] if palette == 'A' else ['three_quarter']
            for view in views:
                studio.render(os.path.join(out_dir, f'{concept}-{palette}-{view}.png'), view)
            common.remove(objs)
    print(f'CONCEPTS_OK {out_dir}')


def run_final(args):
    scene = common.reset_scene()
    parts = model.build_robot(concepts.PALETTES['robot'][args.palette])
    objs = [obj for obj, _, _ in parts]
    for obj in objs:
        common.apply_modifiers(obj)
    print(f'TRIANGLES {common.triangles(objs)}')
    if args.renders:
        os.makedirs(args.renders, exist_ok=True)
        studio.build(scene, samples=args.samples or 384, res=(1200, 1500))
        for view in studio.VIEWS:
            studio.render(os.path.join(args.renders, f'{view}.png'), view)
        print(f'RENDERS_OK {args.renders}')


if __name__ == '__main__':
    args = parse()
    if args.concepts:
        run_concepts(args.concepts, args.samples)
    if args.final:
        run_final(args)
```

- [ ] **Step 3: Check the triangle budget before spending render time**

Run:
```bash
/Applications/Blender.app/Contents/MacOS/Blender --background --factory-startup \
  --python Scripts/fidget/blender/build_figure.py -- --final 2>&1 | grep TRIANGLES
```
Expected: `TRIANGLES n` with n ≤ 60000 (target 25-40k). If it is over, lower `segments` on the largest contributors: spheres 32→24, cylinders 48→32, bevel segments 6→4.

- [ ] **Step 4: Render the reference set (background; several minutes)**

Run:
```bash
/Applications/Blender.app/Contents/MacOS/Blender --background --factory-startup \
  --python Scripts/fidget/blender/build_figure.py -- --final --renders Scripts/fidget/out/hero 2>&1 | tail -3
```
Expected: `RENDERS_OK Scripts/fidget/out/hero`, and four PNGs.

- [ ] **Step 5: Critique the renders yourself (Read each PNG)**

Tune `model.py` materials and `studio.py` lights, then rerun Step 4, until every item passes:
- The shell reads as painted PVC with a soft clearcoat highlight.
- The visor is glossy black with a crisp face.
- Rubber joints read as matte.
- Metal has a clean highlight.
- No part floats or pokes through another.
- The base rim colour matches the accent.
- The contact shadow is soft.

- [ ] **Step 6: Make the poster (loading backdrop and no-WebGL fallback)**

```bash
mkdir -p Content/StaticFiles/fidget
magick Scripts/fidget/out/hero/three_quarter.png -resize 1000x -quality 82 Content/StaticFiles/fidget/poster.webp
```
Compare the WebP against the PNG side by side (Read both) and confirm the gradients and the face glow survived. Memory `feedback_image_optimization` applies: lossy WebP, never palette reduction.

- [ ] **Step 7: Hand the look to Nico (CHECKPOINT M2: stop here)**

```bash
cd Scripts/fidget/out/hero && magick montage front.png three_quarter.png back.png closeup.png \
  -tile 4x1 -geometry 600x750+10+10 -background '#FFFFFF' hero.png && open hero.png
```
Ask Nico whether the look is right: materials, colours, proportions. Apply his notes and repeat Steps 4-7 until he approves.

- [ ] **Step 8: Suggested commit (only when Nico asks)**

`Build the final /fidget figure model and reference renders`

---

### Task 3: Rig, Clips, AO Bake and GLB Export (Checkpoint M3)

**Files:**
- Create: `Scripts/fidget/blender/rig.py`, `anims.py`, `export.py`
- Modify: `Scripts/fidget/blender/build_figure.py` (full pipeline)
- Create: `Content/StaticFiles/fidget/contract.mjs`
- Create: `Scripts/fidget/tests/glb.mjs`, `Scripts/fidget/tests/glb-contract.test.mjs`
- Create (artifact): `Content/StaticFiles/fidget/figure.glb`

**Interfaces:**
- Consumes: `model.build_robot` tuples `(object, region, bone)` (Task 1)
- Produces:
  - `contract.mjs` exports `ROOT_NODE`, `CLIP_NAMES`, `LOOPING_CLIPS`, `BONE_NAMES`, `REGIONS`, `MATERIALS`, `LIMITS`. Used by `figure.mjs` (Task 5) and the tests.
  - `figure.glb`, with:
    - node `Figure`
    - one node per bone
    - mesh nodes carrying `extras.region`
    - 13 clips at 30 fps
    - materials `face_screen` (emissive 0, no texture), `core_light`, `base_rim`
    - vertex colour `COLOR_0` = baked AO

- [ ] **Step 1: Write the contract `Content/StaticFiles/fidget/contract.mjs`**

```js
// Names shared by the Blender export (Scripts/fidget/blender) and this runtime.
// Scripts/fidget/tests/glb-contract.test.mjs fails if figure.glb drifts from them.
export const ROOT_NODE = 'Figure';

export const CLIP_NAMES = [
  'idle', 'look_around', 'wave', 'jump', 'giggle', 'hop', 'dizzy',
  'yawn', 'sleep_enter', 'sleep_loop', 'wake_startle', 'dance', 'power_up',
];

export const LOOPING_CLIPS = ['idle', 'dizzy', 'sleep_loop', 'dance'];

// three.js strips '.' from node names, so bones use underscores.
export const BONE_NAMES = [
  'root', 'hips', 'spine', 'chest', 'neck', 'head', 'antenna_1', 'antenna_2',
  'upper_arm_L', 'forearm_L', 'hand_L', 'thigh_L', 'shin_L', 'foot_L',
  'upper_arm_R', 'forearm_R', 'hand_R', 'thigh_R', 'shin_R', 'foot_R',
];

export const REGIONS = ['head', 'belly', 'base'];

export const MATERIALS = { face: 'face_screen', core: 'core_light', baseRim: 'base_rim' };

export const LIMITS = { bytes: 1_048_576, triangles: 60_000 };
```

- [ ] **Step 2: Write the GLB reader `Scripts/fidget/tests/glb.mjs`**

```js
import { readFileSync } from 'node:fs';

/** Reads the JSON chunk of a binary glTF. Enough to check names, counts and extensions. */
export function readGlb(url) {
  const buf = readFileSync(url);
  if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error('not a GLB file');
  const jsonLength = buf.readUInt32LE(12);
  const json = JSON.parse(buf.subarray(20, 20 + jsonLength).toString('utf8'));
  return { json, byteLength: buf.length };
}

export function triangleCount(json) {
  let total = 0;
  for (const mesh of json.meshes ?? []) {
    for (const prim of mesh.primitives) {
      if ((prim.mode ?? 4) !== 4) continue;
      const accessor = json.accessors[prim.indices ?? prim.attributes.POSITION];
      total += accessor.count / 3;
    }
  }
  return total;
}

export function animationDuration(json, animation) {
  return Math.max(...animation.samplers.map(s => json.accessors[s.input].max[0]));
}
```

- [ ] **Step 3: Write the failing contract test `Scripts/fidget/tests/glb-contract.test.mjs`**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { animationDuration, readGlb, triangleCount } from './glb.mjs';
import {
  BONE_NAMES, CLIP_NAMES, LIMITS, LOOPING_CLIPS, MATERIALS, REGIONS, ROOT_NODE,
} from '../../../Content/StaticFiles/fidget/contract.mjs';

const { json, byteLength } = readGlb(new URL('../../../Content/StaticFiles/fidget/figure.glb', import.meta.url));
const nodeNames = json.nodes.map(n => n.name);

test('ships every clip the runtime plays', () => {
  const names = json.animations.map(a => a.name);
  assert.deepEqual(CLIP_NAMES.filter(c => !names.includes(c)), []);
});

test('each bone exists exactly once, so no track can bind to a mesh with the same name', () => {
  for (const bone of BONE_NAMES) assert.equal(nodeNames.filter(n => n === bone).length, 1, bone);
  assert.ok(nodeNames.includes(ROOT_NODE));
});

test('carries the materials the runtime restyles', () => {
  const names = json.materials.map(m => m.name);
  for (const name of Object.values(MATERIALS)) assert.ok(names.includes(name), name);
});

test('tags every tap region on some node', () => {
  const regions = new Set(json.nodes.map(n => n.extras?.region).filter(Boolean));
  for (const region of REGIONS) assert.ok(regions.has(region), region);
});

test('fits the size and triangle budgets, meshopt-compressed, with no textures', () => {
  assert.ok(byteLength <= LIMITS.bytes, `${byteLength} bytes`);
  assert.ok(triangleCount(json) <= LIMITS.triangles, `${triangleCount(json)} triangles`);
  assert.ok((json.extensionsUsed ?? []).includes('EXT_meshopt_compression'));
  assert.equal((json.images ?? []).length, 0);
});

test('looping clips are long enough to loop without a visible hitch', () => {
  for (const name of LOOPING_CLIPS) {
    const animation = json.animations.find(a => a.name === name);
    assert.ok(animationDuration(json, animation) >= 1.9, name);
  }
});
```

- [ ] **Step 4: Run it to see it fail**

Run: `node --test "Scripts/fidget/tests/*.test.mjs"`
Expected: FAIL with `ENOENT` for `figure.glb`.

- [ ] **Step 5: Write `Scripts/fidget/blender/rig.py`**

```python
"""Armature for the robot. The parts are hard-surface, so each one rides a single bone
(bone parenting, no skin weights). Joint positions match model.py."""
import bpy
from mathutils import Vector

BONES = {  # name: (head, tail, parent)
    'root': ((0, 0, 0.075), (0, 0, 0.16), None),     # squash/stretch and jump carrier, at the feet
    'hips': ((0, 0, 0.245), (0, 0, 0.30), 'root'),
    'spine': ((0, 0, 0.30), (0, 0, 0.36), 'hips'),
    'chest': ((0, 0, 0.36), (0, 0, 0.545), 'spine'),
    'neck': ((0, 0, 0.545), (0, 0, 0.585), 'chest'),
    'head': ((0, 0, 0.585), (0, 0, 0.8), 'neck'),
    'antenna_1': ((0.1, 0.02, 0.935), (0.1, 0.02, 1.0), 'head'),
    'antenna_2': ((0.1, 0.02, 1.0), (0.1, 0.02, 1.05), 'antenna_1'),
}
for _side, _x in (('L', 1), ('R', -1)):
    BONES.update({
        f'upper_arm_{_side}': ((0.175 * _x, 0, 0.5), (0.195 * _x, 0, 0.405), 'chest'),
        f'forearm_{_side}': ((0.195 * _x, 0, 0.405), (0.21 * _x, 0, 0.33), f'upper_arm_{_side}'),
        f'hand_{_side}': ((0.21 * _x, 0, 0.33), (0.215 * _x, 0, 0.25), f'forearm_{_side}'),
        f'thigh_{_side}': ((0.085 * _x, 0, 0.245), (0.085 * _x, 0, 0.205), 'hips'),
        f'shin_{_side}': ((0.085 * _x, 0, 0.205), (0.085 * _x, 0, 0.135), f'thigh_{_side}'),
        f'foot_{_side}': ((0.085 * _x, 0, 0.135), (0.085 * _x, -0.07, 0.105), f'shin_{_side}'),
    })


def build_armature(name='Armature'):
    data = bpy.data.armatures.new(name)
    arm = bpy.data.objects.new(name, data)
    bpy.context.scene.collection.objects.link(arm)
    bpy.context.view_layer.objects.active = arm
    bpy.ops.object.mode_set(mode='EDIT')
    for bone, (head, tail, _) in BONES.items():
        eb = data.edit_bones.new(bone)
        eb.head, eb.tail, eb.roll = Vector(head), Vector(tail), 0.0
    for bone, (_, _, parent) in BONES.items():
        if parent:
            data.edit_bones[bone].parent = data.edit_bones[parent]
    bpy.ops.object.mode_set(mode='OBJECT')
    for pb in arm.pose.bones:
        pb.rotation_mode = 'QUATERNION'
    return arm


def attach(arm, parts, root):
    """Parent each part to its bone (or to the root for the base) without moving it,
    and tag its tap region. glTF exports the tag as node extras -> three.js userData."""
    bpy.context.view_layer.update()
    for obj, region, bone in parts:
        obj['region'] = region
        world = obj.matrix_world.copy()
        if bone:
            obj.parent = arm
            obj.parent_type = 'BONE'
            obj.parent_bone = bone
        else:
            obj.parent = root
        bpy.context.view_layer.update()
        obj.matrix_world = world
    arm.parent = root
```

- [ ] **Step 6: Write `Scripts/fidget/blender/anims.py`**

```python
"""Pose-to-pose clips at 30 fps.

Rotations are degrees in armature axes, around each bone's head. The figure faces -Y:
  x+  leans or nods forward (toward the viewer)
  y+  tilts the top toward the figure's left (the viewer's right)
  z+  turns toward the figure's left
Every clip keys every body bone, so a crossfade in three.js never inherits a stale
pose from the previous clip. The antenna is not keyed: the runtime springs it."""
import math

import bpy
from mathutils import Euler, Vector

import rig

FPS = 30
BODY_BONES = [b for b in rig.BONES if not b.startswith('antenna')]


def arm(side, out=0.0, fwd=0.0):
    """Upper-arm rotation from hanging: `out` raises it sideways, `fwd` swings it forward."""
    s = 1 if side == 'L' else -1
    return (-fwd, -out * s, 0.0)


def arms(out_l=4, out_r=4, fwd_l=0, fwd_r=0, elbow_l=0, elbow_r=0):
    return {
        'upper_arm_L': {'rot': arm('L', out_l, fwd_l)}, 'upper_arm_R': {'rot': arm('R', out_r, fwd_r)},
        'forearm_L': {'rot': (-elbow_l, 0, 0)}, 'forearm_R': {'rot': (-elbow_r, 0, 0)},
    }


def P(*parts, **bones):
    """A pose: bone=dict(rot=(x, y, z), loc=(x, y, z), sq=s). Unlisted bones rest.
    `sq` is volume-preserving squash/stretch along the bone (only used on `root`)."""
    out = {}
    for part in parts:
        out.update(part)
    out.update(bones)
    return out


REST = P(arms(4, 4))

IDLE = [
    (0, REST, 'BEZIER'),
    (30, P(arms(5, 4), hips={'rot': (0, 1.2, 0)}, head={'rot': (0, -1, 0)}), 'BEZIER'),
    (60, P(arms(7, 7), root={'sq': 1.018}, chest={'rot': (-2, 0, 0)}, head={'rot': (2, 1.5, 0)}), 'BEZIER'),
    (90, P(arms(4, 5), hips={'rot': (0, -1.2, 0)}, head={'rot': (0, 1, 0)}), 'BEZIER'),
    (120, REST, 'BEZIER'),
]

LOOK_AROUND = [
    (0, REST, 'BEZIER'),
    (16, P(arms(4, 6), chest={'rot': (0, 0, 9)}, head={'rot': (-5, 3, 26)}), 'BEZIER'),
    (58, P(arms(4, 6), chest={'rot': (0, 0, 9)}, head={'rot': (-4, 3, 28)}), 'BEZIER'),
    (76, P(arms(6, 4), chest={'rot': (0, 0, -8)}, head={'rot': (5, -3, -24)}), 'BEZIER'),
    (116, P(arms(6, 4), chest={'rot': (0, 0, -8)}, head={'rot': (6, -3, -25)}), 'BEZIER'),
    (138, REST, 'BEZIER'),
    (150, REST, 'BEZIER'),
]

_WAVE_UP = dict(root={'sq': 1.02}, chest={'rot': (0, 4, 3)}, head={'rot': (0, 8, 9)})
WAVE = [
    (0, REST, 'BEZIER'),
    (7, P(arms(18, 4), root={'sq': 0.96}), 'BEZIER'),
    (15, P(arms(150, 6), _WAVE_UP, forearm_L={'rot': (0, -24, 0)}), ('BACK', 'EASE_OUT')),
    (23, P(arms(150, 6), _WAVE_UP, forearm_L={'rot': (0, 26, 0)}), 'BEZIER'),
    (31, P(arms(150, 6), _WAVE_UP, forearm_L={'rot': (0, -24, 0)}), 'BEZIER'),
    (39, P(arms(150, 6), _WAVE_UP, forearm_L={'rot': (0, 26, 0)}), 'BEZIER'),
    (47, P(arms(150, 6), _WAVE_UP, forearm_L={'rot': (0, -10, 0)}), 'BEZIER'),
    (60, P(arms(10, 4)), 'BEZIER'),
    (72, REST, 'BEZIER'),
]

_TUCK = dict(thigh_L={'rot': (-30, 0, 0)}, thigh_R={'rot': (-30, 0, 0)},
             shin_L={'rot': (45, 0, 0)}, shin_R={'rot': (45, 0, 0)})
JUMP = [
    (0, REST, 'BEZIER'),
    (6, P(arms(16, 16, -25, -25), root={'sq': 0.82}, head={'rot': (7, 0, 0)}, chest={'rot': (8, 0, 0)}), 'LINEAR'),
    (10, P(arms(60, 60, 30, 30), root={'sq': 1.12, 'loc': (0, 0, 0.06)}), ('QUAD', 'EASE_OUT')),
    (17, P(arms(72, 72, 20, 20), _TUCK, root={'loc': (0, 0, 0.3)}, head={'rot': (-7, 0, 0)}), ('QUAD', 'EASE_IN')),
    (24, P(arms(50, 50), root={'sq': 1.08, 'loc': (0, 0, 0.07)}), 'LINEAR'),
    (27, P(arms(22, 22), root={'sq': 0.84}, head={'rot': (8, 0, 0)}), ('BACK', 'EASE_OUT')),
    (31, P(arms(6, 6), root={'sq': 1.04}), 'BEZIER'),
    (36, REST, 'BEZIER'),
]

_COVER = arms(12, 12, 38, 38, 70, 70)  # hands up to the screen, giggling
GIGGLE = [
    (0, REST, 'BEZIER'),
    (3, P(arms(8, 8), root={'sq': 0.86}, head={'rot': (10, 0, 0)}), ('BACK', 'EASE_OUT')),
    (7, P(_COVER, root={'sq': 1.05}, head={'rot': (-4, 8, 0)}), 'BEZIER'),
    (11, P(_COVER, head={'rot': (0, -8, 0)}, chest={'rot': (0, -2, 0)}), 'BEZIER'),
    (15, P(_COVER, head={'rot': (0, 7, 0)}, chest={'rot': (0, 3, 0)}), 'BEZIER'),
    (19, P(_COVER, head={'rot': (0, -5, 0)}), 'BEZIER'),
    (23, P(arms(8, 8), head={'rot': (0, 2, 0)}), 'BEZIER'),
    (30, REST, 'BEZIER'),
]

HOP = [
    (0, REST, 'BEZIER'),
    (3, P(arms(10, 10), root={'sq': 0.85}, chest={'rot': (-8, 0, 0)}), ('BACK', 'EASE_OUT')),
    (7, P(arms(45, 45), root={'sq': 1.1, 'loc': (0, 0, 0.12)}), ('QUAD', 'EASE_OUT')),
    (11, P(arms(50, 50), root={'loc': (0, 0, 0.14)}), ('QUAD', 'EASE_IN')),
    (15, P(arms(20, 20), root={'sq': 0.9}), ('BACK', 'EASE_OUT')),
    (19, P(arms(8, 8), root={'sq': 1.03}), 'BEZIER'),
    (24, REST, 'BEZIER'),
]


def _dizzy():
    poses = []
    for i in range(9):  # i == 8 wraps back to i == 0: a seamless loop
        a = i / 8 * 2 * math.pi
        poses.append((round(i * 60 / 8), P(
            arms(25 + 8 * math.sin(a), 25 - 8 * math.sin(a)),
            root={'sq': 0.98},
            chest={'rot': (7 * math.cos(a), 7 * math.sin(a), 0)},
            head={'rot': (10 * math.cos(a - 0.6), 10 * math.sin(a - 0.6), 0)},
        ), 'BEZIER'))
    return poses


_STRETCH = P(arms(160, 160, 10, 10), root={'sq': 1.08}, chest={'rot': (-8, 0, 0)}, head={'rot': (-18, 6, 0)})
YAWN = [
    (0, REST, 'BEZIER'),
    (18, _STRETCH, 'BEZIER'),
    (45, P(_STRETCH, head={'rot': (-16, -4, 0)}), 'BEZIER'),
    (60, P(arms(10, 10), root={'sq': 0.97}, head={'rot': (6, 0, 0)}), 'BEZIER'),
    (75, REST, 'BEZIER'),
]

_SLUMP = P(arms(3, 3, 10, 10), root={'sq': 0.94}, chest={'rot': (10, 0, 0)}, head={'rot': (22, 10, 0)})
SLEEP_ENTER = [
    (0, REST, 'BEZIER'),
    (20, P(_SLUMP, head={'rot': (14, 4, 0)}), 'BEZIER'),
    (32, P(_SLUMP, head={'rot': (25, 12, 0)}), 'BEZIER'),
    (45, _SLUMP, 'BEZIER'),
]
SLEEP_LOOP = [
    (0, _SLUMP, 'BEZIER'),
    (60, P(_SLUMP, root={'sq': 0.965}, chest={'rot': (8, 0, 0)}, head={'rot': (20, 10, 0)}), 'BEZIER'),
    (120, _SLUMP, 'BEZIER'),
]
WAKE_STARTLE = [
    (0, _SLUMP, 'BEZIER'),
    (4, P(arms(50, 50), root={'sq': 1.15, 'loc': (0, 0, 0.06)}, head={'rot': (-12, 0, 0)}), ('BACK', 'EASE_OUT')),
    (10, P(arms(20, 20), root={'sq': 0.95}), 'BEZIER'),
    (16, P(arms(8, 8), root={'sq': 1.02}), 'BEZIER'),
    (24, REST, 'BEZIER'),
]


def _dance():
    """Four bounces per 2 s loop: one per beat at 120 BPM, arms pumping in turn."""
    poses = []
    for beat in range(4):
        s = 1 if beat % 2 == 0 else -1
        up_l, up_r = (120, 30) if s > 0 else (30, 120)
        hit = P(arms(up_l, up_r, elbow_l=40 if s > 0 else 10, elbow_r=10 if s > 0 else 40),
                root={'sq': 0.93}, hips={'rot': (0, 6 * s, 0)},
                chest={'rot': (0, -3 * s, 8 * s)}, head={'rot': (0, 8 * s, 10 * s)})
        mid = P(arms((up_l + up_r) / 2, (up_l + up_r) / 2), root={'sq': 1.04, 'loc': (0, 0, 0.03)}, head={'rot': (-4, 0, 0)})
        poses.append((beat * 15, hit, ('QUAD', 'EASE_OUT')))
        poses.append((beat * 15 + 8, mid, ('QUAD', 'EASE_IN')))
    poses.append((60, poses[0][1], 'BEZIER'))
    return poses


_CROUCH = P(arms(20, 20, 20, 20, 60, 60), root={'sq': 0.8}, head={'rot': (10, 0, 0)})
_V = P(arms(150, 150), root={'sq': 1.15, 'loc': (0, 0, 0.18)}, head={'rot': (-12, 0, 0)}, chest={'rot': (-8, 0, 0)})
_VICTORY = P(arms(165, 45), forearm_R={'rot': (0, -80, 0)}, root={'sq': 1.03},
             head={'rot': (0, -8, 10)}, chest={'rot': (0, 0, 6)})
POWER_UP = [
    (0, REST, 'BEZIER'),
    (10, _CROUCH, 'BEZIER'),
    (14, P(_CROUCH, chest={'rot': (0, 2, 0)}), 'BEZIER'),
    (18, P(_CROUCH, chest={'rot': (0, -2, 0)}), 'BEZIER'),
    (22, P(_CROUCH, chest={'rot': (0, 2, 0)}), 'BEZIER'),
    (26, _CROUCH, 'LINEAR'),
    (31, _V, ('QUAD', 'EASE_OUT')),
    (40, P(_V, root={'sq': 1.0, 'loc': (0, 0, 0.22)}), ('QUAD', 'EASE_IN')),
    (48, P(arms(60, 60), root={'sq': 0.88}), ('BACK', 'EASE_OUT')),
    (56, _VICTORY, 'BEZIER'),
    (75, _VICTORY, 'BEZIER'),
]

CLIPS = {  # name: (poses, loops)
    'idle': (IDLE, True), 'look_around': (LOOK_AROUND, False), 'wave': (WAVE, False),
    'jump': (JUMP, False), 'giggle': (GIGGLE, False), 'hop': (HOP, False), 'dizzy': (_dizzy(), True),
    'yawn': (YAWN, False), 'sleep_enter': (SLEEP_ENTER, False), 'sleep_loop': (SLEEP_LOOP, True),
    'wake_startle': (WAKE_STARTLE, False), 'dance': (_dance(), True), 'power_up': (POWER_UP, False),
}


def _fcurves(action):
    from bpy_extras.anim_utils import action_get_channelbag_for_slot
    return action_get_channelbag_for_slot(action, action.slots[0]).fcurves


def _key(arm_obj, frame, pose, previous):
    for name in BODY_BONES:
        pb = arm_obj.pose.bones[name]
        spec = pose.get(name, {})
        rest = pb.bone.matrix_local.to_quaternion()
        turn = Euler([math.radians(a) for a in spec.get('rot', (0, 0, 0))], 'XYZ').to_quaternion()
        q = rest.inverted() @ turn @ rest
        if name in previous and previous[name].dot(q) < 0:
            q.negate()  # stay in the same hemisphere so interpolation takes the short way
        previous[name] = q.copy()
        pb.rotation_quaternion = q
        pb.location = rest.inverted() @ Vector(spec.get('loc', (0, 0, 0)))
        s = spec.get('sq', 1.0)
        pb.scale = (1 / math.sqrt(s), s, 1 / math.sqrt(s))
        for path in ('rotation_quaternion', 'location', 'scale'):
            pb.keyframe_insert(path, frame=frame)


def _interp(kp, how):
    kind, easing = (how, None) if isinstance(how, str) else how
    kp.interpolation = kind
    if easing:
        kp.easing = easing


def clip(arm_obj, name, poses, loops):
    action = bpy.data.actions.new(name)
    action.use_fake_user = True
    arm_obj.animation_data_create()
    arm_obj.animation_data.action = action
    previous, how = {}, {}
    for frame, pose, interp in poses:
        _key(arm_obj, frame, pose, previous)
        how[frame] = interp
    for fc in _fcurves(action):
        for kp in fc.keyframe_points:
            _interp(kp, how.get(int(round(kp.co.x)), 'BEZIER'))
        fc.update()
    action.use_frame_range = True
    action.frame_start, action.frame_end = poses[0][0], poses[-1][0]
    action.use_cyclic = loops
    return action


def build_clips(arm_obj):
    bpy.context.scene.render.fps = FPS  # the glTF exporter converts frames to seconds with this
    actions = {name: clip(arm_obj, name, poses, loops) for name, (poses, loops) in CLIPS.items()}
    arm_obj.animation_data.action = actions['idle']
    return actions
```

- [ ] **Step 7: Write `Scripts/fidget/blender/export.py`**

```python
"""AO bake, motion playblast, and the glTF export."""
import os

import bpy

import studio
from common import principled


def bake_ao(objs, samples=128, strength=0.55):
    """Bake ambient occlusion into a vertex colour (glTF COLOR_0). three.js multiplies
    it into the base colour, which gives crevices depth at zero runtime cost."""
    scene = bpy.context.scene
    if scene.world is None:
        scene.world = bpy.data.worlds.new('bake')
    scene.render.engine = 'CYCLES'
    scene.cycles.device = 'GPU'
    scene.cycles.samples = samples
    scene.world.light_settings.distance = 0.12
    for obj in bpy.context.view_layer.objects:
        obj.select_set(False)
    for obj in objs:
        attrs = obj.data.color_attributes
        attr = attrs.get('AO') or attrs.new('AO', 'FLOAT_COLOR', 'POINT')
        attrs.active_color = attr
        attrs.render_color_index = attrs.active_color_index
        obj.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.bake(type='AO', target='VERTEX_COLORS')
    for obj in objs:
        attr = obj.data.color_attributes['AO']
        data = [0.0] * (len(attr.data) * 4)
        attr.data.foreach_get('color', data)
        for i in range(0, len(data), 4):
            for c in range(3):
                data[i + c] = 1.0 - strength * (1.0 - data[i + c])
            data[i + 3] = 1.0
        attr.data.foreach_set('color', data)


def strip_screen_texture(mat):
    """The runtime draws the face on a canvas. Keep the image out of the GLB and leave
    emission at zero; figure.mjs sets the canvas as the emissive map."""
    bsdf = principled(mat)
    for link in list(bsdf.inputs['Emission Color'].links):
        mat.node_tree.links.remove(link)
    bsdf.inputs['Emission Color'].default_value = (0, 0, 0, 1)
    bsdf.inputs['Emission Strength'].default_value = 0.0


def playblast(arm, actions, out_dir):
    """Workbench renders of every clip, frame number and clip name stamped on."""
    scene = bpy.context.scene
    scene.render.engine = 'BLENDER_WORKBENCH'
    shading = scene.display.shading
    shading.light = 'STUDIO'
    shading.color_type = 'MATERIAL'
    shading.show_shadows = True
    shading.show_cavity = True
    scene.render.resolution_x, scene.render.resolution_y = 540, 675
    scene.render.image_settings.file_format = 'PNG'
    for attr in dir(scene.render):
        if attr.startswith('use_stamp_'):
            setattr(scene.render, attr, False)
    scene.render.use_stamp = True
    scene.render.use_stamp_note = True
    scene.render.use_stamp_frame = True
    scene.render.stamp_font_size = 20
    cam = studio.camera('three_quarter')
    for name, action in actions.items():
        arm.animation_data.action = action
        start, end = (int(f) for f in action.frame_range)
        scene.frame_start, scene.frame_end = start, end
        scene.render.stamp_note_text = name
        scene.render.filepath = os.path.join(out_dir, name, 'f_')
        bpy.ops.render.render(animation=True)
    bpy.data.objects.remove(cam, do_unlink=True)


def export_glb(path, root):
    for obj in bpy.context.view_layer.objects:
        obj.select_set(False)
    for obj in (root, *root.children_recursive):
        obj.select_set(True)
    bpy.ops.export_scene.gltf(
        filepath=str(path), export_format='GLB', use_selection=True,
        export_apply=True, export_extras=True, export_yup=True,
        export_texcoords=True, export_normals=True,
        export_vertex_color='ACTIVE', export_all_vertex_colors=False,
        export_materials='EXPORT', export_image_format='NONE',
        export_animations=True, export_animation_mode='ACTIONS',
        export_force_sampling=True, export_frame_step=1,
        export_optimize_animation_size=True, export_optimize_animation_keep_anim_armature=True,
        export_anim_slide_to_zero=True, export_reset_pose_bones=True,
        export_skins=True, export_def_bones=False, export_leaf_bone=False,
        export_morph=False, export_lights=False, export_cameras=False,
        export_meshopt_compression_enable=True, export_meshopt_extension='EXT_meshopt_compression',
    )
```

- [ ] **Step 8: Replace `Scripts/fidget/blender/build_figure.py` with the full pipeline**

```python
"""Builds the /fidget figure headless.

  Blender --background --factory-startup --python Scripts/fidget/blender/build_figure.py -- --concepts DIR
  Blender --background --factory-startup --python Scripts/fidget/blender/build_figure.py -- --final \
      [--palette A] [--renders DIR] [--playblast DIR] [--glb PATH]
"""
import argparse
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import bpy  # noqa: E402

import anims  # noqa: E402
import common  # noqa: E402
import concepts  # noqa: E402
import export  # noqa: E402
import model  # noqa: E402
import rig  # noqa: E402
import studio  # noqa: E402


def parse():
    argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
    p = argparse.ArgumentParser(prog='build_figure.py')
    p.add_argument('--concepts', metavar='DIR', help='render the M1 concept tiles into DIR')
    p.add_argument('--final', action='store_true', help='build, rig and animate the chosen figure')
    p.add_argument('--palette', default='A')
    p.add_argument('--renders', metavar='DIR', help='Cycles reference renders into DIR')
    p.add_argument('--playblast', metavar='DIR', help='Workbench frames of every clip into DIR/<clip>/')
    p.add_argument('--glb', metavar='PATH', help='write the compressed GLB here')
    p.add_argument('--samples', type=int)
    return p.parse_args(argv)


def run_concepts(out_dir, samples):
    os.makedirs(out_dir, exist_ok=True)
    scene = common.reset_scene()
    studio.build(scene, samples=samples or 128, res=(900, 1100))
    for concept, builder in concepts.BUILDERS.items():
        for palette in ('A', 'B'):
            objs = builder(f'{concept}{palette}', concepts.PALETTES[concept][palette])
            views = ['three_quarter', 'front'] if palette == 'A' else ['three_quarter']
            for view in views:
                studio.render(os.path.join(out_dir, f'{concept}-{palette}-{view}.png'), view)
            common.remove(objs)
    print(f'CONCEPTS_OK {out_dir}')


def run_final(args):
    scene = common.reset_scene()
    parts = model.build_robot(concepts.PALETTES['robot'][args.palette])
    objs = [obj for obj, _, _ in parts]
    for obj in objs:
        common.apply_modifiers(obj)
    print(f'TRIANGLES {common.triangles(objs)}')
    export.bake_ao(objs)
    root = bpy.data.objects.new('Figure', None)
    scene.collection.objects.link(root)
    arm = rig.build_armature()
    rig.attach(arm, parts, root)
    actions = anims.build_clips(arm)
    if args.renders:
        os.makedirs(args.renders, exist_ok=True)
        studio.build(scene, samples=args.samples or 384, res=(1200, 1500))
        arm.animation_data.action = actions['idle']
        scene.frame_set(0)
        for view in studio.VIEWS:
            studio.render(os.path.join(args.renders, f'{view}.png'), view)
        print(f'RENDERS_OK {args.renders}')
    if args.playblast:
        if not args.renders:
            studio.build(scene)
        export.playblast(arm, actions, args.playblast)
        print(f'PLAYBLAST_OK {args.playblast}')
    if args.glb:
        export.strip_screen_texture(bpy.data.materials['face_screen'])
        export.export_glb(args.glb, root)
        print(f'GLB_OK {args.glb}')


if __name__ == '__main__':
    args = parse()
    if args.concepts:
        run_concepts(args.concepts, args.samples)
    if args.final:
        run_final(args)
```

- [ ] **Step 9: Export the GLB**

Run:
```bash
/Applications/Blender.app/Contents/MacOS/Blender --background --factory-startup \
  --python Scripts/fidget/blender/build_figure.py -- --final --glb Content/StaticFiles/fidget/figure.glb 2>&1 | grep -E 'TRIANGLES|GLB_OK|Error|Traceback'
ls -l Content/StaticFiles/fidget/figure.glb
```
Expected: `GLB_OK …`, and a file of at most 1 MB.

Fallbacks if the export misbehaves:
- **The exporter reports that meshopt is unavailable:** export without it, then run `npx -y @gltf-transform/cli meshopt Content/StaticFiles/fidget/figure.glb Content/StaticFiles/fidget/figure.glb`.
- **Step 10 shows no bone nodes:** switch `rig.attach` to rigid skinning. For each part, add a vertex group named after its bone with every vertex at weight 1.0, plus an Armature modifier pointing at `arm`, instead of bone parenting.

- [ ] **Step 10: Run the contract test**

Run: `node --test "Scripts/fidget/tests/*.test.mjs"`
Expected: 6 passing tests. Fix the Blender side for any failure (the test prints the missing name), then re-export.

- [ ] **Step 11: Playblast every clip and hand the motion to Nico (CHECKPOINT M3: stop here)**

```bash
/Applications/Blender.app/Contents/MacOS/Blender --background --factory-startup \
  --python Scripts/fidget/blender/build_figure.py -- --final --playblast Scripts/fidget/out/playblast 2>&1 | tail -2
cd Scripts/fidget/out/playblast
for n in idle look_around wave jump giggle hop dizzy yawn sleep_enter sleep_loop wake_startle dance power_up; do
  ffmpeg -loglevel error -y -framerate 30 -i "$n/f_%04d.png" -c:v libx264 -pix_fmt yuv420p "$n.mp4"
  echo "file '$n.mp4'" ; done > list.txt
ffmpeg -loglevel error -y -f concat -safe 0 -i list.txt -c copy all_clips.mp4 && open all_clips.mp4
```
Before opening, watch a few frames yourself (Read a PNG from the start, middle and end of `jump`, `wave` and `power_up`). Check that:
- arms rotate the right way (a wave raises the figure's left arm outward, not through the body)
- the jump leaves the base behind
- loops start and end on the same pose

Fix the signs in `anims.arm()`/the poses if not. Then ask Nico for notes on each clip, and iterate on `anims.py` until he approves.

- [ ] **Step 12: Re-export and re-test after any motion edits**

Rerun Step 9 and Step 10.

- [ ] **Step 13: Suggested commit (only when Nico asks)**

`Rig and animate the /fidget figure and export figure.glb`

---
