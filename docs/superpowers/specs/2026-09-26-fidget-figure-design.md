# /fidget: Interactive 3D Collectible Figure

Date: 2026-09-26

## Context

Nico wants a playful, high-quality 3D "amiibo-like" figure that fills the viewport and can be spun,
poked and played with, with animations and sound. Decisions made in the brainstorm:

- **What:** an unlinked `/fidget/` **test page**, **no branding** (no logos, no site chrome, no Smart
  App Banner), just the figure. An imaginary, non-branded character on a round collectible base.
- **Model:** built **headless in Blender 5.2.2 by me via Python** (`/Applications/Blender.app`; the
  Blender MCP server is down, so it is not needed). Rigged, animated, exported as a compressed GLB.
- **v1 scope (all four bundles):** Spin & dizzy (core), Touch reactions + gaze, Idle life, Action dock
  + power-up.
- **Assumptions (unchallenged so far):** `noindex`, EN-only, phone + desktop at 60 fps, sound
  silent until the first tap, `prefers-reduced-motion` respected, deploys with the site.
- **Show, don't tell:** every look decision is made from rendered images (memory
  `feedback_show_dont_tell`), at the checkpoints marked below.

## Approach (recommended, with the alternatives it beat)

| Choice | Picked | Rejected |
| --- | --- | --- |
| Page | Self-contained `Content/StaticFiles/fidget/index.html`, copied verbatim by the existing `StaticRootFilesRenderer` | `MarketingPageRenderer` slug branch (forces header/footer/newsletter, i18n siblings) |
| Engine | three.js **r186.1** `WebGLRenderer` + `EffectComposer` | `<model-viewer>` (canned interactions); WebGPU/TSL (newer, revisit later) |
| JS delivery | Our code as plain `.mjs` modules + one **tree-shaken vendored three bundle** built once by a pinned script | CDN importmap (site has zero CDN use); bundling our own code (build step on every edit) |
| Animation | Baked Blender clips **plus** a runtime procedural layer (gaze, spring antenna, spin lean) | All-procedural (less expressive) / all-baked (not reactive) |
| Face | Face is a **live canvas texture** on a dedicated UV island: parametric eyes that tween, follow the pointer, blink, turn to spirals/stars | Facial rig + shape keys (heavy, less expressive) |
| Sound | **Synthesized Web Audio** (0 bytes, reacts to spin speed) | CC0 sample packs (bytes, static) |

Build-pipeline facts this relies on (verified):
- `Sources/Site/Renderers/StaticRootFilesRenderer.swift` copies `Content/StaticFiles/**` recursively as binary. No change needed.
- Every head-injecting processor (`SmartAppBannerProcessor`, `RobotsIndexableProcessor`, `ThemeColorProcessor`, `FontPreloadProcessor`, `GoogleSiteVerificationProcessor`, `TwitterSiteProcessor`) inserts after the literal `<head>`. The page uses **`<head data-standalone>`** (with an HTML comment saying why) so none of them fire. It declares its own `robots noindex, nofollow` and `theme-color`.
- `AssetMinifier` (SiteKit) only rewrites `.css`/`.js`, so `.mjs` passes untouched. The dev server is `python3 -m http.server`, which maps `.mjs` to `text/javascript`.
- `i18n-check` roots don't include `StaticFiles`, so no `enOnly` entry is needed. `StaticFiles` output isn't in the sitemap or `llms.txt`.

## Files

```
Scripts/fidget/
  blender/build_figure.py     entry: --concepts | --final; builds, rigs, animates, exports, renders
  blender/model.py            parts from bevelled/subsurf primitives, face UV island, materials
  blender/rig.py              armature, rigid part-to-bone weights, spring-bone chain for antenna
  blender/anims.py            pose-keyframed clips (see list), eased curves, 30 fps
  blender/studio.py           Cycles studio (softboxes, sweep) for concept + reference renders
  vendor-three.sh             npm three@0.186.1 + esbuild@0.28.2 in a temp dir -> bundle
  three-entry.mjs             explicit named re-exports (tree-shaking) of three + addons we use
Content/StaticFiles/fidget/
  index.html                  bare doc: <head data-standalone>, noindex, viewport-fit=cover,
                              inline CSS, importmap, <canvas>, dock, sound toggle, loader, fallback
  fidget.mjs                  boot, render loop, quality tiers, visibility pause
  scene.mjs                   lightformer studio env (PMREM), key light + soft shadow, sweep
                              backdrop, contact shadow, post chain
  figure.mjs                  GLB load, AnimationMixer, clip crossfades, procedural bone layer
  face.mjs                    canvas face renderer (parametric eyes, expressions, gaze, scanlines)
  controls.mjs                pointer/touch/wheel/keyboard -> spin, tilt, zoom, tap-region intents
  turntable.mjs               spin physics (momentum, friction, 30° detents), dizziness meter
  behavior.mjs                state machine + idle timers + priorities
  fx.mjs                      dizzy stars, Zzz sprites, instanced confetti, scan rings, phone prop
  audio.mjs                   Web Audio synth voice + SFX + dance loop + mute
  figure.glb                  meshopt-compressed export (target <= 1 MB)
  poster.webp                 Cycles hero render: loading backdrop + no-WebGL fallback
  vendor/three.bundle.min.mjs
AGENTS.md                     sitemap row for /fidget/ + Scripts/fidget/ in source layout
```

