---
id: nfc-blog-011
title: "OpenPrintTag: How to Read & Write Smart 3D Printing Spools with Your Phone"
date: 2026-03-29
tags: [nfc-tech, 3d-printing, openprinttag]
summary: "OpenPrintTag is the open standard for smart filament spools. Learn how it works, what data it stores, and how to read and write OpenPrintTag NFC tags using just your phone."
metaTitle: "OpenPrintTag: Read & Write Smart 3D Printing Spools with Your Phone"
metaDescription: "Learn how to use OpenPrintTag to manage your 3D printing filament spools with NFC. Read, write, and track material data from your iPhone or Android, no proprietary apps needed."
ogTitle: "OpenPrintTag: Smart 3D Printing Spools with NFC"
ogDescription: "The complete guide to reading and writing OpenPrintTag NFC spools with your phone. Works with any printer, any filament brand."
---
If you 3D print, you've probably been there: a shelf full of half-used spools, no idea how much filament is left on any of them, and that one unlabeled spool that might be PETG or might be PLA, with no way to tell without a test print.

OpenPrintTag solves this. It's an open-source NFC standard created by [Prusa Research](https://www.prusa3d.com) that turns any compatible NFC tag into a smart label for your filament spool. Material type, brand, color, remaining weight: all stored directly on the spool and readable with a quick tap of your phone.

No cloud. No proprietary ecosystem. No internet required.

## What Is OpenPrintTag?

OpenPrintTag is a universal, open data format for 3D printing materials. Instead of every manufacturer inventing their own incompatible smart spool system, OpenPrintTag defines a single standard that anyone can adopt, including filament makers, printer manufacturers, slicer software, and apps like NFC.cool.

The key principles:

- **Open source:** published under MIT license, free to implement, no licensing fees
- **Offline by design:** all data lives on the tag itself, no cloud service needed
- **Rewritable:** update remaining filament as you print, reuse tags on new spools
- **Universal:** works across brands and ecosystems
- **Supports both FFF (filament) and SLA (resin)**

