---
id: "nxp-icode-3-2026-10"
title: "ICODE 3, SLIX, ICODE DNA, dan NTAG 5 kini didukung NFC.cool di iPhone"
date: "2026-10-04"
tags: ["announcements", "nfc-tags", "iphone"]
summary: "NFC.cool Tools 7.1.0 kini mengerti NXP ICODE: aplikasi ini membaca, memverifikasi, dan mengelola tag ICODE 3, keluarga SLIX, ICODE DNA, dan NTAG 5 di iPhone, juga di iPad dan Mac dengan pembaca eksternal. Inilah kemampuan chip-chip yang biasa dipakai perpustakaan dan toko ini, serta keanehan iOS yang sempat membuat saya mengira kode saya sendiri yang rusak."
image: "/assets/images/Blog/nxp-icode-3-slix-ntag-5.webp"
imageAlt: "Buku perpustakaan dengan label RFID di balik sampulnya, di samping iPhone yang menampilkan detail sebuah tag NFC"
author: "Nicolo Stanciu"
metaTitle: "Tag NXP ICODE 3 dan SLIX di iPhone: baca dan kelola"
metaDescription: "NFC.cool kini membaca dan mengelola tag NXP ICODE 3, SLIX, SLIX2, ICODE DNA, dan NTAG 5 di iPhone: kata sandi, penghitung ketukan, penanda anti-pencurian, mode privasi, dan lainnya."
ogTitle: "ICODE 3, SLIX, dan NTAG 5 kini bisa dipakai di iPhone"
ogDescription: "Apa saja kemampuan chip NXP untuk perpustakaan dan toko ini, dan bagaimana NFC.cool membaca serta mengelolanya di iPhone, iPad, dan Mac."
---

Sebuah tag ICODE 3 tergeletak di meja saya, iPhone saya di atasnya, dan aplikasi dengan lancar membaca semua yang bisa disampaikan chip itu: ID-nya, memorinya, penghitung ketukannya, dan tanda tangan NXP yang membuktikan keasliannya. Lalu saya memintanya mengubah satu hal saja, yaitu penghitungnya, dan aplikasi malah bilang tag-nya sudah bergeser.

Padahal tag itu tidak bergeser sedikit pun. Saya coba lagi. Pesannya sama. Saya coba mengatur kata sandi saja. Pesannya tetap sama.

Nanti saya ceritakan apa yang sebenarnya terjadi, karena ini bug paling menarik yang saya buru tahun ini. Tapi sebelumnya, kenapa saya sampai mengutak-atik tag ICODE.

Saya ingin NFC.cool menjadi aplikasi NFC paling lengkap yang bisa Anda pasang di ponsel. Pertengahan tahun ini, itu berarti [NTAG 424 DNA](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/), tag yang dipakai merek-merek untuk membuktikan sebuah produk asli. Setelah itu, keluarga chip terbesar yang masih belum benar-benar bisa diajak bicara oleh aplikasi ini adalah ICODE dari NXP. Mulai **NFC.cool Tools 7.1.0**, akhirnya bisa.

---

## ICODE, tag yang mungkin sudah sering Anda pegang tanpa sadar

Kalau dalam dua puluh tahun terakhir Anda pernah meminjam buku di perpustakaan, besar kemungkinan Anda pernah memegang tag ICODE. Itulah label tipis dengan antena melingkar yang ditempel di balik sampul buku. Chip yang sama juga ada di label anti-pencurian di toko, tag laundry, dan label produk.

Secara teknis, chip ini adalah chip **ISO 15693**, yang dalam dunia NFC disebut **Type 5**. Stiker NFC yang dibeli kebanyakan orang, seperti NTAG215, memakai standar yang berbeda. Saya membayangkannya seperti dua orang yang sama-sama bisa Anda telepon: iPhone Anda bisa tersambung ke keduanya, tapi begitu tersambung, mereka tidak berbicara dalam bahasa yang sama.

Perpustakaan dan toko memilih ICODE karena jangkauannya. Antena besar di gerbang perpustakaan atau di meja layanan mandiri bisa membaca chip ini dari jarak yang lebih jauh daripada stiker NFC biasa. Dengan ponsel, Anda tetap harus mendekatkannya, karena antena iPhone sangat kecil, tetapi chip ini memang dirancang untuk gerbang-gerbang seperti itu.

Membaca tautan atau teks yang tersimpan di tag ICODE tidak pernah jadi masalah. Bagian yang menarik ada di lapisan bawahnya: kata sandi, penghitung, penanda anti-pencurian, mode privasi. Sebelum versi ini, bagian chip itu tertutup rapat bagi NFC.cool.

---

