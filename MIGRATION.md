# NFC.cool Website Migration Tracker

## Status: In Progress

### What's Done
- [x] Created SiteKit project structure (AppLanding blueprint)
- [x] Brand theme (Titillium Web + Caveat, NFC yellow #FFC700 accent, blue gradient)
- [x] Landing.yaml with hero, features, pricing, reviews, FAQ, CTA
- [x] Dedicated feature pages (NFC, QR, Document, 3D)
- [x] Privacy Policy & Terms pages
- [x] GitHub repo pushed: robin-wonderboy/nfc-cool-website
- [x] GitHub Pages configured with CNAME: new.nfc.cool
- [x] GitHub Actions deploy workflow

### Needs Work
- [ ] DNS: Add CNAME record for new.nfc.cool → robin-wonderboy.github.io (Nico needs to do this in Cloudflare)
- [ ] Verify first successful GitHub Actions build (macos-15 runner needs Swift 6.2 — may need adjustment)
- [ ] Visual QA: Compare new site vs current Webflow site
- [ ] Hero section: Add app screenshots/mockups
- [ ] Feature pages: Add more detail, screenshots, App Store deep links
- [ ] Business Card section: Add dedicated BC promo
- [ ] SEO: Verify meta descriptions, OG images, structured data
- [ ] Redirects: Map old Webflow URLs to new SiteKit URLs
- [ ] Performance audit (Lighthouse)
- [ ] Mobile responsiveness testing
- [ ] Dark mode QA
- [ ] Cut over: Switch nfc.cool DNS from Webflow to GitHub Pages when ready

### Known Issues
- Can't build locally (needs macOS 26 / Swift 6.2 runtime) — builds fine in Xcode, runs in CI
- GitHub Actions needs `macos-15` runner with Xcode 26 beta for Swift 6.2