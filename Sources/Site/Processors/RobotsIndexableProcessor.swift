import Foundation
import SiteKit

/// Inject an explicit `<meta name="robots" content="index, follow"/>` into every
/// page's `<head>`. Search engines treat absent robots meta as indexable by
/// default, but emitting the directive explicitly makes the intent unambiguous
/// for crawlers, audits (Lighthouse, Ahrefs, etc.), and human reviewers.
///
/// Pages that already declare a robots meta (e.g. the 404 page which sets
/// `noindex, nofollow` via `buildHead(noindex: true)`) are skipped so we never
/// override an explicit no-index directive.
struct RobotsIndexableProcessor: OutputProcessor {
   func process(outputDirectory: URL, projectDirectory: URL, themeConfig: ThemeConfig?) throws {
      let tag = "<meta name=\"robots\" content=\"index, follow\"/>"

      let fileManager = FileManager.default
      guard let enumerator = fileManager.enumerator(at: outputDirectory, includingPropertiesForKeys: nil) else { return }

      for case let url as URL in enumerator where url.pathExtension == "html" {
         guard var html = try? String(contentsOf: url, encoding: .utf8) else { continue }
         // Respect any existing robots directive (noindex on 404 pages, etc.).
         guard !html.contains("name=\"robots\"") else { continue }
         guard let headRange = html.range(of: "<head>") else { continue }
         html.insert(contentsOf: tag, at: headRange.upperBound)
         try? html.write(to: url, atomically: true, encoding: .utf8)
      }
   }
}
