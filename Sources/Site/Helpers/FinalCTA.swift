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

/// Splits a brand-headline title at ".cool" so the suffix renders in the script font/yellow.
/// "NFC.cool" → ("NFC", ".cool"). "All-in-one tools" → ("All-in-one tools", nil).
private func splitBrandTail(_ title: String) -> (head: String, tail: String?) {
   if let range = title.range(of: ".cool", options: [.caseInsensitive, .backwards]) {
      let head = String(title[..<range.lowerBound])
      let tail = String(title[range.lowerBound...])
      return (head, tail)
   }
   return (title, nil)
}

/// Renders a heading with the brand `.cool` suffix split out into a styled `<em>`.
/// Shared by the landing hero, features grid, and the final CTA.
func renderTitleWithBrandTail(_ title: String, tagName: String, classAttr: String) -> String {
   let parts = splitBrandTail(title)
   let escapedHead = parts.head.htmlEscaped
   if let tail = parts.tail {
      return "<\(tagName) class=\"\(classAttr)\">\(escapedHead)<em class=\"brand-tail\">\(tail.htmlEscaped)</em></\(tagName)>"
   }
   return "<\(tagName) class=\"\(classAttr)\">\(escapedHead)</\(tagName)>"
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
