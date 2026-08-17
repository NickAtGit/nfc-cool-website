---
id: nfc-blog-009
title: "NFC-Tags erklärt: der komplette Einsteiger-Guide"
date: 2026-02-23
tags: ["nfc-tags", "guides", "automation"]
summary: "NFC-Tags sind winzige Chips ohne Batterie, die mit einem einzigen Scan etwas auf deinem Handy auslösen. Hier steht alles, was du dazu wissen musst: was sie sind, wie sie funktionieren, welche du kaufen solltest und über 15 Anwendungen aus der Praxis."
image: "/assets/images/Blog/nfc-tags-beginners-guide.webp"
imageAlt: "Ein Smartphone neben mehreren NFC-Tags, dazu einfache Workflow-Symbole"
metaTitle: "NFC-Tags erklärt: der komplette Einsteiger-Guide (2026)"
metaDescription: "Was NFC-Tags sind, wie sie funktionieren, welche Typen es gibt (NTAG213, 215, 216) und über 15 Anwendungen - vom Smart Home bis zur digitalen Visitenkarte."
ogTitle: "NFC-Tags erklärt: der komplette Einsteiger-Guide"
ogDescription: "Alles, was Einsteiger 2026 über NFC-Tags wissen müssen: Typen, Funktionsweise, Kaufempfehlung und praktische Anwendungen für zu Hause, im Büro und unterwegs."
---
Du hast dein Handy bestimmt schon mal ans Terminal gehalten, um einen Kaffee zu bezahlen, eine Fahrkarte gescannt oder damit eine Hotelzimmertür aufgemacht. Jedes Mal war das NFC.

Ich baue seit Jahren an NFC.cool, einer App zum Lesen und Beschreiben von NFC-Tags, und wenn ich mir eine Sache wünschen dürfte, die mehr Leute wissen, dann diese: NFC kann viel mehr als Bezahlen und Schlüsselkarten. Ein winziger **NFC-Tag**, ein Chip für ein paar Cent, der nie eine Batterie braucht, kann dein Zuhause automatisieren, deine Kontaktdaten mit einem einzigen Scan weitergeben und Dinge in der echten Welt mit digitalen Aktionen verknüpfen.

Das hier ist der Guide, den ich jedem in die Hand drücken würde, der gerade anfängt. Ich erkläre, was NFC-Tags sind, wie sie wirklich funktionieren, welche ich kaufen würde und welche Anwendungen sich meiner Erfahrung nach tatsächlich lohnen.

---

## Was ist NFC?

**NFC** steht für **Near Field Communication**. Dahinter steckt ein Funkstandard für ganz kurze Distanzen: Zwei Geräte tauschen Daten aus, sobald sie sich auf wenige Zentimeter nahekommen.

NFC arbeitet bei **13,56 MHz** und reicht bis etwa **4 cm** (rund 1,5 Zoll). Über diese winzige Reichweite stolpern am Anfang viele, aber sie ist Absicht - ein Sicherheitsmerkmal. Anders als bei Bluetooth oder WLAN verbindest du dich nicht aus Versehen mit irgendwas am anderen Ende des Raums.

Jedes moderne Smartphone hat einen NFC-Chip eingebaut. iPhones lesen NFC seit dem iPhone 7 von 2016, Android-Handys schon länger. Du hältst das Handy in die Nähe eines Tags, das Handy versorgt den Tag mit Strom und liest ihn aus - das Ganze dauert einen Bruchteil einer Sekunde.

---

## Was ist ein NFC-Tag?

Ein NFC-Tag ist ein kleiner, passiver Chip, der in einem Sticker, einer Karte, einem Schlüsselanhänger oder so ziemlich jeder anderen Form steckt. „Passiv“ ist dabei das entscheidende Wort: **Ein NFC-Tag hat keine Batterie.** Seinen Strom bekommt er komplett aus dem Feld des Geräts, das ihn gerade liest.

