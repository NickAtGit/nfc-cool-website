# Feature Card Single Source of Truth - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make each feature own its grid-card content in one `card:` block, so the landing page and the features index render identical cards from a single source instead of two drifting ones.

**Architecture:** Add a `card:` block to every `Content/Data/Features/{slug}.yaml`. Add a `FeatureCard` model and a required `FeatureData.card` field. Add two shared free functions (`loadFeatures`, `renderFeatureCards`) and call them from both `LandingPageRenderer` and `FeaturesIndexRenderer`. Delete the old `LandingData.features` array and the `Feature` model.

**Tech Stack:** Swift 6.2, SiteKit static-site generator, Yams (YAML decoding). Build via `swift run Site build`.

---

## Verification model

This project has **no unit-test target**. Every task is verified by:

1. `swift run Site build` - compiles the generator and regenerates `_Site/`. A missing/malformed `card:` block surfaces here as a decode error.
2. `grep` checks against the generated HTML in `_Site/`.
3. (Task 7 only) `swift run Site validate` for translation parity, plus a human eyeball via `swift run Site serve`.

Builds compile SiteKit on first run and may take 1-2 minutes. A successful build exits 0 and prints a build summary; it does not error.

The task order keeps the build green at every commit: content first (the new `card:` key is ignored until the model knows it), then the model, then the helpers, then each renderer, then deletion of the now-unused old code.

## File structure

| File | Change | Responsibility |
|------|--------|----------------|
| `Content/Data/Features/*.yaml` (21 files) | Modify | Each gains a `card:` block - the single source of card content |
| `Sources/Site/Models/FeatureData.swift` | Modify | New `FeatureCard` struct; `FeatureData` gains required `card` |
| `Sources/Site/Models/LandingData.swift` | Modify | Delete `Feature` struct and `LandingData.features` |
| `Sources/Site/Helpers/FeatureCards.swift` | Create | `loadFeatures` + `renderFeatureCards` - shared by both grids |
| `Sources/Site/Renderers/FeaturesIndexRenderer.swift` | Modify | Render the `/features/` grid via the shared helpers |
| `Sources/Site/Renderers/LandingPageRenderer.swift` | Modify | Render the landing grid via the shared helpers |
| `Content/Data/Landing.yaml`, `Landing.de.yaml` | Modify | Delete the `features:` array (keep `featuresTitle:`) |

---

## Task 1: Add `card:` blocks to all 21 feature YAMLs

**Files:**
- Modify: all 21 files in `Content/Data/Features/` (`{slug}.yaml`, `{slug}.de.yaml`, `{slug}.ja.yaml` for the 7 slugs)

In each file, insert the `card:` block immediately **before** the existing `hero:` line (keep one blank line between the block and `hero:`). The `card:` block is decoded later in Task 2; until then it is harmless extra YAML.

- [ ] **Step 1: Add `card:` to the 7 English files**

`Content/Data/Features/nfc-reader-writer.yaml`:
```yaml
card:
  title: "NFC Reader & Writer"
  description: "Read any NFC tag and write 25+ message types - weblinks, Wi-Fi, business cards, shortcuts, and more. Lock tags and encrypt secrets with NFC Safe."
  imagePath: "/assets/images/Webflow/nfc-card.webp"
  platforms: "iOS · Android"
```

`Content/Data/Features/qr-scanner.yaml`:
```yaml
card:
  title: "QR Code Scanner & Studio"
  description: "Scan QR codes from the camera or pick them out of any photo - then design your own with icons and Genmoji in the built-in QR Code Studio."
  imagePath: "/assets/images/Webflow/qr-studio.webp"
  platforms: "iOS only"
```

`Content/Data/Features/barcode-scanner.yaml`:
```yaml
card:
  title: "Barcode Scanner"
  description: "Scan 13 barcode formats plus 6 two-dimensional codes - EAN, UPC, QR, PDF417, Data Matrix, and more. Batch mode keeps the camera open for inventory and check-ins."
  imagePath: "/assets/images/Webflow/qr-barcode.webp"
  platforms: "iOS only"
```

