---
id: "ntag-424-dna-2026-07"
title: "NTAG 424 DNA: Die NFC-Tags, die beweisen, dass sie keine Fälschungen sind"
date: "2026-07-24"
tags: ["announcements", "nfc-tags", "industry"]
summary: "Ich hatte gehört, dass Luxusmarken NTAG 424 DNA Tags nutzen, um zu beweisen, dass ein Produkt echt ist - also habe ich mir einen Schwung bei AliExpress bestellt, um zu sehen, was sie wirklich tun. Sie entpuppten sich als der NFC-Tap-Zähler mit einer draufgesetzten Kryptoschicht, und NFC.cool Tools liest, verifiziert und konfiguriert sie jetzt vollständig auf iPhone und Android - jeden Schlüssel, die Rechte jeder Datei und die Einstellungen des Chips selbst."
image: "/assets/images/Blog/ntag-424-dna-counterfeit-proof-nfc-tags.webp"
imageAlt: "Ein NTAG 424 DNA Tag wird an ein iPhone gehalten, das ein Echtheits-Ergebnis neben dem Konfigurationsbildschirm des Tags zeigt"
author: "Nicolo Stanciu"
metaTitle: "NTAG 424 DNA: Der fälschungssichere NFC-Tag erklärt"
metaDescription: "Ich habe NTAG 424 DNA Tags gekauft, um zu sehen, wie Marken beweisen, dass ein Produkt echt ist. So funktionieren diese fälschungssicheren NFC-Tags, und so liest, verifiziert und programmiert NFC.cool sie."
ogTitle: "Die NFC-Tags, die beweisen, dass sie keine Fälschungen sind"
ogDescription: "Wie NTAG 424 DNA Tags Klone entlarven und wie NFC.cool sie auf iPhone und Android liest, verifiziert und konfiguriert."
---

Vor einiger Zeit ist mir immer wieder dieselbe Behauptung untergekommen: Luxusmarken bauen NFC-Chips in ihre Produkte, damit du mit dem Handy eine Tasche oder eine Flasche antippen und wissen kannst, dass es das Original ist und keine Fälschung. Jeder Artikel brachte denselben glänzenden Satz, und keiner sagte, *wie*. Was hält einen Fälscher eigentlich davon ab, den Chip gleich mit der Handtasche zu kopieren?

Also habe ich das getan, was ich immer tue, wenn mich ein Tag neugierig macht. Ich bin auf AliExpress gegangen, habe ein Angebot für "NTAG 424 DNA" Tags gefunden, einen kleinen Schwung bestellt und darauf gewartet, dass der Umschlag auftaucht. Ein paar Euro, ein paar Wochen, und ich hatte dasselbe Silizium, auf dem diese Markenschutz-Systeme aufbauen, auf meinem Schreibtisch liegen. Dann habe ich einen angetippt, um zu sehen, was er tut.

## Was ein NTAG 424 DNA Tag eigentlich ist

Von außen ist es ein ganz gewöhnlicher NFC-Tag. Du könntest ihn nicht aus einem Haufen billiger Tags herausfischen, und jedes Handy liest ihn ohne Murren. Wenn du meinen [Ratgeber zu den NFC-Tag-Typen](/blog/nfc-tag-types-for-iphones/) gelesen hast: Er reiht sich als ein weiterer Typ-4-Tag ein, den dein iPhone gerne liest.

Der "DNA"-Teil ist das, was anders ist. Im Inneren hält der Chip ein paar AES-128-Schlüssel und eine kleine Krypto-Engine, und er kann etwas, das kein schlichter NTAG215 und kein Sticker aus dem Multipack kann: Er kann jeden einzelnen Tap *signieren*. Diese Signatur ist der ganze Clou. Sie ist der Unterschied zwischen einem Tag, der sagt "hier ist ein Link", und einem Tag, der sagt "hier ist ein Link, und hier ist der kryptografische Beweis, dass ich, genau dieser echte Chip, ihn gerade ausliefere, jetzt in diesem Moment".

Genau dafür zahlen Luxusmarken in Wahrheit - nicht für den Link, sondern für den Beweis, dass ein echter Chip derjenige ist, der ihn ausliefert.

## Wie SUN und SDM funktionieren: ein Link, der sich bei jedem Tap neu schreibt

