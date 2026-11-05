---
title: "NFC-считыватель онлайн"
slug: "online-nfc-reader"
description: "Считывай и записывай NFC-метки прямо в браузере, без приложения и регистрации. Поднеси метку и посмотри, что на ней, или запиши ссылку либо текст. Бесплатно, работает в Chrome на Android, а для iPhone есть бесплатное приложение NFC.cool."
image: "/assets/images/og-landing.webp"
---

<div style="display:none" aria-hidden="true"><svg><symbol id="nfc-icon-wave" viewBox="0 0 24 24"><path fill="currentColor" d="M8.77 12C8.77 10.18 8.14 8.48 7.02 7.15C6.29 6.29 5.22 7.27 5.77 7.97C6.84 9.32 7.25 10.44 7.25 12C7.25 13.55 6.84 14.67 5.77 16.02C5.23 16.72 6.3 17.69 7.02 16.83C8.14 15.51 8.77 13.82 8.77 12ZM13.56 12C13.56 9.22 12.69 6.61 11.12 4.5C10.41 3.56 9.18 4.47 9.84 5.33C11.28 7.22 12.05 9.53 12.05 12C12.05 14.46 11.28 16.77 9.84 18.66C9.18 19.53 10.41 20.44 11.12 19.48C12.69 17.37 13.56 14.77 13.56 12ZM18.38 12C18.38 8.26 17.21 4.78 15.14 1.89C14.5 1 13.2 1.78 13.89 2.71C15.83 5.37 16.86 8.58 16.86 12C16.86 15.42 15.82 18.62 13.89 21.28C13.22 22.2 14.47 23.02 15.14 22.1C17.21 19.21 18.38 15.73 18.38 12Z"/></symbol><symbol id="nfc-icon-android" viewBox="0 0 24 24" fill="none"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></symbol><symbol id="nfc-icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17.5 19 7"/></symbol><symbol id="nfc-icon-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></symbol></svg></div>

<script type="application/json" id="nfc-i18n">{
"rec.text": "Текст",
"rec.link": "Ссылка",
"rec.phone": "Телефон",
"rec.email": "Почта",
"rec.sms": "SMS",
"rec.location": "Координаты",
"rec.contact": "Контакт",
"rec.contactCard": "Карточка контакта",
"rec.wifi": "Wi-Fi",
"rec.wifiNetwork": "Сеть Wi-Fi",
"rec.smartPoster": "Smart Poster",
"rec.app": "Приложение",
"rec.empty": "Пусто",
"rec.emptyValue": "В этой записи нет данных.",
"rec.data": "Данные",
"rec.generic": "Запись",
"rec.undecodable": "(не удалось разобрать)",
"read.unavailable": "недоступно",
"read.noRecords": "Метка читается, но записей на ней нет.",
"unit.bytes": "байт",
"tech.records": "Записи",
"tech.total": "Всего данных",
"tech.record": "Запись",
"tech.type": "Тип",
"tech.media": "Тип содержимого",
"tech.id": "ID записи",
"tech.encoding": "Кодировка",
"tech.language": "Язык",
"tech.size": "Размер",
"tech.note1": "Браузер не видит модель чипа, объём памяти и состояние блокировки. ",
"tech.appLink": "Приложение NFC.cool",
"tech.note2": " читает всё это, а вдобавок и сырую память чипа.",
"summary.contact": "Контакт: ",
"summary.wifi": "Wi-Fi: ",
"valid.link": "Введи ссылку для записи на метку.",
"valid.linkInvalid": "Это не похоже на правильную ссылку.",
"valid.text": "Введи текст для записи на метку.",
"valid.phone": "Введи номер телефона.",
"valid.email": "Введи адрес почты.",
"valid.latlng": "Введи и широту, и долготу.",
"valid.latlngNum": "Широта и долгота должны быть числами.",
"valid.contact": "Введи имя для контакта.",
"valid.wifiSsid": "Введи имя сети Wi-Fi.",
"valid.wifiPass": "Введи пароль от Wi-Fi.",
"err.readingError": "Не получилось считать эту метку. Приложи её плашмя к верхней части телефона и попробуй ещё раз.",
"err.blocked": "Доступ к NFC заблокирован. Разреши NFC для этого сайта и попробуй ещё раз.",
"err.notSupported": "Этот телефон не может обратиться к чипу NFC. Проверь в настройках Android, включён ли NFC.",
"err.notReadable": "Android не смог включить NFC. Убедись, что NFC включён, и попробуй ещё раз.",
"err.write": "Не удалось записать метку. Возможно, она заблокирована, слишком мала или её убрали слишком рано.",
"err.read": "Сканирование внезапно прервалось. Поднеси метку к телефону и попробуй ещё раз."
}</script>

