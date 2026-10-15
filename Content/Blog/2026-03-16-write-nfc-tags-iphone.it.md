---
id: nfc-blog-010
title: "Come scrivere i tag NFC con l'iPhone"
date: 2026-03-16
tags: ["nfc-tags", "guides", "iphone"]
summary: "L'iPhone non si limita a leggere i tag NFC: sa anche scriverli. Ecco la guida passo passo per programmare un tag NFC dall'iPhone, dalla scelta dei tag giusti alla scrittura di indirizzi web, credenziali Wi-Fi, schede contatto e automazioni."
image: "/assets/images/Blog/write-nfc-tags-iphone.webp"
imageAlt: "iPhone che scrive dati su tag NFC vuoti, con icone di avanzamento e di conferma"
metaTitle: "Come scrivere i tag NFC con l'iPhone: guida passo passo 2026"
metaDescription: "Scopri come scrivere i tag NFC con l'iPhone. Istruzioni passo passo per programmare URL, Wi-Fi, contatti e automazioni con NFC.cool Tools e i Comandi Rapidi."
ogTitle: "Come scrivere i tag NFC con l'iPhone"
ogDescription: "Guida passo passo per scrivere i tag NFC con l'iPhone: URL, Wi-Fi, contatti e automazioni. Senza attrezzature particolari."
---
Quasi tutti sanno che l'iPhone sa *leggere* i tag NFC: paghi avvicinandolo al terminale, controlli una tessera dei trasporti, apri un link. Quello di cui devo ancora convincere le persone, invece, è che l'iPhone sa anche *scrivere* sui tag NFC e trasformare un tag vuoto in una scorciatoia fisica per quasi tutto quello che ti viene in mente.

Ho passato anni a sviluppare NFC.cool, un'app per leggere e scrivere tag NFC, e la scrittura è davvero la parte di cui non mi stanco mai. Vuoi un tag sul comodino che mette il telefono in silenzio e imposta la sveglia? Un tag sulla scrivania che apre la playlist con cui lavori? Un tag all'ingresso che passa la password del Wi-Fi agli ospiti? L'iPhone li può programmare tutti e, una volta fatto il primo, ti chiederai perché hai aspettato tanto.

Questa è la spiegazione che darei a un amico appena tornato a casa con la sua prima confezione di tag: cosa serve, come si scrivono i vari tipi di dati e i progetti concreti che metterei in piedi in pochi minuti. Se invece la tecnologia in sé è tutta nuova per te, la mia [guida completa ai tag NFC per principianti](/blog/nfc-tags-beginners-guide/) parte dalle basi.

---

## Cosa serve

Per iniziare a scrivere bastano tre cose e nessuna costa cara.

### 1. Un iPhone compatibile

Per scrivere i tag NFC servono un **iPhone 7 o successivo** e **iOS 13 o una versione più recente**. Se hai comprato l'iPhone negli ultimi otto anni, sei a posto.

Se posso scegliere, punto su un iPhone con la **lettura NFC in background** (iPhone XS e successivi). Questi modelli leggono i tag NFC senza che tu debba prima aprire un'app, e questo rende molto più piacevole usare davvero i tag che scrivi. Se ti interessa capire nel dettaglio come l'hardware dell'iPhone gestisce tutto questo, ne ho parlato a fondo in [uno sguardo dall'interno all'NFC sugli iPhone](/blog/nfc-on-iphones-insider-look/).

### 2. Tag NFC vuoti

Online [i tag NFC vuoti si comprano](/affiliate-links/) a partire da **0,30-1,00 € l'uno**. Esistono in diversi formati:

| Formato | Ideale per |
|-------------|----------|
| **Adesivi** (rotondi, 25-30 mm) | Superfici, oggetti, poster |
| **Tessere** (formato carta di credito) | Portafogli, biglietti da visita |
| **Portachiavi** | Mazzi di chiavi, zaini e borse |
| **Braccialetti** | Eventi, controllo degli accessi |
| **Tag a moneta** (dischetti spessi) | Da inserire dentro gli oggetti |

**Quale chip conviene comprare?**

