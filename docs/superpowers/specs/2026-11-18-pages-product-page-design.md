# Pages product page: /business-card/pages/

2026-11-18. Status: written for Nico's approval, not built. Decisions are Nico's (asked one by one
on 2026-11-18) unless marked *my call*.

## Why

Nico wants affiliate (partner) pages that recruit people to sell Business Card for Teams and Pages.
Pages has no page on nfc.cool yet, so a partner page would have nothing to point at. This page comes
first; the Pages partner page and the Teams partner page follow, each in its own design.

Pages is the **Page** tab of the NFC.cool Business Card app (server branch `feat/page-tab` in
`~/Developer/business_card_service-page-tab`): a business builds a page from its website, Google
listing or Instagram, or from scratch, picks a style, and shares it by NFC tag, QR code or link at
`mycard.nfc.cool/<username>/…`. Visitors book, ask for a quote, send a message or order at the
table; the owner answers in the app.

Success: a local business owner who lands here understands in one screen what a page does for them,
sees what each plan costs, and installs the app (or starts on the web). A partner can send a shop
owner here and the page does the selling.

## Goals

- One English page at `/business-card/pages/`, in the same style as `/business-card/teams/`.
- Speaks to **local business owners**: cafés, restaurants, bars, salons, practices, shops.
- Main call to action: **App Store and Google Play badges**, with a smaller **"or start on the
  web"** link under them.
- A **pricing table with four columns: Free, Page, Page Plus, Page Pro.**
- A **live 3D hero scene**, new, in the `bc-scenes.mjs` family.
- Sections: **How It Works** (three steps), **By Kind of Business**, **Requests in the App**,
  **What It Costs** (the table), **FAQ**, final call to action.
- **Live now but unlisted:** deployed, `noindex`, out of the sitemap, in no nav and linked from no
  page on nfc.cool, until Pages launches in the apps.
- **It is the "pages landing page" of the onboarding spec** (`2026-11-15-page-onboarding-design.md`,
  line 180): a free page's "Made with NFC.cool" link opens it with `?make=page`, and it forwards
  to the store (Nico, 2026-11-18: build it in now). See "?make=page" below.
- **Region-aware prices on every pricing page:** Pages, `/business-card/` and
  `/business-card/teams/` show the visitor's currency and price tier (Nico, 2026-11-18). See
  "Region-aware prices" below.

## Non-goals

- Translations. English only for now; the twelve siblings come once the copy has settled.
- The two partner pages (next designs).
- A competitor price comparison like the Teams page has.
- Partner credit on this page. Partners keep using their own link (`mycard.nfc.cool/r/<code>/`);
  the Pages partner page decides how they send people (Nico, 2026-11-18).
- Changes to the service or the apps. The service's footer link change to
  `…/business-card/pages/?make=page` belongs to the service's onboarding plan; this build only makes
  the target ready.

## Anti-goals

- A claim the product does not keep. Every feature sentence and every pricing-table row is checked
  against the code on `feat/page-tab` before it ships (memory: verify feature claims first).
- The legacy plan names. The levels are **Page, Page Plus, Page Pro**; "Page Ordering" and the
  middle "Page Pro" in the 2026-11-15 spec are legacy (Nico, 2026-11-18).
- A page that turns up in search, or a nav link that points at a feature that is not out yet.
- Em or en dashes, decorative emojis; English titles in Title Case.

## Approaches

| | What | Trade-off |
| --- | --- | --- |
| **A. Mirror the Teams page (picked)** | Markdown page through `MarketingPageRenderer`, `{{PRICING_TABLE:…}}` with a new pricing YAML, the existing store-badge and feature-row markup, and new scenes in `bc-scenes.mjs` | Almost everything exists; restyling the Business Card pages restyles this one too. The scenes are new work. |
| B. Same page, hero built in Blender (nfctags-style package) | Phone, NFC table tag and QR stand as a GLB + manifest | More distinctive, days of scene work, and floating-objects-only limits the table setting |
| C. A YAML-driven renderer like the feature pages | Structured data, typed renderer | Only gain is easier translation later; Markdown pages translate fine (Teams proves it). Dropped. |