Genau deshalb sind sie im Alltag so unkompliziert:
- **Praktisch unkaputtbar** - keine Batterie, die leer geht, nichts, das verschleißt
- **Günstig** - im Großpack ein paar Cent pro Stück
- **Winzig** - kleiner als eine Münze, dünner als eine Kreditkarte
- **Langlebig** - ein anständiger Tag hält 10 Jahre und länger

Jeder Tag hat ein bisschen Speicher. Da passt eine URL rein, Kontaktdaten, WLAN-Zugangsdaten, einfacher Text oder Anweisungen, die dem lesenden Handy sagen, was es tun soll.

### Was unterscheidet NFC von RFID?

NFC ist genau genommen eine Untermenge von RFID (Radio-Frequency Identification). So erkläre ich den Unterschied meistens:

| | NFC | RFID |
|---|---|---|
| **Frequenz** | Nur 13,56 MHz | 125 KHz - 960 MHz |
| **Reichweite** | Bis ~4 cm | Bis zu mehrere Meter |
| **Kommunikation** | In beide Richtungen | Meist nur in eine Richtung |
| **Standardisiert** | ISO 14443 / ISO 18092 | Mehrere Standards |
| **Einsatz bei Endverbrauchern** | Hoch (Handys, Bezahlen) | Überwiegend industriell |

Alles, was NFC ist, ist auch RFID - aber nicht umgekehrt. Der Ausweis, den du morgens ans Lesegerät hältst, um ins Büro zu kommen, funkt oft bei 125 KHz, und das kann dein Handy schlicht nicht lesen. NFC-Tags nutzen 13,56 MHz, und genau diese Frequenz beherrschen Handys. „Warum liest mein Handy meinen Firmenausweis nicht?“ gehört zu den Fragen, die ich am häufigsten bekomme, und das ist fast immer die Antwort. (Falls du gerade genau an diesem Punkt hängst: Dazu habe ich einen eigenen Beitrag geschrieben, [warum dein iPhone keine RFID-Tür öffnen kann](/de/blog/iphone-rfid-condo-doors/).)

---

## NFC-Tag-Typen: Welchen solltest du kaufen?

NFC-Tags gibt es in verschiedenen Typen, festgelegt vom **NFC Forum**, dem Standardisierungsgremium der Branche. Die, denen du in der Praxis begegnest, basieren auf Chips von **NXP Semiconductors**: der NTAG-Serie.

### Die NTAG-Familie

Das sind mit Abstand die häufigsten NFC-Tags für den Privatgebrauch:

#### NTAG213
- **Speicher:** 144 Byte (davon etwa 132 nutzbar)
- **Ideal für:** URLs, Kontaktkarten, einfache Automatisierungen
- **Preis:** die günstigste Option (ca. 0,15-0,30 $ pro Tag)
- **URL-Länge:** bis etwa 130 Zeichen

Das Arbeitstier unter den Tags. Für eine einzelne URL oder ein kurzes Stück Text reicht der NTAG213 völlig - genau den nutzen die meisten NFC-Visitenkarten und Marketing-Tags.

#### NTAG215
- **Speicher:** 504 Byte (davon etwa 488 nutzbar)
- **Ideal für:** längere URLs, vCards mit mehreren Feldern, WLAN-Zugangsdaten
- **Preis:** ca. 0,20-0,40 $ pro Tag
- **URL-Länge:** bis etwa 480 Zeichen

Eine solide Mittelklasse: genug Luft für längere URLs und vCards mit mehreren Feldern und trotzdem günstig genug fürs Großpack. Derselbe Chip steckt übrigens in den Amiibo-Figuren von Nintendo, deshalb sind beschreibbare NTAG215 so leicht zu bekommen.

#### NTAG216
- **Speicher:** 888 Byte (davon etwa 868 nutzbar)
- **Ideal für:** komplette vCards, mehrere Datensätze, längere Texte
- **Preis:** ca. 0,30-0,60 $ pro Tag
- **URL-Länge:** bis etwa 850 Zeichen

