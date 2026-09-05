---
id: batch-write-nfc-tags-csv-2026-09
title: "Comment écrire des tags NFC par lots depuis un tableur"
date: 2026-09-05
tags: ["guides", "nfc-tags", "iphone"]
summary: "Je distribue des codes promo App Store sur des tags NFC dans les conférences et les meetups, plusieurs centaines à ce jour. Voici comment je les écris, et la méthode vaut pour n'importe quelle liste : on la prépare dans un tableur, on exporte un CSV, on envoie le fichier sur le téléphone et NFC.cool Tools écrit les tags l'un après l'autre."
image: "/assets/images/Features/nfc-reader-writer-csv-batch-write.webp"
imageAlt: "Un iPhone affichant un fichier tableur, en train d'écrire ses lignes sur une rangée de tags NFC"
author: "Nicolo Stanciu"
metaTitle: "Écrire des tags NFC par lots depuis un CSV sur iPhone et Android"
metaDescription: "Des centaines de tags NFC depuis un seul tableur : préparez la liste, exportez un CSV, envoyez-le sur votre téléphone et laissez NFC.cool Tools écrire tag après tag."
ogTitle: "Écrire des tags NFC par lots depuis un tableur"
ogDescription: "D'un CSV sur votre ordinateur à une pile de tags NFC écrits, un par un. Comment je prépare des centaines de tags à codes promo pour les conférences."
---
Je vais dans des conférences et des meetups pour montrer mes apps, et quand une conversation s'est bien passée, j'aime la conclure en tendant un tag NFC avec un code promo dessus. Vous approchez votre téléphone du tag, l'App Store s'ouvre avec le code déjà renseigné, et l'app est à vous.

Les tags n'ont jamais été le problème. La quantité, si. Chaque code promo est unique, donc chaque tag a besoin de son propre lien, et j'en voulais quelques centaines. Les écrire un par un dans l'app, à cette échelle, ce n'était pas tenable. C'est pour ça que j'ai ajouté l'**écriture par lots CSV** à NFC.cool Tools : je prépare la liste sur le Mac, je l'exporte en CSV, j'envoie le fichier sur le téléphone, puis je présente les tags au téléphone l'un après l'autre pendant que l'app avance dans la liste. À ce jour, j'ai écrit plusieurs centaines de tags comme ça.

Voici tout le parcours, du tableur jusqu'au dernier tag. La méthode vaut aussi bien pour des liens produits, des numéros de série, des identifiants Wi-Fi ou n'importe quoi d'autre qui tient dans une cellule de tableur.

---

## Ce que fait concrètement l'écriture par lots CSV

Vous donnez un fichier CSV à l'app, et chaque ligne devient un tag. L'app vous montre un aperçu de ce qui ira sur chacun, vous appuyez sur Commencer l'écriture, puis vous présentez les tags l'un après l'autre au téléphone. Chaque ligne écrite est retirée du fichier, si bien que la liste à l'écran correspond toujours à ce qu'il reste à faire. Vous pouvez vous arrêter à tout moment et reprendre plus tard, même plusieurs jours après.

Si vous n'avez encore jamais écrit de tag NFC, commencez par mon [guide pour écrire des tags NFC avec un iPhone](/blog/write-nfc-tags-iphone/). Ici, il est question d'en écrire beaucoup.

---

## Étape 1 : préparer le tableur sur l'ordinateur

Ouvrez Numbers, Excel ou Google Sheets et constituez la liste sur votre ordinateur. C'est bien plus rapide que tout ce que vous pourriez faire sur le téléphone, et le tableur peut construire les liens à votre place.

La disposition la plus simple, c'est **une seule colonne, avec une ligne par tag**. Chaque ligne contient exactement ce qu'un tag recevra. Une colonne de liens produits ressemble à ceci :

```
https://example.com/products/1001
https://example.com/products/1002
https://example.com/products/1003
```

Si vos valeurs ne diffèrent que par un numéro ou un identifiant, laissez une formule remplir la colonne. Saisissez la première valeur, étirez la formule vers le bas, et la liste est prête, quelle que soit sa longueur. Si vous avez déjà les identifiants dans un fichier, ouvrez-le dans le tableur et ajoutez la partie fixe devant avec une formule.

L'app regarde comment chaque valeur commence et choisit le type de record NDEF qui convient :

- Un lien (`https://`, `http://` ou `www.`) devient un record URL. On approche le téléphone du tag, et le navigateur l'ouvre.
- `tel:`, `mailto:`, `sms:` et `geo:` deviennent l'action correspondante : un tag peut ainsi composer un numéro, préparer un e-mail ou ouvrir un lieu sur la carte.
- `WIFI:T:WPA;S:MyNetwork;P:secret;;` devient un record Wi-Fi, le même format qu'un code QR Wi-Fi. Un piège : cette chaîne contient des points-virgules, donc l'app va supposer que votre fichier est délimité par des points-virgules et la découper en morceaux. Réglez le délimiteur sur la virgule dans l'app, et la ligne reste entière.
- `shortcuts://` lance un raccourci iOS.
- Tout le reste est écrit en texte brut.

