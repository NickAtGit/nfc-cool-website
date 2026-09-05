---
id: batch-write-nfc-tags-csv-2026-09
title: "So beschreibst du NFC-Tags stapelweise aus einer Tabelle"
date: 2026-09-05
tags: ["guides", "nfc-tags", "iphone"]
summary: "Auf Konferenzen und Meetups verteile ich App-Store-Promo-Codes auf NFC-Tags, inzwischen Hunderte davon. So schreibe ich sie, und der Weg funktioniert für jede Liste: in einer Tabelle anlegen, als CSV exportieren, die Datei aufs Handy bringen und NFC.cool Tools einen Tag nach dem anderen beschreiben lassen."
image: "/assets/images/Features/nfc-reader-writer-csv-batch-write.webp"
imageAlt: "iPhone mit einer Tabellendatei auf dem Bildschirm, das Zeilen aus einer Tabelle auf eine Reihe von NFC-Tags schreibt"
author: "Nicolo Stanciu"
metaTitle: "NFC-Tags aus einer CSV-Datei stapelweise beschreiben"
metaDescription: "Hunderte NFC-Tags aus einer Tabelle programmieren: Liste bauen, als CSV exportieren, aufs Handy bringen, und NFC.cool Tools schreibt einen Tag nach dem anderen."
ogTitle: "NFC-Tags stapelweise aus einer Tabelle beschreiben"
ogDescription: "Von der CSV auf dem Rechner zum fertig beschriebenen Tag-Stapel, ein Scan pro Tag. So bereite ich Hunderte Promo-Code-Tags für Konferenzen vor."
---
Ich fahre auf Konferenzen und Meetups, um anderen meine Apps zu zeigen, und nach einem guten Gespräch drücke ich meinem Gegenüber gern einen NFC-Tag mit einem Promo-Code in die Hand. Handy an den Tag halten, der App Store öffnet sich, der Code ist bereits eingetragen, und schon hast du die App.

Die Tags selbst waren nie das Problem. Die Menge war es. Jeder Promo-Code ist anders, also braucht jeder Tag seinen eigenen Link, und ich wollte ein paar Hundert davon. Die alle einzeln in der App zu schreiben, kam bei dieser Stückzahl nicht in Frage. Genau deshalb habe ich das **CSV-Stapelschreiben** in NFC.cool Tools eingebaut: Ich lege die Liste auf dem Mac an, exportiere sie als CSV, bringe die Datei aufs Handy und halte dann einen Tag nach dem anderen dran, während die App die Zeilen abarbeitet. Inzwischen habe ich auf diese Weise Hunderte Tags beschrieben.

Hier ist der komplette Ablauf, von der Tabelle bis zum letzten Tag. Genauso funktioniert es für Produktlinks, Seriennummern, WLAN-Zugangsdaten oder alles andere, was in eine Tabellenzelle passt.

---

## Was das CSV-Stapelschreiben eigentlich macht

Du gibst der App eine CSV-Datei, und aus jeder Zeile wird ein Tag. Die App zeigt dir vorab, was auf jeden Tag kommt, du tippst auf **Schreiben starten** und hältst dann einen Tag nach dem anderen ans Handy. Jede geschriebene Zeile verschwindet aus der Datei, die Liste auf dem Bildschirm zeigt also immer nur, was noch übrig ist. Du kannst jederzeit aufhören und später weitermachen, auch Tage später.

Wenn du noch nie einen NFC-Tag beschrieben hast, fang mit meiner [Anleitung zum Beschreiben von NFC-Tags mit dem iPhone](/blog/write-nfc-tags-iphone/) an. In diesem Beitrag geht es darum, viele davon zu beschreiben.

---

## Schritt 1: Die Tabelle am Rechner anlegen

Öffne Numbers, Excel oder Google Sheets und leg die Liste am Rechner an. Das geht viel schneller als alles, was du am Handy machen könntest, und die Tabelle kann dir die Links gleich selbst zusammenbauen.

