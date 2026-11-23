---
id: "check-transit-card-balance-iphone-2026-11"
title: "Cara cek saldo kartu transit dan e-money di iPhone: Suica, Octopus, T-money, dan lainnya"
date: "2026-11-22"
tags: ["guides", "iphone", "privacy"]
summary: "Tempelkan kartu IC, kartu transit, atau kartu e-money seperti Suica, Octopus, atau T-money ke iPhone, dan NFC.cool menampilkan saldo serta perjalanan terakhirnya. Inilah semua kartu yang bisa dibacanya, apa yang terlihat dari kartu bank, dan apa yang bisa dibaca siapa saja dari kartu Anda."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/check-transit-card-balance-iphone-v4.webp"
imageAlt: "iPhone yang menampilkan saldo dan grafik sebuah kartu transit saat kartu IC hijau ditempelkan padanya, dengan dua kartu transit lain di depannya"
metaTitle: "Cek saldo kartu transit dan e-money di iPhone: Suica dan lainnya"
metaDescription: "Cek saldo dan perjalanan kartu IC, transit, dan e-money seperti Suica, PASMO, Octopus, T-money, Clipper, dan Opal di iPhone. Semua kartu yang dibaca NFC.cool."
ogTitle: "Cek saldo kartu transit dan e-money dengan iPhone Anda"
ogDescription: "Suica, Octopus, T-money, Navigo, Clipper, dan banyak kartu IC lainnya: tempelkan kartu ke iPhone dan lihat saldo, perjalanan, serta apa yang bisa dibaca siapa saja darinya."
---
Selama bertahun-tahun, satu jenis email terus masuk ke kotak masuk saya, dalam belasan bahasa dan dengan belasan nama kartu yang berbeda. "Aplikasi Anda tidak bisa membaca kartu e-money saya." "Kartu IC saya tidak terdeteksi." "Kartu metro saya sudah saya tempelkan ke ponsel, tapi tidak terjadi apa-apa."

Mereka ada benarnya. NFC.cool memang menemukan chipnya, [menampilkan ID dan jenis chipnya](/id/features/nfc-reader-writer/), lalu berhenti di situ. Bagi orang yang memegang kartu berisi uang, kesannya aplikasi itu menyerah begitu saja. Padahal saldo yang mereka cari ada di kartu itu sendiri.

Versi 7.4.0 [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-id&mt=8) adalah jawaban saya untuk semua email itu. Tempelkan kartu transit, kartu e-money, atau kartu bank ke iPhone Anda, dan aplikasi kini menampilkan saldonya, perjalanan terakhirnya, dan, yang tidak kalah menarik, semua hal yang bisa dibaca orang lain dari kartu itu. Fitur ini hadir lebih dulu di iPhone, dan [NFC.cool Tools untuk Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-check-transit-card-balance-iphone-id) (segera hadir) akan mendapatkan kemampuan membaca kartu yang sama.

---

## Kenapa "kartu NFC" bukan satu jenis benda

Semua kartu ini [berkomunikasi dengan ponsel Anda lewat NFC](/id/blog/nfc-on-iphones-insider-look/). Kesamaannya berhenti di situ.

