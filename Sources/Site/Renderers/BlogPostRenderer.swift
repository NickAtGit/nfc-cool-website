import Foundation
import SiteKit

/// Custom article renderer for /blog/{slug}/ and /changelog/{slug}/.
///
/// Replaces SiteKit's `ArticlePageRenderer` so each post gets a branded
/// gradient hero, a focused reading column for the body, and a related-
/// posts grid below.
struct BlogPostRenderer: Renderer {
   func render(context: BuildContext) throws -> [OutputFile] {
      var files: [OutputFile] = []
      let locale = context.uiStrings.locale
      let defaultLang = context.config.effectiveDefaultLanguage
      let dateFormatter = Self.dateFormatter(for: locale)

      for section in context.sections {
         let allInSection = section.pages.sorted { (a, b) -> Bool in
            (a.date ?? Date.distantPast) > (b.date ?? Date.distantPast)
         }
         for page in section.pages {
            // Skip pages that are falling back to the default language's
            // source file. Without this guard we ship EN content under
            // DE/JA URLs (e.g. /de/changelog/tools-openprinttag/) with
            // duplicate `<meta description>` — SEO audits flag those as
            // duplicate content. Visitors reaching the missing path get a
            // 404; hreflang on the EN canonical already reflects "this
            // post is not translated".
            if page.locale != defaultLang {
               let filename = page.sourcePath.lastPathComponent
               let localeInfix = ".\(page.locale)."
               if !filename.contains(localeInfix) { continue }
            }
            files.append(self.renderPost(
               page,
               section: section,
               allInSection: allInSection,
               context: context,
               dateFormatter: dateFormatter
            ))
         }
      }
      return files
   }

