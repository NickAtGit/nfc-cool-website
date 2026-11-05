---
title: "Çevrimiçi NFC Okuyucu"
slug: "online-nfc-reader"
description: "NFC tag'leri doğrudan tarayıcında oku ve yaz. Uygulama yok, kayıt yok. Tag'i okut, üstünde ne varsa gör ya da bir bağlantı veya metin yaz. Ücretsiz, Android'de Chrome'da çalışır; iPhone kullananlar ücretsiz NFC.cool uygulamasını kullanır."
image: "/assets/images/og-landing.webp"
---

<div style="display:none" aria-hidden="true"><svg><symbol id="nfc-icon-wave" viewBox="0 0 24 24"><path fill="currentColor" d="M8.77 12C8.77 10.18 8.14 8.48 7.02 7.15C6.29 6.29 5.22 7.27 5.77 7.97C6.84 9.32 7.25 10.44 7.25 12C7.25 13.55 6.84 14.67 5.77 16.02C5.23 16.72 6.3 17.69 7.02 16.83C8.14 15.51 8.77 13.82 8.77 12ZM13.56 12C13.56 9.22 12.69 6.61 11.12 4.5C10.41 3.56 9.18 4.47 9.84 5.33C11.28 7.22 12.05 9.53 12.05 12C12.05 14.46 11.28 16.77 9.84 18.66C9.18 19.53 10.41 20.44 11.12 19.48C12.69 17.37 13.56 14.77 13.56 12ZM18.38 12C18.38 8.26 17.21 4.78 15.14 1.89C14.5 1 13.2 1.78 13.89 2.71C15.83 5.37 16.86 8.58 16.86 12C16.86 15.42 15.82 18.62 13.89 21.28C13.22 22.2 14.47 23.02 15.14 22.1C17.21 19.21 18.38 15.73 18.38 12Z"/></symbol><symbol id="nfc-icon-android" viewBox="0 0 24 24" fill="none"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></symbol><symbol id="nfc-icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17.5 19 7"/></symbol><symbol id="nfc-icon-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></symbol></svg></div>

<script type="application/json" id="nfc-i18n">{
"rec.text": "Metin",
"rec.link": "Bağlantı",
"rec.phone": "Telefon",
"rec.email": "E-posta",
"rec.sms": "SMS",
"rec.location": "Konum",
"rec.contact": "Kişi",
"rec.contactCard": "Kişi kartı",
"rec.wifi": "Wi-Fi",
"rec.wifiNetwork": "Wi-Fi ağı",
"rec.smartPoster": "Smart Poster",
"rec.app": "Uygulama",
"rec.empty": "Boş",
"rec.emptyValue": "Bu kayıtta veri yok.",
"rec.data": "Veri",
"rec.generic": "Kayıt",
"rec.undecodable": "(çözülemedi)",
"read.unavailable": "yok",
"read.noRecords": "Tag okunabiliyor ama içinde kayıt yok.",
"unit.bytes": "bayt",
"tech.records": "Kayıtlar",
"tech.total": "Toplam içerik",
"tech.record": "Kayıt",
"tech.type": "Tür",
"tech.media": "Ortam türü",
"tech.id": "Kayıt kimliği",
"tech.encoding": "Kodlama",
"tech.language": "Dil",
"tech.size": "Boyut",
"tech.note1": "Tarayıcı çip modelini, bellek boyutunu ve kilit durumunu göremez. ",
"tech.appLink": "NFC.cool uygulaması",
"tech.note2": " bunların hepsini, üstüne çipin ham belleğini de okur.",
"summary.contact": "Kişi: ",
"summary.wifi": "Wi-Fi: ",
"valid.link": "Tag'e yazılacak bağlantıyı gir.",
"valid.linkInvalid": "Bu geçerli bir bağlantıya benzemiyor.",
"valid.text": "Tag'e yazılacak metni gir.",
"valid.phone": "Telefon numarası gir.",
"valid.email": "E-posta adresi gir.",
"valid.latlng": "Hem enlemi hem boylamı gir.",
"valid.latlngNum": "Enlem ve boylam sayı olmalı.",
"valid.contact": "Kişi için ad gir.",
"valid.wifiSsid": "Wi-Fi ağının adını gir.",
"valid.wifiPass": "Wi-Fi parolasını gir.",
"err.readingError": "Bu tag'i okuyamadım. Telefonunun üst kısmına düz tutup tekrar dene.",
"err.blocked": "NFC erişimi engellendi. Bu site için NFC'ye izin ver, sonra tekrar dene.",
"err.notSupported": "Bu telefon NFC çipine erişemiyor. Android ayarlarından NFC'nin açık olduğunu denetle.",
"err.notReadable": "Android NFC'yi açamadı. NFC'nin açık olduğundan emin ol, sonra tekrar dene.",
"err.write": "Tag yazılamadı. Kilitli ya da fazla küçük olabilir, ya da çok erken uzaklaştı.",
"err.read": "Okuma beklenmedik şekilde durdu. Telefonuna bir tag tut ve tekrar dene."
}</script>

