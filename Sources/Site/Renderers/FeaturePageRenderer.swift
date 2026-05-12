import Foundation
import SiteKit
import Yams

/// Renders per-feature marketing/docs pages from YAML files at
/// Content/Data/Features/{slug}{.locale}.yaml.
///
/// One output is produced per (slug × locale) when a YAML for that combination
/// exists. Missing locale-specific YAMLs simply skip that page for that locale
/// (no fallback to default-language content — keeps locale boundaries honest).
struct FeaturePageRenderer: Renderer {
   /// Feature slugs to render. Each must have at least one YAML at
   /// `Content/Data/Features/{slug}.yaml` for the default locale.
   static let slugs: [String] = [
      "nfc-reader-writer",
      "qr-barcode-scanner",
      "document-scanner",
      "3d-room-scanner",
      "webhooks",
   ]

   func render(context: BuildContext) throws -> [OutputFile] {
      let locale = context.uiStrings.locale
      let defaultLang = context.config.effectiveDefaultLanguage
      let suffix = locale == defaultLang ? "" : ".\(locale)"
      let helper = OutputFileRenderer(context: context)

      var outputs: [OutputFile] = []

      for slug in Self.slugs {
         let yamlPath = context.projectDirectory
            .appendingPathComponent(context.config.contentDirectory)
            .appendingPathComponent("Data")
            .appendingPathComponent("Features")
            .appendingPathComponent("\(slug)\(suffix).yaml")

         guard FileManager.default.fileExists(atPath: yamlPath.path) else {
            continue
         }

         let yamlData = try Data(contentsOf: yamlPath)
         let feature = try YAMLDecoder().decode(FeatureData.self, from: yamlData)

         let pageTitle = "\(feature.hero.title) — \(context.config.name)"
         let basePath = context.router.homePath() // "/" or "/{locale}/"
         let pagePath = "\(basePath)features/\(slug)/"

         let head = helper.buildHead(
            title: pageTitle,
            description: feature.hero.subtitle,
            canonicalURL: context.config.baseURL + pagePath,
            ogType: "website",
            hreflang: helper.buildHreflangForAllLanguages { router in
               "\(router.homePath())features/\(slug)/"
            }
         )

         let appStoreURL = feature.appStoreURL ?? "https://ios.nfc.cool"
         let googlePlayURL = feature.googlePlayURL ?? "https://android.nfc.cool"
         let backLinkText = feature.backLinkText ?? "← All features"
         let featuresIndexPath = "\(basePath)features/"

         var sections: [String] = []
         sections.append(self.renderHero(feature.hero, slug: slug, backLinkText: backLinkText, backHref: featuresIndexPath))
         if let capabilities = feature.capabilities, !capabilities.isEmpty {
            sections.append(self.renderCapabilities(capabilities, title: feature.capabilitiesTitle))
         }
         if let shots = feature.screenshots, !shots.isEmpty {
            sections.append(self.renderScreenshots(shots))
         }
         if let body = feature.docsBody, !body.isEmpty {
            sections.append(self.renderDocsBody(body))
         }
         if let specs = feature.specs, !specs.isEmpty {
            sections.append(self.renderSpecs(specs, title: feature.specsTitle))
         }
         if let comparison = feature.comparison {
            sections.append(self.renderComparison(comparison))
         }
         if let reviews = feature.featuredReviews, !reviews.isEmpty {
            sections.append(self.renderFeaturedReviews(reviews, title: feature.featuredReviewsTitle))
         }
         if let faq = feature.faq, !faq.isEmpty {
            sections.append(self.renderFAQ(faq, title: feature.faqTitle))
         }
         if let cta = feature.cta {
            sections.append(self.renderCTA(cta, appStoreURL: appStoreURL, googlePlayURL: googlePlayURL))
         }

         let mainContent = "<main class=\"sk-main feature-page\">\(sections.joined())</main>"
         let html = helper.renderPageShell(
            head: head,
            bodyClass: "sk-page-feature feature",
            content: mainContent
         )

         let relativeBase = String(basePath.dropFirst()) // "" or "{locale}/"
         let outputPath = context.outputDirectory
            .appendingPathComponent(relativeBase)
            .appendingPathComponent("features")
            .appendingPathComponent(slug)
            .appendingPathComponent("index.html")

         outputs.append(OutputFile(outputPath: outputPath, content: html))
      }

      return outputs
   }

