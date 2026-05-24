import Foundation
import SiteKit

/// Whether a localized page is actually emitted as its own file, rather than a
/// build-time fallback to the default-language source.
///
/// In non-default-locale passes, SiteKit injects fallback pages for any content
/// that lacks a `.{locale}.md` sibling - notably the EN-only changelog under
/// `/de/` and `/ja/`. `BlogPostRenderer` skips rendering those, so requesting
/// their URLs 404s. Every channel that advertises URLs to crawlers - the sitemap
/// and the RSS feeds - must apply this same gate, or it points them at pages that
/// were never written (which is exactly how the phantom `/de/changelog/{slug}/`
/// URLs ended up in Google's index as 404s). Keeping the definition here is what
/// keeps those channels in agreement.
enum LocalizedContent {
   static func isEmitted(_ page: Page, defaultLanguage: String) -> Bool {
      if page.locale == defaultLanguage { return true }
      return page.sourcePath.lastPathComponent.contains(".\(page.locale).")
   }
}
