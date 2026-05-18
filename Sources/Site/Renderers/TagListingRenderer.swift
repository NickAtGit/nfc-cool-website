import Foundation
import SiteKit

/// Custom tag listing renderer.
///
/// SiteKit's built-in `TagListingRenderer` emits per-tag pages with its
/// generic `sk-tag-*` markup (no matching site CSS, a raw-slug `<h1>`) and
/// links posts via `DefaultURLRouter.articlePath(for:)` - which builds
/// `/{category}/{slug}/` for any post carrying a `category:` value and so
/// 404s on this section-based site. This renderer replaces it entirely:
///
/// - Per-tag pages and the tags index reuse the `.blog-card` / hero markup
///   from `BlogIndexRenderer`, so they look identical to `/blog/`.
/// - Post links resolve through `pagePath(for:in:)` (section-aware), with
///   the same locale-fallback handling as `BlogIndexRenderer.href` so an
///   untranslated post linked from a `/de/` or `/ja/` tag page points at
///   its EN canonical URL instead of a 404.
/// - Tag display names and descriptions are localized here; SiteKit's
///   `tagDisplayNames` config is a single non-localized map, unusable on a
///   trilingual site.
struct TagListingRenderer: Renderer {
   func render(context: BuildContext) throws -> [OutputFile] {
      guard !context.tags.isEmpty else { return [] }

      let locale = context.uiStrings.locale
      let helper = OutputFileRenderer(context: context)
      let defaultLang = context.config.effectiveDefaultLanguage
      let dateFormatter = Self.dateFormatter(for: locale)

      // `context.tags` flattens pages across every section, so map each
      // page's source file to its owning section - post links need the
      // section's `urlPrefix` to resolve (`/blog/` vs `/changelog/`).
      var sectionBySource: [URL: ContentSection] = [:]
      for section in context.sections {
         for page in section.pages { sectionBySource[page.sourcePath] = section }
      }

      var files: [OutputFile] = []
      for (tag, pages) in context.tags.sorted(by: { $0.key < $1.key }) {
         files.append(self.renderTagPage(
            tag: tag,
            pages: pages,
            sectionBySource: sectionBySource,
            context: context,
            helper: helper,
            locale: locale,
            defaultLang: defaultLang,
            dateFormatter: dateFormatter
         ))
      }
      files.append(self.renderTagsIndex(context: context, helper: helper, locale: locale))
      return files
   }

   // MARK: - Per-tag page

   private func renderTagPage(
      tag: String,
      pages: [Page],
      sectionBySource: [URL: ContentSection],
      context: BuildContext,
      helper: OutputFileRenderer,
      locale: String,
      defaultLang: String,
      dateFormatter: DateFormatter
   ) -> OutputFile {
      let displayName = Self.displayName(for: tag, locale: locale)
      let description = Self.tagDescription(for: tag, locale: locale)
      let tagPath = context.router.tagPath(for: tag)

      let sortedPages = pages.sorted { (a, b) -> Bool in
         (a.date ?? Date.distantPast) > (b.date ?? Date.distantPast)
      }

      let resolved: [(page: Page, href: String)] = sortedPages.compactMap { page in
         guard let section = sectionBySource[page.sourcePath] else { return nil }
         return (page, self.href(for: page, in: section, context: context, defaultLang: defaultLang))
      }

      let cards = resolved.map { entry in
         self.card(for: entry.page, href: entry.href, locale: locale, dateFormatter: dateFormatter)
      }.joined()

      let jsonLD = StructuredData.collectionPageGraph(
         baseURL: context.config.baseURL,
         homePath: context.router.homePath(),
         sectionName: displayName,
         sectionPath: tagPath,
         description: description,
         items: resolved.map { (title: $0.page.title, url: "\(context.config.baseURL)\($0.href)") }
      )

      let head = helper.buildHead(
         title: "\(displayName) - \(context.config.name)",
         description: description,
         canonicalURL: "\(context.config.baseURL)\(tagPath)",
         ogType: "website",
         image: "\(context.config.baseURL)/assets/images/og-landing.webp",
         imageAlt: "\(displayName) - \(context.config.name)",
         jsonLD: jsonLD,
         hreflang: helper.buildHreflangForAllLanguages { $0.tagPath(for: tag) }
      )

      let heroText = """
      <p class="tag-page-back"><a href="\(context.router.tagsIndexPath())">\(Self.backLabel(locale: locale).htmlEscaped)</a></p>
      \(renderTitleWithBrandTail(displayName, tagName: "h1", classAttr: "blog-index-title"))
      <p class="blog-index-subtitle">\(description.htmlEscaped)</p>
      """
      let heroHTML = renderPageHero(
         modifier: "blog-index-hero",
         text: heroText,
         visual: Self.brandVisual(alt: displayName)
      )
      let body = """
      <main class="sk-main blog-index">
         \(heroHTML)
         <section class="blog-index-grid-section">
            <div class="landing-container">
               <div class="blog-card-grid">\(cards)</div>
            </div>
         </section>
      </main>
      """

      let html = helper.renderPageShell(head: head, bodyClass: "sk-page-tag blog-listing", content: body)
      return Self.outputFile(for: tagPath, html: html, outputDirectory: context.outputDirectory)
   }

