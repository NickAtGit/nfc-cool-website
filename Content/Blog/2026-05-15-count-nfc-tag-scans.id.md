---
id: "count-nfc-tag-scans-2026-05"
title: "Cara menghitung pemindaian tag NFC tanpa server"
date: "2026-05-15"
tags: ["nfc-tags", "guides"]
summary: "Pasang URL yang sama pada 50 stiker NFC dan Anda tidak bisa membedakan mana yang diketuk - kecuali jika tag menghitung dirinya sendiri. Begini caranya."
image: "/assets/images/Blog/count-nfc-tag-scans.webp"
imageAlt: "Tag NFC yang diketuk oleh ponsel, dengan angka jumlah pemindaian yang meningkat di sampingnya"
author: "Nicolo Stanciu"
metaTitle: "Cara menghitung pemindaian tag NFC tanpa server"
metaDescription: "Lacak berapa kali sebuah tag NFC diketuk - dan tag fisik mana itu - menggunakan counter bawaan chip. Tanpa backend, tanpa internet. Panduan praktis."
ogTitle: "Cara menghitung pemindaian tag NFC tanpa server"
ogDescription: "Tag NFC Anda bisa menghitung pemindaiannya sendiri. Begini cara menggunakannya untuk pelacakan keterlibatan, edisi terbatas, dan pemeriksaan anti-pemalsuan."
---

Bayangkan Anda mencetak URL yang sama ke lima puluh stiker NFC dan menempelkannya pada lima puluh produk, lima puluh poster, atau lima puluh kartu nama. Seminggu kemudian, seseorang mengajukan pertanyaan yang sudah jelas: mana yang sebenarnya diketuk? Dan berapa kali?

Saya sudah membangun NFC.cool selama bertahun-tahun, dan jawaban yang biasanya saya dengar adalah server. Anda membuat lima puluh tautan unik, mengarahkan semuanya ke backend, dan membiarkan perangkat lunak analitik menghitung kunjungan. Ini berhasil, tetapi sekarang Anda menjalankan infrastruktur, membayarnya, dan mempercayainya untuk tetap online selama stiker tersebut ada. Itu selalu tampak seperti banyak bagian yang bergerak untuk pertanyaan sesederhana ini.

Ada cara yang lebih sederhana, dan itu sudah ada di dalam chip NFC sepanjang waktu. Banyak tag dapat menghitung pemindaiannya sendiri. Dengan pengaturan yang tepat, sebuah tag akan memberi tahu Anda berapa kali ia telah dibaca dan tag fisik mana itu, tanpa backend sama sekali. Ini adalah salah satu trik NFC favorit saya untuk diperlihatkan kepada orang-orang, jadi inilah cara kerjanya dan cara mengatur semuanya.

---

## Apa sebenarnya NFC Tap Counter itu

Kebanyakan [stiker NFC yang bisa Anda beli](/affiliate-links/) menggunakan chip dari keluarga NTAG21x - `NTAG213`, `NTAG215`, dan `NTAG216`. Chip tersebut memiliki fitur kecil yang menurut saya sebagian besar orang tidak pernah tahu ada: counter bawaan. Setiap kali tag dibaca, counter bertambah satu. Ia ada di hardware chip, bukan di aplikasi, dan bukan di server. (Jika Anda ingin penjelasan mendalam tentang chip-chip ini, saya telah membahasnya di [jenis tag NFC untuk iPhone](/blog/nfc-tag-types-for-iphones/).)

Cara saya menggambarkannya adalah odometer untuk tag. Odometer mobil menghitung kilometer apakah ada yang mengawasinya atau tidak; counter NFC menghitung pembacaan dengan cara yang sama. Angkanya selalu ada. Satu-satunya pertanyaan adalah apakah ada yang dikonfigurasi untuk menampilkannya kepada Anda.

Itulah tepatnya yang dilakukan fitur NFC Tap Counter di NFC.cool Tools, dan itu adalah bagian yang paling saya banggakan. Ia mengonfigurasi tag sekali sehingga, mulai saat itu, tag melaporkan jumlahnya sendiri. Anda tidak perlu memindai tag sendiri untuk memeriksa angkanya, dan Anda tidak perlu aplikasi saat orang lain mengetuknya. Tag melakukan penghitungan dan pelaporan sendiri.

Chip yang sama juga membawa ID tag unik - nomor seri yang dibakar saat pabrik, mirip seperti alamat MAC pada kartu jaringan. Fitur Tap Counter juga bisa memunculkan itu, yang memungkinkan Anda membedakan lima puluh stiker yang tampak identik.

