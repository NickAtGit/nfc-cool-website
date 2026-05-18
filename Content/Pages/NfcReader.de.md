---
title: "Online NFC Reader"
slug: "online-nfc-reader"
description: "NFC-Tags direkt im Browser lesen und beschreiben - ohne App, ohne Anmeldung. Scanne ein Tag und sieh, was darauf steht, oder schreib einen Link oder Text darauf. Kostenlos, läuft in Chrome auf Android - iPhone-Nutzer bekommen die kostenlose NFC.cool App."
image: "/assets/images/og-landing.webp"
---

<script type="application/json" id="nfc-i18n">{"rec.text":"Text","rec.link":"Link","rec.phone":"Telefon","rec.email":"E-Mail","rec.sms":"SMS","rec.location":"Standort","rec.contact":"Kontakt","rec.contactCard":"Kontaktkarte","rec.wifi":"WLAN","rec.wifiNetwork":"WLAN-Netzwerk","rec.smartPoster":"Smart Poster","rec.app":"App","rec.empty":"Leer","rec.emptyValue":"In diesem Datensatz stehen keine Daten.","rec.data":"Daten","rec.generic":"Datensatz","rec.undecodable":"(ließ sich nicht decodieren)","read.unavailable":"nicht verfügbar","read.noRecords":"Das Tag ist lesbar, enthält aber keine Datensätze.","unit.bytes":"Bytes","tech.records":"Datensätze","tech.total":"Daten gesamt","tech.record":"Datensatz","tech.type":"Typ","tech.media":"Medientyp","tech.id":"Datensatz-ID","tech.encoding":"Codierung","tech.language":"Sprache","tech.size":"Größe","tech.note1":"Chip-Modell, Speichergröße und Sperrzustand sieht ein Browser nicht. Die ","tech.appLink":"NFC.cool App","tech.note2":" zeigt all das - und dazu den rohen Speicher des Chips.","summary.contact":"Kontakt: ","summary.wifi":"WLAN: ","valid.link":"Gib einen Link ein, den du auf das Tag schreiben willst.","valid.linkInvalid":"Das sieht nicht nach einem gültigen Link aus.","valid.text":"Gib einen Text ein, den du auf das Tag schreiben willst.","valid.phone":"Gib eine Telefonnummer ein.","valid.email":"Gib eine E-Mail-Adresse ein.","valid.latlng":"Gib Breiten- und Längengrad ein.","valid.latlngNum":"Breiten- und Längengrad müssen Zahlen sein.","valid.contact":"Gib einen Namen für den Kontakt ein.","valid.wifiSsid":"Gib den Namen des WLAN-Netzwerks ein.","valid.wifiPass":"Gib das WLAN-Passwort ein.","err.readingError":"Ich konnte das Tag nicht lesen. Halte es flach an die Oberseite deines Telefons und versuch es noch einmal.","err.blocked":"Der NFC-Zugriff wurde blockiert. Erlaube NFC für diese Seite und versuch es noch einmal.","err.notSupported":"Dieses Telefon findet keinen NFC-Chip. Prüf, ob NFC in den Android-Einstellungen eingeschaltet ist.","err.notReadable":"Android konnte NFC nicht starten. Stell sicher, dass NFC eingeschaltet ist, und versuch es noch einmal.","err.write":"Das Tag ließ sich nicht beschreiben. Vielleicht ist es gesperrt, zu klein, oder es wurde zu früh weggezogen.","err.read":"Der Scan brach unerwartet ab. Halte ein Tag an dein Telefon und versuch es noch einmal."}</script>

<div style="display:none" aria-hidden="true"><svg><symbol id="nfc-icon-wave" viewBox="0 0 24 24"><path fill="currentColor" d="M8.77 12C8.77 10.18 8.14 8.48 7.02 7.15C6.29 6.29 5.22 7.27 5.77 7.97C6.84 9.32 7.25 10.44 7.25 12C7.25 13.55 6.84 14.67 5.77 16.02C5.23 16.72 6.3 17.69 7.02 16.83C8.14 15.51 8.77 13.82 8.77 12ZM13.56 12C13.56 9.22 12.69 6.61 11.12 4.5C10.41 3.56 9.18 4.47 9.84 5.33C11.28 7.22 12.05 9.53 12.05 12C12.05 14.46 11.28 16.77 9.84 18.66C9.18 19.53 10.41 20.44 11.12 19.48C12.69 17.37 13.56 14.77 13.56 12ZM18.38 12C18.38 8.26 17.21 4.78 15.14 1.89C14.5 1 13.2 1.78 13.89 2.71C15.83 5.37 16.86 8.58 16.86 12C16.86 15.42 15.82 18.62 13.89 21.28C13.22 22.2 14.47 23.02 15.14 22.1C17.21 19.21 18.38 15.73 18.38 12Z"/></symbol><symbol id="nfc-icon-android" viewBox="0 0 24 24" fill="none"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></symbol><symbol id="nfc-icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17.5 19 7"/></symbol><symbol id="nfc-icon-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></symbol></svg></div>

