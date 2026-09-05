---
id: "ntag-424-dna-2026-07"
title: "NTAG 424 DNA : les tags NFC qui prouvent qu'ils ne sont pas des faux"
date: "2026-07-24"
tags: ["announcements", "nfc-tags", "industry"]
summary: "J'avais entendu dire que les marques de luxe utilisent des tags NTAG 424 DNA pour prouver qu'un produit est authentique, alors j'en ai commandé un lot sur AliExpress pour voir ce qu'ils font vraiment. Ils se sont révélés être le NFC Tap Counter avec une couche cryptographique greffée dessus, et NFC.cool Tools sait désormais les lire, les vérifier et les configurer entièrement sur iPhone et Android - chaque clé, les permissions de chaque fichier, et les réglages de la puce elle-même."
image: "/assets/images/Blog/ntag-424-dna-counterfeit-proof-nfc-tags.webp"
imageAlt: "Un sac à main en cuir avec une étiquette d'authentification NFC à côté d'un iPhone affichant un bouclier de sécurité et des icônes de clé"
author: "Nicolo Stanciu"
metaTitle: "NTAG 424 DNA : le tag NFC anti-contrefaçon expliqué"
metaDescription: "J'ai acheté des tags NTAG 424 DNA pour voir comment les marques prouvent qu'un produit est authentique. Voici comment fonctionnent ces tags NFC anti-contrefaçon, et comment NFC.cool les lit, les vérifie et les programme."
ogTitle: "Les tags NFC qui prouvent qu'ils ne sont pas des faux"
ogDescription: "Comment les tags NTAG 424 DNA démasquent les clones, et comment NFC.cool les lit, les vérifie et les configure sur iPhone et Android."
---

Il y a quelque temps, je tombais sans cesse sur la même affirmation au détour d'un article : les marques de luxe intègrent des puces NFC dans leurs produits pour que vous puissiez approcher votre téléphone d'un sac ou d'une paire de sneakers et savoir qu'il s'agit du vrai produit, pas d'une contrefaçon. Chaque article resservait la même formule clinquante et aucun ne disait *comment*. Qu'est-ce qui empêche réellement un contrefacteur de copier la puce en même temps que le sac à main ?

Alors j'ai fait ce que je fais toujours quand un tag m'intrigue. Je suis allé sur AliExpress, j'ai trouvé une annonce pour des tags « NTAG 424 DNA », j'en ai commandé un petit lot, et j'ai attendu que l'enveloppe arrive. Quelques euros, deux semaines, et j'avais sur mon bureau le même silicium sur lequel reposent ces systèmes de protection des marques. Puis j'en ai approché un du téléphone pour voir ce qu'il fait.

---

## Ce qu'est réellement un tag NTAG 424 DNA

De l'extérieur, c'est un tag NFC ordinaire. Vous ne sauriez pas le distinguer dans un tas de tags bon marché, et n'importe quel téléphone le lit sans broncher. Si vous avez lu mon [guide des types de tags NFC](/blog/nfc-tag-types-for-iphones/), il s'y range comme un tag de Type 4 de plus que votre iPhone lit volontiers.

C'est la partie « DNA » qui change la donne. À l'intérieur, la puce renferme quelques clés AES-128 et un petit moteur cryptographique, et elle sait faire quelque chose qu'aucun NTAG215 tout simple ni aucun autocollant d'un lot ne sait faire : elle peut *signer* chaque scan. Cette signature, c'est tout l'enjeu. C'est la différence entre un tag qui dit « voici un lien » et un tag qui dit « voici un lien, et voici la preuve cryptographique que c'est bien moi, cette puce authentique bien précise, qui le délivre, à cet instant ».

C'est cela que les marques de luxe paient en réalité - pas le lien, mais la preuve qu'une puce authentique est bien celle qui le délivre.

---

## Comment fonctionnent SUN et SDM : un lien qui se réécrit à chaque scan

C'est là que j'ai eu le déclic. Quand j'ai regardé ce que le tag envoyait réellement, je me suis rendu compte que j'avais déjà construit l'essentiel de la mécanique pour le comprendre.

