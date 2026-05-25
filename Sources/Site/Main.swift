import Foundation
import SiteKit

@main struct Site {
   static func main() throws {
      // Custom `i18n-check` command - the translation completeness gate. Runs
      // before SiteKit's dispatcher so it can own the exit code (hard gate).
      let arguments = CommandLine.arguments
      if arguments.count > 1, arguments[1] == "i18n-check" {
         let project = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
         let siteConfig = try SiteConfig.load(from: project)
         let checkConfig = try I18nCheckConfig.load(from: project)
         let result = I18nChecker.run(projectDirectory: project, siteConfig: siteConfig, checkConfig: checkConfig)
         I18nChecker.report(result)
         if result.hasErrors { exit(1) }
         return
      }

      try SiteBuilder.blog(configPath: "SiteConfig.yaml")
         .replacing(HomePageRenderer.self, with: LandingPageRenderer())
         .replacing(ErrorPageRenderer.self, with: CustomErrorPageRenderer())
         .replacing(SectionListingRenderer.self, with: BlogIndexRenderer())
         .replacing(ArticlePageRenderer.self, with: BlogPostRenderer())
         .replacing(StaticPageRenderer.self, with: MarketingPageRenderer())
         .replacing(SiteKit.TagListingRenderer.self, with: TagListingRenderer())
         .replacing(SiteKit.RobotsTxtRenderer.self, with: RobotsTxtRenderer())
         // Default sitemap adapter is blind to the custom feature renderers —
         // swap in one that also emits /features/ and /features/{slug}/ (and drops
         // locale-fallback pages that would otherwise be advertised as 404s).
         .replacing(SitemapRenderer.self, with: SitemapRenderer(adapter: FeatureSitemapDataAdapter()))
         // Default feed adapter lists locale-fallback pages (EN-only changelog
         // under /de/ and /ja/) whose URLs 404 — swap in one that drops them.
         .replacing(RSSFeedRenderer.self, with: RSSFeedRenderer(adapter: FilteredFeedDataAdapter()))
         .renderer(FeaturePageRenderer())
         .renderer(FeaturesIndexRenderer())
         .renderer(StaticRootFilesRenderer())
         .removing(ContentIndexRenderer.self)
         // SectionPageRenderer is an additional built-in that ALSO emits one
         // HTML file per section page — so BlogPostRenderer's output was
         // being silently double-written (and our fallback-skip logic
         // wasn't taking effect, since the built-in renderer doesn't skip).
         // BlogPostRenderer is the only renderer this site needs for
         // /blog/{slug}/ and /changelog/{slug}/.
         .removing(SectionPageRenderer.self)
         // `.processor(...)` replaces the default processors list rather than
         // appending — so we re-add SiteKit's defaults here in their
         // documented order (ImageResizer → FontAwesomeInliner →
         // CSSBackgroundImageProcessor → AssetMinifier), interleaved with
         // our site-specific processors. AssetMinifier runs LAST so it
         // doesn't strip whitespace from CSS the other processors still
         // need to scan; ImageResizer runs FIRST so its <img> rewrites are
         // visible to everything downstream.
         .processor(ImageResizer())
         .processor(CSSBackgroundImageProcessor())
         .processor(FontAwesomeInliner())
         .processor(FontPreloadProcessor())
         .processor(LocaleRegionProcessor())
         .processor(CSSAsyncLoadProcessor())
         .processor(GoogleSiteVerificationProcessor())
         .processor(TwitterSiteProcessor())
         .processor(ThemeColorProcessor())
         .processor(RobotsIndexableProcessor())
         .processor(RedirectNoindexProcessor())
         .processor(SmartAppBannerProcessor())
         .processor(OGImageDimensionsProcessor())
         .processor(RatingsCountProcessor())
         .processor(LlmsTxtFeaturesProcessor())
         .processor(EmailObfuscationProcessor())
         .processor(BrandWordmarkProcessor())
         .processor(LangPickerDataProcessor())
         .processor(AssetMinifier())
         .run()
   }
}
