---
id: nfc-blog-013
title: "Warum vCard-NFC-Tags auf dem iPhone nicht funktionieren (und was stattdessen geht)"
date: 2026-04-16
tags: ["nfc-tags", "business-cards", "guides", "iphone"]
summary: "Deine NFC-Visitenkarte mit vCard klappt auf Android, aber nicht auf dem iPhone? Warum iOS vCard-Daten ignoriert und welche einfache Lösung auf jedem Handy funktioniert."
image: "/assets/images/Blog/vcard-nfc-iphone-not-working.webp"
imageAlt: "iPhone neben einer vCard-NFC-Visitenkarte, daneben die Schritte zur Lösung"
metaTitle: "Warum vCard-NFC-Tags am iPhone nicht funktionieren | NFC.cool"
metaDescription: "NFC-Visitenkarte mit vCard klappt auf Android, aber nicht am iPhone? Warum iOS vCard-Daten ignoriert und welche einfache Lösung auf jedem Handy funktioniert."
ogTitle: "Warum vCard-NFC-Tags am iPhone nicht funktionieren"
ogDescription: "iPhones ignorieren vCard-Daten auf NFC-Tags stillschweigend. Woran das liegt und was stattdessen funktioniert."
---
Ich baue seit Jahren NFC-Apps. Und es vergeht keine Woche, in der mir nicht jemand so etwas schreibt:

> „Hallo, ich habe mir eine NFC-Visitenkarte gekauft und meine vCard draufgeschrieben. Auf dem Android-Handy meines Kollegen klappt das super. Halte ich sie an mein iPhone, passiert gar nichts. Ist die Karte kaputt?“

Deine Karte ist nicht kaputt.

Dein iPhone kann mit einer vCard auf einem NFC-Tag schlicht nichts anfangen. Und daran wird sich vermutlich auch nie etwas ändern.

Ich erkläre dir, woran das liegt und was stattdessen zuverlässig funktioniert.

---

## Warum vCard-NFC-Tags auf dem iPhone nicht funktionieren

Das passiert, wenn du einen NFC-Tag mit vCard-Daten scannst:

**Auf Android:** Die Kontakte-App geht auf. Du siehst die Kontaktdaten. Ein Tipp auf Speichern. Fertig. Genau so soll es sein.

**Auf dem iPhone:** Nichts. Wirklich gar nichts. Kein Banner, keine Fehlermeldung. Dein iPhone liegt da und ignoriert dich einfach.

Als ich das zum ersten Mal auf einer Konferenz miterlebt habe, hat mich mein Gegenüber mit der Karte in der Hand angeschaut, als wäre *ich* kaputt.

**Woran liegt das?**

Laut Apples Entwicklerdokumentation erkennt das iPhone beim Lesen von NFC-Tags im Hintergrund nur ganz bestimmte Datentypen:

