---
id: nfc-blog-009
title: "I tag NFC spiegati: la guida completa per chi inizia"
date: 2026-02-23
tags: ["nfc-tags", "guides", "automation"]
summary: "I tag NFC sono chip minuscoli e senza batteria che avviano azioni sul telefono con un semplice avvicinamento. Ecco tutto quello che serve sapere: che cosa sono, come funzionano, quali comprare e più di 15 modi concreti per usarli."
image: "/assets/images/Blog/nfc-tags-beginners-guide.webp"
imageAlt: "Un telefono e diversi tag NFC con le icone dei primi flussi di lavoro"
metaTitle: "I tag NFC spiegati: la guida completa per chi inizia (2026)"
metaDescription: "Che cosa sono i tag NFC, come funzionano, i vari tipi (NTAG213, 215, 216) e più di 15 usi concreti, dalla casa intelligente ai biglietti da visita digitali."
ogTitle: "I tag NFC spiegati: la guida completa per chi inizia"
ogDescription: "Tutto quello che serve sapere sui tag NFC nel 2026: i tipi, come funzionano, cosa comprare e gli usi concreti a casa, al lavoro e non solo."
---
Ti sarà capitato di avvicinare il telefono a un lettore per pagare il caffè, di passare una tessera dei trasporti o di aprire la porta di una camera d'albergo. Dietro ognuna di queste cose c'è l'NFC.

Sviluppo NFC.cool da anni, un'app per leggere e scrivere tag NFC, e la cosa che vorrei sapesse più gente è questa: l'NFC non serve solo per i pagamenti e per le chiavi elettroniche. Un minuscolo **tag NFC**, un chip che costa pochi centesimi e non ha mai bisogno di una batteria, può automatizzare la casa, passare i tuoi contatti con un semplice avvicinamento e collegare il mondo fisico ad azioni digitali.

Questa è la guida che darei a chiunque parta da zero. Ti racconto che cosa sono i tag NFC, come funzionano davvero, quali comprerei io e gli usi che ho visto ripagare sul serio.

---

## Che cos'è l'NFC?

**NFC** sta per **Near Field Communication**, comunicazione di prossimità. È una tecnologia wireless a corto raggio che permette a due dispositivi di scambiarsi dati quando si trovano a pochi centimetri l'uno dall'altro.

Lavora a **13,56 MHz** e arriva fino a circa **4 cm**. All'inizio quella distanza così ridotta spiazza, ma è voluta: è una misura di sicurezza. A differenza del Bluetooth o del Wi-Fi, non puoi collegarti per sbaglio a qualcosa dall'altra parte della stanza.

Tutti gli smartphone recenti hanno un chip NFC al loro interno. Gli iPhone leggono l'NFC dall'iPhone 7 del 2016, i telefoni Android da ancora prima. Avvicina il telefono a un tag e sarà il telefono ad alimentarlo e a leggerlo: l'intero scambio si esaurisce in una frazione di secondo.

---

## Che cos'è un tag NFC?

Un tag NFC è un piccolo chip passivo inserito in un adesivo, in una tessera, in un portachiavi o praticamente in qualunque altra forma. La parola che conta è "passivo": **un tag NFC non ha batteria**. A dargli energia è solo il campo del dispositivo che lo legge.

Ed è questo che rende i tag così comodi da avere intorno:
- **Praticamente indistruttibili**: nessuna batteria che si scarica, niente che si consuma
- **Economici**: pochi centesimi l'uno se li prendi in quantità
- **Minuscoli**: più piccoli di una moneta, più sottili di una carta di credito
- **Longevi**: un tag decente supera i dieci anni

Ogni tag ha a disposizione una piccola quantità di memoria. Ci puoi mettere un URL, i dati di un contatto, le credenziali del Wi-Fi, del testo semplice oppure istruzioni che dicono al telefono che lo legge come comportarsi.

### Che differenza c'è tra NFC e RFID?

In realtà l'NFC è un sottoinsieme dell'RFID (Radio-Frequency Identification). Io la differenza la spiego così:

