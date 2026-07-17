---
title: "Lecteur NFC en ligne"
slug: "online-nfc-reader"
description: "Lisez et écrivez des tags NFC directement dans votre navigateur - sans app, sans inscription. Scannez un tag pour voir ce qu'il contient, ou écrivez-y un lien ou du texte. Gratuit, fonctionne dans Chrome sur Android ; sur iPhone, l'app NFC.cool gratuite prend le relais."
image: "/assets/images/og-landing.webp"
---

<div style="display:none" aria-hidden="true"><svg><symbol id="nfc-icon-wave" viewBox="0 0 24 24"><path fill="currentColor" d="M8.77 12C8.77 10.18 8.14 8.48 7.02 7.15C6.29 6.29 5.22 7.27 5.77 7.97C6.84 9.32 7.25 10.44 7.25 12C7.25 13.55 6.84 14.67 5.77 16.02C5.23 16.72 6.3 17.69 7.02 16.83C8.14 15.51 8.77 13.82 8.77 12ZM13.56 12C13.56 9.22 12.69 6.61 11.12 4.5C10.41 3.56 9.18 4.47 9.84 5.33C11.28 7.22 12.05 9.53 12.05 12C12.05 14.46 11.28 16.77 9.84 18.66C9.18 19.53 10.41 20.44 11.12 19.48C12.69 17.37 13.56 14.77 13.56 12ZM18.38 12C18.38 8.26 17.21 4.78 15.14 1.89C14.5 1 13.2 1.78 13.89 2.71C15.83 5.37 16.86 8.58 16.86 12C16.86 15.42 15.82 18.62 13.89 21.28C13.22 22.2 14.47 23.02 15.14 22.1C17.21 19.21 18.38 15.73 18.38 12Z"/></symbol><symbol id="nfc-icon-android" viewBox="0 0 24 24" fill="none"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></symbol><symbol id="nfc-icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17.5 19 7"/></symbol><symbol id="nfc-icon-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></symbol></svg></div>

<section class="page-hero nfc-reader-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Lecteur NFC en ligne

J'ai créé ce lecteur pour que vous puissiez lire un tag NFC directement depuis votre navigateur - sans app, sans inscription. Appuyez sur *Scanner un tag*, approchez votre téléphone du tag, et son contenu s'affiche aussitôt. Passez à l'onglet *Écrire* et vous pouvez aussi placer un lien ou du texte sur un tag. Tout se passe sur votre téléphone, et rien de ce que vous scannez ne le quitte jamais.

<div class="nfc-hero-reqs"><span class="platform-pill is-android"><svg class="platform-pill-icon" viewBox="2 2 20 20" fill="none" aria-hidden="true"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></svg><span class="platform-pill-label">Chrome sur Android</span></span></div>

</div>

<div class="page-hero-visual">

