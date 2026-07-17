---
id: nfc-blog-009
title: "Le NFC expliqué : le guide complet du débutant"
date: 2026-02-23
tags: ["nfc-tags", "guides", "automation"]
summary: "Les tags NFC sont de minuscules puces sans alimentation qui peuvent déclencher des actions sur votre téléphone d'un simple geste. Voici tout ce qu'il faut savoir - ce qu'ils sont, comment ils fonctionnent, quels types acheter, et plus de 15 façons concrètes de les utiliser."
image: "/assets/images/Blog/nfc-tags-beginners-guide.webp"
imageAlt: "Un téléphone et plusieurs tags NFC avec des icônes de flux de travail pour débutants"
metaTitle: "Le NFC expliqué : le guide complet du débutant (2026)"
metaDescription: "Apprenez ce que sont les tags NFC, comment ils fonctionnent, les différents types (NTAG213, 215, 216), et plus de 15 usages concrets - de la domotique aux cartes de visite numériques."
ogTitle: "Le NFC expliqué : le guide complet du débutant"
ogDescription: "Tout ce que les débutants doivent savoir sur les tags NFC en 2026 - les types, leur fonctionnement, quoi acheter, et des usages concrets pour la maison, le travail et au-delà."
---
Vous avez sans doute déjà approché votre téléphone pour payer un café, scanné une carte de transport ou déverrouillé la porte d'une chambre d'hôtel avec lui. Chacune de ces choses, c'est le NFC à l'oeuvre.

J'ai passé des années à construire NFC.cool, une app pour lire et écrire des tags NFC, et la seule chose que j'aimerais que plus de gens sachent, c'est celle-ci : le NFC ne sert pas qu'aux paiements et aux cartes d'accès. Un minuscule **tag NFC** - une puce qui coûte quelques centimes et n'a jamais besoin de pile - peut automatiser votre maison, transmettre vos coordonnées d'un simple geste et relier le monde physique à des actions numériques.

C'est le guide que je donnerais à quiconque débute. Je vais passer en revue ce que sont les tags NFC, comment ils fonctionnent réellement, ceux que j'achèterais, et les usages qui, d'après ce que j'ai vu, en valent vraiment la peine.

---

## Qu'est-ce que le NFC ?

**NFC** signifie **Near Field Communication** (communication en champ proche). C'est une technologie sans fil à courte portée qui permet à deux appareils d'échanger des données quand on les tient à quelques centimètres l'un de l'autre.

Il fonctionne à **13,56 MHz** et porte jusqu'à environ **4 cm** (à peu près 1,5 pouce). Cette portée minuscule déroute au début, mais elle est voulue - c'est une fonction de sécurité. Contrairement au Bluetooth ou au Wi-Fi, vous ne pouvez pas vous connecter par accident à quelque chose à l'autre bout de la pièce.

Tous les smartphones modernes ont une puce NFC à l'intérieur. Les iPhone lisent le NFC depuis l'iPhone 7 en 2016, et les téléphones Android depuis plus longtemps encore. Approchez votre téléphone d'un tag et le téléphone alimente le tag et le lit - tout l'échange se fait en une fraction de seconde.

---

## Qu'est-ce qu'un tag NFC ?

Un tag NFC est une petite puce passive intégrée à un autocollant, une carte, un porte-clés ou à peu près n'importe quel format. « Passive » est le mot qui compte : **un tag NFC n'a pas de pile**. Il est entièrement alimenté par le champ de l'appareil qui le lit.

C'est ce qui les rend si faciles à vivre :
- **Pratiquement indestructibles** - pas de pile qui meurt, rien qui s'use
- **Bon marché** - quelques centimes pièce en gros
- **Minuscules** - plus petits qu'une pièce de monnaie, plus fins qu'une carte bancaire
- **Longue durée de vie** - un tag correct dure plus de 10 ans

Chaque tag contient une petite quantité de mémoire. Vous pouvez y stocker une URL, des coordonnées, des identifiants Wi-Fi, du texte brut, ou des instructions qui disent au téléphone lecteur quoi faire.

### En quoi le NFC diffère-t-il du RFID ?

