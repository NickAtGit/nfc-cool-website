import Foundation
import SiteKit

/// Custom section-listing renderer for /blog/ and /changelog/.
///
/// Replaces SiteKit's `SectionListingRenderer` so each section gets the
/// marketing-style treatment: brand-blue gradient hero + card grid below.
/// Both blog and changelog use this renderer since they share SiteKit's
/// section infrastructure.
struct BlogIndexRenderer: Renderer {
   func render(context: BuildContext) throws -> [OutputFile] {
      var files: [OutputFile] = []
      for section in context.sections {
         guard !section.pages.isEmpty else { continue }
         files.append(self.renderSection(section, context: context))
      }
      return files
   }

   private func renderSection(_ section: ContentSection, context: BuildContext) -> OutputFile {
      let helper = OutputFileRenderer(context: context)
      let locale = context.uiStrings.locale
      let listingPath = context.router.sectionListingPath(for: section.config)
      let rssFeedPath = "\(listingPath)feed.xml"

      let sortedPages = section.pages.sorted { (a, b) -> Bool in
         (a.date ?? Date.distantPast) > (b.date ?? Date.distantPast)
      }

      let title = section.config.name
      let subtitle = Self.localizedSubtitle(forSlug: section.config.slug, locale: locale)

      let head = helper.buildHead(
         title: "\(title) — \(context.config.name)",
         description: section.config.description ?? context.config.description,
         canonicalURL: "\(context.config.baseURL)\(listingPath)",
         ogType: "website",
         rssFeedURL: rssFeedPath,
         rssFeedTitle: "\(title) — \(context.config.name)",
         hreflang: helper.buildHreflangForAllLanguages { $0.sectionListingPath(for: section.config) }
      )

      let dateFormatter = Self.dateFormatter(for: locale)

      let cards: [String] = sortedPages.map { page in
         let href = context.router.pagePath(for: page, in: section.config)
         let dateText = page.date.map { dateFormatter.string(from: $0) } ?? ""
         let summary = (page.summary ?? "").htmlEscaped
         let tags = page.tags.prefix(3).map { tag in
            "<span class=\"blog-card-tag\">\(tag.htmlEscaped)</span>"
         }.joined()
         let imageHTML: String = {
            if let img = page.image {
               let alt = (page.imageAlt ?? page.title).htmlEscaped
               return "<div class=\"blog-card-image\"><img src=\"\(img)\" alt=\"\(alt)\" loading=\"lazy\"/></div>"
            }
            // No hero image — show a brand-gradient placeholder with the wordmark
            // so the card grid stays visually balanced.
            return """
            <div class="blog-card-image is-placeholder" aria-hidden="true">
               <img src="/assets/theme/images/NFC_SecondaryLogo_White.webp" alt=""/>
            </div>
            """
         }()
         return """
         <a class="blog-card" href="\(href)">
            \(imageHTML)
            <div class="blog-card-body">
               <p class="blog-card-meta">\(dateText.htmlEscaped)\(page.category.isEmpty ? "" : " · \(page.category.htmlEscaped)")</p>
               <h3 class="blog-card-title">\(page.title.htmlEscaped)</h3>
               \(summary.isEmpty ? "" : "<p class=\"blog-card-summary\">\(summary)</p>")
               \(tags.isEmpty ? "" : "<div class=\"blog-card-tags\">\(tags)</div>")
            </div>
         </a>
         """
      }

      let heroVisualAlt = title.htmlEscaped
      let body = """
      <main class="sk-main blog-index">
         <section class="page-hero blog-index-hero">
            <div class="page-hero-grid">
               <div class="page-hero-text">
                  <h1 class="blog-index-title">\(title.htmlEscaped)</h1>
                  <p class="blog-index-subtitle">\(subtitle.htmlEscaped)</p>
                  <a class="landing-cta-button" href="\(rssFeedPath)" aria-label="RSS Feed">RSS Feed</a>
               </div>
               <div class="page-hero-visual is-brand">
                  <img src="/assets/theme/images/NFC_SecondaryLogo_White.webp" alt="\(heroVisualAlt)" loading="eager" fetchpriority="high"/>
               </div>
            </div>
         </section>
         <section class="blog-index-grid-section">
            <div class="landing-container">
               <div class="blog-card-grid">\(cards.joined())</div>
            </div>
         </section>
      </main>
      """

      let html = helper.renderPageShell(
         head: head,
         bodyClass: "sk-page-\(section.config.slug) blog-listing",
         content: body
      )

      let relPath = String(listingPath.dropFirst())
      let outputPath = context.outputDirectory
         .appendingPathComponent(relPath)
         .appendingPathComponent("index.html")

      return OutputFile(outputPath: outputPath, content: html)
   }

   // MARK: - Localization

   private static func localizedSubtitle(forSlug slug: String, locale: String) -> String {
      switch (slug, locale) {
      case ("blog", "de"): return "Anleitungen, Vergleiche und How-tos zu NFC-Tags, QR-Codes, Barcodes und digitalen Visitenkarten auf iPhone und Android. Geschrieben vom Entwickler hinter NFC.cool."
      case ("blog", "ja"): return "NFCタグ、QRコード、バーコード、iPhoneとAndroidのデジタル名刺に関するガイド、比較、ハウツー。NFC.coolの開発者が直接執筆しています。"
      case ("blog", _):    return "Guides, comparisons, and how-tos on NFC tags, QR codes, barcodes, and digital business cards on iPhone and Android. Written by the developer behind NFC.cool."
      case ("changelog", "de"): return "Release-Notes für NFC.cool Tools, Business Card und die Website."
      case ("changelog", "ja"): return "NFC.cool Tools、Business Card、ウェブサイトのリリースノート。"
      case ("changelog", _):    return "Release notes for NFC.cool Tools, Business Card, and the website."
      default: return ""
      }
   }

   private static func dateFormatter(for locale: String) -> DateFormatter {
      let df = DateFormatter()
      df.dateStyle = .long
      df.timeStyle = .none
      df.locale = Locale(identifier: locale)
      return df
   }
}
