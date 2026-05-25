---
title: "Pengembang"
slug: "developers"
description: "Cara menghubungkan NFC.cool ke stack Anda - referensi payload webhook, App Intents, skema URL, umpan yang dapat dibaca mesin, dan semua yang Anda butuhkan untuk integrasi sisi server di iPhone dan Android."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Untuk para pembuat

NFC.cool adalah pemindai yang menghormati stack Anda. Setiap pemindaian dapat menjadi HTTP POST terstruktur ke backend Anda sendiri, dalam JSON yang dapat diprediksi, dikirim langsung dari perangkat. Tidak ada perantara, tidak ada akun NFC.cool, tidak ada unggahan ke server kami.

<a href="#webhook-payload" class="landing-cta-button">Lihat payload-nya</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/webhook.webp" alt="Data pemindaian mengalir ke endpoint webhook" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section">

## Di mana Anda dapat menghubungkan NFC.cool

Webhook hanyalah `POST` JSON ke URL yang Anda kendalikan - sehingga apa pun yang berbicara HTTP bisa digunakan.

<div class="feature-capabilities-grid">

<article class="feature-capability-card">
<h3>Zapier</h3>
<p>Gunakan pemicu "Catch Webhook" Zapier untuk merutekan pemindaian ke 5.000+ aplikasi - CRM, spreadsheet, Slack, dan banyak lagi. Paket gratis menangani volume ringan.</p>
</article>

<article class="feature-capability-card">
<h3>n8n</h3>
<p>Host sendiri n8n untuk menjalankan alur kerja tanpa batas tanpa penetapan harga per-tugas. Node HTTP-trigger menerima POST NFC.cool secara langsung.</p>
</article>

<article class="feature-capability-card">
<h3>Make (sebelumnya Integromat)</h3>
<p>Pembuat alur kerja visual dengan cakupan aplikasi yang kaya. Gunakan modul Webhooks sebagai titik masuk untuk setiap pemindaian NFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>IFTTT</h3>
<p>Untuk perutean "jika ini maka itu" yang sederhana. Layanan Webhooks IFTTT memberi Anda URL unik untuk dimasukkan ke konfigurasi webhook NFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>Slack / Discord / Teams</h3>
<p>Arahkan URL webhook ke webhook masuk Slack (atau ekuivalen Discord/Teams) untuk memberi ping ke channel setiap kali tag diketuk.</p>
</article>

<article class="feature-capability-card">
<h3>Backend Anda sendiri</h3>
<p>Endpoint HTTPS mana pun yang menerima POST JSON bisa digunakan. Skema, model autentikasi, dan contoh penerima didokumentasikan di bawah ini.</p>
</article>

</div>

</section>

<section class="page-section">

## Pola alur kerja umum

- **Inventaris + jejak audit.** Ketuk tag pada item, NFC.cool melakukan POST ke spreadsheet atau sistem gudang; baris muncul dengan stempel waktu + pengenal tag + payload.
- **Penangkapan prospek di acara.** Ketuk tag pada spanduk stan Anda, CRM Anda secara otomatis mengirimkan email tindak lanjut.
- **Pemicu rumah pintar.** Ketuk tag di pintu depan untuk menandai "saya di rumah" - Home Assistant / Homey / Hubitat mengambilnya melalui webhook.
- **Pelacakan aset.** Staf pemeliharaan mengetuk tag pada peralatan untuk mencatat inspeksi; backend membangun log kepatuhan.
- **Check-in konferensi.** Ketuk lencana NFC peserta; webhook memperbarui platform acara Anda secara real time.

</section>

<section class="page-section" id="webhooks">

## Webhook

Aktifkan di **tab Lainnya - Webhook** di dalam aplikasi: masukkan satu URL HTTPS, opsional nama pengguna/kata sandi untuk HTTP Basic Auth, lalu aktifkan "pemindaian NFC" dan "pemindaian kode QR & barcode" secara independen. Tersedia di iOS dan Android.

Aplikasi mengirimkan satu `POST` per pemindaian ke URL yang Anda konfigurasikan. Tidak ada antrian percobaan ulang yang terpisah: jika endpoint Anda tidak dapat dijangkau atau mengembalikan respons non-2xx, POST pemindaian gagal. Targetkan `204 No Content` saat berhasil; 2xx apa pun diperlakukan sebagai diterima.

