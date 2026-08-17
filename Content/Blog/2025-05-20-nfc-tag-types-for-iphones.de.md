---
id: "nfc-tag-types-2025-05"
title: "Welche NFC-Tag-Typen es gibt - und welche mit dem iPhone funktionieren"
date: "2025-05-20"
tags: ["nfc-tags", "guides", "iphone"]
summary: "Type 1 bis Type 5, wer die Chips herstellt und warum die NTAG-Serie (Type 2) für iPhone-Projekte die sichere Wahl ist."
metaDescription: "NFC-Tag-Typen erklärt: Type 1 bis Type 5, wer die Chips herstellt und warum die NTAG-Serie (Type 2) für iPhone-Projekte die sicherste Wahl ist."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/nfc-tag-types.webp"
imageAlt: "Verschiedene NFC-Tag-Typen neben einem iPhone aufgereiht"
---

NFC-Tags sind kleine Chips, die ein paar Informationen speichern, und jedes NFC-fähige Gerät, also auch dein Handy, kann sie auslesen. Was mir damals allerdings niemand gesagt hat: NFC-Tag ist nicht gleich NFC-Tag. Es gibt einen ganzen Zoo an Typen von verschiedenen Herstellern, jeder mit eigenen Macken, und genau deshalb ist es überraschend fummelig, den richtigen fürs iPhone zu finden.

Ich entwickle seit Jahren NFC.cool, eine App zum Lesen und Schreiben von NFC-Tags, und „Welchen Tag soll ich für mein iPhone kaufen?“ gehört zu den Fragen, die mir mit Abstand am häufigsten gestellt werden. Das hier ist also die Antwort, die ich darauf immer gebe. Ich gehe die fünf NFC-Tag-Typen durch, erzähle dir, wer die Chips eigentlich herstellt, und warum einer davon für fast jedes iPhone-Projekt die sichere Wahl ist. Wenn NFC für dich komplett neu ist, fang am besten mit meinem [kompletten Einsteiger-Guide zu NFC-Tags](/de/blog/nfc-tags-beginners-guide/) an. Dieser Post hier geht schon eine Stufe tiefer ins Detail.

---

## Die fünf NFC-Tag-Typen im Überblick

NFC-Tags werden in fünf Typen eingeteilt: Type 1, Type 2, Type 3, Type 4 und Type 5. Ausgedacht haben sich das nicht die Hersteller, die Einteilung stammt vom NFC Forum, dem Industriekonsortium, das die NFC-Standards festlegt. Jeder Typ bringt seine eigene Speichergröße und Geschwindigkeit mit und ist entweder beschreibbar oder schreibgeschützt.

Genau nach diesem Raster gehe ich vor, wenn ich mir das Datenblatt eines Tags ansehe. Also der Reihe nach.

---

## Type 1 und 2 - Topaz und MIFARE Ultralight®

