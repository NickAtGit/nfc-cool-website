---
id: "read-passport-nfc-chip-2026-07"
title: "Lisez la puce NFC de votre passeport avec votre téléphone"
date: "2026-07-20"
tags: ["announcements", "nfc-tags", "privacy"]
summary: "Il y a une puce NFC à l'intérieur de votre passeport, et votre téléphone peut désormais la lire. NFC.cool Tools lit la puce d'un passeport, d'une carte d'identité ou d'un titre de séjour sur iPhone et Android - en affichant la photo et les informations enregistrées, et en vérifiant si le document est authentique."
image: "/assets/images/Blog/read-passport-nfc-chip.webp"
imageAlt: "Un passeport biométrique à côté d'un téléphone qui affiche la photo enregistrée du document et une coche d'authenticité"
author: "Nicolo Stanciu"
metaTitle: "Lisez la puce NFC de votre passeport avec votre téléphone"
metaDescription: "Votre passeport contient une puce NFC, et NFC.cool peut la lire sur iPhone et Android. Consultez la photo et les informations enregistrées sur la puce, et vérifiez si le document est authentique."
ogTitle: "Votre passeport contient une puce NFC. Votre téléphone peut désormais la lire."
ogDescription: "NFC.cool lit désormais la puce de votre passeport, carte d'identité ou titre de séjour - la photo, les informations, et si le document est authentique. Sur iPhone et Android."
---
La dernière fois que j'ai pris l'avion, j'ai passé une minute planté devant l'un de ces sas automatiques de contrôle des passeports - la cabine vitrée où vous posez votre passeport sur le lecteur, levez les yeux vers la caméra et attendez que les portes veuillent bien vous laisser passer. Ça prend un moment. Et dans ce moment-là, je me suis surpris à réfléchir à ce que la machine était réellement en train de faire. Elle ne lisait pas la page imprimée. Elle dialoguait avec la petite puce nichée dans la couverture de mon passeport.

Cela fait des années que je gagne ma vie à lire des puces NFC. Je savais que cette puce était là. Je n'avais simplement jamais pointé ma propre app dessus. Debout dans ce sas, ça me dérangeait sincèrement qu'une borne frontalière puisse lire mon passeport et pas NFC.cool.

C'est exactement ce genre de frustration que NFC.cool est là pour régler. Mon objectif a toujours été simple et un peu têtu : être le meilleur lecteur NFC que vous puissiez mettre sur un téléphone, et prendre en charge tout ce que le NFC sait réellement faire - sans en faire un outil qu'il faut un diplôme d'ingénieur pour tenir en main. Une puce de passeport, c'est à peu près le summum du « tout ce que le NFC sait faire ». Alors je l'ai intégrée.

NFC.cool Tools lit désormais la puce contenue dans un passeport biométrique, une carte d'identité ou un titre de séjour, à la fois sur iPhone et sur Android. Il vous montre la photo et les informations personnelles enregistrées sur la puce, et il vous dit si le document semble authentique. Voici comment ça marche, et où sont ses limites, en toute honnêteté.

---

## La puce ne dira rien tant que vous n'aurez pas prouvé que vous tenez le document

C'est la partie qui surprend les gens : vous ne pouvez pas vous contenter d'agiter votre téléphone au-dessus d'un passeport pour le lire. La puce est verrouillée à dessein. Elle ne dira pas un seul mot tant que vous ne lui aurez pas remis une clé, et cette clé est imprimée à même votre propre document.

Je trouve ça magnifiquement pensé. Ça veut dire que personne ne peut lire discrètement votre passeport pendant qu'il repose dans votre poche ou votre sac. Le seul moyen d'y accéder, c'est d'avoir déjà le document ouvert dans la main, parce que la clé est construite à partir de ce qui y est imprimé : le numéro du document, votre date de naissance et la date d'expiration.

L'app vous demande donc exactement ces trois éléments d'abord, de deux façons possibles. Vous pouvez pointer votre caméra sur la zone lisible par machine - cette bande de caractères `<<<` bien épais le long du bas de la page photo de votre passeport, ou au dos d'une carte d'identité - et NFC.cool la lit optiquement, exactement comme le fait le sas de l'aéroport. Ou bien, si le document est usé ou si la lumière est mauvaise, vous saisissez les trois valeurs à la main. Dans les deux cas, une fois que l'app a la clé, elle vous demande de tenir le haut de votre téléphone contre le document, et la vraie lecture de la puce commence. Si vous vous êtes déjà demandé [comment le NFC fonctionne vraiment sur un iPhone](/blog/nfc-on-iphones-insider-look/), c'est la même poignée de main à courte distance, simplement avec une puce bien plus capricieuse en face.

