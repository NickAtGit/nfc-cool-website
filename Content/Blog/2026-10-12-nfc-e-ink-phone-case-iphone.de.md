---
id: "e-ink-phone-case-2026-10"
title: "Ich habe meine E-Ink-Handyhülle gehackt, damit mein iPhone darauf schreiben kann"
date: "2026-10-12"
tags: ["announcements", "iphone", "nfc-tags"]
summary: "Ich besitze eine dieser NFC-Handyhüllen mit E-Ink-Display ohne Akku, und die mitgelieferte App hat mir nicht gefallen. Also habe ich herausgefunden, wie die Hülle kommuniziert. NFC.cool Tools 7.2.0 bringt jetzt Fotos, QR-Codes, deinen nächsten Termin, die Termine des Tages und deine Erinnerungen auf Hüllen, zu denen die App DeerPhoneCase, KAZAVA, Novixand oder TYOHINN gehört. Seit Version 7.3.0 klappt das auch mit den größeren Hüllen, zu denen die App AI Cast Assistant gehört."
image: "/assets/images/Blog/nfc-e-ink-phone-case-iphone.webp"
imageAlt: "Ein iPhone in einer schwarzen Hülle mit E-Ink-Display auf der Rückseite, das eine rot-gelbe Sonne über schwarzen Hügeln zeigt, daneben ein zweites iPhone, das dasselbe Bild per NFC überträgt"
author: "Nicolo Stanciu"
metaTitle: "E-Ink-Handyhülle mit NFC am iPhone: Fotos, Kalender, QR-Codes"
metaDescription: "Bring Fotos, QR-Codes, Termine und Erinnerungen vom iPhone auf eine NFC-Handyhülle mit E-Ink-Display ohne Akku. Für Hüllen mit DeerPhoneCase, KAZAVA und AI Cast Assistant."
ogTitle: "Wie ich meine E-Ink-Handyhülle fürs iPhone gehackt habe"
ogDescription: "Wie ich das Protokoll einer NFC-Handyhülle mit E-Ink-Display ohne Akku entschlüsselt habe und was NFC.cool jetzt auf ihr Display bringt."
---

> **Nachtrag, Oktober 2026:** NFC.cool Tools 7.3.0 bringt Bilder jetzt auch auf die größeren Hüllen, zu denen die App **AI Cast Assistant** gehört, und hat zwei neue Motive dabei: **Editor** und **KI-Playground**. Wie wir diese zweite Hülle zum Laufen gebracht haben, steht weiter unten.

Das Display flackerte.

Eigentlich eine Kleinigkeit. E-Ink-Displays machen das bei jedem Neuaufbau: Sie blitzen kurz durch alle Farben, bevor das neue Bild stehen bleibt. Aber dieses Flackern kam von Code, den ich selbst geschrieben hatte, gesendet von meinem iPhone in die Rückseite einer Handyhülle, die keinen Akku hat. Ein paar Sekunden später war das ganze Display rot, ein gleichmäßiges, leicht papierartiges Rot. Sonst nichts. Einfach rot.

Ich habe über die Jahre viele NFC-Funktionen gebaut, und dieses schlichte rote Rechteck gehört zu meinen liebsten Momenten überhaupt.

---

## Ein Display ohne Akku

<figure class="phone-figure" data-layout="float" data-device="einkcase">
<ol>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-1-photo-480w.webp" alt="Die Rückseite eines iPhones in einer orangen NFC-E-Ink-Hülle, das Display zeigt einen Golden Retriever in vier Farben"><p><strong>Ein Foto.</strong> In Schwarz, Weiß, Rot und Gelb, ganz ohne Akku in der Hülle.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-2-qr-480w.webp" alt="Das E-Ink-Display der Hülle mit einem QR-Code für nfc.cool"><p><strong>Ein QR-Code.</strong> Jeder kann ihn von der Rückseite deines Handys scannen.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-3-event-480w.webp" alt="Das E-Ink-Display der Hülle auf Gelb: Next, Dinner with Mia, Mi., 14. Oktober, 19:30 bis 21:30 Uhr, Trattoria Roma"><p><strong>Dein nächster Termin.</strong> Eine Momentaufnahme aus deinem Kalender.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-4-today-480w.webp" alt="Das E-Ink-Display der Hülle mit Mittwoch, 14. Oktober: Gym, Team stand-up, Lunch with Alex, Dentist, Dinner with Mia"><p><strong>Die Termine von heute.</strong> Der ganze Tag, bis du das nächste Motiv aufspielst.</p></li>
</ol>
</figure>

