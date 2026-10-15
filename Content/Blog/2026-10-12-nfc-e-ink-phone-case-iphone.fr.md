---
id: "e-ink-phone-case-2026-10"
title: "J'ai hacké ma coque e-ink pour que mon iPhone puisse écrire dessus"
date: "2026-10-12"
tags: ["announcements", "iphone", "nfc-tags"]
summary: "J'ai une de ces coques de téléphone NFC à écran e-ink, sans batterie, et l'app fournie avec ne me plaisait pas. Alors j'ai décortiqué la façon dont elle communique, et NFC.cool Tools 7.2.0 sait désormais afficher des photos, des codes QR, votre prochain événement, l'agenda du jour et vos rappels sur les coques qui utilisent l'app DeerPhoneCase, KAZAVA, Novixand ou TYOHINN."
image: "/assets/images/Blog/nfc-e-ink-phone-case-iphone.webp"
imageAlt: "Un iPhone dans une coque noire dont le dos est un écran e-ink affichant un soleil rouge et jaune au-dessus de collines noires, à côté d'un second iPhone qui envoie la même image en NFC"
author: "Nicolo Stanciu"
metaTitle: "Coque NFC e-ink sur iPhone : photos, agenda et codes QR"
metaDescription: "Affichez photos, codes QR, agenda et rappels sur une coque NFC e-ink sans batterie, depuis votre iPhone. Compatible avec les coques DeerPhoneCase, KAZAVA, Novixand et TYOHINN."
ogTitle: "J'ai hacké ma coque e-ink pour que mon iPhone puisse écrire dessus"
ogDescription: "Comment j'ai percé les secrets d'une coque NFC e-ink sans batterie, et ce que NFC.cool sait désormais afficher sur son écran."
---

L'écran a clignoté.

Trois fois rien. Un écran e-ink le fait à chaque rafraîchissement : un bref défilé de couleurs avant que la nouvelle image ne se fixe. Mais ce clignotement-là venait d'un code que j'avais écrit moi-même, envoyé depuis mon iPhone dans le dos d'une coque qui n'a pas de batterie. Quelques secondes plus tard, tout l'écran était d'un rouge uni, avec ce léger grain de papier. Rien d'autre. Juste du rouge.

J'ai développé beaucoup de fonctions NFC au fil des années, et ce simple rectangle rouge reste l'un de mes souvenirs préférés.

---

## Un écran sans batterie

<figure class="phone-figure" data-layout="float" data-device="einkcase">
<ol>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-1-photo-480w.webp" alt="Le dos d'un iPhone dans une coque NFC à encre électronique orange, dont l'écran affiche la photo d'un golden retriever en quatre encres"><p><strong>Une photo.</strong> En noir, blanc, rouge et jaune, sans batterie dans la coque.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-2-qr-480w.webp" alt="L'écran à encre électronique de la coque avec un QR code pour nfc.cool"><p><strong>Un QR code.</strong> N'importe qui peut le scanner au dos de votre téléphone.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-3-event-480w.webp" alt="L'écran à encre électronique de la coque sur fond jaune : Next, Dinner with Mia, mer. 14 octobre, de 19 h 30 à 21 h 30, Trattoria Roma"><p><strong>Votre prochain événement.</strong> Un instantané de votre calendrier.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-4-today-480w.webp" alt="L'écran à encre électronique de la coque avec le mercredi 14 octobre : Gym, Team stand-up, Lunch with Alex, Dentist, Dinner with Mia"><p><strong>L'agenda du jour.</strong> Toute la journée, jusqu'au prochain design.</p></li>
</ol>
</figure>

Si vous n'avez jamais vu une de ces coques : on dirait une coque de téléphone ordinaire, sauf qu'une bonne partie du dos est un écran e-ink, le même type d'affichage que sur une liseuse. La mienne dessine avec quatre encres : noir, blanc, rouge et jaune.

Pas de batterie à l'intérieur, pas de port de charge. La coque tire son énergie du champ NFC de votre téléphone, celui-là même qui réveille un autocollant NFC quand vous le scannez. Tant que le téléphone est maintenu contre la coque, il alimente une petite puce et un microcontrôleur, qui redessinent l'écran. Une fois l'image en place, l'e-ink n'a plus besoin du moindre courant pour la garder. Elle reste là, même quand le téléphone est à plat ou que la coque dort au fond d'un tiroir.

Je la vois comme une sorte d'Écran magique que seul votre téléphone saurait secouer. Rien ne bouge tant que vous n'y reposez pas votre téléphone.

Ces coques sont vendues sous une foule de noms, et presque chaque marque a sa propre app. La mienne était livrée avec une app appelée **DeerPhoneCase**. Je reviens sur les autres plus bas.

---

