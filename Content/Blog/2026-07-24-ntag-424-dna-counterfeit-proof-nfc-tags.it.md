---
id: "ntag-424-dna-2026-07"
title: "NTAG 424 DNA: i tag NFC che dimostrano di non essere falsi"
date: "2026-07-24"
tags: ["announcements", "nfc-tags", "industry"]
summary: "Avevo letto che i marchi del lusso usano i tag NTAG 424 DNA per dimostrare che un prodotto è originale, così ne ho ordinato un lotto su AliExpress per capire cosa sanno fare davvero. Si sono rivelati il contatore degli avvicinamenti NFC con sopra uno strato di crittografia, e oggi NFC.cool Tools li legge, li verifica e li configura per intero su iPhone e Android: ogni chiave, i permessi di ogni file e le impostazioni del chip."
image: "/assets/images/Blog/ntag-424-dna-counterfeit-proof-nfc-tags.webp"
imageAlt: "Una borsa in pelle con un tag NFC di autenticazione accanto a un iPhone che mostra uno scudo di sicurezza e delle icone a forma di chiave"
author: "Nicolo Stanciu"
metaTitle: "NTAG 424 DNA: il tag NFC anticontraffazione spiegato"
metaDescription: "Ho comprato dei tag NTAG 424 DNA per capire come i marchi dimostrano che un prodotto è originale. Ecco come funzionano e come NFC.cool li legge e programma."
ogTitle: "I tag NFC che dimostrano di non essere falsi"
ogDescription: "Come i tag NTAG 424 DNA smascherano i cloni e come NFC.cool li legge, li verifica e li configura su iPhone e Android."
---

Per un po' mi è capitato di leggere sempre la stessa affermazione, buttata lì di sfuggita: i marchi del lusso stanno mettendo chip NFC nei loro prodotti, così avvicini il telefono a una borsa o a un paio di sneaker e sai che quello che hai in mano è originale e non un falso. Tutti gli articoli ripetevano la stessa frase a effetto e nessuno spiegava *come*. Che cosa impedisce davvero a un contraffattore di copiare il chip insieme alla borsa?

Così ho fatto quello che faccio sempre quando un tag mi incuriosisce. Sono andato su AliExpress, ho trovato un annuncio di tag "NTAG 424 DNA", ne ho ordinato un piccolo lotto e ho aspettato che arrivasse la busta. Qualche euro, un paio di settimane, e mi sono ritrovato sulla scrivania lo stesso silicio su cui poggiano quei sistemi di protezione del marchio. Poi ne ho avvicinato uno al telefono per vedere che cosa sapeva fare.

---

## Che cos'è davvero un tag NTAG 424 DNA

Da fuori è un tag NFC qualunque. In un mucchio di tag economici non lo riconosceresti, e qualsiasi telefono lo legge senza fare storie. Se hai letto la mia [guida ai tipi di tag NFC](/blog/nfc-tag-types-for-iphones/), rientra tra i tag di Tipo 4 che l'iPhone legge volentieri.

La differenza sta nel "DNA". Dentro, il chip custodisce alcune chiavi AES-128 e un piccolo motore crittografico, e sa fare una cosa che nessun NTAG215 normale né un adesivo preso in confezione multipla può fare: *firmare* ogni singolo avvicinamento. È tutta lì, in quella firma. È la differenza tra un tag che dice "ecco un link" e un tag che dice "ecco un link, ed ecco la prova crittografica che sono io, questo preciso chip originale, a fornirtelo, proprio adesso".

È questo che i marchi del lusso pagano davvero: non il link, ma la prova che a fornirlo sia un chip autentico.

---

## Come funzionano SUN e SDM: un link che si riscrive a ogni avvicinamento

Il momento in cui mi si è accesa la lampadina è stato questo. Guardando che cosa mandava davvero il tag, mi sono reso conto di aver già costruito quasi tutto quello che serviva per capirlo.

All'inizio di quest'anno ho pubblicato il [contatore degli avvicinamenti NFC](/blog/count-nfc-tag-scans/): un tag che tiene il conto di quante volte è stato letto e mette quel numero nell'URL, così il link sa che quella è la quarantasettesima scansione. Un tag NTAG 424 DNA è la stessa idea, con intorno uno strato di crittografia che la rende impossibile da falsificare.

