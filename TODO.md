# NFC.cool website — TODO

Pending content and follow-ups from the round-2 build. Each item below was scaffolded with a placeholder or partial version; finishing them requires user input or external work.

## Legal & compliance (blocking for launch)

- [ ] **Impressum postal address** — TMG § 5 requires a full physical address. Update `Content/Pages/Impressum.md`, `Impressum.de.md`, and `Impressum.ja.md`. The `> **TODO:**` line marks the spot.

## Hosting & integrations (needed for the form to work)

- [ ] **Mailjet credentials** in Cloudflare Pages env vars:
   - `MAILJET_API_KEY`
   - `MAILJET_API_SECRET`
   - `MAILJET_LIST_ID`
   - Until these land, the newsletter form returns `503 not_configured`. The Pages Function at `functions/api/subscribe.js` is ready to go.
- [ ] **Deploy target decision** — Cloudflare Pages is needed for the newsletter function and server-side `_redirects`. GitHub Pages works for everything else (HTML meta-refresh redirect fallbacks emit alongside `_redirects`).
- [ ] **blog.nfc.cool subdomain** — DNS-level redirect or CNAME at the host level so `blog.nfc.cool/blog/{slug}` lands on the new site. The path-level entries in `redirects.yaml` only fire on visits to the main domain.

## Brand assets

- [ ] **Press kit iCloud Drive URL** — replace the `https://www.icloud.com/` placeholder in `Content/Pages/Press.md`, `Press.de.md`, `Press.ja.md`.
- [ ] **Brand kit iCloud Drive URL** — same files, separate line for the brand-kit link.
- [ ] **Founder photo** for `/about/` — drop a photo of Nicolo into `Content/Assets/Images/About/` and reference it from `About.md` (+ de, ja).

## Product imagery

- [ ] **Replace iPad Tools-iOS screenshots with iPhone exports** — `iTunes Lookup` currently returns iPad-only. Drop iPhone screenshots into `Content/Assets/Images/Tools-iOS/Screenshot-N.png` (8 slots).
- [ ] **Business Card icon (flat 1024 px PNG)** — the Xcode 16 layered icon at `~/Developer/DigitalBusinessCardApp/AppIcon.icon/` can't be flattened by shell tools. Need a manual export.
- [ ] **3-5 additional feature-page screenshots per feature** — current pages have 2 each (`Webflow/*.webp` + Tools-iOS shots). The plan calls for 3-5 product-accurate shots showing each feature in real use:
   - `/features/nfc-reader-writer/` — additional reader/writer in-app shots
   - `/features/qr-barcode-scanner/` — QR Studio editor, barcode scanning history
   - `/features/document-scanner/` — multi-page scan, OCR result, PDF export
   - `/features/3d-room-scanner/` — RoomPlan in progress, exported USDZ in AR Quick Look
   - `/features/webhooks/` — webhook config screen, history view, retry queue

## Blog migration (partial)

The 5 most-recent posts from blog.nfc.cool are migrated in full English. Remaining work:

- [ ] **DE + JA translations of newly-migrated blog posts** (10 posts × 2 languages):
   - `2026-05-03-nfc-safe-encrypted-secrets.{de,ja}.md`
   - `2026-05-02-nfc-cool-comes-to-mac.{de,ja}.md`
   - `2026-04-21-sonicare-brush-head-reset.{de,ja}.md`
   - `2026-04-19-digital-business-card-healthcare.{de,ja}.md`
   - `2026-04-16-vcard-nfc-iphone.{de,ja}.md`
   - The DE/JA versions exist on blog.nfc.cool/de and blog.nfc.cool/ja — fetch and migrate.
- [ ] **DE + JA translations of round-1 posts** (5 posts × 2 languages):
   - `2024-05-02-namedrop-vs-nfc-business-cards.{de,ja}.md`
   - `2025-05-20-nfc-tag-types-for-iphones.{de,ja}.md`
   - `2025-09-28-iphone-rfid-condo-doors.{de,ja}.md`
   - `2026-01-23-app-clip-lessons-from-business-card.{de,ja}.md`
   - `2026-05-01-openprinttag-support.{de,ja}.md`
- [ ] **Migrate the 5 remaining blog.nfc.cool posts** (currently redirect to `/blog/` index):
   - share-digital-business-card-without-app-download
   - openprinttag-read-write-nfc-spools-phone (overlaps with the round-1 openprinttag post — choose one)
   - write-nfc-tags-iphone
   - why-privacy-matters-digital-business-card
   - welcome-to-the-nfc-cool-blog
- [ ] **Verify completeness against blog.nfc.cool source-of-truth** — make sure no post from the legacy blog is missing.

## Japanese translation quality review

- [ ] **Native JA review** — all `*.ja.yaml` and `*.ja.md` files were machine-translated by Claude. They're technically accurate but may have tonal awkwardness. A native speaker pass would polish:
   - `Content/Data/Landing.ja.yaml`
   - `Content/Data/Features/{slug}.ja.yaml` × 5
   - `Content/Pages/{BusinessCard, Contact, Press, Privacy, Terms, Impressum, About, Integrations, Developers, Reviews}.ja.md`
   - Custom 404 page strings (in `Sources/Site/Renderers/CustomErrorPageRenderer.swift`)
   - Lang picker labels (in `Theme/js/theme.js`)

## Reviews enrichment

- [ ] **More App Store reviews per locale** — the Reviews page pulls a handful of 5-star reviews from Apple's RSS feed for Tools iOS (en-US, de-DE, ja-JP). Currently the Business Card iOS Store has thin coverage in non-US locales — refresh the page when more reviews accumulate, and consider a build-time fetch script to keep the page current automatically.
- [ ] **Android reviews** — Google Play's review API blocks programmatic access. Either manually export 5-star Android reviews and add them to `Reviews.md`/`.de.md`/`.ja.md`, or skip Android in the aggregator.

## Content polish (not blocking)

- [ ] **Contact FAQ** — expand from 6 → 10 questions covering support tiers, response times, GDPR contact, account deletion. (`Content/Pages/Contact.md` + de, ja.)
- [ ] **Press page** — add brand color swatches, typography spec, do/don't logo usage examples. (`Content/Pages/Press.md` + de, ja.)
- [ ] **Terms** — add jurisdiction (Portugal), IP ownership, refund policy reference. (`Content/Pages/Terms.md` + de, ja.)
- [ ] **Impressum (beyond postal address)** — VAT/Steuernummer placeholder, EU Online Dispute Resolution link.
- [ ] **Business Card page** — screenshots gallery from `Content/Assets/Images/BusinessCard/`, iOS-vs-Android comparison table, AppClip demo link.

## Verification (do this before launch)

- [ ] `swift run Site build` — clean, no warnings
- [ ] `swift run Site validate` — zero missing translations across `en`, `de`, `ja`
- [ ] Walk every route per the plan's checklist in `/Users/nico/.claude/plans/i-want-to-get-goofy-volcano.md`
- [ ] W3C feed validator on `/feed.xml`, `/de/feed.xml`, `/ja/feed.xml`, `/blog/feed.xml`, `/changelog/feed.xml`
- [ ] Test newsletter form end-to-end on Cloudflare Pages preview with real Mailjet creds
- [ ] Test `/` with `Accept-Language: de` and `Accept-Language: ja` — should redirect appropriately
- [ ] Mobile responsive at 375 / 768 / 1280 px on real devices
- [ ] Dark mode pass on every new page
