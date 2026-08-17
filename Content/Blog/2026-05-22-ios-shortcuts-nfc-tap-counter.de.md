---
id: "ios-shortcuts-nfc-tap-counter-2026-05"
title: "NFC-Tap-Zähler-Daten mit iOS-Kurzbefehlen parsen"
date: "2026-05-22"
tags: ["nfc-tags", "automation", "iphone"]
summary: "Zwei fertige iOS-Kurzbefehle, die Tag-ID und Zählerstand aus dem NFC-Tap-Zähler herausholen: ein wiederverwendbarer Parser und als Demo ein Kurzbefehl, der beim Scan einen Hinweis einblendet."
image: "/assets/images/Blog/ios-shortcuts-nfc-tap-counter.webp"
imageAlt: "Ein iPhone zeigt nach dem Scan eines NFC-Stickers einen Hinweis mit Tag-ID und Zählerstand"
author: "Nicolo Stanciu"
metaTitle: "NFC-Tap-Zähler-Daten mit iOS-Kurzbefehlen parsen"
metaDescription: "Ein wiederverwendbarer iOS-Kurzbefehl, der Tag-ID und Zählerstand des NFC-Tap-Zählers ausliest, plus eine kleine Demo. Fertig per iCloud-Link, direkt anpassbar."
ogTitle: "NFC-Tap-Zähler-Daten mit iOS-Kurzbefehlen parsen"
ogDescription: "Zwei fertige iOS-Kurzbefehle für den NFC-Tap-Zähler: ein wiederverwendbarer Parser und eine Demo, die beim Scan einen Hinweis zeigt."
---

Vor einer Woche habe ich [erklärt, wie der NFC-Tap-Zähler funktioniert](/de/blog/count-nfc-tag-scans/): Der Chip zählt seine eigenen Scans, die App bettet Platzhalter-Bytes ein, und bei jedem Scan setzt der Tag den aktuellen Zählerstand und seine Tag-ID in den Inhalt ein, den er trägt. Der Beitrag hört da auf, wo auch der Tag aufhört: in dem Moment, in dem die Werte auf deinem Handy ankommen.

Seitdem bekomme ich immer wieder die naheliegende Anschlussfrage: „Schön, der Tag liefert mir `049F50824F1390x000007` - und was mache ich jetzt damit?“ Wer auf dem iPhone in einem Kurzbefehl mit diesen Werten weiterarbeiten will, muss sie erst einmal auseinandernehmen. Das ist ein kleines, aber fummeliges Stück Stringverarbeitung, und ich finde, das musst du nicht selbst schreiben.

Also habe ich zwei Kurzbefehle gebaut und stelle sie als iCloud-Links bereit. Einer ist das Gehirn. Der andere ist eine Demo, die dieses Gehirn benutzt.

---

## Was der Tag dir überhaupt übergibt

Bevor es an die Kurzbefehle geht, kurz zur Erinnerung, was bei ihnen eigentlich ankommt. Davon hängt nämlich ab, wie du sie einsetzt.

Im Einrichtungsbildschirm des Tap-Zählers legst du fest, welchen Inhalt der Tag bekommt: URL, E-Mail, SMS oder Kurzbefehl. Schaltest du Tap-Zähler und/oder Tag-ID ein, bettet die App Platzhalter-Bytes in diesen Inhalt ein, und der Chip tauscht sie bei jedem Lesevorgang gegen die aktuellen Werte aus. Mit `049F50824F1390` als Tag-ID und `000007` als Zählerstand sehen die vier Inhaltstypen hinterher so aus:

