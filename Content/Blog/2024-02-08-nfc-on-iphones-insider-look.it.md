---
id: nfc-blog-020
title: "L'NFC su iPhone: uno sguardo da dentro"
date: 2024-02-08
tags: ["nfc-tags", "iphone"]
summary: "Come funziona davvero l'NFC su iPhone, dal Secure Element di Apple Pay alla lettura dei tag con Core NFC. Uno sguardo pratico al protocollo, alla storia su iOS e al motivo per cui il raggio corto è un pregio, non un limite."
metaTitle: "Come funziona l'NFC su iPhone: uno sguardo da dentro"
metaDescription: "Come funziona l'NFC su iPhone: il protocollo, il Secure Element di Apple Pay, la lettura dei tag con Core NFC e perché il raggio corto è una difesa."
ogTitle: "L'NFC su iPhone: uno sguardo da dentro"
ogDescription: "Come funziona davvero l'NFC su iPhone: protocollo, Secure Element, lettura dei tag con Core NFC e la storia su iOS."
image: "/assets/images/Blog/nfc-on-iphones-insider-look.webp"
---
Buona parte della tecnologia che usiamo ogni giorno sparisce sullo sfondo. Avvicini il telefono per pagare, per aprire una porta, per scansionare, per condividere, e del protocollo che c'è sotto non ti accorgi mai. L'NFC è una di quelle tubature nascoste e, dopo anni passati a sviluppare NFC.cool, un'app per leggere e scrivere tag NFC, in quelle tubature ci ho messo le mani come pochi. Ecco come funziona davvero sull'iPhone, raccontato come lo spiegherei a un amico curioso.

---

## Che cos'è davvero l'NFC

**Near Field Communication** è un protocollo wireless a corto raggio: due dispositivi si scambiano dati quando si trovano a circa 4 cm l'uno dall'altro. Io me lo immagino come un cugino semplificato di Bluetooth e Wi-Fi, con una portata molto più ridotta.

All'inizio quella portata così corta spiazza, ma non è un limite: è il modello di sicurezza. Da quando l'ho capito, molte scelte di progettazione dell'NFC hanno cominciato ad avere senso. Non si paga per sbaglio a un terminale dall'altra parte della stanza e un lettore malevolo non può svuotarti il portafoglio a distanza senza che tu te ne accorga. Se parti da zero, ho scritto una [guida ai tag NFC per principianti](/blog/nfc-tags-beginners-guide/) che parte da molto più indietro di questo articolo.

---

## L'NFC su iPhone: una breve storia

Apple ha messo un chip NFC nell'iPhone per la prima volta nel 2014, con iPhone 6 e 6 Plus, ma la radio era riservata ad Apple Pay. Le app di terze parti non potevano leggere i tag NFC, punto. Per uno che di lì a poco avrebbe sviluppato un'app NFC, quegli anni passati a guardare da fuori sono stati parecchio frustranti.

Le cose sono cambiate con **iOS 11** (2017), che ha introdotto il framework **Core NFC** e ha finalmente permesso a sviluppatori come me di leggere i tag NDEF. Apple ha continuato ad allargare quella porta: iOS 13 ha aggiunto la scrittura e dall'iPhone XS in poi è arrivata la lettura dei tag in background, sempre attiva. Oggi, su qualsiasi iPhone recente, basta avvicinare il telefono a un tag senza aprire niente: il sistema lo riconosce e propone l'azione giusta.

---

## Come l'NFC sposta i dati

In ogni interazione un dispositivo NFC ricopre uno di due ruoli: **attivo** (alimentato, genera un campo) oppure **passivo** (senza batteria, ricava energia dal campo). È il concetto a cui torno ogni volta che qualcuno mi chiede come funziona l'NFC.

Quando paghi con Apple Pay, l'iPhone è il lettore attivo: genera un campo radio a 13,56 MHz. L'elemento NFC del terminale di pagamento si sveglia dentro quel campo, si identifica e scambia con il telefono una piccola quantità di dati crittografici. I dati della carta non escono mai dal **Secure Element**, un chip dedicato e isolato a livello hardware. Quello che esce è un token monouso.