Type 1 (Topaz von Broadcom) und Type 2 (MIFARE Ultralight® von [NXP Semiconductors](https://nxp.com)) sind die günstigen, unkomplizierten Vertreter. Für einfache Einsätze wie Poster oder Visitenkarten sind sie genau richtig. Viel Speicher haben sie nicht (48 Bytes bis etwa 2 KB), aber für eine URL oder einen kurzen Text reicht das nach meiner Erfahrung dicke, und mehr wollen die meisten sowieso nicht draufschreiben.

---

## Type 3 - FeliCa™

Type-3-Tags kennt man auch als FeliCa™, entwickelt hat sie Sony. Begegnen wirst du ihnen vor allem in Asien, wo sie in Nahverkehrstickets und E-Geld-Karten stecken. Sie sind schneller und haben mehr Speicher (bis zu 1 MB), verbreitet sind sie trotzdem nur begrenzt: Sie kosten mehr und hängen an regionalen Anwendungen. Außerhalb dieses Umfelds habe ich sie so gut wie nie in der Hand.

---

## Type 4 - MIFARE DESFire®

MIFARE DESFire®-Tags, ebenfalls von NXP Semiconductors, sind Type 4. Das ist die Variante für hohe Sicherheit und viel Speicher, gemacht für anspruchsvolle Aufgaben wie sichere Zutrittskontrolle und Nahverkehrssysteme. Bis zu 8 KB passen drauf. Wenn ein Projekt wirklich kryptografischen Schutz braucht, schaue ich mir zuerst diese Familie an. Auf die Sicherheitsseite bin ich in meinem Post über das [sichere Aufbewahren von Geheimnissen auf verschlüsselten NFC-Tags](/de/blog/nfc-safe-encrypted-secrets/) genauer eingegangen.

---

## Type 5 - ISO 15693

Type-5-Tags folgen dem Standard ISO 15693 und sind im NFC-Ökosystem noch relativ neu. Zu Hause sind sie vor allem in der Industrie, und ihr größter Pluspunkt ist die höhere Lesereichweite im Vergleich zu den anderen Typen. Praktisch, wenn du Bestände in einer Lagerhalle nachverfolgen willst, weniger für den Tag, der bei dir am Kühlschrank klebt.

---

## Welche NFC-Tags solltest du fürs iPhone nehmen?

Und damit zum eigentlich wichtigen Punkt. Alle iPhones ab dem iPhone 7 lesen NDEF von allen fünf Tag-Typen des NFC Forums, und seit iOS 13 können Apps wie meine auch nativ mit Type-3-, Type-4- und Type-5-Tags kommunizieren, über reines NDEF hinaus. Am rundesten und berechenbarsten läuft es aber nach wie vor mit Type 2, und genau den empfehle ich für fast jedes Projekt. Und Type 2, das ist in der Praxis die [NTAG-Serie](https://www.nxp.com/products/wireless-connectivity/nfc-hf/ntag-for-tags-and-labels:NTAG-TAGS-AND-LABELS) von NXP Semiconductors.

Die Modelle NTAG213, NTAG215 und NTAG216 sind die beliebtesten dieser Serie und laufen mit iPhones hervorragend. Genau mit denen teste ich tagein, tagaus. Ihr Speicher (144 bis 888 Bytes) reicht für die meisten Projekte aus der Praxis, jedes NFC-fähige iPhone kann sie komplett lesen und beschreiben, und weil sie wiederbeschreibbar sind, kannst du den Inhalt so oft ändern, wie du willst.

Noch ein Tipp aus der Praxis, der mir viel Frust erspart hat: Je größer der Tag und seine Antenne, desto zuverlässiger erkennt ihn ein NFC-Reader. Von den ganz billigen, hauchdünnen Stickern würde ich die Finger lassen, wenn es bei deinem Projekt auf Zuverlässigkeit ankommt. Die paar Cent Ersparnis sind es nicht wert, wenn der Tag erst beim dritten Anlauf gelesen wird.

Hauptsächlich lesen iPhones per NFC sogenannte NDEF-Nachrichten (NFC Data Exchange Format): URLs, reinen Text oder vCards, also digitale Visitenkarten. Jeder Tag, der NDEF unterstützt, und das tun die meisten NTAG-Tags, ist für iPhone-Nutzer eine solide Wahl. Und wenn du dann tatsächlich etwas auf einen Tag schreiben willst: Dafür habe ich eine Schritt-für-Schritt-Anleitung [zum Beschreiben von NFC-Tags mit dem iPhone](/de/blog/write-nfc-tags-iphone/) geschrieben.

---

## Fazit

Wenn du NFC-Tags für dein iPhone kaufen willst, ist meine Empfehlung ehrlich gesagt ganz einfach: Type-2-Tags aus der NTAG-Serie von NXP Semiconductors. Sie sind günstig, mit dem iPhone am besten kompatibel und können alles, was die meisten Leute mit NFC auf dem iPhone überhaupt vorhaben. Kauf dir eine Packung NTAG215-Sticker und du bist für fast alles gerüstet.

NFC entwickelt sich weiter, es lohnt sich also, neue Chips und Tag-Spezifikationen im Auge zu behalten. Mehr dazu findest du in meinem früheren [Blick hinter die Kulissen von NFC auf dem iPhone](/de/blog/nfc-on-iphones-insider-look/), und wenn du einfach nur wissen willst, was schon auf einem Tag steht, kannst du [NFC-Tags direkt im Browser auslesen](/de/online-nfc-reader/).

Viel Spaß mit deinen Tags!
