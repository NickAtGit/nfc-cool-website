---
title: "Разработчикам"
slug: "developers"
description: "Как встроить NFC.cool в свой стек: описание тела вебхука, App Intents, URL-схемы, машиночитаемые ленты и всё нужное для серверной интеграции на iPhone и Android."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Тем, кто строит

NFC.cool сделан как сканер, который уважает твой стек. Любое сканирование может уйти структурированным запросом HTTP POST на твой бэкенд, предсказуемым JSON, прямо с устройства. Ни посредника, ни аккаунта в NFC.cool, ни загрузки на наши серверы.

<a href="#webhook-payload" class="landing-cta-button">Посмотреть тело запроса</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/webhook.webp" alt="Данные сканирования уходят на адрес вебхука" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section">

## Куда можно встроить NFC.cool

Вебхук отправляет обычный `POST` с JSON на твой собственный адрес, поэтому подойдёт что угодно, что говорит по HTTP.

<div class="feature-capabilities-grid">

<article class="feature-capability-card">
<h3>Zapier</h3>
<p>Триггер «Catch Webhook» в Zapier раскидывает сканирования по 5000 с лишним сервисов: CRM, таблицы, Slack и что угодно ещё. Бесплатного тарифа хватает на небольшие объёмы.</p>
</article>

<article class="feature-capability-card">
<h3>n8n</h3>
<p>Разверни n8n у себя, и число запусков сценариев перестанет упираться в цену за задачу. Узел с HTTP-триггером принимает запросы от NFC.cool напрямую.</p>
</article>

<article class="feature-capability-card">
<h3>Make (formerly Integromat)</h3>
<p>Визуальный конструктор сценариев с широкой поддержкой сервисов. Модуль Webhooks становится точкой входа для каждого сканирования NFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>IFTTT</h3>
<p>Для простых связок в духе «если это, то то». Сервис Webhooks в IFTTT выдаёт уникальный адрес, который вставляется в настройки вебхука NFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>Slack / Discord / Teams</h3>
<p>Направь адрес вебхука на входящий вебхук Slack или на его аналог в Discord и Teams, и канал будет получать сообщение при каждом касании метки.</p>
</article>

<article class="feature-capability-card">
<h3>Свой бэкенд</h3>
<p>Подойдёт любой адрес HTTPS, который принимает POST с JSON. Схема данных, модель авторизации и примеры приёмников описаны ниже.</p>
</article>

</div>

</section>

<section class="page-section">

## Частые сценарии

- **Склад и журнал операций.** Подноси телефон к метке на предмете, NFC.cool отправляет запрос в таблицу или складскую систему, и там появляется строка со временем, идентификатором метки и содержимым.
- **Сбор контактов на мероприятии.** Гость подносит телефон к метке на баннере стенда, и CRM сама отправляет письмо вдогонку.
- **Сценарии умного дома.** Поднеси телефон к метке у входной двери, чтобы отметить «я дома», а Home Assistant, Homey или Hubitat подхватят это через вебхук.
- **Учёт оборудования.** Техники подносят телефон к меткам на технике и фиксируют осмотры, а бэкенд собирает из этого журнал соответствия.
- **Регистрация на конференции.** Поднеси NFC-бейдж участника, и вебхук обновит платформу мероприятия в реальном времени.

</section>

<section class="page-section" id="webhooks">

## Вебхуки

Включается в приложении на вкладке **«Ещё» → «Вебхук»**: укажи один адрес HTTPS, при желании логин и пароль для HTTP Basic Auth, а потом отдельно включи «Сканирование NFC» и «Сканирование QR и штрихкодов». Работает на iOS и Android.

Приложение отправляет по одному `POST` на каждое сканирование по указанному адресу. Отдельной очереди повторов нет: если адрес недоступен или отвечает не кодом 2xx, отправка не удаётся. В случае успеха лучше отвечать `204 No Content`, но подойдёт любой код 2xx.

Эта страница техническая. Обзор функции, остальные четыре сценария автоматизации на iOS, тарифы и частые вопросы собраны на странице [«Вебхуки и автоматизация»](/ru/features/webhooks/).

</section>

<section class="page-section" id="webhook-payload">

## Тело запроса

Content-type `application/json`, в теле лежит отформатированный JSON:

