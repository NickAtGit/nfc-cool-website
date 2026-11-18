# Pages Product Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship an unlisted English `/business-card/pages/` page in the Teams page's style, with region-aware prices shared by every Business Card pricing page, `?make=page` store forwarding and five new `bc-scenes` scenes.

**Architecture:** One price data file (`Content/StaticFiles/prices/prices.json`) feeds both a build-time `{{PRICE:…}}` token (Swift, writes the no-JS default into a `<span data-price>`) and a browser module (`prices.mjs`) that rewrites those spans for the visitor's region. The page is a Markdown marketing page like `business-card-teams.md`; the scenes are new entries in the code-built `bc-scenes.mjs`.

**Tech Stack:** Swift 6.2 / SiteKit (build), plain ES modules + `node --test` (prices, forwarding, AASA), three.js r186 in `bc-scenes.mjs` (scenes), `Scripts/scenes/render-poster.mjs` (stills).

**Spec:** `docs/superpowers/specs/2026-11-18-pages-product-page-design.md`

## Global Constraints

- Plan levels are named **Page, Page Plus, Page Pro**. Never "Page Ordering".
- No em or en dashes, no decorative emojis, English titles in Title Case.
- Every feature sentence, FAQ answer and pricing-table row on the Pages page is checked against `~/Developer/business_card_service-page-tab` (`feat/page-tab`) before it ships.
- Copy is settled with Nico through options before it ships (H1, hero paragraph, section titles).
- Prices: page levels tier A EUR 4.99 / 49.99, 14.99 / 149.99, 39.99 / 399.99; B = 70%, C = 40% of A, team page = 80%, each rounded down to a price ending in 9 (`charm`); seats USD 5 / 50, B 3.50 / 35, C 2 / 20; same numerals in EUR, USD, GBP.
- `/business-card/pages/` stays `noindex`, out of the sitemap and linked from no nfc.cool page.
- Scenes: floating real objects, no stage or set; restrained motion, no overshoot; a different movement per scene; real screenshots, not mock-ups.
- Nothing in the service or the apps changes.

## Review Focus

1. **A visitor with no region in `navigator.language`** (`en`, `de`) sees the no-JS default (tier A, base currency), never a blank or `NaN` price. Test in Task 1.
2. **A country in a tier but outside every currency map** (Brazil, India, Switzerland) gets the cheaper tier in the product's base currency, exactly as `guess_currency` does. Test in Task 1.
3. **Localized Teams and Business Card pages** keep their own number format after the swap (`de`: `4,99 €`, `ar`: Eastern Arabic digits like the rest of the page). Test in Task 1 (`formatPrice` with `de`, `ar`), checked in the built page in Task 3.
4. **The competitor comparison table on Teams** stays in the dollars each vendor listed. Mixing currencies would make it false. Test in Task 3 (no `data-price` inside that table).
5. **`?make=page` on a desktop, or opened by a crawler** stays on the page; only iOS and Android forward. Test in Task 5.

---

### Task 1: Price data and the browser module

**Files:**
- Create: `Content/StaticFiles/prices/prices.json`
- Create: `Content/StaticFiles/prices/prices.mjs`
- Test: `Scripts/prices/tests/prices.test.mjs`

**Interfaces:**
- Produces `prices.json`:
  ```json
  { "_source": "business_card_service web/page_plan/tiers.py, read 2026-11-18. Change both together.",
    "products": ["page","team_page","page_pro","team_page_pro","page_ordering","team_page_ordering","seat"],
    "baseCurrency": { "<product>": "eur" | "usd" },
    "amounts": { "<product>": { "A"|"B"|"C": { "month": "4.99", "year": "49.99" } } },
    "tierByCountry": { "PT": "B", "IN": "C", "...": "..." },
    "currencyByCountry": { "GB": "gbp", "US": "usd", "DE": "eur", "...": "..." } }
  ```
  Product keys are the service's (`page_pro` is Page Plus, `page_ordering` is Page Pro: the service kept the old keys). Copy `_TIER_B`, `_TIER_C` and `_CURRENCY_BY_COUNTRY` verbatim from `tiers.py`.
