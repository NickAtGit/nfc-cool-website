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
            return "\(context.config.name) — \(context.config.description)"
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
      sections.append(self.renderHero(data.hero, trust: data.trust, heroImagePath: data.heroImagePath, appStoreURL: data.appStoreURL, googlePlayURL: data.googlePlayURL))
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
      if data.slogan != nil {
         sections.append(self.renderSlogan())
      }
      if let items = data.faq, !items.isEmpty {
         sections.append(self.renderFAQ(items))
      }
      if let cta = data.cta {
         sections.append(self.renderCTA(cta, trust: data.trust, appStoreURL: data.appStoreURL, googlePlayURL: data.googlePlayURL))
      }

      let mainContent = "<main class=\"sk-main landing-page\">\(sections.joined())</main>"

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

   // MARK: - Helpers

   /// Splits a brand-headline title at ".cool" so the suffix can render in the script font/yellow.
   /// Example: "NFC.cool" → ("NFC", ".cool"). "All-in-one tools" → ("All-in-one tools", nil).
   private func splitBrandTail(_ title: String) -> (head: String, tail: String?) {
      if let range = title.range(of: ".cool", options: [.caseInsensitive, .backwards]) {
         let head = String(title[..<range.lowerBound])
         let tail = String(title[range.lowerBound...])
         return (head, tail)
      }
      return (title, nil)
   }

   private func renderTitleWithBrandTail(_ title: String, tagName: String, classAttr: String) -> String {
      let parts = self.splitBrandTail(title)
      let escapedHead = parts.head.htmlEscaped
      if let tail = parts.tail {
         return "<\(tagName) class=\"\(classAttr)\">\(escapedHead)<em class=\"brand-tail\">\(tail.htmlEscaped)</em></\(tagName)>"
      }
      return "<\(tagName) class=\"\(classAttr)\">\(escapedHead)</\(tagName)>"
   }

   private func renderTrust(_ trust: TrustSection?, classAttr: String = "landing-hero-trust") -> String {
      guard let trust else { return "" }
      var parts: [String] = []
      if let rating = trust.rating {
         parts.append("<span class=\"stars\">★</span>\(rating.htmlEscaped)")
      }
      if let count = trust.ratingCount {
         let formatted = self.formatThousands(count)
         parts.append("\(formatted) ratings")
      }
      if let version = trust.version {
         parts.append("v\(version.htmlEscaped)")
      }
      if let price = trust.price {
         parts.append(price.htmlEscaped)
      }
      guard !parts.isEmpty else { return "" }
      return "<p class=\"\(classAttr)\">" + parts.joined(separator: "<span class=\"sep\">·</span>") + "</p>"
   }

   private func formatThousands(_ n: Int) -> String {
      let formatter = NumberFormatter()
      formatter.numberStyle = .decimal
      formatter.groupingSeparator = ","
      return formatter.string(from: NSNumber(value: n)) ?? "\(n)"
   }

   private func renderStoreButtons(appStoreURL: String, googlePlayURL: String?) -> String {
      var buttons: [String] = []
      // Apple App Store — official brand-kit badge SVG
      buttons.append("""
         <a href="\(appStoreURL)" class="landing-store-button is-apple" aria-label="Download on the App Store">
            <img src="/assets/theme/images/AppStore-Black.svg" alt="Download on the App Store" width="156" height="52"/>
         </a>
         """)
      // Google Play — matched text button (no official Google badge in brand kit)
      if let url = googlePlayURL {
         buttons.append("""
            <a href="\(url)" class="landing-store-button is-google" aria-label="Get it on Google Play">
               <span class="glyph">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                     <path d="M3.6 2.5c-.3.3-.5.7-.5 1.3v16.5c0 .6.2 1 .5 1.3l9.5-9.5L3.6 2.5z"/>
                     <path d="M16.7 14.6l-2.9-1.7-9.6 9.6c.4.1.8 0 1.2-.2l11.3-6.5c.3-.2.5-.4.5-.7-.1-.2-.2-.4-.5-.5z" fill="#FFC709"/>
                     <path d="M19.6 10.7l-3.7-2.1-2.7 2.7 3.1 3.1 3.3-1.9c.7-.4.8-1.4 0-1.8z"/>
                     <path d="M4.3 1.7c-.3-.1-.7-.1-1 .1l11 11 2.7-2.7L5.5 2.4c-.4-.3-.8-.6-1.2-.7z" fill="#137BD9"/>
                  </svg>
               </span>
               <span class="text">
                  <span class="landing-store-button-meta">Get it on</span>
                  <span class="landing-store-button-name">Google Play</span>
               </span>
            </a>
            """)
      }
      return "<div class=\"landing-store-buttons\">\(buttons.joined())</div>"
   }

   // MARK: - Section Renderers

   private func renderHero(_ hero: HeroSection, trust: TrustSection?, heroImagePath: String?, appStoreURL: String, googlePlayURL: String?) -> String {
      let titleHTML = self.renderTitleWithBrandTail(hero.title, tagName: "h1", classAttr: "landing-hero-title")
      let visualHTML: String
      if let path = heroImagePath {
         visualHTML = """
            <div class="landing-hero-visual">
               <img src="\(path)" alt="\(hero.title.htmlEscaped) screenshot" loading="eager" fetchpriority="high"/>
            </div>
         """
      } else {
         visualHTML = ""
      }
      return """
      <section class="landing-hero">
         <div class="landing-container">
            <div class="landing-hero-text">
               \(titleHTML)
               <p class="landing-hero-subtitle">\(hero.subtitle.htmlEscaped)</p>
               <div class="landing-hero-actions">
                  \(self.renderStoreButtons(appStoreURL: appStoreURL, googlePlayURL: googlePlayURL))
               </div>
               \(self.renderTrust(trust))
            </div>
            \(visualHTML)
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
            <div class="landing-feature-banner-image">
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
            <div class="landing-feature-banner-content">
               \(media)
               <div class="landing-feature-banner-text">
                  <h2 class="landing-section-title">\(banner.title.htmlEscaped)</h2>
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
      for (index, feature) in features.enumerated() {
         let num = String(format: "%02d", index + 1)
         let platformsHTML: String = {
            guard let platforms = feature.platforms else { return "" }
            let isIOSOnly = platforms.lowercased().contains("ios only") || platforms.lowercased().contains("iphone only")
            let cls = isIOSOnly ? "landing-feature-platforms landing-platform-ios" : "landing-feature-platforms"
            return "<span class=\"\(cls)\">\(platforms.htmlEscaped)</span>"
         }()
         cards.append("""
            <article class="landing-feature-card">
               <span class="landing-feature-num" aria-hidden="true">\(num)</span>
               <img src="\(feature.imagePath)" alt="\(feature.title.htmlEscaped)" loading="lazy" class="landing-feature-image"/>
               <div class="landing-feature-card-text">
                  <h3 class="landing-feature-title">\(feature.title.htmlEscaped)</h3>
                  \(platformsHTML)
                  <p class="landing-feature-desc">\(feature.description.htmlEscaped)</p>
               </div>
            </article>
         """)
      }
      return """
      <section id="features" class="landing-feature-grid">
         <div class="landing-container">
            <h2 class="landing-section-title">Everything you need to scan</h2>
            <div class="landing-features">\(cards.joined())</div>
         </div>
      </section>
      """
   }

   private func renderPricing(_ pricing: PricingSection, appStoreURL: String, googlePlayURL: String?) -> String {
      var tierCards: [String] = []
      for tier in pricing.tiers {
         let highlightClass = (tier.highlighted ?? false) ? " landing-pricing-highlighted" : ""
         let badgeHTML = tier.badge.map { "<span class=\"landing-pricing-badge\">\($0.htmlEscaped)</span>" } ?? ""
         let featuresHTML = tier.features.map { "<li>\($0.htmlEscaped)</li>" }.joined()
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

   private func renderSlogan() -> String {
      """
      <section class="landing-slogan" aria-hidden="true">
         <img src="/assets/theme/images/NFC_TheCoolWayToConnect-Black.svg" alt=""/>
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
            <h2 class="landing-section-title">Frequently asked</h2>
            \(faqItems)
         </div>
      </section>
      """
   }

   private func renderCTA(_ cta: CTASection, trust: TrustSection?, appStoreURL: String, googlePlayURL: String?) -> String {
      let titleHTML = self.renderTitleWithBrandTail(cta.title, tagName: "h2", classAttr: "landing-cta-title")
      return """
      <section class="landing-final-cta">
         <div class="landing-container">
            \(titleHTML)
            \(self.renderTrust(trust))
            \(self.renderStoreButtons(appStoreURL: appStoreURL, googlePlayURL: googlePlayURL))
         </div>
      </section>
      """
   }
}
