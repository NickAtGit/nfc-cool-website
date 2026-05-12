# CSS container model unification and `landing.css` split

**Date:** 2026-05-13
**Status:** design — awaiting implementation plan
**Scope:** `Theme/css/`, `Theme/theme.yaml`, `Sources/Site/Renderers/BlogIndexRenderer.swift`, `Sources/Site/Renderers/BlogPostRenderer.swift`

## Problem

Two related issues in the site's CSS:

1. **Marketing pages render with a content area 48 px wider than the landing page** at desktop widths. The landing page wraps content in `.landing-container { max-width: 1200px; padding: 0 1.5rem }` so the effective content area is **1152 px**. Marketing pages (business-card, about, contact, press, developers, integrations, reviews — all rendered by `MarketingPageRenderer`) wrap content via `.page-hero > *` and `.page-section > *` with `max-width: var(--max-width)` but the 1.5 rem gutter lives on the *outer* section, not inside the max-width box — so the inner content reaches **1200 px**. Verified by direct measurement at 1440 px viewport before the fix.

2. **`Theme/css/landing.css` (2,034 lines) styles every page type, not just the landing page.** The filename misleads: it contains rules for `.page-hero/.page-section` (marketing pages), `.blog-index-*/.blog-post-*` (blog hub and posts), `.feature-*/.features-index-*` (features), plus dead-code overlap with `theme.css` (duplicate `::before/::after` gradient overlays on three different hero selectors). A comment at line 993 admits this: *"Static-page sections — full-bleed, alternating bg, 1200 px container, 760 px text reading column."*

Both issues compound: every time a hardcoded width tier (820 px FAQ, 680 px newsletter, 760 px blog body, 720 px footer divider) drifts, it's hard to spot because related rules are scattered across one monolithic file.

## Goals

- **Single content-area width** at desktop on every page type that wraps content (landing, marketing, blog hub, blog post, features hub, feature page).
- **One file per renderer concern**, so a future change to "the way feature pages look" has an obvious file to edit.
- **Named tokens for every non-default width tier**, so hardcoded numbers don't drift.
- **No markdown content changes.** The only Swift edits are dropping a `landing-container` class composition from two blog renderers — markdown authors stay free to write `.page-hero` + `.page-section` the way they do today.

## Non-goals

