import Foundation
import SiteKit

/// Mark HTML meta-refresh redirect pages as `noindex,follow`.
///
/// `redirects.yaml` produces 40 bridge pages that exist at old Webflow
/// URLs (e.g. `/privacy-policy/`, `/qr-barcode-scanner/`). Each contains
/// a `<meta http-equiv="refresh">` that bounces visitors to the new
/// canonical URL. Without intervention they ship with
/// `<meta name="robots" content="index, follow"/>` (from
/// `RobotsIndexableProcessor`), so Google indexes 40 "Redirecting…"
/// pages and SEO audits flag them as duplicate-content noise.
///
/// This processor scans every emitted HTML file. When the head contains
/// a meta-refresh, it rewrites the `robots` meta to `noindex,follow`
/// (don't index the bridge page, but do follow the redirect so the new
/// URL gets discovered). Non-redirect pages are untouched.
///
/// Runs after `RobotsIndexableProcessor` so the original `index,follow`
/// tag is already present and can be cleanly swapped.
struct RedirectNoindexProcessor: OutputProcessor {
   func process(outputDirectory: URL, projectDirectory: URL, themeConfig: ThemeConfig?) throws {
      let fileManager = FileManager.default
      guard let enumerator = fileManager.enumerator(at: outputDirectory, includingPropertiesForKeys: nil) else { return }

      for case let url as URL in enumerator where url.pathExtension == "html" {
         guard var html = try? String(contentsOf: url, encoding: .utf8) else { continue }
         guard html.contains(#"http-equiv="refresh""#) else { continue }

         // Match the existing tag in any whitespace/quoting form `RobotsIndexableProcessor`
         // might have emitted. Replace with the noindex form. If no robots meta exists yet
         // (unexpected, but possible), insert one right after `<head>`.
         let pattern = #"<meta name="robots" content="[^"]*"\s*/?>"#
         guard let regex = try? NSRegularExpression(pattern: pattern) else { continue }
         let range = NSRange(html.startIndex..., in: html)
         let replacement = #"<meta name="robots" content="noindex,follow"/>"#
         let matched = regex.firstMatch(in: html, range: range) != nil
         if matched {
            html = regex.stringByReplacingMatches(in: html, range: range, withTemplate: replacement)
         } else if let headRange = html.range(of: "<head>") {
            html.insert(contentsOf: replacement, at: headRange.upperBound)
         } else {
            continue
         }
         try? html.write(to: url, atomically: true, encoding: .utf8)
      }
   }
}