`Content/Data/Features/document-scanner.yaml`:
```yaml
card:
  title: "Document Scanner with OCR"
  description: "Scan documents on iPhone or iPad with automatic edge detection and OCR - all on your device, nothing uploaded. Export searchable, multi-page PDFs."
  imagePath: "/assets/images/Webflow/document-scan.webp"
  platforms: "iOS only"
```

`Content/Data/Features/3d-object-scanner.yaml`:
```yaml
card:
  title: "3D Object Scanner"
  description: "Walk around an object and Apple's Object Capture builds a textured 3D model. Export to USDZ for AR, STL for 3D printing, or OBJ for Blender. Requires an iPhone Pro or iPad Pro with LiDAR."
  imagePath: "/assets/images/Webflow/3d-object.webp"
  platforms: "iOS only"
```

`Content/Data/Features/room-scanner.yaml`:
```yaml
card:
  title: "Room Scanner"
  description: "Walk through a room and RoomPlan builds a clean floor plan - walls, doors, windows, and furniture - complete with room measurements and area calculation."
  imagePath: "/assets/images/Webflow/scan-room.webp"
  platforms: "iOS only"
```

`Content/Data/Features/webhooks.yaml`:
```yaml
card:
  title: "Webhooks & Automation"
  description: "Five hooks fire the moment you scan - POST to your server, run a Shortcut, open a URL, speak the result, or play a sound. NFC.cool scans; you own what happens next."
  imagePath: "/assets/images/Webflow/webhook.webp"
  platforms: "iOS · Android"
```

- [ ] **Step 2: Add `card:` to the 7 German files**

`Content/Data/Features/nfc-reader-writer.de.yaml`:
```yaml
card:
  title: "NFC lesen & schreiben"
  description: "Lies jeden NFC-Tag und schreibe 25+ Nachrichtenarten - Weblinks, WLAN, Visitenkarten, Kurzbefehle und mehr. Sperre Tags und verschlüssele Geheimnisse mit NFC Safe."
  imagePath: "/assets/images/Webflow/nfc-card.webp"
  platforms: "iOS · Android"
```

`Content/Data/Features/qr-scanner.de.yaml`:
```yaml
card:
  title: "QR-Code-Scanner & Studio"
  description: "Scanne QR-Codes mit der Kamera oder finde sie in einem beliebigen Foto - und gestalte dann eigene mit Icons und Genmoji im integrierten QR Code Studio."
  imagePath: "/assets/images/Webflow/qr-studio.webp"
  platforms: "Nur iOS"
```

`Content/Data/Features/barcode-scanner.de.yaml`:
```yaml
card:
  title: "Barcode-Scanner"
  description: "Scanne 13 Barcode-Formate plus 6 zweidimensionale Codes - EAN, UPC, QR, PDF417, Data Matrix und mehr. Im Batch-Modus bleibt die Kamera offen - für Inventur und Check-ins."
  imagePath: "/assets/images/Webflow/qr-barcode.webp"
  platforms: "Nur iOS"
```

`Content/Data/Features/document-scanner.de.yaml`:
```yaml
card:
  title: "Dokumenten-Scanner mit OCR"
  description: "Scanne Dokumente auf iPhone oder iPad mit automatischer Kantenerkennung und OCR - alles auf deinem Gerät, nichts wird hochgeladen. Exportiere durchsuchbare, mehrseitige PDFs."
  imagePath: "/assets/images/Webflow/document-scan.webp"
  platforms: "Nur iOS"
```

`Content/Data/Features/3d-object-scanner.de.yaml`:
```yaml
card:
  title: "3D-Objektscanner"
  description: "Umrunde ein Objekt und Apples Object Capture baut ein texturiertes 3D-Modell. Exportiere als USDZ für AR, STL für den 3D-Druck oder OBJ für Blender. Erfordert ein iPhone Pro oder iPad Pro mit LiDAR."
  imagePath: "/assets/images/Webflow/3d-object.webp"
  platforms: "Nur iOS"
```