<section class="page-hero nfc-reader-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# NFC-считыватель онлайн

Я сделал это, чтобы NFC-метку можно было считать прямо из браузера, без приложения и регистрации. Нажми *«Считать NFC»*, поднеси телефон к метке, и содержимое появится сразу. На вкладке *«Запись»* можно записать на метку ссылку или текст. Всё работает на твоём телефоне, и ничего из считанного его не покидает.

<div class="nfc-hero-reqs"><span class="platform-pill is-android"><svg class="platform-pill-icon" viewBox="2 2 20 20" fill="none" aria-hidden="true"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></svg><span class="platform-pill-label">Chrome на Android</span></span></div>

</div>

<div class="page-hero-visual">

<div id="nfc-reader-app" class="nfc-reader" data-state="desktop" data-mode="read" data-write-type="url">
<div class="nfc-phone">
<div class="nfc-phone-screen">
<div class="nfc-reader-tabs" role="tablist" aria-label="Режим считывателя">
<button type="button" class="nfc-reader-tab" data-nfc-tab="read" role="tab" aria-selected="true">Чтение</button>
<button type="button" class="nfc-reader-tab" data-nfc-tab="write" role="tab" aria-selected="false">Запись</button>
</div>
<div class="nfc-reader-body">
<div class="nfc-reader-panel" data-panel="read-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">Считать NFC-метку</p>
<p class="nfc-reader-lead">Нажми кнопку и поднеси метку к верхней части телефона. Я покажу, что на ней записано.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-scan><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Read NFC</span></button>
<p class="nfc-reader-fineprint">Хочешь нативный NFC и больше функций? <a href="/ru/features/nfc-reader-writer/">Скачай приложение NFC.cool!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="scanning">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">Чтение NFC</p>
<p class="nfc-reader-lead">Держи NFC-метку у верхней части задней панели телефона.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Отмена</span></button>
</div>
<div class="nfc-reader-panel" data-panel="result">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Метка считана</span>
<ul class="nfc-reader-records" data-nfc-records></ul>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Серийный номер</span><span class="nfc-reader-value" data-nfc-serial></span></div>
<details class="nfc-reader-details"><summary>Технические подробности</summary><div class="nfc-reader-tech" data-nfc-tech></div></details>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Read NFC</span></button>
</div>
<div class="nfc-reader-panel" data-panel="write-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">Записать NFC-метку</p>
<select class="nfc-reader-select" data-nfc-type-select aria-label="Что записать на метку">
<optgroup label="Основное">
<option value="link">Ссылка</option>
<option value="text">Текст</option>
</optgroup>
<optgroup label="Контакт">
<option value="phone">Номер телефона</option>
<option value="email">Почта</option>
<option value="sms">Сообщение SMS</option>
<option value="contact">Карточка контакта</option>
</optgroup>
<optgroup label="Сеть">
<option value="wifi">Сеть Wi-Fi</option>
<option value="location">Координаты</option>
</optgroup>
</select>
<div class="nfc-reader-form" data-nfc-form>
<div class="nfc-reader-fields" data-nfc-fields="link">
<input type="url" class="nfc-reader-input" data-k="url" placeholder="https://example.com" aria-label="Ссылка для записи"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="text" hidden>
<textarea class="nfc-reader-input nfc-reader-textarea" data-k="text" rows="3" placeholder="Текст" aria-label="Текст для записи"></textarea>
</div>
<div class="nfc-reader-fields" data-nfc-fields="phone" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Номер телефона" aria-label="Номер телефона"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="email" hidden>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="Адрес почты" aria-label="Адрес почты"/>
<input type="text" class="nfc-reader-input" data-k="subject" placeholder="Тема (необязательно)" aria-label="Тема письма, необязательно"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="sms" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Номер телефона" aria-label="Номер телефона для SMS"/>
<input type="text" class="nfc-reader-input" data-k="body" placeholder="Сообщение (необязательно)" aria-label="Текст SMS, необязательно"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="location" hidden>
<input type="text" class="nfc-reader-input" data-k="lat" inputmode="decimal" placeholder="Широта" aria-label="Широта"/>
<input type="text" class="nfc-reader-input" data-k="lng" inputmode="decimal" placeholder="Долгота" aria-label="Долгота"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="contact" hidden>
<input type="text" class="nfc-reader-input" data-k="name" placeholder="Имя и фамилия" aria-label="Имя контакта"/>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Телефон (необязательно)" aria-label="Телефон контакта, необязательно"/>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="Почта (необязательно)" aria-label="Почта контакта, необязательно"/>
<input type="text" class="nfc-reader-input" data-k="org" placeholder="Организация (необязательно)" aria-label="Организация контакта, необязательно"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="wifi" hidden>
<input type="text" class="nfc-reader-input" data-k="ssid" placeholder="Имя сети (SSID)" aria-label="Имя сети Wi-Fi"/>
<input type="text" class="nfc-reader-input" data-k="password" placeholder="Пароль" aria-label="Пароль от Wi-Fi"/>
<select class="nfc-reader-select" data-k="security" aria-label="Защита Wi-Fi">
<option value="wpa">WPA / WPA2</option>
<option value="wep">WEP</option>
<option value="open">Открытая (без пароля)</option>
</select>
</div>
</div>
<p class="nfc-reader-input-error" data-nfc-input-error></p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Записать на метку</span></button>
<p class="nfc-reader-fineprint">Хочешь нативный NFC и больше функций? <a href="/ru/features/nfc-reader-writer/">Скачай приложение NFC.cool!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="writing">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">Запись NFC</p>
<p class="nfc-reader-lead">Держи NFC-метку у верхней части задней панели телефона.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Отмена</span></button>
</div>
<div class="nfc-reader-panel" data-panel="written">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Метка записана</span>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Записано на метку</span><span class="nfc-reader-value" data-nfc-written></span></div>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Записать ещё одну метку</span></button>
</div>
<div class="nfc-reader-panel" data-panel="error">
<span class="nfc-reader-badge is-error">Что-то пошло не так</span>
<p class="nfc-reader-lead" data-nfc-error-msg>Что-то пошло не так.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-retry><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Попробовать ещё раз</span></button>
</div>
<div class="nfc-reader-panel" data-panel="ios">
<span class="nfc-reader-badge is-muted">iPhone</span>
<p class="nfc-reader-title">В браузере на iPhone NFC недоступен</p>
<p class="nfc-reader-lead">Apple не пускает браузеры к чипу NFC. Чтобы читать и записывать метки на iPhone, я сделал бесплатное приложение NFC.cool.</p>
<div class="landing-store-buttons"><a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-ru&mt=8" class="landing-store-button is-apple" aria-label="Скачать в App Store" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/AppStore.svg" alt="Скачать NFC.cool в App Store" width="156" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="android-other">
<span class="nfc-reader-badge is-muted">Открой в Chrome</span>
<p class="nfc-reader-title">Чтобы считывать здесь, перейди в Chrome</p>
<p class="nfc-reader-lead">У тебя Android, поэтому чтение и запись в браузере работают, нужен только Chrome. Открой эту страницу в Chrome, и считыватель включится.</p>
<div class="landing-store-buttons"><a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-ru" class="landing-store-button is-google" aria-label="Скачать в Google Play" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/GooglePlay.svg" alt="Скачать NFC.cool в Google Play" width="173" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="desktop">
<span class="nfc-reader-badge is-muted">Только Android и Chrome</span>
<img class="nfc-reader-qr" src="/assets/images/nfc-reader-qr.svg" alt="QR-код, который открывает эту страницу на телефоне" width="188" height="188"/>
<p class="nfc-reader-lead">Отсканируй его телефоном на Android, чтобы открыть считыватель там. Для NFC в браузере нужен Chrome на Android.</p>
<p class="nfc-reader-fineprint">У тебя iPhone? <a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ru&mt=8" target="_blank" rel="noopener nofollow sponsored">Поставь приложение NFC.cool</a>.</p>
</div>
</div>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## Скачай NFC.cool&nbsp;бесплатно