## Apa yang bisa dilakukan NFC.cool dengan ICODE 3

**ICODE 3** adalah chip terbaru NXP di keluarga ini sekaligus penerus ICODE SLIX2. Di toko online, chip ini sering dijual dengan nama "SLIX 3". NXP tidak punya chip dengan nama itu, jadi kalau sebuah iklan menyebut SLIX 3, yang dimaksud adalah ICODE 3.

Pindai salah satunya dengan NFC.cool, dan Anda langsung mendapat gambaran lengkapnya: chip apa itu, memorinya, penghitungnya, dan apakah chip itu **NXP Asli**. NXP menandatangani ID setiap chip di pabrik, dan aplikasi memeriksa tanda tangan itu, sehingga salinan yang memakai ulang ID yang sama tidak bisa memalsukannya.

Dari situ, Anda bisa mengubah hampir semua yang ditawarkan chip ini:

- **Penghitung ketukan.** ICODE 3 bisa menghitung setiap pembacaan dengan sendirinya. Aktifkan Cermin NFC, dan chip akan menuliskan ID-nya serta angka hitungan terbaru ke dalam tautan yang tersimpan, sehingga setiap ketukan membuka URL yang sedikit berbeda, yang bisa dihitung oleh sebuah situs web. Kalau Anda sudah membaca tentang [NFC Tap Counter](/blog/count-nfc-tag-scans/), ini ide yang sama pada chip yang berbeda.
- **Kata sandi.** ICODE 3 punya enam kata sandi, masing-masing untuk membaca, menulis, privasi, penghancuran, pengaturan anti-pencurian, dan konfigurasi. Semua tag keluar dari pabrik dengan nilai yang sama, jadi perlindungan baru ada artinya setelah Anda mengatur kata sandi sendiri. NFC.cool menyimpan kata sandi Anda di iCloud Keychain, terpisah untuk setiap tag.
- **Perlindungan memori.** Anda bisa membagi memori menjadi dua bagian dan melindungi masing-masing secara terpisah, misalnya agar tautan publik tetap bisa dibaca sementara data yang disimpan setelahnya tersembunyi.
- **Pengaturan anti-pencurian dan perpustakaan.** Penanda EAS-lah yang membuat gerbang toko atau perpustakaan berbunyi. Byte AFI dipakai perpustakaan untuk menandai buku yang sedang dipinjam. Keduanya bisa diubah, juga dikunci.
- **Mode privasi.** Tag menyembunyikan ID dan datanya sampai seseorang memberikan kata sandi privasi.
- **Deteksi perusakan** pada versi SL2S3003TT, yang punya kabel tipis yang bisa Anda bentangkan melintasi tutup botol atau segel kotak. Aplikasi menunjukkan apakah segel itu pernah rusak.
- **Tanda tangan sendiri.** Sebuah merek bisa mengganti tanda tangan NXP dengan tanda tangannya sendiri, lalu menguncinya.
- **Penghancuran.** Chip dimatikan untuk selamanya, demi privasi di akhir masa pakai sebuah produk.

Beberapa pengaturan ini bersifat permanen, dan beberapa bisa membuat tag tidak lagi terjangkau dari iPhone. Karena itu, untuk apa pun yang tidak bisa dibatalkan, NFC.cool meminta Anda mengetik empat karakter terakhir ID tag lebih dulu. Aplikasi juga menolak mengubah tag selain tag yang Anda pakai sejak awal. Meski begitu, kalau saya, apa pun yang baru tetap saya coba di tag cadangan dulu.

Satu hal kecil yang sekalian saya perbaiki: sekarang Anda bisa memformat tag ICODE kosong sebagai tag NFC langsung dari aplikasi, sehingga siap diisi tautan atau teks.

---

## Anggota keluarga ICODE lainnya

Aplikasi mengenali chip yang sedang Anda pegang dan hanya menawarkan apa yang benar-benar bisa dilakukan chip itu. SLIX yang lebih lama menampilkan lebih sedikit opsi daripada ICODE 3, semata karena fiturnya memang lebih sedikit.