Und dann hat es bei mir Klick gemacht. Als ich mir angeschaut habe, was der Tag eigentlich sendet, wurde mir klar, dass ich den Großteil der Maschinerie, um ihn zu verstehen, schon gebaut hatte.

Anfang dieses Jahres habe ich eine [NFC-Tap-Zähler-Funktion](/blog/count-nfc-tag-scans/) veröffentlicht: ein Tag, der mitzählt, wie oft er gelesen wurde, und diese Zahl in die URL schreibt, sodass ein Link wissen kann, dass es das 47. Mal ist, dass ihn jemand gescannt hat. Ein NTAG 424 DNA Tag ist dieselbe Idee, nur mit einer Verschlüsselungsschicht drumherum, die ihn fälschungssicher macht.

Der Mechanismus heißt **SUN** (Secure Unique NFC) oder **SDM** (Secure Dynamic Messaging), wenn du im [Datenblatt von NXP](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf) liest. Du speicherst einen normalen Link auf dem Tag, so etwas wie `https://example.com`. Aber du sagst dem Chip, dass er Teile dieses Links bei jedem Antippen dynamisch neu schreiben soll. Was dein Handy also tatsächlich empfängt, sieht eher so aus:

`https://example.com/?picc_data=A1B2...&cmac=9F3C...`

Diese beiden Werte sind keine Deko. `picc_data` ist eine verschlüsselte Kopie der echten ID des Tags plus einem Tap-Zähler, verwürfelt mit einem Schlüssel, der den Chip nie verlässt. `cmac` ist eine kryptografische Signatur über diese Daten. Beide ändern sich bei jedem Tap. Tippe denselben Tag zweimal an, und du bekommst zwei völlig verschiedene URLs, jede frisch vom Chip signiert.

Ich stelle mir einen schlichten NFC-Tag wie ein gedrucktes Schild im Schaufenster vor. Jeder kann es abfotografieren und eine identische Kopie ausdrucken. Ein SUN-Tag ist eher wie ein Wachmann, der dir jedes Mal, wenn du hereinkommst, eine neue, einzeln nummerierte und gestempelte Quittung in die Hand drückt. Die Quittung von gestern zu kopieren bringt dir nichts, denn die heutige Nummer ist eine andere, und nur der Stempel des Wachmanns ist echt.

## Warum ein geklonter NTAG 424 DNA Tag auffliegt

Das ist der Teil, der meine ursprüngliche Frage beantwortet. Ein Fälscher kann durchaus den *Inhalt* eines Tags klonen. Er kann die URL auslesen, sie Byte für Byte kopieren und auf einen leeren Chip programmieren. Das war schon immer so, und genau deshalb beweist "pack einfach einen QR-Code drauf" in Wahrheit nie etwas.

Was er nicht kann, ist die nächste gültige Signatur erzeugen. Der Signaturschlüssel steckt im echten Chip und kommt nie heraus, nicht einmal während eines Taps. Das heißt, ein Tap hat nur für etwas einen Wert, das den Schlüssel tatsächlich besitzt. In einem echten Markenschutz-Aufbau zeigt der Link des Tags auf einen Server, den der Hersteller betreibt, und dieser Server ist es, der jeden Tap entschlüsselt, die Signatur neu berechnet, um zu bestätigen, dass der Schlüssel passt, und den Zähler im Blick behält, während er nach oben klettert.

Genau dieser letzte Teil überführt einen Klon. Die einzige URL, die ein Fälscher auf eine Fälschung packen kann, ist eine, die er von einem echten Tap abgegriffen hat - eingefroren mit dem Zählerstand, den dieser Tap zufällig trug. Spielt er sie erneut ab, schaut der Server auf eine Zahl, die er schon gesehen hat, und der Zähler eines echten Chips bewegt sich immer nur vorwärts - eine Wiederholung oder ein Schritt zurück verrät die Wiedergabe also. Um einen frischen, höheren Zählerstand mit einer Signatur zu schicken, die trotzdem aufgeht, bräuchte er den Schlüssel, und um an den Schlüssel zu kommen, müsste er AES knacken oder den Chip physisch freilegen. Beides passiert für eine gefälschte Handtasche nicht.

Das ist die ehrliche Version des Marketingsatzes. Der Chip macht nicht das *Produkt* unkopierbar. Er macht den *Echtheitsbeweis* unkopierbar, und er verlagert diesen Beweis auf etwas, das der Fälscher nicht reproduzieren kann.

