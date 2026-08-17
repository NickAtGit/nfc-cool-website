---
id: "count-nfc-tag-scans-2026-05"
title: "NFC-Tag-Scans zählen - ganz ohne Server"
date: "2026-05-15"
tags: ["nfc-tags", "guides"]
summary: "Dieselbe URL auf 50 NFC-Stickern, und du weißt nicht mehr, welcher davon gescannt wurde - es sei denn, der Tag zählt selbst mit. So geht's."
image: "/assets/images/Blog/count-nfc-tag-scans.webp"
imageAlt: "Ein Handy wird an einen NFC-Tag gehalten, daneben ein Zähler, der die Scans hochzählt"
author: "Nicolo Stanciu"
metaTitle: "NFC-Tag-Scans zählen - ganz ohne Server"
metaDescription: "Der Zähler im Chip verrät dir, wie oft ein NFC-Tag gescannt wurde und welcher Tag es war. Kein Backend, kein Internet - eine Anleitung aus der Praxis."
ogTitle: "NFC-Tag-Scans zählen - ganz ohne Server"
ogDescription: "Dein NFC-Tag kann seine Scans selbst zählen. So nutzt du das, um Resonanz zu messen, Auflagen zu begrenzen und Fälschungen zu erkennen."
---

Angenommen, du schreibst dieselbe URL auf fünfzig NFC-Sticker und klebst sie auf fünfzig Produkte, fünfzig Poster oder fünfzig Visitenkarten. Eine Woche später kommt die Frage, die kommen musste: Welcher davon wurde denn nun gescannt? Und wie oft?

Ich entwickle NFC.cool jetzt seit Jahren, und die Antwort, die ich darauf am häufigsten höre, lautet: ein Server. Fünfzig eindeutige Links erzeugen, alle auf ein Backend zeigen lassen, und eine Analytics-Software zählt die Aufrufe. Das funktioniert. Aber ab dann betreibst du Infrastruktur, zahlst dafür und musst darauf hoffen, dass sie so lange online bleibt, wie die Sticker irgendwo kleben. Für eine so einfache Frage fand ich das immer schon ziemlich viel Aufwand.

Dabei geht es einfacher, und die Lösung steckt seit jeher im NFC-Chip selbst: Viele Tags können ihre Scans selbst zählen. Richtig eingerichtet, verrät dir ein Tag, wie oft er gelesen wurde und welcher der fünfzig er ist - ohne dass irgendwo ein Backend läuft. Das ist einer der NFC-Tricks, die ich am liebsten vorführe. Deshalb erkläre ich hier, wie er funktioniert und wie du ihn einrichtest.

---

## Was ein NFC-Tap-Zähler eigentlich ist

Die meisten [NFC-Sticker, die du kaufen kannst](/de/affiliate-links/), verwenden Chips aus der NTAG21x-Familie - `NTAG213`, `NTAG215` und `NTAG216`. Diese Chips haben eine kleine Funktion, von der nach meiner Erfahrung kaum jemand weiß: einen eingebauten Zähler. Bei jedem Lesevorgang zählt er um eins hoch. Er sitzt in der Hardware des Chips, nicht in einer App und nicht auf einem Server. (Falls dich die Unterschiede zwischen diesen Chips genauer interessieren: Die habe ich in [NFC-Tag-Typen fürs iPhone](/de/blog/nfc-tag-types-for-iphones/) auseinandergenommen.)

Ich vergleiche das gern mit dem Kilometerzähler im Auto. Der zählt Kilometer, egal ob jemand aufs Armaturenbrett schaut, und genauso zählt der NFC-Zähler Lesevorgänge. Die Zahl ist immer da. Die Frage ist nur, ob irgendetwas so eingerichtet ist, dass du sie auch zu sehen bekommst.

Genau darum kümmert sich die Funktion **NFC-Tap-Zähler** in NFC.cool Tools, und auf die bin ich ehrlich gesagt am meisten stolz. Sie konfiguriert den Tag ein einziges Mal so, dass er von da an seinen Zählerstand selbst mitliefert. Du musst den Tag nicht selbst scannen, um die Zahl nachzusehen, und wer ihn sonst scannt, braucht die App gar nicht. Der Tag zählt und meldet ganz allein.

Dieselben Chips haben außerdem eine eindeutige Tag-ID: eine Seriennummer, die ab Werk fest eingebrannt ist, ungefähr so wie die MAC-Adresse einer Netzwerkkarte. Auch die kann der Tap-Zähler mit ausgeben, und genau damit hältst du fünfzig äußerlich identische Sticker auseinander.

---

## Wie das funktioniert, ohne Fachchinesisch

