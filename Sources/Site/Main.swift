import Foundation
import SiteKit

@main struct Site {
   static func main() throws {
      try SiteBuilder.portfolio(configPath: "SiteConfig.yaml")
         .replacing(HomePageRenderer.self, with: LandingPageRenderer())
         .renderer(StaticPageRenderer())
         .renderer(SitemapRenderer())
         .renderer(RobotsTxtRenderer())
         .run()
   }
}