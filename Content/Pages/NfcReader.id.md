---
title: "Pembaca NFC Online"
slug: "online-nfc-reader"
description: "Baca dan tulis tag NFC langsung dari browser Anda - tanpa aplikasi, tanpa daftar. Pindai tag untuk melihat isinya, atau tulis tautan atau teks ke dalamnya. Gratis, berjalan di Chrome di Android; pengguna iPhone mendapatkan aplikasi NFC.cool gratis."
image: "/assets/images/og-landing.webp"
---

<div style="display:none" aria-hidden="true"><svg><symbol id="nfc-icon-wave" viewBox="0 0 24 24"><path fill="currentColor" d="M8.77 12C8.77 10.18 8.14 8.48 7.02 7.15C6.29 6.29 5.22 7.27 5.77 7.97C6.84 9.32 7.25 10.44 7.25 12C7.25 13.55 6.84 14.67 5.77 16.02C5.23 16.72 6.3 17.69 7.02 16.83C8.14 15.51 8.77 13.82 8.77 12ZM13.56 12C13.56 9.22 12.69 6.61 11.12 4.5C10.41 3.56 9.18 4.47 9.84 5.33C11.28 7.22 12.05 9.53 12.05 12C12.05 14.46 11.28 16.77 9.84 18.66C9.18 19.53 10.41 20.44 11.12 19.48C12.69 17.37 13.56 14.77 13.56 12ZM18.38 12C18.38 8.26 17.21 4.78 15.14 1.89C14.5 1 13.2 1.78 13.89 2.71C15.83 5.37 16.86 8.58 16.86 12C16.86 15.42 15.82 18.62 13.89 21.28C13.22 22.2 14.47 23.02 15.14 22.1C17.21 19.21 18.38 15.73 18.38 12Z"/></symbol><symbol id="nfc-icon-android" viewBox="0 0 24 24" fill="none"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></symbol><symbol id="nfc-icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17.5 19 7"/></symbol><symbol id="nfc-icon-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></symbol></svg></div>

<section class="page-hero nfc-reader-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Pembaca NFC online

Saya membuat ini agar Anda bisa membaca tag NFC langsung dari browser - tanpa aplikasi, tanpa daftar. Ketuk *Pindai Tag*, dekatkan ponsel ke tag, dan isinya langsung muncul. Beralih ke tab *Tulis* dan Anda bisa menyimpan tautan atau teks ke tag juga. Semuanya berjalan di ponsel Anda, dan tidak ada yang Anda pindai pernah meninggalkannya.

<div class="nfc-hero-reqs"><span class="platform-pill is-android"><svg class="platform-pill-icon" viewBox="2 2 20 20" fill="none" aria-hidden="true"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></svg><span class="platform-pill-label">Chrome on Android</span></span></div>

</div>

<div class="page-hero-visual">

