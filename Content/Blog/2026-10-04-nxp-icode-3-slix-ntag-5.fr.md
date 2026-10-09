---
id: "nxp-icode-3-2026-10"
title: "ICODE 3, SLIX, ICODE DNA et NTAG 5 fonctionnent désormais dans NFC.cool sur iPhone"
date: "2026-10-04"
tags: ["announcements", "nfc-tags", "iphone"]
summary: "NFC.cool Tools 7.1.0 parle désormais le NXP ICODE : l'app lit, vérifie et gère les tags ICODE 3, la famille SLIX, ICODE DNA et NTAG 5 sur iPhone, ainsi que sur iPad et Mac avec un lecteur externe. Voici ce que savent faire ces puces des bibliothèques et des magasins, et la bizarrerie d'iOS qui a bien failli me faire croire que mon propre code était cassé."
image: "/assets/images/Blog/nxp-icode-3-slix-ntag-5.webp"
imageAlt: "Un livre de bibliothèque avec une étiquette RFID collée à l'intérieur de la couverture, à côté d'un iPhone affichant les détails d'un tag NFC"
author: "Nicolo Stanciu"
metaTitle: "Tags NXP ICODE 3 et SLIX sur iPhone : lire et gérer"
metaDescription: "NFC.cool lit et gère désormais les tags NXP ICODE 3, SLIX, SLIX2, ICODE DNA et NTAG 5 sur iPhone : mots de passe, compteur de lectures, antivol, mode privé et plus."
ogTitle: "ICODE 3, SLIX et NTAG 5 fonctionnent désormais sur iPhone"
ogDescription: "Ce que savent faire les puces NXP des bibliothèques et des magasins, et comment NFC.cool les lit et les gère sur iPhone, iPad et Mac."
---

J'avais un tag ICODE 3 sur mon bureau, mon iPhone posé dessus, et l'app lisait sans broncher tout ce que la puce avait à raconter : son ID, sa mémoire, son compteur de lectures, la signature de NXP prouvant qu'elle était authentique. Puis je lui ai demandé de modifier une seule chose, le compteur, et l'app m'a répondu que le tag s'était éloigné.

Il n'avait pas bougé d'un millimètre. J'ai réessayé. Même message. J'ai tenté de définir un mot de passe à la place. Même message.

Je reviendrai sur ce qui se passait, parce que c'est le bug le plus intéressant que j'aie traqué cette année. Mais d'abord, qu'est-ce que je fabriquais avec un tag ICODE ?

Je veux que NFC.cool soit l'app NFC la plus complète qu'on puisse installer sur un téléphone. Cet été, cela s'est traduit par la prise en charge du [NTAG 424 DNA](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/), le tag qu'utilisent les marques pour prouver qu'un produit est authentique. Après ça, la plus grande famille de puces avec laquelle l'app ne savait pas encore vraiment dialoguer, c'était l'ICODE de NXP. Avec **NFC.cool Tools 7.1.0**, c'est chose faite.

---

## ICODE, ces tags que vous avez déjà eus en main sans le savoir

Si vous avez emprunté un livre en bibliothèque au cours des vingt dernières années, il y a de bonnes chances que vous ayez déjà tenu un tag ICODE entre vos mains. C'est l'étiquette plate avec une antenne en spirale, collée à l'intérieur de la couverture. Les mêmes puces se cachent dans les antivols des magasins, dans le marquage du linge des blanchisseries et dans les étiquettes de produits.

Techniquement, ce sont des puces **ISO 15693**, ce que le NFC appelle le **Type 5**. Les autocollants NFC que la plupart des gens achètent, comme le NTAG215, relèvent d'une autre norme. Je me représente ces deux normes comme deux stations de radio sur la même bande FM : votre iPhone capte l'une comme l'autre, mais une fois qu'il s'est calé dessus, on n'y parle pas la même langue.

Si les bibliothèques et les magasins choisissent l'ICODE, c'est pour la portée. Une grande antenne, sur le portique d'une bibliothèque ou sur une borne de prêt automatique, peut lire ces puces de plus loin qu'un autocollant NFC classique. Avec un téléphone, il faut quand même approcher le tag tout près, parce que l'antenne de l'iPhone est minuscule, mais la puce a été pensée pour ces portiques.