Plus tôt cette année, j'ai livré une [fonction NFC Tap Counter](/blog/count-nfc-tag-scans/) : un tag qui compte combien de fois il a été lu et place ce nombre dans l'URL, si bien qu'un lien peut savoir que c'est la 47e fois que quelqu'un le scanne. Un tag NTAG 424 DNA, c'est la même idée, avec une couche de chiffrement enroulée autour qui la rend impossible à falsifier.

Le mécanisme s'appelle **SUN** (Secure Unique NFC), ou **SDM** (Secure Dynamic Messaging) si vous lisez la [fiche technique de NXP](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf). Vous stockez un lien normal sur le tag, quelque chose comme `https://example.com`. Mais vous dites à la puce de réécrire des parties de ce lien à la volée à chaque scan. Ce que votre téléphone reçoit réellement ressemble donc plutôt à ceci :

`https://example.com/?picc_data=A1B2...&cmac=9F3C...`

Ces deux valeurs ne sont pas décoratives. `picc_data` est une copie chiffrée de l'ID réel du tag augmenté d'un compteur de scans, brouillée avec une clé qui ne quitte jamais la puce. `cmac` est une signature cryptographique portant sur ces données. Les deux changent à chaque scan. Scannez deux fois le même tag et vous obtenez deux URL complètement différentes, chacune fraîchement signée par la puce.

Je vois un tag NFC ordinaire comme une pancarte imprimée dans une vitrine. N'importe qui peut la photographier et en imprimer une copie identique. Un tag SUN ressemble davantage à un vigile qui vous remet un nouveau reçu, numéroté et tamponné individuellement, chaque fois que vous entrez. Copier le reçu d'hier ne vous avance à rien, parce que le numéro d'aujourd'hui est différent et que seul le tampon du vigile est authentique.

---

## Pourquoi un tag NTAG 424 DNA cloné se fait démasquer

C'est la partie qui répond à ma question de départ. Un contrefacteur peut tout à fait cloner le *contenu* d'un tag. Il peut lire l'URL, la copier octet par octet, et la programmer sur une puce vierge. Ça a toujours été vrai.

Ce qu'il ne peut pas faire, c'est produire la signature valide suivante. La clé de signature réside à l'intérieur de la puce authentique et n'en sort jamais, pas même le temps d'un scan. Autrement dit, un scan n'a de valeur que pour quelque chose qui détient réellement la clé. Dans un vrai dispositif de protection de marque, le lien du tag pointe vers un serveur que le fabricant exploite, et c'est ce serveur qui déchiffre chaque scan, recalcule la signature pour confirmer que la clé correspond, et suit le compteur à mesure qu'il grimpe.

C'est cette dernière partie qui démasque un clone. La seule URL qu'un contrefacteur peut placer sur un faux est celle qu'il a capturée lors d'un scan authentique, figée avec le compteur que ce scan portait ce jour-là. Rejouez-la et le serveur se retrouve devant un nombre qu'il a déjà vu, or le compteur d'une vraie puce ne peut qu'avancer, donc une répétition ou un retour en arrière trahit la supercherie. Pour envoyer un compteur neuf et plus élevé accompagné d'une signature qui tient toujours la route, il lui faudrait la clé, et pour obtenir la clé il lui faudrait casser l'AES ou décapsuler physiquement la puce. Ni l'un ni l'autre n'arrivera pour un faux sac à main.

Voilà la version honnête de la phrase marketing. La puce ne rend pas le *produit* impossible à copier. Elle rend la *preuve d'authenticité* impossible à copier, et elle déplace cette preuve sur quelque chose que le contrefacteur ne peut pas reproduire.

---

## Ce que renferme la puce

Tout ce que NFC.cool fait avec ces tags devient plus clair une fois qu'on a l'organisation de la puce en tête, alors voici la carte que j'ai dû dresser avant de pouvoir écrire la moindre ligne de code.

Un NTAG 424 DNA est un tag NFC Forum de Type 4 doté de 416 octets de mémoire, organisés en une seule application qui contient trois fichiers fixes. Impossible de créer ou de supprimer des fichiers comme on le ferait sur une puce MIFARE DESFire. Il faudra vous contenter de ces trois-là :

| Fichier | Taille | Contenu |
| --- | --- | --- |
| File 01 | 32 octets | Le capability container, qui indique au téléphone où trouver les données NDEF |
| File 02 | 256 octets | Le message NDEF, en général votre lien. À chaque lecture, SUN y reflète ses valeurs dynamiques |
| File 03 | 128 octets | Un fichier propriétaire que la puce peut garder chiffré. NFC.cool s'en sert comme coffre, j'y reviens plus bas |

