---
id: nfc-blog-025
title: "Scansione 3D su iPhone: cosa sanno fare fotogrammetria e LiDAR in un telefono"
date: 2024-02-21
tags: ["guides", "iphone"]
summary: "NFC.cool Tools trasforma l'iPhone in uno scanner 3D grazie a Object Capture di Apple. Fotogrammetria e LiDAR insieme producono modelli da esportare in .stl, .obj e .usdz, pronti per la stampa 3D, per la realtà aumentata o per qualsiasi flusso di lavoro 3D."
metaTitle: "Scansione 3D su iPhone con NFC.cool Tools: come funziona"
metaDescription: "Come funziona lo scanner 3D di NFC.cool Tools: fotogrammetria, LiDAR e Object Capture di Apple. Esporta in .stl, .obj, .ply e .usdz per stampa 3D e AR."
ogTitle: "Scansione 3D su iPhone: cosa sanno fare fotogrammetria e LiDAR in un telefono"
ogDescription: "Come funziona lo scanner 3D di NFC.cool Tools: fotogrammetria, LiDAR ed esportazione in .stl, .obj e .usdz."
image: "/assets/images/Blog/3d-scan-feature.webp"
---
Fino a qualche anno fa, per una scansione 3D servivano uno scanner grande come un forno a microonde e un software che costava più dell'hardware. Oggi bastano un iPhone con sensore LiDAR e Object Capture di Apple per ricavare un modello 3D utilizzabile da una manciata di foto.

La funzione **Scanner di oggetti 3D** di NFC.cool Tools racchiude tutta quella catena in un flusso di lavoro che ti sta in tasca.

---

## Cosa succede davvero durante una scansione

Lavorano insieme due tecnologie:

