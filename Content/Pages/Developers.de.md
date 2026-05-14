---
title: "Entwickler"
slug: "developers"
description: "NFC.cool in deinen Stack einbinden - Webhook-Payload-Referenz, App Intents, URL-Schemata, maschinenlesbare Feeds und alles, was du für eine serverseitige Integration auf iPhone und Android brauchst."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Für Entwickler

NFC.cool ist ein Scanner, der deinen Stack respektiert. Jeder Scan kann ein strukturierter HTTP-POST an dein eigenes Backend sein - in vorhersehbarem JSON, direkt vom Gerät verschickt. Kein Vermittler, kein NFC.cool-Konto, kein Upload zu unseren Servern.

<a href="#webhook-payload" class="landing-cta-button">Payload ansehen</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/webhook.webp" alt="Scandaten fließen zu einem Webhook-Endpunkt" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section">

## Wo du NFC.cool anbinden kannst

Ein Webhook ist einfach ein JSON-`POST` an eine URL deiner Wahl - alles, was HTTP spricht, geht damit.

<div class="feature-capabilities-grid">

<article class="feature-capability-card">
<h3>Zapier</h3>
<p>Mit Zapiers "Catch Webhook"-Trigger leitest du Scans an über 5.000 Apps weiter - CRMs, Tabellen, Slack, alles. Der kostenlose Tarif reicht für kleine Volumina.</p>
</article>

<article class="feature-capability-card">
<h3>n8n</h3>
<p>Self-hosted n8n für unbegrenzte Workflow-Durchläufe ohne Pro-Task-Pricing. Der HTTP-Trigger-Node nimmt NFC.cool-POSTs direkt entgegen.</p>
</article>

<article class="feature-capability-card">
<h3>Make (früher Integromat)</h3>
<p>Visueller Workflow-Builder mit breiter App-Abdeckung. Nutze das Webhooks-Modul als Einstiegspunkt für jeden NFC.cool-Scan.</p>
</article>

<article class="feature-capability-card">
<h3>IFTTT</h3>
<p>Für einfaches "if this then that"-Routing. IFTTTs Webhooks-Service liefert eine eigene URL, die du in die NFC.cool-Webhook-Konfiguration einträgst.</p>
</article>

<article class="feature-capability-card">
<h3>Slack / Discord / Teams</h3>
<p>Richte die Webhook-URL direkt auf einen Slack-Incoming-Webhook (oder das Discord-/Teams-Äquivalent), um bei jedem Tap in einen Channel zu pingen.</p>
</article>

<article class="feature-capability-card">
<h3>Dein eigenes Backend</h3>
<p>Jeder HTTPS-Endpunkt, der einen JSON-POST akzeptiert, funktioniert. Schema, Auth-Modell und Beispiel-Empfänger findest du weiter unten.</p>
</article>

</div>

</section>

<section class="page-section">

## Häufige Workflow-Muster

- **Inventur + Audit-Trail.** Tippe einen Tag auf einem Artikel an, NFC.cool POSTet in eine Tabelle oder ein Warehouse-System; eine Zeile erscheint mit Zeitstempel + Tag-Identifier + Payload.
- **Lead-Erfassung auf Events.** Tippe einen Tag auf deinem Messebanner an, dein CRM sendet automatisch eine Follow-up-E-Mail.
- **Smart-Home-Trigger.** Tippe einen Tag an der Haustür an, um "Ich bin zu Hause" zu markieren - Home Assistant / Homey / Hubitat empfängt es per Webhook.
- **Asset-Tracking.** Wartungspersonal tippt Tags auf Geräten an, um Inspektionen zu protokollieren; das Backend baut das Compliance-Log.
- **Konferenz-Check-ins.** Tippe das NFC-Badge eines Gastes an; der Webhook aktualisiert deine Event-Plattform in Echtzeit.

</section>

<section class="page-section" id="webhooks">

## Webhooks

Aktivierbar unter **Einstellungen → Webhook** in der App: eine HTTPS-URL eintragen, optional Benutzername/Passwort für HTTP Basic Auth hinterlegen, dann "NFC-Scans" und "QR- & Barcode-Scans" unabhängig voneinander einschalten. Verfügbar auf iOS und Android.

