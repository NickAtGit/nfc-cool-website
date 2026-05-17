# NFC.cool - website

Multi-page, bilingual marketing site for the NFC.cool brand, built with [SiteKit](https://github.com/FlineDev/SiteKit-Package). Uses the `blog()` recipe with three custom renderers (landing, per-feature, features index).

## Build & serve

```bash
swift run Site build       # produce static site in _Site/
swift run Site serve       # build + dev server on http://localhost:8080
swift run Site validate    # check translation parity across en/de
```

Requires Swift 6.2+ and macOS 26 locally. CI uses `swift-actions/setup-swift@v2` on Ubuntu.

## Deploy

The site deploys to **GitHub Pages** via `.github/workflows/deploy.yml` (Swift 6.2 on Ubuntu, `swift run Site build`, `actions/upload-pages-artifact` + `actions/deploy-pages`). The repo-root `CNAME` binds it to `new.nfc.cool`.

GH Pages is a pure static host, which has two known consequences:

- **Newsletter form** posts directly to a shared Cloudflare Worker at `https://mailjet.02mining-hollers.workers.dev/` (the same Worker the iOS apps use - its source lives in the `nfcreader` Swift project's `EmailService` module). The Worker has Mailjet credentials + list ID baked in; the website's form just sends `{ email }` and CORS is wide-open. There is no Pages Function in this repo.
- **Webflow → new-URL redirects** in `redirects.yaml` (35 entries) are emitted to `_Site/_redirects` for hosts that honour it, but GH Pages does not - visitors land on HTML meta-refresh fallback pages emitted by SiteKit's `HTMLRedirectPageRenderer` instead. Slightly slower than a real 301, slightly worse for SEO, but functional.

If we ever move to Cloudflare Pages, the form already works as-is (Worker is host-agnostic) and `_redirects` / `_headers` will start being honoured for free.

## Sitemap (what visitors get)

| EN | DE | Source |
| --- | --- | --- |
| `/` | `/de/` | `Content/Data/Landing.yaml` + `Landing.de.yaml` via `LandingPageRenderer` |
| `/features/` | `/de/features/` | `FeaturesIndexRenderer` (lists all features for the locale) |
| `/features/{slug}/` | `/de/features/{slug}/` | `Content/Data/Features/{slug}{.de}.yaml` via `FeaturePageRenderer` |
| `/business-card/` | `/de/business-card/` | `Content/Pages/BusinessCard{.de}.md` |
| `/blog/` | `/de/blog/` | SiteKit `SectionListingRenderer` over `Content/Blog/` |
| `/blog/{slug}/` | `/de/blog/{slug}/` | `Content/Blog/YYYY-MM-DD-{slug}.md` via SiteKit `ArticlePageRenderer` |
| `/contact/`, `/press/`, `/terms/`, `/privacy/`, `/impressum/` | `/de/*` | `Content/Pages/*.md` + `*.de.md` |
| `/feed.xml`, `/de/feed.xml` | - | SiteKit `RSSFeedRenderer` |
| `/sitemap.xml`, `/sitemap_index.xml`, `/llms.txt` | - | SiteKit (auto) |
| `/_redirects` (Cloudflare format, currently unused on GH Pages) | - | `redirects.yaml` via SiteKit `RedirectRenderer` |

Feature slugs: `nfc-reader-writer`, `qr-scanner`, `barcode-scanner`, `document-scanner`, `3d-object-scanner`, `room-scanner`, `webhooks`. To add a new feature: append a slug to `FeaturePageRenderer.slugs` in `Sources/Site/Renderers/FeaturePageRenderer.swift` and drop `{slug}.yaml` + `{slug}.de.yaml` + `{slug}.ja.yaml` into `Content/Data/Features/`.

## Brand structure (the part visitors care about)

NFC.cool is two products with different platform reach:

- **NFC.cool Tools (iOS)** - full toolkit: NFC, QR, barcode, document, 3D, room scanning. Bundle id `de.nicolo-stanciu.nfcing`, App Store id `1249686798`, short URL `https://ios.nfc.cool`.
- **NFC.cool Tools (Android)** - NFC scanning only, plus the Business Card features bundled in. Package `cool.nfc`, short URL `https://android.nfc.cool`.
- **NFC.cool Business Card (iOS)** - dedicated standalone iOS app. Bundle id `io.stanc.DigitalBusinessCardApp`, App Store id `6502926572`, short URL `https://business-card.nfc.cool`.

The site presents NFC.cool as one brand. The hero + main feature grid focuses on Tools (cross-platform). The `featureBanner` section calls out the standalone Business Card iOS app and notes the Android-bundled equivalent.

## Source layout

```
SiteConfig.yaml                  ← Site-wide: name, baseURL, nav, footer, social, sections, localization, redirectsFile
redirects.yaml                   ← Webflow → new URL map (consumed by SiteKit RedirectRenderer)
Content/
├── Data/
│   ├── Landing.yaml             ← Landing content (en)
│   ├── Landing.de.yaml          ← Landing content (de)
│   └── Features/
│       ├── nfc-reader-writer.yaml         + .de.yaml
│       ├── qr-scanner.yaml                + .de.yaml + .ja.yaml
│       ├── barcode-scanner.yaml           + .de.yaml + .ja.yaml
│       ├── document-scanner.yaml          + .de.yaml
│       ├── 3d-object-scanner.yaml         + .de.yaml + .ja.yaml
│       ├── room-scanner.yaml              + .de.yaml + .ja.yaml
│       └── webhooks.yaml                  + .de.yaml
├── Pages/
│   ├── Privacy.md               + Privacy.de.md
│   ├── Impressum.md             + Impressum.de.md
│   ├── Terms.md                 + Terms.de.md
│   ├── Contact.md               + Contact.de.md
│   ├── Press.md                 + Press.de.md
│   └── BusinessCard.md          + BusinessCard.de.md
├── Blog/
│   └── YYYY-MM-DD-{slug}.md     ← migrated/fresh blog posts (en initially; de can come later)
└── Assets/
    ├── Images/Tools-iOS/        ← NFC.cool Tools iOS icon + screenshots
    ├── Images/Tools-Android/    ← Tools Android icon
    ├── Images/BusinessCard/     ← NFC.cool Business Card icon + screenshots
    └── Favicons/                ← Pre-generated favicons (32, 180, 192, 512)
Sources/Site/
├── Main.swift                   ← @main: SiteBuilder.blog + LandingPageRenderer + FeaturePageRenderer + FeaturesIndexRenderer
├── Models/
│   ├── LandingData.swift
│   └── FeatureData.swift
└── Renderers/
    ├── LandingPageRenderer.swift           ← / and /de/
    ├── FeaturePageRenderer.swift           ← /features/{slug}/ (and /de/)
    └── FeaturesIndexRenderer.swift         ← /features/ (and /de/)
Theme/
├── theme.yaml                   ← preset, colorScheme, fontPairing, css/js refs, tokens
├── css/
│   ├── theme.css                ← base theme tokens & layout
│   └── landing.css              ← all section styles (landing + features + static pages)
├── js/theme.js                  ← dark-mode toggle + nav toggle + newsletter form
└── images/favicon.svg
```

The newsletter form posts cross-origin to a shared Cloudflare Worker; this repo contains no Pages Functions.

## Customization tips

- **Add or reorder a feature card on the landing page:** edit `features:` in `Content/Data/Landing.yaml` AND `Landing.de.yaml`. The `platforms` field is free-form text rendered as a chip (use `iOS · Android` or `iOS only` for visual consistency; DE uses `Nur iOS`).
- **Add a new feature subpage:** drop a slug into `FeaturePageRenderer.slugs` in Swift code, then create `Content/Data/Features/<slug>.yaml` + `<slug>.de.yaml`. The renderer auto-picks them up.
- **Edit the newsletter copy:** `newsletter:` block in `Landing.yaml` / `Landing.de.yaml`. The form posts directly to the shared Mailjet Worker (`https://mailjet.02mining-hollers.workers.dev/`). To override per-form, set `data-endpoint` on the form via the renderer.
- **Add a blog post:** create `Content/Blog/YYYY-MM-DD-<slug>.md` with frontmatter (`title`, `date`, `tags`, `summary`, `author`, `id`). Posts render in `/blog/` automatically and appear in `/feed.xml`. Tags must come from the curated vocabulary in `Sources/Site/Renderers/TagListingRenderer.swift` (`displayName`).
- **Add a Webflow → new URL redirect:** add to `redirects.yaml`. SiteKit emits both `_redirects` (server-side on Cloudflare) and HTML fallbacks.
- **Change the dual-CTA buttons** (text or layout): see `renderStoreButtons(...)` in `LandingPageRenderer.swift` and the `.landing-store-*` rules in `landing.css`.
- **Pick a different color scheme or font pairing:** open `Plugin/themes/ThemePreview.html` from the SiteKit-Plugin repo, pick, then update `Theme/theme.yaml`.
- **Add a language:** append to `localization.languages` in `SiteConfig.yaml` AND create `Landing.<lang>.yaml`, `Features/{slug}.<lang>.yaml`, `Pages/*.<lang>.md`. SiteKit's `LocalizedContentDiscovery` picks them up automatically.

## Tasks still on the punch-list

- [ ] **Fill in the postal address in `Content/Pages/Impressum.md` and `Impressum.de.md`** (TMG § 5 compliance - required before launch).
- [ ] **Migrate the remaining 9 Webflow blog posts.** Five are already in `Content/Blog/`; the rest currently fall back via `redirects.yaml` → `/blog/`. Sources are listed in that file.
- [ ] **Author DE versions of the migrated blog posts.** Currently EN-only; the build emits "Missing translation" warnings until `.de.md` siblings exist.
- [ ] **Drop real iCloud Drive URLs for press kit + brand kit** in `Content/Pages/Press.md` + `Press.de.md` (placeholders today).
- [ ] **Replace the `iPad` screenshots in Tools-iOS with proper `iPhone` screenshots** (iTunes Lookup currently returns iPad-only - likely an App Store Connect config). Drop them into `Content/Assets/images/Tools-iOS/Screenshot-N.png`.
- [ ] **Provide a flat 1024px PNG export of the current Business Card "glass" icon** - the Xcode 16 layered icon at `~/Developer/DigitalBusinessCardApp/AppIcon.icon/` can't be flattened by shell tools. The current `AppIcon-512.jpg` is the App Store thumbnail.
- [ ] **Apple App Site Association** at `/.well-known/apple-app-site-association` (Universal Links + Business Card AppClip - content lifted from the live Webflow site, see TODO.md).
- [ ] **`app-ads.txt`** at site root (AdMob entry from the live site, see TODO.md).
- [ ] **Android `assetlinks.json`** at `/.well-known/assetlinks.json` if the Android Tools app uses App Links.
- [ ] **Google Search Console verification meta** - preserve `google-site-verification=8Deh-qJD2ZKg_mAjM5-dMRDWS15XcUiIc6w4h9fL9-U` on cutover.
- [ ] **Twitter / OG hero image** - pick a 1200×630 brand image, wire into `SiteConfig.yaml`; set `twitter:site=@NFC_for_iPhone`.
- [ ] **Install ImageMagick on CI** so `srcset` variants generate in the GitHub Pages build.
- [ ] **Re-evaluate `redirects.yaml` around 2027-05.** The 35 Webflow→new-URL bridge pages are currently emitted with `noindex,follow` (via `RedirectNoindexProcessor`) so old inbound links keep working without polluting search. Once Google has re-indexed the new URLs and most external backlinks have updated (roughly 12 months after cutover), the bridge layer becomes pure overhead and `redirects.yaml` can be deleted along with the corresponding `HTMLRedirectPageRenderer` files.

## SiteKit references

- Pipeline overview: SiteKit uses **L**oader → **A**dapter → **T**eleporter → **E**nricher → **R**enderer (LATER). `SiteBuilder.blog(...)` is the recipe; custom renderers are layered via `.replacing()` / `.renderer()` in `Sources/Site/Main.swift`.
- Plugin docs (when working with AI): https://github.com/FlineDev/SiteKit-Plugin (blueprints, skills, theme picker, font hosting script).
- Local SiteKit source for spelunking: `.build/checkouts/SiteKit-Package/Sources/SiteKit/` (especially `Plugins/` and `Models/`).
