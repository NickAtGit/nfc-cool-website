---
id: "nxp-icode-3-2026-10"
title: "ICODE 3, SLIX, ICODE DNA und NTAG 5 funktionieren jetzt in NFC.cool auf dem iPhone"
date: "2026-10-04"
tags: ["announcements", "nfc-tags", "iphone"]
summary: "NFC.cool Tools 7.1.0 spricht NXP ICODE: Die App liest, prüft und verwaltet ICODE 3, die SLIX-Familie, ICODE DNA und NTAG 5 auf dem iPhone, mit einem externen Reader auch auf iPad und Mac. Hier erkläre ich, was diese Chips aus Bibliothek und Ladengeschäft können und welche Eigenheit von iOS mich fast glauben ließ, mein eigener Code sei kaputt."
image: "/assets/images/Blog/nxp-icode-3-slix-ntag-5.webp"
imageAlt: "Ein Bibliotheksbuch mit einem RFID-Etikett innen im Einband neben einem iPhone, das die Details eines NFC-Tags anzeigt"
author: "Nicolo Stanciu"
metaTitle: "NXP ICODE 3 und SLIX auf dem iPhone lesen und verwalten"
metaDescription: "NFC.cool liest und verwaltet jetzt NXP ICODE 3, SLIX, SLIX2, ICODE DNA und NTAG 5 auf dem iPhone: Passwörter, Lesezähler, Diebstahlschutz, Privatsphäremodus und mehr."
ogTitle: "ICODE 3, SLIX und NTAG 5 jetzt auf dem iPhone"
ogDescription: "Was die NXP-Chips aus Bibliothek und Ladengeschäft können und wie NFC.cool sie auf iPhone, iPad und Mac liest und verwaltet."
---

Auf meinem Schreibtisch lag ein ICODE-3-Tag, mein iPhone obendrauf, und die App las bereitwillig alles aus, was der Chip hergab: seine ID, seinen Speicher, seinen Lesezähler und die Signatur von NXP, die belegt, dass er echt ist. Dann wollte ich eine einzige Sache ändern, nämlich den Zähler, und die App meldete, der Tag sei nicht mehr in Reichweite.

Er hatte sich keinen Millimeter bewegt. Ich habe es noch mal versucht. Dieselbe Meldung. Dann wollte ich stattdessen ein Passwort setzen. Dieselbe Meldung.

Was dahintersteckte, erzähle ich weiter unten, denn es ist der spannendste Bug, dem ich dieses Jahr hinterhergejagt bin. Aber erst einmal dazu, warum ich überhaupt an einem ICODE-Tag herumgebastelt habe.

Ich möchte, dass NFC.cool die leistungsfähigste NFC-App ist, die es fürs Handy gibt. Diesen Sommer hieß das [NTAG 424 DNA](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/), die Tags, mit denen Marken beweisen, dass ein Produkt echt ist. Danach war ICODE von NXP die größte Chipfamilie, mit der die App noch nicht richtig umgehen konnte. Mit **NFC.cool Tools 7.1.0** kann sie es.

---

## ICODE: Tags, die du schon in der Hand hattest, ohne es zu merken

Wenn du in den letzten zwanzig Jahren ein Buch aus der Bibliothek ausgeliehen hast, hattest du sehr wahrscheinlich schon einmal einen ICODE-Tag in der Hand. Das ist das flache Etikett mit der spiralförmigen Antenne, das innen im Einband klebt. Dieselben Chips stecken in Diebstahlsicherungen im Laden, in Wäschemarken und in Produktetiketten.

Technisch sind das **ISO-15693**-Chips, bei NFC heißen sie **Typ 5**. Die NFC-Sticker, die die meisten kaufen, etwa der NTAG215, folgen einem anderen Standard. Ich stelle mir das wie zwei Radiosender im selben Frequenzband vor: Dein iPhone kann beide empfangen, aber gesendet wird in zwei verschiedenen Sprachen.

Bibliotheken und Läden setzen wegen der Reichweite auf ICODE. Eine große Antenne in der Sicherungsschleuse einer Bibliothek oder an einem Selbstverbuchungsterminal liest diese Chips aus größerer Entfernung als einen typischen NFC-Sticker. Mit dem Handy musst du trotzdem nah ran, weil die Antenne deines iPhones winzig ist, aber gebaut wurde der Chip für solche Schleusen.

Den Link oder Text auszulesen, der auf einem ICODE-Tag gespeichert ist, war nie das Problem. Das Spannende liegt eine Ebene tiefer: Passwörter, ein Zähler, das Diebstahlschutz-Flag, ein Privatsphäremodus. Dieser Teil des Chips war in NFC.cool bisher eine Blackbox.

