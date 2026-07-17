---
title: "Lector NFC Online"
slug: "online-nfc-reader"
description: "Lee y graba etiquetas NFC directamente en tu navegador - sin app, sin registro. Escanea una etiqueta para ver qué contiene, o graba en ella un enlace o un texto. Gratis, funciona en Chrome en Android; los usuarios de iPhone obtienen la app NFC.cool gratis."
image: "/assets/images/og-landing.webp"
---

<div style="display:none" aria-hidden="true"><svg><symbol id="nfc-icon-wave" viewBox="0 0 24 24"><path fill="currentColor" d="M8.77 12C8.77 10.18 8.14 8.48 7.02 7.15C6.29 6.29 5.22 7.27 5.77 7.97C6.84 9.32 7.25 10.44 7.25 12C7.25 13.55 6.84 14.67 5.77 16.02C5.23 16.72 6.3 17.69 7.02 16.83C8.14 15.51 8.77 13.82 8.77 12ZM13.56 12C13.56 9.22 12.69 6.61 11.12 4.5C10.41 3.56 9.18 4.47 9.84 5.33C11.28 7.22 12.05 9.53 12.05 12C12.05 14.46 11.28 16.77 9.84 18.66C9.18 19.53 10.41 20.44 11.12 19.48C12.69 17.37 13.56 14.77 13.56 12ZM18.38 12C18.38 8.26 17.21 4.78 15.14 1.89C14.5 1 13.2 1.78 13.89 2.71C15.83 5.37 16.86 8.58 16.86 12C16.86 15.42 15.82 18.62 13.89 21.28C13.22 22.2 14.47 23.02 15.14 22.1C17.21 19.21 18.38 15.73 18.38 12Z"/></symbol><symbol id="nfc-icon-android" viewBox="0 0 24 24" fill="none"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></symbol><symbol id="nfc-icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17.5 19 7"/></symbol><symbol id="nfc-icon-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></symbol></svg></div>

<section class="page-hero nfc-reader-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Lector NFC Online

Lo hice para que puedas leer una etiqueta NFC directamente desde tu navegador - sin app, sin registro. Toca *Escanear una etiqueta*, acerca el móvil a la etiqueta y su contenido aparece al instante. Cambia a la pestaña *Grabar* y también puedes poner un enlace o un texto en una etiqueta. Todo se ejecuta en tu móvil, y nada de lo que escaneas sale nunca de él.

<div class="nfc-hero-reqs"><span class="platform-pill is-android"><svg class="platform-pill-icon" viewBox="2 2 20 20" fill="none" aria-hidden="true"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></svg><span class="platform-pill-label">Chrome en Android</span></span></div>

</div>

<div class="page-hero-visual">

