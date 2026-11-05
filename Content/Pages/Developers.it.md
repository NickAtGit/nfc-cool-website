---
title: "Sviluppatori"
slug: "developers"
description: "Come collegare NFC.cool alla tua infrastruttura: struttura del payload dei webhook, App Intents, schemi URL, feed leggibili dalle macchine e tutto il necessario per integrare NFC.cool lato server su iPhone e Android."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Per chi costruisce

NFC.cool è uno scanner che rispetta la tua infrastruttura. Ogni scansione può diventare un POST HTTP strutturato verso il tuo backend, in un JSON prevedibile, inviato direttamente dal dispositivo. Nessun intermediario, nessun account NFC.cool, nessun caricamento sui nostri server.

<a href="#webhook-payload" class="landing-cta-button">Guarda il payload</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/webhook.webp" alt="I dati di una scansione che arrivano a un endpoint webhook" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section">

## Dove si collega NFC.cool

Un webhook non è altro che un `POST` in JSON verso un indirizzo che controlli tu, quindi va bene qualsiasi cosa parli HTTP.

<div class="feature-capabilities-grid">

<article class="feature-capability-card">
<h3>Zapier</h3>
<p>Con il trigger "Catch Webhook" di Zapier indirizzi le scansioni verso oltre 5.000 app: CRM, fogli di calcolo, Slack e via dicendo. Il piano gratuito regge i volumi ridotti.</p>
</article>

