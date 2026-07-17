---
id: nfc-blog-015
title: "Comment vérifier et réinitialiser le compteur de tête de brosse Philips Sonicare avec le NFC"
date: 2026-04-21
tags: ["nfc-tags", "guides", "automation"]
summary: "Votre brosse à dents Sonicare cache une puce NFC dans chaque tête de brosse, qui décompte jusqu'à ce que vous en rachetiez une. Voici ce qu'elle mesure réellement, et comment vérifier votre utilisation ou réinitialiser le compteur avec NFC.cool Tools."
image: "/assets/images/Blog/reset-sonicare-brush-head-nfc.webp"
imageAlt: "Le tag NFC d'une tête de brosse à dents électrique en cours de réinitialisation avec un téléphone"
metaTitle: "Vérifier et réinitialiser le compteur de tête de brosse Philips Sonicare avec le NFC (2026)"
metaDescription: "La tête de brosse de votre Sonicare contient une puce NFC qui mesure depuis combien de temps vous vous brossez les dents. Voyez combien de vie il lui reste et réinitialisez le compteur avec NFC.cool Tools."
ogTitle: "Comment vérifier et réinitialiser le compteur de votre tête de brosse Sonicare"
ogDescription: "Chaque tête de brosse Sonicare contient une puce NFC qui décompte jusqu'au remplacement. Consultez vos statistiques d'utilisation et réinitialisez le minuteur si vous le souhaitez."
---

Votre brosse à dents électrique vous espionne.

Pas façon surveillance flippante. Plutôt façon « on a glissé une minuscule puce NFC dans votre tête de brosse pour vous harceler jusqu'à ce que vous rachetiez des recharges ». Chaque recharge Philips Sonicare embarque un NTAG213 noyé dans le plastique, qui mesure depuis combien de temps vous vous brossez les dents et ordonne au manche de faire clignoter un voyant d'avertissement quand il estime que vos trois mois sont écoulés.

Bienvenue dans l'Internet of Shit.

Le truc, c'est que trois mois, c'est une recommandation, pas un fait médical. L'usure des poils dépend de la force avec laquelle vous brossez, du dentifrice que vous utilisez et de la fréquence. La puce ne mesure pas l'état des poils. Elle se contente de compter des secondes. Quelqu'un qui brosse en douceur avec un dentifrice doux peut avoir des poils parfaitement en état au bout de trois mois. Le minuteur, lui, n'en sait rien et s'en moque.

NFC.cool Tools sait désormais lire cette puce, vous montrer exactement quelle part de vie votre tête de brosse a consommée, et réinitialiser le minuteur si vous décidez que vos poils sont encore bons. Voici comment ça marche.

---

## Ce qu'il y a vraiment sur la puce

Je n'ai rien rétro-conçu de tout cela moi-même. Cyrill Künzi a [décortiqué le protocole](https://kuenzi.dev/toothbrush/) et mbirth a [cartographié chaque octet](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html), et à eux deux ils ont élucidé tout ce qui suit. Voici ce que stocke le NTAG213 de votre tête de brosse :

- **Type et couleur de la tête de brosse** - un unique octet à la page `0x1F` qui identifie le modèle (Premium All-in-One, Gum Care, DiamondClean, etc.) et sa couleur (la [carte mémoire de mbirth](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) recense 22 types connus)
- **Durée de vie cible** - à `0x21`, généralement `0x5460` = 21 600 secondes, soit 180 sessions de brossage de deux minutes, ou trois mois d'utilisation biquotidienne
- **Code de fabrication** - à `0x21-0x23`, la date et la ligne de production en ASCII, comme `241206 31K` (fabriquée le 6 décembre 2024, sur la ligne 31K). Également imprimé sur la tige
- **Temps de brossage cumulé** - les deux premiers octets de la page `0x24` stockent, sous forme de valeur 16 bits, le nombre total de secondes d'utilisation de la tête. Lorsqu'il atteint `0xFFFF` (65 535 secondes, environ 18 heures de brossage continu), le compteur s'arrête. Une tête toute neuve démarre à `00:00:02:00` - les deux premiers octets sont à zéro (aucune utilisation), la signification des deux derniers octets est actuellement inconnue
- **Dernière intensité et dernier mode** - à `0x24` également : Low/Med/High et Clean/White+/Gum Health/Deep Clean+
- **Une URL** - pointant vers `philips.com/nfcbrushheadtap`, qui s'ouvre si vous approchez la tête d'un lecteur NFC générique

Quand le temps cumulé dépasse la cible (21 600 secondes), le manche fait clignoter sa LED ambre. C'est la puce qui parle, pas les poils.

---

## Pourquoi vous pourriez vouloir le réinitialiser

