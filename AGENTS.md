# NFC.cool — website

Marketing landing site for the NFC.cool brand, built with [SiteKit](https://github.com/FlineDev/SiteKit-Package) using the `AppLanding` blueprint and a custom `LandingPageRenderer` that supports dual App Store + Google Play CTAs.

## Build & serve

```bash
swift run Site build       # produce static site in _Site/
swift run Site serve       # build + dev server on http://localhost:8080
```

Requires Swift 6.2+ and macOS 26 locally. CI uses `swift-actions/setup-swift@v2` on Ubuntu.

## Deploy

GitHub Actions workflow at `.github/workflows/deploy.yml` builds on push to `main` and deploys `_Site/` to GitHub Pages. The `PAT_TOKEN` secret is configured for fetching SiteKit-Package (kept for forward-compat with private dependencies; SiteKit-Package itself is public).

## Structure

```
SiteConfig.yaml                  ← Site-wide config (name, baseURL, nav, footer, social)
Content/
├── Data/Landing.yaml            ← All landing-page content (hero, features, faq, cta, banner)
├── Pages/
│   ├── Privacy.md               ← Privacy policy (NFC.cool-specific copy)
│   └── Impressum.md             ← German imprint (TODO: add postal address)
└── Assets/
    ├── Images/Tools-iOS/        ← NFC.cool Tools iOS icon + screenshots
    ├── Images/Tools-Android/    ← Tools Android icon
    ├── Images/BusinessCard/     ← NFC.cool Business Card icon + screenshots
    └── Favicons/                ← Pre-generated favicons (32, 180, 192, 512)
Sources/Site/
├── Main.swift                   ← @main entry: SiteBuilder.portfolio + LandingPageRenderer
├── Models/LandingData.swift     ← Decoded structure of Landing.yaml; extended with `googlePlayURL`
└── Renderers/LandingPageRenderer.swift
                                 ← Renders the landing page from Landing.yaml
                                 ← Custom: dual store buttons (App Store + Google Play) using FA brand icons
                                 ← Custom: per-feature `platforms` chip (e.g. "iOS · Android" vs "iOS only")
Theme/
├── theme.yaml                   ← colorScheme, fontPairing, css refs
├── js/theme.js
└── images/favicon.svg
```

## Brand structure (the part visitors care about)

NFC.cool is two products with different platform reach:

- **NFC.cool Tools (iOS)** — full toolkit: NFC, QR, barcode, document, 3D, room scanning. Bundle id `de.nicolo-stanciu.nfcing`, App Store id `1249686798`, short URL `https://ios.nfc.cool`.
- **NFC.cool Tools (Android)** — NFC scanning only, plus the Business Card features bundled in. Package `cool.nfc`, short URL `https://android.nfc.cool`.
- **NFC.cool Business Card (iOS)** — dedicated standalone iOS app. Bundle id `io.stanc.DigitalBusinessCardApp`, App Store id `6502926572`, short URL `https://business-card.nfc.cool`.

The site presents NFC.cool as one brand. The hero + main feature grid focuses on Tools (cross-platform). The `featureBanner` section calls out the standalone Business Card iOS app and notes the Android-bundled equivalent.

## Customization tips

- **Add or reorder a feature card:** edit `features:` in `Content/Data/Landing.yaml`. The `platforms` field is free-form text rendered as a chip (use `iOS · Android` or `iOS only` for visual consistency).
- **Change the dual-CTA buttons** (text or layout): see `renderStoreButtons(...)` and the inline `<style>` block in `LandingPageRenderer.swift`.
- **Pick a different color scheme or font pairing:** open `Plugin/themes/ThemePreview.html` from the SiteKit-Plugin repo, pick, then update `Theme/theme.yaml` (`colorScheme`, `fontPairing`).
- **Self-host fonts:** run SiteKit-Plugin's `scripts/download-fonts.sh` and set `selfHostedFonts: true` in `Theme/theme.yaml`.
- **Multi-language:** add `localization:` to `SiteConfig.yaml` with `languages: [...]` and create `Content/Data/Landing.<lang>.yaml` files alongside the English one. The renderer auto-loads the locale-specific YAML.

## Tasks still on the punch-list

- [ ] Replace the `iPad` screenshots in Tools-iOS with proper `iPhone` screenshots (iTunes Lookup currently returns iPad-only — likely an App Store Connect config). Drop them into `Content/Assets/Images/Tools-iOS/Screenshot-N.png`.
- [ ] Provide a flat 1024px PNG export of the current Business Card "glass" icon — the Xcode 16 layered icon at `~/Developer/DigitalBusinessCardApp/AppIcon.icon/` can't be flattened by shell tools. The current `AppIcon-512.jpg` is the App Store thumbnail.
- [ ] Fill in the postal address in `Content/Pages/Impressum.md` (TG § 5 compliance).
- [ ] Pick the final `colorScheme` + `fontPairing` via `ThemePreview.html`. Currently using SiteKit defaults (`violet`, `professional`).
- [ ] Decide whether to opt into self-hosted Google Fonts (`selfHostedFonts: true` + run `download-fonts.sh`).

## SiteKit references

- Pipeline overview: SiteKit uses **L**oader → **A**dapter → **T**eleporter → **E**nricher → **R**enderer (LATER). `SiteBuilder.portfolio(...)` is the recipe, and `Main.swift` swaps in `LandingPageRenderer` for the home page.
- Plugin docs (when working with AI): https://github.com/FlineDev/SiteKit-Plugin (blueprints, skills, theme picker, font hosting script).
