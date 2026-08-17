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

Das ist die ehrliche Fassung des Marketingsatzes. Der Chip macht nicht das *Produkt* kopiersicher, sondern den *Echtheitsbeweis*, und er verlagert diesen Beweis auf etwas, das ein Fälscher nicht nachbauen kann.

---

## Wie NFC.cool prüft, ob ein Tag echt ist

Als ich die Tags verstanden hatte, wollte ich, dass die App die Sache richtig macht und nicht bloß einen Hex-Dump anzeigt. NFC.cool Tools beherrscht den NTAG 424 DNA jetzt also komplett, auf [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-de&mt=8) und [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-de), und prüft die Echtheit auf zwei voneinander unabhängige Arten; bei den dafür gebauten Tags kommt eine dritte, physische dazu.

**Die Herkunft des Chips.** Jeder echte NXP-Chip trägt ab Werk eine Signatur über seine eigene ID, erstellt mit dem privaten Schlüssel von NXP. NFC.cool liest diese Signatur aus und prüft sie direkt auf dem Handy gegen den öffentlichen Schlüssel von NXP. Passt alles, steht da schlicht „Echter NXP“. Für diesen Schritt musst du nichts einrichten und keinen Schlüssel eingeben. Er beantwortet die Frage: Ist das echtes NXP-Silizium oder ein No-Name-Klon?

**Der Scan selbst.** Das ist die SUN-Prüfung. NFC.cool entschlüsselt `picc_data`, holt Tag-ID und Zählerstand heraus, rechnet die Signatur nach und vergleicht sie mit dem `cmac`, den der Tag mitgeschickt hat. Stimmen beide überein, ist der Scan echt und frisch, und du siehst „Authentisch“. Dieser Schritt beweist mehr und verlangt deshalb auch mehr: den Schlüssel des Tags. Ein fabrikneuer Tag mit Werksschlüssel lässt sich ganz ohne Eingabe prüfen. Hat jemand den Tag mit einem eigenen Schlüssel gesperrt, gilt er nur dann als authentisch, wenn du genau diesen Schlüssel gespeichert hast.

**Das physische Siegel, bei den Tags, die dafür gebaut sind.** Eine Variante, der NTAG 424 DNA TagTamper, ist als Siegel gedacht, dem man jedes Öffnen ansieht. Ein Sticker mit einem dünnen zusätzlichen Draht darin; du klebst ihn über das, was du schützen willst: über die Lasche eines Kartons, um den Verschluss einer Flasche. Dieselbe Aufgabe erledigen heute die „Garantie erlischt bei Beschädigung“-Aufkleber. Öffnest du die Verpackung, reißt der Sticker und mit ihm der Draht. NFC.cool prüft diesen Draht beim Scan und sagt dir klipp und klar, ob das Siegel noch intakt ist oder schon einmal aufgebrochen wurde. Das Schöne daran: Es funktioniert nur in eine Richtung. Ist der Draht einmal durch, merkt sich der Chip das für immer. Wer die Schachtel öffnet und danach fein säuberlich wieder verschließt, hat trotzdem verloren: Der Chip meldet sie weiterhin als geöffnet. Die Kryptografie beweist, dass der Chip echt ist; der Draht beweist, dass niemand in der Schachtel war.

Das alles ist für jeden kostenlos. Einen Tag auslesen, also Link, Zählerstand, Dateiaufbau und den Zustand des Siegels, und dazu beide kryptografischen Prüfungen: Das kostet nichts. Ich wollte, dass jeder, der so einen Tag scannt, die Frage „Ist das Ding echt?“ selbst beantworten kann.

---

## Eigene sichere Tags programmieren

Lesen ist die eine Hälfte. Die andere: Die leeren Tags von AliExpress gehören dir, und du kannst sie selbst programmieren. NFC.cool macht das über einen ordentlich authentifizierten, verschlüsselten Kanal, also über genau die gesicherte Kommunikation, auf der der Chip besteht, und nicht per Schreibbefehl auf gut Glück.

Die einfache Variante besteht aus drei Schritten. Schreib deinen eigenen Link drauf, das ist kostenlos. Schalte SUN ein, damit der Tag jeden Scan signiert. Und ersetze den Werksschlüssel durch einen eigenen: als Passphrase festgelegt, damit du dich nicht mit einer 32-stelligen Hex-Zeichenkette herumschlagen musst, und in deinem Schlüsselbund gespeichert. Ab da gehört der Tag dir: Er beweist weiterhin jedem, der ihn scannt, dass er echt ist, aber neu programmieren kannst nur noch du ihn.