<div id="nfc-reader-app" class="nfc-reader" data-state="desktop" data-mode="read" data-write-type="url">
<div class="nfc-phone">
<div class="nfc-phone-screen">
<div class="nfc-reader-tabs" role="tablist" aria-label="Mode pembaca">
<button type="button" class="nfc-reader-tab" data-nfc-tab="read" role="tab" aria-selected="true">Baca</button>
<button type="button" class="nfc-reader-tab" data-nfc-tab="write" role="tab" aria-selected="false">Tulis</button>
</div>
<div class="nfc-reader-body">
<div class="nfc-reader-panel" data-panel="read-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">Baca tag NFC</p>
<p class="nfc-reader-lead">Ketuk tombol, lalu dekatkan tag ke bagian atas ponsel Anda. Saya akan menampilkan isinya.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-scan><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Baca NFC</span></button>
<p class="nfc-reader-fineprint">Ingin pengalaman NFC native dengan lebih banyak fungsi? <a href="/features/nfc-reader-writer/">Dapatkan aplikasi NFC.cool!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="scanning">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">Membaca NFC</p>
<p class="nfc-reader-lead">Dekatkan tag NFC ke bagian atas belakang ponsel Anda.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Batal</span></button>
</div>
<div class="nfc-reader-panel" data-panel="result">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Tag berhasil dibaca</span>
<ul class="nfc-reader-records" data-nfc-records></ul>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Nomor seri</span><span class="nfc-reader-value" data-nfc-serial></span></div>
<details class="nfc-reader-details"><summary>Detail teknis</summary><div class="nfc-reader-tech" data-nfc-tech></div></details>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Baca NFC</span></button>
</div>
<div class="nfc-reader-panel" data-panel="write-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">Tulis tag NFC</p>
<select class="nfc-reader-select" data-nfc-type-select aria-label="Apa yang akan ditulis ke tag">
<optgroup label="Dasar">
<option value="link">Tautan</option>
<option value="text">Teks</option>
</optgroup>
<optgroup label="Kontak">
<option value="phone">Nomor telepon</option>
<option value="email">Email</option>
<option value="sms">Pesan SMS</option>
<option value="contact">Kartu kontak</option>
</optgroup>
<optgroup label="Jaringan">
<option value="wifi">Jaringan Wi-Fi</option>
<option value="location">Lokasi</option>
</optgroup>
</select>
<div class="nfc-reader-form" data-nfc-form>
<div class="nfc-reader-fields" data-nfc-fields="link">
<input type="url" class="nfc-reader-input" data-k="url" placeholder="https://example.com" aria-label="Tautan yang akan ditulis"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="text" hidden>
<textarea class="nfc-reader-input nfc-reader-textarea" data-k="text" rows="3" placeholder="Teks Anda di sini" aria-label="Teks yang akan ditulis"></textarea>
</div>
<div class="nfc-reader-fields" data-nfc-fields="phone" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Nomor telepon" aria-label="Nomor telepon"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="email" hidden>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="Alamat email" aria-label="Alamat email"/>
<input type="text" class="nfc-reader-input" data-k="subject" placeholder="Subjek (opsional)" aria-label="Subjek email, opsional"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="sms" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Nomor telepon" aria-label="Nomor telepon SMS"/>
<input type="text" class="nfc-reader-input" data-k="body" placeholder="Pesan (opsional)" aria-label="Pesan SMS, opsional"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="location" hidden>
<input type="text" class="nfc-reader-input" data-k="lat" inputmode="decimal" placeholder="Lintang" aria-label="Lintang"/>
<input type="text" class="nfc-reader-input" data-k="lng" inputmode="decimal" placeholder="Bujur" aria-label="Bujur"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="contact" hidden>
<input type="text" class="nfc-reader-input" data-k="name" placeholder="Nama lengkap" aria-label="Nama kontak"/>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="Telepon (opsional)" aria-label="Telepon kontak, opsional"/>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="Email (opsional)" aria-label="Email kontak, opsional"/>
<input type="text" class="nfc-reader-input" data-k="org" placeholder="Organisasi (opsional)" aria-label="Organisasi kontak, opsional"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="wifi" hidden>
<input type="text" class="nfc-reader-input" data-k="ssid" placeholder="Nama jaringan (SSID)" aria-label="Nama jaringan Wi-Fi"/>
<input type="text" class="nfc-reader-input" data-k="password" placeholder="Kata sandi" aria-label="Kata sandi Wi-Fi"/>
<select class="nfc-reader-select" data-k="security" aria-label="Keamanan Wi-Fi">
<option value="wpa">WPA / WPA2</option>
<option value="wep">WEP</option>
<option value="open">Terbuka (tanpa kata sandi)</option>
</select>
</div>
</div>
<p class="nfc-reader-input-error" data-nfc-input-error></p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Tulis ke Tag</span></button>
<p class="nfc-reader-fineprint">Ingin pengalaman NFC native dengan lebih banyak fungsi? <a href="/features/nfc-reader-writer/">Dapatkan aplikasi NFC.cool!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="writing">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">Menulis NFC</p>
<p class="nfc-reader-lead">Dekatkan tag NFC ke bagian atas belakang ponsel Anda.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>Batal</span></button>
</div>
<div class="nfc-reader-panel" data-panel="written">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>Tag berhasil ditulis</span>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">Ditulis ke tag</span><span class="nfc-reader-value" data-nfc-written></span></div>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Tulis Tag Lain</span></button>
</div>
<div class="nfc-reader-panel" data-panel="error">
<span class="nfc-reader-badge is-error">Terjadi kesalahan</span>
<p class="nfc-reader-lead" data-nfc-error-msg>Terjadi kesalahan.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-retry><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>Coba Lagi</span></button>
</div>
<div class="nfc-reader-panel" data-panel="ios">
<span class="nfc-reader-badge is-muted">iPhone</span>
<p class="nfc-reader-title">NFC browser tidak tersedia di iPhone</p>
<p class="nfc-reader-lead">Apple tidak mengizinkan browser mana pun mengakses chip NFC. Saya membuat aplikasi NFC.cool gratis untuk membaca dan menulis tag di iPhone.</p>
<div class="landing-store-buttons"><a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-en&mt=8" class="landing-store-button is-apple" aria-label="Download on the App Store" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/AppStore.svg" alt="Unduh NFC.cool di App Store" width="156" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="android-other">
<span class="nfc-reader-badge is-muted">Buka di Chrome</span>
<p class="nfc-reader-title">Beralih ke Chrome untuk memindai di sini</p>
<p class="nfc-reader-lead">Anda menggunakan Android, jadi membaca dan menulis di browser bisa dilakukan - hanya perlu Chrome. Buka halaman ini di Chrome dan pembaca akan aktif.</p>
<div class="landing-store-buttons"><a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-en" class="landing-store-button is-google" aria-label="Get it on Google Play" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/GooglePlay.svg" alt="Dapatkan NFC.cool di Google Play" width="173" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="desktop">
<span class="nfc-reader-badge is-muted">Android + Chrome saja</span>
<img class="nfc-reader-qr" src="/assets/images/nfc-reader-qr.svg" alt="Kode QR yang membuka halaman ini di ponsel Anda" width="188" height="188"/>
<p class="nfc-reader-lead">Pindai ini dengan ponsel Android untuk membuka pembaca di sana. NFC dalam browser memerlukan Chrome di Android.</p>
<p class="nfc-reader-fineprint">Menggunakan iPhone? <a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-en&mt=8" target="_blank" rel="noopener nofollow sponsored">Dapatkan aplikasi NFC.cool</a>.</p>
</div>
</div>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-section">

