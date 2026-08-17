---
id: "nfc-reading-ipad-mac-2026-06"
title: "So liest NFC.cool NFC-Tags auf iPad und Mac"
date: "2026-06-18"
tags: ["announcements", "nfc-tags"]
summary: "iPad und Mac haben keinen NFC-Chip, deshalb habe ich immer gesagt, dort lassen sich keine NFC-Tags lesen. Seit Version 6.15.0 geht es doch, mit einem externen USB-Reader - hier erkläre ich, wie das funktioniert und wie es dazu kam."
image: "/assets/images/Blog/nfc-ipad-mac-external-reader.webp"
imageAlt: "Ein iPad neben einem HID OMNIKEY USB-NFC-Reader, auf dem ein Tag liegt"
author: "Nicolo Stanciu"
metaTitle: "So liest NFC.cool NFC-Tags auf iPad und Mac"
metaDescription: "iPad und Mac haben keinen NFC-Chip, NFC-Tags lesen ging dort bisher nicht. Mit NFC.cool 6.15.0 klappt es über einen externen USB-Reader trotzdem. So geht das."
ogTitle: "NFC-Tags lesen jetzt auch auf iPad und Mac"
ogDescription: "Kein NFC-Chip im iPad oder Mac? Mit einem externen USB-Reader liest und beschreibt NFC.cool 6.15.0 Tags trotzdem - und ich sage dir auch, was noch nicht geht."
---
Letztes Jahr war ich in Bologna auf der [PragmaConf 2025](https://pragmaconference.com). Es war mein erstes Mal auf dieser Konferenz, und wie sich herausgestellt hat, auch mein letztes: Die Organisatoren können sie nicht weiterführen, ich war also gleich bei der letzten Ausgabe dabei. Ein bisschen traurig macht mich das immer noch.

Dort kam ich mit [Alexander Manzer](https://www.linkedin.com/in/alexander-manzer) ins Gespräch, der wie ich iOS- und NFC-Entwickler ist. Irgendwann landeten wir bei einem Problem, das ich schon lange unter „unmöglich“ abgehakt hatte: NFC-Tags auf einem iPad lesen. Ein iPad hat keinen NFC-Chip, also habe ich allen immer gesagt, das geht schlicht nicht. Alexander meinte: Doch, geht - mit dem richtigen externen Reader. Und er bot an, mir ein Stück Code zum Einstieg zu schicken. Ein paar Tage später kam es tatsächlich. Dieser Schnipsel ist der Grund, warum NFC.cool heute NFC-Tags auf iPad und Mac lesen kann.

---

## Ich hatte gesagt, das geht nicht

Im Mai, [als NFC.cool auf den Mac kam](/blog/nfc-cool-comes-to-mac/), habe ich einen ganzen Abschnitt darüber geschrieben, was der Mac nicht kann, und NFC-Scannen stand ganz oben auf der Liste. Meine Begründung war simpel: Im Mac steckt kein NFC-Funkmodul, im iPad auch nicht, und an so einer Hardware-Grenze ändert kein Software-Update von mir etwas.

Das stimmt auch weiterhin, zumindest für den Chip, der im Gerät verbaut ist. Was ich übersehen hatte: Auf den eingebauten Chip bist du gar nicht angewiesen. Du kannst einfach einen anstecken.

---

## So funktioniert das Lesen ohne NFC-Chip

Der Trick ist ein externer USB-NFC-Reader. Du steckst ihn an dein iPad oder deinen Mac, und NFC.cool redet direkt mit ihm. Treiber musst du keine installieren: Das Ganze läuft über die Smartcard-Unterstützung, die Apple ohnehin in iPadOS und macOS eingebaut hat. Sobald der Reader im USB-C-Anschluss steckt, merkt die App das und schaltet von selbst um.

Ist ein externer Reader angesteckt, hat er Vorrang. Auf iPad und Mac ist er ohnehin die einzige NFC-Hardware, da gibt es nichts zu entscheiden. Auf dem iPhone nimmt dir die App die Entscheidung ab: Steckst du einen Reader an, benutzt NFC.cool ihn. Ziehst du ihn ab, greift das iPhone wieder auf sein eingebautes NFC zurück. Du musst keine Einstellung umlegen und keinen Modus wählen. Die App schaut, welche Hardware da ist, und richtet sich danach.

Entwickelt habe ich das Ganze mit dem HID OMNIKEY 5022 CL, und er ist auch der einzige Reader, den ich wirklich getestet habe. Andere USB-Reader funktionieren vielleicht, versprechen kann ich es aber nicht, weil ich nur mit diesem einen alles von vorne bis hinten durchprobiert habe. Falls du einen anderen Reader ausprobierst, würde mich ehrlich interessieren, wie es läuft: [Schreib mir](/contact/), ob es geklappt hat oder wo es gehakt hat. Was ich daraus lerne, fließt in die App und in diesen Beitrag zurück.

---

## Was du damit machen kannst

Fast alles, was du auch auf dem iPhone machen würdest. Tags lesen und den kompletten Speicher auslesen, NDEF-Nachrichten schreiben, Batch-Jobs, die einen ganzen Stapel Tags nacheinander lesen oder beschreiben. Tags mit Passwort schützen geht. [OpenPrintTag](/blog/openprinttag-read-write-nfc-spools-phone/), das Format für Filamentspulen im 3D-Druck, geht in beide Richtungen. Und ja, auch der [Reset von Philips-Sonicare-Bürstenköpfen](/blog/reset-sonicare-brush-head-nfc/) läuft.

Der Sonicare-Reset war der schwierigste Brocken. Beim Zurücksetzen eines Bürstenkopfs liest man einen Zähler vom Tag und schreibt anschließend auf eine passwortgeschützte Seite zurück. Diesen Schreibvorgang lässt das Tag aber nur zu, wenn du für das Tag vom Moment davor noch als authentifiziert giltst. Mit einem externen Reader heißt das: Die Verbindung zum Reader muss über beide Schritte hinweg als eine einzige Sitzung offen bleiben, statt zwischendurch geschlossen zu werden. Als das stand, verhielten sich auf einmal alle Operationen, die darauf aufbauen, genau wie auf dem iPhone: geschützte Schreibvorgänge und eben der Bürstenkopf-Reset.

---

## Was noch nicht geht

Ein paar Sachen fehlen noch, und ich sage dir das lieber vorher, als dass du es selbst herausfindest.

- Der OMNIKEY 5022 CL ist der einzige Reader, den ich getestet habe. Mit jedem anderen bist du auf ungetestetem Terrain unterwegs.
- MIFARE-Classic-Tags sind über den Reader nur lesbar. Auslesen klappt, Beschreiben nicht.

Für die meisten Anwendungsfälle spielt beides keine Rolle, aber es sind echte Einschränkungen, und ich selbst wüsste so etwas gern, bevor ich einen Reader kaufe.

---

## Danke, Alexander

Eins will ich klarstellen: Ich habe mir das nicht selbst ausgedacht. Alexander hat mir den Faden in die Hand gedrückt, ich habe daran gezogen. Er hätte den Code nicht teilen müssen, und ich bin dankbar, dass er es getan hat. Ein Grund, warum ich danach so hartnäckig drangeblieben bin, ist ganz einfach: Ich wollte, dass NFC.cool die erste iPad-App ist, die tatsächlich ein NFC-Tag lesen kann. Ob sie am Ende wirklich die allererste ist oder nicht, der Weg dorthin war die Arbeit wert.

Ab NFC.cool 6.15.0 kannst du NFC-Tags auch auf iPad und Mac lesen. Wenn du ein iPad oder einen Mac hast, einen unterstützten Reader und ein Tag, das du bisher nie vom Schreibtisch aus scannen konntest: Es funktioniert einfach.

Du brauchst noch den Reader? Den HID OMNIKEY 5022 CL gibt es bei [Amazon US](https://amzn.to/4rq6gCj) und [Amazon Europa](https://amzn.to/483UyEp). Das sind Affiliate-Links: Kaufst du darüber, bekomme ich unter Umständen eine kleine Provision, für dich ändert sich am Preis nichts, und es hilft mir, die Arbeit an NFC.cool zu finanzieren.

[NFC.cool Tools für iPhone, iPad und Mac laden](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-reading-ipad-mac-de&mt=8)

Und falls du auch auf dieser letzten PragmaConf in Bologna warst: Danke für die schöne Zeit. Ich wünschte, es gäbe eine nächste.
