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
         title: "\(title) - \(context.config.name)",
         description: subtitle,
         canonicalURL: "\(context.config.baseURL)\(listingPath)",
         ogType: "website",
         rssFeedURL: rssFeedPath,
         rssFeedTitle: "\(title) - \(context.config.name)",
         hreflang: helper.buildHreflangForAllLanguages { $0.sectionListingPath(for: section.config) }
      )

      let dateFormatter = Self.dateFormatter(for: locale)
      let defaultLang = context.config.effectiveDefaultLanguage

      let cards: [String] = sortedPages.map { page in
         // If this card represents a fallback page (e.g. an EN-only changelog
         // post showing in /de/changelog/), point the link at the EN canonical
         // URL — BlogPostRenderer skips emitting the localized URL, so the
         // /de/... path would 404 otherwise.
         let isFallback: Bool = {
            guard page.locale != defaultLang else { return false }
            return !page.sourcePath.lastPathComponent.contains(".\(page.locale).")
         }()
         let href: String = {
            if isFallback {
               // Build the EN canonical path: section listing minus the locale
               // prefix, then the page slug.
               let sectionPath = context.router.sectionListingPath(for: section.config)
               let prefix = "/\(page.locale)/"
               let enSectionPath = sectionPath.hasPrefix(prefix)
                  ? "/" + sectionPath.dropFirst(prefix.count)
                  : sectionPath
               return "\(enSectionPath)\(page.slug)/"
            }
            return context.router.pagePath(for: page, in: section.config)
         }()
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
            // No hero image - show a brand-gradient placeholder with the wordmark
            // so the card grid stays visually balanced.
            return """
            <div class="blog-card-image is-placeholder" aria-hidden="true">
               <img src="/assets/theme/images/nfc-secondary-logo-white.webp" alt=""/>
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
      let heroText = """
      <h1 class="blog-index-title">\(title.htmlEscaped)</h1>
      <p class="blog-index-subtitle">\(subtitle.htmlEscaped)</p>
      <a class="landing-cta-button" href="\(rssFeedPath)" aria-label="RSS Feed">RSS Feed</a>
      """
      let heroHTML = renderPageHero(
         modifier: "blog-index-hero",
         text: heroText,
         visual: PageHeroVisual(
            src: "/assets/theme/images/nfc-secondary-logo-white.webp",
            alt: heroVisualAlt,
            isBrand: true
         )
      )
      let body = """
      <main class="sk-main blog-index">
         \(heroHTML)
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
      case ("changelog", "de"): return "Release-Notes für NFC.cool Tools (iOS + Android), die eigenständige Business Card App für iPhone und die Website - was neu ist, was sich verbessert hat und was als Nächstes kommt."
      case ("changelog", "ja"): return "NFC.cool Tools(iOS + Android)、iPhone専用のBusiness Cardアプリ、そしてウェブサイトのリリースノート - 何がリリースされ、何が改善され、次に何が来るのか。"
      case ("changelog", _):    return "Release notes for NFC.cool Tools (iOS + Android), the standalone Business Card iOS app, and the website - what shipped, what improved, what's next."
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
