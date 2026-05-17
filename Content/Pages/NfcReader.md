---
title: "Online NFC Reader"
slug: "nfc-reader"
description: "Read and write NFC tags right in your browser - no app, no sign-up. Scan a tag to see what's on it, or write a link or text to one. Free, runs in Chrome on Android; iPhone users get the free NFC.cool app."
image: "/assets/images/og-landing.webp"
---

<section class="page-hero nfc-reader-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Online NFC Reader

I built this so you can read an NFC tag straight from your browser - no app, no sign-up. Tap *Scan a Tag*, hold your phone to the tag, and its contents appear right away. Switch to the *Write* tab and you can put a link or text onto a tag too. Everything runs on your phone, and nothing you scan ever leaves it.

<div class="nfc-hero-reqs"><span class="platform-pill is-android"><svg class="platform-pill-icon" viewBox="0 0 576 512" aria-hidden="true"><path fill="currentColor" d="M420.55 301.93a24 24 0 1 1 24-24 24 24 0 0 1-24 24m-265.1 0a24 24 0 1 1 24-24 24 24 0 0 1-24 24m273.7-144.48l47.94-83a10 10 0 0 0-3.71-13.65 10 10 0 0 0-13.55 3.69l-48.54 84.07c-73.31-33.55-156.72-33.5-230.13 0L132.46 64.46a10 10 0 0 0-17.27 10l47.94 83C81.04 202.22 24.74 285.55 16.5 384h543c-8.24-98.45-64.54-181.78-146.85-226.55"/></svg><span class="platform-pill-label">Chrome on Android</span></span></div>

</div>

<div class="page-hero-visual">