Il meccanismo si chiama **SUN** (Secure Unique NFC), oppure **SDM** (Secure Dynamic Messaging) se stai leggendo il [datasheet di NXP](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf). Sul tag scrivi un link normale, qualcosa come `https://example.com`. Al chip però dici di riscrivere al volo alcune parti di quel link a ogni avvicinamento. Quello che il telefono riceve, in realtà, assomiglia più a questo:

`https://example.com/?picc_data=A1B2...&cmac=9F3C...`

Quei due valori non sono decorazioni. `picc_data` è una copia cifrata dell'ID reale del tag insieme a un contatore degli avvicinamenti, mescolati con una chiave che non esce mai dal chip. `cmac` è una firma crittografica su quei dati. Entrambi cambiano ogni volta. Avvicina due volte lo stesso tag e ottieni due URL completamente diversi, ognuno firmato sul momento dal chip.

Un tag NFC normale me lo immagino come un cartello esposto in vetrina: chiunque può fotografarlo e stamparne una copia identica. Un tag SUN somiglia di più a un addetto alla sicurezza che a ogni ingresso ti consegna una ricevuta nuova, numerata e timbrata. Copiare la ricevuta di ieri non serve a niente, perché il numero di oggi è un altro e l'unico timbro valido è il suo.

---

## Perché un tag NTAG 424 DNA clonato viene smascherato

È qui che arriva la risposta alla mia domanda di partenza. Il *contenuto* di un tag un contraffattore lo può clonare eccome: legge l'URL, lo copia byte per byte e lo scrive su un chip vuoto. Questo è sempre stato possibile.

Quello che non può fare è produrre la firma valida successiva. La chiave di firma vive dentro il chip originale e non ne esce mai, nemmeno durante un avvicinamento. Vuol dire che un avvicinamento ha valore solo per chi quella chiave ce l'ha davvero. In un vero sistema di protezione del marchio il link del tag punta a un server gestito dal produttore, ed è quel server a decifrare ogni avvicinamento, a ricalcolare la firma per confermare che la chiave corrisponda e a seguire il contatore mentre sale.

Ed è proprio l'ultimo pezzo a smascherare i cloni. L'unico URL che un contraffattore può mettere su un falso è quello catturato da un avvicinamento autentico, congelato con il contatore che si portava dietro in quel momento. Se lo ripropone, il server si trova davanti un numero che ha già visto, e siccome il contatore di un chip vero va solo avanti, un valore ripetuto o più basso tradisce la copia. Per mandare un contatore nuovo e più alto con una firma che regga, servirebbe la chiave, e per avere la chiave bisognerebbe violare l'AES o aprire fisicamente il chip. Per una borsa contraffatta non succederà né l'una né l'altra cosa.

Questa è la versione onesta della frase da brochure. Il chip non rende impossibile copiare il *prodotto*: rende impossibile copiare la *prova di autenticità*, e sposta quella prova su qualcosa che il contraffattore non sa riprodurre.

---

## Che cosa c'è dentro il chip

Tutto quello che NFC.cool fa con questi tag ha molto più senso se hai in testa com'è organizzato il chip, quindi ecco la mappa che ho dovuto costruirmi prima di scrivere una riga di codice.

Un NTAG 424 DNA è un tag NFC Forum di Tipo 4 con 416 byte di memoria, organizzati in un'unica applicazione che contiene tre file fissi. Non puoi creare o eliminare file come su un MIFARE DESFire: questi tre sono tutto quello che hai a disposizione.

| File | Dimensione | Che cosa contiene |
| --- | --- | --- |
| File 01 | 32 byte | Il capability container, che dice al telefono dove si trovano i dati NDEF |
| File 02 | 256 byte | Il messaggio NDEF, di solito il tuo link. A ogni lettura, SUN rispecchia qui dentro i suoi valori aggiornati |
| File 03 | 128 byte | Un file proprietario che il chip può tenere cifrato. NFC.cool lo usa come cassaforte, ne parlo tra poco |

Accanto ai file ci sono cinque chiavi AES-128, numerate da Key 0 a Key 4. **Key 0** è la chiave principale dell'applicazione: è quella con cui ti autentichi per cambiare il link, attivare SUN, sostituire una qualsiasi delle altre chiavi o mettere mano alla configurazione del chip. Da sole, le chiavi da 1 a 4 non fanno nulla: contano solo quando i diritti di accesso di un file o la configurazione SUN puntano su di loro. Su un tag appena uscito di fabbrica tutte e cinque valgono sedici byte a zero e il file NDEF è scrivibile da chiunque, ed è per questo che un tag nuovo accetta un link normale senza tante cerimonie.

