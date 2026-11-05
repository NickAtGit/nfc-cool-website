---
title: "NFC-зчитувач онлайн"
slug: "online-nfc-reader"
description: "Зчитуй і записуй NFC-мітки прямо в браузері, без застосунку і без реєстрації. Піднеси мітку, щоб побачити її вміст, або запиши на неї посилання чи текст. Безкоштовно, працює в Chrome на Android; для iPhone є безкоштовний застосунок NFC.cool."
image: "/assets/images/og-landing.webp"
---

<div style="display:none" aria-hidden="true"><svg><symbol id="nfc-icon-wave" viewBox="0 0 24 24"><path fill="currentColor" d="M8.77 12C8.77 10.18 8.14 8.48 7.02 7.15C6.29 6.29 5.22 7.27 5.77 7.97C6.84 9.32 7.25 10.44 7.25 12C7.25 13.55 6.84 14.67 5.77 16.02C5.23 16.72 6.3 17.69 7.02 16.83C8.14 15.51 8.77 13.82 8.77 12ZM13.56 12C13.56 9.22 12.69 6.61 11.12 4.5C10.41 3.56 9.18 4.47 9.84 5.33C11.28 7.22 12.05 9.53 12.05 12C12.05 14.46 11.28 16.77 9.84 18.66C9.18 19.53 10.41 20.44 11.12 19.48C12.69 17.37 13.56 14.77 13.56 12ZM18.38 12C18.38 8.26 17.21 4.78 15.14 1.89C14.5 1 13.2 1.78 13.89 2.71C15.83 5.37 16.86 8.58 16.86 12C16.86 15.42 15.82 18.62 13.89 21.28C13.22 22.2 14.47 23.02 15.14 22.1C17.21 19.21 18.38 15.73 18.38 12Z"/></symbol><symbol id="nfc-icon-android" viewBox="0 0 24 24" fill="none"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></symbol><symbol id="nfc-icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17.5 19 7"/></symbol><symbol id="nfc-icon-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></symbol></svg></div>

<section class="page-hero nfc-reader-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# NFC-зчитувач онлайн

Я зробив цю сторінку, щоб NFC-мітку можна було зчитати просто з браузера, без застосунку і без реєстрації. Натисни *Зчитати NFC*, піднеси телефон до мітки, і вміст з'явиться одразу. На вкладці *Запис* на мітку так само лягає посилання або текст. Усе відбувається на самому телефоні, і нічого зі зчитаного нікуди не йде.

<div class="nfc-hero-reqs"><span class="platform-pill is-android"><svg class="platform-pill-icon" viewBox="2 2 20 20" fill="none" aria-hidden="true"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></svg><span class="platform-pill-label">Chrome на Android</span></span></div>

</div>

<div class="page-hero-visual">

