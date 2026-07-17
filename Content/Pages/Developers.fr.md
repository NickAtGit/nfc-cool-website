---
title: "Développeurs"
slug: "developers"
description: "Comment brancher NFC.cool sur votre stack - référence du payload webhook, App Intents, schémas d'URL, flux lisibles par machine, et tout ce qu'il vous faut pour une intégration côté serveur sur iPhone et Android."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Pour ceux qui construisent

NFC.cool est un scanner qui respecte votre stack. Chaque scan peut devenir une requête HTTP POST structurée vers votre propre backend, dans un JSON prévisible, envoyée directement depuis l'appareil. Pas d'intermédiaire, pas de compte NFC.cool, aucun envoi vers nos serveurs.

<a href="#webhook-payload" class="landing-cta-button">Voir le payload</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/webhook.webp" alt="Données de scan acheminées vers un endpoint webhook" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section">

## Où brancher NFC.cool

Un webhook n'est rien d'autre qu'un `POST` JSON vers une URL que vous contrôlez - donc tout ce qui parle HTTP fait l'affaire.

<div class="feature-capabilities-grid">

<article class="feature-capability-card">
<h3>Zapier</h3>
<p>Utilisez le déclencheur "Catch Webhook" de Zapier pour acheminer vos scans vers plus de 5 000 applications - CRM, tableurs, Slack, et bien d'autres. La version gratuite suffit pour de petits volumes.</p>
</article>

<article class="feature-capability-card">
<h3>n8n</h3>
<p>Auto-hébergez n8n pour des exécutions de workflows illimitées, sans tarification à la tâche. Le nœud de déclenchement HTTP accepte directement les POST de NFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>Make (anciennement Integromat)</h3>
<p>Constructeur de workflows visuel avec une large couverture d'applications. Utilisez le module Webhooks comme point d'entrée de chaque scan NFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>IFTTT</h3>
<p>Pour un routage simple de type "if this then that". Le service Webhooks d'IFTTT vous fournit une URL unique à coller dans la configuration webhook de NFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>Slack / Discord / Teams</h3>
<p>Pointez l'URL du webhook vers un incoming-webhook Slack (ou l'équivalent Discord/Teams) pour notifier un canal à chaque fois qu'un tag est scanné.</p>
</article>

<article class="feature-capability-card">
<h3>Votre propre backend</h3>
<p>N'importe quel endpoint HTTPS qui accepte un POST JSON fonctionne. Le schéma, le modèle d'authentification et des exemples de récepteurs sont documentés ci-dessous.</p>
</article>

</div>

</section>

<section class="page-section">

## Modèles de workflow courants

- **Inventaire et piste d'audit.** Approchez un tag sur un article, NFC.cool envoie un POST vers un tableur ou un système d'entrepôt ; une ligne apparaît avec l'horodatage, l'identifiant du tag et le payload.
- **Capture de leads en événement.** Approchez un tag sur la banderole de votre stand, votre CRM déclenche automatiquement un e-mail de relance.
- **Déclencheurs domotiques.** Approchez un tag sur la porte d'entrée pour signaler "je suis rentré" - Home Assistant / Homey / Hubitat le récupère via webhook.
- **Suivi des équipements.** Le personnel de maintenance approche des tags sur les équipements pour consigner les inspections ; le backend constitue le registre de conformité.
- **Enregistrement en conférence.** Approchez le badge NFC d'un participant ; le webhook met à jour votre plateforme d'événement en temps réel.

</section>

<section class="page-section" id="webhooks">

## Webhooks

Activez-les dans **onglet Plus → Webhook** à l'intérieur de l'app : saisissez une URL HTTPS, éventuellement un nom d'utilisateur/mot de passe pour l'authentification HTTP Basic, puis activez indépendamment "scans NFC" et "scans QR et codes-barres". Disponible sur iOS et Android.

L'app envoie un seul `POST` par scan vers l'URL que vous avez configurée. Il n'y a pas de file de nouvelles tentatives séparée : si votre endpoint est injoignable ou renvoie une réponse non 2xx, le POST du scan échoue. Visez `204 No Content` en cas de succès ; tout code 2xx est considéré comme accepté.

Cette page est la référence technique. Pour un aperçu de la fonctionnalité - les quatre autres points d'automatisation iOS, les tarifs et la FAQ - consultez la [page de la fonctionnalité Webhooks et automatisation](/features/webhooks/).

</section>

<section class="page-section" id="webhook-payload">

## Payload du webhook

Content-type `application/json`, le corps est du JSON formaté :