Hier hätte ich aufhören können. Die wenigen Apps, die sich überhaupt an diese Tags herantrauen, hören hier auf. Ich nicht.

---

## Den kompletten NTAG 424 DNA Chip vom iPhone oder Android aus konfigurieren

Irgendwann in einer Woche voller langer Nächte mit diesen Tags habe ich eine Entscheidung getroffen: NFC.cool Tools deckt die NTAG 424 DNA Spezifikation zu 100 % ab, nicht nur den vorzeigbaren Ausschnitt, an dem jedes „Scannen und verifizieren“-Tutorial aufhört. Wenn das die beste NFC-App werden soll, die es gibt, dann darf „wir unterstützen NTAG 424 DNA“ nicht heimlich heißen: „wir unterstützen den einen Schlüssel und den einen Modus, die einfach waren“. Also habe ich mich durchs Datenblatt gearbeitet und den Rest gebaut.

Ein NTAG 424 DNA Chip hat nicht einen Schlüssel, er hat fünf. NFC.cool verwaltet jetzt alle fünf: Du kannst jeden Slot ändern, auf Werkseinstellung zurücksetzen oder einen Schlüssel eingeben, den du auf einem anderen Gerät festgelegt hast, damit auch dieses Handy den Tag bedienen kann. Und SUN muss nicht mit dem Hauptschlüssel signieren: Die Verschlüsselung des Scans kann auf dem einen Schlüssel liegen und die Signatur auf einem anderen, und du entscheidest, ob der Tag seine ID im Klartext mitschickt oder verschlüsselt lässt.

Jede Datei auf dem Chip hat ihre eigenen Zugriffsregeln, und die kannst du jetzt bearbeiten: wer eine Datei lesen darf, wer sie schreiben darf, wer ihre Einstellungen ändern darf, jeweils an einen bestimmten Schlüssel gebunden, für alle offen oder für immer gesperrt. Unter den Dateien liegt die Konfiguration des Chips selbst, und auch an die kommst du ran: eine zufällige ID einschalten, damit der Tag nicht mehr jedem Lesegerät in seiner Nähe dieselbe Seriennummer entgegenruft (ein echter Gewinn für die Privatsphäre), festlegen, wie viele fehlgeschlagene Entsperrversuche er zulässt, bevor er dichtmacht, und eine Handvoll tieferliegender Schalter, die die meisten nie anfassen werden.

Der Chip hat sogar einen kleinen privaten Tresor: eine verschlüsselte Datei, an deinen Key 0 gebunden, die auf dem Tag selbst mitreist, statt auf einem Server zu liegen. Leg dort ein kleines Geheimnis ab, etwas, das beim Tag bleiben soll statt in irgendeiner Datenbank, und nur dein Schlüssel bekommt es wieder heraus. NFC.cool schreibt und liest diese Datei für dich.

Wer das schon einmal gemacht hat, saß dabei am Schreibtisch. NXP stellt dafür ein Windows-Programm namens TagXplorer bereit: USB-Lesegerät an den Rechner, und von dort klickst du dich durch die Konfiguration des Chips. NFC.cool kann all das auch, nur ohne dass man sich dabei durchbeißen muss. Wo TagXplorer eine Desktop-Oberfläche voller nacktem Hex-Code und kryptischer Felder ist, zeigt dir NFC.cool verständliche Bildschirme auf dem Handy, das ohnehin in deiner Tasche steckt, mit einer Passphrase statt eines rohen Schlüssels und einer Warnung vor allem, was endgültig ist. Das Ganze steuerst du, indem du dein Handy ein, zwei Sekunden an den Tag hältst.

---

## Was der LRP-Modus des NTAG 424 DNA ist, und welche Änderungen sich nicht rückgängig machen lassen

Und dann ist da noch LRP. In meinen Notizen für die erste Version stand direkt neben „LRP-Modus“: „nicht geplant - exotisch, braucht keine Consumer-App“. LRP steht für Leakage-Resilient Primitive und ist der wirklich paranoide Modus des Tags. Normalerweise schützt der Chip seine Schlüssel mit gewöhnlichem AES, und wer einen Schlüssel stehlen will, müsste AES selbst knacken. Es gibt aber einen hinterhältigeren Weg: Chip auf den Labortisch, das feine Zittern in seiner Stromaufnahme und das elektromagnetische Rauschen mitschneiden, während er rechnet, und aus genug solcher Aufzeichnungen lässt sich der geheime Schlüssel allein aus diesem Leck rekonstruieren, ohne die Mathematik überhaupt anzurühren. LRP ist ein neu aufgebauter sicherer Kanal, der diesem Leck nichts liefern soll, an dem es sich festbeißen kann. Für einen Sticker auf einer Weinflasche ist das komplett übertrieben, weshalb die meisten Tags ihn nie einschalten und kaum ein Programm ihn beherrscht. Mich hat er trotzdem nicht losgelassen, und „die ganze Spezifikation abdecken“ hat keine Fußnote „außer dem schweren Teil“. Also habe ich ihn gebaut. NFC.cool spricht jetzt LRP. Das heißt: Selbst wenn ein Tag in diesen Modus umgeschaltet wurde, und das ist ein Schalter in eine Richtung, den du nicht mehr zurücklegen kannst, kann sich die App weiterhin bei ihm authentifizieren und ihn verwalten wie jeden anderen. Ich kenne keine andere Handy-App, die so weit geht.

