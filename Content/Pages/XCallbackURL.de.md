---
title: "NFC.cool x-callback-url"
slug: "x-callback-url"
description: "Andere Apps und Webseiten können NFC.cool auf dem iPhone um etwas bitten und bekommen das Ergebnis zurück, nach der x-callback-url-Konvention."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# NFC.cool x-callback-url

Andere Apps und Webseiten können NFC.cool auf dem iPhone um etwas bitten und bekommen das Ergebnis zurück, nach der [x-callback-url](https://x-callback-url.com)-Konvention.

Webhooks, Kurzbefehle und URL-Schemata findest du auf der [Entwicklerseite](/de/developers/).

<a href="#read-uid" class="landing-cta-button">Zur Dokumentation</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/nfc-scan-tag.webp" alt="iPhone scannt einen NFC-Tag" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section" id="read-uid">

## Die ID eines Tags aus deiner App oder Webseite auslesen

Ein Link bittet NFC.cool, einen Tag zu scannen und dir seine UID zurückzugeben, mit `ndef=1` auch die NDEF-Nachricht des Tags. Das funktioniert aus jeder Webseite und jeder App auf dem iPhone, und außer NFC.cool zu installieren musst du nichts einrichten. Der Link folgt der [x-callback-url](https://x-callback-url.com)-Konvention. Tags für andere Apps und Websites auszulesen gehört zu NFC.cool Business, der Firmenlizenz für NFC.cool auf dem iPhone: [Schreib uns](mailto:info@nfc.cool?subject=NFC.cool%20Business), wenn du eine möchtest.

```
https://nfc.cool/x-callback-url/read-uid?<parameters>
nfcforiphone://x-callback-url/read-uid?<parameters>
```

Beide Varianten machen dasselbe. Nimm bevorzugt die `https`-Variante: Auf einem iPhone ohne NFC.cool öffnet sie eine Seite, die erklärt, wie man die App bekommt, statt stillschweigend zu scheitern. Pack sie in einen Link, den die Person antippt; iOS öffnet keine Apps für Links, denen ein Script von sich aus folgt.

NFC.cool kommt in den Vordergrund, zeigt an, wer die ID des Tags erhält, und startet den Scan. Ist bereits ein read-uid-Link offen, übernimmt der neuere Link, und der frühere Aufrufer bekommt `cancelled`.

### Parameter

<div class="page-cards-grid">

<article class="page-card">
<h3><code>x-get</code></h3>
<p>NFC.cool ruft diese URL im Hintergrund auf und hängt das Ergebnis als Query-Parameter an. Jedes Ergebnis kommt hier sofort an, auch Fehler und Abbrüche.</p>
<p><strong>Pflicht:</strong> <code>x-get</code>, <code>x-post</code> oder <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-post</code></h3>
<p>NFC.cool schickt das Ergebnis per POST als JSON hierhin.</p>
<p><strong>Pflicht:</strong> <code>x-get</code>, <code>x-post</code> oder <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-success</code></h3>
<p>Wird nach erfolgreichem Lesen geöffnet, mit angehängten <code>uid</code>, <code>ndef</code> und <code>state</code>. Neben <code>x-get</code> oder <code>x-post</code> bekommt es nur <code>state</code>: Die UID geht an den Server, der der Person angezeigt wurde, und sonst nirgendwohin.</p>
<p><strong>Pflicht:</strong> <code>x-get</code>, <code>x-post</code> oder <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-error</code></h3>
<p>Wird geöffnet, wenn die Person NFC.cool nach einem Fehler schließt, mit <code>errorCode</code>, <code>errorMessage</code> und <code>state</code>.</p>
<p><strong>Pflicht:</strong> nein</p>
</article>

<article class="page-card">
<h3><code>x-cancel</code></h3>
<p>Wird geöffnet, wenn die Person abbricht, mit <code>state</code>.</p>
<p><strong>Pflicht:</strong> nein</p>
</article>

<article class="page-card">
<h3><code>state</code></h3>
<p>Beliebiger String, zum Beispiel eine einmalige Request-ID. Kommt mit jedem Ergebnis unverändert zurück.</p>
<p><strong>Pflicht:</strong> nein, aber empfohlen</p>
</article>

<article class="page-card">
<h3><code>ndef</code></h3>
<p><code>1</code> liest zusätzlich die NDEF-Nachricht des Tags. Ohne den Parameter wird nur die UID gelesen.</p>
<p><strong>Pflicht:</strong> nein</p>
</article>

</div>

Nutze `x-get` oder `x-post`, nicht beides. Jeder Callback-Wert muss URL-kodiert sein.

Jede Webseite kann diesen Link öffnen, deshalb ruft NFC.cool nur `https`-URLs und URL-Schemata anderer Apps zurück, etwa `yourapp://nfc-done`; `x-get` und `x-post` müssen `https` sein. Einfaches `http`, `javascript:`, `data:`, `tel:`, die eigenen Schemata von NFC.cool und System-Schemata, die von selbst etwas auslösen (`shortcuts:`, `itms-services:`, `mailto:`, `App-Prefs:` und ähnliche), werden abgelehnt, und ein Link mit auch nur einem abgelehnten Callback wird ignoriert.

### Die UID

Hexadezimal in Großbuchstaben, ohne Trennzeichen, höchstwertiges Byte zuerst. An der Länge erkennst du die Chip-Familie:

<div class="page-cards-grid">

<article class="page-card">
<h3>NTAG, MIFARE Ultralight (ISO 14443-A)</h3>
<p>7 Byte</p>
<p><code>04A1B2C3D4E5F6</code></p>
</article>

<article class="page-card">
<h3>ICODE und andere ISO-15693-Tags</h3>
<p>8 Byte</p>
<p><code>E004015012345678</code></p>
</article>

</div>

ISO-15693-UIDs beginnen mit `E0`, in der Reihenfolge, die auf dem Chip aufgedruckt ist und die die meisten Lesegeräte anzeigen.

### Die NDEF-Nachricht

Mit `ndef=1` enthält `ndef` die rohe NDEF-Nachricht des Tags, also die Records ohne TLV-Header, als Base64url ohne Padding ([RFC 4648, Abschnitt 5](https://www.rfc-editor.org/rfc/rfc4648#section-5)): `-` und `_` statt `+` und `/`, und kein `=`. Enthält der Tag keine NDEF-Nachricht, fehlt der Parameter.

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

Deine URL wird so aufgerufen, wie sie ist, und das Ergebnis wird hinter die Parameter gehängt, die sie schon hat. Jeder Versuch löst genau einen Aufruf aus, die wartende Seite kann also aufhören zu warten, sobald er ankommt:

<div class="page-cards-grid">

<article class="page-card">
<h3><code>cancelled</code></h3>
<p>Die Person hat den Scan abgebrochen oder NFC.cool geschlossen, bevor ein Tag gelesen wurde.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>Es wurde nicht rechtzeitig ein Tag gefunden, oder der Tag ließ sich nicht lesen.</p>
</article>

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>Dieses iPhone hat keinen Zugang zu NFC.cool Business.</p>
</article>

</div>

Nach `cancelled` oder `scan-failed` kann die Person es noch einmal versuchen, und ein erfolgreicher Lesevorgang ruft `x-get` dann erneut mit der `uid` auf: Werte den jeweils letzten Aufruf zu einem `state` als Antwort. Antworte mit einem beliebigen 2xx-Status. Schlägt ein Erfolgsaufruf fehl, bietet NFC.cool an, ihn erneut zu senden.

### `x-post`

```
POST https://your-server.example/api/uid
Content-Type: application/json

{"uid":"04A1B2C3D4E5F6","state":"7f3c9a","readAt":"2026-11-19T09:30:00Z","ndef":"0QEFVAJkZUhp"}
```

Antworte innerhalb von 20 Sekunden mit einem beliebigen 2xx-Status. Alles andere gilt als Fehlschlag: Die Person kann den Request erneut senden, und beim Schließen von NFC.cool geht `delivery-failed` an `x-error`. Nimm `x-post`, wenn sich die Seite, die das Lesen gestartet hat, nicht per URL wieder öffnen lässt, zum Beispiel eine Web View in einer anderen App; die Person kehrt dann über den Link zurück, den iOS oben links anzeigt.

NFC.cool schickt bei `x-get` und `x-post` keine Cookies mit. Erkenne den Request am einmaligen `state`, den du in den Link gesetzt hast.

### `x-error`-Codes

<div class="page-cards-grid">

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>Dieses iPhone hat keinen Zugang zu NFC.cool Business.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>Es wurde nicht rechtzeitig ein Tag gefunden, oder der Tag ließ sich nicht lesen.</p>
</article>

<article class="page-card">
<h3><code>delivery-failed</code></h3>
<p>Der <code>x-post</code>-Request ist fehlgeschlagen.</p>
</article>

</div>

### Beispiel

Eine Seite, die auf ihren eigenen Server wartet, inklusive NDEF-Nachricht:

```html
<a href="https://nfc.cool/x-callback-url/read-uid?x-get=https%3A%2F%2Fexample.com%2Fnfc%3Fcode%3Dabc123&ndef=1&state=7f3c9a">
  Scan tag
</a>
```

</section>
