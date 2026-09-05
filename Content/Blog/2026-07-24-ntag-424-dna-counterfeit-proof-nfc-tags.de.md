---
id: "ntag-424-dna-2026-07"
title: "NTAG 424 DNA: Die NFC-Tags, die beweisen, dass sie echt sind"
date: "2026-07-24"
tags: ["announcements", "nfc-tags", "industry"]
summary: "Ich hatte gelesen, dass Luxusmarken mit NTAG 424 DNA Tags die Echtheit ihrer Produkte belegen, also habe ich mir bei AliExpress einen Schwung bestellt und nachgeschaut, was die Tags wirklich tun. Herausgekommen ist: im Kern der NFC-Tap-Zähler, nur mit einer Kryptoschicht obendrauf. NFC.cool Tools liest, prüft und konfiguriert sie jetzt komplett auf iPhone und Android - jeden Schlüssel, die Rechte jeder Datei und die Einstellungen des Chips selbst."
image: "/assets/images/Blog/ntag-424-dna-counterfeit-proof-nfc-tags.webp"
imageAlt: "Eine Lederhandtasche mit NFC-Echtheitsanhänger neben einem iPhone, auf dem ein Sicherheitsschild und Schlüsselsymbole zu sehen sind"
author: "Nicolo Stanciu"
metaTitle: "NTAG 424 DNA: Der fälschungssichere NFC-Tag erklärt"
metaDescription: "Ich habe NTAG 424 DNA Tags gekauft, um zu sehen, wie Marken Echtheit beweisen. So funktionieren die Tags, und so liest, prüft und programmiert NFC.cool sie."
ogTitle: "Die NFC-Tags, die beweisen, dass sie echt sind"
ogDescription: "Wie NTAG 424 DNA Tags Klone auffliegen lassen und wie NFC.cool sie auf iPhone und Android liest, prüft und konfiguriert."
---

Vor einer Weile ist mir immer wieder dieselbe Behauptung über den Weg gelaufen: Luxusmarken bauen NFC-Chips in ihre Produkte ein, damit du dein Handy an eine Tasche oder ein Paar Sneaker hältst und sofort weißt, ob du das Original vor dir hast oder eine Fälschung. In jedem Artikel stand derselbe schöne Satz, und in keinem stand, *wie* das gehen soll. Was hindert einen Fälscher denn daran, den Chip einfach mitzukopieren, zusammen mit der Handtasche?

Also habe ich gemacht, was ich immer mache, wenn mich ein Tag neugierig macht: bei AliExpress ein Angebot für „NTAG 424 DNA“ Tags gesucht, einen kleinen Schwung bestellt und auf den Umschlag gewartet. Ein paar Euro und ein paar Wochen später lag genau das Silizium auf meinem Schreibtisch, auf dem diese Markenschutzsysteme aufsetzen. Dann habe ich das Handy drangehalten und geschaut, was passiert.

---

## Was ein NTAG 424 DNA Tag eigentlich ist

Von außen ist das ein ganz gewöhnlicher NFC-Tag. In einem Haufen Billig-Tags würdest du ihn nicht wiederfinden, und jedes Handy liest ihn anstandslos. Wer meinen [Ratgeber zu den NFC-Tag-Typen](/blog/nfc-tag-types-for-iphones/) kennt: Es ist ein weiterer Typ-4-Tag, mit dem dein iPhone problemlos zurechtkommt.

Der Unterschied steckt im „DNA“. Im Chip liegen ein paar AES-128-Schlüssel und eine kleine Krypto-Engine, und damit kann er etwas, das weder ein einfacher NTAG215 noch ein Sticker aus dem Multipack kann: Er *signiert* jeden einzelnen Scan. Auf diese Signatur kommt alles an. Sie macht aus einem Tag, der nur „hier ist ein Link“ sagt, einen Tag, der sagt: „Hier ist ein Link, und hier ist der kryptografische Beweis, dass ich, genau dieser echte Chip, ihn gerade in diesem Moment ausgebe.“

Und genau dafür zahlen die Luxusmarken: nicht für den Link, sondern für den Beweis, dass ein echter Chip ihn ausgibt.

---

