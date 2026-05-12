---
id: nfc-blog-028
title: "I can't remember anyone I meet. So I built this into the business card app."
date: 2025-01-23
tags: [business-card, networking, smart-context, ios]
summary: "After enough conferences and networking events, I realised digital business cards solved the wrong problem. They saved trees but not the context. So I added a Smart Context layer to NFC.cool Business Card - where you met, what they're working on, what to follow up on."
metaTitle: "Smart Context: The Memory Upgrade for Digital Business Cards"
metaDescription: "Digital business cards solve paper. They don't solve forgetting people. NFC.cool Business Card's Smart Context layer captures where, when, and why - synced to your calendar."
ogTitle: "I can't remember anyone I meet. So I built this into the business card app."
ogDescription: "Why digital business cards needed more than contact info - and the Smart Context layer that fixes it."
image: "/assets/images/Blog/smart-context-remember-everyone.jpg"
---
After years of building digital business card software, there was one problem that kept bothering me: we'd solved the wrong half.

The paper-card problem is real - cards go stale, fill your wallet, get lost, can't be updated. Digital cards fixed that. But they didn't fix the actual networking problem, which is much simpler:

> I meet 50 people at a conference, exchange info with 20, and three weeks later I cannot remember a single conversation.

The contact details on your phone are useless if you can't remember why that person is in your address book.

## Context is the missing piece

So I added what I've been calling the "memory upgrade" to NFC.cool Business Card. Right after connecting - via the NFC tap, the App Clip, or the Conference Mode lock-screen QR - you get prompted to capture context:

- **Where and when you met.** Auto-populated with date and place, editable.
- **What they're working on.** A short note about their project, company, or focus area.
- **Conversation highlights.** The one or two things you actually talked about that you'd want to remember.
- **Follow-up plans.** "They're sending an intro to their VC." "Should send the deck on Monday."

That last bit syncs into your calendar and reminders, because we're all bad at follow-through and we all need the nudge.

## Why it's part of the exchange, not after

The trick is that the prompt appears immediately after the contact is saved - while the conversation is still fresh in your head. Five minutes later you've moved on to the next person. Three days later you don't remember whether the AI founder was the one from the Austin pitch competition or the Berlin hackathon.

Capturing the context in the same flow as the contact exchange means the data is actually written down. The alternative - adding context manually next week from memory - never happens.

## What it changed for me

During beta testing across a few events, the experience shifted from "I have these business cards in my phone now" to "I have a queryable graph of people, what they do, and what I owe them".

I open the Networking tab in NFC.cool Business Card and see: who I met where, what we talked about, what I said I'd follow up on, what's still open. After meeting someone again, I update the entry - new conversation, new context. The card becomes a living record of the relationship, not a snapshot of contact details.

## Works across the stack

The Smart Context layer works regardless of how the contact got into your address book:

- **NFC tap.** Standard flow - you tap their card, save the contact, capture context.
- **App Clip.** iOS recipients see the App Clip overlay, save the contact, and get the same context prompt.
- **Conference Mode (lock-screen QR).** Show your lock-screen QR for fast exchange in noisy environments; the same context prompt fires once they save.
- **Android browser.** Android recipients open the web page version, save the contact, and can capture context inside the NFC.cool Business Card app afterwards.

The app handles up to 100 different cards (different roles, different events, different versions of you) and the Smart Context data stays separate per card - so a contact you met as "design consultant at the Berlin meetup" is a different record from the same person you met as "co-founder at the YC demo day".

## Why this matters now

The reason this didn't exist five years ago is that the bottleneck wasn't tech - it was friction. Capturing context required pulling out a separate notes app, typing while the other person watched, and then somehow associating those notes with the contact later. Most people gave up.

With NFC.cool Business Card, the capture is one tap inline with the contact exchange. It's the difference between "I should remember this" and "this is now remembered".

In a world where we trade contacts faster than ever, the data that matters isn't who you know - it's why you know them.

---

[Download NFC.cool Business Card for iPhone](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=BlogSmartContext&mt=8). Android users get the same business card and Smart Context features bundled into [NFC.cool Tools for Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dblog-smart-context).
