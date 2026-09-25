---
id: "nfc-alarm-2026-09"
title: "Jam alarm NFC untuk iPhone: pindai tag Anda untuk mematikan alarm"
date: "2026-09-24"
tags: ["announcements", "iphone", "nfc-tags"]
summary: "Kebiasaan begadang untuk coding membuat saya terus kalah melawan tombol tunda, jadi saya membangun Alarm NFC di NFC.cool Tools: alarm iPhone yang baru diam setelah Anda menyusuri rute tag NFC di sekeliling rumah. Begini cara kerjanya, dan cara saya mengakali tombol Hentikan yang dipasang Apple di setiap alarm."
image: "/assets/images/Blog/nfc-alarm-clock.webp"
imageAlt: "iPhone menampilkan lingkaran pemindaian alarm di angka 2 dari 3 di samping mesin kopi yang ditempeli stiker NFC, dengan jejak titik-titik tag NFC yang mengarah kembali melewati rak di lorong sampai ke kasur"
author: "Nicolo Stanciu"
metaTitle: "Alarm NFC untuk iPhone: pindai tag untuk mematikan alarm"
metaDescription: "Alarm iPhone yang baru berhenti setelah Anda memindai tag NFC secara berurutan. Cara saya membangun Alarm NFC dengan AlarmKit dan mengakali tombol Hentikan."
ogTitle: "Alarm yang tidak bisa Anda tunda"
ogDescription: "Alarm NFC baru diam setelah Anda menyusuri rute tag NFC di sekeliling rumah. Begini cara kerjanya di iPhone."
---
Jadi developer indie punya ritme sendiri yang tidak peduli jam kantor. Kode terbaik saya justru lahir larut malam, saat notifikasi sudah berhenti dan rumah sudah sepi, dan tahu-tahu sudah jam dua pagi. Alarmnya, tentu saja, tetap berbunyi di jam yang sama. Lalu saya tekan Tunda. Sekali lagi. Lalu yang ketiga kalinya, sampai pagi yang sudah saya rencanakan tinggal separuh.

Cukup lama saya memikirkan apa yang sebenarnya bisa saya lakukan. Alarm yang lebih keras? Lama-lama saya pasti kebal juga. Menaruh ponsel di seberang kamar? Saya akan jalan ke sana, tekan Hentikan, lalu merangkak kembali ke kasur. Masalahnya bukan karena saya tidak mendengar alarm. Masalahnya, mematikan alarm cuma butuh satu ketukan tanpa perlu berpikir sedikit pun.

Lalu muncul ide ini: setiap hari saya membangun aplikasi untuk tag NFC. Kenapa tidak digabungkan saja? Saya pasang serangkaian tag di sepanjang rumah, dan setiap pagi alarm baru mau diam setelah saya menyusuri semuanya.

Itulah **Alarm NFC**, dan sekarang fitur ini sudah ada di NFC.cool Tools untuk iPhone. Versi Android-nya segera menyusul.

---

## Rute dari kasur ke mesin kopi

Rute saya punya tiga pemberhentian. Tag pertama ada di samping kasur. Tag kedua di rak di lorong. Tag ketiga menempel di mesin kopi.

Begitu alarm berbunyi, saya harus memindai ketiganya, dan harus berurutan. Tag di samping kasur gampang, tinggal ulurkan tangan. Tapi setelah itu saya harus bangun dan berjalan ke lorong, dan begitu sampai di mesin kopi, saya sudah berdiri tegak di tempat pagi saya biasa dimulai. Kalau sudah begitu, balik ke kasur malah terasa konyol. Sekalian saja tekan tombol kopinya.

Urutannya penting. Kalau tag bisa dipindai dalam urutan bebas, Anda cukup menaruh ketiganya di meja samping kasur dan selesai tanpa beranjak sedikit pun. Karena itu aplikasi menunggu tag berikutnya di rute, dan kalau Anda menempelkan tag yang salah, aplikasi langsung menegur: "Itu bukan Lorong". Setelah tag terakhir dipindai, muncul sedikit confetti, ucapan "Selamat pagi", dan alarm mati untuk hari itu. Besok pagi alarm berbunyi lagi seperti biasa.

Dan ya, cara ini berhasil. Rute tag itu benar-benar membuat saya bangun, sesuatu yang tidak pernah berhasil dilakukan alarm mana pun yang pernah saya pakai.

---

## Tombol Hentikan yang tidak bisa saya singkirkan

Bagian inilah yang paling lama saya pikirkan. Alarm NFC dibangun di atas **AlarmKit**, framework Apple yang memungkinkan aplikasi membunyikan alarm sungguhan, yang tetap berbunyi dalam mode senyap dan memenuhi Layar Terkunci seperti alarm dari aplikasi Jam. Persis yang dibutuhkan aplikasi alarm, dengan satu kendala: setiap alarm AlarmKit datang dengan tombol **Hentikan** yang digambar oleh sistem. Aplikasi tidak bisa menghapusnya, menyembunyikannya, atau mengubah tampilannya.

Jadi di atas kertas, alarm yang memaksa Anda berjalan ke tag-tag Anda justru dilengkapi tombol yang bisa mematikannya dalam satu ketukan. Kurang ideal.

