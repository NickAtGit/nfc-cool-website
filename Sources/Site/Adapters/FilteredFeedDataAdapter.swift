import Foundation
import SiteKit

/// Feed adapter that drops locale-fallback pages from RSS output.
///
/// `DefaultFeedDataAdapter` lists every page in `section.pages`, including the
/// build-time fallbacks SiteKit injects for content with no `.{locale}.md`
/// sibling (the EN-only changelog under /de/ and /ja/). Those pages are never
/// rendered - `BlogPostRenderer` skips them - so feeding their URLs to crawlers
/// produces 404s. This wraps the default adapter and removes any item pointing at
/// a fallback page, leaving the feed file itself in place (so the per-locale
/// `<link rel="alternate" type="application/rss+xml">` discovery tag still
/// resolves) even when it ends up with no items.
///
/// Wired in `Main.swift` via `.replacing(RSSFeedRenderer.self, with:
/// RSSFeedRenderer(adapter: FilteredFeedDataAdapter()))`.
struct FilteredFeedDataAdapter: FeedDataAdapting {
   func adapt(_ context: BuildContext) throws -> [FeedData] {
      let feeds = try DefaultFeedDataAdapter().adapt(context)

      let defaultLang = context.config.effectiveDefaultLanguage
      let fallbackURLs = Set(context.sections.flatMap { section in
         section.pages
            .filter { !LocalizedContent.isEmitted($0, defaultLanguage: defaultLang) }
            .map { "\(context.config.baseURL)\(context.router.pagePath(for: $0, in: section.config))" }
      })
      guard !fallbackURLs.isEmpty else { return feeds }

      return feeds.map { feed in
         FeedData(
            title: feed.title,
            description: feed.description,
            siteURL: feed.siteURL,
            feedURL: feed.feedURL,
            language: feed.language,
            items: feed.items.filter { !fallbackURLs.contains($0.url) },
            outputRelativePath: feed.outputRelativePath
         )
      }
   }
}