## The figure (Blender)

- **Checkpoint M1, concept (images):** I block out three concepts in the same studio: a **robot
  with a screen visor** (my pick), a **tiny astronaut** with a glass helmet, and a **mushroom
  sprite**. Each gets 2-3 palettes, rendered in Cycles at front + 3/4, and combined into one
  `magick montage` image that I `open` for Nico. He picks the concept and palette.
- **Build:** about 10 cm chibi proportions on a round base (about 50 mm, coloured rim, glossy top).
  Bevels, panel lines and screw details sell the "real PVC toy" look. glTF PBR materials:
  - painted shell with clearcoat
  - rubber joints
  - metal accents
  - glossy visor glass over an emissive face screen
  - base plastic

  Ambient occlusion is baked into vertex colours. About 25-40k triangles. No marks or logos
  anywhere.
- **Rig:** hips/spine/chest/neck/head, arms, legs, 2-bone antenna (runtime spring). Rigid weights,
  since the parts are hard-surface.
- **Clips:** `idle`, `look_around`, `wave`, `jump` (anticipation/squash/stretch/land), `giggle`,
  `hop`, `dizzy` (loop), `yawn`, `sleep_enter`, `sleep_loop`, `wake_startle`, `dance` (loop, 120 BPM),
  `power_up`. The scan's phone prop is built and tweened in three.js (`fx.mjs`), not in Blender, so it
  stays in world space while the figure spins.
- **Checkpoint M2, look (images):** Cycles hero renders (front, 3/4, back, close-up). These double
  as the reference the web version must match.
- **Checkpoint M3, motion (video):** Eevee playblast per clip, `ffmpeg` into one MP4, `open`.
- **Export:** glTF binary with actions as separate clips, compressed by the Blender 5.2 exporter's
  built-in `EXT_meshopt_compression` (no `gltf-transform` needed; verified by introspection).
  Mesh objects never share a name with a bone (`head_shell`, not `head`), because three.js renames
  duplicate node names and an animation track could bind to the mesh instead of the bone.

## Web runtime

- **Look ("macro photo of a real toy"):**
  - Colour: Neutral tone mapping, sRGB output.
  - Lighting: a procedural softbox "lightformer" environment rendered once into PMREM, for crisp
    highlights on glossy plastic at 0 bytes. One shadow-casting key light: `PCFShadowMap` with `shadow.radius` (r186 removed `PCFSoftShadowMap`).
  - Floor: curved sweep backdrop plus a soft contact shadow under the base.
  - Background: gradient that follows `prefers-color-scheme`, with subtle grain against banding.
  - Post chain: MSAA render target, then subtle GTAO, then light bokeh depth of field (the
    miniature feel), then bloom (high threshold, so only the face and FX glow), then vignette.
  - **Quality tiers:** high = all of the above; medium = no GTAO or depth of field; low = no post,
    DPR 1. Picked at start from device class, and dropped a tier automatically if frame time stays
    above 18 ms. Performance overlay with `?debug`.
- **Controls:**
  - **Spin:** horizontal drag spins the turntable 1:1 while held. Release velocity (last ~80 ms)
    becomes angular velocity, with exponential plus constant friction, a detent tick every 30°,
    and `navigator.vibrate(5)` where supported.
  - **Camera:** vertical drag tilts the camera (spring-damped, clamped), pinch or wheel zooms
    (clamped), double-tap resets.
  - **Tap:** under 200 ms with under 6 px of movement counts as a tap and raycasts to head, belly,
    base or background.
  - **Keyboard:** arrows, `+`/`-`, `W` `J` `D` `S` `M` `0`, listed in a small `?` help popover.
