import Foundation
import SiteKit

/// Loads `/scenes/live-scenes.mjs` on every page that has a live 3D scene, i.e. an
/// `<img data-scene=…>` (the home, Business Card and Affiliate Links heroes and the home page's
/// Business Card banner, in every locale). The module is
/// tiny and fetches three.js and the scene itself only once the page is loaded and idle, so a
/// plain `type="module"` script at the end of the body costs nothing on first paint. Pages
/// without a scene never load it.
struct LiveSceneScriptProcessor: OutputProcessor {
   private let tag = "<script type=\"module\" src=\"/scenes/live-scenes.mjs\"></script>"

   func process(outputDirectory: URL, projectDirectory: URL, themeConfig: ThemeConfig?) throws {
      let fileManager = FileManager.default
      guard let enumerator = fileManager.enumerator(at: outputDirectory, includingPropertiesForKeys: nil) else { return }

      for case let url as URL in enumerator where url.pathExtension == "html" {
         guard var html = try? String(contentsOf: url, encoding: .utf8) else { continue }
         // A page that already loads a scene runtime of its own (the local /lab/ pages) is left alone.
         guard html.contains(" data-scene=\""), !html.contains("live-scenes.mjs") else { continue }
         guard let bodyEnd = html.range(of: "</body>", options: .backwards) else { continue }
         html.insert(contentsOf: self.tag, at: bodyEnd.lowerBound)
         try? html.write(to: url, atomically: true, encoding: .utf8)
      }
   }
}
