---
id: "check-transit-card-balance-iphone-2026-11"
title: "Come controllare il saldo delle carte IC e dei trasporti con l'iPhone: Suica, Octopus, T-money e altre"
date: "2026-11-22"
tags: ["guides", "iphone", "privacy"]
summary: "Avvicina all'iPhone una carta IC, dei trasporti o di moneta elettronica come Suica, Octopus o T-money e NFC.cool ti mostra il saldo e gli ultimi viaggi. Ecco tutte le carte che legge, cosa rivela una carta bancaria e cosa potrebbe leggere chiunque dalla tua."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/check-transit-card-balance-iphone-v4.webp"
imageAlt: "Un iPhone che mostra il saldo e il grafico di una carta dei trasporti mentre gli si avvicina una carta IC verde, con altre due carte dei trasporti davanti"
metaTitle: "Saldo delle carte IC e dei trasporti su iPhone: Suica e altre"
metaDescription: "Controlla saldo e viaggi delle carte IC, dei trasporti e di moneta elettronica come Suica, PASMO, Octopus, T-money, Clipper e Opal sull'iPhone. Tutte le carte che NFC.cool legge."
ogTitle: "Controlla il saldo delle carte IC e dei trasporti con l'iPhone"
ogDescription: "Suica, Octopus, T-money, Navigo, Clipper e tante altre carte IC: avvicina la carta all'iPhone e vedi il saldo, i viaggi e cosa può leggerci chiunque."
---
Per anni nella mia casella di posta ha continuato ad arrivare lo stesso tipo di email, in una dozzina di lingue e con una dozzina di nomi di carte diversi. "La tua app non legge la mia carta di moneta elettronica." "Non vede la mia carta IC." "Ho avvicinato il biglietto della metro al telefono e non è successo niente."

