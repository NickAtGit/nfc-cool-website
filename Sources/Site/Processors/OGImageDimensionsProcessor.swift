import Foundation
import SiteKit

/// Inject `og:image:width` and `og:image:height` next to every emitted
/// `og:image` meta tag. SiteKit's `buildHead` emits the image URL and alt but
/// not the dimensions; Facebook, LinkedIn, and X all prefer them so they can
/// reserve the preview-card slot before the image actually downloads (avoids
/// layout shift in the messenger UI).
///
/// We standardize on **1200×630** across the site - the recommended size for
/// `summary_large_image` on X and `og:image` on Facebook. Any renderer that
/// emits an image whose actual dimensions diverge significantly should crop
/// or extend the source to 1200×630 to match.
struct OGImageDimensionsProcessor: OutputProcessor {
   private let width = 1200
   private let height = 630

   func process(outputDirectory: URL, projectDirectory: URL, themeConfig: ThemeConfig?) throws {
      let fileManager = FileManager.default
      guard let enumerator = fileManager.enumerator(at: outputDirectory, includingPropertiesForKeys: nil) else { return }

      for case let url as URL in enumerator where url.pathExtension == "html" {
         guard var html = try? String(contentsOf: url, encoding: .utf8) else { continue }
         // Skip pages without an og:image - lying about dimensions would be
         // worse than emitting nothing.
         guard html.contains("property=\"og:image\"") else { continue }
         // Idempotent: bail if we already injected on a previous run.
         guard !html.contains("property=\"og:image:width\"") else { continue }

         let dimsTag = """
         <meta property="og:image:width" content="\(self.width)"/><meta property="og:image:height" content="\(self.height)"/>
         """

         // Insert right after the og:image tag's closing `/>` so the trio reads
         // top-to-bottom: image → width → height. Both quote styles allowed.
         if let range = html.range(of: #"<meta property="og:image"[^>]*/>"#, options: .regularExpression) {
            html.insert(contentsOf: dimsTag, at: range.upperBound)
            try? html.write(to: url, atomically: true, encoding: .utf8)
         }
      }
   }
}
