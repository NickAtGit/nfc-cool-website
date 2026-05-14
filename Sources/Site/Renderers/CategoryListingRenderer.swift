import Foundation
import SiteKit

/// Custom category listing renderer that swaps in locale-specific category
/// names and descriptions before delegating to SiteKit's built-in
/// `renderCategoryListing(category:pages:)`.
///
/// SiteKit's default `CategoryListingRenderer` reads `category.name` and
/// `category.description` straight from `SiteConfig.yaml`, which only holds
/// English strings. As a result the same `"Articles about NFC tags..."`
/// description ships at `/nfc/`, `/de/nfc/`, and `/ja/nfc/` — flagged by
/// SEO audits as duplicate content.
///
/// We solve this by constructing a fresh `CategoryConfig` per render with
/// the locale's translated `name` + `description`, then handing it to
/// SiteKit's helper. No HTML duplication; we only own the translation
/// table.
struct CategoryListingRenderer: Renderer {
   func render(context: BuildContext) throws -> [OutputFile] {
      guard context.config.blogURLPrefix == nil else { return [] }

      let renderer = OutputFileRenderer(context: context)
      let locale = context.uiStrings.locale

      let pagesByCategory = Dictionary(grouping: context.articles) { $0.category }
      var files: [OutputFile] = []

      for categoryConfig in context.config.categories {
         let localized = CategoryConfig(
            name: Self.localizedName(forSlug: categoryConfig.slug, locale: locale, fallback: categoryConfig.name),
            slug: categoryConfig.slug,
            description: Self.localizedDescription(forSlug: categoryConfig.slug, locale: locale)
               ?? categoryConfig.description
         )
         let categoryPages = pagesByCategory[categoryConfig.slug] ?? []
         files.append(renderer.renderCategoryListing(category: localized, pages: categoryPages))
      }

      return files
   }

   // MARK: - Localization tables

   private static func localizedName(forSlug slug: String, locale: String, fallback: String) -> String {
      switch (slug, locale) {
      case ("nfc", _):                   return "NFC"
      case ("qr-barcode", "ja"):         return "QR・バーコード"
      case ("qr-barcode", _):            return "QR & Barcode"
      case ("document", "de"):           return "Dokumente"
      case ("document", "ja"):           return "ドキュメント"
      case ("document", _):              return "Document"
      case ("3d-scan", "de"):            return "3D-Scan"
      case ("3d-scan", "ja"):            return "3Dスキャン"
      case ("3d-scan", _):               return "3D Scan"
      case ("business-card", "de"):      return "Visitenkarte"
      case ("business-card", "ja"):      return "デジタル名刺"
      case ("business-card", _):         return "Business Card"
      default:                           return fallback
      }
   }

   private static func localizedDescription(forSlug slug: String, locale: String) -> String? {
      switch (slug, locale) {
      case ("nfc", "de"):                return "Artikel über NFC-Tags, NDEF-Datensätze und Tap-Interaktionen."
      case ("nfc", "ja"):                return "NFCタグ、NDEFレコード、タップ操作に関する記事。"
      case ("qr-barcode", "de"):         return "Artikel über QR-Codes, Barcode-Formate und das QR Code Studio."
      case ("qr-barcode", "ja"):         return "QRコード、バーコード形式、QR Code Studioに関する記事。"
      case ("document", "de"):           return "Artikel über Dokumentenscannen, OCR und PDFs."
      case ("document", "ja"):           return "ドキュメントスキャン、OCR、PDFに関する記事。"
      case ("3d-scan", "de"):            return "Artikel über Photogrammetrie, LiDAR und 3D-Modell-Export."
      case ("3d-scan", "ja"):            return "フォトグラメトリ、LiDAR、3Dモデルのエクスポートに関する記事。"
      case ("business-card", "de"):      return "Artikel über NFC.cool Business Card und digitales Networking."
      case ("business-card", "ja"):      return "NFC.cool Business Cardとデジタルネットワーキングに関する記事。"
      default:                           return nil  // Let SiteKit fall back to the English description from SiteConfig.yaml
      }
   }
}
