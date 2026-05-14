---
id: "site-2026-05-12"
title: "Website: trilingual relaunch, new pages, full design pass"
date: "2026-05-12"
category: "website"
tags: ["website", "trilingual", "design"]
summary: "Migrated the marketing site off Webflow onto SiteKit. Three languages (EN/DE/JA), 5 feature subpages, blog, changelog, integrations + developers docs, and a fully unified design system."
author: "Nicolo Stanciu"
---

The marketing site is rebuilt. The new stack is a Swift-based static site generator (SiteKit), giving us:

- **Trilingual content from day one** - English, German, and Japanese, with hreflang on every page and automatic locale redirects.
- **5 dedicated feature pages** at `/features/` covering NFC, QR & barcode, document scanning, 3D & room scanning, webhooks. Each with capability cards, real product screenshots, FAQs, and (where it makes sense) iOS-vs-Android comparison tables.
- **Blog** with 5 migrated posts and an open lane for the rest.
- **New pages:** [About](/about/), [Developers](/developers/), [Reviews](/reviews/), and this Changelog.
- **Unified design system:** consistent card vocabulary, brand-blue hero gradient on marketing pages, soft-grey body, dark-mode parity.
- **Cookie-free newsletter** via a self-hosted form that proxies to Mailjet - no tracking, no consent banner needed.
- **Open feeds for tools and AI:** `/feed.xml`, `/blog/feed.xml`, `/changelog/feed.xml`, `/sitemap.xml`, `/llms.txt`, `/assets/nav-index.json`, `/assets/search-index.json`.

All future updates can ship by editing YAML and Markdown.
