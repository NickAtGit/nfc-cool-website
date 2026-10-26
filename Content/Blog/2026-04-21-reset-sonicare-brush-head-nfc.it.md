---
id: nfc-blog-015
title: "Come controllare e azzerare il contatore della testina Philips Sonicare con l'NFC"
date: 2026-04-21
tags: ["nfc-tags", "guides", "automation"]
summary: "Il tuo spazzolino Sonicare ha un chip NFC dentro ogni testina che conta alla rovescia fino al ricambio successivo. Ecco cosa registra davvero, e come controllare il consumo o azzerare il contatore con NFC.cool Tools."
image: "/assets/images/Blog/reset-sonicare-brush-head-nfc.webp"
imageAlt: "Il tag NFC di una testina per spazzolino elettrico azzerato con un telefono"
metaTitle: "Controllare e azzerare il contatore Sonicare con NFC (2026)"
metaDescription: "La testina del tuo Sonicare ha un chip NFC che conta quanto ti lavi i denti. Scopri quanta vita le resta e azzera il contatore con NFC.cool Tools."
ogTitle: "Come controllare e azzerare il contatore della testina Sonicare"
ogDescription: "Ogni testina Sonicare ha un chip NFC che conta alla rovescia verso il ricambio. Guarda i dati di consumo e, se vuoi, azzera il timer."
---

Il tuo spazzolino elettrico ti sta spiando.

Non nel senso inquietante della sorveglianza. Nel senso di "abbiamo messo un chip NFC nella testina per ricordarti di comprarne una nuova". Ogni testina di ricambio Philips Sonicare ha un NTAG213 annegato nella plastica che tiene il conto di quanto ti lavi i denti e dice al manico di accendere una spia di avviso quando decide che i tuoi tre mesi sono finiti.

Benvenuto nell'Internet of Shit.

Il fatto è che tre mesi sono un consiglio, non un dato medico. L'usura delle setole dipende da quanta forza ci metti, da che dentifricio usi e da quante volte al giorno ti lavi i denti. Il chip non misura le condizioni delle setole: conta secondi e basta. Chi lava i denti con delicatezza e un dentifricio poco abrasivo, dopo tre mesi può avere setole ancora perfette. Il timer non lo sa e non gli interessa.

NFC.cool Tools ora legge quel chip, ti mostra con precisione quanta vita ha consumato la testina e azzera il timer, se decidi che le setole sono ancora buone. Ecco come funziona.

---

## Cosa c'è davvero sul chip

Il reverse engineering non l'ho fatto io. Cyrill Künzi ha [smontato il protocollo](https://kuenzi.dev/toothbrush/) e mbirth ha [mappato ogni singolo byte](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html): tutto quello che segue è merito loro. Ecco cosa contiene l'NTAG213 dentro la testina:

- **Tipo e colore della testina** - un singolo byte alla pagina `0x1F` che identifica il modello (Premium All-in-One, Gum Care, DiamondClean e così via) e il suo colore (la [mappa di memoria di mbirth](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) elenca 22 tipi conosciuti)
- **Durata prevista** - alla pagina `0x21`, di solito `0x5460`, cioè 21.600 secondi: 180 sessioni da due minuti, ovvero tre mesi di due lavaggi al giorno
- **Codice di produzione** - da `0x21` a `0x23`, la data e la linea di produzione in ASCII, per esempio `241206 31K` (prodotta il 6 dicembre 2024 sulla linea 31K). È stampato anche sul gambo
- **Tempo di utilizzo accumulato** - i primi due byte della pagina `0x24` conservano, come valore a 16 bit, i secondi totali di utilizzo della testina. Quando arriva a `0xFFFF` (65.535 secondi, circa 18 ore di lavaggio ininterrotto) il contatore si ferma. Una testina nuova parte da `00:00:02:00`: i primi due byte sono a zero, cioè nessun utilizzo, mentre il significato degli ultimi due al momento resta ignoto
- **Ultima intensità e ultima modalità** - sempre alla pagina `0x24`: Low/Med/High e Clean/White+/Gum Health/Deep Clean+
- **Un URL** - punta a `philips.com/nfcbrushheadtap` e si apre se avvicini la testina a un lettore NFC generico

Quando il tempo accumulato supera la soglia (21.600 secondi), il manico fa lampeggiare il LED ambra. È il chip che parla, non le setole.

---

## Perché potresti voler azzerare il contatore

L'intervallo di sostituzione di tre mesi è un consiglio di Philips, non una misura scientifica dell'usura delle setole. Il chip conta i secondi, non lo sfilacciamento delle setole. Se preferisci decidere da te, guardando le setole invece di obbedire a un conto alla rovescia, azzerare il contatore te lo permette.