<div id="nfc-reader-app" class="nfc-reader" data-state="desktop" data-mode="read" data-write-type="url">
<div class="nfc-phone">
<div class="nfc-phone-screen">
<div class="nfc-reader-tabs" role="tablist" aria-label="Mode du lecteur">
<button type="button" class="nfc-reader-tab" data-nfc-tab="read" role="tab" aria-selected="true">Lire</button>
<button type="button" class="nfc-reader-tab" data-nfc-tab="write" role="tab" aria-selected="false">Écrire</button>
</div>
<div class="nfc-reader-body">
<div class="nfc-reader-panel" data-panel="read-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">Lire un tag NFC</p>
<p class="nfc-reader-lead">Appuyez sur le bouton, puis approchez un tag du haut de votre téléphone. Je vous montre aussitôt ce qu'il contient.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-scan><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Lire NFC</span></button>
<p class="nfc-reader-fineprint">Envie d'une expérience NFC native avec encore plus de fonctions ? <a href="/features/nfc-reader-writer/">Téléchargez l'app NFC.cool !</a></p>
</div>
<div class="nfc-reader-panel" data-panel="scanning">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">Lire NFC</p>
<p class="nfc-reader-lead">Approchez votre tag NFC du haut du dos de votre téléphone.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Annuler</span></button>
</div>
<div class="nfc-reader-panel" data-panel="result">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Tag lu</span>
<ul class="nfc-reader-records" data-nfc-records></ul>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Numéro de série</span><span class="nfc-reader-value" data-nfc-serial></span></div>
<details class="nfc-reader-details"><summary>Détails techniques</summary><div class="nfc-reader-tech" data-nfc-tech></div></details>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Lire NFC</span></button>
</div>
<div class="nfc-reader-panel" data-panel="write-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">Écrire sur un tag NFC</p>
<select class="nfc-reader-select" data-nfc-type-select aria-label="Ce qu'il faut écrire sur le tag">
<optgroup label="Base">
<option value="link">Lien</option>
<option value="text">Texte</option>
</optgroup>
<optgroup label="Contact">
<option value="phone">Numéro de téléphone</option>
<option value="email">E-mail</option>
<option value="sms">Message SMS</option>
<option value="contact">Carte de contact</option>
</optgroup>
<optgroup label="Réseau">
<option value="wifi">Réseau Wi-Fi</option>
<option value="location">Position</option>
</optgroup>
</select>
<div class="nfc-reader-form" data-nfc-form>
<div class="nfc-reader-fields" data-nfc-fields="link">
<input type="url" class="nfc-reader-input" data-k="url" placeholder="https://example.com" aria-label="Lien à écrire"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="text" hidden>
<textarea class="nfc-reader-input nfc-reader-textarea" data-k="text" rows="3" placeholder="Votre texte ici" aria-label="Texte à écrire"></textarea>
</div>
<div class="nfc-reader-fields" data-nfc-fields="phone" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Numéro de téléphone" aria-label="Numéro de téléphone"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="email" hidden>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="Adresse e-mail" aria-label="Adresse e-mail"/>
<input type="text" class="nfc-reader-input" data-k="subject" placeholder="Objet (facultatif)" aria-label="Objet de l'e-mail, facultatif"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="sms" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Numéro de téléphone" aria-label="Numéro de téléphone pour le SMS"/>
<input type="text" class="nfc-reader-input" data-k="body" placeholder="Message (facultatif)" aria-label="Message SMS, facultatif"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="location" hidden>
<input type="text" class="nfc-reader-input" data-k="lat" inputmode="decimal" placeholder="Latitude" aria-label="Latitude"/>
<input type="text" class="nfc-reader-input" data-k="lng" inputmode="decimal" placeholder="Longitude" aria-label="Longitude"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="contact" hidden>
<input type="text" class="nfc-reader-input" data-k="name" placeholder="Nom complet" aria-label="Nom du contact"/>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Téléphone (facultatif)" aria-label="Téléphone du contact, facultatif"/>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="E-mail (facultatif)" aria-label="E-mail du contact, facultatif"/>
<input type="text" class="nfc-reader-input" data-k="org" placeholder="Organisation (facultatif)" aria-label="Organisation du contact, facultatif"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="wifi" hidden>
<input type="text" class="nfc-reader-input" data-k="ssid" placeholder="Nom du réseau (SSID)" aria-label="Nom du réseau Wi-Fi"/>
<input type="text" class="nfc-reader-input" data-k="password" placeholder="Mot de passe" aria-label="Mot de passe Wi-Fi"/>
<select class="nfc-reader-select" data-k="security" aria-label="Sécurité Wi-Fi">
<option value="wpa">WPA / WPA2</option>
<option value="wep">WEP</option>
<option value="open">Ouvert (sans mot de passe)</option>
</select>
</div>
</div>
<p class="nfc-reader-input-error" data-nfc-input-error></p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Écrire sur le tag</span></button>
<p class="nfc-reader-fineprint">Envie d'une expérience NFC native avec encore plus de fonctions ? <a href="/features/nfc-reader-writer/">Téléchargez l'app NFC.cool !</a></p>
</div>
<div class="nfc-reader-panel" data-panel="writing">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">Écrire NFC</p>
<p class="nfc-reader-lead">Approchez votre tag NFC du haut du dos de votre téléphone.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Annuler</span></button>
</div>
<div class="nfc-reader-panel" data-panel="written">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Tag écrit</span>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Écrit sur le tag</span><span class="nfc-reader-value" data-nfc-written></span></div>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Écrire un autre tag</span></button>
</div>
<div class="nfc-reader-panel" data-panel="error">
<span class="nfc-reader-badge is-error">Une erreur s'est produite</span>
<p class="nfc-reader-lead" data-nfc-error-msg>Une erreur s'est produite.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-retry><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Réessayer</span></button>
</div>
<div class="nfc-reader-panel" data-panel="ios">
<span class="nfc-reader-badge is-muted">iPhone</span>
<p class="nfc-reader-title">Le NFC dans le navigateur n'est pas disponible sur iPhone</p>
<p class="nfc-reader-lead">Apple n'autorise aucun navigateur à accéder à la puce NFC. J'ai donc créé l'app NFC.cool gratuite pour lire et écrire des tags NFC sur iPhone.</p>
<div class="landing-store-buttons"><a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-en&mt=8" class="landing-store-button is-apple" aria-label="Télécharger dans l'App Store" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/AppStore.svg" alt="Télécharger NFC.cool dans l'App Store" width="156" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="android-other">
<span class="nfc-reader-badge is-muted">Ouvrir dans Chrome</span>
<p class="nfc-reader-title">Passez à Chrome pour scanner ici</p>
<p class="nfc-reader-lead">Vous êtes sur Android, donc la lecture et l'écriture dans le navigateur fonctionnent - il suffit d'utiliser Chrome. Ouvrez cette page dans Chrome et le lecteur s'active.</p>
<div class="landing-store-buttons"><a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-en" class="landing-store-button is-google" aria-label="Disponible sur Google Play" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/GooglePlay.svg" alt="NFC.cool sur Google Play" width="173" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="desktop">
<span class="nfc-reader-badge is-muted">Android + Chrome uniquement</span>
<img class="nfc-reader-qr" src="/assets/images/nfc-reader-qr.svg" alt="QR code qui ouvre cette page sur votre téléphone" width="188" height="188"/>
<p class="nfc-reader-lead">Scannez-le avec un téléphone Android pour y ouvrir le lecteur. Le NFC dans le navigateur nécessite Chrome sur Android.</p>
<p class="nfc-reader-fineprint">Sur iPhone ? <a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-en&mt=8" target="_blank" rel="noopener nofollow sponsored">Téléchargez l'app NFC.cool</a>.</p>
</div>
</div>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## Téléchargez NFC.cool gratuitement

