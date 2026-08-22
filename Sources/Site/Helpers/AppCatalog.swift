import Foundation

/// The catalog of "other" apps promoted under `/apps/{slug}/` - everything the
/// developer ships beyond the two flagships (Tools + Business Card, which have
/// their own pages and their own rating data in `SiteConfig.yaml`).
///
/// Each entry feeds the per-app `SoftwareApplication` JSON-LD on its subpage.
/// Ratings are refreshed manually from App Store Connect / Play Console every
/// few months, same policy as the `apps:` block in `SiteConfig.yaml`. Entries
/// with fewer than 15 ratings carry `rating: nil` - a tiny sample makes the
/// `aggregateRating` markup look gamed, so it is withheld until organic count
/// catches up.
struct AppCatalogEntry: Sendable {
   let slug: String
   let name: String
   /// schema.org `operatingSystem` value, e.g. "iOS" or "ANDROID".
   let operatingSystem: String
   /// schema.org `applicationCategory`, e.g. "UtilitiesApplication".
   let applicationCategory: String
   /// Icon path relative to the site root.
   let iconPath: String
   /// Store listing URL (App Store or Google Play) - also the `downloadUrl`.
   let storeURL: String
   let rating: AppRating?
}

enum AppCatalog {
   /// Keyed lookup for `MarketingPageRenderer` - `page.slug` is `apps/{slug}`.
   static func entry(forPageSlug pageSlug: String) -> AppCatalogEntry? {
      guard pageSlug.hasPrefix("apps/") else { return nil }
      let slug = String(pageSlug.dropFirst("apps/".count))
      return self.entries.first { $0.slug == slug }
   }

   static let entries: [AppCatalogEntry] = [
      AppCatalogEntry(
         slug: "qr-code-scanner",
         name: "QR Code Scanner by NFC.cool",
         operatingSystem: "iOS",
         applicationCategory: "UtilitiesApplication",
         iconPath: "/assets/images/Apps/qr-code-scanner/icon.webp",
         storeURL: "https://apps.apple.com/app/id6745910962",
         rating: nil // 3.7 x 3 ratings as of 2026-08 - below the 15-count bar
      ),
      AppCatalogEntry(
         slug: "3d-scanner",
         name: "3D Object & Room Scanner",
         operatingSystem: "iOS",
         applicationCategory: "UtilitiesApplication",
         iconPath: "/assets/images/Apps/3d-scanner/icon.webp",
         storeURL: "https://apps.apple.com/app/id6480382590",
         rating: AppRating(ratingValue: 4.3, ratingCount: 27)
      ),
      AppCatalogEntry(
         slug: "flight-tracker",
         name: "1st Class - Flight Tracker",
         operatingSystem: "iOS",
         applicationCategory: "TravelApplication",
         iconPath: "/assets/images/Apps/flight-tracker/icon.webp",
         storeURL: "https://apps.apple.com/app/id6760440680",
         rating: nil // launched 2026, no ratings yet
      ),
      AppCatalogEntry(
         slug: "pokemon-quiz",
         name: "PvP Trainer Pok\u{00E9}mon Quiz Game",
         operatingSystem: "iOS",
         applicationCategory: "GameApplication",
         iconPath: "/assets/images/Apps/pokemon-quiz/icon.webp",
         storeURL: "https://apps.apple.com/app/id1519106589",
         rating: AppRating(ratingValue: 4.6, ratingCount: 90)
      ),
      AppCatalogEntry(
         slug: "ebike-monitor",
         name: "eBike Monitor for Shimano",
         operatingSystem: "iOS",
         applicationCategory: "SportsApplication",
         iconPath: "/assets/images/Apps/ebike-monitor/icon.webp",
         storeURL: "https://apps.apple.com/app/id1671466248",
         rating: AppRating(ratingValue: 4.8, ratingCount: 15)
      ),
      AppCatalogEntry(
         slug: "mondego-move",
         name: "Mondego Move",
         // Beta on both platforms: open testing on Google Play (public listing, hence the
         // storeURL), TestFlight on iOS - flip to "ANDROID, IOS" once the App Store version ships.
         operatingSystem: "ANDROID",
         applicationCategory: "TravelApplication",
         iconPath: "/assets/images/Apps/mondego-move/icon.webp",
         storeURL: "https://play.google.com/store/apps/details?id=pt.coimbra.metromondego",
         rating: nil // Play Console shows no public rating yet
      ),
   ]
}
