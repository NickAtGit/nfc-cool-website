---
id: nfc-blog-009
title: "NFC-Tags erklärt: Ein kompletter Einsteiger-Guide"
date: 2026-03-23
tags: [nfc-tech, nfc-tags, smart-home, automation]
summary: "NFC-Tags sind winzige, stromlose Chips, die Aktionen auf deinem Handy mit einem einzigen Tippen auslösen können. Hier ist alles, was du wissen musst - was sie sind, wie sie funktionieren, welche Typen du kaufen solltest und 15+ praktische Anwendungen."
image: "/assets/images/Blog/nfc-tags-beginners-guide.webp"
imageAlt: "Smartphone und mehrere NFC-Tags mit einfachen Workflow-Symbolen"
metaTitle: "NFC-Tags erklärt: Ein kompletter Einsteiger-Guide (2026)"
metaDescription: "Lerne, was NFC-Tags sind, wie sie funktionieren, die verschiedenen Typen (NTAG213, 215, 216) und 15+ praktische Einsätze - von Smart-Home-Automation bis digitale Visitenkarten."
ogTitle: "NFC-Tags erklärt: Ein kompletter Einsteiger-Guide"
ogDescription: "Alles, was Einsteiger 2026 über NFC-Tags wissen müssen - Typen, Funktionsweise, was man kaufen sollte und praktische Einsätze für Zuhause, Arbeit und mehr."
---
Du hast wahrscheinlich schon mal dein Handy getippt, um einen Kaffee zu bezahlen, eine Transitkarte gescannt oder damit eine Hotelzimmertür geöffnet. Jedes Mal ist das NFC bei der Arbeit.

Ich habe Jahre damit verbracht, NFC.cool zu bauen, eine App zum Lesen und Beschreiben von NFC-Tags, und das Eine, von dem ich mir wünschte, dass mehr Leute es wüssten, ist Folgendes: NFC ist nicht nur für Zahlungen und Schlüsselkarten. Ein winziger **NFC-Tag** - ein Chip, der ein paar Cent kostet und nie eine Batterie braucht - kann dein Zuhause automatisieren, deine Kontaktdaten mit einem einzigen Tippen übergeben und die physische Welt mit digitalen Aktionen verbinden.

Das ist der Guide, den ich jedem geben würde, der gerade einsteigt. Ich gehe durch, was NFC-Tags sind, wie sie wirklich funktionieren, welche ich kaufen würde und die Anwendungen, die sich meiner Erfahrung nach echt gelohnt haben.

---

## Was ist NFC?

**NFC** steht für **Near Field Communication**. Es ist eine Kurzstrecken-Funktechnologie, die zwei Geräten den Datenaustausch ermöglicht, wenn sie innerhalb weniger Zentimeter zueinander gebracht werden.

NFC operiert bei **13,56 MHz** und funktioniert auf Distanzen bis etwa **4 cm** (ungefähr 1,5 Zoll). Diese winzige Reichweite verwirrt am Anfang viele, aber sie ist beabsichtigt - es ist ein Sicherheitsfeature. Anders als bei Bluetooth oder Wi-Fi kannst du dich nicht versehentlich mit etwas auf der anderen Seite des Raums verbinden.

Jedes moderne Smartphone hat einen eingebauten NFC-Chip. iPhones lesen NFC seit dem iPhone 7 (2016), Android-Handys noch länger. Halte dein Handy in die Nähe eines Tags, und das Handy versorgt den Tag mit Strom und liest ihn - der ganze Austausch passiert in einem Bruchteil einer Sekunde.

---

## Was ist ein NFC-Tag?

Ein NFC-Tag ist ein kleiner, passiver Chip, der in einen Sticker, eine Karte, einen Schlüsselanhänger oder so ziemlich jeden Formfaktor eingebettet ist. "Passiv" ist das Wort, auf das es ankommt: **ein NFC-Tag hat keine Batterie.** Er wird vollständig vom Feld des Geräts mit Strom versorgt, das ihn liest.

