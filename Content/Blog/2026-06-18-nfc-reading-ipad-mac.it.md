---
id: "nfc-reading-ipad-mac-2026-06"
title: "Come NFC.cool legge i tag NFC su iPad e Mac"
date: "2026-06-18"
tags: ["announcements", "nfc-tags"]
summary: "iPad e Mac non hanno un chip NFC, quindi ho sempre detto che non potevano leggere i tag. Con un lettore USB esterno la versione 6.15.0 cambia le carte in tavola: ecco come funziona e da dove è nata."
image: "/assets/images/Blog/nfc-ipad-mac-external-reader.webp"
imageAlt: "Un iPad accanto a un lettore NFC USB HID OMNIKEY con un tag appoggiato sopra"
author: "Nicolo Stanciu"
metaTitle: "Come NFC.cool legge i tag NFC su iPad e Mac"
metaDescription: "iPad e Mac non hanno una radio NFC, quindi non leggevano i tag. Con NFC.cool 6.15.0 ci pensa un lettore USB esterno: ecco come funziona su iPad e su Mac."
ogTitle: "La lettura dei tag NFC arriva su iPad e Mac"
ogDescription: "Nessun chip NFC nell'iPad o nel Mac? Con un lettore USB esterno, NFC.cool 6.15.0 legge e scrive i tag anche lì, limiti dichiarati compresi."
---
L'anno scorso sono stato a Bologna per [PragmaConf 2025](https://pragmaconference.com). Era la mia prima volta a quella conferenza e, a conti fatti, anche l'ultima: gli organizzatori non riescono più a portarla avanti, quindi l'edizione a cui sono andato è stata quella finale. Un po' mi dispiace ancora.