Der meiste Speicher in der NTAG-Reihe für Endkunden, und der Tag, zu dem ich greifen würde, wenn du nur einen kaufst. Mit der Reserve läufst du gegen keine Wand: komplette vCards, mehrere Datensätze, längere Texte, Platz für spätere Änderungen. Außerdem ist es der Chip, mit dem ich NFC.cool standardmäßig teste.

### Andere Tag-Typen, die dir begegnen können

- **NTAG424 DNA** - Ein Chip der Oberklasse mit kryptografischer Authentifizierung. Man findet ihn im Fälschungsschutz, bei der Echtheitsprüfung von Luxusgütern und in den neuen EU-Regeln zum Digital Product Passport. Für private Projekte überdimensioniert, für den kommerziellen Einsatz aber wirklich wichtig.
- **MIFARE Classic** - Ein älterer NXP-Chip aus Zugangskarten und Nahverkehrssystemen. Kein standardisierter NFC-Forum-Tag, entsprechend ist es Glückssache, ob ein Handy ihn lesen kann. Für eigene Projekte würde ich einen Bogen drum machen.
- **ST25T** - Die NFC-Tag-Reihe von STMicroelectronics. Funktioniert ähnlich wie NTAG, ist in Endkundenprodukten aber seltener anzutreffen.
- **ICODE** - Gemacht für Bibliotheken und Logistik. Damit wirst du vermutlich nie zu tun haben.

### Kurze Kaufberatung

| Anwendungsfall | Empfohlener Tag | Warum |
|---|---|---|
| Website-URL | NTAG213 | Wenig Daten, am günstigsten |
| Digitale Visitenkarte | NTAG213 oder NTAG215 | Der Link braucht etwa 100 Zeichen |
| WLAN teilen | NTAG215 | Zugangsdaten können lang werden |
| Komplette vCard auf dem Tag | NTAG216 | Braucht mehr Speicher |
| Smart-Home-Auslöser | NTAG213 | Braucht nur eine eindeutige ID |
| Fälschungsschutz | NTAG424 DNA | Kryptografische Prüfung |

**Wo kaufen:** Auf meiner Seite mit [empfohlenen NFC-Tags](/de/affiliate-links/) findest du die NTAG216-Sticker, die ich selbst benutze und mit denen ich teste. Sticker sind die vielseitigste Form - sie halten auf fast allem.

Mein ehrlicher Rat: Kauf dir ein Pack NTAG216-Sticker und denk nicht länger drüber nach. Ich habe schon Leute erlebt, die sich über den richtigen Chip den Kopf zerbrochen haben - für ein Projekt, das ein 20-Cent-Tag problemlos erledigt. Wenn du irgendwann doch die Details willst: In [NFC-Tag-Typen fürs iPhone](/de/blog/nfc-tag-types-for-iphones/) gehe ich Chip für Chip durch.

---

## Wie NFC-Tags funktionieren (die einfache Version)

Viele erwarten, dass das kompliziert ist. Ist es nicht. So läuft das Ganze ab, von Anfang bis Ende:

1. **Stromversorgung** - Die NFC-Antenne in deinem Handy erzeugt ein elektromagnetisches Feld. Kommt ein Tag in dieses Feld (etwa 4 cm), induziert das Feld in der Antennenspule des Tags einen winzigen Strom, und der versorgt den Chip.

2. **Datenaustausch** - Der Chip schickt seine gespeicherten Daten als modulierte Funkwellen bei 13,56 MHz zurück ans Handy. Der ganze Austausch dauert etwa 100 Millisekunden.

3. **Aktion** - Dein Handy liest die Daten und entscheidet, was damit passiert. Eine URL geht im Browser auf. Eine Telefonnummer bietet einen Anruf an, ein WLAN-Datensatz die Verbindung mit dem Netz. Ein App-spezifischer Datensatz öffnet die passende App.

Kein Koppeln. Keine PIN. Fürs einfache Lesen keine App nötig. Dranhalten, fertig.

