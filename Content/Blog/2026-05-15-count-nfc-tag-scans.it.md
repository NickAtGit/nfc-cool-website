---
id: "count-nfc-tag-scans-2026-05"
title: "Come contare le scansioni di un tag NFC senza un server"
date: "2026-05-15"
tags: ["nfc-tags", "guides"]
summary: "Scrivi lo stesso indirizzo su 50 adesivi NFC e non saprai più quale è stato avvicinato, a meno che a contare non sia il tag stesso. Ecco come si fa."
image: "/assets/images/Blog/count-nfc-tag-scans.webp"
imageAlt: "Un telefono avvicinato a un tag NFC, con accanto il numero delle scansioni che sale"
author: "Nicolo Stanciu"
metaTitle: "Come contare le scansioni di un tag NFC senza un server"
metaDescription: "Scopri quante volte un tag NFC è stato avvicinato, e quale tag fosse, grazie al contatore integrato nel chip. Niente backend, niente internet: guida pratica."
ogTitle: "Come contare le scansioni di un tag NFC senza un server"
ogDescription: "Un tag NFC sa contare da solo le proprie scansioni. Ecco come sfruttarlo per misurare l'interesse, per le edizioni limitate e contro la contraffazione."
---

Immagina di stampare lo stesso indirizzo su cinquanta adesivi NFC e di attaccarli su cinquanta prodotti, cinquanta manifesti o cinquanta biglietti da visita. Una settimana dopo arriva la domanda scontata: quale è stato avvicinato davvero? E quante volte?

Sviluppo NFC.cool da anni e la risposta che sento di solito è: un server. Generi cinquanta link univoci, li fai puntare tutti a un backend e lasci contare le visite a un software di analisi. Funziona, però da quel momento ti ritrovi un'infrastruttura da mandare avanti, da pagare e da tenere in piedi per tutto il tempo in cui quegli adesivi esisteranno. Mi è sempre sembrato un meccanismo troppo complicato per una domanda così semplice.

C'è una strada più corta, e da sempre si trova dentro al chip NFC. Molti tag sanno contare da soli le proprie scansioni. Configurato a dovere, un tag ti dice quante volte è stato letto e quale tag sia, senza nessun backend di mezzo. È uno dei giochi di prestigio NFC che mi diverte di più mostrare in giro, quindi ecco come funziona e come si mette in piedi.

---

## Che cos'è davvero il contatore degli avvicinamenti

Quasi tutti gli [adesivi NFC in commercio](/affiliate-links/) montano chip della famiglia NTAG21x: `NTAG213`, `NTAG215` e `NTAG216`. Questi chip hanno una piccola funzione che, a quanto vedo, quasi nessuno sa di avere tra le mani: un contatore integrato. A ogni lettura del tag sale di uno. Vive nell'hardware del chip, non in un'app e non su un server. (Se vuoi la panoramica approfondita su questi chip, ne ho scritto nella guida ai [tipi di tag NFC per iPhone](/blog/nfc-tag-types-for-iphones/).)

Io lo descrivo come il contachilometri del tag. Il contachilometri di un'auto conta i chilometri anche quando nessuno lo guarda, e il contatore NFC conta le letture allo stesso modo. Il numero c'è sempre. L'unica domanda è se qualcosa sia configurato per mostrartelo.

È esattamente il compito del contatore degli avvicinamenti di NFC.cool Tools, ed è la parte di cui vado più fiero. Configura il tag una volta sola e da lì in poi è il tag stesso a comunicare il proprio conteggio. Non serve che sia tu a scansionarlo per leggere il numero, e non serve che l'app sia presente quando lo avvicinano gli altri. A contare e a riferire ci pensa il tag da solo.

Gli stessi chip portano anche un ID univoco: un numero di serie inciso in fabbrica, un po' come l'indirizzo MAC di una scheda di rete. Anche quello il contatore sa tirarlo fuori, ed è ciò che ti permette di distinguere cinquanta adesivi identici uno dall'altro.

---

## Come funziona, senza tecnicismi

Quando scrivi un contenuto su un tag con il contatore attivo, l'app fa una cosa che trovo davvero ingegnosa: inserisce nel contenuto una fila di caratteri segnaposto, che tengono il posto del conteggio e dell'ID. Anche adesso che l'ho sviluppata io, quella parte mi sembra ancora un trucco da illusionista.

