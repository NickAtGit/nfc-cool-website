import Foundation
import SiteKit
import Logging

/// Copies arbitrary static files from `Content/StaticFiles/` into the site
/// root, preserving directory structure. Use for files that must live at
/// fixed root-level paths (AASA, app-ads.txt, assetlinks.json, …) — i.e.
/// where the URL is dictated by an external spec, not by routing.
///
/// Mirrors FaviconRenderer (SiteKit) but recursive, so `.well-known/foo`
/// survives. Hidden files (dotfiles) ARE copied — that's intentional, since
/// `.well-known/` is the canonical location for several of these specs.
struct StaticRootFilesRenderer: Renderer {
   private let logger = Logger(label: "Site.StaticRootFilesRenderer")
   private let sourceDirName = "StaticFiles"

   func render(context: BuildContext) throws -> [OutputFile] {
      let sourceDir = context.projectDirectory
         .appendingPathComponent(context.config.contentDirectory)
         .appendingPathComponent(self.sourceDirName)
      guard FileManager.default.fileExists(atPath: sourceDir.path) else { return [] }

      var files: [OutputFile] = []
      guard let enumerator = FileManager.default.enumerator(at: sourceDir, includingPropertiesForKeys: [.isRegularFileKey]) else {
         return []
      }
      for case let url as URL in enumerator {
         let values = try url.resourceValues(forKeys: [.isRegularFileKey])
         guard values.isRegularFile == true else { continue }
         let data = try Data(contentsOf: url)
         let relativePath = url.path.replacingOccurrences(of: sourceDir.path + "/", with: "")
         let outputPath = context.outputDirectory.appendingPathComponent(relativePath)
         files.append(OutputFile(outputPath: outputPath, binaryContent: data))
      }
      self.logger.info("Copied \(files.count) static root file(s) from Content/\(self.sourceDirName)/")
      return files
   }
}
