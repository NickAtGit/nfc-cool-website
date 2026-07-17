---
title: "Leitor NFC online"
slug: "online-nfc-reader"
description: "Leia e grave tags NFC diretamente no navegador - sem app, sem registo. Leia uma tag para ver o que tem, ou grave nela uma ligação ou texto. Gratuito, funciona no Chrome em Android; os utilizadores de iPhone obtêm a app NFC.cool gratuita."
image: "/assets/images/og-landing.webp"
---

<div style="display:none" aria-hidden="true"><svg><symbol id="nfc-icon-wave" viewBox="0 0 24 24"><path fill="currentColor" d="M8.77 12C8.77 10.18 8.14 8.48 7.02 7.15C6.29 6.29 5.22 7.27 5.77 7.97C6.84 9.32 7.25 10.44 7.25 12C7.25 13.55 6.84 14.67 5.77 16.02C5.23 16.72 6.3 17.69 7.02 16.83C8.14 15.51 8.77 13.82 8.77 12ZM13.56 12C13.56 9.22 12.69 6.61 11.12 4.5C10.41 3.56 9.18 4.47 9.84 5.33C11.28 7.22 12.05 9.53 12.05 12C12.05 14.46 11.28 16.77 9.84 18.66C9.18 19.53 10.41 20.44 11.12 19.48C12.69 17.37 13.56 14.77 13.56 12ZM18.38 12C18.38 8.26 17.21 4.78 15.14 1.89C14.5 1 13.2 1.78 13.89 2.71C15.83 5.37 16.86 8.58 16.86 12C16.86 15.42 15.82 18.62 13.89 21.28C13.22 22.2 14.47 23.02 15.14 22.1C17.21 19.21 18.38 15.73 18.38 12Z"/></symbol><symbol id="nfc-icon-android" viewBox="0 0 24 24" fill="none"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></symbol><symbol id="nfc-icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17.5 19 7"/></symbol><symbol id="nfc-icon-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></symbol></svg></div>

<section class="page-hero nfc-reader-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Leitor NFC online

Criei isto para que possa ler uma tag NFC diretamente do seu navegador - sem app, sem registo. Toque em *Ler uma tag*, encoste o telemóvel à tag e o conteúdo aparece logo. Mude para o separador *Gravar* e também pode colocar uma ligação ou texto numa tag. Tudo corre no seu telemóvel e nada do que ler sai dele.

<div class="nfc-hero-reqs"><span class="platform-pill is-android"><svg class="platform-pill-icon" viewBox="2 2 20 20" fill="none" aria-hidden="true"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></svg><span class="platform-pill-label">Chrome no Android</span></span></div>

</div>

<div class="page-hero-visual">