Le NFC est en fait un sous-ensemble du RFID (identification par radiofréquence). Voici comment j'explique la différence :

| | NFC | RFID |
|---|---|---|
| **Fréquence** | 13,56 MHz uniquement | 125 KHz - 960 MHz |
| **Portée** | Jusqu'à ~4 cm | Jusqu'à plusieurs mètres |
| **Communication** | Bidirectionnelle | Généralement unidirectionnelle |
| **Normalisation** | ISO 14443 / ISO 18092 | Plusieurs normes |
| **Usage grand public** | Élevé (téléphones, paiements) | Surtout industriel |

Tout NFC est du RFID, mais tout RFID n'est pas du NFC. Le badge que vous passez pour entrer dans un bureau fonctionne souvent à 125 KHz, et votre téléphone ne peut tout simplement pas le lire. Les tags NFC utilisent la fréquence 13,56 MHz que les téléphones prennent en charge. « Pourquoi mon téléphone ne lit-il pas mon badge de travail ? » est l'une des questions qu'on me pose le plus, et c'est presque toujours la réponse. (Si c'est le sujet qui vous occupe, j'ai écrit tout un article sur [pourquoi votre iPhone ne peut pas ouvrir une porte RFID](/blog/iphone-rfid-condo-doors/).)

---

## Types de tags NFC : lequel acheter ?

Les tags NFC existent en types définis par le **NFC Forum**, l'organisme de normalisation du secteur. Ceux que vous croiserez réellement reposent sur des puces de **NXP Semiconductors** - la série NTAG.

### La famille NTAG

Ce sont de loin les tags NFC grand public les plus courants :

#### NTAG213
- **Mémoire :** 144 octets (environ 132 utilisables)
- **Idéal pour :** URL, cartes de contact, automatisations simples
- **Prix :** l'option la moins chère (~0,15-0,30 $ par tag)
- **Capacité d'URL :** ~130 caractères

Le cheval de bataille. Pour une seule URL ou un court texte, le NTAG213 suffit amplement - c'est ce qu'utilisent la plupart des cartes de visite NFC et des tags marketing.

#### NTAG215
- **Mémoire :** 504 octets (environ 488 utilisables)
- **Idéal pour :** URL plus longues, vCards à plusieurs champs, identifiants Wi-Fi
- **Prix :** ~0,20-0,40 $ par tag
- **Capacité d'URL :** ~480 caractères

Un solide choix intermédiaire - assez de marge pour des URL plus longues et des vCards multi-champs, assez bon marché pour en acheter en gros. C'est aussi la puce qui se trouve dans les figurines Amiibo de Nintendo, ce qui explique pourquoi les NTAG215 réinscriptibles sont si faciles à trouver.

#### NTAG216
- **Mémoire :** 888 octets (environ 868 utilisables)
- **Idéal pour :** vCards complètes, enregistrements multiples, contenu texte plus long
- **Prix :** ~0,30-0,60 $ par tag
- **Capacité d'URL :** ~850 caractères

La plus grande mémoire de la gamme NTAG grand public, et le tag que je choisirais si vous n'en achetez qu'un. La marge supplémentaire fait que vous ne buterez pas sur un mur - vCards complètes, enregistrements multiples, textes plus longs, de la place pour de futures modifications - et c'est le tag de référence sur lequel NFC.cool réalise ses tests.

### Les autres types de tags que vous pourriez voir

- **NTAG424 DNA** - Une puce avancée avec authentification cryptographique. On la retrouve dans la lutte anti-contrefaçon, la vérification des produits de luxe et les nouvelles règles du passeport numérique de produit de l'UE. Excessive pour un usage personnel, mais vraiment importante pour le travail commercial.
- **MIFARE Classic** - Une puce NXP plus ancienne utilisée dans les cartes d'accès et les systèmes de transport. Ce n'est pas un tag NFC Forum standard, donc la compatibilité avec les téléphones est incertaine. Je la déconseillerais pour les projets personnels.
- **ST25T** - La gamme de tags NFC de STMicroelectronics. Similaire au NTAG en fonction, moins courante dans les produits grand public.
- **ICODE** - Conçue pour le suivi en bibliothèque et en logistique. Vous n'y toucherez probablement pas.

