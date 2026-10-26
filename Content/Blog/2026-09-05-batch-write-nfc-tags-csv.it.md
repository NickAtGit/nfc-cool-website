---
id: batch-write-nfc-tags-csv-2026-09
title: "Come scrivere tanti tag NFC partendo da un foglio di calcolo"
date: 2026-09-05
tags: ["guides", "nfc-tags", "iphone"]
summary: "Alle conferenze e ai meetup regalo codici promozionali dell'App Store scritti su tag NFC, ormai a centinaia. Ecco come li preparo, e il metodo vale per qualsiasi elenco: costruiscilo in un foglio di calcolo, esportalo in CSV, porta il file sul telefono e lascia che NFC.cool Tools scriva un tag dopo l'altro."
image: "/assets/images/Features/nfc-reader-writer-csv-batch-write.webp"
imageAlt: "iPhone con un foglio di calcolo sullo schermo che scrive le righe del foglio su una fila di tag NFC"
author: "Nicolo Stanciu"
metaTitle: "Scrivere tag NFC in serie da un file CSV su iPhone e Android"
metaDescription: "Programma centinaia di tag NFC da un solo foglio di calcolo: prepara l'elenco, esportalo in CSV, portalo sul telefono e lascia scrivere NFC.cool Tools."
ogTitle: "Scrivere tag NFC in serie da un foglio di calcolo"
ogDescription: "Da un CSV sul computer a una pila di tag NFC scritti, uno alla volta. Come preparo centinaia di tag con i codici promozionali per le conferenze."
---
Vado alle conferenze e ai meetup per far vedere le mie app, e alla fine di una bella chiacchierata mi piace lasciare un tag NFC con sopra un codice promozionale. Avvicini il tag, si apre l'App Store con il codice già inserito e l'app è tua.

I tag non sono mai stati il problema. Lo era la quantità. Ogni codice promozionale è diverso, quindi ogni tag ha bisogno del suo link, e ne volevo qualche centinaio. Scriverli uno alla volta dentro l'app, a quei numeri, non era pensabile. Per questo ho aggiunto a NFC.cool Tools la **scrittura in serie da CSV**: preparo l'elenco sul Mac, lo esporto in CSV, porto il file sul telefono e poi avvicino un tag dopo l'altro mentre l'app macina le righe. Di tag, così, ne ho scritti centinaia.

Ecco tutto il procedimento, dal foglio di calcolo all'ultimo tag. Funziona allo stesso modo con i link ai prodotti, i numeri di serie, le credenziali Wi-Fi o qualsiasi altra cosa entri in una cella.

---

## Che cosa fa davvero la scrittura in serie da CSV

Dai all'app un file CSV e ogni riga diventa un tag. L'app ti mostra in anteprima che cosa finirà su ciascun tag, tocchi Avvia la scrittura e poi avvicini un tag dopo l'altro. Ogni riga scritta sparisce dal file, quindi l'elenco sullo schermo mostra sempre e solo quello che manca. Puoi fermarti quando vuoi e riprendere più tardi, anche dopo giorni.