Se dovessi sceglierne uno solo, per la maggior parte dei progetti l'**NTAG216** è il punto di equilibrio migliore: 888 byte di memoria utilizzabile, compatibilità ampia e prezzo contenuto quando lo prendi in quantità. È il chip che consiglio e su cui faccio più prove. Ecco il riepilogo veloce:

- **NTAG213** (144 byte) - Basta per gli indirizzi web e per il testo semplice. È l'opzione più economica.
- **NTAG215** (504 byte) - Basta per le schede contatto, le credenziali Wi-Fi e più record insieme.
- **NTAG216** (888 byte) - Il migliore a tutto tondo. Ha il margine più ampio per schede contatto, credenziali Wi-Fi e contenuti lunghi come le vCard dettagliate: è quello che consiglio per quasi tutti i progetti.

Se hai dei dubbi, parti da una confezione assortita di adesivi NTAG216 e non pensarci troppo: coprono il 90% dei casi. Per la panoramica chip per chip, compresi i tipi che gli iPhone digeriscono meglio, ho scritto [una guida ai tipi di tag NFC per iPhone](/blog/nfc-tag-types-for-iphones/).

### 3. Un'app per scrivere i tag

All'iPhone serve un'app per scrivere i dati sui tag. Il supporto NFC integrato di Apple copre la lettura, ma per scrivere ci vuole un'app dedicata.

È la parte su cui ho lavorato per anni, quindi metto le mani avanti sulla mia parzialità: **[NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-it&mt=8)** nasce esattamente per questo, sia su iPhone sia su [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-it). Scrive tutti i tipi di record NDEF standard - indirizzi web, testo, configurazioni Wi-Fi, contatti e altro ancora - con un'interfaccia pulita che mostra quanta memoria del tag stai occupando. Permette anche di bloccare i tag, di leggerne i dettagli tecnici e di automatizzare la scrittura con i Comandi Rapidi di iOS. L'elenco completo delle funzioni è nella [pagina del lettore e scrittore NFC](/features/nfc-reader-writer/).

Ci sono anche altre strade, per esempio i Comandi Rapidi di Apple per la scrittura di un semplice indirizzo, ma un'app NFC dedicata dà molto più controllo su cosa scrivi e su come lo scrivi.

---

## Passo dopo passo: scrivere il primo tag NFC

Comincio da dove comincio con tutti: scrivere un indirizzo web su un tag. È il caso più diffuso e la soddisfazione più rapida.

### Scrivere un URL

1. **Apri NFC.cool Tools** e tocca la scheda **Scrivi**
2. **Scegli "URL"** come tipo di record
3. **Inserisci l'indirizzo** - per esempio `https://nfc.cool`
4. **Tocca "Scrivi sul tag"**
5. **Avvicina l'iPhone al tag NFC vuoto** - il bordo superiore del telefono, dove si trova l'antenna NFC, deve restare a 2-3 cm dal tag
6. **Aspetta la conferma** - senti un tocco aptico e compare il segno di spunta

Fatto. Da adesso chiunque avvicini il telefono a quel tag finisce sul tuo indirizzo, senza bisogno di app e senza codici QR da inquadrare. La prima volta che ho visto la faccia di un collega mentre un adesivo vuoto gli apriva un sito, ho capito che quella era la dimostrazione da cui partire.

**Consiglio:** l'antenna NFC dell'iPhone sta sul **bordo superiore**, vicino alla fotocamera. Per il collegamento più solido tieni la parte alta del telefono proprio sopra il tag. Se poi vuoi ricontrollare quello che hai scritto senza installare niente, da un telefono Android puoi [leggere i tag NFC direttamente dal browser](/online-nfc-reader/).

<figure class="phone-figure" data-layout="stage">
<figcaption>Scrivere il primo tag</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/write-nfc-tags-iphone/1-write-nfc-440w.webp" alt="La scheda NFC di NFC.cool Tools con i pulsanti Read NFC e Write NFC"><p><strong>Tocca Write NFC.</strong> Si trova nella scheda NFC, accanto a Read NFC.</p></li>
<li><img src="/assets/images/Blog/screens/write-nfc-tags-iphone/2-web-link-440w.webp" alt="Create NFC Message: Web Link, Google Review Link, Text, Business Card, Telephone Number, Email, SMS, Location e FaceTime"><p><strong>Scegli Web Link.</strong> Oppure testo, un contatto, un numero di telefono e altro. Inserisci il link, scrivi e avvicina il tag alla parte alta dell'iPhone.</p></li>
<li><img src="/assets/images/Blog/screens/write-nfc-tags-iphone/3-my-messages-440w.webp" alt="My NFC Messages, con un link web, un biglietto da visita e un record Wi-Fi"><p><strong>Ritrovalo.</strong> Tutto quello che scrivi resta in My NFC Messages, pronto per il prossimo tag.</p></li>
</ol>
</figure>