Das einfachste Layout ist **eine Spalte mit einer Zeile pro Tag**. Jede Zeile ist genau das, was später auf einem Tag steht. Eine Spalte mit Produktlinks sieht so aus:

```
https://example.com/products/1001
https://example.com/products/1002
https://example.com/products/1003
```

Wenn sich deine Werte nur durch eine Nummer oder eine ID unterscheiden, lass eine Formel die Spalte füllen. Den ersten Wert tippst du ein, ziehst ihn nach unten, und die Liste ist fertig, egal wie lang sie ist. Liegen die IDs schon in einer Datei vor, öffne diese Datei in der Tabellenkalkulation und setz den festen Teil per Formel davor.

Die App schaut sich an, womit jeder Wert beginnt, und wählt den passenden Record-Typ:

- Ein Link (`https://`, `http://` oder `www.`) wird zu einem URL-Record. Handy an den Tag halten, und der Browser öffnet ihn.
- `tel:`, `mailto:`, `sms:` und `geo:` werden zur passenden Aktion, ein Tag kann also eine Nummer wählen, eine neue E-Mail öffnen oder einen Ort auf der Karte zeigen.
- `WIFI:T:WPA;S:MyNetwork;P:secret;;` wird zu einem WLAN-Record, im selben Format, das auch ein WLAN-QR-Code verwendet. Ein Haken dabei: In dieser Zeichenkette stecken Semikolons, deshalb geht die App davon aus, dass deine Datei durch Semikolons getrennt ist, und zerlegt sie in Einzelteile. Stell das Trennzeichen in der App auf Komma, dann bleibt die Zeile in einem Stück.
- `shortcuts://` startet einen iOS-Kurzbefehl.
- Alles andere wird als einfacher Text geschrieben.

Schreib jeden Wert in eine einzige Zeile. Die Datei wird Zeile für Zeile gelesen, eine Kontaktkarte über mehrere Zeilen würde also auf mehreren Tags landen.

Zwei Dinge, auf die du achten solltest:

1. **Keine Kopfzeile.** Die App behandelt jede nicht leere Zeile als Inhalt. Steht in deiner ersten Zeile „URL“, dann steht auf dem ersten Tag das Wort URL.
2. **Leere Zeilen sind kein Problem.** Sie werden übersprungen, genau wie Leerzeichen vor und nach einem Wert.

### Wenn ein Tag mehrere Records braucht

Manchmal soll auf einem Tag mehr als eine Sache stehen, zum Beispiel Website, Telefonnummer und E-Mail-Adresse pro Person. Dafür legst du weitere Spalten an. In der App wählst du unter **Gruppieren nach** die Option **Nach Zeilen**, und jede Zeile wird zu einem Tag mit einem Record pro Zelle. **Nach Spalten** dreht das um und macht aus jeder Spalte einen Tag, falls du die Tabelle andersherum aufgebaut hast. Bei einer einspaltigen Datei gibt es stattdessen die Einstellung **Zeilen pro NFC-Tag**, damit drei Zeilen als drei Records auf einen Tag passen.

---

## Schritt 2: Als CSV exportieren

Eine CSV-Datei ist eine reine Textdatei. Eine Zeile pro Tabellenzeile, und die Zellen einer Zeile sind durch Komma, Semikolon oder Tabulator getrennt. Öffnest du so eine Datei in TextEdit oder im Windows-Editor, siehst du genau das, was auch die App sieht. Eine Tabelle mit Link und Telefonnummer pro Person sieht nach dem Export so aus:

```
https://example.com/anna,tel:+4915112345678
https://example.com/ben,tel:+4915198765432
```

Formatierungen und Formeln überleben den Export nicht, nur die Werte. So bekommst du die Datei aus Numbers, Excel und Google Sheets heraus.

### Numbers auf dem Mac