## Wie SUN und SDM funktionieren: ein Link, der sich bei jedem Scan neu schreibt

An dieser Stelle hat es bei mir Klick gemacht. Als ich mir angeschaut habe, was der Tag tatsächlich sendet, wurde mir klar: Das meiste, was man braucht, um das zu verstehen, hatte ich schon gebaut.

Anfang des Jahres habe ich den [NFC-Tap-Zähler](/blog/count-nfc-tag-scans/) veröffentlicht: Ein Tag zählt mit, wie oft er gelesen wurde, und schreibt die Zahl in die URL, sodass ein Link weiß, dass ihn gerade zum 47. Mal jemand gescannt hat. Ein NTAG 424 DNA Tag ist dieselbe Idee, nur mit einer Verschlüsselungsschicht drumherum, die das Ganze fälschungssicher macht.

Der Mechanismus heißt **SUN** (Secure Unique NFC), oder **SDM** (Secure Dynamic Messaging), wenn man das [Datenblatt von NXP](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf) aufschlägt. Du speicherst einen ganz normalen Link auf dem Tag, etwa `https://example.com`, und sagst dem Chip, er soll Teile davon bei jedem Scan neu schreiben. Bei deinem Handy kommt dann eher so etwas an:

`https://example.com/?picc_data=A1B2...&cmac=9F3C...`

Diese beiden Werte sind keine Deko. `picc_data` ist eine verschlüsselte Kopie der echten Tag-ID plus einem Zähler, der jeden Scan mitzählt, verschlüsselt mit einem Schlüssel, der den Chip nie verlässt. `cmac` ist eine kryptografische Signatur über genau diese Daten. Beide ändern sich mit jedem Scan. Scanne denselben Tag zweimal, und du bekommst zwei völlig verschiedene URLs, jede frisch vom Chip signiert.

Einen einfachen NFC-Tag stelle ich mir wie ein gedrucktes Schild im Schaufenster vor: Jeder kann es abfotografieren und eine identische Kopie drucken. Ein SUN-Tag ist eher wie ein Wachmann, der dir bei jedem Betreten eine neue Quittung in die Hand drückt, einzeln nummeriert und abgestempelt. Die Quittung von gestern zu kopieren bringt nichts: Die heutige Nummer ist eine andere, und echt ist nur der Stempel des Wachmanns.

---

## Warum ein geklonter NTAG 424 DNA Tag auffliegt

Damit ist meine Frage vom Anfang beantwortet. Den *Inhalt* eines Tags kann ein Fälscher sehr wohl klonen: URL auslesen, Byte für Byte kopieren, auf einen leeren Chip schreiben. Das ging schon immer.

Was er nicht kann: die nächste gültige Signatur erzeugen. Der Signaturschlüssel steckt im echten Chip und verlässt ihn nie, auch während eines Scans nicht. Ein Scan ist deshalb nur für den etwas wert, der den Schlüssel tatsächlich hat. In einem echten Markenschutzsystem zeigt der Link des Tags auf einen Server des Herstellers, und dieser Server entschlüsselt jeden Scan, rechnet die Signatur nach, um zu bestätigen, dass der Schlüssel passt, und behält den Zähler im Auge, der immer weiter hochzählt.

Und genau am Zähler fliegt der Klon auf. Die einzige URL, die ein Fälscher auf seine Kopie schreiben kann, hat er bei einem echten Scan abgegriffen, mitsamt dem Zählerstand, den dieser Scan gerade hatte. Schickt er sie erneut los, sieht der Server eine Zahl, die er schon kennt. Der Zähler eines echten Chips läuft aber nur vorwärts, ein Wiederholen oder ein Schritt zurück verrät die Kopie also sofort. Für einen neuen, höheren Zählerstand mit passender Signatur bräuchte er den Schlüssel, und um an den zu kommen, müsste er AES knacken oder den Chip physisch aufbrechen. Beides macht für eine gefälschte Handtasche niemand.

Das ist die ungeschönte Fassung des Marketingsatzes. Der Chip macht nicht das *Produkt* kopiersicher, sondern den *Echtheitsbeweis*, und er verlagert diesen Beweis auf etwas, das ein Fälscher nicht nachbauen kann.

