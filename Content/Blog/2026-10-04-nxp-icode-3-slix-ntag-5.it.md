---
id: "nxp-icode-3-2026-10"
title: "ICODE 3, SLIX, ICODE DNA e NTAG 5 ora funzionano con NFC.cool su iPhone"
date: "2026-10-04"
tags: ["announcements", "nfc-tags", "iphone"]
summary: "NFC.cool Tools 7.1.0 ora capisce i chip NXP ICODE: legge, verifica e gestisce i tag ICODE 3, la famiglia SLIX, ICODE DNA e NTAG 5 su iPhone, e su iPad e Mac con un lettore esterno. Ecco cosa sanno fare questi chip da biblioteca e da negozio, e la stranezza di iOS che per poco non mi ha convinto che il mio codice fosse rotto."
image: "/assets/images/Blog/nxp-icode-3-slix-ntag-5.webp"
imageAlt: "Un libro della biblioteca con un'etichetta RFID all'interno della copertina, accanto a un iPhone che mostra i dettagli di un tag NFC"
author: "Nicolo Stanciu"
metaTitle: "Tag NXP ICODE 3 e SLIX su iPhone: leggerli e gestirli"
metaDescription: "NFC.cool ora legge e gestisce i tag NXP ICODE 3, SLIX, SLIX2, ICODE DNA e NTAG 5 su iPhone: password, contatore, flag antitaccheggio, modalità privacy e altro."
ogTitle: "ICODE 3, SLIX e NTAG 5 ora funzionano su iPhone"
ogDescription: "Cosa sanno fare i chip NXP da biblioteca e da negozio, e come NFC.cool li legge e li gestisce su iPhone, iPad e Mac."
---

Avevo un tag ICODE 3 sulla scrivania, l'iPhone appoggiato sopra, e l'app leggeva senza problemi tutto quello che il chip aveva da dire: l'ID, la memoria, il contatore delle letture, la firma di NXP che ne dimostrava l'autenticità. Poi le ho chiesto di cambiare una sola cosa, il contatore, e l'app mi ha risposto che il tag si era allontanato.

Non si era mosso di un millimetro. Ho riprovato. Stesso messaggio. Allora ho provato a impostare una password. Stesso messaggio.

Tra poco ti racconto cosa stava succedendo, perché è il bug più interessante a cui ho dato la caccia quest'anno. Prima però ti spiego perché stavo armeggiando con un tag ICODE.

Voglio che NFC.cool sia l'app NFC più completa che si possa installare su un telefono. Quest'estate questo ha voluto dire [NTAG 424 DNA](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/), i tag che i marchi usano per dimostrare che un prodotto è originale. Dopo, la famiglia di chip più grande con cui l'app non riusciva ancora a dialogare davvero era quella degli ICODE di NXP. Con **NFC.cool Tools 7.1.0**, adesso ci riesce.

---

## ICODE, i tag che hai già avuto in mano senza saperlo

Se negli ultimi vent'anni hai preso in prestito un libro in biblioteca, è molto probabile che tu abbia avuto in mano un tag ICODE. È quell'etichetta piatta con un'antenna a spirale, incollata all'interno della copertina. Gli stessi chip si trovano nelle etichette antitaccheggio dei negozi, nei tag per lavanderia e sui cartellini dei prodotti.

Tecnicamente sono chip **ISO 15693**, quelli che in ambito NFC si chiamano tag di **Tipo 5**. Gli adesivi NFC che si comprano di solito, come l'NTAG215, seguono un altro standard. Per me è come avere due emittenti che trasmettono sulla stessa banda: l'iPhone le riceve tutte e due, ma una volta sintonizzato si trova davanti due lingue diverse.

Biblioteche e negozi scelgono gli ICODE per la portata. Un'antenna grande, come quella dei varchi di una biblioteca o di una postazione self-service, li legge da più lontano di un normale adesivo NFC. Con il telefono devi comunque avvicinarti parecchio, perché l'antenna dell'iPhone è minuscola, ma il chip è progettato per quei varchi.

