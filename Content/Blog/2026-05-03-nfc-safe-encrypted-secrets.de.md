---
id: "nfc-safe-2026-05"
title: "NFC Safe: Verschlüsselte Geheimnisse auf langlebigen NFC-Tags speichern"
date: "2026-05-03"
tags: ["nfc-tags", "privacy"]
summary: "256-Bit AES auf epoxidbeschichteten NFC-Tags. Papier verbrennt. Cloud-Backups fallen aus. NFC-Tags nicht."
image: "/assets/images/Blog/nfc-safe-encrypted-secrets.webp"
imageAlt: "Smartphone, NFC-Karte, Schild und Schloss stehen für verschlüsselte NFC-Geheimnisse"
author: "Nicolo Stanciu"
---

Deine Seed Phrase liegt wahrscheinlich auf einem Stück Papier. Vielleicht in einem Safe. Vielleicht unter einer Diele. Vielleicht auf drei Orte verteilt, weil jemand auf Reddit meinte, das machen "ernsthafte" Crypto-Leute so. Aber es ist immer noch Papier. Papier verbrennt. Papier wird durchnässt. Papier geht verloren.

Ich baue seit Jahren an NFC.cool, einer App zum Lesen und Schreiben von NFC-Tags, und irgendwann habe ich mir eine Frage gestellt, die nichts mit Zahlungen oder Schlüsselkarten zu tun hat: Was wäre, wenn dein Backup nicht verrotten und nicht verfallen könnte und für jeden, der es findet, einfach nach nichts aussehen würde?

Wegen dieser Frage habe ich **NFC Safe** gebaut. Es verschlüsselt beliebigen Text - Seed Phrases, Passwörter, Recovery Codes, alles, was geheim bleiben muss - mit 256-Bit-AES-Verschlüsselung auf einen NFC-Tag. Der Tag ist in sich abgeschlossen. Keine Cloud. Kein Server. Kein Account. Um das Geheimnis zu lesen, brauchst du den physischen Tag *und* die Passphrase. Ohne beides ist der Tag nur ein winziges Stück Plastik mit Buchstabensalat darauf.