   // MARK: - Sections

   private func renderHero(_ hero: FeatureHero, slug: String, backLinkText: String, backHref: String) -> String {
      let platformsHTML: String = {
         guard let platforms = hero.platforms else { return "" }
         return PlatformBadge.render(platforms: platforms, wrapperClass: "feature-hero-platforms")
      }()
      let imageHTML: String = {
         guard let path = hero.heroImagePath else { return "" }
         return "<div class=\"feature-hero-visual\"><img src=\"\(path)\" alt=\"\(hero.title.htmlEscaped)\" loading=\"eager\" fetchpriority=\"high\"/></div>"
      }()
      return """
      <section class="feature-hero">
         <div class="landing-container">
            <p class="feature-breadcrumb"><a href="\(backHref)">\(backLinkText.htmlEscaped)</a></p>
            <div class="feature-hero-grid">
               <div class="feature-hero-text">
                  \(platformsHTML)
                  <h1 class="feature-hero-title">\(hero.title.htmlEscaped)</h1>
                  <p class="feature-hero-subtitle">\(hero.subtitle.htmlEscaped)</p>
               </div>
               \(imageHTML)
            </div>
         </div>
      </section>
      """
   }

   private func renderCapabilities(_ capabilities: [FeatureCapability], title: String?) -> String {
      let heading = (title ?? "").isEmpty ? "" : "<h2 class=\"landing-section-title\">\(title!.htmlEscaped)</h2>"
      let cards = capabilities.map { cap in
         """
         <article class="feature-capability-card">
            <h3>\(cap.title.htmlEscaped)</h3>
            <p>\(cap.description.htmlEscaped)</p>
         </article>
         """
      }.joined()
      return """
      <section class="feature-capabilities">
         <div class="landing-container">
            \(heading)
            <div class="feature-capabilities-grid">\(cards)</div>
         </div>
      </section>
      """
   }

   private func renderScreenshots(_ shots: [FeatureScreenshot]) -> String {
      let cards = shots.map { shot in
         let captionHTML = shot.caption.map { "<figcaption>\($0.htmlEscaped)</figcaption>" } ?? ""
         let alt = shot.alt ?? ""
         return """
         <figure class="feature-screenshot">
            <img src="\(shot.path)" alt="\(alt.htmlEscaped)" loading="lazy"/>
            \(captionHTML)
         </figure>
         """
      }.joined()
      return """
      <section class="feature-screenshots">
         <div class="landing-container">
            <div class="feature-screenshots-row">\(cards)</div>
         </div>
      </section>
      """
   }

   private func renderDocsBody(_ body: String) -> String {
      // The YAML field is plain markdown. SiteKit's MarkdownRenderer would be ideal,
      // but we already have it inline here — keep it simple: render basic paragraphs.
      // Authors can use raw HTML in the YAML field if they need rich structure.
      return """
      <section class="feature-docs">
         <div class="landing-container">
            <div class="feature-docs-body">\(body)</div>
         </div>
      </section>
      """
   }

   private func renderComparison(_ comparison: ComparisonTable) -> String {
      let heading = (comparison.title ?? "").isEmpty ? "" : "<h2 class=\"landing-section-title\">\(comparison.title!.htmlEscaped)</h2>"
      let iosHead = (comparison.iosHeader ?? "iOS").htmlEscaped
      let androidHead = (comparison.androidHeader ?? "Android").htmlEscaped
      let rows = comparison.rows.map { row in
         let feat = row.feature.htmlEscaped
         let ios = (row.ios ?? "—").htmlEscaped
         let android = (row.android ?? "—").htmlEscaped
         return """
         <tr>
            <th scope="row">\(feat)</th>
            <td>\(self.markComparisonCell(ios))</td>
            <td>\(self.markComparisonCell(android))</td>
         </tr>
         """
      }.joined()
      return """
      <section class="feature-comparison">
         <div class="landing-container">
            \(heading)
            <div class="feature-comparison-wrap">
               <table class="feature-comparison-table">
                  <thead>
                     <tr><th></th><th scope="col">\(iosHead)</th><th scope="col">\(androidHead)</th></tr>
                  </thead>
                  <tbody>\(rows)</tbody>
               </table>
            </div>
         </div>
      </section>
      """
   }