<div id="nfc-reader-app" class="nfc-reader" data-state="desktop" data-mode="read" data-write-type="url">
<div class="nfc-phone">
<div class="nfc-phone-screen">
<div class="nfc-reader-tabs" role="tablist" aria-label="Reader mode">
<button type="button" class="nfc-reader-tab" data-nfc-tab="read" role="tab" aria-selected="true">Read</button>
<button type="button" class="nfc-reader-tab" data-nfc-tab="write" role="tab" aria-selected="false">Write</button>
</div>
<div class="nfc-reader-body">
<div class="nfc-reader-panel" data-panel="read-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.6 4 9.3 6.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M16.4 4 14.7 6.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4.5 13.5a7.5 7.5 0 0 1 15 0Z" fill="currentColor"/><circle cx="9.3" cy="10.4" r="1" fill="#fff"/><circle cx="14.7" cy="10.4" r="1" fill="#fff"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">Read an NFC tag</p>
<p class="nfc-reader-lead">Tap the button, then hold a tag to the top of your phone. I'll show you what's on it.</p>
<button type="button" class="nfc-reader-btn" data-nfc-scan><svg class="nfc-reader-wave-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M8.5 5.5a10 10 0 0 1 0 13"/><path d="M13 8.2a5.4 5.4 0 0 1 0 7.6"/><path d="M17.3 10.8a1.6 1.6 0 0 1 0 2.4"/></svg><span>Scan a Tag</span></button>
</div>
<div class="nfc-reader-panel" data-panel="scanning">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8.5 5.5a10 10 0 0 1 0 13"/><path d="M13 8.2a5.4 5.4 0 0 1 0 7.6"/><path d="M17.3 10.8a1.6 1.6 0 0 1 0 2.4"/></svg></span></div>
<p class="nfc-reader-title">Hold your tag close</p>
<p class="nfc-reader-lead">Touch an NFC tag to the top of your phone.</p>
<button type="button" class="nfc-reader-btn is-secondary" data-nfc-cancel><span>Cancel</span></button>
</div>
<div class="nfc-reader-panel" data-panel="result">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5 10 17.5 19 7"/></svg>Tag read</span>
<ul class="nfc-reader-records" data-nfc-records></ul>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Serial number</span><span class="nfc-reader-value" data-nfc-serial></span></div>
<button type="button" class="nfc-reader-btn" data-nfc-again><svg class="nfc-reader-wave-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M8.5 5.5a10 10 0 0 1 0 13"/><path d="M13 8.2a5.4 5.4 0 0 1 0 7.6"/><path d="M17.3 10.8a1.6 1.6 0 0 1 0 2.4"/></svg><span>Scan Another Tag</span></button>
</div>
<div class="nfc-reader-panel" data-panel="write-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.6 4 9.3 6.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M16.4 4 14.7 6.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4.5 13.5a7.5 7.5 0 0 1 15 0Z" fill="currentColor"/><circle cx="9.3" cy="10.4" r="1" fill="#fff"/><circle cx="14.7" cy="10.4" r="1" fill="#fff"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">Write an NFC tag</p>
<div class="nfc-reader-type-toggle" role="group" aria-label="What to write">
<button type="button" class="nfc-reader-type" data-nfc-type="url">Link</button>
<button type="button" class="nfc-reader-type" data-nfc-type="text">Text</button>
</div>
<input type="url" class="nfc-reader-input" data-nfc-input placeholder="https://example.com" aria-label="Value to write to the tag"/>
<p class="nfc-reader-input-error" data-nfc-input-error></p>
<button type="button" class="nfc-reader-btn" data-nfc-write><svg class="nfc-reader-wave-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M8.5 5.5a10 10 0 0 1 0 13"/><path d="M13 8.2a5.4 5.4 0 0 1 0 7.6"/><path d="M17.3 10.8a1.6 1.6 0 0 1 0 2.4"/></svg><span>Write to Tag</span></button>
</div>
<div class="nfc-reader-panel" data-panel="writing">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8.5 5.5a10 10 0 0 1 0 13"/><path d="M13 8.2a5.4 5.4 0 0 1 0 7.6"/><path d="M17.3 10.8a1.6 1.6 0 0 1 0 2.4"/></svg></span></div>
<p class="nfc-reader-title">Hold your tag close</p>
<p class="nfc-reader-lead">Touch the tag to your phone to write to it.</p>
<button type="button" class="nfc-reader-btn is-secondary" data-nfc-cancel><span>Cancel</span></button>
</div>
<div class="nfc-reader-panel" data-panel="written">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5 10 17.5 19 7"/></svg>Tag written</span>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Written to the tag</span><span class="nfc-reader-value" data-nfc-written></span></div>
<div data-nfc-lock-start-wrap>
<button type="button" class="nfc-reader-btn is-secondary" data-nfc-lock-start><svg class="nfc-reader-lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><span>Lock This Tag</span></button>
</div>
<div class="nfc-reader-lock-confirm" data-nfc-lock-confirm hidden>
<p class="nfc-reader-warn">Locking is permanent. Once locked, this tag can never be written again.</p>
<div class="nfc-reader-btn-row">
<button type="button" class="nfc-reader-btn is-secondary" data-nfc-lock-cancel><span>Cancel</span></button>
<button type="button" class="nfc-reader-btn is-danger" data-nfc-lock-go><svg class="nfc-reader-lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><span>Lock Tag</span></button>
</div>
</div>
<button type="button" class="nfc-reader-btn" data-nfc-write-again><svg class="nfc-reader-wave-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M8.5 5.5a10 10 0 0 1 0 13"/><path d="M13 8.2a5.4 5.4 0 0 1 0 7.6"/><path d="M17.3 10.8a1.6 1.6 0 0 1 0 2.4"/></svg><span>Write Another Tag</span></button>
</div>
<div class="nfc-reader-panel" data-panel="locking">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg></span></div>
<p class="nfc-reader-title">Hold your tag again</p>
<p class="nfc-reader-lead">Touch the same tag to your phone to lock it.</p>
<button type="button" class="nfc-reader-btn is-secondary" data-nfc-cancel><span>Cancel</span></button>
</div>
<div class="nfc-reader-panel" data-panel="locked">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>Tag locked</span>
<p class="nfc-reader-title">This tag is now read-only</p>
<p class="nfc-reader-lead">It keeps its data and can still be read anywhere - it just can't be rewritten.</p>
<button type="button" class="nfc-reader-btn" data-nfc-write-again><svg class="nfc-reader-wave-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M8.5 5.5a10 10 0 0 1 0 13"/><path d="M13 8.2a5.4 5.4 0 0 1 0 7.6"/><path d="M17.3 10.8a1.6 1.6 0 0 1 0 2.4"/></svg><span>Write Another Tag</span></button>
</div>
<div class="nfc-reader-panel" data-panel="error">
<span class="nfc-reader-badge is-error">Something went wrong</span>
<p class="nfc-reader-lead" data-nfc-error-msg>Something went wrong.</p>
<button type="button" class="nfc-reader-btn" data-nfc-retry><svg class="nfc-reader-wave-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M8.5 5.5a10 10 0 0 1 0 13"/><path d="M13 8.2a5.4 5.4 0 0 1 0 7.6"/><path d="M17.3 10.8a1.6 1.6 0 0 1 0 2.4"/></svg><span>Try Again</span></button>
</div>
<div class="nfc-reader-panel" data-panel="ios">
<span class="nfc-reader-badge is-muted">iPhone</span>
<p class="nfc-reader-title">Browser NFC isn't available on iPhone</p>
<p class="nfc-reader-lead">Apple doesn't let any browser reach the NFC chip. I made the free NFC.cool app to read and write tags on iPhone instead.</p>
<div class="landing-store-buttons"><a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-en&mt=8" class="landing-store-button is-apple" aria-label="Download on the App Store" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/AppStore.svg" alt="Download NFC.cool on the App Store" width="156" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="android-other">
<span class="nfc-reader-badge is-muted">Open in Chrome</span>
<p class="nfc-reader-title">Switch to Chrome to scan here</p>
<p class="nfc-reader-lead">You're on Android, so in-browser reading and writing work - they just need Chrome. Open this page in Chrome and the reader switches on.</p>
<div class="landing-store-buttons"><a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-en" class="landing-store-button is-google" aria-label="Get it on Google Play" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/GooglePlay.svg" alt="Get NFC.cool on Google Play" width="173" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="desktop">
<span class="nfc-reader-badge is-muted">Android + Chrome only</span>
<img class="nfc-reader-qr" src="/assets/images/nfc-reader-qr.svg" alt="QR code that opens this page on your phone" width="188" height="188"/>
<p class="nfc-reader-lead">Scan this with an Android phone to open the reader there. In-browser NFC needs Chrome on Android.</p>
<p class="nfc-reader-fineprint">On an iPhone? <a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-en&mt=8" target="_blank" rel="noopener nofollow sponsored">Get the NFC.cool app</a>.</p>
</div>
</div>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-section">

