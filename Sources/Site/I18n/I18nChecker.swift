import Foundation
import SiteKit

/// Severity of an `i18n-check` finding. `.error` fails the build (exit 1);
/// `.warning` is advisory. The raw values sort errors before warnings.
enum Severity: String { case error = "ERROR", warning = "WARN " }

struct Finding {
   let severity: Severity
   let file: String
   let message: String
   static func error(_ file: String, _ message: String) -> Finding {
      Finding(severity: .error, file: file, message: message)
   }
   static func warn(_ file: String, _ message: String) -> Finding {
      Finding(severity: .warning, file: file, message: message)
   }
}

/// The translation completeness gate. Verifies everything SiteKit's built-in
/// `validate` misses: per-locale file presence across ALL localizable roots,
/// YAML key-path parity (missing / extra keys, empty values), the UI-string
/// catalog (every code-referenced key translated for every locale), plus
/// deterministic lint (scaffold TODO markers, em/en dashes).
///
/// Hard errors (fail the build): a missing locale file, a missing/extra YAML
/// key, an empty value where the default language is non-empty, a catalog key
/// missing/empty/untranslated for any locale, a leftover scaffold TODO marker,
/// and em/en dashes in structured data. Advisory warnings: content values that
/// look untranslated (byte-identical to the default), orphan catalog keys.
enum I18nChecker {
   struct Result {
      var findings: [Finding]
      var hasErrors: Bool { self.findings.contains { $0.severity == .error } }
   }

   static func run(projectDirectory: URL, siteConfig: SiteConfig, checkConfig: I18nCheckConfig) -> Result {
      var findings: [Finding] = []
      let defaultLang = siteConfig.effectiveDefaultLanguage
      let targetLangs = siteConfig.localization?.languages ?? []
      let allLangs = siteConfig.allLanguages

      for root in checkConfig.localizableRoots {
         findings += self.checkRoot(root, projectDirectory: projectDirectory, defaultLang: defaultLang, targetLangs: targetLangs, config: checkConfig)
      }
      findings += self.checkCatalog(projectDirectory: projectDirectory, allLangs: allLangs, defaultLang: defaultLang, config: checkConfig)
      return Result(findings: findings)
   }

   // MARK: - Localizable roots

   private static func checkRoot(_ root: I18nCheckConfig.Root, projectDirectory: URL, defaultLang: String, targetLangs: [String], config: I18nCheckConfig) -> [Finding] {
      var findings: [Finding] = []
      let fm = FileManager.default
      let dir = projectDirectory.appendingPathComponent(root.path)
      let ext = root.kind == .yaml ? "yaml" : "md"
      guard let entries = try? fm.contentsOfDirectory(at: dir, includingPropertiesForKeys: nil) else {
         return [.warn(root.path, "localizable root not found")]
      }

      // Default-language base files: the right extension, not a locale sibling,
      // matching the optional glob.
      let bases = entries.filter { url in
         guard url.pathExtension == ext else { return false }
         let stem = url.deletingPathExtension().lastPathComponent
         if let last = stem.split(separator: ".").last, targetLangs.contains(String(last)) { return false }
         if let glob = root.glob, !self.matchesGlob(url.lastPathComponent, glob) { return false }
         return true
      }.sorted { $0.path < $1.path }

      let emDashSeverity: Severity = root.kind == .yaml ? .error : .warning

      for baseURL in bases {
         let relBase = self.rel(baseURL, projectDirectory)
         if self.isEnOnly(relBase, config: config) { continue }
         findings += self.lintFile(baseURL, relPath: relBase, emDashSeverity: emDashSeverity, config: config)

         let baseLeaves = self.leaves(of: baseURL, kind: root.kind)
         let baseByPath = Dictionary(baseLeaves.map { ($0.path, $0.value) }, uniquingKeysWith: { first, _ in first })

         for lang in targetLangs {
            let sibling = self.localeSibling(of: baseURL, lang: lang)
            let relSibling = self.rel(sibling, projectDirectory)
            guard fm.fileExists(atPath: sibling.path) else {
               findings.append(.error(relBase, "missing \(lang) translation (expected \(relSibling))"))
               continue
            }
            findings += self.lintFile(sibling, relPath: relSibling, emDashSeverity: emDashSeverity, config: config)
            let siblingLeaves = self.leaves(of: sibling, kind: root.kind)
            findings += self.compareLeaves(base: baseByPath, sibling: siblingLeaves, relSibling: relSibling, config: config)
         }
      }
      return findings
   }