- **Behavior state machine:**
  - **Normal flow:** `intro` (pop-in bounce, wave, babble "hi"), then `idle`/`look_around`, then
    `yawn` at 20 s idle, then `asleep` at 45 s (Zzz + snore). Any input plays `wake_startle`.
  - **Priorities:** scan > dizzy > reaction > action > idle, with 0.15-0.3 s crossfades.
  - **Dizzy:** triggers when the dizziness meter (integral of |ω| above about 2.5 rev/s) crosses its
    threshold and the spin slows: spiral eyes, wobble, orbiting stars for about 3.5 s, then a
    cooldown.
- **Procedural layer (after the animation mixer each frame):**
  - Head and eye gaze follow the pointer or last touch, clamped (±35° yaw / ±20° pitch), on a
    critically damped spring.
  - Device-tilt gaze on Android. No iOS motion-permission prompt (touch gaze instead).
  - The figure leans outward in proportion to ω, and the antenna springs lag behind.
  - Random blinks, with occasional double blinks.
- **Dock:** a glassy pill at the bottom (safe-area aware) with Wave / Jump / Dance (toggle, loops
  with music) / Scan, plus a sound toggle at top right. Real `<button>`s with inline SVG icons,
  `aria-label` and `title`.
- **Scan:** a generic phone prop (rounded box, glowing NFC-wave icon) swoops in, chirps, and sends
  NFC rings from the base, then `power_up` plays with star eyes, a bloom glow, confetti (200-piece
  instanced mesh with physics) and a fanfare.
- **Audio** (all synthesized): a compressor at the end of the chain and a small generated reverb.
  - **Babble voice:** Animal-Crossing-style formant syllables for hi, giggle and wheee.
  - **SFX:**
    - boop
    - ratchet tick, pitch and rate following ω
    - spin whoosh (filtered noise, following ω)
    - jump sweep and land thump
    - dizzy woo-woo plus twinkles
    - yawn and snore
    - NFC chirp
    - power-up riser plus arpeggio fanfare
  - **Dance loop:** 2-bar 120 BPM chiptune, driven by a lookahead scheduler.
  - Unlocked on the first gesture. Mute state kept in `localStorage` (try/catch). Suspended when
    the tab is hidden.
- **Robustness:**
  - Canvas uses `touch-action: none` and `overscroll-behavior: none`, sized to `100dvh`.
  - Reduced motion: no intro bounce, depth of field or camera drift, and fewer confetti.
  - No WebGL2: show `poster.webp` plus a message. Canvas gets `role="img"` and an `aria-label`.
  - A loader ring shows while the GLB loads, and the render loop pauses when the tab is hidden.
- **Budgets:** GLB ≤ 1 MB, JS ≤ about 200 KB gzip, under 50 draw calls, 60 fps at the medium tier
  on an iPhone 13-class phone.

## Verification

1. **Blender:** `Blender --background --factory-startup --python Scripts/fidget/blender/build_figure.py -- --final`
   runs clean and idempotent. `gltf-transform inspect` lists every clip, the triangle count and the
   size (≤ 1 MB).
2. **Build:** `swift run Site build`, then:
   - `swift run Site i18n-check` still reports 0 errors.
   - `diff Content/StaticFiles/fidget/index.html _Site/fidget/index.html` shows only
     `lang="en"` changing to `"en-US"` (proves no banner, font preload or robots injection).
   - The `.mjs` files are byte-identical in `_Site/`.
3. **Browser** (`swift run Site serve` plus claude-in-chrome):
   - No console errors.
   - Screenshots at 1440×900 and 390×844, placed next to the Cycles reference render at a matched
     camera.
   - Drive every interaction (drag-spin to dizzy, tap each region, all keys and dock buttons, idle
     long enough to sleep) and record a `fidget_tour.gif`.
   - `?debug` confirms the tier and FPS.
4. **Real iPhone:** Nico opens `http://<mac-lan-ip>:8080/fidget/` to check audio unlock, gestures
   and smoothness. After deploy, `curl -I https://nfc.cool/fidget/fidget.mjs` shows a JavaScript
   content-type.

## Next steps after approval

Save this design as `docs/superpowers/specs/2026-09-26-fidget-figure-design.md` (the repo already
uses `docs/superpowers/`), then write the task-by-task plan to
`docs/superpowers/plans/2026-09-26-fidget-figure.md`. Work happens on branch `feat/fidget`.
Commits only when Nico asks. The first execution step is checkpoint M1 (concept montage).
