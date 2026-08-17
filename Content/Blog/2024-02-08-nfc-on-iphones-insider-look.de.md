---
id: nfc-blog-020
title: "NFC auf dem iPhone: Ein Blick hinter die Kulissen"
date: 2024-02-08
tags: ["nfc-tags", "iphone"]
summary: "Wie NFC auf dem iPhone wirklich funktioniert - vom Secure Element hinter Apple Pay bis zum Tag-Lesen mit Core NFC. Ein praxisnaher Blick auf das Protokoll, die iOS-Geschichte und darauf, warum die kurze Reichweite ein Feature ist und kein Manko."
metaTitle: "NFC auf dem iPhone erklärt: Ein Blick hinter die Kulissen"
metaDescription: "So funktioniert NFC auf dem iPhone: das Protokoll, das Secure Element hinter Apple Pay, Tag-Lesen mit Core NFC und warum kurze Reichweite ein Sicherheitsfeature ist."
ogTitle: "NFC auf dem iPhone: Ein Blick hinter die Kulissen"
ogDescription: "Wie NFC auf dem iPhone wirklich funktioniert - Protokoll, Secure Element, Core NFC und die iOS-Geschichte."
image: "/assets/images/Blog/nfc-on-iphones-insider-look.webp"
---
Viel von der Technik, die wir jeden Tag benutzen, fällt gar nicht mehr auf. Wir halten das Handy irgendwo dran, um zu bezahlen, zu entsperren, zu scannen oder etwas zu teilen - und denken keine Sekunde an das Protokoll darunter. NFC gehört zu dieser stillen Infrastruktur, und nach Jahren Arbeit an NFC.cool, meiner App zum Lesen und Schreiben von NFC-Tags, habe ich mehr Zeit in diesem Maschinenraum verbracht als die meisten Menschen je verbringen werden. Hier zeige ich dir, wie das auf deinem iPhone wirklich abläuft - so, wie ich es einem neugierigen Freund erklären würde.

---

## Was NFC eigentlich ist

**Near Field Communication** ist ein Funkprotokoll für kurze Distanzen: Zwei Geräte tauschen Daten aus, sobald sie sich auf etwa 4 cm nahekommen. Ich stelle es mir gern als den abgespeckten kleinen Verwandten von Bluetooth und WLAN vor, nur mit viel kürzerer Reichweite.

Über diese kurze Reichweite stolpern anfangs viele, aber sie ist keine Einschränkung, sondern das Sicherheitskonzept. Als mir das klar wurde, ergaben auf einmal viele Designentscheidungen bei NFC Sinn: Du löst nicht aus Versehen quer durch den Raum ein Bezahlterminal aus, und niemand kann mit einem präparierten Lesegerät aus der Distanz unbemerkt Daten aus deinem Wallet abziehen. Wenn das alles neu für dich ist: Ich habe einen [Einsteiger-Guide zu NFC-Tags](/de/blog/nfc-tags-beginners-guide/) geschrieben, der deutlich weiter vorne ansetzt als dieser Beitrag.

---

## NFC auf dem iPhone: Eine kurze Geschichte

NFC-Hardware hat Apple zum ersten Mal 2014 ins iPhone 6 und 6 Plus eingebaut, das Funkmodul war aber ausschließlich für Apple Pay reserviert. Apps von Drittanbietern konnten überhaupt keine NFC-Tags lesen. Für jemanden, der später selbst eine NFC-App bauen würde, waren das ein paar frustrierende Jahre, in denen ich nur zusehen konnte.

Mit **iOS 11** (2017) kam das **Core NFC**-Framework, und Entwickler wie ich durften endlich NDEF-Tags lesen. In den folgenden Releases hat Apple die Tür Stück für Stück weiter aufgemacht: iOS 13 brachte das Schreiben dazu, und ab dem iPhone XS liest das Handy Tags dauerhaft im Hintergrund. Heute hältst du ein modernes iPhone einfach an einen Tag, ohne vorher irgendetwas zu öffnen: iOS erkennt ihn und schlägt die passende Aktion vor.

---

## Wie NFC Daten überträgt

Bei jeder Interaktion hat ein NFC-Gerät eine von zwei Rollen: **aktiv** (mit Stromversorgung, baut ein Feld auf) oder **passiv** (ohne Batterie, zieht sich den Strom aus dem Feld). Auf diesen einen Gedanken komme ich immer wieder zurück, wenn mich jemand fragt, wie NFC funktioniert.

