import SiteKit

@main struct Site {
   static func main() throws {
      do {
         try SiteBuilder.portfolio(configPath: "SiteConfig.yaml")
            .replacing(HomePageRenderer.self, with: LandingPageRenderer())
            .renderer(StaticPageRenderer())
            .renderer(SitemapRenderer())
            .renderer(RobotsTxtRenderer())
            .renderer(HTMLRedirectPageRenderer())
            .run()
      } catch {
         fputs("Error: \(error)\n", stderr)
         throw error
      }
   }
}