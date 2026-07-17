---
id: "nfc-safe-2026-05"
title: "NFC Safe : stockez des secrets chiffrés sur des tags NFC durables"
date: "2026-05-03"
tags: ["nfc-tags", "privacy"]
summary: "De l'AES 256 bits sur des tags NFC enrobés de résine époxy. Les sauvegardes papier brûlent. Les sauvegardes cloud tombent en panne. Pas les tags NFC."
metaDescription: "NFC Safe chiffre vos secrets - phrases de récupération, mots de passe, codes de secours - sur un tag NFC en AES 256 bits. Pas de cloud, pas de compte, juste le tag et votre phrase secrète."
image: "/assets/images/Blog/nfc-safe-encrypted-secrets.webp"
imageAlt: "Un téléphone, une carte NFC, un bouclier et un cadenas représentant des secrets NFC chiffrés"
author: "Nicolo Stanciu"
---

Votre phrase de récupération est probablement écrite sur un bout de papier. Peut-être dans un coffre. Peut-être sous une lame de parquet. Peut-être répartie sur trois endroits différents parce que quelqu'un sur Reddit a dit que c'est ce que font les gens « sérieux » du monde crypto. Mais ça reste du papier. Le papier brûle. Le papier prend l'eau. Le papier se perd.

J'ai passé des années à développer NFC.cool, une app pour lire et écrire des tags NFC, et à un moment je me suis posé une question qui n'a rien à voir avec les paiements ou les badges d'accès : et si votre sauvegarde ne pouvait ni pourrir, ni se dégrader, et ne ressemblait à rien aux yeux de quiconque la trouverait ?

C'est cette question qui m'a conduit à créer **NFC Safe**. Il chiffre n'importe quel texte - phrases de récupération, mots de passe, codes de secours, tout ce que vous devez garder secret - sur un tag NFC avec un chiffrement AES 256 bits. Le tag se suffit à lui-même. Pas de cloud. Pas de serveur. Pas de compte. Pour lire le secret, il vous faut le tag physique *et* la phrase secrète. Sans les deux, le tag n'est qu'un minuscule bout de plastique couvert de charabia.

Il y a une chose à laquelle je tenais vraiment en concevant tout ça : je ne voulais pas que vos secrets dépendent de l'existence de mon app. Le format de chiffrement est donc [entièrement documenté et ouvert](https://github.com/NickAtGit/nfc.cool-nfc-safe-format), avec un décodeur Python de référence. Si NFC.cool venait à disparaître, vous pourriez toujours récupérer vos données avec un lecteur NFC standard et la spécification. C'est une promesse que je peux tenir, parce que j'ai écrit la spec pour qu'elle survive au logiciel.

---

## Le problème du stockage des secrets

Si vous me demandiez de nommer le point faible de chaque méthode de stockage de secrets que j'ai vue, je pourrais le faire sans réfléchir : le papier brûle, les connecteurs USB se corrodent, les services cloud se font pirater, les portefeuilles matériels ne gèrent que les phrases de récupération crypto, et votre cerveau oublie. Chaque option échoue à sa manière.

Alors j'ai raisonné à l'envers. La sauvegarde idéale serait physiquement durable, chiffrée, autonome, redondante et pérenne. Les tags NFC cochent ces cinq cases, et ça m'a surpris moi aussi au début. Ils n'ont pas de batterie, pas de pièces mobiles, et la puce NTAG216 est certifiée pour plus de 10 ans de conservation des données. Les variantes enrobées de résine époxy survivent à l'eau, aux chocs et à des décennies d'abandon. Si vous découvrez ce qui distingue ces puces, j'ai détaillé les compromis dans [les types de tags NFC pour iPhone](/blog/nfc-tag-types-for-iphones/).

---

## Comment utiliser NFC Safe

NFC Safe se trouve dans NFC.cool Tools, sous NFC Apps. J'ai tout ramené à un seul écran avec un sélecteur segmenté en haut - Chiffrer ou Déchiffrer. Si vous avez déjà écrit un tag une fois, rien de tout cela ne vous dépaysera.

**Pour chiffrer :**
1. Ouvrez Tools → NFC Apps → NFC Safe
2. Sélectionnez **Chiffrer**
3. Saisissez ou collez votre secret
4. Définissez une phrase secrète forte
5. Appuyez sur Chiffrer ; approchez un tag NFC de votre téléphone

**Pour déchiffrer :**
1. Même écran, basculez sur **Déchiffrer**
2. Saisissez votre phrase secrète
3. Approchez un tag chiffré au préalable - votre secret apparaît

