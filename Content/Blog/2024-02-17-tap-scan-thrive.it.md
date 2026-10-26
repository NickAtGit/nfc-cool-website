---
id: nfc-blog-022
title: "Inquadra e vai: cosa può contenere un codice QR oltre a un indirizzo web"
date: 2024-02-17
tags: ["qr-codes", "business-cards"]
summary: "I codici QR non servono solo per gli indirizzi web. Dentro ci stanno credenziali Wi-Fi, eventi del calendario, posizioni, vCard, testo semplice, qualsiasi cosa si riesca a codificare. Ecco tutto quello che sanno fare il generatore e lo scanner QR di NFC.cool."
metaTitle: "Cosa può contenere un codice QR oltre a un indirizzo web"
metaDescription: "Un codice QR non contiene solo indirizzi web: anche credenziali Wi-Fi, contatti, eventi del calendario e posizioni. Guida pratica a ogni tipo di contenuto."
ogTitle: "Inquadra e vai: cosa può contenere un codice QR oltre a un indirizzo web"
ogDescription: "Dentro un codice QR ci stanno Wi-Fi, contatti, calendari e posizioni, non soltanto indirizzi web."
image: "/assets/images/Blog/tap-scan-thrive.webp"
---
Un codice QR è solo un contenitore di byte. Gli indirizzi web sono di gran lunga il contenuto più diffuso, ma allo standard non interessa: dentro ci finiscono credenziali Wi-Fi, un evento del calendario, un punto sulla mappa, una scheda contatto, del testo semplice o qualsiasi altro contenuto che un'app sappia interpretare.

Il generatore QR di NFC.cool li copre tutti. Ecco cosa succede davvero quando li scansioni, uno per uno.

---

## Indirizzi web

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/tap-scan-thrive/types-440w.webp" alt="Create QR Code in NFC.cool Tools: Web Link, Google Review Link, Text, Business Card, Telephone Number, Email, SMS, Location, FaceTime ed Event"><p><strong>Un elenco, ogni contenuto.</strong> Link, Wi-Fi, contatti, luoghi ed eventi partono tutti da qui.</p></li>
</ol>
</figure>

Il caso base. Codifichi `https://example.com`, lo inquadri con una fotocamera qualsiasi e il telefono propone di aprirlo. Funziona su qualunque telefono degli ultimi dieci anni.

Una variante utile è quella dei link brevi. Se gli indirizzi che usi sono pieni di parametri di tracciamento, genera il codice sulla versione breve: il codice QR diventa fisicamente più piccolo (meno moduli, quindi meno fitto) e si legge più facilmente da lontano.

---

## Credenziali Wi-Fi

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/tap-scan-thrive/1-wifi-form-440w.webp" alt="Il modulo QR per il Wi-Fi in NFC.cool Tools: nome della rete, password, autenticazione WPA/WPA2 e rete nascosta"><p><strong>Inserisci la rete.</strong> Nome, password e tipo di sicurezza.</p></li>
<li><img src="/assets/images/Blog/screens/tap-scan-thrive/2-wifi-code-440w.webp" alt="Il codice QR Wi-Fi pronto, intitolato Guest WiFi, con QR Code Studio per personalizzarlo"><p><strong>Condividi il codice.</strong> Gli ospiti lo scansionano e si collegano, senza digitare nulla.</p></li>
</ol>
</figure>

Codifica SSID, password e tipo di sicurezza (WPA2, WPA3, rete aperta) nel formato standard `WIFI:T:WPA;S:...;P:...;;`. iOS, Android e le versioni recenti di Windows lo riconoscono e propongono di collegarsi.

Stampa il codice su un cartoncino nella stanza degli ospiti. Attaccalo dietro al router. Appendilo al muro del bar. Chi arriva scansiona, si collega e ha finito, senza digitare password da 24 caratteri.

---

## Eventi del calendario

Un evento si codifica come blocco `BEGIN:VEVENT`, cioè nel formato iCalendar. Alla scansione il telefono propone di aggiungerlo al calendario, con ora di inizio, ora di fine, luogo e descrizione.

Comodo sui manifesti degli eventi, sui cartelli di una conferenza o sui biglietti "save the date". Chi lo riceve non deve cercare l'evento su un sito: un tocco e ce l'ha in calendario.

---

## Posizioni sulla mappa

Codifica un URI `geo:` con latitudine e longitudine. Alla scansione si apre l'app di mappe predefinita proprio su quel punto: Mappe di Apple su iOS, Google Maps sulla maggior parte dei telefoni Android.

Ristoranti, locali, punti di ritrovo: metti un piccolo codice QR sul volantino o sull'invito e chi lo riceve ottiene le indicazioni stradali con un tocco.

---

## vCard (schede contatto)

È l'alternativa più diffusa agli indirizzi web. Codifica una vCard completa (nome, telefono, email, azienda, indirizzo, sito, foto) e il telefono propone di salvarla in rubrica.

I biglietti da visita in codice QR funzionano esattamente così. Ed è anche il motivo per cui una vCard in un codice QR funziona su qualsiasi telefono senza app dedicate: la vCard è uno standard vecchio di trent'anni che il sistema operativo conosce già.

Rispetto al biglietto da visita di NFC.cool c'è però un compromesso: una vCard in un codice QR non si aggiorna. Una volta stampata, i dati del contatto sono congelati. Se ti serve un'unica fonte attendibile, modificabile anche dopo, codifica invece l'indirizzo della pagina del tuo biglietto, che resta sempre aggiornata: è quello che fa [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-tap-scan-thrive-it&mt=8) ed è il motivo per cui, quando si fa networking sul serio, la consiglio al posto della vCard nuda e cruda.

---

## Testo semplice

Se al momento della scansione vuoi solo mostrare una stringa (un messaggio, un codice sconto, un indovinello), codifica del testo semplice. Quasi tutte le app di scansione lo mostrano e propongono di copiarlo o di condividerlo.

---

## Contenuti su misura

Alcune app registrano schemi di indirizzo propri (`myapp://...`) e riconoscono i codici QR che li contengono. Lo scanner di NFC.cool li rispetta: legge il contenuto e lo passa all'app registrata, esattamente come farebbero iOS o Android con un Universal Link.

---

## Cosa fa lo scanner quando legge un codice

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/tap-scan-thrive/scanner-440w.webp" alt="Lo scanner QR di NFC.cool Tools con un codice trovato su un biglietto stampato e il pulsante Finish"><p><strong>Scansione.</strong> Inquadra con la fotocamera, e l'app legge il contenuto e propone l'azione giusta.</p></li>
</ol>
</figure>

Lo scanner di NFC.cool legge tutti i formati appena elencati e li indirizza all'azione giusta: gli indirizzi web si aprono nel browser, le vCard propongono il salvataggio, il Wi-Fi propone il collegamento, le posizioni si aprono nelle mappe. Tiene anche una cronologia locale di ogni scansione, comodissima quando hai letto trenta menù a una fiera e ne cerchi uno in particolare.

Tutta la parte QR, generatore e scanner, è dentro [NFC.cool Tools per iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-tap-scan-thrive-it&mt=8) e [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-tap-scan-thrive-it).
