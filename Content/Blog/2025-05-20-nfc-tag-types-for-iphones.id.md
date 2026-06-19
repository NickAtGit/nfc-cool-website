---
id: "nfc-tag-types-2025-05"
title: "Memahami berbagai jenis tag NFC - dan mana yang kompatibel dengan iPhone"
date: "2025-05-20"
tags: ["nfc-tags", "guides", "iphone"]
summary: "Tipe 1 hingga Tipe 5, siapa yang membuatnya, dan mengapa seri NTAG (Tipe 2) adalah pilihan paling aman untuk proyek iPhone."
metaDescription: "Jenis tag NFC dijelaskan - Type 1 hingga Type 5, siapa pembuat chipnya, dan kenapa seri NTAG (Type 2) jadi pilihan teraman dan paling didukung untuk proyek iPhone."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/nfc-tag-types.webp"
imageAlt: "Berbagai jenis tag NFC berjejer di samping iPhone"
---

Tag NFC adalah sirkuit terintegrasi kecil yang menyimpan informasi yang dapat dibaca oleh perangkat berkemampuan NFC, seperti ponsel Anda. Tapi begini hal yang saya harap seseorang beritahu saya lebih awal: tidak semua tag NFC diciptakan sama. Ada banyak sekali jenis dari berbagai produsen, masing-masing dengan keunikannya sendiri, dan itu membuat pemilihan yang tepat untuk iPhone Anda menjadi cukup rumit.

Saya telah menghabiskan bertahun-tahun membangun NFC.cool, sebuah aplikasi untuk membaca dan menulis tag NFC, dan "tag apa yang harus saya beli untuk iPhone saya?" adalah salah satu pertanyaan yang paling sering saya terima. Jadi inilah jawaban yang saya berikan. Saya akan membahas lima jenis tag NFC, siapa yang sebenarnya membuatnya, dan mengapa salah satunya adalah pilihan aman untuk hampir semua proyek iPhone. Jika Anda benar-benar baru dalam semua ini, Anda mungkin ingin mulai dengan [panduan lengkap pemula tentang tag NFC](/blog/nfc-tags-beginners-guide/) terlebih dahulu - posting ini masuk satu lapisan lebih dalam.

---

## Memahami jenis tag NFC

Tag NFC terbagi dalam lima jenis: Tipe 1, Tipe 2, Tipe 3, Tipe 4, dan Tipe 5. Klasifikasi itu bukan sesuatu yang dibuat-buat oleh produsen - itu berasal dari NFC Forum, konsorsium industri yang menetapkan standar. Setiap jenis memiliki kapasitas memori dan kecepatan sendiri, dan bisa berupa baca-tulis atau hanya baca.

Itulah lensa yang saya gunakan setiap kali melihat lembar spesifikasi tag, jadi izinkan saya membahasnya satu per satu.

---

## Tipe 1 & 2 - Topaz dan MIFARE Ultralight®

