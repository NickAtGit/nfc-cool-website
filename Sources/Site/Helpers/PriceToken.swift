import Foundation
import SiteKit

/// Region-aware web prices. Pages and pricing YAML cells write
/// `{{PRICE:<product>:<interval>}}` or `{{PRICE:<product>:<interval>:<quantity>}}`
/// (product: a key of `prices.json`, e.g. `seat`, `page`, `page_pro` = Page Plus,
/// `page_ordering` = Page Pro; interval: `month`, `year`, or `saving` = 12 months minus a year).
///
/// The token becomes `<span class="price" data-price=… data-interval=…>` holding the price a
/// visitor of unknown country sees: tier A in the product's base currency, written the way
/// `prices.json`'s `formats` says for the page's language. `/prices/prices.mjs` (loaded by
/// `RegionPriceScriptProcessor`) then swaps in the visitor's own. Both read the same JSON, so the
/// text only changes when the visitor's region really changes the price.
enum PriceToken {
   private struct Format: Decodable {
      let symbol: String
      let decimal: String
      let digits: String?
   }

   private struct Data_: Decodable {
      let baseCurrency: [String: String]
      let amounts: [String: [String: [String: String]]]
      let symbols: [String: String]
      let formats: [String: Format]
   }

   struct UnknownPrice: Error, CustomStringConvertible {
      let token: String
      var description: String { "Unknown price token \(self.token): product or interval not in Content/StaticFiles/prices/prices.json" }
   }

   private static let pattern = try! NSRegularExpression(pattern: #"\{\{PRICE:([a-z_]+):(month|year|saving|[a-z]+)(?::(\d+))?\}\}"#)

   private static func load(_ context: BuildContext) throws -> Data_ {
      let url = context.projectDirectory
         .appendingPathComponent(context.config.contentDirectory)
         .appendingPathComponent("StaticFiles/prices/prices.json")
      return try JSONDecoder().decode(Data_.self, from: Data(contentsOf: url))
   }

   /// Replaces every `{{PRICE:…}}` token in `html`. Throws on an unknown product or interval.
   static func resolveTokens(in html: String, locale: String, context: BuildContext) throws -> String {
      guard html.contains("{{PRICE:") else { return html }
      let data = try self.load(context)
      var result = html
      let matches = self.pattern.matches(in: result, range: NSRange(result.startIndex..., in: result))
      for match in matches.reversed() {
         guard let range = Range(match.range, in: result),
               let productRange = Range(match.range(at: 1), in: result),
               let intervalRange = Range(match.range(at: 2), in: result)
         else { continue }
         let token = String(result[range])
         let product = String(result[productRange])
         let interval = String(result[intervalRange])
         let quantity = Range(match.range(at: 3), in: result).flatMap { Int(result[$0]) }
         guard let tierA = data.amounts[product]?["A"],
               let month = tierA["month"].flatMap(self.cents), let year = tierA["year"].flatMap(self.cents),
               let currency = data.baseCurrency[product], let symbol = data.symbols[currency]
         else { throw UnknownPrice(token: token) }
         let each: Int
         switch interval {
         case "month": each = month
         case "year": each = year
         case "saving": each = month * 12 - year
         default: throw UnknownPrice(token: token)
         }
         let text = self.format(cents: each * (quantity ?? 1), symbol: symbol, locale: locale, data: data)
         let quantityAttribute = quantity.map { " data-quantity=\"\($0)\"" } ?? ""
         let span = "<span class=\"price\" data-price=\"\(product)\" data-interval=\"\(interval)\"\(quantityAttribute)>\(text)</span>"
         result.replaceSubrange(range, with: span)
      }
      return result
   }

   private static func cents(_ amount: String) -> Int? {
      Decimal(string: amount).map { NSDecimalNumber(decimal: $0 * 100).intValue }
   }

   /// Mirrors `formatPrice` in `prices.mjs`: whole amounts without decimals.
   private static func format(cents: Int, symbol: String, locale: String, data: Data_) -> String {
      let language = locale.split(whereSeparator: { $0 == "-" || $0 == "_" }).first.map { String($0).lowercased() } ?? "en"
      guard let format = data.formats[language] ?? data.formats["en"] else { return "\(symbol)\(cents / 100)" }
      var number = cents % 100 == 0 ? "\(cents / 100)" : String(format: "%d%@%02d", cents / 100, format.decimal, cents % 100)
      if let digits = format.digits.map(Array.init) {
         number = String(number.map { $0.wholeNumberValue.map { digits[$0] } ?? $0 })
      }
      return format.symbol == "after" ? "\(number)\u{00A0}\(symbol)" : "\(symbol)\(number)"
   }
}
