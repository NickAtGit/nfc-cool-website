---
id: nfc-blog-020
title: "Menyelami NFC di iPhone: pandangan dari dalam"
date: 2024-02-08
tags: ["nfc-tags", "iphone"]
summary: "Cara NFC sebenarnya bekerja di iPhone - dari elemen aman Apple Pay hingga pembacaan tag Core NFC. Pandangan praktis tentang protokol, sejarah iOS, dan mengapa jangkauan pendek adalah fitur, bukan keterbatasan."
metaTitle: "Cara kerja NFC di iPhone: pandangan dari dalam"
metaDescription: "Penjelasan praktis tentang NFC di iPhone - cara protokol bekerja, elemen aman Apple Pay, pembacaan tag Core NFC, dan mengapa jangkauan pendek adalah fitur keamanan."
ogTitle: "Menyelami NFC di iPhone: pandangan dari dalam"
ogDescription: "Cara NFC sebenarnya bekerja di iPhone - protokol, elemen aman, pembacaan tag Core NFC, dan sejarah iOS."
image: "/assets/images/Blog/nfc-on-iphones-insider-look.webp"
---
Banyak teknologi yang kita gunakan setiap hari menghilang ke latar belakang. Anda mengetuk untuk membayar, membuka kunci, memindai, berbagi - dan tidak pernah memikirkan protokol di baliknya. NFC adalah salah satu bagian perpipaan yang senyap itu, dan setelah bertahun-tahun membangun NFC.cool, aplikasi untuk membaca dan menulis tag NFC, saya telah menghabiskan lebih banyak waktu di dalam perpipaan itu dari yang kebanyakan orang lakukan. Inilah cara sebenarnya bekerja di iPhone Anda, seperti yang saya jelaskan kepada teman yang penasaran.

---

## Apa sebenarnya NFC itu

**Near Field Communication** adalah protokol nirkabel jarak pendek - dua perangkat dapat bertukar data ketika berada dalam jarak sekitar 4 cm satu sama lain. Saya menganggapnya sebagai saudara yang disederhanakan dengan jangkauan jauh lebih pendek dari Bluetooth dan Wi-Fi.

Jangkauan pendek itu membuat orang bingung pada awalnya, tetapi itu bukan keterbatasan. Itu adalah model keamanannya, dan begitu hal itu masuk akal bagi saya, banyak pilihan desain NFC menjadi jelas. Anda tidak bisa secara tidak sengaja mengetuk terminal pembayaran dari seberang ruangan, dan pembaca berbahaya tidak bisa diam-diam menyedot data dari dompet Anda dari kejauhan. Jika Anda baru mengenal semua ini, saya menulis [panduan pemula tentang tag NFC](/blog/nfc-tags-beginners-guide/) yang memulai dari titik yang lebih awal dari postingan ini.

---

## NFC di iPhone: sejarah singkat

Apple pertama kali menyertakan perangkat keras NFC dengan iPhone 6 dan 6 Plus pada 2014, tetapi radio tersebut dikunci hanya untuk Apple Pay. Aplikasi pihak ketiga sama sekali tidak bisa membaca tag NFC - yang, sebagai seseorang yang kemudian akan membangun aplikasi NFC, adalah beberapa tahun yang frustasi untuk disaksikan.

Hal itu berubah dengan **iOS 11** (2017), yang memperkenalkan framework **Core NFC** dan akhirnya mengizinkan pengembang seperti saya untuk membaca tag NDEF. Apple terus membuka pintu lebih lebar di rilis berikutnya - iOS 13 menambahkan dukungan penulisan, dan iPhone XS dan yang lebih baru menambahkan pembacaan tag latar belakang yang selalu aktif. Hari ini, di iPhone modern mana pun, Anda bisa mengetuk tag tanpa membuka apa pun: OS mengenalinya dan menawarkan tindakan yang tepat.

---

## Cara NFC sebenarnya memindahkan data

Perangkat NFC beroperasi dalam salah satu dari dua peran per interaksi: **aktif** (bertenaga, menghasilkan medan) atau **pasif** (tanpa baterai, memanen daya dari medan). Ini adalah satu ide yang selalu saya kembali ketika seseorang bertanya kepada saya bagaimana NFC bekerja.

