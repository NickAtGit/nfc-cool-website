---
id: "amiibo-iphone-android-read-collect-backup-2026-07"
title: "Lire, collectionner et sauvegarder vos Amiibo sur iPhone et Android"
date: "2026-07-02"
tags: ["announcements", "iphone", "android"]
summary: "Je veux que NFC.cool soit la meilleure app NFC sur iPhone et Android, alors je lui ai donné une prise en charge complète des Amiibo : scannez une figurine pour voir ses détails, constituez une collection personnelle, et sauvegardez-en une sur un NTAG215 vierge. Voici comment les Amiibo fonctionnent réellement sous le capot - et pourquoi l'app ne fournit aucune clé."
image: "/assets/images/Blog/amiibo-iphone-android-read-collect-backup.webp"
imageAlt: "Une figurine de collection NFC imaginaire à côté d'un téléphone affichant un écran de collection privée"
author: "Nicolo Stanciu"
metaTitle: "Amiibo sur iPhone et Android : lire, collectionner, sauvegarder"
metaDescription: "NFC.cool lit les Amiibo sur iPhone et Android, tient une collection, et les sauvegarde sur des tags NTAG215 vierges. Comment les Amiibo fonctionnent sous le capot, et les limites en toute honnêteté."
ogTitle: "Lire, collectionner et sauvegarder vos Amiibo sur iPhone et Android"
ogDescription: "J'ai donné à NFC.cool une prise en charge complète des Amiibo - scannez, collectionnez, et sauvegardez-en une sur un tag vierge. Voici comment les Amiibo fonctionnent vraiment, et pourquoi l'app ne fournit aucune clé."
---
Les gens s'imaginent qu'il y a quelque chose d'exotique à l'intérieur d'un Amiibo. Un morceau de silicium Nintendo qu'on ne peut acheter nulle part ailleurs. Il n'y a rien de tel. Scellé dans le socle de la figurine se trouve un [NTAG215](/affiliate-links/) - la même puce vierge en autocollant que je lis et écris tous les jours, du genre qui se vend par dix dans un paquet pour trois fois rien. Environ 540 octets de mémoire, un numéro de série gravé en usine, et voilà toute la figurine. C'est le plastique qui coûte cher. La puce est presque accessoire.

C'est exactement pour ça que ça me tracassait depuis si longtemps. Je lis et j'écris des tags NFC pour gagner ma vie, et il y avait toute une catégorie d'entre eux - une poignée de figurines sur l'étagère à côté de mon bureau - devant laquelle ma propre app haussait simplement les épaules. Je veux que NFC.cool soit l'app NFC la plus complète que vous puissiez installer sur votre téléphone, celle qui ne laisse de côté aucun type de tag.

Alors je me suis assis, les figurines d'un côté et ma Switch de l'autre, et j'ai doté NFC.cool d'une vraie prise en charge des Amiibo. Voici ce que ça a donné, et ce que j'ai appris en chemin - à commencer par la raison pour laquelle une puce aussi bon marché est étonnamment difficile à copier.

---

## Alors, où est la magie ?