## Pourquoi l'app officielle ne me suffisait pas

J'ai essayé tout un tas d'apps des fabricants avec ma coque, et beaucoup fonctionnent. Mais toutes sont vraiment pénibles à utiliser. Ce ne sont pas des apps iPhone natives, il faut se connecter à un compte pour faire presque tout, et au fond, afficher une image est leur seule ambition.

Quand je regardais cet écran au dos de mon téléphone, je n'y voyais pas un cadre photo. J'y voyais un petit écran toujours visible, qui ne consomme rien. L'endroit idéal pour ma prochaine réunion, l'agenda du jour, ou un code QR qu'on peut scanner directement au dos de mon téléphone. L'app officielle ne savait rien faire de tout ça, et moi, je développe une app entièrement consacrée au NFC. J'ai donc décidé d'apprendre moi-même à NFC.cool à dialoguer avec la coque.

---

## Dans les entrailles de la coque

Je m'y suis attelé avec Claude, le modèle d'IA d'Anthropic, qui s'est révélé d'une patience remarquable pour éplucher du code décompilé.

La première idée était la plus évidente : regarder comment l'app officielle pour iPhone s'adresse à la coque. Impasse. Les apps de l'App Store sont chiffrées, et il n'y avait rien d'exploitable à lire.

Côté Android, c'était une autre histoire. La coque est un produit en marque blanche : l'app du même fabricant existe donc aussi sur Google Play, sous son propre nom, et une app Android, ça se décompile. Nous l'avons désossée, et en croisant ce code avec ce que nous avons pu trouver en ligne sur la puce de la coque (une puce NFC de Fudan, avec un microcontrôleur derrière), tout le dialogue entre le téléphone et la coque s'est dévoilé :

1. Le téléphone et la coque commencent par une courte authentification, pour que la coque sache qu'elle a bien affaire à une vraie app.
2. Ensuite, chaque commande est chiffrée.
3. L'image voyage en 139 paquets de pixels bruts. Chaque pixel occupe deux bits, juste ce qu'il faut pour quatre encres.
4. Le téléphone demande à la coque de redessiner l'écran, puis lui demande chaque seconde si elle a terminé.

Mon premier test n'avait rien de subtil : une seule couleur sur tout l'écran. C'était le rectangle rouge.

---

## Le mur des 20 secondes

Puis je suis passé à de vraies images, et elles sont arrivées en piteux état. Des lignes en travers de l'écran, des couleurs fausses, une moitié de photo.

Le rafraîchissement prend environ 18 secondes, et la connexion tombait systématiquement aux alentours de la vingtième. Claude était convaincu qu'iOS met tout simplement fin à chaque session NFC au bout de 20 secondes, et qu'on n'y pouvait rien. Je n'y croyais pas, puisque l'app officielle y arrivait sur le même iPhone.

J'ai donc branché mon iPhone sur mon Mac et enregistré le journal système pendant que l'app officielle dessinait une image. L'astuce y apparaissait noir sur blanc : iOS limite chaque *connexion* à un tag à une vingtaine de secondes, mais pas la session entière. Juste après avoir envoyé l'image, l'app officielle coupe la connexion et se reconnecte un dixième de seconde plus tard, puis laisse la coque se redessiner sur cette nouvelle connexion, avec 20 bonnes secondes devant elle.

Dès que NFC.cool a fait pareil, les images sont sorties impeccables. J'avoue que je n'étais pas mécontent d'avoir eu raison sur ce coup-là.

---

## Ce que NFC.cool peut afficher sur votre coque

La fonction se trouve dans **NFC.cool Tools 7.2.0**, dans la section Applications NFC, sous le nom **Coque e-ink**. Vous choisissez un modèle, vous voyez un aperçu fidèle de ce que la coque affichera, vous retirez la coque de votre téléphone et vous maintenez votre iPhone contre son dos jusqu'à ce que la fenêtre NFC se referme.

- **Photo** : n'importe quelle image de votre photothèque, recadrée au format de l'écran. Ce modèle convertit votre photo dans les quatre encres, avec une accentuation des couleurs (Standard, Vif ou Max) et une option noir et blanc.
- **Détourage** : isole la personne, l'animal ou l'objet d'une photo et le place sur un fond de l'une des quatre encres.
- **Code QR** : n'importe quel code QR enregistré dans NFC.cool, avec son propre style, ou un texte que vous saisissez. Vous pouvez inverser les couleurs, et l'app vous prévient quand le texte est trop long pour que le code reste lisible sur un si petit écran.
- **Prochain événement**, ou **Événement choisi** pour un rendez-vous précis de votre calendrier.
- **Agenda du jour** : tout ce que contient votre calendrier aujourd'hui.
- **Rappels** : les rappels en cours de l'une de vos listes, en trois tailles de texte.