Lire le lien ou le texte enregistré sur un tag ICODE n'a jamais été le plus difficile. Ce qui est intéressant se trouve en dessous : des mots de passe, un compteur, l'indicateur antivol, un mode privé. Jusqu'à présent, NFC.cool n'avait tout simplement pas accès à cette partie de la puce.

---

## Ce que NFC.cool sait faire avec un ICODE 3

L'**ICODE 3** est la puce la plus récente de la famille chez NXP, et elle succède à l'ICODE SLIX2. En ligne, on la trouve souvent vendue sous le nom « SLIX 3 ». NXP n'a aucune puce qui porte ce nom : si une annonce parle de SLIX 3, il s'agit d'un ICODE 3.

Scannez-en un avec NFC.cool et vous avez une vue d'ensemble : le modèle exact de la puce, sa mémoire, son compteur, et si c'est une puce **NXP d'origine**. NXP signe l'ID de chaque puce en usine, et l'app vérifie cette signature : une copie qui reprend l'ID ne peut donc pas la falsifier.

À partir de là, vous pouvez modifier presque tout ce que la puce propose :

- **Compteur de lectures.** L'ICODE 3 sait compter chaque lecture, toute seule. Activez le miroir NFC et la puce insère son ID et la valeur actuelle du compteur dans le lien enregistré : chaque scan ouvre ainsi une URL légèrement différente, qu'un site web peut comptabiliser. Si vous connaissez déjà le [NFC Tap Counter](/blog/count-nfc-tag-scans/), c'est la même idée sur une autre puce.
- **Mots de passe.** L'ICODE 3 en a six, un pour chacune de ces fonctions : lecture, écriture, mode privé, destruction, réglages antivol et configuration. Tous les tags sortent d'usine avec les mêmes valeurs, si bien qu'une protection n'a de sens qu'une fois que vous avez défini les vôtres. NFC.cool conserve vos mots de passe dans votre trousseau iCloud, tag par tag.
- **Protection de la mémoire.** Vous pouvez diviser la mémoire en deux zones et protéger chacune séparément, par exemple pour laisser un lien public lisible tout en masquant les données enregistrées à la suite.
- **Réglages antivol et bibliothèque.** C'est l'indicateur EAS qui fait sonner le portique d'un magasin ou d'une bibliothèque. C'est l'octet AFI que les bibliothèques utilisent pour indiquer qu'un livre est emprunté. Vous pouvez modifier l'un comme l'autre, et les verrouiller.
- **Mode privé.** Le tag masque son ID et ses données tant qu'on ne lui présente pas le mot de passe du mode privé.
- **Détection d'effraction** sur la version SL2S3003TT, dotée d'un fil que l'on peut faire passer sur un bouchon de bouteille ou sur le scellé d'un carton. L'app indique si ce scellé a déjà été rompu.
- **Votre propre signature.** Une marque peut remplacer la signature de NXP par la sienne, puis la verrouiller.
- **Destruction.** Elle désactive la puce définitivement, pour préserver la confidentialité quand le produit a fait son temps.

Plusieurs de ces réglages sont définitifs, et quelques-uns peuvent rendre un tag inaccessible depuis un iPhone. Pour tout ce qui est irréversible, NFC.cool vous demande donc d'abord de saisir les quatre derniers caractères de l'ID du tag. L'app refuse aussi de modifier un autre tag que celui avec lequel vous avez commencé. Malgré tout, à votre place, je ferais mes premiers essais sur un tag de rechange.

Une petite chose que j'ai corrigée au passage : vous pouvez désormais formater un tag ICODE vierge en tag NFC directement depuis l'app, pour qu'il soit prêt à recevoir un lien ou du texte.

---

## Le reste de la famille

L'app identifie la puce que vous tenez et ne propose que ce qu'elle sait réellement faire. Un ancien SLIX vous montre moins d'options qu'un ICODE 3, tout simplement parce que la puce a moins de fonctionnalités.