Die App sendet einen einzelnen `POST` pro Scan an die hinterlegte URL. Es gibt keine separate Retry-Queue: ist dein Endpunkt nicht erreichbar oder liefert er einen Non-2xx-Status zurück, scheitert der POST. Antworte idealerweise mit `204 No Content`; jeder 2xx-Status gilt als angenommen.

</section>

<section class="page-section" id="webhook-payload">

## Webhook-Payload

Content-Type `application/json`, Body ist pretty-printed JSON:

```json
{
  "identifier" : "04:A2:7F:1B:5E:80:00",
  "date" : "2026-05-12T14:23:01Z",
  "content" : "https://example.com/check-in/abc123"
}
```

Strukturierte Tags (aktuell OpenPrintTag) fügen zwei weitere Felder hinzu:

```json
{
  "identifier" : "04:A2:7F:1B:5E:80:00",
  "date" : "2026-05-12T14:23:01Z",
  "content" : "Filament Spool #1234",
  "tagType" : "openPrintTag",
  "structured" : { "...geparste Felder..." }
}
```

Feld-Referenz:

- `identifier` - Bei NFC-Scans die Hardware-UID des Tags als doppelpunktgetrennter Hex-String in Großbuchstaben (z. B. `04:A2:7F:1B:5E:80:00`). Pro Tag stabil, also gut für Deduplizierung. Bei QR- & Barcode-Scans dagegen ein frisch generiertes UUID pro Scan - keine stabile Code-Kennung. In älteren iOS-NFC-Kompatibilitätsmodi, in denen die UID nicht ausgelesen werden kann, steht hier der String `NoIdentifierInCompatibilityMode`.
- `date` - ISO 8601, Zeitpunkt des Scans auf dem Gerät.
- `content` - Dekodierter Inhalt. Bei NFC der NDEF-Record-Wert (URI oder Text), bei QR/Barcode der rohe dekodierte String.
- `tagType` - Bei einfachen Scans ausgelassen. Bei OpenPrintTag-Scans `"openPrintTag"`.
- `structured` - Bei einfachen Scans ausgelassen. Geparste strukturierte Payload, wenn `tagType` gesetzt ist.

</section>

<section class="page-section">

## Authentifizierung

Webhooks unterstützen **ausschließlich HTTP Basic Auth**. Unter **Einstellungen → Webhook** kannst du optional Benutzername und Passwort im iOS-Keychain hinterlegen. Die App antwortet damit auf standardmäßige HTTP `401 / WWW-Authenticate: Basic`-Challenges deines Servers.

Heißt: dein Endpunkt entscheidet, ob Auth erforderlich ist. Brauchst du keine, lass die Felder in der App leer und überspring die Challenge serverseitig. Brauchst du sie, antworte auf den ersten POST mit `401` und `WWW-Authenticate: Basic realm="…"` - das Gerät wiederholt den Request dann mit `Authorization: Basic …` und den gespeicherten Credentials. Alles läuft über TLS; NFC.cools Server sehen deine Zugangsdaten nie.

Bearer-Token, API-Keys oder HMAC-Signaturen werden aktuell nicht unterstützt. Wenn du sie brauchst, terminiere sie an einem Reverse Proxy (Cloudflare Worker, nginx, …), der Basic in dein Schema übersetzt.

</section>

<section class="page-section">

## Beispiel-Empfänger

### cURL - schneller Smoke-Test

```bash
curl -X POST https://dein-server.example/webhook \
  -u 'nfc-cool:dein-passwort' \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"04:A2:7F:1B:5E:80:00","date":"2026-05-12T14:00:00Z","content":"hello"}'
```

### Node.js - Express-Receiver

```js
import express from "express";
import basicAuth from "express-basic-auth";

const app = express();
app.use(express.json());

app.post(
  "/webhook",
  basicAuth({
    users: { "nfc-cool": process.env.WEBHOOK_PASSWORD },
    challenge: true, // damit NFC.cool den POST mit Credentials wiederholt
  }),
  (req, res) => {
    const { identifier, date, content, tagType } = req.body;
    console.log(`scan ${tagType ?? "plain"} ${content} id=${identifier} at ${date}`);
    res.status(204).end();
  }
);

app.listen(3000);
```