Genau das macht sie so unkompliziert im Alltag:
- **Praktisch unzerstörbar** - keine Batterie, die leer wird, nichts, das sich abnutzt
- **Günstig** - ein paar Cent pro Stück im Großeinkauf
- **Winzig** - kleiner als eine Münze, dünner als eine Kreditkarte
- **Langlebig** - ein anständiger Tag hält 10+ Jahre

Jeder Tag enthält eine kleine Menge Speicher. Du kannst eine URL, Kontaktdaten, WLAN-Zugangsdaten, Klartext oder Anweisungen ablegen, die dem lesenden Handy sagen, was es tun soll.

### Worin unterscheidet sich NFC von RFID?

NFC ist eigentlich eine Untermenge von RFID (Radio-Frequency Identification). So erkläre ich den Unterschied:

| | NFC | RFID |
|---|---|---|
| **Frequenz** | Nur 13,56 MHz | 125 KHz - 960 MHz |
| **Reichweite** | Bis ~4 cm | Bis mehrere Meter |
| **Kommunikation** | Bidirektional | Meist unidirektional |
| **Standardisiert** | ISO 14443 / ISO 18092 | Mehrere Standards |
| **Verbrauchernutzung** | Hoch (Handys, Zahlungen) | Meist industriell |

Alles NFC ist RFID, aber nicht alles RFID ist NFC. Der Ausweis, den du durchziehst, um ins Büro zu kommen, läuft oft bei 125 KHz, und dein Handy kann das schlicht nicht lesen. NFC-Tags nutzen die 13,56-MHz-Frequenz, die Handys unterstützen. "Warum liest mein Handy meinen Firmenausweis nicht?" ist eine der Fragen, die mir am häufigsten gestellt werden, und das ist fast immer die Antwort. (Wenn du in genau diesem Kaninchenbau steckst, habe ich einen ganzen Beitrag dazu geschrieben, [warum dein iPhone keine RFID-Tür öffnen kann](/de/blog/iphone-rfid-condo-doors/).)

---

## NFC-Tag-Typen: Welchen solltest du kaufen?

NFC-Tags gibt es in Typen, die vom **NFC Forum** definiert werden, dem Industriestandard-Gremium. Diejenigen, denen du tatsächlich begegnest, basieren auf Chips von **NXP Semiconductors** - der NTAG-Serie.

### Die NTAG-Familie

Das sind bei Weitem die häufigsten NFC-Tags für Verbrauchernutzung:

#### NTAG213
- **Speicher:** 144 Bytes (ca. 132 nutzbar)
- **Am besten für:** URLs, Kontaktkarten, einfache Automatisierungen
- **Preis:** Günstigste Option (~$0.15-$0.30 pro Tag)
- **URL-Kapazität:** ~130 Zeichen

Das Arbeitstier. Für eine einzelne URL oder ein kurzes Stück Text ist NTAG213 alles, was du brauchst - das nutzen die meisten NFC-Visitenkarten und Marketing-Tags.

#### NTAG215
- **Speicher:** 504 Bytes (ca. 488 nutzbar)
- **Am besten für:** Längere URLs, vCards mit mehreren Feldern, WLAN-Zugangsdaten
- **Preis:** ~$0.20-$0.40 pro Tag
- **URL-Kapazität:** ~480 Zeichen

Wenn du mich bitten würdest, einen Tag für den allgemeinen Gebrauch auszuwählen, wäre es dieser. Er ist der Sweet Spot - genug Puffer, dass du an keine Grenze stößt, günstig genug, um ihn im Großeinkauf zu kaufen. Es ist auch der Chip in den Nintendo Amiibo-Figuren, weshalb beschreibbare NTAG215 so leicht zu finden sind.

#### NTAG216
- **Speicher:** 888 Bytes (ca. 868 nutzbar)
- **Am besten für:** Vollständige vCards, mehrere Datensätze, längere Textinhalte
- **Preis:** ~$0.30-$0.60 pro Tag
- **URL-Kapazität:** ~850 Zeichen