| | NFC | RFID |
|---|---|---|
| **Frequenza** | Solo 13,56 MHz | Da 125 KHz a 960 MHz |
| **Portata** | Fino a ~4 cm | Fino a diversi metri |
| **Comunicazione** | Bidirezionale | Di solito unidirezionale |
| **Standardizzazione** | ISO 14443 / ISO 18092 | Standard multipli |
| **Uso di consumo** | Alto (telefoni, pagamenti) | Soprattutto industriale |

Tutto l'NFC è RFID, ma non tutto l'RFID è NFC. Il badge che passi per entrare in ufficio spesso lavora a 125 KHz, e quella frequenza il telefono proprio non la legge. I tag NFC usano invece i 13,56 MHz che i telefoni supportano. "Perché il telefono non legge il badge del lavoro?" è una delle domande che ricevo più spesso, e la risposta è quasi sempre questa. (Se è il dubbio in cui ti sei impantanato, ci ho dedicato un articolo intero: [perché l'iPhone non apre una porta RFID](/blog/iphone-rfid-condo-doors/).)

---

## Tipi di tag NFC: quale conviene comprare?

I tag NFC si dividono in tipi definiti dall'**NFC Forum**, l'ente che stabilisce gli standard del settore. Quelli in cui ti capiterà davvero di imbatterti sono costruiti su chip di **NXP Semiconductors**, la serie NTAG.

### La famiglia NTAG

Sono di gran lunga i tag NFC più diffusi tra i consumatori:

#### NTAG213
- **Memoria:** 144 byte (di cui circa 132 utilizzabili)
- **Ideale per:** URL, schede contatto, automazioni semplici
- **Prezzo:** l'opzione più economica (~0,15-0,30 $ a tag)
- **Capacità URL:** ~130 caratteri

Il tuttofare. Per un singolo URL o un testo breve l'NTAG213 basta e avanza: è quello che usano quasi tutti i biglietti da visita NFC e i tag promozionali.

#### NTAG215
- **Memoria:** 504 byte (di cui circa 488 utilizzabili)
- **Ideale per:** URL più lunghi, vCard con molti campi, credenziali Wi-Fi
- **Prezzo:** ~0,20-0,40 $ a tag
- **Capacità URL:** ~480 caratteri

Una solida via di mezzo: spazio a sufficienza per URL lunghi e vCard con più campi, e un prezzo che ne giustifica l'acquisto in quantità. È anche il chip che sta dentro le figure Amiibo di Nintendo, ed è per questo che gli NTAG215 scrivibili si trovano ovunque.

#### NTAG216
- **Memoria:** 888 byte (di cui circa 868 utilizzabili)
- **Ideale per:** vCard complete, più record insieme, testi lunghi
- **Prezzo:** ~0,30-0,60 $ a tag
- **Capacità URL:** ~850 caratteri

È quello con più memoria di tutta la linea NTAG di consumo, e se ne devi comprare uno solo è quello che sceglierei. Con tutto quello spazio in più non rischi di sbattere contro un muro: vCard complete, più record, testi lunghi, margine per le modifiche future. Ed è anche il tag su cui NFC.cool fa i suoi test.

### Altri tipi di tag che potresti incontrare

- **NTAG424 DNA**: un chip avanzato con autenticazione crittografica. Lo trovi nell'anticontraffazione, nella verifica dei beni di lusso e nelle nuove regole sul passaporto digitale di prodotto dell'UE. Sproporzionato per l'uso personale, davvero importante in ambito commerciale.
- **MIFARE Classic**: un chip NXP più datato, usato nelle tessere di accesso e nei sistemi di trasporto. Non è un tag NFC Forum standard, quindi la compatibilità con i telefoni è un terno al lotto. Per i progetti personali lo eviterei.
- **ST25T**: la linea di tag NFC di STMicroelectronics. Come funzioni assomiglia agli NTAG, ma nei prodotti di consumo si vede molto meno.
- **ICODE**: pensati per il tracciamento in biblioteche e logistica. Difficilmente ti capiteranno tra le mani.

### Guida rapida all'acquisto

| Caso d'uso | Tag consigliato | Perché |
|---|---|---|
| URL di un sito | NTAG213 | Pochi dati, il più economico |
| Biglietto da visita digitale | NTAG213 o NTAG215 | Il link occupa ~100 caratteri |
| Condivisione del Wi-Fi | NTAG215 | Le credenziali possono essere lunghe |
| vCard completa salvata sul tag | NTAG216 | Serve più memoria |
| Comando per la casa intelligente | NTAG213 | Basta un ID univoco |
| Anticontraffazione | NTAG424 DNA | Verifica crittografica |

**Dove comprarli:** nella mia pagina dei [tag NFC consigliati](/affiliate-links/) trovi gli adesivi NTAG216 che uso e su cui faccio le prove. I tag in formato adesivo sono i più versatili: si attaccano quasi ovunque.

Il mio consiglio sincero: compra una confezione di adesivi NTAG216 e smetti di rimuginarci. Ho visto persone tormentarsi sulla scelta del chip per un progetto che un tag da venti centesimi risolve benissimo. Se poi ti serve l'analisi approfondita, li ho passati in rassegna uno per uno in [tipi di tag NFC per iPhone](/blog/nfc-tag-types-for-iphones/).

---

## Come funzionano i tag NFC (la versione semplice)

Tutti se lo immaginano complicato. Non lo è. Ecco l'intero procedimento, dall'inizio alla fine:

1. **Trasferimento di energia.** L'antenna NFC del telefono genera un campo elettromagnetico. Quando un tag entra in quel campo (a circa 4 cm), il campo induce una corrente minima nella bobina dell'antenna del tag, e quella corrente alimenta il chip.

2. **Scambio di dati.** Una volta alimentato, il chip rimanda al telefono i dati che ha in memoria sotto forma di onde radio modulate a 13,56 MHz. Lo scambio dura circa 100 millisecondi.

3. **Azione.** Il telefono legge i dati e decide che cosa farne. Un URL si apre nel browser. Un numero di telefono propone di chiamare. Un record Wi-Fi propone di collegarsi alla rete. Un record legato a un'applicazione specifica apre l'app corrispondente.

Nessun abbinamento. Nessun PIN. Nessuna app necessaria per la lettura di base. Avvicini e via.

### NDEF: la lingua che parlano i tag

I dati su un tag NFC sono strutturati secondo l'**NDEF** (NFC Data Exchange Format). Io lo considero la lingua comune che permette a qualsiasi telefono NFC di capire qualsiasi tag NFC.

I tipi di record NDEF più comuni:
- **URI**: un link web (http, https, tel:, mailto:)
- **Text**: testo semplice in qualsiasi lingua
- **Smart Poster**: URL, titolo e icona insieme
- **Wi-Fi**: nome della rete, password e tipo di sicurezza
- **vCard**: i dati di un contatto
- **MIME**: qualsiasi tipo di dato personalizzato, usato dalle app per azioni su misura

Quando scrivi un tag da un'app come NFC.cool Tools, stai creando dei record NDEF. Quando un telefono legge quel tag, li interpreta e agisce di conseguenza. Il modello è tutto qui, e da quando l'ho afferrato tutto il resto dell'NFC ha iniziato ad avere senso.

---

## Leggere i tag NFC

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/nfc-tags-beginners-guide/1-read-nfc-440w.webp" alt="La scheda NFC di NFC.cool Tools con i pulsanti Read NFC e Write NFC"><p><strong>Leggere con un'app.</strong> Tocca Read NFC e avvicina il tag alla parte alta dell'iPhone.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-tags-beginners-guide/2-record-440w.webp" alt="Un tag letto in NFC.cool Tools: un record biglietto da visita di Anna Miller, con la vCard grezza sotto"><p><strong>Vedere tutto quello che contiene.</strong> Ogni record del tag, non solo il link che mostrerebbe iOS.</p></li>
</ol>
</figure>

### Su iPhone

Gli iPhone gestiscono i tag da soli. Su **iPhone XS e modelli successivi** (e sull'iPhone SE di terza generazione) la lettura NFC funziona in background: avvicini il bordo superiore del telefono a un tag e la lettura parte all'istante, senza aprire nulla. Gli iPhone più vecchi (7, 8, X) chiedono di aprire prima un'app che legge l'NFC.

Che cosa succede dopo la scansione dipende dai dati:
- **URL**: compare una notifica, toccala per aprirlo in Safari
- **Numero di telefono**: ti viene proposto di chiamare
- **App Clip**: se ne esiste una, si avvia
- **Dati personalizzati**: si apre l'app associata

Se ti serve solo vedere subito che cosa c'è su un tag, su Android puoi anche [leggere i tag NFC direttamente dal browser](/online-nfc-reader/), senza installare nulla.

### Su Android

Quasi tutti i telefoni Android hanno l'NFC dal 2012 circa. La lettura è attiva per impostazione predefinita e l'interruttore si trova in Impostazioni, Dispositivi connessi, NFC. Avvicina un tag e Android passa i dati all'app più adatta: gli URL al browser, i contatti alla rubrica, i record personalizzati all'app a cui appartengono.

---

## Scrivere i tag NFC

Questa è la parte che trovo davvero divertente. Scrivere un tag vuol dire programmarlo con i dati che decidi tu.

### Che cosa serve

1. Un telefono con NFC
2. Un'app per scrivere i tag NFC (per esempio **NFC.cool Tools**, disponibile per [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-tags-beginners-guide-it&mt=8) e [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-tags-beginners-guide-it))
3. Un tag NFC vuoto o riscrivibile

### Come si scrive un tag

Il procedimento è breve:
1. Apri l'app per scrivere i tag
2. Scegli che cosa scrivere (URL, testo, credenziali Wi-Fi, contatto e così via)
3. Inserisci i dati
4. Tieni il telefono appoggiato al tag
5. Aspetta la conferma, di solito circa un secondo

Fatto. Ora il tag contiene i tuoi dati e funziona con qualsiasi telefono NFC che lo legga. Se ti serve la procedura specifica per iPhone, ne ho scritta una qui: [come scrivere i tag NFC da iPhone](/blog/write-nfc-tags-iphone/).

### Importante: bloccare i tag

Una volta scritto, un tag si può anche **bloccare**. Il blocco lo rende definitivamente di sola lettura: nessuno potrà più sovrascriverlo o cancellarlo. E non si torna indietro.

Per me il blocco è un passo consapevole e finale, mai qualcosa da liquidare con un tocco veloce. Blocca un tag quando:
- È accessibile al pubblico (su un manifesto, un prodotto o un biglietto da visita)
- Vuoi evitare che qualcuno lo manometta
- I dati non cambieranno più

Lascialo sbloccato quando:
- Potresti aggiornare i dati in seguito
- Stai ancora sperimentando
- Vive in un ambiente controllato, per esempio casa tua

---

## 16 modi concreti per usare i tag NFC

Potrei elencarne cento. Questi sono quelli a cui torno sempre, gli usi che ho visto attecchire davvero.

### In casa

**1. Condividere il Wi-Fi con gli ospiti**
Attacca un tag vicino alla porta d'ingresso o nella stanza degli ospiti e programmalo con le credenziali del Wi-Fi. Gli ospiti ci avvicinano il telefono e si collegano all'istante, senza digitare una password lunghissima.

**2. Scene per la casa intelligente**
Distribuisci qualche tag per casa e usali per avviare le automazioni. Quello sul comodino fa scattare la "buonanotte": luci spente, sveglia impostata, Non disturbare attivo. Quello vicino alla porta fa partire "esco di casa": luci spente, termostato giù, robot aspirapolvere in funzione.

**3. Sveglia**
Metti un tag in cucina o in bagno e crea un comando rapido che spegne la sveglia solo quando scansioni fisicamente quel tag. Funziona: ti costringe ad alzarti dal letto.

**4. Libretti degli elettrodomestici**
Attacca un tag sulla lavatrice o sulla lavastoviglie e puntalo al PDF delle istruzioni. Non cercherai mai più un manuale.

**5. Promemoria per i farmaci**
Applica un tag su una confezione di medicinali. Scansionarlo registra data e ora in una nota o in un foglio di calcolo, così hai sempre traccia di quando hai preso l'ultima dose.

### Al lavoro

**6. Biglietti da visita digitali**
L'uso dell'NFC più diffuso in ambito professionale. Al posto del cartoncino, un biglietto da visita NFC passa i tuoi dati con un solo avvicinamento. Con [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-nfc-tags-beginners-guide-it&mt=8) crei un biglietto digitale curato e ne scrivi l'indirizzo su un qualsiasi tag NFC di terze parti: chi ha un iPhone vede un'App Clip nativa, chi ha Android apre una pagina sul dominio nfc.cool, e in entrambi i casi salva il tuo contatto con un tocco.

**7. Ingresso nelle sale riunioni**
Metti un tag fuori dalle sale riunioni. Avvicinare il telefono apre il calendario o registra la presenza, ed è più semplice di qualsiasi sistema di prenotazione.

**8. Registro delle attrezzature condivise**
Applica dei tag agli strumenti e ai dispositivi condivisi. La scansione registra chi li ha presi e quando.

**9. Accesso rapido ai documenti condivisi**
Attacca un tag su una lavagna o nell'area di un progetto, puntandolo alla cartella condivisa, alla pagina di Notion o alla bacheca delle attività.

### Fuori casa

**10. Bluetooth e navigatore in auto**
Metti un tag sul supporto del telefono in auto. Un avvicinamento collega il Bluetooth, apre il navigatore e fa partire la playlist da viaggio.

**11. Identificazione dei bagagli**
Infila in valigia un tag NFC bloccato con i tuoi recapiti. Se il bagaglio viene ritrovato, chiunque abbia un telefono può risalire al proprietario.

**12. Medaglietta per animali**
Attacca al collare del tuo animale un tag con i tuoi recapiti e le sue informazioni sanitarie: dura più a lungo di una medaglietta incisa e porta con sé molte più informazioni.

**13. Avvio dell'allenamento in palestra**
Un tag sulla borsa da palestra o sull'armadietto che apre l'app degli allenamenti già con la scheda di oggi.

### Usi creativi

**14. Ordinazioni al tavolo nei ristoranti**
Se hai un ristorante, inserisci dei tag nei tavoli. I clienti avvicinano il telefono per vedere il menù, ordinare o pagare. Tanti locali hanno iniziato durante il COVID e non sono più tornati indietro.

**15. Arte e mostre interattive**
Musei e gallerie mettono un tag accanto alle opere: i visitatori avvicinano il telefono e ottengono audioguide, note dell'artista o esperienze in realtà aumentata.

**16. Cacce al tesoro e giochi**
Nascondi dei tag in giro per un luogo, ognuno con un indizio o un enigma. Ottimi per il team building, per le feste dei bambini o per giochi in stile escape room.

---

## I tag NFC e i Comandi Rapidi di iOS

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/nfc-tags-beginners-guide/run-shortcut-440w.webp" alt="Le impostazioni NFC di NFC.cool Tools con Read with tag details, Open Web Link when read, Run Shortcut when read e Play audio file when read attivi"><p><strong>Avviare un comando alla lettura.</strong> NFC.cool può aprire un link, avviare un comando rapido o riprodurre un suono appena legge un tag.</p></li>
</ol>
</figure>

È la cosa che mi diverte di più mostrare alle persone. L'app **Comandi Rapidi** di Apple, già presente in iOS, supporta l'NFC come innesco nativo, ed è lì che su iPhone i tag passano da utili a davvero potenti.

Ecco come se ne crea uno:
1. Apri l'app Comandi Rapidi
2. Vai alla scheda **Automazione**
3. Tocca **Nuova automazione**, poi **NFC**
4. Scansiona il tag che vuoi usare come innesco
5. Costruisci l'automazione che preferisci

La parte furba è che sul tag non serve nemmeno scrivere dei dati. Comandi Rapidi riconosce il tag dal suo ID hardware univoco, quindi anche un tag completamente vuoto può avviare qualcosa di complesso:

- Attivare una Full Immersion e un timer quando avvicini il telefono al tag sulla scrivania
- Registrare l'ora di arrivo in un foglio di calcolo quando avvicini il telefono al tag dell'ufficio
- Mandare al partner un messaggio "sto tornando" quando avvicini il telefono al tag in auto
- Accendere o spegnere determinati dispositivi della casa intelligente

Su Android ci sono app come **Tasker** e **MacroDroid** che fanno lo stesso tipo di automazioni innescate dall'NFC.

---

## Domande frequenti

### I tag NFC hanno bisogno di una batteria?
No. I tag NFC sono completamente passivi: prendono energia dal campo del dispositivo che li legge. Non si scaricano mai e possono durare un decennio o più.

### I tag NFC si possono violare?
I tag standard non hanno alcuna crittografia, quindi chiunque abbia un telefono NFC può leggere un tag sbloccato e senza protezioni. Per la maggior parte degli usi, come condividere un URL o avviare un comando rapido, non lo considero un problema. Per gli impieghi delicati conviene un tag con funzioni crittografiche (come l'NTAG424 DNA), oppure fare in modo che il tag avvii soltanto un'azione che richiede un'ulteriore autenticazione.

### Quanto devo avvicinare il telefono?
Entro circa 1-4 cm. Sugli iPhone l'antenna NFC si trova nella parte alta del telefono, mentre su quasi tutti gli Android sta al centro in alto sul retro. Bastano un paio di prove per trovare il punto giusto.

### I tag NFC si possono riscrivere?
Sì, a patto che non siano stati bloccati. Quasi tutti reggono circa 100.000 cicli di scrittura, quindi puoi riprogrammarli quanto vuoi. Una volta bloccato, però, un tag resta di sola lettura per sempre.

### Quanti dati può contenere un tag NFC?
Dipende dal chip: l'NTAG213 arriva a ~144 byte, l'NTAG215 a ~504 byte, l'NTAG216 a ~888 byte. Un URL tipico ne occupa dai 30 agli 80. Non è tanto: i tag danno il meglio con dati brevi o come rimando a contenuti online.

### I tag NFC funzionano attraverso le custodie?
Sì. L'NFC attraversa quasi tutte le custodie, gli adesivi e i materiali sottili. Le custodie molto spesse o metalliche possono ridurre la portata. Se devi attaccare un tag sul metallo, prendine uno pensato per le superfici metalliche: ha uno strato schermante in ferrite.

### Che differenza c'è tra tag NFC e tessere NFC?
In sostanza nessuna. Una tessera NFC è semplicemente un tag NFC in un corpo a forma di scheda: chip e antenna sono la stessa tecnologia. Le tessere montano di solito un NTAG213 o un NTAG215 e vanno per la maggiore come biglietti da visita, badge di accesso e carte fedeltà.

---

## Come iniziare: il tuo primo progetto NFC

Vuoi provare? Ecco un progetto da cinque minuti con cui farei partire chiunque:

**Progetto: un tag per condividere il Wi-Fi di casa**

1. **Compra i tag:** prendi una confezione di [adesivi NTAG216](/affiliate-links/) (circa 10 $ per 25 pezzi)
2. **Scarica NFC.cool Tools:** per [iOS](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-tags-beginners-guide-it&mt=8) o [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-tags-beginners-guide-it)
3. **Scrivi le credenziali del Wi-Fi:** apri l'app, scegli Scrivi e poi Wi-Fi, inserisci il nome della rete e la password e tieni il telefono appoggiato al tag
4. **Posiziona il tag:** in un punto visibile, vicino alla porta d'ingresso, sul frigorifero o nella stanza degli ospiti
5. **Provalo:** avvicina un altro telefono e dovrebbe comparire la proposta di collegarsi alla rete

Costo totale: circa 0,30 $ e due minuti. Ogni ospite che passa da te ti ringrazierà.

---

## Per concludere

I tag NFC sono una di quelle tecnologie che sembrano complicatissime e poi si rivelano di una semplicità disarmante. Niente batterie, niente abbinamenti, nessuna app per la lettura di base. Con pochi centesimi ti porti a casa un chip programmabile che dura anni e funziona con miliardi di telefoni.

Ho costruito il mio lavoro intorno a questi chip minuscoli e continuo a trovarci usi nuovi. Che tu voglia automatizzare la mattina, passare i tuoi recapiti o inventare qualcosa per divertimento, un tag è il ponte tra l'avvicinare un telefono e far succedere qualcosa nel mondo reale.

**Pronto a programmare i tuoi primi tag NFC?** Scarica [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-tags-beginners-guide-it&mt=8) per iPhone o [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-tags-beginners-guide-it): è il modo più semplice che conosco per leggere, scrivere e gestire i tag NFC.

**Vuoi un biglietto da visita digitale basato sull'NFC?** Dai un'occhiata a [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-nfc-tags-beginners-guide-it&mt=8): condividi i tuoi recapiti con un semplice avvicinamento. L'interfaccia dell'app e l'App Clip sono disponibili in 35 lingue.
