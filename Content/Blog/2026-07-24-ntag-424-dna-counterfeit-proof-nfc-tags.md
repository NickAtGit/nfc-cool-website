---
id: "ntag-424-dna-2026-07"
title: "NTAG 424 DNA: The NFC Tags That Prove They Aren't Fakes"
date: "2026-07-24"
tags: ["announcements", "nfc-tags", "industry"]
summary: "I heard luxury brands use NTAG 424 DNA tags to prove a product is genuine, so I bought a batch off AliExpress to see what they actually do. They turned out to be the NFC Tap Counter with a cryptographic layer bolted on, and NFC.cool Tools now reads, verifies, and fully configures them on iPhone and Android - every key, every file's permissions, and the chip's own settings."
image: "/assets/images/Blog/ntag-424-dna-counterfeit-proof-nfc-tags.webp"
imageAlt: "A leather handbag with an NFC authentication tag beside an iPhone showing a security shield and key icons"
author: "Nicolo Stanciu"
metaTitle: "NTAG 424 DNA: The Anti-Counterfeit NFC Tag Explained"
metaDescription: "I bought NTAG 424 DNA tags to see how brands prove a product is genuine. Here's how these anti-counterfeit NFC tags work, and how NFC.cool reads, verifies, and programs them."
ogTitle: "The NFC Tags That Prove They Aren't Fakes"
ogDescription: "How NTAG 424 DNA tags catch clones, and how NFC.cool reads, verifies, and configures them on iPhone and Android."
---

A while back I kept reading the same claim in passing: luxury brands are putting NFC chips in their products so you can tap a bag or a pair of sneakers with your phone and know it's the real thing, not a counterfeit. Every article said the same shiny sentence and none of them said *how*. What actually stops a counterfeiter from copying the chip along with the handbag?

So I did the thing I always do when I'm curious about a tag. I went on AliExpress, found a listing for "NTAG 424 DNA" tags, ordered a small batch, and waited for the envelope to show up. A few euros, a couple of weeks, and I had the same silicon those brand-protection systems are built on sitting on my desk. Then I tapped one to see what it does.

---

## What an NTAG 424 DNA tag actually is

On the outside it's an ordinary NFC tag. You couldn't pick it out of a pile of cheap ones, and any phone reads it without complaint. If you've read my [guide to NFC tag types](/blog/nfc-tag-types-for-iphones/), it slots in as one more Type 4 tag your iPhone is happy to read.

The "DNA" part is what's different. Inside, the chip holds a few AES-128 keys and a little cryptographic engine, and it can do something no plain NTAG215 or sticker from a multipack can do: it can *sign* every single tap. That signature is the whole ballgame. It's the difference between a tag that says "here's a link" and a tag that says "here's a link, and here's cryptographic proof that I, this specific genuine chip, am the one serving it, right now."

That's what luxury brands are actually paying for - not the link, the proof that a genuine chip is the one serving it.

---

## How SUN and SDM work: a link that rewrites itself on every tap

Here's the moment it clicked for me. When I looked at what the tag was actually sending, I realized I'd already built most of the machinery to understand it.

Earlier this year I shipped an [NFC Tap Counter feature](/blog/count-nfc-tag-scans/): a tag that counts how many times it's been read and puts that number in the URL, so a link can know it's the 47th time someone scanned it. An NTAG 424 DNA tag is that same idea, with an encryption layer wrapped around it that makes it impossible to fake.

The mechanism is called **SUN** (Secure Unique NFC), or **SDM** (Secure Dynamic Messaging) if you're reading [NXP's datasheet](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf). You store a normal link on the tag, something like `https://example.com`. But you tell the chip to rewrite parts of that link on the fly every time it's tapped. So what your phone actually receives is closer to:

`https://example.com/?picc_data=A1B2...&cmac=9F3C...`

Those two values are not decoration. `picc_data` is an encrypted copy of the tag's real ID plus a tap counter, scrambled with a key that never leaves the chip. `cmac` is a cryptographic signature over that data. Both change on every tap. Tap the same tag twice and you get two completely different URLs, each one signed fresh by the chip.

I think of a plain NFC tag as a printed sign in a shop window. Anyone can photograph it and print an identical copy. A SUN tag is more like a security guard who hands you a new, individually numbered and stamped receipt every time you walk in. Copying yesterday's receipt does you no good, because today's number is different and only the guard's stamp is real.

---

## Why a cloned NTAG 424 DNA tag gets caught