L'app complète lit et écrit n'importe quel tag NFC, sur iPhone comme sur Android.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-hero-ios-en&mt=8" class="landing-store-button is-apple" aria-label="Télécharger dans l'App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Télécharger NFC.cool dans l'App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-hero-android-en" class="landing-store-button is-google" aria-label="Disponible sur Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="NFC.cool sur Google Play" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## Comment ça marche

<div class="page-cards-grid">

<article class="page-card nfc-step">
<span class="landing-feature-num">01</span>
<h3>Ouvrez-la sur un téléphone Android</h3>
<p>Ouvrez cette page dans Chrome sur un téléphone Android. Chrome dispose d'une fonction appelée Web NFC qui permet à un site web de dialoguer avec la puce NFC du téléphone - c'est tout le moteur derrière cette page.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">02</span>
<h3>Choisissez lire ou écrire</h3>
<p>La lecture vous montre tout ce qui est stocké sur un tag. L'écriture y place un lien ou un court texte. La première fois, je demande à Chrome l'autorisation NFC, et il retient votre réponse.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">03</span>
<h3>Approchez un tag de votre téléphone</h3>
<p>Approchez le tag du haut de votre téléphone. Je le décode ou l'écris directement sur votre appareil - je ne le vois jamais, rien n'est envoyé en ligne et rien n'est conservé.</p>
</article>

</div>

</section>

<section class="page-section">

## Ce que vous pouvez lire sur un tag NFC

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 14.5 14.5 9.5"/><path d="M11 6.5 12.4 5a3.8 3.8 0 0 1 5.4 5.4l-1.5 1.5"/><path d="M13 17.5 11.6 19a3.8 3.8 0 0 1-5.4-5.4l1.5-1.5"/></svg></span>
<h3>Liens et URL</h3>
<p>Le contenu de tag le plus courant - une adresse web qui ouvre une page, un profil ou un menu. Je vous montre le lien complet pour que vous voyiez exactement où il mène avant d'y toucher.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 7h14"/><path d="M5 12h14"/><path d="M5 17h9"/></svg></span>
<h3>Texte brut</h3>
<p>Des notes, des instructions, des identifiants ou tout court message stocké sous forme d'enregistrement texte. Je décode le texte et sa langue directement depuis la puce.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4 4 8l8 4 8-4-8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/></svg></span>
<h3>Autres enregistrements</h3>
<p>Les identifiants Wi-Fi, les cartes de contact et les données propres à une app apparaissent comme des enregistrements typés. Vous voyez aussi le numéro de série unique du tag, identique à chaque lecture.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Tags vides ou verrouillés</h3>
<p>Un tag vierge se lit proprement, sans aucun enregistrement - pratique pour vérifier un tag neuf avant d'y écrire. Les tags verrouillés indiquent tout de même leur type et leur numéro de série.</p>
</article>

</div>

</section>

<section class="page-section">

## Envie d'aller plus loin que lire et écrire ?

