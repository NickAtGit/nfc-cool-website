---
id: "ios-shortcuts-nfc-tap-counter-2026-05"
title: "Analyser les données du Tap Counter NFC avec Raccourcis iOS"
date: "2026-05-22"
tags: ["nfc-tags", "automation", "iphone"]
summary: "Des raccourcis iOS prêts à l'emploi qui analysent l'identifiant de tag et le nombre de scans du Tap Counter NFC - un analyseur réutilisable, et une démo d'alerte de tag qui s'en sert."
image: "/assets/images/Blog/ios-shortcuts-nfc-tap-counter.webp"
imageAlt: "Un iPhone affichant une alerte avec un identifiant de tag et un nombre de scans après le toucher d'un autocollant NFC"
author: "Nicolo Stanciu"
metaTitle: "Analyser les données du Tap Counter NFC avec Raccourcis iOS"
metaDescription: "Un raccourci iOS réutilisable qui analyse les charges utiles du Tap Counter NFC - identifiant de tag et nombre de scans - avec une démo d'alerte de tag. Liens iCloud prêts à l'emploi, sans configuration, prêts à personnaliser."
ogTitle: "Analyser les données du Tap Counter NFC avec Raccourcis iOS"
ogDescription: "Des raccourcis iOS prêts à l'emploi pour le Tap Counter NFC : un analyseur réutilisable et une démo d'alerte de tag."
---

Il y a une semaine, j'ai [expliqué en détail comment fonctionne le Tap Counter NFC](/blog/count-nfc-tag-scans/) : la puce compte ses propres scans, l'app insère des octets réservés, et le tag substitue le compteur en direct et l'identifiant du tag dans ce qu'il transporte, à chaque toucher. Cet article s'arrête là où le tag s'arrête, c'est-à-dire au moment où les valeurs arrivent sur votre téléphone.

La question qu'on me pose depuis est la suite logique : « super, le tag me donne `049F50824F1390x000007` - et maintenant ? » Si vous êtes sur iPhone et que vous voulez agir sur ces valeurs à l'intérieur d'un raccourci, vous devez les analyser. C'est un petit travail de manipulation de chaînes, minutieux, et je préfère vous éviter d'avoir à l'écrire vous-même.

Alors j'ai créé deux raccourcis et je les partage sous forme de liens iCloud. L'un est le cerveau. L'autre est une démo qui utilise le cerveau.

---

## Ce que le tag vous donne

Avant les raccourcis : un rapide rappel de ce qu'ils reçoivent réellement, parce que ça compte pour la façon dont vous les utilisez.

Dans l'écran de configuration du Tap Counter, vous choisissez un type de contenu pour le tag : URL, Email, SMS ou Shortcut. Quand vous activez les options Tap Counter et / ou Tag ID, l'app insère des octets réservés dans ce contenu, et la puce les remplace par les valeurs en direct à chaque lecture. Avec `049F50824F1390` comme identifiant de tag et `000007` comme compteur, les quatre types de contenu ressemblent à ceci :

