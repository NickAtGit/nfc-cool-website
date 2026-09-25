---
id: "nfc-alarm-2026-09"
title: "Sveglia NFC per iPhone: per spegnerla devi scansionare i tag"
date: "2026-09-24"
tags: ["announcements", "iphone", "nfc-tags"]
summary: "Le notti passate a programmare perdevano sempre contro il tasto Posticipa, così ho creato la Sveglia NFC dentro NFC.cool Tools: una sveglia per iPhone che tace solo dopo che hai seguito un percorso di tag NFC sparsi per casa. Ecco come funziona e come ho aggirato il pulsante Interrompi che Apple mette su ogni sveglia."
image: "/assets/images/Blog/nfc-alarm-clock.webp"
imageAlt: "Un iPhone con l'anello di scansione della sveglia fermo a 2 su 3, accanto a una macchinetta del caffè con un adesivo NFC, e una scia tratteggiata di tag NFC che riporta al letto passando da una mensola in corridoio"
author: "Nicolo Stanciu"
metaTitle: "Sveglia NFC per iPhone: si spegne solo scansionando i tag"
metaDescription: "Una sveglia per iPhone che si spegne solo scansionando i tag NFC nell'ordine giusto. Come ho creato la Sveglia NFC con AlarmKit e aggirato il tasto Interrompi."
ogTitle: "La sveglia che non ti concede altri cinque minuti"
ogDescription: "La Sveglia NFC tace solo quando hai seguito un percorso di tag NFC sparsi per casa. Ecco come funziona su iPhone."
---
Fare lo sviluppatore indipendente ha un ritmo tutto suo, che degli orari d'ufficio se ne infischia. Il codice migliore lo scrivo tardi, quando i messaggi smettono di arrivare e la casa è silenziosa, e senza accorgermene si fanno le due di notte. La sveglia, ovviamente, suona sempre alla stessa ora. E io premo Posticipa. Poi di nuovo. Poi una terza volta, finché metà della mattinata che avevo in programma è andata in fumo.

Ci ho rimuginato un bel po', chiedendomi cosa potessi fare davvero. Una sveglia più forte? Ci farei l'abitudine e continuerei a dormire. Il telefono dall'altra parte della stanza? Mi alzerei, premerei Interrompi e tornerei sotto le coperte. Il problema non è mai stato sentire la sveglia. Il problema era che per spegnerla bastava un tocco, senza nemmeno doverci pensare.

Poi mi è venuta l'idea: passo le giornate a sviluppare un'app per i tag NFC. Perché non mettere insieme le due cose e disseminare per casa un percorso di tag da seguire ogni mattina, prima che la sveglia mi lasci in pace?

È nata così la **Sveglia NFC**, che ora fa parte di NFC.cool Tools su iPhone. La versione per Android arriverà presto.

---

## Dal letto alla macchinetta del caffè

Il mio percorso ha tre tappe. Il primo tag è accanto al letto. Il secondo è su una mensola in corridoio. Il terzo è attaccato alla macchinetta del caffè.

Quando suona la sveglia devo scansionarli tutti e tre, e in quest'ordine. Quello accanto al letto è facile, ce l'ho a portata di mano. Ma poi devo alzarmi e arrivare fino al corridoio, e quando raggiungo la macchinetta del caffè sono ormai in piedi, proprio nel punto in cui comincia la mia giornata. A quel punto tornare a letto sarebbe ridicolo. Tanto vale premere il pulsante e farsi un caffè.

L'ordine conta. Se i tag si potessero scansionare in un ordine qualsiasi, basterebbe tenerli tutti e tre sul comodino per cavarsela senza muovere un passo. Per questo l'app aspetta il tag successivo del percorso, e se avvicini l'iPhone a quello sbagliato te lo fa notare: "Questo non è Corridoio". Scansionato l'ultimo tag arrivano un po' di coriandoli, un "Buongiorno" e la sveglia è spenta per quel giorno. L'indomani suona di nuovo come sempre.

E sì, funziona. Il percorso mi tira giù dal letto, e non posso dire lo stesso di nessuna delle sveglie che ho avuto prima.

---

## Il pulsante Interrompi che non potevo togliere

È la parte su cui ho dovuto ragionare di più. La Sveglia NFC si basa su **AlarmKit**, il framework di Apple che permette alle app di far suonare una sveglia vera, di quelle che suonano anche in modalità silenziosa e occupano tutta la schermata di blocco come fa l'app Orologio. È esattamente quello che serve a un'app sveglia, con un solo inconveniente: ogni sveglia di AlarmKit ha un pulsante **Interrompi** disegnato dal sistema. Un'app non può toglierlo, nasconderlo né cambiarne l'aspetto.

