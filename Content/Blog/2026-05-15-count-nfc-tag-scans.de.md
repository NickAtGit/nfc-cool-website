---
id: "count-nfc-tag-scans-2026-05"
title: "NFC-Tag-Scans zählen - ganz ohne Server"
date: "2026-05-15"
category: "nfc"
tags: ["nfc", "nfc-tags", "nfc-tech", "guides"]
summary: "Klebe dieselbe URL auf 50 NFC-Sticker und du weißt nicht, welcher angetippt wurde - es sei denn, der Tag zählt selbst mit. So geht's."
image: "/assets/images/Blog/count-nfc-tag-scans.webp"
imageAlt: "Ein NFC-Tag wird von einem Smartphone angetippt, daneben eine steigende Scan-Zählung"
author: "Nicolo Stanciu"
metaTitle: "NFC-Tag-Scans zählen - ganz ohne Server"
metaDescription: "Zähle mit dem im Chip eingebauten Zähler, wie oft ein NFC-Tag angetippt wurde - und welcher Tag es war. Kein Backend, kein Internet. Eine praktische Anleitung."
ogTitle: "NFC-Tag-Scans zählen - ganz ohne Server"
ogDescription: "Dein NFC-Tag kann seine eigenen Scans zählen. So nutzt du das für Engagement-Tracking, limitierte Editionen und Echtheitsprüfungen."
---

Du druckst dieselbe URL auf fünfzig NFC-Sticker und klebst sie auf fünfzig Produkte, fünfzig Poster oder fünfzig Visitenkarten. Eine Woche später stellt jemand die naheliegende Frage: Welcher wurde eigentlich angetippt? Und wie oft?

Die übliche Antwort ist ein Server. Du erzeugst fünfzig eindeutige Links, leitest sie alle auf ein Backend, und eine Analytics-Software zählt die Treffer. Das funktioniert, aber jetzt betreibst du Infrastruktur, bezahlst dafür und musst darauf vertrauen, dass sie so lange online bleibt, wie es diese Sticker gibt.

Es geht einfacher - und die Lösung steckt die ganze Zeit schon im NFC-Chip. Viele Tags können ihre eigenen Scans zählen. Mit der richtigen Einrichtung verrät dir ein Tag, wie oft er gelesen wurde und welcher physische Tag er ist, ganz ohne Backend. So funktioniert das, und so richtest du es ein.

---

## Was ein NFC-Tap-Zähler wirklich ist

Die meisten [NFC-Sticker, die du kaufen kannst](/de/affiliate-links/), nutzen Chips aus der NTAG21x-Familie - `NTAG213`, `NTAG215` und `NTAG216`. Diese Chips haben eine kleine Funktion, die oft ungenutzt bleibt: einen eingebauten Zähler. Jedes Mal, wenn der Tag gelesen wird, zählt er um eins hoch. Er steckt in der Hardware des Chips, nicht in einer App und nicht auf einem Server.

Stell dir das wie einen Kilometerzähler für den Tag vor. Der Kilometerzähler eines Autos zählt Kilometer, egal ob jemand hinschaut; der NFC-Zähler zählt Lesevorgänge genauso. Die Zahl ist immer da. Die einzige Frage ist, ob etwas eingerichtet ist, das sie dir auch zeigt.

Genau das macht die Funktion **NFC-Tap-Zähler** in NFC.cool Tools. Sie richtet den Tag einmal so ein, dass er von da an seinen eigenen Zählerstand meldet. Du musst den Tag nicht selbst scannen, um die Zahl zu prüfen, und die App muss nicht dabei sein, wenn andere ihn antippen. Der Tag zählt und meldet von ganz allein.

Dieselben Chips tragen außerdem eine eindeutige Tag-ID - eine ab Werk eingebrannte Seriennummer, ein bisschen wie eine MAC-Adresse einer Netzwerkkarte. Der Tap Counter kann auch die einblenden, und genau damit kannst du fünfzig identisch aussehende Sticker auseinanderhalten.

---

## Wie es funktioniert, ohne Fachjargon