Der meiste Speicher in der NTAG-Verbraucher-Linie. Ich greife nur dann dazu, wenn ich wirklich eine komplette vCard auf dem Tag selbst speichern muss - Foto-URL, mehrere Telefonnummern, Adressen - oder Platz für zukünftige Änderungen will.

### Andere Tag-Typen, die du sehen könntest

- **NTAG424 DNA** - Ein fortgeschrittener Chip mit kryptografischer Authentifizierung. Er taucht bei Fälschungsschutz, Luxusgüter-Verifikation und den neuen EU-Regeln zum Digital Product Passport auf. Für den Privatgebrauch überdimensioniert, für kommerzielle Arbeit aber echt wichtig.
- **MIFARE Classic** - Ein älterer NXP-Chip, der in Zugangskarten und Transitsystemen genutzt wird. Es ist kein Standard-NFC-Forum-Tag, daher ist die Telefonkompatibilität Glückssache. Für private Projekte würde ich ihn auslassen.
- **ST25T** - Die NFC-Tag-Linie von STMicroelectronics. In der Funktion ähnlich wie NTAG, in Verbraucherprodukten weniger verbreitet.
- **ICODE** - Gebaut für Bibliotheks- und Logistik-Tracking. Damit wirst du wahrscheinlich nicht in Berührung kommen.

### Schnelle Kaufberatung

| Anwendungsfall | Empfohlener Tag | Warum |
|---|---|---|
| Website-URL | NTAG213 | Minimale Daten, am günstigsten |
| Digitale Visitenkarte | NTAG213 oder NTAG215 | URL-Link braucht ~100 Zeichen |
| WLAN-Sharing | NTAG215 | Zugangsdaten können lang werden |
| Vollständige vCard auf dem Tag | NTAG216 | Braucht mehr Speicher |
| Smart-Home-Trigger | NTAG213 | Braucht nur eine eindeutige ID |
| Fälschungsschutz | NTAG424 DNA | Kryptografische Verifikation |

**Wo kaufen:** Amazon, AliExpress oder spezialisierte NFC-Händler wie GoToTags, NFC TagWriter oder Seritag. Sticker-Tags sind am vielseitigsten - sie kleben auf fast allem.

Mein ehrlicher Rat: Kauf dir ein Pack NTAG215-Sticker und hör auf, es zu zerdenken. Ich habe Leute beobachtet, die sich über Chip-Typen den Kopf zerbrochen haben für ein Projekt, das ein 20-Cent-Tag locker erledigt. Wenn du irgendwann die tiefere Aufschlüsselung willst, bin ich in [NFC-Tag-Typen für iPhone](/de/blog/nfc-tag-types-for-iphones/) Chip für Chip durchgegangen.

---

## Wie NFC-Tags funktionieren (die einfache Version)

Die Leute erwarten, dass das kompliziert ist. Ist es nicht. Hier ist das Ganze, von Anfang bis Ende:

1. **Stromübertragung** - Die NFC-Antenne deines Handys erzeugt ein elektromagnetisches Feld. Wenn der Tag in dieses Feld eintritt (~4 cm), induziert das Feld einen winzigen elektrischen Strom in der Antennenspule des Tags. Dieser Strom versorgt den Chip.

2. **Datenaustausch** - Der versorgte Chip überträgt seine gespeicherten Daten zurück an dein Handy mit modulierten Funkwellen bei 13,56 MHz. Dieser gesamte Austausch dauert etwa 100 Millisekunden.

3. **Aktion** - Dein Handy liest die Daten und entscheidet, was damit zu tun ist. Eine URL öffnet sich im Browser. Eine Telefonnummer bietet einen Anruf an. Ein WLAN-Datensatz bietet Verbindung an. Ein App-spezifischer Datensatz öffnet die entsprechende App.

Kein Pairing. Keine PIN. Keine App für Basisfunktionen nötig. Einfach tippen und los.

