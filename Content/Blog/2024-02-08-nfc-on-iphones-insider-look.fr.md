---
id: nfc-blog-020
title: "Le NFC sur iPhone : le regard d'un initié"
date: 2024-02-08
tags: ["nfc-tags", "iphone"]
summary: "Comment le NFC fonctionne vraiment sur iPhone - de l'élément sécurisé d'Apple Pay à la lecture de tags avec Core NFC. Un regard concret sur le protocole, l'histoire côté iOS, et pourquoi la faible portée est un atout, pas une limite."
metaTitle: "Comment le NFC fonctionne sur iPhone : le regard d'un initié"
metaDescription: "Une explication concrète du NFC sur iPhone - le fonctionnement du protocole, l'élément sécurisé d'Apple Pay, la lecture de tags avec Core NFC, et pourquoi la faible portée est un choix de sécurité."
ogTitle: "Le NFC sur iPhone : le regard d'un initié"
ogDescription: "Comment le NFC fonctionne vraiment sur iPhone - protocole, élément sécurisé, lecture de tags avec Core NFC, et l'histoire côté iOS."
image: "/assets/images/Blog/nfc-on-iphones-insider-look.webp"
---
Une bonne partie de la technologie qu'on utilise tous les jours s'efface dans le décor. On approche son téléphone pour payer, déverrouiller, scanner, partager - sans jamais penser au protocole qui tourne en dessous. Le NFC est l'une de ces tuyauteries discrètes, et après des années à construire NFC.cool, une app pour lire et écrire des tags NFC, j'ai passé plus de temps dans cette tuyauterie que la plupart des gens n'en passeront jamais. Voici comment ça marche vraiment sur votre iPhone, comme je l'expliquerais à un ami curieux.

---

## Ce qu'est vraiment le NFC

Le **Near Field Communication** (communication en champ proche) est un protocole sans fil à courte portée - deux appareils peuvent échanger des données lorsqu'ils sont à environ 4 cm l'un de l'autre. Je le vois comme un cousin simplifié, à portée bien plus courte, du Bluetooth et du Wi-Fi.

Cette courte portée déroute au début, mais ce n'est pas une limite. C'est le modèle de sécurité, et le jour où ça a fait tilt pour moi, beaucoup de choix de conception du NFC ont pris tout leur sens. Vous ne pouvez pas déclencher par accident un terminal de paiement depuis l'autre bout de la pièce, et un lecteur malveillant ne peut pas siphonner discrètement les données de votre portefeuille à distance. Si tout cela est nouveau pour vous, j'ai écrit un [guide des tags NFC pour débutants](/blog/nfc-tags-beginners-guide/) tout en douceur, qui part de plus loin que cet article.

---

## Le NFC sur iPhone : petite histoire

Apple a intégré du matériel NFC pour la première fois avec l'iPhone 6 et le 6 Plus en 2014, mais la puce radio était verrouillée pour Apple Pay uniquement. Les apps tierces ne pouvaient pas lire de tags NFC du tout - ce qui, pour quelqu'un qui allait plus tard créer une app NFC, a fait quelques années bien frustrantes à observer.

Cela a changé avec **iOS 11** (2017), qui a introduit le framework **Core NFC** et a enfin permis aux développeurs comme moi de lire les tags NDEF. Apple a continué d'ouvrir la porte plus grand au fil des versions - iOS 13 a ajouté l'écriture, et l'iPhone XS et les modèles plus récents ont ajouté la lecture de tags en arrière-plan, toujours active. Aujourd'hui, sur n'importe quel iPhone récent, vous pouvez approcher un tag sans rien ouvrir : le système le reconnaît et propose la bonne action.

---

## Comment le NFC déplace réellement les données

Les appareils NFC jouent l'un des deux rôles à chaque interaction : **actif** (alimenté, il génère un champ) ou **passif** (sans batterie, il récupère son énergie dans le champ). C'est l'idée unique à laquelle je reviens dès qu'on me demande comment fonctionne le NFC.

