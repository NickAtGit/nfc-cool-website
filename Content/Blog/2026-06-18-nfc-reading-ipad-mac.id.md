---
id: "nfc-reading-ipad-mac-2026-06"
title: "Bagaimana NFC.cool membaca tag NFC di iPad dan Mac"
date: "2026-06-18"
tags: ["announcements", "nfc-tags"]
summary: "iPad dan Mac tidak memiliki chip NFC, jadi saya selalu bilang keduanya tidak bisa membaca tag NFC. Dengan pembaca USB eksternal, versi 6.15.0 mengubah itu - berikut cara kerjanya, dan dari mana asalnya."
image: "/assets/images/Blog/nfc-ipad-mac-external-reader.webp"
imageAlt: "Sebuah iPad di samping pembaca NFC USB HID OMNIKEY dengan sebuah tag yang diletakkan di atasnya"
author: "Nicolo Stanciu"
metaTitle: "Bagaimana NFC.cool membaca tag NFC di iPad dan Mac"
metaDescription: "iPad dan Mac tidak memiliki radio NFC, jadi keduanya tidak bisa membaca tag NFC. Di NFC.cool 6.15.0, pembaca USB eksternal mengubah itu di iPad dan Mac. Berikut cara kerjanya."
ogTitle: "Pembacaan tag NFC kini hadir di iPad dan Mac"
ogDescription: "Tidak ada chip NFC di iPad atau Mac Anda? Dengan pembaca USB eksternal, NFC.cool 6.15.0 membaca dan menulis tag di sana juga - lengkap dengan keterbatasannya yang jujur."
---
Tahun lalu saya berada di Bologna untuk [PragmaConf 2025](https://pragmaconference.com). Itu pertama kalinya saya menghadiri konferensi tersebut, dan ternyata juga yang terakhir - para penyelenggara tidak bisa terus mengadakannya, jadi edisi yang saya hadiri adalah yang terakhir. Saya masih sedikit sedih soal itu.

Saat di sana saya sempat mengobrol dengan [Alexander Manzer](https://www.linkedin.com/in/alexander-manzer), sesama pengembang iOS dan NFC. Di suatu titik percakapan beralih ke sebuah masalah yang sudah lama saya masukkan ke kategori "mustahil": membaca tag NFC di iPad. iPad tidak memiliki chip NFC, jadi saya selalu memberi tahu orang bahwa itu memang tidak bisa dilakukan. Alexander bilang itu bisa - dengan pembaca eksternal yang tepat - dan menawarkan untuk mengirimi saya sepotong kecil kode untuk memulai. Beberapa hari kemudian, ia melakukannya. Cuplikan kode itulah alasan NFC.cool kini bisa membaca tag NFC di iPad dan Mac.

---

## Saya bilang ini tidak akan berhasil

Pada bulan Mei lalu, [ketika NFC.cool hadir di Mac](/blog/nfc-cool-comes-to-mac/), saya menulis satu bagian utuh tentang apa yang tidak bisa dilakukan Mac dan menempatkan pemindaian NFC tepat di urutan teratas. Alasan saya sederhana: Mac tidak memiliki radio NFC, iPad tidak memiliki radio NFC, dan itu adalah batas perangkat keras yang tidak bisa diperbaiki oleh pembaruan perangkat lunak apa pun dari saya.

Bagian itu masih benar - untuk chip yang tertanam di dalam perangkat. Yang saya lewatkan adalah Anda tidak harus menggunakan chip bawaan. Anda bisa mencolokkan satu.

---

## Cara kerjanya tanpa chip NFC

Triknya adalah pembaca NFC USB eksternal. Anda menyambungkannya ke iPad atau Mac Anda, dan NFC.cool berkomunikasi langsung dengannya. Tidak ada driver yang perlu diinstal: ini bekerja melalui dukungan smart-card yang sudah disertakan Apple di iPadOS dan macOS, jadi begitu Anda mencolokkan pembaca ke port USB-C, aplikasi langsung mendeteksinya dan beralih dengan sendirinya.

Aplikasi lebih memprioritaskan pembaca eksternal kapan pun satu tersambung. Di iPad atau Mac, pembaca itu adalah satu-satunya perangkat keras NFC yang berperan, jadi tidak ada yang perlu diputuskan. Di iPhone, ini menjadi pilihan yang dibuat aplikasi untuk Anda: colokkan pembaca dan NFC.cool menggunakannya, biarkan tidak tercolok dan ponsel kembali ke NFC bawaannya sendiri. Anda tidak mengubah pengaturan, dan tidak memilih mode - aplikasi mencari tahu perangkat keras apa yang dimilikinya dan bertindak sesuai itu.

Pembaca yang saya jadikan dasar pengembangan ini, dan satu-satunya yang benar-benar saya uji, adalah HID OMNIKEY 5022 CL. Pembaca USB lain juga berfungsi, dan beberapa di antaranya ada di daftar di bawah, dilaporkan oleh pengguna yang mencobanya.

<figure class="phone-figure" data-layout="stage" data-device="ipad">
<figcaption>iPad dengan pembaca USB</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-1-place-tag-600w.webp" alt="NFC.cool di iPad dengan pembaca NFC USB eksternal yang tersambung: Place tag on reader"><p><strong>Sambungkan pembaca.</strong> NFC.cool mengenalinya sendiri dan menunggu tag.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-2-tag-read-600w.webp" alt="NFC.cool di iPad setelah membaca: tanda centang hijau dan Tag read"><p><strong>Letakkan tag di atasnya.</strong> Pembaca mengurus bagian radio, iPad mengurus sisanya.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-3-record-600w.webp" alt="Entri lengkap tag di iPad: kartu nama untuk Anna Miller, dengan vCard mentah di bawahnya"><p><strong>Semua yang Anda lihat di iPhone.</strong> Entri yang sama, alat yang sama.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-4-sonicare-600w.webp" alt="Sonicare Reset di iPad: kepala sikat yang terpakai 80%, dengan Reset Timer"><p><strong>Bahkan yang sulit.</strong> Membaca kepala Sonicare dan menulis balik ke penghitungnya yang dilindungi kata sandi juga bisa.</p></li>
</ol>
</figure>

---

## Pembaca yang berfungsi

Ini semua pembaca yang sejauh ini saya tahu berfungsi dengan NFC.cool:

- **HID OMNIKEY 5022 CL** - yang saya jadikan dasar pengembangan dan saya uji menyeluruh ([Amazon](https://amzn.to/3SNPi46))
- **HID OMNIKEY 5422** - dilaporkan berfungsi oleh seorang pengguna ([Amazon](https://amzn.to/4xZVEwe))
- **ACS ACR1552U-M1** - dilaporkan berfungsi oleh seorang pengguna ([Amazon](https://amzn.to/4xZVEwe))
- **ACS ACR1255U-J1** - dilaporkan berfungsi oleh seorang pengguna ([Amazon](https://amzn.to/4xZVEwe))

Terima kasih kepada semua yang sudah menulis kepada saya. Saya tidak bisa membeli setiap pembaca yang ada di pasaran, jadi setiap model setelah yang pertama ada di daftar ini karena seseorang membelinya, mencobanya, dan menyempatkan diri memberi tahu saya. Kalau Anda memakai pembaca yang belum ada di sini, [beri tahu saya](/contact/) apakah berhasil atau di bagian mana yang gagal, dan akan saya tambahkan ke tulisan ini.

Itu adalah tautan afiliasi Amazon: jika Anda membeli melalui salah satunya, saya mungkin mendapat komisi kecil tanpa biaya tambahan bagi Anda.

---

## Apa yang bisa Anda lakukan dengannya

<figure class="phone-figure" data-layout="float" data-device="mac">
<ol>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/mac-1-my-messages-1280w.webp" alt="MacBook dengan pembaca NFC USB eksternal di sampingnya, menampilkan My NFC Messages di NFC.cool"><p><strong>Di Mac juga.</strong> Sambungkan pembaca ke Mac Anda, dan setiap tag yang Anda baca masuk ke My NFC Messages.</p></li>
</ol>
</figure>

Hampir semua yang akan Anda lakukan di iPhone. Anda bisa membaca tag dan menampilkan seluruh isi memorinya, menulis pesan NDEF, dan menjalankan tugas batch yang membaca atau menulis setumpuk tag satu per satu. Memproteksi tag dengan kata sandi berfungsi. Begitu pula [OpenPrintTag](/blog/openprinttag-read-write-nfc-spools-phone/), format gulungan filamen printer 3D, dalam dua arah. Dan ya, [reset kepala sikat Philips Sonicare](/blog/reset-sonicare-brush-head-nfc/) juga berjalan.

Yang terakhir itu adalah bagian yang sulit. Mereset kepala Sonicare berarti membaca penghitung dari tag lalu menulis kembali ke halaman yang diproteksi kata sandi, dan tag hanya menerima tulisan itu jika masih menganggap Anda terotentikasi dari sesaat sebelumnya. Melalui pembaca eksternal, itu berarti menjaga satu sesi dengan pembaca tetap terbuka di kedua langkah, alih-alih membiarkannya tertutup di antaranya. Begitu itu berhasil dipertahankan, operasi yang bergantung padanya - penulisan terproteksi, reset sikat - mulai berperilaku seperti di ponsel.

---

## Keterbatasannya yang jujur

Beberapa hal masih belum ada, dan saya lebih suka memberi tahu Anda daripada membiarkan Anda menemukannya sendiri.

- OMNIKEY 5022 CL adalah satu-satunya pembaca yang saya uji sendiri. Yang lain di daftar di atas berasal dari laporan pengguna, dan apa pun di luar daftar itu adalah wilayah yang belum terverifikasi.
- Tag MIFARE Classic hanya bisa dibaca melalui pembaca. Anda bisa membacanya, tapi tidak menulisnya.

Tidak ada satu pun dari ini yang merusak cara kebanyakan orang akan menggunakannya, tapi semuanya nyata, dan ini adalah jenis hal yang ingin saya ketahui sebelum membeli sebuah pembaca.

---

## Terima kasih, Alexander

Saya ingin memperjelas dari mana ini berasal. Saya tidak duduk lalu menciptakannya sendiri - Alexander memberi saya benangnya dan saya yang menariknya. Ia tidak harus membagikan kode itu, dan saya bersyukur ia melakukannya. Sebagian alasan saya mengejarnya begitu gigih setelah itu jelas: saya ingin NFC.cool menjadi aplikasi iPad pertama yang benar-benar bisa membaca tag NFC. Terlepas dari apakah ternyata ini benar-benar yang pertama, mencapainya sepadan dengan kerja kerasnya.

Pembacaan tag NFC di iPad dan Mac hadir di NFC.cool 6.15.0. Jika Anda memiliki iPad atau Mac, pembaca yang didukung, dan sebuah tag yang sebelumnya tidak pernah bisa Anda pindai dari meja Anda, ini akan langsung berfungsi.

Butuh pembacanya? Berikut HID OMNIKEY 5022 CL di [Amazon](https://amzn.to/3SNPi46) - tautannya mengarahkan Anda ke toko Amazon di negara Anda. Itu adalah tautan afiliasi: jika Anda membeli melaluinya, saya mungkin mendapat komisi kecil tanpa biaya tambahan bagi Anda, dan itu membantu mendanai pengembangan NFC.cool.

[Unduh NFC.cool Tools untuk iPhone, iPad, dan Mac](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-reading-ipad-mac-id&mt=8)

Dan jika Anda hadir di PragmaConf terakhir itu di Bologna: terima kasih atas acara yang menyenangkan. Andai saja akan ada satu lagi.