### Guide d'achat express

| Cas d'usage | Tag recommandé | Pourquoi |
|---|---|---|
| URL de site web | NTAG213 | Peu de données, le moins cher |
| Carte de visite numérique | NTAG213 ou NTAG215 | Le lien URL a besoin d'environ 100 caractères |
| Partage Wi-Fi | NTAG215 | Les identifiants peuvent devenir longs |
| vCard complète stockée sur le tag | NTAG216 | Il faut plus de mémoire |
| Déclencheur domotique | NTAG213 | Il suffit d'un identifiant unique |
| Anti-contrefaçon | NTAG424 DNA | Vérification cryptographique |

**Où acheter :** ma page des [tags NFC recommandés](/affiliate-links/) répertorie les autocollants NTAG216 que j'utilise et sur lesquels je fais mes tests. Les tags au format autocollant sont les plus polyvalents - ils se collent sur presque tout.

Mon conseil honnête : achetez un paquet d'autocollants NTAG216 et arrêtez de vous compliquer la vie. J'ai vu des gens se torturer sur les types de puces pour un projet qu'un tag à 20 centimes gère très bien. Si vous voulez un jour le décryptage plus poussé, j'ai fait un tour puce par puce dans [les types de tags NFC pour iPhone](/blog/nfc-tag-types-for-iphones/).

---

## Comment fonctionnent les tags NFC (la version simple)

Les gens s'attendent à ce que ce soit compliqué. Ça ne l'est pas. Voici tout le processus, du début à la fin :

1. **Transfert d'énergie** - L'antenne NFC de votre téléphone génère un champ électromagnétique. Quand un tag entre dans ce champ (~4 cm), le champ induit un minuscule courant dans la bobine d'antenne du tag, et ce courant alimente la puce.

2. **Échange de données** - La puce alimentée renvoie ses données stockées à votre téléphone sous forme d'ondes radio modulées à 13,56 MHz. L'échange prend environ 100 millisecondes.

3. **Action** - Votre téléphone lit les données et décide quoi faire. Une URL s'ouvre dans le navigateur. Un numéro de téléphone propose d'appeler. Un enregistrement Wi-Fi propose de se connecter. Un enregistrement propre à une app ouvre l'app correspondante.

Pas d'appairage. Pas de PIN. Aucune app requise pour une lecture basique. Approchez et c'est parti.

### NDEF : la langue que parlent les tags

Les données d'un tag NFC sont structurées à l'aide du **NDEF** (NFC Data Exchange Format). Je vois le NDEF comme la langue commune qui permet à n'importe quel téléphone NFC de comprendre n'importe quel tag NFC.

Les types d'enregistrements NDEF courants :
- **URI** - Un lien web (http, https, tel:, mailto:)
- **Texte** - Du texte brut dans n'importe quelle langue
- **Smart Poster** - URL + titre + icône combinés
- **Wi-Fi** - Nom du réseau, mot de passe et type de sécurité
- **vCard** - Des coordonnées
- **MIME** - N'importe quel type de données personnalisé, utilisé par les apps pour des actions sur mesure

Quand vous écrivez un tag dans une app comme NFC.cool Tools, vous créez des enregistrements NDEF. Quand un téléphone lit le tag, il analyse ces enregistrements et agit en conséquence. C'est tout le modèle - une fois que ça a fait tilt pour moi, tout le reste du NFC a pris son sens.

---

## Lire des tags NFC

### Sur iPhone