---

## Cara kerjanya, tanpa jargon

Ketika Anda menulis konten ke tag dengan Tap Counter diaktifkan, aplikasi melakukan sesuatu yang menurut saya benar-benar cerdik. Ia menyematkan deretan karakter placeholder ke dalam apa pun yang Anda tulis - pengganti untuk jumlah dan ID. Bagian itu masih terasa sedikit seperti trik sulap bagi saya, bahkan setelah membangunnya.

Dari sana, chip menangani sisanya. Seperti yang tertera di layar bantuan di dalam aplikasi: "Aplikasi menyematkan byte placeholder ke dalam konten Anda. Pada setiap pemindaian, chip menggantinya dengan jumlah ketukan terkini (dan/atau ID tag) sebelum iPhone membacanya. Tidak diperlukan server atau internet."

Jadi urutannya pada setiap ketukan terlihat seperti ini. Seseorang mendekatkan ponsel mereka ke tag. Chip aktif, menambah counternya, menukar placeholder dengan angka nyata, dan hanya kemudian menyerahkan konten yang sudah jadi ke ponsel. Ponsel yang memindai tag tidak pernah melihat placeholder - ia melihat URL lengkap dengan jumlah terkini yang sudah tertanam.

Yang ingin saya sampaikan adalah bahwa Anda hanya melakukan pengaturan sekali. Setelah tulisan pertama itu, tag bekerja sendiri: ia akan menghitung dan mensubstitusi untuk setiap ketukan, oleh setiap orang, di setiap ponsel, selama stiker tersebut ada. Tidak ada yang dalam rantai itu menyentuh internet. Penghitungan terjadi di chip. Substitusi terjadi di chip. Jika Anda mengarahkan URL yang sudah jadi ke situs web yang Anda kendalikan, server Anda sendiri melihat jumlah tiba - tetapi itu adalah pilihan Anda, bukan persyaratan fitur.

---

## Apa yang sebenarnya bisa Anda lakukan dengannya

Tag yang bisa menghitung diri sendiri terdengar seperti trik yang menarik sampai Anda mencocokkannya dengan masalah nyata. Ini adalah empat kegunaan yang terus saya kembalikan ketika orang bertanya untuk apa ini.

**Tentukan stiker fisik mana yang dipindai.** Ini adalah masalah lima puluh stiker dari awal tulisan ini. Pasang URL yang sama di setiap tag, aktifkan ID tag, dan setiap ketukan tiba dicap dengan nomor seri dari tag yang tepat yang berasal darinya. Satu URL untuk dikelola, lima puluh tag yang masih bisa Anda bedakan.

**Batasi akses gratis.** Karena jumlah berjalan bersama setiap ketukan, Anda dapat menggunakannya. Jalankan promosi di mana seratus pemindaian pertama mendapatkan versi demo dan pemindaian berikutnya dialihkan ke tempat lain. Cetakan edisi terbatas dapat memberikan hadiah penuh sampai counter melewati ambang yang Anda tentukan. Tag menegakkan "siapa cepat dia beruntung" tanpa sistem pendaftaran di baliknya.

**Lacak keterlibatan.** Tempelkan tag pada kartu nama, poster, kotak produk, atau etalase toko, dan counter menjadi metrik keterlibatan yang diam. Anda bisa melihat apakah sebuah kartu telah diketuk dua kali atau dua ratus kali tanpa membangun pipeline analitik untuk itu.

**Buktikan keaslian.** Counter hanya bisa naik - tidak bisa diputar kembali. Angka yang hanya bisa meningkat sulit dipalsukan secara meyakinkan, itulah mengapa menurut saya ia mendapat tempat pada barang edisi terbatas dan pemeriksaan anti-pemalsuan. Tag asli memiliki riwayat yang masuk akal dan terus meningkat; klonan tidak. Jika sisi NFC itu menarik bagi Anda, saya membahasnya lebih jauh di [cara NFC menjaga rahasia terenkripsi tetap aman](/blog/nfc-safe-encrypted-secrets/).

Gabungkan beberapa dari itu dan Anda mendapatkan sesuatu seperti ini: seorang pengrajin menempatkan tag di setiap nomor seri produk, semuanya mengarah ke halaman landing yang sama. ID tag memberi tahu mereka barang mana yang dipegang pembeli, jumlahnya memberi tahu mereka seberapa sering pembeli tersebut kembali, dan karena jumlah hanya naik, penjual tidak bisa diam-diam meneruskan salinan sebagai yang asli. Tanpa akun, tanpa database, tanpa tagihan bulanan - hanya chip yang melakukan tugasnya. Itulah jenis hasil yang saya bangun fitur ini.

