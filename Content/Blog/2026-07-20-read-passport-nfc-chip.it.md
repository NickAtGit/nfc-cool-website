---
id: "read-passport-nfc-chip-2026-07"
title: "Leggi il chip NFC del passaporto con il telefono"
date: "2026-07-20"
tags: ["announcements", "nfc-tags", "privacy"]
summary: "Dentro il passaporto c'è un chip NFC e ora il telefono lo sa leggere. NFC.cool Tools legge il chip di un passaporto, di una carta d'identità o di un permesso di soggiorno su iPhone e Android: mostra la foto e i dati memorizzati e controlla se il documento è autentico."
image: "/assets/images/Blog/read-passport-nfc-chip.webp"
imageAlt: "Un libretto di passaporto blu con il simbolo NFC dorato accanto a un iPhone che mostra un segno di spunta di verifica"
author: "Nicolo Stanciu"
metaTitle: "Leggi il chip NFC del passaporto con il telefono"
metaDescription: "Il passaporto ha un chip NFC e NFC.cool lo legge su iPhone e Android. Guarda la foto e i dati salvati sul chip e controlla se il documento è autentico."
ogTitle: "Il passaporto ha un chip NFC. Ora il telefono lo sa leggere."
ogDescription: "NFC.cool ora legge il chip di passaporti, carte d'identità e permessi di soggiorno: la foto, i dati e l'autenticità del documento. Su iPhone e Android."
---
L'ultima volta che ho preso un aereo sono rimasto un minuto fermo davanti a uno di quei varchi automatici per il passaporto, la cabina di vetro dove appoggi il documento sul lettore, alzi lo sguardo verso la telecamera e aspetti che le porte decidano di trovarti simpatico. Ci vuole un attimo. E in quell'attimo mi sono ritrovato a pensare a quello che la macchina stava facendo davvero. Non stava soltanto leggendo la pagina stampata: stava anche parlando con il chip infilato dentro la copertina del mio passaporto.

Sono anni che leggo chip NFC per lavoro. Sapevo benissimo che quel chip era lì dentro, solo che non ci avevo mai puntato contro la mia app. Fermo dentro quel varco, mi ha dato davvero fastidio che una postazione di frontiera riuscisse a leggere il mio passaporto e NFC.cool no.

NFC.cool esiste proprio per togliersi sfizi del genere. L'obiettivo è sempre stato semplice e un po' testardo: essere il miglior lettore NFC installabile su un telefono e coprire tutto quello che l'NFC sa fare davvero, senza per questo diventare uno strumento da maneggiare solo con una laurea in ingegneria. E il chip di un passaporto è più o meno il massimo di "tutto quello che l'NFC sa fare". Così l'ho aggiunto.

NFC.cool Tools ora legge il chip dentro un passaporto elettronico, una carta d'identità o un permesso di soggiorno, sia su iPhone sia su Android. Mostra la foto e i dati personali salvati sul chip e dice se il documento sembra autentico. Ecco come funziona e dove stanno, onestamente, i suoi limiti.

---

## Il chip non parla finché non dimostri di avere il documento in mano

È la parte che sorprende quasi tutti: non basta passare il telefono sopra un passaporto per leggerlo. Il chip è bloccato di proposito. Non dice una sola parola finché non gli si consegna una chiave, e quella chiave è stampata sul documento stesso.

Trovo che sia una bellissima scelta progettuale. Vuol dire che nessuno può leggerti il passaporto di nascosto mentre se ne sta in tasca o in borsa. L'unica via d'accesso è avere già il documento aperto in mano, perché la chiave si costruisce con quello che c'è stampato sopra: il numero del documento, la data di nascita e la data di scadenza.

Quindi l'app come prima cosa chiede proprio quei tre dati, in uno dei due modi possibili. Il primo è inquadrare con la fotocamera la zona a lettura ottica, la MRZ: quella fascia di caratteri squadrati con i `<<<` in fondo alla pagina con la foto del passaporto, o sul retro di una carta d'identità. NFC.cool la legge otticamente, esattamente come fa il varco in aeroporto. Il secondo è digitare i tre valori a mano, se il documento è consumato o la luce è scarsa. In entrambi i casi, appena l'app ha la chiave ti chiede di appoggiare il bordo superiore del telefono al documento, e comincia la lettura vera e propria del chip. Se ti sei mai chiesto [come funziona davvero l'NFC sull'iPhone](/blog/nfc-on-iphones-insider-look/), qui c'è la stessa stretta di mano a distanza ravvicinata, solo con un chip molto più permaloso dall'altra parte.

---

## Cosa esce dal chip

Qualche secondo dopo hai davanti quello che il chip si porta dietro da sempre: la foto che l'autorità di rilascio ha memorizzato, il nome, la cittadinanza, il numero del documento, la data di nascita e la data di scadenza e, su alcuni documenti, qualcosa in più, come il luogo di nascita, l'autorità che l'ha rilasciato e la data di emissione. Sono gli stessi dati che legge la postazione dell'agente di frontiera, solo che stavolta stanno nella tua mano.

