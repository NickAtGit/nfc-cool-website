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
/// That works for legal pages (where the markdown body has no h1), but it
/// double-renders the title on marketing pages that author their own
/// `<section class="page-hero"><h1>…</h1></section>` at the top of the body.
/// It also injects link-underline styling via base.css `.sk-article-body :is(…) a`
/// that competes with our brand-yellow border-bottom treatment.
///
/// Strategy:
/// - **Legal pages** (privacy, terms, impressum) keep SiteKit's wrapper so they
///   get the auto-h1 and continue to look like reading documents.
/// - **Marketing pages** drop the wrapper - the markdown's `.page-hero` is the
///   first thing inside `<main>`, no duplicate title, no inherited link rules.
struct MarketingPageRenderer: Renderer {
   /// Slugs treated as legal documents - keep the SiteKit reading-doc shell.
   private let legalSlugs: Set<String> = ["privacy", "terms", "impressum"]

   func render(context: BuildContext) throws -> [OutputFile] {
      let helper = OutputFileRenderer(context: context)
      return context.staticPages.map { page in
         if self.legalSlugs.contains(page.slug) {
            return helper.renderStaticPage(page)
         }
         return self.renderMarketingPage(page, context: context, helper: helper)
      }
   }

   private func renderMarketingPage(_ page: Page, context: BuildContext, helper: OutputFileRenderer) -> OutputFile {
      let hreflangMap: [String: String]? = page.extensionValue("hreflang")
      let pageTitle = "\(page.title) - \(context.config.name)"
      let head = helper.buildHead(
         title: pageTitle,
         description: page.description,
         canonicalURL: "\(context.config.baseURL)\(context.router.staticPagePath(for: page))",
         ogType: "website",
         image: page.image,
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