### NDEF: die Sprache, die Tags sprechen

Die Daten auf einem NFC-Tag sind nach **NDEF** (NFC Data Exchange Format) strukturiert. Ich stelle mir NDEF als die gemeinsame Sprache vor, dank der jedes NFC-Handy jeden NFC-Tag versteht.

Häufige NDEF-Datensatztypen:
- **URI** - ein Link (http, https, tel:, mailto:)
- **Text** - einfacher Text in beliebiger Sprache
- **Smart Poster** - URL, Titel und Icon in einem
- **WLAN** - Netzwerkname, Passwort und Verschlüsselungstyp
- **vCard** - Kontaktdaten
- **MIME** - beliebige eigene Datentypen, die Apps für eigene Aktionen nutzen

Wenn du mit einer App wie NFC.cool Tools einen Tag beschreibst, legst du NDEF-Datensätze an. Liest ein Handy den Tag, parst es diese Datensätze und reagiert darauf. Mehr ist es nicht - als das bei mir einmal Klick gemacht hatte, ergab der ganze Rest von NFC plötzlich Sinn.

---

## NFC-Tags lesen

### Auf dem iPhone

iPhones kümmern sich von selbst um Tags. Ab dem **iPhone XS** (und auf dem iPhone SE der 3. Generation) läuft das NFC-Lesen im Hintergrund: Halte die Oberkante des Handys in die Nähe eines Tags, und er wird sofort gelesen, ganz ohne App. Bei älteren iPhones (7, 8, X) musst du vorher eine NFC-Reader-App öffnen.

Was beim Scannen passiert, hängt von den Daten ab:
- **URL** - eine Mitteilung erscheint, ein Fingertipp darauf öffnet sie in Safari
- **Telefonnummer** - du bekommst die Option anzurufen
- **App Clip** - startet einen App Clip, falls es einen gibt
- **Eigene Daten** - öffnet die zugehörige App

Wenn du nur mal sehen willst, was gerade auf einem Tag steht, kannst du auf Android auch [NFC-Tags direkt im Browser auslesen](/de/online-nfc-reader/), ohne etwas zu installieren.

### Auf Android

Die meisten Android-Handys haben NFC seit etwa 2012. Das Lesen ist standardmäßig aktiv; den Schalter findest du unter Einstellungen, Verbundene Geräte, NFC. Halte das Handy an einen Tag, und Android reicht die Daten an die passende App weiter - URLs an den Browser, Kontakte ans Adressbuch, eigene Datensätze an ihre jeweilige App.

---

## NFC-Tags beschreiben

Hier fängt für mich der Spaß an. Einen Tag beschreiben heißt: Du programmierst ihn mit genau den Daten, die du drauf haben willst.

### Was du brauchst

1. Ein Handy mit NFC
2. Eine App zum Beschreiben von NFC-Tags (zum Beispiel **NFC.cool Tools**, gibt es für [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-tags-beginners-guide-de&mt=8) und [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-tags-beginners-guide-de))
3. Einen leeren oder wiederbeschreibbaren NFC-Tag

### So beschreibst du einen Tag

Der Ablauf ist kurz:
1. Öffne die App
2. Wähle aus, was auf den Tag soll (URL, Text, WLAN-Zugangsdaten, Kontakt und so weiter)
3. Gib die Daten ein
4. Halte das Handy an den Tag
5. Warte auf die Bestätigung, das dauert meist etwa eine Sekunde

Das war's schon. Der Tag trägt jetzt deine Daten und funktioniert mit jedem NFC-Handy, das ihn liest. Die Anleitung speziell fürs iPhone habe ich hier aufgeschrieben: [NFC-Tags mit dem iPhone beschreiben](/de/blog/write-nfc-tags-iphone/).

### Wichtig: Tags sperren

Nachdem ein Tag beschrieben ist, kannst du ihn optional **sperren**. Danach ist er dauerhaft schreibgeschützt: Niemand kann ihn mehr überschreiben oder löschen. Rückgängig machen lässt sich das nicht.