<section class="page-hero nfc-reader-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Çevrimiçi NFC Okuyucu

Bunu, NFC tag'ini doğrudan tarayıcından okuyabilesin diye yaptım: uygulama yok, kayıt yok. *Tag Okut*'a dokun, telefonunu tag'e tut, içeriği hemen belirsin. *Yaz* sekmesine geçip tag'e bağlantı ya da metin de yazabilirsin. Her şey senin telefonunda çalışır ve okuttuğun hiçbir şey oradan çıkmaz.

<div class="nfc-hero-reqs"><span class="platform-pill is-android"><svg class="platform-pill-icon" viewBox="2 2 20 20" fill="none" aria-hidden="true"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></svg><span class="platform-pill-label">Android'de Chrome</span></span></div>

</div>

<div class="page-hero-visual">

<div id="nfc-reader-app" class="nfc-reader" data-state="desktop" data-mode="read" data-write-type="url">
<div class="nfc-phone">
<div class="nfc-phone-screen">
<div class="nfc-reader-tabs" role="tablist" aria-label="Okuyucu modu">
<button type="button" class="nfc-reader-tab" data-nfc-tab="read" role="tab" aria-selected="true">Oku</button>
<button type="button" class="nfc-reader-tab" data-nfc-tab="write" role="tab" aria-selected="false">Yaz</button>
</div>
<div class="nfc-reader-body">
<div class="nfc-reader-panel" data-panel="read-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">NFC tag oku</p>
<p class="nfc-reader-lead">Düğmeye dokun, sonra tag'i telefonunun üst kısmına tut. İçinde ne varsa göstereyim.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-scan><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>NFC oku</span></button>
<p class="nfc-reader-fineprint">Daha fazla NFC işlevi olan yerel bir deneyim mi istiyorsun? <a href="/tr/features/nfc-reader-writer/">NFC.cool uygulamasını edin!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="scanning">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">NFC oku</p>
<p class="nfc-reader-lead">NFC tag'ini telefonunun arka üst kısmına tut.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Vazgeç</span></button>
</div>
<div class="nfc-reader-panel" data-panel="result">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Tag okundu</span>
<ul class="nfc-reader-records" data-nfc-records></ul>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Seri numarası</span><span class="nfc-reader-value" data-nfc-serial></span></div>
<details class="nfc-reader-details"><summary>Teknik ayrıntılar</summary><div class="nfc-reader-tech" data-nfc-tech></div></details>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>NFC oku</span></button>
</div>
<div class="nfc-reader-panel" data-panel="write-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">NFC tag yaz</p>
<select class="nfc-reader-select" data-nfc-type-select aria-label="Tag'e ne yazılacak">
<optgroup label="Temel">
<option value="link">Bağlantı</option>
<option value="text">Metin</option>
</optgroup>
<optgroup label="Kişi">
<option value="phone">Telefon numarası</option>
<option value="email">E-posta</option>
<option value="sms">SMS mesajı</option>
<option value="contact">Kişi kartı</option>
</optgroup>
<optgroup label="Ağ">
<option value="wifi">Wi-Fi ağı</option>
<option value="location">Konum</option>
</optgroup>
</select>
<div class="nfc-reader-form" data-nfc-form>
<div class="nfc-reader-fields" data-nfc-fields="link">
<input type="url" class="nfc-reader-input" data-k="url" placeholder="https://ornek.com" aria-label="Yazılacak bağlantı"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="text" hidden>
<textarea class="nfc-reader-input nfc-reader-textarea" data-k="text" rows="3" placeholder="Metnini buraya yaz" aria-label="Yazılacak metin"></textarea>
</div>
<div class="nfc-reader-fields" data-nfc-fields="phone" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Telefon numarası" aria-label="Telefon numarası"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="email" hidden>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="E-posta adresi" aria-label="E-posta adresi"/>
<input type="text" class="nfc-reader-input" data-k="subject" placeholder="Konu (isteğe bağlı)" aria-label="E-posta konusu, isteğe bağlı"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="sms" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Telefon numarası" aria-label="SMS telefon numarası"/>
<input type="text" class="nfc-reader-input" data-k="body" placeholder="Mesaj (isteğe bağlı)" aria-label="SMS mesajı, isteğe bağlı"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="location" hidden>
<input type="text" class="nfc-reader-input" data-k="lat" inputmode="decimal" placeholder="Enlem" aria-label="Enlem"/>
<input type="text" class="nfc-reader-input" data-k="lng" inputmode="decimal" placeholder="Boylam" aria-label="Boylam"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="contact" hidden>
<input type="text" class="nfc-reader-input" data-k="name" placeholder="Ad soyad" aria-label="Kişinin adı"/>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Telefon (isteğe bağlı)" aria-label="Kişinin telefonu, isteğe bağlı"/>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="E-posta (isteğe bağlı)" aria-label="Kişinin e-postası, isteğe bağlı"/>
<input type="text" class="nfc-reader-input" data-k="org" placeholder="Kurum (isteğe bağlı)" aria-label="Kişinin kurumu, isteğe bağlı"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="wifi" hidden>
<input type="text" class="nfc-reader-input" data-k="ssid" placeholder="Ağ adı (SSID)" aria-label="Wi-Fi ağının adı"/>
<input type="text" class="nfc-reader-input" data-k="password" placeholder="Parola" aria-label="Wi-Fi parolası"/>
<select class="nfc-reader-select" data-k="security" aria-label="Wi-Fi güvenliği">
<option value="wpa">WPA / WPA2</option>
<option value="wep">WEP</option>
<option value="open">Açık (parolasız)</option>
</select>
</div>
</div>
<p class="nfc-reader-input-error" data-nfc-input-error></p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Tag'e yaz</span></button>
<p class="nfc-reader-fineprint">Daha fazla NFC işlevi olan yerel bir deneyim mi istiyorsun? <a href="/tr/features/nfc-reader-writer/">NFC.cool uygulamasını edin!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="writing">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">NFC yaz</p>
<p class="nfc-reader-lead">NFC tag'ini telefonunun arka üst kısmına tut.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Vazgeç</span></button>
</div>
<div class="nfc-reader-panel" data-panel="written">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Tag yazıldı</span>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Tag'e yazılan</span><span class="nfc-reader-value" data-nfc-written></span></div>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Başka tag yaz</span></button>
</div>
<div class="nfc-reader-panel" data-panel="error">
<span class="nfc-reader-badge is-error">Bir şeyler ters gitti</span>
<p class="nfc-reader-lead" data-nfc-error-msg>Bir şeyler ters gitti.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-retry><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Tekrar dene</span></button>
</div>
<div class="nfc-reader-panel" data-panel="ios">
<span class="nfc-reader-badge is-muted">iPhone</span>
<p class="nfc-reader-title">iPhone'da tarayıcıdan NFC kullanılamıyor</p>
<p class="nfc-reader-lead">Apple hiçbir tarayıcının NFC çipine erişmesine izin vermiyor. iPhone'da tag okuyup yazabilesin diye ücretsiz NFC.cool uygulamasını yaptım.</p>
<div class="landing-store-buttons"><a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-tr&mt=8" class="landing-store-button is-apple" aria-label="App Store'dan indir" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/AppStore.svg" alt="NFC.cool'u App Store'dan indir" width="156" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="android-other">
<span class="nfc-reader-badge is-muted">Chrome'da aç</span>
<p class="nfc-reader-title">Burada okutmak için Chrome'a geç</p>
<p class="nfc-reader-lead">Android'desin, yani tarayıcıdan okuma ve yazma çalışıyor; yalnızca Chrome gerekiyor. Bu sayfayı Chrome'da aç, okuyucu devreye girsin.</p>
<div class="landing-store-buttons"><a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-tr" class="landing-store-button is-google" aria-label="Google Play'den edin" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/GooglePlay.svg" alt="NFC.cool'u Google Play'den edin" width="173" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="desktop">
<span class="nfc-reader-badge is-muted">Yalnızca Android + Chrome</span>
<img class="nfc-reader-qr" src="/assets/images/nfc-reader-qr.svg" alt="Bu sayfayı telefonunda açan QR kod" width="188" height="188"/>
<p class="nfc-reader-lead">Okuyucuyu telefonunda açmak için bunu bir Android telefonla tara. Tarayıcıdan NFC, Android'de Chrome istiyor.</p>
<p class="nfc-reader-fineprint">iPhone'da mısın? <a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-tr&mt=8" target="_blank" rel="noopener nofollow sponsored">NFC.cool uygulamasını edin</a>.</p>
</div>
</div>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## NFC.cool'u ücretsiz&nbsp;indir

