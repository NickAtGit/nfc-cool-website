import Foundation
import SiteKit
import Yams

struct LandingPageRenderer: Renderer {
   func render(context: BuildContext) throws -> [OutputFile] {
      let helper = OutputFileRenderer(context: context)

      let locale = context.uiStrings.locale
      let defaultLang = context.config.effectiveDefaultLanguage
      let suffix = locale == defaultLang ? "" : ".\(locale)"
      let yamlFileName = "Landing\(suffix).yaml"
      let yamlPath = context.projectDirectory
         .appendingPathComponent(context.config.contentDirectory)
         .appendingPathComponent("Data")
         .appendingPathComponent(yamlFileName)

      let yamlData = try Data(contentsOf: yamlPath)
      let decoder = YAMLDecoder()
      let data = try decoder.decode(LandingData.self, from: yamlData)

      let pageTitle: String = {
         if data.hero.title == context.config.name {
            return "\(context.config.name) — \(context.config.description.truncated(to: 70))"
         }
         return "\(data.hero.title) — \(context.config.name)"
      }()

      let head = helper.buildHead(
         title: pageTitle,
         description: context.config.description,
         canonicalURL: context.config.baseURL + context.router.homePath(),
         ogType: "website",
         hreflang: helper.buildHreflangForAllLanguages { $0.homePath() }
      )

      var sections: [String] = []
      sections.append(self.renderHero(data.hero, appStoreURL: data.appStoreURL, googlePlayURL: data.googlePlayURL))
      if let banner = data.featureBanner {
         sections.append(self.renderFeatureBanner(banner, fallbackURL: data.appStoreURL))
      }
      if let testimonials = data.testimonials?.filter({ ($0.row ?? 1) == 1 }), !testimonials.isEmpty {
         sections.append(self.renderTestimonials(testimonials))
      }
      if let features = data.features, !features.isEmpty {
         sections.append(self.renderFeatureGrid(features))
      }
      if let testimonials = data.testimonials?.filter({ ($0.row ?? 1) == 2 }), !testimonials.isEmpty {
         sections.append(self.renderTestimonials(testimonials))
      }
      if let pricing = data.pricing {
         sections.append(self.renderPricing(pricing, appStoreURL: data.appStoreURL, googlePlayURL: data.googlePlayURL))
      }
      if let specs = data.techSpecs {
         sections.append(self.renderTechSpecs(specs))
      }
      if let reviews = data.appStoreReviews, !reviews.isEmpty {
         sections.append(self.renderAppStoreReviews(reviews))
      }
      if let apps = data.trustedBy, !apps.isEmpty {
         sections.append(self.renderTrustedBy(apps))
      }
      if let items = data.faq, !items.isEmpty {
         sections.append(self.renderFAQ(items))
      }
      if let cta = data.cta {
         sections.append(self.renderCTA(cta, appStoreURL: data.appStoreURL, googlePlayURL: data.googlePlayURL))
      }

      let mainContent = "<main class=\"sk-main landing-page\">\(self.inlineCSS())\(sections.joined())</main>"

      let html = helper.renderPageShell(
         head: head,
         bodyClass: "sk-page-home landing",
         content: mainContent
      )

      let homePath = context.router.homePath()
      let relativePath = String(homePath.dropFirst())
      let outputPath = context.outputDirectory
         .appendingPathComponent(relativePath)
         .appendingPathComponent("index.html")

      return [OutputFile(outputPath: outputPath, content: html)]
   }

   // MARK: - Store buttons

   private func renderStoreButtons(appStoreURL: String, googlePlayURL: String?) -> String {
      var buttons: [String] = []
      buttons.append("""
         <a href="\(appStoreURL)" class="landing-store-button" aria-label="Download on the App Store">
            <i class="fa-brands fa-app-store-ios"></i>
            <span class="landing-store-button-meta">Download on the</span>
            <span class="landing-store-button-name">App Store</span>
         </a>
         """)
      if let url = googlePlayURL {
         buttons.append("""
            <a href="\(url)" class="landing-store-button" aria-label="Get it on Google Play">
               <i class="fa-brands fa-google-play"></i>
               <span class="landing-store-button-meta">Get it on</span>
               <span class="landing-store-button-name">Google Play</span>
            </a>
            """)
      }
      return "<div class=\"landing-store-buttons\">\(buttons.joined())</div>"
   }