`Content/Data/Features/room-scanner.de.yaml`:
```yaml
card:
  title: "Raumscanner"
  description: "Geh durch einen Raum und RoomPlan erstellt einen sauberen Grundriss - Wände, Türen, Fenster und Möbel - inklusive Raummaße und Flächenberechnung."
  imagePath: "/assets/images/Webflow/scan-room.webp"
  platforms: "Nur iOS"
```

`Content/Data/Features/webhooks.de.yaml`:
```yaml
card:
  title: "Webhooks & Automatisierung"
  description: "Fünf Hooks feuern im Moment, in dem du scannst - POST an deinen Server, Shortcut starten, URL öffnen, Ergebnis vorlesen oder Sound abspielen. NFC.cool scannt; was dann passiert, gehört dir."
  imagePath: "/assets/images/Webflow/webhook.webp"
  platforms: "iOS · Android"
```

- [ ] **Step 3: Add `card:` to the 7 Japanese files**

`Content/Data/Features/nfc-reader-writer.ja.yaml`:
```yaml
card:
  title: "NFCリーダー & ライター"
  description: "どんなNFCタグも読み取り、25種類以上のメッセージタイプを書き込み - ウェブリンク、Wi-Fi、名刺、ショートカットなど。タグをロックし、NFC Safeで秘密の情報を暗号化できます。"
  imagePath: "/assets/images/Webflow/nfc-card.webp"
  platforms: "iOS · Android"
```

`Content/Data/Features/qr-scanner.ja.yaml`:
```yaml
card:
  title: "QRコードスキャナー & スタジオ"
  description: "カメラからQRコードをスキャン、または写真から抽出。組み込みのQRコードスタジオで、アイコンやGenmojiを使ってオリジナルをデザインできます。"
  imagePath: "/assets/images/Webflow/qr-studio.webp"
  platforms: "iOSのみ"
```

`Content/Data/Features/barcode-scanner.ja.yaml`:
```yaml
card:
  title: "バーコードスキャナー"
  description: "13種類のバーコード形式と6種類の2次元コード - EAN、UPC、QR、PDF417、Data Matrixなど - をスキャン。バッチモードでカメラを開いたまま、棚卸しや受付に対応。"
  imagePath: "/assets/images/Webflow/qr-barcode.webp"
  platforms: "iOSのみ"
```

`Content/Data/Features/document-scanner.ja.yaml`:
```yaml
card:
  title: "OCR付き書類スキャナー"
  description: "iPhoneやiPadで書類をスキャン。自動エッジ検出とOCRがすべて端末上で完結し、アップロードは一切なし。検索可能な複数ページPDFに書き出せます。"
  imagePath: "/assets/images/Webflow/document-scan.webp"
  platforms: "iOSのみ"
```

`Content/Data/Features/3d-object-scanner.ja.yaml`:
```yaml
card:
  title: "3Dオブジェクト・スキャナー"
  description: "オブジェクトの周りを歩くと、AppleのObject Captureがテクスチャ付き3Dモデルを構築。AR用のUSDZ、3DプリントのSTL、Blender用のOBJに書き出せます。LiDAR搭載のiPhone ProまたはiPad Proが必要です。"
  imagePath: "/assets/images/Webflow/3d-object.webp"
  platforms: "iOSのみ"
```

`Content/Data/Features/room-scanner.ja.yaml`:
```yaml
card:
  title: "ルーム・スキャナー"
  description: "部屋を歩くだけでRoomPlanが美しい間取り図を作成 - 壁、ドア、窓、家具に加え、部屋の寸法と面積計算も。"
  imagePath: "/assets/images/Webflow/scan-room.webp"
  platforms: "iOSのみ"
```

`Content/Data/Features/webhooks.ja.yaml`:
```yaml
card:
  title: "Webhook & オートメーション"
  description: "スキャンした瞬間に5つのフックが起動 - サーバーへPOST、ショートカット実行、URLを開く、結果を読み上げ、サウンド再生。NFC.coolはスキャナー、次に何をするかはあなた次第です。"
  imagePath: "/assets/images/Webflow/webhook.webp"
  platforms: "iOSのみ"
```

