---
id: "ntag-424-dna-2026-07"
title: "NTAG 424 DNA : les tags NFC qui prouvent qu'ils ne sont pas des faux"
date: "2026-07-24"
tags: ["announcements", "nfc-tags", "industry"]
summary: "J'avais entendu dire que les marques de luxe utilisent des tags NTAG 424 DNA pour prouver qu'un produit est authentique, alors j'en ai commandé un lot sur AliExpress pour voir ce qu'ils font vraiment. Ils se sont révélés être le NFC Tap Counter avec une couche cryptographique greffée dessus, et NFC.cool Tools sait désormais les lire, les vérifier et les configurer entièrement sur iPhone et Android - chaque clé, les permissions de chaque fichier, et les propres réglages de la puce."
image: "/assets/images/Blog/ntag-424-dna-counterfeit-proof-nfc-tags.webp"
imageAlt: "Un tag NTAG 424 DNA tenu contre un iPhone affichant un résultat d'authenticité vérifiée à côté de l'écran de configuration du tag"
author: "Nicolo Stanciu"
metaTitle: "NTAG 424 DNA : le tag NFC anti-contrefaçon expliqué"
metaDescription: "J'ai acheté des tags NTAG 424 DNA pour voir comment les marques prouvent qu'un produit est authentique. Voici comment fonctionnent ces tags NFC anti-contrefaçon, et comment NFC.cool les lit, les vérifie et les programme."
ogTitle: "Les tags NFC qui prouvent qu'ils ne sont pas des faux"
ogDescription: "Comment les tags NTAG 424 DNA démasquent les clones, et comment NFC.cool les lit, les vérifie et les configure sur iPhone et Android."
---

Il y a quelque temps, je tombais sans cesse sur la même affirmation au détour d'un article : les marques de luxe intègrent des puces NFC dans leurs produits pour que vous puissiez approcher votre téléphone d'un sac ou d'une bouteille et savoir qu'il s'agit du vrai produit, pas d'une contrefaçon. Chaque article servait la même phrase reluisante et aucun ne disait *comment*. Qu'est-ce qui empêche réellement un contrefacteur de copier la puce en même temps que le sac à main ?

Alors j'ai fait ce que je fais toujours quand un tag m'intrigue. Je suis allé sur AliExpress, j'ai trouvé une annonce pour des tags « NTAG 424 DNA », j'en ai commandé un petit lot, et j'ai attendu que l'enveloppe arrive. Quelques euros, deux semaines, et j'avais sur mon bureau le même silicium sur lequel reposent ces systèmes de protection des marques. Puis j'en ai approché un du téléphone pour voir ce qu'il fait.

## Ce qu'est réellement un tag NTAG 424 DNA

De l'extérieur, c'est un tag NFC ordinaire. Vous ne sauriez pas le distinguer dans un tas de tags bon marché, et n'importe quel téléphone le lit sans broncher. Si vous avez lu mon [guide des types de tags NFC](/blog/nfc-tag-types-for-iphones/), il s'y range comme un tag de Type 4 de plus que votre iPhone lit volontiers.

C'est la partie « DNA » qui change la donne. À l'intérieur, la puce renferme quelques clés AES-128 et un petit moteur cryptographique, et elle sait faire quelque chose qu'aucun NTAG215 tout simple ni aucun autocollant d'un lot ne sait faire : elle peut *signer* chaque scan. Cette signature, c'est tout l'enjeu. C'est la différence entre un tag qui dit « voici un lien » et un tag qui dit « voici un lien, et voici la preuve cryptographique que c'est bien moi, cette puce authentique bien précise, qui le délivre, à cet instant ».

C'est cela que les marques de luxe paient en réalité - pas le lien, mais la preuve qu'une puce authentique est bien celle qui le délivre.

## Comment fonctionnent SUN et SDM : un lien qui se réécrit à chaque scan

C'est là que ça a fait déclic pour moi. Quand j'ai regardé ce que le tag envoyait réellement, je me suis rendu compte que j'avais déjà construit l'essentiel de la mécanique pour le comprendre.