Da lì in poi al resto pensa il chip. Come dice la schermata di aiuto dentro l'app: "L'app inserisce dei byte segnaposto nel contenuto. A ogni scansione il chip li sostituisce con il conteggio aggiornato degli avvicinamenti, e volendo con l'ID del tag, prima che l'iPhone lo legga. Non servono né server né internet."

A ogni avvicinamento, quindi, la sequenza è questa. Qualcuno tiene il telefono vicino al tag. Il chip si sveglia, fa salire il contatore, sostituisce i segnaposto con i numeri veri e solo a quel punto passa al telefono il contenuto finito. Il telefono che ha scansionato il tag un segnaposto non lo vede mai: vede un indirizzo completo, con il conteggio aggiornato già dentro.

Quello che voglio ti resti in mente è che la configurazione si fa una volta sola. Dopo quella prima scrittura il tag va avanti da sé: conta e sostituisce a ogni avvicinamento, di chiunque, da qualsiasi telefono, per tutta la vita dell'adesivo. In quella catena non c'è niente che passi da internet. A contare è il chip. A sostituire è il chip. Se poi fai puntare l'indirizzo finito a un sito tuo, il conteggio arriverà anche al tuo server, ma è una scelta tua, non un requisito della funzione.

---

## A cosa serve, in concreto

Un tag che si conta da solo sembra un bel gioco finché non lo abbini a un problema vero. Questi sono i quattro impieghi a cui torno ogni volta che qualcuno mi chiede a cosa serva.

**Capire quale adesivo è stato scansionato.** È il problema dei cinquanta adesivi con cui si apre questo articolo. Scrivi lo stesso indirizzo su tutti i tag, attiva l'ID e ogni avvicinamento arriva già timbrato con il numero di serie del tag esatto da cui proviene. Un solo indirizzo da gestire, cinquanta tag comunque riconoscibili uno per uno.

**Mettere un limite agli accessi gratuiti.** Il conteggio viaggia insieme a ogni avvicinamento, quindi ci si può costruire sopra qualcosa. Fai una promozione in cui le prime cento scansioni ricevono la versione dimostrativa e tutte le altre vengono mandate altrove. Una tiratura limitata può distribuire il premio pieno finché il contatore non supera la soglia che hai scelto. È il tag a far rispettare il "chi primo arriva, meglio alloggia", senza nessun sistema di registrazione dietro.

**Misurare l'interesse.** Attacca un tag su un biglietto da visita, un manifesto, la scatola di un prodotto o la vetrina di un negozio e il contatore diventa una misura discreta dell'interesse. Sapere se un biglietto è stato avvicinato due volte o duecento non richiede di costruirci intorno un impianto di analisi.

**Dimostrare l'autenticità.** Il contatore può solo salire e non si può riportare indietro. Un numero che cresce e basta è difficile da falsificare in modo credibile, ed è per questo che secondo me si guadagna un posto nelle edizioni limitate e nei controlli anticontraffazione. Un tag autentico ha una storia plausibile, che sale nel tempo; una copia no. Se questo lato dell'NFC ti interessa, l'ho approfondito in [come l'NFC custodisce i segreti cifrati](/blog/nfc-safe-encrypted-secrets/).

Mettine insieme un paio e ottieni una cosa così: un artigiano infila un tag in ogni pezzo di una serie numerata, tutti puntati alla stessa pagina. L'ID gli dice quale pezzo ha in mano chi ha comprato, il conteggio gli dice quante volte quella persona è tornata e, siccome il numero può solo salire, un rivenditore non riesce a spacciare in sordina una copia per l'originale. Niente account, niente database, nessun canone mensile: solo il chip che fa il suo mestiere. È per risultati così che ho sviluppato questa funzione.

---

## La configurazione, passo dopo passo

La funzione si trova in NFC.cool Tools, sia su iPhone sia su Android. Fa parte dell'abbonamento Pro (Platinum), che serve quindi per scrivere i tag con il contatore attivo. Se non hai mai scritto un tag, la mia guida su [come scrivere i tag NFC con l'iPhone](/blog/write-nfc-tags-iphone/) parte dalle basi.

