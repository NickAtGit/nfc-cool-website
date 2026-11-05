---
title: "Лічильник дотиків NFC: живе демо"
slug: "tap-counter"
description: "Живе демо лічильника дотиків NFC. Запиши адресу цієї сторінки на NFC-мітку через NFC.cool Tools, піднеси до неї телефон, і тут з'явиться власний лічильник зчитувань мітки разом з її ідентифікатором. Без жодного сервера."
image: "/assets/images/Blog/count-nfc-tag-scans.webp"
---

<section class="page-hero tap-counter-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Лічильник дотиків NFC

NFC-мітка вміє рахувати власні зчитування, і число живе в самому чипі, а не на сервері. Запиши мітку з посиланням на цю сторінку, піднеси до неї телефон, і в картці з'являться поточний лічильник та ідентифікатор мітки.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-tap-counter-uk&mt=8" class="landing-store-button is-apple" aria-label="Завантажити в App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Завантажити в App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-tap-counter-uk" class="landing-store-button is-google" aria-label="Завантажити в Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Завантажити в Google Play" width="173" height="52"/>
</a>
</div>

</div>

<div class="page-hero-visual">

<div id="tap-counter-demo" class="tap-demo">
<div class="tap-demo-card tap-demo-result">
<p class="tap-demo-label">Мітку зчитано</p>
<div class="tap-demo-count-row">
<p class="tap-demo-count" data-tap-count>0</p>
<p class="tap-demo-caption">зчитувань нарахувала мітка</p>
</div>
<div class="tap-demo-field tap-demo-id-row">
<p class="tap-demo-label">Ідентифікатор мітки</p>
<p class="tap-demo-value" data-tap-id></p>
</div>
</div>
<div class="tap-demo-card tap-demo-empty">
<p class="tap-demo-label">Живе демо</p>
<p class="tap-demo-text">Піднеси телефон до NFC-мітки, яка веде сюди, і в цій картці з'явиться її лічильник зчитувань.</p>
<div class="tap-demo-field">
<p class="tap-demo-label">Адреса для мітки</p>
<p class="tap-demo-value">https://nfc.cool/tap-counter/</p>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-section">

## Як це працює

<div class="page-cards-grid">

<article class="page-card">
<h3>Рахує сам чип</h3>
<p>Лічильник вбудований прямо в залізо чипів NTAG21x: саме з NTAG213, NTAG215 і NTAG216 зроблена більшість NFC-наліпок. Кожне зчитування додає одиницю, і ні застосунок, ні сервер до цього не причетні.</p>
</article>

<article class="page-card">
<h3>Число їде в адресі</h3>
<p>Записуючи мітку, NFC.cool Tools вставляє в адресу байти-заповнювачі. На кожному зчитуванні чип підставляє замість них поточні значення й дописує їх у вигляді <code>?nfc=</code>: спершу ідентифікатор мітки, потім лічильник.</p>
</article>

<article class="page-card">
<h3>Сторінка лише читає результат</h3>
<p>Ні сервера, ні бази даних. Сторінка розбирає значення <code>?nfc=</code> просто з власного рядка адреси й показує те, що передав чип. Порахувати чип устиг ще до того, як сторінка відкрилася.</p>
</article>

</div>

</section>

<section class="page-section">

## Що дає мітка, яка рахує сама себе

<div class="page-cards-grid">

<article class="page-card">
<h3>Розрізняти мітки</h3>
<p>Запиши одну й ту саму адресу на п'ятдесят наліпок, і за ідентифікатором усе одно видно, до якої саме з них піднесли телефон. Вести доводиться одне посилання, а розпізнаються всі п'ятдесят міток.</p>
</article>

<article class="page-card">
<h3>Обмежити безкоштовний доступ</h3>
<p>З кожним дотиком приходить і число, тож на нього легко зважати: першій сотні зчитувань віддай винагороду, а решту переадресуй деінде.</p>
</article>

<article class="page-card">
<h3>Міряти інтерес</h3>
<p>Наклей мітку на візитівку, плакат чи коробку з товаром, і лічильник тихо перетвориться на показник інтересу. Жодної аналітики для цього будувати не треба.</p>
</article>

<article class="page-card">
<h3>Підтвердити оригінальність</h3>
<p>Лічильник тільки зростає і назад не відмотується, тому підробити його важко. На обмежених серіях і в перевірках на контрафакт така властивість стає в пригоді.</p>
</article>

</div>

</section>

<section class="page-hero tap-cta">

## Хочеш розібратися глибше?

Про лічильник дотиків NFC є що розповісти: які чипи підходять, де він рятує в реальному житті і як налаштувати все крок за кроком.

<div class="tap-cta-buttons">
<a href="/uk/blog/count-nfc-tag-scans/" class="landing-cta-button">Читати посібник</a>
<a href="/uk/features/nfc-reader-writer/" class="landing-cta-button">Перейти до функції</a>
</div>

</section>
