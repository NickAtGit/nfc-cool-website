---
title: "NFC.cool Business licence"
slug: "business-licence"
description: "Join your company's NFC.cool Business licence: install NFC.cool on the iPhone, then open the link from your administrator again."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Join your company's NFC.cool Business licence

Install NFC.cool on this iPhone, then open the link from your administrator again.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-business-licence-en&mt=8" class="landing-store-button is-apple" aria-label="Download on the App Store" target="_blank" rel="noopener">
<img src="/assets/theme/images/AppStore.svg" alt="Download on the App Store" width="156" height="52"/>
</a>
</div>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/nfc-scan-tag.webp" alt="iPhone scanning an NFC tag" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<script>
  // On an iPhone with NFC.cool the link opens the app and this page never loads. Elsewhere Keel's page for the
  // link names the company; the code is 16 random bytes as URL-safe Base64.
  (function () {
    var code = new URLSearchParams(location.search).get("code");
    if (code && /^[A-Za-z0-9_-]{22}$/.test(code)) {
      location.replace("https://keel.nfc.cool/business/l/" + code);
    }
  })();
</script>
