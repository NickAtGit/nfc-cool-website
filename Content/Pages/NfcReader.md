---
title: "Online NFC Reader"
slug: "online-nfc-reader"
description: "Read and write NFC tags right in your browser - no app, no sign-up. Scan a tag to see what's on it, or write a link or text to one. Free, runs in Chrome on Android; iPhone users get the free NFC.cool app."
image: "/assets/images/og-landing.webp"
---

<svg style="display:none" aria-hidden="true"><symbol id="nfc-icon-wave" viewBox="0 0 24 24"><path fill="currentColor" d="M8.77 12C8.77 10.18 8.14 8.48 7.02 7.15C6.29 6.29 5.22 7.27 5.77 7.97C6.84 9.32 7.25 10.44 7.25 12C7.25 13.55 6.84 14.67 5.77 16.02C5.23 16.72 6.3 17.69 7.02 16.83C8.14 15.51 8.77 13.82 8.77 12ZM13.56 12C13.56 9.22 12.69 6.61 11.12 4.5C10.41 3.56 9.18 4.47 9.84 5.33C11.28 7.22 12.05 9.53 12.05 12C12.05 14.46 11.28 16.77 9.84 18.66C9.18 19.53 10.41 20.44 11.12 19.48C12.69 17.37 13.56 14.77 13.56 12ZM18.38 12C18.38 8.26 17.21 4.78 15.14 1.89C14.5 1 13.2 1.78 13.89 2.71C15.83 5.37 16.86 8.58 16.86 12C16.86 15.42 15.82 18.62 13.89 21.28C13.22 22.2 14.47 23.02 15.14 22.1C17.21 19.21 18.38 15.73 18.38 12Z"/></symbol><symbol id="nfc-icon-android" viewBox="0 0 24 24" fill="none"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></symbol><symbol id="nfc-icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17.5 19 7"/></symbol><symbol id="nfc-icon-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></symbol></svg>

<section class="page-hero nfc-reader-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Online NFC Reader

I built this so you can read an NFC tag straight from your browser - no app, no sign-up. Tap *Scan a Tag*, hold your phone to the tag, and its contents appear right away. Switch to the *Write* tab and you can put a link or text onto a tag too. Everything runs on your phone, and nothing you scan ever leaves it.

<div class="nfc-hero-reqs"><span class="platform-pill is-android"><svg class="platform-pill-icon" viewBox="2 2 20 20" fill="none" aria-hidden="true"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></svg><span class="platform-pill-label">Chrome on Android</span></span></div>

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
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">Read an NFC tag</p>
<p class="nfc-reader-lead">Tap the button, then hold a tag to the top of your phone. I'll show you what's on it.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-scan><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Read NFC</span></button>
<p class="nfc-reader-fineprint">Do you want a native NFC experience with more NFC functions? <a href="/features/nfc-reader-writer/">Get the NFC.cool app!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="scanning">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">Read NFC</p>
<p class="nfc-reader-lead">Hold your NFC Tag on the top back of your phone.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Cancel</span></button>
</div>
<div class="nfc-reader-panel" data-panel="result">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Tag read</span>
<ul class="nfc-reader-records" data-nfc-records></ul>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Serial number</span><span class="nfc-reader-value" data-nfc-serial></span></div>
<details class="nfc-reader-details"><summary>Technical details</summary><div class="nfc-reader-tech" data-nfc-tech></div></details>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Read NFC</span></button>
</div>
<div class="nfc-reader-panel" data-panel="write-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">Write an NFC tag</p>
<select class="nfc-reader-select" data-nfc-type-select aria-label="What to write to the tag">
<optgroup label="Basic">
<option value="link">Link</option>
<option value="text">Text</option>
</optgroup>
<optgroup label="Contact">
<option value="phone">Phone number</option>
<option value="email">Email</option>
<option value="sms">SMS message</option>
<option value="contact">Contact card</option>
</optgroup>
<optgroup label="Network">
<option value="wifi">Wi-Fi network</option>
<option value="location">Location</option>
</optgroup>
</select>
<div class="nfc-reader-form" data-nfc-form>
<div class="nfc-reader-fields" data-nfc-fields="link">
<input type="url" class="nfc-reader-input" data-k="url" placeholder="https://example.com" aria-label="Link to write"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="text" hidden>
<textarea class="nfc-reader-input nfc-reader-textarea" data-k="text" rows="3" placeholder="Your text here" aria-label="Text to write"></textarea>
</div>
<div class="nfc-reader-fields" data-nfc-fields="phone" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Phone number" aria-label="Phone number"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="email" hidden>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="Email address" aria-label="Email address"/>
<input type="text" class="nfc-reader-input" data-k="subject" placeholder="Subject (optional)" aria-label="Email subject, optional"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="sms" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Phone number" aria-label="SMS phone number"/>
<input type="text" class="nfc-reader-input" data-k="body" placeholder="Message (optional)" aria-label="SMS message, optional"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="location" hidden>
<input type="text" class="nfc-reader-input" data-k="lat" inputmode="decimal" placeholder="Latitude" aria-label="Latitude"/>
<input type="text" class="nfc-reader-input" data-k="lng" inputmode="decimal" placeholder="Longitude" aria-label="Longitude"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="contact" hidden>
<input type="text" class="nfc-reader-input" data-k="name" placeholder="Full name" aria-label="Contact name"/>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Phone (optional)" aria-label="Contact phone, optional"/>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="Email (optional)" aria-label="Contact email, optional"/>
<input type="text" class="nfc-reader-input" data-k="org" placeholder="Organization (optional)" aria-label="Contact organization, optional"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="wifi" hidden>
<input type="text" class="nfc-reader-input" data-k="ssid" placeholder="Network name (SSID)" aria-label="Wi-Fi network name"/>
<input type="text" class="nfc-reader-input" data-k="password" placeholder="Password" aria-label="Wi-Fi password"/>
<select class="nfc-reader-select" data-k="security" aria-label="Wi-Fi security">
<option value="wpa">WPA / WPA2</option>
<option value="wep">WEP</option>
<option value="open">Open (no password)</option>
</select>
</div>
</div>
<p class="nfc-reader-input-error" data-nfc-input-error></p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Write to Tag</span></button>
<p class="nfc-reader-fineprint">Do you want a native NFC experience with more NFC functions? <a href="/features/nfc-reader-writer/">Get the NFC.cool app!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="writing">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">Write NFC</p>
<p class="nfc-reader-lead">Hold your NFC Tag on the top back of your phone.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Cancel</span></button>
</div>
<div class="nfc-reader-panel" data-panel="written">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Tag written</span>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Written to the tag</span><span class="nfc-reader-value" data-nfc-written></span></div>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Write Another Tag</span></button>
</div>
<div class="nfc-reader-panel" data-panel="error">
<span class="nfc-reader-badge is-error">Something went wrong</span>
<p class="nfc-reader-lead" data-nfc-error-msg>Something went wrong.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-retry><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Try Again</span></button>
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
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Empty or locked tags</h3>
<p>A blank tag reads cleanly with no records - handy for checking a fresh tag before you write to it. Locked tags still report their type and serial number.</p>
</article>