---

## Was im Chip steckt

Alles, was NFC.cool mit diesen Tags anstellt, versteht man leichter, wenn man den Aufbau des Chips vor Augen hat. Hier ist also die Landkarte, die ich mir zeichnen musste, bevor ich die erste Zeile Code schreiben konnte.

Ein NTAG 424 DNA ist ein NFC-Forum-Typ-4-Tag mit 416 Bytes Speicher, aufgeteilt in eine einzige Anwendung mit drei fest vorgegebenen Dateien. Dateien anlegen oder löschen wie bei einem MIFARE DESFire geht nicht. Diese drei sind alles, was du bekommst:

| Datei | Größe | Inhalt |
| --- | --- | --- |
| File 01 | 32 Bytes | Der Capability Container, der dem Handy sagt, wo die NDEF-Daten liegen |
| File 02 | 256 Bytes | Die NDEF-Nachricht, in der Regel dein Link. Bei jedem Lesen spiegelt SUN seine aktuellen Werte in diese Datei |
| File 03 | 128 Bytes | Eine proprietäre Datei, die der Chip verschlüsselt halten kann. NFC.cool nutzt sie als Tresor, dazu unten mehr |

Neben den Dateien liegen fünf AES-128-Schlüssel, nummeriert von Key 0 bis Key 4. **Key 0** ist der Hauptschlüssel der Anwendung: Mit ihm authentifizierst du dich, wenn du den Link ändern, SUN einschalten, einen der anderen Schlüssel ersetzen oder an die Konfiguration des Chips willst. Key 1 bis Key 4 tun für sich genommen nichts. Sie spielen erst eine Rolle, wenn die Zugriffsrechte einer Datei oder die SUN-Einstellungen auf sie zeigen. Auf einem fabrikneuen Tag bestehen alle fünf Schlüssel aus sechzehn Null-Bytes, und die NDEF-Datei darf jeder beschreiben. Deshalb nimmt ein frischer Tag einen einfachen Link ganz ohne Umstände an.

Jeder Befehl, der etwas verändert, läuft in einer authentifizierten Sitzung: Handy und Chip führen mit einem dieser Schlüssel ein gegenseitiges Challenge-Response-Verfahren durch, leiten daraus Sitzungsschlüssel ab, und ab dann trägt jeder Befehl einen MAC oder ist komplett verschlüsselt. Das ist die gesicherte Kommunikation, von der im Rest dieses Beitrags immer wieder die Rede ist. NFC.cool hat sie vollständig implementiert, auf iPhone und auf Android, und jeder Schreibvorgang, den ich unten beschreibe, läuft darüber.

---

## Was ein Scan dir zeigt

Halt einen Tag ans Handy, und NFC.cool Tools auf dem [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-de&mt=8) oder auf [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-de) liest ihn bis ins Detail aus, ohne dass du irgendetwas eingeben musst: die Identität des Chips und ob es die TagTamper-Variante ist, den Link, die Einstellungen und Zugriffsrechte jeder Datei, welche Schlüssel-Slots nicht mehr auf Werkseinstellung stehen, und die Ergebnisse von drei getrennten Prüfungen.

### Ist das echtes NXP-Silizium?

Jeder NTAG 424 DNA verlässt das Werk mit einer **Originalitätssignatur**: einer ECDSA-Signatur über die eigene, sieben Byte lange UID des Chips, erstellt mit dem privaten Schlüssel von NXP auf der Kurve P-224. NFC.cool liest sie aus und prüft sie gegen den veröffentlichten öffentlichen Schlüssel von NXP, direkt auf dem Handy und ohne dass du einen Schlüssel eingeben musst. Geht die Prüfung durch, zeigt die App „Echtes NXP“. Damit ist die erste Frage beantwortet: Ist das wirklich NXP-Silizium oder ein Nachbau, der nur auf denselben Namen hört?

### Ist dieser Scan authentisch?

Das ist die SUN-Prüfung. Die App nimmt `picc_data` und `cmac` aus dem Link, den der Tag gerade ausgegeben hat, entschlüsselt die PICC-Daten, um an UID und Lesezähler zu kommen, rechnet den CMAC nach und vergleicht ihn mit dem, was der Tag geschickt hat. Stimmen beide überein, siehst du „Authentisch“, und der Zählerstand erscheint als Lesezähler.

