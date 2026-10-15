---
id: "amiibo-iphone-android-read-collect-backup-2026-07"
title: "Leggere, collezionare e fare il backup degli Amiibo su iPhone e Android"
date: "2026-07-02"
tags: ["announcements", "iphone", "android"]
summary: "Voglio che NFC.cool sia la migliore app NFC su iPhone e Android, così le ho dato il supporto completo agli Amiibo: scansiona una statuina per vederne i dettagli, costruisci una collezione personale e fai il backup di una statuina su un NTAG215 vuoto. Ecco come funzionano davvero gli Amiibo sotto il cofano e perché l'app non contiene nessuna chiave."
image: "/assets/images/Blog/amiibo-iphone-android-read-collect-backup.webp"
imageAlt: "Una statuina da collezione NFC immaginaria accanto a un telefono che mostra la schermata di una collezione privata"
author: "Nicolo Stanciu"
metaTitle: "Amiibo su iPhone e Android: lettura, collezione, backup"
metaDescription: "NFC.cool legge gli Amiibo su iPhone e Android, ne tiene la collezione e ne fa il backup su tag NTAG215 vuoti. Come funzionano davvero e quali sono i limiti."
ogTitle: "Leggere, collezionare e fare il backup degli Amiibo su iPhone e Android"
ogDescription: "Ho dato a NFC.cool il supporto completo agli Amiibo: scansiona, colleziona e fai il backup su un tag vuoto. Come funzionano davvero e perché l'app non contiene chiavi."
---
Tutti danno per scontato che dentro un Amiibo ci sia qualcosa di esotico, un pezzo di silicio Nintendo che non si trova da nessun'altra parte. Non c'è. Sigillato nella base della statuina c'è un [NTAG215](/affiliate-links/), lo stesso chip degli adesivi vuoti che leggo e scrivo tutti i giorni, quelli che si comprano dieci alla volta per pochi spiccioli. Circa 540 byte di memoria, un numero di serie inciso in fabbrica, e la statuina è tutta lì. La parte cara è la plastica. Il chip è quasi un ripensamento.

Ed è proprio per questo che per tanto tempo la cosa ha continuato a rodermi. Leggo e scrivo tag NFC per lavoro, eppure c'era un'intera categoria di tag - qualche statuina sullo scaffale accanto alla scrivania - davanti a cui la mia app alzava le spalle. Voglio che NFC.cool sia l'app NFC più completa che si possa installare su un telefono, quella che non lascia indietro nessun tipo di tag.

Così mi ci sono messo, con le statuine da una parte e la Switch dall'altra, e ho dato a NFC.cool un vero supporto agli Amiibo. Ecco cosa ne è venuto fuori e cosa ho imparato per strada, a partire dal motivo per cui un chip tanto economico è sorprendentemente difficile da copiare.

---

## E allora dove sta la magia?

Se il chip è così banale, la magia non sta di certo nel silicio. Sta nei byte. Un Amiibo in fondo è un taccuino da pochi soldi che Nintendo ha riempito con un codice privato e poi firmato in calce, così da poter distinguere un falso dall'originale. (Il chip in sé è un semplice [NTAG215](/blog/nfc-tag-types-for-iphones/), se ti interessa il giro completo tra i tipi di tag.)

In quei byte convivono due cose. La prima è in chiaro: un piccolo blocco che dice di quale personaggio si tratta, per esempio Link, della serie The Legend of Zelda, in una determinata linea di Amiibo. È la parte che la Switch legge per sapere che una statuina l'ha appena sfiorata. La seconda è chiusa a chiave: i dati salvati veri e propri, come il soprannome, il Mii del proprietario, quante volte la statuina è stata usata e tutto quello che il gioco del momento ha scarabocchiato nel piccolo spazio per appunti che gli viene concesso. Quella parte è cifrata ed è firmata.

---

## Perché un Amiibo non si può semplicemente copiare