1. Apri NFC.cool Tools, vai alla sezione **NFC Tools** e tocca **Contatore degli avvicinamenti**.
2. Scegli che cosa deve trasmettere il tag: un **URL**, una **email**, un **SMS** o un **comando rapido**. (I comandi rapidi esistono solo su iOS, perché Comandi Rapidi è un'app di Apple; URL, email e SMS funzionano su entrambe le piattaforme.)
3. Componi quel contenuto come faresti di solito: digita il link, scrivi il messaggio, scegli il comando rapido.
4. Attiva le opzioni che ti servono: **Contatore degli avvicinamenti** aggiunge il conteggio aggiornato, **ID del tag** aggiunge il numero di serie del tag. Va bene una sola delle due, vanno bene entrambe.
5. Se stai programmando una serie di tag con lo stesso contenuto, attiva la **scrittura in serie**: lo scanner resta aperto e scrivi un tag dopo l'altro.
6. Dai un'occhiata all'**anteprima**. Mostra un esempio del risultato con valori fittizi, così vedi esattamente dove finiranno conteggio e ID prima di scrivere davvero.
7. Tocca **Scrivi sul tag NFC** e avvicina un tag al bordo superiore del telefono.

La configurazione finisce qui, e l'ho tenuta apposta così breve. Da quel momento il tag si arrangia da solo: conta e riferisce per conto proprio, con chiunque lo avvicini, app o non app.

Se a un certo punto vuoi fermarlo, l'app disattiva il contatore su un tag già scritto. Il chip smette di inserire i valori aggiornati, ma il contenuto resta sul tag esattamente com'era all'ultima scrittura. Un dettaglio che vale la pena conoscere: internamente il chip continua a contare anche dopo che hai spento la sostituzione. Il conteggio non si perde mai, semplicemente smette di essere mostrato.

<figure class="phone-figure" data-layout="stage">
<figcaption>Configurare un tag che conta</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/count-nfc-tag-scans/1-tap-counter-440w.webp" alt="La schermata NFC Tap Counter di NFC.cool Tools: un link che aggiorna il conteggio dei tocchi e l'ID del tag a ogni lettura, per NTAG213, NTAG215 e NTAG216"><p><strong>NFC Tap Counter.</strong> In NFC Tools, per tag NTAG213, 215 e 216.</p></li>
<li><img src="/assets/images/Blog/screens/count-nfc-tag-scans/2-content-440w.webp" alt="Le opzioni di contenuto URL, Email, SMS e Shortcut, con Try it out sotto"><p><strong>Scegli il contenuto.</strong> Un URL, un'email, un SMS o, su iPhone, un comando rapido.</p></li>
<li><img src="/assets/images/Blog/screens/count-nfc-tag-scans/3-preview-440w.webp" alt="NFC Tap Counter e NFC Tag ID attivi, Batch write spento, e l'anteprima https://studionord.example/table-7?nfc=049F50824F1390x000007, con Write to NFC Tag"><p><strong>Interruttori e anteprima.</strong> L'anteprima mostra dove finiranno l'ID del tag e il conteggio, prima di scrivere.</p></li>
</ol>
</figure>

---

## Dove finiscono il conteggio e l'ID del tag

Il punto in cui compaiono i valori dipende dal tipo di contenuto che hai scelto. Con entrambe le opzioni attive, ID e conteggio vengono inseriti insieme: prima l'ID, poi il conteggio, uniti da una piccola `x`. Prendendo `049F50824F1390` come ID del tag e `000007` come conteggio, ecco il prima e il dopo per ogni tipo:

- **URL:** `https://example.com/page` diventa `https://example.com/page?nfc=049F50824F1390x000007`
- **Corpo dell'email:** `Hi, here's my card.` diventa `Hi, here's my card. 049F50824F1390x000007`
- **Corpo dell'SMS:** `Order confirmed!` diventa `Order confirmed! 049F50824F1390x000007`
- **Input del comando rapido:** `log-entry` diventa `log-entry 049F50824F1390x000007`

I valori si aggiungono in coda in modo pulito, quindi il resto del contenuto continua a funzionare come sempre. Disattiva una delle due opzioni e resta soltanto l'altra: o il conteggio (`000007`) o l'ID del tag (`049F50824F1390`).

A questo punto arriva sempre la stessa domanda: perché `000007` e non semplicemente `7`? Il conteggio è scritto in esadecimale, il sistema numerico in base 16 che va da 0 a 9 e poi da A a F, ed è riempito fino a sei caratteri. Quindi `000007` è semplicemente la settima scansione del tag. Dopo la nona scansione cominciano a comparire anche le lettere: `00000A` vale 10. Il tetto massimo è `FFFFFF`, cioè circa 16 milioni di scansioni, molto più di quanto servirà mai a un tag nel mondo reale. L'ID del tag è una stringa esadecimale più lunga, il numero di serie di fabbrica da 7 byte del chip, e a differenza del conteggio non cambia mai.

Se fai arrivare l'indirizzo finito a un sito tuo, il server legge quei valori direttamente dall'indirizzo: registra il conteggio, confrontalo con una soglia oppure distingui un tag dall'altro grazie all'ID.

---

## Quali tag servono

La funzione dipende dal chip, quindi il tag conta. Per il contatore degli avvicinamenti NFC.cool supporta i chip `NTAG213`, `NTAG215` e `NTAG216`. Sono gli adesivi NFC più diffusi tra quelli venduti per i telefoni, quindi si trovano facilmente, ma prima di farne una scorta consiglio comunque di verificare il tipo di chip. Se provi a usare un tag che la funzione non supporta, l'app ti avvisa invece di scrivere qualcosa che poi non funzionerà: ci ho tenuto, perché so quanto sia frustrante un errore silenzioso.

Se devi fare rifornimento, la pagina dei [tag NFC consigliati](/affiliate-links/) elenca gli adesivi `NTAG216` che uso e su cui faccio le prove. E se scegliere i tag è ancora terreno nuovo, la mia guida ai [tipi di tag NFC per iPhone](/blog/nfc-tag-types-for-iphones/) spiega i pro e i contro in parole semplici.

---

## Qualche domanda veloce

**Posso azzerare il contatore?** No. È un contatore a senso unico, integrato nel chip, e può solo salire. È una scelta voluta e, onestamente, è tutto il senso della cosa: un contatore azzerabile sarebbe inutile per le edizioni limitate e per i controlli anticontraffazione. Se ti serve un conteggio da zero, usa un tag nuovo.

**Il conteggio lo vedono tutti o solo io?** Tutti. Ogni telefono che avvicina il tag riceve il contenuto finito, con il conteggio già dentro, che abbia l'app installata o no. È proprio questo il punto: a riferire è il tag.

**Si può disattivare in seguito?** Sì. L'app può impedire al chip di sostituire i segnaposto. L'indirizzo o il messaggio restano sul tag, si fermano solo gli aggiornamenti in tempo reale. Internamente il chip continua a contare.

**Il contatore rispetta la privacy?** Il conteggio vive sul tag, non su un server. Chiunque avvicini il tag vede il conteggio dentro il contenuto e, se quel contenuto punta a un server tuo, a vederlo è solo quel server. L'ID del tag è un numero di serie di fabbrica, non un dato che identifica una persona.

**Serve internet?** No. Il conteggio e la sostituzione avvengono entrambi dentro al chip. Internet entra in gioco solo se l'indirizzo che hai scritto punta a un sito.

---

## Provalo

Per gran parte degli anni che ho passato a lavorare con l'NFC, contare gli avvicinamenti voleva dire link univoci e un backend che tenesse il conto. Il contatore degli NTAG21x fa cadere quel vincolo senza far rumore: a tenere il conto è il tag, e il contatore degli avvicinamenti di NFC.cool Tools serve ad accenderlo. È una di quelle funzioni che vorrei più gente sapesse di avere a disposizione.

Vuoi vederlo all'opera prima di scrivere un solo tag? La [demo dal vivo del contatore](/tap-counter/) è una pagina che fa esattamente quello che racconta questo articolo: scrivi un tag che punti a quell'indirizzo, avvicinalo e la pagina ti mostra il numero di scansioni e l'ID del tag che il chip le ha appena passato. Nessun server di mezzo, solo l'indirizzo.

È già disponibile in NFC.cool Tools, su [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-count-nfc-tag-scans-it&mt=8) e [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-count-nfc-tag-scans-it). Per vedere tutto il set di strumenti NFC che ho sviluppato, dai un'occhiata alla [pagina del lettore e scrittore NFC](/features/nfc-reader-writer/).