Plus tôt cette année, j'ai livré une [fonction NFC Tap Counter](/blog/count-nfc-tag-scans/) : un tag qui compte combien de fois il a été lu et place ce nombre dans l'URL, si bien qu'un lien peut savoir que c'est la 47e fois que quelqu'un le scanne. Un tag NTAG 424 DNA, c'est la même idée, avec une couche de chiffrement enroulée autour qui la rend impossible à falsifier.

Le mécanisme s'appelle **SUN** (Secure Unique NFC), ou **SDM** (Secure Dynamic Messaging) si vous lisez la [fiche technique de NXP](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf). Vous stockez un lien normal sur le tag, quelque chose comme `https://example.com`. Mais vous dites à la puce de réécrire des parties de ce lien à la volée à chaque scan. Ce que votre téléphone reçoit réellement ressemble donc plutôt à ceci :

`https://example.com/?picc_data=A1B2...&cmac=9F3C...`

Ces deux valeurs ne sont pas décoratives. `picc_data` est une copie chiffrée de l'ID réel du tag augmenté d'un compteur de scans, brouillée avec une clé qui ne quitte jamais la puce. `cmac` est une signature cryptographique portant sur ces données. Les deux changent à chaque scan. Scannez deux fois le même tag et vous obtenez deux URL complètement différentes, chacune signée à neuf par la puce.

Je vois un tag NFC ordinaire comme une pancarte imprimée dans une vitrine. N'importe qui peut la photographier et en imprimer une copie identique. Un tag SUN ressemble davantage à un vigile qui vous remet un nouveau reçu, numéroté et tamponné individuellement, chaque fois que vous entrez. Copier le reçu d'hier ne vous avance à rien, parce que le numéro d'aujourd'hui est différent et que seul le tampon du vigile est authentique.

## Pourquoi un tag NTAG 424 DNA cloné se fait démasquer

C'est la partie qui répond à ma question de départ. Un contrefacteur peut tout à fait cloner le *contenu* d'un tag. Il peut lire l'URL, la copier octet par octet, et la programmer sur une puce vierge. Ça a toujours été vrai, et c'est pour ça que « il suffit d'y coller un QR code » n'a jamais rien prouvé du tout.

Ce qu'il ne peut pas faire, c'est produire la signature valide suivante. La clé de signature réside à l'intérieur de la puce authentique et n'en sort jamais, pas même le temps d'un scan. Autrement dit, un scan n'a de valeur que pour quelque chose qui détient réellement la clé. Dans un vrai dispositif de protection de marque, le lien du tag pointe vers un serveur que le fabricant exploite, et c'est ce serveur qui déchiffre chaque scan, recalcule la signature pour confirmer que la clé correspond, et suit le compteur à mesure qu'il grimpe.

C'est cette dernière partie qui démasque un clone. La seule URL qu'un contrefacteur peut placer sur un faux est celle qu'il a capturée lors d'un scan authentique, figée avec le compteur que ce scan portait ce jour-là. Rejouez-la et le serveur regarde un nombre qu'il a déjà vu, or le compteur d'une vraie puce ne peut qu'avancer, donc une répétition ou un retour en arrière trahit la supercherie. Pour envoyer un compteur neuf et plus élevé accompagné d'une signature qui tient toujours la route, il lui faudrait la clé, et pour obtenir la clé il lui faudrait casser l'AES ou décapsuler physiquement la puce. Ni l'un ni l'autre n'arrivera pour un faux sac à main.

Voilà la version honnête de la phrase marketing. La puce ne rend pas le *produit* impossible à copier. Elle rend la *preuve d'authenticité* impossible à copier, et elle déplace cette preuve sur quelque chose que le contrefacteur ne peut pas reproduire.

## Comment NFC.cool vérifie qu'un tag est authentique

