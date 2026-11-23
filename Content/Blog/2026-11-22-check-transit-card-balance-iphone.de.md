---
id: "check-transit-card-balance-iphone-2026-11"
title: "Guthaben von Fahrkarte und IC-Karte auf dem iPhone abfragen: Suica, Octopus, T-money und mehr"
date: "2026-11-22"
tags: ["guides", "iphone", "privacy"]
summary: "Halte eine IC-, Fahr- oder E-Geld-Karte wie Suica, Octopus oder T-money an dein iPhone, und NFC.cool zeigt dir Guthaben und letzte Fahrten. Hier findest du jede Karte, die die App liest, was eine Bankkarte verrät und was jeder von deiner Karte lesen könnte."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/check-transit-card-balance-iphone-v4.webp"
imageAlt: "Ein iPhone zeigt Guthaben und Verlaufsdiagramm einer Fahrkarte, während eine grüne IC-Karte daran gehalten wird, davor liegen zwei weitere Fahrkarten"
metaTitle: "Fahrkarten-Guthaben auf dem iPhone prüfen: Suica und mehr"
metaDescription: "Guthaben und Fahrten von IC-, Fahr- und E-Geld-Karten wie Suica, PASMO, Octopus, T-money, Clipper und Opal auf dem iPhone prüfen. Alle Karten, die NFC.cool liest."
ogTitle: "Guthaben deiner Fahrkarte und IC-Karte mit dem iPhone prüfen"
ogDescription: "Suica, Octopus, T-money, Navigo, Clipper und viele weitere IC-Karten: Halte die Karte an dein iPhone und sieh Guthaben, Fahrten und was jeder davon lesen kann."
---
Über Jahre hat mich immer wieder dieselbe Sorte E-Mail erreicht, in einem Dutzend Sprachen und mit einem Dutzend verschiedener Kartennamen. „Deine App liest meine E-Geld-Karte nicht.“ „Sie erkennt meine IC-Karte nicht.“ „Ich habe mein Metroticket ans Handy gehalten, und nichts ist passiert.“

Ganz unrecht hatten sie nicht. NFC.cool hat den Chip gefunden, [seine ID und den Chiptyp angezeigt](/de/features/nfc-reader-writer/) und dann aufgehört. Wer eine Karte mit Geld darauf in der Hand hält, für den sah das so aus, als hätte die App aufgegeben. Das Guthaben, um das es ging, stand schließlich direkt auf der Karte.

Version 7.4.0 von [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-de&mt=8) ist meine Antwort auf all diese Mails. Halte eine Fahrkarte, eine E-Geld-Karte oder eine Bankkarte an dein iPhone, und die App zeigt dir jetzt das Guthaben, die letzten Fahrten und, genauso spannend, alles, was auch jeder andere davon lesen könnte. Den Anfang macht das iPhone, und [NFC.cool Tools für Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-check-transit-card-balance-iphone-de) (bald) liest Karten dann genauso aus.

---

## Warum NFC-Karte nicht gleich NFC-Karte ist

Jede dieser Karten [spricht über NFC mit deinem Handy](/de/blog/nfc-on-iphones-insider-look/). Damit hören die Gemeinsamkeiten aber auch schon auf.

