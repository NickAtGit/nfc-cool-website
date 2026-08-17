---
id: nfc-blog-022
title: "Mehr als nur ein Link: Was alles in einen QR-Code passt"
date: 2024-02-17
tags: ["qr-codes", "business-cards"]
summary: "QR-Codes sind nicht nur für URLs da. WLAN-Zugangsdaten, Termine, Standorte, vCards, einfacher Text - alles, was sich kodieren lässt, passt hinein. Hier ist die komplette Liste dessen, was der QR-Generator und der Scanner in NFC.cool können."
metaTitle: "Was in einen QR-Code passt: Mehr als nur URLs"
metaDescription: "QR-Codes können WLAN-Zugangsdaten, Kontakte, Termine, Standorte und mehr enthalten - nicht nur URLs. Ein praktischer Guide zu jedem QR-Inhaltstyp."
ogTitle: "Mehr als nur ein Link: Was alles in einen QR-Code passt"
ogDescription: "QR-Codes können WLAN, Kontakte, Termine und Standorte enthalten - nicht nur URLs."
image: "/assets/images/Blog/tap-scan-thrive.webp"
---
Ein QR-Code ist im Grunde nur ein Behälter für Bytes. Meistens steckt eine URL drin, aber dem Standard ist das völlig egal: Genauso gut lassen sich WLAN-Zugangsdaten, ein Termin, ein Punkt auf der Karte, eine Kontaktkarte, einfacher Text oder eine beliebige eigene Payload kodieren, mit der irgendeine App etwas anfangen kann.

Der QR-Generator in NFC.cool beherrscht all diese Varianten. Was beim Scannen jeweils wirklich passiert, gehe ich hier der Reihe nach durch.

---

## URLs

Der Klassiker. Du kodierst `https://example.com`, scannst mit einer beliebigen Kamera-App, und das Handy bietet an, die Seite zu öffnen. Das klappt auf praktisch jedem Handy aus den letzten zehn Jahren.

Ein Tipp aus der Praxis: Kurzlinks. Wenn deine URLs vor lauter Analytics-Parametern ewig lang sind, erzeug den QR-Code lieber aus der Kurzversion. Der Code wird dadurch physisch kleiner (weniger Module, also weniger dicht) und lässt sich auch aus größerer Entfernung besser scannen.

---

## WLAN-Zugangsdaten

SSID, Passwort und Verschlüsselungstyp (WPA2, WPA3, offen) kommen im Standardformat `WIFI:T:WPA;S:...;P:...;;` in den Code. iOS, Android und ein aktuelles Windows erkennen das Format und fragen direkt, ob sie dem Netzwerk beitreten sollen.

Druck das auf ein Kärtchen fürs Gästezimmer. Kleb es hinten auf den Router. Häng es im Café an die Wand. Gäste scannen, sind drin, fertig - niemand muss mehr ein 24-stelliges Passwort abtippen.

---

## Kalendereinträge

Ein Termin wird als `BEGIN:VEVENT`-Block kodiert, also im iCalendar-Format. Beim Scannen bietet das Handy an, ihn in die Kalender-App zu übernehmen, samt Startzeit, Endzeit, Ort und Beschreibung.

Praktisch auf Veranstaltungsplakaten, Konferenzschildern oder „Save the Date“-Karten. Niemand muss den Termin erst irgendwo auf einer Website zusammensuchen: ein Fingertipp, und er steht im Kalender.

---

## Standorte

Hier steckt eine `geo:`-URI mit Breiten- und Längengrad im Code. Beim Scannen öffnet sich die Standard-Karten-App genau an diesem Punkt - Apple Maps auf iOS, Google Maps auf den meisten Android-Handys.

Restaurants, Veranstaltungsorte, Treffpunkte: Ein kleiner QR-Code auf dem Flyer oder der Einladung, und wer ihn scannt, hat die Route mit einem Fingertipp.

---

## vCard (Kontakte)

Die häufigste Alternative zur URL. Du kodierst eine vollständige vCard (Name, Telefon, E-Mail, Firma, Adresse, URL, Foto), und das Handy bietet an, das Ganze als Kontakt zu speichern.

Genau so funktionieren QR-Visitenkarten von Haus aus. Und deshalb läuft eine vCard-QR auch auf jedem Handy ohne zusätzliche App: vCard ist ein 30 Jahre alter Standard, den das Betriebssystem ohnehin kennt.

Der Haken im Vergleich zur Visitenkarte von NFC.cool: Eine vCard im QR-Code lässt sich nachträglich nicht mehr ändern. Einmal gedruckt, sind die Kontaktdaten eingefroren. Wenn du deine Daten lieber an einer Stelle pflegen und später noch bearbeiten willst, kodiere stattdessen eine URL zu deiner Online-Visitenkarte. Genau das macht [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-tap-scan-thrive-de&mt=8), und deshalb empfehle ich fürs ernsthafte Networking eher die App als eine nackte vCard-QR.

---

## Einfacher Text

Manchmal soll beim Scannen einfach nur ein Text erscheinen - eine Nachricht, ein Gutscheincode, ein Rätsel. Dann kodierst du schlicht den Text selbst. Die meisten Scanner-Apps zeigen ihn an und bieten an, ihn zu kopieren oder zu teilen.

---

## Eigene Payloads

Manche Apps registrieren ein eigenes URL-Schema (`myapp://...`) und erkennen QR-Codes, die damit kodiert sind. Der Scanner in NFC.cool respektiert das: Er liest die Payload und reicht sie an die zuständige App weiter, so wie es iOS oder Android bei Universal Links auch machen.

---

## Was der Scanner daraus macht

Der Scanner in NFC.cool liest jedes dieser Formate und löst die passende Aktion aus: URLs gehen in den Browser, vCards landen auf Wunsch in den Kontakten, bei WLAN-Daten fragt er nach dem Verbinden, Standorte öffnen sich in der Karten-App. Außerdem führt er lokal eine Historie aller Scans. Das ist praktisch, wenn du auf einer Konferenz 30 Speisekarten gescannt hast und eine davon wiederfinden willst.

Das komplette QR-Paket - Generator und Scanner - steckt in [NFC.cool Tools für iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-tap-scan-thrive-de&mt=8) und [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-tap-scan-thrive-de).
