import Foundation
import SiteKit
import Yams

/// Renders the `/features/` index — a hub page that lists every feature
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

      // Localized hub headings — keep a tiny in-code dictionary.
      let (title, subtitle, exploreLabel): (String, String, String) = {
         switch locale {
         case "de":
            return (
               "Funktionen im Detail",
               "Eine eigene Seite pro Funktion mit Screenshots, technischen Details und häufigen Fragen.",
               "Im Detail ansehen →"
            )
         case "ja":
            return (
               "機能の詳細",
               "各機能の専用ページにスクリーンショット、技術詳細、よくある質問をまとめました。",
               "詳しく見る →"
            )
         default:
            return (
               "Features in depth",
               "A dedicated page per feature, with screenshots, technical details, and frequently-asked questions.",
               "Explore →"
            )
         }
      }()

      _ = exploreLabel // not used — cards now mirror landing-feature-card style verbatim.

      // Per-locale Tools campaign URLs so the hero badges match every other
      // page on the site.
      let toolsAppStoreURL = "https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web_\(locale)&mt=8"
      let toolsGooglePlayURL = "https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb_\(locale)"

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

      let head = helper.buildHead(
         title: "\(title) — \(context.config.name)",
         description: subtitle,
         canonicalURL: context.config.baseURL + pagePath,
         ogType: "website",
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
                  <div class="landing-hero-actions">\(self.renderStoreButtons(appStoreURL: toolsAppStoreURL, googlePlayURL: toolsGooglePlayURL))</div>
               </div>
               <div class="page-hero-visual is-brand">
                  <img src="/assets/theme/images/NFC_SecondaryLogo_White.webp" alt="NFC.cool" loading="eager" fetchpriority="high"/>
               </div>
            </div>
         </section>
         <section class="landing-feature-grid features-index-grid-section">
            <div class="landing-container">
               <div class="landing-features">\(cards.joined())</div>
            </div>
         </section>
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

   /// Same dual-badge markup as LandingPageRenderer/FeaturePageRenderer so the
   /// CSS styling stays unified. URLs are expected to be fully-formed campaign
   /// links (see Content/Data/Landing.yaml).
   private func renderStoreButtons(appStoreURL: String, googlePlayURL: String?) -> String {
      var buttons: [String] = []
      buttons.append("""
         <a href="\(appStoreURL)" class="landing-store-button is-apple" aria-label="Download on the App Store">
            <img src="/assets/theme/images/AppStore.svg" alt="Download on the App Store" width="156" height="52"/>
         </a>
         """)
      if let url = googlePlayURL {
         buttons.append("""
            <a href="\(url)" class="landing-store-button is-google" aria-label="Get it on Google Play">
               <img src="/assets/theme/images/GooglePlay.svg" alt="Get it on Google Play" width="173" height="52"/>
            </a>
            """)
      }
      return "<div class=\"landing-store-buttons\">\(buttons.joined())</div>"
   }
}
