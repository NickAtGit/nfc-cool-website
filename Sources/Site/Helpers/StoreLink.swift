import Foundation

/// Builds outbound App Store and Google Play URLs with consistent campaign
/// attribution so reports in App Store Connect and Play Console can tell us
/// which page on the site converted - not just which locale.
///
/// Format:
///   - campaign id  = "{page}-{locale}"  (e.g. "web-home-en", "blog-namedrop-vs-nfc-business-cards-ja")
///   - App Store    = ?pt=106913804&ct={campaign}&mt=8
///   - Google Play  = ?referrer=utm_source=nfc.cool&utm_medium={channel}&utm_campaign={campaign}
///     where channel is `blog` when the page id starts with "blog-", else `web`.
///
/// Hyphens-only because SEO audits flag underscores even inside query strings.
enum StoreLink {
   enum App {
      /// NFC.cool Tools - full toolkit. iOS id 1249686798, Android `cool.nfc`.
      case tools
      /// NFC.cool Business Card - standalone iOS app. iOS id 6502926572.
      /// On Android, Business Card features live inside Tools (`cool.nfc`),
      /// so googlePlay(.businessCard, ...) returns the Tools Play Store URL
      /// with a business-card-flavoured campaign tag.
      case businessCard
   }

   /// Provider Token for App Store campaign attribution (constant across the brand).
   private static let appleProviderToken = "106913804"
   private static let androidPackageId = "cool.nfc"

   static func appStore(app: App, page: String, locale: String) -> String {
      let appID: String
      switch app {
      case .tools: appID = "1249686798"
      case .businessCard: appID = "6502926572"
      }
      let campaign = "\(page)-\(locale)"
      return "https://apps.apple.com/app/apple-store/id\(appID)?pt=\(appleProviderToken)&ct=\(campaign)&mt=8"
   }

   static func googlePlay(app: App, page: String, locale: String) -> String {
      _ = app // both apps currently map to the same Android package
      let campaign = "\(page)-\(locale)"
      let channel = page.hasPrefix("blog-") ? "blog" : "web"
      // Encode the inner referrer payload exactly the way the existing site does:
      //   referrer=utm_source%3Dnfc.cool%26utm_medium%3D{channel}%26utm_campaign%3D{campaign}
      let referrer = "utm_source%3Dnfc.cool%26utm_medium%3D\(channel)%26utm_campaign%3D\(campaign)"
      return "https://play.google.com/store/apps/details?id=\(androidPackageId)&referrer=\(referrer)"
   }
}