Sulla carta, quindi, una sveglia che pretende che tu vada a cercare i tuoi tag arriva con un pulsante che la spegne con un tocco. Non proprio il massimo.

Ecco come l'ho aggirato: una Sveglia NFC non è una sveglia sola, ma un'intera catena. Dopo l'orario che imposti, l'app programma altri avvisi a pochi minuti di distanza l'uno dall'altro. Di serie sono 20, uno al minuto, ma puoi sceglierne 5, 10, 15 o 20, con un intervallo di 1, 2, 3 o 5 minuti. Premere Interrompi sulla schermata di blocco zittisce solo quello che sta suonando in quel momento. Un minuto dopo parte il successivo. Solo completando il percorso si annulla il resto della catena di quella mattina, mentre la sveglia resta impostata per il giorno dopo.

In pratica Interrompi è un tasto muto con un minuto di autonomia.

AlarmKit concede a un'app un solo pulsante tutto suo, accanto a Interrompi. Quasi tutte le app sveglia ci metterebbero Posticipa. Io l'ho usato per **Scansiona per interrompere**, che apre l'app direttamente sulla schermata di scansione. Sulla schermata di blocco, quindi, Posticipa non c'è proprio, ed è una scelta voluta.

Due dettagli più piccoli, venuti fuori facendo da cavia a me stesso:

- Mentre stai scansionando, la suoneria va in pausa. Nessuno vuole una sveglia che gli strilla in mano mentre avvicina il telefono a un tag. Se però molli a metà strada, il prossimo avviso della catena torna a suonare comunque.
- Finché la sveglia suona, l'app non ti lascia disattivarla, eliminarla o modificarla dall'elenco delle sveglie. Queste scappatoie le ho scoperte nel modo più sincero possibile: alle 7 del mattino, mezzo addormentato ma pieno di inventiva.

---

## L'uscita di emergenza

I tag si perdono. Un adesivo si stacca dalla macchinetta del caffè, un tag si rompe, oppure dormi fuori casa. Una sveglia impossibile da spegnere sarebbe una pessima idea, per questo nella schermata di scansione c'è un **Arresto di emergenza** che funziona sempre, con o senza tag.

Però ti chiede di scrivere questa frase, parola per parola:

"Per favore fermati, so che dovrò configurare di nuovo tutti i miei tag."

L'ho fatto apposta. Volevo che uscirne richiedesse più o meno lo stesso tempo del percorso, così non diventa mai la scorciatoia per pigri. E ha un prezzo vero: l'arresto di emergenza ferma ed elimina *tutte* le sveglie, quindi dopo ti tocca configurare di nuovo tutti i tag. Serve quando qualcosa si è rotto davvero, non per quel martedì in cui il letto sembra più comodo del solito. L'ho pensato per punire me stesso, e ci riesce benissimo.

---

## Perché l'NFC e non una foto del lavandino

Esistono app sveglia che ti fanno fotografare il lavandino del bagno o scansionare il codice a barre del dentifricio. Funzionano. Ma per questo scopo preferisco l'NFC, e non solo perché è nel nome della mia app.

Un tag NFC, preso da solo, è un pezzetto di metallo. Un chip minuscolo con un identificativo e nient'altro, appoggiato su una mensola. La cosa che più mi diverte del lavorare a NFC.cool è proprio dare un senso a quel pezzetto di metallo: trasformare un adesivo da pochi centesimi in qualcosa che nella tua vita ha davvero un ruolo. Con la Sveglia NFC il tag non deve nemmeno contenere dati. L'app riconosce ogni tag dall'identificativo del chip e non ci scrive sopra nulla. Va bene qualsiasi tag, anche quella confezione di adesivi di scorta che hai nel cassetto. E la luce non conta: un tag si scansiona anche in un corridoio buio, dove una fotocamera andrebbe in difficoltà, e non c'è niente da inquadrare.

Se non hai ancora dei tag, nella mia [guida ai tag NFC per principianti](/blog/nfc-tags-beginners-guide/) spiego quali comprare.

---

## Come configurarla

La Sveglia NFC richiede un iPhone con iOS 26 o versioni successive, perché AlarmKit è arrivato lì. La trovi nella scheda NFC, sotto **Applicazioni NFC**. Crea una sveglia, scegli l'orario e i giorni, poi scansiona i tag nell'ordine in cui vuoi percorrerli. A ogni tag puoi dare un nome, così sai sempre qual è il prossimo. Sistemali lungo un percorso che ti faccia uscire dal letto sul serio. Il comodino è un buon punto di partenza, la cucina un traguardo ancora migliore.

La Sveglia NFC è gratuita e la trovi in [NFC.cool Tools sull'App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-alarm-clock-it&mt=8). La macchinetta del caffè ti aspetta.
