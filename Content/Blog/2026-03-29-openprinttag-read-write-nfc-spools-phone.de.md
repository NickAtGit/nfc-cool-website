---
id: nfc-blog-011
title: "OpenPrintTag: Smarte 3D-Druck-Spulen mit dem Handy lesen & beschreiben"
date: 2026-03-29
tags: ["nfc-tags", "automation"]
summary: "OpenPrintTag ist der offene Standard für smarte Filament-Spulen. Wie der Standard funktioniert, welche Daten auf dem Tag landen und wie du OpenPrintTag-Tags nur mit dem Handy liest und beschreibst."
image: "/assets/images/Blog/openprinttag-read-write-nfc-spools-phone.webp"
imageAlt: "Eine 3D-Druck-Spule mit NFC-Tag wird mit dem Handy ausgelesen"
metaTitle: "OpenPrintTag: 3D-Druck-Spulen per Handy lesen & beschreiben"
metaDescription: "So verwaltest du Filament-Spulen mit OpenPrintTag und NFC: Materialdaten per iPhone oder Android lesen, schreiben und aktuell halten - ohne proprietäre App."
ogTitle: "OpenPrintTag: Smarte 3D-Druck-Spulen mit NFC"
ogDescription: "Der komplette Guide: OpenPrintTag-Spulen mit dem Handy lesen und beschreiben. Funktioniert mit jedem Drucker und jeder Filament-Marke."
---
Wenn du 3D-druckst, kennst du das vermutlich: ein Regal voller angebrochener Spulen, bei keiner weißt du, wie viel Filament noch drauf ist, und dann diese eine ohne Etikett, die PETG sein könnte oder auch PLA. Ohne Testdruck findest du es nicht heraus. Bei mir sah das Regal genauso aus, und genau für solche kleinen, ständig wiederkehrenden Ärgernisse ist NFC richtig gut.