Les modèles de calendrier et de rappels sont des instantanés. La coque montre ce qui était à jour au moment de l'envoi, et le garde jusqu'au suivant. Elle ne peut pas se mettre à jour sans votre téléphone : c'est le prix à payer pour ne jamais avoir besoin d'un chargeur.

<figure class="phone-figure" data-layout="stage">
<figcaption>Les designs pour la coque</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/1-designs-440w.webp" alt="L'écran E-ink case de NFC.cool Tools, avec les designs Photo, QR code et Calendar and Reminders"><p><strong>E-ink case.</strong> Dans NFC Apps. Choisissez un design, puis appuyez sur Put on case.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/2-photo-440w.webp" alt="Le design Photo : un coucher de soleil sur des collines dans les quatre encres de la coque, avec Crop et un réglage de luminosité"><p><strong>Photo.</strong> N'importe quelle image, convertie dans les quatre encres de la coque.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/3-qr-code-440w.webp" alt="Le design QR code, avec un QR code enregistré dans les encres de la coque"><p><strong>QR code.</strong> Un code enregistré dans NFC.cool, ou un que vous saisissez.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/4-agenda-440w.webp" alt="Le design Today's agenda pour le jeudi 15 octobre, avec cinq événements de 9 h à 19 h et Put on case"><p><strong>L'agenda du jour.</strong> Votre calendrier du jour, en instantané au dos du téléphone.</p></li>
</ol>
</figure>

---

## Bon à savoir

**Laissez la coque souffler entre deux envois.** Si vous envoyez deux modèles coup sur coup, le second sort délavé et grisâtre. La coque a besoin d'un moment pour récupérer entre deux rafraîchissements. L'app officielle demande d'attendre une minute, et le conseil vaut aussi pour NFC.cool.

**Ne bougez pas.** L'opération prend un petit moment, surtout à cause du rafraîchissement lui-même. Si vous éloignez le téléphone trop tôt, l'app vous le signale et il suffit de recommencer.

**iPhone uniquement, pour l'instant.** La fonction se trouve dans l'app iPhone. L'app Android ne l'a pas encore.

**Quelles coques fonctionnent.** La plupart de ces coques viennent d'un même développeur, qui publie une app différente pour presque chaque marque. J'ai essayé avec ma coque toutes celles que j'ai pu trouver :

- **DeerPhoneCase**, **KAZAVA**, **Novixand** et **TYOHINN** fonctionnent avec ma coque, et NFC.cool aussi. Si votre coque était livrée avec l'une de ces apps, NFC.cool devrait fonctionner avec elle.
- **Bestie e-INK** et **KINGZER** ne fonctionnent pas avec la mienne. L'image passe sans souci par NFC, mais au moment où la coque devrait se rafraîchir, il ne se passe rien.
- **SpaceInk+**, d'un autre développeur, ne fonctionne pas du tout avec ma coque. L'app affiche seulement « device channel information mismatch ».

Cela ne veut pas dire que NFC.cool ne fonctionne pas avec les coques Bestie e-INK, KINGZER ou SpaceInk+. Ce sont peut-être simplement des coques un peu différentes de la mienne, et je ne peux pas les tester. Si vous en avez une, [dites-moi](/contact/) si NFC.cool fonctionne avec elle ou non. Si la vôtre utilise autre chose, l'app vous indique qu'elle n'est pas encore prise en charge et vous propose un bouton **Envoyer les infos de la coque**. Il transmet les caractéristiques techniques de la puce, et rien qui permette de vous identifier, ni vous ni votre coque. Je peux ainsi voir quelles coques les gens possèdent vraiment, et les ajouter.

**Où en trouver une.** Sur Amazon, ces coques se vendent sous une foule de marques, certaines assez énigmatiques, mais ce sont les mêmes coques derrière. [Voici une recherche sur Amazon](https://link.amazon/B0hUxLZTR) (lien affilié). La mienne porte la mention DIY imprimée à l'intérieur, et certaines annonces ont DIY dans leur titre, c'est donc un bon mot-clé à repérer. Si l'annonce indique l'app utilisée par la coque, cherchez DeerPhoneCase, KAZAVA, Novixand ou TYOHINN.

---

## Le mot de la fin

Si l'une de ces coques traîne chez vous avec la même image que le premier jour, donnez-lui enfin quelque chose d'utile à afficher. NFC.cool Tools est disponible sur l'[App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-e-ink-phone-case-iphone-fr&mt=8).

Et si vous n'avez jamais vu un écran e-ink clignoter puis faire apparaître une image que vous lui avez envoyée vous-même, je ne peux que vous le conseiller. Ce sont quelques secondes délicieusement satisfaisantes.