Quand vous payez avec Apple Pay, votre iPhone est le lecteur actif. Il génère un champ radio à 13,56 MHz. L'élément NFC du terminal de paiement se réveille dans ce champ, s'identifie, et échange une petite charge cryptographique avec votre téléphone. Les données de votre carte ne quittent jamais l'**élément sécurisé** (Secure Element) - une puce dédiée, isolée matériellement, dans le téléphone. Ce qui en sort, c'est un jeton à usage unique.

Quand vous approchez votre téléphone d'un autocollant NFC sur une affiche, les rôles s'inversent. Le tag de l'affiche est passif - il n'a pas de batterie. Le lecteur de votre iPhone l'alimente, le tag répond avec les enregistrements NDEF qu'il contient, et iOS décide quoi faire (ouvrir une URL, lancer une app, afficher une fiche de contact, déclencher un raccourci). Cette seconde moitié - le côté tag - c'est là que vit NFC.cool, et si vous voulez la voir à l'œuvre sans rien installer, vous pouvez [lire des tags NFC directement depuis votre navigateur](/online-nfc-reader/) sur Android.

---

## NDEF : la lingua franca

La couche de données au-dessus de la radio NFC, c'est le **NDEF** - NFC Data Exchange Format. Je le décris comme un petit format d'enregistrement auto-descriptif : un tag contient un ou plusieurs enregistrements, et chaque enregistrement a un type (URI, texte, vCard, identifiants Wi-Fi, MIME personnalisé) et une charge utile.

Tous les téléphones compatibles NFC de la planète parlent NDEF, et c'est pour ça qu'un tag programmé sur un appareil Android se lira sans problème sur un iPhone, et inversement. C'est l'un des rares endroits du mobile où iOS et Android partagent vraiment une norme, et honnêtement, cette interopérabilité est ce dont je suis le plus reconnaissant quand je développe des fonctionnalités - j'écris pour le format, pas pour une plateforme. Si vous voulez essayer d'écrire vos propres enregistrements, je détaille tout ça dans [comment écrire des tags NFC sur iPhone](/blog/write-nfc-tags-iphone/).

---

## Confidentialité et sécurité

Deux couches de défense méritent d'être mentionnées, et ce sont les deux que je me retrouve à expliquer le plus souvent :

- **La portée.** Quelques centimètres, c'est difficile à intercepter sans une antenne bien visible - c'est le modèle de menace d'origine autour duquel le NFC a été conçu.
- **La tokenisation.** Apple Pay ne transmet jamais votre vrai numéro de carte. Chaque transaction utilise un numéro de compte d'appareil (Device Account Number) plus un cryptogramme à usage unique, généré dans l'élément sécurisé. Même un terminal compromis ne peut pas le rejouer.

Pour la lecture de tags, la surface d'attaque est différente - c'est le tag lui-même qui fait l'objet de la confiance. Si vous maîtrisez ce qu'il y a sur le tag (vos propres automatisations domestiques, votre carte de visite), tout va bien. Si vous approchez votre téléphone d'un tag inconnu dans un lieu public, iOS devrait tout de même vous afficher une demande de confirmation avant que quoi que ce soit ne se passe. Et quand j'ai vraiment besoin qu'un tag contienne un secret plutôt que de simplement pointer vers un, je me tourne vers les tags cryptographiques, un sujet que j'ai traité dans [stocker des secrets chiffrés en toute sécurité sur des tags NFC](/blog/nfc-safe-encrypted-secrets/).

---

## Pourquoi c'est important

Le NFC est l'un de ces protocoles qui disparaissent quand ils fonctionnent, et c'est exactement pour ça que je trouve ça gratifiant de bâtir dessus. Vous approchez votre téléphone d'un portillon, d'un terminal de paiement, d'une carte de visite, d'une enceinte connectée - et il se passe quelque chose. Pas d'appairage, pas de code PIN, pas d'app à lancer. Juste un geste physique délibéré qui autorise un échange précis.

C'est pour ça que j'ai créé [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-on-iphones-insider-look-fr&mt=8) - pour rendre accessible toute la surface NDEF du NFC sans que personne ait à apprendre le protocole d'abord. Lisez n'importe quel tag, écrivez n'importe quel type d'enregistrement, verrouillez un tag quand vous avez terminé. Sur iPhone ou [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-on-iphones-insider-look-fr).
