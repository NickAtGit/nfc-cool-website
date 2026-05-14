import Foundation
import SiteKit

/// Custom tag listing renderer.
///
/// SiteKit's built-in `TagListingRenderer` emits per-tag pages with
/// localized descriptions (via `uiStrings.postsTaggedWith`) but ships the
/// tags-INDEX page with a hardcoded English title (`"Tags — NFC.cool"`)
/// and description (`"All tags"`). Across en/de/ja that produces 3
/// duplicate `<title>` + `<meta description>` pairs that SEO audits flag.
///
/// We delegate per-tag rendering to SiteKit (already correct) and, for the
/// index page, call SiteKit's renderer and then patch the head metadata
/// in-place with locale-specific strings. Patching is cheaper than
/// duplicating the index-card HTML and `tagDisplayName` helper (the
/// latter isn't `public`).
struct TagListingRenderer: Renderer {
   func render(context: BuildContext) throws -> [OutputFile] {
      guard !context.tags.isEmpty else { return [] }

      let renderer = OutputFileRenderer(context: context)
      let locale = context.uiStrings.locale
      var files: [OutputFile] = []

      // Per-tag pages — SiteKit's behavior is already correct (each page
      // has its own localized `postsTaggedWith` description).
      for (tag, tagPages) in context.tags.sorted(by: { $0.key < $1.key }) {
         files.append(renderer.renderTagListing(tag: tag, pages: tagPages, sections: context.sections))
      }

      // Tags index — render via SiteKit then swap the English title +
      // description for locale-specific ones.
      let raw = renderer.renderTagsIndex(tags: context.tags)
      files.append(Self.patchIndex(raw, locale: locale, siteName: context.config.name))

      return files
   }

   // MARK: - Index patching

   private static func patchIndex(_ file: OutputFile, locale: String, siteName: String) -> OutputFile {
      let englishTitle = "<title>Tags — \(siteName)</title>"
      let localizedTitle = "<title>\(Self.localizedTitle(locale: locale, siteName: siteName))</title>"

      let englishDescription = #"<meta name="description" content="All tags"/>"#
      let localizedDescription = #"<meta name="description" content="\#(Self.localizedDescription(locale: locale))"/>"#

      var html = file.content
      html = html.replacingOccurrences(of: englishTitle, with: localizedTitle)
      html = html.replacingOccurrences(of: englishDescription, with: localizedDescription)
      return OutputFile(outputPath: file.outputPath, content: html)
   }

   private static func localizedTitle(locale: String, siteName: String) -> String {
      switch locale {
      case "de": return "Themen — \(siteName)"
      case "ja": return "タグ — \(siteName)"
      default:   return "Tags — \(siteName)"
      }
   }

   private static func localizedDescription(locale: String) -> String {
      switch locale {
      case "de": return "Themen im NFC.cool Blog durchstöbern."
      case "ja": return "NFC.coolブログの記事をトピック別に閲覧。"
      default:   return "Browse posts by topic on the NFC.cool blog."
      }
   }
}
