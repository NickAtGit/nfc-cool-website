import Foundation
import SiteKit

/// Sitemap adapter that adds the site-specific feature pages to `sitemap.xml`.
///
/// SiteKit's `DefaultSitemapDataAdapter` only walks sections, static pages, and
/// tags - it has no knowledge of `FeaturePageRenderer` / `FeaturesIndexRenderer`,
/// which are custom renderers registered via `.renderer(...)`. Without this
/// decorator, `/features/` and every `/features/{slug}/` page is absent from the
/// sitemap, so crawlers only discover them by following in-page links.
///
/// Wired in `Main.swift` via `.replacing(SitemapRenderer.self, with:
/// SitemapRenderer(adapter: FeatureSitemapDataAdapter()))`. The renderer runs
/// once per locale, so `context.router.homePath()` yields the correct
/// `/{locale}/` prefix for each sitemap.
struct FeatureSitemapDataAdapter: SitemapDataAdapting {
   func adapt(_ context: BuildContext) throws -> [SitemapEntry] {
      var entries = try DefaultSitemapDataAdapter().adapt(context)

      // DefaultSitemapDataAdapter walks every page in `section.pages`, including
      // the locale fallbacks SiteKit injects for EN-only content (the changelog
      // under /de/ and /ja/). Those pages are never rendered, so drop their URLs
      // here - otherwise the per-locale sitemaps hand crawlers a list of 404s.
      let defaultLang = context.config.effectiveDefaultLanguage
      var fallbackPaths = Set(context.sections.flatMap { section in
         section.pages
            .filter { !LocalizedContent.isEmitted($0, defaultLanguage: defaultLang) }
            .map { context.router.pagePath(for: $0, in: section.config) }
      })
      // Same gate for static pages: MarketingPageRenderer turns an untranslated one
      // (Privacy, Terms, the EN-only app pages) into a noindex bridge to the English
      // page, which has no place in a sitemap. Each one joins its language's sitemap
      // by itself on the day its `.{locale}.md` exists.
      fallbackPaths.formUnion(
         context.staticPages
            .filter { !LocalizedContent.isEmitted($0, defaultLanguage: defaultLang) }
            .map { context.router.staticPagePath(for: $0) }
      )
      if !fallbackPaths.isEmpty {
         entries = entries.filter { !fallbackPaths.contains($0.path) }
      }
      entries = Self.usingLastModified(entries, context: context)

      // HoldEm's own pages are hand-written in Content/StaticFiles, which SiteKit only
      // copies, so it cannot list them. They exist in English only.
      if context.router.homePath() == "/" {
         for path in ["/holdem/", "/holdem/privacy-policy/", "/holdem/terms-of-service/"] {
            entries.append(SitemapEntry(path: path))
         }
      }

      // `loadFeatures` filters to the slugs whose YAML exists for the build's
      // current locale, keeping the sitemap in lockstep with the pages
      // `FeaturePageRenderer` actually emits.
      let features = try loadFeatures(context: context)
      guard !features.isEmpty else { return entries }

      let basePath = context.router.homePath() // "/" or "/{locale}/"
      entries.append(SitemapEntry(path: "\(basePath)features/", changeFrequency: .monthly, priority: 0.8))
      for feature in features {
         entries.append(SitemapEntry(path: "\(basePath)features/\(feature.slug)/", changeFrequency: .monthly, priority: 0.7))
      }
      return entries
   }

   /// SiteKit stamps each post with its publish date, so a post whose facts were updated still
   /// looks old to crawlers. A post's `lastModified` frontmatter wins, read the way
   /// `BlogPostRenderer` reads it for `dateModified`.
   private static func usingLastModified(_ entries: [SitemapEntry], context: BuildContext) -> [SitemapEntry] {
      let formatter = DateFormatter()
      formatter.locale = Locale(identifier: "en_US_POSIX")
      formatter.dateFormat = "yyyy-MM-dd"
      formatter.timeZone = TimeZone(secondsFromGMT: 0) // The zone SitemapRenderer prints in.

      var modified: [String: Date] = [:]
      for section in context.sections {
         for page in section.pages {
            guard let raw: String = page.extensionValue("lastModified"),
                  let date = formatter.date(from: String(raw.prefix(10)))
            else { continue }
            modified[context.router.pagePath(for: page, in: section.config)] = date
         }
      }
      return entries.map { entry in
         guard let date = modified[entry.path] else { return entry }
         return SitemapEntry(path: entry.path, lastModified: date, changeFrequency: entry.changeFrequency, priority: entry.priority)
      }
   }
}
