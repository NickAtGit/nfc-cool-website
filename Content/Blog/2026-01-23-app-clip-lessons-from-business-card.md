---
id: "app-clip-lessons-2026-01"
title: "Building a Great App Clip Experience: Lessons from NFC.cool Business Card"
date: "2026-01-23"
tags: ["business-cards", "networking", "iphone"]
summary: "Recap of the mDevCamp 2025 talk in Prague about the architecture behind NFC.cool Business Card's App Clip flow."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/app-clip-mdevcamp.webp"
imageAlt: "Speaking at mDevCamp 2025 in Prague"
---

In 2025 I gave my first conference talk, and I picked a topic I'd spent years living inside but had never had to explain to a room: how the App Clip behind NFC.cool Business Card actually works. The talk was at mDevCamp 2025 in Prague, and I gave it the same title as this post.

If you haven't run into one, an App Clip is the small piece of an iOS app that opens instantly from an NFC tap or a QR scan - no App Store, no install. It's what lets someone see your NFC.cool business card about a second after you tap phones, without downloading anything. Making that feel instant, while still keeping shared-card data secure and not forcing anyone to sign up, takes more architectural decisions than it looks like from the outside. The talk walked through them: how the App Clip is structured, where SwiftUI earns its place, and how the backend handles the card data.

Explaining it from a stage was good for me. It made me justify choices I'd mostly made on instinct, and the questions afterward - from iOS developers who had clearly fought the same fights - were sharper than any code review. The shape I'd settled on, App Clips with SwiftUI and a secure backend API, held up to that scrutiny, and a couple of suggestions from the hallway conversations have already made it into the app.

You can watch the full talk on [Slideslive](https://slideslive.com/39043369/building-a-great-app-clip-experience-lessons-from-nfccool-business-card).