Für mich ist das Sperren ein bewusster, letzter Schritt und nichts, was man schnell mal wegklickt. Sperr einen Tag, wenn:
- er öffentlich zugänglich ist (auf einem Poster, einem Produkt oder einer Visitenkarte)
- niemand daran herumpfuschen soll
- sich die Daten nicht mehr ändern

Lass ihn offen, wenn:
- du die Daten später vielleicht noch anpassen willst
- du noch am Ausprobieren bist
- er in einer geschützten Umgebung hängt, zum Beispiel bei dir zu Hause

---

## 16 praktische Anwendungen für NFC-Tags

Ich könnte hundert aufzählen. Das hier sind die, zu denen ich immer wieder zurückkomme - Anwendungen, die sich in der Praxis wirklich bewährt haben.

### Rund ums Zuhause

**1. WLAN für Gäste teilen**
Kleb einen Tag neben die Haustür oder ins Gästezimmer und schreib deine WLAN-Zugangsdaten drauf. Gäste halten ihr Handy dran und sind sofort drin, ohne ein langes Passwort abzutippen.

**2. Smart-Home-Szenen**
Verteile Tags in der Wohnung, um Automatisierungen auszulösen. Der Tag auf dem Nachttisch schaltet auf „Gute Nacht“ (Licht aus, Wecker gestellt, Handy auf Nicht stören). Der Tag an der Tür auf „Haus verlassen“ (Licht aus, Heizung runter, Saugroboter los).

**3. Wecker**
Leg einen Tag in die Küche oder ins Bad und bau einen Kurzbefehl, der den Wecker morgens nur dann ausschaltet, wenn du diesen Tag scannst. Das funktioniert - du kommst gar nicht drum herum aufzustehen.

**4. Bedienungsanleitungen**
Kleb einen Tag auf die Waschmaschine oder die Spülmaschine und hinterleg die URL zur Anleitung als PDF. Nie wieder eine Anleitung suchen.

**5. Medikamenten-Erinnerung**
Ein Tag auf der Tablettendose. Beim Scannen wird ein Zeitstempel in einer Notiz oder Tabelle abgelegt, und du hast schwarz auf weiß, wann du sie genommen hast.

### Bei der Arbeit

**6. Digitale Visitenkarten**
Der beliebteste NFC-Anwendungsfall im Geschäftsleben. Statt Papierkarten dabeizuhaben, gibt eine NFC-Visitenkarte deine Kontaktdaten weiter, sobald jemand sein Handy dranhält. Mit [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-nfc-tags-beginners-guide-de&mt=8) baust du dir eine professionelle digitale Karte und schreibst ihre URL auf einen beliebigen NFC-Tag von Drittanbietern. Wer ein iPhone hat, sieht einen nativen App Clip, auf Android öffnet sich eine Website auf der Domain nfc.cool, und beide speichern deinen Kontakt mit einem Fingertipp.

**7. Check-in im Konferenzraum**
Häng einen Tag neben die Tür von Besprechungsräumen. Ein Scan öffnet den Kalender oder trägt die Anwesenheit ein - einfacher als jedes Buchungssystem.

**8. Ausleihe von gemeinsam genutzter Ausrüstung**
Kleb Tags auf geteilte Geräte oder Werkzeuge. Beim Scannen wird festgehalten, wer was wann mitgenommen hat.

**9. Schneller Link zu gemeinsamen Dokumenten**
Ein Tag am Whiteboard oder im Projektbereich, der zum gemeinsamen Laufwerk, zur Notion-Seite oder zum Task-Board des Projekts führt.

### Unterwegs

**10. Bluetooth und Navi im Auto**
Ein Tag an der Handyhalterung im Auto. Ein Scan verbindet Bluetooth, öffnet die Navi-App und startet deine Playlist fürs Fahren.