Halaman ini adalah referensi teknis. Untuk ikhtisar fitur - empat hook otomasi iOS lainnya, harga, dan FAQ - lihat [halaman fitur Webhook & Otomasi](/features/webhooks/).

</section>

<section class="page-section" id="webhook-payload">

## Payload webhook

Content-type `application/json`, body adalah JSON yang diformat rapi:

```json
{
  "identifier" : "04:A2:7F:1B:5E:80:00",
  "date" : "2026-05-12T14:23:01Z",
  "content" : "https://example.com/check-in/abc123"
}
```

Tag terstruktur (saat ini OpenPrintTag) menambahkan dua bidang lagi:

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

Referensi bidang:

- `identifier` - Untuk pemindaian NFC, UID perangkat keras tag sebagai hex huruf besar yang dipisahkan titik dua (mis. `04:A2:7F:1B:5E:80:00`). Stabil per tag, sehingga Anda dapat menggunakannya untuk deduplikasi. Untuk pemindaian kode QR & barcode ini adalah UUID baru per pemindaian - bukan ID kode yang stabil. Dalam mode kompatibilitas NFC iOS lama yang tidak mengekspos UID, nilainya adalah string literal `NoIdentifierInCompatibilityMode`.
- `date` - ISO 8601, kapan pemindaian terjadi di perangkat.
- `content` - Konten yang didekodekan. Untuk NFC, nilai rekaman NDEF (URI atau teks); untuk kode QR/barcode, string yang didekodekan mentah.
- `tagType` - Dihilangkan pada pemindaian biasa. Disetel ke `"openPrintTag"` untuk pemindaian OpenPrintTag.
- `structured` - Dihilangkan pada pemindaian biasa. Payload terstruktur yang diuraikan saat `tagType` ada.

</section>

<section class="page-section">

## Autentikasi

Webhook mendukung **HTTP Basic Auth saja**. Di **tab Lainnya - Webhook** Anda dapat menyimpan nama pengguna dan kata sandi secara opsional di iOS Keychain. Aplikasi kemudian merespons tantangan HTTP `401 / WWW-Authenticate: Basic` standar dari server Anda dengan kredensial tersebut.

Artinya endpoint Anda yang mengontrol apakah autentikasi diperlukan. Jika Anda tidak memerlukan autentikasi, biarkan nama pengguna dan kata sandi kosong di aplikasi dan lewati tantangan di server. Jika Anda memerlukannya, kembalikan `401` dengan `WWW-Authenticate: Basic realm="..."` pada POST pertama - perangkat akan mencoba ulang dengan `Authorization: Basic ...` yang membawa kredensial yang tersimpan. Semua perjalanan melalui TLS; server NFC.cool tidak pernah melihat kredensial Anda.

Tidak ada dukungan Bearer token, API-key, atau HMAC-signature saat ini. Jika Anda membutuhkan itu, terminasikan di reverse proxy (Cloudflare Worker, nginx, dll.) yang menerjemahkan Basic ke skema Anda.

</section>

<section class="page-section">

## Contoh penerima