Ich stelle mir das so vor: NFC ist nur die Haustür. Dahinter ist jede Karte ein eigenes Gebäude, mit eigenem Grundriss und eigenen verschlossenen Räumen. Die japanischen Karten laufen mit **FeliCa** von Sony. Viele europäische Fahrkarten nutzen **Calypso**. San Francisco, Sydney und Helsinki setzen auf [**MIFARE DESFire**](/de/blog/ultimate-nfc-tag-guide/#mifare-classic-plus-und-desfire-die-zugangskontroll-familie), jede Stadt mit einer anderen Raumaufteilung. Bankkarten sprechen **EMV**, denselben Standard wie das Kartenterminal an der Supermarktkasse.

Und in jedem Gebäude entscheidet der Betreiber, welche Räume offen sind. Manche lassen das Guthaben und die letzten zwanzig Fahrten offen stehen, da kann jeder hinein. Andere schließen jede Tür ab, und den Schlüssel haben nur ihre eigenen Schranken und Fahrkartenautomaten. Daran kommt keine App vorbei, und NFC.cool versucht es auch gar nicht: Jeder Scan liest nur, nutzt keine Schlüssel und schreibt nichts auf die Karte.

Die eigentliche Arbeit hinter dieser Funktion bestand also darin, den Grundriss jedes einzelnen Kartensystems kennenzulernen, eins nach dem anderen.

---

## Welche IC- und Fahrkarten NFC.cool lesen kann

Das hier kann die App heute lesen. Vorher aber eine ehrliche Anmerkung. Ich habe alles getestet, was in meinem eigenen Portemonnaie steckte, darunter das Einweg-Papierticket der OV-chipkaart aus den Niederlanden und meine eigenen Bankkarten. Auf der Welt gibt es aber viel mehr Karten als in irgendeinem Portemonnaie, deshalb beruht die Unterstützung für die meisten Karten unten darauf, wie das jeweilige System aufgebaut ist, und nicht auf einer Karte, die ich selbst in der Hand hatte. Wenn deine Karte falsch oder gar nicht gelesen wird, will ich das unbedingt wissen. Wie das geht, steht weiter unten.

<figure class="phone-figure" data-layout="stage">
<figcaption>Was NFC.cool zu deiner Karte anzeigt</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/1-suica-balance-440w.webp" alt="Eine Suica-Karte in NFC.cool: ein grünes Kartenbild mit einem Guthaben von 2.140 Yen, darunter ein Guthabendiagramm und die ersten Fahrten und Zahlungen"><p><strong>Guthaben.</strong> Oben das Guthaben der Karte und wie es sich über die letzten Fahrten entwickelt hat.</p></li>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/2-tmoney-trips-440w.webp" alt="Eine T-money-Karte in NFC.cool mit einem Guthaben von 12.350 Won und einer Liste von Zahlungen mit Datum, Uhrzeit, Betrag und dem Guthaben nach jeder Zahlung"><p><strong>Fahrten und Zahlungen.</strong> Jeder Eintrag, den die Karte speichert, mit dem Guthaben danach.</p></li>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/3-locked-card-440w.webp" alt="Eine Fahrkarte mit MIFARE DESFire in NFC.cool: Chiptyp und Seriennummer sind lesbar, Fahrten, Guthaben und Zeitkarten sind als Nicht lesbar markiert"><p><strong>Gesperrte Karten.</strong> Hat der Betreiber die Karte gesperrt, sagt dir die App, was verschlossen bleibt.</p></li>
</ol>
</figure>

### Guthaben und letzte Fahrten

- **Japan:** Suica, PASMO, ICOCA, Kitaca, manaca, nimoca, PiTaPa, TOICA und Hayakaken, mit bis zu 20 letzten Fahrten samt Stationen, soweit die App sie kennt. Auch Rakuten Edy, nanaco und WAON zeigen Guthaben und Verlauf.
- **Südkorea:** T-money und Cashbee, mit den letzten Fahrten sowie Ausgabe- und Ablaufdatum der Karte.
- **China und Hongkong:** Shenzhen Tong, Wuhan Tong, City-Union-Karten (als Shanghai Public Transport angezeigt, wenn es eine Karte aus Shanghai ist) und T-Union, mit den letzten Fahrten und dem Gültigkeitszeitraum. Octopus aus Hongkong zeigt das Guthaben.
- **Indonesien:** Mandiri e-money, BCA Flazz, BNI TapCash, MegaCash und die KRL Kartu Multi Trip, mit Verlauf. JakCard und die Karten der MRT Jakarta zeigen das Guthaben.
- **Australien und Neuseeland:** Opal in Sydney, mit Guthaben und der letzten Fahrt, und Snapper aus Wellington, das auf demselben System läuft wie T-money und in NZ$ angezeigt wird.
- **USA:** Clipper in San Francisco und ORCA in Seattle.
- **Finnland:** die Karten von HSL, Waltti und Tampere.
- **Israel:** Rav-Kav, mit Guthaben, Zeitkarten und Fahrten.

### Zeitkarten und Fahrten, aber kein Guthaben

Viele europäische Karten speichern überhaupt kein Guthaben. Auf ihnen liegen Zeitkarten. Navigo aus Paris und die anderen französischen Calypso-Karten (Pass Pass, KorriGo, OùRA und weitere), MOBIB in Brüssel, Opus in Montreal, Venezia Unica und Lisboa Viva zeigen die gespeicherten Zeitkarten und die letzten Fahrten. Genauso verhalten sich die metroCARD aus Adelaide und die Hafilat-Karte aus Abu Dhabi, weil ihr Guthaben hinter dem Schlüssel des Betreibers liegt.

### Papier- und Einzeltickets

Auch die dünnen Papiertickets haben einen Chip. NFC.cool liest die Ventra-Tickets aus Chicago und die Compass-Tickets aus Vancouver, die Troika aus Moskau, die Papiertickets von Clipper, die Tickets von HSL, Tampere, Venedig und Pisa, das Papierticket der OV-chipkaart und die GTT-Tickets aus Turin, bei denen du die Ticketart, das Ausstellungsdatum und den Zeitpunkt der Entwertung siehst.

### Vom Betreiber gesperrt

Manche Betreiber sperren alles. Bei der Oyster in London, der Leap Card in Dublin oder der Rabbit Card in Bangkok kann dir NFC.cool sagen, um welche Karte es sich handelt, und das war's, weil sonst nichts darauf offen liegt. Ein paar wie Myki in Melbourne und PRESTO in Toronto verraten die Kartennummer und behalten den Rest für sich. Daran kann auch kein Update etwas ändern. So sind diese Systeme gebaut.

### Karten, die ein externes Lesegerät brauchen

Manche Karten rückt das iPhone einfach nicht an eine App heraus. EZ-Link und NETS FlashPay aus Singapur und Yikatong aus Peking gehören dazu. Steck ein [externes USB-NFC-Lesegerät](/de/affiliate-links/#usb-nfc-reader) an, und NFC.cool liest sie, mit Guthaben und Verlauf. Wie diese Lesegeräte funktionieren, habe ich im Beitrag übers [Lesen von NFC-Tags auf iPad und Mac](/de/blog/nfc-reading-ipad-mac/) beschrieben.

---

## Bankkarten: was du siehst und was du nie zu sehen bekommst

Bei Bankkarten werden viele nervös, und das kann ich gut verstehen.

Auf dem iPhone zeigt dir NFC.cool das Kartennetz, also Visa oder Mastercard, und sonst nichts. [Apple lässt Apps wie meine die Zahlungsdaten einer Bankkarte nicht auslesen](https://developer.apple.com/documentation/corenfc/nfctagreadersession), jedenfalls nicht auf dem iPhone, und als jemand, der jeden Tag mit dieser Technik arbeitet, halte ich das für die richtige Entscheidung.

Mit einem externen USB-Lesegerät gibt es mehr zu sehen: das Kartennetz, die Kartennummer, maskiert bis auf die ersten sechs und die letzten vier Ziffern, das Ablaufdatum, das Ausgabeland und die Währung. Deinen Namen liest NFC.cool auf keinem Gerät, und Sicherheitscode und PIN lassen sich überhaupt nicht auslesen. Warum auf dem Chip nichts liegt, was sich zu kopieren lohnt, erkläre ich in [meinem NFC-Tag-Guide](/de/blog/ultimate-nfc-tag-guide/#kann-mein-handy-mit-einer-nfc-app-meine-bankkarte-oder-meinen-reisepass-lesen).

---

## Was ein fremdes Handy von deiner Karte lesen könnte

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/anyone-can-read-440w.webp" alt="Der Abschnitt Was jeder lesen kann zu einer Suica-Karte in NFC.cool: Guthaben und die letzten 6 Fahrten und Zahlungen kann jedes Handy lesen, ganz ohne Schlüssel"><p><strong>Was jeder lesen kann.</strong> Bei einer Suica das Guthaben und die letzten Fahrten, ganz ohne Schlüssel.</p></li>
</ol>
</figure>

Das ist für mich der spannendste Teil, und genau hier würde ich als Erstes hinschauen.

Alles, was NFC.cool liest, liest die App ohne Schlüssel. Das heißt: Jedes Handy, das jemand an deine Karte hält, könnte genau dasselbe lesen. Beim Reisepass ist es umgekehrt. Sein Chip schweigt, bis du ihm einen Schlüssel nennst, der auf der Fotoseite aufgedruckt ist, und so funktioniert auch [das Auslesen deines Reisepasses mit dem Handy](/de/blog/read-passport-nfc-chip/). Deshalb hat jeder Kartenbildschirm einen Abschnitt **Was jeder lesen kann**, der genau auflistet, was bei diesem Scan herausgekommen ist: das Guthaben, Fahrten mit Datum und Station, eine Kartennummer, eben alles, was die Karte preisgegeben hat.

Bei einer Suica können das zwanzig Fahrten mit Stationsnamen sein. Bei einer Navigo deine Zeitkarten und die letzten Fahrten. Bei einer Oyster fast nichts. NFC reicht nur ein paar Zentimeter weit, quer durch den Waggon liest also niemand deine Karte aus. Trotzdem lohnt es sich zu wissen, welche Sorte du in der Tasche hast.

Bei alldem verlässt nichts dein iPhone. Das Auslesen passiert zwischen der Karte und deinem Handy, und sonst nirgends.

---

## Deine Karte im Lauf der Zeit

Jede Karte, die du ausliest, landet in deiner Liste der Scans, mit einer kurzen Zusammenfassung wie „Suica • ¥1,234“, damit du sie wiederfindest. Öffnest du sie später, siehst du die Karte so, wie sie beim Scan war, dazu **Seit dem letzten Scan**: wie stark sich das Guthaben verändert hat, seit du genau diese Karte das letzte Mal ausgelesen hast. Praktisch, falls du dich schon mal gefragt hast, wo die letzte Aufladung geblieben ist.

---

## So prüfst du das Guthaben deiner Karte auf dem iPhone

1. Öffne [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-de&mt=8) und tippe auf **NFC lesen**.
2. Halte die Karte flach an die Oberkante deines iPhones und lass sie ruhig dort, bis im Scan-Fenster **Karte gelesen** steht.
3. Die Karte öffnet sich in einer eigenen Ansicht, oben das Guthaben, darunter die Details.

Einen Kartentyp musst du vorher nicht auswählen. Die App erkennt selbst, was für eine Karte das ist.

---

## Deine Karte fehlt in der Liste? Schick sie mir

Jetzt kommst du ins Spiel. Erkennt NFC.cool einen Chip, kann ihn aber nicht vollständig lesen, zeigt der Kartenbildschirm **Hilf uns, diese Karte zu lesen**. Hat die App ein Guthaben gelesen und trotzdem kommt dir etwas falsch vor, steht an derselben Stelle **Stimmt etwas nicht?**

Tippe auf **Lesedaten senden**, gib Namen und Land der Karte ein und sag mir, falls es ein Guthaben gibt, ob es stimmt. Bevor irgendetwas rausgeht, tippe auf **Daten ansehen** und schau dir genau an, was gesendet wird: was die Karte beim Auslesen geantwortet hat, der Chiptyp, dein Gerät und deine App-Version sowie dein Land. Weder dein Name noch irgendein Konto gehört dazu, und die Seriennummer der Karte sowie jede Kartennummer, die die App erkennt, werden maskiert. Eine Karte, die die App noch nicht kennt, könnte trotzdem Angaben enthalten, die sie nicht als solche erkennt, und genau deshalb schaust du zuerst selbst drauf. Klappt das Senden nicht, kannst du mir die Daten auch per E-Mail schicken.

Jeder Bericht ist eine Karte, die ich nicht habe, oft aus einer Stadt, in der ich noch nie war, und genau so kommen die nächsten Karten dazu. Wenn du mir also irgendwann geschrieben hast, dass NFC.cool deine Karte nicht liest: [Aktualisiere die App](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-de&mt=8) und versuch es noch einmal. Und klappt es dann immer noch nicht, hast du jetzt einen Knopf, der mir genau das schickt, was ich brauche, um es zu beheben.

[NFC.cool Tools fürs iPhone laden](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-de&mt=8) · [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-check-transit-card-balance-iphone-de) (bald)
