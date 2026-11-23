---
id: "check-transit-card-balance-iphone-2026-11"
title: "Comment consulter le solde de votre carte de transport ou carte IC sur iPhone : Suica, Octopus, T-money et bien d'autres"
date: "2026-11-22"
tags: ["guides", "iphone", "privacy"]
summary: "Tenez une carte IC, de transport ou de monnaie électronique comme Suica, Octopus ou T-money contre votre iPhone, et NFC.cool affiche son solde et ses derniers trajets. Voici toutes les cartes qu'il sait lire, ce que révèle une carte bancaire, et ce que n'importe qui pourrait lire sur la vôtre."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/check-transit-card-balance-iphone-v4.webp"
imageAlt: "Un iPhone affichant le solde et le graphique d'une carte de transport pendant qu'une carte IC verte est tenue contre lui, avec deux autres cartes de transport devant"
metaTitle: "Solde d'une carte de transport ou carte IC sur iPhone : Suica et autres"
metaDescription: "Consultez le solde et les trajets de vos cartes IC, de transport et de monnaie électronique comme Suica, PASMO, Octopus, T-money, Clipper et Opal sur iPhone. Toutes les cartes que lit NFC.cool."
ogTitle: "Consultez le solde de votre carte de transport avec votre iPhone"
ogDescription: "Suica, Octopus, T-money, Navigo, Clipper et bien d'autres cartes IC : tenez la carte contre votre iPhone et découvrez son solde, ses trajets et ce que n'importe qui peut y lire."
---
Pendant des années, le même genre d'e-mail n'a pas arrêté d'arriver dans ma boîte, dans une douzaine de langues et avec une douzaine de noms de cartes différents. « Votre app ne lit pas ma carte de monnaie électronique. » « Elle ne voit pas ma carte IC. » « J'ai tenu mon ticket de métro contre le téléphone et il ne s'est rien passé. »

Ils n'avaient pas tort. NFC.cool trouvait la puce, [affichait son identifiant et son type](/fr/features/nfc-reader-writer/), et s'arrêtait là. Pour quelqu'un qui tient une carte chargée d'argent, on aurait dit que l'app baissait les bras. Après tout, le solde qu'il cherchait se trouvait bel et bien sur la carte.

La version 7.4.0 de [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-fr&mt=8) est ma réponse à tous ces e-mails. Tenez une carte de transport, une carte de monnaie électronique ou une carte bancaire contre votre iPhone, et l'app affiche désormais son solde, ses derniers trajets et, ce qui est tout aussi intéressant, tout ce que n'importe qui d'autre pourrait y lire. Ça commence sur iPhone, et [NFC.cool Tools pour Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-check-transit-card-balance-iphone-fr) (bientôt) aura droit à la même lecture des cartes.

---

## Pourquoi il n'existe pas une seule sorte de « carte NFC »

Toutes ces cartes [communiquent avec votre téléphone par NFC](/fr/blog/nfc-on-iphones-insider-look/). Les ressemblances s'arrêtent là.