   // MARK: - Tags index

   private func renderTagsIndex(context: BuildContext, helper: OutputFileRenderer, locale: String) -> OutputFile {
      let indexPath = context.router.tagsIndexPath()
      let heading = Self.indexHeading(locale: locale)
      let description = Self.indexDescription(locale: locale)

      // Most-used tags first so the index leads with the deepest topics.
      let sortedTags = context.tags.sorted { lhs, rhs in
         lhs.value.count != rhs.value.count ? lhs.value.count > rhs.value.count : lhs.key < rhs.key
      }

      let chips = sortedTags.map { tag, pages in
         let name = Self.displayName(for: tag, locale: locale)
         return """
         <li><a class="tag-index-chip" href="\(context.router.tagPath(for: tag))">\(name.htmlEscaped)<span class="tag-index-count">\(pages.count)</span></a></li>
         """
      }.joined()

      let jsonLD = StructuredData.collectionPageGraph(
         baseURL: context.config.baseURL,
         homePath: context.router.homePath(),
         sectionName: heading,
         sectionPath: indexPath,
         description: description,
         items: sortedTags.map { tag, _ in
            (title: Self.displayName(for: tag, locale: locale),
             url: "\(context.config.baseURL)\(context.router.tagPath(for: tag))")
         }
      )

      let head = helper.buildHead(
         title: "\(heading) - \(context.config.name)",
         description: description,
         canonicalURL: "\(context.config.baseURL)\(indexPath)",
         ogType: "website",
         image: "\(context.config.baseURL)/assets/images/og-landing.webp",
         imageAlt: "\(heading) - \(context.config.name)",
         jsonLD: jsonLD,
         hreflang: helper.buildHreflangForAllLanguages { $0.tagsIndexPath() }
      )

      let heroText = """
      \(renderTitleWithBrandTail(heading, tagName: "h1", classAttr: "blog-index-title"))
      <p class="blog-index-subtitle">\(description.htmlEscaped)</p>
      """
      let heroHTML = renderPageHero(
         modifier: "blog-index-hero",
         text: heroText,
         visual: Self.brandVisual(alt: heading)
      )
      let body = """
      <main class="sk-main blog-index">
         \(heroHTML)
         <section class="blog-index-grid-section">
            <div class="landing-container">
               <ul class="tag-index-list">\(chips)</ul>
            </div>
         </section>
      </main>
      """

      let html = helper.renderPageShell(head: head, bodyClass: "sk-page-tags blog-listing", content: body)
      return Self.outputFile(for: indexPath, html: html, outputDirectory: context.outputDirectory)
   }