Eine Sache war mir beim Design besonders wichtig: Ich wollte nicht, dass deine Geheimnisse davon abhängen, dass es meine App noch gibt. Deshalb ist das Verschlüsselungsformat [vollständig dokumentiert und offen](https://github.com/NickAtGit/nfc.cool-nfc-safe-format), inklusive Referenz-Decoder in Python. Falls NFC.cool jemals verschwindet, kannst du deine Daten trotzdem mit einem Standard-NFC-Reader und der Spezifikation wiederherstellen. Das ist ein Versprechen, das ich halten kann, weil ich die Spezifikation so geschrieben habe, dass sie die Software überdauert.

---

## Das Problem mit dem Speichern von Geheimnissen

Wenn du mich nach der Schwachstelle jeder Methode zur Aufbewahrung von Geheimnissen fragst, die ich kenne, könnte ich sie ohne Nachdenken nennen: Papier brennt, USB-Stecker korrodieren, Cloud-Dienste werden gehackt, Hardware-Wallets verwalten nur Crypto-Seed-Phrases, und dein Gehirn vergisst. Jede Option versagt auf ihre eigene Weise.

Also bin ich rückwärts vorgegangen. Das ideale Backup wäre physisch robust, verschlüsselt, in sich abgeschlossen, redundant und langlebig. NFC-Tags erfüllen alle fünf Kriterien, und das hat mich anfangs auch überrascht. Sie haben keine Batterie, keine beweglichen Teile, und der NTAG216-Chip ist für mindestens 10 Jahre Datenerhalt spezifiziert. Epoxid-beschichtete Varianten überstehen Wasser, Stöße und jahrzehntelange Vernachlässigung. Falls dir die Unterschiede zwischen diesen Chips neu sind, habe ich die Abwägungen in [NFC-Tag-Typen für das iPhone](/de/blog/nfc-tag-types-for-iphones/) aufgeschlüsselt.

---

## Wie du NFC Safe verwendest

NFC Safe steckt in NFC.cool Tools unter NFC Apps. Ich habe das Ganze auf einen einzigen Screen reduziert, mit einem Segmented Control oben - Verschlüsseln oder Entschlüsseln. Wenn du schon einmal einen Tag beschrieben hast, wird dir nichts davon fremd vorkommen.

**Verschlüsseln:**
1. Öffne Tools → NFC Apps → NFC Safe
2. Wähle **Verschlüsseln**
3. Tippe oder füge dein Geheimnis ein
4. Setze eine starke Passphrase
5. Tippe auf Verschlüsseln; halte einen NFC-Tag an dein Telefon

**Entschlüsseln:**
1. Gleicher Screen, auf **Entschlüsseln** umschalten
2. Passphrase eingeben
3. Einen vorher verschlüsselten Tag antippen - dein Geheimnis erscheint

Was ich unter der Haube tatsächlich mache: AES-256-GCM mit PBKDF2 (HMAC-SHA-256, 100.000 Iterationen, 16-Byte Random-Salt). Das Ergebnis wird auf dem Tag als eigener NDEF-Record (`urn:nfc:ext:crypto`) abgelegt. Wenn du das lieber selbst überprüfen willst, statt mir zu glauben, liegt die vollständige [Format-Spezifikation auf GitHub](https://github.com/NickAtGit/nfc.cool-nfc-safe-format). Und falls du erst sehen willst, wie ein normaler, unverschlüsselter Tag-Write aussieht, gehe ich das in [NFC-Tags auf dem iPhone schreiben](/de/blog/write-nfc-tags-iphone/) durch.

---

## Die Redundanz-Strategie

So würde ich es selbst tatsächlich nutzen. Ein NTAG216-Tag kostet ungefähr so viel wie ein Kaffee, also gibt es keinen Grund, nur einen einzigen anzulegen. Kauf eine Handvoll, verschlüssele dasselbe Geheimnis auf jeden und verteile sie: Schreibtischschublade, Büro, Wohnung eines Familienmitglieds, Schließfach, irgendwo, wo nur du nachschauen würdest. Jeder einzelne Tag ist ohne Passphrase bedeutungslos. Das ist der Teil des Designs, der mir am besten gefällt - es ist von Natur aus Zwei-Faktor: ein physischer Tag plus eine Passphrase, an zwei getrennten Orten aufbewahrt, ganz ohne zusätzlichen Aufwand für dich.

---

## Warum NFC statt USB oder SD-Karte

Leute fragen mich, warum ich nicht einfach alle auf einen USB-Stick oder eine SD-Karte verwiesen habe. Die ehrliche Antwort ist, dass ich zu viele davon auf langweilige, vermeidbare Weise versagen gesehen habe. NFC umgeht all das:

- **Kein Stecker** - nichts kann korrodieren oder verbiegen
- **Keine Batterie** - passiv, vom Reader mit Strom versorgt
- **Kein Dateisystem** - nichts, was kaputt gehen könnte
- **Kein Treiber** - jedes Smartphone liest NFC nativ
- **Klein und günstig** - münzgroß, unter einem Dollar in Mengen
- **Robust** - Epoxid-Varianten halten Wasser, Stöße und UV stand

Die einzige echte Begrenzung ist die Kapazität: rund 500-700 Byte nach dem Verschlüsselungs-Overhead. Das ist nicht viel, aber es reicht locker für das, wofür das hier wirklich gedacht ist - eine 24-Wort-Seed-Phrase, ein Master-Passwort oder ein Satz Recovery Codes.

---

## Sicherheitshinweise

Ich weise dich lieber von vornherein auf die scharfen Kanten hin, statt dass du sie später entdeckst:

- **Deine Passphrase ist alles.** 256-Bit AES ist unknackbar. Eine schwache Passphrase nicht. Nimm einen zufällig generierten String von mindestens 20 Zeichen und mach hier keine Kompromisse.
- **NFC-Reichweite ist gering** (~4 cm). Niemand scannt quer durch den Raum - diese winzige Reichweite ist ein Feature, kein Fehler.
- **Kein Remote Wipe.** Tag verloren? Physisch zerstören. Eine Schere reicht, und außerdem sind die Daten ohne die Passphrase ohnehin nutzlos.
- **Kein Passphrase-Recovery.** Wenn du sie vergisst, sind die Daten weg. Diese Entscheidung habe ich bewusst getroffen - ein Wiederherstellungsweg ist immer auch ein Angriffsweg. Schreib die Passphrase an einem anderen Ort als die Tags auf.

---

## Das große Ganze

Weil ich täglich mit NFC arbeite, habe ich beobachtet, wie diese Tags still und leise zum Speichermedium für Dinge werden, die zählen. Der EU Digital Product Passport wird NFC für Produktauthentizität verlangen. Philips baut sie in Zahnbürstenköpfe. Hotels nutzen sie für Zimmerkarten. Günstig, robust und universell lesbar von dem Gerät, das du sowieso schon in der Tasche hast - diese Kombination ist selten, und genau deshalb finde ich immer wieder neue Anwendungen für sie. Wenn du den breiteren Überblick willst, habe ich die Grundlagen in [NFC-Tags erklärt: ein kompletter Einsteiger-Guide](/de/blog/nfc-tags-beginners-guide/) behandelt.

NFC Safe ist mein Versuch, diese Robustheit zu nehmen und das eine hinzuzufügen, was ihr gefehlt hat - Verschlüsselung. Ein Backup, das Papier überdauert, von niemandem gelesen werden kann, der es findet, und weniger kostet als eine Tasse Kaffee. Das ist die Art von Sache, die ich für mich selbst wollte, also habe ich sie gebaut.

Jetzt verfügbar in [NFC.cool Tools für iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-safe-encrypted-secrets-de&mt=8) und [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-safe-encrypted-secrets-de).
