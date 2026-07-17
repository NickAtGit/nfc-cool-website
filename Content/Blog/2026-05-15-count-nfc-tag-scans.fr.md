---
id: "count-nfc-tag-scans-2026-05"
title: "Comment compter les scans d'un tag NFC sans serveur"
date: "2026-05-15"
tags: ["nfc-tags", "guides"]
summary: "Mettez la même URL sur 50 autocollants NFC et vous ne pouvez pas savoir lequel a été scanné - à moins que le tag ne se compte lui-même. Voici comment."
image: "/assets/images/Blog/count-nfc-tag-scans.webp"
imageAlt: "Un tag NFC scanné par un téléphone, avec un compteur de scans qui grimpe à côté"
author: "Nicolo Stanciu"
metaTitle: "Comment compter les scans d'un tag NFC sans serveur"
metaDescription: "Suivez combien de fois un tag NFC a été scanné - et de quel tag physique il s'agissait - grâce au compteur intégré de la puce. Pas de backend, pas d'internet. Un guide pratique."
ogTitle: "Comment compter les scans d'un tag NFC sans serveur"
ogDescription: "Votre tag NFC peut compter ses propres scans. Voici comment vous en servir pour le suivi de l'engagement, les éditions limitées et la lutte anti-contrefaçon."
---

Imaginez que vous imprimiez la même URL sur cinquante autocollants NFC et que vous les colliez sur cinquante produits, cinquante affiches ou cinquante cartes de visite. Une semaine plus tard, quelqu'un pose la question évidente : lequel a réellement été scanné ? Et combien de fois ?

Cela fait des années que je développe NFC.cool, et la réponse qu'on me donne d'habitude, c'est un serveur. Vous générez cinquante liens uniques, vous les faites tous pointer vers un backend, et vous laissez un logiciel d'analyse compter les visites. Ça marche, mais vous voilà à gérer une infrastructure, à la payer, et à miser sur le fait qu'elle reste en ligne aussi longtemps que ces autocollants existeront. Ça m'a toujours semblé beaucoup de rouages pour une question aussi simple.

Il existe une méthode plus simple, et elle est logée dans la puce NFC depuis le début. Beaucoup de tags savent compter leurs propres scans. Avec la bonne configuration, un tag vous dira combien de fois il a été lu et de quel tag physique il s'agit, sans le moindre backend. C'est l'un de mes tours NFC préférés à montrer aux gens, alors voici comment ça marche et comment le mettre en place.

---

## Ce qu'est réellement un NFC Tap Counter

La plupart des [autocollants NFC que vous pouvez acheter](/affiliate-links/) utilisent des puces de la famille NTAG21x - `NTAG213`, `NTAG215` et `NTAG216`. Ces puces ont une petite fonction dont, je trouve, la plupart des gens ignoraient l'existence : un compteur intégré. Chaque fois que le tag est lu, le compteur augmente d'une unité. Il réside dans le matériel de la puce, pas dans une app, et pas sur un serveur. (Si vous voulez le détail plus poussé de ces puces, je les ai traitées dans [les types de tags NFC pour iPhone](/blog/nfc-tag-types-for-iphones/).)

La façon dont je le décris, c'est un compteur kilométrique pour le tag. Le compteur kilométrique d'une voiture compte les kilomètres, que quelqu'un le regarde ou non ; le compteur NFC compte les lectures de la même manière. Le nombre est toujours là. La seule question, c'est de savoir si quelque chose est configuré pour vous le montrer.

C'est exactement ce que fait la fonction NFC Tap Counter de NFC.cool Tools, et c'est la partie dont je suis le plus fier. Elle configure le tag une seule fois pour qu'à partir de là, le tag rapporte lui-même son propre compteur. Vous n'avez pas besoin de scanner le tag vous-même pour consulter le nombre, et vous n'avez pas besoin que l'app soit présente quand d'autres personnes le scannent. Le tag fait le comptage et le rapport tout seul.

Ces mêmes puces portent aussi un identifiant de tag unique - un numéro de série gravé en usine, un peu comme une adresse MAC sur une carte réseau. La fonction Tap Counter peut le faire remonter aussi, et c'est ce qui vous permet de distinguer cinquante autocollants d'apparence identique.