Ogni comando che modifica qualcosa avviene dentro una sessione autenticata: telefono e chip si scambiano una sfida e una risposta con una di quelle chiavi, ne derivano le chiavi di sessione e da lì in poi ogni comando porta con sé un MAC oppure viaggia interamente cifrato. È il secure messaging a cui il resto dell'articolo continua a fare riferimento. NFC.cool lo implementa per intero, su iPhone e su Android, e ogni scrittura descritta qui sotto ci passa attraverso.

---

## Che cosa vedi quando avvicini un tag

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/ntag-424-dna-counterfeit-proof-nfc-tags/1-tap-440w.webp" alt="NFC.cool Tools dopo aver avvicinato un tag NTAG 424 DNA: il link firmato, un contatore di letture a 137 e l'autenticità SUN su Authentic"><p><strong>Una lettura autentica.</strong> Il link firmato, il contatore di letture e una verifica SUN superata.</p></li>
</ol>
</figure>

Avvicina un tag al telefono e NFC.cool Tools su [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-it&mt=8) o [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-it) esegue una lettura approfondita senza chiederti niente: l'identità del chip e se si tratta della variante TagTamper, il link, le impostazioni e i diritti di accesso di ogni file, quali slot delle chiavi sono stati cambiati rispetto alla fabbrica e l'esito di tre controlli distinti.

### Il chip è silicio NXP originale?

Ogni NTAG 424 DNA esce di fabbrica con una **firma di originalità**: una firma ECDSA sull'UID di sette byte del chip stesso, generata con la chiave privata di NXP sulla curva P-224. NFC.cool la legge e la verifica con la chiave pubblica che NXP ha reso nota, direttamente sul telefono e senza che tu debba fornire nessuna chiave. Se il riscontro è positivo, l'app mostra "NXP originale". È la risposta alla prima domanda: questo è silicio NXP vero, oppure un chip somigliante che si limita a rispondere allo stesso nome?

### L'avvicinamento è autentico?

Questo è il controllo SUN. L'app prende `picc_data` e `cmac` dal link appena servito dal tag, decifra i dati PICC per ricavarne l'UID e il contatore di letture, ricalcola il CMAC e lo confronta con quello che il tag ha mandato. Se i due coincidono compare "Autentico" e il valore viene mostrato come contatore di letture.

Questo controllo ha bisogno della chiave del tag, perché il senso è tutto lì. Un tag ancora con le chiavi di fabbrica si verifica con la chiave di soli zeri. Un tag che hai bloccato con una chiave tua si verifica con la chiave che NFC.cool ha salvato quando l'hai impostata. Un tag che qualcun altro ha bloccato con una chiave che tu non hai mostra "Non verificato", che è la risposta corretta.

### Il sigillo è stato rotto?

Una versione di questi chip, l'**NTAG 424 DNA TagTamper**, nasce come sigillo antimanomissione. È un adesivo attraversato da un sottile anello conduttivo. Lo applichi sopra quello che vuoi proteggere, sul lembo di una scatola o intorno al tappo di una bottiglia, lo stesso lavoro che oggi fanno quei bollini con scritto "garanzia nulla se rimosso". Quando apri l'oggetto strappi l'adesivo e l'anello si interrompe.

Di quell'anello il chip tiene traccia di due cose: un segnale permanente che registra se è *mai* stato aperto e lo stato in questo preciso momento. NFC.cool li legge entrambi a ogni avvicinamento e riporta "Sigillato", "Aperto" oppure quello che conta di più, "Aperto e richiuso": qualcuno ha interrotto l'anello e poi lo ha rimesso a posto con cura. Il segnale va in una sola direzione, quindi una scatola richiusa risulta aperta per il resto della vita del chip. La crittografia dimostra che il chip è originale. Questo dimostra che nella scatola non è entrato nessuno.

---

## Programmare i tuoi tag: la versione breve

Leggere è solo metà del lavoro. L'altra metà è che quei tag vuoti presi su AliExpress puoi programmarli tu, e la configurazione minima sta in tre passaggi.