Se non hai mai scritto un tag NFC, parti dalla mia [guida per scrivere i tag NFC con l'iPhone](/blog/write-nfc-tags-iphone/). Qui si parla di scriverne tanti.

---

## Passo 1: prepara il foglio di calcolo sul computer

Apri Numbers, Excel o Fogli Google e costruisci l'elenco sul computer. È molto più rapido che fare qualsiasi cosa sul telefono, e il foglio di calcolo può costruire i link al posto tuo.

L'impostazione più semplice è **una sola colonna, con una riga per ogni tag**. Ogni riga è esattamente il contenuto di un tag. Una colonna di link ai prodotti si presenta così:

```
https://example.com/products/1001
https://example.com/products/1002
https://example.com/products/1003
```

Se i valori cambiano solo per un numero o per un identificativo, lascia che sia una formula a riempire la colonna. Scrivi il primo, trascina in basso e l'elenco è pronto, per quanto lungo sia. Se gli identificativi ce li hai già in un file, aprilo nel foglio di calcolo e aggiungi davanti la parte fissa con una formula.

L'app guarda come comincia ogni valore e sceglie il tipo di record corrispondente:

- Un link (`https://`, `http://` oppure `www.`) diventa un record URL. Avvicini il tag e il browser lo apre.
- `tel:`, `mailto:`, `sms:` e `geo:` diventano l'azione corrispondente: un tag può far partire una chiamata, aprire una email o mostrare un luogo sulla mappa.
- `WIFI:T:WPA;S:MyNetwork;P:secret;;` diventa un record Wi-Fi, lo stesso formato che usa un codice QR per il Wi-Fi. Un dettaglio da tenere presente: quella stringa contiene dei punti e virgola, quindi l'app darà per scontato che il file sia separato da punti e virgola e la farà a pezzi. Imposta la virgola come separatore nell'app e la riga resta intera.
- `shortcuts://` avvia un Comando rapido di iOS.
- Tutto il resto viene scritto come testo semplice.

Tieni ogni valore su una sola riga. Il file si legge riga per riga, quindi una scheda contatto distribuita su più righe finirebbe su più tag.

Due cose a cui fare attenzione:

1. **Niente riga di intestazione.** L'app considera contenuto ogni riga non vuota. Se nella prima riga c'è scritto "URL", sul primo tag finirà la parola URL.
2. **Le righe vuote non danno fastidio.** Vengono saltate, come gli spazi prima e dopo un valore.

### Quando un tag deve contenere più record

A volte su un tag deve stare più di una cosa: per esempio un sito, un numero di telefono e un indirizzo email per ogni persona. In quel caso aggiungi delle colonne. Nell'app scegli **Raggruppa per righe** e ogni riga diventa un tag con un record per cella. **Raggruppa per colonne** fa l'opposto e trasforma ogni colonna in un tag, nel caso avessi costruito il foglio al contrario. Per un file a una sola colonna c'è invece l'impostazione **Righe per tag**, così tre righe finiscono su un unico tag come tre record.

---

## Passo 2: esportalo in CSV

Un file CSV è un file di testo semplice: una riga di testo per ogni riga del foglio, e le celle di una riga separate da una virgola, da un punto e virgola o da una tabulazione. Se lo apri con TextEdit o con il Blocco note vedi esattamente quello che vedrà l'app. Un foglio con un link e un numero di telefono per persona, dopo l'esportazione, si presenta così:

```
https://example.com/anna,tel:+4915112345678
https://example.com/ben,tel:+4915198765432
```

Formattazione e formule non sopravvivono all'esportazione, restano solo i valori. Ecco come tirare fuori quel file da Numbers, da Excel e da Fogli Google.

### Numbers sul Mac

1. Scegli **Archivio**, poi **Esporta in**, poi **CSV**.
2. Se il documento contiene più di una tabella, Numbers chiede se creare un file per tabella o se unirle. A te serve una tabella in un file.
3. Lascia **Includi i nomi delle tabelle** senza spunta. Altrimenti Numbers scrive il nome della tabella nel file come riga a sé, e quella riga finirebbe su un tag.
4. In **Opzioni avanzate** lascia la codifica del testo su Unicode (UTF-8).
5. Fai clic su **Avanti**, dai un nome al file e fai clic su **Esporta**.

Due cose su Numbers. La prima: ogni tabella nuova nasce con una riga di intestazione colorata, e quello che ci scrivi dentro viene esportato come qualsiasi altra riga, quindi lasciala vuota o eliminala. La seconda: Numbers usa sempre la virgola. Se un valore contiene una virgola, Numbers lo racchiude tra virgolette, e quelle virgolette l'app non le toglie. Quando esporti da Numbers, quindi, tieni le virgole fuori dai valori.

### Excel su Mac o Windows

1. Scegli **File**, poi **Salva con nome** (in certe versioni si chiama Salva una copia).
2. Scegli il formato **CSV UTF-8 (delimitato da virgole) (.csv)**.
3. Excel salva solo il foglio che hai davanti e avvisa che la formattazione andrà persa. Conferma: la formattazione non ti serve.

Nonostante il nome, Excel non usa sempre la virgola. Prende il separatore di elenco dalle impostazioni internazionali del sistema, e su un sistema italiano, tedesco, francese, olandese e su quasi tutti gli altri sistemi europei quel separatore è il punto e virgola, perché la virgola lì è già il separatore dei decimali. Non devi cambiare niente: NFC.cool riconosce da solo virgola, punto e virgola e tabulazione. Vuol dire anche che i valori possono contenere delle virgole.

### Fogli Google

1. Scegli **File**, poi **Scarica**, poi **Valori separati da virgole (.csv)**.
2. Viene esportato solo il foglio attivo, sempre con la virgola.

### Prima di spostare il file

Prima di mandare il file sul telefono lo apro sempre in un editor di testo. Devi vedere una riga per tag, nessuna riga di intestazione, nessuna virgoletta intorno ai valori e nessuna virgola di troppo dentro un file separato da virgole. Se un valore deve per forza contenere una virgola, esporta da Excel con il punto e virgola, oppure usa l'esportazione TSV di Numbers (separata da tabulazioni) e rinomina il file con estensione `.csv`. Sull'iPhone il file deve comunque finire in `.csv`, perché è su quello che filtra il selettore dei file.

---

## Passo 3: porta il file sul telefono

Va bene qualsiasi strada che finisca nell'app File su iPhone, o in un punto raggiungibile dal selettore di file di sistema su Android.

- Manda il file dal Mac all'iPhone con **AirDrop** e scegli Salva su File.
- **iCloud Drive:** metti il CSV su iCloud Drive dal Mac e lo ritrovi nell'app File del telefono. Google Drive e Dropbox funzionano allo stesso modo, anche quelli l'app File li sa sfogliare.
- **Mandati il file per email** e salva l'allegato.
- **Android:** Quick Share dal portatile, Google Drive o un cavo USB. L'app usa il selettore di documenti di sistema, quindi va bene qualsiasi posizione che il selettore riesca ad aprire.

---

## Passo 4: importalo e controlla l'anteprima

In NFC.cool Tools apri la schermata degli strumenti NFC e cerca **Scrittura in serie da CSV** sotto **Modalità in serie**. Su Android si trova nello stesso elenco di strumenti NFC. Tocca **Importa CSV** e scegli il file.

L'app si fa una copia del file. Man mano che scrivi i tag, le righe spariscono da quella copia. Il foglio di calcolo originale sul computer resta com'è, quindi l'elenco completo ce l'hai sempre.

Appena scegli il file, l'app mostra quello che ha riconosciuto: il separatore, il numero di colonne, la modalità di raggruppamento e quanti tag ti serviranno. Il numero che controllo sempre è **Byte per tag NFC**, cioè la dimensione del messaggio più lungo della serie. Confrontalo con i tag che hai. Un NTAG213 arriva a 144 byte, un NTAG215 a 504 e un NTAG216 a 888. Un link corto sta sui 50 byte, quindi per i link vanno benissimo anche i tag più economici. Un record Wi-Fi o una scheda contatto lunga hanno bisogno di un 215 o di un 216. Se non sai che chip hai in mano, dai un'occhiata alla mia [guida ai tipi di tag NFC](/blog/nfc-tag-types-for-iphones/).

Apri l'**Anteprima della serie** per vedere ogni tag con i record che riceverà. Quello che compare lì è esattamente quello che verrà scritto.

<figure class="phone-figure" data-layout="stage">
<figcaption>Importa e controlla</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/batch-write-nfc-tags-csv/1-import-440w.webp" alt="CSV Batch Write in NFC.cool Tools, con Help, Import CSV e il file importato team-links.csv"><p><strong>Importa il CSV.</strong> Scegli il file. L'app lavora su una copia tutta sua.</p></li>
<li><img src="/assets/images/Blog/screens/batch-write-nfc-tags-csv/2-summary-440w.webp" alt="La configurazione del batch: separatore virgola, raggruppato per righe, 2 colonne, 24 tag NFC necessari e 49 byte per tag NFC"><p><strong>Controlla i numeri.</strong> Bytes per NFC tag è il valore da confrontare con i tuoi tag.</p></li>
<li><img src="/assets/images/Blog/screens/batch-write-nfc-tags-csv/3-preview-440w.webp" alt="Batch Preview: tag da 1 a 4, ognuno con 2 record, un link del team e un indirizzo email, e Start Writing"><p><strong>Anteprima, poi scrittura.</strong> Esattamente quello che riceverà ogni tag, prima di scrivere il primo.</p></li>
</ol>
</figure>

---

## Passo 5: scrivi tutta la pila

Tocca **Avvia la scrittura** e avvicina il primo tag al bordo superiore dell'iPhone. Quando il telefono vibra il tag è scritto e puoi prendere il successivo. La riga appena scritta sparisce dall'elenco e il contatore ti dice quante ne restano.

Alcune cose capiteranno di sicuro, e sono del tutto normali:

- **Il pannello di scansione sparisce dopo 60 secondi.** È un limite di iOS, non un blocco dell'app. Torna da solo dopo qualche secondo e riprendi da dove eri.
- **Un tag non si scrive.** Magari era bloccato, magari l'hai allontanato troppo presto. La riga resta nel file, l'app non salta avanti, e tu riprovi con quel tag o ne prendi un altro.
- **Devi interrompere.** Chiudi l'app, fai altro, torna domani. Il file si ricorda quello che manca. Su Android l'app mostra la serie lasciata a metà e propone di riprenderla.

Cento tag, una volta preso il ritmo, se ne vanno in fretta.

---

## Che cosa ho imparato scrivendone a centinaia

**Scrivine prima due.** Poi rileggili con l'app e controlla che facciano quello che devono. Solo dopo passa al resto.

**Il chip più capiente non serve.** Per i link basta un NTAG213, che in quantità costa parecchio meno. L'NTAG216 tienilo per le schede contatto e per il Wi-Fi.

**Blocca o proteggi con password i tag che regali.** Proprio accanto alla Scrittura in serie da CSV ci sono le modalità Blocco in serie e Protezione con password in serie. Il blocco rende un tag di sola lettura per sempre; la password ti lascia la possibilità di cambiarlo in futuro e la toglie a tutti gli altri. I tag che escono dalle tue mani passali poi in una delle due modalità, così nessuno può sovrascriverne il contenuto.

La Scrittura in serie da CSV si trova in [NFC.cool Tools su iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-batch-write-nfc-tags-csv-it&mt=8) e [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-batch-write-nfc-tags-csv-it). E se ci incontriamo a una conferenza o a un meetup, chiedimi un tag.
