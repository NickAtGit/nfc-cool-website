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
   /// Alt text for the hero image. When nil, the hero title plus "screenshot".
   let heroImageAlt: String?
   /// A live 3D scene for the hero (`/scenes/<key>.glb`): `heroImagePath` is then its still,
   /// frame `heroScenePosterFrame`, which live-scenes.mjs swaps for the animation.
   let heroScene: String?
   let heroScenePosterFrame: Int?
   /// Optional 1200×630 brand image used for og:image / twitter:image on the
   /// landing page. Same path is expected across all three locale YAMLs (one
   /// shared image). When nil, the homepage emits no preview card.
   let ogImage: String?
   let ogImageAlt: String?
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

/// Per-locale prose for the hero/final-CTA trust line. The rating value and
/// count deliberately live in `SiteConfig.yaml`'s `apps:` block instead, so
/// refreshing the store figures is one edit rather than nine - see
/// `loadTrustLine(context:trust:)`. Presence of the block is what opts a
/// locale into showing the line at all.
struct TrustSection: Decodable, Sendable {
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
   let imageAlt: String?
   /// A live 3D scene in place of the image: `imagePath` is then its still at frame
   /// `scenePosterFrame`, shown at `sceneFrameFill` of the box (see live-scenes.mjs).
   let scene: String?
   let scenePosterFrame: Int?
   let sceneFrameFill: Double?
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
}

struct NewsletterSection: Decodable, Sendable {
   let title: String
   let subtitle: String?
   let placeholder: String
   let buttonText: String
   let successText: String
   let errorText: String
   let endpoint: String?
   let consent: String?
}
