---
id: "nfc-reading-ipad-mac-2026-06"
title: "How NFC.cool Reads NFC Tags on iPad and Mac"
date: "2026-06-18"
tags: ["announcements", "nfc-tags"]
summary: "iPads and Macs have no NFC chip, so I always said they couldn't read NFC tags. With an external USB reader, version 6.15.0 changes that - here's how it works, and where it came from."
image: "/assets/images/Blog/nfc-ipad-mac-external-reader.webp"
imageAlt: "An iPad beside a HID OMNIKEY USB NFC reader with a tag resting on it"
author: "Nicolo Stanciu"
metaTitle: "How NFC.cool Reads NFC Tags on iPad and Mac"
metaDescription: "iPads and Macs have no NFC radio, so they couldn't read NFC tags. In NFC.cool 6.15.0, an external USB reader changes that on iPad and Mac. Here's how it works."
ogTitle: "NFC Tag Reading Comes to iPad and Mac"
ogDescription: "No NFC chip in your iPad or Mac? With an external USB reader, NFC.cool 6.15.0 reads and writes tags there too - plus the honest limits."
---
Last year I was in Bologna for [PragmaConf 2025](https://pragmaconference.com). It was my first time at that conference, and, as it turned out, also my last - the organizers can't keep it running, so the edition I went to was the final one. I'm still a little sad about it.

While I was there I got talking to [Alexander Manzer](https://www.linkedin.com/in/alexander-manzer), a fellow iOS and NFC developer. At some point the conversation drifted to a problem I'd long since filed under "impossible": reading NFC tags on an iPad. iPads have no NFC chip, so I'd always told people it simply couldn't be done. Alexander told me it could - with the right external reader - and offered to send me a small piece of code to get started. He did, a few days later. That snippet is the reason NFC.cool can now read NFC tags on iPad and Mac.

---

## I told you this wouldn't work

Back in May, [when NFC.cool came to Mac](/blog/nfc-cool-comes-to-mac/), I wrote a whole section on what the Mac can't do and put NFC scanning right at the top of it. My reasoning was simple: Macs have no NFC radio, iPads have no NFC radio, and that is a hardware limit no software update of mine can fix.

That part is still true - for the chip built into the device. What I missed is that you don't have to use the built-in chip. You can plug one in.

---

## How it works without an NFC chip

The trick is an external USB NFC reader. You connect it to your iPad or Mac, and NFC.cool talks to it directly. There are no drivers to install: it works through the smart-card support Apple already ships in iPadOS and macOS, so the moment you plug the reader into the USB-C port, the app notices it and switches over on its own.

The app prefers an external reader whenever one is plugged in. On an iPad or Mac that reader is the only NFC hardware in play, so there is nothing to decide. On an iPhone it becomes a choice the app makes for you: plug a reader in and NFC.cool uses it, leave it unplugged and the phone falls back to its own built-in NFC. You don't flip a setting, and you don't pick a mode - the app figures out what hardware it has and acts accordingly.

The reader I built this around, and the only one I have actually tested, is the HID OMNIKEY 5022 CL. Other USB readers work too, and a few of them are in the list below, sent in by users who tried them.

<figure class="phone-figure" data-layout="stage" data-device="ipad">
<figcaption>An iPad With a USB Reader</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-1-place-tag-600w.webp" alt="NFC.cool on an iPad with an external USB NFC reader plugged in: Place tag on reader"><p><strong>Plug in a reader.</strong> NFC.cool picks it up on its own and waits for a tag.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-2-tag-read-600w.webp" alt="NFC.cool on the iPad after the read: a green check and Tag read"><p><strong>Place the tag on it.</strong> The reader does the radio part, the iPad does the rest.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-3-record-600w.webp" alt="The tag's full record on the iPad: a business card for Anna Miller, with the raw vCard below"><p><strong>Everything you'd see on an iPhone.</strong> The same records, the same tools.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-4-sonicare-600w.webp" alt="Sonicare Reset on the iPad: a brush head at 80% used, with Reset Timer"><p><strong>Even the hard one.</strong> Reading a Sonicare head and writing back to its password-protected counter works too.</p></li>
</ol>
</figure>

---

## The readers that work

Here is every reader I currently know of that works with NFC.cool:

- **HID OMNIKEY 5022 CL** - the one I built this around and tested end to end ([Amazon](https://amzn.to/3SNPi46))
- **HID OMNIKEY 5422** - reported working by a user ([Amazon](https://amzn.to/4xZVEwe))
- **ACS ACR1552U-M1** - reported working by a user ([Amazon](https://amzn.to/4xZVEwe))
- **ACS ACR1255U-J1** - reported working by a user ([Amazon](https://amzn.to/4xZVEwe))

Thank you to everyone who wrote in. I can't buy every reader on the market, so every model past the first one is on this list because someone bought it, tried it, and took the time to tell me. If you are using a reader that isn't here, [let me know](/contact/) whether it worked or where it broke, and I'll add it to this post.

Those are Amazon affiliate links: if you buy through one I may earn a small commission at no extra cost to you.

---

## What you can do with it

<figure class="phone-figure" data-layout="float" data-device="mac">
<ol>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/mac-1-my-messages-800w.webp" alt="A MacBook with an external USB NFC reader on the desk beside it, showing NFC.cool's My NFC Messages"><p><strong>On a Mac, too.</strong> Plug the reader into your Mac, and every tag you read lands in My NFC Messages.</p></li>
</ol>
</figure>

Almost everything you would do on an iPhone. You can read tags and dump their full memory, write NDEF messages, and run batch jobs that read or write a whole stack of tags one after another. Password-protecting tags works. So does [OpenPrintTag](/blog/openprinttag-read-write-nfc-spools-phone/), the 3D-printer filament-spool format, in both directions. And yes, the [Philips Sonicare brush-head reset](/blog/reset-sonicare-brush-head-nfc/) runs too.

That last one was the hard part. Resetting a Sonicare head means reading a counter off the tag and then writing back to a password-protected page, and the tag only accepts that write if it still considers you authenticated from a moment earlier. Through an external reader, that meant holding a single session with the reader open across both steps instead of letting it close in between. Once that held, the operations that depend on it - protected writes, the brush reset - started behaving the way they do on a phone.

---

## The honest limits

A couple of things still aren't there, and I would rather tell you than let you find out.

- The OMNIKEY 5022 CL is the only reader I have tested myself. The others in the list above come from user reports, and anything beyond that list is unverified territory.
- MIFARE Classic tags are read-only through the reader. You can read them, not write them.

None of these break the way most people will use this, but they are real, and they are the kind of thing I'd want to know before buying a reader.

---

## Thanks, Alexander

I want to be clear about where this came from. I didn't sit down and invent it - Alexander handed me the thread and I pulled on it. He didn't have to share that code, and I'm grateful he did. Part of why I chased it so hard afterward is plain: I wanted NFC.cool to be the first iPad app that could actually read an NFC tag. Whether or not it turns out to be the very first, getting there was worth the work.

NFC tag reading on iPad and Mac arrives in NFC.cool 6.15.0. If you have an iPad or a Mac, a supported reader, and a tag you could never scan from your desk before, it will just work.

Need the reader? Here is the HID OMNIKEY 5022 CL on [Amazon](https://amzn.to/3SNPi46) - the link takes you to your local Amazon store. That is an affiliate link: if you buy through it I may earn a small commission at no extra cost to you, and it helps fund the work on NFC.cool.

[Download NFC.cool Tools for iPhone, iPad, and Mac](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-reading-ipad-mac-en&mt=8)

And if you were at that last PragmaConf in Bologna: thanks for a good one. I wish there were going to be another.
