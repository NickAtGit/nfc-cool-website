---
title: "Destek ve İletişim"
slug: "contact"
description: "NFC.cool'a ulaş: e-posta desteği, sık sorulan sorular, iş birliği ve entegrasyon soruları için geliştiricinin doğrudan hattı ve sosyal medya hesapları."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Destek ve İletişim

Bize ulaşmanın en hızlı yolu e-posta. Her mesajı bizzat okuyor ve bir iş günü içinde yanıtlıyoruz.

<a href="mailto:info@nfc.cool?subject=NFC.cool%20Support" class="landing-cta-button">E-posta gönder</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/nfc-scan-tag.webp" alt="NFC tag okutan iPhone" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section landing-faq">

<div class="landing-container">

<h2 class="landing-section-title">Sık sorulan sorular</h2>

### Başlarken

<details class="faq-item">
<summary>Uygulamalar ücretsiz mi?</summary>
<p>Evet, iki uygulama da App Store ve Google Play'de ücretsiz. Uygulama içinden birkaç gelişmiş akış açılabiliyor ama temel özelliklerin hepsi (NFC, QR, belge, 3B ve kartvizit) ücretsiz.</p>
</details>

<details class="faq-item">
<summary>Telefonumda NFC var mı?</summary>
<p>iPhone 7 ve sonrası tüm iPhone'larda NFC var; iPhone XS ve sonrası ise uygulama açmadan, kilit ekranından tag okuyabiliyor. Android tarafında 2015 sonrası telefonların çoğunda NFC var, cihazının özelliklerine bakabilirsin. Cihazın uyumlu değilse NFC.cool bunu ilk açılışta söyler.</p>
</details>

<details class="faq-item">
<summary>iOS ve Android uygulamaları arasındaki fark ne?</summary>
<p>iPhone uygulaması tam bir tarama araç seti: NFC, QR ve barkod, belge (OCR ile), 3B ve oda tarama. Android uygulaması NFC okuma ve yazmaya odaklanıyor. Diğer araçlar Android yol haritasında. Dijital kartvizit ise iki platformda da kendi uygulaması.</p>
</details>

<details class="faq-item">
<summary>Mac, iPad ya da Apple Watch sürümü var mı?</summary>
<p>NFC.cool Tools iPhone ve iPad'de, ayrıca Mac'te de çalışıyor: Apple Silicon Mac'lerde Mac uyumlu iPad uygulaması olarak sunuluyor (<a href="/tr/blog/nfc-cool-comes-to-mac/">NFC.cool'un Mac'e gelişini oku</a>). 3B ve oda tarama LiDAR'lı iPad ister. Apple Watch uygulaması yok. NFC.cool Business Card yalnızca iOS ve Android'de var.</p>
</details>

<details class="faq-item">
<summary>Dijital kartvizit ayrı bir uygulama mı?</summary>
<p>Evet, NFC.cool Business Card hem iPhone'da hem Android'de ayrı bir uygulama. NFC.cool Tools taramaya odaklı kalsın diye kartın kendi uygulaması var: <a href="https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=web-contact-tr&mt=8" target="_blank" rel="noopener nofollow sponsored">App Store</a> ve <a href="https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-contact-tr" target="_blank" rel="noopener nofollow sponsored">Google Play</a>.</p>
</details>

### Cihazlar, tag'ler ve özellikler

<details class="faq-item">
<summary>Hangi NFC tag'leri almalıyım?</summary>
<p>iPhone için en iyi sonucu NTAG serisi Tip 2 tag'ler (NTAG213/215/216) veriyor. NFC.cool, NFC Forum belirtiminin tamamını (Tip 1-5) destekliyor: MIFARE Classic, MIFARE Ultralight, MIFARE DESFire, ISO 14443, ISO 15693 ve FeliCa dahil. Aşırı ucuz etiketlerden uzak dur, anten kalitesi fark yaratıyor.</p>
</details>

<details class="faq-item">
<summary>3B ve oda tarama için özel bir iPhone gerekiyor mu?</summary>
<p>Hem 3B nesne tarama hem oda tarama Apple'ın LiDAR algılayıcısını kullanıyor: yani iPhone 12 Pro ve sonrası Pro modeller, ayrıca 2020 ve sonrası iPad Pro. Apple'ın Object Capture'ı da RoomPlan'ı da LiDAR istiyor, bu yüzden ikisi de Pro olmayan iPhone'da çalışmıyor.</p>
</details>

<details class="faq-item">
<summary>OCR hangi dilleri destekliyor?</summary>
<p>Belge tarama Apple'ın Vision çerçevesini kullanıyor; şu anda İngilizce, Fransızca, İtalyanca, Almanca, İspanyolca, Portekizce ve Basitleştirilmiş Çince tanıyor. El yazısı tanıma iOS 16 ve sonrasında destekleniyor.</p>
</details>

<details class="faq-item">
<summary>NFC tag'imi okuyamıyorum, neye bakmalıyım?</summary>
<p>Önce iPhone'unun iPhone 7 ya da sonrası olduğundan emin ol. Telefonu tag'e sabit tutarken üst kenarını çipe yakın getir. Tag yepyeniyse biçimlendirilmiş olduğunu doğrula; NFC.cool boş tag'leri senin için biçimlendirebilir.</p>
</details>

### Gizlilik ve verilerin

