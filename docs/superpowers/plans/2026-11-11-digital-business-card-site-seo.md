# Digital Business Card: Site SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/business-card/` in all 13 locales the page Google picks for "digital business card" and its close variants: query-matching title, H1 and body, app structured data with stars, and our own links describing it.

**Architecture:** Content edits in `Content/Pages/business-card{.<lang>}.md`, the blog posts and `Landing{.<lang>}.yaml`; one Swift change so the page's JSON-LD carries the Business Card `SoftwareApplication` node. No new renderers.

**Tech Stack:** SiteKit static site (Swift 6.2), Markdown + YAML content, Python 3 for verification one-liners.

**Spec:** `docs/superpowers/specs/2026-11-11-digital-business-card-ranking-design.md` (Part 1, items 1-8). Evidence base: `~/Developer/business_card_service/reports/NFC cool web and AI visibility.md`.

## Global Constraints

- All 13 locales: `en de ja pt zh id es fr ar it tr ru uk`. A change to an EN file is matched in every `.<lang>` sibling in the same task.
- Copy is settled with Nico: present 2-3 worded options for EN and wait for his pick before writing. Translations follow the picked EN meaning, written natively (not calqued).
- House style: no em/en dashes (use ` - `), no decorative emojis, Title Case for English headings only, exactly one `---` before every `## H2` where the file already uses that scheme, native quotes per `i18n.yaml` `lint.quoteStyle`, `.ja` typography per `feedback_japanese_typography`, DE never "tippen" for NFC taps.
- Each locale's target phrase is the one its current `title:` already uses (e.g. `de` "Digitale Visitenkarte", `ja` "デジタル名刺", `zh` "电子名片", `fr` "carte de visite numérique", `es` "tarjetas de visita digitales", `pt` "cartões de visita digitais", `it` "biglietti da visita digitali", `tr` "Dijital Kartvizit", `ru` "цифровой визитки", `uk` "цифрової візитівки", `ar` "بطاقات العمل الرقمية", `id` "kartu nama digital"). Use its natural inflections; never English "Business Card" as the category word in a non-EN locale (the product name "NFC.cool Business Card" stays as is).
- Claims match `Content/Data/Pricing/business-card.yaml`: Free $0 (1 card, sharing, Apple Wallet, Conference Mode QR, Save Contact, "Made with NFC.cool"), Personal $19.99 a year, Pro $49.99 a year (10 cards), Team $50 per person a year or $5 a month. Do not mention the web maker (Part 2 is not built).
- Gates after every content task: `swift run Site i18n-check` reports `0 error(s)`; `python3 Scripts/lint-italian.py`, `lint-turkish.py`, `lint-russian.py`, `lint-ukrainian.py` report no errors; `swift run Site build` succeeds.

## Review Focus

- **Title length:** EN `<title>` (title + " - NFC.cool") at most 60 characters; CJK titles at most ~30 characters. Long titles get cut in results. Check in Task 2 and Task 3.
- **FAQ JSON-LD survives:** new sections must not use `<details class="faq-item">`, or `faqItems(inHTML:)` (`MarketingPageRenderer.swift:341`) would pull them into the FAQ node. Task 4's check counts exactly 10 `Question` nodes per locale.
- **Arabic RTL and numerals:** new `ar` sections keep the locale's Eastern-Arabic numeral convention and read correctly under `[dir=rtl]`. Spot-check `/ar/business-card/` in Task 3.
- **JSON-LD stays valid JSON:** offer prices and escaped names must parse. Task 4 parses every locale's script with `json.loads`.
- **No new competition with the roundup:** the roundup post keeps its own title and topic; only its link texts change (Task 5).

---

### Task 1: Settle the EN copy with Nico

**Files:** none changed; the picks are recorded in this plan under "Approved copy" below before Task 2 starts.

- [ ] **Step 1: Present options in one message**, each with 2-3 worded choices:
  1. `title:` (frontmatter, rendered as `<title>… - NFC.cool</title>`). Starting point from the spec: "Free Digital Business Card App with NFC & QR". Must stay at most 49 characters so the full `<title>` is at most 60.
  2. `description:` (meta description, at most 155 characters, says Free, NFC, QR, App Clip, Apple Wallet).
  3. H1 (phrase leads, brand optional) and the sentence under it (currently "Your digital business card on your phone, for individuals and teams. Share it with an NFC tap or a QR code, and see how many people save it.").
  4. Three new sections, each as one draft: "What Is a Digital Business Card?" (~80 words), "How to Make Your Digital Business Card" (3 steps: get the app, fill in your card or import a contact, share by NFC tap, QR or link), "NFC or QR?" (2-3 sentences, links `/blog/nfc-business-card-vs-qr-code/`).
  5. New H2 wording for "Who It's For", "Pricing", "Complete Feature Set", "What teams add".