Wenn du mit Apple Pay bezahlst, ist dein iPhone der aktive Reader. Es erzeugt ein Funkfeld bei 13,56 MHz. Das NFC-Element im Terminal wacht in diesem Feld auf, meldet sich und tauscht mit deinem Handy eine kleine kryptografische Nutzlast aus. Deine Kartendaten verlassen dabei nie das **Secure Element**, einen eigenen, hardwareseitig abgeschotteten Chip im iPhone. Nach draußen geht nur ein Einmal-Token.

Hältst du dein iPhone dagegen an einen NFC-Sticker auf einem Poster, sind die Rollen vertauscht. Der Tag im Poster ist passiv, er hat keine Batterie. Der Reader in deinem iPhone versorgt ihn mit Strom, der Tag antwortet mit den NDEF-Records, die auf ihm gespeichert sind, und iOS entscheidet, was damit passiert: eine URL öffnen, eine App starten, eine Kontaktkarte anzeigen, einen Kurzbefehl auslösen. Diese zweite Hälfte, die Tag-Seite, ist die Welt, in der NFC.cool zu Hause ist. Und wenn du das ausprobieren willst, ohne etwas zu installieren, kannst du auf Android [NFC-Tags direkt im Browser lesen](/de/online-nfc-reader/).

---

## NDEF: Die Lingua Franca

Über dem NFC-Funk liegt die Datenschicht, und die heißt **NDEF**, kurz für NFC Data Exchange Format. Ich beschreibe es gern als winziges Record-Format, das sich selbst beschreibt: Ein Tag trägt einen oder mehrere Records, und jeder Record hat einen Typ (URI, Text, vCard, WLAN-Zugangsdaten, eigener MIME-Typ) und eine Payload.

Jedes NFC-fähige Handy auf diesem Planeten spricht NDEF. Deshalb liest ein iPhone problemlos einen Tag, der auf einem Android-Gerät beschrieben wurde, und umgekehrt. Es ist eine der wenigen Stellen im Mobile-Bereich, an denen iOS und Android sich wirklich einen Standard teilen, und ehrlich gesagt bin ich beim Bauen neuer Features für nichts so dankbar wie für genau diese Interoperabilität: Ich schreibe für das Format, nicht für eine Plattform. Wenn du selbst Records schreiben willst, zeige ich das Schritt für Schritt in [NFC-Tags mit dem iPhone beschreiben](/de/blog/write-nfc-tags-iphone/).

---

## Privatsphäre und Sicherheit

Zwei Schutzschichten sind hier erwähnenswert, und es sind genau die beiden, die ich am häufigsten erklären muss:

- **Reichweite.** Ein paar Zentimeter lassen sich kaum abfangen, ohne dass irgendwo eine auffällige Antenne im Spiel ist. Das ist das ursprüngliche Bedrohungsmodell, für das NFC entworfen wurde.
- **Tokenisierung.** Apple Pay überträgt nie deine echte Kartennummer. Jede Transaktion nutzt eine Device Account Number plus ein Einmal-Kryptogramm, das im Secure Element erzeugt wird. Selbst ein kompromittiertes Terminal kann es nicht noch einmal einspielen.

Beim Lesen von Tags sieht die Angriffsfläche anders aus, denn hier ist es der Tag selbst, dem man vertraut. Wenn du kontrollierst, was draufsteht (deine eigenen Automatisierungen zu Hause, deine Visitenkarte), ist alles gut. Scannst du irgendeinen fremden Tag im öffentlichen Raum, sollte iOS dir trotzdem erst eine Bestätigung anzeigen, bevor irgendetwas passiert. Und wenn ein Tag bei mir wirklich ein Geheimnis enthalten soll, statt nur darauf zu verweisen, greife ich zu kryptografischen Tags. Darüber habe ich in [verschlüsselte Geheimnisse sicher auf NFC-Tags speichern](/de/blog/nfc-safe-encrypted-secrets/) geschrieben.

---

## Warum das wichtig ist

NFC gehört zu den Protokollen, die verschwinden, sobald sie funktionieren, und genau deshalb macht es mir so viel Spaß, darauf aufzubauen. Du hältst dein Handy an ein Drehkreuz, ein Bezahlterminal, eine Visitenkarte, einen Smart Speaker - und etwas passiert. Kein Pairing, keine PIN, keine App, die erst starten muss. Nur eine bewusste Handbewegung, die genau einen Austausch freigibt.

Genau dafür habe ich [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-on-iphones-insider-look-de&mt=8) gebaut: damit jeder alles nutzen kann, was NDEF hergibt, ohne vorher das Protokoll lernen zu müssen. Jeden Tag lesen, jeden Record-Typ schreiben, den Tag am Ende sperren. Auf dem iPhone oder auf [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-on-iphones-insider-look-de).
