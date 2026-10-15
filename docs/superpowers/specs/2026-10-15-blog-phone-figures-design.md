# Blog phone figures: a 3D iPhone showing the app, inside the posts

## Context

39 English posts (× 13 locales), and only 2 show the app in the body: Sonicare has one flat framed shot, and the Mac post has four Mac windows. Readers get the steps as text alone. Nico wants a live 3D iPhone in the posts that shows the real app screens and responds to the reader. It should go wherever it helps, post by post from newest to oldest.

Decisions already made:
- **Desktop:** two layouts, picked per post: a **full-width stage** (phone on one side, clickable step list on the other) and an **inline floated phone** (text wraps beside it).
- **Mobile:** both layouts collapse to one **inline phone with step dots** (swipe or tap through the screens, caption underneath).
- **Tech:** a **real three.js phone**, reusing the scene player's three bundle and the phone model, slimmed.
- **Screens:** **English stills first**. The markup takes per-locale variants later without changes.

What exists to build on (from exploration):
- `Scripts/scenes/live-scenes.mjs`:
  - already does still-first loading, idle import of `vendor/three.scenes.min.mjs` (139 KB br), near-viewport loading, and the reduced-motion / Save-Data / no-WebGL2 fallbacks
  - mounts `feature_phone.glb` with the screen on mesh `Object_13` (UV-mapped, aspect 0.462)
  - has no image texture and no pointer input. It runs a continuous loop over baked animations, so the phone figure gets its own small module rather than being bent into this one.
- `LiveSceneScriptProcessor.swift` injects the player when a page contains `data-scene`.
- Raw HTML in post markdown passes straight through SiteKit's MarkdownRenderer, as the Sonicare `<figure>` shows.
- `ImageResizer` processes any `<img>`. Its roles live in `Content/ImageManifest.yaml`, and post images currently fall to `default`.
- `feature_phone.glb` is 617 KB br, 455 KB of it three WebP textures on `Object_9`.
- Screens to reuse:
  - Tools: 339 raw captures (EN/DE) in `~/Developer/open-screenshot-generator/public/data/nfccool/`
  - Business Card: `~/Developer/DigitalBusinessCardApp/screenshots/raw/*.png`, 9 personas, EN
  - Missing screens can be captured with the deterministic `-ScreenshotMode` pipeline: branch `screenshot-mode` in `~/Developer/nfcreader`, `Scripts/capture-screenshots.sh`. That branch is 274 commits behind main.

## UI proposal

### Desktop: stage (`data-layout="stage"`), for posts that walk through a procedure (3-5 steps)
```
        paragraph text … (760px prose column)
 +--------------------------------------------------------------+
 |  paper stage (same box as .landing-feature-banner-scene,     |
 |  charcoal in dark mode, floor shadow under the phone)        |
 |                                                              |
 |      .---------.        WRITING THE REVIEW TAG               |
 |      | screen  |   ->   1  Paste your review link   <active> |
 |      |  of the |        2  Write it to the tag               |
 |      | active  |        3  Lock it                           |
 |      |  step   |                                             |
 |      '---------'        caption of the active step           |
 +--------------------------------------------------------------+
        paragraph text …
```
- Breaks out of the 760px column to about 1000px. Phone about 300px wide on the left, steps on the right. Under `dir=rtl` it mirrors on its own through grid/logical properties.
- Steps are real `<button>`s. Click or arrow keys pick one. While the stage is in view it auto-advances every 4.5 s, and stops for good at the first interaction.
- **On a step change**, the next screen pushes in from the side the way an iOS navigation push does: the old screen drifts a third of the way out and dims, the status bar stays put, and going back slides the other way. The phone holds still. (A swing of the whole phone was tried first and read as odd; a cross-fade and a tilt towards the step were compared live, and Nico picked the push.)
- **Drag** (fine pointer) turns the phone up to ±35° yaw / ±15° pitch, and it springs back on release. When the figure scrolls in, the phone settles from straight-on into a slight 3/4 rest pose.

### Desktop: float (`data-layout="float"`, optional `data-side="start"`), for 1-2 screens next to the paragraph they belong to
```
   ## Reset the brush head counter
   Hold the brush head against the      .-------.
   top of your iPhone. NFC.cool reads   |screen |
   the chip and shows how many …        |       |
   … text keeps wrapping …              '-------'
                                          o  *
                                       caption
```
- The phone is about 240px wide, floated to the inline-end (or start), with dots and a caption under it only when it has more than one screen. Drag and step behaviour are the same as on the stage.