Over 22 companies and groups have expressed interest, including Prusament, Voron, Fillamentum, 3DXTech, SimplyPrint, and PrintedSolid. The full specification is available at [specs.openprinttag.org](https://specs.openprinttag.org).

## What Data Does an OpenPrintTag Store?

This is where it gets interesting. OpenPrintTag isn't just a label with a name on it. It's a structured data format with fields for almost everything you'd want to know about a spool.

**Material identification:**
- Material class (filament or resin)
- Material type (PLA, PETG, ABS, TPU, ASA, PC, PA6, and 30+ others)
- Material name (e.g. "PLA Galaxy Black")
- Brand name (e.g. "Prusament")
- Material property tags: over 68 defined properties like abrasive, conductive, glow-in-dark, food-safe, ESD-safe, flexible, and more

**Weight and length tracking:**
- Nominal weight (advertised, e.g. 1000g)
- Actual weight (measured for this specific spool)
- Filament length (nominal and actual, in mm)
- Empty container weight (so you can weigh the spool and calculate remaining material)
- Consumed weight (updated as you print; this is the field that makes spools truly "smart")

**Color:**
- Primary color in RGBA format
- Up to 5 secondary colors (for multicolor, galaxy, or gradient filaments)
- Transmission distance (opacity value, useful for [HueForge](https://shop.thehueforge.com/) projects)

**Metadata:**
- Manufacturing date and expiration date
- Country of origin
- UUIDs for brand, material, and specific spool instance
- Write protection settings

The spec even covers resin-specific fields like `last_stir_time`, which records when the resin was last stirred before printing.

## The Tag: Not Your Usual NFC Sticker

Here's an important technical detail: **OpenPrintTag is designed for ISO 15693 (NFC-V) tags**, specifically **NXP ICODE SLIX and ICODE SLIX2** chips. These are NFC Forum Type 5 tags with a significantly longer read range than standard NFC-A tags, up to 1.5 meters with a dedicated reader.

Why NFC-V? A printer's built-in NFC reader needs to detect the spool regardless of its rotation. The longer range of NFC-V makes this possible without requiring precise tag alignment.

**What about regular NTAG stickers?** The OpenPrintTag data format is NDEF-based, so a phone app like NFC.cool can technically read and write OpenPrintTag data on any NFC tag, including NTAG213/215/216. However, **printer hardware and apps like Prusa's only recognize NFC-V tags**. If you want your tagged spools to work with built-in printer readers, use ICODE SLIX2 tags.

If you're buying blank tags, look for **ICODE SLIX2** or **ISO 15693** specifically. You can find compatible tags on [Amazon US](https://amzn.to/3LTh1fT) or [Amazon Europe](https://amzn.to/4oJpQr4) (affiliate links).

## How to Read and Write OpenPrintTag with Your Phone

You don't need a Prusa printer or any special hardware to work with OpenPrintTag, just your phone.

NFC.cool Tools supports OpenPrintTag natively on both [iOS](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=BlogOpenPrintTag&mt=8) and [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dblog-openprinttag), and the feature is completely free.

**Reading a tag:**
1. Open NFC.cool Tools
2. Hold your phone near the NFC tag on the spool
3. NFC.cool detects the OpenPrintTag format automatically
4. View the structured data: material, brand, color, weight, length, properties

**Writing a tag:**
1. Stick a blank ICODE SLIX2 tag on your spool
2. Open NFC.cool → NFC Apps section → OpenPrintTag
3. Fill in the material details: type, brand, color, weight, length
4. Tap to write

**Updating remaining material:**
After a print, update the consumed weight field on the tag. Next time you scan, you'll know exactly how much filament is left, no guessing, no weighing.

You can also use Expert Mode to inspect raw NDEF records if you need to debug a tag or verify the data structure.

## Why Use Your Phone?

Prusa printers are getting built-in NFC readers, and projects like [SpoolSense](https://github.com/SpoolSense) (an open-source ESP32 reader) are adding dedicated hardware options. So why bother with your phone?

- **Works with any printer:** Voron, Bambu Lab, Creality, Ender, whatever you use
- **Write tags for any filament:** Prusament comes pre-tagged, but you can tag Fillamentum, eSUN, Hatchbox, or any brand yourself
- **Manage inventory away from your printer:** scan spools at your desk, in your storage, or at a makerspace
- **Debug tags:** when a printer can't read a tag, scan it with your phone to see what's actually on it
- **No extra hardware:** your phone already has an NFC reader

## Practical Use Cases

**Personal inventory:** Tag every spool in your collection. When you're planning a print, scan spools to check material type, remaining length, and color without unboxing anything.

**Remaining filament tracking:** Weigh your spool before and after a print, update the consumed weight on the tag. No more "will this spool have enough for a 14-hour print?" anxiety.

**Makerspace or team use:** Tag spools with material details so anyone in the shop can scan and identify them. No more mystery filament.

**Filament testing notes:** Found the perfect temperature for a specific spool? Update the tag with your notes for next time.

**Multi-color and specialty materials:** OpenPrintTag supports up to 6 colors per spool and 68+ property tags. Your glow-in-dark, carbon-fiber-filled PETG can finally be properly labeled.

## The Ecosystem Is Growing

OpenPrintTag is still young, but momentum is building:

- **Prusament** ships with OpenPrintTag NFC tags on every spool
- **Prusa printers** are adding native NFC readers
- **Open-source hardware readers** like SpoolSense (ESP32-based) are emerging from the community
- **22+ companies** have joined the initiative
- **NFC.cool** is the only general-purpose NFC app with full OpenPrintTag support on both iOS and Android

The 3D printing industry has needed an open standard for smart spools for years. OpenPrintTag is the most credible attempt yet, backed by a major manufacturer, fully open source, and already shipping on real products.

## Getting Started

**What you need:**
- iPhone 7 or later, or an Android phone with NFC
- NFC.cool Tools ([App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=BlogOpenPrintTag&mt=8) / [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dblog-openprinttag)), free, OpenPrintTag included
- Blank ICODE SLIX2 / ISO 15693 NFC tags ([Amazon US](https://amzn.to/3LTh1fT) / [Amazon Europe](https://amzn.to/4oJpQr4), affiliate links)
- Some filament spools to tag

That's it. Five minutes from now, your first spool could be smart.

---

*OpenPrintTag is an open-source initiative by Prusa Research. NFC.cool is an independent supporter of the standard. Learn more at [openprinttag.org](https://openprinttag.org).*