## How It Works

<div class="page-cards-grid">

<article class="page-card nfc-step">
<span class="landing-feature-num">01</span>
<h3>Open it on an Android phone</h3>
<p>Open this page in Chrome on an Android phone. Chrome has a feature called Web NFC that lets a website talk to the phone's NFC chip - that is the whole engine behind this page.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">02</span>
<h3>Pick Read or Write</h3>
<p>Reading shows you everything stored on a tag. Writing puts a link or a short piece of text onto one. I ask Chrome for NFC permission the first time, and it remembers your answer.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">03</span>
<h3>Hold a tag to your phone</h3>
<p>Touch the tag to the top of your phone. I decode or write it right there on your device - I never see it, nothing is uploaded, and nothing is stored.</p>
</article>

</div>

</section>

<section class="page-section">

## What You Can Read From an NFC Tag

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 14.5 14.5 9.5"/><path d="M11 6.5 12.4 5a3.8 3.8 0 0 1 5.4 5.4l-1.5 1.5"/><path d="M13 17.5 11.6 19a3.8 3.8 0 0 1-5.4-5.4l1.5-1.5"/></svg></span>
<h3>Links and URLs</h3>
<p>The most common tag content - a web address that opens a page, a profile, or a menu. I show you the full link so you can see exactly where it points before you tap it.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 7h14"/><path d="M5 12h14"/><path d="M5 17h9"/></svg></span>
<h3>Plain text</h3>
<p>Notes, instructions, IDs, or any short message stored as a text record. I decode the text and its language straight from the chip.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4 4 8l8 4 8-4-8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/></svg></span>
<h3>Other records</h3>
<p>Wi-Fi credentials, contact cards, and app-specific data show up as typed records. You also see the tag's unique serial number, which is the same on every read.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg></span>
<h3>Empty or locked tags</h3>
<p>A blank tag reads cleanly with no records - handy for checking a fresh tag before you write to it. Locked tags still report their type and serial number.</p>
</article>

</div>

</section>

<section class="page-section">

## Write and Lock Tags in Your Browser

Reading is only half of it. On the *Write* tab I let you put a link or a line of text onto a tag - the same way I would program one in the app. Pick what you want to store, type it in, hold a tag to your phone, and it is written.

Once a tag is written, you can lock it. Locking makes the tag read-only for good: it keeps working everywhere, but no one (including you) can ever change it again. I put a confirmation step in front of it because there is no undo.