### NDEF: Die Sprache, die Tags sprechen

Die Daten auf NFC-Tags sind mit **NDEF** (NFC Data Exchange Format) strukturiert. Denk an NDEF als die gemeinsame Sprache, die jedem NFC-fähigen Handy ermöglicht, jeden NFC-Tag zu verstehen.

Häufige NDEF-Datensatz-Typen:
- **URI** - Ein Weblink (http, https, tel:, mailto:)
- **Text** - Klartext in jeder Sprache
- **Smart Poster** - URL + Titel + Icon kombiniert
- **WLAN** - Netzwerkname, Passwort und Sicherheitstyp
- **vCard** - Kontaktinformationen
- **MIME** - Jeder benutzerdefinierte Datentyp (von Apps für benutzerdefinierte Aktionen verwendet)

Wenn du mit einer App wie NFC.cool Tools einen Tag beschreibst, erstellst du NDEF-Datensätze. Wenn ein Handy den Tag liest, parst es diese Datensätze und handelt entsprechend. Das ist das ganze Modell - sobald es bei mir klick gemacht hat, ergab alles andere an NFC Sinn.

---

## NFC-Tags lesen

### Auf dem iPhone

iPhones handhaben Tags automatisch. Auf **iPhone XS und neuer** (und dem iPhone SE der 3. Generation) läuft die NFC-Lesung im Hintergrund - halte die Oberseite des Handys in die Nähe eines Tags, und er wird sofort gelesen, ohne App. Ältere iPhones (7, 8, X) erfordern, dass du zuerst eine NFC-Reader-App öffnest.

Was beim Scannen passiert, hängt von den Daten ab:
- **URL** - eine Benachrichtigung erscheint, tippe zum Öffnen in Safari
- **Telefonnummer** - eine Option zum Anrufen
- **App Clip** - startet einen App Clip, falls vorhanden
- **Benutzerdefinierte Daten** - öffnet die zugehörige App

Wenn du nur sehen willst, was gerade auf einem Tag steht, kannst du auf Android auch [NFC-Tags direkt aus dem Browser lesen](/de/nfc-reader/) - ohne Installation.

### Auf Android

Die meisten Android-Handys haben NFC seit etwa 2012. Die Lesung ist standardmäßig an; den Schalter findest du unter Einstellungen, Verbundene Geräte, NFC. Tippe einen Tag an, und Android übergibt die Daten an die am besten passende App - URLs an den Browser, Kontakte an das Adressbuch, benutzerdefinierte Datensätze an ihre App.

---

## NFC-Tags schreiben

Das ist der Teil, den ich echt spannend finde. Einen Tag zu beschreiben heißt, ihn mit den Daten zu programmieren, die du willst.

### Was du brauchst

1. Ein NFC-fähiges Handy
2. Eine NFC-Schreib-App (wie **NFC.cool Tools** - verfügbar für [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-tags-beginners-guide-de&mt=8) und [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-tags-beginners-guide-de))
3. Einen leeren oder beschreibbaren NFC-Tag

### Wie man einen Tag beschreibt

Der Vorgang ist kurz:
1. Öffne deine NFC-Schreib-App
2. Wähle, was du schreiben willst (URL, Text, WLAN-Zugangsdaten, Kontakt und so weiter)
3. Gib die Daten ein
4. Halte dein Handy an den Tag
5. Warte auf die Bestätigung, meist etwa eine Sekunde

Das war's. Der Tag enthält jetzt deine Daten und funktioniert mit jedem NFC-Handy, das ihn liest. Wenn du die iPhone-spezifische Anleitung willst, habe ich hier eine geschrieben: [wie man NFC-Tags auf dem iPhone beschreibt](/de/blog/write-nfc-tags-iphone/).

### Wichtig: Tags sperren

Nachdem ein Tag beschrieben ist, kannst du ihn optional **sperren**. Sperren macht ihn dauerhaft schreibgeschützt - niemand kann ihn überschreiben oder löschen. Es gibt kein Zurück.

