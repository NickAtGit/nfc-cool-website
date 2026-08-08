---
id: "read-passport-nfc-chip-2026-07"
title: "Den NFC-Chip deines Reisepasses mit dem Handy auslesen"
date: "2026-07-20"
tags: ["announcements", "nfc-tags", "privacy"]
summary: "In deinem Reisepass steckt ein NFC-Chip, und dein Handy kann ihn jetzt auslesen. NFC.cool Tools liest den Chip in Reisepass, Personalausweis oder Aufenthaltstitel auf iPhone und Android - zeigt das gespeicherte Foto samt Daten und prüft, ob das Dokument echt ist."
image: "/assets/images/Blog/read-passport-nfc-chip.webp"
imageAlt: "Ein marineblaues Passheft mit goldenem NFC-Symbol neben einem iPhone, das ein verifiziertes Häkchen zeigt"
author: "Nicolo Stanciu"
metaTitle: "Den NFC-Chip deines Reisepasses mit dem Handy auslesen"
metaDescription: "Dein Reisepass hat einen NFC-Chip, und NFC.cool liest ihn auf iPhone und Android. Sieh dir das auf dem Chip gespeicherte Foto samt Daten an und prüfe, ob das Dokument echt ist."
ogTitle: "Dein Reisepass hat einen NFC-Chip. Jetzt kann dein Handy ihn lesen."
ogDescription: "NFC.cool liest jetzt den Chip in Reisepass, Personalausweis oder Aufenthaltstitel - das Foto, die Daten und ob er echt ist. Auf iPhone und Android."
---
Als ich das letzte Mal geflogen bin, stand ich eine Minute an einem dieser automatischen Passkontroll-Gates - dieser Glaskabine, in die du deinen Reisepass auf den Leser legst, in die Kamera schaust und wartest, bis die Türen entscheiden, dass sie dich mögen. Es dauert einen Moment. Und in diesem Moment habe ich angefangen, darüber nachzudenken, was die Maschine da eigentlich tut. Sie hat nicht die bedruckte Seite gelesen. Sie hat mit dem kleinen Chip gesprochen, der im Einband meines Reisepasses steckt.

Ich lese seit Jahren beruflich NFC-Chips aus. Ich wusste, dass dieser Chip da drin steckt. Ich hatte nur nie meine eigene App darauf angesetzt. Wie ich so in diesem Gate stand, hat es mich wirklich gewurmt, dass ein Grenzterminal meinen Reisepass lesen kann und NFC.cool nicht.

Genau dafür gibt es NFC.cool. Mein Ziel war von Anfang an einfach und ein bisschen stur: der beste NFC-Reader sein, den du auf ein Handy bekommst, und alles unterstützen, was NFC tatsächlich kann - ohne daraus ein Werkzeug zu machen, für das man ein Ingenieurstudium braucht. Ein Reisepass-Chip ist ungefähr so sehr "alles, was NFC kann" wie es nur geht. Also habe ich es eingebaut.

NFC.cool Tools liest jetzt den Chip in einem biometrischen Reisepass, einem Personalausweis oder einem Aufenthaltstitel - auf iPhone und Android. Es zeigt dir das Foto und die persönlichen Daten, die auf dem Chip gespeichert sind, und es sagt dir, ob das Dokument echt aussieht. So funktioniert es - und wo, ganz ehrlich, seine Grenzen liegen.

---

## Der Chip redet erst, wenn du beweist, dass du das Dokument in der Hand hältst

Das ist der Teil, der die Leute überrascht: Du kannst dein Handy nicht einfach über einen Reisepass halten und ihn auslesen. Der Chip ist bewusst gesperrt. Er sagt kein einziges Wort, bis du ihm einen Schlüssel gibst, und dieser Schlüssel ist direkt auf deinem eigenen Dokument aufgedruckt.

Ich finde das ein wunderbares Stück Design. Es bedeutet, dass niemand deinen Reisepass heimlich auslesen kann, während er in deiner Tasche steckt. Der einzige Weg hinein führt darüber, das Dokument schon aufgeschlagen in der Hand zu haben, denn der Schlüssel wird aus dem gebaut, was darauf gedruckt ist: die Dokumentennummer, dein Geburtsdatum und das Ablaufdatum.

Also fragt die App zuerst genau nach diesen drei Dingen, auf eine von zwei Arten. Du kannst deine Kamera auf die maschinenlesbare Zone richten - dieses Band aus klobigen `<<<`-Zeichen am unteren Rand der Fotoseite deines Reisepasses oder auf der Rückseite eines Personalausweises - und NFC.cool liest sie optisch ein, genauso wie das Gate am Flughafen. Oder, falls das Dokument abgenutzt ist oder das Licht schlecht, tippst du die drei Werte von Hand ein. So oder so: Sobald die App den Schlüssel hat, bittet sie dich, die Oberseite deines Handys an das Dokument zu halten, und der eigentliche Chip-Auslesevorgang beginnt. Falls du dich je gefragt hast, [wie NFC auf einem iPhone eigentlich funktioniert](/blog/nfc-on-iphones-insider-look/): Das ist derselbe Handshake auf kurze Distanz, nur mit einem deutlich zickigeren Chip auf der anderen Seite.