```json
{
  "identifier" : "04:A2:7F:1B:5E:80:00",
  "date" : "2026-05-12T14:23:01Z",
  "content" : "https://example.com/check-in/abc123"
}
```

Les tags structurés (actuellement OpenPrintTag) ajoutent deux champs supplémentaires :

```json
{
  "identifier" : "04:A2:7F:1B:5E:80:00",
  "date" : "2026-05-12T14:23:01Z",
  "content" : "Filament Spool #1234",
  "tagType" : "openPrintTag",
  "structured" : {
    "material" : "PLA",
    "color" : "#FF6F4C",
    "manufacturer" : "Prusament",
    "uuid" : "5e8a-7c1d-4f90"
  }
}
```

Référence des champs :

- `identifier` - Pour les scans NFC, l'UID matériel du tag en hexadécimal majuscule séparé par des deux-points (par ex. `04:A2:7F:1B:5E:80:00`). Stable par tag, vous pouvez donc l'utiliser pour la déduplication. Pour les scans QR et codes-barres, c'est un nouvel UUID à chaque scan - ce n'est pas un identifiant de code stable. Dans les anciens modes de compatibilité NFC d'iOS qui n'exposent pas l'UID, la valeur est la chaîne littérale `NoIdentifierInCompatibilityMode`.
- `date` - ISO 8601, moment où le scan a eu lieu sur l'appareil.
- `content` - Contenu décodé. Pour le NFC, la valeur de l'enregistrement NDEF (URI ou texte) ; pour les QR/codes-barres, la chaîne décodée brute.
- `tagType` - Omis pour les scans simples. Vaut `"openPrintTag"` pour les scans OpenPrintTag.
- `structured` - Omis pour les scans simples. Payload structuré analysé lorsque `tagType` est présent.

</section>

<section class="page-section">

## Authentification

Les webhooks prennent en charge **uniquement l'authentification HTTP Basic**. Dans **onglet Plus → Webhook**, vous pouvez éventuellement enregistrer un nom d'utilisateur et un mot de passe dans le Keychain iOS. L'app répond alors aux challenges HTTP standard `401 / WWW-Authenticate: Basic` de votre serveur avec ces identifiants.

Autrement dit, c'est votre endpoint qui décide si l'authentification est requise. Si vous n'en avez pas besoin, laissez le nom d'utilisateur et le mot de passe vides dans l'app et ignorez le challenge côté serveur. Si vous en avez besoin, renvoyez un `401` avec `WWW-Authenticate: Basic realm="…"` sur le premier POST - l'appareil réessaiera avec `Authorization: Basic …` transportant les identifiants enregistrés. Tout transite par TLS ; les serveurs de NFC.cool ne voient jamais vos identifiants.

Il n'y a aujourd'hui aucune prise en charge des jetons Bearer, des clés API ou des signatures HMAC. Si vous en avez besoin, gérez-les au niveau d'un reverse proxy (Cloudflare Worker, nginx, etc.) qui traduit Basic vers votre schéma.

</section>

<section class="page-section">

## Exemples de récepteurs