Genau da setzt OpenPrintTag an. Das ist ein offener NFC-Standard von [Prusa Research](https://www.prusa3d.com), der aus jedem kompatiblen NFC-Tag ein smartes Etikett für die Filament-Spule macht. Materialtyp, Marke, Farbe, Restgewicht: Alles liegt direkt auf der Spule und lässt sich mit einem kurzen Scan auslesen.

Keine Cloud. Kein proprietäres Ökosystem. Kein Internet nötig. Ich baue seit Jahren an NFC.cool, einer App zum Lesen und Beschreiben von NFC-Tags, und genau solche Standards wünsche ich mir: Die Daten liegen auf dem Tag, und deshalb funktionieren sie überall. In diesem Beitrag zeige ich dir, wie OpenPrintTag aufgebaut ist und wie ich Spulen damit lese und beschreibe, mit nichts als einem Handy.

---

## Was ist OpenPrintTag?

OpenPrintTag ist ein offenes, universelles Datenformat für 3D-Druck-Materialien. Statt dass jeder Hersteller sein eigenes, zu nichts kompatibles System für smarte Spulen erfindet (dieses Durcheinander habe ich in anderen Ecken der NFC-Welt oft genug erlebt), gibt es mit OpenPrintTag einen einzigen Standard, den alle übernehmen können: Filament-Hersteller, Druckerhersteller, Slicer und Apps wie NFC.cool.

Die Grundprinzipien, die zugleich erklären, warum ich den Standard ernst nehme:

- **Open Source:** MIT-Lizenz, kostenlos umsetzbar, keine Lizenzgebühren
- **Offline von Haus aus:** alle Daten liegen auf dem Tag selbst, kein Cloud-Dienst nötig
- **Wiederbeschreibbar:** Restfilament beim Drucken nachführen, Tags auf neuen Spulen weiterverwenden
- **Universell:** funktioniert markenübergreifend und quer durch alle Ökosysteme
- **Unterstützt sowohl FFF (Filament) als auch SLA (Harz)**

Mehr als 22 Firmen und Gruppen haben Interesse angemeldet, darunter Prusament, Voron, Fillamentum, 3DXTech, SimplyPrint und PrintedSolid. Die komplette Spezifikation findest du auf [specs.openprinttag.org](https://specs.openprinttag.org).

---

## Welche Daten speichert ein OpenPrintTag?

Spätestens hier hat mich OpenPrintTag überzeugt. Das ist nicht einfach ein Etikett mit einem Namen drauf, sondern ein sauber strukturiertes Datenformat mit Feldern für so ziemlich alles, was du über eine Spule wissen willst. Und man merkt der Spec an, dass sie Leute geschrieben haben, die selbst drucken.

**Materialidentifikation:**
- Materialklasse (Filament oder Harz)
- Materialtyp (PLA, PETG, ABS, TPU, ASA, PC, PA6 und mehr als 30 weitere)
- Materialname (z.B. „PLA Galaxy Black“)
- Markenname (z.B. „Prusament“)
- Eigenschafts-Tags: mehr als 68 definierte Eigenschaften wie abrasiv, leitfähig, nachtleuchtend, lebensmittelecht, ESD-sicher, flexibel und so weiter

**Gewicht und Länge:**
- Nenngewicht (laut Hersteller, z.B. 1000 g)
- Tatsächliches Gewicht (für genau diese Spule gemessen)
- Filamentlänge (nominal und tatsächlich, in mm)
- Leergewicht der Spule (damit du die Spule wiegen und daraus die Restmenge ausrechnen kannst)
- Verbrauchtes Gewicht (wird beim Drucken aktualisiert; dieses Feld macht aus der Spule erst eine wirklich „smarte“ Spule)

**Farbe:**
- Primärfarbe als RGBA-Wert
- Bis zu 5 Sekundärfarben (für Mehrfarb-, Galaxy- oder Gradient-Filamente)
- Transmissionsdistanz (ein Wert für die Deckkraft, praktisch für [HueForge](https://shop.thehueforge.com/)-Projekte)

**Metadaten:**
- Herstellungs- und Ablaufdatum
- Herkunftsland
- UUIDs für Marke, Material und die konkrete Spule
- Schreibschutz-Einstellungen

Selbst harzspezifische Felder wie `last_stir_time` sind in der Spec drin: Da steht, wann das Harz vor dem Druck zuletzt umgerührt wurde. An solchen Details merke ich, dass die Leute dahinter mit nicht umgerührtem Harz selbst schon Lehrgeld gezahlt haben.

---

## Der Tag: kein gewöhnlicher NFC-Sticker

Ein technisches Detail, das du kennen solltest, bevor du etwas bestellst: **OpenPrintTag ist für ISO-15693-Tags (NFC-V) ausgelegt**, konkret für die Chips **NXP ICODE SLIX und ICODE SLIX2**. Das sind Tags vom NFC-Forum-Typ 5, und ihre Lesereichweite ist deutlich größer als bei den üblichen NFC-A-Tags: mit einem eigenen Reader bis zu 1,5 Meter. Wenn du bisher nur die günstigen NTAG-Sticker gekauft hast, die in den meisten Projekten stecken, ist das eine andere Tag-Familie. Den ganzen Überblick gebe ich in [NFC-Tag-Typen fürs iPhone](/de/blog/nfc-tag-types-for-iphones/).

Warum ausgerechnet NFC-V? Der im Drucker eingebaute Reader muss die Spule erkennen, egal wie sie gerade gedreht ist. Mit der größeren Reichweite von NFC-V klappt das, ohne dass der Tag exakt ausgerichtet sein muss. Das ist gut durchdacht.

**Und was ist mit normalen NTAG-Stickern?** Das OpenPrintTag-Format basiert auf NDEF, technisch kann eine Handy-App wie NFC.cool die Daten also auf jeden NFC-Tag schreiben und von jedem lesen, auch von NTAG213/215/216. Ich habe das ausprobiert, und solange nur Handys im Spiel sind, funktioniert es tadellos. Aber: **Drucker-Hardware und Apps wie die von Prusa erkennen ausschließlich NFC-V-Tags.** Sollen deine Spulen also auch vom NFC-Reader im Drucker gelesen werden, nimm ICODE SLIX2. Und kauf dir bitte nicht, wie es vermutlich die meisten machen würden, eine Tüte NTAG213 dafür.

Wenn du leere Tags kaufst, achte gezielt auf **ICODE SLIX2** oder **ISO 15693**. Passende Tags gibt es bei [Amazon US](https://amzn.to/3LTh1fT) oder [Amazon Europa](https://amzn.to/4oJpQr4) (Affiliate-Links).

---

## OpenPrintTag-Tags mit dem Handy lesen und beschreiben

Für OpenPrintTag brauchst du weder einen Prusa-Drucker noch irgendwelche Spezial-Hardware, dein Handy reicht. Genau das wollte ich unbedingt bauen, denn das Handy in der Hosentasche ist der NFC-Reader, den sowieso jeder dabeihat.

NFC.cool Tools unterstützt OpenPrintTag nativ, auf [iOS](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-openprinttag-read-write-nfc-spools-phone-de&mt=8) genauso wie auf [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-openprinttag-read-write-nfc-spools-phone-de), und ich habe bewusst dafür gesorgt, dass das Feature komplett kostenlos ist.

**Einen Tag auslesen:**
1. Öffne NFC.cool Tools
2. Halte dein Handy an den NFC-Tag auf der Spule
3. NFC.cool erkennt das OpenPrintTag-Format automatisch
4. Du siehst die Daten strukturiert aufbereitet: Material, Marke, Farbe, Gewicht, Länge, Eigenschaften

**Einen Tag beschreiben:**
1. Klebe einen leeren ICODE-SLIX2-Tag auf die Spule
2. Öffne NFC.cool → Bereich NFC-Apps → OpenPrintTag
3. Trag die Materialdaten ein: Typ, Marke, Farbe, Gewicht, Länge
4. Tippe auf Schreiben

**Restmenge aktualisieren:**
Nach dem Druck trägst du das verbrauchte Gewicht auf dem Tag nach. Beim nächsten Scan weißt du dann genau, wie viel Filament noch drauf ist, ohne zu raten und ohne zu wiegen. Erst damit wird aus der smarten Spule mehr als eine Spielerei, nämlich etwas, worauf ich mich wirklich verlassen würde.

Wer unter die Haube schauen will, sieht sich im Expertenmodus die rohen NDEF-Datensätze an. Das hilft, wenn du einen Tag debuggen oder prüfen willst, ob die Datenstruktur stimmt. Und falls du zum allerersten Mal einen Tag beschreibst: Die Grundlagen erkläre ich in [So beschreibst du NFC-Tags mit dem iPhone](/de/blog/write-nfc-tags-iphone/).

---

## Warum überhaupt das Handy?

Prusa-Drucker bekommen NFC-Reader eingebaut, und Projekte wie [SpoolSense](https://github.com/SpoolSense) (ein Open-Source-Reader auf ESP32-Basis) liefern eigene Hardware dazu. Wozu dann noch das Handy? Meine Argumente:

- **Funktioniert mit jedem Drucker:** Voron, Bambu Lab, Creality, Ender, ganz egal, was bei dir steht
- **Tags für jedes Filament:** Prusament kommt schon mit Tag, aber Fillamentum, eSUN, Hatchbox oder jede andere Marke taggst du einfach selbst
- **Inventar auch ohne Drucker in der Nähe:** Spulen am Schreibtisch scannen, im Lager oder im Makerspace
- **Tags debuggen:** Wenn der Drucker einen Tag nicht lesen will, scannst du ihn mit dem Handy und siehst, was wirklich draufsteht. Dafür greife ich selbst am häufigsten zum Handy.
- **Keine zusätzliche Hardware:** Dein Handy hat den NFC-Reader schon drin, und genau darum geht es ja

---

## Was du damit im Alltag anfangen kannst

**Eigenes Inventar:** Tagge jede Spule in deiner Sammlung. Wenn du einen Druck planst, scannst du die Spulen und siehst Materialtyp, Restlänge und Farbe, ohne irgendetwas auspacken zu müssen.

**Restfilament im Blick behalten:** Wiege die Spule vor und nach dem Druck und trag das verbrauchte Gewicht auf dem Tag nach. Die bange Frage „Reicht die Spule noch für einen 14-Stunden-Druck?“ stellt sich dann gar nicht mehr.

**Makerspace oder Team:** Tagge die Spulen mit den Materialdaten, dann kann jeder in der Werkstatt sie scannen und weiß, was er in der Hand hat. Schluss mit dem Rätselraten, welches Filament das nochmal war.

**Notizen aus dem Filament-Test:** Die perfekte Temperatur für eine bestimmte Spule gefunden? Schreib sie als Notiz auf den Tag, dann hast du sie beim nächsten Mal gleich parat.

**Mehrfarbige und Spezialmaterialien:** OpenPrintTag unterstützt bis zu 6 Farben pro Spule und mehr als 68 Eigenschafts-Tags. Dein nachtleuchtendes, kohlefaserverstärktes PETG bekommt endlich ein richtiges Etikett, Abrasiv-Kennzeichnung inklusive.

---

## Das Ökosystem wächst

OpenPrintTag ist noch jung, aber es tut sich spürbar etwas:

- **Prusament** wird auf jeder Spule mit OpenPrintTag-NFC-Tag ausgeliefert
- **Prusa-Drucker** bekommen native NFC-Reader
- **Open-Source-Reader** wie SpoolSense (auf ESP32-Basis) entstehen in der Community
- **Mehr als 22 Firmen** sind der Initiative beigetreten
- **NFC.cool** ist die einzige Allzweck-NFC-App mit voller OpenPrintTag-Unterstützung auf iOS und Android, und eingebaut habe ich es, weil ich es selbst nutzen wollte

Dass die 3D-Druck-Branche einen offenen Standard für smarte Spulen bräuchte, sehe ich seit Jahren, und in der Zeit habe ich ein paar proprietäre Anläufe kommen und wieder verschwinden sehen. OpenPrintTag ist der glaubwürdigste Versuch bisher: ein großer Hersteller dahinter, komplett Open Source und schon auf echten Produkten im Einsatz. Diese Kombination ist selten genug, dass ich darauf setzen würde.

---

## So legst du los

**Was du brauchst:**
- iPhone 7 oder neuer bzw. ein Android-Handy mit NFC
- NFC.cool Tools ([App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-openprinttag-read-write-nfc-spools-phone-de&mt=8) / [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-openprinttag-read-write-nfc-spools-phone-de)), kostenlos, OpenPrintTag inklusive
- Leere ICODE-SLIX2- bzw. ISO-15693-NFC-Tags ([Amazon US](https://amzn.to/3LTh1fT) / [Amazon Europa](https://amzn.to/4oJpQr4), Affiliate-Links)
- Ein paar Filament-Spulen zum Taggen

Mehr ist es nicht. In fünf Minuten kann deine erste Spule smart sein. Falls NFC an sich Neuland für dich ist, fang am besten mit meinem [Einsteiger-Guide zu NFC-Tags](/de/blog/nfc-tags-beginners-guide/) an, und was NFC.cool Tools über OpenPrintTag hinaus kann, steht auf der [Feature-Seite zum NFC-Reader/Writer](/de/features/nfc-reader-writer/).

*OpenPrintTag ist eine Open-Source-Initiative von Prusa Research. NFC.cool ist ein unabhängiger Unterstützer des Standards. Mehr dazu auf [openprinttag.org](https://openprinttag.org).*