À côté des fichiers se trouvent cinq clés AES-128, numérotées de Key 0 à Key 4. **Key 0** est la clé maîtresse de l'application : c'est avec elle que vous vous authentifiez pour changer le lien, activer SUN, modifier n'importe quelle autre clé ou toucher à la configuration de la puce. Les clés Key 1 à Key 4 ne font rien par elles-mêmes. Elles n'entrent en jeu que lorsque les droits d'accès d'un fichier ou la configuration SUN les désignent. Sur un tag neuf, les cinq clés valent seize octets à zéro et le fichier NDEF est ouvert en écriture à n'importe qui, ce qui explique qu'un tag flambant neuf accepte un simple lien sans la moindre cérémonie.

Chaque commande qui modifie quelque chose s'exécute dans une session authentifiée : le téléphone et la puce s'authentifient mutuellement par défi-réponse avec l'une de ces clés, en dérivent des clés de session, et dès lors chaque commande porte un MAC ou est entièrement chiffrée. C'est cet échange sécurisé que le reste de l'article ne cesse d'évoquer. NFC.cool l'implémente intégralement, sur iPhone comme sur Android, et chaque écriture décrite plus bas passe par lui.

---

## Ce qu'un scan vous révèle

Approchez un tag de votre téléphone et NFC.cool Tools sur [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-fr&mt=8) ou [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-fr) effectue une lecture approfondie sans rien vous demander : l'identité de la puce et s'il s'agit de la variante TagTamper, le lien, les réglages et les droits d'accès de chaque fichier, quels emplacements de clé ne sont plus sur leur valeur d'usine, et le résultat de trois contrôles distincts.

### Est-ce du vrai silicium NXP ?

Chaque NTAG 424 DNA sort d'usine avec une **signature d'originalité** : une signature ECDSA portant sur son propre UID de sept octets, produite avec la clé privée de NXP sur la courbe P-224. NFC.cool la lit et la vérifie face à la clé publique publiée par NXP, directement sur le téléphone, sans la moindre clé de votre part. Si tout concorde, l'app affiche « NXP d'origine ». Voilà qui répond à la première question : est-ce du vrai silicium NXP, ou une imitation qui se contente d'en porter le nom ?

### Ce scan est-il authentique ?

C'est le contrôle SUN. L'app prend le `picc_data` et le `cmac` du lien que le tag vient de délivrer, déchiffre les données PICC pour en extraire l'UID et le compteur de lectures, recalcule le CMAC et le compare à ce que le tag a envoyé. Si les deux concordent, vous voyez « Authentique » et le compteur s'affiche sous l'intitulé « Compteur de lectures ».

Ce contrôle exige la clé du tag, et c'est précisément là tout le principe. Un tag encore sur ses clés d'usine se vérifie avec la clé entièrement à zéro. Un tag que vous avez verrouillé avec votre propre clé se vérifie avec la clé que NFC.cool a enregistrée au moment où vous l'avez définie. Un tag que quelqu'un d'autre a verrouillé avec une clé que vous n'avez pas affiche « Non vérifié », et c'est la bonne réponse.

### Le sceau a-t-il été brisé ?

Une version de ces puces, le **NTAG 424 DNA TagTamper**, est conçue pour servir de sceau d'inviolabilité. C'est un autocollant traversé par une fine boucle conductrice. Vous le collez en travers de ce que vous voulez protéger, par-dessus le rabat d'une boîte ou autour du bouchon d'une bouteille, le même rôle que jouent aujourd'hui les autocollants « garantie annulée si brisé ». Ouvrez l'objet et vous déchirez l'autocollant, ce qui rompt la boucle.

La puce surveille deux choses au sujet de cette boucle : un verrou permanent qui garde en mémoire si elle a *un jour* été ouverte, et son état à l'instant présent. NFC.cool lit les deux à chaque scan et annonce « Scellé », « Ouvert », ou celui qui compte le plus, « Déballé, refermé » : quelqu'un a rompu la boucle, puis l'a soigneusement refermée. Le verrou est à sens unique, si bien qu'une boîte rescellée se lira comme ouverte pour le restant de la vie de la puce. La cryptographie prouve que la puce est authentique. Ceci prouve que personne n'est entré dans la boîte.

