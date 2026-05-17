---
id: nfc-blog-015
title: "Sonicare-Bürstenkopf-Zähler per NFC auslesen und zurücksetzen"
date: 2026-04-21
tags: ["nfc-tags", "guides", "automation"]
summary: "Deine Sonicare-Zahnbürste hat in jedem Bürstenkopf einen NFC-Chip, der herunterzählt, bis du Ersatz kaufst. Hier ist, was er wirklich misst - und wie du deinen Verbrauch prüfen oder den Zähler mit NFC.cool Tools zurücksetzen kannst."
image: "/assets/images/Blog/reset-sonicare-brush-head-nfc.webp"
imageAlt: "NFC-Tag eines elektrischen Zahnbürstenkopfs wird per Smartphone zurückgesetzt"
metaTitle: "Philips Sonicare Bürstenkopf-Zähler per NFC prüfen & zurücksetzen (2026)"
metaDescription: "Dein Sonicare-Bürstenkopf hat einen NFC-Chip, der mitzählt, wie lange du putzt. Sieh, wie viel Lebenszeit übrig ist, und setze den Zähler mit NFC.cool Tools zurück."
ogTitle: "So prüfst und resettest du deinen Sonicare-Bürstenkopf-Zähler"
ogDescription: "Jeder Sonicare-Bürstenkopf hat einen NFC-Chip, der bis zum Austausch herunterzählt. Sieh deine Nutzung und setze den Timer zurück, wenn du willst."
---

Deine elektrische Zahnbürste spioniert dich aus.

Nicht auf gruselige Überwachungsweise. Eher so: „Wir haben einen winzigen NFC-Chip in deinen Bürstenkopf gepackt, damit er dich zum Nachkaufen drängt." Jeder Philips-Sonicare-Ersatzkopf hat einen NTAG213 im Plastik eingebettet, der mitzählt, wie lange du putzt, und dem Handstück signalisiert, eine Warnleuchte blinken zu lassen, sobald er entscheidet, dass deine drei Monate vorbei sind.

Willkommen im Internet of Shit.

Die Sache ist: Drei Monate sind eine Empfehlung, kein medizinischer Fakt. Der Borstenverschleiß hängt davon ab, wie fest du putzt, welche Zahnpasta du nutzt und wie oft. Der Chip misst den Borstenzustand nicht. Er zählt nur Sekunden. Wer sanft und mit milder Zahnpasta putzt, hat nach drei Monaten vielleicht noch völlig intakte Borsten. Der Timer weiß und kümmert das nicht.

NFC.cool Tools kann diesen Chip jetzt auslesen, dir genau zeigen, wie viel Lebenszeit dein Bürstenkopf verbraucht hat, und den Timer zurücksetzen, wenn du entscheidest, dass deine Borsten noch gut sind. So funktioniert's.

---

## Was wirklich auf dem Chip steht