- Produces `prices.mjs` exports:
  - `countryFromLanguage(lang: string): string | null`: the region subtag (`de-AT` → `AT`), else `null`. No language-to-country guessing; this matches the service's `guess_country`.
  - `tierFor(data, country: string | null): 'A'|'B'|'C'`
  - `currencyFor(data, product: string, country: string | null): 'eur'|'usd'|'gbp'`
  - `priceFor(data, product, interval: 'month'|'year'|'saving', country, quantity = 1): { amount: number, currency: string }`. `saving` = month × 12 − year.
  - `formatPrice(amount: number, currency: string, locale: string): string` via `Intl.NumberFormat(locale, { style: 'currency', currency, minimumFractionDigits: whole ? 0 : 2 })`.
  - `applyRegionPrices(root: Document, data, lang: string): void` rewrites every `[data-price]` (attributes `data-price`, `data-interval`, optional `data-quantity`) using `document.documentElement.lang` as the format locale. It runs on load when `document` exists: it fetches `/prices/prices.json` and uses `navigator.language`.

- [ ] **Step 1: Write the failing tests** in `Scripts/prices/tests/prices.test.mjs`:
  - `amounts follow the service rules`: for each page level product, B and C equal `charm(A × 0.7)` / `charm(A × 0.4)`, and each `team_*` tier equals `charm(own × 0.8)`. `charm(x)` = highest x.x9 not above x. Pin `page.B.month === "3.49"`, `page.C.month === "1.99"`, `team_page.A.month === "3.99"`, `page_pro.A.month === "14.99"`, `page_ordering.A.year === "399.99"`, `seat.B.year === "35.00"`.
  - `countryFromLanguage`: `de-AT`→`AT`, `pt_BR`→`BR`, `en`→`null`, `''`→`null`.
  - `tierFor`: `PT`→B, `ES`→A, `IT`→A, `IN`→C, `null`→A.
  - `currencyFor`: (`page`,`CH`)→eur, (`seat`,`CH`)→usd, (`seat`,`DE`)→eur, (`page`,`GB`)→gbp, (`page`,`US`)→usd, (`page`,`BR`)→eur, (`page`,`null`)→eur.
  - `priceFor`: (`page`,`month`,`PT`)→`{amount:3.49,currency:'eur'}`; (`seat`,`year`,`US`,2)→`{amount:100,currency:'usd'}`; (`seat`,`saving`,`US`)→`{amount:10,currency:'usd'}`.
  - `formatPrice`: (4.99,`eur`,`en`)→`€4.99`; (50,`usd`,`en`)→`$50`; (4.99,`eur`,`de`) matches `/^4,99\s€$/`; (4.99,`eur`,`ar`) contains no ASCII digit.

- [ ] **Step 2: Run** `node --test "Scripts/prices/tests/*.test.mjs"`. Expected: FAIL (module not found).
- [ ] **Step 3: Write `prices.json`** with the amounts from Global Constraints and the country maps from `tiers.py`.
- [ ] **Step 4: Implement `prices.mjs`** with the exports above. No dependencies.
- [ ] **Step 5: Run the tests.** Expected: PASS.
- [ ] **Step 6: Add the test command** to AGENTS.md's "Build & serve" block (`node --test "Scripts/prices/tests/*.test.mjs"   # region-aware prices: data matches the service, region, format`). Add a sitemap-table line for `/prices/`.
- [ ] **Step 7: Commit** `feat(prices): one price table with the service's tiers and currencies, and a module that shows the visitor's own`.

### Task 2: `{{PRICE:…}}` at build time, and loading the module

**Files:**
- Create: `Sources/Site/Helpers/PriceToken.swift`
- Create: `Sources/Site/Processors/RegionPriceScriptProcessor.swift`
- Modify: `Sources/Site/Renderers/MarketingPageRenderer.swift:202-203` (resolve after pricing tables and the team button)
- Modify: `Sources/Site/Main.swift` (register the processor next to `LiveSceneScriptProcessor`)
- Test: `Scripts/prices/tests/built-pages.test.mjs`