Ich behandle das Sperren als bewussten, finalen Schritt, nie als etwas, das man schnell durchklickt. Sperre einen Tag, wenn:
- er öffentlich zugänglich ist (auf einem Poster, Produkt oder einer Visitenkarte)
- du Manipulation verhindern willst
- die Daten sich nicht ändern werden

Lass ihn ungesperrt, wenn:
- du die Daten vielleicht später aktualisieren willst
- du noch experimentierst
- er in einer kontrollierten Umgebung lebt, wie deinem Zuhause

---

## 16 praktische Anwendungen für NFC-Tags

Ich könnte hundert aufzählen. Das sind die, zu denen ich immer wieder zurückkomme - die Anwendungen, von denen ich gesehen habe, dass sie sich wirklich durchsetzen.

### Rund ums Zuhause

**1. WLAN-Gastnetzwerk-Sharing**
Klebe einen Tag in die Nähe deiner Haustür oder deines Gästezimmers. Programmiere ihn mit deinen WLAN-Zugangsdaten. Gäste tippen ihn an und verbinden sich sofort - kein Tippen langer Passwörter.

**2. Smart-Home-Szenen**
Platziere Tags in deinem Zuhause, um Automatisierungen auszulösen. Tippe den Tag auf deinem Nachttisch, um den "Gute-Nacht"-Modus zu aktivieren (Lichter aus, Alarm eingestellt, Handy auf Nicht stören). Tippe den an der Tür für "Verlasse Haus" (Lichter aus, Thermostat runter, Saugroboter startet).

**3. Wecker**
Lege einen Tag in die Küche oder das Bad. Richte eine Kurzbefehl ein, die deinen Morgen-Wecker nur deaktiviert, wenn du den Tag physisch scannst - was dich aus dem Bett zwingt.

**4. Geräte-Handbücher**
Klebe einen NFC-Tag auf deine Waschmaschine, Spülmaschine oder ein anderes Gerät. Programmiere ihn mit einer URL zum Handbuch-PDF. Nie wieder ein Handbuch suchen.

**5. Medikamenten-Erinnerungen**
Platziere einen Tag auf einer Pillenflasche. Das Scannen protokolliert einen Zeitstempel in einer Notiz oder Tabelle und erstellt eine Historie, wann du dein Medikament genommen hast.

### Bei der Arbeit

**6. Digitale Visitenkarten**
Der beliebteste NFC-Anwendungsfall im Business. Anstatt Papierkarten zu tragen, teilt eine NFC-Visitenkarte deine Kontaktdaten mit einem einzigen Tippen. [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-nfc-tags-beginners-guide-de&mt=8) lässt dich eine professionelle digitale Karte erstellen und ihre URL auf jeden Drittanbieter-NFC-Tag schreiben - iOS-Empfänger sehen einen nativen App Clip, Android-Empfänger öffnen eine Website auf der nfc.cool-Domain, und beide können deinen Kontakt mit einem Tippen speichern.

**7. Konferenzraum-Check-in**
Platziere einen Tag außerhalb von Meetingräumen. Das Antippen startet deinen Kalender oder protokolliert die Anwesenheit - einfacher als jedes Buchungssystem.

**8. Geteilte Geräte-Anmeldung**
Befestige Tags an geteilten Geräten, Tools oder Ausrüstung. Das Scannen protokolliert, wer es wann ausgeliehen hat.

**9. Schneller Link zu geteilten Dokumenten**
Klebe einen Tag an ein Whiteboard oder Projektbereich. Programmiere ihn mit einem Link zum gemeinsamen Laufwerk, der Notion-Seite oder dem Task-Board des Projekts.

### Unterwegs

**10. Auto-Bluetooth + Navigation**
Platziere einen Tag auf deiner Auto-Halterung. Das Antippen verbindet Bluetooth, startet deine Navigations-App und spielt deine Fahr-Playlist.

