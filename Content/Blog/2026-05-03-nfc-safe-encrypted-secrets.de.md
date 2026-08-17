---
id: "nfc-safe-2026-05"
title: "NFC Safe: Geheimnisse verschlüsselt auf langlebigen NFC-Tags speichern"
date: "2026-05-03"
tags: ["nfc-tags", "privacy"]
summary: "256-Bit-AES auf epoxidbeschichteten NFC-Tags. Papier verbrennt, Cloud-Backups fallen aus. NFC-Tags halten."
metaDescription: "NFC Safe schreibt Seed Phrases, Passwörter und Recovery-Codes mit 256-Bit-AES verschlüsselt auf einen NFC-Tag. Keine Cloud, kein Konto: nur Tag und Passphrase."
image: "/assets/images/Blog/nfc-safe-encrypted-secrets.webp"
imageAlt: "Smartphone, NFC-Karte, Schutzschild und Vorhängeschloss als Sinnbild für verschlüsselte Daten auf einem NFC-Tag"
author: "Nicolo Stanciu"
---

Deine Seed Phrase steht wahrscheinlich auf einem Zettel. Vielleicht liegt der im Tresor. Vielleicht unter einer Diele. Vielleicht auf drei Verstecke verteilt, weil jemand auf Reddit meinte, so machen das die „richtigen“ Crypto-Leute. Es bleibt trotzdem Papier. Papier brennt. Papier wird nass. Papier geht verloren.

Ich baue seit Jahren an NFC.cool, einer App zum Lesen und Schreiben von NFC-Tags, und irgendwann kam mir eine Frage, die mit Bezahlen oder Zutrittskarten nichts zu tun hat: Wie müsste ein Backup aussehen, das nicht verrottet, nicht kaputtgeht und für jeden, der es zufällig findet, schlicht nach nichts aussieht?

Aus dieser Frage ist **NFC Safe** entstanden. Die Funktion nimmt beliebigen Text, also Seed Phrases, Passwörter, Recovery-Codes oder was sonst geheim bleiben soll, verschlüsselt ihn mit 256-Bit-AES und schreibt ihn auf einen NFC-Tag. Der Tag steht dabei ganz für sich. Keine Cloud, kein Server, kein Konto. Wer das Geheimnis lesen will, braucht den Tag in der Hand *und* die Passphrase. Fehlt eines von beiden, ist der Tag nur ein Stückchen Plastik mit Zeichensalat drauf.