---

## Was NFC.cool mit einem ICODE 3 anstellt

**ICODE 3** ist der neueste Chip der Familie und der Nachfolger des ICODE SLIX2. Online wird er oft als „SLIX 3“ verkauft. Einen Chip mit diesem Namen gibt es bei NXP aber nicht: Steht in einem Angebot SLIX 3, ist es ein ICODE 3.

Scannst du einen mit NFC.cool, bekommst du das komplette Bild: um welchen Chip es sich handelt, seinen Speicher, seinen Zähler und ob er als **Echtes NXP** bestätigt wird. NXP signiert die ID jedes Chips schon im Werk, und die App prüft diese Signatur. Eine Kopie, die die ID übernimmt, kann sie deshalb nicht fälschen.

Von dort aus kannst du fast alles ändern, was der Chip zu bieten hat:

- **Lesezähler.** ICODE 3 kann selbst jeden einzelnen Lesevorgang mitzählen. Schaltest du die NFC-Spiegelung ein, schreibt der Chip seine ID und den aktuellen Zählerstand in den gespeicherten Link. So öffnet jeder Scan eine leicht andere URL, die eine Website mitzählen kann. Wer schon über den [NFC-Tap-Zähler](/blog/count-nfc-tag-scans/) gelesen hat: Das ist dieselbe Idee auf einem anderen Chip.
- **Passwörter.** ICODE 3 hat gleich sechs davon, je eines fürs Lesen, fürs Schreiben, für die Privatsphäre, fürs Zerstören, für die Diebstahlschutz-Einstellungen und für die Konfiguration. Ab Werk haben alle Tags dieselben Passwörter, ein Schutz bringt also erst etwas, wenn du eigene setzt. NFC.cool speichert deine Passwörter für jeden Tag einzeln in deinem iCloud-Schlüsselbund.
- **Speicherschutz.** Du kannst den Speicher in zwei Bereiche aufteilen und jeden für sich schützen, zum Beispiel damit ein öffentlicher Link lesbar bleibt, während die Daten dahinter verborgen sind.
- **Diebstahlschutz und Bibliothekseinstellungen.** Das EAS-Flag sorgt dafür, dass die Schleuse im Laden oder in der Bibliothek piept. Mit dem AFI-Byte markieren Bibliotheken ein Buch als ausgeliehen. Beides lässt sich ändern und auch sperren.
- **Privatsphäremodus.** Der Tag hält seine ID und seine Daten verborgen, bis jemand das Privatsphäre-Passwort übermittelt.
- **Manipulationserkennung** bei der Variante SL2S3003TT. Sie hat einen Draht, den du über einen Flaschenverschluss oder das Siegel einer Schachtel führen kannst. Die App zeigt an, ob das Siegel jemals aufgebrochen wurde.
- **Eigene Signatur.** Eine Marke kann die Signatur von NXP durch ihre eigene ersetzen und diese sperren.
- **Zerstören.** Damit schaltest du den Chip für immer ab, zum Schutz der Privatsphäre, wenn ein Produkt ausgedient hat.

Mehrere dieser Einstellungen sind endgültig, und manche können einen Tag für das iPhone unerreichbar machen. Deshalb verlangt NFC.cool bei allem, was sich nicht rückgängig machen lässt, dass du zuerst die letzten vier Zeichen der Tag-ID eintippst. Außerdem weigert sich die App, einen anderen Tag zu ändern als den, mit dem du angefangen hast. Neues würde ich trotzdem immer zuerst an einem Ersatz-Tag ausprobieren.

Eine Kleinigkeit habe ich nebenbei auch noch behoben: Einen leeren ICODE-Tag kannst du jetzt direkt in der App als NFC-Tag formatieren, damit er bereit für einen Link oder Text ist.

---

## Der Rest der Familie

Die App erkennt, welchen Chip du gerade vor dir hast, und bietet nur an, was dieser Chip wirklich kann. Ein älterer SLIX zeigt dir weniger Optionen als ein ICODE 3, schlicht weil er weniger Funktionen hat.

