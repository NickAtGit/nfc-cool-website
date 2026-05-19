import Foundation
import SiteKit
import Yams

/// Renders a `PricingTable` into the shared `.feature-pricing-table` markup.
///
/// One implementation backs every pricing/comparison table on the site:
/// - Feature pages decode a `PricingTable` from their per-feature YAML and call
///   `renderTable` directly (via `FeaturePageRenderer.renderPricing`).
/// - Markdown pages (e.g. `/business-card/`) drop a `{{PRICING_TABLE:<name>}}`
///   token into their content; `resolvePricingTokens` swaps it for a rendered
///   table loaded from `Content/Data/Pricing/<name>{.locale}.yaml`.
enum PricingTableRenderer {
   /// Renders just the table card — `.feature-pricing-wrap` + `<table>` — with
   /// no surrounding `<section>` or heading. Callers add their own wrapper.
   ///
   /// The inline `--pricing-columns` custom property carries the column count
   /// so the CSS can size the table's responsive `min-width` without knowing
   /// the page context.
   static func renderTable(_ table: PricingTable) -> String {
      let headerCells = table.columns
         .map { "<th scope=\"col\">\($0.htmlEscaped)</th>" }
         .joined()
      let bodyRows = table.rows.map { row in
         let cells = row.values
            .map { "<td>\(self.markCell($0))</td>" }
            .joined()
         return "<tr><th scope=\"row\">\(row.label.htmlEscaped)</th>\(cells)</tr>"
      }.joined()
      return """
      <div class="feature-pricing-wrap">
         <table class="feature-pricing-table" style="--pricing-columns: \(table.columns.count)">
            <thead>
               <tr><th></th>\(headerCells)</tr>
            </thead>
            <tbody>\(bodyRows)</tbody>
         </table>
      </div>
      """
   }

   /// Replaces every `{{PRICING_TABLE:<name>}}` token in `html` with a rendered
   /// table. `<name>` maps to `Content/Data/Pricing/<name>{.locale}.yaml` —
   /// default-locale files carry no suffix, every other locale uses `.<locale>`
   /// (the same convention as the feature YAMLs). Throws if a referenced data
   /// file is missing or malformed.
   static func resolvePricingTokens(in html: String, locale: String, context: BuildContext) throws -> String {
      guard html.contains("{{PRICING_TABLE:") else { return html }

      let defaultLang = context.config.effectiveDefaultLanguage
      let suffix = locale == defaultLang ? "" : ".\(locale)"
      let regex = try NSRegularExpression(pattern: #"\{\{PRICING_TABLE:([a-z0-9-]+)\}\}"#)

      var result = html
      let matches = regex.matches(in: result, range: NSRange(result.startIndex..., in: result))
      // Replace right-to-left so the ranges of earlier matches stay valid.
      for match in matches.reversed() {
         guard let tokenRange = Range(match.range, in: result),
               let nameRange = Range(match.range(at: 1), in: result)
         else { continue }
         let name = String(result[nameRange])
         let yamlPath = context.projectDirectory
            .appendingPathComponent(context.config.contentDirectory)
            .appendingPathComponent("Data")
            .appendingPathComponent("Pricing")
            .appendingPathComponent("\(name)\(suffix).yaml")
         let yamlData = try Data(contentsOf: yamlPath)
         let table = try YAMLDecoder().decode(PricingTable.self, from: yamlData)
         result.replaceSubrange(tokenRange, with: self.renderTable(table))
      }
      return result
   }

   /// Converts a raw cell value into rendered HTML:
   /// - `✓` / `yes` → green "included" pill
   /// - `✗` / `no` → red "not included" pill
   /// - `limited` / `partial` / `~` → amber "limited" pill
   /// - `-` → neutral "not applicable" pill
   /// - `**text**` → bold text
   /// - anything else → plain text
   static func markCell(_ raw: String) -> String {
      let trimmed = raw.trimmingCharacters(in: .whitespaces)
      let lower = trimmed.lowercased()
      if trimmed == "✓" || lower == "yes" {
         return "<span class=\"feature-pricing-pill is-yes\" aria-label=\"included\">✓</span>"
      }
      if trimmed == "✗" || lower == "no" {
         return "<span class=\"feature-pricing-pill is-no\" aria-label=\"not included\">✗</span>"
      }
      if lower == "limited" || lower == "partial" || trimmed == "~" {
         // FontAwesome 6 Free Solid "minus" — clean horizontal bar, parallels ✓/✗ visual weight.
         let svg = #"<svg class="feature-pricing-pill-icon" viewBox="0 0 448 512" aria-hidden="true"><path fill="currentColor" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>"#
         return "<span class=\"feature-pricing-pill is-limited\" aria-label=\"limited\">\(svg)</span>"
      }
      if trimmed == "-" {
         return "<span class=\"feature-pricing-pill is-na\" aria-label=\"not applicable\">-</span>"
      }
      if trimmed.count > 4, trimmed.hasPrefix("**"), trimmed.hasSuffix("**") {
         let inner = String(trimmed.dropFirst(2).dropLast(2))
         return "<span class=\"feature-pricing-text\"><strong>\(inner.htmlEscaped)</strong></span>"
      }
      return "<span class=\"feature-pricing-text\">\(trimmed.htmlEscaped)</span>"
   }
}
