# Feature Card: One Source of Truth

Date: 2026-05-16

## Problem

A "feature card" (the numbered tile in a grid: title, short description, image,
platform chip, link into the feature page) is rendered in two places from two
unrelated sources:

- **Landing page** (`/`, `/de/`) - `LandingPageRenderer.renderFeatureGrid`
  reads the `features:` array in `Content/Data/Landing.yaml` /
  `Landing.de.yaml`. Each entry: `title`, `description` (short), `imagePath`,
  `platforms`, `slug`.
- **Features index** (`/features/`, `/de/features/`, `/ja/features/`) -
  `FeaturesIndexRenderer` builds the *same* `.landing-feature-card` markup but
  pulls from each feature page's `hero:` block (`title`, long `subtitle`,
  `heroImagePath`, `platforms`).

The two sources drift. The landing shows short, hand-written copy; the index
shows the long hero subtitle. Titles, images, and platform chips are kept in
sync by hand and have already diverged (the NFC landing card said "NFC Reading
& Writing" while its page hero said "NFC Reader & Writer").

## Goal

One source of truth per feature card. Each feature owns its card inside its own
`Content/Data/Features/{slug}.yaml`. The landing grid and the features index
both render from that single block. Drop a feature YAML in and it appears,
consistently, on both grids.

## Design

### 1. Data model

`Sources/Site/Models/FeatureData.swift` - new struct and a new required field:

```swift
struct FeatureCard: Decodable, Sendable {
   let title: String
   let description: String   // short, punchy card copy
   let imagePath: String
   let platforms: String?
}
// FeatureData gains:
let card: FeatureCard
```

`card` is **required** (non-optional). A feature YAML without a `card:` block
fails to decode, so a missing card is a build error rather than a feature that
silently disappears from the grids.

`Sources/Site/Models/LandingData.swift`:

- Delete the `Feature` struct.
- Delete `LandingData.features`.
- Keep `LandingData.featuresTitle` - it is still the landing grid's section
  heading ("Everything you need to scan"), not card content.

### 2. YAML shape

Each `Content/Data/Features/{slug}.yaml` gains a `card:` block above `hero:`:

```yaml
slug: "barcode-scanner"
card:
  title: "Barcode Scanner"
  description: "Scan 13 barcode formats plus 6 two-dimensional codes..."
  imagePath: "/assets/images/Webflow/qr-barcode.webp"
  platforms: "iOS only"
hero:
  title: "Barcode Scanner"
  subtitle: "..."
  ...
```

`Landing.yaml` and `Landing.de.yaml` lose their entire `features:` array.
`featuresTitle` stays.

The `card:` block is independent of `hero:`. They may share text (most card
titles equal their hero title) or diverge (NFC's card uses image
`nfc-card.webp`; its hero uses `nfc-scan-tag.webp`). The block carries its own
copy of every field by design.

### 3. Shared rendering helper

New file `Sources/Site/Helpers/FeatureCards.swift` (alongside the existing
shared free functions `loadLandingData`, `renderStoreButtons`, etc.). Two
functions, both called by the landing renderer and the index renderer:

- `loadFeatures(context:) throws -> [(slug: String, data: FeatureData)]` -
  iterates `FeaturePageRenderer.slugs`, builds the localized YAML path, skips
  slugs with no localized YAML, decodes the rest. This is the load loop
  currently duplicated in `FeaturesIndexRenderer` and `FeaturePageRenderer`.
- `renderFeatureCards(_ features: [(slug: String, data: FeatureData)], basePath: String) -> String` -
  emits the numbered `.landing-feature-card is-linked` anchor markup from each
  `data.card`. The card markup is currently copy-pasted in both renderers; this
  becomes the single copy.

### 4. Renderer changes

**`LandingPageRenderer.swift`**

- `render`: call `loadFeatures(context:)`; render the grid section only when the
  result is non-empty.
- `renderFeatureGrid`: rewritten to wrap `renderFeatureCards(...)` in the
  existing `<section id="features" class="landing-feature-grid">` plus the
  `featuresTitle` heading.
- The slug-less `<article>` card branch is deleted - after the Shortcuts card
  is dropped, every landing card is a linked feature card.

**`FeaturesIndexRenderer.swift`**

- Replace the inline per-slug load loop and card-markup block with
  `loadFeatures` + `renderFeatureCards`.
- `hasAnyFeature` guard becomes `guard !features.isEmpty`.
- `itemListEntries` (JSON-LD `ItemList`) uses `card.title` instead of
  `hero.title`.
- Remove the dead `exploreLabel` local and its `_ = exploreLabel` discard.

No CSS changes - both grids already use the `.landing-feature-card*` classes.

### 5. Dropped: the "Shortcuts & Widgets" landing card

The landing's eighth card, "Shortcuts & Widgets", has no feature page (no
`slug`). It is removed. The landing grid becomes exactly the seven feature
cards, identical in set to the features index. Shortcuts/App Intents content
still lives as "Shortcuts & App Intents" subsections inside several feature
pages, so no information is lost.

### 6. Content - the seven card descriptions (English)