- **URL:** `https://nfc.cool/tap-counter/` wird zu [`https://nfc.cool/tap-counter/?nfc=049F50824F1390x000007`](https://nfc.cool/tap-counter/?nfc=049F50824F1390x000007)
- **E-Mail-Text:** `Hi, hier ist meine Karte.` wird zu `Hi, hier ist meine Karte. 049F50824F1390x000007`
- **SMS-Text:** `Bestellung bestätigt!` wird zu `Bestellung bestätigt! 049F50824F1390x000007`
- **Kurzbefehl-Eingabe:** `log-entry` wird zu `log-entry 049F50824F1390x000007`

Die URL oben ist echt. Unsere [Live-Demo-Seite zum Tap-Zähler](/de/tap-counter/) liest den `?nfc=`-Wert direkt aus ihrer eigenen Adresszeile. Wenn du also sehen willst, wie die Ersetzung in echt aussieht, bevor du eine eigene Automatisierung baust: Schreib einen Tag mit `https://nfc.cool/tap-counter/` und beiden Schaltern an, halt das Handy dran, und die Seite zeigt dir Tag-ID und Zählerstand, die gerade bei ihr angekommen sind.

Beim Inhaltstyp **Kurzbefehl** startet NFC.cool den gewählten Kurzbefehl über `shortcuts://run-shortcut?name=Mein%20Kurzbefehl&input=text&text=<payload>`, und die angehängten NFC-Werte stehen dabei schon im Text. Die Eingabe deines Kurzbefehls ist also schlicht ein Text-String. Du musst daraus nur noch Tag-ID und Zählerstand herausholen.

Je nachdem, welche Schalter beim Schreiben des Tags an waren, bekommst du entweder das komplette Muster (14 Hex-Zeichen, ein `x`, dann 6 Hex-Zeichen), nur die 14-stellige Tag-ID oder nur den 6-stelligen Zählerstand. Der Parser kommt mit allen drei Varianten zurecht.

---

## Parse NFC Tap Counter - der wiederverwendbare Parser

[Parse NFC Tap Counter installieren](https://www.icloud.com/shortcuts/4c70ab3ade1a4398bb6a39edba94bf26)

Das ist das Gehirn. Der Kurzbefehl zeigt keine Oberfläche, nimmt einen einzelnen Text als Eingabe und gibt ein Wörterbuch zurück. Das ist Absicht: Ein Hilfs-Kurzbefehl ohne UI lässt sich sauber in alles einbauen, was du sonst noch baust, und ein Wörterbuch lässt sich mit der eingebauten Aktion **Wörterbuchwert abrufen** aus einem anderen Kurzbefehl heraus am einfachsten auslesen.

Das steht im Wörterbuch drin:

- `tagID` - die 14-stellige Hex-Tag-ID, oder ein leerer String, wenn der Schalter aus war.
- `count` - der Zählerstand als Dezimalzahl (aus `000007` wird also `7`, aus `00000A` wird `10`), oder leer, wenn der Schalter aus war.
- `countHex` - der ursprüngliche 6-stellige Hex-Zählerstand, falls du ihn unverändert brauchst. Leer, wenn er fehlt.
- `hasTagID`, `hasCount` - Boolesche Werte zum Verzweigen. Du schreibst einfach **Wenn hasCount wahr ist** und musst den String nicht selbst prüfen.
- `content` - die Eingabe ohne die angehängten NFC-Werte, damit der Rest deines Kurzbefehls sie so sieht wie vor der Ergänzung durch den Tag. War die Eingabe eine URL mit `?nfc=...`, bekommst du die URL ohne diesen Teil zurück. War es ein E-Mail-Text mit angehängter Tag-ID, bekommst du den Text ohne den Anhang.
- `raw` - die unveränderte Eingabe, falls du sie protokollieren oder im Zweifel darauf zurückgreifen willst.

Um den Parser aus deinem eigenen Kurzbefehl heraus aufzurufen, brauchst du drei Aktionen:

1. **Kurzbefehl-Eingabe** als Text empfangen (hier landet die NFC-Nutzlast).
2. **Kurzbefehl ausführen** -> Parse NFC Tap Counter, mit diesem Text als Eingabe. **Bei Ausführung anzeigen** ausschalten, damit er unsichtbar bleibt.
3. **Wörterbuchwert abrufen** -> `tagID`, `count`, `content` oder welche Schlüssel du eben brauchst.

Das war's. Ab Schritt 3 machst du mit den Werten, was du willst: nach `hasTagID` verzweigen, `count` in eine Notiz schreiben, einen Webhook mit dem JSON anstoßen, was auch immer. Der Parser trifft keine Annahmen darüber, was dein Kurzbefehl mit dem Ergebnis vorhat. Genau deshalb bleibt er klein und wiederverwendbar.

Noch ein Wort zum Zählerstand: Im Wörterbuch ist er eine echte Zahl, kein Text. Du kannst ihn also direkt in eine **Berechnen**-Aktion oder in einen Vergleich mit **Wenn** stecken, ohne ihn erst umzuwandeln. Die Umrechnung von Hex nach Dezimal ist schon passiert.

---

## NFC Tag Alert - die Demo

[NFC Tag Alert installieren](https://www.icloud.com/shortcuts/f78b78c917a2417385ae25711a3e877a)

Diese Demo würde ich an deiner Stelle gleich am ersten Tag installieren, auch wenn du im Alltag gar keine Hinweise einblenden willst. Sie nimmt eine Text-Eingabe entgegen, jagt sie durch den Parser und zeigt einen einzigen Hinweis mit dem Titel **NFC Tag Scanned** und zwei Zeilen:

```
Tag ID: 049F50824F1390
Scans: 7
```

Warum ich sie zuerst installieren würde: Sie ist der schnellste Plausibilitätscheck, den es für einen Tag mit Zähler gibt. In NFC.cool Tools einen Tag mit Inhaltstyp **Kurzbefehl** und dem Namen **NFC Tag Alert** anlegen, Tap-Zähler und Tag-ID einschalten, Tag schreiben, Handy dranhalten. Es erscheint ein Hinweis mit den echten Werten von deinem physischen Tag.

Zeigt der Hinweis die Werte, die du erwartet hast, macht dein Tag seinen Job, und du kannst dich an etwas Aufwendigeres machen. Stimmt der Zählerstand nicht oder fehlt die Tag-ID, weißt du, dass es am Tag liegt (oder an den Schaltern beim Schreiben) und nicht an deinem eigenen Kurzbefehl. Damit fällt eine ganze Kategorie von „Liegt das jetzt am Chip oder an mir?“-Fehlersuche weg, und dafür lohnt sich ein Kurzbefehl mit fünf Aktionen allemal.

Und falls du dich mal fragst, wie man den Parser richtig aufruft: Dieser Kurzbefehl ist zugleich das kleinste Praxisbeispiel dafür. Öffne ihn, schau dir die fünf Aktionen an und übernimm den Aufbau in deinen eigenen Kurzbefehl.

---

## Den Parser in deinen eigenen Kurzbefehl einbauen

Tag-Inhalte können auf zwei Wegen bei deinem Kurzbefehl landen. Dem Parser ist beides recht.

**Über den Tag (Inhaltstyp Kurzbefehl).** Schreib den Tag mit Inhaltstyp **Kurzbefehl**, wähl deinen Kurzbefehl über seinen Namen aus und schalte die gewünschten Schalter ein. Von da an startet jeder Scan deinen Kurzbefehl, und die NFC-Nutzlast steckt schon in der Eingabe. Darin rufst du Parse NFC Tap Counter mit dieser Eingabe auf und hast `tagID` und `count` sofort zur Hand.

**Über eine URL (Inhaltstyp URL).** Das ist der häufigere Fall. Der Tag trägt eine URL, das Handy öffnet sie beim Scan, und der Zählerstand hängt als `?nfc=...` hinten dran. Wenn statt des Browsers (oder zusätzlich zu ihm) ein Kurzbefehl reagieren soll, geht das auch: Bau einen Kurzbefehl, der eine Safari-Webseite als Eingabe annimmt, und lass Parse NFC Tap Counter auf der URL laufen. Der Parser schneidet den `?nfc=`-Teil sauber heraus und gibt dir die URL ohne Anhang als `content` zurück. Die kannst du dann an einen Browser, einen API-Aufruf oder was auch immer weiterreichen, das eine saubere URL erwartet.

Hier ein Beispiel mit vier Aktionen, das jeden Scan in einer Notiz in Apple Notizen festhält:

1. **Kurzbefehl-Eingabe** als Text empfangen.
2. **Kurzbefehl ausführen** -> Parse NFC Tap Counter, mit der Eingabe als Text.
3. **Wörterbuchwert abrufen** -> dreimal hintereinander, für `tagID`, `count` und `content`. Jeden Wert in einer Variablen ablegen.
4. **An Notiz anhängen** -> eine einzelne Zeile wie `[Aktuelles Datum] tag=<tagID> count=<count> url=<content>`.

Damit hast du ein laufendes Scan-Protokoll, das der Tag selbst schreibt. Kein Backend, keine Analytics von Dritten, kein Konto irgendwo.

---

## Ein paar Ideen zum Weiterbauen

Ein paar kleine Dinge, die der Parser möglich macht. Ich schreibe sie hier auf, damit du nicht bei null anfangen musst:

- **Nach Tag-ID verzweigen.** Ein Kurzbefehl, viele Tags. Für jede bekannte Tag-ID eine **Wenn**-Aktion: Bürotür-Tag gescannt, Mitteilungen stummschalten; Studio-Tag gescannt, Fokus einschalten; Küchen-Tag gescannt, Timer starten. Die Tag-ID steht für den physischen Tag, nicht für den Inhalt. Du kannst also allen Tags dieselbe URL geben und trotzdem auf jeden einzeln reagieren.
- **Beim Scan Nummer N einen Gewinner küren.** Kombiniere `hasCount` mit einem Vergleich: Ist `count` gleich 100, geht eine Bestätigungsnachricht raus; jeder andere Scan läuft ganz normal durch. Die Reihenfolge stellt der Chip sicher, dein Kurzbefehl liest sie nur ab.
- **An einen Webhook schicken.** Zusammen mit der [Webhook-Funktion](/de/features/webhooks/) von NFC.cool bekommst du serverseitige Verarbeitung, ohne eine iOS-App zu schreiben: Schick die geparsten Werte als JSON, den Rest erledigt der Server. Zwei iOS-Aktionen, und dein Tag hängt an allem, was HTTP spricht.
- **In eine Datei oder Notiz schreiben.** Die einfachste Idee, und erstaunlich nützlich. Häng `Zeitstempel, tagID, count` an eine Datei in iCloud Drive oder an eine einzelne Notiz an, und du hast ein Scan-Protokoll, durch das du später scrollen oder aus dem du ein Diagramm bauen kannst. Praktisch, wenn du bei einem einzelnen Tag verfolgen willst, wie oft er genutzt wird, ohne dafür Infrastruktur aufzusetzen.

Wenn du damit etwas Schönes baust, würde ich es wirklich gern sehen.

---

## Ein kurzes Dankeschön

Beide Kurzbefehle sind mit [Shortcuts Playground](https://github.com/viticci/shortcuts-playground-plugin) entstanden, dem Plugin von Federico Viticci, das iOS-Kurzbefehle aus natürlicher Sprache erzeugt. Ein richtig gutes Werkzeug. Danke, Federico, dass du es veröffentlicht hast - ohne das Plugin hätte ich an den beiden deutlich länger gesessen.

---

## Eine kurze Anmerkung zu Android

Kurzbefehle sind eine Apple-App, die beiden hier laufen also nur auf dem iPhone. Der Tap-Zähler selbst funktioniert aber auf beiden Plattformen, weil die Ersetzung im Chip passiert und dem Chip egal ist, welches Handy ihn gerade liest. Auf Android verhalten sich die Inhaltstypen URL, E-Mail und SMS genauso wie auf iOS. Wer dort ähnliche Automatisierungen bauen will, kann mit Apps wie Tasker oder MacroDroid eine URL mit `?nfc=...` entgegennehmen und die Werte mit deren eigenen String-Aktionen herausziehen. Das Format auf dem Tag ist dasselbe.

---

## Probier es aus

Die ausführliche Erklärung, wie der Tap-Zähler unter der Haube arbeitet, steht im [vorherigen Beitrag](/de/blog/count-nfc-tag-scans/). Und wenn du einen Tag mit Zähler erst mal in Aktion sehen willst, ohne vorher eine eigene Automatisierung einzurichten: Unsere [Live-Demo-Seite zum Tap-Zähler](/de/tap-counter/) liest den `?nfc=`-Wert direkt aus ihrer eigenen URL. Schreib einen Tag, der dorthin zeigt, halt das Handy dran und schau zu, wie Zählerstand und Tag-ID auftauchen.

Der NFC-Tap-Zähler selbst steckt in NFC.cool Tools, für [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ios-shortcuts-nfc-tap-counter-de&mt=8) und [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ios-shortcuts-nfc-tap-counter-de). Und wenn du sehen willst, was ich sonst noch rund um NFC gebaut habe, wirf einen Blick auf die [Seite zum NFC-Reader und -Writer](/de/features/nfc-reader-writer/).