- **Fotogrammetria** - L'app scatta decine di foto dell'oggetto da angolazioni diverse. Un motore di fotogrammetria (su iOS è Object Capture di Apple) individua gli elementi che ricorrono nelle varie foto e li triangola in una mesh 3D.
- **LiDAR** - Sugli iPhone dotati di sensore LiDAR (i modelli Pro dall'iPhone 12 in poi) ogni fotogramma porta con sé anche le misure di profondità rilevate dal sensore. La mesh ne guadagna in due modi ben precisi: la scala è corretta, cioè il modello ha le dimensioni reali dell'oggetto, e le superfici prive di dettagli visivi evidenti (una parete bianca, una curva lucida) ottengono una geometria sensata proprio dove la sola fotogrammetria si arrenderebbe.

Di tutto questo non devi occuparti: l'app ti guida durante la ripresa e poi esegue la ricostruzione direttamente sul dispositivo.

---

## Come ottenere una scansione fatta bene

Qualche regola pratica:

- **Gira lentamente intorno all'oggetto.** L'app si aspetta una copertura più o meno continua. Non saltare da un lato a quello opposto: fai il giro.
- **Tieni l'oggetto dentro l'inquadratura.** Un margine costante intorno all'oggetto va benissimo; tagliarlo ai bordi significa perdere dati.
- **Luce uniforme.** Le ombre nette mandano in confusione la fase di fotogrammetria. Una luce diffusa (l'ombra all'aperto, un softbox, la luce del giorno in casa) dà la mesh più pulita.
- **Le superfici ricche di dettagli si scansionano meglio di quelle lisce.** Una tazza decorata viene quasi perfetta. Una sfera di metallo lucidato è davvero un problema. Il LiDAR aiuta nel secondo caso, ma non fa miracoli.
- **Fermati un attimo a ogni angolazione.** Il mosso si mangia i dettagli.

Una scansione completa richiede 20-40 secondi di giro intorno all'oggetto e altri 30-60 secondi di elaborazione.

<figure class="phone-figure" data-layout="stage">
<figcaption>Scansionare un oggetto in 3D</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/3d-scan-feature/1-scan-object-440w.webp" alt="La scheda 3D di NFC.cool Tools con Scan Object e Scan Room"><p><strong>Scan Object.</strong> Nella scheda 3D, accanto a Scan Room.</p></li>
<li><img src="/assets/images/Blog/screens/3d-scan-feature/2-walk-around-440w.webp" alt="La cattura dell'oggetto: una radio portatile dentro un riquadro, con l'invito a tenere tutto l'oggetto nel riquadro mentre ci giri intorno"><p><strong>Girale intorno.</strong> Tieni l'oggetto nel riquadro mentre ci giri intorno lentamente.</p></li>
<li><img src="/assets/images/Blog/screens/3d-scan-feature/3-building-440w.webp" alt="Un anello di avanzamento al 62 per cento: Building your 3D model"><p><strong>Lascialo costruire.</strong> Il modello viene creato sull'iPhone. Tieni l'app aperta nel frattempo.</p></li>
<li><img src="/assets/images/Blog/screens/3d-scan-feature/4-model-440w.webp" alt="Il modello finito: Vintage Radio, salvato come oggetto"><p><strong>Il tuo modello.</strong> Salvato con gli altri, pronto da guardare o esportare.</p></li>
</ol>
</figure>

---

## I formati di esportazione

NFC.cool Tools esporta nei formati che poi ti servono davvero:

- **.stl** - Stampanti 3D. Gli slicer come Bambu Studio, Cura e PrusaSlicer lo accettano tutti.
- **.obj** - Il formato 3D universale. Si importa in Blender, Cinema 4D, Unity, Unreal e praticamente in qualsiasi programma di modellazione.
- **.ply** - Un formato mesh che conserva i colori dei vertici, utile quando il colore della superficie conta più dei materiali con mappatura UV.
- **.usdz** - Il formato di Apple per la realtà aumentata. Lo apri in Quick Look e in AR Quick Look oppure lo usi in RealityKit.
- **.abc** (Alembic) - Per i flussi di lavoro dell'animazione.
- **.usd** - Universal Scene Description, supportato dalla maggior parte dei programmi DCC moderni.

Il modello è sempre lo stesso. Il formato decide soltanto quale programma riesce a leggerlo.

---

## Cosa farci con il modello finito

Gli usi più divertenti che ho visto tra chi usa l'app:

- **Stampare una copia in 3D.** Scansioni un oggetto trovato in giro, lo passi allo slicer, lo stampi.
- **Documentare un oggetto reale.** Inventari di un'eredità, catalogazione museale, oppure semplicemente "com'è fatto davvero il vaso della nonna".
- **Condividere in realtà aumentata.** Mandi il file .usdz a qualcuno che ha un iPhone: lo tocca e con AR Quick Look si ritrova l'oggetto in mezzo al salotto.
- **Portarlo dentro un motore di gioco.** Un oggetto di scena reale dentro una scena Unity, modellato in 90 secondi e senza un grafico 3D.

---

## Dove funziona bene e dove no

Fotogrammetria e LiDAR insieme se la cavano benissimo con:
- Oggetti solidi e opachi
- Superfici lavorate o decorate
- Soggetti fermi, cioè tutto quello che non si muove durante la scansione

Faticano invece con:
- Oggetti trasparenti o che rifrangono la luce (vetro, acqua, lenti)
- Metalli molto riflettenti
- Dettagli sottilissimi (cavi, fili, capelli)
- Qualsiasi cosa si muova

Quando le condizioni ci sono, il risultato è utile sul serio, non un giocattolo. Per tutto il resto, metti in conto di ripulire la mesh in Blender oppure di accettare il limite.

Lo **Scanner di oggetti 3D** fa parte di [NFC.cool Tools per iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-3d-scan-feature-it&mt=8). Object Capture di Apple ha bisogno del sensore LiDAR, quindi funziona sugli iPhone Pro (iPhone 12 Pro e successivi) e sugli iPad Pro dal 2020 in poi.
