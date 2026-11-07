---
title: "Lettore NFC online"
slug: "online-nfc-reader"
description: "Leggi e scrivi tag NFC direttamente dal browser - senza app e senza registrazione. Scansiona un tag per vedere cosa contiene, oppure scrivici sopra un link o un testo. È gratis e funziona su Chrome per Android; su iPhone c'è l'app NFC.cool, anche quella gratuita."
image: "/assets/images/og-landing-v2.webp"
---

<div style="display:none" aria-hidden="true"><svg><symbol id="nfc-icon-wave" viewBox="0 0 24 24"><path fill="currentColor" d="M8.77 12C8.77 10.18 8.14 8.48 7.02 7.15C6.29 6.29 5.22 7.27 5.77 7.97C6.84 9.32 7.25 10.44 7.25 12C7.25 13.55 6.84 14.67 5.77 16.02C5.23 16.72 6.3 17.69 7.02 16.83C8.14 15.51 8.77 13.82 8.77 12ZM13.56 12C13.56 9.22 12.69 6.61 11.12 4.5C10.41 3.56 9.18 4.47 9.84 5.33C11.28 7.22 12.05 9.53 12.05 12C12.05 14.46 11.28 16.77 9.84 18.66C9.18 19.53 10.41 20.44 11.12 19.48C12.69 17.37 13.56 14.77 13.56 12ZM18.38 12C18.38 8.26 17.21 4.78 15.14 1.89C14.5 1 13.2 1.78 13.89 2.71C15.83 5.37 16.86 8.58 16.86 12C16.86 15.42 15.82 18.62 13.89 21.28C13.22 22.2 14.47 23.02 15.14 22.1C17.21 19.21 18.38 15.73 18.38 12Z"/></symbol><symbol id="nfc-icon-android" viewBox="0 0 24 24" fill="none"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></symbol><symbol id="nfc-icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17.5 19 7"/></symbol><symbol id="nfc-icon-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></symbol></svg></div>

<section class="page-hero nfc-reader-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Lettore NFC online

Ho creato questa pagina perché tu possa leggere un tag NFC direttamente dal browser - senza app e senza registrazione. Tocca *Leggi NFC*, avvicina il telefono al tag e il contenuto compare subito. Con la scheda *Scrivi* metti sul tag anche un link o un testo. Tutto avviene sul telefono e niente di quello che scansioni esce da lì.

<div class="nfc-hero-reqs"><span class="platform-pill is-android"><svg class="platform-pill-icon" viewBox="2 2 20 20" fill="none" aria-hidden="true"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></svg><span class="platform-pill-label">Chrome su Android</span></span></div>

</div>

<div class="page-hero-visual">

