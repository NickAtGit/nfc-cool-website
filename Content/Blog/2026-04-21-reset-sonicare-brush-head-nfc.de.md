---
id: nfc-blog-015
title: "Sonicare-Bürstenkopf: Zähler per NFC auslesen und zurücksetzen"
date: 2026-04-21
tags: ["nfc-tags", "guides", "automation"]
summary: "In jedem Sonicare-Bürstenkopf steckt ein NFC-Chip, der runterzählt, bis du einen neuen kaufen sollst. Was er wirklich misst, wie du nachschaust, wie viel dein Kopf schon hinter sich hat, und wie du den Zähler mit NFC.cool Tools zurücksetzt."
image: "/assets/images/Blog/reset-sonicare-brush-head-nfc.webp"
imageAlt: "NFC-Tag im Kopf einer elektrischen Zahnbürste wird mit dem Handy zurückgesetzt"
metaTitle: "Sonicare-Bürstenkopf-Zähler per NFC prüfen & zurücksetzen (2026)"
metaDescription: "In jedem Sonicare-Bürstenkopf steckt ein NFC-Chip, der deine Putzzeit mitzählt. So liest du ihn aus und setzt den Zähler mit NFC.cool Tools zurück."
ogTitle: "Sonicare-Bürstenkopf-Zähler auslesen und zurücksetzen"
ogDescription: "In jedem Sonicare-Bürstenkopf zählt ein NFC-Chip runter, bis du nachkaufen sollst. Schau nach, was er schon gezählt hat, und setz den Timer zurück, wenn du willst."
---

Deine elektrische Zahnbürste spioniert dich aus.

Nicht so, wie man sich Überwachung vorstellt. Eher so: „Wir haben dir einen winzigen NFC-Chip in den Bürstenkopf gebaut, der dich so lange nervt, bis du nachkaufst.“ In jedem Philips-Sonicare-Ersatzkopf steckt ein NTAG213 im Plastik. Der zählt mit, wie lange du putzt, und sagt dem Handstück, wann es die Warnleuchte blinken lassen soll - nämlich sobald er findet, dass deine drei Monate um sind.

Willkommen im Internet of Shit.

Nur: Drei Monate sind eine Empfehlung, kein medizinischer Fakt. Wie schnell Borsten verschleißen, hängt davon ab, wie fest du drückst, welche Zahnpasta du nimmst und wie oft du putzt. Den Zustand der Borsten misst der Chip gar nicht. Er zählt Sekunden, mehr nicht. Wer sanft putzt und eine milde Zahnpasta nimmt, hat nach drei Monaten vielleicht noch tadellose Borsten. Der Timer weiß davon nichts, und es ist ihm auch egal.

NFC.cool Tools kann diesen Chip jetzt auslesen, dir genau zeigen, wie viel von der Laufzeit dein Bürstenkopf schon verbraucht hat, und den Timer zurücksetzen, wenn du findest, dass die Borsten noch gut sind. So geht's.

---

## Was wirklich auf dem Chip steht