**11. Gepäck kennzeichnen**
Leg einen gesperrten NFC-Tag mit deinen Kontaktdaten in den Koffer. Taucht er irgendwo auf, kann jeder mit einem Handy herausfinden, wem er gehört.

**12. Marke fürs Haustier**
Ein NFC-Tag am Halsband mit deinen Kontaktdaten und den medizinischen Infos deines Tiers - haltbarer als eine gravierte Marke, und es passt viel mehr drauf.

**13. Training starten**
Ein Tag an der Sporttasche oder am Spind, der deine Workout-App direkt mit dem heutigen Trainingsplan öffnet.

### Kreative Anwendungen

**14. Bestellen am Restauranttisch**
Wer ein Restaurant betreibt, kann Tags in die Tische einlassen. Gäste halten ihr Handy dran, sehen die Karte, bestellen oder bezahlen. Viele Lokale haben das während Corona eingeführt und sind nie mehr davon abgerückt.

**15. Interaktive Kunst und Ausstellungen**
Museen und Galerien platzieren Tags neben den Werken. Besucher halten ihr Handy dran und bekommen Audioguides, Hintergründe zum Künstler oder AR-Inhalte.

**16. Schnitzeljagden und Spiele**
Verstecke Tags an verschiedenen Stellen, jeder mit einem Hinweis oder Rätsel drauf. Super für Teambuilding, Kindergeburtstage oder Spiele im Escape-Room-Stil.

---

## NFC-Tags und Kurzbefehle auf dem iPhone

Das zeige ich Leuten am liebsten. Apples **Kurzbefehle-App** (in iOS schon dabei) kann NFC-Tags nativ als Auslöser nutzen, und genau damit werden Tags auf dem iPhone von praktisch zu richtig mächtig.

So richtest du das ein:
1. Öffne die Kurzbefehle-App
2. Wechsle zum Tab **Automation**
3. Tippe auf **Neue Automation**, dann auf **NFC**
4. Scanne den Tag, der als Auslöser dienen soll
5. Baue die Automatisierung, die du willst

Das Schöne daran: Auf dem Tag müssen dafür nicht mal Daten stehen. Kurzbefehle erkennt den Tag an seiner eindeutigen Hardware-ID, ein komplett leerer Tag kann also etwas ziemlich Komplexes auslösen:

- Fokus und Timer starten, wenn du den Tag am Schreibtisch scannst
- Deine Ankunftszeit in eine Tabelle schreiben, wenn du den Tag im Büro scannst
- Deinem Partner „bin auf dem Heimweg“ schicken, wenn du den Tag im Auto scannst
- Bestimmte Smart-Home-Geräte an- oder ausschalten

Auf Android machen Apps wie **Tasker** und **MacroDroid** dieselbe Art von NFC-gesteuerter Automatisierung.

---

## Häufige Fragen

### Brauchen NFC-Tags Batterien?
Nein. NFC-Tags sind komplett passiv, sie holen sich ihren Strom aus dem Feld des lesenden Geräts. Sie gehen also nie leer und halten zehn Jahre und länger.

### Können NFC-Tags gehackt werden?
Normale Tags haben von Haus aus keine Verschlüsselung. Jeder mit einem NFC-Handy kann einen ungesperrten, ungeschützten Tag lesen. Für die meisten Anwendungen - eine URL teilen, einen Kurzbefehl auslösen - halte ich das nicht für ein Problem. Für sensible Anwendungen nimm einen Tag mit kryptografischen Funktionen (wie den NTAG424 DNA) oder sorg dafür, dass der Tag nur etwas auslöst, das eine weitere Authentifizierung verlangt.

### Wie nah muss ich mein Handy halten?
Etwa 1 bis 4 cm (0,5-1,5 Zoll). Bei iPhones sitzt die NFC-Antenne oben am Gerät, bei den meisten Android-Handys oben in der Mitte der Rückseite. Nach ein paar Scans hast du die richtige Stelle raus.