1. Wähle **Ablage**, dann **Exportieren**, dann **CSV**.
2. Enthält dein Dokument mehr als eine Tabelle, fragt Numbers, ob es pro Tabelle eine eigene Datei anlegen oder alle zusammenfassen soll. Du willst eine Tabelle in einer Datei.
3. Lass **Tabellennamen einschließen** deaktiviert. Sonst schreibt Numbers den Tabellennamen als eigene Zeile in die Datei, und die würde auf einem Tag landen.
4. Unter **Erweiterte Optionen** lässt du die Textcodierung auf Unicode (UTF-8).
5. Klick auf **Weiter**, gib der Datei einen Namen und klick auf **Exportieren**.

Zwei Dinge zu Numbers: Jede neue Tabelle kommt mit einer grau hinterlegten Titelzeile, und was du dort eintippst, wird exportiert wie jede andere Zeile auch. Lass sie also leer oder lösch sie. Und Numbers trennt immer mit Kommas. Enthält ein Wert selbst ein Komma, setzt Numbers ihn in Anführungszeichen, und die App entfernt diese Anführungszeichen nicht. Beim Export aus Numbers sollten die Werte also keine Kommas enthalten.

### Excel auf Mac oder Windows

1. Wähle **Datei**, dann **Speichern unter** (in manchen Versionen heißt es Kopie speichern).
2. Wähle als Format **CSV UTF-8 (durch Trennzeichen getrennt) (.csv)**.
3. Excel speichert nur das Blatt, das du gerade vor dir hast, und warnt, dass Formatierungen verloren gehen. Bestätige das, die Formatierungen brauchst du nicht.

Welches Trennzeichen Excel nimmt, hängt von den Regionseinstellungen deines Systems ab. Auf einem englischen System ist das ein Komma, auf einem deutschen, französischen, niederländischen und den meisten anderen europäischen Systemen ein Semikolon, weil das Komma dort schon als Dezimaltrennzeichen vergeben ist. Du musst daran nichts ändern: NFC.cool erkennt Komma, Semikolon und Tabulator automatisch. Es heißt aber auch, dass deine Werte selbst Kommas enthalten dürfen.

### Google Sheets

1. Wähle **Datei**, dann **Herunterladen**, dann **Kommagetrennte Werte (.csv)**.
2. Exportiert wird nur das aktuelle Tabellenblatt, immer mit Kommas.

### Bevor die Datei aufs Handy geht

Ich öffne die exportierte Datei einmal in einem Texteditor, bevor sie aufs Handy geht. Was du sehen willst: eine Zeile pro Tag, keine Kopfzeile, keine Anführungszeichen um die Werte und keine verirrten Kommas in einer kommagetrennten Datei. Muss ein Wert unbedingt ein Komma enthalten, exportiere aus Excel mit Semikolons oder nimm in Numbers den TSV-Export (tabulatorgetrennt) und benenne die Datei so um, dass sie auf `.csv` endet. Auf dem iPhone muss die Datei ohnehin auf `.csv` enden, denn danach filtert die Dateiauswahl.

---

## Schritt 3: Die Datei aufs Handy bringen

Jeder Weg ist recht, solange die Datei am Ende auf dem iPhone in der Dateien-App liegt oder auf Android an einem Ort, an den die Dateiauswahl des Systems herankommt.

- Schick die Datei per **AirDrop** vom Mac aufs iPhone und wähle „In Dateien sichern“.
- **iCloud Drive:** Leg die CSV auf dem Mac in iCloud Drive ab, dann taucht sie in der Dateien-App auf dem Handy auf. Google Drive und Dropbox funktionieren genauso, auch die kann die Dateien-App durchsuchen.
- **Schick sie dir selbst per E-Mail** und sichere den Anhang.
- **Android:** Quick Share vom Laptop, Google Drive oder ein USB-Kabel. Die App nutzt die Dokumentauswahl des Systems, jeder Ort, den sie öffnen kann, ist also in Ordnung.

---

## Schritt 4: Importieren und die Vorschau prüfen

Öffne in NFC.cool Tools den Bereich NFC-Tools und such unter **Stapelmodi** nach **CSV-Stapelschreiben**. Auf Android steht es ebenfalls in der Liste der NFC-Tools. Tipp auf **CSV importieren** und wähle deine Datei aus.