### Python - FastAPI-Receiver

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

## App Intents & Kurzbefehle

NFC.cool Tools auf **iOS** stellt eine Handvoll App Intents bereit, die du in die Kurzbefehle-App, Automationen, Fokus-Modi oder Apple Intelligence einbauen kannst.

<div class="page-cards-grid">

<article class="page-card">
<h3><code>Scannen</code></h3>
<p>Startet einen Scan in der gewählten Funktion: NFC, QR / Barcode, Dokument, 3D-Objekt oder Raum.</p>
</article>

<article class="page-card">
<h3><code>Tab öffnen</code></h3>
<p>Öffnet NFC.cool an einem bestimmten Tab (NFC, QR, Dokument, 3D, Mehr), ohne einen Scan zu starten.</p>
</article>

<article class="page-card">
<h3><code>Letzten NFC-Tag holen</code></h3>
<p>Gibt den Inhalt des zuletzt gescannten NFC-Tags als String zurück - praktisch als Kurzbefehl-Input. Startet die App nicht.</p>
</article>

<article class="page-card">
<h3><code>Letzten QR-Code holen</code></h3>
<p>Gibt den Inhalt des zuletzt gescannten QR-Codes / Barcodes zurück. Startet die App nicht.</p>
</article>

<article class="page-card">
<h3><code>NFC schreiben</code></h3>
<p>Öffnet den NFC-Schreibflow, vorausgefüllt mit URL oder Text aus dem Kurzbefehl.</p>
</article>

</div>

Die iOS-18-Varianten (`NFC Scan`, `QR Scan`, `Document Scan`, `Object Scan`, `Room Scan`) erscheinen direkt in Spotlight und im Action-Button-Picker.

</section>

<section class="page-section" id="url-schemes">

## URL-Schemata

Für Deep-Links aus anderen iOS-Apps, Widgets oder Home-Screen-Shortcuts registriert NFC.cool Tools diese URLs:

```
nfcforiphone://scan-nfc
nfcforiphone://scan-code
nfcforiphone://scan-document
nfcforiphone://scan-object       (iOS 17+)
nfcforiphone://scan-room         (iOS 17+)
```

Jede dieser URLs öffnet direkt den passenden Scanner. Die Schemata `nfc://` und `geo://` sind ebenfalls registriert, um externe Tag- bzw. Koordinaten-Links zu übernehmen.

</section>

<section class="page-section">

## Maschinenlesbare Ressourcen

Auffindbare Feeds für Tooling, Suchmaschinen und KI-Agenten:

<div class="page-cards-grid">

<article class="page-card">
<h3><a href="/sitemap.xml"><code>/sitemap.xml</code></a></h3>
<p>Vollständiger Site-Index - jede Route plus letztes Änderungsdatum.</p>
</article>

<article class="page-card">
<h3><a href="/llms.txt"><code>/llms.txt</code></a></h3>
<p>KI-freundliches Site-Verzeichnis (automatisch generiert).</p>
</article>

<article class="page-card">
<h3><a href="/feed.xml"><code>/feed.xml</code></a></h3>
<p>Seitenweiter RSS mit Volltext-Inhalt aus jeder Sektion.</p>
</article>

<article class="page-card">
<h3><a href="/blog/feed.xml"><code>/blog/feed.xml</code></a></h3>
<p>Blog-spezifischer RSS-Feed.</p>
</article>

<article class="page-card">
<h3><a href="/changelog/feed.xml"><code>/changelog/feed.xml</code></a></h3>
<p>Release-Feed - Versionen, Daten, Changelog-Einträge.</p>
</article>

<article class="page-card">
<h3><a href="/assets/nav-index.json"><code>/assets/nav-index.json</code></a></h3>
<p>Strukturierter Navigations-Index mit Titeln, Zusammenfassungen, Tags und URLs.</p>
</article>

<article class="page-card">
<h3><a href="/assets/search-index.json"><code>/assets/search-index.json</code></a></h3>
<p>Volltext-Inhalt jedes Artikels für client-seitige Suche.</p>
</article>

</div>

Du baust auf NFC.cool auf, oder kennst einen Integrations-Partner, der hier stehen sollte? Schreib uns: <hello@nfc.cool>.

</section>
