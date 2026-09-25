---
id: "nfc-alarm-2026-09"
title: "NFC-Wecker fürs iPhone: Erst die Tags scannen, dann ist Ruhe"
date: "2026-09-24"
tags: ["announcements", "iphone", "nfc-tags"]
summary: "Nach langen Programmiernächten hat morgens regelmäßig die Schlummertaste gewonnen. Also habe ich den NFC-Wecker in NFC.cool Tools eingebaut: einen iPhone-Wecker, der erst Ruhe gibt, wenn du eine Route aus NFC-Tags durch deine Wohnung abgelaufen bist. Hier erkläre ich, wie er funktioniert und wie ich die Stoppen-Taste austrickse, die Apple auf jeden Wecker setzt."
image: "/assets/images/Blog/nfc-alarm-clock.webp"
imageAlt: "Ein iPhone zeigt einen Scan-Ring bei 2 von 3 neben einer Kaffeemaschine mit NFC-Sticker, dahinter führt eine gepunktete Spur aus NFC-Tags an einem Regal im Flur vorbei zurück zum Bett"
author: "Nicolo Stanciu"
metaTitle: "NFC-Wecker fürs iPhone: Wecker per NFC-Tag ausschalten"
metaDescription: "Ein iPhone-Wecker, der erst verstummt, wenn du deine NFC-Tags der Reihe nach scannst. So habe ich ihn mit AlarmKit gebaut und die Stoppen-Taste ausgetrickst."
ogTitle: "Ein Wecker, den du nicht einfach wegdrücken kannst"
ogDescription: "Der NFC-Wecker gibt erst Ruhe, wenn du eine Route aus NFC-Tags durch deine Wohnung abgelaufen bist. So funktioniert das auf dem iPhone."
---
Als Indie-Entwickler lebt man in einem Rhythmus, der sich nicht um Bürozeiten schert. Am besten programmiere ich spätabends, wenn keine Nachrichten mehr reinkommen und es im Haus still ist, und ehe ich mich versehe, ist es zwei Uhr nachts. Der Wecker klingelt natürlich trotzdem zur gewohnten Zeit. Und ich drücke auf Schlummern. Dann noch mal. Und ein drittes Mal, bis der halbe Vormittag, den ich mir vorgenommen hatte, schon wieder weg ist.

Ich habe eine Weile überlegt, was ich eigentlich dagegen tun kann. Ein lauterer Wecker? Den würde ich mit der Zeit einfach überhören. Das Handy auf die andere Seite des Zimmers legen? Dann würde ich hinlaufen, auf Stoppen drücken und zurück ins Bett kriechen. Das Problem war nie, dass ich den Wecker nicht höre. Das Problem war, dass ihn auszuschalten nur einen Fingertipp kostete und null Nachdenken.

Dann kam mir die Idee: Ich baue den ganzen Tag an einer App für NFC-Tags. Warum nicht beides verbinden und mir jeden Morgen eine kleine Schnitzeljagd aus Tags auslegen, die ich ablaufen muss, bevor mich der Wecker in Ruhe lässt?

Das ist der **NFC-Wecker**, und er steckt ab sofort in NFC.cool Tools, vorerst fürs iPhone. Die Android-Version folgt bald.

---

## Vom Bett bis zur Kaffeemaschine

Meine Route hat drei Stationen. Der erste NFC-Tag liegt neben meinem Bett. Der zweite steht auf einem Regal im Flur. Der dritte klebt an der Kaffeemaschine.

Wenn der Wecker klingelt, muss ich alle drei scannen, und zwar genau in dieser Reihenfolge. Den Tag am Bett zu scannen ist leicht, der liegt ja direkt daneben. Aber dann muss ich aufstehen und in den Flur gehen, und wenn ich an der Kaffeemaschine ankomme, bin ich wach, stehe auf beiden Beinen und bin genau dort, wo mein Morgen anfängt. Wieder ins Bett zu gehen, käme mir dann albern vor. Da kann ich auch gleich auf den Knopf für einen Kaffee drücken.

Die Reihenfolge ist wichtig. Könnte man die Tags beliebig scannen, würden alle drei auf dem Nachttisch landen, und man wäre fertig, ohne sich zu bewegen. Deshalb wartet die App immer auf den nächsten Tag der Route, und wenn du den falschen hinhältst, sagt sie es dir: „Das ist nicht Flur“. Sobald der letzte Tag gescannt ist, gibt es ein bisschen Konfetti und ein „Guten Morgen“, und der Wecker hat für heute Feierabend. Morgen klingelt er wieder ganz normal.

Und ja, es funktioniert. Die Route bringt mich aus dem Bett, und das hat bisher noch kein Wecker geschafft.

---

## Die Stoppen-Taste, die ich nicht loswurde

Über diesen Teil habe ich am längsten nachgedacht. Der NFC-Wecker basiert auf **AlarmKit**, Apples Framework, mit dem Apps einen richtigen Wecker klingeln lassen können: einen, der auch im Stummmodus losgeht und den ganzen Sperrbildschirm einnimmt, so wie bei der Uhr-App. Genau das braucht eine Wecker-App, nur mit einem Haken: Jeder AlarmKit-Wecker bekommt vom System eine **Stoppen**-Taste. Eine App kann sie weder entfernen noch ausblenden oder anders gestalten.

Auf dem Papier hat ein Wecker, der darauf besteht, dass du zu deinen Tags läufst, also eine Taste, die ihn mit einem Fingertipp beendet. Nicht gerade ideal.

