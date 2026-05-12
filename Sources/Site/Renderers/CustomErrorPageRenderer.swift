import Foundation
import SiteKit

/// Brand-styled 404 page. Replaces SiteKit's default ErrorPageRenderer.
///
/// Emits `404.html` at the locale root (`/404.html`, `/de/404.html`, `/ja/404.html`).
/// Cloudflare Pages and GitHub Pages both pick these up as the catch-all
/// 404 response for the matching locale subtree.
struct CustomErrorPageRenderer: Renderer {
   func render(context: BuildContext) throws -> [OutputFile] {
      let helper = OutputFileRenderer(context: context)
      let locale = context.uiStrings.locale
      let defaultLang = context.config.effectiveDefaultLanguage

      let strings = Self.strings(for: locale)
      let basePath = context.router.homePath()

      let head = helper.buildHead(
         title: "\(strings.title) - \(context.config.name)",
         description: strings.message
      )

      let mainContent = """
      <main class="sk-main sk-page-error">
         <section class="error-hero">
            <div class="landing-container">
               <p class="error-eyebrow" aria-hidden="true">404</p>
               <h1 class="error-title">\(strings.title.htmlEscaped)</h1>
               <p class="error-message">\(strings.message.htmlEscaped)</p>
               <div class="error-actions">
                  <a class="error-action-card" href="\(basePath)">
                     <span class="error-action-label">\(strings.linkHome.htmlEscaped)</span>
                     <span class="error-action-arrow" aria-hidden="true">→</span>
                  </a>
                  <a class="error-action-card" href="\(basePath)features/">
                     <span class="error-action-label">\(strings.linkFeatures.htmlEscaped)</span>
                     <span class="error-action-arrow" aria-hidden="true">→</span>
                  </a>
                  <a class="error-action-card" href="\(basePath)blog/">
                     <span class="error-action-label">\(strings.linkBlog.htmlEscaped)</span>
                     <span class="error-action-arrow" aria-hidden="true">→</span>
                  </a>
                  <a class="error-action-card" href="\(basePath)contact/">
                     <span class="error-action-label">\(strings.linkSupport.htmlEscaped)</span>
                     <span class="error-action-arrow" aria-hidden="true">→</span>
                  </a>
               </div>
            </div>
         </section>
      </main>
      """

      let html = helper.renderPageShell(
         head: head,
         bodyClass: "sk-page-error error",
         content: mainContent
      )

      let outputPath: URL
      if locale == defaultLang {
         outputPath = context.outputDirectory.appendingPathComponent("404.html")
      } else {
         outputPath = context.outputDirectory.appendingPathComponent(locale).appendingPathComponent("404.html")
      }
      return [OutputFile(outputPath: outputPath, content: html)]
   }

   // MARK: - Localized strings (inline, since SiteKit's uiStrings only has
   //         the generic 404 message; we want a friendlier copy).

   private struct LocalizedStrings {
      let title: String
      let message: String
      let linkHome: String
      let linkFeatures: String
      let linkBlog: String
      let linkSupport: String
   }

   private static func strings(for locale: String) -> LocalizedStrings {
      switch locale {
      case "de":
         return LocalizedStrings(
            title: "Seite nicht gefunden",
            message: "Diese Seite gibt es nicht (mehr). Vielleicht hilft einer dieser Links weiter:",
            linkHome: "Startseite",
            linkFeatures: "Funktionen",
            linkBlog: "Blog",
            linkSupport: "Support"
         )
      case "ja":
         return LocalizedStrings(
            title: "ページが見つかりません",
            message: "お探しのページは存在しないか、移動した可能性があります。以下のリンクが役立つかもしれません:",
            linkHome: "ホーム",
            linkFeatures: "機能",
            linkBlog: "ブログ",
            linkSupport: "サポート"
         )
      default:
         return LocalizedStrings(
            title: "Page not found",
            message: "We couldn't find that page. Here's where you might be looking:",
            linkHome: "Home",
            linkFeatures: "Features",
            linkBlog: "Blog",
            linkSupport: "Support"
         )
      }
   }
}
