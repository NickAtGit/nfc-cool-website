---
title: "Счётчик касаний NFC: живой пример"
slug: "tap-counter"
description: "Живой пример счётчика касаний NFC. Запиши адрес этой страницы на NFC-метку через NFC.cool Tools, поднеси метку и увидишь её собственное число сканирований и ID. Никакого сервера."
image: "/assets/images/Blog/count-nfc-tag-scans.webp"
---

<section class="page-hero tap-counter-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Счётчик касаний NFC

NFC-метка умеет считать свои сканирования сама: число живёт в чипе, а не на сервере. Запиши метку со ссылкой на эту страницу, поднеси её к телефону, и в карточке появятся текущий счёт и ID метки.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-tap-counter-ru&mt=8" class="landing-store-button is-apple" aria-label="Скачать в App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Скачать в App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-tap-counter-ru" class="landing-store-button is-google" aria-label="Скачать в Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Скачать в Google Play" width="173" height="52"/>
</a>
</div>

</div>

<div class="page-hero-visual">

<div id="tap-counter-demo" class="tap-demo">
<div class="tap-demo-card tap-demo-result">
<p class="tap-demo-label">Метка считана</p>
<div class="tap-demo-count-row">
<p class="tap-demo-count" data-tap-count>0</p>
<p class="tap-demo-caption">сканирований насчитала метка</p>
</div>
<div class="tap-demo-field tap-demo-id-row">
<p class="tap-demo-label">ID метки</p>
<p class="tap-demo-value" data-tap-id></p>
</div>
</div>
<div class="tap-demo-card tap-demo-empty">
<p class="tap-demo-label">Живой пример</p>
<p class="tap-demo-text">Поднеси NFC-метку, которая ведёт сюда, и её число сканирований появится в этой карточке.</p>
<div class="tap-demo-field">
<p class="tap-demo-label">Адрес для метки</p>
<p class="tap-demo-value">https://nfc.cool/tap-counter/</p>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-section">

## Как это работает

<div class="page-cards-grid">

<article class="page-card">
<h3>Счёт хранит сам чип</h3>
<p>У чипов NTAG21x, то есть NTAG213, NTAG215 и NTAG216 из большинства NFC-наклеек, счётчик встроен в железо. Каждое считывание увеличивает его на единицу, и ни приложение, ни сервер в этом не участвуют.</p>
</article>

<article class="page-card">
<h3>Ссылка его переносит</h3>
<p>При записи метки NFC.cool Tools вставляет байты-заглушки. При каждом сканировании чип подставляет вместо них живые значения и дописывает их как <code>?nfc=</code>: сначала ID метки, потом счёт.</p>
</article>

<article class="page-card">
<h3>Страница просто читает</h3>
<p>Ни бэкенда, ни базы данных. Страница разбирает значение <code>?nfc=</code> прямо из своей адресной строки и показывает то, что передал чип. Подсчёт к этому моменту уже произошёл.</p>
</article>

</div>

</section>

<section class="page-section">

## Что можно сделать с самосчитающей меткой

<div class="page-cards-grid">

<article class="page-card">
<h3>Различать метки</h3>
<p>Наклей одинаковую ссылку на пятьдесят стикеров, и ID метки всё равно покажет, какой именно поднесли. Одна ссылка в управлении, пятьдесят различимых меток.</p>
</article>

<article class="page-card">
<h3>Ограничивать бесплатный доступ</h3>
<p>Счёт приходит с каждым касанием, поэтому на него можно реагировать: первым ста сканированиям выдать награду, а остальных увести в другое место.</p>
</article>

<article class="page-card">
<h3>Мерить интерес</h3>
<p>Наклей метку на визитку, плакат или коробку с товаром, и счётчик станет тихой метрикой интереса, без всякой аналитической обвязки.</p>
</article>

<article class="page-card">
<h3>Подтверждать подлинность</h3>
<p>Счётчик умеет только расти и не отматывается назад, поэтому подделать его трудно. Пригодится для ограниченных серий и проверки на контрафакт.</p>
</article>

</div>

</section>

<section class="page-hero tap-cta">

## Хочешь всю историю целиком?

О счётчике касаний есть что рассказать: какие чипы подходят, где это применяют на практике и как всё настроить по шагам.

<div class="tap-cta-buttons">
<a href="/ru/blog/count-nfc-tag-scans/" class="landing-cta-button">Читать руководство</a>
<a href="/ru/features/nfc-reader-writer/" class="landing-cta-button">Посмотреть функцию</a>
</div>

</section>