Les iPhone gèrent les tags automatiquement. Sur **iPhone XS et modèles ultérieurs** (et l'iPhone SE de 3e génération), la lecture NFC tourne en arrière-plan - tenez le haut du téléphone près d'un tag et il le lit instantanément, sans aucune app. Les iPhone plus anciens (7, 8, X) vous obligent à ouvrir d'abord une app de lecture NFC.

Ce qui se passe quand vous scannez dépend des données :
- **URL** - une notification apparaît, appuyez pour l'ouvrir dans Safari
- **Numéro de téléphone** - une option pour appeler
- **App Clip** - lance un App Clip s'il en existe un
- **Données personnalisées** - ouvre l'app associée

Si vous voulez juste voir ce qui est sur un tag tout de suite, vous pouvez aussi [lire des tags NFC directement depuis votre navigateur](/online-nfc-reader/) sur Android - sans installation.

### Sur Android

La plupart des téléphones Android ont le NFC depuis environ 2012. La lecture est activée par défaut ; vous trouverez le réglage dans Paramètres, Appareils connectés, NFC. Approchez un tag et Android confie les données à l'app la plus adaptée - les URL au navigateur, les contacts au carnet d'adresses, les enregistrements personnalisés à leur app.

---

## Écrire des tags NFC

C'est la partie que je trouve vraiment amusante. Écrire sur un tag, c'est le programmer avec les données que vous voulez.

### Ce dont vous avez besoin

1. Un téléphone compatible NFC
2. Une app d'écriture NFC (comme **NFC.cool Tools** - disponible pour [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-tags-beginners-guide-fr&mt=8) et [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-tags-beginners-guide-fr))
3. Un tag NFC vierge ou réinscriptible

### Comment écrire un tag

Le processus est court :
1. Ouvrez votre app d'écriture NFC
2. Choisissez quoi écrire (URL, texte, identifiants Wi-Fi, contact, etc.)
3. Saisissez les données
4. Approchez votre téléphone du tag
5. Attendez la confirmation, en général une seconde environ

C'est tout. Le tag contient désormais vos données et fonctionne avec n'importe quel téléphone NFC qui le lit. Si vous voulez le guide propre à l'iPhone, j'en ai écrit un ici : [comment écrire des tags NFC sur iPhone](/blog/write-nfc-tags-iphone/).

### Important : verrouiller les tags

Une fois un tag écrit, vous pouvez éventuellement le **verrouiller**. Le verrouillage le rend définitivement en lecture seule - personne ne peut le réécrire ni l'effacer. Il n'y a pas de retour en arrière.

Je traite le verrouillage comme une étape délibérée et finale, jamais comme quelque chose à valider en vitesse. Verrouillez un tag quand :
- Il est accessible au public (sur une affiche, un produit ou une carte de visite)
- Vous voulez empêcher toute altération
- Les données ne changeront pas

Laissez-le déverrouillé quand :
- Vous pourriez mettre à jour les données plus tard
- Vous êtes encore en train d'expérimenter
- Il vit dans un environnement contrôlé, comme votre maison

---

## 16 façons concrètes d'utiliser les tags NFC

Je pourrais en lister une centaine. Voici celles vers lesquelles je reviens sans cesse - les usages que j'ai vus tenir dans le temps.

### À la maison

**1. Partage du réseau Wi-Fi invité**
Collez un tag près de votre porte d'entrée ou dans la chambre d'amis et programmez-le avec vos identifiants Wi-Fi. Les invités l'approchent et se connectent instantanément, sans taper un long mot de passe.

**2. Scènes domotiques**
Placez des tags dans la maison pour déclencher des automatisations. Approchez celui de votre table de nuit pour « bonne nuit » (lumières éteintes, alarme réglée, mode Ne pas déranger activé). Approchez celui près de la porte pour « je pars » (lumières éteintes, thermostat baissé, l'aspirateur démarre).

**3. Réveil**
Mettez un tag dans la cuisine ou la salle de bains et créez un raccourci qui ne désactive votre alarme du matin que lorsque vous le scannez physiquement. Ça marche - ça vous force à sortir du lit.

**4. Manuels d'appareils**
Collez un tag sur la machine à laver ou le lave-vaisselle et pointez-le vers le PDF du manuel. Vous ne chercherez plus jamais un manuel.

**5. Rappels de médicaments**
Placez un tag sur un flacon de médicaments. Le scanner enregistre un horodatage dans une note ou un tableur, ce qui vous donne une trace de la prise.

### Au travail

**6. Cartes de visite numériques**
Le cas d'usage NFC le plus populaire en entreprise. Au lieu de cartes papier, une carte de visite NFC partage vos coordonnées d'un simple geste. [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-nfc-tags-beginners-guide-fr&mt=8) vous permet de créer une carte numérique professionnelle et d'écrire son URL sur n'importe quel tag NFC tiers - les destinataires iOS voient un App Clip natif, les destinataires Android ouvrent un site web sur le domaine nfc.cool, et les deux peuvent enregistrer votre contact d'un simple geste.

**7. Enregistrement en salle de réunion**
Mettez un tag à l'extérieur des salles de réunion. Le scanner lance votre agenda ou enregistre la présence - plus simple que n'importe quel système de réservation.

**8. Connexion à du matériel partagé**
Fixez des tags sur les appareils ou outils partagés. Le scan enregistre qui l'a emprunté et quand.

**9. Lien rapide vers des documents partagés**
Collez un tag sur un tableau blanc ou dans un espace projet, pointant vers le lecteur partagé, la page Notion ou le tableau de tâches.

### En déplacement

**10. Bluetooth et navigation de la voiture**
Mettez un tag sur votre support de voiture. Le scanner connecte le Bluetooth, ouvre votre app de navigation et lance votre playlist de conduite.

**11. Identification des bagages**
Glissez un tag NFC verrouillé contenant vos coordonnées à l'intérieur de vos bagages. S'ils sont retrouvés, n'importe qui avec un téléphone peut identifier le propriétaire.

**12. Médaille d'identité pour animal**
Fixez un tag au collier de votre animal avec vos coordonnées et ses informations médicales - plus durable et plus riche en données qu'une médaille gravée.

**13. Lancement de la salle de sport et de l'entraînement**
Un tag sur votre sac de sport ou votre casier qui ouvre votre app d'entraînement avec la séance du jour chargée.

### Usages créatifs

**14. Commande à table au restaurant**
Si vous tenez un restaurant, intégrez des tags dans les tables. Les clients les approchent pour voir le menu, commander ou payer. Beaucoup d'établissements ont adopté ça pendant le COVID et ne sont jamais revenus en arrière.

**15. Art et expositions interactifs**
Les musées et galeries placent des tags à côté des oeuvres pour que les visiteurs les approchent et accèdent à des guides audio, des notes d'artiste ou des expériences en réalité augmentée.

**16. Chasses au trésor et jeux**
Cachez des tags autour d'un lieu, chacun révélant un indice ou une énigme. Parfait pour la cohésion d'équipe, les anniversaires d'enfants ou les jeux façon escape game.

---

## Les tags NFC et les Raccourcis iPhone

C'est ce que je préfère montrer aux gens. L'app **Raccourcis** d'Apple (intégrée à iOS) prend en charge nativement les déclencheurs NFC, et c'est là que les tags passent d'utiles à vraiment puissants sur iPhone.

Voici comment en configurer un :
1. Ouvrez l'app Raccourcis
2. Allez dans l'onglet **Automatisation**
3. Appuyez sur **Nouvelle automatisation**, puis sur **NFC**
4. Scannez le tag que vous voulez utiliser comme déclencheur
5. Créez l'automatisation qui vous plaît

Le côté malin : le tag n'a même pas besoin de données écrites dessus. Raccourcis reconnaît le tag à son identifiant matériel unique, donc un tag totalement vierge peut déclencher quelque chose de complexe :

- Lancer un mode de concentration et un minuteur quand vous approchez le tag sur votre bureau
- Enregistrer votre heure d'arrivée dans un tableur quand vous approchez le tag du bureau
- Envoyer « je rentre » à votre partenaire quand vous approchez le tag de la voiture
- Activer ou désactiver des appareils domotiques précis

Sur Android, des apps comme **Tasker** et **MacroDroid** font le même genre d'automatisation déclenchée par NFC.

---

## Questions fréquentes

### Les tags NFC ont-ils besoin de piles ?
Non. Les tags NFC sont entièrement passifs - ils puisent leur énergie dans le champ de l'appareil qui les lit. Ils ne se déchargent jamais et peuvent durer une décennie ou plus.

### Les tags NFC peuvent-ils être piratés ?
Les tags standard n'ont aucun chiffrement par défaut, donc n'importe qui avec un téléphone NFC peut lire un tag déverrouillé et non protégé. Pour la plupart des usages - partager une URL, déclencher un raccourci - je ne considère pas ça comme un problème. Pour les applications sensibles, utilisez un tag doté de fonctions cryptographiques (comme le NTAG424 DNA), ou assurez-vous que le tag ne déclenche qu'une action nécessitant une authentification supplémentaire.

### À quelle distance dois-je tenir mon téléphone ?
À environ 1 à 4 cm. Sur les iPhone, l'antenne NFC se trouve en haut du téléphone ; sur la plupart des Android, elle est au milieu de la partie supérieure du dos. Vous trouverez le point idéal en quelques essais.

### Puis-je réécrire des tags NFC ?
Oui, tant que le tag n'a pas été verrouillé. La plupart des tags supportent environ 100 000 cycles d'écriture, donc vous pouvez les reprogrammer autant que vous voulez. Une fois verrouillé, un tag est définitivement en lecture seule.

### Combien de données un tag NFC peut-il stocker ?
Cela dépend de la puce : le NTAG213 contient ~144 octets, le NTAG215 ~504 octets, le NTAG216 ~888 octets. Une URL typique fait de 30 à 80 octets. Ce n'est pas beaucoup - les tags conviennent surtout à de courtes données ou à des pointeurs vers du contenu en ligne.

### Les tags NFC fonctionnent-ils à travers les coques ?
Oui. Le NFC fonctionne à travers la plupart des coques de téléphone, des autocollants et des matériaux fins. Les coques très épaisses ou métalliques peuvent réduire la portée. Si vous collez un tag sur du métal, utilisez-en un conçu pour les surfaces métalliques - il possède une couche de blindage en ferrite.

### Quelle est la différence entre un tag NFC et une carte NFC ?
Rien de fondamental. Une carte NFC n'est qu'un tag NFC dans un corps en forme de carte - la puce et l'antenne sont la même technologie. Les cartes utilisent en général du NTAG213 ou du NTAG215 et sont populaires pour les cartes de visite, les badges d'accès et les programmes de fidélité.

---

## Pour commencer : votre premier projet NFC

Envie d'essayer ? Voici un projet de cinq minutes par lequel je ferais débuter n'importe qui :

**Projet : un tag de partage Wi-Fi pour votre maison**

1. **Achetez des tags :** procurez-vous un paquet d'[autocollants NTAG216](/affiliate-links/) (environ 10 $ les 25)
2. **Téléchargez NFC.cool Tools :** pour [iOS](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-tags-beginners-guide-fr&mt=8) ou [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-tags-beginners-guide-fr)
3. **Écrivez vos identifiants Wi-Fi :** ouvrez l'app, choisissez Écrire, puis Wi-Fi, saisissez le nom de votre réseau et le mot de passe, et approchez votre téléphone du tag
4. **Placez le tag :** à un endroit visible - près de la porte d'entrée, sur le frigo, dans une chambre d'amis
5. **Testez-le :** approchez un autre téléphone et vous devriez recevoir une invitation à rejoindre le réseau

Coût total : environ 0,30 $ et deux minutes. Chaque invité qui passe vous en remerciera.

---

## Pour conclure

Les tags NFC font partie de ces technologies qui semblent complexes et se révèlent remarquablement simples. Pas de piles, pas d'appairage, aucune app nécessaire pour une lecture basique. Quelques centimes vous achètent une puce programmable qui dure des années et fonctionne avec des milliards de téléphones.

J'ai bâti mon travail autour de ces petites puces, et je leur trouve encore de nouveaux usages. Que vous vouliez automatiser votre matin, partager vos coordonnées ou construire quelque chose de ludique - un tag est le pont entre approcher un téléphone et faire arriver quelque chose dans le monde réel.

**Prêt à commencer à programmer des tags NFC ?** Téléchargez [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-tags-beginners-guide-fr&mt=8) pour iPhone ou [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-tags-beginners-guide-fr) - c'est le moyen le plus simple que je connaisse de lire, écrire et gérer des tags NFC.

**Envie d'une carte de visite numérique propulsée par le NFC ?** Jetez un oeil à [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-nfc-tags-beginners-guide-fr&mt=8) - partagez votre contact d'un simple geste. L'interface de l'app et l'App Clip sont disponibles en 35 langues.
