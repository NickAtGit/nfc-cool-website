---
id: nfc-blog-020
title: "NFC auf dem iPhone: Ein Blick hinter die Kulissen"
date: 2024-02-08
tags: ["nfc-tags", "iphone"]
summary: "Wie NFC auf dem iPhone tatsächlich funktioniert - von Apple Pays Secure Element bis zu Core NFC. Ein praktischer Blick auf das Protokoll, die iOS-Geschichte und warum die kurze Reichweite ein Feature ist, kein Bug."
metaTitle: "Wie NFC auf dem iPhone funktioniert: Ein Blick hinter die Kulissen"
metaDescription: "Eine praktische Erklärung von NFC auf dem iPhone - wie das Protokoll funktioniert, Apple Pays Secure Element, Core NFC Tag-Lesung und warum kurze Reichweite ein Sicherheitsfeature ist."
ogTitle: "NFC auf dem iPhone: Ein Blick hinter die Kulissen"
ogDescription: "Wie NFC auf dem iPhone tatsächlich funktioniert - Protokoll, Secure Element, Core NFC und die iOS-Geschichte."
image: "/assets/images/Blog/nfc-on-iphones-insider-look.webp"
---
Viel von der Technik, die wir täglich nutzen, verschwindet im Hintergrund. Wir tippen zum Bezahlen, Entsperren, Scannen, Teilen - und denken nie über das Protokoll darunter nach. NFC ist eines dieser stillen Infrastrukturstücke, und nach Jahren, in denen ich NFC.cool gebaut habe, eine App zum Lesen und Schreiben von NFC-Tags, habe ich mehr Zeit in diesem Maschinenraum verbracht als die meisten Menschen es je tun werden. So funktioniert es auf deinem iPhone tatsächlich, so wie ich es einem neugierigen Freund erklären würde.

---

## Was NFC eigentlich ist

**Near Field Communication** ist ein Funkprotokoll mit kurzer Reichweite - zwei Geräte können Daten austauschen, wenn sie innerhalb von etwa 4 cm zueinander sind. Ich stelle es mir als einen vereinfachten, viel kürzeren Verwandten von Bluetooth und Wi-Fi vor.

Diese kurze Reichweite irritiert anfangs viele, aber sie ist keine Einschränkung. Sie ist das Sicherheitsmodell, und als das bei mir Klick gemacht hat, ergaben viele Designentscheidungen von NFC plötzlich Sinn. Du kannst nicht versehentlich quer durch den Raum an einem Zahlungsterminal tippen, und ein bösartiger Reader kann nicht aus der Ferne Daten aus deinem Wallet abgreifen. Falls das alles neu für dich ist - ich habe einen ruhigen [Einsteiger-Guide zu NFC-Tags](/de/blog/nfc-tags-beginners-guide/) geschrieben, der weiter vorne ansetzt als dieser Beitrag.

---

## NFC auf dem iPhone: Eine kurze Geschichte

Apple verbaute zum ersten Mal NFC-Hardware im iPhone 6 und 6 Plus (2014), aber das Funkmodul war auf Apple Pay beschränkt. Dritt-Apps konnten gar keine NFC-Tags lesen - für jemanden, der später eine NFC-App bauen sollte, waren das ein paar frustrierende Jahre, in denen ich nur zuschauen konnte.

Das änderte sich mit **iOS 11** (2017), das das **Core NFC** Framework einführte und Entwicklern wie mir endlich erlaubte, NDEF-Tags zu lesen. Apple hat die Tür in späteren Releases weiter geöffnet - iOS 13 brachte Schreibunterstützung, und iPhone XS und neuer ergänzten dauerhafte Hintergrund-Tag-Lesung. Heute kannst du auf jedem modernen iPhone einen Tag antippen, ohne etwas zu öffnen: Das OS erkennt ihn und schlägt die passende Aktion vor.

---

## Wie NFC Daten überträgt

NFC-Geräte arbeiten pro Interaktion in einer von zwei Rollen: **aktiv** (mit Strom, erzeugt ein Feld) oder **passiv** (keine Batterie, gewinnt Strom aus dem Feld). Das ist der eine Gedanke, zu dem ich immer zurückkehre, wenn mich jemand fragt, wie NFC funktioniert.

