---
id: "ultimate-nfc-tag-guide-2026-09"
title: "The Ultimate NFC Tag Guide: Every Chip, What It Is For, and What Reads It"
date: "2026-09-09"
tags: ["nfc-tags", "guides"]
summary: "Every NFC chip you can buy, from a 48-byte NTAG210 to a DESFire EV3, with the real numbers: memory, protection, endurance, what an iPhone and an Android phone can do with it, and which job it is actually built for."
image: "/assets/images/Blog/ultimate-nfc-tag-guide.webp"
imageAlt: "An iPhone with a glowing NFC icon behind a fan of NFC tag form factors: a sticker, a coin, a PVC card, a keyfob, a wristband and a clear inlay"
author: "Nicolo Stanciu"
metaTitle: "The Ultimate NFC Tag Guide: Every Chip Explained"
metaDescription: "Every NFC chip in one place: NTAG, MIFARE, DESFire, ICODE, ST25, FeliCa, Topaz and the clones. Memory, security, endurance, what reads it, and which tag fits which job."
ogTitle: "Every NFC Chip, One Guide"
ogDescription: "Memory, security, endurance, phone support and the honest job for every NFC chip you can buy. Spec tables, a decision table and a full catalog."
---

You open a listing for a pack of NFC tags. It says "NFC 213", or "NTAG215 compatible", or just "1K NFC card, works with all phones". You want to know one thing: will this do the job I have in mind? And the listing cannot tell you, because the person who wrote it does not know either.