Le lecteur de cette page gère les tâches du quotidien - lire un tag et y écrire des données courantes. Pour la plupart des gens, c'est tout ce qu'il faut, et l'API Web NFC du navigateur s'arrête à peu près là : enregistrements NDEF simples, uniquement sur Chrome pour Android. L'**app NFC.cool** fait tout ce que propose cette page, puis va plus loin, là où un navigateur ne peut pas :

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Verrouiller, formater et protéger les tags</h3>
<p>Verrouillez un tag pour que son contenu ne change plus jamais, effacez-en un pour le remettre à zéro, ou protégez-le par mot de passe pour que seuls vos appareils puissent le réécrire.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg></span>
<h3>Chiffrer des secrets avec NFC Safe</h3>
<p>NFC Safe chiffre un secret directement sur la puce en AES-256 : pour tout ce qui n'est pas l'app, le tag se lit comme des données brouillées. <a href="/blog/nfc-safe-encrypted-secrets/">Comment fonctionne NFC Safe</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"/></svg></span>
<h3>Automatiser ce qu'un tag déclenche</h3>
<p>Un tag peut déclencher un webhook, lancer un raccourci iOS, lire son contenu à voix haute ou compter le nombre de fois qu'il est scanné. <a href="/blog/count-nfc-tag-scans/">Comment compter les scans d'un tag NFC</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"/></svg></span>
<h3>Cloner, réinitialiser et inspecter les tags</h3>
<p>Clonez un tag, extrayez et identifiez la mémoire brute de sa puce, ou reprogrammez du matériel verrouillé par NFC comme des <a href="/blog/openprinttag-read-write-nfc-spools-phone/">bobines de filament pour imprimante 3D</a> ou des <a href="/blog/reset-sonicare-brush-head-nfc/">têtes de brosse à dents électrique</a>.</p>
</article>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## Sur iPhone, le NFC passe par l'app

Apple bloque le NFC dans tous les navigateurs iOS : aucun site web ne peut lire ou écrire de tags sur un iPhone ou un iPad. L'app NFC.cool le fait nativement, aussi bien que sur Android.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-en&mt=8" class="landing-store-button is-apple" aria-label="Télécharger dans l'App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Télécharger NFC.cool dans l'App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-en" class="landing-store-button is-google" aria-label="Disponible sur Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="NFC.cool sur Google Play" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## FAQ du lecteur NFC en ligne

<div class="nfc-reader-faq">

<details class="faq-item">
<summary>Peut-on lire et écrire des tags NFC sans app ?</summary>
<p>Oui, sur un téléphone Android dans Chrome. La page utilise le Web NFC intégré à votre navigateur, il n'y a donc rien à installer - appuyez sur Lire pour lire un tag, ou utilisez l'onglet Écrire pour y placer un lien, du texte, un contact, un réseau Wi-Fi et bien plus.</p>
</details>

<details class="faq-item">
<summary>Peut-on écrire un réseau Wi-Fi ou une carte de contact sur un tag ?</summary>
<p>Oui. Choisissez Réseau Wi-Fi ou Carte de contact dans le menu déroulant Écrire et remplissez les champs. Un tag Wi-Fi propose aux téléphones Android de rejoindre le réseau ; un tag de contact stocke une vCard standard que les téléphones proposent d'enregistrer.</p>
</details>

<details class="faq-item">
<summary>Est-ce que ça marche sur iPhone ?</summary>
<p>Non. Apple bloque le NFC pour tous les navigateurs iOS : aucun site web ne peut lire ou écrire de tags sur un iPhone ou un iPad. Sur iPhone, c'est l'app NFC.cool gratuite qui s'en charge.</p>
</details>

<details class="faq-item">
<summary>Quels navigateurs sont pris en charge ?</summary>
<p>Le Web NFC ne fonctionne que dans Chrome et les autres navigateurs Chromium sur Android. Les navigateurs de bureau et iOS ne le prennent pas en charge - si le vôtre ne peut pas, la page vous indique quoi faire à la place.</p>
</details>

<details class="faq-item">
<summary>Le lecteur NFC en ligne est-il gratuit ?</summary>
<p>Entièrement gratuit - sans inscription ni limite de scans. Les tags sont lus et écrits sur votre propre appareil, et rien n'est jamais envoyé en ligne.</p>
</details>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## Lisez et écrivez des tags NFC partout

Cette page couvre l'essentiel dans le navigateur. L'app NFC.cool gratuite va plus loin - elle lit n'importe quel tag et écrit plus de 25 types de données : liens, Wi-Fi, contacts, raccourcis et plus encore, sur iPhone comme sur Android. Je la développe et je la maintiens moi-même.

<div class="tap-cta-buttons">
<a href="/features/nfc-reader-writer/" class="landing-cta-button">Découvrir le lecteur et enregistreur NFC</a>
<a href="/blog/nfc-tags-beginners-guide/" class="landing-cta-button">Nouveau sur les tags NFC ? Commencez ici</a>
</div>

</section>
