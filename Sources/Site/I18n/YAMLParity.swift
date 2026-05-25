import Foundation
import Yams

/// A coding key that accepts any string - lets us decode an arbitrary YAML
/// mapping without knowing its keys ahead of time.
struct AnyKey: CodingKey {
   var stringValue: String
   var intValue: Int?
   init?(stringValue: String) { self.stringValue = stringValue; self.intValue = nil }
   init?(intValue: Int) { self.stringValue = String(intValue); self.intValue = intValue }
}

/// A generic decoded YAML value, used to compare the *structure* (key paths)
/// and leaf values of two localized data files without binding to any concrete
/// model. Mapping order is preserved so flattening is stable.
indirect enum YAMLValue: Decodable {
   case scalar(String)
   case mapping([(key: String, value: YAMLValue)])
   case sequence([YAMLValue])
   case null

   init(from decoder: Decoder) throws {
      if var unkeyed = try? decoder.unkeyedContainer() {
         var items: [YAMLValue] = []
         while !unkeyed.isAtEnd { items.append(try unkeyed.decode(YAMLValue.self)) }
         self = .sequence(items)
         return
      }
      if let keyed = try? decoder.container(keyedBy: AnyKey.self) {
         var pairs: [(String, YAMLValue)] = []
         for key in keyed.allKeys {
            pairs.append((key.stringValue, try keyed.decode(YAMLValue.self, forKey: key)))
         }
         self = .mapping(pairs)
         return
      }
      let single = try decoder.singleValueContainer()
      if single.decodeNil() {
         self = .null
      } else if let s = try? single.decode(String.self) {
         self = .scalar(s)
      } else if let b = try? single.decode(Bool.self) {
         self = .scalar(b ? "true" : "false")
      } else if let i = try? single.decode(Int.self) {
         self = .scalar(String(i))
      } else if let d = try? single.decode(Double.self) {
         self = .scalar(String(d))
      } else {
         self = .null
      }
   }
}

/// A single leaf value at a dotted/indexed key path (e.g. `hero.title`,
/// `faq[2].question`).
struct Leaf {
   let path: String
   let value: String
}

enum YAMLParity {
   /// Decodes a YAML document into the generic value tree.
   static func parse(_ yaml: String) throws -> YAMLValue {
      try YAMLDecoder().decode(YAMLValue.self, from: yaml)
   }

   /// Flattens a value tree into its leaves, keyed by path. Sequences are
   /// indexed positionally so a dropped array element shows up as missing paths.
   static func leaves(_ value: YAMLValue, prefix: String = "") -> [Leaf] {
      switch value {
      case .scalar(let s):
         return [Leaf(path: prefix, value: s)]
      case .null:
         return [Leaf(path: prefix, value: "")]
      case .mapping(let pairs):
         return pairs.flatMap { pair -> [Leaf] in
            let path = prefix.isEmpty ? pair.key : "\(prefix).\(pair.key)"
            return leaves(pair.value, prefix: path)
         }
      case .sequence(let items):
         return items.enumerated().flatMap { index, item -> [Leaf] in
            leaves(item, prefix: "\(prefix)[\(index)]")
         }
      }
   }

   /// Extracts the leading `---` YAML frontmatter block from a Markdown file,
   /// or nil if there isn't one.
   static func frontmatter(of markdown: String) -> String? {
      guard markdown.hasPrefix("---") else { return nil }
      let lines = markdown.components(separatedBy: "\n")
      guard lines.first?.trimmingCharacters(in: .whitespaces) == "---" else { return nil }
      var body: [String] = []
      for line in lines.dropFirst() {
         if line.trimmingCharacters(in: .whitespaces) == "---" {
            return body.joined(separator: "\n")
         }
         body.append(line)
      }
      return nil
   }

   /// The last path segment with any trailing `[index]` stripped - used to
   /// match a leaf against allowlisted key names.
   static func leafKeyName(of path: String) -> String {
      let last = path.split(separator: ".").last.map(String.init) ?? path
      if let bracket = last.firstIndex(of: "[") {
         return String(last[..<bracket])
      }
      return last
   }
}
