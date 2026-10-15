---
id: nfc-blog-011
title: "OpenPrintTag: come leggere e scrivere le bobine intelligenti per la stampa 3D dal telefono"
date: 2026-03-29
tags: ["nfc-tags", "automation"]
summary: "OpenPrintTag è lo standard aperto per le bobine di filamento intelligenti. Come funziona, quali dati contiene e come leggere e scrivere i tag NFC OpenPrintTag usando soltanto il telefono."
image: "/assets/images/Blog/openprinttag-read-write-nfc-spools-phone.webp"
imageAlt: "Bobina per stampa 3D con tag NFC letta da un telefono"
metaTitle: "OpenPrintTag: leggi e scrivi le bobine 3D dal telefono"
metaDescription: "Usa OpenPrintTag per gestire le bobine di filamento con l'NFC: leggi, scrivi e tieni traccia dei dati del materiale da iPhone o Android, senza app proprietarie."
ogTitle: "OpenPrintTag: bobine intelligenti per la stampa 3D con l'NFC"
ogDescription: "La guida completa per leggere e scrivere le bobine OpenPrintTag con il telefono. Funziona con qualsiasi stampante e qualsiasi marca di filamento."
---
Se stampi in 3D, la scena ti sarà familiare: uno scaffale pieno di bobine usate a metà, nessuna idea di quanto filamento sia rimasto su ciascuna e quell'unica bobina senza etichetta che potrebbe essere PETG oppure PLA, senza modo di scoprirlo se non con una stampa di prova. Ci sono passato anch'io ed è esattamente il tipo di fastidio piccolo e ricorrente che l'NFC risolve davvero bene.

