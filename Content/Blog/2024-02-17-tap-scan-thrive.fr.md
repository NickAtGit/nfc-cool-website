---
id: nfc-blog-022
title: "Approcher, scanner, prospérer : ce qu'un QR code peut transporter au-delà d'une URL"
date: 2024-02-17
tags: ["qr-codes", "business-cards"]
summary: "Les QR codes ne servent pas qu'aux URL. Ils peuvent transporter des identifiants Wi-Fi, des événements d'agenda, des lieux, des vCards, du texte brut - tout ce que vous pouvez encoder. Voici le menu complet de ce que le générateur et le scanner de QR codes de NFC.cool savent faire."
metaTitle: "Ce qu'un QR code peut transporter : bien au-delà des URL"
metaDescription: "Un QR code peut encoder des identifiants Wi-Fi, des contacts, des événements d'agenda, des lieux et plus encore - pas seulement des URL. Un guide concret de chaque type de contenu QR et du moment où l'utiliser."
ogTitle: "Approcher, scanner, prospérer : ce qu'un QR code peut transporter au-delà d'une URL"
ogDescription: "Un QR code peut encoder du Wi-Fi, des contacts, des agendas, des lieux - pas seulement des URL."
image: "/assets/images/Blog/tap-scan-thrive.webp"
---
Un QR code n'est qu'un seau d'octets. Les URL sont de loin le contenu le plus courant, mais la spécification s'en moque - vous pouvez y encoder des identifiants Wi-Fi, un événement d'agenda, un point sur une carte, une fiche de contact, du texte brut, ou n'importe quel contenu personnalisé qu'une app sait décoder.

Le générateur de QR codes de NFC.cool couvre tout ça. Voici ce que chacun fait réellement une fois scanné.

---

## Les URL

Le cas de base. Encodez `https://example.com`, scannez avec n'importe quel appareil photo, et le téléphone propose de l'ouvrir. Fonctionne sur tous les téléphones sortis ces dix dernières années.

Une variante utile : les liens courts. Si vos URL sont chargées de paramètres d'analytics, générez le QR à partir de la version courte - le QR code est physiquement plus petit (moins de modules = moins dense) et plus facile à scanner de loin.

---

## Les identifiants Wi-Fi

Encodez un SSID, un mot de passe et un type de sécurité (WPA2, WPA3, ouvert) au format standard `WIFI:T:WPA;S:...;P:...;;`. iOS, Android et les versions récentes de Windows reconnaissent tous ce format et proposent de se connecter.

Imprimez-le sur une petite carte dans votre chambre d'amis. Collez-le au dos de la box. Scotchez-le au mur d'un café. Les invités scannent, se connectent, terminé - fini de taper des mots de passe de 24 caractères.

---

## Les événements d'agenda

Encodez un événement sous forme de bloc `BEGIN:VEVENT` (le format iCalendar). Au scan, le téléphone propose de l'ajouter à l'app d'agenda, avec heure de début, heure de fin, lieu et description.

Pratique sur les affiches d'événements, la signalétique d'une conférence, ou les cartons « save the date ». Le destinataire n'a pas à retrouver l'événement sur un site web - un seul scan et c'est ajouté à son agenda.

---

## Les lieux

Encodez un URI `geo:` avec latitude et longitude. Au scan, l'app de cartographie par défaut s'ouvre sur ce point - Plans sur iOS, Google Maps sur la plupart des téléphones Android.

Restaurants, salles, points de rendez-vous : collez un petit QR sur le flyer ou l'invitation, et vos destinataires obtiennent l'itinéraire d'un seul geste.

---

## vCard (contacts)

L'alternative la plus courante aux URL. Encodez une vCard complète (nom, téléphone, e-mail, organisation, adresse, URL, photo) et le téléphone propose de l'enregistrer comme contact.

Les cartes de visite QR fonctionnent ainsi d'emblée. C'est aussi pourquoi un QR vCard fonctionne sur tous les téléphones sans app particulière - la vCard est une norme vieille de 30 ans que le système connaît déjà.

Le compromis face à l'approche carte de visite de NFC.cool : un QR vCard ne peut pas être mis à jour. Une fois imprimées, les données du contact sont figées. Si vous voulez une « source unique de vérité » que vous pourrez modifier plus tard, encodez plutôt une URL vers la page en ligne de votre carte de visite - c'est exactement ce que fait [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-tap-scan-thrive-fr&mt=8), et c'est pourquoi nous le recommandons plutôt qu'un simple QR vCard pour du réseautage sérieux.

---

## Le texte brut

Si vous voulez juste afficher une chaîne de caractères au scan - un message, un code promo, une énigme - vous pouvez encoder du texte brut. La plupart des apps de scan l'afficheront et proposeront de le copier ou de le partager.

---

## Les contenus personnalisés

Certaines apps enregistrent des schémas d'URL personnalisés (`myapp://...`) et reconnaissent les QR codes qui les utilisent. Le scanner de NFC.cool les respecte - il lit le contenu et le transmet à l'app enregistrée, exactement comme le feraient iOS ou Android via les Universal Links.

---

## Côté scan

Le scanner de NFC.cool lit tous les formats ci-dessus et les dirige vers la bonne action : les URL s'ouvrent dans le navigateur, les vCards proposent d'être enregistrées, le Wi-Fi propose de se connecter, les lieux s'ouvrent dans l'app de cartographie. Il conserve aussi un historique local de chaque scan, bien pratique quand vous avez scanné 30 menus à une conférence et voulez en retrouver un.

Toute la pile QR - générateur et scanner - est disponible dans [NFC.cool Tools pour iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-tap-scan-thrive-fr&mt=8) et [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-tap-scan-thrive-fr).
