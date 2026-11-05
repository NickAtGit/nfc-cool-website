---
title: "Розробникам"
slug: "developers"
description: "Як вбудувати NFC.cool у свій стек: опис вмісту вебхука, App Intents, схеми URL, машиночитані стрічки і все потрібне для серверної інтеграції на iPhone та Android."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Для тих, хто будує

NFC.cool сканує так, щоб не ламати твій стек. Кожне сканування може піти на власний бекенд структурованим HTTP POST з передбачуваним JSON, просто з пристрою. Без посередників, без облікового запису NFC.cool, без вивантаження на наші сервери.

<a href="#webhook-payload" class="landing-cta-button">Подивитися вміст запиту</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/webhook.webp" alt="Дані сканування, які йдуть на адресу вебхука" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section">

## Куди під'єднати NFC.cool

Вебхук зводиться до звичайного `POST` з JSON на адресу, якою керуєш ти, тож підійде будь-що, що вміє HTTP.

<div class="feature-capabilities-grid">

<article class="feature-capability-card">
<h3>Zapier</h3>
<p>Тригер «Catch Webhook» у Zapier доставляє сканування у понад 5 000 сервісів: CRM, таблиці, Slack і будь-що інше. Безкоштовного тарифу вистачає на невеликі обсяги.</p>
</article>

<article class="feature-capability-card">
<h3>n8n</h3>
<p>Розгорни n8n у себе, і кількість запусків сценаріїв стає необмеженою, а плати за кожну операцію немає. Вузол HTTP-тригера приймає POST від NFC.cool напряму.</p>
</article>

<article class="feature-capability-card">
<h3>Make (колишній Integromat)</h3>
<p>Візуальний конструктор сценаріїв з великим набором інтеграцій. Модуль Webhooks стає точкою входу для кожного сканування NFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>IFTTT</h3>
<p>Для простої логіки «якщо це, то те». Сервіс Webhooks в IFTTT видає унікальну адресу, яку лишається вставити в налаштування вебхука NFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>Slack / Discord / Teams</h3>
<p>Вкажи як адресу вебхука вхідний вебхук Slack (або його аналог у Discord чи Teams), і канал отримуватиме сповіщення на кожен дотик до мітки.</p>
</article>

<article class="feature-capability-card">
<h3>Власний бекенд</h3>
<p>Підійде будь-яка адреса HTTPS, яка приймає POST з JSON. Схему, модель автентифікації та приклади приймачів описано нижче.</p>
</article>

</div>

</section>

<section class="page-section">

## Типові сценарії

- **Облік і журнал подій.** Піднеси телефон до мітки на товарі, NFC.cool надсилає POST у таблицю чи складську систему, і там виникає рядок з часом, ідентифікатором мітки та вмістом.
- **Збір контактів на заходах.** Гість підносить телефон до мітки на банері стенда, і CRM сама надсилає лист услід.
- **Тригери розумного дому.** Дотик до мітки на вхідних дверях означає «я вдома», а Home Assistant, Homey чи Hubitat підхоплюють це через вебхук.
- **Облік обладнання.** Технік підносить телефон до мітки на апараті, щоб зафіксувати огляд, а бекенд збирає з цього журнал відповідності.
- **Реєстрація на конференції.** Дотик до NFC-бейджа учасника, і вебхук оновлює платформу заходу в реальному часі.

</section>

<section class="page-section" id="webhooks">

## Вебхуки

Вмикається в застосунку на вкладці **«Ще» → «Вебхук»**: вкажи одну адресу HTTPS, за потреби логін і пароль для HTTP Basic Auth, а далі окремо ввімкни «Сканування NFC» та «Сканування QR і штрихкодів». Працює на iOS та Android.

На кожне сканування застосунок надсилає рівно один `POST` на вказану адресу. Окремої черги повторів немає: якщо адреса недоступна або відповідає кодом поза межами 2xx, POST не проходить. На успіх найкраще віддавати `204 No Content`, а прийнятою вважається будь-яка відповідь із серії 2xx.

Ця сторінка суто технічна. Огляд самої функції (решта чотирьох гачків автоматизації на iOS, ціни та часті питання) живе на [сторінці «Вебхуки й автоматизація»](/uk/features/webhooks/).

</section>

<section class="page-section" id="webhook-payload">

## Вміст запиту

Content-type `application/json`, тіло запиту йде відформатованим JSON:

```json
{
  "identifier" : "04:A2:7F:1B:5E:80:00",
  "date" : "2026-05-12T14:23:01Z",
  "content" : "https://example.com/check-in/abc123"
}
```

Структуровані мітки (поки що тільки OpenPrintTag) додають ще два поля:

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

Опис полів:

- `identifier`: для NFC сюди лягає апаратний UID мітки, шістнадцятковий, у верхньому регістрі, з двокрапками (наприклад, `04:A2:7F:1B:5E:80:00`). Він не змінюється, тому годиться для дедуплікації. Для QR і штрихкодів щоразу приходить новий UUID, а не стабільний ідентифікатор коду. У старих режимах сумісності NFC на iOS, де UID недоступний, у полі стоїть рядок `NoIdentifierInCompatibilityMode`.
- `date`: час сканування на пристрої, у форматі ISO 8601.
- `content`: розібраний вміст. Для NFC це значення запису NDEF (URI або текст), для QR і штрихкодів сирий розкодований рядок.
- `tagType`: у звичайних скануваннях відсутнє. Для OpenPrintTag набуває значення `"openPrintTag"`.
- `structured`: у звичайних скануваннях відсутнє. Коли є `tagType`, тут лежить розібраний структурований вміст.

</section>

<section class="page-section">

