import Foundation
import SiteKit

/// Inject the Google Search Console verification meta into every page's
/// `<head>`. Preserves the existing Search Console property on DNS cutover
/// from the legacy Webflow site (token is already attached server-side).
///
/// The token is intentionally a hardcoded constant - it's a public string
/// meant to live in HTML, and there's no SiteConfig.yaml hook for custom
/// meta tags in current SiteKit.
struct GoogleSiteVerificationProcessor: OutputProcessor {
   private let token = "8Deh-qJD2ZKg_mAjM5-dMRDWS15XcUiIc6w4h9fL9-U"

   func process(outputDirectory: URL, projectDirectory: URL, themeConfig: ThemeConfig?) throws {
      let tag = "<meta name=\"google-site-verification\" content=\"\(self.token)\"/>"

      let fileManager = FileManager.default
      guard let enumerator = fileManager.enumerator(at: outputDirectory, includingPropertiesForKeys: nil) else { return }

      for case let url as URL in enumerator where url.pathExtension == "html" {
         guard var html = try? String(contentsOf: url, encoding: .utf8) else { continue }
         guard !html.contains("google-site-verification") else { continue }
         guard let headRange = html.range(of: "<head>") else { continue }
         html.insert(contentsOf: tag, at: headRange.upperBound)
         try? html.write(to: url, atomically: true, encoding: .utf8)
      }
   }
}
