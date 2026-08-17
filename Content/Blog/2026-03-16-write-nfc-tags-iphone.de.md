---
id: nfc-blog-010
title: "NFC-Tags mit dem iPhone beschreiben: So geht's"
date: 2026-03-16
tags: ["nfc-tags", "guides", "iphone"]
summary: "Dein iPhone kann NFC-Tags nicht nur lesen, sondern auch beschreiben. Hier zeige ich dir Schritt für Schritt, wie du NFC-Tags mit dem iPhone programmierst: von der Wahl der passenden Tags bis zu URLs, WLAN-Zugang, Kontaktkarten und Automatisierungen."
image: "/assets/images/Blog/write-nfc-tags-iphone.webp"
imageAlt: "iPhone beschreibt leere NFC-Tags, mit Fortschritts- und Häkchensymbolen"
metaTitle: "NFC-Tags mit dem iPhone beschreiben: Anleitung (2026)"
metaDescription: "So beschreibst du NFC-Tags mit dem iPhone: Schritt-für-Schritt-Anleitung für URLs, WLAN, Kontakte und Automatisierungen mit NFC.cool Tools und iOS-Kurzbefehlen."
ogTitle: "NFC-Tags mit dem iPhone beschreiben"
ogDescription: "Schritt für Schritt: NFC-Tags mit dem iPhone beschreiben - URLs, WLAN, Kontakte und Automatisierungen. Ganz ohne Spezialausrüstung."
---
Dass ihr iPhone NFC-Tags *lesen* kann, wissen die meisten: zum Bezahlen ans Terminal halten, eine Fahrkarte scannen, einen Link öffnen. Was ich dagegen immer wieder erklären muss: Dein iPhone kann NFC-Tags auch *beschreiben*. Aus einem leeren Tag wird so ein Auslöser für so ziemlich alles, was du dir ausdenken kannst.

Ich arbeite seit Jahren an NFC.cool, einer App zum Lesen und Beschreiben von NFC-Tags, und das Beschreiben ist ehrlich gesagt der Teil, der mir bis heute nicht langweilig geworden ist. Ein Tag auf dem Nachttisch, der das Handy stumm schaltet und den Wecker stellt? Einer auf dem Schreibtisch, der deine Arbeits-Playlist startet? Einer an der Haustür, über den Gäste ins WLAN kommen? All das kannst du mit dem iPhone selbst programmieren. Und wenn du es einmal gemacht hast, fragst du dich, warum du nicht schon viel früher damit angefangen hast.

Das hier ist die Anleitung, die ich einer Freundin in die Hand drücken würde, die sich gerade ihre erste Packung Tags bestellt hat: was du brauchst, wie du die verschiedenen Datentypen schreibst und welche Projekte ich selbst in ein paar Minuten aufsetzen würde. Wenn NFC für dich noch komplett neu ist, fang am besten mit meinem [Einsteiger-Guide zu NFC-Tags](/de/blog/nfc-tags-beginners-guide/) an, da stehen die Grundlagen drin.

---

## Was du brauchst

Zum Loslegen brauchst du genau drei Dinge, und teuer ist keins davon.

### 1. Ein passendes iPhone

Zum Beschreiben von NFC-Tags brauchst du ein **iPhone 7 oder neuer** mit **iOS 13 oder neuer**. Wenn dein iPhone aus den letzten acht Jahren stammt, passt das.

Am meisten Freude hast du mit einem iPhone, das **NFC im Hintergrund lesen** kann (iPhone XS und neuer). Diese Modelle lesen NFC-Tags, ohne dass vorher eine App geöffnet sein muss, und genau das macht die Tags, die du beschreibst, im Alltag so viel angenehmer. Wenn du genau wissen willst, wie die iPhone-Hardware das im Detail macht: In meinem [Insider-Blick auf NFC bei iPhones](/de/blog/nfc-on-iphones-insider-look/) gehe ich das ausführlich durch.

### 2. Leere NFC-Tags

[Leere NFC-Tags kaufst du](/de/affiliate-links/) online schon ab **0,30-1,00 € pro Stück**. Es gibt sie in mehreren Bauformen:

| Bauform | Passt gut für |
|-------------|----------|
| **Sticker** (rund, 25-30 mm) | Flächen, Gegenstände, Poster |
| **Karten** (Scheckkartenformat) | Geldbörse, Visitenkarten |
| **Schlüsselanhänger** | Schlüsselbund, Taschen |
| **Armbänder** | Events, Zutrittskontrolle |
| **Münz-Tags** (dicke Scheiben) | zum Einbetten in Gegenstände |