<div id="nfc-reader-app" class="nfc-reader" data-state="desktop" data-mode="read" data-write-type="url">
<div class="nfc-phone">
<div class="nfc-phone-screen">
<div class="nfc-reader-tabs" role="tablist" aria-label="Modalità del lettore">
<button type="button" class="nfc-reader-tab" data-nfc-tab="read" role="tab" aria-selected="true">Leggi</button>
<button type="button" class="nfc-reader-tab" data-nfc-tab="write" role="tab" aria-selected="false">Scrivi</button>
</div>
<div class="nfc-reader-body">
<div class="nfc-reader-panel" data-panel="read-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">Leggi un tag NFC</p>
<p class="nfc-reader-lead">Tocca il pulsante, poi avvicina un tag alla parte alta del telefono. Ti mostro cosa contiene.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-scan><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Leggi NFC</span></button>
<p class="nfc-reader-fineprint">Vuoi un'esperienza NFC nativa, con più funzioni? <a href="/it/features/nfc-reader-writer/">Scarica l'app NFC.cool!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="scanning">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">Leggi NFC</p>
<p class="nfc-reader-lead">Avvicina il tag NFC alla parte alta del retro del telefono.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Annulla</span></button>
</div>
<div class="nfc-reader-panel" data-panel="result">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Tag letto</span>
<ul class="nfc-reader-records" data-nfc-records></ul>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Numero di serie</span><span class="nfc-reader-value" data-nfc-serial></span></div>
<details class="nfc-reader-details"><summary>Dettagli tecnici</summary><div class="nfc-reader-tech" data-nfc-tech></div></details>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Leggi NFC</span></button>
</div>
<div class="nfc-reader-panel" data-panel="write-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">Scrivi un tag NFC</p>
<select class="nfc-reader-select" data-nfc-type-select aria-label="Cosa scrivere sul tag">
<optgroup label="Base">
<option value="link">Link</option>
<option value="text">Testo</option>
</optgroup>
<optgroup label="Contatti">
<option value="phone">Numero di telefono</option>
<option value="email">Email</option>
<option value="sms">Messaggio SMS</option>
<option value="contact">Scheda contatto</option>
</optgroup>
<optgroup label="Rete">
<option value="wifi">Rete Wi-Fi</option>
<option value="location">Posizione</option>
</optgroup>
</select>
<div class="nfc-reader-form" data-nfc-form>
<div class="nfc-reader-fields" data-nfc-fields="link">
<input type="url" class="nfc-reader-input" data-k="url" placeholder="https://example.com" aria-label="Link da scrivere"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="text" hidden>
<textarea class="nfc-reader-input nfc-reader-textarea" data-k="text" rows="3" placeholder="Scrivi qui il testo" aria-label="Testo da scrivere"></textarea>
</div>
<div class="nfc-reader-fields" data-nfc-fields="phone" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Numero di telefono" aria-label="Numero di telefono"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="email" hidden>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="Indirizzo email" aria-label="Indirizzo email"/>
<input type="text" class="nfc-reader-input" data-k="subject" placeholder="Oggetto (facoltativo)" aria-label="Oggetto dell'email, facoltativo"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="sms" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Numero di telefono" aria-label="Numero di telefono per l'SMS"/>
<input type="text" class="nfc-reader-input" data-k="body" placeholder="Messaggio (facoltativo)" aria-label="Messaggio SMS, facoltativo"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="location" hidden>
<input type="text" class="nfc-reader-input" data-k="lat" inputmode="decimal" placeholder="Latitudine" aria-label="Latitudine"/>
<input type="text" class="nfc-reader-input" data-k="lng" inputmode="decimal" placeholder="Longitudine" aria-label="Longitudine"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="contact" hidden>
<input type="text" class="nfc-reader-input" data-k="name" placeholder="Nome e cognome" aria-label="Nome del contatto"/>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Telefono (facoltativo)" aria-label="Telefono del contatto, facoltativo"/>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="Email (facoltativa)" aria-label="Email del contatto, facoltativa"/>
<input type="text" class="nfc-reader-input" data-k="org" placeholder="Azienda (facoltativa)" aria-label="Azienda del contatto, facoltativa"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="wifi" hidden>
<input type="text" class="nfc-reader-input" data-k="ssid" placeholder="Nome della rete (SSID)" aria-label="Nome della rete Wi-Fi"/>
<input type="text" class="nfc-reader-input" data-k="password" placeholder="Password" aria-label="Password del Wi-Fi"/>
<select class="nfc-reader-select" data-k="security" aria-label="Sicurezza del Wi-Fi">
<option value="wpa">WPA / WPA2</option>
<option value="wep">WEP</option>
<option value="open">Aperta (senza password)</option>
</select>
</div>
</div>
<p class="nfc-reader-input-error" data-nfc-input-error></p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Scrivi sul tag</span></button>
<p class="nfc-reader-fineprint">Vuoi un'esperienza NFC nativa, con più funzioni? <a href="/it/features/nfc-reader-writer/">Scarica l'app NFC.cool!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="writing">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">Scrivi NFC</p>
<p class="nfc-reader-lead">Avvicina il tag NFC alla parte alta del retro del telefono.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Annulla</span></button>
</div>
<div class="nfc-reader-panel" data-panel="written">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Tag scritto</span>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Scritto sul tag</span><span class="nfc-reader-value" data-nfc-written></span></div>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Scrivi un altro tag</span></button>
</div>
<div class="nfc-reader-panel" data-panel="error">
<span class="nfc-reader-badge is-error">Qualcosa è andato storto</span>
<p class="nfc-reader-lead" data-nfc-error-msg>Qualcosa è andato storto.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-retry><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Riprova</span></button>
</div>
<div class="nfc-reader-panel" data-panel="ios">
<span class="nfc-reader-badge is-muted">iPhone</span>
<p class="nfc-reader-title">Su iPhone l'NFC non funziona nel browser</p>
<p class="nfc-reader-lead">Apple non permette a nessun browser di raggiungere il chip NFC. Per leggere e scrivere i tag su iPhone ho creato l'app NFC.cool, gratuita.</p>
<div class="landing-store-buttons"><a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-it&mt=8" class="landing-store-button is-apple" aria-label="Scarica dall'App Store" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/AppStore.svg" alt="Scarica NFC.cool dall'App Store" width="156" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="android-other">
<span class="nfc-reader-badge is-muted">Apri in Chrome</span>
<p class="nfc-reader-title">Passa a Chrome per scansionare qui</p>
<p class="nfc-reader-lead">Sei su Android, quindi leggere e scrivere dal browser funziona: serve soltanto Chrome. Apri questa pagina in Chrome e il lettore si attiva.</p>
<div class="landing-store-buttons"><a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-it" class="landing-store-button is-google" aria-label="Scarica su Google Play" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/GooglePlay.svg" alt="Scarica NFC.cool su Google Play" width="173" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="desktop">
<span class="nfc-reader-badge is-muted">Solo Android + Chrome</span>
<img class="nfc-reader-qr" src="/assets/images/nfc-reader-qr.svg" alt="Codice QR che apre questa pagina sul telefono" width="188" height="188"/>
<p class="nfc-reader-lead">Scansiona questo codice con un telefono Android per aprire lì il lettore. L'NFC nel browser richiede Chrome su Android.</p>
<p class="nfc-reader-fineprint">Sei su iPhone? <a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-it&mt=8" target="_blank" rel="noopener nofollow sponsored">Scarica l'app NFC.cool</a>.</p>
</div>
</div>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## Scarica NFC.cool gratis