Je me le représente comme ça : le NFC n'est que la porte d'entrée. Derrière, chaque carte est un bâtiment à part, avec son propre plan et ses propres pièces fermées à clé. Les cartes japonaises tournent sur le **FeliCa** de Sony. Beaucoup de cartes de transport européennes utilisent **Calypso**. San Francisco, Sydney et Helsinki utilisent du [**MIFARE DESFire**](/fr/blog/ultimate-nfc-tag-guide/#mifare-classic-plus-et-desfire-la-famille-du-contrôle-daccès), avec à chaque fois une organisation interne différente. Les cartes bancaires parlent **EMV**, la même norme que le terminal de paiement à la caisse de votre supermarché.

Et dans chaque bâtiment, c'est l'opérateur qui décide quelles pièces restent ouvertes. Certains laissent le solde et les vingt derniers trajets en accès libre, n'importe qui peut entrer. D'autres ferment toutes les portes, et seuls leurs propres portiques et distributeurs de titres en ont la clé. Aucune app ne passe outre, et NFC.cool n'essaie même pas : chaque lecture se fait en lecture seule, sans aucune clé, et rien n'est jamais écrit sur la carte.

Le vrai travail derrière cette fonction, ça a donc été d'apprendre le plan de chaque système de cartes, un par un.

---

## Les cartes de transport et cartes IC que NFC.cool sait lire

Voici ce que l'app sait lire aujourd'hui. D'abord, une précision honnête. J'ai testé tout ce que j'avais dans mon propre portefeuille, y compris le ticket papier jetable OV-chipkaart des Pays-Bas et mes propres cartes bancaires. Mais il existe bien plus de cartes dans le monde que dans n'importe quel portefeuille, donc la prise en charge de la plupart des cartes ci-dessous repose sur l'organisation de chaque système, pas sur une carte que j'ai eue en main. Si la vôtre est mal lue, ou pas lue du tout, j'ai vraiment envie de le savoir. Je vous explique comment plus bas.

<figure class="phone-figure" data-layout="stage">
<figcaption>Ce que NFC.cool affiche pour votre carte</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/1-suica-balance-440w.webp" alt="Une carte Suica dans NFC.cool : la face verte de la carte avec un solde de ¥2,140, un graphique du solde en dessous et les premiers trajets et paiements"><p><strong>Solde.</strong> Le solde de la carte en haut, et son évolution au fil des derniers trajets.</p></li>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/2-tmoney-trips-440w.webp" alt="Une carte T-money dans NFC.cool avec un solde de ₩12,350 et une liste de paiements avec la date, l'heure, le montant et le solde restant après chacun"><p><strong>Trajets et paiements.</strong> Chaque entrée que la carte conserve, avec le solde restant après.</p></li>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/3-locked-card-440w.webp" alt="Une carte de transport MIFARE DESFire dans NFC.cool : le type de puce et le numéro de série sont lisibles, les trajets, le solde et les abonnements sont marqués Non lisible"><p><strong>Cartes verrouillées.</strong> Quand l'opérateur la verrouille, l'app vous dit ce qui reste fermé.</p></li>
</ol>
</figure>

### Solde et derniers trajets

- **Japon :** Suica, PASMO, ICOCA, Kitaca, manaca, nimoca, PiTaPa, TOICA et Hayakaken, avec jusqu'à 20 trajets récents et leurs gares quand l'app les connaît. Rakuten Edy, nanaco et WAON affichent eux aussi leur solde et leur historique.
- **Corée du Sud :** T-money et Cashbee, avec les derniers trajets et les dates d'émission et d'expiration de la carte.
- **Chine et Hong Kong :** Shenzhen Tong, Wuhan Tong, les cartes City Union (affichées comme Shanghai Public Transport quand il s'agit d'une carte de Shanghai) et T-Union, avec les derniers trajets et les dates de validité. L'Octopus de Hong Kong affiche son solde.
- **Indonésie :** Mandiri e-money, BCA Flazz, BNI TapCash, MegaCash et la KRL Kartu Multi Trip, avec leur historique. Les cartes JakCard et MRT Jakarta affichent le solde.
- **Australie et Nouvelle-Zélande :** l'Opal de Sydney, avec le solde et le dernier trajet, et la Snapper de Wellington, qui repose sur le même système que la T-money et s'affiche en NZ$.
- **États-Unis :** la Clipper à San Francisco et l'ORCA à Seattle.
- **Finlande :** les cartes HSL, Waltti et de Tampere.
- **Israël :** la Rav-Kav, avec son crédit, ses abonnements et ses trajets.

### Abonnements et trajets, mais pas de solde

Beaucoup de cartes européennes n'ont pas de solde du tout. Elles portent des abonnements. Le Navigo parisien et les autres cartes Calypso françaises (Pass Pass, KorriGo, OùRA et d'autres), la MOBIB à Bruxelles, l'Opus à Montréal, la Venezia Unica et la Lisboa Viva affichent les abonnements chargés sur la carte et les derniers trajets. La metroCARD d'Adélaïde et la Hafilat d'Abou Dhabi font de même, parce que leur solde est protégé par la clé de l'opérateur.

### Tickets papier et à usage unique

Les fins tickets en papier ont eux aussi une puce. NFC.cool lit les tickets Ventra de Chicago et Compass de Vancouver, la Troika de Moscou, les tickets papier Clipper, les tickets HSL, de Tampere, de Venise et de Pise, le ticket papier OV-chipkaart et les tickets GTT de Turin, où vous verrez le type de ticket, sa date d'émission et le moment où il a été validé.

### Verrouillées par l'opérateur

Certains opérateurs verrouillent tout. Pour l'Oyster de Londres, la Leap de Dublin ou la Rabbit de Bangkok, NFC.cool peut vous dire de quelle carte il s'agit, et c'est tout, parce que rien d'autre n'y est accessible. Quelques-unes, comme la Myki à Melbourne et la PRESTO à Toronto, laissent voir le numéro de carte et gardent le reste pour elles. Aucune mise à jour n'y changera rien. C'est la façon dont ces systèmes sont conçus.

### Les cartes qui demandent un lecteur externe

Il y a des cartes que l'iPhone refuse tout simplement de confier à une app. C'est le cas de l'EZ-Link et de la NETS FlashPay à Singapour, et de la Yikatong de Pékin. Branchez un [lecteur NFC USB externe](/fr/affiliate-links/#usb-nfc-reader) et NFC.cool les lit, avec le solde et l'historique. J'ai expliqué comment fonctionnent ces lecteurs dans l'article sur [la lecture de tags NFC sur iPad et Mac](/fr/blog/nfc-reading-ipad-mac/).

---

## Cartes bancaires : ce que vous voyez, et ce que vous ne verrez jamais

Avec les cartes bancaires, les gens deviennent nerveux, et c'est bien normal.