Si la puce est aussi ordinaire, la magie n'est manifestement pas dans le silicium. Elle est dans les octets. Un Amiibo, c'est en réalité un carnet bon marché que Nintendo a rempli dans un code privé, puis signé en bas de page pour qu'on puisse distinguer une contrefaçon de l'original. (La puce elle-même est un simple [NTAG215](/blog/nfc-tag-types-for-iphones/), si vous voulez le tour d'horizon plus poussé des types de tags.)

Deux choses vivent dans ces octets. La première est à découvert : un petit bloc qui indique de quel personnage il s'agit - Link, de la série Legend of Zelda, dans une gamme d'Amiibo particulière. C'est la partie que votre Switch lit pour savoir qu'une figurine vient de la toucher. La seconde partie est verrouillée : les vraies données de sauvegarde, comme un surnom, le Mii du propriétaire, le nombre de fois où la figurine a été utilisée, et tout ce que le jeu en cours a griffonné dans le petit bloc-notes qu'il a le droit d'utiliser. Cette partie est chiffrée, et elle est signée.

## Pourquoi vous ne pouvez pas simplement copier un Amiibo

La sauvegarde chiffrée n'est pas protégée par une seule clé fixe qu'on pourrait retrouver une fois et réutiliser pour toujours. Chaque tag reçoit ses propres clés, dérivées sur le moment à partir d'un jeu de clés maîtresses mélangées à des données tirées de ce tag précis - dont son numéro de série unique. En plus de ça, l'ensemble est signé avec un HMAC. Changez un seul octet sans le resigner, et la console repère la contrefaçon et refuse la figurine.

Et voici le piège. Comme le numéro de série est intégré à la fois dans la dérivation des clés et dans la signature, vous ne pouvez pas vider un vrai Amiibo et le copier octet par octet sur un tag vierge. Le tag vierge a un numéro de série différent, donc chaque clé dérivée ressort différente, la signature ne correspond plus, et la console le rejette. L'approche évidente qui consiste à « juste copier toutes les pages » échoue à chaque fois.

Pour faire une copie valide, vous devez redériver les clés en fonction du tag de destination et resigner les données pour qu'elles soient valides pour ce morceau précis de plastique et de silicium, pas celui d'où vous les avez extraites. L'implémentation de référence sur laquelle tout le monde s'appuie est un outil appelé amiitool. J'ai reconstruit toute cette chorégraphie nativement dans l'app - du format du tag au format interne et retour, dérivation des clés, chiffrement, signature - pour que NFC.cool puisse le faire sur le téléphone que vous tenez en main, sans aucun ordinateur dans la boucle.

## Ce que NFC.cool fait désormais

Trois choses, dans l'ordre où vous les utiliserez probablement.

**Lire.** Approchez un Amiibo du dos de votre téléphone, exactement comme vous [liriez n'importe quel tag NFC](/features/nfc-reader-writer/), et NFC.cool l'identifie sur-le-champ : le personnage, la série de jeu, la série d'Amiibo, le type de figurine et l'illustration, ainsi que quelques informations tirées du tag lui-même, comme le nombre de fois où il a été écrit. Aucune clé nécessaire pour ça. Identifier une figurine ne touche que la partie déjà à découvert.

**Collectionner.** Chaque Amiibo que vous scannez est enregistré dans Ma collection, une simple grille de tout ce que vous possédez. Elle reste sur votre appareil - sur iPhone, elle se synchronise avec vos autres appareils Apple via iCloud - et les illustrations sont mises en cache pour que la collection reste correcte hors ligne. Rien que ça a transformé ma triste petite étagère en quelque chose que je peux réellement parcourir.

**Sauvegarder et restaurer.** Avec vos propres clés importées, vous pouvez écrire une copie d'une figurine, avec des clés recalculées, sur un NTAG215 vierge. Vous pouvez en sauvegarder une directement depuis une figurine que vous venez de scanner, ou restaurer depuis un fichier `.bin` enregistré sur votre appareil. L'app redérive les clés pour le tag vierge que vous tenez et signe les données pour ce tag, de sorte que la copie est valide selon ses propres termes, plutôt qu'une contrefaçon octet par octet vouée à l'échec. L'écriture est définitive - une fois le tag verrouillé, il est verrouillé - et l'app le dit clairement avant que vous ne validiez.

## Ce qui est délibérément laissé de côté

NFC.cool ne fournit pas les clés Amiibo, et ne le fera jamais. Il n'y a aucune clé cachée dans l'app, et aucune bibliothèque de données Amiibo intégrée.

La lecture et la collection fonctionnent d'emblée parce qu'elles ne touchent jamais que la partie ouverte du tag. La sauvegarde, c'est différent : elle a besoin des clés maîtresses, et celles-ci appartiennent à Nintendo, pas à moi. Si vous vous les êtes procurées vous-même - le fichier combiné `key.bin`, ou les deux fichiers séparés - vous les importez une fois dans l'app et la fonction de sauvegarde s'active. Sinon, elle reste désactivée. J'ai construit la machine ; à vous d'apporter le carburant.

Je pense que c'est la ligne honnête à suivre. La capacité est réellement utile. Sauvegarder une figurine que votre enfant risque de perdre au premier mauvais après-midi, ou mettre un double sur une carte bon marché plutôt que de risquer l'original, sont de vraies raisons pour lesquelles les gens veulent ça. Je préfère vous donner un moyen propre et privé de le faire sur votre propre téléphone plutôt que de faire comme si la demande n'existait pas. Mais je ne vais pas distribuer quelque chose qu'il ne m'a jamais appartenu de distribuer.

## Pour être clair

Deux choses sur lesquelles je veux être franc.

Premièrement, c'est mon app, pas celle de Nintendo. NFC.cool n'est ni conçue, ni affiliée, ni approuvée, ni sponsorisée par Nintendo. Amiibo, Nintendo Switch et les titres de jeux que je mentionne sont des marques de leurs propriétaires respectifs, et je ne les nomme que pour que vous sachiez avec quoi la fonctionnalité est compatible.

Deuxièmement, les outils de sauvegarde et de restauration sont là pour un usage éducatif et personnel : protéger des figurines que vous possédez déjà. Faites un double de celle que votre enfant n'arrête pas de faire tomber, ou gardez un original dans sa boîte pendant qu'un NTAG215 bon marché encaisse l'usure quotidienne. C'est l'usage pour lequel je l'ai conçu. Apportez vos propres clés, ne sauvegardez que les figurines que vous possédez réellement, et respectez les droits de Nintendo ainsi que ce que dit la loi là où vous vivez. Ce que vous faites de l'outil relève de votre responsabilité.

## Ça fonctionne vraiment

Je ne voulais pas publier ça sur un acte de foi, alors je l'ai testé de la seule façon qui compte.

J'ai scanné une de mes propres figurines, je l'ai sauvegardée sur un NTAG215 vierge, et j'ai emporté la copie jusqu'à ma Switch. J'ai lancé The Legend of Zelda: Tears of the Kingdom, j'ai approché la copie du bon Joy-Con, et elle a déposé une poignée d'objets du jeu dans mon inventaire. Comme l'original. Aucune protestation, aucun « cet Amiibo ne peut pas être lu ». C'est à ce moment-là que tout ça m'a paru réel. Tous ces calculs de dérivation de clés et ces agencements d'octets, et la récompense, c'est un autocollant vierge bon marché qu'une console Nintendo traite volontiers comme la vraie figurine.

---

Cette étagère à côté de mon bureau n'est plus juste de la décoration. C'est une fonctionnalité.

Si vous voulez l'essayer, les outils Amiibo vivent dans NFC.cool sur [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-amiibo-iphone-android-read-collect-backup-fr&mt=8) et [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-amiibo-iphone-android-read-collect-backup-fr), juste à côté de tout le reste de ce que j'ai construit pour lire et écrire des tags. Apportez vos propres clés, touchez une figurine, et découvrez ce que votre app ignorait discrètement depuis tout ce temps.
