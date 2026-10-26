---
id: "ultimate-nfc-tag-guide-2026-09"
title: "Le guide ultime des tags NFC : chaque puce, son usage et ce qui la lit"
date: "2026-10-26"
tags: ["nfc-tags", "guides"]
summary: "Toutes les puces NFC que vous pouvez acheter, du NTAG210 de 48 octets au DESFire EV3, avec les vrais chiffres : mémoire, protection, endurance, ce qu'un iPhone et un téléphone Android savent en faire, et l'usage pour lequel chacune est réellement conçue."
image: "/assets/images/Blog/ultimate-nfc-tag-guide.webp"
imageAlt: "Un iPhone avec une icône NFC lumineuse derrière une rangée de formats de tags NFC : un autocollant, un jeton, une carte PVC, un porte-clés, un bracelet et un inlay transparent"
author: "Nicolo Stanciu"
metaTitle: "Le guide ultime des tags NFC : chaque puce expliquée"
metaDescription: "Toutes les puces NFC au même endroit : NTAG, MIFARE, DESFire, ICODE, ST25, FeliCa, Topaz et les clones. Mémoire, sécurité, endurance, ce qui les lit et quel tag pour quel usage."
ogTitle: "Toutes les puces NFC, un seul guide"
ogDescription: "Mémoire, sécurité, endurance, compatibilité téléphone et le vrai usage de chaque puce NFC du marché. Fiches techniques, tableau de décision et catalogue complet."
---

Vous ouvrez l'annonce d'un lot de tags NFC. Elle dit « NFC 213 », ou « compatible NTAG215 », ou simplement « carte NFC 1K, compatible tous téléphones ». Vous ne voulez savoir qu'une chose : est-ce que ça fera ce que j'ai en tête ? Et l'annonce ne peut pas vous répondre, parce que la personne qui l'a rédigée n'en sait rien non plus.

Voilà des années que je développe [NFC.cool Tools](/features/nfc-reader-writer/), une app dont la première tâche, à chaque scan, est de répondre précisément à cette question : quelle est cette puce, et que sait-elle faire ? Le code d'identification reconnaît à lui seul une soixantaine de produits de sept fabricants, et chacun d'eux a atterri dans cette liste parce que quelqu'un l'a approché d'un téléphone et que quelque chose ne s'est pas passé comme l'annonce le promettait. Ce guide, c'est la référence que j'aurais aimé avoir sous la main pendant que j'écrivais ce code. Il est long, et c'est voulu. Si vous voulez la version courte, commencez par le [guide du débutant sur les tags NFC](/blog/nfc-tags-beginners-guide/), qui renvoie ici pour les détails.

Le résumé en une phrase, pour que vous l'ayez avant les tableaux : **il n'existe pas de meilleur tag NFC, seulement la bonne puce pour le bon usage**, et l'usage se décide sur trois critères : ce que vous devez stocker, qui vous devez tenir à l'écart, et ce qui doit pouvoir le lire.

---

## Comment utiliser ce guide

Chaque chiffre de ce guide vient d'une fiche technique de fabricant, d'une documentation d'Apple ou de Google, ou du code de ma propre app, et les [sources](#sources-et-lectures-complémentaires) sont listées à la fin. Quand j'ai eu une puce sur mon bureau, je le précise dans une note « En pratique ». Quand ce n'est pas le cas, je le dis aussi : les composants exotiques viennent des fiches techniques, et une fiche technique est une promesse, pas une mesure.

Deux choses que vous ne trouverez pas ici : un pas-à-pas pour écrire votre premier tag (c'est le rôle du [guide d'écriture](/blog/write-nfc-tags-iphone/)) et toute l'histoire du NTAG 424 DNA, qui a [son propre article](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/).