Uygulamanın tamamı iPhone ve Android'de her NFC tag'ini okur ve yazar.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-hero-ios-tr&mt=8" class="landing-store-button is-apple" aria-label="App Store'dan indir" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="NFC.cool'u App Store'dan indir" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-hero-android-tr" class="landing-store-button is-google" aria-label="Google Play'den edin" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="NFC.cool'u Google Play'den edin" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## Nasıl çalışıyor

<div class="page-cards-grid">

<article class="page-card nfc-step">
<span class="landing-feature-num">01</span>
<h3>Android telefonda aç</h3>
<p>Bu sayfayı bir Android telefonda Chrome'la aç. Chrome'da Web NFC diye bir özellik var; bir web sitesinin telefonun NFC çipiyle konuşmasını sağlıyor. Bu sayfanın tüm motoru o.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">02</span>
<h3>Oku ya da Yaz'ı seç</h3>
<p>Okuma, tag'de saklanan her şeyi gösterir. Yazma ise tag'e bağlantı ya da kısa bir metin koyar. Chrome'dan NFC iznini ilk seferde istiyorum, o da yanıtını hatırlıyor.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">03</span>
<h3>Tag'i telefonuna tut</h3>
<p>Tag'i telefonunun üst kısmına değdir. Çözme ya da yazma işini orada, senin cihazında yapıyorum: ben hiç görmüyorum, hiçbir şey yüklenmiyor, hiçbir şey saklanmıyor.</p>
</article>