<div id="nfc-reader-app" class="nfc-reader" data-state="desktop" data-mode="read" data-write-type="url">
<div class="nfc-phone">
<div class="nfc-phone-screen">
<div class="nfc-reader-tabs" role="tablist" aria-label="Modo del lector">
<button type="button" class="nfc-reader-tab" data-nfc-tab="read" role="tab" aria-selected="true">Leer</button>
<button type="button" class="nfc-reader-tab" data-nfc-tab="write" role="tab" aria-selected="false">Grabar</button>
</div>
<div class="nfc-reader-body">
<div class="nfc-reader-panel" data-panel="read-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">Leer una etiqueta NFC</p>
<p class="nfc-reader-lead">Toca el botón y luego acerca una etiqueta a la parte superior del móvil. Te mostraré qué contiene.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-scan><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Leer NFC</span></button>
<p class="nfc-reader-fineprint">¿Quieres una experiencia NFC nativa con más funciones de NFC? <a href="/features/nfc-reader-writer/">¡Consigue la app NFC.cool!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="scanning">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">Leer NFC</p>
<p class="nfc-reader-lead">Acerca tu etiqueta NFC a la parte superior trasera del móvil.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Cancelar</span></button>
</div>
<div class="nfc-reader-panel" data-panel="result">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Etiqueta leída</span>
<ul class="nfc-reader-records" data-nfc-records></ul>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Número de serie</span><span class="nfc-reader-value" data-nfc-serial></span></div>
<details class="nfc-reader-details"><summary>Detalles técnicos</summary><div class="nfc-reader-tech" data-nfc-tech></div></details>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Leer NFC</span></button>
</div>
<div class="nfc-reader-panel" data-panel="write-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">Grabar una etiqueta NFC</p>
<select class="nfc-reader-select" data-nfc-type-select aria-label="Qué grabar en la etiqueta">
<optgroup label="Básico">
<option value="link">Enlace</option>
<option value="text">Texto</option>
</optgroup>
<optgroup label="Contacto">
<option value="phone">Número de teléfono</option>
<option value="email">Correo electrónico</option>
<option value="sms">Mensaje SMS</option>
<option value="contact">Tarjeta de contacto</option>
</optgroup>
<optgroup label="Red">
<option value="wifi">Red Wi-Fi</option>
<option value="location">Ubicación</option>
</optgroup>
</select>
<div class="nfc-reader-form" data-nfc-form>
<div class="nfc-reader-fields" data-nfc-fields="link">
<input type="url" class="nfc-reader-input" data-k="url" placeholder="https://example.com" aria-label="Enlace a grabar"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="text" hidden>
<textarea class="nfc-reader-input nfc-reader-textarea" data-k="text" rows="3" placeholder="Tu texto aquí" aria-label="Texto a grabar"></textarea>
</div>
<div class="nfc-reader-fields" data-nfc-fields="phone" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Número de teléfono" aria-label="Número de teléfono"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="email" hidden>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="Dirección de correo electrónico" aria-label="Dirección de correo electrónico"/>
<input type="text" class="nfc-reader-input" data-k="subject" placeholder="Asunto (opcional)" aria-label="Asunto del correo, opcional"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="sms" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Número de teléfono" aria-label="Número de teléfono para SMS"/>
<input type="text" class="nfc-reader-input" data-k="body" placeholder="Mensaje (opcional)" aria-label="Mensaje SMS, opcional"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="location" hidden>
<input type="text" class="nfc-reader-input" data-k="lat" inputmode="decimal" placeholder="Latitud" aria-label="Latitud"/>
<input type="text" class="nfc-reader-input" data-k="lng" inputmode="decimal" placeholder="Longitud" aria-label="Longitud"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="contact" hidden>
<input type="text" class="nfc-reader-input" data-k="name" placeholder="Nombre completo" aria-label="Nombre del contacto"/>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Teléfono (opcional)" aria-label="Teléfono del contacto, opcional"/>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="Correo electrónico (opcional)" aria-label="Correo del contacto, opcional"/>
<input type="text" class="nfc-reader-input" data-k="org" placeholder="Organización (opcional)" aria-label="Organización del contacto, opcional"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="wifi" hidden>
<input type="text" class="nfc-reader-input" data-k="ssid" placeholder="Nombre de la red (SSID)" aria-label="Nombre de la red Wi-Fi"/>
<input type="text" class="nfc-reader-input" data-k="password" placeholder="Contraseña" aria-label="Contraseña Wi-Fi"/>
<select class="nfc-reader-select" data-k="security" aria-label="Seguridad Wi-Fi">
<option value="wpa">WPA / WPA2</option>
<option value="wep">WEP</option>
<option value="open">Abierta (sin contraseña)</option>
</select>
</div>
</div>
<p class="nfc-reader-input-error" data-nfc-input-error></p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Grabar en la etiqueta</span></button>
<p class="nfc-reader-fineprint">¿Quieres una experiencia NFC nativa con más funciones de NFC? <a href="/features/nfc-reader-writer/">¡Consigue la app NFC.cool!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="writing">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">Grabar NFC</p>
<p class="nfc-reader-lead">Acerca tu etiqueta NFC a la parte superior trasera del móvil.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Cancelar</span></button>
</div>
<div class="nfc-reader-panel" data-panel="written">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Etiqueta grabada</span>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Grabado en la etiqueta</span><span class="nfc-reader-value" data-nfc-written></span></div>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Grabar otra etiqueta</span></button>
</div>
<div class="nfc-reader-panel" data-panel="error">
<span class="nfc-reader-badge is-error">Algo salió mal</span>
<p class="nfc-reader-lead" data-nfc-error-msg>Algo salió mal.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-retry><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Intentar de nuevo</span></button>
</div>
<div class="nfc-reader-panel" data-panel="ios">
<span class="nfc-reader-badge is-muted">iPhone</span>
<p class="nfc-reader-title">El NFC en el navegador no está disponible en iPhone</p>
<p class="nfc-reader-lead">Apple no deja que ningún navegador acceda al chip NFC. Por eso hice la app NFC.cool gratis para leer y grabar etiquetas en el iPhone.</p>
<div class="landing-store-buttons"><a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-en&mt=8" class="landing-store-button is-apple" aria-label="Descargar en la App Store" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/AppStore.svg" alt="Descargar NFC.cool en la App Store" width="156" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="android-other">
<span class="nfc-reader-badge is-muted">Abrir en Chrome</span>
<p class="nfc-reader-title">Cambia a Chrome para escanear aquí</p>
<p class="nfc-reader-lead">Estás en Android, así que leer y grabar en el navegador funciona - solo necesita Chrome. Abre esta página en Chrome y el lector se activa.</p>
<div class="landing-store-buttons"><a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-en" class="landing-store-button is-google" aria-label="Consíguelo en Google Play" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/GooglePlay.svg" alt="Consigue NFC.cool en Google Play" width="173" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="desktop">
<span class="nfc-reader-badge is-muted">Solo Android + Chrome</span>
<img class="nfc-reader-qr" src="/assets/images/nfc-reader-qr.svg" alt="Código QR que abre esta página en tu móvil" width="188" height="188"/>
<p class="nfc-reader-lead">Escanea esto con un móvil Android para abrir el lector ahí. El NFC en el navegador necesita Chrome en Android.</p>
<p class="nfc-reader-fineprint">¿Estás en un iPhone? <a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-en&mt=8" target="_blank" rel="noopener nofollow sponsored">Consigue la app NFC.cool</a>.</p>
</div>
</div>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## Descarga NFC.cool gratis

