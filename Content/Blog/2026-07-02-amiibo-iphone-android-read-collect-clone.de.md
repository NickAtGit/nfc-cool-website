---
id: "amiibo-iphone-android-read-collect-clone-2026-07"
title: "Amiibo auf iPhone und Android lesen, sammeln und klonen"
date: "2026-07-02"
tags: ["announcements", "iphone", "android"]
summary: "Ich will, dass NFC.cool die beste NFC-App auf iPhone und Android ist, also habe ich ihr volle Amiibo-Unterstützung gegeben: Scann eine Figur, um ihre Details zu sehen, bau eine persönliche Sammlung auf und klon eine auf ein leeres NTAG215. Hier erfährst du, wie Amiibo unter der Haube wirklich funktionieren - und warum die App keine Keys mitliefert."
image: "/assets/images/Blog/amiibo-iphone-android-read-collect-clone.webp"
imageAlt: "Eine fiktive NFC-Sammelfigur neben einem Telefon, das einen privaten Sammlungs-Bildschirm zeigt"
author: "Nicolo Stanciu"
metaTitle: "Amiibo auf iPhone und Android: lesen, sammeln, klonen"
metaDescription: "NFC.cool liest Amiibo auf iPhone und Android, führt eine Sammlung und klont sie auf leere NTAG215-Tags. Wie Amiibo unter der Haube funktionieren und wo die ehrlichen Grenzen liegen."
ogTitle: "Amiibo auf iPhone und Android lesen, sammeln und klonen"
ogDescription: "Ich habe NFC.cool volle Amiibo-Unterstützung gegeben - scannen, sammeln und auf einen leeren Tag klonen. Hier erfährst du, wie Amiibo wirklich funktionieren und warum die App keine Keys mitliefert."
---
Die meisten Leute vermuten, dass in einem Amiibo etwas Exotisches steckt. Irgendein Stück Nintendo-Silizium, das man nirgendwo sonst kaufen kann. Tut es nicht. Im Sockel der Figur steckt ein [NTAG215](/affiliate-links/) - derselbe leere Sticker-Chip, den ich jeden Tag lese und beschreibe, die Sorte, die zehn Stück pro Packung für ein paar Cent kostet. Rund 540 Bytes Speicher, eine im Werk eingebrannte Seriennummer, und das ist die ganze Figur. Der Kunststoff ist der teure Teil. Der Chip ist fast nur Nebensache.

Genau das hat mich so lange gewurmt. Ich lese und beschreibe NFC-Tags beruflich, und es gab eine ganze Kategorie davon - eine Handvoll Figuren im Regal neben meinem Schreibtisch - bei der meine eigene App einfach mit den Schultern zuckte. Ich will, dass NFC.cool die leistungsfähigste NFC-App ist, die du auf dein Telefon packen kannst, die, die keine Art von Tag links liegen lässt.

Also habe ich mich hingesetzt, die Figuren auf der einen Seite, meine Switch auf der anderen, und NFC.cool richtige Amiibo-Unterstützung verpasst. Hier ist, was daraus geworden ist und was ich unterwegs gelernt habe - angefangen damit, warum ein so billiger Chip erstaunlich schwer zu kopieren ist.

---

## Wo steckt also die Magie?

Wenn der Chip so gewöhnlich ist, steckt die Magie offensichtlich nicht im Silizium. Sie steckt in den Bytes. Ein Amiibo ist im Grunde ein billiges Notizbuch, das Nintendo in einem privaten Code beschrieben und dann unten signiert hat, damit man eine Fälschung vom Original unterscheiden kann. (Der Chip selbst ist ein simples [NTAG215](/blog/nfc-tag-types-for-iphones/), falls du die ausführliche Tour durch die Tag-Typen willst.)

Zwei Dinge leben in diesen Bytes. Das erste liegt offen: ein kleiner Block, der sagt, welcher Charakter das ist - Link, aus der Legend-of-Zelda-Reihe, in einer bestimmten Amiibo-Serie. Das ist der Teil, den deine Switch liest, um zu wissen, dass gerade eine Figur sie berührt hat. Der zweite Teil ist gesperrt: die eigentlichen Speicherdaten wie ein Spitzname, der Mii des Besitzers, wie oft die Figur benutzt wurde und was das aktuelle Spiel in den kleinen Notizblock gekritzelt hat, den es nutzen darf. Dieser Teil ist verschlüsselt, und er ist signiert.

## Warum man ein Amiibo nicht einfach kopieren kann

Der verschlüsselte Speicher ist nicht durch einen festen Schlüssel geschützt, den man einmal nachschlagen und für immer wiederverwenden könnte. Jeder Tag bekommt eigene Schlüssel, die vor Ort aus einer Reihe von Master-Keys abgeleitet werden, vermischt mit Daten von genau diesem Tag - inklusive seiner eindeutigen Seriennummer. Obendrein ist das Ganze mit einem HMAC signiert. Ändere ein einziges Byte, ohne neu zu signieren, und die Konsole erkennt die Fälschung und weist die Figur ab.

Und hier ist die Falle. Weil die Seriennummer sowohl in die Schlüsselableitung als auch in die Signatur einfließt, kann man ein echtes Amiibo nicht auslesen und Byte für Byte auf einen leeren Tag kopieren. Der leere Tag hat eine andere Seriennummer, also kommt jeder abgeleitete Schlüssel anders heraus, die Signatur passt nicht mehr, und die Konsole lehnt ihn ab. Der naheliegende Ansatz „einfach alle Seiten kopieren" scheitert jedes Mal.