Besoin de voir toute la boucle de bout en bout ? Clonez le [serveur webhook de référence sur GitHub](https://github.com/NickAtGit/nfc-cool-webhook-server) - il journalise chaque payload en direct. Les extraits ci-dessous sont des récepteurs minimaux pour votre propre stack.

### cURL - test rapide

```bash
curl -X POST https://your-server.example/webhook \
  -u 'nfc-cool:your-password' \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"04:A2:7F:1B:5E:80:00","date":"2026-05-12T14:00:00Z","content":"hello"}'
```

### Node.js - récepteur Express

```js
import express from "express";
import basicAuth from "express-basic-auth";

const app = express();
app.use(express.json());

app.post(
  "/webhook",
  basicAuth({
    users: { "nfc-cool": process.env.WEBHOOK_PASSWORD },
    challenge: true, // indique à NFC.cool de réessayer avec les identifiants
  }),
  (req, res) => {
    const { identifier, date, content, tagType } = req.body;
    console.log(`scan ${tagType ?? "plain"} ${content} id=${identifier} at ${date}`);
    res.status(204).end();
  }
);

app.listen(3000);
```

### Python - récepteur FastAPI

```python
import os
import secrets
from fastapi import FastAPI, Depends, HTTPException, Request, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials

app = FastAPI()
security = HTTPBasic()

def check(creds: HTTPBasicCredentials = Depends(security)):
    ok_user = secrets.compare_digest(creds.username, "nfc-cool")
    ok_pass = secrets.compare_digest(creds.password, os.environ["WEBHOOK_PASSWORD"])
    if not (ok_user and ok_pass):
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            headers={"WWW-Authenticate": 'Basic realm="nfc-cool"'},
        )

@app.post("/webhook")
async def webhook(request: Request, _: None = Depends(check)):
    body = await request.json()
    print(f"scan: {body['content']} id={body['identifier']}")
    return {"status": "ok"}
```

</section>

<section class="page-section" id="shortcuts">

## App Intents et Raccourcis

NFC.cool Tools sur **iOS** propose une poignée d'App Intents que vous pouvez intégrer à l'app Raccourcis, aux automatisations, aux modes de concentration ou à Apple Intelligence.

<div class="page-cards-grid">

<article class="page-card">
<h3><code>Scan</code></h3>
<p>Démarre un scan dans la fonction que vous choisissez : NFC, QR / code-barres, document, objet 3D ou pièce.</p>
</article>

<article class="page-card">
<h3><code>Open Tab</code></h3>
<p>Ouvre NFC.cool sur un onglet précis (NFC, QR, document, 3D, plus) sans démarrer de scan.</p>
</article>

<article class="page-card">
<h3><code>Get Last NFC Tag</code></h3>
<p>Renvoie le contenu du dernier tag NFC scanné sous forme de chaîne - utile comme entrée de raccourci. Ne lance pas l'app.</p>
</article>

<article class="page-card">
<h3><code>Get Last QR Code</code></h3>
<p>Renvoie le contenu du dernier QR code / code-barres scanné. Ne lance pas l'app.</p>
</article>

<article class="page-card">
<h3><code>Write NFC</code></h3>
<p>Ouvre le flux d'écriture NFC pré-rempli avec une URL ou un contenu texte fourni par le raccourci.</p>
</article>

</div>

Les variantes dédiées à iOS 18 (`NFC Scan`, `QR Scan`, `Document Scan`, `Object Scan`, `Room Scan`) apparaissent directement dans Spotlight / le sélecteur du bouton d'action.

</section>

<section class="page-section" id="url-schemes">

## Schémas d'URL

Pour le deep-linking depuis d'autres apps iOS, des widgets ou des raccourcis de l'écran d'accueil, NFC.cool Tools enregistre ces URL :

```
nfcforiphone://scan-nfc
nfcforiphone://scan-code
nfcforiphone://scan-document
nfcforiphone://scan-object       (iOS 17+)
nfcforiphone://scan-room         (iOS 17+)
```

Ouvrir l'une de ces URL vous emmène directement dans le scanner correspondant. Les schémas `nfc://` et `geo://` sont également enregistrés pour prendre le relais des liens externes de tags ou de coordonnées.

</section>

<section class="page-section">

## Ressources lisibles par machine

Des flux repérables pour l'outillage, les moteurs de recherche et les agents IA :

<div class="page-cards-grid">

<article class="page-card">
<h3><a href="/sitemap.xml"><code>/sitemap.xml</code></a></h3>
<p>Index complet du site - chaque route et sa date de dernière modification.</p>
</article>

<article class="page-card">
<h3><a href="/llms.txt"><code>/llms.txt</code></a></h3>
<p>Répertoire du site adapté à l'IA (généré automatiquement par SiteKit).</p>
</article>

<article class="page-card">
<h3><a href="/feed.xml"><code>/feed.xml</code></a></h3>
<p>RSS de tout le site avec le contenu intégral de chaque section.</p>
</article>

<article class="page-card">
<h3><a href="/blog/feed.xml"><code>/blog/feed.xml</code></a></h3>
<p>Flux RSS réservé au blog.</p>
</article>

<article class="page-card">
<h3><a href="/changelog/feed.xml"><code>/changelog/feed.xml</code></a></h3>
<p>Flux des versions - numéros de version, dates et entrées du changelog.</p>
</article>

<article class="page-card">
<h3><a href="/assets/nav-index.json"><code>/assets/nav-index.json</code></a></h3>
<p>Index de navigation structuré avec titres, résumés, tags et URL.</p>
</article>

<article class="page-card">
<h3><a href="/assets/search-index.json"><code>/assets/search-index.json</code></a></h3>
<p>Contenu en texte brut de chaque article pour la recherche côté client.</p>
</article>

</div>

Vous construisez quelque chose sur NFC.cool ? Ou vous avez repéré un partenaire d'intégration qui devrait figurer sur cette page ? [Écrivez-nous](mailto:info@nfc.cool?subject=NFC.cool%20Support).

</section>
