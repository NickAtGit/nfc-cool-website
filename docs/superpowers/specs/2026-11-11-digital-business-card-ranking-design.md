# Ranking for "Digital Business Card" - Design

Date: 2026-11-11. Status: awaiting approval.

## Intent

Nico wants `https://nfc.cool/business-card/` in the top 3 for "digital business card".
Today it barely ranks: queries containing "business card" brought 87 clicks in three
months, and 81% of those impressions go to the roundup post
`/blog/best-digital-business-card-apps-2026/` (position 7.2), not to the product page
(source: `~/Developer/business_card_service/reports/NFC cool web and AI visibility.md`,
measured 2026-11-05; read it, it is the evidence base for this design).

The top results for the bare phrase (Blinq, HiHello, Uniqode, Vistaprint, Wikipedia) explain
what a digital business card is and let you **make one right away, free, on the web**.
NFC.cool sends the visitor to an app store. So the plan has three parts:

1. **Site SEO** - make `/business-card/` match the query and send it our own authority.
2. **Web card maker** - make a free card on the web in under a minute, using the
   provisional accounts the app already uses.
3. **Off-site** - links and listings, mostly done by Nico personally.

Honest expectation: the top 3 for the bare English phrase is the long goal. The near-term
top 3 targets are the narrower phrases ("digital business card app iPhone", "NFC digital
business card", "digitale Visitenkarte App") and the other locales.

## Goals

- `/business-card/` (every locale) is the page Google picks for "digital business card" and
  its close variants, not the roundup post.
- A visitor can make a working, shareable card on the web without installing anything.
- Every web-made card is a route into the app (analytics, leads, paid plans) or into Team.

## Non-goals

- Selling Personal or Pro on the web. Those stay in-app purchases (Nico's decision).
- Analytics or leads on the web for personal cards. They stay in the app; the web shows
  nudges in their place (Nico's decision).
- Writing NFC tags from the browser.
- Changing how the app's own provisional flow behaves.
- Rewriting the home page around cards. It earns about 4.3k clicks a quarter on NFC terms
  (report, "Reader traffic" section); one pointer line is enough.

## Anti-goals (a failure even if it technically works)

- A web maker that floods the server with throwaway or spam cards.
- Keyword-stuffed copy. House style still applies: first-person or plain, no em/en dashes,
  no emojis, Title Case for English headings, native quotes per locale, each locale's lint.
- Paid or reciprocal links, or adding a product to the roundup in exchange for a mention
  (Google link-spam policy; the post is titled "Honest Comparison").
- Claims the product doesn't back. Verify every feature claim against the apps and server.

## Constraints

- Static site on GitHub Pages (this repo). Anything dynamic calls `business_card_service`
  cross-origin (its CORS list is `CORS_ALLOWED_ORIGINS` in `web/app/settings.py`).
- 13 locales; `swift run Site i18n-check` and the it/tr/ru/uk lints must pass.
- Marketing copy is settled with Nico by offering 2-3 worded options, never written alone.
- Provisional accounts (`web/custom_account/services/provisional.py`): a card is live
  for `LIFETIME` = 24 h, then answers 410 but can still be claimed for `GRACE` = 7 days, then
  is purged. Claim by email, Apple or Google already exists (`/api/v2/provisional-claim*/`).
  Provisional cards are already kept out of the card sitemap.
- `POST /api/v2/provisional-sign-up/` requires `HasAPIKey` (the app's key). A public web
  page cannot hold that key, so the web needs its own sign-up door.

## Part 1: Site SEO (this repo)

Already done, don't redo: the roundup post corrected and Team added, `/business-card/teams/`
published (commit `2d27dc5`), App Store app renamed "NFC.cool Digital Business Card" with its
website set to `https://nfc.cool/business-card/`, and the free-card "Made with" badge on card
pages already linking to `/business-card/`.

1. **Title and meta description** of `/business-card/` in every locale: lead with the phrase
   and "Free" (the Free plan is real: one card, NFC/QR/link sharing, Save Contact, Conference
   Mode's QR). Example to start the options from: "Free Digital Business Card App with NFC &
   QR | NFC.cool". DE already says "Digitale Visitenkarte"; check every locale says its
   native phrase, not English "Business Card".
2. **H1**: today it is the brand ("NFC.cool Digital Business Card"). Make the phrase lead.
3. **New body sections near the top**, in plain prose (the page is mostly feature tiles today
   and uses the phrase almost never in body text):
   - "What Is a Digital Business Card?" (~80 words).
   - "How to Make Your Digital Business Card" in 3 steps, ending in the web maker (Part 2).
   - "NFC or QR?" short, linking to `/blog/nfc-business-card-vs-qr-code/`.
4. **Section headings that carry the phrase**: "Who It's For", "Pricing", "Complete Feature
   Set" become phrase-bearing variants.
5. **Structured data**: add `SoftwareApplication` / `MobileApplication` JSON-LD for the
   Business Card app with `aggregateRating`, offers (Free, Personal, Pro) and both stores.
   Use the rating source the home and reviews graphs already use for their Business Card
   node (`AppRatings`, `ratings.businessCardIOS`) and reuse that node rather than a second
   copy (builder check).
6. **Internal anchors**: 12 of the ~20 links to `/business-card/` say "NFC.cool Business
   Card". Rewrite roughly half to descriptive anchors ("digital business card app", "NFC
   digital business card") in every locale, keeping prose natural.
7. **Roundup post routes to the product**: a clear link to `/business-card/` near the top
   of `/blog/best-digital-business-card-apps-2026/`, and its end-of-post CTA points there
   instead of only at the App Store.
8. **Home page**: one routing line naming the Business Card app and Team, linking to
   `/business-card/` (no restructure).
9. **Sub-topic pages** (second wave, after 1-8 ship): NFC business card, Apple Wallet
   business card, QR code business card. Each under `/business-card/<topic>/`, each 13
   locales, each linking back to `/business-card/`. Builder decides whether they are
   `Content/Pages` siblings like `business-card-teams` (likely yes).

## Part 2: Web card maker

### The flow (decided with Nico)

1. **Create** on `nfc.cool/business-card/`: a short form near the top of the page (name, job
   title, company, phone, email, a few links, optional photo and colour). Submit makes a
   provisional account and card. The card is live at once on `mycard.nfc.cool`.
2. **Result**: the visitor gets their card link, a QR code, and a clear 24 h countdown:
   "Your card works for 24 hours. Keep it for free." First nudge to the app here.
3. **Claim** within 24 h (or the 7-day grace) with email, Apple or Google, using the existing
   claim logic. The card's link never changes on claim. Apple is in v1 (Nico's decision):
   the web Services ID must sit in the same Apple group as the Business Card app, so a card
   claimed with Apple on the web shows up when the person signs in to the app. Nico
   registers the web return URLs in the Apple Developer portal and turns on
   `ORG_WEB_APPLE_SIGN_IN` in production.
   - **Existing account (Nico's decision):** if the email, Apple ID or Google account already
     has an account, the claim screen says so and offers two choices: sign in and replace
     the existing card with the new one, or keep the old card (the new one is dropped). A
     Free account never ends up with two cards. Today email/Apple refuse with 409 and Google
     moves the card in, so the server needs a "replace" branch and the one-card rule on
     every claim path.
   - **Consent (Nico's decision):** under the create button, one line: "By creating a card
     you agree to the terms and privacy policy", linking `/terms/business-card/` and
     `/privacy/business-card/`. The privacy policy names the bot protection provider. Part 2
     launches only after Nico's lawyer has seen that text (see
     `business_card_service/docs/legal/lawyer-review-2026-11-06.md`).
4. **Edit on the web afterwards**, on `business.nfc.cool` (my call: it already hosts the
   team dashboard and its card editor, so reuse its look and editor). A personal user can
   edit their card there and see their card link/QR.
5. **Nudges**: in the places analytics and leads would sit, show honest pointers to the app,
   e.g. "12 people viewed your card. See who saved it in the app.", with store buttons and an
   install QR. Three placements at least: after create, after claim, inside the editor.
   **Counts (Nico's decision):** the nudge shows a Free user their real view count as a
   teaser, then names what is paid, e.g. "12 people viewed your card. See saves, link taps
   and leads with Personal in the app." Never promise anything the Free app does not show.
   The counts come from `VCardProfileView` (server), which needs a small endpoint for
   personal accounts.
6. **Paying**: Personal and Pro in the app only. Team on the web as today (the editor links
   to the team start page).

### What a web card is

A Free-plan card, exactly as the app's Free plan: one card, sharing by link/QR (NFC tags
can be written later in the app), Save Contact, the "Made with NFC.cool" badge. Same account
type, so installing the app and signing in shows the same card.

### Server work (`business_card_service`)

- A **web sign-up door** for provisional accounts that does not need the app's API key,
  protected against bots (e.g. Cloudflare Turnstile or similar) plus the existing
  `ProvisionalSignUpThrottle`. Builder picks the mechanism; the anti-goal is spam.
- Claim from the web with email, Apple (Sign in with Apple JS) and Google (Google Identity
  Services), reusing `claim_with_email/apple/google`. Builder checks which OAuth client ids
  need adding for the web origin.
- Web login for personal accounts on `business.nfc.cool` and a personal card editor.
- CORS: add `https://nfc.cool` for the sign-up door. In production this is the
  `CORS_ALLOWED_ORIGINS` environment variable, so it is a deploy step for Nico, like the bot
  protection keys and the OAuth client ids (Claude can't ssh to the server).
- Localization: the form, result screen, claim screens, editor and emails in all 13 locales
  (match how `business.nfc.cool` already localizes).

### Site work (this repo)

- The form on `/business-card/` in every locale (a small JS module in `Theme/js/`, no
  framework), styled from existing classes first (`marketing.css`, form styles from the
  newsletter form) before adding new CSS.
- Graceful failure: if the server is unreachable, the form says so and offers the store
  buttons.

## Part 3: Off-site (Nico personally, Claude drafts)

- **Google Play**: set the Business Card app's website from `https://nfc.cool` to
  `https://nfc.cool/business-card/`. Mention the Business Card app with that link in the
  Tools listings too.
- **Roundup outreach**: ask to be added to Hack'celeration, Guideflow, ToolGPA, Dupple,
  SPOTIO, Raklet, Geekflare, SourceForge, WaveCnct (report row 6). Claude drafts one email per
  target with a dated price table; Nico sends. Do this after Part 1 is live.
- **Listings**: G2 (may cover Capterra), AlternativeTo (check the old "NFC for iPhone"
  listing), SourceForge, Product Hunt. Claude drafts the copy.
- **Reddit**: answer, as the disclosed maker, the threads that already rank on Google for
  "best digital business card app", "Blinq alternative", "HiHello alternative" and similar.
  Claude finds the threads and drafts replies; Nico posts. One reply in a thread that
  ranks beats another blog post.
- **Badge wording**: optional, give the "Made with NFC.cool" badge category words in its
  link (e.g. alt text "NFC.cool digital business card"). Server template
  `web/vcard_profile/templates/partial_profile.html`.

## Order

1. Part 1 items 1-8 (site only, ships in days).
2. Part 2 (server and site together; largest piece).
3. Part 3 outreach once Part 1 is live; Play Console change can happen any time.
4. Part 1 item 9 (sub-topic pages).

## How we know it worked

Search Console, page `/business-card/` and each locale, compared to the 2026-11-05 baseline:
position and clicks for "digital business card" and variants, and the share of
"business card" impressions landing on `/business-card/` instead of the roundup.
Server: web-made cards per week, claim rate within 24 h, and how many claimed web
accounts later sign in from the app.

## Left to the builder

Bot protection mechanism, the exact form fields, the editor's layout within the dashboard's
existing look, file layout, which strings go where, and test strategy.