Mentre ero lì ho fatto due chiacchiere con [Alexander Manzer](https://www.linkedin.com/in/alexander-manzer), anche lui sviluppatore iOS e NFC. A un certo punto il discorso è finito su un problema che avevo archiviato da tempo alla voce "impossibile": leggere i tag NFC su un iPad. Gli iPad non hanno il chip NFC, quindi avevo sempre risposto a tutti che non c'era proprio modo di farlo. Alexander mi ha detto il contrario, a patto di usare il lettore esterno giusto, e si è offerto di mandarmi un po' di codice per iniziare. L'ha fatto qualche giorno dopo. È grazie a quelle poche righe che oggi NFC.cool legge i tag NFC su iPad e Mac.

---

## Avevo detto che non si poteva fare

A maggio, [quando NFC.cool è arrivata su Mac](/blog/nfc-cool-comes-to-mac/), ho dedicato un'intera sezione a ciò che sul Mac non si può fare, e in cima alla lista avevo messo proprio la scansione NFC. Il ragionamento era semplice: i Mac non hanno una radio NFC, gli iPad non hanno una radio NFC, ed è un limite hardware che nessun mio aggiornamento software può superare.

Quella parte è ancora vera, se parliamo del chip integrato nel dispositivo. Quello che mi era sfuggito è che il chip integrato non è l'unica strada: un lettore puoi anche collegarlo da fuori.

---

## Come funziona senza un chip NFC

Il trucco è un lettore NFC USB esterno. Lo colleghi all'iPad o al Mac e NFC.cool ci parla direttamente. Non c'è nessun driver da installare: tutto passa dal supporto per le smart card che Apple include già in iPadOS e macOS, quindi appena infili il lettore nella porta USB-C l'app se ne accorge e ci si aggancia da sola.

Quando c'è un lettore esterno collegato, l'app gli dà la precedenza. Su iPad o Mac quel lettore è l'unico hardware NFC in gioco, quindi non c'è nulla da decidere. Su iPhone diventa invece una scelta che l'app fa al posto tuo: se colleghi un lettore, NFC.cool usa quello; se non lo colleghi, il telefono ricade sull'NFC integrato. Non devi attivare nessuna impostazione né scegliere una modalità, perché l'app capisce da sola con che hardware ha a che fare e si comporta di conseguenza.

Il lettore su cui ho costruito tutto, e l'unico che ho provato davvero, è l'HID OMNIKEY 5022 CL. Funzionano anche altri lettori USB: alcuni li trovi nell'elenco qui sotto, segnalati dagli utenti che li hanno messi alla prova.

<figure class="phone-figure" data-layout="stage" data-device="ipad">
<figcaption>Un iPad con un lettore USB</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-1-place-tag-600w.webp" alt="NFC.cool su un iPad con un lettore NFC USB esterno collegato: Place tag on reader"><p><strong>Collega un lettore.</strong> NFC.cool lo riconosce da solo e aspetta un tag.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-2-tag-read-600w.webp" alt="NFC.cool sull'iPad dopo la lettura: una spunta verde e Tag read"><p><strong>Appoggia il tag.</strong> Il lettore si occupa della radio, l'iPad del resto.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-3-record-600w.webp" alt="Il record completo del tag sull'iPad: un biglietto da visita di Anna Miller, con la vCard grezza sotto"><p><strong>Tutto quello che vedresti su un iPhone.</strong> Gli stessi record, gli stessi strumenti.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-4-sonicare-600w.webp" alt="Sonicare Reset sull'iPad: una testina all'80% di utilizzo, con Reset Timer"><p><strong>Anche il caso difficile.</strong> Leggere una testina Sonicare e riscrivere il suo contatore protetto da password funziona.</p></li>
</ol>
</figure>

---

## I lettori che funzionano

Ecco tutti i lettori che a oggi mi risulta funzionino con NFC.cool:

- **HID OMNIKEY 5022 CL** - quello su cui ho costruito tutto e che ho provato dall'inizio alla fine ([Amazon](https://amzn.to/3SNPi46))
- **HID OMNIKEY 5422** - segnalato come funzionante da un utente ([Amazon](https://amzn.to/4xZVEwe))
- **ACS ACR1552U-M1** - segnalato come funzionante da un utente ([Amazon](https://amzn.to/4xZVEwe))
- **ACS ACR1255U-J1** - segnalato come funzionante da un utente ([Amazon](https://amzn.to/4xZVEwe))

Grazie a tutti quelli che mi hanno scritto. Non posso comprare ogni lettore in commercio, quindi ogni modello dopo il primo è finito in questa lista perché qualcuno lo ha comprato, lo ha provato e si è preso il tempo di raccontarmelo. Se usi un lettore che qui non c'è, [scrivimi](/contact/) e dimmi se ha funzionato oppure dove si è bloccato: lo aggiungo al post.

Quelli sono link di affiliazione Amazon: se acquisti passando da lì posso ricevere una piccola commissione, senza costi aggiuntivi per te.

---

## Cosa si può fare con un lettore esterno

<figure class="phone-figure" data-layout="float" data-device="mac">
<ol>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/mac-1-my-messages-1280w.webp" alt="Un MacBook con un lettore NFC USB esterno accanto, che mostra My NFC Messages di NFC.cool"><p><strong>Anche su Mac.</strong> Collega il lettore al Mac, e ogni tag letto finisce in My NFC Messages.</p></li>
</ol>
</figure>

Quasi tutto quello che faresti da iPhone. Leggi i tag ed estrai l'intera memoria, scrivi messaggi NDEF e lanci lavori in serie che leggono o scrivono una pila intera di tag uno dopo l'altro. La protezione con password funziona. Funziona anche [OpenPrintTag](/blog/openprinttag-read-write-nfc-spools-phone/), il formato per le bobine di filamento delle stampanti 3D, in entrambe le direzioni. E sì, gira pure l'[azzeramento del contatore delle testine Philips Sonicare](/blog/reset-sonicare-brush-head-nfc/).

Proprio quest'ultimo è stato il punto più ostico. Azzerare una testina Sonicare significa leggere un contatore dal tag e poi riscrivere su una pagina protetta da password, e il tag accetta quella scrittura solo se ti considera ancora autenticato dall'istante precedente. Con un lettore esterno questo voleva dire tenere aperta un'unica sessione con il lettore per entrambi i passaggi, invece di lasciarla chiudere nel mezzo. Sistemato quello, le operazioni che ne dipendono - le scritture protette, l'azzeramento della testina - hanno cominciato a funzionare esattamente come funzionano da telefono.

---

## Quello che ancora non funziona

Un paio di cose non ci sono ancora, e preferisco dirtele io piuttosto che fartele scoprire per conto tuo.

- L'OMNIKEY 5022 CL è l'unico lettore che ho provato di persona. Gli altri dell'elenco qui sopra arrivano dalle segnalazioni degli utenti, e tutto ciò che sta fuori da quella lista è terreno inesplorato.
- I tag MIFARE Classic, attraverso il lettore, sono in sola lettura. Si leggono, non si scrivono.

Niente di tutto questo rovina l'uso che ne farà la maggior parte delle persone, ma sono limiti reali, ed è il genere di cose che vorrei sapere io prima di comprare un lettore.

---

## Grazie, Alexander

Voglio essere chiaro su come è nata questa storia. Non mi sono seduto a inventarla: Alexander mi ha messo in mano il filo e io l'ho tirato. Non era tenuto a condividere quel codice e gli sono grato di averlo fatto. Il motivo per cui poi ci ho messo tanta ostinazione è semplice: volevo che NFC.cool fosse la prima app per iPad capace di leggere davvero un tag NFC. Che ci sia arrivata per prima o no, ne è valsa la pena.

La lettura dei tag NFC su iPad e Mac arriva con NFC.cool 6.15.0. Se hai un iPad o un Mac, un lettore compatibile e un tag che dalla scrivania non eri mai riuscito a scansionare, funzionerà e basta.

Ti serve il lettore? Ecco l'HID OMNIKEY 5022 CL su [Amazon](https://amzn.to/3SNPi46): il link ti porta allo store Amazon del tuo paese. È un link di affiliazione, quindi se acquisti passando da lì posso ricevere una piccola commissione senza costi aggiuntivi per te, e questo aiuta a finanziare il lavoro su NFC.cool.

[Scarica NFC.cool Tools per iPhone, iPad e Mac](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-reading-ipad-mac-it&mt=8)

E se c'eri anche tu a quell'ultima PragmaConf di Bologna: grazie, è stata bella. Mi dispiace solo che non ce ne sarà un'altra.