Diese Prüfung braucht den Schlüssel des Tags, denn genau darum geht es ja. Ein Tag, der noch auf seinen Werksschlüsseln steht, wird mit dem Null-Schlüssel geprüft. Einen Tag, den du mit einem eigenen Schlüssel gesperrt hast, prüft die App mit dem Schlüssel, den NFC.cool beim Festlegen gespeichert hat. Und ein Tag, den jemand anderes mit einem Schlüssel gesperrt hat, den du nicht besitzt, zeigt „Nicht verifiziert“, und das ist genau die richtige Antwort.

### Ist das Siegel noch intakt?

Eine Variante dieser Chips, der **NTAG 424 DNA TagTamper**, ist als Siegel gebaut, dem man jedes Öffnen ansieht. Es ist ein Sticker mit einer dünnen Leiterschleife darin. Du klebst ihn über das, was du schützen willst, über die Lasche eines Kartons oder um den Verschluss einer Flasche. Er übernimmt damit genau die Aufgabe, die heute die „Garantie erlischt bei Beschädigung“-Aufkleber erledigen. Öffnest du die Verpackung, reißt der Sticker und mit ihm die Schleife.

Der Chip merkt sich zwei Dinge über diese Schleife: ein dauerhaftes Flag, das festhält, ob sie *jemals* unterbrochen wurde, und den aktuellen Zustand in diesem Moment. NFC.cool liest bei jedem Scan beides aus und meldet „Versiegelt“, „Geöffnet“ oder den Fall, auf den es am meisten ankommt, „Geöffnet, wieder verschlossen“: Jemand hat die Schleife unterbrochen und danach fein säuberlich wieder geschlossen. Das Flag kennt nur eine Richtung, eine wieder verschlossene Schachtel gilt also für den Rest des Chiplebens als geöffnet. Die Kryptografie beweist, dass der Chip echt ist. Das hier beweist, dass niemand in der Schachtel war.

---

## Eigene Tags programmieren: die Kurzfassung

Lesen ist die eine Hälfte. Die andere: Die leeren Tags von AliExpress gehören dir, und du kannst sie selbst programmieren. Die Minimalvariante besteht aus drei Schritten.

1. **Link schreiben.** Ein ganz normaler NDEF-Schreibvorgang, wie bei jedem anderen Tag.
2. **SUN einschalten.** Die App schreibt deinen Link mit Platzhaltern und sagt dem Chip, er soll bei jedem Lesen seine verschlüsselte UID, den Lesezähler und die Signatur in diese Platzhalter spiegeln. Ab jetzt erzeugt jeder Scan eine eigene, signierte URL.
3. **Einen eigenen Key 0 setzen.** Damit ersetzt du die Nullen ab Werk durch einen Schlüssel, den nur du kennst, sodass niemand sonst den Tag umkonfigurieren kann.

Für den letzten Schritt gibst du eine Passphrase ein, keinen Schlüssel. NFC.cool leitet den AES-Schlüssel daraus ab, indem es die ersten 16 Bytes des SHA-256-Hashs der Passphrase nimmt, auf iPhone und Android auf dieselbe Weise. Ein Tag, den du auf dem einen Gerät einrichtest, lässt sich auf dem anderen also mit derselben Passphrase öffnen. Wenn du lieber einen Schlüssel verwenden willst, der woanders erzeugt wurde, etwa von deinem eigenen Server, kannst du stattdessen die 32 Hex-Zeichen einfügen.

Geht der Schlüssel verloren, lässt sich der Tag nie wieder umkonfigurieren, deshalb achtet die App genau darauf, wo er gespeichert wird. Auf dem iPhone liegt er im Schlüsselbund und wird über iCloud Keychain synchronisiert. Auf Android wird er mit einem hardwaregestützten Schlüssel verschlüsselt und zusätzlich im Block Store abgelegt, damit er eine Neuinstallation oder ein neues Handy übersteht. Der neue Schlüssel wird gespeichert, bevor die Änderung an den Tag geht, und bricht der Scan mittendrin ab, bleiben alter und neuer Wert beide erhalten, bis der Tag bestätigt, welchen von beiden er hat. Eine Passphrase, die du auf einem anderen Gerät festgelegt hast, kannst du ebenfalls eingeben; die App prüft sie erst am Tag und speichert sie dann.