---

## Menyiapkannya, langkah demi langkah

Fitur ini ada di NFC.cool Tools, di iPhone dan Android. Ini merupakan bagian dari langganan Pro (Platinum), jadi Anda memerlukan itu untuk menulis tag yang diaktifkan counter. Jika Anda belum pernah menulis tag sebelumnya, panduan saya tentang [cara menulis tag NFC di iPhone](/blog/write-nfc-tags-iphone/) mencakup dasar-dasarnya terlebih dahulu.

1. Buka NFC.cool Tools, buka bagian **NFC Tools**, dan ketuk **NFC Tap Counter**.
2. Pilih apa yang harus dikirimkan tag: **URL**, **Email**, **SMS**, atau **Shortcut**. (Shortcut hanya iOS, karena Shortcuts adalah aplikasi Apple; URL, Email, dan SMS bekerja di kedua platform.)
3. Susun konten tersebut seperti biasa - ketik tautan, tulis pesan, pilih shortcut.
4. Aktifkan tombol yang Anda inginkan: **NFC Tap Counter** menambahkan jumlah terkini, dan **NFC Tag ID** menambahkan nomor seri tag. Anda bisa menggunakan salah satu, atau keduanya.
5. Jika Anda memprogram sekumpulan tag dengan konten yang sama, aktifkan **Batch write** sehingga pemindai tetap terbuka dan Anda bisa menulis satu tag setelah yang lain.
6. Periksa **Preview**. Ini menampilkan contoh output dengan nilai pengganti, sehingga Anda bisa melihat dengan tepat di mana jumlah dan ID akan muncul sebelum Anda melanjutkan.
7. Ketuk **Write to NFC Tag** dan dekatkan tag ke bagian atas ponsel Anda.

Itulah seluruh pengaturannya, dan saya sengaja membuatnya singkat. Dari titik itu tag sudah mandiri - ia menghitung dan melaporkan sendiri, untuk setiap orang yang mengetuknya, dengan atau tanpa aplikasi.

Jika Anda pernah ingin menghentikannya, aplikasi dapat mematikan counter pada tag yang sudah ada. Chip berhenti menukar nilai terkini, tetapi konten tetap pada tag persis seperti terakhir kali ditulis. Satu detail yang perlu diketahui: chip terus menghitung secara internal bahkan setelah Anda mematikan substitusi - jumlahnya tidak pernah hilang, hanya berhenti ditampilkan.

---

## Di mana jumlah dan ID tag muncul

Di mana nilai-nilai tersebut muncul tergantung pada jenis konten yang Anda pilih. Dengan kedua tombol aktif, ID tag dan jumlah disisipkan bersama - ID dulu, kemudian jumlah, dihubungkan dengan `x` kecil. Menggunakan `049F50824F1390` sebagai ID tag dan `000007` sebagai jumlah, berikut adalah sebelum dan sesudah untuk setiap jenis:

- **URL:** `https://example.com/page` menjadi `https://example.com/page?nfc=049F50824F1390x000007`
- **Isi email:** `Hi, here's my card.` menjadi `Hi, here's my card. 049F50824F1390x000007`
- **Isi SMS:** `Order confirmed!` menjadi `Order confirmed! 049F50824F1390x000007`
- **Input Shortcut:** `log-entry` menjadi `log-entry 049F50824F1390x000007`

Nilai-nilai tersebut ditambahkan dengan bersih, sehingga sisa konten Anda tetap berfungsi normal. Matikan satu tombol dan Anda hanya mendapatkan yang lain sendiri: hanya jumlah (`000007`) atau hanya ID tag (`049F50824F1390`).

Nah, pertanyaan yang selalu saya dapatkan di sini: mengapa `000007` dan bukan hanya `7`? Jumlah ditulis dalam heksadesimal - sistem bilangan basis-16 yang berjalan dari 0 hingga 9 kemudian A hingga F - dan diisi hingga enam karakter. Jadi `000007` hanyalah pemindaian ketujuh tag. Setelah melewati pemindaian kesembilan Anda mulai melihat huruf: `00000A` adalah 10. Batas atasnya adalah `FFFFFF`, yang kira-kira 16 juta pemindaian, lebih dari cukup untuk hampir semua tag di dunia nyata. ID tag adalah string hex yang lebih panjang - nomor seri pabrik 7-byte chip - dan tidak seperti jumlah, ia tidak pernah berubah.