- [Ce qu'est un tag NFC, physiquement](#ce-quest-un-tag-nfc-physiquement)
- [La jungle des sigles : normes, types du NFC Forum et ce qui n'est pas du NFC](#la-jungle-des-sigles-normes-types-du-nfc-forum-et-ce-qui-nest-pas-du-nfc)
- [Comment lire une fiche technique ou une annonce](#comment-lire-une-fiche-technique-ou-une-annonce)
- [Le NDEF et ce qui tient vraiment sur un tag](#le-ndef-et-ce-qui-tient-vraiment-sur-un-tag)
- [Plans mémoire : où se trouve quoi sur la puce](#plans-mémoire-où-se-trouve-quoi-sur-la-puce)
- [Le tableau de décision](#le-tableau-de-décision)
- [Famille par famille](#famille-par-famille)
- [Formats et distance de lecture](#formats-et-distance-de-lecture)
- [Qui lit quoi](#qui-lit-quoi)
- [Ce que NFC.cool Tools fait de chaque puce](#ce-que-nfccool-tools-fait-de-chaque-puce)
- [Acheter sans se faire avoir](#acheter-sans-se-faire-avoir)
- [Tout le catalogue en un seul tableau](#tout-le-catalogue-en-un-seul-tableau)
- [Les comparatifs que tout le monde cherche](#les-comparatifs-que-tout-le-monde-cherche)
- [Questions fréquentes](#questions-fréquentes)
- [Glossaire](#glossaire)
- [Sources et lectures complémentaires](#sources-et-lectures-complémentaires)

---

## Ce qu'est un tag NFC, physiquement

Un tag NFC, c'est trois éléments collés ensemble : une **puce** de la taille d'un grain de sable, une **antenne** faite de quelques spires d'aluminium ou de cuivre gravé, et un **support** qui tient le tout, que ce soit un autocollant en papier, un inlay en PET, une carte en PVC ou une capsule de verre. La puce n'a pas de pile. C'est le téléphone qui l'alimente.

Le principe, c'est le couplage inductif. L'antenne du téléphone est une bobine qui génère un champ magnétique alternant 13,56 millions de fois par seconde. Placez une seconde bobine dans ce champ et un courant y est induit, exactement comme dans un chargeur sans fil, mais avec une infime fraction de la puissance. La puce du tag vit de ce courant induit. Pour renvoyer des données, elle n'émet rien par elle-même. Elle active et désactive une charge aux bornes de son antenne, ce que la bobine du téléphone perçoit comme une infime variation de son propre champ. Cette astuce s'appelle la **modulation de charge**, et c'est pour cela que le téléphone fait tout le travail et que le tag peut coûter huit centimes.

C'est aussi ce qui explique la portée. Le champ d'une petite bobine décroît avec le cube de la distance, si bien qu'un tag parfaitement lu à un centimètre ne reçoit plus rien à dix. Je le compare à une bougie : on peut lire à sa lumière si on est tout près, et plisser les yeux depuis l'autre bout de la pièce n'y change rien. La définition du NFC Forum lui-même parle d'« une portée typique allant jusqu'à 2 cm », la documentation d'Android dit « 4 cm ou moins », et les fiches techniques de NXP annoncent « jusqu'à 100 mm selon l'intensité du champ et la géométrie de l'antenne ». Les trois ont raison. Le chiffre du téléphone, c'est ce que vous constaterez ; les 100 mm, c'est ce que la puce sait faire avec un gros lecteur et une grande antenne.

Les débits sont modestes, parce qu'il n'y a pas besoin de plus. Un tag Type A ou Type B communique à 106 kbit/s, les puces plus rapides négociant 212, 424 ou 848 kbit/s après la poignée de main initiale. Le FeliCa tourne à 212 ou 424. L'ISO 15693, la famille longue portée, est encore plus lente avec 26,48 kbit/s en mode normal, parce qu'elle a été conçue pour être lue à un mètre par un portique d'entrepôt plutôt que par un téléphone. Dans tous les cas, lire l'intégralité des 888 octets d'un NTAG216 prend une fraction de seconde.

| Norme | Débit de base | Modes plus rapides | Voie de retour |
| --- | --- | --- | --- |
| ISO/IEC 14443 Type A et B | 106 kbit/s | 212, 424, 848 kbit/s sur les puces qui les négocient (DESFire, Plus, NTAG 424 DNA) | modulation de charge sur une sous-porteuse à 847,5 kHz |
| FeliCa (JIS X 6319-4, ISO/IEC 18092) | 212 kbit/s | 424 kbit/s | modulation de charge |
| ISO/IEC 15693 | 26,48 kbit/s (6,62 kbit/s en bas débit) | mode rapide NXP à 53 kbit/s ; ICODE 3 jusqu'à 212 kbit/s | modulation de charge sur une sous-porteuse à 423,75 kHz |

---

## La jungle des sigles : normes, types du NFC Forum et ce qui n'est pas du NFC

Chaque annonce mélange trois systèmes de nommage : les normes ISO qui définissent la partie radio, les types de tags du NFC Forum qui définissent l'organisation des données, et les noms commerciaux des fabricants. Voici la carte.

### Les normes

| Norme | Ce qu'elle définit | Nom NFC Forum | Exemples de puces |
| --- | --- | --- | --- |
| ISO/IEC 14443 Type A (parties 1 à 3) | cartes de proximité, 106 kbit/s, modulation Type A, anticollision, l'UID | NFC-A | NTAG, MIFARE Ultralight, MIFARE Classic, Topaz |
| ISO/IEC 14443 Type B | la même chose, avec une autre modulation et pas d'UID au même sens | NFC-B | ST SRI512, cartes de transport Calypso, beaucoup de passeports électroniques |
| ISO/IEC 14443-4 | le protocole de transport au-dessus de A ou B, appelé ISO-DEP | ISO-DEP | DESFire, NTAG 424 DNA, MIFARE Plus en SL3, cartes bancaires, passeports |
| ISO/IEC 7816-4 | le langage de commande (APDU) et le système de fichiers utilisés au-dessus d'ISO-DEP | | tout ce qui figure à la ligne précédente |
| ISO/IEC 7816-6 | entre autres, le registre des codes fabricants de puces | | le premier octet de l'UID |
| ISO/IEC 15693 | cartes de voisinage, jusqu'à un mètre avec le bon lecteur, UID de 8 octets | NFC-V | ICODE, ST25TV, ST25DV, TI Tag-it, NTAG 5 |
| JIS X 6319-4 | le FeliCa de Sony | NFC-F | FeliCa Lite-S, Suica, Octopus |
| ISO/IEC 18092 | le NFC lui-même (NFCIP-1) : le pair-à-pair et les modes passifs qu'utilisent les téléphones | | votre téléphone |

### Les types de tags du NFC Forum

Le NFC Forum n'a pas conçu de puces. Il a rédigé cinq recettes pour stocker un message **NDEF** (le format conteneur que tous les téléphones comprennent) sur des puces qui existaient déjà. C'est ce que signifie « tag de Type 2 » : pas une puce, mais une organisation de la mémoire.

| Type Forum | Radio | Modèle de mémoire | Puces typiques | Prise en charge par les téléphones |
| --- | --- | --- | --- | --- |
| Type 1 | NFC-A | blocs de 8 octets, verrouillables une seule fois | Topaz d'Innovision/Broadcom | lu sur les deux plateformes ; le NFC Forum a retiré le Type 1 de sa version 2021 des spécifications |
| Type 2 | NFC-A | pages de 4 octets, un capability container en page 3, des blocs TLV | NTAG21x, MIFARE Ultralight, ST25TN, Fudan FM11NT0x1, Infineon my-d move | iPhone et Android, y compris la lecture en arrière-plan sur iPhone |
| Type 3 | NFC-F | blocs de 16 octets, codes de service | FeliCa Lite-S, FeliCa Standard | iPhone et Android (la prise en charge du NFC-F est obligatoire sur Android) |
| Type 4 | ISO-DEP sur NFC-A ou NFC-B | fichiers sélectionnés par APDU : un fichier CC et un fichier NDEF | NTAG 424 DNA, DESFire, ST25TA | iPhone et Android |
| Type 5 | NFC-V | blocs de 4 octets, CC dans le bloc 0 | ICODE SLIX et SLIX2, ST25TV, ST25DV, NTAG 5 | iPhone depuis iOS 13, Android via NfcV ; ajouté au Forum en 2015 |

Deux choses manquent volontairement à cette liste. Le **MIFARE Classic** n'est pas du tout un type de tag du Forum ; le NDEF sur Classic est une correspondance définie par NXP, qu'Android prend en charge sur certains téléphones et iOS sur aucun. Et les recettes du Forum ne disent rien de la sécurité. Un tag de Type 2 peut être un simple NTAG213 ou un NTAG 224 DNA avec authentification AES-128 ; un tag de Type 4 peut être un ST25TA02K tout nu ou une carte bancaire. Le type vous dit comment le message NDEF est stocké, pas qui peut y accéder.

### Ce qui n'est pas un tag NFC

La moitié des messages « pourquoi mon téléphone ne lit pas ça » que je reçois concernent des objets qui n'ont jamais été du NFC. La bobine NFC d'un téléphone est accordée sur 13,56 MHz et parle les protocoles ci-dessus. Tout le reste lui est invisible, aussi ressemblant à un tag que ce soit.

| Ça ressemble à un tag, mais | Fréquence | Ce que c'est vraiment | Un téléphone peut-il le lire |
| --- | --- | --- | --- |
| un badge de bureau ou de parking sans puce visible | 125 kHz | RFID basse fréquence : identifiants en lecture seule EM4100, HID Prox, T5577 réinscriptibles | non, et aucune app ne peut y changer quoi que ce soit |
| une puce d'identification pour animal | 134,2 kHz | transpondeur FDX-B ISO 11784/11785 | non |
| une étiquette antivol de magasin ou de logistique | 860 à 960 MHz | RFID UHF RAIN, EPC Gen2 | non |
| une clé d'hôtel ou une ancienne carte de transport | 13,56 MHz | MIFARE Classic ou une carte HF propriétaire | Android parfois, l'iPhone n'affiche que l'UID |
| une carte bancaire | 13,56 MHz | une carte à puce EMV qui parle ISO-DEP | techniquement oui ; une app peut lire la liste des applications de la carte et ses données publiques, mais Core NFC d'Apple bloque la lecture des cartes de paiement et aucun téléphone ne peut en produire une copie fonctionnelle |
| un passeport | 13,56 MHz | un document électronique ICAO 9303 | oui, avec la bande de lecture optique comme clé ; [je l'ai développé](/blog/read-passport-nfc-chip/) |
| une clé de sécurité | 13,56 MHz | un authentificateur FIDO2 sur ISO 7816 | oui pour le navigateur, pas en tant que tag |

C'est le badge 125 kHz qui fait mal. Il fonctionne sur le lecteur de la porte, c'est une carte en plastique avec une bobine dedans, et il ne parlera jamais à un téléphone. J'ai expliqué [pourquoi un iPhone ne peut pas ouvrir la porte de votre immeuble](/blog/iphone-rfid-condo-doors/), parce que la réponse honnête est une affaire de matériel.

---

## Comment lire une fiche technique ou une annonce

La première page d'une fiche technique contient tous les chiffres dont vous avez besoin, et une bonne annonce les recopie. Voici ce que chacun signifie, et lesquels mentent.

### Mémoire utilisateur ou mémoire totale

Chaque puce a plus d'EEPROM que vous ne pouvez en utiliser. Un NTAG213 compte 180 octets au total, dont 144 sont à vous ; les 36 autres contiennent l'UID, les bits de verrouillage, le capability container et les pages de configuration. Un MIFARE Classic 1K a 1024 octets dont 752 de données, parce que chaque secteur perd un bloc au profit de ses clés. Les annonces citent toujours le chiffre le plus gros. Celui qui compte, c'est la **mémoire utilisateur**, et même elle ne correspond pas à ce qui tient dans un message NDEF, ce qui fait l'objet de la section suivante.

### L'UID

L'identifiant unique est gravé en usine et ne peut pas être modifié, sauf sur les clones fabriqués justement pour ça. Il existe trois longueurs :

| Longueur d'UID | Où | Remarques |
| --- | --- | --- |
| 4 octets | anciens MIFARE Classic, cartes Classic bon marché actuelles | NXP les appelle « identifiants non uniques » (NUID), parce que 4 octets ne suffisaient plus. Un UID de 4 octets ne contient aucun code fabricant. Un premier octet à 08 signifie que la puce génère un identifiant aléatoire à chaque scan |
| 7 octets | NTAG, Ultralight, DESFire, NTAG 424 DNA, Classic EV1 (en option), l'IDm de 8 octets du FeliCa en est un cousin | le premier octet est le code fabricant |
| 8 octets | toutes les puces ISO 15693 | le premier octet vaut toujours E0, le deuxième est le code fabricant |

Le code fabricant provient du registre ISO/IEC 7816-6, et c'est la vérification honnête la plus rapide qui soit sur une annonce. Si un tag « NXP authentique » renvoie 1D, il a été fabriqué par Fudan.

| Code | Fabricant |
| --- | --- |
| 01 | Motorola |
| 02 | STMicroelectronics |
| 03 | Hitachi |
| 04 | NXP Semiconductors |
| 05 | Infineon |
| 07 | Texas Instruments |
| 08 | Fujitsu |
| 16 | EM Microelectronic |
| 1A | Sony |
| 1D | Shanghai Fudan Microelectronics |
| 25 | Innovision (Topaz) |
| 2C | Impinj |
| 2E | Broadcom |

### ATQA, SAK et GET_VERSION : comment un lecteur distingue les puces

Quand une puce Type A répond à un téléphone, elle envoie deux petites valeurs, l'**ATQA** et le **SAK**. Les lecteurs, mon app comprise, se servent du SAK pour ranger les puces par famille, parce que ses bits indiquent si la puce parle ISO-DEP et à quelle grande famille elle appartient. La note d'identification de NXP elle-même dit, en gras, de ne se servir de l'ATQA pour rien, parce qu'il entre en collision et induit en erreur, et je l'ai constaté moi aussi.

| SAK | Famille | ATQA généralement observé |
| --- | --- | --- |
| 00 | NTAG et MIFARE Ultralight, tous sans exception | 00 44 |
| 08 | MIFARE Classic 1K, MIFARE Plus 2K ou SE en niveau de sécurité 1 | 00 04 (UID de 4 octets), 00 44 (7 octets) |
| 09 | MIFARE Classic Mini | |
| 18 | MIFARE Classic 4K, MIFARE Plus 4K en niveau 1 | 00 02 ou 00 42 |
| 10, 11 | MIFARE Plus X en niveau 2 | |
| 20 | tout ce qui parle ISO-DEP : DESFire, NTAG 424 DNA, Plus en niveau 3, cartes bancaires, JCOP | 03 44 (DESFire, 424), 03 04 avec identifiant aléatoire |

Comme tous les NTAG et tous les Ultralight répondent SAK 00, distinguer un NTAG213 d'un NTAG216 ou d'un Ultralight EV1 demande une commande de plus : **GET_VERSION**. Elle renvoie huit octets, dont trois font le travail. L'octet 2 est le type de produit (03 Ultralight, 04 NTAG, 07 NTAG I2C, 01 DESFire, 02 Plus, 08 DESFire Light), l'octet 4 la génération, et l'octet 6 code la taille de la mémoire. C'est ainsi que NFC.cool sait ce qu'il a sous les yeux, et c'est aussi la première question qu'une console qui lit les Amiibo pose à un tag.

| Puce | Réponse à GET_VERSION |
| --- | --- |
| NTAG213 | 00 04 04 02 01 00 0F 03 |
| NTAG215 | 00 04 04 02 01 00 11 03 |
| NTAG216 | 00 04 04 02 01 00 13 03 |
| NTAG210 | 00 04 04 01 01 00 0B 03 |
| NTAG212 | 00 04 04 01 01 00 0E 03 |
| Ultralight EV1 48 o | 00 04 03 01 01 00 0B 03 |
| Ultralight EV1 128 o | 00 04 03 01 01 00 0E 03 |
| Ultralight AES | 00 04 03 0x 04 00 0F 03 |
| NTAG 223 DNA | 00 04 04 02 04 00 0F 03 |
| NTAG 424 DNA (encapsulée dans une APDU) | fabricant 04, type 04, version majeure 30, mémoire 11 |

Il existe des puces sans GET_VERSION : l'Ultralight d'origine, l'Ultralight C et l'ancien NTAG203 ne l'ont jamais eue, pas plus que la plupart des clones. Cette absence est en soi une empreinte.

### Endurance, rétention, température

Ce sont les trois chiffres que les annonces ne citent presque jamais et que les fiches techniques donnent toujours.

- L'**endurance en écriture**, c'est le nombre de fois qu'un octet peut être réécrit. 100 000 cycles, c'est le plancher pour tout ce qui est actuel ; les puces de l'époque Classic et l'Ultralight d'origine sont données pour 10 000. Le DESFire EV3 et la famille ST25DV sont donnés pour 1 000 000 en valeur typique.
- La **rétention des données**, c'est la durée pendant laquelle les octets survivent sans alimentation. 10 ans, c'est l'ancien standard, 50 ans, c'est ce que NXP annonce pour le NTAG 424 DNA et la famille ICODE SLIX, et ST annonce 200 ans pour ses puces Type 4 ST25TA. La rétention est spécifiée à température ambiante ; la chaleur la raccourcit.
- La **température de fonctionnement** va de -25 à +70 °C pour la plupart des puces grand public de NXP, de -40 à +85 °C pour les composants ST et EM, et jusqu'à 105 °C pour l'ICODE 3. La limite n'est généralement pas la puce, mais l'adhésif et le support.

### L'échelle de sécurité

C'est la partie d'une annonce qui ment le plus. « Chiffré », « sécurisé », « anti-clonage » s'impriment sur des tags dont la seule protection est un mot de passe de 32 bits envoyé en clair. Voici l'échelle, du bas vers le haut, et chaque puce de ce guide se trouve sur l'un de ses barreaux.

| Barreau | Ce que c'est | Puces | Ce que ça empêche |
| --- | --- | --- | --- |
| 0. Rien | n'importe qui peut lire et écrire | Ultralight d'origine, NTAG203, TI Tag-it Standard, Topaz | rien |
| 1. Bits de verrouillage | des bits à sens unique qui passent des pages en lecture seule pour toujours | toutes les puces Type 2 et Type 5 | la réécriture ; n'empêche pas la copie |
| 2. Mot de passe | un mot de passe de 32 bits plus un accusé de réception de 16 bits (PACK), avec une limite facultative de tentatives ratées ; sur les NTAG21x, le mot de passe passe dans l'air en clair | NTAG21x, Ultralight EV1, NTAG 223 DNA, famille ICODE SLIX (32 bits), ST25TV (32 ou 64 bits), ST25TA (128 bits) | la réécriture opportuniste par un inconnu muni d'une app ; pas un attaquant déterminé équipé d'un renifleur |
| 3. CRYPTO1 | le chiffrement par flot 48 bits de NXP, qui date des années 1990 | MIFARE Classic, MIFARE Plus en niveau 1 | plus rien depuis 2008 ; à traiter comme le barreau 0 |
| 4. Triple DES | authentification mutuelle avec une clé de 16 octets | Ultralight C, FeliCa Lite-S, DESFire D40 et EV1 | la copie du contenu sans la clé |
| 5. AES-128 | authentification mutuelle, messagerie sécurisée | Ultralight AES, NTAG 224 DNA, DESFire EV1 à EV3, DESFire Light, Plus en niveau 3, ICODE DNA, FeliCa Standard, EM4425 | la même chose, avec un algorithme toujours considéré comme sûr |
| 6. AES plus SUN | chaque scan produit une nouvelle preuve cryptographique dans l'URL elle-même | NTAG 424 DNA, NTAG 22x DNA, DESFire EV3 | le clonage, parce qu'une copie ne peut pas signer le scan suivant |
| 7. Boucle anti-effraction | un fil qui signale, de façon permanente, s'il a déjà été coupé | NTAG 213 TT, NTAG 424 DNA TT, NTAG 22x DNA StatusDetect, ICODE 3 TT, ST25TV02KC-T | la réutilisation d'un scellé |

Deux fonctions se placent à côté de l'échelle plutôt que dessus. Une **signature d'originalité** est une signature numérique de l'UID, écrite par le fabricant, qui permet à un lecteur de vérifier que la puce vient bien de NXP ou de ST. Elle n'empêche pas la copie, puisqu'un clone peut embarquer une signature copiée, et NXP le dit dans sa propre note d'application. Quant aux **compteurs** (un compteur de lectures de 24 bits sur les NTAG213/215/216, trois compteurs à sens unique sur l'Ultralight EV1, un compteur d'écritures de 16 bits sur le SLIX2), ils servent les cas d'usage, pas la sécurité, sauf s'ils sont intégrés à un message SUN.

---

## Le NDEF et ce qui tient vraiment sur un tag

Le **NDEF** (NFC Data Exchange Format), c'est l'enveloppe. Un téléphone ne lit pas « une URL » sur un tag ; il lit un message NDEF qui contient un enregistrement URI, et l'enveloppe a un poids. Connaître ce poids, c'est ce qui permet de répondre à la question « est-ce que mon lien tiendra sur un NTAG213 ».

### L'enregistrement

Chaque enregistrement commence par un octet de drapeaux (début de message, fin de message, enregistrement court, et un format de nom de type sur trois bits), puis la longueur du type, la longueur de la charge utile (un octet si elle fait moins de 256 octets, quatre sinon), le type lui-même et la charge utile. Un enregistrement URL court coûte donc 4 octets d'en-tête avant le premier octet de votre lien.

| Enregistrement | Type | Charge utile |
| --- | --- | --- |
| URL | type well-known `U` | un octet de préfixe plus le reste de l'URL en UTF-8 |
| Texte | type well-known `T` | un octet d'état, un code de langue (`en`), puis le texte |
| Smart Poster | type well-known `Sp` | tout un message NDEF à l'intérieur : une URL plus des titres et une action facultatifs |
| Contact | MIME `text/vcard` | le texte de la vCard tel quel |
| Wi-Fi | MIME `application/vnd.wfa.wsc` | des attributs Wi-Fi Simple Configuration : SSID, type d'authentification, clé |
| App Android | type externe `android.com:pkg` | un nom de package ; Android ouvre cette app ou sa page sur le Play Store |

L'octet de préfixe est la seule idée astucieuse de l'enregistrement URI. Au lieu d'écrire `https://` en toutes lettres, le premier octet de la charge utile est le code d'un préfixe courant, que le téléphone remet à sa place.

| Code | Préfixe | Code | Préfixe |
| --- | --- | --- | --- |
| 00 | aucun | 12 | rtsp:// |
| 01 | http://www. | 13 | urn: |
| 02 | https://www. | 14 | pop: |
| 03 | http:// | 15 | sip: |
| 04 | https:// | 16 | sips: |
| 05 | tel: | 17 | tftp: |
| 06 | mailto: | 18 | btspp:// |
| 07 | ftp://anonymous:anonymous@ | 19 | btl2cap:// |
| 08 | ftp://ftp. | 1A | btgoep:// |
| 09 | ftps:// | 1B | tcpobex:// |
| 0A | sftp:// | 1C | irdaobex:// |
| 0B | smb:// | 1D | file:// |
| 0C | nfs:// | 1E | urn:epc:id: |
| 0D | ftp:// | 1F | urn:epc:tag: |
| 0E | dav:// | 20 | urn:epc:pat: |
| 0F | news: | 21 | urn:epc:raw: |
| 10 | telnet:// | 22 | urn:epc: |
| 11 | imap: | 23 | urn:nfc: |

Ainsi, `https://nfc.cool/` est stocké sous la forme de l'octet 04 suivi de `nfc.cool/` : neuf octets de charge utile pour une URL de dix-sept caractères. La fiche technique du NTAG 5 de NXP donne l'exemple `D1 01 0C 55 01` suivi de `nxp.com/nfc`, qui se décode en `http://www.nxp.com/nfc`.

### L'enveloppe autour de l'enregistrement

Sur un tag de Type 2 ou de Type 5, le message se trouve dans un TLV : un octet qui dit « message NDEF » (03), un octet de longueur (trois octets si le message fait 255 octets ou plus), le message, et un octet de fin (FE). Sur un tag de Type 4, il n'y a pas de TLV ; le fichier NDEF commence par une longueur sur deux octets. Et sur un NTAG213 ou un NTAG212 sorti d'usine, les cinq premiers octets de la mémoire utilisateur sont déjà occupés par un Lock Control TLV que NXP livre pré-écrit et que tout logiciel d'écriture conserve.

Voici le calcul pour un seul lien `https://`, fait à la main pour la puce que la plupart des gens achètent :

- mémoire utilisateur du NTAG213 : 144 octets
- moins le Lock Control TLV d'usine : 139
- moins l'encadrement du TLV NDEF (03, longueur, FE) : 136 octets pour le message
- moins l'en-tête de l'enregistrement (drapeaux, longueur du type, longueur de la charge utile, `U`) : 132 octets de charge utile
- moins l'octet de préfixe : **131 caractères après `https://`**

### Ce qui tient où

<div class="table-scroll">

| Tag | Zone NDEF | Caractères d'URL après https:// | vCard minimale (132 o : nom, téléphone, e-mail, URL) | vCard typique (250 à 500 o) | Enregistrement Wi-Fi (67 à 88 o) |
| --- | --- | --- | --- | --- | --- |
| NTAG210, Ultralight EV1 48 o | 48 | 40 | non | non | non |
| NTAG212 | 128 | 115 | non | non | oui |
| Ultralight EV1 128 o | 128 | 120 | non | non | oui |
| NTAG213, état d'usine | 144 | 131 | non, à 9 octets près | non | oui |
| NTAG213, TLV de verrouillage retiré | 144 | 136 | non, à 4 octets près | non | oui |
| ST25TN01K | 160 | environ 147 | oui, de justesse | non | oui |
| NTAG215 | 496 déclarés (504 utilisateur) | 483 | oui | oui, la plupart | oui |
| NTAG216 | 872 déclarés (888 utilisateur) | 859 | oui | oui | oui |
| ICODE SLIX | 112 (CC compris) | 100 | non | non | oui |
| ICODE SLIX2 | 316 | environ 300 | oui | en général | oui |
| NTAG 424 DNA | fichier NDEF de 256 octets | 249 | oui | les petites | oui |
| DESFire EV3 2K | fichier NDEF jusqu'à 2048 octets | jusqu'à 2038 | oui | oui | oui |

</div>

Deux précisions qui font trébucher. Le capability container que NXP place sur les NTAG215 et NTAG216 déclare 496 et 872 octets, moins que la mémoire utilisateur, si bien que `getMaxSize()` sous Android renvoie le chiffre le plus petit, et il a raison. Et une vCard avec un nom, un téléphone, un e-mail et une URL pèse 132 octets avant l'enveloppe et 148 après, ce qui explique qu'elle ne tienne pas tout à fait sur un NTAG213 et que les vendeurs de cartes de visite partent par défaut sur un NTAG215 ou un NTAG216. Les chiffres arrondis que j'ai utilisés dans le guide du débutant (environ 130, 480 et 850 caractères) sont ces mêmes valeurs, un peu arrondies.

---

## Plans mémoire : où se trouve quoi sur la puce

Si vous avez déjà fait un dump d'un tag dans NFC.cool en restant perplexe devant l'hexadécimal, voici la grille de décodage.

### Type 2 : le plan des pages du NTAG213

| Page | Octets | Contenu |
| --- | --- | --- |
| 00 | 4 | octets 0 à 2 de l'UID et un octet de contrôle |
| 01 | 4 | octets 3 à 6 de l'UID |
| 02 | 4 | octet de contrôle, un octet interne, deux octets de verrouillage statique pour les pages 3 à 15 |
| 03 | 4 | capability container : E1 10 12 00 (nombre magique, version 1.0, 18 x 8 = 144 octets, lecture et écriture autorisées) |
| 04 à 27 | 144 | mémoire utilisateur, où vivent les TLV |
| 28 | 4 | octets de verrouillage dynamique pour les pages 16 et suivantes |
| 29 | 4 | CFG0 : configuration du miroir, la page où atterrit le miroir, et AUTH0, la première page protégée par mot de passe |
| 2A | 4 | CFG1 : octet ACCESS avec le bit de protection en lecture ou en écriture, et AUTHLIM, la limite de tentatives ratées |
| 2B | 4 | PWD, le mot de passe, en écriture seule |
| 2C | 4 | PACK, l'accusé de réception sur deux octets, plus deux octets réservés |

Un NTAG215 a la même structure, avec une mémoire utilisateur qui va jusqu'à la page 81 et la configuration de 83 à 86 ; un NTAG216 va jusqu'à E1, avec la configuration de E3 à E6. Les bits du capability container sont à sens unique : une fois le drapeau de lecture seule activé dans l'octet 3, ou un bit de verrouillage activé, impossible de revenir en arrière, et c'est précisément ce qu'écrit le « verrouillage définitif » de l'app. Un « formatage » sur un Type 2 écrit un TLV NDEF vide (03 00 FE) en page 4 ; il ne remet pas la mémoire à zéro, si bien que les anciennes données restent lisibles par un dump tant qu'elles n'ont pas été écrasées.

### Type 4 : le système de fichiers du NTAG 424 DNA

Il n'y a pas de pages. Une application ISO 7816 nommée D2760000850101 contient trois fichiers : un capability container de 32 octets (E103), un fichier NDEF de 256 octets (E104) et un fichier propriétaire de 128 octets (E105). Chaque fichier a ses propres droits de lecture, d'écriture et de modification, chacun associé à l'une des cinq clés AES. Le DESFire fonctionne de la même façon mais vous laisse créer vos propres applications et fichiers ; les trois du NTAG 424 DNA sont figés, c'est pourquoi je l'ai décrit comme [un petit coffre-fort verrouillé à trois tiroirs](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/).

### Type 5 : les blocs ISO 15693

Des blocs de quatre octets, numérotés à partir de zéro, avec le capability container dans le bloc 0 (E1 40 suivi de la taille) et le TLV NDEF qui commence au bloc 1. L'UID, l'AFI, le DSFID et l'état de verrouillage se trouvent en dehors des blocs adressables et se lisent avec une commande distincte, GET SYSTEM INFORMATION. Sur un ICODE SLIX2, le dernier bloc adressable, le 79, est le compteur de 16 bits ; sur l'ICODE 3, le bloc 75 contient un compteur de 24 bits et les blocs 76 et suivants forment une zone de configuration séparée.

### MIFARE Classic : secteurs, trailers et répertoire

Un Classic 1K compte 16 secteurs de 4 blocs de 16 octets. Le dernier bloc de chaque secteur est le **sector trailer** : clé A, trois octets d'accès, un octet libre, clé B. Le bloc 0 du secteur 0 est le bloc fabricant qui contient l'UID. Pour mettre du NDEF sur un Classic, NXP a défini un répertoire : le secteur 0 devient le **MIFARE Application Directory** (MAD), lisible avec la clé publique A0 A1 A2 A3 A4 A5, et il indique quels secteurs contiennent du NDEF sous le code d'application 03 E1. Ces secteurs utilisent une seconde clé publique, D3 F7 D3 F7 D3 F7. Une carte neuve sortie d'usine a toutes ses clés à FF FF FF FF FF FF. Quand NFC.cool formate une carte Classic sur Android, c'est ce répertoire et ces clés qu'il écrit, et c'est pour cela qu'une carte Classic formatée se lit sur certains téléphones Android et sur aucun iPhone.

---

## Le tableau de décision

Commencez ici si vous connaissez l'usage et cherchez la puce.

| L'usage | La puce | Pourquoi | Prise en charge par NFC.cool |
| --- | --- | --- | --- |
| un lien, un réseau Wi-Fi, un déclencheur de raccourci, un autocollant sur un objet | NTAG213 | 131 caractères d'URL, mot de passe, compteur, huit centimes | complète sur iPhone, Android, iPad et Mac |
| une carte de contact, un lien plus long, tout ce qui doit pouvoir évoluer | NTAG216 | 859 caractères, les mêmes fonctions, la puce sur laquelle je fais mes tests | complète |
| Amiibo | NTAG215 | la console vérifie qu'il s'agit exactement de cette puce et de ses 504 octets | sauvegarde et restauration sur les deux plateformes |
| compter les scans sur une affiche, une carte de visite, un appareil de démonstration | NTAG213, 215 ou 216 | le compteur de lectures matériel et le miroir ASCII, et ce sont les trois puces que gère le Tap Counter de l'app | [Tap Counter](/blog/count-nfc-tag-scans/) sur les deux plateformes |
| une antenne minuscule, une bague, un tag jetable bon marché | NTAG 210µ ou Ultralight EV1 48 o | 48 octets, 17 pF pour les petites bobines, pas de mot de passe | lecture et écriture |
| prouver qu'un produit est authentique, en un scan, sans app | NTAG 424 DNA | chaque scan est signé en AES-128 ; une copie en est incapable | configuration complète, y compris la vérification de la signature |
| la même chose, mais sous forme d'autocollant Type 2 bon marché | NTAG 223 DNA | SUN sur une puce Type 2, 144 octets | s'affiche comme un tag Type 2 ; la configuration SUN n'est pas encore prise en charge |
| un scellé qui signale qu'il a été ouvert | NTAG 213 TT, NTAG 424 DNA TT, ST25TV02KC-T | un fil anti-effraction dont l'état est mémorisé définitivement | 424 TT entièrement ; les autres sont lus comme leur puce de base |
| un inventaire ou une bibliothèque lus à distance par un portique | ICODE SLIX2 ou ICODE 3 | l'ISO 15693 se lit à 1 à 1,5 mètre avec un vrai lecteur, et se lit toujours au téléphone | lecture, écriture, formatage sur les deux plateformes |
| une bobine d'imprimante 3D que l'imprimante elle-même doit lire | ICODE SLIX2 | la norme [OpenPrintTag](/blog/openprinttag-read-write-nfc-spools-phone/) attend du NFC-V | lecture et écriture |
| une porte, un tourniquet, un réseau de transport | DESFire EV3 ou MIFARE Plus EV2 | AES, vraie gestion des clés, sécurité certifiée | identifie et extrait ce qui est public ; aucune opération sur les clés |
| un capteur sans pile qui dialogue avec un microcontrôleur | NTAG I2C plus, ST25DV, NTAG 5 | une interface I2C et la récupération d'énergie sur la même puce | lu par sa face NFC |
| tout ce qui touche au transport ou à la monnaie électronique au Japon | FeliCa | c'est ce que parlent les lecteurs | lecture ; écriture NDEF sur Lite-S et Standard sur iPhone |
| un tag sur une surface métallique | n'importe laquelle des puces ci-dessus dans un format on-metal | c'est la couche de ferrite, pas la puce, qui fait fonctionner le tout | comme la puce |
| sous la peau | NTAG216 (xNT), NTAG I2C (xSIID), DESFire (xDF) | les petites antennes en verre ont besoin du point idéal du téléphone | comme la puce |

Ce qui ne figure pas dans le tableau : le MIFARE Classic. Il n'existe aucun usage en 2026 pour lequel j'achèterais une puce Classic, et la section ci-dessous explique pourquoi.

---

## Famille par famille

Chaque famille a droit au même traitement : un tableau de caractéristiques tiré de la fiche technique, l'usage auquel la puce est destinée, ce qu'en font les téléphones, et une note « En pratique » quand j'en ai une.

### NTAG 21x : la famille des autocollants

C'est la puce de presque tous les autocollants, jetons et cartes NFC vendus au grand public, et NXP les liste toujours toutes comme actives en 2026, alors que la fiche technique n'a pas bougé depuis 2015.

<div class="table-scroll">

| Puce | Octets utilisateur / total | Mot de passe | Compteur | Miroir | Signature | Endurance / rétention | Statut |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 210µ | 48 / 64 | non | non | non | oui, reprogrammable | 100k / 10 ans | active |
| NTAG210 | 48 / 80 | 32 bits + PACK, AUTHLIM | non | UID | oui | 100k / 10 ans | active |
| NTAG212 | 128 / 164 | oui | non | UID | oui | 100k / 10 ans | active |
| NTAG213 | 144 / 180 | oui | compteur de lectures 24 bits | UID et compteur | oui | 100k / 10 ans | active |
| NTAG215 | 504 / 540 | oui | oui | oui | oui | 100k / 10 ans | active |
| NTAG216 | 888 / 924 | oui | oui | oui | oui | 100k / 10 ans | active |
| NTAG213F, NTAG216F | 144 ou 888 | oui | oui | oui | oui | 100k / 10 ans | active ; ajoute une broche de détection de champ et un mode veille pour l'intégration dans l'électronique |
| NTAG 213 TT | 144 / 184 | oui | oui | UID, compteur et état anti-effraction | oui | 100k / 10 ans | active ; ajoute un fil anti-effraction |
| NTAG203 | 144 / 168 | non, une zone OTP de 32 bits | compteur d'écritures 16 bits | non | non | 10k / 5 ans | fin de vie, remplacée par le NTAG213 |

</div>

Toutes sont des NFC Forum Type 2, ISO/IEC 14443 Type A, avec un UID de 7 octets, 106 kbit/s, et une plage de -25 à +70 °C. Les NTAG210 et NTAG212 ont une capacité d'entrée de 17 pF pour les petites antennes ; les 213, 215 et 216 sont à 50 pF. La signature d'originalité est un ECDSA sur la courbe secp128r1, de 32 octets, lue avec la commande READ_SIG ; la clé de vérification figure dans une note d'application NXP non publique, c'est pourquoi presque aucune app grand public ne la vérifie.

Les trois fonctions qui comptent en pratique sont le **mot de passe** (un PWD de 32 bits, un PACK de 16 bits que le tag renvoie en réponse, AUTH0 pour indiquer où commence la protection, et AUTHLIM pour bloquer le tag après un nombre choisi de mauvaises tentatives), le **compteur NFC** (24 bits, incrémenté une fois par session de lecture, lisible avec une commande dédiée), et le **miroir ASCII**, qui insère l'UID et le compteur sous forme de texte dans votre message NDEF, si bien qu'une simple URL devient `https://example.com/?u=04A1...&c=000123` à chaque scan. Les têtes de brosse Philips Sonicare dont j'ai parlé utilisent un NTAG213 avec AUTHLIM réglé sur trois, et c'est ainsi qu'[une tête de brosse se verrouille d'elle-même](/blog/reset-sonicare-brush-head-nfc/) si vous vous trompez.

> **En pratique :** ce sont les puces sur lesquelles je teste chaque version, et le NTAG216 est celle que je recommande quand quelqu'un veut acheter un seul lot et ne plus y penser. Le mot de passe vaut la peine d'être défini sur tout ce que vous laissez dans un lieu public ; il arrête la personne qui a une app gratuite, c'est-à-dire la plupart des gens. Il n'arrête pas quelqu'un équipé d'un renifleur, parce que le mot de passe lui-même passe dans l'air en clair, et je le dis franchement dans l'app.

Côté téléphones : lecture et écriture NDEF sur tous, lecture en arrière-plan des enregistrements URL sur iPhone, et accès brut sur les deux plateformes pour le mot de passe, le compteur et le miroir. NFC.cool fait tout cela sur iPhone, sur Android, et via un lecteur USB sur iPad et Mac.

### NTAG DNA : celles qui signent chaque scan

Trois générations, dont deux encore fabriquées.

<div class="table-scroll">

| Puce | Type Forum | Octets utilisateur | Clés | SUN | Signature | Endurance / rétention | Statut |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 413 DNA | Type 4 | 160 (32 CC + 128 NDEF) | 3 AES-128 | oui, compteur 24 bits | ECC | 200k / 50 ans | plus fabriquée |
| NTAG 424 DNA | Type 4 | 416 (32 + 256 + 128) | 5 AES-128, option LRP, option Random ID | oui, avec option d'UID chiffré | ECDSA secp224r1, 56 octets, plus des clés d'originalité AES | 200k / 50 ans | active ; Common Criteria EAL4 |
| NTAG 424 DNA TT | Type 4 | 416 | 5 AES-128 | oui, plus l'état anti-effraction dans le message | identique | 200k / 50 ans | active |
| NTAG 223 DNA | Type 2 | 144 / 240 | une clé SUN de 16 octets plus un mot de passe de 32 bits | oui, compteur 24 bits | ECDSA secp192r1, 48 octets | 100k / 10 ans | active depuis février 2022 |
| NTAG 224 DNA | Type 2 | 208 / 304 | l'authentification mutuelle AES-128 remplace le mot de passe | oui | identique | 100k / 10 ans | active |
| NTAG 223 et 224 DNA StatusDetect | Type 2 | comme ci-dessus | comme ci-dessus | oui, avec l'état du capteur dans le message | identique | 100k / 10 ans | active |

</div>

Le **SUN**, pour Secure Unique NFC, est la fonction qui justifie de les payer trois fois le prix d'un NTAG213 : le tag recopie son UID et son compteur de lectures dans l'URL et y ajoute un CMAC AES-128 calculé sur ces valeurs, recalculé à chaque scan. Le serveur vérifie le MAC ; un tag cloné n'a pas la clé et échoue. J'ai tout détaillé, y compris le mode LRP et les cinq clés, dans [l'article sur le NTAG 424 DNA](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/), alors voici seulement ce qui a changé depuis : NXP vend désormais aussi le NTAG 426Q DNA et le NTAG X DNA, une puce Type 4 connectée de 16 ko certifiée EAL6+, si bien que le 424 n'est plus la puce DNA la plus récente, seulement celle que vous pouvez réellement acheter sous forme d'autocollant.

La famille 22x DNA est la nouvelle venue intéressante : du SUN sur une puce Type 2, ce qui veut dire que l'autocollant coûte moins cher et que le téléphone le lit comme un NTAG ordinaire. Les variantes **StatusDetect** ajoutent un capteur : soit une boucle conductrice qui enregistre, de façon irréversible, qu'elle a été coupée, soit une mesure de capacité de 0 à 11 pF entre deux broches, que NXP met en avant pour le niveau de liquide, l'humidité et la pression.

> **En pratique :** j'ai acheté mes premiers tags NTAG 424 DNA sur AliExpress pour quelques euros, et j'ai construit autour d'eux toutes les fonctions 424 de l'app : changement de clés, SUN en mode clair et chiffré, droits d'accès aux fichiers, le fichier coffre-fort, l'état anti-effraction. Le 424 est aussi la seule puce pour laquelle NFC.cool vérifie la signature d'originalité avec la clé publique publiée par NXP et affiche « Genuine NXP ». Les 22x DNA, je ne les connais que sur le papier.

### MIFARE Ultralight : la famille des titres de transport

L'Ultralight est le grand frère du NTAG. Même interface radio, mêmes pages de 4 octets, même SAK, et à partir de l'EV1 les mêmes commandes. La différence tient à la vocation : l'Ultralight a été conçu pour les tickets à trajet unique, la gamme NTAG pour des autocollants porteurs d'une URL, c'est pourquoi le NTAG est livré avec un capability container pré-écrit et pas l'Ultralight.

<div class="table-scroll">

| Puce | Octets utilisateur / total | Protection | Compteur | Signature | Endurance / rétention | Statut |
| --- | --- | --- | --- | --- | --- | --- |
| MIFARE Ultralight (MF0ICU1) | 48 / 64 | bits de verrouillage et une zone OTP de 32 bits | non | non | 10k / 5 ans | plus fabriquée |
| Ultralight C | 144 / 192 | authentification mutuelle triple DES, clé de 16 octets | 16 bits, à sens unique | non | 100k / 10 ans | déconseillée pour les nouveaux projets, remplacée par l'Ultralight AES |
| Ultralight EV1 | 48 / 80 ou 128 / 164 | mot de passe de 32 bits, AUTHLIM | trois compteurs indépendants de 24 bits à sens unique | oui, 32 octets | 100k / 10 ans | active |
| Ultralight AES | 144 / 240 | authentification mutuelle AES-128, messagerie CMAC, option Random ID | trois compteurs de 24 bits | oui, plus une clé d'originalité AES | 100k / 10 ans | active depuis février 2022, Common Criteria EAL3+ |
| Ultralight Nano | 40 / 56 | bits de verrouillage et OTP | non | oui | 100k / 10 ans | disparue du catalogue NXP sans avis que j'aie pu trouver |

</div>

Les trois compteurs à sens unique de l'Ultralight EV1 sont sa marque distinctive : un exploitant de transport décompte des trajets et la puce refuse de revenir en arrière. L'Ultralight AES est la réponse discrète à « je veux un NTAG213 avec une vraie authentification » : les mêmes 144 octets, de l'AES-128 au lieu d'un mot de passe, sur un tag Type 2 que n'importe quel téléphone sait lire.

Côté téléphones : tout ce qui figure ici est lu comme un tag Type 2. Core NFC d'Apple expose une famille `.ultralight` et permet à une app d'envoyer des commandes natives ; Android propose une classe `MifareUltralight`, facultative mais présente sur tous les téléphones que j'ai vus. NFC.cool nomme les variantes EV1 et l'AES grâce à GET_VERSION et traite le mot de passe de l'EV1 comme celui du NTAG ; l'authentification AES elle-même, l'app ne la fait pas.

### MIFARE Classic, Plus et DESFire : la famille du contrôle d'accès

Trois familles dans une seule section, parce qu'elles racontent une seule histoire : le Classic a été cassé, le Plus a servi de voie de migration, et le DESFire est là où le secteur a fini par s'installer.

Le **MIFARE Classic**, c'est la puce de votre ancienne clé d'hôtel, de votre carte de salle de sport et d'un très grand nombre de badges de bureau. Ce n'est pas un type de tag du NFC Forum. Il a son propre algorithme de chiffrement, CRYPTO1, que deux équipes de chercheurs ont rétro-conçu en 2008 : Nohl et Plötz en observant le silicium au microscope, et l'équipe de l'université Radboud en étudiant le protocole, qui a récupéré une clé « à partir d'une ou deux tentatives d'authentification seulement avec un lecteur authentique, en moins d'une seconde ». NXP a saisi la justice pour empêcher la publication du second article, et a perdu. Seize ans plus tard, en août 2024, Quarkslab a révélé une porte dérobée matérielle dans le Fudan FM11RF08S, la puce compatible Classic la plus répandue des cinq dernières années, et a découvert une clé de porte dérobée plus ancienne, partagée par des puces Fudan antérieures, certaines puces Infineon et même certaines puces NXP datant des environs de 2000. Le Classic n'est pas un produit de sécurité, et la page produit de NXP pour le Classic EV1 indique désormais « déconseillé pour les nouveaux projets » et renvoie vers le DESFire Light.

<div class="table-scroll">

| Puce | Octets utilisateur / total | UID | Protection | Endurance / rétention | Statut |
| --- | --- | --- | --- | --- | --- |
| Classic Mini | 224 / 320 | 4 octets | CRYPTO1 | 100k / 10 ans | abandonnée |
| Classic 1K | 752 / 1024 | NUID de 4 octets | CRYPTO1 | 100k / 10 ans | abandonnée ; EV1 déconseillée pour les nouveaux projets |
| Classic 4K | 3440 / 4096 | NUID de 4 octets | CRYPTO1 | 100k / 10 ans | abandonnée ; EV1 déconseillée |
| Classic EV1 1K et 4K | comme ci-dessus | 7 ou 4 octets, option d'identifiant aléatoire | CRYPTO1 ; contrôle d'originalité sur la 1K seulement | 100k minimum / 10 ans | déconseillée pour les nouveaux projets |

</div>

La réponse franche pour l'iPhone, parce qu'on me pose la question chaque semaine : **un iPhone ne peut pas lire le contenu d'une carte MIFARE Classic, et aucune app ne peut y changer quoi que ce soit.** Core NFC d'Apple n'a pas de famille Classic dans son API, et la documentation de sa commande MIFARE dit clairement qu'elle « ne prend pas en charge le protocole Crypto1 ». Le téléphone voit l'UID et le SAK, mon app en déduit la famille, et ça s'arrête là. Android, c'est autre chose : la classe `MifareClassic` est facultative, implémentée par les téléphones dont le contrôleur NFC intègre CRYPTO1 en matériel (c'est le cas des contrôleurs NXP ; les puces Broadcom de toute une génération de Nexus et de Galaxy, non), et sur ces téléphones NFC.cool lit chaque secteur qu'ouvre la clé d'usine et peut formater une carte neuve pour le NDEF.

Le **MIFARE Plus**, c'est le plan mémoire du Classic avec de l'AES-128 greffé dessus, pour qu'un exploitant puisse changer d'abord les cartes et ensuite les lecteurs. Il fonctionne par niveaux de sécurité : le SL1 se comporte comme un Classic (avec AES en option), le SL3 est en AES seulement via ISO-DEP, et le Plus X avait un SL2 entre les deux. Les Plus S et Plus X sont abandonnés ; le Plus SE (une 1K, 752 octets) et le Plus EV2 (2K ou 4K, EAL5+, rétention de 25 ans, endurance typique de 1 000 000 de cycles) sont actuels. En SL1, un téléphone voit SAK 08 ou 18, comme pour un Classic ; en SL3, il voit une carte ISO-DEP.

Le **MIFARE DESFire** est un tout autre animal : un petit système de fichiers avec des applications, des fichiers, des droits d'accès par fichier et jusqu'à 14 clés par application, qui parle en APDU via ISO-DEP jusqu'à 848 kbit/s.

<div class="table-scroll">

| Puce | Mémoire utilisable | Crypto | Extras | Endurance / rétention | Statut |
| --- | --- | --- | --- | --- | --- |
| DESFire D40 | 4 ko | DES, triple DES | | 100k / 10 ans | retirée en 2011 ; ses clés ont été récupérées par analyse de consommation la même année |
| DESFire EV1 | 2304, 4864 ou 7936 octets | DES, 3DES, AES-128 | compatible NFC Forum Type 4, identifiant aléatoire | 200k minimum / 10 ans | déconseillée pour les nouveaux projets |
| DESFire EV2 | 2560, 5120, 8192 ou 16384 octets | AES-128, EAL5+ | MAC de transaction, contrôle de proximité, signature d'originalité | 200k / 25 ans | déconseillée pour les nouveaux projets |
| DESFire EV3 | 2560, 5120, 8192 ou 16384 octets | AES-128, EAL5+ | tout ce qu'a l'EV2, plus SUN/SDM et un minuteur de transaction ; certificat NFC Forum Type 4 n° 58652 | 200k minimum, 1M typique / 25 ans, -25 à +85 °C | active |
| DESFire Light | 640 octets | AES-128 uniquement, option LRP, EAL4 | une application fixe avec six fichiers | 200k / 10 ans | active |

</div>

Le « 2K » d'un nom DESFire ne désigne pas 2048 octets directement utilisables. La note comparative de NXP donne les chiffres utilisables du tableau, et chaque application et chaque fichier que vous créez prend une part pour ses propres en-têtes, allouée par pages de 256 octets. Interrogez la carte avec la commande FreeMemory plutôt que de vous fier à l'étiquette. Le DESFire EV3 a aussi apporté le SUN à la famille, si bien qu'un EV3 sait faire le tour du NTAG 424 DNA consistant à signer une URL, ce dont l'EV2 est incapable.

Côté téléphones : iOS présente le DESFire comme un tag MIFARE `.desfire`, ou comme un tag ISO 7816 si l'app demande l'application NDEF ; Android passe par `IsoDep`. NFC.cool identifie la génération et la taille grâce à GetVersion et liste les applications et fichiers qu'il est autorisé à voir sans clés. Il ne s'authentifie pas auprès d'un DESFire et n'y écrit pas ; c'est le travail des outils de l'exploitant, et je préfère le dire plutôt que de faire semblant.

### ISO 15693 : la famille longue portée

Ce sont les puces conçues pour un mètre, pas pour un centimètre. Un téléphone les lit quand même (Apple depuis iOS 13, Android via `NfcV`), et GoToTags a mesuré que les tags Type 5 se lisent à environ deux fois la distance des tags Type 2 sur un iPhone, mais leur terrain naturel, c'est le portique de bibliothèque, l'étagère d'entrepôt et la blanchisserie. L'UID fait 8 octets et commence par E0, les blocs font 4 octets, et la famille ajoute trois choses que les puces Type A n'ont pas : un **AFI** (un octet de famille d'application sur lequel un lecteur peut filtrer), un **DSFID** (un octet de format de données) et l'**EAS**, le bit de surveillance électronique des articles qui fait sonner le portique d'un magasin.

**NXP ICODE.** La lignée va du SLI (2000) au SLI-S et SLI-L (2007), au SLIX et ses variantes S et L (2010), au SLIX2 (2014), à l'ICODE DNA (2016) et à l'ICODE 3 (2024). Il n'existe pas de « SLIX3 » ; une annonce qui en parle désigne l'ICODE 3, ou devine.

<div class="table-scroll">

| Puce | Octets utilisateur / total | Protection | Compteur | Signature | Endurance / rétention | Statut |
| --- | --- | --- | --- | --- | --- | --- |
| ICODE SLI | 112 / 128 | bits de verrouillage uniquement | non | non | 100k / 10 ans | fin de vie |
| ICODE SLI-S | 160 / 256 | cinq mots de passe de 32 bits : lecture, écriture, destruction, confidentialité, EAS | non | non | 100k / 10 ans | plus fabriquée |
| ICODE SLI-L | 32 / 64 | trois mots de passe | non | non | 100k / 10 ans | plus fabriquée |
| ICODE SLIX | 112 / 128 | un mot de passe de 32 bits pour l'EAS et l'AFI | non | non | 100k / 50 ans | déconseillée pour les nouveaux projets |
| ICODE SLIX-S | 160 / 256 | cinq mots de passe de 32 bits, mode confidentialité, destruction | non | non | 100k / 50 ans | active |
| ICODE SLIX-L | 32 / 64 | trois mots de passe | non | non | 100k / 50 ans | active |
| ICODE SLIX2 | 316 / 320 | cinq mots de passe de 32 bits, mode confidentialité, destruction | 16 bits, incrémenté par une commande d'écriture | oui, 32 octets | 100k / 50 ans | active |
| ICODE DNA | 252 / 256 | authentification mutuelle AES-128, trois clés | 16 bits | oui, reprogrammable | 100k / 50 ans | active |
| ICODE 3 | 300 / 304 plus une zone de configuration de 192 octets | six mots de passe de 32 bits, deux modes de confidentialité | 24 bits, peut compter les scans comme un NTAG | oui, 32 ou 48 octets, reprogrammable | 100k / 50 ans, jusqu'à 105 °C | active ; variante TagTamper disponible |

</div>

L'ICODE 3 est celle à connaître : elle recopie l'UID et son compteur de scans dans le message NDEF comme le fait un NTAG213, se lit jusqu'à 212 kbit/s et accorde elle-même son antenne. Elle n'a pas d'AES ; c'est l'ICODE DNA qui fait l'AES, et aucune des deux ne fait de SUN.

**STMicroelectronics ST25TV et ST25DV.** La gamme Type 5 de ST, et celle qui affiche les meilleurs chiffres de fiche technique de tout ce guide.

<div class="table-scroll">

| Puce | Octets utilisateur | Protection | Compteur | Signature | Endurance / rétention | Statut |
| --- | --- | --- | --- | --- | --- | --- |
| ST25TV512, ST25TV02K | 64 ou 256 | mots de passe de 32 ou 64 bits, kill, mode intraçable, anti-effraction sur la variante -AD | compteur d'événements d'écriture 16 bits | TruST25 | 100k / 60 ans | déconseillée pour les nouveaux projets |
| ST25TV512C, ST25TV02KC | 64 ou 320 | mots de passe, kill, modes silencieux et discret, anti-effraction sur la variante -T | aucun ; un code de scan unique à 3 caractères à la place | TruST25 | 100k / 60 ans | active, disponible jusqu'en 2035 |
| ST25TV04K-P | 512 | mots de passe de 64 bits, kill | non | non | 1M / 40 ans | active ; dispose d'une broche de récupération d'énergie |
| ST25TV16K, ST25TV64K et les versions KC | 2048 ou 8192 | mots de passe de 64 bits, kill | non | non | 1M / 40 ans | composants K déconseillés, composants KC actifs |
| ST25DV04K, 16K, 64K et les versions KC | 512, 2048 ou 8192 | trois mots de passe RF de 64 bits plus un mot de passe I2C | non | non | 1M / 40 ans | composants K déconseillés, composants KC actifs |
| M24LR04E, 16E, 64E | 512, 2048 ou 8192 | mots de passe de 32 bits | non | non | 1M / 40 ans | déconseillée pour les nouveaux projets |

</div>

L'**Augmented NDEF** du ST25TV02KC mérite un paragraphe, parce qu'on le vend comme une fonction de sécurité. La puce insère son UID, un champ personnalisé et un **code de scan unique** de trois caractères dans l'URL à chaque lecture, sans toucher à l'EEPROM. Le code change à chaque scan, et la fiche technique de ST dit en toutes lettres qu'il est « prévisible ». C'est un jeton de fraîcheur qui indique à votre serveur qu'il s'agit d'un nouveau scan, pas une preuve que le tag est authentique. C'est TruST25, la signature d'originalité de ST sur l'UID, qui joue le rôle de preuve d'authenticité, et comme celle de NXP, c'est une signature statique qu'un clone peut copier.

**Le reste du monde Type 5.** Les inlays Tag-it HF-I de Texas Instruments (Standard 32 octets, Pro 32 octets avec écriture protégée par mot de passe et une commande kill, Plus 256 octets) équipent toutes les bibliothèques passées au NFC avant 2015, et tous sont désormais marqués déconseillés ou obsolètes. L'EM4233 d'EM Microelectronic (208 octets, un mode confidentialité avec clé de 96 bits, rétention de 60 ans) est disponible sur demande. Le my-d d'Infineon et le MB89R118 de Fujitsu figurent dans le code d'identification de NFC.cool parce que des utilisateurs me les ont envoyés. Le NTAG 5 de NXP (link, boost, switch) est une puce ISO 15693 malgré son nom de NTAG, avec 2048 ou 512 octets, un port I2C, une récupération d'énergie jusqu'à 30 mW et une EEPROM de 1 000 000 de cycles et 40 ans : un tag connecté pour l'électronique, pas un autocollant, et un logiciel écrit pour les NTAG21x ne saura pas lui parler.

> **En pratique :** le SLIX2 est la puce qu'on trouve dans chaque bobine de filament OpenPrintTag, alors j'en ai eu un bon nombre entre les mains, et NFC.cool les lit, les écrit et les formate sur les deux plateformes. Ce que l'app ne fait pas, et je tiens à être clair là-dessus, ce sont les commandes ISO 15693 de mot de passe, de confidentialité, d'EAS et d'AFI. Les octets de commande figurent dans le code sous forme de table de référence ; les boutons, eux, ne sont pas encore là.

### Le Type 4 hors MIFARE : ST25TA

La famille ST25TA de ST, ce sont des tags Type 4 sur ISO/IEC 14443 Type A sans toute la mécanique du DESFire : un fichier NDEF, un fichier capability container et un fichier système, deux mots de passe de 128 bits (lecture et écriture), et un compteur d'événements de 20 bits qui peut compter les lectures ou les écritures.

<div class="table-scroll">

| Puce | Fichier NDEF | Mots de passe | Compteur | Signature | Endurance / rétention | Statut |
| --- | --- | --- | --- | --- | --- | --- |
| ST25TA512, ST25TA512B | 64 octets | deux de 128 bits | 20 bits sur la B | TruST25 sur la B | 1M / 200 ans | 512 déconseillée |
| ST25TA02K, ST25TA02KB (-P, -D) | 256 octets | deux de 128 bits | 20 bits | TruST25 sur la B | 1M / 200 ans | 02K et 02KB déconseillées ; 02KB-P et 02KB-D actives |
| ST25TA16K, ST25TA64K | 2048 ou 8192 octets | deux de 128 bits | non | non | 1M / 200 ans | active |

</div>

Deux cents ans de rétention et un million de cycles d'écriture, à 106 kbit/s seulement. Les variantes -P et -D ont une broche de sortie générique qui bascule quand le tag est lu, et c'est ainsi qu'on fait réagir une lampe à un téléphone. Sur les deux téléphones, ces puces sont lues comme des tags Type 4 ; NFC.cool y lit et écrit du NDEF et affiche les détails ISO-DEP.

### Puces capteurs et double interface

Ce sont des puces à deux visages : une antenne NFC d'un côté, et un bus I2C, un capteur ou une seconde radio de l'autre.

| Puce | Côté NFC | Autre côté | Mémoire | À noter |
| --- | --- | --- | --- | --- |
| NTAG I2C plus (NT3H2111, NT3H2211) | Type 2, 888 ou 1912 octets, mot de passe de 32 bits, signature | I2C jusqu'à 400 kHz, SRAM pass-through de 64 octets, broche de détection de champ | 200k à 500k / 20 ans | récupération d'énergie jusqu'à 15 mW ; la puce de l'implant xSIID |
| ST25DV (voir plus haut) | Type 5 | I2C jusqu'à 1 MHz, une boîte aux lettres de 256 octets pour le streaming | 1M / 40 ans | récupération d'énergie sur la broche V_EH, non régulée, « quelques µW » selon la fiche technique |
| NTAG 5 link, boost, switch | Type 5, 2048 ou 512 octets, AES sur le 5332 | I2C, GPIO, sorties PWM | 1M / 40 ans | récupération jusqu'à 30 mW ; la variante switch n'a besoin d'aucun microcontrôleur |
| NHS3100 | Type 2, émulé par le firmware | un Cortex-M0+ avec un capteur de température précis à 0,3 °C | 32 ko de flash, 4 ko d'EEPROM | un enregistreur de chaîne du froid sur une feuille, certifié NFC Forum |
| EM4423 « em echo » | Type 2, zone NDEF de 240 octets | RFID UHF RAIN, même mémoire, même numéro de série | 100k / 10 ans | abandonnée |
| EM4425 « em echo-V » | Type 5, jusqu'à 256 octets partagés | RFID UHF RAIN, AES-128, pastilles anti-effraction, signature numérique | 100k / 50 ans | actuelle ; une même puce lisible par un téléphone à un centimètre et par un lecteur UHF de quai de chargement à plusieurs mètres |

Je n'ai rien construit avec ces puces, alors ce tableau repose uniquement sur les fiches techniques. Elles comptent pour ce guide parce qu'elles apparaissent dans les annonces sous l'étiquette « puce NFC » et sèment la confusion : un NTAG 5 n'est pas un NTAG213, et un tag em echo ne fera rien de spécial sur votre téléphone.

### Ancien et marginal

Le **Topaz** (Innovision, puis Broadcom) est le NFC Forum Type 1 : blocs de 8 octets, 96 ou 512 octets, verrouillages à usage unique, 10 000 cycles d'écriture. Les deux téléphones lisent encore le NDEF d'un Topaz, mais le NFC Forum a retiré le Type 1 de son ensemble de spécifications 2021 et plus personne ne l'intègre dans un nouveau produit. Les revendeurs en ont encore en stock.

Le **FeliCa** est la famille de Sony et celle des transports publics japonais. Le FeliCa Lite-S (224 octets de mémoire utilisateur en blocs de 16 octets, un IDm de 8 octets, un MAC triple DES simplifié) est la version tag et correspond au NFC Forum Type 3 ; le FeliCa Standard est la version carte à puce, désormais avec AES et une certification Common Criteria EAL6+ sur l'actuel RC-SA01, et c'est sur lui que tournent Suica, PASMO, Edy, WAON, nanaco et l'Octopus de Hong Kong. Les modules FeliCa Plug de Sony ont été abandonnés en mars 2026. NFC.cool nomme les marques de transport et de monnaie électronique à partir du code système sur les deux plateformes, lit le Lite-S et le Standard, et y écrit du NDEF sur iPhone.

Le **Kovio NFC Barcode** était un tag de 16 octets en lecture seule, en silicium imprimé. Android a toujours une classe `NfcBarcode` pour lui. Les actifs de Kovio sont passés à Thinfilm en 2014 ; Thinfilm a arrêté la production NFC en 2019 et changé de nom en 2021. Cette classe est un fossile.

**Les puces mémoire ISO 14443 Type B.** Les SRI512, SRT512 et SRI4K de ST (512 ou 4096 bits en blocs de 32 bits, deux compteurs dégressifs, 1 000 000 de cycles, 40 ans) se trouvent dans les transports français et belges et dans certains forfaits de ski. Android les expose via `NfcB` ; l'iPhone n'a aucun objet tag Type B brut, si bien qu'à moins qu'une carte Type B parle ISO-DEP et réponde à un SELECT, un iPhone ne la verra pas. Calypso, le système du passe Navigo à Paris, est une carte à puce Type B qui le fait.

### Clones et compatibles

C'est la section que les annonces préféreraient que vous ne lisiez pas.

Le **Fudan FM11NT021** est le « NTAG213 » qui n'en est pas un le plus répandu. Il a les mêmes 180 octets en 45 pages, la même zone utilisateur de 144 octets, un mot de passe, un compteur de lectures de 24 bits et un code fabricant Fudan de 1D dans l'UID. Il n'implémente pas GET_VERSION et sa fiche technique actuelle ne mentionne aucune commande READ_SIG, si bien qu'un lecteur qui pose l'une ou l'autre question n'obtient que le silence et se rabat sur une estimation à partir de la taille mémoire, ce qui explique que la communauté Proxmark3 le signale comme un NTAG203. Fudan fabrique aussi des versions de 504 et 888 octets (FM11NT041, FM11NT081). Pour un lien sur un autocollant, ils font l'affaire. Pour les Amiibo, non, parce que la console commence par demander GET_VERSION.

Les **Fudan FM11RF08 et FM11RF08S** sont les puces compatibles Classic de la plupart des cartes « 1K » bon marché. Le 08S a ajouté en 2020 des contre-mesures face aux attaques connues sur le Classic, avant de se révéler porteur d'une clé de porte dérobée matérielle commune à toutes les cartes fabriquées, que Quarkslab a publiée en 2024 avec des outils désormais intégrés au firmware du Proxmark3.

Les **cartes MIFARE Classic « magiques »** sont des puces conçues pour que l'UID et le bloc fabricant puissent être réécrits, ce qu'un vrai Classic n'autorise jamais. Leurs générations sont un hobby à part entière :

| Génération | Comment l'UID change | Détectable | Remarques |
| --- | --- | --- | --- |
| Gen1a, Gen1b | une commande de réveil cachée | oui, n'importe quel lecteur peut sonder la porte dérobée | la « Chinese magic card » d'origine ; les systèmes d'accès la filtrent |
| Gen2, CUID | une écriture normale dans le bloc 0 après authentification | pas de porte dérobée à sonder ; un lecteur doit tenter une écriture | compatible téléphone, la plus courante aujourd'hui |
| FUID, UFUID | une seule fois, ou jusqu'au scellement | avant le scellement | des cartes à usage unique pour cloner un badge définitivement |
| Gen3, APDU | des commandes APDU spéciales | un lecteur qui connaît les commandes | |
| Gen4 GTU, GDM, « Ultimate » | une configuration protégée par mot de passe ; peut aussi émuler l'Ultralight et le NTAG | seulement tant que le mot de passe est celui par défaut | un caméléon au format carte, UID de 7 octets, toutes familles |

Il existe aussi des cartes NTAG21x magiques, et celles qui émulent intégralement acceptent même une signature d'originalité copiée, ce qui est exactement ce que NXP souligne à propos des signatures statiques.

**Les « compatible NTAG215 » pour Amiibo.** Un Amiibo est un simple NTAG215 dont les 540 octets contiennent des données chiffrées et signées avec des clés dérivées de l'UID du tag lui-même. Copiez les octets sur un autre tag et les signatures ne correspondent plus, c'est pourquoi une sauvegarde doit être recalculée pour l'UID du tag cible, ce que fait la fonction de [sauvegarde et restauration d'Amiibo](/blog/amiibo-iphone-android-read-collect-backup/) de NFC.cool. La séquence de lecture de la console commence par GET_VERSION, puis une authentification par mot de passe dérivé de l'UID, puis la lecture des 135 pages, pages de configuration comprises. Une puce sans GET_VERSION, ou avec 45 pages au lieu de 135, échoue dès la première étape. La documentation de TagMo le résume en une ligne : seul le NTAG215 est reconnu.

**Comment un clone apparaît dans l'app.** NFC.cool identifie d'abord par GET_VERSION. Une puce qui n'y répond pas, ou qui répond avec une taille mémoire qui ne correspond pas à ce qu'elle annonce, est nommée d'après ce qu'elle est vraiment, pas d'après l'annonce. Sur un NTAG 424 DNA, l'app va un cran plus loin et vérifie la signature d'originalité ECDSA avec la clé publique de NXP, et c'est le seul endroit de l'app qui peut afficher « Genuine NXP » avec une garantie cryptographique. Pour les NTAG21x, l'app ne lit pas la signature, en partie parce que la clé de vérification de NXP est sous NDA, et en partie parce qu'une signature statique copiée passe de toute façon. La chaîne de preuves honnête pour un tag Type 2, c'est le code fabricant, GET_VERSION, la taille mémoire et la présence des fonctions que la puce revendique.

---

## Formats et distance de lecture

La puce décide de ce que le tag sait faire ; le format décide si le téléphone peut l'atteindre.

| Format | Ce que c'est | Antenne typique | Distance de lecture au téléphone | Indices et remarques |
| --- | --- | --- | --- | --- |
| Inlay adhésif (wet inlay) | l'antenne gravée et la puce sur un film PET, avec adhésif et film de protection | 22 à 38 mm | 2 à 4 cm | la façon la moins chère d'acheter une puce ; ne se colle qu'une fois |
| Inlay sec (dry inlay) | la même chose sans adhésif | idem | idem | pour être laminé dans autre chose |
| Autocollant papier ou PET | un inlay avec une face imprimable | 22 à 38 mm | 2 à 4 cm | une face papier s'imprime, une face PET résiste à l'eau |
| Carte PVC | ISO 7810 ID-1, 85,60 x 53,98 mm, 0,76 mm d'épaisseur | toute la carte | 3 à 5 cm | la plus grande antenne que vous tiendrez en main ; c'est aussi la cible de conception des lecteurs |
| Jeton, jeton époxy | un inlay sous un dôme de résine dure, souvent percé | 20 à 30 mm | 2 à 3 cm | étanche ; le format des Amiibo |
| Porte-clés | un inlay dans une coque en ABS | 20 à 30 mm | 2 à 3 cm | un porte-clés GoToTags est certifié IP67 et -25 à +75 °C |
| Bracelet | du silicone avec un inlay | 20 à 25 mm | 1 à 3 cm | festivals, piscines ; le bracelet plie, l'inlay ne devrait pas |
| On-metal | un inlay avec une feuille de ferrite entre l'antenne et le métal | 22 à 34 mm | 2 à 3 cm sur métal | Seritag mesure 21 à 25 mm sur métal contre 26 à 30 mm hors métal pour le même tag de 22 mm ; la version industrielle de 34 mm se lit à 31 à 40 mm et est certifiée IP68, -25 à +85 °C |
| Étiquette textile | une puce dans un bouton en PPS | 16 mm | 1 à 2 cm | Smartrac certifie son étiquette textile HF pour 200 cycles de lavage, -30 à +200 °C et 60 bars ; la plupart des étiquettes textiles sont des ISO 15693 à UID seul |
| Implant | une puce dans une capsule de verre de 2 x 12 mm ou un polymère souple | quelques millimètres | demande exactement le point idéal du téléphone | le xNT est un NTAG216, le NExT y ajoute un T5577 à 125 kHz, le xSIID est un NTAG I2C plus avec une LED, le xDF est un DESFire ; les versions souples se lisent bien mieux que celles en verre |

Deux règles physiques expliquent la plupart des tickets « ça ne lit pas ». **La taille de l'antenne fixe la portée**, à peu près : une carte se lit de plus loin qu'un jeton, un jeton de plus loin qu'un inlay de 10 mm, et un implant demande le contact. **Le métal désaccorde l'antenne** : une bobine posée sur une surface métallique induit des courants de Foucault dans le métal, son inductance chute et sa résonance s'éloigne de 13,56 MHz, si bien qu'un tag normal sur une armoire en acier est mort. Une feuille de ferrite entre la bobine et le métal redirige le champ et ramène le tag à la vie, au prix d'une portée plus courte et d'un coût plus élevé, c'est pourquoi les tags on-metal coûtent trois fois plus cher.

L'endroit où vous tenez le téléphone compte autant que le tag. Sur un iPhone, l'antenne se trouve sur le bord supérieur ; la consigne d'Apple elle-même est de « tenir le haut de votre iPhone près » du tag. Sur Android, ça varie selon le modèle, en général au centre du dos ou près de l'appareil photo. Le [guide du débutant](/blog/nfc-tags-beginners-guide/) détaille la marche à suivre.

---

## Qui lit quoi

La matrice téléphones et lecteurs. Les colonnes téléphone viennent de la documentation d'Apple et de Google et de ma propre app ; les colonnes ordinateur et bidouille viennent des fiches techniques des fabricants et de la documentation des projets eux-mêmes, et je n'ai pas testé ces appareils moi-même, à l'exception des lecteurs cités dans la colonne iPad et Mac.

<div class="table-scroll sticky-first">

| Famille de puces | iPhone en arrière-plan | iPhone dans une app | Android | iPad et Mac avec un lecteur USB | Web NFC (Chrome sur Android) | ACR122U | ACR1552U, OMNIKEY 5022 | Carte PN532 | Proxmark3 | Flipper Zero |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG21x, Ultralight EV1, autres Type 2 | enregistrements URL uniquement | NDEF, mot de passe, compteur, miroir, dump | idem | idem, via NFC.cool | NDEF uniquement | oui | oui | oui | oui, plus émulation | oui, plus émulation |
| NTAG 22x DNA | enregistrements URL | NDEF, commandes brutes | idem | comme Type 2 | NDEF | oui | oui | oui | oui | lu comme un NTAG |
| NTAG 424 DNA, ST25TA, DESFire en Type 4 | enregistrements URL | NDEF, APDU | NDEF, APDU | NDEF, configuration 424 complète | NDEF | oui | oui | oui | oui | lit le NDEF ; aucune opération sur les clés |
| Ultralight C | NDEF si formaté | NDEF, commandes natives | idem | NDEF | NDEF | oui | oui | oui | oui | oui |
| Ultralight AES | NDEF si formaté | NDEF, commandes natives | idem | NDEF | NDEF | oui | oui | oui | oui | lu comme un Ultralight |
| MIFARE Classic | non | UID et famille uniquement | lecture et écriture complètes sur les téléphones dont le contrôleur intègre CRYPTO1 | lecture NDEF uniquement, clés connues | non | oui, avec les clés | oui, avec les clés | oui, avec les clés | oui, plus récupération de clés et émulation | oui, plus récupération de clés et émulation |
| MIFARE Plus | non | UID en SL1 ; ISO-DEP en SL3 | comme un Classic en SL1 ; IsoDep en SL3 | UID | non | oui | oui | oui | oui | non documenté |
| DESFire, natif | non | famille et version, APDU | IsoDep | version | non | oui | oui | oui | oui | lecture et sauvegarde uniquement |
| ISO 15693 : ICODE, ST25TV, ST25DV, TI, EM | enregistrements URL | jeu de commandes ISO 15693 complet depuis iOS 13 | NfcV | non testé | NDEF | non | oui | non | oui, plus émulation | oui, plus émulation |
| FeliCa Lite-S et Standard | enregistrements URL | lecture et écriture, avec le code système déclaré | NfcF | lecture ; écriture sur FeliCa via NFC.cool | NDEF | oui | UID uniquement sur l'OMNIKEY | oui | oui | lecture et émulation du Lite-S |
| Topaz (Type 1) | NDEF | NDEF | NDEF | non testé | NDEF | oui | non documenté | oui | oui | non documenté |
| Mémoire ISO 14443 Type B (SRI512) | non | non | NfcB | non testé | non | oui | oui | lecteur uniquement | oui | UID uniquement |
| Badges 125 kHz, puces animales, étiquettes UHF | non | non | non | non | non | non | non | non | 125 kHz oui | 125 kHz oui |

</div>

Quelques lignes méritent une phrase.

- La **lecture en arrière-plan sur iPhone** ne se déclenche que pour un enregistrement URL NDEF, uniquement quand le téléphone est déverrouillé et en cours d'utilisation, et pas quand l'appareil photo, Cartes, une session de lecture ou le mode avion est actif. Elle ne lit jamais une puce en brut. iPhone XS et modèles ultérieurs.
- **Quels iPhone lisent des tags :** l'iPhone 7 et les modèles ultérieurs, dans une app, d'après la session WWDC 2019 d'Apple. L'écriture et les commandes brutes sont arrivées avec iOS 13.
- **La classe `MifareClassic` d'Android est facultative.** Selon les termes mêmes de Google : « si elle n'est pas implémentée, MifareClassic ne sera jamais énumérée ». Tout dépend du contrôleur, pas de la version d'Android.
- **Web NFC**, c'est du NDEF uniquement, Chrome 89 et ultérieur, Android uniquement, et Apple y est officiellement opposé, donc il n'y aura pas de version Safari. C'est pour cela que le [lecteur NFC en ligne](/online-nfc-reader/) de ce site fonctionne sur Android et invite les utilisateurs d'iPhone à passer par l'app.
- **L'iPad et le Mac n'ont pas de radio NFC.** Depuis NFC.cool 6.15.0, l'app dialogue à la place avec un lecteur USB CCID via la pile carte à puce d'Apple ; le HID OMNIKEY 5022 CL est celui que j'ai testé, les ACS ACR1552U-M1 et ACR1255U-J1 fonctionnent d'après des utilisateurs, et [l'article](/blog/nfc-reading-ipad-mac/) en liste les limites. Définir un mot de passe NTAG fonctionne via un lecteur ; le retirer demande une commande que l'OMNIKEY refuse, donc ça, c'est un travail pour le téléphone.
- **L'ACS ACR122U ne gère pas l'ISO 15693**, pas plus que l'ACR1252U ou l'ACR1255U-J1. Dans la gamme ACS, seul l'ACR1552U le fait. L'OMNIKEY 5022 fait les deux. Bon à savoir avant d'acheter un lecteur pour des tags de bibliothèque.
- **Le Proxmark3 et le Flipper Zero** sont les outils capables de récupérer les clés MIFARE Classic et d'émuler des cartes. C'est leur raison d'être, et le guide les mentionne parce que parler de « ce qui lit quoi » sans eux serait malhonnête.

<div class="table-scroll">

| Lecteur | Interface | Type A | Type B | FeliCa | ISO 15693 | 125 kHz | Classic avec clés | Récupération de clés Classic | Émulation | Prix relevé en septembre 2026 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ACS ACR122U | USB, PC/SC | oui | oui | oui | non | non | oui | non | non | environ 40 à 50 USD ; ACS l'a arrêté, les contrefaçons sont courantes |
| ACS ACR1252U | USB, PC/SC | oui | oui | oui | non | non | oui | non | mode émulation de carte | 97,50 USD |
| ACS ACR1552U | USB, PC/SC | oui | oui | oui | oui | non | oui | non | mode émulation de carte | 44,81 USD |
| ACS ACR1255U-J1 | Bluetooth et USB | oui | oui | oui | non | non | oui | non | non | 64,81 USD |
| HID OMNIKEY 5022 CL | USB, PC/SC | oui | oui | UID uniquement | oui | non | oui | non | non | 69,99 EUR |
| Module PN532 | SPI, I2C, UART | oui | lecteur uniquement | oui | non | non | oui | outils côté hôte | Classic 1K/4K et FeliCa | 24 à 40 USD |
| Proxmark3 RDV4 | USB, BLE en option | oui | oui | oui | oui | oui | oui | oui | oui | 329 à 529 EUR |
| Proxmark3 Easy | USB | oui | oui | oui | oui | oui | oui | partielle | oui | 78 EUR ; clones à partir d'environ 28 GBP |
| Flipper Zero | autonome, USB-C, BLE | oui | limité | Lite-S | oui | oui | oui | oui | oui | 169 USD |
| Chameleon Ultra | USB-C, BLE | lecture et émulation | non | non | non | émulation et lecture | oui | oui | oui | 129 EUR |

</div>

---

## Ce que NFC.cool Tools fait de chaque puce

C'est le moment de l'article où apparaît ce que j'ai construit, et il a sa place ici, parce que chaque ligne ci-dessus se termine par « et qu'est-ce que l'app en fait ». Le tableau ci-dessous n'est pas un texte marketing ; je l'ai tiré du code source de l'app pendant que j'écrivais ce guide, et il m'a fait corriger deux choses que j'aurais affirmées sinon.

| Famille de puces | iPhone | Android | iPad et Mac avec un lecteur |
| --- | --- | --- | --- |
| Identification par produit | une soixantaine de noms : NTAG203 à 216, NTAG I2C, Ultralight et C, Ultralight EV1 par taille, Ultralight AES, Classic Mini, 1K et 4K, Plus 2K et 4K par niveau de sécurité, DESFire EV1, EV2 et EV3 par taille, NTAG 424 DNA et sa variante TagTamper, ICODE SLI, SLI-S, SLI-L, SLIX, SLIX-S, SLIX-L et SLIX2, TI Tag-it Standard, Pro et Plus, ST25TV, ST25DV et M24LR, Infineon my-d, Fujitsu MB89R118, EM4233 et EM4423, FeliCa Lite et Standard plus Suica, PASMO, ICOCA, Edy, WAON et nanaco ; les cartes EMV et PIV sont reconnues comme telles | une vingtaine de noms : NTAG203, 213, 215 et 216, NTAG 424 DNA, DESFire, Classic Mini, 1K et 4K, Plus 2K et 4K, JCOP et SmartMX, les marques FeliCa dont Octopus ; les puces ISO 15693 sont indiquées par leur taille, pas par produit | le type de carte d'après la réponse au reset (ATR) du lecteur |
| Lecture NDEF | toutes les familles | toutes les familles | Type 2, Type 4, FeliCa ; Classic avec les clés publiques |
| Écriture NDEF, vidage d'un tag | Type 2, Type 4, Type 5, FeliCa Lite-S et Standard | Type 2, Type 5, MIFARE Classic avec le répertoire NDEF, tout ce qu'Android sait formater | Type 2, Type 4, FeliCa |
| Remise à zéro de toute la mémoire | Type 5 | Type 2, Type 5, Classic | comme sur iPhone |
| Verrouillage définitif | octets de verrouillage Type 2 ; NDEF en lecture seule sur Type 4, Type 5 et FeliCa ; refusé exprès sur le NTAG 424 DNA | Type 2 | oui |
| Mot de passe | NTAG213, 215, 216 et 203 | la famille Type 2 | définition oui ; suppression selon le lecteur |
| Compteur de scans et miroir | NTAG213, 215, 216 | NTAG213, 215, 216 | oui |
| Dump complet de la mémoire | Type 2, ISO 15693, liste des fichiers DESFire, FeliCa, fichiers du NTAG 424 DNA | Classic avec la clé d'usine, Ultralight, ISO 15693, FeliCa, tout Type A | Type 2, Type 4, FeliCa |
| Contenu MIFARE Classic | non ; Core NFC n'a pas CRYPTO1 | lecture avec la clé d'usine, formatage et écriture avec les clés connues | lecture NDEF uniquement |
| NTAG 424 DNA | clés, SUN en mode clair et chiffré, droits d'accès aux fichiers, configuration de la puce, le fichier coffre-fort, UID aléatoire, LRP, état anti-effraction, vérification de la signature d'originalité | idem | idem |
| Amiibo | sauvegarde et restauration NTAG215, recalculées pour le tag cible | idem | oui |
| Mot de passe, EAS, AFI ISO 15693 | pas encore | pas encore | non |
| Authentification et écriture DESFire | non | non | non |
| Commandes brutes | mode APDU expert | un catalogue de commandes | oui |

Les deux corrections, pour mémoire : j'aurais écrit que l'app vérifie la signature d'originalité sur les tags NTAG21x, et ce n'est pas le cas ; seul le 424 y a droit. Et j'aurais écrit que les commandes de mot de passe ISO 15693 étaient en place, alors qu'il s'agit d'une table de référence qui attend son interface. Les deux sont sur ma liste.

---

## Acheter sans se faire avoir

Ce qu'une annonce doit indiquer avant que j'achète :

1. **Le nom exact de la puce.** « NTAG213 » et pas « NFC 213 » ; « ICODE SLIX2 » et pas « tag ISO 15693 » ; « MIFARE Classic EV1 1K » et pas « carte 1K ». Si l'annonce ne nomme pas la puce, c'est que le vendeur ne le sait pas, ou ne veut pas que vous le sachiez.
2. **La mémoire utilisateur en octets**, qui doit correspondre à la puce : 144 pour un NTAG213, 504 pour un 215, 888 pour un 216, 316 pour un SLIX2. Une carte « 1K » qui s'avère être un MIFARE Classic ne fonctionnera pas sur un iPhone.
3. **Le fabricant**, si l'annonce revendique du NXP ou du ST authentique. Le code fabricant dans l'UID vous dira la vérité après l'achat ; le prix vous la dira avant. Personne ne vend d'autocollants NTAG216 authentiques au tiers du prix du marché.
4. **La taille de l'antenne et le format.** Un inlay de 10 mm se lit à un centimètre ; un de 38 mm à quatre. Un tag on-metal doit le dire explicitement.
5. **S'il est formaté en NDEF.** Le NTAG est livré pré-formaté ; l'Ultralight EV1 et la plupart des puces ISO 15693 ne le sont pas, et NFC.cool les formate, mais c'est une étape de plus.

Signaux d'alerte : « compatible NTAG215 » (ce n'est pas un NTAG215), « chiffré » sur tout ce qui se trouve sous le barreau 4 de l'échelle, « fonctionne avec tous les téléphones » sur un MIFARE Classic, et tout nom de puce comportant une lettre que le fabricant n'a jamais utilisée, comme SLIX3.

**Ce que coûtent les tags.** Prix affichés relevés le 9 septembre 2026 chez Seritag, Shop NFC, GoToTags, NFCW Shop, NFC.CARDS, NFC-Tag-Shop.de, Tagstand et Digi-Key. La plupart des boutiques vendent au minimum par dizaines, donc la colonne « à l'unité » correspond au plus petit palier proposé. Les prix bougent ; considérez-les comme des ordres de grandeur relatifs.

| Tag | À l'unité ou plus petit palier | Par 100 | Par 1 000 | Puce nue |
| --- | --- | --- | --- | --- |
| Autocollant NTAG213 | 0,32 à 0,65 EUR, 0,33 à 0,58 USD | 0,29 à 0,34 EUR | 0,23 à 0,24 EUR, 0,50 USD | 0,14 USD en volume sur wafer |
| Autocollant ou carte NTAG215 | 0,48 à 0,54 USD, 0,64 à 0,67 GBP | 0,35 USD | 0,33 USD | 0,21 USD |
| Autocollant NTAG216 | 0,97 EUR, 0,71 USD | 0,70 EUR, 0,61 USD | 0,56 EUR, 0,56 USD | 0,37 USD |
| Autocollant NTAG 424 DNA | 0,63 EUR, 0,90 USD | 0,62 EUR, 0,77 USD | 0,57 EUR, 0,68 USD | 0,79 USD à l'unité, 0,51 par 1 000 |
| Carte MIFARE Classic 1K | 1,35 à 1,59 EUR par dizaines ; 6,69 EUR à l'unité en magasin | 1,29 à 1,52 EUR, 1,98 USD | 0,95 à 1,13 EUR, 0,86 USD | |
| Carte DESFire EV3 | 1,85 à 2,79 EUR | 1,85 à 2,45 EUR | 1,35 à 2,29 EUR | 1,18 USD par lot de 31 000 |
| Étiquette ICODE SLIX2 | 0,69 EUR | 0,34 à 0,37 EUR | 0,22 à 0,25 EUR | 0,35 USD à l'unité, 0,22 par 1 000 |
| Inlay ST25TV02KC | 0,32 à 0,87 USD | 0,30 à 0,79 USD | 0,28 à 0,77 USD | 0,13 USD par bobine |

La tendance est celle que vous devinez : la mémoire ne coûte presque rien, la cryptographie coûte environ le double, et le format coûte plus cher que la puce. Une puce NTAG213 nue coûte quatorze cents ; l'autocollant autour représente l'essentiel du prix.

Où acheter : je tiens une liste des tags et des lecteurs que j'utilise vraiment sur la [page des liens affiliés](/affiliate-links/), et les tags 424 à l'origine de toutes les fonctions DNA venaient d'AliExpress, alors je ne vais pas vous dire que les places de marché sont à proscrire. Vérifiez ce que vous recevez avec l'app avant d'y écrire quoi que ce soit.

---

## Tout le catalogue en un seul tableau

Une ligne par puce. « Octets utilisateur », c'est ce que vous pouvez écrire ; pour le DESFire, c'est le chiffre utilisable donné par NXP. Les colonnes téléphone indiquent ce que la plateforme sait faire, pas ce que fait chaque app ; la colonne NFC.cool indique ce que fait la mienne. Sur téléphone, faites défiler le tableau horizontalement ; la première colonne reste en place.

<div class="table-scroll sticky-first">

| Puce | Fabricant | Type Forum | Norme | Octets utilisateur | UID | Protection | Endurance / rétention | iPhone | Android | NFC.cool | Idéale pour |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 210µ | NXP | 2 | 14443-A | 48 | 7 | bits de verrouillage | 100k / 10 ans | NDEF, brut | NDEF, brut | lecture, écriture | petits tags jetables |
| NTAG210 | NXP | 2 | 14443-A | 48 | 7 | mot de passe | 100k / 10 ans | NDEF, brut | NDEF, brut | lecture, écriture | petites antennes |
| NTAG212 | NXP | 2 | 14443-A | 128 | 7 | mot de passe | 100k / 10 ans | NDEF, brut | NDEF, brut | lecture, écriture | petites antennes avec de la marge |
| NTAG213 | NXP | 2 | 14443-A | 144 | 7 | mot de passe, compteur, miroir | 100k / 10 ans | NDEF, brut | NDEF, brut | tout | l'autocollant par défaut |
| NTAG215 | NXP | 2 | 14443-A | 504 | 7 | mot de passe, compteur, miroir | 100k / 10 ans | NDEF, brut | NDEF, brut | tout, Amiibo | Amiibo, contenus de taille moyenne |
| NTAG216 | NXP | 2 | 14443-A | 888 | 7 | mot de passe, compteur, miroir | 100k / 10 ans | NDEF, brut | NDEF, brut | tout | contacts, le choix sûr |
| NTAG213F, 216F | NXP | 2 | 14443-A | 144, 888 | 7 | mot de passe, broche de détection de champ | 100k / 10 ans | comme le 213 | comme le 213 | comme le 213 | tags intégrés à l'électronique |
| NTAG 213 TT | NXP | 2 | 14443-A | 144 | 7 | mot de passe, fil anti-effraction | 100k / 10 ans | comme le 213 | comme le 213 | comme le 213 | scellés |
| NTAG203 | NXP | 2 | 14443-A | 144 | 7 | verrouillage, OTP | 10k / 5 ans | NDEF | NDEF | lecture, écriture, mot de passe | anciens stocks |
| NTAG I2C plus | NXP | 2 | 14443-A | 888, 1912 | 7 | mot de passe | 200k à 500k / 20 ans | NDEF, brut | NDEF, brut | identification, lecture, écriture | électronique avec un MCU |
| NTAG 223, 224 DNA | NXP | 2 | 14443-A | 144, 208 | 7 | mot de passe ou AES, SUN | 100k / 10 ans | NDEF, brut | NDEF, brut | comme un Type 2 | authenticité à petit prix |
| NTAG 22x DNA StatusDetect | NXP | 2 | 14443-A | 144, 208 | 7 | comme ci-dessus, capteur | 100k / 10 ans | NDEF, brut | NDEF, brut | comme un Type 2 | scellés et mesures |
| NTAG 413 DNA | NXP | 4 | 14443-4 | 160 | 7 | 3 clés AES, SUN | 200k / 50 ans | NDEF, APDU | NDEF, APDU | identification | abandonnée |
| NTAG 424 DNA | NXP | 4 | 14443-4 | 416 | 7 | 5 clés AES, SUN, LRP | 200k / 50 ans | NDEF, APDU | NDEF, APDU | configuration complète | authenticité |
| NTAG 424 DNA TT | NXP | 4 | 14443-4 | 416 | 7 | comme ci-dessus, anti-effraction | 200k / 50 ans | NDEF, APDU | NDEF, APDU | configuration complète | scellés d'authenticité |
| Ultralight | NXP | 2 | 14443-A | 48 | 7 | verrouillage, OTP | 10k / 5 ans | NDEF | NDEF | lecture, écriture | abandonnée |
| Ultralight C | NXP | 2 | 14443-A | 144 | 7 | 3DES | 100k / 10 ans | NDEF, brut | NDEF, brut | lecture, écriture | anciens titres de transport |
| Ultralight EV1 | NXP | 2 | 14443-A | 48, 128 | 7 | mot de passe, 3 compteurs | 100k / 10 ans | NDEF, brut | NDEF, brut | lecture, écriture, mot de passe | titres de transport, tags jetables |
| Ultralight AES | NXP | 2 | 14443-A | 144 | 7 | AES-128 | 100k / 10 ans | NDEF, brut | NDEF, brut | lecture, écriture | Type 2 authentifié |
| Ultralight Nano | NXP | 2 | 14443-A | 40 | 7 | verrouillage, OTP | 100k / 10 ans | NDEF | NDEF | lecture, écriture | tickets à trajet unique |
| Classic Mini | NXP | aucun | 14443-A | 224 | 4 | CRYPTO1 | 100k / 10 ans | UID | selon le contrôleur | Android : lecture, formatage | aucun usage |
| Classic 1K, EV1 | NXP | aucun | 14443-A | 752 | 4 ou 7 | CRYPTO1 | 100k / 10 ans | UID | selon le contrôleur | Android : lecture, formatage | aucun usage |
| Classic 4K, EV1 | NXP | aucun | 14443-A | 3440 | 4 ou 7 | CRYPTO1 | 100k / 10 ans | UID | selon le contrôleur | Android : lecture, formatage | aucun usage |
| Plus SE | NXP | aucun | 14443-A | 752 | 4 ou 7 | AES en SL3 | 100k / 10 ans | UID | comme un Classic | identification | migration depuis le Classic |
| Plus EV2 | NXP | aucun | 14443-4 en SL3 | 1520, 3440 | 4 ou 7 | AES-128, EAL5+ | 200k / 25 ans | ISO-DEP | IsoDep | identification | contrôle d'accès |
| DESFire EV1 | NXP | 4 | 14443-4 | 2304 à 7936 | 7 | DES, 3DES, AES | 200k / 10 ans | NDEF, APDU | NDEF, APDU | identification, liste des fichiers | anciens réseaux de transport |
| DESFire EV2 | NXP | 4 | 14443-4 | 2560 à 16384 | 7 | AES, EAL5+ | 200k / 25 ans | NDEF, APDU | NDEF, APDU | identification, liste des fichiers | contrôle d'accès |
| DESFire EV3 | NXP | 4 | 14443-4 | 2560 à 16384 | 7 | AES, SUN, EAL5+ | 200k min, 1M typ / 25 ans | NDEF, APDU | NDEF, APDU | identification, liste des fichiers | contrôle d'accès, transport |
| DESFire Light | NXP | 4 | 14443-4 | 640 | 7 | AES, LRP, EAL4 | 200k / 10 ans | NDEF, APDU | NDEF, APDU | identification | cartes à application unique |
| ICODE SLI | NXP | 5 | 15693 | 112 | 8 | verrouillage | 100k / 10 ans | NDEF, brut | NfcV | lecture, écriture, formatage | fin de vie |
| ICODE SLI-S, SLI-L | NXP | 5 | 15693 | 160, 32 | 8 | mots de passe | 100k / 10 ans | NDEF, brut | NfcV | lecture, écriture, formatage | plus fabriquées |
| ICODE SLIX | NXP | 5 | 15693 | 112 | 8 | mot de passe EAS/AFI | 100k / 50 ans | NDEF, brut | NfcV | lecture, écriture, formatage | stocks de bibliothèques et de logistique |
| ICODE SLIX-S, SLIX-L | NXP | 5 | 15693 | 160, 32 | 8 | mots de passe, confidentialité | 100k / 50 ans | NDEF, brut | NfcV | lecture, écriture, formatage | logistique |
| ICODE SLIX2 | NXP | 5 | 15693 | 316 | 8 | mots de passe, confidentialité, compteur, signature | 100k / 50 ans | NDEF, brut | NfcV | lecture, écriture, formatage | inventaire, bobines OpenPrintTag |
| ICODE DNA | NXP | 5 | 15693 | 252 | 8 | AES-128 | 100k / 50 ans | NDEF, brut | NfcV | lu comme ISO 15693 | protection de marque à distance |
| ICODE 3 | NXP | 5 | 15693 | 300 | 8 | mots de passe, compteur de scans, miroir, signature | 100k / 50 ans | NDEF, brut | NfcV | lu comme ISO 15693 | la puce d'inventaire actuelle |
| NTAG 5 | NXP | 5 | 15693 | 512, 2048 | 8 | mots de passe, AES sur le 5332 | 1M / 40 ans | NDEF, brut | NfcV | lu comme ISO 15693 | électronique connectée |
| ST25TN512, 01K | ST | 2 | 14443-A | 64, 160 | 7 | kill, code de scan, TruST25 | 100k / 40 ans | NDEF, brut | NDEF, brut | lu comme Type 2 | l'alternative au NTAG213 |
| ST25TV512C, 02KC | ST | 5 | 15693 | 64, 320 | 8 | mots de passe, kill, confidentialité, code de scan, TruST25 | 100k / 60 ans | NDEF, brut | NfcV | identifie le ST25TV, lecture, écriture | étiquettes avec une URL nouvelle à chaque scan |
| ST25TV16K, 64K | ST | 5 | 15693 | 2048, 8192 | 8 | mots de passe de 64 bits, kill | 1M / 40 ans | NDEF, brut | NfcV | lecture, écriture | grand stockage Type 5 |
| ST25DV04K à 64K | ST | 5 | 15693 | 512 à 8192 | 8 | mots de passe de 64 bits | 1M / 40 ans | NDEF, brut | NfcV | identifie le ST25DV, lecture, écriture | tags dynamiques avec un MCU |
| M24LR | ST | aucun revendiqué | 15693 | 512 à 8192 | 8 | mots de passe de 32 bits | 1M / 40 ans | NDEF, brut | NfcV | lu comme ST25TV | ancienne double interface |
| ST25TA02K, 02KB | ST | 4 | 14443-4 | 256 | 7 | mots de passe de 128 bits, compteur, TruST25 sur la B | 1M / 200 ans | NDEF, APDU | NDEF, APDU | lecture, écriture | Type 4 sans DESFire |
| ST25TA16K, 64K | ST | 4 | 14443-4 | 2048, 8192 | 7 | mots de passe de 128 bits | 1M / 200 ans | NDEF, APDU | NDEF, APDU | lecture, écriture | grand stockage Type 4 |
| TI Tag-it HF-I Standard, Pro, Plus | TI | aucun revendiqué | 15693 | 32, 32, 256 | 8 | verrouillage ; le Pro ajoute une écriture par mot de passe et le kill | 100k / 10 ans | NDEF, brut | NfcV | identification, lecture | anciennes bibliothèques |
| EM4233 | EM | aucun revendiqué | 15693 | 208 | 8 | clé de 96 bits, confidentialité, destruction | ? / 60 ans | NDEF, brut | NfcV | identification, lecture | sur demande |
| EM4425 em echo-V | EM | 5 | 15693 plus UHF | jusqu'à 256 | 8 | AES-128, mots de passe, anti-effraction | 100k / 50 ans | NDEF, brut | NfcV | lu comme ISO 15693 | commerce double fréquence |
| Infineon my-d move | Infineon | 2 | 14443-A | 128 | 7 | mot de passe, compteur de valeur | 100k / 10 ans | NDEF, brut | NDEF, brut | identification, lecture | billettique |
| Fudan FM11NT021 | Fudan | 2 | 14443-A | 144 | 7 | mot de passe, compteur | 500k revendiqués / 10 ans | NDEF, brut | NDEF, brut | lu comme un Type 2 générique | autocollants à lien bon marché |
| Fudan FM11RF08, 08S | Fudan | aucun | 14443-A | 752 | 4 | CRYPTO1, avec porte dérobée | ? | UID | selon le contrôleur | comme un Classic | aucun usage |
| Topaz 96, 512 | Innovision, Broadcom | 1 | 14443-A | 96, environ 480 | 7 | verrouillages à usage unique | 10k / 5 ans | NDEF | NDEF | NDEF | anciens systèmes |
| FeliCa Lite-S | Sony | 3 | 18092, JIS X 6319-4 | 224 | 8 (IDm) | MAC 3DES | ? | NDEF, brut | NfcF | lecture, écriture | Japon |
| FeliCa Standard | Sony | 3 | 18092 | 4 ko | 8 | AES, EAL6+ | ? | NDEF, brut | NfcF | lecture, marques | transport et monnaie électronique |
| Kovio NFC Barcode | Kovio, Thinfilm | aucun | propriétaire | 16 en lecture seule | aucun | aucune | n/a | non | NfcBarcode | non | disparu |
| ST SRI512, SRT512, SRI4K | ST | aucun | 14443-B | 64, 512 | 8 | compteurs, verrouillage | 1M / 40 ans | non | NfcB | non | transport Type B |

</div>

---

## Les comparatifs que tout le monde cherche

**NTAG213, NTAG215 ou NTAG216.** La même puce en trois tailles de mémoire : 144, 504 et 888 octets, avec les mêmes mot de passe, compteur, miroir et signature. Prenez le 213 pour un lien, le 215 pour les Amiibo, le 216 pour une carte de contact ou pour ne pas avoir à réfléchir. L'écart de prix est d'une trentaine de centimes.

**NTAG213 ou Ultralight EV1.** Même interface radio et mêmes commandes ; le NTAG a le miroir ASCII et un capability container pré-écrit, l'EV1 a trois compteurs à sens unique et existe en 48 ou 128 octets. Aux autocollants le NTAG, aux titres de transport l'EV1.

**NTAG213, ST25TN01K ou Fudan FM11NT021.** Trois puces Type 2 de 144 à 160 octets. Le NTAG a un mot de passe, un compteur de lectures et répond à GET_VERSION ; le ST25TN a plus de mémoire, une commande kill, un code de scan et TruST25, mais pas de mot de passe ; le Fudan copie les fonctions du NTAG, sauf GET_VERSION et, d'après sa fiche technique actuelle, la signature. Pour un simple lien, n'importe lequel ; pour un compteur ou des Amiibo, le NTAG.

**MIFARE Classic ou DESFire.** Il n'y a pas match. L'algorithme du Classic a été cassé en 2008 et son clone le plus répandu s'est révélé doté d'une porte dérobée en 2024 ; le DESFire EV3 a l'AES, la gestion des clés, la certification EAL5+ et le SUN. Le seul argument en faveur du Classic, c'est que le lecteur fixé au mur a été installé en 2009.

**NTAG 424 DNA ou NTAG213.** Le 424 signe chaque scan en AES-128 et stocke 416 octets dans trois fichiers avec cinq clés ; le 213 stocke 144 octets avec un mot de passe de 32 bits. Si la question est « ce produit est-il authentique », seul le 424 y répond. Si la question est « cet autocollant ouvre-t-il un lien », le 213 s'en charge pour un tiers du prix.

**NTAG 424 DNA ou NTAG 223 DNA.** Les deux font du SUN. Le 424 est un Type 4 avec cinq clés, le LRP, une option d'UID aléatoire, un fichier coffre-fort et 50 ans de rétention ; le 223 est un autocollant Type 2 avec une seule clé SUN, un mot de passe de 32 bits et 10 ans. Le 223 est le moyen le moins cher de mettre une URL signée sur une étiquette ; le 424 est celui qu'une app sait configurer dès aujourd'hui.

**ICODE SLIX2 ou NTAG216 pour l'inventaire.** Si le téléphone est le seul lecteur, le NTAG216 a plus de mémoire et le compteur. S'il y a un portique ou un lecteur portable dans l'équation, le SLIX2 se lit à un mètre et le NTAG à quatre centimètres, et c'est ce qui tranche.

**FeliCa ou NTAG au Japon.** Un portique de transport japonais parle FeliCa et rien d'autre ; un téléphone japonais lit les deux. Pour un tag sur une affiche à Tokyo, le NTAG convient très bien. Pour tout ce qu'un lecteur Suica doit accepter, c'est le FeliCa, et ce n'est pas une puce que l'on programme avec une app de téléphone.

---

## Questions fréquentes

### Faut-il acheter du NTAG215 ou du NTAG216 ?

Le 216, sauf si vous écrivez des Amiibo. Il a 888 octets contre 504 pour le 215, les mêmes mot de passe, compteur et miroir, et la même prise en charge par les téléphones. Le 215 se trouve dans toutes les boutiques parce que les figurines de Nintendo l'utilisent, et si c'est votre usage, c'est le seul choix possible.

### Un iPhone peut-il lire les tags MIFARE Classic ?

Il peut voir qu'il y en a un. Core NFC lit l'UID et le SAK, puis s'arrête ; l'API d'Apple n'a pas de famille Classic et sa documentation précise que la commande MIFARE « ne prend pas en charge le protocole Crypto1 ». Aucune app ne peut lire un secteur sur un iPhone. Les téléphones Android dotés d'un contrôleur NFC NXP le peuvent ; ceux équipés de certains autres contrôleurs non, et la classe `MifareClassic` n'y apparaît tout simplement pas.

### Combien de fois peut-on réécrire un tag NFC ?

100 000 fois pour tout ce qui est actuel chez NXP ou ST, à température ambiante, et les chiffres des fiches techniques sont des minimums. Un DESFire EV3 ou un ST25DV est donné pour un million. L'ancien NTAG203, l'Ultralight d'origine et le Topaz étaient donnés pour 10 000. Personne ne réécrit un autocollant dix mille fois ; ce chiffre compte pour les compteurs et pour les tags qui enregistrent des données.

### À quelle distance un tag NFC fonctionne-t-il ?

Depuis un téléphone, jusqu'à environ quatre centimètres pour une antenne au format carte et environ deux pour un petit autocollant, au bon endroit du téléphone. La définition du NFC Forum lui-même dit « jusqu'à 2 cm ». Un tag ISO 15693 face à un portique de lecture doté d'une grande antenne fonctionne à un mètre, mais un téléphone le lit aux mêmes quelques centimètres que tout le reste, peut-être deux fois la distance d'un tag Type 2.

### Les tags NFC expirent-ils ou s'usent-ils ?

Les données de la puce sont garanties 10 ans sur la plupart des puces grand public, 50 sur le NTAG 424 DNA et la famille ICODE SLIX, 60 sur le ST25TV et 200 sur le ST25TA, toujours à température ambiante. La chaleur raccourcit ces durées. En pratique, l'adhésif, la face papier et l'antenne lâchent bien avant l'EEPROM.

### Peut-on acheter sans risque des tags NFC bon marché sur les places de marché ?

Sans risque, oui ; conformes à ce qu'ils annoncent, pas toujours. Un « NTAG213 » bon marché est souvent un Fudan FM11NT021, qui fonctionne pour un lien et échoue pour tout ce qui demande GET_VERSION. Un « NTAG215 » bon marché n'en est souvent pas un, et les Amiibo le refuseront. Vérifiez le code fabricant et le nom de la puce dans l'app avant d'écrire quoi que ce soit, et achetez dans une boutique qui nomme la puce.

### Mon téléphone peut-il lire ma carte bancaire ou mon passeport avec une app NFC ?

Le passeport, oui : avec la bande de lecture optique comme clé, une app peut lire les groupes de données de la puce, et NFC.cool le fait sur les deux plateformes. La carte bancaire est une carte à puce EMV ; une app peut lire sa liste d'applications et certains enregistrements publics, mais Apple bloque la lecture des cartes de paiement dans Core NFC, le cryptogramme visuel ne se trouve pas sur la puce, et chaque transaction est signée par une clé qui ne quitte jamais la carte, donc il n'y a rien à copier.

### Pourquoi l'app ne voit-elle pas mon badge de bureau ou ma clé d'hôtel ?

La plupart des badges de bureau sont des cartes de proximité 125 kHz, que la bobine 13,56 MHz d'un téléphone ne peut même pas détecter. La plupart des clés d'hôtel et des anciennes cartes de transport sont des MIFARE Classic, qu'un iPhone peut seulement identifier et qu'un téléphone Android ne peut lire qu'avec le bon contrôleur et les bonnes clés. Dans aucun des deux cas une app ne peut y remédier, et je préfère le dire plutôt que de vous vendre une solution de contournement.

### Peut-on déverrouiller un tag NFC passé en lecture seule ?

Non. Les bits de verrouillage d'un tag Type 2 ou Type 5 sont des bits à sens unique dans la puce ; le drapeau de lecture seule du capability container fonctionne de la même façon. Un mot de passe peut être retiré si vous le connaissez ; un verrouillage, non. C'est pour cela que NFC.cool demande deux fois confirmation avant de verrouiller quoi que ce soit.

### Le mot de passe NTAG est-il une vraie sécurité ?

Il arrête la personne qui a une app gratuite, c'est-à-dire la plupart des gens. Il n'arrête pas quelqu'un équipé d'un lecteur capable d'écouter, parce que le mot de passe de 32 bits passe dans l'air en clair et que le tag répond avec un accusé de réception de 16 bits. Pour tout ce qui doit résister à un attaquant motivé, l'échelle commence à l'AES : l'Ultralight AES pour un autocollant Type 2, le NTAG 424 DNA si le scan lui-même doit prouver quelque chose.

### Quel tag faut-il pour les Amiibo ?

Un NTAG215, et uniquement un NTAG215. La console demande GET_VERSION, s'authentifie avec un mot de passe dérivé de l'UID et lit les 135 pages. Une puce sans GET_VERSION, ou avec un nombre de pages différent, échoue dès la première commande. Écrire un Amiibo sur un tag est définitif, parce que les octets de verrouillage et le mot de passe font partie du format.

### Quel tag NFC fonctionne sur une surface métallique ?

N'importe quelle puce dans un format on-metal, c'est-à-dire avec une feuille de ferrite entre l'antenne et le métal. Un tag normal collé sur de l'acier ne se lit pas du tout ; un tag on-metal se lit à environ quatre cinquièmes de sa portée normale. Si vous pouvez glisser trois millimètres de n'importe quel matériau non métallique entre un tag normal et le métal, ça marche aussi.

### NFC.cool fonctionne-t-il sur iPad et Mac ?

Oui, depuis la version 6.15.0, via un lecteur de cartes à puce USB ; aucun des deux appareils n'a de radio NFC intégrée. Le HID OMNIKEY 5022 CL est celui que j'ai testé, et les ACS ACR1552U et ACR1255U-J1 fonctionnent d'après des retours d'utilisateurs. Tout ce qui fonctionne sur Type 2, Type 4 et FeliCa avec le téléphone fonctionne aussi via le lecteur, le MIFARE Classic étant en lecture seule.

---

## Glossaire

| Terme | Signification |
| --- | --- |
| AFI | Application Family Identifier, un octet des tags ISO 15693 qui permet à un lecteur de n'inventorier que les tags d'un certain type |
| APDU | Application Protocol Data Unit, le format de commande et de réponse de l'ISO 7816-4, utilisé par toutes les puces ISO-DEP |
| ATQA | Answer To Request, les deux premiers octets qu'envoie une puce Type A ; NXP recommande de ne pas s'en servir pour identifier les puces |
| AUTH0 | l'octet de configuration NTAG qui désigne la première page soumise au mot de passe |
| AUTHLIM | le réglage NTAG qui bloque le tag après un nombre choisi de tentatives de mot de passe ratées |
| CC | Capability Container, les quatre octets (ou le fichier, sur un Type 4) qui indiquent à un lecteur que le tag contient du NDEF, et combien |
| CMAC | un code d'authentification de message calculé avec l'AES ; c'est lui qui rend un message SUN infalsifiable |
| CRYPTO1 | l'algorithme de chiffrement par flot propriétaire de 48 bits de NXP, utilisé dans le MIFARE Classic et cassé en 2008 |
| DSFID | Data Storage Format Identifier, un octet ISO 15693 qui décrit l'organisation de la mémoire |
| EAS | Electronic Article Surveillance, le bit des tags ISO 15693 qui déclenche l'alarme du portique d'un magasin |
| GET_VERSION | la commande NXP qui renvoie huit octets identifiant le fabricant, le type, la génération et la taille de la puce |
| ISO-DEP | le protocole de transport de l'ISO/IEC 14443-4 ; une puce qui le parle répond SAK 20 et accepte des APDU |
| Modulation de charge | la façon dont un tag passif envoie des données : en commutant une charge sur son antenne, ce que le lecteur détecte dans son propre champ |
| LRP | Leakage Resilient Primitive, un mode AES du NTAG 424 DNA et du DESFire Light qui résiste aux attaques par canal auxiliaire |
| MAD | MIFARE Application Directory, le secteur 0 d'une carte Classic qui indique ce que contiennent les autres secteurs |
| Miroir | la fonction NTAG qui insère l'UID et le compteur en ASCII dans le message NDEF à chaque lecture |
| NDEF | NFC Data Exchange Format, le conteneur d'enregistrements que lisent tous les téléphones |
| NUID | Non-Unique Identifier, le nom que donne NXP à un UID de 4 octets |
| OTP | One Time Programmable, des bits qu'on peut activer une fois et jamais désactiver |
| PACK | Password Acknowledge, les deux octets que renvoie un NTAG après un mot de passe correct |
| PICC, PCD | les noms que donnent les normes à la carte et au lecteur |
| Random ID | un mode dans lequel la puce répond à l'anticollision avec un nouvel identifiant aléatoire de 4 octets à chaque fois, pour protéger la vie privée |
| READ_SIG | la commande qui renvoie la signature d'originalité d'une puce |
| SAK | Select Acknowledge, l'octet qu'une puce Type A renvoie après sa sélection ; ses bits rangent les puces par famille |
| SDM | Secure Dynamic Messaging, le mécanisme du NTAG 424 DNA et du DESFire EV3 sur lequel repose le SUN |
| SUN | Secure Unique NFC, une URL qui porte une nouvelle preuve cryptographique à chaque scan |
| T5T, T2T, T4T | les abréviations du NFC Forum pour les tags de Type 5, de Type 2 et de Type 4 |
| TLV | Tag-Length-Value, l'encadrement d'un message NDEF sur les puces Type 2 et Type 5 |
| TruST25 | la signature d'originalité de ST sur l'UID |
| UID | l'identifiant de la puce programmé en usine, sur 4, 7 ou 8 octets |

---

## Sources et lectures complémentaires

Chaque tableau de ce guide a été vérifié à partir de l'une de ces sources. Les prix proviennent des boutiques citées dans la section sur l'achat, relevés le 9 septembre 2026.

**NXP NTAG**

- [Fiche technique NTAG213/215/216, Rev 3.2](https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf)
- Fiches techniques [NTAG210/212](https://www.nxp.com/docs/en/data-sheet/NTAG210_212.pdf), [NTAG 210µ](https://www.nxp.com/docs/en/data-sheet/NT2L1001_NT2H1001.pdf), [NTAG213F/216F](https://www.nxp.com/docs/en/data-sheet/NTAG213F_216F.pdf) et [NTAG 213 TT](https://www.nxp.com/docs/en/data-sheet/NT2H1311TT.pdf)
- Fiches techniques [NTAG 223 DNA](https://www.nxp.com/docs/en/data-sheet/NT2H2331G0.pdf) et [NTAG 224 DNA StatusDetect](https://www.nxp.com/docs/en/data-sheet/NT2H2421S0.pdf)
- Fiches techniques [NTAG 424 DNA](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf) et [NTAG 424 DNA TagTamper](https://www.nxp.com/docs/en/data-sheet/NT4H2421Tx.pdf), et [AN12196, la note « features and hints » du 424 avec la clé publique d'originalité](https://www.nxp.com/docs/en/application-note/AN12196.pdf)
- Fiches techniques [NTAG I2C plus](https://www.nxp.com/docs/en/data-sheet/NT3H2111_2211.pdf) et [NTAG 5 boost](https://www.nxp.com/docs/en/data-sheet/NTA5332.pdf)
- [AN13089, NTAG 21x features and hints](https://www.puntoflotante.net/AN13089.pdf), sur les raisons pour lesquelles une signature d'originalité statique ne garantit pas l'absence de clone (copie miroir ; la version de nxp.com n'est pas publique)

**NXP MIFARE**

- Fiches techniques [MIFARE Ultralight](https://www.nxp.com/docs/en/data-sheet/MF0ICU1.pdf), [Ultralight C](https://www.nxp.com/docs/en/data-sheet/MF0ICU2.pdf), [Ultralight EV1](https://www.nxp.com/docs/en/data-sheet/MF0ULX1.pdf) et [Ultralight AES](https://www.nxp.com/docs/en/data-sheet/MF0AES(H)20.pdf)
- Fiches techniques [MIFARE Classic EV1 1K](https://www.nxp.com/docs/en/data-sheet/MF1S50YYX_V1.pdf) et [Classic EV1 4K](https://www.nxp.com/docs/en/data-sheet/MF1S70YYX_V1.pdf)
- Fiches techniques abrégées [MIFARE Plus S](https://www.nxp.com/docs/en/data-sheet/MF1SPLUSX0Y1_SDS.pdf), [Plus SE](https://www.nxp.com/docs/en/data-sheet/MF1SEP_H_10X1_SDS.pdf) et [Plus EV2](https://www.nxp.com/docs/en/data-sheet/MF1P(H)x2.pdf)
- Fiches techniques [DESFire EV1](https://www.nxp.com/docs/en/data-sheet/MF3ICDX21_41_81_SDS.pdf), [DESFire EV2](https://www.nxp.com/docs/en/data-sheet/MF3DX2_MF3DHX2_SDS.pdf), [DESFire EV3](https://www.nxp.com/docs/en/data-sheet/MF3D_H_X3_SDS.pdf) et [DESFire Light](https://www.nxp.com/docs/en/data-sheet/MF2DLHX0.pdf), et [AN12752 sur la mémoire utilisable du DESFire](https://www.nxp.com/docs/en/application-note/AN12752.pdf)
- [AN10833, identification des types MIFARE](https://www.nxp.com/docs/en/application-note/AN10833.pdf), [AN10927, les UID MIFARE](https://www.nxp.com/docs/en/application-note/AN10927.pdf), [AN1305, le NDEF sur MIFARE Classic](https://www.nxp.com/docs/en/application-note/AN1305.pdf), [AN10787, le MIFARE Application Directory](https://www.nxp.com/docs/en/application-note/AN10787.pdf), [AN11004, le DESFire en tag Type 4](https://www.nxp.com/docs/en/application-note/AN11004.pdf)

**NXP ICODE**

- Fiches techniques [ICODE SLIX](https://www.nxp.com/docs/en/data-sheet/SL2S2002_SL2S2102.pdf), [SLIX-S](https://www.nxp.com/docs/en/data-sheet/SL2S5302_SL2S5402.pdf), [SLIX-L](https://www.nxp.com/docs/en/data-sheet/SL2S5002_SL2S5102.pdf), [SLIX2](https://www.nxp.com/docs/en/data-sheet/SL2S2602.pdf), [ICODE DNA](https://www.nxp.com/docs/en/data-sheet/SL2S6002_SDS.pdf) et [ICODE 3](https://www.nxp.com/docs/en/data-sheet/SL2S3003_SL2S3003TT.pdf)
- [AN11809, la comparaison de la famille ICODE](https://www.nxp.com/docs/en/application-note/AN11809.pdf)

**STMicroelectronics, TI, EM, Sony, Fudan**

- Fiches techniques ST [ST25TV02KC](https://www.st.com/resource/en/datasheet/st25tv02kc.pdf), [ST25TN01K](https://www.st.com/resource/en/datasheet/st25tn01k.pdf), [ST25DV64KC](https://www.st.com/resource/en/datasheet/st25dv64kc.pdf), [ST25TA02KB](https://www.st.com/resource/en/datasheet/st25ta02kb.pdf) et [M24LR64E-R](https://www.st.com/resource/en/datasheet/m24lr64e-r.pdf), [AN5658 sur l'Augmented NDEF](https://www.st.com/resource/en/application_note/an5658-augmented-ndef-messages-with-st25tv512c-and-st25tv02kc-devices-stmicroelectronics.pdf) et [TA0358 sur TruST25](https://www.st.com/resource/en/technical_article/ta0358-developing-supply-chain-confidence-with-trust25-digital-signature-in-rfidnfc-tags-stmicroelectronics.pdf)
- Fiches techniques TI Tag-it HF-I [Standard](https://www.ti.com/lit/ds/scbs828c/scbs828c.pdf), [Pro](https://www.ti.com/lit/ds/scbs822c/scbs822c.pdf) et [Plus](https://www.ti.com/lit/ds/scbs827b/scbs827b.pdf)
- EM Microelectronic [EM4233](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em4233), [EM4423](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em-echo-em4423) et [EM4425](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em-echo-v)
- Sony [fiche technique FeliCa Lite-S](https://www.sony.co.jp/en/Products/felica/business/data/RC-S966_E.pdf) et [FeliCa Standard RC-SA01](https://www.sony.co.jp/en/Products/felica/business/products/RC-SA01.html)
- [Fiche technique Fudan FM11NT021](https://github.com/user-attachments/files/16667599/FM11NT021_sds_eng.pdf)

**Recherche en sécurité et normes**

- Quarkslab, [MIFARE Classic: exposing the static encrypted nonce variant and a few hardware backdoors](https://blog.quarkslab.com/mifare-classic-static-encrypted-nonce-and-backdoors.html) (2024)
- Nohl, Evans, Starbug et Plötz, [Reverse-Engineering a Cryptographic RFID Tag](https://www.usenix.org/legacy/event/sec08/tech/full_papers/nohl/nohl.pdf) (USENIX Security 2008)
- Garcia et al., [Dismantling MIFARE Classic](https://link.springer.com/chapter/10.1007/978-3-540-88313-5_7) (ESORICS 2008)
- [ISO/IEC JTC1/SC17 Standing Document 5, le registre des fabricants de circuits intégrés](https://www.aimglobal.org/wp-content/uploads/2022/04/ISO_IEC_JTC1_SC17_Standing_Document_5_Register_of_IC_Manufacturers.pdf)
- [Les notes du Proxmark3 sur les cartes magiques](https://github.com/RfidResearchGroup/proxmark3/blob/master/doc/magic_cards_notes.md) et [3dbrew sur la structure des tags Amiibo](https://www.3dbrew.org/wiki/Amiibo)
- Le NFC Forum sur [la technologie](https://nfc-forum.org/learn/nfc-technology/) et [la spécification des tags Type 2](https://nfc-forum.org/build/specifications/type-2-tag-specification/)

**Téléphones et lecteurs**

- Apple [Core NFC](https://developer.apple.com/documentation/corenfc), [la lecture de tags en arrière-plan](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading), [la commande MIFARE qui exclut CRYPTO1](https://developer.apple.com/documentation/corenfc/nfcmifaretag/sendmifarecommand(commandpacket:completionhandler:)) et [la session 715 de la WWDC 2019](https://developer.apple.com/videos/play/wwdc2019/715/)
- Android [MifareClassic](https://developer.android.com/reference/android/nfc/tech/MifareClassic), [le guide NFC avancé](https://developer.android.com/develop/connectivity/nfc/advanced-nfc) et [Web NFC dans Chrome](https://developer.chrome.com/docs/capabilities/nfc)
- Lecteurs : [ACS ACR122U](https://www.acs.com.hk/download-manual/418/TSP-ACR122U-3.06.pdf), [HID OMNIKEY 5022 CL](https://www.hidglobal.com/doclib/files/resource_files/eat-omnikey-5022-usb-reader-ds-en.pdf), [NXP PN532](https://www.nxp.com/docs/en/nxp/data-sheets/PN532_C1.pdf), [Proxmark3](https://github.com/RfidResearchGroup/proxmark3), [Flipper Zero](https://docs.flipper.net/nfc) et [Chameleon Ultra](https://github.com/RfidResearchGroup/ChameleonUltraDocs)
- Antennes et ferrite : [TI SLOA241](https://www.ti.com/lit/an/sloa241b/sloa241b.pdf) et [Würth ANP022](https://www.mouser.com/pdfdocs/Selection_and_Characteristics_of_WEFSFS_APPNOTE.PDF)

---

## Pour conclure

Choisissez la puce en fonction de l'usage. Un NTAG213 pour un lien, un NTAG216 quand vous hésitez, un NTAG215 pour les Amiibo, un NTAG 424 DNA quand un scan doit prouver quelque chose, un ICODE SLIX2 ou un ICODE 3 quand un portique doit le lire, un DESFire EV3 quand une porte doit lui faire confiance, et rien du tout du rayon MIFARE Classic. Tout le reste de ce guide, c'est le raisonnement derrière cette phrase, et les tableaux sont là pour que vous n'ayez plus jamais à croire une annonce sur parole.

Si vous voulez savoir ce qu'est réellement un tag avant d'y écrire, c'est exactement ce que fait [NFC.cool Tools](/features/nfc-reader-writer/) à chaque scan, sur [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ultimate-nfc-tag-guide-fr&mt=8), sur [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ultimate-nfc-tag-guide-fr), et sur un iPad ou un Mac avec un lecteur branché. Et si vous avez sur votre bureau une puce que l'app nomme mal, ou qu'elle ne nomme pas du tout, écrivez-moi. C'est ainsi que la plupart de ces soixante noms sont arrivés là.