   // MARK: - Card markup (mirrors BlogIndexRenderer)

   private func card(for page: Page, href: String, locale: String, dateFormatter: DateFormatter) -> String {
      let dateText = page.date.map { dateFormatter.string(from: $0) } ?? ""
      let summary = (page.summary ?? "").htmlEscaped
      let tags = page.tags.prefix(3).map { tag in
         "<span class=\"blog-card-tag\">\(Self.displayName(for: tag, locale: locale).htmlEscaped)</span>"
      }.joined()
      let imageHTML: String = {
         if let img = page.image {
            let alt = (page.imageAlt ?? page.title).htmlEscaped
            return "<div class=\"blog-card-image\"><img src=\"\(img)\" alt=\"\(alt)\" loading=\"lazy\"/></div>"
         }
         return """
         <div class="blog-card-image is-placeholder" aria-hidden="true">
            <img src="/assets/theme/images/nfc-secondary-logo-white.webp" alt=""/>
         </div>
         """
      }()
      return """
      <a class="blog-card" href="\(href)">
         \(imageHTML)
         <div class="blog-card-body">
            <p class="blog-card-meta">\(dateText.htmlEscaped)</p>
            <h3 class="blog-card-title">\(page.title.htmlEscaped)</h3>
            \(summary.isEmpty ? "" : "<p class=\"blog-card-summary\">\(summary)</p>")
            \(tags.isEmpty ? "" : "<div class=\"blog-card-tags\">\(tags)</div>")
         </div>
      </a>
      """
   }

   /// Resolves the URL for a post card. Mirrors `BlogIndexRenderer.href`:
   /// a post falling back to the default language's source file links to
   /// the EN canonical URL, since `BlogPostRenderer` skips emitting the
   /// localized URL and the `/de/...` path would 404.
   private func href(for page: Page, in section: ContentSection, context: BuildContext, defaultLang: String) -> String {
      let isFallback: Bool = {
         guard page.locale != defaultLang else { return false }
         return !page.sourcePath.lastPathComponent.contains(".\(page.locale).")
      }()
      guard isFallback else {
         return context.router.pagePath(for: page, in: section.config)
      }
      let sectionPath = context.router.sectionListingPath(for: section.config)
      let prefix = "/\(page.locale)/"
      let enSectionPath = sectionPath.hasPrefix(prefix)
         ? "/" + sectionPath.dropFirst(prefix.count)
         : sectionPath
      return "\(enSectionPath)\(page.slug)/"
   }

   // MARK: - Helpers

   private static func brandVisual(alt: String) -> PageHeroVisual {
      PageHeroVisual(
         src: "/assets/theme/images/nfc-secondary-logo-white.webp",
         alt: alt.htmlEscaped,
         isBrand: true
      )
   }

   private static func outputFile(for path: String, html: String, outputDirectory: URL) -> OutputFile {
      let relPath = String(path.dropFirst())
      let outputPath = outputDirectory
         .appendingPathComponent(relPath)
         .appendingPathComponent("index.html")
      return OutputFile(outputPath: outputPath, content: html)
   }

   private static func dateFormatter(for locale: String) -> DateFormatter {
      let df = DateFormatter()
      df.dateStyle = .long
      df.timeStyle = .none
      df.locale = Locale(identifier: locale)
      return df
   }

   // MARK: - Localization tables

