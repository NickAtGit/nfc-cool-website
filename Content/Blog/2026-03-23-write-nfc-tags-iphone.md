---
id: nfc-blog-010
title: "How to Write NFC Tags with Your iPhone"
date: 2026-03-23
tags: [nfc-tech, iphone, automation]
summary: "Your iPhone can do more than read NFC tags - it can write them too. Here's a step-by-step guide to programming NFC tags with your iPhone, from choosing the right tags to writing URLs, Wi-Fi credentials, contact cards, and automations."
metaTitle: "How to Write NFC Tags with Your iPhone: Step-by-Step Guide (2026)"
metaDescription: "Learn how to write NFC tags with your iPhone. Step-by-step instructions for programming URLs, Wi-Fi, contacts, and automations using NFC.cool Tools and iOS Shortcuts."
ogTitle: "How to Write NFC Tags with Your iPhone"
ogDescription: "Step-by-step guide to writing NFC tags with your iPhone - URLs, Wi-Fi, contacts, and automations. No special equipment needed."
---

# How to Write NFC Tags with Your iPhone

Most people know their iPhone can *read* NFC tags - tap to pay, scan a transit card, open a link. But what many don't realize is that your iPhone can also *write* to NFC tags, turning blank tags into smart triggers for just about anything.

Want a tag on your nightstand that silences your phone and sets an alarm? A tag on your desk that opens your work playlist? A tag at your front door that shares your Wi-Fi password with guests? Your iPhone can program all of these - and it's easier than you think.

This guide walks you through everything: what you need, how to write different types of data, and practical projects you can set up in minutes.

---

## What You Need

Before you start writing, you'll need three things:

### 1. A Compatible iPhone

NFC tag writing requires **iPhone 7 or newer** running **iOS 13 or later**. If you bought your iPhone in the last eight years, you're covered.

For the best experience, use an iPhone with **background NFC reading** (iPhone XS and newer). These models can read NFC tags without opening an app first, which makes your finished tags much more convenient to use.

### 2. Blank NFC Tags

You can buy blank NFC tags online for as little as **€0.30–€1.00 each**. They come in several form factors:

| Form Factor | Best For |
|-------------|----------|
| **Stickers** (round, 25-30mm) | Surfaces, objects, posters |
| **Cards** (credit card size) | Wallets, business cards |
| **Key fobs** | Keychains, bag attachments |
| **Wristbands** | Events, access control |
| **Coin tags** (thick discs) | Embedding in objects |

**Which chip should you buy?**

For most projects, **NTAG215** is the sweet spot - 504 bytes of usable memory, widely compatible, and affordable. Here's the quick breakdown:

- **NTAG213** (144 bytes) - Enough for URLs and simple text. Cheapest option.
- **NTAG215** (504 bytes) - Best all-rounder. Enough for contact cards, Wi-Fi credentials, and multiple records.
- **NTAG216** (888 bytes) - For longer content like detailed vCards or multiple data records.

If you're unsure, start with a mixed pack of NTAG215 stickers. They handle 90% of use cases.

### 3. An NFC Writing App

Your iPhone needs an app to write data to tags. Apple's built-in NFC support handles reading, but for writing, you need a dedicated app.

**[NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=BlogWriteNfc&mt=8)** is purpose-built for this. It supports writing all standard NDEF record types - URLs, text, Wi-Fi configurations, contacts, and more - with a clean interface that shows exactly how much tag memory you're using. It also lets you lock tags, read technical details, and automate writing through iOS Shortcuts.

