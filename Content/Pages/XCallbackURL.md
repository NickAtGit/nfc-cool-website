---
title: "NFC.cool x-callback-url"
slug: "x-callback-url"
description: "Other apps and web pages can ask NFC.cool on iPhone to do something and send the result back, following the x-callback-url convention."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# NFC.cool x-callback-url

Other apps and web pages can ask NFC.cool on iPhone to do something and send the result back, following the [x-callback-url](https://x-callback-url.com) convention.

Webhooks, Shortcuts and URL schemes are on the [developers page](/developers/).

<a href="#read-uid" class="landing-cta-button">Read the docs</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/nfc-scan-tag.webp" alt="iPhone scanning an NFC tag" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section" id="read-uid">

## Read a tag's ID from your app or web page

A link asks NFC.cool to scan one tag and hand its UID back to you, and with `ndef=1` the tag's NDEF message too. It works from any web page or app on the iPhone, with nothing to set up beyond installing NFC.cool. The link follows the [x-callback-url](https://x-callback-url.com) convention. Reading tags for other apps and websites is part of NFC.cool Business, the company licence for NFC.cool on iPhone: [write to us](mailto:info@nfc.cool?subject=NFC.cool%20Business) for one.

```
https://nfc.cool/x-callback-url/read-uid?<parameters>
nfcforiphone://x-callback-url/read-uid?<parameters>
```

Both forms do the same. Prefer the `https` one: on an iPhone without NFC.cool it opens a page that says how to get it, instead of failing silently. Put it in a link the person taps; iOS doesn't open apps for links that a script follows by itself.

NFC.cool comes to the front, names who receives the tag's ID, and starts the scan. If a read-uid link is already open, the newer link takes it over, and the earlier caller hears `cancelled`.

### Parameters

<div class="page-cards-grid">

<article class="page-card">
<h3><code>x-get</code></h3>
<p>NFC.cool calls this URL in the background with the result as query parameters. Every outcome arrives here straight away, failures and cancels included.</p>
<p><strong>Required:</strong> <code>x-get</code>, <code>x-post</code> or <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-post</code></h3>
<p>NFC.cool POSTs the result here as JSON.</p>
<p><strong>Required:</strong> <code>x-get</code>, <code>x-post</code> or <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-success</code></h3>
<p>Opened after a successful read, with <code>uid</code>, <code>ndef</code> and <code>state</code> appended. Next to <code>x-get</code> or <code>x-post</code> it only gets <code>state</code>: the UID goes to the server the person was shown and nowhere else.</p>
<p><strong>Required:</strong> <code>x-get</code>, <code>x-post</code> or <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-error</code></h3>
<p>Opened when the person closes NFC.cool after a failure, with <code>errorCode</code>, <code>errorMessage</code> and <code>state</code>.</p>
<p><strong>Required:</strong> no</p>
</article>

<article class="page-card">
<h3><code>x-cancel</code></h3>
<p>Opened when the person cancels, with <code>state</code>.</p>
<p><strong>Required:</strong> no</p>
</article>

<article class="page-card">
<h3><code>state</code></h3>
<p>Any string, for example a one-time request ID. Returned unchanged with every result.</p>
<p><strong>Required:</strong> no, but recommended</p>
</article>

<article class="page-card">
<h3><code>ndef</code></h3>
<p><code>1</code> also reads the tag's NDEF message. Without it, nothing but the UID is read.</p>
<p><strong>Required:</strong> no</p>
</article>

</div>

Use `x-get` or `x-post`, not both. URL-encode every callback value.

Any web page can open this link, so NFC.cool only calls back to `https` URLs and to other apps' URL schemes, such as `yourapp://nfc-done`; `x-get` and `x-post` must be `https`. Plain `http`, `javascript:`, `data:`, `tel:`, NFC.cool's own schemes and system schemes that act by themselves (`shortcuts:`, `itms-services:`, `mailto:`, `App-Prefs:` and similar) are refused, and a link with any refused callback is ignored.

### The UID

Uppercase hexadecimal, no separators, most significant byte first. Its length tells the chip families apart:

<div class="page-cards-grid">

<article class="page-card">
<h3>NTAG, MIFARE Ultralight (ISO 14443-A)</h3>
<p>7 bytes</p>
<p><code>04A1B2C3D4E5F6</code></p>
</article>

<article class="page-card">
<h3>ICODE and other ISO 15693 tags</h3>
<p>8 bytes</p>
<p><code>E004015012345678</code></p>
</article>

</div>

ISO 15693 UIDs start with `E0`, in the order printed on the chip and shown by most readers.

### The NDEF message

With `ndef=1`, `ndef` holds the tag's raw NDEF message, the records without the TLV header, as Base64url without padding ([RFC 4648, section 5](https://www.rfc-editor.org/rfc/rfc4648#section-5)): `-` and `_` instead of `+` and `/`, and no `=`. It is left out when the tag holds no NDEF message.

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

Your URL is called as it is, with the result added after the parameters it already has. Every attempt gets exactly one call, so the page waiting for it can stop as soon as it arrives:

<div class="page-cards-grid">

<article class="page-card">
<h3><code>cancelled</code></h3>
<p>The person cancelled the scan or closed NFC.cool before reading a tag.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>No tag was found in time, or the tag couldn't be read.</p>
</article>

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>This iPhone has no NFC.cool Business access.</p>
</article>

</div>

After `cancelled` or `scan-failed` the person can try again, and a successful read then calls `x-get` again with the `uid`: treat the latest call for a `state` as the answer. Answer with any 2xx status. If a success call fails, NFC.cool offers to send it again.

### `x-post`

```
POST https://your-server.example/api/uid
Content-Type: application/json

{"uid":"04A1B2C3D4E5F6","state":"7f3c9a","readAt":"2026-11-19T09:30:00Z","ndef":"0QEFVAJkZUhp"}
```

Answer with any 2xx status within 20 seconds. Anything else counts as a failure: the person can send it again, and closing NFC.cool reports `delivery-failed` to `x-error`. Use `x-post` when the page that started the read can't be reopened by URL, for example a web view inside another app; the person goes back with the link iOS shows in the top-left corner.

NFC.cool sends no cookies with `x-get` or `x-post`. Recognize the request by the one-time `state` you put in the link.

### `x-error` codes

<div class="page-cards-grid">

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>This iPhone has no NFC.cool Business access.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>No tag was found in time, or the tag couldn't be read.</p>
</article>

<article class="page-card">
<h3><code>delivery-failed</code></h3>
<p>The <code>x-post</code> request failed.</p>
</article>

</div>

### Example

A page that waits for its own server, with the NDEF message too:

```html
<a href="https://nfc.cool/x-callback-url/read-uid?x-get=https%3A%2F%2Fexample.com%2Fnfc%3Fcode%3Dabc123&ndef=1&state=7f3c9a">
  Scan tag
</a>
```

</section>
