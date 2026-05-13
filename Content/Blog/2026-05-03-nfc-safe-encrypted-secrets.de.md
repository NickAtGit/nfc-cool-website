---
id: "nfc-safe-2026-05"
title: "NFC Safe: Verschlüsselte Geheimnisse auf langlebigen NFC-Tags speichern"
date: "2026-05-03"
category: "nfc"
tags: ["nfc", "security", "encryption", "privacy"]
summary: "256-Bit AES auf epoxidbeschichteten NFC-Tags. Papier verbrennt. Cloud-Backups gehen down. NFC-Tags nicht."
image: "/assets/images/Blog/nfc-safe-encrypted-secrets.webp"
imageAlt: "Smartphone, NFC-Karte, Schild und Schloss stehen für verschlüsselte NFC-Geheimnisse"
author: "Nicolo Stanciu"
---

Deine Seed Phrase liegt auf einem Stück Papier. Vielleicht in einem Safe. Vielleicht unter einer Diele. Vielleicht auf drei Orte verteilt, weil jemand auf Reddit meinte, das machen "ernsthafte" Crypto-Leute so. Aber es ist immer noch Papier. Papier verbrennt. Papier saugt sich voll. Papier geht verloren.

Was wäre, wenn dein Backup nicht verrotten könnte, nicht altert und für jeden, der es findet, einfach nach nichts aussieht?

Genau das macht **NFC Safe**. Es verschlüsselt beliebigen Text — Seed Phrases, Passwörter, Recovery Codes, alles, was geheim bleiben muss — auf einem NFC-Tag mit 256-Bit-AES-Verschlüsselung. Der Tag ist in sich abgeschlossen. Keine Cloud. Kein Server. Kein Account. Um das Geheimnis zu lesen, brauchst du den physischen Tag *und* die Passphrase. Ohne beides ist der Tag nur ein winziges Stück Plastik mit Buchstabensalat darauf.

Das Verschlüsselungsformat ist [vollständig dokumentiert und offen](https://github.com/NickAtGit/nfc.cool-nfc-safe-format), inklusive Referenz-Decoder in Python. Deine Geheimnisse hängen nicht vom Weiterbestehen der App ab — selbst wenn NFC.cool eines Tages verschwindet, kannst du deine Daten mit einem Standard-NFC-Reader und der Spezifikation wiederherstellen.

### Das Problem mit dem Speichern von Geheimnissen

Jede Methode hat eine Schwäche: Papier brennt, USB-Stecker korrodieren, Cloud-Dienste werden gehackt, Hardware-Wallets verwalten nur Crypto-Seeds, und dein Gehirn vergisst.

Das ideale Backup wäre: physisch robust, verschlüsselt, in sich abgeschlossen, redundant und langlebig. NFC-Tags erfüllen alle fünf Kriterien. Keine Batterie, keine beweglichen Teile, und der NTAG216-Chip ist für mindestens 10 Jahre Datenerhalt spezifiziert. Epoxid-beschichtete Varianten überstehen Wasser, Stöße und jahrzehntelange Vernachlässigung.

### Wie du NFC Safe verwendest

NFC Safe steckt in NFC.cool Tools unter NFC Apps. Verschlüsseln oder Entschlüsseln über einen Segmented Control oben.

**Verschlüsseln:**
1. Öffne Tools → NFC Apps → NFC Safe
2. Wähle **Verschlüsseln**
3. Tippe oder füge dein Geheimnis ein
4. Setze eine starke Passphrase
5. Tippe auf Verschlüsseln; halte einen NFC-Tag an dein Telefon

**Entschlüsseln:**
1. Gleicher Screen, auf **Entschlüsseln** umschalten
2. Passphrase eingeben
3. Einen vorher verschlüsselten Tag antippen — dein Geheimnis erscheint

Unter der Haube: AES-256-GCM mit PBKDF2 (HMAC-SHA-256, 100.000 Iterationen, 16-Byte Random-Salt). Auf dem Tag als eigener NDEF-Record (`urn:nfc:ext:crypto`) abgelegt. [Format-Spec auf GitHub](https://github.com/NickAtGit/nfc.cool-nfc-safe-format).

### Die Redundanz-Strategie

Ein NTAG216-Tag kostet ungefähr so viel wie ein Kaffee. Kauf eine Handvoll, verschlüssele dasselbe Geheimnis auf jeden, verteile sie: Schreibtischschublade, Büro, Wohnung eines Familienmitglieds, Schließfach, irgendwo versteckt. Jeder einzelne Tag ist ohne Passphrase wertlos. Zwei-Faktor durch Design: physischer Tag + Passphrase, getrennt aufbewahrt.

### Warum NFC statt USB oder SD-Karte

- **Kein Stecker** — nichts kann korrodieren oder verbiegen
- **Keine Batterie** — passiv, vom Reader mit Strom versorgt
- **Kein Dateisystem** — nichts, was kaputt gehen könnte
- **Kein Treiber** — jedes Smartphone liest NFC nativ
- **Klein und günstig** — münzgroß, unter einem Dollar in Mengen
- **Robust** — Epoxid-Varianten halten Wasser, Stöße und UV stand

Die Kapazität ist die einzige Begrenzung: ~500–700 Byte nach dem Verschlüsselungs-Overhead. Reicht locker für eine 24-Wort-Seed-Phrase, ein Master-Passwort oder Recovery Codes.

### Sicherheitshinweise

- **Deine Passphrase ist alles.** 256-Bit AES ist unknackbar. Eine schwache Passphrase nicht. Nimm einen zufällig generierten String von mindestens 20 Zeichen.
- **NFC-Reichweite ist gering** (~4 cm). Niemand scannt aus dem Raum.
- **Kein Remote Wipe.** Tag verloren? Physisch zerstören (eine Schere reicht).
- **Kein Passphrase-Recovery.** Wenn du sie vergisst, sind die Daten weg — bewusst so designt. Schreib sie an einem anderen Ort als die Tags auf.

### Das größere Bild

NFC-Tags entwickeln sich zum Speichermedium für Dinge, die zählen. Der EU Digital Product Passport wird NFC für Produktauthentizität verlangen. Philips baut sie in Zahnbürstenköpfe. Hotels nutzen sie für Zimmerkarten. Günstig, robust, universell lesbar — vom Gerät in deiner Tasche.

NFC Safe nimmt diese Robustheit und legt Verschlüsselung obendrauf. Ein Backup, das Papier überdauert, von niemandem gelesen werden kann, der es findet, und weniger kostet als eine Tasse Kaffee.

Jetzt verfügbar in [NFC.cool Tools für iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web_de&mt=8). Android folgt bald.