I have spent years building [NFC.cool Tools](/features/nfc-reader-writer/), an app whose first job on every tap is to answer exactly that question: what chip is this, and what can it do? The identification code alone recognises around sixty products from seven manufacturers, and every one of them got into that list because somebody held it up to a phone and something did not behave the way the listing promised. This guide is the reference I wished existed while I was writing that code. It is long on purpose. If you want the short version, the [beginner's guide to NFC tags](/blog/nfc-tags-beginners-guide/) is the place to start, and it links back here for depth.

The one sentence take, so you have it before the tables: **there is no best NFC tag, there is only the right chip for the job**, and the job is decided by three things: how much you need to store, who you need to keep out, and what has to be able to read it.

---

## How to use this guide

Every number in this guide comes from a manufacturer datasheet, a platform document from Apple or Google, or from the code of my own app, and the [sources](#sources-and-further-reading) are listed at the end. Where I have had a chip on my desk, I say so in a hands-on note. Where I have not, I say that too: the exotic parts come from datasheets, and a datasheet is a promise, not a measurement.

Two things you will not find here: a step-by-step on writing your first tag (that is the [writing guide](/blog/write-nfc-tags-iphone/)) and the full NTAG 424 DNA story, which has [its own post](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/).

- [What an NFC tag physically is](#what-an-nfc-tag-physically-is)
- [The alphabet soup: standards, Forum types, and what is not NFC](#the-alphabet-soup-standards-forum-types-and-what-is-not-nfc)
- [How to read a datasheet or a listing](#how-to-read-a-datasheet-or-a-listing)
- [NDEF and what actually fits on a tag](#ndef-and-what-actually-fits-on-a-tag)
- [Memory maps: what is where on the chip](#memory-maps-what-is-where-on-the-chip)
- [The decision table](#the-decision-table)
- [Family by family](#family-by-family)
- [Form factors and read range](#form-factors-and-read-range)
- [What reads what](#what-reads-what)
- [What NFC.cool Tools does with each chip](#what-nfccool-tools-does-with-each-chip)
- [Buying without getting burned](#buying-without-getting-burned)
- [The whole catalog on one table](#the-whole-catalog-on-one-table)
- [The matchups people search for](#the-matchups-people-search-for)
- [Frequently asked questions](#frequently-asked-questions)
- [Glossary](#glossary)
- [Sources and further reading](#sources-and-further-reading)

---

## What an NFC tag physically is

An NFC tag is three things glued together: a **chip** the size of a grain of sand, an **antenna** that is a few turns of etched aluminium or copper, and a **substrate** that holds them, which can be a paper sticker, a PET inlay, a PVC card or a glass capsule. The chip has no battery. It is powered by the phone.

The way that works is inductive coupling. The phone's antenna is a coil driving a magnetic field that alternates 13.56 million times a second. Bring a second coil into that field and a current is induced in it, the same way a wireless charger works, just at a tiny fraction of the power. The tag's chip lives on that induced current. To send data back it does not transmit anything of its own. It switches a load across its antenna on and off, which the phone's coil feels as a tiny change in its own field. That trick is called **load modulation**, and it is why the phone does all the work and the tag can cost eight cents.

It is also why the range is what it is. The field of a small coil falls off with the cube of the distance, so a tag that reads perfectly at one centimetre gets nothing at ten. I think of it like a candle: you can read by it if you are close, and no amount of squinting helps from across the room. The NFC Forum's own definition says "a typical range of up to 2 cm", Android's documentation says "4 cm or less", and NXP's datasheets say "up to 100 mm depending on field strength and antenna geometry". All three are right. The phone figure is what you will see; the 100 mm is what the chip can do with a big reader and a big antenna.

Data rates are modest because there is no need for more. A Type A or Type B tag talks at 106 kbit/s, with the faster chips negotiating 212, 424 or 848 kbit/s after the initial handshake. FeliCa runs at 212 or 424. ISO 15693, the long-range family, is slower still at 26.48 kbit/s in its normal mode, because it was designed to be read from a metre away by a warehouse gate rather than a phone. A full dump of an NTAG216's 888 bytes takes a fraction of a second either way.

| Standard | Base rate | Faster modes | Return channel |
| --- | --- | --- | --- |
| ISO/IEC 14443 Type A and B | 106 kbit/s | 212, 424, 848 kbit/s on chips that negotiate them (DESFire, Plus, NTAG 424 DNA) | load modulation on an 847.5 kHz subcarrier |
| FeliCa (JIS X 6319-4, ISO/IEC 18092) | 212 kbit/s | 424 kbit/s | load modulation |
| ISO/IEC 15693 | 26.48 kbit/s (6.62 kbit/s low rate) | NXP fast mode 53 kbit/s; ICODE 3 up to 212 kbit/s | load modulation on a 423.75 kHz subcarrier |

---

## The alphabet soup: standards, Forum types, and what is not NFC

Every listing mixes three naming systems: the ISO standards that define the radio, the NFC Forum tag types that define how data is laid out, and the manufacturers' product names. Here is the map.

### The standards

| Standard | What it defines | NFC Forum name | Example chips |
| --- | --- | --- | --- |
| ISO/IEC 14443 Type A (parts 1 to 3) | proximity cards, 106 kbit/s, Type A modulation, anticollision, the UID | NFC-A | NTAG, MIFARE Ultralight, MIFARE Classic, Topaz |
| ISO/IEC 14443 Type B | same, with a different modulation and no UID in the same sense | NFC-B | ST SRI512, Calypso transit cards, many e-passports |
| ISO/IEC 14443-4 | the transport protocol on top of A or B, called ISO-DEP | ISO-DEP | DESFire, NTAG 424 DNA, MIFARE Plus in SL3, bank cards, passports |
| ISO/IEC 7816-4 | the command language (APDUs) and file system used over ISO-DEP | | everything in the row above |
| ISO/IEC 7816-6 | among other things, the register of chip manufacturer codes | | the first UID byte |
| ISO/IEC 15693 | vicinity cards, up to a metre with the right reader, 8-byte UID | NFC-V | ICODE, ST25TV, ST25DV, TI Tag-it, NTAG 5 |
| JIS X 6319-4 | Sony's FeliCa | NFC-F | FeliCa Lite-S, Suica, Octopus |
| ISO/IEC 18092 | NFC itself (NFCIP-1): peer-to-peer and the passive modes phones use | | your phone |

### The NFC Forum tag types

The NFC Forum did not design chips. It wrote five recipes for storing an **NDEF** message (the container format every phone understands) on chips that already existed. That is what "Type 2 tag" means: not a chip, but a layout.

| Forum type | Radio | Memory model | Typical chips | Phone support |
| --- | --- | --- | --- | --- |
| Type 1 | NFC-A | 8-byte blocks, one-time lockable | Innovision/Broadcom Topaz | reads on both platforms; the NFC Forum dropped Type 1 from its 2021 specification release |
| Type 2 | NFC-A | 4-byte pages, a capability container on page 3, TLV blocks | NTAG21x, MIFARE Ultralight, ST25TN, Fudan FM11NT0x1, Infineon my-d move | iPhone and Android, including iPhone background reading |
| Type 3 | NFC-F | 16-byte blocks, service codes | FeliCa Lite-S, FeliCa Standard | iPhone and Android (Android support for NFC-F is mandatory) |
| Type 4 | ISO-DEP over NFC-A or NFC-B | files selected by APDU: a CC file and an NDEF file | NTAG 424 DNA, DESFire, ST25TA | iPhone and Android |
| Type 5 | NFC-V | 4-byte blocks, CC in block 0 | ICODE SLIX and SLIX2, ST25TV, ST25DV, NTAG 5 | iPhone since iOS 13, Android via NfcV; added to the Forum in 2015 |

Two things that are deliberately not on that list. **MIFARE Classic** is not a Forum tag type at all; NDEF on Classic is an NXP mapping that Android supports on some phones and iOS does not support on any. And the Forum recipes say nothing about security. A Type 2 tag can be a plain NTAG213 or an NTAG 224 DNA with AES-128 authentication; a Type 4 tag can be a bare ST25TA02K or a bank card. The type tells you how the NDEF message is stored, not who can get at it.

### What is not an NFC tag

Half the "why won't my phone read this" messages I get are about things that were never NFC. A phone's NFC coil is tuned to 13.56 MHz and speaks the protocols above. Anything else is invisible to it, no matter how tag-shaped it is.

| It looks like a tag but | Frequency | What it actually is | Can a phone read it |
| --- | --- | --- | --- |
| an office or car park badge with no visible chip | 125 kHz | low-frequency RFID: EM4100 read-only IDs, HID Prox, T5577 rewritables | no, and no app can change that |
| a pet microchip | 134.2 kHz | ISO 11784/11785 FDX-B transponder | no |
| a retail anti-theft or logistics label | 860 to 960 MHz | UHF RAIN RFID, EPC Gen2 | no |
| a hotel key or an old transit card | 13.56 MHz | MIFARE Classic or a proprietary HF card | Android sometimes, iPhone shows the UID only |
| a bank card | 13.56 MHz | an EMV smart card speaking ISO-DEP | technically yes; an app can read the card's application list and public data, but Apple's Core NFC blocks payment-card reading and no phone can produce a working copy |
| a passport | 13.56 MHz | an ICAO 9303 e-document | yes, with the machine-readable zone as the key; [I built that](/blog/read-passport-nfc-chip/) |
| a security key | 13.56 MHz | a FIDO2 authenticator over ISO 7816 | yes for the browser, not as a tag |

The 125 kHz badge is the one that hurts. It fits the reader at the door, it is a plastic card with a coil in it, and it will never talk to a phone. I wrote up [why an iPhone cannot open your condo door](/blog/iphone-rfid-condo-doors/) because the honest answer is a hardware one.

---

## How to read a datasheet or a listing

A datasheet front page has all the numbers you need, and a good listing copies them. Here is what each one means and which ones lie.

### User memory versus total memory

Every chip has more EEPROM than you can use. An NTAG213 has 180 bytes in total and 144 of them are yours; the other 36 hold the UID, the lock bits, the capability container and the configuration pages. A MIFARE Classic 1K has 1024 bytes and 752 are data, because every sector loses a block to its keys. Listings quote whichever number is bigger. The number that matters is **user memory**, and even that is not what fits in an NDEF message, which is the next section.

### The UID

The unique identifier is burned in at the factory and cannot be changed, except on the clones built to change it. Three lengths exist:

| UID length | Where | Notes |
| --- | --- | --- |
| 4 bytes | old MIFARE Classic, cheap Classic cards today | NXP calls these "non-unique identifiers" (NUID) because 4 bytes ran out. There is no manufacturer code in a 4-byte UID. A first byte of 08 means the chip is generating a random ID on every tap |
| 7 bytes | NTAG, Ultralight, DESFire, NTAG 424 DNA, Classic EV1 (optional), FeliCa's 8-byte IDm is a cousin | the first byte is the manufacturer code |
| 8 bytes | every ISO 15693 chip | the first byte is always E0, the second is the manufacturer code |

The manufacturer code comes from the ISO/IEC 7816-6 register, and it is the fastest honest check on a listing. If a "genuine NXP" tag reports 1D, it was made by Fudan.

| Code | Manufacturer |
| --- | --- |
| 01 | Motorola |
| 02 | STMicroelectronics |
| 03 | Hitachi |
| 04 | NXP Semiconductors |
| 05 | Infineon |
| 07 | Texas Instruments |
| 08 | Fujitsu |
| 16 | EM Microelectronic |
| 1A | Sony |
| 1D | Shanghai Fudan Microelectronics |
| 25 | Innovision (Topaz) |
| 2C | Impinj |
| 2E | Broadcom |

### ATQA, SAK and GET_VERSION: how a reader tells chips apart

When a Type A chip answers a phone it sends two small values, the **ATQA** and the **SAK**. Readers, including my app, use the SAK to sort chips into families, because the SAK bits say whether the chip speaks ISO-DEP and which broad family it belongs to. NXP's own identification note says in bold not to use the ATQA for anything, because it collides and misleads, and I have found that to be true.

| SAK | Family | ATQA usually seen |
| --- | --- | --- |
| 00 | NTAG and MIFARE Ultralight, all of them | 00 44 |
| 08 | MIFARE Classic 1K, MIFARE Plus 2K or SE in security level 1 | 00 04 (4-byte UID), 00 44 (7-byte) |
| 09 | MIFARE Classic Mini | |
| 18 | MIFARE Classic 4K, MIFARE Plus 4K in level 1 | 00 02 or 00 42 |
| 10, 11 | MIFARE Plus X in level 2 | |
| 20 | anything speaking ISO-DEP: DESFire, NTAG 424 DNA, Plus in level 3, bank cards, JCOP | 03 44 (DESFire, 424), 03 04 with random ID |

Since every NTAG and every Ultralight answers SAK 00, telling an NTAG213 from an NTAG216 from an Ultralight EV1 needs one more command: **GET_VERSION**. It returns eight bytes, and three of them do the work. Byte 2 is the product type (03 Ultralight, 04 NTAG, 07 NTAG I2C, 01 DESFire, 02 Plus, 08 DESFire Light), byte 4 is the generation, and byte 6 encodes the storage size. This is how NFC.cool knows what it is looking at, and it is also the first thing an Amiibo-reading console asks a tag.

| Chip | GET_VERSION response |
| --- | --- |
| NTAG213 | 00 04 04 02 01 00 0F 03 |
| NTAG215 | 00 04 04 02 01 00 11 03 |
| NTAG216 | 00 04 04 02 01 00 13 03 |
| NTAG210 | 00 04 04 01 01 00 0B 03 |
| NTAG212 | 00 04 04 01 01 00 0E 03 |
| Ultralight EV1 48 B | 00 04 03 01 01 00 0B 03 |
| Ultralight EV1 128 B | 00 04 03 01 01 00 0E 03 |
| Ultralight AES | 00 04 03 0x 04 00 0F 03 |
| NTAG 223 DNA | 00 04 04 02 04 00 0F 03 |
| NTAG 424 DNA (wrapped in an APDU) | vendor 04, type 04, major 30, storage 11 |

Chips without GET_VERSION exist: the original Ultralight, Ultralight C and the old NTAG203 never had it, and neither do most clones. That absence is itself a fingerprint.

### Endurance, retention, temperature

These three are the numbers listings almost never quote and datasheets always do.

- **Write endurance** is how many times a byte can be rewritten. 100,000 cycles is the floor for anything current; the Classic-era chips and the original Ultralight are rated 10,000. DESFire EV3 and the ST25DV family are rated 1,000,000 typical.
- **Data retention** is how long the bytes survive unpowered. 10 years is the old standard, 50 years is what NXP rates NTAG 424 DNA and the ICODE SLIX family at, and ST rates the ST25TA Type 4 chips at 200 years. Retention is specified at room temperature; heat shortens it.
- **Operating temperature** is -25 to +70 °C for most NXP consumer chips, -40 to +85 °C for the ST and EM parts, and up to 105 °C for ICODE 3. The chip is usually not the limit; the adhesive and the substrate are.

### The security ladder

This is the part of a listing that lies most. "Encrypted", "secure", "anti-clone" get printed on tags whose only protection is a 32-bit password sent in the clear. Here is the ladder, bottom to top, and every chip in this guide sits on one rung.

| Rung | What it is | Chips | What it stops |
| --- | --- | --- | --- |
| 0. Nothing | anyone can read and write | original Ultralight, NTAG203, TI Tag-it Standard, Topaz | nothing |
| 1. Lock bits | one-way bits that make pages read-only forever | every Type 2 and Type 5 chip | rewriting; does not stop copying |
| 2. Password | a 32-bit password plus a 16-bit acknowledgement (PACK), with an optional failed-attempt limit; on NTAG21x the password crosses the air unencrypted | NTAG21x, Ultralight EV1, NTAG 223 DNA, ICODE SLIX family (32-bit), ST25TV (32 or 64-bit), ST25TA (128-bit) | casual rewriting by a stranger with an app; not a determined attacker with a sniffer |
| 3. CRYPTO1 | NXP's 48-bit stream cipher from the 1990s | MIFARE Classic, MIFARE Plus in level 1 | nothing since 2008; treat as rung 0 |
| 4. Triple DES | mutual authentication with a 16-byte key | Ultralight C, FeliCa Lite-S, DESFire D40 and EV1 | copying the contents without the key |
| 5. AES-128 | mutual authentication, secure messaging | Ultralight AES, NTAG 224 DNA, DESFire EV1 to EV3, DESFire Light, Plus in level 3, ICODE DNA, FeliCa Standard, EM4425 | the same, with a cipher that is still trusted |
| 6. AES plus SUN | every tap produces a fresh cryptographic proof in the URL itself | NTAG 424 DNA, NTAG 22x DNA, DESFire EV3 | cloning, because a copy cannot sign the next tap |
| 7. Tamper loop | a wire that reports, permanently, if it was ever broken | NTAG 213 TT, NTAG 424 DNA TT, NTAG 22x DNA StatusDetect, ICODE 3 TT, ST25TV02KC-T | reuse of a seal |

Two features sit beside the ladder rather than on it. An **originality signature** is a digital signature over the UID, written by the manufacturer, that lets a reader check the chip came from NXP or ST. It does not stop copying, because a clone can carry a copied signature, and NXP says so in its own application note. And **counters** (a 24-bit read counter on NTAG213/215/216, three one-way counters on Ultralight EV1, a 16-bit write counter on SLIX2) are for use cases, not security, unless they are folded into a SUN message.

---

## NDEF and what actually fits on a tag

**NDEF** (NFC Data Exchange Format) is the envelope. A phone does not read "a URL" off a tag; it reads an NDEF message containing a URI record, and the envelope has weight. Knowing the weight is how you answer "will my link fit on an NTAG213".

### The record

Every record starts with a flags byte (message begin, message end, short record, and a three-bit type name format), then the length of the type, the length of the payload (one byte if the payload is under 256 bytes, four bytes otherwise), the type itself, and the payload. A short URL record therefore costs 4 bytes of header before the first byte of your link.

| Record | Type | Payload |
| --- | --- | --- |
| URL | well-known type `U` | one prefix byte plus the rest of the URL in UTF-8 |
| Text | well-known type `T` | a status byte, a language code (`en`), then the text |
| Smart Poster | well-known type `Sp` | a whole NDEF message inside: a URL plus optional titles and an action |
| Contact | MIME `text/vcard` | the vCard text as is |
| Wi-Fi | MIME `application/vnd.wfa.wsc` | Wi-Fi Simple Configuration attributes: SSID, auth type, key |
| Android app | external type `android.com:pkg` | a package name; Android opens that app or its Play Store page |

The prefix byte is the one clever thing in the URI record. Instead of spelling out `https://`, the first payload byte is a code for a common prefix, and the phone puts it back.

| Code | Prefix | Code | Prefix |
| --- | --- | --- | --- |
| 00 | none | 12 | rtsp:// |
| 01 | http://www. | 13 | urn: |
| 02 | https://www. | 14 | pop: |
| 03 | http:// | 15 | sip: |
| 04 | https:// | 16 | sips: |
| 05 | tel: | 17 | tftp: |
| 06 | mailto: | 18 | btspp:// |
| 07 | ftp://anonymous:anonymous@ | 19 | btl2cap:// |
| 08 | ftp://ftp. | 1A | btgoep:// |
| 09 | ftps:// | 1B | tcpobex:// |
| 0A | sftp:// | 1C | irdaobex:// |
| 0B | smb:// | 1D | file:// |
| 0C | nfs:// | 1E | urn:epc:id: |
| 0D | ftp:// | 1F | urn:epc:tag: |
| 0E | dav:// | 20 | urn:epc:pat: |
| 0F | news: | 21 | urn:epc:raw: |
| 10 | telnet:// | 22 | urn:epc: |
| 11 | imap: | 23 | urn:nfc: |

So `https://nfc.cool/` is stored as the byte 04 followed by `nfc.cool/`: nine bytes of payload for a seventeen-character URL. NXP's own NTAG 5 datasheet ships the example `D1 01 0C 55 01` followed by `nxp.com/nfc`, which decodes to `http://www.nxp.com/nfc`.

### The envelope around the record

On a Type 2 or Type 5 tag the message sits inside a TLV: one byte saying "NDEF message" (03), one length byte (three bytes if the message is 255 bytes or longer), the message, and a terminator byte (FE). On a Type 4 tag there is no TLV; the NDEF file begins with a two-byte length. And on a factory NTAG213 or NTAG212 the first five bytes of user memory are already taken by a Lock Control TLV that NXP ships pre-written and every writer preserves.

Here is the arithmetic for a single `https://` link, done by hand for the chip most people buy:

- NTAG213 user memory: 144 bytes
- minus the factory Lock Control TLV: 139
- minus the NDEF TLV framing (03, length, FE): 136 bytes for the message
- minus the record header (flags, type length, payload length, `U`): 132 bytes of payload
- minus the prefix byte: **131 characters after `https://`**

### What fits where

<div class="table-scroll">

| Tag | NDEF area | URL characters after https:// | Minimal vCard (132 B, name, phone, email, URL) | Typical vCard (250 to 500 B) | Wi-Fi record (67 to 88 B) |
| --- | --- | --- | --- | --- | --- |
| NTAG210, Ultralight EV1 48 B | 48 | 40 | no | no | no |
| NTAG212 | 128 | 115 | no | no | yes |
| Ultralight EV1 128 B | 128 | 120 | no | no | yes |
| NTAG213, factory state | 144 | 131 | no, by 9 bytes | no | yes |
| NTAG213, lock TLV removed | 144 | 136 | no, by 4 bytes | no | yes |
| ST25TN01K | 160 | about 147 | yes, barely | no | yes |
| NTAG215 | 496 declared (504 user) | 483 | yes | yes, most | yes |
| NTAG216 | 872 declared (888 user) | 859 | yes | yes | yes |
| ICODE SLIX | 112 (CC inside) | 100 | no | no | yes |
| ICODE SLIX2 | 316 | about 300 | yes | usually | yes |
| NTAG 424 DNA | 256-byte NDEF file | 249 | yes | small ones | yes |
| DESFire EV3 2K | up to 2048-byte NDEF file | up to 2038 | yes | yes | yes |

</div>

Two footnotes that trip people up. NXP's own capability container on the NTAG215 and NTAG216 declares 496 and 872 bytes, less than the user memory, so Android's `getMaxSize()` reports the smaller number and it is correct. And a vCard with a name, phone, email and URL is 132 bytes before the envelope and 148 after it, which is why it does not quite fit on an NTAG213 and why business-card vendors default to the NTAG215 or NTAG216. The rounded figures I used in the beginner's guide (about 130, 480 and 850 characters) are these numbers with the edges knocked off.

---

## Memory maps: what is where on the chip

If you have ever dumped a tag in NFC.cool and stared at the hex, this is the decoder ring.

### Type 2: the NTAG213 page map

| Page | Bytes | Contents |
| --- | --- | --- |
| 00 | 4 | UID bytes 0 to 2 and a check byte |
| 01 | 4 | UID bytes 3 to 6 |
| 02 | 4 | check byte, an internal byte, two static lock bytes for pages 3 to 15 |
| 03 | 4 | capability container: E1 10 12 00 (magic, version 1.0, 18 x 8 = 144 bytes, read and write allowed) |
| 04 to 27 | 144 | user memory, where the TLVs live |
| 28 | 4 | dynamic lock bytes for pages 16 and up |
| 29 | 4 | CFG0: mirror configuration, the page the mirror lands on, and AUTH0, the first password-protected page |
| 2A | 4 | CFG1: ACCESS byte with the read-or-write protection bit and AUTHLIM, the failed-attempt limit |
| 2B | 4 | PWD, the password, write-only |
| 2C | 4 | PACK, the two-byte acknowledgement, plus two reserved bytes |

An NTAG215 has the same shape with user memory running to page 81 and the configuration at 83 to 86; an NTAG216 runs to E1 with configuration at E3 to E6. The capability container bits are one-way: once the read-only flag in byte 3 is set, or a lock bit is set, it cannot be cleared, which is what "permanent lock" in the app actually writes. A "format" on Type 2 writes an empty NDEF TLV (03 00 FE) to page 4; it does not zero the memory, so old data can still be dumped until it is overwritten.

### Type 4: the NTAG 424 DNA file system

There are no pages. An ISO 7816 application named D2760000850101 contains three files: a 32-byte capability container (E103), a 256-byte NDEF file (E104) and a 128-byte proprietary file (E105). Each file has its own read, write and change access rights, each mapped to one of five AES keys. DESFire works the same way but lets you create your own applications and files; NTAG 424 DNA's three are fixed, which is why I described it as [a small locked safe with three drawers](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/).

### Type 5: ISO 15693 blocks

Four-byte blocks, numbered from zero, with the capability container in block 0 (E1 40 followed by the size) and the NDEF TLV starting in block 1. The UID, AFI, DSFID and lock status live outside the addressable blocks and are read with a separate GET SYSTEM INFORMATION command. On an ICODE SLIX2 the last addressable block, 79, is the 16-bit counter; on ICODE 3 block 75 holds a 24-bit counter and blocks 76 and up are a separate configuration area.

### MIFARE Classic: sectors, trailers and the directory

A Classic 1K has 16 sectors of 4 blocks of 16 bytes. The last block of every sector is the **sector trailer**: key A, three access bytes, one free byte, key B. Block 0 of sector 0 is the manufacturer block with the UID. To put NDEF on a Classic, NXP defined a directory: sector 0 becomes the **MIFARE Application Directory** (MAD), readable with the public key A0 A1 A2 A3 A4 A5, and it lists which sectors hold NDEF under the application code 03 E1. Those sectors use a second public key, D3 F7 D3 F7 D3 F7. A factory-fresh card has every key set to FF FF FF FF FF FF. When NFC.cool on Android formats a Classic card, this directory and these keys are what it writes, and it is the reason a formatted Classic card reads on some Android phones and on no iPhone.

---

## The decision table

Start here if you know the job and want the chip.

| The job | The chip | Why | NFC.cool support |
| --- | --- | --- | --- |
| a link, a Wi-Fi network, a Shortcut trigger, a sticker on a thing | NTAG213 | 131 characters of URL, password, counter, eight cents | full on iPhone, Android, iPad and Mac |
| a contact card, a longer link, anything with room to grow | NTAG216 | 859 characters, the same features, the chip I test against | full |
| Amiibo | NTAG215 | the console checks for exactly this chip and its 504 bytes | backup and restore on both platforms |
| counting taps on a poster, a business card, a demo unit | NTAG213, 215 or 216 | the hardware read counter and the ASCII mirror, and the three chips the app's Tap Counter supports | [Tap Counter](/blog/count-nfc-tag-scans/) on both platforms |
| a tiny antenna, a ring, a cheap disposable | NTAG 210µ or Ultralight EV1 48 B | 48 bytes, 17 pF for small coils, no password | read and write |
| proving a product is genuine, one tap, no app | NTAG 424 DNA | every tap signs itself with AES-128; a copy cannot | full configuration, including the signature check |
| the same, but as a cheap Type 2 sticker | NTAG 223 DNA | SUN on a Type 2 chip, 144 bytes | shows as a Type 2 tag; SUN setup not supported yet |
| a seal that reports when it was opened | NTAG 213 TT, NTAG 424 DNA TT, ST25TV02KC-T | a tamper wire, permanently remembered | 424 TT fully; the others read as their base chip |
| inventory or a library at arm's length with a gate reader | ICODE SLIX2 or ICODE 3 | ISO 15693 reads at 1 to 1.5 metres on a proper reader, still taps on a phone | read, write, format on both platforms |
| a 3D-printer spool the printer itself must read | ICODE SLIX2 | the [OpenPrintTag](/blog/openprinttag-read-write-nfc-spools-phone/) standard expects NFC-V | read and write |
| a door, a turnstile, a transit system | DESFire EV3 or MIFARE Plus EV2 | AES, real key management, certified security | identifies and dumps what is public; no key operations |
| a battery-free sensor talking to a microcontroller | NTAG I2C plus, ST25DV, NTAG 5 | an I2C interface and energy harvesting on the same die | reads as its NFC face |
| anything in Japan's transit or e-money world | FeliCa | that is what the readers speak | read; NDEF write on Lite-S and Standard on iPhone |
| a tag on a metal surface | any of the above in an on-metal form factor | the ferrite layer, not the chip, is what makes it work | as the chip |
| under the skin | NTAG216 (xNT), NTAG I2C (xSIID), DESFire (xDF) | small glass antennas need the phone's sweet spot | as the chip |

What is not in the table: MIFARE Classic. There is no job in 2026 for which I would buy a Classic chip, and the section below explains why.

---

## Family by family

Each family gets the same treatment: a spec table from the datasheet, what the chip is for, what the phones do with it, and a hands-on note where I have one.

### NTAG 21x: the sticker family

This is the chip in nearly every NFC sticker, coin and card sold to consumers, and NXP still lists all of them as active in 2026 even though the datasheet has not changed since 2015.

<div class="table-scroll">

| Chip | User / total bytes | Password | Counter | Mirror | Signature | Endurance / retention | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 210µ | 48 / 64 | no | no | no | yes, reprogrammable | 100k / 10 years | active |
| NTAG210 | 48 / 80 | 32-bit + PACK, AUTHLIM | no | UID | yes | 100k / 10 years | active |
| NTAG212 | 128 / 164 | yes | no | UID | yes | 100k / 10 years | active |
| NTAG213 | 144 / 180 | yes | 24-bit read counter | UID and counter | yes | 100k / 10 years | active |
| NTAG215 | 504 / 540 | yes | yes | yes | yes | 100k / 10 years | active |
| NTAG216 | 888 / 924 | yes | yes | yes | yes | 100k / 10 years | active |
| NTAG213F, NTAG216F | 144 or 888 | yes | yes | yes | yes | 100k / 10 years | active; adds a field-detect pin and a sleep mode for embedding in electronics |
| NTAG 213 TT | 144 / 184 | yes | yes | UID, counter and tamper status | yes | 100k / 10 years | active; adds a tamper wire |
| NTAG203 | 144 / 168 | no, a 32-bit OTP area | 16-bit write counter | no | no | 10k / 5 years | end of life, replaced by NTAG213 |

</div>

All of them are NFC Forum Type 2, ISO/IEC 14443 Type A, 7-byte UID, 106 kbit/s, rated -25 to +70 °C. The NTAG210 and NTAG212 come with a 17 pF input capacitance for small antennas; the 213, 215 and 216 are 50 pF. The originality signature is ECDSA on the secp128r1 curve, 32 bytes, read with the READ_SIG command; the verification key is in an NXP application note that is not public, which is why almost no consumer app checks it.

The three features that matter in practice are the **password** (a 32-bit PWD, a 16-bit PACK the tag answers with, AUTH0 to say where protection starts, and AUTHLIM to brick the tag after a chosen number of wrong guesses), the **NFC counter** (24 bits, incremented once per read session, readable with a dedicated command), and the **ASCII mirror**, which pastes the UID and the counter as text into your NDEF message so a plain URL becomes `https://example.com/?u=04A1...&c=000123` on every tap. The Philips Sonicare brush heads I wrote about use an NTAG213 with AUTHLIM set to three, which is how [a brush head locks itself](/blog/reset-sonicare-brush-head-nfc/) if you guess wrong.

> **Hands-on:** these are the chips I test every release against, and the NTAG216 is the one I recommend when someone wants to buy one pack and stop thinking about it. The password is worth setting on anything you leave in public; it stops the person with a free app, which is most people. It does not stop anyone with a sniffer, because the password itself travels over the air unencrypted, and I say that plainly in the app.

On the phones: NDEF read and write on everything, iPhone background reading of URL records, and raw access on both platforms for the password, counter and mirror. NFC.cool does all of that on iPhone, Android and through a USB reader on iPad and Mac.

### NTAG DNA: the ones that sign every tap

Three generations, two of them still made.

<div class="table-scroll">

| Chip | Forum type | User bytes | Keys | SUN | Signature | Endurance / retention | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 413 DNA | Type 4 | 160 (32 CC + 128 NDEF) | 3 AES-128 | yes, 24-bit counter | ECC | 200k / 50 years | no longer manufactured |
| NTAG 424 DNA | Type 4 | 416 (32 + 256 + 128) | 5 AES-128, LRP option, Random ID option | yes, with encrypted UID option | ECDSA secp224r1, 56 bytes, plus AES originality keys | 200k / 50 years | active; Common Criteria EAL4 |
| NTAG 424 DNA TT | Type 4 | 416 | 5 AES-128 | yes, plus tamper status in the message | same | 200k / 50 years | active |
| NTAG 223 DNA | Type 2 | 144 / 240 | one 16-byte SUN key plus a 32-bit password | yes, 24-bit counter | ECDSA secp192r1, 48 bytes | 100k / 10 years | active since February 2022 |
| NTAG 224 DNA | Type 2 | 208 / 304 | AES-128 mutual authentication replaces the password | yes | same | 100k / 10 years | active |
| NTAG 223 and 224 DNA StatusDetect | Type 2 | as above | as above | yes, with sensor status in the message | same | 100k / 10 years | active |

</div>

**SUN**, Secure Unique NFC, is the feature that makes these worth three times the price of an NTAG213: the tag mirrors its UID and read counter into the URL and appends an AES-128 CMAC over them, computed fresh on every tap. The server checks the MAC; a cloned tag has no key and fails. I went through all of it, including LRP mode and the five keys, in [the NTAG 424 DNA post](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/), so here is only what changed since: NXP now also sells the NTAG 426Q DNA and the NTAG X DNA, a 16 kB connected Type 4 chip certified to EAL6+, so the 424 is no longer the newest DNA chip, just the one you can actually buy as a sticker.

The 22x DNA family is the interesting newcomer: SUN on a Type 2 chip, which means the sticker is cheaper and the phone reads it as a plain NTAG. The **StatusDetect** variants add a sensor: either a conductive loop that records, irreversibly, that it was broken, or a capacitance measurement from 0 to 11 pF between two pins, which NXP pitches for liquid level, humidity and pressure.

> **Hands-on:** I bought my first NTAG 424 DNA tags on AliExpress for a few euros and built the app's whole 424 feature set around them: key changes, SUN in plain and encrypted modes, file access rights, the vault file, tamper status. The 424 is also the one chip where NFC.cool verifies the originality signature against NXP's published public key and shows "Genuine NXP". The 22x DNA I have only on paper.

### MIFARE Ultralight: the ticket family

Ultralight is NTAG's older sibling. Same air interface, same 4-byte pages, same SAK, and from EV1 on the same commands. The difference is intent: Ultralight was built for single-trip tickets and the NTAG line for stickers with a URL, which is why NTAG ships with a pre-written capability container and Ultralight does not.

<div class="table-scroll">

| Chip | User / total bytes | Protection | Counter | Signature | Endurance / retention | Status |
| --- | --- | --- | --- | --- | --- | --- |
| MIFARE Ultralight (MF0ICU1) | 48 / 64 | lock bits and a 32-bit OTP area | no | no | 10k / 5 years | no longer manufactured |
| Ultralight C | 144 / 192 | triple DES mutual authentication, 16-byte key | 16-bit one-way | no | 100k / 10 years | not recommended for new designs, replaced by Ultralight AES |
| Ultralight EV1 | 48 / 80 or 128 / 164 | 32-bit password, AUTHLIM | three independent 24-bit one-way counters | yes, 32 bytes | 100k / 10 years | active |
| Ultralight AES | 144 / 240 | AES-128 mutual authentication, CMAC messaging, Random ID option | three 24-bit counters | yes, plus an AES originality key | 100k / 10 years | active since February 2022, Common Criteria EAL3+ |
| Ultralight Nano | 40 / 56 | lock bits and OTP | no | yes | 100k / 10 years | gone from NXP's catalog without a notice I could find |

</div>

The Ultralight EV1's three one-way counters are its distinguishing feature: a transit operator burns a count down and the chip refuses to go back up. The Ultralight AES is the quiet answer to "I want an NTAG213 with real authentication": same 144 bytes, AES-128 instead of a password, on a Type 2 tag any phone can read.

On the phones: everything here reads as a Type 2 tag. Apple's Core NFC exposes an `.ultralight` family and lets an app send native commands; Android has a `MifareUltralight` class that is optional but present on every phone I have seen. NFC.cool names the EV1 variants and the AES from GET_VERSION and treats the password on EV1 like NTAG's; the AES authentication itself is not something the app does.

### MIFARE Classic, Plus and DESFire: the access-control family

Three families in one section because they are one story: Classic was broken, Plus was the migration path, DESFire is where the industry ended up.

**MIFARE Classic** is the chip in your old hotel key, your gym card and a great many office badges. It is not an NFC Forum tag type. It has its own cipher, CRYPTO1, which two research groups reverse-engineered in 2008: Nohl and Plötz by looking at the silicon under a microscope, and the Radboud University group by watching the protocol, who recovered a key "from just one or two authentication attempts with a genuine reader in less than a second". NXP went to court to stop the second paper and lost. Sixteen years later, in August 2024, Quarkslab published a hardware backdoor in the Fudan FM11RF08S, the most common Classic-compatible chip of the last five years, and found an older backdoor key shared by earlier Fudan chips, some Infineon chips and even some NXP chips from around 2000. Classic is not a security product, and NXP's own product page for the Classic EV1 now says "not recommended for new designs" and points to DESFire Light.

<div class="table-scroll">

| Chip | User / total bytes | UID | Protection | Endurance / retention | Status |
| --- | --- | --- | --- | --- | --- |
| Classic Mini | 224 / 320 | 4-byte | CRYPTO1 | 100k / 10 years | discontinued |
| Classic 1K | 752 / 1024 | 4-byte NUID | CRYPTO1 | 100k / 10 years | discontinued; EV1 not recommended for new designs |
| Classic 4K | 3440 / 4096 | 4-byte NUID | CRYPTO1 | 100k / 10 years | discontinued; EV1 not recommended |
| Classic EV1 1K and 4K | as above | 7-byte or 4-byte, random ID option | CRYPTO1; originality check on the 1K only | 100k minimum / 10 years | not recommended for new designs |

</div>

The straight iPhone answer, because I get asked weekly: **an iPhone cannot read the contents of a MIFARE Classic card, and no app can change that.** Apple's Core NFC has no Classic family in its API and the documentation for its MIFARE command says outright that it "doesn't support the Crypto1 protocol". The phone sees the UID and the SAK, my app names the family from those, and that is the end of it. Android is different: the `MifareClassic` class is optional, implemented by phones whose NFC controller has CRYPTO1 in hardware (NXP's controllers do; the Broadcom chips in a generation of Nexus and Galaxy phones did not), and on those phones NFC.cool reads every sector the factory key opens and can format a fresh card for NDEF.

**MIFARE Plus** is Classic's memory map with AES-128 bolted on, so an operator could swap cards first and readers later. It runs in security levels: SL1 behaves like a Classic (with optional AES), SL3 is AES only over ISO-DEP, and the Plus X had an SL2 in between. Plus S and Plus X are discontinued; Plus SE (a 1K, 752 bytes) and Plus EV2 (2K or 4K, EAL5+, 25-year retention, 1,000,000-cycle typical endurance) are current. In SL1 a phone sees SAK 08 or 18, the same as a Classic; in SL3 it sees an ISO-DEP card.

**MIFARE DESFire** is a different animal: a small file system with applications, files, per-file access rights and up to 14 keys per application, speaking APDUs over ISO-DEP at up to 848 kbit/s.

<div class="table-scroll">

| Chip | Usable memory | Crypto | Extras | Endurance / retention | Status |
| --- | --- | --- | --- | --- | --- |
| DESFire D40 | 4 kB | DES, triple DES | | 100k / 10 years | phased out 2011; its keys were recovered by power analysis the same year |
| DESFire EV1 | 2304, 4864 or 7936 bytes | DES, 3DES, AES-128 | NFC Forum Type 4 capable, random ID | 200k minimum / 10 years | not recommended for new designs |
| DESFire EV2 | 2560, 5120, 8192 or 16384 bytes | AES-128, EAL5+ | transaction MAC, proximity check, originality signature | 200k / 25 years | not recommended for new designs |
| DESFire EV3 | 2560, 5120, 8192 or 16384 bytes | AES-128, EAL5+ | everything in EV2 plus SUN/SDM and a transaction timer; NFC Forum Type 4 certificate 58652 | 200k minimum, 1M typical / 25 years, -25 to +85 °C | active |
| DESFire Light | 640 bytes | AES-128 only, LRP option, EAL4 | one fixed application with six files | 200k / 10 years | active |

</div>

The "2K" in a DESFire name is not 2048 bytes of anything you can use directly. NXP's comparison note gives the usable figures in the table, and every application and file you create takes a slice for its own headers, allocated in 256-byte pages. Ask the card with the FreeMemory command rather than trusting the label. DESFire EV3 also brought SUN to the family, so an EV3 can do the NTAG 424 DNA trick of signing a URL, which the EV2 cannot.

On the phones: iOS delivers DESFire as a `.desfire` MIFARE tag, or as an ISO 7816 tag if the app asks for the NDEF application; Android uses `IsoDep`. NFC.cool identifies the generation and size from GetVersion and lists the applications and files it is allowed to see without keys. It does not authenticate to a DESFire or write to one; that is a job for the operator's own tooling, and I would rather say so than pretend.

### ISO 15693: the long-range family

These are the chips that were designed for a metre, not a centimetre. A phone still reads them (Apple since iOS 13, Android through `NfcV`), and GoToTags measured Type 5 tags reading at roughly twice the distance of Type 2 tags on an iPhone, but their home is the library gate, the warehouse shelf and the laundry. The UID is 8 bytes starting with E0, blocks are 4 bytes, and the family adds three things Type A chips do not have: an **AFI** (an application family byte a reader can filter on), a **DSFID** (a data format byte), and **EAS**, the electronic article surveillance bit that makes a shop gate beep.

**NXP ICODE.** The lineage runs SLI (2000), SLI-S and SLI-L (2007), SLIX and its S and L variants (2010), SLIX2 (2014), ICODE DNA (2016) and ICODE 3 (2024). There is no "SLIX3"; a listing that says so means ICODE 3 or is guessing.

<div class="table-scroll">

| Chip | User / total bytes | Protection | Counter | Signature | Endurance / retention | Status |
| --- | --- | --- | --- | --- | --- | --- |
| ICODE SLI | 112 / 128 | lock bits only | no | no | 100k / 10 years | end of life |
| ICODE SLI-S | 160 / 256 | five 32-bit passwords: read, write, destroy, privacy, EAS | no | no | 100k / 10 years | no longer manufactured |
| ICODE SLI-L | 32 / 64 | three passwords | no | no | 100k / 10 years | no longer manufactured |
| ICODE SLIX | 112 / 128 | one 32-bit password for EAS and AFI | no | no | 100k / 50 years | not recommended for new designs |
| ICODE SLIX-S | 160 / 256 | five 32-bit passwords, privacy mode, destroy | no | no | 100k / 50 years | active |
| ICODE SLIX-L | 32 / 64 | three passwords | no | no | 100k / 50 years | active |
| ICODE SLIX2 | 316 / 320 | five 32-bit passwords, privacy mode, destroy | 16-bit, advanced by a write command | yes, 32 bytes | 100k / 50 years | active |
| ICODE DNA | 252 / 256 | AES-128 mutual authentication, three keys | 16-bit | yes, reprogrammable | 100k / 50 years | active |
| ICODE 3 | 300 / 304 plus a 192-byte configuration area | six 32-bit passwords, two privacy modes | 24-bit, can count taps like an NTAG | yes, 32 or 48 bytes, reprogrammable | 100k / 50 years, up to 105 °C | active; TagTamper variant available |

</div>

ICODE 3 is the one to know about: it mirrors the UID and its tap counter into the NDEF message the way an NTAG213 does, reads at up to 212 kbit/s, and self-tunes its antenna. It does not have AES; the ICODE DNA is the AES part, and neither of them does SUN.

**STMicroelectronics ST25TV and ST25DV.** ST's Type 5 line, and the one with the best datasheet numbers in the whole guide.

<div class="table-scroll">

| Chip | User bytes | Protection | Counter | Signature | Endurance / retention | Status |
| --- | --- | --- | --- | --- | --- | --- |
| ST25TV512, ST25TV02K | 64 or 256 | 32 or 64-bit passwords, kill, untraceable mode, tamper on the -AD variant | 16-bit write event counter | TruST25 | 100k / 60 years | not recommended for new designs |
| ST25TV512C, ST25TV02KC | 64 or 320 | passwords, kill, silent and discreet modes, tamper on the -T variant | none; a 3-digit unique tap code instead | TruST25 | 100k / 60 years | active, available until 2035 |
| ST25TV04K-P | 512 | 64-bit passwords, kill | no | no | 1M / 40 years | active; has an energy-harvesting pin |
| ST25TV16K, ST25TV64K, and the KC versions | 2048 or 8192 | 64-bit passwords, kill | no | no | 1M / 40 years | K parts not recommended, KC parts active |
| ST25DV04K, 16K, 64K and the KC versions | 512, 2048 or 8192 | three 64-bit RF passwords plus an I2C password | no | no | 1M / 40 years | K parts not recommended, KC parts active |
| M24LR04E, 16E, 64E | 512, 2048 or 8192 | 32-bit passwords | no | no | 1M / 40 years | not recommended for new designs |

</div>

The ST25TV02KC's **Augmented NDEF** deserves a paragraph because it gets sold as security. The chip inserts its UID, a custom field and a three-character **unique tap code** into the URL on every read, without touching the EEPROM. The tap code changes per tap and ST's datasheet says in so many words that it is "predictable". It is a freshness token that tells your server this is a new tap, not proof that the tag is genuine. TruST25, ST's originality signature over the UID, is the genuineness feature, and like NXP's it is a static signature that a clone can copy.

**The rest of the Type 5 world.** Texas Instruments' Tag-it HF-I inlays (Standard 32 bytes, Pro 32 bytes with a password-protected write and a kill command, Plus 256 bytes) are in every library that installed NFC before 2015 and every one of them is now marked not recommended or obsolete. EM Microelectronic's EM4233 (208 bytes, a 96-bit key privacy mode, 60-year retention) is available on request. Infineon's my-d and Fujitsu's MB89R118 show up in NFC.cool's identification code because users sent them in. NXP's NTAG 5 (link, boost, switch) is an ISO 15693 chip despite the NTAG name, with 2048 or 512 bytes, an I2C port, energy harvesting up to 30 mW and a 1,000,000-cycle, 40-year EEPROM: a connected tag for electronics, not a sticker, and software written for NTAG21x will not talk to it.

> **Hands-on:** the SLIX2 is the chip inside every OpenPrintTag filament spool, so I have handled a good number of them and NFC.cool reads, writes and formats them on both platforms. What the app does not do, and I want to be clear about it, is the ISO 15693 password, privacy, EAS and AFI commands. The command bytes are in the code as a reference table; the buttons are not there yet.

### Type 4 outside MIFARE: ST25TA

ST's ST25TA family are Type 4 tags on ISO/IEC 14443 Type A without any of the DESFire machinery: one NDEF file, a capability container file and a system file, two 128-bit passwords (read and write), and a 20-bit event counter that can count reads or writes.

<div class="table-scroll">

| Chip | NDEF file | Passwords | Counter | Signature | Endurance / retention | Status |
| --- | --- | --- | --- | --- | --- | --- |
| ST25TA512, ST25TA512B | 64 bytes | two 128-bit | 20-bit on the B | TruST25 on the B | 1M / 200 years | 512 not recommended |
| ST25TA02K, ST25TA02KB (-P, -D) | 256 bytes | two 128-bit | 20-bit | TruST25 on the B | 1M / 200 years | 02K and 02KB not recommended; 02KB-P and 02KB-D active |
| ST25TA16K, ST25TA64K | 2048 or 8192 bytes | two 128-bit | no | no | 1M / 200 years | active |

</div>

Two hundred years of retention and a million write cycles, at 106 kbit/s only. The -P and -D variants have a general purpose output pin that toggles when the tag is read, which is how you make a lamp react to a phone. On both phones these read as Type 4 tags; NFC.cool reads and writes NDEF on them and shows the ISO-DEP details.

### Sensor and dual-interface chips

These are chips with two faces: an NFC antenna on one side and an I2C bus, a sensor or a second radio on the other.

| Chip | NFC side | Other side | Memory | Notable |
| --- | --- | --- | --- | --- |
| NTAG I2C plus (NT3H2111, NT3H2211) | Type 2, 888 or 1912 bytes, 32-bit password, signature | I2C up to 400 kHz, 64-byte SRAM pass-through, field-detect pin | 200k to 500k / 20 years | energy harvesting up to 15 mW; the chip in the xSIID implant |
| ST25DV (see above) | Type 5 | I2C up to 1 MHz, a 256-byte mailbox for streaming | 1M / 40 years | energy harvesting on the V_EH pin, unregulated, "some µW" per the datasheet |
| NTAG 5 link, boost, switch | Type 5, 2048 or 512 bytes, AES on the 5332 | I2C, GPIO, PWM outputs | 1M / 40 years | up to 30 mW harvesting; the switch variant needs no microcontroller at all |
| NHS3100 | Type 2, emulated by firmware | a Cortex-M0+ with a temperature sensor accurate to 0.3 °C | 32 kB flash, 4 kB EEPROM | a cold-chain logger on a foil, NFC Forum certified |
| EM4423 "em echo" | Type 2, 240 bytes NDEF area | UHF RAIN RFID, same memory, same serial | 100k / 10 years | discontinued |
| EM4425 "em echo-V" | Type 5, up to 256 bytes shared | UHF RAIN RFID, AES-128, tamper pads, digital signature | 100k / 50 years | current; one die readable by a phone at a centimetre and by a UHF dock-door reader at metres |

I have not built anything with these, so this table is datasheet only. They matter to the guide because they show up in listings as "NFC chip" and confuse people: an NTAG 5 is not an NTAG213 and an em echo tag will not do anything special on your phone.

### Legacy and niche

**Topaz** (Innovision, later Broadcom) is NFC Forum Type 1: 8-byte blocks, 96 or 512 bytes, one-time locks, 10,000 write cycles. Both phones still read NDEF from a Topaz, but the NFC Forum removed Type 1 from its 2021 specification set and nobody designs it in any more. Resellers still have stock.

**FeliCa** is Sony's family and Japan's public transport. FeliCa Lite-S (224 bytes of user memory in 16-byte blocks, an 8-byte IDm, a streamlined triple-DES MAC) is the tag version and NFC Forum Type 3; FeliCa Standard is the smart-card version, now with AES and a Common Criteria EAL6+ rating on the current RC-SA01, and it is what Suica, PASMO, Edy, WAON, nanaco and Hong Kong's Octopus run on. Sony's FeliCa Plug modules were discontinued in March 2026. NFC.cool names the transit and e-money brands from the system code on both platforms, reads Lite-S and Standard, and writes NDEF to them on iPhone.

**Kovio NFC Barcode** was a printed-silicon, read-only, 16-byte tag. Android still has an `NfcBarcode` class for it. Kovio's assets went to Thinfilm in 2014, Thinfilm stopped NFC production in 2019 and renamed itself in 2021. The class is a fossil.

**ISO 14443 Type B memory chips.** ST's SRI512, SRT512 and SRI4K (512 or 4096 bits in 32-bit blocks, two count-down counters, 1,000,000 cycles, 40 years) live in French and Belgian transit and in some ski passes. Android exposes them through `NfcB`; the iPhone has no raw Type B tag object at all, so unless a Type B card speaks ISO-DEP and answers a SELECT, an iPhone will not see it. Calypso, the Paris Navigo system, is a Type B smart card that does.

### Clones and compatibles

This is the section the listings do not want you to read.

**Fudan FM11NT021** is the most common "NTAG213" that is not an NTAG213. It has the same 180 bytes in 45 pages, the same 144-byte user area, a password, a 24-bit read counter and a Fudan manufacturer code of 1D in the UID. It does not implement GET_VERSION and its current datasheet lists no READ_SIG command, so a reader that asks either question gets silence and falls back to guessing from memory size, which is why the Proxmark3 community reports it as an NTAG203. Fudan also makes 504 and 888-byte versions (FM11NT041, FM11NT081). For a link on a sticker they work. For Amiibo they do not, because the console asks GET_VERSION first.

**Fudan FM11RF08 and FM11RF08S** are the Classic-compatible chips in most cheap "1K" cards. The 08S added countermeasures against the known Classic attacks in 2020 and then turned out to carry a hardware backdoor key common to every card made, which Quarkslab published in 2024 along with tooling that is now in the Proxmark3 firmware.

**Magic MIFARE Classic cards** are chips built so the UID and the manufacturer block can be rewritten, which a real Classic never allows. The generations are a hobby of their own:

| Generation | How it changes UID | Detectable | Notes |
| --- | --- | --- | --- |
| Gen1a, Gen1b | a backdoor wake-up command | yes, any reader can probe for the backdoor | the original "Chinese magic card"; access systems filter it |
| Gen2, CUID | a normal write to block 0 after authenticating | no backdoor to probe; a reader has to try a write | phone-compatible, the common one today |
| FUID, UFUID | once, or until sealed | before sealing | one-shot cards for cloning a badge permanently |
| Gen3, APDU | special APDU commands | a reader that knows the commands | |
| Gen4 GTU, GDM, "Ultimate" | a password-protected configuration; can also emulate Ultralight and NTAG | only while the password is default | a 7-byte-UID, any-family chameleon in card form |

Magic NTAG21x cards exist too, and the fully emulating ones will even accept a copied originality signature, which is the point NXP makes about static signatures.

**"NTAG215 compatible" for Amiibo.** An Amiibo is a plain NTAG215 whose 540 bytes carry data encrypted and signed with keys derived from the tag's own UID. Copy the bytes to another tag and the signatures no longer match, which is why a backup has to be re-keyed to the target UID, which is what NFC.cool's [Amiibo backup and restore](/blog/amiibo-iphone-android-read-collect-backup/) does. The console's read sequence starts with GET_VERSION, then a password authentication derived from the UID, then a read of all 135 pages including the configuration ones. A chip that lacks GET_VERSION or has 45 pages instead of 135 fails at step one. TagMo's documentation puts it in one line: only NTAG215 is recognised.

**How a clone shows up in the app.** NFC.cool identifies by GET_VERSION first. A chip that does not answer it, or answers with a memory size that does not match what it advertises, is named by what it actually is, not by the listing. On an NTAG 424 DNA the app goes one step further and verifies the ECDSA originality signature against NXP's public key, which is the only place in the app that can say "Genuine NXP" with cryptographic backing. For NTAG21x the app does not read the signature, partly because NXP's verification key is under NDA and partly because a copied static signature passes anyway. The honest chain of evidence for a Type 2 tag is manufacturer code, GET_VERSION, memory size, and the presence of the features the chip claims.

---

## Form factors and read range

The chip decides what the tag can do; the form factor decides whether the phone can reach it.

| Form factor | What it is | Typical antenna | Phone read range | Ratings and notes |
| --- | --- | --- | --- | --- |
| Wet inlay | the etched antenna and chip on a PET film with adhesive and a release liner | 22 to 38 mm | 2 to 4 cm | the cheapest way to buy a chip; sticks once |
| Dry inlay | the same without adhesive | as above | as above | for laminating into something else |
| Paper or PET sticker | an inlay with a printable face | 22 to 38 mm | 2 to 4 cm | a paper face prints, a PET face survives water |
| PVC card | ISO 7810 ID-1, 85.60 x 53.98 mm, 0.76 mm thick | the whole card | 3 to 5 cm | the largest antenna you will hold; also the reader's design target |
| Coin, epoxy token | an inlay under a hard resin dome, often with a hole | 20 to 30 mm | 2 to 3 cm | waterproof; the Amiibo form factor |
| Keyfob | an inlay in an ABS shell | 20 to 30 mm | 2 to 3 cm | a GoToTags fob is rated IP67 and -25 to +75 °C |
| Wristband | silicone with an inlay | 20 to 25 mm | 1 to 3 cm | festivals, pools; the band bends, the inlay should not |
| On-metal | an inlay with a ferrite sheet between antenna and metal | 22 to 34 mm | 2 to 3 cm on metal | Seritag measures 21 to 25 mm on metal against 26 to 30 mm off it for the same 22 mm tag; the industrial 34 mm version reads at 31 to 40 mm and is IP68, -25 to +85 °C |
| Laundry tag | a chip in a PPS button | 16 mm | 1 to 2 cm | Smartrac rates its HF laundry tag for 200 wash cycles, -30 to +200 °C and 60 bar; most laundry tags are UID-only ISO 15693 |
| Implant | a chip in a 2 x 12 mm glass capsule or a flexible polymer | a few millimetres | needs the phone's exact sweet spot | the xNT is an NTAG216, the NExT adds a 125 kHz T5577, the xSIID is an NTAG I2C plus with an LED, the xDF is a DESFire; the flex versions read much better than the glass ones |

Two physical rules explain most "it does not read" tickets. **Antenna size sets range**, roughly: a card reads from further than a coin, a coin from further than a 10 mm inlay, and an implant needs contact. **Metal detunes the antenna**: a coil on a metal surface induces eddy currents in the metal, its inductance drops and its resonance drifts away from 13.56 MHz, so a normal tag on a steel cabinet is dead. A ferrite sheet between the coil and the metal redirects the field and brings the tag back, at the price of a shorter range and a higher cost, which is why on-metal tags cost three times as much.

Where to hold the phone matters as much as the tag. On an iPhone the antenna is at the top edge; Apple's own instruction is "hold the top of your iPhone near" the tag. On Android it varies by model, usually the centre of the back or near the camera. The [beginner's guide](/blog/nfc-tags-beginners-guide/) has the walkthrough.

---

## What reads what

The phone and reader matrix. Phone columns come from Apple's and Google's documentation and from my own app; the desktop and hobbyist columns are from the vendors' spec sheets and the projects' own documentation, and I have not tested those devices myself except the readers named in the iPad and Mac column.

<div class="table-scroll sticky-first">

| Chip family | iPhone background | iPhone in an app | Android | iPad and Mac with a USB reader | Web NFC (Chrome on Android) | ACR122U | ACR1552U, OMNIKEY 5022 | PN532 board | Proxmark3 | Flipper Zero |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG21x, Ultralight EV1, other Type 2 | URL records only | NDEF, password, counter, mirror, dump | same | same, through NFC.cool | NDEF only | yes | yes | yes | yes, plus emulation | yes, plus emulation |
| NTAG 22x DNA | URL records | NDEF, raw commands | same | as Type 2 | NDEF | yes | yes | yes | yes | reads as NTAG |
| NTAG 424 DNA, ST25TA, DESFire as Type 4 | URL records | NDEF, APDUs | NDEF, APDUs | NDEF, full 424 configuration | NDEF | yes | yes | yes | yes | reads NDEF; no key operations |
| Ultralight C | NDEF if formatted | NDEF, native commands | same | NDEF | NDEF | yes | yes | yes | yes | yes |
| Ultralight AES | NDEF if formatted | NDEF, native commands | same | NDEF | NDEF | yes | yes | yes | yes | reads as Ultralight |
| MIFARE Classic | no | UID and family only | full read and write on phones whose controller has CRYPTO1 | NDEF read only, well-known keys | no | yes, with keys | yes, with keys | yes, with keys | yes, plus key recovery and emulation | yes, plus key recovery and emulation |
| MIFARE Plus | no | UID in SL1; ISO-DEP in SL3 | as Classic in SL1; IsoDep in SL3 | UID | no | yes | yes | yes | yes | not documented |
| DESFire, native | no | family and version, APDUs | IsoDep | version | no | yes | yes | yes | yes | read and save only |
| ISO 15693: ICODE, ST25TV, ST25DV, TI, EM | URL records | full ISO 15693 command set since iOS 13 | NfcV | not exercised | NDEF | no | yes | no | yes, plus emulation | yes, plus emulation |
| FeliCa Lite-S and Standard | URL records | read and write, with the system code declared | NfcF | read; write on FeliCa through NFC.cool | NDEF | yes | UID only on the OMNIKEY | yes | yes | Lite-S read and emulate |
| Topaz (Type 1) | NDEF | NDEF | NDEF | not exercised | NDEF | yes | not documented | yes | yes | not documented |
| ISO 14443 Type B memory (SRI512) | no | no | NfcB | not exercised | no | yes | yes | reader only | yes | UID only |
| 125 kHz badges, pet chips, UHF labels | no | no | no | no | no | no | no | no | 125 kHz yes | 125 kHz yes |

</div>

A few rows deserve a sentence.

- **iPhone background reading** fires only for an NDEF URL record, only when the phone is unlocked and in use, and not while the camera, Wallet, a reader session or airplane mode is active. It never reads a raw chip. iPhone XS and later.
- **Which iPhones read tags at all:** iPhone 7 and later inside an app, per Apple's WWDC 2019 session. Writing and raw commands arrived with iOS 13.
- **Android's `MifareClassic` class is optional.** Google's own words: "if it is not implemented, then MifareClassic will never be enumerated". It is the controller, not the Android version.
- **Web NFC** is NDEF only, Chrome 89 and later, Android only, and Apple has a negative position on it, so there will be no Safari version. That is why the [online NFC reader](/online-nfc-reader/) on this site works on Android and tells iPhone users to use the app.
- **iPad and Mac have no NFC radio.** Since NFC.cool 6.15.0 the app talks to a USB CCID reader through Apple's smart-card stack instead; the HID OMNIKEY 5022 CL is the one I tested, the ACS ACR1552U-M1 and ACR1255U-J1 were reported working by users, and [the post](/blog/nfc-reading-ipad-mac/) lists the limits. Setting an NTAG password works through a reader; removing one needs a command the OMNIKEY refuses, so that one is a phone job.
- **The ACS ACR122U does not do ISO 15693**, and neither does the ACR1252U or the ACR1255U-J1. In the ACS line only the ACR1552U does. The OMNIKEY 5022 does both. Worth knowing before buying a reader for library tags.
- **Proxmark3 and Flipper Zero** are the tools that can recover MIFARE Classic keys and emulate cards. That is what they are for, and the guide mentions them because "what reads it" would be dishonest without them.

<div class="table-scroll">

| Reader | Interface | Type A | Type B | FeliCa | ISO 15693 | 125 kHz | Classic with keys | Classic key recovery | Emulation | Price seen in September 2026 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ACS ACR122U | USB, PC/SC | yes | yes | yes | no | no | yes | no | no | about USD 40 to 50; ACS has ended it, counterfeits are common |
| ACS ACR1252U | USB, PC/SC | yes | yes | yes | no | no | yes | no | card emulation mode | USD 97.50 |
| ACS ACR1552U | USB, PC/SC | yes | yes | yes | yes | no | yes | no | card emulation mode | USD 44.81 |
| ACS ACR1255U-J1 | Bluetooth and USB | yes | yes | yes | no | no | yes | no | no | USD 64.81 |
| HID OMNIKEY 5022 CL | USB, PC/SC | yes | yes | UID only | yes | no | yes | no | no | EUR 69.99 |
| PN532 breakout | SPI, I2C, UART | yes | reader only | yes | no | no | yes | host tools | Classic 1K/4K and FeliCa | USD 24 to 40 |
| Proxmark3 RDV4 | USB, BLE option | yes | yes | yes | yes | yes | yes | yes | yes | EUR 329 to 529 |
| Proxmark3 Easy | USB | yes | yes | yes | yes | yes | yes | partial | yes | EUR 78; clones from about GBP 28 |
| Flipper Zero | standalone, USB-C, BLE | yes | limited | Lite-S | yes | yes | yes | yes | yes | USD 169 |
| Chameleon Ultra | USB-C, BLE | read and emulate | no | no | no | emulate and read | yes | yes | yes | EUR 129 |

</div>

---

## What NFC.cool Tools does with each chip

This is the point in a post where the thing I built shows up, and it belongs here because every row above ends in "and what does the app do with it". The table below is not marketing copy; I pulled it from the app's own source while writing this guide, and it corrected two things I would otherwise have claimed.

| Chip family | iPhone | Android | iPad and Mac with a reader |
| --- | --- | --- | --- |
| Identify by product | around 60 names: NTAG203 to 216, NTAG I2C, Ultralight and C, Ultralight EV1 by size, Ultralight AES, Classic Mini, 1K and 4K, Plus 2K and 4K by security level, DESFire EV1, EV2 and EV3 by size, NTAG 424 DNA and its TagTamper variant, ICODE SLI, SLI-S, SLI-L, SLIX, SLIX-S, SLIX-L and SLIX2, TI Tag-it Standard, Pro and Plus, ST25TV, ST25DV and M24LR, Infineon my-d, Fujitsu MB89R118, EM4233 and EM4423, FeliCa Lite and Standard plus Suica, PASMO, ICOCA, Edy, WAON and nanaco; EMV and PIV cards are recognised as such | around 20 names: NTAG203, 213, 215 and 216, NTAG 424 DNA, DESFire, Classic Mini, 1K and 4K, Plus 2K and 4K, JCOP and SmartMX, FeliCa brands including Octopus; ISO 15693 chips are reported by size, not by product | the card type from the reader's answer-to-reset |
| Read NDEF | every family | every family | Type 2, Type 4, FeliCa; Classic with the public keys |
| Write NDEF, empty a tag | Type 2, Type 4, Type 5, FeliCa Lite-S and Standard | Type 2, Type 5, MIFARE Classic with the NDEF directory, anything Android can format | Type 2, Type 4, FeliCa |
| Zero the whole memory | Type 5 | Type 2, Type 5, Classic | as iPhone |
| Permanent lock | Type 2 lock bytes; NDEF read-only on Type 4, Type 5 and FeliCa; refused on NTAG 424 DNA on purpose | Type 2 | yes |
| Password | NTAG213, 215, 216 and 203 | the Type 2 family | set yes; remove depends on the reader |
| Tap counter and mirror | NTAG213, 215, 216 | NTAG213, 215, 216 | yes |
| Full memory dump | Type 2, ISO 15693, DESFire file listing, FeliCa, NTAG 424 DNA files | Classic with the factory key, Ultralight, ISO 15693, FeliCa, any Type A | Type 2, Type 4, FeliCa |
| MIFARE Classic contents | no; Core NFC has no CRYPTO1 | read with the factory key, format and write with the well-known keys | NDEF read only |
| NTAG 424 DNA | keys, SUN in plain and encrypted mode, file access rights, chip configuration, the vault file, random UID, LRP, tamper status, originality signature verification | the same | the same |
| Amiibo | NTAG215 backup and restore, re-keyed to the target tag | the same | yes |
| ISO 15693 password, EAS, AFI | not yet | not yet | no |
| DESFire authentication and writes | no | no | no |
| Raw commands | expert APDU mode | a command catalog | yes |

The two corrections, for the record: I would have written that the app verifies the originality signature on NTAG21x tags, and it does not; only the 424 gets that. And I would have written that the ISO 15693 password commands were in, and they are a reference table waiting for a UI. Both are on the list.

---

## Buying without getting burned

What a listing has to say before I buy from it:

1. **The exact chip name.** "NTAG213" not "NFC 213"; "ICODE SLIX2" not "ISO 15693 tag"; "MIFARE Classic EV1 1K" not "1K card". If the listing does not name the chip, the seller does not know or does not want you to.
2. **User memory in bytes**, and it should match the chip: 144 for an NTAG213, 504 for a 215, 888 for a 216, 316 for a SLIX2. A "1K" that turns out to mean a MIFARE Classic will not work on an iPhone.
3. **The manufacturer**, if it claims genuine NXP or ST. The manufacturer code in the UID will tell you the truth after you buy; the price will tell you before. Nobody sells genuine NTAG216 stickers for a third of the going rate.
4. **The antenna size and the form factor.** A 10 mm inlay reads at a centimetre; a 38 mm one at four. On-metal must say on-metal.
5. **Whether it is NDEF-formatted.** NTAG ships pre-formatted; Ultralight EV1 and most ISO 15693 chips do not, and NFC.cool formats them, but it is one more step.

Red flags: "NTAG215 compatible" (it is not an NTAG215), "encrypted" on anything under rung 4 of the ladder, "works with all phones" on a MIFARE Classic, and any chip name with a letter the manufacturer never used, such as SLIX3.

**What tags cost.** Listing prices I saw on 9 September 2026 at Seritag, Shop NFC, GoToTags, NFCW Shop, NFC.CARDS, NFC-Tag-Shop.de, Tagstand and Digi-Key. Most shops sell in tens at minimum, so the "single" column is the smallest tier they offer. Prices move; treat these as ratios.

| Tag | Single or smallest tier | Per 100 | Per 1,000 | Bare chip |
| --- | --- | --- | --- | --- |
| NTAG213 sticker | EUR 0.32 to 0.65, USD 0.33 to 0.58 | EUR 0.29 to 0.34 | EUR 0.23 to 0.24, USD 0.50 | USD 0.14 in wafer volume |
| NTAG215 sticker or card | USD 0.48 to 0.54, GBP 0.64 to 0.67 | USD 0.35 | USD 0.33 | USD 0.21 |
| NTAG216 sticker | EUR 0.97, USD 0.71 | EUR 0.70, USD 0.61 | EUR 0.56, USD 0.56 | USD 0.37 |
| NTAG 424 DNA sticker | EUR 0.63, USD 0.90 | EUR 0.62, USD 0.77 | EUR 0.57, USD 0.68 | USD 0.79 single, 0.51 per 1,000 |
| MIFARE Classic 1K card | EUR 1.35 to 1.59 in tens; EUR 6.69 as a single retail card | EUR 1.29 to 1.52, USD 1.98 | EUR 0.95 to 1.13, USD 0.86 | |
| DESFire EV3 card | EUR 1.85 to 2.79 | EUR 1.85 to 2.45 | EUR 1.35 to 2.29 | USD 1.18 at 31,000 |
| ICODE SLIX2 label | EUR 0.69 | EUR 0.34 to 0.37 | EUR 0.22 to 0.25 | USD 0.35 single, 0.22 per 1,000 |
| ST25TV02KC inlay | USD 0.32 to 0.87 | USD 0.30 to 0.79 | USD 0.28 to 0.77 | USD 0.13 per reel |

The pattern is the one you would guess: memory is nearly free, cryptography costs about double, and the form factor costs more than the chip. A bare NTAG213 die is fourteen cents; the sticker around it is most of the price.

Where to buy: I keep a list of the tags and readers I actually use on the [affiliate links page](/affiliate-links/), and the 424 tags that started the whole DNA feature set came from AliExpress, so I am not going to tell you the marketplaces are off limits. Check what arrives with the app before you write anything to it.

---

## The whole catalog on one table

One row per chip. "User bytes" is what you can write; for DESFire it is NXP's usable figure. The phone columns say what the platform can do, not what every app does; the NFC.cool column says what mine does. Scroll sideways on a phone; the first column stays put.

<div class="table-scroll sticky-first">

| Chip | Maker | Forum type | Standard | User bytes | UID | Protection | Endurance / retention | iPhone | Android | NFC.cool | Best for |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 210µ | NXP | 2 | 14443-A | 48 | 7 | lock bits | 100k / 10 y | NDEF, raw | NDEF, raw | read, write | tiny disposables |
| NTAG210 | NXP | 2 | 14443-A | 48 | 7 | password | 100k / 10 y | NDEF, raw | NDEF, raw | read, write | small antennas |
| NTAG212 | NXP | 2 | 14443-A | 128 | 7 | password | 100k / 10 y | NDEF, raw | NDEF, raw | read, write | small antennas with room |
| NTAG213 | NXP | 2 | 14443-A | 144 | 7 | password, counter, mirror | 100k / 10 y | NDEF, raw | NDEF, raw | everything | the default sticker |
| NTAG215 | NXP | 2 | 14443-A | 504 | 7 | password, counter, mirror | 100k / 10 y | NDEF, raw | NDEF, raw | everything, Amiibo | Amiibo, mid-size payloads |
| NTAG216 | NXP | 2 | 14443-A | 888 | 7 | password, counter, mirror | 100k / 10 y | NDEF, raw | NDEF, raw | everything | contacts, the safe choice |
| NTAG213F, 216F | NXP | 2 | 14443-A | 144, 888 | 7 | password, field-detect pin | 100k / 10 y | as 213 | as 213 | as 213 | tags embedded in electronics |
| NTAG 213 TT | NXP | 2 | 14443-A | 144 | 7 | password, tamper wire | 100k / 10 y | as 213 | as 213 | as 213 | seals |
| NTAG203 | NXP | 2 | 14443-A | 144 | 7 | lock, OTP | 10k / 5 y | NDEF | NDEF | read, write, password | legacy stock |
| NTAG I2C plus | NXP | 2 | 14443-A | 888, 1912 | 7 | password | 200k to 500k / 20 y | NDEF, raw | NDEF, raw | identifies, read, write | electronics with an MCU |
| NTAG 223, 224 DNA | NXP | 2 | 14443-A | 144, 208 | 7 | password or AES, SUN | 100k / 10 y | NDEF, raw | NDEF, raw | as Type 2 | cheap authenticity |
| NTAG 22x DNA StatusDetect | NXP | 2 | 14443-A | 144, 208 | 7 | as above, sensor | 100k / 10 y | NDEF, raw | NDEF, raw | as Type 2 | seals and sensing |
| NTAG 413 DNA | NXP | 4 | 14443-4 | 160 | 7 | 3 AES keys, SUN | 200k / 50 y | NDEF, APDU | NDEF, APDU | identifies | discontinued |
| NTAG 424 DNA | NXP | 4 | 14443-4 | 416 | 7 | 5 AES keys, SUN, LRP | 200k / 50 y | NDEF, APDU | NDEF, APDU | full configuration | authenticity |
| NTAG 424 DNA TT | NXP | 4 | 14443-4 | 416 | 7 | as above, tamper | 200k / 50 y | NDEF, APDU | NDEF, APDU | full configuration | authenticity seals |
| Ultralight | NXP | 2 | 14443-A | 48 | 7 | lock, OTP | 10k / 5 y | NDEF | NDEF | read, write | discontinued |
| Ultralight C | NXP | 2 | 14443-A | 144 | 7 | 3DES | 100k / 10 y | NDEF, raw | NDEF, raw | read, write | legacy tickets |
| Ultralight EV1 | NXP | 2 | 14443-A | 48, 128 | 7 | password, 3 counters | 100k / 10 y | NDEF, raw | NDEF, raw | read, write, password | tickets, disposables |
| Ultralight AES | NXP | 2 | 14443-A | 144 | 7 | AES-128 | 100k / 10 y | NDEF, raw | NDEF, raw | read, write | authenticated Type 2 |
| Ultralight Nano | NXP | 2 | 14443-A | 40 | 7 | lock, OTP | 100k / 10 y | NDEF | NDEF | read, write | single-trip tickets |
| Classic Mini | NXP | none | 14443-A | 224 | 4 | CRYPTO1 | 100k / 10 y | UID | controller-dependent | Android: read, format | none |
| Classic 1K, EV1 | NXP | none | 14443-A | 752 | 4 or 7 | CRYPTO1 | 100k / 10 y | UID | controller-dependent | Android: read, format | none |
| Classic 4K, EV1 | NXP | none | 14443-A | 3440 | 4 or 7 | CRYPTO1 | 100k / 10 y | UID | controller-dependent | Android: read, format | none |
| Plus SE | NXP | none | 14443-A | 752 | 4 or 7 | AES in SL3 | 100k / 10 y | UID | as Classic | identifies | Classic migration |
| Plus EV2 | NXP | none | 14443-4 in SL3 | 1520, 3440 | 4 or 7 | AES-128, EAL5+ | 200k / 25 y | ISO-DEP | IsoDep | identifies | access control |
| DESFire EV1 | NXP | 4 | 14443-4 | 2304 to 7936 | 7 | DES, 3DES, AES | 200k / 10 y | NDEF, APDU | NDEF, APDU | identifies, lists files | legacy transit |
| DESFire EV2 | NXP | 4 | 14443-4 | 2560 to 16384 | 7 | AES, EAL5+ | 200k / 25 y | NDEF, APDU | NDEF, APDU | identifies, lists files | access control |
| DESFire EV3 | NXP | 4 | 14443-4 | 2560 to 16384 | 7 | AES, SUN, EAL5+ | 200k min, 1M typ / 25 y | NDEF, APDU | NDEF, APDU | identifies, lists files | access control, transit |
| DESFire Light | NXP | 4 | 14443-4 | 640 | 7 | AES, LRP, EAL4 | 200k / 10 y | NDEF, APDU | NDEF, APDU | identifies | single-application cards |
| ICODE SLI | NXP | 5 | 15693 | 112 | 8 | lock | 100k / 10 y | NDEF, raw | NfcV | read, write, format | end of life |
| ICODE SLI-S, SLI-L | NXP | 5 | 15693 | 160, 32 | 8 | passwords | 100k / 10 y | NDEF, raw | NfcV | read, write, format | no longer made |
| ICODE SLIX | NXP | 5 | 15693 | 112 | 8 | EAS/AFI password | 100k / 50 y | NDEF, raw | NfcV | read, write, format | library and logistics stock |
| ICODE SLIX-S, SLIX-L | NXP | 5 | 15693 | 160, 32 | 8 | passwords, privacy | 100k / 50 y | NDEF, raw | NfcV | read, write, format | logistics |
| ICODE SLIX2 | NXP | 5 | 15693 | 316 | 8 | passwords, privacy, counter, signature | 100k / 50 y | NDEF, raw | NfcV | read, write, format | inventory, OpenPrintTag spools |
| ICODE DNA | NXP | 5 | 15693 | 252 | 8 | AES-128 | 100k / 50 y | NDEF, raw | NfcV | reads as ISO 15693 | brand protection at range |
| ICODE 3 | NXP | 5 | 15693 | 300 | 8 | passwords, tap counter, mirror, signature | 100k / 50 y | NDEF, raw | NfcV | reads as ISO 15693 | the current inventory chip |
| NTAG 5 | NXP | 5 | 15693 | 512, 2048 | 8 | passwords, AES on the 5332 | 1M / 40 y | NDEF, raw | NfcV | reads as ISO 15693 | connected electronics |
| ST25TN512, 01K | ST | 2 | 14443-A | 64, 160 | 7 | kill, tap code, TruST25 | 100k / 40 y | NDEF, raw | NDEF, raw | reads as Type 2 | the NTAG213 alternative |
| ST25TV512C, 02KC | ST | 5 | 15693 | 64, 320 | 8 | passwords, kill, privacy, tap code, TruST25 | 100k / 60 y | NDEF, raw | NfcV | identifies ST25TV, read, write | labels with a fresh URL per tap |
| ST25TV16K, 64K | ST | 5 | 15693 | 2048, 8192 | 8 | 64-bit passwords, kill | 1M / 40 y | NDEF, raw | NfcV | read, write | large Type 5 storage |
| ST25DV04K to 64K | ST | 5 | 15693 | 512 to 8192 | 8 | 64-bit passwords | 1M / 40 y | NDEF, raw | NfcV | identifies ST25DV, read, write | dynamic tags with an MCU |
| M24LR | ST | none claimed | 15693 | 512 to 8192 | 8 | 32-bit passwords | 1M / 40 y | NDEF, raw | NfcV | reads as ST25TV | legacy dual interface |
| ST25TA02K, 02KB | ST | 4 | 14443-4 | 256 | 7 | 128-bit passwords, counter, TruST25 on B | 1M / 200 y | NDEF, APDU | NDEF, APDU | read, write | Type 4 without DESFire |
| ST25TA16K, 64K | ST | 4 | 14443-4 | 2048, 8192 | 7 | 128-bit passwords | 1M / 200 y | NDEF, APDU | NDEF, APDU | read, write | large Type 4 storage |
| TI Tag-it HF-I Standard, Pro, Plus | TI | none claimed | 15693 | 32, 32, 256 | 8 | lock; Pro adds a password write and kill | 100k / 10 y | NDEF, raw | NfcV | identifies, read | legacy libraries |
| EM4233 | EM | none claimed | 15693 | 208 | 8 | 96-bit key, privacy, destroy | ? / 60 y | NDEF, raw | NfcV | identifies, read | on request |
| EM4425 em echo-V | EM | 5 | 15693 plus UHF | up to 256 | 8 | AES-128, passwords, tamper | 100k / 50 y | NDEF, raw | NfcV | reads as ISO 15693 | dual-frequency retail |
| Infineon my-d move | Infineon | 2 | 14443-A | 128 | 7 | password, value counter | 100k / 10 y | NDEF, raw | NDEF, raw | identifies, read | ticketing |
| Fudan FM11NT021 | Fudan | 2 | 14443-A | 144 | 7 | password, counter | 500k claimed / 10 y | NDEF, raw | NDEF, raw | reads as a generic Type 2 | cheap link stickers |
| Fudan FM11RF08, 08S | Fudan | none | 14443-A | 752 | 4 | CRYPTO1, backdoored | ? | UID | controller-dependent | as Classic | none |
| Topaz 96, 512 | Innovision, Broadcom | 1 | 14443-A | 96, about 480 | 7 | one-time locks | 10k / 5 y | NDEF | NDEF | NDEF | legacy |
| FeliCa Lite-S | Sony | 3 | 18092, JIS X 6319-4 | 224 | 8 (IDm) | 3DES MAC | ? | NDEF, raw | NfcF | read, write | Japan |
| FeliCa Standard | Sony | 3 | 18092 | 4 kB | 8 | AES, EAL6+ | ? | NDEF, raw | NfcF | read, brands | transit and e-money |
| Kovio NFC Barcode | Kovio, Thinfilm | none | proprietary | 16 read-only | none | none | n/a | no | NfcBarcode | no | defunct |
| ST SRI512, SRT512, SRI4K | ST | none | 14443-B | 64, 512 | 8 | counters, lock | 1M / 40 y | no | NfcB | no | Type B transit |

</div>

---

## The matchups people search for

**NTAG213 vs NTAG215 vs NTAG216.** Same chip in three memory sizes: 144, 504 and 888 bytes, with the same password, counter, mirror and signature. Buy the 213 for a link, the 215 for Amiibo, the 216 for a contact card or for not having to think. The price difference is about thirty cents.

**NTAG213 vs Ultralight EV1.** Same air interface and commands; the NTAG has the ASCII mirror and a pre-written capability container, the EV1 has three one-way counters and comes in 48 or 128 bytes. Stickers want the NTAG; tickets want the EV1.

**NTAG213 vs ST25TN01K vs Fudan FM11NT021.** Three 144-to-160-byte Type 2 chips. The NTAG has a password and a read counter and answers GET_VERSION; the ST25TN has more memory, a kill command, a tap code and TruST25 but no password; the Fudan copies the NTAG's features except GET_VERSION and, in its current datasheet, the signature. For a plain link any of them; for a counter or Amiibo, the NTAG.

**MIFARE Classic vs DESFire.** Not a contest. Classic's cipher was broken in 2008 and its most common clone was backdoored in 2024; DESFire EV3 has AES, key management, EAL5+ certification and SUN. The only argument for Classic is that the reader on the wall was installed in 2009.

**NTAG 424 DNA vs NTAG213.** The 424 signs every tap with AES-128 and stores 416 bytes in three files with five keys; the 213 stores 144 bytes with a 32-bit password. If the question is "is this product real", only the 424 answers it. If the question is "does this sticker open a link", the 213 does it for a third of the price.

**NTAG 424 DNA vs NTAG 223 DNA.** Both do SUN. The 424 is Type 4 with five keys, LRP, a random UID option, a vault file and 50-year retention; the 223 is a Type 2 sticker with one SUN key, a 32-bit password and 10 years. The 223 is the cheaper way to put a signed URL on a label; the 424 is the one with an app that can configure it today.

**ICODE SLIX2 vs NTAG216 for inventory.** If a phone is the only reader, the NTAG216 has more memory and the counter. If a gate or a handheld reader is involved, the SLIX2 reads at a metre and the NTAG at four centimetres, and that decides it.

**FeliCa vs NTAG in Japan.** A Japanese transit gate speaks FeliCa and nothing else; a Japanese phone reads both. For a tag on a poster in Tokyo, NTAG is fine. For anything a Suica reader must accept, FeliCa, and that is not a chip you program with a phone app.

---

## Frequently asked questions

### Should I buy NTAG215 or NTAG216?

The 216 unless you are writing Amiibo. It has 888 bytes to the 215's 504, the same password, counter and mirror, and the same phone support. The 215 exists in every shop because Nintendo's figures use it, and if that is your job it is the only choice.

### Can an iPhone read MIFARE Classic tags?

It can see that one is there. Core NFC reads the UID and the SAK and stops; Apple's API has no Classic family and its documentation says the MIFARE command "doesn't support the Crypto1 protocol". No app can read a sector on an iPhone. Android phones with an NXP NFC controller can; phones with some other controllers cannot, and the `MifareClassic` class simply does not appear on those.

### How many times can I rewrite an NFC tag?

100,000 times for anything current from NXP or ST at room temperature, and the datasheet numbers are minimums. A DESFire EV3 or an ST25DV is rated a million. The old NTAG203, the original Ultralight and the Topaz were rated 10,000. Nobody rewrites a sticker ten thousand times; the number matters for counters and for tags that log.

### How far away does an NFC tag work?

From a phone, up to about four centimetres for a card-sized antenna and about two for a small sticker, in the right spot on the phone. The NFC Forum's own definition says "up to 2 cm". An ISO 15693 tag on a gate reader with a big antenna works at a metre, but a phone reads it at the same few centimetres as anything else, maybe twice that of a Type 2 tag.

### Do NFC tags expire or wear out?

The chip's data is rated for 10 years on most consumer chips, 50 on NTAG 424 DNA and the ICODE SLIX family, 60 on ST25TV and 200 on ST25TA, all at room temperature. Heat shortens that. In practice the adhesive, the paper face and the antenna give up long before the EEPROM does.

### Are cheap NFC tags from marketplaces safe to buy?

Safe, yes; what they claim, not always. A cheap "NTAG213" is often a Fudan FM11NT021, which works for a link and fails for anything that asks GET_VERSION. A cheap "NTAG215" is often not one, and Amiibo will refuse it. Check the manufacturer code and the chip name in the app before you write anything, and buy from a shop that names the chip.

### Can my phone read my bank card or my passport with an NFC app?

The passport yes: with the machine-readable zone as the key, an app can read the chip's data groups, and NFC.cool does that on both platforms. The bank card is an EMV smart card; an app can read its application list and some public records, but Apple blocks payment-card reading in Core NFC, the card's security code is not on the chip, and every transaction is signed by a key that never leaves the card, so there is nothing to copy.

### Why does my office badge or hotel key not show up in the app?

Most office badges are 125 kHz proximity cards, which a phone's 13.56 MHz coil cannot even sense. Most hotel keys and older transit cards are MIFARE Classic, which an iPhone can only identify and an Android phone can read only with the right controller and the right keys. Neither is something an app can fix, and I would rather say that than sell you a workaround.

### Can I unlock an NFC tag that was made read-only?

No. The lock bits on a Type 2 or Type 5 tag are one-way bits in the chip; the read-only flag in the capability container is the same. A password can be removed if you know it; a lock cannot. That is why NFC.cool asks twice before it locks anything.

### Is the NTAG password real security?

It stops the person with a free app, which is most people. It does not stop anyone with a reader that can listen, because the 32-bit password crosses the air unencrypted and the tag answers with a 16-bit acknowledgement. For anything that has to survive a motivated attacker, the ladder starts at AES: Ultralight AES for a Type 2 sticker, NTAG 424 DNA if the tap itself has to prove anything.

### Which tag do I need for Amiibo?

An NTAG215, and only an NTAG215. The console asks GET_VERSION, authenticates with a password derived from the UID and reads all 135 pages. A chip without GET_VERSION or with a different page count fails on the first command. Writing an Amiibo to a tag is permanent, because the lock bytes and the password are part of the format.

### Which NFC tag works on a metal surface?

Any chip in an on-metal form factor, which means a ferrite sheet between the antenna and the metal. A normal tag stuck to steel does not read at all; an on-metal tag reads at roughly four fifths of its normal range. If you can put three millimetres of anything non-metallic between a normal tag and the metal, that works too.

### Does NFC.cool work on iPad and Mac?

Yes, since version 6.15.0, through a USB smart-card reader; neither device has an NFC radio of its own. The HID OMNIKEY 5022 CL is the one I tested and the ACS ACR1552U and ACR1255U-J1 have been reported working. Everything that works on Type 2, Type 4 and FeliCa through the phone works through the reader, with MIFARE Classic read-only.

---

## Glossary

| Term | Meaning |
| --- | --- |
| AFI | Application Family Identifier, a byte on ISO 15693 tags that lets a reader inventory only tags of one kind |
| APDU | Application Protocol Data Unit, the command and response format of ISO 7816-4, used by every ISO-DEP chip |
| ATQA | Answer To Request, the first two bytes a Type A chip sends; NXP says not to identify chips by it |
| AUTH0 | the NTAG configuration byte naming the first page that needs the password |
| AUTHLIM | the NTAG setting that locks the tag after a chosen number of failed password attempts |
| CC | Capability Container, the four bytes (or the file, on Type 4) that tell a reader the tag holds NDEF and how much |
| CMAC | a message authentication code computed with AES; the thing that makes a SUN message unforgeable |
| CRYPTO1 | NXP's proprietary 48-bit stream cipher in MIFARE Classic, broken in 2008 |
| DSFID | Data Storage Format Identifier, an ISO 15693 byte describing how the memory is organised |
| EAS | Electronic Article Surveillance, the bit on ISO 15693 tags that makes a shop gate alarm |
| GET_VERSION | the NXP command that returns eight bytes identifying the chip's vendor, type, generation and size |
| ISO-DEP | the ISO/IEC 14443-4 transport protocol; a chip speaking it answers SAK 20 and takes APDUs |
| Load modulation | how a passive tag sends data: by switching a load on its antenna, which the reader senses in its own field |
| LRP | Leakage Resilient Primitive, an AES mode on NTAG 424 DNA and DESFire Light that resists side-channel attacks |
| MAD | MIFARE Application Directory, sector 0 of a Classic card listing what the other sectors hold |
| Mirror | the NTAG feature that pastes the UID and counter as ASCII into the NDEF message on every read |
| NDEF | NFC Data Exchange Format, the record container every phone reads |
| NUID | Non-Unique Identifier, NXP's name for a 4-byte UID |
| OTP | One Time Programmable, bits that can be set once and never cleared |
| PACK | Password Acknowledge, the two bytes an NTAG returns after a correct password |
| PICC, PCD | the standards' names for the card and the reader |
| Random ID | a mode where the chip answers anticollision with a fresh random 4-byte ID each time, for privacy |
| READ_SIG | the command that returns a chip's originality signature |
| SAK | Select Acknowledge, the byte a Type A chip returns after selection; its bits sort chips into families |
| SDM | Secure Dynamic Messaging, the NTAG 424 DNA and DESFire EV3 mechanism behind SUN |
| SUN | Secure Unique NFC, a URL that carries a fresh cryptographic proof on every tap |
| T5T, T2T, T4T | the NFC Forum's shorthand for Type 5, Type 2 and Type 4 tags |
| TLV | Tag-Length-Value, the framing around an NDEF message on Type 2 and Type 5 chips |
| TruST25 | ST's originality signature over the UID |
| UID | the chip's factory-programmed identifier, 4, 7 or 8 bytes |

---

## Sources and further reading

Every table in this guide was checked against one of these. Prices are from the shops named in the buying section on 9 September 2026.

- NXP NTAG213/215/216 datasheet, Rev 3.2: https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf
- NXP NTAG210/212, NTAG 210µ, NTAG213F/216F and NTAG 213 TT datasheets: https://www.nxp.com/docs/en/data-sheet/NTAG210_212.pdf, https://www.nxp.com/docs/en/data-sheet/NT2L1001_NT2H1001.pdf, https://www.nxp.com/docs/en/data-sheet/NTAG213F_216F.pdf, https://www.nxp.com/docs/en/data-sheet/NT2H1311TT.pdf
- NXP NTAG 223 and 224 DNA and StatusDetect datasheets: https://www.nxp.com/docs/en/data-sheet/NT2H2331G0.pdf, https://www.nxp.com/docs/en/data-sheet/NT2H2421S0.pdf
- NXP NTAG 424 DNA and TagTamper datasheets and AN12196: https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf, https://www.nxp.com/docs/en/data-sheet/NT4H2421Tx.pdf, https://www.nxp.com/docs/en/application-note/AN12196.pdf
- NXP NTAG I2C plus and NTAG 5 datasheets: https://www.nxp.com/docs/en/data-sheet/NT3H2111_2211.pdf, https://www.nxp.com/docs/en/data-sheet/NTA5332.pdf
- NXP MIFARE Ultralight, Ultralight C, EV1, AES datasheets: https://www.nxp.com/docs/en/data-sheet/MF0ICU1.pdf, https://www.nxp.com/docs/en/data-sheet/MF0ICU2.pdf, https://www.nxp.com/docs/en/data-sheet/MF0ULX1.pdf, https://www.nxp.com/docs/en/data-sheet/MF0AES(H)20.pdf
- NXP MIFARE Classic EV1 1K and 4K datasheets: https://www.nxp.com/docs/en/data-sheet/MF1S50YYX_V1.pdf, https://www.nxp.com/docs/en/data-sheet/MF1S70YYX_V1.pdf
- NXP MIFARE Plus S, SE and EV2 short datasheets: https://www.nxp.com/docs/en/data-sheet/MF1SPLUSX0Y1_SDS.pdf, https://www.nxp.com/docs/en/data-sheet/MF1SEP_H_10X1_SDS.pdf, https://www.nxp.com/docs/en/data-sheet/MF1P(H)x2.pdf
- NXP DESFire EV1, EV2, EV3 and Light datasheets, and AN12752 on usable memory: https://www.nxp.com/docs/en/data-sheet/MF3ICDX21_41_81_SDS.pdf, https://www.nxp.com/docs/en/data-sheet/MF3DX2_MF3DHX2_SDS.pdf, https://www.nxp.com/docs/en/data-sheet/MF3D_H_X3_SDS.pdf, https://www.nxp.com/docs/en/data-sheet/MF2DLHX0.pdf, https://www.nxp.com/docs/en/application-note/AN12752.pdf
- NXP ICODE SLIX, SLIX-S, SLIX-L, SLIX2, DNA and ICODE 3 datasheets, and AN11809: https://www.nxp.com/docs/en/data-sheet/SL2S2002_SL2S2102.pdf, https://www.nxp.com/docs/en/data-sheet/SL2S5302_SL2S5402.pdf, https://www.nxp.com/docs/en/data-sheet/SL2S5002_SL2S5102.pdf, https://www.nxp.com/docs/en/data-sheet/SL2S2602.pdf, https://www.nxp.com/docs/en/data-sheet/SL2S6002_SDS.pdf, https://www.nxp.com/docs/en/data-sheet/SL2S3003_SL2S3003TT.pdf, https://www.nxp.com/docs/en/application-note/AN11809.pdf
- NXP AN10833 (type identification), AN10927 (UIDs), AN1305 and AN10787 (NDEF and the MAD on Classic), AN11004 (DESFire as Type 4), AN13089 (NTAG hints, on static signatures): https://www.nxp.com/docs/en/application-note/AN10833.pdf, https://www.nxp.com/docs/en/application-note/AN10927.pdf, https://www.nxp.com/docs/en/application-note/AN1305.pdf, https://www.nxp.com/docs/en/application-note/AN10787.pdf, https://www.nxp.com/docs/en/application-note/AN11004.pdf
- ST ST25TV02KC, ST25TN01K, ST25DV64KC, ST25TA02KB and M24LR64E-R datasheets, AN5658 on Augmented NDEF, TA0358 on TruST25: https://www.st.com/resource/en/datasheet/st25tv02kc.pdf, https://www.st.com/resource/en/datasheet/st25tn01k.pdf, https://www.st.com/resource/en/datasheet/st25dv64kc.pdf, https://www.st.com/resource/en/datasheet/st25ta02kb.pdf, https://www.st.com/resource/en/datasheet/m24lr64e-r.pdf
- TI Tag-it HF-I Standard, Pro and Plus datasheets: https://www.ti.com/lit/ds/scbs828c/scbs828c.pdf, https://www.ti.com/lit/ds/scbs822c/scbs822c.pdf, https://www.ti.com/lit/ds/scbs827b/scbs827b.pdf
- EM Microelectronic EM4233, EM4423 and EM4425: https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em4233, https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em-echo-em4423, https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em-echo-v
- Sony FeliCa Lite-S and FeliCa Standard RC-SA01: https://www.sony.co.jp/en/Products/felica/business/data/RC-S966_E.pdf, https://www.sony.co.jp/en/Products/felica/business/products/RC-SA01.html
- Fudan FM11NT021 datasheet: https://github.com/user-attachments/files/16667599/FM11NT021_sds_eng.pdf
- Quarkslab, "MIFARE Classic: exposing the static encrypted nonce variant... and a few hardware backdoors" (2024): https://blog.quarkslab.com/mifare-classic-static-encrypted-nonce-and-backdoors.html
- Nohl, Evans, Starbug, Plötz, "Reverse-Engineering a Cryptographic RFID Tag" (USENIX Security 2008): https://www.usenix.org/legacy/event/sec08/tech/full_papers/nohl/nohl.pdf
- Garcia et al., "Dismantling MIFARE Classic" (ESORICS 2008): https://link.springer.com/chapter/10.1007/978-3-540-88313-5_7
- ISO/IEC JTC1/SC17 Standing Document 5, register of IC manufacturers: https://www.aimglobal.org/wp-content/uploads/2022/04/ISO_IEC_JTC1_SC17_Standing_Document_5_Register_of_IC_Manufacturers.pdf
- Proxmark3 magic card notes: https://github.com/RfidResearchGroup/proxmark3/blob/master/doc/magic_cards_notes.md
- 3dbrew on the Amiibo tag layout: https://www.3dbrew.org/wiki/Amiibo
- Apple Core NFC: https://developer.apple.com/documentation/corenfc, background tag reading: https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading, WWDC 2019 session 715: https://developer.apple.com/videos/play/wwdc2019/715/
- Android NFC tech classes: https://developer.android.com/reference/android/nfc/tech/MifareClassic, https://developer.android.com/develop/connectivity/nfc/advanced-nfc, Web NFC: https://developer.chrome.com/docs/capabilities/nfc
- NFC Forum on the technology and the Type 2 and Type 5 specifications: https://nfc-forum.org/learn/nfc-technology/, https://nfc-forum.org/build/specifications/type-2-tag-specification/
- Reader documentation: ACS ACR122U and ACR1552U, HID OMNIKEY 5022 CL, NXP PN532, Proxmark3, Flipper Zero, Chameleon Ultra: https://www.acs.com.hk/download-manual/418/TSP-ACR122U-3.06.pdf, https://www.hidglobal.com/doclib/files/resource_files/eat-omnikey-5022-usb-reader-ds-en.pdf, https://www.nxp.com/docs/en/nxp/data-sheets/PN532_C1.pdf, https://github.com/RfidResearchGroup/proxmark3, https://docs.flipper.net/nfc, https://github.com/RfidResearchGroup/ChameleonUltraDocs
- Antenna and ferrite: TI SLOA241 and Würth ANP022: https://www.ti.com/lit/an/sloa241b/sloa241b.pdf, https://www.mouser.com/pdfdocs/Selection_and_Characteristics_of_WEFSFS_APPNOTE.PDF

---

## The bottom line

Match the chip to the job. An NTAG213 for a link, an NTAG216 when you are not sure, an NTAG215 for Amiibo, an NTAG 424 DNA when a tap has to prove something, an ICODE SLIX2 or ICODE 3 when a gate has to read it, a DESFire EV3 when a door has to trust it, and nothing at all from the MIFARE Classic shelf. Everything else in this guide is the reasoning behind that sentence, and the tables are there so you never have to take a listing's word for it again.

If you want to see what a tag actually is before you write to it, that is what [NFC.cool Tools](/features/nfc-reader-writer/) does on every tap, on [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ultimate-nfc-tag-guide-en&mt=8), on [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ultimate-nfc-tag-guide-en), and on an iPad or Mac with a reader plugged in. And if you have a chip on your desk that the app names wrongly, or one it does not name at all, write to me. That is how most of the sixty got there.
