---
id: "businesscard-appclip"
title: "NFC.cool Business Card - App Clip experience polished"
date: "2026-01-23"
tags: ["business-cards", "networking", "iphone"]
summary: "Reworked the App Clip flow so recipients can save your card to Contacts in one tap, with no NFC.cool account, no install, no friction."
author: "Nicolo Stanciu"
---

The App Clip experience for NFC.cool Business Card got a substantial polish pass:

- **Frictionless save.** Recipients see your card in a native iOS sheet and can save to Contacts in a single tap.
- **Tighter NFC handshake.** The AppClip payload is verified and the card content prefetched before the sheet shows.
- **Apple Wallet route.** Visitors can drop your card into Apple Wallet for instant access later.
- **Visitor privacy preserved.** Save events are recorded as anonymous counts only - no visitor identity is captured.

Background context on the architecture (App Clip + SwiftUI + secure backend APIs) was the subject of a [mDevCamp 2025 talk in Prague](/blog/app-clip-lessons-from-business-card/).
