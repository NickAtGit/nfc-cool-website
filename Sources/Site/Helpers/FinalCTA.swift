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
/// font). When the title has a " - " separator before ".cool", the wordmark is
/// the trailing segment after it; the separator is dropped and the wordmark
/// placed on its own line via `<br>`, so "Foo - NFC.cool Tools" renders "Foo"
/// with "NFC.cool Tools" beneath it. Without a separator the wordmark starts at
/// the word ".cool" sits in (e.g. "NFC" in "NFC.cool Blog"), so the whole
/// "NFC.cool" reads as one unit. Titles without ".cool" render plain.
///
/// Reusable across every hero h1 (landing, features index, feature pages, blog),
/// section headings, and the final CTA. Pass `classAttr` to put a class on the
/// element, or omit it for a bare tag. The `.brand-name` span holds just the
/// "NFC.cool" wordmark and is kept on one line via `white-space: nowrap`; any
/// trailing descriptor (e.g. " Tools", " Business Card") sits outside the span
/// so it can wrap freely on narrow screens.
func renderTitleWithBrandTail(_ title: String, tagName: String, classAttr: String? = nil) -> String {
   let classPart = classAttr.map { " class=\"\($0)\"" } ?? ""
   guard let coolRange = title.range(of: ".cool", options: [.caseInsensitive, .backwards]) else {
      return "<\(tagName)\(classPart)>\(title.htmlEscaped)</\(tagName)>"
   }
   let lead: String
   let separator: String
   let brandStart: String.Index
   if let sep = title.range(of: " - ", options: .backwards), sep.upperBound <= coolRange.lowerBound {
      brandStart = sep.upperBound
      separator = "<br/>"
      // The wordmark's leading token (e.g. "NFC" in "NFC.cool") sits at the
      // start of the brand line. When the lead phrase already ends with that
      // same token, drop it so the word isn't repeated across the break -
      // Spanish/Portuguese/Indonesian put the qualifier last ("...etiquetas
      // NFC"), which would otherwise stack "...NFC" directly above "NFC.cool".
      let head = String(title[sep.upperBound..<coolRange.lowerBound])
      var leadText = String(title[..<sep.lowerBound]).trimmingCharacters(in: .whitespaces)
      if !head.isEmpty, leadText.lowercased().hasSuffix(head.lowercased()) {
         let cut = leadText.index(leadText.endIndex, offsetBy: -head.count)
         if cut != leadText.startIndex, leadText[leadText.index(before: cut)] == " " {
            leadText = String(leadText[..<cut]).trimmingCharacters(in: .whitespaces)
         }
      }
      lead = leadText.htmlEscaped
   } else {
      // No separator: start the wordmark at the word ".cool" belongs to so the
      // whole "NFC.cool" renders as one unit, matching the landing hero.
      let beforeCool = title[..<coolRange.lowerBound]
      brandStart = beforeCool.lastIndex(of: " ").map { title.index(after: $0) } ?? title.startIndex
      lead = String(title[..<brandStart]).htmlEscaped
      separator = ""
   }
   let brandHead = String(title[brandStart..<coolRange.lowerBound]).htmlEscaped
   let brandCool = String(title[coolRange]).htmlEscaped
   // Anything after ".cool" (e.g. " Tools", " Business Card") is a plain
   // descriptor - kept outside .brand-name so only "NFC.cool" is held nowrap
   // and the descriptor can wrap on narrow screens.
   var brandRest = String(title[coolRange.upperBound...]).htmlEscaped
   // Exception: "Tools" stays welded to the wordmark in every language. A bare
   // " Tools" orphaning onto its own line below "NFC.cool" reads badly, so bind
   // it with a non-breaking space. Longer descriptors (" Business Card") keep
   // wrapping freely.
   if brandRest.hasPrefix(" Tools") {
      brandRest = "&#160;" + String(brandRest.dropFirst())
   }
   let wordmark = "<span class=\"brand-name\">\(brandHead)<em class=\"brand-tail\">\(brandCool)</em></span>\(brandRest)"
   return "<\(tagName)\(classPart)>\(lead)\(separator)\(wordmark)</\(tagName)>"
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