<section class="page-hero nfc-reader-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Online NFC Reader

Diesen Reader habe ich gebaut, damit du NFC-Tags direkt im Browser auslesen kannst - ohne App, ohne Anmeldung. Tippe auf *Tag scannen*, halte dein Telefon an das Tag, und sein Inhalt erscheint sofort. Im Tab *Schreiben* legst du genauso gut einen Link oder Text auf ein Tag. Alles passiert auf deinem Telefon - was du scannst, verlässt es nie.

<div class="nfc-hero-reqs"><span class="platform-pill is-android"><svg class="platform-pill-icon" viewBox="2 2 20 20" fill="none" aria-hidden="true"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></svg><span class="platform-pill-label">Chrome auf Android</span></span></div>

</div>

<div class="page-hero-visual">

<div id="nfc-reader-app" class="nfc-reader" data-state="desktop" data-mode="read" data-write-type="url">
<div class="nfc-phone">
<div class="nfc-phone-screen">
<div class="nfc-reader-tabs" role="tablist" aria-label="Reader-Modus">
<button type="button" class="nfc-reader-tab" data-nfc-tab="read" role="tab" aria-selected="true">Lesen</button>
<button type="button" class="nfc-reader-tab" data-nfc-tab="write" role="tab" aria-selected="false">Schreiben</button>
</div>
<div class="nfc-reader-body">
<div class="nfc-reader-panel" data-panel="read-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">NFC-Tag lesen</p>
<p class="nfc-reader-lead">Tippe auf den Button und halte dann ein Tag an die Oberseite deines Telefons. Ich zeige dir sofort, was darauf steht.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-scan><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>NFC lesen</span></button>
<p class="nfc-reader-fineprint">Willst du NFC nativ erleben, mit noch mehr Funktionen? <a href="/features/nfc-reader-writer/">Hol dir die NFC.cool App!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="scanning">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">NFC lesen</p>
<p class="nfc-reader-lead">Halte dein NFC-Tag an die obere Rückseite deines Telefons.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Abbrechen</span></button>
</div>
<div class="nfc-reader-panel" data-panel="result">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Tag gelesen</span>
<ul class="nfc-reader-records" data-nfc-records></ul>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Seriennummer</span><span class="nfc-reader-value" data-nfc-serial></span></div>
<details class="nfc-reader-details"><summary>Technische Details</summary><div class="nfc-reader-tech" data-nfc-tech></div></details>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>NFC lesen</span></button>
</div>
<div class="nfc-reader-panel" data-panel="write-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">NFC-Tag beschreiben</p>
<select class="nfc-reader-select" data-nfc-type-select aria-label="Was auf das Tag geschrieben werden soll">
<optgroup label="Standard">
<option value="link">Link</option>
<option value="text">Text</option>
</optgroup>
<optgroup label="Kontakt">
<option value="phone">Telefonnummer</option>
<option value="email">E-Mail</option>
<option value="sms">SMS-Nachricht</option>
<option value="contact">Kontaktkarte</option>
</optgroup>
<optgroup label="Netzwerk">
<option value="wifi">WLAN-Netzwerk</option>
<option value="location">Standort</option>
</optgroup>
</select>
<div class="nfc-reader-form" data-nfc-form>
<div class="nfc-reader-fields" data-nfc-fields="link">
<input type="url" class="nfc-reader-input" data-k="url" placeholder="https://example.com" aria-label="Link für das Tag"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="text" hidden>
<textarea class="nfc-reader-input nfc-reader-textarea" data-k="text" rows="3" placeholder="Dein Text" aria-label="Text für das Tag"></textarea>
</div>
<div class="nfc-reader-fields" data-nfc-fields="phone" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Telefonnummer" aria-label="Telefonnummer"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="email" hidden>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="E-Mail-Adresse" aria-label="E-Mail-Adresse"/>
<input type="text" class="nfc-reader-input" data-k="subject" placeholder="Betreff (optional)" aria-label="E-Mail-Betreff (optional)"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="sms" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Telefonnummer" aria-label="Telefonnummer für die SMS"/>
<input type="text" class="nfc-reader-input" data-k="body" placeholder="Nachricht (optional)" aria-label="SMS-Nachricht (optional)"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="location" hidden>
<input type="text" class="nfc-reader-input" data-k="lat" inputmode="decimal" placeholder="Breitengrad" aria-label="Breitengrad"/>
<input type="text" class="nfc-reader-input" data-k="lng" inputmode="decimal" placeholder="Längengrad" aria-label="Längengrad"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="contact" hidden>
<input type="text" class="nfc-reader-input" data-k="name" placeholder="Vollständiger Name" aria-label="Name des Kontakts"/>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Telefon (optional)" aria-label="Telefon des Kontakts (optional)"/>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="E-Mail (optional)" aria-label="E-Mail des Kontakts (optional)"/>
<input type="text" class="nfc-reader-input" data-k="org" placeholder="Firma (optional)" aria-label="Firma des Kontakts (optional)"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="wifi" hidden>
<input type="text" class="nfc-reader-input" data-k="ssid" placeholder="Netzwerkname (SSID)" aria-label="Name des WLAN-Netzwerks"/>
<input type="text" class="nfc-reader-input" data-k="password" placeholder="Passwort" aria-label="WLAN-Passwort"/>
<select class="nfc-reader-select" data-k="security" aria-label="WLAN-Verschlüsselung">
<option value="wpa">WPA / WPA2</option>
<option value="wep">WEP</option>
<option value="open">Offen (kein Passwort)</option>
</select>
</div>
</div>
<p class="nfc-reader-input-error" data-nfc-input-error></p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Auf das Tag schreiben</span></button>
<p class="nfc-reader-fineprint">Willst du NFC nativ erleben, mit noch mehr Funktionen? <a href="/features/nfc-reader-writer/">Hol dir die NFC.cool App!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="writing">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">NFC schreiben</p>
<p class="nfc-reader-lead">Halte dein NFC-Tag an die obere Rückseite deines Telefons.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Abbrechen</span></button>
</div>
<div class="nfc-reader-panel" data-panel="written">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Tag beschrieben</span>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Auf das Tag geschrieben</span><span class="nfc-reader-value" data-nfc-written></span></div>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Weiteres Tag beschreiben</span></button>
</div>
<div class="nfc-reader-panel" data-panel="error">
<span class="nfc-reader-badge is-error">Etwas ist schiefgelaufen</span>
<p class="nfc-reader-lead" data-nfc-error-msg>Etwas ist schiefgelaufen.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-retry><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Erneut versuchen</span></button>
</div>
<div class="nfc-reader-panel" data-panel="ios">
<span class="nfc-reader-badge is-muted">iPhone</span>
<p class="nfc-reader-title">NFC im Browser geht auf dem iPhone nicht</p>
<p class="nfc-reader-lead">Apple lässt keinen Browser an den NFC-Chip. Fürs iPhone habe ich deshalb die kostenlose NFC.cool App entwickelt - damit liest und beschreibst du Tags trotzdem.</p>
<div class="landing-store-buttons"><a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-en&mt=8" class="landing-store-button is-apple" aria-label="Im App Store laden" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/AppStore.svg" alt="NFC.cool im App Store laden" width="156" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="android-other">
<span class="nfc-reader-badge is-muted">In Chrome öffnen</span>
<p class="nfc-reader-title">Wechsle zu Chrome, um hier zu scannen</p>
<p class="nfc-reader-lead">Du bist auf Android - Lesen und Schreiben im Browser funktionieren hier, sie brauchen nur Chrome. Öffne diese Seite in Chrome, dann ist der Reader bereit.</p>
<div class="landing-store-buttons"><a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-en" class="landing-store-button is-google" aria-label="Bei Google Play laden" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/GooglePlay.svg" alt="NFC.cool bei Google Play laden" width="173" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="desktop">
<span class="nfc-reader-badge is-muted">Nur Android + Chrome</span>
<img class="nfc-reader-qr" src="/assets/images/nfc-reader-qr.svg" alt="QR-Code, der diese Seite auf deinem Telefon öffnet" width="188" height="188"/>
<p class="nfc-reader-lead">Scanne den Code mit einem Android-Telefon, um den Reader dort zu öffnen. NFC im Browser braucht Chrome auf Android.</p>
<p class="nfc-reader-fineprint">Du bist am iPhone? <a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-en&mt=8" target="_blank" rel="noopener nofollow sponsored">Hol dir die NFC.cool App</a>.</p>
</div>
</div>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-section">

