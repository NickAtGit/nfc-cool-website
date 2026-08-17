# NFC.cool - website

Multi-page marketing site for the NFC.cool brand in nine locales (`en` plus `de`, `ja`, `pt`, `zh`, `id`, `es`, `fr`, `ar` - read the live list from `localization.languages` in `SiteConfig.yaml`), built with [SiteKit](https://github.com/FlineDev/SiteKit-Package). Uses the `blog()` recipe with a set of custom renderers layered on top in `Sources/Site/Main.swift` (landing, per-feature, features index, blog index/post, marketing pages, tag listings, 404, robots.txt, static root files) plus site-specific processors (locale region, OG image, ratings, lang picker, etc.).

## Build & serve

```bash
swift run Site build       # produce static site in _Site/
swift run Site serve       # build + dev server on http://localhost:8080
swift run Site i18n-check   # translation completeness gate (hard, run in CI)
swift run Site validate    # SiteKit's built-in file-presence check (Blog/ + Pages/ only)
```

`i18n-check` is this repo's own gate (see `Sources/Site/I18n/`, configured by repo-root
`i18n.yaml`). It exits non-zero on any real gap: a missing locale file across ALL
localizable roots (Blog, Pages, Data/Features, Data/Pricing, Landing), a UI-string in
`Strings/Localizable.json` left untranslated for some locale, a leftover `⟦TODO⟧`
scaffold marker, an em/en dash in structured data, or a straight ASCII `"` in the prose of
a locale that has its own quotation marks (`lint.quoteStyle` in `i18n.yaml`: `de` `„…“`,
`zh` `“…”`, `ja` `「…」`, `fr` `« … »`, `ar` `«…»`; `es`/`pt`/`id` are deliberately absent
because ASCII quotes are idiomatic there). Frontmatter, code spans, `<script>`/`<style>`
blocks, HTML attributes and link targets are exempt from that rule. Structural drift (a
translation missing an optional section the default language has) and "looks untranslated"
content are advisory warnings. CI runs it before every build (`.github/workflows/deploy.yml`).

Requires Swift 6.2+ and macOS 26 locally. CI uses `swift-actions/setup-swift@v2` on Ubuntu.

## Deploy

The site deploys to **GitHub Pages** via `.github/workflows/deploy.yml` (Swift 6.2 on Ubuntu, `swift run Site build`, `actions/upload-pages-artifact` + `actions/deploy-pages`). The repo-root `CNAME` binds it to `nfc.cool`.

GH Pages is a pure static host, which has two known consequences:

- **Newsletter form** posts directly to a shared Cloudflare Worker at `https://mailjet.02mining-hollers.workers.dev/` (the same Worker the iOS apps use - its source lives in the `nfcreader` Swift project's `EmailService` module). The Worker has Mailjet credentials + list ID baked in; the website's form just sends `{ email }` and CORS is wide-open. There is no Pages Function in this repo.
- **Webflow → new-URL redirects** in `redirects.yaml` (70 entries) are emitted to `_Site/_redirects` for hosts that honour it, but GH Pages does not - visitors land on HTML meta-refresh fallback pages emitted by SiteKit's `HTMLRedirectPageRenderer` instead. Slightly slower than a real 301, slightly worse for SEO, but functional.

If we ever move to Cloudflare Pages, the form already works as-is (Worker is host-agnostic) and `_redirects` / `_headers` will start being honoured for free.

## Sitemap (what visitors get)

Every localized page lives under `/<lang>/…` for each locale in `localization.languages` (`/de/`, `/ja/`, `/pt/`, `/zh/`, `/id/`, `/es/`, `/fr/`, `/ar/`); the table shows the EN path and its source.

| EN path | Source |
| --- | --- |
| `/` | `Content/Data/Landing{.<lang>}.yaml` via `LandingPageRenderer` |
| `/features/` | `FeaturesIndexRenderer` (lists all features for the locale) |
| `/features/{slug}/` | `Content/Data/Features/{slug}{.<lang>}.yaml` via `FeaturePageRenderer` |
| `/business-card/` | `Content/Pages/business-card{.<lang>}.md` via `MarketingPageRenderer`; pricing table from `Content/Data/Pricing/business-card{.<lang>}.yaml` via `PricingTableRenderer` |
| `/online-nfc-reader/` | `Content/Pages/NfcReader{.<lang>}.md` (Web NFC widget in `Theme/js/nfc-reader.js`); the old `/nfc-reader/` path redirects here |
| `/about/`, `/developers/`, `/affiliate-links/`, `/reviews/`, `/tap-counter/`, `/contact/`, `/press/` | `Content/Pages/*.md` + `*.<lang>.md` via `MarketingPageRenderer`; the old `/integrations/` path redirects to `/developers/` |
| `/privacy/`, `/terms/` | `Content/Pages/Privacy.md`, `Terms.md` - English-only (listed under `enOnly` in `i18n.yaml`); localized URLs get a fallback redirect page |
| `/blog/`, `/blog/{slug}/` | `Content/Blog/YYYY-MM-DD-{slug}{.<lang>}.md` via `BlogIndexRenderer` / `BlogPostRenderer` |
| `/tags/`, `/tags/{tag}/` | `TagListingRenderer` over the 11-tag vocabulary (`tagName_*` keys in `Strings/Localizable.json`) |
| `/changelog/`, `/changelog/{slug}/` | `Content/Changelog/*.md` - intentionally EN-only; localized post URLs are not rendered and are kept out of sitemap/feeds by `LocalizedContent.isEmitted` |
| `/feed.xml`, `/<lang>/feed.xml` | SiteKit `RSSFeedRenderer` with `FilteredFeedDataAdapter` |
| `/sitemap.xml`, `/sitemap_index.xml`, `/llms.txt`, `/robots.txt`, `/404.html` | SiteKit (sitemap uses `FeatureSitemapDataAdapter`), `RobotsTxtRenderer`, `CustomErrorPageRenderer` |
| `/app-ads.txt`, `/.well-known/apple-app-site-association` | `Content/StaticFiles/` copied verbatim by `StaticRootFilesRenderer` |
| `/_redirects` + HTML bridge pages | `redirects.yaml` via SiteKit `RedirectRenderer` (`_redirects` is unused on GH Pages; the HTML fallbacks do the work) |

Feature slugs: `nfc-reader-writer`, `qr-scanner`, `barcode-scanner`, `document-scanner`, `3d-object-scanner`, `room-scanner`, `webhooks`. To add a new feature: append a slug to `FeaturePageRenderer.slugs` in `Sources/Site/Renderers/FeaturePageRenderer.swift` and drop `{slug}.yaml` plus a `{slug}.<lang>.yaml` for every configured locale into `Content/Data/Features/` (`i18n-check` fails on a missing sibling).

## Brand structure (the part visitors care about)

NFC.cool is two products with different platform reach:

- **NFC.cool Tools (iOS)** - full toolkit: NFC, QR, barcode, document, 3D, room scanning. Bundle id `de.nicolo-stanciu.nfcing`, App Store id `1249686798`, short URL `https://ios.nfc.cool`.
- **NFC.cool Tools (Android)** - the NFC half of the toolkit: NFC read/write with the same feature depth as iOS (including Amiibo backup and restore) and webhooks. The camera/LiDAR scanners (QR, barcode, document, 3D, room) are iOS-only. Package `cool.nfc`, short URL `https://android.nfc.cool`. It still carries the legacy bundled Business Card for existing users, but the site never advertises that - every Business Card CTA points at the dedicated app.
- **NFC.cool Business Card** - dedicated standalone app on both platforms. iOS bundle id `io.stanc.DigitalBusinessCardApp`, App Store id `6502926572`, short URL `https://business-card.nfc.cool`; Android package `cool.nfc.businesscard`. AppClip and Apple Wallet passes are iPhone-only; everything else (lead capture, analytics, Conference Mode, custom colors) ships on both.

The site presents NFC.cool as one brand. The hero + main feature grid focuses on Tools (cross-platform). The `featureBanner` section calls out the standalone Business Card app with dual store badges.

## Source layout

```
SiteConfig.yaml                  ← Site-wide: name, baseURL, nav, footer, social, sections, localization (+ per-locale nav/footer overrides), redirectsFile
redirects.yaml                   ← Webflow / legacy → new URL map (consumed by SiteKit RedirectRenderer)
i18n.yaml                        ← i18n-check config: localizable roots, enOnly, identical-value allowlist, quote styles
Strings/Localizable.json         ← UI chrome strings (nav, tag names, headings, aria-labels) for every locale
Scripts/
├── scaffold-locale.py           ← step 1 of "add a language" (see Customization tips)
└── migrate-blog-links.py        ← one-off link rewriter from the Webflow migration
Content/
├── ImageManifest.yaml           ← CSS display widths per image role → ImageResizer srcset/sizes
├── Data/
│   ├── Landing.yaml             + Landing.<lang>.yaml
│   ├── Pricing/business-card.yaml   + .<lang>.yaml   ← pricing table (mirrors nfcreader's PaywallFeatures.swift)
│   └── Features/{slug}.yaml     + {slug}.<lang>.yaml  (7 slugs, see Sitemap)
├── Pages/                       ← About, AffiliateLinks, business-card, Contact, Developers, NfcReader, Press, Reviews, TapCounter (+ .<lang>.md each); Privacy, Terms (EN-only)
├── Blog/YYYY-MM-DD-{slug}.md    + .<lang>.md for every locale (i18n-check enforces the full set)
├── Changelog/YYYY-MM-DD-{slug}.md   ← EN-only by design
├── StaticFiles/                 ← copied verbatim to the site root (app-ads.txt, .well-known/apple-app-site-association)
└── Assets/
    ├── images/Tools-iOS/, Tools-Android/, BusinessCard/   ← app icons + screenshots
    ├── images/Blog/, Features/, About/, Reviews/, Affiliate/, Webflow/   ← page + post art
    └── Favicons/                ← Pre-generated favicons (32, 180, 192, 512)
Sources/Site/
├── Main.swift                   ← @main: SiteBuilder.blog + every .replacing()/.renderer()/.processor() below
├── Models/                      ← LandingData, FeatureData, PricingTable
├── Renderers/                   ← LandingPage, FeaturePage, FeaturesIndex, BlogIndex, BlogPost, MarketingPage, TagListing, PricingTable, CustomErrorPage, RobotsTxt, StaticRootFiles, NewsletterForm, PlatformBadge (+ a few processors that live here: LocaleRegion, CSSAsyncLoad, FontPreload, RedirectNoindex)
├── Processors/                  ← BrandWordmark, EmailObfuscation, GoogleSiteVerification, LangPickerData, LlmsTxtFeatures, OGImageDimensions, RatingsCount, RobotsIndexable, SmartAppBanner, ThemeColor, TwitterSite
├── Adapters/                    ← FeatureSitemapDataAdapter, FilteredFeedDataAdapter
├── Helpers/                     ← SiteStrings (typed SiteStringKey contract), LocalizedContent, FeatureCards, FinalCTA, PageHero, StoreLink
├── I18n/                        ← the i18n-check command (I18nChecker, I18nCheckConfig, YAMLParity)
└── StructuredData.swift         ← JSON-LD builders
Theme/
├── theme.yaml                   ← preset, colorScheme, fontPairing, css/js refs, tokens
├── css/                         ← theme.css (tokens, base), landing.css, features.css, blog.css, marketing.css, faq.css, newsletter.css, social.css, nfc-reader.css, rtl.css (scoped to [dir=rtl])
├── js/theme.js                  ← dark-mode toggle + nav toggle + newsletter form
├── js/nfc-reader.js             ← Web NFC widget on /online-nfc-reader/
└── images/                      ← favicon.svg, logos, store badges
```

The newsletter form posts cross-origin to a shared Cloudflare Worker; this repo contains no Pages Functions.

## Customization tips

- **Add or reorder a feature card on the landing page:** edit `features:` in `Content/Data/Landing.yaml` AND every `Landing.<lang>.yaml` sibling. The `platforms` field is free-form text rendered as a chip (use `iOS · Android` or `iOS only` for visual consistency; DE uses `Nur iOS`).
- **Add a new feature subpage:** drop a slug into `FeaturePageRenderer.slugs` in Swift code, then create `Content/Data/Features/<slug>.yaml` + a `<slug>.<lang>.yaml` for every locale. The renderer auto-picks them up; `i18n-check` blocks a partial set.
- **Edit the newsletter copy:** `newsletter:` block in `Landing.yaml` and each `Landing.<lang>.yaml`. The form is rendered site-wide (blog/changelog posts + indexes, feature pages + index, and static marketing pages - everything except the legal pages and 404) via `NewsletterForm.section(for:)`, so the one `newsletter:` block drives every page. The form posts directly to the shared Mailjet Worker (`https://mailjet.02mining-hollers.workers.dev/`). To override per-form, set `data-endpoint` on the form via the renderer.
- **Add a blog post:** create `Content/Blog/YYYY-MM-DD-<slug>.md` with frontmatter (`id`, `title`, `date`, `tags`, `summary`, `image`, `imageAlt`, `author`, optional `metaTitle`/`metaDescription`/`ogTitle`/`ogDescription`) plus a `.<lang>.md` sibling for every locale (same `id`/`date`/`image`/`tags`; `ct=`/`utm_campaign` switches to the sibling's language). Posts render in `/blog/` automatically and appear in `/feed.xml`. Tags must come from the 11-tag vocabulary (`tagName_*` keys in `Strings/Localizable.json`). Prose conventions: first-person developer voice, no em/en dashes, no decorative emojis, exactly one `---` before every `## H2` and nowhere else, native quotation marks per locale (enforced by `i18n-check`).
- **Add a Webflow → new URL redirect:** add to `redirects.yaml`. SiteKit emits both `_redirects` (server-side on Cloudflare) and HTML fallbacks.
- **Change the dual-CTA buttons** (text or layout): see `renderStoreButtons(...)` in `LandingPageRenderer.swift` and the `.landing-store-*` rules in `landing.css`.
- **Pick a different color scheme or font pairing:** open `Plugin/themes/ThemePreview.html` from the SiteKit-Plugin repo, pick, then update `Theme/theme.yaml`.
- **Add a language (deterministic):** the gate makes this repeatable - you cannot ship a half-translated locale.
  1. `python3 Scripts/scaffold-locale.py <lang>` - copies every default-language file the locale needs (derived from `i18n.yaml` roots, skipping `enOnly`) to a `.<lang>` sibling with a `⟦TODO:<lang>⟧` banner.
  2. `SiteConfig.yaml`: append `<lang>` to `localization.languages`; add a `localeOverrides.<lang>` block (nav + footer titles; keep URLs). Also add a region row to `LocaleRegionProcessor.swift`'s `regions` table (e.g. `("pt", "pt-PT", "pt_PT", "🇵🇹")`) so `<html lang>` / `og:locale` / the lang-picker flag flash are correct - this is the one remaining per-language code edit.
  3. `Strings/Localizable.json`: add a `<lang>` value to every key (and the real `langFlag` / `langName`). The language picker + nav-toggle pick these up via `LangPickerDataProcessor` - no JS edit needed.
  4. Translate every scaffolded file, then delete each `⟦TODO⟧` banner line. Conventions: no em/en dashes (use ` - `), no decorative emojis, Title Case for English titles only, Japanese typography for `.ja`, and feature/pricing tables mirror nfcreader's `PaywallFeatures.swift`.
  5. `swift run Site i18n-check` until it reports `0 error(s)`, then `swift run Site build` and spot-check `/<lang>/`.

  UI "chrome" strings (nav labels, tag names, pricing pill aria-labels, blog/feature headings) live in `Strings/Localizable.json`, not in renderer Swift - `SiteStringKey` in `Sources/Site/Helpers/SiteStrings.swift` is the typed contract `i18n-check` enforces, so a missing locale can never silently fall back to English.

## Tasks still on the punch-list

- [ ] **Create the Impressum page** (`Content/Pages/Impressum.md`, in the `legalLanguage` = de) with the postal address (TMG § 5 compliance - required before launch). It does not exist yet; it is listed under `enOnly.files` in `i18n.yaml` so `i18n-check` does not demand per-locale siblings for it.
- [ ] **Replace the `iPad` screenshots in Tools-iOS with proper `iPhone` screenshots** (iTunes Lookup currently returns iPad-only - likely an App Store Connect config). The current `Content/Assets/images/Tools-iOS/Screenshot-N.webp` are 576×768 (4:3).
- [ ] **Provide a flat 1024px PNG export of the current Business Card "glass" icon** - the Xcode 16 layered icon at `~/Developer/DigitalBusinessCardApp/AppIcon.icon/` can't be flattened by shell tools. The current `AppIcon-512.webp` is the App Store thumbnail.
- [ ] **Android `assetlinks.json`** at `/.well-known/assetlinks.json` if the Android Tools app uses App Links (drop it into `Content/StaticFiles/.well-known/`).
- [ ] **blog.nfc.cool subdomain** - needs a DNS/host-level redirect so `blog.nfc.cool/blog/{slug}` lands on the new site; the path entries in `redirects.yaml` only fire on the main domain (see TODO.md).
- [ ] **Re-evaluate `redirects.yaml` around 2027-05.** The 70 legacy→new-URL bridge pages are currently emitted with `noindex,follow` (via `RedirectNoindexProcessor`) so old inbound links keep working without polluting search. Once Google has re-indexed the new URLs and most external backlinks have updated (roughly 12 months after cutover), the bridge layer becomes pure overhead and `redirects.yaml` can be deleted along with the corresponding `HTMLRedirectPageRenderer` files.

Done since the original list (kept here so nobody re-opens them): blog migration + all-locale siblings (33 posts × 9 locales, gated by `i18n-check`), real iCloud press/brand-kit links on `/press/`, AASA + `app-ads.txt` via `Content/StaticFiles/`, Google Search Console meta (`GoogleSiteVerificationProcessor`), `twitter:site` + default OG image (`TwitterSiteProcessor`, `og-landing.webp`), ImageMagick on CI (`deploy.yml`).

## SiteKit references

- Pipeline overview: SiteKit uses **L**oader → **A**dapter → **T**eleporter → **E**nricher → **R**enderer (LATER). `SiteBuilder.blog(...)` is the recipe; custom renderers are layered via `.replacing()` / `.renderer()` in `Sources/Site/Main.swift`.
- Plugin docs (when working with AI): https://github.com/FlineDev/SiteKit-Plugin (blueprints, skills, theme picker, font hosting script).
- Local SiteKit source for spelunking: `.build/checkouts/SiteKit-Package/Sources/SiteKit/` (especially `Plugins/` and `Models/`).