---

## Programmer les vôtres : la version courte

Lire, ce n'est que la moitié du travail. L'autre moitié, c'est que ces tags vierges d'AliExpress sont à vous, à programmer, et la configuration minimale tient en trois étapes.

1. **Écrivez votre lien.** Une écriture NDEF ordinaire, comme sur n'importe quel tag.
2. **Activez SUN.** L'app écrit votre lien avec des emplacements réservés et demande à la puce d'y refléter, à chaque lecture, son UID chiffré, son compteur de scans et sa signature. À partir de là, chaque scan produit une URL unique et signée.
3. **Définissez votre propre Key 0.** Cela remplace les zéros d'usine par une clé que vous seul connaissez, pour que personne d'autre ne puisse reconfigurer le tag.

Pour cette dernière étape, vous saisissez une phrase secrète, pas une clé. NFC.cool en dérive la clé AES en prenant les 16 premiers octets du hachage SHA-256 de la phrase, de la même façon sur iPhone et sur Android, si bien qu'un tag provisionné sur l'un s'ouvre avec la même phrase secrète sur l'autre. Si vous préférez utiliser une clé générée ailleurs, par votre propre serveur par exemple, vous pouvez coller les 32 caractères hexadécimaux à la place.

Une clé perdue, c'est un tag que vous ne pourrez plus jamais reconfigurer, alors l'app fait attention à l'endroit où elle la range. Sur iPhone, elle atterrit dans le trousseau et se synchronise via iCloud Keychain. Sur Android, elle est chiffrée avec une clé protégée par le matériel et recopiée dans Block Store, de sorte qu'elle survit à une réinstallation ou à un changement de téléphone. La nouvelle clé est enregistrée avant l'envoi de la modification, et si le scan est interrompu en plein changement, l'ancienne et la nouvelle valeur restent toutes deux disponibles jusqu'à ce que le tag confirme laquelle il détient. Vous pouvez aussi saisir une phrase secrète définie sur un autre appareil, et l'app la vérifie face au tag avant de l'enregistrer.

Une chose que l'app refuse délibérément : écrire un simple lien sur un tag où SUN est activé en passant par l'écran d'écriture ordinaire. Les positions de miroir sont figées pour l'URL avec laquelle elles ont été configurées, et une URL d'une autre longueur laisserait la puce refléter ses valeurs en plein milieu de votre nouveau contenu à chaque scan. L'écran NTAG 424 désactive d'abord SUN, puis écrit.

---

## Le reste de la puce

Cette version courte, c'est là que s'arrêtent la plupart des tutoriels, et jusqu'ici, pour aller plus loin, il fallait passer par TagXplorer de NXP sur un ordinateur avec un lecteur USB. Je voulais que toute la fiche technique soit accessible depuis le téléphone, alors je l'ai épluchée, section après section.

### Les cinq clés

Key 0 a son propre écran, et les clés Key 1 à Key 4 se trouvent sous « Avancé ». Chacune peut être définie à partir d'une phrase secrète ou d'une valeur hexadécimale, réinitialisée à sa valeur d'usine, ou saisie après avoir été définie sur un autre appareil. Chaque modification s'authentifie avec Key 0, la seule clé habilitée à changer les cinq emplacements.

### SUN, avec les clés de votre choix

Activer SUN, ce n'est pas un simple interrupteur. Vous choisissez le **mode** : chiffré, où l'UID voyage à l'intérieur de `picc_data` et où seul un détenteur de la clé peut le lire, ou en clair, où l'UID et le compteur apparaissent tels quels dans l'URL et où seule la signature reste secrète. Et vous choisissez quelles clés font le travail : une **clé de méta-lecture** qui chiffre les données PICC et une **clé de lecture de fichier** qui calcule la signature. Il peut s'agir du même emplacement ou de deux emplacements distincts, et c'est ainsi qu'une marque peut confier à un partenaire la clé qui vérifie les scans sans lui remettre celle qui déchiffre les UID.

L'app vous prévient si vous choisissez un emplacement encore sur les zéros d'usine, parce qu'une signature faite avec une clé connue de tous ne protège rien. Et la vérification, de son côté, comprend toutes ces combinaisons : un scan signé avec Key 3 et chiffré avec Key 1 se vérifie correctement, pourvu que ces clés soient enregistrées sur le téléphone.

