---
id: nfc-blog-025
title: "Le scan 3D sur iPhone : ce que la photogrammétrie et le LiDAR peuvent faire dans votre poche"
date: 2024-02-21
tags: ["guides", "iphone"]
summary: "NFC.cool Tools transforme votre iPhone en scanner 3D grâce à l'API Object Capture d'Apple. La photogrammétrie associée au LiDAR produit des modèles que vous pouvez exporter en .stl, .obj, .usdz - prêts pour l'impression 3D, la réalité augmentée, ou n'importe quel pipeline de modélisation."
metaTitle: "Le scan 3D sur iPhone avec NFC.cool Tools"
metaDescription: "Comment fonctionne le scanner 3D de NFC.cool Tools - photogrammétrie, LiDAR et API Object Capture d'Apple. Exportez en .stl, .obj, .ply, .usdz pour l'impression 3D et la réalité augmentée."
ogTitle: "Le scan 3D sur iPhone : ce que la photogrammétrie et le LiDAR peuvent faire dans votre poche"
ogDescription: "Comment fonctionne le scanner 3D de NFC.cool Tools - photogrammétrie, LiDAR, et export en .stl, .obj, .usdz."
image: "/assets/images/Blog/3d-scan-feature.webp"
---
Il y a quelques années, le scan 3D impliquait un scanner dédié de la taille d'un four à micro-ondes, plus un logiciel qui coûtait plus cher que le matériel. Aujourd'hui, un iPhone avec un capteur LiDAR et l'API Object Capture d'Apple peut produire un modèle 3D exploitable à partir d'une poignée de photos.

La fonctionnalité **Scan 3D** de NFC.cool Tools enveloppe tout ce pipeline dans un flux de travail qui tient dans la poche.

---

## Ce qui se passe vraiment

Deux technologies travaillent ensemble :

- **La photogrammétrie** - L'app capture des dizaines de photos de l'objet sous différents angles. Un moteur de photogrammétrie (l'API Object Capture d'Apple sur iOS) repère les points communs entre les photos et les triangule pour en faire un maillage 3D.
- **Le LiDAR** - Sur les iPhone équipés d'un capteur LiDAR (les modèles Pro à partir de l'iPhone 12), chaque image est enrichie de mesures de profondeur prises par le capteur. Cela améliore nettement le maillage de deux façons : l'échelle est exacte (le modèle est à la taille réelle), et les surfaces sans caractéristiques visuelles évidentes (un mur blanc uni, une courbe brillante) obtiennent une géométrie exploitable là où la photogrammétrie seule échouerait.

Vous n'avez à penser à aucune de ces deux étapes - l'app vous guide pendant la capture, puis lance la reconstruction sur l'appareil.

---

## Comment réussir un bon scan

Quelques règles pratiques :

- **Déplacez-vous lentement autour de l'objet.** L'app attend une couverture à peu près continue. Ne sautez pas d'un côté au côté opposé - faites le tour.
- **Gardez l'objet dans le cadre.** Une marge régulière autour de l'objet ne pose pas de problème ; le couper sur les bords fait perdre des données.
- **Un éclairage uniforme.** Les ombres dures perturbent l'étape de photogrammétrie. Une lumière diffuse (ciel dégagé, softbox, lumière du jour en intérieur) donne le maillage le plus propre.
- **Les objets texturés se scannent mieux que les objets lisses.** Un mug à motifs se scanne presque parfaitement. Une sphère en métal poli, c'est vraiment difficile. Le LiDAR aide dans ce dernier cas mais ne le sauvera pas complètement.
- **Restez immobile un instant à chaque angle.** Le flou de bougé mange les détails.

Le scan complet prend 20-40 secondes de marche autour de l'objet, puis 30-60 secondes de traitement supplémentaires.

---

## Les formats d'export

NFC.cool Tools exporte vers les formats dont vous avez réellement besoin en aval :

- **.stl** - Les imprimantes 3D. Les slicers comme Bambu Studio, Cura, PrusaSlicer l'acceptent tous.
- **.obj** - Le format 3D universel. S'importe dans Blender, Cinema 4D, Unity, Unreal, en gros tous les outils de modélisation.
- **.ply** - Un format de maillage qui préserve les couleurs des sommets - pratique quand la texture compte plus que les matériaux avec mapping UV.
- **.usdz** - Le format de réalité augmentée d'Apple. À glisser dans Quick Look, AR Quick Look, ou à utiliser dans RealityKit.
- **.abc** (Alembic) - Les pipelines d'animation.
- **.usd** - Universal Scene Description, pris en charge par la plupart des outils DCC modernes.

Le modèle est le même. Le format décide simplement quel outil en aval peut l'exploiter.

---

## Ce que vous pouvez faire du résultat

Les usages les plus amusants que j'ai vus chez les utilisateurs :

- **Imprimer en 3D une réplique unique.** Scannez un objet trouvé, tranchez-le, imprimez.
- **Documenter un objet réel.** Inventaire de succession, catalogage de musée, « à quoi ressemble vraiment le vase de mamie ».
- **Partager en réalité augmentée.** Envoyez le .usdz à quelqu'un sur iPhone - il le touche et voit l'objet flotter dans son salon via AR Quick Look.
- **L'intégrer dans un moteur de jeu.** Un accessoire du monde réel dans une scène Unity, modélisé en 90 secondes sans infographiste 3D.

---

## Quand ça marche, et quand ça ne marche pas

La photogrammétrie associée au LiDAR est forte sur :
- Les objets solides et opaques
- Les surfaces texturées ou à motifs
- Les sujets statiques (tout ce qui ne bouge pas pendant le scan)

Elle peine sur :
- Les objets transparents ou réfractifs (verre, eau, lentille)
- Le métal très réfléchissant
- Les éléments très fins (câbles, fil, cheveux)
- Tout ce qui bouge

Pour ce qu'elle réussit, le résultat est vraiment utile - pas un gadget. Pour le reste, attendez-vous à nettoyer le maillage dans Blender ou à accepter les limites.

Le Scan 3D fait partie de [NFC.cool Tools pour iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-3d-scan-feature-fr&mt=8). L'Object Capture d'Apple a besoin d'un capteur LiDAR, il fonctionne donc sur les iPhone Pro (iPhone 12 Pro et plus récents) et les modèles d'iPad Pro (2020 et plus récents).