Jika Anda mengarahkan URL yang sudah jadi ke situs web Anda sendiri, server Anda membaca nilai-nilai tersebut langsung dari alamatnya: catat jumlah, bandingkan dengan ambang, atau bedakan satu tag dari yang lain berdasarkan ID-nya.

---

## Tag mana yang Anda butuhkan

Fitur ini bergantung pada chip, jadi tag penting. NFC.cool mendukung chip `NTAG213`, `NTAG215`, dan `NTAG216` untuk Tap Counter. Itu adalah stiker NFC yang paling umum dijual untuk ponsel, jadi mudah ditemukan, tetapi saya tetap akan memeriksa jenis chip sebelum membeli dalam jumlah besar. Jika Anda mencoba menggunakan tag yang tidak didukung fitur ini, aplikasi memperingatkan Anda alih-alih menulis sesuatu yang tidak akan berfungsi - saya memastikan itu karena saya pernah melihat betapa frustrasinya kegagalan yang diam.

Jika Anda perlu stok, halaman [tag NFC yang direkomendasikan](/affiliate-links/) kami mencantumkan stiker `NTAG216` yang kami gunakan dan uji. Dan jika Anda baru mengenal memilih tag, panduan saya tentang [berbagai jenis tag NFC untuk iPhone](/blog/nfc-tag-types-for-iphones/) menjelaskan trade-off dalam istilah yang sederhana.

---

## Beberapa pertanyaan singkat

**Bisakah saya mereset counter?** Tidak. Ini adalah counter satu arah yang dibangun ke dalam chip dan hanya bisa naik. Itu disengaja, dan sejujurnya itulah intinya - counter yang bisa direset tidak akan berguna untuk edisi terbatas atau pemeriksaan anti-pemalsuan. Jika Anda memerlukan jumlah baru, gunakan tag baru.

**Bisakah siapa saja membaca jumlahnya, atau hanya saya?** Siapa saja. Setiap ponsel yang mengetuk tag mendapatkan konten yang sudah jadi dengan jumlah di dalamnya, dengan atau tanpa aplikasi yang terpasang. Itulah intinya - tag melaporkan untuk dirinya sendiri.

**Bisakah saya mematikannya nanti?** Ya. Aplikasi dapat menghentikan chip dari mengganti placeholder. URL atau pesan tetap pada tag; hanya pembaruan terkini yang berhenti. Chip terus menghitung secara internal.

**Apakah counter bersifat privat?** Jumlah ada pada tag, bukan di server. Siapa saja yang mengetuk tag melihat jumlah dalam konten, dan jika konten tersebut mengarah ke server yang Anda kendalikan, hanya server itu yang melihatnya. ID tag adalah nomor seri pabrik, bukan informasi yang dapat mengidentifikasi pribadi seseorang.

**Apakah perlu internet?** Tidak. Penghitungan dan substitusi keduanya terjadi di dalam chip. Internet hanya masuk jika URL yang Anda tulis kebetulan mengarah ke situs web.

---

## Coba sekarang

Selama sebagian besar tahun saya bekerja dengan NFC, menghitung ketukan berarti tautan unik dan backend untuk menjumlahkannya. Counter NTAG21x dengan diam-diam menghapus persyaratan itu: tag menyimpan catatan sendiri, dan fitur NFC Tap Counter di NFC.cool Tools adalah yang mengaktifkannya. Ini adalah salah satu fitur yang terus saya harapkan lebih banyak orang tahu bahwa itu bahkan mungkin.

Ingin melihatnya bekerja sebelum menulis satu tag pun? [Demo tap counter langsung](/tap-counter/) kami adalah halaman yang melakukan persis apa yang dijelaskan tulisan ini - tulislah tag yang mengarah ke sana, berikan ketukan, dan halaman menampilkan jumlah pemindaian dan ID tag yang baru saja diserahkan chip. Tidak ada server dalam prosesnya, hanya URL.

Ini tersedia sekarang di NFC.cool Tools, di [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-count-nfc-tag-scans-en&mt=8) dan [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-count-nfc-tag-scans-en). Untuk melihat toolkit NFC lengkap yang telah saya bangun, lihat [fitur pembaca dan penulis NFC](/features/nfc-reader-writer/).