Nico: "same style but new content and 3D", so A, with new scenes rather than reused ones.

## The page

Files:

- `Content/Pages/business-card-pages.md`, frontmatter slug `business-card/pages`, title and
  description written for local business owners. *My call:* OG image reuses
  `og-business-card.webp` until there is a Pages one.
- `Content/Data/Pricing/business-card-pages.yaml`, rendered by `{{PRICING_TABLE:business-card-pages}}`.
- Both listed under `enOnly` in `i18n.yaml`, so `i18n-check` stays green and localized URLs get the
  English fallback redirect.
- Unlisted: `business-card/pages` added to `MarketingPageRenderer.unlistedSlugs` (stamps
  `noindex, follow`; `FeatureSitemapDataAdapter` keeps it out of the sitemap). Check that
  `/llms.txt` and IndexNow skip it too; if not, make them.

Order, top to bottom (structure as in `business-card-teams.md`):

1. **Hero.** H1 along the lines of "A Page for Your Business" (copy settled with Nico, see below),
   one paragraph, the two store badges (the Business Card app), then a small link "or start on the
   web" to `https://business.nfc.cool/org/start/page/` (confirm the host from the service's routes).
   It links there now and returns 404 until the service ships Pages to production; Nico accepted that
   (2026-11-18). Visual: the `bc/page` scene (below), boxed like the Teams hero.
2. **How It Works.** Three `page-card`s: read your website, Google listing or Instagram (or start
   from scratch); pick a style for your kind of business; share it by NFC tag, QR code or link.
   *My call:* cards, no scenes; this section is quick to read.
3. **By Kind of Business.** Alternating `feature-subsection` rows, each with its own scene and the
   plan it needs as a pill (as the Business Card page does):
   - Cafés, restaurants and bars: menus (menu block, import, PDFs, allergen tags) and table
     ordering with NFC tags and QR codes on the tables, staff and tablet screens. **Page Pro.**
   - Salons, practices and studios: visitors ask for a time inside the booking hours. **Page Plus.**
   - Shops and services: quotes and messages, the page's App Clip card. **Page.**
   *My call:* three rows; which businesses are named comes from the 12 styles and 55 recipes.
4. **Requests in the App.** One feature row with a scene: bookings, quotes and messages arrive in
   the Page tab with a push notification; the owner confirms, offers another time, sends a price or
   a message, and the visitor gets it by e-mail (and by push from the App Clip).
5. **What It Costs.** One line on the 14-day trial on the web (card required, once per person),
   then the table. Columns `Free`, `Page`, `Page Plus`, `Page Pro`; rows built from what
   `web/page_plan` actually gates, at minimum: price (month and year), the page live with its blocks
   and menus, "Made with NFC.cool" removed, booking, table ordering and tables, what a free page does
   with a request (held 7 days until a plan covers it), where to buy. A line under it: one plan per
   page, each level includes the one below. Prices are region-aware (below). *My call:* team
   pages get one FAQ answer: a team's pages go on the team's bill at 20% less per level, with a
   link to `/business-card/teams/`. The "one plan per page" wording must not contradict that.
6. **FAQ.** At least: what is a page and how it differs from a business card; do customers need an
   app (App Clip on iPhone, browser elsewhere); what's free; how the trial works; app vs web
   billing; do I need NFC tags (no: QR and link work; any writable tag does); can I use my own
   domain (only if the code says so); what happens if I cancel. Each answer checked against the code.
7. **Final call to action.** Store badges again, "or start on the web".

## ?make=page

When the page opens with `?make=page` (from a free page's "Made with NFC.cool" link):

- On iPhone and iPad it forwards to the Business Card app's App Store page, and on Android to its
  Play page with the `referrer` the onboarding spec defines (read it there; carry whatever code it
  passes). On a computer it stays on the page and shows the badges.
- If the Business Card app is installed, the onboarding spec expects a universal link to open the
  app at step 2. Today nfc.cool's `apple-app-site-association` gives NFC.cool **Tools** `/*`, so a
  tap on `/business-card/pages/` from another site can open Tools on an iPhone that has it. In this
  build: add `NOT /business-card/pages` and `NOT /business-card/pages/*` to the Tools entry, and a
  Business Card entry (`FMXL9R3NPC.io.stanc.DigitalBusinessCardApp`) claiming `/business-card/pages/*`
  **only if** the app's entitlements list `applinks:nfc.cool` (check
  `~/Developer/DigitalBusinessCardApp` on `feat/page-tab`). If they don't, the forwarding above is
  the whole path, and the app-side entitlement is a note for the onboarding plan.
