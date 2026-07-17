---
id: nfc-blog-011
title: "OpenPrintTag : comment lire et écrire des bobines de filament 3D intelligentes avec votre téléphone"
date: 2026-03-29
tags: ["nfc-tags", "automation"]
summary: "OpenPrintTag est la norme ouverte pour les bobines de filament intelligentes. Découvrez comment ça fonctionne, quelles données sont stockées, et comment lire et écrire des tags NFC OpenPrintTag avec votre seul téléphone."
image: "/assets/images/Blog/openprinttag-read-write-nfc-spools-phone.webp"
imageAlt: "Bobine de filament 3D avec un tag NFC en cours de lecture par un téléphone"
metaTitle: "OpenPrintTag : lire et écrire des bobines de filament 3D intelligentes avec votre téléphone"
metaDescription: "Apprenez à utiliser OpenPrintTag pour gérer vos bobines de filament d'impression 3D avec le NFC. Lisez, écrivez et suivez les données de matériau depuis votre iPhone ou Android, sans app propriétaire."
ogTitle: "OpenPrintTag : des bobines de filament 3D intelligentes avec le NFC"
ogDescription: "Le guide complet pour lire et écrire des bobines NFC OpenPrintTag avec votre téléphone. Fonctionne avec n'importe quelle imprimante, n'importe quelle marque de filament."
---
Si vous imprimez en 3D, vous connaissez sans doute la situation : une étagère pleine de bobines à moitié entamées, aucune idée de la quantité de filament qui reste sur chacune, et cette bobine sans étiquette qui est peut-être du PETG ou peut-être du PLA, sans aucun moyen de le savoir sans une impression test. J'y suis passé moi aussi, et c'est le genre de petite contrariété récurrente que le NFC résout vraiment bien.