- [ ] **Step 2: Record Nico's picks** verbatim under "Approved copy" at the end of this plan and commit the plan:

```bash
git add docs/superpowers/plans/2026-11-11-digital-business-card-site-seo.md
git commit -m "docs(plan): approved copy for the business card page"
```

### Task 2: EN `/business-card/` page

**Files:**
- Modify: `Content/Pages/business-card.md` (frontmatter lines 2 and 4, H1 line 14, the subtitle line under it, H2s at lines 66, 87, 97, 179; new sections inserted after the hero `</section>` and before `<div class="feature-page">`)

- [ ] **Step 1: Apply the approved copy.** New sections are plain Markdown `##` sections with prose, following the file's existing `---` before H2 scheme. No `<details class="faq-item">`.
- [ ] **Step 2: Build and check the output**

Run:
```bash
swift run Site build && python3 - <<'EOF'
import re
h=open('_Site/business-card/index.html').read()
t=re.search(r'<title>(.*?)</title>',h).group(1).replace('&amp;','&')
print(len(t), t)
print(re.search(r'<h1[^>]*>(.*?)</h1>',h).group(1))
body=re.sub(r'<script.*?</script>|<style.*?</style>','',h,flags=re.S)
print('phrase in body:', len(re.findall(r'(?i)digital business card', re.sub(r'<[^>]+>',' ',body))))
EOF
```
Expected: title length at most 60 and the approved text; H1 is the approved H1; phrase count at least 10 (was 5).

- [ ] **Step 3: Gates** (Global Constraints). Expected: all pass.
- [ ] **Step 4: Commit**

```bash
git add Content/Pages/business-card.md
git commit -m "feat(site): the business card page says digital business card where people search it"
```

### Task 3: The 12 localized `/business-card/` pages

**Files:**
- Modify: `Content/Pages/business-card.{de,ja,pt,zh,id,es,fr,ar,it,tr,ru,uk}.md`, same spots as Task 2.

- [ ] **Step 1: Before editing `it`, `tr`, `ru`, `uk`,** read `Scripts/{italian,turkish,russian,ukrainian}-style-guide.md`.
- [ ] **Step 2: Translate the approved copy** into each locale with its target phrase (Global Constraints). Keep each locale's existing `title:` unless the EN pick changed its meaning (e.g. adding "Free"); then add the native word for free.
- [ ] **Step 3: Build and check every locale**

Run:
```bash
swift run Site build && python3 - <<'EOF'
import re
for l in 'de ja pt zh id es fr ar it tr ru uk'.split():
    h=open(f'_Site/{l}/business-card/index.html').read()
    t=re.search(r'<title>(.*?)</title>',h).group(1)
    print(l, len(t), t, '|', re.sub(r'<[^>]+>','',re.search(r'<h1[^>]*>(.*?)</h1>',h).group(1)))
EOF
```
Expected: every locale prints its translated title and H1; Latin-script titles at most 60 characters, `ja`/`zh` at most ~30.

- [ ] **Step 4: Gates**, plus a look at `/ar/business-card/` and `/ja/business-card/` on `swift run Site serve`. Expected: all pass; RTL reads correctly.
- [ ] **Step 5: Commit**

```bash
git add Content/Pages/business-card.*.md
git commit -m "feat(site): the business card page says digital business card in every language"
```

### Task 4: App structured data on `/business-card/`

**Files:**
- Modify: `Sources/Site/StructuredData.swift` (add `businessCardPageGraph`; extend `softwareApplicationBusinessCard`)
- Modify: `Sources/Site/Renderers/MarketingPageRenderer.swift:73-81` (the `case "business-card":` branch)

**Interfaces:**
- Consumes: `StructuredData.softwareApplicationBusinessCard(baseURL:rating:reviews:)` (line 335), `AppRatings.businessCardIOS`, `faqItems(inHTML:)`.
- Produces: `static func businessCardPageGraph(baseURL: String, homePath: String, pageTitle: String, pagePath: String, rating: AppRating?, faq: [FAQItem]?) -> String`