Writing and locking need the same setup as reading - an Android phone running Chrome. On iPhone, the NFC.cool app handles writing and locking instead.

</section>

<section class="page-section">

## Want to Do More Than Read and Write?

The reader on this page handles the everyday jobs - read a tag, write a link or some text, lock it. For most people that is the whole story, and the browser's Web NFC API stops right about there: plain NDEF records, Android Chrome only. When you want to go further, that is what I built the **NFC.cool app** for. It does everything on this page, then keeps going where a browser simply cannot:

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3Z"/><path d="m13.5 6.5 3 3"/></svg></span>
<h3>Write 25+ kinds of data</h3>
<p>This page writes a link or plain text. The app writes Wi-Fi logins, contact cards, payment links, Shortcuts, Spotify, social profiles, even crypto wallet addresses - 25+ types, each from a ready-made template.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg></span>
<h3>Protect and encrypt tags</h3>
<p>A browser can only lock a tag read-only. The app also password-protects tags so only your devices can touch them, and NFC Safe encrypts a secret onto the chip itself with AES-256.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"/></svg></span>
<h3>Automate every tap</h3>
<p>Wire a tag to fire a webhook to your server, run an iOS Shortcut, speak its contents aloud, or open a link the moment it is tapped.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"/></svg></span>
<h3>See inside the chip</h3>
<p>Power-User mode dumps a tag's full memory, names the chip - NTAG, MIFARE, FeliCa and more - and on iPhone sends raw APDU commands. Web NFC only ever shows you NDEF records.</p>
</article>

</div>

There is one more thing no browser can do: run on iPhone at all. Apple blocks NFC in every iOS browser, so a web reader cannot work there - the app reads and writes tags on iPhone just as well as on Android.

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

## Online NFC Reader FAQ

<div class="nfc-reader-faq">

<details class="faq-item">
<summary>Can I read an NFC tag online without an app?</summary>
<p>Yes - on an Android phone using Chrome. This page reads the tag through your browser's built-in Web NFC support, so there is nothing to install. On iPhone, browser-based reading is not possible and you need the NFC.cool app.</p>
</details>

<details class="faq-item">
<summary>Can I write to an NFC tag from the browser?</summary>
<p>Yes. Switch to the Write tab, choose a link or text, type the value, and hold a tag to your phone. Writing uses the same Web NFC support as reading, so it also needs Chrome on Android. The app handles writing on iPhone.</p>
</details>

<details class="faq-item">
<summary>What does locking a tag do?</summary>
<p>Locking makes a tag permanently read-only. Its data still works everywhere, but it can never be rewritten - not by you, not by anyone. There is no way to undo it, so I always ask you to confirm first.</p>
</details>

<details class="faq-item">
<summary>Does this work on iPhone?</summary>
<p>No. Apple does not allow Safari or any other iOS browser to access the NFC chip, so no website can read or write NFC tags on iPhone or iPad. The free NFC.cool app reads, writes, and locks NFC tags on iPhone instead.</p>
</details>

<details class="faq-item">
<summary>Is the online NFC reader free?</summary>
<p>Completely free. There is no sign-up, no limit on scans, and no payment. The tag's data is read or written on your own device and never uploaded.</p>
</details>

<details class="faq-item">
<summary>Which browsers can read and write NFC tags?</summary>
<p>Web NFC is supported by Chrome and most Chromium-based browsers on Android. Desktop browsers and all iOS browsers do not support it. If your browser cannot use NFC, this page shows you what to do instead.</p>
</details>

<details class="faq-item">
<summary>Why don't I see the reader on my device?</summary>
<p>It comes down to one of three things: you are on iPhone (browser NFC is blocked by Apple), you are on a desktop browser (no NFC hardware), or you are on Android in a browser other than Chrome. On Android, open the page in Chrome and turn NFC on in Settings.</p>
</details>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## Read and Write NFC Tags Anywhere

This page covers the basics in the browser. The free NFC.cool app goes further - it reads any tag and writes 25+ kinds of data: links, Wi-Fi, contacts, shortcuts and more, on both iPhone and Android. I build and maintain it myself.

<div class="tap-cta-buttons">
<a href="/features/nfc-reader-writer/" class="tap-cta-button is-primary">See the NFC Reader & Writer</a>
<a href="/blog/nfc-tags-beginners-guide/" class="tap-cta-button is-secondary">New to NFC tags? Start here</a>
</div>

</section>
