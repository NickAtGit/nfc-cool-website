import Foundation
import SiteKit

/// Obfuscates `mailto:` links in the final HTML so address-harvesting bots can't
/// scrape the contact address out of the published static pages.
///
/// Harvesters fetch raw HTML and regex-match `mailto:` hrefs; they don't execute
/// JavaScript. So every `mailto:` href is Base64-encoded into a `data-eml`
/// attribute at build time and the real `href` is dropped. The decoder in
/// `theme.js` restores it in the browser. Bots see only an opaque blob; visitors
/// with JS get a working link; visitors without JS see the link's generic label
/// (e.g. "Email us") but the link is inert.
///
/// All visible link text on this site is already generic - the contact address
/// is never spelled out in content - so this processor only needs to hide the
/// `href`. It does NOT touch link text or page copy.
///
/// Runs as a late `OutputProcessor` (registered before `AssetMinifier` in
/// `Main.swift`). It relies on SiteKit emitting double-quoted attributes and
/// non-nested anchors, which holds for all content this site generates.
struct EmailObfuscationProcessor: OutputProcessor {
   func process(outputDirectory: URL, projectDirectory: URL, themeConfig: ThemeConfig?) throws {
      let fileManager = FileManager.default
      guard let enumerator = fileManager.enumerator(at: outputDirectory, includingPropertiesForKeys: nil) else { return }

      for case let url as URL in enumerator where url.pathExtension == "html" {
         guard let original = try? String(contentsOf: url, encoding: .utf8) else { continue }
         let processed = self.obfuscateMailtoAnchors(in: original)
         guard processed != original else { continue }
         try? processed.write(to: url, atomically: true, encoding: .utf8)
      }
   }

   /// Replaces the `href` of every `<a href="mailto:…">` with an encoded
   /// `data-eml` attribute, preserving all other attributes and the link text.
   private func obfuscateMailtoAnchors(in html: String) -> String {
      let pattern = #"<a([^>]*?)href="(mailto:[^"]*)"([^>]*)>"#
      guard let regex = try? NSRegularExpression(pattern: pattern, options: [.caseInsensitive]) else {
         return html
      }
      let matches = regex.matches(in: html, range: NSRange(html.startIndex..., in: html))
      guard !matches.isEmpty else { return html }

      var result = ""
      var lastEnd = html.startIndex
      for match in matches {
         guard let fullRange = Range(match.range, in: html) else { continue }
         result += html[lastEnd..<fullRange.lowerBound]
         let attrsBefore = self.group(match, 1, in: html)
         let mailto = self.group(match, 2, in: html)
         let attrsAfter = self.group(match, 3, in: html)
         let encoded = Data(mailto.utf8).base64EncodedString()
         result += "<a\(attrsBefore)\(attrsAfter) data-eml=\"\(encoded)\">"
         lastEnd = fullRange.upperBound
      }
      result += html[lastEnd...]
      return result
   }

   private func group(_ match: NSTextCheckingResult, _ index: Int, in string: String) -> String {
      let nsRange = match.range(at: index)
      guard nsRange.location != NSNotFound, let range = Range(nsRange, in: string) else { return "" }
      return String(string[range])
   }
}
