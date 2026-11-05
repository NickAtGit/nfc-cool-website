import Foundation
import SiteKit

/// Keeps same-site links on translated pages in the reader's language: on a French page
/// `/business-card/` becomes `/fr/business-card/`, and `https://nfc.cool/business-card/` becomes
/// `https://nfc.cool/fr/business-card/`.
///
/// SiteKit prefixes the navigation and footer by itself, but a link written into a post, a page or a
/// feature YAML renders exactly as written. So a future post with a bare link would otherwise send a
/// French reader to the English page. This is the safety net behind the links in `Content/`, and the
/// only thing that localizes `relatedReading` URLs in the feature YAMLs, which stay bare on purpose:
/// `FeaturePageRenderer` picks each card's kicker from the path starting with `/blog/` or `/features/`.
///
/// A link is rewritten only when that language really has the page, meaning an `index.html` that is
/// not a meta-refresh bridge. Left as they are:
/// - English pages and the bridge pages themselves.
/// - Links with no translated page behind them: `/holdem/`, changelog entries, assets, feeds, and
///   `/privacy/`, whose `/fr/privacy/` only bounces back to English.
/// - Links already under a language prefix, and `?noredirect` links, which mean English on purpose.
/// - Everything that is not an `<a>` in the HTML: `<link>` tags (canonical, hreflang), and whatever
///   `<script>`, `<style>`, `<textarea>` or a comment happens to quote.
struct LocalizedLinksProcessor: OutputProcessor {
   func process(outputDirectory: URL, projectDirectory: URL, themeConfig: ThemeConfig?) throws {
      let config = try SiteConfig.load(from: projectDirectory)
      guard let localization = config.localization else { return }
      let prefixes = Set(localization.languages + [localization.defaultLanguage])
      let site = NSRegularExpression.escapedPattern(for: config.baseURL)
      // The first two alternatives swallow script, style, textarea and comment bodies whole, so
      // only the third can capture an href (group 3).
      let regex = try NSRegularExpression(
         pattern: #"<(script|style|textarea)\b.*?</\1\s*>|<!--.*?-->|<a\s(?:[^>]*?\s)?href\s*=\s*(["'])((?:"# + site + #")?/[^"']*)\2[^>]*>"#,
         options: [.caseInsensitive, .dotMatchesLineSeparators]
      )

      for language in localization.languages where language != localization.defaultLanguage {
         let root = outputDirectory.appendingPathComponent(language)
         var pages: [(url: URL, html: String)] = []
         var emitted: Set<String> = []

         for path in FileManager.default.subpaths(atPath: root.path) ?? [] where path.hasSuffix(".html") {
            let url = root.appendingPathComponent(path)
            guard let html = try? String(contentsOf: url, encoding: .utf8) else { continue }
            guard !html.contains(#"http-equiv="refresh""#) else { continue }
            pages.append((url, html))
            if path == "index.html" {
               emitted.insert("/")
            } else if path.hasSuffix("/index.html") {
               emitted.insert("/" + path.dropLast("index.html".count))
            }
         }

         for page in pages {
            var rewritten = ""
            var cursor = page.html.startIndex
            for match in regex.matches(in: page.html, range: NSRange(page.html.startIndex..., in: page.html)) {
               guard let href = Range(match.range(at: 3), in: page.html),
                     let localized = self.localized(String(page.html[href]), language: language, emitted: emitted, prefixes: prefixes, baseURL: config.baseURL)
               else { continue }
               rewritten += page.html[cursor..<href.lowerBound]
               rewritten += localized
               cursor = href.upperBound
            }
            guard cursor != page.html.startIndex else { continue }
            rewritten += page.html[cursor...]
            try? rewritten.write(to: page.url, atomically: true, encoding: .utf8)
         }
      }
   }

   /// The `href` under `/<language>/`, or nil when it stays as it is.
   private func localized(_ href: String, language: String, emitted: Set<String>, prefixes: Set<String>, baseURL: String) -> String? {
      let origin = href.hasPrefix(baseURL) ? baseURL : ""
      let target = href.dropFirst(origin.count)
      guard !target.hasPrefix("//") else { return nil }
      let pathEnd = target.firstIndex { $0 == "?" || $0 == "#" } ?? target.endIndex
      let path = target[..<pathEnd]
      guard !prefixes.contains(String(path.dropFirst().prefix { $0 != "/" })),
            !target[pathEnd...].contains("noredirect"),
            emitted.contains(path.hasSuffix("/") ? String(path) : path + "/")
      else { return nil }
      return origin + "/" + language + target
   }
}