Die App legt sich eine eigene Kopie der Datei an. Während du Tags beschreibst, werden die Zeilen aus dieser Kopie entfernt. Deine Originaltabelle auf dem Rechner bleibt unangetastet, die vollständige Liste hast du also immer noch.

Sobald die Datei ausgewählt ist, zeigt die App, was sie erkannt hat: das Trennzeichen, die Anzahl der Spalten, den Gruppierungsmodus und wie viele Tags du brauchen wirst. Die eine Zahl, die ich immer prüfe, ist **Bytes pro NFC-Tag**, die Größe der größten Nachricht im Stapel. Vergleich sie mit deinen Tags. Ein NTAG213 fasst 144 Bytes, ein NTAG215 504 und ein NTAG216 888. Ein kurzer Link liegt bei etwa 50 Bytes, für Links reichen also die günstigsten Tags. Ein WLAN-Record oder eine längere Kontaktkarte braucht einen 215 oder 216. Wenn du nicht sicher bist, welchen Chip du hast, wirf einen Blick in meinen [Ratgeber zu den NFC-Tag-Typen](/blog/nfc-tag-types-for-iphones/).

Öffne die **Stapelvorschau**, um jeden Tag mit den Records zu sehen, die er bekommt. Was dort steht, wird genau so geschrieben.

---

## Schritt 5: Den Stapel beschreiben

Tipp auf **Schreiben starten** und halte den ersten Tag an die Oberkante deines iPhones. Sobald das Handy vibriert, ist der Tag geschrieben und du nimmst den nächsten. Die gerade geschriebene Zeile verschwindet aus der Liste, und der Zähler sagt dir, wie viele noch übrig sind.

Ein paar Dinge, die passieren werden und völlig normal sind:

- **Die Scan-Ansicht verschwindet nach 60 Sekunden.** Das ist eine Beschränkung von iOS, kein Absturz. Sie kommt nach ein paar Sekunden von selbst wieder, und du machst weiter, wo du warst.
- **Ein Tag lässt sich nicht beschreiben.** Vielleicht war er gesperrt, vielleicht hast du ihn zu früh weggezogen. Die Zeile bleibt in der Datei, die App springt nicht weiter, und du hältst den Tag noch einmal dran oder nimmst einen anderen.
- **Du musst unterbrechen.** Schließ die App, mach etwas anderes, komm morgen wieder. Die Datei merkt sich, was noch übrig ist. Auf Android zeigt die App den unfertigen Stapel an und bietet dir an, ihn fortzusetzen.

Hundert Tags sind schnell geschafft, wenn du erst einmal im Rhythmus bist.

---

## Was ich beim Beschreiben von Hunderten Tags gelernt habe

**Schreib erst zwei Tags.** Lies sie danach mit der App wieder aus und prüf, ob die Tags tun, was sie sollen. Erst dann kommt der Rest dran.

**Du brauchst nicht den größten Chip.** Für Links reicht ein NTAG213, und der ist in größeren Mengen spürbar günstiger. Den NTAG216 hebst du dir für Kontaktkarten und WLAN auf.

**Sperr die Tags, die du weitergibst, oder schütz sie mit einem Passwort.** Direkt neben dem CSV-Stapelschreiben gibt es die Modi Stapelsperren und Stapel-Passwortschutz. Die Sperre macht einen Tag für immer schreibgeschützt, mit einem Passwort kannst du ihn später noch ändern, aber sonst niemand. Tags, die du aus der Hand gibst, schickst du hinterher noch durch einen der beiden Modi, damit niemand den Inhalt überschreiben kann.

Das CSV-Stapelschreiben steckt in [NFC.cool Tools auf dem iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-batch-write-nfc-tags-csv-de&mt=8) und auf [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-batch-write-nfc-tags-csv-de). Und wenn du mich auf einer Konferenz oder einem Meetup triffst: Frag mich nach einem Tag.
