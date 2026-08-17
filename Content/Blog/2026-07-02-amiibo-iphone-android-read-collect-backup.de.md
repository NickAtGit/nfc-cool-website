---
id: "amiibo-iphone-android-read-collect-backup-2026-07"
title: "Amiibo auf iPhone und Android lesen, sammeln und sichern"
date: "2026-07-02"
tags: ["announcements", "iphone", "android"]
summary: "NFC.cool soll die beste NFC-App auf iPhone und Android sein, also habe ich ihr vollständige Amiibo-Unterstützung eingebaut: Figur scannen und alle Details sehen, eine eigene Sammlung anlegen und ein Backup auf ein leeres NTAG215 schreiben. Hier erkläre ich, wie Amiibo technisch wirklich funktionieren - und warum die App keine Keys mitbringt."
image: "/assets/images/Blog/amiibo-iphone-android-read-collect-backup.webp"
imageAlt: "Eine ausgedachte NFC-Sammelfigur neben einem Smartphone, auf dem eine private Sammlung zu sehen ist"
author: "Nicolo Stanciu"
metaTitle: "Amiibo auf iPhone und Android: lesen, sammeln, sichern"
metaDescription: "NFC.cool liest Amiibo auf iPhone und Android, führt deine Sammlung und sichert sie auf leere NTAG215-Tags. Wie Amiibo funktionieren und was die App bewusst nicht kann."
ogTitle: "Amiibo auf iPhone und Android lesen, sammeln und sichern"
ogDescription: "NFC.cool kann jetzt Amiibo: scannen, sammeln und auf einen leeren Tag sichern. Wie Amiibo wirklich funktionieren und warum die App keine Keys mitbringt."
---
Die meisten Leute gehen davon aus, dass in einem Amiibo irgendetwas Besonderes steckt. Ein Stück Nintendo-Silizium, das man nirgendwo sonst kaufen kann. Stimmt aber nicht. Im Sockel der Figur sitzt ein ganz normaler [NTAG215](/affiliate-links/) - derselbe Sticker-Chip, den ich jeden Tag lese und beschreibe, die Sorte, die es im Zehnerpack für Kleingeld gibt. Rund 540 Bytes Speicher, eine ab Werk eingebrannte Seriennummer, mehr ist da nicht. Teuer ist das Plastik. Der Chip ist fast schon Nebensache.

Genau deshalb hat mich das so lange gewurmt. NFC-Tags lesen und beschreiben ist mein Beruf, und trotzdem gab es eine ganze Kategorie, mit der meine eigene App nichts anfangen konnte: die Handvoll Figuren im Regal neben meinem Schreibtisch. Dabei soll NFC.cool die leistungsfähigste NFC-App sein, die du auf dein Handy laden kannst, eine, die keinen Tag-Typ links liegen lässt.

Also habe ich mich hingesetzt, links die Figuren, rechts meine Switch, und NFC.cool eine richtige Amiibo-Unterstützung eingebaut. Was dabei herausgekommen ist und was ich unterwegs gelernt habe, steht hier - und ich fange damit an, warum ein so billiger Chip erstaunlich schwer zu kopieren ist.

---

## Wo steckt dann das Geheimnis?

Wenn der Chip so gewöhnlich ist, kann das Geheimnis nicht im Silizium liegen. Es liegt in den Bytes. Ein Amiibo ist im Grunde ein billiges Notizbuch, das Nintendo in einer Geheimschrift vollgeschrieben und unten unterschrieben hat, damit sich eine Fälschung vom Original unterscheiden lässt. (Falls du die ausführliche Übersicht über die Tag-Typen nachlesen willst: Der Chip selbst ist ein schlichter [NTAG215](/blog/nfc-tag-types-for-iphones/).)