Sous le capot, voici ce que je fais concrètement : AES-256-GCM avec PBKDF2 (HMAC-SHA-256, 100 000 itérations, sel aléatoire de 16 octets). Le résultat est stocké sur le tag sous la forme d'un enregistrement NDEF personnalisé (`urn:nfc:ext:crypto`). Si vous voulez vérifier tout ça par vous-même plutôt que de me croire sur parole, la [spécification complète du format est sur GitHub](https://github.com/NickAtGit/nfc.cool-nfc-safe-format). Et si vous êtes d'abord curieux de voir à quoi ressemble l'écriture d'un tag normal, non chiffré, je la détaille dans [comment écrire des tags NFC sur iPhone](/blog/write-nfc-tags-iphone/).

---

## La stratégie de redondance

Voici comment je m'en servirais réellement, moi. Un tag NTAG216 coûte à peu près le prix d'un café, il n'y a donc aucune raison de n'en faire qu'un seul. Achetez-en une poignée, chiffrez le même secret sur chacun, et répartissez-les : tiroir de bureau, lieu de travail, chez un proche, un coffre bancaire, un endroit auquel vous seul penseriez à regarder. Chaque tag pris isolément ne veut rien dire sans la phrase secrète. C'est ce que je préfère dans cette conception - elle est à deux facteurs par nature : un tag physique plus une phrase secrète, conservés dans deux endroits distincts, sans la moindre configuration supplémentaire de votre part.

---

## Pourquoi le NFC plutôt qu'une clé USB ou une carte SD

On me demande pourquoi je n'ai pas simplement orienté tout le monde vers une clé USB ou une carte SD. La réponse honnête, c'est que j'en ai vu trop tomber en panne de façons banales et évitables. Le NFC contourne tous ces écueils :

- **Pas de connecteur** - rien à corroder ni à tordre
- **Pas de batterie** - passif, alimenté par le lecteur
- **Pas de système de fichiers** - rien à corrompre
- **Pas de pilote** - tous les smartphones lisent le NFC nativement
- **Petit et bon marché** - de la taille d'une pièce, moins d'un dollar en quantité
- **Durable** - les variantes époxy résistent à l'eau, aux chocs, aux UV

La seule vraie limite, c'est la capacité : environ 500 à 700 octets une fois le surcoût du chiffrement déduit. Ce n'est pas énorme, mais c'est amplement suffisant pour l'usage visé - une phrase de récupération de 24 mots, un mot de passe maître ou un jeu de codes de secours.

---

## Notes de sécurité

Je préfère être franc sur les points sensibles plutôt que vous les laissiez découvrir plus tard :

- **Votre phrase secrète est primordiale.** L'AES 256 bits est incassable. Une phrase secrète faible ne l'est pas. Utilisez une chaîne de plus de 20 caractères générée aléatoirement et ne faites aucun compromis là-dessus.
- **La portée du NFC est courte** (~4 cm). Personne ne scanne d'un bout à l'autre de la pièce - cette portée minuscule est une qualité, pas un défaut.
- **Pas d'effacement à distance.** Tag perdu ? Détruisez-le physiquement. Une paire de ciseaux fait l'affaire, tout comme le fait que les données sont de toute façon inutilisables sans la phrase secrète.
- **Pas de récupération de la phrase secrète.** Oubliez-la et les données sont perdues. J'ai pris cette décision délibérément - une voie de récupération est aussi une voie d'attaque. Notez la phrase secrète quelque part, séparément des tags.

---

## La vue d'ensemble

À travailler sur le NFC tous les jours, j'ai vu ces tags devenir discrètement le support de stockage de choses qui comptent. Le passeport numérique de produit de l'UE imposera le NFC pour l'authenticité des produits. Philips en met dans les têtes de brosse à dents. Les hôtels s'en servent pour les clés de chambre. Bon marché, durables et lisibles universellement par l'appareil déjà dans votre poche - cette combinaison est rare, et c'est exactement pour ça que je continue de leur trouver de nouveaux usages. Si vous voulez une vue plus large, j'ai couvert les bases dans [les tags NFC expliqués : le guide complet du débutant](/blog/nfc-tags-beginners-guide/).

NFC Safe est ma tentative de prendre cette durabilité et d'y ajouter la seule chose qui lui manquait - le chiffrement. Une sauvegarde qui dure plus longtemps que le papier, que personne ne peut lire s'il la trouve, et qui coûte moins cher qu'une tasse de café. C'est le genre de chose que je voulais pour moi-même, alors je l'ai construite.

Disponible dès maintenant sur [NFC.cool Tools pour iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-safe-encrypted-secrets-fr&mt=8) et [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-safe-encrypted-secrets-fr).