## Was der Chip preisgibt

Ein paar Sekunden später schaust du auf das, was der Chip die ganze Zeit mit sich getragen hat: das Foto von dir, das die ausstellende Behörde gespeichert hat, deinen Namen, deine Staatsangehörigkeit, die Dokumentennummer, dein Geburts- und Ablaufdatum, und auf manchen Dokumenten noch ein bisschen mehr - Geburtsort, ausstellende Behörde, Ausstellungsdatum. Es sind dieselben Daten, die die Kabine des Beamten abruft, nur liegen sie jetzt in deiner Hand.

Jedes Dokument, das du liest, wird in einer kleinen Ablage in der App gespeichert, "Meine Dokumente" genannt, damit du es dir später wieder ansehen kannst. Diese Ablage liegt auf deinem Gerät und synchronisiert sich auf dem iPhone über deine eigene iCloud. Sie kommt nicht zu mir und auch nicht auf irgendeinen Server von mir. Bei etwas so Persönlichem ist das kein Detail, das ich verstecken würde.

## Ist das Dokument echt?

Der Teil, auf den ich am meisten stolz bin, ist die Echtheitsprüfung. Ein moderner Reisepass-Chip ist nicht bloß eine Speicherkarte. Das ausstellende Land signiert seinen Inhalt, ein bisschen wie ein Wachssiegel, das in die Daten gedrückt wird. NFC.cool prüft dieses Siegel: dass sich seit der Ausstellung nichts auf dem Chip verändert hat, dass die Signatur mathematisch gültig ist und dass sie auf eine echte ausstellende Behörde zurückführt, die die App kennt. Bessere Chips können außerdem beweisen, dass sie das Original-Silizium sind und keine Kopie, und auch das prüft die App, wenn der Chip es unterstützt.

Ein Versprechen habe ich mir bei der Wortwahl aber selbst gegeben. Die App wird deinen Reisepass niemals als "gefälscht" bezeichnen. Wenn jede Prüfung besteht, sagt sie, das Dokument wirkt echt. Wenn etwas nicht zusammenpasst - oder, viel häufiger, wenn sie den Aussteller schlicht nicht bestätigen kann, weil dieses Land nicht in der Liste steht, die die App mitbringt - sagt sie, sie konnte es nicht verifizieren, und dabei bleibt es. "Ich konnte das nicht prüfen" und "das ist eine Fälschung" sind sehr unterschiedliche Sätze, und bei etwas so Ernstem wie deinem Ausweis bin ich nicht bereit, sie zu verwischen.

## Was die App nicht kann

Ein paar klare Antworten, denn das ist die Art von Funktion, bei der Schönreden ein schlechter Dienst wäre.

Es funktioniert bei vielen Dokumenten, aber ich kann nicht versprechen, dass es bei jedem einzelnen klappt. Ich habe es mit einem ganzen Stapel Reisepässe und Karten aus verschiedenen Ländern getestet, und die meisten lassen sich sauber lesen - aber die Dokumente dieser Welt sind nicht perfekt einheitlich, und deins könnte der Ausreißer sein. Wenn eines sich verweigert, liegt es meist am Dokument, nicht an dir.

Es liest, was es lesen darf, und nicht mehr. Manche Chips speichern auch Fingerabdrücke oder Iris-Daten, und die liegen hinter Schlüsseln, die nur staatliche Kontrollsysteme haben - nichts, was eine Consumer-App bekommt, und nichts, was ich ihr geben wollen würde. NFC.cool rührt sie nie an. Es liest das Gesichtsfoto und die aufgedruckten Angaben, also genau den Teil, der für die Person lesbar sein soll, die das Dokument in der Hand hält.

Und es braucht ein Handy mit NFC, das während des Lesens ruhig am Dokument gehalten wird. Der Chip ist klein und die Verbindung heikel, ein verrutschtes Handy bedeutet also, den Lesevorgang neu zu starten. Halte das Dokument flach an die Oberseite des Handys, bis er fertig ist.

---

Ich denke immer noch an dieses Flughafen-Gate. Das ganze Sicherheitstheater des modernen Reisens, und im Zentrum davon steckt ein winziger NFC-Chip, der einen sorgfältigen kleinen Handshake macht - dieselbe Art von Handshake, mit der ich seit Jahren [Tags lese und beschreibe](/features/nfc-reader-writer/). Jetzt kann der Reader in deiner Tasche das auch.

Wenn du sehen willst, was dein eigener Reisepass die ganze Zeit still mit sich getragen hat: Der Reisepass- und Ausweisleser steckt in NFC.cool Tools auf [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-read-passport-nfc-chip-de&mt=8) und [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-read-passport-nfc-chip-de), direkt neben allem anderen, was ich für NFC gebaut habe. Schlag deinen Reisepass auf, halt ihn an dein Handy und lerne die Version von dir kennen, die auf dem Chip gelebt hat.
