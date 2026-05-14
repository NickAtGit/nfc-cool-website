import Foundation
import SiteKit

/// JSON-LD schema builders for structured data. Each helper returns a JSON
/// string ready to pass as `jsonLD:` to `OutputFileRenderer.buildHead(...)`.
///
/// `buildHead` wraps the returned string in `<script type="application/ld+json">`,
/// so callers should produce valid JSON (object or `@graph`-keyed array) without
/// the surrounding script tag.
enum StructuredData {
   /// Combined landing-page graph: Organization, WebSite, Person (the author),
   /// SoftwareApplication entries for each of the three apps (with optional
   /// `aggregateRating` when ratings are configured), and FAQPage when the
   /// landing YAML includes one. Returned as a single `@graph` array so Google
   /// can resolve `@id` cross-references between Organization ↔ Person ↔ apps.
   static func landingGraph(
      baseURL: String,
      siteName: String,
      description: String,
      ratings: AppRatings,
      faq: [FAQItem]?
   ) -> String {
      var nodes: [String] = []
      nodes.append(self.organization(baseURL: baseURL, siteName: siteName))
      nodes.append(self.webSite(baseURL: baseURL, siteName: siteName, description: description))
      nodes.append(self.person(baseURL: baseURL))
      nodes.append(self.softwareApplicationToolsiOS(baseURL: baseURL, rating: ratings.toolsIOS))
      nodes.append(self.softwareApplicationToolsAndroid(baseURL: baseURL, rating: ratings.toolsAndroid))
      nodes.append(self.softwareApplicationBusinessCard(baseURL: baseURL, rating: ratings.businessCardIOS))
      if let faq, !faq.isEmpty {
         nodes.append(self.faqPage(faq))
      }
      return """
      {"@context":"https://schema.org","@graph":[\(nodes.joined(separator: ","))]}
      """
   }

   /// BreadcrumbList for feature subpages: Home → Features → {feature title}.
   static func featureBreadcrumb(baseURL: String, homePath: String, featuresLabel: String, featureTitle: String, featureSlug: String) -> String {
      let items: [String] = [
         self.listItem(position: 1, name: "Home", url: "\(baseURL)\(homePath)"),
         self.listItem(position: 2, name: featuresLabel, url: "\(baseURL)\(homePath)features/"),
         self.listItem(position: 3, name: featureTitle, url: "\(baseURL)\(homePath)features/\(featureSlug)/")
      ]
      return """
      {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[\(items.joined(separator: ","))]}
      """
   }

   /// BreadcrumbList + ItemList combined for the features index page.
   static func featuresIndexGraph(baseURL: String, homePath: String, featuresLabel: String, items: [(title: String, slug: String)]) -> String {
      let breadcrumb = """
      {"@type":"BreadcrumbList","itemListElement":[\(self.listItem(position: 1, name: "Home", url: "\(baseURL)\(homePath)")),\(self.listItem(position: 2, name: featuresLabel, url: "\(baseURL)\(homePath)features/"))]}
      """
      let itemListEntries = items.enumerated().map { (idx, item) in
         self.listItem(position: idx + 1, name: item.title, url: "\(baseURL)\(homePath)features/\(item.slug)/")
      }.joined(separator: ",")
      let itemList = """
      {"@type":"ItemList","name":"\(featuresLabel.jsonEscaped)","itemListElement":[\(itemListEntries)]}
      """
      return """
      {"@context":"https://schema.org","@graph":[\(breadcrumb),\(itemList)]}
      """
   }

   /// Combined per-post graph: BlogPosting + BreadcrumbList + Person + Organization.
   ///
   /// AI answer engines (Gemini, ChatGPT, Perplexity) weight `BlogPosting`
   /// + `author` (typed `Person`) + `datePublished` very heavily when
   /// deciding whether to cite an article. The Person and Organization nodes
   /// are bundled into the same `@graph` so the `@id` cross-references the
   /// `author`/`publisher` fields point at resolve locally — search engines
   /// don't have to crawl another page to know who wrote this.
   static func blogPostGraph(
      baseURL: String,
      homePath: String,
      siteName: String,
      sectionName: String,
      sectionPath: String,
      post: BlogPostMeta
   ) -> String {
      let breadcrumb = """
      {"@type":"BreadcrumbList","itemListElement":[\(self.listItem(position: 1, name: "Home", url: "\(baseURL)\(homePath)")),\(self.listItem(position: 2, name: sectionName, url: "\(baseURL)\(sectionPath)")),\(self.listItem(position: 3, name: post.title, url: "\(baseURL)\(post.path)"))]}
      """
      let posting = self.blogPosting(baseURL: baseURL, sectionName: sectionName, post: post)
      let nodes = [
         breadcrumb,
         posting,
         self.person(baseURL: baseURL),
         self.organization(baseURL: baseURL, siteName: siteName),
      ]
      return """
      {"@context":"https://schema.org","@graph":[\(nodes.joined(separator: ","))]}
      """
   }