### Les droits d'accès des fichiers

Chaque fichier porte quatre permissions : lecture, écriture, lecture et écriture, et modification, cette dernière régissant qui a le droit de changer les trois autres. Chaque permission pointe vers l'une des cinq clés, vers « Libre » (n'importe qui) ou vers « Jamais » (personne, jamais). Vous pouvez donc dire « n'importe qui peut lire File 02, seule Key 2 peut y écrire, et seule Key 0 peut changer ces règles », et la puce fait respecter cela sans aucune app dans la boucle.

NFC.cool affiche les droits actuels de chaque fichier et vous laisse les modifier, avec deux garde-fous intégrés. Il vous signale quand une permission pointe vers une clé que ce téléphone ne détient pas, parce que vous risquez de vous couper vous-même l'accès. Et il vous fait confirmer dans une étape à part avant de régler la permission de modification sur « Jamais », parce qu'une fois cela écrit, les règles du fichier sont figées pour toute la vie de la puce.

### La configuration de la puce

Sous les fichiers se trouve la configuration de la puce elle-même, que NXP expose via une seule commande SetConfiguration. NFC.cool couvre ces options :

- **UID aléatoire.** En temps normal, la puce annonce le même UID fixe à chaque lecteur, ce qui permet à n'importe qui de suivre un tag d'un scan à l'autre. Avec l'UID aléatoire activé, elle répond avec un nouvel ID aléatoire à chaque fois et ne révèle le vrai qu'après authentification. Un vrai gain pour la vie privée, et définitif. L'app identifie les tags par leur UID, alors elle retrouve ensuite le vrai en essayant chaque Key 0 qu'elle connaît via un GetCardUID authentifié, et le tag reste gérable sur le téléphone qui l'a provisionné.
- **Limite d'authentifications échouées.** Le nombre de tentatives avec une mauvaise clé que la puce tolère avant de verrouiller Key 0. C'est une protection contre ceux qui essaieraient de deviner la clé, mais réglez-la trop bas et une poignée de scans ratés peut verrouiller la clé maîtresse pour de bon.
- **Intensité de la rétromodulation.** Forte ou standard. En standard, la puce peut devenir illisible sur de petites antennes, alors mieux vaut la laisser sur sa valeur par défaut.
- **Écriture chaînée.** Peut être désactivée pour plafonner chaque écriture à une seule trame. Définitif.
- **Octets de capacité.** Deux octets libres que NXP laisse à votre disposition.
- **LRP.** L'interrupteur de l'échange sécurisé, qui a droit à sa propre section plus bas.

### Le coffre

File 03 est un fichier propriétaire de 128 octets que la puce peut garder chiffré, et NFC.cool en fait un petit coffre privé à même le tag, le « Vault ». La première fois que vous y enregistrez quelque chose, l'app fait passer le fichier en mode entièrement chiffré et verrouille tous ses droits d'accès sur Key 0. Dès lors, le coffre contient jusqu'à 126 octets de texte que seule votre clé peut relire, et une lecture approfondie depuis n'importe quel autre téléphone n'obtient qu'une erreur de permission, rien de plus.

C'est fait pour un secret qui doit voyager avec l'objet plutôt que dormir dans la base de données de quelqu'un : un numéro de série, un mot que vous vous laissez pour plus tard, un jeton que votre propre serveur attend. Réinitialiser Key 0 à sa valeur d'usine l'efface, et c'est la seule façon de faire disparaître le coffre.

---

## Le mode LRP

En temps normal, la puce protège ses clés avec de l'AES ordinaire, et voler une clé reviendrait à casser l'AES lui-même. Mais il existe une voie d'attaque plus sournoise. Posez la puce sur un banc d'essai, mesurez les infimes variations de sa consommation électrique et de ses émissions électromagnétiques pendant qu'elle exécute le chiffrement, et avec suffisamment de ces relevés vous pouvez reconstituer la clé à partir de la seule fuite, sans jamais toucher aux mathématiques. **LRP**, le Leakage-Resilient Primitive, est un canal sécurisé repensé pour ne rien laisser à quoi cette fuite puisse s'accrocher. NXP le documente dans l'AN12304, et c'est franchement démesuré pour un autocollant sur une bouteille de vin, ce qui explique que la plupart des tags ne l'activent jamais et que la plupart des outils n'apprennent jamais à le parler.

