---
id: "ultimate-nfc-tag-guide-2026-09"
title: "La guida definitiva ai tag NFC: ogni chip, a cosa serve e cosa lo legge"
date: "2026-10-26"
tags: ["nfc-tags", "guides"]
summary: "Tutti i chip NFC che puoi comprare, dall'NTAG210 da 48 byte al DESFire EV3, con i numeri veri: memoria, protezione, durata, cosa ci fanno un iPhone e un telefono Android e per quale lavoro è davvero pensato ciascuno."
image: "/assets/images/Blog/ultimate-nfc-tag-guide.webp"
imageAlt: "Un iPhone con un'icona NFC luminosa dietro una fila di formati di tag NFC: un adesivo, un gettone, una tessera in PVC, un portachiavi, un braccialetto e un inlay trasparente"
author: "Nicolo Stanciu"
metaTitle: "La guida definitiva ai tag NFC: ogni chip spiegato"
metaDescription: "Tutti i chip NFC in un unico posto: NTAG, MIFARE, DESFire, ICODE, ST25, FeliCa, Topaz e i cloni. Memoria, sicurezza, durata, cosa li legge e quale tag per quale lavoro."
ogTitle: "Ogni chip NFC, una sola guida"
ogDescription: "Memoria, sicurezza, durata, supporto sui telefoni e il vero lavoro di ogni chip NFC in commercio. Tabelle tecniche, una tabella per scegliere e un catalogo completo."
---

Apri l'annuncio di una confezione di tag NFC. C'è scritto "NFC 213", oppure "compatibile NTAG215", o soltanto "tessera NFC 1K, funziona con tutti i telefoni". Tu vuoi sapere una cosa sola: farà quello che ho in mente? E l'annuncio non te lo sa dire, perché non lo sa nemmeno chi l'ha scritto.

Da anni sviluppo [NFC.cool Tools](/features/nfc-reader-writer/), un'app che a ogni avvicinamento deve prima di tutto rispondere proprio a questa domanda: che chip è, e che cosa sa fare? Il solo codice di identificazione riconosce una sessantina di prodotti di sette produttori, e ognuno è finito in quella lista perché qualcuno l'ha avvicinato a un telefono e qualcosa non si è comportato come prometteva l'annuncio. Questa è la guida di riferimento che avrei voluto avere mentre scrivevo quel codice. È lunga di proposito. Se ti basta la versione breve, parti dalla [guida ai tag NFC per chi inizia](/blog/nfc-tags-beginners-guide/), che rimanda qui per gli approfondimenti.

Il succo in una frase, così ce l'hai prima delle tabelle: **non esiste il tag NFC migliore, esiste solo il chip giusto per il lavoro**, e il lavoro dipende da tre cose: quanto devi memorizzare, chi devi tenere fuori e che cosa deve poterlo leggere.

---

## Come usare questa guida