Um eines richtig zu klonen, muss man die Schlüssel gegen den Ziel-Tag neu ableiten und die Daten neu signieren, damit sie für genau dieses Stück Plastik und Silizium gültig sind - nicht für das, aus dem man sie ausgelesen hat. Die Referenzimplementierung, auf der alle aufbauen, ist ein Tool namens amiitool. Ich habe diesen ganzen Ablauf nativ in der App nachgebaut - vom Tag-Format ins interne Format und zurück, Schlüsselableitung, Verschlüsselung, Signieren - damit NFC.cool es auf dem Telefon in deiner Hand erledigen kann, ohne Computer dazwischen.

## Was NFC.cool jetzt kann

Drei Dinge, in der Reihenfolge, in der du sie wahrscheinlich nutzen wirst.

**Lesen.** Halt ein Amiibo an die Rückseite deines Telefons, genau wie du [jeden NFC-Tag lesen](/features/nfc-reader-writer/) würdest, und NFC.cool erkennt es sofort: den Charakter, die Spielereihe, die Amiibo-Serie, den Figurentyp und das Artwork, dazu ein paar Fakten vom Tag selbst, etwa wie oft er schon beschrieben wurde. Dafür braucht es keine Keys. Das Erkennen einer Figur berührt nur den Teil, der ohnehin offen liegt.

**Sammeln.** Jedes Amiibo, das du scannst, landet in „Meine Sammlung", einem schlichten Raster von allem, was du besitzt. Sie bleibt auf deinem Gerät - auf dem iPhone synchronisiert sie sich über iCloud mit deinen anderen Apple-Geräten - und das Artwork wird zwischengespeichert, damit die Sammlung auch offline richtig aussieht. Allein das hat aus meinem tristen kleinen Regal etwas gemacht, in dem ich tatsächlich stöbern kann.

**Klonen.** Mit deinen eigenen importierten Keys kannst du eine neu verschlüsselte Kopie einer Figur auf ein leeres NTAG215 schreiben. Du kannst direkt von einer gerade gescannten Figur klonen oder von einem gespeicherten `.bin`-Dump auf deinem Gerät. Die App leitet die Schlüssel für den leeren Tag in deiner Hand neu ab und signiert die Daten für genau diesen Tag, sodass die Kopie aus eigener Kraft gültig ist statt einer zum Scheitern verurteilten Byte-für-Byte-Fälschung. Der Schreibvorgang ist endgültig - ist der Tag einmal gesperrt, bleibt er gesperrt - und die App sagt das klar, bevor du es bestätigst.

## Was bewusst weggelassen ist

NFC.cool liefert die Amiibo-Keys nicht mit, und wird es nie tun. Es sind keine Keys in der App versteckt, und es ist keine Bibliothek mit Amiibo-Daten eingebaut.

Lesen und Sammeln funktionieren sofort, weil sie immer nur den offenen Teil des Tags berühren. Klonen ist anders: Es braucht die Master-Keys, und die gehören Nintendo, nicht mir. Hast du sie dir selbst besorgt - die kombinierte `key.bin` oder die zwei getrennten Dateien - importierst du sie einmal in die App, und die Klon-Funktion schaltet sich ein. Hast du sie nicht, bleibt sie aus. Ich habe die Maschine gebaut; den Treibstoff musst du selbst mitbringen.

Ich finde, das ist die ehrliche Linie. Die Fähigkeit ist wirklich nützlich. Eine Figur zu sichern, die dein Kind an einem schlechten Nachmittag verlieren könnte, oder eine Zweitkopie auf eine billige Karte zu packen, statt das Original zu riskieren, sind echte Gründe, warum Leute sich das wünschen. Ich gebe dir lieber einen sauberen, privaten Weg, das auf deinem eigenen Telefon zu tun, als so zu tun, als gäbe es die Nachfrage nicht. Aber ich gebe nichts weiter, das mir nie gehört hat.

## Es funktioniert wirklich

Ich wollte das nicht auf gut Glück ausliefern, also habe ich es auf die einzige Art getestet, die zählt.

Ich habe eine meiner eigenen Figuren gescannt, sie auf ein leeres NTAG215 geklont und die Kopie zu meiner Switch getragen. Ich habe The Legend of Zelda: Tears of the Kingdom gestartet, den Klon an den rechten Joy-Con gehalten, und er hat mir eine Handvoll In-Game-Items ins Inventar gelegt. Genau wie das Original. Keine Beschwerden, kein „Dieses Amiibo kann nicht gelesen werden". Das war der Moment, in dem sich die ganze Sache für mich echt anfühlte. All die Mathematik der Schlüsselableitung und diese Byte-Layouts, und das Ergebnis ist ein billiger leerer Sticker, den eine Nintendo-Konsole bereitwillig als die echte Figur behandelt.

---

Das Regal neben meinem Schreibtisch ist nicht mehr nur Deko. Es ist ein Feature.

Wenn du es ausprobieren willst: Die Amiibo-Tools stecken in NFC.cool auf [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-amiibo-iphone-android-read-collect-clone-de&mt=8) und [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-amiibo-iphone-android-read-collect-clone-de), direkt neben allem anderen, das ich fürs Lesen und Schreiben von Tags gebaut habe. Bring deine eigenen Keys mit, halt eine Figur dran, und sieh, was deine App diese ganze Zeit still ignoriert hat.
