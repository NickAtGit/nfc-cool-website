---
id: "e-ink-phone-case-2026-10"
title: "Saya mengoprek casing ponsel e-ink saya supaya iPhone bisa menulis ke layarnya"
date: "2026-10-12"
tags: ["announcements", "iphone", "nfc-tags"]
summary: "Saya punya salah satu casing ponsel e-ink NFC tanpa baterai itu, dan saya kurang suka aplikasi bawaannya. Jadi saya membongkar cara casing itu berkomunikasi, dan kini NFC.cool Tools 7.2.0 bisa menampilkan foto, kode QR, acara berikutnya, agenda hari ini, dan pengingat Anda di casing yang memakai aplikasi DeerPhoneCase, KAZAVA, Novixand, atau TYOHINN. Sejak versi 7.3.0, aplikasi ini juga bisa menggambar di casing berukuran lebih besar yang memakai aplikasi AI Cast Assistant."
image: "/assets/images/Blog/nfc-e-ink-phone-case-iphone.webp"
imageAlt: "iPhone dalam casing hitam dengan layar e-ink di bagian belakangnya yang menampilkan matahari merah-kuning di atas perbukitan hitam, di samping iPhone kedua yang mengirim gambar yang sama lewat NFC"
author: "Nicolo Stanciu"
metaTitle: "Casing ponsel e-ink NFC di iPhone: foto, kalender, kode QR"
metaDescription: "Tampilkan foto, kode QR, agenda, dan pengingat di casing ponsel e-ink NFC tanpa baterai langsung dari iPhone. Mendukung casing DeerPhoneCase, KAZAVA, dan AI Cast Assistant."
ogTitle: "Saya mengoprek casing e-ink saya supaya bisa diisi dari iPhone"
ogDescription: "Cara saya membongkar protokol casing ponsel e-ink NFC tanpa baterai, dan apa saja yang kini bisa ditampilkan NFC.cool di layarnya."
---

> **Pembaruan, Oktober 2026:** NFC.cool Tools 7.3.0 kini juga bisa menggambar di casing berukuran lebih besar yang memakai aplikasi **AI Cast Assistant**, dan menambahkan dua desain baru, **Editor** dan **AI Playground**. Cerita bagaimana kami berhasil membuat casing kedua itu bekerja ada di bagian bawah.

Layarnya berkedip.

Sepele, memang. Panel e-ink selalu begitu setiap kali menggambar ulang: kilatan cepat melewati semua warnanya sebelum gambar barunya muncul utuh. Tapi kedipan yang satu ini berasal dari kode yang saya tulis sendiri, dikirim dari iPhone saya ke bagian belakang sebuah casing ponsel yang sama sekali tidak punya baterai. Beberapa detik kemudian, seluruh panel berubah menjadi merah polos dengan tekstur yang sedikit mirip kertas. Tidak ada yang lain. Cuma merah.

Sudah bertahun-tahun saya membangun banyak sekali fitur NFC, dan persegi panjang merah polos itu termasuk salah satu momen yang paling saya sukai dari semuanya.

---

## Layar yang tidak butuh baterai

<figure class="phone-figure" data-layout="float" data-device="einkcase">
<ol>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-1-photo-480w.webp" alt="Bagian belakang iPhone dalam casing e-ink NFC berwarna oranye, panelnya menampilkan foto golden retriever dalam empat tinta"><p><strong>Sebuah foto.</strong> Dalam hitam, putih, merah, dan kuning, tanpa baterai di casing.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-2-qr-480w.webp" alt="Panel e-ink casing menampilkan kode QR untuk nfc.cool"><p><strong>Kode QR.</strong> Siapa pun bisa memindainya dari belakang ponsel Anda.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-3-event-480w.webp" alt="Panel e-ink casing berwarna kuning: Next, Dinner with Mia, Rabu, 14 Oktober, 19.30 hingga 21.30, Trattoria Roma"><p><strong>Acara berikutnya.</strong> Cuplikan dari kalender Anda.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-4-today-480w.webp" alt="Panel e-ink casing menampilkan Rabu, 14 Oktober: Gym, Team stand-up, Lunch with Alex, Dentist, Dinner with Mia"><p><strong>Agenda hari ini.</strong> Seluruh hari, sampai Anda memasang tampilan berikutnya.</p></li>
</ol>
</figure>

Kalau Anda belum pernah melihat casing seperti ini: bentuknya mirip casing ponsel biasa, hanya saja sebagian besar bagian belakangnya berupa layar e-ink, jenis layar yang sama dengan yang dipakai e-reader. Layar di casing saya punya empat warna tinta: hitam, putih, merah, dan kuning.

