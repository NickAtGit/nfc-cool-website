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
      let newsletterHTML = NewsletterForm.section(for: context)
      return try context.staticPages.compactMap { page in
         let available = self.availableLocales(for: page, context: context)
         let isFallback = page.locale != defaultLang && !available.contains(page.locale)
         if isFallback {
            // EN-only pages (Terms, Privacy) requested by user: redirect
            // /de/{slug}/ and /ja/{slug}/ to the EN canonical. RedirectNoindexProcessor
            // sees the meta-refresh and stamps `noindex,follow` automatically.
            return self.renderFallbackRedirect(page, context: context)
         }
         return try self.renderMarketingPage(page, context: context, helper: helper, availableLocales: available, newsletterHTML: newsletterHTML)
      }
   }

   private func renderMarketingPage(
      _ page: Page,
      context: BuildContext,
      helper: OutputFileRenderer,
      availableLocales: Set<String>,
      newsletterHTML: String
   ) throws -> OutputFile {
      let pageTitle = "\(page.title) - \(context.config.name)"
      let pagePath = context.router.staticPagePath(for: page)
      // JSON-LD per page type:
      //  - About: ProfilePage + Person, so AI engines can resolve the
      //    "who wrote this" claims that appear on every blog post.
      //  - Online NFC Reader: BreadcrumbList + FAQPage (the page's own Q&A);
      //    FAQ schema is emitted only for the default locale to avoid
      //    shipping English Q&A under DE/JA pages.
      //  - Every other static page: a Home → page BreadcrumbList.
      // Fallback redirect pages never reach here (renderFallbackRedirect
      // handles them earlier), so every page below is genuinely indexable.
      let jsonLD: String?
      switch page.slug {
      case "about":
         jsonLD = StructuredData.aboutPageGraph(baseURL: context.config.baseURL, siteName: context.config.name)
      case "online-nfc-reader":
         let isDefaultLocale = page.locale == context.config.effectiveDefaultLanguage
         jsonLD = StructuredData.staticPageGraph(
            baseURL: context.config.baseURL,
            homePath: context.router.homePath(),
            pageTitle: page.title,
            pagePath: pagePath,
            faq: isDefaultLocale ? Self.onlineNfcReaderFAQ : nil
         )
      case "reviews":
         // Reviews are translated into each page's language, so the English
         // review text in the JSON-LD only matches the default-locale page.
         // Emit the rich SoftwareApplication graph there; DE/JA get a plain
         // breadcrumb (same default-locale-only approach as the FAQ above).
         if page.locale == context.config.effectiveDefaultLanguage {
            jsonLD = StructuredData.reviewsPageGraph(
               baseURL: context.config.baseURL,
               homePath: context.router.homePath(),
               reviewsLabel: page.title,
               reviewsPath: pagePath,
               ratings: AppRatings.load(projectDirectory: context.projectDirectory),
               toolsIOSReviews: Self.reviewsToolsIOS,
               toolsAndroidReviews: Self.reviewsToolsAndroid,
               businessCardReviews: Self.reviewsBusinessCard
            )
         } else {
            jsonLD = StructuredData.staticPageGraph(
               baseURL: context.config.baseURL,
               homePath: context.router.homePath(),
               pageTitle: page.title,
               pagePath: pagePath
            )
         }
      default:
         jsonLD = StructuredData.staticPageGraph(
            baseURL: context.config.baseURL,
            homePath: context.router.homePath(),
            pageTitle: page.title,
            pagePath: pagePath
         )
      }
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
      var head = helper.buildHead(
         title: pageTitle,
         description: page.description,
         canonicalURL: "\(context.config.baseURL)\(pagePath)",
         ogType: "website",
         image: page.image,
         jsonLD: jsonLD,
         hreflang: hreflangMap
      )

      // The /tap-counter/ demo decodes the chip-appended `?nfc=` value out of
      // the query string. SiteKit's buildHead inlines a synchronous
      // language-redirect <script> on every default-locale page, and that
      // script does `location.replace('/' + lang + location.pathname)` —
      // dropping location.search. A DE/JA-browser visitor tapping a tag would
      // be redirected and silently lose the scan data, so strip the redirect
      // for this one page; the URL (and its query) is then never rewritten.
      if page.slug == "tap-counter" {
         head = Self.removingLanguageRedirectScript(from: head)
      }

      // Marketing pages author their own .page-hero / .page-section structure
      // in markdown. Just drop the rendered body inside <main> - no auto h1,
      // no sk-article-body wrapper. The newsletter signup closes every page
      // except the legal ones, which stay focused with no signup CTA.
      let legalSlugs: Set<String> = ["terms", "privacy", "impressum"]
      let newsletter = legalSlugs.contains(page.slug) ? "" : newsletterHTML
      // Resolve any `{{PRICING_TABLE:<name>}}` tokens the markdown authored
      // (e.g. the business-card plan comparison) into generated table HTML.
      let body = try PricingTableRenderer.resolvePricingTokens(in: page.htmlContent, locale: page.locale, context: context)
      let mainContent = "<main class=\"sk-main marketing-page\" data-slug=\"\(page.slug)\">\(body)\(newsletter)</main>"

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
      // Inline `location.replace` in <head> runs synchronously before any
      // body parsing, so JS-enabled visitors never see flash content. The
      // meta-refresh stays as a no-JS / no-script-execution fallback (also
      // the signal RedirectNoindexProcessor uses to stamp `noindex,follow`),
      // and the <noscript> link covers the rare edge case of JS disabled +
      // meta-refresh suppressed.
      let html = """
      <!DOCTYPE html><html lang="\(defaultLang)"><head><meta charset="UTF-8"><title>Redirecting…</title><script>window.location.replace("\(refreshTarget)")</script><meta http-equiv="refresh" content="0; url=\(refreshTarget)"><link rel="canonical" href="\(canonical)"><meta name="robots" content="noindex,follow"></head><body><noscript><p>Redirecting to <a href="\(refreshTarget)">\(canonical)</a>.</p></noscript></body></html>
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

   /// Removes the inline language-redirect `<script>` from a `buildHead`
   /// result. Locates the `<script>` element that contains the
   /// `preferredLang` token (SiteKit's redirect snippet, emitted as the first
   /// inline script in `<head>`) and drops that whole element. A no-op when
   /// the script is absent — e.g. on non-default-locale pages, which never
   /// receive it.
   private static func removingLanguageRedirectScript(from head: String) -> String {
      guard let marker = head.range(of: "preferredLang"),
            let open = head.range(of: "<script>", options: .backwards, range: head.startIndex..<marker.lowerBound),
            let close = head.range(of: "</script>", range: marker.upperBound..<head.endIndex)
      else { return head }
      var result = head
      result.removeSubrange(open.lowerBound..<close.upperBound)
      return result
   }

   // Representative reviews for the `/reviews/` page JSON-LD, one block per app.
   // Each `body` is verbatim a review card authored in `Content/Pages/Reviews*.md`
   // (Tools-iOS from the App Store sections, Tools-Android from the Google Play
   // section, Business Card from its section). Kept as constants rather than
   // parsed from the markdown - same reliability tradeoff as `onlineNfcReaderFAQ`:
   // if a quote on the page changes, update it here so `reviewBody` keeps matching
   // the visible text (Google requires review markup to reflect on-page reviews).
   private static let reviewsToolsIOS: [AppReview] = [
      AppReview(author: "PhotoBomber_69", body: "I installed this app and paid for the full version, and I am extremely happy that I did. I had some questions and asked the developer and he responded immediately. His app is very well written, and packed with features. I am still learning them all. I suggest you install the app and see for yourself."),
      AppReview(author: "LGLB", body: "I had a Unicode character issue with the app and sent in a gripe. Within a few days I actually got a feedback response email from the developer himself (shocking nowadays). Within a week, the app was updated with my fix! That's enough for high marks in today's app worlds."),
      AppReview(author: "HellRazorCustoms", body: "After reading the reviews I've got to give a five because of developers commitment to his app! Great work! Current updates, dedicated, and patience with the illiterate."),
   ]
   private static let reviewsToolsAndroid: [AppReview] = [
      AppReview(author: "Awath Abdat", body: "The app is great. it does exactly what it says. I can create and easily share business cards and also get access to so many other wonderful nfc tools and features"),
      AppReview(author: "christian alejandro fuenzalida vasquez", body: "It worked great, highly recommended"),
      AppReview(author: "RAM", body: "really really loved it....."),
   ]
   // Sergio CABA (Spanish) and Gjllölbh (German) are shown translated into
   // English on the default-locale /reviews/ page, so the JSON-LD uses those
   // English translations to keep `reviewBody` matching the visible card.
   private static let reviewsBusinessCard: [AppReview] = [
      AppReview(author: "ktyllet", body: "Business card creation is intuitive and contact with support was swift and pleasant."),
      AppReview(author: "Sergio CABA", body: "A great app for professional use - very practical and easy to use."),
      AppReview(author: "Gjllölbh", body: "Mega idea, great app."),
   ]

   /// FAQ for `/online-nfc-reader/`, mirroring the `<details class="faq-item">`
   /// Q&A authored in `Content/Pages/NfcReader.md`. Kept as a constant rather
   /// than parsed from the markdown so the FAQPage JSON-LD is reliable - if the
   /// page's visible FAQ changes, update this list to match.
   private static let onlineNfcReaderFAQ: [FAQItem] = [
      FAQItem(
         question: "Can I read and write NFC tags without an app?",
         answer: "Yes, on an Android phone in Chrome. The page uses your browser's built-in Web NFC, so there is nothing to install - tap Scan to read a tag, or use the Write tab to put a link, text, contact, Wi-Fi network and more onto one."
      ),
      FAQItem(
         question: "Can I write a Wi-Fi network or contact card to a tag?",
         answer: "Yes. Pick Wi-Fi network or Contact card in the Write dropdown and fill in the fields. A Wi-Fi tag prompts Android phones to join the network; a contact tag stores a standard vCard that phones offer to save."
      ),
      FAQItem(
         question: "Does it work on iPhone?",
         answer: "No. Apple blocks NFC for every iOS browser, so no website can read or write tags on an iPhone or iPad. The free NFC.cool app does it on iPhone instead."
      ),
      FAQItem(
         question: "Which browsers are supported?",
         answer: "Web NFC works only in Chrome and other Chromium browsers on Android. Desktop and iOS browsers do not support it - if yours cannot, the page shows what to do instead."
      ),
      FAQItem(
         question: "Is the online NFC reader free?",
         answer: "Completely free - no sign-up and no scan limit. Tags are read and written on your own device, and nothing is ever uploaded."
      ),
   ]
}
