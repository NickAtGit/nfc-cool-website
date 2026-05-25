---
id: nfc-blog-028
title: "Saya tidak bisa mengingat siapa pun yang saya temui. Jadi saya membangun ini ke dalam aplikasi kartu nama."
date: 2025-01-23
tags: ["business-cards", "networking", "iphone"]
summary: "Setelah cukup banyak konferensi dan acara networking, saya menyadari kartu nama digital memecahkan masalah yang salah. Mereka menghemat kertas tapi bukan konteksnya. Jadi saya menambahkan lapisan Smart Context ke NFC.cool Business Card - di mana Anda bertemu, apa yang sedang mereka kerjakan, apa yang perlu ditindaklanjuti."
metaTitle: "Smart Context: Peningkatan memori untuk kartu nama digital"
metaDescription: "Kartu nama digital memecahkan masalah kertas. Mereka tidak memecahkan masalah lupa orang. Lapisan Smart Context NFC.cool Business Card menangkap di mana, kapan, dan mengapa - tersinkronisasi ke kalender Anda."
ogTitle: "Saya tidak bisa mengingat siapa pun yang saya temui. Jadi saya membangun ini ke dalam aplikasi kartu nama."
ogDescription: "Mengapa kartu nama digital membutuhkan lebih dari sekadar informasi kontak - dan lapisan Smart Context yang memperbaikinya."
image: "/assets/images/Blog/smart-context-remember-everyone.webp"
---
Setelah bertahun-tahun membangun perangkat lunak kartu nama digital, ada satu masalah yang terus mengganggu saya: kami telah memecahkan separuh yang salah.

Masalah kartu kertas itu nyata - kartu menjadi usang, memenuhi dompet, hilang, tidak bisa diperbarui. Kartu digital memperbaiki itu. Tapi mereka tidak memperbaiki masalah networking yang sebenarnya, yang jauh lebih sederhana:

> Saya bertemu 50 orang di konferensi, bertukar info dengan 20, dan tiga minggu kemudian saya tidak bisa mengingat satu percakapan pun.

Detail kontak di ponsel Anda tidak berguna jika Anda tidak bisa mengingat mengapa orang itu ada di buku alamat Anda.

---

## Konteks adalah bagian yang hilang

Jadi saya menambahkan apa yang saya sebut "peningkatan memori" ke NFC.cool Business Card. Tepat setelah terhubung - melalui ketukan NFC, App Clip, atau kode QR layar kunci Conference Mode - Anda diminta untuk menangkap konteks:

- **Di mana dan kapan Anda bertemu.** Diisi otomatis dengan tanggal dan tempat, bisa diedit.
- **Apa yang sedang mereka kerjakan.** Catatan singkat tentang proyek, perusahaan, atau area fokus mereka.
- **Sorotan percakapan.** Satu atau dua hal yang benar-benar Anda bicarakan dan ingin Anda ingat.
- **Rencana tindak lanjut.** "Mereka akan mengirim pengenalan ke VC mereka." "Harus mengirim deck pada hari Senin."

Bagian terakhir itu tersinkronisasi ke kalender dan pengingat Anda, karena kita semua buruk dalam menindaklanjuti dan kita semua butuh dorongan.

---

## Mengapa ini bagian dari pertukaran, bukan setelahnya

Triknya adalah prompt muncul segera setelah kontak disimpan - saat percakapan masih segar di benak Anda. Lima menit kemudian Anda sudah beralih ke orang berikutnya. Tiga hari kemudian Anda tidak ingat apakah pendiri AI itu yang dari kompetisi pitch Austin atau hackathon Berlin.

Menangkap konteks dalam alur yang sama dengan pertukaran kontak berarti data benar-benar tercatat. Alternatifnya - menambahkan konteks secara manual minggu depan dari memori - tidak pernah terjadi.

---

## Apa yang berubah bagi saya

Selama pengujian beta di beberapa acara, pengalaman berubah dari "saya punya kartu nama ini di ponsel saya sekarang" menjadi "saya punya grafik orang yang bisa dicari, apa yang mereka lakukan, dan apa yang saya utangkan kepada mereka".

Saya membuka tab Networking di NFC.cool Business Card dan melihat: siapa yang saya temui di mana, apa yang kami bicarakan, apa yang saya katakan akan saya tindaklanjuti, apa yang masih terbuka. Setelah bertemu seseorang lagi, saya memperbarui entri - percakapan baru, konteks baru. Kartu menjadi catatan hubungan yang hidup, bukan snapshot detail kontak.

---

## Bekerja di seluruh platform

Lapisan Smart Context bekerja terlepas dari bagaimana kontak masuk ke buku alamat Anda:

- **Ketukan NFC.** Alur standar - Anda mengetuk kartu mereka, menyimpan kontak, menangkap konteks.
- **App Clip.** Penerima iOS melihat overlay App Clip, menyimpan kontak, dan mendapatkan prompt konteks yang sama.
- **Conference Mode (kode QR layar kunci).** Tampilkan kode QR layar kunci Anda untuk pertukaran cepat di lingkungan yang ramai; prompt konteks yang sama aktif setelah mereka menyimpan.
- **Browser Android.** Penerima Android membuka versi halaman web, menyimpan kontak, dan dapat menangkap konteks di dalam aplikasi NFC.cool Business Card setelahnya.

Aplikasi menangani hingga 100 kartu berbeda (peran berbeda, acara berbeda, versi Anda yang berbeda) dan data Smart Context tetap terpisah per kartu - sehingga kontak yang Anda temui sebagai "konsultan desain di meetup Berlin" adalah catatan yang berbeda dari orang yang sama yang Anda temui sebagai "co-founder di YC demo day".

---

## Mengapa ini penting sekarang

Alasan ini tidak ada lima tahun yang lalu adalah bahwa hambatannya bukan teknologi - melainkan gesekan. Menangkap konteks memerlukan membuka aplikasi catatan terpisah, mengetik saat orang lain menyaksikan, dan kemudian entah bagaimana mengasosiasikan catatan tersebut dengan kontak nanti. Kebanyakan orang menyerah.

Dengan NFC.cool Business Card, penangkapannya hanya satu ketukan dalam alur pertukaran kontak. Ini adalah perbedaan antara "saya harus mengingat ini" dan "ini sekarang sudah diingat".

Dalam dunia di mana kita bertukar kontak lebih cepat dari sebelumnya, data yang penting bukan siapa yang Anda kenal - melainkan mengapa Anda mengenal mereka.

[Unduh NFC.cool Business Card untuk iPhone](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-smart-context-remember-everyone-en&mt=8). Pengguna Android mendapatkan fitur kartu nama dan Smart Context yang sama yang sudah tersedia dalam [NFC.cool Tools untuk Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-smart-context-remember-everyone-en).
