import Foundation
import SiteKit

@main struct Site {
   static func main() throws {
      do {
         try SiteBuilder.portfolio(configPath: "SiteConfig.yaml")
            .renderer(StaticPageRenderer())
            .renderer(SitemapRenderer())
            .renderer(RobotsTxtRenderer())
            .run()
      } catch {
         FileHandle.standardError.write(Data("Error: \(error)\n".utf8))
         throw error
      }
   }
}