## Cara kerjanya

<div class="page-cards-grid">

<article class="page-card nfc-step">
<span class="landing-feature-num">01</span>
<h3>Buka di ponsel Android</h3>
<p>Buka halaman ini di Chrome pada ponsel Android. Chrome memiliki fitur bernama Web NFC yang memungkinkan sebuah situs web berkomunikasi dengan chip NFC ponsel - itulah mesin di balik halaman ini.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">02</span>
<h3>Pilih Baca atau Tulis</h3>
<p>Membaca menampilkan semua yang tersimpan di tag. Menulis menaruh tautan atau teks singkat ke dalamnya. Saya meminta izin NFC dari Chrome pertama kali, dan Chrome akan mengingat jawaban Anda.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">03</span>
<h3>Dekatkan tag ke ponsel Anda</h3>
<p>Sentuhkan tag ke bagian atas ponsel Anda. Saya mendekode atau menulisnya langsung di perangkat Anda - saya tidak pernah melihat datanya, tidak ada yang diunggah, dan tidak ada yang disimpan.</p>
</article>

</div>

</section>

<section class="page-section">

## Apa yang bisa Anda baca dari tag NFC

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 14.5 14.5 9.5"/><path d="M11 6.5 12.4 5a3.8 3.8 0 0 1 5.4 5.4l-1.5 1.5"/><path d="M13 17.5 11.6 19a3.8 3.8 0 0 1-5.4-5.4l1.5-1.5"/></svg></span>
<h3>Tautan dan URL</h3>
<p>Konten tag yang paling umum - alamat web yang membuka halaman, profil, atau menu. Saya menampilkan tautan lengkapnya agar Anda bisa melihat dengan jelas ke mana arahnya sebelum mengetuknya.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 7h14"/><path d="M5 12h14"/><path d="M5 17h9"/></svg></span>
<h3>Teks biasa</h3>
<p>Catatan, instruksi, ID, atau pesan singkat yang tersimpan sebagai rekaman teks. Saya mendekode teks beserta bahasanya langsung dari chip.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4 4 8l8 4 8-4-8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/></svg></span>
<h3>Rekaman lainnya</h3>
<p>Kredensial Wi-Fi, kartu kontak, dan data khusus aplikasi muncul sebagai rekaman bertipe. Anda juga melihat nomor seri unik tag, yang sama setiap kali dibaca.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Tag kosong atau terkunci</h3>
<p>Tag kosong terbaca dengan bersih tanpa rekaman - berguna untuk memeriksa tag baru sebelum Anda menulisnya. Tag terkunci tetap melaporkan tipe dan nomor serinya.</p>
</article>

</div>

</section>

<section class="page-section">

## Ingin melakukan lebih dari sekadar membaca dan menulis?

