---
id: "e-ink-phone-case-2026-10"
title: "Ho hackerato la mia custodia e-ink per scriverci dall'iPhone"
date: "2026-10-12"
tags: ["announcements", "iphone", "nfc-tags"]
summary: "Ho una di quelle custodie per telefono con schermo e-ink NFC e senza batteria, e l'app che la accompagnava non mi piaceva. Così ho scoperto come comunica, e ora NFC.cool Tools 7.2.0 può mostrare foto, codici QR, il prossimo evento, l'agenda di oggi e i promemoria sulle custodie che usano l'app DeerPhoneCase, KAZAVA, Novixand o TYOHINN."
image: "/assets/images/Blog/nfc-e-ink-phone-case-iphone.webp"
imageAlt: "Un iPhone in una custodia nera con uno schermo e-ink sul retro che mostra un sole rosso e giallo sopra colline nere, accanto a un secondo iPhone che invia la stessa immagine via NFC"
author: "Nicolo Stanciu"
metaTitle: "App per custodie e-ink NFC su iPhone: foto, calendario, QR"
metaDescription: "Foto, codici QR, agenda e promemoria su una custodia e-ink NFC senza batteria, direttamente da iPhone. Funziona con le custodie DeerPhoneCase, KAZAVA, Novixand e TYOHINN."
ogTitle: "Ho hackerato la mia custodia e-ink per scriverci dall'iPhone"
ogDescription: "Come ho decifrato il protocollo di una custodia e-ink NFC senza batteria, e cosa può mostrare ora NFC.cool sul suo schermo."
---

Lo schermo ha sfarfallato.

Una cosa da niente. I pannelli e-ink lo fanno ogni volta che si aggiornano: un lampo rapido che passa per tutti i colori prima che la nuova immagine si assesti. Ma quel lampo nasceva da codice scritto da me, partito dal mio iPhone e arrivato nel retro di una custodia senza batteria. Qualche secondo dopo l'intero pannello era rosso. Un rosso pieno, con un'aria un po' cartacea. Nient'altro. Solo rosso.

In tutti questi anni ho sviluppato un sacco di funzioni NFC, e quel semplice rettangolo rosso è tra i momenti che ricordo con più piacere.

---

## Uno schermo che vive senza batteria

Se non ne hai mai vista una: sembra una normale custodia per telefono, solo che buona parte del retro è uno schermo e-ink, lo stesso tipo di display degli e-reader. Il mio disegna con quattro inchiostri: nero, bianco, rosso e giallo.

Dentro non c'è nessuna batteria e nessuna porta di ricarica. La custodia prende l'energia dal campo NFC del telefono, lo stesso che risveglia un adesivo NFC quando lo scansioni. Finché il telefono resta appoggiato alla custodia, alimenta un piccolo chip e un microcontrollore, che ridisegnano lo schermo. Una volta comparsa l'immagine, l'e-ink non ha più bisogno di energia per mantenerla. Resta lì e basta: con il telefono scarico, in fondo a un cassetto, ovunque.

Mi piace pensarla come una lavagna magica che solo il telefono sa cancellare. Finché non ci riavvicini il telefono, non cambia niente.

Queste custodie si vendono con un'infinità di nomi diversi, e quasi ogni marchio ha la sua app. La mia era accompagnata da un'app chiamata **DeerPhoneCase**. Delle altre parlo più avanti.

---

## Perché l'app ufficiale non mi bastava

Con la mia custodia ho provato un bel po' di app dei produttori, e molte funzionano. Ma sono tutte davvero brutte da usare. Non sono app native per iPhone, per fare quasi tutto devi prima accedere con un account, e alla fine non vogliono fare molto più che mettere un'immagine.

Guardando quello schermo sul retro del telefono, non ci vedevo una cornice per foto. Ci vedevo un piccolo display sempre acceso che non consuma batteria. Il posto ideale per la mia prossima riunione, per l'agenda della giornata o per un codice QR che chiunque può scansionare direttamente dal retro del mio telefono. L'app ufficiale non sapeva fare niente di tutto questo, e io sviluppo un'app che ruota tutta intorno all'NFC. Così ho deciso di insegnare io a NFC.cool a parlare con la custodia.

---

## Come ho decifrato il protocollo

Ci ho lavorato insieme a Claude, il modello di IA di Anthropic, che si è rivelato un compagno molto paziente quando c'era da spulciare codice decompilato.

La prima idea era la più ovvia: guardare come l'app ufficiale per iPhone dialoga con la custodia. Vicolo cieco. Le app dell'App Store sono cifrate, e non c'era niente di utile da leggere.

Con la versione Android è andata diversamente. La custodia è un prodotto white label, quindi l'app dello stesso produttore si trova anche su Google Play con un nome tutto suo, e le app Android si possono decompilare. L'abbiamo smontata pezzo per pezzo, e tra quel codice e quello che siamo riusciti a trovare online sul chip all'interno (un chip NFC Fudan con un microcontrollore alle spalle), è venuto fuori l'intero dialogo tra telefono e custodia:

1. Telefono e custodia si scambiano una breve procedura di accesso, così la custodia sa che dall'altra parte c'è davvero un'app.
2. Da lì in poi ogni comando viaggia cifrato.
3. L'immagine arriva in 139 pacchetti di pixel grezzi. Ogni pixel occupa due bit, che bastano esattamente per quattro inchiostri.
4. Il telefono dice alla custodia di ridisegnare lo schermo e poi, ogni secondo, le chiede se ha finito.

Il mio primo test non scriveva niente di sofisticato, solo un unico colore su tutto lo schermo. Era quel rettangolo rosso.

---

## Il muro dei 20 secondi

