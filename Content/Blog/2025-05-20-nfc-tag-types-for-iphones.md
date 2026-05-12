---
id: "nfc-tag-types-2025-05"
title: "Understanding the different types of NFC tags - and which work with iPhones"
date: "2025-05-20"
category: "nfc"
tags: ["nfc", "tag-types", "ntag", "buying-guide"]
summary: "Type 1 through Type 5, who makes them, and why NTAG-series (Type 2) is the safest bet for iPhone projects."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/nfc-tag-types.png"
imageAlt: "NFC tag types lined up next to an iPhone"
---

NFC tags are small integrated circuits designed to store information that can be read by NFC-enabled devices like smartphones. However, not all NFC tags are created equal. There's a wide variety of types from different manufacturers, each with its own characteristics. This can make it surprisingly tricky to pick the right one for your iPhone.

This guide covers the different types of NFC tags and their compatibility with iPhones.

### Understanding NFC tag types

NFC tags are categorised into five types: Type 1, Type 2, Type 3, Type 4, and Type 5. The classification comes from the NFC Forum, the industry consortium that promotes NFC. Each type has different memory capacities and speeds, and can be either read-write or read-only.

### Type 1 & 2 - Topaz and MIFARE Ultralight®

Type 1 (Topaz, by Broadcom) and Type 2 (MIFARE Ultralight®, by [NXP Semiconductors](https://nxp.com)) are cost-effective and well suited to simple applications like posters and business cards. They have a small memory capacity (48 bytes to about 2 KB), which is plenty for a URL or a short text payload.

### Type 3 - FeliCa™

Type 3 tags, also known as FeliCa™, were developed by Sony. They're used predominantly in Asia for public transport tickets and e-money. They offer higher speed and memory (up to 1 MB), but their use is somewhat limited due to higher costs and region-specific applications.

### Type 4 - MIFARE DESFire®

MIFARE DESFire® tags, also from NXP Semiconductors, are Type 4. They're high-security, high-capacity tags used for complex applications like secure access control and public transport. They can store up to 8 KB.

### Type 5 - ISO 15693

Type 5 tags conform to the ISO 15693 standard and are relatively new in the NFC ecosystem. They're primarily used in industrial scenarios and offer extended read ranges compared to other types.

### Which NFC tags should you choose for your iPhone?

iPhones from iPhone 7 onward are compatible with NFC Type 1, 2, and 5, but offer the best support for Type 2. Type 2 NFC tags are the [NTAG series](https://www.nxp.com/products/wireless-connectivity/nfc-hf/ntag-for-tags-and-labels:NTAG-TAGS-AND-LABELS) from NXP Semiconductors.

The NTAG213, NTAG215, and NTAG216 models are the most popular among the NTAG series and work brilliantly with iPhones. They offer enough memory (144 to 888 bytes) for most practical applications and are fully writable and readable by any NFC-enabled iPhone. They're also rewritable - change their contents as often as you like.

A practical note: the larger the tag and antenna, the better an NFC reader can pick up the tag. Avoid extremely cheap, flimsy stickers if reliability matters for your application.

Remember that the main application for NFC on iPhones is reading NFC Data Exchange Format (NDEF) messages, which include URLs, plain text, or vCards (digital business cards). Any tag that supports NDEF - and most NTAG-series tags do - is a good choice for iPhone users.

### Summary

If you're looking for NFC tags to use with your iPhone, Type 2 tags from the NTAG series by NXP Semiconductors are your best option. They're cost-effective and offer the best compatibility and functionality for what most people want to do with NFC on iPhones.

The world of NFC is continually evolving, so keep an eye on the latest developments and tag specifications for best performance. For more, see our earlier post on [tapping into the magic of NFC on iPhones](https://nfc.cool/post/tapping-into-the-magic-of-nfc-on-iphones-an-insiders-look) (link goes to the legacy site while we migrate older posts).

Happy tagging!