- [ ] **Step 4: Build to confirm the YAML is still valid**

Run: `swift run Site build`
Expected: completes without error. The `card:` key is not yet in the model, so it is ignored - this step only proves the 21 files are still well-formed YAML.

- [ ] **Step 5: Commit**

```bash
git add Content/Data/Features/
git commit -m "Add card blocks to feature YAMLs"
```

---

## Task 2: Add the `FeatureCard` model

**Files:**
- Modify: `Sources/Site/Models/FeatureData.swift`

- [ ] **Step 1: Add the required `card` field to `FeatureData`**

In `Sources/Site/Models/FeatureData.swift`, the struct currently begins:
```swift
struct FeatureData: Decodable, Sendable {
   let slug: String
   let hero: FeatureHero
```
Change it to:
```swift
struct FeatureData: Decodable, Sendable {
   let slug: String
   let card: FeatureCard
   let hero: FeatureHero
```

- [ ] **Step 2: Add the `FeatureCard` struct**

In the same file, immediately after the closing brace of the `FeatureHero` struct, add:
```swift
/// Grid-card content for a feature: the single source of truth for how the
/// feature appears on the landing page and the features index. Independent
/// of `FeatureHero` - the card carries its own short copy and may use a
/// different image than the detail-page hero.
struct FeatureCard: Decodable, Sendable {
   let title: String
   let description: String
   let imagePath: String
   let platforms: String?
}
```

- [ ] **Step 3: Build - this also verifies every feature YAML has a `card:` block**

Run: `swift run Site build`
Expected: completes without error. Because `card` is non-optional, the build now decodes a `card:` block from all 21 feature YAMLs; a missing or misspelled block would fail here with a decoding error naming the file.

- [ ] **Step 4: Commit**

```bash
git add Sources/Site/Models/FeatureData.swift
git commit -m "Add FeatureCard model"
```

---

## Task 3: Add the shared feature-card helpers

**Files:**
- Create: `Sources/Site/Helpers/FeatureCards.swift`

- [ ] **Step 1: Create the helper file**

Create `Sources/Site/Helpers/FeatureCards.swift` with exactly this content:
```swift
import Foundation
import SiteKit
import Yams

/// Loads every feature YAML for the build's current locale, in the canonical
/// `FeaturePageRenderer.slugs` order. Slugs with no localized YAML are skipped,
/// so a locale that lacks a feature simply omits its card. Shared by the
/// landing page and the features index.
func loadFeatures(context: BuildContext) throws -> [(slug: String, data: FeatureData)] {
   let locale = context.uiStrings.locale
   let defaultLang = context.config.effectiveDefaultLanguage
   let suffix = locale == defaultLang ? "" : ".\(locale)"
   var result: [(slug: String, data: FeatureData)] = []
   for slug in FeaturePageRenderer.slugs {
      let yamlPath = context.projectDirectory
         .appendingPathComponent(context.config.contentDirectory)
         .appendingPathComponent("Data")
         .appendingPathComponent("Features")
         .appendingPathComponent("\(slug)\(suffix).yaml")
      guard FileManager.default.fileExists(atPath: yamlPath.path) else { continue }
      let yamlData = try Data(contentsOf: yamlPath)
      let feature = try YAMLDecoder().decode(FeatureData.self, from: yamlData)
      result.append((slug: slug, data: feature))
   }
   return result
}

/// Renders the numbered `.landing-feature-card` grid items shared by the
/// landing page and the features index. Returns the joined `<a>` markup only -
/// the caller wraps it in `<div class="landing-features">`. Every card links
/// into its `/features/{slug}/` detail page.
func renderFeatureCards(_ features: [(slug: String, data: FeatureData)], basePath: String) -> String {
   features.enumerated().map { index, entry in
      let card = entry.data.card
      let num = String(format: "%02d", index + 1)
      let href = "\(basePath)features/\(entry.slug)/"
      let platformsHTML: String = {
         guard let platforms = card.platforms else { return "" }
         return PlatformBadge.render(platforms: platforms, wrapperClass: "landing-feature-platforms")
      }()
      return """
      <a class="landing-feature-card is-linked" href="\(href)">
         <span class="landing-feature-num" aria-hidden="true">\(num)</span>
         <img src="\(card.imagePath)" alt="\(card.title.htmlEscaped)" loading="lazy" class="landing-feature-image"/>
         <div class="landing-feature-card-text">
            <h3 class="landing-feature-title">\(card.title.htmlEscaped)</h3>
            \(platformsHTML)
            <p class="landing-feature-desc">\(card.description.htmlEscaped)</p>
         </div>
      </a>
      """
   }.joined()
}
```