<div id="nfc-reader-app" class="nfc-reader" data-state="desktop" data-mode="read" data-write-type="url">
<div class="nfc-phone">
<div class="nfc-phone-screen">
<div class="nfc-reader-tabs" role="tablist" aria-label="Modo do leitor">
<button type="button" class="nfc-reader-tab" data-nfc-tab="read" role="tab" aria-selected="true">Ler</button>
<button type="button" class="nfc-reader-tab" data-nfc-tab="write" role="tab" aria-selected="false">Gravar</button>
</div>
<div class="nfc-reader-body">
<div class="nfc-reader-panel" data-panel="read-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">Ler uma tag NFC</p>
<p class="nfc-reader-lead">Toque no botão e depois encoste uma tag ao topo do telemóvel. Vou mostrar-lhe o que tem.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-scan><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Ler NFC</span></button>
<p class="nfc-reader-fineprint">Quer uma experiência NFC nativa com mais funções de NFC? <a href="/features/nfc-reader-writer/">Obtenha a app NFC.cool!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="scanning">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">Ler NFC</p>
<p class="nfc-reader-lead">Encoste a sua tag NFC à parte de trás superior do telemóvel.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Cancelar</span></button>
</div>
<div class="nfc-reader-panel" data-panel="result">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Tag lida</span>
<ul class="nfc-reader-records" data-nfc-records></ul>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Número de série</span><span class="nfc-reader-value" data-nfc-serial></span></div>
<details class="nfc-reader-details"><summary>Detalhes técnicos</summary><div class="nfc-reader-tech" data-nfc-tech></div></details>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Ler NFC</span></button>
</div>
<div class="nfc-reader-panel" data-panel="write-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">Gravar uma tag NFC</p>
<select class="nfc-reader-select" data-nfc-type-select aria-label="O que gravar na tag">
<optgroup label="Básico">
<option value="link">Ligação</option>
<option value="text">Texto</option>
</optgroup>
<optgroup label="Contacto">
<option value="phone">Número de telefone</option>
<option value="email">Email</option>
<option value="sms">Mensagem SMS</option>
<option value="contact">Cartão de visita</option>
</optgroup>
<optgroup label="Rede">
<option value="wifi">Rede Wi-Fi</option>
<option value="location">Localização</option>
</optgroup>
</select>
<div class="nfc-reader-form" data-nfc-form>
<div class="nfc-reader-fields" data-nfc-fields="link">
<input type="url" class="nfc-reader-input" data-k="url" placeholder="https://example.com" aria-label="Ligação a gravar"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="text" hidden>
<textarea class="nfc-reader-input nfc-reader-textarea" data-k="text" rows="3" placeholder="O seu texto aqui" aria-label="Texto a gravar"></textarea>
</div>
<div class="nfc-reader-fields" data-nfc-fields="phone" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Número de telefone" aria-label="Número de telefone"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="email" hidden>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="Endereço de email" aria-label="Endereço de email"/>
<input type="text" class="nfc-reader-input" data-k="subject" placeholder="Assunto (opcional)" aria-label="Assunto do email, opcional"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="sms" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Número de telefone" aria-label="Número de telefone para SMS"/>
<input type="text" class="nfc-reader-input" data-k="body" placeholder="Mensagem (opcional)" aria-label="Mensagem SMS, opcional"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="location" hidden>
<input type="text" class="nfc-reader-input" data-k="lat" inputmode="decimal" placeholder="Latitude" aria-label="Latitude"/>
<input type="text" class="nfc-reader-input" data-k="lng" inputmode="decimal" placeholder="Longitude" aria-label="Longitude"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="contact" hidden>
<input type="text" class="nfc-reader-input" data-k="name" placeholder="Nome completo" aria-label="Nome do contacto"/>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Telefone (opcional)" aria-label="Telefone do contacto, opcional"/>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="Email (opcional)" aria-label="Email do contacto, opcional"/>
<input type="text" class="nfc-reader-input" data-k="org" placeholder="Organização (opcional)" aria-label="Organização do contacto, opcional"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="wifi" hidden>
<input type="text" class="nfc-reader-input" data-k="ssid" placeholder="Nome da rede (SSID)" aria-label="Nome da rede Wi-Fi"/>
<input type="text" class="nfc-reader-input" data-k="password" placeholder="Palavra-passe" aria-label="Palavra-passe Wi-Fi"/>
<select class="nfc-reader-select" data-k="security" aria-label="Segurança Wi-Fi">
<option value="wpa">WPA / WPA2</option>
<option value="wep">WEP</option>
<option value="open">Aberta (sem palavra-passe)</option>
</select>
</div>
</div>
<p class="nfc-reader-input-error" data-nfc-input-error></p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Gravar na tag</span></button>
<p class="nfc-reader-fineprint">Quer uma experiência NFC nativa com mais funções de NFC? <a href="/features/nfc-reader-writer/">Obtenha a app NFC.cool!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="writing">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">Gravar NFC</p>
<p class="nfc-reader-lead">Encoste a sua tag NFC à parte de trás superior do telemóvel.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Cancelar</span></button>
</div>
<div class="nfc-reader-panel" data-panel="written">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Tag gravada</span>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Gravado na tag</span><span class="nfc-reader-value" data-nfc-written></span></div>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Gravar outra tag</span></button>
</div>
<div class="nfc-reader-panel" data-panel="error">
<span class="nfc-reader-badge is-error">Algo correu mal</span>
<p class="nfc-reader-lead" data-nfc-error-msg>Algo correu mal.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-retry><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Tentar novamente</span></button>
</div>
<div class="nfc-reader-panel" data-panel="ios">
<span class="nfc-reader-badge is-muted">iPhone</span>
<p class="nfc-reader-title">O NFC no navegador não está disponível no iPhone</p>
<p class="nfc-reader-lead">A Apple não deixa nenhum navegador aceder ao chip NFC. Por isso fiz a app NFC.cool gratuita para ler e gravar tags no iPhone.</p>
<div class="landing-store-buttons"><a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-en&mt=8" class="landing-store-button is-apple" aria-label="Descarregar na App Store" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/AppStore.svg" alt="Descarregar a NFC.cool na App Store" width="156" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="android-other">
<span class="nfc-reader-badge is-muted">Abrir no Chrome</span>
<p class="nfc-reader-title">Mude para o Chrome para ler aqui</p>
<p class="nfc-reader-lead">Está no Android, por isso a leitura e a gravação no navegador funcionam - só precisam do Chrome. Abra esta página no Chrome e o leitor ativa-se.</p>
<div class="landing-store-buttons"><a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-en" class="landing-store-button is-google" aria-label="Obter no Google Play" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/GooglePlay.svg" alt="Obter a NFC.cool no Google Play" width="173" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="desktop">
<span class="nfc-reader-badge is-muted">Apenas Android + Chrome</span>
<img class="nfc-reader-qr" src="/assets/images/nfc-reader-qr.svg" alt="Código QR que abre esta página no seu telemóvel" width="188" height="188"/>
<p class="nfc-reader-lead">Leia isto com um telemóvel Android para abrir o leitor aí. O NFC no navegador precisa do Chrome em Android.</p>
<p class="nfc-reader-fineprint">Está num iPhone? <a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-en&mt=8" target="_blank" rel="noopener nofollow sponsored">Obtenha a app NFC.cool</a>.</p>
</div>
</div>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## Descarregue a NFC.cool grátis

