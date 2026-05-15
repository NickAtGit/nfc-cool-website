import Foundation
import SiteKit
import Yams

/// Renders the `/features/` index - a hub page that lists every feature
/// detail page available for the current locale.
struct FeaturesIndexRenderer: Renderer {
   func render(context: BuildContext) throws -> [OutputFile] {
      let locale = context.uiStrings.locale
      let defaultLang = context.config.effectiveDefaultLanguage
      let suffix = locale == defaultLang ? "" : ".\(locale)"
      let helper = OutputFileRenderer(context: context)

      // Skip the locale entirely when none of the features have a localised YAML.
      var cards: [String] = []
      let hasAnyFeature = FeaturePageRenderer.slugs.contains { slug in
         let yamlPath = context.projectDirectory
            .appendingPathComponent(context.config.contentDirectory)
            .appendingPathComponent("Data")
            .appendingPathComponent("Features")
            .appendingPathComponent("\(slug)\(suffix).yaml")
         return FileManager.default.fileExists(atPath: yamlPath.path)
      }
      guard hasAnyFeature else { return [] }

      // Localized hub headings - keep a tiny in-code dictionary.
      let (title, subtitle, exploreLabel): (String, String, String) = {
         switch locale {
         case "de":
            return (
               "NFC.cool Funktionen",
               "NFC-Tags lesen, schreiben und dekodieren. QR-Codes und Barcodes scannen. Dokumente, 3D-Objekte und Räume erfassen. Jeden Scan an deinen eigenen Webhook senden - eine App, jeder Scanner, der dein Smartphone sein kann.",
               "Im Detail ansehen →"
            )
         case "ja":
            return (
               "NFC.cool の機能",
               "NFCタグの読み取り・書き込み・デコード。QRコードとバーコードのスキャン。書類、3Dオブジェクト、ルームの取り込み。すべてのスキャンをあなたのWebhookへ - スマホを、考えられるすべてのスキャナーに。",
               "詳しく見る →"
            )
         default:
            return (
               "NFC.cool Features",
               "Read, write, and decode NFC tags. Scan QR codes and 25+ barcode formats. Capture documents, 3D objects, and rooms. Forward every scan to your own webhook - one app, every scanner your phone can be.",
               "Explore →"
            )
         }
      }()

      _ = exploreLabel // not used - cards now mirror landing-feature-card style verbatim.

      let toolsAppStoreURL = StoreLink.appStore(app: .tools, page: "web-features", locale: locale)
      let toolsGooglePlayURL = StoreLink.googlePlay(app: .tools, page: "web-features", locale: locale)

      // Final CTA reuses the landing's closing block so this hub page closes
      // with the same brand-gradient prompt as the home and per-feature pages.
      let landing = try loadLandingData(context: context)
      let finalCTAHTML: String = {
         guard let cta = landing.cta else { return "" }
         return renderFinalCTA(cta: cta, trust: landing.trust, appStoreURL: toolsAppStoreURL, googlePlayURL: toolsGooglePlayURL)
      }()

      // Build the per-feature cards using the SAME .landing-feature-card markup
      // the landing page emits, so both grids look identical and the whole card
      // is a link into /features/{slug}/.
      cards.removeAll()
      let basePath = context.router.homePath()
      for (index, slug) in FeaturePageRenderer.slugs.enumerated() {
         let yamlPath = context.projectDirectory
            .appendingPathComponent(context.config.contentDirectory)
            .appendingPathComponent("Data")
            .appendingPathComponent("Features")
            .appendingPathComponent("\(slug)\(suffix).yaml")
         guard FileManager.default.fileExists(atPath: yamlPath.path) else { continue }
         let yamlData = try Data(contentsOf: yamlPath)
         let feature = try YAMLDecoder().decode(FeatureData.self, from: yamlData)

         let num = String(format: "%02d", index + 1)
         let href = "\(basePath)features/\(slug)/"
         let imagePath = feature.hero.heroImagePath ?? ""
         let platformsHTML: String = {
            guard let p = feature.hero.platforms else { return "" }
            return PlatformBadge.render(platforms: p, wrapperClass: "landing-feature-platforms")
         }()
         cards.append("""
         <a class="landing-feature-card is-linked" href="\(href)">
            <span class="landing-feature-num" aria-hidden="true">\(num)</span>
            <img src="\(imagePath)" alt="\(feature.hero.title.htmlEscaped)" loading="lazy" class="landing-feature-image"/>
            <div class="landing-feature-card-text">
               <h3 class="landing-feature-title">\(feature.hero.title.htmlEscaped)</h3>
               \(platformsHTML)
               <p class="landing-feature-desc">\(feature.hero.subtitle.htmlEscaped)</p>
            </div>
         </a>
         """)
      }

      let pagePath = "\(basePath)features/"

      // Build the (title, slug) list for JSON-LD ItemList. Loads each feature
      // YAML once more here to surface the localized title; small cost since
      // we already loaded them above for the card grid.
      let itemListEntries: [(title: String, slug: String)] = FeaturePageRenderer.slugs.compactMap { slug in
         let yamlPath = context.projectDirectory
            .appendingPathComponent(context.config.contentDirectory)
            .appendingPathComponent("Data")
            .appendingPathComponent("Features")
            .appendingPathComponent("\(slug)\(suffix).yaml")
         guard FileManager.default.fileExists(atPath: yamlPath.path) else { return nil }
         guard let yamlData = try? Data(contentsOf: yamlPath) else { return nil }
         guard let feature = try? YAMLDecoder().decode(FeatureData.self, from: yamlData) else { return nil }
         return (feature.hero.title, slug)
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
               <div class="landing-features">\(cards.joined())</div>
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
