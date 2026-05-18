import Foundation
import SiteKit

/// Right-hand visual of a `.page-hero` split hero. `isBrand` drops the
/// shadow / corner radius / rotation so a logo mark sits cleanly on the
/// gradient (see `.page-hero-visual.is-brand` in marketing.css). `width`
/// and `height` emit the intrinsic-size attributes that keep the image
/// from shifting layout while it loads (CLS).
struct PageHeroVisual {
   /// Image source URL.
   let src: String
   /// Alt text - callers pass this already HTML-escaped.
   let alt: String
   /// Logo-mark styling (no shadow / radius / rotation).
   var isBrand: Bool = false
   /// Transparent artwork styling (no rectangular shadow/radius).
   var isCutout: Bool = false
   /// Intrinsic pixel width, emitted as the `width` attribute when set.
   var width: Int? = nil
   /// Intrinsic pixel height, emitted as the `height` attribute when set.
   var height: Int? = nil
}

/// Emits the canonical brand-gradient split hero shared by the landing page,
/// the features index, the per-feature pages, the blog index, and blog posts.
///
/// Page-specific copy varies too much to parameterise (breadcrumbs, platform
/// badges, meta lines, tag rows, differently-classed headings), so the caller
/// passes fully-rendered `.page-hero-text` inner HTML. This helper owns only
/// the `<section class="page-hero">` -> `.page-hero-grid` -> `.page-hero-text`
/// / `.page-hero-visual` skeleton, so the markup and its class names stay
/// identical on every page.
///
/// - Parameters:
///   - modifier: optional extra class on the `<section>` (e.g.
///     `"blog-index-hero"`); pass `nil` for none.
///   - text: fully-rendered inner HTML for `.page-hero-text`.
///   - visual: the right-hand image, or `nil` for a text-only hero.
///
/// Markdown marketing pages author this same structure by hand and are
/// intentionally not routed through here.
func renderPageHero(modifier: String? = nil, text: String, visual: PageHeroVisual? = nil) -> String {
   let sectionClass = modifier.map { "page-hero \($0)" } ?? "page-hero"
   let visualHTML: String = {
      guard let visual else { return "" }
      let visualClass: String = {
         if visual.isBrand { return "page-hero-visual is-brand" }
         if visual.isCutout { return "page-hero-visual is-cutout" }
         return "page-hero-visual"
      }()
      let widthAttr = visual.width.map { " width=\"\($0)\"" } ?? ""
      let heightAttr = visual.height.map { " height=\"\($0)\"" } ?? ""
      return """
      <div class="\(visualClass)">
         <img src="\(visual.src)" alt="\(visual.alt)"\(widthAttr)\(heightAttr) loading="eager" fetchpriority="high"/>
      </div>
      """
   }()
   return """
   <section class="\(sectionClass)">
      <div class="page-hero-grid">
         <div class="page-hero-text">
            \(text)
         </div>
         \(visualHTML)
      </div>
   </section>
   """
}
