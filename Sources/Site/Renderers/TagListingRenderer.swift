import Foundation
import SiteKit

/// Custom tag listing renderer.
///
/// SiteKit's built-in `TagListingRenderer` emits per-tag pages with its
/// generic `sk-tag-*` markup (no matching site CSS, a raw-slug `<h1>`) and
/// links posts via `DefaultURLRouter.articlePath(for:)` - which builds
/// `/{category}/{slug}/` for any post carrying a `category:` value and so
/// 404s on this section-based site. This renderer replaces it entirely:
///
/// - Per-tag pages and the tags index reuse the `.blog-card` / hero markup
///   from `BlogIndexRenderer`, so they look identical to `/blog/`.
/// - Post links resolve through `pagePath(for:in:)` (section-aware), with
///   the same locale-fallback handling as `BlogIndexRenderer.href` so an
///   untranslated post linked from a `/de/` or `/ja/` tag page points at
///   its EN canonical URL instead of a 404.
/// - Tag display names and descriptions are localized here; SiteKit's
///   `tagDisplayNames` config is a single non-localized map, unusable on a
///   trilingual site.
struct TagListingRenderer: Renderer {
   func render(context: BuildContext) throws -> [OutputFile] {
      guard !context.tags.isEmpty else { return [] }

      let locale = context.uiStrings.locale
      let helper = OutputFileRenderer(context: context)
      let defaultLang = context.config.effectiveDefaultLanguage
      let dateFormatter = Self.dateFormatter(for: locale)

      // `context.tags` flattens pages across every section, so map each
      // page's source file to its owning section - post links need the
      // section's `urlPrefix` to resolve (`/blog/` vs `/changelog/`).
      var sectionBySource: [URL: ContentSection] = [:]
      for section in context.sections {
         for page in section.pages { sectionBySource[page.sourcePath] = section }
      }

      var files: [OutputFile] = []
      for (tag, pages) in context.tags.sorted(by: { $0.key < $1.key }) {
         files.append(self.renderTagPage(
            tag: tag,
            pages: pages,
            sectionBySource: sectionBySource,
            context: context,
            helper: helper,
            defaultLang: defaultLang,
            dateFormatter: dateFormatter
         ))
      }
      files.append(self.renderTagsIndex(context: context, helper: helper))
      return files
   }

   // MARK: - Per-tag page

   private func renderTagPage(
      tag: String,
      pages: [Page],
      sectionBySource: [URL: ContentSection],
      context: BuildContext,
      helper: OutputFileRenderer,
      defaultLang: String,
      dateFormatter: DateFormatter
   ) -> OutputFile {
      let displayName = Self.displayName(for: tag, strings: context.uiStrings)
      let description = Self.tagDescription(for: tag, strings: context.uiStrings)
      let tagPath = context.router.tagPath(for: tag)

      let sortedPages = pages.sorted { (a, b) -> Bool in
         (a.date ?? Date.distantPast) > (b.date ?? Date.distantPast)
      }

      let resolved: [(page: Page, href: String)] = sortedPages.compactMap { page in
         guard let section = sectionBySource[page.sourcePath] else { return nil }
         return (page, self.href(for: page, in: section, context: context, defaultLang: defaultLang))
      }

      let cards = resolved.map { entry in
         self.card(for: entry.page, href: entry.href, strings: context.uiStrings, dateFormatter: dateFormatter)
      }.joined()

      let jsonLD = StructuredData.collectionPageGraph(
         baseURL: context.config.baseURL,
         homePath: context.router.homePath(),
         sectionName: displayName,
         sectionPath: tagPath,
         description: description,
         items: resolved.map { (title: $0.page.title, url: "\(context.config.baseURL)\($0.href)") }
      )

      let head = helper.buildHead(
         title: "\(displayName) - \(context.config.name)",
         description: description,
         canonicalURL: "\(context.config.baseURL)\(tagPath)",
         ogType: "website",
         image: "\(context.config.baseURL)/assets/images/og-landing.webp",
         imageAlt: "\(displayName) - \(context.config.name)",
         jsonLD: jsonLD,
         hreflang: helper.buildHreflangForAllLanguages { $0.tagPath(for: tag) }
      )

      let heroText = """
      <p class="tag-page-back"><a href="\(context.router.tagsIndexPath())">\(context.s(.tagsBackAll).htmlEscaped)</a></p>
      \(renderTitleWithBrandTail(displayName, tagName: "h1", classAttr: "blog-index-title"))
      <p class="blog-index-subtitle">\(description.htmlEscaped)</p>
      """
      let heroHTML = renderPageHero(
         modifier: "blog-index-hero",
         text: heroText,
         visual: Self.brandVisual(alt: displayName)
      )
      let body = """
      <main class="sk-main blog-index">
         \(heroHTML)
         <section class="blog-index-grid-section">
            <div class="landing-container">
               <div class="blog-card-grid">\(cards)</div>
            </div>
         </section>
      </main>
      """

      let html = helper.renderPageShell(head: head, bodyClass: "sk-page-tag blog-listing", content: body)
      return Self.outputFile(for: tagPath, html: html, outputDirectory: context.outputDirectory)
   }

   // MARK: - Tags index

