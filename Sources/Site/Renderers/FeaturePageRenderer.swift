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
      let newsletterHTML = NewsletterForm.section(for: context)

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
         let jsonLD = StructuredData.featurePageGraph(
            baseURL: context.config.baseURL,
            homePath: basePath,
            featuresLabel: featuresLabel,
            featureTitle: feature.hero.title,
            featureSlug: slug,
            faq: feature.faq
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
         if let relatedReading = feature.relatedReading, !relatedReading.isEmpty {
            sections.append(self.renderRelatedReading(relatedReading, title: feature.relatedReadingTitle))
         }
         if !newsletterHTML.isEmpty {
            sections.append(newsletterHTML)
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
      \(renderTitleWithBrandTail(hero.title, tagName: "h1"))
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

   private func renderPricing(_ pricing: PricingTable) -> String {
      let heading = (pricing.title ?? "").isEmpty ? "" : "<h2 class=\"landing-section-title\">\(pricing.title!.htmlEscaped)</h2>"
      return """
      <section class="feature-pricing">
         <div class="landing-container">
            \(heading)
            \(PricingTableRenderer.renderTable(pricing))
         </div>
      </section>
      """
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

   private func renderRelatedReading(_ links: [FeatureRelatedLink], title: String?) -> String {
      let heading = (title ?? "").isEmpty ? "" : "<h2 class=\"landing-section-title\">\(title!.htmlEscaped)</h2>"
      let cards = links.map { link in
         """
         <a class="feature-related-card" href="\(link.url)">
            <span class="feature-related-kicker">\(self.relatedReadingKicker(for: link.url))</span>
            <span class="feature-related-card-title">\(link.title.htmlEscaped)</span>
            <span class="feature-related-arrow" aria-hidden="true">&rarr;</span>
         </a>
         """
      }.joined()
      return """
      <section class="feature-related">
         <div class="landing-container">
            \(heading)
            <div class="feature-related-grid">\(cards)</div>
         </div>
      </section>
      """
   }

   /// Kicker label for a related-reading card, derived from the link target:
   /// blog posts read as "Article", feature pages as "Feature", anything else
   /// (e.g. the interactive /online-nfc-reader/) as "Tool".
   private func relatedReadingKicker(for url: String) -> String {
      if url.hasPrefix("/blog/") { return "Article" }
      if url.hasPrefix("/features/") { return "Feature" }
      return "Tool"
   }

}