**Welchen Chip solltest du nehmen?**

Wenn ich mich auf einen festlegen müsste: Für die meisten Projekte ist der **NTAG216** die beste Wahl - 888 Bytes nutzbarer Speicher, breit kompatibel und in größeren Stückzahlen bezahlbar. Das ist der Chip, den ich empfehle und mit dem ich selbst am meisten teste. Kurz zusammengefasst:

- **NTAG213** (144 Bytes) - reicht für URLs und kurzen Text. Die günstigste Variante.
- **NTAG215** (504 Bytes) - reicht für Kontaktkarten, WLAN-Zugangsdaten und mehrere Datensätze.
- **NTAG216** (888 Bytes) - der beste Allrounder. Am meisten Luft für Kontaktkarten, WLAN-Zugangsdaten und längere Inhalte wie ausführliche vCards. Den empfehle ich für die meisten Projekte.

Wenn du unsicher bist, nimm eine gemischte Packung NTAG216-Sticker und zerbrich dir nicht weiter den Kopf, damit deckst du 90 % aller Fälle ab. Die komplette Übersicht Chip für Chip, inklusive der Frage, welche Typen iPhones wirklich mögen, findest du in meinem [Guide zu NFC-Tag-Typen fürs iPhone](/de/blog/nfc-tag-types-for-iphones/).

### 3. Eine App zum Beschreiben

Zum Beschreiben von Tags braucht dein iPhone eine App. Das Lesen übernimmt iOS von Haus aus, fürs Schreiben brauchst du aber eine eigene App.

An genau diesem Teil arbeite ich seit Jahren, also sage ich es gleich dazu: Ich bin hier nicht neutral. **[NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-de&mt=8)** habe ich genau dafür gebaut, für iPhone und [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-de). Die App schreibt alle gängigen NDEF-Datensatztypen - URLs, Text, WLAN-Konfigurationen, Kontakte und mehr - und zeigt dir dabei übersichtlich, wie viel vom Speicher des Tags du gerade belegst. Außerdem kannst du Tags sperren, technische Details auslesen und das Schreiben über iOS-Kurzbefehle automatisieren. Die komplette Funktionsliste steht auf der [Seite zum NFC-Reader und -Writer](/de/features/nfc-reader-writer/).

Es gibt auch andere Wege (Apples Kurzbefehle-App etwa schreibt einfache URLs), aber mit einer eigenen NFC-App hast du deutlich mehr in der Hand: was du schreibst und wie.

---

## Schritt für Schritt: Dein erster NFC-Tag

Ich fange bei dir da an, wo ich bei allen anfange: eine URL auf einen Tag schreiben. Das ist der häufigste Anwendungsfall und der schnellste Erfolg.

### Eine URL schreiben

1. **Öffne NFC.cool Tools** und tippe auf den Tab **Schreiben**
2. **Wähle „URL“** als Datensatztyp
3. **Gib deine URL ein**, zum Beispiel `https://nfc.cool`
4. **Tippe auf „Auf Tag schreiben“**
5. **Halte dein iPhone an den leeren NFC-Tag** - die obere Kante des iPhones (da sitzt die NFC-Antenne) sollte nicht weiter als 2-3 cm vom Tag entfernt sein
6. **Warte auf die Bestätigung** - du spürst eine kurze Vibration und siehst ein Häkchen

Das war's schon. Wer diesen Tag jetzt mit seinem Handy scannt, landet auf deiner URL - ohne App, ohne QR-Code. Als ich zum ersten Mal das Gesicht eines Kollegen gesehen habe, während ein unscheinbarer Sticker eine Website öffnete, war mir klar: Mit dieser Demo fängt man an.

**Profi-Tipp:** Die NFC-Antenne sitzt beim iPhone an der **oberen Kante**, in der Nähe der Kamera. Am stabilsten ist die Verbindung, wenn du die Oberseite des iPhones direkt über den Tag hältst. Und wenn du ohne App kurz nachsehen willst, was du geschrieben hast: Auf Android kannst du [NFC-Tags direkt im Browser lesen](/de/online-nfc-reader/).

---

## Was du auf NFC-Tags schreiben kannst

NFC-Tags nutzen ein Format namens **NDEF** (NFC Data Exchange Format), das eine Handvoll Standard-Datensatztypen festlegt. Als ich dieses Modell verstanden hatte, war die ganze Technik für mich plötzlich keine Zauberei mehr. Das kannst du schreiben:

### URLs und Links

Der häufigste Einsatz und der, den ich selbst am meisten nutze. Schreib eine beliebige Webadresse auf den Tag, und ein Scan öffnet sie im Browser des Handys.

**Typische Einsätze:**
- Speisekarte per Link auf einem Tag am Tisch
- Portfolio oder LinkedIn-Profil auf einer Visitenkarte
- Produktseite auf einem Tag am Ladenregal
- Feedback-Formular am Empfang

**Speicherbedarf:** ca. 30-80 Bytes (die meisten URLs passen auf jeden Tag)

### WLAN-Zugangsdaten

Schreib den Namen deines WLANs (SSID) und das Passwort auf einen Tag. Gäste halten ihr Handy dran und sind drin, ohne ein langes Passwort abzutippen.

**So schreibst du WLAN-Zugangsdaten:**

1. Wähle in NFC.cool Tools **„WLAN“** als Datensatztyp
2. Gib den **Netzwerknamen** (SSID) ein
3. Gib das **Passwort** ein
4. Wähle den **Sicherheitstyp** (bei den meisten Heimnetzen WPA2 oder WPA3)
5. Schreib auf den Tag

**Profi-Tipp:** Kleb einen WLAN-Tag neben den Router, häng ihn als Anhänger ans Schlüsselbrett bei der Tür oder leg ihn ins Gästezimmer. Beschrifte ihn mit „Handy dranhalten für WLAN“. Meiner Erfahrung nach ist das der eine Tag, für den sich am Ende jeder Gast bedankt.

**Speicherbedarf:** ca. 60-120 Bytes, je nach Passwortlänge

### Kontaktkarten (vCard)

Schreib einen vCard-Kontakt auf einen Tag. Wer ihn scannt, bekommt deine Kontaktdaten direkt zum Speichern angezeigt: Name, Telefon, E-Mail, Firma, Adresse.

Im Grunde ist das eine digitale Visitenkarte, nur direkt in einen physischen Tag gepackt. Keine App, keine Internetverbindung, die Kontaktdaten liegen auf dem Tag selbst.

**So schreibst du einen Kontakt:**

1. Wähle **„Kontakt“** als Datensatztyp
2. Füll die Felder aus, die du weitergeben willst (Name, Telefon, E-Mail usw.)
3. Schreib auf den Tag

**Speicherbedarf:** ca. 100-400 Bytes, je nachdem, wie viele Felder du ausfüllst. Für Kontakte mit Adresse und Notizen nimm einen NTAG215 oder NTAG216.

Eine ehrliche Warnung aus den Support-Mails, die bei mir landen: Rohe vCards auf einem Tag verhalten sich auf dem iPhone nicht immer zuverlässig. Wenn deine nicht sauber aufgeht, habe ich die Ursachen in [Warum dein vCard-NFC-Tag auf dem iPhone nicht funktioniert](/de/blog/vcard-nfc-iphone-not-working/) aufgedröselt.

**Hinweis:** Wenn du mehr willst - Foto, Social-Links, Statistiken - schau dir **[NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-de&mt=8)** an. Die App legt dir ein gehostetes Profil für deine digitale Visitenkarte an und schreibt den Link auf jeden beliebigen NFC-Tag. Wer den Tag scannt, sieht auf dem iPhone einen nativen App Clip, auf Android öffnet sich eine Website auf der nfc.cool-Domain, ganz ohne App. Beim Netzwerken hat sich das für mich als deutlich zuverlässiger erwiesen als rohe vCards.

### Reiner Text

Schreib eine beliebige Textnachricht auf einen Tag. Das kommt seltener vor als URLs, ist aber praktisch für:

- Inventar-Etiketten (Seriennummern, Beschreibungen)
- Anleitungen oder Notizen an Geräten
- Versteckte Botschaften bei Schnitzeljagden
- Bestandsverfolgung im Lager

**Speicherbedarf:** hängt von der Textlänge ab (ca. 1 Byte pro Zeichen)

### Telefonnummern und E-Mail-Adressen

Schreib eine `tel:`- oder `mailto:`-URI, dann startet ein Scan direkt einen Anruf oder eine neue E-Mail.

Praktisch für:
- Notfallkontakt-Tags an medizinischen Geräten
- „Bei Störung anrufen“-Tags an Automaten
- Support-Tags an Produkten