### Mobile (< 768px): both layouts become this
```
 | ## Write the URL         |
 | Open NFC.cool, tap …     |
 |        .-------.         |
 |        |screen |  ~60vw  |
 |        |  2/3  |         |
 |        '-------'         |
 |        o  *  o           |
 |  2  Write it to the tag  |
 |  caption text …          |
```
- Swipe horizontally on the phone to step, using `touch-action: pan-y`, so vertical scrolling is never captured. Tap the phone to go to the next step. Swiping replaces drag-to-rotate on touch devices, and the push gives the step change its motion. No auto-advance on mobile.

### Every tier works without the next one
1. **No JS:** an ordered list. Each step's screenshot sits in a CSS phone frame with its caption, so it reads as a plain illustrated list.
2. **JS, no WebGL** (also reduced motion, Save-Data):
   - The **phone shell still**, a transparent WebP of the 3D phone straight-on with its screen punched out, rendered once by the player itself.
   - The active screenshot is a normal `<img>` behind the hole, so the text stays pin-sharp.
   - Dots, swipe, keys and cross-fade all work. Reduced motion means instant swaps and no auto-advance.
3. **WebGL2:** after idle and near the viewport, the 3D phone renders straight-on, matching the still exactly. It fades in over the still and then takes over the motion.
   - The canvas is `role=img`, and its `aria-label` follows the active step's alt text.
   - It renders only while something moves: settle, push, hover, drag or spring-back.

**Mockups:** the first build step produces the real thing on a pilot post, and I show it to you as screenshots: desktop stage, desktop float, mobile, each in light and dark, plus `ar`. This is a hard review gate before any rollout.

## Implementation

### 0. Spec
Write this design to `docs/superpowers/specs/2026-10-15-blog-phone-figures-design.md`, matching the fidget spec's convention. Work on a branch `feat/blog-phone-figures`, and leave the unrelated uncommitted work alone: the `Main.swift` lab line, `lab/`, `lab3d/`.

### 1. Authoring markup (raw HTML in the post's markdown, copied into all 13 locale files with captions and alt text translated)
```html
<figure class="phone-figure" data-layout="stage">
  <figcaption>Writing the review tag</figcaption>
  <ol>
    <li><img src="/assets/images/Blog/screens/google-review-nfc-stand/1-write-url.webp" alt="…">
        <p><strong>Paste your review link.</strong> …</p></li>
    <li>…</li>
  </ol>
</figure>
```
- Screens go in `Content/Assets/images/Blog/screens/<post-slug>/<n>-<name>-440w.webp`: 440 px wide, lossy WebP at quality 92, with the 9:41 status bar kept.
  - The `-440w` suffix makes SiteKit's ImageResizer skip them. Its variants fit a `W×W` square, so a portrait screenshot's "200w" variant comes out 92 px wide.
  - The display is at most ~195 CSS px, so 440 covers 2x and still makes a sharp 3D texture.
- Localized screens later: each locale's post file is its own copy, so it can point at a `.<lang>` file directly. No extra processor is needed.

### 2. Phone assets (`Scripts/scenes/`)
- `blog-phone.mjs` (gltf-transform, run by `build.sh`) → **`Content/StaticFiles/scenes/blog_phone.glb`**, about 149 KB br (the original is 617 KB). It makes two changes:
  - It drops the three 512 px textures on `Object_9`, the earpiece grille.
  - It makes the front black glass and the Dynamic Island unlit black. Lit, they reflect the studio as a grey pill.
  - The home page keeps `feature_phone.glb` untouched.
  - Check fidelity side by side at figure size before accepting (per the image-fidelity rule).
- `render-phone-shell.mjs`, modelled on `render-poster.mjs`. It renders `blog_phone.glb` straight-on with the screen material writing alpha 0 (NoBlending, opacity 0) → **`Content/StaticFiles/scenes/blog_phone_shell.webp`** (600x960, ~6 KB). It also prints the screen hole's rectangle and corner radius as percentages, which go into the CSS.
- `build.sh --js` also minifies the new module.

### 3. The player: `Scripts/scenes/phone-figures.mjs` → minified into `Content/StaticFiles/scenes/`
- **Pure logic, unit-tested:**
  - a step controller: index, auto-advance timer, stop on interaction
  - a pose spring: yaw/pitch targets, damping, clamp
  - swipe vs. scroll disambiguation

  These live in `Scripts/scenes/phone-figures/*.mjs`, with `node --test` tests in `Scripts/scenes/tests/`, the same pattern as `Scripts/fidget/tests/`.
- **The DOM tier:** builds the shell, screen, dots and buttons from the `<ol>`, and wires keys, swipe and tap.
- **The WebGL tier:**
  - Reuses the gating logic copied from `live-scenes.mjs` (`hasWebGL2`, `afterLoad`, the IntersectionObserver near-viewport rule). One shared renderer on an OffscreenCanvas, with the `transferToImageBitmap` hand-off.
  - The screen material is a small ShaderMaterial mixing two textures for the cross-fade, using `currentSrc` of the step images (no extra download). `TextureLoader` or `ImageBitmapLoader` gets added to `Scripts/scenes/three-entry.mjs`.
  - Renders on demand.