Gardez chaque valeur sur une seule ligne. Le fichier est lu ligne par ligne, donc une fiche de contact étalée sur plusieurs lignes finirait sur plusieurs tags.

Deux points de vigilance :

1. **Pas de ligne d'en-tête.** L'app considère chaque ligne non vide comme du contenu. Si votre première ligne dit « URL », le premier tag contiendra le mot URL.
2. **Les lignes vides ne gênent pas.** Elles sont ignorées, tout comme les espaces autour d'une valeur.

### Quand un tag doit contenir plusieurs records

Il arrive qu'un tag doive porter plusieurs choses à la fois, par exemple un site web, un numéro de téléphone et une adresse e-mail par personne. Dans ce cas, ajoutez des colonnes. Dans l'app, vous réglez **Grouper par** sur **Par lignes**, et chaque ligne devient un tag avec un record par cellule. **Par colonnes** fait l'inverse et transforme chaque colonne en tag, au cas où vous auriez construit la feuille dans l'autre sens. Pour un fichier à une seule colonne, c'est le réglage **Lignes par tag** qui prend le relais : trois lignes peuvent ainsi aller sur un même tag, sous forme de trois records.

---

## Étape 2 : exporter en CSV

Un fichier CSV n'est rien d'autre qu'un fichier texte. Chaque ligne du tableau devient une ligne de texte, avec les cellules séparées par une virgule, un point-virgule ou une tabulation. Ouvrez-en un dans TextEdit ou le Bloc-notes et vous voyez exactement ce que l'app verra. Une feuille avec un lien et un numéro de téléphone par personne donne ceci une fois exportée :

```
https://example.com/anna,tel:+4915112345678
https://example.com/ben,tel:+4915198765432
```

La mise en forme et les formules ne survivent pas à l'export, seules les valeurs restent. Voici comment obtenir ce fichier depuis Numbers, Excel et Google Sheets.

### Numbers sur Mac

1. Choisissez **Fichier**, puis **Exporter vers**, puis **CSV**.
2. Si votre document contient plusieurs tableaux, Numbers demande s'il faut créer un fichier par tableau ou tout regrouper. Ce que vous voulez, c'est un seul tableau dans un seul fichier.
3. Laissez **Inclure les noms des tableaux** décoché. Sinon, Numbers écrit le nom du tableau dans le fichier sur une ligne à part, et cette ligne finirait sur un tag.
4. Sous **Options avancées**, laissez l'encodage du texte sur Unicode (UTF-8).
5. Cliquez sur **Suivant**, nommez le fichier et cliquez sur **Exporter**.

Deux particularités de Numbers. Chaque nouveau tableau arrive avec un rang d'en-tête grisé, et ce que vous y saisissez est exporté comme n'importe quelle autre ligne : laissez-le vide ou supprimez-le. Et Numbers utilise toujours la virgule comme séparateur. Si une valeur contient une virgule, Numbers l'entoure de guillemets, et l'app ne retire pas ces guillemets. Bannissez donc les virgules de vos valeurs quand vous exportez depuis Numbers.

### Excel sur Mac ou Windows

