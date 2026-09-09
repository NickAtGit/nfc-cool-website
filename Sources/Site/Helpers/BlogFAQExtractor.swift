import Foundation

/// Derives the FAQPage JSON-LD input for a blog post from its rendered body.
///
/// Blog posts are markdown, so there is no hand-maintained FAQ list the way
/// `MarketingPageRenderer` keeps one for `/online-nfc-reader/`. Instead a FAQ
/// section is recognised by shape: an `## H2` whose `### H3` headings are all
/// questions. "Question" means the heading ends with `?`, or with the
/// full-width `？` (ja, zh) or the Arabic `؟`, so every locale's sibling
/// qualifies on its own text. Each H3 becomes a `Question` and the plain text
/// between it and the next heading becomes its `Answer`.
///
/// A section needs at least two H3s and every one of them must be a question;
/// a lone "Why?" subheading inside an ordinary section never produces a
/// one-item FAQPage. Several qualifying sections in one post are merged.
enum BlogFAQExtractor {
   static func faq(fromHTML html: String) -> [FAQItem]? {
      var items: [FAQItem] = []
      let h3 = /<h3[^>]*>(.*?)<\/h3>/.dotMatchesNewlines()
      for section in html.components(separatedBy: "<h2") {
         let headings = section.matches(of: h3)
         guard headings.count >= 2 else { continue }
         var sectionItems: [FAQItem] = []
         for (index, heading) in headings.enumerated() {
            let question = self.plainText(String(heading.output.1))
            guard let last = question.last, "?？؟".contains(last) else {
               sectionItems.removeAll()
               break
            }
            let answerEnd = index + 1 < headings.count ? headings[index + 1].range.lowerBound : section.endIndex
            let answer = self.plainText(String(section[heading.range.upperBound..<answerEnd]))
            guard !answer.isEmpty else {
               sectionItems.removeAll()
               break
            }
            sectionItems.append(FAQItem(question: question, answer: answer))
         }
         items.append(contentsOf: sectionItems)
      }
      return items.isEmpty ? nil : items
   }

   /// Strips tags, decodes the entities cmark emits, and collapses whitespace.
   /// `&amp;` is decoded last so an escaped `&amp;lt;` does not turn into `<`.
   private static func plainText(_ html: String) -> String {
      var text = html.replacing(/<[^>]+>/, with: " ")
      for (entity, character) in [("&lt;", "<"), ("&gt;", ">"), ("&quot;", "\""), ("&#39;", "'"), ("&#x27;", "'"), ("&nbsp;", " "), ("&amp;", "&")] {
         text = text.replacing(entity, with: character)
      }
      return text.replacing(/\s+/, with: " ").trimmingCharacters(in: .whitespacesAndNewlines)
   }
}