La app lee y escribe cualquier etiqueta NFC en iPhone y Android.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-hero-ios-en&mt=8" class="landing-store-button is-apple" aria-label="Descargar en la App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Descargar NFC.cool en la App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-hero-android-en" class="landing-store-button is-google" aria-label="Consíguelo en Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Consigue NFC.cool en Google Play" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## Cómo funciona

<div class="page-cards-grid">

<article class="page-card nfc-step">
<span class="landing-feature-num">01</span>
<h3>Ábrela en un móvil Android</h3>
<p>Abre esta página en Chrome en un móvil Android. Chrome tiene una función llamada Web NFC que permite a un sitio web comunicarse con el chip NFC del móvil - ese es todo el motor detrás de esta página.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">02</span>
<h3>Elige Leer o Grabar</h3>
<p>Leer te muestra todo lo que hay guardado en una etiqueta. Grabar pone en ella un enlace o un texto corto. Le pido el permiso de NFC a Chrome la primera vez, y él recuerda tu respuesta.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">03</span>
<h3>Acerca una etiqueta al móvil</h3>
<p>Toca la etiqueta con la parte superior del móvil. La decodifico o la grabo ahí mismo en tu dispositivo - nunca la veo, no se sube nada y no se guarda nada.</p>
</article>

</div>

</section>

<section class="page-section">

## Qué puedes leer de una etiqueta NFC

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 14.5 14.5 9.5"/><path d="M11 6.5 12.4 5a3.8 3.8 0 0 1 5.4 5.4l-1.5 1.5"/><path d="M13 17.5 11.6 19a3.8 3.8 0 0 1-5.4-5.4l1.5-1.5"/></svg></span>
<h3>Enlaces y URLs</h3>
<p>El contenido de etiqueta más común - una dirección web que abre una página, un perfil o un menú. Te muestro el enlace completo para que veas exactamente adónde apunta antes de tocarlo.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 7h14"/><path d="M5 12h14"/><path d="M5 17h9"/></svg></span>
<h3>Texto sin formato</h3>
<p>Notas, instrucciones, IDs o cualquier mensaje corto guardado como registro de texto. Decodifico el texto y su idioma directamente desde el chip.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4 4 8l8 4 8-4-8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/></svg></span>
<h3>Otros registros</h3>
<p>Las credenciales de Wi-Fi, las tarjetas de contacto y los datos específicos de apps aparecen como registros tipificados. También ves el número de serie único de la etiqueta, que es el mismo en cada lectura.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Etiquetas vacías o bloqueadas</h3>
<p>Una etiqueta en blanco se lee sin problemas, sin registros - práctico para comprobar una etiqueta nueva antes de grabar en ella. Las etiquetas bloqueadas siguen indicando su tipo y su número de serie.</p>
</article>

</div>

</section>

<section class="page-section">

## ¿Quieres hacer más que leer y grabar?

