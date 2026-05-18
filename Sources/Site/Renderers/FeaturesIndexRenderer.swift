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
               "NFC.coolの機能",
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
      let newsletterHTML = NewsletterForm.section(for: context)

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

      let heroText = """
      \(renderTitleWithBrandTail(title, tagName: "h1"))
      <p>\(subtitle.htmlEscaped)</p>
      <div class="landing-hero-actions">\(renderStoreButtons(appStoreURL: toolsAppStoreURL, googlePlayURL: toolsGooglePlayURL))</div>
      """
      let heroHTML = renderPageHero(
         modifier: "features-index-hero",
         text: heroText,
         visual: PageHeroVisual(src: "/assets/images/Webflow/qr-studio.webp", alt: title.htmlEscaped)
      )

      let body = """
      <main class="sk-main features-index">
         \(heroHTML)
         <section class="landing-feature-grid features-index-grid-section">
            <div class="landing-container">
               <div class="landing-features">\(cards)</div>
            </div>
         </section>
         \(newsletterHTML)
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
