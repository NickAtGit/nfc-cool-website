import Foundation
import SiteKit

/// Typed keys for this site's own UI "chrome" strings - the labels, headings,
/// and aria-labels that live in renderers rather than in per-page YAML/Markdown.
///
/// Every case maps to a key in `Strings/Localizable.json`, which SiteKit's
/// `UIStrings` loads and merges per-locale into `context.uiStrings`. Centralising
/// them here (instead of a `switch locale { … default: <English> }` in each
/// renderer) means adding a language is a data edit, not a code edit, and a
/// missing translation is a single thing the `i18n-check` gate can see:
/// `SiteStringKey.allCases` is the contract the checker enumerates against the
/// catalog. The dynamic per-tag keys (`tagName_<slug>` / `tagDesc_<slug>`) are
/// not enum cases - they vary with the tag vocabulary and are resolved by raw key.
enum SiteStringKey: String, CaseIterable {
   case blogBack, blogBackTo, blogRelated, blogNewerPost, blogOlderPost, blogPostNavigation, blogRssFeed
   case blogSubtitleBlog, blogSubtitleChangelog
   case tagsIndexHeading, tagsIndexDescription, tagsBackAll
   case featuresHubTitle, featuresHubSubtitle, featuresLabel, featuresBackAll
   case pricingIncluded, pricingNotIncluded, pricingLimited, pricingNotApplicable
   case navToggle, langFlag, langName
}

extension BuildContext {
   /// Localised chrome string for the current build locale.
   ///
   /// Falls back to the raw key name if the catalog is missing the key - in
   /// practice that never reaches output because `i18n-check` fails the build
   /// first, but it keeps local authoring non-crashing.
   func s(_ key: SiteStringKey) -> String {
      self.uiStrings.string(forRawKey: key.rawValue) ?? key.rawValue
   }

   /// Localised chrome string with `%@` / `%d` format arguments
   /// (e.g. `blogBackTo` = `"← Back to %@"`).
   func s(_ key: SiteStringKey, _ args: CVarArg...) -> String {
      let format = self.uiStrings.string(forRawKey: key.rawValue) ?? key.rawValue
      return String(format: format, arguments: args)
   }
}
