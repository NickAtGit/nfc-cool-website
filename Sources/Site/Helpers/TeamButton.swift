import Foundation
import SiteKit

/// The "Start a team" badge: a store-style button that opens the team sign-up
/// on the web, drawn to sit in a `.landing-store-buttons` row like the App Store
/// and Google Play badges (see `.landing-store-button.is-team` in landing.css).
///
/// Markdown pages write `<div class="landing-store-buttons">{{TEAM_BUTTON}}</div>`
/// and `MarketingPageRenderer` swaps the token for this markup. The
/// `/business-card/teams/` hero and the closing call to action of both
/// `/business-card/` and `/business-card/teams/` use it, so the icon, the link
/// and the two lines of text are written once here, and the text once per
/// language in `Strings/Localizable.json` (`teamButtonKicker`, `teamButtonLabel`).
/// The `/business-card/` hero keeps its own copy in the markdown, because its
/// kicker reads "For companies" instead.
enum TeamButton {
   static let token = "{{TEAM_BUTTON}}"

   /// The badge for the build's current locale.
   static func html(context: BuildContext) -> String {
      // `##` delimiters: the icon's `stroke="#fff"` contains `"#`, which would end a `#"…"#` string.
      let icon = ##"<svg viewBox="0 0 26 24" width="35" height="32" aria-hidden="true"><g fill="currentColor"><circle cx="18" cy="8" r="3.9"/><path d="M11 21.500c0-4.700 3-7.800 7-7.800s7 3.100 7 7.800c0 .6-.4 1-1 1H12c-.6 0-1-.4-1-1z"/></g><g fill="currentColor" stroke="#fff" stroke-width="1.700" paint-order="stroke"><circle cx="9.500" cy="7" r="4.800"/><path d="M1 21c0-5.400 3.700-8.500 8.500-8.500S18 15.600 18 21c0 .9-.6 1.500-1.500 1.500h-14C1.600 22.500 1 21.900 1 21z"/></g></svg>"##
      let kicker = context.s(.teamButtonKicker).htmlEscaped
      let label = context.s(.teamButtonLabel).htmlEscaped
      return #"<a href="https://business.nfc.cool/org/start/" class="landing-store-button is-team">"# + icon + "<span><small>\(kicker)</small>\(label)</span></a>"
   }

   /// Replaces every `{{TEAM_BUTTON}}` token in `html` with the badge.
   static func resolveTokens(in html: String, context: BuildContext) -> String {
      guard html.contains(self.token) else { return html }
      return html.replacingOccurrences(of: self.token, with: self.html(context: context))
   }
}