- **SLIX, SLIX-S, SLIX-L, SLIX2** und die älteren **SLI**-Chips sind die bewährten Alltagschips, die du in den meisten Bibliotheken findest. SLIX2 hat den Zähler und den Speicherschutz. SLIX-S schützt seinen Speicher Seite für Seite und unterstützt 64-Bit-Passwörter, bei denen jeder geschützte Zugriff sowohl das Lese- als auch das Schreibpasswort braucht.
- **ICODE DNA** ist der Sicherheitsspezialist der Familie. Er enthält geheime AES-Schlüssel, die den Chip nie verlassen. Gibst du den Schlüssel in NFC.cool ein, fordert die App den Chip auf zu beweisen, dass er ihn kennt. Eine Kopie fällt durch, selbst wenn ID und Speicher perfekt übereinstimmen.
- **NTAG 5** ist der Chip, auf den ich mich als Bastler am meisten freue. Gedacht ist dieser NFC-Chip für den Einbau auf einer Platine. Die Variante **switch** steuert Pins direkt an, **link** und **boost** sprechen per I2C mit einem Mikrocontroller. Diese Chips können eine kleine Schaltung allein aus dem NFC-Feld deines Handys mit Strom versorgen, über einen Pin Ereignisse melden und 256 Byte Speicher mit der Platine teilen. NFC.cool liest und ändert diese Einstellungen, und beim NTP5332 und NTA5332 kann die App sogar direkt von deinem iPhone aus mit Sensoren reden, die am Chip hängen.

Du findest das alles in den NFC-Tools unter **NXP ICODE und NTAG 5**, direkt neben NTAG 424 DNA. Oder du scannst einfach einen ICODE-Tag, und die App öffnet seine Details von selbst.

---

## Der Bug, den iOS mich nicht beheben lassen wollte

Zurück an meinen Schreibtisch und zu dem Tag, der angeblich nicht mehr in Reichweite war.

ISO 15693 lässt ein Handy auf zwei Arten mit einem Tag reden. Entweder schreibt es die ID des Tags auf jede einzelne Nachricht, wie eine Adresse auf einen Briefumschlag, damit nur dieser Tag antwortet. Oder es **selektiert** den Tag zuerst, so wie man sich in einem vollen Raum einer bestimmten Person zuwendet, und redet dann einfach los.

Der Weg mit dem Umschlag ist der sauberere, deshalb probiert NFC.cool ihn zuerst aus. Um zu prüfen, ob er funktioniert, schickte die App eine kurze Testnachricht mit ID. Der Tag antwortete, also schloss die App daraus, dass adressierte Nachrichten funktionieren, und machte weiter.

Was ich nicht wusste: iOS teilt diese Befehle in zwei Gruppen auf. Auf der einen Seite stehen die Standardbefehle, die jeder ISO-15693-Chip versteht, auf der anderen die eigenen Befehle von NXP, also die für Passwörter, den Zähler und die Konfiguration. Enthält eine adressierte Nachricht einen dieser NXP-Befehle, weigert sich iOS, sie zu senden. Sie verlässt das Handy gar nicht erst. Stattdessen kommt kommentarlos der Fehler „invalid parameter“ zurück, und für meinen Code sah dieser Fehler genauso aus wie ein Tag, der aus dem Feld gerutscht ist.

Meine Testnachricht war ein Standardbefehl. Die ging glatt durch und gaukelte mir vor, alles sei in Ordnung. Jede echte Änderung lief dagegen über einen NXP-Befehl, und deshalb schlug jede echte Änderung fehl.

Als ich das einmal verstanden hatte, war die Lösung so klein, dass es mir fast peinlich war. Der Test nutzt jetzt einen der NXP-eigenen Befehle, einen harmlosen, der den Chip nur nach einer Zufallszahl fragt. Lehnt iOS ihn ab, selektiert die App den Tag stattdessen. Ich habe den ICODE 3 wieder unter mein iPhone gelegt, auf **Zähler setzen** getippt, und die Zahl auf dem Tag hat sich geändert. Selten hat mich ein Zählerstand so gefreut.

---

## Wo es funktioniert

Auf dem iPhone funktioniert das alles mit dem eingebauten NFC-Reader. Auf iPad und Mac, die keinen NFC-Chip haben, läuft es über einen [externen USB-NFC-Reader](/blog/nfc-reading-ipad-mac/). Der Reader muss ICODE-Befehle unverändert an den Tag durchreichen. Kann deiner das, liest und verwaltet die App ICODE-Tags genau wie auf dem iPhone, und den Bug aus dem letzten Abschnitt gibt es dort überhaupt nicht. Mit einem Reader, der die Befehle nicht durchreicht, kannst du immerhin noch den Speicher des Tags auslesen.

Die Android-App kann noch nicht mit ICODE umgehen.

Falls bei dir eine Schublade voller Bibliotheks-Tags liegt, mit denen du nie viel anfangen konntest, oder eine NTAG-5-Platine auf ihr Projekt wartet: Installier das Update auf 7.1.0 und halt dein iPhone dran. NFC.cool Tools gibt es im [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nxp-icode-3-slix-ntag-5-de&mt=8).