Pembaca di halaman ini menangani pekerjaan sehari-hari - membaca tag dan menulis data umum ke dalamnya. Bagi kebanyakan orang itulah segalanya, dan Web NFC API browser berhenti tepat di sana: rekaman NDEF biasa, hanya Android Chrome. Aplikasi **NFC.cool** melakukan semua yang ada di halaman ini, lalu terus berjalan ke tempat yang tidak bisa dijangkau browser:

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>Kunci, format, dan lindungi tag</h3>
<p>Kunci tag agar isinya tidak bisa berubah, hapus kembali ke kondisi kosong, atau lindungi dengan kata sandi agar hanya perangkat Anda yang bisa menulisnya ulang.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg></span>
<h3>Enkripsi rahasia dengan NFC Safe</h3>
<p>NFC Safe mengenkripsi rahasia langsung ke chip dengan AES-256, sehingga tag terbaca sebagai data acak oleh aplikasi lain. <a href="/blog/nfc-safe-encrypted-secrets/">Cara kerja NFC Safe</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"/></svg></span>
<h3>Otomatiskan apa yang dilakukan satu ketukan</h3>
<p>Sebuah tag bisa memicu webhook, menjalankan iOS Shortcut, membacakan isinya dengan suara, atau menghitung seberapa sering dipindai. <a href="/blog/count-nfc-tag-scans/">Cara menghitung pemindaian tag NFC</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"/></svg></span>
<h3>Klon, reset, dan periksa tag</h3>
<p>Klon tag, buang dan identifikasi memori chip mentahnya, atau program ulang perangkat keras berkunci NFC seperti <a href="/blog/openprinttag-read-write-nfc-spools-phone/">gulungan filamen printer 3D</a> dan <a href="/blog/reset-sonicare-brush-head-nfc/">kepala sikat gigi elektrik</a>.</p>
</article>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## NFC di iPhone membutuhkan aplikasi

Apple memblokir NFC di setiap browser iOS, sehingga tidak ada situs web yang bisa membaca atau menulis tag di iPhone atau iPad. Aplikasi NFC.cool melakukannya secara native, sama baiknya seperti di Android.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-en&mt=8" class="landing-store-button is-apple" aria-label="Download on the App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="Unduh NFC.cool di App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-en" class="landing-store-button is-google" aria-label="Get it on Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Dapatkan NFC.cool di Google Play" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## FAQ pembaca NFC online

<div class="nfc-reader-faq">

<details class="faq-item">
<summary>Bisakah saya membaca dan menulis tag NFC tanpa aplikasi?</summary>
<p>Ya, di ponsel Android menggunakan Chrome. Halaman ini menggunakan Web NFC bawaan browser Anda, jadi tidak ada yang perlu diinstal - ketuk Pindai untuk membaca tag, atau gunakan tab Tulis untuk menaruh tautan, teks, kontak, jaringan Wi-Fi, dan lainnya ke tag.</p>
</details>

<details class="faq-item">
<summary>Bisakah saya menulis jaringan Wi-Fi atau kartu kontak ke tag?</summary>
<p>Ya. Pilih Jaringan Wi-Fi atau Kartu kontak di dropdown Tulis dan isi kolom yang tersedia. Tag Wi-Fi akan meminta ponsel Android untuk bergabung ke jaringan; tag kontak menyimpan vCard standar yang ditawarkan ponsel untuk disimpan.</p>
</details>

<details class="faq-item">
<summary>Apakah ini berfungsi di iPhone?</summary>
<p>Tidak. Apple memblokir NFC untuk setiap browser iOS, sehingga tidak ada situs web yang bisa membaca atau menulis tag di iPhone atau iPad. Aplikasi NFC.cool gratis melakukannya di iPhone.</p>
</details>

<details class="faq-item">
<summary>Browser mana yang didukung?</summary>
<p>Web NFC hanya berfungsi di Chrome dan browser berbasis Chromium di Android. Browser desktop dan iOS tidak mendukungnya - jika browser Anda tidak bisa, halaman ini menampilkan apa yang harus dilakukan.</p>
</details>

<details class="faq-item">
<summary>Apakah pembaca NFC online ini gratis?</summary>
<p>Sepenuhnya gratis - tanpa daftar dan tanpa batas pemindaian. Tag dibaca dan ditulis di perangkat Anda sendiri, dan tidak ada yang pernah diunggah.</p>
</details>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## Baca dan tulis tag NFC di mana saja

Halaman ini mencakup dasar-dasar di browser. Aplikasi NFC.cool gratis melangkah lebih jauh - membaca tag apa pun dan menulis 25+ jenis data: tautan, Wi-Fi, kontak, shortcut, dan lainnya, di iPhone maupun Android. Saya membangun dan memeliharanya sendiri.

<div class="tap-cta-buttons">
<a href="/features/nfc-reader-writer/" class="landing-cta-button">Lihat Pembaca & Penulis NFC</a>
<a href="/blog/nfc-tags-beginners-guide/" class="landing-cta-button">Baru mengenal tag NFC? Mulai di sini</a>
</div>

</section>