---

## Che cosa si può scrivere su un tag NFC?

I tag NFC usano un formato chiamato **NDEF** (NFC Data Exchange Format), che definisce dei tipi di record standard. Da quando ho capito quel modello, la tecnologia ha smesso di sembrarmi magia. Ecco che cosa ci puoi scrivere:

### URL e link

È l'uso più comune e quello a cui ricorro più spesso. Scrivi un indirizzo web qualsiasi: chi avvicina il telefono al tag se lo ritrova aperto nel browser.

**Usi concreti:**
- Il link al menu su un tag al tavolo del ristorante
- Il portfolio o il profilo LinkedIn su un biglietto da visita
- Il link alla scheda prodotto sui tag degli scaffali
- Il link al modulo per i commenti alla reception

**Memoria richiesta:** circa 30-80 byte (quasi tutti gli indirizzi stanno su qualsiasi tag)

### Credenziali della rete Wi-Fi

Scrivi su un tag il nome della rete (SSID) e la password. Gli ospiti avvicinano il telefono e si collegano da soli, senza digitare password lunghissime.

**Come scrivere le credenziali Wi-Fi:**

1. In NFC.cool Tools scegli **"Wi-Fi"** come tipo di record
2. Inserisci il **nome della rete** (SSID)
3. Inserisci la **password**
4. Scegli il **tipo di sicurezza** (per quasi tutte le reti domestiche è WPA2 o WPA3)
5. Scrivi sul tag

**Consiglio:** metti un tag Wi-Fi vicino al router, su un portachiavi all'ingresso oppure nella camera degli ospiti. Scrivici sopra "Avvicina per il Wi-Fi": per esperienza è il tag per cui prima o poi ogni ospite ti ringrazia.

**Memoria richiesta:** circa 60-120 byte, a seconda della lunghezza della password

### Schede contatto (vCard)

Scrivi una vCard su un tag: chi lo avvicina al telefono si vede comparire i tuoi dati pronti da salvare, con nome, telefono, email, azienda e indirizzo.

In sostanza è quello che fa un biglietto da visita digitale, solo che qui sta dentro un oggetto fisico. Niente app e niente connessione a internet: i dati del contatto vivono sul tag.

**Come scrivere un contatto:**

1. Scegli **"Contatto"** come tipo di record
2. Compila i campi che vuoi condividere (nome, telefono, email e così via)
3. Scrivi sul tag

**Memoria richiesta:** circa 100-400 byte, a seconda di quanti campi inserisci. Per i contatti con indirizzo e note usa un NTAG215 o un NTAG216.

Un avvertimento onesto, che arriva dalle email di assistenza che leggo ogni giorno: sull'iPhone una vCard scritta direttamente sul tag si comporta in modo incostante. Se la tua non si apre come dovrebbe, ho analizzato le cause in [perché il tag NFC con la vCard non funziona su iPhone](/blog/vcard-nfc-iphone-not-working/).

**Nota:** per qualcosa di più ricco, con foto, profili social e statistiche, dai un'occhiata a **[NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-it&mt=8)**: crea un profilo con il biglietto da visita digitale ospitato online e ne scrive il link su qualsiasi tag NFC. Chi avvicina il telefono, se usa iOS vede un App Clip nativo e se usa Android apre una pagina sul dominio nfc.cool, in entrambi i casi senza installare niente. Nei miei incontri di lavoro l'ho trovato molto più affidabile di una vCard scritta sul tag.

### Testo semplice

Scrivi un messaggio di testo qualsiasi. È meno diffuso degli indirizzi web, ma torna utile per:

- Le etichette di magazzino (numeri di serie, descrizioni)
- Le istruzioni o le note attaccate a un'apparecchiatura
- I messaggi nascosti nelle cacce al tesoro
- Il tracciamento dei beni in deposito