L'app completa legge e scrive qualsiasi tag NFC, su iPhone e su Android.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-hero-ios-it&mt=8" class="landing-store-button is-apple" aria-label="Scarica dall'App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Scarica NFC.cool dall'App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-hero-android-it" class="landing-store-button is-google" aria-label="Scarica su Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Scarica NFC.cool su Google Play" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## Come funziona

<div class="page-cards-grid">

<article class="page-card nfc-step">
<span class="landing-feature-num">01</span>
<h3>Apri la pagina su un telefono Android</h3>
<p>Apri questa pagina in Chrome su un telefono Android. Chrome ha una funzione chiamata Web NFC che permette a un sito di dialogare con il chip NFC del telefono: è tutto il motore che sta dietro questa pagina.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">02</span>
<h3>Scegli se leggere o scrivere</h3>
<p>In lettura vedi tutto quello che è memorizzato sul tag. In scrittura ci metti sopra un link o un testo breve. La prima volta chiedo a Chrome il permesso per l'NFC e la tua risposta resta memorizzata.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">03</span>
<h3>Avvicina un tag al telefono</h3>
<p>Appoggia il tag sulla parte alta del telefono. La decodifica o la scrittura avviene lì, sul tuo dispositivo: io non vedo niente, niente viene caricato online e niente viene salvato.</p>
</article>

</div>

</section>

<section class="page-section">

## Cosa si legge da un tag NFC

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 14.5 14.5 9.5"/><path d="M11 6.5 12.4 5a3.8 3.8 0 0 1 5.4 5.4l-1.5 1.5"/><path d="M13 17.5 11.6 19a3.8 3.8 0 0 1-5.4-5.4l1.5-1.5"/></svg></span>
<h3>Link e indirizzi web</h3>
<p>Il contenuto più diffuso sui tag: un indirizzo web che apre una pagina, un profilo o un menu. Ti mostro il link per intero, così vedi esattamente dove porta prima di aprirlo.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 7h14"/><path d="M5 12h14"/><path d="M5 17h9"/></svg></span>
<h3>Testo semplice</h3>
<p>Note, istruzioni, codici identificativi o qualsiasi messaggio breve salvato come record di testo. Decodifico il testo e la sua lingua direttamente dal chip.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4 4 8l8 4 8-4-8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/></svg></span>
<h3>Altri tipi di record</h3>
<p>Credenziali Wi-Fi, schede contatto e dati specifici di un'app compaiono come record tipizzati. Vedi anche il numero di serie del tag, che resta lo stesso a ogni lettura.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Tag vuoti o bloccati</h3>
<p>Un tag vuoto si legge senza intoppi e non contiene alcun record: comodo per controllare un tag nuovo prima di scriverci sopra. Anche i tag bloccati dichiarano il proprio tipo e il numero di serie.</p>
</article>

</div>

</section>

<section class="page-section">

## Vuoi andare oltre la lettura e la scrittura?

