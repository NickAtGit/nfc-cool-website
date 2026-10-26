---
id: "ultimate-nfc-tag-guide-2026-09"
title: "Der große NFC-Tag-Guide: jeder Chip, wofür er gedacht ist und was ihn liest"
date: "2026-10-26"
tags: ["nfc-tags", "guides"]
summary: "Jeder NFC-Chip, den du kaufen kannst, vom NTAG210 mit 48 Byte bis zum DESFire EV3, mit den echten Zahlen: Speicher, Schutz, Haltbarkeit, was iPhone und Android-Handy damit anfangen können und für welche Aufgabe er wirklich gebaut ist."
image: "/assets/images/Blog/ultimate-nfc-tag-guide.webp"
imageAlt: "Ein iPhone mit leuchtendem NFC-Symbol hinter einer Reihe aus NFC-Tag-Bauformen: Sticker, Münze, PVC-Karte, Schlüsselanhänger, Armband und ein transparentes Inlay"
author: "Nicolo Stanciu"
metaTitle: "Der große NFC-Tag-Guide: jeder Chip erklärt"
metaDescription: "Alle NFC-Chips an einem Ort: NTAG, MIFARE, DESFire, ICODE, ST25, FeliCa, Topaz und die Klone. Speicher, Sicherheit, Haltbarkeit, was sie liest und welcher Tag zu welcher Aufgabe passt."
ogTitle: "Jeder NFC-Chip in einem Guide"
ogDescription: "Speicher, Sicherheit, Haltbarkeit, Handy-Support und die ehrliche Einsatzempfehlung für jeden NFC-Chip, den du kaufen kannst. Datentabellen, eine Entscheidungshilfe und ein kompletter Katalog."
---

Du klickst auf ein Angebot für ein Pack NFC-Tags. Da steht „NFC 213“ oder „NTAG215-kompatibel“ oder einfach nur „1K NFC-Karte, funktioniert mit allen Handys“. Du willst nur eins wissen: Taugt das für das, was ich vorhabe? Und genau das verrät dir das Angebot nicht, weil es derjenige, der es geschrieben hat, selbst nicht weiß.

Ich baue seit Jahren an [NFC.cool Tools](/features/nfc-reader-writer/), einer App, die bei jedem Scan als Erstes genau diese Frage beantwortet: Was ist das für ein Chip, und was kann er? Allein der Code zur Chiperkennung kennt rund sechzig Produkte von sieben Herstellern, und jedes davon ist auf dieser Liste gelandet, weil jemand es ans Handy gehalten hat und irgendetwas sich nicht so verhalten hat, wie das Angebot versprochen hatte. Dieser Guide ist das Nachschlagewerk, das ich mir gewünscht hätte, als ich diesen Code geschrieben habe. Er ist mit Absicht lang. Wenn dir die kurze Fassung reicht, fang mit dem [Einsteiger-Guide zu NFC-Tags](/blog/nfc-tags-beginners-guide/) an, der für die Details wieder hierher verlinkt.

Das Fazit in einem Satz, damit du es schon vor den Tabellen hast: **Den besten NFC-Tag gibt es nicht, nur den richtigen Chip für die Aufgabe**, und die Aufgabe hängt von drei Dingen ab: wie viel du speichern musst, wen du draußen halten willst und was ihn lesen können muss.

---

## So nutzt du diesen Guide

