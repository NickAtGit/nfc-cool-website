// swift-tools-version: 6.2
import PackageDescription

let package = Package(
   name: "NFCWeb",
   platforms: [.macOS(.v26)],
   dependencies: [
      .package(url: "https://github.com/FlineDev/SiteKit-Package.git", branch: "main"),
   ],
   targets: [
      .executableTarget(
         name: "Site",
         dependencies: [
            .product(name: "SiteKit", package: "SiteKit-Package"),
         ]
      ),
   ]
)