Une fois les tags compris, je voulais que l'app fasse les choses correctement de bout en bout, pas seulement afficher un vidage hexadécimal. NFC.cool Tools gère donc désormais entièrement les NTAG 424 DNA sur [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-fr&mt=8) et [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-fr), et il contrôle l'authenticité de deux façons indépendantes, plus une troisième, physique, sur les tags conçus pour ça.

**L'origine de la puce.** Chaque puce NXP authentique porte une signature d'usine sur son propre ID, signée avec la clé privée de NXP. NFC.cool lit cette signature et la vérifie face à la clé publique de NXP, directement sur le téléphone. Si tout concorde, vous obtenez un simple résultat « NXP authentique ». Celui-ci ne demande aucune configuration ni aucune clé de votre part. Il répond à la question « est-ce du vrai silicium NXP, ou un clone sans nom ? ».

**Le scan lui-même.** C'est le contrôle SUN. NFC.cool déchiffre le `picc_data`, en extrait l'ID du tag et le compteur de scans, recalcule la signature, et la compare au `cmac` qu'a envoyé le tag. S'ils correspondent, le scan est authentique et frais, et vous voyez « Authentique ». Celui-ci prouve davantage, donc il demande davantage : il lui faut la clé du tag. Un tag flambant neuf encore sur son réglage d'usine se vérifie sans la moindre saisie. Un tag que quelqu'un a verrouillé avec sa propre clé ne se vérifie comme authentique que si vous avez cette clé enregistrée.

**Le sceau physique, sur les tags conçus pour ça.** Une version de ces tags, le NTAG 424 DNA TagTamper, est faite pour servir de sceau d'inviolabilité. C'est un autocollant traversé par un fin fil supplémentaire, que vous collez en travers de ce que vous voulez protéger, par-dessus le rabat d'une boîte ou autour du bouchon d'une bouteille, le même travail que font aujourd'hui ces autocollants « garantie annulée si brisé ». Ouvrez l'objet et vous déchirez l'autocollant, ce qui rompt le fil. NFC.cool contrôle ce fil au moment d'un scan et vous dit clairement si le sceau est toujours intact ou s'il a été brisé. Le point malin, c'est que c'est un verrou à sens unique : rompez-le une fois et la puce s'en souvient pour toujours, de sorte qu'un objet ouvert puis soigneusement rescellé se lit encore comme ouvert. La cryptographie prouve que la puce est authentique ; ceci prouve que personne n'est entré dans la boîte.

Tout ceci est gratuit pour tout le monde. Lire un tag - son lien, son compteur de scans, l'agencement de ses fichiers, si son sceau est toujours intact - et exécuter les deux contrôles cryptographiques ne coûte rien. Je voulais que la question « ce truc est-il authentique ? » soit à la portée de quiconque en scanne un.

## Programmer vos propres tags sécurisés

La lecture n'en est que la moitié. L'autre moitié, c'est que ces tags vierges d'AliExpress sont à vous, à programmer, et NFC.cool le fait via un vrai canal authentifié et chiffré, le même échange sécurisé que la puce exige, pas une écriture brute faite au petit bonheur.

La version en douceur tient en trois étapes. Écrivez votre propre lien, ce qui est gratuit. Activez SUN pour que le tag se mette à signer chaque scan. Et remplacez la clé d'usine par la vôtre, définie sous forme de phrase secrète pour qu'il n'y ait pas de chaîne hexadécimale de 32 caractères à manier, enregistrée dans votre trousseau. À partir de là, le tag vous est verrouillé : il continue de prouver son authenticité à quiconque le scanne, mais vous seul pourrez jamais le reprogrammer.

C'est là que j'aurais pu m'arrêter. Les rares apps qui s'approchent ne serait-ce que de ces tags s'y arrêtent. Pas moi.

## Configurez l'intégralité de la puce NTAG 424 DNA depuis votre iPhone ou Android

Au fil d'une semaine de nuits blanches avec ces tags, j'ai pris une décision : NFC.cool Tools allait couvrir 100 % de la spécification NTAG 424 DNA, pas la tranche facile à démontrer sur laquelle s'arrête chaque tutoriel « scannez pour vérifier ». Si je veux que ce soit la meilleure app NFC qui existe, alors « nous prenons en charge le NTAG 424 DNA » ne peut pas vouloir dire en douce « nous prenons en charge l'unique clé et l'unique mode qui étaient faciles ». Alors j'ai épluché la fiche technique et j'ai construit le reste.