Полноценное приложение читает и записывает любую NFC-метку на iPhone и Android.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-hero-ios-ru&mt=8" class="landing-store-button is-apple" aria-label="Скачать в App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Скачать NFC.cool в App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-hero-android-ru" class="landing-store-button is-google" aria-label="Скачать в Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Скачать NFC.cool в Google Play" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## Как это работает

<div class="page-cards-grid">

<article class="page-card nfc-step">
<span class="landing-feature-num">01</span>
<h3>Открой на телефоне с Android</h3>
<p>Открой эту страницу в Chrome на телефоне с Android. В Chrome есть Web NFC, технология, которая позволяет сайту обращаться к чипу NFC в телефоне. На ней целиком и держится эта страница.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">02</span>
<h3>Выбери чтение или запись</h3>
<p>Чтение показывает всё, что хранится на метке. Запись кладёт на неё ссылку или короткий текст. В первый раз я запрашиваю у Chrome доступ к NFC, и браузер запоминает твой ответ.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">03</span>
<h3>Поднеси метку к телефону</h3>
<p>Приложи метку к верхней части телефона. Я разбираю или записываю её прямо на твоём устройстве: я этого не вижу, никуда ничего не отправляется и нигде не сохраняется.</p>
</article>

</div>

</section>

<section class="page-section">

