import Foundation
import SiteKit

/// The store-style badges with translatable text: buttons that open a page on
/// business.nfc.cool, drawn to sit in a `.landing-store-buttons` row like the
/// App Store and Google Play badges (see `.landing-store-button.is-team` in
/// landing.css, which every badge here wears).
///
/// Markdown pages write e.g. `<div class="landing-store-buttons">{{TEAM_BUTTON}}</div>`
/// and `MarketingPageRenderer` swaps each token for its badge, so the icon, the
/// link and the two lines of text are written once here, and the text once per
/// language in `Strings/Localizable.json`:
///
/// - `{{TEAM_BUTTON}}`: "Start a team" (`teamButtonKicker`, `teamButtonLabel`),
///   in the `/business-card/teams/` hero and the closing call to action of both
///   `/business-card/` and `/business-card/teams/`. The `/business-card/` hero
///   keeps its own copy in the markdown, because its kicker reads "For companies".
/// - `{{PARTNER_BUTTON}}`: "Become a partner" (`partnerButtonKicker`,
///   `partnerButtonLabel`), on `/business-card/partners/`.
/// - `{{DEMO_BUTTON}}`: "See the demo" (`demoButtonKicker`, `demoButtonLabel`),
///   on `/business-card/partners/`.
enum TeamButton {
   struct Badge {
      let token: String
      let href: String
      /// Added after `landing-store-button is-team`, to tell the badges apart.
      let modifier: String
      let icon: String
      let kicker: SiteStringKey
      let label: SiteStringKey
   }

   // `##` delimiters: an icon's `stroke="#fff"` contains `"#`, which would end a `#"…"#` string.
   static let team = Badge(
      token: "{{TEAM_BUTTON}}", href: "https://business.nfc.cool/org/start/", modifier: "",
      icon: ##"<svg viewBox="0 0 26 24" width="35" height="32" aria-hidden="true"><g fill="currentColor"><circle cx="18" cy="8" r="3.9"/><path d="M11 21.500c0-4.700 3-7.800 7-7.800s7 3.100 7 7.800c0 .6-.4 1-1 1H12c-.6 0-1-.4-1-1z"/></g><g fill="currentColor" stroke="#fff" stroke-width="1.700" paint-order="stroke"><circle cx="9.500" cy="7" r="4.800"/><path d="M1 21c0-5.400 3.700-8.500 8.500-8.500S18 15.600 18 21c0 .9-.6 1.500-1.500 1.500h-14C1.600 22.500 1 21.900 1 21z"/></g></svg>"##,
      kicker: .teamButtonKicker, label: .teamButtonLabel)

   /// A person with a plus: joining the programme.
   static let partner = Badge(
      token: "{{PARTNER_BUTTON}}", href: "https://business.nfc.cool/partners/join/", modifier: " is-partner",
      icon: ##"<svg viewBox="0 0 26 24" width="35" height="32" aria-hidden="true"><g fill="currentColor"><circle cx="9.500" cy="7" r="4.800"/><path d="M1 21c0-5.400 3.700-8.500 8.500-8.500S18 15.600 18 21c0 .9-.6 1.500-1.500 1.500h-14C1.600 22.500 1 21.900 1 21z"/></g><path d="M21 4.500v8M17 8.500h8" fill="none" stroke="currentColor" stroke-width="2.600" stroke-linecap="round"/></svg>"##,
      kicker: .partnerButtonKicker, label: .partnerButtonLabel)

   /// A screen with a play mark: the guided demo tour.
   static let demo = Badge(
      token: "{{DEMO_BUTTON}}", href: "https://business.nfc.cool/demo/tour/", modifier: " is-demo",
      icon: ##"<svg viewBox="0 0 26 24" width="35" height="32" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M3.500 2h19A2.500 2.500 0 0 1 25 4.500v11a2.500 2.500 0 0 1-2.500 2.500h-19A2.500 2.500 0 0 1 1 15.500v-11A2.500 2.500 0 0 1 3.500 2zm7 3.900v8.200l7-4.100z"/><path d="M8 22h10" fill="none" stroke="currentColor" stroke-width="2.200" stroke-linecap="round"/></svg>"##,
      kicker: .demoButtonKicker, label: .demoButtonLabel)

   static let badges = [team, partner, demo]

   static let token = team.token

   /// The "Start a team" badge for the build's current locale.
   static func html(context: BuildContext) -> String {
      self.html(self.team, context: context)
   }

   /// A badge for the build's current locale.
   static func html(_ badge: Badge, context: BuildContext) -> String {
      let kicker = context.s(badge.kicker).htmlEscaped
      let label = context.s(badge.label).htmlEscaped
      return #"<a href=""# + badge.href + #"" class="landing-store-button is-team"# + badge.modifier + #"">"#
         + badge.icon + "<span><small>\(kicker)</small>\(label)</span></a>"
   }

   /// Replaces every badge token in `html` with its badge.
   static func resolveTokens(in html: String, context: BuildContext) -> String {
      var out = html
      for badge in self.badges where out.contains(badge.token) {
         out = out.replacingOccurrences(of: badge.token, with: self.html(badge, context: context))
      }
      return out
   }
}
