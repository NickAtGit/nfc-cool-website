import Foundation
import Yams

/// Decoded form of the repo-root `i18n.yaml` - configuration for the
/// `i18n-check` translation gate. Every section tolerates being absent so the
/// file can be trimmed without breaking decoding.
struct I18nCheckConfig: Decodable {
   /// A directory whose default-language files must have a sibling per locale.
   struct Root: Decodable {
      enum Kind: String, Decodable { case markdown, yaml }
      let kind: Kind
      let path: String
      let glob: String?
   }

   struct EnOnly: Decodable {
      var roots: [String]
      var files: [String]
      init(from decoder: Decoder) throws {
         let c = try decoder.container(keyedBy: CodingKeys.self)
         self.roots = try c.decodeIfPresent([String].self, forKey: .roots) ?? []
         self.files = try c.decodeIfPresent([String].self, forKey: .files) ?? []
      }
      init() { self.roots = []; self.files = [] }
      enum CodingKeys: String, CodingKey { case roots, files }
   }

   struct IdenticalAllowlist: Decodable {
      var keyNames: Set<String>
      var literals: Set<String>
      var catalogKeys: Set<String>
      var pricingCellTokens: Set<String>
      init(from decoder: Decoder) throws {
         let c = try decoder.container(keyedBy: CodingKeys.self)
         self.keyNames = Set(try c.decodeIfPresent([String].self, forKey: .keyNames) ?? [])
         self.literals = Set(try c.decodeIfPresent([String].self, forKey: .literals) ?? [])
         self.catalogKeys = Set(try c.decodeIfPresent([String].self, forKey: .catalogKeys) ?? [])
         self.pricingCellTokens = Set(try c.decodeIfPresent([String].self, forKey: .pricingCellTokens) ?? [])
      }
      init() { self.keyNames = []; self.literals = []; self.catalogKeys = []; self.pricingCellTokens = [] }
      enum CodingKeys: String, CodingKey { case keyNames, literals, catalogKeys, pricingCellTokens }
   }

   struct Lint: Decodable {
      var todoMarker: String
      var forbidEmDash: Bool
      init(from decoder: Decoder) throws {
         let c = try decoder.container(keyedBy: CodingKeys.self)
         self.todoMarker = try c.decodeIfPresent(String.self, forKey: .todoMarker) ?? "⟦TODO"
         self.forbidEmDash = try c.decodeIfPresent(Bool.self, forKey: .forbidEmDash) ?? true
      }
      init() { self.todoMarker = "⟦TODO"; self.forbidEmDash = true }
      enum CodingKeys: String, CodingKey { case todoMarker, forbidEmDash }
   }

   var localizableRoots: [Root]
   var enOnly: EnOnly
   var identicalAllowlist: IdenticalAllowlist
   var lint: Lint

   init(from decoder: Decoder) throws {
      let c = try decoder.container(keyedBy: CodingKeys.self)
      self.localizableRoots = try c.decodeIfPresent([Root].self, forKey: .localizableRoots) ?? []
      self.enOnly = try c.decodeIfPresent(EnOnly.self, forKey: .enOnly) ?? EnOnly()
      self.identicalAllowlist = try c.decodeIfPresent(IdenticalAllowlist.self, forKey: .identicalAllowlist) ?? IdenticalAllowlist()
      self.lint = try c.decodeIfPresent(Lint.self, forKey: .lint) ?? Lint()
   }
   enum CodingKeys: String, CodingKey { case localizableRoots, enOnly, identicalAllowlist, lint }

   static func load(from projectDirectory: URL) throws -> I18nCheckConfig {
      let url = projectDirectory.appendingPathComponent("i18n.yaml")
      let data = try Data(contentsOf: url)
      return try YAMLDecoder().decode(I18nCheckConfig.self, from: data)
   }
}