This is the part that answers my original question. A counterfeiter can absolutely clone the *contents* of a tag. They can read the URL, copy it byte for byte, and program it onto a blank chip. That has always been true.

What they can't do is produce the next valid signature. The signing key lives inside the genuine chip and never comes out, not even during a tap. That means a tap is only worth anything to something that actually holds the key. In a real brand-protection setup the tag's link points at a server the maker runs, and that server is what decrypts each tap, recomputes the signature to confirm the key matches, and keeps track of the counter as it climbs.

That last part is what catches a clone. The only URL a counterfeiter can put on a fake is one they captured from a genuine tap, frozen with the counter that tap happened to carry. Replay it and the server is looking at a number it has already seen, and a real chip's counter only ever moves forward, so a repeat or a step backward gives the replay away. To send a fresh, higher counter with a signature that still checks out, they'd need the key, and to get the key they'd need to break AES or physically decap the chip. Neither is happening for a fake handbag.

That's the honest version of the marketing sentence. The chip doesn't make the *product* impossible to copy. It makes the *proof of authenticity* impossible to copy, and it moves that proof onto something the counterfeiter can't reproduce.

---

## How NFC.cool verifies a tag is genuine

Once I understood the tags, I wanted the app to do the whole thing properly, not just show a hex dump. So NFC.cool Tools now has full NTAG 424 DNA handling on [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-en&mt=8) and [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-en), and it checks authenticity two independent ways, plus a third, physical one on the tags built for it.

**The chip's origin.** Every genuine NXP chip carries a factory signature over its own ID, signed with NXP's private key. NFC.cool reads that signature and verifies it against NXP's public key, right on the phone. If it checks out, you get a plain "Genuine NXP" result. This one needs no setup and no keys from you. It answers "is this real NXP silicon, or a no-name clone?"

**The tap itself.** This is the SUN check. NFC.cool decrypts the `picc_data`, pulls out the tag ID and the tap counter, recomputes the signature, and compares it against the `cmac` the tag sent. If they match, the tap is genuine and fresh, and you see "Authentic." This one proves more, so it asks for more: it needs the tag's key. A brand-new tag still on its factory default verifies with no input at all. A tag someone locked with their own key only verifies as authentic if you've got that key stored.

**The physical seal, on the tags built for it.** One version of these, the NTAG 424 DNA TagTamper, is made to be a tamper-evident seal. It's a sticker with a thin extra wire running through it, and you stick it across whatever you want to protect, over a box's flap or around a bottle's cap, the same job those "warranty void if broken" stickers do today. Open the item and you tear the sticker, which snaps the wire. NFC.cool checks that wire on a tap and tells you plainly whether the seal is still intact or has been broken. The neat part is that it's a one-way latch: snap it once and the chip remembers forever, so something that was opened and then carefully re-sealed still reads as opened. The crypto proves the chip is genuine; this proves nobody has been into the box.

All of this is free for everyone. Reading a tag - its link, its tap counter, its file layout, whether its seal is still intact - and running both cryptographic checks costs nothing. I wanted the "is this thing real?" question answerable by anyone who taps one.

---

## Programming your own secure tags

Reading is half of it. The other half is that those blank tags from AliExpress are yours to program, and NFC.cool does it over a proper authenticated, encrypted channel, the same secure messaging the chip insists on, not a hopeful raw write.

The gentle version is three steps. Write your own link, which is free. Switch on SUN so the tag starts signing every tap. And replace the factory key with your own, set as a passphrase so there's no 32-character hex string to wrangle, saved in your keychain. From that point on the tag is locked to you: it keeps proving it's genuine to anyone who taps it, but only you can ever reprogram it.

That's where I could have stopped. The few apps that even go near these tags do. I didn't.

---

## Configure the whole NTAG 424 DNA chip from your iPhone or Android

Somewhere in a week of late nights with these tags, I made a decision: NFC.cool Tools was going to cover 100% of the NTAG 424 DNA spec, not the demo-friendly slice every "tap to verify" tutorial stops at. If I want this to be the best NFC app there is, then "we support NTAG 424 DNA" can't quietly mean "we support the one key and the one mode that were easy." So I went down the datasheet and built the rest.

An NTAG 424 DNA chip doesn't have one key. It has five. NFC.cool now manages all of them - change any slot, reset it back to factory, or enter a key you set on another device so this phone can drive the tag too. SUN doesn't have to sign with that primary key either: you can point the tap's encryption at one key and its signature at another, and decide whether the tag mirrors its ID in the clear or keeps it encrypted.

