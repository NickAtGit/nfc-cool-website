---
id: "e-ink-phone-case-2026-10"
title: "Saya mengoprek casing ponsel e-ink saya supaya iPhone bisa menulis ke layarnya"
date: "2026-10-12"
tags: ["announcements", "iphone", "nfc-tags"]
summary: "Saya punya salah satu casing ponsel e-ink NFC tanpa baterai itu, dan saya kurang suka aplikasi bawaannya. Jadi saya membongkar cara casing itu berkomunikasi, dan kini NFC.cool Tools 7.2.0 bisa menampilkan foto, kode QR, acara berikutnya, agenda hari ini, dan pengingat Anda di casing yang memakai aplikasi DeerPhoneCase, KAZAVA, Novixand, atau TYOHINN."
image: "/assets/images/Blog/nfc-e-ink-phone-case-iphone.webp"
imageAlt: "iPhone dalam casing hitam dengan layar e-ink di bagian belakangnya yang menampilkan matahari merah-kuning di atas perbukitan hitam, di samping iPhone kedua yang mengirim gambar yang sama lewat NFC"
author: "Nicolo Stanciu"
metaTitle: "Casing ponsel e-ink NFC di iPhone: foto, kalender, kode QR"
metaDescription: "Tampilkan foto, kode QR, agenda, dan pengingat di casing ponsel e-ink NFC tanpa baterai langsung dari iPhone. Mendukung casing DeerPhoneCase, KAZAVA, Novixand, dan TYOHINN."
ogTitle: "Saya mengoprek casing e-ink saya supaya bisa diisi dari iPhone"
ogDescription: "Cara saya membongkar protokol casing ponsel e-ink NFC tanpa baterai, dan apa saja yang kini bisa ditampilkan NFC.cool di layarnya."
---

Layarnya berkedip.

Sepele, memang. Panel e-ink selalu begitu setiap kali menggambar ulang: kilatan cepat melewati semua warnanya sebelum gambar barunya muncul utuh. Tapi kedipan yang satu ini berasal dari kode yang saya tulis sendiri, dikirim dari iPhone saya ke bagian belakang sebuah casing ponsel yang sama sekali tidak punya baterai. Beberapa detik kemudian, seluruh panel berubah menjadi merah polos dengan tekstur yang sedikit mirip kertas. Tidak ada yang lain. Cuma merah.

Sudah bertahun-tahun saya membangun banyak sekali fitur NFC, dan persegi panjang merah polos itu termasuk salah satu momen yang paling saya sukai dari semuanya.

---

## Layar yang tidak butuh baterai

Kalau Anda belum pernah melihat casing seperti ini: bentuknya mirip casing ponsel biasa, hanya saja sebagian besar bagian belakangnya berupa layar e-ink, jenis layar yang sama dengan yang dipakai e-reader. Layar di casing saya punya empat warna tinta: hitam, putih, merah, dan kuning.

Di dalamnya tidak ada baterai, juga tidak ada port pengisian daya. Casing ini mendapat daya dari medan NFC ponsel Anda, medan yang sama yang membangunkan stiker NFC saat Anda memindainya. Selama ponsel ditempelkan ke casing, medan itu menghidupkan sebuah chip kecil dan sebuah mikrokontroler, yang lalu menggambar ulang layarnya. Begitu gambar sudah tampil, e-ink sama sekali tidak butuh daya untuk mempertahankannya. Gambarnya tetap di sana, meski ponselnya kehabisan baterai atau casingnya tersimpan di laci.

Saya membayangkannya seperti papan gambar ajaib mainan anak-anak, bedanya yang bisa menghapus dan menggambar ulang hanyalah ponsel Anda. Tidak ada yang berubah sampai Anda menempelkan ponsel ke casing itu lagi.

Casing seperti ini dijual dengan banyak sekali nama, dan hampir setiap merek punya aplikasinya sendiri. Casing saya datang dengan aplikasi bernama **DeerPhoneCase**. Aplikasi lainnya akan saya bahas di bagian bawah.

---

## Kenapa saya tidak pakai aplikasi resminya saja

Saya sudah mencoba banyak aplikasi dari produsennya dengan casing saya, dan banyak yang berfungsi. Tapi semuanya sangat tidak enak dipakai. Semuanya bukan aplikasi iPhone native, sebagian besar fiturnya baru bisa dipakai setelah login, dan pada akhirnya cuma menaruh gambar yang benar-benar ingin dilakukannya.

Saat memandangi layar di bagian belakang ponsel saya, yang saya lihat bukan bingkai foto. Yang saya lihat adalah layar mungil yang selalu tampil tanpa memakan baterai sedikit pun. Tempat yang pas untuk rapat saya berikutnya, agenda hari ini, atau kode QR yang bisa dipindai orang langsung dari belakang ponsel saya. Aplikasi resminya tidak bisa melakukan satu pun dari itu, padahal saya sendiri membuat aplikasi yang seluruhnya tentang NFC. Jadi saya putuskan untuk mengajari NFC.cool berbicara dengan casing itu sendiri.

