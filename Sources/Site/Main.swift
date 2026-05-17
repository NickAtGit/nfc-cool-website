import SiteKit

@main struct Site {
   static func main() throws {
      try SiteBuilder.blog(configPath: "SiteConfig.yaml")
         .replacing(HomePageRenderer.self, with: LandingPageRenderer())
         .replacing(ErrorPageRenderer.self, with: CustomErrorPageRenderer())
         .replacing(SectionListingRenderer.self, with: BlogIndexRenderer())
         .replacing(ArticlePageRenderer.self, with: BlogPostRenderer())
         .replacing(StaticPageRenderer.self, with: MarketingPageRenderer())
         .replacing(SiteKit.TagListingRenderer.self, with: TagListingRenderer())
         .replacing(SiteKit.RobotsTxtRenderer.self, with: RobotsTxtRenderer())
         // Default sitemap adapter is blind to the custom feature renderers —
         // swap in one that also emits /features/ and /features/{slug}/.
         .replacing(SitemapRenderer.self, with: SitemapRenderer(adapter: FeatureSitemapDataAdapter()))
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
         .processor(AssetMinifier())
         .run()
   }
}