In diesen Bytes stecken zwei Dinge. Das erste liegt offen da: ein kleiner Block, der sagt, welche Figur das ist - Link, aus der Legend-of-Zelda-Reihe, aus einer bestimmten Amiibo-Serie. Diesen Teil liest deine Switch, um zu merken, dass gerade eine Figur aufgelegt wurde. Der zweite Teil ist verschlossen: die eigentlichen Spielstanddaten, also ein Spitzname, der Mii des Besitzers, wie oft die Figur schon benutzt wurde, und was das aktuelle Spiel in den kleinen Notizbereich geschrieben hat, der ihm zusteht. Dieser Teil ist verschlüsselt und obendrein signiert.

---

## Warum man ein Amiibo nicht einfach kopieren kann

Der verschlüsselte Spielstand hängt nicht an einem einzigen festen Schlüssel, den man einmal nachschlägt und dann für immer benutzt. Jeder Tag bekommt seine eigenen Schlüssel. Die werden jeweils frisch aus einem Satz Master-Keys abgeleitet, verrechnet mit Daten von genau diesem Tag, unter anderem seiner eindeutigen Seriennummer. Und obendrauf ist das Ganze mit einem HMAC signiert. Änderst du auch nur ein Byte, ohne neu zu signieren, merkt die Konsole das und weist die Figur ab.

Genau da liegt der Haken. Weil die Seriennummer sowohl in die Schlüsselableitung als auch in die Signatur einfließt, kannst du ein echtes Amiibo nicht einfach auslesen und Byte für Byte auf einen leeren Tag übertragen. Der leere Tag hat eine andere Seriennummer, also kommen alle abgeleiteten Schlüssel anders heraus, die Signatur passt nicht mehr, und die Konsole lehnt den Tag ab. Der naheliegende Weg „einfach alle Seiten rüberkopieren“ geht jedes Mal schief.

Für eine gültige Kopie musst du die Schlüssel für den Ziel-Tag neu ableiten und die Daten neu signieren, sodass sie zu genau diesem Stück Plastik und Silizium passen und nicht mehr zu dem, von dem du sie gelesen hast. Die Referenzimplementierung, auf der alle aufsetzen, ist ein Tool namens amiitool. Diesen kompletten Ablauf habe ich nativ in der App nachgebaut: Tag-Format ins interne Format und zurück, Schlüsselableitung, Verschlüsselung, Signatur. NFC.cool erledigt das direkt auf dem Handy, ohne dass ein Computer im Spiel ist.

---

## Was NFC.cool jetzt kann

Drei Dinge, in der Reihenfolge, in der du sie vermutlich brauchst.

**Lesen.** Halt ein Amiibo an die Rückseite deines Handys, so wie du [jeden anderen NFC-Tag liest](/features/nfc-reader-writer/), und NFC.cool erkennt es sofort: Charakter, Spielereihe, Amiibo-Serie, Figurentyp und Artwork, dazu ein paar Angaben vom Tag selbst, etwa wie oft er schon beschrieben wurde. Keys braucht es dafür keine. Zum Erkennen einer Figur reicht der Teil, der ohnehin offen daliegt.

**Sammeln.** Jedes gescannte Amiibo landet in „Meine Sammlung“, einem schlichten Raster mit allem, was du besitzt. Die Sammlung bleibt auf deinem Gerät (auf dem iPhone wird sie per iCloud mit deinen anderen Apple-Geräten synchronisiert), und die Artworks werden lokal zwischengespeichert, damit auch offline alles richtig aussieht. Allein das hat aus meinem tristen kleinen Regal etwas gemacht, in dem ich gern herumstöbere.

**Sichern und wiederherstellen.** Hast du deine eigenen Keys importiert, kannst du eine Figur als frisch verschlüsselte Kopie auf ein leeres NTAG215 schreiben. Das geht direkt nach dem Scan einer Figur oder aus einem `.bin`-Dump, den du auf dem Gerät gespeichert hast. Die App leitet die Schlüssel für den leeren Tag in deiner Hand neu ab und signiert die Daten passend für genau diesen Tag. So ist die Kopie aus sich heraus gültig, statt eine Byte-für-Byte-Fälschung zu sein, die ohnehin scheitern würde. Der Schreibvorgang ist endgültig: Ist der Tag einmal gesperrt, bleibt er gesperrt. Die App sagt dir das deutlich, bevor du bestätigst.