Wenn du bei eingeschaltetem Tap-Zähler etwas auf einen Tag schreibst, macht die App etwas, das ich wirklich clever finde: Sie baut in deinen Inhalt eine Folge von Platzhalterzeichen ein, die später für Zählerstand und ID stehen. Dieser Kniff kommt mir immer noch ein bisschen wie Zauberei vor, obwohl ich ihn selbst gebaut habe.

Den Rest erledigt ab dann der Chip. Der Hilfetext in der App bringt es auf den Punkt: Die App bettet Platzhalter-Bytes in deinen Inhalt ein, und bei jedem Scan ersetzt der Chip sie durch den aktuellen Zählerstand (und/oder die Tag-ID), noch bevor das iPhone den Inhalt liest. Kein Server, kein Internet nötig.

Bei jedem Scan läuft also Folgendes ab: Jemand hält sein Handy an den Tag. Der Chip wacht auf, erhöht seinen Zähler, tauscht die Platzhalter gegen die echten Werte aus und gibt erst dann den fertigen Inhalt ans Handy weiter. Das Handy bekommt nie einen Platzhalter zu sehen, sondern eine vollständige URL, in der der aktuelle Zählerstand bereits drinsteht.

Der Punkt, den du dir merken solltest: Eingerichtet wird das nur ein einziges Mal. Nach dem ersten Schreiben ist der Tag auf sich gestellt. Er zählt und ersetzt bei jedem Scan, egal wer scannt und mit welchem Handy, solange es den Sticker gibt. Nichts an dieser Kette geht übers Internet. Gezählt wird im Chip, ersetzt wird im Chip. Wenn du die fertige URL auf eine eigene Website zeigen lässt, sieht dein Server den Zählerstand natürlich hereinkommen - aber das ist deine Entscheidung und keine Voraussetzung dafür, dass die Funktion läuft.

---

## Was du damit anfangen kannst

Ein Tag, der sich selbst zählt, klingt erst mal nach Spielerei, bis man ihn auf ein echtes Problem loslässt. Wenn mich jemand fragt, wofür das gut sein soll, lande ich immer wieder bei denselben vier Anwendungen.

**Herausfinden, welcher Sticker gescannt wurde.** Das ist das Fünfzig-Sticker-Problem vom Anfang. Schreib auf jeden Tag dieselbe URL, schalte die Tag-ID dazu, und jeder Scan kommt mit der Seriennummer genau des Tags an, von dem er stammt. Du pflegst eine einzige URL und kannst trotzdem alle fünfzig Tags auseinanderhalten.

**Gratis-Zugang begrenzen.** Weil der Zählerstand bei jedem Scan mitkommt, kannst du darauf reagieren. Zum Beispiel eine Aktion, bei der die ersten hundert Scans die Demo-Version bekommen und alle späteren woandershin umgeleitet werden. Eine limitierte Auflage kann die volle Belohnung herausgeben, bis der Zähler eine Schwelle überschreitet, die du festgelegt hast. Der Tag setzt „wer zuerst kommt, mahlt zuerst“ durch, ohne dass dahinter irgendein Anmeldesystem stehen muss.

**Resonanz messen.** Kleb einen Tag auf eine Visitenkarte, ein Poster, eine Produktverpackung oder ins Schaufenster, und der Zähler wird nebenbei zu einer stillen Kennzahl dafür, wie viel Interesse da war. Du siehst, ob eine Karte zweimal oder zweihundertmal gescannt wurde, ohne dafür eine Analytics-Pipeline hochzuziehen.

**Echtheit belegen.** Der Zähler kennt nur eine Richtung: nach oben. Zurückdrehen geht nicht. Eine Zahl, die nur steigen kann, lässt sich schwer glaubwürdig fälschen, und deshalb hat sie meiner Meinung nach ihren Platz bei limitierten Auflagen und Echtheitsprüfungen. Ein echter Tag hat eine plausible, wachsende Historie, eine Kopie nicht. Wenn dich diese Seite von NFC interessiert: In [wie NFC verschlüsselte Geheimnisse sicher hält](/de/blog/nfc-safe-encrypted-secrets/) bin ich dem genauer nachgegangen.

Nimm ein paar davon zusammen, und es kommt so etwas heraus: Eine kleine Manufaktur legt jedem Stück einer nummerierten Auflage einen Tag bei, und alle zeigen auf dieselbe Landingpage. Die Tag-ID sagt ihr, welches Stück ein Käufer gerade in der Hand hält, der Zählerstand, wie oft dieser Käufer schon wiedergekommen ist, und weil der Zähler nur steigen kann, kann ein Wiederverkäufer eine Kopie nicht unbemerkt als Original verkaufen. Keine Accounts, keine Datenbank, keine Monatsrechnung, nur ein Chip, der seine Arbeit macht. Für genau solche Ergebnisse habe ich die Funktion gebaut.

