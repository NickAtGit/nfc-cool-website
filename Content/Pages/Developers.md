---
title: "Developers"
slug: "developers"
description: "Webhook payload reference, code samples in cURL/Node.js/Python, and machine-readable feeds for tooling and AI agents."
---

<section class="page-hero">

# For builders

NFC.cool is a scanner that respects your stack. Every scan can be a structured HTTP POST to your own backend, with predictable JSON, configurable auth, and an offline retry queue.

</section>

<section class="page-section">

## Webhook payload

Each scan triggers a single `POST` to the URL you configure. Body is JSON, content-type `application/json`:

```json
{
  "type": "nfc",
  "payload": "https://example.com/check-in/abc123",
  "uid": "04:A2:7F:1B:5E:80:00",
  "timestamp": "2026-05-12T14:23:01Z",
  "device": "Nicolo's iPhone 16 Pro",
  "metadata": {
    "campaign": "front-desk",
    "tag_label": "Reception NFC"
  }
}
```

Field reference:

- `type` — one of `nfc`, `qr`, `barcode`.
- `payload` — decoded content (URI, text, vCard, Wi-Fi credentials, etc.). For NFC tags this is the parsed NDEF record value; for QR/barcode it's the raw decoded string.
- `uid` — tag identifier (for NFC) or code identifier (for QR/barcode). Same tag always emits the same UID; useful for deduplication.
- `timestamp` — ISO 8601 in UTC, when the scan happened on-device.
- `device` — optional, user-configurable device label (e.g., "Reception iPhone").
- `metadata` — optional key/value bag you set per-tag inside NFC.cool.

</section>

<section class="page-section">

## Security

Webhooks support custom request headers — use them for authentication so secrets stay out of any client-side code:

- **Bearer token:** `Authorization: Bearer YOUR_TOKEN`
- **API key:** `X-API-Key: YOUR_KEY`
- **HMAC signature:** Add a custom `X-Signature` header computed from a shared secret + payload; verify server-side.

The app stores headers in the system keychain. NFC.cool itself never sees or transmits them — they go directly from device to your endpoint over TLS 1.2+.

</section>

<section class="page-section">

## Example receivers

### cURL — quick smoke test

```bash
curl -X POST https://your-server.example/webhook \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer test-token' \
  -d '{"type":"nfc","payload":"hello","uid":"04:00","timestamp":"2026-05-12T14:00:00Z"}'
```

### Node.js — Express receiver

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

### Python — FastAPI receiver

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

## Reliability

If your server is unreachable or returns a non-2xx response, NFC.cool queues the POST locally on the device and retries with exponential backoff (up to 5 attempts). You can also manually replay any past scan from the in-app history at any time. No scan is silently lost.

Recommended response: return `204 No Content` on success. Any 2xx is treated as successful delivery.

</section>

<section class="page-section">

## Machine-readable resources

Discoverable feeds for tooling, search engines, and AI agents:

- [`/sitemap.xml`](/sitemap.xml) — full site index
- [`/llms.txt`](/llms.txt) — AI-friendly site directory (auto-emitted)
- [`/feed.xml`](/feed.xml) — site-wide RSS, full-text content
- [`/blog/feed.xml`](/blog/feed.xml) — blog-only RSS
- [`/changelog/feed.xml`](/changelog/feed.xml) — release feed
- [`/assets/nav-index.json`](/assets/nav-index.json) — structured navigation index
- [`/assets/search-index.json`](/assets/search-index.json) — full-text search index

If you're building an integration or doing automated discovery and run into something missing, drop a note: <hello@nfc.cool>.

</section>
