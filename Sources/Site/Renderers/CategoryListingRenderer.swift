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
      case ("nfc", "en"):                return "Articles about NFC tags, NDEF records, and tap interactions - choosing tags, writing them, and building NFC-powered automations on iPhone and Android."
      case ("nfc", "de"):                return "Artikel über NFC-Tags, NDEF-Datensätze und Tap-Interaktionen - Tags auswählen, beschreiben und NFC-Automatisierungen auf iPhone und Android bauen."
      case ("nfc", "ja"):                return "NFCタグ、NDEFレコード、タップ操作に関する記事 - タグの選び方、書き込み方、そしてiPhoneとAndroidでNFCを使った自動化を構築する方法を紹介します。"
      case ("qr-barcode", "en"):         return "Articles about QR codes, barcode formats (EAN, UPC, Code 128, Aztec, PDF417), and designing branded QR codes in the NFC.cool QR Code Studio."
      case ("qr-barcode", "de"):         return "Artikel über QR-Codes, Barcode-Formate (EAN, UPC, Code 128, Aztec, PDF417) und das Gestalten von Marken-QR-Codes im NFC.cool QR Code Studio."
      case ("qr-barcode", "ja"):         return "QRコード、バーコード形式(EAN、UPC、Code 128、Aztec、PDF417)、そしてNFC.cool QR Code Studioでブランドに合わせたQRコードをデザインする方法に関する記事。"
      case ("document", "en"):           return "Articles about document scanning, on-device OCR, and producing searchable, indexed PDFs with the NFC.cool Tools document scanner on iPhone and iPad."
      case ("document", "de"):           return "Artikel über Dokumentenscannen, On-Device-OCR und das Erstellen durchsuchbarer PDFs mit dem NFC.cool Tools Dokumenten-Scanner auf dem iPhone."
      case ("document", "ja"):           return "ドキュメントスキャン、オンデバイスOCR、そしてNFC.cool ToolsのドキュメントスキャナーでiPhoneから検索可能なPDFを作成する方法に関する記事。"
      case ("3d-scan", "en"):            return "Articles about photogrammetry, LiDAR-based room mapping, and exporting textured 3D models (USDZ, OBJ, STL, PLY) for AR, 3D printing, and visualisation on iPhone."
      case ("3d-scan", "de"):            return "Artikel über Photogrammetrie, LiDAR-basiertes Raum-Mapping und den Export von 3D-Modellen (USDZ, OBJ, STL, PLY) für AR und 3D-Druck auf dem iPhone."
      case ("3d-scan", "ja"):            return "フォトグラメトリ、LiDARによる空間マッピング、そしてiPhoneでARや3D印刷向けに3Dモデル(USDZ、OBJ、STL、PLY)をエクスポートする方法に関する記事。"
      case ("business-card", "en"):      return "Articles about NFC.cool Business Card and digital networking - NFC taps, AppClips, Apple Wallet passes, and replacing paper cards at conferences and meetups."
      case ("business-card", "de"):      return "Artikel über NFC.cool Business Card und digitales Networking - NFC-Taps, AppClips, Apple Wallet Pässe und der Verzicht auf Papierkarten bei Konferenzen und Meetups."
      case ("business-card", "ja"):      return "NFC.cool Business Cardとデジタルネットワーキングに関する記事 - NFCタップ、AppClip、Apple Walletパス、そしてカンファレンスやミートアップで紙の名刺を置き換える方法を紹介します。"
      default:                           return nil  // Let SiteKit fall back to the English description from SiteConfig.yaml
      }
   }
}
