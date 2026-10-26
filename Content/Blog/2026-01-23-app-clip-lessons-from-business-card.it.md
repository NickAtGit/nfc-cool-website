---
id: "app-clip-lessons-2026-01"
title: "Creare una buona esperienza App Clip: cosa ho imparato con NFC.cool Business Card"
date: "2026-01-23"
tags: ["business-cards", "networking", "iphone"]
summary: "Il riassunto del mio intervento all'mDevCamp 2025 di Praga sull'architettura dietro l'App Clip di NFC.cool Business Card."
metaDescription: "Cosa ho imparato creando l'App Clip di NFC.cool Business Card: architettura, limiti di peso e contatti salvati al volo. Dal mio intervento all'mDevCamp 2025."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/app-clip-mdevcamp.webp"
imageAlt: "Il mio intervento all'mDevCamp 2025 a Praga"
---

Nel 2025 ho tenuto il mio primo intervento a una conferenza e ho scelto un argomento dentro cui vivevo da anni, ma che non avevo mai dovuto spiegare a una sala piena di gente: come funziona davvero l'App Clip dietro NFC.cool Business Card. L'occasione era l'mDevCamp 2025 di Praga, e all'intervento ho dato lo stesso titolo di questo articolo.

Se non ti è mai capitato di incontrarne uno, un App Clip è la porzione ridotta di un'app iOS che si apre all'istante avvicinando un tag NFC o scansionando un codice QR, senza App Store e senza installare niente. È quello che permette a una persona di vedere il tuo biglietto da visita NFC.cool circa un secondo dopo che avete avvicinato i telefoni, senza scaricare nulla. Far sembrare tutto questo istantaneo, tenendo al riparo i dati del biglietto condiviso e senza obbligare nessuno a registrarsi, richiede più scelte di architettura di quante se ne immaginino da fuori. Nell'intervento le ho ripercorse una a una: com'è strutturato l'App Clip, dove SwiftUI si guadagna il posto e come il backend gestisce i dati del biglietto.

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/app-clip-lessons-from-business-card/app-clip-440w.webp" alt="L'App Clip di NFC.cool Business Card dopo il tocco: Devon Baptiste di Baptiste Electrical, con i link Website, Facebook e YouTube e il pulsante Save Contact"><p><strong>L'App Clip.</strong> Quello che si apre circa un secondo dopo il tocco, senza installare nulla.</p></li>
</ol>
</figure>

Spiegarlo da un palco mi ha fatto bene. Mi ha costretto a giustificare scelte che avevo preso quasi sempre d'istinto, e le domande finali, arrivate da sviluppatori iOS che si vedeva avessero combattuto le mie stesse battaglie, sono state più affilate di qualsiasi revisione del codice. L'impianto su cui mi ero fermato, gli App Clip con SwiftUI e un'API di backend sicura, ha retto all'esame, e un paio di suggerimenti raccolti nelle chiacchiere di corridoio sono già finiti dentro l'app.

L'intervento completo si può guardare su [Slideslive](https://slideslive.com/39043369/building-a-great-app-clip-experience-lessons-from-nfccool-business-card).