Di dalamnya tidak ada baterai, juga tidak ada port pengisian daya. Casing ini mendapat daya dari medan NFC ponsel Anda, medan yang sama yang membangunkan stiker NFC saat Anda memindainya. Karena ponsel Anda terpasang tepat di dalamnya, casing ini selalu berada dalam jangkauan medan itu. Saat sebuah aplikasi memintanya, medan itu menghidupkan sebuah chip kecil dan sebuah mikrokontroler, yang lalu menggambar ulang layarnya. Begitu gambar sudah tampil, e-ink sama sekali tidak butuh daya untuk mempertahankannya. Gambarnya tetap di sana, meski ponselnya kehabisan baterai atau casingnya tersimpan di laci.

Saya membayangkannya seperti papan gambar ajaib mainan anak-anak, bedanya yang bisa menghapus dan menggambar ulang hanyalah ponsel Anda. Tidak ada yang berubah sampai ponsel Anda menyuruhnya.

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

## Casing yang lebih besar, kembali ke titik nol

Teman saya, Alex, punya casing sejenis yang berbeda. Casing itu dibuat untuk iPhone 17 Pro Max, datang dengan aplikasi bernama **AI Cast Assistant**, dan layarnya punya piksel lebih dari empat kali lipat layar saya.

Saat dia mencoba NFC.cool dengan casing itu, aplikasinya langsung menampilkan error. Jangankan menggambar, mencoba pun tidak.

Saya juga tidak bisa begitu saja meminjam casing itu lalu mengerjakannya di rumah. Dengan 15 Pro Max saya di dalam casing yang dibuat untuk 17 Pro Max, hal-hal aneh mulai terjadi. Sepertinya antena casing itu disetel khusus untuk ponsel pasangannya. Jadi semua yang terjadi setelah ini dikerjakan dengan casing Alex di ponsel Alex.

Kali ini aplikasi Android-nya tidak banyak membantu. Kode yang kami ambil dari sana berkomunikasi dengan casing ini dengan cara yang tidak diizinkan untuk iPhone, jadi menyalinnya tidak membawa kami ke mana-mana.

Jadi kami membuat sniffer: aplikasi Android kecil yang berpura-pura menjadi casing. Tempelkan iPhone ke ponsel Android, buka AI Cast Assistant, dan iPhone dengan santainya mengirim gambar ke sesuatu yang dikiranya casing ponsel, sementara aplikasi Android mencatat setiap byte-nya.

Log itu menyimpan dua kejutan:

1. Aplikasi resminya mengompresi gambar sebelum mengirimnya. Kami sebelumnya mencoba tanpa kompresi, dan casing menjawab OK untuk setiap paket, lalu tidak menggambar apa-apa.
2. Saat ponsel bertanya kepada casing apakah prosesnya sudah selesai, casing itu sama sekali tidak menjawab sampai gambarnya rampung, sekitar 21 detik kemudian. Karena jawabannya ditahan, koneksinya tetap hidup, sehingga casing ini tidak pernah mentok di batas 20 detik itu.

Begitu NFC.cool melakukan keduanya, gambar pertama yang kami kirim adalah foto anjing Alex.

---

## Apa saja yang bisa ditampilkan NFC.cool di casing Anda

Fiturnya ada di **NFC.cool Tools**, di bagian Aplikasi NFC, dengan nama **Casing e-ink**. Pilih desain, lihat pratinjau yang menunjukkan persis bagaimana casing akan menampilkannya, lalu ketuk **Pasang ke casing**. iPhone Anda memang sudah terpasang di dalam casing, jadi Anda tidak perlu mencari posisi yang pas: jendela pemindaian NFC terbuka, casing menggambar ulang layarnya, dan jendela itu menutup sendiri begitu selesai.

- **Foto**: gambar apa saja dari galeri Anda, dipotong pas dengan ukuran layar. Yang ini gratis. Foto Anda diubah ke empat warna tinta, dengan penguatan warna (Standar, Cerah, atau Maks) dan opsi hitam putih.
- **Potongan**: memisahkan orang, hewan peliharaan, atau benda dari sebuah foto, lalu menaruhnya di atas latar dengan salah satu dari empat warna tinta.
- **Editor**: mulai dari kanvas kosong atau sebuah foto, lalu tambahkan teks, emoji, dan foto lain, atau gambar langsung dengan pena, spidol, dan ember cat. Draf Anda tetap tersimpan, jadi Anda bisa kembali dan mengubahnya nanti.
- **AI Playground**: pilih foto dan biarkan Apple Intelligence mengubah gayanya, lalu tampilkan hasilnya di casing. Desain ini hanya muncul di iPhone yang mendukung Apple Intelligence.
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

## Trik keren, dengan satu catatan

Ada satu hal yang perlu Anda ketahui sebelum membeli casing seperti ini. Bagi iPhone Anda, casing ini tidak hanya terlihat seperti layar. Casing ini juga terlihat seperti tag NFC, dan Anda bisa menulis ke sana seperti ke tag biasa.