## So funktioniert es

<div class="page-cards-grid">

<article class="page-card nfc-step">
<span class="landing-feature-num">01</span>
<h3>Öffne diese Seite auf einem Android-Telefon</h3>
<p>Öffne diese Seite in Chrome auf einem Android-Telefon. Chrome hat eine Funktion namens Web NFC, über die eine Website mit dem NFC-Chip des Telefons sprechen kann - genau darauf baut dieser Reader auf.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">02</span>
<h3>Wähle Lesen oder Schreiben</h3>
<p>Beim Lesen siehst du alles, was auf einem Tag gespeichert ist. Beim Schreiben legst du einen Link oder einen kurzen Text darauf ab. Die NFC-Berechtigung holt sich Chrome beim ersten Mal - deine Antwort merkt es sich.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">03</span>
<h3>Halte ein Tag an dein Telefon</h3>
<p>Halte das Tag an die Oberseite deines Telefons. Ausgelesen oder beschrieben wird direkt auf deinem Gerät - ich sehe nichts davon, es wird nichts hochgeladen und nichts gespeichert.</p>
</article>

</div>

</section>

<section class="page-section">

## Was du von einem NFC-Tag lesen kannst

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 14.5 14.5 9.5"/><path d="M11 6.5 12.4 5a3.8 3.8 0 0 1 5.4 5.4l-1.5 1.5"/><path d="M13 17.5 11.6 19a3.8 3.8 0 0 1-5.4-5.4l1.5-1.5"/></svg></span>
<h3>Links und URLs</h3>
<p>Der häufigste Tag-Inhalt - eine Webadresse, die eine Seite, ein Profil oder eine Speisekarte öffnet. Ich zeige dir den vollständigen Link, damit du genau siehst, wohin er führt, bevor du ihn antippst.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 7h14"/><path d="M5 12h14"/><path d="M5 17h9"/></svg></span>
<h3>Reiner Text</h3>
<p>Notizen, Anleitungen, IDs oder jede kurze Nachricht, die als Text-Datensatz gespeichert ist. Ich lese den Text und seine Sprache direkt vom Chip.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4 4 8l8 4 8-4-8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/></svg></span>
<h3>Andere Datensätze</h3>
<p>WLAN-Zugangsdaten, Kontaktkarten und app-eigene Daten erscheinen als Datensätze mit eigenem Typ. Außerdem siehst du die eindeutige Seriennummer des Tags - sie ist bei jedem Lesevorgang dieselbe.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Leere oder gesperrte Tags</h3>
<p>Ein leeres Tag wird sauber ohne Datensätze gelesen - praktisch, um ein neues Tag zu prüfen, bevor du es beschreibst. Gesperrte Tags melden weiterhin ihren Typ und ihre Seriennummer.</p>
</article>

