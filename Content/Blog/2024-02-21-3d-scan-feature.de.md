---
id: nfc-blog-025
title: "3D-Scan auf dem iPhone: Was Photogrammetrie und LiDAR in der Hosentasche können"
date: 2024-02-21
tags: ["guides", "iphone"]
summary: "NFC.cool Tools macht dein iPhone mit Apples Object Capture API zum 3D-Scanner. Photogrammetrie plus LiDAR produziert Modelle, die du nach .stl, .obj, .usdz exportieren kannst - bereit für 3D-Druck, AR oder jede Modellierungs-Pipeline."
metaTitle: "3D-Scan auf dem iPhone mit NFC.cool Tools"
metaDescription: "Wie NFC.cool Tools' 3D-Scanner funktioniert - Photogrammetrie, LiDAR und Apples Object Capture API. Export nach .stl, .obj, .ply, .usdz für 3D-Druck und AR."
ogTitle: "3D-Scan auf dem iPhone: Was Photogrammetrie und LiDAR in der Hosentasche können"
ogDescription: "Wie NFC.cool Tools' 3D-Scanner funktioniert - Photogrammetrie, LiDAR und Export nach .stl, .obj, .usdz."
image: "/assets/images/Blog/3d-scan-feature.webp"
---
Vor ein paar Jahren bedeutete 3D-Scan einen dedizierten Scanner so groß wie eine Mikrowelle, plus Software, die mehr kostete als die Hardware. Heute kann ein iPhone mit LiDAR-Sensor und Apples Object Capture API ein brauchbares 3D-Modell aus einer Handvoll Fotos produzieren.

NFC.cool Tools' **3D-Scan**-Feature packt diese Pipeline in einen taschenfähigen Workflow.

---

## Was tatsächlich passiert

Zwei Technologien arbeiten zusammen:

- **Photogrammetrie** - Die App nimmt Dutzende Fotos des Objekts aus verschiedenen Winkeln auf. Eine Photogrammetrie-Engine (Apples Object Capture API auf iOS) findet übereinstimmende Features in den Fotos und trianguliert sie zu einem 3D-Mesh.
- **LiDAR** - Auf iPhones mit LiDAR-Sensor (Pro-Modelle ab iPhone 12) wird jedes Frame mit Tiefenmessungen vom Sensor angereichert. Das verbessert das Mesh in zwei Hinsichten deutlich: Maßstab ist akkurat (das Modell entspricht der realen Größe), und Oberflächen ohne offensichtliche visuelle Features (eine schlichte weiße Wand, eine glänzende Kurve) bekommen brauchbare Geometrie, wo Photogrammetrie allein scheitern würde.

Du musst über keinen der Schritte nachdenken - die App führt dich durch die Aufnahme, dann läuft die Rekonstruktion on-device.

---

## Wie du einen guten Scan aufnimmst

Ein paar praktische Regeln:

- **Bewege dich langsam um das Objekt.** Die App erwartet ungefähr kontinuierliche Abdeckung. Spring nicht von einer Seite zur Gegenseite - geh drumherum.
- **Halte das Objekt im Bild.** Ein konstanter Rand um das Objekt ist okay; an den Bildrändern abschneiden verliert Daten.
- **Gleichmäßiges Licht.** Harte Schatten verwirren die Photogrammetrie-Stufe. Diffuses Licht (offener Himmel, eine Softbox, Tageslicht drinnen) liefert das sauberste Mesh.
- **Texturierte Objekte scannen besser als featurelose.** Eine gemusterte Tasse scannt fast perfekt. Eine polierte Metallkugel ist echt schwer. LiDAR hilft bei letzterem, rettet es aber nicht komplett.
- **Bleib einen Moment an jedem Winkel stehen.** Bewegungsunschärfe frisst Detail.

Der gesamte Scan dauert 20-40 Sekunden Gehen, dann nochmal 30-60 Sekunden Verarbeitung.

---

## Export-Formate

NFC.cool Tools exportiert in die Formate, die du downstream tatsächlich brauchst:

- **.stl** - 3D-Drucker. Slicer wie Bambu Studio, Cura, PrusaSlicer akzeptieren es alle.
- **.obj** - Universelles 3D-Format. Importiert in Blender, Cinema 4D, Unity, Unreal, im Prinzip jedes Modellierungstool.
- **.ply** - Mesh-Format, das Vertex-Farben erhält - nützlich, wenn Textur wichtiger ist als UV-gemappte Materialien.
- **.usdz** - Apples AR-Format. Wirf es in Quick Look, AR Quick Look oder nutze es in RealityKit.
- **.abc** (Alembic) - Animations-Pipelines.
- **.usd** - Universal Scene Description, von den meisten modernen DCC-Tools unterstützt.

Das Modell ist dasselbe. Das Format entscheidet nur, welches downstream-Tool es konsumieren kann.

---

## Was du mit dem Ergebnis machen kannst

Die spannendsten Anwendungen, die wir von Nutzern gesehen haben:

- **3D-Druck einer Einzelstück-Replik.** Scanne ein gefundenes Objekt, slice, druck.
- **Dokumentation eines realen Assets.** Nachlassdokumentation, Museumskatalogisierung, "wie sieht Omas Vase eigentlich aus".
- **In AR teilen.** Sende die .usdz an jemanden auf einem iPhone - er tippt drauf und sieht das Objekt via AR Quick Look in seinem Wohnzimmer schweben.
- **In eine Game Engine droppen.** Ein realer Requisitengegenstand in einer Unity-Szene, in 90 Sekunden modelliert ohne 3D-Künstler.

---

## Wann es funktioniert und wann nicht

Photogrammetrie plus LiDAR ist stark bei:
- Soliden, opaken Objekten
- Texturierten oder gemusterten Oberflächen
- Statischen Motiven (allem, was sich während des Scans nicht bewegt)

Es tut sich schwer mit:
- Transparenten oder brechenden Objekten (Glas, Wasser, Linsen)
- Stark reflektierendem Metall
- Sehr dünnen Features (Kabeln, Drähten, Haaren)
- Allem, was sich bewegt

Für die Dinge, in denen es gut ist, ist das Ergebnis wirklich brauchbar - kein Spielzeug. Für den Rest erwarte, dass du das Mesh in Blender aufräumen musst, oder akzeptiere die Grenzen.

3D-Scan ist Teil von [NFC.cool Tools für iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-3d-scan-feature-de&mt=8). Photogrammetrie funktioniert auf jedem modernen iPhone; LiDAR-Anreicherung funktioniert auf Pro-Modellen.
