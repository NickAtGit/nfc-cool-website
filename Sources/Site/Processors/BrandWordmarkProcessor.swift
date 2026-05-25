import Foundation
import SiteKit

/// Wraps the literal "NFC.cool" inside `<h1>` / `<h2>` headings with the brand
/// wordmark markup so the script ".cool" tail renders the same on every page:
///
///   NFC.cool  ->  <span class="brand-name">NFC<em class="brand-tail">.cool</em></span>
///
/// Renderer-built headings already get this at render time via
/// `renderTitleWithBrandTail`. This processor covers headings authored in
/// Markdown - the static marketing pages and blog post bodies - which the Swift
/// helper never sees. Already-branded headings hold "NFC" and ".cool" in
/// separate elements, so the contiguous literal "NFC.cool" never matches them
/// and they are left untouched (no double-wrapping).
///
/// `.brand-name` / `.brand-tail` are styled globally in `theme.css`, so the
/// wrapped wordmark needs no per-page CSS.
struct BrandWordmarkProcessor: OutputProcessor {
   private static let wordmark = "<span class=\"brand-name\">NFC<em class=\"brand-tail\">.cool</em></span>"

   func process(outputDirectory: URL, projectDirectory: URL, themeConfig: ThemeConfig?) throws {
      let fileManager = FileManager.default
      guard let enumerator = fileManager.enumerator(at: outputDirectory, includingPropertiesForKeys: nil) else { return }

      for case let url as URL in enumerator where url.pathExtension == "html" {
         guard let original = try? String(contentsOf: url, encoding: .utf8) else { continue }
         let processed = self.brandHeadings(in: original)
         guard processed != original else { continue }
         try? processed.write(to: url, atomically: true, encoding: .utf8)
      }
   }

   /// Rewrites the inner content of every `<h1>` / `<h2>`, branding "NFC.cool".
   private func brandHeadings(in html: String) -> String {
      let pattern = #"(<h[12](?:\s[^>]*)?>)(.*?)(</h[12]>)"#
      guard let regex = try? NSRegularExpression(pattern: pattern, options: [.caseInsensitive, .dotMatchesLineSeparators]) else {
         return html
      }
      let matches = regex.matches(in: html, range: NSRange(html.startIndex..., in: html))
      guard !matches.isEmpty else { return html }

      var result = ""
      var lastEnd = html.startIndex
      for match in matches {
         guard let fullRange = Range(match.range, in: html) else { continue }
         result += html[lastEnd..<fullRange.lowerBound]
         let openTag = self.group(match, 1, in: html)
         let inner = self.group(match, 2, in: html)
         let closeTag = self.group(match, 3, in: html)
         result += openTag + self.brandText(in: inner) + closeTag
         lastEnd = fullRange.upperBound
      }
      result += html[lastEnd...]
      return result
   }

   /// Replaces "NFC.cool" with the wordmark in the text spans of `inner`,
   /// skipping any inside an HTML tag (e.g. an `id`/`href` attribute) so only
   /// visible heading text is rewritten.
   private func brandText(in inner: String) -> String {
      guard inner.contains("NFC.cool") else { return inner }
      guard let tagRegex = try? NSRegularExpression(pattern: #"<[^>]*>"#) else { return inner }
      let tags = tagRegex.matches(in: inner, range: NSRange(inner.startIndex..., in: inner))

      var result = ""
      var lastEnd = inner.startIndex
      for tag in tags {
         guard let range = Range(tag.range, in: inner) else { continue }
         result += inner[lastEnd..<range.lowerBound].replacingOccurrences(of: "NFC.cool", with: Self.wordmark)
         result += inner[range]
         lastEnd = range.upperBound
      }
      result += inner[lastEnd...].replacingOccurrences(of: "NFC.cool", with: Self.wordmark)
      // Weld "Tools" to the wordmark so "NFC.cool Tools" never breaks across a
      // line in any language; longer descriptors stay free to wrap. Mirrors the
      // same exception in `renderTitleWithBrandTail` for renderer-built titles.
      return result.replacingOccurrences(of: Self.wordmark + " Tools", with: Self.wordmark + "&#160;Tools")
   }

   private func group(_ match: NSTextCheckingResult, _ index: Int, in string: String) -> String {
      let nsRange = match.range(at: index)
      guard nsRange.location != NSNotFound, let range = Range(nsRange, in: string) else { return "" }
      return String(string[range])
   }
}