1. **Scrivi il link.** Una normale scrittura NDEF, come su qualsiasi altro tag.
2. **Attiva SUN.** L'app scrive il link con dei segnaposto e dice al chip di rispecchiare lì dentro, a ogni lettura, l'UID cifrato, il contatore degli avvicinamenti e la firma. Da quel momento ogni avvicinamento produce un URL unico e firmato.
3. **Imposta una tua Key 0.** Sostituisce gli zeri di fabbrica con una chiave che conosci solo tu, così nessun altro può riconfigurare il tag.

Per l'ultimo passaggio digiti una passphrase, non una chiave. NFC.cool ne ricava la chiave AES prendendo i primi 16 byte dell'hash SHA-256 della passphrase, allo stesso modo su iPhone e su Android, così un tag preparato su un telefono si apre con la stessa passphrase sull'altro. Se preferisci una chiave generata altrove, per esempio dal tuo server, incolla direttamente i 32 caratteri esadecimali.

Una chiave persa significa un tag che non potrai mai più riconfigurare, quindi l'app sta molto attenta a dove la mette. Su iPhone finisce nel Portachiavi e si sincronizza tramite Portachiavi iCloud. Su Android viene cifrata con una chiave protetta dall'hardware e copiata in Block Store, così sopravvive a una reinstallazione o al passaggio a un telefono nuovo. La chiave nuova viene salvata prima di inviare la modifica e, se l'avvicinamento si interrompe a metà, restano disponibili sia il vecchio sia il nuovo valore finché il tag non conferma quale dei due ha davvero. Puoi anche inserire a mano una passphrase impostata su un altro dispositivo: prima di salvarla, l'app la mette alla prova sul tag.

C'è una cosa che l'app si rifiuta di fare di proposito: scrivere un link normale su un tag con SUN attivo passando dalla schermata di scrittura ordinaria. Gli offset del mirroring sono fissati sull'URL con cui li hai configurati, e un URL di lunghezza diversa lascerebbe il chip a scrivere in mezzo al nuovo contenuto a ogni avvicinamento. La schermata dedicata all'NTAG 424 disattiva prima SUN e poi scrive.

---

## Tutto il resto del chip

Quasi tutti i tutorial si fermano alla versione breve, e finora per andare oltre serviva TagXplorer di NXP su un computer con un lettore USB. Io volevo tutto il datasheet raggiungibile dal telefono, così me lo sono percorso sezione per sezione.

<figure class="phone-figure" data-layout="stage">
<figcaption>Il resto del chip, sul telefono</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/ntag-424-dna-counterfeit-proof-nfc-tags/2-key-0-440w.webp" alt="La schermata di Key 0: impostare la chiave da una passphrase o in esadecimale, inserirne una impostata su un altro dispositivo o tornare a quella di fabbrica"><p><strong>Key 0.</strong> Impostala da una passphrase o da una chiave esadecimale, inseriscine una impostata su un altro dispositivo oppure torna a quella di fabbrica.</p></li>
<li><img src="/assets/images/Blog/screens/ntag-424-dna-counterfeit-proof-nfc-tags/3-advanced-440w.webp" alt="La schermata delle impostazioni avanzate: identità del chip, memoria, SUN attivo e chiavi da 1 a 4"><p><strong>Impostazioni avanzate.</strong> L'identità del chip e le altre quattro chiavi, ognuna con le stesse opzioni di Key 0.</p></li>
<li><img src="/assets/images/Blog/screens/ntag-424-dna-counterfeit-proof-nfc-tags/4-vault-440w.webp" alt="La cassaforte con una nota salvata, 36 byte su 126"><p><strong>La cassaforte.</strong> Fino a 126 byte di testo che solo Key 0 può rileggere.</p></li>
</ol>
</figure>

### Tutte e cinque le chiavi

Key 0 ha una schermata tutta sua, mentre le chiavi da 1 a 4 stanno nelle impostazioni avanzate. Ognuna si può ricavare da una passphrase o digitare in esadecimale, riportare al valore di fabbrica oppure inserire a mano se l'hai già definita su un altro dispositivo. Ogni modifica si autentica con Key 0, che ha autorità su tutti e cinque gli slot.

### SUN, con le chiavi che scegli tu

Attivare SUN non è un unico interruttore. Scegli la **modalità**: cifrata, in cui l'UID viaggia dentro `picc_data` e solo chi ha la chiave riesce a leggerlo, oppure in chiaro, in cui UID e contatore compaiono nell'URL alla luce del sole e l'unico segreto è la firma. E scegli quali chiavi fanno il lavoro: una **chiave di meta-lettura** che cifra i dati PICC e una **chiave di lettura del file** che calcola la firma. Possono essere lo stesso slot oppure due slot diversi: è così che un marchio può consegnare a un partner la chiave che verifica gli avvicinamenti senza dargli anche quella che decifra gli UID.