Leggere il link o il testo salvato su un tag ICODE non è mai stato il problema. Le cose interessanti stanno un livello più sotto: password, un contatore, il flag antitaccheggio, una modalità privacy. Fino a oggi NFC.cool a quella parte del chip non aveva accesso.

---

## Cosa fa NFC.cool con un ICODE 3

**ICODE 3** è il chip più recente della famiglia e il successore dell'ICODE SLIX2. Online lo trovi spesso in vendita come "SLIX 3". NXP non ha nessun chip con quel nome, quindi se un annuncio parla di SLIX 3, si tratta di un ICODE 3.

Scansionane uno con NFC.cool e hai il quadro completo: di che chip si tratta, la memoria, il contatore e se è un **NXP originale**. NXP firma l'ID di ogni chip in fabbrica e l'app verifica quella firma, quindi una copia che riutilizza lo stesso ID non può falsificarla.

Da lì cambi quasi tutto quello che il chip mette a disposizione:

- **Contatore delle letture.** L'ICODE 3 sa contare da solo ogni singola lettura. Attiva il mirror NFC e il chip scrive il proprio ID e il conteggio attuale dentro il link salvato, così ogni avvicinamento apre un URL leggermente diverso che un sito web può contare. Se hai letto del [contatore degli avvicinamenti NFC](/blog/count-nfc-tag-scans/), è la stessa idea su un chip diverso.
- **Password.** L'ICODE 3 ne ha sei, ciascuna con il suo compito: lettura, scrittura, privacy, distruzione, impostazioni antitaccheggio e configurazione. Ogni tag esce dalla fabbrica con gli stessi valori predefiniti, quindi una protezione ha senso solo dopo che hai impostato le tue. NFC.cool conserva le password nel Portachiavi iCloud, tag per tag.
- **Protezione della memoria.** La memoria si può dividere in due parti da proteggere separatamente, per esempio lasciando leggibile a tutti un link pubblico e nascondendo i dati che lo seguono.
- **Antitaccheggio e impostazioni per le biblioteche.** Il flag EAS è quello che fa suonare il varco di un negozio o di una biblioteca. Il byte AFI è quello che le biblioteche usano per segnare che un libro è in prestito. Si possono modificare entrambi, e anche bloccare.
- **Modalità privacy.** Il tag nasconde ID e dati finché qualcuno non fornisce la password relativa.
- **Rilevamento delle manomissioni** sulla versione SL2S3003TT, che ha un filo da far passare sopra il tappo di una bottiglia o sul sigillo di una scatola. L'app ti dice se il sigillo è mai stato rotto.
- **Una firma tutta tua.** Un marchio può sostituire la firma di NXP con la propria e bloccarla.
- **Distruzione.** Spegne il chip per sempre, per tutelare la privacy quando un prodotto arriva a fine vita.

Diverse di queste impostazioni sono definitive, e alcune possono rendere un tag inaccessibile da iPhone. Per questo, prima di qualsiasi operazione irreversibile, NFC.cool ti chiede di digitare gli ultimi quattro caratteri dell'ID del tag. E si rifiuta di modificare un tag diverso da quello da cui sei partito. Io comunque proverei ogni novità prima su un tag di scorta.

Una piccola cosa che ho sistemato strada facendo: ora dall'app puoi formattare un tag ICODE vuoto come tag NFC, così è pronto per un link o un testo.

---

## Il resto della famiglia

L'app riconosce il chip che hai in mano e ti propone solo quello che quel chip sa fare davvero. Un vecchio SLIX ti mostra meno opzioni di un ICODE 3, semplicemente perché ha meno funzioni.