---

## Membongkar cara kerjanya

Saya mengerjakannya bersama Claude, model AI dari Anthropic, yang ternyata rekan yang sangat sabar untuk menelusuri kode hasil dekompilasi.

Ide pertama adalah yang paling jelas: lihat bagaimana aplikasi iPhone resminya berkomunikasi dengan casing. Hasilnya nihil. Aplikasi dari App Store dienkripsi, dan tidak ada yang berguna untuk dibaca.

Versi Android-nya lain cerita. Casing ini produk white-label, jadi aplikasi dari vendor yang sama juga ada di Google Play dengan namanya sendiri, dan aplikasi Android bisa didekompilasi. Kami membongkarnya, dan dari kode itu ditambah informasi yang bisa kami temukan di internet tentang chip di dalamnya (chip NFC buatan Fudan dengan mikrokontroler di belakangnya), seluruh percakapan antara ponsel dan casing akhirnya terungkap:

1. Ponsel dan casing melakukan jabat tangan login singkat, supaya casing tahu bahwa yang mengajaknya bicara adalah aplikasi sungguhan.
2. Setelah itu, setiap perintah dienkripsi.
3. Gambar dikirim dalam 139 paket berisi piksel mentah. Setiap piksel memakan dua bit, pas sekali untuk empat warna tinta.
4. Ponsel menyuruh casing menggambar ulang, lalu setiap detik menanyakan apakah prosesnya sudah selesai.

Tes pertama saya tidak menulis sesuatu yang canggih, hanya satu warna di seluruh layar. Itulah persegi panjang merah tadi.

---

## Selalu mentok di 20 detik

Lalu saya mencoba gambar sungguhan, dan hasilnya berantakan. Ada garis melintang di layar, warnanya meleset, fotonya cuma tampil separuh.

Proses menggambar ulang makan waktu sekitar 18 detik, dan koneksinya terus putus tepat di sekitar detik ke-20. Claude yakin iOS memang mengakhiri setiap sesi NFC setelah 20 detik dan tidak ada yang bisa kami lakukan. Saya tidak percaya, karena aplikasi resminya bisa melakukannya di iPhone yang sama persis.

Jadi saya menyambungkan iPhone ke Mac dan merekam log sistem selama aplikasi resmi menggambar sebuah foto. Dari situ triknya kelihatan: iOS membatasi setiap *koneksi* ke sebuah tag sekitar 20 detik, bukan seluruh sesinya. Tepat setelah mengirim gambar, aplikasi resmi memutus koneksi dan menyambung lagi sekitar sepersepuluh detik kemudian, lalu membiarkan casing menggambar ulang di koneksi baru itu, dengan jatah 20 detik yang masih utuh.

Begitu NFC.cool melakukan hal yang sama, gambarnya tampil bersih. Saya akui, saya cukup puas karena kali ini sayalah yang benar.

---

## Apa saja yang bisa ditampilkan NFC.cool di casing Anda

Fiturnya ada di **NFC.cool Tools 7.2.0**, di bagian Aplikasi NFC, dengan nama **Casing e-ink**. Pilih desain, lihat pratinjau yang menunjukkan persis bagaimana casing akan menampilkannya, lepaskan casing dari ponsel, lalu tempelkan iPhone Anda ke bagian belakang casing sampai jendela pemindaian NFC menutup.

- **Foto**: gambar apa saja dari galeri Anda, dipotong pas dengan ukuran layar. Yang ini gratis. Foto Anda diubah ke empat warna tinta, dengan penguatan warna (Standar, Cerah, atau Maks) dan opsi hitam putih.
- **Potongan**: memisahkan orang, hewan peliharaan, atau benda dari sebuah foto, lalu menaruhnya di atas latar dengan salah satu dari empat warna tinta.
- **Kode QR**: kode QR apa pun yang Anda simpan di NFC.cool, lengkap dengan desainnya sendiri, atau kode yang Anda ketik langsung. Warnanya bisa dibalik, dan aplikasi akan memperingatkan Anda kalau teksnya terlalu panjang sehingga kodenya sulit terbaca di layar sekecil itu.
- **Acara berikutnya** atau **acara pilihan** dari kalender Anda.
- **Agenda hari ini**: semua yang ada di kalender Anda hari ini.
- **Pengingat**: pengingat yang belum selesai dari salah satu daftar Anda, dalam tiga ukuran teks.

Desain kalender dan pengingat hanyalah cuplikan sesaat. Casing menampilkan keadaan saat Anda mengirimnya, sampai Anda mengirim desain berikutnya. Casing tidak bisa memperbarui dirinya sendiri tanpa ponsel Anda, dan itulah harga yang harus dibayar untuk perangkat yang tidak pernah butuh pengisi daya.

