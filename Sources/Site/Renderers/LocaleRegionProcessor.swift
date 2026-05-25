import Foundation
import SiteKit

/// Rewrite per-locale `<head>` and nav strings on every emitted HTML page:
///
/// - `<html lang="en">` → `<html lang="en-US">` (and de-DE, ja-JP)
/// - `<meta property="og:locale" content="en"/>` → `…content="en_US"/>` (etc.)
/// - `<span class="sk-lang-current">EN</span>` → `<span class="sk-lang-current">🇺🇸</span>`
///   (and 🇩🇪, 🇯🇵 for de / ja) — eliminates the brief text-then-flag flash
///   that would otherwise happen when `theme.js` hydrates the picker label.
///
/// Why post-process instead of changing the locale string at the config layer:
/// SiteKit's locale (`uiStrings.locale`) doubles as the URL prefix for
/// non-default languages — switching it to `"en-US"` would generate
/// `/en-US/...` paths, break every internal link, and rewrite the directory
/// layout under `_Site/`. Patching only the rendered strings keeps routing
/// and hreflang stable.
///
/// We deliberately do NOT update `hreflang` values — Google's docs accept
/// bare language codes (`hreflang="en"`), and rewriting hreflang here would
/// require coordinated changes elsewhere in the build.
struct LocaleRegionProcessor: OutputProcessor {
   /// Bare language → (html lang-region, og locale, lang-picker flag emoji).
   /// Keys must match the locales SiteKit emits in `<html lang>` and `og:locale`.
   private let regions: [(lang: String, htmlRegion: String, ogRegion: String, flag: String)] = [
      ("en", "en-US", "en_US", "🇺🇸"),
      ("de", "de-DE", "de_DE", "🇩🇪"),
      ("ja", "ja-JP", "ja_JP", "🇯🇵"),
      ("pt", "pt-PT", "pt_PT", "🇵🇹"),
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

            // Replace the lang-picker button's text label (uppercased locale
            // code emitted by SiteKit) with the flag emoji. `theme.js`'s
            // hydration also sets this, but doing it here prevents a brief
            // "EN/DE/JA" flash before `defer`-loaded JS runs.
            let pickerSource = "<span class=\"sk-lang-current\">\(entry.lang.uppercased())</span>"
            let pickerTarget = "<span class=\"sk-lang-current\">\(entry.flag)</span>"
            if html.contains(pickerSource) {
               html = html.replacingOccurrences(of: pickerSource, with: pickerTarget)
               changed = true
            }
         }

         if changed {
            try? html.write(to: url, atomically: true, encoding: .utf8)
         }
      }
   }
}
