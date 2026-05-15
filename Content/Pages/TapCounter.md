---
title: "NFC Tap Counter - Live Demo"
slug: "tap-counter"
description: "A live demo of the NFC Tap Counter. Write this page's URL to an NFC tag with NFC.cool Tools, tap the tag, and watch its own scan count and tag ID appear - no server involved."
image: "/assets/images/Blog/count-nfc-tag-scans.webp"
---

<section class="page-hero">

<div id="tap-counter-demo" class="tap-demo">

<h1 class="tap-demo-heading">NFC Tap Counter</h1>

<div class="tap-demo-result">
<div class="tap-demo-count-row">
<span class="tap-demo-count" data-tap-count>0</span>
<span class="tap-demo-count-caption">scans, counted by the tag itself</span>
</div>
<p class="tap-demo-id-row"><span class="tap-demo-id-label">Tag ID</span> <code class="tap-demo-id-value" data-tap-id></code></p>
<p class="tap-demo-raw">Read straight from the tag's URL: <code data-tap-raw></code></p>
<p class="tap-demo-note">No server, no internet - the chip did the counting.</p>
</div>

<div class="tap-demo-empty">
<p class="tap-demo-lead">This is a live demo of the NFC Tap Counter in NFC.cool Tools. Write an NFC tag so it points to the URL below, tap it, and the tag's own scan count and ID appear right here - decoded straight from the address bar, with no server in the loop.</p>
<p class="tap-demo-url">Point your tag at <code>https://nfc.cool/tap-counter/</code></p>
</div>

</div>

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-tap-counter-en&mt=8" class="landing-store-button is-apple" aria-label="Download on the App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Download on the App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-tap-counter-en" class="landing-store-button is-google" aria-label="Get it on Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Get it on Google Play" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## How This Demo Works

When you switch on the NFC Tap Counter in NFC.cool Tools and write a tag, the app embeds placeholder bytes into the URL. On every scan, the NTAG21x chip replaces them with two live values before your phone ever reads the tag: the tag's running scan count and its unique factory ID.

This page is that website. It carries no backend - it simply reads the `?nfc=` value the chip appended to its own address and shows you what arrived. The counting happened inside the chip; this page only displays it.

- The **scan count** arrives as a six-digit hexadecimal number (`000007` is the seventh scan).
- The **tag ID** is the chip's 7-byte factory serial number, identical on every read.

Want the full story - which chips work, the real-world use cases, and the step-by-step setup? Read [How to Count NFC Tag Scans Without a Server](/blog/count-nfc-tag-scans/), or see the complete [NFC reader and writer feature](/features/nfc-reader-writer/).

</section>
