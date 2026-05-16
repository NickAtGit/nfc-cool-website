import Foundation
import SiteKit
import Yams

/// Minimal `SiteConfig.yaml` fragment for decoding the custom `apps:` block.
/// SiteKit's own `SiteConfig` decoder ignores unknown keys, so the rating
/// figures are re-read here independently (same approach as `LandingPageRenderer`).
private struct RatingsConfigFragment: Decodable {
   let apps: AppRatings?
}

/// Replace `{{RATINGS_*}}` tokens in emitted HTML with live figures derived
/// from the `apps:` rating block in `SiteConfig.yaml`. This gives the About
/// and Reviews pages a single source of truth: refresh the counts in
/// `SiteConfig.yaml` and every page picks them up on the next build.
///
/// Numbers are formatted per locale - `/de/` pages get `.` digit grouping and
/// `,` decimals; every other locale gets `,` grouping and `.` decimals.
///
/// Tokens:
/// - `{{RATINGS_TOTAL}}` - sum of every app's count, floored to the nearest 500
/// - `{{RATINGS_AVG}}` - count-weighted mean rating, one decimal
/// - `{{RATINGS_TOOLS_IOS_COUNT}}` / `{{RATINGS_TOOLS_IOS_VALUE}}`
/// - `{{RATINGS_TOOLS_ANDROID_COUNT}}` / `{{RATINGS_TOOLS_ANDROID_VALUE}}`
/// - `{{RATINGS_BUSINESS_CARD_COUNT}}` / `{{RATINGS_BUSINESS_CARD_VALUE}}`
struct RatingsCountProcessor: OutputProcessor {
   func process(outputDirectory: URL, projectDirectory: URL, themeConfig: ThemeConfig?) throws {
      let configPath = projectDirectory.appendingPathComponent("SiteConfig.yaml")
      guard let yaml = try? String(contentsOf: configPath, encoding: .utf8),
            let fragment = try? YAMLDecoder().decode(RatingsConfigFragment.self, from: yaml),
            let ratings = fragment.apps,
            let toolsIOS = ratings.toolsIOS,
            let toolsAndroid = ratings.toolsAndroid,
            let businessCard = ratings.businessCardIOS
      else { return }

      let apps = [toolsIOS, toolsAndroid, businessCard]
      let totalCount = apps.reduce(0) { $0 + $1.ratingCount }
      guard totalCount > 0 else { return }
      let totalFloored = (totalCount / 500) * 500
      let weightedAverage = apps.reduce(0.0) { $0 + $1.ratingValue * Double($1.ratingCount) } / Double(totalCount)

      let fileManager = FileManager.default
      guard let enumerator = fileManager.enumerator(at: outputDirectory, includingPropertiesForKeys: nil) else { return }

      for case let url as URL in enumerator where url.pathExtension == "html" {
         guard var html = try? String(contentsOf: url, encoding: .utf8), html.contains("{{RATINGS_") else { continue }

         let german = url.path.contains("/de/")
         let replacements: [String: String] = [
            "{{RATINGS_TOTAL}}": Self.integer(totalFloored, german: german),
            "{{RATINGS_AVG}}": Self.decimal(weightedAverage, places: 1, german: german),
            "{{RATINGS_TOOLS_IOS_COUNT}}": Self.integer(toolsIOS.ratingCount, german: german),
            "{{RATINGS_TOOLS_IOS_VALUE}}": Self.decimal(toolsIOS.ratingValue, places: 2, german: german),
            "{{RATINGS_TOOLS_ANDROID_COUNT}}": Self.integer(toolsAndroid.ratingCount, german: german),
            "{{RATINGS_TOOLS_ANDROID_VALUE}}": Self.decimal(toolsAndroid.ratingValue, places: 2, german: german),
            "{{RATINGS_BUSINESS_CARD_COUNT}}": Self.integer(businessCard.ratingCount, german: german),
            "{{RATINGS_BUSINESS_CARD_VALUE}}": Self.decimal(businessCard.ratingValue, places: 2, german: german),
         ]
         for (token, value) in replacements {
            html = html.replacingOccurrences(of: token, with: value)
         }
         try? html.write(to: url, atomically: true, encoding: .utf8)
      }
   }

   /// Group digits in threes - `.` separator for German pages, `,` elsewhere.
   private static func integer(_ value: Int, german: Bool) -> String {
      let separator = german ? "." : ","
      let digits = Array(String(value))
      var result = ""
      for (offset, digit) in digits.enumerated() {
         if offset != 0, (digits.count - offset).isMultiple(of: 3) { result.append(separator) }
         result.append(digit)
      }
      return result
   }

   /// Round to `places` decimals - `,` decimal separator for German pages.
   private static func decimal(_ value: Double, places: Int, german: Bool) -> String {
      let string = String(format: "%.\(places)f", value)
      return german ? string.replacingOccurrences(of: ".", with: ",") : string
   }
}
