# NFC.cool website - TODO

Pending content and follow-ups from the round-2 build. Each item below was scaffolded with a placeholder or partial version; finishing them requires user input or external work.

## Legal & compliance (blocking for launch)

- [ ] **Impressum postal address** - TMG § 5 requires a full physical address. Update `Content/Pages/Impressum.md`, `Impressum.de.md`, and `Impressum.ja.md`. The `> **TODO:**` line marks the spot.

## Hosting & integrations

- [x] **Deploy target: GitHub Pages.** Newsletter posts cross-origin to the shared Mailjet Cloudflare Worker (`https://mailjet.02mining-hollers.workers.dev/`, same one the iOS apps use) - no Pages Function needed in this repo.
- [ ] **blog.nfc.cool subdomain** - DNS-level redirect or CNAME at the host level so `blog.nfc.cool/blog/{slug}` lands on the new site. The path-level entries in `redirects.yaml` only fire on visits to the main domain.

## Brand assets

- [ ] **Press kit iCloud Drive URL** - replace the `https://www.icloud.com/` placeholder in `Content/Pages/Press.md`, `Press.de.md`, `Press.ja.md`.
- [ ] **Brand kit iCloud Drive URL** - same files, separate line for the brand-kit link.
- [ ] **Founder photo** for `/about/` - drop a photo of Nicolo into `Content/Assets/images/About/` and reference it from `About.md` (+ de, ja).

## Product imagery

- [ ] **Replace iPad Tools-iOS screenshots with iPhone exports** - `iTunes Lookup` currently returns iPad-only. Drop iPhone screenshots into `Content/Assets/images/Tools-iOS/Screenshot-N.png` (8 slots).
- [ ] **Business Card icon (flat 1024 px PNG)** - the Xcode 16 layered icon at `~/Developer/DigitalBusinessCardApp/AppIcon.icon/` can't be flattened by shell tools. Need a manual export.
- [ ] **3-5 additional feature-page screenshots per feature** - current pages have 2 each (`Webflow/*.webp` + Tools-iOS shots). The plan calls for 3-5 product-accurate shots showing each feature in real use:
   - `/features/nfc-reader-writer/` - additional reader/writer in-app shots
   - `/features/qr-barcode-scanner/` - QR Studio editor, barcode scanning history
   - `/features/document-scanner/` - multi-page scan, OCR result, PDF export
   - `/features/3d-room-scanner/` - RoomPlan in progress, exported USDZ in AR Quick Look
   - `/features/webhooks/` - webhook config screen, history view, retry queue

## Blog migration

- [x] **Migration complete (2026-05-13).** All 30 posts from `blog.nfc.cool` ported to `Content/Blog/` with full EN + DE + JA translations and verified against the legacy source-of-truth (10 of 10 indexed posts present). DE/JA quality polish (native-speaker pass) still tracked separately under "Japanese translation quality review" below.

## Japanese translation quality review

- [ ] **Native JA review** - all `*.ja.yaml` and `*.ja.md` files were machine-translated by Claude. They're technically accurate but may have tonal awkwardness. A native speaker pass would polish:
   - `Content/Data/Landing.ja.yaml`
   - `Content/Data/Features/{slug}.ja.yaml` × 5
   - `Content/Pages/{BusinessCard, Contact, Press, Privacy, Terms, Impressum, About, Integrations, Developers, Reviews}.ja.md`
   - Custom 404 page strings (in `Sources/Site/Renderers/CustomErrorPageRenderer.swift`)
   - Lang picker labels (in `Theme/js/theme.js`)

## Reviews enrichment

- [ ] **More App Store reviews per locale** - the Reviews page pulls a handful of 5-star reviews from Apple's RSS feed for Tools iOS (en-US, de-DE, ja-JP). Currently the Business Card iOS Store has thin coverage in non-US locales - refresh the page when more reviews accumulate, and consider a build-time fetch script to keep the page current automatically.
- [ ] **Android reviews** - Google Play's review API blocks programmatic access. Either manually export 5-star Android reviews and add them to `Reviews.md`/`.de.md`/`.ja.md`, or skip Android in the aggregator.

## Content polish (not blocking)