Eins war mir beim Entwerfen besonders wichtig: Deine Geheimnisse sollen nicht davon abhängen, dass es meine App noch gibt. Deshalb ist das Verschlüsselungsformat [komplett offengelegt und dokumentiert](https://github.com/NickAtGit/nfc.cool-nfc-safe-format), samt Referenz-Decoder in Python. Sollte NFC.cool irgendwann verschwinden, kommst du mit einem beliebigen NFC-Reader und der Spezifikation trotzdem an deine Daten. Dieses Versprechen kann ich halten, weil ich die Spezifikation von Anfang an so geschrieben habe, dass sie die Software überlebt.

---

## Warum jedes Versteck eine Schwachstelle hat

Frag mich nach der Schwachstelle von irgendeiner Methode, Geheimnisse aufzubewahren, und ich muss nicht lange überlegen: Papier brennt, USB-Stecker korrodieren, Cloud-Dienste werden gehackt, Hardware-Wallets kümmern sich nur um Crypto-Seed-Phrases, und das eigene Gedächtnis lässt einen irgendwann im Stich. Jede Variante hat ihre eigene Art zu versagen.

Also habe ich andersherum angefangen und mich gefragt: Wie müsste das ideale Backup aussehen? Physisch robust, verschlüsselt, in sich geschlossen, mehrfach vorhanden und langlebig. NFC-Tags erfüllen alle fünf Punkte, und ehrlich gesagt hat mich das anfangs selbst überrascht. Sie haben keine Batterie und keine beweglichen Teile, und der NTAG216-Chip ist auf mindestens 10 Jahre Datenerhalt spezifiziert. Epoxidbeschichtete Varianten stecken Wasser, Stöße und jahrzehntelanges Herumliegen in irgendeiner Schublade weg. Falls du die Unterschiede zwischen den Chips noch nicht kennst: Ich habe sie in [NFC-Tag-Typen fürs iPhone](/de/blog/nfc-tag-types-for-iphones/) gegenübergestellt.

---

## So benutzt du NFC Safe

NFC Safe findest du in NFC.cool Tools unter NFC Apps. Ich habe alles auf einen einzigen Screen gepackt, oben ein Umschalter zwischen Verschlüsseln und Entschlüsseln. Wer schon mal einen Tag beschrieben hat, findet sich sofort zurecht.

**Verschlüsseln:**
1. Öffne Tools → NFC Apps → NFC Safe
2. Wähle **Verschlüsseln**
3. Tippe dein Geheimnis ein oder füge es ein
4. Leg eine starke Passphrase fest
5. Tippe auf Verschlüsseln und halte einen NFC-Tag ans Handy

**Entschlüsseln:**
1. Schalte auf demselben Screen auf **Entschlüsseln** um
2. Gib deine Passphrase ein
3. Halte einen zuvor verschlüsselten Tag ans Handy, und dein Geheimnis erscheint

Technisch passiert dahinter Folgendes: AES-256-GCM mit PBKDF2 (HMAC-SHA-256, 100.000 Iterationen, 16 Byte zufälliges Salt). Das Ergebnis landet als eigener NDEF-Record (`urn:nfc:ext:crypto`) auf dem Tag. Wer das lieber selbst nachprüft, statt mir zu glauben: Die komplette [Format-Spezifikation liegt auf GitHub](https://github.com/NickAtGit/nfc.cool-nfc-safe-format). Und wenn du vorher sehen willst, wie ein ganz normaler, unverschlüsselter Schreibvorgang aussieht, den zeige ich Schritt für Schritt in [NFC-Tags mit dem iPhone beschreiben](/de/blog/write-nfc-tags-iphone/).

---

## Ein Geheimnis, mehrere Tags

So würde ich es selbst machen: Ein NTAG216-Tag kostet ungefähr so viel wie ein Kaffee, es gibt also keinen Grund, nur einen zu beschreiben. Kauf dir eine Handvoll, schreib dasselbe Geheimnis verschlüsselt auf jeden und verteil sie: Schreibtischschublade, Büro, bei jemandem aus der Familie, Bankschließfach, irgendein Ort, an dem nur du nachsehen würdest. Für sich genommen ist jeder Tag ohne Passphrase wertlos. Genau das gefällt mir am Design am meisten: Es ist im Grunde eine eingebaute Zwei-Faktor-Absicherung. Ein physischer Tag und eine Passphrase, an zwei verschiedenen Orten, ohne dass du dafür irgendetwas extra einrichten müsstest.

---

## Warum NFC statt USB-Stick oder SD-Karte

Ich werde öfter gefragt, warum ich den Leuten nicht einfach einen USB-Stick oder eine SD-Karte empfehle. Ehrlich gesagt: Ich habe zu viele davon aus banalen, völlig vermeidbaren Gründen sterben sehen. Bei NFC fallen diese Gründe schlicht weg:

- **Kein Stecker** - nichts, was korrodieren oder verbiegen könnte
- **Keine Batterie** - der Tag ist passiv und bekommt seinen Strom vom Lesegerät
- **Kein Dateisystem** - also auch keins, das kaputtgehen kann
- **Kein Treiber** - jedes Smartphone liest NFC von Haus aus
- **Klein und günstig** - münzgroß, in größerer Stückzahl unter einem Dollar pro Stück
- **Robust** - die Epoxid-Varianten stecken Wasser, Stöße und UV-Licht weg

Die einzige echte Grenze ist der Speicherplatz: Nach dem Overhead der Verschlüsselung bleiben rund 500-700 Byte. Viel ist das nicht, aber für den eigentlichen Zweck reicht es dicke: eine Seed Phrase mit 24 Wörtern, ein Master-Passwort oder ein Satz Recovery-Codes.

---

## Was du zur Sicherheit wissen musst

Ein paar Dinge sage ich lieber gleich, bevor du sie auf die harte Tour lernst:

- **Deine Passphrase ist alles.** 256-Bit-AES ist nicht zu knacken. Eine schwache Passphrase schon. Nimm eine zufällig generierte Zeichenfolge mit mindestens 20 Zeichen, und mach hier keine Abstriche.
- **Die NFC-Reichweite ist winzig** (rund 4 cm). Niemand liest deinen Tag quer durch den Raum aus, und genau das ist hier gewollt, kein Mangel.
- **Kein Löschen aus der Ferne.** Tag verloren? Dann zerstör ihn physisch. Eine Schere reicht, und ohne Passphrase kann mit den Daten ohnehin niemand etwas anfangen.
- **Keine Passphrase-Wiederherstellung.** Vergisst du sie, sind die Daten weg. Das habe ich bewusst so entschieden, denn jeder Weg zur Wiederherstellung ist auch ein Weg für Angreifer. Schreib dir die Passphrase auf, aber bewahr sie getrennt von den Tags auf.

---

## Warum NFC-Tags dafür genau richtig sind

Weil ich jeden Tag mit NFC zu tun habe, sehe ich, wie diese Tags ganz unauffällig zum Speicher für Dinge werden, auf die es ankommt. Der digitale Produktpass der EU führt NFC als einen der zugelassenen Datenträger auf, direkt neben QR-Codes. Philips baut die Chips in Zahnbürstenköpfe. Hotels stecken sie in Zimmerkarten. Billig, robust und mit dem Gerät lesbar, das sowieso jeder in der Hosentasche hat: Diese Kombination ist selten, und genau deshalb fallen mir immer wieder neue Einsatzzwecke ein. Wer den breiteren Überblick möchte: Die Grundlagen habe ich in [NFC-Tags erklärt: der komplette Einsteiger-Guide](/de/blog/nfc-tags-beginners-guide/) zusammengefasst.

NFC Safe ist mein Versuch, diese Robustheit um das eine zu ergänzen, was bisher fehlte: Verschlüsselung. Ein Backup, das Papier überlebt, das niemand lesen kann, der es zufällig findet, und das weniger kostet als eine Tasse Kaffee. So etwas wollte ich für mich selbst haben, also habe ich es gebaut.

NFC Safe gibt es ab sofort in [NFC.cool Tools für iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-safe-encrypted-secrets-de&mt=8) und [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-safe-encrypted-secrets-de).