## Ce que la puce vous livre

Quelques secondes plus tard, vous avez sous les yeux ce que la puce transportait depuis le début : la photo de vous que l'autorité émettrice a enregistrée, votre nom, votre nationalité, le numéro du document, vos dates de naissance et d'expiration, et sur certains documents un peu plus - lieu de naissance, autorité émettrice, date de délivrance. Ce sont les mêmes données que celles que récupère la cabine de l'agent, mais posées dans votre main.

Chaque document que vous lisez est enregistré dans un petit portefeuille au sein de l'app, appelé Mes documents, pour que vous puissiez le retrouver plus tard. Ce portefeuille vit sur votre appareil, et sur iPhone il se synchronise via votre propre iCloud. Il ne me parvient pas, ni à aucun de mes serveurs. Sur quelque chose d'aussi personnel, ce n'est pas un détail que je passerais sous silence.

## Le document est-il authentique ?

La partie dont je suis le plus content, c'est le contrôle d'authenticité. Une puce de passeport moderne n'est pas une simple carte mémoire. Le pays émetteur signe son contenu, un peu comme un cachet de cire pressé dans les données. NFC.cool vérifie ce cachet : que rien sur la puce n'a été modifié depuis sa délivrance, que la signature est mathématiquement valide, et qu'elle remonte à une véritable autorité émettrice que l'app reconnaît. Les meilleures puces peuvent aussi prouver qu'elles sont le silicium d'origine et non une copie, et l'app vérifie cela également lorsque la puce le permet.

Voici toutefois la promesse que je me suis faite au sujet de la formulation. L'app ne qualifiera jamais votre passeport de « faux ». Si tous les contrôles réussissent, elle indique que le document semble authentique. Si quelque chose ne colle pas - ou, bien plus souvent, si elle ne parvient tout simplement pas à confirmer l'émetteur parce que ce pays ne figure pas dans la liste que l'app embarque - elle indique qu'elle n'a pas pu vérifier, et elle s'arrête là. « Je n'ai pas pu contrôler ceci » et « ceci est un faux » sont deux phrases très différentes, et je ne suis pas prêt à les confondre sur quelque chose d'aussi sérieux que votre pièce d'identité.

## Ce que l'app ne sait pas faire

Quelques réponses franches, parce que c'est le genre de fonction où noyer le poisson serait rendre un mauvais service.

Ça marche sur beaucoup de documents, mais je ne peux pas promettre que ça marche sur absolument tous. Je l'ai testé sur toute une pile de passeports et de cartes de différents pays et la plupart se lisent sans accroc, mais les documents du monde ne sont pas parfaitement uniformes, et le vôtre pourrait être l'exception. Si l'un d'eux refuse, c'est en général le document, pas vous.

Il lit ce qu'il a le droit de lire, et rien de plus. Certaines puces stockent aussi des empreintes digitales ou des données d'iris, et celles-là sont protégées par des clés que seuls les systèmes d'inspection gouvernementaux détiennent - rien qu'on confie à une app grand public, et rien que je voudrais qu'elle ait. NFC.cool n'y touche jamais. Il lit la photo du visage et les informations du même type que celles imprimées, c'est-à-dire précisément la partie censée être lisible par la personne qui tient le document.

Et il lui faut un téléphone doté du NFC, maintenu immobile contre le document pendant la lecture. La puce est petite et la connexion est délicate, donc si le téléphone glisse, il faut recommencer la lecture depuis le début. Gardez le document bien à plat contre le haut du téléphone jusqu'à ce que ce soit terminé.

---

Je repense encore à ce sas d'aéroport. Toute cette mise en scène sécuritaire du voyage moderne, et en son cœur se trouve une minuscule puce NFC qui exécute une petite poignée de main soignée - le même genre de poignée de main avec laquelle j'ai passé des années à [lire et écrire des tags](/features/nfc-reader-writer/). Désormais, le lecteur dans votre poche peut le faire lui aussi.

Si vous voulez voir ce que votre propre passeport transporte discrètement, le lecteur de passeports et pièces d'identité se trouve dans NFC.cool Tools sur [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-read-passport-nfc-chip-fr&mt=8) et [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-read-passport-nfc-chip-fr), juste à côté de tout le reste que j'ai construit pour le NFC. Ouvrez votre passeport, tenez-le contre votre téléphone, et faites connaissance avec la version de vous-même qui vit sur la puce.