---

## Comment ça marche, sans le jargon

Quand vous écrivez du contenu sur un tag avec le Tap Counter activé, l'app fait quelque chose que je trouve réellement astucieux. Elle insère une série de caractères de remplacement dans ce que vous écrivez - un substitut pour le compteur et l'ID. Cette partie me fait encore un peu l'effet d'un tour de magie, même après l'avoir construite.

À partir de là, la puce s'occupe du reste. Comme le dit l'écran d'aide à l'intérieur de l'app : « L'app insère des octets de remplacement dans votre contenu. À chaque scan, la puce les remplace par le compteur de scans actuel (et/ou l'ID du tag) avant que l'iPhone ne le lise. Aucun serveur ni internet nécessaire. »

La séquence, à chaque scan, ressemble donc à ceci. Quelqu'un approche son téléphone du tag. La puce se réveille, incrémente son compteur, remplace les caractères de remplacement par les vrais chiffres, et ce n'est qu'ensuite qu'elle transmet le contenu finalisé au téléphone. Le téléphone qui a scanné le tag ne voit jamais de caractère de remplacement - il voit une URL complète avec un compteur à jour déjà intégré.

Ce que je veux que vous reteniez, c'est que vous ne faites la configuration qu'une seule fois. Après cette première écriture, le tag se débrouille seul : il comptera et substituera à chaque scan, par chaque personne, sur chaque téléphone, pour toute la durée de vie de l'autocollant. Rien dans cette chaîne ne touche à internet. Le comptage se passe dans la puce. La substitution se passe dans la puce. Si vous faites pointer l'URL finalisée vers un site que vous contrôlez, votre propre serveur voit le compteur arriver - mais c'est votre choix, pas une exigence de la fonction.

---

## Ce que vous pouvez vraiment en faire

Un tag qui se compte lui-même a l'air d'un joli tour jusqu'à ce que vous le confrontiez à un vrai problème. Voici les quatre usages sur lesquels je reviens sans cesse quand on me demande à quoi ça sert.

**Savoir quel autocollant physique a été scanné.** C'est le problème des cinquante autocollants du début de cet article. Mettez la même URL sur chaque tag, activez l'ID du tag, et chaque scan arrive estampillé du numéro de série du tag exact d'où il provient. Une seule URL à gérer, cinquante tags que vous pouvez malgré tout distinguer.

**Limiter l'accès gratuit.** Comme le compteur voyage avec chaque scan, vous pouvez agir dessus. Lancez une promotion où les cent premiers scans obtiennent la version démo et où les scans suivants sont redirigés ailleurs. Un tirage limité peut distribuer la récompense complète jusqu'à ce que le compteur dépasse un seuil que vous avez choisi. Le tag applique le principe du « premier arrivé, premier servi » sans système d'inscription derrière.

**Suivre l'engagement.** Collez un tag sur une carte de visite, une affiche, une boîte de produit ou une vitrine, et le compteur devient une mesure d'engagement discrète. Vous pouvez voir si une carte a été scannée deux fois ou deux cents fois sans construire de pipeline d'analyse pour ça.

**Prouver l'authenticité.** Le compteur ne fait que monter - impossible de le faire revenir en arrière. Un nombre qui ne peut qu'augmenter est difficile à falsifier de façon crédible, et c'est pour ça qu'il a selon moi toute sa place dans les objets en édition limitée et les contrôles anti-contrefaçon. Un tag authentique a un historique plausible et croissant ; un tag cloné, non. Si ce versant du NFC vous intéresse, je suis allé plus loin dans [comment le NFC protège des secrets chiffrés](/blog/nfc-safe-encrypted-secrets/).

Combinez quelques-uns de ces usages et vous obtenez quelque chose comme ça : un artisan glisse un tag dans chaque série numérotée d'un produit, tous pointant vers la même page de destination. L'ID du tag lui dit quel article un acheteur tient en main, le compteur lui dit à quelle fréquence cet acheteur est revenu, et comme le compteur ne fait que monter, un revendeur ne peut pas discrètement faire passer une copie pour l'original. Pas de comptes, pas de base de données, pas de facture mensuelle - juste la puce qui fait son travail. C'est le genre de résultat pour lequel j'ai construit cette fonction.

---

## La configuration, étape par étape

La fonction se trouve dans NFC.cool Tools, à la fois sur iPhone et sur Android. Elle fait partie de l'abonnement Pro (Platinum), il vous le faudra donc pour écrire des tags avec compteur activé. Si vous n'avez jamais écrit de tag auparavant, mon tutoriel sur [comment écrire des tags NFC sur iPhone](/blog/write-nfc-tags-iphone/) couvre d'abord les bases.

1. Ouvrez NFC.cool Tools, allez dans la section **NFC Tools** et appuyez sur **NFC Tap Counter**.
2. Choisissez ce que le tag doit délivrer : une **URL**, un **e-mail**, un **SMS** ou un **Raccourci**. (Le Raccourci est réservé à iOS, puisque Raccourcis est une app d'Apple ; l'URL, l'e-mail et le SMS fonctionnent sur les deux plateformes.)
3. Composez ce contenu comme vous le feriez d'habitude - tapez le lien, écrivez le message, choisissez le raccourci.
4. Activez les interrupteurs souhaités : **NFC Tap Counter** ajoute le compteur en direct, et **NFC Tag ID** ajoute le numéro de série du tag. Vous pouvez utiliser l'un, l'autre, ou les deux.
5. Si vous programmez une série de tags avec le même contenu, activez **Batch write** pour que le scanner reste ouvert et que vous puissiez écrire un tag après l'autre.
6. Vérifiez l'**Aperçu**. Il montre un exemple de sortie avec des valeurs fictives, pour que vous voyiez exactement où le compteur et l'ID vont se placer avant de valider.
7. Appuyez sur **Écrire sur le tag NFC** et maintenez un tag contre le haut de votre téléphone.

Voilà toute la configuration, et je l'ai volontairement gardée aussi courte. À partir de là, le tag est autonome - il compte et rapporte tout seul, pour chaque personne qui le scanne, avec ou sans l'app.

Si un jour vous voulez l'arrêter, l'app peut désactiver le compteur sur un tag existant. La puce cesse d'insérer des valeurs en direct, mais le contenu reste sur le tag exactement tel qu'il a été écrit la dernière fois. Un détail bon à savoir : la puce continue de compter en interne même après que vous avez désactivé la substitution - le compteur n'est jamais perdu, il cesse simplement d'être affiché.

---

## Où apparaissent le compteur et l'ID du tag

L'endroit où les valeurs se placent dépend du type de contenu que vous avez choisi. Avec les deux interrupteurs activés, l'ID du tag et le compteur sont insérés ensemble - l'ID d'abord, puis le compteur, reliés par un petit `x`. En prenant `049F50824F1390` comme ID de tag et `000007` comme compteur, voici l'avant et l'après pour chaque type :

- **URL :** `https://example.com/page` devient `https://example.com/page?nfc=049F50824F1390x000007`
- **Corps d'e-mail :** `Bonjour, voici ma carte.` devient `Bonjour, voici ma carte. 049F50824F1390x000007`
- **Corps de SMS :** `Commande confirmée !` devient `Commande confirmée ! 049F50824F1390x000007`
- **Entrée de raccourci :** `log-entry` devient `log-entry 049F50824F1390x000007`

Les valeurs sont ajoutées proprement, si bien que le reste de votre contenu continue de fonctionner normalement. Désactivez un interrupteur et vous obtenez simplement l'autre tout seul : juste le compteur (`000007`) ou juste l'ID du tag (`049F50824F1390`).

Et maintenant, la question qu'on me pose toujours à ce stade : pourquoi `000007` et pas simplement `7` ? Le compteur est écrit en hexadécimal - le système de numération en base 16 qui va de 0 à 9 puis de A à F - et complété à six caractères. `000007` est donc tout bonnement le septième scan du tag. Une fois passé le scan neuf, des lettres apparaissent : `00000A`, c'est 10. Le plafond est `FFFFFF`, soit environ 16 millions de scans, bien plus de marge que ce dont presque tous les tags auront jamais besoin dans la vraie vie. L'ID du tag est une chaîne hexadécimale plus longue - le numéro de série d'usine de 7 octets de la puce - et contrairement au compteur, il ne change jamais.

Si vous acheminez l'URL finalisée vers votre propre site, votre serveur lit ces valeurs directement dans l'adresse : enregistrez le compteur, comparez-le à un seuil, ou distinguez un tag d'un autre grâce à son ID.

---

## Les tags qu'il vous faut

Cette fonction dépend de la puce, donc le tag a son importance. NFC.cool prend en charge les puces `NTAG213`, `NTAG215` et `NTAG216` pour le Tap Counter. Ce sont les autocollants NFC les plus courants vendus pour les téléphones, donc faciles à trouver, mais je vérifierais quand même le type de puce avant d'acheter en gros. Si vous essayez d'utiliser un tag que la fonction ne prend pas en charge, l'app vous avertit plutôt que d'écrire quelque chose qui ne marchera pas - je m'en suis assuré, parce que j'ai vu à quel point un échec silencieux est frustrant.

Si vous avez besoin de faire des réserves, notre page des [tags NFC recommandés](/affiliate-links/) répertorie les autocollants `NTAG216` que nous utilisons et sur lesquels nous testons. Et si vous débutez dans le choix des tags, mon guide sur [les différents types de tags NFC pour iPhone](/blog/nfc-tag-types-for-iphones/) passe en revue les compromis en termes simples.

---

## Quelques questions rapides

**Puis-je réinitialiser le compteur ?** Non. C'est un compteur à sens unique intégré à la puce, et il ne peut que monter. C'est délibéré, et honnêtement c'est tout l'intérêt - un compteur que vous pourriez réinitialiser serait inutile pour les éditions limitées ou les contrôles anti-contrefaçon. Si vous avez besoin d'un compteur repartant de zéro, utilisez un nouveau tag.

**N'importe qui peut lire le compteur, ou seulement moi ?** N'importe qui. Chaque téléphone qui scanne le tag reçoit le contenu finalisé avec le compteur déjà dedans, que l'app soit installée ou non. C'est bien ça l'idée - le tag rapporte de lui-même.

**Puis-je le désactiver plus tard ?** Oui. L'app peut empêcher la puce de substituer les caractères de remplacement. L'URL ou le message reste sur le tag ; seules les mises à jour en direct s'arrêtent. La puce continue de compter en interne.

**Le compteur est-il privé ?** Le compteur vit sur le tag, pas sur un serveur. Quiconque scanne le tag voit le compteur dans le contenu, et si ce contenu pointe vers un serveur que vous contrôlez, seul ce serveur le voit. L'ID du tag est un numéro de série d'usine, pas une information personnelle identifiante.

**Faut-il internet ?** Non. Le comptage et la substitution se passent tous les deux à l'intérieur de la puce. Internet n'entre en jeu que si l'URL que vous avez écrite pointe justement vers un site web.

---

## Essayez

Pendant la plupart des années où j'ai travaillé avec le NFC, compter les scans voulait dire des liens uniques et un backend pour les additionner. Le compteur des NTAG21x supprime discrètement cette contrainte : le tag tient son propre décompte, et c'est la fonction NFC Tap Counter de NFC.cool Tools qui l'active. C'est l'une de ces fonctions dont je regrette sans cesse que plus de gens n'imaginent même qu'elles sont possibles.

Envie de le voir fonctionner avant d'écrire le moindre tag ? Notre [démo de compteur de scans en direct](/tap-counter/) est une page qui fait exactement ce que décrit cet article - écrivez un tag qui pointe vers elle, scannez-la, et la page vous montre le compteur de scans et l'ID du tag que la puce vient de lui transmettre. Aucun serveur dans la boucle, juste l'URL.

Elle est disponible dès maintenant dans NFC.cool Tools, sur [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-count-nfc-tag-scans-fr&mt=8) et [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-count-nfc-tag-scans-fr). Pour découvrir la boîte à outils NFC complète que j'ai construite, jetez un œil à la [fonction de lecture et d'écriture NFC](/features/nfc-reader-writer/).