## Что можно прочитать с NFC-метки

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 14.5 14.5 9.5"/><path d="M11 6.5 12.4 5a3.8 3.8 0 0 1 5.4 5.4l-1.5 1.5"/><path d="M13 17.5 11.6 19a3.8 3.8 0 0 1-5.4-5.4l1.5-1.5"/></svg></span>
<h3>Ссылки и адреса</h3>
<p>Самое частое содержимое метки: веб-адрес, который открывает страницу, профиль или меню. Я показываю ссылку целиком, чтобы до нажатия было видно, куда именно она ведёт.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 7h14"/><path d="M5 12h14"/><path d="M5 17h9"/></svg></span>
<h3>Обычный текст</h3>
<p>Заметки, инструкции, идентификаторы и любые короткие сообщения в текстовой записи. Я считываю текст и его язык прямо с чипа.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4 4 8l8 4 8-4-8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/></svg></span>
<h3>Другие записи</h3>
<p>Данные Wi-Fi, карточки контактов и данные конкретных приложений приходят как записи с типом. Ещё виден уникальный серийный номер метки, и он одинаков при каждом считывании.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Пустые и заблокированные метки</h3>
<p>Чистая метка читается нормально, просто без записей: удобно проверить новую метку перед записью. Заблокированные метки всё равно сообщают свой тип и серийный номер.</p>
</article>

</div>

</section>

<section class="page-section">

## Хочешь больше, чем чтение и запись?

