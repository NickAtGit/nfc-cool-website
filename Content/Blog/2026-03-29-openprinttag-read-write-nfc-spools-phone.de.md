---
id: nfc-blog-011
title: "OpenPrintTag: Smarte 3D-Druck-Spulen mit dem Handy lesen & beschreiben"
date: 2026-03-29
tags: ["nfc-tags", "automation"]
summary: "OpenPrintTag ist der offene Standard für smarte Filament-Spulen. Lerne, wie es funktioniert, welche Daten es speichert und wie du OpenPrintTag-NFC-Tags mit nur deinem Handy lesen und beschreiben kannst."
image: "/assets/images/Blog/openprinttag-read-write-nfc-spools-phone.webp"
imageAlt: "3D-Druck-Spule mit NFC-Tag wird per Smartphone gelesen"
metaTitle: "OpenPrintTag: Smarte 3D-Druck-Spulen mit dem Handy lesen & beschreiben"
metaDescription: "Lerne, wie du OpenPrintTag nutzt, um deine 3D-Druck-Filament-Spulen mit NFC zu verwalten. Lies, schreibe und verfolge Materialdaten von deinem iPhone oder Android - keine proprietären Apps nötig."
ogTitle: "OpenPrintTag: Smarte 3D-Druck-Spulen mit NFC"
ogDescription: "Der komplette Guide zum Lesen und Beschreiben von OpenPrintTag-NFC-Spulen mit dem Handy. Funktioniert mit jedem Drucker, jeder Filament-Marke."
---
Wenn du 3D druckst, warst du wahrscheinlich schon da: ein Regal voller halb verbrauchter Spulen, keine Ahnung, wie viel Filament noch drauf ist, und diese eine unbeschriftete Spule, die PETG oder PLA sein könnte - keine Möglichkeit, es ohne einen Testdruck herauszufinden. Mir ging es genauso, und genau diese Art von kleinem, immer wiederkehrendem Ärgernis kann NFC wirklich gut lösen.

