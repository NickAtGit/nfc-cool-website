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
}