**11. Gepäck-Identifikation**
Lege einen gesperrten NFC-Tag in dein Gepäck mit deinen Kontaktdaten. Wenn es gefunden wird, kann jeder mit einem Handy den Besitzer identifizieren.

**12. Haustier-ID-Tag**
Befestige einen NFC-Tag am Halsband deines Haustiers mit deinen Kontaktdaten und seinen medizinischen Infos. Langlebiger und datenreicher als gravierte Tags.

**13. Gym/Workout-Start**
Tag an deiner Sporttasche oder deinem Schließfach. Das Antippen öffnet deine Workout-App mit dem heutigen Trainingsplan vorgeladen.

### Kreative Anwendungen

**14. Restaurant-Tisch-Bestellung**
Wenn du ein Restaurant betreibst, bette NFC-Tags in Tische ein. Kunden tippen, um die Speisekarte zu sehen, Bestellungen aufzugeben oder zu bezahlen. Viele Restaurants haben das während COVID eingeführt und sind nie zurückgekehrt.

**15. Interaktive Kunst und Ausstellungen**
Museen und Galerien nutzen NFC-Tags neben Werken. Besucher tippen für Audio-Guides, Künstlerinformationen oder AR-Erlebnisse.

**16. Schnitzeljagden und Spiele**
Verstecke NFC-Tags an einem Ort. Jeder enthüllt einen Hinweis oder ein Rätsel. Toll für Teambuilding-Events, Kindergeburtstage oder Escape-Room-Spiele.

---

## NFC-Tags und iPhone-Kurzbefehle

Das zeige ich Leuten am liebsten. Apples **Kurzbefehle-App** (in iOS integriert) hat native NFC-Trigger-Unterstützung, und genau hier werden Tags auf dem iPhone von nützlich zu echt mächtig.

So richtest du einen ein:
1. Öffne die Kurzbefehle-App
2. Gehe zum Tab **Automatisierung**
3. Tippe **Neue Automatisierung**, dann **NFC**
4. Scanne den Tag, den du als Trigger nutzen willst
5. Baue jede Automatisierung, die du willst

Der raffinierte Teil: Auf dem Tag müssen nicht mal Daten geschrieben sein. Kurzbefehle erkennt den Tag an seiner eindeutigen Hardware-ID, sodass ein komplett leerer Tag etwas Komplexes auslösen kann:

- Starte einen Fokusmodus + Timer, wenn du deinen Schreibtisch-Tag tippst
- Protokolliere deine Ankunftszeit in einer Tabelle, wenn du den Büro-Tag tippst
- Sende deinem Partner "auf dem Weg nach Hause", wenn du den Auto-Tag tippst
- Schalte spezifische Smart-Home-Geräte um

Auf Android bieten Apps wie **Tasker** und **MacroDroid** ähnliche NFC-getriggerte Automatisierung.

---

## Häufige Fragen

### Brauchen NFC-Tags Batterien?
Nein. NFC-Tags sind komplett passiv - sie ziehen Strom aus dem elektromagnetischen Feld des Lesegeräts. Das heißt, sie gehen nie aus und können ein Jahrzehnt oder länger halten.

### Können NFC-Tags gehackt werden?
Standard-NFC-Tags haben standardmäßig keine Verschlüsselung. Jeder mit einem NFC-Handy kann einen ungesperrten, ungeschützten Tag lesen. Für die meisten Anwendungsfälle (URL-Sharing, Kurzbefehl-Trigger) ist das kein Problem. Für sensible Anwendungen nutze Tags mit kryptografischen Features (wie NTAG424 DNA) oder stelle sicher, dass der Tag nur eine Aktion auslöst, die weitere Authentifizierung erfordert.

### Wie nah muss ich mein Handy halten?
Innerhalb von etwa 1-4 cm (0,5-1,5 Zoll). Bei iPhones ist die NFC-Antenne oben am Handy. Bei den meisten Android-Handys ist sie im oberen mittleren Rücken. Du wirst den Sweet Spot schnell finden.

