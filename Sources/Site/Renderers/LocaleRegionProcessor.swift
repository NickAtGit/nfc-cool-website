import Foundation
import SiteKit

/// Rewrite the `<html lang>` attribute and `<meta property="og:locale">` value
/// to use full IETF language-region codes (`en-US`, `de-DE`, `ja-JP`) instead
/// of the bare language codes SiteKit emits.
///
/// Why post-process instead of changing the locale string at the config layer:
/// SiteKit's locale (`uiStrings.locale`) doubles as the URL prefix for
/// non-default languages — switching it to `"en-US"` would generate
/// `/en-US/...` paths, `hreflang="en-US"` (technically fine) AND break every
/// existing internal link plus the directory layout under `_Site/`. Patching
/// only the two `<head>`-level strings keeps routing/hreflang stable while
/// satisfying SEO auditors that want a country declaration.
///
/// We deliberately do NOT update `hreflang` values — Google's docs accept
/// bare language codes (`hreflang="en"`), and rewriting hreflang here would
/// require coordinated changes elsewhere in the build that aren't worth the
/// churn.
struct LocaleRegionProcessor: OutputProcessor {
   /// Bare language → language-region table. Keys must match the locales
   /// SiteKit emits in `<html lang>` and `og:locale`.
   private let regions: [(lang: String, htmlRegion: String, ogRegion: String)] = [
      ("en", "en-US", "en_US"),
      ("de", "de-DE", "de_DE"),
      ("ja", "ja-JP", "ja_JP"),
   ]

   func process(outputDirectory: URL, projectDirectory: URL, themeConfig: ThemeConfig?) throws {
      let fileManager = FileManager.default
      guard let enumerator = fileManager.enumerator(at: outputDirectory, includingPropertiesForKeys: nil) else { return }

      for case let url as URL in enumerator where url.pathExtension == "html" {
         guard var html = try? String(contentsOf: url, encoding: .utf8) else { continue }
         var changed = false

         for entry in self.regions {
            let langSource = "<html lang=\"\(entry.lang)\">"
            let langTarget = "<html lang=\"\(entry.htmlRegion)\">"
            if html.contains(langSource) {
               html = html.replacingOccurrences(of: langSource, with: langTarget)
               changed = true
            }

            let ogSource = "<meta property=\"og:locale\" content=\"\(entry.lang)\"/>"
            let ogTarget = "<meta property=\"og:locale\" content=\"\(entry.ogRegion)\"/>"
            if html.contains(ogSource) {
               html = html.replacingOccurrences(of: ogSource, with: ogTarget)
               changed = true
            }
         }

         if changed {
            try? html.write(to: url, atomically: true, encoding: .utf8)
         }
      }
   }
}