Quando avvicini il telefono a un adesivo NFC su un manifesto, i ruoli si invertono. Il tag del manifesto è passivo e non ha batteria: lo alimenta il lettore dell'iPhone. Il tag risponde con i record NDEF che ha in memoria e iOS decide cosa farne: aprire un indirizzo web, lanciare un'app, mostrare una scheda contatto, avviare un Comando rapido. È in questa seconda metà, il lato del tag, che vive NFC.cool; se vuoi vederla all'opera senza installare niente, su Android puoi [leggere i tag NFC direttamente dal browser](/online-nfc-reader/).

---

## NDEF: la lingua franca

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/nfc-on-iphones-insider-look/ndef-record-440w.webp" alt="Un record biglietto da visita letto in NFC.cool Tools, con il contenuto vCard grezzo sotto: BEGIN:VCARD, VERSION:3.0, N e FN di Anna Miller"><p><strong>Un record NDEF, aperto.</strong> Un record di contatto come lo mostra NFC.cool, con la vCard grezza sotto.</p></li>
</ol>
</figure>

Sopra la radio NFC c'è il livello dei dati: **NDEF**, cioè NFC Data Exchange Format. Lo descrivo come un formato di record minuscolo e autodescrittivo: un tag contiene uno o più record, e ogni record ha un tipo (URI, testo, vCard, credenziali Wi-Fi, MIME personalizzato) e un payload.

Tutti i telefoni con NFC al mondo parlano NDEF, ed è per questo che un tag programmato con un dispositivo Android si legge senza problemi su un iPhone, e viceversa. È uno dei pochi punti del mondo mobile in cui iOS e Android condividono davvero uno standard e, sinceramente, quando sviluppo nuove funzioni quell'interoperabilità è la cosa per cui sono più grato: scrivo per il formato, non per una piattaforma. Se vuoi provare a scrivere i tuoi record, l'ho spiegato passo passo in [come scrivere tag NFC da iPhone](/blog/write-nfc-tags-iphone/).

---

## Privacy e sicurezza

Vale la pena citare due livelli di difesa, gli stessi che mi ritrovo a spiegare più spesso:

- **La distanza.** Pochi centimetri sono difficili da intercettare senza un'antenna che si nota subito: è il modello di minaccia attorno a cui l'NFC è stato progettato fin dall'inizio.
- **La tokenizzazione.** Apple Pay non trasmette mai il numero reale della carta. Ogni transazione usa un Device Account Number più un crittogramma monouso, generato dentro il Secure Element. Nemmeno un terminale compromesso riesce a riutilizzarlo.

Con la lettura dei tag la superficie di attacco cambia: la fiducia si sposta sul tag stesso. Se controlli tu quello che c'è sopra, come nelle automazioni di casa tua o nel tuo biglietto da visita, non c'è problema. Se invece avvicini il telefono a un tag qualsiasi trovato in giro, iOS ti mostra comunque una richiesta di conferma prima che accada qualcosa. Quando ho bisogno che sia il tag a custodire un segreto, e non solo a indicarne uno, ricorro ai tag crittografici: ne ho parlato in [come conservare segreti cifrati sui tag NFC](/blog/nfc-safe-encrypted-secrets/).

---

## Perché tutto questo conta

L'NFC è uno di quei protocolli che spariscono quando funzionano, ed è esattamente per questo che mi dà soddisfazione costruirci sopra. Avvicini il telefono a un tornello, a un terminale di pagamento, a un biglietto da visita, a uno speaker smart, e qualcosa succede. Niente accoppiamento, niente PIN, nessuna app da aprire. Solo un gesto fisico deliberato, che autorizza un unico scambio ben preciso.

È per questo che ho creato [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-on-iphones-insider-look-it&mt=8): per rendere disponibile tutto quello che l'NDEF sa fare senza obbligare nessuno a studiarsi prima il protocollo. Leggi qualsiasi tag, scrivi qualsiasi tipo di record, blocca il tag quando hai finito. Su iPhone oppure su [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-on-iphones-insider-look-it).