**Interfaces:**
- Consumes `prices.json` (Task 1).
- Produces the token `{{PRICE:<product>:<interval>}}` or `{{PRICE:<product>:<interval>:<quantity>}}`, usable in page Markdown and in pricing YAML cells (it is resolved after the table is inserted, so `markCell` passes it through as text). It becomes `<span class="price" data-price="<product>" data-interval="<interval>"[ data-quantity="n"]>DEFAULT</span>`. DEFAULT is tier A in the product's base currency, formatted for the page's locale the way `formatPrice` does (symbol, whole amounts without decimals). An unknown product or interval fails the build with the page path.
- `enum PriceToken { static func resolveTokens(in html: String, locale: String, context: BuildContext) throws -> String }`
- The processor inserts `<script type="module" src="/prices/prices.mjs"></script>` before `</body>` on any page containing ` data-price="`.

- [ ] **Step 1: Write the failing test** `built-pages.test.mjs`. It skips when `_Site/` is missing. Otherwise it reads `_Site/business-card/teams/index.html` and `_Site/de/business-card/teams/index.html` and asserts:
  - each has at least one `data-price="seat"` span;
  - each loads `/prices/prices.mjs` exactly once;
  - no literal `{{PRICE:` is left anywhere in `_Site/**/*.html`.
- [ ] **Step 2: Run** `swift run Site build && node --test Scripts/prices/tests/built-pages.test.mjs`. Expected: FAIL (no spans yet; Task 3 adds the tokens, so this test turns green there).
- [ ] **Step 3: Implement `PriceToken` and the processor;** wire both in.
- [ ] **Step 4: Temporarily add `{{PRICE:seat:year}}` to `business-card-teams.md`,** build, and check the span and script appear. Revert the line.
- [ ] **Step 5: Commit** `feat(prices): {{PRICE:…}} writes the default price, and pages with one load the region module`.

### Task 3: Teams and Business Card pages use region-aware prices

**Files:**
- Modify: `Content/Pages/business-card-teams{,.<lang>}.md` (13 files)
- Modify: `Content/Pages/business-card{,.<lang>}.md` (13 files)
- Modify: `Content/Data/Pricing/business-card{,.<lang>}.yaml` (13 files, Team column only)
- Test: `Scripts/prices/tests/built-pages.test.mjs` (extend)

**Interfaces:** Consumes the `{{PRICE:…}}` token (Task 2).

- [ ] **Step 1: Extend the test.** In every locale's Teams page, the `.feature-pricing-table` that follows "How the Price Compares" contains no `data-price` (Review Focus 4). No built Teams or Business Card page in any locale contains "same number" or its translations. Grep each locale's current sentence first and list them in the test.
- [ ] **Step 2: Run it.** Expected: FAIL.
- [ ] **Step 3: Replace every web-sold seat price** in the 26 pages and the 13 Team-column cells with tokens: `$50` → `{{PRICE:seat:year}}`, `$5` → `{{PRICE:seat:month}}`, `$100` → `{{PRICE:seat:year:2}}`, `$10 a month` → `{{PRICE:seat:month:2}}`, "saves $10" → `{{PRICE:seat:saving}}`. Delete the "in euros, the team price is the same number" sentence in each locale, keeping the grammar of what remains. Leave store-sold prices (Personal, Pro) and the competitor table unchanged.
- [ ] **Step 4: Run** `swift run Site i18n-check`, the four language lints, `swift run Site build`, then both test files. Expected: 0 errors, PASS.
- [ ] **Step 5: Check in a browser** (`swift run Site serve`): `/business-card/teams/` with the browser language set to `pt-PT` shows €35 a year; `/de/business-card/teams/` with `de-DE` shows `50 €`; `/ar/…` keeps Eastern Arabic digits.
- [ ] **Step 6: Commit** `feat(business-card): team prices in the visitor's currency and tier, in every language`.

### Task 4: The Pages page, unlisted