- **SLIX, SLIX-S, SLIX-L, SLIX2** e i vecchi **SLI** sono i chip che fanno il grosso del lavoro nella maggior parte delle biblioteche. Lo SLIX2 ha il contatore e la protezione della memoria. Lo SLIX-S protegge la memoria pagina per pagina e supporta password a 64 bit, con cui ogni accesso protetto richiede sia la password di lettura sia quella di scrittura.
- **ICODE DNA** è il membro della famiglia pensato per la sicurezza. Custodisce chiavi AES segrete che non lasciano mai il chip. Inserisci la chiave in NFC.cool e l'app sfida il chip a dimostrare di possederla. Una copia non supera la prova nemmeno quando ID e memoria coincidono alla perfezione.
- **NTAG 5** è quello che mi entusiasma di più, da smanettone quale sono. È un chip NFC pensato per stare su un circuito stampato. Lo **switch** pilota direttamente dei pin, mentre il **link** e il **boost** dialogano con un microcontrollore via I2C. Possono alimentare un piccolo circuito con il solo campo NFC del telefono, segnalare eventi su un pin e condividere 256 byte di memoria con la scheda. NFC.cool legge e modifica queste impostazioni, e su NTP5332 e NTA5332 riesce perfino a dialogare con i sensori collegati al chip, direttamente dall'iPhone.

Trovi tutto negli strumenti NFC, sotto **NXP ICODE e NTAG 5**, proprio accanto a NTAG 424 DNA. Oppure scansiona un tag ICODE e l'app ne apre i dettagli da sola.

---

## Il bug che iOS non voleva farmi risolvere

Torniamo alla mia scrivania e al tag che "si era allontanato".

Lo standard ISO 15693 offre al telefono due modi per parlare con un tag. Può scrivere l'ID del tag su ogni singolo messaggio, come il nome del destinatario su una busta, così risponde solo quel tag. Oppure può prima **selezionare** il tag, come quando in una stanza piena di gente ti giri verso una persona precisa, e da lì in poi parlare e basta.

Il metodo della busta è il più pulito, quindi NFC.cool prova prima quello. Per capire se funzionava, l'app mandava un rapido messaggio di prova con l'ID del tag. Il tag rispondeva, l'app ne deduceva che i messaggi indirizzati funzionavano e andava avanti.

Ecco cosa non sapevo. iOS divide questi comandi in due gruppi: quelli standard, che ogni chip ISO 15693 capisce, e i comandi proprietari di NXP, quelli per le password, il contatore e la configurazione. Quando un messaggio indirizzato contiene uno dei comandi proprietari di NXP, iOS si rifiuta di inviarlo. Il messaggio non esce mai dal telefono. iOS restituisce in silenzio un errore di "parametro non valido", e per il mio codice quell'errore era indistinguibile da un tag che si era allontanato.

Il mio messaggio di prova usava un comando standard, quindi filava liscio e mi diceva che era tutto a posto. Ogni modifica vera usava un comando NXP, quindi ogni modifica vera falliva.

Una volta capito il problema, la soluzione si è rivelata di una semplicità disarmante. Adesso la prova usa uno dei comandi proprietari di NXP, uno innocuo che chiede al chip soltanto un numero casuale. Se iOS lo rifiuta, l'app passa a selezionare il tag. Ho rimesso l'ICODE 3 sotto l'iPhone, ho toccato **Imposta contatore** e il numero sul tag è cambiato. Di rado un contatore che si muove mi ha reso così felice.

---

## Dove funziona

Su iPhone tutto questo funziona con il lettore NFC integrato nel telefono. Su iPad e Mac, che non hanno un chip NFC, funziona tramite un [lettore NFC USB esterno](/blog/nfc-reading-ipad-mac/). Il lettore deve inoltrare i comandi ICODE direttamente al tag. Se il tuo lo fa, l'app legge e gestisce i tag ICODE esattamente come su iPhone, e il bug di cui ti ho appena parlato lì non esiste proprio. Con un lettore che non li inoltra, la memoria del tag la leggi comunque.

L'app per Android non supporta ancora gli ICODE.

Se hai un cassetto pieno di tag da biblioteca con cui non sei mai riuscito a combinare granché, o una scheda NTAG 5 che aspetta il suo progetto, aggiorna alla 7.1.0 e prova a scansionarne uno. NFC.cool Tools lo trovi sull'[App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nxp-icode-3-slix-ntag-5-it&mt=8).