Ogni numero di questa guida viene dal datasheet di un produttore, da un documento di Apple o di Google oppure dal codice della mia app, e le [fonti](#fonti-e-approfondimenti) sono elencate in fondo. Quando un chip l'ho avuto sulla scrivania, lo dico in una nota sul campo. Quando non l'ho avuto, dico anche questo: i componenti più esotici vengono dai datasheet, e un datasheet è una promessa, non una misura.

Due cose che qui non trovi: una spiegazione passo passo per scrivere il primo tag (per quella c'è la [guida alla scrittura](/blog/write-nfc-tags-iphone/)) e la storia completa dell'NTAG 424 DNA, che ha [un articolo tutto suo](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/).

- [Com'è fatto fisicamente un tag NFC](#comè-fatto-fisicamente-un-tag-nfc)
- [La giungla delle sigle: standard, tipi del Forum e cosa non è NFC](#la-giungla-delle-sigle-standard-tipi-del-forum-e-cosa-non-è-nfc)
- [Come leggere un datasheet o un annuncio](#come-leggere-un-datasheet-o-un-annuncio)
- [NDEF e quanto ci sta davvero su un tag](#ndef-e-quanto-ci-sta-davvero-su-un-tag)
- [Mappe di memoria: cosa c'è e dove sul chip](#mappe-di-memoria-cosa-cè-e-dove-sul-chip)
- [La tabella per scegliere](#la-tabella-per-scegliere)
- [Famiglia per famiglia](#famiglia-per-famiglia)
- [Formati e distanza di lettura](#formati-e-distanza-di-lettura)
- [Chi legge cosa](#chi-legge-cosa)
- [Cosa fa NFC.cool Tools con ogni chip](#cosa-fa-nfccool-tools-con-ogni-chip)
- [Comprare senza farsi fregare](#comprare-senza-farsi-fregare)
- [L'intero catalogo in una tabella](#lintero-catalogo-in-una-tabella)
- [I confronti più cercati](#i-confronti-più-cercati)
- [Domande frequenti](#domande-frequenti)
- [Glossario](#glossario)
- [Fonti e approfondimenti](#fonti-e-approfondimenti)

---

## Com'è fatto fisicamente un tag NFC

Un tag NFC è fatto di tre cose incollate insieme: un **chip** grande come un granello di sabbia, un'**antenna** fatta di qualche spira di alluminio o rame inciso e un **supporto** che li tiene insieme, che può essere un adesivo di carta, un inlay in PET, una tessera in PVC o una capsula di vetro. Il chip non ha batteria. Lo alimenta il telefono.

Il principio è l'accoppiamento induttivo. L'antenna del telefono è una bobina che genera un campo magnetico alternato a 13,56 milioni di cicli al secondo. Se porti una seconda bobina dentro quel campo, ci si induce una corrente, come succede con un caricatore wireless, solo con una minima frazione della potenza. Il chip del tag vive di quella corrente indotta. Per rimandare i dati non trasmette niente di suo: inserisce e disinserisce un carico sulla propria antenna, e la bobina del telefono lo percepisce come una minuscola variazione del proprio campo. Il trucco si chiama **modulazione di carico**, ed è il motivo per cui tutto il lavoro lo fa il telefono e il tag può costare otto centesimi.

È anche il motivo per cui la portata è quella che è. Il campo di una bobina piccola cala con il cubo della distanza, quindi un tag che si legge benissimo a un centimetro a dieci non riceve niente. Io me lo immagino come una candela: se ci stai vicino ci leggi, ma dall'altra parte della stanza puoi strizzare gli occhi quanto vuoi. La definizione dell'NFC Forum parla di "una portata tipica fino a 2 cm", la documentazione di Android di "4 cm o meno" e i datasheet di NXP di "fino a 100 mm a seconda dell'intensità del campo e della geometria dell'antenna". Hanno ragione tutti e tre. Il valore del telefono è quello che vedrai tu; i 100 mm sono quello che il chip riesce a fare con un lettore grande e un'antenna grande.

Le velocità di trasferimento sono modeste perché di più non serve. Un tag di Type A o Type B parla a 106 kbit/s, e i chip più veloci negoziano 212, 424 o 848 kbit/s dopo l'handshake iniziale. FeliCa va a 212 o 424. ISO 15693, la famiglia a lungo raggio, è ancora più lenta, con 26,48 kbit/s nella modalità normale, perché è stata progettata per essere letta da un varco di magazzino a un metro di distanza, non da un telefono. Il dump completo degli 888 byte di un NTAG216 richiede comunque una frazione di secondo.

| Standard | Velocità di base | Modalità più veloci | Canale di ritorno |
| --- | --- | --- | --- |
| ISO/IEC 14443 Type A e B | 106 kbit/s | 212, 424, 848 kbit/s sui chip che le negoziano (DESFire, Plus, NTAG 424 DNA) | modulazione di carico su una sottoportante a 847,5 kHz |
| FeliCa (JIS X 6319-4, ISO/IEC 18092) | 212 kbit/s | 424 kbit/s | modulazione di carico |
| ISO/IEC 15693 | 26,48 kbit/s (6,62 kbit/s a bassa velocità) | modalità veloce NXP 53 kbit/s; ICODE 3 fino a 212 kbit/s | modulazione di carico su una sottoportante a 423,75 kHz |

---

## La giungla delle sigle: standard, tipi del Forum e cosa non è NFC

Ogni annuncio mescola tre sistemi di nomi: gli standard ISO che definiscono la parte radio, i tipi di tag dell'NFC Forum che definiscono come sono organizzati i dati e i nomi commerciali dei produttori. Ecco la mappa.

### Gli standard

| Standard | Cosa definisce | Nome NFC Forum | Chip di esempio |
| --- | --- | --- | --- |
| ISO/IEC 14443 Type A (parti da 1 a 3) | tessere di prossimità, 106 kbit/s, modulazione Type A, anticollisione, l'UID | NFC-A | NTAG, MIFARE Ultralight, MIFARE Classic, Topaz |
| ISO/IEC 14443 Type B | lo stesso, con una modulazione diversa e senza un UID nello stesso senso | NFC-B | ST SRI512, tessere dei trasporti Calypso, molti passaporti elettronici |
| ISO/IEC 14443-4 | il protocollo di trasporto sopra A o B, chiamato ISO-DEP | ISO-DEP | DESFire, NTAG 424 DNA, MIFARE Plus in SL3, carte bancarie, passaporti |
| ISO/IEC 7816-4 | il linguaggio dei comandi (APDU) e il file system usati sopra ISO-DEP | | tutto quello della riga sopra |
| ISO/IEC 7816-6 | tra le altre cose, il registro dei codici dei produttori di chip | | il primo byte dell'UID |
| ISO/IEC 15693 | tessere di vicinanza, fino a un metro con il lettore giusto, UID da 8 byte | NFC-V | ICODE, ST25TV, ST25DV, TI Tag-it, NTAG 5 |
| JIS X 6319-4 | FeliCa di Sony | NFC-F | FeliCa Lite-S, Suica, Octopus |
| ISO/IEC 18092 | l'NFC vero e proprio (NFCIP-1): peer-to-peer e le modalità passive usate dai telefoni | | il tuo telefono |

### I tipi di tag dell'NFC Forum

L'NFC Forum non ha progettato chip. Ha scritto cinque ricette per memorizzare un messaggio **NDEF** (il formato contenitore che ogni telefono capisce) su chip che esistevano già. Ecco cosa vuol dire "tag Type 2": non un chip, ma un'organizzazione dei dati.

| Tipo del Forum | Radio | Modello di memoria | Chip tipici | Supporto sui telefoni |
| --- | --- | --- | --- | --- |
| Type 1 | NFC-A | blocchi da 8 byte, bloccabili una sola volta | Topaz di Innovision/Broadcom | si legge su entrambe le piattaforme; l'NFC Forum ha tolto il Type 1 dalla release 2021 delle specifiche |
| Type 2 | NFC-A | pagine da 4 byte, un capability container a pagina 3, blocchi TLV | NTAG21x, MIFARE Ultralight, ST25TN, Fudan FM11NT0x1, Infineon my-d move | iPhone e Android, compresa la lettura in background su iPhone |
| Type 3 | NFC-F | blocchi da 16 byte, codici di servizio | FeliCa Lite-S, FeliCa Standard | iPhone e Android (su Android il supporto NFC-F è obbligatorio) |
| Type 4 | ISO-DEP su NFC-A o NFC-B | file selezionati tramite APDU: un file CC e un file NDEF | NTAG 424 DNA, DESFire, ST25TA | iPhone e Android |
| Type 5 | NFC-V | blocchi da 4 byte, CC nel blocco 0 | ICODE SLIX e SLIX2, ST25TV, ST25DV, NTAG 5 | iPhone da iOS 13, Android tramite NfcV; aggiunto al Forum nel 2015 |

Due cose mancano da quell'elenco, e non per caso. **MIFARE Classic** non è affatto un tipo di tag del Forum; l'NDEF su Classic è una mappatura di NXP che Android supporta su alcuni telefoni e iOS su nessuno. E le ricette del Forum non dicono nulla sulla sicurezza. Un tag Type 2 può essere un semplice NTAG213 oppure un NTAG 224 DNA con autenticazione AES-128; un tag Type 4 può essere uno spoglio ST25TA02K oppure una carta bancaria. Il tipo ti dice come è memorizzato il messaggio NDEF, non chi può arrivarci.

### Cosa non è un tag NFC

Metà dei messaggi "perché il telefono non legge questo?" che ricevo riguarda cose che NFC non sono mai state. La bobina NFC di un telefono è sintonizzata su 13,56 MHz e parla i protocolli qui sopra. Tutto il resto per lui è invisibile, per quanto possa avere l'aspetto di un tag.

| Sembra un tag, ma | Frequenza | Cos'è in realtà | Un telefono lo legge? |
| --- | --- | --- | --- |
| un badge dell'ufficio o del parcheggio senza chip visibile | 125 kHz | RFID a bassa frequenza: ID di sola lettura EM4100, HID Prox, T5577 riscrivibili | no, e nessuna app può cambiare le cose |
| il microchip di un animale | 134,2 kHz | transponder FDX-B ISO 11784/11785 | no |
| un'etichetta antitaccheggio o logistica | da 860 a 960 MHz | RFID UHF RAIN, EPC Gen2 | no |
| la chiave di un hotel o una vecchia tessera dei trasporti | 13,56 MHz | MIFARE Classic o una tessera HF proprietaria | Android a volte, l'iPhone mostra solo l'UID |
| una carta bancaria | 13,56 MHz | una smart card EMV che parla ISO-DEP | tecnicamente sì; un'app può leggere l'elenco delle applicazioni della carta e i dati pubblici, ma Core NFC di Apple blocca la lettura delle carte di pagamento e nessun telefono può produrne una copia funzionante |
| un passaporto | 13,56 MHz | un documento elettronico ICAO 9303 | sì, con la zona a lettura ottica come chiave; [l'ho realizzato io](/blog/read-passport-nfc-chip/) |
| una chiave di sicurezza | 13,56 MHz | un autenticatore FIDO2 su ISO 7816 | sì per il browser, non come tag |

Quello che fa male è il badge a 125 kHz. Funziona con il lettore della porta, è una tessera di plastica con dentro una bobina, e con un telefono non parlerà mai. Ho scritto [perché un iPhone non può aprire la porta del condominio](/blog/iphone-rfid-condo-doors/) proprio perché la risposta sincera è una questione di hardware.

---

## Come leggere un datasheet o un annuncio

La prima pagina di un datasheet ha tutti i numeri che ti servono, e un buon annuncio li ricopia. Ecco cosa significa ciascuno e quali mentono.

### Memoria utente e memoria totale

Ogni chip ha più EEPROM di quanta tu ne possa usare. Un NTAG213 ha 180 byte in tutto e 144 sono tuoi; gli altri 36 contengono l'UID, i bit di blocco, il capability container e le pagine di configurazione. Un MIFARE Classic 1K ha 1024 byte, di cui 752 di dati, perché ogni settore perde un blocco per le chiavi. Gli annunci riportano il numero più alto. Quello che conta è la **memoria utente**, e nemmeno quella corrisponde a quanto entra in un messaggio NDEF, come vedremo nella prossima sezione.

### L'UID

L'identificativo univoco viene impresso in fabbrica e non si può modificare, tranne sui cloni costruiti apposta per modificarlo. Esistono tre lunghezze:

| Lunghezza dell'UID | Dove | Note |
| --- | --- | --- |
| 4 byte | vecchi MIFARE Classic, le tessere Classic economiche di oggi | NXP li chiama "identificativi non univoci" (NUID) perché i 4 byte sono finiti. In un UID da 4 byte non c'è il codice del produttore. Un primo byte 08 significa che il chip genera un ID casuale a ogni lettura |
| 7 byte | NTAG, Ultralight, DESFire, NTAG 424 DNA, Classic EV1 (opzionale); l'IDm da 8 byte di FeliCa è un parente | il primo byte è il codice del produttore |
| 8 byte | tutti i chip ISO 15693 | il primo byte è sempre E0, il secondo è il codice del produttore |

Il codice del produttore viene dal registro ISO/IEC 7816-6, ed è il controllo onesto più rapido che puoi fare su un annuncio. Se un tag "NXP originale" risponde 1D, l'ha fatto Fudan.

| Codice | Produttore |
| --- | --- |
| 01 | Motorola |
| 02 | STMicroelectronics |
| 03 | Hitachi |
| 04 | NXP Semiconductors |
| 05 | Infineon |
| 07 | Texas Instruments |
| 08 | Fujitsu |
| 16 | EM Microelectronic |
| 1A | Sony |
| 1D | Shanghai Fudan Microelectronics |
| 25 | Innovision (Topaz) |
| 2C | Impinj |
| 2E | Broadcom |

### ATQA, SAK e GET_VERSION: come un lettore distingue i chip

Quando un chip di Type A risponde a un telefono, invia due piccoli valori, l'**ATQA** e il **SAK**. I lettori, compresa la mia app, usano il SAK per smistare i chip in famiglie, perché i bit del SAK dicono se il chip parla ISO-DEP e a quale grande famiglia appartiene. La nota di identificazione di NXP dice in grassetto di non usare l'ATQA per niente, perché si sovrappone tra chip diversi e trae in inganno, e posso confermare che è così.

| SAK | Famiglia | ATQA tipico |
| --- | --- | --- |
| 00 | NTAG e MIFARE Ultralight, tutti | 00 44 |
| 08 | MIFARE Classic 1K, MIFARE Plus 2K o SE nel livello di sicurezza 1 | 00 04 (UID da 4 byte), 00 44 (7 byte) |
| 09 | MIFARE Classic Mini | |
| 18 | MIFARE Classic 4K, MIFARE Plus 4K nel livello 1 | 00 02 o 00 42 |
| 10, 11 | MIFARE Plus X nel livello 2 | |
| 20 | tutto ciò che parla ISO-DEP: DESFire, NTAG 424 DNA, Plus nel livello 3, carte bancarie, JCOP | 03 44 (DESFire, 424), 03 04 con ID casuale |

Visto che tutti gli NTAG e tutti gli Ultralight rispondono SAK 00, per distinguere un NTAG213 da un NTAG216 o da un Ultralight EV1 serve un comando in più: **GET_VERSION**. Restituisce otto byte, e il lavoro lo fanno tre di questi. Il byte 2 è il tipo di prodotto (03 Ultralight, 04 NTAG, 07 NTAG I2C, 01 DESFire, 02 Plus, 08 DESFire Light), il byte 4 è la generazione e il byte 6 codifica la dimensione della memoria. È così che NFC.cool sa cosa ha davanti, ed è anche la prima cosa che una console che legge gli Amiibo chiede a un tag.

| Chip | Risposta a GET_VERSION |
| --- | --- |
| NTAG213 | 00 04 04 02 01 00 0F 03 |
| NTAG215 | 00 04 04 02 01 00 11 03 |
| NTAG216 | 00 04 04 02 01 00 13 03 |
| NTAG210 | 00 04 04 01 01 00 0B 03 |
| NTAG212 | 00 04 04 01 01 00 0E 03 |
| Ultralight EV1 48 B | 00 04 03 01 01 00 0B 03 |
| Ultralight EV1 128 B | 00 04 03 01 01 00 0E 03 |
| Ultralight AES | 00 04 03 0x 04 00 0F 03 |
| NTAG 223 DNA | 00 04 04 02 04 00 0F 03 |
| NTAG 424 DNA (incapsulato in un APDU) | vendor 04, type 04, major 30, storage 11 |

Esistono chip senza GET_VERSION: l'Ultralight originale, l'Ultralight C e il vecchio NTAG203 non l'hanno mai avuto, e lo stesso vale per la maggior parte dei cloni. Già questa assenza è un'impronta digitale.

### Durata, conservazione dei dati, temperatura

Sono i tre numeri che gli annunci non riportano quasi mai e i datasheet riportano sempre.

- La **durata in scrittura** indica quante volte si può riscrivere un byte. 100.000 cicli sono il minimo per qualunque chip attuale; i chip dell'epoca Classic e l'Ultralight originale sono dichiarati per 10.000. DESFire EV3 e la famiglia ST25DV sono dichiarati per 1.000.000 come valore tipico.
- La **conservazione dei dati** indica per quanto tempo i byte sopravvivono senza alimentazione. 10 anni è il vecchio standard, 50 anni è quanto NXP dichiara per l'NTAG 424 DNA e la famiglia ICODE SLIX, e ST dichiara 200 anni per i chip Type 4 ST25TA. La conservazione è specificata a temperatura ambiente; il calore la accorcia.
- La **temperatura di esercizio** va da -25 a +70 °C per la maggior parte dei chip consumer di NXP, da -40 a +85 °C per i componenti ST ed EM e arriva fino a 105 °C per ICODE 3. Di solito il limite non è il chip, ma l'adesivo e il supporto.

### La scala della sicurezza

È la parte di un annuncio che mente di più. "Crittografato", "sicuro", "anticlonazione" finiscono stampati su tag la cui unica protezione è una password a 32 bit inviata in chiaro. Ecco la scala, dal gradino più basso al più alto, e ogni chip di questa guida sta su uno dei gradini.

| Gradino | Cos'è | Chip | Cosa impedisce |
| --- | --- | --- | --- |
| 0. Niente | chiunque può leggere e scrivere | Ultralight originale, NTAG203, TI Tag-it Standard, Topaz | niente |
| 1. Bit di blocco | bit irreversibili che rendono le pagine di sola lettura per sempre | tutti i chip Type 2 e Type 5 | la riscrittura; non impedisce la copia |
| 2. Password | una password a 32 bit più una conferma a 16 bit (PACK), con un limite facoltativo di tentativi falliti; sugli NTAG21x la password viaggia via radio senza crittografia | NTAG21x, Ultralight EV1, NTAG 223 DNA, famiglia ICODE SLIX (32 bit), ST25TV (32 o 64 bit), ST25TA (128 bit) | la riscrittura occasionale da parte di uno sconosciuto con un'app; non un attaccante determinato con uno sniffer |
| 3. CRYPTO1 | il cifrario a flusso a 48 bit di NXP degli anni Novanta | MIFARE Classic, MIFARE Plus nel livello 1 | niente dal 2008; consideralo un gradino 0 |
| 4. Triple DES | autenticazione reciproca con una chiave da 16 byte | Ultralight C, FeliCa Lite-S, DESFire D40 ed EV1 | la copia del contenuto senza la chiave |
| 5. AES-128 | autenticazione reciproca, messaggistica sicura | Ultralight AES, NTAG 224 DNA, DESFire da EV1 a EV3, DESFire Light, Plus nel livello 3, ICODE DNA, FeliCa Standard, EM4425 | lo stesso, con un cifrario ancora considerato affidabile |
| 6. AES più SUN | ogni lettura produce una nuova prova crittografica direttamente nell'URL | NTAG 424 DNA, NTAG 22x DNA, DESFire EV3 | la clonazione, perché una copia non può firmare la lettura successiva |
| 7. Circuito antimanomissione | un filo che segnala, in modo permanente, se è mai stato interrotto | NTAG 213 TT, NTAG 424 DNA TT, NTAG 22x DNA StatusDetect, ICODE 3 TT, ST25TV02KC-T | il riutilizzo di un sigillo |

Due funzioni stanno accanto alla scala, non sopra un gradino. Una **firma di originalità** è una firma digitale sull'UID, scritta dal produttore, che permette a un lettore di verificare che il chip venga da NXP o da ST. Non impedisce la copia, perché un clone può portarsi dietro una firma copiata, e lo dice la stessa NXP nella sua application note. E i **contatori** (un contatore di letture a 24 bit sugli NTAG213/215/216, tre contatori irreversibili sull'Ultralight EV1, un contatore di scritture a 16 bit sullo SLIX2) servono ai casi d'uso, non alla sicurezza, a meno che non vengano inseriti in un messaggio SUN.

---

## NDEF e quanto ci sta davvero su un tag

**NDEF** (NFC Data Exchange Format) è la busta. Un telefono non legge "un URL" da un tag; legge un messaggio NDEF che contiene un record URI, e la busta ha un peso. Conoscere quel peso è il modo per rispondere alla domanda "il mio link ci sta su un NTAG213?".

### Il record

Ogni record inizia con un byte di flag (inizio messaggio, fine messaggio, record breve e un type name format da tre bit), poi la lunghezza del tipo, la lunghezza del payload (un byte se il payload è sotto i 256 byte, altrimenti quattro), il tipo vero e proprio e il payload. Un record URL breve costa quindi 4 byte di intestazione prima del primo byte del link.

| Record | Tipo | Payload |
| --- | --- | --- |
| URL | well-known type `U` | un byte di prefisso più il resto dell'URL in UTF-8 |
| Testo | well-known type `T` | un byte di stato, un codice lingua (`en`), poi il testo |
| Smart Poster | well-known type `Sp` | un intero messaggio NDEF al suo interno: un URL più titoli facoltativi e un'azione |
| Contatto | MIME `text/vcard` | il testo della vCard così com'è |
| Wi-Fi | MIME `application/vnd.wfa.wsc` | attributi Wi-Fi Simple Configuration: SSID, tipo di autenticazione, chiave |
| App Android | external type `android.com:pkg` | il nome di un pacchetto; Android apre quell'app o la sua pagina sul Play Store |

Il byte di prefisso è l'unica trovata ingegnosa del record URI. Invece di scrivere per esteso `https://`, il primo byte del payload è il codice di un prefisso comune, e il telefono lo rimette al suo posto.

| Codice | Prefisso | Codice | Prefisso |
| --- | --- | --- | --- |
| 00 | nessuno | 12 | rtsp:// |
| 01 | http://www. | 13 | urn: |
| 02 | https://www. | 14 | pop: |
| 03 | http:// | 15 | sip: |
| 04 | https:// | 16 | sips: |
| 05 | tel: | 17 | tftp: |
| 06 | mailto: | 18 | btspp:// |
| 07 | ftp://anonymous:anonymous@ | 19 | btl2cap:// |
| 08 | ftp://ftp. | 1A | btgoep:// |
| 09 | ftps:// | 1B | tcpobex:// |
| 0A | sftp:// | 1C | irdaobex:// |
| 0B | smb:// | 1D | file:// |
| 0C | nfs:// | 1E | urn:epc:id: |
| 0D | ftp:// | 1F | urn:epc:tag: |
| 0E | dav:// | 20 | urn:epc:pat: |
| 0F | news: | 21 | urn:epc:raw: |
| 10 | telnet:// | 22 | urn:epc: |
| 11 | imap: | 23 | urn:nfc: |

Quindi `https://nfc.cool/` viene memorizzato come il byte 04 seguito da `nfc.cool/`: nove byte di payload per un URL di diciassette caratteri. Il datasheet dell'NTAG 5 di NXP riporta come esempio `D1 01 0C 55 01` seguito da `nxp.com/nfc`, che decodificato diventa `http://www.nxp.com/nfc`.

### La busta intorno al record

Su un tag Type 2 o Type 5 il messaggio sta dentro un TLV: un byte che dice "messaggio NDEF" (03), un byte di lunghezza (tre byte se il messaggio è lungo 255 byte o più), il messaggio e un byte terminatore (FE). Su un tag Type 4 il TLV non c'è; il file NDEF inizia con una lunghezza da due byte. E su un NTAG213 o NTAG212 appena uscito dalla fabbrica i primi cinque byte di memoria utente sono già occupati da un Lock Control TLV che NXP scrive prima della spedizione e che ogni scrittore conserva.

Ecco il calcolo per un singolo link `https://`, fatto a mano per il chip che comprano quasi tutti:

- memoria utente dell'NTAG213: 144 byte
- meno il Lock Control TLV di fabbrica: 139
- meno la cornice del TLV NDEF (03, lunghezza, FE): 136 byte per il messaggio
- meno l'intestazione del record (flag, lunghezza del tipo, lunghezza del payload, `U`): 132 byte di payload
- meno il byte di prefisso: **131 caratteri dopo `https://`**

### Cosa ci sta e dove

<div class="table-scroll">

| Tag | Area NDEF | Caratteri dell'URL dopo https:// | vCard minima (132 B: nome, telefono, email, URL) | vCard tipica (da 250 a 500 B) | Record Wi-Fi (da 67 a 88 B) |
| --- | --- | --- | --- | --- | --- |
| NTAG210, Ultralight EV1 48 B | 48 | 40 | no | no | no |
| NTAG212 | 128 | 115 | no | no | sì |
| Ultralight EV1 128 B | 128 | 120 | no | no | sì |
| NTAG213, stato di fabbrica | 144 | 131 | no, per 9 byte | no | sì |
| NTAG213, senza lock TLV | 144 | 136 | no, per 4 byte | no | sì |
| ST25TN01K | 160 | circa 147 | sì, a malapena | no | sì |
| NTAG215 | 496 dichiarati (504 utente) | 483 | sì | sì, quasi tutte | sì |
| NTAG216 | 872 dichiarati (888 utente) | 859 | sì | sì | sì |
| ICODE SLIX | 112 (CC compreso) | 100 | no | no | sì |
| ICODE SLIX2 | 316 | circa 300 | sì | di solito | sì |
| NTAG 424 DNA | file NDEF da 256 byte | 249 | sì | quelle piccole | sì |
| DESFire EV3 2K | file NDEF fino a 2048 byte | fino a 2038 | sì | sì | sì |

</div>

Due note a margine su cui inciampano in molti. Il capability container scritto da NXP sull'NTAG215 e sull'NTAG216 dichiara 496 e 872 byte, meno della memoria utente, quindi `getMaxSize()` di Android riporta il numero più piccolo, ed è giusto così. E una vCard con nome, telefono, email e URL pesa 132 byte prima della busta e 148 dopo, ed è per questo che su un NTAG213 non ci sta del tutto e i venditori di biglietti da visita scelgono di default l'NTAG215 o l'NTAG216. I valori arrotondati che ho usato nella guida per chi inizia (circa 130, 480 e 850 caratteri) sono questi stessi numeri, smussati.

---

## Mappe di memoria: cosa c'è e dove sul chip

Se ti è mai capitato di fare il dump di un tag in NFC.cool e di fissare l'esadecimale, questa è la chiave per decifrarlo.

### Type 2: la mappa delle pagine dell'NTAG213

| Pagina | Byte | Contenuto |
| --- | --- | --- |
| 00 | 4 | byte da 0 a 2 dell'UID e un byte di controllo |
| 01 | 4 | byte da 3 a 6 dell'UID |
| 02 | 4 | byte di controllo, un byte interno, due byte di blocco statici per le pagine da 3 a 15 |
| 03 | 4 | capability container: E1 10 12 00 (numero magico, versione 1.0, 18 x 8 = 144 byte, lettura e scrittura consentite) |
| da 04 a 27 | 144 | memoria utente, dove stanno i TLV |
| 28 | 4 | byte di blocco dinamici per le pagine da 16 in su |
| 29 | 4 | CFG0: configurazione del mirror, la pagina in cui finisce il mirror e AUTH0, la prima pagina protetta da password |
| 2A | 4 | CFG1: byte ACCESS con il bit di protezione in lettura o in scrittura e AUTHLIM, il limite di tentativi falliti |
| 2B | 4 | PWD, la password, di sola scrittura |
| 2C | 4 | PACK, la conferma da due byte, più due byte riservati |

Un NTAG215 ha la stessa struttura, con la memoria utente che arriva fino alla pagina 81 e la configurazione da 83 a 86; un NTAG216 arriva fino a E1, con la configurazione da E3 a E6. I bit del capability container sono irreversibili: una volta impostato il flag di sola lettura nel byte 3, o un bit di blocco, non si torna indietro, ed è proprio questo che scrive il "blocco permanente" dell'app. Una "formattazione" su un Type 2 scrive un TLV NDEF vuoto (03 00 FE) a pagina 4; non azzera la memoria, quindi i vecchi dati restano leggibili con un dump finché non vengono sovrascritti.

### Type 4: il file system dell'NTAG 424 DNA

Qui le pagine non ci sono. Un'applicazione ISO 7816 chiamata D2760000850101 contiene tre file: un capability container da 32 byte (E103), un file NDEF da 256 byte (E104) e un file proprietario da 128 byte (E105). Ogni file ha i suoi diritti di lettura, scrittura e modifica degli accessi, ciascuno associato a una delle cinque chiavi AES. DESFire funziona allo stesso modo ma ti lascia creare applicazioni e file tuoi; i tre dell'NTAG 424 DNA sono fissi, ed è per questo che l'ho descritto come [una piccola cassaforte chiusa con tre cassetti](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/).

### Type 5: i blocchi ISO 15693

Blocchi da quattro byte, numerati da zero, con il capability container nel blocco 0 (E1 40 seguito dalla dimensione) e il TLV NDEF che parte dal blocco 1. UID, AFI, DSFID e stato dei blocchi stanno fuori dai blocchi indirizzabili e si leggono con un comando a parte, GET SYSTEM INFORMATION. Su un ICODE SLIX2 l'ultimo blocco indirizzabile, il 79, è il contatore a 16 bit; su ICODE 3 il blocco 75 contiene un contatore a 24 bit e dal blocco 76 in su c'è un'area di configurazione separata.

### MIFARE Classic: settori, trailer e directory

Un Classic 1K ha 16 settori da 4 blocchi da 16 byte. L'ultimo blocco di ogni settore è il **sector trailer**: chiave A, tre byte di accesso, un byte libero, chiave B. Il blocco 0 del settore 0 è il blocco del produttore, con l'UID. Per mettere l'NDEF su un Classic, NXP ha definito una directory: il settore 0 diventa la **MIFARE Application Directory** (MAD), leggibile con la chiave pubblica A0 A1 A2 A3 A4 A5, ed elenca quali settori contengono NDEF con il codice applicazione 03 E1. Quei settori usano una seconda chiave pubblica, D3 F7 D3 F7 D3 F7. Una tessera nuova di fabbrica ha tutte le chiavi impostate su FF FF FF FF FF FF. Quando NFC.cool su Android formatta una tessera Classic, scrive proprio questa directory e queste chiavi, ed è il motivo per cui una tessera Classic formattata si legge su alcuni telefoni Android e su nessun iPhone.

---

## La tabella per scegliere

Parti da qui se sai qual è il lavoro e cerchi il chip.

| Il lavoro | Il chip | Perché | Supporto in NFC.cool |
| --- | --- | --- | --- |
| un link, una rete Wi-Fi, l'attivazione di un Comando rapido, un adesivo su un oggetto | NTAG213 | 131 caratteri di URL, password, contatore, otto centesimi | completo su iPhone, Android, iPad e Mac |
| un biglietto da visita, un link più lungo, qualunque cosa che debba crescere | NTAG216 | 859 caratteri, le stesse funzioni, il chip su cui faccio i test | completo |
| Amiibo | NTAG215 | la console controlla che ci sia proprio questo chip con i suoi 504 byte | backup e ripristino su entrambe le piattaforme |
| contare gli avvicinamenti su un poster, un biglietto da visita, un'unità demo | NTAG213, 215 o 216 | il contatore di letture hardware e il mirror ASCII, e sono i tre chip supportati dal Tap Counter dell'app | [Tap Counter](/blog/count-nfc-tag-scans/) su entrambe le piattaforme |
| un'antenna minuscola, un anello, un usa e getta economico | NTAG 210µ o Ultralight EV1 48 B | 48 byte, 17 pF per bobine piccole, niente password | lettura e scrittura |
| dimostrare che un prodotto è autentico, con un avvicinamento e senza app | NTAG 424 DNA | ogni lettura si firma da sola con AES-128; una copia non può farlo | configurazione completa, compresa la verifica della firma |
| lo stesso, ma come adesivo Type 2 economico | NTAG 223 DNA | SUN su un chip Type 2, 144 byte | compare come tag Type 2; la configurazione SUN non è ancora supportata |
| un sigillo che segnala quando è stato aperto | NTAG 213 TT, NTAG 424 DNA TT, ST25TV02KC-T | un filo antimanomissione, ricordato per sempre | il 424 TT completamente; gli altri vengono letti come il loro chip di base |
| un inventario o una biblioteca a distanza di braccio con un lettore a varco | ICODE SLIX2 o ICODE 3 | ISO 15693 si legge da 1 a 1,5 metri con un lettore adatto, e funziona comunque avvicinando un telefono | lettura, scrittura, formattazione su entrambe le piattaforme |
| una bobina di filamento per stampante 3D che deve leggere la stampante stessa | ICODE SLIX2 | lo standard [OpenPrintTag](/blog/openprinttag-read-write-nfc-spools-phone/) richiede NFC-V | lettura e scrittura |
| una porta, un tornello, un sistema di trasporto | DESFire EV3 o MIFARE Plus EV2 | AES, vera gestione delle chiavi, sicurezza certificata | identifica il chip e fa il dump di ciò che è pubblico; nessuna operazione con le chiavi |
| un sensore senza batteria che parla con un microcontrollore | NTAG I2C plus, ST25DV, NTAG 5 | un'interfaccia I2C e il recupero di energia sullo stesso die | viene letto per il suo lato NFC |
| qualunque cosa nel mondo dei trasporti o del denaro elettronico in Giappone | FeliCa | è la lingua che parlano i lettori | lettura; scrittura NDEF su Lite-S e Standard su iPhone |
| un tag su una superficie metallica | uno qualunque dei precedenti in formato on-metal | a farlo funzionare è lo strato di ferrite, non il chip | come il chip |
| sotto la pelle | NTAG216 (xNT), NTAG I2C (xSIID), DESFire (xDF) | le piccole antenne in vetro hanno bisogno del punto ideale del telefono | come il chip |

Cosa manca dalla tabella: MIFARE Classic. Nel 2026 non c'è un solo lavoro per cui comprerei un chip Classic, e la sezione qui sotto spiega perché.

---

## Famiglia per famiglia

Ogni famiglia riceve lo stesso trattamento: una tabella tecnica presa dal datasheet, a cosa serve il chip, cosa ci fanno i telefoni e una nota sul campo quando ce l'ho.

### NTAG 21x: la famiglia degli adesivi

È il chip che sta in quasi tutti gli adesivi, i gettoni e le tessere NFC venduti ai consumatori, e NXP nel 2026 li elenca ancora tutti come attivi, anche se il datasheet non è cambiato dal 2015.

<div class="table-scroll">

| Chip | Byte utente / totali | Password | Contatore | Mirror | Firma | Durata / conservazione | Stato |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 210µ | 48 / 64 | no | no | no | sì, riprogrammabile | 100k / 10 anni | attivo |
| NTAG210 | 48 / 80 | 32 bit + PACK, AUTHLIM | no | UID | sì | 100k / 10 anni | attivo |
| NTAG212 | 128 / 164 | sì | no | UID | sì | 100k / 10 anni | attivo |
| NTAG213 | 144 / 180 | sì | contatore di letture a 24 bit | UID e contatore | sì | 100k / 10 anni | attivo |
| NTAG215 | 504 / 540 | sì | sì | sì | sì | 100k / 10 anni | attivo |
| NTAG216 | 888 / 924 | sì | sì | sì | sì | 100k / 10 anni | attivo |
| NTAG213F, NTAG216F | 144 o 888 | sì | sì | sì | sì | 100k / 10 anni | attivo; aggiunge un pin di rilevamento del campo e una modalità sleep per l'integrazione nell'elettronica |
| NTAG 213 TT | 144 / 184 | sì | sì | UID, contatore e stato antimanomissione | sì | 100k / 10 anni | attivo; aggiunge un filo antimanomissione |
| NTAG203 | 144 / 168 | no, un'area OTP a 32 bit | contatore di scritture a 16 bit | no | no | 10k / 5 anni | fuori produzione, sostituito dall'NTAG213 |

</div>

Sono tutti NFC Forum Type 2, ISO/IEC 14443 Type A, UID da 7 byte, 106 kbit/s, dichiarati da -25 a +70 °C. NTAG210 e NTAG212 hanno una capacità d'ingresso di 17 pF per antenne piccole; 213, 215 e 216 hanno 50 pF. La firma di originalità è ECDSA sulla curva secp128r1, 32 byte, letta con il comando READ_SIG; la chiave di verifica sta in un'application note di NXP che non è pubblica, ed è per questo che quasi nessuna app consumer la controlla.

Le tre funzioni che contano nella pratica sono la **password** (una PWD a 32 bit, una PACK a 16 bit con cui risponde il tag, AUTH0 per dire da dove parte la protezione e AUTHLIM per rendere il tag inservibile dopo un numero scelto di tentativi sbagliati), il **contatore NFC** (24 bit, incrementato una volta per sessione di lettura, leggibile con un comando dedicato) e il **mirror ASCII**, che incolla UID e contatore come testo nel messaggio NDEF, così un semplice URL diventa `https://example.com/?u=04A1...&c=000123` a ogni lettura. Le testine Philips Sonicare di cui ho scritto usano un NTAG213 con AUTHLIM impostato a tre, ed è così che [una testina si blocca da sola](/blog/reset-sonicare-brush-head-nfc/) se sbagli.

> **Sul campo:** sono i chip su cui faccio i test a ogni release, e l'NTAG216 è quello che consiglio quando qualcuno vuole comprare una sola confezione e non pensarci più. Su tutto quello che lasci in un luogo pubblico vale la pena impostare la password: ferma chi ha un'app gratuita, cioè quasi tutti. Non ferma chi ha uno sniffer, perché la password stessa viaggia via radio senza crittografia, e nell'app lo dico chiaramente.

Sui telefoni: lettura e scrittura NDEF ovunque, lettura in background dei record URL su iPhone e accesso raw su entrambe le piattaforme per password, contatore e mirror. NFC.cool fa tutto questo su iPhone, su Android e, con un lettore USB, su iPad e Mac.

### NTAG DNA: quelli che firmano ogni lettura

Tre generazioni, due ancora in produzione.

<div class="table-scroll">

| Chip | Tipo del Forum | Byte utente | Chiavi | SUN | Firma | Durata / conservazione | Stato |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 413 DNA | Type 4 | 160 (32 CC + 128 NDEF) | 3 AES-128 | sì, contatore a 24 bit | ECC | 200k / 50 anni | non più prodotto |
| NTAG 424 DNA | Type 4 | 416 (32 + 256 + 128) | 5 AES-128, opzione LRP, opzione Random ID | sì, con opzione di UID crittografato | ECDSA secp224r1, 56 byte, più chiavi AES di originalità | 200k / 50 anni | attivo; Common Criteria EAL4 |
| NTAG 424 DNA TT | Type 4 | 416 | 5 AES-128 | sì, più lo stato antimanomissione nel messaggio | uguale | 200k / 50 anni | attivo |
| NTAG 223 DNA | Type 2 | 144 / 240 | una chiave SUN da 16 byte più una password a 32 bit | sì, contatore a 24 bit | ECDSA secp192r1, 48 byte | 100k / 10 anni | attivo da febbraio 2022 |
| NTAG 224 DNA | Type 2 | 208 / 304 | l'autenticazione reciproca AES-128 sostituisce la password | sì | uguale | 100k / 10 anni | attivo |
| NTAG 223 e 224 DNA StatusDetect | Type 2 | come sopra | come sopra | sì, con lo stato del sensore nel messaggio | uguale | 100k / 10 anni | attivo |

</div>

**SUN**, Secure Unique NFC, è la funzione per cui questi chip valgono il triplo di un NTAG213: il tag copia UID e contatore di letture nell'URL e ci aggiunge un CMAC AES-128 calcolato su quei valori, nuovo a ogni lettura. Il server verifica il MAC; un tag clonato non ha la chiave e fallisce. Ho spiegato tutto, compresa la modalità LRP e le cinque chiavi, nell'[articolo sull'NTAG 424 DNA](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/), quindi qui c'è solo quello che è cambiato da allora: NXP ora vende anche l'NTAG 426Q DNA e l'NTAG X DNA, un chip Type 4 connesso da 16 kB certificato EAL6+, quindi il 424 non è più il chip DNA più recente, ma solo quello che puoi davvero comprare sotto forma di adesivo.

La famiglia 22x DNA è la novità interessante: SUN su un chip Type 2, il che significa che l'adesivo costa meno e il telefono lo legge come un normale NTAG. Le varianti **StatusDetect** aggiungono un sensore: o un circuito conduttivo che registra, in modo irreversibile, di essere stato interrotto, oppure una misura di capacità da 0 a 11 pF tra due pin, che NXP propone per il livello dei liquidi, l'umidità e la pressione.

> **Sul campo:** i miei primi NTAG 424 DNA li ho comprati su AliExpress per pochi euro, e intorno a quelli ho costruito tutte le funzioni dell'app per il 424: cambio delle chiavi, SUN in modalità in chiaro e crittografata, diritti di accesso ai file, il file vault, lo stato antimanomissione. Il 424 è anche l'unico chip per cui NFC.cool verifica la firma di originalità con la chiave pubblica pubblicata da NXP e mostra "Genuine NXP". I 22x DNA li conosco solo sulla carta.

### MIFARE Ultralight: la famiglia dei biglietti

L'Ultralight è il fratello maggiore dell'NTAG. Stessa interfaccia radio, stesse pagine da 4 byte, stesso SAK e, dall'EV1 in poi, stessi comandi. La differenza sta nello scopo: l'Ultralight è nato per i biglietti di corsa singola e la linea NTAG per gli adesivi con un URL, ed è per questo che gli NTAG escono di fabbrica con un capability container già scritto e gli Ultralight no.

<div class="table-scroll">

| Chip | Byte utente / totali | Protezione | Contatore | Firma | Durata / conservazione | Stato |
| --- | --- | --- | --- | --- | --- | --- |
| MIFARE Ultralight (MF0ICU1) | 48 / 64 | bit di blocco e un'area OTP a 32 bit | no | no | 10k / 5 anni | non più prodotto |
| Ultralight C | 144 / 192 | autenticazione reciproca triple DES, chiave da 16 byte | 16 bit irreversibile | no | 100k / 10 anni | sconsigliato per i nuovi progetti, sostituito dall'Ultralight AES |
| Ultralight EV1 | 48 / 80 o 128 / 164 | password a 32 bit, AUTHLIM | tre contatori irreversibili indipendenti a 24 bit | sì, 32 byte | 100k / 10 anni | attivo |
| Ultralight AES | 144 / 240 | autenticazione reciproca AES-128, messaggi con CMAC, opzione Random ID | tre contatori a 24 bit | sì, più una chiave AES di originalità | 100k / 10 anni | attivo da febbraio 2022, Common Criteria EAL3+ |
| Ultralight Nano | 40 / 56 | bit di blocco e OTP | no | sì | 100k / 10 anni | sparito dal catalogo NXP senza un avviso che io abbia trovato |

</div>

I tre contatori irreversibili sono il tratto distintivo dell'Ultralight EV1: un'azienda di trasporti scala un conteggio e il chip si rifiuta di tornare indietro. L'Ultralight AES è la risposta discreta a "vorrei un NTAG213 con una vera autenticazione": gli stessi 144 byte, AES-128 al posto di una password, su un tag Type 2 che qualunque telefono legge.

Sui telefoni: tutto quello che c'è qui viene letto come tag Type 2. Core NFC di Apple espone una famiglia `.ultralight` e permette a un'app di inviare comandi nativi; Android ha una classe `MifareUltralight` che è facoltativa ma presente su tutti i telefoni che ho visto. NFC.cool riconosce le varianti EV1 e l'AES tramite GET_VERSION e tratta la password dell'EV1 come quella degli NTAG; l'autenticazione AES vera e propria, invece, l'app non la fa.

### MIFARE Classic, Plus e DESFire: la famiglia del controllo accessi

Tre famiglie in una sola sezione, perché sono un'unica storia: il Classic è stato violato, il Plus era la strada per migrare, il DESFire è dove il settore è arrivato.

**MIFARE Classic** è il chip della vecchia chiave dell'hotel, della tessera della palestra e di moltissimi badge aziendali. Non è un tipo di tag dell'NFC Forum. Ha un suo cifrario, CRYPTO1, che due gruppi di ricerca hanno ricostruito nel 2008: Nohl e Plötz osservando il silicio al microscopio, e il gruppo della Radboud University osservando il protocollo, recuperando una chiave "con appena uno o due tentativi di autenticazione con un lettore autentico, in meno di un secondo". NXP è andata in tribunale per fermare il secondo articolo e ha perso. Sedici anni dopo, nell'agosto 2024, Quarkslab ha pubblicato una backdoor hardware nel Fudan FM11RF08S, il chip compatibile Classic più diffuso degli ultimi cinque anni, e ha trovato una chiave backdoor più vecchia condivisa da chip Fudan precedenti, da alcuni chip Infineon e perfino da alcuni chip NXP di inizio anni Duemila. Il Classic non è un prodotto di sicurezza, e la stessa pagina prodotto di NXP per il Classic EV1 oggi dice "not recommended for new designs", sconsigliato per i nuovi progetti, e rimanda al DESFire Light.

<div class="table-scroll">

| Chip | Byte utente / totali | UID | Protezione | Durata / conservazione | Stato |
| --- | --- | --- | --- | --- | --- |
| Classic Mini | 224 / 320 | 4 byte | CRYPTO1 | 100k / 10 anni | fuori produzione |
| Classic 1K | 752 / 1024 | NUID da 4 byte | CRYPTO1 | 100k / 10 anni | fuori produzione; EV1 sconsigliato per i nuovi progetti |
| Classic 4K | 3440 / 4096 | NUID da 4 byte | CRYPTO1 | 100k / 10 anni | fuori produzione; EV1 sconsigliato |
| Classic EV1 1K e 4K | come sopra | 7 o 4 byte, opzione ID casuale | CRYPTO1; verifica di originalità solo sull'1K | minimo 100k / 10 anni | sconsigliato per i nuovi progetti |

</div>

La risposta secca per l'iPhone, visto che me lo chiedono ogni settimana: **un iPhone non può leggere il contenuto di una tessera MIFARE Classic, e nessuna app può cambiare le cose.** Core NFC di Apple non ha una famiglia Classic nella sua API, e la documentazione del suo comando MIFARE dice chiaro e tondo che "doesn't support the Crypto1 protocol", cioè che non supporta il protocollo Crypto1. Il telefono vede l'UID e il SAK, la mia app ne ricava la famiglia, e lì finisce. Su Android è diverso: la classe `MifareClassic` è facoltativa ed è implementata dai telefoni il cui controller NFC ha CRYPTO1 in hardware (i controller NXP sì; i chip Broadcom di una generazione di Nexus e Galaxy no), e su quei telefoni NFC.cool legge ogni settore che la chiave di fabbrica apre e può formattare una tessera nuova per l'NDEF.

**MIFARE Plus** è la mappa di memoria del Classic con AES-128 aggiunto sopra, in modo che un gestore potesse sostituire prima le tessere e poi i lettori. Funziona per livelli di sicurezza: SL1 si comporta come un Classic (con AES facoltativo), SL3 è solo AES su ISO-DEP e il Plus X aveva un SL2 intermedio. Plus S e Plus X sono fuori produzione; Plus SE (un 1K, 752 byte) e Plus EV2 (2K o 4K, EAL5+, conservazione di 25 anni, durata tipica di 1.000.000 di cicli) sono attuali. In SL1 un telefono vede SAK 08 o 18, come per un Classic; in SL3 vede una tessera ISO-DEP.

**MIFARE DESFire** è un'altra bestia: un piccolo file system con applicazioni, file, diritti di accesso per ogni file e fino a 14 chiavi per applicazione, che parla APDU su ISO-DEP fino a 848 kbit/s.

<div class="table-scroll">

| Chip | Memoria utilizzabile | Crittografia | Extra | Durata / conservazione | Stato |
| --- | --- | --- | --- | --- | --- |
| DESFire D40 | 4 kB | DES, triple DES | | 100k / 10 anni | ritirato nel 2011; le sue chiavi sono state recuperate con un'analisi dei consumi lo stesso anno |
| DESFire EV1 | 2304, 4864 o 7936 byte | DES, 3DES, AES-128 | compatibile NFC Forum Type 4, ID casuale | minimo 200k / 10 anni | sconsigliato per i nuovi progetti |
| DESFire EV2 | 2560, 5120, 8192 o 16384 byte | AES-128, EAL5+ | transaction MAC, proximity check, firma di originalità | 200k / 25 anni | sconsigliato per i nuovi progetti |
| DESFire EV3 | 2560, 5120, 8192 o 16384 byte | AES-128, EAL5+ | tutto quello dell'EV2 più SUN/SDM e un timer delle transazioni; certificato NFC Forum Type 4 numero 58652 | minimo 200k, tipico 1M / 25 anni, da -25 a +85 °C | attivo |
| DESFire Light | 640 byte | solo AES-128, opzione LRP, EAL4 | un'applicazione fissa con sei file | 200k / 10 anni | attivo |

</div>

Il "2K" nel nome di un DESFire non sono 2048 byte di qualcosa che puoi usare direttamente. La nota comparativa di NXP riporta i valori utilizzabili della tabella, e ogni applicazione e ogni file che crei si prendono una fetta per le proprie intestazioni, allocata in pagine da 256 byte. Chiedilo alla tessera con il comando FreeMemory invece di fidarti dell'etichetta. Il DESFire EV3 ha portato SUN anche in questa famiglia, quindi un EV3 sa fare il trucco dell'NTAG 424 DNA di firmare un URL, cosa che l'EV2 non sa fare.

Sui telefoni: iOS presenta il DESFire come tag MIFARE `.desfire`, oppure come tag ISO 7816 se l'app richiede l'applicazione NDEF; Android usa `IsoDep`. NFC.cool identifica generazione e dimensione tramite GetVersion ed elenca le applicazioni e i file che può vedere senza chiavi. Non si autentica su un DESFire e non ci scrive; quello è un lavoro per gli strumenti del gestore, e preferisco dirlo piuttosto che far finta di niente.

### ISO 15693: la famiglia a lungo raggio

Sono i chip progettati per un metro, non per un centimetro. Un telefono li legge comunque (Apple da iOS 13, Android tramite `NfcV`), e GoToTags ha misurato che su un iPhone i tag Type 5 si leggono a circa il doppio della distanza dei tag Type 2, ma il loro posto naturale sono il varco della biblioteca, lo scaffale del magazzino e la lavanderia industriale. L'UID è da 8 byte e inizia con E0, i blocchi sono da 4 byte, e la famiglia aggiunge tre cose che i chip di Type A non hanno: un **AFI** (un byte di famiglia applicativa su cui un lettore può filtrare), un **DSFID** (un byte di formato dei dati) e l'**EAS**, il bit di sorveglianza elettronica degli articoli che fa suonare il varco antitaccheggio di un negozio.

**NXP ICODE.** La discendenza è SLI (2000), SLI-S e SLI-L (2007), SLIX e le sue varianti S e L (2010), SLIX2 (2014), ICODE DNA (2016) e ICODE 3 (2024). Non esiste uno "SLIX3"; un annuncio che lo cita intende ICODE 3 oppure tira a indovinare.

<div class="table-scroll">

| Chip | Byte utente / totali | Protezione | Contatore | Firma | Durata / conservazione | Stato |
| --- | --- | --- | --- | --- | --- | --- |
| ICODE SLI | 112 / 128 | solo bit di blocco | no | no | 100k / 10 anni | fuori produzione |
| ICODE SLI-S | 160 / 256 | cinque password a 32 bit: lettura, scrittura, distruzione, privacy, EAS | no | no | 100k / 10 anni | non più prodotto |
| ICODE SLI-L | 32 / 64 | tre password | no | no | 100k / 10 anni | non più prodotto |
| ICODE SLIX | 112 / 128 | una password a 32 bit per EAS e AFI | no | no | 100k / 50 anni | sconsigliato per i nuovi progetti |
| ICODE SLIX-S | 160 / 256 | cinque password a 32 bit, modalità privacy, distruzione | no | no | 100k / 50 anni | attivo |
| ICODE SLIX-L | 32 / 64 | tre password | no | no | 100k / 50 anni | attivo |
| ICODE SLIX2 | 316 / 320 | cinque password a 32 bit, modalità privacy, distruzione | 16 bit, incrementato da un comando di scrittura | sì, 32 byte | 100k / 50 anni | attivo |
| ICODE DNA | 252 / 256 | autenticazione reciproca AES-128, tre chiavi | 16 bit | sì, riprogrammabile | 100k / 50 anni | attivo |
| ICODE 3 | 300 / 304 più un'area di configurazione da 192 byte | sei password a 32 bit, due modalità privacy | 24 bit, può contare gli avvicinamenti come un NTAG | sì, 32 o 48 byte, riprogrammabile | 100k / 50 anni, fino a 105 °C | attivo; disponibile la variante TagTamper |

</div>

ICODE 3 è quello da conoscere: copia l'UID e il suo contatore degli avvicinamenti nel messaggio NDEF come fa un NTAG213, si legge fino a 212 kbit/s e accorda da solo la propria antenna. Non ha AES; il componente con AES è l'ICODE DNA, e nessuno dei due fa SUN.

**STMicroelectronics ST25TV e ST25DV.** La linea Type 5 di ST, e quella con i numeri migliori di tutta la guida sul datasheet.

<div class="table-scroll">

| Chip | Byte utente | Protezione | Contatore | Firma | Durata / conservazione | Stato |
| --- | --- | --- | --- | --- | --- | --- |
| ST25TV512, ST25TV02K | 64 o 256 | password a 32 o 64 bit, kill, modalità non tracciabile, antimanomissione sulla variante -AD | contatore di eventi di scrittura a 16 bit | TruST25 | 100k / 60 anni | sconsigliato per i nuovi progetti |
| ST25TV512C, ST25TV02KC | 64 o 320 | password, kill, modalità silent e discreet, antimanomissione sulla variante -T | nessuno; al suo posto un codice univoco di lettura a 3 cifre | TruST25 | 100k / 60 anni | attivo, disponibile fino al 2035 |
| ST25TV04K-P | 512 | password a 64 bit, kill | no | no | 1M / 40 anni | attivo; ha un pin per il recupero di energia |
| ST25TV16K, ST25TV64K e le versioni KC | 2048 o 8192 | password a 64 bit, kill | no | no | 1M / 40 anni | componenti K sconsigliati, componenti KC attivi |
| ST25DV04K, 16K, 64K e le versioni KC | 512, 2048 o 8192 | tre password RF a 64 bit più una password I2C | no | no | 1M / 40 anni | componenti K sconsigliati, componenti KC attivi |
| M24LR04E, 16E, 64E | 512, 2048 o 8192 | password a 32 bit | no | no | 1M / 40 anni | sconsigliato per i nuovi progetti |

</div>

L'**Augmented NDEF** dell'ST25TV02KC merita un paragrafo, perché viene venduto come sicurezza. A ogni lettura il chip inserisce nell'URL il proprio UID, un campo personalizzato e un **codice univoco di lettura** di tre caratteri, senza toccare l'EEPROM. Il codice cambia a ogni avvicinamento, e il datasheet di ST dice testualmente che è "predictable", prevedibile. È un token di freschezza che dice al tuo server che si tratta di una lettura nuova, non una prova che il tag sia autentico. La funzione che attesta l'autenticità è TruST25, la firma di originalità di ST sull'UID, e come quella di NXP è una firma statica che un clone può copiare.

**Il resto del mondo Type 5.** Gli inlay Tag-it HF-I di Texas Instruments (Standard da 32 byte, Pro da 32 byte con scrittura protetta da password e comando kill, Plus da 256 byte) stanno in tutte le biblioteche che hanno installato l'NFC prima del 2015, e oggi sono tutti indicati come sconsigliati o obsoleti. L'EM4233 di EM Microelectronic (208 byte, una modalità privacy con chiave a 96 bit, conservazione di 60 anni) è disponibile su richiesta. Il my-d di Infineon e l'MB89R118 di Fujitsu compaiono nel codice di identificazione di NFC.cool perché li hanno segnalati gli utenti. L'NTAG 5 di NXP (link, boost, switch) è un chip ISO 15693 nonostante il nome NTAG, con 2048 o 512 byte, una porta I2C, recupero di energia fino a 30 mW e un'EEPROM da 1.000.000 di cicli e 40 anni: un tag connesso per l'elettronica, non un adesivo, e il software scritto per gli NTAG21x non ci parla.

> **Sul campo:** lo SLIX2 è il chip di tutte le bobine di filamento OpenPrintTag, quindi ne ho avuti per le mani parecchi, e NFC.cool li legge, li scrive e li formatta su entrambe le piattaforme. Quello che l'app non fa, e voglio essere chiaro, sono i comandi ISO 15693 per password, privacy, EAS e AFI. I byte dei comandi sono nel codice come tabella di riferimento; i pulsanti non ci sono ancora.

### Type 4 al di fuori di MIFARE: ST25TA

La famiglia ST25TA di ST è fatta di tag Type 4 su ISO/IEC 14443 Type A senza tutta la macchina del DESFire: un file NDEF, un file capability container e un file di sistema, due password a 128 bit (lettura e scrittura) e un contatore di eventi a 20 bit che può contare le letture o le scritture.

<div class="table-scroll">

| Chip | File NDEF | Password | Contatore | Firma | Durata / conservazione | Stato |
| --- | --- | --- | --- | --- | --- | --- |
| ST25TA512, ST25TA512B | 64 byte | due a 128 bit | 20 bit sul B | TruST25 sul B | 1M / 200 anni | 512 sconsigliato |
| ST25TA02K, ST25TA02KB (-P, -D) | 256 byte | due a 128 bit | 20 bit | TruST25 sul B | 1M / 200 anni | 02K e 02KB sconsigliati; 02KB-P e 02KB-D attivi |
| ST25TA16K, ST25TA64K | 2048 o 8192 byte | due a 128 bit | no | no | 1M / 200 anni | attivo |

</div>

Duecento anni di conservazione e un milione di cicli di scrittura, ma solo a 106 kbit/s. Le varianti -P e -D hanno un pin di uscita generico che cambia stato quando il tag viene letto, ed è così che si fa reagire una lampada a un telefono. Su entrambi i sistemi questi chip vengono letti come tag Type 4; NFC.cool ci legge e ci scrive l'NDEF e mostra i dettagli ISO-DEP.

### Chip sensore e a doppia interfaccia

Sono chip con due facce: un'antenna NFC da una parte e, dall'altra, un bus I2C, un sensore o una seconda radio.

| Chip | Lato NFC | Altro lato | Memoria | Da notare |
| --- | --- | --- | --- | --- |
| NTAG I2C plus (NT3H2111, NT3H2211) | Type 2, 888 o 1912 byte, password a 32 bit, firma | I2C fino a 400 kHz, SRAM pass-through da 64 byte, pin di rilevamento del campo | da 200k a 500k / 20 anni | recupero di energia fino a 15 mW; è il chip dell'impianto xSIID |
| ST25DV (vedi sopra) | Type 5 | I2C fino a 1 MHz, una mailbox da 256 byte per lo streaming | 1M / 40 anni | recupero di energia sul pin V_EH, non regolato, "qualche µW" secondo il datasheet |
| NTAG 5 link, boost, switch | Type 5, 2048 o 512 byte, AES sul 5332 | I2C, GPIO, uscite PWM | 1M / 40 anni | recupero fino a 30 mW; la variante switch non ha bisogno di alcun microcontrollore |
| NHS3100 | Type 2, emulato dal firmware | un Cortex-M0+ con un sensore di temperatura preciso a 0,3 °C | 32 kB di flash, 4 kB di EEPROM | un data logger per la catena del freddo su una pellicola, certificato NFC Forum |
| EM4423 "em echo" | Type 2, area NDEF da 240 byte | RFID UHF RAIN, stessa memoria, stesso numero di serie | 100k / 10 anni | fuori produzione |
| EM4425 "em echo-V" | Type 5, fino a 256 byte condivisi | RFID UHF RAIN, AES-128, contatti antimanomissione, firma digitale | 100k / 50 anni | attuale; un unico die leggibile da un telefono a un centimetro e da un lettore UHF sulla porta di carico a diversi metri |

Con questi chip non ho costruito niente, quindi questa tabella viene solo dai datasheet. Contano per la guida perché negli annunci compaiono come "chip NFC" e confondono le idee: un NTAG 5 non è un NTAG213, e un tag em echo sul telefono non fa niente di speciale.

### Vecchie glorie e nicchie

**Topaz** (Innovision, poi Broadcom) è l'NFC Forum Type 1: blocchi da 8 byte, 96 o 512 byte, blocchi irreversibili, 10.000 cicli di scrittura. Entrambi i sistemi leggono ancora l'NDEF da un Topaz, ma l'NFC Forum ha tolto il Type 1 dalle specifiche del 2021 e nessuno lo usa più nei nuovi progetti. I rivenditori ne hanno ancora in magazzino.

**FeliCa** è la famiglia di Sony e quella dei trasporti pubblici giapponesi. FeliCa Lite-S (224 byte di memoria utente in blocchi da 16 byte, un IDm da 8 byte, un MAC triple DES semplificato) è la versione tag ed è NFC Forum Type 3; FeliCa Standard è la versione smart card, oggi con AES e una certificazione Common Criteria EAL6+ sull'attuale RC-SA01, ed è quella su cui girano Suica, PASMO, Edy, WAON, nanaco e l'Octopus di Hong Kong. I moduli FeliCa Plug di Sony sono usciti di produzione a marzo 2026. NFC.cool riconosce i marchi dei trasporti e del denaro elettronico dal codice di sistema su entrambe le piattaforme, legge Lite-S e Standard e ci scrive l'NDEF su iPhone.

**Kovio NFC Barcode** era un tag in silicio stampato, di sola lettura, da 16 byte. Android ha ancora una classe `NfcBarcode` dedicata. Le attività di Kovio sono passate a Thinfilm nel 2014, Thinfilm ha smesso di produrre NFC nel 2019 e ha cambiato nome nel 2021. Quella classe è un fossile.

**Chip di memoria ISO 14443 Type B.** Gli SRI512, SRT512 e SRI4K di ST (512 o 4096 bit in blocchi da 32 bit, due contatori a scalare, 1.000.000 di cicli, 40 anni) vivono nei trasporti francesi e belgi e in alcuni skipass. Android li espone tramite `NfcB`; l'iPhone non ha proprio un oggetto tag raw per il Type B, quindi un iPhone non vede una tessera Type B a meno che non parli ISO-DEP e non risponda a una SELECT. Calypso, il sistema del Navigo di Parigi, è una smart card Type B che lo fa.

### Cloni e compatibili

È la sezione che gli annunci preferirebbero tu non leggessi.

**Fudan FM11NT021** è il più diffuso "NTAG213" che non è un NTAG213. Ha gli stessi 180 byte in 45 pagine, la stessa area utente da 144 byte, una password, un contatore di letture a 24 bit e, nell'UID, il codice produttore Fudan 1D. Non implementa GET_VERSION e il suo datasheet attuale non elenca un comando READ_SIG, quindi un lettore che fa una di queste due domande riceve silenzio e ripiega sul tirare a indovinare in base alla dimensione della memoria, ed è per questo che la community di Proxmark3 lo segnala come NTAG203. Fudan produce anche versioni da 504 e 888 byte (FM11NT041, FM11NT081). Per un link su un adesivo funzionano. Per gli Amiibo no, perché la console chiede per prima cosa GET_VERSION.

**Fudan FM11RF08 e FM11RF08S** sono i chip compatibili Classic della maggior parte delle tessere "1K" economiche. Nel 2020 l'08S ha aggiunto contromisure contro gli attacchi noti al Classic, e poi si è scoperto che conteneva una chiave backdoor hardware comune a tutte le tessere prodotte, pubblicata da Quarkslab nel 2024 insieme a strumenti che oggi fanno parte del firmware di Proxmark3.

Le **tessere MIFARE Classic "magic"** sono chip costruiti in modo che UID e blocco del produttore si possano riscrivere, cosa che un vero Classic non permette mai. Le generazioni sono un hobby a sé:

| Generazione | Come cambia l'UID | Rilevabile | Note |
| --- | --- | --- | --- |
| Gen1a, Gen1b | un comando di risveglio backdoor | sì, qualunque lettore può sondare la backdoor | la "Chinese magic card" originale; i sistemi di accesso la filtrano |
| Gen2, CUID | una normale scrittura nel blocco 0 dopo l'autenticazione | nessuna backdoor da sondare; un lettore deve tentare una scrittura | compatibile con i telefoni, è quella comune oggi |
| FUID, UFUID | una volta sola, o finché non viene sigillata | prima della sigillatura | tessere monouso per clonare un badge in modo permanente |
| Gen3, APDU | comandi APDU speciali | un lettore che conosce i comandi | |
| Gen4 GTU, GDM, "Ultimate" | una configurazione protetta da password; può emulare anche Ultralight e NTAG | solo finché la password è quella predefinita | un camaleonte con UID da 7 byte e qualunque famiglia, in formato tessera |

Esistono anche tessere NTAG21x magic, e quelle che emulano completamente accettano perfino una firma di originalità copiata, ed è proprio il punto che NXP sottolinea sulle firme statiche.

**"Compatibile NTAG215" per gli Amiibo.** Un Amiibo è un normale NTAG215 i cui 540 byte contengono dati crittografati e firmati con chiavi derivate dall'UID del tag stesso. Se copi i byte su un altro tag le firme non corrispondono più, ed è per questo che un backup va ricifrato per l'UID del tag di destinazione, che è esattamente quello che fa il [backup e ripristino degli Amiibo](/blog/amiibo-iphone-android-read-collect-backup/) di NFC.cool. La sequenza di lettura della console inizia con GET_VERSION, poi un'autenticazione con password derivata dall'UID, poi la lettura di tutte le 135 pagine, comprese quelle di configurazione. Un chip senza GET_VERSION, o con 45 pagine invece di 135, si ferma al primo passo. La documentazione di TagMo lo dice in una riga: viene riconosciuto solo l'NTAG215.

**Come si presenta un clone nell'app.** NFC.cool identifica i chip prima di tutto con GET_VERSION. Un chip che non risponde, o che risponde con una dimensione di memoria diversa da quella dichiarata, viene chiamato per quello che è davvero, non per quello che dice l'annuncio. Su un NTAG 424 DNA l'app fa un passo in più e verifica la firma di originalità ECDSA con la chiave pubblica di NXP, ed è l'unico punto dell'app che può dire "Genuine NXP" con una base crittografica. Sugli NTAG21x l'app non legge la firma, in parte perché la chiave di verifica di NXP è coperta da NDA e in parte perché una firma statica copiata passerebbe comunque. Per un tag Type 2 la catena di prove onesta è questa: codice del produttore, GET_VERSION, dimensione della memoria e presenza delle funzioni che il chip dichiara di avere.

---

## Formati e distanza di lettura

Il chip decide cosa sa fare il tag; il formato decide se il telefono riesce a raggiungerlo.

| Formato | Cos'è | Antenna tipica | Distanza di lettura con un telefono | Specifiche e note |
| --- | --- | --- | --- | --- |
| Wet inlay | l'antenna incisa e il chip su una pellicola in PET con adesivo e liner protettivo | da 22 a 38 mm | da 2 a 4 cm | il modo più economico per comprare un chip; si attacca una volta sola |
| Dry inlay | lo stesso senza adesivo | come sopra | come sopra | da laminare dentro qualcos'altro |
| Adesivo in carta o PET | un inlay con una faccia stampabile | da 22 a 38 mm | da 2 a 4 cm | una faccia in carta si stampa, una in PET resiste all'acqua |
| Tessera in PVC | ISO 7810 ID-1, 85,60 x 53,98 mm, spessore 0,76 mm | l'intera tessera | da 3 a 5 cm | l'antenna più grande che terrai in mano; è anche il formato per cui sono progettati i lettori |
| Gettone, token in resina epossidica | un inlay sotto una cupola di resina dura, spesso con un foro | da 20 a 30 mm | da 2 a 3 cm | impermeabile; è il formato degli Amiibo |
| Portachiavi | un inlay in un guscio di ABS | da 20 a 30 mm | da 2 a 3 cm | un portachiavi GoToTags è certificato IP67 e da -25 a +75 °C |
| Braccialetto | silicone con un inlay | da 20 a 25 mm | da 1 a 3 cm | festival, piscine; il braccialetto si piega, l'inlay non dovrebbe |
| On-metal | un inlay con un foglio di ferrite tra antenna e metallo | da 22 a 34 mm | da 2 a 3 cm sul metallo | Seritag misura da 21 a 25 mm sul metallo contro 26-30 mm lontano dal metallo per lo stesso tag da 22 mm; la versione industriale da 34 mm si legge da 31 a 40 mm ed è IP68, da -25 a +85 °C |
| Tag per lavanderia | un chip in un bottone di PPS | 16 mm | da 1 a 2 cm | Smartrac certifica il suo tag HF per lavanderia per 200 lavaggi, da -30 a +200 °C e 60 bar; quasi tutti i tag per lavanderia sono ISO 15693 con il solo UID |
| Impianto | un chip in una capsula di vetro da 2 x 12 mm o in un polimero flessibile | pochi millimetri | serve il punto ideale esatto del telefono | l'xNT è un NTAG216, il NExT aggiunge un T5577 a 125 kHz, l'xSIID è un NTAG I2C plus con un LED, l'xDF è un DESFire; le versioni flessibili si leggono molto meglio di quelle in vetro |

Due regole fisiche spiegano la maggior parte delle segnalazioni "non si legge". **La dimensione dell'antenna determina la portata**, più o meno: una tessera si legge da più lontano di un gettone, un gettone da più lontano di un inlay da 10 mm, e un impianto ha bisogno del contatto. **Il metallo stara l'antenna**: una bobina appoggiata su una superficie metallica induce correnti parassite nel metallo, la sua induttanza cala e la risonanza si allontana dai 13,56 MHz, quindi un tag normale su un armadietto d'acciaio è morto. Un foglio di ferrite tra la bobina e il metallo devia il campo e riporta in vita il tag, al prezzo di una portata minore e di un costo più alto, ed è per questo che i tag on-metal costano il triplo.

Dove tieni il telefono conta quanto il tag. Sull'iPhone l'antenna è sul bordo superiore; l'indicazione di Apple è di "avvicinare la parte superiore dell'iPhone" al tag. Su Android dipende dal modello, di solito al centro del retro o vicino alla fotocamera. La [guida per chi inizia](/blog/nfc-tags-beginners-guide/) spiega tutto passo passo.

---

## Chi legge cosa

La matrice dei telefoni e dei lettori. Le colonne dei telefoni vengono dalla documentazione di Apple e di Google e dalla mia app; quelle dei lettori da scrivania e per smanettoni vengono dalle schede tecniche dei produttori e dalla documentazione dei progetti stessi, e quei dispositivi non li ho provati di persona, a parte i lettori citati nella colonna di iPad e Mac.

<div class="table-scroll sticky-first">

| Famiglia di chip | iPhone in background | iPhone in un'app | Android | iPad e Mac con un lettore USB | Web NFC (Chrome su Android) | ACR122U | ACR1552U, OMNIKEY 5022 | Scheda PN532 | Proxmark3 | Flipper Zero |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG21x, Ultralight EV1, altri Type 2 | solo record URL | NDEF, password, contatore, mirror, dump | uguale | uguale, tramite NFC.cool | solo NDEF | sì | sì | sì | sì, più emulazione | sì, più emulazione |
| NTAG 22x DNA | record URL | NDEF, comandi raw | uguale | come Type 2 | NDEF | sì | sì | sì | sì | letto come NTAG |
| NTAG 424 DNA, ST25TA, DESFire come Type 4 | record URL | NDEF, APDU | NDEF, APDU | NDEF, configurazione completa del 424 | NDEF | sì | sì | sì | sì | legge l'NDEF; nessuna operazione con le chiavi |
| Ultralight C | NDEF se formattato | NDEF, comandi nativi | uguale | NDEF | NDEF | sì | sì | sì | sì | sì |
| Ultralight AES | NDEF se formattato | NDEF, comandi nativi | uguale | NDEF | NDEF | sì | sì | sì | sì | letto come Ultralight |
| MIFARE Classic | no | solo UID e famiglia | lettura e scrittura complete sui telefoni il cui controller ha CRYPTO1 | solo lettura NDEF, chiavi note | no | sì, con le chiavi | sì, con le chiavi | sì, con le chiavi | sì, più recupero delle chiavi ed emulazione | sì, più recupero delle chiavi ed emulazione |
| MIFARE Plus | no | UID in SL1; ISO-DEP in SL3 | come Classic in SL1; IsoDep in SL3 | UID | no | sì | sì | sì | sì | non documentato |
| DESFire, nativo | no | famiglia e versione, APDU | IsoDep | versione | no | sì | sì | sì | sì | solo lettura e salvataggio |
| ISO 15693: ICODE, ST25TV, ST25DV, TI, EM | record URL | set completo di comandi ISO 15693 da iOS 13 | NfcV | non provato | NDEF | no | sì | no | sì, più emulazione | sì, più emulazione |
| FeliCa Lite-S e Standard | record URL | lettura e scrittura, con il codice di sistema dichiarato | NfcF | lettura; scrittura su FeliCa tramite NFC.cool | NDEF | sì | solo UID sull'OMNIKEY | sì | sì | lettura ed emulazione del Lite-S |
| Topaz (Type 1) | NDEF | NDEF | NDEF | non provato | NDEF | sì | non documentato | sì | sì | non documentato |
| Memorie ISO 14443 Type B (SRI512) | no | no | NfcB | non provato | no | sì | sì | solo lettore | sì | solo UID |
| Badge a 125 kHz, microchip per animali, etichette UHF | no | no | no | no | no | no | no | no | 125 kHz sì | 125 kHz sì |

</div>

Alcune righe meritano una frase.

- La **lettura in background su iPhone** scatta solo per un record URL NDEF, solo quando il telefono è sbloccato e in uso, e non mentre sono attivi la fotocamera, Wallet, una sessione di lettura o la modalità aereo. Non legge mai un chip raw. Da iPhone XS in poi.
- **Quali iPhone leggono i tag:** dall'iPhone 7 in poi dentro un'app, secondo la sessione della WWDC 2019 di Apple. Scrittura e comandi raw sono arrivati con iOS 13.
- **La classe `MifareClassic` di Android è facoltativa.** Le parole di Google: "if it is not implemented, then MifareClassic will never be enumerated". Dipende dal controller, non dalla versione di Android.
- **Web NFC** è solo NDEF, da Chrome 89 in poi, solo su Android, e Apple ha preso una posizione contraria, quindi una versione per Safari non ci sarà. È per questo che il [lettore NFC online](/online-nfc-reader/) di questo sito funziona su Android e a chi ha un iPhone dice di usare l'app.
- **iPad e Mac non hanno una radio NFC.** Da NFC.cool 6.15.0 l'app parla invece con un lettore USB CCID tramite lo stack per smart card di Apple; l'HID OMNIKEY 5022 CL è quello che ho provato io, l'ACS ACR1552U-M1 e l'ACR1255U-J1 funzionano secondo le segnalazioni degli utenti, e [l'articolo dedicato](/blog/nfc-reading-ipad-mac/) elenca i limiti. Impostare la password di un NTAG funziona con un lettore; per rimuoverla serve un comando che l'OMNIKEY rifiuta, quindi quella resta una cosa da fare con il telefono.
- **L'ACS ACR122U non supporta ISO 15693**, e nemmeno l'ACR1252U o l'ACR1255U-J1. Nella linea ACS lo fa solo l'ACR1552U. L'OMNIKEY 5022 fa entrambe le cose. Meglio saperlo prima di comprare un lettore per i tag delle biblioteche.
- **Proxmark3 e Flipper Zero** sono gli strumenti che sanno recuperare le chiavi MIFARE Classic ed emulare le tessere. Servono a questo, e la guida li cita perché un "chi legge cosa" senza di loro sarebbe disonesto.

<div class="table-scroll">

| Lettore | Interfaccia | Type A | Type B | FeliCa | ISO 15693 | 125 kHz | Classic con le chiavi | Recupero chiavi Classic | Emulazione | Prezzo visto a settembre 2026 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ACS ACR122U | USB, PC/SC | sì | sì | sì | no | no | sì | no | no | circa 40-50 USD; ACS l'ha tolto dal catalogo, i falsi sono comuni |
| ACS ACR1252U | USB, PC/SC | sì | sì | sì | no | no | sì | no | modalità di emulazione della tessera | 97,50 USD |
| ACS ACR1552U | USB, PC/SC | sì | sì | sì | sì | no | sì | no | modalità di emulazione della tessera | 44,81 USD |
| ACS ACR1255U-J1 | Bluetooth e USB | sì | sì | sì | no | no | sì | no | no | 64,81 USD |
| HID OMNIKEY 5022 CL | USB, PC/SC | sì | sì | solo UID | sì | no | sì | no | no | 69,99 EUR |
| Breakout PN532 | SPI, I2C, UART | sì | solo lettore | sì | no | no | sì | strumenti sul computer | Classic 1K/4K e FeliCa | 24-40 USD |
| Proxmark3 RDV4 | USB, opzione BLE | sì | sì | sì | sì | sì | sì | sì | sì | 329-529 EUR |
| Proxmark3 Easy | USB | sì | sì | sì | sì | sì | sì | parziale | sì | 78 EUR; cloni da circa 28 GBP |
| Flipper Zero | autonomo, USB-C, BLE | sì | limitato | Lite-S | sì | sì | sì | sì | sì | 169 USD |
| Chameleon Ultra | USB-C, BLE | lettura ed emulazione | no | no | no | emulazione e lettura | sì | sì | sì | 129 EUR |

</div>

---

## Cosa fa NFC.cool Tools con ogni chip

Questo è il punto di un articolo in cui compare la cosa che ho costruito io, e qui ci sta, perché ogni riga qui sopra finisce con "e l'app che cosa ci fa?". La tabella qui sotto non è un testo promozionale; l'ho ricavata dal codice sorgente dell'app mentre scrivevo questa guida, e mi ha corretto su due cose che altrimenti avrei dato per vere.

| Famiglia di chip | iPhone | Android | iPad e Mac con un lettore |
| --- | --- | --- | --- |
| Identificazione del prodotto | circa 60 nomi: da NTAG203 a 216, NTAG I2C, Ultralight e C, Ultralight EV1 per dimensione, Ultralight AES, Classic Mini, 1K e 4K, Plus 2K e 4K per livello di sicurezza, DESFire EV1, EV2 ed EV3 per dimensione, NTAG 424 DNA e la sua variante TagTamper, ICODE SLI, SLI-S, SLI-L, SLIX, SLIX-S, SLIX-L e SLIX2, TI Tag-it Standard, Pro e Plus, ST25TV, ST25DV e M24LR, Infineon my-d, Fujitsu MB89R118, EM4233 ed EM4423, FeliCa Lite e Standard più Suica, PASMO, ICOCA, Edy, WAON e nanaco; le carte EMV e PIV vengono riconosciute come tali | circa 20 nomi: NTAG203, 213, 215 e 216, NTAG 424 DNA, DESFire, Classic Mini, 1K e 4K, Plus 2K e 4K, JCOP e SmartMX, i marchi FeliCa compreso Octopus; i chip ISO 15693 vengono indicati per dimensione, non per prodotto | il tipo di tessera dalla risposta al reset del lettore |
| Lettura NDEF | tutte le famiglie | tutte le famiglie | Type 2, Type 4, FeliCa; Classic con le chiavi pubbliche |
| Scrittura NDEF, svuotamento di un tag | Type 2, Type 4, Type 5, FeliCa Lite-S e Standard | Type 2, Type 5, MIFARE Classic con la directory NDEF, tutto ciò che Android sa formattare | Type 2, Type 4, FeliCa |
| Azzeramento dell'intera memoria | Type 5 | Type 2, Type 5, Classic | come iPhone |
| Blocco permanente | byte di blocco Type 2; NDEF di sola lettura su Type 4, Type 5 e FeliCa; rifiutato di proposito sull'NTAG 424 DNA | Type 2 | sì |
| Password | NTAG213, 215, 216 e 203 | la famiglia Type 2 | impostazione sì; la rimozione dipende dal lettore |
| Contatore degli avvicinamenti e mirror | NTAG213, 215, 216 | NTAG213, 215, 216 | sì |
| Dump completo della memoria | Type 2, ISO 15693, elenco dei file DESFire, FeliCa, file dell'NTAG 424 DNA | Classic con la chiave di fabbrica, Ultralight, ISO 15693, FeliCa, qualunque Type A | Type 2, Type 4, FeliCa |
| Contenuto MIFARE Classic | no; Core NFC non ha CRYPTO1 | lettura con la chiave di fabbrica, formattazione e scrittura con le chiavi note | solo lettura NDEF |
| NTAG 424 DNA | chiavi, SUN in modalità in chiaro e crittografata, diritti di accesso ai file, configurazione del chip, il file vault, UID casuale, LRP, stato antimanomissione, verifica della firma di originalità | uguale | uguale |
| Amiibo | backup e ripristino su NTAG215, ricifrato per il tag di destinazione | uguale | sì |
| Password, EAS, AFI ISO 15693 | non ancora | non ancora | no |
| Autenticazione e scrittura DESFire | no | no | no |
| Comandi raw | modalità APDU per esperti | un catalogo di comandi | sì |

Le due correzioni, per la cronaca: avrei scritto che l'app verifica la firma di originalità sui tag NTAG21x, e invece non lo fa; ce l'ha solo il 424. E avrei scritto che i comandi password di ISO 15693 c'erano già, mentre sono una tabella di riferimento in attesa di un'interfaccia. Sono tutte e due in lista.

---

## Comprare senza farsi fregare

Cosa deve dire un annuncio prima che io compri:

1. **Il nome esatto del chip.** "NTAG213", non "NFC 213"; "ICODE SLIX2", non "tag ISO 15693"; "MIFARE Classic EV1 1K", non "tessera 1K". Se l'annuncio non nomina il chip, il venditore non lo sa oppure non vuole che lo sappia tu.
2. **La memoria utente in byte**, e deve corrispondere al chip: 144 per un NTAG213, 504 per un 215, 888 per un 216, 316 per uno SLIX2. Un "1K" che si rivela un MIFARE Classic su un iPhone non funzionerà.
3. **Il produttore**, se l'annuncio promette NXP o ST originali. Il codice del produttore nell'UID ti dirà la verità dopo l'acquisto; il prezzo te la dice prima. Nessuno vende adesivi NTAG216 originali a un terzo del prezzo di mercato.
4. **La dimensione dell'antenna e il formato.** Un inlay da 10 mm si legge a un centimetro; uno da 38 mm a quattro. Un tag on-metal deve dichiararsi on-metal.
5. **Se è formattato NDEF.** Gli NTAG escono già formattati; gli Ultralight EV1 e la maggior parte dei chip ISO 15693 no, e NFC.cool li formatta, ma è un passaggio in più.

Campanelli d'allarme: "compatibile NTAG215" (non è un NTAG215), "crittografato" su qualunque cosa stia sotto il gradino 4 della scala, "funziona con tutti i telefoni" su un MIFARE Classic e qualunque nome di chip con una sigla che il produttore non ha mai usato, come SLIX3.

**Quanto costano i tag.** Prezzi di listino che ho visto il 9 settembre 2026 da Seritag, Shop NFC, GoToTags, NFCW Shop, NFC.CARDS, NFC-Tag-Shop.de, Tagstand e Digi-Key. Quasi tutti i negozi vendono almeno a decine, quindi la colonna "singolo" è la fascia più piccola che offrono. I prezzi cambiano; prendili come proporzioni.

| Tag | Singolo o fascia minima | Ogni 100 | Ogni 1.000 | Chip nudo |
| --- | --- | --- | --- | --- |
| Adesivo NTAG213 | 0,32-0,65 EUR, 0,33-0,58 USD | 0,29-0,34 EUR | 0,23-0,24 EUR, 0,50 USD | 0,14 USD a volumi di wafer |
| Adesivo o tessera NTAG215 | 0,48-0,54 USD, 0,64-0,67 GBP | 0,35 USD | 0,33 USD | 0,21 USD |
| Adesivo NTAG216 | 0,97 EUR, 0,71 USD | 0,70 EUR, 0,61 USD | 0,56 EUR, 0,56 USD | 0,37 USD |
| Adesivo NTAG 424 DNA | 0,63 EUR, 0,90 USD | 0,62 EUR, 0,77 USD | 0,57 EUR, 0,68 USD | 0,79 USD singolo, 0,51 ogni 1.000 |
| Tessera MIFARE Classic 1K | 1,35-1,59 EUR a decine; 6,69 EUR come singola tessera al dettaglio | 1,29-1,52 EUR, 1,98 USD | 0,95-1,13 EUR, 0,86 USD | |
| Tessera DESFire EV3 | 1,85-2,79 EUR | 1,85-2,45 EUR | 1,35-2,29 EUR | 1,18 USD a 31.000 pezzi |
| Etichetta ICODE SLIX2 | 0,69 EUR | 0,34-0,37 EUR | 0,22-0,25 EUR | 0,35 USD singolo, 0,22 ogni 1.000 |
| Inlay ST25TV02KC | 0,32-0,87 USD | 0,30-0,79 USD | 0,28-0,77 USD | 0,13 USD per bobina |

Lo schema è quello che ti aspetteresti: la memoria è quasi gratis, la crittografia costa circa il doppio e il formato costa più del chip. Un die NTAG213 nudo costa quattordici centesimi; il grosso del prezzo è l'adesivo che ci sta intorno.

Dove comprarli: nella pagina dei [link di affiliazione](/affiliate-links/) tengo un elenco dei tag e dei lettori che uso davvero, e i 424 da cui sono nate tutte le funzioni DNA venivano da AliExpress, quindi non ti dirò che i marketplace sono off limits. Controlla con l'app quello che arriva prima di scriverci qualcosa.

---

## L'intero catalogo in una tabella

Una riga per chip. "Byte utente" è quanto puoi scrivere; per il DESFire è il valore utilizzabile indicato da NXP. Le colonne dei telefoni dicono cosa sa fare la piattaforma, non cosa fa ogni app; la colonna NFC.cool dice cosa fa la mia. Sul telefono scorri di lato; la prima colonna resta ferma.

<div class="table-scroll sticky-first">

| Chip | Produttore | Tipo del Forum | Standard | Byte utente | UID | Protezione | Durata / conservazione | iPhone | Android | NFC.cool | Ideale per |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 210µ | NXP | 2 | 14443-A | 48 | 7 | bit di blocco | 100k / 10 anni | NDEF, raw | NDEF, raw | lettura, scrittura | minuscoli usa e getta |
| NTAG210 | NXP | 2 | 14443-A | 48 | 7 | password | 100k / 10 anni | NDEF, raw | NDEF, raw | lettura, scrittura | antenne piccole |
| NTAG212 | NXP | 2 | 14443-A | 128 | 7 | password | 100k / 10 anni | NDEF, raw | NDEF, raw | lettura, scrittura | antenne piccole con un po' di spazio |
| NTAG213 | NXP | 2 | 14443-A | 144 | 7 | password, contatore, mirror | 100k / 10 anni | NDEF, raw | NDEF, raw | tutto | l'adesivo standard |
| NTAG215 | NXP | 2 | 14443-A | 504 | 7 | password, contatore, mirror | 100k / 10 anni | NDEF, raw | NDEF, raw | tutto, Amiibo | Amiibo, contenuti di media dimensione |
| NTAG216 | NXP | 2 | 14443-A | 888 | 7 | password, contatore, mirror | 100k / 10 anni | NDEF, raw | NDEF, raw | tutto | contatti, la scelta sicura |
| NTAG213F, 216F | NXP | 2 | 14443-A | 144, 888 | 7 | password, pin di rilevamento del campo | 100k / 10 anni | come il 213 | come il 213 | come il 213 | tag integrati nell'elettronica |
| NTAG 213 TT | NXP | 2 | 14443-A | 144 | 7 | password, filo antimanomissione | 100k / 10 anni | come il 213 | come il 213 | come il 213 | sigilli |
| NTAG203 | NXP | 2 | 14443-A | 144 | 7 | blocco, OTP | 10k / 5 anni | NDEF | NDEF | lettura, scrittura, password | vecchie scorte |
| NTAG I2C plus | NXP | 2 | 14443-A | 888, 1912 | 7 | password | da 200k a 500k / 20 anni | NDEF, raw | NDEF, raw | identifica, lettura, scrittura | elettronica con un MCU |
| NTAG 223, 224 DNA | NXP | 2 | 14443-A | 144, 208 | 7 | password o AES, SUN | 100k / 10 anni | NDEF, raw | NDEF, raw | come Type 2 | autenticità a basso costo |
| NTAG 22x DNA StatusDetect | NXP | 2 | 14443-A | 144, 208 | 7 | come sopra, sensore | 100k / 10 anni | NDEF, raw | NDEF, raw | come Type 2 | sigilli e rilevamento |
| NTAG 413 DNA | NXP | 4 | 14443-4 | 160 | 7 | 3 chiavi AES, SUN | 200k / 50 anni | NDEF, APDU | NDEF, APDU | identifica | fuori produzione |
| NTAG 424 DNA | NXP | 4 | 14443-4 | 416 | 7 | 5 chiavi AES, SUN, LRP | 200k / 50 anni | NDEF, APDU | NDEF, APDU | configurazione completa | autenticità |
| NTAG 424 DNA TT | NXP | 4 | 14443-4 | 416 | 7 | come sopra, antimanomissione | 200k / 50 anni | NDEF, APDU | NDEF, APDU | configurazione completa | sigilli di autenticità |
| Ultralight | NXP | 2 | 14443-A | 48 | 7 | blocco, OTP | 10k / 5 anni | NDEF | NDEF | lettura, scrittura | fuori produzione |
| Ultralight C | NXP | 2 | 14443-A | 144 | 7 | 3DES | 100k / 10 anni | NDEF, raw | NDEF, raw | lettura, scrittura | vecchi biglietti |
| Ultralight EV1 | NXP | 2 | 14443-A | 48, 128 | 7 | password, 3 contatori | 100k / 10 anni | NDEF, raw | NDEF, raw | lettura, scrittura, password | biglietti, usa e getta |
| Ultralight AES | NXP | 2 | 14443-A | 144 | 7 | AES-128 | 100k / 10 anni | NDEF, raw | NDEF, raw | lettura, scrittura | Type 2 con autenticazione |
| Ultralight Nano | NXP | 2 | 14443-A | 40 | 7 | blocco, OTP | 100k / 10 anni | NDEF | NDEF | lettura, scrittura | biglietti di corsa singola |
| Classic Mini | NXP | nessuno | 14443-A | 224 | 4 | CRYPTO1 | 100k / 10 anni | UID | dipende dal controller | Android: lettura, formattazione | nessuno |
| Classic 1K, EV1 | NXP | nessuno | 14443-A | 752 | 4 o 7 | CRYPTO1 | 100k / 10 anni | UID | dipende dal controller | Android: lettura, formattazione | nessuno |
| Classic 4K, EV1 | NXP | nessuno | 14443-A | 3440 | 4 o 7 | CRYPTO1 | 100k / 10 anni | UID | dipende dal controller | Android: lettura, formattazione | nessuno |
| Plus SE | NXP | nessuno | 14443-A | 752 | 4 o 7 | AES in SL3 | 100k / 10 anni | UID | come Classic | identifica | migrazione dal Classic |
| Plus EV2 | NXP | nessuno | 14443-4 in SL3 | 1520, 3440 | 4 o 7 | AES-128, EAL5+ | 200k / 25 anni | ISO-DEP | IsoDep | identifica | controllo accessi |
| DESFire EV1 | NXP | 4 | 14443-4 | da 2304 a 7936 | 7 | DES, 3DES, AES | 200k / 10 anni | NDEF, APDU | NDEF, APDU | identifica, elenca i file | vecchi sistemi di trasporto |
| DESFire EV2 | NXP | 4 | 14443-4 | da 2560 a 16384 | 7 | AES, EAL5+ | 200k / 25 anni | NDEF, APDU | NDEF, APDU | identifica, elenca i file | controllo accessi |
| DESFire EV3 | NXP | 4 | 14443-4 | da 2560 a 16384 | 7 | AES, SUN, EAL5+ | 200k min, 1M tip. / 25 anni | NDEF, APDU | NDEF, APDU | identifica, elenca i file | controllo accessi, trasporti |
| DESFire Light | NXP | 4 | 14443-4 | 640 | 7 | AES, LRP, EAL4 | 200k / 10 anni | NDEF, APDU | NDEF, APDU | identifica | tessere con una sola applicazione |
| ICODE SLI | NXP | 5 | 15693 | 112 | 8 | blocco | 100k / 10 anni | NDEF, raw | NfcV | lettura, scrittura, formattazione | fuori produzione |
| ICODE SLI-S, SLI-L | NXP | 5 | 15693 | 160, 32 | 8 | password | 100k / 10 anni | NDEF, raw | NfcV | lettura, scrittura, formattazione | non più prodotti |
| ICODE SLIX | NXP | 5 | 15693 | 112 | 8 | password EAS/AFI | 100k / 50 anni | NDEF, raw | NfcV | lettura, scrittura, formattazione | scorte per biblioteche e logistica |
| ICODE SLIX-S, SLIX-L | NXP | 5 | 15693 | 160, 32 | 8 | password, privacy | 100k / 50 anni | NDEF, raw | NfcV | lettura, scrittura, formattazione | logistica |
| ICODE SLIX2 | NXP | 5 | 15693 | 316 | 8 | password, privacy, contatore, firma | 100k / 50 anni | NDEF, raw | NfcV | lettura, scrittura, formattazione | inventario, bobine OpenPrintTag |
| ICODE DNA | NXP | 5 | 15693 | 252 | 8 | AES-128 | 100k / 50 anni | NDEF, raw | NfcV | letto come ISO 15693 | protezione del marchio a distanza |
| ICODE 3 | NXP | 5 | 15693 | 300 | 8 | password, contatore degli avvicinamenti, mirror, firma | 100k / 50 anni | NDEF, raw | NfcV | letto come ISO 15693 | il chip attuale per l'inventario |
| NTAG 5 | NXP | 5 | 15693 | 512, 2048 | 8 | password, AES sul 5332 | 1M / 40 anni | NDEF, raw | NfcV | letto come ISO 15693 | elettronica connessa |
| ST25TN512, 01K | ST | 2 | 14443-A | 64, 160 | 7 | kill, codice di lettura, TruST25 | 100k / 40 anni | NDEF, raw | NDEF, raw | letto come Type 2 | l'alternativa all'NTAG213 |
| ST25TV512C, 02KC | ST | 5 | 15693 | 64, 320 | 8 | password, kill, privacy, codice di lettura, TruST25 | 100k / 60 anni | NDEF, raw | NfcV | identifica ST25TV, lettura, scrittura | etichette con un URL nuovo a ogni lettura |
| ST25TV16K, 64K | ST | 5 | 15693 | 2048, 8192 | 8 | password a 64 bit, kill | 1M / 40 anni | NDEF, raw | NfcV | lettura, scrittura | grande memoria Type 5 |
| Da ST25DV04K a 64K | ST | 5 | 15693 | da 512 a 8192 | 8 | password a 64 bit | 1M / 40 anni | NDEF, raw | NfcV | identifica ST25DV, lettura, scrittura | tag dinamici con un MCU |
| M24LR | ST | nessuno dichiarato | 15693 | da 512 a 8192 | 8 | password a 32 bit | 1M / 40 anni | NDEF, raw | NfcV | letto come ST25TV | vecchia doppia interfaccia |
| ST25TA02K, 02KB | ST | 4 | 14443-4 | 256 | 7 | password a 128 bit, contatore, TruST25 sul B | 1M / 200 anni | NDEF, APDU | NDEF, APDU | lettura, scrittura | Type 4 senza DESFire |
| ST25TA16K, 64K | ST | 4 | 14443-4 | 2048, 8192 | 7 | password a 128 bit | 1M / 200 anni | NDEF, APDU | NDEF, APDU | lettura, scrittura | grande memoria Type 4 |
| TI Tag-it HF-I Standard, Pro, Plus | TI | nessuno dichiarato | 15693 | 32, 32, 256 | 8 | blocco; il Pro aggiunge scrittura con password e kill | 100k / 10 anni | NDEF, raw | NfcV | identifica, lettura | vecchie biblioteche |
| EM4233 | EM | nessuno dichiarato | 15693 | 208 | 8 | chiave a 96 bit, privacy, distruzione | ? / 60 anni | NDEF, raw | NfcV | identifica, lettura | su richiesta |
| EM4425 em echo-V | EM | 5 | 15693 più UHF | fino a 256 | 8 | AES-128, password, antimanomissione | 100k / 50 anni | NDEF, raw | NfcV | letto come ISO 15693 | retail a doppia frequenza |
| Infineon my-d move | Infineon | 2 | 14443-A | 128 | 7 | password, contatore di valore | 100k / 10 anni | NDEF, raw | NDEF, raw | identifica, lettura | bigliettazione |
| Fudan FM11NT021 | Fudan | 2 | 14443-A | 144 | 7 | password, contatore | 500k dichiarati / 10 anni | NDEF, raw | NDEF, raw | letto come Type 2 generico | adesivi economici con un link |
| Fudan FM11RF08, 08S | Fudan | nessuno | 14443-A | 752 | 4 | CRYPTO1, con backdoor | ? | UID | dipende dal controller | come Classic | nessuno |
| Topaz 96, 512 | Innovision, Broadcom | 1 | 14443-A | 96, circa 480 | 7 | blocchi irreversibili | 10k / 5 anni | NDEF | NDEF | NDEF | vecchie scorte |
| FeliCa Lite-S | Sony | 3 | 18092, JIS X 6319-4 | 224 | 8 (IDm) | MAC 3DES | ? | NDEF, raw | NfcF | lettura, scrittura | Giappone |
| FeliCa Standard | Sony | 3 | 18092 | 4 kB | 8 | AES, EAL6+ | ? | NDEF, raw | NfcF | lettura, marchi | trasporti e denaro elettronico |
| Kovio NFC Barcode | Kovio, Thinfilm | nessuno | proprietario | 16 di sola lettura | nessuno | nessuna | n/d | no | NfcBarcode | no | scomparso |
| ST SRI512, SRT512, SRI4K | ST | nessuno | 14443-B | 64, 512 | 8 | contatori, blocco | 1M / 40 anni | no | NfcB | no | trasporti Type B |

</div>

---

## I confronti più cercati

**NTAG213 contro NTAG215 contro NTAG216.** Lo stesso chip in tre tagli di memoria: 144, 504 e 888 byte, con la stessa password, lo stesso contatore, lo stesso mirror e la stessa firma. Prendi il 213 per un link, il 215 per gli Amiibo, il 216 per un biglietto da visita o per non doverci pensare. La differenza di prezzo è di una trentina di centesimi.

**NTAG213 contro Ultralight EV1.** Stessa interfaccia radio e stessi comandi; l'NTAG ha il mirror ASCII e un capability container già scritto, l'EV1 ha tre contatori irreversibili ed esiste da 48 o da 128 byte. Per gli adesivi serve l'NTAG; per i biglietti, l'EV1.

**NTAG213 contro ST25TN01K contro Fudan FM11NT021.** Tre chip Type 2 tra 144 e 160 byte. L'NTAG ha una password e un contatore di letture e risponde a GET_VERSION; l'ST25TN ha più memoria, un comando kill, un codice di lettura e TruST25, ma niente password; il Fudan copia le funzioni dell'NTAG tranne GET_VERSION e, nel datasheet attuale, la firma. Per un semplice link va bene uno qualsiasi; per un contatore o per gli Amiibo, l'NTAG.

**MIFARE Classic contro DESFire.** Non c'è partita. Il cifrario del Classic è stato violato nel 2008 e il suo clone più diffuso è risultato avere una backdoor nel 2024; il DESFire EV3 ha AES, gestione delle chiavi, certificazione EAL5+ e SUN. L'unico argomento a favore del Classic è che il lettore sul muro è stato installato nel 2009.

**NTAG 424 DNA contro NTAG213.** Il 424 firma ogni lettura con AES-128 e memorizza 416 byte in tre file con cinque chiavi; il 213 memorizza 144 byte con una password a 32 bit. Se la domanda è "questo prodotto è autentico?", risponde solo il 424. Se la domanda è "questo adesivo apre un link?", il 213 lo fa a un terzo del prezzo.

**NTAG 424 DNA contro NTAG 223 DNA.** Entrambi fanno SUN. Il 424 è un Type 4 con cinque chiavi, LRP, un'opzione di UID casuale, un file vault e 50 anni di conservazione; il 223 è un adesivo Type 2 con una chiave SUN, una password a 32 bit e 10 anni. Il 223 è il modo più economico per mettere un URL firmato su un'etichetta; il 424 è quello che oggi un'app sa già configurare.

**ICODE SLIX2 contro NTAG216 per l'inventario.** Se l'unico lettore è un telefono, l'NTAG216 ha più memoria e il contatore. Se di mezzo c'è un varco o un lettore palmare, lo SLIX2 si legge a un metro e l'NTAG a quattro centimetri, e la scelta è fatta.

**FeliCa contro NTAG in Giappone.** Un tornello dei trasporti giapponesi parla FeliCa e nient'altro; un telefono giapponese legge entrambi. Per un tag su un poster a Tokyo, l'NTAG va benissimo. Per qualunque cosa debba accettare un lettore Suica serve FeliCa, e non è un chip che si programma con un'app sul telefono.

---

## Domande frequenti

### Meglio comprare l'NTAG215 o l'NTAG216?

Il 216, a meno che tu non debba scrivere degli Amiibo. Ha 888 byte contro i 504 del 215, la stessa password, lo stesso contatore, lo stesso mirror e lo stesso supporto sui telefoni. Il 215 si trova in tutti i negozi perché lo usano le statuine di Nintendo, e se il lavoro è quello è l'unica scelta possibile.

### Un iPhone può leggere i tag MIFARE Classic?

Può vedere che ce n'è uno. Core NFC legge l'UID e il SAK e si ferma lì; l'API di Apple non ha una famiglia Classic e la sua documentazione dice che il comando MIFARE "doesn't support the Crypto1 protocol". Su un iPhone nessuna app può leggere un settore. I telefoni Android con un controller NFC di NXP possono farlo; quelli con certi altri controller no, e su quei telefoni la classe `MifareClassic` semplicemente non compare.

### Quante volte si può riscrivere un tag NFC?

100.000 volte per qualunque chip attuale di NXP o ST a temperatura ambiente, e i valori dei datasheet sono minimi garantiti. Un DESFire EV3 o un ST25DV sono dichiarati per un milione. Il vecchio NTAG203, l'Ultralight originale e il Topaz erano dichiarati per 10.000. Nessuno riscrive un adesivo diecimila volte; il numero conta per i contatori e per i tag che registrano dati.

### A che distanza funziona un tag NFC?

Da un telefono, fino a circa quattro centimetri per un'antenna grande come una tessera e circa due per un adesivo piccolo, nel punto giusto del telefono. La definizione dell'NFC Forum dice "fino a 2 cm". Un tag ISO 15693 con un lettore a varco e un'antenna grande funziona a un metro, ma un telefono lo legge agli stessi pochi centimetri di qualunque altro tag, forse il doppio rispetto a un Type 2.

### I tag NFC scadono o si consumano?

I dati del chip sono garantiti per 10 anni sulla maggior parte dei chip consumer, 50 sull'NTAG 424 DNA e sulla famiglia ICODE SLIX, 60 sugli ST25TV e 200 sugli ST25TA, sempre a temperatura ambiente. Il calore accorcia questi tempi. Nella pratica l'adesivo, la faccia in carta e l'antenna cedono molto prima dell'EEPROM.

### I tag NFC economici dei marketplace sono un acquisto sicuro?

Sicuri sì; quello che dichiarano, non sempre. Un "NTAG213" economico è spesso un Fudan FM11NT021, che funziona per un link e fallisce con tutto ciò che chiede GET_VERSION. Un "NTAG215" economico spesso non lo è, e gli Amiibo lo rifiuteranno. Controlla codice del produttore e nome del chip nell'app prima di scriverci qualcosa, e compra da un negozio che indica il chip.

### Il telefono può leggere la carta bancaria o il passaporto con un'app NFC?

Il passaporto sì: usando come chiave la zona a lettura ottica, un'app può leggere i gruppi di dati del chip, e NFC.cool lo fa su entrambe le piattaforme. La carta bancaria è una smart card EMV; un'app può leggerne l'elenco delle applicazioni e alcuni record pubblici, ma Apple blocca la lettura delle carte di pagamento in Core NFC, il codice di sicurezza della carta non sta sul chip e ogni transazione è firmata con una chiave che non lascia mai la carta, quindi non c'è niente da copiare.

### Perché il badge dell'ufficio o la chiave dell'hotel non compaiono nell'app?

La maggior parte dei badge aziendali sono tessere di prossimità a 125 kHz, che la bobina a 13,56 MHz di un telefono non riesce nemmeno a percepire. La maggior parte delle chiavi d'albergo e delle vecchie tessere dei trasporti sono MIFARE Classic, che un iPhone può solo identificare e un telefono Android può leggere solo con il controller giusto e le chiavi giuste. In nessuno dei due casi un'app può risolvere il problema, e preferisco dirlo piuttosto che venderti un ripiego.

### Si può sbloccare un tag NFC reso di sola lettura?

No. I bit di blocco di un tag Type 2 o Type 5 sono bit irreversibili nel chip; lo stesso vale per il flag di sola lettura nel capability container. Una password si può rimuovere se la conosci; un blocco no. Ecco perché NFC.cool chiede conferma due volte prima di bloccare qualunque cosa.

### La password degli NTAG è vera sicurezza?

Ferma chi ha un'app gratuita, cioè quasi tutti. Non ferma chi ha un lettore in grado di ascoltare, perché la password a 32 bit viaggia via radio senza crittografia e il tag risponde con una conferma a 16 bit. Per tutto ciò che deve resistere a un attaccante motivato, la scala parte da AES: Ultralight AES per un adesivo Type 2, NTAG 424 DNA se è l'avvicinamento stesso a dover dimostrare qualcosa.

### Che tag serve per gli Amiibo?

Un NTAG215, e solo un NTAG215. La console chiede GET_VERSION, si autentica con una password derivata dall'UID e legge tutte le 135 pagine. Un chip senza GET_VERSION o con un numero di pagine diverso si ferma al primo comando. Scrivere un Amiibo su un tag è un'operazione permanente, perché i byte di blocco e la password fanno parte del formato.

### Quale tag NFC funziona su una superficie metallica?

Qualunque chip in formato on-metal, cioè con un foglio di ferrite tra l'antenna e il metallo. Un tag normale attaccato all'acciaio non si legge proprio; un tag on-metal si legge a circa quattro quinti della sua portata normale. Se tra un tag normale e il metallo riesci a mettere tre millimetri di qualunque materiale non metallico, funziona anche così.

### NFC.cool funziona su iPad e Mac?

Sì, dalla versione 6.15.0, tramite un lettore USB per smart card; nessuno dei due dispositivi ha una radio NFC propria. L'HID OMNIKEY 5022 CL è quello che ho provato io, e secondo le segnalazioni funzionano anche l'ACS ACR1552U e l'ACR1255U-J1. Tutto ciò che funziona con il telefono su Type 2, Type 4 e FeliCa funziona anche con il lettore, con MIFARE Classic in sola lettura.

---

## Glossario

| Termine | Significato |
| --- | --- |
| AFI | Application Family Identifier, un byte dei tag ISO 15693 che permette a un lettore di fare l'inventario solo dei tag di un certo tipo |
| APDU | Application Protocol Data Unit, il formato di comandi e risposte di ISO 7816-4, usato da tutti i chip ISO-DEP |
| ATQA | Answer To Request, i primi due byte inviati da un chip di Type A; NXP dice di non usarli per identificare i chip |
| AUTH0 | il byte di configurazione degli NTAG che indica la prima pagina protetta da password |
| AUTHLIM | l'impostazione degli NTAG che blocca il tag dopo un numero scelto di tentativi di password falliti |
| CC | Capability Container, i quattro byte (o il file, sui Type 4) che dicono a un lettore che il tag contiene NDEF e quanto |
| CMAC | un codice di autenticazione del messaggio calcolato con AES; è ciò che rende impossibile falsificare un messaggio SUN |
| CRYPTO1 | il cifrario a flusso proprietario a 48 bit di NXP nel MIFARE Classic, violato nel 2008 |
| DSFID | Data Storage Format Identifier, un byte ISO 15693 che descrive come è organizzata la memoria |
| EAS | Electronic Article Surveillance, il bit dei tag ISO 15693 che fa scattare l'allarme del varco di un negozio |
| GET_VERSION | il comando NXP che restituisce otto byte con produttore, tipo, generazione e dimensione del chip |
| ISO-DEP | il protocollo di trasporto ISO/IEC 14443-4; un chip che lo parla risponde SAK 20 e accetta APDU |
| Modulazione di carico | il modo in cui un tag passivo invia i dati: inserendo e disinserendo un carico sulla propria antenna, cosa che il lettore percepisce nel proprio campo |
| LRP | Leakage Resilient Primitive, una modalità AES dell'NTAG 424 DNA e del DESFire Light che resiste agli attacchi side-channel |
| MAD | MIFARE Application Directory, il settore 0 di una tessera Classic che elenca cosa contengono gli altri settori |
| Mirror | la funzione degli NTAG che a ogni lettura incolla UID e contatore in ASCII nel messaggio NDEF |
| NDEF | NFC Data Exchange Format, il contenitore di record che ogni telefono sa leggere |
| NUID | Non-Unique Identifier, il nome con cui NXP chiama un UID da 4 byte |
| OTP | One Time Programmable, bit che si possono impostare una volta e mai più azzerare |
| PACK | Password Acknowledge, i due byte che un NTAG restituisce dopo una password corretta |
| PICC, PCD | i nomi che gli standard danno alla tessera e al lettore |
| Random ID | una modalità in cui il chip risponde all'anticollisione ogni volta con un nuovo ID casuale da 4 byte, per la privacy |
| READ_SIG | il comando che restituisce la firma di originalità di un chip |
| SAK | Select Acknowledge, il byte che un chip di Type A restituisce dopo la selezione; i suoi bit smistano i chip in famiglie |
| SDM | Secure Dynamic Messaging, il meccanismo dell'NTAG 424 DNA e del DESFire EV3 alla base di SUN |
| SUN | Secure Unique NFC, un URL che a ogni lettura porta con sé una nuova prova crittografica |
| T5T, T2T, T4T | le abbreviazioni dell'NFC Forum per i tag Type 5, Type 2 e Type 4 |
| TLV | Tag-Length-Value, la cornice intorno a un messaggio NDEF sui chip Type 2 e Type 5 |
| TruST25 | la firma di originalità di ST sull'UID |
| UID | l'identificativo del chip programmato in fabbrica, da 4, 7 o 8 byte |

---

## Fonti e approfondimenti

Ogni tabella di questa guida è stata verificata con una di queste fonti. I prezzi vengono dai negozi citati nella sezione sugli acquisti e sono aggiornati al 9 settembre 2026.

**NXP NTAG**

- [Datasheet NTAG213/215/216, Rev 3.2](https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf)
- Datasheet di [NTAG210/212](https://www.nxp.com/docs/en/data-sheet/NTAG210_212.pdf), [NTAG 210µ](https://www.nxp.com/docs/en/data-sheet/NT2L1001_NT2H1001.pdf), [NTAG213F/216F](https://www.nxp.com/docs/en/data-sheet/NTAG213F_216F.pdf) e [NTAG 213 TT](https://www.nxp.com/docs/en/data-sheet/NT2H1311TT.pdf)
- Datasheet di [NTAG 223 DNA](https://www.nxp.com/docs/en/data-sheet/NT2H2331G0.pdf) e [NTAG 224 DNA StatusDetect](https://www.nxp.com/docs/en/data-sheet/NT2H2421S0.pdf)
- Datasheet di [NTAG 424 DNA](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf) e [NTAG 424 DNA TagTamper](https://www.nxp.com/docs/en/data-sheet/NT4H2421Tx.pdf), e [AN12196, la nota su funzioni e suggerimenti del 424 con la chiave pubblica di originalità](https://www.nxp.com/docs/en/application-note/AN12196.pdf)
- Datasheet di [NTAG I2C plus](https://www.nxp.com/docs/en/data-sheet/NT3H2111_2211.pdf) e [NTAG 5 boost](https://www.nxp.com/docs/en/data-sheet/NTA5332.pdf)
- [AN13089, funzioni e suggerimenti per gli NTAG 21x](https://www.puntoflotante.net/AN13089.pdf), sul perché una firma di originalità statica non garantisce contro i cloni (copia su un altro sito; la versione su nxp.com non è pubblica)

**NXP MIFARE**

- Datasheet di [MIFARE Ultralight](https://www.nxp.com/docs/en/data-sheet/MF0ICU1.pdf), [Ultralight C](https://www.nxp.com/docs/en/data-sheet/MF0ICU2.pdf), [Ultralight EV1](https://www.nxp.com/docs/en/data-sheet/MF0ULX1.pdf) e [Ultralight AES](https://www.nxp.com/docs/en/data-sheet/MF0AES(H)20.pdf)
- Datasheet di [MIFARE Classic EV1 1K](https://www.nxp.com/docs/en/data-sheet/MF1S50YYX_V1.pdf) e [Classic EV1 4K](https://www.nxp.com/docs/en/data-sheet/MF1S70YYX_V1.pdf)
- Datasheet sintetici di [MIFARE Plus S](https://www.nxp.com/docs/en/data-sheet/MF1SPLUSX0Y1_SDS.pdf), [Plus SE](https://www.nxp.com/docs/en/data-sheet/MF1SEP_H_10X1_SDS.pdf) e [Plus EV2](https://www.nxp.com/docs/en/data-sheet/MF1P(H)x2.pdf)
- Datasheet di [DESFire EV1](https://www.nxp.com/docs/en/data-sheet/MF3ICDX21_41_81_SDS.pdf), [DESFire EV2](https://www.nxp.com/docs/en/data-sheet/MF3DX2_MF3DHX2_SDS.pdf), [DESFire EV3](https://www.nxp.com/docs/en/data-sheet/MF3D_H_X3_SDS.pdf) e [DESFire Light](https://www.nxp.com/docs/en/data-sheet/MF2DLHX0.pdf), e [AN12752 sulla memoria utilizzabile del DESFire](https://www.nxp.com/docs/en/application-note/AN12752.pdf)
- [AN10833, identificazione dei tipi MIFARE](https://www.nxp.com/docs/en/application-note/AN10833.pdf), [AN10927, gli UID MIFARE](https://www.nxp.com/docs/en/application-note/AN10927.pdf), [AN1305, NDEF su MIFARE Classic](https://www.nxp.com/docs/en/application-note/AN1305.pdf), [AN10787, la MIFARE Application Directory](https://www.nxp.com/docs/en/application-note/AN10787.pdf), [AN11004, il DESFire come tag Type 4](https://www.nxp.com/docs/en/application-note/AN11004.pdf)

**NXP ICODE**

- Datasheet di [ICODE SLIX](https://www.nxp.com/docs/en/data-sheet/SL2S2002_SL2S2102.pdf), [SLIX-S](https://www.nxp.com/docs/en/data-sheet/SL2S5302_SL2S5402.pdf), [SLIX-L](https://www.nxp.com/docs/en/data-sheet/SL2S5002_SL2S5102.pdf), [SLIX2](https://www.nxp.com/docs/en/data-sheet/SL2S2602.pdf), [ICODE DNA](https://www.nxp.com/docs/en/data-sheet/SL2S6002_SDS.pdf) e [ICODE 3](https://www.nxp.com/docs/en/data-sheet/SL2S3003_SL2S3003TT.pdf)
- [AN11809, il confronto tra i chip della famiglia ICODE](https://www.nxp.com/docs/en/application-note/AN11809.pdf)

**STMicroelectronics, TI, EM, Sony, Fudan**

- Datasheet ST di [ST25TV02KC](https://www.st.com/resource/en/datasheet/st25tv02kc.pdf), [ST25TN01K](https://www.st.com/resource/en/datasheet/st25tn01k.pdf), [ST25DV64KC](https://www.st.com/resource/en/datasheet/st25dv64kc.pdf), [ST25TA02KB](https://www.st.com/resource/en/datasheet/st25ta02kb.pdf) e [M24LR64E-R](https://www.st.com/resource/en/datasheet/m24lr64e-r.pdf), [AN5658 sull'Augmented NDEF](https://www.st.com/resource/en/application_note/an5658-augmented-ndef-messages-with-st25tv512c-and-st25tv02kc-devices-stmicroelectronics.pdf) e [TA0358 su TruST25](https://www.st.com/resource/en/technical_article/ta0358-developing-supply-chain-confidence-with-trust25-digital-signature-in-rfidnfc-tags-stmicroelectronics.pdf)
- Datasheet TI Tag-it HF-I [Standard](https://www.ti.com/lit/ds/scbs828c/scbs828c.pdf), [Pro](https://www.ti.com/lit/ds/scbs822c/scbs822c.pdf) e [Plus](https://www.ti.com/lit/ds/scbs827b/scbs827b.pdf)
- EM Microelectronic [EM4233](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em4233), [EM4423](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em-echo-em4423) ed [EM4425](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em-echo-v)
- Sony, [datasheet FeliCa Lite-S](https://www.sony.co.jp/en/Products/felica/business/data/RC-S966_E.pdf) e [FeliCa Standard RC-SA01](https://www.sony.co.jp/en/Products/felica/business/products/RC-SA01.html)
- [Datasheet Fudan FM11NT021](https://github.com/user-attachments/files/16667599/FM11NT021_sds_eng.pdf)

**Ricerca sulla sicurezza e standard**

- Quarkslab, [MIFARE Classic: exposing the static encrypted nonce variant and a few hardware backdoors](https://blog.quarkslab.com/mifare-classic-static-encrypted-nonce-and-backdoors.html) (2024)
- Nohl, Evans, Starbug e Plötz, [Reverse-Engineering a Cryptographic RFID Tag](https://www.usenix.org/legacy/event/sec08/tech/full_papers/nohl/nohl.pdf) (USENIX Security 2008)
- Garcia et al., [Dismantling MIFARE Classic](https://link.springer.com/chapter/10.1007/978-3-540-88313-5_7) (ESORICS 2008)
- [ISO/IEC JTC1/SC17 Standing Document 5, il registro dei produttori di circuiti integrati](https://www.aimglobal.org/wp-content/uploads/2022/04/ISO_IEC_JTC1_SC17_Standing_Document_5_Register_of_IC_Manufacturers.pdf)
- [Le note di Proxmark3 sulle tessere magic](https://github.com/RfidResearchGroup/proxmark3/blob/master/doc/magic_cards_notes.md) e [3dbrew sulla struttura del tag Amiibo](https://www.3dbrew.org/wiki/Amiibo)
- L'NFC Forum sulla [tecnologia](https://nfc-forum.org/learn/nfc-technology/) e sulla [specifica dei tag Type 2](https://nfc-forum.org/build/specifications/type-2-tag-specification/)

**Telefoni e lettori**

- Apple: [Core NFC](https://developer.apple.com/documentation/corenfc), [lettura dei tag in background](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading), [il comando MIFARE che esclude CRYPTO1](https://developer.apple.com/documentation/corenfc/nfcmifaretag/sendmifarecommand(commandpacket:completionhandler:)) e [la sessione 715 della WWDC 2019](https://developer.apple.com/videos/play/wwdc2019/715/)
- Android: [MifareClassic](https://developer.android.com/reference/android/nfc/tech/MifareClassic), [la guida NFC avanzata](https://developer.android.com/develop/connectivity/nfc/advanced-nfc) e [Web NFC in Chrome](https://developer.chrome.com/docs/capabilities/nfc)
- Lettori: [ACS ACR122U](https://www.acs.com.hk/download-manual/418/TSP-ACR122U-3.06.pdf), [HID OMNIKEY 5022 CL](https://www.hidglobal.com/doclib/files/resource_files/eat-omnikey-5022-usb-reader-ds-en.pdf), [NXP PN532](https://www.nxp.com/docs/en/nxp/data-sheets/PN532_C1.pdf), [Proxmark3](https://github.com/RfidResearchGroup/proxmark3), [Flipper Zero](https://docs.flipper.net/nfc) e [Chameleon Ultra](https://github.com/RfidResearchGroup/ChameleonUltraDocs)
- Antenne e ferrite: [TI SLOA241](https://www.ti.com/lit/an/sloa241b/sloa241b.pdf) e [Würth ANP022](https://www.mouser.com/pdfdocs/Selection_and_Characteristics_of_WEFSFS_APPNOTE.PDF)

---

## In sintesi

Abbina il chip al lavoro. Un NTAG213 per un link, un NTAG216 quando non sei sicuro, un NTAG215 per gli Amiibo, un NTAG 424 DNA quando un avvicinamento deve dimostrare qualcosa, un ICODE SLIX2 o un ICODE 3 quando a leggerlo deve essere un varco, un DESFire EV3 quando deve fidarsene una porta, e niente di niente dallo scaffale dei MIFARE Classic. Tutto il resto di questa guida è il ragionamento dietro questa frase, e le tabelle sono lì perché tu non debba mai più fidarti sulla parola di un annuncio.

Se vuoi vedere cos'è davvero un tag prima di scriverci sopra, è quello che fa [NFC.cool Tools](/features/nfc-reader-writer/) a ogni avvicinamento, su [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ultimate-nfc-tag-guide-it&mt=8), su [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ultimate-nfc-tag-guide-it) e su iPad o Mac con un lettore collegato. E se sulla scrivania hai un chip a cui l'app dà il nome sbagliato, o a cui non ne dà proprio nessuno, scrivimi. È così che la maggior parte di quei sessanta è finita nell'elenco.