Ogni documento letto viene salvato in un piccolo portafoglio dentro l'app, chiamato I miei documenti, per poterlo riconsultare più avanti. Quel portafoglio resta sul dispositivo e su iPhone si sincronizza attraverso il tuo iCloud. A me non arriva niente e non finisce su nessun server mio. Con dati così personali, non è un dettaglio che mi va di nascondere in fondo alla pagina.

<figure class="phone-figure" data-layout="stage">
<figcaption>Leggere un passaporto con NFC.cool Tools</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/read-passport-nfc-chip/1-key-440w.webp" alt="La schermata Passaporto e documento d'identità di NFC.cool Tools, con le opzioni per la scansione con la fotocamera e l'inserimento manuale"><p><strong>Dagli la chiave.</strong> Inquadra la zona a lettura ottica con la fotocamera, oppure scrivi a mano i tre valori.</p></li>
<li><img src="/assets/images/Blog/screens/read-passport-nfc-chip/2-chip-440w.webp" alt="Un passaporto letto, con la foto memorizzata, il nome della titolare e il numero del documento"><p><strong>Leggi il chip.</strong> Appoggia la parte alta del telefono al documento e foto e dati escono dal chip.</p></li>
<li><img src="/assets/images/Blog/screens/read-passport-nfc-chip/3-genuine-440w.webp" alt="Le verifiche di autenticità, tutte superate: documento apparentemente autentico, dati invariati dall'emissione, firma valida, emittente attendibile, protezione del chip dalla clonazione"><p><strong>Controlla il sigillo.</strong> Ogni verifica supportata dal chip, dalla firma dell'emittente alla protezione dalla clonazione.</p></li>
<li><img src="/assets/images/Blog/screens/read-passport-nfc-chip/4-my-documents-440w.webp" alt="I miei documenti, un elenco di cinque passaporti e carte d'identità salvati"><p><strong>Tienilo in I miei documenti.</strong> Salvato sul dispositivo, sincronizzato solo tramite iCloud.</p></li>
</ol>
</figure>

---

## Il documento è autentico?

La parte di cui vado più fiero è il controllo di autenticità. Il chip di un passaporto moderno non è una semplice scheda di memoria: il paese che lo rilascia ne firma il contenuto, un po' come un sigillo di ceralacca impresso sui dati. NFC.cool verifica quel sigillo: che sul chip non sia stato alterato niente dal momento del rilascio, che la firma sia matematicamente valida e che risalga a un'autorità di rilascio reale, tra quelle che l'app riconosce. I chip migliori sanno anche dimostrare di essere il silicio originale e non una copia, e l'app controlla pure questo, quando il chip lo consente.

C'è però una promessa che mi sono fatto sulle parole da usare. L'app non dirà mai che il tuo passaporto è "falso". Se tutti i controlli passano, dice che il documento risulta autentico. Se qualcosa non torna, o molto più spesso se semplicemente non riesce a confermare chi l'ha rilasciato perché quel paese non è nell'elenco che l'app si porta dietro, dice che non è stato possibile verificarlo, e si ferma lì. "Non sono riuscito a controllarlo" e "questo è un falso" sono due frasi molto diverse, e su una cosa seria come un documento d'identità non ho nessuna intenzione di confonderle.

---

## Cosa l'app non sa fare

Qualche risposta diretta, perché su una funzione del genere girare intorno alle cose sarebbe un pessimo servizio.

Funziona con moltissimi documenti, ma non posso promettere che funzioni proprio con tutti. L'ho provata su una pila di passaporti e carte d'identità di paesi diversi e quasi tutti si leggono senza intoppi, però i documenti del mondo non sono perfettamente uniformi e il tuo potrebbe essere l'eccezione. Se uno si rifiuta, di solito la colpa è del documento, non tua.

Legge quello che le è permesso leggere, e niente di più. Alcuni chip contengono anche le impronte digitali o i dati dell'iride, protetti da chiavi che possiedono soltanto i sistemi di controllo governativi: non è roba che venga data a un'app per il pubblico e non è roba che vorrei che avesse. NFC.cool non ci si avvicina nemmeno. Legge la foto del volto e gli stessi dati anagrafici che trovi stampati sul documento, cioè esattamente la parte pensata per essere leggibile da chi il documento ce l'ha in mano.

E serve un telefono con l'NFC, tenuto fermo contro il documento per tutta la lettura. Il chip è piccolo e il collegamento è delicato, quindi se il telefono scivola bisogna ricominciare da capo. Tieni il documento ben appoggiato al bordo superiore del telefono finché non ha finito.

A quel varco in aeroporto continuo a pensarci. Tutta la messinscena della sicurezza nei viaggi di oggi e, al centro, un minuscolo chip NFC che porta a termine con cura una piccola stretta di mano: la stessa che uso da anni per [leggere e scrivere i tag](/features/nfc-reader-writer/). Adesso sa farla anche il lettore che hai in tasca.

Se vuoi vedere cosa si porta dietro in silenzio il tuo passaporto, il lettore di passaporti e documenti d'identità è dentro NFC.cool Tools su [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-read-passport-nfc-chip-it&mt=8) e [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-read-passport-nfc-chip-it), accanto a tutto il resto che ho costruito per l'NFC. Apri il passaporto, appoggialo al telefono e fai la conoscenza della versione di te che vive sul chip.
