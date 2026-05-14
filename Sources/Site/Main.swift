import SiteKit

@main struct Site {
   static func main() throws {
      try SiteBuilder.blog(configPath: "SiteConfig.yaml")
         .replacing(HomePageRenderer.self, with: LandingPageRenderer())
         .replacing(ErrorPageRenderer.self, with: CustomErrorPageRenderer())
         .replacing(SectionListingRenderer.self, with: BlogIndexRenderer())
         .replacing(ArticlePageRenderer.self, with: BlogPostRenderer())
         .replacing(StaticPageRenderer.self, with: MarketingPageRenderer())
         .renderer(FeaturePageRenderer())
         .renderer(FeaturesIndexRenderer())
         .renderer(StaticRootFilesRenderer())
         .removing(ContentIndexRenderer.self)
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
         .processor(CSSAsyncLoadProcessor())
         .processor(GoogleSiteVerificationProcessor())
         .processor(TwitterSiteProcessor())
         .processor(ThemeColorProcessor())
         .processor(RobotsIndexableProcessor())
         .processor(SmartAppBannerProcessor())
         .processor(OGImageDimensionsProcessor())
         .processor(AssetMinifier())
         .run()
   }
}