</div>

</section>

<section class="page-section">

## NFC tag'inden neler okunur

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 14.5 14.5 9.5"/><path d="M11 6.5 12.4 5a3.8 3.8 0 0 1 5.4 5.4l-1.5 1.5"/><path d="M13 17.5 11.6 19a3.8 3.8 0 0 1-5.4-5.4l1.5-1.5"/></svg></span>
<h3>Bağlantılar ve adresler</h3>
<p>En sık rastlanan tag içeriği: bir sayfayı, profili ya da menüyü açan web adresi. Dokunmadan önce tam olarak nereye gittiğini görebilesin diye bağlantının tamamını gösteriyorum.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 7h14"/><path d="M5 12h14"/><path d="M5 17h9"/></svg></span>
<h3>Düz metin</h3>
<p>Notlar, yönergeler, kimlik numaraları ya da metin kaydı olarak saklanan kısa mesajlar. Metni ve dilini doğrudan çipten çözüyorum.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4 4 8l8 4 8-4-8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/></svg></span>
<h3>Diğer kayıtlar</h3>
<p>Wi-Fi bilgileri, kişi kartları ve uygulamaya özel veriler türü belirtilmiş kayıtlar olarak görünür. Tag'in her okumada aynı kalan benzersiz seri numarasını da görürsün.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Boş ya da kilitli tag'ler</h3>
<p>Boş tag hiç kayıt olmadan temiz okunur; yazmadan önce yeni tag'i denetlemek için kullanışlı. Kilitli tag'ler de türünü ve seri numarasını yine bildirir.</p>
</article>

</div>

</section>

<section class="page-section">

## Okuyup yazmaktan fazlasını mı istiyorsun?

Bu sayfadaki okuyucu gündelik işleri görür: tag oku, sık kullanılan verileri yaz. Çoğu kişi için hikaye burada biter, zaten tarayıcının Web NFC arayüzü de tam bu noktada durur (düz NDEF kayıtları, yalnızca Android Chrome). **NFC.cool uygulaması** bu sayfadaki her şeyi yapar, sonra tarayıcının gidemediği yere gider:

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Tag'leri kilitle, biçimlendir, koru</h3>
<p>Tag'i kilitle ki içeriği bir daha değişmesin, birini silip boşalt ya da parolayla koru ki yalnızca senin cihazların üzerine yazabilsin.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg></span>
<h3>Gizli veriyi NFC Safe ile şifrele</h3>
<p>NFC Safe gizli veriyi AES-256 ile çipin üstüne şifreler, böylece tag uygulama dışında her şeye karışık veri olarak görünür. <a href="/tr/blog/nfc-safe-encrypted-secrets/">NFC Safe nasıl çalışır</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"/></svg></span>
<h3>Okutunca ne olacağını otomatikleştir</h3>
<p>Bir tag webhook tetikleyebilir, iOS kısayolu çalıştırabilir, içeriğini sesli okuyabilir ya da kaç kez okutulduğunu sayabilir. <a href="/tr/blog/count-nfc-tag-scans/">NFC tag okumaları nasıl sayılır</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"/></svg></span>
<h3>Tag'leri kopyala, sıfırla, incele</h3>
<p>Tag'i kopyala, ham çip belleğini dök ve tanımla ya da NFC ile kilitlenmiş donanımları yeniden programla: <a href="/tr/blog/openprinttag-read-write-nfc-spools-phone/">3B yazıcı filament makaraları</a> ve <a href="/tr/blog/reset-sonicare-brush-head-nfc/">elektrikli diş fırçası başlıkları</a> gibi.</p>
</article>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## iPhone'da NFC için uygulama gerekiyor