### Kann ich NFC-Tags neu beschreiben?
Ja - solange der Tag nicht gesperrt wurde. Die meisten NFC-Tags unterstützen ca. 100.000 Schreibzyklen, du kannst sie also extensiv umprogrammieren. Einmal gesperrt, wird ein Tag dauerhaft schreibgeschützt.

### Wie viele Daten kann ein NFC-Tag speichern?
Das hängt vom Chip ab. NTAG213 fasst ~144 Bytes, NTAG215 ~504 Bytes und NTAG216 ~888 Bytes. Zum Vergleich: Eine typische URL ist 30-80 Bytes. Es ist nicht viel Speicher - NFC-Tags sind am besten für kurze Daten oder Zeiger auf Online-Inhalte.

### Funktionieren NFC-Tags durch Handyhüllen?
Ja. NFC funktioniert durch die meisten Handyhüllen, Sticker und dünnen Materialien. Sehr dicke oder metallische Hüllen könnten die Reichweite reduzieren. Wenn du einen Tag auf Metall klebst (z.B. Laptop), nutze Tags, die für Metallflächen konzipiert sind (sie haben eine Ferrit-Abschirmschicht).

### Was ist der Unterschied zwischen NFC-Tags und NFC-Karten?
Nichts Grundlegendes - eine NFC-Karte ist einfach ein NFC-Tag in Kartenform. Der Chip und die Antenne darin sind dieselbe Technologie. Karten nutzen oft NTAG213 oder NTAG215 und sind beliebt für Visitenkarten, Zugangsausweise und Bonusprogramme.

---

## Los geht's: Dein erstes NFC-Projekt

Willst du es ausprobieren? Hier ist ein Fünf-Minuten-Projekt, mit dem ich jeden starten lassen würde:

**Projekt: ein WLAN-Sharing-Tag für dein Zuhause**

1. **Tags kaufen:** Besorge dir ein Pack NTAG215-Sticker (auf Amazon etwa 10€ für 25 Stück)
2. **NFC.cool Tools laden:** für [iOS](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-tags-beginners-guide-de&mt=8) oder [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-tags-beginners-guide-de)
3. **WLAN-Zugangsdaten schreiben:** Öffne die App, wähle Schreiben, dann WLAN, gib Netzwerkname und Passwort ein und halte dein Handy an den Tag
4. **Den Tag platzieren:** irgendwo sichtbar - an der Haustür, am Kühlschrank, im Gästezimmer
5. **Testen:** Tippe mit einem anderen Handy, und du solltest eine Aufforderung bekommen, dem Netzwerk beizutreten

Gesamtkosten: etwa 0,30€ und zwei Minuten. Jeder Gast, der zu Besuch kommt, wird dir dafür danken.

---

## Zusammenfassung

NFC-Tags sind eine dieser Technologien, die komplex klingen und sich als bemerkenswert einfach herausstellen. Keine Batterien, kein Pairing, keine App für die Basis-Lesung nötig. Ein paar Cent kaufen dir einen programmierbaren Chip, der Jahre hält und mit Milliarden von Handys funktioniert.

Ich habe meine Arbeit rund um diese kleinen Chips aufgebaut, und ich finde immer noch neue Anwendungen für sie. Ob du deinen Morgen automatisieren, deine Kontaktdaten teilen oder etwas Verspieltes bauen willst - ein Tag ist die Brücke zwischen dem Tippen eines Handys und dem, was in der echten Welt passiert.

**Bereit, NFC-Tags zu programmieren?** Lade [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-tags-beginners-guide-de&mt=8) für iPhone oder [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-tags-beginners-guide-de) - es ist der einfachste Weg, den ich kenne, NFC-Tags zu lesen, zu schreiben und zu verwalten.

**Willst du eine digitale Visitenkarte mit NFC?** Schau dir [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-nfc-tags-beginners-guide-de&mt=8) an - teile deinen Kontakt mit einem einzigen Tippen. App-UI und App Clip in 35 Sprachen verfügbar.