Butuh seluruh alur dari awal hingga akhir? Clone [server webhook referensi di GitHub](https://github.com/NickAtGit/nfc-cool-webhook-server) - ia mencatat setiap payload secara langsung. Cuplikan di bawah adalah penerima minimal untuk stack Anda sendiri.

### cURL - uji asap cepat

```bash
curl -X POST https://your-server.example/webhook \
  -u 'nfc-cool:your-password' \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"04:A2:7F:1B:5E:80:00","date":"2026-05-12T14:00:00Z","content":"hello"}'
```

### Node.js - penerima Express

```js
import express from "express";
import basicAuth from "express-basic-auth";

const app = express();
app.use(express.json());

app.post(
  "/webhook",
  basicAuth({
    users: { "nfc-cool": process.env.WEBHOOK_PASSWORD },
    challenge: true, // memberi tahu NFC.cool untuk mencoba ulang dengan kredensial
  }),
  (req, res) => {
    const { identifier, date, content, tagType } = req.body;
    console.log(`scan ${tagType ?? "plain"} ${content} id=${identifier} at ${date}`);
    res.status(204).end();
  }
);

app.listen(3000);
```

### Python - penerima FastAPI

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

## App Intents & Shortcuts

NFC.cool Tools di **iOS** dilengkapi dengan sejumlah App Intents yang dapat Anda hubungkan ke aplikasi Shortcuts, otomasi, mode fokus, atau Apple Intelligence.

<div class="page-cards-grid">

<article class="page-card">
<h3><code>Scan</code></h3>
<p>Memulai pemindaian dalam fungsi yang Anda pilih: NFC, kode QR / barcode, dokumen, objek 3D, atau ruangan.</p>
</article>

<article class="page-card">
<h3><code>Open Tab</code></h3>
<p>Membuka NFC.cool ke tab tertentu (NFC, kode QR, dokumen, 3D, lainnya) tanpa memulai pemindaian.</p>
</article>

<article class="page-card">
<h3><code>Get Last NFC Tag</code></h3>
<p>Mengembalikan konten tag NFC yang terakhir dipindai sebagai string - berguna sebagai input Shortcut. Tidak meluncurkan aplikasi.</p>
</article>

<article class="page-card">
<h3><code>Get Last QR Code</code></h3>
<p>Mengembalikan konten kode QR / barcode yang terakhir dipindai. Tidak meluncurkan aplikasi.</p>
</article>

<article class="page-card">
<h3><code>Write NFC</code></h3>
<p>Membuka alur penulisan NFC yang sudah diisi sebelumnya dengan URL atau payload teks yang disediakan oleh Shortcut.</p>
</article>

</div>

Varian iOS 18 yang didedikasikan (`NFC Scan`, `QR Scan`, `Document Scan`, `Object Scan`, `Room Scan`) muncul langsung di Spotlight / pemilih tombol aksi.

</section>

<section class="page-section" id="url-schemes">

## Skema URL

Untuk deep-linking dari aplikasi iOS lain, widget, atau pintasan Layar Beranda, NFC.cool Tools mendaftarkan URL-URL ini:

```
nfcforiphone://scan-nfc
nfcforiphone://scan-code
nfcforiphone://scan-document
nfcforiphone://scan-object       (iOS 17+)
nfcforiphone://scan-room         (iOS 17+)
```

Membuka salah satu dari ini langsung masuk ke pemindai yang sesuai. Skema `nfc://` dan `geo://` juga didaftarkan untuk meneruskan tautan tag/koordinat eksternal.

</section>

<section class="page-section">

## Sumber daya yang dapat dibaca mesin

Umpan yang dapat ditemukan untuk alat, mesin pencari, dan agen AI:

<div class="page-cards-grid">

<article class="page-card">
<h3><a href="/sitemap.xml"><code>/sitemap.xml</code></a></h3>
<p>Indeks situs lengkap - setiap rute + terakhir dimodifikasi.</p>
</article>

<article class="page-card">
<h3><a href="/llms.txt"><code>/llms.txt</code></a></h3>
<p>Direktori situs yang ramah AI (dikirim otomatis oleh SiteKit).</p>
</article>

<article class="page-card">
<h3><a href="/feed.xml"><code>/feed.xml</code></a></h3>
<p>RSS seluruh situs dengan konten teks lengkap dari setiap bagian.</p>
</article>

<article class="page-card">
<h3><a href="/blog/feed.xml"><code>/blog/feed.xml</code></a></h3>
<p>Umpan RSS khusus blog.</p>
</article>

<article class="page-card">
<h3><a href="/changelog/feed.xml"><code>/changelog/feed.xml</code></a></h3>
<p>Umpan rilis - versi, tanggal, dan entri changelog.</p>
</article>

<article class="page-card">
<h3><a href="/assets/nav-index.json"><code>/assets/nav-index.json</code></a></h3>
<p>Indeks navigasi terstruktur dengan judul, ringkasan, tag, dan URL.</p>
</article>

<article class="page-card">
<h3><a href="/assets/search-index.json"><code>/assets/search-index.json</code></a></h3>
<p>Konten teks biasa dari setiap artikel untuk pencarian sisi klien.</p>
</article>

</div>

Membangun sesuatu di atas NFC.cool? Atau menemukan mitra integrasi yang seharusnya ada di halaman ini? [Hubungi kami](mailto:info@nfc.cool?subject=NFC.cool%20Support).

</section>
