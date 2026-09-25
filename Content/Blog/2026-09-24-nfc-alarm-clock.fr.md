---
id: "nfc-alarm-2026-09"
title: "Réveil NFC pour iPhone : scannez vos tags pour couper l'alarme"
date: "2026-09-24"
tags: ["announcements", "iphone", "nfc-tags"]
summary: "À force de coder tard le soir, je perdais chaque matin mon duel contre le bouton Répéter. Alors j'ai intégré Alarme NFC à NFC.cool Tools : une alarme iPhone qui ne se tait qu'une fois que vous avez fait le tour de vos tags NFC dans la maison. Voici comment elle fonctionne, et comment j'ai contourné le bouton Arrêter qu'Apple impose sur chaque alarme."
image: "/assets/images/Blog/nfc-alarm-clock.webp"
imageAlt: "Un iPhone affichant un anneau de scan d'alarme à 2 sur 3 à côté d'une machine à café munie d'un autocollant NFC, avec un chemin pointillé de tags NFC qui repasse par une étagère du couloir jusqu'au lit"
author: "Nicolo Stanciu"
metaTitle: "Réveil NFC pour iPhone : scannez vos tags pour l'arrêter"
metaDescription: "Une alarme iPhone qui ne s'arrête qu'une fois vos tags NFC scannés dans l'ordre. Comment j'ai créé Alarme NFC avec AlarmKit et déjoué le bouton Arrêter."
ogTitle: "Un réveil qu'on ne peut pas repousser"
ogDescription: "Alarme NFC ne se tait qu'une fois que vous avez fait le tour de vos tags NFC dans la maison. Voici comment ça marche sur iPhone."
---
Quand on est développeur indépendant, on vit à un rythme qui se moque des horaires de bureau. Le meilleur code s'écrit tard, quand les messages se calment et que la maison est silencieuse, et sans que je m'en rende compte il est deux heures du matin. Le réveil, lui, sonne évidemment à la même heure que d'habitude. Et j'appuie sur Répéter. Puis je recommence. Puis une troisième fois, jusqu'à ce que la matinée que j'avais prévue soit à moitié envolée.

J'ai longtemps réfléchi à ce que je pouvais vraiment y faire. Un réveil plus fort ? J'apprendrais vite à ne plus l'entendre. Poser le téléphone à l'autre bout de la pièce ? Je me lèverais, j'appuierais sur Arrêter et je retournerais sous la couette. Le problème n'a jamais été d'entendre le réveil. Le problème, c'est qu'il suffisait d'un geste pour l'arrêter, sans même avoir à réfléchir.

Et puis l'idée m'est venue : je passe mes journées à développer une app pour les tags NFC. Pourquoi ne pas marier les deux, et semer dans la maison un parcours de tags que je dois suivre chaque matin avant que le réveil me laisse tranquille ?

C'est ça, **Alarme NFC**, et elle fait désormais partie de NFC.cool Tools sur iPhone. La version Android arrive bientôt.

---

## Un parcours du lit jusqu'à la machine à café

Mon parcours compte trois étapes. Le premier tag est à côté de mon lit. Le deuxième est posé sur une étagère du couloir. Le troisième est collé sur la machine à café.

Quand le réveil sonne, je dois scanner les trois, et dans cet ordre. Le tag près du lit, c'est facile, il est à portée de main. Mais ensuite je dois me lever et aller jusqu'au couloir, et une fois devant la machine à café, je suis debout, bien réveillé, pile à l'endroit où ma journée commence. Retourner me coucher à ce stade aurait quelque chose de ridicule. Autant lancer un café.

L'ordre compte. Si l'on pouvait scanner les tags dans n'importe quel ordre, il suffirait de les garder tous les trois sur la table de nuit pour s'en débarrasser sans bouger. L'app attend donc le tag suivant du parcours, et si vous présentez le mauvais, elle vous le fait savoir : « Ce n'est pas Couloir ». Une fois le dernier tag scanné, vous avez droit à quelques confettis, à un « Bonjour », et l'alarme se tait pour la journée. Le lendemain, elle sonne de nouveau comme prévu.

Et oui, ça marche. Ce parcours me sort du lit, ce qu'aucun de mes réveils précédents n'avait jamais vraiment réussi.

---

## Le bouton Arrêter que je ne pouvais pas supprimer

C'est la partie qui m'a demandé le plus de réflexion. Alarme NFC repose sur **AlarmKit**, le framework d'Apple qui permet aux apps de déclencher une vraie alarme, du genre qui sonne même en mode silencieux et occupe tout l'écran verrouillé comme celle de l'app Horloge. C'est exactement ce qu'il faut à une app de réveil, à un détail près : chaque alarme AlarmKit s'accompagne d'un bouton **Arrêter** dessiné par le système. Une app ne peut ni le supprimer, ni le masquer, ni en changer l'apparence.

Sur le papier, une alarme censée vous obliger à aller jusqu'à vos tags arrive donc avec un bouton qui la coupe d'un seul geste. Pas idéal.

