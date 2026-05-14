import Foundation

struct LandingData: Decodable, Sendable {
   let hero: HeroSection
   let trust: TrustSection?
   /// Meta description for the landing page. When present, takes precedence
   /// over `hero.subtitle` as the value passed to `<meta name="description">`.
   /// Should be 140+ chars (Latin) or 80+ chars (CJK) for SEO compliance.
   let description: String?
   let heroImagePath: String?
   /// Intrinsic pixel dimensions of `heroImagePath`. Emitted as the `width`
   /// and `height` attributes on the hero `<img>` so the browser can reserve
   /// layout space before the bytes arrive (eliminates CLS). When nil, the
   /// attributes are omitted and the browser falls back to post-load reflow.
   let heroImageWidth: Int?
   let heroImageHeight: Int?
   /// Optional 1200×630 brand image used for og:image / twitter:image on the
   /// landing page. Same path is expected across all three locale YAMLs (one
   /// shared image). When nil, the homepage emits no preview card.
   let ogImage: String?
   let ogImageAlt: String?
   let features: [Feature]?
   let featuresTitle: String?
   let featureBanner: FeatureBannerSection?
   let testimonials: [Testimonial]?
   let testimonialsTitle: String?
   let pricing: PricingSection?
   let appStoreReviews: [AppStoreReview]?
   let appStoreReviewsTitle: String?
   let trustedBy: [TrustedByApp]?
   let newsletter: NewsletterSection?
   let faq: [FAQItem]?
   let faqTitle: String?
   let cta: CTASection?
   let techSpecs: TechSpecsSection?
   let slogan: String?
}

struct TrustSection: Decodable, Sendable {
   let rating: String?
   let ratingCount: Int?
   let version: String?
   let price: String?
}

struct HeroSection: Decodable, Sendable {
   let title: String
   let subtitle: String
}

struct FeatureBannerSection: Decodable, Sendable {
   let title: String
   let subtitle: String
   let ctaText: String?
   let videoPath: String?
   let imagePath: String?
   let linkURL: String?
   /// When provided, the banner renders dual store badges instead of a single
   /// CTA - typically pointing at platform-specific products with campaign URLs.
   let appStoreURL: String?
   let googlePlayURL: String?
}

struct Feature: Decodable, Sendable {
   let title: String
   let description: String
   let imagePath: String
   let platforms: String?
   /// Optional feature-page slug. When set, the landing-page card becomes a
   /// link to `/features/{slug}/` so visitors can drill into the detail page.
   let slug: String?
}

struct Testimonial: Decodable, Sendable {
   let name: String
   let handle: String
   let avatarPath: String
   let quote: String
   let row: Int?
}

struct PricingSection: Decodable, Sendable {
   let title: String
   let subtitle: String
   let ctaText: String
   let tiers: [PricingTier]
}

struct PricingTier: Decodable, Sendable {
   let name: String
   let badge: String?
   let monthlyPrice: String
   let features: [String]
   let highlighted: Bool?
}

struct TechSpecsSection: Decodable, Sendable {
   let columns: [TechSpecColumn]
}

struct TechSpecColumn: Decodable, Sendable {
   let title: String
   let items: [String]
}

struct AppStoreReview: Decodable, Sendable {
   let quote: String
   let author: String
   let location: String
   let avatarPath: String?
}

struct TrustedByApp: Decodable, Sendable {
   let name: String
   let url: String
   let iconPath: String?
}

struct FAQItem: Decodable, Sendable {
   let question: String
   let answer: String
}

struct CTASection: Decodable, Sendable {
   let title: String
   let buttonText: String
}

struct NewsletterSection: Decodable, Sendable {
   let title: String
   let subtitle: String?
   let placeholder: String
   let buttonText: String
   let successText: String
   let errorText: String
   let endpoint: String?
   let listID: String?
   let consent: String?
}