Puoi volerlo azzerare anche se alterni più testine, una da viaggio e una da casa, e preferisci tenere tu il conto.

---

## Come funziona la password

L'NTAG213 è protetto da password. Ogni testina ha una password di 4 byte tutta sua, e il manico dello spazzolino si autentica con quella ogni volta che scrive sul tag.

La password si calcola a partire da due dati: l'UID di 7 byte del tag e il codice di produzione salvato sul tag stesso (e stampato sul gambo). [Aaron Christophel](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) ha ricavato l'algoritmo dal firmware del Sonicare tramite reverse engineering, dopo che Cyrill Künzi aveva intercettato la trasmissione della password con una radio software-defined (SDR).

**Importante:** dopo **tre tentativi di password sbagliati** l'NTAG213 si blocca per sempre. Il chip resta in sola lettura per sempre, e a quel punto non ci scrive più nemmeno lo spazzolino. Non tirare a indovinare.

---

## Come controllare e azzerare con NFC.cool Tools

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/reset-sonicare-brush-head-nfc/1-read-440w.webp" alt="La schermata Sonicare Reset di NFC.cool Tools, che chiede di avvicinare la testina all'iPhone"><p><strong>Leggi la testina.</strong> Tocca Leggi NFC e avvicina la testina all'iPhone.</p></li>
<li><img src="/assets/images/Blog/screens/reset-sonicare-brush-head-nfc/2-stats-440w.webp" alt="Una testina Sonicare all'80% di utilizzo, con 4 h 50 min usati e 1 h 10 min rimanenti"><p><strong>Guarda i dati.</strong> Quanta vita ha già consumato la testina.</p></li>
<li><img src="/assets/images/Blog/screens/reset-sonicare-brush-head-nfc/3-reset-440w.webp" alt="La stessa testina dopo l'azzeramento, di nuovo allo 0% di utilizzo"><p><strong>Azzerala.</strong> Di nuovo a zero, se le setole reggono.</p></li>
</ol>
</figure>

NFC.cool Tools si occupa dell'intero procedimento: legge il tag, calcola la password e ti mostra i dati. Niente comandi esadecimali, niente calcolatori online, niente SDR.

1. Apri **NFC.cool Tools** sull'iPhone
2. Vai su **Reset testina spazzolino**
3. Tocca **Leggi NFC** e avvicina la testina al telefono
4. L'app mostra un **indicatore in percentuale** di quanta vita ha consumato la testina, con sotto il tempo già usato e quello che resta
5. Tocca **Azzera timer** per riportare a zero il contatore di utilizzo, oppure scansiona un'altra testina

Disponibile da subito su [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-it&mt=8) e [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-it).

---

## Cosa fa davvero l'azzeramento

Quando azzeri, sulla pagina `0x24` viene scritto `00:00:02:00`, lo stesso valore con cui esce di fabbrica una testina nuova. Tornano a zero solo i primi due byte, quelli del contatore di utilizzo. Il significato degli ultimi due resta ignoto, quindi l'app li lascia intatti.

Lo spazzolino riparte a contare da zero e la spia ambra torna ad accendersi dopo altri tre mesi. A quel punto guardi le setole e decidi di nuovo da te.

---

## Il quadro generale: l'NFC negli oggetti di tutti i giorni

Una testina per spazzolino con dentro un chip NFC che conta alla rovescia verso il prossimo acquisto è l'apice dell'Internet of Shit. Ho costruito il mio lavoro intorno all'NFC perché lo trovo davvero utile, ma metterlo nella plastica usa e getta con il preciso scopo di spingerti a ricomprare è... una scelta.

Lo stesso chip NTAG213 serve anche a cose che vanno realmente a vantaggio di chi compra: autenticazione dei prodotti, controllo degli accessi e, tra non molto, il passaporto digitale di prodotto dell'Unione Europea, che imporrà i tag NFC sui beni di consumo per farti verificare cosa stai comprando e da dove arriva. Lì l'NFC lavora *per* te, non contro di te.

NFC.cool Tools legge e scrive tutti questi tag. La funzione per il Sonicare è un esempio proprio di questo: capire cosa c'è scritto sui tag che ti circondano e decidere che farne.

---

## Per approfondire

- [L'analisi originale di Cyrill Künzi](https://kuenzi.dev/toothbrush/) - intercettazione con SDR, estrazione della password e il primo studio dettagliato del protocollo NFC del Sonicare
- [Il generatore di password di Aaron Christophel](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) - l'algoritmo estratto dal firmware del Sonicare
- [La mappa di memoria dell'NTAG213 di mbirth](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) - documentazione dettagliata di ogni byte presente sul chip

*Hai una testina Sonicare da controllare? [Scarica NFC.cool Tools per iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-it&mt=8) o per [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-it) e scopri cosa ha registrato il tuo spazzolino.*
