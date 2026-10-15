---
id: "ios-shortcuts-nfc-tap-counter-2026-05"
title: "Leggere il contatore degli avvicinamenti con i Comandi Rapidi"
date: "2026-05-22"
tags: ["nfc-tags", "automation", "iphone"]
summary: "Due comandi rapidi pronti all'uso che estraggono l'ID del tag e il conteggio delle scansioni dal contatore degli avvicinamenti: un parser riutilizzabile e una demo che lo mette alla prova."
image: "/assets/images/Blog/ios-shortcuts-nfc-tap-counter.webp"
imageAlt: "Un iPhone che mostra un avviso con l'ID del tag e il numero di scansioni dopo l'avvicinamento a un adesivo NFC"
author: "Nicolo Stanciu"
metaTitle: "Contatore degli avvicinamenti NFC e Comandi Rapidi di iOS"
metaDescription: "Un comando rapido riutilizzabile che estrae ID del tag e conteggio delle scansioni dal contatore degli avvicinamenti NFC, con una demo pronta da installare."
ogTitle: "Leggere il contatore degli avvicinamenti con i Comandi Rapidi"
ogDescription: "Due comandi rapidi pronti all'uso per il contatore degli avvicinamenti NFC: un parser riutilizzabile e una demo che lo mette alla prova."
---

Una settimana fa ho spiegato [come funziona il contatore degli avvicinamenti](/blog/count-nfc-tag-scans/): il chip conta da solo le proprie scansioni, l'app inserisce dei byte segnaposto e a ogni avvicinamento il tag li sostituisce con il conteggio aggiornato e con il proprio ID, dentro qualunque contenuto stia trasportando. Quel post finisce dove finisce il tag, cioè nel momento in cui i valori arrivano sul telefono.

Da allora la domanda che mi arriva è quella successiva, la più ovvia: "bene, il tag mi passa `049F50824F1390x000007`, e adesso?" Se hai un iPhone e vuoi fare qualcosa con quei valori dentro un comando rapido, prima devi estrarli. È un lavoro di manipolazione di stringhe breve ma noioso, e preferisco risparmiartelo.

Così ho creato due comandi rapidi e li condivido come link iCloud. Uno è il motore. L'altro è una demo che lo usa.

---

## Che cosa ti passa il tag

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/ios-shortcuts-nfc-tap-counter/1-shortcut-440w.webp" alt="L'NFC Tap Counter impostato su Shortcut, che avvia NFC Tag Alert con l'input log-entry, con entrambi gli interruttori attivi"><p><strong>Un comando rapido come contenuto.</strong> Il tag avvia NFC Tag Alert con log-entry come input.</p></li>
<li><img src="/assets/images/Blog/screens/ios-shortcuts-nfc-tap-counter/2-preview-440w.webp" alt="L'anteprima: shortcuts://run-shortcut?name=NFC%20Tag%20Alert&input=text&text=log-entry%20049F50824F1390x000007"><p><strong>Cosa riceve il comando.</strong> L'input, con in coda l'ID del tag e il conteggio.</p></li>
</ol>
</figure>

Prima dei comandi rapidi, un ripasso veloce su quello che ricevono davvero, perché cambia il modo in cui li userai.

Nella schermata di configurazione del contatore scegli un tipo di contenuto per il tag: URL, email, SMS o comando rapido. Quando attivi l'interruttore del contatore, quello dell'ID del tag o entrambi, l'app inserisce dei byte segnaposto dentro quel contenuto e a ogni lettura il chip li sostituisce con i valori reali. Prendendo `049F50824F1390` come ID del tag e `000007` come conteggio, i quattro tipi di contenuto diventano così:

- **URL:** `https://nfc.cool/tap-counter/` diventa [`https://nfc.cool/tap-counter/?nfc=049F50824F1390x000007`](https://nfc.cool/tap-counter/?nfc=049F50824F1390x000007)
- **Corpo dell'email:** `Hi, here's my card.` diventa `Hi, here's my card. 049F50824F1390x000007`
- **Corpo dell'SMS:** `Order confirmed!` diventa `Order confirmed! 049F50824F1390x000007`
- **Testo in ingresso del comando rapido:** `log-entry` diventa `log-entry 049F50824F1390x000007`

L'indirizzo qui sopra è vero. La nostra [demo dal vivo del contatore](/tap-counter/) legge il valore `?nfc=` direttamente dalla barra degli indirizzi: se vuoi vedere la sostituzione all'opera prima di costruire un'automazione, scrivi un tag che punti a `https://nfc.cool/tap-counter/` con entrambi gli interruttori attivi, avvicinalo al telefono e la pagina ti mostra l'ID del tag e il conteggio appena ricevuti.

Con il tipo di contenuto **Comando rapido**, NFC.cool avvia il comando scelto tramite `shortcuts://run-shortcut?name=Your%20Shortcut&input=text&text=<payload>`, con i valori NFC già aggiunti in coda al testo. In ingresso il comando rapido riceve quindi una stringa di testo semplice e l'unica cosa da fare è tirarne fuori l'ID del tag e il conteggio.

A seconda degli interruttori attivi quando hai scritto il tag, ti arriva lo schema completo (14 caratteri esadecimali, una `x`, poi altri 6 caratteri esadecimali), oppure solo l'ID del tag da 14 caratteri, oppure solo il conteggio da 6. Il parser gestisce tutti e tre i casi.

---

## Parse NFC Tap Counter: il comando rapido riutilizzabile

[Installa Parse NFC Tap Counter](https://www.icloud.com/shortcuts/4c70ab3ade1a4398bb6a39edba94bf26)

Questo è il motore. Non mostra niente a schermo, accetta un solo testo in ingresso e restituisce un dizionario. È una scelta voluta: un comando rapido di servizio senza interfaccia si incastra senza attriti in qualunque cosa tu costruisca, e un dizionario è la struttura più comoda da leggere in un altro comando rapido, con l'azione **Ottieni valore dal dizionario**.

Ecco che cosa contiene il dizionario:

- `tagID` - l'ID del tag, 14 caratteri esadecimali, oppure una stringa vuota se l'interruttore era spento.
- `count` - il conteggio delle scansioni come numero decimale (`000007` esce come `7` e `00000A` come `10`), vuoto se l'interruttore era spento.
- `countHex` - il conteggio esadecimale originale a 6 caratteri, nel caso ti serva così com'è. Vuoto quando manca.
- `hasTagID`, `hasCount` - due valori booleani per le condizioni, così scrivi **Se hasCount è vero** senza doverti mettere a controllare la stringa a mano.
- `content` - il testo in ingresso ripulito dal payload NFC, così il resto del comando rapido vede l'input com'era prima che il tag ci mettesse mano. Se in ingresso c'era un indirizzo con `?nfc=...`, te lo restituisce senza. Se era il corpo di un'email con l'ID del tag in coda, ti torna il corpo pulito.
- `raw` - il testo originale non modificato, utile per registrarlo o per ripiegarci sopra.

Per richiamarlo dai tuoi comandi rapidi servono tre azioni:

1. **Input comando rapido** impostato su testo: è qui che arriva il payload NFC.
2. **Esegui comando rapido** con Parse NFC Tap Counter, passandogli quel testo. Disattiva "Mostra durante esecuzione" così resta invisibile.
3. **Ottieni valore dal dizionario** e scegli `tagID`, `count`, `content` o le chiavi che ti interessano.

Tutto qui. Dal terzo passo in poi con quei valori fai quello che vuoi: una condizione su `hasTagID`, `count` scritto in una nota, un webhook con il JSON, qualsiasi cosa. Il parser non dà per scontato che cosa vuoi fare del risultato, ed è esattamente per questo che resta piccolo e riutilizzabile.

Una precisazione sul conteggio: nel dizionario è un numero vero, non una stringa di testo, quindi lo passi direttamente a **Calcola** o a un confronto dentro **Se**, senza doverlo convertire di nuovo. Il passaggio da esadecimale a decimale è già fatto.

---

## NFC Tag Alert: la demo

[Installa NFC Tag Alert](https://www.icloud.com/shortcuts/f78b78c917a2417385ae25711a3e877a)

Questa è una demo che installerei comunque il primo giorno, anche se non hai la minima intenzione di usare gli avvisi sul serio. Prende un testo in ingresso, esegue il parser e mostra un solo avviso, intitolato **NFC Tag Scanned**, con due righe:

```
Tag ID: 049F50824F1390
Scans: 7
```

Il motivo per cui la installerei per prima è che, su un tag con il contatore attivo, è la verifica più rapida che esista. Scrivi un tag da NFC.cool Tools scegliendo il tipo di contenuto **Comando rapido** e il nome **NFC Tag Alert**, attiva gli interruttori del contatore e dell'ID del tag, scrivi il tag e avvicinalo al telefono. Compare un avviso con i valori reali del tag che hai in mano.

Se l'avviso mostra i valori che ti aspettavi, il tag sta facendo il suo lavoro e puoi passare a costruire qualcosa di più elaborato. Se invece il conteggio è sbagliato o l'ID del tag non compare, sai che il problema è il tag (o gli interruttori scelti quando l'hai scritto) e non il comando rapido che hai scritto tu. Togliere di mezzo un'intera categoria di dubbi del tipo "sarà mica colpa del chip?" vale ampiamente un comando rapido da cinque azioni.

E se un giorno ti chiedi come si richiama il parser nel modo giusto, questa demo è anche l'esempio pratico più piccolo possibile. Aprila, guarda le cinque azioni e ricopia la struttura nel tuo comando rapido.

---

## Come collegarlo ai tuoi comandi rapidi

Il contenuto del tag può arrivare a un comando rapido per due strade diverse. Al parser vanno bene entrambe.

**Dal tag (il payload del comando rapido).** Scrivi il tag con tipo di contenuto **Comando rapido**, indica il nome del comando e attiva gli interruttori che ti servono. Da quel momento ogni avvicinamento lancia il comando con il payload NFC già in ingresso. Dentro il comando passa quel testo a Parse NFC Tap Counter e hai `tagID` e `count` pronti all'uso.

**Dall'indirizzo (il payload dell'URL).** È il caso più frequente. Il tag contiene un indirizzo, il telefono lo apre all'avvicinamento e il conteggio viaggia insieme come `?nfc=...`. Se preferisci che a gestire l'avvicinamento sia un comando rapido invece del browser, o oltre al browser, la strada c'è: fai passare l'indirizzo per un comando rapido che accetta in ingresso le pagine web di Safari, poi esegui Parse NFC Tap Counter su quell'indirizzo. Il parser stacca il segmento `?nfc=` senza lasciare tracce e in `content` restituisce l'indirizzo pulito, pronto da passare al browser, a una chiamata API o a qualunque altra cosa si aspetti un indirizzo normale.

Ecco un esempio in quattro azioni per registrare ogni scansione in una nota dell'app Note:

1. **Input comando rapido** impostato su testo.
2. **Esegui comando rapido** con Parse NFC Tap Counter, passandogli quel testo.
3. **Ottieni valore dal dizionario** tre volte di fila, per `tagID`, `count` e `content`. Salva ogni risultato in una variabile.
4. **Aggiungi a nota** una riga sola, tipo `[Current Date] tag=<tagID> count=<count> url=<content>`.

A questo punto hai un registro degli avvicinamenti che si scrive da solo, tenuto dal tag stesso. Niente backend, niente strumenti di analisi di terze parti, nessun account da nessuna parte.

---

## Qualche idea da cui partire

Qualche piccola cosa che il parser rende possibile, scritta nero su bianco per non doverla inventare da zero:

- **Distingui i tag dall'ID.** Un solo comando rapido, tanti tag. Aggiungi un'azione **Se** per ogni ID che conosci: se è stato scansionato il tag della porta dell'ufficio, silenzia le notifiche; se è quello dello studio, attiva la modalità di concentrazione; se è quello della cucina, fai partire un timer. L'ID identifica il tag fisico, non il contenuto, quindi puoi scrivere lo stesso indirizzo su tutti i tag e reagire comunque a ciascuno in modo diverso.
- **Premia la scansione numero cento.** Unisci `hasCount` a un confronto: se `count` vale 100, manda un messaggio di conferma; per tutte le altre scansioni, gestione normale. L'ordine lo garantisce il chip, al comando rapido resta solo da leggerlo.
- **Manda tutto a un webhook.** Abbina il parser ai [webhook di NFC.cool](/features/webhooks/) se vuoi gestire le scansioni lato server senza scrivere un'app per iOS: mandi i valori estratti in JSON e da lì se ne occupa il server. Due azioni su iOS e il tag è collegato a qualsiasi cosa parli HTTP.
- **Registra tutto in un file o in una nota.** L'idea più semplice e, a sorpresa, una delle più utili. Aggiungi `timestamp, tagID, count` in coda a un file su iCloud Drive o a un'unica nota e hai un registro da scorrere, o da trasformare in un grafico più avanti. Comodo per seguire quanto viene usato un singolo tag senza tirare su nessuna infrastruttura.

Se ci costruisci sopra qualcosa di bello, mi farebbe davvero piacere vederlo.

---

## Un ringraziamento

Tutti e due questi comandi rapidi sono nati con [Shortcuts Playground](https://github.com/viticci/shortcuts-playground-plugin), il plugin di Federico Viticci che genera comandi rapidi per iOS a partire dal linguaggio naturale. È uno strumento ottimo e lo ringrazio per averlo pubblicato: senza quel plugin, per metterli insieme ci avrei messo molto di più.

---

## Una nota per chi usa Android

Comandi Rapidi è un'app di Apple, quindi i due comandi rapidi qui sopra funzionano solo su iPhone. Il contatore degli avvicinamenti, invece, funziona su entrambe le piattaforme: la sostituzione avviene dentro il chip, a cui non interessa quale telefono stia leggendo il tag. Su Android i contenuti di tipo URL, email e SMS si comportano esattamente come su iOS; se vuoi automazioni simili, app come Tasker o MacroDroid prendono un indirizzo con `?nfc=...` e ne estraggono i valori con le loro azioni sulle stringhe. Il formato dei dati resta identico.

---

## Come provarlo

Se ti interessa la spiegazione dettagliata di come funziona davvero il contatore degli avvicinamenti, è nel [post precedente](/blog/count-nfc-tag-scans/). E se vuoi vedere all'opera un tag con il contatore attivo prima ancora di costruire un'automazione, la nostra [demo dal vivo del contatore](/tap-counter/) legge il valore `?nfc=` direttamente dal proprio indirizzo: scrivi un tag che punti lì, avvicinalo al telefono e guarda comparire il conteggio e l'ID del tag.

Il contatore degli avvicinamenti fa parte di NFC.cool Tools, su [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ios-shortcuts-nfc-tap-counter-it&mt=8) e su [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ios-shortcuts-nfc-tap-counter-it). Per l'elenco completo degli strumenti che ho costruito intorno all'NFC, dai un'occhiata alla [pagina del lettore e scrittore NFC](/features/nfc-reader-writer/).