Other options exist (like Apple's Shortcuts app for basic URL writing), but a dedicated NFC app gives you more control over what you write and how.

---

## Step-by-Step: Writing Your First NFC Tag

Let's start with the most common use case: writing a URL to a tag.

### Writing a URL

1. **Open NFC.cool Tools** and tap the **Write** tab
2. **Select "URL"** as the record type
3. **Enter your URL** - for example, `https://nfc.cool`
4. **Tap "Write to Tag"**
5. **Hold your iPhone near the blank NFC tag** - the top edge of your iPhone (where the NFC antenna is) should be within 2-3 cm of the tag
6. **Wait for the success confirmation** - you'll feel a haptic tap and see a checkmark

That's it. Anyone who taps that tag with their phone will now be taken to your URL - no app needed, no QR code to scan. It just works.

**Pro tip:** The NFC antenna on iPhones is located at the **top edge** of the phone, near the camera. For the strongest connection, hold the top of your iPhone directly over the tag.

---

## What Can You Write to NFC Tags?

NFC tags use a format called **NDEF** (NFC Data Exchange Format) that defines standard record types. Here's what you can write:

### URLs and Links

The most common use. Write any web address, and tapping the tag opens it in the phone's browser.

**Practical uses:**
- Restaurant menu link on a table tag
- Portfolio or LinkedIn profile on a business card
- Product page link on retail shelf tags
- Feedback form link at reception

**Memory needed:** ~30-80 bytes (most URLs fit on any tag)

### Wi-Fi Network Credentials

Write your Wi-Fi network name (SSID) and password to a tag. Guests tap the tag and connect automatically - no typing long passwords.

**How to write Wi-Fi credentials:**

1. In NFC.cool Tools, select **"Wi-Fi"** as the record type
2. Enter your **network name** (SSID)
3. Enter the **password**
4. Select the **security type** (WPA2 or WPA3 for most home networks)
5. Write to the tag

**Pro tip:** Place a Wi-Fi tag near your router, on a keychain by the door, or inside a guest room. Label it "Tap for Wi-Fi" - guests love this.

**Memory needed:** ~60-120 bytes depending on password length

### Contact Cards (vCard)

Write a vCard contact to a tag. When someone taps it, your contact details pop up ready to save - name, phone, email, company, address.

This is essentially what a digital business card does, but baked directly into a physical tag. No app, no internet connection needed - the contact data lives on the tag itself.

**How to write a contact:**

1. Select **"Contact"** as the record type
2. Fill in the fields you want to share (name, phone, email, etc.)
3. Write to the tag

**Memory needed:** ~100-400 bytes depending on how many fields you include. Use NTAG215 or NTAG216 for contacts with addresses and notes.

**Note:** For a richer experience with photos, social links, and analytics, check out **[NFC.cool Business Card](https://apps.apple.com/app/nfc-cool-business-card-maker/id6502926572?pt=106913804&ct=BlogWriteNfc&mt=8)** - it creates a hosted digital business card profile and can write the link to any NFC tag. When someone taps, iOS users see a native App Clip and Android users open a website on the nfc.cool domain - no app needed. Better than raw vCards for networking.

### Plain Text

Write any text message to a tag. Less common than URLs, but useful for:

- Inventory labels (serial numbers, descriptions)
- Instructions or notes attached to equipment
- Easter egg messages in scavenger hunts
- Asset tracking in warehouses

**Memory needed:** Varies by text length (~1 byte per character)

### Phone Numbers and Email Addresses

Write a `tel:` or `mailto:` URI to trigger a phone call or compose an email when tapped.

Useful for:
- Emergency contact tags on medical equipment
- "Call for service" tags on vending machines
- Support contact tags on products

### App-Specific Data

Some apps can write custom NDEF records that trigger specific app actions. For example, you could write a record that opens a specific shortcut, playlist, or app screen.

---

## Advanced: Writing with iOS Shortcuts

Apple's **Shortcuts** app has built-in NFC writing support, and NFC.cool Tools extends this further with Shortcuts actions.

### Basic URL Writing with Shortcuts

1. Open the **Shortcuts** app
2. Create a new shortcut
3. Search for the **"Set NFC Tag"** action (under Scripting → NFC)
4. Configure what to write (URL, text, etc.)
5. Run the shortcut and tap a tag

This is useful for batch-writing multiple tags with the same data.

### NFC.cool Tools Shortcuts Integration

NFC.cool Tools adds its own Shortcuts actions, giving you more options:

- **Write Tag** - Write any supported record type programmatically
- **Read Tag** - Scan and return tag data to your shortcut
- **Scan History** - Access your recent scan results

This opens up automation possibilities. For example, you could create a shortcut that:
1. Asks for a product name
2. Generates a URL like `https://yoursite.com/product/{name}`
3. Writes it to an NFC tag
4. Logs the tag to a spreadsheet

Perfect for batch inventory tagging or event badge setup.

---

## Practical NFC Tag Projects

Here are ready-to-build projects you can set up in minutes:

### 🏠 Smart Home Tags

**Nightstand Tag - "Bedtime Mode"**
Write a URL that triggers an iOS Shortcut to:
- Enable Do Not Disturb
- Set tomorrow's alarm
- Lower screen brightness
- Start a sleep playlist

**Desk Tag - "Work Mode"**
- Open your task manager
- Start a focus timer
- Connect to your work VPN
- Play a concentration playlist

**Door Tag - "Leaving Home"**
- Check weather forecast
- Show commute time
- Trigger smart home "away" scene

### 💼 Business Tags

**Conference Badge Tag**
Write your NFC.cool Business Card URL to a tag stuck on the back of your conference badge. Contacts tap your badge → your full digital business card appears.

**Product Tags**
Write links to product documentation, warranty registration, or support pages. Attach to products or packaging.

**Meeting Room Tags**
Write links to room booking calendars or Wi-Fi credentials. Stick near the door.

### 🎮 Creative Projects

**Music Tags**
Write Spotify or Apple Music album links to NFC stickers. Stick them on physical album art, and tapping plays the album.

**Board Game Tags**
Write links to rule PDFs or tutorial videos. Stick inside the box lid.

**Recipe Tags**
Write links to favorite recipes and stick tags on spice jars or cookbook pages.

---

## Locking NFC Tags

Once you've written a tag and you're happy with its content, you can **lock** it. Locking makes the tag permanently read-only - nobody can overwrite your data.

**In NFC.cool Tools:**
1. Tap the **Lock** option after writing
2. Confirm - **this is irreversible**

**When to lock:**
- Tags in public locations (prevent tampering)
- Product tags (protect your URLs)
- Business cards (keep your contact data safe)
- Any tag you don't plan to rewrite

**When NOT to lock:**
- Tags you might want to update later (Wi-Fi password changes, seasonal URLs)
- Experimentation/learning - leave them rewritable while you test

---

## Troubleshooting

### "Unable to Write" Error

- **Tag might be locked.** If someone (or you) previously locked the tag, it's permanently read-only. You'll need a new tag.
- **Not enough memory.** Your data might be too large for the tag's capacity. Try a tag with more memory (NTAG215 → NTAG216) or reduce your data.
- **Tag not positioned correctly.** Move the top edge of your iPhone slowly over the tag. Some surfaces (metal, thick cases) can interfere.
- **Tag is damaged.** NFC tags are durable but not indestructible. Extreme heat, bending, or puncture can kill them.

### Writing Seems to Work But Tag Doesn't Respond

- **Check NDEF format.** The data must be written in NDEF format for phones to read it automatically. NFC.cool Tools handles this for you, but custom-written tags might have formatting issues.
- **iPhone model matters.** Older iPhones (7, 8, X) require an app to read tags. iPhone XS and newer read tags automatically in the background.

### Tag Works on Android But Not iPhone

- **Check the chip type.** iPhones work best with NTAG-series chips (NTAG213, 215, 216). Some other chip types may not be compatible with iOS.
- **NDEF formatting.** The tag must be NDEF-formatted. Some bulk-purchased tags arrive unformatted - write to them with NFC.cool Tools to auto-format them.

---

## Tips for Getting the Most Out of NFC Tags

1. **Label your tags.** A blank sticker on a desk isn't helpful. Use a label maker or Sharpie to indicate what the tag does ("Tap for Wi-Fi", "Work Mode", etc.).

2. **Avoid metal surfaces.** Metal interferes with NFC signals. If you must attach to metal, use **anti-metal NFC tags** (they have a ferrite layer that shields against interference). They're slightly thicker and more expensive but work perfectly on metal surfaces.

3. **Test before you stick.** Write the tag, test it, then peel the adhesive and stick it in place. Removing a stuck tag to rewrite it is annoying.

4. **Use the right tag for the job.** Don't waste NTAG216 (888 bytes) on a simple URL that takes 40 bytes. And don't try to fit a full vCard on an NTAG213 (144 bytes).

5. **Waterproof options exist.** Epoxy-coated NFC tags are waterproof and more durable. Good for outdoor use, kitchens, or bathrooms.

6. **Combine NFC tags with Shortcuts.** The real power of NFC tags on iPhone isn't just opening URLs - it's triggering complex automations. An NFC tag can launch any iOS Shortcut, which can control smart home devices, send messages, log data, and more.

---

## Frequently Asked Questions

### Can I rewrite an NFC tag?

Yes, as long as the tag hasn't been locked. Standard NFC tags can be rewritten **100,000+ times**. Just write new data over the old data - no need to "erase" first.

### How close does my iPhone need to be?

Within **2-4 cm** (about 1-2 inches). The NFC antenna is at the top edge of the iPhone. Hold the top of your phone directly over the tag for the best connection.

### Can I write to NFC tags without an app?

iOS Shortcuts has a built-in "Set NFC Tag" action for basic writes (URLs, text). But for Wi-Fi credentials, contacts, and more complex records, you'll need an app like NFC.cool Tools.

### Do NFC tags need batteries?

No. NFC tags are **passive** - they have no battery and draw power from your phone's NFC reader when you tap them. Tags can last **10+ years** because there's nothing to run out.

### Can I password-protect an NFC tag?

Standard NTAG tags don't support password protection in a user-friendly way. However, **NTAG 424 DNA** chips support cryptographic authentication and tamper detection. NFC.cool Tools supports reading these advanced tags. For simple protection, locking a tag prevents overwriting.

### Will NFC tags work through a phone case?

Yes, most phone cases are fine. NFC works through plastic, silicone, leather, and even thin wallets. Very thick cases (like heavy-duty rugged cases) or cases with metal plates (for magnetic car mounts) might interfere.

### How many tags can I write with one iPhone?

Unlimited. There's no restriction on how many tags you write. The limiting factor is the tags themselves, not your phone.

---

## What's Next?

Now that you know how to write NFC tags, the possibilities are wide open. Start with a simple project - a Wi-Fi tag for guests or a business card tag - and build from there.

If you're looking for a powerful, easy-to-use NFC writing app, **[NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=BlogWriteNfc&mt=8)** handles everything from basic URL writing to advanced tag management, with iOS Shortcuts integration for automation.

And if you want to turn NFC tags into professional digital business cards, **[NFC.cool Business Card](https://apps.apple.com/app/nfc-cool-business-card-maker/id6502926572?pt=106913804&ct=BlogWriteNfc&mt=8)** lets you create a beautiful card profile and write its URL to any NFC tag. The app UI and App Clip support 35 languages on iOS, and Android recipients see a website on the nfc.cool domain (currently English only).

**Download NFC.cool Tools:** [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=BlogWriteNfc&mt=8) | [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dblog-write-nfc)

**Download NFC.cool Business Card:** [App Store](https://apps.apple.com/app/nfc-cool-business-card-maker/id6502926572?pt=106913804&ct=BlogWriteNfc&mt=8) | [Android (in NFC.cool Tools)](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dblog-write-nfc)
