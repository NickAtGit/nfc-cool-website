---
id: nfc-blog-015
title: "Cara memeriksa dan mereset penghitung kepala sikat Philips Sonicare dengan NFC"
date: 2026-04-21
tags: ["nfc-tags", "guides", "automation"]
summary: "Sikat gigi Sonicare Anda memiliki chip NFC di setiap kepala sikat yang menghitung mundur hingga Anda membeli pengganti. Ini adalah apa yang sebenarnya dilacaknya, dan cara memeriksa penggunaan atau mereset penghitung dengan NFC.cool Tools."
image: "/assets/images/Blog/reset-sonicare-brush-head-nfc.webp"
imageAlt: "Tag NFC kepala sikat gigi elektrik yang direset dengan ponsel"
metaTitle: "Periksa dan reset penghitung kepala sikat Philips Sonicare dengan NFC (2026)"
metaDescription: "Kepala sikat Sonicare Anda memiliki chip NFC yang melacak berapa lama Anda menyikat gigi. Lihat sisa masa pakainya dan reset penghitung dengan NFC.cool Tools."
ogTitle: "Cara memeriksa dan mereset penghitung kepala sikat Sonicare Anda"
ogDescription: "Setiap kepala sikat Sonicare memiliki chip NFC yang menghitung mundur hingga penggantian. Lihat statistik penggunaan Anda dan reset timer jika Anda mau."
---

Sikat gigi elektrik Anda sedang memata-matai Anda.

Bukan dengan cara pengawasan yang menyeramkan. Melainkan dengan cara "kami memasang chip NFC kecil di kepala sikat Anda untuk mendorong Anda membeli pengganti" cara. Setiap kepala pengganti Philips Sonicare memiliki NTAG213 yang tertanam dalam plastiknya yang melacak berapa lama Anda menyikat gigi dan memberi tahu gagang untuk menyalakan lampu peringatan ketika ia memutuskan tiga bulan Anda sudah habis.

Selamat datang di Internet of Shit.

Masalahnya adalah, tiga bulan adalah rekomendasi, bukan fakta medis. Keausan bulu sikat bergantung pada seberapa keras Anda menyikat, pasta gigi apa yang Anda gunakan, dan seberapa sering. Chip tidak mengukur kondisi bulu sikat. Chip hanya menghitung detik. Penyikat lembut dengan pasta gigi ringan mungkin memiliki bulu sikat yang masih baik setelah tiga bulan. Timer tidak tahu atau peduli.

NFC.cool Tools kini dapat membaca chip tersebut, menunjukkan kepada Anda persis seberapa banyak masa pakai kepala sikat yang sudah terpakai, dan mereset timer jika Anda memutuskan bulu sikat Anda masih bagus. Inilah cara kerjanya.

---

## Apa yang sebenarnya ada di chip