**Memoria richiesta:** dipende dalla lunghezza del testo (circa 1 byte per carattere)

### Numeri di telefono e indirizzi email

Scrivi un URI `tel:` o `mailto:` per far partire una chiamata o aprire una nuova email non appena qualcuno avvicina il telefono.

Utile per:
- I tag con il contatto di emergenza sulle apparecchiature mediche
- I tag "chiama l'assistenza" sui distributori automatici
- I tag con il recapito dell'assistenza sui prodotti

### Dati specifici di un'app

Certe app scrivono record NDEF personalizzati capaci di avviare al loro interno un'azione precisa. Puoi scrivere, per esempio, un record che apre un comando rapido, una playlist o una determinata schermata dell'app.

---

## Livello avanzato: scrivere con i Comandi Rapidi

È qui che la cosa si fa divertente, almeno per me. L'app **Comandi Rapidi** di Apple sa già scrivere i tag NFC per conto suo, e NFC.cool Tools la estende con azioni proprie.

### Scrivere un indirizzo con i Comandi Rapidi

1. Apri l'app **Comandi Rapidi**
2. Crea un nuovo comando rapido
3. Cerca l'azione **"Imposta tag NFC"** (in Scripting → NFC)
4. Imposta cosa scrivere (indirizzo, testo e così via)
5. Avvia il comando e avvicina il telefono a un tag

Comodo per scrivere in serie tanti tag con gli stessi dati.

### L'integrazione tra NFC.cool Tools e i Comandi Rapidi

NFC.cool Tools aggiunge le proprie azioni per i Comandi Rapidi e allarga le possibilità:

- **Scrivi tag** - Scrive qualsiasi tipo di record supportato senza passare dall'interfaccia
- **Leggi tag** - Scansiona un tag e restituisce i dati al comando rapido
- **Cronologia scansioni** - Recupera i risultati delle ultime scansioni

Da qui si aprono parecchie automazioni. Puoi creare, per esempio, un comando rapido che:
1. Chiede il nome di un prodotto
2. Costruisce un indirizzo tipo `https://yoursite.com/product/{name}`
3. Lo scrive su un tag NFC
4. Registra il tag in un foglio di calcolo

Perfetto per etichettare il magazzino in serie o per preparare i badge di un evento.

---

## Progetti concreti con i tag NFC

Questi sono i progetti su cui torno sempre: pronti da realizzare e ognuno richiede pochi minuti.

### Tag per la casa

**Tag sul comodino - "Modalità notte"**
Scrivi un indirizzo che fa partire un comando rapido di iOS per:
- Attivare Non disturbare
- Impostare la sveglia di domani
- Abbassare la luminosità dello schermo
- Far partire una playlist per dormire

**Tag sulla scrivania - "Modalità lavoro"**
- Aprire l'app delle attività
- Far partire un timer di concentrazione
- Collegarsi alla VPN aziendale
- Mettere una playlist per concentrarsi

**Tag all'ingresso - "Esco di casa"**
- Controllare le previsioni del tempo
- Mostrare i tempi di percorrenza
- Attivare lo scenario "fuori casa" della domotica

### Tag per il lavoro

**Tag sul badge di una conferenza**
Scrivi l'indirizzo del tuo NFC.cool Business Card su un tag e attaccalo dietro al badge. Chi avvicina il telefono al badge si trova davanti il tuo biglietto da visita digitale completo.

**Tag sui prodotti**
Scrivi i link alla documentazione, alla registrazione della garanzia o alle pagine di assistenza. Attaccali al prodotto o alla confezione.

**Tag nelle sale riunioni**
Scrivi i link al calendario delle prenotazioni o le credenziali del Wi-Fi. Attaccali vicino alla porta.

### Progetti creativi

**Tag musicali**
Scrivi su un adesivo il link a un album di Spotify o di Apple Music, poi attaccalo sulla copertina del disco: avvicini il telefono e l'album parte.

**Tag sui giochi da tavolo**
Scrivi i link ai regolamenti in PDF o ai video di spiegazione. Attaccali dentro al coperchio della scatola.