- **URL :** `https://nfc.cool/tap-counter/` devient [`https://nfc.cool/tap-counter/?nfc=049F50824F1390x000007`](https://nfc.cool/tap-counter/?nfc=049F50824F1390x000007)
- **Corps de l'e-mail :** `Hi, here's my card.` devient `Hi, here's my card. 049F50824F1390x000007`
- **Corps du SMS :** `Order confirmed!` devient `Order confirmed! 049F50824F1390x000007`
- **Entrée du raccourci :** `log-entry` devient `log-entry 049F50824F1390x000007`

L'URL ci-dessus est bien réelle. Notre [page de test du compteur de scans en direct](/tap-counter/) est configurée pour lire la valeur `?nfc=` directement dans sa propre barre d'adresse. Donc si vous voulez voir la substitution se produire avant d'écrire votre propre automatisation, écrivez un tag pointant vers `https://nfc.cool/tap-counter/` avec les deux options activées, touchez-le, et la page vous montrera l'identifiant du tag et le compteur qu'elle vient de recevoir.

Quand le type de contenu est **Shortcut**, NFC.cool lance le raccourci choisi via `shortcuts://run-shortcut?name=Your%20Shortcut&input=text&text=<payload>`, avec les valeurs NFC ajoutées déjà présentes dans le texte. L'entrée de votre raccourci est une simple chaîne de texte. Votre seul travail est d'en extraire l'identifiant du tag et le compteur.

Selon les options activées au moment où vous avez écrit le tag, vous obtiendrez soit le motif complet (14 caractères hexadécimaux, un `x`, puis 6 caractères hexadécimaux), soit seulement l'identifiant de tag de 14 hex, soit seulement le compteur de 6 hex. L'analyseur gère les trois cas.

---

## Parse NFC Tap Counter - l'analyseur réutilisable

[Installer Parse NFC Tap Counter](https://www.icloud.com/shortcuts/4c70ab3ade1a4398bb6a39edba94bf26)

Celui-ci, c'est le cerveau. Il n'a aucune interface, prend une seule entrée texte, et renvoie un Dictionary. C'est délibéré : un raccourci utilitaire sans interface s'intègre proprement dans tout ce que vous construisez, et un Dictionary est la chose la plus simple à consommer depuis un autre raccourci avec l'action **Get Dictionary Value**.

Voici ce que contient le Dictionary :

- `tagID` - l'identifiant de tag hexadécimal de 14 caractères, ou une chaîne vide si l'option était désactivée.
- `count` - le nombre de scans sous forme de nombre décimal (donc `000007` ressort en `7`, et `00000A` en `10`), ou vide si l'option était désactivée.
- `countHex` - le compteur hexadécimal d'origine de 6 caractères, au cas où vous voudriez l'utiliser tel quel. Vide s'il est absent.
- `hasTagID`, `hasCount` - des booléens pour les embranchements, pour que vous puissiez écrire **If hasCount is true** sans avoir à tester la chaîne vous-même.
- `content` - l'entrée débarrassée proprement de la charge utile NFC, pour que le reste de votre raccourci voie l'entrée telle qu'elle était avant que le tag ne l'habille. Si l'entrée était une URL avec `?nfc=...`, vous récupérez l'URL sans ça. Si c'était un corps d'e-mail avec l'identifiant de tag ajouté, vous récupérez le corps sans ça.
- `raw` - l'entrée d'origine non modifiée, au cas où vous voudriez la journaliser ou vous rabattre dessus.

Pour l'appeler depuis votre propre raccourci, la recette tient en trois actions :

1. **Receive Shortcut Input** en texte (la charge utile NFC arrive ici).
2. **Run Shortcut** -> Parse NFC Tap Counter, avec ce texte en entrée. Désactivez « Show When Run » pour qu'il reste invisible.
3. **Get Dictionary Value** -> choisissez `tagID`, `count`, `content`, ou les clés qui vous intéressent.

C'est tout. À partir de l'étape 3, vous pouvez faire ce que vous voulez des valeurs : créer un embranchement sur `hasTagID`, journaliser `count` dans une note, déclencher un webhook avec le JSON, n'importe quoi. L'analyseur ne présume pas de ce que votre raccourci veut faire du résultat, et c'est précisément pour ça qu'il est petit et réutilisable.

Une précision sur le compteur : c'est un vrai Number dans le Dictionary, pas une chaîne de texte, donc vous pouvez l'injecter directement dans une comparaison **Calculate** ou **If** sans le reconvertir. L'étape hexadécimal-vers-décimal est déjà faite.

---

## NFC Tag Alert - la démo

[Installer NFC Tag Alert](https://www.icloud.com/shortcuts/f78b78c917a2417385ae25711a3e877a)

Celle-ci est une démo que j'installerais quand même dès le premier jour, même si vous n'avez aucune intention d'utiliser des alertes en production. Elle prend une entrée texte Shortcut Input, lance l'analyseur, et affiche une seule alerte intitulée **NFC Tag Scanned** avec deux lignes :

```
Tag ID: 049F50824F1390
Scans: 7
```

La raison pour laquelle je l'installerais en premier, c'est que c'est la vérification la plus rapide possible pour un tag avec compteur activé. Écrivez un tag depuis NFC.cool Tools avec le type de contenu **Shortcut** et le nom **NFC Tag Alert**, activez les options Tap Counter et Tag ID, écrivez-le, touchez-le. Une alerte apparaît avec les vraies valeurs de votre tag physique.

Si l'alerte affiche les valeurs attendues, votre tag fait son travail et vous pouvez passer à quelque chose de plus élaboré. Si le compteur est faux ou que l'identifiant du tag manque, vous savez que c'est le tag (ou les options que vous avez choisies en l'écrivant) et pas votre propre raccourci. Éliminer toute une catégorie de débogage du type « est-ce seulement la faute de la puce ? » vaut bien l'installation d'un raccourci de cinq actions.

Si vous vous demandez un jour comment appeler l'analyseur correctement, ce raccourci est aussi le plus petit exemple concret possible. Ouvrez-le, regardez les cinq actions, copiez la structure dans votre propre raccourci.

---

## L'intégrer à votre propre raccourci

Il y a deux façons d'acheminer le contenu d'un tag vers votre raccourci. L'analyseur s'accommode des deux.

**Piloté par le tag (la charge utile Shortcut).** Écrivez le tag avec le type de contenu **Shortcut**, choisissez votre raccourci par son nom, activez les options que vous voulez. Désormais, chaque toucher lance votre raccourci avec la charge utile NFC déjà dans l'entrée. Dans votre raccourci, appelez Parse NFC Tap Counter sur cette entrée et vous avez `tagID` / `count` prêts à l'emploi.

**Piloté par l'URL (la charge utile URL).** C'est le cas le plus courant. Le tag porte une URL, votre téléphone ouvre cette URL au toucher, et le compteur voyage avec, sous la forme `?nfc=...`. Si vous voulez qu'un raccourci gère le toucher à la place d'un navigateur (ou en plus), c'est possible : faites passer l'URL par un raccourci qui prend en entrée une page web Safari, puis lancez Parse NFC Tap Counter sur l'URL. L'analyseur retire proprement le segment `?nfc=` et vous rend l'URL sans lui dans `content`, pour que vous puissiez la transmettre à un navigateur, à un appel d'API, ou à tout autre endroit qui attend une URL simple.

Voici un exemple en quatre actions pour « journaliser chaque scan dans une note dans Apple Notes » :

1. **Receive Shortcut Input** en texte.
2. **Run Shortcut** -> Parse NFC Tap Counter, avec l'entrée en texte.
3. **Get Dictionary Value** -> trois recherches à la suite pour `tagID`, `count` et `content`. Stockez chacune dans une variable.
4. **Append to Note** -> une seule ligne du type `[Current Date] tag=<tagID> count=<count> url=<content>`.

Vous avez maintenant un journal des touchers, tenu à jour par le tag lui-même. Pas de backend, pas de statistiques tierces, aucun compte nulle part.

---

## Quelques idées à développer

Une poignée de petites choses que l'analyseur rend possibles, notées ici pour que vous n'ayez pas à les inventer de zéro :

- **Créez un embranchement sur l'identifiant du tag.** Un seul raccourci, plein de tags. Ajoutez une action **If** par identifiant de tag connu : si le tag de la porte du bureau a été scanné, coupez les notifications ; si le tag du studio a été scanné, activez un mode de concentration ; si le tag de la cuisine a été scanné, lancez un minuteur. L'identifiant du tag identifie le tag physique, pas le contenu, donc vous pouvez donner la même URL à chaque tag et réagir quand même à chacun individuellement.
- **Désignez un gagnant au scan N.** Combinez `hasCount` avec une comparaison. Si `count` vaut 100, déclenchez un message de confirmation ; pour tous les autres scans, appliquez le traitement habituel. La puce garantit l'ordre ; votre raccourci se contente de le lire.
- **Envoyez vers un webhook.** Associez ça à la [fonctionnalité Webhooks](/features/webhooks/) de NFC.cool si vous voulez un traitement côté serveur sans écrire d'app iOS : envoyez les valeurs analysées en JSON, et laissez le serveur prendre le relais. Deux actions iOS et votre tag est relié à tout ce qui parle HTTP.
- **Journalisez dans un fichier ou une note.** La plus simple, et étonnamment utile. Ajoutez `timestamp, tagID, count` à un fichier tenu à jour dans iCloud Drive ou à une seule note, et vous avez un journal des touchers que vous pourrez parcourir ou représenter sous forme de graphique plus tard. Pratique pour suivre l'engagement sur un tag unique sans monter d'infrastructure.

Si vous construisez quelque chose de chouette avec ça, j'aimerais vraiment le voir.

---

## Un petit merci

Ces deux raccourcis ont été construits avec [Shortcuts Playground](https://github.com/viticci/shortcuts-playground-plugin), le plug-in de Federico Viticci pour générer des raccourcis iOS à partir du langage naturel. C'est un excellent outil, et je tiens à le remercier de l'avoir publié - sans lui, ces deux-là m'auraient pris bien plus de temps à assembler.

---

## Un petit mot pour Android

Raccourcis est une app Apple, donc ces deux-là ne tournent que sur iPhone. La fonctionnalité Tap Counter, elle, fonctionne sur les deux plateformes, parce que la substitution se produit à l'intérieur de la puce et se moque de savoir quel téléphone lit le tag. Sur Android, les types de charge utile URL, Email et SMS se comportent exactement comme sur iOS ; si vous voulez des automatisations similaires là-bas, des apps comme Tasker ou MacroDroid peuvent prendre une URL avec `?nfc=...` et en extraire les valeurs avec leurs propres actions de manipulation de chaînes. Le format transmis est le même.

---

## Essayez-le

Si vous voulez l'explication détaillée du fonctionnement réel du Tap Counter sous le capot, c'est dans l'[article précédent](/blog/count-nfc-tag-scans/). Et si vous voulez voir un tag avec compteur activé en action sans configurer d'abord votre propre automatisation, notre page de [démo du compteur de scans en direct](/tap-counter/) lit la valeur `?nfc=` directement dans sa propre URL : écrivez un tag qui pointe dessus, touchez-le, et regardez le compteur et l'identifiant du tag apparaître.

La fonctionnalité Tap Counter NFC vit dans NFC.cool Tools, sur [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ios-shortcuts-nfc-tap-counter-fr&mt=8) et [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ios-shortcuts-nfc-tap-counter-fr). Pour l'ensemble des outils que j'ai construits autour du NFC, jetez un œil à la [fonctionnalité de lecture et d'écriture NFC](/features/nfc-reader-writer/).