Sur un iPhone, NFC.cool vous indique le réseau, Visa ou Mastercard, et rien de plus. [Apple ne permet pas aux apps comme la mienne de lire les données de paiement d'une carte bancaire](https://developer.apple.com/documentation/corenfc/nfctagreadersession) sur l'iPhone, et moi qui travaille avec cette technologie tous les jours, je trouve que c'est la bonne décision.

Avec un lecteur USB externe, il y en a davantage : le réseau, le numéro de carte masqué à part ses six premiers et ses quatre derniers chiffres, la date d'expiration, le pays d'émission et la devise. Ce que NFC.cool ne lit jamais, sur aucun appareil, c'est votre nom, et le cryptogramme et le code PIN ne sont pas lisibles du tout. J'explique pourquoi il n'y a rien sur la puce qui vaille la peine d'être copié dans [mon guide des tags NFC](/fr/blog/ultimate-nfc-tag-guide/#mon-téléphone-peut-il-lire-ma-carte-bancaire-ou-mon-passeport-avec-une-app-nfc).

---

## Ce que le téléphone d'un inconnu pourrait lire sur votre carte

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/anyone-can-read-440w.webp" alt="La section Ce que tout le monde peut lire d'une carte Suica dans NFC.cool : le solde et les 6 derniers trajets et paiements sont lisibles par n'importe quel téléphone, sans clé"><p><strong>Ce que tout le monde peut lire.</strong> Sur une Suica, le solde et les derniers trajets, sans aucune clé.</p></li>
</ol>
</figure>

C'est la partie que je trouve la plus intéressante, et c'est la première chose que je regarderais.

Tout ce que NFC.cool lit, il le lit sans clé. Autrement dit, n'importe quel téléphone posé contre votre carte pourrait lire la même chose. Un passeport, c'est l'inverse : sa puce reste muette tant que vous ne lui donnez pas une clé imprimée sur la page photo, et c'est comme ça que fonctionne [la lecture de votre passeport avec votre téléphone](/fr/blog/read-passport-nfc-chip/). Chaque écran de carte a donc une section appelée **Ce que tout le monde peut lire**, qui liste exactement ce que cette lecture a fait apparaître : le solde, les trajets avec leurs dates et leurs gares, un numéro de carte, bref tout ce que la carte a bien voulu livrer.

Pour une Suica, ça peut être vingt trajets avec le nom des gares. Pour un Navigo, vos abonnements et vos derniers trajets. Pour une Oyster, presque rien. Le NFC ne fonctionne qu'à quelques centimètres, donc personne ne lit votre carte depuis l'autre bout du wagon, mais ça vaut quand même la peine de savoir quel genre de carte vous avez dans la poche.

Et pendant tout ce temps, rien ne quitte votre iPhone. La lecture se passe entre la carte et votre téléphone, point.

---

## Votre carte au fil du temps

Chaque carte que vous lisez est enregistrée dans votre liste de scans, avec un court résumé comme « Suica • ¥1,234 » pour que vous la retrouviez facilement. Rouvrez-la plus tard et vous retrouvez la carte telle qu'elle était, avec en plus **Depuis le dernier scan**, qui montre de combien le solde a changé depuis la dernière fois que vous avez lu cette même carte. Pratique si vous vous êtes déjà demandé où était passée votre dernière recharge.

---

## Consulter le solde de votre carte sur iPhone

1. Ouvrez [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-fr&mt=8) et touchez **Lire NFC**.
2. Tenez la carte à plat contre le haut de votre iPhone et ne bougez plus jusqu'à ce que la fenêtre de lecture affiche **Carte lue**.
3. La carte s'ouvre sur son propre écran, avec le solde en haut et les détails en dessous.

Pas besoin de choisir un type de carte avant. L'app reconnaît toute seule de quelle carte il s'agit.

---

## Votre carte n'est pas dans la liste ? Envoyez-la-moi

C'est là que vous entrez en jeu. Quand NFC.cool reconnaît une puce mais n'arrive pas à tout lire, l'écran de la carte affiche **Aide-nous à lire cette carte**. Quand il a bien lu un solde mais que quelque chose vous semble bizarre, la même section s'appelle **Un problème ?**.

Touchez **Envoyer les détails de lecture**, indiquez le nom de la carte et son pays, et s'il y a un solde, dites-moi s'il est juste. Avant que quoi que ce soit ne parte, touchez **Voir les données** pour voir exactement ce qui sera envoyé : ce que la carte a répondu pendant la lecture, le type de puce, votre appareil et la version de l'app, et votre pays. Ni votre nom ni aucun compte n'en font partie, et le numéro de série de la carte ainsi que tout numéro de carte que l'app reconnaît sont masqués. Une carte que l'app ne connaît pas encore pourrait quand même contenir des informations qu'elle ne sait pas repérer, et c'est justement pour ça que vous pouvez tout regarder d'abord. Si l'envoi ne fonctionne pas, vous pouvez aussi me l'envoyer par e-mail.

Chaque signalement, c'est une carte que je n'ai pas, souvent d'une ville où je ne suis jamais allé, et c'est comme ça que les prochaines cartes sont prises en charge. Alors si vous m'avez déjà écrit que NFC.cool ne lit pas votre carte : [mettez l'app à jour](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-fr&mt=8) et réessayez. Et si ça ne marche toujours pas, vous avez maintenant un bouton qui m'envoie exactement ce dont j'ai besoin pour corriger ça.

[Télécharger NFC.cool Tools pour iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-fr&mt=8) · [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-check-transit-card-balance-iphone-fr) (bientôt)