Poi sono passato alle immagini vere, e uscivano rovinate. Righe sullo schermo, colori sballati, mezza foto.

Il ridisegno dura circa 18 secondi, e la connessione cadeva sempre più o meno allo scoccare dei 20. Claude era convinto che iOS chiudesse ogni sessione NFC dopo 20 secondi e che non ci fosse niente da fare. Io non ci credevo, perché l'app ufficiale ci riusciva sullo stesso identico iPhone.

Così ho collegato l'iPhone al Mac e ho registrato il log di sistema mentre l'app ufficiale disegnava un'immagine. Il trucco era lì: iOS limita a una ventina di secondi ogni singola *connessione* a un tag, non l'intera sessione. Appena inviata l'immagine, l'app ufficiale chiude la connessione, si ricollega circa un decimo di secondo dopo e lascia che la custodia ridisegni lo schermo su quella connessione nuova, con 20 secondi pieni a disposizione.

Quando NFC.cool ha cominciato a fare lo stesso, le immagini sono uscite pulite. Lo confesso: averci visto giusto, quella volta, mi ha dato una certa soddisfazione.

---

## Cosa può mostrare NFC.cool sulla custodia

La funzione si trova in **NFC.cool Tools 7.2.0**, tra le Applicazioni NFC, con il nome **Custodia e-ink**. Scegli un design, controlli l'anteprima che mostra esattamente come apparirà sulla custodia, togli la custodia dal telefono e tieni l'iPhone appoggiato sul retro finché la finestra NFC non si chiude.

- **Foto**: qualsiasi immagine della libreria, ritagliata sulle misure dello schermo. Questa è gratuita. L'app converte la foto nei quattro inchiostri, con il potenziamento dei colori (Standard, Vivace o Max) e un'opzione in bianco e nero.
- **Soggetto scontornato**: isola la persona, l'animale o l'oggetto di una foto e lo mette su uno sfondo in uno dei quattro inchiostri.
- **Codice QR**: qualsiasi codice QR salvato in NFC.cool, con il suo design, oppure uno che digiti al momento. Puoi invertirne i colori, e l'app ti avvisa quando il testo è troppo lungo perché il codice resti leggibile su uno schermo così piccolo.
- **Prossimo evento** oppure un **evento scelto** dal calendario.
- **Agenda di oggi**: tutto quello che hai in calendario per la giornata.
- **Promemoria**: quelli ancora da completare in uno dei tuoi elenchi, con tre dimensioni del testo.

I design con calendario e promemoria sono istantanee. La custodia mostra la situazione del momento in cui li hai inviati, finché non ne invii un altro. Senza il telefono non può aggiornarsi da sola, ed è il prezzo da pagare per non aver mai bisogno di un caricabatterie.

---

## Qualche consiglio pratico

**Lascia riposare la custodia tra una scrittura e l'altra.** Se invii due design uno dopo l'altro, il secondo esce sbiadito e grigiastro. Tra un ridisegno e il successivo la custodia ha bisogno di un attimo per riprendersi. L'app ufficiale chiede di aspettare un minuto, e il consiglio vale anche per NFC.cool.

**Tieni fermo il telefono.** L'operazione richiede un po' di tempo, quasi tutto per il ridisegno. Se allontani l'iPhone troppo presto, l'app te lo segnala e basta riprovare.

**Per ora solo su iPhone.** La funzione è nell'app per iPhone. L'app Android non ce l'ha ancora.

**Quali custodie funzionano.** Gran parte di queste custodie viene da un unico sviluppatore, che pubblica un'app diversa per quasi ogni marchio. Le ho provate tutte con la mia custodia, almeno quelle che ho trovato:

- **DeerPhoneCase**, **KAZAVA**, **Novixand** e **TYOHINN** funzionano con la mia custodia, e anche NFC.cool. Se la tua custodia è arrivata con una di queste app, NFC.cool dovrebbe funzionare.
- **Bestie e-INK** e **KINGZER** con la mia non funzionano. L'immagine passa via NFC senza problemi, ma quando la custodia dovrebbe ridisegnare lo schermo non succede niente.
- **SpaceInk+**, di un altro sviluppatore, con la mia custodia non funziona proprio. L'app dice solo "device channel information mismatch".

Questo non vuol dire che NFC.cool non funzioni con le custodie per Bestie e-INK, KINGZER o SpaceInk+. Magari sono solo un po' diverse dalla mia, e io non posso provarle. Se ne hai una, [fammi sapere](/contact/) se NFC.cool funziona oppure no. Se la tua usa un'altra app, NFC.cool ti dice che non è ancora supportata e ti propone il pulsante **Invia dettagli custodia**. Manda solo i dati tecnici del chip, niente che permetta di identificare te o la tua custodia, così vedo quali modelli girano davvero e posso aggiungerli.

**Dove trovarne una.** Su Amazon queste custodie si trovano sotto un sacco di marchi, alcuni piuttosto criptici, ma dietro ci sono sempre le stesse custodie. [Ecco una ricerca su Amazon](https://link.amazon/B0hUxLZTR) (link affiliato). La mia ha la scritta DIY stampata all'interno, e alcuni annunci hanno DIY nel titolo, quindi è una buona parola da cercare. Se l'annuncio indica l'app che usa la custodia, cerca DeerPhoneCase, KAZAVA, Novixand o TYOHINN.

---

## Tirando le somme

Se hai una di queste custodie che prende polvere con ancora l'immagine del primo giorno, dalle qualcosa di più utile da mostrare. NFC.cool Tools è sull'[App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-e-ink-phone-case-iphone-it&mt=8).

E se non hai mai visto un pannello e-ink sfarfallare e poi comporre un'immagine che gli hai mandato tu, te lo consiglio. Sono pochi secondi, ma che soddisfazione.