OpenPrintTag serve a questo. È uno standard NFC open source creato da [Prusa Research](https://www.prusa3d.com) che trasforma qualsiasi tag NFC compatibile in un'etichetta intelligente per la bobina di filamento. Tipo di materiale, marca, colore, peso residuo: tutto scritto direttamente sulla bobina e leggibile avvicinando il telefono per un attimo.

Niente cloud. Nessun ecosistema chiuso. Nessuna connessione a internet. Ho passato anni a sviluppare NFC.cool, un'app per leggere e scrivere tag NFC, e questo è esattamente il tipo di standard che mi piace vedere: mette i dati sul tag e li lascia funzionare ovunque. Ecco come funziona e come leggo e scrivo le bobine OpenPrintTag usando soltanto un telefono.

---

## Che cos'è OpenPrintTag

OpenPrintTag è un formato di dati aperto e universale per i materiali da stampa 3D. Invece di lasciare che ogni produttore si inventi il proprio sistema di bobine intelligenti, incompatibile con tutti gli altri (lo stesso caos che ho visto ripetersi in altri angoli del mondo NFC), OpenPrintTag definisce un unico standard che chiunque può adottare: produttori di filamento, produttori di stampanti, software di slicing e app come NFC.cool.

I principi di fondo, e i motivi per cui secondo me merita attenzione:

- **Open source:** pubblicato con licenza MIT, implementabile liberamente, senza costi di licenza
- **Offline per scelta:** i dati stanno tutti sul tag, senza bisogno di alcun servizio cloud
- **Riscrivibile:** aggiorni il filamento residuo mentre stampi e riusi i tag su bobine nuove
- **Universale:** funziona tra marche ed ecosistemi diversi
- **Copre sia FFF (filamento) sia SLA (resina)**

Più di 22 aziende e gruppi hanno manifestato interesse, tra cui Prusament, Voron, Fillamentum, 3DXTech, SimplyPrint e PrintedSolid. La specifica completa si trova su [specs.openprinttag.org](https://specs.openprinttag.org).

---

## Quali dati contiene un tag OpenPrintTag

È la parte che mi ha convinto. OpenPrintTag non è una targhetta con sopra scritto un nome: è un formato di dati strutturato per bene, con campi per quasi tutto quello che vorresti sapere di una bobina, e si vede che la specifica l'hanno scritta persone che stampano davvero.

**Identificazione del materiale:**
- Classe di materiale (filamento o resina)
- Tipo di materiale (PLA, PETG, ABS, TPU, ASA, PC, PA6 e più di altri 30)
- Nome del materiale (per esempio "PLA Galaxy Black")
- Marca (per esempio "Prusament")
- Proprietà del materiale: oltre 68 attributi definiti, come abrasivo, conduttivo, fosforescente, idoneo al contatto con gli alimenti, antistatico, flessibile e altri ancora

**Peso e lunghezza:**
- Peso nominale (quello dichiarato, per esempio 1000 g)
- Peso reale (misurato su quella specifica bobina)
- Lunghezza del filamento (nominale e reale, in mm)
- Peso della bobina vuota (così basta pesare la bobina per calcolare il materiale rimasto)
- Peso consumato (si aggiorna man mano che stampi: è il campo che rende una bobina davvero "intelligente")

**Colore:**
- Colore principale in formato RGBA
- Fino a 5 colori secondari (per i filamenti multicolore, galaxy o sfumati)
- Distanza di trasmissione (il valore di opacità, utile per i progetti [HueForge](https://shop.thehueforge.com/))

**Metadati:**
- Data di produzione e data di scadenza
- Paese di origine
- UUID della marca, del materiale e della singola bobina
- Impostazioni di protezione da scrittura

La specifica arriva a coprire campi dedicati alla resina come `last_stir_time`, che registra quando la resina è stata mescolata l'ultima volta prima di stampare. È il genere di dettaglio che mi dice che chi c'è dietro si è già scottato con una resina non mescolata.

---

## Il tag: non è il solito adesivo NFC

Ecco un dettaglio tecnico da chiarire prima di comprare qualsiasi cosa: **OpenPrintTag è pensato per i tag ISO 15693 (NFC-V)**, nello specifico per i chip **NXP ICODE SLIX e ICODE SLIX2**. Sono tag NFC Forum di tipo 5, con una distanza di lettura molto maggiore dei normali tag NFC-A: fino a 1,5 metri con un lettore dedicato. Se finora hai comprato solo gli adesivi NTAG economici che si usano nella maggior parte dei progetti, qui siamo su un'altra famiglia di tag: ho raccontato tutto il panorama in [tipi di tag NFC per iPhone](/blog/nfc-tag-types-for-iphones/).

Perché proprio NFC-V? Il lettore NFC integrato in una stampante deve rilevare la bobina comunque sia ruotata. La portata maggiore dell'NFC-V lo rende possibile senza dover allineare il tag con precisione, ed è una bella trovata.

**E i normali adesivi NTAG?** Il formato di dati di OpenPrintTag si basa su NDEF, quindi un'app come NFC.cool può tecnicamente leggere e scrivere dati OpenPrintTag su qualsiasi tag NFC, NTAG213/215/216 compresi. L'ho fatto e, finché a leggere è un telefono, funziona benissimo. Però **l'hardware delle stampanti e le app come quella di Prusa riconoscono solo i tag NFC-V**. Quindi, se vuoi che le bobine etichettate funzionino con i lettori integrati nelle stampanti, usa tag ICODE SLIX2. Evita l'errore che immagino faranno in molti, cioè comprare una busta di NTAG213 per questo scopo.

Se compri tag vuoti, cerca esplicitamente la sigla **ICODE SLIX2** oppure **ISO 15693**. Trovi tag compatibili su [Amazon US](https://amzn.to/3LTh1fT) o [Amazon Europa](https://amzn.to/4oJpQr4) (link affiliati).

---

## Come leggere e scrivere OpenPrintTag dal telefono

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/openprinttag-read-write-nfc-spools-phone/write-440w.webp" alt="La schermata OpenPrintTag di NFC.cool Tools, compilata per Northline Filaments PLA Matte, 1,75 mm, Filament (FFF)"><p><strong>Scrivere il tag di una bobina.</strong> Compila i dati del materiale, tocca il pulsante NFC e avvicina il tag al telefono.</p></li>
</ol>
</figure>

Per lavorare con OpenPrintTag non servono una stampante Prusa né hardware particolare: basta il telefono. È la parte che avevo più voglia di sviluppare, perché il telefono che hai in tasca è il lettore NFC più a portata di mano che esista.

NFC.cool Tools supporta OpenPrintTag in modo nativo sia su [iOS](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-openprinttag-read-write-nfc-spools-phone-it&mt=8) sia su [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-openprinttag-read-write-nfc-spools-phone-it), e ho fatto in modo che la funzione fosse del tutto gratuita.

**Leggere un tag:**
1. Apri NFC.cool Tools
2. Avvicina il telefono al tag NFC sulla bobina
3. NFC.cool riconosce da solo il formato OpenPrintTag
4. Consulta i dati strutturati: materiale, marca, colore, peso, lunghezza, proprietà

**Scrivere un tag:**
1. Attacca un tag ICODE SLIX2 vuoto sulla bobina
2. Apri NFC.cool → sezione NFC Apps → OpenPrintTag
3. Compila i dati del materiale: tipo, marca, colore, peso, lunghezza
4. Tocca per scrivere

**Aggiornare il materiale rimasto:**
Dopo una stampa, aggiorna sul tag il campo del peso consumato. Alla scansione successiva saprai con precisione quanto filamento resta, senza tirare a indovinare e senza bilancia. È il passaggio che trasforma la bobina intelligente da curiosità a qualcosa su cui contare davvero.

Per guardare sotto il cofano c'è la modalità Esperto, che mostra i record NDEF grezzi: comoda quando devi analizzare un tag che dà problemi o verificare la struttura dei dati. Non hai mai scritto un tag? Le basi le ho spiegate in [come scrivere i tag NFC da iPhone](/blog/write-nfc-tags-iphone/).

---

## Perché conviene usare il telefono

Le stampanti Prusa stanno adottando lettori NFC integrati e progetti come [SpoolSense](https://github.com/SpoolSense) (un lettore open source basato su ESP32) aggiungono soluzioni hardware dedicate. E allora perché scomodare il telefono? Ecco le mie ragioni:

- **Funziona con qualsiasi stampante:** Voron, Bambu Lab, Creality, Ender, qualunque cosa tu usi
- **Scrivi tag per qualsiasi filamento:** Prusament arriva già etichettato, ma le bobine Fillamentum, eSUN, Hatchbox o di qualsiasi altra marca le etichetti tu
- **Gestisci l'inventario lontano dalla stampante:** scansiona le bobine alla scrivania, in magazzino o in un makerspace
- **Analizza i tag che danno problemi:** quando una stampante non riesce a leggere un tag, scansionalo con il telefono per vedere che cosa c'è scritto davvero sopra; è l'uso a cui ricorro più spesso
- **Nessun hardware in più:** il telefono ha già un lettore NFC, ed è tutto qui il punto

---

## Casi d'uso concreti

**Inventario personale:** etichetta ogni bobina della collezione. Quando pianifichi una stampa, scansiona le bobine per controllare tipo di materiale, lunghezza residua e colore senza aprire nessuna confezione.

**Filamento residuo sotto controllo:** pesa la bobina prima e dopo una stampa e aggiorna il peso consumato sul tag. Niente più ansia da "questa bobina basterà per una stampa da 14 ore?".

**Uso in un makerspace o in gruppo:** scrivi sui tag i dati del materiale, così chiunque in laboratorio può scansionare e riconoscere una bobina. Niente più filamento misterioso.

**Appunti sulle prove di stampa:** hai trovato la temperatura perfetta per una certa bobina? Scrivi la nota sul tag e la ritrovi la volta dopo.

**Materiali multicolore e speciali:** OpenPrintTag arriva a 6 colori per bobina e a più di 68 attributi. Il PETG fosforescente e caricato in fibra di carbonio può finalmente avere un'etichetta come si deve, indicazione di abrasività compresa.

---

## Un ecosistema che cresce

OpenPrintTag è ancora giovane, ma lo slancio è reale:

- **Prusament** monta un tag NFC OpenPrintTag su ogni bobina
- **Le stampanti Prusa** stanno integrando lettori NFC nativi
- **I lettori hardware open source** come SpoolSense (basato su ESP32) stanno nascendo dalla comunità
- **Oltre 22 aziende** hanno aderito all'iniziativa
- **NFC.cool** è l'unica app NFC generalista con il supporto completo a OpenPrintTag sia su iOS sia su Android, e l'ho aggiunto perché volevo usarlo io per primo

Sono anni che vedo il mondo della stampa 3D avere bisogno di uno standard aperto per le bobine intelligenti, e ho visto andare e venire più di un tentativo proprietario. OpenPrintTag è il più credibile che mi sia capitato sotto mano: sostenuto da un produttore importante, completamente open source e già presente su prodotti reali. È una combinazione abbastanza rara da convincermi a scommetterci.

---

## Come iniziare

**Cosa serve:**
- Un iPhone 7 o successivo, oppure un telefono Android con NFC
- NFC.cool Tools ([App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-openprinttag-read-write-nfc-spools-phone-it&mt=8) / [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-openprinttag-read-write-nfc-spools-phone-it)), gratis, con OpenPrintTag incluso
- Tag NFC vuoti ICODE SLIX2 / ISO 15693 ([Amazon US](https://amzn.to/3LTh1fT) / [Amazon Europa](https://amzn.to/4oJpQr4), link affiliati)
- Qualche bobina di filamento da etichettare

Tutto qui. Tra cinque minuti la prima bobina può già essere intelligente. Se l'NFC in sé è una novità per te, partirei dalla mia [guida completa ai tag NFC per principianti](/blog/nfc-tags-beginners-guide/), mentre la [pagina del lettore e scrittore NFC](/features/nfc-reader-writer/) racconta tutto quello che NFC.cool Tools sa fare oltre a OpenPrintTag.

*OpenPrintTag è un'iniziativa open source di Prusa Research. NFC.cool sostiene lo standard in modo indipendente. Maggiori informazioni su [openprinttag.org](https://openprinttag.org).*
