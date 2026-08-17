---
id: "read-passport-nfc-chip-2026-07"
title: "Den NFC-Chip deines Reisepasses mit dem Handy auslesen"
date: "2026-07-20"
tags: ["announcements", "nfc-tags", "privacy"]
summary: "In deinem Reisepass steckt ein NFC-Chip, und dein Handy kann ihn jetzt auslesen. NFC.cool Tools liest den Chip in Reisepass, Personalausweis oder Aufenthaltstitel auf iPhone und Android, zeigt das gespeicherte Foto samt Daten und prüft, ob das Dokument echt ist."
image: "/assets/images/Blog/read-passport-nfc-chip.webp"
imageAlt: "Ein marineblaues Passheft mit goldenem NFC-Symbol neben einem iPhone, auf dem ein Häkchen die bestandene Prüfung anzeigt"
author: "Nicolo Stanciu"
metaTitle: "Den NFC-Chip deines Reisepasses mit dem Handy auslesen"
metaDescription: "Dein Reisepass hat einen NFC-Chip, und NFC.cool liest ihn auf iPhone und Android. Zeigt Foto und Daten vom Chip an und prüft, ob das Dokument echt ist."
ogTitle: "Dein Reisepass hat einen NFC-Chip. Jetzt kann dein Handy ihn auslesen."
ogDescription: "NFC.cool liest jetzt den Chip in Reisepass, Personalausweis oder Aufenthaltstitel: das Foto, die Daten und ob das Dokument echt ist. Auf iPhone und Android."
---
Als ich das letzte Mal geflogen bin, stand ich eine Minute lang in einer dieser automatischen Passkontrollen: die Glasschleuse, in der du den Reisepass auf den Leser legst, in die Kamera schaust und wartest, bis die Türen beschließen, dass sie dich mögen. Das dauert einen Moment. Und in diesem Moment habe ich mich gefragt, was die Maschine da eigentlich macht. Sie liest nicht nur die bedruckte Seite. Sie spricht auch mit dem kleinen Chip, der im Einband meines Reisepasses steckt.

NFC-Chips auslesen ist seit Jahren mein Beruf. Dass in dem Pass ein Chip steckt, wusste ich natürlich. Nur hatte ich meine eigene App noch nie drangehalten. Und wie ich da so in der Schleuse stand, hat es mich ehrlich gewurmt: Ein Automat an der Grenze kann meinen Reisepass lesen, und NFC.cool kann es nicht.

Genau für solche Momente gibt es NFC.cool. Mein Anspruch war von Anfang an simpel und ein bisschen stur: der beste NFC-Reader sein, den man auf ein Handy bekommt, und alles unterstützen, was NFC wirklich kann, ohne dass am Ende ein Werkzeug herauskommt, für das man ein Ingenieurstudium braucht. Und wenn irgendetwas unter „alles, was NFC kann“ fällt, dann ein Reisepass-Chip. Also habe ich es eingebaut.

NFC.cool Tools liest jetzt den Chip in biometrischen Reisepässen, Personalausweisen und Aufenthaltstiteln, auf dem iPhone genauso wie auf Android. Die App zeigt dir das Foto und die persönlichen Daten, die auf dem Chip liegen, und sagt dir, ob das Dokument echt aussieht. Hier erkläre ich, wie das funktioniert, und sage auch ehrlich, wo die Grenzen sind.

---

## Der Chip redet erst, wenn du beweisen kannst, dass du das Dokument in der Hand hast

Das überrascht die meisten: Du kannst nicht einfach das Handy an einen Reisepass halten und ihn auslesen. Der Chip ist absichtlich gesperrt. Er gibt kein Wort von sich, bevor du ihm einen Schlüssel nennst, und der steht direkt auf deinem eigenen Dokument.

Ich finde das richtig gut gelöst. Es heißt nämlich, dass niemand deinen Reisepass heimlich auslesen kann, solange er in der Tasche steckt. Rein kommt nur, wer das Dokument aufgeschlagen vor sich hat, denn der Schlüssel setzt sich aus dem zusammen, was draufgedruckt ist: Dokumentennummer, Geburtsdatum und Ablaufdatum.

Deshalb fragt die App als Erstes genau nach diesen drei Angaben, und dafür gibt es zwei Wege. Entweder richtest du die Kamera auf die maschinenlesbare Zone, also die Zeilen mit den klobigen `<<<`-Zeichen unten auf der Fotoseite des Reisepasses beziehungsweise auf der Rückseite des Personalausweises, und NFC.cool liest sie optisch ein, wie es die Passkontrolle am Flughafen auch macht. Oder du tippst die drei Werte von Hand ein, wenn das Dokument abgegriffen ist oder das Licht nicht reicht. Sobald die App den Schlüssel hat, bittet sie dich, die Oberkante des Handys an das Dokument zu halten, und dann beginnt das eigentliche Auslesen des Chips. Falls du dich schon mal gefragt hast, [wie NFC auf dem iPhone eigentlich funktioniert](/blog/nfc-on-iphones-insider-look/): Es ist derselbe Handshake auf ein paar Zentimeter Abstand, nur sitzt auf der anderen Seite ein deutlich zickigerer Chip.

