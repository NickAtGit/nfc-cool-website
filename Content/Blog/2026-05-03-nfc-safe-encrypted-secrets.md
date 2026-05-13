---
id: "nfc-safe-2026-05"
title: "NFC Safe: Store Encrypted Secrets on Durable NFC Tags"
date: "2026-05-03"
category: "nfc"
tags: ["nfc", "security", "encryption", "privacy"]
summary: "256-bit AES on epoxy-coated NFC tags. Paper backups burn. Cloud backups go down. NFC tags don't."
image: "/assets/images/Blog/nfc-safe-encrypted-secrets.webp"
imageAlt: "Phone, NFC card, shield, and lock representing encrypted NFC secrets"
author: "Nicolo Stanciu"
---

Your seed phrase is on a piece of paper. Maybe it's in a safe. Maybe under a floorboard. Maybe split across three locations because someone on Reddit said that's what "serious" crypto people do. But it's still paper. Paper burns. Paper floods. Paper gets lost.

What if your backup couldn't rot, couldn't degrade, and looked like nothing to anyone who found it?

That's what **NFC Safe** does. It encrypts any text — seed phrases, passwords, recovery codes, whatever you need to keep secret — onto an NFC tag with 256-bit AES encryption. The tag is self-contained. No cloud. No server. No account. To read the secret, you need the physical tag *and* the passphrase. Without both, the tag is just a tiny piece of plastic with some gibberish on it.

The encryption format is [fully documented and open](https://github.com/NickAtGit/nfc.cool-nfc-safe-format), including a reference Python decoder. Your secrets don't depend on the app existing — if NFC.cool ever disappears, you can still recover your data with a standard NFC reader and the spec.

### The problem with storing secrets

Every method of storing a secret has a weakness: paper burns, USB connectors corrode, cloud services get breached, hardware wallets only handle crypto seed phrases, and your brain forgets.

The ideal backup would be: physically durable, encrypted, self-contained, redundant, and long-lasting. NFC tags hit all five. They have no battery, no moving parts, and the NTAG216 chip is rated for 10+ years of data retention. Epoxy-coated variants survive water, impact, and decades of neglect.

### How to use NFC Safe

NFC Safe lives inside NFC.cool Tools under NFC Apps. Encrypt or Decrypt with a segmented control at the top.

**To encrypt:**
1. Open Tools → NFC Apps → NFC Safe
2. Select **Encrypt**
3. Type or paste your secret
4. Set a strong passphrase
5. Tap Encrypt; hold an NFC tag to your phone

**To decrypt:**
1. Same screen, switch to **Decrypt**
2. Enter your passphrase
3. Tap a previously-encrypted tag — your secret appears

Under the hood: AES-256-GCM with PBKDF2 (HMAC-SHA-256, 100,000 iterations, 16-byte random salt). Stored on the tag as a custom NDEF record (`urn:nfc:ext:crypto`). [Format spec on GitHub](https://github.com/NickAtGit/nfc.cool-nfc-safe-format).

### The redundancy strategy

An NTAG216 tag costs about a coffee. Buy a handful, encrypt the same secret to each, distribute them: desk drawer, office, family member's house, safety deposit box, somewhere hidden. Each tag alone is meaningless without the passphrase. Two-factor by design: physical tag + passphrase, held in two separate places.

### Why NFC instead of USB or SD card

- **No connector** — nothing to corrode or bend
- **No battery** — passive, powered by the reader
- **No filesystem** — nothing to corrupt
- **No driver** — every smartphone reads NFC natively
- **Small and cheap** — coin-sized, under a dollar in quantity
- **Durable** — epoxy variants handle water, impact, UV

Capacity is the only limit: ~500-700 bytes after encryption overhead. Plenty for a 24-word seed phrase, master password, or recovery codes.

### Security notes

- **Your passphrase is everything.** 256-bit AES is unbreakable. A weak passphrase isn't. Use a randomly-generated 20+ character string.
- **NFC range is short** (~4 cm). Nobody scans from across the room.
- **No remote wipe.** Lost tag? Destroy it physically (scissors work).
- **No passphrase recovery.** Forget it and the data is gone — by design. Write it down somewhere separate from the tags.

### The bigger picture

NFC tags are becoming the storage medium for things that matter. The EU Digital Product Passport will require NFC for product authenticity. Philips puts them in toothbrush heads. Hotels use them for room keys. Cheap, durable, universally readable by the device in your pocket.

NFC Safe takes that durability and adds encryption. A backup that outlasts paper, can't be read by anyone who finds it, and costs less than a cup of coffee.

Available now on [NFC.cool Tools for iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web_en&mt=8). Coming soon to Android.