<figure class="phone-figure" data-layout="stage">
<figcaption>Desain untuk casing</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/1-designs-440w.webp" alt="Layar E-ink case di NFC.cool Tools, dengan desain Photo, QR code, dan Calendar and Reminders"><p><strong>E-ink case.</strong> Di NFC Apps. Pilih desain, lalu ketuk Put on case.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/2-photo-440w.webp" alt="Desain Photo: matahari terbenam di atas bukit dalam empat tinta casing, dengan Crop dan pengatur kecerahan"><p><strong>Foto.</strong> Gambar apa pun, diubah ke empat tinta casing.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/3-qr-code-440w.webp" alt="Desain QR code, menampilkan kode QR tersimpan dalam tinta casing"><p><strong>Kode QR.</strong> Kode yang Anda simpan di NFC.cool, atau yang Anda ketik.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/4-agenda-440w.webp" alt="Desain Today's agenda untuk Kamis, 15 Oktober, berisi lima acara dari pukul 9.00 hingga 19.00, dengan Put on case"><p><strong>Agenda hari ini.</strong> Kalender Anda hari itu, sebagai cuplikan di bagian belakang ponsel.</p></li>
</ol>
</figure>

---

## Yang perlu diketahui

**Beri casing jeda di antara dua pengiriman.** Kalau Anda mengirim dua desain berturut-turut, desain kedua akan tampil pudar dan keabu-abuan. Casing butuh waktu sebentar untuk pulih setelah menggambar ulang. Aplikasi resminya meminta Anda menunggu satu menit, dan saran itu juga berlaku untuk NFC.cool.

**Tahan posisinya.** Seluruh prosesnya butuh sedikit waktu, kebanyakan untuk menggambar ulang itu sendiri. Kalau ponsel Anda menjauh terlalu cepat, aplikasi akan memberi tahu, dan Anda tinggal mencoba lagi.

**Untuk sementara, hanya di iPhone.** Fitur ini ada di aplikasi iPhone. Aplikasi Android belum memilikinya.

**Casing mana yang bisa dipakai.** Sebagian besar casing ini berasal dari satu pengembang yang menerbitkan aplikasi terpisah untuk hampir setiap merek. Semua aplikasi yang bisa saya temukan sudah saya coba dengan casing saya:

- **DeerPhoneCase**, **KAZAVA**, **Novixand**, dan **TYOHINN** berfungsi dengan casing saya, dan NFC.cool juga. Kalau casing Anda datang dengan salah satu aplikasi ini, NFC.cool seharusnya bisa dipakai dengannya.
- **Bestie e-INK** dan **KINGZER** tidak berfungsi dengan casing saya. Gambarnya terkirim lewat NFC tanpa masalah, tetapi saat casing seharusnya menggambar ulang, tidak terjadi apa-apa.
- **SpaceInk+**, dari pengembang lain, sama sekali tidak berfungsi dengan casing saya. Aplikasinya hanya menampilkan "device channel information mismatch".

Itu tidak berarti NFC.cool tidak bisa dipakai dengan casing untuk Bestie e-INK, KINGZER, atau SpaceInk+. Bisa jadi casing itu hanya sedikit berbeda dari punya saya, dan saya tidak bisa mengujinya. Kalau Anda punya salah satunya, [beri tahu saya](/contact/) apakah NFC.cool bisa dipakai dengannya atau tidak. Kalau casing Anda memakai aplikasi lain, NFC.cool akan memberi tahu bahwa casing itu belum didukung dan menawarkan tombol **Kirim detail casing**. Tombol itu mengirim detail teknis chip-nya saja, tanpa apa pun yang bisa mengidentifikasi Anda atau casing Anda, supaya saya bisa melihat casing mana yang benar-benar dimiliki orang dan menambahkan dukungannya.

**Di mana membelinya.** Di Amazon, casing ini dijual dengan banyak nama merek, beberapa di antaranya cukup membingungkan, tetapi ujung-ujungnya casing yang sama. [Ini hasil pencariannya di Amazon](https://link.amazon/B0hUxLZTR) (tautan afiliasi). Casing saya bertuliskan DIY di bagian dalam, dan beberapa produk mencantumkan DIY di judulnya, jadi itu kata yang bagus untuk dicari. Kalau halaman produk menyebutkan aplikasi yang dipakai casing itu, carilah DeerPhoneCase, KAZAVA, Novixand, atau TYOHINN.

---

## Intinya

Kalau Anda punya casing seperti ini yang tergeletak begitu saja dan masih menampilkan gambar yang sama sejak hari pertama, saatnya memberinya tampilan yang lebih berguna. NFC.cool Tools tersedia di [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-e-ink-phone-case-iphone-id&mt=8).

Dan kalau Anda belum pernah melihat layar e-ink berkedip lalu memunculkan gambar yang Anda kirim sendiri, saya sangat menyarankannya. Beberapa detik itu terasa sangat memuaskan.