- **SLIX, SLIX-S, SLIX-L, SLIX2**, dan chip **SLI** yang lebih lama adalah tulang punggung yang akan Anda temukan di kebanyakan perpustakaan. SLIX2 punya penghitung dan perlindungan memori. SLIX-S melindungi memorinya halaman demi halaman dan mendukung kata sandi 64-bit, yang berarti setiap akses yang dilindungi membutuhkan kata sandi baca sekaligus kata sandi tulis.
- **ICODE DNA** adalah saudaranya yang khusus untuk keamanan. Chip ini menyimpan kunci AES rahasia yang tidak pernah keluar dari chip. Masukkan kuncinya di NFC.cool, dan aplikasi akan menantang chip untuk membuktikan bahwa ia memang memegang kunci itu. Salinan tetap gagal, meskipun ID dan memorinya sama persis.
- **NTAG 5** adalah yang paling membuat saya bersemangat, sebagai orang yang senang mengutak-atik. Ini chip NFC yang dirancang untuk dipasang di papan sirkuit. Varian **switch** mengendalikan pin secara langsung, sedangkan **link** dan **boost** berkomunikasi dengan mikrokontroler lewat I2C. Chip-chip ini bisa memberi daya ke rangkaian kecil hanya dari medan NFC ponsel Anda, memberi sinyal lewat sebuah pin saat terjadi sesuatu, dan berbagi memori 256 byte dengan papan sirkuitnya. NFC.cool membaca dan mengubah pengaturan tersebut, dan pada NTP5332 serta NTA5332, aplikasi bahkan bisa berkomunikasi dengan sensor yang tersambung ke chip, langsung dari iPhone Anda.

Semuanya bisa Anda temukan di alat-alat NFC, di bawah **NXP ICODE dan NTAG 5**, tepat di samping NTAG 424 DNA. Atau cukup pindai tag ICODE, dan aplikasi akan langsung membuka detailnya.

---

## Bug yang ditutupi iOS

Kembali ke meja saya dan tag yang katanya "bergeser" tadi.

ISO 15693 memberi ponsel dua cara untuk berbicara dengan tag. Ponsel bisa mencantumkan ID tag di setiap pesan, seperti menulis nama penerima di amplop, sehingga hanya tag itu yang menjawab. Atau ponsel bisa lebih dulu **memilih** tag tersebut, seperti menoleh ke satu orang di tengah ruangan, lalu langsung bicara.

Cara amplop lebih rapi, jadi NFC.cool mencobanya lebih dulu. Untuk memastikan cara itu berfungsi, aplikasi mengirim pesan uji singkat yang mencantumkan ID. Tag menjawab, jadi aplikasi menyimpulkan bahwa cara amplop bisa dipakai, lalu melanjutkan.

Yang tidak saya ketahui adalah ini: iOS membagi perintah-perintah tersebut menjadi dua kelompok. Ada perintah standar yang dipahami setiap chip ISO 15693, dan ada perintah khusus milik NXP, yaitu perintah untuk kata sandi, penghitung, dan konfigurasi. Kalau pesan yang mencantumkan ID membawa salah satu perintah khusus NXP, iOS menolak mengirimnya. Pesan itu tidak pernah keluar dari ponsel. iOS diam-diam mengembalikan error "invalid parameter", dan bagi kode saya, error itu terlihat persis seperti tag yang bergeser menjauh.

Pesan uji saya memakai perintah standar, jadi lolos tanpa hambatan dan memberi tahu saya bahwa semuanya beres. Setiap perubahan sungguhan memakai perintah NXP, jadi setiap perubahan sungguhan gagal.

Begitu saya paham masalahnya, perbaikannya ternyata sederhana sekali, sampai-sampai saya agak malu sendiri. Pesan uji sekarang memakai salah satu perintah khusus NXP, perintah tak berbahaya yang hanya meminta chip memberikan angka acak. Kalau iOS menolaknya, aplikasi beralih ke cara memilih tag. Saya menaruh iPhone lagi di atas ICODE 3 itu, mengetuk **Atur penghitung**, dan angka di tag pun berubah. Jarang sekali saya sesenang itu melihat sebuah angka bergerak.

---

## Perangkat yang didukung

Di iPhone, semua ini bekerja dengan pembaca NFC bawaan ponsel. Di iPad dan Mac, yang tidak punya chip NFC, semua ini bekerja lewat [pembaca NFC USB eksternal](/blog/nfc-reading-ipad-mac/). Pembaca itu harus bisa meneruskan perintah ICODE langsung ke tag. Kalau pembaca Anda bisa, aplikasi membaca dan mengelola tag ICODE persis seperti di iPhone, dan bug dari bagian sebelumnya sama sekali tidak muncul di sana. Pembaca yang tidak bisa meneruskan perintah tersebut tetap memungkinkan Anda membaca memori tag.

Aplikasi Android belum mendukung ICODE.

Kalau di laci Anda ada setumpuk tag ala perpustakaan yang selama ini tidak pernah benar-benar terpakai, atau papan NTAG 5 yang masih menunggu dijadikan proyek, perbarui ke 7.1.0 dan pindai salah satunya. NFC.cool Tools tersedia di [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nxp-icode-3-slix-ntag-5-id&mt=8).
