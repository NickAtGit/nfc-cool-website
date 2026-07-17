---
id: nfc-blog-010
title: "Comment écrire des tags NFC avec votre iPhone"
date: 2026-03-16
tags: ["nfc-tags", "guides", "iphone"]
summary: "Votre iPhone peut faire plus que lire des tags NFC - il peut aussi les écrire. Voici un guide pas à pas pour programmer des tags NFC avec votre iPhone, du choix des bons tags à l'écriture d'URL, d'identifiants Wi-Fi, de fiches de contact et d'automatisations."
image: "/assets/images/Blog/write-nfc-tags-iphone.webp"
imageAlt: "iPhone écrivant des données sur des tags NFC vierges avec des icônes de progression et de validation"
metaTitle: "Comment écrire des tags NFC avec votre iPhone : guide pas à pas (2026)"
metaDescription: "Apprenez à écrire des tags NFC avec votre iPhone. Instructions pas à pas pour programmer des URL, du Wi-Fi, des contacts et des automatisations avec NFC.cool Tools et les Raccourcis iOS."
ogTitle: "Comment écrire des tags NFC avec votre iPhone"
ogDescription: "Guide pas à pas pour écrire des tags NFC avec votre iPhone - URL, Wi-Fi, contacts et automatisations. Aucun équipement spécial requis."
---
La plupart des gens savent que leur iPhone peut *lire* des tags NFC - payer d'un geste, scanner une carte de transport, ouvrir un lien. Mais ce dont je dois sans cesse convaincre les gens, c'est que votre iPhone peut aussi *écrire* sur des tags NFC, transformant des tags vierges en déclencheurs intelligents pour à peu près n'importe quoi.

J'ai passé des années à développer NFC.cool, une app pour lire et écrire des tags NFC, et l'écriture est vraiment la partie dont je ne me lasse jamais. Envie d'un tag sur votre table de chevet qui met votre téléphone en silencieux et programme une alarme ? D'un tag sur votre bureau qui ouvre votre playlist de travail ? D'un tag près de votre porte d'entrée qui partage votre mot de passe Wi-Fi avec vos invités ? Votre iPhone peut programmer tout cela, et une fois que vous l'aurez fait une fois, vous vous demanderez pourquoi vous avez attendu.

C'est le tutoriel que je donnerais à un ami qui vient d'acheter son premier lot de tags : ce qu'il vous faut, comment écrire les différents types de données, et les projets concrets que je mettrais réellement en place en quelques minutes. Si la technologie elle-même est toute nouvelle pour vous, mon [guide complet des tags NFC pour débutants](/blog/nfc-tags-beginners-guide/) pose d'abord les bases.

---

## Ce qu'il vous faut

Il ne vous faut que trois choses pour commencer à écrire, et aucune n'est chère.

### 1. Un iPhone compatible

L'écriture de tags NFC nécessite un **iPhone 7 ou plus récent** sous **iOS 13 ou une version ultérieure**. Si vous avez acheté votre iPhone au cours des huit dernières années, vous êtes couvert.