Il salvataggio cifrato non è protetto da una chiave fissa, che basta procurarsi una volta per riutilizzarla in eterno. Ogni tag ha le sue chiavi, ricavate sul momento da un insieme di chiavi principali mescolate con dati letti da quel tag specifico, numero di serie univoco compreso. E per di più il tutto è firmato con un HMAC. Cambia un solo byte senza firmare di nuovo e la console si accorge del falso e rifiuta la statuina.

Qui sta la trappola. Dato che il numero di serie entra sia nel calcolo delle chiavi sia nella firma, non si può estrarre il contenuto di un Amiibo vero e riversarlo byte per byte su un tag vuoto. Il tag vuoto ha un numero di serie diverso, quindi tutte le chiavi ricavate vengono fuori diverse, la firma non torna più e la console lo scarta. L'approccio ovvio, quello del "copio tutte le pagine e via", fallisce ogni volta.

Per ottenere una copia valida bisogna ricalcolare le chiavi sul tag di destinazione e firmare di nuovo i dati, in modo che valgano per quel preciso pezzo di plastica e silicio e non per quello da cui li hai presi. L'implementazione di riferimento su cui si basano tutti è uno strumento chiamato amiitool. Ho ricostruito tutta quella danza in modo nativo dentro l'app - dal formato del tag al formato interno e ritorno, calcolo delle chiavi, cifratura, firma - così NFC.cool la esegue sul telefono che hai in mano, senza nessun computer di mezzo.

---

## Cosa fa NFC.cool adesso

Tre cose, nell'ordine in cui probabilmente le userai.

**Lettura.** Avvicina un Amiibo al retro del telefono, esattamente come faresti per [leggere un tag NFC qualsiasi](/features/nfc-reader-writer/), e NFC.cool lo riconosce all'istante: il personaggio, la serie del gioco, la serie di Amiibo, il tipo di statuina e l'illustrazione, insieme a un paio di informazioni prese dal tag stesso, come il numero di scritture che ha già subito. Qui non serve nessuna chiave: per riconoscere una statuina si tocca solo la parte già in chiaro.

**Collezione.** Ogni Amiibo che scansioni finisce nella sezione La mia collezione, una semplice griglia con tutto quello che possiedi. Resta sul dispositivo (su iPhone si sincronizza con gli altri dispositivi Apple tramite iCloud) e le illustrazioni vengono conservate in locale, così la collezione si presenta bene anche senza connessione. Solo questo ha trasformato il mio tristissimo scaffale in qualcosa che posso davvero sfogliare.

**Backup e ripristino.** Una volta importate le tue chiavi, si può scrivere su un NTAG215 vuoto una copia della statuina con le chiavi ricalcolate. Il backup si fa direttamente da una statuina appena scansionata, oppure si ripristina da un file `.bin` salvato sul dispositivo. L'app ricalcola le chiavi per il tag vuoto che hai in mano e firma i dati per quel tag, così la copia è valida a pieno titolo invece di essere un falso byte per byte destinato a fallire. La scrittura è definitiva - una volta bloccato, il tag resta bloccato - e l'app lo dice chiaramente prima che tu confermi.

<figure class="phone-figure" data-layout="stage">
<figcaption>Leggi, colleziona, fai il backup</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/amiibo-iphone-android-read-collect-backup/1-read-440w.webp" alt="Una figura scansionata in NFC.cool Tools, Bramble the Badger, con personaggio, serie di giochi, serie, tipo e contatore di scritture del tag"><p><strong>Lettura.</strong> Personaggio, serie e tipo, più i dati del tag stesso, senza bisogno di chiavi.</p></li>
<li><img src="/assets/images/Blog/screens/amiibo-iphone-android-read-collect-backup/2-collect-440w.webp" alt="La mia collezione, una griglia di sei figure scansionate"><p><strong>Collezione.</strong> Ogni figura scansionata finisce in La mia collezione, sul dispositivo.</p></li>
<li><img src="/assets/images/Blog/screens/amiibo-iphone-android-read-collect-backup/3-back-up-440w.webp" alt="La schermata NFC Figures con Scan Figure, My Collection, Restore from Backup e NFC Keys"><p><strong>Backup e ripristino.</strong> Con le tue chiavi importate, scrivi un backup su un NTAG215 vuoto.</p></li>
</ol>
</figure>