## Автентифікація

Вебхуки підтримують **тільки HTTP Basic Auth**. На вкладці **«Ще» → «Вебхук»** можна зберегти логін і пароль у Keychain на iOS. Далі застосунок відповідає цими даними на стандартний виклик `401 / WWW-Authenticate: Basic` від твого сервера.

Тобто чи потрібна автентифікація, вирішує твій сервер. Якщо вона не потрібна, лиши логін і пароль у застосунку порожніми, а на сервері не надсилай виклик. Якщо потрібна, віддай на перший POST `401` із заголовком `WWW-Authenticate: Basic realm="…"`, і пристрій повторить запит із `Authorization: Basic …` та збереженими даними. Усе йде через TLS, а сервери NFC.cool твоїх облікових даних не бачать ніколи.

Bearer-токенів, ключів API та підписів HMAC поки що немає. Якщо вони потрібні, завершуй їх на зворотному проксі (Cloudflare Worker, nginx тощо), який перекладає Basic → твою схему.

</section>

<section class="page-section">

## Приклади приймачів

Потрібен весь ланцюжок від початку до кінця? Візьми [еталонний сервер вебхука на GitHub](https://github.com/NickAtGit/nfc-cool-webhook-server): він показує кожен запит у прямому ефірі. Нижче зібрані мінімальні приймачі під власний стек.

### cURL: швидка перевірка

```bash
curl -X POST https://your-server.example/webhook \
  -u 'nfc-cool:your-password' \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"04:A2:7F:1B:5E:80:00","date":"2026-05-12T14:00:00Z","content":"hello"}'
```

### Node.js: приймач на Express

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

### Python: приймач на FastAPI

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

## App Intents і Швидкі команди

NFC.cool Tools на **iOS** приносить кілька App Intents, які вплітаються у Швидкі команди, автоматизації, режими фокусування та Apple Intelligence.

<div class="page-cards-grid">

<article class="page-card">
<h3><code>Scan</code></h3>
<p>Запускає сканування у вибраній функції: NFC, QR і штрихкоди, документ, 3D-об'єкт або приміщення.</p>
</article>

<article class="page-card">
<h3><code>Open Tab</code></h3>
<p>Відкриває NFC.cool на потрібній вкладці (NFC, QR, документ, 3D, «Ще»), не починаючи сканування.</p>
</article>

<article class="page-card">
<h3><code>Get Last NFC Tag</code></h3>
<p>Повертає вміст останньої зчитаної NFC-мітки рядком, зручно як вхід для Швидкої команди. Застосунок при цьому не відкривається.</p>
</article>

<article class="page-card">
<h3><code>Get Last QR Code</code></h3>
<p>Повертає вміст останнього відсканованого QR-коду чи штрихкоду. Застосунок при цьому не відкривається.</p>
</article>

<article class="page-card">
<h3><code>Write NFC</code></h3>
<p>Відкриває запис NFC із заздалегідь підставленим посиланням або текстом, який передала Швидка команда.</p>
</article>

</div>

Окремі варіанти для iOS 18 (`NFC Scan`, `QR Scan`, `Document Scan`, `Object Scan`, `Room Scan`) потрапляють прямо в Spotlight і в список дій для кнопки дії.

</section>

<section class="page-section" id="url-schemes">

## Схеми URL

Для глибоких посилань з інших застосунків на iOS, з віджетів чи ярликів на робочому столі NFC.cool Tools реєструє такі адреси:

```
nfcforiphone://scan-nfc
nfcforiphone://scan-code
nfcforiphone://scan-document
nfcforiphone://scan-object       (iOS 17+)
nfcforiphone://scan-room         (iOS 17+)
```

Будь-яка з них одразу відкриває потрібний сканер. Схеми `nfc://` і `geo://` теж зареєстровані, щоб приймати зовнішні посилання на мітки та координати.

</section>

<section class="page-section">

## Машиночитані ресурси

Стрічки, які легко знайти інструментам, пошуковим системам та агентам зі штучним інтелектом:

<div class="page-cards-grid">

<article class="page-card">
<h3><a href="/sitemap.xml"><code>/sitemap.xml</code></a></h3>
<p>Повний покажчик сайту: усі маршрути і дати останньої зміни.</p>
</article>

<article class="page-card">
<h3><a href="/llms.txt"><code>/llms.txt</code></a></h3>
<p>Каталог сайту для мовних моделей (SiteKit генерує його сам).</p>
</article>

<article class="page-card">
<h3><a href="/feed.xml"><code>/feed.xml</code></a></h3>
<p>RSS по всьому сайту з повними текстами з кожного розділу.</p>
</article>

<article class="page-card">
<h3><a href="/blog/feed.xml"><code>/blog/feed.xml</code></a></h3>
<p>RSS лише для блогу.</p>
</article>

<article class="page-card">
<h3><a href="/changelog/feed.xml"><code>/changelog/feed.xml</code></a></h3>
<p>Стрічка релізів: версії, дати та записи з історії оновлень.</p>
</article>

<article class="page-card">
<h3><a href="/assets/nav-index.json"><code>/assets/nav-index.json</code></a></h3>
<p>Структурований покажчик навігації з назвами, короткими описами, тегами та адресами.</p>
</article>

<article class="page-card">
<h3><a href="/assets/search-index.json"><code>/assets/search-index.json</code></a></h3>
<p>Текст кожної статті для пошуку на боці клієнта.</p>
</article>

</div>

Будуєш щось поверх NFC.cool? Або знаєш інтеграцію, якої тут бракує? [Напиши нам](mailto:info@nfc.cool?subject=NFC.cool%20Support).

</section>