   /// Wrap simple status cell content in a small badge for richer rendering.
   /// Recognized tokens (case-insensitive): ✓, ✗, —, "yes", "no", "coming soon".
   private func markComparisonCell(_ raw: String) -> String {
      let trimmed = raw.trimmingCharacters(in: .whitespaces)
      let lower = trimmed.lowercased()
      if trimmed == "✓" || lower == "yes" {
         return "<span class=\"feature-comparison-pill is-yes\" aria-label=\"yes\">✓</span>"
      }
      if trimmed == "✗" || lower == "no" {
         return "<span class=\"feature-comparison-pill is-no\" aria-label=\"no\">✗</span>"
      }
      if trimmed == "—" || trimmed == "-" {
         return "<span class=\"feature-comparison-pill is-na\" aria-label=\"not applicable\">—</span>"
      }
      if lower.contains("coming") {
         return "<span class=\"feature-comparison-pill is-soon\">\(trimmed)</span>"
      }
      return "<span class=\"feature-comparison-text\">\(trimmed)</span>"
   }

   private func renderFeaturedReviews(_ reviews: [AppStoreReview], title: String?) -> String {
      let heading = (title ?? "").isEmpty ? "" : "<h2 class=\"landing-section-title\">\(title!.htmlEscaped)</h2>"
      let cards = reviews.map { review in
         let avatarHTML = review.avatarPath.map {
            "<img src=\"\($0)\" alt=\"\(review.author.htmlEscaped)\" width=\"40\" height=\"40\" loading=\"lazy\" class=\"landing-review-avatar\"/>"
         } ?? ""
         return """
         <div class="landing-review-card">
            <div class="landing-review-stars">★★★★★</div>
            <blockquote class="landing-review-quote">\(review.quote)</blockquote>
            <div class="landing-review-author">
               \(avatarHTML)
               <div>
                  <strong>\(review.author.htmlEscaped)</strong>
                  <span>\(review.location.htmlEscaped)</span>
               </div>
            </div>
         </div>
         """
      }.joined()
      return """
      <section class="feature-featured-reviews landing-reviews">
         <div class="landing-container">
            \(heading)
            <div class="landing-reviews-grid">\(cards)</div>
         </div>
      </section>
      """
   }

   private func renderSpecs(_ groups: [FeatureSpecGroup], title: String?) -> String {
      let heading = (title ?? "").isEmpty ? "" : "<h2 class=\"landing-section-title\">\(title!.htmlEscaped)</h2>"
      let cards = groups.map { group in
         let items = group.items.map { "<li>\($0.htmlEscaped)</li>" }.joined()
         return """
         <div class="feature-spec-group">
            <h3>\(group.title.htmlEscaped)</h3>
            <ul>\(items)</ul>
         </div>
         """
      }.joined()
      return """
      <section class="feature-specs">
         <div class="landing-container">
            \(heading)
            <div class="feature-specs-grid">\(cards)</div>
         </div>
      </section>
      """
   }

   private func renderFAQ(_ items: [FAQItem], title: String?) -> String {
      let heading = (title ?? "").isEmpty ? "" : "<h2 class=\"landing-section-title\">\(title!.htmlEscaped)</h2>"
      let faqItems = items.map { item in
         """
         <details class="landing-faq-item">
            <summary>\(item.question.htmlEscaped)</summary>
            <p>\(item.answer.htmlEscaped)</p>
         </details>
         """
      }.joined()
      return """
      <section class="feature-faq landing-faq">
         <div class="landing-container">
            \(heading)
            \(faqItems)
         </div>
      </section>
      """
   }

   private func renderCTA(_ cta: FeatureCTA, appStoreURL: String, googlePlayURL: String?) -> String {
      let buttonHTML: String = {
         guard let label = cta.buttonText else { return "" }
         return "<a href=\"\(appStoreURL)\" class=\"landing-cta-button\">\(label.htmlEscaped)</a>"
      }()
      return """
      <section class="feature-cta landing-final-cta">
         <div class="landing-container">
            <h2 class="landing-cta-title">\(cta.title.htmlEscaped)</h2>
            \(buttonHTML)
         </div>
      </section>
      """
   }
}