---

## Die Einrichtung, Schritt für Schritt

Die Funktion steckt in NFC.cool Tools, auf dem iPhone genauso wie auf Android. Sie gehört zum Pro-Abo (Platinum), das brauchst du also, um Tags mit Zähler zu beschreiben. Falls du noch nie einen Tag beschrieben hast, fang am besten mit meiner Anleitung [NFC-Tags mit dem iPhone beschreiben](/de/blog/write-nfc-tags-iphone/) an, da stehen die Grundlagen drin.

1. Öffne NFC.cool Tools, geh in den Bereich **NFC Tools** und tippe auf **NFC-Tap-Zähler**.
2. Wähle aus, was der Tag auslösen soll: eine **URL**, eine **E-Mail**, eine **SMS** oder einen **Kurzbefehl**. (Kurzbefehle gibt es nur unter iOS, weil die Kurzbefehle-App von Apple ist; URL, E-Mail und SMS funktionieren auf beiden Plattformen.)
3. Verfasse den Inhalt wie sonst auch: Link eintippen, Nachricht schreiben, Kurzbefehl auswählen.
4. Schalte ein, was du brauchst: **NFC-Tap-Zähler** hängt den aktuellen Zählerstand an, **NFC-Tag-ID** die Seriennummer des Tags. Eines von beiden geht, beides zusammen auch.
5. Wenn du gleich einen ganzen Stapel Tags mit demselben Inhalt beschreibst, schalte **Mehrfachschreiben** ein. Dann bleibt der Scanner offen und du kannst einen Tag nach dem anderen dranhalten.
6. Wirf einen Blick auf die **Vorschau**. Sie zeigt eine Beispielausgabe mit Platzhalterwerten, damit du vor dem Schreiben genau siehst, wo Zählerstand und ID landen.
7. Tippe auf **Auf NFC-Tag schreiben** und halte einen Tag an die Oberseite deines Handys.

Mehr ist es nicht, und das ist Absicht. Ab hier kommt der Tag allein zurecht: Er zählt und meldet selbstständig, bei jedem, der ihn scannt, mit oder ohne App.

Falls du das irgendwann wieder loswerden willst: Die App kann den Zähler auf einem bereits beschriebenen Tag abschalten. Der Chip setzt dann keine aktuellen Werte mehr ein, der Inhalt bleibt aber genau so auf dem Tag, wie er zuletzt geschrieben wurde. Ein Detail, das man kennen sollte: Intern zählt der Chip auch danach weiter. Der Zählerstand geht nie verloren, er wird nur nicht mehr angezeigt.

---

## Wo Zählerstand und Tag-ID auftauchen

Wo die Werte landen, hängt davon ab, welchen Inhaltstyp du gewählt hast. Sind beide Schalter an, werden Tag-ID und Zählerstand gemeinsam eingesetzt: erst die ID, dann der Zählerstand, dazwischen ein kleines `x`. Mit `049F50824F1390` als Tag-ID und `000007` als Zählerstand sieht das für jeden Typ vorher und nachher so aus:

- **URL:** `https://example.com/page` wird zu `https://example.com/page?nfc=049F50824F1390x000007`
- **E-Mail-Text:** `Hi, hier ist meine Karte.` wird zu `Hi, hier ist meine Karte. 049F50824F1390x000007`
- **SMS-Text:** `Bestellung bestätigt!` wird zu `Bestellung bestätigt! 049F50824F1390x000007`
- **Kurzbefehl-Eingabe:** `log-entry` wird zu `log-entry 049F50824F1390x000007`

Die Werte werden sauber hinten angehängt, der Rest deines Inhalts funktioniert also unverändert weiter. Schaltest du einen der beiden Schalter aus, bekommst du schlicht den anderen allein: nur den Zählerstand (`000007`) oder nur die Tag-ID (`049F50824F1390`).

An dieser Stelle kommt jedes Mal dieselbe Frage: Warum `000007` und nicht einfach `7`? Der Zählerstand steht in Hexadezimalschreibweise, also im Zahlensystem zur Basis 16, das von 0 bis 9 und dann von A bis F läuft, und wird auf sechs Stellen aufgefüllt. `000007` heißt also schlicht: der siebte Scan dieses Tags. Ab dem zehnten Scan tauchen Buchstaben auf: `00000A` steht für 10. Das Maximum ist `FFFFFF`, rund 16 Millionen Scans, und so viel Luft braucht in der Praxis kaum ein Tag. Die Tag-ID ist eine längere Hex-Zeichenkette, nämlich die 7-Byte-Seriennummer aus dem Werk, und anders als der Zählerstand ändert sie sich nie.