</div>

</section>

<section class="page-section">

## Willst du mehr als nur lesen und schreiben?

Der Reader auf dieser Seite erledigt die alltäglichen Dinge - ein Tag lesen und gängige Daten darauf schreiben. Für die meisten reicht das völlig, und ungefähr da endet auch die Web-NFC-Schnittstelle des Browsers: einfache NDEF-Datensätze, nur Chrome auf Android. Die **NFC.cool App** kann alles von dieser Seite - und macht dort weiter, wo der Browser aufhört:

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Tags sperren, formatieren und schützen</h3>
<p>Sperre ein Tag, sodass sich sein Inhalt nie wieder ändern lässt, setze eines komplett zurück, oder schütze es mit einem Passwort, sodass nur deine Geräte es neu beschreiben können.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg></span>
<h3>Geheimnisse mit NFC Safe verschlüsseln</h3>
<p>NFC Safe verschlüsselt ein Geheimnis mit AES-256 direkt auf dem Chip - ohne die App liest sich das Tag nur als unlesbarer Datensalat. <a href="/blog/nfc-safe-encrypted-secrets/">So funktioniert NFC Safe</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"/></svg></span>
<h3>Automatisieren, was ein Tippen auslöst</h3>
<p>Ein Tag kann einen Webhook anstoßen, einen iOS-Kurzbefehl starten, seinen Inhalt vorlesen oder mitzählen, wie oft es gescannt wird. <a href="/blog/count-nfc-tag-scans/">So zählst du NFC-Tag-Scans</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"/></svg></span>
<h3>Tags klonen, zurücksetzen und untersuchen</h3>
<p>Klone ein Tag, lies seinen rohen Chip-Speicher aus und bestimme den Chip, oder programmiere NFC-gesteuerte Hardware um - etwa <a href="/blog/openprinttag-read-write-nfc-spools-phone/">Filamentspulen für 3D-Drucker</a> oder <a href="/blog/reset-sonicare-brush-head-nfc/">Bürstenköpfe elektrischer Zahnbürsten</a>.</p>
</article>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## NFC auf dem iPhone braucht die App