Falls du so eine Hülle noch nie gesehen hast: Sie sieht aus wie eine ganz normale Handyhülle, nur dass ein großer Teil der Rückseite ein E-Ink-Display ist, also dieselbe Art Bildschirm, die auch in E-Readern steckt. Meine zeichnet mit vier Farben: Schwarz, Weiß, Rot und Gelb.

Einen Akku gibt es nicht, einen Ladeanschluss auch nicht. Die Hülle bezieht ihren Strom aus dem NFC-Feld deines Handys, demselben Feld, das auch einen NFC-Sticker aufweckt, wenn du ihn scannst. Weil dein Handy direkt in ihr steckt, ist die Hülle immer in Reichweite dieses Felds. Sobald eine App sie darum bittet, versorgt das Feld einen kleinen Chip und einen Mikrocontroller mit Energie, und die bauen das Display neu auf. Steht das Bild erst einmal, braucht E-Ink überhaupt keinen Strom mehr, um es zu halten. Es bleibt einfach da, auch wenn der Handyakku leer ist oder die Hülle in der Schublade liegt.

Ich stelle mir das wie eine Zaubertafel aus Kindertagen vor, die nur dein Handy löschen und neu bemalen kann. Bis dein Handy es ihr sagt, ändert sich nichts.

Diese Hüllen werden unter vielen Namen verkauft, und fast jede Marke hat ihre eigene App. Zu meiner gehörte eine namens **DeerPhoneCase**. Zu den anderen komme ich weiter unten.

---

## Warum mir die offizielle App nicht gereicht hat

Ich habe einen ganzen Haufen der Hersteller-Apps mit meiner Hülle ausprobiert, und viele davon funktionieren. Aber alle fühlen sich richtig schlecht an. Es sind keine nativen iPhone-Apps, für das meiste musst du dich erst anmelden, und am Ende wollen sie eigentlich nur ein Bild anzeigen.

Als ich mir das Display auf der Rückseite meines Handys angesehen habe, sah ich keinen Bilderrahmen. Ich sah ein kleines Display, das immer an ist und keinen Akku kostet. Der perfekte Platz für meinen nächsten Termin, die Termine des Tages oder einen QR-Code, den jemand direkt von der Rückseite meines Handys scannen kann. Nichts davon konnte die offizielle App, und ich entwickle eine App, bei der sich alles um NFC dreht. Also habe ich beschlossen, NFC.cool selbst beizubringen, mit der Hülle zu sprechen.

---

## Der Hülle auf den Zahn gefühlt

Das habe ich zusammen mit Claude gemacht, dem KI-Modell von Anthropic, das sich beim Durchforsten von dekompiliertem Code als erstaunlich geduldiger Partner herausgestellt hat.

Die erste Idee lag auf der Hand: nachsehen, wie die offizielle iPhone-App mit der Hülle spricht. Das führte ins Leere. Apps aus dem App Store sind verschlüsselt, da gab es nichts Brauchbares zu lesen.

Bei der Android-Version sah das ganz anders aus. Die Hülle ist ein White-Label-Produkt, deshalb gibt es die App desselben Herstellers unter eigenem Namen auch bei Google Play, und Android-Apps lassen sich dekompilieren. Wir haben sie auseinandergenommen, und aus diesem Code und dem, was wir online über den Chip im Inneren fanden (ein NFC-Chip von Fudan mit einem Mikrocontroller dahinter), ergab sich das komplette Zwiegespräch zwischen Handy und Hülle:

1. Handy und Hülle führen zuerst einen kurzen Login-Handshake durch, damit die Hülle weiß, dass eine echte App mit ihr spricht.
2. Danach ist jeder Befehl verschlüsselt.
3. Das Bild wird in 139 Paketen mit rohen Pixeldaten übertragen. Jedes Pixel belegt zwei Bit, und das reicht genau für vier Farben.
4. Das Handy weist die Hülle an, das Display neu aufzubauen, und fragt dann jede Sekunde nach, ob sie fertig ist.