- [ ] **Step 1: Implement.**
  - `businessCardPageGraph` returns one `@graph` with: the same BreadcrumbList `staticPageGraph` builds, the Business Card `SoftwareApplication` node, and the FAQPage node when `faq` is non-empty.
  - `softwareApplicationBusinessCard` changes: `name` becomes "NFC.cool Digital Business Card" (the App Store name since the rename); add `"@id":"\(baseURL)/business-card/#app"`; `offers` becomes an array of three `Offer`s: Free `0`, Personal `19.99`, Pro `49.99`, all `USD`, the paid two with `"priceSpecification":{"@type":"UnitPriceSpecification","price":…,"priceCurrency":"USD","billingDuration":"P1Y"}`. The home and reviews graphs pick this up unchanged.
  - The renderer branch calls `businessCardPageGraph` with `rating: context.…ratings.businessCardIOS` (use whatever accessor `landingGraph`'s caller uses for `AppRatings`).
- [ ] **Step 2: Build and verify every locale**

Run:
```bash
swift run Site build && python3 - <<'EOF'
import re, json
for l in ['']+[x+'/' for x in 'de ja pt zh id es fr ar it tr ru uk'.split()]:
    h=open(f'_Site/{l}business-card/index.html').read()
    g=[json.loads(s) for s in re.findall(r'<script type="application/ld\+json">(.*?)</script>',h,flags=re.S)]
    nodes=[n for x in g for n in x.get('@graph',[x])]
    app=[n for n in nodes if n.get('@type')=='SoftwareApplication']
    q=sum(len(n['mainEntity']) for n in nodes if n.get('@type')=='FAQPage')
    print(l or 'en', len(app), 'aggregateRating' in app[0], [o['price'] for o in app[0]['offers']], 'faq', q)
EOF
```
Expected: every line `1 True ['0', '19.99', '49.99'] faq 10`.

- [ ] **Step 3: Check the home and reviews graphs still parse:** run the same loop over `_Site/index.html` and `_Site/reviews/index.html`. Expected: the Business Card node there now has the new name and three offers.
- [ ] **Step 4: Commit**

```bash
git add Sources/Site/StructuredData.swift Sources/Site/Renderers/MarketingPageRenderer.swift
git commit -m "feat(site): the business card page carries the app, its plans and its rating as structured data"
```

### Task 5: Link texts that describe the page

**Files:**
- Modify: the 13 EN posts that link `/business-card/` (`grep -l "](/business-card/)" Content/Blog/*.md`) and each post's 12 siblings
- Modify: `Content/Data/Landing.yaml` and its 12 siblings (the "Business Card" links to `/business-card/`, not the Teams ones)
- Modify: `Content/Blog/2026-02-02-best-digital-business-card-apps-2026.md` line 225 ("read about the plans") and siblings

- [ ] **Step 1: List every anchor and its sentence**

```bash
grep -onE "\[[^]]+\]\(/business-card/\)" Content/Blog/*.md Content/Data/Landing*.yaml
```

- [ ] **Step 2: Propose the rewrites to Nico in one message:** for each EN link, current anchor, proposed anchor ("digital business card app", "NFC digital business card", "free digital business card", or keep), and the sentence it sits in. Target: about half descriptive, the rest brand. Keep the roundup's disclosure line 16 ("I build NFC.cool Business Card") as brand. Wait for approval.
- [ ] **Step 3: Apply the approved EN anchors, then the same links in every sibling** using the locale's target phrase, rewording the sentence where the phrase doesn't fit the existing grammar.
- [ ] **Step 4: Verify**

```bash
python3 - <<'EOF'
import re,glob,collections
c=collections.Counter()
for f in glob.glob('Content/Blog/*.md')+glob.glob('Content/Data/Landing*.yaml'):
    for a in re.findall(r'\[([^]]+)\]\(/business-card/\)',open(f).read()):
        c['brand' if re.search(r'NFC\.cool|^Business Card$',a) else 'descriptive']+=1
print(c)
EOF
```
Expected: `descriptive` at least 40% of the total. Then gates.

- [ ] **Step 5: Commit**

```bash
git add Content/Blog Content/Data/Landing*.yaml
git commit -m "feat(site): links to the business card page say what it is, in every language"
```

### Task 6: Ship check

- [ ] **Step 1:** `swift run Site serve`, open `/business-card/`, `/de/business-card/`, `/ja/business-card/`, `/ar/business-card/`, the home page and the roundup; confirm new sections render with the page's styling and links resolve.
- [ ] **Step 2:** Push the branch and open a PR. After deploy, Nico runs Google's Rich Results Test on `https://nfc.cool/business-card/` (expects Software App with rating, FAQ, Breadcrumbs) and requests indexing in Search Console URL Inspection for `/business-card/` and `/de/business-card/`.

## Approved copy

Picked by Nico on 2026-11-11:

- Title: "Free Digital Business Card App with NFC & QR"
- Description: "Make a free digital business card on your phone. Share it with an NFC tap, a QR code, App Clip or Apple Wallet, and see how many people save you."
- H1: "Digital Business Card App"; under it: "NFC.cool Business Card puts your card on your phone, for individuals and teams. Share it with an NFC tap or a QR code, and see how many people save it."
- Sections and headings: as drafted in Task 1 (What Is a Digital Business Card? / How to Make Your Digital Business Card / NFC or QR?; Who It's For -> A Digital Business Card for Every Job, Pricing -> Digital Business Card Pricing, Complete Feature Set -> Everything the Digital Business Card App Does, What teams add -> Digital Business Cards for Teams).
