import SiteKit

@main struct Site {
   static func main() throws {
      try SiteBuilder.blog(configPath: "SiteConfig.yaml")
         .replacing(HomePageRenderer.self, with: LandingPageRenderer())
         .renderer(FeaturePageRenderer())
         .renderer(FeaturesIndexRenderer())
         .removing(ContentIndexRenderer.self)
         .run()
   }
}