Apple, iOS'taki her tarayıcıda NFC'yi kapatıyor; bu yüzden hiçbir web sitesi iPhone ya da iPad'de tag okuyup yazamaz. NFC.cool uygulaması bunu Android'deki kadar iyi biçimde, yerel olarak yapar.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-tr&mt=8" class="landing-store-button is-apple" aria-label="App Store'dan indir" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="NFC.cool'u App Store'dan indir" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-tr" class="landing-store-button is-google" aria-label="Google Play'den edin" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="NFC.cool'u Google Play'den edin" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section landing-faq">

<div class="landing-container">

<h2 class="landing-section-title">Çevrimiçi NFC okuyucu hakkında sık sorulanlar</h2>

<details class="faq-item">
<summary>Uygulama olmadan NFC tag okuyup yazabilir miyim?</summary>
<p>Evet, Android telefonda Chrome'la. Sayfa tarayıcının yerleşik Web NFC'sini kullanıyor, yani kurulacak bir şey yok. Tag okumak için Okut'a dokun ya da Yaz sekmesinden tag'e bağlantı, metin, kişi, Wi-Fi ağı ve dahasını koy.</p>
</details>

<details class="faq-item">
<summary>Tag'e Wi-Fi ağı ya da kişi kartı yazabilir miyim?</summary>
<p>Evet. Yaz açılır menüsünden Wi-Fi ağı ya da Kişi kartı'nı seç ve alanları doldur. Wi-Fi tag'i Android telefonlara ağa katılmayı önerir; kişi tag'i ise Android telefonların kaydetmeyi teklif ettiği standart bir vCard tutar. Yazdıktan sonra güncelleyebileceğin bir kart mı istiyorsun? <a href="/tr/business-card/">NFC.cool Business Card</a> tag'e bağlantı koyar, böylece bilgilerini sonradan düzenleyebilirsin.</p>
</details>

<details class="faq-item">
<summary>iPhone'da çalışıyor mu?</summary>
<p>Hayır. Apple, iOS'taki her tarayıcıda NFC'yi kapatıyor; bu yüzden hiçbir web sitesi iPhone ya da iPad'de tag okuyup yazamaz. Onun yerine iPhone'da ücretsiz NFC.cool uygulaması bu işi görüyor.</p>
</details>

<details class="faq-item">
<summary>Hangi tarayıcılar destekleniyor?</summary>
<p>Web NFC yalnızca Android'de Chrome ve diğer Chromium tarayıcılarında çalışıyor. Masaüstü ve iOS tarayıcıları desteklemiyor; seninki desteklemiyorsa sayfa bunun yerine ne yapman gerektiğini gösteriyor.</p>
</details>

<details class="faq-item">
<summary>Çevrimiçi NFC okuyucu ücretsiz mi?</summary>
<p>Tamamen ücretsiz: kayıt yok, okuma sınırı yok. Tag'ler kendi cihazında okunup yazılıyor ve hiçbir şey yüklenmiyor.</p>
</details>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## NFC tag'leri her yerde oku ve yaz

Bu sayfa tarayıcıdaki temel işleri kapsıyor. Ücretsiz NFC.cool uygulaması daha ileri gidiyor: her tag'i okuyor ve 25'ten fazla veri türü yazıyor. Bağlantılar, Wi-Fi, kişiler, kısayollar ve dahası, hem iPhone'da hem Android'de. Uygulamayı ben yazıyor, ben sürdürüyorum.

<div class="tap-cta-buttons">
<a href="/tr/features/nfc-reader-writer/" class="landing-cta-button">NFC Okuma ve Yazma'yı gör</a>
<a href="/tr/blog/nfc-tags-beginners-guide/" class="landing-cta-button">NFC tag'lere yeni misin? Buradan başla</a>
</div>

</section>
