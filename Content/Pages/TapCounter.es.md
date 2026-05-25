---
title: "Contador de toques NFC - Demo en vivo"
slug: "tap-counter"
description: "Una demo en vivo del contador de toques NFC. Graba la URL de esta página en una etiqueta NFC con NFC.cool Tools, toca la etiqueta y observa cómo aparecen su propio recuento de escaneos y el ID de la etiqueta - sin ningún servidor de por medio."
image: "/assets/images/Blog/count-nfc-tag-scans.webp"
---

<section class="page-hero tap-counter-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Contador de toques NFC

Una etiqueta NFC puede contar sus propios escaneos - el número vive en el chip, no en un servidor. Graba una etiqueta que apunte a esta página, dale un toque, y el recuento en vivo y el ID de la etiqueta aparecen en la tarjeta.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-tap-counter-en&mt=8" class="landing-store-button is-apple" aria-label="Descargar en la App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Descargar en la App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-tap-counter-en" class="landing-store-button is-google" aria-label="Disponible en Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Disponible en Google Play" width="173" height="52"/>
</a>
</div>

</div>

<div class="page-hero-visual">

<div id="tap-counter-demo" class="tap-demo">
<div class="tap-demo-card tap-demo-result">
<p class="tap-demo-label">Etiqueta escaneada</p>
<div class="tap-demo-count-row">
<p class="tap-demo-count" data-tap-count>0</p>
<p class="tap-demo-caption">escaneos contados por la etiqueta</p>
</div>
<div class="tap-demo-field tap-demo-id-row">
<p class="tap-demo-label">ID de la etiqueta</p>
<p class="tap-demo-value" data-tap-id></p>
</div>
</div>
<div class="tap-demo-card tap-demo-empty">
<p class="tap-demo-label">Demo en vivo</p>
<p class="tap-demo-text">Toca una etiqueta NFC que apunte aquí y su recuento de escaneos aparece en esta tarjeta.</p>
<div class="tap-demo-field">
<p class="tap-demo-label">Apunta tu etiqueta a</p>
<p class="tap-demo-value">https://nfc.cool/tap-counter/</p>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-section">

## Cómo funciona

<div class="page-cards-grid">

<article class="page-card">
<h3>El chip guarda el recuento</h3>
<p>Los chips NTAG21x - el NTAG213, el NTAG215 y el NTAG216 usados en la mayoría de las pegatinas NFC - tienen un contador integrado en el hardware. Cada lectura lo incrementa en uno, sin ninguna app ni servidor de por medio.</p>
</article>

<article class="page-card">
<h3>La URL lo transporta</h3>
<p>NFC.cool Tools inserta bytes de marcador de posición al grabar la etiqueta. En cada escaneo, el chip los sustituye por los valores en vivo y los añade como <code>?nfc=</code> - primero el ID de la etiqueta, luego el recuento.</p>
</article>

<article class="page-card">
<h3>Esta página solo lo lee</h3>
<p>Sin backend, sin base de datos. Esta página descodifica el valor de <code>?nfc=</code> directamente de su propia barra de direcciones y te muestra lo que el chip ha entregado. El recuento ya había ocurrido.</p>
</article>

</div>

</section>

<section class="page-section">

## Qué puedes hacer con una etiqueta que se cuenta a sí misma

<div class="page-cards-grid">

<article class="page-card">
<h3>Distinguir las etiquetas</h3>
<p>Pon la misma URL en cincuenta pegatinas y el ID de la etiqueta seguirá diciéndote cuál física se ha tocado. Un solo enlace que gestionar, cincuenta etiquetas que puedes identificar.</p>
</article>

<article class="page-card">
<h3>Limitar el acceso gratuito</h3>
<p>El recuento viaja con cada toque, así que puedes actuar en consecuencia - da una recompensa a los primeros cien escaneos y redirige el resto a otro sitio.</p>
</article>

<article class="page-card">
<h3>Medir la interacción</h3>
<p>Pega una etiqueta en una tarjeta, un cartel o la caja de un producto y el contador se convierte en una métrica de interacción discreta - sin necesidad de una infraestructura de análisis.</p>
</article>

<article class="page-card">
<h3>Demostrar la autenticidad</h3>
<p>El contador solo sube y no se puede retroceder, lo que lo hace difícil de falsificar - útil para ediciones limitadas y comprobaciones antifalsificación.</p>
</article>

</div>

</section>

<section class="page-hero tap-cta">

## ¿Quieres la historia completa?

Hay más que conocer sobre el contador de toques NFC - qué chips funcionan, los casos de uso reales y toda la configuración paso a paso.

<div class="tap-cta-buttons">
<a href="/blog/count-nfc-tag-scans/" class="landing-cta-button">Leer la guía</a>
<a href="/features/nfc-reader-writer/" class="landing-cta-button">Ver la función</a>
</div>

</section>
