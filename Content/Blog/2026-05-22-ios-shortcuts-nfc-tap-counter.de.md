---
id: "ios-shortcuts-nfc-tap-counter-2026-05"
title: "NFC-Tap-Zähler-Daten in iOS-Kurzbefehlen parsen"
date: "2026-05-22"
tags: ["nfc-tags", "automation", "iphone"]
summary: "Zwei fertige iOS-Kurzbefehle, die Tag-ID und Zählerstand aus dem NFC-Tap-Zähler herausziehen - ein wiederverwendbarer Parser und ein Tag-Alert als Demo dazu."
image: "/assets/images/Blog/ios-shortcuts-nfc-tap-counter.webp"
imageAlt: "Ein iPhone zeigt einen Hinweis mit Tag-ID und Zählerstand, nachdem ein NFC-Sticker angetippt wurde"
author: "Nicolo Stanciu"
metaTitle: "NFC-Tap-Zähler-Daten in iOS-Kurzbefehlen parsen"
metaDescription: "Ein wiederverwendbarer iOS-Kurzbefehl, der die Werte des NFC-Tap-Zählers (Tag-ID und Zählerstand) parst, plus ein Tag-Alert als Demo. Direkt per iCloud-Link installieren."
ogTitle: "NFC-Tap-Zähler-Daten in iOS-Kurzbefehlen parsen"
ogDescription: "Zwei fertige iOS-Kurzbefehle für den NFC-Tap-Zähler: ein wiederverwendbarer Parser und ein Tag-Alert als Demo."
---

Vor einer Woche habe ich [erklärt, wie der NFC-Tap-Zähler funktioniert](/de/blog/count-nfc-tag-scans/): Der Chip zählt seine eigenen Scans, die App bettet Platzhalter-Bytes ein, und der Tag setzt bei jedem Antippen den aktuellen Zählerstand und die Tag-ID in das ein, was er trägt. Dieser Beitrag endet dort, wo auch der Tag endet - in dem Moment, in dem die Werte auf deinem Telefon ankommen.

Die naheliegende Folgefrage höre ich seitdem ständig: "Schön, der Tag hat mir `049F50824F1390x000007` übergeben - und jetzt?" Wenn du auf dem iPhone bist und auf diese Werte in einem Kurzbefehl reagieren willst, musst du sie auseinandernehmen. Das ist eine kleine, aber fummelige Stringverarbeitung, und du sollst sie nicht selbst schreiben müssen.

Also habe ich zwei Kurzbefehle gebaut und teile sie als iCloud-Links. Einer ist das Gehirn. Der andere ist eine Demo, die das Gehirn benutzt.

---

## Was der Tag dir übergibt

Bevor es zu den Kurzbefehlen geht, kurz nochmal zur Erinnerung, was sie eigentlich bekommen - denn das bestimmt, wie du sie verwendest.

Im Einrichtungsbildschirm des Tap-Zählers wählst du, was der Tag liefern soll: URL, E-Mail, SMS oder einen Kurzbefehl. Wenn du die Schalter für Tap-Zähler und/oder Tag-ID aktivierst, bettet die App Platzhalter-Bytes in diesen Inhalt ein, und der Chip ersetzt sie bei jedem Lesevorgang durch die Live-Werte. Mit `049F50824F1390` als Tag-ID und `000007` als Zählerstand sehen die vier Inhaltstypen am Ende so aus:

- **URL:** `https://nfc.cool/tap-counter/` wird zu [`https://nfc.cool/tap-counter/?nfc=049F50824F1390x000007`](https://nfc.cool/tap-counter/?nfc=049F50824F1390x000007)
- **E-Mail-Text:** `Hi, hier ist meine Karte.` wird zu `Hi, hier ist meine Karte. 049F50824F1390x000007`
- **SMS-Text:** `Bestellung bestätigt!` wird zu `Bestellung bestätigt! 049F50824F1390x000007`
- **Kurzbefehl-Eingabe:** `log-entry` wird zu `log-entry 049F50824F1390x000007`

Die URL oben ist eine echte. Unsere [Live-Demo-Seite zum Tap-Zähler](/de/tap-counter/) liest den `?nfc=`-Wert direkt aus ihrer eigenen Adressleiste, das heißt: Wenn du die Ersetzung einmal in Aktion sehen willst, bevor du eine eigene Automatisierung baust, schreib einen Tag mit `https://nfc.cool/tap-counter/` und beiden Schaltern an, tippe ihn an, und die Seite zeigt dir die Tag-ID und den Zählerstand, die sie gerade bekommen hat.

Wenn der Inhaltstyp **Kurzbefehl** ist, ruft NFC.cool den gewählten Kurzbefehl über `shortcuts://run-shortcut?name=Mein%20Kurzbefehl&input=text&text=<payload>` auf, wobei die angehängten NFC-Werte schon im Text stehen. Die Eingabe deines Kurzbefehls ist also ein einfacher Text-String. Deine einzige Aufgabe ist es, die Tag-ID und den Zählerstand wieder daraus herauszuziehen.

Je nachdem, welche Schalter beim Schreiben des Tags an waren, bekommst du das volle Muster (14 Hex-Zeichen, ein `x`, dann 6 Hex-Zeichen), nur die 14-stellige Tag-ID oder nur den 6-stelligen Zählerstand. Der Parser kommt mit allen drei Varianten klar.

---

## Parse NFC Tap Counter - der wiederverwendbare Parser

[Parse NFC Tap Counter installieren](https://www.icloud.com/shortcuts/4c70ab3ade1a4398bb6a39edba94bf26)

Das hier ist das Gehirn. Es zeigt keine Oberfläche, nimmt eine einzelne Texteingabe und gibt ein Wörterbuch zurück. Das ist Absicht: Ein Hilfs-Kurzbefehl ohne UI lässt sich sauber in alles andere einbauen, was du baust, und ein Wörterbuch ist mit der eingebauten Aktion **Wörterbuchwert abrufen** das, was sich aus einem anderen Kurzbefehl am einfachsten auslesen lässt.

Das ist drin im Wörterbuch:

- `tagID` - die 14-stellige Hex-Tag-ID oder ein leerer String, falls der Schalter aus war.
- `count` - der Zählerstand als Dezimalzahl (aus `000007` wird also `7`, aus `00000A` wird `10`) oder leer, falls der Schalter aus war.
- `countHex` - der ursprüngliche 6-stellige Hex-Zählerstand, falls du ihn unverändert brauchst. Leer, wenn nicht vorhanden.
- `hasTagID`, `hasCount` - Boolesche Werte zum Verzweigen, damit du **Wenn hasCount wahr ist** schreiben kannst, ohne den String selbst prüfen zu müssen.
- `content` - die Eingabe ohne die angehängten NFC-Werte, damit der Rest deines Kurzbefehls die Eingabe so sieht, wie sie war, bevor der Tag sie ergänzt hat. War die Eingabe eine URL mit `?nfc=...`, bekommst du die URL ohne diesen Teil zurück. War es ein E-Mail-Text mit angehängter Tag-ID, bekommst du den Text ohne Anhang zurück.
- `raw` - die unveränderte ursprüngliche Eingabe, falls du sie loggen oder darauf zurückfallen willst.

Um den Parser aus deinem eigenen Kurzbefehl heraus aufzurufen, brauchst du drei Aktionen:

1. **Kurzbefehl-Eingabe** als Text empfangen (hier kommt die NFC-Nutzlast an).
2. **Kurzbefehl ausführen** -> Parse NFC Tap Counter, mit diesem Text als Eingabe. **Bei Ausführung anzeigen** ausschalten, damit er unsichtbar bleibt.
3. **Wörterbuchwert abrufen** -> wähl `tagID`, `count`, `content` oder welche Schlüssel du eben brauchst.

Das war's. Ab Schritt 3 kannst du mit den Werten machen, was du willst: anhand von `hasTagID` verzweigen, `count` in eine Notiz schreiben, einen Webhook mit dem JSON auslösen, was auch immer. Der Parser nimmt sich nicht heraus zu wissen, was dein Kurzbefehl mit dem Ergebnis anstellen soll - genau deshalb ist er klein und wiederverwendbar.

Eine kleine Anmerkung zum Zählerstand: Er ist im Wörterbuch eine echte Zahl, kein Text-String. Du kannst ihn also direkt in eine Aktion **Berechnen** oder einen Vergleich in **Wenn** stecken, ohne ihn noch einmal umzuwandeln. Die Hex-zu-Dezimal-Umwandlung ist schon erledigt.

---

## NFC Tag Alert - die Demo

[NFC Tag Alert installieren](https://www.icloud.com/shortcuts/f78b78c917a2417385ae25711a3e877a)

Das ist eine Demo, die ich auch dann am ersten Tag installieren würde, wenn ich gar nicht vorhabe, im Produktivbetrieb Hinweise einzublenden. Sie nimmt eine Text-Kurzbefehl-Eingabe entgegen, lässt den Parser darüber laufen und zeigt einen einzigen Hinweis mit dem Titel **NFC Tag Scanned** und zwei Zeilen:

```
Tag ID: 049F50824F1390
Scans: 7
```

Der Grund, weshalb ich sie zuerst installieren würde: Sie ist die schnellstmögliche Plausibilitätsprüfung für einen Tag mit Zähler. Schreibe einen Tag mit NFC.cool Tools, Inhaltstyp **Kurzbefehl**, Name **NFC Tag Alert**, Schalter für Tap-Zähler und Tag-ID an, Tag schreiben, Tag antippen. Ein Hinweis erscheint mit den echten Werten von deinem physischen Tag.

Wenn der Hinweis die Werte zeigt, die du erwartet hast, macht dein Tag seine Arbeit und du kannst etwas Komplexeres bauen. Wenn der Zählerstand falsch oder die Tag-ID leer ist, weißt du, dass es am Tag (oder an den Schaltern beim Schreiben) liegt und nicht an deinem eigenen Kurzbefehl. Eine ganze Klasse von "Liegt das überhaupt am Chip?"-Debugging auszuschließen, ist einen Kurzbefehl mit fünf Aktionen wert.

Falls du dich je fragst, wie man den Parser richtig aufruft: Dieser Kurzbefehl ist außerdem das kleinstmögliche Praxisbeispiel dafür. Mach ihn auf, schau dir die fünf Aktionen an, übernimm den Aufbau in deinen eigenen Kurzbefehl.

---

## Den Parser in deinen eigenen Kurzbefehl einbauen

Es gibt zwei Wege, wie Tag-Inhalte in deinen Kurzbefehl gelangen. Der Parser ist mit beiden glücklich.

**Tag-getrieben (Inhaltstyp Kurzbefehl).** Schreib den Tag mit Inhaltstyp **Kurzbefehl**, wähl deinen Kurzbefehl per Name aus, aktiviere die gewünschten Schalter. Ab jetzt startet jeder Tap deinen Kurzbefehl, die NFC-Nutzlast steckt schon in der Eingabe. In deinem Kurzbefehl rufst du Parse NFC Tap Counter auf dieser Eingabe auf und hast `tagID` und `count` zur Hand.

**URL-getrieben (Inhaltstyp URL).** Das ist der häufigere Fall. Der Tag trägt eine URL, das Telefon öffnet diese URL beim Antippen, der Zählerstand reist als `?nfc=...` mit. Wenn statt (oder zusätzlich zu) einem Browser ein Kurzbefehl darauf reagieren soll, geht das: Lass einen Kurzbefehl eine Safari-Webseite als Eingabe annehmen und führe Parse NFC Tap Counter auf der URL aus. Der Parser schneidet den `?nfc=`-Teil sauber heraus und gibt dir als `content` die URL ohne Anhang zurück, sodass du sie an einen Browser, einen API-Aufruf oder irgendetwas anderes weiterreichen kannst, das eine saubere URL erwartet.

Hier ein vieraktiges Beispiel für "jeden Scan in einer Notiz in Apple Notizen festhalten":

1. **Kurzbefehl-Eingabe** als Text empfangen.
2. **Kurzbefehl ausführen** -> Parse NFC Tap Counter, mit der Eingabe als Text.
3. **Wörterbuchwert abrufen** -> drei Aufrufe hintereinander für `tagID`, `count` und `content`. Jeden in einer Variable ablegen.
4. **An Notiz anhängen** -> eine einzelne Zeile wie `[Aktuelles Datum] tag=<tagID> count=<count> url=<content>`.

Du hast jetzt ein laufendes Tap-Log, das der Tag selbst schreibt. Kein Backend, keine externen Analytics, kein Konto irgendwo.

---

## Ein paar Ideen zum Weiterbauen

Eine Handvoll kleiner Dinge, die der Parser ermöglicht, damit du sie nicht von Null erfinden musst:

- **Nach Tag-ID verzweigen.** Ein Kurzbefehl, viele Tags. Pro bekannter Tag-ID eine **Wenn**-Aktion: wenn der Bürotag gescannt wurde, Mitteilungen stummschalten; wenn der Studio-Tag dran war, einen Fokus aktivieren; wenn der Küchentag gescannt wurde, einen Timer starten. Die Tag-ID identifiziert den physischen Tag, nicht den Inhalt - du kannst also allen Tags dieselbe URL geben und trotzdem auf jeden einzeln reagieren.
- **Den Gewinner bei Scan N küren.** Kombiniere `hasCount` mit einem Vergleich. Wenn `count` gleich 100 ist, eine Bestätigungsnachricht auslösen; bei allen anderen Scans die normale Behandlung. Die Reihenfolge erzwingt der Chip; dein Kurzbefehl liest sie nur ab.
- **An einen Webhook schicken.** Kombiniere das mit der [Webhook-Funktion](/de/features/webhooks/) von NFC.cool, wenn du serverseitige Verarbeitung willst, ohne eine iOS-App zu schreiben: schick die geparsten Werte als JSON, der Server macht den Rest. Zwei iOS-Aktionen und dein Tag ist an alles angebunden, was HTTP spricht.
- **In eine Datei oder Notiz schreiben.** Die einfachste und überraschend nützliche Idee. Häng `Zeitstempel, tagID, count` an eine Datei in iCloud Drive oder eine einzelne Notiz an, und du hast ein Tap-Log, durch das du später scrollen oder das du auswerten kannst. Gut für Engagement-Tracking an einem einzelnen Tag, ohne Infrastruktur aufzubauen.

Wenn du etwas Nettes damit baust, würde ich es ehrlich gern sehen.

---

## Ein kurzes Dankeschön

Beide Kurzbefehle habe ich mit [Shortcuts Playground](https://github.com/viticci/shortcuts-playground-plugin) gebaut, Federico Viticcis Plugin, das iOS-Kurzbefehle aus natürlicher Sprache erzeugt. Ein wirklich gutes Werkzeug - vielen Dank, Federico, dass du das veröffentlicht hast. Ohne dieses Plugin hätten die beiden hier deutlich länger gedauert.

---

## Eine kurze Anmerkung zu Android

Kurzbefehle sind eine Apple-App, diese beiden hier laufen also nur auf dem iPhone. Die Tap-Zähler-Funktion selbst funktioniert aber auf beiden Plattformen, weil die Ersetzung im Chip passiert und es ihr egal ist, welches Telefon den Tag liest. Auf Android verhalten sich die Inhaltstypen URL, E-Mail und SMS genauso wie auf iOS; wenn du dort ähnliche Automatisierungen willst, können Apps wie Tasker oder MacroDroid eine URL mit `?nfc=...` annehmen und die Werte mit ihren eigenen String-Aktionen herausziehen. Das Format auf dem Tag ist dasselbe.

---

## Probier es aus

Wenn du die ausführliche Erklärung willst, wie der Tap-Zähler unter der Haube wirklich funktioniert, steckt sie im [vorherigen Beitrag](/de/blog/count-nfc-tag-scans/). Und wenn du einen Tag mit Zähler in Aktion sehen willst, ohne vorher eine eigene Automatisierung einzurichten, liest unsere [Live-Demo-Seite zum Tap-Zähler](/de/tap-counter/) den `?nfc=`-Wert direkt aus ihrer eigenen URL aus: Schreib einen Tag, der darauf zeigt, tippe ihn an, und sieh zu, wie Zählerstand und Tag-ID erscheinen.

Die NFC-Tap-Zähler-Funktion selbst steckt in NFC.cool Tools, auf [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ios-shortcuts-nfc-tap-counter-de&mt=8) und [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ios-shortcuts-nfc-tap-counter-de). Für das vollständige NFC-Toolkit, das ich gebaut habe, wirf einen Blick auf die [Seite zum NFC-Reader und -Writer](/de/features/nfc-reader-writer/).