- [ ] **Contact FAQ** - expand from 6 → 10 questions covering support tiers, response times, GDPR contact, account deletion. (`Content/Pages/Contact.md` + de, ja.)
- [ ] **Press page** - add brand color swatches, typography spec, do/don't logo usage examples. (`Content/Pages/Press.md` + de, ja.)
- [ ] **Terms** - add jurisdiction (Portugal), IP ownership, refund policy reference. (`Content/Pages/Terms.md` + de, ja.)
- [ ] **Impressum (beyond postal address)** - VAT/Steuernummer placeholder, EU Online Dispute Resolution link.
- [ ] **Business Card page** - screenshots gallery from `Content/Assets/images/BusinessCard/`, iOS-vs-Android comparison table, AppClip demo link.

## Mobile-app & SEO files (parity with the live Webflow site)

Audited against `https://www.nfc.cool` and `https://nfc.cool/.well-known/...` on 2026-05-12.

- [ ] **Apple App Site Association** - the live site serves a working AASA at `https://nfc.cool/.well-known/apple-app-site-association`. Recreate it in the new build so Universal Links + the Business Card AppClip keep working. Drop the file at `Content/Assets/.well-known/apple-app-site-association` (no extension, served as `application/json`). Current content:
   ```json
   {
     "applinks": { "apps": [], "details": [{ "appID": "FMXL9R3NPC.de.nicolo-stanciu.nfcing", "paths": ["/*"] }] },
     "appclips": { "apps": ["FMXL9R3NPC.io.stanc.DigitalBusinessCardApp.Clip"] },
     "webcredentials": { "apps": ["FMXL9R3NPC.de.nicolo-stanciu.nfcing"] }
   }
   ```
- [ ] **`app-ads.txt`** - live site has a single AdMob entry. Add `Content/Assets/app-ads.txt` (copied to site root):
   ```
   google.com, pub-2698788927130711, DIRECT, f08c47fec0942fa0
   ```
- [ ] **Android `assetlinks.json`** - not present on the live site (404). If the Android Tools app uses App Links to open NFC.cool URLs, add `Content/Assets/.well-known/assetlinks.json` with the SHA-256 cert fingerprints from Play Console → "App signing".
- [ ] **Google Search Console verification** - live `<head>` has `<meta name="google-site-verification" content="8Deh-qJD2ZKg_mAjM5-dMRDWS15XcUiIc6w4h9fL9-U"/>`. Add it to `SiteConfig.yaml` (or the site-wide `<head>` extra-meta hook) so Search Console keeps verifying after the cutover.
- [ ] **Twitter / Open Graph image** - live site uses a single hero card (`twitter:image` on a Shopify CDN URL, plus `twitter:site=@NFC_for_iPhone`, `twitter:image:alt="3 Phones Networking Showing NFC.cool App & NFC.cool Products"`). Decide on a brand-correct 1200×630 OG image, drop it in `Content/Assets/images/` and wire it into `SiteConfig.yaml`.
- [ ] **Replace press-kit / brand-kit placeholders with real iCloud Drive URLs** (see `Content/Pages/Press.{md,de.md,ja.md}` - the live Webflow site links:
   - Press Kit: `https://www.icloud.com/iclouddrive/0e7Gy46aFsq8U2kqEyIs9Wleg#NFC.cool_Press_Kit`
   - Brand Kit: `https://www.icloud.com/iclouddrive/0ebMuI8X63LN-CiUiF8YlVb2A#NFC.cool_Brand_Kit`
- [ ] **Install ImageMagick on CI** - `.github/workflows/deploy.yml` doesn't install `imagemagick`, so `srcset` variants like `Screenshot-1-900w.jpg` are silently skipped in production builds. Add `sudo apt-get install -y imagemagick` before the Swift build step.

## Verification (do this before launch)

- [ ] `swift run Site build` - clean, no warnings
- [ ] `swift run Site validate` - zero missing translations across `en`, `de`, `ja`
- [ ] Walk every route per the plan's checklist in `/Users/nico/.claude/plans/i-want-to-get-goofy-volcano.md`
- [ ] W3C feed validator on `/feed.xml`, `/de/feed.xml`, `/ja/feed.xml`, `/blog/feed.xml`, `/changelog/feed.xml`
- [ ] Test newsletter form end-to-end against the live Mailjet Worker (submit a real address, confirm it lands in the Mailjet announcements list)
- [ ] Test `/` with `Accept-Language: de` and `Accept-Language: ja` - should redirect appropriately
- [ ] Mobile responsive at 375 / 768 / 1280 px on real devices
- [ ] Dark mode pass on every new page