</div>

</section>

<section class="page-section">

## Want to Do More Than Read and Write?

The reader on this page handles the everyday jobs - read a tag and write common data to one. For most people that is the whole story, and the browser's Web NFC API stops right about there: plain NDEF records, Android Chrome only. The **NFC.cool app** does everything on this page, then keeps going where a browser cannot:

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Lock, format and protect tags</h3>
<p>Lock a tag so its contents can never change, wipe one back to blank, or password-protect it so only your devices can rewrite it.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg></span>
<h3>Encrypt secrets with NFC Safe</h3>
<p>NFC Safe encrypts a secret onto the chip itself with AES-256, so the tag reads as scrambled data to anything but the app. <a href="/blog/nfc-safe-encrypted-secrets/">How NFC Safe works</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"/></svg></span>
<h3>Automate what a tap does</h3>
<p>A tag can fire a webhook, run an iOS Shortcut, speak its contents aloud, or count how often it is scanned. <a href="/blog/count-nfc-tag-scans/">How to count NFC tag scans</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"/></svg></span>
<h3>Clone, reset and inspect tags</h3>
<p>Clone a tag, dump and identify its raw chip memory, or reprogram NFC-gated hardware like <a href="/blog/openprinttag-read-write-nfc-spools-phone/">3D-printer filament spools</a> and <a href="/blog/reset-sonicare-brush-head-nfc/">electric-toothbrush heads</a>.</p>
</article>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## NFC on iPhone Needs the App

Apple blocks NFC in every iOS browser, so no website can read or write tags on an iPhone or iPad. The NFC.cool app does it natively, just as well as on Android.

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
<summary>Can I read and write NFC tags without an app?</summary>
<p>Yes, on an Android phone in Chrome. The page uses your browser's built-in Web NFC, so there is nothing to install - tap Scan to read a tag, or use the Write tab to put a link, text, contact, Wi-Fi network and more onto one.</p>
</details>

<details class="faq-item">
<summary>Can I write a Wi-Fi network or contact card to a tag?</summary>
<p>Yes. Pick Wi-Fi network or Contact card in the Write dropdown and fill in the fields. A Wi-Fi tag prompts Android phones to join the network; a contact tag stores a standard vCard that phones offer to save.</p>
</details>

<details class="faq-item">
<summary>Does it work on iPhone?</summary>
<p>No. Apple blocks NFC for every iOS browser, so no website can read or write tags on an iPhone or iPad. The free NFC.cool app does it on iPhone instead.</p>
</details>

<details class="faq-item">
<summary>Which browsers are supported?</summary>
<p>Web NFC works only in Chrome and other Chromium browsers on Android. Desktop and iOS browsers do not support it - if yours cannot, the page shows what to do instead.</p>
</details>

<details class="faq-item">
<summary>Is the online NFC reader free?</summary>
<p>Completely free - no sign-up and no scan limit. Tags are read and written on your own device, and nothing is ever uploaded.</p>
</details>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## Read and Write NFC Tags Anywhere

This page covers the basics in the browser. The free NFC.cool app goes further - it reads any tag and writes 25+ kinds of data: links, Wi-Fi, contacts, shortcuts and more, on both iPhone and Android. I build and maintain it myself.

<div class="tap-cta-buttons">
<a href="/features/nfc-reader-writer/" class="landing-cta-button">See the NFC Reader & Writer</a>
<a href="/blog/nfc-tags-beginners-guide/" class="landing-cta-button">New to NFC tags? Start here</a>
</div>

</section>
