---
id: "nfc-tag-types-2025-05"
title: "Comprendre les différents types de tags NFC - et lesquels fonctionnent avec les iPhone"
date: "2025-05-20"
tags: ["nfc-tags", "guides", "iphone"]
summary: "Du Type 1 au Type 5, qui les fabrique, et pourquoi la série NTAG (Type 2) est le choix le plus sûr pour vos projets iPhone."
metaDescription: "Les types de tags NFC expliqués - du Type 1 au Type 5, qui fabrique les puces, et pourquoi la série NTAG (Type 2) est le choix le plus sûr et le mieux pris en charge pour vos projets de tags sur iPhone."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/nfc-tag-types.webp"
imageAlt: "Différents types de tags NFC alignés à côté d'un iPhone"
---

Les tags NFC sont de petits circuits intégrés qui stockent des informations que n'importe quel appareil compatible NFC, comme votre téléphone, peut lire. Mais voici ce que j'aurais aimé qu'on me dise plus tôt : tous les tags NFC ne se valent pas. Il existe toute une ménagerie de types issus de différents fabricants, chacun avec ses petites particularités, et cela rend le choix du bon tag pour votre iPhone étonnamment délicat.

J'ai passé des années à développer NFC.cool, une app pour lire et écrire des tags NFC, et « quel tag dois-je acheter pour mon iPhone ? » est sans doute l'une des questions qui reviennent le plus souvent. Voici donc la réponse que je donne. Je vais passer en revue les cinq types de tags NFC, qui les fabrique réellement, et pourquoi l'un d'eux est le choix sûr pour presque tous les projets iPhone. Si tout cela est complètement nouveau pour vous, vous devriez peut-être commencer par mon [guide complet des tags NFC pour débutants](/blog/nfc-tags-beginners-guide/) - cet article-ci va un cran plus loin.

---

## Comprendre les types de tags NFC

Les tags NFC se répartissent en cinq types : Type 1, Type 2, Type 3, Type 4 et Type 5. Cette classification n'a pas été inventée par les fabricants - elle vient du NFC Forum, le consortium industriel qui définit les normes. Chaque type a sa propre capacité de mémoire et sa propre vitesse, et peut être en lecture-écriture ou en lecture seule.

C'est le prisme que j'utilise chaque fois que je regarde la fiche technique d'un tag, alors passons-les en revue un par un.

---

## Type 1 et 2 - Topaz et MIFARE Ultralight®

Le Type 1 (Topaz, de Broadcom) et le Type 2 (MIFARE Ultralight®, de [NXP Semiconductors](https://nxp.com)) sont l'extrémité économique et sans prétention du spectre. Ils conviennent bien aux applications simples comme les affiches et les cartes de visite. Leur capacité de mémoire est faible (de 48 octets à environ 2 Ko), mais d'après mon expérience, c'est largement suffisant pour une URL ou un court contenu texte, ce que la plupart des gens veulent vraiment.

---

## Type 3 - FeliCa™

Les tags de Type 3, aussi appelés FeliCa™, ont été développés par Sony. On les rencontre surtout en Asie, où ils alimentent les titres de transport en commun et la monnaie électronique. Ils offrent une vitesse et une mémoire supérieures (jusqu'à 1 Mo), mais leur usage reste assez limité car ils coûtent plus cher et sont liés à des applications propres à certaines régions. Je les sors rarement en dehors de ce contexte.

---

## Type 4 - MIFARE DESFire®

Les tags MIFARE DESFire®, eux aussi de NXP Semiconductors, sont de Type 4. C'est l'option haute sécurité et grande capacité, conçue pour des tâches complexes comme le contrôle d'accès sécurisé et les systèmes de transport en commun. Ils peuvent stocker jusqu'à 8 Ko. Quand un projet a réellement besoin d'une protection cryptographique, c'est vers cette famille que je me tourne - j'ai creusé le volet sécurité plus en détail dans mon article sur [comment garder vos secrets à l'abri sur des tags NFC chiffrés](/blog/nfc-safe-encrypted-secrets/).

---

## Type 5 - ISO 15693

Les tags de Type 5 sont conformes à la norme ISO 15693 et sont relativement récents dans l'écosystème NFC. C'est surtout une histoire industrielle, et leur atout phare est une portée de lecture étendue par rapport aux autres types. Utile si vous suivez des stocks dans un entrepôt, beaucoup moins pour le tag collé sur votre frigo.

---

## Quels tags NFC choisir pour votre iPhone ?

Voici la partie la plus importante. Les iPhone à partir de l'iPhone 7 sont compatibles avec les Type 1, 2 et 5, mais c'est le Type 2 qu'ils prennent le mieux en charge. Les tags NFC de Type 2, c'est la [série NTAG](https://www.nxp.com/products/wireless-connectivity/nfc-hf/ntag-for-tags-and-labels:NTAG-TAGS-AND-LABELS) de NXP Semiconductors.

Les modèles NTAG213, NTAG215 et NTAG216 sont les plus populaires de cette série, et ils fonctionnent à merveille avec les iPhone - c'est sur eux que je fais mes tests jour après jour. Ils offrent assez de mémoire (de 144 à 888 octets) pour la plupart des projets concrets, ils sont entièrement inscriptibles et lisibles par n'importe quel iPhone compatible NFC, et ils sont réinscriptibles, ce qui vous permet de modifier leur contenu autant de fois que vous le souhaitez.

Une remarque pratique qui m'a épargné beaucoup de frustration : plus le tag et son antenne sont grands, plus un lecteur NFC le détecte de façon fiable. J'éviterais les autocollants extrêmement bon marché et fragiles si la fiabilité compte pour votre projet - les quelques centimes économisés ne valent pas un tag qui ne se lit qu'à la troisième tentative.

Ce que les iPhone font principalement avec le NFC, c'est lire des messages au format NDEF (NFC Data Exchange Format) - des URL, du texte brut ou des vCard (cartes de visite numériques). Tout tag qui prend en charge le NDEF, et c'est le cas de la plupart des tags de la série NTAG, est un choix solide pour les utilisateurs d'iPhone. Quand vous serez prêt à y inscrire réellement des données, j'ai écrit un tutoriel pas à pas sur [comment écrire des tags NFC sur iPhone](/blog/write-nfc-tags-iphone/).

---

## En résumé

Si vous cherchez des tags NFC à utiliser avec votre iPhone, ma recommandation honnête est simple : des tags de Type 2 de la série NTAG de NXP Semiconductors. Ils sont économiques et vous offrent la meilleure compatibilité et les meilleures fonctionnalités pour ce que la plupart des gens veulent vraiment faire avec le NFC sur iPhone. Achetez un lot d'autocollants NTAG215 et vous serez parés pour à peu près tout.

Le NFC continue d'évoluer, alors ça vaut la peine de garder un œil sur les nouveautés et les spécifications des tags. Pour aller plus loin, voyez mon précédent article sur [la magie du NFC sur iPhone](/blog/nfc-on-iphones-insider-look/), et si vous voulez simplement voir ce qui se trouve déjà sur un tag, vous pouvez [lire des tags NFC directement depuis votre navigateur](/online-nfc-reader/).

Amusez-vous bien avec vos tags NFC !