Wenn du mit aktiviertem Tap Counter Inhalte auf einen Tag schreibst, macht die App etwas Cleveres. Sie bettet eine Reihe von Platzhalterzeichen in das ein, was du schreibst - einen Stellvertreter für den Zählerstand und die ID.

Von da an übernimmt der Chip den Rest. Der Hilfe-Bildschirm in der App bringt es auf den Punkt: Die App bettet Platzhalter-Bytes in deinen Inhalt ein. Bei jedem Scan ersetzt der Chip sie durch die aktuelle Anzahl an Taps (und/oder die Tag-ID), bevor das iPhone sie liest. Kein Server oder Internet nötig.

Der Ablauf bei jedem Antippen sieht also so aus: Jemand hält sein Telefon an den Tag. Der Chip wacht auf, zählt seinen Zähler hoch, ersetzt die Platzhalter durch die echten Zahlen und übergibt erst dann den fertigen Inhalt an das Telefon. Das Telefon, das den Tag gescannt hat, sieht nie einen Platzhalter - es sieht eine vollständige URL, in der der Live-Zählerstand schon enthalten ist.

Die Einrichtung machst du nur einmal. Nach diesem ersten Schreibvorgang ist der Tag auf sich allein gestellt: Er zählt und ersetzt bei jedem Antippen, von jeder Person, auf jedem Telefon, das ganze Stickerleben lang. Nichts in dieser Kette berührt das Internet. Das Zählen passiert im Chip. Das Ersetzen passiert im Chip. Wenn du die fertige URL auf eine Website leitest, die dir gehört, sieht dein eigener Server den Zählerstand ankommen - aber das ist deine Entscheidung, keine Voraussetzung der Funktion.

---

## Was du damit anfangen kannst

Ein selbstzählender Tag klingt nach einer netten Spielerei, bis du ihn mit einem echten Problem zusammenbringst. Hier sind vier, die häufig vorkommen.

**Erkennen, welcher physische Sticker gescannt wurde.** Das ist das Fünfzig-Sticker-Problem vom Anfang dieses Beitrags. Klebe dieselbe URL auf jeden Tag, aktiviere die Tag-ID, und jedes Antippen kommt mit der Seriennummer genau des Tags an, von dem es stammt. Eine URL zu verwalten, fünfzig Tags, die du trotzdem auseinanderhalten kannst.

**Kostenlosen Zugang begrenzen.** Weil der Zählerstand bei jedem Antippen mitreist, kannst du darauf reagieren. Mach eine Aktion, bei der die ersten hundert Scans die Demo-Version bekommen und spätere Scans woandershin umgeleitet werden. Eine limitierte Auflage kann die volle Belohnung ausgeben, bis der Zähler eine von dir gewählte Schwelle überschreitet. Der Tag setzt das Prinzip "wer zuerst kommt, mahlt zuerst" durch, ganz ohne Anmeldesystem dahinter.

**Engagement messen.** Klebe einen Tag auf eine Visitenkarte, ein Poster, eine Produktverpackung oder ein Schaufenster, und der Zähler wird zur stillen Engagement-Kennzahl. Du siehst, ob eine Karte zweimal oder zweihundertmal angetippt wurde, ohne dafür eine Analytics-Pipeline zu bauen.

**Echtheit nachweisen.** Der Zähler geht immer nur nach oben - er lässt sich nicht zurückdrehen. Eine Zahl, die nur steigen kann, ist schwer überzeugend zu fälschen, was sie für limitierte Editionen und Echtheitsprüfungen nützlich macht. Ein echter Tag hat eine plausible, steigende Historie; ein geklonter nicht.

Kombiniere ein paar davon, und du bekommst so etwas: Ein Hersteller legt in jede nummerierte Produktserie einen Tag, alle zeigen auf dieselbe Landingpage. Die Tag-ID verrät, welchen Artikel ein Käufer in der Hand hält, der Zählerstand verrät, wie oft dieser Käufer wiedergekommen ist, und weil der Zähler nur steigt, kann ein Wiederverkäufer eine Kopie nicht stillschweigend als Original ausgeben. Keine Accounts, keine Datenbank, keine monatliche Rechnung - nur der Chip, der seine Arbeit macht.