```json
{
  "identifier" : "04:A2:7F:1B:5E:80:00",
  "date" : "2026-05-12T14:23:01Z",
  "content" : "https://example.com/check-in/abc123"
}
```

Структурированные метки (пока это только OpenPrintTag) добавляют ещё два поля:

```json
{
  "identifier" : "04:A2:7F:1B:5E:80:00",
  "date" : "2026-05-12T14:23:01Z",
  "content" : "Filament Spool #1234",
  "tagType" : "openPrintTag",
  "structured" : {
    "material" : "PLA",
    "color" : "#FF6F4C",
    "manufacturer" : "Prusament",
    "uuid" : "5e8a-7c1d-4f90"
  }
}
```

Описание полей:

- `identifier`: при сканировании NFC это аппаратный UID метки в верхнем регистре через двоеточия (например, `04:A2:7F:1B:5E:80:00`). У метки он не меняется, поэтому годится для отсечения повторов. При сканировании QR-кодов и штрихкодов сюда попадает новый UUID на каждое считывание, то есть постоянного идентификатора у кода тут нет. В старых режимах совместимости NFC на iOS, где UID недоступен, значением будет строка `NoIdentifierInCompatibilityMode`.
- `date`: время сканирования на устройстве в формате ISO 8601.
- `content`: разобранное содержимое. Для NFC это значение записи NDEF (ссылка или текст), для QR-кодов и штрихкодов сырая раскодированная строка.
- `tagType`: у обычных сканирований отсутствует. Для OpenPrintTag принимает значение `"openPrintTag"`.
- `structured`: у обычных сканирований отсутствует. Содержит разобранные структурированные данные, когда есть `tagType`.

</section>

<section class="page-section">

## Авторизация

Вебхуки поддерживают **только HTTP Basic Auth**. На вкладке **«Ещё» → «Вебхук»** можно сохранить логин и пароль в Keychain на iOS. После этого приложение отвечает этими данными на стандартный вызов `401 / WWW-Authenticate: Basic` от твоего сервера.

Значит, нужна авторизация или нет, решает твой адрес. Если она не нужна, оставь логин и пароль в приложении пустыми и не запрашивай их на сервере. Если нужна, ответь на первый POST кодом `401` с заголовком `WWW-Authenticate: Basic realm="…"`, и устройство повторит запрос с `Authorization: Basic …` и сохранёнными данными. Всё идёт по TLS, а серверы NFC.cool твоих учётных данных не видят.

Токенов Bearer, ключей API и подписи HMAC сейчас нет. Если они нужны, разбирай их на обратном прокси (Cloudflare Worker, nginx и подобных), который переведёт Basic в твою схему.

</section>

<section class="page-section">

## Примеры приёмников

