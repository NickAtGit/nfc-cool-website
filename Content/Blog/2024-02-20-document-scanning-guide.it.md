---
id: nfc-blog-024
title: "Uno scanner di documenti sempre in tasca con NFC.cool Tools"
date: 2024-02-20
tags: ["guides", "iphone"]
summary: "Guida pratica allo scanner di documenti di NFC.cool: come ottenere scansioni nitide, perché il passaggio di post-produzione conta e come l'OCR trasforma la scansione in testo consultabile e in PDF."
metaTitle: "Scansione dei documenti con NFC.cool Tools: guida pratica"
metaDescription: "Come scansionare i documenti con NFC.cool Tools: cattura, post-produzione, OCR ed esportazione in PDF consultabili, con consigli su luce e inquadratura."
ogTitle: "Uno scanner di documenti sempre in tasca con NFC.cool Tools"
ogDescription: "Come scansionare i documenti, usare l'OCR ed esportare PDF consultabili con NFC.cool Tools."
image: "/assets/images/Blog/document-scanning-guide.webp"
---
Un iPhone di oggi ha una fotocamera e una potenza di calcolo tali che "scansionare un documento" non è più una funzione della stampante: è questione di un tocco. Lo scanner di documenti di NFC.cool Tools poggia sul framework Vision di Apple: cattura rapida, rilevamento automatico dei bordi e OCR che gira interamente sul dispositivo.

Ecco come sfruttarlo bene.

---

## Cattura: mano ferma e luce giusta

Apri NFC.cool Tools, tocca l'icona del documento e inquadra la pagina. Lo scanner disegna un quadrilatero giallo intorno a quelli che secondo lui sono i bordi del foglio. Quasi sempre ci prende. Quando sbaglia, trascina gli angoli finché non combaciano.

<figure class="phone-figure" data-layout="stage">
<figcaption>Dalla carta a un PDF ricercabile</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/document-scanning-guide/1-capture-440w.webp" alt="La fotocamera per documenti di NFC.cool Tools, con un contratto d'affitto riconosciuto e gli angoli segnati"><p><strong>Acquisisci.</strong> La pagina viene trovata e gli angoli allineati da soli.</p></li>
<li><img src="/assets/images/Blog/screens/document-scanning-guide/2-text-440w.webp" alt="Il testo riconosciuto su una fattura, con Share text e Copy text to clipboard"><p><strong>Leggi il testo.</strong> L'OCR trasforma la scansione in testo da copiare o condividere.</p></li>
<li><img src="/assets/images/Blog/screens/document-scanning-guide/3-search-440w.webp" alt="Documenti salvati cercati per Portland: una fattura, uno scontrino e un contratto d'affitto"><p><strong>Ritrovalo.</strong> La ricerca trova un documento da qualsiasi parola contenga.</p></li>
<li><img src="/assets/images/Blog/screens/document-scanning-guide/4-pdf-440w.webp" alt="Export as PDF, con Share e Save to Files"><p><strong>Esporta.</strong> Un PDF ricercabile, condiviso o salvato in File.</p></li>
</ol>
</figure>

Qualche accorgimento che migliora davvero il risultato:

- **La luce naturale batte quella dall'alto.** I neon del soffitto proiettano sulla pagina l'ombra del telefono stesso. Meglio la luce di una finestra, oppure una lampada da tavolo inclinata di lato sul foglio.
- **Superficie piana.** Una pagina curva deforma il testo e manda in crisi l'OCR.
- **Niente riflessi.** Inclina appena il telefono per evitare il riquadro bianco che si specchia sulla carta lucida.
- **Documenti di più pagine.** Scansiona una pagina dopo l'altra: l'app le impila in un unico documento.

---

## Post-produzione: angoli e modalità colore

Dopo lo scatto si apre il passaggio di post-produzione. Le due cose che vale la pena usare:

- **Regolazione degli angoli.** Il rilevamento automatico è buono ma non infallibile. Se la pagina si stacca poco dallo sfondo, sistema gli angoli a mano con precisione.
- **Modalità colore.** Tre opzioni: colore (foto e documenti colorati), scala di grigi (testo su carta bianca, il risultato più nitido per l'OCR) e bianco e nero (scrittura a mano e scontrini, la resa più pulita in assoluto).

Per le scartoffie di tutti i giorni (fatture, scontrini, contratti) la scala di grigi è il compromesso migliore tra peso del file e precisione dell'OCR.

---

## OCR: dall'immagine al testo consultabile

Tocca **Mostra testo riconosciuto** sotto l'immagine per avviare l'OCR. Il testo compare in un pannello: da lì puoi copiarlo, cercarci dentro o salvarlo.

La qualità dell'OCR dipende da tre cose: nitidezza dell'immagine, luce e carattere tipografico. Il testo stampato su fondo bianco pulito viene riconosciuto quasi al 100%. La scrittura a mano è più difficile: il riconoscimento di Vision se la cava con lo stampatello ordinato e si arrende davanti al corsivo. Se una scansione è venuta male, quasi sempre conviene rifarla con una luce migliore invece di accanirsi sul risultato dell'OCR.

---

## Esportazione: un PDF in cui si può cercare

Quello che rende le scansioni davvero utili nel tempo è l'esportazione in **PDF consultabile**. È un PDF in cui ogni pagina è l'immagine scansionata, con sotto, invisibile, il livello di testo prodotto dall'OCR: il documento sembra un'immagine, ma i motori di ricerca (e Spotlight, e il Finder di macOS) trovano le parole che contiene.

In NFC.cool Tools tocca **Condividi pagina come PDF** e il livello dell'OCR viene incluso in automatico. Metti il PDF nel tuo archivio, tre mesi dopo cerca "fattura 2024-02 acme corp" e salta fuori il documento giusto.

---

## Perché scansionare invece di fotografare

Una foto al documento la puoi sempre scattare. I motivi per preferire lo scanner:

- **Ritaglio dei bordi.** Una scansione si ferma alla pagina. Una foto ci mette dentro anche la scrivania, la tazza del caffè e il gatto.
- **Correzione della prospettiva.** Anche quando lo tieni ben piatto, il telefono non è mai perfettamente perpendicolare al foglio. L'app corregge la distorsione, così la pagina sembra passata allo scanner e non fotografata di sbieco.
- **Più pagine in un file solo.** Cinque foto sono cinque file sparsi nella libreria. Cinque scansioni sono un PDF.
- **Testo consultabile.** L'OCR è già dentro il file esportato.

Per scontrini, contratti, moduli firmati e documenti di lavoro vale una regola sola: scansiona, non fotografare.

La scansione dei documenti fa parte di [NFC.cool Tools per iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-document-scanning-guide-it&mt=8). La versione Android si concentra sull'NFC, perché lo scanner di documenti ha bisogno del framework Vision di Apple.
