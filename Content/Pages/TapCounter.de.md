---
title: "NFC-Tap-Zähler - Live-Demo"
slug: "tap-counter"
description: "Eine Live-Demo des NFC-Tap-Zählers. Schreibe die URL dieser Seite mit NFC.cool Tools auf einen NFC-Tag, tippe den Tag an und sieh zu, wie sein Zählerstand und seine Tag-ID erscheinen - ganz ohne Server."
image: "/assets/images/Blog/count-nfc-tag-scans.webp"
---

<section class="page-hero">

<div id="tap-counter-demo" class="tap-demo">

<h1 class="tap-demo-heading">NFC-Tap-Zähler</h1>

<div class="tap-demo-result">
<div class="tap-demo-count-row">
<span class="tap-demo-count" data-tap-count>0</span>
<span class="tap-demo-count-caption">Scans, vom Tag selbst gezählt</span>
</div>
<p class="tap-demo-id-row"><span class="tap-demo-id-label">Tag-ID</span> <code class="tap-demo-id-value" data-tap-id></code></p>
<p class="tap-demo-raw">Direkt aus der URL des Tags gelesen: <code data-tap-raw></code></p>
<p class="tap-demo-note">Kein Server, kein Internet - der Chip hat gezählt.</p>
</div>

<div class="tap-demo-empty">
<p class="tap-demo-lead">Das ist eine Live-Demo des NFC-Tap-Zählers in NFC.cool Tools. Schreibe einen NFC-Tag so, dass er auf die untenstehende URL zeigt, tippe ihn an, und der Zählerstand und die ID des Tags erscheinen genau hier - direkt aus der Adresszeile dekodiert, ganz ohne Server.</p>
<p class="tap-demo-url">Richte deinen Tag auf <code>https://nfc.cool/de/tap-counter/</code></p>
</div>

</div>

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-tap-counter-de&mt=8" class="landing-store-button is-apple" aria-label="Im App Store laden" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Im App Store laden" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-tap-counter-de" class="landing-store-button is-google" aria-label="Bei Google Play herunterladen" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Bei Google Play herunterladen" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## Wie diese Demo funktioniert

Wenn du den NFC-Tap-Zähler in NFC.cool Tools einschaltest und einen Tag beschreibst, bettet die App Platzhalter-Bytes in die URL ein. Bei jedem Scan ersetzt der NTAG21x-Chip sie durch zwei Live-Werte, noch bevor dein Telefon den Tag liest: den laufenden Zählerstand des Tags und seine eindeutige Werks-ID.

Diese Seite ist genau diese Website. Sie hat kein Backend - sie liest einfach den `?nfc=`-Wert, den der Chip an seine eigene Adresse angehängt hat, und zeigt dir, was angekommen ist. Gezählt wurde im Chip; diese Seite zeigt es nur an.

- Der **Zählerstand** kommt als sechsstellige Hexadezimalzahl an (`000007` ist der siebte Scan).
- Die **Tag-ID** ist die 7-Byte-Werksseriennummer des Chips, bei jedem Lesevorgang identisch.

Du willst die ganze Geschichte - welche Chips funktionieren, die Anwendungsfälle aus der Praxis und die Einrichtung Schritt für Schritt? Lies [NFC-Tag-Scans ohne Server zählen](/de/blog/count-nfc-tag-scans/) oder sieh dir die komplette [NFC-Reader-und-Writer-Funktion](/de/features/nfc-reader-writer/) an.

</section>
