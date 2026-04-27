# NFC.cool Website Migration Tracker

## Status: In Progress — CI Build Testing

### What's Done
- [x] Created SiteKit project structure (AppLanding blueprint)
- [x] Brand theme (Titillium Web + Caveat, NFC yellow #FFC700 accent, blue gradient)
- [x] Landing.yaml with hero, features, pricing, reviews, FAQ, CTA
- [x] Dedicated feature pages (NFC, QR, Document, 3D)
- [x] Privacy Policy & Terms pages
- [x] GitHub repo: robin-wonderboy/nfc-cool-website (public, GitHub Pages enabled)
- [x] CNAME: new.nfc.cool configured
- [x] GitHub Actions deploy workflow (Ubuntu + Swift 6.2)
- [x] PAT_TOKEN secret configured for SiteKit-Package access
- [x] Fixed SiteConfig missing required `language` field

### Current Blocker
- CI build fails with `SiteConfigError.invalidYAML("The data is missing")` — testing fix now

### Needs Work
- [ ] Verify first successful GitHub Actions build
- [ ] DNS: Add CNAME record for new.nfc.cool → robin-wonderboy.github.io
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

### Notes
- Can't build locally (needs macOS 26 / Swift 6.2 runtime) — CI builds on Ubuntu
- SiteKit-Package is private — needs PAT_TOKEN in GitHub Actions