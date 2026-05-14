import Foundation

/// JSON-LD schema builders for structured data. Each helper returns a JSON
/// string ready to pass as `jsonLD:` to `OutputFileRenderer.buildHead(...)`.
///
/// `buildHead` wraps the returned string in `<script type="application/ld+json">`,
/// so callers should produce valid JSON (object or `@graph`-keyed array) without
/// the surrounding script tag.
enum StructuredData {
   /// Combined landing-page graph: Organization, WebSite, and SoftwareApplication
   /// entries for each of the three apps. Optional FAQ block when the landing
   /// YAML includes one. Returned as a single `@graph` array so Google can
   /// resolve `@id` cross-references.
   static func landingGraph(baseURL: String, siteName: String, description: String, faq: [FAQItem]?) -> String {
      var nodes: [String] = []
      nodes.append(self.organization(baseURL: baseURL, siteName: siteName))
      nodes.append(self.webSite(baseURL: baseURL, siteName: siteName, description: description))
      nodes.append(self.softwareApplicationToolsiOS(baseURL: baseURL))
      nodes.append(self.softwareApplicationToolsAndroid(baseURL: baseURL))
      nodes.append(self.softwareApplicationBusinessCard(baseURL: baseURL))
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

   /// BreadcrumbList for a blog post: Home → Blog → {post title}.
   static func blogPostBreadcrumb(baseURL: String, homePath: String, sectionName: String, sectionPath: String, postTitle: String, postPath: String) -> String {
      let items: [String] = [
         self.listItem(position: 1, name: "Home", url: "\(baseURL)\(homePath)"),
         self.listItem(position: 2, name: sectionName, url: "\(baseURL)\(sectionPath)"),
         self.listItem(position: 3, name: postTitle, url: "\(baseURL)\(postPath)")
      ]
      return """
      {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[\(items.joined(separator: ","))]}
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

   private static func softwareApplicationToolsiOS(baseURL: String) -> String {
      return """
      {"@type":"SoftwareApplication","name":"NFC.cool Tools","operatingSystem":"iOS","applicationCategory":"UtilitiesApplication","url":"https://apps.apple.com/app/id1249686798","downloadUrl":"https://apps.apple.com/app/id1249686798","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"publisher":{"@id":"\(baseURL)/#organization"}}
      """
   }

   private static func softwareApplicationToolsAndroid(baseURL: String) -> String {
      return """
      {"@type":"SoftwareApplication","name":"NFC.cool Tools","operatingSystem":"ANDROID","applicationCategory":"UtilitiesApplication","url":"https://play.google.com/store/apps/details?id=cool.nfc","downloadUrl":"https://play.google.com/store/apps/details?id=cool.nfc","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"publisher":{"@id":"\(baseURL)/#organization"}}
      """
   }

   private static func softwareApplicationBusinessCard(baseURL: String) -> String {
      return """
      {"@type":"SoftwareApplication","name":"NFC.cool Business Card","operatingSystem":"iOS","applicationCategory":"BusinessApplication","url":"https://apps.apple.com/app/id6502926572","downloadUrl":"https://apps.apple.com/app/id6502926572","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"publisher":{"@id":"\(baseURL)/#organization"}}
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