- Exposes `?debug` → `window.phoneFigures`, for the shell renderer and for checks.

### 4. Swift
- `Sources/Site/Processors/LiveSceneScriptProcessor.swift`: also inject `<script type="module" src="/scenes/phone-figures.mjs">` when the HTML contains `class="phone-figure"`.
- New `Sources/Site/Processors/PhoneFigureProcessor.swift`, registered in `Main.swift` after ImageResizer. It expands the authoring markup into the final figure (device box, shots, phone still, step buttons, dots) and injects `/scenes/phone-figures.mjs`.
- `LiveSceneScriptProcessor` is untouched.

### 5. CSS: new `Theme/css/phone-figure.css`, registered in `Theme/theme.yaml`
- Stage box, float, mobile collapse, the no-JS list, dots and steps.
- Logical properties for RTL. Theme tokens only: stage paper and charcoal come from the existing banner-scene tokens.

### 6. Pilot, then the review gate
- Pilot posts:
  - **Stage:** `read-passport-nfc-chip`, 4 screens.
  - **Float:** `reset-sonicare-brush-head-nfc`, 3 screens. It replaces the old flat figure.
- Why not the newest posts: the newest published ones (e-ink case, ICODE, alarm, CSV batch) have no captures yet, and the untracked google-review draft is EN-only and in progress.
- Review page: https://claude.ai/artifact/NY2Mfp4TeLNopNHbwAj6XZ
- Show Nico the screenshot set. Iterate. Only then roll out.

### 7. Rollout loop, newest → oldest: one post per iteration, one commit per post
For each post:
1. Read it and pick the screens: reuse existing raw captures first.
2. When a screen is missing:
   - Capture it with `screenshot-mode`, rebased onto nfcreader's main in a worktree in that repo. The rebase happens the first time it's needed.
   - Ask Nico before touching the app repo.
3. Insert the figure into the EN post and all 12 siblings, with captions and alt text translated per the locale style guides.
4. Run `swift run Site i18n-check`, the `it`/`tr`/`ru`/`uk` lints, and `swift run Site build`.
5. Spot-check the post in Chrome at 1280px and 390px, in light and dark mode.

Draft triage, confirmed with Nico in batches of about 5 as the loop reaches them:

| Treatment | Posts |
|---|---|
| **Stage** | google-review-nfc-stand, nfc-e-ink-phone-case-iphone, nfc-alarm-clock, batch-write-nfc-tags-csv, ntag-424-dna, read-passport-nfc-chip, amiibo, count-nfc-tag-scans, nfc-safe, openprinttag, write-nfc-tags-iphone, share-digital-business-card-without-app, replace-paper-business-cards-conference, business-card-service, 3d-scan-feature, document-scanning-guide, tap-scan-thrive, flair-qr-codes |
| **Float** | nxp-icode, ios-shortcuts-nfc-tap-counter, digital-business-cards-by-profession, reset-sonicare (convert), vcard-nfc-iphone-not-working, why-privacy-matters, nfc-tags-beginners-guide, nfc-business-card-vs-qr, best-digital-business-card-apps-2026, app-clip-lessons, smart-context, namedrop-vs-nfc, nfc-on-iphones-insider-look, nfc-tag-types-for-iphones |
| **Skip** (no iPhone UI to show) | nfc-reading-ipad-mac, nfc-cool-comes-to-mac (already has Mac shots), bitsundso-podcast-pick, eu-digital-product-passport-2026 (unless the DPP screens fit), iphone-rfid-condo-doors, nfc-cool-on-play-store |

Later and separate: a localization pass that captures `.<lang>.webp` screens with `screenshot-mode`. It first needs the DemoDataSeeder strings added to the app's catalog.

## Verification
- `node --test "Scripts/scenes/tests/*.test.mjs"`: step controller, pose spring, swipe disambiguation.
- `swift run Site build`, `swift run Site i18n-check` (0 errors), and the four locale lints.
- Chrome, on `swift run Site serve`:
  - the pilot post at 1280 and 390px, light and dark, plus `/ar/` for RTL
  - `?debug` to confirm the WebGL tier mounts and renders on demand (no rAF while idle)
  - emulate `prefers-reduced-motion` and the no-WebGL path (shell still and DOM steps work)
  - keyboard-only stepping
  - no horizontal page scroll at 390px
  - the network panel shows three + `blog_phone.glb` loading only after idle and only near the figure
- Check page weight: the first view adds only the screenshots and shell still, and the deferred 3D cost stays at or under about 350 KB br.
