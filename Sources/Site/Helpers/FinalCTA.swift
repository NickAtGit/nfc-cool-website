import Foundation
import SiteKit
import Yams

/// Loads `Content/Data/Landing{.locale}.yaml` for the build's current
/// locale. Used by every renderer that wants to reuse landing-level
/// content (final CTA title, trust line, etc.) instead of carrying its
/// own copy in a sibling YAML.
func loadLandingData(context: BuildContext) throws -> LandingData {
   let locale = context.uiStrings.locale
   let defaultLang = context.config.effectiveDefaultLanguage
   let suffix = locale == defaultLang ? "" : ".\(locale)"
   let yamlPath = context.projectDirectory
      .appendingPathComponent(context.config.contentDirectory)
      .appendingPathComponent("Data")
      .appendingPathComponent("Landing\(suffix).yaml")
   let yamlData = try Data(contentsOf: yamlPath)
   return try YAMLDecoder().decode(LandingData.self, from: yamlData)
}

/// Renders a heading with the brand wordmark wrapped in `<span class="brand-name">`
/// and the ".cool" token inside it styled as `<em class="brand-tail">` (script
/// font). The wordmark is the trailing segment after the last " - " separator;
/// that separator is dropped and the wordmark placed on its own line via `<br>`,
/// so "Foo - NFC.cool Tools" renders "Foo" with "NFC.cool Tools" beneath it.
/// Without a separator the wordmark follows inline. Titles without ".cool"
/// render plain. Shared by the landing hero and the final CTA.
///
/// The whole `.brand-name` wordmark is held on one line by `white-space:
/// nowrap` (set in CSS), so the inline-block `.brand-tail` can never let
/// "NFC.cool Tools" break across lines on narrow screens.
func renderTitleWithBrandTail(_ title: String, tagName: String, classAttr: String) -> String {
   guard let coolRange = title.range(of: ".cool", options: [.caseInsensitive, .backwards]) else {
      return "<\(tagName) class=\"\(classAttr)\">\(title.htmlEscaped)</\(tagName)>"
   }
   let lead: String
   let separator: String
   let brandStart: String.Index
   if let sep = title.range(of: " - ", options: .backwards), sep.upperBound <= coolRange.lowerBound {
      lead = String(title[..<sep.lowerBound]).htmlEscaped
      separator = "<br/>"
      brandStart = sep.upperBound
   } else {
      lead = String(title[..<coolRange.lowerBound]).htmlEscaped
      separator = ""
      brandStart = coolRange.lowerBound
   }
   let brandHead = String(title[brandStart..<coolRange.lowerBound]).htmlEscaped
   let brandCool = String(title[coolRange]).htmlEscaped
   let brandRest = String(title[coolRange.upperBound...]).htmlEscaped
   let wordmark = "<span class=\"brand-name\">\(brandHead)<em class=\"brand-tail\">\(brandCool)</em>\(brandRest)</span>"
   return "<\(tagName) class=\"\(classAttr)\">\(lead)\(separator)\(wordmark)</\(tagName)>"
}

private func formatThousands(_ n: Int) -> String {
   let formatter = NumberFormatter()
   formatter.numberStyle = .decimal
   formatter.groupingSeparator = ","
   return formatter.string(from: NSNumber(value: n)) ?? "\(n)"
}

/// Renders the rating/version/price trust line shared by the landing hero
/// and the final CTA. Returns "" when `trust` is nil or has no fields set.
func renderTrust(_ trust: TrustSection?, classAttr: String = "landing-hero-trust") -> String {
   guard let trust else { return "" }
   var parts: [String] = []
   if let rating = trust.rating {
      parts.append("<span class=\"stars\">★</span>\(rating.htmlEscaped)")
   }
   if let count = trust.ratingCount {
      let formatted = formatThousands(count)
      parts.append("\(formatted) ratings")
   }
   if let version = trust.version {
      parts.append("v\(version.htmlEscaped)")
   }
   if let price = trust.price {
      parts.append(price.htmlEscaped)
   }
   guard !parts.isEmpty else { return "" }
   return "<p class=\"\(classAttr)\">" + parts.joined(separator: "<span class=\"sep\">·</span>") + "</p>"
}

/// App Store + Google Play badge pair shared across every page's hero, the
/// landing's pricing/feature-banner sections, and the final CTA.
///
/// External commercial CTAs: open in a new tab (`target="_blank"`) and
/// carry `rel="noopener nofollow sponsored"`:
///  - `noopener` is required for security whenever `target="_blank"` is set
///  - `nofollow sponsored` keeps SEO audits from flagging the commercial
///    outbound link as PageRank-leaking; `sponsored` is Google's preferred
///    rel for app-store / affiliate / paid-placement destinations.
func renderStoreButtons(appStoreURL: String, googlePlayURL: String?) -> String {
   var buttons: [String] = []
   buttons.append("""
      <a href="\(appStoreURL)" class="landing-store-button is-apple" aria-label="Download on the App Store" target="_blank" rel="noopener nofollow sponsored">
         <img src="/assets/theme/images/AppStore.svg" alt="Download on the App Store" width="156" height="52"/>
      </a>
      """)
   if let url = googlePlayURL {
      buttons.append("""
         <a href="\(url)" class="landing-store-button is-google" aria-label="Get it on Google Play" target="_blank" rel="noopener nofollow sponsored">
            <img src="/assets/theme/images/GooglePlay.svg" alt="Get it on Google Play" width="173" height="52"/>
         </a>
         """)
   }
   return "<div class=\"landing-store-buttons\">\(buttons.joined())</div>"
}

/// Renders the brand-gradient closing CTA section used at the bottom of the
/// landing, every per-feature page, and the features index. Pulls its title
/// and optional trust line from `Landing{.locale}.yaml` so all three pages
/// stay visually and editorially in sync — change `cta.title` in one place
/// and every page updates.
func renderFinalCTA(cta: CTASection, trust: TrustSection?, appStoreURL: String, googlePlayURL: String?) -> String {
   let titleHTML = renderTitleWithBrandTail(cta.title, tagName: "h2", classAttr: "landing-cta-title")
   return """
   <section class="landing-final-cta">
      <div class="landing-container">
         \(titleHTML)
         \(renderTrust(trust))
         \(renderStoreButtons(appStoreURL: appStoreURL, googlePlayURL: googlePlayURL))
      </div>
   </section>
   """
}