   /// ProfilePage + Person graph for the About page.
   ///
   /// `ProfilePage` is Schema.org's canonical "this page is about a real
   /// person" wrapper — Gemini and Bing's knowledge graph use it to verify
   /// authorship claims made elsewhere on the site.
   static func aboutPageGraph(baseURL: String, siteName: String) -> String {
      let profilePage = """
      {"@type":"ProfilePage","@id":"\(baseURL)/about/","url":"\(baseURL)/about/","mainEntity":{"@id":"\(baseURL)/about/#person"}}
      """
      let nodes = [
         profilePage,
         self.person(baseURL: baseURL),
         self.organization(baseURL: baseURL, siteName: siteName),
      ]
      return """
      {"@context":"https://schema.org","@graph":[\(nodes.joined(separator: ","))]}
      """
   }

   // MARK: - Schema fragments

   private static func organization(baseURL: String, siteName: String) -> String {
      let sameAs: [String] = [
         "https://apps.apple.com/app/id1249686798",
         "https://apps.apple.com/app/id6502926572",
         "https://play.google.com/store/apps/details?id=cool.nfc",
         "https://x.com/NFC_for_iPhone",
         "https://www.instagram.com/nfc.cool",
         "https://www.tiktok.com/@nfc.cool",
         "https://www.youtube.com/@NFC_cool",
         "https://www.linkedin.com/company/nfc-cool",
         "https://bsky.app/profile/nfc.cool",
         "https://www.threads.net/@nfc.cool",
         "https://www.facebook.com/NFC.cool/",
         "https://indieapps.space/@NFC"
      ]
      let sameAsJSON = sameAs.map { "\"\($0)\"" }.joined(separator: ",")
      return """
      {"@type":"Organization","@id":"\(baseURL)/#organization","name":"\(siteName.jsonEscaped)","url":"\(baseURL)/","logo":"\(baseURL)/icon-512.png","sameAs":[\(sameAsJSON)]}
      """
   }

   private static func webSite(baseURL: String, siteName: String, description: String) -> String {
      return """
      {"@type":"WebSite","@id":"\(baseURL)/#website","url":"\(baseURL)/","name":"\(siteName.jsonEscaped)","description":"\(description.jsonEscaped)","publisher":{"@id":"\(baseURL)/#organization"},"inLanguage":["en","de","ja"]}
      """
   }

   /// Author entity referenced by every blog post + the About page.
   ///
   /// `sameAs` proxies to brand-owned social accounts for now (user choice).
   /// When personal Nicolo Stanciu accounts go live (GitHub, personal LinkedIn,
   /// personal Bluesky), swap the array contents in one place here.
   private static func person(baseURL: String) -> String {
      let sameAs: [String] = [
         "https://x.com/NFC_for_iPhone",
         "https://bsky.app/profile/nfc.cool",
         "https://www.linkedin.com/company/nfc-cool"
      ]
      let sameAsJSON = sameAs.map { "\"\($0)\"" }.joined(separator: ",")
      return """
      {"@type":"Person","@id":"\(baseURL)/about/#person","name":"Nicolo Stanciu","url":"\(baseURL)/about/","jobTitle":"Independent software developer","worksFor":{"@id":"\(baseURL)/#organization"},"affiliation":{"@id":"\(baseURL)/#organization"},"sameAs":[\(sameAsJSON)]}
      """
   }

   private static func softwareApplicationToolsiOS(baseURL: String, rating: AppRating?) -> String {
      let ratingFragment = rating.map { ",\(self.aggregateRating($0))" } ?? ""
      return """
      {"@type":"SoftwareApplication","name":"NFC.cool Tools","operatingSystem":"iOS","applicationCategory":"UtilitiesApplication","url":"https://apps.apple.com/app/id1249686798","downloadUrl":"https://apps.apple.com/app/id1249686798","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"publisher":{"@id":"\(baseURL)/#organization"}\(ratingFragment)}
      """
   }

   private static func softwareApplicationToolsAndroid(baseURL: String, rating: AppRating?) -> String {
      let ratingFragment = rating.map { ",\(self.aggregateRating($0))" } ?? ""
      return """
      {"@type":"SoftwareApplication","name":"NFC.cool Tools","operatingSystem":"ANDROID","applicationCategory":"UtilitiesApplication","url":"https://play.google.com/store/apps/details?id=cool.nfc","downloadUrl":"https://play.google.com/store/apps/details?id=cool.nfc","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"publisher":{"@id":"\(baseURL)/#organization"}\(ratingFragment)}
      """
   }