## Wie NFC.cool prüft, ob ein Tag echt ist

Sobald ich die Tags verstanden hatte, wollte ich, dass die App die ganze Sache ordentlich macht und nicht nur einen Hex-Dump anzeigt. NFC.cool Tools beherrscht jetzt also die volle NTAG 424 DNA Handhabung auf [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-de&mt=8) und [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-de), und es prüft die Echtheit auf zwei unabhängige Arten, plus eine dritte, physische bei den Tags, die dafür gebaut sind.

**Die Herkunft des Chips.** Jeder echte NXP-Chip trägt eine Werkssignatur über seiner eigenen ID, signiert mit dem privaten Schlüssel von NXP. NFC.cool liest diese Signatur und verifiziert sie gegen den öffentlichen Schlüssel von NXP, direkt auf dem Handy. Wenn sie aufgeht, bekommst du ein schlichtes Ergebnis "Echter NXP". Dieser Schritt braucht keine Einrichtung und keine Schlüssel von dir. Er beantwortet die Frage: "Ist das echtes NXP-Silizium oder ein No-Name-Klon?"

**Der Tap selbst.** Das ist die SUN-Prüfung. NFC.cool entschlüsselt die `picc_data`, holt die Tag-ID und den Tap-Zähler heraus, berechnet die Signatur neu und vergleicht sie mit dem `cmac`, den der Tag geschickt hat. Stimmen sie überein, ist der Tap echt und frisch, und du siehst "Authentisch". Dieser Schritt beweist mehr, also verlangt er mehr: Er braucht den Schlüssel des Tags. Ein brandneuer Tag, der noch auf seinem Werkszustand steht, verifiziert sich ganz ohne Eingabe. Ein Tag, den jemand mit seinem eigenen Schlüssel gesperrt hat, verifiziert sich nur dann als authentisch, wenn du diesen Schlüssel gespeichert hast.

**Das physische Siegel, bei den dafür gebauten Tags.** Eine Variante davon, der NTAG 424 DNA TagTamper, ist als manipulationssicheres Siegel gemacht. Es ist ein Sticker mit einem dünnen zusätzlichen Draht darin, und du klebst ihn über das, was du schützen willst - über die Lasche eines Kartons oder um den Verschluss einer Flasche, dieselbe Aufgabe, die heute diese "Garantie erlischt bei Beschädigung"-Sticker erledigen. Öffnest du den Gegenstand, reißt du den Sticker ein, was den Draht durchtrennt. NFC.cool prüft diesen Draht bei einem Tap und sagt dir klar, ob das Siegel noch intakt ist oder aufgebrochen wurde. Das Elegante daran ist, dass es eine Einweg-Sperre ist: einmal durchtrennt, und der Chip merkt es sich für immer - etwas, das geöffnet und dann sorgfältig wieder versiegelt wurde, liest sich also weiterhin als geöffnet. Die Kryptografie beweist, dass der Chip echt ist; das hier beweist, dass niemand in der Schachtel war.

All das ist für alle kostenlos. Einen Tag zu lesen - seinen Link, seinen Tap-Zähler, sein Datei-Layout, ob sein Siegel noch intakt ist - und beide kryptografischen Prüfungen laufen zu lassen, kostet nichts. Ich wollte, dass die Frage "ist das Ding echt?" von jedem beantwortet werden kann, der einen antippt.

## Eigene sichere Tags programmieren

Lesen ist die eine Hälfte. Die andere Hälfte ist, dass diese leeren Tags von AliExpress dir gehören und du sie programmieren kannst - und NFC.cool tut das über einen richtigen authentifizierten, verschlüsselten Kanal, dieselbe gesicherte Kommunikation, auf der der Chip besteht, und kein rohes Draufschreiben auf gut Glück.

Die sanfte Variante besteht aus drei Schritten. Schreib deinen eigenen Link, das ist kostenlos. Schalte SUN ein, damit der Tag anfängt, jeden Tap zu signieren. Und ersetze den Werksschlüssel durch deinen eigenen, festgelegt als Passphrase, damit du dich nicht mit einer 32-stelligen Hex-Zeichenkette herumschlagen musst, gespeichert in deinem Schlüsselbund. Ab diesem Punkt ist der Tag an dich gebunden: Er beweist weiterhin jedem, der ihn antippt, dass er echt ist, aber nur du kannst ihn je neu programmieren.

