---
id: nfc-blog-011
title: "OpenPrintTag: cara membaca & menulis gulungan filamen 3D pintar dengan ponsel Anda"
date: 2026-03-29
tags: ["nfc-tags", "automation"]
summary: "OpenPrintTag adalah standar terbuka untuk gulungan filamen pintar. Pelajari cara kerjanya, data apa yang disimpan, dan cara membaca serta menulis tag NFC OpenPrintTag hanya menggunakan ponsel Anda."
image: "/assets/images/Blog/openprinttag-read-write-nfc-spools-phone.webp"
imageAlt: "Gulungan filamen cetak 3D dengan tag NFC yang sedang dibaca oleh ponsel"
metaTitle: "OpenPrintTag: membaca & menulis gulungan cetak 3D pintar dengan ponsel Anda"
metaDescription: "Pelajari cara menggunakan OpenPrintTag untuk mengelola gulungan filamen cetak 3D Anda dengan NFC. Baca, tulis, dan lacak data material dari iPhone atau Android, tanpa aplikasi proprietary."
ogTitle: "OpenPrintTag: gulungan cetak 3D pintar dengan NFC"
ogDescription: "Panduan lengkap membaca dan menulis gulungan NFC OpenPrintTag dengan ponsel Anda. Berfungsi dengan printer apa pun, merek filamen apa pun."
---
Jika Anda mencetak 3D, Anda mungkin pernah mengalami ini: rak penuh gulungan filamen yang setengah terpakai, tidak tahu berapa banyak filamen yang tersisa di setiap gulungan, dan satu gulungan tak berlabel yang mungkin PETG atau mungkin PLA, tanpa cara untuk mengetahuinya tanpa melakukan cetak uji. Saya pernah mengalami itu juga, dan ini adalah jenis gangguan kecil yang berulang yang sebenarnya sangat cocok diselesaikan dengan NFC.

