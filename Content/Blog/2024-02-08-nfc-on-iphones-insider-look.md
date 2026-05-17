---
id: nfc-blog-020
title: "Tapping into NFC on iPhone: an insider's look"
date: 2024-02-08
tags: ["nfc-tags", "iphone"]
summary: "How NFC actually works on iPhone - from Apple Pay's secure element to Core NFC tag reading. A practical look at the protocol, the iOS history, and why the short range is a feature, not a limitation."
metaTitle: "How NFC Works on iPhone: An Insider's Look"
metaDescription: "A practical explanation of NFC on iPhone - how the protocol works, Apple Pay's secure element, Core NFC tag reading, and why short range is a security feature."
ogTitle: "Tapping into NFC on iPhone: an insider's look"
ogDescription: "How NFC actually works on iPhone - protocol, secure element, Core NFC tag reading, and the iOS history."
image: "/assets/images/Blog/nfc-on-iphones-insider-look.webp"
---
A lot of the technology we use every day disappears into the background. You tap to pay, unlock, scan, share - and never think about the protocol underneath. NFC is one of those quiet pieces of plumbing, and after years building NFC.cool, an app for reading and writing NFC tags, I've spent more time inside that plumbing than most people ever will. Here's how it actually works on your iPhone, the way I'd explain it to a curious friend.

---

## What NFC actually is

**Near Field Communication** is a short-range wireless protocol - two devices can exchange data when they're within about 4 cm of each other. I think of it as a simplified, much shorter-range cousin of Bluetooth and Wi-Fi.

That short range trips people up at first, but it isn't a limitation. It's the security model, and once that clicked for me a lot of NFC's design choices made sense. You can't accidentally tap a payment terminal from across the room, and a malicious reader can't quietly siphon data out of your wallet at a distance. If you're new to all of this, I wrote a gentle [beginner's guide to NFC tags](/blog/nfc-tags-beginners-guide/) that starts further back than this post does.

---

## NFC on iPhone: a short history

Apple shipped NFC hardware for the first time with the iPhone 6 and 6 Plus in 2014, but the radio was locked down to Apple Pay only. Third-party apps couldn't read NFC tags at all - which, as someone who would later build an NFC app, was a frustrating few years to watch.

That changed with **iOS 11** (2017), which introduced the **Core NFC** framework and finally let developers like me read NDEF tags. Apple kept opening the door wider in later releases - iOS 13 added writing support, and iPhone XS and newer added always-on background tag reading. Today, on any modern iPhone, you can tap a tag without opening anything: the OS recognises it and offers the right action.

---

## How NFC actually moves data

NFC devices operate in one of two roles per interaction: **active** (powered, generates a field) or **passive** (no battery, harvests power from the field). This is the single idea I come back to whenever someone asks me how NFC works.

When you make an Apple Pay payment, your iPhone is the active reader. It generates a radio field at 13.56 MHz. The payment terminal's NFC element wakes up inside that field, identifies itself, and exchanges a small amount of cryptographic payload with your phone. Your card data never leaves the **Secure Element** - a dedicated, hardware-isolated chip on the phone. What goes out is a one-time token.

When you tap an NFC sticker on a poster, the roles flip. The poster's tag is passive - it has no battery. Your iPhone's reader powers it, the tag responds with whatever NDEF records are stored on it, and iOS decides what to do (open a URL, launch an app, show a contact card, trigger a Shortcut). That second half - the tag side - is the part NFC.cool lives in, and if you want to see it in action without installing anything, you can [read NFC tags straight from your browser](/online-nfc-reader/) on Android.

---

## NDEF: the lingua franca

The data layer on top of the NFC radio is **NDEF** - NFC Data Exchange Format. I describe it as a tiny self-describing record format: a tag carries one or more records, and each record has a type (URI, text, vCard, Wi-Fi credentials, custom MIME) and a payload.

Every NFC-capable phone on the planet speaks NDEF, which is why a tag programmed on an Android device will read fine on an iPhone and vice versa. It's one of the few places in mobile where iOS and Android genuinely share a standard, and honestly that interoperability is the thing I'm most grateful for when I'm building features - I write to the format, not to a platform. If you want to try writing your own records, I walk through it in [how to write NFC tags on iPhone](/blog/write-nfc-tags-iphone/).

---

## Privacy and security

Two layers of defence are worth mentioning, and they're the two I find myself explaining most often:

- **Range.** A few centimetres is hard to intercept without a noticeable antenna - this is the original threat model NFC was designed around.
- **Tokenisation.** Apple Pay never transmits your real card number. Each transaction uses a Device Account Number plus a one-time cryptogram, generated inside the Secure Element. Even a compromised terminal can't replay it.

For tag reading, the threat surface is different - the tag itself is the thing being trusted. If you control what's on the tag (your own home automations, your business card), you're fine. If you tap a random tag in a public space, you should still see a confirmation prompt in iOS before anything happens. When I do need a tag to actually hold a secret rather than just point at one, I reach for cryptographic tags, and I covered that in [storing safe, encrypted secrets on NFC tags](/blog/nfc-safe-encrypted-secrets/).

---

## Why this matters

NFC is one of those protocols that disappears when it works, and that's exactly why I find it satisfying to build on. You tap a turnstile, a payment terminal, a business card, a smart speaker - and something happens. There's no pairing, no PIN, no app launch. Just a deliberate physical gesture that authorises one specific exchange.

That's why I built [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-on-iphones-insider-look-en&mt=8) - to make the full NDEF surface of NFC available without anyone having to learn the protocol first. Read any tag, write any record type, lock a tag when you're done. On iPhone or [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-on-iphones-insider-look-en).
