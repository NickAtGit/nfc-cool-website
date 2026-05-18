---
id: nfc-blog-024
title: "Dokumente scannen aus der Hosentasche mit NFC.cool Tools"
date: 2024-02-20
tags: ["guides", "iphone"]
summary: "Ein praktischer Guide zu NFC.cools Dokumenten-Scanner: Wie du scharfe Scans aufnimmst, warum der Post-Processing-Schritt wichtig ist und wie OCR den Scan in durchsuchbaren Text und PDFs verwandelt."
metaTitle: "Dokumenten-Scan mit NFC.cool Tools - Ein praktischer Guide"
metaDescription: "Wie du Dokumente mit NFC.cool Tools scannst - aufnehmen, nachbearbeiten, OCR laufen lassen und als durchsuchbare PDFs exportieren. Mit Tipps zu Licht und Kantenerkennung."
ogTitle: "Dokumente scannen aus der Hosentasche mit NFC.cool Tools"
ogDescription: "Dokumente scannen, OCR laufen lassen und durchsuchbare PDFs exportieren mit NFC.cool Tools."
image: "/assets/images/Blog/document-scanning-guide.webp"
---
Ein modernes iPhone hat genug Kamera und Rechenleistung, dass "ein Dokument scannen" kein Drucker-Feature mehr ist - es ist ein Tap. Der Dokumenten-Scanner in NFC.cool Tools basiert auf Apples Vision-Framework, was schnelle Aufnahme, automatische Kantenerkennung und OCR komplett on-device bedeutet.

So nutzt du ihn gut.

---

## Aufnahme: Ruhig halten, Licht ist wichtig

Öffne NFC.cool Tools, tippe auf das Dokument-Icon und rahme die Seite ein. Der Scanner zeichnet ein gelbes Viereck um das, was er für die Seitenkanten hält. Meistens stimmt's. Wenn nicht, zieh die Ecken zurecht.

Ein paar Tipps, die den Output wirklich verbessern:

- **Tageslicht schlägt Deckenlicht.** Bürobeleuchtung wirft Schatten vom Handy selbst auf die Seite. Tageslicht vom Fenster oder eine Schreibtischlampe schräg über die Seite ist besser.
- **Ebene Oberfläche.** Eine gewölbte Seite verzieht den Text und verwirrt OCR.
- **Reflexionen vermeiden.** Neige das Handy leicht, um das weiße Rechteck-Spiegelbild auf glänzendem Papier zu vermeiden.
- **Mehrseitige Dokumente.** Scanne einfach Seite für Seite - die App stapelt sie in einem Dokument.

---

## Nachbearbeitung: Ecken justieren, Farbe anpassen

Nach der Aufnahme bekommst du einen Nachbearbeitungs-Schritt. Die zwei Dinge, die sich lohnen:

- **Eckenanpassung.** Die Auto-Erkennung des Scanners ist gut, aber nicht perfekt. Wenn die Seite wenig Kontrast zur Unterlage hat, zieh die Ecken präzise.
- **Farbmodus.** Drei Optionen: Farbe (Fotos, farbige Dokumente), Graustufen (Text auf weißem Papier - schärfste Ergebnisse für OCR) und Schwarzweiß (Handschrift, Quittungen - so sauber wie möglich).

Für die meisten Papiere - Rechnungen, Quittungen, Verträge - liefert Graustufen die beste Balance aus Dateigröße und OCR-Genauigkeit.

---

## OCR: Scan-Bild → durchsuchbarer Text

Tippe **Erkannten Text anzeigen** unter dem gescannten Bild, um OCR laufen zu lassen. Der Text erscheint in einem Panel, aus dem du kopieren, suchen oder speichern kannst.

OCR-Qualität hängt von drei Dingen ab: Bildschärfe, Beleuchtung und Schrift. Gedruckter Text auf sauberem weißen Hintergrund wird zu nahezu 100% erkannt. Handschrift ist schwerer - Visions Handschrift-Erkenner ist okay bei sauberen Druckbuchstaben und tut sich schwer mit Schreibschrift. Wenn ein Scan schief war, ist die häufigste Lösung ein Neu-Scan mit besserem Licht, statt mit dem OCR-Ergebnis zu kämpfen.

---

## Export: durchsuchbares PDF

Der Trick, der Scans langfristig wirklich nützlich macht, ist der **durchsuchbare PDF**-Export. Es ist ein PDF, in dem jede Seite das gescannte Bild ist, mit dem OCR-Text unsichtbar darunter gelayert - das Dokument sieht aus wie ein Bild, aber Suchmaschinen (und macOS Spotlight, und Finder) finden Wörter darin.

In NFC.cool Tools tippe **Als PDF teilen** und der Export enthält automatisch den OCR-Layer. Wirf das PDF in dein Ablagesystem, suche drei Monate später nach "Rechnung 2024-02 Acme Corp", und das richtige Dokument taucht auf.

---

## Warum scannen statt fotografieren?

Du könntest auch einfach ein Foto vom Dokument machen. Gründe für den Scanner stattdessen:

- **Kanten-Crop.** Ein Scan ist auf die Seite zugeschnitten. Ein Foto enthält den Schreibtisch, die Kaffeetasse, die Katze.
- **Perspektivkorrektur.** Selbst flach gehalten ist ein Handy leicht schief. Scanner korrigieren das, sodass die Seite "wie gescannt" aussieht statt "schräg fotografiert".
- **Mehrseiten-Bündelung.** Fünf Fotos = fünf Dateien in der Galerie. Fünf Scans = ein PDF.
- **Durchsuchbarer Text.** OCR direkt im Export eingebacken.

Für Quittungen, Verträge, unterschriebene Formulare, Geschäftsdokumente - scannen, nicht fotografieren.

Dokumenten-Scan ist Teil von [NFC.cool Tools für iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-document-scanning-guide-de&mt=8) (die Android-Version konzentriert sich auf NFC; der Dokumenten-Scanner braucht Apples Vision-Framework).