Ma parade : une Alarme NFC n'est pas une seule alarme, c'est toute une série. Derrière l'heure que vous réglez, l'app programme des relances à quelques minutes d'intervalle. Par défaut, il y en a 20 de plus, espacées d'une minute, et vous pouvez choisir 5, 10, 15 ou 20 relances avec un intervalle de 1, 2, 3 ou 5 minutes. Appuyer sur Arrêter sur l'écran verrouillé ne fait taire que celle qui sonne à ce moment-là. Une minute plus tard, la suivante se déclenche. Seul un parcours complet annule les relances restantes de la matinée, et l'alarme, elle, reste réglée pour le lendemain.

Le bouton Arrêter n'est au fond qu'un bouton sourdine, avec une pile qui ne tient qu'une minute.

À côté du bouton Arrêter, AlarmKit laisse à l'app un seul bouton bien à elle. La plupart des apps de réveil y mettraient une fonction Répéter. Moi, j'y ai mis **Scanner pour arrêter**, qui ouvre l'app directement sur l'écran de scan. Il n'y a donc aucun bouton Répéter sur l'écran verrouillé, et c'est voulu.

Deux petits détails qui me sont venus en jouant moi-même le cobaye :

- Pendant que vous scannez, la sonnerie se met en pause. Personne n'a envie d'une alarme qui lui hurle dans la main pendant qu'il vise un tag avec son téléphone. En revanche, si vous abandonnez en cours de route, la relance suivante sonnera quand même.
- Tant que l'alarme sonne, l'app refuse que vous la désactiviez, la supprimiez ou la modifiiez depuis la liste des alarmes. Ces failles, je les ai trouvées de la meilleure façon qui soit : à 7 heures du matin, épuisé mais d'une inventivité redoutable.

---

## La sortie de secours

Un tag, ça se perd. Un autocollant se décolle de la machine à café, un tag rend l'âme, ou vous dormez ailleurs pour une nuit. Une alarme impossible à arrêter serait une très mauvaise idée, c'est pourquoi l'écran de scan propose un **Arrêt d'urgence**, qui fonctionne toujours, avec ou sans tags.

En échange, il vous demande de taper cette phrase, mot pour mot :

« Arrête maintenant, je sais que je dois reconfigurer tous mes tags. »

C'est voulu. Je voulais que cette porte de sortie prenne à peu près autant de temps que le parcours lui-même, pour qu'elle ne soit jamais la solution de facilité. Et elle a un vrai prix : l'arrêt d'urgence coupe et supprime *toutes* vos alarmes, si bien qu'ensuite il ne vous reste plus qu'à reconfigurer tous vos tags. Elle est là pour le jour où quelque chose est vraiment cassé, pas pour un mardi où la couette est particulièrement douillette. Je l'ai conçue pour me punir moi-même, et elle fait très bien son travail.

---

## Pourquoi le NFC, et pas une photo du lavabo

Il existe des apps de réveil qui vous demandent de photographier votre lavabo ou de scanner le code-barres de votre tube de dentifrice. Ça marche. Mais pour ce genre de chose, je préfère le NFC, et pas seulement parce que c'est dans le nom de mon app.

Un tag NFC, à lui seul, ne fait rien. C'est une minuscule puce posée sur une étagère, avec un identifiant et rien d'autre. Ce que j'aime le plus en développant NFC.cool, c'est justement de donner un sens à ce petit bout de métal : transformer un autocollant qui coûte quelques centimes en quelque chose d'utile au quotidien. Avec Alarme NFC, le tag n'a même pas besoin de contenir quoi que ce soit. L'app reconnaît chaque tag à l'identifiant de sa puce, et rien n'y est écrit. N'importe quel tag fait l'affaire, y compris le paquet d'autocollants qui traîne au fond d'un tiroir. Et la lumière ne compte pas : un tag se scanne très bien dans un couloir plongé dans le noir, là où un appareil photo aurait du mal, et il n'y a rien à viser.

Si vous n'avez pas encore de tags, mon [guide du débutant sur les tags NFC](/blog/nfc-tags-beginners-guide/) vous explique lesquels acheter.

---

## La mise en place

Alarme NFC nécessite un iPhone sous iOS 26 ou plus récent, puisque c'est là qu'AlarmKit a fait son apparition. Vous la trouverez dans l'onglet NFC, sous **Applications NFC**. Créez une alarme, choisissez l'heure et les jours, puis scannez vos tags dans l'ordre où vous comptez les parcourir. Vous pouvez donner un nom à chaque tag pour savoir lequel vient ensuite. Placez-les sur un trajet qui vous fait vraiment sortir du lit : commencer à côté du lit, c'est bien, finir dans la cuisine, c'est encore mieux.

Alarme NFC est gratuite, et vous la trouverez dans [NFC.cool Tools sur l'App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-alarm-clock-fr&mt=8). Votre machine à café vous attend.