Eine Sache verweigert die App mit Absicht: einen einfachen Link über den normalen Schreibbildschirm auf einen Tag mit aktivem SUN zu schreiben. Die Spiegel-Offsets sind fest auf die URL eingestellt, mit der sie konfiguriert wurden, und bei einer URL anderer Länge würde der Chip bei jedem Scan mitten in deinen neuen Inhalt hineinspiegeln. Der NTAG-424-Bildschirm schaltet deshalb erst SUN aus und schreibt dann.

---

## Alles, was der Chip sonst noch kann

Bei dieser Kurzfassung hören die meisten Tutorials auf, und wer bisher weiter wollte, brauchte NXPs TagXplorer auf dem Rechner mit einem USB-Lesegerät. Ich wollte das ganze Datenblatt vom Handy aus erreichbar haben, also habe ich es Abschnitt für Abschnitt durchgearbeitet.

### Alle fünf Schlüssel

Key 0 hat einen eigenen Bildschirm, Key 1 bis Key 4 findest du unter „Erweitert“. Jeden davon kannst du aus einer Passphrase oder als Hex setzen, auf die Werkseinstellung zurücksetzen oder eingeben, nachdem er auf einem anderen Gerät festgelegt wurde. Jede Änderung authentifiziert sich mit Key 0, der über alle fünf Slots bestimmt.

### SUN mit den Schlüsseln deiner Wahl

SUN einschalten heißt nicht einfach einen Schalter umlegen. Du wählst den **Modus**: verschlüsselt, dann reist die UID in `picc_data` mit, und nur wer den Schlüssel hat, kann sie lesen; oder Klartext, dann stehen UID und Zähler offen in der URL, und nur die Signatur bleibt geheim. Und du wählst, welche Schlüssel die Arbeit machen: einen **Meta-Read-Schlüssel**, der die PICC-Daten verschlüsselt, und einen **File-Read-Schlüssel**, der die Signatur berechnet. Das kann derselbe Slot sein oder zwei verschiedene. So könnte eine Marke einem Partner den Schlüssel geben, mit dem er Scans prüft, ohne ihm den Schlüssel zu geben, der die UIDs entschlüsselt.

Wählst du einen Slot, der noch auf den Nullen ab Werk steht, warnt dich die App, denn eine Signatur mit einem bekannten Schlüssel schützt gar nichts. Und die Prüfung kommt mit jeder dieser Kombinationen zurecht: Ein Scan, der mit Key 3 signiert und mit Key 1 verschlüsselt wurde, wird korrekt verifiziert, solange diese Schlüssel auf dem Handy gespeichert sind.

### Zugriffsrechte der Dateien

Jede Datei hat vier Berechtigungen: Lesen, Schreiben, Lesen & Schreiben und Ändern, wobei die letzte regelt, wer die anderen drei bearbeiten darf. Jede Berechtigung zeigt auf einen der fünf Schlüssel, auf „Frei“ (jeder) oder auf „Nie“ (niemand, niemals). Du kannst also festlegen: „File 02 darf jeder lesen, schreiben darf nur Key 2, und nur Key 0 darf diese Regeln ändern“, und der Chip setzt das durch, ganz ohne App dazwischen.

NFC.cool zeigt dir die aktuellen Rechte jeder Datei, und du kannst sie bearbeiten, mit zwei eingebauten Warnungen. Die App sagt dir, wenn eine Berechtigung auf einen Schlüssel zeigt, den dieses Handy nicht hat, denn womöglich sperrst du dich gerade selbst aus. Und sie verlangt eine eigene Bestätigung, bevor du „Ändern“ auf „Nie“ setzt, denn sobald das geschrieben ist, sind die Regeln dieser Datei für den Rest des Chiplebens eingefroren.

### Chip-Konfiguration

