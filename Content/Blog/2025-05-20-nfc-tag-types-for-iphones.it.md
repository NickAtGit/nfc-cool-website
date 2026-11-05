---
id: "nfc-tag-types-2025-05"
title: "I cinque tipi di tag NFC e quali funzionano con l'iPhone"
date: "2025-05-20"
tags: ["nfc-tags", "guides", "iphone"]
summary: "Dal Tipo 1 al Tipo 5: chi li produce e perché la serie NTAG (Tipo 2) è la scelta più sicura per i progetti su iPhone."
metaDescription: "I tipi di tag NFC spiegati: dal Tipo 1 al Tipo 5, chi produce i chip e perché la serie NTAG (Tipo 2) è la scelta più compatibile per i progetti su iPhone."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/nfc-tag-types.webp"
imageAlt: "Diversi tipi di tag NFC allineati accanto a un iPhone"
---

I tag NFC sono minuscoli circuiti integrati che conservano informazioni leggibili da qualunque dispositivo dotato di NFC, telefono compreso. C'è però una cosa che avrei voluto sapere prima: i tag NFC non sono tutti uguali. Esiste un intero zoo di tipi diversi, prodotti da aziende diverse, ognuno con le sue stranezze, e questo rende la scelta del tag giusto per l'iPhone più complicata di quanto sembri.

Sviluppo NFC.cool da anni, un'app per leggere e scrivere tag NFC, e "quale tag compro per l'iPhone?" è senza dubbio una delle domande che ricevo più spesso. Questa è la risposta che do di solito. Passo in rassegna i cinque tipi di tag NFC, chi li produce davvero e perché uno di questi è la scelta sicura per quasi ogni progetto su iPhone. Se parti proprio da zero, conviene cominciare dalla [guida completa ai tag NFC per principianti](/it/blog/nfc-tags-beginners-guide/): qui scendo di un livello.

---

## Come sono classificati i tag NFC

I tag NFC si dividono in cinque tipi: Tipo 1, Tipo 2, Tipo 3, Tipo 4 e Tipo 5. Non è una classificazione inventata dai produttori: arriva dall'NFC Forum, il consorzio industriale che definisce gli standard. Ogni tipo ha una sua capacità di memoria e una sua velocità, e può essere riscrivibile oppure di sola lettura.

È la lente con cui leggo la scheda tecnica di qualsiasi tag, quindi vediamoli uno per uno.

---

## Tipo 1 e Tipo 2 - Topaz e MIFARE Ultralight®

Il Tipo 1 (Topaz, di Broadcom) e il Tipo 2 (MIFARE Ultralight®, di [NXP Semiconductors](https://nxp.com)) occupano la fascia economica e senza pretese. Vanno benissimo per usi semplici come manifesti e biglietti da visita. La memoria è poca, da 48 byte a circa 2 KB, ma per esperienza basta e avanza per un URL o per un testo breve, che poi è quello che serve alla maggior parte delle persone.

---

## Tipo 3 - FeliCa™

I tag di Tipo 3, noti anche come FeliCa™, sono stati sviluppati da Sony. Si incontrano soprattutto in Asia, dove fanno funzionare i titoli di viaggio dei trasporti pubblici e la moneta elettronica. Offrono velocità e memoria superiori, fino a 1 MB, ma la diffusione resta limitata: costano di più e sono legati ad applicazioni locali. Fuori da quel contesto non mi capita quasi mai di usarli.

---

## Tipo 4 - MIFARE DESFire®

I tag MIFARE DESFire®, anch'essi di NXP Semiconductors, sono di Tipo 4. Sono l'opzione ad alta sicurezza e alta capacità, pensata per compiti complessi come il controllo degli accessi protetto e i sistemi di trasporto pubblico. Arrivano a 8 KB di memoria. Quando un progetto ha davvero bisogno di protezione crittografica, è questa la famiglia che guardo. Al tema della sicurezza ho dedicato un articolo a parte: [come custodire i segreti sui tag NFC cifrati](/it/blog/nfc-safe-encrypted-secrets/).

---

## Tipo 5 - ISO 15693

I tag di Tipo 5 rispettano lo standard ISO 15693 e sono arrivati da relativamente poco nell'ecosistema NFC. Il loro terreno è soprattutto quello industriale e il loro punto di forza è la distanza di lettura, maggiore rispetto agli altri tipi. Comodi per tracciare le scorte in un magazzino, molto meno per il tag attaccato al frigorifero.

---

## Quale tag NFC conviene scegliere per l'iPhone?

Ecco la parte che conta di più. Dall'iPhone 7 in poi ogni iPhone legge i messaggi NDEF di tutti e cinque i tipi NFC Forum e, da iOS 13, le app come la mia dialogano in modo nativo anche con i tag di Tipo 3, 4 e 5, oltre al semplice NDEF. Ma la strada più fluida e prevedibile resta il Tipo 2, ed è quello che consiglio per quasi ogni progetto. I tag NFC di Tipo 2 sono la [serie NTAG](https://www.nxp.com/products/wireless-connectivity/nfc-hf/ntag-for-tags-and-labels:NTAG-TAGS-AND-LABELS) di NXP Semiconductors.

I modelli NTAG213, NTAG215 e NTAG216 sono i più diffusi della serie e con l'iPhone vanno una meraviglia: sono quelli su cui faccio le prove tutti i giorni. La memoria, da 144 a 888 byte, basta per la maggior parte dei progetti concreti, qualunque iPhone dotato di NFC li legge e li scrive senza problemi e sono riscrivibili, quindi il contenuto si cambia tutte le volte che serve.

Un'annotazione pratica che mi ha risparmiato parecchie arrabbiature: più il tag e la sua antenna sono grandi, più il lettore NFC lo aggancia con sicurezza. Se per il tuo progetto conta l'affidabilità, eviterei gli adesivi economicissimi e scadenti: i pochi centesimi risparmiati non valgono un tag che si legge solo al terzo tentativo.

Quello che l'iPhone fa soprattutto con l'NFC è leggere i messaggi in formato NDEF, cioè NFC Data Exchange Format: URL, testo semplice o vCard, i biglietti da visita digitali. Qualsiasi tag che supporti l'NDEF, e quasi tutti quelli della serie NTAG lo fanno, è una buona scelta per chi ha un iPhone. Quando arriva il momento di scriverci dentro qualcosa, ho preparato una guida passo passo su [come scrivere i tag NFC con l'iPhone](/it/blog/write-nfc-tags-iphone/).

---

## In sintesi

Se stai comprando tag NFC da usare con l'iPhone, il mio consiglio sincero è semplice: tag di Tipo 2 della serie NTAG di NXP Semiconductors. Costano poco e offrono la compatibilità e le funzioni migliori per quello che quasi tutti vogliono fare con l'NFC sull'iPhone. Prendi una confezione di adesivi NTAG215 e sei a posto per quasi qualsiasi cosa.

L'NFC continua a evolvere, quindi vale la pena tenere d'occhio le novità e le specifiche dei nuovi tag. Per approfondire c'è anche [uno sguardo dall'interno all'NFC sugli iPhone](/it/blog/nfc-on-iphones-insider-look/); e se ti serve solo vedere che cosa c'è già scritto su un tag, lo [leggi direttamente dal browser](/it/online-nfc-reader/).

Buone scansioni!