**Tag per le ricette**
Scrivi i link alle ricette preferite e attacca i tag sui barattoli delle spezie o sulle pagine del ricettario.

---

## Bloccare i tag NFC

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/write-nfc-tags-iphone/lock-440w.webp" alt="La schermata Lock Tag: rende il tag di sola lettura per sempre, senza ritorno"><p><strong>Lock Tag.</strong> Il contenuto resta leggibile su qualsiasi telefono, ma non potrà mai più cambiare.</p></li>
</ol>
</figure>

Quando hai scritto un tag e il contenuto ti convince, puoi **bloccarlo**. Il blocco rende il tag definitivamente di sola lettura: nessuno potrà più sovrascrivere i tuoi dati. Lo tratto come un passaggio finale e voluto, mai come qualcosa da sbrigare in fretta, perché non si torna indietro.

**In NFC.cool Tools:**
1. Dopo la scrittura tocca l'opzione **Blocca**
2. Conferma: **l'operazione è irreversibile**

**Quando bloccare:**
- I tag in luoghi pubblici, per evitare le manomissioni
- I tag sui prodotti, per proteggere i tuoi indirizzi
- I biglietti da visita, per tenere al sicuro i tuoi dati di contatto
- Qualsiasi tag che non pensi di riscrivere

**Quando non bloccare:**
- I tag che potresti aggiornare più avanti: la password del Wi-Fi cambia, gli indirizzi stagionali pure
- Le prove e gli esperimenti: finché stai imparando, lasciali riscrivibili

---

## Se qualcosa non funziona

Quasi tutte le domande del tipo "perché non me lo scrive" che ricevo si riducono a queste quattro cause. Ecco come le affronterei.

### L'errore "Impossibile scrivere"

- **Il tag potrebbe essere bloccato.** Se qualcuno, o tu stesso, l'ha bloccato in passato, resta di sola lettura per sempre. Serve un tag nuovo.
- **Memoria insufficiente.** I dati potrebbero essere troppi per la capacità del tag. Passa a un tag più capiente (da NTAG215 a NTAG216) oppure riduci i dati.
- **Tag posizionato male.** Muovi lentamente il bordo superiore dell'iPhone sopra il tag. Certi materiali creano interferenza: il metallo e le custodie spesse, per esempio.
- **Tag danneggiato.** I tag NFC sono robusti ma non indistruttibili: calore estremo, pieghe o forature li mettono fuori uso.

### La scrittura sembra riuscita ma il tag non risponde

- **Controlla il formato NDEF.** Perché i telefoni leggano il tag da soli, i dati devono essere in formato NDEF. NFC.cool Tools se ne occupa al posto tuo, ma i tag scritti con strumenti fatti in casa possono avere qualche problema di formattazione.
- **Conta anche il modello di iPhone.** Gli iPhone più vecchi (7, 8, X) hanno bisogno di un'app per leggere i tag. Dall'iPhone XS in poi la lettura avviene da sola, in background.

### Il tag funziona su Android ma non su iPhone

- **Controlla il tipo di chip.** Gli iPhone vanno d'accordo soprattutto con i chip della serie NTAG (NTAG213, 215, 216). Altri tipi di chip possono non essere compatibili con iOS.
- **Formattazione NDEF.** Il tag deve essere formattato in NDEF. Certi tag comprati in blocco arrivano senza formattazione: scrivili con NFC.cool Tools e li formatta da solo.

---

## Come sfruttare al meglio i tag NFC

Sono le piccole lezioni che ho imparato a mie spese, così tu te le puoi risparmiare.

1. **Etichetta i tag.** Un adesivo bianco sulla scrivania non aiuta nessuno. Con un'etichettatrice o un pennarello indelebile scrivi cosa fa il tag ("Avvicina per il Wi-Fi", "Modalità lavoro" e così via).

2. **Evita le superfici metalliche.** Il metallo disturba il segnale NFC. Se proprio devi attaccare il tag al metallo, usa i **tag NFC anti-metallo**, che hanno uno strato di ferrite a fare da schermo. Sono un po' più spessi e costano qualcosa in più, ma sul metallo funzionano benissimo.

3. **Prova prima di attaccare.** Scrivi il tag, mettilo alla prova e solo dopo togli la pellicola e fissalo al suo posto. Staccare un adesivo già attaccato per riscriverlo è il tipo di seccatura che ho imparato a evitare del tutto.