Card titles now all match their page hero titles.

| # | slug | card title | image | platforms |
|---|------|-----------|-------|-----------|
| 1 | nfc-reader-writer | NFC Reader & Writer | `/assets/images/Webflow/nfc-card.webp` | iOS · Android |
| 2 | qr-scanner | QR Code Scanner & Studio | `/assets/images/Webflow/qr-studio.webp` | iOS only |
| 3 | barcode-scanner | Barcode Scanner | `/assets/images/Webflow/qr-barcode.webp` | iOS only |
| 4 | document-scanner | Document Scanner with OCR | `/assets/images/Webflow/document-scan.webp` | iOS only |
| 5 | 3d-object-scanner | 3D Object Scanner | `/assets/images/Webflow/3d-object.webp` | iOS only |
| 6 | room-scanner | Room Scanner | `/assets/images/Webflow/scan-room.webp` | iOS only |
| 7 | webhooks | Webhooks & Automation | `/assets/images/Webflow/webhook.webp` | iOS · Android |

Descriptions:

1. **NFC Reader & Writer** - "Read any NFC tag and write 25+ message types -
   weblinks, Wi-Fi, business cards, shortcuts, and more. Lock tags and encrypt
   secrets with NFC Safe."
2. **QR Code Scanner & Studio** - "Scan QR codes from the camera or pick them
   out of any photo - then design your own with icons and Genmoji in the
   built-in QR Code Studio."
3. **Barcode Scanner** - "Scan 13 barcode formats plus 6 two-dimensional codes -
   EAN, UPC, QR, PDF417, Data Matrix, and more. Batch mode keeps the camera open
   for inventory and check-ins."
4. **Document Scanner with OCR** - "Scan documents on iPhone or iPad with
   automatic edge detection and OCR - all on your device, nothing uploaded.
   Export searchable, multi-page PDFs."
5. **3D Object Scanner** - "Walk around an object and Apple's Object Capture
   builds a textured 3D model. Export to USDZ for AR, STL for 3D printing, or
   OBJ for Blender. Requires an iPhone Pro or iPad Pro with LiDAR."
6. **Room Scanner** - "Walk through a room and RoomPlan builds a clean floor
   plan - walls, doors, windows, and furniture - complete with room
   measurements and area calculation."
7. **Webhooks & Automation** - "Five hooks fire the moment you scan - POST to
   your server, run a Shortcut, open a URL, speak the result, or play a sound.
   NFC.cool scans; you own what happens next."

### 7. Localization

- **German**: all 7 `Content/Data/Features/{slug}.de.yaml` get a `card:` block.
  Each `description` is a faithful translation of the approved English copy
  above (it is *not* the old `Landing.de.yaml` copy - the English wording
  changed in this work). Card titles match the German hero titles.
- **Japanese**: all 7 feature files exist in Japanese - the
  `Content/Data/Features/` directory holds 21 YAMLs (7 slugs x 3 locales). Each
  Japanese file gets a `card:` block with a translated description, so
  `/ja/features/` shows all 7 cards. (AGENTS.md still lists only 4 `.ja.yaml`
  files; that table is stale - the directory listing is authoritative.) There
  is no Japanese landing page, so the landing grid is unaffected for Japanese.

## Related cleanup (already applied in this branch)

`FeaturesIndexRenderer.swift` - the English intro paragraph said "Scan QR codes
and 25+ barcode formats". The number was wrong (the site uses "19 code formats"
= 13 linear barcodes + 6 two-dimensional codes everywhere else) and the German
and Japanese versions of that paragraph carry no number. The English string was
changed to "Scan QR codes and barcodes." to match. This is independent of the
card refactor and is already done.

## Build sequence

1. Models: add `FeatureCard` + `FeatureData.card`; remove `Feature` +
   `LandingData.features` from `LandingData.swift`.
2. New `Sources/Site/Helpers/FeatureCards.swift` with `loadFeatures` and
   `renderFeatureCards`.
3. Update `FeaturesIndexRenderer` to use the two helpers and `card.title`.
4. Update `LandingPageRenderer` to use the two helpers; delete the slug-less
   card branch.
5. Content: add `card:` blocks to all 21 feature YAMLs (7 EN + 7 DE + 7 JA);
   remove the `features:` array from `Landing.yaml` and `Landing.de.yaml`.
6. Verify (below).

Steps 1-4 will not build cleanly until step 5 supplies the `card:` blocks
(because `card` is required) - treat 1-5 as one coordinated change.

## Verification

- `swift run Site build` succeeds.
- `swift run Site validate` passes (translation parity holds - `card:` blocks
  are added to en + de symmetrically).
- Visual check: `/`, `/de/`, `/features/`, `/de/features/`, `/ja/features/`
  each show the same 7 cards with the short card copy. Every card links to its
  `/features/{slug}/` page. Card images and platform chips are correct.

## Out of scope

- The features index page hero (its own hardcoded title/subtitle/image).
- Any change to the feature detail page hero.
- Restyling the card grid.
- Updating the stale `.ja.yaml` table in AGENTS.md.
