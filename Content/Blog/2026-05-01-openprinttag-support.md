---
id: "openprinttag-2026-05"
title: "OpenPrintTag support in NFC.cool"
date: "2026-05-01"
category: "nfc"
tags: ["nfc", "3d-printing", "open-standards"]
summary: "NFC.cool natively supports the OpenPrintTag standard for smart 3D-printing spools - free, on both iPhone and Android."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/openprinttag.png"
imageAlt: "OpenPrintTag standard data being written to a 3D-printing spool"
---

NFC.cool now supports the OpenPrintTag standard on both iPhone and Android. Starting with version 6.3.0 on iOS and the latest Android release, you can find full OpenPrintTag tooling inside the **NFC Apps** section - and this feature is completely free.

### What is the OpenPrintTag standard?

OpenPrintTag is an open-source initiative by Prusa Research that defines a unified, cross-vendor NFC data format for 3D printing spools. Instead of every brand inventing an incompatible system, OpenPrintTag provides a single smart-spool standard that any manufacturer, slicer, or tool can adopt.

With OpenPrintTag:

- Printers can read material data, remaining length, and metadata in a consistent way.
- Apps like NFC.cool can write and update spool information using a predictable structure.
- Users get a vendor-agnostic ecosystem that avoids lock-in and broken workflows.
- Manufacturers get a simple, well-documented standard they can implement without inventing their own.

### Why NFC.cool supports it

Smart spools only work well when everything speaks the same language. By supporting OpenPrintTag natively, NFC.cool becomes a practical tool for makers who want to manage filament, track usage, and standardize their setup across different brands. This integration fits the long-term goal of NFC.cool: support real, open standards instead of fragmented proprietary formats.

### What you can do in NFC.cool

With OpenPrintTag support you can:

- Scan any compatible spool and instantly read structured data.
- Write OpenPrintTag fields such as material type, brand, length, batch information, and custom notes.
- Update spool status as you print, without needing manufacturer-specific apps.
- Use Expert Mode to inspect raw NDEF records for debugging or advanced workflows.

### Get NFC.cool

OpenPrintTag support is available now on both platforms:

- [Download NFC.cool for iPhone](https://ios.nfc.cool)
- [Download NFC.cool for Android](https://android.nfc.cool)