### App-spezifische Daten

Manche Apps schreiben eigene NDEF-Datensätze, die eine bestimmte Aktion in der App auslösen. Du könntest zum Beispiel einen Datensatz schreiben, der einen bestimmten Kurzbefehl, eine Playlist oder einen Bildschirm in einer App öffnet.

---

## Für Fortgeschrittene: Schreiben mit iOS-Kurzbefehlen

Hier fängt für mich der Spaß erst richtig an. Apples **Kurzbefehle**-App kann von Haus aus NFC-Tags schreiben, und NFC.cool Tools legt mit eigenen Kurzbefehl-Aktionen noch einiges obendrauf.

### Einfache URLs mit Kurzbefehlen schreiben

1. Öffne die **Kurzbefehle**-App
2. Leg einen neuen Kurzbefehl an
3. Such die Aktion **„NFC-Tag festlegen“** (unter Skripting → NFC)
4. Stell ein, was geschrieben werden soll (URL, Text usw.)
5. Führ den Kurzbefehl aus und halte einen Tag ans iPhone

Praktisch, wenn du mehrere Tags hintereinander mit denselben Daten beschreiben willst.

### Die Kurzbefehl-Aktionen von NFC.cool Tools

NFC.cool Tools bringt eigene Kurzbefehl-Aktionen mit, die dir mehr Möglichkeiten geben:

- **Tag schreiben** - schreibt jeden unterstützten Datensatztyp automatisiert
- **Tag lesen** - scannt einen Tag und gibt die Daten an deinen Kurzbefehl zurück
- **Scan-Verlauf** - greift auf deine letzten Scan-Ergebnisse zu

Damit lassen sich ganze Abläufe automatisieren. Du könntest zum Beispiel einen Kurzbefehl bauen, der:
1. nach einem Produktnamen fragt
2. daraus eine URL wie `https://deineseite.com/produkt/{name}` erzeugt
3. sie auf einen NFC-Tag schreibt
4. den Tag in einer Tabelle protokolliert

Ideal, wenn du viele Teile inventarisieren oder Event-Badges vorbereiten musst.

---

## NFC-Tag-Projekte für den Alltag

Zu diesen Projekten komme ich immer wieder zurück. Jedes davon ist in ein paar Minuten aufgesetzt:

### Tags fürs Smart Home

**Nachttisch-Tag - „Schlafenszeit“**
Schreib eine URL, die einen iOS-Kurzbefehl auslöst, der:
- „Nicht stören“ einschaltet
- den Wecker für morgen stellt
- die Bildschirmhelligkeit runterdreht
- eine Einschlaf-Playlist startet

**Schreibtisch-Tag - „Arbeitsmodus“**
- Aufgabenverwaltung öffnen
- Fokus-Timer starten
- Mit dem Firmen-VPN verbinden
- Konzentrations-Playlist starten

**Tür-Tag - „Haus verlassen“**
- Wettervorhersage anzeigen
- Fahrzeit zur Arbeit anzeigen
- „Abwesend“-Szene im Smart Home auslösen

### Tags fürs Business

**Konferenz-Badge**
Schreib die URL deiner NFC.cool Business Card auf einen Tag und kleb ihn hinten auf dein Konferenz-Badge. Kontakte halten ihr Handy an dein Badge → deine komplette digitale Visitenkarte erscheint.

**Produkt-Tags**
Schreib Links zur Produktdokumentation, zur Garantieregistrierung oder zu Support-Seiten drauf und bring die Tags am Produkt oder an der Verpackung an.

**Besprechungsraum-Tags**
Schreib den Link zum Buchungskalender des Raums oder die WLAN-Zugangsdaten drauf. Neben der Tür anbringen.

### Kreative Projekte

**Musik-Tags**
Schreib Album-Links von Spotify oder Apple Music auf NFC-Sticker. Kleb sie aufs gedruckte Albumcover, und ein Scan spielt das Album ab.

**Brettspiel-Tags**
Schreib Links zu Regel-PDFs oder Erklärvideos drauf und kleb sie innen in den Schachteldeckel.

**Rezept-Tags**
Schreib Links zu deinen Lieblingsrezepten drauf und kleb die Tags auf Gewürzgläser oder in Kochbücher.

---

## NFC-Tags sperren