   private func renderPost(
      _ page: Page,
      section: ContentSection,
      allInSection: [Page],
      context: BuildContext,
      dateFormatter: DateFormatter
   ) -> OutputFile {
      let helper = OutputFileRenderer(context: context)
      let locale = context.uiStrings.locale
      let listingPath = context.router.sectionListingPath(for: section.config)
      let pagePath = context.router.pagePath(for: page, in: section.config)

      let dateText = page.date.map { dateFormatter.string(from: $0) } ?? ""
      let author = page.author?.name ?? ""
      let backText = Self.localized(.back, locale: locale, sectionName: section.config.name)
      let relatedTitle = Self.localized(.related, locale: locale)

      let tagsHTML = page.tags.map { tag in
         "<span class=\"blog-post-tag\">\(tag.htmlEscaped)</span>"
      }.joined()

      let heroVisual: PageHeroVisual = {
         if let img = page.image {
            let alt = (page.imageAlt ?? page.title).htmlEscaped
            return PageHeroVisual(src: img, alt: alt)
         }
         // No hero image - fall back to the brand logo on the gradient.
         return PageHeroVisual(
            src: "/assets/theme/images/nfc-secondary-logo-white.webp",
            alt: page.title.htmlEscaped,
            isBrand: true
         )
      }()

      // Related: pick 3 newest from same section, excluding current.
      let related = allInSection.filter { $0.slug != page.slug }.prefix(3)
      let relatedCards: String = related.map { other in
         let href = context.router.pagePath(for: other, in: section.config)
         let otherDate = other.date.map { dateFormatter.string(from: $0) } ?? ""
         let summary = (other.summary ?? "").htmlEscaped
         return """
         <a class="blog-card" href="\(href)">
            <div class="blog-card-body">
               <p class="blog-card-meta">\(otherDate.htmlEscaped)</p>
               <h3 class="blog-card-title">\(other.title.htmlEscaped)</h3>
               \(summary.isEmpty ? "" : "<p class=\"blog-card-summary\">\(summary)</p>")
            </div>
         </a>
         """
      }.joined()

      let ogImageAbsolute: String? = page.image.map { path in
         path.hasPrefix("http") ? path : context.config.baseURL + path
      }
      let isoDate = Self.isoDateFormatter.string(from: page.date ?? Date())
      let lastModified: String? = (page.extensionValue("lastModified") as String?).flatMap { raw in
         // Accept frontmatter strings in either "yyyy-MM-dd" or full ISO; trim to date only.
         String(raw.prefix(10))
      }
      let postMeta = BlogPostMeta(
         title: page.title,
         path: pagePath,
         description: page.summary ?? page.description,
         image: page.image,
         datePublished: isoDate,
         dateModified: lastModified,
         locale: page.locale
      )
      let jsonLD = StructuredData.blogPostGraph(
         baseURL: context.config.baseURL,
         homePath: context.router.homePath(),
         siteName: context.config.name,
         sectionName: section.config.name,
         sectionPath: listingPath,
         post: postMeta
      )

      let head = helper.buildHead(
         title: "\(page.title) - \(context.config.name)",
         description: page.summary ?? context.config.description,
         canonicalURL: "\(context.config.baseURL)\(pagePath)",
         ogType: "article",
         image: ogImageAbsolute,
         imageAlt: page.imageAlt ?? page.title,
         articleDate: page.date,
         articleAuthor: page.author,
         articleCategory: page.category,
         jsonLD: jsonLD,
         hreflang: helper.buildHreflangForAllLanguages { $0.pagePath(for: page, in: section.config) }
      )

      let heroText = """
      <p class="blog-post-back"><a href="\(listingPath)">\(backText.htmlEscaped)</a></p>
      <h1 class="blog-post-title">\(page.title.htmlEscaped)</h1>
      <p class="blog-post-meta">
         \(dateText.isEmpty ? "" : "<span>\(dateText.htmlEscaped)</span>")
         \(author.isEmpty ? "" : "<span>·</span><span>\(author.htmlEscaped)</span>")
      </p>
      \(tagsHTML.isEmpty ? "" : "<div class=\"blog-post-tags\">\(tagsHTML)</div>")
      """
      let heroHTML = renderPageHero(modifier: "blog-post-hero", text: heroText, visual: heroVisual)
      let body = """
      <main class="sk-main blog-post">
         \(heroHTML)
         <section class="blog-post-body-section">
            <div class="landing-container">
               <article class="blog-post-body">
                  \(page.htmlContent)
               </article>
            </div>
         </section>
         \(relatedCards.isEmpty ? "" : """
         <section class="blog-post-related">
            <div class="landing-container">
               <h2 class="landing-section-title">\(relatedTitle.htmlEscaped)</h2>
               <div class="blog-card-grid">\(relatedCards)</div>
            </div>
         </section>
         """)
      </main>
      """

      let html = helper.renderPageShell(
         head: head,
         bodyClass: "sk-page-\(section.config.slug)-post blog-post",
         content: body
      )

      let relPath = String(pagePath.dropFirst())
      let outputPath = context.outputDirectory
         .appendingPathComponent(relPath)
         .appendingPathComponent("index.html")

      return OutputFile(outputPath: outputPath, content: html)
   }

   // MARK: - Localization

   private enum LocKey { case back, related }
   private static func localized(_ key: LocKey, locale: String, sectionName: String = "") -> String {
      switch (key, locale) {
      case (.back, "de"): return sectionName.isEmpty ? "← Zurück" : "← Zurück zu \(sectionName)"
      case (.back, "ja"): return sectionName.isEmpty ? "← 戻る" : "← \(sectionName)に戻る"
      case (.back, _):    return sectionName.isEmpty ? "← Back" : "← Back to \(sectionName)"
      case (.related, "de"): return "Weitere Beiträge"
      case (.related, "ja"): return "関連記事"
      case (.related, _):    return "Related"
      }
   }

   private static func dateFormatter(for locale: String) -> DateFormatter {
      let df = DateFormatter()
      df.dateStyle = .long
      df.timeStyle = .none
      df.locale = Locale(identifier: locale)
      return df
   }

   /// Locale-independent ISO 8601 date formatter (`yyyy-MM-dd`) used to emit
   /// `datePublished` / `dateModified` in BlogPosting JSON-LD. Schema.org
   /// dates must not localize formatting.
   private static let isoDateFormatter: DateFormatter = {
      let df = DateFormatter()
      df.locale = Locale(identifier: "en_US_POSIX")
      df.timeZone = TimeZone(identifier: "UTC")
      df.dateFormat = "yyyy-MM-dd"
      return df
   }()
}
