import Foundation
import SiteKit

/// Turns a blog post's phone figure into its final markup and loads its player.
///
/// A post writes the figure as raw HTML, one block with no blank lines (so the markdown parser
/// keeps it whole), copied into every locale with the captions and alt texts translated:
///
/// ```html
/// <figure class="phone-figure" data-layout="stage">
/// <figcaption>Writing a stack of tags</figcaption>
/// <ol>
/// <li><img src="/assets/images/Blog/screens/<post>/1-import-440w.webp" alt="…"><p><strong>Import the CSV.</strong> …</p></li>
/// <li>…</li>
/// </ol>
/// </figure>
/// ```
///
/// Shots are 440 px wide WebP named `-440w`, which ImageResizer leaves alone: its variants fit a
/// square, so a portrait screenshot's 200w variant would come out 92 px wide.
///
/// `data-layout` is `stage` (a wide box: the phone beside a list of steps, for a procedure) or
/// `float` (a small phone the text wraps around, for a screen or two); `data-side="start"` /
/// `"end"` puts the phone at the other side. Below 768 px both are the same: the phone in the
/// column, dots and the current step's text under it. See Theme/css/phone-figure.css.
///
/// It stacks
/// them in a device box behind the phone still (`/scenes/blog_phone_shell.webp`, the phone with its
/// screen cut out), turns each step's text into a button and adds the dots, so the figure is laid
/// out before any script runs and nothing shifts when it does. `/scenes/phone-figures.mjs` then
/// wires the buttons, dots, keys and swipes, and swaps in the live 3D phone where it can.
struct PhoneFigureProcessor: OutputProcessor {
   static let shell = "/scenes/blog_phone_shell.webp"
   private let script = "<script type=\"module\" src=\"/scenes/phone-figures.mjs\"></script>"

   func process(outputDirectory: URL, projectDirectory: URL, themeConfig: ThemeConfig?) throws {
      let fileManager = FileManager.default
      guard let enumerator = fileManager.enumerator(at: outputDirectory, includingPropertiesForKeys: nil) else { return }

      for case let url as URL in enumerator where url.pathExtension == "html" {
         guard let html = try? String(contentsOf: url, encoding: .utf8), html.contains("<figure class=\"phone-figure\"") else { continue }
         // Arabic pages count in Eastern Arabic digits, like their prose.
         let relative = url.path.dropFirst(outputDirectory.path.count)
         var expanded = Self.expand(html, easternDigits: relative.hasPrefix("/ar/"))
         if !expanded.contains("phone-figures.mjs"), let bodyEnd = expanded.range(of: "</body>", options: .backwards) {
            expanded.insert(contentsOf: self.script, at: bodyEnd.lowerBound)
         }
         try? expanded.write(to: url, atomically: true, encoding: .utf8)
      }
   }

   // MARK: - Expansion