<div id="nfc-reader-app" class="nfc-reader" data-state="desktop" data-mode="read" data-write-type="url">
<div class="nfc-phone">
<div class="nfc-phone-screen">
<div class="nfc-reader-tabs" role="tablist" aria-label="Режим зчитувача">
<button type="button" class="nfc-reader-tab" data-nfc-tab="read" role="tab" aria-selected="true">Читання</button>
<button type="button" class="nfc-reader-tab" data-nfc-tab="write" role="tab" aria-selected="false">Запис</button>
</div>
<div class="nfc-reader-body">
<div class="nfc-reader-panel" data-panel="read-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">Зчитати NFC-мітку</p>
<p class="nfc-reader-lead">Натисни кнопку і піднеси мітку до верхнього краю телефона. Я покажу, що на ній записано.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-scan><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Зчитати NFC</span></button>
<p class="nfc-reader-fineprint">Хочеться нативного NFC і ширших можливостей? <a href="/uk/features/nfc-reader-writer/">Завантаж застосунок NFC.cool!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="scanning">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">Зчитування NFC</p>
<p class="nfc-reader-lead">Тримай NFC-мітку біля верхньої частини задньої панелі телефона.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Скасувати</span></button>
</div>
<div class="nfc-reader-panel" data-panel="result">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Мітку зчитано</span>
<ul class="nfc-reader-records" data-nfc-records></ul>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Серійний номер</span><span class="nfc-reader-value" data-nfc-serial></span></div>
<details class="nfc-reader-details"><summary>Технічні подробиці</summary><div class="nfc-reader-tech" data-nfc-tech></div></details>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Зчитати NFC</span></button>
</div>
<div class="nfc-reader-panel" data-panel="write-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">Записати NFC-мітку</p>
<select class="nfc-reader-select" data-nfc-type-select aria-label="Що записати на мітку">
<optgroup label="Основне">
<option value="link">Посилання</option>
<option value="text">Текст</option>
</optgroup>
<optgroup label="Контакт">
<option value="phone">Номер телефону</option>
<option value="email">Електронна пошта</option>
<option value="sms">Повідомлення SMS</option>
<option value="contact">Контактна картка</option>
</optgroup>
<optgroup label="Мережа">
<option value="wifi">Мережа Wi-Fi</option>
<option value="location">Координати</option>
</optgroup>
</select>
<div class="nfc-reader-form" data-nfc-form>
<div class="nfc-reader-fields" data-nfc-fields="link">
<input type="url" class="nfc-reader-input" data-k="url" placeholder="https://example.com" aria-label="Посилання для запису"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="text" hidden>
<textarea class="nfc-reader-input nfc-reader-textarea" data-k="text" rows="3" placeholder="Текст" aria-label="Текст для запису"></textarea>
</div>
<div class="nfc-reader-fields" data-nfc-fields="phone" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Номер телефону" aria-label="Номер телефону"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="email" hidden>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="Адреса пошти" aria-label="Адреса пошти"/>
<input type="text" class="nfc-reader-input" data-k="subject" placeholder="Тема (необов'язково)" aria-label="Тема листа, необов'язково"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="sms" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Номер телефону" aria-label="Номер телефону для SMS"/>
<input type="text" class="nfc-reader-input" data-k="body" placeholder="Повідомлення (необов'язково)" aria-label="Текст SMS, необов'язково"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="location" hidden>
<input type="text" class="nfc-reader-input" data-k="lat" inputmode="decimal" placeholder="Широта" aria-label="Широта"/>
<input type="text" class="nfc-reader-input" data-k="lng" inputmode="decimal" placeholder="Довгота" aria-label="Довгота"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="contact" hidden>
<input type="text" class="nfc-reader-input" data-k="name" placeholder="Ім'я та прізвище" aria-label="Ім'я контакту"/>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Телефон (необов'язково)" aria-label="Телефон контакту, необов'язково"/>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="Пошта (необов'язково)" aria-label="Пошта контакту, необов'язково"/>
<input type="text" class="nfc-reader-input" data-k="org" placeholder="Організація (необов'язково)" aria-label="Організація контакту, необов'язково"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="wifi" hidden>
<input type="text" class="nfc-reader-input" data-k="ssid" placeholder="Назва мережі (SSID)" aria-label="Назва мережі Wi-Fi"/>
<input type="text" class="nfc-reader-input" data-k="password" placeholder="Пароль" aria-label="Пароль до Wi-Fi"/>
<select class="nfc-reader-select" data-k="security" aria-label="Захист Wi-Fi">
<option value="wpa">WPA / WPA2</option>
<option value="wep">WEP</option>
<option value="open">Відкрита (без пароля)</option>
</select>
</div>
</div>
<p class="nfc-reader-input-error" data-nfc-input-error></p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Записати на мітку</span></button>
<p class="nfc-reader-fineprint">Хочеться нативного NFC і ширших можливостей? <a href="/uk/features/nfc-reader-writer/">Завантаж застосунок NFC.cool!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="writing">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">Запис NFC</p>
<p class="nfc-reader-lead">Тримай NFC-мітку біля верхньої частини задньої панелі телефона.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Скасувати</span></button>
</div>
<div class="nfc-reader-panel" data-panel="written">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Мітку записано</span>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Записано на мітку</span><span class="nfc-reader-value" data-nfc-written></span></div>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Записати ще одну мітку</span></button>
</div>
<div class="nfc-reader-panel" data-panel="error">
<span class="nfc-reader-badge is-error">Щось пішло не так</span>
<p class="nfc-reader-lead" data-nfc-error-msg>Щось пішло не так.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-retry><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Спробувати ще раз</span></button>
</div>
<div class="nfc-reader-panel" data-panel="ios">
<span class="nfc-reader-badge is-muted">iPhone</span>
<p class="nfc-reader-title">У браузері на iPhone NFC недоступний</p>
<p class="nfc-reader-lead">Apple не пускає до NFC-модуля жоден браузер. Тому для читання й запису міток на iPhone я зробив безкоштовний застосунок NFC.cool.</p>
<div class="landing-store-buttons"><a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-uk&mt=8" class="landing-store-button is-apple" aria-label="Завантажити в App Store" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/AppStore.svg" alt="Завантажити NFC.cool в App Store" width="156" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="android-other">
<span class="nfc-reader-badge is-muted">Відкрий у Chrome</span>
<p class="nfc-reader-title">Щоб зчитувати тут, перейди в Chrome</p>
<p class="nfc-reader-lead">У тебе Android, тож читання і запис просто в браузері працюють, бракує лише Chrome. Відкрий цю сторінку в Chrome, і зчитувач увімкнеться.</p>
<div class="landing-store-buttons"><a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-uk" class="landing-store-button is-google" aria-label="Завантажити в Google Play" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/GooglePlay.svg" alt="Завантажити NFC.cool у Google Play" width="173" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="desktop">
<span class="nfc-reader-badge is-muted">Лише Android і Chrome</span>
<img class="nfc-reader-qr" src="/assets/images/nfc-reader-qr.svg" alt="QR-код, який відкриває цю сторінку на телефоні" width="188" height="188"/>
<p class="nfc-reader-lead">Відскануй цей QR-код телефоном з Android, щоб відкрити зчитувач там. NFC у браузері потребує Chrome на Android.</p>
<p class="nfc-reader-fineprint">У тебе iPhone? <a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-uk&mt=8" target="_blank" rel="noopener nofollow sponsored">Завантаж застосунок NFC.cool</a>.</p>
</div>
</div>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## Завантаж NFC.cool&nbsp;безкоштовно

Повний застосунок зчитує і записує будь-яку NFC-мітку на iPhone та Android.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-hero-ios-uk&mt=8" class="landing-store-button is-apple" aria-label="Завантажити в App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Завантажити NFC.cool в App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-hero-android-uk" class="landing-store-button is-google" aria-label="Завантажити в Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Завантажити NFC.cool у Google Play" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## Як це працює

<div class="page-cards-grid">

<article class="page-card nfc-step">
<span class="landing-feature-num">01</span>
<h3>Відкрий на телефоні з Android</h3>
<p>Відкрий цю сторінку в Chrome на телефоні з Android. У Chrome є Web NFC: технологія, завдяки якій сайт звертається до NFC-модуля в телефоні. На ній тримається вся ця сторінка.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">02</span>
<h3>Вибери читання або запис</h3>
<p>Читання показує все, що зберігається на мітці. Запис кладе на неї посилання або короткий текст. Першого разу Chrome запитає дозвіл на NFC і запам'ятає відповідь.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">03</span>
<h3>Піднеси мітку до телефона</h3>
<p>Торкнися міткою верхнього краю телефона. Розбір і запис відбуваються просто на пристрої: я нічого не бачу, нічого не вивантажується і ніде не осідає.</p>
</article>

</div>

</section>

<section class="page-section">

## Що зчитується з NFC-мітки

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 14.5 14.5 9.5"/><path d="M11 6.5 12.4 5a3.8 3.8 0 0 1 5.4 5.4l-1.5 1.5"/><path d="M13 17.5 11.6 19a3.8 3.8 0 0 1-5.4-5.4l1.5-1.5"/></svg></span>
<h3>Посилання й адреси</h3>
<p>Найчастіший вміст мітки: вебадреса, яка відкриває сторінку, профіль або меню. Посилання показується повністю, тож видно, куди воно веде, ще до переходу.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 7h14"/><path d="M5 12h14"/><path d="M5 17h9"/></svg></span>
<h3>Звичайний текст</h3>
<p>Нотатки, інструкції, ідентифікатори чи будь-яке коротке повідомлення в текстовому записі. Сам текст і його мову я розбираю прямо з чипа.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4 4 8l8 4 8-4-8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/></svg></span>
<h3>Інші записи</h3>
<p>Дані Wi-Fi, контактні картки та власні формати застосунків приходять як типізовані записи. Поруч видно унікальний серійний номер мітки, який не змінюється від зчитування до зчитування.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Порожні та заблоковані мітки</h3>
<p>Чиста мітка зчитується без жодного запису, і так зручно перевірити нову мітку перед записом. Заблокована все одно назве свій тип і серійний номер.</p>
</article>

</div>

</section>

<section class="page-section">

## Потрібно більше, ніж читання і запис?

Зчитувач на цій сторінці закриває щоденні завдання: зчитати мітку і записати на неї звичні дані. Більшості цього вистачає, та й браузерний Web NFC API десь тут і закінчується, бо вміє тільки прості записи NDEF і тільки в Chrome на Android. **Застосунок NFC.cool** робить усе те саме, а далі йде туди, куди браузер не дістає:

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Блокування, форматування і захист міток</h3>
<p>Заблокуй мітку, щоб її вміст більше не змінювався, зітри її до чистого стану або постав пароль, щоб перезаписати могли лише твої пристрої.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg></span>
<h3>Шифрування секретів у NFC Safe</h3>
<p>NFC Safe шифрує секрет просто на чипі за AES-256, тож для всього, крім застосунку, мітка виглядає як набір випадкових байтів. <a href="/uk/blog/nfc-safe-encrypted-secrets/">Як влаштований NFC Safe</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"/></svg></span>
<h3>Автоматизація одного дотику</h3>
<p>Мітка вміє надіслати вебхук, запустити Швидку команду iOS, озвучити свій вміст або порахувати, скільки разів її зчитали. <a href="/uk/blog/count-nfc-tag-scans/">Як рахувати дотики до NFC-мітки</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"/></svg></span>
<h3>Копіювання, скидання і розбір міток</h3>
<p>Скопіюй мітку, вивантаж і розпізнай сиру пам'ять чипа або перепрограмуй техніку, закриту через NFC: <a href="/uk/blog/openprinttag-read-write-nfc-spools-phone/">котушки з філаментом для 3D-принтера</a> та <a href="/uk/blog/reset-sonicare-brush-head-nfc/">насадки електричних зубних щіток</a>.</p>
</article>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## На iPhone без застосунку не обійтися

Apple закриває NFC для всіх браузерів на iOS, тому жоден сайт не зчитає і не запише мітку на iPhone чи iPad. Застосунок NFC.cool робить це нативно й не гірше, ніж на Android.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-uk&mt=8" class="landing-store-button is-apple" aria-label="Завантажити в App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Завантажити NFC.cool в App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-uk" class="landing-store-button is-google" aria-label="Завантажити в Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Завантажити NFC.cool у Google Play" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section landing-faq">

<div class="landing-container">

<h2 class="landing-section-title">Часті питання про NFC-зчитувач онлайн</h2>

<details class="faq-item">
<summary>Чи можна читати і записувати NFC-мітки без застосунку?</summary>
<p>Так, на телефоні з Android у Chrome. Сторінка спирається на вбудований у браузер Web NFC, тож установлювати нічого не треба: натисни «Зчитати NFC», щоб зчитати мітку, а на вкладці запису поклади на неї посилання, текст, контакт, мережу Wi-Fi та інше.</p>
</details>

<details class="faq-item">
<summary>Чи можна записати на мітку мережу Wi-Fi або контактну картку?</summary>
<p>Так. У списку на вкладці запису вибери «Мережа Wi-Fi» або «Контактна картка» і заповни поля. Мітка з мережею пропонує телефонам на Android приєднатися до неї, а мітка з контактом несе звичайну vCard, яку телефони на Android пропонують зберегти. Хочеш картку, яку можна оновлювати й після запису? <a href="/uk/business-card/">NFC.cool Business Card</a> записує на мітку посилання, тож дані можна правити пізніше.</p>
</details>

<details class="faq-item">
<summary>Чи працює це на iPhone?</summary>
<p>Ні. Apple закриває NFC для всіх браузерів на iOS, тому жоден сайт не зчитає і не запише мітку на iPhone чи iPad. На iPhone цю роботу бере на себе безкоштовний застосунок NFC.cool.</p>
</details>

<details class="faq-item">
<summary>Які браузери підтримуються?</summary>
<p>Web NFC працює тільки в Chrome та інших браузерах на Chromium під Android. Настільні браузери й браузери на iOS його не підтримують, і в такому разі сторінка підкаже, що робити далі.</p>
</details>

<details class="faq-item">
<summary>Чи безкоштовний NFC-зчитувач онлайн?</summary>
<p>Повністю безкоштовний, без реєстрації та без обмеження на кількість зчитувань. Мітку зчитує і записує сам пристрій, і нічого нікуди не вивантажується.</p>
</details>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## Читай і записуй NFC-мітки будь-де

Ця сторінка закриває основне просто в браузері. Безкоштовний застосунок NFC.cool іде далі: зчитує будь-яку мітку і записує понад 25 типів даних, серед них посилання, Wi-Fi, контакти та Швидкі команди, і на iPhone, і на Android. Я роблю й підтримую його сам.

<div class="tap-cta-buttons">
<a href="/uk/features/nfc-reader-writer/" class="landing-cta-button">Більше про читання і запис NFC</a>
<a href="/uk/blog/nfc-tags-beginners-guide/" class="landing-cta-button">Уперше маєш справу з мітками? Почни звідси</a>
</div>

</section>