Mein erster Test schrieb nichts Raffiniertes, nur eine einzige Farbe über das ganze Display. Das war das rote Rechteck.

---

## Die 20-Sekunden-Hürde

Dann habe ich es mit echten Bildern versucht, und die kamen kaputt an. Streifen quer übers Display, falsche Farben, ein halbes Foto.

Der Neuaufbau dauert etwa 18 Sekunden, und die Verbindung brach jedes Mal ziemlich genau bei 20 Sekunden ab. Claude war überzeugt, dass iOS jede NFC-Sitzung nach 20 Sekunden einfach beendet und wir daran nichts ändern können. Das habe ich nicht geglaubt, denn die offizielle App hat es auf genau demselben iPhone geschafft.

Also habe ich mein iPhone an den Mac angeschlossen und das Systemprotokoll mitgeschnitten, während die offizielle App ein Bild übertrug. Darin zeigte sich der Trick: iOS begrenzt jede einzelne *Verbindung* zu einem Tag auf etwa 20 Sekunden, nicht die ganze Sitzung. Direkt nachdem die offizielle App das Bild gesendet hat, trennt sie die Verbindung, baut sie etwa eine Zehntelsekunde später wieder auf und lässt die Hülle das Bild dann über diese frische Verbindung zeichnen, mit vollen 20 Sekunden Luft.

Seit NFC.cool es genauso macht, kommen die Bilder sauber an. Ich gebe zu: Dass ich da recht hatte, hat mich schon ein bisschen gefreut.

---

## Eine größere Hülle, alles wieder von vorn

Mein Freund Alex hat eine andere dieser Hüllen. Sie ist fürs iPhone 17 Pro Max gemacht, zu ihr gehört eine App namens **AI Cast Assistant**, und ihr Display hat mehr als viermal so viele Pixel wie meins.

Als er NFC.cool damit ausprobiert hat, zeigte die App einen Fehler an. Sie hat nicht einmal versucht, etwas zu zeichnen.

Ich konnte mir die Hülle auch nicht einfach ausleihen und zu Hause daran tüfteln. Mit meinem 15 Pro Max in einer Hülle fürs 17 Pro Max spielte alles verrückt. Die Antenne der Hülle scheint genau auf das Handy abgestimmt zu sein, für das sie gebaut ist. Alles Weitere lief deshalb mit Alex' Hülle an Alex' Handy.

Diesmal war die Android-App keine große Hilfe. Der Code, den wir aus ihr herausgeholt haben, spricht mit dieser Hülle auf eine Art, die ein iPhone nicht nutzen darf. Ihn nachzubauen brachte uns also nichts.

Also haben wir einen Sniffer gebaut: eine kleine Android-App, die sich als Hülle ausgibt. Du hältst das iPhone an das Android-Handy, öffnest AI Cast Assistant, und das iPhone schickt sein Bild ganz arglos an etwas, das es für eine Handyhülle hält, während die Android-App jedes einzelne Byte mitschreibt.

Dieser Mitschnitt hielt zwei Überraschungen bereit:

1. Die offizielle App komprimiert das Bild, bevor sie es sendet. Wir hatten es unkomprimiert probiert, und die Hülle hat jedes einzelne Paket mit OK bestätigt und dann nichts gezeichnet.
2. Wenn das Handy fragt, ob die Hülle fertig ist, antwortet sie einfach nicht, bis der Neuaufbau abgeschlossen ist, also etwa 21 Sekunden später. Weil sie mit der Antwort wartet, bleibt die Verbindung bestehen, und diese Hülle stößt gar nicht erst an die 20-Sekunden-Hürde.

Als NFC.cool beides konnte, war das allererste Bild, das wir geschickt haben, ein Foto von Alex' Hund.

---

## Was NFC.cool auf deine Hülle bringt

Die Funktion steckt in **NFC.cool Tools** unter NFC-Apps und heißt **E-Ink-Hülle**. Du wählst ein Motiv, siehst in einer Vorschau genau, wie die Hülle es darstellen wird, und tippst auf **Auf Hülle übertragen**. Dein iPhone steckt ja schon in der Hülle, du musst also nichts ausrichten: Das NFC-Fenster öffnet sich, die Hülle baut das Display neu auf, und sobald sie fertig ist, schließt sich das Fenster wieder.