El lector de esta página se ocupa de las tareas del día a día - leer una etiqueta y grabar en ella datos comunes. Para la mayoría de la gente esa es toda la historia, y la API Web NFC del navegador se detiene más o menos ahí: registros NDEF simples, solo en Chrome en Android. La **app NFC.cool** hace todo lo que hay en esta página y luego sigue donde un navegador no puede:

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Bloquear, formatear y proteger etiquetas</h3>
<p>Bloquea una etiqueta para que su contenido nunca cambie, borra una para dejarla en blanco o protégela con contraseña para que solo tus dispositivos puedan regrabarla.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg></span>
<h3>Cifrar secretos con NFC Safe</h3>
<p>NFC Safe cifra un secreto en el propio chip con AES-256, así que la etiqueta se lee como datos revueltos para cualquier cosa que no sea la app. <a href="/blog/nfc-safe-encrypted-secrets/">Cómo funciona NFC Safe</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"/></svg></span>
<h3>Automatizar lo que hace un toque</h3>
<p>Una etiqueta puede disparar un webhook, ejecutar un Atajo de iOS, leer su contenido en voz alta o contar cuántas veces se escanea. <a href="/blog/count-nfc-tag-scans/">Cómo contar escaneos de etiquetas NFC</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"/></svg></span>
<h3>Clonar, restablecer e inspeccionar etiquetas</h3>
<p>Clona una etiqueta, vuelca e identifica la memoria en bruto de su chip, o reprograma hardware protegido por NFC como <a href="/blog/openprinttag-read-write-nfc-spools-phone/">bobinas de filamento de impresoras 3D</a> y <a href="/blog/reset-sonicare-brush-head-nfc/">cabezales de cepillos de dientes eléctricos</a>.</p>
</article>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## El NFC en iPhone necesita la app

Apple bloquea el NFC en todos los navegadores de iOS, así que ningún sitio web puede leer ni grabar etiquetas en un iPhone o iPad. La app NFC.cool lo hace de forma nativa, igual de bien que en Android.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-en&mt=8" class="landing-store-button is-apple" aria-label="Descargar en la App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Descargar NFC.cool en la App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-en" class="landing-store-button is-google" aria-label="Consíguelo en Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Consigue NFC.cool en Google Play" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## Preguntas frecuentes sobre el Lector NFC Online

<div class="nfc-reader-faq">

<details class="faq-item">
<summary>¿Puedo leer y grabar etiquetas NFC sin una app?</summary>
<p>Sí, en un móvil Android con Chrome. La página usa el Web NFC integrado en tu navegador, así que no hay nada que instalar - toca Escanear para leer una etiqueta, o usa la pestaña Grabar para poner en ella un enlace, texto, un contacto, una red Wi-Fi y mucho más.</p>
</details>

<details class="faq-item">
<summary>¿Puedo grabar una red Wi-Fi o una tarjeta de contacto en una etiqueta?</summary>
<p>Sí. Elige Red Wi-Fi o Tarjeta de contacto en el desplegable de grabación y rellena los campos. Una etiqueta de Wi-Fi propone a los móviles Android conectarse a la red; una etiqueta de contacto guarda un vCard estándar que los móviles te ofrecen guardar.</p>
</details>

<details class="faq-item">
<summary>¿Funciona en iPhone?</summary>
<p>No. Apple bloquea el NFC en todos los navegadores de iOS, así que ningún sitio web puede leer ni grabar etiquetas en un iPhone o iPad. La app NFC.cool gratis lo hace en el iPhone.</p>
</details>

<details class="faq-item">
<summary>¿Qué navegadores son compatibles?</summary>
<p>Web NFC funciona solo en Chrome y otros navegadores basados en Chromium en Android. Los navegadores de escritorio y de iOS no lo admiten - si el tuyo no puede, la página te muestra qué hacer en su lugar.</p>
</details>

<details class="faq-item">
<summary>¿El Lector NFC Online es gratis?</summary>
<p>Totalmente gratis - sin registro y sin límite de escaneos. Las etiquetas se leen y se graban en tu propio dispositivo, y nunca se sube nada.</p>
</details>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## Lee y graba etiquetas NFC en cualquier lugar

Esta página cubre lo básico en el navegador. La app NFC.cool gratis va más allá - lee cualquier etiqueta y graba más de 25 tipos de datos: enlaces, Wi-Fi, contactos, atajos y más, tanto en iPhone como en Android. La desarrollo y la mantengo yo mismo.

<div class="tap-cta-buttons">
<a href="/features/nfc-reader-writer/" class="landing-cta-button">Descubre el lector y grabador NFC</a>
<a href="/blog/nfc-tags-beginners-guide/" class="landing-cta-button">¿Nuevo en las etiquetas NFC? Empieza aquí</a>
</div>

</section>