---

## Was der Chip preisgibt

Ein paar Sekunden später siehst du, was der Chip die ganze Zeit mit sich herumgetragen hat: das Foto, das die ausstellende Behörde von dir hinterlegt hat, deinen Namen, deine Staatsangehörigkeit, die Dokumentennummer, Geburts- und Ablaufdatum, und bei manchen Dokumenten noch etwas mehr, etwa Geburtsort, ausstellende Behörde und Ausstellungsdatum. Es sind genau die Daten, die auch der Beamte an der Passkontrolle auf seinem Bildschirm sieht, nur hast du sie jetzt selbst in der Hand.

Jedes ausgelesene Dokument landet in der App unter „Meine Dokumente“, damit du es dir später noch einmal ansehen kannst. Diese Ablage bleibt auf deinem Gerät, und auf dem iPhone wird sie über deine eigene iCloud synchronisiert. Zu mir kommt davon nichts, und auf einem Server von mir landet es auch nicht. Bei etwas so Persönlichem gehört das nicht ins Kleingedruckte.

---

## Ist das Dokument echt?

Worauf ich am meisten stolz bin, ist die Echtheitsprüfung. Ein moderner Reisepass-Chip ist nicht einfach ein Speicherbaustein. Das ausstellende Land signiert seinen Inhalt, ein bisschen so, als würde ein Wachssiegel in die Daten gedrückt. NFC.cool prüft dieses Siegel: ob seit der Ausstellung nichts auf dem Chip verändert wurde, ob die Signatur mathematisch gültig ist und ob sie zu einer echten ausstellenden Behörde zurückführt, die die App kennt. Bessere Chips können darüber hinaus nachweisen, dass sie das Original sind und keine Kopie, und wenn der Chip das unterstützt, prüft die App auch das.

Bei der Wortwahl habe ich mir allerdings eine Regel auferlegt: Die App wird deinen Reisepass nie als „gefälscht“ bezeichnen. Gehen alle Prüfungen durch, sagt sie, das Dokument wirkt echt. Passt etwas nicht zusammen, oder kann sie, was viel häufiger vorkommt, den Aussteller schlicht nicht bestätigen, weil das Land nicht in der Liste steht, die die App mitbringt, dann sagt sie, dass sie es nicht verifizieren konnte. Mehr nicht. „Das konnte ich nicht prüfen“ und „das ist eine Fälschung“ sind zwei sehr verschiedene Aussagen, und bei etwas so Ernstem wie deinem Ausweis werde ich sie nicht vermischen.

---

## Was die App nicht kann

Ein paar klare Ansagen, denn bei so einer Funktion wäre Schönreden ein Bärendienst.

Es funktioniert mit vielen Dokumenten, aber ich kann nicht versprechen, dass es mit jedem klappt. Ich habe einen ganzen Stapel Reisepässe und Ausweiskarten aus verschiedenen Ländern durchprobiert, und die meisten lassen sich sauber auslesen. Aber die Dokumente dieser Welt sind eben nicht alle gleich gebaut, und deins könnte der Ausreißer sein. Wenn sich eines sperrt, liegt es meistens am Dokument und nicht an dir.

Die App liest, was sie lesen darf, und keinen Schritt weiter. Manche Chips speichern auch Fingerabdrücke oder Iris-Daten, und die stecken hinter Schlüsseln, die nur staatliche Kontrollsysteme besitzen. So etwas bekommt keine App für Endkunden, und ich wollte es auch gar nicht haben. NFC.cool fasst diese Daten nie an. Die App liest das Gesichtsfoto und die Angaben, die auch aufgedruckt sind, also genau den Teil, den die Person mit dem Dokument in der Hand lesen darf und soll.

Und du brauchst ein Handy mit NFC, das du während des Auslesens ruhig am Dokument hältst. Der Chip ist klein und die Verbindung empfindlich; rutscht das Handy weg, fängt der Lesevorgang von vorn an. Halte das Dokument also flach an die Oberkante des Handys, bis die App fertig ist.

Die Passkontrolle am Flughafen geht mir immer noch nach. Das ganze Sicherheitstheater des modernen Reisens, und mittendrin ein winziger NFC-Chip, der gewissenhaft seinen kleinen Handshake abwickelt. Es ist dieselbe Art Handshake, mit der ich seit Jahren [Tags lese und beschreibe](/features/nfc-reader-writer/). Jetzt beherrscht der Reader in deiner Hosentasche sie auch.

Wenn du wissen willst, was dein eigener Reisepass die ganze Zeit stillschweigend mit sich herumträgt: Der Reisepass- und Ausweisleser steckt in NFC.cool Tools auf [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-read-passport-nfc-chip-de&mt=8) und [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-read-passport-nfc-chip-de), direkt neben allem anderen, was ich für NFC gebaut habe. Schlag den Pass auf, halt ihn ans Handy und lern die Version von dir kennen, die auf dem Chip wohnt.