A app lê e escreve qualquer etiqueta NFC no iPhone e Android.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-hero-ios-en&mt=8" class="landing-store-button is-apple" aria-label="Descarregar na App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Descarregar a NFC.cool na App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-hero-android-en" class="landing-store-button is-google" aria-label="Obter no Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Obter a NFC.cool no Google Play" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## Como funciona

<div class="page-cards-grid">

<article class="page-card nfc-step">
<span class="landing-feature-num">01</span>
<h3>Abra-a num telemóvel Android</h3>
<p>Abra esta página no Chrome num telemóvel Android. O Chrome tem uma funcionalidade chamada Web NFC que permite a um site comunicar com o chip NFC do telemóvel - é esse o motor por trás desta página.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">02</span>
<h3>Escolha Ler ou Gravar</h3>
<p>Ler mostra-lhe tudo o que está guardado numa tag. Gravar coloca nela uma ligação ou um pequeno texto. Peço a permissão de NFC ao Chrome na primeira vez e ele guarda a sua resposta.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">03</span>
<h3>Encoste uma tag ao telemóvel</h3>
<p>Toque com a tag no topo do telemóvel. Descodifico-a ou gravo-a ali mesmo no seu dispositivo - nunca a vejo, nada é enviado e nada é guardado.</p>
</article>

</div>

</section>

<section class="page-section">

## O que pode ler de uma tag NFC

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 14.5 14.5 9.5"/><path d="M11 6.5 12.4 5a3.8 3.8 0 0 1 5.4 5.4l-1.5 1.5"/><path d="M13 17.5 11.6 19a3.8 3.8 0 0 1-5.4-5.4l1.5-1.5"/></svg></span>
<h3>Ligações e URLs</h3>
<p>O conteúdo de tag mais comum - um endereço web que abre uma página, um perfil ou uma ementa. Mostro-lhe a ligação completa para que veja exatamente para onde aponta antes de tocar nela.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 7h14"/><path d="M5 12h14"/><path d="M5 17h9"/></svg></span>
<h3>Texto simples</h3>
<p>Notas, instruções, IDs ou qualquer mensagem curta guardada como registo de texto. Descodifico o texto e o seu idioma diretamente do chip.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4 4 8l8 4 8-4-8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/></svg></span>
<h3>Outros registos</h3>
<p>Credenciais de Wi-Fi, cartões de visita e dados específicos de apps aparecem como registos tipificados. Vê também o número de série único da tag, que é o mesmo em todas as leituras.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Tags vazias ou bloqueadas</h3>
<p>Uma tag em branco lê-se sem problemas, sem registos - útil para verificar uma tag nova antes de gravar nela. As tags bloqueadas continuam a indicar o seu tipo e número de série.</p>
</article>

</div>

</section>

<section class="page-section">

## Quer fazer mais do que ler e gravar?

