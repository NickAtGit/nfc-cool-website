---
title: "NFC.cool x-callback-url"
slug: "x-callback-url"
description: "Altre app e pagine web possono chiedere a NFC.cool su iPhone di fare qualcosa e ricevere il risultato, secondo la convenzione x-callback-url."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# NFC.cool x-callback-url

Altre app e pagine web possono chiedere a NFC.cool su iPhone di fare qualcosa e ricevere il risultato, secondo la convenzione [x-callback-url](https://x-callback-url.com).

Webhook, Comandi rapidi e schemi URL sono nella [pagina per sviluppatori](/it/developers/).

<a href="#read-uid" class="landing-cta-button">Leggi la documentazione</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/nfc-scan-tag.webp" alt="iPhone che scansiona un tag NFC" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section" id="read-uid">

## Leggere l'ID di un tag dalla tua app o pagina web

Con un link chiedi a NFC.cool di scansionare un tag e di restituirti il suo UID e, con `ndef=1`, anche il messaggio NDEF del tag. Funziona da qualsiasi pagina web o app su iPhone e non richiede nessuna configurazione oltre all'installazione di NFC.cool. Il link segue la convenzione [x-callback-url](https://x-callback-url.com). La lettura dei tag per altre app e siti web fa parte di NFC.cool Business, la licenza aziendale di NFC.cool per iPhone: [scrivici](mailto:info@nfc.cool?subject=NFC.cool%20Business) per averne una.

```
https://nfc.cool/x-callback-url/read-uid?<parameters>
nfcforiphone://x-callback-url/read-uid?<parameters>
```

Le due forme fanno la stessa cosa. Preferisci quella `https`: su un iPhone senza NFC.cool apre una pagina che spiega come installarla, invece di fallire senza dire nulla. Mettila in un link che la persona tocca: iOS non apre le app per i link che uno script segue da solo.

NFC.cool passa in primo piano, mostra chi riceverà l'ID del tag e avvia la scansione. Se è già aperto un link read-uid, quello più recente lo sostituisce e chi l'aveva chiamato prima riceve `cancelled`.

### Parametri

<div class="page-cards-grid">

<article class="page-card">
<h3><code>x-get</code></h3>
<p>NFC.cool chiama questo URL in background, con il risultato nei parametri della query. Qui arriva subito ogni esito, errori e annullamenti compresi.</p>
<p><strong>Obbligatorio:</strong> <code>x-get</code>, <code>x-post</code> o <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-post</code></h3>
<p>NFC.cool invia qui il risultato in JSON con una richiesta POST.</p>
<p><strong>Obbligatorio:</strong> <code>x-get</code>, <code>x-post</code> o <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-success</code></h3>
<p>Si apre dopo una lettura riuscita, con <code>uid</code>, <code>ndef</code> e <code>state</code> aggiunti in coda. Insieme a <code>x-get</code> o <code>x-post</code> riceve solo <code>state</code>: l'UID va al server mostrato alla persona e a nessun altro.</p>
<p><strong>Obbligatorio:</strong> <code>x-get</code>, <code>x-post</code> o <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-error</code></h3>
<p>Si apre quando la persona chiude NFC.cool dopo un errore, con <code>errorCode</code>, <code>errorMessage</code> e <code>state</code>.</p>
<p><strong>Obbligatorio:</strong> no</p>
</article>

<article class="page-card">
<h3><code>x-cancel</code></h3>
<p>Si apre quando la persona annulla, con <code>state</code>.</p>
<p><strong>Obbligatorio:</strong> no</p>
</article>

<article class="page-card">
<h3><code>state</code></h3>
<p>Una stringa qualsiasi, per esempio un ID di richiesta monouso. Torna invariato con ogni risultato.</p>
<p><strong>Obbligatorio:</strong> no, ma consigliato</p>
</article>

<article class="page-card">
<h3><code>ndef</code></h3>
<p>Con <code>1</code> si legge anche il messaggio NDEF del tag. Senza, si legge solo l'UID.</p>
<p><strong>Obbligatorio:</strong> no</p>
</article>

</div>

Usa `x-get` oppure `x-post`, non entrambi. Codifica come URL ogni valore di callback.

Questo link può aprirlo qualsiasi pagina web, quindi NFC.cool richiama solo URL `https` e schemi URL di altre app, come `yourapp://nfc-done`; `x-get` e `x-post` devono essere `https`. Vengono rifiutati `http` semplice, `javascript:`, `data:`, `tel:`, gli schemi di NFC.cool stesso e gli schemi di sistema che agiscono da soli (`shortcuts:`, `itms-services:`, `mailto:`, `App-Prefs:` e simili), e un link con anche un solo callback rifiutato viene ignorato.

### L'UID

Esadecimale maiuscolo, senza separatori, con il byte più significativo per primo. La lunghezza distingue le famiglie di chip:

<div class="page-cards-grid">

<article class="page-card">
<h3>NTAG, MIFARE Ultralight (ISO 14443-A)</h3>
<p>7 byte</p>
<p><code>04A1B2C3D4E5F6</code></p>
</article>

<article class="page-card">
<h3>ICODE e altri tag ISO 15693</h3>
<p>8 byte</p>
<p><code>E004015012345678</code></p>
</article>

</div>

Gli UID ISO 15693 iniziano con `E0`, nell'ordine stampato sul chip e mostrato dalla maggior parte dei lettori.

### Il messaggio NDEF

Con `ndef=1`, `ndef` contiene il messaggio NDEF grezzo del tag, cioè i record senza l'intestazione TLV, in Base64url senza padding ([RFC 4648, sezione 5](https://www.rfc-editor.org/rfc/rfc4648#section-5)): `-` e `_` al posto di `+` e `/`, e nessun `=`. Il campo manca quando il tag non contiene un messaggio NDEF.

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

L'URL viene chiamato così com'è, con il risultato aggiunto dopo i parametri che contiene già. Ogni tentativo riceve esattamente una chiamata, quindi la pagina in attesa può fermarsi appena arriva:

<div class="page-cards-grid">

<article class="page-card">
<h3><code>cancelled</code></h3>
<p>La persona ha annullato la scansione o ha chiuso NFC.cool prima di leggere un tag.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>Nessun tag trovato in tempo, oppure il tag non si è potuto leggere.</p>
</article>

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>Questo iPhone non ha accesso a NFC.cool Business.</p>
</article>

</div>

Dopo `cancelled` o `scan-failed` la persona può riprovare, e una lettura riuscita chiama di nuovo `x-get` con l'`uid`: considera valida l'ultima chiamata ricevuta per uno `state`. Rispondi con uno stato 2xx qualsiasi. Se la chiamata di una lettura riuscita non va a buon fine, NFC.cool propone di inviarla di nuovo.

### `x-post`

```
POST https://your-server.example/api/uid
Content-Type: application/json

{"uid":"04A1B2C3D4E5F6","state":"7f3c9a","readAt":"2026-11-19T09:30:00Z","ndef":"0QEFVAJkZUhp"}
```

Rispondi con uno stato 2xx qualsiasi entro 20 secondi. Ogni altra risposta conta come errore: la persona può inviare di nuovo il risultato e, quando chiude NFC.cool, a `x-error` arriva `delivery-failed`. Usa `x-post` quando la pagina che ha avviato la lettura non si può riaprire tramite URL, per esempio una web view dentro un'altra app; la persona ci torna con il link che iOS mostra nell'angolo in alto a sinistra.

NFC.cool non invia cookie con `x-get` né con `x-post`. Riconosci la richiesta dallo `state` monouso che hai messo nel link.

### Codici di `x-error`

<div class="page-cards-grid">

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>Questo iPhone non ha accesso a NFC.cool Business.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>Nessun tag trovato in tempo, oppure il tag non si è potuto leggere.</p>
</article>

<article class="page-card">
<h3><code>delivery-failed</code></h3>
<p>La richiesta <code>x-post</code> non è andata a buon fine.</p>
</article>

</div>

### Esempio

Una pagina che attende il proprio server e chiede anche il messaggio NDEF:

```html
<a href="https://nfc.cool/x-callback-url/read-uid?x-get=https%3A%2F%2Fexample.com%2Fnfc%3Fcode%3Dabc123&ndef=1&state=7f3c9a">
  Scan tag
</a>
```

</section>
