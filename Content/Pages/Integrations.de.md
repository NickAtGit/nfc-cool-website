---
title: "Integrationen"
slug: "integrations"
description: "Leite NFC- und QR-Scans in deine bestehenden Tools - Zapier, n8n, Make, IFTTT oder jeden HTTP-Endpunkt."
---

<section class="page-hero">

# NFC.cool an alles anbinden

Jeder NFC.cool-Scan kann einen HTTP POST an eine URL deiner Wahl auslösen. Heißt: wenn dein Lieblings-Tool Webhooks empfangen kann, empfängt es auch Scans. Kein Vermittler, kein NFC.cool-Konto, kein Upload zu unseren Servern.

</section>

<section class="page-section">

## Beliebte Integrationen

<div class="feature-capabilities-grid">

<article class="feature-capability-card">
<h3>Zapier</h3>
<p>Nutze Zapiers "Catch Webhook"-Trigger, um Scans an über 5.000 Apps weiterzuleiten - CRMs, Tabellen, Slack, alles. Der kostenlose Tarif reicht für kleine Volumina.</p>
</article>

<article class="feature-capability-card">
<h3>n8n</h3>
<p>Self-hosted n8n für unbegrenzte Workflow-Durchläufe ohne Pro-Task-Pricing. Der HTTP-Trigger-Node nimmt NFC.cool-POSTs direkt entgegen.</p>
</article>

<article class="feature-capability-card">
<h3>Make (früher Integromat)</h3>
<p>Visueller Workflow-Builder mit breiter App-Abdeckung. Nutze das Webhooks-Modul als Einstiegspunkt für jeden NFC.cool-Scan.</p>
</article>

<article class="feature-capability-card">
<h3>IFTTT</h3>
<p>Für einfaches "if this then that"-Routing. IFTTTs Webhooks-Service gibt dir eine eigene URL, die du in der NFC.cool-Webhook-Konfiguration eintragen kannst.</p>
</article>

<article class="feature-capability-card">
<h3>Slack / Discord / Teams</h3>
<p>Richte einen Webhook direkt auf eine Slack-Incoming-Webhook-URL (oder Discord/Teams-Äquivalent), um jedes Mal in einen Channel zu pingen, wenn ein Tag berührt wird.</p>
</article>

<article class="feature-capability-card">
<h3>Dein eigenes Backend</h3>
<p>Jeder HTTPS-Endpunkt, der einen JSON-POST akzeptiert, funktioniert. Details zu Payload-Schema und Auth-Konventionen findest du in den [Entwickler-Docs](/de/developers/).</p>
</article>

</div>

</section>

<section class="page-section">

## Häufige Workflow-Muster

- **Inventur + Audit-Trail.** Tippe einen Tag auf einem Artikel an, NFC.cool POSTet in eine Tabelle oder ein Warehouse-System; eine Zeile erscheint mit Zeitstempel + Gerät + Payload.
- **Lead-Erfassung auf Events.** Tippe einen Tag auf deinem Messebanner an, dein CRM sendet automatisch eine Follow-up-E-Mail.
- **Smart-Home-Trigger.** Tippe einen Tag an der Haustür an, um "Ich bin zu Hause" zu markieren - Home Assistant / Homey / Hubitat empfängt es per Webhook.
- **Asset-Tracking.** Wartungspersonal tippt Tags auf Geräten an, um Inspektionen zu protokollieren; das Backend baut das Compliance-Log.
- **Konferenz-Check-ins.** Tippe das NFC-Badge eines Gastes an; der Webhook aktualisiert deine Event-Plattform in Echtzeit.

</section>

<section class="page-section">

## Bereit zu bauen?

Die [Entwickler-Docs](/de/developers/) decken Payload-Format, Security-Header, Retry-Semantik und Beispiel-Empfänger in cURL, Node.js und Python ab.

Du kennst einen Integrations-Partner, der hier stehen sollte? <hello@nfc.cool>.

</section>
