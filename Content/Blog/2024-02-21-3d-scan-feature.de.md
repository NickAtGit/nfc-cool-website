---
id: nfc-blog-025
title: "3D-Scan auf dem iPhone: was Photogrammetrie und LiDAR in der Hosentasche leisten"
date: 2024-02-21
tags: ["guides", "iphone"]
summary: "Mit Apples Object Capture API macht NFC.cool Tools aus deinem iPhone einen 3D-Scanner. Photogrammetrie und LiDAR liefern Modelle, die du als .stl, .obj oder .usdz exportieren kannst, fertig für 3D-Druck, AR oder jede andere Modellierungs-Pipeline."
metaTitle: "3D-Scan auf dem iPhone mit NFC.cool Tools"
metaDescription: "So funktioniert der 3D-Scanner in NFC.cool Tools: Photogrammetrie, LiDAR und Apples Object Capture API. Export als .stl, .obj, .ply oder .usdz für 3D-Druck und AR."
ogTitle: "3D-Scan auf dem iPhone: was Photogrammetrie und LiDAR in der Hosentasche leisten"
ogDescription: "So funktioniert der 3D-Scanner in NFC.cool Tools: Photogrammetrie, LiDAR und Export als .stl, .obj, .usdz."
image: "/assets/images/Blog/3d-scan-feature.webp"
---
Vor ein paar Jahren hieß 3D-Scannen noch: ein eigenes Gerät so groß wie eine Mikrowelle, dazu Software, die mehr kostete als die Hardware. Heute reicht ein iPhone mit LiDAR-Sensor und Apples Object Capture API, um aus einer Handvoll Fotos ein brauchbares 3D-Modell zu bekommen.

Die **3D-Scan**-Funktion in NFC.cool Tools packt genau diesen Ablauf in die Hosentasche.

---

## Was dabei eigentlich passiert

Zwei Techniken greifen ineinander:

- **Photogrammetrie** - Die App macht Dutzende Fotos vom Objekt aus verschiedenen Winkeln. Eine Photogrammetrie-Engine (auf iOS Apples Object Capture API) sucht in den Fotos nach übereinstimmenden Merkmalen und trianguliert daraus ein 3D-Mesh.
- **LiDAR** - Auf iPhones mit LiDAR-Sensor (die Pro-Modelle ab dem iPhone 12) bekommt jedes Bild zusätzlich Tiefenwerte vom Sensor. Das macht das Mesh in zwei Punkten deutlich besser: Der Maßstab stimmt (das Modell hat die echte Größe), und Flächen ohne auffällige Merkmale (eine glatte weiße Wand, eine glänzende Rundung) bekommen brauchbare Geometrie, wo Photogrammetrie allein nicht weiterkommt.

Über beides musst du dir keine Gedanken machen. Die App führt dich durch die Aufnahme, danach läuft die Rekonstruktion direkt auf dem Gerät.

---

## So gelingt ein guter Scan

Ein paar Regeln aus der Praxis:

- **Geh langsam um das Objekt herum.** Die App erwartet eine möglichst lückenlose Abdeckung. Also nicht von einer Seite direkt zur gegenüberliegenden springen, sondern wirklich einmal drumherum laufen.
- **Behalte das Objekt im Bild.** Ein gleichmäßiger Rand um das Objekt ist in Ordnung; wird es am Bildrand abgeschnitten, gehen Daten verloren.
- **Gleichmäßiges Licht.** Harte Schatten bringen die Photogrammetrie durcheinander. Diffuses Licht (unter freiem Himmel, eine Softbox, Tageslicht drinnen) liefert das sauberste Mesh.
- **Strukturierte Objekte lassen sich besser scannen als glatte, einfarbige.** Eine gemusterte Tasse wird fast perfekt. Eine polierte Metallkugel ist richtig schwierig. LiDAR hilft da zwar, rettet es aber nicht ganz.
- **Bleib bei jedem Winkel kurz stehen.** Bewegungsunschärfe frisst Details.

Der ganze Scan dauert 20-40 Sekunden, in denen du um das Objekt herumgehst, danach noch einmal 30-60 Sekunden für die Verarbeitung.

---

## Exportformate

NFC.cool Tools exportiert in die Formate, die du hinterher tatsächlich brauchst:

- **.stl** - Für 3D-Drucker. Slicer wie Bambu Studio, Cura oder PrusaSlicer nehmen es alle.
- **.obj** - Das universelle 3D-Format. Lässt sich in Blender, Cinema 4D, Unity, Unreal und praktisch jedes andere Modellierungstool importieren.
- **.ply** - Mesh-Format, das die Vertex-Farben behält. Praktisch, wenn dir die Textur wichtiger ist als UV-gemappte Materialien.
- **.usdz** - Apples AR-Format. Direkt in Quick Look oder AR Quick Look öffnen oder in RealityKit weiterverwenden.
- **.abc** (Alembic) - Für Animations-Pipelines.
- **.usd** - Universal Scene Description, wird von den meisten aktuellen DCC-Tools unterstützt.

Das Modell bleibt dasselbe. Das Format legt nur fest, welches Tool es hinterher öffnen kann.

---

## Was du mit dem Ergebnis anfangen kannst

Die schönsten Anwendungen, die ich bei Nutzern gesehen habe:

- **Ein Einzelstück als Replik in 3D drucken.** Gefundenes Objekt scannen, slicen, drucken.
- **Einen realen Gegenstand dokumentieren.** Nachlässe, Museumskataloge, „wie sah Omas Vase noch mal genau aus“.
- **In AR teilen.** Schick die .usdz jemandem mit iPhone: ein Fingertipp, und das Objekt schwebt per AR Quick Look in seinem Wohnzimmer.
- **In eine Game-Engine übernehmen.** Ein echtes Requisit in einer Unity-Szene, in 90 Sekunden modelliert, ganz ohne 3D-Artist.

---

## Wo es funktioniert und wo nicht

Photogrammetrie plus LiDAR ist stark bei:
- Festen, undurchsichtigen Objekten
- Strukturierten oder gemusterten Oberflächen
- Unbewegten Motiven (allem, was während des Scans stillhält)

Schwer tut es sich mit:
- Durchsichtigen oder lichtbrechenden Objekten (Glas, Wasser, Linsen)
- Stark spiegelndem Metall
- Sehr dünnen Strukturen (Kabeln, Drähten, Haaren)
- Allem, was sich bewegt

Bei den Dingen, die es gut kann, ist das Ergebnis wirklich brauchbar, kein Spielzeug. Beim Rest musst du damit rechnen, das Mesh in Blender nachzuarbeiten, oder du nimmst die Grenzen einfach hin.

3D-Scan ist Teil von [NFC.cool Tools für iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-3d-scan-feature-de&mt=8). Apples Object Capture braucht einen LiDAR-Sensor und läuft deshalb auf den Pro-iPhones (ab iPhone 12 Pro) und auf den iPad-Pro-Modellen ab 2020.