- **No renaming** of existing `.landing-*` class names. Markdown content (e.g. `business-card.md`'s `.landing-cta-button`, `.landing-store-buttons`) references them. Renaming would cascade through every markdown file in every locale.
- **No change to reading-column widths.** Blog post body (760 px), legal pages (680 px) are intentional reading measures. They stay narrower than the 1152 px main content area.
- **No new responsive breakpoints** or JS changes.
- **No SiteKit changes.** Everything happens in our theme directory + two custom renderers we already own.

## Verified design

This was prototyped on the working tree, built with `swift run Site build`, and measured headlessly via Chrome + Puppeteer at viewport widths 1440 and 1100. Every container converged to the same dimensions across all page types. The verification scaffolding (`measure-widths.mjs`, `serve-site.mjs`, `node_modules/`) is removed after this design is approved.

### 1. Width tokens (`Theme/theme.yaml` → CSS custom properties)

| Token | Value | Used for |
|---|---|---|
| `--max-width` | `1200px` | outer page container (unchanged) |
| `--content-width` | `680px` | legal pages, newsletter form, contact form (unchanged) |
| `--container-padding` | `1.5rem` | the inner gutter on every page container (new) |
| `--prose-width` | `760px` | blog post body reading column (new) |
| `--faq-width` | `820px` | landing FAQ accordion measure (new) |

`--wide-content-width: 800px` is injected by SiteKit into the inline `:root` block but is unused in any of our CSS. We leave it (we don't control SiteKit's emit) and note it as unused.

### 2. Container model

**Principle:** the outer section has *vertical padding only*; the inner wrapper carries `max-width` + horizontal gutter. Everything that wraps content follows the same pattern.

Two structural conventions coexist:

- **Class-wrapper convention** (landing, blog grid section, blog body section, blog related section, features hub, feature page) — markdown/Swift wraps content in `<div class="landing-container">`. The wrapper is `max-width: var(--max-width); margin: 0 auto; padding: 0 var(--container-padding)`. The outer section has vertical padding only.
- **Direct-children convention** (marketing pages — business-card, about, contact, press, developers, integrations, reviews) — markdown emits `<section class="page-hero">` and `<section class="page-section">` with content as direct children. The CSS applies the same wrapper shape to those direct children: `.page-hero > *` and `.page-section > *` get `max-width: var(--max-width); margin-inline: auto; padding-inline: var(--container-padding)`. The outer `.page-hero` / `.page-section` has vertical padding only.

Both conventions produce **1152 px effective content area** at desktop. Verified.

#### Concrete edits

Five rules in `landing.css` lose horizontal padding (vertical stays unchanged):

```css
.page-hero                  { padding: clamp(4rem, 9vw, 7rem) 0 clamp(3rem, 6vw, 5rem); }
.page-section               { padding: clamp(3.5rem, 6vw, 5rem) 0; }
.blog-index-hero            { padding: clamp(4rem, 9vw, 6.5rem) 0 clamp(3rem, 6vw, 4.5rem); }
.blog-post-hero             { padding: clamp(3.5rem, 7vw, 5.5rem) 0 clamp(3rem, 5vw, 4rem); }
.blog-index-grid-section    { padding: clamp(3.5rem, 7vw, 6rem) 0 clamp(4rem, 8vw, 7rem); }
.blog-post-body-section     { padding: clamp(3rem, 6vw, 5rem) 0; }
.blog-post-related          { padding: clamp(3.5rem, 7vw, 5rem) 0; }
```

Two rules gain `padding-inline`:

```css
.page-hero > *,
.page-section > * {
   max-width: var(--max-width);
   margin-left: auto;
   margin-right: auto;
   padding-left: var(--container-padding);
   padding-right: var(--container-padding);
}
```

Two Swift edits drop the workaround `landing-container` class composed onto `page-hero-grid`:

```diff
- <div class="page-hero-grid landing-container">
+ <div class="page-hero-grid">
```

…in `Sources/Site/Renderers/BlogIndexRenderer.swift` and `Sources/Site/Renderers/BlogPostRenderer.swift`. (The `landing-container` was a per-renderer hack to import the inner gutter; with `.page-hero > *` now carrying it, the hack becomes a *double* gutter at narrow viewports.)

### 3. File split — `Theme/css/`

Replace the two-file layout (`theme.css`, `landing.css`) with five focused files. Total byte count is unchanged; the split is purely organizational.

| File | Contains | Lines (target) |
|---|---|---|
| `theme.css` | `:root` tokens, reset (`*`/`html`/`body`), header, footer, nav, sk-skip-link, dark-mode toggle, `.sk-static-page` typography, `.sk-page-privacy/terms/impressum .sk-main` width constraint, error page | ≈700 (unchanged) |
| `landing.css` | `.landing-container`, `.landing-section`, `.landing-hero/-features/-feature-card/-feature-banner/-newsletter/-faq/-final-cta`, `.landing-cta-button`, `.landing-store-buttons/-button` | ≈900 |
| `marketing.css` | `.page-hero/-hero-grid/-hero-text/-hero-visual`, `.page-section/--gallery`, `.page-cards-grid`, `.page-card`, `.page-gallery`, `.contact-social-grid` (used by Contact page) | ≈400 |
| `blog.css` | `.blog-index-hero/-grid-section/-title/-subtitle/-rss`, `.blog-card-*`, `.blog-post-hero/-back/-title/-meta/-tags/-tag/-hero-image-section/-hero-image`, `.blog-post-body/-body-section`, `.blog-post-related` | ≈400 |
| `features.css` | `.features-index-*`, `.feature-page/-hero/-overview/-spec/-spec-group`, `.feature-docs/-docs-body`, `.feature-faq`, `.feature-comparison/-wrap/-table` | ≈350 |

**Loading:** `Theme/theme.yaml` lists all five in order under `css:`. SiteKit loads them globally on every page. Per-page conditional loading is not in scope; the bytes are split but the network cost is identical (everything is already concatenated by HTTP/2 multiplexing).

**Cascade order matters** because marketing.css's `.page-hero` is reused by `blog.css`'s `.blog-index-hero / .blog-post-hero` and `features.css`'s `.features-index-hero` (all composed via class). Load order: `theme.css → landing.css → marketing.css → blog.css → features.css`. This matches today's source order in `landing.css`.

### 4. Deduplication pass (during the split, not separately)

Concrete rules to remove during the split:

- **Hero overlay duplicates.** `.page-hero::before/::after` defines a radial-gradient + dot-grid overlay. `.blog-index-hero::before/::after` and `.blog-post-hero::before/::after` redefine identical overlays. Both blog heroes already carry the `.page-hero` class, so the inherited rule is sufficient. Delete the four duplicate blocks.
- **Background re-assertions.** `.blog-index-hero.page-hero { background: var(--brand-gradient); color: #FFFFFF }` and `.blog-post-hero.page-hero { ... same ... }` re-assert what `.page-hero` already sets. Delete both lines.
- **Footer divider tier.** `theme.css` line ~452 hardcodes `max-width: 720px` on a footer divider. Snap to `var(--content-width)` (680 px) — removes the orphan 720 px tier.
- **Newsletter container width.** `.landing-newsletter .landing-container { max-width: 680px }` (line ~651) — replace with `max-width: var(--content-width)`.
- **FAQ container width.** `.landing-faq .landing-container { max-width: 820px }` (line ~413) — replace with `max-width: var(--faq-width)`.
- **Blog body width.** `.blog-post-body { max-width: 760px }` (line ~1515) — replace with `max-width: var(--prose-width)`.

These edits change the *values* of zero pixels. They change the *names* so the intent travels with the number.

## Verification

Before-and-after measurement was performed headlessly at 1440 px and 1100 px viewport widths, measuring the rendered bounding rect of the outermost content wrapper on each of: `/`, `/business-card/`, `/about/`, `/contact/`, `/blog/`, `/blog/{slug}/`, `/features/`, `/features/nfc-reader-writer/`. All wrappers converged to identical `left`, `right`, `width`, `padding-left`, `padding-right` after the changes.

The verification scaffolding will be removed before the implementation lands. If a future change needs to re-verify, the recipe is: install `puppeteer-core` against the system Chrome (Chrome 147+ on macOS), serve `_Site/` over HTTP, and measure `getBoundingClientRect()` on selectors `.page-hero .page-hero-grid`, `.page-section > .page-cards-grid`, `.landing-hero .landing-container`, `.blog-index-grid-section .landing-container`, `.blog-post-body-section .landing-container` at multiple viewport widths.

## Risk

- **Cascade order regressions** during file split. Each split file must preserve the relative order of rules that share specificity. Verified by running a full build + the width measurement script after the split.
- **Hidden selectors.** A grep-only inventory may miss rules. The risk-mitigation is: after each file is split out, build the site and visually compare a sampling of pages (landing, business-card, blog, features, a feature subpage) against the pre-split build.
- **Spec drift.** If a new page type ships before this lands, it may use yet another container convention. Mitigation: land soon and document the two conventions in `AGENTS.md`.

## Out of scope

- Renaming `.landing-*` to a neutral namespace.
- Changing reading-column widths.
- Per-page conditional CSS loading.
- SiteKit changes (e.g. asking SiteKit to stop emitting `--wide-content-width`).
- New responsive breakpoints, JS, or design-token color changes.