- [ ] **Step 2: Build**

Run: `swift run Site build`
Expected: completes without error. The two functions are not called yet; this step only proves they compile.

- [ ] **Step 3: Commit**

```bash
git add Sources/Site/Helpers/FeatureCards.swift
git commit -m "Add shared feature-card rendering helpers"
```

---

## Task 4: Render the features index from the shared helpers

**Files:**
- Modify: `Sources/Site/Renderers/FeaturesIndexRenderer.swift`

- [ ] **Step 1: Replace the entire file content**

Replace the full content of `Sources/Site/Renderers/FeaturesIndexRenderer.swift` with:
```swift
import Foundation
import SiteKit

/// Renders the `/features/` index - a hub page that lists every feature
/// detail page available for the current locale.
struct FeaturesIndexRenderer: Renderer {
   func render(context: BuildContext) throws -> [OutputFile] {
      let helper = OutputFileRenderer(context: context)
      let locale = context.uiStrings.locale

      // Load every feature available for this locale, in canonical slug order.
      // Skip the locale entirely when it has no localized feature YAMLs.
      let features = try loadFeatures(context: context)
      guard !features.isEmpty else { return [] }

      // Localized hub headings - keep a tiny in-code dictionary.
      let (title, subtitle): (String, String) = {
         switch locale {
         case "de":
            return (
               "NFC.cool Funktionen",
               "NFC-Tags lesen, schreiben und dekodieren. QR-Codes und Barcodes scannen. Dokumente, 3D-Objekte und Räume erfassen. Jeden Scan an deinen eigenen Webhook senden - eine App, jeder Scanner, der dein Smartphone sein kann."
            )
         case "ja":
            return (
               "NFC.cool の機能",
               "NFCタグの読み取り・書き込み・デコード。QRコードとバーコードのスキャン。書類、3Dオブジェクト、ルームの取り込み。すべてのスキャンをあなたのWebhookへ - スマホを、考えられるすべてのスキャナーに。"
            )
         default:
            return (
               "NFC.cool Features",
               "Read, write, and decode NFC tags. Scan QR codes and barcodes. Capture documents, 3D objects, and rooms. Forward every scan to your own webhook - one app, every scanner your phone can be."
            )
         }
      }()

      let toolsAppStoreURL = StoreLink.appStore(app: .tools, page: "web-features", locale: locale)
      let toolsGooglePlayURL = StoreLink.googlePlay(app: .tools, page: "web-features", locale: locale)

      // Final CTA reuses the landing's closing block so this hub page closes
      // with the same brand-gradient prompt as the home and per-feature pages.
      let landing = try loadLandingData(context: context)
      let finalCTAHTML: String = {
         guard let cta = landing.cta else { return "" }
         return renderFinalCTA(cta: cta, trust: landing.trust, appStoreURL: toolsAppStoreURL, googlePlayURL: toolsGooglePlayURL)
      }()

      let basePath = context.router.homePath()
      let cards = renderFeatureCards(features, basePath: basePath)
      let pagePath = "\(basePath)features/"

      // (title, slug) list for the JSON-LD ItemList - uses the card title so
      // structured data matches what the card visually shows.
      let itemListEntries: [(title: String, slug: String)] = features.map {
         (title: $0.data.card.title, slug: $0.slug)
      }
      let jsonLD = StructuredData.featuresIndexGraph(
         baseURL: context.config.baseURL,
         homePath: basePath,
         featuresLabel: title,
         items: itemListEntries
      )

      let head = helper.buildHead(
         title: "\(title) - \(context.config.name)",
         description: subtitle,
         canonicalURL: context.config.baseURL + pagePath,
         ogType: "website",
         image: context.config.baseURL + "/assets/images/Webflow/qr-studio.webp",
         imageAlt: title,
         jsonLD: jsonLD,
         hreflang: helper.buildHreflangForAllLanguages { router in
            "\(router.homePath())features/"
         }
      )

      let body = """
      <main class="sk-main features-index">
         <section class="page-hero features-index-hero">
            <div class="page-hero-grid landing-container">
               <div class="page-hero-text">
                  <h1>\(title.htmlEscaped)</h1>
                  <p>\(subtitle.htmlEscaped)</p>
                  <div class="landing-hero-actions">\(renderStoreButtons(appStoreURL: toolsAppStoreURL, googlePlayURL: toolsGooglePlayURL))</div>
               </div>
               <div class="page-hero-visual">
                  <img src="/assets/images/Webflow/qr-studio.webp" alt="\(title.htmlEscaped)" loading="eager" fetchpriority="high"/>
               </div>
            </div>
         </section>
         <section class="landing-feature-grid features-index-grid-section">
            <div class="landing-container">
               <div class="landing-features">\(cards)</div>
            </div>
         </section>
         \(finalCTAHTML)
      </main>
      """

      let html = helper.renderPageShell(
         head: head,
         bodyClass: "sk-page-features features",
         content: body
      )

      let relativeBase = String(basePath.dropFirst())
      let outputPath = context.outputDirectory
         .appendingPathComponent(relativeBase)
         .appendingPathComponent("features")
         .appendingPathComponent("index.html")

      return [OutputFile(outputPath: outputPath, content: html)]
   }
}
```

