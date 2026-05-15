---
title: "NFC Tap Counter - Live Demo"
slug: "tap-counter"
description: "A live demo of the NFC Tap Counter. Write this page's URL to an NFC tag with NFC.cool Tools, tap the tag, and watch its own scan count and tag ID appear - no server involved."
image: "/assets/images/Blog/count-nfc-tag-scans.webp"
---

<section class="page-hero tap-counter-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# NFC Tap Counter

An NFC tag can count its own scans - the number lives in the chip, not on a server. Write a tag that points to this page, give it a tap, and the live count and tag ID show up in the card.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-tap-counter-en&mt=8" class="landing-store-button is-apple" aria-label="Download on the App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Download on the App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-tap-counter-en" class="landing-store-button is-google" aria-label="Get it on Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Get it on Google Play" width="173" height="52"/>
</a>
</div>

</div>

<div class="page-hero-visual">

<div id="tap-counter-demo" class="tap-demo">
<div class="tap-demo-card tap-demo-result">
<p class="tap-demo-label">Tag scanned</p>
<div class="tap-demo-count-row">
<p class="tap-demo-count" data-tap-count>0</p>
<p class="tap-demo-caption">scans counted by the tag</p>
</div>
<div class="tap-demo-field tap-demo-id-row">
<p class="tap-demo-label">Tag ID</p>
<p class="tap-demo-value" data-tap-id></p>
</div>
</div>
<div class="tap-demo-card tap-demo-empty">
<p class="tap-demo-label">Live demo</p>
<p class="tap-demo-text">Tap an NFC tag that points here and its scan count appears in this card.</p>
<div class="tap-demo-field">
<p class="tap-demo-label">Point your tag at</p>
<p class="tap-demo-value">https://nfc.cool/tap-counter/</p>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-section">

## How It Works

<div class="page-cards-grid">

<article class="page-card">
<h3>The chip keeps the count</h3>
<p>NTAG21x chips - the NTAG213, NTAG215 and NTAG216 used in most NFC stickers - have a counter built into the hardware. Every read ticks it up by one, with no app and no server in the loop.</p>
</article>

<article class="page-card">
<h3>The URL carries it</h3>
<p>NFC.cool Tools embeds placeholder bytes when it writes the tag. On every scan the chip swaps them for the live values and appends them as <code>?nfc=</code> - the tag ID first, then the count.</p>
</article>

<article class="page-card">
<h3>This page just reads it</h3>
<p>No backend, no database. This page decodes the <code>?nfc=</code> value straight out of its own address bar and shows you what the chip handed over. The counting already happened.</p>
</article>

</div>

</section>

<section class="page-section">

## What You Can Do With a Self-Counting Tag

<div class="page-cards-grid">

<article class="page-card">
<h3>Tell tags apart</h3>
<p>Put the same URL on fifty stickers and the tag ID still tells you which physical one was tapped. One link to manage, fifty tags you can identify.</p>
</article>

<article class="page-card">
<h3>Limit free access</h3>
<p>The count travels with every tap, so you can act on it - give the first hundred scans a reward and redirect the rest somewhere else.</p>
</article>

<article class="page-card">
<h3>Track engagement</h3>
<p>Stick a tag on a card, a poster or a product box and the counter becomes a quiet engagement metric - no analytics pipeline required.</p>
</article>

<article class="page-card">
<h3>Prove authenticity</h3>
<p>The counter only ever goes up and cannot be wound back, which makes it hard to fake - useful for limited editions and anti-counterfeit checks.</p>
</article>

</div>

</section>

<section class="page-hero tap-cta">

## Want the Full Story?

There is more to the NFC Tap Counter - which chips work, the real-world use cases, and the full step-by-step setup.

<div class="tap-cta-buttons">
<a href="/blog/count-nfc-tag-scans/" class="tap-cta-button is-primary">Read the guide</a>
<a href="/features/nfc-reader-writer/" class="tap-cta-button is-secondary">See the feature</a>
</div>

</section>