Tipe 1 (Topaz, oleh Broadcom) dan Tipe 2 (MIFARE Ultralight®, oleh [NXP Semiconductors](https://nxp.com)) adalah ujung spektrum yang murah dan praktis. Keduanya cocok untuk aplikasi sederhana seperti poster dan kartu nama. Kapasitas memori mereka kecil (48 byte hingga sekitar 2 KB), tetapi menurut pengalaman saya itu cukup untuk URL atau muatan teks pendek, yang sebenarnya diinginkan kebanyakan orang.

---

## Tipe 3 - FeliCa™

Tag Tipe 3, yang juga dikenal sebagai FeliCa™, dikembangkan oleh Sony. Anda akan paling sering menemukannya di Asia, menggerakkan tiket transportasi umum dan uang elektronik. Tag ini menawarkan kecepatan dan memori yang lebih tinggi (hingga 1 MB), tetapi penggunaannya cukup terbatas karena harganya lebih mahal dan terikat pada aplikasi yang spesifik untuk kawasan tertentu. Saya jarang menggunakannya di luar konteks itu.

---

## Tipe 4 - MIFARE DESFire®

Tag MIFARE DESFire®, juga dari NXP Semiconductors, adalah Tipe 4. Ini adalah pilihan keamanan tinggi dan kapasitas tinggi, dibangun untuk pekerjaan kompleks seperti kontrol akses yang aman dan sistem transportasi umum. Tag ini dapat menyimpan hingga 8 KB. Ketika sebuah proyek benar-benar membutuhkan perlindungan kriptografis, inilah keluarga yang saya lirik - saya membahas sisi keamanan lebih detail dalam postingan saya tentang [menyimpan rahasia dengan aman di tag NFC terenkripsi](/blog/nfc-safe-encrypted-secrets/).

---

## Tipe 5 - ISO 15693

Tag Tipe 5 sesuai dengan standar ISO 15693 dan relatif baru dalam ekosistem NFC. Tag ini sebagian besar merupakan cerita industri, dan fitur utamanya adalah jangkauan baca yang diperpanjang dibandingkan jenis lainnya. Berguna jika Anda melacak inventaris di gudang, kurang berguna untuk tag yang ditempel di kulkas Anda.

---

## Tag NFC mana yang harus Anda pilih untuk iPhone?

Inilah bagian yang paling penting. iPhone dari iPhone 7 ke atas kompatibel dengan NFC Tipe 1, 2, dan 5, tetapi menawarkan dukungan terbaik untuk Tipe 2. Tag NFC Tipe 2 adalah [seri NTAG](https://www.nxp.com/products/wireless-connectivity/nfc-hf/ntag-for-tags-and-labels:NTAG-TAGS-AND-LABELS) dari NXP Semiconductors.

Model NTAG213, NTAG215, dan NTAG216 adalah yang paling populer dalam seri tersebut, dan bekerja dengan sangat baik dengan iPhone - itulah yang saya uji setiap hari. Tag ini memberi Anda memori yang cukup (144 hingga 888 byte) untuk sebagian besar proyek praktis, sepenuhnya dapat ditulis dan dibaca oleh iPhone berkemampuan NFC mana pun, dan dapat ditulis ulang, sehingga Anda dapat mengubah isinya sesering yang Anda mau.

Satu catatan praktis yang telah menghemat banyak frustrasi bagi saya: semakin besar tag dan antena-nya, semakin andal pembaca NFC mendeteksinya. Saya akan menghindari stiker yang sangat murah dan tipis jika keandalan penting untuk proyek Anda - beberapa sen yang Anda hemat tidak sebanding dengan tag yang hanya terbaca pada ketukan ketiga.

Hal utama yang dilakukan iPhone dengan NFC adalah membaca pesan NFC Data Exchange Format (NDEF) - URL, teks biasa, atau vCard (kartu nama digital). Tag apa pun yang mendukung NDEF, dan sebagian besar tag seri NTAG mendukungnya, adalah pilihan yang solid untuk pengguna iPhone. Saat Anda siap untuk benar-benar memasukkan data ke salah satunya, saya menulis panduan langkah demi langkah tentang [cara menulis tag NFC di iPhone](/blog/write-nfc-tags-iphone/).

---

## Ringkasan

Jika Anda berbelanja tag NFC untuk digunakan dengan iPhone, rekomendasi jujur saya sederhana: tag Tipe 2 dari seri NTAG oleh NXP Semiconductors. Tag ini hemat biaya dan memberi Anda kompatibilitas dan fungsionalitas terbaik untuk apa yang sebenarnya ingin dilakukan kebanyakan orang dengan NFC di iPhone. Beli satu paket stiker NTAG215 dan Anda akan siap untuk hampir segalanya.

NFC terus berkembang, jadi ada baiknya selalu memperhatikan perkembangan baru dan spesifikasi tag. Untuk informasi lebih lanjut, lihat postingan saya sebelumnya tentang [menyelami keajaiban NFC di iPhone](/blog/nfc-on-iphones-insider-look/), dan jika Anda hanya ingin melihat apa yang sudah ada di sebuah tag, Anda bisa [membaca tag NFC langsung dari browser](/online-nfc-reader/).

Selamat mencoba!