Il lettore di questa pagina copre le operazioni di tutti i giorni: leggere un tag e scriverci i dati più comuni. Per la maggior parte delle persone finisce lì, e anche l'API Web NFC del browser si ferma più o meno a quel punto: record NDEF semplici, solo su Chrome per Android. L'**app NFC.cool** fa tutto quello che trovi in questa pagina e prosegue dove il browser non arriva:

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Blocca, formatta e proteggi i tag</h3>
<p>Blocca un tag perché il contenuto non cambi mai più, riportalo allo stato vuoto oppure proteggilo con una password, così possono riscriverlo solo i tuoi dispositivi.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg></span>
<h3>Cifra i dati riservati con NFC Safe</h3>
<p>NFC Safe cifra un dato riservato sul chip stesso con AES-256: per chiunque non sia l'app, quel tag contiene solo caratteri illeggibili. <a href="/it/blog/nfc-safe-encrypted-secrets/">Come funziona NFC Safe</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"/></svg></span>
<h3>Decidi cosa succede a ogni avvicinamento</h3>
<p>Un tag può lanciare un webhook, avviare un Comando rapido di iOS, leggere ad alta voce il proprio contenuto o tenere il conto delle scansioni. <a href="/it/blog/count-nfc-tag-scans/">Come contare le scansioni di un tag NFC</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"/></svg></span>
<h3>Clona, azzera e analizza i tag</h3>
<p>Clona un tag, esporta e identifica la memoria grezza del chip oppure riprogramma i dispositivi protetti da NFC, come le <a href="/it/blog/openprinttag-read-write-nfc-spools-phone/">bobine di filamento per stampanti 3D</a> e le <a href="/it/blog/reset-sonicare-brush-head-nfc/">testine degli spazzolini elettrici</a>.</p>
</article>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## Su iPhone l'NFC passa dall'app

Apple blocca l'NFC in tutti i browser per iOS, quindi nessun sito può leggere o scrivere tag su iPhone o iPad. L'app NFC.cool lo fa in modo nativo, bene quanto su Android.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-it&mt=8" class="landing-store-button is-apple" aria-label="Scarica dall'App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Scarica NFC.cool dall'App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-it" class="landing-store-button is-google" aria-label="Scarica su Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Scarica NFC.cool su Google Play" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section landing-faq">

<div class="landing-container">

<h2 class="landing-section-title">Domande frequenti sul lettore NFC online</h2>

<details class="faq-item">
<summary>Posso leggere e scrivere tag NFC senza installare un'app?</summary>
<p>Sì, su un telefono Android con Chrome. La pagina usa il Web NFC integrato nel browser, quindi non c'è niente da installare: tocca Leggi per scansionare un tag, oppure passa alla scheda Scrivi per salvare sul tag un link, un testo, un contatto, una rete Wi-Fi e altro ancora.</p>
</details>

<details class="faq-item">
<summary>Posso scrivere una rete Wi-Fi o una scheda contatto su un tag?</summary>
<p>Sì. Scegli Rete Wi-Fi o Scheda contatto nel menu a tendina della scrittura e compila i campi. Un tag Wi-Fi propone ai telefoni Android di collegarsi alla rete; un tag contatto contiene una vCard standard che i telefoni Android ti offrono di salvare. Vuoi un biglietto da aggiornare anche dopo averlo scritto? <a href="/it/business-card/">NFC.cool Business Card</a> mette sul tag un link, così i tuoi dati li modifichi quando vuoi.</p>
</details>

<details class="faq-item">
<summary>Funziona su iPhone?</summary>
<p>No. Apple blocca l'NFC in tutti i browser per iOS, quindi nessun sito può leggere o scrivere tag su iPhone o iPad. Su iPhone ci pensa l'app NFC.cool, che è gratuita.</p>
</details>

<details class="faq-item">
<summary>Quali browser sono supportati?</summary>
<p>Il Web NFC funziona solo su Chrome e sugli altri browser basati su Chromium per Android. I browser desktop e quelli per iOS non lo supportano: in quel caso la pagina ti spiega come fare.</p>
</details>

<details class="faq-item">
<summary>Il lettore NFC online è gratis?</summary>
<p>Del tutto gratis, senza registrazione e senza limiti al numero di scansioni. I tag si leggono e si scrivono sul tuo dispositivo, e non viene mai caricato niente online.</p>
</details>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## Leggi e scrivi tag NFC ovunque

Questa pagina copre le basi dal browser. L'app NFC.cool, gratuita, va oltre: legge qualsiasi tag e scrive più di 25 tipi di dati - link, Wi-Fi, contatti, Comandi rapidi e altro ancora, sia su iPhone sia su Android. La sviluppo e la mantengo io.

<div class="tap-cta-buttons">
<a href="/it/features/nfc-reader-writer/" class="landing-cta-button">Scopri il lettore e scrittore NFC</a>
<a href="/it/blog/nfc-tags-beginners-guide/" class="landing-cta-button">Non conosci i tag NFC? Comincia da qui</a>
</div>

</section>
