import Foundation
import SiteKit

/// Inject `<link rel="preload" as="font" type="font/woff2" crossorigin>`
/// hints into every emitted HTML file's `<head>`.
///
/// SiteKit's `FontsFaceCSSRenderer` already preloads `fonts.css`, but not
/// the individual woff2 binaries. Without those, the browser only starts
/// fetching the font files AFTER fonts.css is parsed AND a node using the
/// font-family is encountered - too late to avoid FOUT on first paint.
///
/// This processor scans every `.html` file under the output directory and
/// inserts `<link rel="preload" as="font">` tags right after the opening
/// `<head>` so the preload scanner kicks off the woff2 fetch in parallel
/// with the HTML/CSS parse. Combined with `font-display: swap`, the swap
/// from system fallback → Titillium is usually imperceptible.
struct FontPreloadProcessor: OutputProcessor {
   /// Critical Titillium Web weights to preload. Limit to weights that
   /// appear above-the-fold; preloading every weight wastes bandwidth.
   private let weights = ["TitilliumWeb-400", "TitilliumWeb-600", "TitilliumWeb-700"]

   func process(outputDirectory: URL, projectDirectory: URL, themeConfig: ThemeConfig?) throws {
      let preloadTags = self.weights.map { weight in
         "<link rel=\"preload\" as=\"font\" type=\"font/woff2\" crossorigin href=\"/assets/theme/fonts/\(weight).woff2\"/>"
      }.joined()

      let fileManager = FileManager.default
      guard let enumerator = fileManager.enumerator(at: outputDirectory, includingPropertiesForKeys: nil) else { return }

      for case let url as URL in enumerator where url.pathExtension == "html" {
         guard var html = try? String(contentsOf: url, encoding: .utf8) else { continue }
         guard !html.contains("rel=\"preload\" as=\"font\"") else { continue }
         guard let headRange = html.range(of: "<head>") else { continue }
         html.insert(contentsOf: preloadTags, at: headRange.upperBound)
         try? html.write(to: url, atomically: true, encoding: .utf8)
      }
   }
}
