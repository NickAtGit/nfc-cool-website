---
id: "nfc-tag-types-2025-05"
title: "Die verschiedenen NFC-Tag-Typen verstehen - und welche mit dem iPhone funktionieren"
date: "2025-05-20"
tags: ["nfc-tags", "guides", "iphone"]
summary: "Type 1 bis Type 5, wer sie herstellt und warum die NTAG-Serie (Type 2) die sicherste Wahl für iPhone-Projekte ist."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/nfc-tag-types.webp"
imageAlt: "Verschiedene NFC-Tag-Typen neben einem iPhone aufgereiht"
---

NFC-Tags sind kleine integrierte Schaltkreise, die Informationen speichern, die jedes NFC-fähige Gerät - zum Beispiel dein Smartphone - lesen kann. Aber eines hätte ich gern früher gewusst: Nicht alle NFC-Tags sind gleich. Es gibt einen ganzen Zoo an Typen verschiedener Hersteller, jeder mit eigenen Macken, und genau das macht es überraschend knifflig, den richtigen Tag fürs iPhone zu finden.

Ich entwickle seit Jahren NFC.cool, eine App zum Lesen und Schreiben von NFC-Tags, und "Welchen Tag soll ich für mein iPhone kaufen?" ist mit Abstand eine der Fragen, die ich am häufigsten gestellt bekomme. Das hier ist also meine Antwort. Ich gehe die fünf NFC-Tag-Typen durch, zeige dir, wer sie tatsächlich herstellt, und erkläre, warum einer davon für fast jedes iPhone-Projekt die sichere Wahl ist. Wenn das alles für dich neu ist, fängst du am besten mit meinem [kompletten Einsteiger-Guide zu NFC-Tags](/de/blog/nfc-tags-beginners-guide/) an - dieser Post geht eine Ebene tiefer.

---

## NFC-Tag-Typen verstehen

NFC-Tags werden in fünf Typen unterteilt: Type 1, Type 2, Type 3, Type 4 und Type 5. Diese Einteilung haben sich nicht die Hersteller ausgedacht - sie kommt vom NFC Forum, dem Industriekonsortium, das die Standards festlegt. Jeder Typ hat seine eigene Speicherkapazität und Geschwindigkeit und kann entweder beschreibbar oder schreibgeschützt sein.

Genau diese Brille setze ich auf, wenn ich mir das Datenblatt eines Tags ansehe, also gehen wir die Typen einen nach dem anderen durch.

---

## Type 1 & 2 - Topaz und MIFARE Ultralight®

Type 1 (Topaz, von Broadcom) und Type 2 (MIFARE Ultralight®, von [NXP Semiconductors](https://nxp.com)) sind das günstige, unkomplizierte Ende des Spektrums. Sie eignen sich gut für einfache Anwendungen wie Poster und Visitenkarten. Ihre Speicherkapazität ist klein (48 Bytes bis etwa 2 KB), aber meiner Erfahrung nach reicht das locker für eine URL oder einen kurzen Text - und genau das wollen die meisten Leute ohnehin.

---

## Type 3 - FeliCa™

Type-3-Tags, auch bekannt als FeliCa™, wurden von Sony entwickelt. Sie begegnen dir vor allem in Asien, wo sie ÖPNV-Tickets und E-Geld antreiben. Sie bieten höhere Geschwindigkeit und mehr Speicher (bis zu 1 MB), ihre Nutzung ist aber recht begrenzt, weil sie teurer und an regionsspezifische Anwendungen gebunden sind. Außerhalb dieses Kontexts greife ich nur selten zu ihnen.

---

## Type 4 - MIFARE DESFire®

MIFARE DESFire®-Tags, ebenfalls von NXP Semiconductors, sind Type 4. Sie sind die Option mit hoher Sicherheit und großer Kapazität, gebaut für komplexe Aufgaben wie sichere Zutrittskontrolle und ÖPNV-Systeme. Sie können bis zu 8 KB speichern. Wenn ein Projekt wirklich kryptografischen Schutz braucht, ist das die Familie, die ich mir ansehe - die Sicherheitsseite habe ich in meinem Post über das [sichere Aufbewahren von Geheimnissen auf verschlüsselten NFC-Tags](/de/blog/nfc-safe-encrypted-secrets/) genauer beleuchtet.

---

## Type 5 - ISO 15693

Type-5-Tags entsprechen dem ISO-15693-Standard und sind im NFC-Ökosystem relativ neu. Sie sind vor allem ein Industriethema, und ihr Aushängeschild ist eine größere Lesereichweite als bei den anderen Typen. Nützlich, wenn du Inventar quer durch ein Lager verfolgst, weniger für den Tag, der an deinem Kühlschrank klebt.

---

## Welche NFC-Tags solltest du fürs iPhone wählen?

Jetzt kommt der Teil, der am wichtigsten ist. iPhones ab dem iPhone 7 sind kompatibel mit NFC Type 1, 2 und 5, bieten aber die beste Unterstützung für Type 2. Type-2-NFC-Tags sind die [NTAG-Serie](https://www.nxp.com/products/wireless-connectivity/nfc-hf/ntag-for-tags-and-labels:NTAG-TAGS-AND-LABELS) von NXP Semiconductors.

Die Modelle NTAG213, NTAG215 und NTAG216 sind die beliebtesten dieser Serie und funktionieren hervorragend mit iPhones - gegen genau die teste ich Tag für Tag. Sie bieten genug Speicher (144 bis 888 Bytes) für die meisten praktischen Projekte, sind von jedem NFC-fähigen iPhone vollständig lesbar und beschreibbar und außerdem wiederbeschreibbar, sodass du ihren Inhalt so oft ändern kannst, wie du willst.

Ein praktischer Hinweis, der mir viel Frust erspart hat: Je größer Tag und Antenne, desto zuverlässiger erfasst ein NFC-Reader den Tag. Ich würde die extrem billigen, dünnen Sticker meiden, wenn Zuverlässigkeit für dein Projekt zählt - die paar gesparten Cent sind einen Tag, der erst beim dritten Antippen liest, nicht wert.

Das Wichtigste, was iPhones mit NFC machen, ist das Lesen von NFC-Data-Exchange-Format-(NDEF)-Nachrichten - URLs, Klartext oder vCards (digitale Visitenkarten). Jeder Tag, der NDEF unterstützt - und das tun die meisten NTAG-Tags - ist eine solide Wahl für iPhone-Nutzer. Wenn du dann tatsächlich Daten auf einen Tag schreiben willst, habe ich eine Schritt-für-Schritt-Anleitung [zum Beschreiben von NFC-Tags auf dem iPhone](/de/blog/write-nfc-tags-iphone/) geschrieben.

---

## Zusammenfassung

Wenn du NFC-Tags für dein iPhone suchst, ist meine ehrliche Empfehlung simpel: Type-2-Tags aus der NTAG-Serie von NXP Semiconductors. Sie sind kostengünstig und bieten die beste Kompatibilität und Funktionalität für das, was die meisten Leute tatsächlich mit NFC auf dem iPhone tun wollen. Kauf dir eine Packung NTAG215-Sticker und du bist für fast alles gerüstet.

NFC entwickelt sich ständig weiter, es lohnt sich also, neue Entwicklungen und Tag-Spezifikationen mit einem Auge im Blick zu behalten. Mehr dazu findest du in meinem früheren Post über [die Magie von NFC auf iPhones](/de/blog/nfc-on-iphones-insider-look/), und wenn du einfach nur sehen willst, was schon auf einem Tag steht, kannst du [NFC-Tags direkt im Browser auslesen](/de/nfc-reader/).

Happy Tagging!
