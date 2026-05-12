# CSS container model unification + landing.css split — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unify the page-container model so every page type renders content at the same 1152 px effective width, then split the 2,034-line `Theme/css/landing.css` into focused per-renderer files (`landing.css`, `marketing.css`, `blog.css`, `features.css`) and replace hardcoded width tiers with named tokens.

**Architecture:** Two file-touching phases, one config-touching phase. (1) Foundation — drop horizontal padding from outer sections and apply it to the inner wrappers; add named tokens to `theme.yaml`. (2) Replace hardcoded narrow widths with tokens; dedupe redundant hero overlay rules. (3) Move CSS blocks out of `landing.css` into three new files; list them in `theme.yaml`. Build verifies after each task; visual spot-check at the end.

**Tech Stack:** Swift 6.2+ / SiteKit static site generator. Theme assets in `Theme/`. Build with `swift run Site build`. Dev server with `swift run Site serve` (http://localhost:8080).

**Pre-existing working-tree state:** Three uncommitted edits already on disk that implement the verified width fix described in the spec (the prototype validated during brainstorming). Task 1 commits those as-is; later tasks refine them.

```
 M Sources/Site/Renderers/BlogIndexRenderer.swift
 M Sources/Site/Renderers/BlogPostRenderer.swift
 M Theme/css/landing.css
```

If these are NOT on disk when starting (e.g. you stashed or reverted them), reproduce them per the spec's "Concrete edits" section before doing Task 1.

**Spec reference:** `docs/superpowers/specs/2026-05-13-css-container-and-file-split-design.md`

---

### Task 1: Commit the verified width fix

The three uncommitted edits on disk are the prototype that was measured-verified during brainstorming. Land it as a discrete commit so the bug fix is reversible independently of the file split.

**Files:**
- Modify (already on disk): `Theme/css/landing.css`
- Modify (already on disk): `Sources/Site/Renderers/BlogIndexRenderer.swift`
- Modify (already on disk): `Sources/Site/Renderers/BlogPostRenderer.swift`

- [ ] **Step 1: Confirm the working-tree diff matches expectations**

Run: `git diff --stat`
Expected output (exact):
```
 Sources/Site/Renderers/BlogIndexRenderer.swift |  2 +-
 Sources/Site/Renderers/BlogPostRenderer.swift  |  2 +-
 Theme/css/landing.css                          | 18 +++++++++++-------
 3 files changed, 13 insertions(+), 9 deletions(-)
```

If different: re-apply per the spec's "Concrete edits" subsection (7 rules in `landing.css` lose horizontal padding; `.page-hero > *` and `.page-section > *` gain `padding-left/right: 1.5rem`; both blog renderers drop the `landing-container` class composed onto `page-hero-grid`).

- [ ] **Step 2: Build to confirm no syntax errors**

Run: `swift run Site build 2>&1 | tail -3`
Expected: a line containing `Build completed successfully!`. If it fails, read the error — likely a typo in one of the CSS edits.

- [ ] **Step 3: Commit**

Run:
```bash
git add Theme/css/landing.css Sources/Site/Renderers/BlogIndexRenderer.swift Sources/Site/Renderers/BlogPostRenderer.swift
git commit -m "$(cat <<'EOF'
CSS: unify content width across landing, marketing, blog, features

Strip horizontal padding from outer .page-hero/.page-section and the
three blog wrapper sections; move the 1.5rem gutter onto the inner
.page-hero > * / .page-section > * rules so the effective content
area is 1152px on every page (was 1152px on landing but 1200px on
marketing-rendered pages — a 48px discrepancy at desktop widths).

Drop the legacy landing-container class composed onto page-hero-grid
in the two blog renderers; with .page-hero > * carrying the gutter
the composition was a double gutter at narrow viewports.

Verified by direct rect measurement at 1440px and 1100px viewports
across landing, business-card, about, contact, blog hub, blog post,
features hub, and a feature subpage. All wrappers converge.

EOF
)"
```

---

### Task 2: Add named width tokens to `theme.css`

Introduce `--container-padding`, `--prose-width`, `--faq-width` so subsequent tasks can replace hardcoded values with `var(--container-padding)`, `var(--prose-width)`, `var(--faq-width)`.

**Note:** SiteKit's `ThemeTokens` struct only recognizes a fixed set of layout token keys (`maxWidth`, `contentWidth`, `wideContentWidth`, `headerHeight`, `radius`, `radiusLg`, `transition`). Adding arbitrary keys under `tokens:` in `theme.yaml` does nothing — SiteKit silently ignores them. So we define our new vars in a plain `:root { }` block at the top of `theme.css` instead. Standard CSS practice; no SiteKit changes required. The SiteKit-emitted inline `:root` (in `<head>`) and our `:root` rule in `theme.css` both contribute to the same CSS custom-property cascade.

**Files:**
- Modify: `Theme/css/theme.css`

- [ ] **Step 1: Inspect current top of `theme.css`**

Run: `head -20 Theme/css/theme.css`

Expected: a file-header comment followed by an `@font-face` block. Find the first divider comment (`/* ============... */`) — the `:root` rule should be inserted *before* the first content section, ideally right after the file-header `/* NFC.cool — Theme chrome... */` comment.

- [ ] **Step 2: Insert the `:root` block**

Add this block immediately after the file-header comment at the top of `theme.css` (before the existing `@font-face` and `/* =====... */` content), separated from surrounding code by one blank line above and below:

```css
/* ============================================================
   Theme-local width tokens.
   SiteKit's token system only emits a fixed set of layout vars
   (--max-width, --content-width, --wide-content-width, etc.) into
   the inline :root in <head>. The vars below complement those for
   intents SiteKit doesn't know about: the gutter inside our 1200px
   container, the blog prose reading column, the landing FAQ
   accordion measure. Defined here so every stylesheet that uses
   them inherits a single source of truth.
   ============================================================ */
:root {
   --container-padding: 1.5rem;
   --prose-width: 760px;
   --faq-width: 820px;
}
```

- [ ] **Step 3: Build and confirm the vars are emitted in the rendered CSS**

Run: `swift run Site build 2>&1 | tail -3`
Expected: `Build completed successfully!`

Run: `grep -oE '\-\-(container-padding|prose-width|faq-width):\s*[^;]+;' _Site/assets/theme/css/theme.css | sort -u`
Expected three lines (in some order):
```
--container-padding: 1.5rem;
--faq-width: 820px;
--prose-width: 760px;
```

If any are missing, double-check the `:root` block in `theme.css` and rebuild. (SiteKit copies CSS files verbatim into `_Site/assets/theme/css/` — what's in the source is what ships.)

- [ ] **Step 4: Commit**

```bash
git add Theme/css/theme.css
git commit -m "$(cat <<'EOF'
CSS: name the container-padding, prose, FAQ width tiers

Adds --container-padding (1.5rem), --prose-width (760px),
--faq-width (820px) as theme.css :root vars so subsequent CSS edits
can reference named intent instead of hardcoded numbers.

SiteKit's ThemeTokens struct only emits a fixed set of layout
keys; the additional intents above live as plain CSS vars defined
alongside the existing token block.

EOF
)"
```

---

### Task 3: Replace literal `1.5rem` gutter with `var(--container-padding)` in the width-fix rules

The rules edited in Task 1 use the literal `1.5rem`. Switch them to the token now that it exists. This is mechanical search-and-replace scoped to the two rules.

**Files:**
- Modify: `Theme/css/landing.css` (lines around 810 and around 1010)

- [ ] **Step 1: Edit `.page-hero > *`**

Find the rule (around line 810):
```css
.page-hero > * {
   max-width: var(--max-width);
   margin-left: auto;
   margin-right: auto;
   padding-left: 1.5rem;
   padding-right: 1.5rem;
}
```

Replace `padding-left: 1.5rem;` with `padding-left: var(--container-padding);` and `padding-right: 1.5rem;` with `padding-right: var(--container-padding);`.

- [ ] **Step 2: Edit `.page-section > *`**

Find the rule (around line 1010):
```css
.page-section > * {
   max-width: var(--max-width);
   margin-left: auto;
   margin-right: auto;
   padding-left: 1.5rem;
   padding-right: 1.5rem;
}
```

Same two replacements.

- [ ] **Step 3: Build and confirm rendering unchanged**

Run: `swift run Site build 2>&1 | tail -3`
Expected: `Build completed successfully!`

Run: `grep -E "page-hero > \*|page-section > \*" -A 6 Theme/css/landing.css | grep "padding"`
Expected (four lines):
```
   padding-left: var(--container-padding);
   padding-right: var(--container-padding);
   padding-left: var(--container-padding);
   padding-right: var(--container-padding);
```

- [ ] **Step 4: Commit**

```bash
git add Theme/css/landing.css
git commit -m "$(cat <<'EOF'
CSS: use --container-padding token for .page-hero/.page-section gutter

Replaces the literal 1.5rem in the two direct-child wrapper rules
introduced in the previous commit. No visual change.

EOF
)"
```

---

### Task 4: Token-ize the remaining hardcoded narrow widths

Four hardcoded narrow widths remain after Task 1:
- `.landing-faq .landing-container` — 820px (line 414) → `var(--faq-width)`
- `.landing-newsletter .landing-container` — 680px (line 652) → `var(--content-width)`
- `.blog-post-body` — 760px (line 1520) → `var(--prose-width)`
- Footer divider — 720px (theme.css line 452) → `var(--content-width)` (drops the orphan 720px tier per spec)

**Files:**
- Modify: `Theme/css/landing.css` (3 rules)
- Modify: `Theme/css/theme.css` (1 rule)

- [ ] **Step 1: FAQ container**

In `Theme/css/landing.css` around line 414, change:
```css
.landing-faq .landing-container {
   max-width: 820px;
```
to:
```css
.landing-faq .landing-container {
   max-width: var(--faq-width);
```

- [ ] **Step 2: Newsletter container**

In `Theme/css/landing.css` around line 652, change:
```css
.landing-newsletter .landing-container {
   max-width: 680px;
```
to:
```css
.landing-newsletter .landing-container {
   max-width: var(--content-width);
```

- [ ] **Step 3: Blog post body**

In `Theme/css/landing.css` around line 1520, change:
```css
.blog-post-body {
   max-width: 760px;
```
to:
```css
.blog-post-body {
   max-width: var(--prose-width);
```

- [ ] **Step 4: Footer divider**

In `Theme/css/theme.css` around line 452, change:
```css
   max-width: 720px;
```
to:
```css
   max-width: var(--content-width);
```

(Read 2 lines of context first to confirm you're editing the footer divider rule, not some other 720px occurrence. There should only be one — but verify.)

- [ ] **Step 5: Build and confirm zero remaining narrow-tier hardcodes**

Run: `swift run Site build 2>&1 | tail -3`
Expected: `Build completed successfully!`

Run: `grep -nE "max-width: ?(680|720|760|820)px" Theme/css/landing.css Theme/css/theme.css`
Expected: empty output (all four are now tokens).

- [ ] **Step 6: Commit**

```bash
git add Theme/css/landing.css Theme/css/theme.css
git commit -m "$(cat <<'EOF'
CSS: token-ize FAQ, newsletter, blog body, footer-divider widths

Replaces four hardcoded narrow-width tiers (820/680/760/720) with
the matching tokens. Footer divider snaps from an orphan 720px to
--content-width (680px), removing the only width tier that wasn't
already a token.

EOF
)"
```

---

### Task 5: Dedupe redundant blog hero rules

Both `.blog-index-hero` and `.blog-post-hero` carry the `.page-hero` class. `.page-hero` already sets `background: var(--brand-gradient); color: #FFFFFF` and emits the dot-grid + radial-gradient `::before/::after` overlays. The blog-hero variants redeclare every one of those. Remove them.

**Files:**
- Modify: `Theme/css/landing.css`

- [ ] **Step 1: Inspect what gets removed**

Run:
```bash
grep -nE "^\.blog-index-hero|^\.blog-post-hero" Theme/css/landing.css
```
Expected lines (approximate; numbers may shift after earlier tasks):
- `.blog-index-hero {` (around 1224) — keep, but trim
- `.blog-index-hero.page-hero { background: var(--brand-gradient); color: #FFFFFF; }` — DELETE entire line
- `.blog-index-hero .blog-index-rss { ... }` — keep
- `.blog-index-hero::before { ... }` — DELETE the whole 7-line rule
- `.blog-index-hero::after { ... }` — DELETE the whole 10-line rule
- `.blog-post-hero {` — keep, but trim
- `.blog-post-hero.page-hero { background: var(--brand-gradient); color: #FFFFFF; }` — DELETE entire line
- `.blog-post-hero .blog-post-meta { ... }` — keep
- `.blog-post-hero .blog-post-tags { ... }` — keep
- `.blog-post-hero::before { ... }` — DELETE the whole 7-line rule
- `.blog-post-hero::after { ... }` — DELETE the whole 10-line rule

- [ ] **Step 2: Edit `.blog-index-hero {`**

Find:
```css
.blog-index-hero {
   position: relative;
   background: var(--brand-gradient);
   color: #FFFFFF;
   padding: clamp(4rem, 9vw, 6.5rem) 0 clamp(3rem, 6vw, 4.5rem);
   overflow: hidden;
   isolation: isolate;
   text-align: center;
}
```

Replace with (drops everything that `.page-hero` already provides — only padding stays, since the blog hero uses a slightly tighter vertical clamp):
```css
.blog-index-hero {
   padding: clamp(4rem, 9vw, 6.5rem) 0 clamp(3rem, 6vw, 4.5rem);
}
```

- [ ] **Step 3: Delete the `.blog-index-hero.page-hero` redundancy line**

Find and delete the single line:
```css
.blog-index-hero.page-hero { background: var(--brand-gradient); color: #FFFFFF; }
```

- [ ] **Step 4: Delete `.blog-index-hero::before` and `.blog-index-hero::after`**

Find and delete both rule blocks. They start at `.blog-index-hero::before {` through the matching `}`, and `.blog-index-hero::after {` through the matching `}`. (Use Read on the surrounding lines first to lock onto the exact ranges.)

- [ ] **Step 5: Repeat steps 2–4 for `.blog-post-hero`**

Trim the `.blog-post-hero` rule to:
```css
.blog-post-hero {
   padding: clamp(3.5rem, 7vw, 5.5rem) 0 clamp(3rem, 5vw, 4rem);
}
```

Delete the `.blog-post-hero.page-hero { background: var(--brand-gradient); color: #FFFFFF; }` line.

Delete `.blog-post-hero::before` and `.blog-post-hero::after` rule blocks.

- [ ] **Step 6: Build and visual-rule sanity check**

Run: `swift run Site build 2>&1 | tail -3`
Expected: `Build completed successfully!`

Run: `grep -cE "::before|::after" Theme/css/landing.css`
Note the count and ensure it dropped by 4 versus before this task (you can rerun on the previous commit with `git show HEAD~1:Theme/css/landing.css | grep -cE "::before|::after"` to confirm).

- [ ] **Step 7: Commit**

```bash
git add Theme/css/landing.css
git commit -m "$(cat <<'EOF'
CSS: dedupe blog hero overlays + background re-assertions

The .blog-index-hero and .blog-post-hero variants both already carry
the .page-hero class, so .page-hero's background/color/overlay rules
already apply. Their explicit redeclarations were dead weight.

Drops 4 ::before/::after rule blocks and 2 redundant single-line
background re-assertions. The trimmed hero rules now express only
what's variant-specific (the tighter vertical padding clamps).

EOF
)"
```

---

### Task 6: Extract `marketing.css` from `landing.css`

Move three contiguous section blocks (lines 775–1221 in the current file) into a new `Theme/css/marketing.css`. These cover `.page-hero/-grid/-text/-visual`, `.page-section/--gallery`, `.page-cards-grid`, `.page-card`, `.page-gallery`, and the contact-page `.contact-social-grid`. The section dividers in `landing.css` make the boundaries unambiguous.

**Files:**
- Create: `Theme/css/marketing.css`
- Modify: `Theme/css/landing.css` (remove the moved range)

- [ ] **Step 1: Identify the exact line ranges in the current file**

Run:
```bash
grep -nE "^/\* =+" Theme/css/landing.css | head -25
```

Locate the three section-start lines whose immediately-following comment lines read (run `grep -nE "Static content pages|Card grids on static|Social-media card grid"` to be sure):
- "Static content pages — marketing-page hero..."
- "Card grids on static pages..."
- "Social-media card grid used on /contact/..."

The block spans from the first divider to the last line before the next divider ("Blog index..."). Note the start and end line numbers.

- [ ] **Step 2: Create `Theme/css/marketing.css` with a file header**

Write the new file with this header on top, then paste the extracted block beneath it:

```css
/* ============================================================
   marketing.css
   Marketing-page sections rendered by MarketingPageRenderer.
   Used by /business-card/, /about/, /contact/, /press/,
   /developers/, /integrations/, /reviews/.

   Also referenced by blog and features stylesheets (which compose
   .page-hero / .page-section), so this file must load BEFORE
   blog.css and features.css. Cascade order in Theme/theme.yaml:
   theme.css → landing.css → marketing.css → blog.css → features.css.
   ============================================================ */

/* (paste extracted block here) */
```

- [ ] **Step 3: Remove the extracted block from `landing.css`**

Delete lines from the "Static content pages" divider through the line immediately before the "Blog index" divider.

- [ ] **Step 4: Verify nothing else changed**

Run: `git diff --stat Theme/css/landing.css`
Expected: only deletions in `landing.css`. Number of deleted lines should equal the original block length.

Run: `wc -l Theme/css/marketing.css`
Sanity-check: should be close to the block length plus the 11-line header (≈460 lines).

- [ ] **Step 5: Wire `marketing.css` into `theme.yaml` (provisional)**

Edit `Theme/theme.yaml`'s `css:` list:
```yaml
css:
   - "css/theme.css"
   - "css/landing.css"
   - "css/marketing.css"
```

- [ ] **Step 6: Build and check no styles regressed**

Run: `swift run Site build 2>&1 | tail -3`
Expected: `Build completed successfully!`

Run: `swift run Site serve` in one terminal (or background), then in another:
```bash
curl -s http://localhost:8080/business-card/ | grep -oE 'class="page-(hero|section)[^"]*"' | sort -u
```
Expected: page-hero and page-section classes present, exactly as before.

Manually visit http://localhost:8080/business-card/ and http://localhost:8080/about/ in a browser. Confirm gradient hero + cards-grid render identically to before this task. Kill the dev server when done.

- [ ] **Step 7: Commit**

```bash
git add Theme/css/marketing.css Theme/css/landing.css Theme/theme.yaml
git commit -m "$(cat <<'EOF'
CSS: extract marketing.css from landing.css

Moves the .page-hero/.page-section/.page-card/.page-gallery and
.contact-social-grid rule blocks (used by MarketingPageRenderer
for business-card, about, contact, press, developers, integrations,
reviews) into their own file. landing.css now contains only
landing-page rules + cross-cutting utilities. No visual change.

EOF
)"
```

---

### Task 7: Extract `blog.css` from `landing.css`

Move the "Blog index" and "Blog post" sections (currently lines ≈1222 through ≈1590) into a new file.

**Files:**
- Create: `Theme/css/blog.css`
- Modify: `Theme/css/landing.css` (remove the moved range)
- Modify: `Theme/theme.yaml`

- [ ] **Step 1: Identify the line range**

Run:
```bash
grep -nE "Blog index|Blog post|Feature pages" Theme/css/landing.css | head -6
```

The block spans from the "Blog index" divider through the line immediately before the "Feature pages" divider.

- [ ] **Step 2: Create `Theme/css/blog.css`**

Write with this header, then paste the extracted block beneath:

```css
/* ============================================================
   blog.css
   Blog hub (BlogIndexRenderer) + blog post (BlogPostRenderer).
   Composes .page-hero from marketing.css (so marketing.css must
   load first per theme.yaml's css: ordering).
   ============================================================ */

/* (paste extracted block here) */
```

- [ ] **Step 3: Remove the block from `landing.css`**

Delete lines from the "Blog index" divider through the line immediately before the "Feature pages" divider.

- [ ] **Step 4: Add `blog.css` to `theme.yaml`'s `css:` list**

```yaml
css:
   - "css/theme.css"
   - "css/landing.css"
   - "css/marketing.css"
   - "css/blog.css"
```

- [ ] **Step 5: Build and spot-check**

Run: `swift run Site build 2>&1 | tail -3`
Expected: `Build completed successfully!`

Start `swift run Site serve`, then visit http://localhost:8080/blog/ and http://localhost:8080/blog/3d-scan-feature/. Confirm:
- Blog hub renders with brand-gradient hero and card grid.
- Blog post renders with brand-gradient hero, narrow reading column, related cards section.

Kill the dev server.

- [ ] **Step 6: Commit**

```bash
git add Theme/css/blog.css Theme/css/landing.css Theme/theme.yaml
git commit -m "$(cat <<'EOF'
CSS: extract blog.css from landing.css

Moves the .blog-index-* and .blog-post-* rule blocks into their own
file. blog.css cascades after marketing.css so the variants can
extend .page-hero. No visual change.

EOF
)"
```

---

### Task 8: Extract `features.css` from `landing.css`; relocate error-page rules to `theme.css`

`landing.css` still contains the "Feature pages", "Feature comparison", "Features index" sections (3 blocks) plus a "Custom 404 page" block and a tail of "Responsive" @media rules. Move:
- All three feature blocks → new `features.css`.
- The 404-page block → `theme.css` (it's page-shell territory, sibling to `.sk-static-page`).
- The "Responsive" @media block stays in `landing.css` for now if and only if every rule inside it targets a landing-only selector. If any media-query rule inside targets `.page-*`, `.blog-*`, or `.feature-*` selectors, split that media query into matching files (each file gets its own `@media` block with its own rules). Most likely outcome: leave landing-only rules in `landing.css`'s tail and move `.feature-*` / `.blog-*` / `.page-*` responsive rules to the matching files.

**Files:**
- Create: `Theme/css/features.css`
- Modify: `Theme/css/theme.css` (append error-page rules)
- Modify: `Theme/css/landing.css` (remove the moved ranges)
- Modify: `Theme/theme.yaml`

- [ ] **Step 1: Identify boundaries**

Run:
```bash
grep -nE "Feature pages|Feature comparison|Custom 404|Features index|Responsive" Theme/css/landing.css
```

Note the line numbers for each divider.

- [ ] **Step 2: Inspect the Responsive @media block**

Run: `awk '/Responsive$/,0' Theme/css/landing.css | head -100`

For each `@media (...)` rule inside the Responsive section, look at the selectors it contains. Categorize:
- Selectors matching `.landing-*` → stay in `landing.css`
- Selectors matching `.page-*` → move to `marketing.css`
- Selectors matching `.blog-*` → move to `blog.css`
- Selectors matching `.feature-*`, `.features-*` → move to `features.css`

You may need to split a single `@media (max-width: NNNpx) { ... }` block across files: each destination file gets its own `@media (max-width: NNNpx) { ... }` with just its rules.

- [ ] **Step 3: Create `Theme/css/features.css`**

Write with this header, then paste the three feature blocks:

```css
/* ============================================================
   features.css
   Feature page (FeaturePageRenderer) + features index
   (FeaturesIndexRenderer). Composes .page-hero from marketing.css
   and .landing-feature-card from landing.css. Loads last in the
   cascade.
   ============================================================ */

/* (paste "Feature pages — shared with /features/{slug}/" block) */

/* (paste "Feature comparison (iOS vs Android matrix)" block) */

/* (paste "Features index (/features/) — ..." block) */
```

Plus, append any feature-targeting @media rules at the bottom.

- [ ] **Step 4: Append the 404-page block to `theme.css`**

Read the "Custom 404 page" block from `landing.css`. Append it to `theme.css` (after the existing `.sk-static-page` typography section), introduced by a divider comment:

```css
/* ============================================================
   Custom 404 page — error template (CustomErrorPageRenderer).
   ============================================================ */

/* (paste 404 block) */
```

- [ ] **Step 5: Remove the moved blocks from `landing.css`**

Sections in `landing.css`'s tail (after Tasks 1–7) appear in this order:
1. "Feature pages — shared with /features/{slug}/" → goes to `features.css`
2. "Feature comparison (iOS vs Android matrix)" → goes to `features.css`
3. "Custom 404 page" → goes to `theme.css`
4. "Features index (/features/) — ..." → goes to `features.css`
5. "Responsive" — route each `@media` rule per Step 2

Delete sections 1–4 in their entirety from `landing.css` (already copied into their destinations in Steps 3 and 4). For section 5, delete only those rules you moved out; rules that target `.landing-*` stay.

What remains in `landing.css` should be only landing-page sections + cross-cutting `.landing-container`, `.landing-section-title`, `.landing-cta-button`, `.landing-store-button*`, `.platform-pill` (which is shared with features — keeping it in landing.css works because features.css loads later, but document this in `landing.css`'s file header below).

- [ ] **Step 6: Add a file header to the trimmed `landing.css`**

Replace any existing leading content above the first divider with:

```css
/* ============================================================
   landing.css
   Landing-page sections (LandingPageRenderer). Plus a small set
   of cross-cutting utilities (.landing-container, .platform-pill,
   .landing-cta-button, .landing-store-button*) that are shared
   with marketing and feature pages — kept here because they are
   referenced from markdown content and renaming would cascade
   through every locale.
   ============================================================ */
```

- [ ] **Step 7: Wire all five files into `theme.yaml`**

Final `css:` block:
```yaml
css:
   - "css/theme.css"
   - "css/landing.css"
   - "css/marketing.css"
   - "css/blog.css"
   - "css/features.css"
```

- [ ] **Step 8: Build**

Run: `swift run Site build 2>&1 | tail -3`
Expected: `Build completed successfully!`

- [ ] **Step 9: Visual regression spot-check**

Start `swift run Site serve`. Visit each:
- http://localhost:8080/ — landing page
- http://localhost:8080/features/ — features hub
- http://localhost:8080/features/nfc-reader-writer/ — a feature page
- http://localhost:8080/404 (or any nonexistent URL) — 404 page
- http://localhost:8080/business-card/ — marketing (re-check after split)
- http://localhost:8080/blog/ — blog hub (re-check)

For each: confirm rendering matches before the split (no missing styles, no overlapping content, gradient heroes intact, FAQ rows aligned). Kill server.

- [ ] **Step 10: Commit**

```bash
git add Theme/css/features.css Theme/css/theme.css Theme/css/landing.css Theme/theme.yaml
git commit -m "$(cat <<'EOF'
CSS: extract features.css; move 404 styles to theme.css

Splits the last sections out of landing.css:
- Feature page, feature comparison, features index → features.css
- Custom 404 page → theme.css (sibling to .sk-static-page)
- Responsive @media rules → routed to matching destination files

landing.css is now ~900 lines containing only landing sections plus
the cross-cutting utilities that markdown content references. Each
of the five theme stylesheets now maps to one renderer family.

EOF
)"
```

---

### Task 9: Final verification

Confirm the whole change set produces a clean build, that every renderer's pages still render correctly, and that the width invariant from the spec still holds.

**Files:** none (read-only)

- [ ] **Step 1: Clean build**

Run:
```bash
rm -rf _Site
swift run Site build 2>&1 | tail -5
```
Expected: `Build completed successfully!` and `Generated translation status` line.

- [ ] **Step 2: CSS-link sanity check on a rendered page**

Run:
```bash
grep -oE 'href="/assets/theme/css/[^"]+"' _Site/index.html | sort -u
```
Expected (5 hrefs, in order):
```
href="/assets/theme/css/blog.css?v=..."
href="/assets/theme/css/features.css?v=..."
href="/assets/theme/css/landing.css?v=..."
href="/assets/theme/css/marketing.css?v=..."
href="/assets/theme/css/theme.css?v=..."
```

(The hash query strings will vary; the file names are what matter. `sort -u` reorders alphabetically, so verify all five are present.)

- [ ] **Step 3: Page-by-page visual sweep**

Start `swift run Site serve`. Open each URL and confirm matches the pre-change rendering (compare against your screenshot or memory of how the site looked):
- `/` — landing hero gradient, feature grid, business-card banner, FAQ accordion, newsletter card, final CTA.
- `/business-card/` — gradient hero, page-section cards-grid, pricing table, footer.
- `/about/` — gradient hero, section cards.
- `/contact/` — gradient hero, social-media card grid.
- `/blog/` — gradient hero, blog card grid.
- `/blog/3d-scan-feature/` — gradient hero, narrow reading column body, related cards.
- `/features/` — features hub.
- `/features/nfc-reader-writer/` — feature page with spec groups and comparison table.
- `/privacy/` — legal page, 680px reading column.
- A 404 page (`/does-not-exist/`) — error template renders.

For each: no missing styles, no horizontal overflow, hero gradients intact, card grids aligned, content widths match across page types at the same viewport.

Kill the dev server.

- [ ] **Step 4: Final state confirmation**

Run: `git log --oneline -10`
Expected: ~9 commits added to main, with messages matching the per-task commit summaries above.

Run: `ls -la Theme/css/`
Expected: `theme.css landing.css marketing.css blog.css features.css` (5 files).

Run: `wc -l Theme/css/*.css`
Expected line distribution close to spec targets: theme.css ≈800 (gained 404 rules), landing.css ≈900, marketing.css ≈460, blog.css ≈380, features.css ≈360. (Totals slightly less than 2,750 since dedup pass dropped ≈50 lines of redundant blog-hero rules.)

- [ ] **Step 5: Tell the user the plan is complete**

Output:

> CSS container model unified across landing / marketing / blog / features (all converge to 1152 px content area). `landing.css` split into five focused files mapped 1:1 to renderers. Hardcoded width tiers replaced with named tokens. Net ≈50 lines removed via dedupe. Working tree clean.

---

## Spec coverage checklist

Each requirement in `docs/superpowers/specs/2026-05-13-css-container-and-file-split-design.md` maps to a task above:

- Spec §2 container model — Tasks 1, 3
- Spec §1 width tokens — Tasks 2, 4
- Spec §3 file split (5 files) — Tasks 6, 7, 8
- Spec §3 cascade load order — Tasks 6, 7, 8 (`theme.yaml` updated at each step)
- Spec §4 deduplication targets — Tasks 4, 5
- Spec verification recipe — Task 9 (manual visual sweep; the puppeteer measurement scaffolding from brainstorming is deliberately not reinstalled — if a regression is suspected, the recipe is in the spec)

No items left uncovered.