**Files:**
- Create: `Content/Pages/business-card-pages.md`
- Create: `Content/Data/Pricing/business-card-pages.yaml`
- Modify: `i18n.yaml` (`enOnly.files`: both files)
- Modify: `Sources/Site/Renderers/MarketingPageRenderer.swift:23` (`unlistedSlugs` gains `"business-card/pages"`)
- Modify: `Sources/Site/Processors/SmartAppBannerProcessor.swift:43` only if `/business-card/pages/` is not already covered by its `/business-card/` match (it is: confirm, don't change)
- Test: `Scripts/prices/tests/built-pages.test.mjs` (extend)

**Interfaces:** Consumes `{{PRICE:…}}` (Task 2), `{{PRICING_TABLE:business-card-pages}}`, and the scene keys from Task 6 (`bc/page`, `bc/page-food`, `bc/page-booking`, `bc/page-shop`, `bc/page-requests`). Until Task 6 lands, use any existing poster path so the build passes.

- [ ] **Step 1: Verify the facts.** From `feat/page-tab` (`web/page_plan/`, `web/blocks/`, the funnel and onboarding specs), write down in a scratch note what Free, Page, Page Plus and Page Pro each unlock, the trial (14 days, web, card required, once per person), the 7-day hold of a free page's request, App Clip behaviour, own domain (yes or no), and cancel behaviour. Every later sentence cites one line of this note.
- [ ] **Step 2: Bring Nico copy options.** Use AskUserQuestion: two or three options each for the H1, the hero paragraph and the section titles (How It Works, By Kind of Business, Requests in the App, What It Costs, FAQ). Wait for the picks.
- [ ] **Step 3: Write the failing test.** `_Site/business-card/pages/index.html` exists, has `<meta name="robots" content="noindex, follow"/>`, is absent from every `_Site/sitemap*.xml` and from `_Site/llms.txt`, and is linked from no other `_Site/**/*.html`. Its pricing table has 4 columns `Free`, `Page`, `Page Plus`, `Page Pro` and `data-price="page"`, `"page_pro"`, `"page_ordering"` spans. It has the web link `https://business.nfc.cool/org/start/page/` (confirm the host in the service's `ALLOWED_HOSTS` and routes). No `Page Ordering` text anywhere.
- [ ] **Step 4: Run it.** Expected: FAIL.
- [ ] **Step 5: Write the page and the YAML** in the spec's section order, with the picked copy, `{{PRICE:…}}` for every web price, the store badges copied from `business-card.md:20-26` with `ct=web-business-card-pages-en` / `utm_campaign%3Dweb-business-card-pages-en`, and the team-pages FAQ answer using `{{PRICE:team_page:month}}`. Add both files to `enOnly` and the slug to `unlistedSlugs`. If `llms.txt` or `Scripts/indexnow.py` lists the page, exclude unlisted slugs there the way `FeatureSitemapDataAdapter.swift:42` does.
- [ ] **Step 6: Run** `swift run Site i18n-check`, the build and the tests. Expected: PASS.
- [ ] **Step 7: Commit** `feat(pages): /business-card/pages/, unlisted until Pages launches`.

### Task 5: `?make=page` forwarding and the universal links

**Files:**
- Create: `Content/StaticFiles/pages/make-page.mjs`
- Modify: `Content/Pages/business-card-pages.md` (load it with `<script type="module" src="/pages/make-page.mjs"></script>`)
- Modify: `Content/StaticFiles/.well-known/apple-app-site-association`
- Test: `Scripts/pages/tests/make-page.test.mjs`, `Scripts/fidget/tests/aasa.test.mjs` (extend)

**Interfaces:**
- `make-page.mjs` exports `forwardTarget(search: string, userAgent: string): string | null`:
  - without `make=page` → `null`;
  - iPhone or iPad UA → `https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=make-page&mt=8`;
  - Android UA → `https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=make%3Dpage`;
  - anything else (desktop, bots) → `null`.
  On load it calls `location.replace` with the target when it isn't `null`.
- AASA: the Tools entry gains `"NOT /business-card/pages"` and `"NOT /business-card/pages/*"` before `"/*"`. A new Business Card entry `{ "appID": "FMXL9R3NPC.io.stanc.DigitalBusinessCardApp", "paths": ["/business-card/pages", "/business-card/pages/*"] }` comes before the Tools entry. The app lists `applinks:nfc.cool` (checked 2026-11-18).

- [ ] **Step 1: Write the failing tests.** `forwardTarget` cases: (`?make=page`, iPhone Safari UA) → App Store URL; (`?make=page`, Pixel Chrome UA) → Play URL with `referrer=make%3Dpage`; (`?make=page`, macOS Safari UA) → `null`; (`?make=page`, Googlebot UA) → `null`; (`''`, iPhone UA) → `null`. AASA: `/business-card/pages/` is claimed by the Business Card app and not by Tools; `/business-card/` is still claimed by Tools; the `/fidget/` test still passes. Extend `claims(path)` to return the claiming `appID`.
- [ ] **Step 2: Run** `node --test "Scripts/pages/tests/*.test.mjs" "Scripts/fidget/tests/aasa.test.mjs"`. Expected: FAIL.
- [ ] **Step 3: Implement both.**
- [ ] **Step 4: Run the tests.** Expected: PASS. Add the new test command to AGENTS.md.
- [ ] **Step 5: Commit** `feat(pages): ?make=page forwards to the Business Card app's store page; nfc.cool hands /business-card/pages/ to that app`.

### Task 6: Five scenes and their stills

**Files:**
- Modify: `Content/StaticFiles/scenes/bc/bc-scenes.mjs` (add `SCENES['page']`, `['page-food']`, `['page-booking']`, `['page-shop']`, `['page-requests']`, plus their `IMAGES_FOR` / `PROPS_FOR` entries)
- Create: screen images in `Content/StaticFiles/scenes/bc/s/` (real captures from `feat/page-tab`: local pages at `mycard` dev server or the simulator), named `page-*.webp`
- Create: stills `Content/StaticFiles/scenes/bc/p/page*.webp` (+ `-light` where the Teams scenes have one)
- Modify: `Content/Pages/business-card-pages.md` (point each `<img data-scene>` at its key and still)

**Interfaces:** Each scene follows the existing contract in `build()` (`bc-scenes.mjs:3478`): returns `{ scene, camera, root, dur, update(t) }` and is a pure function of `t`.

- [ ] **Step 1: Capture the screens:** a styled café page, a menu page, the booking sheet with a time picked, a quote reply with a price, and the owner's Requests list. Each is 1206 px wide WebP at quality 92, like the other `bc/s` screens.
- [ ] **Step 2: Build `page`** (hero): a phone with the café page scrolling slowly; a booking notification slides in at the top. Check it with `swift run Site serve`.
- [ ] **Step 3: Build `page-food`, `page-booking`, `page-shop`, `page-requests`**, each with a different movement, following the table in the spec. Check each one.
- [ ] **Step 4: Render the stills** with `node Scripts/scenes/render-poster.mjs http://localhost:8080/business-card/pages/ <out.webp>` for each (light mode). Set `data-poster-frame` to the frame you rendered.
- [ ] **Step 5: Show Nico** the five scenes (a GIF or screenshots) and adjust until he approves.
- [ ] **Step 6: Run** `node --test "Scripts/scenes/tests/*.test.mjs"` and the build. Expected: PASS.
- [ ] **Step 7: Commit** `feat(pages): five live scenes for the Pages page`.

### Task 7: Final check

- [ ] **Step 1:** Run all gates: `swift run Site i18n-check`, the four language lints with `--selftest`, every `node --test` suite in AGENTS.md, and `swift run Site build`. Expected: all green.
- [ ] **Step 2:** In the browser, check `/business-card/pages/` in light and dark mode, at 375 px wide, and with reduced motion (stills stay). Open `?make=page` on desktop: it must not forward.
- [ ] **Step 3:** Update AGENTS.md's sitemap table (a `/business-card/pages/` row: unlisted, EN-only, `?make=page`) and the launch checklist from the spec under "Tasks still on the punch-list".
- [ ] **Step 4: Commit** `docs: /business-card/pages/ and region-aware prices in AGENTS.md`.