O leitor desta página trata das tarefas do dia a dia - ler uma tag e gravar nela dados comuns. Para a maioria das pessoas é essa toda a história, e a API Web NFC do navegador para mais ou menos aí: registos NDEF simples, apenas no Chrome em Android. A **app NFC.cool** faz tudo o que há nesta página e depois continua onde um navegador não consegue:

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Bloquear, formatar e proteger tags</h3>
<p>Bloqueie uma tag para que o conteúdo nunca mude, apague uma para a deixar em branco ou proteja-a com palavra-passe para que só os seus dispositivos a possam regravar.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg></span>
<h3>Encriptar segredos com o NFC Safe</h3>
<p>O NFC Safe encripta um segredo no próprio chip com AES-256, por isso a tag lê-se como dados baralhados para tudo o que não seja a app. <a href="/blog/nfc-safe-encrypted-secrets/">Como funciona o NFC Safe</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"/></svg></span>
<h3>Automatizar o que um toque faz</h3>
<p>Uma tag pode disparar um webhook, executar um Atalho do iOS, dizer o seu conteúdo em voz alta ou contar quantas vezes é lida. <a href="/blog/count-nfc-tag-scans/">Como contar leituras de tags NFC</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"/></svg></span>
<h3>Clonar, repor e inspecionar tags</h3>
<p>Clone uma tag, extraia e identifique a memória em bruto do seu chip, ou reprograme hardware protegido por NFC como <a href="/blog/openprinttag-read-write-nfc-spools-phone/">bobinas de filamento de impressoras 3D</a> e <a href="/blog/reset-sonicare-brush-head-nfc/">cabeças de escovas de dentes elétricas</a>.</p>
</article>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## O NFC no iPhone precisa da app

A Apple bloqueia o NFC em todos os navegadores do iOS, por isso nenhum site consegue ler ou gravar tags num iPhone ou iPad. A app NFC.cool fá-lo de forma nativa, tão bem como no Android.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-en&mt=8" class="landing-store-button is-apple" aria-label="Descarregar na App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Descarregar a NFC.cool na App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-en" class="landing-store-button is-google" aria-label="Obter no Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Obter a NFC.cool no Google Play" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## Perguntas frequentes sobre o leitor NFC online

<div class="nfc-reader-faq">

<details class="faq-item">
<summary>Posso ler e gravar tags NFC sem uma app?</summary>
<p>Sim, num telemóvel Android no Chrome. A página usa o Web NFC integrado no seu navegador, por isso não há nada para instalar - toque em Ler para ler uma tag, ou use o separador Gravar para colocar nela uma ligação, texto, contacto, rede Wi-Fi e muito mais.</p>
</details>

<details class="faq-item">
<summary>Posso gravar uma rede Wi-Fi ou um cartão de visita numa tag?</summary>
<p>Sim. Escolha rede Wi-Fi ou cartão de visita no menu suspenso Gravar e preencha os campos. Uma tag de Wi-Fi sugere aos telemóveis Android que se liguem à rede; uma tag de contacto guarda um vCard padrão que os telemóveis se oferecem para guardar.</p>
</details>

<details class="faq-item">
<summary>Funciona no iPhone?</summary>
<p>Não. A Apple bloqueia o NFC em todos os navegadores do iOS, por isso nenhum site consegue ler ou gravar tags num iPhone ou iPad. A app NFC.cool gratuita fá-lo no iPhone.</p>
</details>

<details class="faq-item">
<summary>Que navegadores são suportados?</summary>
<p>O Web NFC funciona apenas no Chrome e noutros navegadores baseados em Chromium no Android. Os navegadores de computador e de iOS não o suportam - se o seu não conseguir, a página mostra o que fazer em alternativa.</p>
</details>

<details class="faq-item">
<summary>O leitor NFC online é gratuito?</summary>
<p>Totalmente gratuito - sem registo e sem limite de leituras. As tags são lidas e gravadas no seu próprio dispositivo e nada é enviado.</p>
</details>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## Leia e grave tags NFC em qualquer lugar

Esta página cobre o essencial no navegador. A app NFC.cool gratuita vai mais longe - lê qualquer tag e grava mais de 25 tipos de dados: ligações, Wi-Fi, contactos, atalhos e muito mais, tanto no iPhone como no Android. Sou eu próprio que a crio e mantenho.

<div class="tap-cta-buttons">
<a href="/features/nfc-reader-writer/" class="landing-cta-button">Conheça o leitor e gravador NFC</a>
<a href="/blog/nfc-tags-beginners-guide/" class="landing-cta-button">Novo nas tags NFC? Comece aqui</a>
</div>

</section>