Считыватель на этой странице закрывает повседневные задачи: прочитать метку и записать на неё обычные данные. Большинству этого хватает, да и Web NFC в браузере примерно здесь и заканчивается: простые записи NDEF и только Chrome на Android. **Приложение NFC.cool** умеет всё то же самое, а дальше идёт туда, куда браузеру хода нет:

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Блокировка, форматирование и защита</h3>
<p>Заблокируй метку, чтобы её содержимое больше не менялось, очисти её до чистого состояния или закрой паролем, чтобы переписать её могли только твои устройства.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg></span>
<h3>Шифрование секретов в NFC Safe</h3>
<p>NFC Safe шифрует секрет прямо на чипе алгоритмом AES-256, поэтому для всего, кроме приложения, метка выглядит набором мусора. <a href="/ru/blog/nfc-safe-encrypted-secrets/">Как устроен NFC Safe</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"/></svg></span>
<h3>Автоматизация касания</h3>
<p>Метка может отправить вебхук, запустить быструю команду iOS, зачитать содержимое вслух или посчитать, как часто её считывают. <a href="/ru/blog/count-nfc-tag-scans/">Как считать сканирования NFC-метки</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"/></svg></span>
<h3>Копирование, сброс и разбор меток</h3>
<p>Скопируй метку, выгрузи и определи сырую память её чипа или перепрограммируй технику, завязанную на NFC: <a href="/ru/blog/openprinttag-read-write-nfc-spools-phone/">катушки с филаментом для 3D-принтера</a> и <a href="/ru/blog/reset-sonicare-brush-head-nfc/">насадки электрических зубных щёток</a>.</p>
</article>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## На iPhone для NFC нужно приложение

Apple закрывает NFC во всех браузерах на iOS, поэтому ни один сайт не может читать и записывать метки на iPhone или iPad. Приложение NFC.cool делает это нативно, ничуть не хуже, чем на Android.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-ru&mt=8" class="landing-store-button is-apple" aria-label="Скачать в App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Скачать NFC.cool в App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-ru" class="landing-store-button is-google" aria-label="Скачать в Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Скачать NFC.cool в Google Play" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section landing-faq">

<div class="landing-container">

<h2 class="landing-section-title">Частые вопросы про NFC-считыватель онлайн</h2>

<details class="faq-item">
<summary>Можно ли читать и записывать NFC-метки без приложения?</summary>
<p>Да, на телефоне с Android в Chrome. Страница использует встроенный в браузер Web NFC, поэтому ставить ничего не надо: нажми «Считать NFC», чтобы прочитать метку, или перейди на вкладку «Запись», чтобы записать ссылку, текст, контакт, сеть Wi-Fi и не только.</p>
</details>

<details class="faq-item">
<summary>Можно ли записать на метку сеть Wi-Fi или карточку контакта?</summary>
<p>Да. Выбери в списке на вкладке записи «Сеть Wi-Fi» или «Карточка контакта» и заполни поля. Метка с Wi-Fi предложит телефону на Android подключиться к сети, а метка с контактом хранит обычный vCard, который телефон на Android предложит сохранить. Нужна визитка, которую можно обновлять после записи? <a href="/ru/business-card/">NFC.cool Business Card</a> записывает на метку ссылку, так что данные можно будет поменять позже.</p>
</details>

<details class="faq-item">
<summary>Работает ли это на iPhone?</summary>
<p>Нет. Apple закрывает NFC во всех браузерах на iOS, поэтому ни один сайт не может читать и записывать метки на iPhone или iPad. На iPhone это делает бесплатное приложение NFC.cool.</p>
</details>

<details class="faq-item">
<summary>Какие браузеры поддерживаются?</summary>
<p>Web NFC работает только в Chrome и других браузерах на Chromium под Android. Настольные браузеры и браузеры на iOS его не поддерживают, и если твой не умеет, страница подскажет, что делать.</p>
</details>

<details class="faq-item">
<summary>NFC-считыватель онлайн бесплатный?</summary>
<p>Полностью бесплатный: без регистрации и без ограничения на число сканирований. Метки читаются и записываются на твоём устройстве, и никуда ничего не отправляется.</p>
</details>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## Читай и записывай NFC-метки где угодно

Эта страница закрывает основы прямо в браузере. Бесплатное приложение NFC.cool идёт дальше: читает любую метку и записывает больше 25 типов данных, от ссылок и Wi-Fi до контактов и быстрых команд, и на iPhone, и на Android. Я делаю и поддерживаю его сам.

<div class="tap-cta-buttons">
<a href="/ru/features/nfc-reader-writer/" class="landing-cta-button">Посмотреть чтение и запись NFC</a>
<a href="/ru/blog/nfc-tags-beginners-guide/" class="landing-cta-button">Впервые про NFC-метки? Начни отсюда</a>
</div>

</section>