- **Foto**: ein beliebiges Bild aus deiner Mediathek, passend aufs Display zugeschnitten. Dieses Motiv ist kostenlos. Die App rechnet dein Foto in die vier Farben um, mit Farbverstärkung (Standard, Kräftig oder Max.) und einer Option für Schwarz-Weiß.
- **Freisteller**: holt die Person, das Haustier oder den Gegenstand aus einem Foto heraus und setzt das Ergebnis auf einen Hintergrund in einer der vier Farben.
- **Editor**: Du startest mit einer leeren Fläche oder einem Foto und fügst dann Text, Emoji und weitere Fotos hinzu oder zeichnest mit Stift, Marker und Farbeimer. Dein Entwurf bleibt erhalten, du kannst also später zurückkommen und ihn ändern.
- **KI-Playground**: Du wählst ein Foto, lässt es von Apple Intelligence neu gestalten und bringst das Ergebnis dann auf die Hülle. Dieses Motiv taucht nur auf iPhones mit Apple Intelligence auf.
- **QR-Code**: jeder QR-Code, den du in NFC.cool gespeichert hast, in seinem eigenen Design, oder einer, den du selbst eingibst. Du kannst ihn invertieren, und die App warnt dich, wenn der Text so lang ist, dass der Code auf dem kleinen Display nicht mehr gut lesbar wäre.
- **Nächster Termin** oder ein **ausgewählter Termin** aus deinem Kalender.
- **Heutige Termine**: alles, was heute in deinem Kalender steht.
- **Erinnerungen**: die offenen Erinnerungen aus einer deiner Listen, in drei Schriftgrößen.

Die Kalender- und Erinnerungsmotive sind Momentaufnahmen. Die Hülle zeigt, was beim Übertragen aktuell war, bis du das nächste Motiv aufspielst. Ohne dein Handy kann sie sich nicht selbst aktualisieren, und das ist der Preis dafür, dass sie nie ein Ladegerät braucht.

<figure class="phone-figure" data-layout="stage">
<figcaption>Motive für die Hülle</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/1-designs-440w.webp" alt="Der Bildschirm E-ink case in NFC.cool Tools mit den Motiven Photo, QR code und Calendar and Reminders"><p><strong>E-ink case.</strong> Unter NFC Apps. Motiv wählen, dann auf Put on case tippen.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/2-photo-440w.webp" alt="Das Motiv Photo: ein Sonnenuntergang über Hügeln in den vier Farben der Hülle, mit Crop und Helligkeitsregler"><p><strong>Foto.</strong> Jedes Bild, umgesetzt in die vier Farben der Hülle.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/3-qr-code-440w.webp" alt="Das Motiv QR code mit einem gespeicherten QR-Code in den Farben der Hülle"><p><strong>QR-Code.</strong> Ein Code, den du in NFC.cool gespeichert hast, oder einer, den du eintippst.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/4-agenda-440w.webp" alt="Das Motiv Today's agenda für Donnerstag, den 15. Oktober, mit fünf Terminen von 9:00 bis 19:00 Uhr und Put on case"><p><strong>Heutige Termine.</strong> Dein Kalender für den Tag, als Momentaufnahme auf der Rückseite des Handys.</p></li>
</ol>
</figure>

---

## Ein cooler Hack, mit einem Haken

Eins solltest du wissen, bevor du dir so eine Hülle holst. Für dein iPhone ist sie nicht nur ein Display. Sie sieht auch aus wie ein NFC-Tag, und du kannst sie auch genauso beschreiben.

Klingt praktisch, bis du es ausprobierst. Sagen wir, du schreibst einen Link auf die Hülle. Die Hülle sitzt direkt auf der NFC-Antenne deines Handys, also findet das Tag-Lesen im Hintergrund diesen Link immer und immer wieder und zeigt dir ständig die Mitteilung dazu an. Als hättest du dir einen Zettel an die Stirn geklebt, und dein Handy liest ihn dir pausenlos vor.

Andersherum klappt es genauso wenig. Der Chip der Hülle liegt auf der NFC-Antenne des Handys, und wenn du einen anderen Tag an die Rückseite hältst, erkennt dein iPhone ihn nicht. Es sieht nur die Hülle.