Zeigt die fertige URL auf deine eigene Website, liest dein Server die Werte direkt aus der Adresse: Zählerstand mitschreiben, mit einer Schwelle vergleichen oder die Tags anhand ihrer ID auseinanderhalten.

---

## Welche Tags du brauchst

Die Funktion steht und fällt mit dem Chip, der Tag ist also nicht egal. NFC.cool unterstützt beim Tap-Zähler die Chips `NTAG213`, `NTAG215` und `NTAG216`. Das sind die gängigsten NFC-Sticker für Handys, du bekommst sie also überall - trotzdem würde ich vor einer Großbestellung nachsehen, welcher Chip drinsteckt. Hältst du einen Tag dran, den die Funktion nicht unterstützt, warnt dich die App, statt etwas draufzuschreiben, das hinterher nicht funktioniert. Darauf habe ich geachtet, weil ich weiß, wie ärgerlich es ist, wenn etwas stillschweigend schiefgeht.

Wenn du Nachschub brauchst: Auf unserer Seite mit [empfohlenen NFC-Tags](/de/affiliate-links/) stehen die `NTAG216`-Sticker, die wir selbst verwenden und mit denen wir testen. Und falls du zum ersten Mal Tags aussuchst, erklärt mein Ratgeber zu den [verschiedenen NFC-Tag-Typen fürs iPhone](/de/blog/nfc-tag-types-for-iphones/) in einfachen Worten, worauf es ankommt.

---

## Ein paar kurze Fragen

**Kann ich den Zähler zurücksetzen?** Nein. Der Zähler ist fest im Chip verbaut und kennt nur eine Richtung: hoch. Das ist Absicht, und ehrlich gesagt genau der Witz an der Sache. Ein Zähler, den man zurücksetzen könnte, wäre für limitierte Auflagen und Echtheitsprüfungen wertlos. Wenn du bei null anfangen willst, nimm einen neuen Tag.

**Kann jeder den Zählerstand sehen oder nur ich?** Jeder. Jedes Handy, das den Tag scannt, bekommt den fertigen Inhalt samt Zahl, ob die App installiert ist oder nicht. Das ist ja gerade der Sinn: Der Tag meldet seinen Stand selbst.

**Kann ich das später wieder abschalten?** Ja. Die App kann dem Chip das Ersetzen der Platzhalter abgewöhnen. URL oder Nachricht bleiben auf dem Tag, nur die aktuellen Werte kommen nicht mehr mit. Intern zählt der Chip weiter.

**Wie sieht es mit dem Datenschutz aus?** Der Zählerstand liegt auf dem Tag, nicht auf einem Server. Wer den Tag scannt, sieht die Zahl im Inhalt, und wenn der Inhalt auf einen Server zeigt, den du kontrollierst, bekommt nur dieser Server sie zu sehen. Die Tag-ID ist eine Seriennummer aus dem Werk, kein personenbezogenes Datum.

**Braucht das Internet?** Nein. Gezählt und ersetzt wird komplett im Chip. Internet kommt erst ins Spiel, wenn die URL, die du auf den Tag geschrieben hast, auf eine Website führt.

---

## Probier es aus

In den meisten meiner Jahre mit NFC bedeutete Scans zählen: eindeutige Links und ein Backend, das sie zusammenrechnet. Der Zähler im NTAG21x räumt diese Voraussetzung still und leise ab. Der Tag führt seine eigene Strichliste, und die Funktion NFC-Tap-Zähler in NFC.cool Tools schaltet sie ein. Es ist eine dieser Funktionen, bei denen ich mir immer wieder wünsche, mehr Leute wüssten überhaupt, dass so etwas geht.

Willst du das erst mal live sehen, bevor du einen einzigen Tag beschreibst? Unsere [Live-Demo des Tap-Zählers](/de/tap-counter/) ist eine Seite, die genau das macht, was dieser Beitrag beschreibt: Schreib einen Tag, der auf sie zeigt, halte dein Handy dran, und die Seite zeigt dir den Zählerstand und die Tag-ID, die der Chip ihr eben übergeben hat. Kein Server dazwischen, nur die URL.

Die Funktion gibt es ab sofort in NFC.cool Tools, für [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-count-nfc-tag-scans-de&mt=8) und [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-count-nfc-tag-scans-de). Und wenn du sehen willst, was ich rund um NFC sonst noch gebaut habe, schau dir die [NFC-Reader-und-Writer-Funktion](/de/features/nfc-reader-writer/) an.