   private func inlineCSS() -> String {
      """
      <style>
      .landing-store-buttons{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:24px}
      .landing-store-button{display:inline-grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;gap:0 10px;padding:10px 18px;background:var(--color-text);color:var(--color-bg);border-radius:10px;text-decoration:none;align-items:center;min-width:170px;transition:opacity .2s}
      .landing-store-button:hover{opacity:.85;color:var(--color-bg)}
      .landing-store-button .fa-icon,.landing-store-button i[data-fa-inlined]{grid-row:1/3;width:26px;height:26px;align-self:center}
      .landing-store-button-meta{font-size:11px;opacity:.85;line-height:1;letter-spacing:.02em}
      .landing-store-button-name{font-size:18px;font-weight:600;line-height:1.1}
      .landing-feature-platforms{display:inline-block;margin-top:6px;padding:2px 10px;border-radius:999px;background:var(--color-bg-alt);color:var(--color-text-secondary);font-size:12px;font-weight:500;letter-spacing:.02em}
      .landing-platform-ios{background:var(--color-accent-light);color:var(--color-accent)}
      </style>
      """
   }

   // MARK: - Section Renderers

   private func renderHero(_ hero: HeroSection, appStoreURL: String, googlePlayURL: String?) -> String {
      """
      <section class="landing-hero">
         <div class="landing-container">
            <h1 class="landing-hero-title">\(hero.title)</h1>
            <p class="landing-hero-subtitle">\(hero.subtitle.htmlEscaped)</p>
            \(self.renderStoreButtons(appStoreURL: appStoreURL, googlePlayURL: googlePlayURL))
         </div>
      </section>
      """
   }

   private func renderFeatureBanner(_ banner: FeatureBannerSection, fallbackURL: String) -> String {
      let media: String
      if let videoPath = banner.videoPath {
         media = """
            <div class="landing-feature-banner-video">
               <video autoplay muted loop playsinline>
                  <source src="\(videoPath)" type="video/mp4"/>
               </video>
            </div>
         """
      } else if let imagePath = banner.imagePath {
         media = """
            <div class="landing-feature-banner-video">
               <img src="\(imagePath)" alt="\(banner.title.htmlEscaped)" loading="lazy"/>
            </div>
         """
      } else {
         media = ""
      }
      let linkURL = banner.linkURL ?? fallbackURL
      return """
      <section id="business-card" class="landing-feature-banner">
         <div class="landing-container">
            <h2 class="landing-section-title">\(banner.title.htmlEscaped)</h2>
            <div class="landing-feature-banner-content">
               \(media)
               <div class="landing-feature-banner-text">
                  <p>\(banner.subtitle.htmlEscaped)</p>
                  <a href="\(linkURL)" class="landing-cta-button">\(banner.ctaText.htmlEscaped)</a>
               </div>
            </div>
         </div>
      </section>
      """
   }

   private func renderTestimonials(_ testimonials: [Testimonial]) -> String {
      var cards: [String] = []
      for testimonial in testimonials {
         cards.append("""
            <div class="landing-testimonial-card">
               <div class="landing-testimonial-header">
                  <img src="\(testimonial.avatarPath)" alt="\(testimonial.name.htmlEscaped)" width="48" height="48" loading="lazy" class="landing-testimonial-avatar"/>
                  <div>
                     <h3 class="landing-testimonial-name">\(testimonial.name.htmlEscaped)</h3>
                     <p class="landing-testimonial-handle">\(testimonial.handle.htmlEscaped)</p>
                  </div>
               </div>
               <p class="landing-testimonial-quote">\(testimonial.quote)</p>
            </div>
         """)
      }
      return "<section class=\"landing-testimonials\"><div class=\"landing-testimonials-grid\">\(cards.joined())</div></section>"
   }

   private func renderFeatureGrid(_ features: [Feature]) -> String {
      var cards: [String] = []
      for feature in features {
         let platformsHTML: String = {
            guard let platforms = feature.platforms else { return "" }
            let isIOSOnly = platforms.lowercased().contains("ios only") || platforms.lowercased().contains("iphone only")
            let cls = isIOSOnly ? "landing-feature-platforms landing-platform-ios" : "landing-feature-platforms"
            return "<span class=\"\(cls)\">\(platforms.htmlEscaped)</span>"
         }()
         cards.append("""
            <div class="landing-feature-card">
               <img src="\(feature.imagePath)" alt="\(feature.title.htmlEscaped)" loading="lazy" class="landing-feature-image"/>
               <div class="landing-feature-card-text">
                  <h3 class="landing-feature-title">\(feature.title.htmlEscaped)</h3>
                  \(platformsHTML)
                  <p class="landing-feature-desc">\(feature.description.htmlEscaped)</p>
               </div>
            </div>
         """)
      }
      return "<section id=\"features\" class=\"landing-feature-grid\"><div class=\"landing-container\"><div class=\"landing-features\">\(cards.joined())</div></div></section>"
   }