   /// Human-readable tag name per locale. Unknown slugs fall back to the
   /// slug itself so a stray tag never crashes the build.
   static func displayName(for slug: String, locale: String) -> String {
      switch (slug, locale) {
      case ("nfc-tags", _):              return "NFC Tags"
      case ("business-cards", "de"):     return "Visitenkarten"
      case ("business-cards", "ja"):     return "デジタル名刺"
      case ("business-cards", _):        return "Business Cards"
      case ("qr-codes", _):              return "QR Codes"
      case ("iphone", _):                return "iPhone"
      case ("android", _):               return "Android"
      case ("guides", "de"):             return "Anleitungen"
      case ("guides", "ja"):             return "ガイド"
      case ("guides", _):                return "Guides"
      case ("privacy", "de"):            return "Datenschutz"
      case ("privacy", "ja"):            return "プライバシー"
      case ("privacy", _):               return "Privacy"
      case ("networking", "ja"):         return "ネットワーキング"
      case ("networking", _):            return "Networking"
      case ("automation", "de"):         return "Automatisierung"
      case ("automation", "ja"):         return "自動化"
      case ("automation", _):            return "Automation"
      case ("industry", "de"):           return "Branchen"
      case ("industry", "ja"):           return "業界"
      case ("industry", _):              return "Industry"
      case ("announcements", "de"):      return "Neuigkeiten"
      case ("announcements", "ja"):      return "お知らせ"
      case ("announcements", _):         return "Announcements"
      default:                           return slug
      }
   }

