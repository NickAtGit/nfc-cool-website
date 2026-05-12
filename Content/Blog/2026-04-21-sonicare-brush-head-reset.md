---
id: "sonicare-2026-04"
title: "How to Check and Reset Your Philips Sonicare Brush Head Counter with NFC"
date: "2026-04-21"
category: "nfc"
tags: ["nfc", "sonicare", "guides", "ntag213"]
summary: "Every Philips Sonicare replacement head has an NTAG213 that counts down to your next purchase. NFC.cool Tools can read it — and reset it."
author: "Nicolo Stanciu"
---

Your electric toothbrush is spying on you. Not in a creepy surveillance way — in a "we put a tiny NFC chip in your brush head to nag you into buying replacements" way. Every Philips Sonicare replacement head has an NTAG213 embedded in the plastic that tracks how long you've been brushing and tells the handle to flash a warning light when it decides your three months are up.

The thing is, three months is a recommendation, not a medical fact. Bristle wear depends on how hard you brush, what toothpaste you use, and how often. The chip doesn't measure bristle condition. It just counts seconds. NFC.cool Tools can now read that chip, show you exactly how much life your brush head has used, and reset the timer if you decide your bristles are still good.

### What's actually on the chip

Reverse-engineered by [Cyrill Künzi](https://github.com/ckuenzi) and mapped by [mbirth](https://github.com/mbirth), every byte on the NTAG213 tells a story:

- **Brush head type and color** at page `0x1F` (one byte identifies model + color)
- **Target lifetime** at `0x21`: usually `0x5460` = 21,600 seconds = 180 two-minute brushes = 3 months at twice daily
- **Manufacturing code** at `0x21-0x23` (production date and line, also printed on the stem)
- **Accumulated brush time** at `0x24` (16-bit second counter; stops at `0xFFFF` ≈ 18 hours)
- **Last intensity and mode** at `0x24` too
- **A URL** pointing at `philips.com/nfcbrushheadtap` (so generic NFC readers open something useful)

When accumulated time exceeds the target, the handle blinks amber. The chip talking, not the bristles.

### Why you might want to reset

The 3-month interval is a recommendation, not a measurement. The chip counts seconds, not fraying. If you want to decide for yourself — by *looking at* your bristles instead of obeying a countdown — resetting lets you do that. Also useful if you rotate between multiple heads (travel vs home) and want to track them yourself.

### About the password

The NTAG213 is password-protected with a unique 4-byte password per head. It's derived from the tag UID + manufacturing code. Aaron Christophel reverse-engineered the algorithm after Cyrill Künzi sniffed the password transmission via SDR.

⚠️ **The NTAG213 permanently locks after three failed password attempts.** The chip becomes read-only forever — even the toothbrush can't write to it anymore. Don't guess.

### How to reset with NFC.cool Tools

1. Open **NFC.cool Tools** on iPhone
2. Go to **Toothbrush Head Reset**
3. Tap **Read NFC** and hold the head against your phone
4. See a percentage gauge plus used/remaining time
5. Tap **Reset Timer** to set the usage counter back to zero

Available now on iPhone, Android coming soon.

### What the reset actually does

Writes `00:00:02:00` to page `0x24` — the same value a brand-new head ships with. Only the first two bytes (usage counter) are reset; the last two bytes (purpose unknown) are preserved. The toothbrush starts counting from zero, and amber comes back in another 3 months — at which point you can check your bristles and decide for yourself.

### The bigger picture

A toothbrush head with an NFC chip that counts down to your next purchase is how companies embed tracking in disposable products. The same NTAG213 chip powers product authentication, access control, and the upcoming EU Digital Product Passport. NFC.cool Tools reads and writes these tags — so you can understand the information that surrounds you.
