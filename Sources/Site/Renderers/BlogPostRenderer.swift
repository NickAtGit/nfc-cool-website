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
      let newsletterHTML = NewsletterForm.section(for: context)

      for section in context.sections {
         // Only pages that are actually emitted. Non-default-locale pages
         // that fall back to the default-language source are excluded here
         // (they would otherwise ship EN content under a DE/JA URL with a
         // duplicate <meta description>, and SEO audits flag that as
         // duplicate content); visitors reaching such a path get a 404.
         // Related-post and prev/next links are built from this same list
         // so they never point at those 404s.
         let renderable = section.pages
            .filter { LocalizedContent.isEmitted($0, defaultLanguage: defaultLang) }
            .sorted { (a, b) -> Bool in
               (a.date ?? Date.distantPast) > (b.date ?? Date.distantPast)
            }
         for page in renderable {
            files.append(self.renderPost(
               page,
               section: section,
               allInSection: renderable,
               context: context,
               dateFormatter: dateFormatter,
               newsletterHTML: newsletterHTML
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
      dateFormatter: DateFormatter,
      newsletterHTML: String
   ) -> OutputFile {
      let helper = OutputFileRenderer(context: context)
      let listingPath = context.router.sectionListingPath(for: section.config)
      let pagePath = context.router.pagePath(for: page, in: section.config)

      let dateText = page.date.map { dateFormatter.string(from: $0) } ?? ""
      let author = page.author?.name ?? ""
      let backText = section.config.name.isEmpty
         ? context.s(.blogBack)
         : context.s(.blogBackTo, section.config.name)
      let relatedTitle = context.s(.blogRelated)

      let tagsHTML = page.tags.map { tag in
         "<a class=\"blog-post-tag\" href=\"\(context.router.tagPath(for: tag))\">\(TagListingRenderer.displayName(for: tag, strings: context.uiStrings).htmlEscaped)</a>"
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

      // Related: prefer posts sharing the most tags with this one; recency
      // breaks ties (allInSection is newest-first). Posts with no tag overlap
      // still fill any remaining slots so the grid is never short.
      let currentTags = Set(page.tags)
      let related = allInSection
         .filter { $0.slug != page.slug }
         .sorted { a, b in
            let aScore = currentTags.intersection(Set(a.tags)).count
            let bScore = currentTags.intersection(Set(b.tags)).count
            if aScore != bScore { return aScore > bScore }
            return (a.date ?? Date.distantPast) > (b.date ?? Date.distantPast)
         }
         .prefix(3)
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

      // Posts may override the SEO <title> / <meta description> via
      // frontmatter, independent of the on-page <h1> (page.title) and the
      // listing-card summary (page.summary). metaTitle is used verbatim so
      // authors keep full control of the ~60-char budget and any brand suffix.
      let metaTitle: String? = page.extensionValue("metaTitle")
      let metaDescription: String? = page.extensionValue("metaDescription")
      // hreflang: advertise only the locales this post actually has a source
      // file for. SiteKit's HreflangEnricher precomputes this into
      // page.extensions["hreflang"] from the build's translationMap, so a fully
      // localized blog post still emits en/de/ja while an EN-only changelog post
      // emits just en + x-default. Using buildHreflangForAllLanguages instead
      // fabricated /de/ and /ja/ alternates for the EN-only changelog, and Google
      // crawled those phantom URLs into 404s.
      let hreflangMap: [String: String]? = page.extensionValue("hreflang")
      let head = helper.buildHead(
         title: metaTitle ?? "\(page.title) - \(context.config.name)",
         description: metaDescription ?? page.summary ?? context.config.description,
         canonicalURL: "\(context.config.baseURL)\(pagePath)",
         ogType: "article",
         image: ogImageAbsolute,
         imageAlt: page.imageAlt ?? page.title,
         articleDate: page.date,
         articleAuthor: page.author,
         jsonLD: jsonLD,
         hreflang: hreflangMap
      )

      // Prev/next chain: lets crawlers walk every post and readers move
      // chronologically. allInSection is newest-first, so the newer post sits
      // at the lower index. Built from the renderable list, so links never
      // point at untranslated 404 pages.
      let prevNextHTML: String = {
         guard let idx = allInSection.firstIndex(where: { $0.slug == page.slug }) else { return "" }
         let newer = idx > 0 ? allInSection[idx - 1] : nil
         let older = idx + 1 < allInSection.count ? allInSection[idx + 1] : nil
         func link(_ other: Page?, dir: String, rel: String, label: String) -> String {
            guard let other else { return "" }
            let href = context.router.pagePath(for: other, in: section.config)
            return """
            <a class="blog-post-nav-link blog-post-nav-\(dir)" rel="\(rel)" href="\(href)">
               <span class="blog-post-nav-label">\(label.htmlEscaped)</span>
               <span class="blog-post-nav-post-title">\(other.title.htmlEscaped)</span>
            </a>
            """
         }
         let olderLink = link(older, dir: "older", rel: "prev", label: context.s(.blogOlderPost))
         let newerLink = link(newer, dir: "newer", rel: "next", label: context.s(.blogNewerPost))
         if olderLink.isEmpty && newerLink.isEmpty { return "" }
         let navLabel = context.s(.blogPostNavigation).htmlEscaped
         return """
         <nav class="blog-post-nav" aria-label="\(navLabel)">\(olderLink)\(newerLink)</nav>
         """
      }()

      let heroText = """
      <p class="blog-post-back"><a href="\(listingPath)">\(backText.htmlEscaped)</a></p>
      \(renderTitleWithBrandTail(page.title, tagName: "h1", classAttr: "blog-post-title"))
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
         \((relatedCards.isEmpty && prevNextHTML.isEmpty) ? "" : """
         <section class="blog-post-related">
            <div class="landing-container">
               \(relatedCards.isEmpty ? "" : """
               <h2 class="landing-section-title">\(relatedTitle.htmlEscaped)</h2>
               <div class="blog-card-grid">\(relatedCards)</div>
               """)
               \(prevNextHTML)
            </div>
         </section>
         """)
         \(newsletterHTML)
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

   // MARK: - Date formatting

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