---

## Was bewusst fehlt

Die Amiibo-Keys liefert NFC.cool nicht mit, und das wird sich auch nicht ändern. In der App sind keine Keys versteckt, und eine Bibliothek mit Amiibo-Daten ist auch nicht eingebaut.

Lesen und Sammeln funktionieren ohne Vorbereitung, weil dabei nur der offene Teil des Tags angefasst wird. Beim Sichern ist das anders: Dafür braucht es die Master-Keys, und die gehören Nintendo, nicht mir. Hast du sie dir selbst besorgt, als kombinierte `key.bin` oder als zwei einzelne Dateien, importierst du sie einmal in die App, und die Backup-Funktion wird freigeschaltet. Hast du sie nicht, bleibt sie einfach aus. Ich habe den Motor gebaut, den Sprit musst du selbst mitbringen.

Ich finde, das ist die ehrliche Lösung. Die Funktion ist wirklich nützlich: Eine Figur sichern, bevor dein Kind sie an einem schlechten Nachmittag verliert, oder eine Zweitkopie auf eine billige Karte schreiben, statt das Original zu riskieren, das sind echte Gründe, warum sich Leute so etwas wünschen. Ich gebe dir lieber eine saubere, private Möglichkeit, das auf deinem eigenen Handy zu machen, als so zu tun, als gäbe es den Wunsch nicht. Aber ich verteile nichts, was mir nie gehört hat.

---

## Der Ordnung halber

Zwei Punkte, die ich unmissverständlich sagen will.

Erstens: Das ist meine App, nicht die von Nintendo. NFC.cool wird nicht von Nintendo hergestellt, steht in keiner Verbindung zu Nintendo und wird von Nintendo weder unterstützt noch gesponsert. Amiibo, Nintendo Switch und die genannten Spieltitel sind Marken ihrer jeweiligen Inhaber; ich nenne sie nur, damit du weißt, womit die Funktion kompatibel ist.

Zweitens: Backup und Wiederherstellen sind für Lernzwecke und den privaten Gebrauch gedacht, also um Figuren zu schützen, die dir schon gehören. Mach eine Zweitkopie von der Figur, die dein Kind dauernd fallen lässt, oder lass das Original in der Verpackung, während ein billiges NTAG215 den Alltag abbekommt. Dafür habe ich das gebaut. Bring deine eigenen Keys mit, sichere nur Figuren, die dir wirklich gehören, und respektiere Nintendos Rechte und die Gesetze, die bei dir gelten. Was du mit dem Werkzeug anstellst, liegt in deiner Verantwortung.

---

## Der Praxistest an der Switch

Ich wollte das nicht einfach blind veröffentlichen, also habe ich es auf die einzige Weise getestet, die wirklich zählt.

Ich habe eine meiner eigenen Figuren gescannt, ein Backup auf ein leeres NTAG215 geschrieben und bin mit der Kopie rüber zur Switch. The Legend of Zelda: Tears of the Kingdom gestartet, die Kopie an den rechten Joy-Con gehalten, und schon lag eine Handvoll Items im Inventar. Genau wie beim Original. Keine Fehlermeldung, kein „Dieses Amiibo kann nicht gelesen werden“. Da war das Ganze für mich plötzlich echt. Die ganze Rechnerei bei der Schlüsselableitung, all die Byte-Layouts, und am Ende steht ein billiger leerer Sticker, den eine Nintendo-Konsole ohne Murren als echte Figur akzeptiert.

Das Regal neben meinem Schreibtisch ist jetzt mehr als Deko. Es ist ein Feature.

Wenn du es ausprobieren willst: Die Amiibo-Funktionen stecken in NFC.cool für [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-amiibo-iphone-android-read-collect-backup-de&mt=8) und [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-amiibo-iphone-android-read-collect-backup-de), gleich neben allem anderen, was ich fürs Lesen und Schreiben von Tags gebaut habe. Bring deine eigenen Keys mit, halt eine Figur ans Handy und schau, was deine App die ganze Zeit stillschweigend übersehen hat.
