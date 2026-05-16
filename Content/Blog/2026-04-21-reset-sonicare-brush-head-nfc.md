---
id: nfc-blog-015
title: "How to Check and Reset Your Philips Sonicare Brush Head Counter with NFC"
date: 2026-04-21
tags: [nfc-tech, sonicare, guides]
summary: "Your Sonicare toothbrush has an NFC chip inside every brush head that counts down until you buy a replacement. Here's what it actually tracks, and how to check your usage or reset the counter with NFC.cool Tools."
image: "/assets/images/Blog/reset-sonicare-brush-head-nfc.webp"
imageAlt: "Electric toothbrush head NFC tag being reset with a phone"
metaTitle: "Check and Reset Philips Sonicare Brush Head Counter with NFC (2026)"
metaDescription: "Your Sonicare brush head has an NFC chip that tracks how long you've been brushing. See how much life is left and reset the counter with NFC.cool Tools."
ogTitle: "How to Check and Reset Your Sonicare Brush Head Counter"
ogDescription: "Every Sonicare brush head has an NFC chip counting down to replacement. See your usage stats and reset the timer if you want to."
---

Your electric toothbrush is spying on you.

Not in a creepy surveillance way. In a "we put a tiny NFC chip in your brush head to nag you into buying replacements" way. Every Philips Sonicare replacement head has an NTAG213 embedded in the plastic that tracks how long you've been brushing and tells the handle to flash a warning light when it decides your three months are up.

Welcome to the Internet of Shit.

The thing is, three months is a recommendation, not a medical fact. Bristle wear depends on how hard you brush, what toothpaste you use, and how often. The chip doesn't measure bristle condition. It just counts seconds. A gentle brusher with soft toothpaste might have perfectly fine bristles at three months. The timer doesn't know or care.

NFC.cool Tools can now read that chip, show you exactly how much life your brush head has used, and reset the timer if you decide your bristles are still good. Here's how it works.

---

## What's Actually on the Chip

Cyrill Künzi [tore down the protocol](https://kuenzi.dev/toothbrush/) and mbirth [mapped every byte](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html). Here's what the NTAG213 in your brush head stores:

- **Brush head type and color** - a single byte at page `0x1F` that identifies the model (Premium All-in-One, Gum Care, DiamondClean, etc.) and its color ([mbirth's memory map](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) lists 22 known types)
- **Target lifetime** - at `0x21`, usually `0x5460` = 21,600 seconds, which is 180 two-minute brushing sessions, or three months of twice-daily use
- **Manufacturing code** - at `0x21-0x23`, the production date and line as ASCII, like `241206 31K` (manufactured December 6, 2024, on line 31K). Also printed on the stem
- **Accumulated brush time** - the first two bytes at page `0x24` store the total seconds the head has been in use as a 16-bit value. When it reaches `0xFFFF` (65,535 seconds, about 18 hours of continuous brushing), the counter stops. A brand-new head starts at `00:00:02:00` - the first two bytes are zero (no usage), the meaning of the last two bytes is currently unknown
- **Last intensity and mode** - at `0x24` as well: Low/Med/High and Clean/White+/Gum Health/Deep Clean+
- **A URL** - pointing to `philips.com/nfcbrushheadtap`, which opens if you tap the head with a generic NFC reader

When the accumulated time exceeds the target (21,600 seconds), the handle blinks its amber LED. That's the chip talking, not the bristles.

---

## Why You Might Want to Reset It

The three-month replacement interval is a Philips recommendation, not a scientific measurement of bristle wear. The chip counts seconds, not bristle fraying. If you want to decide for yourself - by looking at your bristles instead of obeying a countdown timer - resetting the counter lets you do that.

You might also reset if you rotate between multiple heads (travel vs. home) and want to track them yourself.

---

## How the Password Works

The NTAG213 is password-protected. Every brush head has a unique 4-byte password. The toothbrush handle authenticates with it every time it writes to the tag.

The password is computed from two inputs: the tag's 7-byte UID and the manufacturing code stored on the tag (and printed on the stem). [Aaron Christophel](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) reverse-engineered the algorithm from the Sonicare firmware after Cyrill Künzi originally sniffed the password transmission using a software-defined radio.

⚠️ **Important:** The NTAG213 permanently locks after **three failed password attempts**. The chip becomes read-only forever - not even the toothbrush can write to it anymore. Don't guess.

---

## How to Check and Reset with NFC.cool Tools

Here's how it looks in the app:

<figure class="sk-phone-screenshot">
  <img src="/assets/images/Blog/sonicare-reset-screen.webp" alt="NFC.cool Tools showing a Sonicare brush head at 80% usage with Reset Timer button" />
</figure>

NFC.cool Tools handles the whole process: reading the tag, computing the password, and showing you the stats. No hex commands, no web calculators, no SDR.

1. Open **NFC.cool Tools** on your iPhone
2. Go to **Toothbrush Head Reset**
3. Tap **Read NFC** and hold the brush head against your phone
4. The app shows a **percentage gauge** of how much life the head has used, with used and remaining time below
5. Tap **Reset Timer** to set the usage counter back to zero, or scan another head

Available now on [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-en&mt=8), coming to [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-en) in a future update.

---

## What the Reset Actually Does

When you reset, you're writing `00:00:02:00` to page `0x24` - the same value a brand-new brush head ships with. Only the first two bytes (the usage counter) are changed back to zero. The meaning of the last two bytes is unknown, so the app preserves them.

The toothbrush starts counting from zero again, and the amber light comes back after another three months. At which point you can check your bristles and decide for yourself.

---

## The Bigger Picture: NFC in Everyday Objects

A toothbrush head with an NFC chip that counts down to your next purchase is peak Internet of Shit. We love NFC at NFC.cool, but embedding it in disposable plastic specifically to nudge you toward buying more is... a choice.

The same NTAG213 chip is also used for things that actually serve the consumer: product authentication, access control, and soon the EU Digital Product Passport, which will require NFC tags on consumer products so you can verify what you're buying and where it came from. That's NFC being used *for* you, not against you.

NFC.cool Tools reads and writes all of these. The Sonicare feature is one example of understanding what's on the tags around you, and deciding what to do with that information.

---

## Further Reading

- [Cyrill Künzi's original reverse engineering writeup](https://kuenzi.dev/toothbrush/) - SDR sniffing, password extraction, and the first detailed analysis of the Sonicare NFC protocol
- [Aaron Christophel's password generator](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) - the algorithm extracted from the Sonicare firmware
- [mbirth's NTAG213 memory map](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) - detailed documentation of every byte on the chip

*Have a Sonicare brush head to check? [Download NFC.cool Tools for iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-en&mt=8) or [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-en) (Sonicare reset coming soon on Android) and see what your toothbrush has been tracking.*