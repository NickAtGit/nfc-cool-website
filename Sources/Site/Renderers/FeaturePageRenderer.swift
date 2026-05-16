import Foundation
import SiteKit
import Yams

/// Renders per-feature marketing/docs pages from YAML files at
/// Content/Data/Features/{slug}{.locale}.yaml.
///
/// One output is produced per (slug × locale) when a YAML for that combination
/// exists. Missing locale-specific YAMLs simply skip that page for that locale
/// (no fallback to default-language content - keeps locale boundaries honest).
struct FeaturePageRenderer: Renderer {
   /// Feature slugs to render. Each must have at least one YAML at
   /// `Content/Data/Features/{slug}.yaml` for the default locale.
   static let slugs: [String] = [
      "nfc-reader-writer",
      "qr-scanner",
      "barcode-scanner",
      "document-scanner",
      "3d-object-scanner",
      "room-scanner",
      "webhooks",
   ]

   func render(context: BuildContext) throws -> [OutputFile] {
      let locale = context.uiStrings.locale
      let defaultLang = context.config.effectiveDefaultLanguage
      let suffix = locale == defaultLang ? "" : ".\(locale)"
      let helper = OutputFileRenderer(context: context)

      // Final CTA is sourced from Landing{.locale}.yaml so every feature
      // page (and the features index) closes with the same brand-gradient
      // block as the home page.
      let landing = try loadLandingData(context: context)

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

         let pageTitle = "\(feature.hero.title) - \(context.config.name)"
         let basePath = context.router.homePath() // "/" or "/{locale}/"
         let pagePath = "\(basePath)features/\(slug)/"

         let ogImageAbsolute: String? = feature.hero.heroImagePath.map { path in
            path.hasPrefix("http") ? path : context.config.baseURL + path
         }
         let featuresLabel: String = {
            switch locale {
            case "de": return "Funktionen"
            case "ja": return "機能"
            default:   return "Features"
            }
         }()
         let jsonLD = StructuredData.featureBreadcrumb(
            baseURL: context.config.baseURL,
            homePath: basePath,
            featuresLabel: featuresLabel,
            featureTitle: feature.hero.title,
            featureSlug: slug
         )

         let head = helper.buildHead(
            title: pageTitle,
            description: feature.hero.subtitle,
            canonicalURL: context.config.baseURL + pagePath,
            ogType: "website",
            image: ogImageAbsolute,
            imageAlt: feature.hero.heroImageAlt ?? feature.hero.title,
            jsonLD: jsonLD,
            hreflang: helper.buildHreflangForAllLanguages { router in
               "\(router.homePath())features/\(slug)/"
            }
         )

         let page = "web-feature-\(slug)"
         let appStoreURL = StoreLink.appStore(app: .tools, page: page, locale: locale)
         let googlePlayURL = StoreLink.googlePlay(app: .tools, page: page, locale: locale)
         let backLinkText = feature.backLinkText ?? "← All features"
         let featuresIndexPath = "\(basePath)features/"

         var sections: [String] = []
         sections.append(self.renderHero(feature.hero, slug: slug, backLinkText: backLinkText, backHref: featuresIndexPath, appStoreURL: appStoreURL, googlePlayURL: googlePlayURL))
         if let capabilities = feature.capabilities, !capabilities.isEmpty {
            sections.append(self.renderCapabilities(capabilities, title: feature.capabilitiesTitle))
         }
         if let subsections = feature.subsections, !subsections.isEmpty {
            sections.append(self.renderSubsections(subsections, title: feature.subsectionsTitle))
         }
         if let body = feature.docsBody, !body.isEmpty {
            sections.append(self.renderDocsBody(body))
         }
         if let specs = feature.specs, !specs.isEmpty {
            sections.append(self.renderSpecs(specs, title: feature.specsTitle))
         }
         if let pricing = feature.pricing {
            sections.append(self.renderPricing(pricing))
         }
         if let reviews = feature.featuredReviews, !reviews.isEmpty {
            sections.append(self.renderFeaturedReviews(reviews, title: feature.featuredReviewsTitle))
         }
         if let faq = feature.faq, !faq.isEmpty {
            sections.append(self.renderFAQ(faq, title: feature.faqTitle))
         }
         if let cta = landing.cta {
            sections.append(renderFinalCTA(cta: cta, trust: landing.trust, appStoreURL: appStoreURL, googlePlayURL: googlePlayURL))
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

   private func renderHero(_ hero: FeatureHero, slug: String, backLinkText: String, backHref: String, appStoreURL: String, googlePlayURL: String?) -> String {
      let platformsHTML: String = {
         guard let platforms = hero.platforms else { return "" }
         return PlatformBadge.render(platforms: platforms, wrapperClass: "feature-hero-platforms")
      }()
      let storeButtons = renderStoreButtons(appStoreURL: appStoreURL, googlePlayURL: googlePlayURL)
      let text = """
      <p class="feature-breadcrumb"><a href="\(backHref)">\(backLinkText.htmlEscaped)</a></p>
      <h1>\(hero.title.htmlEscaped)</h1>
      \(platformsHTML)
      <p>\(hero.subtitle.htmlEscaped)</p>
      <div class="landing-hero-actions">\(storeButtons)</div>
      """
      let visual = hero.heroImagePath.map { path in
         PageHeroVisual(src: path, alt: (hero.heroImageAlt ?? hero.title).htmlEscaped)
      }
      return renderPageHero(text: text, visual: visual)
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

   private func renderSubsections(_ subsections: [FeatureSubsection], title: String?) -> String {
      let heading = (title ?? "").isEmpty ? "" : "<h2 class=\"landing-section-title\">\(title!.htmlEscaped)</h2>"
      let blocks = subsections.enumerated().map { index, sub in
         let imageFirst = index.isMultiple(of: 2) == false // 0 = text-left, 1 = image-left, alternating
         let platformsHTML: String = sub.platforms.map {
            PlatformBadge.render(platforms: $0, wrapperClass: "feature-subsection-platforms")
         } ?? ""
         let imageHTML: String = {
            guard let path = sub.imagePath else { return "" }
            let alt = (sub.imageAlt ?? sub.title).htmlEscaped
            return "<div class=\"feature-subsection-visual\"><img src=\"\(path)\" alt=\"\(alt)\" loading=\"lazy\"/></div>"
         }()
         let textHTML = """
         <div class="feature-subsection-text">
            <h3>\(sub.title.htmlEscaped)</h3>
            \(platformsHTML)
            <div class="feature-subsection-body">\(sub.body)</div>
         </div>
         """
         let inner = imageHTML.isEmpty
            ? textHTML
            : (imageFirst ? imageHTML + textHTML : textHTML + imageHTML)
         let rowClass = imageHTML.isEmpty
            ? "feature-subsection feature-subsection--text-only"
            : (imageFirst ? "feature-subsection feature-subsection--image-left" : "feature-subsection feature-subsection--image-right")
         return """
         <article class="\(rowClass)">\(inner)</article>
         """
      }.joined()
      return """
      <section class="feature-subsections">
         <div class="landing-container">
            \(heading)
            \(blocks)
         </div>
      </section>
      """
   }

   private func renderPricing(_ pricing: FeaturePricingTier) -> String {
      let heading = (pricing.title ?? "").isEmpty ? "" : "<h2 class=\"landing-section-title\">\(pricing.title!.htmlEscaped)</h2>"
      let freeHead = (pricing.freeHeader ?? "Free").htmlEscaped
      let platHead = (pricing.platinumHeader ?? "Platinum").htmlEscaped
      let rows = pricing.rows.map { row in
         let feat = row.feature.htmlEscaped
         let free = (row.free ?? "-").htmlEscaped
         let plat = (row.platinum ?? "-").htmlEscaped
         return """
         <tr>
            <th scope="row">\(feat)</th>
            <td>\(self.markPricingCell(free))</td>
            <td>\(self.markPricingCell(plat))</td>
         </tr>
         """
      }.joined()
      return """
      <section class="feature-pricing">
         <div class="landing-container">
            \(heading)
            <div class="feature-pricing-wrap">
               <table class="feature-pricing-table">
                  <thead>
                     <tr><th></th><th scope="col">\(freeHead)</th><th scope="col">\(platHead)</th></tr>
                  </thead>
                  <tbody>\(rows)</tbody>
               </table>
            </div>
         </div>
      </section>
      """
   }

   private func markPricingCell(_ raw: String) -> String {
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
      return "<span class=\"feature-pricing-text\">\(trimmed)</span>"
   }

   private func renderDocsBody(_ body: String) -> String {
      // The YAML field is plain markdown. SiteKit's MarkdownRenderer would be ideal,
      // but we already have it inline here - keep it simple: render basic paragraphs.
      // Authors can use raw HTML in the YAML field if they need rich structure.
      return """
      <section class="feature-docs">
         <div class="landing-container">
            <div class="feature-docs-body">\(body)</div>
         </div>
      </section>
      """
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
         <details class="faq-item">
            <summary>\(item.question.htmlEscaped)</summary>
            <p>\(item.answer)</p>
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

}