Unter den Dateien liegt die Konfiguration des Chips selbst, die NXP über einen einzigen Befehl namens SetConfiguration zugänglich macht. NFC.cool deckt diese Optionen ab:

- **Zufällige UID.** Normalerweise meldet der Chip jedem Lesegerät dieselbe feste UID, womit jeder einen Tag über mehrere Scans hinweg verfolgen kann. Mit zufälliger UID antwortet er jedes Mal mit einer frischen Zufalls-ID und rückt die echte erst nach der Authentifizierung heraus. Ein echter Gewinn für die Privatsphäre, und endgültig. Die App erkennt Tags an ihrer UID, deshalb ermittelt sie die echte hinterher, indem sie jeden bekannten Key 0 über ein authentifiziertes GetCardUID durchprobiert. So bleibt der Tag auf dem Handy, das ihn eingerichtet hat, weiterhin verwaltbar.
- **Limit für fehlgeschlagene Authentifizierungen.** Wie viele Versuche mit falschem Schlüssel der Chip duldet, bevor er Key 0 sperrt. Das schützt davor, dass jemand Schlüssel durchprobiert, aber stellst du es zu niedrig ein, kann eine Handvoll fehlgeschlagener Scans den Hauptschlüssel für immer sperren.
- **Stärke der Rückmodulation.** Stark oder Standard. Standard kann an kleinen Antennen unlesbar sein, also lässt man es am besten auf der Voreinstellung.
- **Verkettetes Schreiben.** Lässt sich abschalten, dann ist ein einzelner Schreibvorgang auf einen Frame begrenzt. Endgültig.
- **Capability-Bytes.** Zwei freie Bytes, die NXP für eigene Zwecke freihält.
- **LRP.** Der Schalter für die gesicherte Kommunikation, der weiter unten einen eigenen Abschnitt bekommt.

### Der Tresor

File 03 ist eine proprietäre Datei mit 128 Bytes, die der Chip verschlüsselt halten kann, und NFC.cool macht daraus einen kleinen privaten Speicher auf dem Tag selbst. Sobald du zum ersten Mal etwas speicherst, schaltet die App die Datei in den vollständig verschlüsselten Modus und bindet jedes Zugriffsrecht an Key 0. Ab dann fasst der Tresor bis zu 126 Bytes Text, die nur dein Schlüssel wieder herausbekommt; wer den Tag mit einem anderen Handy ausliest, sieht einen Berechtigungsfehler und sonst nichts.

Gedacht ist das für ein Geheimnis, das beim Gegenstand bleiben soll statt in irgendeiner Datenbank: eine Seriennummer, eine Notiz an dein zukünftiges Ich, ein Token, das dein eigener Server erwartet. Setzt du Key 0 auf Werkseinstellung zurück, ist der Inhalt weg; anders verschwindet der Tresor nie.

---

## Der LRP-Modus

Normalerweise schützt der Chip seine Schlüssel mit gewöhnlichem AES, und wer einen Schlüssel stehlen will, müsste AES selbst knacken. Es gibt aber einen hinterhältigeren Weg: Chip auf den Labortisch, das feine Zittern in seiner Stromaufnahme und seiner elektromagnetischen Abstrahlung mitschneiden, während er rechnet, und aus genug solcher Aufzeichnungen lässt sich der Schlüssel allein aus diesem Leck rekonstruieren, ohne die Mathematik überhaupt anzurühren. **LRP**, das Leakage-Resilient Primitive, ist ein neu aufgebauter sicherer Kanal, der diesem Leck nichts liefern soll, woran es sich festhalten kann. NXP beschreibt ihn in AN12304. Für einen Sticker auf einer Weinflasche ist das komplett übertrieben, weshalb die meisten Tags ihn nie einschalten und kaum ein Programm ihn beherrscht.

In meinen Notizen für die erste Version stand direkt neben „LRP-Modus“: „nicht geplant“. Die Sache hat mich trotzdem nicht losgelassen, also habe ich den Modus doch gebaut. NFC.cool kann einen Tag in den LRP-Modus schalten und, was wichtiger ist, sich danach weiterhin bei ihm authentifizieren und ihn verwalten: Schlüssel, Dateirechte, Tresor, Chip-Konfiguration, alles über den LRP-Kanal statt über AES.