Une puce NTAG 424 DNA n'a pas une clé. Elle en a cinq. NFC.cool les gère désormais toutes - changez n'importe quel emplacement, réinitialisez-le aux réglages d'usine, ou saisissez une clé que vous avez définie sur un autre appareil pour que ce téléphone puisse lui aussi piloter le tag. SUN n'est pas non plus obligé de signer avec cette clé principale : vous pouvez diriger le chiffrement du scan vers une clé et sa signature vers une autre, et décider si le tag reflète son ID en clair ou le garde chiffré.

Chaque fichier de la puce porte ses propres règles d'accès, et vous pouvez les modifier désormais - qui peut lire un fichier, qui peut y écrire, qui peut changer ses réglages - chacune fixée sur une clé précise, ou grande ouverte, ou fermée à jamais. Sous les fichiers se trouve la configuration propre de la puce, et elle est là aussi : activez un ID aléatoire pour que le tag cesse de diffuser le même numéro de série à chaque lecteur qu'il croise (un vrai gain pour la vie privée), plafonnez le nombre de tentatives de déverrouillage ratées qu'il tolère avant de se verrouiller lui-même, et une poignée d'interrupteurs de plus bas niveau auxquels la plupart des gens n'auront jamais besoin de toucher.

La puce garde même un petit coffre privé. Elle contient un fichier chiffré, verrouillé sur votre Key 0, qui voyage à même le tag plutôt que de résider sur un serveur. Glissez-y un petit secret, quelque chose que vous voulez voir voyager avec le tag plutôt que dormir dans la base de données de quelqu'un, et seule votre clé peut le relire. NFC.cool l'écrit et le lit pour vous.

Si vous avez déjà fait cela auparavant, c'était à un bureau. NXP distribue un outil Windows appelé TagXplorer, vous branchez un lecteur USB sur votre ordinateur, et vous parcourez la configuration de la puce à coups de clics depuis là. NFC.cool fait toutes ces mêmes choses, mais il est conçu pour être utilisé, pas enduré. Là où TagXplorer est un logiciel de bureau bourré d'hexadécimal brut et de champs abscons, NFC.cool, ce sont des écrans en langage clair sur le téléphone déjà dans votre poche, avec une phrase secrète à la place d'une clé brute et un avertissement avant tout ce qui est définitif. Vous pilotez le tout en tenant votre téléphone contre le tag une seconde ou deux.

## Ce qu'est le mode LRP du NTAG 424 DNA, et les changements qu'on ne peut pas défaire

Et puis il y a le LRP. Dans mes notes de conception pour la première version, juste à côté de « mode LRP », j'avais écrit « pas prévu - exotique, inutile pour une app grand public ». LRP signifie Leakage-Resilient Primitive, et c'est le mode véritablement paranoïaque du tag. Normalement, la puce protège ses clés avec de l'AES ordinaire, et voler une clé reviendrait à casser l'AES lui-même. Mais il existe une voie d'attaque plus sournoise : posez une puce sur un banc d'essai, observez la légère oscillation de sa consommation électrique et de son bourdonnement électromagnétique pendant qu'elle exécute la cryptographie, et avec assez de ces relevés vous pouvez reconstituer la clé secrète à partir de la seule fuite, sans jamais toucher aux mathématiques. Le LRP est un canal sécurisé reconstruit pour ne rien laisser à quoi cette fuite puisse se raccrocher. C'est réellement démesuré pour un autocollant sur une bouteille de vin, ce qui explique que la plupart des tags ne l'activent jamais et que la plupart des outils n'apprennent jamais à le parler. Ça n'a pourtant pas cessé de me tarauder, et « couvrir toute la spécification » ne s'accompagne pas d'une note de bas de page disant « sauf la partie difficile », alors je l'ai construit. NFC.cool parle le LRP désormais, ce qui veut dire que même après qu'un tag a basculé dans ce mode, un interrupteur à sens unique sur lequel on ne peut pas revenir, l'app peut encore s'y authentifier et le gérer comme n'importe quel autre. Je ne connais aucune autre app de téléphone qui va jusque-là.