4. **Usa il tag giusto per ogni cosa.** Non sprecare un NTAG216 (888 byte) per un indirizzo che ne occupa 40. E non provare a far stare una vCard completa su un NTAG213 (144 byte).

5. **Esistono anche le versioni impermeabili.** I tag NFC rivestiti di resina epossidica resistono all'acqua e durano di più. Ottimi all'aperto, in cucina o in bagno.

6. **Unisci i tag NFC ai Comandi Rapidi.** La vera forza dei tag NFC sull'iPhone non è aprire un indirizzo, ma avviare automazioni complesse. Un tag NFC può lanciare qualsiasi comando rapido di iOS, che a sua volta comanda i dispositivi di casa, manda messaggi, registra dati e molto altro.

---

## Domande frequenti

### Un tag NFC si può riscrivere?

Sì, a patto che non sia stato bloccato. Un tag NFC standard si riscrive **oltre 100.000 volte**. Basta scrivere i dati nuovi sopra i vecchi, senza bisogno di cancellare prima.

### Quanto vicino deve stare l'iPhone?

Entro **2-4 cm**. L'antenna NFC sta sul bordo superiore dell'iPhone: per il collegamento migliore tieni la parte alta del telefono proprio sopra il tag.

### Si possono scrivere i tag NFC senza un'app?

I Comandi Rapidi di iOS hanno un'azione integrata, "Imposta tag NFC", che basta per le scritture semplici come indirizzi e testo. Ma per le credenziali Wi-Fi, i contatti e i record più articolati serve un'app come NFC.cool Tools.

### I tag NFC hanno bisogno di una batteria?

No. I tag NFC sono **passivi**: non hanno batteria e prendono l'energia dal lettore NFC del telefono quando lo avvicini. Un tag può durare **più di dieci anni**, semplicemente perché non c'è niente che si esaurisca.

### Si può proteggere un tag NFC con una password?

Sì. NFC.cool Tools imposta la protezione con password sui tag NTAG, sia da iPhone sia da Android. Attenzione però: la password impedisce soltanto di **sovrascrivere** il tag, non di **leggere** quello che c'è già scritto sopra. Se ti serve che il contenuto resti illeggibile senza una chiave, devi cifrare i dati: guarda la nostra guida a [NFC Safe](/blog/nfc-safe-encrypted-secrets/). L'altra strada è il blocco del tag, che vieta per sempre qualsiasi altra scrittura.

### I tag NFC funzionano attraverso la custodia del telefono?

Sì, quasi tutte le custodie non danno problemi. L'NFC passa attraverso plastica, silicone, pelle e persino i portafogli sottili. Possono creare interferenze le custodie molto spesse, come quelle antiurto, e quelle con una piastra metallica per i supporti magnetici da auto.

### Quanti tag posso scrivere con un solo iPhone?

Non c'è un limite. Nessuna restrizione sul numero di tag che scrivi: il limite sono i tag, non il telefono.

---

## E adesso?

Ora che sai scrivere i tag NFC, il campo è aperto. Il mio consiglio è sempre lo stesso: parti da un progetto semplice, un tag con il Wi-Fi per gli ospiti o un tag da biglietto da visita, porta a casa il primo risultato e da lì allarga il campo.

Se cerchi un'app potente e facile da usare per scrivere i tag NFC, **[NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-it&mt=8)** è quella che ho costruito esattamente per questo, dalla scrittura di un semplice indirizzo alla gestione avanzata dei tag, con l'integrazione dei Comandi Rapidi di iOS per le automazioni.

E se vuoi trasformare i tag NFC in veri biglietti da visita professionali, con **[NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-it&mt=8)** crei un profilo curato e ne scrivi l'indirizzo su qualsiasi tag NFC. L'interfaccia dell'app e l'App Clip parlano 35 lingue su iOS, mentre chi riceve il biglietto su Android apre una pagina sul dominio nfc.cool (per ora solo in inglese).

**Scarica NFC.cool Tools:** [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-it&mt=8) | [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-it)

**Scarica NFC.cool Business Card:** [App Store](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-it&mt=8) | [Google Play](https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-it)