Note what changed versus the old file: the per-slug YAML load loop and the inline card markup are gone (replaced by `loadFeatures` + `renderFeatureCards`); the `hasAnyFeature` pre-check is replaced by `guard !features.isEmpty`; the JSON-LD `itemListEntries` re-load loop is gone; the unused `exploreLabel` is gone; `import Yams` is dropped (no `YAMLDecoder` call remains).

- [ ] **Step 2: Build**

Run: `swift run Site build`
Expected: completes without error.

- [ ] **Step 3: Verify the generated index grids**

Run: `grep -o 'landing-feature-card is-linked' _Site/features/index.html | wc -l`
Expected: `7`

Run: `grep -o 'landing-feature-card is-linked' _Site/de/features/index.html | wc -l`
Expected: `7`

Run: `grep -o 'landing-feature-card is-linked' _Site/ja/features/index.html | wc -l`
Expected: `7`

Run: `grep -c 'Scan 13 barcode formats plus 6 two-dimensional codes' _Site/features/index.html`
Expected: `1` (the card now shows the short card copy, not the long hero subtitle)

- [ ] **Step 4: Commit**

```bash
git add Sources/Site/Renderers/FeaturesIndexRenderer.swift
git commit -m "Render features index from feature card blocks"
```

---

## Task 5: Render the landing feature grid from the shared helpers

**Files:**
- Modify: `Sources/Site/Renderers/LandingPageRenderer.swift`

- [ ] **Step 1: Load features in `render`**

In `Sources/Site/Renderers/LandingPageRenderer.swift`, find this block inside `render`:
```swift
      if let features = data.features, !features.isEmpty {
         sections.append(self.renderFeatureGrid(features, title: data.featuresTitle, basePath: context.router.homePath()))
      }
```
Replace it with:
```swift
      let features = try loadFeatures(context: context)
      if !features.isEmpty {
         sections.append(self.renderFeatureGrid(features, title: data.featuresTitle, basePath: context.router.homePath()))
      }
```

- [ ] **Step 2: Rewrite `renderFeatureGrid`**

