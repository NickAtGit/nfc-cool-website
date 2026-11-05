---
title: "Contatore degli avvicinamenti NFC - demo dal vivo"
slug: "tap-counter"
description: "Una demo dal vivo del contatore degli avvicinamenti NFC. Scrivi l'indirizzo di questa pagina su un tag NFC con NFC.cool Tools, avvicina il tag e guarda comparire il numero di scansioni e l'ID del tag - senza nessun server di mezzo."
image: "/assets/images/Blog/count-nfc-tag-scans.webp"
---

<section class="page-hero tap-counter-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Contatore degli avvicinamenti NFC

Un tag NFC sa contare da solo le proprie scansioni: il numero vive nel chip, non su un server. Scrivi un tag che punti a questa pagina, avvicinalo al telefono e nel riquadro compaiono il conteggio aggiornato e l'ID del tag.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-tap-counter-it&mt=8" class="landing-store-button is-apple" aria-label="Download on the App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Download on the App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-tap-counter-it" class="landing-store-button is-google" aria-label="Get it on Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Get it on Google Play" width="173" height="52"/>
</a>
</div>

</div>

<div class="page-hero-visual">

<div id="tap-counter-demo" class="tap-demo">
<div class="tap-demo-card tap-demo-result">
<p class="tap-demo-label">Tag scansionato</p>
<div class="tap-demo-count-row">
<p class="tap-demo-count" data-tap-count>0</p>
<p class="tap-demo-caption">scansioni contate dal tag</p>
</div>
<div class="tap-demo-field tap-demo-id-row">
<p class="tap-demo-label">ID del tag</p>
<p class="tap-demo-value" data-tap-id></p>
</div>
</div>
<div class="tap-demo-card tap-demo-empty">
<p class="tap-demo-label">Demo dal vivo</p>
<p class="tap-demo-text">Avvicina un tag NFC che punta a questa pagina e il conteggio delle sue scansioni compare in questo riquadro.</p>
<div class="tap-demo-field">
<p class="tap-demo-label">Indirizzo da scrivere sul tag</p>
<p class="tap-demo-value">https://nfc.cool/tap-counter/</p>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-section">

## Come funziona

<div class="page-cards-grid">

<article class="page-card">
<h3>Il conteggio sta nel chip</h3>
<p>I chip NTAG21x - gli NTAG213, NTAG215 e NTAG216 montati sulla maggior parte degli adesivi NFC - hanno un contatore integrato nell'hardware. Ogni lettura lo fa salire di uno, senza che entrino in gioco un'app o un server.</p>
</article>

<article class="page-card">
<h3>L'indirizzo se lo porta dietro</h3>
<p>Quando scrive il tag, NFC.cool Tools inserisce dei byte segnaposto. A ogni scansione il chip li sostituisce con i valori reali e li aggiunge all'indirizzo come <code>?nfc=</code>: prima l'ID del tag, poi il conteggio.</p>
</article>

<article class="page-card">
<h3>Questa pagina si limita a leggerlo</h3>
<p>Niente backend, niente database. La pagina decodifica il valore <code>?nfc=</code> direttamente dalla propria barra degli indirizzi e ti mostra quello che il chip le ha passato. Il conteggio è già avvenuto nel chip.</p>
</article>

</div>

</section>

<section class="page-section">

## A cosa serve un tag che si conta da solo

<div class="page-cards-grid">

<article class="page-card">
<h3>Distinguere un tag dall'altro</h3>
<p>Scrivi lo stesso indirizzo su cinquanta adesivi: l'ID del tag continua a dirti quale hai avvicinato davvero. Un solo link da gestire, cinquanta tag riconoscibili uno per uno.</p>
</article>

<article class="page-card">
<h3>Mettere un limite agli accessi gratuiti</h3>
<p>Il conteggio viaggia insieme a ogni avvicinamento, quindi puoi farci qualcosa: premia le prime cento scansioni e manda tutte le altre da un'altra parte.</p>
</article>

<article class="page-card">
<h3>Misurare l'interesse</h3>
<p>Attacca un tag su un biglietto, un manifesto o la confezione di un prodotto: il contatore diventa una misura discreta dell'interesse, senza bisogno di alcun sistema di analisi.</p>
</article>

<article class="page-card">
<h3>Dimostrare che il tag è autentico</h3>
<p>Il contatore può solo salire e non si può riportare indietro, il che lo rende difficile da falsificare: utile per le edizioni limitate e per i controlli anticontraffazione.</p>
</article>

</div>

</section>

<section class="page-hero tap-cta">

## Vuoi saperne di più?

Sul contatore degli avvicinamenti c'è molto altro: quali chip funzionano, i casi d'uso reali e la procedura completa passo per passo.

<div class="tap-cta-buttons">
<a href="/it/blog/count-nfc-tag-scans/" class="landing-cta-button">Leggi la guida</a>
<a href="/it/features/nfc-reader-writer/" class="landing-cta-button">Scopri la funzione</a>
</div>

</section>
