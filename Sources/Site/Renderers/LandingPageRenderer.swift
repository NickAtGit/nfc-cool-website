import Foundation
import SiteKit
import Yams

/// Minimal SiteConfig fragment used to decode the custom `apps:` block.
/// SiteKit's `SiteConfig` decoder ignores unknown keys, so we parse the
/// YAML separately here.
private struct AppRatingsWrapper: Decodable {
   let apps: AppRatings?
}

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
            return "\(context.config.name) - \(context.config.description)"
         }
         return "\(data.hero.title) - \(context.config.name)"
      }()

      let ogImageAbsolute: String? = data.ogImage.map { path in
         path.hasPrefix("http") ? path : context.config.baseURL + path
      }
      let ratings = Self.loadAppRatings(projectDirectory: context.projectDirectory)
      let jsonLD = StructuredData.landingGraph(
         baseURL: context.config.baseURL,
         siteName: context.config.name,
         description: context.config.description,
         ratings: ratings,
         faq: data.faq
      )

      let head = helper.buildHead(
         title: pageTitle,
         description: data.description ?? data.hero.subtitle,
         canonicalURL: context.config.baseURL + context.router.homePath(),
         ogType: "website",
         image: ogImageAbsolute,
         imageAlt: data.ogImageAlt,
         rssFeedURL: "/feed.xml",
         rssFeedTitle: "\(context.config.name) - \(context.uiStrings.locale == "de" ? "Blog & Changelog" : (context.uiStrings.locale == "ja" ? "ブログ・更新履歴" : "Blog & Changelog"))",
         jsonLD: jsonLD,
         hreflang: helper.buildHreflangForAllLanguages { $0.homePath() },
         preloadImageURL: data.heroImagePath
      )

      let homeAppStore = StoreLink.appStore(app: .tools, page: "web-home", locale: locale)
      let homeGooglePlay = StoreLink.googlePlay(app: .tools, page: "web-home", locale: locale)

      var sections: [String] = []
      sections.append(self.renderHero(data.hero, trust: data.trust, heroImagePath: data.heroImagePath, heroImageWidth: data.heroImageWidth, heroImageHeight: data.heroImageHeight, appStoreURL: homeAppStore, googlePlayURL: homeGooglePlay))
      if let features = data.features, !features.isEmpty {
         sections.append(self.renderFeatureGrid(features, title: data.featuresTitle, basePath: context.router.homePath()))
      }
      if let banner = data.featureBanner {
         sections.append(self.renderFeatureBanner(banner, locale: locale))
      }
      if let reviews = data.appStoreReviews, !reviews.isEmpty {
         sections.append(self.renderAppStoreReviews(reviews, title: data.appStoreReviewsTitle))
      }
      if let testimonials = data.testimonials, !testimonials.isEmpty {
         sections.append(self.renderTestimonials(testimonials, title: data.testimonialsTitle))
      }
      if let pricing = data.pricing {
         sections.append(self.renderPricing(pricing, appStoreURL: homeAppStore, googlePlayURL: homeGooglePlay))
      }
      if let specs = data.techSpecs {
         sections.append(self.renderTechSpecs(specs))
      }
      if let apps = data.trustedBy, !apps.isEmpty {
         sections.append(self.renderTrustedBy(apps))
      }
      if let items = data.faq, !items.isEmpty {
         sections.append(self.renderFAQ(items, title: data.faqTitle))
      }
      if let newsletter = data.newsletter {
         sections.append(NewsletterForm.render(newsletter))
      }
      if data.slogan != nil {
         sections.append(self.renderSlogan())
      }
      if let cta = data.cta {
         sections.append(self.renderCTA(cta, trust: data.trust, appStoreURL: homeAppStore, googlePlayURL: homeGooglePlay))
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

   /// Loads the per-app rating block from `SiteConfig.yaml`. SiteKit's
   /// `SiteConfig` decoder ignores the custom `apps:` key, so we re-read the
   /// file with a minimal local decoder. Returns `.empty` (no
   /// `aggregateRating` emitted) when the block is missing or malformed.
   private static func loadAppRatings(projectDirectory: URL) -> AppRatings {
      let configPath = projectDirectory.appendingPathComponent("SiteConfig.yaml")
      guard let yaml = try? String(contentsOf: configPath, encoding: .utf8),
            let wrapper = try? YAMLDecoder().decode(AppRatingsWrapper.self, from: yaml)
      else { return .empty }
      return wrapper.apps ?? .empty
   }

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

   /// Render the App Store + Google Play badge pair shared across the
   /// landing hero, feature banner, pricing, and final CTA. Campaign
   /// tracking lives directly on the URL strings - each locale's YAML
   /// holds its own `?ct=web-<lang>` / `&referrer=...&utm_campaign=web-<lang>`.
   ///
   /// External commercial CTAs: open in a new tab (`target="_blank"`) and
   /// carry `rel="noopener nofollow sponsored"`:
   ///  - `noopener` is required for security whenever `target="_blank"` is set
   ///  - `nofollow sponsored` keeps SEO audits from flagging the commercial
   ///    outbound link as PageRank-leaking; `sponsored` is Google's preferred
   ///    rel for app-store / affiliate / paid-placement destinations.
   private func renderStoreButtons(appStoreURL: String, googlePlayURL: String?) -> String {
      var buttons: [String] = []
      buttons.append("""
         <a href="\(appStoreURL)" class="landing-store-button is-apple" aria-label="Download on the App Store" target="_blank" rel="noopener nofollow sponsored">
            <img src="/assets/theme/images/AppStore.svg" alt="Download on the App Store" width="156" height="52"/>
         </a>
         """)
      if let url = googlePlayURL {
         buttons.append("""
            <a href="\(url)" class="landing-store-button is-google" aria-label="Get it on Google Play" target="_blank" rel="noopener nofollow sponsored">
               <img src="/assets/theme/images/GooglePlay.svg" alt="Get it on Google Play" width="173" height="52"/>
            </a>
            """)
      }
      return "<div class=\"landing-store-buttons\">\(buttons.joined())</div>"
   }

   // MARK: - Section Renderers

   private func renderHero(_ hero: HeroSection, trust: TrustSection?, heroImagePath: String?, heroImageWidth: Int?, heroImageHeight: Int?, appStoreURL: String, googlePlayURL: String?) -> String {
      let titleHTML = self.renderTitleWithBrandTail(hero.title, tagName: "h1", classAttr: "landing-hero-title")
      let visualHTML: String
      if let path = heroImagePath {
         let dimensions: String = {
            guard let width = heroImageWidth, let height = heroImageHeight else { return "" }
            return " width=\"\(width)\" height=\"\(height)\""
         }()
         visualHTML = """
            <div class="landing-hero-visual">
               <img src="\(path)" alt="\(hero.title.htmlEscaped) screenshot"\(dimensions) loading="eager" fetchpriority="high"/>
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

   private func renderFeatureBanner(_ banner: FeatureBannerSection, locale: String) -> String {
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
      let actionHTML: String = {
         // The featureBanner promotes a different app (Business Card) than the
         // landing hero (Tools). When the YAML provides explicit ctaText+linkURL,
         // render a single themed button; otherwise render dual store badges
         // defaulted to Business Card and overridable via YAML.
         if let ctaText = banner.ctaText, let linkURL = banner.linkURL {
            return "<a href=\"\(linkURL)\" class=\"landing-cta-button\">\(ctaText.htmlEscaped)</a>"
         }
         let appStore = banner.appStoreURL
            ?? StoreLink.appStore(app: .businessCard, page: "web-business-card-banner", locale: locale)
         let googlePlay = banner.googlePlayURL
            ?? StoreLink.googlePlay(app: .businessCard, page: "web-business-card-banner", locale: locale)
         return self.renderStoreButtons(appStoreURL: appStore, googlePlayURL: googlePlay)
      }()
      return """
      <section id="business-card" class="landing-feature-banner">
         <div class="landing-container">
            <div class="landing-feature-banner-content">
               \(media)
               <div class="landing-feature-banner-text">
                  <h2 class="landing-section-title">\(banner.title.htmlEscaped)</h2>
                  <p>\(banner.subtitle.htmlEscaped)</p>
                  \(actionHTML)
               </div>
            </div>
         </div>
      </section>
      """
   }

   private func renderTestimonials(_ testimonials: [Testimonial], title: String?) -> String {
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
      let heading = title.map { "<h2 class=\"landing-section-title\">\($0.htmlEscaped)</h2>" } ?? ""
      return """
      <section class="landing-testimonials">
         <div class="landing-container">
            \(heading)
            <div class="landing-testimonials-grid">\(cards.joined())</div>
         </div>
      </section>
      """
   }

   private func renderFeatureGrid(_ features: [Feature], title: String?, basePath: String) -> String {
      var cards: [String] = []
      for (index, feature) in features.enumerated() {
         let num = String(format: "%02d", index + 1)
         let platformsHTML: String = {
            guard let platforms = feature.platforms else { return "" }
            return PlatformBadge.render(platforms: platforms, wrapperClass: "landing-feature-platforms")
         }()
         let body = """
            <span class="landing-feature-num" aria-hidden="true">\(num)</span>
            <img src="\(feature.imagePath)" alt="\(feature.title.htmlEscaped)" loading="lazy" class="landing-feature-image"/>
            <div class="landing-feature-card-text">
               <h3 class="landing-feature-title">\(feature.title.htmlEscaped)</h3>
               \(platformsHTML)
               <p class="landing-feature-desc">\(feature.description.htmlEscaped)</p>
            </div>
         """
         // When the YAML names a feature-detail slug, render the card as an
         // anchor so the whole thing is clickable into /features/{slug}/.
         if let slug = feature.slug, !slug.isEmpty {
            let href = "\(basePath)features/\(slug)/"
            cards.append("<a class=\"landing-feature-card is-linked\" href=\"\(href)\">\(body)</a>")
         } else {
            cards.append("<article class=\"landing-feature-card\">\(body)</article>")
         }
      }
      let heading = (title ?? "").isEmpty ? "" : "<h2 class=\"landing-section-title\">\(title!.htmlEscaped)</h2>"
      return """
      <section id="features" class="landing-feature-grid">
         <div class="landing-container">
            \(heading)
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

   private func renderAppStoreReviews(_ reviews: [AppStoreReview], title: String?) -> String {
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
      let heading = (title ?? "").isEmpty ? "" : "<h2 class=\"landing-section-title\">\(title!.htmlEscaped)</h2>"
      return """
      <section class="landing-reviews">
         <div class="landing-container">
            \(heading)
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
         <img src="/assets/theme/images/nfc-the-cool-way-to-connect-black.svg" alt=""/>
      </section>
      """
   }

   private func renderFAQ(_ items: [FAQItem], title: String?) -> String {
      // Question is plain text, escaped for safety. Answer is treated as
      // raw HTML so authors can include inline links (e.g.
      // `<a href="/affiliate-links/">…</a>`) and basic formatting. Source
      // is `Content/Data/Landing*.yaml`, never user input — XSS isn't a
      // concern.
      let faqItems = items.map { item in
         """
         <details class="faq-item">
            <summary>\(item.question.htmlEscaped)</summary>
            <p>\(item.answer)</p>
         </details>
         """
      }.joined()
      let heading = (title ?? "").isEmpty ? "" : "<h2 class=\"landing-section-title\">\(title!.htmlEscaped)</h2>"
      return """
      <section id="faq" class="landing-faq">
         <div class="landing-container">
            \(heading)
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