Reverse-engineert habe ich davon nichts selbst. Cyrill Künzi hat [das Protokoll auseinandergenommen](https://kuenzi.dev/toothbrush/) und mbirth hat [jedes einzelne Byte dokumentiert](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) - alles, was jetzt kommt, haben die beiden herausgefunden. Das speichert der NTAG213 in deinem Bürstenkopf:

- **Bürstenkopf-Typ und Farbe** - ein einzelnes Byte auf Seite `0x1F`, das Modell (Premium All-in-One, Gum Care, DiamondClean usw.) und Farbe angibt ([mbirths Memory Map](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) listet 22 bekannte Typen)
- **Soll-Laufzeit** - auf `0x21`, normalerweise `0x5460` = 21.600 Sekunden. Das sind 180 Putzdurchgänge à zwei Minuten, also drei Monate bei zweimal Putzen am Tag
- **Herstellungscode** - auf `0x21-0x23`, Produktionsdatum und Fertigungslinie als ASCII, etwa `241206 31K` (gefertigt am 6. Dezember 2024 auf Linie 31K). Derselbe Code steht auch auf dem Stiel
- **Bisherige Putzzeit** - in den ersten zwei Bytes auf Seite `0x24` steht als 16-Bit-Wert, wie viele Sekunden der Kopf insgesamt in Benutzung war. Bei `0xFFFF` (65.535 Sekunden, rund 18 Stunden Putzen am Stück) bleibt der Zähler stehen. Ein fabrikneuer Kopf startet mit `00:00:02:00`: Die ersten zwei Bytes sind null (noch nicht benutzt), was die letzten zwei bedeuten, weiß bisher niemand
- **Zuletzt genutzte Intensität und Modus** - ebenfalls auf `0x24`: Low/Med/High und Clean/White+/Gum Health/Deep Clean+
- **Eine URL** - `philips.com/nfcbrushheadtap`, die aufgeht, wenn du den Kopf mit einem ganz normalen NFC-Reader scannst

Sobald die Putzzeit über der Soll-Laufzeit (21.600 Sekunden) liegt, fängt die gelbe LED am Handstück an zu blinken. Da meldet sich der Chip, nicht die Borsten.

---

## Warum du den Zähler vielleicht zurücksetzen willst

Alle drei Monate wechseln, das ist eine Empfehlung von Philips, keine wissenschaftliche Messung, wie abgenutzt die Borsten sind. Der Chip zählt Sekunden, keine ausgefransten Borsten. Wenn du lieber selbst entscheidest, also auf die Borsten schaust, statt einem Countdown zu folgen, dann setzt du den Zähler einfach zurück.

Ein Reset kann auch dann sinnvoll sein, wenn du mehrere Köpfe im Wechsel benutzt (einen für unterwegs, einen für zu Hause) und selbst den Überblick behalten willst.

---

## Was es mit dem Passwort auf sich hat

Der NTAG213 ist passwortgeschützt, und jeder Bürstenkopf hat sein eigenes 4-Byte-Passwort. Mit dem authentifiziert sich das Handstück jedes Mal, wenn es auf den Tag schreibt.

Berechnet wird das Passwort aus zwei Werten: der 7-Byte-UID des Tags und dem Herstellungscode, der auf dem Tag gespeichert ist (und auf dem Stiel steht). [Aaron Christophel](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) hat den Algorithmus aus der Sonicare-Firmware herausgeholt, nachdem Cyrill Künzi die Passwortübertragung zuerst mit einem Software Defined Radio mitgeschnitten hatte.

**Wichtig:** Nach **drei falschen Passwortversuchen** sperrt sich der NTAG213 dauerhaft. Der Chip ist dann für immer schreibgeschützt, nicht mal die Zahnbürste selbst kommt noch drauf. Also bitte nicht raten.

---

## Auslesen und zurücksetzen mit NFC.cool Tools

So sieht das in der App aus:

<figure class="sk-phone-screenshot">
  <img src="/assets/images/Blog/sonicare-reset-screen.webp" alt="NFC.cool Tools zeigt einen Sonicare-Bürstenkopf bei 80 % Nutzung mit dem Button Reset Timer" />
</figure>

NFC.cool Tools nimmt dir das alles ab: Tag auslesen, Passwort berechnen, Werte anzeigen. Keine Hex-Befehle, kein Rechner im Browser, kein SDR.

1. Öffne **NFC.cool Tools** auf deinem iPhone
2. Geh zu **Toothbrush Head Reset**
3. Tippe auf **Read NFC** und halte den Bürstenkopf an dein Handy
4. Die App zeigt dir eine **Prozentanzeige**, wie viel seiner Laufzeit der Kopf schon verbraucht hat, darunter die verbrauchte und die verbleibende Zeit
5. Tippe auf **Reset Timer**, um den Zähler auf null zu stellen, oder scanne gleich den nächsten Kopf

Gibt's ab sofort für [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-de&mt=8) und [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-de).

---

## Was beim Reset wirklich passiert

Beim Reset schreibst du `00:00:02:00` auf Seite `0x24`, also genau den Wert, mit dem ein fabrikneuer Bürstenkopf ausgeliefert wird. Auf null gesetzt werden nur die ersten zwei Bytes, der Nutzungszähler. Was in den letzten zwei Bytes steht, ist unbekannt, deshalb lässt die App sie unangetastet.

Die Zahnbürste zählt wieder von null los, und nach weiteren drei Monaten blinkt die gelbe Lampe erneut. Dann schaust du dir die Borsten an und entscheidest selbst.

---

## Das große Ganze: NFC in Alltagsgegenständen

Ein Bürstenkopf mit einem NFC-Chip, der bis zu deinem nächsten Einkauf runterzählt, ist Internet of Shit in Reinform. Ich habe meine Arbeit auf NFC aufgebaut, weil ich die Technik für wirklich nützlich halte. Aber sie in Wegwerfplastik einzubauen, nur damit du schneller nachkaufst, ist... nun ja, eine Entscheidung.

Derselbe NTAG213 steckt aber auch in Dingen, die dir als Kunde wirklich etwas bringen: Echtheitsprüfung von Produkten, Zutrittskontrolle und bald der digitale Produktpass der EU, der NFC-Tags auf Verbraucherprodukten vorschreiben wird, damit du nachprüfen kannst, was du da kaufst und wo es herkommt. Da arbeitet NFC *für* dich, nicht gegen dich.

NFC.cool Tools kann sie alle lesen und beschreiben. Die Sonicare-Funktion ist nur ein Beispiel dafür, worum es mir geht: verstehen, was auf den Tags um dich herum gespeichert ist, und dann selbst entscheiden, was du damit anfängst.

---

## Weiterführende Links

- [Cyrill Künzis ursprüngliches Reverse-Engineering-Writeup](https://kuenzi.dev/toothbrush/) - SDR-Sniffing, Passwort-Extraktion und die erste ausführliche Analyse des Sonicare-NFC-Protokolls
- [Aaron Christophels Passwort-Generator](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) - der aus der Sonicare-Firmware extrahierte Algorithmus
- [mbirths NTAG213 Memory Map](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) - jedes einzelne Byte auf dem Chip ausführlich dokumentiert

*Liegt bei dir ein Sonicare-Bürstenkopf rum? [Hol dir NFC.cool Tools für iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-de&mt=8) oder [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-de) und schau nach, was deine Zahnbürste so über dich mitgeschrieben hat.*