Akal saya begini: satu Alarm NFC sebenarnya bukan satu alarm, melainkan satu rantai alarm. Di belakang jam yang Anda atur, aplikasi menjadwalkan alarm susulan dengan jeda beberapa menit. Bawaannya ada 20 susulan dengan jeda satu menit, dan Anda bisa memilih 5, 10, 15, atau 20 susulan dengan jeda 1, 2, 3, atau 5 menit. Menekan Hentikan di Layar Terkunci hanya mendiamkan alarm yang sedang berbunyi saat itu. Semenit kemudian, alarm berikutnya menyala. Sisa rantai pagi itu baru batal setelah Anda memindai seluruh rute, sementara alarmnya sendiri tetap aktif untuk keesokan harinya.

Anggap saja tombol Hentikan itu tombol senyap yang baterainya cuma tahan sebentar.

AlarmKit memberi aplikasi tepat satu tombol miliknya sendiri di samping Hentikan. Kebanyakan aplikasi alarm akan memakainya untuk tombol tunda. Saya memakainya untuk **Pindai untuk menghentikan**, yang langsung membuka aplikasi di layar pemindaian. Jadi di Layar Terkunci sama sekali tidak ada tombol tunda, dan itu memang disengaja.

Ada dua detail kecil yang muncul setelah saya menjadikan diri sendiri kelinci percobaan:

- Selama Anda sedang memindai, bunyi alarm berhenti sejenak. Tidak ada yang mau alarm meraung-raung di genggaman saat sedang menempelkan ponsel ke tag. Tapi kalau Anda menyerah di tengah jalan, alarm susulan berikutnya tetap akan berbunyi.
- Selama alarm berbunyi, aplikasi tidak mengizinkan Anda menonaktifkan, menghapus, atau mengedit alarm itu dari daftar alarm. Celah-celah itu saya temukan dengan cara paling jujur: dalam keadaan setengah sadar tapi mendadak sangat kreatif pada jam 7 pagi.

---

## Pintu darurat

Tag bisa hilang. Stiker copot dari mesin kopi, tag rusak, atau Anda sedang menginap di tempat lain. Alarm yang sama sekali tidak bisa dimatikan tentu ide yang buruk, jadi di layar pemindaian ada tombol **Penghentian darurat**, dan tombol ini selalu berfungsi, ada tag atau tidak.

Tapi Anda harus mengetik kalimat ini, persis kata demi kata:

"Tolong berhenti, saya sadar bahwa saya perlu mengatur ulang semua tag saya."

Itu memang sengaja. Saya ingin jalan keluarnya makan waktu kurang lebih sama dengan menyusuri rute, supaya tidak pernah jadi pilihan bagi yang malas. Dan ada harga yang harus dibayar: penghentian darurat menghentikan sekaligus menghapus *semua* alarm, jadi setelah itu Anda harus mengatur ulang semua tag dari awal. Fitur ini ada untuk saat sesuatu benar-benar rusak, bukan untuk Senin pagi ketika kasur terasa lebih empuk dari biasanya. Saya membuatnya untuk menghukum diri sendiri, dan hukumannya memang terasa.

---

## Kenapa NFC, bukan foto wastafel

Ada aplikasi alarm yang menyuruh Anda memotret wastafel kamar mandi atau memindai barcode di tube pasta gigi. Cara itu juga berhasil. Tapi untuk urusan ini saya lebih suka NFC, dan bukan cuma karena NFC ada di nama aplikasi saya.

Tag NFC sendiri tidak lebih dari sepotong logam polos: chip mungil dengan sebuah ID, tidak ada yang lain, diam di atas rak. Bagian yang paling saya nikmati dari membangun NFC.cool justru memberi arti pada logam polos itu, mengubah stiker seharga beberapa sen menjadi sesuatu yang benar-benar berguna dalam keseharian Anda. Di Alarm NFC, tagnya bahkan tidak perlu berisi apa pun. Aplikasi mengenali setiap tag dari ID chip-nya, dan tidak ada yang ditulis ke tag. Tag apa pun bisa dipakai, termasuk sisa stiker yang tersimpan di laci Anda. Tag juga tidak butuh cahaya: memindai tag tetap lancar di lorong yang gelap, tempat kamera pasti kesulitan, dan Anda tidak perlu membidik apa pun.

Kalau Anda belum punya tag, [panduan pemula saya tentang tag NFC](/blog/nfc-tags-beginners-guide/) menjelaskan tag mana yang sebaiknya dibeli.

---

## Cara menyiapkannya

Alarm NFC membutuhkan iPhone dengan iOS 26 atau yang lebih baru, karena di situlah AlarmKit tersedia. Anda bisa menemukannya di tab NFC, di bagian **Aplikasi NFC**. Buat alarm, pilih jam dan harinya, lalu pindai tag-tag Anda sesuai urutan rute yang ingin Anda jalani. Setiap tag bisa diberi nama supaya Anda tahu mana yang berikutnya. Susun rutenya supaya Anda benar-benar terpaksa turun dari kasur. Samping kasur adalah awal yang bagus, dapur adalah akhir yang lebih bagus lagi.

Alarm NFC gratis, dan tersedia di [NFC.cool Tools di App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-alarm-clock-id&mt=8). Mesin kopi Anda sudah menunggu.
