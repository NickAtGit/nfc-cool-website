---
id: "google-review-nfc-stand-2026-10"
title: "Come creare da te un espositore NFC per le recensioni Google"
date: "2026-10-15"
tags: ["guides", "nfc-tags", "business-cards"]
summary: "Quei piccoli espositori per le recensioni Google sui banconi dei bar non sono altro che un tag NFC e un codice QR che puntano a un link. Ti mostro come crearne uno da te, e perché sui tavoli del Piano Negro c'è l'intero biglietto da visita del locale, fatto con NFC.cool Business Card, e non solo il link per le recensioni."
image: "/assets/images/Blog/google-review-nfc-stand.webp"
imageAlt: "Un espositore in plexiglass trasparente sul tavolino di un bar, con un cartoncino che mostra cinque stelle dorate, il simbolo NFC e un codice QR, accanto a un iPhone con una schermata di recensione a cinque stelle"
author: "Nicolo Stanciu"
metaTitle: "Espositore NFC per recensioni Google: crealo da te"
metaDescription: "Un espositore per le recensioni Google è solo un tag NFC e un codice QR. Come crearne uno da te e portare menu, social e link per le recensioni su ogni tavolo."
ogTitle: "Un espositore per le recensioni Google, fatto in casa"
ogDescription: "Un tag NFC, un codice QR e un espositore in plexiglass. Così ho portato menu, social e link per le recensioni Google su ogni tavolo di un bar."
---

Negli ultimi due anni li ho visti spuntare ovunque: piccoli espositori in plexiglass accanto alla cassa, sui tavoli dei ristoranti, al bancone del parrucchiere. "Lasciaci una recensione su Google", cinque stelle, un codice QR e quasi sempre un piccolo simbolo NFC. Avvicini il telefono e si apre una pagina per scrivere la recensione.

Di mestiere sviluppo un'app NFC, quindi ovviamente volevo sapere cosa ci fosse dentro. Un chip speciale di Google? Un accordo segreto?

Niente di tutto questo. È un normalissimo tag NFC con un codice QR stampato, ed entrambi puntano a un link. Il trucco è tutto qui, e significa che puoi costruirtene uno in un pomeriggio.

---

## Cosa c'è davvero dentro un espositore per le recensioni Google

Il tag NFC di questi espositori è lo stesso adesivo economico che [si compra in confezioni da cinquanta](/affiliate-links/). Qualcuno ci ha scritto sopra un unico link. Il codice QR lì accanto è lo stesso link, stampato sotto forma di quadratini, per chi ha un telefono senza NFC o con l'NFC disattivato.