<article class="feature-capability-card">
<h3>n8n</h3>
<p>Ospita n8n sui tuoi server per eseguire i flussi senza limiti e senza pagare a operazione. Il nodo HTTP Trigger accetta direttamente i POST di NFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>Make (l'ex Integromat)</h3>
<p>Editor visuale di flussi di lavoro, con un buon catalogo di app. Il modulo Webhooks fa da punto di ingresso per ogni scansione di NFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>IFTTT</h3>
<p>Per le catene semplici del tipo "se succede questo, allora fai quello". Il servizio Webhooks di IFTTT fornisce un indirizzo univoco da incollare nelle impostazioni webhook di NFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>Slack / Discord / Teams</h3>
<p>Punta il webhook a un incoming webhook di Slack (o al corrispettivo di Discord e Teams) per avvisare un canale ogni volta che qualcuno avvicina il telefono a un tag.</p>
</article>

<article class="feature-capability-card">
<h3>Il tuo backend</h3>
<p>Va bene qualsiasi endpoint HTTPS che accetti un POST in JSON. Più sotto trovi lo schema dei dati, il modello di autenticazione e alcuni ricevitori d'esempio.</p>
</article>

</div>

</section>

<section class="page-section">

## Gli scenari più diffusi

- **Inventario e tracciabilità.** Avvicini il telefono al tag di un oggetto, NFC.cool invia il POST a un foglio di calcolo o al gestionale di magazzino e compare una riga con data e ora, identificativo del tag e payload.
- **Raccolta dei contatti agli eventi.** Il visitatore avvicina il telefono al tag sul banner dello stand e il tuo CRM manda in automatico un'email di ricontatto.
- **Comandi per la casa intelligente.** Avvicini il telefono al tag sulla porta di casa per segnalare che sei rientrato e Home Assistant, Homey o Hubitat ricevono il webhook.
- **Gestione dei beni aziendali.** I manutentori avvicinano il telefono ai tag sui macchinari per registrare i controlli e il backend costruisce il registro per le verifiche di conformità.
- **Accrediti ai convegni.** Basta scansionare il badge NFC del partecipante e il webhook aggiorna in tempo reale la piattaforma dell'evento.

</section>

<section class="page-section" id="webhooks">

## Webhook

La configurazione sta nell'app, in **scheda Altro → Webhook**: inserisci un indirizzo HTTPS e, se vuoi, un nome utente e una password per l'HTTP Basic Auth, poi attiva separatamente "scansioni NFC" e "scansioni QR e codici a barre". Disponibile su iOS e Android.

L'app manda un solo `POST` per scansione all'indirizzo che hai configurato. Non c'è una coda di reinvio separata: se l'endpoint non risponde o restituisce un codice diverso da 2xx, il POST di quella scansione fallisce. In caso di successo conviene rispondere `204 No Content`; qualsiasi 2xx viene considerato un'accettazione.

Questa pagina è la documentazione tecnica. Per una panoramica della funzione, con gli altri quattro agganci di automazione su iOS, i prezzi e le domande frequenti, vai alla [pagina su webhook e automazioni](/it/features/webhooks/).

</section>

<section class="page-section" id="webhook-payload">

## Il payload del webhook

Content-type `application/json`, il corpo è un JSON formattato in modo leggibile:

```json
{
  "identifier" : "04:A2:7F:1B:5E:80:00",
  "date" : "2026-05-12T14:23:01Z",
  "content" : "https://example.com/check-in/abc123"
}
```

I tag strutturati (al momento solo OpenPrintTag) aggiungono altri due campi:

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

Descrizione dei campi:

- `identifier` - Nelle scansioni NFC è l'UID hardware del tag, in esadecimale maiuscolo separato dai due punti (per esempio `04:A2:7F:1B:5E:80:00`). Resta stabile per ogni tag, quindi si presta a scartare i duplicati. Nelle scansioni di codici QR e codici a barre è invece un UUID nuovo a ogni lettura, non un identificativo stabile del codice. Nelle vecchie modalità di compatibilità NFC di iOS, che non espongono l'UID, il valore è la stringa `NoIdentifierInCompatibilityMode`.
- `date` - In formato ISO 8601, indica quando è avvenuta la scansione sul dispositivo.
- `content` - Il contenuto decodificato: per l'NFC il valore del record NDEF (URI o testo), per i codici QR e a barre la stringa grezza appena letta.
- `tagType` - Assente nelle scansioni semplici. Vale `"openPrintTag"` quando si legge un OpenPrintTag.
- `structured` - Assente nelle scansioni semplici. Contiene il payload strutturato già interpretato quando è presente `tagType`.

</section>

<section class="page-section">

## Autenticazione

I webhook supportano **soltanto l'HTTP Basic Auth**. Da **scheda Altro → Webhook** puoi salvare un nome utente e una password nel portachiavi di iOS. A quel punto l'app risponde con quelle credenziali alle richieste standard `401 / WWW-Authenticate: Basic` del tuo server.

È quindi il tuo endpoint a decidere se l'autenticazione serve o no. Se non ti serve, lascia vuoti nome utente e password nell'app e non richiedere nulla dal server. Se invece ti serve, al primo POST rispondi con un `401` e l'intestazione `WWW-Authenticate: Basic realm="…"`: il dispositivo riprova con `Authorization: Basic …` e le credenziali salvate. Tutto viaggia su TLS e i server di NFC.cool non vedono mai le tue credenziali.

Al momento non sono supportati token Bearer, chiavi API o firme HMAC. Se ti servono, gestiscili su un reverse proxy (un Cloudflare Worker, nginx o simili) che converta il Basic Auth nello schema che usi tu.

</section>

<section class="page-section">

## Ricevitori di esempio

Vuoi vedere tutto il flusso dall'inizio alla fine? Clona il [server webhook di riferimento su GitHub](https://github.com/NickAtGit/nfc-cool-webhook-server), che registra ogni payload in diretta. Qui sotto trovi invece dei ricevitori minimi da adattare alla tua infrastruttura.

### cURL - prova al volo

```bash
curl -X POST https://your-server.example/webhook \
  -u 'nfc-cool:your-password' \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"04:A2:7F:1B:5E:80:00","date":"2026-05-12T14:00:00Z","content":"hello"}'
```

### Node.js - ricevitore con Express

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

### Python - ricevitore con FastAPI

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

## App Intents e Comandi Rapidi

Su **iOS**, NFC.cool Tools mette a disposizione alcuni App Intents da collegare all'app Comandi Rapidi, alle automazioni, alle modalità di concentrazione o ad Apple Intelligence.

<div class="page-cards-grid">

<article class="page-card">
<h3><code>Scan</code></h3>
<p>Avvia una scansione nella funzione che scegli: NFC, codici QR e a barre, documenti, oggetti 3D o ambienti.</p>
</article>

<article class="page-card">
<h3><code>Open Tab</code></h3>
<p>Apre NFC.cool su una scheda precisa (NFC, QR, documenti, 3D, altro) senza avviare nessuna scansione.</p>
</article>

<article class="page-card">
<h3><code>Get Last NFC Tag</code></h3>
<p>Restituisce come stringa il contenuto dell'ultimo tag NFC letto, comodo da passare in ingresso a un Comando rapido. Non apre l'app.</p>
</article>

<article class="page-card">
<h3><code>Get Last QR Code</code></h3>
<p>Restituisce il contenuto dell'ultimo codice QR o codice a barre letto. Non apre l'app.</p>
</article>

<article class="page-card">
<h3><code>Write NFC</code></h3>
<p>Apre la procedura di scrittura NFC già compilata con un indirizzo o un testo passato dal Comando rapido.</p>
</article>

</div>

Le varianti dedicate di iOS 18 (`NFC Scan`, `QR Scan`, `Document Scan`, `Object Scan`, `Room Scan`) compaiono direttamente in Spotlight e nel selettore del tasto Azione.

</section>

<section class="page-section" id="url-schemes">

## Schemi URL

Per i collegamenti diretti da altre app iOS, dai widget o dalle scorciatoie sulla schermata Home, NFC.cool Tools registra questi indirizzi:

```
nfcforiphone://scan-nfc
nfcforiphone://scan-code
nfcforiphone://scan-document
nfcforiphone://scan-object       (iOS 17+)
nfcforiphone://scan-room         (iOS 17+)
```

Aprendone uno si arriva subito allo scanner corrispondente. Sono registrati anche gli schemi `nfc://` e `geo://`, che ricevono i link a tag e coordinate provenienti da altre app.

</section>

<section class="page-section">

## Risorse leggibili dalle macchine

Feed pensati per strumenti automatici, motori di ricerca e agenti di IA:

<div class="page-cards-grid">

<article class="page-card">
<h3><a href="/sitemap.xml"><code>/sitemap.xml</code></a></h3>
<p>Indice completo del sito: tutti i percorsi con la data dell'ultima modifica.</p>
</article>

<article class="page-card">
<h3><a href="/llms.txt"><code>/llms.txt</code></a></h3>
<p>Mappa del sito in un formato adatto all'IA (generata in automatico da SiteKit).</p>
</article>

<article class="page-card">
<h3><a href="/feed.xml"><code>/feed.xml</code></a></h3>
<p>RSS di tutto il sito, con il testo integrale di ogni sezione.</p>
</article>

<article class="page-card">
<h3><a href="/blog/feed.xml"><code>/blog/feed.xml</code></a></h3>
<p>Feed RSS del solo blog.</p>
</article>

<article class="page-card">
<h3><a href="/changelog/feed.xml"><code>/changelog/feed.xml</code></a></h3>
<p>Feed delle uscite: versioni, date e voci del changelog.</p>
</article>

<article class="page-card">
<h3><a href="/assets/nav-index.json"><code>/assets/nav-index.json</code></a></h3>
<p>Indice di navigazione strutturato con titoli, riassunti, tag e indirizzi.</p>
</article>

<article class="page-card">
<h3><a href="/assets/search-index.json"><code>/assets/search-index.json</code></a></h3>
<p>Il testo semplice di ogni articolo, per la ricerca lato client.</p>
</article>

</div>

Stai costruendo qualcosa su NFC.cool? Oppure conosci un servizio che meriterebbe di stare in questa pagina? [Scrivici due righe](mailto:info@nfc.cool?subject=NFC.cool%20Support).

</section>
