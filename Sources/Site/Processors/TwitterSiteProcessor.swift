import Foundation
import SiteKit

/// Inject `<meta name="twitter:site" content="@NFC_for_iPhone"/>` into every
/// page's `<head>`. SiteKit's `buildHead` emits twitter:card / twitter:title /
/// twitter:description but not twitter:site, so this processor fills that gap
/// post-build using the same pattern as `GoogleSiteVerificationProcessor`.
struct TwitterSiteProcessor: OutputProcessor {
   private let handle = "@NFC_for_iPhone"

   func process(outputDirectory: URL, projectDirectory: URL, themeConfig: ThemeConfig?) throws {
      let tag = "<meta name=\"twitter:site\" content=\"\(self.handle)\"/>"

      let fileManager = FileManager.default
      guard let enumerator = fileManager.enumerator(at: outputDirectory, includingPropertiesForKeys: nil) else { return }

      for case let url as URL in enumerator where url.pathExtension == "html" {
         guard var html = try? String(contentsOf: url, encoding: .utf8) else { continue }
         guard !html.contains("twitter:site") else { continue }
         guard let headRange = html.range(of: "<head>") else { continue }
         html.insert(contentsOf: tag, at: headRange.upperBound)
         try? html.write(to: url, atomically: true, encoding: .utf8)
      }
   }
}