Apple blockiert NFC in jedem iOS-Browser - keine Website kann auf einem iPhone oder iPad Tags lesen oder schreiben. Die NFC.cool App kann das nativ, auf dem iPhone genauso gut wie auf Android.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-en&mt=8" class="landing-store-button is-apple" aria-label="Im App Store laden" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="NFC.cool im App Store laden" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-en" class="landing-store-button is-google" aria-label="Bei Google Play laden" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="NFC.cool bei Google Play laden" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## Online NFC Reader FAQ

<div class="nfc-reader-faq">

<details class="faq-item">
<summary>Kann ich NFC-Tags ohne App lesen und schreiben?</summary>
<p>Ja, auf einem Android-Telefon in Chrome. Die Seite nutzt das eingebaute Web NFC deines Browsers - du musst nichts installieren. Tippe auf Scannen, um ein Tag zu lesen, oder nutze den Tab Schreiben, um einen Link, Text, Kontakt, ein WLAN-Netzwerk und mehr darauf abzulegen.</p>
</details>

<details class="faq-item">
<summary>Kann ich ein WLAN-Netzwerk oder eine Kontaktkarte auf ein Tag schreiben?</summary>
<p>Ja. Wähle im Schreiben-Dropdown WLAN-Netzwerk oder Kontaktkarte und fülle die Felder aus. Bei einem WLAN-Tag fragt ein Android-Telefon, ob es dem Netzwerk beitreten soll; ein Kontakt-Tag speichert eine normale vCard, die das Telefon zum Übernehmen anbietet.</p>
</details>

<details class="faq-item">
<summary>Funktioniert es auf dem iPhone?</summary>
<p>Nein. Apple blockiert NFC für jeden iOS-Browser - keine Website kann auf einem iPhone oder iPad Tags lesen oder schreiben. Auf dem iPhone übernimmt das die kostenlose NFC.cool App.</p>
</details>

<details class="faq-item">
<summary>Welche Browser werden unterstützt?</summary>
<p>Web NFC funktioniert nur in Chrome und anderen Chromium-Browsern auf Android. Desktop- und iOS-Browser unterstützen es nicht - falls deiner nicht kann, zeigt dir die Seite, was du stattdessen tun kannst.</p>
</details>

<details class="faq-item">
<summary>Ist der Online NFC Reader kostenlos?</summary>
<p>Komplett kostenlos - keine Anmeldung, kein Scan-Limit. Tags werden auf deinem eigenen Gerät gelesen und geschrieben, hochgeladen wird nie etwas.</p>
</details>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## Lies und schreibe NFC-Tags überall

Diese Seite deckt die Grundlagen im Browser ab. Die kostenlose NFC.cool App geht weiter - sie liest jedes Tag und schreibt über 25 Datenarten: Links, WLAN, Kontakte, Kurzbefehle und mehr, auf iPhone und Android. Ich entwickle und pflege sie selbst.

<div class="tap-cta-buttons">
<a href="/features/nfc-reader-writer/" class="landing-cta-button">Sieh dir den NFC Reader & Writer an</a>
<a href="/blog/nfc-tags-beginners-guide/" class="landing-cta-button">Neu bei NFC-Tags? Fang hier an</a>
</div>

</section>