### Kann ich NFC-Tags neu beschreiben?
Ja, solange der Tag nicht gesperrt wurde. Die meisten Tags vertragen rund 100.000 Schreibzyklen, du kannst sie also beliebig oft umprogrammieren. Einmal gesperrt, bleibt ein Tag dauerhaft schreibgeschützt.

### Wie viele Daten passen auf einen NFC-Tag?
Kommt auf den Chip an: NTAG213 fasst ca. 144 Byte, NTAG215 ca. 504 Byte, NTAG216 ca. 888 Byte. Zum Vergleich: Eine typische URL hat 30 bis 80 Byte. Viel ist das nicht - NFC-Tags eignen sich am besten für kurze Daten oder als Verweis auf Inhalte im Netz.

### Funktionieren NFC-Tags durch Handyhüllen?
Ja. NFC geht durch die meisten Hüllen, Sticker und dünne Materialien durch. Sehr dicke oder metallische Hüllen können die Reichweite verkürzen. Wenn du einen Tag auf Metall kleben willst (zum Beispiel auf den Laptop), nimm einen, der für Metallflächen gemacht ist - der hat eine Ferrit-Abschirmung.

### Was ist der Unterschied zwischen NFC-Tags und NFC-Karten?
Im Kern keiner. Eine NFC-Karte ist einfach ein NFC-Tag im Kartenformat, Chip und Antenne darin sind dieselbe Technik. Karten haben meist einen NTAG213 oder NTAG215 und sind beliebt für Visitenkarten, Zugangsausweise und Bonusprogramme.

---

## Los geht's: dein erstes NFC-Projekt

Lust, es auszuprobieren? Hier ist ein Fünf-Minuten-Projekt, das ich jedem als Einstieg empfehlen würde:

**Projekt: ein WLAN-Tag für Gäste bei dir zu Hause**

1. **Tags kaufen:** Besorg dir ein Pack [NTAG216-Sticker](/de/affiliate-links/) (etwa 10 € für 25 Stück)
2. **NFC.cool Tools laden:** für [iOS](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-tags-beginners-guide-de&mt=8) oder [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-tags-beginners-guide-de)
3. **WLAN-Zugangsdaten schreiben:** Öffne die App, wähle Schreiben, dann WLAN, gib Netzwerkname und Passwort ein und halte das Handy an den Tag
4. **Tag anbringen:** irgendwo, wo man ihn sieht - an der Haustür, am Kühlschrank, im Gästezimmer
5. **Testen:** Halte ein anderes Handy dran, und es sollte dich fragen, ob du dem Netzwerk beitreten willst

Kostenpunkt: etwa 0,30 € und zwei Minuten. Jeder Gast, der bei dir vorbeikommt, wird es dir danken.

---

## Zum Schluss

NFC-Tags gehören zu den Technologien, die kompliziert klingen und sich dann als erstaunlich simpel herausstellen. Keine Batterien, kein Koppeln, fürs einfache Lesen keine App. Für ein paar Cent bekommst du einen programmierbaren Chip, der Jahre hält und mit Milliarden von Handys funktioniert.

Ich habe meine Arbeit um diese kleinen Chips herum aufgebaut und entdecke immer noch neue Einsatzmöglichkeiten. Ob du deinen Morgen automatisieren, deine Kontaktdaten weitergeben oder einfach etwas Verspieltes bauen willst: Ein Tag ist die Brücke zwischen einem kurzen Dranhalten und dem, was danach in der echten Welt passiert.

**Bereit, deine ersten NFC-Tags zu programmieren?** Lade dir [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-tags-beginners-guide-de&mt=8) fürs iPhone oder für [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-tags-beginners-guide-de) - der einfachste Weg, den ich kenne, um NFC-Tags zu lesen, zu beschreiben und zu verwalten.

**Du willst eine digitale Visitenkarte per NFC?** Dann schau dir [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-nfc-tags-beginners-guide-de&mt=8) an: Damit gibst du deinen Kontakt mit einem einzigen Scan weiter. App und App Clip gibt es in 35 Sprachen.
