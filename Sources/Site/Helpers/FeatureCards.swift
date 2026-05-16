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
