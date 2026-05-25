---
title: "Contador de Toques NFC - Demo ao Vivo"
slug: "tap-counter"
description: "Uma demo ao vivo do Contador de Toques NFC. Grave o URL desta página numa tag NFC com a NFC.cool Tools, toque na tag e veja aparecer a sua própria contagem de leituras e o ID da tag - sem qualquer servidor envolvido."
image: "/assets/images/Blog/count-nfc-tag-scans.webp"
---

<section class="page-hero tap-counter-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Contador de Toques NFC

Uma tag NFC consegue contar as suas próprias leituras - o número fica guardado no chip, não num servidor. Grave uma tag que aponte para esta página, dê-lhe um toque, e a contagem ao vivo e o ID da tag aparecem no cartão.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-tap-counter-en&mt=8" class="landing-store-button is-apple" aria-label="Download on the App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Download on the App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-tap-counter-en" class="landing-store-button is-google" aria-label="Get it on Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Get it on Google Play" width="173" height="52"/>
</a>
</div>

</div>

<div class="page-hero-visual">

<div id="tap-counter-demo" class="tap-demo">
<div class="tap-demo-card tap-demo-result">
<p class="tap-demo-label">Tag lida</p>
<div class="tap-demo-count-row">
<p class="tap-demo-count" data-tap-count>0</p>
<p class="tap-demo-caption">leituras contadas pela tag</p>
</div>
<div class="tap-demo-field tap-demo-id-row">
<p class="tap-demo-label">ID da tag</p>
<p class="tap-demo-value" data-tap-id></p>
</div>
</div>
<div class="tap-demo-card tap-demo-empty">
<p class="tap-demo-label">Demo ao vivo</p>
<p class="tap-demo-text">Toque numa tag NFC que aponte para aqui e a sua contagem de leituras aparece neste cartão.</p>
<div class="tap-demo-field">
<p class="tap-demo-label">Aponte a sua tag para</p>
<p class="tap-demo-value">https://nfc.cool/tap-counter/</p>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-section">

## Como Funciona

<div class="page-cards-grid">

<article class="page-card">
<h3>O chip guarda a contagem</h3>
<p>Os chips NTAG21x - o NTAG213, o NTAG215 e o NTAG216 usados na maioria dos autocolantes NFC - têm um contador integrado no hardware. Cada leitura incrementa-o em um, sem qualquer app nem servidor envolvidos.</p>
</article>

<article class="page-card">
<h3>O URL transporta-a</h3>
<p>A NFC.cool Tools insere bytes de marcador de posição quando grava a tag. Em cada leitura, o chip substitui-os pelos valores ao vivo e acrescenta-os como <code>?nfc=</code> - primeiro o ID da tag, depois a contagem.</p>
</article>

<article class="page-card">
<h3>Esta página apenas a lê</h3>
<p>Sem backend, sem base de dados. Esta página descodifica o valor de <code>?nfc=</code> diretamente da sua própria barra de endereço e mostra-lhe o que o chip entregou. A contagem já tinha acontecido.</p>
</article>

</div>

</section>

<section class="page-section">

## O Que Pode Fazer Com uma Tag que se Conta a Si Própria

<div class="page-cards-grid">

<article class="page-card">
<h3>Distinguir as tags</h3>
<p>Coloque o mesmo URL em cinquenta autocolantes e o ID da tag continua a dizer-lhe qual foi a física tocada. Um único link para gerir, cinquenta tags que consegue identificar.</p>
</article>

<article class="page-card">
<h3>Limitar o acesso gratuito</h3>
<p>A contagem viaja com cada toque, por isso pode agir com base nela - dê uma recompensa às primeiras cem leituras e redirecione as restantes para outro sítio.</p>
</article>

<article class="page-card">
<h3>Acompanhar a interação</h3>
<p>Cole uma tag num cartão, num cartaz ou na caixa de um produto e o contador torna-se uma métrica de interação discreta - sem necessidade de uma estrutura de análise de dados.</p>
</article>

<article class="page-card">
<h3>Comprovar a autenticidade</h3>
<p>O contador só sobe e não pode ser recuado, o que o torna difícil de falsificar - útil para edições limitadas e verificações antifalsificação.</p>
</article>

</div>

</section>

<section class="page-hero tap-cta">

## Quer a História Completa?

Há mais para conhecer no Contador de Toques NFC - que chips funcionam, os casos de uso reais e toda a configuração passo a passo.

<div class="tap-cta-buttons">
<a href="/blog/count-nfc-tag-scans/" class="landing-cta-button">Ler o guia</a>
<a href="/features/nfc-reader-writer/" class="landing-cta-button">Ver a funcionalidade</a>
</div>

</section>