---

## Cosa ho lasciato fuori di proposito

NFC.cool non contiene le chiavi degli Amiibo e non le conterrà mai. Nell'app non c'è nessuna chiave nascosta e non c'è nessun archivio di dati Amiibo incorporato.

La lettura e la collezione funzionano da subito, perché toccano soltanto la parte in chiaro del tag. Il backup è un'altra storia: richiede le chiavi principali, che sono di Nintendo e non mie. Se te le sei procurate per conto tuo, il file `key.bin` unico oppure i due file separati, le importi nell'app una volta sola e la funzione di backup si attiva. Se non le hai, resta spenta. La macchina l'ho costruita io; il carburante lo porti tu.

Mi sembra il confine onesto da tenere. La funzione serve davvero. Mettere al sicuro una statuina che tuo figlio potrebbe perdere al primo pomeriggio storto, o tenere una copia di riserva su una tessera da pochi centesimi invece di rischiare l'originale, sono motivi concreti per volere una cosa del genere. Preferisco darti un modo pulito e riservato per farlo sul telefono che hai già in tasca, piuttosto che fingere che quella richiesta non esista. Quello che non farò è mettere in circolazione qualcosa che non è mai stato mio.

---

## Due precisazioni

Su due punti voglio essere chiarissimo.

Primo: questa è la mia app, non quella di Nintendo. NFC.cool non è realizzata da Nintendo, non è affiliata a Nintendo e non è né approvata né sponsorizzata da Nintendo. Amiibo, Nintendo Switch e i titoli dei giochi che cito sono marchi dei rispettivi proprietari e li nomino soltanto per far capire con cosa è compatibile la funzione.

Secondo: gli strumenti di backup e ripristino sono qui per uso didattico e personale, cioè per proteggere le statuine che possiedi già. Tieni da parte una copia di quella che tuo figlio continua a far cadere, oppure lascia l'originale nella sua scatola e manda avanti un NTAG215 da pochi centesimi a prendersi l'usura di tutti i giorni. È l'uso per cui li ho creati. Porta le tue chiavi, fai il backup solo delle statuine che possiedi davvero e rispetta i diritti di Nintendo e quello che dice la legge dove vivi. L'uso che fai dello strumento è una tua responsabilità.

---

## E funziona davvero

Non volevo pubblicare una cosa del genere dandola per buona, quindi l'ho provata nell'unico modo che conta.

Ho scansionato una delle mie statuine, ne ho fatto il backup su un NTAG215 vuoto e ho portato la copia alla Switch. Ho avviato The Legend of Zelda: Tears of the Kingdom, ho avvicinato la copia al Joy-Con destro e mi sono ritrovato una manciata di oggetti nell'inventario. Come con l'originale. Nessuna protesta, nessun "impossibile leggere questo Amiibo". È stato il momento in cui tutto il lavoro mi è sembrato reale: tutta quella matematica per ricavare le chiavi, tutte quelle mappe di byte, e il risultato è un adesivo vuoto da pochi centesimi che una console Nintendo tratta senza battere ciglio come la statuina originale.

Lo scaffale accanto alla scrivania non è più solo un soprammobile. È diventato una funzione.

Se vuoi provarci, gli strumenti per gli Amiibo sono dentro NFC.cool su [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-amiibo-iphone-android-read-collect-backup-it&mt=8) e [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-amiibo-iphone-android-read-collect-backup-it), accanto a tutto il resto che ho costruito per leggere e scrivere i tag. Porta le tue chiavi, avvicina una statuina e scopri cosa la tua app ha ignorato in silenzio per tutto questo tempo.