   private func renderPricing(_ pricing: PricingSection, appStoreURL: String, googlePlayURL: String?) -> String {
      var tierCards: [String] = []
      for tier in pricing.tiers {
         let highlightClass = (tier.highlighted ?? false) ? " landing-pricing-highlighted" : ""
         let badgeHTML = tier.badge.map { "<span class=\"landing-pricing-badge\">\($0.htmlEscaped)</span>" } ?? ""
         let featuresHTML = tier.features.map { "<li><i class=\"fa-solid fa-check\"></i> \($0.htmlEscaped)</li>" }.joined()
         tierCards.append("""
            <div class="landing-pricing-card\(highlightClass)">
               <div class="landing-pricing-header">
                  <h3 class="landing-pricing-name">\(tier.name.htmlEscaped)</h3>
                  \(badgeHTML)
               </div>
               <div class="landing-pricing-price">
                  <span class="landing-pricing-amount">\(tier.monthlyPrice.htmlEscaped)</span>
                  <span class="landing-pricing-period">/month</span>
               </div>
               <ul class="landing-pricing-features">\(featuresHTML)</ul>
            </div>
         """)
      }

      return """
      <section id="pricing" class="landing-pricing">
         <div class="landing-container">
            <h2 class="landing-section-title">\(pricing.title.htmlEscaped)</h2>
            <div class="landing-pricing-grid">\(tierCards.joined())</div>
            <p class="landing-pricing-note">\(pricing.subtitle)</p>
            \(self.renderStoreButtons(appStoreURL: appStoreURL, googlePlayURL: googlePlayURL))
         </div>
      </section>
      """
   }

   private func renderTechSpecs(_ specs: TechSpecsSection) -> String {
      let columns = specs.columns.map { col in
         let items = col.items.map { "<li>\($0)</li>" }.joined()
         return "<div class=\"landing-tech-specs-card\"><h3>\(col.title.htmlEscaped)</h3><ul>\(items)</ul></div>"
      }.joined()

      return """
      <section class="landing-tech-specs">
         <div class="landing-container">
            <div class="landing-tech-specs-grid">\(columns)</div>
         </div>
      </section>
      """
   }

   private func renderAppStoreReviews(_ reviews: [AppStoreReview]) -> String {
      var cards: [String] = []
      for review in reviews {
         let avatarHTML = review.avatarPath.map {
            "<img src=\"\($0)\" alt=\"\(review.author.htmlEscaped)\" width=\"40\" height=\"40\" loading=\"lazy\" class=\"landing-review-avatar\"/>"
         } ?? ""
         cards.append("""
            <div class="landing-review-card">
               <div class="landing-review-stars">\u{2605}\u{2605}\u{2605}\u{2605}\u{2605}</div>
               <blockquote class="landing-review-quote">\(review.quote)</blockquote>
               <div class="landing-review-author">
                  \(avatarHTML)
                  <div>
                     <strong>\(review.author.htmlEscaped)</strong>
                     <span>\(review.location.htmlEscaped)</span>
                  </div>
               </div>
            </div>
         """)
      }
      return """
      <section class="landing-reviews">
         <div class="landing-container">
            <h2 class="landing-section-title">App Store Reviews</h2>
            <div class="landing-reviews-grid">\(cards.joined())</div>
         </div>
      </section>
      """
   }

   private func renderTrustedBy(_ apps: [TrustedByApp]) -> String {
      let links = apps.map { app in
         let iconHTML = app.iconPath.map { "<img src=\"\($0)\" alt=\"\(app.name.htmlEscaped)\" width=\"48\" height=\"48\" loading=\"lazy\" class=\"landing-trusted-icon\"/>" } ?? ""
         return "<a href=\"\(app.url)\" target=\"_blank\" rel=\"noopener\" class=\"landing-trusted-link\">\(iconHTML)<span>\(app.name.htmlEscaped)</span></a>"
      }.joined()

      return """
      <section class="landing-trusted-by">
         <div class="landing-container">
            <div class="landing-trusted-logos">\(links)</div>
         </div>
      </section>
      """
   }

   private func renderFAQ(_ items: [FAQItem]) -> String {
      let faqItems = items.map { item in
         """
         <details class="landing-faq-item">
            <summary>\(item.question.htmlEscaped)</summary>
            <p>\(item.answer.htmlEscaped)</p>
         </details>
         """
      }.joined()

      return """
      <section id="faq" class="landing-faq">
         <div class="landing-container">
            <h2 class="landing-section-title">FAQ</h2>
            \(faqItems)
         </div>
      </section>
      """
   }

   private func renderCTA(_ cta: CTASection, appStoreURL: String, googlePlayURL: String?) -> String {
      """
      <section class="landing-final-cta">
         <div class="landing-container">
            <h2 class="landing-cta-title">\(cta.title.htmlEscaped)</h2>
            \(self.renderStoreButtons(appStoreURL: appStoreURL, googlePlayURL: googlePlayURL))
         </div>
      </section>
      """
   }
}

private extension String {
   func truncated(to length: Int) -> String {
      if self.count <= length { return self }
      return String(self.prefix(length)) + "…"
   }
}