In the same file, find the whole `renderFeatureGrid` method. It currently is:
```swift
   private func renderFeatureGrid(_ features: [Feature], title: String?, basePath: String) -> String {
      var cards: [String] = []
      for (index, feature) in features.enumerated() {
         let num = String(format: "%02d", index + 1)
         let platformsHTML: String = {
            guard let platforms = feature.platforms else { return "" }
            return PlatformBadge.render(platforms: platforms, wrapperClass: "landing-feature-platforms")
         }()
         let body = """
            <span class="landing-feature-num" aria-hidden="true">\(num)</span>
            <img src="\(feature.imagePath)" alt="\(feature.title.htmlEscaped)" loading="lazy" class="landing-feature-image"/>
            <div class="landing-feature-card-text">
               <h3 class="landing-feature-title">\(feature.title.htmlEscaped)</h3>
               \(platformsHTML)
               <p class="landing-feature-desc">\(feature.description.htmlEscaped)</p>
            </div>
         """
         // When the YAML names a feature-detail slug, render the card as an
         // anchor so the whole thing is clickable into /features/{slug}/.
         if let slug = feature.slug, !slug.isEmpty {
            let href = "\(basePath)features/\(slug)/"
            cards.append("<a class=\"landing-feature-card is-linked\" href=\"\(href)\">\(body)</a>")
         } else {
            cards.append("<article class=\"landing-feature-card\">\(body)</article>")
         }
      }
      let heading = (title ?? "").isEmpty ? "" : "<h2 class=\"landing-section-title\">\(title!.htmlEscaped)</h2>"
      return """
      <section id="features" class="landing-feature-grid">
         <div class="landing-container">
            \(heading)
            <div class="landing-features">\(cards.joined())</div>
         </div>
      </section>
      """
   }
```
Replace the entire method with:
```swift
   private func renderFeatureGrid(_ features: [(slug: String, data: FeatureData)], title: String?, basePath: String) -> String {
      let cards = renderFeatureCards(features, basePath: basePath)
      let heading = (title ?? "").isEmpty ? "" : "<h2 class=\"landing-section-title\">\(title!.htmlEscaped)</h2>"
      return """
      <section id="features" class="landing-feature-grid">
         <div class="landing-container">
            \(heading)
            <div class="landing-features">\(cards)</div>
         </div>
      </section>
      """
   }
```

- [ ] **Step 3: Build**

Run: `swift run Site build`
Expected: completes without error. `LandingData.features` and the `Feature` struct are now unused but still present - that is fine; they are removed in Task 6.

- [ ] **Step 4: Verify the generated landing grids**

Run: `grep -o 'landing-feature-card is-linked' _Site/index.html | wc -l`
Expected: `7` (was 8 - the page-less "Shortcuts & Widgets" card is gone)

Run: `grep -o 'landing-feature-card is-linked' _Site/de/index.html | wc -l`
Expected: `7`

