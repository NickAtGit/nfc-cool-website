---
title: "NFC.cool x-callback-url"
slug: "x-callback-url"
description: "D'autres apps et pages web peuvent demander à NFC.cool sur iPhone d'effectuer une action et de leur renvoyer le résultat, selon la convention x-callback-url."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# NFC.cool x-callback-url

D'autres apps et pages web peuvent demander à NFC.cool sur iPhone d'effectuer une action et de leur renvoyer le résultat, selon la convention [x-callback-url](https://x-callback-url.com).

Les webhooks, les Raccourcis et les schémas d'URL se trouvent sur la [page développeurs](/fr/developers/).

<a href="#read-uid" class="landing-cta-button">Voir la documentation</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/nfc-scan-tag.webp" alt="iPhone en train de scanner un tag NFC" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section" id="read-uid">

## Lire l'identifiant d'un tag depuis votre app ou page web

Un lien demande à NFC.cool de scanner un tag et de vous renvoyer son UID, ainsi que le message NDEF du tag avec `ndef=1`. Cela fonctionne depuis n'importe quelle page web ou app sur iPhone, sans rien à configurer hormis l'installation de NFC.cool. Le lien suit la convention [x-callback-url](https://x-callback-url.com). La lecture de tags pour d'autres apps et sites web fait partie de NFC.cool Business, la licence entreprise de NFC.cool sur iPhone : [écrivez-nous](mailto:info@nfc.cool?subject=NFC.cool%20Business) pour en obtenir une.

```
https://nfc.cool/x-callback-url/read-uid?<parameters>
nfcforiphone://x-callback-url/read-uid?<parameters>
```

Les deux formes font la même chose. Préférez la forme `https` : sur un iPhone sans NFC.cool, elle ouvre une page qui explique comment l'obtenir, au lieu d'échouer en silence. Placez-la dans un lien que la personne touche elle-même ; iOS n'ouvre pas d'app pour un lien qu'un script suit tout seul.

NFC.cool passe au premier plan, indique qui reçoit l'identifiant du tag et lance le scan. Si un lien read-uid est déjà ouvert, le plus récent prend le relais, et l'appelant précédent reçoit `cancelled`.

### Paramètres

<div class="page-cards-grid">

<article class="page-card">
<h3><code>x-get</code></h3>
<p>NFC.cool appelle cette URL en arrière-plan avec le résultat en paramètres de requête. Chaque issue arrive ici immédiatement, échecs et annulations compris.</p>
<p><strong>Obligatoire:</strong> <code>x-get</code>, <code>x-post</code> ou <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-post</code></h3>
<p>NFC.cool envoie le résultat ici en JSON, par POST.</p>
<p><strong>Obligatoire:</strong> <code>x-get</code>, <code>x-post</code> ou <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-success</code></h3>
<p>Ouverte après une lecture réussie, avec <code>uid</code>, <code>ndef</code> et <code>state</code> ajoutés. Associée à <code>x-get</code> ou <code>x-post</code>, elle ne reçoit que <code>state</code> : l'UID va au serveur montré à la personne, et nulle part ailleurs.</p>
<p><strong>Obligatoire:</strong> <code>x-get</code>, <code>x-post</code> ou <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-error</code></h3>
<p>Ouverte lorsque la personne ferme NFC.cool après un échec, avec <code>errorCode</code>, <code>errorMessage</code> et <code>state</code>.</p>
<p><strong>Obligatoire:</strong> non</p>
</article>

<article class="page-card">
<h3><code>x-cancel</code></h3>
<p>Ouverte lorsque la personne annule, avec <code>state</code>.</p>
<p><strong>Obligatoire:</strong> non</p>
</article>

<article class="page-card">
<h3><code>state</code></h3>
<p>N'importe quelle chaîne, par exemple un identifiant de requête à usage unique. Renvoyé tel quel avec chaque résultat.</p>
<p><strong>Obligatoire:</strong> non, mais recommandé</p>
</article>

<article class="page-card">
<h3><code>ndef</code></h3>
<p><code>1</code> lit aussi le message NDEF du tag. Sans lui, seul l'UID est lu.</p>
<p><strong>Obligatoire:</strong> non</p>
</article>

</div>

Utilisez `x-get` ou `x-post`, pas les deux. Encodez en URL chaque valeur de callback.

N'importe quelle page web peut ouvrir ce lien, c'est pourquoi NFC.cool ne rappelle que des URL `https` et les schémas d'URL d'autres apps, comme `yourapp://nfc-done` ; `x-get` et `x-post` doivent être en `https`. Le `http` simple, `javascript:`, `data:`, `tel:`, les schémas propres à NFC.cool et les schémas système qui agissent d'eux-mêmes (`shortcuts:`, `itms-services:`, `mailto:`, `App-Prefs:` et similaires) sont refusés, et un lien contenant un callback refusé est ignoré.

### L'UID

Hexadécimal en majuscules, sans séparateurs, octet de poids fort en premier. Sa longueur permet de distinguer les familles de puces :

<div class="page-cards-grid">

<article class="page-card">
<h3>NTAG, MIFARE Ultralight (ISO 14443-A)</h3>
<p>7 octets</p>
<p><code>04A1B2C3D4E5F6</code></p>
</article>

<article class="page-card">
<h3>ICODE et autres tags ISO 15693</h3>
<p>8 octets</p>
<p><code>E004015012345678</code></p>
</article>

</div>

Les UID ISO 15693 commencent par `E0`, dans l'ordre imprimé sur la puce et affiché par la plupart des lecteurs.

### Le message NDEF

Avec `ndef=1`, `ndef` contient le message NDEF brut du tag, c'est-à-dire les enregistrements sans l'en-tête TLV, en Base64url sans remplissage ([RFC 4648, section 5](https://www.rfc-editor.org/rfc/rfc4648#section-5)) : `-` et `_` au lieu de `+` et `/`, et pas de `=`. Il est omis lorsque le tag ne contient aucun message NDEF.

```js
// Node.js
const bytes = Buffer.from(ndef, "base64url");
```

```python
# Python
import base64
data = base64.urlsafe_b64decode(ndef + "=" * (-len(ndef) % 4))
```

### `x-get`

```
GET https://your-server.example/nfc?code=abc123&uid=E004015012345678&ndef=0QEFVAJkZUhp&state=7f3c9a
GET https://your-server.example/nfc?code=abc123&error=cancelled&state=7f3c9a
```

Votre URL est appelée telle quelle, avec le résultat ajouté après les paramètres qu'elle contient déjà. Chaque tentative donne lieu à exactement un appel, la page qui l'attend peut donc s'arrêter dès qu'il arrive :

<div class="page-cards-grid">

<article class="page-card">
<h3><code>cancelled</code></h3>
<p>La personne a annulé le scan ou fermé NFC.cool avant de lire un tag.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>Aucun tag n'a été trouvé à temps, ou le tag n'a pas pu être lu.</p>
</article>

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>Cet iPhone n'a pas accès à NFC.cool Business.</p>
</article>

</div>

Après `cancelled` ou `scan-failed`, la personne peut réessayer, et une lecture réussie appelle alors de nouveau `x-get` avec l'`uid` : considérez le dernier appel reçu pour un `state` comme la réponse. Répondez avec n'importe quel statut 2xx. Si un appel de succès échoue, NFC.cool propose de le renvoyer.

### `x-post`

```
POST https://your-server.example/api/uid
Content-Type: application/json

{"uid":"04A1B2C3D4E5F6","state":"7f3c9a","readAt":"2026-11-19T09:30:00Z","ndef":"0QEFVAJkZUhp"}
```

Répondez avec n'importe quel statut 2xx dans un délai de 20 secondes. Tout le reste compte comme un échec : la personne peut renvoyer la requête, et la fermeture de NFC.cool signale `delivery-failed` à `x-error`. Utilisez `x-post` lorsque la page qui a lancé la lecture ne peut pas être rouverte par URL, par exemple une web view dans une autre app ; la personne y revient grâce au lien qu'iOS affiche en haut à gauche.

NFC.cool n'envoie aucun cookie avec `x-get` ou `x-post`. Identifiez la requête grâce au `state` à usage unique que vous avez placé dans le lien.

### Codes `x-error`

<div class="page-cards-grid">

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>Cet iPhone n'a pas accès à NFC.cool Business.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>Aucun tag n'a été trouvé à temps, ou le tag n'a pas pu être lu.</p>
</article>

<article class="page-card">
<h3><code>delivery-failed</code></h3>
<p>La requête <code>x-post</code> a échoué.</p>
</article>

</div>

### Exemple

Une page qui attend son propre serveur, avec en plus le message NDEF :

```html
<a href="https://nfc.cool/x-callback-url/read-uid?x-get=https%3A%2F%2Fexample.com%2Fnfc%3Fcode%3Dabc123&ndef=1&state=7f3c9a">
  Scan tag
</a>
```

</section>
