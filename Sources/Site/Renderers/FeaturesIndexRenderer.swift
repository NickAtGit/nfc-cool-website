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

      // Build the per-feature mini-cards by peeking into each feature YAML for hero
      // title/subtitle/platforms; skip features missing their locale-specific YAML.
      var cards: [String] = []
      for slug in FeaturePageRenderer.slugs {
         let yamlPath = context.projectDirectory
            .appendingPathComponent(context.config.contentDirectory)
            .appendingPathComponent("Data")
            .appendingPathComponent("Features")
            .appendingPathComponent("\(slug)\(suffix).yaml")
         guard FileManager.default.fileExists(atPath: yamlPath.path) else { continue }
         let yamlData = try Data(contentsOf: yamlPath)
         let feature = try YAMLDecoder().decode(FeatureData.self, from: yamlData)

         let basePath = context.router.homePath()
         let href = "\(basePath)features/\(slug)/"
         let platformsHTML: String = {
            guard let p = feature.hero.platforms else { return "" }
            return PlatformBadge.render(platforms: p, wrapperClass: "feature-index-platforms")
         }()
         cards.append("""
         <a href="\(href)" class="feature-index-card">
            <h3>\(feature.hero.title.htmlEscaped)</h3>
            \(platformsHTML)
            <p>\(feature.hero.subtitle.htmlEscaped)</p>
         </a>
         """)
      }
      guard !cards.isEmpty else { return [] }

      // Localized hub headings — keep a tiny in-code dictionary.
      let title = locale == "de" ? "Funktionen im Detail" : "Features in depth"
      let subtitle = locale == "de"
         ? "Eine eigene Seite pro Funktion mit Screenshots, technischen Details und häufigen Fragen."
         : "A dedicated page per feature, with screenshots, technical details, and frequently-asked questions."

      let basePath = context.router.homePath()
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
         <section class="features-index-hero">
            <div class="landing-container">
               <h1 class="landing-section-title">\(title.htmlEscaped)</h1>
               <p class="features-index-subtitle">\(subtitle.htmlEscaped)</p>
            </div>
         </section>
         <section class="features-index-grid-section">
            <div class="landing-container">
               <div class="feature-index-grid">\(cards.joined())</div>
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
}
