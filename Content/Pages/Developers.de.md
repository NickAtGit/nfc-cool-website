---
title: "Entwickler"
slug: "developers"
description: "Webhook-Payload-Referenz, Code-Beispiele in cURL/Node.js/Python und maschinenlesbare Feeds für Tooling und KI-Agenten."
---

<section class="page-hero">

# Für Entwickler

NFC.cool ist ein Scanner, der deinen Stack respektiert. Jeder Scan kann ein strukturierter HTTP-POST an dein eigenes Backend werden - mit vorhersehbarem JSON, konfigurierbarer Authentifizierung und einer Offline-Retry-Queue.

</section>

<section class="page-section">

## Webhook-Payload

Jeder Scan löst einen einzelnen `POST` an die konfigurierte URL aus. Body ist JSON, Content-Type `application/json`:

```json
{
  "type": "nfc",
  "payload": "https://example.com/check-in/abc123",
  "uid": "04:A2:7F:1B:5E:80:00",
  "timestamp": "2026-05-12T14:23:01Z",
  "device": "Nicolos iPhone 16 Pro",
  "metadata": {
    "campaign": "front-desk",
    "tag_label": "Reception NFC"
  }
}
```

Feld-Referenz:

- `type` - einer von `nfc`, `qr`, `barcode`.
- `payload` - dekodierter Inhalt (URI, Text, vCard, WLAN-Daten usw.). Für NFC-Tags ist es der geparste NDEF-Record-Wert; für QR/Barcode der rohe dekodierte String.
- `uid` - Tag-Kennung (bei NFC) oder Code-Kennung (bei QR/Barcode). Derselbe Tag liefert immer dieselbe UID; nützlich zur Deduplizierung.
- `timestamp` - ISO 8601 in UTC, der Zeitpunkt des Scans auf dem Gerät.
- `device` - optionaler, vom Nutzer konfigurierbarer Geräte-Label (z. B. "Reception iPhone").
- `metadata` - optionales Key/Value-Objekt, das du pro Tag in NFC.cool festlegen kannst.

</section>

<section class="page-section">

## Sicherheit

Webhooks unterstützen benutzerdefinierte Request-Header - nutze sie zur Authentifizierung, damit Secrets nicht in client-seitigem Code landen:

- **Bearer-Token:** `Authorization: Bearer YOUR_TOKEN`
- **API-Key:** `X-API-Key: YOUR_KEY`
- **HMAC-Signatur:** Füge einen eigenen `X-Signature`-Header hinzu, berechnet aus einem geteilten Secret + Payload; serverseitig verifizieren.

Die App speichert Header im System-Keychain. NFC.cool selbst sieht oder überträgt sie nie - sie gehen direkt vom Gerät an deinen Endpunkt über TLS 1.2+.

</section>

<section class="page-section">

## Beispiel-Empfänger

### cURL - schneller Smoke-Test

```bash
curl -X POST https://dein-server.example/webhook \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer test-token' \
  -d '{"type":"nfc","payload":"hello","uid":"04:00","timestamp":"2026-05-12T14:00:00Z"}'
```

### Node.js - Express-Receiver

```js
import express from "express";
const app = express();
app.use(express.json());

app.post("/webhook", (req, res) => {
  const auth = req.header("authorization");
  if (auth !== `Bearer ${process.env.WEBHOOK_TOKEN}`) {
    return res.status(401).send("unauthorized");
  }
  const { type, payload, uid, timestamp } = req.body;
  console.log(`scan: ${type} ${payload} uid=${uid} at ${timestamp}`);
  res.status(204).end();
});

app.listen(3000);
```

### Python - FastAPI-Receiver

```python
from fastapi import FastAPI, Header, HTTPException, Request
import os

app = FastAPI()

@app.post("/webhook")
async def webhook(request: Request, authorization: str | None = Header(None)):
    if authorization != f"Bearer {os.environ['WEBHOOK_TOKEN']}":
        raise HTTPException(401, "unauthorized")
    body = await request.json()
    print(f"scan: {body['type']} {body['payload']} uid={body['uid']}")
    return {"ok": True}
```

</section>

<section class="page-section">

## Zuverlässigkeit

Wenn dein Server nicht erreichbar ist oder einen Non-2xx-Response liefert, stellt NFC.cool den POST lokal auf dem Gerät in eine Queue und versucht es mit exponentiellem Backoff erneut (bis zu 5 Versuche). Du kannst jeden vergangenen Scan jederzeit manuell aus dem In-App-Verlauf erneut senden. Kein Scan geht stillschweigend verloren.

Empfohlene Antwort: `204 No Content` bei Erfolg. Jeder 2xx wird als erfolgreiche Zustellung gewertet.

</section>

<section class="page-section">

## Maschinenlesbare Ressourcen

Auffindbare Feeds für Tooling, Suchmaschinen und KI-Agenten:

- [`/sitemap.xml`](/sitemap.xml) - vollständiger Site-Index
- [`/llms.txt`](/llms.txt) - KI-freundliches Site-Verzeichnis (automatisch generiert)
- [`/feed.xml`](/feed.xml) - seitenweiter RSS, Volltext-Inhalt
- [`/blog/feed.xml`](/blog/feed.xml) - Blog-RSS
- [`/changelog/feed.xml`](/changelog/feed.xml) - Release-Feed
- [`/assets/nav-index.json`](/assets/nav-index.json) - strukturierter Navigations-Index
- [`/assets/search-index.json`](/assets/search-index.json) - Volltext-Such-Index

Baust du eine Integration oder eine automatisierte Discovery, und etwas fehlt? <hello@nfc.cool>.

</section>