Kedengarannya praktis, sampai Anda mencobanya. Misalnya Anda menulis sebuah tautan ke casing. Casing itu menempel tepat di atas antena NFC ponsel, jadi pembacaan tag di latar belakang pada iPhone menemukan tautan itu lagi dan lagi, dan terus memunculkan notifikasinya. Rasanya seperti ada kertas catatan yang ditempel di jidat Anda, lalu ponsel Anda terus membacakannya keras-keras.

Hal sebaliknya juga terjadi. Chip casing berada di atas antena NFC ponsel, jadi saat Anda menempelkan tag lain ke bagian belakang ponsel, iPhone tidak mengenalinya. Yang terbaca hanya casing itu.

Saya sendiri sudah lebih sering tidak sengaja menulis sesuatu ke casing saya daripada yang ingin saya akui. Untungnya, cara memperbaikinya mudah: NFC.cool bisa memformat ulang casing itu, dan setelah itu casing tidak akan mengganggu lagi.

Semua ini bukan alasan untuk melewatkan casing seperti ini. Memang agak nyeleneh, tapi justru di situ kerennya. Hanya saja, perlu Anda ketahui bahwa layar NFC di belakang ponsel dan semua hal lain yang Anda lakukan dengan NFC sedikit saling mengganggu.

---

## Yang perlu diketahui

**Untuk sementara, hanya di iPhone.** Fitur ini ada di aplikasi iPhone. Aplikasi Android belum memilikinya.

**Casing mana yang bisa dipakai.** Sebagian besar casing ini berasal dari satu pengembang yang menerbitkan aplikasi terpisah untuk hampir setiap merek. Semua aplikasi yang bisa saya temukan sudah saya coba dengan casing saya:

- **DeerPhoneCase**, **KAZAVA**, **Novixand**, dan **TYOHINN** berfungsi dengan casing saya, dan NFC.cool juga. Kalau casing Anda datang dengan salah satu aplikasi ini, NFC.cool seharusnya bisa dipakai dengannya.
- **Bestie e-INK** dan **KINGZER** tidak berfungsi dengan casing saya. Gambarnya terkirim lewat NFC tanpa masalah, tetapi saat casing seharusnya menggambar ulang, tidak terjadi apa-apa.
- **SpaceInk+**, dari pengembang lain, sama sekali tidak berfungsi dengan casing saya. Aplikasinya hanya menampilkan "device channel information mismatch".
- **AI Cast Assistant** adalah aplikasi bawaan casing lain yang lebih besar, dan NFC.cool sudah berfungsi dengannya sejak versi 7.3.0. Sejauh ini saya baru bisa mencoba casing milik Alex, yang untuk iPhone 17 Pro Max.

Itu tidak berarti NFC.cool tidak bisa dipakai dengan casing untuk Bestie e-INK, KINGZER, atau SpaceInk+. Bisa jadi casing itu hanya sedikit berbeda dari punya saya, dan saya tidak bisa mengujinya. Kalau Anda punya salah satunya, [beri tahu saya](/contact/) apakah NFC.cool bisa dipakai dengannya atau tidak. Kalau casing Anda memakai aplikasi lain, NFC.cool akan memberi tahu bahwa casing itu belum didukung dan menawarkan tombol **Kirim detail casing**. Tombol itu mengirim detail teknis chip-nya saja, tanpa apa pun yang bisa mengidentifikasi Anda atau casing Anda, supaya saya bisa melihat casing mana yang benar-benar dimiliki orang dan menambahkan dukungannya.

**Di mana membelinya.** Di Amazon, casing ini dijual dengan banyak nama merek, beberapa di antaranya cukup membingungkan, tetapi ujung-ujungnya casing yang sama. [Ini hasil pencariannya di Amazon](https://link.amazon/B0hUxLZTR) (tautan afiliasi). Casing saya bertuliskan DIY di bagian dalam, dan beberapa produk mencantumkan DIY di judulnya, jadi itu kata yang bagus untuk dicari. Kalau halaman produk menyebutkan aplikasi yang dipakai casing itu, carilah DeerPhoneCase, KAZAVA, Novixand, TYOHINN, atau AI Cast Assistant. Dan belilah casing yang dibuat khusus untuk model iPhone Anda: antenanya disetel untuk ponsel itu, dan 15 Pro Max saya sama sekali tidak cocok dengan casing 17 Pro Max milik Alex.

---

## Intinya

Kalau Anda punya casing seperti ini yang tergeletak begitu saja dan masih menampilkan gambar yang sama sejak hari pertama, saatnya memberinya tampilan yang lebih berguna. NFC.cool Tools tersedia di [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-e-ink-phone-case-iphone-id&mt=8).

Dan kalau Anda belum pernah melihat layar e-ink berkedip lalu memunculkan gambar yang Anda kirim sendiri, saya sangat menyarankannya. Beberapa detik itu terasa sangat memuaskan. Sejauh ini, setiap kali saya memperlihatkan casing ini ke orang lain, reaksinya selalu kaget sekaligus senang.