Je serai franc sur les écueils, parce qu'ils sont plus nombreux maintenant. Beaucoup de ces commandes sont définitives. Activer le LRP ne peut pas être défait. Activer un ID aléatoire ne peut pas être défait. Réglez la permission « modifier » d'un fichier sur « Jamais » et vous avez figé ce fichier pour toute la durée de vie du tag. Une mauvaise clé peut verrouiller un emplacement pour de bon. L'app le clame haut et fort sur le moment, les actions vraiment irréversibles vous obligent à confirmer via un avertissement qui détaille la conséquence exacte, mais ça vaut la peine de le dire ici aussi : entraînez-vous sur un tag de rechange avant de toucher à un tag qui vous tient à cœur.

## Où les tags NFC anti-contrefaçon servent réellement

Honnêtement ? La plupart des gens qui scannent un tag NFC n'ont jamais besoin de rien de tout cela, et c'est très bien. Un autocollant qui ouvre un lien est une chose merveilleuse, banale et utile.

Mais une fois que vous en avez tenu un en main, les cas d'usage sautent aux yeux. Un sac de luxe peut prouver son authenticité. Une bouteille de vin ou de whisky peut montrer qu'elle n'a jamais été discrètement débouchée puis recomplétée avec quelque chose de moins cher, le sceau d'inviolabilité assurant cette moitié-là. Une boîte de médicament se porte garante à la fois du vrai principe actif à l'intérieur et d'un sceau que personne n'a brisé. Un produit en série limitée ou une œuvre d'art reçoit un certificat que nul ne peut falsifier, et les billets d'événements cessent d'être quelque chose qu'on peut capturer en photo et faire circuler. Placez un tag près d'une porte ou sur une étagère et un scan prouve que quelqu'un s'est réellement tenu là, au lieu de rejouer un lien enregistré depuis son canapé. Des sneakers et des cartes à collectionner prouvent qu'elles sont authentiques et non une bonne contrefaçon. Et n'importe quel créateur indépendant peut faire en sorte que son objet prouve qu'il est bien *son* objet. C'est le même problème d'authenticité que le [passeport numérique de produit de l'UE](/blog/eu-digital-product-passport-2026/) aborde par le versant réglementaire, résolu à l'échelle de l'objet individuel.

Je n'ai pas construit ça parce que mille utilisateurs le réclamaient. Je l'ai construit parce que j'ai acheté des tags bizarres sur internet par curiosité, j'ai compris comment ils fonctionnaient, et ensuite je n'ai pas pu laisser une seule page de la fiche technique de côté. C'est généralement ainsi que débutent les bonnes fonctions.

## L'essentiel sur les tags NTAG 424 DNA

Les tags NTAG 424 DNA sont ce que le NFC a de plus proche d'un sceau infalsifiable. Ils ne peuvent pas empêcher quelqu'un de copier un produit, mais ils rendent la *preuve d'authenticité du produit* impossible à falsifier, parce que cette preuve est une signature cryptographique neuve que seule la vraie puce peut produire.

NFC.cool Tools sait désormais les lire, vérifier la puce, le scan et le sceau d'inviolabilité gratuitement, et vous confie la puce entière à configurer - chaque clé, les permissions de chaque fichier, ses réglages de plus bas niveau, même le LRP - pour provisionner les vôtres directement depuis votre téléphone. Si vous vous êtes déjà demandé comment un scan peut distinguer le vrai du faux, procurez-vous l'app sur [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-fr&mt=8) ou [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-fr), commandez deux ou trois de [ces tags](/affiliate-links/) pour quelques euros, et scannez-en un vous-même. C'est un sujet dans lequel il fait bon se perdre.