An dieser Stelle hätte ich aufhören können. Die wenigen Apps, die diese Tags überhaupt anfassen, hören hier auf. Ich nicht.

## Den ganzen NTAG 424 DNA Chip von deinem iPhone oder Android konfigurieren

Irgendwo in einer Woche voller später Nächte mit diesen Tags habe ich eine Entscheidung getroffen: NFC.cool Tools würde 100 % der NTAG 424 DNA Spezifikation abdecken, nicht die demofreundliche Scheibe, bei der jedes "Antippen zum Verifizieren"-Tutorial aufhört. Wenn das die beste NFC-App sein soll, die es gibt, dann kann "wir unterstützen NTAG 424 DNA" nicht klammheimlich "wir unterstützen den einen Schlüssel und den einen Modus, die einfach waren" bedeuten. Also habe ich mich durchs Datenblatt gearbeitet und den Rest gebaut.

Ein NTAG 424 DNA Chip hat nicht einen Schlüssel. Er hat fünf. NFC.cool verwaltet jetzt alle - ändere einen beliebigen Slot, setz ihn auf Werkseinstellung zurück oder gib einen Schlüssel ein, den du auf einem anderen Gerät festgelegt hast, damit auch dieses Handy den Tag steuern kann. SUN muss auch nicht mit diesem primären Schlüssel signieren: Du kannst die Verschlüsselung des Taps auf den einen Schlüssel und seine Signatur auf einen anderen richten und entscheiden, ob der Tag seine ID im Klartext spiegelt oder sie verschlüsselt hält.

Jede Datei auf dem Chip trägt ihre eigenen Zugriffsregeln, und du kannst sie jetzt bearbeiten - wer eine Datei lesen darf, wer sie schreiben darf, wer ihre Einstellungen ändern darf - jeweils auf einen bestimmten Schlüssel gesetzt, oder auf weit offen, oder auf für immer verschlossen. Unter den Dateien liegt die Konfiguration des Chips selbst, und auch die ist hier: Schalte eine zufällige ID ein, damit der Tag aufhört, jedem Leser, an dem er vorbeikommt, dieselbe Seriennummer zuzurufen (ein echter Gewinn für die Privatsphäre), begrenze, wie viele fehlgeschlagene Entsperrversuche er duldet, bevor er sich selbst abriegelt, und eine Handvoll systemnaher Schalter, die die meisten Leute nie anfassen müssen.

Der Chip führt sogar einen kleinen privaten Tresor. Es gibt eine verschlüsselte Datei darauf, an deinen Key 0 gebunden, die auf dem Tag selbst mitreist, statt auf einem Server zu liegen. Leg ein kleines Geheimnis hinein, etwas, das mit dem Tag reisen soll, statt in irgendeiner Datenbank zu sitzen, und nur dein Schlüssel kann es wieder auslesen. NFC.cool schreibt sie und liest sie für dich.

## Was der NTAG 424 DNA LRP-Modus ist, und die Änderungen, die du nicht rückgängig machen kannst

Und dann ist da noch LRP. In meinen Design-Notizen für die erste Version stand direkt neben "LRP-Modus" der Satz "nicht geplant - exotisch, von einer Consumer-App nicht gebraucht". LRP steht für Leakage-Resilient Primitive und ist der wirklich paranoide Modus des Tags. Normalerweise bewacht der Chip seine Schlüssel mit gewöhnlichem AES, und einen Schlüssel zu stehlen hieße, AES selbst zu knacken. Aber es gibt einen hinterhältigeren Angriffsweg: Leg einen Chip auf den Labortisch, beobachte das leise Schwanken in seiner Stromaufnahme und das elektromagnetische Summen, während er die Kryptografie ausführt, und mit genug solcher Spuren kannst du den geheimen Schlüssel allein aus dem Leck rekonstruieren, ohne die Mathematik je anzufassen. LRP ist ein neu gebauter sicherer Kanal, der genau diesem Leck nichts geben soll, woran es sich festhalten kann. Für einen Sticker auf einer Weinflasche ist das echter Overkill, weshalb die meisten Tags ihn nie einschalten und die meisten Werkzeuge nie lernen, ihn zu sprechen. Trotzdem hat er mir keine Ruhe gelassen, und "die ganze Spezifikation abdecken" kommt nicht mit einer Fußnote, die "außer dem schweren Teil" sagt - also habe ich ihn gebaut. NFC.cool spricht jetzt LRP, was heißt, dass die App sich selbst nach dem Umschalten eines Tags in diesen Modus - ein Einweg-Schalter, den du nicht zurücknehmen kannst - immer noch bei ihm authentifizieren und ihn wie jeden anderen verwalten kann. Ich kenne keine andere Handy-App, die dort hingeht.

