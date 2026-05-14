import Foundation
import SiteKit

/// Custom `robots.txt` renderer.
///
/// SiteKit's default `RobotsTxtRenderer` emits `Allow: /` for every block,
/// which is non-canonical syntax — the original robots.txt spec (and the
/// modern RFC 9309) requires every `User-agent:` block to contain at least
/// one `Disallow:` line. `Allow:` is an *exception* directive Google added
/// later; strict SEO audit tools flag `Allow: /` without a preceding
/// `Disallow:` as invalid.
///
/// Output instead: `Disallow:` with an empty value, which means "disallow
/// nothing → allow everything." This is the canonical "allow all" form,
/// accepted by every robots.txt parser (Google, Bing, all AI crawlers).
///
/// The AI-bot list and `Sitemap:` discovery mirror SiteKit's default
/// verbatim — we only replace the `Allow: /` lines with `Disallow:`.
struct RobotsTxtRenderer: Renderer {
   /// AI/LLM crawlers that should be explicitly listed with a polite
   /// crawl-delay. Kept in sync with SiteKit's built-in default.
   private let aiBots = [
      "ClaudeBot",
      "Claude-SearchBot",
      "GPTBot",
      "OAI-SearchBot",
      "Google-Extended",
      "PerplexityBot",
      "CCBot",
   ]

   func render(context: BuildContext) throws -> [OutputFile] {
      let baseURL = context.config.baseURL
      var lines: [String] = [
         "User-agent: *",
         "Disallow:",
         "",
      ]

      for bot in self.aiBots {
         lines.append("User-agent: \(bot)")
         lines.append("Crawl-delay: 1")
         lines.append("Disallow:")
         lines.append("")
      }

      if context.config.isMultilingual {
         lines.append("Sitemap: \(baseURL)/sitemap_index.xml")
      } else {
         lines.append("Sitemap: \(baseURL)/sitemap.xml")
      }
      lines.append("")

      let content = lines.joined(separator: "\n")
      let path = context.outputDirectory.appendingPathComponent("robots.txt")
      return [OutputFile(outputPath: path, content: content)]
   }
}
