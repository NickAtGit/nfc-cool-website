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
         .processor(FontPreloadProcessor())
         .processor(GoogleSiteVerificationProcessor())
         .processor(TwitterSiteProcessor())
         .processor(ThemeColorProcessor())
         .processor(RobotsIndexableProcessor())
         .processor(SmartAppBannerProcessor())
         .processor(OGImageDimensionsProcessor())
         .run()
   }
}