L'app ti avvisa se scegli uno slot ancora fermo agli zeri di fabbrica, perché una firma fatta con una chiave nota non protegge niente. E la parte che verifica capisce le stesse combinazioni: un avvicinamento firmato con Key 3 e cifrato con Key 1 si verifica correttamente, purché quelle chiavi siano salvate sul telefono.

### I diritti di accesso ai file

Ogni file porta con sé quattro permessi: lettura, scrittura, lettura e scrittura, e modifica; quest'ultimo stabilisce chi può cambiare gli altri tre. Ogni permesso punta a una delle cinque chiavi, a Free (chiunque) oppure a Never (nessuno, mai). Puoi quindi dire "il File 02 lo legge chiunque, lo scrive solo Key 2 e queste regole le cambia solo Key 0", e il chip lo fa rispettare senza bisogno di nessuna app.

NFC.cool mostra i diritti attuali di ogni file e ti lascia modificarli, con due avvisi integrati. Ti segnala quando un permesso punta a una chiave che questo telefono non possiede, perché rischi di chiuderti fuori da solo. E ti fa confermare con un passaggio a parte prima di portare il permesso di modifica su Never, perché, una volta scritta quell'impostazione, le regole del file restano congelate per tutta la vita del chip.

### La configurazione del chip

Sotto i file c'è la configurazione del chip vero e proprio, che NXP espone attraverso un unico comando SetConfiguration. NFC.cool copre queste opzioni:

- **Random UID.** Di norma il chip comunica a ogni lettore lo stesso UID fisso, il che permette a chiunque di seguire un tag da un avvicinamento all'altro. Con Random UID attivo risponde ogni volta con un identificativo casuale e rivela quello vero solo dopo l'autenticazione. Un guadagno reale sul fronte della privacy, e definitivo. L'app riconosce i tag dall'UID, quindi dopo recupera quello vero provando ogni Key 0 che conosce con un GetCardUID autenticato, e il tag resta gestibile dal telefono che lo ha preparato.
- **Limite di autenticazioni fallite.** Quanti tentativi con la chiave sbagliata il chip tollera prima di bloccare Key 0. È una protezione contro chi prova a indovinare la chiave, ma impostalo troppo basso e bastano pochi avvicinamenti andati male per bloccare la chiave principale per sempre.
- **Intensità della modulazione di risposta.** Forte o standard. Sulle antenne piccole quella standard può risultare illeggibile, quindi lasciare il valore predefinito è una scelta sensata.
- **Scrittura concatenata.** Si può disattivare, così ogni scrittura resta limitata a un solo frame. Scelta definitiva.
- **Byte di capacità.** Due byte liberi che NXP lascia a tua disposizione.
- **LRP.** L'interruttore del secure messaging, a cui dedico una sezione qui sotto.

### La cassaforte

Il File 03 è un file proprietario da 128 byte che il chip può tenere cifrato, e NFC.cool lo trasforma in un piccolo archivio privato sul tag stesso. La prima volta che ci salvi qualcosa, l'app porta il file in modalità completamente cifrata e vincola ogni diritto di accesso a Key 0. Da quel momento la cassaforte contiene fino a 126 byte di testo che solo la tua chiave può rileggere, e una lettura approfondita fatta da qualsiasi altro telefono ottiene un errore di permessi e nient'altro.

Serve per un segreto che deve viaggiare con l'oggetto invece di stare nel database di qualcun altro: un numero di serie, un appunto da ritrovare in futuro, un token che il tuo server si aspetta. Riportare Key 0 al valore di fabbrica lo cancella, ed è l'unico modo in cui la cassaforte sparisce.

---

## La modalità LRP

Di norma il chip protegge le sue chiavi con l'AES classico, e rubarne una vorrebbe dire violare l'AES stesso. Esiste però una via d'attacco più subdola. Metti il chip su un banco di prova, misura le minime variazioni di assorbimento elettrico e di emissioni elettromagnetiche mentre esegue la cifratura e, con abbastanza tracce di questo tipo, ricostruisci la chiave solo da quello che è trapelato, senza mai toccare la matematica. **LRP**, cioè Leakage-Resilient Primitive, è un canale sicuro ricostruito da zero perché a quella fuga non resti nulla a cui aggrapparsi. NXP lo documenta nella nota AN12304 ed è davvero sproporzionato per un adesivo su una bottiglia di vino, motivo per cui quasi nessun tag lo attiva e quasi nessuno strumento impara a parlarlo.