<details class="faq-item">
<summary>Verilerim nerede saklanıyor?</summary>
<p>Varsayılan olarak her şey cihazında kalıyor: okumalar, yazdığın tag'ler, kişiler, belgeler, 3B modeller. NFC.cool'a hiçbir şey yüklenmiyor. Tarama verisini kendi sunucuna iletmek istersen webhook'ları açabilirsin; o durumda bile NFC.cool veriyi hiç görmüyor.</p>
</details>

<details class="faq-item">
<summary>GDPR ile uyumlu mu?</summary>
<p>NFC.cool Tools'un cihazda çalışan özellikleri veriyi orada işliyor, yani NFC.cool'a kişisel veri aktarımı olmuyor. Sitenin kendisi çerezsiz. Tek üçüncü taraf veri akışı bülten (Mailjet) ve form kendi sunucumuzda olduğu için ziyarette çerez düşmüyor. Ayrıntılı döküm için <a href="/privacy/">gizlilik politikasına</a> bak. NFC.cool Business Card'da durum farklı: uygulama hesabını ve kartlarını sunucularımızda saklıyor. Ayrıntılar uygulamanın kendi <a href="/privacy/business-card/">gizlilik politikasında</a>.</p>
</details>

<details class="faq-item">
<summary>Verilerimi iki iPhone arasında nasıl taşırım?</summary>
<p>NFC.cool verisi uygulama alanında duruyor. Eski cihazın iCloud yedeğini al, yeni cihazda geri yükle: okumaların, yazdığın tag'ler, kartvizitin ve webhook ayarların seninle birlikte gelir.</p>
</details>

### Ödeme ve iletişim

<details class="faq-item">
<summary>Aboneliğimi nasıl iptal ederim?</summary>
<p>Abonelikler App Store ya da Google Play üzerinden faturalanıyor, dolayısıyla iptali de bizden değil oradan yapıyorsun. iOS'ta <a href="https://support.apple.com/118428" target="_blank" rel="noopener">Apple'ın abonelik iptal adımlarını</a> izle. Android'de <a href="https://support.google.com/googleplay/answer/7018481" target="_blank" rel="noopener">Google Play'in adımlarını</a> izle.</p>
</details>

<details class="faq-item">
<summary>Nasıl para iadesi alırım?</summary>
<p>İadeleri biz değil, Apple ya da Google yürütüyor. iOS'ta <a href="https://support.apple.com/118223" target="_blank" rel="noopener">Apple'ın iade sayfasından</a> talep aç. Android'de <a href="https://support.google.com/googleplay/workflow/9813244" target="_blank" rel="noopener">Google Play'in iade sürecini</a> kullan.</p>
</details>

<details class="faq-item">
<summary>Özellik önerisi ya da bir kaygı nasıl iletirim?</summary>
<p>İkisi için de <a href="mailto:info@nfc.cool?subject=NFC.cool%20Support">bize yaz</a>. Her özellik önerisini kaydediyoruz ve bunlar yol haritasını doğrudan besliyor. Gizlilik ya da güvenlik kaygılarına 5 iş günü içinde yanıt veriyoruz.</p>
</details>

</div>

</section>

<section class="page-section">

## Sosyal Medya

<div class="contact-social-grid">

<a href="https://www.instagram.com/nfc.cool" class="contact-social-card" target="_blank" rel="noopener">
<span class="contact-social-name">Instagram</span>
<span class="contact-social-handle">@nfc.cool</span>
</a>

<a href="https://www.tiktok.com/@nfc.cool" class="contact-social-card" target="_blank" rel="noopener">
<span class="contact-social-name">TikTok</span>
<span class="contact-social-handle">@nfc.cool</span>
</a>

<a href="https://www.youtube.com/@nfc.cool" class="contact-social-card" target="_blank" rel="noopener">
<span class="contact-social-name">YouTube</span>
<span class="contact-social-handle">@nfc.cool</span>
</a>

<a href="https://x.com/nfc_cool" class="contact-social-card" target="_blank" rel="noopener">
<span class="contact-social-name">X</span>
<span class="contact-social-handle">@nfc_cool</span>
</a>

<a href="https://www.linkedin.com/company/nfc-cool" class="contact-social-card" target="_blank" rel="noopener">
<span class="contact-social-name">LinkedIn</span>
<span class="contact-social-handle">nfc-cool</span>
</a>

<a href="https://bsky.app/profile/nfc.cool" class="contact-social-card" target="_blank" rel="noopener">
<span class="contact-social-name">Bluesky</span>
<span class="contact-social-handle">@nfc.cool</span>
</a>

<a href="https://www.threads.net/@nfc.cool" class="contact-social-card" target="_blank" rel="noopener">
<span class="contact-social-name">Threads</span>
<span class="contact-social-handle">@nfc.cool</span>
</a>

<a href="https://www.facebook.com/NFC.cool/" class="contact-social-card" target="_blank" rel="noopener">
<span class="contact-social-name">Facebook</span>
<span class="contact-social-handle">NFC.cool</span>
</a>

<a href="https://indieapps.space/@NFC" class="contact-social-card" target="_blank" rel="noopener">
<span class="contact-social-name">Mastodon</span>
<span class="contact-social-handle">@NFC</span>
</a>

<a href="/feed.xml" class="contact-social-card">
<span class="contact-social-name">RSS</span>
<span class="contact-social-handle">feed.xml</span>
</a>

</div>

</section>
