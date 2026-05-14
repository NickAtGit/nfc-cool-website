import Foundation
import SiteKit

/// Custom static-page renderer that replaces SiteKit's default.
///
/// SiteKit's default wraps every static page in
///   `<article class="sk-static-page">`
///     `<header><h1 class="sk-article-title">…</h1></header>`
///     `<div class="sk-article-body">…</div>`
///   `</article>`
///
/// That double-renders the title on pages that author their own
/// `<section class="page-hero"><h1>…</h1></section>` at the top of the body,
/// and it injects link-underline styling via base.css `.sk-article-body :is(…) a`
/// that competes with our brand-yellow border-bottom treatment.
///
/// Every static page on this site now authors its own `.page-hero` in
/// markdown, so we always drop the SiteKit wrapper - the markdown's hero is
/// the first thing inside `<main>`, no duplicate title, no inherited link
/// rules.
struct MarketingPageRenderer: Renderer {
   func render(context: BuildContext) throws -> [OutputFile] {
      let helper = OutputFileRenderer(context: context)
      let defaultLang = context.config.effectiveDefaultLanguage
      return context.staticPages.compactMap { page in
         // Skip non-default-locale pages that fall back to the default
         // language's source file (e.g. /de/terms/ when only Terms.md exists).
         // Without this guard SiteKit emits an EN-content page under a DE/JA
         // URL, which SEO audits flag as duplicate content. Drop the page
         // entirely; visitors reaching the DE/JA path will get a 404 (and
         // the EN canonical is already the only hreflang link).
         if page.locale != defaultLang {
            let filename = page.sourcePath.lastPathComponent
            let localeInfix = ".\(page.locale)."
            if !filename.contains(localeInfix) { return nil }
         }
         return self.renderMarketingPage(page, context: context, helper: helper)
      }
   }

   private func renderMarketingPage(_ page: Page, context: BuildContext, helper: OutputFileRenderer) -> OutputFile {
      let hreflangMap: [String: String]? = page.extensionValue("hreflang")
      let pageTitle = "\(page.title) - \(context.config.name)"
      // ProfilePage + Person JSON-LD on the About page so AI engines can
      // resolve "who wrote this" claims that appear on every blog post.
      let jsonLD: String? = page.slug == "about"
         ? StructuredData.aboutPageGraph(baseURL: context.config.baseURL, siteName: context.config.name)
         : nil
      let head = helper.buildHead(
         title: pageTitle,
         description: page.description,
         canonicalURL: "\(context.config.baseURL)\(context.router.staticPagePath(for: page))",
         ogType: "website",
         image: page.image,
         jsonLD: jsonLD,
         hreflang: hreflangMap
      )

      // Marketing pages author their own .page-hero / .page-section structure
      // in markdown. Just drop the rendered body inside <main> - no auto h1,
      // no sk-article-body wrapper.
      let mainContent = "<main class=\"sk-main marketing-page\" data-slug=\"\(page.slug)\">\(page.htmlContent)</main>"

      let html = helper.renderPageShell(
         head: head,
         bodyClass: "sk-page-\(page.slug) marketing",
         dataAttributes: ["data-slug": page.slug],
         content: mainContent
      )

      let relativePath = String(context.router.staticPagePath(for: page).dropFirst())
      let outputPath = context.outputDirectory
         .appendingPathComponent(relativePath)
         .appendingPathComponent("index.html")

      return OutputFile(outputPath: outputPath, content: html)
   }
}
