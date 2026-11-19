---
title: "NFC.cool x-callback-url"
slug: "x-callback-url"
description: "Aplikasi dan halaman web lain dapat meminta NFC.cool di iPhone melakukan sesuatu dan mengirim hasilnya kembali, mengikuti konvensi x-callback-url."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# NFC.cool x-callback-url

Aplikasi dan halaman web lain dapat meminta NFC.cool di iPhone melakukan sesuatu dan mengirim hasilnya kembali, mengikuti konvensi [x-callback-url](https://x-callback-url.com).

Webhook, Pintasan, dan skema URL ada di [halaman developer](/id/developers/).

<a href="#read-uid" class="landing-cta-button">Baca dokumentasi</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/nfc-scan-tag.webp" alt="iPhone memindai tag NFC" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section" id="read-uid">

## Membaca ID tag dari aplikasi atau halaman web Anda

Sebuah tautan meminta NFC.cool memindai satu tag dan mengembalikan UID-nya kepada Anda, dan dengan `ndef=1` juga pesan NDEF tag tersebut. Ini berfungsi dari halaman web atau aplikasi apa pun di iPhone, tanpa pengaturan apa pun selain memasang NFC.cool. Tautan ini mengikuti konvensi [x-callback-url](https://x-callback-url.com). Membaca tag untuk aplikasi dan situs web lain adalah bagian dari NFC.cool Business, lisensi perusahaan untuk NFC.cool di iPhone: [hubungi kami](mailto:info@nfc.cool?subject=NFC.cool%20Business) untuk mendapatkannya.

```
https://nfc.cool/x-callback-url/read-uid?<parameters>
nfcforiphone://x-callback-url/read-uid?<parameters>
```

Kedua bentuk ini melakukan hal yang sama. Utamakan bentuk `https`: di iPhone tanpa NFC.cool, bentuk ini membuka halaman yang menjelaskan cara mendapatkannya, alih-alih gagal tanpa pemberitahuan. Letakkan di tautan yang diketuk oleh pengguna; iOS tidak membuka aplikasi untuk tautan yang diikuti skrip dengan sendirinya.

NFC.cool tampil ke depan, menunjukkan siapa yang akan menerima ID tag, lalu memulai pemindaian. Jika tautan read-uid sudah terbuka, tautan yang lebih baru mengambil alih, dan pemanggil sebelumnya menerima `cancelled`.

### Parameter

<div class="page-cards-grid">

<article class="page-card">
<h3><code>x-get</code></h3>
<p>NFC.cool memanggil URL ini di latar belakang dengan hasil sebagai parameter kueri. Setiap hasil langsung tiba di sini, termasuk kegagalan dan pembatalan.</p>
<p><strong>Wajib:</strong> <code>x-get</code>, <code>x-post</code> atau <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-post</code></h3>
<p>NFC.cool mengirim hasil ke sini sebagai JSON melalui POST.</p>
<p><strong>Wajib:</strong> <code>x-get</code>, <code>x-post</code> atau <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-success</code></h3>
<p>Dibuka setelah pembacaan berhasil, dengan tambahan <code>uid</code>, <code>ndef</code>, dan <code>state</code>. Jika dipakai bersama <code>x-get</code> atau <code>x-post</code>, hanya menerima <code>state</code>: UID hanya dikirim ke server yang ditampilkan kepada pengguna, tidak ke tempat lain.</p>
<p><strong>Wajib:</strong> <code>x-get</code>, <code>x-post</code> atau <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-error</code></h3>
<p>Dibuka saat pengguna menutup NFC.cool setelah terjadi kegagalan, dengan <code>errorCode</code>, <code>errorMessage</code>, dan <code>state</code>.</p>
<p><strong>Wajib:</strong> tidak</p>
</article>

<article class="page-card">
<h3><code>x-cancel</code></h3>
<p>Dibuka saat pengguna membatalkan, dengan <code>state</code>.</p>
<p><strong>Wajib:</strong> tidak</p>
</article>

<article class="page-card">
<h3><code>state</code></h3>
<p>String apa pun, misalnya ID permintaan sekali pakai. Dikembalikan tanpa perubahan bersama setiap hasil.</p>
<p><strong>Wajib:</strong> tidak, tetapi disarankan</p>
</article>

<article class="page-card">
<h3><code>ndef</code></h3>
<p><code>1</code> juga membaca pesan NDEF tag. Tanpanya, hanya UID yang dibaca.</p>
<p><strong>Wajib:</strong> tidak</p>
</article>

</div>

Gunakan `x-get` atau `x-post`, jangan keduanya. Lakukan URL-encode pada setiap nilai callback.

Halaman web mana pun dapat membuka tautan ini, jadi NFC.cool hanya melakukan callback ke URL `https` dan ke skema URL aplikasi lain, seperti `yourapp://nfc-done`; `x-get` dan `x-post` harus `https`. `http` biasa, `javascript:`, `data:`, `tel:`, skema milik NFC.cool sendiri, dan skema sistem yang langsung bertindak sendiri (`shortcuts:`, `itms-services:`, `mailto:`, `App-Prefs:`, dan sejenisnya) ditolak, dan tautan yang memuat satu saja callback yang ditolak akan diabaikan.

### UID

Heksadesimal huruf besar, tanpa pemisah, byte paling signifikan lebih dulu. Panjangnya membedakan keluarga chip:

<div class="page-cards-grid">

<article class="page-card">
<h3>NTAG, MIFARE Ultralight (ISO 14443-A)</h3>
<p>7 byte</p>
<p><code>04A1B2C3D4E5F6</code></p>
</article>

<article class="page-card">
<h3>ICODE dan tag ISO 15693 lainnya</h3>
<p>8 byte</p>
<p><code>E004015012345678</code></p>
</article>

</div>

UID ISO 15693 diawali dengan `E0`, dalam urutan yang tercetak pada chip dan ditampilkan oleh sebagian besar pembaca.

### Pesan NDEF

Dengan `ndef=1`, `ndef` berisi pesan NDEF mentah dari tag, yaitu rekaman tanpa header TLV, dalam Base64url tanpa padding ([RFC 4648, bagian 5](https://www.rfc-editor.org/rfc/rfc4648#section-5)): `-` dan `_` sebagai pengganti `+` dan `/`, dan tanpa `=`. Bidang ini dihilangkan jika tag tidak berisi pesan NDEF.

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

URL Anda dipanggil apa adanya, dengan hasil ditambahkan setelah parameter yang sudah ada di dalamnya. Setiap percobaan mendapat tepat satu panggilan, sehingga halaman yang menunggu dapat berhenti begitu panggilan itu tiba:

<div class="page-cards-grid">

<article class="page-card">
<h3><code>cancelled</code></h3>
<p>Pengguna membatalkan pemindaian atau menutup NFC.cool sebelum tag terbaca.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>Tidak ada tag yang ditemukan tepat waktu, atau tag tidak dapat dibaca.</p>
</article>

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>iPhone ini tidak memiliki akses NFC.cool Business.</p>
</article>

</div>

Setelah `cancelled` atau `scan-failed`, pengguna dapat mencoba lagi, dan pembacaan yang berhasil kemudian memanggil `x-get` lagi dengan `uid`: anggap panggilan terakhir untuk sebuah `state` sebagai jawabannya. Balas dengan status 2xx apa pun. Jika panggilan untuk pembacaan yang berhasil gagal terkirim, NFC.cool menawarkan untuk mengirimnya lagi.

### `x-post`

```
POST https://your-server.example/api/uid
Content-Type: application/json

{"uid":"04A1B2C3D4E5F6","state":"7f3c9a","readAt":"2026-11-19T09:30:00Z","ndef":"0QEFVAJkZUhp"}
```

Balas dengan status 2xx apa pun dalam 20 detik. Respons lain dianggap gagal: pengguna dapat mengirimnya lagi, dan saat NFC.cool ditutup, `delivery-failed` dilaporkan ke `x-error`. Gunakan `x-post` jika halaman yang memulai pembacaan tidak dapat dibuka kembali lewat URL, misalnya web view di dalam aplikasi lain; pengguna kembali melalui tautan yang ditampilkan iOS di pojok kiri atas.

NFC.cool tidak mengirim cookie bersama `x-get` atau `x-post`. Kenali permintaan dari `state` sekali pakai yang Anda masukkan ke tautan.

### Kode `x-error`

<div class="page-cards-grid">

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>iPhone ini tidak memiliki akses NFC.cool Business.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>Tidak ada tag yang ditemukan tepat waktu, atau tag tidak dapat dibaca.</p>
</article>

<article class="page-card">
<h3><code>delivery-failed</code></h3>
<p>Permintaan <code>x-post</code> gagal.</p>
</article>

</div>

### Contoh

Halaman yang menunggu servernya sendiri, sekaligus meminta pesan NDEF:

```html
<a href="https://nfc.cool/x-callback-url/read-uid?x-get=https%3A%2F%2Fexample.com%2Fnfc%3Fcode%3Dabc123&ndef=1&state=7f3c9a">
  Scan tag
</a>
```

</section>