- Without JS, or for a crawler, nothing happens: the page renders as usual.

## Region-aware prices

One mechanism, used by every pricing table and price line on `/business-card/pages/`,
`/business-card/` and `/business-card/teams/`:

- The visitor's region comes from the browser, the way `theme.js` already picks the Amazon store
  (`navigator.language`, line 340). No server, no IP lookup.
- **Currency:** EUR for the euro area, GBP for the UK, USD everywhere else (the service's
  `CURRENCIES`). **Tier:** A, B or C by country, from the same country lists as `web/page_plan/tiers.py`.
  The builder finds where those lists live and how to keep the site in sync with them, for example
  a data file generated from the service, or copied with a comment that names the source. Pages and
  team prices follow the service's rules: the same numerals in every currency, B and C at 70% and 40%
  of A rounded down to a 9, and team pages 20% less.
- **Store-sold plans** (Business Card Free, Personal, Pro; Pages bought in the app) are App Store and
  Play price points, which are not the web numbers. *My call:* they show the per-region amount
  only where the site has a reliable source for it (from the apps' paywall configuration or App
  Store Connect, see memory "Feature tables mirror the paywall"). Without one, they show the US
  amount with a line that the app shows the price in your currency.
- **No JS:** the HTML carries the default (USD, tier A, as the pages do today). The script swaps in
  the visitor's amounts, so crawlers and screen readers see a coherent default.
- Wherever a page says "in euros it is the same number", that sentence goes; the page now shows the
  visitor's own currency.

## The 3D scenes

New scenes in `Content/StaticFiles/scenes/bc/bc-scenes.mjs`, built in code like the others (a pure
function of loop time), using the shared phone GLB and screen images, each with a poster still in
`Content/StaticFiles/scenes/bc/p/` (light and dark where the others have both):

| Key | Where | What it shows |
| --- | --- | --- |
| `bc/page` | Hero | A phone with a styled café page scrolling gently; a booking request arrives as a notification |
| `bc/page-food` | Restaurants row | A menu page on a phone beside an NFC table tag; an order comes in |
| `bc/page-booking` | Salons row | A booking sheet, a time picked, the request sent |
| `bc/page-shop` | Shops row | A quote request answered with a price |
| `bc/page-requests` | Requests row | The owner's Requests list, a reply going out as an e-mail |

Rules that hold (memory): floating real objects on the transparent page, no stage or set; restrained
motion, no overshoot, a different movement in each scene. The screens are real page and app
screenshots from `feat/page-tab` (local pages or the simulator), not drawn mock-ups.

*My call:* five scenes, matching the Teams page's one-scene-per-row rhythm. If that is too much
work up front, the hero ships first and the rows ship with their poster stills only.

## Copy

Marketing copy is settled with Nico through options before it ships (memory). The builder drafts
each section's copy from the verified facts and brings two or three options for the H1, the hero
paragraph and the section titles; the rest follows his picks.

## Launch (later, not part of this build)

When Pages ships in the apps: check `/org/start/page/` answers in production, remove the slug from `unlistedSlugs`, add the nav item "Pages" next
to "Teams" in `SiteConfig.yaml` (every locale's nav, pointing at the EN page until translated),
link it from `/business-card/`, `/business-card/teams/` and the home page, then translate.

## Left to the builder

The scenes' exact choreography and timing; poster frames; which screenshots to capture; the
pricing table's exact row labels; how the "or start on the web" link is styled; the frontmatter
copy. Verify `swift run Site build`, `i18n-check` and the scene tests pass, and spot-check the page
in light and dark mode, at phone width, with reduced motion.