Dans mes notes de conception pour la première version, juste à côté de « mode LRP », j'avais écrit « pas prévu ». Ça n'a pas cessé de me tarauder, alors je l'ai construit. NFC.cool peut faire basculer un tag en mode LRP et, surtout, continuer à s'y authentifier et à le gérer ensuite : clés, droits des fichiers, coffre, configuration de la puce, le tout sur le canal LRP au lieu de l'AES.

Deux choses à savoir avant d'actionner cet interrupteur. C'est définitif : une fois un tag en mode LRP, son échange sécurisé AES est désactivé pour toujours, et un outil qui ne parle que l'AES ne pourra plus jamais dialoguer avec lui. Et SUN n'est pas disponible sur un tag LRP, donc un tag dont le travail est de signer les scans devrait rester en mode AES.

---

## Ce qu'on ne peut pas défaire

Beaucoup de ces commandes sont définitives, et l'app le clame haut et fort sur le moment : chaque action irréversible vous oblige à confirmer via un avertissement qui détaille la conséquence exacte. Ça vaut quand même la peine de les lister ici.

- Activer le LRP.
- Activer l'UID aléatoire.
- Désactiver l'écriture chaînée.
- Régler la permission de modification d'un fichier sur « Jamais ».
- Perdre une clé. La puce n'a pas de réinitialisation d'usine. Si Key 0 est perdue, votre capacité à reconfigurer le tag l'est aussi.
- Une limite d'authentifications échouées réglée trop bas, qui peut verrouiller Key 0 après quelques scans ratés.

Entraînez-vous sur un tag de rechange avant de toucher à un tag qui vous tient à cœur.

---

## Où les tags NFC anti-contrefaçon servent réellement

Honnêtement ? La plupart des gens qui scannent un tag NFC n'ont jamais besoin de rien de tout cela, et c'est très bien. Un autocollant qui ouvre un lien est une chose merveilleuse, banale et utile.

Mais une fois que vous en avez tenu un en main, les cas d'usage sautent aux yeux. Un sac de luxe peut prouver son authenticité. Une bouteille de vin ou de whisky peut montrer qu'elle n'a jamais été discrètement débouchée puis remplie à nouveau, le sceau d'inviolabilité assurant cette moitié-là. Une boîte de médicament se porte garante à la fois du vrai principe actif à l'intérieur et d'un sceau que personne n'a brisé. Les billets d'événements cessent d'être quelque chose qu'on peut capturer en photo et faire circuler, et un tag près d'une porte prouve que quelqu'un s'est réellement tenu là, au lieu de rejouer un lien enregistré depuis son canapé. C'est le même problème d'authenticité que le [passeport numérique de produit de l'UE](/blog/eu-digital-product-passport-2026/) aborde par le versant réglementaire, résolu à l'échelle de l'objet individuel.

Je n'ai pas construit ça parce que mille utilisateurs le réclamaient. Je l'ai construit parce que j'ai acheté des tags bizarres sur internet par curiosité, j'ai compris comment ils fonctionnaient, et ensuite je n'ai pas pu laisser une seule page de la fiche technique de côté. C'est souvent comme ça que naissent les bonnes fonctionnalités.

---

## L'essentiel sur les tags NTAG 424 DNA

Les tags NTAG 424 DNA sont ce que le NFC a de plus proche d'un sceau infalsifiable. Ils ne peuvent pas empêcher quelqu'un de copier un produit, mais ils rendent la *preuve d'authenticité du produit* impossible à falsifier, parce que cette preuve est une signature cryptographique neuve que seule la vraie puce peut produire.

NFC.cool Tools les lit, vérifie la puce, le scan et le sceau d'inviolabilité, et vous confie la puce entière à configurer : chaque clé, les permissions de chaque fichier, les réglages de la puce elle-même, même le LRP, le tout depuis votre téléphone. Si vous vous êtes déjà demandé comment un scan peut distinguer le vrai du faux, procurez-vous l'app sur [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-fr&mt=8) ou [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-fr), commandez deux ou trois de [ces tags](/affiliate-links/) pour quelques euros, et scannez-en un vous-même. C'est un sujet dans lequel il fait bon se perdre.