   private static let figurePattern = regex(#"<figure class="phone-figure"([^>]*)>(.*?)</figure>"#)
   private static let captionPattern = regex(#"<figcaption>(.*?)</figcaption>"#)
   private static let itemPattern = regex(#"<li>(.*?)</li>"#)
   private static let imagePattern = regex(#"<img\b[^>]*>"#)
   private static let strongPattern = regex(#"<strong>(.*?)</strong>"#)
   private static let tagPattern = regex(#"<[^>]+>"#)

   static func expand(_ html: String, easternDigits: Bool = false) -> String {
      var result = ""
      var cursor = html.startIndex
      let range = NSRange(html.startIndex..., in: html)
      for match in figurePattern.matches(in: html, range: range) {
         guard let whole = Range(match.range, in: html),
               let attributes = Range(match.range(at: 1), in: html),
               let body = Range(match.range(at: 2), in: html)
         else { continue }
         result += html[cursor..<whole.lowerBound]
         result += figure(attributes: String(html[attributes]), body: String(html[body]), easternDigits: easternDigits) ?? String(html[whole])
         cursor = whole.upperBound
      }
      result += html[cursor...]
      return result
   }

   /// The figure's final markup, or nil when it has no shots (it is then left as written).
   static func figure(attributes: String, body: String, easternDigits: Bool = false) -> String? {
      let items = matches(itemPattern, in: body).compactMap { item -> (image: String, text: String, label: String)? in
         guard let image = matches(imagePattern, in: item, group: 0).first else { return nil }
         let text = item.replacingOccurrences(of: image, with: "")
            .replacingOccurrences(of: "<p>", with: "")
            .replacingOccurrences(of: "</p>", with: " ")
            .trimmingCharacters(in: .whitespacesAndNewlines)
         let title = matches(strongPattern, in: text).first.map(plainText) ?? attribute("alt", in: image) ?? ""
         let label = title.trimmingCharacters(in: CharacterSet(charactersIn: ".:!?。：！？ ").union(.whitespaces))
         return (image, text, label)
      }
      guard !items.isEmpty else { return nil }
      let stepping = items.count > 1

      var shots = ""
      var steps = ""
      var dots = ""
      for (index, item) in items.enumerated() {
         let active = index == 0
         shots += shot(item.image, active: active)
         let number = "<span class=\"phone-figure-step-num\">\(digits(index + 1, eastern: easternDigits))</span>"
         let text = "<span class=\"phone-figure-step-text\">\(item.text)</span>"
         steps += stepping
            ? "<li\(active ? " class=\"is-active\"" : "")><button type=\"button\" class=\"phone-figure-step\" aria-pressed=\"\(active)\">\(number)\(text)</button></li>"
            : "<li class=\"is-active\"><span class=\"phone-figure-step\">\(text)</span></li>"
         dots += "<button type=\"button\" aria-pressed=\"\(active)\" aria-label=\"\(escape(item.label))\"></button>"
      }

      var markup = "<figure class=\"phone-figure\"\(attributes)>"
      if let caption = matches(captionPattern, in: body).first {
         markup += "<figcaption class=\"phone-figure-title\">\(caption)</figcaption>"
      }
      markup += "<div class=\"phone-figure-device\"><div class=\"phone-figure-screens\">\(shots)</div>"
      markup += "<img class=\"phone-figure-shell\" src=\"\(shell)\" alt=\"\" width=\"600\" height=\"960\" decoding=\"async\"></div>"
      markup += "<ol class=\"phone-figure-steps\">\(steps)</ol>"
      if stepping { markup += "<div class=\"phone-figure-dots\">\(dots)</div>" }
      markup += "</figure>"
      return markup
   }

   /// A shot as the device box stacks it: classed, and lazy (a figure is never the first thing
   /// on a post, and the stacked shots all load once it comes near, so a cross-fade never waits).
   private static func shot(_ image: String, active: Bool) -> String {
      let classes = "phone-figure-shot" + (active ? " is-active" : "")
      var tag = image
      if let existing = attribute("class", in: tag) {
         tag = tag.replacingOccurrences(of: "class=\"\(existing)\"", with: "class=\"\(existing) \(classes)\"")
      } else {
         tag = tag.replacingOccurrences(of: "<img ", with: "<img class=\"\(classes)\" ")
      }
      if attribute("loading", in: tag) == nil { tag = tag.replacingOccurrences(of: "<img ", with: "<img loading=\"lazy\" ") }
      if attribute("decoding", in: tag) == nil { tag = tag.replacingOccurrences(of: "<img ", with: "<img decoding=\"async\" ") }
      return tag
   }

   // MARK: - Helpers

   private static func regex(_ pattern: String) -> NSRegularExpression {
      try! NSRegularExpression(pattern: pattern, options: [.dotMatchesLineSeparators])
   }

   private static func matches(_ pattern: NSRegularExpression, in text: String, group: Int = 1) -> [String] {
      pattern.matches(in: text, range: NSRange(text.startIndex..., in: text)).compactMap {
         Range($0.range(at: group), in: text).map { String(text[$0]) }
      }
   }

   private static func attribute(_ name: String, in tag: String) -> String? {
      let pattern = regex(#"\s\#(name)="([^"]*)""#)
      return matches(pattern, in: tag).first
   }

   private static func digits(_ number: Int, eastern: Bool) -> String {
      guard eastern else { return String(number) }
      return String(String(number).map { Character(UnicodeScalar(0x0660 + Int($0.wholeNumberValue!))!) })
   }

   private static func plainText(_ html: String) -> String {
      let stripped = tagPattern.stringByReplacingMatches(in: html, range: NSRange(html.startIndex..., in: html), withTemplate: "")
      return stripped
         .replacingOccurrences(of: "&amp;", with: "&")
         .replacingOccurrences(of: "&quot;", with: "\"")
         .replacingOccurrences(of: "&#39;", with: "'")
         .replacingOccurrences(of: "&lt;", with: "<")
         .replacingOccurrences(of: "&gt;", with: ">")
   }

   private static func escape(_ text: String) -> String {
      text.replacingOccurrences(of: "&", with: "&amp;")
         .replacingOccurrences(of: "\"", with: "&quot;")
         .replacingOccurrences(of: "<", with: "&lt;")
   }
}
