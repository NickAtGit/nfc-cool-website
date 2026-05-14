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
         let available = self.availableLocales(for: page, context: context)
         let isFallback = page.locale != defaultLang && !available.contains(page.locale)
         if isFallback {
            // EN-only pages (Terms, Privacy) requested by user: redirect
            // /de/{slug}/ and /ja/{slug}/ to the EN canonical. RedirectNoindexProcessor
            // sees the meta-refresh and stamps `noindex,follow` automatically.
            return self.renderFallbackRedirect(page, context: context)
         }
         return self.renderMarketingPage(page, context: context, helper: helper, availableLocales: available)
      }
   }

   private func renderMarketingPage(
      _ page: Page,
      context: BuildContext,
      helper: OutputFileRenderer,
      availableLocales: Set<String>
   ) -> OutputFile {
      let pageTitle = "\(page.title) - \(context.config.name)"
      // ProfilePage + Person JSON-LD on the About page so AI engines can
      // resolve "who wrote this" claims that appear on every blog post.
      let jsonLD: String? = page.slug == "about"
         ? StructuredData.aboutPageGraph(baseURL: context.config.baseURL, siteName: context.config.name)
         : nil
      // hreflang must reflect which locales *actually* exist on disk - the
      // lang picker JS reads `<link rel="alternate" hreflang>` to populate
      // its dropdown, so missing entries here mean missing options in the
      // UI. SiteKit's built-in `buildHreflangForAllLanguages` returns URLs
      // for every configured locale assuming all of them have the page;
      // filter that map down to the locales we actually emit.
      let allLangMap = helper.buildHreflangForAllLanguages { $0.staticPagePath(for: page) }
      let hreflangMap = allLangMap?.filter { entry in
         entry.key == "x-default" || availableLocales.contains(entry.key)
      }
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

   /// Emits a tiny meta-refresh redirect for a fallback page (e.g.
   /// `/de/terms/` → `/terms/`). Visitors reaching the localized URL get
   /// bounced to the EN canonical; search engines see `noindex,follow`
   /// (stamped by `RedirectNoindexProcessor`) so the bridge page doesn't
   /// fight the canonical for ranking.
   ///
   /// Important: the refresh target carries `?noredirect=1`. Without it the
   /// inline language-detection script in `<head>` (see PageShell) sees
   /// `localStorage.preferredLang === "de"` after a visitor manually picked
   /// DE, and re-redirects /terms/ back to /de/terms/ — which then
   /// meta-refreshes to /terms/ again, looping forever. The language script
   /// already short-circuits when `noredirect` is in `location.search`, so
   /// this query param breaks the cycle without disabling locale routing
   /// elsewhere. JS then quietly strips the param via `history.replaceState`
   /// so the visible URL stays clean.
   private func renderFallbackRedirect(_ page: Page, context: BuildContext) -> OutputFile {
      let defaultLang = context.config.effectiveDefaultLanguage
      let baseRouter = DefaultURLRouter(config: context.config)
      let defaultRouter = LocaleAwareURLRouter(wrapping: baseRouter, locale: defaultLang, defaultLanguage: defaultLang)
      let canonicalPath = defaultRouter.staticPagePath(for: page)
      let refreshTarget = "\(canonicalPath)?noredirect=1"
      let canonical = "\(context.config.baseURL)\(canonicalPath)"
      let html = """
      <!DOCTYPE html><html lang="\(defaultLang)"><head><meta charset="UTF-8"><title>Redirecting…</title><meta http-equiv="refresh" content="0; url=\(refreshTarget)"><link rel="canonical" href="\(canonical)"><meta name="robots" content="noindex,follow"></head><body><p>Redirecting to <a href="\(refreshTarget)">\(canonical)</a></p></body></html>
      """
      let relativePath = String(context.router.staticPagePath(for: page).dropFirst())
      let outputPath = context.outputDirectory
         .appendingPathComponent(relativePath)
         .appendingPathComponent("index.html")
      return OutputFile(outputPath: outputPath, content: html)
   }

   /// Inspects the page's source directory to find which configured locales
   /// have a real source file for this slug. EN sources are named `Foo.md`;
   /// other locales follow `Foo.<locale>.md` (per SiteKit's
   /// `LocalizedContentDiscovery` convention). Used both to filter hreflang
   /// (only link to pages that exist) and to decide whether a fallback
   /// redirect should be emitted.
   private func availableLocales(for page: Page, context: BuildContext) -> Set<String> {
      let allLocales = context.config.allLanguages
      let defaultLang = context.config.effectiveDefaultLanguage

      let stem = page.sourcePath.deletingPathExtension().lastPathComponent
      var base = stem
      for locale in allLocales where locale != defaultLang {
         if base.hasSuffix(".\(locale)") {
            base = String(base.dropLast(locale.count + 1))
            break
         }
      }

      let dir = page.sourcePath.deletingLastPathComponent()
      var available: Set<String> = []
      let fileManager = FileManager.default
      for locale in allLocales {
         let candidate: URL = (locale == defaultLang)
            ? dir.appendingPathComponent("\(base).md")
            : dir.appendingPathComponent("\(base).\(locale).md")
         if fileManager.fileExists(atPath: candidate.path) {
            available.insert(locale)
         }
      }
      return available
   }
}