Saya membayangkannya begini: NFC hanyalah pintu depannya. Di baliknya, setiap kartu adalah gedung tersendiri, dengan denah sendiri dan ruangan-ruangan terkuncinya sendiri. Kartu-kartu Jepang berjalan di atas **FeliCa** buatan Sony. Banyak kartu transit Eropa memakai **Calypso**. San Francisco, Sydney, dan Helsinki memakai [**MIFARE DESFire**](/id/blog/ultimate-nfc-tag-guide/#mifare-classic-plus-dan-desfire-keluarga-kontrol-akses), masing-masing dengan tata letak isi yang berbeda. Kartu bank berbicara dengan **EMV**, standar yang sama dengan yang dipakai mesin EDC di kasir supermarket Anda.

Dan di dalam setiap gedung, operatornyalah yang menentukan ruangan mana yang terbuka. Ada yang menaruh saldo dan dua puluh perjalanan terakhir di ruangan yang bisa dimasuki siapa saja. Ada juga yang mengunci setiap pintu, dan hanya gerbang serta mesin tiket milik mereka sendiri yang memegang kuncinya. Tidak ada aplikasi yang bisa menembus itu, dan NFC.cool memang tidak mencobanya: setiap pembacaan bersifat baca-saja, tidak memakai kunci apa pun, dan tidak menulis apa pun ke kartu.

Jadi pekerjaan sebenarnya di balik fitur ini adalah mempelajari denah setiap sistem kartu, satu per satu.

---

## Kartu IC, transit, dan e-money yang bisa dibaca NFC.cool

Inilah yang sudah bisa dibaca aplikasi saat ini. Tapi satu catatan jujur dulu. Saya menguji semua kartu yang ada di dompet saya sendiri, termasuk tiket kertas sekali pakai OV-chipkaart dari Belanda dan kartu-kartu bank saya. Namun kartu di dunia ini jauh lebih banyak daripada isi dompet mana pun, jadi sebagian besar pembaca di bawah ini dibangun berdasarkan cara setiap sistem kartu disusun, bukan dari kartu yang pernah saya pegang sendiri. Kalau kartu Anda terbaca keliru, atau sama sekali tidak terbaca, saya sungguh ingin tahu. Caranya ada di bawah.

<figure class="phone-figure" data-layout="stage">
<figcaption>Yang ditampilkan NFC.cool untuk kartu Anda</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/1-suica-balance-440w.webp" alt="Kartu Suica di NFC.cool: tampilan kartu hijau dengan saldo ¥2,140, grafik saldo di bawahnya, serta perjalanan dan pembayaran pertama"><p><strong>Saldo.</strong> Saldo kartu di bagian atas, dan naik turunnya selama beberapa perjalanan terakhir.</p></li>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/2-tmoney-trips-440w.webp" alt="Kartu T-money di NFC.cool dengan saldo ₩12,350 dan daftar pembayaran berisi tanggal, jam, jumlah, dan saldo setelah setiap transaksi"><p><strong>Perjalanan dan pembayaran.</strong> Setiap catatan yang disimpan kartu, dengan saldo setelahnya.</p></li>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/3-locked-card-440w.webp" alt="Kartu transit MIFARE DESFire di NFC.cool: jenis chip dan nomor seri bisa dibaca, sedangkan perjalanan, saldo, dan tiket langganan ditandai Tidak dapat dibaca"><p><strong>Kartu terkunci.</strong> Kalau operator menguncinya, aplikasi memberi tahu apa saja yang tetap tertutup.</p></li>
</ol>
</figure>

### Saldo dan perjalanan terakhir

- **Jepang:** Suica, PASMO, ICOCA, Kitaca, manaca, nimoca, PiTaPa, TOICA, dan Hayakaken, dengan hingga 20 perjalanan terakhir beserta stasiunnya jika aplikasi mengenalinya. Rakuten Edy, nanaco, dan WAON juga menampilkan saldo dan riwayatnya.
- **Korea Selatan:** T-money dan Cashbee, dengan perjalanan terakhir serta tanggal terbit dan masa berlaku kartu.
- **Tiongkok dan Hong Kong:** Shenzhen Tong, Wuhan Tong, kartu City Union (ditampilkan sebagai Shanghai Public Transport kalau itu kartu Shanghai), dan T-Union, dengan perjalanan terakhir dan masa berlakunya. Octopus dari Hong Kong menampilkan saldonya.
- **Indonesia:** Mandiri e-money, BCA Flazz, BNI TapCash, MegaCash, dan Kartu Multi Trip (KMT) KRL, lengkap dengan riwayat transaksinya. JakCard dan kartu MRT Jakarta menampilkan saldonya.
- **Australia dan Selandia Baru:** Opal di Sydney, dengan saldo dan perjalanan terakhir, serta Snapper dari Wellington, yang berjalan di sistem yang sama dengan T-money dan tampil dalam NZ$.
- **Amerika Serikat:** Clipper di San Francisco dan ORCA di Seattle.
- **Finlandia:** kartu HSL, Waltti, dan Tampere.
- **Israel:** Rav-Kav, dengan nilai tersimpan, tiket langganan, dan perjalanannya.

### Tiket langganan dan perjalanan, tanpa saldo

Banyak kartu Eropa sama sekali tidak menyimpan saldo. Isinya tiket langganan. Navigo dari Paris dan kartu Calypso Prancis lainnya (Pass Pass, KorriGo, OùRA, dan lainnya), MOBIB di Brussel, Opus di Montreal, Venezia Unica, dan Lisboa Viva menampilkan tiket langganan yang ada di kartu beserta perjalanan terakhirnya. metroCARD dari Adelaide dan Hafilat dari Abu Dhabi juga begitu, karena saldonya tersimpan di balik kunci milik operator.

### Tiket kertas dan sekali pakai

Tiket kertas yang tipis pun punya chip. NFC.cool membaca tiket Ventra dari Chicago dan Compass dari Vancouver, Troika dari Moskow, tiket kertas Clipper, tiket HSL, Tampere, Venesia, dan Pisa, tiket kertas OV-chipkaart, serta tiket GTT dari Turin, yang menampilkan jenis tiket, kapan diterbitkan, dan kapan divalidasi.

### Dikunci oleh operator

Sebagian operator mengunci semuanya. Untuk Oyster di London, Leap di Dublin, atau kartu Rabbit di Bangkok, NFC.cool bisa memberi tahu kartu apa itu, dan hanya sebatas itu, karena tidak ada hal lain di kartu yang terbuka. Beberapa kartu, seperti Myki di Melbourne dan PRESTO di Toronto, memperlihatkan nomor kartunya dan menutup rapat sisanya. Itu bukan sesuatu yang bisa diubah oleh pembaruan aplikasi. Memang begitulah sistem-sistem itu dibangun.

### Kartu yang membutuhkan pembaca eksternal

Ada kartu yang memang tidak mau diserahkan iPhone kepada aplikasi. EZ-Link dan NETS FlashPay dari Singapura serta Yikatong dari Beijing termasuk di antaranya. Colokkan [pembaca NFC USB eksternal](/id/affiliate-links/#usb-nfc-reader), dan NFC.cool bisa membacanya, lengkap dengan saldo dan riwayatnya. Saya sudah menulis tentang cara kerja pembaca seperti itu di artikel tentang [membaca tag NFC di iPad dan Mac](/id/blog/nfc-reading-ipad-mac/).

---

## Kartu bank: apa yang terlihat, dan apa yang tidak akan pernah terlihat

Di bagian kartu bank inilah orang biasanya mulai waswas, dan itu wajar.

Di iPhone, NFC.cool menampilkan jaringannya, Visa atau Mastercard, dan tidak lebih dari itu. [Apple tidak mengizinkan aplikasi seperti milik saya membaca data pembayaran kartu bank](https://developer.apple.com/documentation/corenfc/nfctagreadersession) di iPhone, dan sebagai orang yang setiap hari berkutat dengan teknologi ini, menurut saya itu keputusan yang tepat.

Dengan pembaca USB eksternal, yang terlihat lebih banyak: jaringan kartu, nomor kartu yang disamarkan sehingga hanya enam digit pertama dan empat digit terakhir yang tampak, tanggal kedaluwarsa, negara penerbit, dan mata uangnya. Yang tidak pernah dibaca NFC.cool, di perangkat apa pun, adalah nama Anda, sedangkan kode keamanan dan PIN memang sama sekali tidak bisa dibaca. Di [panduan tag NFC saya](/id/blog/ultimate-nfc-tag-guide/#bisakah-ponsel-saya-membaca-kartu-bank-atau-paspor-saya-dengan-aplikasi-nfc), saya menjelaskan kenapa tidak ada apa pun di chip itu yang layak disalin.

---

## Apa yang bisa dibaca ponsel orang asing dari kartu Anda

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/anyone-can-read-440w.webp" alt="Bagian Yang bisa dibaca siapa saja pada kartu Suica di NFC.cool: saldo serta 6 perjalanan dan pembayaran terakhir bisa dibaca oleh ponsel mana pun, tanpa perlu kunci"><p><strong>Yang bisa dibaca siapa saja.</strong> Pada Suica, saldo dan perjalanan terakhir, tanpa perlu kunci.</p></li>
</ol>
</figure>

Inilah bagian yang paling menarik bagi saya, dan bagian pertama yang akan saya periksa.

Semua yang dibaca NFC.cool dibaca tanpa kunci. Artinya, ponsel mana pun yang ditempelkan ke kartu Anda bisa membaca hal yang sama. Paspor justru kebalikannya: chipnya tetap diam sampai Anda memberinya kunci yang tercetak di halaman foto, dan begitulah cara [membaca paspor dengan ponsel](/id/blog/read-passport-nfc-chip/) bekerja. Karena itu, setiap layar kartu punya bagian bernama **Yang bisa dibaca siapa saja**, yang mencantumkan persis apa yang ditemukan pada pembacaan ini: saldo, perjalanan beserta tanggal dan stasiunnya, nomor kartu, apa pun yang diserahkan kartu.

Untuk Suica, itu bisa berarti dua puluh perjalanan lengkap dengan nama stasiunnya. Untuk Navigo, tiket langganan dan perjalanan terakhir Anda. Untuk Oyster, nyaris tidak ada apa-apa. NFC hanya bekerja dalam jarak beberapa sentimeter, jadi tidak ada yang bisa membaca kartu Anda dari ujung gerbong kereta, tapi tetap ada gunanya mengetahui kartu jenis apa yang ada di saku Anda.

Selama semua ini berlangsung, tidak ada apa pun yang keluar dari iPhone Anda. Pembacaan hanya terjadi antara kartu dan ponsel Anda, tidak lebih.

---

## Riwayat kartu Anda dari waktu ke waktu

Setiap kartu yang Anda baca tersimpan di daftar pindaian Anda, dengan ringkasan singkat seperti "Suica • ¥1,234" agar mudah ditemukan lagi. Buka kembali nanti, dan Anda akan melihat kartu itu seperti saat dibaca, ditambah **Sejak pemindaian terakhir**, yang menunjukkan seberapa banyak saldo berubah sejak terakhir kali Anda membaca kartu yang sama. Berguna kalau Anda pernah bertanya-tanya ke mana habisnya saldo dari top up terakhir.

---

## Cara cek saldo kartu di iPhone

1. Buka [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-id&mt=8) dan ketuk **Baca NFC**.
2. Tempelkan kartu rata ke bagian atas iPhone Anda dan tahan tanpa bergerak sampai lembar di layar menampilkan **Kartu dibaca**.
3. Kartu terbuka di layarnya sendiri, dengan saldo di bagian atas dan detailnya di bawah.

Anda tidak perlu memilih jenis kartu lebih dulu. Aplikasi akan mengenali sendiri kartu apa itu.

---

## Kartu Anda tidak ada di daftar? Kirimkan ke saya

Di sinilah Anda bisa membantu. Saat NFC.cool mengenali sebuah chip tapi tidak bisa membaca seluruh isinya, layar kartu menampilkan **Bantu kami membaca kartu ini**. Saat aplikasi berhasil membaca saldo tapi ada yang terlihat janggal, bagian yang sama bernama **Ada yang salah?**.

Ketuk **Kirim detail pembacaan**, ketik nama dan negara kartunya, dan jika ada saldo, beri tahu saya apakah angkanya benar. Sebelum apa pun terkirim, ketuk **Lihat datanya** untuk melihat persis apa yang akan dikirim: jawaban kartu selama pembacaan, jenis chip, perangkat dan versi aplikasi Anda, serta negara Anda. Nama Anda dan akun apa pun tidak termasuk di dalamnya, dan nomor seri kartu serta nomor kartu apa pun yang dikenali aplikasi disamarkan. Kartu yang belum dikenal aplikasi tetap bisa menyimpan detail yang tidak bisa dideteksinya, dan justru karena itulah Anda bisa melihatnya lebih dulu. Jika pengiriman gagal, Anda bisa mengirimkannya lewat email ke saya.

Setiap laporan adalah kartu yang tidak saya miliki, sering kali dari kota yang belum pernah saya kunjungi, dan dari situlah kartu-kartu berikutnya bisa didukung. Jadi, kalau Anda pernah menulis kepada saya bahwa NFC.cool tidak bisa membaca kartu Anda: [perbarui aplikasinya](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-id&mt=8) dan coba lagi. Dan kalau masih belum berhasil, kini ada tombol yang mengirimkan persis apa yang saya butuhkan untuk memperbaikinya.

[Unduh NFC.cool Tools untuk iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-id&mt=8) · [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-check-transit-card-balance-iphone-id) (segera hadir)