   /// One-sentence tag summary, used for the hero subtitle and the
   /// `<meta name="description">` of each per-tag page.
   private static func tagDescription(for slug: String, locale: String) -> String {
      switch (slug, locale) {
      case ("nfc-tags", "de"):           return "Anleitungen und How-tos zu NFC-Tags - NTAG-Chips auswählen, NDEF-Datensätze beschreiben und Tap-Interaktionen auf iPhone und Android bauen."
      case ("nfc-tags", "ja"):           return "NFCタグに関するガイドとハウツー - NTAGチップの選び方、NDEFレコードの書き込み、iPhoneとAndroidでのタップ操作の構築方法を紹介します。"
      case ("nfc-tags", _):              return "Guides and how-tos on NFC tags - choosing NTAG chips, writing NDEF records, and building tap-to-trigger interactions on iPhone and Android."
      case ("business-cards", "de"):     return "Alles über digitale Visitenkarten - NFC-Taps, App Clips und der Verzicht auf Papierkarten bei Konferenzen, im Team und in jeder Branche."
      case ("business-cards", "ja"):     return "デジタル名刺のすべて - NFCタップ、App Clip、そしてカンファレンスやチーム、各業界で紙の名刺を置き換える方法を紹介します。"
      case ("business-cards", _):        return "Everything on digital business cards - NFC taps, App Clips, and replacing paper cards at conferences, for teams, and across industries."
      case ("qr-codes", "de"):           return "Artikel über QR-Codes und Barcodes - erstellen, im Branding gestalten und die Formate hinter jedem Scan verstehen."
      case ("qr-codes", "ja"):           return "QRコードとバーコードに関する記事 - 生成方法、ブランドに合わせたデザイン、そしてスキャンを支える各種フォーマットを紹介します。"
      case ("qr-codes", _):              return "Articles on QR codes and barcodes - generating them, designing branded codes, and the formats behind every scan."
      case ("iphone", "de"):             return "NFC, Scannen und digitale Visitenkarten auf iPhone, iPad und Mac mit der NFC.cool Tools App."
      case ("iphone", "ja"):             return "NFC.cool ToolsアプリによるiPhone、iPad、MacでのNFC、スキャン、デジタル名刺機能。"
      case ("iphone", _):                return "NFC, scanning, and digital business card features on iPhone, iPad, and Mac with the NFC.cool Tools app."
      case ("android", "de"):            return "NFC-Scannen und digitale Visitenkarten auf Android mit der NFC.cool Tools App."
      case ("android", "ja"):            return "NFC.cool ToolsアプリによるAndroidでのNFCスキャンとデジタル名刺。"
      case ("android", _):               return "NFC scanning and digital business cards on Android with the NFC.cool Tools app."
      case ("guides", "de"):             return "Schritt-für-Schritt-Anleitungen für NFC-, QR-, Dokumenten- und 3D-Scannen auf dem Smartphone."
      case ("guides", "ja"):             return "スマートフォンでのNFC、QR、ドキュメント、3Dスキャンのステップバイステップのハウツー。"
      case ("guides", _):                return "Step-by-step how-tos for NFC, QR, document, and 3D scanning on your phone."
      case ("privacy", "de"):            return "Wie NFC.cool mit deinen Daten umgeht - Verarbeitung auf dem Gerät, Verschlüsselung und datenschutzfreundliche digitale Visitenkarten."
      case ("privacy", "ja"):            return "NFC.coolがデータをどう扱うか - デバイス上での処理、暗号化、プライバシーを最優先したデジタル名刺。"
      case ("privacy", _):               return "How NFC.cool handles your data - on-device processing, encryption, and privacy-first digital business cards."
      case ("networking", "de"):         return "Cleveres Networking mit NFC - Kontakte teilen, App Clips nutzen und Papier-Visitenkarten bei Events ablösen."
      case ("networking", "ja"):         return "NFCでもっとスマートなネットワーキング - 連絡先の共有、App Clip、イベントでの紙の名刺の置き換え。"
      case ("networking", _):            return "Smarter networking with NFC - sharing contacts, App Clips, and ditching paper business cards at events."
      case ("automation", "de"):         return "NFC-Tags zur Automatisierung von Zuhause, Workflows und Geräten - von Smart-Home-Triggern bis zu 3D-Drucker-Spulen."
      case ("automation", "ja"):         return "NFCタグで家、ワークフロー、デバイスを自動化 - スマートホームのトリガーから3Dプリンターのスプールまで。"
      case ("automation", _):            return "Using NFC tags to automate your home, workflows, and devices - from smart-home triggers to 3D-printer spools."
      case ("industry", "de"):           return "Wie Makler, Berater, Fachkräfte im Gesundheitswesen und andere Branchen NFC.cool im Arbeitsalltag nutzen."
      case ("industry", "ja"):           return "不動産業者、コンサルタント、医療従事者など、さまざまな分野でNFC.coolが現場でどう使われているか。"
      case ("industry", _):              return "How real estate agents, consultants, healthcare professionals, and other fields use NFC.cool in the field."
      case ("announcements", "de"):      return "Produktneuigkeiten von NFC.cool - neue App-Releases, Plattform-Starts und woran wir als Nächstes arbeiten."
      case ("announcements", "ja"):      return "NFC.coolの製品ニュース - 新しいアプリのリリース、プラットフォームの提供開始、そして次に作っているもの。"
      case ("announcements", _):         return "Product news from NFC.cool - new app releases, platform launches, and what we are building next."
      default:                           return ""
      }
   }

   private static func indexHeading(locale: String) -> String {
      switch locale {
      case "de": return "Themen"
      case "ja": return "タグ"
      default:   return "Tags"
      }
   }

   private static func indexDescription(locale: String) -> String {
      switch locale {
      case "de": return "Themen im NFC.cool Blog durchstöbern - Artikel zu NFC-Tags, QR-Codes, Barcodes, Dokumentenscannen, 3D-Erfassung und digitalen Visitenkarten für iPhone und Android."
      case "ja": return "NFC.coolブログの記事をトピック別に閲覧 - NFCタグ、QRコード、バーコード、ドキュメントスキャン、3Dキャプチャ、そしてiPhoneとAndroid向けのデジタル名刺に関する記事を紹介。"
      default:   return "Browse posts by topic on the NFC.cool blog - NFC tags, QR codes, barcodes, document scanning, 3D capture, and digital business cards for iPhone and Android."
      }
   }

   private static func backLabel(locale: String) -> String {
      switch locale {
      case "de": return "← Alle Themen"
      case "ja": return "← すべてのタグ"
      default:   return "← All Tags"
      }
   }
}
