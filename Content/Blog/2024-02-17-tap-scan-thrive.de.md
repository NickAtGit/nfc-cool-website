---
id: nfc-blog-022
title: "Tap, Scan, Thrive: Was QR-Codes jenseits einer URL transportieren können"
date: 2024-02-17
tags: [qr-codes, wifi, vcard, business-card]
summary: "QR-Codes sind nicht nur für URLs. Sie können WLAN-Zugangsdaten, Kalendereinträge, Standorte, vCards, Klartext transportieren - alles, was du kodieren kannst. Hier ist das volle Menü dessen, was NFC.cools QR-Generator und -Scanner können."
metaTitle: "Was QR-Codes transportieren können: Mehr als nur URLs"
metaDescription: "QR-Codes können WLAN-Zugangsdaten, Kontakte, Kalendereinträge, Standorte und mehr kodieren - nicht nur URLs. Ein praktischer Guide zu jedem QR-Payload-Typ."
ogTitle: "Tap, Scan, Thrive: Was QR-Codes jenseits einer URL transportieren können"
ogDescription: "QR-Codes können WLAN, Kontakte, Kalender, Standorte kodieren - nicht nur URLs."
image: "/assets/images/Blog/tap-scan-thrive.webp"
---
Ein QR-Code ist einfach ein Eimer voller Bytes. URLs sind bei Weitem die häufigste Payload, aber der Spec ist das egal - du kannst WLAN-Zugangsdaten, einen Kalendereintrag, eine Karten-Pin, eine Kontaktkarte, Klartext oder eine beliebige Custom-Payload kodieren, die eine App entschlüsseln kann.

NFC.cools QR-Generator deckt all das ab. Hier ist, was jede Variante beim Scannen tatsächlich macht.

## URLs

Der Basisfall. Kodiere `https://example.com`, scanne mit jeder Kamera, und das Gerät bietet an, sie zu öffnen. Funktioniert auf jedem Handy der letzten Dekade.

Eine nützliche Variante: Kurzlinks. Wenn du Analytics-lastige URLs hast, generiere den QR über die Kurzversion - das macht den QR-Code physisch kleiner (weniger Module = weniger dicht) und aus der Entfernung leichter scanbar.

## WLAN-Zugangsdaten

Kodiere SSID, Passwort und Security-Typ (WPA2, WPA3, offen) im Standardformat `WIFI:T:WPA;S:...;P:...;;`. iOS, Android und modernes Windows erkennen das Format und bieten den Beitritt an.

Druck das auf eine kleine Karte in deinem Gästezimmer. Kleb es auf die Rückseite des Routers. Tape es an die Wand in einem Café. Gäste scannen, treten bei, fertig - kein Tippen von 24-Zeichen-Passwörtern.

## Kalendereinträge

Kodiere einen Termin als `BEGIN:VEVENT`-Block (das iCalendar-Format). Scannen bietet an, ihn in die Kalender-App des Geräts zu übernehmen, komplett mit Startzeit, Endzeit, Ort und Beschreibung.

Nützlich auf Event-Postern, Konferenzbeschilderung oder "Save the Date"-Karten. Der Empfänger muss den Termin nicht erst auf einer Website finden - ein Tippen, und er ist im Kalender.

## Standorte

Kodiere eine `geo:`-URI mit Breite und Länge. Scannen öffnet die Standard-Karten-App an diesem Pin - Apple Maps auf iOS, Google Maps auf den meisten Android-Handys.

Restaurants, Venues, Treffpunkte: Klebe einen kleinen QR auf den Flyer oder die Einladung, Empfänger bekommen Navigation mit einem Tippen.

## vCard (Kontakte)

Die häufigste Alternative zu URLs. Kodiere eine vollständige vCard (Name, Telefon, E-Mail, Firma, Adresse, URL, Foto) und das Gerät bietet an, sie als Kontakt zu speichern.

QR-Visitenkarten funktionieren genau so out of the box. Es ist auch der Grund, warum eine vCard-QR auf jedem Handy ohne spezielle App funktioniert - vCard ist ein 30 Jahre alter Standard, den das OS bereits kennt.

Der Trade-off vs. dem NFC.cool-Business-Card-Flow: Eine vCard-QR kann nicht aktualisiert werden. Einmal gedruckt, sind die Kontaktdaten eingefroren. Wenn du eine "Single Source of Truth" willst, die du später editieren kannst, kodiere stattdessen eine URL zu deiner Live-Visitenkarten-Seite - genau das macht [NFC.cool Business Card](https://apps.apple.com/app/nfc-cool-business-card-maker/id6502926572?pt=106913804&ct=BlogTapScan&mt=8), und deshalb empfehlen wir es für ernsthaftes Networking statt einer rohen vCard-QR.

## Klartext

Wenn du beim Scannen einfach einen String anzeigen willst - eine Nachricht, einen Gutscheincode, ein Rätsel - kannst du Klartext kodieren. Die meisten Scanner-Apps zeigen ihn und bieten an, ihn zu kopieren oder zu teilen.

## Custom Payloads

Manche Apps registrieren Custom-URL-Schemes (`myapp://...`) und erkennen damit kodierte QR-Codes. NFC.cools Scanner respektiert die - er liest die Payload und übergibt an die registrierte App, genau so, wie iOS oder Android es via Universal Links machen.

## Auf der Scan-Seite

NFC.cools Scanner liest jedes der obigen Formate und routet zur passenden Aktion: URLs öffnen im Browser, vCards bieten Speicherung an, WLAN bietet Verbindung, Standorte öffnen in Maps. Er führt auch eine lokale Historie jedes Scans - nützlich, wenn du 30 Speisekarten auf einer Konferenz gescannt hast und eine wiederfinden willst.

Der gesamte QR-Stack - Generator und Scanner - ist verfügbar in [NFC.cool Tools für iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=BlogTapScan&mt=8) und [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dblog-tap-scan).