Mein Ausweg: Ein NFC-Wecker ist nicht ein einzelner Alarm, sondern eine ganze Kette davon. Hinter der eingestellten Uhrzeit plant die App weitere Alarme im Abstand von ein paar Minuten ein. Standardmäßig sind das 20 weitere, im Abstand von einer Minute, und du kannst zwischen 5, 10, 15 oder 20 Folgealarmen und einem Abstand von 1, 2, 3 oder 5 Minuten wählen. Wer auf dem Sperrbildschirm auf Stoppen drückt, bringt nur den Alarm zum Schweigen, der gerade klingelt. Eine Minute später geht der nächste los. Erst wenn du die ganze Route gescannt hast, fällt der Rest der Kette für diesen Morgen weg, und der Wecker selbst bleibt für den nächsten Morgen gestellt.

Stell dir die Stoppen-Taste am besten als Stummschalter vor, dem nach einer Minute der Saft ausgeht.

Neben Stoppen erlaubt AlarmKit einer App genau eine eigene Taste. Die meisten Wecker-Apps würden dort eine Schlummerfunktion unterbringen. Ich habe dort **Zum Beenden scannen** untergebracht: Die Taste öffnet die App direkt im Scan-Bildschirm. Schlummern gibt es auf dem Sperrbildschirm also gar nicht, und das ist Absicht.

Zwei kleinere Details, auf die ich gekommen bin, weil ich das Ganze an mir selbst getestet habe:

- Während du tatsächlich scannst, pausiert das Klingeln. Niemand will einen plärrenden Wecker in der Hand haben, während er das Handy an einen Tag hält. Gibst du auf halber Strecke auf, kommt der nächste Alarm aus der Kette trotzdem.
- Solange der Wecker klingelt, lässt dich die App ihn in der Weckerliste weder ausschalten noch löschen oder bearbeiten. Auf diese Schlupflöcher bin ich ganz ehrlich selbst gestoßen: um 7 Uhr morgens, todmüde und erstaunlich erfinderisch.

---

## Der Notausgang

Tags gehen verloren. Ein Sticker fällt von der Kaffeemaschine, ein Tag geht kaputt, oder du übernachtest woanders. Ein Wecker, den man nie ausschalten kann, wäre eine furchtbare Idee. Deshalb gibt es im Scan-Bildschirm einen **Not-Aus**, und der funktioniert immer, mit oder ohne Tags.

Allerdings musst du dafür diesen Satz Wort für Wort eintippen:

„Bitte hör auf, mir ist klar, dass ich alle meine Tags neu einrichten muss.“

Das ist Absicht. Der Ausweg sollte ungefähr so lange dauern wie der Weg über die Route, damit er nie die bequeme Lösung ist. Und er hat einen echten Preis: Der Not-Aus stoppt und löscht *alle* Wecker, danach darfst du also sämtliche Tags neu einrichten. Er ist für den Fall gedacht, dass wirklich etwas kaputt ist, und nicht für einen ganz normalen Dienstag, an dem das Bett besonders kuschelig ist. Ich habe ihn gebaut, damit er mir wehtut, und das tut er.

---

## Warum NFC und kein Foto vom Waschbecken

Es gibt Wecker-Apps, bei denen du dein Waschbecken fotografieren oder den Barcode auf deiner Zahnpasta scannen musst. Die funktionieren auch. Mir gefällt NFC dafür trotzdem besser, und das nicht nur, weil es im Namen meiner App steht.

Ein NFC-Tag ist für sich genommen stumm: ein winziger Chip mit einer ID, sonst nichts, der auf einem Regal liegt. Was mir an NFC.cool am meisten Spaß macht, ist, so einem Chip eine Bedeutung zu geben und aus einem Sticker für ein paar Cent etwas zu machen, das in deinem Alltag tatsächlich etwas bewirkt. Beim NFC-Wecker muss auf dem Tag nicht einmal etwas gespeichert sein. Die App erkennt jeden Tag an seiner Chip-ID und schreibt nichts darauf. Jeder Tag funktioniert, auch die Packung Ersatz-Sticker, die bei dir in der Schublade liegt. Und Licht braucht es keins: Ein Tag lässt sich im dunklen Flur scannen, wo eine Kamera schnell an ihre Grenzen kommt, und zielen musst du auch nicht.

Falls du noch keine Tags hast: In meinem [Einsteiger-Ratgeber zu NFC-Tags](/blog/nfc-tags-beginners-guide/) steht, welche du kaufen solltest.

---

## So richtest du ihn ein

Der NFC-Wecker braucht ein iPhone mit iOS 26 oder neuer, weil es AlarmKit erst dort gibt. Du findest ihn im NFC-Tab unter **NFC-Apps**. Leg einen Wecker an, wähl Uhrzeit und Wochentage aus und scanne dann die Tags, die du verwenden willst, in der Reihenfolge, in der du sie ablaufen möchtest. Jeder Tag kann einen Namen bekommen, damit du weißt, welcher als Nächstes dran ist. Verteil sie so, dass die Route dich wirklich aus dem Bett holt. Neben dem Bett ist ein guter Anfang, die Küche ein noch besseres Ziel.

Der NFC-Wecker ist kostenlos und steckt in [NFC.cool Tools im App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-alarm-clock-de&mt=8). Deine Kaffeemaschine wartet schon.
