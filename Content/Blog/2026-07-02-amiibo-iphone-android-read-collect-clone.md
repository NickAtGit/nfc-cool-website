---
id: "amiibo-iphone-android-read-collect-clone-2026-07"
title: "Read, Collect, and Clone Amiibo on iPhone and Android"
date: "2026-07-02"
tags: ["announcements", "iphone", "android"]
summary: "I want NFC.cool to be the best NFC app on iPhone and Android, so I gave it full Amiibo support: scan a figure to see its details, build a personal collection, and clone one to a blank NTAG215. Here's how Amiibo actually work under the hood - and why the app ships no keys."
image: "/assets/images/Blog/amiibo-iphone-android-read-collect-clone.webp"
imageAlt: "An imaginary NFC collectible figure beside a phone showing a private collection screen"
author: "Nicolo Stanciu"
metaTitle: "Amiibo on iPhone and Android: Read, Collect, Clone"
metaDescription: "NFC.cool reads Amiibo on iPhone and Android, keeps a collection, and clones them to blank NTAG215 tags. How Amiibo work under the hood, and the honest limits."
ogTitle: "Read, Collect, and Clone Amiibo on iPhone and Android"
ogDescription: "I gave NFC.cool full Amiibo support - scan, collect, and clone to a blank tag. Here's how Amiibo actually work, and why the app ships no keys."
---
People assume there is something exotic inside an Amiibo. Some bit of Nintendo silicon you cannot buy anywhere else. There isn't. Sealed into the base of the figure is an [NTAG215](/affiliate-links/) - the same blank sticker chip I read and write every day, the kind that comes ten to a pack for pocket change. Around 540 bytes of memory, a serial number burned in at the factory, and that is the whole figure. The plastic is the expensive part. The chip is almost an afterthought.

Which is exactly why it nagged at me for so long. I read and write NFC tags for a living, and there was a whole category of them - a handful of figures on the shelf by my desk - that my own app just shrugged at. I want NFC.cool to be the most capable NFC app you can put on your phone, the one that leaves no kind of tag on the table.

So I sat down, figures on one side and my Switch on the other, and gave NFC.cool proper Amiibo support. Here is what that turned into, and what I learned along the way - starting with why a chip this cheap is so surprisingly hard to copy.

---

## So where's the magic?

If the chip is this ordinary, the magic clearly is not in the silicon. It is in the bytes. An Amiibo is really a cheap notebook that Nintendo has written in a private code, then signed at the bottom so you can tell a forgery from the real thing. (The chip itself is a plain [NTAG215](/blog/nfc-tag-types-for-iphones/), if you want the deeper tour of tag types.)

Two things live in those bytes. The first is out in the open: a small block that says which character this is - Link, from the Legend of Zelda series, in a particular Amiibo lineup. That is the part your Switch reads to know a figure just touched it. The second part is locked: the actual save data, like a nickname, the owner's Mii, how many times the figure has been used, and whatever the current game has scribbled into the little scratchpad it is allowed to use. That part is encrypted, and it is signed.

## Why you can't just copy an Amiibo

The encrypted save is not protected by one fixed key you could look up once and reuse forever. Every tag gets its own keys, derived on the spot from a set of master keys mixed together with data pulled off that specific tag - including its unique serial number. On top of that, the whole thing is signed with an HMAC. Change a single byte without re-signing it, and the console spots the forgery and refuses the figure.

Now here is the trap. Because the serial number is baked into both the key derivation and the signature, you cannot dump a real Amiibo and byte-copy it onto a blank tag. The blank has a different serial number, so every derived key comes out different, the signature no longer matches, and the console rejects it. The obvious "just copy all the pages" approach fails every time.

To clone one properly you have to re-derive the keys against the destination tag and re-sign the data so it is valid for that exact piece of plastic and silicon, not the one you dumped it from. The reference implementation everyone builds on is a tool called amiitool. I rebuilt that whole dance natively inside the app - tag format to internal format and back, key derivation, encryption, signing - so NFC.cool can do it on the phone in your hand, with no computer in the loop.

## What NFC.cool does now

Three things, in the order you will probably use them.

**Read.** Hold an Amiibo to the back of your phone, the same way you would [read any NFC tag](/features/nfc-reader-writer/), and NFC.cool identifies it on the spot: the character, the game series, the Amiibo series, the figure type, and the artwork, along with a couple of facts from the tag itself, like how many times it has been written. No keys needed for this. Identifying a figure only touches the part that is already in the open.

**Collect.** Every Amiibo you scan is saved to My Collection, a simple grid of everything you own. It lives on your device - on iPhone it syncs to your other Apple devices through iCloud - and the artwork is cached so the collection still looks right when you are offline. That alone turned my sad little shelf into something I can actually browse.

**Clone.** With your own keys imported, you can write a re-keyed copy of a figure to a blank NTAG215. You can clone straight from a figure you just scanned, or from a saved `.bin` dump on your device. The app re-derives the keys for the blank you are holding and signs the data for that tag, so the copy is valid on its own terms rather than a doomed byte-for-byte forgery. The write is permanent - once the tag is locked, it is locked - and the app says so plainly before you commit.

## What's deliberately left out

NFC.cool does not ship the Amiibo keys, and it never will. There are no keys hidden in the app, and there is no library of Amiibo data baked in.

Reading and collecting work out of the box because they only ever touch the open part of the tag. Cloning is different: it needs the master keys, and those are Nintendo's, not mine. If you have obtained them yourself - the combined `key.bin`, or the two separate files - you import them into the app once and the clone feature switches on. If you have not, it stays off. I built the machine; the fuel is yours to bring.

I think that is the honest line to walk. The capability is genuinely useful. Backing up a figure your kid is one bad afternoon away from losing, or putting a spare on a cheap card instead of risking the original, are real reasons people want this. I would rather give you a clean, private way to do it on your own phone than pretend the demand does not exist. But I am not going to hand out something that was never mine to hand out.

## It actually works

I did not want to ship this on faith, so I tested it the only way that counts.

I scanned one of my own figures, cloned it to a blank NTAG215, and carried the copy over to my Switch. I loaded up The Legend of Zelda: Tears of the Kingdom, tapped the clone against the right Joy-Con, and it dropped a handful of in-game items into my inventory. Same as the original. No complaints, no "this Amiibo cannot be read." That was the moment the whole thing felt real to me. All that key-derivation math and those byte layouts, and the payoff is a cheap blank sticker that a Nintendo console happily treats as the real figure.

---

That shelf next to my desk is not just decoration anymore. It is a feature.

If you want to try it, the Amiibo tools live in NFC.cool on [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-amiibo-iphone-android-read-collect-clone-en&mt=8) and [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-amiibo-iphone-android-read-collect-clone-en), right alongside everything else I have built for reading and writing tags. Bring your own keys, tap a figure, and see what your app has been quietly ignoring this whole time.