---

## Schritt für Schritt einrichten

Die Funktion steckt in NFC.cool Tools, auf iPhone und Android. Sie ist Teil des Pro-Abos (Platinum), das brauchst du also, um Tags mit Zähler zu schreiben.

1. Öffne NFC.cool Tools, geh in den Bereich **NFC Tools** und tippe auf **NFC-Tap-Zähler**.
2. Wähle, was der Tag liefern soll: eine **URL**, eine **E-Mail**, eine **SMS** oder einen **Kurzbefehl**. (Den Kurzbefehl gibt es nur auf iOS, da die Kurzbefehle-App von Apple stammt; URL, E-Mail und SMS funktionieren auf beiden Plattformen.)
3. Verfasse den Inhalt wie gewohnt - tippe den Link, schreib die Nachricht, wähle den Kurzbefehl.
4. Aktiviere die gewünschten Schalter: **NFC-Tap-Zähler** fügt den Live-Zählerstand hinzu, **NFC-Tag-ID** die Seriennummer des Tags. Du kannst eines von beiden nutzen oder beides.
5. Wenn du eine ganze Reihe von Tags mit demselben Inhalt programmierst, aktiviere **Mehrfachschreiben**, damit der Scanner offen bleibt und du einen Tag nach dem anderen schreiben kannst.
6. Schau dir die **Vorschau** an. Sie zeigt eine Beispielausgabe mit Platzhalter-Werten, damit du genau siehst, wo Zählerstand und ID landen, bevor du dich festlegst.
7. Tippe auf **Auf NFC-Tag schreiben** und halte einen Tag an die Oberseite deines Telefons.

Das ist die ganze Einrichtung. Ab da ist der Tag eigenständig - er zählt und meldet von allein, für jede Person, die ihn antippt, mit oder ohne App.

Wenn du es irgendwann stoppen willst, kann die App den Zähler auf einem vorhandenen Tag ausschalten. Der Chip ersetzt dann keine Live-Werte mehr, aber der Inhalt bleibt genau so auf dem Tag, wie er zuletzt geschrieben wurde. Gut zu wissen: Der Chip zählt intern weiter, auch nachdem du die Ersetzung ausgeschaltet hast - der Zählerstand geht nie verloren, er wird nur nicht mehr angezeigt.

---

## Wo Zählerstand und Tag-ID erscheinen

Wo die Werte landen, hängt vom gewählten Inhaltstyp ab. Mit beiden Schaltern an werden Tag-ID und Zählerstand zusammen eingefügt - zuerst die ID, dann der Zählerstand, verbunden durch ein kleines `x`. Mit `049F50824F1390` als Tag-ID und `000007` als Zählerstand sieht das Vorher-Nachher für jeden Typ so aus:

- **URL:** `https://example.com/page` wird zu `https://example.com/page?nfc=049F50824F1390x000007`
- **E-Mail-Text:** `Hi, hier ist meine Karte.` wird zu `Hi, hier ist meine Karte. 049F50824F1390x000007`
- **SMS-Text:** `Bestellung bestätigt!` wird zu `Bestellung bestätigt! 049F50824F1390x000007`
- **Kurzbefehl-Eingabe:** `log-entry` wird zu `log-entry 049F50824F1390x000007`

Die Werte werden sauber angehängt, der Rest deines Inhalts funktioniert also ganz normal weiter. Schalte einen der beiden Schalter aus, bekommst du einfach den anderen für sich: nur den Zählerstand (`000007`) oder nur die Tag-ID (`049F50824F1390`).

Und warum `000007` und nicht einfach `7`? Der Zählerstand wird hexadezimal geschrieben - das Zahlensystem zur Basis 16, das von 0 bis 9 und dann von A bis F läuft - und auf sechs Stellen aufgefüllt. `000007` ist also schlicht der siebte Scan des Tags. Ab Scan zehn siehst du Buchstaben: `00000A` ist 10. Die Obergrenze ist `FFFFFF`, also rund 16 Millionen Scans - mehr Spielraum, als fast jeder Tag in der Praxis je brauchen wird. Die Tag-ID ist eine längere Hex-Zeichenkette - die 7-Byte-Werksseriennummer des Chips - und anders als der Zählerstand ändert sie sich nie.

