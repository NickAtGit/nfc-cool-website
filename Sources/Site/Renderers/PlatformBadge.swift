import Foundation
import SiteKit

/// Renders a "platforms" chip showing each platform as an icon + label pill.
///
/// Splits the input on the `·` separator and emits one pill per platform.
/// Platform detection is case-insensitive substring matching on the label:
///   - contains "android"            → Android pill (label normalised to "Android")
///   - contains "ios" or "iphone"    → iOS pill (label normalised to "iOS")
///   - otherwise                     → generic pill, label preserved verbatim
///
/// The label is normalised so localized qualifiers ("iOS only", "Nur iOS",
/// "iOSのみ") all render as the canonical platform name. The qualifier is
/// already implicit in the chip set - emitting one pill means that platform
/// only.
enum PlatformBadge {
   /// Wraps the pill row in a span with `wrapperClass` (which scopes section-specific
   /// spacing - e.g. `landing-feature-platforms`, `feature-hero-platforms`).
   static func render(platforms: String, wrapperClass: String) -> String {
      let parts = platforms.split(separator: "·").map { $0.trimmingCharacters(in: .whitespaces) }
      let pills: [String] = parts.map { part in
         let lower = part.lowercased()
         let icon: String
         let modClass: String
         let label: String
         if lower.contains("android") {
            icon = androidIconSVG
            modClass = "is-android"
            label = "Android"
         } else if lower.contains("ios") || lower.contains("iphone") {
            icon = appleIconSVG
            modClass = "is-ios"
            label = "iOS"
         } else {
            icon = ""
            modClass = "is-other"
            label = part
         }
         return "<span class=\"platform-pill \(modClass)\">\(icon)<span class=\"platform-pill-label\">\(label.htmlEscaped)</span></span>"
      }
      return "<span class=\"\(wrapperClass)\">\(pills.joined())</span>"
   }

   // FontAwesome 6 Free Brands - Apple logo. Uses the original viewBox so the
   // rounded apple body isn't cropped at the bottom; the small optical offset
   // is handled in CSS (translateY on .platform-pill.is-ios .platform-pill-icon).
   private static let appleIconSVG = #"<svg class="platform-pill-icon" viewBox="0 0 384 512" aria-hidden="true"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>"#

   // Full Android robot, matching the icon used in the Online NFC Reader
   // widget. viewBox is cropped to the artwork so it carries the same visual
   // size as the Apple mark. The ## raw-string delimiter is needed because
   // the SVG contains fill="#fff".
   private static let androidIconSVG = ##"<svg class="platform-pill-icon" viewBox="2 2 20 20" fill="none" aria-hidden="true"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></svg>"##
}
