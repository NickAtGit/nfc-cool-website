import Foundation
import SiteKit

/// Regenerates the language-picker + nav-toggle data block in the built
/// `theme.js` from `Strings/Localizable.json`.
///
/// The client-side language menu (flag + name per locale) and the burger
/// menu's `aria-label` are driven by three JS maps. Rather than hand-maintain
/// those maps in JS - the old `const labels = { en: …, de: …, ja: … }` that
/// silently lacked any newly-added locale - this processor rewrites the block
/// between the `/* __LANG_DATA_START__ */` and `/* __LANG_DATA_END__ */`
/// markers with values pulled from the string catalog. Adding a language is
/// then purely a catalog edit; the `i18n-check` gate guarantees `langFlag` /
/// `langName` / `navToggle` exist for every configured locale, so the menu can
/// never silently miss one.
///
/// Must run before `AssetMinifier` (which strips the comment markers and
/// collapses whitespace), so it sees the un-minified source.
struct LangPickerDataProcessor: OutputProcessor {
   private static let startMarker = "/* __LANG_DATA_START__ */"
   private static let endMarker = "/* __LANG_DATA_END__ */"

   func process(outputDirectory: URL, projectDirectory: URL, themeConfig: ThemeConfig?) throws {
      let themeJS = outputDirectory.appendingPathComponent("assets/theme/js/theme.js")
      guard var js = try? String(contentsOf: themeJS, encoding: .utf8) else { return }
      guard let startRange = js.range(of: Self.startMarker),
            let endRange = js.range(of: Self.endMarker),
            startRange.upperBound <= endRange.lowerBound
      else { return }

      let catalogURL = projectDirectory.appendingPathComponent("Strings/Localizable.json")
      guard let data = try? Data(contentsOf: catalogURL),
            let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any]
      else { return }

      // Each catalog entry carries every locale under `localizations`, so the
      // emitted map covers exactly the configured languages.
      func localizations(of key: String) -> [String: String] {
         (json[key] as? [String: Any])?["localizations"] as? [String: String] ?? [:]
      }
      // JSON object literals are valid JS object literals; `.sortedKeys` keeps
      // the emitted maps stable build-to-build.
      func literal(_ dict: [String: String]) -> String {
         guard let data = try? JSONSerialization.data(withJSONObject: dict, options: [.sortedKeys]),
               let string = String(data: data, encoding: .utf8)
         else { return "{}" }
         return string
      }

      let block = """
      \(Self.startMarker)
         const labels = \(literal(localizations(of: "langFlag")));
         const names = \(literal(localizations(of: "langName")));
         const navToggleLabels = \(literal(localizations(of: "navToggle")));
         const CURRENT_LANG = (document.documentElement.getAttribute('lang') || 'en').toLowerCase().split('-')[0];
         \(Self.endMarker)
      """

      js.replaceSubrange(startRange.lowerBound ..< endRange.upperBound, with: block)
      try js.write(to: themeJS, atomically: true, encoding: .utf8)
   }
}