   private static func softwareApplicationBusinessCard(baseURL: String, rating: AppRating?) -> String {
      let ratingFragment = rating.map { ",\(self.aggregateRating($0))" } ?? ""
      return """
      {"@type":"SoftwareApplication","name":"NFC.cool Business Card","operatingSystem":"iOS","applicationCategory":"BusinessApplication","url":"https://apps.apple.com/app/id6502926572","downloadUrl":"https://apps.apple.com/app/id6502926572","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"publisher":{"@id":"\(baseURL)/#organization"}\(ratingFragment)}
      """
   }

   private static func aggregateRating(_ rating: AppRating) -> String {
      return """
      "aggregateRating":{"@type":"AggregateRating","ratingValue":"\(rating.ratingValue)","ratingCount":"\(rating.ratingCount)","bestRating":"5","worstRating":"1"}
      """
   }

   private static func blogPosting(baseURL: String, sectionName: String, post: BlogPostMeta) -> String {
      let imageURL = post.image.map { img -> String in
         img.hasPrefix("http") ? img : "\(baseURL)\(img)"
      }
      let imageJSON = imageURL.map { ",\"image\":\"\($0)\"" } ?? ""
      let descriptionJSON = post.description.map { ",\"description\":\"\($0.jsonEscaped)\"" } ?? ""
      let inLanguageJSON = ",\"inLanguage\":\"\(post.locale)\""
      let articleSectionJSON = ",\"articleSection\":\"\(sectionName.jsonEscaped)\""
      let datePublished = post.datePublished
      let dateModified = post.dateModified ?? post.datePublished
      return """
      {"@type":"BlogPosting","@id":"\(baseURL)\(post.path)#blogpost","headline":"\(post.title.jsonEscaped)","url":"\(baseURL)\(post.path)","mainEntityOfPage":{"@type":"WebPage","@id":"\(baseURL)\(post.path)"},"datePublished":"\(datePublished)","dateModified":"\(dateModified)"\(imageJSON)\(descriptionJSON)\(articleSectionJSON)\(inLanguageJSON),"author":{"@id":"\(baseURL)/about/#person"},"publisher":{"@id":"\(baseURL)/#organization"}}
      """
   }

   private static func faqPage(_ items: [FAQItem]) -> String {
      let entries = items.map { item in
         """
         {"@type":"Question","name":"\(item.question.jsonEscaped)","acceptedAnswer":{"@type":"Answer","text":"\(item.answer.jsonEscaped)"}}
         """
      }.joined(separator: ",")
      return """
      {"@type":"FAQPage","mainEntity":[\(entries)]}
      """
   }

   private static func listItem(position: Int, name: String, url: String) -> String {
      return """
      {"@type":"ListItem","position":\(position),"name":"\(name.jsonEscaped)","item":"\(url)"}
      """
   }
}

// MARK: - Supporting types

/// Rating for a single app store listing. Both fields required; consumers
/// pass `nil` for the whole struct to skip `aggregateRating` emission.
struct AppRating: Sendable, Codable {
   let ratingValue: Double
   let ratingCount: Int
}

/// Container for the per-app ratings used in the landing `@graph`. Decoded
/// from a top-level `apps:` block in `SiteConfig.yaml`.
struct AppRatings: Sendable, Codable {
   let toolsIOS: AppRating?
   let toolsAndroid: AppRating?
   let businessCardIOS: AppRating?

   static let empty = AppRatings(toolsIOS: nil, toolsAndroid: nil, businessCardIOS: nil)
}

/// Per-post metadata gathered by `BlogPostRenderer` and handed to
/// `StructuredData.blogPostGraph(...)`. Pre-formatting `datePublished` /
/// `dateModified` as ISO 8601 (`yyyy-MM-dd`) strings keeps the schema
/// builder pure (no DateFormatter sharing across threads).
struct BlogPostMeta: Sendable {
   let title: String
   let path: String        // e.g. "/blog/nfc-tags-beginners-guide/"
   let description: String?
   let image: String?      // may be nil; relative or absolute
   let datePublished: String  // "yyyy-MM-dd"
   let dateModified: String?  // "yyyy-MM-dd" — falls back to datePublished when nil
   let locale: String      // "en", "de", "ja"
}

extension String {
   /// JSON-string escape: backslash, quote, and the four common control chars.
   /// Adequate for inserting into JSON-LD blocks that are themselves embedded
   /// in HTML via `<script type="application/ld+json">`.
   var jsonEscaped: String {
      var result = ""
      result.reserveCapacity(self.count)
      for c in self {
         switch c {
         case "\"": result.append("\\\"")
         case "\\": result.append("\\\\")
         case "\n": result.append("\\n")
         case "\r": result.append("\\r")
         case "\t": result.append("\\t")
         case "<": result.append("\\u003C")  // prevent </script injection
         case ">": result.append("\\u003E")
         default: result.append(c)
         }
      }
      return result
   }
}
