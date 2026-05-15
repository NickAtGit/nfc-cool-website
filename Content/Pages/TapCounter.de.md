---
title: "NFC-Tap-Zähler - Live-Demo"
slug: "tap-counter"
description: "Eine Live-Demo des NFC-Tap-Zählers. Schreibe die URL dieser Seite mit NFC.cool Tools auf einen NFC-Tag, tippe den Tag an und sieh zu, wie sein Zählerstand und seine Tag-ID erscheinen - ganz ohne Server."
image: "/assets/images/Blog/count-nfc-tag-scans.webp"
---

<section class="page-hero tap-counter-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# NFC-Tap-Zähler

Ein NFC-Tag kann seine eigenen Scans zählen - die Zahl steckt im Chip, nicht auf einem Server. Beschreibe einen Tag, der auf diese Seite zeigt, tippe ihn an, und der Live-Zählerstand und die Tag-ID erscheinen in der Karte.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-tap-counter-de&mt=8" class="landing-store-button is-apple" aria-label="Im App Store laden" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Im App Store laden" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-tap-counter-de" class="landing-store-button is-google" aria-label="Bei Google Play herunterladen" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Bei Google Play herunterladen" width="173" height="52"/>
</a>
</div>

</div>

<div class="page-hero-visual">

<div id="tap-counter-demo" class="tap-demo">
<div class="tap-demo-card tap-demo-result">
<p class="tap-demo-label">Tag gescannt</p>
<div class="tap-demo-count-row">
<p class="tap-demo-count" data-tap-count>0</p>
<p class="tap-demo-caption">Scans, vom Tag gezählt</p>
</div>
<div class="tap-demo-field tap-demo-id-row">
<p class="tap-demo-label">Tag-ID</p>
<p class="tap-demo-value" data-tap-id></p>
</div>
</div>
<div class="tap-demo-card tap-demo-empty">
<p class="tap-demo-label">Live-Demo</p>
<p class="tap-demo-text">Tippe einen NFC-Tag an, der hierher zeigt, und sein Zählerstand erscheint in dieser Karte.</p>
<div class="tap-demo-field">
<p class="tap-demo-label">Richte deinen Tag auf</p>
<p class="tap-demo-value">https://nfc.cool/de/tap-counter/</p>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-section">

## So funktioniert es

<div class="page-cards-grid">

<article class="page-card">
<h3>Der Chip zählt mit</h3>
<p>NTAG21x-Chips - die NTAG213, NTAG215 und NTAG216 in den meisten NFC-Stickern - haben einen Zähler in der Hardware. Jeder Lesevorgang zählt ihn um eins hoch, ohne App und ohne Server.</p>
</article>

<article class="page-card">
<h3>Die URL trägt es</h3>
<p>NFC.cool Tools bettet beim Beschreiben des Tags Platzhalter-Bytes ein. Bei jedem Scan ersetzt der Chip sie durch die Live-Werte und hängt sie als <code>?nfc=</code> an - zuerst die Tag-ID, dann den Zählerstand.</p>
</article>

<article class="page-card">
<h3>Diese Seite liest es nur</h3>
<p>Kein Backend, keine Datenbank. Diese Seite dekodiert den <code>?nfc=</code>-Wert direkt aus ihrer eigenen Adresszeile und zeigt dir, was der Chip übergeben hat. Gezählt wurde schon.</p>
</article>

</div>

</section>

<section class="page-section">

## Was ein selbstzählender Tag kann

<div class="page-cards-grid">

<article class="page-card">
<h3>Tags unterscheiden</h3>
<p>Schreib dieselbe URL auf fünfzig Sticker, und die Tag-ID verrät dir trotzdem, welcher physische angetippt wurde. Ein Link zu verwalten, fünfzig Tags zu erkennen.</p>
</article>

<article class="page-card">
<h3>Gratis-Zugang begrenzen</h3>
<p>Der Zählerstand reist bei jedem Tap mit, also kannst du darauf reagieren - die ersten hundert Scans bekommen eine Belohnung, der Rest wird woanders hingeleitet.</p>
</article>

<article class="page-card">
<h3>Engagement verfolgen</h3>
<p>Kleb einen Tag auf eine Karte, ein Poster oder eine Produktverpackung, und der Zähler wird zur stillen Engagement-Kennzahl - ganz ohne Analytics-Pipeline.</p>
</article>

<article class="page-card">
<h3>Echtheit nachweisen</h3>
<p>Der Zähler geht nur nach oben und lässt sich nicht zurückdrehen, was ihn schwer fälschbar macht - nützlich für limitierte Editionen und Echtheitsprüfungen.</p>
</article>

</div>

</section>

<section class="page-hero tap-cta">

## Die ganze Geschichte

Zum NFC-Tap-Zähler gibt es mehr - welche Chips funktionieren, die Anwendungsfälle aus der Praxis und die komplette Einrichtung Schritt für Schritt.

<div class="tap-cta-buttons">
<a href="/de/blog/count-nfc-tag-scans/" class="tap-cta-button is-primary">Guide lesen</a>
<a href="/de/features/nfc-reader-writer/" class="tap-cta-button is-secondary">Funktion ansehen</a>
</div>

</section>