Jede Zahl in diesem Guide stammt aus einem Datenblatt des Herstellers, aus einer Plattformdokumentation von Apple oder Google oder aus dem Code meiner eigenen App, und die [Quellen](#quellen-und-links-zum-weiterlesen) stehen am Ende. Wo ich einen Chip selbst auf dem Schreibtisch hatte, steht das in einer Praxis-Notiz. Wo nicht, sage ich das auch: Die exotischen Teile kenne ich nur aus Datenblättern, und ein Datenblatt ist ein Versprechen, keine Messung.

Zwei Dinge findest du hier nicht: eine Schritt-für-Schritt-Anleitung für deinen ersten beschriebenen Tag (dafür gibt es den [Guide zum Beschreiben](/blog/write-nfc-tags-iphone/)) und die ganze Geschichte zum NTAG 424 DNA, die [einen eigenen Beitrag](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/) hat.

- [Woraus ein NFC-Tag besteht](#woraus-ein-nfc-tag-besteht)
- [Begriffswirrwarr: Standards, Forum-Typen und was kein NFC ist](#begriffswirrwarr-standards-forum-typen-und-was-kein-nfc-ist)
- [So liest du ein Datenblatt oder ein Angebot](#so-liest-du-ein-datenblatt-oder-ein-angebot)
- [NDEF und was wirklich auf einen Tag passt](#ndef-und-was-wirklich-auf-einen-tag-passt)
- [Speicheraufbau: was wo auf dem Chip liegt](#speicheraufbau-was-wo-auf-dem-chip-liegt)
- [Die Entscheidungstabelle](#die-entscheidungstabelle)
- [Die Chipfamilien im Detail](#die-chipfamilien-im-detail)
- [Bauformen und Lesereichweite](#bauformen-und-lesereichweite)
- [Was womit lesbar ist](#was-womit-lesbar-ist)
- [Was NFC.cool Tools mit jedem Chip macht](#was-nfccool-tools-mit-jedem-chip-macht)
- [Kaufen, ohne reinzufallen](#kaufen-ohne-reinzufallen)
- [Der komplette Katalog in einer Tabelle](#der-komplette-katalog-in-einer-tabelle)
- [Die Vergleiche, nach denen alle suchen](#die-vergleiche-nach-denen-alle-suchen)
- [Fragen und Antworten](#fragen-und-antworten)
- [Glossar](#glossar)
- [Quellen und Links zum Weiterlesen](#quellen-und-links-zum-weiterlesen)

---

## Woraus ein NFC-Tag besteht

Ein NFC-Tag besteht aus drei Teilen, die zusammengeklebt sind: einem **Chip** so groß wie ein Sandkorn, einer **Antenne** aus ein paar Windungen geätztem Aluminium oder Kupfer und einem **Träger**, der beides hält. Das kann ein Papiersticker sein, ein PET-Inlay, eine PVC-Karte oder eine Glaskapsel. Der Chip hat keine Batterie. Den Strom liefert das Handy.

Das funktioniert über induktive Kopplung. Die Antenne des Handys ist eine Spule, die ein Magnetfeld erzeugt, das 13,56 Millionen Mal pro Sekunde die Richtung wechselt. Bringst du eine zweite Spule in dieses Feld, wird darin ein Strom induziert, nach demselben Prinzip wie bei einem kabellosen Ladegerät, nur mit einem winzigen Bruchteil der Leistung. Von diesem induzierten Strom lebt der Chip. Um Daten zurückzuschicken, sendet er nichts Eigenes. Er schaltet eine Last an seiner Antenne ein und aus, und die Spule im Handy spürt das als winzige Änderung in ihrem eigenen Feld. Dieser Trick heißt **Lastmodulation**, und deshalb macht das Handy die ganze Arbeit, während der Tag acht Cent kosten kann.

Das erklärt auch die Reichweite. Das Feld einer kleinen Spule fällt mit der dritten Potenz der Entfernung ab, ein Tag, der auf einen Zentimeter einwandfrei funktioniert, bekommt auf zehn Zentimeter also nichts mehr ab. Ich stelle mir das wie eine Kerze vor: Aus der Nähe kannst du bei ihrem Licht lesen, vom anderen Ende des Zimmers hilft auch kein Zusammenkneifen der Augen. Die NFC-Forum-Definition spricht von „einer typischen Reichweite von bis zu 2 cm“, die Android-Dokumentation von „4 cm oder weniger“ und NXPs Datenblätter von „bis zu 100 mm, abhängig von Feldstärke und Antennengeometrie“. Alle drei stimmen. Die Handy-Angabe ist das, was du in der Praxis erlebst, die 100 mm schafft der Chip mit einem großen Lesegerät und einer großen Antenne.

Die Datenraten sind bescheiden, weil mehr gar nicht nötig ist. Ein Tag vom Typ A oder Typ B spricht mit 106 kbit/s, die schnelleren Chips handeln nach dem ersten Handshake 212, 424 oder 848 kbit/s aus. FeliCa läuft mit 212 oder 424. ISO 15693, die Familie mit der großen Reichweite, ist im normalen Modus mit 26,48 kbit/s noch langsamer, weil sie dafür gedacht ist, von einem Lagertor aus einem Meter Entfernung gelesen zu werden statt von einem Handy. Die kompletten 888 Byte eines NTAG216 auszulesen dauert so oder so nur einen Sekundenbruchteil.

| Standard | Grundrate | Schnellere Modi | Rückkanal |
| --- | --- | --- | --- |
| ISO/IEC 14443 Typ A und B | 106 kbit/s | 212, 424, 848 kbit/s bei Chips, die sie aushandeln (DESFire, Plus, NTAG 424 DNA) | Lastmodulation auf einem Hilfsträger mit 847,5 kHz |
| FeliCa (JIS X 6319-4, ISO/IEC 18092) | 212 kbit/s | 424 kbit/s | Lastmodulation |
| ISO/IEC 15693 | 26,48 kbit/s (6,62 kbit/s mit niedriger Rate) | NXP Fast Mode 53 kbit/s; ICODE 3 bis 212 kbit/s | Lastmodulation auf einem Hilfsträger mit 423,75 kHz |

---

## Begriffswirrwarr: Standards, Forum-Typen und was kein NFC ist

Jedes Angebot wirft drei Namenssysteme durcheinander: die ISO-Standards, die den Funk festlegen, die Tag-Typen des NFC Forum, die regeln, wie die Daten abgelegt werden, und die Produktnamen der Hersteller. Hier ist die Landkarte.

### Die Standards

| Standard | Was er festlegt | Name beim NFC Forum | Beispielchips |
| --- | --- | --- | --- |
| ISO/IEC 14443 Typ A (Teile 1 bis 3) | Proximity-Karten, 106 kbit/s, Typ-A-Modulation, Antikollision, die UID | NFC-A | NTAG, MIFARE Ultralight, MIFARE Classic, Topaz |
| ISO/IEC 14443 Typ B | dasselbe, mit anderer Modulation und ohne UID im gleichen Sinn | NFC-B | ST SRI512, Calypso-Fahrkarten, viele E-Pässe |
| ISO/IEC 14443-4 | das Transportprotokoll auf Basis von A oder B, ISO-DEP genannt | ISO-DEP | DESFire, NTAG 424 DNA, MIFARE Plus in SL3, Bankkarten, Reisepässe |
| ISO/IEC 7816-4 | die Befehlssprache (APDUs) und das Dateisystem, die über ISO-DEP laufen | | alles aus der Zeile darüber |
| ISO/IEC 7816-6 | unter anderem das Register der Herstellercodes für Chips | | das erste Byte der UID |
| ISO/IEC 15693 | Vicinity-Karten, bis zu einem Meter mit dem passenden Lesegerät, 8-Byte-UID | NFC-V | ICODE, ST25TV, ST25DV, TI Tag-it, NTAG 5 |
| JIS X 6319-4 | FeliCa von Sony | NFC-F | FeliCa Lite-S, Suica, Octopus |
| ISO/IEC 18092 | NFC selbst (NFCIP-1): Peer-to-Peer und die passiven Modi, die Handys nutzen | | dein Handy |

### Die Tag-Typen des NFC Forum

Das NFC Forum hat keine Chips entwickelt. Es hat fünf Rezepte geschrieben, wie man eine **NDEF**-Nachricht (das Containerformat, das jedes Handy versteht) auf Chips ablegt, die es schon gab. Genau das bedeutet „Type 2 Tag“: kein Chip, sondern ein Speicherlayout.

| Forum-Typ | Funk | Speichermodell | Typische Chips | Handy-Support |
| --- | --- | --- | --- | --- |
| Type 1 | NFC-A | 8-Byte-Blöcke, einmalig sperrbar | Innovision/Broadcom Topaz | lesbar auf beiden Plattformen; das NFC Forum hat Type 1 mit dem Spezifikations-Release von 2021 gestrichen |
| Type 2 | NFC-A | 4-Byte-Pages, ein Capability Container auf Page 3, TLV-Blöcke | NTAG21x, MIFARE Ultralight, ST25TN, Fudan FM11NT0x1, Infineon my-d move | iPhone und Android, inklusive Hintergrund-Lesen auf dem iPhone |
| Type 3 | NFC-F | 16-Byte-Blöcke, Service-Codes | FeliCa Lite-S, FeliCa Standard | iPhone und Android (NFC-F-Support ist bei Android Pflicht) |
| Type 4 | ISO-DEP über NFC-A oder NFC-B | per APDU ausgewählte Dateien: eine CC-Datei und eine NDEF-Datei | NTAG 424 DNA, DESFire, ST25TA | iPhone und Android |
| Type 5 | NFC-V | 4-Byte-Blöcke, CC in Block 0 | ICODE SLIX und SLIX2, ST25TV, ST25DV, NTAG 5 | iPhone seit iOS 13, Android über NfcV; 2015 ins Forum aufgenommen |

Zwei Dinge fehlen auf dieser Liste mit Absicht. **MIFARE Classic** ist überhaupt kein Forum-Tag-Typ; NDEF auf Classic ist ein Mapping von NXP, das Android auf manchen Handys unterstützt und iOS auf keinem einzigen. Und die Forum-Rezepte sagen nichts über Sicherheit. Ein Type-2-Tag kann ein schlichter NTAG213 sein oder ein NTAG 224 DNA mit AES-128-Authentifizierung, ein Type-4-Tag ein nackter ST25TA02K oder eine Bankkarte. Der Typ verrät dir, wie die NDEF-Nachricht gespeichert ist, nicht, wer an sie herankommt.

### Was kein NFC-Tag ist

Die Hälfte der „Warum liest mein Handy das nicht“-Nachrichten, die ich bekomme, dreht sich um Dinge, die nie NFC waren. Die NFC-Spule eines Handys ist auf 13,56 MHz abgestimmt und spricht die Protokolle von oben. Alles andere ist für sie unsichtbar, ganz egal, wie sehr es nach Tag aussieht.

| Sieht aus wie ein Tag, aber | Frequenz | Was es wirklich ist | Kann ein Handy es lesen |
| --- | --- | --- | --- |
| ein Büro- oder Parkhausausweis ohne sichtbaren Chip | 125 kHz | Niederfrequenz-RFID: EM4100 mit fester ID, HID Prox, wiederbeschreibbare T5577 | nein, und daran kann auch keine App etwas ändern |
| ein Mikrochip im Haustier | 134,2 kHz | Transponder nach ISO 11784/11785 FDX-B | nein |
| ein Diebstahlschutz- oder Logistiketikett im Handel | 860 bis 960 MHz | UHF-RAIN-RFID, EPC Gen2 | nein |
| eine Hotelkarte oder eine alte Fahrkarte | 13,56 MHz | MIFARE Classic oder eine proprietäre HF-Karte | Android manchmal, das iPhone zeigt nur die UID |
| eine Bankkarte | 13,56 MHz | eine EMV-Chipkarte, die ISO-DEP spricht | technisch ja; eine App kann die Anwendungsliste und die öffentlichen Daten der Karte lesen, aber Apples Core NFC sperrt das Auslesen von Zahlungskarten, und kein Handy kann eine funktionierende Kopie erzeugen |
| ein Reisepass | 13,56 MHz | ein elektronisches Dokument nach ICAO 9303 | ja, mit der maschinenlesbaren Zone als Schlüssel; [das habe ich gebaut](/blog/read-passport-nfc-chip/) |
| ein Sicherheitsschlüssel | 13,56 MHz | ein FIDO2-Authenticator über ISO 7816 | ja für den Browser, aber nicht als Tag |

Der 125-kHz-Ausweis ist der, der wehtut. Er passt zum Lesegerät an der Tür, er ist eine Plastikkarte mit einer Spule drin, und er wird nie mit einem Handy reden. Ich habe aufgeschrieben, [warum ein iPhone deine Haustür nicht öffnen kann](/blog/iphone-rfid-condo-doors/), weil die ehrliche Antwort an der Hardware liegt.

---

## So liest du ein Datenblatt oder ein Angebot

Auf der ersten Seite eines Datenblatts stehen alle Zahlen, die du brauchst, und ein gutes Angebot übernimmt sie. Hier steht, was jede einzelne bedeutet und welche davon in die Irre führen.

### Nutzbarer Speicher und Gesamtspeicher

Jeder Chip hat mehr EEPROM, als du nutzen kannst. Ein NTAG213 hat insgesamt 180 Byte, und 144 davon gehören dir; die übrigen 36 enthalten die UID, die Lock-Bits, den Capability Container und die Konfigurations-Pages. Eine MIFARE Classic 1K hat 1024 Byte, davon sind 752 Daten, weil jeder Sektor einen Block an seine Schlüssel abgibt. Angebote nennen immer die größere Zahl. Entscheidend ist der **nutzbare Speicher**, und selbst der entspricht nicht dem, was in eine NDEF-Nachricht passt. Darum geht es im nächsten Abschnitt.

### Die UID

Die eindeutige Kennung wird im Werk eingebrannt und lässt sich nicht ändern, außer bei Klonen, die genau dafür gebaut sind. Es gibt drei Längen:

| UID-Länge | Wo | Hinweise |
| --- | --- | --- |
| 4 Byte | alte MIFARE Classic, heute billige Classic-Karten | NXP nennt sie „non-unique identifiers“ (NUID), weil 4 Byte nicht mehr ausgereicht haben. In einer 4-Byte-UID steckt kein Herstellercode. Ein erstes Byte 08 heißt, dass der Chip bei jedem Scan eine zufällige ID erzeugt |
| 7 Byte | NTAG, Ultralight, DESFire, NTAG 424 DNA, Classic EV1 (optional), die 8 Byte lange IDm von FeliCa ist ein naher Verwandter | das erste Byte ist der Herstellercode |
| 8 Byte | jeder ISO-15693-Chip | das erste Byte ist immer E0, das zweite der Herstellercode |

Der Herstellercode stammt aus dem Register nach ISO/IEC 7816-6 und ist der schnellste ehrliche Check für ein Angebot. Meldet ein Tag, der als „echtes NXP“ verkauft wird, 1D, dann kommt er von Fudan.

| Code | Hersteller |
| --- | --- |
| 01 | Motorola |
| 02 | STMicroelectronics |
| 03 | Hitachi |
| 04 | NXP Semiconductors |
| 05 | Infineon |
| 07 | Texas Instruments |
| 08 | Fujitsu |
| 16 | EM Microelectronic |
| 1A | Sony |
| 1D | Shanghai Fudan Microelectronics |
| 25 | Innovision (Topaz) |
| 2C | Impinj |
| 2E | Broadcom |

### ATQA, SAK und GET_VERSION: wie ein Lesegerät Chips unterscheidet

Wenn ein Typ-A-Chip einem Handy antwortet, schickt er zwei kleine Werte, den **ATQA** und den **SAK**. Lesegeräte, meine App eingeschlossen, sortieren Chips anhand des SAK in Familien, weil die SAK-Bits verraten, ob der Chip ISO-DEP spricht und zu welcher groben Familie er gehört. NXPs eigene Application Note zur Identifizierung sagt fett gedruckt, dass man den ATQA für nichts verwenden soll, weil er mehrdeutig ist und in die Irre führt, und das kann ich bestätigen.

| SAK | Familie | Üblicher ATQA |
| --- | --- | --- |
| 00 | NTAG und MIFARE Ultralight, alle | 00 44 |
| 08 | MIFARE Classic 1K, MIFARE Plus 2K oder SE in Security Level 1 | 00 04 (4-Byte-UID), 00 44 (7 Byte) |
| 09 | MIFARE Classic Mini | |
| 18 | MIFARE Classic 4K, MIFARE Plus 4K in Level 1 | 00 02 oder 00 42 |
| 10, 11 | MIFARE Plus X in Level 2 | |
| 20 | alles, was ISO-DEP spricht: DESFire, NTAG 424 DNA, Plus in Level 3, Bankkarten, JCOP | 03 44 (DESFire, 424), 03 04 mit zufälliger ID |

Weil jeder NTAG und jeder Ultralight mit SAK 00 antwortet, braucht es einen weiteren Befehl, um einen NTAG213 von einem NTAG216 oder einem Ultralight EV1 zu unterscheiden: **GET_VERSION**. Er liefert acht Byte zurück, und drei davon erledigen die Arbeit. Byte 2 ist der Produkttyp (03 Ultralight, 04 NTAG, 07 NTAG I2C, 01 DESFire, 02 Plus, 08 DESFire Light), Byte 4 die Generation, und Byte 6 kodiert die Speichergröße. So weiß NFC.cool, was es vor sich hat, und genau das fragt auch eine Konsole, die Amiibo liest, als Erstes von einem Tag ab.

| Chip | Antwort auf GET_VERSION |
| --- | --- |
| NTAG213 | 00 04 04 02 01 00 0F 03 |
| NTAG215 | 00 04 04 02 01 00 11 03 |
| NTAG216 | 00 04 04 02 01 00 13 03 |
| NTAG210 | 00 04 04 01 01 00 0B 03 |
| NTAG212 | 00 04 04 01 01 00 0E 03 |
| Ultralight EV1 48 B | 00 04 03 01 01 00 0B 03 |
| Ultralight EV1 128 B | 00 04 03 01 01 00 0E 03 |
| Ultralight AES | 00 04 03 0x 04 00 0F 03 |
| NTAG 223 DNA | 00 04 04 02 04 00 0F 03 |
| NTAG 424 DNA (in eine APDU verpackt) | Hersteller 04, Typ 04, Major 30, Speicher 11 |

Es gibt Chips ohne GET_VERSION: Der ursprüngliche Ultralight, der Ultralight C und der alte NTAG203 hatten den Befehl nie, und den meisten Klonen fehlt er auch. Schon dieses Fehlen ist ein Fingerabdruck.

### Haltbarkeit, Datenerhalt, Temperatur

Diese drei Zahlen nennen Angebote fast nie, Datenblätter dagegen immer.

- **Schreibzyklen** geben an, wie oft sich ein Byte neu beschreiben lässt. 100.000 Zyklen sind bei allem Aktuellen das Minimum; die Chips aus der Classic-Ära und der ursprüngliche Ultralight sind auf 10.000 ausgelegt. DESFire EV3 und die ST25DV-Familie kommen typischerweise auf 1.000.000.
- **Datenerhalt** heißt, wie lange die Bytes ohne Strom überdauern. 10 Jahre sind der alte Standard, 50 Jahre gibt NXP für den NTAG 424 DNA und die ICODE-SLIX-Familie an, und ST nennt für die Type-4-Chips ST25TA 200 Jahre. Der Datenerhalt ist für Raumtemperatur angegeben; Hitze verkürzt ihn.
- **Betriebstemperatur** liegt bei den meisten NXP-Chips für Endkunden bei -25 bis +70 °C, bei den Teilen von ST und EM bei -40 bis +85 °C und beim ICODE 3 bei bis zu 105 °C. Der Chip ist selten die Grenze, sondern der Kleber und der Träger.

### Die Sicherheitsleiter

Das ist der Teil eines Angebots, der am häufigsten lügt. „Verschlüsselt“, „sicher“ und „kopiergeschützt“ steht auf Tags, deren einziger Schutz ein 32-Bit-Passwort ist, das im Klartext übertragen wird. Hier ist die Leiter, von unten nach oben, und jeder Chip in diesem Guide steht auf einer ihrer Sprossen.

| Sprosse | Was es ist | Chips | Was es verhindert |
| --- | --- | --- | --- |
| 0. Nichts | jeder kann lesen und schreiben | ursprünglicher Ultralight, NTAG203, TI Tag-it Standard, Topaz | nichts |
| 1. Lock-Bits | Einweg-Bits, die Pages für immer schreibgeschützt machen | jeder Type-2- und Type-5-Chip | Überschreiben; verhindert kein Kopieren |
| 2. Passwort | ein 32-Bit-Passwort plus eine 16-Bit-Bestätigung (PACK), optional mit Limit für Fehlversuche; beim NTAG21x geht das Passwort unverschlüsselt über die Luft | NTAG21x, Ultralight EV1, NTAG 223 DNA, ICODE-SLIX-Familie (32 Bit), ST25TV (32 oder 64 Bit), ST25TA (128 Bit) | dass ein Fremder mit einer App mal eben etwas überschreibt; aber keinen entschlossenen Angreifer mit einem Sniffer |
| 3. CRYPTO1 | NXPs 48-Bit-Stromchiffre aus den 1990ern | MIFARE Classic, MIFARE Plus in Level 1 | seit 2008 nichts mehr; behandle es wie Sprosse 0 |
| 4. Triple DES | gegenseitige Authentifizierung mit einem 16-Byte-Schlüssel | Ultralight C, FeliCa Lite-S, DESFire D40 und EV1 | das Kopieren der Inhalte ohne Schlüssel |
| 5. AES-128 | gegenseitige Authentifizierung, Secure Messaging | Ultralight AES, NTAG 224 DNA, DESFire EV1 bis EV3, DESFire Light, Plus in Level 3, ICODE DNA, FeliCa Standard, EM4425 | dasselbe, mit einer Chiffre, der man noch vertraut |
| 6. AES plus SUN | jeder Scan erzeugt einen frischen kryptografischen Nachweis direkt in der URL | NTAG 424 DNA, NTAG 22x DNA, DESFire EV3 | Klonen, weil eine Kopie den nächsten Scan nicht signieren kann |
| 7. Manipulationsschleife | ein Draht, der dauerhaft meldet, ob er jemals durchtrennt wurde | NTAG 213 TT, NTAG 424 DNA TT, NTAG 22x DNA StatusDetect, ICODE 3 TT, ST25TV02KC-T | das Wiederverwenden eines Siegels |

Zwei Funktionen stehen neben der Leiter statt auf ihr. Eine **Originalitätssignatur** ist eine digitale Signatur über die UID, die der Hersteller hineinschreibt und mit der ein Lesegerät prüfen kann, ob der Chip von NXP oder ST stammt. Kopieren verhindert sie nicht, weil ein Klon eine kopierte Signatur mitbringen kann, und das sagt NXP in seiner eigenen Application Note auch so. Und **Zähler** (ein 24-Bit-Lesezähler beim NTAG213/215/216, drei Einwegzähler beim Ultralight EV1, ein 16-Bit-Schreibzähler beim SLIX2) sind für Anwendungsfälle gedacht, nicht für Sicherheit, es sei denn, sie fließen in eine SUN-Nachricht ein.

---

## NDEF und was wirklich auf einen Tag passt

**NDEF** (NFC Data Exchange Format) ist der Briefumschlag. Ein Handy liest nicht „eine URL“ von einem Tag, sondern eine NDEF-Nachricht mit einem URI-Datensatz darin, und der Umschlag hat Gewicht. Wer dieses Gewicht kennt, kann die Frage beantworten, ob der eigene Link auf einen NTAG213 passt.

### Der Datensatz

Jeder Datensatz beginnt mit einem Flag-Byte (Message Begin, Message End, Short Record und ein drei Bit langes Type Name Format), dann folgen die Länge des Typs, die Länge der Nutzdaten (ein Byte, wenn die Nutzdaten unter 256 Byte liegen, sonst vier), der Typ selbst und die Nutzdaten. Ein kurzer URL-Datensatz kostet also 4 Byte Header, bevor das erste Byte deines Links kommt.

| Datensatz | Typ | Nutzdaten |
| --- | --- | --- |
| URL | Well-known Type `U` | ein Präfix-Byte plus der Rest der URL in UTF-8 |
| Text | Well-known Type `T` | ein Status-Byte, ein Sprachcode (`en`), dann der Text |
| Smart Poster | Well-known Type `Sp` | eine komplette NDEF-Nachricht darin: eine URL plus optionale Titel und eine Aktion |
| Kontakt | MIME `text/vcard` | der vCard-Text, wie er ist |
| WLAN | MIME `application/vnd.wfa.wsc` | Attribute nach Wi-Fi Simple Configuration: SSID, Authentifizierungstyp, Schlüssel |
| Android-App | External Type `android.com:pkg` | ein Paketname; Android öffnet diese App oder ihre Seite im Play Store |

Das Präfix-Byte ist der eine clevere Kniff im URI-Datensatz. Statt `https://` auszuschreiben, ist das erste Byte der Nutzdaten ein Code für ein gängiges Präfix, und das Handy setzt es wieder ein.

| Code | Präfix | Code | Präfix |
| --- | --- | --- | --- |
| 00 | keins | 12 | rtsp:// |
| 01 | http://www. | 13 | urn: |
| 02 | https://www. | 14 | pop: |
| 03 | http:// | 15 | sip: |
| 04 | https:// | 16 | sips: |
| 05 | tel: | 17 | tftp: |
| 06 | mailto: | 18 | btspp:// |
| 07 | ftp://anonymous:anonymous@ | 19 | btl2cap:// |
| 08 | ftp://ftp. | 1A | btgoep:// |
| 09 | ftps:// | 1B | tcpobex:// |
| 0A | sftp:// | 1C | irdaobex:// |
| 0B | smb:// | 1D | file:// |
| 0C | nfs:// | 1E | urn:epc:id: |
| 0D | ftp:// | 1F | urn:epc:tag: |
| 0E | dav:// | 20 | urn:epc:pat: |
| 0F | news: | 21 | urn:epc:raw: |
| 10 | telnet:// | 22 | urn:epc: |
| 11 | imap: | 23 | urn:nfc: |

`https://nfc.cool/` wird also als Byte 04 gespeichert, gefolgt von `nfc.cool/`: neun Byte Nutzdaten für eine URL mit siebzehn Zeichen. NXPs eigenes Datenblatt zum NTAG 5 bringt als Beispiel `D1 01 0C 55 01`, gefolgt von `nxp.com/nfc`, was dekodiert `http://www.nxp.com/nfc` ergibt.

### Der Umschlag um den Datensatz

Auf einem Type-2- oder Type-5-Tag steckt die Nachricht in einem TLV: ein Byte, das „NDEF-Nachricht“ sagt (03), ein Längenbyte (drei Byte, wenn die Nachricht 255 Byte oder länger ist), die Nachricht und ein Abschlussbyte (FE). Auf einem Type-4-Tag gibt es kein TLV; die NDEF-Datei beginnt mit einer zwei Byte langen Längenangabe. Und auf einem NTAG213 oder NTAG212 im Werkszustand sind die ersten fünf Byte des nutzbaren Speichers schon von einem Lock Control TLV belegt, das NXP vorab hineinschreibt und das jede Schreib-App stehen lässt.

Hier ist die Rechnung für einen einzelnen `https://`-Link, von Hand durchgerechnet für den Chip, den die meisten kaufen:

- nutzbarer Speicher des NTAG213: 144 Byte
- minus das Lock Control TLV aus dem Werk: 139
- minus der NDEF-TLV-Rahmen (03, Länge, FE): 136 Byte für die Nachricht
- minus der Header des Datensatzes (Flags, Typlänge, Nutzdatenlänge, `U`): 132 Byte Nutzdaten
- minus das Präfix-Byte: **131 Zeichen nach `https://`**

### Was wohin passt

<div class="table-scroll">

| Tag | NDEF-Bereich | URL-Zeichen nach https:// | Minimale vCard (132 B, Name, Telefon, E-Mail, URL) | Typische vCard (250 bis 500 B) | WLAN-Datensatz (67 bis 88 B) |
| --- | --- | --- | --- | --- | --- |
| NTAG210, Ultralight EV1 48 B | 48 | 40 | nein | nein | nein |
| NTAG212 | 128 | 115 | nein | nein | ja |
| Ultralight EV1 128 B | 128 | 120 | nein | nein | ja |
| NTAG213, Werkszustand | 144 | 131 | nein, 9 Byte zu wenig | nein | ja |
| NTAG213, Lock TLV entfernt | 144 | 136 | nein, 4 Byte zu wenig | nein | ja |
| ST25TN01K | 160 | etwa 147 | ja, knapp | nein | ja |
| NTAG215 | 496 deklariert (504 nutzbar) | 483 | ja | ja, die meisten | ja |
| NTAG216 | 872 deklariert (888 nutzbar) | 859 | ja | ja | ja |
| ICODE SLIX | 112 (inklusive CC) | 100 | nein | nein | ja |
| ICODE SLIX2 | 316 | etwa 300 | ja | meistens | ja |
| NTAG 424 DNA | NDEF-Datei mit 256 Byte | 249 | ja | kleine | ja |
| DESFire EV3 2K | NDEF-Datei mit bis zu 2048 Byte | bis zu 2038 | ja | ja | ja |

</div>

Zwei Fußnoten, über die viele stolpern. NXPs eigener Capability Container deklariert beim NTAG215 und NTAG216 496 und 872 Byte, also weniger als den nutzbaren Speicher. Androids `getMaxSize()` meldet deshalb die kleinere Zahl, und die stimmt auch. Und eine vCard mit Name, Telefon, E-Mail und URL hat vor dem Umschlag 132 Byte und mit ihm 148. Deshalb passt sie nicht ganz auf einen NTAG213, und deshalb setzen Anbieter von Visitenkarten standardmäßig auf den NTAG215 oder NTAG216. Die gerundeten Werte aus dem Einsteiger-Guide (etwa 130, 480 und 850 Zeichen) sind genau diese Zahlen, nur grob abgerundet.

---

## Speicheraufbau: was wo auf dem Chip liegt

Falls du in NFC.cool schon mal einen Tag ausgelesen und ratlos auf die Hexwerte geschaut hast: Das hier ist der Schlüssel dazu.

### Type 2: die Page-Aufteilung des NTAG213

| Page | Byte | Inhalt |
| --- | --- | --- |
| 00 | 4 | UID-Bytes 0 bis 2 und ein Prüfbyte |
| 01 | 4 | UID-Bytes 3 bis 6 |
| 02 | 4 | Prüfbyte, ein internes Byte, zwei statische Lock-Bytes für die Pages 3 bis 15 |
| 03 | 4 | Capability Container: E1 10 12 00 (Magic Number, Version 1.0, 18 x 8 = 144 Byte, Lesen und Schreiben erlaubt) |
| 04 bis 27 | 144 | nutzbarer Speicher, hier liegen die TLVs |
| 28 | 4 | dynamische Lock-Bytes für die Pages ab 16 |
| 29 | 4 | CFG0: Mirror-Konfiguration, die Page, auf der der Mirror landet, und AUTH0, die erste passwortgeschützte Page |
| 2A | 4 | CFG1: ACCESS-Byte mit dem Bit für Lese- oder Schreibschutz und AUTHLIM, dem Limit für Fehlversuche |
| 2B | 4 | PWD, das Passwort, nur beschreibbar |
| 2C | 4 | PACK, die zwei Byte lange Bestätigung, plus zwei reservierte Bytes |

Ein NTAG215 ist genauso aufgebaut, nur reicht der nutzbare Speicher bis Page 81 und die Konfiguration liegt auf 83 bis 86; beim NTAG216 geht es bis E1, die Konfiguration liegt auf E3 bis E6. Die Bits im Capability Container sind Einwegbits: Ist das Read-only-Flag in Byte 3 erst gesetzt oder ein Lock-Bit, lässt es sich nicht mehr zurücksetzen. Genau das schreibt die App, wenn du „dauerhaft sperren“ wählst. Ein „Formatieren“ schreibt bei Type 2 ein leeres NDEF-TLV (03 00 FE) auf Page 4; der Speicher wird dabei nicht genullt, alte Daten lassen sich also noch auslesen, bis sie überschrieben sind.

### Type 4: das Dateisystem des NTAG 424 DNA

Pages gibt es hier nicht. Eine ISO-7816-Anwendung namens D2760000850101 enthält drei Dateien: einen Capability Container mit 32 Byte (E103), eine NDEF-Datei mit 256 Byte (E104) und eine proprietäre Datei mit 128 Byte (E105). Jede Datei hat eigene Rechte für Lesen, Schreiben und Ändern, und jedes davon ist einem von fünf AES-Schlüsseln zugeordnet. DESFire funktioniert genauso, lässt dich aber eigene Anwendungen und Dateien anlegen; die drei beim NTAG 424 DNA sind fest vorgegeben. Deshalb habe ich ihn als [kleinen verschlossenen Tresor mit drei Schubladen](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/) beschrieben.

### Type 5: Blöcke nach ISO 15693

Vier Byte große Blöcke, ab null durchnummeriert, mit dem Capability Container in Block 0 (E1 40, gefolgt von der Größe) und dem NDEF-TLV ab Block 1. UID, AFI, DSFID und Sperrstatus liegen außerhalb der adressierbaren Blöcke und werden mit einem eigenen Befehl, GET SYSTEM INFORMATION, gelesen. Beim ICODE SLIX2 ist der letzte adressierbare Block, 79, der 16-Bit-Zähler; beim ICODE 3 enthält Block 75 einen 24-Bit-Zähler, und ab Block 76 beginnt ein separater Konfigurationsbereich.

### MIFARE Classic: Sektoren, Trailer und das Verzeichnis

Eine Classic 1K hat 16 Sektoren mit je 4 Blöcken zu 16 Byte. Der letzte Block jedes Sektors ist der **Sector Trailer**: Key A, drei Access-Bytes, ein freies Byte, Key B. Block 0 von Sektor 0 ist der Herstellerblock mit der UID. Um NDEF auf eine Classic zu bringen, hat NXP ein Verzeichnis definiert: Sektor 0 wird zum **MIFARE Application Directory** (MAD), lesbar mit dem öffentlichen Schlüssel A0 A1 A2 A3 A4 A5, und darin steht, welche Sektoren NDEF unter dem Anwendungscode 03 E1 enthalten. Diese Sektoren nutzen einen zweiten öffentlichen Schlüssel, D3 F7 D3 F7 D3 F7. Auf einer fabrikneuen Karte steht jeder Schlüssel auf FF FF FF FF FF FF. Wenn NFC.cool auf Android eine Classic-Karte formatiert, schreibt es genau dieses Verzeichnis und diese Schlüssel, und deshalb lässt sich eine formatierte Classic-Karte auf manchen Android-Handys lesen und auf keinem iPhone.

---

## Die Entscheidungstabelle

Fang hier an, wenn du die Aufgabe kennst und den passenden Chip suchst.

| Die Aufgabe | Der Chip | Warum | Support in NFC.cool |
| --- | --- | --- | --- |
| ein Link, ein WLAN, ein Auslöser für Kurzbefehle, ein Sticker auf einem Gegenstand | NTAG213 | 131 Zeichen URL, Passwort, Zähler, acht Cent | vollständig auf iPhone, Android, iPad und Mac |
| eine Kontaktkarte, ein längerer Link, alles mit Luft nach oben | NTAG216 | 859 Zeichen, dieselben Funktionen, der Chip, mit dem ich teste | vollständig |
| Amiibo | NTAG215 | die Konsole prüft genau auf diesen Chip und seine 504 Byte | Backup und Wiederherstellung auf beiden Plattformen |
| Scans zählen auf einem Poster, einer Visitenkarte, einem Vorführgerät | NTAG213, 215 oder 216 | der Lesezähler in der Hardware und der ASCII-Mirror, und es sind die drei Chips, die der Tap Counter der App unterstützt | [Tap Counter](/blog/count-nfc-tag-scans/) auf beiden Plattformen |
| eine winzige Antenne, ein Ring, ein billiger Wegwerf-Tag | NTAG 210µ oder Ultralight EV1 48 B | 48 Byte, 17 pF für kleine Spulen, kein Passwort | lesen und schreiben |
| beweisen, dass ein Produkt echt ist, mit einem Scan, ohne App | NTAG 424 DNA | jeder Scan signiert sich selbst mit AES-128; eine Kopie kann das nicht | vollständige Konfiguration, inklusive Signaturprüfung |
| dasselbe, aber als günstiger Type-2-Sticker | NTAG 223 DNA | SUN auf einem Type-2-Chip, 144 Byte | wird als Type-2-Tag angezeigt; SUN-Einrichtung noch nicht unterstützt |
| ein Siegel, das meldet, wann es geöffnet wurde | NTAG 213 TT, NTAG 424 DNA TT, ST25TV02KC-T | ein Manipulationsdraht, dessen Zustand dauerhaft gespeichert wird | 424 TT vollständig; die anderen werden als ihr Basischip gelesen |
| Inventur oder eine Bibliothek auf Armlänge mit einem Gate-Lesegerät | ICODE SLIX2 oder ICODE 3 | ISO 15693 liest mit einem richtigen Lesegerät auf 1 bis 1,5 Meter und funktioniert trotzdem noch per Scan mit dem Handy | lesen, schreiben, formatieren auf beiden Plattformen |
| eine 3D-Drucker-Spule, die der Drucker selbst lesen muss | ICODE SLIX2 | der Standard [OpenPrintTag](/blog/openprinttag-read-write-nfc-spools-phone/) setzt NFC-V voraus | lesen und schreiben |
| eine Tür, ein Drehkreuz, ein Nahverkehrssystem | DESFire EV3 oder MIFARE Plus EV2 | AES, echtes Schlüsselmanagement, zertifizierte Sicherheit | erkennt den Chip und liest aus, was öffentlich ist; keine Schlüsseloperationen |
| ein batterieloser Sensor, der mit einem Mikrocontroller spricht | NTAG I2C plus, ST25DV, NTAG 5 | eine I2C-Schnittstelle und Energy Harvesting auf demselben Chip | wird über seine NFC-Seite gelesen |
| alles aus der Welt der japanischen Fahrkarten und E-Geld-Systeme | FeliCa | das ist die Sprache der dortigen Lesegeräte | lesen; NDEF schreiben auf Lite-S und Standard auf dem iPhone |
| ein Tag auf einer Metallfläche | jeder der obigen in einer On-Metal-Bauform | die Ferritschicht macht es möglich, nicht der Chip | wie der Chip |
| unter der Haut | NTAG216 (xNT), NTAG I2C (xSIID), DESFire (xDF) | kleine Glasantennen brauchen die optimale Stelle am Handy | wie der Chip |

Was nicht in der Tabelle steht: MIFARE Classic. Es gibt 2026 keine Aufgabe, für die ich einen Classic-Chip kaufen würde, und weiter unten steht, warum.

---

## Die Chipfamilien im Detail

Jede Familie bekommt dieselbe Behandlung: eine Datentabelle aus dem Datenblatt, wofür der Chip gedacht ist, was die Handys damit machen, und eine Praxis-Notiz, wo ich eine habe.

### NTAG 21x: die Sticker-Familie

Das ist der Chip in fast jedem NFC-Sticker, jeder Münze und jeder Karte, die an Endkunden verkauft werden, und NXP führt sie 2026 alle noch als aktiv, obwohl sich das Datenblatt seit 2015 nicht geändert hat.

<div class="table-scroll">

| Chip | Nutzbar / gesamt (Byte) | Passwort | Zähler | Mirror | Signatur | Schreibzyklen / Datenerhalt | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 210µ | 48 / 64 | nein | nein | nein | ja, neu programmierbar | 100k / 10 Jahre | aktiv |
| NTAG210 | 48 / 80 | 32 Bit + PACK, AUTHLIM | nein | UID | ja | 100k / 10 Jahre | aktiv |
| NTAG212 | 128 / 164 | ja | nein | UID | ja | 100k / 10 Jahre | aktiv |
| NTAG213 | 144 / 180 | ja | 24-Bit-Lesezähler | UID und Zähler | ja | 100k / 10 Jahre | aktiv |
| NTAG215 | 504 / 540 | ja | ja | ja | ja | 100k / 10 Jahre | aktiv |
| NTAG216 | 888 / 924 | ja | ja | ja | ja | 100k / 10 Jahre | aktiv |
| NTAG213F, NTAG216F | 144 oder 888 | ja | ja | ja | ja | 100k / 10 Jahre | aktiv; mit zusätzlichem Field-Detect-Pin und Schlafmodus für den Einbau in Elektronik |
| NTAG 213 TT | 144 / 184 | ja | ja | UID, Zähler und Manipulationsstatus | ja | 100k / 10 Jahre | aktiv; mit zusätzlichem Manipulationsdraht |
| NTAG203 | 144 / 168 | nein, ein 32-Bit-OTP-Bereich | 16-Bit-Schreibzähler | nein | nein | 10k / 5 Jahre | abgekündigt, ersetzt durch NTAG213 |

</div>

Alle sind NFC Forum Type 2, ISO/IEC 14443 Typ A, mit 7-Byte-UID, 106 kbit/s und ausgelegt für -25 bis +70 °C. NTAG210 und NTAG212 haben eine Eingangskapazität von 17 pF für kleine Antennen, 213, 215 und 216 haben 50 pF. Die Originalitätssignatur ist ECDSA auf der Kurve secp128r1, 32 Byte, gelesen mit dem Befehl READ_SIG; der Prüfschlüssel steht in einer nicht öffentlichen Application Note von NXP, und deshalb prüft ihn fast keine App für Endkunden.

Die drei Funktionen, die in der Praxis zählen, sind das **Passwort** (ein 32-Bit-PWD, ein 16-Bit-PACK, mit dem der Tag antwortet, AUTH0, das festlegt, wo der Schutz beginnt, und AUTHLIM, das den Tag nach einer festgelegten Zahl falscher Versuche unbrauchbar macht), der **NFC-Zähler** (24 Bit, wird einmal pro Lesevorgang hochgezählt und lässt sich mit einem eigenen Befehl auslesen) und der **ASCII-Mirror**, der UID und Zähler als Text in deine NDEF-Nachricht einfügt, sodass aus einer schlichten URL bei jedem Scan `https://example.com/?u=04A1...&c=000123` wird. Die Bürstenköpfe der Philips Sonicare, über die ich geschrieben habe, nutzen einen NTAG213 mit AUTHLIM auf drei, und so [sperrt sich ein Bürstenkopf selbst](/blog/reset-sonicare-brush-head-nfc/), wenn du falsch rätst.

> **Praxis-Notiz:** Mit diesen Chips teste ich jedes Release, und den NTAG216 empfehle ich, wenn jemand ein Pack kaufen und nicht weiter drüber nachdenken will. Das Passwort lohnt sich bei allem, was du öffentlich hängen lässt; es hält Leute mit einer kostenlosen App ab, und das sind die meisten. Gegen jemanden mit einem Sniffer hilft es nicht, weil das Passwort selbst unverschlüsselt über die Luft geht, und das sage ich in der App auch klar.

Zu den Handys: NDEF lesen und schreiben funktioniert überall, das iPhone liest URL-Datensätze im Hintergrund, und auf beiden Plattformen gibt es Rohzugriff für Passwort, Zähler und Mirror. NFC.cool kann all das auf iPhone und Android und über ein USB-Lesegerät auf iPad und Mac.

### NTAG DNA: die Chips, die jeden Scan signieren

Drei Generationen, zwei davon werden noch hergestellt.

<div class="table-scroll">

| Chip | Forum-Typ | Nutzbare Byte | Schlüssel | SUN | Signatur | Schreibzyklen / Datenerhalt | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 413 DNA | Type 4 | 160 (32 CC + 128 NDEF) | 3 AES-128 | ja, 24-Bit-Zähler | ECC | 200k / 50 Jahre | wird nicht mehr hergestellt |
| NTAG 424 DNA | Type 4 | 416 (32 + 256 + 128) | 5 AES-128, LRP optional, Random ID optional | ja, optional mit verschlüsselter UID | ECDSA secp224r1, 56 Byte, plus AES-Originalitätsschlüssel | 200k / 50 Jahre | aktiv; Common Criteria EAL4 |
| NTAG 424 DNA TT | Type 4 | 416 | 5 AES-128 | ja, plus Manipulationsstatus in der Nachricht | dieselbe | 200k / 50 Jahre | aktiv |
| NTAG 223 DNA | Type 2 | 144 / 240 | ein 16-Byte-SUN-Schlüssel plus ein 32-Bit-Passwort | ja, 24-Bit-Zähler | ECDSA secp192r1, 48 Byte | 100k / 10 Jahre | aktiv seit Februar 2022 |
| NTAG 224 DNA | Type 2 | 208 / 304 | gegenseitige AES-128-Authentifizierung ersetzt das Passwort | ja | dieselbe | 100k / 10 Jahre | aktiv |
| NTAG 223 und 224 DNA StatusDetect | Type 2 | wie oben | wie oben | ja, mit Sensorstatus in der Nachricht | dieselbe | 100k / 10 Jahre | aktiv |

</div>

**SUN**, Secure Unique NFC, ist die Funktion, die diese Chips den dreifachen Preis eines NTAG213 wert macht: Der Tag spiegelt seine UID und seinen Lesezähler in die URL und hängt einen AES-128-CMAC darüber an, der bei jedem Scan frisch berechnet wird. Der Server prüft den MAC; ein geklonter Tag hat keinen Schlüssel und fällt durch. Das alles, inklusive LRP-Modus und den fünf Schlüsseln, habe ich im [Beitrag zum NTAG 424 DNA](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/) durchgearbeitet, deshalb hier nur, was sich seitdem geändert hat: NXP verkauft inzwischen auch den NTAG 426Q DNA und den NTAG X DNA, einen vernetzten Type-4-Chip mit 16 kB und EAL6+-Zertifizierung. Der 424 ist also nicht mehr der neueste DNA-Chip, aber immer noch der, den du tatsächlich als Sticker kaufen kannst.

Die 22x-DNA-Familie ist der spannende Neuzugang: SUN auf einem Type-2-Chip, der Sticker ist also günstiger, und das Handy liest ihn wie einen ganz normalen NTAG. Die **StatusDetect**-Varianten bringen zusätzlich einen Sensor mit: entweder eine leitfähige Schleife, die unumkehrbar festhält, dass sie durchtrennt wurde, oder eine Kapazitätsmessung zwischen zwei Pins von 0 bis 11 pF, die NXP für Füllstand, Feuchtigkeit und Druck bewirbt.

> **Praxis-Notiz:** Meine ersten NTAG-424-DNA-Tags habe ich für ein paar Euro bei AliExpress gekauft und die gesamten 424-Funktionen der App um sie herum gebaut: Schlüsselwechsel, SUN im Klartext- und im verschlüsselten Modus, Dateizugriffsrechte, die Tresor-Datei, Manipulationsstatus. Der 424 ist auch der einzige Chip, bei dem NFC.cool die Originalitätssignatur gegen NXPs veröffentlichten Public Key prüft und „Genuine NXP“ anzeigt. Die 22x DNA kenne ich nur aus dem Datenblatt.

### MIFARE Ultralight: die Fahrschein-Familie

Ultralight ist der ältere Bruder des NTAG. Dieselbe Luftschnittstelle, dieselben 4-Byte-Pages, derselbe SAK und ab EV1 dieselben Befehle. Der Unterschied liegt im Zweck: Ultralight wurde für Einzelfahrscheine gebaut und die NTAG-Reihe für Sticker mit einer URL. Deshalb kommt der NTAG mit einem vorab beschriebenen Capability Container und der Ultralight nicht.

<div class="table-scroll">

| Chip | Nutzbar / gesamt (Byte) | Schutz | Zähler | Signatur | Schreibzyklen / Datenerhalt | Status |
| --- | --- | --- | --- | --- | --- | --- |
| MIFARE Ultralight (MF0ICU1) | 48 / 64 | Lock-Bits und ein 32-Bit-OTP-Bereich | nein | nein | 10k / 5 Jahre | wird nicht mehr hergestellt |
| Ultralight C | 144 / 192 | gegenseitige Triple-DES-Authentifizierung, 16-Byte-Schlüssel | 16 Bit, nur aufwärts | nein | 100k / 10 Jahre | nicht für neue Designs empfohlen, ersetzt durch Ultralight AES |
| Ultralight EV1 | 48 / 80 oder 128 / 164 | 32-Bit-Passwort, AUTHLIM | drei unabhängige 24-Bit-Einwegzähler | ja, 32 Byte | 100k / 10 Jahre | aktiv |
| Ultralight AES | 144 / 240 | gegenseitige AES-128-Authentifizierung, CMAC-gesicherte Kommunikation, Random ID optional | drei 24-Bit-Zähler | ja, plus ein AES-Originalitätsschlüssel | 100k / 10 Jahre | aktiv seit Februar 2022, Common Criteria EAL3+ |
| Ultralight Nano | 40 / 56 | Lock-Bits und OTP | nein | ja | 100k / 10 Jahre | aus NXPs Katalog verschwunden, ohne dass ich eine Abkündigung gefunden hätte |

</div>

Das Markenzeichen des Ultralight EV1 sind seine drei Einwegzähler: Ein Verkehrsbetrieb zählt einen Wert herunter, und der Chip weigert sich, wieder hochzuzählen. Der Ultralight AES ist die leise Antwort auf „Ich will einen NTAG213 mit echter Authentifizierung“: dieselben 144 Byte, AES-128 statt Passwort, auf einem Type-2-Tag, den jedes Handy lesen kann.

Zu den Handys: Alles hier wird als Type-2-Tag gelesen. Apples Core NFC stellt eine `.ultralight`-Familie bereit und lässt eine App native Befehle schicken; Android hat eine Klasse `MifareUltralight`, die optional ist, aber auf jedem Handy vorhanden war, das ich gesehen habe. NFC.cool benennt die EV1-Varianten und den AES anhand von GET_VERSION und behandelt das Passwort beim EV1 wie beim NTAG; die AES-Authentifizierung selbst beherrscht die App nicht.

### MIFARE Classic, Plus und DESFire: die Zugangskontroll-Familie

Drei Familien in einem Abschnitt, weil sie eine zusammenhängende Geschichte erzählen: Classic wurde geknackt, Plus war der Migrationspfad, und bei DESFire ist die Branche schließlich gelandet.

**MIFARE Classic** ist der Chip in deiner alten Hotelkarte, deiner Fitnessstudio-Karte und in sehr vielen Büroausweisen. Er ist kein Tag-Typ des NFC Forum. Er hat seine eigene Chiffre, CRYPTO1, die 2008 zwei Forschungsgruppen per Reverse Engineering offengelegt haben: Nohl und Plötz haben sich dafür das Silizium unter dem Mikroskop angesehen, die Gruppe der Radboud-Universität hat das Protokoll beobachtet und einen Schlüssel „aus nur ein oder zwei Authentifizierungsversuchen mit einem echten Lesegerät in weniger als einer Sekunde“ gewonnen. NXP hat versucht, das zweite Paper gerichtlich zu stoppen, und verloren. Sechzehn Jahre später, im August 2024, hat Quarkslab eine Hardware-Hintertür im Fudan FM11RF08S veröffentlicht, dem häufigsten Classic-kompatiblen Chip der letzten fünf Jahre, und dabei einen älteren Hintertür-Schlüssel gefunden, den frühere Fudan-Chips, einige Infineon-Chips und sogar einige NXP-Chips von etwa 2000 gemeinsam haben. Classic ist kein Sicherheitsprodukt, und NXPs eigene Produktseite zum Classic EV1 sagt inzwischen „not recommended for new designs“ und verweist auf DESFire Light.

<div class="table-scroll">

| Chip | Nutzbar / gesamt (Byte) | UID | Schutz | Schreibzyklen / Datenerhalt | Status |
| --- | --- | --- | --- | --- | --- |
| Classic Mini | 224 / 320 | 4 Byte | CRYPTO1 | 100k / 10 Jahre | eingestellt |
| Classic 1K | 752 / 1024 | 4-Byte-NUID | CRYPTO1 | 100k / 10 Jahre | eingestellt; EV1 nicht für neue Designs empfohlen |
| Classic 4K | 3440 / 4096 | 4-Byte-NUID | CRYPTO1 | 100k / 10 Jahre | eingestellt; EV1 nicht empfohlen |
| Classic EV1 1K und 4K | wie oben | 7 oder 4 Byte, Random ID optional | CRYPTO1; Originalitätsprüfung nur beim 1K | mindestens 100k / 10 Jahre | nicht für neue Designs empfohlen |

</div>

Die klare Antwort fürs iPhone, weil ich sie jede Woche gefragt werde: **Ein iPhone kann den Inhalt einer MIFARE-Classic-Karte nicht lesen, und daran kann keine App etwas ändern.** Apples Core NFC hat in seiner API keine Classic-Familie, und die Dokumentation zum MIFARE-Befehl sagt unverblümt, dass er „das Crypto1-Protokoll nicht unterstützt“. Das Handy sieht die UID und den SAK, meine App leitet daraus die Familie ab, und mehr geht nicht. Auf Android sieht es anders aus: Die Klasse `MifareClassic` ist optional und auf Handys umgesetzt, deren NFC-Controller CRYPTO1 in Hardware beherrscht (die Controller von NXP können das, die Broadcom-Chips in einer ganzen Generation von Nexus- und Galaxy-Handys konnten es nicht). Auf diesen Handys liest NFC.cool jeden Sektor, den der Werksschlüssel öffnet, und kann eine neue Karte für NDEF formatieren.

**MIFARE Plus** ist der Speicheraufbau der Classic mit nachgerüstetem AES-128, damit ein Betreiber zuerst die Karten und später die Lesegeräte tauschen kann. Er läuft in Security Levels: SL1 verhält sich wie eine Classic (optional mit AES), SL3 ist reines AES über ISO-DEP, und der Plus X hatte dazwischen noch ein SL2. Plus S und Plus X sind eingestellt; Plus SE (ein 1K mit 752 Byte) und Plus EV2 (2K oder 4K, EAL5+, 25 Jahre Datenerhalt, typischerweise 1.000.000 Schreibzyklen) sind aktuell. In SL1 sieht ein Handy SAK 08 oder 18, genau wie bei einer Classic; in SL3 sieht es eine ISO-DEP-Karte.

**MIFARE DESFire** ist ein ganz anderes Kaliber: ein kleines Dateisystem mit Anwendungen, Dateien, Zugriffsrechten pro Datei und bis zu 14 Schlüsseln pro Anwendung, das APDUs über ISO-DEP mit bis zu 848 kbit/s spricht.

<div class="table-scroll">

| Chip | Nutzbarer Speicher | Kryptografie | Extras | Schreibzyklen / Datenerhalt | Status |
| --- | --- | --- | --- | --- | --- |
| DESFire D40 | 4 kB | DES, Triple DES | | 100k / 10 Jahre | 2011 ausgelaufen; seine Schlüssel wurden im selben Jahr per Stromverbrauchsanalyse geknackt |
| DESFire EV1 | 2304, 4864 oder 7936 Byte | DES, 3DES, AES-128 | Type-4-fähig nach NFC Forum, Random ID | mindestens 200k / 10 Jahre | nicht für neue Designs empfohlen |
| DESFire EV2 | 2560, 5120, 8192 oder 16384 Byte | AES-128, EAL5+ | Transaction MAC, Proximity Check, Originalitätssignatur | 200k / 25 Jahre | nicht für neue Designs empfohlen |
| DESFire EV3 | 2560, 5120, 8192 oder 16384 Byte | AES-128, EAL5+ | alles vom EV2 plus SUN/SDM und ein Transaktions-Timer; Type-4-Zertifikat des NFC Forum Nr. 58652 | mindestens 200k, typisch 1M / 25 Jahre, -25 bis +85 °C | aktiv |
| DESFire Light | 640 Byte | nur AES-128, LRP optional, EAL4 | eine feste Anwendung mit sechs Dateien | 200k / 10 Jahre | aktiv |

</div>

Das „2K“ im Namen einer DESFire bedeutet nicht 2048 Byte, die du direkt nutzen kannst. NXPs Vergleichsdokument nennt die nutzbaren Werte aus der Tabelle, und jede Anwendung und jede Datei, die du anlegst, zweigt einen Teil für ihre eigenen Header ab, vergeben in Pages zu 256 Byte. Frag die Karte mit dem Befehl FreeMemory, statt dem Etikett zu glauben. Mit dem DESFire EV3 kam auch SUN in die Familie, ein EV3 beherrscht also den Trick des NTAG 424 DNA, eine URL zu signieren. Der EV2 kann das nicht.

Zu den Handys: iOS liefert eine DESFire als MIFARE-Tag vom Typ `.desfire` oder als ISO-7816-Tag, wenn die App nach der NDEF-Anwendung fragt; Android nutzt `IsoDep`. NFC.cool erkennt Generation und Größe über GetVersion und listet die Anwendungen und Dateien auf, die es ohne Schlüssel sehen darf. Es authentifiziert sich nicht bei einer DESFire und schreibt auch nicht darauf; das ist Sache der Werkzeuge des Betreibers, und das sage ich lieber offen, als etwas vorzutäuschen.

### ISO 15693: die Familie mit großer Reichweite

Diese Chips wurden für einen Meter gebaut, nicht für einen Zentimeter. Ein Handy liest sie trotzdem (Apple seit iOS 13, Android über `NfcV`), und GoToTags hat gemessen, dass Type-5-Tags auf einem iPhone ungefähr auf die doppelte Entfernung lesbar sind wie Type-2-Tags. Zu Hause sind sie aber an der Ausgangsschranke der Bibliothek, im Lagerregal und in der Wäscherei. Die UID hat 8 Byte und beginnt mit E0, die Blöcke haben 4 Byte, und die Familie bringt drei Dinge mit, die Typ-A-Chips nicht haben: eine **AFI** (ein Byte für die Anwendungsfamilie, nach dem ein Lesegerät filtern kann), eine **DSFID** (ein Byte für das Datenformat) und **EAS**, das Bit für die elektronische Artikelsicherung, das die Schranke im Laden piepen lässt.

**NXP ICODE.** Die Ahnenreihe: SLI (2000), SLI-S und SLI-L (2007), SLIX mit seinen Varianten S und L (2010), SLIX2 (2014), ICODE DNA (2016) und ICODE 3 (2024). Einen „SLIX3“ gibt es nicht; ein Angebot, das ihn nennt, meint den ICODE 3 oder rät.

<div class="table-scroll">

| Chip | Nutzbar / gesamt (Byte) | Schutz | Zähler | Signatur | Schreibzyklen / Datenerhalt | Status |
| --- | --- | --- | --- | --- | --- | --- |
| ICODE SLI | 112 / 128 | nur Lock-Bits | nein | nein | 100k / 10 Jahre | abgekündigt |
| ICODE SLI-S | 160 / 256 | fünf 32-Bit-Passwörter: Lesen, Schreiben, Zerstören, Privacy, EAS | nein | nein | 100k / 10 Jahre | wird nicht mehr hergestellt |
| ICODE SLI-L | 32 / 64 | drei Passwörter | nein | nein | 100k / 10 Jahre | wird nicht mehr hergestellt |
| ICODE SLIX | 112 / 128 | ein 32-Bit-Passwort für EAS und AFI | nein | nein | 100k / 50 Jahre | nicht für neue Designs empfohlen |
| ICODE SLIX-S | 160 / 256 | fünf 32-Bit-Passwörter, Privacy-Modus, Zerstören | nein | nein | 100k / 50 Jahre | aktiv |
| ICODE SLIX-L | 32 / 64 | drei Passwörter | nein | nein | 100k / 50 Jahre | aktiv |
| ICODE SLIX2 | 316 / 320 | fünf 32-Bit-Passwörter, Privacy-Modus, Zerstören | 16 Bit, wird per Schreibbefehl hochgezählt | ja, 32 Byte | 100k / 50 Jahre | aktiv |
| ICODE DNA | 252 / 256 | gegenseitige AES-128-Authentifizierung, drei Schlüssel | 16 Bit | ja, neu programmierbar | 100k / 50 Jahre | aktiv |
| ICODE 3 | 300 / 304 plus ein Konfigurationsbereich mit 192 Byte | sechs 32-Bit-Passwörter, zwei Privacy-Modi | 24 Bit, kann Scans zählen wie ein NTAG | ja, 32 oder 48 Byte, neu programmierbar | 100k / 50 Jahre, bis 105 °C | aktiv; als TagTamper-Variante erhältlich |

</div>

Den ICODE 3 solltest du kennen: Er spiegelt UID und Scan-Zähler in die NDEF-Nachricht, so wie ein NTAG213, liest mit bis zu 212 kbit/s und stimmt seine Antenne selbst ab. AES hat er nicht; dafür gibt es den ICODE DNA, und SUN beherrscht keiner von beiden.

**STMicroelectronics ST25TV und ST25DV.** Die Type-5-Reihe von ST, und die mit den besten Datenblattwerten im ganzen Guide.

<div class="table-scroll">

| Chip | Nutzbare Byte | Schutz | Zähler | Signatur | Schreibzyklen / Datenerhalt | Status |
| --- | --- | --- | --- | --- | --- | --- |
| ST25TV512, ST25TV02K | 64 oder 256 | Passwörter mit 32 oder 64 Bit, Kill, Untraceable-Modus, Manipulationserkennung bei der Variante -AD | 16-Bit-Zähler für Schreibereignisse | TruST25 | 100k / 60 Jahre | nicht für neue Designs empfohlen |
| ST25TV512C, ST25TV02KC | 64 oder 320 | Passwörter, Kill, Silent- und Discreet-Modus, Manipulationserkennung bei der Variante -T | keiner; stattdessen ein dreistelliger Unique Tap Code | TruST25 | 100k / 60 Jahre | aktiv, verfügbar bis 2035 |
| ST25TV04K-P | 512 | 64-Bit-Passwörter, Kill | nein | nein | 1M / 40 Jahre | aktiv; hat einen Pin für Energy Harvesting |
| ST25TV16K, ST25TV64K und die KC-Versionen | 2048 oder 8192 | 64-Bit-Passwörter, Kill | nein | nein | 1M / 40 Jahre | K-Teile nicht empfohlen, KC-Teile aktiv |
| ST25DV04K, 16K, 64K und die KC-Versionen | 512, 2048 oder 8192 | drei 64-Bit-Passwörter für die Funkseite plus ein I2C-Passwort | nein | nein | 1M / 40 Jahre | K-Teile nicht empfohlen, KC-Teile aktiv |
| M24LR04E, 16E, 64E | 512, 2048 oder 8192 | 32-Bit-Passwörter | nein | nein | 1M / 40 Jahre | nicht für neue Designs empfohlen |

</div>

Das **Augmented NDEF** des ST25TV02KC verdient einen eigenen Absatz, weil es als Sicherheitsfunktion verkauft wird. Der Chip fügt bei jedem Lesen seine UID, ein frei belegbares Feld und einen dreistelligen **Unique Tap Code** in die URL ein, ohne das EEPROM anzufassen. Der Tap Code ändert sich mit jedem Scan, und STs Datenblatt sagt ausdrücklich, dass er „vorhersagbar“ ist. Er ist ein Frische-Token, das deinem Server sagt, dass es ein neuer Scan ist, aber kein Beweis, dass der Tag echt ist. Für die Echtheit ist TruST25 zuständig, STs Originalitätssignatur über die UID, und wie die von NXP ist sie eine statische Signatur, die ein Klon kopieren kann.

**Der Rest der Type-5-Welt.** Die Tag-it-HF-I-Inlays von Texas Instruments (Standard mit 32 Byte, Pro mit 32 Byte, passwortgeschütztem Schreiben und einem Kill-Befehl, Plus mit 256 Byte) stecken in jeder Bibliothek, die vor 2015 auf NFC umgestellt hat, und alle sind inzwischen als nicht empfohlen oder veraltet markiert. Der EM4233 von EM Microelectronic (208 Byte, ein Privacy-Modus mit 96-Bit-Schlüssel, 60 Jahre Datenerhalt) ist auf Anfrage erhältlich. Infineons my-d und Fujitsus MB89R118 tauchen in der Chiperkennung von NFC.cool auf, weil Nutzer sie mir geschickt haben. NXPs NTAG 5 (link, boost, switch) ist trotz des NTAG-Namens ein ISO-15693-Chip, mit 2048 oder 512 Byte, einem I2C-Port, Energy Harvesting bis 30 mW und einem EEPROM für 1.000.000 Zyklen und 40 Jahre: ein vernetzter Tag für Elektronik, kein Sticker, und Software, die für den NTAG21x geschrieben wurde, kann nicht mit ihm reden.

> **Praxis-Notiz:** Der SLIX2 steckt in jeder Filamentspule mit OpenPrintTag, ich hatte also schon einige davon in der Hand, und NFC.cool liest, beschreibt und formatiert sie auf beiden Plattformen. Was die App nicht kann, und das will ich klar sagen, sind die ISO-15693-Befehle für Passwort, Privacy, EAS und AFI. Die Befehlsbytes stehen als Referenztabelle im Code, die Buttons dafür gibt es noch nicht.

### Type 4 jenseits von MIFARE: ST25TA

Die ST25TA-Familie von ST besteht aus Type-4-Tags auf Basis von ISO/IEC 14443 Typ A, ohne den ganzen DESFire-Apparat: eine NDEF-Datei, eine Capability-Container-Datei und eine Systemdatei, zwei 128-Bit-Passwörter (Lesen und Schreiben) und ein 20-Bit-Ereigniszähler, der Lese- oder Schreibvorgänge zählen kann.

<div class="table-scroll">

| Chip | NDEF-Datei | Passwörter | Zähler | Signatur | Schreibzyklen / Datenerhalt | Status |
| --- | --- | --- | --- | --- | --- | --- |
| ST25TA512, ST25TA512B | 64 Byte | zwei mit 128 Bit | 20 Bit beim B | TruST25 beim B | 1M / 200 Jahre | 512 nicht empfohlen |
| ST25TA02K, ST25TA02KB (-P, -D) | 256 Byte | zwei mit 128 Bit | 20 Bit | TruST25 beim B | 1M / 200 Jahre | 02K und 02KB nicht empfohlen; 02KB-P und 02KB-D aktiv |
| ST25TA16K, ST25TA64K | 2048 oder 8192 Byte | zwei mit 128 Bit | nein | nein | 1M / 200 Jahre | aktiv |

</div>

Zweihundert Jahre Datenerhalt und eine Million Schreibzyklen, allerdings nur mit 106 kbit/s. Die Varianten -P und -D haben einen Ausgangspin für allgemeine Zwecke, der umschaltet, sobald der Tag gelesen wird, und so bringst du eine Lampe dazu, auf ein Handy zu reagieren. Auf beiden Handy-Plattformen werden sie als Type-4-Tags gelesen; NFC.cool liest und schreibt NDEF darauf und zeigt die ISO-DEP-Details an.

### Sensor- und Dual-Interface-Chips

Diese Chips haben zwei Seiten: auf der einen eine NFC-Antenne, auf der anderen einen I2C-Bus, einen Sensor oder ein zweites Funkmodul.

| Chip | NFC-Seite | Andere Seite | Speicher | Bemerkenswert |
| --- | --- | --- | --- | --- |
| NTAG I2C plus (NT3H2111, NT3H2211) | Type 2, 888 oder 1912 Byte, 32-Bit-Passwort, Signatur | I2C bis 400 kHz, 64 Byte SRAM zum Durchreichen, Field-Detect-Pin | 200k bis 500k / 20 Jahre | Energy Harvesting bis 15 mW; der Chip im Implantat xSIID |
| ST25DV (siehe oben) | Type 5 | I2C bis 1 MHz, eine Mailbox mit 256 Byte zum Streamen | 1M / 40 Jahre | Energy Harvesting am Pin V_EH, ungeregelt, laut Datenblatt „einige µW“ |
| NTAG 5 link, boost, switch | Type 5, 2048 oder 512 Byte, AES beim 5332 | I2C, GPIO, PWM-Ausgänge | 1M / 40 Jahre | Energy Harvesting bis 30 mW; die Variante switch braucht überhaupt keinen Mikrocontroller |
| NHS3100 | Type 2, per Firmware emuliert | ein Cortex-M0+ mit Temperatursensor, auf 0,3 °C genau | 32 kB Flash, 4 kB EEPROM | ein Datenlogger für die Kühlkette auf einer Folie, vom NFC Forum zertifiziert |
| EM4423 „em echo“ | Type 2, NDEF-Bereich mit 240 Byte | UHF-RAIN-RFID, derselbe Speicher, dieselbe Seriennummer | 100k / 10 Jahre | eingestellt |
| EM4425 „em echo-V“ | Type 5, bis zu 256 Byte gemeinsam genutzt | UHF-RAIN-RFID, AES-128, Manipulationskontakte, digitale Signatur | 100k / 50 Jahre | aktuell; ein einziger Chip, den ein Handy auf einen Zentimeter und ein UHF-Lesegerät am Ladetor auf mehrere Meter liest |

Mit diesen Chips habe ich selbst noch nichts gebaut, diese Tabelle stammt also nur aus Datenblättern. Wichtig sind sie für diesen Guide, weil sie in Angeboten als „NFC-Chip“ auftauchen und für Verwirrung sorgen: Ein NTAG 5 ist kein NTAG213, und ein em-echo-Tag macht auf deinem Handy nichts Besonderes.

### Altlasten und Nischen

**Topaz** (Innovision, später Broadcom) ist NFC Forum Type 1: 8-Byte-Blöcke, 96 oder 512 Byte, einmalige Sperren, 10.000 Schreibzyklen. Beide Plattformen lesen NDEF noch von einem Topaz, aber das NFC Forum hat Type 1 aus seinem Spezifikationspaket von 2021 gestrichen, und niemand verbaut ihn mehr in neuen Designs. Händler haben noch Restbestände.

**FeliCa** ist die Familie von Sony und das Rückgrat des japanischen Nahverkehrs. FeliCa Lite-S (224 Byte nutzbarer Speicher in 16-Byte-Blöcken, eine 8-Byte-IDm, ein schlanker Triple-DES-MAC) ist die Tag-Version und NFC Forum Type 3; FeliCa Standard ist die Chipkarten-Version, inzwischen mit AES und einer Common-Criteria-Bewertung EAL6+ beim aktuellen RC-SA01, und darauf laufen Suica, PASMO, Edy, WAON, nanaco und Octopus in Hongkong. Sonys FeliCa-Plug-Module wurden im März 2026 eingestellt. NFC.cool erkennt die Fahrkarten- und E-Geld-Marken auf beiden Plattformen am Systemcode, liest Lite-S und Standard und schreibt auf dem iPhone NDEF darauf.

**Kovio NFC Barcode** war ein Tag aus gedrucktem Silizium, nur lesbar, mit 16 Byte. Android hat dafür immer noch eine Klasse `NfcBarcode`. Kovios Vermögenswerte gingen 2014 an Thinfilm, Thinfilm hat die NFC-Produktion 2019 eingestellt und sich 2021 umbenannt. Die Klasse ist ein Fossil.

**Speicherchips nach ISO 14443 Typ B.** STs SRI512, SRT512 und SRI4K (512 oder 4096 Bit in 32-Bit-Blöcken, zwei Countdown-Zähler, 1.000.000 Zyklen, 40 Jahre) stecken in französischen und belgischen Nahverkehrssystemen und in manchen Skipässen. Android stellt sie über `NfcB` bereit; das iPhone hat überhaupt kein Objekt für rohe Typ-B-Tags. Spricht eine Typ-B-Karte also kein ISO-DEP und antwortet nicht auf ein SELECT, sieht ein iPhone sie nicht. Calypso, das System hinter dem Pariser Navigo, ist eine Typ-B-Chipkarte, die genau das tut.

### Klone und Kompatible

Diesen Abschnitt würden dir die meisten Verkäufer lieber vorenthalten.

**Fudan FM11NT021** ist der häufigste „NTAG213“, der kein NTAG213 ist. Er hat dieselben 180 Byte in 45 Pages, denselben nutzbaren Bereich von 144 Byte, ein Passwort, einen 24-Bit-Lesezähler und in der UID den Fudan-Herstellercode 1D. GET_VERSION setzt er nicht um, und sein aktuelles Datenblatt nennt keinen Befehl READ_SIG. Ein Lesegerät, das eine der beiden Fragen stellt, bekommt also keine Antwort und muss anhand der Speichergröße raten, und deshalb meldet die Proxmark3-Community ihn als NTAG203. Fudan baut auch Versionen mit 504 und 888 Byte (FM11NT041, FM11NT081). Für einen Link auf einem Sticker funktionieren sie. Für Amiibo nicht, weil die Konsole als Erstes GET_VERSION fragt.

**Fudan FM11RF08 und FM11RF08S** sind die Classic-kompatiblen Chips in den meisten billigen „1K“-Karten. Der 08S bekam 2020 Gegenmaßnahmen gegen die bekannten Classic-Angriffe und hatte dann, wie sich herausstellte, einen Hintertür-Schlüssel in der Hardware, der bei jeder produzierten Karte gleich ist. Quarkslab hat das 2024 veröffentlicht, samt Werkzeugen, die inzwischen in der Proxmark3-Firmware stecken.

**Magic-MIFARE-Classic-Karten** sind Chips, bei denen sich UID und Herstellerblock neu beschreiben lassen, was eine echte Classic nie zulässt. Die Generationen sind ein Hobby für sich:

| Generation | Wie sie die UID ändert | Erkennbar | Hinweise |
| --- | --- | --- | --- |
| Gen1a, Gen1b | ein Hintertür-Befehl zum Aufwecken | ja, jedes Lesegerät kann die Hintertür abfragen | die ursprüngliche „Chinese Magic Card“; Zugangssysteme filtern sie heraus |
| Gen2, CUID | ein normaler Schreibvorgang auf Block 0 nach der Authentifizierung | keine Hintertür zum Abfragen; ein Lesegerät muss einen Schreibversuch wagen | handytauglich, heute die gängige |
| FUID, UFUID | einmalig oder bis zur Versiegelung | vor der Versiegelung | Einwegkarten, um einen Ausweis dauerhaft zu klonen |
| Gen3, APDU | spezielle APDU-Befehle | durch ein Lesegerät, das die Befehle kennt | |
| Gen4 GTU, GDM, „Ultimate“ | eine passwortgeschützte Konfiguration; kann auch Ultralight und NTAG emulieren | nur solange das Standardpasswort gesetzt ist | ein Chamäleon im Kartenformat mit 7-Byte-UID, das jede Familie spielen kann |

Magic-Karten gibt es auch für NTAG21x, und die voll emulierenden akzeptieren sogar eine kopierte Originalitätssignatur. Genau darauf will NXP mit seinem Hinweis zu statischen Signaturen hinaus.

**„NTAG215-kompatibel“ für Amiibo.** Ein Amiibo ist ein ganz normaler NTAG215, dessen 540 Byte Daten enthalten, die mit Schlüsseln verschlüsselt und signiert sind, die aus der UID des Tags selbst abgeleitet werden. Kopierst du die Bytes auf einen anderen Tag, passen die Signaturen nicht mehr. Deshalb muss ein Backup auf die UID des Ziel-Tags umgeschlüsselt werden, und genau das macht [Backup und Wiederherstellung von Amiibo](/blog/amiibo-iphone-android-read-collect-backup/) in NFC.cool. Die Lesesequenz der Konsole beginnt mit GET_VERSION, dann folgt eine Passwort-Authentifizierung, die aus der UID abgeleitet ist, dann das Lesen aller 135 Pages inklusive der Konfigurations-Pages. Ein Chip ohne GET_VERSION oder mit 45 statt 135 Pages scheitert schon am ersten Schritt. Die Dokumentation von TagMo bringt es in einer Zeile auf den Punkt: Erkannt wird nur der NTAG215.

**Wie ein Klon in der App auftaucht.** NFC.cool erkennt Chips zuerst über GET_VERSION. Ein Chip, der darauf nicht antwortet oder eine Speichergröße meldet, die nicht zu dem passt, was er vorgibt, wird nach dem benannt, was er wirklich ist, nicht nach dem Angebot. Beim NTAG 424 DNA geht die App noch einen Schritt weiter und prüft die ECDSA-Originalitätssignatur gegen NXPs Public Key. Das ist die einzige Stelle in der App, an der „Genuine NXP“ kryptografisch abgesichert ist. Beim NTAG21x liest die App die Signatur nicht, zum einen, weil NXPs Prüfschlüssel unter NDA steht, und zum anderen, weil eine kopierte statische Signatur ohnehin durchgehen würde. Die ehrliche Beweiskette für einen Type-2-Tag lautet: Herstellercode, GET_VERSION, Speichergröße und ob die Funktionen vorhanden sind, die der Chip für sich beansprucht.

---

## Bauformen und Lesereichweite

Der Chip entscheidet, was der Tag kann; die Bauform entscheidet, ob das Handy ihn erreicht.

| Bauform | Was es ist | Typische Antenne | Lesereichweite mit dem Handy | Werte und Hinweise |
| --- | --- | --- | --- | --- |
| Wet Inlay | die geätzte Antenne mit Chip auf einer PET-Folie, mit Klebstoff und Trägerpapier | 22 bis 38 mm | 2 bis 4 cm | die billigste Art, einen Chip zu kaufen; klebt genau einmal |
| Dry Inlay | dasselbe ohne Klebstoff | wie oben | wie oben | zum Einlaminieren in etwas anderes |
| Sticker aus Papier oder PET | ein Inlay mit bedruckbarer Oberseite | 22 bis 38 mm | 2 bis 4 cm | Papier lässt sich bedrucken, PET übersteht Wasser |
| PVC-Karte | ISO 7810 ID-1, 85,60 x 53,98 mm, 0,76 mm dick | die ganze Karte | 3 bis 5 cm | die größte Antenne, die du in der Hand hältst; außerdem das, worauf Lesegeräte ausgelegt sind |
| Münze, Epoxid-Token | ein Inlay unter einer harten Harzkuppel, oft mit Loch | 20 bis 30 mm | 2 bis 3 cm | wasserdicht; die Bauform der Amiibo |
| Schlüsselanhänger | ein Inlay in einem ABS-Gehäuse | 20 bis 30 mm | 2 bis 3 cm | ein Anhänger von GoToTags ist nach IP67 und für -25 bis +75 °C spezifiziert |
| Armband | Silikon mit einem Inlay | 20 bis 25 mm | 1 bis 3 cm | Festivals, Schwimmbäder; das Band biegt sich, das Inlay sollte es nicht |
| On-Metal | ein Inlay mit einer Ferritfolie zwischen Antenne und Metall | 22 bis 34 mm | 2 bis 3 cm auf Metall | Seritag misst beim selben 22-mm-Tag 21 bis 25 mm auf Metall gegenüber 26 bis 30 mm ohne Metall; die Industrieversion mit 34 mm liest auf 31 bis 40 mm und ist nach IP68 und für -25 bis +85 °C spezifiziert |
| Wäschetag | ein Chip in einem Knopf aus PPS | 16 mm | 1 bis 2 cm | Smartrac gibt seinen HF-Wäschetag für 200 Waschzyklen, -30 bis +200 °C und 60 bar an; die meisten Wäschetags sind ISO 15693 und liefern nur die UID |
| Implantat | ein Chip in einer Glaskapsel mit 2 x 12 mm oder in einem flexiblen Polymer | ein paar Millimeter | braucht genau die richtige Stelle am Handy | das xNT ist ein NTAG216, das NExT hat zusätzlich einen T5577 für 125 kHz, das xSIID ist ein NTAG I2C plus mit LED, das xDF eine DESFire; die Flex-Versionen lesen sich viel besser als die aus Glas |

Zwei physikalische Regeln erklären die meisten „Wird nicht gelesen“-Anfragen. **Die Antennengröße bestimmt die Reichweite**, grob gesagt: Eine Karte liest sich aus größerer Entfernung als eine Münze, eine Münze aus größerer als ein 10-mm-Inlay, und ein Implantat braucht Kontakt. **Metall verstimmt die Antenne**: Eine Spule auf einer Metallfläche induziert Wirbelströme im Metall, ihre Induktivität sinkt, und ihre Resonanz wandert weg von 13,56 MHz. Ein normaler Tag auf einem Stahlschrank ist deshalb tot. Eine Ferritfolie zwischen Spule und Metall lenkt das Feld um und holt den Tag zurück, um den Preis einer kürzeren Reichweite und höherer Kosten. Deshalb kosten On-Metal-Tags das Dreifache.

Wo du das Handy hinhältst, ist genauso wichtig wie der Tag. Beim iPhone sitzt die Antenne an der Oberkante; Apple selbst sagt, man solle „die Oberseite des iPhone“ an den Tag halten. Bei Android hängt es vom Modell ab, meist ist es die Mitte der Rückseite oder die Nähe der Kamera. Im [Einsteiger-Guide](/blog/nfc-tags-beginners-guide/) gehe ich das Schritt für Schritt durch.

---

## Was womit lesbar ist

Die Matrix für Handys und Lesegeräte. Die Handy-Spalten stammen aus der Dokumentation von Apple und Google und aus meiner eigenen App; die Spalten zu Desktop- und Bastlergeräten stammen aus den Datenblättern der Hersteller und der Dokumentation der Projekte selbst. Diese Geräte habe ich nicht selbst getestet, mit Ausnahme der Lesegeräte, die in der Spalte zu iPad und Mac genannt sind.

<div class="table-scroll sticky-first">

| Chipfamilie | iPhone im Hintergrund | iPhone in einer App | Android | iPad und Mac mit USB-Lesegerät | Web NFC (Chrome auf Android) | ACR122U | ACR1552U, OMNIKEY 5022 | PN532-Board | Proxmark3 | Flipper Zero |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG21x, Ultralight EV1, andere Type 2 | nur URL-Datensätze | NDEF, Passwort, Zähler, Mirror, Speicherabbild | dasselbe | dasselbe, über NFC.cool | nur NDEF | ja | ja | ja | ja, plus Emulation | ja, plus Emulation |
| NTAG 22x DNA | URL-Datensätze | NDEF, Rohbefehle | dasselbe | wie Type 2 | NDEF | ja | ja | ja | ja | liest wie NTAG |
| NTAG 424 DNA, ST25TA, DESFire als Type 4 | URL-Datensätze | NDEF, APDUs | NDEF, APDUs | NDEF, vollständige 424-Konfiguration | NDEF | ja | ja | ja | ja | liest NDEF; keine Schlüsseloperationen |
| Ultralight C | NDEF, wenn formatiert | NDEF, native Befehle | dasselbe | NDEF | NDEF | ja | ja | ja | ja | ja |
| Ultralight AES | NDEF, wenn formatiert | NDEF, native Befehle | dasselbe | NDEF | NDEF | ja | ja | ja | ja | liest wie Ultralight |
| MIFARE Classic | nein | nur UID und Familie | volles Lesen und Schreiben auf Handys, deren Controller CRYPTO1 beherrscht | nur NDEF lesen, bekannte Schlüssel | nein | ja, mit Schlüsseln | ja, mit Schlüsseln | ja, mit Schlüsseln | ja, plus Schlüssel-Wiederherstellung und Emulation | ja, plus Schlüssel-Wiederherstellung und Emulation |
| MIFARE Plus | nein | UID in SL1; ISO-DEP in SL3 | wie Classic in SL1; IsoDep in SL3 | UID | nein | ja | ja | ja | ja | nicht dokumentiert |
| DESFire, nativ | nein | Familie und Version, APDUs | IsoDep | Version | nein | ja | ja | ja | ja | nur lesen und speichern |
| ISO 15693: ICODE, ST25TV, ST25DV, TI, EM | URL-Datensätze | voller ISO-15693-Befehlssatz seit iOS 13 | NfcV | nicht getestet | NDEF | nein | ja | nein | ja, plus Emulation | ja, plus Emulation |
| FeliCa Lite-S und Standard | URL-Datensätze | lesen und schreiben, mit deklariertem Systemcode | NfcF | lesen; schreiben auf FeliCa über NFC.cool | NDEF | ja | beim OMNIKEY nur UID | ja | ja | Lite-S lesen und emulieren |
| Topaz (Type 1) | NDEF | NDEF | NDEF | nicht getestet | NDEF | ja | nicht dokumentiert | ja | ja | nicht dokumentiert |
| Speicherchips nach ISO 14443 Typ B (SRI512) | nein | nein | NfcB | nicht getestet | nein | ja | ja | nur als Lesegerät | ja | nur UID |
| 125-kHz-Ausweise, Haustierchips, UHF-Etiketten | nein | nein | nein | nein | nein | nein | nein | nein | 125 kHz ja | 125 kHz ja |

</div>

Ein paar Zeilen verdienen einen eigenen Satz.

- **Hintergrund-Lesen auf dem iPhone** springt nur bei einem NDEF-URL-Datensatz an, nur wenn das Handy entsperrt ist und benutzt wird, und nicht, solange Kamera, Wallet, eine Lesesitzung oder der Flugmodus aktiv sind. Einen rohen Chip liest es nie. Ab iPhone XS.
- **Welche iPhones überhaupt Tags lesen:** iPhone 7 und neuer innerhalb einer App, laut Apples Session auf der WWDC 2019. Schreiben und Rohbefehle kamen mit iOS 13.
- **Androids Klasse `MifareClassic` ist optional.** Google schreibt selbst: „Wenn sie nicht implementiert ist, wird MifareClassic nie aufgeführt.“ Es hängt am Controller, nicht an der Android-Version.
- **Web NFC** kann nur NDEF, ab Chrome 89, nur auf Android, und Apple steht dem ablehnend gegenüber, eine Safari-Version wird es also nicht geben. Deshalb funktioniert der [Online-NFC-Reader](/online-nfc-reader/) auf dieser Website auf Android und schickt iPhone-Nutzer zur App.
- **iPad und Mac haben kein NFC-Funkmodul.** Seit NFC.cool 6.15.0 spricht die App stattdessen über Apples Smartcard-Schnittstelle mit einem USB-CCID-Lesegerät. Getestet habe ich das HID OMNIKEY 5022 CL, das ACS ACR1552U-M1 und das ACR1255U-J1 funktionieren laut Rückmeldungen von Nutzern, und [der Beitrag dazu](/blog/nfc-reading-ipad-mac/) nennt die Grenzen. Ein NTAG-Passwort setzen klappt über ein Lesegerät; zum Entfernen braucht es einen Befehl, den das OMNIKEY verweigert, das bleibt also Aufgabe des Handys.
- **Das ACS ACR122U kann kein ISO 15693**, genauso wenig wie das ACR1252U oder das ACR1255U-J1. In der ACS-Reihe kann das nur das ACR1552U. Das OMNIKEY 5022 kann beides. Gut zu wissen, bevor du ein Lesegerät für Bibliotheks-Tags kaufst.
- **Proxmark3 und Flipper Zero** sind die Werkzeuge, die MIFARE-Classic-Schlüssel wiederherstellen und Karten emulieren können. Genau dafür sind sie da, und dieser Guide erwähnt sie, weil die Frage „Was liest das?“ ohne sie nicht ehrlich zu beantworten wäre.

<div class="table-scroll">

| Lesegerät | Schnittstelle | Typ A | Typ B | FeliCa | ISO 15693 | 125 kHz | Classic mit Schlüsseln | Classic-Schlüssel wiederherstellen | Emulation | Preis im September 2026 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ACS ACR122U | USB, PC/SC | ja | ja | ja | nein | nein | ja | nein | nein | etwa 40 bis 50 USD; von ACS eingestellt, Fälschungen sind verbreitet |
| ACS ACR1252U | USB, PC/SC | ja | ja | ja | nein | nein | ja | nein | Kartenemulationsmodus | 97,50 USD |
| ACS ACR1552U | USB, PC/SC | ja | ja | ja | ja | nein | ja | nein | Kartenemulationsmodus | 44,81 USD |
| ACS ACR1255U-J1 | Bluetooth und USB | ja | ja | ja | nein | nein | ja | nein | nein | 64,81 USD |
| HID OMNIKEY 5022 CL | USB, PC/SC | ja | ja | nur UID | ja | nein | ja | nein | nein | 69,99 EUR |
| PN532-Breakout | SPI, I2C, UART | ja | nur als Lesegerät | ja | nein | nein | ja | Host-Werkzeuge | Classic 1K/4K und FeliCa | 24 bis 40 USD |
| Proxmark3 RDV4 | USB, BLE optional | ja | ja | ja | ja | ja | ja | ja | ja | 329 bis 529 EUR |
| Proxmark3 Easy | USB | ja | ja | ja | ja | ja | ja | teilweise | ja | 78 EUR; Klone ab etwa 28 GBP |
| Flipper Zero | eigenständig, USB-C, BLE | ja | eingeschränkt | Lite-S | ja | ja | ja | ja | ja | 169 USD |
| Chameleon Ultra | USB-C, BLE | lesen und emulieren | nein | nein | nein | emulieren und lesen | ja | ja | ja | 129 EUR |

</div>

---

## Was NFC.cool Tools mit jedem Chip macht

An dieser Stelle eines Beitrags taucht das auf, was ich gebaut habe, und hier gehört es auch hin, weil jede Zeile oben mit „Und was macht die App damit?“ endet. Die folgende Tabelle ist keine Werbung; ich habe sie beim Schreiben dieses Guides direkt aus dem Quellcode der App gezogen, und dabei sind mir zwei Dinge aufgefallen, die ich sonst falsch behauptet hätte.

| Chipfamilie | iPhone | Android | iPad und Mac mit Lesegerät |
| --- | --- | --- | --- |
| Erkennung nach Produkt | rund 60 Namen: NTAG203 bis 216, NTAG I2C, Ultralight und C, Ultralight EV1 nach Größe, Ultralight AES, Classic Mini, 1K und 4K, Plus 2K und 4K nach Security Level, DESFire EV1, EV2 und EV3 nach Größe, NTAG 424 DNA und seine TagTamper-Variante, ICODE SLI, SLI-S, SLI-L, SLIX, SLIX-S, SLIX-L und SLIX2, TI Tag-it Standard, Pro und Plus, ST25TV, ST25DV und M24LR, Infineon my-d, Fujitsu MB89R118, EM4233 und EM4423, FeliCa Lite und Standard plus Suica, PASMO, ICOCA, Edy, WAON und nanaco; EMV- und PIV-Karten werden als solche erkannt | rund 20 Namen: NTAG203, 213, 215 und 216, NTAG 424 DNA, DESFire, Classic Mini, 1K und 4K, Plus 2K und 4K, JCOP und SmartMX, FeliCa-Marken inklusive Octopus; ISO-15693-Chips werden nach Größe gemeldet, nicht nach Produkt | der Kartentyp aus dem Answer-to-Reset des Lesegeräts |
| NDEF lesen | jede Familie | jede Familie | Type 2, Type 4, FeliCa; Classic mit den öffentlichen Schlüsseln |
| NDEF schreiben, Tag leeren | Type 2, Type 4, Type 5, FeliCa Lite-S und Standard | Type 2, Type 5, MIFARE Classic mit dem NDEF-Verzeichnis, alles, was Android formatieren kann | Type 2, Type 4, FeliCa |
| Gesamten Speicher nullen | Type 5 | Type 2, Type 5, Classic | wie iPhone |
| Dauerhaft sperren | Lock-Bytes bei Type 2; NDEF schreibgeschützt bei Type 4, Type 5 und FeliCa; beim NTAG 424 DNA bewusst verweigert | Type 2 | ja |
| Passwort | NTAG213, 215, 216 und 203 | die Type-2-Familie | setzen ja; entfernen hängt vom Lesegerät ab |
| Scan-Zähler und Mirror | NTAG213, 215, 216 | NTAG213, 215, 216 | ja |
| Komplettes Speicherabbild | Type 2, ISO 15693, Dateiliste bei DESFire, FeliCa, Dateien des NTAG 424 DNA | Classic mit dem Werksschlüssel, Ultralight, ISO 15693, FeliCa, jeder Typ A | Type 2, Type 4, FeliCa |
| Inhalte von MIFARE Classic | nein; Core NFC hat kein CRYPTO1 | lesen mit dem Werksschlüssel, formatieren und schreiben mit den bekannten Schlüsseln | nur NDEF lesen |
| NTAG 424 DNA | Schlüssel, SUN im Klartext- und im verschlüsselten Modus, Dateizugriffsrechte, Chipkonfiguration, die Tresor-Datei, zufällige UID, LRP, Manipulationsstatus, Prüfung der Originalitätssignatur | dasselbe | dasselbe |
| Amiibo | Backup und Wiederherstellung von NTAG215, umgeschlüsselt auf den Ziel-Tag | dasselbe | ja |
| ISO-15693-Passwort, EAS, AFI | noch nicht | noch nicht | nein |
| Authentifizierung und Schreiben bei DESFire | nein | nein | nein |
| Rohbefehle | Experten-Modus für APDUs | ein Befehlskatalog | ja |

Die zwei Korrekturen, fürs Protokoll: Ich hätte geschrieben, dass die App die Originalitätssignatur auf NTAG21x-Tags prüft, und das tut sie nicht; das bekommt nur der 424. Und ich hätte geschrieben, dass die ISO-15693-Passwortbefehle schon drin sind, dabei sind sie eine Referenztabelle, die noch auf eine Oberfläche wartet. Beides steht auf der Liste.

---

## Kaufen, ohne reinzufallen

Was in einem Angebot stehen muss, bevor ich dort kaufe:

1. **Der genaue Chipname.** „NTAG213“ statt „NFC 213“; „ICODE SLIX2“ statt „ISO-15693-Tag“; „MIFARE Classic EV1 1K“ statt „1K-Karte“. Nennt das Angebot den Chip nicht, weiß es der Verkäufer entweder nicht, oder er will nicht, dass du es weißt.
2. **Der nutzbare Speicher in Byte**, und der sollte zum Chip passen: 144 beim NTAG213, 504 beim 215, 888 beim 216, 316 beim SLIX2. Eine „1K“, die sich als MIFARE Classic entpuppt, funktioniert nicht auf einem iPhone.
3. **Der Hersteller**, wenn das Angebot echte NXP- oder ST-Chips verspricht. Der Herstellercode in der UID sagt dir nach dem Kauf die Wahrheit, der Preis schon vorher. Niemand verkauft echte NTAG216-Sticker für ein Drittel des üblichen Preises.
4. **Antennengröße und Bauform.** Ein 10-mm-Inlay liest auf einen Zentimeter, eins mit 38 mm auf vier. Wo On-Metal draufsteht, muss On-Metal drin sein.
5. **Ob er NDEF-formatiert ist.** NTAG kommt vorformatiert; Ultralight EV1 und die meisten ISO-15693-Chips nicht. NFC.cool formatiert sie, aber es ist ein Schritt mehr.

Warnsignale: „NTAG215-kompatibel“ (es ist kein NTAG215), „verschlüsselt“ bei allem unterhalb von Sprosse 4 der Leiter, „funktioniert mit allen Handys“ bei einer MIFARE Classic und jeder Chipname mit einem Buchstaben, den der Hersteller nie verwendet hat, zum Beispiel SLIX3.

**Was Tags kosten.** Angebotspreise, die ich am 9. September 2026 bei Seritag, Shop NFC, GoToTags, NFCW Shop, NFC.CARDS, NFC-Tag-Shop.de, Tagstand und Digi-Key gesehen habe. Die meisten Shops verkaufen mindestens in Zehnerpacks, die Spalte „Einzeln“ ist also die kleinste Staffel, die sie anbieten. Preise ändern sich; nimm sie als Größenverhältnisse.

| Tag | Einzeln oder kleinste Staffel | Pro Stück ab 100 | Pro Stück ab 1.000 | Nackter Chip |
| --- | --- | --- | --- | --- |
| NTAG213-Sticker | 0,32 bis 0,65 EUR, 0,33 bis 0,58 USD | 0,29 bis 0,34 EUR | 0,23 bis 0,24 EUR, 0,50 USD | 0,14 USD bei Wafer-Mengen |
| NTAG215-Sticker oder -Karte | 0,48 bis 0,54 USD, 0,64 bis 0,67 GBP | 0,35 USD | 0,33 USD | 0,21 USD |
| NTAG216-Sticker | 0,97 EUR, 0,71 USD | 0,70 EUR, 0,61 USD | 0,56 EUR, 0,56 USD | 0,37 USD |
| NTAG-424-DNA-Sticker | 0,63 EUR, 0,90 USD | 0,62 EUR, 0,77 USD | 0,57 EUR, 0,68 USD | 0,79 USD einzeln, 0,51 ab 1.000 |
| MIFARE-Classic-1K-Karte | 1,35 bis 1,59 EUR im Zehnerpack; 6,69 EUR als einzelne Karte im Handel | 1,29 bis 1,52 EUR, 1,98 USD | 0,95 bis 1,13 EUR, 0,86 USD | |
| DESFire-EV3-Karte | 1,85 bis 2,79 EUR | 1,85 bis 2,45 EUR | 1,35 bis 2,29 EUR | 1,18 USD bei 31.000 Stück |
| ICODE-SLIX2-Etikett | 0,69 EUR | 0,34 bis 0,37 EUR | 0,22 bis 0,25 EUR | 0,35 USD einzeln, 0,22 ab 1.000 |
| ST25TV02KC-Inlay | 0,32 bis 0,87 USD | 0,30 bis 0,79 USD | 0,28 bis 0,77 USD | 0,13 USD pro Rolle |

Das Muster ist das, was du vermuten würdest: Speicher kostet fast nichts, Kryptografie ungefähr das Doppelte, und die Bauform kostet mehr als der Chip. Ein nackter NTAG213-Die kostet vierzehn Cent; den Großteil des Preises macht der Sticker drumherum aus.

Wo kaufen: Die Tags und Lesegeräte, die ich selbst nutze, liste ich auf der [Seite mit Affiliate-Links](/affiliate-links/), und die 424-Tags, mit denen die ganzen DNA-Funktionen angefangen haben, stammen von AliExpress. Ich werde dir also nicht erzählen, dass Marktplätze tabu sind. Prüf mit der App, was ankommt, bevor du irgendetwas draufschreibst.

---

## Der komplette Katalog in einer Tabelle

Eine Zeile pro Chip. „Nutzbare Byte“ ist das, was du beschreiben kannst; bei DESFire ist es NXPs Angabe zum nutzbaren Speicher. Die Handy-Spalten sagen, was die Plattform kann, nicht, was jede App macht; die Spalte NFC.cool sagt, was meine App macht. Auf dem Handy seitlich scrollen, die erste Spalte bleibt stehen.

<div class="table-scroll sticky-first">

| Chip | Hersteller | Forum-Typ | Standard | Nutzbare Byte | UID | Schutz | Schreibzyklen / Datenerhalt | iPhone | Android | NFC.cool | Am besten für |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 210µ | NXP | 2 | 14443-A | 48 | 7 | Lock-Bits | 100k / 10 J. | NDEF, roh | NDEF, roh | lesen, schreiben | winzige Wegwerf-Tags |
| NTAG210 | NXP | 2 | 14443-A | 48 | 7 | Passwort | 100k / 10 J. | NDEF, roh | NDEF, roh | lesen, schreiben | kleine Antennen |
| NTAG212 | NXP | 2 | 14443-A | 128 | 7 | Passwort | 100k / 10 J. | NDEF, roh | NDEF, roh | lesen, schreiben | kleine Antennen mit etwas mehr Platz |
| NTAG213 | NXP | 2 | 14443-A | 144 | 7 | Passwort, Zähler, Mirror | 100k / 10 J. | NDEF, roh | NDEF, roh | alles | der Standard-Sticker |
| NTAG215 | NXP | 2 | 14443-A | 504 | 7 | Passwort, Zähler, Mirror | 100k / 10 J. | NDEF, roh | NDEF, roh | alles, Amiibo | Amiibo, mittelgroße Datenmengen |
| NTAG216 | NXP | 2 | 14443-A | 888 | 7 | Passwort, Zähler, Mirror | 100k / 10 J. | NDEF, roh | NDEF, roh | alles | Kontakte, die sichere Wahl |
| NTAG213F, 216F | NXP | 2 | 14443-A | 144, 888 | 7 | Passwort, Field-Detect-Pin | 100k / 10 J. | wie 213 | wie 213 | wie 213 | in Elektronik verbaute Tags |
| NTAG 213 TT | NXP | 2 | 14443-A | 144 | 7 | Passwort, Manipulationsdraht | 100k / 10 J. | wie 213 | wie 213 | wie 213 | Siegel |
| NTAG203 | NXP | 2 | 14443-A | 144 | 7 | Sperre, OTP | 10k / 5 J. | NDEF | NDEF | lesen, schreiben, Passwort | Altbestände |
| NTAG I2C plus | NXP | 2 | 14443-A | 888, 1912 | 7 | Passwort | 200k bis 500k / 20 J. | NDEF, roh | NDEF, roh | erkennt, liest, schreibt | Elektronik mit MCU |
| NTAG 223, 224 DNA | NXP | 2 | 14443-A | 144, 208 | 7 | Passwort oder AES, SUN | 100k / 10 J. | NDEF, roh | NDEF, roh | wie Type 2 | günstiger Echtheitsnachweis |
| NTAG 22x DNA StatusDetect | NXP | 2 | 14443-A | 144, 208 | 7 | wie oben, Sensor | 100k / 10 J. | NDEF, roh | NDEF, roh | wie Type 2 | Siegel und Sensorik |
| NTAG 413 DNA | NXP | 4 | 14443-4 | 160 | 7 | 3 AES-Schlüssel, SUN | 200k / 50 J. | NDEF, APDU | NDEF, APDU | erkennt | eingestellt |
| NTAG 424 DNA | NXP | 4 | 14443-4 | 416 | 7 | 5 AES-Schlüssel, SUN, LRP | 200k / 50 J. | NDEF, APDU | NDEF, APDU | vollständige Konfiguration | Echtheitsnachweis |
| NTAG 424 DNA TT | NXP | 4 | 14443-4 | 416 | 7 | wie oben, Manipulation | 200k / 50 J. | NDEF, APDU | NDEF, APDU | vollständige Konfiguration | Echtheitssiegel |
| Ultralight | NXP | 2 | 14443-A | 48 | 7 | Sperre, OTP | 10k / 5 J. | NDEF | NDEF | lesen, schreiben | eingestellt |
| Ultralight C | NXP | 2 | 14443-A | 144 | 7 | 3DES | 100k / 10 J. | NDEF, roh | NDEF, roh | lesen, schreiben | ältere Fahrscheine |
| Ultralight EV1 | NXP | 2 | 14443-A | 48, 128 | 7 | Passwort, 3 Zähler | 100k / 10 J. | NDEF, roh | NDEF, roh | lesen, schreiben, Passwort | Fahrscheine, Wegwerf-Tags |
| Ultralight AES | NXP | 2 | 14443-A | 144 | 7 | AES-128 | 100k / 10 J. | NDEF, roh | NDEF, roh | lesen, schreiben | Type 2 mit Authentifizierung |
| Ultralight Nano | NXP | 2 | 14443-A | 40 | 7 | Sperre, OTP | 100k / 10 J. | NDEF | NDEF | lesen, schreiben | Einzelfahrscheine |
| Classic Mini | NXP | keiner | 14443-A | 224 | 4 | CRYPTO1 | 100k / 10 J. | UID | abhängig vom Controller | Android: lesen, formatieren | nichts |
| Classic 1K, EV1 | NXP | keiner | 14443-A | 752 | 4 oder 7 | CRYPTO1 | 100k / 10 J. | UID | abhängig vom Controller | Android: lesen, formatieren | nichts |
| Classic 4K, EV1 | NXP | keiner | 14443-A | 3440 | 4 oder 7 | CRYPTO1 | 100k / 10 J. | UID | abhängig vom Controller | Android: lesen, formatieren | nichts |
| Plus SE | NXP | keiner | 14443-A | 752 | 4 oder 7 | AES in SL3 | 100k / 10 J. | UID | wie Classic | erkennt | Umstieg von Classic |
| Plus EV2 | NXP | keiner | 14443-4 in SL3 | 1520, 3440 | 4 oder 7 | AES-128, EAL5+ | 200k / 25 J. | ISO-DEP | IsoDep | erkennt | Zugangskontrolle |
| DESFire EV1 | NXP | 4 | 14443-4 | 2304 bis 7936 | 7 | DES, 3DES, AES | 200k / 10 J. | NDEF, APDU | NDEF, APDU | erkennt, listet Dateien | ältere Nahverkehrssysteme |
| DESFire EV2 | NXP | 4 | 14443-4 | 2560 bis 16384 | 7 | AES, EAL5+ | 200k / 25 J. | NDEF, APDU | NDEF, APDU | erkennt, listet Dateien | Zugangskontrolle |
| DESFire EV3 | NXP | 4 | 14443-4 | 2560 bis 16384 | 7 | AES, SUN, EAL5+ | mind. 200k, typ. 1M / 25 J. | NDEF, APDU | NDEF, APDU | erkennt, listet Dateien | Zugangskontrolle, Nahverkehr |
| DESFire Light | NXP | 4 | 14443-4 | 640 | 7 | AES, LRP, EAL4 | 200k / 10 J. | NDEF, APDU | NDEF, APDU | erkennt | Karten mit nur einer Anwendung |
| ICODE SLI | NXP | 5 | 15693 | 112 | 8 | Sperre | 100k / 10 J. | NDEF, roh | NfcV | lesen, schreiben, formatieren | abgekündigt |
| ICODE SLI-S, SLI-L | NXP | 5 | 15693 | 160, 32 | 8 | Passwörter | 100k / 10 J. | NDEF, roh | NfcV | lesen, schreiben, formatieren | wird nicht mehr hergestellt |
| ICODE SLIX | NXP | 5 | 15693 | 112 | 8 | Passwort für EAS/AFI | 100k / 50 J. | NDEF, roh | NfcV | lesen, schreiben, formatieren | Bestände in Bibliotheken und Logistik |
| ICODE SLIX-S, SLIX-L | NXP | 5 | 15693 | 160, 32 | 8 | Passwörter, Privacy | 100k / 50 J. | NDEF, roh | NfcV | lesen, schreiben, formatieren | Logistik |
| ICODE SLIX2 | NXP | 5 | 15693 | 316 | 8 | Passwörter, Privacy, Zähler, Signatur | 100k / 50 J. | NDEF, roh | NfcV | lesen, schreiben, formatieren | Inventur, OpenPrintTag-Spulen |
| ICODE DNA | NXP | 5 | 15693 | 252 | 8 | AES-128 | 100k / 50 J. | NDEF, roh | NfcV | liest als ISO 15693 | Markenschutz auf Distanz |
| ICODE 3 | NXP | 5 | 15693 | 300 | 8 | Passwörter, Scan-Zähler, Mirror, Signatur | 100k / 50 J. | NDEF, roh | NfcV | liest als ISO 15693 | der aktuelle Inventur-Chip |
| NTAG 5 | NXP | 5 | 15693 | 512, 2048 | 8 | Passwörter, AES beim 5332 | 1M / 40 J. | NDEF, roh | NfcV | liest als ISO 15693 | vernetzte Elektronik |
| ST25TN512, 01K | ST | 2 | 14443-A | 64, 160 | 7 | Kill, Tap Code, TruST25 | 100k / 40 J. | NDEF, roh | NDEF, roh | liest als Type 2 | die Alternative zum NTAG213 |
| ST25TV512C, 02KC | ST | 5 | 15693 | 64, 320 | 8 | Passwörter, Kill, Privacy, Tap Code, TruST25 | 100k / 60 J. | NDEF, roh | NfcV | erkennt ST25TV, liest, schreibt | Etiketten mit frischer URL bei jedem Scan |
| ST25TV16K, 64K | ST | 5 | 15693 | 2048, 8192 | 8 | 64-Bit-Passwörter, Kill | 1M / 40 J. | NDEF, roh | NfcV | lesen, schreiben | großer Type-5-Speicher |
| ST25DV04K bis 64K | ST | 5 | 15693 | 512 bis 8192 | 8 | 64-Bit-Passwörter | 1M / 40 J. | NDEF, roh | NfcV | erkennt ST25DV, liest, schreibt | dynamische Tags mit MCU |
| M24LR | ST | keiner angegeben | 15693 | 512 bis 8192 | 8 | 32-Bit-Passwörter | 1M / 40 J. | NDEF, roh | NfcV | liest als ST25TV | älteres Dual Interface |
| ST25TA02K, 02KB | ST | 4 | 14443-4 | 256 | 7 | 128-Bit-Passwörter, Zähler, TruST25 beim B | 1M / 200 J. | NDEF, APDU | NDEF, APDU | lesen, schreiben | Type 4 ohne DESFire |
| ST25TA16K, 64K | ST | 4 | 14443-4 | 2048, 8192 | 7 | 128-Bit-Passwörter | 1M / 200 J. | NDEF, APDU | NDEF, APDU | lesen, schreiben | großer Type-4-Speicher |
| TI Tag-it HF-I Standard, Pro, Plus | TI | keiner angegeben | 15693 | 32, 32, 256 | 8 | Sperre; Pro hat zusätzlich passwortgeschütztes Schreiben und Kill | 100k / 10 J. | NDEF, roh | NfcV | erkennt, liest | ältere Bibliotheken |
| EM4233 | EM | keiner angegeben | 15693 | 208 | 8 | 96-Bit-Schlüssel, Privacy, Zerstören | ? / 60 J. | NDEF, roh | NfcV | erkennt, liest | auf Anfrage |
| EM4425 em echo-V | EM | 5 | 15693 plus UHF | bis 256 | 8 | AES-128, Passwörter, Manipulation | 100k / 50 J. | NDEF, roh | NfcV | liest als ISO 15693 | Einzelhandel mit zwei Frequenzen |
| Infineon my-d move | Infineon | 2 | 14443-A | 128 | 7 | Passwort, Wertzähler | 100k / 10 J. | NDEF, roh | NDEF, roh | erkennt, liest | Ticketing |
| Fudan FM11NT021 | Fudan | 2 | 14443-A | 144 | 7 | Passwort, Zähler | angeblich 500k / 10 J. | NDEF, roh | NDEF, roh | liest als generischer Type 2 | billige Link-Sticker |
| Fudan FM11RF08, 08S | Fudan | keiner | 14443-A | 752 | 4 | CRYPTO1, mit Hintertür | ? | UID | abhängig vom Controller | wie Classic | nichts |
| Topaz 96, 512 | Innovision, Broadcom | 1 | 14443-A | 96, etwa 480 | 7 | einmalige Sperren | 10k / 5 J. | NDEF | NDEF | NDEF | Altbestand |
| FeliCa Lite-S | Sony | 3 | 18092, JIS X 6319-4 | 224 | 8 (IDm) | 3DES-MAC | ? | NDEF, roh | NfcF | lesen, schreiben | Japan |
| FeliCa Standard | Sony | 3 | 18092 | 4 kB | 8 | AES, EAL6+ | ? | NDEF, roh | NfcF | lesen, Marken | Nahverkehr und E-Geld |
| Kovio NFC Barcode | Kovio, Thinfilm | keiner | proprietär | 16, nur lesbar | keine | keiner | entfällt | nein | NfcBarcode | nein | vom Markt verschwunden |
| ST SRI512, SRT512, SRI4K | ST | keiner | 14443-B | 64, 512 | 8 | Zähler, Sperre | 1M / 40 J. | nein | NfcB | nein | Nahverkehr mit Typ B |

</div>

---

## Die Vergleiche, nach denen alle suchen

**NTAG213 vs. NTAG215 vs. NTAG216.** Derselbe Chip in drei Speichergrößen: 144, 504 und 888 Byte, mit demselben Passwort, Zähler, Mirror und derselben Signatur. Nimm den 213 für einen Link, den 215 für Amiibo und den 216 für eine Kontaktkarte oder wenn du nicht nachdenken willst. Der Preisunterschied liegt bei etwa dreißig Cent.

**NTAG213 vs. Ultralight EV1.** Dieselbe Luftschnittstelle, dieselben Befehle; der NTAG hat den ASCII-Mirror und einen vorab beschriebenen Capability Container, der EV1 hat drei Einwegzähler und kommt mit 48 oder 128 Byte. Für Sticker nimmst du den NTAG, für Fahrscheine den EV1.

**NTAG213 vs. ST25TN01K vs. Fudan FM11NT021.** Drei Type-2-Chips mit 144 bis 160 Byte. Der NTAG hat ein Passwort und einen Lesezähler und antwortet auf GET_VERSION; der ST25TN hat mehr Speicher, einen Kill-Befehl, einen Tap Code und TruST25, aber kein Passwort; der Fudan übernimmt die Funktionen des NTAG bis auf GET_VERSION und, laut seinem aktuellen Datenblatt, die Signatur. Für einen schlichten Link taugt jeder davon; für einen Zähler oder Amiibo nur der NTAG.

**MIFARE Classic vs. DESFire.** Kein Wettbewerb. Die Chiffre der Classic wurde 2008 geknackt, und ihr häufigster Klon hatte 2024 eine Hintertür; DESFire EV3 hat AES, Schlüsselmanagement, eine EAL5+-Zertifizierung und SUN. Das einzige Argument für Classic ist, dass das Lesegerät an der Wand 2009 montiert wurde.

**NTAG 424 DNA vs. NTAG213.** Der 424 signiert jeden Scan mit AES-128 und speichert 416 Byte in drei Dateien mit fünf Schlüsseln; der 213 speichert 144 Byte mit einem 32-Bit-Passwort. Lautet die Frage „Ist dieses Produkt echt?“, kann nur der 424 sie beantworten. Lautet sie „Öffnet dieser Sticker einen Link?“, erledigt das der 213 für ein Drittel des Preises.

**NTAG 424 DNA vs. NTAG 223 DNA.** Beide können SUN. Der 424 ist Type 4 mit fünf Schlüsseln, LRP, optionaler zufälliger UID, einer Tresor-Datei und 50 Jahren Datenerhalt; der 223 ist ein Type-2-Sticker mit einem SUN-Schlüssel, einem 32-Bit-Passwort und 10 Jahren Datenerhalt. Der 223 ist der günstigere Weg zu einer signierten URL auf einem Etikett; für den 424 gibt es heute schon eine App, die ihn konfigurieren kann.

**ICODE SLIX2 vs. NTAG216 für die Inventur.** Ist ein Handy das einzige Lesegerät, hat der NTAG216 mehr Speicher und den Zähler. Kommt ein Gate oder ein Handlesegerät ins Spiel, liest der SLIX2 auf einen Meter und der NTAG auf vier Zentimeter, und damit ist die Sache entschieden.

**FeliCa vs. NTAG in Japan.** Eine japanische Fahrkartenschranke spricht FeliCa und sonst nichts; ein japanisches Handy liest beides. Für einen Tag auf einem Poster in Tokio ist NTAG völlig in Ordnung. Für alles, was ein Suica-Lesegerät akzeptieren muss, brauchst du FeliCa, und das ist kein Chip, den du mit einer Handy-App programmierst.

---

## Fragen und Antworten

### Soll ich NTAG215 oder NTAG216 kaufen?

Den 216, außer du schreibst Amiibo. Er hat 888 Byte gegenüber den 504 des 215, dasselbe Passwort, denselben Zähler und Mirror und denselben Handy-Support. Den 215 gibt es in jedem Shop, weil Nintendos Figuren ihn nutzen, und wenn genau das dein Vorhaben ist, ist er die einzige Wahl.

### Kann ein iPhone MIFARE-Classic-Tags lesen?

Es kann erkennen, dass einer da ist. Core NFC liest die UID und den SAK und hört dann auf; Apples API hat keine Classic-Familie, und die Dokumentation sagt, dass der MIFARE-Befehl „das Crypto1-Protokoll nicht unterstützt“. Keine App kann auf einem iPhone einen Sektor lesen. Android-Handys mit einem NFC-Controller von NXP können das; Handys mit manchen anderen Controllern nicht, und auf denen taucht die Klasse `MifareClassic` gar nicht erst auf.

### Wie oft kann ich einen NFC-Tag neu beschreiben?

100.000 Mal bei allem Aktuellen von NXP oder ST bei Raumtemperatur, und die Werte im Datenblatt sind Mindestwerte. Ein DESFire EV3 oder ein ST25DV ist auf eine Million ausgelegt. Der alte NTAG203, der ursprüngliche Ultralight und der Topaz waren auf 10.000 ausgelegt. Niemand beschreibt einen Sticker zehntausend Mal neu; wichtig ist die Zahl bei Zählern und bei Tags, die Daten protokollieren.

### Aus welcher Entfernung funktioniert ein NFC-Tag?

Mit einem Handy bis etwa vier Zentimeter bei einer Antenne im Kartenformat und etwa zwei bei einem kleinen Sticker, wenn du die richtige Stelle am Handy triffst. Die NFC-Forum-Definition selbst sagt „bis zu 2 cm“. Ein ISO-15693-Tag funktioniert an einem Gate-Lesegerät mit großer Antenne auf einen Meter, ein Handy liest ihn aber auf dieselben paar Zentimeter wie alles andere, vielleicht auf das Doppelte eines Type-2-Tags.

### Laufen NFC-Tags ab oder nutzen sie sich ab?

Die Daten auf dem Chip sind bei den meisten Chips für Endkunden auf 10 Jahre ausgelegt, beim NTAG 424 DNA und der ICODE-SLIX-Familie auf 50, beim ST25TV auf 60 und beim ST25TA auf 200, jeweils bei Raumtemperatur. Hitze verkürzt das. In der Praxis geben Kleber, Papieroberfläche und Antenne lange vor dem EEPROM auf.

### Kann ich billige NFC-Tags von Marktplätzen bedenkenlos kaufen?

Unbedenklich sind sie; ob sie halten, was sie versprechen, ist eine andere Frage. Ein billiger „NTAG213“ ist oft ein Fudan FM11NT021, der für einen Link funktioniert und bei allem scheitert, was GET_VERSION abfragt. Ein billiger „NTAG215“ ist oft keiner, und für Amiibo taugt er dann nicht. Prüf in der App Herstellercode und Chipnamen, bevor du etwas draufschreibst, und kauf bei einem Shop, der den Chip benennt.

### Kann mein Handy mit einer NFC-App meine Bankkarte oder meinen Reisepass lesen?

Den Reisepass ja: Mit der maschinenlesbaren Zone als Schlüssel kann eine App die Datengruppen des Chips lesen, und NFC.cool macht das auf beiden Plattformen. Die Bankkarte ist eine EMV-Chipkarte; eine App kann ihre Anwendungsliste und einige öffentliche Datensätze lesen, aber Apple sperrt das Auslesen von Zahlungskarten in Core NFC, die Kartenprüfnummer steht nicht auf dem Chip, und jede Transaktion wird mit einem Schlüssel signiert, der die Karte nie verlässt. Es gibt also nichts zu kopieren.

### Warum taucht mein Büroausweis oder meine Hotelkarte nicht in der App auf?

Die meisten Büroausweise sind 125-kHz-Proximity-Karten, die die 13,56-MHz-Spule eines Handys nicht einmal wahrnehmen kann. Die meisten Hotelkarten und älteren Fahrkarten sind MIFARE Classic, die ein iPhone nur erkennen und ein Android-Handy nur mit dem richtigen Controller und den richtigen Schlüsseln lesen kann. Beides kann keine App beheben, und das sage ich lieber offen, als dir einen Workaround zu verkaufen.

### Kann ich einen schreibgeschützten NFC-Tag wieder entsperren?

Nein. Die Lock-Bits auf einem Type-2- oder Type-5-Tag sind Einwegbits im Chip, und mit dem Read-only-Flag im Capability Container ist es dasselbe. Ein Passwort lässt sich entfernen, wenn du es kennst, eine Sperre nicht. Deshalb fragt NFC.cool zweimal nach, bevor es irgendetwas sperrt.

### Ist das NTAG-Passwort echte Sicherheit?

Es hält Leute mit einer kostenlosen App ab, und das sind die meisten. Gegen jemanden mit einem Lesegerät, das mithören kann, hilft es nicht, weil das 32-Bit-Passwort unverschlüsselt über die Luft geht und der Tag mit einer 16-Bit-Bestätigung antwortet. Für alles, was einem entschlossenen Angreifer standhalten muss, beginnt die Leiter bei AES: Ultralight AES für einen Type-2-Sticker, NTAG 424 DNA, wenn der Scan selbst etwas beweisen muss.

### Welchen Tag brauche ich für Amiibo?

Einen NTAG215, und nur einen NTAG215. Die Konsole fragt GET_VERSION ab, authentifiziert sich mit einem aus der UID abgeleiteten Passwort und liest alle 135 Pages. Ein Chip ohne GET_VERSION oder mit einer anderen Page-Anzahl scheitert schon am ersten Befehl. Ein Amiibo auf einen Tag zu schreiben ist endgültig, weil die Lock-Bytes und das Passwort zum Format gehören.

### Welcher NFC-Tag funktioniert auf einer Metallfläche?

Jeder Chip in einer On-Metal-Bauform, also mit einer Ferritfolie zwischen Antenne und Metall. Ein normaler Tag auf Stahl wird überhaupt nicht gelesen; ein On-Metal-Tag erreicht ungefähr vier Fünftel seiner normalen Reichweite. Wenn du drei Millimeter von irgendetwas Nichtmetallischem zwischen einen normalen Tag und das Metall bekommst, klappt das auch.

### Funktioniert NFC.cool auf iPad und Mac?

Ja, seit Version 6.15.0, über ein USB-Smartcard-Lesegerät; keins der beiden Geräte hat ein eigenes NFC-Funkmodul. Getestet habe ich das HID OMNIKEY 5022 CL, und vom ACS ACR1552U und ACR1255U-J1 haben mir Nutzer gemeldet, dass sie funktionieren. Alles, was auf Type 2, Type 4 und FeliCa mit dem Handy funktioniert, klappt auch über das Lesegerät, MIFARE Classic allerdings nur lesend.

---

## Glossar

| Begriff | Bedeutung |
| --- | --- |
| AFI | Application Family Identifier, ein Byte auf ISO-15693-Tags, mit dem ein Lesegerät gezielt nur Tags einer bestimmten Art erfassen kann |
| APDU | Application Protocol Data Unit, das Befehls- und Antwortformat aus ISO 7816-4, das jeder ISO-DEP-Chip nutzt |
| ATQA | Answer To Request, die ersten zwei Byte, die ein Typ-A-Chip schickt; laut NXP soll man Chips nicht daran erkennen |
| AUTH0 | das Konfigurationsbyte beim NTAG, das die erste passwortgeschützte Page festlegt |
| AUTHLIM | die NTAG-Einstellung, die den Tag nach einer festgelegten Zahl falscher Passwortversuche sperrt |
| CC | Capability Container, die vier Byte (bei Type 4 die Datei), die einem Lesegerät sagen, dass der Tag NDEF enthält und wie viel |
| CMAC | ein mit AES berechneter Message Authentication Code; das, was eine SUN-Nachricht fälschungssicher macht |
| CRYPTO1 | NXPs proprietäre 48-Bit-Stromchiffre in MIFARE Classic, 2008 geknackt |
| DSFID | Data Storage Format Identifier, ein Byte bei ISO 15693, das beschreibt, wie der Speicher organisiert ist |
| EAS | Electronic Article Surveillance, das Bit auf ISO-15693-Tags, das die Diebstahlschranke im Laden Alarm schlagen lässt |
| GET_VERSION | der NXP-Befehl, der acht Byte mit Hersteller, Typ, Generation und Größe des Chips zurückgibt |
| ISO-DEP | das Transportprotokoll nach ISO/IEC 14443-4; ein Chip, der es spricht, antwortet mit SAK 20 und nimmt APDUs an |
| Lastmodulation | so sendet ein passiver Tag Daten: Er schaltet eine Last an seiner Antenne, und das Lesegerät spürt das in seinem eigenen Feld |
| LRP | Leakage Resilient Primitive, ein AES-Modus beim NTAG 424 DNA und bei DESFire Light, der Seitenkanalangriffen widersteht |
| MAD | MIFARE Application Directory, Sektor 0 einer Classic-Karte, in dem steht, was die anderen Sektoren enthalten |
| Mirror | die NTAG-Funktion, die UID und Zähler bei jedem Lesen als ASCII in die NDEF-Nachricht einfügt |
| NDEF | NFC Data Exchange Format, der Container für Datensätze, den jedes Handy liest |
| NUID | Non-Unique Identifier, NXPs Bezeichnung für eine 4-Byte-UID |
| OTP | One Time Programmable, Bits, die sich einmal setzen und nie wieder zurücksetzen lassen |
| PACK | Password Acknowledge, die zwei Byte, die ein NTAG nach einem richtigen Passwort zurückgibt |
| PICC, PCD | die Bezeichnungen der Standards für die Karte und das Lesegerät |
| Random ID | ein Modus, in dem der Chip bei der Antikollision jedes Mal mit einer neuen zufälligen 4-Byte-ID antwortet, zum Schutz der Privatsphäre |
| READ_SIG | der Befehl, der die Originalitätssignatur eines Chips zurückgibt |
| SAK | Select Acknowledge, das Byte, das ein Typ-A-Chip nach der Auswahl zurückgibt; seine Bits sortieren Chips in Familien |
| SDM | Secure Dynamic Messaging, der Mechanismus hinter SUN beim NTAG 424 DNA und DESFire EV3 |
| SUN | Secure Unique NFC, eine URL, die bei jedem Scan einen frischen kryptografischen Nachweis mitbringt |
| T5T, T2T, T4T | die Kurzformen des NFC Forum für Type-5-, Type-2- und Type-4-Tags |
| TLV | Tag-Length-Value, der Rahmen um eine NDEF-Nachricht auf Type-2- und Type-5-Chips |
| TruST25 | STs Originalitätssignatur über die UID |
| UID | die im Werk programmierte Kennung des Chips, 4, 7 oder 8 Byte lang |

---

## Quellen und Links zum Weiterlesen

Jede Tabelle in diesem Guide habe ich gegen eine dieser Quellen geprüft. Die Preise stammen von den im Kaufabschnitt genannten Shops, Stand 9. September 2026.

**NXP NTAG**

- [Datenblatt NTAG213/215/216, Rev 3.2](https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf)
- Datenblätter [NTAG210/212](https://www.nxp.com/docs/en/data-sheet/NTAG210_212.pdf), [NTAG 210µ](https://www.nxp.com/docs/en/data-sheet/NT2L1001_NT2H1001.pdf), [NTAG213F/216F](https://www.nxp.com/docs/en/data-sheet/NTAG213F_216F.pdf) und [NTAG 213 TT](https://www.nxp.com/docs/en/data-sheet/NT2H1311TT.pdf)
- Datenblätter [NTAG 223 DNA](https://www.nxp.com/docs/en/data-sheet/NT2H2331G0.pdf) und [NTAG 224 DNA StatusDetect](https://www.nxp.com/docs/en/data-sheet/NT2H2421S0.pdf)
- Datenblätter [NTAG 424 DNA](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf) und [NTAG 424 DNA TagTamper](https://www.nxp.com/docs/en/data-sheet/NT4H2421Tx.pdf) sowie [AN12196, die Features-and-Hints-Note zum 424 mit dem öffentlichen Originalitätsschlüssel](https://www.nxp.com/docs/en/application-note/AN12196.pdf)
- Datenblätter [NTAG I2C plus](https://www.nxp.com/docs/en/data-sheet/NT3H2111_2211.pdf) und [NTAG 5 boost](https://www.nxp.com/docs/en/data-sheet/NTA5332.pdf)
- [AN13089, NTAG 21x features and hints](https://www.puntoflotante.net/AN13089.pdf), dazu, warum eine statische Originalitätssignatur keine Garantie gegen Klone ist (Spiegel; die Version auf nxp.com ist nicht öffentlich)

**NXP MIFARE**

- Datenblätter [MIFARE Ultralight](https://www.nxp.com/docs/en/data-sheet/MF0ICU1.pdf), [Ultralight C](https://www.nxp.com/docs/en/data-sheet/MF0ICU2.pdf), [Ultralight EV1](https://www.nxp.com/docs/en/data-sheet/MF0ULX1.pdf) und [Ultralight AES](https://www.nxp.com/docs/en/data-sheet/MF0AES(H)20.pdf)
- Datenblätter [MIFARE Classic EV1 1K](https://www.nxp.com/docs/en/data-sheet/MF1S50YYX_V1.pdf) und [Classic EV1 4K](https://www.nxp.com/docs/en/data-sheet/MF1S70YYX_V1.pdf)
- Kurzdatenblätter [MIFARE Plus S](https://www.nxp.com/docs/en/data-sheet/MF1SPLUSX0Y1_SDS.pdf), [Plus SE](https://www.nxp.com/docs/en/data-sheet/MF1SEP_H_10X1_SDS.pdf) und [Plus EV2](https://www.nxp.com/docs/en/data-sheet/MF1P(H)x2.pdf)
- Datenblätter [DESFire EV1](https://www.nxp.com/docs/en/data-sheet/MF3ICDX21_41_81_SDS.pdf), [DESFire EV2](https://www.nxp.com/docs/en/data-sheet/MF3DX2_MF3DHX2_SDS.pdf), [DESFire EV3](https://www.nxp.com/docs/en/data-sheet/MF3D_H_X3_SDS.pdf) und [DESFire Light](https://www.nxp.com/docs/en/data-sheet/MF2DLHX0.pdf) sowie [AN12752 zum nutzbaren DESFire-Speicher](https://www.nxp.com/docs/en/application-note/AN12752.pdf)
- [AN10833, Erkennung von MIFARE-Typen](https://www.nxp.com/docs/en/application-note/AN10833.pdf), [AN10927, MIFARE-UIDs](https://www.nxp.com/docs/en/application-note/AN10927.pdf), [AN1305, NDEF auf MIFARE Classic](https://www.nxp.com/docs/en/application-note/AN1305.pdf), [AN10787, das MIFARE Application Directory](https://www.nxp.com/docs/en/application-note/AN10787.pdf), [AN11004, DESFire als Type-4-Tag](https://www.nxp.com/docs/en/application-note/AN11004.pdf)

**NXP ICODE**

- Datenblätter [ICODE SLIX](https://www.nxp.com/docs/en/data-sheet/SL2S2002_SL2S2102.pdf), [SLIX-S](https://www.nxp.com/docs/en/data-sheet/SL2S5302_SL2S5402.pdf), [SLIX-L](https://www.nxp.com/docs/en/data-sheet/SL2S5002_SL2S5102.pdf), [SLIX2](https://www.nxp.com/docs/en/data-sheet/SL2S2602.pdf), [ICODE DNA](https://www.nxp.com/docs/en/data-sheet/SL2S6002_SDS.pdf) und [ICODE 3](https://www.nxp.com/docs/en/data-sheet/SL2S3003_SL2S3003TT.pdf)
- [AN11809, der Vergleich der ICODE-Familie](https://www.nxp.com/docs/en/application-note/AN11809.pdf)

**STMicroelectronics, TI, EM, Sony, Fudan**

- Datenblätter von ST: [ST25TV02KC](https://www.st.com/resource/en/datasheet/st25tv02kc.pdf), [ST25TN01K](https://www.st.com/resource/en/datasheet/st25tn01k.pdf), [ST25DV64KC](https://www.st.com/resource/en/datasheet/st25dv64kc.pdf), [ST25TA02KB](https://www.st.com/resource/en/datasheet/st25ta02kb.pdf) und [M24LR64E-R](https://www.st.com/resource/en/datasheet/m24lr64e-r.pdf), dazu [AN5658 zu Augmented NDEF](https://www.st.com/resource/en/application_note/an5658-augmented-ndef-messages-with-st25tv512c-and-st25tv02kc-devices-stmicroelectronics.pdf) und [TA0358 zu TruST25](https://www.st.com/resource/en/technical_article/ta0358-developing-supply-chain-confidence-with-trust25-digital-signature-in-rfidnfc-tags-stmicroelectronics.pdf)
- Datenblätter TI Tag-it HF-I [Standard](https://www.ti.com/lit/ds/scbs828c/scbs828c.pdf), [Pro](https://www.ti.com/lit/ds/scbs822c/scbs822c.pdf) und [Plus](https://www.ti.com/lit/ds/scbs827b/scbs827b.pdf)
- EM Microelectronic [EM4233](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em4233), [EM4423](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em-echo-em4423) und [EM4425](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em-echo-v)
- Sony [Datenblatt FeliCa Lite-S](https://www.sony.co.jp/en/Products/felica/business/data/RC-S966_E.pdf) und [FeliCa Standard RC-SA01](https://www.sony.co.jp/en/Products/felica/business/products/RC-SA01.html)
- [Datenblatt Fudan FM11NT021](https://github.com/user-attachments/files/16667599/FM11NT021_sds_eng.pdf)

**Sicherheitsforschung und Standards**

- Quarkslab, [MIFARE Classic: exposing the static encrypted nonce variant and a few hardware backdoors](https://blog.quarkslab.com/mifare-classic-static-encrypted-nonce-and-backdoors.html) (2024)
- Nohl, Evans, Starbug und Plötz, [Reverse-Engineering a Cryptographic RFID Tag](https://www.usenix.org/legacy/event/sec08/tech/full_papers/nohl/nohl.pdf) (USENIX Security 2008)
- Garcia et al., [Dismantling MIFARE Classic](https://link.springer.com/chapter/10.1007/978-3-540-88313-5_7) (ESORICS 2008)
- [ISO/IEC JTC1/SC17 Standing Document 5, das Register der IC-Hersteller](https://www.aimglobal.org/wp-content/uploads/2022/04/ISO_IEC_JTC1_SC17_Standing_Document_5_Register_of_IC_Manufacturers.pdf)
- [Notizen zu Magic-Karten im Proxmark3-Projekt](https://github.com/RfidResearchGroup/proxmark3/blob/master/doc/magic_cards_notes.md) und [3dbrew zum Aufbau der Amiibo-Tags](https://www.3dbrew.org/wiki/Amiibo)
- Das NFC Forum über [die Technologie](https://nfc-forum.org/learn/nfc-technology/) und [die Type-2-Tag-Spezifikation](https://nfc-forum.org/build/specifications/type-2-tag-specification/)

**Handys und Lesegeräte**

- Apple: [Core NFC](https://developer.apple.com/documentation/corenfc), [Hintergrund-Lesen von Tags](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading), [der MIFARE-Befehl, der CRYPTO1 ausschließt](https://developer.apple.com/documentation/corenfc/nfcmifaretag/sendmifarecommand(commandpacket:completionhandler:)) und [WWDC 2019, Session 715](https://developer.apple.com/videos/play/wwdc2019/715/)
- Android: [MifareClassic](https://developer.android.com/reference/android/nfc/tech/MifareClassic), [der Leitfaden zu fortgeschrittenem NFC](https://developer.android.com/develop/connectivity/nfc/advanced-nfc) und [Web NFC in Chrome](https://developer.chrome.com/docs/capabilities/nfc)
- Lesegeräte: [ACS ACR122U](https://www.acs.com.hk/download-manual/418/TSP-ACR122U-3.06.pdf), [HID OMNIKEY 5022 CL](https://www.hidglobal.com/doclib/files/resource_files/eat-omnikey-5022-usb-reader-ds-en.pdf), [NXP PN532](https://www.nxp.com/docs/en/nxp/data-sheets/PN532_C1.pdf), [Proxmark3](https://github.com/RfidResearchGroup/proxmark3), [Flipper Zero](https://docs.flipper.net/nfc) und [Chameleon Ultra](https://github.com/RfidResearchGroup/ChameleonUltraDocs)
- Antennen und Ferrit: [TI SLOA241](https://www.ti.com/lit/an/sloa241b/sloa241b.pdf) und [Würth ANP022](https://www.mouser.com/pdfdocs/Selection_and_Characteristics_of_WEFSFS_APPNOTE.PDF)

---

## Zum Schluss

Wähl den Chip passend zur Aufgabe. Einen NTAG213 für einen Link, einen NTAG216, wenn du dir nicht sicher bist, einen NTAG215 für Amiibo, einen NTAG 424 DNA, wenn ein Scan etwas beweisen muss, einen ICODE SLIX2 oder ICODE 3, wenn ein Gate ihn lesen muss, eine DESFire EV3, wenn eine Tür ihr vertrauen muss, und gar nichts aus dem Regal mit MIFARE Classic. Alles andere in diesem Guide ist die Begründung dafür, und die Tabellen sind dafür da, dass du einem Angebot nie wieder blind glauben musst.

Wenn du sehen willst, was ein Tag wirklich ist, bevor du etwas draufschreibst: Genau das macht [NFC.cool Tools](/features/nfc-reader-writer/) bei jedem Scan, auf dem [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ultimate-nfc-tag-guide-de&mt=8), auf [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ultimate-nfc-tag-guide-de) und auf einem iPad oder Mac mit angeschlossenem Lesegerät. Und wenn auf deinem Schreibtisch ein Chip liegt, den die App falsch benennt oder gar nicht erkennt, schreib mir. So sind die meisten der sechzig auf die Liste gekommen.