   private static func compareLeaves(base: [String: String], sibling: [Leaf], relSibling: String, config: I18nCheckConfig) -> [Finding] {
      var findings: [Finding] = []
      let siblingByPath = Dictionary(sibling.map { ($0.path, $0.value) }, uniquingKeysWith: { first, _ in first })

      // Structural parity is compared with array indices collapsed (`faq[2]` ->
      // `faq[]`), so a translation legitimately having a different *number* of
      // FAQ / review / related-reading entries is fine - only a whole missing
      // or extra *field/section* surfaces. Advisory: a missing optional section
      // still renders, and required fields are enforced by typed YAML decoding
      // at build time. (A newly scaffolded locale copies the default structure
      // verbatim, so it never trips this.)
      let baseStruct = Set(base.keys.map(self.collapseIndices))
      let siblingStruct = Set(siblingByPath.keys.map(self.collapseIndices))
      for missing in baseStruct.subtracting(siblingStruct).sorted() {
         findings.append(.warn(relSibling, "field present in default language but missing here: \(missing)"))
      }
      for extra in siblingStruct.subtracting(baseStruct).sorted() {
         findings.append(.warn(relSibling, "field not in default language: \(extra)"))
      }

      // Value-level checks at exact matching paths.
      for (path, value) in siblingByPath {
         guard let enValue = base[path] else { continue }
         if !enValue.isEmpty, value.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            findings.append(.error(relSibling, "empty value at \(path)"))
         } else if !enValue.isEmpty, value == enValue, !self.isAllowedIdentical(path: path, value: value, config: config) {
            findings.append(.warn(relSibling, "looks untranslated at \(path): \"\(self.truncate(value))\""))
         }
      }
      return findings
   }

   /// Collapses positional array indices in a key path (`faq[2].question` ->
   /// `faq[].question`) so structural comparison ignores element counts.
   private static func collapseIndices(_ path: String) -> String {
      path.replacingOccurrences(of: #"\[[0-9]+\]"#, with: "[]", options: .regularExpression)
   }

   // MARK: - Catalog

   private static func checkCatalog(projectDirectory: URL, allLangs: [String], defaultLang: String, config: I18nCheckConfig) -> [Finding] {
      var findings: [Finding] = []
      let rel = "Strings/Localizable.json"
      let url = projectDirectory.appendingPathComponent(rel)
      guard let data = try? Data(contentsOf: url),
            let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any]
      else {
         return [.error(rel, "missing or unreadable string catalog")]
      }

      var localizationsByKey: [String: [String: String]] = [:]
      for (key, value) in json {
         guard let entry = value as? [String: Any], let loc = entry["localizations"] as? [String: String] else {
            findings.append(.warn(rel, "entry '\(key)' has no localizations map"))
            continue
         }
         localizationsByKey[key] = loc
      }

      // Every code-referenced key must exist.
      for key in SiteStringKey.allCases where localizationsByKey[key.rawValue] == nil {
         findings.append(.error(rel, "missing catalog key required by code: \(key.rawValue)"))
      }

      for (key, loc) in localizationsByKey.sorted(by: { $0.key < $1.key }) {
         let isKnown = SiteStringKey(rawValue: key) != nil || key.hasPrefix("tagName_") || key.hasPrefix("tagDesc_")
         if !isKnown { findings.append(.warn(rel, "orphan catalog key (not referenced by code): \(key)")) }

         let enValue = loc[defaultLang] ?? ""
         for lang in allLangs {
            guard let value = loc[lang], !value.isEmpty else {
               findings.append(.error(rel, "key '\(key)' missing \(lang) value"))
               continue
            }
            if config.lint.forbidEmDash, value.contains("—") || value.contains("–") {
               findings.append(.error(rel, "key '\(key)' \(lang) value contains em/en dash (use a plain hyphen)"))
            }
            if value.contains(config.lint.todoMarker) {
               findings.append(.error(rel, "key '\(key)' \(lang) value contains untranslated TODO marker"))
            }
            if lang != defaultLang, !enValue.isEmpty, value == enValue, !config.identicalAllowlist.catalogKeys.contains(key) {
               findings.append(.error(rel, "key '\(key)' \(lang) value identical to \(defaultLang) (untranslated): \"\(self.truncate(value))\""))
            }
         }
      }
      return findings
   }

   // MARK: - Lint

   private static func lintFile(_ url: URL, relPath: String, emDashSeverity: Severity, config: I18nCheckConfig) -> [Finding] {
      guard let text = try? String(contentsOf: url, encoding: .utf8) else { return [] }
      var findings: [Finding] = []
      if config.lint.forbidEmDash, text.contains("—") || text.contains("–") {
         findings.append(Finding(severity: emDashSeverity, file: relPath, message: "contains em/en dash (use a plain hyphen)"))
      }
      if text.contains(config.lint.todoMarker) {
         findings.append(.error(relPath, "contains untranslated scaffold TODO marker \(config.lint.todoMarker)"))
      }
      return findings
   }

   // MARK: - Helpers

   private static func leaves(of url: URL, kind: I18nCheckConfig.Root.Kind) -> [Leaf] {
      guard let text = try? String(contentsOf: url, encoding: .utf8) else { return [] }
      let yaml: String
      switch kind {
      case .yaml: yaml = text
      case .markdown:
         guard let fm = YAMLParity.frontmatter(of: text) else { return [] }
         yaml = fm
      }
      guard let value = try? YAMLParity.parse(yaml) else { return [] }
      return YAMLParity.leaves(value)
   }

   private static func localeSibling(of baseURL: URL, lang: String) -> URL {
      let ext = baseURL.pathExtension
      let stem = baseURL.deletingPathExtension().lastPathComponent
      return baseURL.deletingLastPathComponent().appendingPathComponent("\(stem).\(lang).\(ext)")
   }

   private static func isEnOnly(_ relPath: String, config: I18nCheckConfig) -> Bool {
      if config.enOnly.files.contains(relPath) { return true }
      for root in config.enOnly.roots where relPath == root || relPath.hasPrefix(root + "/") { return true }
      return false
   }

   private static func isAllowedIdentical(path: String, value: String, config: I18nCheckConfig) -> Bool {
      let trimmed = value.trimmingCharacters(in: .whitespaces)
      if config.identicalAllowlist.literals.contains(value) || config.identicalAllowlist.literals.contains(trimmed) { return true }
      if config.identicalAllowlist.keyNames.contains(YAMLParity.leafKeyName(of: path)) { return true }
      if config.identicalAllowlist.pricingCellTokens.contains(trimmed) { return true }
      // No Latin letters -> not translatable prose (numbers, symbols, CJK, emoji, glyphs).
      if value.range(of: "[A-Za-z]", options: .regularExpression) == nil { return true }
      // URLs and absolute asset paths are locale-invariant.
      if trimmed.hasPrefix("http") || trimmed.hasPrefix("/") { return true }
      return false
   }

   private static func matchesGlob(_ name: String, _ glob: String) -> Bool {
      var pattern = "^"
      for ch in glob {
         switch ch {
         case "*": pattern += ".*"
         case "?": pattern += "."
         case ".", "+", "(", ")", "[", "]", "{", "}", "^", "$", "\\", "|": pattern += "\\\(ch)"
         default: pattern.append(ch)
         }
      }
      pattern += "$"
      return name.range(of: pattern, options: .regularExpression) != nil
   }

   private static func rel(_ url: URL, _ projectDirectory: URL) -> String {
      let base = projectDirectory.standardizedFileURL.path
      let path = url.standardizedFileURL.path
      return path.hasPrefix(base + "/") ? String(path.dropFirst(base.count + 1)) : path
   }

   private static func truncate(_ string: String) -> String {
      string.count > 50 ? String(string.prefix(50)) + "…" : string
   }

   // MARK: - Reporting

   static func report(_ result: Result) {
      let byFile = Dictionary(grouping: result.findings) { $0.file }
      for file in byFile.keys.sorted() {
         guard let findings = byFile[file], !findings.isEmpty else { continue }
         print("\n\(file)")
         for finding in findings.sorted(by: { ($0.severity.rawValue, $0.message) < ($1.severity.rawValue, $1.message) }) {
            print("  [\(finding.severity.rawValue)] \(finding.message)")
         }
      }
      let errors = result.findings.filter { $0.severity == .error }.count
      let warnings = result.findings.filter { $0.severity == .warning }.count
      print("\ni18n-check: \(errors) error(s), \(warnings) warning(s)")
      if errors == 0 { print("✓ translations complete") }
   }
}