- ✓ Web-URLs (http:// und https://)
- ✓ Telefonnummern (tel:)
- ✓ SMS-Links (sms:)
- ✗ vCard-Kontaktdaten - **nicht unterstützt**

Erkennt dein iPhone einen NFC-Tag mit vCard-Daten, ignoriert es ihn kommentarlos. Kein Fallback, kein Hinweis, nichts.

Android versteht vCards von Haus aus, weil Google das sinnvoll fand. Apple fand, URLs reichen.

Die Regeln mache nicht ich. Ich baue nur drumherum.

---

## Moment, kann nicht einfach eine App die vCard auf dem iPhone lesen?

Technisch schon. Mit einer NFC-Reader-App wie [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-de&mt=8) auf dem iPhone oder [NFC.cool Tools für Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-de) lassen sich die Rohdaten des Tags auslesen, vCard-Datensätze eingeschlossen, und die Kontaktdaten anzeigen. Auf Android macht [NFC.cool Tools](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-de) das automatisch, sobald es eine vCard auf einem Tag erkennt.

Der Haken: **Wer deine Karte scannt, muss die App schon installiert haben.**

Auf einem Networking-Event heißt das: *„Hey, bevor du meine Karte scannst: Könntest du kurz in den App Store gehen, eine NFC-App suchen, sie herunterladen, die Installation abwarten, sie öffnen, den NFC-Zugriff erlauben und dann scannen?“*

Bis dahin ist dein Gegenüber längst weitergezogen. Der Zauber ist weg.

Der Witz an NFC ist ja gerade: *dranhalten, fertig*. Jeder zusätzliche Schritt macht das kaputt.

Zum Lesen und Beschreiben von NFC-Tags ist NFC.cool Tools super, genau dafür habe ich es gebaut. Aber wenn du deine Kontaktdaten an Fremde weitergeben willst, brauchst du etwas, das auf der Gegenseite ganz ohne App auskommt.

---

## Die Lösung: NFC-Visitenkarten mit einer URL

Was dir beim Kauf einer NFC-Visitenkarte niemand sagt:

**Auf den Tag gehören überhaupt keine Kontaktdaten.**

Sondern eine URL, die auf ein digitales Profil zeigt.

Genau so macht es [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-de&mt=8). Statt vCard-Daten auf den Tag zu quetschen, wo das iPhone sie ohnehin ignoriert, kommt nur ein smarter Link zu deinem digitalen Profil drauf.

**Wenn jemand deine Karte scannt:**

- iPhone → Link öffnet sich → Profil lädt → Kontakt mit einem Fingertipp speichern
- Android → derselbe Ablauf → funktioniert einwandfrei
- Jedes andere Smartphone → funktioniert genauso

Dein Gegenüber braucht keine App. Keine Anleitung. Kein Gefummel.

Dranhalten. Profil. Speichern. Fertig.

---

## Warum ein digitales Profil besser ist als eine vCard

Als ich das zum ersten Mal gebaut habe, hielt ich es für einen reinen Notbehelf wegen Apples Einschränkung.

Inzwischen weiß ich: Der Ansatz ist einfach *besser*, als vCards es je waren.

**Was eine vCard kann:** Name, Telefonnummer, E-Mail, vielleicht noch die Position. Das war's. Statische Daten, Stand 2005.

**Was ein digitales Profil hinter einer URL kann:**

▸ **Alle deine Links an einer Stelle**
LinkedIn, Twitter, Instagram, dein Portfolio, dein Calendly-Link zum Terminbuchen: alles einen Fingertipp entfernt.

▸ **Smarte Networking-Funktionen**
Du kennst das: Du lernst jemanden kennen, speicherst den Kontakt, und zwei Wochen später starrst du auf „John - Konferenz“ und hast keine Ahnung mehr, wer John war.

In NFC.cool hältst du den Kontext gleich mit fest: wo ihr euch getroffen habt, worüber ihr gesprochen habt, was du nachfassen wolltest. Wie ein CRM, nur ohne die 50 €/Monat.

▸ **Apple-Wallet-Integration**
Deine digitale Visitenkarte liegt in Apple Wallet. NFC-Karte zu Hause vergessen? Dann zeigst du eben dein Handy.

▸ **Jederzeit änderbar**
Neuer Job? Neue Nummer? Du änderst dein Profil einmal, und alle, die deinen Link haben, sehen sofort den neuen Stand. Keine Karten nachdrucken, keine Tags neu beschreiben.

Nichts davon kann eine vCard. Sie ist in dem Moment eingefroren, in dem du sie auf den Tag schreibst.

▸ **Funktioniert auf jedem Handy**
Anders als eine vCard läuft ein Profil hinter einer URL auf jedem Smartphone: iPhone, Android, sogar auf älteren Geräten, die nur einen Browser haben. Die [NFC.cool Business Card App](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-de&mt=8) auf iOS nutzt dafür einen [App Clip](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-de&mt=8), dein Gegenüber muss also nicht einmal etwas installieren. Auf Android öffnet [NFC.cool Business Card](https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-de) direkt ein Web-Profil.

---

## FAQ

**Wird Apple vCards auf NFC-Tags irgendwann unterstützen?**

Seit Jahren hat sich daran nichts getan. Das Lesen im Hintergrund ist seit dem iPhone XS auf URLs, Telefonnummern und SMS-Links beschränkt, und dabei ist es geblieben. Ich würde nicht darauf warten.

**Betrifft das alle iPhones?**

Ja. Jedes iPhone, das NFC-Tags im Hintergrund liest (iPhone XS und neuer, mit iOS 13 oder neuer), ignoriert vCard-Daten auf NFC-Tags.

**Kann ich vCard-NFC-Tags mit dem iPhone überhaupt lesen?**

Nur mit einer NFC-Reader-App. [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-de&mt=8) auf dem iPhone und [NFC.cool Tools für Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-de) lesen vCard-Daten von NFC-Tags und zeigen sie an. Android kann das auch ohne App, das iPhone nicht. Zum Weitergeben deiner Visitenkarte ist [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-de&mt=8) trotzdem der bessere Weg, weil auf der Gegenseite gar keine App nötig ist.

**Welche NFC-Tags eignen sich am besten für digitale Visitenkarten?**

Jeder NTAG213 oder NTAG215 reicht völlig. Auf den Tag kommt nur eine URL, viel Speicher brauchst du also nicht.

**Kann ich NFC-Tags mit dem iPhone beschreiben?**

Ja. Mit [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-de&mt=8) schreibst du URLs und andere Daten direkt vom iPhone aus auf NFC-Tags. Die App unterstützt alle gängigen NDEF-Datensatztypen und funktioniert mit jedem NTAG-Tag.

---

## Fazit

Steht auf deiner NFC-Visitenkarte eine vCard, ist sie für die Hälfte der Leute unsichtbar. iPhones lesen sie ohne App nicht, und du kannst schlecht jeden neuen Kontakt bitten, erst mal eine zu installieren.

Die Lösung ist kein Notbehelf, sondern der grundlegend bessere Ansatz:

1. Schreib eine URL auf den Tag statt Kontaktdaten
2. Lass die URL auf ein vollwertiges digitales Profil zeigen
3. Das Profil übernimmt den Rest: Kontakt speichern, Links teilen und alles andere

Genau das macht NFC.cool Business Card. Und genau das benutze ich selbst auf jeder Konferenz, jedem Meetup und jedem Networking-Event.

Ich halte die Karte hin, mein Gegenüber speichert, und wir gehen beide unserer Wege.

**So muss das laufen.**

*NFC.cool Business Card gibt es im [App Store](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-de&mt=8) und bei [Google Play](https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-de). NFC.cool Tools (zum Lesen und Beschreiben von Tags) gibt es im [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-de&mt=8) und bei [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-de).*