La parte interessante è il link. Google ha un indirizzo che porta il cliente dritto al modulo di recensione di una precisa attività, identificata dal suo **Place ID**. Ogni attività su Google Maps ne ha uno, e se la tua non c'è ancora, Google spiega come [creare un Profilo dell'attività](https://support.google.com/business/answer/2911778?hl=it). Scrivi quel link su un tag, e avvicinare il telefono all'espositore diventa la strada più breve tra un "che bella serata" e una recensione scritta.

---

## Quello che Google non ti dice

Prima di metterti all'opera, ecco alcune cose che ho imparato a mie spese durante i test.

**Il link non riesce ad aprire l'app Google Maps.** È stata la prima cosa che ho provato, perché mi sembrava la soluzione più ovvia: avvicini il telefono all'espositore, si apre Google Maps e sale il pannello della recensione. Ho provato tutte le varianti del link che sono riuscito a trovare. Non c'è verso. A quanto pare Google non vuole proprio che i link per le recensioni aprano direttamente l'app.

**La versione nel browser, in realtà, va benissimo.** Quello che *funziona* è un link che apre una pagina nel browser, dove il cliente sceglie subito le stelle e scrive due righe. È rapido, non richiede nessuna app installata e funziona allo stesso modo su iPhone e su Android.

**Il cliente deve aver effettuato l'accesso a Google.** Una recensione conta solo se arriva da un account Google. La maggior parte dei telefoni Android è già collegata a un account Google, e molti utenti iPhone hanno l'accesso attivo nel browser. Agli altri verrà chiesto di accedere prima. Né io né te possiamo farci niente, e a dirla tutta è anche questo che impedisce alle recensioni Google di finire sommerse dallo spam.

---

## Perché sui tavoli del Piano Negro non c'è solo il link per le recensioni

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/card-top-440w.webp" alt="Il biglietto da visita NFC.cool Business Card del Piano Negro aperto in Safari, con il logo e i link al menu in portoghese e in inglese, WhatsApp, Instagram, Google Maps e Google Review"><p><strong>Il biglietto del Piano Negro.</strong> Quello che vede il cliente dopo aver avvicinato il telefono all'espositore sul tavolo.</p></li>
</ol>
</figure>

Il [Piano Negro](https://mycard.nfc.cool/PianoNegro/Piano-Negro) è un bar di Coimbra aperto dal 1993. Quando ho aiutato il proprietario a preparare gli espositori, sui tavoli non abbiamo messo solo un link per le recensioni. Chi si siede a un tavolo non sta ancora pensando alle recensioni. Vuole vedere cosa c'è nel menu.

Così su ogni tavolo del Piano Negro c'è un espositore con il biglietto da visita del bar, fatto con **[NFC.cool Business Card](/business-card/)**. Avvicini il telefono, o scansioni il codice QR, e si apre il biglietto con tutto quello che un cliente può cercare, ogni voce a un tocco di distanza:

- il menu, in portoghese e in inglese
- WhatsApp
- Instagram, TikTok e Facebook
- Google Maps
- il link per le recensioni Google, e TripAdvisor
- e perfino la playlist Spotify del bar

[Apri il loro biglietto](https://mycard.nfc.cool/PianoNegro/Piano-Negro) e guarda con i tuoi occhi cosa vede un cliente. E i clienti lo usano proprio come ci si augura: aprono il menu, cercano il bar su Instagram e lasciano una recensione, tutto dallo stesso espositore.

L'altra cosa che mi piace di questa soluzione è che l'espositore non invecchia mai. Il tag e il codice QR contengono il link del biglietto, non il menu. Quando il menu cambia, aggiorni il link nell'app e su ogni tavolo c'è già quello nuovo. Niente ristampe, niente tag da riscrivere.

---

## Cosa ti serve

La lista della spesa è piacevolmente corta:

- **Tag NFC.** Un semplice adesivo NTAG213 basta e avanza, e i link di questo articolo ci stanno con spazio in abbondanza. Se hai dubbi sui tipi di tag, la mia [guida ai tag NFC per iPhone](/blog/nfc-tag-types-for-iphones/) spiega le differenze.
- **Espositori in plexiglass trasparente** in cui infilare un cartoncino stampato. Si vendono come portamenu o portacartelli da tavolo e costano pochi euro l'uno.
- **Una stampante a colori.**
- **[NFC.cool Business Card](/business-card/)** per gli espositori sui tavoli.
- **NFC.cool Tools** per creare il link per le recensioni e proteggere i tag con una password, su [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-google-review-nfc-stand-it&mt=8) e [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-google-review-nfc-stand-it).

---

## L'espositore da tavolo: la tua attività come biglietto da visita

Anche se si chiama biglietto da visita, non deve per forza essere quello di una persona. Lascia vuoti i campi del nome, compila solo il nome dell'azienda e il logo, e il biglietto diventa quello della tua attività.

<figure class="phone-figure" data-layout="stage">
<figcaption>Preparare l'espositore da tavolo</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/table-1-links-440w.webp" alt="L'editor di NFC.cool Business Card con cinque link chiamati Menu, WhatsApp, Instagram, Google Maps e Google Review"><p><strong>Link.</strong> Dai a ogni link un nome che i clienti capiscano al volo.</p></li>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/table-2-write-tag-440w.webp" alt="Le azioni di un biglietto in NFC.cool Business Card, tra cui Scrivi sul tag NFC e Mostra codice QR"><p><strong>Scrivi sul tag NFC.</strong> Si trova tra le azioni del biglietto. Poi avvicina il telefono all'adesivo.</p></li>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/table-3-qr-code-440w.webp" alt="Il codice QR di un biglietto in NFC.cool Business Card, con sotto Condividi e Salva in Foto"><p><strong>Mostra codice QR.</strong> Con Salva in Foto ottieni un'immagine per il cartoncino stampato.</p></li>
</ol>
</figure>

### Passo 1: aggiungi i link

Nella sezione **Link**, tocca **Aggiungi link** per tutto quello che un cliente potrebbe cercare: il menu, WhatsApp, Instagram e gli altri social su cui sei presente, la posizione su Google Maps e il link per le recensioni Google. Se il menu è un PDF, deve stare da qualche parte online, per esempio sul sito del locale, altrimenti non hai un indirizzo da collegare.

Dai a ogni link un nome che i clienti capiscano al volo, come "Menu" o "Lasciaci una recensione". Il Piano Negro ha due link al menu, uno per lingua, così chi arriva dall'estero trova un menu che riesce a leggere.

Se non hai ancora il link per le recensioni, te lo crea NFC.cool Tools con **Link alla recensione di Google**. Ti spiego come più sotto, nella parte sull'espositore alla cassa.

### Passo 2: scrivi il tag e salva il codice QR

Apri le azioni del biglietto e scegli **Scrivi sul tag NFC**, poi avvicina il telefono all'adesivo. Per il cartoncino stampato, scegli **Mostra codice QR** e poi **Salva in Foto**: avrai un'immagine da inserire in qualsiasi grafica.

### Passo 3: stampa e prova

Prepara un cartoncino semplice per l'espositore: il logo, una frase breve come "Menu, Instagram e altro ancora", il codice QR e un piccolo simbolo NFC con accanto la scritta "oppure avvicina qui il telefono". Stampalo, infilalo nell'espositore e attacca il tag dietro il cartoncino, proprio in corrispondenza del simbolo. Plexiglass e carta non schermano affatto l'NFC, quindi il tag si legge benissimo anche attraverso. L'importante è tenerlo lontano dal metallo, che invece lo scherma.

Prima di metterlo sul tavolo, provalo con un paio di telefoni diversi.

---

## L'espositore alla cassa: dritti alla pagina della recensione

Il Piano Negro si ferma agli espositori sui tavoli. Se dovessi allestire un negozio da zero, ne aggiungerei un altro proprio alla cassa, con sopra soltanto il link per le recensioni. È il momento in cui le persone hanno appena concluso la visita, il ricordo è ancora fresco e nessuno sta più aspettando niente. Basta avvicinare il telefono e si ritrovano sul modulo della recensione, senza menu di mezzo.

<figure class="phone-figure" data-layout="stage">
<figcaption>Creare il link per le recensioni</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/cashier-1-search-440w.webp" alt="La schermata Link alla recensione di Google in NFC.cool Tools, con Piano Negro Coimbra digitato nel campo di ricerca e un solo risultato, Piano Negro in Rua Borges Carneiro"><p><strong>Cerca.</strong> Digita il nome dell'attività e sceglila tra i risultati.</p></li>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/cashier-2-selected-440w.webp" alt="Piano Negro come attività selezionata, con sotto Anteprima su Google Maps e Anteprima della pagina di recensione"><p><strong>Anteprima.</strong> Controlla che sia l'attività giusta prima di salvare.</p></li>
</ol>
</figure>

### Passo 1: crea il link per le recensioni

Apri NFC.cool Tools, vai a creare un nuovo messaggio NFC e scegli **Link alla recensione di Google**. Digita il nome dell'attività e sceglila tra i risultati. Sotto ogni risultato compare l'indirizzo, e questo aiuta se in città ci sono più locali con nomi simili.

Se hai già aperto Google Maps, c'è un modo ancora più rapido. Cerca lì la tua attività, tocca **Condividi** e mandala direttamente a NFC.cool, oppure copia il link e incollalo nell'app. Sarà l'app a ricavare l'attività dal link di Maps.

Prima di salvare, tocca **Anteprima della pagina di recensione**. Si apre esattamente quello che vedranno i clienti, così hai la certezza che sia l'attività giusta. Sembra scontato, ma mi è capitato di vedere un bar con lo stesso nome a due strade di distanza, e raccogliere recensioni per la concorrenza è l'ultima cosa che vuoi.

Se l'attività non compare proprio, probabilmente non ha ancora un Profilo dell'attività su Google. Nella stessa schermata trovi un link alla guida di Google per crearne uno.

### Passo 2: scrivi il tag

Salva il link e scrivilo sull'adesivo NFC avvicinandoci il telefono. Se non hai mai scritto un tag, ti spiego tutto passo per passo in [come scrivere i tag NFC con l'iPhone](/blog/write-nfc-tags-iphone/).

### Passo 3: crea il codice QR

Non tutti avvicineranno il telefono. Qualcuno non sa nemmeno che il telefono lo permetta, e su Android l'NFC si può disattivare. Il codice QR è la rete di sicurezza.

Crea un codice QR con la stessa opzione **Link alla recensione di Google**, nella sezione QR dell'app. Da lì lo condividi come immagine, oppure prima lo apri in **QR Code Studio** per dargli i colori del locale e intonarlo al resto del cartoncino. Poi stampa il cartoncino con una frase come "Ti è piaciuta l'esperienza? Raccontacelo su Google" e infilalo nell'espositore, con il tag dietro.

---

## Proteggi ogni tag con una password

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/password-440w.webp" alt="La schermata Protezione con password in NFC.cool Tools, con Attiva la password e Disattiva la password"><p><strong>Protezione con password.</strong> In NFC.cool Tools, per i tag NTAG 2xx.</p></li>
</ol>
</figure>

Un espositore sta in un luogo pubblico, che sia su un tavolo o alla cassa. Senza protezione, chiunque abbia un'app NFC potrebbe passare di lì e riscrivere il tag con tutt'altro, e tu non te ne accorgeresti finché non te lo fa notare un cliente.

Potresti bloccare il tag in modo definitivo, ma io preferisco proteggerlo con una password. In NFC.cool Tools apri **Protezione con password**, scegli **Attiva la password**, inserisci una password e avvicina il telefono al tag. I clienti continuano a leggerlo come prima: la password serve solo per scriverci sopra. E a differenza del blocco, è reversibile: se un giorno l'attività si trasferisce, o vuoi che il tag porti altrove, togli la password e lo riscrivi. Vale anche per i tag del biglietto da visita, perché la password protegge il tag, non quello che contiene. Serve un tag NTAG 2xx, come gli adesivi NTAG213 della lista della spesa.

Attiva **Salva per dopo**, così l'app si ricorda la password al posto tuo. Se la perdi, quel tag non lo potrai più modificare.

---

## Chiedi a tutti una recensione sincera

Su una cosa ti chiedo un po' di attenzione: invita *tutti* i clienti a lasciare una recensione, e chiedi un giudizio sincero, nel bene e nel male, non le cinque stelle. Le norme di Google sulle recensioni vietano alle attività di chiederle solo ai clienti che sembrano soddisfatti o di offrire qualcosa in cambio, come un drink gratis o uno sconto. Chi infrange queste regole rischia che le recensioni vengano rimosse, o peggio. E a dirla tutta, al cliente successivo un insieme di recensioni vere ispira molta più fiducia di una sfilza di cinque stelle fin troppo perfette.

---

## In conclusione

Un espositore per le recensioni Google è una di quelle cose che sembrano un prodotto ma in realtà sono solo un link su un adesivo. E visto che un adesivo su ogni tavolo lo metti comunque, tanto vale che porti menu, social e link per le recensioni, tutto insieme.

Per gli espositori sui tavoli ti serve NFC.cool Business Card, su [iPhone](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-google-review-nfc-stand-it&mt=8) e [Android](https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-google-review-nfc-stand-it). Le funzioni Link alla recensione di Google e Protezione con password si trovano in NFC.cool Tools, su [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-google-review-nfc-stand-it&mt=8) e [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-google-review-nfc-stand-it). E se ne costruisci uno per il tuo locale, mi farebbe davvero piacere vederne una foto.