L'intervalle de remplacement de trois mois est une recommandation de Philips, pas une mesure scientifique de l'usure des poils. La puce compte des secondes, pas l'effilochage des poils. Si vous voulez décider par vous-même, en regardant vos poils plutôt qu'en obéissant à un minuteur à rebours, réinitialiser le compteur vous le permet.

Vous pourriez aussi le réinitialiser si vous alternez entre plusieurs têtes (voyage et maison) et souhaitez les suivre vous-même.

---

## Comment fonctionne le mot de passe

Le NTAG213 est protégé par mot de passe. Chaque tête de brosse possède un mot de passe unique de 4 octets. Le manche de la brosse s'authentifie avec lui chaque fois qu'il écrit sur le tag.

Le mot de passe est calculé à partir de deux éléments : l'UID de 7 octets du tag et le code de fabrication stocké sur le tag (et imprimé sur la tige). [Aaron Christophel](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) a rétro-conçu l'algorithme à partir du firmware du Sonicare, après que Cyrill Künzi a d'abord intercepté la transmission du mot de passe à l'aide d'une radio logicielle.

**Important :** le NTAG213 se verrouille définitivement après **trois tentatives de mot de passe échouées**. La puce devient en lecture seule pour toujours - même la brosse à dents ne peut plus y écrire. Ne devinez pas au hasard.

---

## Comment vérifier et réinitialiser avec NFC.cool Tools

Voici à quoi ça ressemble dans l'app :

<figure class="sk-phone-screenshot">
  <img src="/assets/images/Blog/sonicare-reset-screen.webp" alt="NFC.cool Tools affichant une tête de brosse Sonicare à 80 % d'utilisation avec le bouton Reset Timer" />
</figure>

NFC.cool Tools gère tout le processus : lire le tag, calculer le mot de passe et afficher les statistiques. Pas de commandes hexadécimales, pas de calculateurs en ligne, pas de radio logicielle.

1. Ouvrez **NFC.cool Tools** sur votre iPhone
2. Allez dans **Toothbrush Head Reset**
3. Appuyez sur **Read NFC** et maintenez la tête de brosse contre votre téléphone
4. L'app affiche une **jauge en pourcentage** indiquant quelle part de vie la tête a consommée, avec le temps utilisé et le temps restant en dessous
5. Appuyez sur **Reset Timer** pour remettre le compteur d'utilisation à zéro, ou scannez une autre tête

Disponible dès maintenant sur [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-fr&mt=8) et [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-fr).

---

## Ce que fait réellement la réinitialisation

Quand vous réinitialisez, vous écrivez `00:00:02:00` sur la page `0x24` - la même valeur avec laquelle une tête toute neuve est livrée. Seuls les deux premiers octets (le compteur d'utilisation) sont ramenés à zéro. La signification des deux derniers octets est inconnue, l'app les préserve donc.

La brosse à dents recommence à compter à partir de zéro, et le voyant ambre revient au bout de trois nouveaux mois. Moment où vous pourrez examiner vos poils et décider par vous-même.

---

## La vue d'ensemble : le NFC dans les objets du quotidien

Une tête de brosse dotée d'une puce NFC qui décompte jusqu'à votre prochain achat, c'est l'Internet of Shit à son paroxysme. J'ai bâti mon travail autour du NFC parce que je le trouve réellement utile, mais l'intégrer dans du plastique jetable dans le seul but de vous pousser à en racheter, c'est... un choix.

La même puce NTAG213 sert aussi à des choses qui rendent vraiment service au consommateur : l'authentification de produits, le contrôle d'accès, et bientôt le passeport numérique de produit de l'UE, qui imposera des tags NFC sur les produits de consommation pour que vous puissiez vérifier ce que vous achetez et d'où ça vient. Là, c'est le NFC utilisé *pour* vous, pas contre vous.

NFC.cool Tools lit et écrit tout cela. La fonction Sonicare est un exemple de ce que signifie comprendre ce qu'il y a sur les tags qui vous entourent, et décider quoi faire de cette information.

---

## Pour aller plus loin

- [L'article original de rétro-ingénierie de Cyrill Künzi](https://kuenzi.dev/toothbrush/) - interception par radio logicielle, extraction du mot de passe et première analyse détaillée du protocole NFC du Sonicare
- [Le générateur de mot de passe d'Aaron Christophel](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) - l'algorithme extrait du firmware du Sonicare
- [La carte mémoire du NTAG213 de mbirth](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) - documentation détaillée de chaque octet de la puce

*Une tête de brosse Sonicare à vérifier ? [Téléchargez NFC.cool Tools pour iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-fr&mt=8) ou [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-fr) et découvrez ce que votre brosse à dents suit depuis le début.*