---
title: "Online NFC Reader"
slug: "nfc-reader"
description: "Read NFC tags right in your browser - no app, no sign-up. Scan an NFC tag with your phone and see its contents instantly. Free, works on Android Chrome; iPhone users get the free NFC.cool app."
image: "/assets/images/og-landing.webp"
---

<section class="page-hero nfc-reader-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Online NFC Reader

Read an NFC tag straight from your browser - no app, no sign-up. Press *Scan a Tag*, hold your phone to the tag, and its contents appear instantly. Free, and nothing you scan ever leaves your device.

</div>

<div class="page-hero-visual">

<div id="nfc-reader-app" class="nfc-reader" data-state="unsupported"><div class="nfc-reader-card"><div class="nfc-reader-panel" data-panel="ready"><p class="nfc-reader-label">Browser NFC reader</p><p class="nfc-reader-lead">Your phone can read NFC tags right on this page. Press the button, then hold a tag to the top of your phone.</p><button type="button" class="landing-cta-button nfc-reader-btn" data-nfc-scan>Scan a Tag</button></div><div class="nfc-reader-panel" data-panel="scanning"><p class="nfc-reader-label">Scanning</p><div class="nfc-reader-pulse" aria-hidden="true"></div><p class="nfc-reader-lead">Hold an NFC tag against the top of your phone.</p></div><div class="nfc-reader-panel" data-panel="result"><p class="nfc-reader-label">Tag contents</p><ul class="nfc-reader-records" data-nfc-records></ul><div class="nfc-reader-field"><p class="nfc-reader-label">Serial number</p><p class="nfc-reader-value" data-nfc-serial></p></div><button type="button" class="landing-cta-button nfc-reader-btn" data-nfc-again>Scan Another Tag</button></div><div class="nfc-reader-panel" data-panel="error"><p class="nfc-reader-label">Couldn't read the tag</p><p class="nfc-reader-lead" data-nfc-error-msg>Something went wrong.</p><button type="button" class="landing-cta-button nfc-reader-btn" data-nfc-retry>Try Again</button></div><div class="nfc-reader-panel" data-panel="unsupported"><p class="nfc-reader-label">Use the app on this device</p><p class="nfc-reader-lead">In-browser NFC reading runs on Android with Chrome. On iPhone and on desktop, read and write tags with the free NFC.cool app.</p><div class="landing-store-buttons"><a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-en&mt=8" class="landing-store-button is-apple" aria-label="Download on the App Store" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/AppStore.svg" alt="Download on the App Store" width="156" height="52"/></a><a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-en" class="landing-store-button is-google" aria-label="Get it on Google Play" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/GooglePlay.svg" alt="Get it on Google Play" width="173" height="52"/></a></div></div></div></div>

</div>

</div>

</section>

<section class="page-section">

## How the Online NFC Reader Works

<div class="page-cards-grid">

<article class="page-card">
<h3>It runs in your browser</h3>
<p>Modern Android browsers can talk to your phone's NFC hardware through a feature called Web NFC. This page uses it directly - there is no app to install and no account to create.</p>
</article>

<article class="page-card">
<h3>Your phone does the reading</h3>
<p>When you press <em>Scan a Tag</em>, your browser asks for NFC permission and starts listening. Hold a tag to the top of your phone and the chip's data is decoded on the spot.</p>
</article>

<article class="page-card">
<h3>Nothing is uploaded</h3>
<p>The tag's contents are read and shown entirely on your device. No server sees the data, nothing is stored, and there is no tracking - close the tab and it is gone.</p>
</article>

</div>

</section>

<section class="page-section">

## Reading NFC Tags on iPhone

iPhone can read NFC tags - but not from a browser. Apple does not give Safari or any iOS browser access to the NFC chip, so a web-based reader simply cannot work on iPhone or iPad.

The free **NFC.cool app** does it instead. It reads any NFC tag with a tap, writes 25+ kinds of data back to a tag, and works on both iPhone and Android. It is the same toolkit behind this page.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-en&mt=8" class="landing-store-button is-apple" aria-label="Download on the App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Download NFC.cool on the App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-en" class="landing-store-button is-google" aria-label="Get it on Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Get NFC.cool on Google Play" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## What You Can Read From an NFC Tag

<div class="page-cards-grid">

<article class="page-card">
<h3>Links and URLs</h3>
<p>The most common tag content - a web address that opens a page, a profile, or a menu. The reader shows the full link so you can see exactly where it points before you tap it.</p>
</article>

<article class="page-card">
<h3>Plain text</h3>
<p>Notes, instructions, IDs, or any short message stored as a text record. The reader decodes the text and its language straight from the chip.</p>
</article>

<article class="page-card">
<h3>Other records</h3>
<p>Wi-Fi credentials, contact cards, and app-specific data show up as typed records. You also see the tag's unique serial number, which is the same on every read.</p>
</article>

<article class="page-card">
<h3>Empty or locked tags</h3>
<p>A blank tag reads cleanly with no records - useful for checking a fresh tag before you write to it. Locked tags still report their type and serial number.</p>
</article>

</div>

</section>

<section class="page-section">

## Online NFC Reader FAQ

<details class="faq-item">
<summary>Can I read an NFC tag online without an app?</summary>
<p>Yes - on an Android phone using Chrome. This page reads the tag through your browser's built-in Web NFC support, so there is nothing to install. On iPhone, browser-based reading is not possible and you need the NFC.cool app.</p>
</details>

<details class="faq-item">
<summary>Does the online NFC reader work on iPhone?</summary>
<p>No. Apple does not allow Safari or any other iOS browser to access the NFC chip, so no website can read NFC tags on iPhone or iPad. The free NFC.cool app reads and writes NFC tags on iPhone instead.</p>
</details>

<details class="faq-item">
<summary>Is the online NFC reader free?</summary>
<p>Completely free. There is no sign-up, no limit on scans, and no payment. The tag's data is decoded on your own device and never uploaded.</p>
</details>

<details class="faq-item">
<summary>Which browsers can read NFC tags?</summary>
<p>Web NFC is supported by Chrome and most Chromium-based browsers on Android. Desktop browsers and all iOS browsers do not support it. If your browser cannot read tags, this page shows you the app download instead.</p>
</details>

<details class="faq-item">
<summary>Why does my phone say NFC reading isn't supported?</summary>
<p>Usually one of three reasons: you are on iPhone (browser NFC is blocked by Apple), you are on a desktop browser, or NFC is switched off in your Android settings. Turn NFC on in Settings, use Chrome, and reload the page.</p>
</details>

</section>

<section class="page-hero nfc-reader-cta">

## Read and Write NFC Tags Anywhere

The online reader is just the start. The free NFC.cool app reads any tag and writes 25+ kinds of data back - links, Wi-Fi, contacts, shortcuts and more - on both iPhone and Android.

<div class="tap-cta-buttons">
<a href="/features/nfc-reader-writer/" class="tap-cta-button is-primary">See the NFC Reader & Writer</a>
<a href="/blog/nfc-tags-beginners-guide/" class="tap-cta-button is-secondary">New to NFC tags? Start here</a>
</div>

</section>