Pour la meilleure expérience, je choisirais un iPhone doté de la **lecture NFC en arrière-plan** (iPhone XS et plus récents). Ces modèles peuvent lire des tags NFC sans qu'on ait besoin d'ouvrir une app au préalable, ce qui rend les tags que vous écrivez bien plus agréables à utiliser au quotidien. Si vous voulez savoir exactement comment le matériel de l'iPhone gère tout cela, j'ai creusé le sujet dans [un regard d'initié sur le NFC des iPhone](/blog/nfc-on-iphones-insider-look/).

### 2. Des tags NFC vierges

Vous pouvez [acheter des tags NFC vierges](/affiliate-links/) en ligne pour aussi peu que **0,30 €-1,00 € pièce**. Ils existent sous plusieurs formats :

| Format | Idéal pour |
|-------------|----------|
| **Autocollants** (ronds, 25-30 mm) | Surfaces, objets, affiches |
| **Cartes** (format carte bancaire) | Portefeuilles, cartes de visite |
| **Porte-clés** | Trousseaux, accroches de sac |
| **Bracelets** | Événements, contrôle d'accès |
| **Tags jetons** (disques épais) | Intégration dans des objets |

**Quelle puce acheter ?**

Si vous me demandiez d'en choisir une seule, pour la plupart des projets le **NTAG216** est le bon compromis - 888 octets de mémoire utilisable, largement compatible et abordable en gros. C'est la puce que je recommande et sur laquelle je teste le plus. Voici le résumé rapide :

- **NTAG213** (144 octets) - Suffit pour des URL et du texte simple. L'option la moins chère.
- **NTAG215** (504 octets) - Suffit pour des fiches de contact, des identifiants Wi-Fi et plusieurs enregistrements.
- **NTAG216** (888 octets) - Le meilleur polyvalent. La plus grande marge pour des fiches de contact, des identifiants Wi-Fi et des contenus plus longs comme des vCards détaillées - ce que je recommande pour la plupart des projets.

En cas de doute, commencez par un lot d'autocollants NTAG216 assortis et arrêtez de vous compliquer la vie - ils couvrent 90 % des cas d'usage. Pour le tour d'horizon complet puce par puce, y compris les types que les iPhone apprécient réellement, j'ai écrit [un guide des types de tags NFC pour iPhone](/blog/nfc-tag-types-for-iphones/).

### 3. Une app pour écrire des tags NFC

Votre iPhone a besoin d'une app pour écrire des données sur les tags. La prise en charge NFC intégrée d'Apple gère la lecture, mais pour l'écriture, il vous faut une app dédiée.

C'est la partie sur laquelle j'ai passé des années, alors je vais être franc sur mon parti pris : **[NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-fr&mt=8)** est conçu exactement pour ça, à la fois sur iPhone et sur [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-fr). Il permet d'écrire tous les types d'enregistrements NDEF standard - URL, texte, configurations Wi-Fi, contacts et plus encore - avec une interface épurée qui indique précisément la quantité de mémoire du tag que vous utilisez. Il permet aussi de verrouiller les tags, de lire les détails techniques et d'automatiser l'écriture via les Raccourcis iOS. Vous pouvez voir la liste complète des fonctionnalités sur la [page lecteur et enregistreur NFC](/features/nfc-reader-writer/).

D'autres options existent (comme l'app Raccourcis d'Apple pour l'écriture basique d'URL), mais une app NFC dédiée vous donne plus de contrôle sur ce que vous écrivez et comment.

---

## Pas à pas : écrire votre premier tag NFC

Je vais commencer là où je commence avec tout le monde : écrire une URL sur un tag. C'est le cas d'usage le plus courant et la victoire la plus rapide.

### Écrire une URL

1. **Ouvrez NFC.cool Tools** et touchez l'onglet **Écrire**
2. **Sélectionnez « URL »** comme type d'enregistrement
3. **Saisissez votre URL** - par exemple, `https://nfc.cool`
4. **Touchez « Écrire sur le tag »**
5. **Approchez votre iPhone du tag NFC vierge** - le bord supérieur de votre iPhone (là où se trouve l'antenne NFC) doit être à moins de 2-3 cm du tag
6. **Attendez la confirmation de réussite** - vous sentirez une vibration haptique et verrez une coche

C'est tout. Désormais, quiconque approche son téléphone de ce tag sera redirigé vers votre URL - sans app, sans QR code à scanner. La première fois que j'ai vu la tête d'un collègue quand un simple autocollant a ouvert un site web, j'ai su que c'était par cette démo qu'il fallait commencer.

**Astuce de pro :** Sur les iPhone, l'antenne NFC se situe sur le **bord supérieur** du téléphone, près de l'appareil photo. Pour la connexion la plus forte, tenez le haut de votre iPhone directement au-dessus du tag. Si vous voulez vérifier ce que vous avez écrit sans app, vous pouvez [lire des tags NFC directement depuis votre navigateur](/online-nfc-reader/) sur Android.

---

## Que pouvez-vous écrire sur des tags NFC ?

Les tags NFC utilisent un format appelé **NDEF** (NFC Data Exchange Format) qui définit des types d'enregistrements standard. Une fois que ce modèle a fait tilt pour moi, toute la technologie a cessé de ressembler à de la magie. Voici ce que vous pouvez écrire :

### URL et liens

L'usage le plus courant, et celui vers lequel je me tourne le plus. Écrivez n'importe quelle adresse web, et le fait d'approcher le téléphone du tag l'ouvre dans le navigateur du téléphone.

**Usages pratiques :**
- Lien vers le menu d'un restaurant sur un tag posé sur la table
- Portfolio ou profil LinkedIn sur une carte de visite
- Lien vers une fiche produit sur les tags des rayons en magasin
- Lien vers un formulaire d'avis à l'accueil

**Mémoire nécessaire :** ~30-80 octets (la plupart des URL tiennent sur n'importe quel tag)

### Identifiants de réseau Wi-Fi

Écrivez le nom (SSID) et le mot de passe de votre réseau Wi-Fi sur un tag. Vos invités approchent leur téléphone du tag et se connectent automatiquement - sans saisir de longs mots de passe.

**Comment écrire des identifiants Wi-Fi :**

1. Dans NFC.cool Tools, sélectionnez **« Wi-Fi »** comme type d'enregistrement
2. Saisissez le **nom du réseau** (SSID)
3. Saisissez le **mot de passe**
4. Sélectionnez le **type de sécurité** (WPA2 ou WPA3 pour la plupart des réseaux domestiques)
5. Écrivez sur le tag

**Astuce de pro :** Placez un tag Wi-Fi près de votre routeur, sur un porte-clés près de la porte, ou dans une chambre d'amis. Étiquetez-le « Approchez pour le Wi-Fi » - d'après mon expérience, c'est le tag pour lequel chaque invité finit par vous remercier.

**Mémoire nécessaire :** ~60-120 octets selon la longueur du mot de passe

### Fiches de contact (vCard)

Écrivez un contact vCard sur un tag. Lorsque quelqu'un l'approche, vos coordonnées apparaissent, prêtes à être enregistrées - nom, téléphone, e-mail, entreprise, adresse.

C'est essentiellement ce que fait une carte de visite numérique, mais intégré directement dans un tag physique. Aucune app, aucune connexion internet nécessaire - les données de contact vivent sur le tag lui-même.

**Comment écrire un contact :**

1. Sélectionnez **« Contact »** comme type d'enregistrement
2. Remplissez les champs que vous voulez partager (nom, téléphone, e-mail, etc.)
3. Écrivez sur le tag

**Mémoire nécessaire :** ~100-400 octets selon le nombre de champs que vous incluez. Utilisez un NTAG215 ou un NTAG216 pour des contacts avec adresses et notes.

Un avertissement honnête tiré des e-mails d'assistance que je lis : les vCards brutes sur un tag peuvent se comporter de façon irrégulière sur iPhone. Si la vôtre ne s'ouvre pas correctement, j'ai fouillé les causes dans [pourquoi votre tag NFC vCard ne fonctionne pas sur iPhone](/blog/vcard-nfc-iphone-not-working/).

**Remarque :** Pour une expérience plus riche avec photos, liens sociaux et statistiques, jetez un œil à **[NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-fr&mt=8)** - il crée un profil de carte de visite numérique hébergé et peut écrire le lien sur n'importe quel tag NFC. Lorsque quelqu'un approche son téléphone, les utilisateurs iOS voient un App Clip natif et les utilisateurs Android ouvrent un site web sur le domaine nfc.cool - sans app. Dans mon propre réseautage, j'ai trouvé cela bien plus fiable que les vCards brutes.

### Texte brut

Écrivez n'importe quel message texte sur un tag. Moins courant que les URL, mais utile pour :

- Les étiquettes d'inventaire (numéros de série, descriptions)
- Les instructions ou notes attachées à un équipement
- Les messages cachés dans des chasses au trésor
- Le suivi des biens dans les entrepôts

**Mémoire nécessaire :** Varie selon la longueur du texte (~1 octet par caractère)

### Numéros de téléphone et adresses e-mail

Écrivez un URI `tel:` ou `mailto:` pour déclencher un appel téléphonique ou composer un e-mail lorsqu'on approche le téléphone.

Utile pour :
- Les tags de contact d'urgence sur du matériel médical
- Les tags « Appeler le service » sur les distributeurs automatiques
- Les tags de contact du support sur les produits

### Données propres à une app

Certaines apps peuvent écrire des enregistrements NDEF personnalisés qui déclenchent des actions spécifiques dans l'app. Par exemple, vous pourriez écrire un enregistrement qui ouvre un raccourci, une playlist ou un écran d'app précis.

---

## Pour aller plus loin : écrire avec les Raccourcis iOS

C'est là que ça devient amusant pour moi. L'app **Raccourcis** d'Apple prend en charge l'écriture NFC de manière native, et NFC.cool Tools va plus loin avec ses propres actions Raccourcis.

### Écriture basique d'URL avec Raccourcis

1. Ouvrez l'app **Raccourcis**
2. Créez un nouveau raccourci
3. Recherchez l'action **« Écrire un tag NFC »** (sous Scripts → NFC)
4. Configurez ce que vous voulez écrire (URL, texte, etc.)
5. Exécutez le raccourci et approchez un tag

C'est pratique pour écrire en série plusieurs tags avec les mêmes données.

### Intégration Raccourcis de NFC.cool Tools

NFC.cool Tools ajoute ses propres actions Raccourcis, ce qui vous donne plus d'options :

- **Écrire un tag** - Écrire par programmation n'importe quel type d'enregistrement pris en charge
- **Lire un tag** - Scanner et renvoyer les données du tag à votre raccourci
- **Historique des scans** - Accéder à vos résultats de scan récents

Cela ouvre des possibilités d'automatisation. Par exemple, vous pourriez créer un raccourci qui :
1. Demande le nom d'un produit
2. Génère une URL comme `https://yoursite.com/product/{name}`
3. L'écrit sur un tag NFC
4. Consigne le tag dans un tableur

Parfait pour l'étiquetage d'inventaire en série ou la préparation de badges d'événement.

---

## Projets concrets avec des tags NFC

Voici les projets sur lesquels je reviens sans cesse - prêts à réaliser, et chacun ne prend que quelques minutes :

### Tags pour la maison connectée

**Tag de table de chevet - « Mode coucher »**
Écrivez une URL qui déclenche un raccourci iOS pour :
- Activer le mode Ne pas déranger
- Régler l'alarme du lendemain
- Baisser la luminosité de l'écran
- Lancer une playlist de sommeil

**Tag de bureau - « Mode travail »**
- Ouvrir votre gestionnaire de tâches
- Démarrer un minuteur de concentration
- Se connecter au VPN de votre travail
- Lancer une playlist de concentration

**Tag de porte - « Je pars »**
- Consulter les prévisions météo
- Afficher le temps de trajet
- Déclencher la scène « absent » de la maison connectée

### Tags professionnels

**Tag pour badge de conférence**
Écrivez l'URL de votre NFC.cool Business Card sur un tag collé au dos de votre badge de conférence. Vos interlocuteurs approchent leur téléphone de votre badge → votre carte de visite numérique complète apparaît.

**Tags produits**
Écrivez des liens vers la documentation produit, l'enregistrement de garantie ou les pages d'assistance. Collez-les sur les produits ou les emballages.

**Tags de salle de réunion**
Écrivez des liens vers les calendriers de réservation de salle ou des identifiants Wi-Fi. Collez-les près de la porte.

### Projets créatifs

**Tags musique**
Écrivez des liens vers des albums Spotify ou Apple Music sur des autocollants NFC. Collez-les sur des pochettes d'album physiques, et le fait d'approcher le téléphone lance l'album.

**Tags de jeux de société**
Écrivez des liens vers des PDF de règles ou des vidéos tutoriels. Collez-les à l'intérieur du couvercle de la boîte.

**Tags recettes**
Écrivez des liens vers vos recettes préférées et collez les tags sur les pots à épices ou les pages de livres de cuisine.

---

## Verrouiller les tags NFC

Une fois que vous avez écrit un tag et que son contenu vous convient, vous pouvez le **verrouiller**. Le verrouillage rend le tag définitivement en lecture seule - personne ne peut écraser vos données. Je considère cela comme une étape délibérée et finale, jamais quelque chose qu'on valide à la va-vite, car il n'y a pas de retour en arrière.

**Dans NFC.cool Tools :**
1. Touchez l'option **Verrouiller** après l'écriture
2. Confirmez - **c'est irréversible**

**Quand verrouiller :**
- Les tags dans des lieux publics (pour éviter le sabotage)
- Les tags produits (pour protéger vos URL)
- Les cartes de visite (pour protéger vos données de contact)
- Tout tag que vous ne comptez pas réécrire

**Quand NE PAS verrouiller :**
- Les tags que vous pourriez vouloir mettre à jour plus tard (changement de mot de passe Wi-Fi, URL saisonnières)
- L'expérimentation et l'apprentissage - laissez-les réinscriptibles pendant vos tests

---

## Dépannage

La plupart des questions « pourquoi ça ne s'écrit pas » que je reçois se ramènent à l'une de ces quatre causes. Voici comment je m'y prendrais.

### Erreur « Impossible d'écrire »

- **Le tag est peut-être verrouillé.** Si quelqu'un (ou vous-même) a verrouillé le tag auparavant, il est définitivement en lecture seule. Il vous faudra un nouveau tag.
- **Pas assez de mémoire.** Vos données sont peut-être trop volumineuses pour la capacité du tag. Essayez un tag avec plus de mémoire (NTAG215 → NTAG216) ou réduisez vos données.
- **Le tag n'est pas bien positionné.** Déplacez lentement le bord supérieur de votre iPhone au-dessus du tag. Certaines surfaces (métal, coques épaisses) peuvent créer des interférences.
- **Le tag est endommagé.** Les tags NFC sont résistants mais pas indestructibles. Une chaleur extrême, une pliure ou une perforation peuvent les détruire.

### L'écriture semble fonctionner mais le tag ne répond pas

- **Vérifiez le format NDEF.** Les données doivent être écrites au format NDEF pour que les téléphones les lisent automatiquement. NFC.cool Tools s'en charge pour vous, mais les tags écrits sur mesure peuvent présenter des problèmes de formatage.
- **Le modèle d'iPhone compte.** Les iPhone plus anciens (7, 8, X) nécessitent une app pour lire les tags. Les iPhone XS et plus récents lisent les tags automatiquement en arrière-plan.

### Le tag fonctionne sur Android mais pas sur iPhone

- **Vérifiez le type de puce.** Les iPhone fonctionnent mieux avec les puces de la série NTAG (NTAG213, 215, 216). Certains autres types de puces peuvent ne pas être compatibles avec iOS.
- **Formatage NDEF.** Le tag doit être formaté en NDEF. Certains tags achetés en gros arrivent non formatés - écrivez dessus avec NFC.cool Tools pour les formater automatiquement.

---

## Conseils pour tirer le meilleur parti des tags NFC

Voici les petites leçons que j'ai apprises à la dure, pour que vous n'ayez pas à le faire.

1. **Étiquetez vos tags.** Un autocollant vierge sur un bureau n'aide personne. Utilisez une étiqueteuse ou un marqueur pour indiquer ce que fait le tag (« Approchez pour le Wi-Fi », « Mode travail », etc.).

2. **Évitez les surfaces métalliques.** Le métal perturbe les signaux NFC. Si vous devez fixer un tag sur du métal, utilisez des **tags NFC anti-métal** (ils ont une couche de ferrite qui protège des interférences). Ils sont un peu plus épais et plus chers, mais fonctionnent parfaitement sur les surfaces métalliques.

3. **Testez avant de coller.** Écrivez le tag, testez-le, puis retirez l'adhésif et collez-le en place. Décoller un tag déjà collé pour le réécrire, c'est le genre de petite contrariété que j'ai appris à éviter complètement.

4. **Utilisez le bon tag pour la tâche.** Ne gaspillez pas un NTAG216 (888 octets) pour une simple URL qui prend 40 octets. Et n'essayez pas de faire tenir une vCard complète sur un NTAG213 (144 octets).

5. **Des options étanches existent.** Les tags NFC enrobés d'époxy sont étanches et plus résistants. Parfaits pour l'extérieur, les cuisines ou les salles de bains.

6. **Combinez les tags NFC avec les Raccourcis.** La vraie puissance des tags NFC sur iPhone ne se limite pas à ouvrir des URL - c'est de déclencher des automatisations complexes. Un tag NFC peut lancer n'importe quel raccourci iOS, qui peut piloter des appareils de la maison connectée, envoyer des messages, consigner des données et plus encore.

---

## Questions fréquentes

### Puis-je réécrire un tag NFC ?

Oui, tant que le tag n'a pas été verrouillé. Les tags NFC standard peuvent être réécrits **plus de 100 000 fois**. Écrivez simplement de nouvelles données par-dessus les anciennes - pas besoin d'« effacer » au préalable.

### À quelle distance mon iPhone doit-il se trouver ?

À moins de **2-4 cm** (environ 1-2 pouces). L'antenne NFC se trouve sur le bord supérieur de l'iPhone. Tenez le haut de votre téléphone directement au-dessus du tag pour la meilleure connexion.

### Puis-je écrire sur des tags NFC sans app ?

Les Raccourcis iOS ont une action intégrée « Écrire un tag NFC » pour les écritures basiques (URL, texte). Mais pour les identifiants Wi-Fi, les contacts et les enregistrements plus complexes, il vous faudra une app comme NFC.cool Tools.

### Les tags NFC ont-ils besoin de piles ?

Non. Les tags NFC sont **passifs** - ils n'ont pas de pile et puisent leur énergie dans le lecteur NFC de votre téléphone lorsque vous les approchez. Les tags peuvent durer **plus de 10 ans** parce qu'il n'y a rien qui puisse s'épuiser.

### Puis-je protéger un tag NFC par mot de passe ?

Oui. NFC.cool Tools peut définir une protection par mot de passe sur les tags NTAG, à la fois sur iPhone et Android. Notez que cela empêche seulement le tag d'être **réécrit** - cela n'empêche personne de **lire** ce qui s'y trouve déjà. Si vous avez besoin que le contenu lui-même soit illisible sans clé, il vous faut plutôt des données chiffrées - voyez notre guide sur [NFC Safe](/blog/nfc-safe-encrypted-secrets/). Verrouiller un tag est l'autre option : cela bloque définitivement toute nouvelle écriture.

### Les tags NFC fonctionnent-ils à travers une coque de téléphone ?

Oui, la plupart des coques ne posent pas de problème. Le NFC fonctionne à travers le plastique, le silicone, le cuir et même les portefeuilles fins. Les coques très épaisses (comme les coques renforcées ultra-résistantes) ou celles avec des plaques métalliques (pour les supports de voiture magnétiques) peuvent créer des interférences.

### Combien de tags puis-je écrire avec un seul iPhone ?

Un nombre illimité. Il n'y a aucune restriction sur le nombre de tags que vous écrivez. Le facteur limitant, ce sont les tags eux-mêmes, pas votre téléphone.

---

## Et ensuite ?

Maintenant que vous savez écrire des tags NFC, les possibilités sont grandes ouvertes. Mon conseil est toujours le même : commencez par un projet simple - un tag Wi-Fi pour vos invités ou un tag carte de visite - décrochez la petite victoire, et construisez à partir de là.

Si vous cherchez une app d'écriture NFC puissante et facile à utiliser, **[NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-fr&mt=8)** est l'app que j'ai conçue pour faire exactement ça - de l'écriture basique d'URL à la gestion avancée des tags, avec l'intégration des Raccourcis iOS pour l'automatisation.

Et si vous voulez transformer des tags NFC en cartes de visite numériques professionnelles, **[NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-fr&mt=8)** vous permet de créer un beau profil de carte et d'en écrire l'URL sur n'importe quel tag NFC. L'interface de l'app et l'App Clip prennent en charge 35 langues sur iOS, et les destinataires Android voient un site web sur le domaine nfc.cool (actuellement en anglais uniquement).

**Téléchargez NFC.cool Tools :** [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-fr&mt=8) | [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-fr)

**Téléchargez NFC.cool Business Card :** [App Store](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-fr&mt=8) | [Android (dans NFC.cool Tools)](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-fr)
