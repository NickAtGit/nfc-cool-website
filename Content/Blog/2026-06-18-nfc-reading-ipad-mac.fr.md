---
id: "nfc-reading-ipad-mac-2026-06"
title: "Comment NFC.cool lit les tags NFC sur iPad et Mac"
date: "2026-06-18"
tags: ["announcements", "nfc-tags"]
summary: "Les iPad et les Mac n'ont pas de puce NFC, alors j'ai toujours dit qu'ils ne pouvaient pas lire les tags NFC. Avec un lecteur USB externe, la version 6.15.0 change la donne - voici comment ça marche, et d'où ça vient."
image: "/assets/images/Blog/nfc-ipad-mac-external-reader.webp"
imageAlt: "Un iPad à côté d'un lecteur NFC USB HID OMNIKEY avec un tag posé dessus"
author: "Nicolo Stanciu"
metaTitle: "Comment NFC.cool lit les tags NFC sur iPad et Mac"
metaDescription: "Les iPad et les Mac n'ont pas de radio NFC, ils ne pouvaient donc pas lire les tags NFC. Dans NFC.cool 6.15.0, un lecteur USB externe change ça sur iPad et Mac. Voici comment ça marche."
ogTitle: "La lecture des tags NFC arrive sur iPad et Mac"
ogDescription: "Pas de puce NFC dans votre iPad ou votre Mac ? Avec un lecteur USB externe, NFC.cool 6.15.0 y lit et écrit aussi des tags - avec les limites, en toute honnêteté."
---
L'an dernier, j'étais à Bologne pour [PragmaConf 2025](https://pragmaconference.com). C'était ma première fois à cette conférence, et, il s'est avéré, aussi ma dernière - les organisateurs ne peuvent pas la maintenir, alors l'édition à laquelle je suis allé était la toute dernière. J'en suis encore un peu triste.

Là-bas, j'ai discuté avec [Alexander Manzer](https://www.linkedin.com/in/alexander-manzer), un autre développeur iOS et NFC. À un moment, la conversation a dérivé vers un problème que j'avais classé depuis longtemps sous « impossible » : lire des tags NFC sur un iPad. Les iPad n'ont pas de puce NFC, donc j'avais toujours dit aux gens que ça ne pouvait tout simplement pas se faire. Alexander m'a dit que si - avec le bon lecteur externe - et m'a proposé de m'envoyer un petit bout de code pour démarrer. Il l'a fait, quelques jours plus tard. C'est grâce à cet extrait que NFC.cool peut maintenant lire des tags NFC sur iPad et Mac.

---

## Je vous avais dit que ça ne marcherait pas

En mai dernier, [quand NFC.cool est arrivé sur Mac](/blog/nfc-cool-comes-to-mac/), j'ai écrit toute une section sur ce que le Mac ne sait pas faire, et j'ai mis le scan NFC tout en haut. Mon raisonnement était simple : les Mac n'ont pas de radio NFC, les iPad n'ont pas de radio NFC, et c'est une limite matérielle qu'aucune de mes mises à jour logicielles ne peut corriger.

Cette partie est toujours vraie - pour la puce intégrée à l'appareil. Ce que j'avais raté, c'est qu'on n'est pas obligé d'utiliser la puce intégrée. On peut en brancher une.

---

## Comment ça marche sans puce NFC

L'astuce, c'est un lecteur NFC USB externe. Vous le connectez à votre iPad ou à votre Mac, et NFC.cool communique directement avec lui. Aucun pilote à installer : ça fonctionne grâce à la prise en charge des cartes à puce qu'Apple intègre déjà dans iPadOS et macOS, donc dès que vous branchez le lecteur sur le port USB-C, l'app le détecte et bascule dessus toute seule.

L'app privilégie un lecteur externe dès qu'il y en a un de branché. Sur un iPad ou un Mac, ce lecteur est le seul matériel NFC en jeu, il n'y a donc rien à décider. Sur un iPhone, ça devient un choix que l'app fait à votre place : branchez un lecteur et NFC.cool s'en sert, laissez-le débranché et le téléphone se rabat sur son propre NFC intégré. Vous ne modifiez aucun réglage, et vous ne choisissez aucun mode - l'app détermine le matériel dont elle dispose et agit en conséquence.

Le lecteur autour duquel j'ai construit tout ça, et le seul que j'ai réellement testé, c'est le HID OMNIKEY 5022 CL. D'autres lecteurs USB peuvent fonctionner, mais je ne peux pas le garantir, parce que je n'ai vérifié l'expérience de bout en bout qu'avec celui-là. Si vous essayez un autre lecteur, j'ai vraiment envie de savoir ce que ça donne : [dites-moi](/contact/) si ça a marché ou là où ça a coincé, et j'intégrerai ce que j'apprends dans l'app et dans cet article.

---

## Ce que vous pouvez en faire

Presque tout ce que vous feriez sur un iPhone. Vous pouvez lire des tags et vider l'intégralité de leur mémoire, écrire des messages NDEF, et lancer des traitements par lots qui lisent ou écrivent toute une pile de tags les uns après les autres. La protection des tags par mot de passe fonctionne. Tout comme [OpenPrintTag](/blog/openprinttag-read-write-nfc-spools-phone/), le format des bobines de filament pour imprimante 3D, dans les deux sens. Et oui, la [réinitialisation des têtes de brosse Philips Sonicare](/blog/reset-sonicare-brush-head-nfc/) fonctionne aussi.

Cette dernière, c'était la partie difficile. Réinitialiser une tête Sonicare consiste à lire un compteur sur le tag puis à réécrire sur une page protégée par mot de passe, et le tag n'accepte cette écriture que s'il vous considère toujours comme authentifié depuis un instant plus tôt. Via un lecteur externe, ça voulait dire garder une seule session ouverte avec le lecteur pendant les deux étapes, au lieu de la laisser se fermer entre les deux. Une fois que ça a tenu, les opérations qui en dépendent - les écritures protégées, la réinitialisation de la brosse - se sont mises à se comporter comme sur un téléphone.

---

## Les limites, en toute honnêteté

Deux ou trois choses ne sont pas encore là, et je préfère vous le dire plutôt que vous laisser le découvrir.

- Le OMNIKEY 5022 CL est le seul lecteur que j'ai testé. Un autre vous place en terrain non vérifié.
- Les tags MIFARE Classic sont en lecture seule via le lecteur. Vous pouvez les lire, pas les écrire.

Aucune de ces limites ne gêne l'usage qu'en feront la plupart des gens, mais elles sont réelles, et c'est le genre de chose que je voudrais savoir avant d'acheter un lecteur.

---

## Merci, Alexander

Je tiens à être clair sur l'origine de tout ça. Je ne me suis pas assis pour l'inventer - Alexander m'a tendu le fil et je l'ai tiré. Il n'était pas obligé de partager ce code, et je lui suis reconnaissant de l'avoir fait. Une partie de la raison pour laquelle je m'y suis autant accroché ensuite est simple : je voulais que NFC.cool soit la première app iPad capable de lire réellement un tag NFC. Qu'elle se révèle être la toute première ou non, le jeu en valait la chandelle.

La lecture des tags NFC sur iPad et Mac arrive dans NFC.cool 6.15.0. Si vous avez un iPad ou un Mac, un lecteur pris en charge, et un tag que vous n'aviez jamais pu scanner depuis votre bureau, ça marchera, tout simplement.

Besoin du lecteur ? Voici le HID OMNIKEY 5022 CL sur [Amazon US](https://amzn.to/4rq6gCj) et [Amazon Europe](https://amzn.to/483UyEp). Ce sont des liens affiliés : si vous achetez via l'un d'eux, je peux toucher une petite commission sans surcoût pour vous, et ça aide à financer le travail sur NFC.cool.

[Téléchargez NFC.cool Tools pour iPhone, iPad et Mac](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-reading-ipad-mac-fr&mt=8)

Et si vous étiez à cette dernière PragmaConf à Bologne : merci pour ce bon moment. J'aurais aimé qu'il y en ait une autre.
