import Foundation

struct FeatureData: Decodable, Sendable {
   let slug: String
   let hero: FeatureHero
   let capabilities: [FeatureCapability]?
   let capabilitiesTitle: String?
   let screenshots: [FeatureScreenshot]?
   let specs: [FeatureSpecGroup]?
   let specsTitle: String?
   let faq: [FAQItem]?
   let faqTitle: String?
   let cta: FeatureCTA?
   let appStoreURL: String?
   let googlePlayURL: String?
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

struct FeatureScreenshot: Decodable, Sendable {
   let path: String
   let alt: String?
   let caption: String?
}

struct FeatureSpecGroup: Decodable, Sendable {
   let title: String
   let items: [String]
}

struct FeatureCTA: Decodable, Sendable {
   let title: String
   let buttonText: String?
}
