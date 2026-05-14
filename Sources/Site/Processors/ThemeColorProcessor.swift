import Foundation
import SiteKit

/// Inject `<meta name="theme-color">` tags into every page's `<head>`, with
/// light/dark variants matched to the page's actual background color. Chrome
/// on Android uses this to tint the URL bar; Safari on macOS uses it for the
/// pinned-tab color hint. Without this meta, both default to a generic neutral
/// that doesn't match the page.
///
/// Values mirror `colorBg.any` / `colorBg.dark` in Theme/theme.yaml. They are
/// hardcoded here rather than parsed from ThemeConfig - the tokens are stable,
/// and avoiding a runtime YAML resolution keeps the processor trivial. If the
/// brand background ever changes, update both the theme.yaml token and these
/// constants in lockstep.
struct ThemeColorProcessor: OutputProcessor {
   private let lightColor = "#F5F6F8"   // colorBg.any
   private let darkColor = "#161B22"    // colorBg.dark

   func process(outputDirectory: URL, projectDirectory: URL, themeConfig: ThemeConfig?) throws {
      let tags = """
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="\(self.lightColor)"/><meta name="theme-color" media="(prefers-color-scheme: dark)" content="\(self.darkColor)"/>
      """

      let fileManager = FileManager.default
      guard let enumerator = fileManager.enumerator(at: outputDirectory, includingPropertiesForKeys: nil) else { return }

      for case let url as URL in enumerator where url.pathExtension == "html" {
         guard var html = try? String(contentsOf: url, encoding: .utf8) else { continue }
         guard !html.contains("name=\"theme-color\"") else { continue }
         guard let headRange = html.range(of: "<head>") else { continue }
         html.insert(contentsOf: tags, at: headRange.upperBound)
         try? html.write(to: url, atomically: true, encoding: .utf8)
      }
   }
}