Genau das macht OpenPrintTag. Es ist ein Open-Source-NFC-Standard, der von [Prusa Research](https://www.prusa3d.com) erstellt wurde und jeden kompatiblen NFC-Tag in ein smartes Label für deine Filament-Spule verwandelt. Materialtyp, Marke, Farbe, verbleibendes Gewicht - alles direkt auf der Spule gespeichert und mit einem kurzen Tippen des Handys lesbar.

Keine Cloud. Kein proprietäres Ökosystem. Kein Internet erforderlich. Ich habe Jahre damit verbracht, NFC.cool zu bauen, eine App zum Lesen und Beschreiben von NFC-Tags, und das ist genau die Art von Standard, die ich gerne sehe - einer, der die Daten auf den Tag legt und sie überall funktionieren lässt. Hier zeige ich dir, wie es funktioniert und wie ich OpenPrintTag-Spulen mit nichts als einem Handy lese und beschreibe.

---

## Was ist OpenPrintTag?

OpenPrintTag ist ein universelles, offenes Datenformat für 3D-Druck-Materialien. Anstatt dass jeder Hersteller sein eigenes inkompatibles Smart-Spule-System erfindet - genau das Chaos, das ich in anderen Ecken der NFC-Welt erlebt habe - definiert OpenPrintTag einen einzigen Standard, den jeder übernehmen kann: Filament-Hersteller, Druckerhersteller, Slicer-Software und Apps wie NFC.cool.

Die Kernprinzipien, und die Gründe, warum ich es für beachtenswert halte:

- **Open Source** - unter MIT-Lizenz veröffentlicht, kostenlos zu implementieren, keine Lizenzgebühren
- **Von Grund auf offline** - alle Daten liegen auf dem Tag selbst, kein Cloud-Service nötig
- **Beschreibbar** - verbleibendes Filament beim Drucken aktualisieren, Tags auf neuen Spulen wiederverwenden
- **Universell** - funktioniert über Marken und Ökosysteme hinweg
- **Unterstützt FFF (Filament) und SLA (Harz)**

Über 22 Unternehmen und Gruppen haben Interesse signalisiert, darunter Prusament, Voron, Fillamentum, 3DXTech, SimplyPrint und PrintedSolid. Die vollständige Spezifikation ist verfügbar unter [specs.openprinttag.org](https://specs.openprinttag.org).

---

## Welche Daten speichert ein OpenPrintTag?

Das ist der Teil, der mich überzeugt hat. OpenPrintTag ist nicht einfach ein Label mit einem Namen darauf. Es ist ein sauber strukturiertes Datenformat mit Feldern für fast alles, was du über eine Spule wissen willst, und die Spec wurde ganz klar von Leuten geschrieben, die tatsächlich drucken.

**Materialidentifikation:**
- Materialklasse (Filament oder Harz)
- Materialtyp (PLA, PETG, ABS, TPU, ASA, PC, PA6 und 30+ weitere)
- Materialname (z.B. "PLA Galaxy Black")
- Markenname (z.B. "Prusament")
- Materialeigenschafts-Tags - über 68 definierte Eigenschaften wie abrasiv, leitfähig, nachtleuchtend, lebensmittelecht, ESD-sicher, flexibel und mehr

**Gewichts- und Längenverfolgung:**
- Nenngewicht (angegeben, z.B. 1000g)
- tatsächliches Gewicht (gemessen für diese spezifische Spule)
- Filamentlänge (nominal und tatsächlich, in mm)
- Leergewicht (damit du die Spule wiegen und das verbleibende Material berechnen kannst)
- Verbrauchtes Gewicht (beim Drucken aktualisiert - dieses Feld macht Spulen wirklich "smart")

**Farbe:**
- Primärfarbe im RGBA-Format
- Bis zu 5 Sekundärfarben (für Mehrfarben-, Galaxy- oder Gradient-Filamente)
- Transmissionsdistanz (Opazitätswert, nützlich für [HueForge](https://shop.thehueforge.com/)-Projekte)

**Metadaten:**
- Herstellungsdatum und Ablaufdatum
- Herkunftsland
- UUIDs für Marke, Material und spezifische Spuleninstanz
- Schreibschutz-Einstellungen

Die Spec deckt sogar harzspezifische Felder wie `last_stir_time` ab, das festhält, wann das Harz vor dem Drucken zuletzt umgerührt wurde. Das ist die Art von Detail, die mir zeigt, dass die Leute dahinter sich tatsächlich schon einmal an nicht umgerührtem Harz die Finger verbrannt haben.

---

## Der Tag: Nicht dein üblicher NFC-Sticker

Auf ein technisches Detail würde ich dich hinweisen, bevor du etwas kaufst: **OpenPrintTag ist für ISO 15693 (NFC-V) Tags konzipiert**, spezifisch **NXP ICODE SLIX und ICODE SLIX2** Chips. Das sind NFC-Forum-Typ-5-Tags mit einer deutlich längeren Lesereichweite als Standard-NFC-A-Tags, bis zu 1,5 Meter mit einem dedizierten Reader. Wenn du bisher nur die billigen NTAG-Sticker gekauft hast, die die meisten Projekte nutzen, ist das eine andere Tag-Familie - ich gehe auf die gesamte Landschaft in [NFC-Tag-Typen fürs iPhone](/de/blog/nfc-tag-types-for-iphones/) ein.

Warum NFC-V? Der eingebaute NFC-Reader eines Druckers muss die Spule unabhängig von ihrer Drehung erkennen. Die längere Reichweite von NFC-V macht das möglich, ohne präzise Tag-Ausrichtung zu erfordern, und das ist clever durchdacht.

**Was ist mit normalen NTAG-Stickern?** Das OpenPrintTag-Datenformat ist NDEF-basiert, sodass eine Handy-App wie NFC.cool OpenPrintTag-Daten technisch auf jedem NFC-Tag lesen und schreiben kann - einschließlich NTAG213/215/216. Ich habe es gemacht, und für das Lesen von Handy zu Handy funktioniert es einwandfrei. Allerdings **erkennen Drucker-Hardware und Apps wie Prusas nur NFC-V-Tags**. Wenn deine markierten Spulen mit den eingebauten Druckerreadern funktionieren sollen, nutze also ICODE SLIX2-Tags. Mach nicht den Fehler, den die meisten Leute vermutlich machen würden, und kauf dir dafür eine Tüte NTAG213.

Wenn du leere Tags kaufst, suche speziell nach **ICODE SLIX2** oder **ISO 15693**. Kompatible Tags findest du auf [Amazon US](https://amzn.to/3LTh1fT) oder [Amazon Europa](https://amzn.to/4oJpQr4) (Affiliate-Links).

---

## OpenPrintTag mit dem Handy lesen und schreiben

Du brauchst keinen Prusa-Drucker oder spezielle Hardware, um mit OpenPrintTag zu arbeiten, nur dein Handy. Das ist der Teil, den ich unbedingt bauen wollte, denn ein Handy in der Hosentasche ist der zugänglichste NFC-Reader, den es gibt.

NFC.cool Tools unterstützt OpenPrintTag nativ auf [iOS](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-openprinttag-read-write-nfc-spools-phone-de&mt=8) und [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-openprinttag-read-write-nfc-spools-phone-de), und ich habe dafür gesorgt, dass das Feature komplett gratis ist.

**Einen Tag lesen:**
1. Öffne NFC.cool Tools
2. Halte dein Handy in die Nähe des NFC-Tags auf der Spule
3. NFC.cool erkennt das OpenPrintTag-Format automatisch
4. Betrachte die strukturierten Daten - Material, Marke, Farbe, Gewicht, Länge, Eigenschaften

**Einen Tag schreiben:**
1. Klebe einen leeren ICODE SLIX2-Tag auf deine Spule
2. Öffne NFC.cool → NFC-Apps-Bereich → OpenPrintTag
3. Fülle die Materialdetails ein: Typ, Marke, Farbe, Gewicht, Länge
4. Tippe zum Schreiben

**Verbleibendes Material aktualisieren:**
Nach einem Druck aktualisiere das Feld für verbrauchtes Gewicht auf dem Tag. Beim nächsten Scan weißt du genau, wie viel Filament übrig ist - kein Raten, kein Wiegen. Das ist der Teil, der eine smarte Spule von einer Spielerei zu etwas macht, auf das ich mich tatsächlich verlassen würde.

Wenn du unter die Haube schauen willst, kannst du den Expertenmodus nutzen, um die rohen NDEF-Datensätze zu inspizieren - nützlich, wenn du einen Tag debuggen oder die Datenstruktur verifizieren musst. Neu beim Beschreiben von Tags allgemein? Ich gehe die Grundlagen in [Wie man NFC-Tags auf dem iPhone beschreibt](/de/blog/write-nfc-tags-iphone/) durch.

---

## Warum das Handy nutzen?

Prusa-Drucker bekommen eingebaute NFC-Reader, und Projekte wie [SpoolSense](https://github.com/SpoolSense) (ein Open-Source-ESP32-Reader) fügen dedizierte Hardware-Optionen hinzu. Warum sich also mit dem Handy abmühen? So würde ich argumentieren:

- **Funktioniert mit jedem Drucker** - Voron, Bambu Lab, Creality, Ender, was auch immer du nutzt
- **Tags für jedes Filament schreiben** - Prusament kommt vorgetaggt, aber du kannst Fillamentum, eSUN, Hatchbox oder jede Marke selbst taggen
- **Inventar fernab vom Drucker verwalten** - scanne Spulen an deinem Schreibtisch, in deinem Lager oder in einem Makerspace
- **Tags debuggen** - wenn ein Drucker einen Tag nicht lesen kann, scanne ihn mit dem Handy, um zu sehen, was wirklich drauf ist - dafür würde ich es am häufigsten nutzen
- **Keine zusätzliche Hardware** - dein Handy hat bereits einen NFC-Reader, und genau darum geht es

---

## Praktische Anwendungsfälle

**Persönliches Inventar:** Tagge jede Spule in deiner Sammlung. Wenn du einen Druck planst, scanne Spulen, um Materialtyp, verbleibende Länge und Farbe zu prüfen, ohne etwas auszupacken.

**Verbleibendes Filament tracken:** Wiege deine Spule vor und nach einem Druck, aktualisiere das verbrauchte Gewicht auf dem Tag. Keine Angst mehr vor der Frage "reicht diese Spule für einen 14-Stunden-Druck?"

**Makerspace oder Team-Nutzung:** Tagge Spulen mit Materialdetails, sodass jeder im Shop sie scannen und identifizieren kann. Kein mysteriöses Filament mehr.

**Filament-Test-Notizen:** Die perfekte Temperatur für eine spezifische Spule gefunden? Aktualisiere den Tag mit deinen Notizen für das nächste Mal.

**Mehrfarbige und Spezialmaterialien:** OpenPrintTag unterstützt bis zu 6 Farben pro Spule und 68+ Eigenschafts-Tags. Dein nachtleuchtendes, kohlefaserverstärktes PETG kann endlich richtig beschriftet werden.

---

## Das Ökosystem wächst

OpenPrintTag ist noch jung, aber die Dynamik ist echt:

- **Prusament** liefert mit OpenPrintTag-NFC-Tags auf jeder Spule
- **Prusa-Drucker** bekommen native NFC-Reader
- **Open-Source-Hardware-Reader** wie SpoolSense (ESP32-basiert) entstehen aus der Community
- **22+ Unternehmen** sind der Initiative beigetreten
- **NFC.cool** ist die einzige Allzweck-NFC-App mit voller OpenPrintTag-Unterstützung auf iOS und Android, und ich habe es hinzugefügt, weil ich es selbst nutzen wollte

Ich habe jahrelang beobachtet, wie die 3D-Druck-Industrie einen offenen Standard für smarte Spulen braucht, und ich habe ein paar proprietäre Versuche kommen und gehen sehen. OpenPrintTag ist der glaubwürdigste, den ich gesehen habe: unterstützt von einem großen Hersteller, vollständig Open Source und bereits auf echten Produkten im Einsatz. Diese Kombination ist selten genug, dass ich darauf wetten würde.

---

## Los geht's

**Was du brauchst:**
- iPhone 7 oder neuer, oder ein Android-Handy mit NFC
- NFC.cool Tools ([App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-openprinttag-read-write-nfc-spools-phone-de&mt=8) / [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-openprinttag-read-write-nfc-spools-phone-de)) - gratis, OpenPrintTag inklusive
- Leere ICODE SLIX2 / ISO 15693 NFC-Tags ([Amazon US](https://amzn.to/3LTh1fT) / [Amazon Europa](https://amzn.to/4oJpQr4) - Affiliate-Links)
- Ein paar Filament-Spulen zum Taggen

Das war's. Schon in fünf Minuten könnte deine erste Spule smart sein. Falls NFC selbst neu für dich ist, ist mein [Einsteiger-Guide zu NFC-Tags](/de/blog/nfc-tags-beginners-guide/) die Stelle, auf die ich dich zuerst verweisen würde, und die [Feature-Seite zum NFC-Reader/Writer](/de/features/nfc-reader-writer/) zeigt, was NFC.cool Tools über OpenPrintTag hinaus kann.

*OpenPrintTag ist eine Open-Source-Initiative von Prusa Research. NFC.cool ist ein unabhängiger Unterstützer des Standards. Mehr erfahren unter [openprinttag.org](https://openprinttag.org).*