---
title: "NFC.cool x-callback-url"
slug: "x-callback-url"
description: "Другие приложения и веб-страницы могут попросить NFC.cool на iPhone выполнить действие и вернуть результат по соглашению x-callback-url."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# NFC.cool x-callback-url

Другие приложения и веб-страницы могут попросить NFC.cool на iPhone выполнить действие и вернуть результат по соглашению [x-callback-url](https://x-callback-url.com).

Вебхуки, Быстрые команды и URL-схемы описаны на [странице для разработчиков](/ru/developers/).

<a href="#read-uid" class="landing-cta-button">Открыть документацию</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/nfc-scan-tag.webp" alt="iPhone считывает NFC-метку" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section" id="read-uid">

## Считывание ID метки из приложения или с веб-страницы

Ссылка просит NFC.cool считать одну метку и вернуть её UID, а с `ndef=1` ещё и сообщение NDEF с метки. Ссылка работает с любой веб-страницы и из любого приложения на iPhone, и ничего настраивать не нужно: достаточно установить NFC.cool. Формат ссылки следует соглашению [x-callback-url](https://x-callback-url.com). Считывание меток для других приложений и сайтов входит в NFC.cool Business, лицензию для компаний на NFC.cool для iPhone: [напиши нам](mailto:info@nfc.cool?subject=NFC.cool%20Business), чтобы её получить.

```
https://nfc.cool/x-callback-url/read-uid?<parameters>
nfcforiphone://x-callback-url/read-uid?<parameters>
```

Обе формы делают одно и то же. Лучше бери `https`: на iPhone без NFC.cool она открывает страницу с объяснением, как его установить, а не молча ничего не делает. Помести её в ссылку, которую человек нажимает сам: iOS не открывает приложения по ссылкам, по которым скрипт переходит без участия человека.

NFC.cool выходит на передний план, показывает, кому уйдёт ID метки, и запускает считывание. Если ссылка read-uid уже открыта, новая ссылка её перехватывает, а тот, кто вызвал прежнюю, получает `cancelled`.

### Параметры

<div class="page-cards-grid">

<article class="page-card">
<h3><code>x-get</code></h3>
<p>NFC.cool в фоне вызывает этот URL и передаёт результат в параметрах запроса. Сюда сразу приходит любой исход, включая сбои и отмену.</p>
<p><strong>Обязателен:</strong> <code>x-get</code>, <code>x-post</code> или <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-post</code></h3>
<p>NFC.cool отправляет сюда результат в JSON методом POST.</p>
<p><strong>Обязателен:</strong> <code>x-get</code>, <code>x-post</code> или <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-success</code></h3>
<p>Открывается после успешного считывания, к нему добавляются <code>uid</code>, <code>ndef</code> и <code>state</code>. Вместе с <code>x-get</code> или <code>x-post</code> он получает только <code>state</code>: UID уходит на сервер, который показали человеку, и больше никуда.</p>
<p><strong>Обязателен:</strong> <code>x-get</code>, <code>x-post</code> или <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-error</code></h3>
<p>Открывается, когда человек закрывает NFC.cool после сбоя, с <code>errorCode</code>, <code>errorMessage</code> и <code>state</code>.</p>
<p><strong>Обязателен:</strong> нет</p>
</article>

<article class="page-card">
<h3><code>x-cancel</code></h3>
<p>Открывается, когда человек отменяет считывание, с <code>state</code>.</p>
<p><strong>Обязателен:</strong> нет</p>
</article>

<article class="page-card">
<h3><code>state</code></h3>
<p>Любая строка, например одноразовый ID запроса. Возвращается без изменений с каждым результатом.</p>
<p><strong>Обязателен:</strong> нет, но желательно</p>
</article>

<article class="page-card">
<h3><code>ndef</code></h3>
<p><code>1</code> дополнительно считывает сообщение NDEF с метки. Без него считывается только UID.</p>
<p><strong>Обязателен:</strong> нет</p>
</article>

</div>

Используй `x-get` или `x-post`, но не оба сразу. Все значения колбэков передавай в URL-кодировке.

Открыть такую ссылку может любая веб-страница, поэтому NFC.cool отвечает только на адреса `https` и в URL-схемы других приложений, например `yourapp://nfc-done`; для `x-get` и `x-post` нужен именно `https`. Обычный `http`, `javascript:`, `data:`, `tel:`, собственные схемы NFC.cool и системные схемы, которые срабатывают сами (`shortcuts:`, `itms-services:`, `mailto:`, `App-Prefs:` и подобные), NFC.cool не принимает, а ссылку хотя бы с одним таким колбэком игнорирует целиком.

### UID

Шестнадцатеричный, в верхнем регистре, без разделителей, старший байт идёт первым. По длине можно различить семейства чипов:

<div class="page-cards-grid">

<article class="page-card">
<h3>NTAG, MIFARE Ultralight (ISO 14443-A)</h3>
<p>7 байт</p>
<p><code>04A1B2C3D4E5F6</code></p>
</article>

<article class="page-card">
<h3>ICODE и другие метки ISO 15693</h3>
<p>8 байт</p>
<p><code>E004015012345678</code></p>
</article>

</div>

UID меток ISO 15693 начинаются с `E0`: порядок байтов тот же, что напечатан на чипе и что показывает большинство считывателей.

### Сообщение NDEF

С `ndef=1` в `ndef` лежит сырое сообщение NDEF с метки (только записи, без заголовка TLV) в Base64url без дополнения ([RFC 4648, раздел 5](https://www.rfc-editor.org/rfc/rfc4648#section-5)): `-` и `_` вместо `+` и `/`, и никаких `=`. Если на метке нет сообщения NDEF, параметр не передаётся.

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

NFC.cool вызывает твой URL как есть и дописывает результат после параметров, которые в нём уже есть. На каждую попытку приходит ровно один вызов, так что ожидающая страница может перестать ждать, как только он придёт:

<div class="page-cards-grid">

<article class="page-card">
<h3><code>cancelled</code></h3>
<p>Человек отменил считывание или закрыл NFC.cool, так и не считав метку.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>Метка не нашлась вовремя, или её не удалось считать.</p>
</article>

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>На этом iPhone нет доступа к NFC.cool Business.</p>
</article>

</div>

После `cancelled` или `scan-failed` человек может попробовать ещё раз, и успешное считывание снова вызовет `x-get`, уже с `uid`: ответом считай последний вызов для этого `state`. Отвечай любым кодом 2xx. Если вызов с успешным результатом не прошёл, NFC.cool предложит отправить его ещё раз.

### `x-post`

```
POST https://your-server.example/api/uid
Content-Type: application/json

{"uid":"04A1B2C3D4E5F6","state":"7f3c9a","readAt":"2026-11-19T09:30:00Z","ndef":"0QEFVAJkZUhp"}
```

Ответь любым кодом 2xx в течение 20 секунд. Всё остальное считается сбоем: человек может отправить запрос ещё раз, а если закроет NFC.cool, в `x-error` придёт `delivery-failed`. Бери `x-post`, когда страницу, начавшую считывание, нельзя заново открыть по URL, например WebView внутри другого приложения; назад человек вернётся по ссылке, которую iOS показывает в левом верхнем углу.

NFC.cool не отправляет cookies вместе с `x-get` и `x-post`. Узнавай запрос по одноразовому `state`, указанному в ссылке.

### Коды `x-error`

<div class="page-cards-grid">

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>На этом iPhone нет доступа к NFC.cool Business.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>Метка не нашлась вовремя, или её не удалось считать.</p>
</article>

<article class="page-card">
<h3><code>delivery-failed</code></h3>
<p>Запрос <code>x-post</code> не прошёл.</p>
</article>

</div>

### Пример

Страница, которая ждёт ответа от своего сервера и заодно получает сообщение NDEF:

```html
<a href="https://nfc.cool/x-callback-url/read-uid?x-get=https%3A%2F%2Fexample.com%2Fnfc%3Fcode%3Dabc123&ndef=1&state=7f3c9a">
  Scan tag
</a>
```

</section>
