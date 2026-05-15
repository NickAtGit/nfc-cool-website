import Foundation

struct FeatureData: Decodable, Sendable {
   let slug: String
   let hero: FeatureHero
   let capabilities: [FeatureCapability]?
   let capabilitiesTitle: String?
   let subsections: [FeatureSubsection]?
   let subsectionsTitle: String?
   let specs: [FeatureSpecGroup]?
   let specsTitle: String?
   let pricing: FeaturePricingTier?
   let featuredReviews: [AppStoreReview]?
   let featuredReviewsTitle: String?
   let faq: [FAQItem]?
   let faqTitle: String?
   let docsBody: String?
   let backLinkText: String?
}

struct FeatureHero: Decodable, Sendable {
   let title: String
   let subtitle: String
   let platforms: String?
   let heroImagePath: String?
}

struct FeatureCapability: Decodable, Sendable {
   let title: String
   let description: String
}

struct FeatureSubsection: Decodable, Sendable {
   let title: String
   let body: String
   let imagePath: String?
   let imageAlt: String?
   let platforms: String?
}

struct FeatureSpecGroup: Decodable, Sendable {
   let title: String
   let items: [String]
}

struct FeaturePricingTier: Decodable, Sendable {
   let title: String?
   let freeHeader: String?
   let platinumHeader: String?
   let rows: [FeaturePricingRow]
}

struct FeaturePricingRow: Decodable, Sendable {
   let feature: String
   let free: String?
   let platinum: String?
}