1. Choisissez **Fichier**, puis **Enregistrer sous** (certaines versions parlent d'Enregistrer une copie).
2. Sélectionnez le format **CSV UTF-8 (délimité par des virgules) (.csv)**.
3. Excel n'enregistre que la feuille affichée et prévient que la mise en forme sera perdue. Confirmez, vous n'en avez pas besoin.

Malgré le nom du format, Excel n'utilise pas toujours des virgules. Il reprend le séparateur de liste défini dans les réglages régionaux de votre système, et sur un système en français, en allemand, en néerlandais ou dans la plupart des autres langues européennes, c'est un point-virgule, parce que la virgule sert déjà de séparateur décimal. Vous n'avez rien à changer : NFC.cool détecte automatiquement la virgule, le point-virgule et la tabulation. Cela veut aussi dire que vos valeurs peuvent contenir des virgules.

### Google Sheets

1. Choisissez **Fichier**, puis **Télécharger**, puis **Valeurs séparées par des virgules (.csv)**.
2. Seule la feuille active est exportée, toujours avec des virgules.

### Avant d'envoyer le fichier

Avant que le fichier parte sur le téléphone, je l'ouvre une fois dans un éditeur de texte. Ce qu'il faut voir : une ligne par tag, pas de ligne d'en-tête, pas de guillemets autour des valeurs et pas de virgule égarée dans un fichier délimité par des virgules. Si une valeur doit absolument contenir une virgule, exportez avec des points-virgules depuis Excel, ou utilisez l'export TSV de Numbers (séparé par des tabulations) et renommez le fichier pour qu'il se termine en `.csv`. Sur iPhone, le fichier doit de toute façon se terminer en `.csv`, parce que c'est sur cette extension que filtre le sélecteur de fichiers.

---

## Étape 3 : envoyer le fichier sur le téléphone

Tout chemin qui aboutit dans l'app Fichiers sur iPhone, ou dans un emplacement accessible au sélecteur de fichiers du système sur Android, fait l'affaire.

- **AirDrop** : envoyez le fichier de votre Mac vers votre iPhone et choisissez Enregistrer dans Fichiers.
- **iCloud Drive** : enregistrez le CSV dans iCloud Drive sur le Mac, et il apparaît dans l'app Fichiers sur le téléphone. Google Drive et Dropbox fonctionnent de la même manière, l'app Fichiers sait aussi les parcourir.
- **Envoyez-vous le fichier par e-mail** et enregistrez la pièce jointe.
- **Android** : Quick Share depuis un ordinateur portable, Google Drive ou un câble USB. L'app passe par le sélecteur de documents du système, donc tout emplacement qu'il sait ouvrir convient.

---

## Étape 4 : importer le fichier et vérifier l'aperçu

Dans NFC.cool Tools, ouvrez l'écran des outils NFC et cherchez **Écriture par lots CSV** sous **Modes par lots**. Sur Android, elle figure aussi dans la liste des outils NFC. Appuyez sur **Importer CSV** et sélectionnez votre fichier.

L'app fait sa propre copie du fichier. Au fil des écritures, les lignes sont retirées de cette copie. Votre tableur d'origine sur l'ordinateur reste intact, vous gardez donc toujours la liste complète.

Une fois le fichier sélectionné, l'app affiche ce qu'elle a détecté : le délimiteur, le nombre de colonnes, le mode de regroupement et le nombre de tags qu'il vous faudra. Le chiffre que je vérifie à chaque fois, c'est **Octets par étiquette NFC**, la taille du plus gros message du lot. Comparez-le à vos tags. Un NTAG213 contient 144 octets, un NTAG215 504 et un NTAG216 888. Un lien court pèse une cinquantaine d'octets, donc les tags les moins chers suffisent pour des liens. Un record Wi-Fi ou une fiche de contact un peu longue réclame un 215 ou un 216. Si vous ne savez pas quelle puce vous avez, jetez un œil à mon [guide des types de tags NFC](/blog/nfc-tag-types-for-iphones/).

Ouvrez **Aperçu des lots** pour voir chaque tag avec les records qu'il recevra. Ce que vous voyez là est exactement ce qui sera écrit.

---

## Étape 5 : écrire toute la pile

Appuyez sur **Commencer l'écriture** et présentez le premier tag contre le bord supérieur de votre iPhone. Quand le téléphone vibre, le tag est écrit et vous passez au suivant. La ligne que vous venez d'écrire disparaît de la liste, et le compteur vous dit combien il en reste.

Quelques situations que vous rencontrerez, et qui sont parfaitement normales :

- **La feuille de scan disparaît au bout de 60 secondes.** C'est une limite d'iOS, pas un plantage. Elle revient d'elle-même après quelques secondes et vous reprenez là où vous en étiez.
- **Un tag échoue.** Peut-être qu'il était verrouillé, peut-être que vous l'avez retiré trop tôt. La ligne reste dans le fichier, l'app ne passe pas à la suivante, et vous présentez le tag une nouvelle fois ou en prenez un autre.
- **Vous devez vous interrompre.** Fermez l'app, faites autre chose, revenez demain. Le fichier garde en mémoire ce qu'il reste. Sur Android, l'app affiche le lot inachevé et propose de le reprendre.

Une fois dans le rythme, une centaine de tags, ça va vite.

---

## Ce que des centaines de tags m'ont appris

**Commencez par deux tags.** Relisez-les ensuite avec l'app et vérifiez que le tag fait bien ce qu'il doit. Écrivez le reste seulement après.

**Inutile de prendre la plus grosse puce.** Pour des liens, un NTAG213 suffit, et en grande quantité la différence de prix se voit. Gardez les NTAG216 pour les fiches de contact et le Wi-Fi.

**Verrouillez ou protégez par mot de passe les tags que vous donnez.** Juste à côté de l'écriture par lots CSV, vous trouverez les modes Verrouillage par lots et Protection par mot de passe en lot. Le verrouillage passe un tag en lecture seule pour de bon. Le mot de passe vous laisse le modifier plus tard, mais à vous seul. Pour les tags qui quittent vos mains, repassez ensuite toute la pile dans l'un des deux, pour que personne ne puisse en écraser le contenu.

L'écriture par lots CSV se trouve dans [NFC.cool Tools sur iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-batch-write-nfc-tags-csv-fr&mt=8) et sur [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-batch-write-nfc-tags-csv-fr). Et si vous me croisez dans une conférence ou un meetup, demandez-moi un tag.