Ketika Anda melakukan pembayaran Apple Pay, iPhone Anda adalah pembaca aktif. Ia menghasilkan medan radio pada 13,56 MHz. Elemen NFC terminal pembayaran terbangun di dalam medan itu, mengidentifikasi dirinya, dan bertukar sejumlah kecil muatan kriptografis dengan ponsel Anda. Data kartu Anda tidak pernah meninggalkan **Elemen Aman** - chip yang terdedikasi dan terisolasi secara perangkat keras di ponsel. Yang keluar adalah token sekali pakai.

Ketika Anda mengetuk stiker NFC di poster, peran dibalik. Tag poster bersifat pasif - tidak memiliki baterai. Pembaca iPhone Anda memberinya daya, tag merespons dengan rekaman NDEF apa pun yang tersimpan di dalamnya, dan iOS memutuskan apa yang harus dilakukan (membuka URL, meluncurkan aplikasi, menampilkan kartu kontak, memicu Shortcut). Bagian kedua itu - sisi tag - adalah tempat NFC.cool berada, dan jika Anda ingin melihatnya beraksi tanpa menginstal apa pun, Anda bisa [membaca tag NFC langsung dari browser Anda](/online-nfc-reader/) di Android.

---

## NDEF: bahasa universal

Lapisan data di atas radio NFC adalah **NDEF** - NFC Data Exchange Format. Saya menggambarkannya sebagai format rekaman kecil yang mendeskripsikan dirinya sendiri: sebuah tag membawa satu atau lebih rekaman, dan setiap rekaman memiliki tipe (URI, teks, vCard, kredensial Wi-Fi, MIME khusus) dan muatan.

Setiap ponsel berkemampuan NFC di seluruh dunia berbicara NDEF, itulah mengapa tag yang diprogram di perangkat Android akan terbaca dengan baik di iPhone dan sebaliknya. Ini adalah salah satu dari sedikit tempat di mobile di mana iOS dan Android benar-benar berbagi standar, dan jujur saja interoperabilitas itu adalah hal yang paling saya syukuri saat membangun fitur - saya menulis ke format, bukan ke platform. Jika Anda ingin mencoba menulis rekaman Anda sendiri, saya membahasnya di [cara menulis tag NFC di iPhone](/blog/write-nfc-tags-iphone/).

---

## Privasi dan keamanan

Dua lapisan pertahanan layak disebutkan, dan keduanya adalah yang paling sering saya jelaskan:

- **Jangkauan.** Beberapa sentimeter sulit untuk disadap tanpa antena yang mencolok - ini adalah model ancaman asli yang menjadi dasar desain NFC.
- **Tokenisasi.** Apple Pay tidak pernah mengirimkan nomor kartu nyata Anda. Setiap transaksi menggunakan Nomor Akun Perangkat ditambah satu kriptogram sekali pakai, yang dihasilkan di dalam Elemen Aman. Bahkan terminal yang dikompromikan pun tidak bisa memutarnya kembali.

Untuk pembacaan tag, permukaan ancaman berbeda - tag itu sendiri adalah hal yang dipercaya. Jika Anda mengontrol apa yang ada di tag (otomasi rumah Anda sendiri, kartu nama Anda), Anda baik-baik saja. Jika Anda mengetuk tag acak di ruang publik, Anda masih harus melihat prompt konfirmasi di iOS sebelum apa pun terjadi. Ketika saya benar-benar memerlukan tag untuk menyimpan rahasia daripada sekadar menunjuk ke salah satunya, saya menggunakan tag kriptografis, dan saya membahasnya di [menyimpan rahasia yang aman dan terenkripsi di tag NFC](/blog/nfc-safe-encrypted-secrets/).

---

## Mengapa ini penting

NFC adalah salah satu protokol yang menghilang saat berfungsi, dan itulah tepatnya mengapa saya merasa puas membangun di atasnya. Anda mengetuk pintu putar, terminal pembayaran, kartu nama, speaker pintar - dan sesuatu terjadi. Tidak ada pemasangan pasangan, tidak ada PIN, tidak ada peluncuran aplikasi. Hanya gerakan fisik yang disengaja yang mengotorisasi satu pertukaran spesifik.

Itulah mengapa saya membangun [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-on-iphones-insider-look-en&mt=8) - untuk membuat seluruh permukaan NDEF dari NFC tersedia tanpa siapa pun harus mempelajari protokolnya terlebih dahulu. Baca tag apa pun, tulis tipe rekaman apa pun, kunci tag saat selesai. Di iPhone atau [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-on-iphones-insider-look-en).