   private func renderTagsIndex(context: BuildContext, helper: OutputFileRenderer) -> OutputFile {
      let indexPath = context.router.tagsIndexPath()
      let heading = context.s(.tagsIndexHeading)
      let description = context.s(.tagsIndexDescription)

      // Most-used tags first so the index leads with the deepest topics.
      let sortedTags = context.tags.sorted { lhs, rhs in
         lhs.value.count != rhs.value.count ? lhs.value.count > rhs.value.count : lhs.key < rhs.key
      }

      let chips = sortedTags.map { tag, pages in
         let name = Self.displayName(for: tag, strings: context.uiStrings)
         return """
         <li><a class="tag-index-chip" href="\(context.router.tagPath(for: tag))">\(name.htmlEscaped)<span class="tag-index-count">\(pages.count)</span></a></li>
         """
      }.joined()

      let jsonLD = StructuredData.collectionPageGraph(
         baseURL: context.config.baseURL,
         homePath: context.router.homePath(),
         sectionName: heading,
         sectionPath: indexPath,
         description: description,
         items: sortedTags.map { tag, _ in
            (title: Self.displayName(for: tag, strings: context.uiStrings),
             url: "\(context.config.baseURL)\(context.router.tagPath(for: tag))")
         }
      )

      let head = helper.buildHead(
         title: "\(heading) - \(context.config.name)",
         description: description,
         canonicalURL: "\(context.config.baseURL)\(indexPath)",
         ogType: "website",
         image: "\(context.config.baseURL)/assets/images/og-landing.webp",
         imageAlt: "\(heading) - \(context.config.name)",
         jsonLD: jsonLD,
         hreflang: helper.buildHreflangForAllLanguages { $0.tagsIndexPath() }
      )

      let heroText = """
      \(renderTitleWithBrandTail(heading, tagName: "h1", classAttr: "blog-index-title"))
      <p class="blog-index-subtitle">\(description.htmlEscaped)</p>
      """
      let heroHTML = renderPageHero(
         modifier: "blog-index-hero",
         text: heroText,
         visual: Self.brandVisual(alt: heading)
      )
      let body = """
      <main class="sk-main blog-index">
         \(heroHTML)
         <section class="blog-index-grid-section">
            <div class="landing-container">
               <ul class="tag-index-list">\(chips)</ul>
            </div>
         </section>
      </main>
      """

      let html = helper.renderPageShell(head: head, bodyClass: "sk-page-tags blog-listing", content: body)
      return Self.outputFile(for: indexPath, html: html, outputDirectory: context.outputDirectory)
   }

   // MARK: - Card markup (mirrors BlogIndexRenderer)

   private func card(for page: Page, href: String, strings: UIStrings, dateFormatter: DateFormatter) -> String {
      let dateText = page.date.map { dateFormatter.string(from: $0) } ?? ""
      let summary = (page.summary ?? "").htmlEscaped
      let tags = page.tags.prefix(3).map { tag in
         "<span class=\"blog-card-tag\">\(Self.displayName(for: tag, strings: strings).htmlEscaped)</span>"
      }.joined()
      let imageHTML: String = {
         if let img = page.image {
            let alt = (page.imageAlt ?? page.title).htmlEscaped
            return "<div class=\"blog-card-image\"><img src=\"\(img)\" alt=\"\(alt)\" loading=\"lazy\"/></div>"
         }
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
            <p class="blog-card-meta">\(dateText.htmlEscaped)</p>
            <h3 class="blog-card-title">\(page.title.htmlEscaped)</h3>
            \(summary.isEmpty ? "" : "<p class=\"blog-card-summary\">\(summary)</p>")
            \(tags.isEmpty ? "" : "<div class=\"blog-card-tags\">\(tags)</div>")
         </div>
      </a>
      """
   }

   /// Resolves the URL for a post card. Mirrors `BlogIndexRenderer.href`:
   /// a post falling back to the default language's source file links to
   /// the EN canonical URL, since `BlogPostRenderer` skips emitting the
   /// localized URL and the `/de/...` path would 404.
   private func href(for page: Page, in section: ContentSection, context: BuildContext, defaultLang: String) -> String {
      let isFallback: Bool = {
         guard page.locale != defaultLang else { return false }
         return !page.sourcePath.lastPathComponent.contains(".\(page.locale).")
      }()
      guard isFallback else {
         return context.router.pagePath(for: page, in: section.config)
      }
      let sectionPath = context.router.sectionListingPath(for: section.config)
      let prefix = "/\(page.locale)/"
      let enSectionPath = sectionPath.hasPrefix(prefix)
         ? "/" + sectionPath.dropFirst(prefix.count)
         : sectionPath
      return "\(enSectionPath)\(page.slug)/"
   }

   // MARK: - Helpers

   private static func brandVisual(alt: String) -> PageHeroVisual {
      PageHeroVisual(
         src: "/assets/theme/images/nfc-secondary-logo-white.webp",
         alt: alt.htmlEscaped,
         isBrand: true
      )
   }

   private static func outputFile(for path: String, html: String, outputDirectory: URL) -> OutputFile {
      let relPath = String(path.dropFirst())
      let outputPath = outputDirectory
         .appendingPathComponent(relPath)
         .appendingPathComponent("index.html")
      return OutputFile(outputPath: outputPath, content: html)
   }

   private static func dateFormatter(for locale: String) -> DateFormatter {
      let df = DateFormatter()
      df.dateStyle = .long
      df.timeStyle = .none
      df.locale = Locale(identifier: locale)
      return df
   }

   // MARK: - Localization

   /// Human-readable tag name from the `tagName_<slug>` catalog key. Unknown
   /// slugs fall back to the slug itself so a stray tag never crashes the build.
   /// Shared with `BlogPostRenderer` / `BlogIndexRenderer`, hence `static` +
   /// taking `UIStrings` rather than a `BuildContext`.
   static func displayName(for slug: String, strings: UIStrings) -> String {
      strings.string(forRawKey: "tagName_\(slug)") ?? slug
   }

   /// One-sentence tag summary from the `tagDesc_<slug>` catalog key, used for
   /// the hero subtitle and the `<meta name="description">` of each per-tag page.
   private static func tagDescription(for slug: String, strings: UIStrings) -> String {
      strings.string(forRawKey: "tagDesc_\(slug)") ?? ""
   }
}