Die heiklen Stellen will ich nicht verschweigen, denn davon gibt es jetzt mehr. Viele dieser Befehle sind endgültig. LRP einschalten lässt sich nicht rückgängig machen. Eine zufällige ID einschalten auch nicht. Setzt du die „Ändern“-Berechtigung einer Datei auf Nie, ist diese Datei eingefroren, solange der Tag existiert. Ein falscher Schlüssel kann einen Slot für immer sperren. Die App macht darauf im entscheidenden Moment deutlich aufmerksam, die wirklich unumkehrbaren Aktionen musst du über eine Warnung bestätigen, die die Folge genau benennt. Trotzdem sage ich es auch hier: Üb an einem Ersatz-Tag, bevor du einen anfasst, an dem dir etwas liegt.

---

## Wo fälschungssichere NFC-Tags wirklich zum Einsatz kommen

Ganz ehrlich? Die meisten, die einen NFC-Tag scannen, werden nichts davon je brauchen, und das ist völlig in Ordnung. Ein Sticker, der einen Link öffnet, ist eine wunderbar langweilige, nützliche Sache.

Aber wer so einen Tag einmal in der Hand hatte, sieht die Anwendungen sofort. Eine Luxustasche kann beweisen, dass sie echt ist. Eine Flasche Wein oder Whisky kann zeigen, dass sie nie heimlich geöffnet und mit etwas Billigerem aufgefüllt wurde; diesen Teil übernimmt das Manipulationssiegel. Eine Medikamentenpackung bürgt für das echte Präparat darin und zugleich für ein Siegel, das niemand gebrochen hat. Ein Produkt in limitierter Auflage oder ein Kunstwerk bekommt ein Zertifikat, das niemand fälschen kann, und Eventtickets sind nichts mehr, das man per Screenshot weiterreicht. Häng einen Tag an eine Tür oder ins Regal, und ein Scan beweist, dass jemand wirklich dort stand, statt vom Sofa aus einen gespeicherten Link noch einmal abzuschicken. Sneaker und Sammelkarten belegen, dass sie aus dem echten Drop stammen und keine gute Fälschung sind. Und jeder kleine Hersteller kann seinem Produkt den Nachweis mitgeben, dass es wirklich *seins* ist. Es ist dasselbe Echtheitsproblem, das der [digitale EU-Produktpass](/blog/eu-digital-product-passport-2026/) von der Regulierungsseite her angeht, nur gelöst auf der Ebene des einzelnen Gegenstands.

Ich habe das nicht gebaut, weil tausend Nutzer danach gefragt hätten. Ich habe es gebaut, weil ich aus Neugier ein paar merkwürdige Tags im Internet bestellt und herausgefunden habe, wie sie funktionieren, und danach keine Seite des Datenblatts mehr liegen lassen konnte. So fangen die guten Funktionen meistens an.

---

## Mein Fazit zu NTAG 424 DNA Tags

NTAG 424 DNA Tags sind das, was bei NFC einem manipulationssicheren Siegel am nächsten kommt. Sie halten niemanden davon ab, ein Produkt zu kopieren, aber sie machen den *Echtheitsbeweis* fälschungssicher, denn dieser Beweis ist eine frische kryptografische Signatur, die nur der echte Chip erzeugen kann.

NFC.cool Tools liest sie jetzt, prüft Chip, Scan und Manipulationssiegel kostenlos und legt dir den ganzen Chip zum Konfigurieren in die Hand: jeden Schlüssel, die Rechte jeder Datei, die tiefsten Einstellungen, sogar LRP. Deine eigenen Tags richtest du damit direkt vom Handy aus ein. Wenn du dich je gefragt hast, wie ein Scan echt von gefälscht unterscheiden kann, hol dir die App für [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-de&mt=8) oder [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-de), bestell dir ein paar [dieser Tags](/affiliate-links/) für ein paar Euro und scanne selbst einen. In dem Thema kann man sich herrlich verlieren.