Ich bin ehrlich, was die heiklen Stellen angeht, denn davon gibt es jetzt mehr. Viele dieser Befehle sind endgültig. LRP zu aktivieren lässt sich nicht rückgängig machen. Eine zufällige ID einzuschalten lässt sich nicht rückgängig machen. Setz die "Ändern"-Berechtigung einer Datei auf Nie, und du hast diese Datei für das ganze Leben des Tags eingefroren. Ein falscher Schlüssel kann einen Slot für immer sperren. Die App ist im Moment des Handelns laut darüber - die wirklich unumkehrbaren Aktionen lassen dich über eine Warnung bestätigen, die die genaue Konsequenz ausbuchstabiert -, aber es ist auch hier wert, gesagt zu werden: Üb an einem Ersatz-Tag, bevor du einen anfasst, der dir wichtig ist.

## Wo fälschungssichere NFC-Tags tatsächlich zum Einsatz kommen

Ehrlich? Die meisten Leute, die einen NFC-Tag antippen, brauchen nichts davon je, und das ist völlig in Ordnung. Ein Sticker, der einen Link öffnet, ist eine wunderbare, langweilige, nützliche Sache.

Aber sobald du eines davon in der Hand gehabt hast, sind die Anwendungsfälle offensichtlich. Eine Luxustasche kann beweisen, dass sie echt ist. Eine Flasche Wein oder Whisky kann zeigen, dass sie nie heimlich entkorkt und mit etwas Billigerem wieder aufgefüllt wurde - das Manipulationssiegel übernimmt diese Hälfte. Eine Schachtel Medikamente bürgt sowohl für das echte Präparat darin als auch für ein Siegel, das niemand gebrochen hat. Ein Produkt in limitierter Auflage oder ein Kunstwerk bekommt ein Zertifikat, das niemand fälschen kann, und Eventtickets sind nicht länger etwas, das du per Screenshot herumreichen kannst. Bring einen Tag an einer Tür oder in einem Regal an, und ein Tap beweist, dass jemand tatsächlich dort stand, statt vom Sofa aus einen gespeicherten Link erneut abzuspielen. Sneaker und Sammelkarten beweisen, dass sie der echte Drop sind und keine gute Fälschung. Und jeder Indie-Hersteller kann sein Ding beweisen lassen, dass es *sein* Ding ist. Es ist dasselbe Echtheitsproblem, das der [digitale EU-Produktpass](/blog/eu-digital-product-passport-2026/) von der Regulierungsseite umkreist, nur gelöst auf der Ebene des einzelnen Objekts.

Ich habe das nicht gebaut, weil tausend Nutzer danach gefragt hätten. Ich habe es gebaut, weil ich aus Neugier ein paar seltsame Tags aus dem Internet gekauft, herausgefunden habe, wie sie funktionieren, und dann keine einzige Seite des Datenblatts unbeachtet lassen konnte. So fangen die guten Funktionen meistens an.

## Das Fazit zu NTAG 424 DNA Tags

NTAG 424 DNA Tags sind das Nächste, was NFC an ein manipulationssicheres Siegel zu bieten hat. Sie können niemanden davon abhalten, ein Produkt zu kopieren, aber sie machen den *Echtheitsbeweis* des Produkts unfälschbar, denn dieser Beweis ist eine frische kryptografische Signatur, die nur der echte Chip erzeugen kann.

NFC.cool Tools liest sie jetzt, verifiziert den Chip, den Tap und das Manipulationssiegel kostenlos und gibt dir den ganzen Chip zum Konfigurieren in die Hand - jeden Schlüssel, die Rechte jeder Datei, seine systemnächsten Einstellungen, sogar LRP -, damit du deine eigenen direkt vom Handy aus einrichten kannst. Wenn du dich je gefragt hast, wie ein Tap echt von falsch unterscheiden kann, hol sie dir auf [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-de&mt=8) oder [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-de), bestell dir ein paar [dieser Tags](/affiliate-links/) für ein paar Euro und tippe selbst einen an. Es lohnt sich, in diesen Kaninchenbau abzutauchen.