Itulah yang dilakukan OpenPrintTag. Ini adalah standar NFC sumber terbuka yang dibuat oleh [Prusa Research](https://www.prusa3d.com) yang mengubah tag NFC yang kompatibel menjadi label pintar untuk gulungan filamen Anda. Jenis material, merek, warna, berat yang tersisa: semua disimpan langsung di gulungan dan dapat dibaca dengan ketukan cepat ponsel Anda.

Tanpa cloud. Tanpa ekosistem proprietary. Tanpa koneksi internet. Saya telah bertahun-tahun membangun NFC.cool, sebuah aplikasi untuk membaca dan menulis tag NFC, dan inilah persis jenis standar yang saya suka - yang menyimpan data pada tag dan membiarkannya berfungsi di mana saja. Inilah cara kerjanya, dan bagaimana saya membaca dan menulis gulungan OpenPrintTag hanya dengan ponsel.

---

## Apa itu OpenPrintTag?

OpenPrintTag adalah format data universal dan terbuka untuk material cetak 3D. Alih-alih setiap produsen menemukan sistem gulungan pintar proprietary yang tidak kompatibel - yang persis adalah kekacauan yang saya saksikan terjadi di sudut lain dunia NFC - OpenPrintTag mendefinisikan satu standar tunggal yang dapat diadopsi siapa pun, termasuk pembuat filamen, produsen printer, perangkat lunak slicer, dan aplikasi seperti NFC.cool.

Prinsip-prinsip utamanya, dan alasan saya pikir ini layak diperhatikan:

- **Sumber terbuka:** diterbitkan di bawah lisensi MIT, bebas diimplementasikan, tanpa biaya lisensi
- **Offline by design:** semua data ada pada tag itu sendiri, tidak memerlukan layanan cloud
- **Dapat ditulis ulang:** perbarui filamen yang tersisa saat Anda mencetak, gunakan kembali tag pada gulungan baru
- **Universal:** berfungsi di berbagai merek dan ekosistem
- **Mendukung FFF (filamen) dan SLA (resin)**

Lebih dari 22 perusahaan dan kelompok telah menyatakan minat, termasuk Prusament, Voron, Fillamentum, 3DXTech, SimplyPrint, dan PrintedSolid. Spesifikasi lengkapnya tersedia di [specs.openprinttag.org](https://specs.openprinttag.org).

---

## Data apa yang disimpan OpenPrintTag?

Inilah bagian yang meyakinkan saya. OpenPrintTag bukan sekadar label dengan nama di atasnya. Ini adalah format data yang terstruktur dengan baik dengan kolom untuk hampir semua hal yang ingin Anda ketahui tentang sebuah gulungan, dan spesifikasinya jelas ditulis oleh orang-orang yang benar-benar mencetak.

**Identifikasi material:**
- Kelas material (filamen atau resin)
- Jenis material (PLA, PETG, ABS, TPU, ASA, PC, PA6, dan 30+ lainnya)
- Nama material (contoh: "PLA Galaxy Black")
- Nama merek (contoh: "Prusament")
- Tag properti material: lebih dari 68 properti yang terdefinisi seperti abrasif, konduktif, berpendar dalam gelap, aman untuk makanan, aman ESD, fleksibel, dan lainnya

**Pelacakan berat dan panjang:**
- Berat nominal (yang diiklankan, contoh: 1000g)
- Berat aktual (diukur untuk gulungan spesifik ini)
- Panjang filamen (nominal dan aktual, dalam mm)
- Berat wadah kosong (sehingga Anda dapat menimbang gulungan dan menghitung material yang tersisa)
- Berat yang telah digunakan (diperbarui saat Anda mencetak; ini adalah kolom yang membuat gulungan benar-benar "pintar")

**Warna:**
- Warna primer dalam format RGBA
- Hingga 5 warna sekunder (untuk filamen multicolor, galaxy, atau gradien)
- Jarak transmisi (nilai opasitas, berguna untuk proyek [HueForge](https://shop.thehueforge.com/))

**Metadata:**
- Tanggal pembuatan dan tanggal kedaluwarsa
- Negara asal
- UUID untuk merek, material, dan instans gulungan tertentu
- Pengaturan proteksi tulis

Spesifikasi bahkan mencakup kolom khusus resin seperti `last_stir_time`, yang mencatat kapan terakhir kali resin diaduk sebelum mencetak. Itulah jenis detail yang memberi tahu saya bahwa orang-orang di baliknya benar-benar pernah terbakar karena resin yang tidak diaduk.

---

## Tag: bukan stiker NFC biasa

Inilah detail teknis yang ingin saya sampaikan sebelum Anda membeli apa pun: **OpenPrintTag dirancang untuk tag ISO 15693 (NFC-V)**, khususnya chip **NXP ICODE SLIX dan ICODE SLIX2**. Ini adalah tag NFC Forum Type 5 dengan jangkauan baca yang jauh lebih panjang daripada tag NFC-A standar, hingga 1,5 meter dengan pembaca khusus. Jika Anda hanya pernah membeli stiker NTAG murah yang digunakan oleh kebanyakan proyek, ini adalah keluarga tag yang berbeda - saya membahas seluruh lanskap tersebut di [tipe tag NFC untuk iPhone](/blog/nfc-tag-types-for-iphones/).

Mengapa NFC-V? Pembaca NFC bawaan printer perlu mendeteksi gulungan terlepas dari rotasinya. Jangkauan NFC-V yang lebih panjang memungkinkan hal ini tanpa memerlukan penyelarasan tag yang tepat, yang merupakan desain yang cerdas.

**Bagaimana dengan stiker NTAG biasa?** Format data OpenPrintTag berbasis NDEF, sehingga aplikasi ponsel seperti NFC.cool secara teknis dapat membaca dan menulis data OpenPrintTag pada tag NFC apa pun, termasuk NTAG213/215/216. Saya sudah mencobanya - berfungsi dengan baik untuk pembacaan ponsel ke ponsel. Namun, **perangkat keras printer dan aplikasi seperti milik Prusa hanya mengenali tag NFC-V**. Jadi jika Anda ingin gulungan yang diberi tag berfungsi dengan pembaca NFC bawaan printer, gunakan tag ICODE SLIX2. Jangan membuat kesalahan yang saya duga akan dilakukan kebanyakan orang, yaitu membeli sekantong NTAG213 untuk keperluan ini.

Jika Anda membeli tag kosong, cari khusus **ICODE SLIX2** atau **ISO 15693**. Anda dapat menemukan tag yang kompatibel di [Amazon US](https://amzn.to/3LTh1fT) atau [Amazon Europe](https://amzn.to/4oJpQr4) (tautan afiliasi).

---

## Cara membaca dan menulis OpenPrintTag dengan ponsel Anda

Anda tidak memerlukan printer Prusa atau perangkat keras khusus apa pun untuk bekerja dengan OpenPrintTag - cukup ponsel Anda. Inilah bagian yang paling ingin saya bangun, karena ponsel di saku Anda adalah pembaca NFC yang paling mudah diakses.

NFC.cool Tools mendukung OpenPrintTag secara native di [iOS](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-openprinttag-read-write-nfc-spools-phone-en&mt=8) dan [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-openprinttag-read-write-nfc-spools-phone-en), dan saya memastikan fitur ini sepenuhnya gratis.

**Membaca tag:**
1. Buka NFC.cool Tools
2. Dekatkan ponsel Anda ke tag NFC pada gulungan
3. NFC.cool mendeteksi format OpenPrintTag secara otomatis
4. Lihat data terstruktur: material, merek, warna, berat, panjang, properti

**Menulis tag:**
1. Tempelkan tag ICODE SLIX2 kosong pada gulungan Anda
2. Buka NFC.cool - bagian NFC Apps - OpenPrintTag
3. Isi detail material: jenis, merek, warna, berat, panjang
4. Ketuk untuk menulis

**Memperbarui material yang tersisa:**
Setelah mencetak, perbarui kolom berat yang telah digunakan pada tag. Lain kali Anda memindai, Anda akan tahu persis berapa banyak filamen yang tersisa - tanpa menebak, tanpa menimbang. Inilah bagian yang mengubah gulungan pintar dari sekadar kebaruan menjadi sesuatu yang benar-benar saya andalkan.

Jika Anda ingin melihat lebih dalam, Anda dapat menggunakan Expert Mode untuk memeriksa rekaman NDEF mentah - berguna saat Anda perlu men-debug tag atau memverifikasi struktur data. Baru pertama kali menulis tag? Saya membahas dasarnya di [cara menulis tag NFC di iPhone](/blog/write-nfc-tags-iphone/).

---

## Mengapa menggunakan ponsel Anda?

Printer Prusa mendapatkan pembaca NFC bawaan, dan proyek seperti [SpoolSense](https://github.com/SpoolSense) (pembaca berbasis ESP32 sumber terbuka) menambahkan opsi perangkat keras khusus. Jadi mengapa repot-repot menggunakan ponsel? Inilah argumen yang ingin saya sampaikan:

- **Berfungsi dengan printer apa pun:** Voron, Bambu Lab, Creality, Ender, apa pun yang Anda gunakan
- **Tulis tag untuk filamen apa pun:** Prusament sudah diberi tag, tetapi Anda dapat memberi tag pada Fillamentum, eSUN, Hatchbox, atau merek apa pun sendiri
- **Kelola inventaris jauh dari printer:** pindai gulungan di meja Anda, di tempat penyimpanan, atau di makerspace
- **Debug tag:** ketika printer tidak bisa membaca tag, pindai dengan ponsel Anda untuk melihat apa yang sebenarnya ada di sana - inilah penggunaan yang paling sering saya lakukan
- **Tidak ada perangkat keras tambahan:** ponsel Anda sudah memiliki pembaca NFC, dan itulah inti persoalannya

---

## Kasus penggunaan praktis

**Inventaris pribadi:** Beri tag pada setiap gulungan dalam koleksi Anda. Saat merencanakan cetakan, pindai gulungan untuk memeriksa jenis material, panjang yang tersisa, dan warna tanpa membuka kotak apa pun.

**Pelacakan filamen yang tersisa:** Timbang gulungan Anda sebelum dan sesudah mencetak, perbarui berat yang telah digunakan pada tag. Tidak perlu lagi cemas "apakah gulungan ini cukup untuk cetakan 14 jam?"

**Penggunaan makerspace atau tim:** Beri tag pada gulungan dengan detail material sehingga siapa pun di bengkel dapat memindai dan mengidentifikasinya. Tidak ada lagi filamen misterius.

**Catatan pengujian filamen:** Menemukan suhu sempurna untuk gulungan tertentu? Perbarui tag dengan catatan Anda untuk lain kali.

**Material multicolor dan spesial:** OpenPrintTag mendukung hingga 6 warna per gulungan dan 68+ tag properti. PETG berisi serat karbon berpendar dalam gelap Anda akhirnya bisa diberi label dengan benar, lengkap dengan tanda abrasif.

---

## Ekosistem yang terus berkembang

OpenPrintTag masih muda, tetapi momentumnya nyata:

- **Prusament** dikirimkan dengan tag NFC OpenPrintTag di setiap gulungan
- **Printer Prusa** sedang menambahkan pembaca NFC bawaan
- **Pembaca perangkat keras sumber terbuka** seperti SpoolSense (berbasis ESP32) muncul dari komunitas
- **22+ perusahaan** telah bergabung dengan inisiatif ini
- **NFC.cool** adalah satu-satunya aplikasi NFC serba guna dengan dukungan OpenPrintTag penuh di iOS dan Android, dan saya menambahkannya karena saya ingin menggunakannya sendiri

Saya telah menyaksikan industri cetak 3D membutuhkan standar terbuka untuk gulungan pintar selama bertahun-tahun, dan saya telah menyaksikan beberapa upaya proprietary datang dan pergi. OpenPrintTag adalah yang paling kredibel yang pernah saya lihat: didukung oleh produsen besar, sepenuhnya sumber terbuka, dan sudah dikirimkan pada produk nyata. Kombinasi itu cukup langka sehingga saya akan bertaruh padanya.

---

## Memulai

**Yang Anda butuhkan:**
- iPhone 7 atau yang lebih baru, atau ponsel Android dengan NFC
- NFC.cool Tools ([App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-openprinttag-read-write-nfc-spools-phone-en&mt=8) / [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-openprinttag-read-write-nfc-spools-phone-en)), gratis, OpenPrintTag sudah termasuk
- Tag NFC ICODE SLIX2 / ISO 15693 kosong ([Amazon US](https://amzn.to/3LTh1fT) / [Amazon Europe](https://amzn.to/4oJpQr4), tautan afiliasi)
- Beberapa gulungan filamen untuk diberi tag

Itu saja. Lima menit dari sekarang, gulungan pertama Anda bisa menjadi pintar. Jika NFC masih baru bagi Anda, [panduan pemula tentang tag NFC](/blog/nfc-tags-beginners-guide/) adalah tempat yang akan saya sarankan pertama kali, dan [halaman fitur pembaca/penulis NFC](/features/nfc-reader-writer/) mencakup apa yang bisa dilakukan NFC.cool Tools di luar OpenPrintTag.

*OpenPrintTag adalah inisiatif sumber terbuka dari Prusa Research. NFC.cool adalah pendukung independen standar ini. Pelajari lebih lanjut di [openprinttag.org](https://openprinttag.org).*