Нужна вся цепочка целиком? Склонируй [пример сервера для вебхуков на GitHub](https://github.com/NickAtGit/nfc-cool-webhook-server): он показывает каждое тело запроса вживую. Ниже минимальные приёмники под твой стек.

### cURL: быстрая проверка

```bash
curl -X POST https://your-server.example/webhook \
  -u 'nfc-cool:your-password' \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"04:A2:7F:1B:5E:80:00","date":"2026-05-12T14:00:00Z","content":"hello"}'
```

### Node.js: приёмник на Express

```js
import express from "express";
import basicAuth from "express-basic-auth";

const app = express();
app.use(express.json());

app.post(
  "/webhook",
  basicAuth({
    users: { "nfc-cool": process.env.WEBHOOK_PASSWORD },
    challenge: true, // tells NFC.cool to retry with credentials
  }),
  (req, res) => {
    const { identifier, date, content, tagType } = req.body;
    console.log(`scan ${tagType ?? "plain"} ${content} id=${identifier} at ${date}`);
    res.status(204).end();
  }
);

app.listen(3000);
```

### Python: приёмник на FastAPI

```python
import os
import secrets
from fastapi import FastAPI, Depends, HTTPException, Request, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials

app = FastAPI()
security = HTTPBasic()

def check(creds: HTTPBasicCredentials = Depends(security)):
    ok_user = secrets.compare_digest(creds.username, "nfc-cool")
    ok_pass = secrets.compare_digest(creds.password, os.environ["WEBHOOK_PASSWORD"])
    if not (ok_user and ok_pass):
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            headers={"WWW-Authenticate": 'Basic realm="nfc-cool"'},
        )

@app.post("/webhook")
async def webhook(request: Request, _: None = Depends(check)):
    body = await request.json()
    print(f"scan: {body['content']} id={body['identifier']}")
    return {"status": "ok"}
```

</section>

<section class="page-section" id="shortcuts">

## App Intents и быстрые команды

В NFC.cool Tools на **iOS** есть несколько App Intents, которые подключаются к приложению «Быстрые команды», к автоматизациям, режимам фокусирования и Apple Intelligence.

<div class="page-cards-grid">

<article class="page-card">
<h3><code>Scan</code></h3>
<p>Запускает сканирование в выбранной функции: NFC, QR-коды и штрихкоды, документ, 3D-объект или помещение.</p>
</article>

<article class="page-card">
<h3><code>Open Tab</code></h3>
<p>Открывает NFC.cool на нужной вкладке (NFC, QR, документ, 3D, «Ещё»), не начиная сканирование.</p>
</article>

<article class="page-card">
<h3><code>Get Last NFC Tag</code></h3>
<p>Возвращает содержимое последней считанной NFC-метки строкой: удобно подавать на вход быстрой команде. Приложение при этом не запускается.</p>
</article>

<article class="page-card">
<h3><code>Get Last QR Code</code></h3>
<p>Возвращает содержимое последнего считанного QR-кода или штрихкода. Приложение не запускается.</p>
</article>

<article class="page-card">
<h3><code>Write NFC</code></h3>
<p>Открывает запись NFC, заранее заполненную ссылкой или текстом из быстрой команды.</p>
</article>

</div>

Отдельные варианты для iOS 18 (`NFC Scan`, `QR Scan`, `Document Scan`, `Object Scan`, `Room Scan`) видны прямо в Spotlight и в списке для кнопки действия.

</section>

<section class="page-section" id="url-schemes">

## URL-схемы

Для перехода из других приложений iOS, из виджетов и с ярлыков на экране «Домой» NFC.cool Tools регистрирует такие адреса:

```
nfcforiphone://scan-nfc
nfcforiphone://scan-code
nfcforiphone://scan-document
nfcforiphone://scan-object       (iOS 17+)
nfcforiphone://scan-room         (iOS 17+)
```

Открытие любого из них сразу запускает нужный сканер. Схемы `nfc://` и `geo://` тоже зарегистрированы, чтобы принимать внешние ссылки на метки и координаты.

</section>

<section class="page-section">

## Машиночитаемые ресурсы

Ленты, которые легко найти инструментам, поисковикам и ИИ-агентам:

<div class="page-cards-grid">

<article class="page-card">
<h3><a href="/sitemap.xml"><code>/sitemap.xml</code></a></h3>
<p>Полный указатель сайта: каждый маршрут и дата изменения.</p>
</article>

<article class="page-card">
<h3><a href="/llms.txt"><code>/llms.txt</code></a></h3>
<p>Каталог сайта в удобном для ИИ виде (SiteKit создаёт его сам).</p>
</article>

<article class="page-card">
<h3><a href="/feed.xml"><code>/feed.xml</code></a></h3>
<p>Общий RSS с полными текстами из всех разделов.</p>
</article>

<article class="page-card">
<h3><a href="/blog/feed.xml"><code>/blog/feed.xml</code></a></h3>
<p>Лента RSS только для блога.</p>
</article>

<article class="page-card">
<h3><a href="/changelog/feed.xml"><code>/changelog/feed.xml</code></a></h3>
<p>Лента релизов: версии, даты и записи об изменениях.</p>
</article>

<article class="page-card">
<h3><a href="/assets/nav-index.json"><code>/assets/nav-index.json</code></a></h3>
<p>Структурированный указатель навигации с заголовками, описаниями, тегами и адресами.</p>
</article>

<article class="page-card">
<h3><a href="/assets/search-index.json"><code>/assets/search-index.json</code></a></h3>
<p>Текст каждой статьи для поиска на стороне клиента.</p>
</article>

</div>

Строишь что-то на базе NFC.cool? Или знаешь партнёра по интеграции, которому здесь место? [Напиши нам](mailto:info@nfc.cool?subject=NFC.cool%20Support).

</section>
