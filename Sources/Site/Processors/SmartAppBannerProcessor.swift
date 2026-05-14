import Foundation
import SiteKit

/// Inject Apple Smart App Banner meta into every emitted HTML page. iOS Safari
/// (and some third-party iOS browsers) read this tag and render a thin banner
/// at the top of the page prompting installation of the matching app. Tapping
/// the banner opens the app if installed, or the App Store page otherwise.
///
/// Per-page targeting:
/// - `/business-card/` (any locale) advertises the standalone Business Card
///   iOS app (App Store id `6502926572`).
/// - Every other page advertises the cross-platform NFC.cool Tools iOS app
///   (App Store id `1249686798`).
///
/// We do not emit a `google-play-app` tag - it is honored by very few Android
/// browsers and the in-body app badges already cover Android promotion.
struct SmartAppBannerProcessor: OutputProcessor {
   private let toolsAppID = "1249686798"
   private let businessCardAppID = "6502926572"

   func process(outputDirectory: URL, projectDirectory: URL, themeConfig: ThemeConfig?) throws {
      let fileManager = FileManager.default
      guard let enumerator = fileManager.enumerator(at: outputDirectory, includingPropertiesForKeys: nil) else { return }

      for case let url as URL in enumerator where url.pathExtension == "html" {
         let relativePath = url.path.replacingOccurrences(of: outputDirectory.path, with: "")
         let appID = self.isBusinessCardPage(relativePath: relativePath) ? self.businessCardAppID : self.toolsAppID
         let tag = "<meta name=\"apple-itunes-app\" content=\"app-id=\(appID)\"/>"

         guard var html = try? String(contentsOf: url, encoding: .utf8) else { continue }
         guard !html.contains("apple-itunes-app") else { continue }
         guard let headRange = html.range(of: "<head>") else { continue }
         html.insert(contentsOf: tag, at: headRange.upperBound)
         try? html.write(to: url, atomically: true, encoding: .utf8)
      }
   }

   /// Matches `/business-card/index.html`, `/de/business-card/index.html`,
   /// `/ja/business-card/index.html`. Anything containing `business-card/` in
   /// the trailing path segment, regardless of locale prefix.
   private func isBusinessCardPage(relativePath: String) -> Bool {
      return relativePath.contains("/business-card/")
   }
}