Zwei Dinge solltest du wissen, bevor du diesen Schalter umlegst. Er ist endgültig: Steht ein Tag einmal im LRP-Modus, ist seine gesicherte AES-Kommunikation für immer abgeschaltet, und jedes Programm, das nur AES spricht, kommt nie wieder an ihn heran. Und SUN gibt es auf einem LRP-Tag nicht. Ein Tag, dessen Aufgabe es ist, Scans zu signieren, sollte also im AES-Modus bleiben.

---

## Was sich nicht rückgängig machen lässt

Viele dieser Befehle sind endgültig, und die App macht im entscheidenden Moment deutlich darauf aufmerksam: Jede unumkehrbare Aktion musst du über eine Warnung bestätigen, die die Folge genau benennt. Trotzdem lohnt es sich, sie auch hier aufzulisten.

- LRP einschalten.
- Die zufällige UID einschalten.
- Verkettetes Schreiben abschalten.
- Die „Ändern“-Berechtigung einer Datei auf „Nie“ setzen.
- Einen Schlüssel verlieren. Der Chip hat keinen Werksreset. Ist Key 0 weg, kannst du den Tag nie wieder umkonfigurieren.
- Ein zu niedrig eingestelltes Limit für fehlgeschlagene Authentifizierungen, das Key 0 schon nach ein paar falschen Scans sperren kann.

Üb an einem Ersatz-Tag, bevor du einen anfasst, an dem dir etwas liegt.

---

## Wo fälschungssichere NFC-Tags wirklich zum Einsatz kommen

Ganz ehrlich? Die meisten, die einen NFC-Tag scannen, werden nichts davon je brauchen, und das ist völlig in Ordnung. Ein Sticker, der einen Link öffnet, ist eine wunderbar langweilige, nützliche Sache.

Aber wer so einen Tag einmal in der Hand hatte, sieht die Anwendungen sofort. Eine Luxustasche kann beweisen, dass sie echt ist. Eine Flasche Wein oder Whisky kann zeigen, dass sie nie heimlich geöffnet und wieder aufgefüllt wurde; diesen Teil übernimmt das Manipulationssiegel. Eine Medikamentenpackung bürgt für das echte Präparat darin und zugleich für ein Siegel, das niemand gebrochen hat. Eventtickets sind nichts mehr, das man per Screenshot weiterreicht, und ein Tag an einer Tür beweist, dass jemand wirklich dort stand, statt vom Sofa aus einen gespeicherten Link noch einmal abzuschicken. Es ist dasselbe Echtheitsproblem, das der [digitale EU-Produktpass](/blog/eu-digital-product-passport-2026/) von der Regulierungsseite her angeht, nur gelöst auf der Ebene des einzelnen Gegenstands.

Ich habe das nicht gebaut, weil tausend Nutzer danach gefragt hätten. Ich habe es gebaut, weil ich aus Neugier ein paar merkwürdige Tags im Internet bestellt und herausgefunden habe, wie sie funktionieren, und danach keine Seite des Datenblatts mehr liegen lassen konnte. So fangen die guten Funktionen meistens an.

---

## Mein Fazit zu NTAG 424 DNA Tags

NTAG 424 DNA Tags sind das, was bei NFC einem manipulationssicheren Siegel am nächsten kommt. Sie halten niemanden davon ab, ein Produkt zu kopieren, aber sie machen den *Echtheitsbeweis* fälschungssicher, denn dieser Beweis ist eine frische kryptografische Signatur, die nur der echte Chip erzeugen kann.

NFC.cool Tools liest sie, prüft Chip, Scan und Manipulationssiegel und legt dir den ganzen Chip zum Konfigurieren in die Hand: jeden Schlüssel, die Rechte jeder Datei, die Einstellungen des Chips selbst, sogar LRP, alles direkt vom Handy aus. Wenn du dich je gefragt hast, wie ein Scan echt von gefälscht unterscheiden kann, hol dir die App für [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-de&mt=8) oder [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-de), bestell dir ein paar [dieser Tags](/affiliate-links/) für ein paar Euro und scanne selbst einen. In dem Thema kann man sich herrlich verlieren.
