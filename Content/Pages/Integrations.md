---
title: "Integrations"
slug: "integrations"
description: "Pipe NFC and QR scans into your existing tools - Zapier, n8n, Make, IFTTT, or any HTTP endpoint."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Plug NFC.cool into anything

Every NFC.cool scan can fire an HTTP POST to a URL you control. That means if your tool of choice can receive a webhook, it can receive scans. No middleman, no NFC.cool account, no upload to our servers.

<a href="/features/webhooks/" class="landing-cta-button">See webhook docs</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/webhook.webp" alt="Scan data flowing to a webhook endpoint" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section">

## Popular integrations

<div class="feature-capabilities-grid">

<article class="feature-capability-card">
<h3>Zapier</h3>
<p>Use Zapier's "Catch Webhook" trigger to route scans into 5,000+ apps - CRMs, sheets, Slack, you name it. Free Zapier tier handles light volumes.</p>
</article>

<article class="feature-capability-card">
<h3>n8n</h3>
<p>Self-host n8n for unlimited workflow runs without per-task pricing. The HTTP-trigger node accepts NFC.cool POSTs directly.</p>
</article>

<article class="feature-capability-card">
<h3>Make (formerly Integromat)</h3>
<p>Visual workflow builder with rich app coverage. Use the Webhooks module as the entry point for every NFC.cool scan.</p>
</article>

<article class="feature-capability-card">
<h3>IFTTT</h3>
<p>For simple "if this then that" routing. IFTTT's Webhooks service gives you a unique URL to drop into NFC.cool's webhook config.</p>
</article>

<article class="feature-capability-card">
<h3>Slack / Discord / Teams</h3>
<p>Point a webhook directly at a Slack incoming-webhook URL (or Discord/Teams equivalent) to ping a channel every time a tag is tapped.</p>
</article>

<article class="feature-capability-card">
<h3>Your own backend</h3>
<p>Any HTTPS endpoint that accepts a JSON POST works. See the [developer docs](/developers/) for payload schema and auth conventions.</p>
</article>

</div>

</section>

<section class="page-section">

## Common workflow patterns

- **Inventory + audit trail.** Tap a tag on an item, NFC.cool POSTs to a sheet or warehouse system; a row appears with timestamp + device + payload.
- **Lead capture at events.** Tap a tag on your booth banner, your CRM fires off a follow-up email automatically.
- **Smart-home triggers.** Tap a tag on the front door to mark "I'm home" - Home Assistant / Homey / Hubitat picks it up via webhook.
- **Asset tracking.** Maintenance staff tap tags on equipment to log inspections; backend builds the compliance log.
- **Conference check-ins.** Tap an attendee's NFC badge; the webhook updates your event platform in real time.

</section>

<section class="page-section">

## Ready to build?

The [developer docs](/developers/) cover the payload format, security headers, retry semantics, and example receivers in cURL, Node.js, and Python.

Got an integration partner in mind that should be listed here? <hello@nfc.cool>.

</section>