Cyrill Künzi hat [das Protokoll auseinandergenommen](https://kuenzi.dev/toothbrush/) und mbirth [jedes Byte kartiert](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html). Das speichert der NTAG213 in deinem Bürstenkopf:

- **Bürstenkopf-Typ und -Farbe** - ein einzelnes Byte auf Seite `0x1F`, das das Modell (Premium All-in-One, Gum Care, DiamondClean usw.) und die Farbe identifiziert ([mbirths Memory Map](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) listet 22 bekannte Typen)
- **Ziel-Lebensdauer** - auf `0x21`, üblicherweise `0x5460` = 21.600 Sekunden, also 180 zweiminütige Putzsitzungen oder drei Monate bei zweimal täglicher Anwendung
- **Herstellungscode** - auf `0x21-0x23`, das Produktionsdatum und die Linie als ASCII, z. B. `241206 31K` (hergestellt am 6. Dezember 2024 auf Linie 31K). Steht auch auf dem Stiel
- **Aufaddierte Putzzeit** - die ersten zwei Bytes auf Seite `0x24` speichern die Gesamtsekunden, die der Kopf in Gebrauch war, als 16-Bit-Wert. Wenn er `0xFFFF` (65.535 Sekunden, etwa 18 Stunden Dauerputzen) erreicht, stoppt der Zähler. Ein nagelneuer Kopf startet bei `00:00:02:00` - die ersten zwei Bytes sind null (keine Nutzung), die Bedeutung der letzten zwei Bytes ist derzeit unbekannt
- **Letzte Intensität und Modus** - ebenfalls auf `0x24`: Low/Med/High und Clean/White+/Gum Health/Deep Clean+
- **Eine URL** - die auf `philips.com/nfcbrushheadtap` zeigt und sich öffnet, wenn du den Kopf mit einem generischen NFC-Reader scannst

Wenn die aufaddierte Zeit das Ziel (21.600 Sekunden) überschreitet, blinkt am Handstück die gelbe LED. Das ist der Chip, der spricht - nicht die Borsten.

---

## Warum du ihn vielleicht zurücksetzen willst

Das Drei-Monats-Austauschintervall ist eine Empfehlung von Philips, keine wissenschaftliche Messung des Borstenverschleißes. Der Chip zählt Sekunden, nicht ausgefranste Borsten. Wenn du selbst entscheiden willst - indem du auf deine Borsten schaust statt einem Countdown zu gehorchen - kannst du das mit einem Reset des Zählers tun.

Du könntest auch zurücksetzen, wenn du zwischen mehreren Köpfen rotierst (Reise vs. zu Hause) und sie selbst tracken willst.

---

## Wie das Passwort funktioniert

Der NTAG213 ist passwortgeschützt. Jeder Bürstenkopf hat ein eigenes 4-Byte-Passwort. Das Handstück authentifiziert sich damit jedes Mal, wenn es auf den Tag schreibt.

Das Passwort wird aus zwei Eingaben berechnet: der 7-Byte-UID des Tags und dem auf dem Tag gespeicherten (und auf dem Stiel gedruckten) Herstellungscode. [Aaron Christophel](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) hat den Algorithmus aus der Sonicare-Firmware reverse-engineered, nachdem Cyrill Künzi die Passwortübertragung ursprünglich mit einem Software Defined Radio mitgeschnitten hatte.

⚠️ **Wichtig:** Der NTAG213 sperrt sich nach **drei fehlgeschlagenen Passwortversuchen** dauerhaft. Der Chip wird für immer schreibgeschützt - nicht einmal die Zahnbürste kann dann noch darauf schreiben. Nicht raten.

---

## So prüfst und resettest du mit NFC.cool Tools

So sieht es in der App aus:

<figure class="sk-phone-screenshot">
  <img src="/assets/images/Blog/sonicare-reset-screen.webp" alt="NFC.cool Tools zeigt einen Sonicare-Bürstenkopf mit 80 % Nutzung und Reset-Timer-Button" />
</figure>

NFC.cool Tools übernimmt den ganzen Prozess: Tag auslesen, Passwort berechnen, Statistiken anzeigen. Keine Hex-Befehle, keine Web-Rechner, kein SDR.

1. Öffne **NFC.cool Tools** auf deinem iPhone
2. Geh zu **Toothbrush Head Reset**
3. Tippe auf **Read NFC** und halte den Bürstenkopf an dein Handy
4. Die App zeigt einen **Prozent-Indikator** an, wie viel Lebenszeit der Kopf verbraucht hat, mit verbrauchter und verbleibender Zeit darunter
5. Tippe auf **Reset Timer**, um den Nutzungszähler auf null zurückzusetzen, oder scanne einen weiteren Kopf

Verfügbar jetzt für [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-de&mt=8), kommt mit einem zukünftigen Update auf [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-de).

---

## Was der Reset eigentlich macht

Beim Zurücksetzen schreibst du `00:00:02:00` auf Seite `0x24` - derselbe Wert, mit dem ein nagelneuer Bürstenkopf ausgeliefert wird. Nur die ersten zwei Bytes (der Nutzungszähler) werden auf null gesetzt. Die Bedeutung der letzten zwei Bytes ist unbekannt, daher behält die App sie bei.

Die Zahnbürste fängt wieder bei null an zu zählen, und das gelbe Licht meldet sich nach weiteren drei Monaten zurück. Dann kannst du deine Borsten anschauen und selbst entscheiden.

---

## Das größere Bild: NFC in Alltagsgegenständen

Ein Bürstenkopf mit NFC-Chip, der bis zum nächsten Kauf herunterzählt, ist Internet of Shit auf Höchststufe. Wir lieben NFC bei NFC.cool, aber es in Wegwerf-Plastik einzubetten, gezielt um dich zum Nachkaufen zu schubsen, ist… eine Entscheidung.

Derselbe NTAG213-Chip wird auch für Dinge eingesetzt, die dem Verbraucher tatsächlich dienen: Produktauthentifizierung, Zugangskontrolle und bald der EU Digital Product Passport, der NFC-Tags auf Verbraucherprodukten vorschreiben wird, damit du nachprüfen kannst, was du kaufst und woher es kommt. Das ist NFC, das *für* dich arbeitet, nicht gegen dich.

NFC.cool Tools liest und schreibt sie alle. Die Sonicare-Funktion ist ein Beispiel dafür, was auf den Tags um dich herum steht - und selbst zu entscheiden, was du mit dieser Information machst.

---

## Weiterführende Links

- [Cyrill Künzis ursprüngliches Reverse-Engineering-Writeup](https://kuenzi.dev/toothbrush/) - SDR-Sniffing, Passwort-Extraktion und die erste detaillierte Analyse des Sonicare-NFC-Protokolls
- [Aaron Christophels Passwort-Generator](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) - der aus der Sonicare-Firmware extrahierte Algorithmus
- [mbirths NTAG213 Memory Map](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) - detaillierte Dokumentation jedes Bytes auf dem Chip

*Hast du einen Sonicare-Bürstenkopf zum Prüfen? [Lade NFC.cool Tools für iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-de&mt=8) oder [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-de) (Sonicare-Reset kommt bald auf Android) und sieh, was deine Zahnbürste über dich gespeichert hat.*