Every file on the chip carries its own access rules, and you can edit them now - who may read a file, who may write it, who may change its settings - each set to a specific key, or to wide open, or to shut forever. Under the files sits the chip's own configuration, and that's here too: switch on a random ID so the tag stops broadcasting the same serial number to every reader it passes (a real privacy win), cap how many failed unlock attempts it tolerates before it locks itself down, and a handful of lower-level switches most people will never need to touch.

The chip even keeps a little private vault. There's an encrypted file on it, locked to your Key 0, that rides along on the tag itself instead of living on a server. Stash a small secret in it, something you want to travel with the tag rather than sit on someone's database, and only your key can read it back. NFC.cool writes it and reads it for you.

If you have ever done this before, you did it at a desk. NXP hands out a Windows tool called TagXplorer, you plug a USB reader into your computer, and you click through the chip's configuration from there. NFC.cool does all of the same things, but it is built to be used, not endured. Where TagXplorer is a desktop full of raw hex and cryptic fields, NFC.cool is plain-language screens on the phone already in your pocket, with a passphrase in place of a raw key and a warning before anything permanent. You drive the whole thing by holding your phone to the tag for a second or two.

---

## What NTAG 424 DNA LRP mode is, and the changes you can't undo

And then there's LRP. In my design notes for the first version, right next to "LRP mode," I had written "not planned - exotic, not needed by a consumer app." LRP stands for Leakage-Resilient Primitive, and it is the tag's genuinely paranoid mode. Normally the chip guards its keys with ordinary AES, and stealing a key would mean breaking AES itself. But there is a sneakier line of attack: put a chip on a bench, watch the faint wobble in its power draw and electromagnetic hum while it runs the crypto, and with enough of those traces you can reconstruct the secret key from the leak alone, without ever touching the math. LRP is a rebuilt secure channel designed to give that leak nothing to hold onto. It is real overkill for a sticker on a wine bottle, which is why most tags never turn it on and most tools never learn to speak it. It kept nagging at me anyway, and "cover the whole spec" doesn't come with a footnote that says "except the hard part," so I built it. NFC.cool speaks LRP now, which means even after a tag is flipped into that mode, a one-way switch you can't take back, the app can still authenticate to it and manage it like any other. I don't know of another phone app that goes there.

I'll be straight about the sharp edges, because there are more of them now. A lot of these commands are permanent. Enabling LRP can't be undone. Turning on a random ID can't be undone. Set a file's "change" permission to Never and you have frozen that file for the life of the tag. A wrong key can lock a slot for good. The app is loud about this in the moment, the truly irreversible actions make you confirm through a warning that spells out the exact consequence, but it is worth saying here too: practice on a spare before you touch a tag you care about.

---

## Where anti-counterfeit NFC tags actually get used

Honestly? Most people tapping an NFC tag never need any of this, and that's fine. A sticker that opens a link is a wonderful, boring, useful thing.

But once you've held one of these, the use cases are obvious. A luxury bag can prove it's genuine. A bottle of wine or whisky can show it was never quietly uncorked and topped back up with something cheaper, the tamper seal carrying that half. A box of medicine vouches for both the real drug inside and a seal nobody has broken. A limited-run product or a piece of art gets a certificate no one can forge, and event tickets stop being something you can screenshot and pass around. Put a tag by a door or on a shelf and a tap proves someone actually stood there, rather than replaying a saved link from their sofa. Sneakers and trading cards prove they're the real drop and not a good fake. And any indie maker can make their thing prove it's *their* thing. It's the same authenticity problem the [EU Digital Product Passport](/blog/eu-digital-product-passport-2026/) is circling from the regulation side, solved at the level of the individual object.

I didn't build this because a thousand users asked for it. I built it because I bought some strange tags off the internet out of curiosity, figured out how they worked, and then couldn't leave a single page of the datasheet unturned. That's usually how the good features start.

---

## The bottom line on NTAG 424 DNA tags

NTAG 424 DNA tags are the closest thing NFC has to a tamper-proof seal. They can't stop someone copying a product, but they make the product's *proof of being genuine* impossible to fake, because that proof is a fresh cryptographic signature only the real chip can produce.

NFC.cool Tools now reads them, verifies the chip, the tap, and the tamper seal for free, and hands you the whole chip to configure - every key, every file's permissions, its lowest-level settings, even LRP - to provision your own right from your phone. If you've ever wondered how a tap can tell real from fake, grab it on [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-en&mt=8) or [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-en), order a couple of [these tags](/affiliate-links/) for a few euros, and tap one yourself. It's a good rabbit hole.
