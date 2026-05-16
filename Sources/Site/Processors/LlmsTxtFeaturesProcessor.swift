import Foundation
import SiteKit
import Yams

/// Injects a `## Features` section into the generated `llms.txt`.
///
/// SiteKit's `LlmsTxtRenderer` builds `llms.txt` from sections and static pages
/// only - it has no knowledge of the custom `FeaturePageRenderer`, so the seven
/// `/features/{slug}/` pages would be invisible to AI agents reading the file.
/// This post-processor reads the feature YAMLs and splices a Features block in
/// just before `## Pages` (the renderer emits Pages, then Languages last).
struct LlmsTxtFeaturesProcessor: OutputProcessor {
   func process(outputDirectory: URL, projectDirectory: URL, themeConfig: ThemeConfig?) throws {
      let llmsURL = outputDirectory.appendingPathComponent("llms.txt")
      guard var content = try? String(contentsOf: llmsURL, encoding: .utf8) else { return }
      // Idempotent: skip if a previous run (or a future SiteKit version) already
      // emitted a Features section.
      guard !content.contains("## Features") else { return }

      let configURL = projectDirectory.appendingPathComponent("SiteConfig.yaml")
      guard let configData = try? Data(contentsOf: configURL),
            let config = try? YAMLDecoder().decode(SiteConfigSubset.self, from: configData)
      else { return }

      let featuresDir = projectDirectory
         .appendingPathComponent("Content")
         .appendingPathComponent("Data")
         .appendingPathComponent("Features")

      var featureLines: [String] = []
      for slug in FeaturePageRenderer.slugs {
         let yamlURL = featuresDir.appendingPathComponent("\(slug).yaml")
         guard let data = try? Data(contentsOf: yamlURL),
               let feature = try? YAMLDecoder().decode(FeatureData.self, from: data)
         else { continue }
         featureLines.append("- [\(feature.card.title)](\(config.baseURL)/features/\(slug)/): \(feature.card.description)")
      }
      guard !featureLines.isEmpty else { return }

      let block = (["## Features", ""] + featureLines + ["", ""]).joined(separator: "\n")

      // Splice before `## Pages`; fall back to `## Languages`, then end of file.
      if let range = content.range(of: "## Pages") {
         content.replaceSubrange(range, with: block + "## Pages")
      } else if let range = content.range(of: "## Languages") {
         content.replaceSubrange(range, with: block + "## Languages")
      } else {
         content += "\n" + block
      }

      try content.write(to: llmsURL, atomically: true, encoding: .utf8)
   }

   /// Minimal projection of `SiteConfig.yaml` - only the field this processor
   /// needs. Extra YAML keys are ignored by the synthesized decoder.
   private struct SiteConfigSubset: Decodable {
      let baseURL: String
   }
}