C'est exactement ce que fait OpenPrintTag. C'est une norme NFC open source créée par [Prusa Research](https://www.prusa3d.com) qui transforme n'importe quel tag NFC compatible en étiquette intelligente pour votre bobine de filament. Type de matériau, marque, couleur, poids restant : tout est stocké directement sur la bobine et lisible d'un simple geste avec votre téléphone.

Pas de cloud. Pas d'écosystème propriétaire. Aucune connexion internet requise. J'ai passé des années à développer NFC.cool, une app pour lire et écrire des tags NFC, et c'est exactement le genre de norme que j'aime voir - une qui met les données sur le tag et les laisse fonctionner partout. Voici comment ça marche, et comment je lis et écris des bobines OpenPrintTag avec rien d'autre qu'un téléphone.

---

## Qu'est-ce qu'OpenPrintTag ?

OpenPrintTag est un format de données universel et ouvert pour les matériaux d'impression 3D. Plutôt que chaque fabricant invente son propre système de bobine intelligente incompatible - exactement le chaos que j'ai vu se produire dans d'autres recoins du monde du NFC - OpenPrintTag définit une norme unique que tout le monde peut adopter, y compris les fabricants de filament, les fabricants d'imprimantes, les logiciels de tranchage et les apps comme NFC.cool.

Les principes clés, et les raisons pour lesquelles je pense que ça mérite l'attention :

- **Open source :** publié sous licence MIT, libre à implémenter, sans frais de licence
- **Hors ligne par conception :** toutes les données vivent sur le tag lui-même, aucun service cloud nécessaire
- **Réinscriptible :** mettez à jour le filament restant au fil de vos impressions, réutilisez les tags sur de nouvelles bobines
- **Universel :** fonctionne d'une marque et d'un écosystème à l'autre
- **Prend en charge à la fois le FFF (filament) et le SLA (résine)**

Plus de 22 entreprises et groupes ont manifesté leur intérêt, dont Prusament, Voron, Fillamentum, 3DXTech, SimplyPrint et PrintedSolid. La spécification complète est disponible sur [specs.openprinttag.org](https://specs.openprinttag.org).

---

## Quelles données un OpenPrintTag stocke-t-il ?

C'est la partie qui m'a convaincu. OpenPrintTag n'est pas qu'une étiquette avec un nom dessus. C'est un format de données correctement structuré, avec des champs pour presque tout ce que vous voudriez savoir sur une bobine, et la spécification a clairement été rédigée par des gens qui impriment vraiment.

**Identification du matériau :**
- Classe de matériau (filament ou résine)
- Type de matériau (PLA, PETG, ABS, TPU, ASA, PC, PA6 et plus de 30 autres)
- Nom du matériau (par ex. « PLA Galaxy Black »)
- Nom de la marque (par ex. « Prusament »)
- Propriétés du matériau : plus de 68 propriétés définies comme abrasif, conducteur, phosphorescent, apte au contact alimentaire, protégé contre les décharges électrostatiques (ESD), flexible et plus encore

**Suivi du poids et de la longueur :**
- Poids nominal (annoncé, par ex. 1000 g)
- Poids réel (mesuré pour cette bobine précise)
- Longueur de filament (nominale et réelle, en mm)
- Poids du contenant vide (pour que vous puissiez peser la bobine et calculer le matériau restant)
- Poids consommé (mis à jour au fil de vos impressions ; c'est le champ qui rend les bobines vraiment « intelligentes »)

**Couleur :**
- Couleur primaire au format RGBA
- Jusqu'à 5 couleurs secondaires (pour les filaments multicolores, galaxy ou dégradés)
- Distance de transmission (valeur d'opacité, utile pour les projets [HueForge](https://shop.thehueforge.com/))

**Métadonnées :**
- Date de fabrication et date de péremption
- Pays d'origine
- UUID pour la marque, le matériau et l'instance de bobine précise
- Paramètres de protection en écriture

La spécification couvre même des champs propres à la résine comme `last_stir_time`, qui enregistre la dernière fois que la résine a été remuée avant l'impression. C'est le genre de détail qui me dit que les gens derrière tout ça se sont réellement fait avoir par de la résine non remuée.

---

## Le tag : pas votre autocollant NFC habituel

Voici un détail technique que je signalerais avant tout achat : **OpenPrintTag est conçu pour les tags ISO 15693 (NFC-V)**, en particulier les puces **NXP ICODE SLIX et ICODE SLIX2**. Ce sont des tags NFC Forum Type 5 avec une portée de lecture nettement plus grande que les tags NFC-A standard, jusqu'à 1,5 mètre avec un lecteur dédié. Si vous n'avez jamais acheté que les autocollants NTAG bon marché qu'utilisent la plupart des projets, c'est une famille de tags différente - je couvre tout le paysage dans [les types de tags NFC pour iPhone](/blog/nfc-tag-types-for-iphones/).

Pourquoi le NFC-V ? Le lecteur NFC intégré d'une imprimante doit détecter la bobine quelle que soit son orientation. La portée plus longue du NFC-V rend cela possible sans exiger un alignement précis du tag, ce qui est un choix de conception malin.

**Et les autocollants NTAG classiques ?** Le format de données OpenPrintTag repose sur NDEF, donc une app pour téléphone comme NFC.cool peut techniquement lire et écrire des données OpenPrintTag sur n'importe quel tag NFC, y compris les NTAG213/215/216. Je l'ai fait - ça marche très bien pour une lecture de téléphone à téléphone. En revanche, **le matériel des imprimantes et les apps comme celle de Prusa ne reconnaissent que les tags NFC-V**. Donc, si vous voulez que vos bobines étiquetées fonctionnent avec les lecteurs intégrés des imprimantes, utilisez des tags ICODE SLIX2. Ne faites pas l'erreur que la plupart des gens feraient, à mon avis, en achetant un sachet de NTAG213 pour ça.

Si vous achetez des tags vierges, cherchez spécifiquement des **ICODE SLIX2** ou de l'**ISO 15693**. Vous pouvez trouver des tags compatibles sur [Amazon US](https://amzn.to/3LTh1fT) ou [Amazon Europe](https://amzn.to/4oJpQr4) (liens affiliés).

---

## Comment lire et écrire OpenPrintTag avec votre téléphone

Vous n'avez pas besoin d'une imprimante Prusa ni d'un matériel spécial pour travailler avec OpenPrintTag, juste de votre téléphone. C'est la partie que j'avais le plus hâte de construire, parce qu'un téléphone dans votre poche est le lecteur NFC le plus accessible qui soit.

NFC.cool Tools prend en charge OpenPrintTag nativement sur [iOS](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-openprinttag-read-write-nfc-spools-phone-fr&mt=8) comme sur [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-openprinttag-read-write-nfc-spools-phone-fr), et je me suis assuré que la fonction soit entièrement gratuite.

**Lire un tag :**
1. Ouvrez NFC.cool Tools
2. Approchez votre téléphone du tag NFC sur la bobine
3. NFC.cool détecte automatiquement le format OpenPrintTag
4. Consultez les données structurées : matériau, marque, couleur, poids, longueur, propriétés

**Écrire un tag :**
1. Collez un tag ICODE SLIX2 vierge sur votre bobine
2. Ouvrez NFC.cool → section NFC Apps → OpenPrintTag
3. Renseignez les détails du matériau : type, marque, couleur, poids, longueur
4. Touchez pour écrire

**Mettre à jour le matériau restant :**
Après une impression, mettez à jour le champ du poids consommé sur le tag. La prochaine fois que vous scannerez, vous saurez exactement combien de filament il reste, sans deviner, sans peser. C'est ce qui fait passer la bobine intelligente du gadget à quelque chose sur lequel je m'appuierais vraiment.

Si vous voulez regarder sous le capot, vous pouvez utiliser le Mode Expert pour inspecter les enregistrements NDEF bruts - pratique quand vous devez déboguer un tag ou vérifier la structure des données. Vous débutez dans l'écriture de tags en général ? Je passe en revue les bases dans [comment écrire des tags NFC sur iPhone](/blog/write-nfc-tags-iphone/).

---

## Pourquoi utiliser votre téléphone ?

Les imprimantes Prusa reçoivent des lecteurs NFC intégrés, et des projets comme [SpoolSense](https://github.com/SpoolSense) (un lecteur ESP32 open source) ajoutent des options matérielles dédiées. Alors pourquoi s'embêter avec votre téléphone ? Voici l'argument que je défendrais :

- **Fonctionne avec n'importe quelle imprimante :** Voron, Bambu Lab, Creality, Ender, quelle que soit la vôtre
- **Écrivez des tags pour n'importe quel filament :** le Prusament est pré-étiqueté, mais vous pouvez étiqueter vous-même du Fillamentum, de l'eSUN, du Hatchbox ou n'importe quelle marque
- **Gérez votre inventaire loin de votre imprimante :** scannez vos bobines à votre bureau, dans votre rangement ou dans un makerspace
- **Déboguez les tags :** quand une imprimante n'arrive pas à lire un tag, scannez-le avec votre téléphone pour voir ce qu'il contient réellement - c'est l'usage vers lequel je me tournerais le plus
- **Aucun matériel supplémentaire :** votre téléphone a déjà un lecteur NFC, et c'est tout l'intérêt

---

## Cas d'usage concrets

**Inventaire personnel :** étiquetez chaque bobine de votre collection. Quand vous préparez une impression, scannez les bobines pour vérifier le type de matériau, la longueur restante et la couleur sans rien déballer.

**Suivi du filament restant :** pesez votre bobine avant et après une impression, mettez à jour le poids consommé sur le tag. Fini l'angoisse du « est-ce que cette bobine aura assez pour une impression de 14 heures ? ».

**Usage en makerspace ou en équipe :** étiquetez les bobines avec les détails du matériau pour que n'importe qui dans l'atelier puisse les scanner et les identifier. Fini le filament mystère.

**Notes de test de filament :** vous avez trouvé la température parfaite pour une bobine précise ? Mettez à jour le tag avec vos notes pour la prochaine fois.

**Matériaux multicolores et spéciaux :** OpenPrintTag prend en charge jusqu'à 6 couleurs par bobine et plus de 68 propriétés. Votre PETG phosphorescent chargé en fibre de carbone peut enfin être correctement étiqueté, indicateur abrasif compris.

---

## L'écosystème grandit

OpenPrintTag est encore jeune, mais l'élan est réel :

- **Prusament** livre chaque bobine avec un tag NFC OpenPrintTag
- **Les imprimantes Prusa** ajoutent des lecteurs NFC natifs
- **Des lecteurs matériels open source** comme SpoolSense (basé sur ESP32) émergent de la communauté
- **Plus de 22 entreprises** ont rejoint l'initiative
- **NFC.cool** est la seule app NFC généraliste avec une prise en charge complète d'OpenPrintTag à la fois sur iOS et Android, et je l'ai ajoutée parce que je voulais m'en servir moi-même

J'ai vu l'industrie de l'impression 3D avoir besoin d'une norme ouverte pour les bobines intelligentes pendant des années, et j'ai vu quelques tentatives propriétaires apparaître puis disparaître. OpenPrintTag est la plus crédible que j'aie vue : soutenue par un grand fabricant, entièrement open source, et déjà présente sur de vrais produits. Cette combinaison est assez rare pour que je parie dessus.

---

## Pour commencer

**Ce qu'il vous faut :**
- Un iPhone 7 ou plus récent, ou un téléphone Android équipé du NFC
- NFC.cool Tools ([App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-openprinttag-read-write-nfc-spools-phone-fr&mt=8) / [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-openprinttag-read-write-nfc-spools-phone-fr)), gratuit, OpenPrintTag inclus
- Des tags NFC ICODE SLIX2 / ISO 15693 vierges ([Amazon US](https://amzn.to/3LTh1fT) / [Amazon Europe](https://amzn.to/4oJpQr4), liens affiliés)
- Quelques bobines de filament à étiqueter

C'est tout. Dans cinq minutes, votre première bobine pourrait être intelligente. Si le NFC lui-même est nouveau pour vous, mon [guide des tags NFC pour débutants](/blog/nfc-tags-beginners-guide/) est l'endroit où je vous orienterais en premier, et la [page de la fonction lecteur/enregistreur NFC](/features/nfc-reader-writer/) présente ce que NFC.cool Tools peut faire au-delà d'OpenPrintTag.

*OpenPrintTag est une initiative open source de Prusa Research. NFC.cool en est un soutien indépendant. En savoir plus sur [openprinttag.org](https://openprinttag.org).*