Non avevano torto. NFC.cool trovava il chip, [ne mostrava l'ID e il tipo](/it/features/nfc-reader-writer/) e si fermava lì. A chi aveva in mano una carta con dei soldi sopra, sembrava che l'app si fosse arresa. In fondo il saldo che cercavano era proprio lì, sulla carta.

La versione 7.4.0 di [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-it&mt=8) è la mia risposta a quelle email. Avvicina all'iPhone una carta dei trasporti, una carta di moneta elettronica o una carta bancaria: ora l'app mostra il saldo, gli ultimi viaggi e, cosa altrettanto interessante, tutto quello che chiunque altro potrebbe leggerci. Si parte dall'iPhone, e [NFC.cool Tools per Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-check-transit-card-balance-iphone-it) (a breve) avrà la stessa lettura delle carte.

---

## Perché le carte NFC non sono tutte uguali

Tutte queste carte [parlano con il telefono tramite NFC](/it/blog/nfc-on-iphones-insider-look/). E qui finiscono le somiglianze.

Io la vedo così: l'NFC è solo il portone d'ingresso. Dietro, ogni carta è un edificio a sé, con la sua pianta e le sue stanze chiuse a chiave. Le carte giapponesi funzionano con **FeliCa** di Sony. Molte carte dei trasporti europee usano **Calypso**. San Francisco, Sydney e Helsinki usano [**MIFARE DESFire**](/it/blog/ultimate-nfc-tag-guide/#mifare-classic-plus-e-desfire-la-famiglia-del-controllo-accessi), ognuna con un'organizzazione interna diversa. Le carte bancarie parlano **EMV**, lo stesso standard del terminale alla cassa del supermercato.

E dentro ogni edificio è l'operatore a decidere quali stanze lasciare aperte. Alcuni lasciano il saldo e gli ultimi venti viaggi dove chiunque può entrare. Altri chiudono tutte le porte, e la chiave ce l'hanno solo i loro tornelli e le loro biglietterie automatiche. Nessuna app riesce a superare quel blocco, e NFC.cool non ci prova nemmeno: si limita a leggere, non usa chiavi e sulla carta non scrive niente.

Il vero lavoro dietro questa funzione, quindi, è stato imparare la pianta di ogni sistema di carte, uno alla volta.

---

## Quali carte IC e dei trasporti legge NFC.cool

Ecco cosa sa leggere l'app oggi. Prima però una precisazione, per onestà. Ho provato tutto quello che avevo nel portafoglio, compreso il biglietto di carta usa e getta dell'OV-chipkaart olandese e le mie carte bancarie. Ma al mondo ci sono molte più carte di quante ne stiano in un portafoglio, quindi per gran parte delle carte qui sotto la lettura si basa su come è organizzato quel sistema, non su una carta che ho avuto in mano io. Se la tua viene letta male, o non viene letta affatto, ci tengo davvero a saperlo. Più avanti ti spiego come.

<figure class="phone-figure" data-layout="stage">
<figcaption>Cosa mostra NFC.cool per la tua carta</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/1-suica-balance-440w.webp" alt="Una carta Suica in NFC.cool: il fronte verde della carta con un saldo di 2.140 yen, sotto il grafico del saldo e i primi viaggi e pagamenti"><p><strong>Saldo.</strong> Il saldo della carta in alto, e come è cambiato negli ultimi viaggi.</p></li>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/2-tmoney-trips-440w.webp" alt="Una carta T-money in NFC.cool con un saldo di 12.350 won e un elenco di pagamenti con data, ora, importo e saldo rimasto dopo ciascuno"><p><strong>Viaggi e pagamenti.</strong> Ogni voce che la carta conserva, con il saldo rimasto dopo.</p></li>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/3-locked-card-440w.webp" alt="Una carta dei trasporti MIFARE DESFire in NFC.cool: il tipo di chip e il numero di serie sono leggibili, viaggi, saldo e abbonamenti sono segnati come Non leggibile"><p><strong>Carte bloccate.</strong> Quando l'operatore blocca la carta, l'app ti dice cosa resta chiuso.</p></li>
</ol>
</figure>

### Saldo e ultimi viaggi

- **Giappone:** Suica, PASMO, ICOCA, Kitaca, manaca, nimoca, PiTaPa, TOICA e Hayakaken, con fino a 20 viaggi recenti e le relative stazioni, quando l'app le conosce. Anche Rakuten Edy, nanaco e WAON mostrano saldo e cronologia.
- **Corea del Sud:** T-money e Cashbee, con gli ultimi viaggi e le date di emissione e di scadenza della carta.
- **Cina e Hong Kong:** Shenzhen Tong, Wuhan Tong, le carte City Union (indicate come Shanghai Public Transport quando si tratta di una carta di Shanghai) e T-Union, con gli ultimi viaggi e le date di validità. La Octopus di Hong Kong mostra il saldo.
- **Indonesia:** Mandiri e-money, BCA Flazz, BNI TapCash, MegaCash e la KRL Kartu Multi Trip, con la cronologia. Le carte JakCard e MRT Jakarta mostrano il saldo.
- **Australia e Nuova Zelanda:** la Opal di Sydney, con il saldo e l'ultimo viaggio, e la Snapper di Wellington, che usa lo stesso sistema di T-money e mostra gli importi in NZ$.
- **Stati Uniti:** Clipper a San Francisco e ORCA a Seattle.
- **Finlandia:** le carte HSL, Waltti e di Tampere.
- **Israele:** Rav-Kav, con il credito caricato, gli abbonamenti e i viaggi.

### Abbonamenti e viaggi, ma niente saldo

Molte carte europee un saldo non ce l'hanno proprio: contengono abbonamenti. La Navigo di Parigi e le altre carte Calypso francesi (Pass Pass, KorriGo, OùRA e altre), MOBIB a Bruxelles, Opus a Montréal, Venezia Unica e Lisboa Viva mostrano gli abbonamenti caricati sulla carta e gli ultimi viaggi. Lo stesso vale per la metroCARD di Adelaide e la Hafilat di Abu Dhabi, perché lì il saldo sta dietro la chiave dell'operatore.

### Biglietti di carta e a corsa singola

Anche i biglietti sottili di carta hanno un chip. NFC.cool legge i biglietti Ventra di Chicago e Compass di Vancouver, la Troika di Mosca, i biglietti di carta Clipper, i biglietti HSL, di Tampere, di Venezia e di Pisa, il biglietto di carta dell'OV-chipkaart e i biglietti GTT di Torino, sui quali vedi il tipo di biglietto, quando è stato emesso e quando è stato convalidato.

### Bloccate dall'operatore

Alcuni operatori bloccano tutto. Con la Oyster di Londra, la Leap di Dublino o la Rabbit di Bangkok, NFC.cool sa dirti di che carta si tratta e basta, perché sopra non c'è nient'altro di aperto. Alcune, come la Myki di Melbourne e la PRESTO di Toronto, lasciano leggere il numero della carta e tengono chiuso il resto. Non è una cosa che un aggiornamento possa cambiare: quei sistemi sono costruiti così.

### Carte che richiedono un lettore esterno

Ci sono carte che l'iPhone proprio non lascia leggere a un'app. Le EZ-Link e NETS FlashPay di Singapore e la Yikatong di Pechino sono di questo tipo. Collega un [lettore NFC USB esterno](/it/affiliate-links/#usb-nfc-reader) e NFC.cool le legge, con saldo e cronologia. Ho spiegato come funzionano questi lettori nell'articolo su [come leggere i tag NFC su iPad e Mac](/it/blog/nfc-reading-ipad-mac/).

---

## Carte bancarie: cosa vedi e cosa non vedrai mai

È con le carte bancarie che le persone si innervosiscono, e le capisco.

Su iPhone, NFC.cool mostra il circuito, Visa o Mastercard, e niente di più. [Apple non permette ad app come la mia di leggere i dati di pagamento di una carta bancaria](https://developer.apple.com/documentation/corenfc/nfctagreadersession) sull'iPhone, e da persona che lavora ogni giorno con queste tecnologie penso che sia la scelta giusta.

Con un lettore USB esterno si vede di più: il circuito, il numero della carta mascherato tranne le prime sei e le ultime quattro cifre, la data di scadenza, il paese di emissione e la valuta. Quello che NFC.cool non legge mai, su nessun dispositivo, è il tuo nome, mentre il codice di sicurezza e il PIN non sono leggibili affatto. Nella [mia guida ai tag NFC](/it/blog/ultimate-nfc-tag-guide/#il-telefono-può-leggere-la-carta-bancaria-o-il-passaporto-con-unapp-nfc) spiego perché sul chip non c'è niente che valga la pena copiare.

---

## Cosa potrebbe leggere dalla tua carta il telefono di uno sconosciuto

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/anyone-can-read-440w.webp" alt="La sezione Cosa può leggere chiunque di una carta Suica in NFC.cool: il saldo e gli ultimi 6 viaggi e pagamenti sono leggibili da qualsiasi telefono, senza bisogno di chiavi"><p><strong>Cosa può leggere chiunque.</strong> Su una Suica, il saldo e gli ultimi viaggi, senza bisogno di chiavi.</p></li>
</ol>
</figure>

È la parte che trovo più interessante, ed è la prima cosa che guarderei.

Tutto quello che NFC.cool legge, lo legge senza chiave. Significa che qualsiasi telefono appoggiato alla tua carta potrebbe leggere le stesse cose. Il passaporto è l'opposto: il chip resta muto finché non gli dai una chiave stampata sulla pagina con la foto, ed è così che funziona [la lettura del passaporto con il telefono](/it/blog/read-passport-nfc-chip/). Per questo ogni schermata di una carta ha una sezione chiamata **Cosa può leggere chiunque**, con l'elenco esatto di quello che è emerso da quella lettura: il saldo, i viaggi con date e stazioni, un numero di carta, qualunque cosa la carta abbia lasciato leggere.

Per una Suica possono essere venti viaggi con i nomi delle stazioni. Per una Navigo, gli abbonamenti e gli ultimi viaggi. Per una Oyster, quasi niente. L'NFC funziona solo a pochi centimetri, quindi nessuno ti legge la carta dall'altra parte del vagone, ma vale comunque la pena sapere che tipo di carta hai in tasca.

E mentre succede tutto questo, niente esce dall'iPhone. La lettura avviene tra la carta e il telefono, e basta.

---

## Lo storico delle carte

Ogni carta che leggi viene salvata nell'elenco delle scansioni, con un breve riepilogo come "Suica • ¥1,234" per ritrovarla facilmente. Se la riapri più tardi, trovi la carta com'era in quel momento, più **Dall'ultima scansione**, che mostra di quanto è cambiato il saldo rispetto all'ultima volta che hai letto quella stessa carta. Comodo, se ti sei mai chiesto dove sia finita l'ultima ricarica.

---

## Come controllare il saldo della carta su iPhone

1. Apri [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-it&mt=8) e tocca **Leggi NFC**.
2. Appoggia la carta di piatto contro la parte alta dell'iPhone e tienila ferma finché il pannello non mostra **Carta letta**.
3. La carta si apre in una schermata tutta sua, con il saldo in alto e i dettagli sotto.

Non devi scegliere prima il tipo di carta. L'app capisce da sola di che carta si tratta.

---

## La tua carta non è nell'elenco? Segnalamela

Qui entri in gioco tu. Quando NFC.cool riconosce un chip ma non riesce a leggerlo per intero, la schermata della carta mostra **Aiutaci a leggere questa carta**. Quando invece il saldo l'ha letto ma qualcosa non torna, la stessa sezione si chiama **Qualcosa non va?**

Tocca **Invia i dettagli della lettura**, scrivi il nome e il paese della carta e, se c'è un saldo, dimmi se è giusto. Prima che parta qualsiasi cosa, tocca **Vedi i dati** per controllare esattamente cosa verrà inviato: cosa ha risposto la carta durante la lettura, il tipo di chip, il dispositivo e la versione dell'app, e il tuo paese. Restano fuori il tuo nome e qualsiasi account, mentre il numero di serie della carta e qualsiasi numero di carta riconosciuto dall'app vengono mascherati. Una carta che l'app non conosce ancora potrebbe comunque contenere dati che l'app non è in grado di individuare, ed è proprio per questo che prima di inviare li guardi tu. Se l'invio non funziona, puoi mandarmi tutto per email.

Ogni segnalazione è una carta che non ho, spesso di una città in cui non sono mai stato, ed è così che arriva il supporto per le prossime carte. Quindi, se un giorno mi hai scritto che NFC.cool non legge la tua carta: [aggiorna l'app](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-it&mt=8) e riprova. E se ancora non funziona, adesso hai un pulsante che mi manda esattamente quello che mi serve per sistemarlo.

[Scarica NFC.cool Tools per iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-it&mt=8) · [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-check-transit-card-balance-iphone-it) (a breve)