Wenn du mit Apple Pay zahlst, ist dein iPhone der aktive Reader. Es erzeugt ein Funkfeld bei 13,56 MHz. Das NFC-Element des Terminals wird in diesem Feld aktiv, identifiziert sich, und tauscht eine kleine kryptografische Nutzlast mit deinem iPhone aus. Deine Kartendaten verlassen das **Secure Element** nie - einen dedizierten, hardware-isolierten Chip im iPhone. Was rausgeht, ist ein Einmal-Token.

Beim Tippen auf einen NFC-Sticker auf einem Poster sind die Rollen vertauscht. Der Tag im Poster ist passiv - er hat keine Batterie. Der Reader deines iPhones versorgt ihn mit Strom, der Tag antwortet mit den gespeicherten NDEF-Records, und iOS entscheidet, was passiert (URL öffnen, App starten, Kontaktkarte zeigen, einen Kurzbefehl triggern). Diese zweite Hälfte - die Tag-Seite - ist der Bereich, in dem NFC.cool lebt, und wenn du es ohne Installation in Aktion sehen willst, kannst du auf Android [NFC-Tags direkt im Browser lesen](/de/online-nfc-reader/).

---

## NDEF: Die Lingua Franca

Die Datenschicht über dem NFC-Funk ist **NDEF** - NFC Data Exchange Format. Ich beschreibe es als ein winziges selbstbeschreibendes Record-Format: Ein Tag trägt einen oder mehrere Records, und jeder hat einen Typ (URI, Text, vCard, WLAN-Zugangsdaten, Custom MIME) plus eine Payload.

Jedes NFC-fähige Telefon auf dem Planeten spricht NDEF. Deshalb lässt sich ein auf Android programmierter Tag problemlos auf iPhone lesen und umgekehrt. Es ist einer der wenigen Bereiche im Mobile-Stack, in dem iOS und Android wirklich denselben Standard sprechen, und ehrlich gesagt ist diese Interoperabilität das, wofür ich beim Bauen von Features am dankbarsten bin - ich schreibe für das Format, nicht für eine Plattform. Wenn du selbst Records schreiben willst, gehe ich das in [wie man NFC-Tags auf dem iPhone schreibt](/de/blog/write-nfc-tags-iphone/) durch.

---

## Privatsphäre und Sicherheit

Zwei Verteidigungslinien sind erwähnenswert, und es sind die beiden, die ich am häufigsten erkläre:

- **Reichweite.** Wenige Zentimeter sind schwer abzufangen, ohne dass eine sichtbare Antenne im Spiel ist - das ist das ursprüngliche Threat-Model, für das NFC entworfen wurde.
- **Tokenisierung.** Apple Pay überträgt nie deine echte Kartennummer. Jede Transaktion nutzt eine Device Account Number plus ein Einmal-Cryptogram, generiert im Secure Element. Selbst ein kompromittiertes Terminal kann das nicht erneut einspielen.

Beim Tag-Lesen sieht die Angriffsfläche anders aus - hier wird dem Tag selbst vertraut. Wenn du kontrollierst, was draufsteht (deine eigenen Heim-Automatisierungen, deine Visitenkarte), bist du fein raus. Wenn du einen zufälligen Tag im öffentlichen Raum tippst, solltest du in iOS trotzdem einen Bestätigungs-Prompt sehen, bevor irgendetwas passiert. Wenn ich wirklich brauche, dass ein Tag ein Geheimnis hält, statt nur darauf zu verweisen, greife ich zu kryptografischen Tags - das habe ich in [sichere, verschlüsselte Geheimnisse auf NFC-Tags speichern](/de/blog/nfc-safe-encrypted-secrets/) behandelt.

---

## Warum das wichtig ist

NFC ist eines dieser Protokolle, die verschwinden, wenn sie funktionieren, und genau deshalb macht es mir Spaß, darauf zu bauen. Du tippst auf eine Schranke, ein Zahlungsterminal, eine Visitenkarte, einen Smart Speaker - und etwas passiert. Kein Pairing, keine PIN, kein App-Start. Nur eine bewusste physische Geste, die genau einen Austausch autorisiert.

Genau deshalb habe ich [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-on-iphones-insider-look-de&mt=8) gebaut - um die volle NDEF-Oberfläche von NFC verfügbar zu machen, ohne dass jemand zuerst das Protokoll lernen muss. Jeden Tag lesen, jeden Record-Typ schreiben, den Tag sperren, wenn du fertig bist. Auf iPhone oder [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-on-iphones-insider-look-de).
