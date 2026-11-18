import Foundation
import SiteKit

/// Loads `/prices/prices.mjs` on every page with a region-aware price (a `data-price` span written
/// by `PriceToken`), so the visitor sees their own currency and tier. Pages without one never load it.
struct RegionPriceScriptProcessor: OutputProcessor {
   private let tag = "<script type=\"module\" src=\"/prices/prices.mjs\"></script>"

   func process(outputDirectory: URL, projectDirectory: URL, themeConfig: ThemeConfig?) throws {
      guard let enumerator = FileManager.default.enumerator(at: outputDirectory, includingPropertiesForKeys: nil) else { return }
      for case let url as URL in enumerator where url.pathExtension == "html" {
         guard var html = try? String(contentsOf: url, encoding: .utf8) else { continue }
         guard html.contains(" data-price=\""), !html.contains("/prices/prices.mjs") else { continue }
         guard let bodyEnd = html.range(of: "</body>", options: .backwards) else { continue }
         html.insert(contentsOf: self.tag, at: bodyEnd.lowerBound)
         try? html.write(to: url, atomically: true, encoding: .utf8)
      }
   }
}
