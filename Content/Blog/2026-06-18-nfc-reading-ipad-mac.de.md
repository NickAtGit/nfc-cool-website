---
id: "nfc-reading-ipad-mac-2026-06"
title: "Wie NFC.cool NFC-Tags auf iPad und Mac liest"
date: "2026-06-18"
tags: ["announcements", "nfc-tags"]
summary: "iPads und Macs haben keinen NFC-Chip, deshalb habe ich immer gesagt, sie könnten keine NFC-Tags lesen. Mit einem externen USB-Reader ändert Version 6.15.0 das - hier erfährst du, wie es funktioniert und woher es kam."
image: "/assets/images/Blog/nfc-ipad-mac-external-reader.webp"
imageAlt: "Ein iPad neben einem HID OMNIKEY USB-NFC-Reader mit einem darauf liegenden Tag"
author: "Nicolo Stanciu"
metaTitle: "Wie NFC.cool NFC-Tags auf iPad und Mac liest"
metaDescription: "iPads und Macs haben keine NFC-Funkhardware, deshalb konnten sie keine NFC-Tags lesen. In NFC.cool 6.15.0 ändert ein externer USB-Reader das auf iPad und Mac. So funktioniert es."
ogTitle: "NFC-Tags lesen kommt auf iPad und Mac"
ogDescription: "Kein NFC-Chip in deinem iPad oder Mac? Mit einem externen USB-Reader liest und schreibt NFC.cool 6.15.0 auch dort Tags - plus die ehrlichen Grenzen."
---
Letztes Jahr war ich in Bologna auf der [PragmaConf 2025](https://pragmaconference.com). Es war mein erstes Mal auf dieser Konferenz und, wie sich herausstellte, auch mein letztes - die Organisatoren können sie nicht weiterführen, also war die Ausgabe, auf der ich war, die letzte. Das macht mich immer noch ein bisschen traurig.

Während ich dort war, kam ich mit [Alexander Manzer](https://www.linkedin.com/in/alexander-manzer) ins Gespräch, einem anderen iOS- und NFC-Entwickler. Irgendwann driftete das Gespräch zu einem Problem, das ich längst unter "unmöglich" abgelegt hatte: NFC-Tags auf einem iPad zu lesen. iPads haben keinen NFC-Chip, deshalb hatte ich immer gesagt, es ginge schlicht nicht. Alexander sagte mir, es ginge doch - mit dem richtigen externen Reader - und bot an, mir ein kleines Stück Code zum Einstieg zu schicken. Ein paar Tage später tat er das. Dieser Schnipsel ist der Grund, warum NFC.cool jetzt NFC-Tags auf iPad und Mac lesen kann.

---

## Ich habe euch gesagt, dass das nicht geht

Im Mai, [als NFC.cool auf den Mac kam](/blog/nfc-cool-comes-to-mac/), habe ich einen ganzen Abschnitt darüber geschrieben, was der Mac nicht kann, und das NFC-Scannen ganz oben draufgesetzt. Meine Begründung war einfach: Macs haben keine NFC-Funkhardware, iPads haben keine NFC-Funkhardware, und das ist eine Hardware-Grenze, die kein Software-Update von mir beheben kann.

Dieser Teil stimmt immer noch - für den im Gerät eingebauten Chip. Was ich übersehen hatte, ist, dass du den eingebauten Chip gar nicht benutzen musst. Du kannst einen anstecken.

---

## Wie es ohne NFC-Chip funktioniert

Der Trick ist ein externer USB-NFC-Reader. Du verbindest ihn mit deinem iPad oder Mac, und NFC.cool spricht direkt mit ihm. Es gibt keine Treiber zu installieren: Es funktioniert über die Smartcard-Unterstützung, die Apple ohnehin schon in iPadOS und macOS mitliefert. In dem Moment, in dem du den Reader in den USB-C-Anschluss steckst, bemerkt die App ihn und schaltet von selbst um.

Die App bevorzugt einen externen Reader, sobald einer angesteckt ist. Auf einem iPad oder Mac ist dieser Reader die einzige NFC-Hardware im Spiel, also gibt es nichts zu entscheiden. Auf einem iPhone wird daraus eine Wahl, die die App für dich trifft: Steck einen Reader an, und NFC.cool benutzt ihn; lass ihn weg, und das Telefon fällt auf sein eigenes eingebautes NFC zurück. Du legst keine Einstellung um, und du wählst keinen Modus - die App findet heraus, welche Hardware sie hat, und handelt entsprechend.

Der Reader, um den herum ich das gebaut habe und der einzige, den ich tatsächlich getestet habe, ist der HID OMNIKEY 5022 CL. Andere USB-Reader funktionieren vielleicht, aber ich kann es nicht versprechen, weil ich das Erlebnis nur mit diesem einen von Anfang bis Ende verifiziert habe. Wenn du einen anderen Reader ausprobierst, will ich wirklich wissen, wie es läuft: [Sag mir](/contact/), ob es funktioniert hat oder wo es hakte, und ich lasse das, was ich lerne, zurück in die App und diesen Beitrag fließen.

---

## Was du damit machen kannst

Fast alles, was du auf einem iPhone tun würdest. Du kannst Tags lesen und ihren gesamten Speicher auslesen, NDEF-Nachrichten schreiben und Batch-Jobs ausführen, die einen ganzen Stapel Tags nacheinander lesen oder beschreiben. Tags mit Passwort zu schützen funktioniert. Genauso [OpenPrintTag](/blog/openprinttag-read-write-nfc-spools-phone/), das Format für 3D-Drucker-Filamentspulen, in beide Richtungen. Und ja, der [Reset von Philips-Sonicare-Bürstenköpfen](/blog/reset-sonicare-brush-head-nfc/) läuft auch.

Das Letzte war der schwierige Teil. Einen Sonicare-Kopf zurückzusetzen bedeutet, einen Zähler vom Tag zu lesen und dann auf eine passwortgeschützte Seite zurückzuschreiben, und das Tag akzeptiert diesen Schreibvorgang nur, wenn es dich noch von einem Moment zuvor als authentifiziert betrachtet. Über einen externen Reader hieß das, eine einzige Sitzung mit dem Reader über beide Schritte hinweg offen zu halten, statt sie dazwischen schließen zu lassen. Sobald das hielt, fingen die Operationen, die davon abhängen - geschützte Schreibvorgänge, der Bürstenkopf-Reset -, an, sich so zu verhalten, wie sie es auf einem Telefon tun.

---

## Die ehrlichen Grenzen

Ein paar Dinge sind noch nicht da, und ich sage es dir lieber, als dich es selbst herausfinden zu lassen.

- Der OMNIKEY 5022 CL ist der einzige Reader, den ich getestet habe. Ein anderer setzt dich in unverifiziertes Terrain.
- MIFARE-Classic-Tags sind über den Reader nur lesbar. Du kannst sie lesen, aber nicht beschreiben.

Nichts davon bricht die Art, wie die meisten Leute das nutzen werden, aber sie sind real, und sie sind die Art von Dingen, die ich vor dem Kauf eines Readers wissen wollen würde.

---

## Danke, Alexander

Ich will klarstellen, woher das kam. Ich habe mich nicht hingesetzt und es erfunden - Alexander hat mir den Faden gereicht, und ich habe daran gezogen. Er hätte den Code nicht teilen müssen, und ich bin dankbar, dass er es getan hat. Ein Teil des Grundes, warum ich es danach so hartnäckig verfolgt habe, ist schlicht: Ich wollte, dass NFC.cool die erste iPad-App ist, die tatsächlich ein NFC-Tag lesen kann. Ob es sich nun als die allererste herausstellt oder nicht - dorthin zu kommen war die Arbeit wert.

Das Lesen von NFC-Tags auf iPad und Mac kommt mit NFC.cool 6.15.0. Wenn du ein iPad oder einen Mac hast, einen unterstützten Reader und ein Tag, das du von deinem Schreibtisch aus nie scannen konntest, dann funktioniert es einfach.

Brauchst du den Reader? Hier ist der HID OMNIKEY 5022 CL bei [Amazon US](https://amzn.to/4rq6gCj) und [Amazon Europa](https://amzn.to/483UyEp). Das sind Affiliate-Links: Wenn du über einen davon kaufst, erhalte ich womöglich eine kleine Provision ohne Mehrkosten für dich, und es hilft, die Arbeit an NFC.cool zu finanzieren.

[NFC.cool Tools für iPhone, iPad und Mac herunterladen](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-reading-ipad-mac-de&mt=8)

Und wenn du bei dieser letzten PragmaConf in Bologna warst: Danke für eine gute Zeit. Ich wünschte, es gäbe eine weitere.