Ich habe aus Versehen öfter etwas auf meine eigene Hülle geschrieben, als ich zugeben möchte. Zum Glück ist das schnell behoben: NFC.cool kann die Hülle wieder formatieren, und dann ist Ruhe.

Nichts davon ist ein Grund, auf diese Hüllen zu verzichten. Sie sind ein kleiner Hack, aber ein cooler. Du solltest nur wissen, dass sich ein NFC-Display auf der Rückseite deines Handys und alles andere, was du mit NFC machst, ein bisschen in die Quere kommen.

---

## Gut zu wissen

**Vorerst nur auf dem iPhone.** Die Funktion gibt es in der iPhone-App. Die Android-App hat sie noch nicht.

**Welche Hüllen funktionieren.** Die meisten dieser Hüllen stammen von einem einzigen Entwickler, der für fast jede Marke eine eigene App veröffentlicht. Ich habe alle, die ich finden konnte, mit meiner Hülle ausprobiert:

- **DeerPhoneCase**, **KAZAVA**, **Novixand** und **TYOHINN** funktionieren mit meiner Hülle, und NFC.cool funktioniert mit ihr auch. Gehört zu deiner Hülle eine dieser Apps, sollte NFC.cool damit funktionieren.
- **Bestie e-INK** und **KINGZER** funktionieren mit meiner nicht. Das Bild kommt per NFC problemlos an, aber wenn sich das Display neu aufbauen sollte, passiert nichts.
- **SpaceInk+** von einem anderen Entwickler funktioniert mit meiner Hülle gar nicht. Die App meldet nur „device channel information mismatch“.
- **AI Cast Assistant** gehört zu einer anderen, größeren Hülle, und seit 7.3.0 funktioniert NFC.cool auch mit ihr. Ausprobieren konnte ich bisher nur die von Alex, also die fürs iPhone 17 Pro Max.

Das heißt nicht, dass NFC.cool mit Hüllen für Bestie e-INK, KINGZER oder SpaceInk+ nicht klarkommt. Das sind vielleicht einfach etwas andere Hüllen als meine, und testen kann ich sie nicht. Wenn du eine hast, [sag mir bitte Bescheid](/contact/), ob NFC.cool damit funktioniert oder nicht. Braucht deine eine andere App, sagt dir NFC.cool, dass sie noch nicht unterstützt wird, und bietet dir die Taste **Hüllendaten senden** an. Damit gehen die technischen Daten des Chips an mich, nichts, was dich oder deine Hülle identifiziert. So sehe ich, welche Hüllen die Leute tatsächlich haben, und kann sie nach und nach unterstützen.

**Wo du eine bekommst.** Bei Amazon laufen diese Hüllen unter vielen Markennamen, manche davon ziemlich kryptisch, aber dahinter stecken dieselben Hüllen. [Hier ist eine Suche danach bei Amazon](https://link.amazon/B0hUxLZTR) (Affiliate-Link). Auf der Innenseite meiner Hülle steht DIY, und manche Angebote haben DIY im Titel, danach kannst du also gut Ausschau halten. Nennt ein Angebot die App, mit der die Hülle arbeitet, achte auf DeerPhoneCase, KAZAVA, Novixand, TYOHINN oder AI Cast Assistant. Und nimm die Hülle, die genau für dein iPhone-Modell gemacht ist: Ihre Antenne ist auf dieses Handy abgestimmt, und mein 15 Pro Max kam mit Alex' Hülle fürs 17 Pro Max überhaupt nicht klar.

---

## Fazit

Falls bei dir so eine Hülle herumliegt, die immer noch dasselbe Bild zeigt wie am ersten Tag, gib ihr etwas Sinnvolleres zu tun. NFC.cool Tools gibt es im [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-e-ink-phone-case-iphone-de&mt=8).

Und falls du noch nie gesehen hast, wie sich ein Bild, das du selbst geschickt hast, flackernd auf einem E-Ink-Display aufbaut: Ich kann es nur empfehlen. Das sind ein paar sehr befriedigende Sekunden. Bisher war jeder, dem ich die Hülle gezeigt habe, positiv überrascht.