- Les **SLIX, SLIX-S, SLIX-L, SLIX2** et les anciennes puces **SLI** sont les puces de tous les jours, celles qu'on retrouve dans la plupart des bibliothèques. Le SLIX2 dispose du compteur et de la protection de la mémoire. Le SLIX-S protège sa mémoire page par page et prend en charge les mots de passe 64 bits, avec lesquels chaque accès protégé exige à la fois le mot de passe de lecture et celui d'écriture.
- L'**ICODE DNA** est le membre de la famille dédié à la sécurité. Il renferme des clés AES secrètes qui ne quittent jamais la puce. Saisissez la clé dans NFC.cool et l'app met la puce au défi de prouver qu'elle la possède. Une copie échoue, même si son ID et sa mémoire correspondent parfaitement.
- Le **NTAG 5** est celui qui m'enthousiasme le plus, en tant que bricoleur. C'est une puce NFC conçue pour prendre place sur un circuit imprimé. La version **switch** pilote directement des broches, tandis que les versions **link** et **boost** dialoguent avec un microcontrôleur en I2C. Ces puces peuvent alimenter un petit circuit rien qu'avec le champ de votre téléphone, signaler des événements sur une broche et partager 256 octets de mémoire avec la carte. NFC.cool lit et modifie ces réglages, et sur les NTP5332 et NTA5332, l'app peut même communiquer avec des capteurs reliés à la puce, directement depuis votre iPhone.

Vous trouverez tout cela dans les outils NFC, sous **NXP ICODE et NTAG 5**, juste à côté de NTAG 424 DNA. Ou scannez simplement un tag ICODE, et l'app ouvre ses détails d'elle-même.

---

## Le bug qu'iOS ne voulait pas me laisser corriger

Retour à mon bureau, et à ce tag qui se serait « éloigné ».

La norme ISO 15693 offre au téléphone deux façons de s'adresser à un tag. Il peut inscrire l'ID du tag sur chaque message, comme on écrit un nom sur une enveloppe, pour que seul ce tag réponde. Ou il peut d'abord **sélectionner** le tag, comme on se tourne vers une personne précise dans une pièce, puis simplement lui parler.

La méthode de l'enveloppe est la plus propre, c'est donc celle que NFC.cool essaie en premier. Pour vérifier qu'elle fonctionnait, l'app envoyait un petit message de test portant un ID. Le tag répondait, l'app en concluait que les messages adressés passaient bien, et continuait.

Voici ce que j'ignorais. iOS répartit ces commandes en deux groupes : les commandes standard, que toutes les puces ISO 15693 comprennent, et les commandes propres à NXP, celles qui servent aux mots de passe, au compteur et à la configuration. Quand un message adressé contient l'une des commandes de NXP, iOS refuse de l'envoyer : il ne quitte jamais le téléphone. iOS renvoie discrètement une erreur « paramètre invalide », et pour mon code, cette erreur ressemblait en tout point à un tag qui s'était éclipsé.

Mon message de test utilisait une commande standard : il passait comme une lettre à la poste et me laissait croire que tout allait bien. Chaque vraie modification utilisait une commande NXP, si bien que chacune d'elles échouait.

Une fois le problème compris, la correction s'est révélée d'une simplicité presque gênante. Le test utilise désormais l'une des commandes de NXP, une commande inoffensive qui se contente de demander un nombre aléatoire à la puce. Si iOS la refuse, l'app passe à la sélection du tag. J'ai replacé l'ICODE 3 sous mon iPhone, appuyé sur **Définir le compteur**, et le nombre stocké sur le tag a changé. J'ai rarement été aussi content de voir un compteur bouger.

---

## Sur quels appareils ça fonctionne

Sur iPhone, tout cela fonctionne avec le lecteur NFC intégré au téléphone. Sur iPad et Mac, qui n'ont pas de puce NFC, ça passe par un [lecteur NFC USB externe](/blog/nfc-reading-ipad-mac/). Le lecteur doit transmettre les commandes ICODE telles quelles au tag. Si le vôtre en est capable, l'app lit et gère les tags ICODE exactement comme sur un iPhone, et le bug de la section précédente n'y existe tout simplement pas. Un lecteur qui ne les transmet pas vous permet malgré tout de lire la mémoire du tag.

L'app Android ne parle pas encore l'ICODE.

Si un tiroir chez vous déborde d'étiquettes du même genre que celles des bibliothèques, sans que vous ayez jamais pu en faire grand-chose, ou si une carte NTAG 5 attend son projet, passez à la version 7.1.0 et scannez-en une. NFC.cool Tools est disponible sur l'[App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nxp-icode-3-slix-ntag-5-fr&mt=8).
