---
title: "NFC.cool x-callback-url"
slug: "x-callback-url"
description: "Інші застосунки й вебсторінки можуть попросити NFC.cool на iPhone виконати дію та повернути результат за угодою x-callback-url."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# NFC.cool x-callback-url

Інші застосунки й вебсторінки можуть попросити NFC.cool на iPhone виконати дію та повернути результат за угодою [x-callback-url](https://x-callback-url.com).

Вебхуки, Швидкі команди та URL-схеми описано на [сторінці для розробників](/uk/developers/).

<a href="#read-uid" class="landing-cta-button">Відкрити документацію</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/nfc-scan-tag.webp" alt="iPhone зчитує NFC-мітку" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section" id="read-uid">

## Зчитування ID мітки із застосунку чи вебсторінки

Посилання просить NFC.cool зчитати одну мітку й повернути її UID, а з `ndef=1` ще й повідомлення NDEF з мітки. Воно працює з будь-якої вебсторінки чи застосунку на iPhone, і нічого налаштовувати не треба: досить установити NFC.cool. Посилання побудоване за домовленістю [x-callback-url](https://x-callback-url.com). Зчитування міток для інших застосунків і сайтів входить до NFC.cool Business, ліцензії для компаній на NFC.cool для iPhone: [напиши нам](mailto:info@nfc.cool?subject=NFC.cool%20Business), щоб її отримати.

```
https://nfc.cool/x-callback-url/read-uid?<parameters>
nfcforiphone://x-callback-url/read-uid?<parameters>
```

Обидві форми роблять те саме. Краще бери `https`: на iPhone без NFC.cool вона відкриває сторінку з поясненням, як його встановити, а не мовчки нічого не робить. Розмісти її в посиланні, яке людина натискає сама: iOS не відкриває застосунки за посиланнями, якими скрипт переходить без участі людини.

NFC.cool виходить на передній план, показує, кому піде ID мітки, і запускає зчитування. Якщо посилання read-uid уже відкрите, нове посилання його перехоплює, а той, хто викликав попереднє, отримує `cancelled`.

### Параметри

<div class="page-cards-grid">

<article class="page-card">
<h3><code>x-get</code></h3>
<p>NFC.cool у фоні викликає цю адресу й передає результат у параметрах запиту. Сюди одразу приходить кожен результат, зокрема збої та скасування.</p>
<p><strong>Обов'язковий:</strong> <code>x-get</code>, <code>x-post</code> або <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-post</code></h3>
<p>NFC.cool надсилає сюди результат у JSON методом POST.</p>
<p><strong>Обов'язковий:</strong> <code>x-get</code>, <code>x-post</code> або <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-success</code></h3>
<p>Відкривається після успішного зчитування, до нього додаються <code>uid</code>, <code>ndef</code> і <code>state</code>. Разом із <code>x-get</code> чи <code>x-post</code> отримує лише <code>state</code>: UID іде на сервер, який показали людині, і більше нікуди.</p>
<p><strong>Обов'язковий:</strong> <code>x-get</code>, <code>x-post</code> або <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-error</code></h3>
<p>Відкривається, коли людина закриває NFC.cool після збою, з <code>errorCode</code>, <code>errorMessage</code> і <code>state</code>.</p>
<p><strong>Обов'язковий:</strong> ні</p>
</article>

<article class="page-card">
<h3><code>x-cancel</code></h3>
<p>Відкривається, коли людина скасовує зчитування, зі <code>state</code>.</p>
<p><strong>Обов'язковий:</strong> ні</p>
</article>

<article class="page-card">
<h3><code>state</code></h3>
<p>Будь-який рядок, наприклад одноразовий ID запиту. Повертається без змін із кожним результатом.</p>
<p><strong>Обов'язковий:</strong> ні, але бажано</p>
</article>

<article class="page-card">
<h3><code>ndef</code></h3>
<p><code>1</code> додатково зчитує повідомлення NDEF з мітки. Без нього зчитується лише UID.</p>
<p><strong>Обов'язковий:</strong> ні</p>
</article>

</div>

Використовуй `x-get` або `x-post`, але не обидва одразу. Усі значення колбеків передавай у URL-кодуванні.

Відкрити таке посилання може будь-яка вебсторінка, тому NFC.cool відповідає лише на адреси `https` і в схеми URL інших застосунків, як-от `yourapp://nfc-done`; для `x-get` і `x-post` потрібен саме `https`. Звичайний `http`, `javascript:`, `data:`, `tel:`, власні схеми NFC.cool і системні схеми, які спрацьовують самі (`shortcuts:`, `itms-services:`, `mailto:`, `App-Prefs:` тощо), NFC.cool не приймає, а посилання бодай з одним таким колбеком ігнорує повністю.

### UID

Шістнадцятковий, у верхньому регістрі, без роздільників, старший байт іде першим. За довжиною можна розрізнити сімейства чипів:

<div class="page-cards-grid">

<article class="page-card">
<h3>NTAG, MIFARE Ultralight (ISO 14443-A)</h3>
<p>7 байтів</p>
<p><code>04A1B2C3D4E5F6</code></p>
</article>

<article class="page-card">
<h3>ICODE та інші мітки ISO 15693</h3>
<p>8 байтів</p>
<p><code>E004015012345678</code></p>
</article>

</div>

UID міток ISO 15693 починаються з `E0`: порядок байтів той самий, що надрукований на чипі й що показує більшість зчитувачів.

### Повідомлення NDEF

З `ndef=1` у `ndef` лежить сире повідомлення NDEF з мітки (лише записи, без заголовка TLV) у Base64url без доповнення ([RFC 4648, розділ 5](https://www.rfc-editor.org/rfc/rfc4648#section-5)): `-` і `_` замість `+` і `/`, і жодних `=`. Якщо на мітці немає повідомлення NDEF, параметр не передається.

```js
// Node.js
const bytes = Buffer.from(ndef, "base64url");
```

```python
# Python
import base64
data = base64.urlsafe_b64decode(ndef + "=" * (-len(ndef) % 4))
```

### `x-get`

```
GET https://your-server.example/nfc?code=abc123&uid=E004015012345678&ndef=0QEFVAJkZUhp&state=7f3c9a
GET https://your-server.example/nfc?code=abc123&error=cancelled&state=7f3c9a
```

NFC.cool викликає твою адресу як є й дописує результат після параметрів, які в ній уже є. На кожну спробу приходить рівно один виклик, тож сторінка, яка на нього чекає, може перестати чекати, щойно він надійде:

<div class="page-cards-grid">

<article class="page-card">
<h3><code>cancelled</code></h3>
<p>Людина скасувала зчитування або закрила NFC.cool, так і не зчитавши мітку.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>Мітку не вдалося знайти вчасно або зчитати.</p>
</article>

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>На цьому iPhone немає доступу до NFC.cool Business.</p>
</article>

</div>

Після `cancelled` чи `scan-failed` людина може спробувати ще раз, і успішне зчитування знову викличе `x-get`, уже з `uid`: відповіддю вважай останній виклик для цього `state`. Відповідай будь-яким кодом 2xx. Якщо виклик з успішним результатом не пройшов, NFC.cool запропонує надіслати його ще раз.

### `x-post`

```
POST https://your-server.example/api/uid
Content-Type: application/json

{"uid":"04A1B2C3D4E5F6","state":"7f3c9a","readAt":"2026-11-19T09:30:00Z","ndef":"0QEFVAJkZUhp"}
```

Відповідай будь-яким кодом 2xx протягом 20 секунд. Усе інше вважається збоєм: людина може надіслати запит ще раз, а якщо закриє NFC.cool, до `x-error` прийде `delivery-failed`. Бери `x-post`, коли сторінку, що почала зчитування, не можна знову відкрити за адресою, наприклад WebView усередині іншого застосунку; назад людина повернеться за посиланням, яке iOS показує в лівому верхньому куті.

NFC.cool не надсилає cookies разом із `x-get` чи `x-post`. Розпізнавай запит за одноразовим `state`, вказаним у посиланні.

### Коди `x-error`

<div class="page-cards-grid">

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>На цьому iPhone немає доступу до NFC.cool Business.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>Мітку не вдалося знайти вчасно або зчитати.</p>
</article>

<article class="page-card">
<h3><code>delivery-failed</code></h3>
<p>Запит <code>x-post</code> не пройшов.</p>
</article>

</div>

### Приклад

Сторінка, яка чекає на відповідь свого сервера й отримує заразом повідомлення NDEF:

```html
<a href="https://nfc.cool/x-callback-url/read-uid?x-get=https%3A%2F%2Fexample.com%2Fnfc%3Fcode%3Dabc123&ndef=1&state=7f3c9a">
  Scan tag
</a>
```

</section>