Saya tidak melakukan reverse engineering sendiri. Cyrill Künzi [membongkar protokolnya](https://kuenzi.dev/toothbrush/) dan mbirth [memetakan setiap byte](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html), dan bersama-sama mereka menemukan segalanya di bawah ini. Inilah yang disimpan NTAG213 di kepala sikat Anda:

- **Jenis dan warna kepala sikat** - satu byte di halaman `0x1F` yang mengidentifikasi modelnya (Premium All-in-One, Gum Care, DiamondClean, dll.) dan warnanya ([peta memori mbirth](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) mencantumkan 22 jenis yang diketahui)
- **Target masa pakai** - di `0x21`, biasanya `0x5460` = 21.600 detik, yaitu 180 sesi menyikat dua menit, atau tiga bulan penggunaan dua kali sehari
- **Kode manufaktur** - di `0x21-0x23`, tanggal produksi dan lini sebagai ASCII, seperti `241206 31K` (diproduksi 6 Desember 2024, di lini 31K). Juga tercetak di tangkai
- **Waktu sikat yang terakumulasi** - dua byte pertama di halaman `0x24` menyimpan total detik kepala yang sudah digunakan sebagai nilai 16-bit. Ketika mencapai `0xFFFF` (65.535 detik, sekitar 18 jam menyikat terus-menerus), penghitung berhenti. Kepala baru dimulai dari `00:00:02:00` - dua byte pertama adalah nol (tidak ada penggunaan), arti dua byte terakhir saat ini tidak diketahui
- **Intensitas dan mode terakhir** - di `0x24` juga: Rendah/Sedang/Tinggi dan Bersih/White+/Gum Health/Deep Clean+
- **Sebuah URL** - mengarah ke `philips.com/nfcbrushheadtap`, yang terbuka jika Anda mengetuk kepala dengan pembaca NFC generik

Ketika waktu yang terakumulasi melebihi target (21.600 detik), gagang berkedip dengan LED ambernya. Itu chip yang berbicara, bukan bulu sikat.

---

## Mengapa Anda mungkin ingin meresetnya

Interval penggantian tiga bulan adalah rekomendasi Philips, bukan pengukuran ilmiah dari keausan bulu sikat. Chip menghitung detik, bukan kerusakan bulu sikat. Jika Anda ingin memutuskan sendiri - dengan melihat bulu sikat Anda alih-alih mematuhi timer hitung mundur - mereset penghitung memungkinkan Anda melakukan itu.

Anda juga mungkin mereset jika Anda bergantian antara beberapa kepala (perjalanan vs. rumah) dan ingin melacaknya sendiri.

---

## Cara kerja kata sandi

NTAG213 dilindungi kata sandi. Setiap kepala sikat memiliki kata sandi unik 4-byte. Gagang sikat gigi mengautentikasi dengannya setiap kali menulis ke tag.

Kata sandi dihitung dari dua input: UID 7-byte tag dan kode manufaktur yang tersimpan di tag (dan tercetak di tangkai). [Aaron Christophel](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) melakukan reverse engineering algoritma dari firmware Sonicare setelah Cyrill Künzi awalnya mengendus transmisi kata sandi menggunakan radio yang didefinisikan perangkat lunak.

⚠️**Penting:** NTAG213 terkunci secara permanen setelah **tiga percobaan kata sandi yang gagal**. Chip menjadi hanya bisa dibaca selamanya - bahkan sikat gigi pun tidak bisa menulis ke dalamnya lagi. Jangan menebak.

---

## Cara memeriksa dan mereset dengan NFC.cool Tools

Inilah tampilan di aplikasi:

<figure class="sk-phone-screenshot">
  <img src="/assets/images/Blog/sonicare-reset-screen.webp" alt="NFC.cool Tools menampilkan kepala sikat Sonicare pada 80% penggunaan dengan tombol Reset Timer" />
</figure>

NFC.cool Tools menangani seluruh prosesnya: membaca tag, menghitung kata sandi, dan menampilkan statistik kepada Anda. Tidak perlu perintah hex, tidak perlu kalkulator web, tidak perlu SDR.

1. Buka **NFC.cool Tools** di iPhone Anda
2. Pergi ke **Toothbrush Head Reset**
3. Ketuk **Read NFC** dan tempelkan kepala sikat ke ponsel Anda
4. Aplikasi menampilkan **pengukur persentase** seberapa banyak masa pakai kepala yang sudah terpakai, dengan waktu yang sudah terpakai dan tersisa di bawahnya
5. Ketuk **Reset Timer** untuk mengatur ulang penghitung penggunaan ke nol, atau pindai kepala lain

Tersedia sekarang di [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-en&mt=8), akan hadir di [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-en) dalam pembaruan mendatang.

---

## Apa yang sebenarnya dilakukan reset

Saat Anda mereset, Anda menulis `00:00:02:00` ke halaman `0x24` - nilai yang sama seperti kepala sikat baru saat pertama kali dibeli. Hanya dua byte pertama (penghitung penggunaan) yang diubah kembali ke nol. Arti dua byte terakhir tidak diketahui, sehingga aplikasi mempertahankannya.

Sikat gigi mulai menghitung dari nol lagi, dan lampu amber muncul kembali setelah tiga bulan lagi. Di mana Anda bisa memeriksa bulu sikat dan memutuskan sendiri.

---

## Gambaran yang lebih besar: NFC di benda sehari-hari

Kepala sikat gigi dengan chip NFC yang menghitung mundur hingga pembelian berikutnya Anda adalah puncak dari Internet of Shit. Saya membangun pekerjaan saya di sekitar NFC karena menurut saya itu benar-benar berguna, tetapi menanamkannya dalam plastik sekali pakai khusus untuk mendorong Anda membeli lebih banyak adalah... sebuah pilihan.

NTAG213 yang sama juga digunakan untuk hal-hal yang benar-benar melayani konsumen: autentikasi produk, kontrol akses, dan segera Digital Product Passport EU, yang akan mewajibkan tag NFC pada produk konsumen sehingga Anda dapat memverifikasi apa yang Anda beli dan dari mana asalnya. Itulah NFC yang digunakan *untuk* Anda, bukan melawan Anda.

NFC.cool Tools membaca dan menulis semua ini. Fitur Sonicare adalah satu contoh memahami apa yang ada di tag di sekitar Anda, dan memutuskan apa yang harus dilakukan dengan informasi tersebut.

---

## Bacaan lebih lanjut

- [Tulisan reverse engineering asli Cyrill Künzi](https://kuenzi.dev/toothbrush/) - penginderaan SDR, ekstraksi kata sandi, dan analisis pertama yang terperinci tentang protokol NFC Sonicare
- [Generator kata sandi Aaron Christophel](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) - algoritma yang diekstrak dari firmware Sonicare
- [Peta memori NTAG213 mbirth](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) - dokumentasi terperinci setiap byte di chip

*Punya kepala sikat Sonicare untuk diperiksa? [Unduh NFC.cool Tools untuk iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-en&mt=8) atau [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-en) (reset Sonicare segera hadir di Android) dan lihat apa yang sudah dilacak sikat gigi Anda.*