Wenn ein Tag beschrieben ist und der Inhalt passt, kannst du ihn **sperren**. Ein gesperrter Tag ist dauerhaft schreibgeschützt, niemand kann deine Daten mehr überschreiben. Für mich ist das ein bewusster, letzter Schritt und nichts, was man schnell wegklickt, denn es gibt kein Zurück.

**In NFC.cool Tools:**
1. Tippe nach dem Schreiben auf die Option **Sperren**
2. Bestätige - **das lässt sich nicht rückgängig machen**

**Wann sperren:**
- Tags an öffentlichen Orten (damit niemand daran herumpfuscht)
- Produkt-Tags (damit deine URLs geschützt bleiben)
- Visitenkarten (damit deine Kontaktdaten unangetastet bleiben)
- jeder Tag, den du ohnehin nicht neu beschreiben willst

**Wann lieber NICHT sperren:**
- Tags, die du später vielleicht ändern willst (das WLAN-Passwort ändert sich, saisonale URLs)
- zum Ausprobieren und Lernen - lass sie beschreibbar, solange du testest

---

## Wenn es nicht klappt

Die meisten „Warum schreibt er nicht?“-Fragen, die ich bekomme, laufen auf eine dieser vier Ursachen hinaus. So würde ich sie der Reihe nach durchgehen.

### Fehler „Schreiben nicht möglich“

- **Der Tag ist vielleicht gesperrt.** Wenn jemand (oder du selbst) den Tag früher gesperrt hat, ist er dauerhaft schreibgeschützt. Da hilft nur ein neuer Tag.
- **Zu wenig Speicher.** Deine Daten sind womöglich zu groß für den Tag. Nimm einen mit mehr Speicher (NTAG215 → NTAG216) oder kürze die Daten.
- **Der Tag liegt nicht richtig.** Bewege die obere Kante des iPhones langsam über den Tag. Manche Untergründe (Metall, dicke Hüllen) stören.
- **Der Tag ist kaputt.** NFC-Tags halten viel aus, aber nicht alles. Große Hitze, Knicken oder ein Loch im Tag können ihn zerstören.

### Das Schreiben scheint zu klappen, aber der Tag reagiert nicht

- **NDEF-Format prüfen.** Damit Handys die Daten automatisch lesen, müssen sie im NDEF-Format geschrieben sein. NFC.cool Tools macht das für dich, aber selbst zusammengebaute Tags haben manchmal Formatierungsfehler.
- **Das iPhone-Modell spielt eine Rolle.** Ältere iPhones (7, 8, X) brauchen eine App, um Tags zu lesen. iPhone XS und neuer lesen Tags automatisch im Hintergrund.

### Der Tag funktioniert auf Android, aber nicht auf dem iPhone

- **Chip-Typ prüfen.** iPhones kommen am besten mit Chips der NTAG-Serie zurecht (NTAG213, 215, 216). Manche anderen Chip-Typen sind mit iOS nicht kompatibel.
- **NDEF-Formatierung.** Der Tag muss NDEF-formatiert sein. Manche Tags aus Großpackungen kommen unformatiert an - beschreib sie einmal mit NFC.cool Tools, dann werden sie automatisch formatiert.

---

## Tipps, damit du mehr aus deinen NFC-Tags rausholst

Das sind die kleinen Lektionen, die ich selbst auf die harte Tour gelernt habe, damit du sie dir sparen kannst.

1. **Beschrifte deine Tags.** Ein unbeschrifteter Sticker auf dem Schreibtisch hilft niemandem. Nimm einen Etikettendrucker oder einen Edding und schreib drauf, was der Tag macht („Handy dranhalten für WLAN“, „Arbeitsmodus“ usw.).

2. **Meide Metallflächen.** Metall stört das NFC-Signal. Wenn es unbedingt Metall sein muss, nimm **Anti-Metall-NFC-Tags** (die haben eine Ferritschicht, die die Störung abschirmt). Sie sind etwas dicker und teurer, funktionieren auf Metall aber einwandfrei.

3. **Erst testen, dann kleben.** Tag beschreiben, testen, und erst dann die Schutzfolie abziehen und den Tag festkleben. Einen festgeklebten Tag zum Neubeschreiben wieder abzupulen ist genau die Art von Kleinkram, die ich mir inzwischen konsequent erspare.

4. **Nimm den passenden Tag für den Zweck.** Verschwende keinen NTAG216 (888 Bytes) an eine simple URL, die 40 Bytes braucht. Und versuch nicht, eine komplette vCard auf einen NTAG213 (144 Bytes) zu quetschen.

