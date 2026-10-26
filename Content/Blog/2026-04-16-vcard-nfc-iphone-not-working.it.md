---
id: nfc-blog-013
title: "Perché i tag NFC con vCard non funzionano su iPhone (e cosa funziona davvero)"
date: 2026-04-16
tags: ["nfc-tags", "business-cards", "guides", "iphone"]
summary: "Il tuo biglietto da visita NFC con vCard funziona su Android ma non su iPhone? Ecco perché iOS ignora i dati vCard e la soluzione semplice che funziona su qualsiasi telefono."
image: "/assets/images/Blog/vcard-nfc-iphone-not-working.webp"
imageAlt: "Un iPhone alle prese con un biglietto da visita NFC con vCard e i passaggi per rimediare"
metaTitle: "Tag NFC con vCard: perché non funzionano su iPhone | NFC.cool"
metaDescription: "Il biglietto da visita NFC con vCard funziona su Android ma non su iPhone? Ecco perché iOS ignora i dati vCard e la soluzione che funziona su ogni telefono."
ogTitle: "Perché i tag NFC con vCard non funzionano su iPhone"
ogDescription: "Gli iPhone ignorano in silenzio i dati vCard sui tag NFC. Ecco perché, e cosa funziona davvero al loro posto."
---
Sviluppo app NFC da anni. E ogni settimana, senza eccezioni, arriva un'email che dice più o meno così:

> "Ciao, ho comprato un biglietto da visita NFC e ci ho scritto sopra la mia vCard. Sul telefono Android di un amico funziona benissimo. Ma quando lo avvicino all'iPhone non succede niente. Il biglietto è difettoso?"

Il biglietto non è difettoso.

È l'iPhone che non supporta le vCard sui tag NFC. E con ogni probabilità non le supporterà mai.

Ti spiego il motivo, e cosa conviene usare al posto della vCard.

---

## Perché i tag NFC con vCard non funzionano su iPhone

Ecco cosa succede quando avvicini il telefono a un tag NFC che contiene una vCard:

**Su Android:** si apre l'app Contatti. Vedi i dati della persona. Tocchi salva. Fatto. Una meraviglia.

**Su iPhone:** niente. Non succede assolutamente nulla. Nessun avviso, nessun messaggio di errore. Solo un iPhone che se ne sta lì a ignorarti in silenzio.

La prima volta che è capitato davanti a me, a una conferenza, la persona che aveva avvicinato il telefono mi ha guardato come se il difetto fossi *io*.

**Perché succede?**

Stando alla documentazione per sviluppatori di Apple, la lettura in background dei tag NFC su iPhone riconosce solo alcuni tipi di dati:

- ✓ URL web (http:// e https://)
- ✓ Numeri di telefono (tel:)
- ✓ Link per SMS (sms:)
- ✗ File di contatto vCard - **non supportati**

Quando l'iPhone rileva un tag NFC con dei dati vCard, li ignora e basta. Nessuna alternativa, nessun errore che ti aiuti a capire. Il nulla.

Android gestisce le vCard in modo nativo perché Google ha ritenuto che avesse senso. Apple ha deciso che gli URL bastavano.

Le regole non le faccio io. Mi limito a costruirci intorno.

---

## Un'app non può leggere le vCard su iPhone?

In teoria sì. Se installi un'app che legge i tag NFC, come [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-it&mt=8) su iPhone, oppure [NFC.cool Tools su Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-it), l'app legge i dati grezzi del tag, record vCard compresi, e mostra i dati del contatto. Su Android, [NFC.cool Tools](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-it) lo fa da sola appena rileva una vCard su un tag.

Il problema però è un altro: **chi scansiona il tuo biglietto deve già avere l'app installata.**

A un evento di networking la richiesta suona così: *"Senti, prima di scansionare il mio biglietto ti va di aprire l'App Store, cercare un'app NFC, scaricarla, aspettare l'installazione, aprirla, concederle i permessi NFC e poi scansionare?"*

A quel punto la persona se n'è già andata. La magia è finita.

Il senso dell'NFC è tutto lì: *avvicini e hai finito*. Nel momento in cui aggiungi dei passaggi, hai già perso.

NFC.cool Tools è ottima per leggere e scrivere i tag NFC, e l'ho creata esattamente per questo. Ma per passare i tuoi dati a una persona che non conosci serve qualcosa che funzioni senza far installare nulla dall'altra parte.

---

## La soluzione: biglietti da visita NFC basati su un URL

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/vcard-nfc-iphone-not-working/profile-440w.webp" alt="Un profilo digitale come si apre dopo il tocco: Rin Nakashima di Meridian Systems, con i link Website, Blog, Reddit e Bluesky e il pulsante Save Contact"><p><strong>Tocco. Profilo. Salva.</strong> Il link sul tag apre questo profilo, e un tocco salva il contatto.</p></li>
</ol>
</figure>

C'è una cosa che nessuno ti dice quando compri un biglietto da visita NFC:

**Sul tag i dati del contatto non ci vanno proprio.**

Al loro posto va scritto un URL che rimanda a un profilo digitale.

È esattamente quello che fa [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-it&mt=8). Invece di stipare una vCard sul tag, dove gli iPhone la ignorano, sul tag finisce un link intelligente al tuo profilo digitale.

**Quando qualcuno avvicina il telefono al biglietto:**

- iPhone → si apre il link → si carica un profilo curato → contatto salvato con un tocco
- Android → stessa esperienza → funziona alla perfezione
- Qualsiasi smartphone → compatibilità universale

Chi riceve il biglietto non deve installare niente. Nessuna spiegazione da dare, nessun intoppo.

Avvicini. Profilo. Salvi. Fatto.

---

## Perché un profilo digitale batte la vCard

Quando ho messo insieme questa soluzione pensavo fosse solo un espediente per aggirare i limiti di Apple.

Poi mi sono reso conto che questa strada è davvero *migliore* di quanto la vCard sia mai stata.

**Cosa ti dà una vCard:** nome, numero di telefono, email, forse una qualifica. Fine. Dati statici del 2005.

**Cosa ti dà un profilo digitale raggiungibile da un URL:**

▸ **Tutti i tuoi link in un posto solo**
LinkedIn, Twitter, Instagram, il portfolio, il link per prenotare su Calendly: tutto raggiungibile con un tocco.

▸ **Funzioni pensate per il networking**
Sai quando conosci una persona, ne salvi il contatto e due settimane dopo ti ritrovi a fissare "John - conferenza" senza il minimo ricordo di chi sia John?

Con NFC.cool annoti anche il contesto: dove vi siete conosciuti, di cosa avete parlato, cosa ti eri ripromesso di fare. Come un CRM, ma senza i 50 dollari al mese.

▸ **Integrazione con Apple Wallet**
Il tuo biglietto da visita digitale sta in Apple Wallet. Hai lasciato a casa il biglietto NFC fisico? Basta mostrare il telefono.

▸ **Aggiornabile quando vuoi**
Hai cambiato lavoro? Numero nuovo? Aggiorni il profilo una volta sola e chiunque abbia il tuo link vede subito i dati aggiornati. Niente biglietti da ristampare, niente tag da riscrivere.

Le vCard non fanno niente di tutto questo. Restano congelate al momento esatto in cui le hai scritte.

▸ **Funziona su qualsiasi telefono**
A differenza della vCard, un profilo che vive dietro un URL funziona su qualsiasi smartphone: iPhone, Android e anche dispositivi più datati, basta che abbiano un browser. Su iOS, l'[app NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-it&mt=8) usa un [App Clip](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-it&mt=8), così chi riceve il biglietto non deve installare proprio nulla. Su Android, [NFC.cool Business Card](https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-it) apre all'istante un profilo web.

---

## FAQ

**Apple supporterà mai le vCard sui tag NFC?**

Sono passati anni e Apple non ha cambiato questo comportamento. Dai tempi dell'iPhone XS la lettura NFC in background è rimasta limitata a URL, numeri di telefono e link per SMS. Io non ci conterei.

**Vale per tutti gli iPhone?**

Sì. Ogni iPhone con la lettura NFC in background (dall'iPhone XS in poi, con iOS 13 o versioni successive) ignora i dati vCard sui tag NFC.

**Su iPhone si riescono a leggere in qualche modo i tag NFC con vCard?**

Solo con un'app di lettura NFC installata. Sia [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-it&mt=8) su iPhone sia [NFC.cool Tools su Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-it) leggono e mostrano i dati vCard di un tag NFC. Android se la cava in modo nativo, senza app; l'iPhone invece ne ha bisogno. Ma per condividere un biglietto da visita la strada migliore resta [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-it&mt=8), che dall'altra parte non richiede nessuna app.

**Quali tag NFC vanno meglio per i biglietti da visita digitali?**

Vanno benissimo gli NTAG213 e gli NTAG215. Sul tag finisce solo un URL, quindi di memoria ne serve poca.

**Posso scrivere i tag NFC con l'iPhone?**

Sì. Con [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-it&mt=8) scrivi URL e altri dati sui tag NFC direttamente da iPhone. L'app supporta tutti i tipi di record NDEF più comuni e funziona con qualsiasi tag NTAG.

---

## Tirando le somme

Se il tuo biglietto da visita NFC contiene una vCard, per metà delle persone che incontri è invisibile. Gli iPhone non lo leggono senza un'app, e non puoi chiedere a ogni nuovo contatto di installarne una.

La soluzione non è un ripiego: è un approccio migliore in partenza.

1. Scrivi sul tag un URL al posto dei dati del contatto
2. Fai puntare quell'URL a un profilo digitale completo
3. Lascia che sia il profilo a salvare il contatto, condividere i link e fare tutto il resto

È quello che fa NFC.cool Business Card. Ed è quello che uso io a ogni conferenza, meetup ed evento di networking.

Avvicino il telefono. L'altra persona salva. E tutti e due andiamo avanti con la nostra giornata.

**Dovrebbe funzionare così.**

*NFC.cool Business Card è disponibile su [App Store](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-it&mt=8) e [Google Play](https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-it). NFC.cool Tools, il lettore e scrittore di tag, è disponibile su [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-it&mt=8) e [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-it).*