Run: `grep -c 'Shortcuts & Widgets' _Site/index.html`
Expected: `0` (the dropped card's title no longer appears)

Run: `grep -c 'NFC lesen &amp; schreiben' _Site/de/index.html`
Expected: `1` (German card title renders, ampersand HTML-escaped)

- [ ] **Step 5: Commit**

```bash
git add Sources/Site/Renderers/LandingPageRenderer.swift
git commit -m "Render landing feature grid from feature card blocks"
```

---

## Task 6: Remove the obsolete `Feature` model and `Landing*.yaml` feature arrays

**Files:**
- Modify: `Sources/Site/Models/LandingData.swift`
- Modify: `Content/Data/Landing.yaml`
- Modify: `Content/Data/Landing.de.yaml`

- [ ] **Step 1: Remove `LandingData.features`**

In `Sources/Site/Models/LandingData.swift`, delete this line from the `LandingData` struct:
```swift
   let features: [Feature]?
```
Leave `let featuresTitle: String?` in place - it is still the landing grid's section heading.

- [ ] **Step 2: Remove the `Feature` struct**

In the same file, delete the entire `Feature` struct:
```swift
struct Feature: Decodable, Sendable {
   let title: String
   let description: String
   let imagePath: String
   let platforms: String?
   /// Optional feature-page slug. When set, the landing-page card becomes a
   /// link to `/features/{slug}/` so visitors can drill into the detail page.
   let slug: String?
}
```

- [ ] **Step 3: Remove the `features:` array from `Content/Data/Landing.yaml`**

Delete the `features:` key and all of its list entries (the seven feature cards plus the page-less "Shortcuts & Widgets" card). Keep the `featuresTitle:` line directly above it and the `featureBanner:` section directly below it. After the edit the region reads:
```yaml
featuresTitle: "Everything you need to scan"

featureBanner:
```

- [ ] **Step 4: Remove the `features:` array from `Content/Data/Landing.de.yaml`**

Same as Step 3 for the German file: delete the `features:` key and every entry under it, keeping `featuresTitle:` above and `featureBanner:` below.

- [ ] **Step 5: Build**

Run: `swift run Site build`
Expected: completes without error. The decoder ignores any leftover keys, but both arrays should now be gone.

- [ ] **Step 6: Verify nothing references the removed symbols**

Run: `grep -rn 'LandingData.features\|\[Feature\]\|struct Feature\b' Sources/`
Expected: no output (the `Feature` type and `features` field are fully removed).

Run: `grep -c 'landing-feature-card is-linked' _Site/index.html`
Expected: `7` (landing grid unchanged from Task 5 - still rendering)

- [ ] **Step 7: Commit**

```bash
git add Sources/Site/Models/LandingData.swift Content/Data/Landing.yaml Content/Data/Landing.de.yaml
git commit -m "Remove obsolete Feature model and Landing features arrays"
```

---

## Task 7: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Clean build**

Run: `swift run Site build`
Expected: completes without error.

- [ ] **Step 2: Translation parity check**

Run: `swift run Site validate`
Expected: passes with no missing-translation errors. The `card:` blocks were added to English and German symmetrically; Japanese feature files all have `card:` blocks too.

- [ ] **Step 3: Card-count checks across every grid**

Run each and confirm the expected count:
```bash
grep -o 'landing-feature-card is-linked' _Site/index.html | wc -l            # 7
grep -o 'landing-feature-card is-linked' _Site/de/index.html | wc -l         # 7
grep -o 'landing-feature-card is-linked' _Site/features/index.html | wc -l   # 7
grep -o 'landing-feature-card is-linked' _Site/de/features/index.html | wc -l # 7
grep -o 'landing-feature-card is-linked' _Site/ja/features/index.html | wc -l # 7
```

- [ ] **Step 4: Spot-check card content parity between the two English grids**

Run: `grep -c 'Walk through a room and RoomPlan builds a clean floor plan' _Site/index.html _Site/features/index.html`
Expected: both files report `1` - the landing card and the index card now show identical copy from the one source.

- [ ] **Step 5: Human visual check**

Run: `swift run Site serve` and open `http://localhost:8080`. Confirm on `/`, `/de/`, `/features/`, `/de/features/`, `/ja/features/`: 7 cards each, correct images, platform chips, every card clicks through to its `/features/{slug}/` page, and the grid looks unchanged stylistically. Stop the server when done.

- [ ] **Step 6: No commit**

This task changes no files. If Steps 1-5 all pass, the feature is complete.

---

## Self-review notes

- **Spec coverage:** data model (Task 2), YAML shape (Task 1), shared helper (Task 3), `FeaturesIndexRenderer` + `LandingPageRenderer` changes (Tasks 4-5), dropped Shortcuts card (Task 5 - the slug-less `<article>` branch is removed), content for all 21 files (Task 1), `Landing*.yaml` cleanup (Task 6), verification (Task 7). The "Related cleanup" (the `25+` fix) is already applied on this branch and needs no task.
- **Build stays green:** content (Task 1) lands before the model (Task 2); helpers (Task 3) before their callers (Tasks 4-5); dead code removed last (Task 6).
- **Type consistency:** `loadFeatures` returns `[(slug: String, data: FeatureData)]`; `renderFeatureCards` and `renderFeatureGrid` both consume that exact tuple type; `FeatureCard` fields (`title`, `description`, `imagePath`, `platforms`) are used identically in Task 2's model and Task 3's renderer.