5. **Es gibt wasserfeste Tags.** Epoxidbeschichtete NFC-Tags sind wasserdicht und robuster. Gut für draußen, für die Küche oder fürs Bad.

6. **Kombiniere NFC-Tags mit Kurzbefehlen.** Die eigentliche Stärke von NFC-Tags am iPhone ist nicht, dass sie URLs öffnen, sondern dass sie komplexe Automatisierungen anstoßen. Ein NFC-Tag kann jeden iOS-Kurzbefehl starten, und der steuert dann Smart-Home-Geräte, verschickt Nachrichten, protokolliert Daten und vieles mehr.

---

## Häufige Fragen

### Kann ich einen NFC-Tag neu beschreiben?

Ja, solange er nicht gesperrt wurde. Normale NFC-Tags lassen sich **über 100.000 Mal** neu beschreiben. Schreib die neuen Daten einfach über die alten, vorher „löschen“ musst du nichts.

### Wie nah muss mein iPhone ran?

Auf **2-4 cm** (etwa 1-2 Zoll). Die NFC-Antenne sitzt an der oberen Kante des iPhones. Halte die Oberseite des Handys direkt über den Tag, dann ist die Verbindung am besten.

### Kann ich NFC-Tags auch ohne App beschreiben?

Die Kurzbefehle-App von iOS hat die Aktion „NFC-Tag festlegen“ für einfache Fälle (URLs, Text) eingebaut. Für WLAN-Zugangsdaten, Kontakte und komplexere Datensätze brauchst du aber eine App wie NFC.cool Tools.

### Brauchen NFC-Tags Batterien?

Nein. NFC-Tags sind **passiv**: Sie haben keine Batterie und holen sich beim Scannen ihren Strom aus dem NFC-Reader deines Handys. Deshalb halten Tags auch **10 Jahre und länger**, es kann schlicht nichts leer werden.

### Kann ich einen NFC-Tag mit einem Passwort schützen?

Ja. NFC.cool Tools kann NTAG-Tags mit einem Passwortschutz versehen, auf iPhone und Android. Beachte aber: Das verhindert nur, dass der Tag **überschrieben** wird. Vom **Lesen** des vorhandenen Inhalts hält es niemanden ab. Wenn der Inhalt selbst ohne Schlüssel unlesbar sein soll, brauchst du verschlüsselte Daten - siehe dazu den Beitrag zu [NFC Safe](/de/blog/nfc-safe-encrypted-secrets/). Die andere Möglichkeit ist das Sperren: Das blockiert jedes weitere Schreiben dauerhaft.

### Funktionieren NFC-Tags durch die Handyhülle?

Ja, mit den meisten Hüllen ist das kein Problem. NFC geht durch Plastik, Silikon, Leder und sogar dünne Geldbörsen. Sehr dicke Hüllen (etwa robuste Outdoor-Hüllen) oder Hüllen mit Metallplatte (für magnetische Autohalterungen) können stören.

### Wie viele Tags kann ich mit einem iPhone beschreiben?

So viele du willst. Es gibt keine Obergrenze. Der begrenzende Faktor sind die Tags, nicht dein Handy.

---

## Wie geht es weiter?

Jetzt weißt du, wie man NFC-Tags beschreibt, und ab hier steht dir so ziemlich alles offen. Mein Rat ist immer derselbe: Fang mit einem einfachen Projekt an, einem WLAN-Tag für Gäste oder einem Visitenkarten-Tag, nimm den kleinen Erfolg mit und bau darauf auf.

Wenn du eine leistungsfähige NFC-Schreib-App suchst, die trotzdem einfach zu bedienen ist: **[NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-de&mt=8)** ist die App, die ich genau dafür gebaut habe, von der simplen URL bis zur erweiterten Tag-Verwaltung, mit iOS-Kurzbefehl-Anbindung für Automatisierungen.

Und wenn du aus NFC-Tags professionelle digitale Visitenkarten machen willst: Mit **[NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-de&mt=8)** legst du dir ein schickes Kartenprofil an und schreibst dessen URL auf jeden NFC-Tag. Die App-Oberfläche und der App Clip gibt es auf iOS in 35 Sprachen, Android-Empfänger sehen eine Website auf der nfc.cool-Domain (derzeit nur auf Englisch).

**NFC.cool Tools laden:** [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-de&mt=8) | [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-de)

**NFC.cool Business Card laden:** [App Store](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-de&mt=8) | [Google Play](https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-de)