Wenn du die fertige URL auf deine eigene Website leitest, liest dein Server diese Werte direkt aus der Adresse: den Zählerstand protokollieren, mit einer Schwelle vergleichen oder einen Tag am anderen über seine ID erkennen.

---

## Welche Tags du brauchst

Diese Funktion hängt vom Chip ab, der Tag ist also wichtig. NFC.cool unterstützt für den Tap Counter die Chips `NTAG213`, `NTAG215` und `NTAG216`. Das sind die gängigsten NFC-Sticker für Telefone, du findest sie also leicht - prüfe aber lieber den Chiptyp, bevor du in großen Mengen kaufst. Wenn du einen Tag verwenden willst, den die Funktion nicht unterstützt, warnt dich die App, statt etwas zu schreiben, das nicht funktioniert.

Wenn du dich eindecken willst, listet unsere Seite mit [empfohlenen NFC-Tags](/de/affiliate-links/) die `NTAG216`-Sticker auf, die wir selbst nutzen und testen. Und wenn du neu bei der Tag-Auswahl bist, geht unser Ratgeber zu den [verschiedenen NFC-Tag-Typen für iPhones](/de/blog/nfc-tag-types-for-iphones/) die Abwägungen in einfachen Worten durch.

---

## Ein paar schnelle Fragen

**Kann ich den Zähler zurücksetzen?** Nein. Es ist ein einseitiger Zähler, der im Chip eingebaut ist und nur hochzählen kann. Das ist Absicht - ein zurücksetzbarer Zähler wäre für limitierte Editionen oder Echtheitsprüfungen nutzlos. Wenn du einen frischen Zählerstand brauchst, nimm einen neuen Tag.

**Kann jeder den Zählerstand lesen oder nur ich?** Jeder. Jedes Telefon, das den Tag antippt, bekommt den fertigen Inhalt mit der Zahl schon darin, mit oder ohne installierte App. Genau das ist der Sinn - der Tag meldet für sich selbst.

**Kann ich es später ausschalten?** Ja. Die App kann den Chip davon abhalten, Platzhalter zu ersetzen. Die URL oder Nachricht bleibt auf dem Tag; nur die Live-Updates stoppen. Der Chip zählt intern weiter.

**Ist der Zähler privat?** Der Zählerstand liegt auf dem Tag, nicht auf einem Server. Wer den Tag antippt, sieht die Zahl im Inhalt, und wenn dieser Inhalt zu einem von dir kontrollierten Server führt, sieht nur dieser Server sie. Die Tag-ID ist eine Werksseriennummer, keine personenbezogene Information.

**Braucht es Internet?** Nein. Das Zählen und das Ersetzen passieren beide im Chip. Internet kommt nur ins Spiel, wenn die URL, die du geschrieben hast, auf eine Website zeigt.

---

## Probier es aus

NFC-Taps zu zählen bedeutete früher eindeutige Links und ein Backend, das mitzählt. Der NTAG21x-Zähler nimmt diese Voraussetzung leise weg: Der Tag führt seine eigene Zählung, und die Funktion NFC-Tap-Zähler in NFC.cool Tools schaltet sie ein.

Willst du es in Aktion sehen, bevor du einen Tag beschreibst? Unsere [Live-Demo des Tap-Zählers](/de/tap-counter/) ist eine Seite, die genau das tut, was dieser Beitrag beschreibt - beschreibe einen Tag, der auf sie zeigt, tippe ihn an, und die Seite zeigt dir den Zählerstand und die Tag-ID, die der Chip ihr gerade übergeben hat. Kein Server dazwischen, nur die URL.

Sie ist jetzt verfügbar in NFC.cool Tools, auf [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-count-nfc-tag-scans-de&mt=8) und [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-count-nfc-tag-scans-de). Den vollen NFC-Werkzeugkasten zeigt dir die [NFC-Reader-und-Writer-Funktion](/de/features/nfc-reader-writer/).