Negli appunti di progettazione della prima versione, proprio accanto a "modalità LRP", avevo scritto "non prevista". Ma la cosa ha continuato a ronzarmi in testa, così l'ho implementata. NFC.cool può portare un tag in modalità LRP e, cosa più importante, continuare poi ad autenticarsi e a gestirlo: chiavi, diritti sui file, cassaforte, configurazione del chip, tutto sul canale LRP invece che su AES.

Due cose da sapere prima di premere quell'interruttore. È definitivo: quando un tag passa in modalità LRP, il suo secure messaging AES resta disattivato per sempre e nessuno strumento che parli solo AES riuscirà più a dialogare con quel tag. E su un tag LRP il SUN non è disponibile, quindi un tag che ha il compito di firmare gli avvicinamenti conviene lasciarlo in modalità AES.

---

## Le operazioni senza ritorno

Molti di questi comandi sono definitivi, e l'app lo mette bene in chiaro sul momento: ogni azione irreversibile chiede una conferma con un avviso che ne spiega la conseguenza esatta. Vale comunque la pena elencarle anche qui.

- L'attivazione di LRP.
- L'attivazione del Random UID.
- La disattivazione della scrittura concatenata.
- Il permesso di modifica di un file portato su Never.
- La perdita di una chiave. Il chip non ha un ripristino di fabbrica: se Key 0 è persa, con lei sparisce anche la possibilità di riconfigurare il tag.
- Un limite di autenticazioni fallite troppo basso, che può bloccare Key 0 dopo pochi avvicinamenti sbagliati.

Fai pratica su un tag di scorta prima di toccare quello a cui tieni davvero.

---

## Dove si usano davvero i tag NFC anticontraffazione

Sinceramente? Quasi nessuno di quelli che avvicinano il telefono a un tag NFC ha bisogno di tutto questo, e va benissimo così. Un adesivo che apre un link è una cosa splendida, banale e utile.

Ma quando ne hai tenuto uno in mano, gli usi diventano lampanti. Una borsa di lusso può dimostrare di essere originale. Una bottiglia di vino o di whisky può dimostrare che nessuno l'ha stappata di nascosto per riempirla di nuovo, e di quella metà si occupa il sigillo antimanomissione. Una scatola di medicinali fa da garanzia sia per il farmaco che contiene sia per un sigillo che nessuno ha rotto. I biglietti per gli eventi smettono di essere qualcosa di cui fare uno screenshot da passare in giro, e un tag accanto a una porta dimostra che qualcuno è stato davvero lì invece di riproporre un link salvato dal divano. È lo stesso problema di autenticità che il [passaporto digitale di prodotto dell'UE](/blog/eu-digital-product-passport-2026/) affronta dal lato delle regole, risolto però a livello del singolo oggetto.

Non l'ho sviluppato perché me lo avessero chiesto in mille. L'ho sviluppato perché per curiosità ho comprato dei tag strani su internet, ho capito come funzionavano e poi non ho avuto pace finché non ho esplorato ogni singola pagina del datasheet. Di solito le funzioni migliori nascono così.

---

## Tirando le somme sui tag NTAG 424 DNA

Nel mondo NFC, i tag NTAG 424 DNA sono quanto di più vicino esista a un sigillo inviolabile. Non possono impedire a nessuno di copiare un prodotto, ma rendono impossibile falsificare la *prova che quel prodotto è originale*, perché quella prova è una firma crittografica nuova che solo il chip vero sa produrre.

NFC.cool Tools li legge, verifica il chip, l'avvicinamento e il sigillo antimanomissione, e ti mette in mano l'intero chip da configurare: ogni chiave, i permessi di ogni file, le impostazioni del chip e perfino l'LRP, tutto dal telefono. Se ti sei mai chiesto come faccia un avvicinamento a distinguere l'originale dal falso, scaricala su [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-it&mt=8) o [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-it), ordina un paio di [questi tag](/affiliate-links/) per pochi euro e provane uno di persona. È una di quelle cose in cui è bello perdersi.
