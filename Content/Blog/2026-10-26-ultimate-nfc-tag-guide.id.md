---
id: "ultimate-nfc-tag-guide-2026-09"
title: "Panduan lengkap tag NFC: setiap chip, kegunaannya, dan apa yang bisa membacanya"
date: "2026-10-26"
tags: ["nfc-tags", "guides"]
summary: "Setiap chip NFC yang bisa Anda beli, dari NTAG210 berkapasitas 48 byte hingga DESFire EV3, dengan angka yang sebenarnya: memori, perlindungan, ketahanan tulis, apa yang bisa dilakukan iPhone dan ponsel Android dengannya, dan pekerjaan apa yang memang menjadi tujuan pembuatannya."
image: "/assets/images/Blog/ultimate-nfc-tag-guide.webp"
imageAlt: "iPhone dengan ikon NFC yang bercahaya di belakang deretan bentuk tag NFC: stiker, koin, kartu PVC, gantungan kunci, gelang, dan inlay transparan"
author: "Nicolo Stanciu"
metaTitle: "Panduan lengkap tag NFC: setiap chip dijelaskan"
metaDescription: "Semua chip NFC di satu tempat: NTAG, MIFARE, DESFire, ICODE, ST25, FeliCa, Topaz, dan tiruannya. Memori, keamanan, ketahanan, pembacanya, dan tag mana untuk pekerjaan apa."
ogTitle: "Setiap chip NFC dalam satu panduan"
ogDescription: "Memori, keamanan, ketahanan, dukungan ponsel, dan kegunaan yang jujur untuk setiap chip NFC yang bisa Anda beli. Tabel spesifikasi, tabel keputusan, dan katalog lengkap."
---

Anda membuka halaman produk untuk satu paket tag NFC. Tertulis "NFC 213", atau "kompatibel NTAG215", atau sekadar "kartu NFC 1K, bisa untuk semua ponsel". Anda hanya ingin tahu satu hal: apakah ini bisa melakukan pekerjaan yang saya rencanakan? Dan halaman itu tidak bisa menjawabnya, karena orang yang menulisnya juga tidak tahu.

Saya sudah bertahun-tahun membangun [NFC.cool Tools](/features/nfc-reader-writer/), aplikasi yang tugas pertamanya di setiap ketukan adalah menjawab pertanyaan itu: chip apa ini, dan apa yang bisa dilakukannya? Kode identifikasinya saja mengenali sekitar enam puluh produk dari tujuh produsen, dan setiap produk masuk ke daftar itu karena seseorang mendekatkannya ke ponsel dan ada sesuatu yang tidak berjalan seperti yang dijanjikan penjualnya. Panduan ini adalah referensi yang saya harap sudah ada waktu saya menulis kode itu. Panjangnya memang disengaja. Kalau Anda ingin versi singkatnya, [panduan tag NFC untuk pemula](/blog/nfc-tags-beginners-guide/) adalah tempat untuk memulai, dan panduan itu menautkan kembali ke sini untuk pembahasan yang lebih dalam.

Ringkasannya dalam satu kalimat, supaya Anda sudah memegangnya sebelum masuk ke tabel: **tidak ada tag NFC terbaik, yang ada hanya chip yang tepat untuk pekerjaannya**, dan pekerjaan itu ditentukan oleh tiga hal: seberapa banyak yang perlu Anda simpan, siapa yang perlu Anda halangi, dan apa yang harus bisa membacanya.

---

## Cara menggunakan panduan ini

Setiap angka di panduan ini berasal dari datasheet produsen, dokumen platform dari Apple atau Google, atau dari kode aplikasi saya sendiri, dan [sumber-sumbernya](#sumber-dan-bacaan-lanjutan) tercantum di bagian akhir. Kalau sebuah chip pernah ada di meja saya, saya menyebutkannya dalam catatan pengalaman langsung. Kalau belum, saya juga mengatakannya: komponen yang eksotis datanya berasal dari datasheet, dan datasheet itu janji, bukan hasil pengukuran.

Dua hal yang tidak akan Anda temukan di sini: langkah demi langkah menulis tag pertama Anda (itu ada di [panduan menulis tag](/blog/write-nfc-tags-iphone/)) dan kisah lengkap NTAG 424 DNA, yang punya [artikelnya sendiri](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/).

- [Wujud fisik sebuah tag NFC](#wujud-fisik-sebuah-tag-nfc)
- [Rimba singkatan: standar, tipe Forum, dan yang bukan NFC](#rimba-singkatan-standar-tipe-forum-dan-yang-bukan-nfc)
- [Cara membaca datasheet atau deskripsi produk](#cara-membaca-datasheet-atau-deskripsi-produk)
- [NDEF dan apa yang benar-benar muat di sebuah tag](#ndef-dan-apa-yang-benar-benar-muat-di-sebuah-tag)
- [Peta memori: isi chip dan letaknya](#peta-memori-isi-chip-dan-letaknya)
- [Tabel keputusan](#tabel-keputusan)
- [Keluarga demi keluarga](#keluarga-demi-keluarga)
- [Bentuk fisik dan jangkauan baca](#bentuk-fisik-dan-jangkauan-baca)
- [Siapa bisa membaca apa](#siapa-bisa-membaca-apa)
- [Apa yang dilakukan NFC.cool Tools dengan setiap chip](#apa-yang-dilakukan-nfccool-tools-dengan-setiap-chip)
- [Membeli tanpa tertipu](#membeli-tanpa-tertipu)
- [Seluruh katalog dalam satu tabel](#seluruh-katalog-dalam-satu-tabel)
- [Perbandingan yang paling sering dicari](#perbandingan-yang-paling-sering-dicari)
- [Pertanyaan yang sering diajukan](#pertanyaan-yang-sering-diajukan)
- [Glosarium](#glosarium)
- [Sumber dan bacaan lanjutan](#sumber-dan-bacaan-lanjutan)

---

## Wujud fisik sebuah tag NFC

Tag NFC adalah tiga hal yang direkatkan menjadi satu: sebuah **chip** seukuran butiran pasir, sebuah **antena** berupa beberapa lilitan aluminium atau tembaga yang dietsa, dan sebuah **substrat** yang menahan keduanya, bisa berupa stiker kertas, inlay PET, kartu PVC, atau kapsul kaca. Chip itu tidak punya baterai. Dayanya berasal dari ponsel.

Cara kerjanya adalah kopling induktif. Antena ponsel adalah sebuah kumparan yang menghasilkan medan magnet yang berganti arah 13,56 juta kali per detik. Masukkan kumparan kedua ke dalam medan itu dan arus akan terinduksi di dalamnya, sama seperti cara kerja pengisi daya nirkabel, hanya dengan daya yang jauh lebih kecil. Chip tag hidup dari arus induksi itu. Untuk mengirim data kembali, chip tidak memancarkan apa pun sendiri. Ia menyalakan dan mematikan sebuah beban di antenanya, yang dirasakan kumparan ponsel sebagai perubahan kecil di medannya sendiri. Trik ini disebut **modulasi beban** (load modulation), dan inilah alasan ponsel melakukan semua pekerjaan sementara tag bisa seharga delapan sen.

Ini juga alasan jangkauannya seperti itu. Medan sebuah kumparan kecil melemah sebanding dengan pangkat tiga jarak, jadi tag yang terbaca sempurna di jarak satu sentimeter tidak mendapat apa-apa di jarak sepuluh. Saya membayangkannya seperti lilin: Anda bisa membaca dengan cahayanya kalau dekat, dan sekeras apa pun Anda menyipitkan mata, itu tidak membantu dari seberang ruangan. Definisi NFC Forum sendiri menyebut "jangkauan tipikal hingga 2 cm", dokumentasi Android menyebut "4 cm atau kurang", dan datasheet NXP menyebut "hingga 100 mm tergantung kuat medan dan geometri antena". Ketiganya benar. Angka ponsel adalah yang akan Anda alami; angka 100 mm adalah kemampuan chip dengan pembaca besar dan antena besar.

Kecepatan datanya sederhana karena memang tidak perlu lebih. Tag Type A atau Type B berkomunikasi pada 106 kbit/s, dan chip yang lebih cepat menegosiasikan 212, 424, atau 848 kbit/s setelah jabat tangan awal. FeliCa berjalan pada 212 atau 424. ISO 15693, keluarga jarak jauh, lebih lambat lagi, 26,48 kbit/s dalam mode normalnya, karena dirancang untuk dibaca dari jarak satu meter oleh gerbang gudang, bukan oleh ponsel. Membaca seluruh 888 byte NTAG216 tetap hanya butuh sepersekian detik.

| Standar | Kecepatan dasar | Mode lebih cepat | Kanal balik |
| --- | --- | --- | --- |
| ISO/IEC 14443 Type A dan B | 106 kbit/s | 212, 424, 848 kbit/s pada chip yang menegosiasikannya (DESFire, Plus, NTAG 424 DNA) | modulasi beban pada subcarrier 847,5 kHz |
| FeliCa (JIS X 6319-4, ISO/IEC 18092) | 212 kbit/s | 424 kbit/s | modulasi beban |
| ISO/IEC 15693 | 26,48 kbit/s (6,62 kbit/s mode lambat) | mode cepat NXP 53 kbit/s; ICODE 3 hingga 212 kbit/s | modulasi beban pada subcarrier 423,75 kHz |

---

## Rimba singkatan: standar, tipe Forum, dan yang bukan NFC

Setiap deskripsi produk mencampur tiga sistem penamaan: standar ISO yang mendefinisikan sisi radionya, tipe tag NFC Forum yang mendefinisikan cara data disusun, dan nama produk dari produsen. Inilah petanya.

### Standar-standarnya

| Standar | Yang didefinisikan | Nama di NFC Forum | Contoh chip |
| --- | --- | --- | --- |
| ISO/IEC 14443 Type A (bagian 1 sampai 3) | kartu proximity, 106 kbit/s, modulasi Type A, antikolisi, UID | NFC-A | NTAG, MIFARE Ultralight, MIFARE Classic, Topaz |
| ISO/IEC 14443 Type B | sama, dengan modulasi berbeda dan tanpa UID dalam arti yang sama | NFC-B | ST SRI512, kartu transit Calypso, banyak e-paspor |
| ISO/IEC 14443-4 | protokol transport di atas A atau B, disebut ISO-DEP | ISO-DEP | DESFire, NTAG 424 DNA, MIFARE Plus di SL3, kartu bank, paspor |
| ISO/IEC 7816-4 | bahasa perintah (APDU) dan sistem file yang dipakai lewat ISO-DEP | | semua yang ada di baris di atas |
| ISO/IEC 7816-6 | antara lain, daftar kode produsen chip | | byte pertama UID |
| ISO/IEC 15693 | kartu vicinity, hingga satu meter dengan pembaca yang tepat, UID 8 byte | NFC-V | ICODE, ST25TV, ST25DV, TI Tag-it, NTAG 5 |
| JIS X 6319-4 | FeliCa milik Sony | NFC-F | FeliCa Lite-S, Suica, Octopus |
| ISO/IEC 18092 | NFC itu sendiri (NFCIP-1): peer-to-peer dan mode pasif yang dipakai ponsel | | ponsel Anda |

### Tipe tag NFC Forum

NFC Forum tidak merancang chip. Organisasi ini menulis lima resep untuk menyimpan pesan **NDEF** (format wadah yang dipahami setiap ponsel) di chip yang sudah ada. Itulah arti "tag Type 2": bukan sebuah chip, melainkan sebuah tata letak.

| Tipe Forum | Radio | Model memori | Chip yang umum | Dukungan ponsel |
| --- | --- | --- | --- | --- |
| Type 1 | NFC-A | blok 8 byte, bisa dikunci satu kali | Topaz dari Innovision/Broadcom | terbaca di kedua platform; NFC Forum menghapus Type 1 dari rilis spesifikasinya tahun 2021 |
| Type 2 | NFC-A | halaman 4 byte, capability container di halaman 3, blok TLV | NTAG21x, MIFARE Ultralight, ST25TN, Fudan FM11NT0x1, Infineon my-d move | iPhone dan Android, termasuk pembacaan latar belakang di iPhone |
| Type 3 | NFC-F | blok 16 byte, kode layanan | FeliCa Lite-S, FeliCa Standard | iPhone dan Android (dukungan NFC-F wajib di Android) |
| Type 4 | ISO-DEP lewat NFC-A atau NFC-B | file yang dipilih lewat APDU: file CC dan file NDEF | NTAG 424 DNA, DESFire, ST25TA | iPhone dan Android |
| Type 5 | NFC-V | blok 4 byte, CC di blok 0 | ICODE SLIX dan SLIX2, ST25TV, ST25DV, NTAG 5 | iPhone sejak iOS 13, Android lewat NfcV; ditambahkan ke Forum pada 2015 |

Ada dua hal yang sengaja tidak masuk daftar itu. **MIFARE Classic** sama sekali bukan tipe tag Forum; NDEF di Classic adalah pemetaan buatan NXP yang didukung Android di sebagian ponsel dan tidak didukung iOS di ponsel mana pun. Dan resep-resep Forum tidak mengatur apa pun soal keamanan. Tag Type 2 bisa berupa NTAG213 polos atau NTAG 224 DNA dengan autentikasi AES-128; tag Type 4 bisa berupa ST25TA02K polos atau kartu bank. Tipenya memberi tahu cara pesan NDEF disimpan, bukan siapa yang bisa mengaksesnya.

### Yang bukan tag NFC

Separuh pesan "kenapa ponsel saya tidak bisa membaca ini" yang saya terima ternyata soal benda yang sejak awal bukan NFC. Kumparan NFC ponsel disetel ke 13,56 MHz dan berbicara dengan protokol di atas. Apa pun di luar itu tidak terlihat olehnya, semirip apa pun bentuknya dengan tag.

| Bentuknya seperti tag, tapi | Frekuensi | Sebenarnya apa | Bisakah ponsel membacanya |
| --- | --- | --- | --- |
| kartu kantor atau kartu parkir tanpa chip yang terlihat | 125 kHz | RFID frekuensi rendah: ID baca-saja EM4100, HID Prox, T5577 yang bisa ditulis ulang | tidak, dan tidak ada aplikasi yang bisa mengubah itu |
| microchip hewan peliharaan | 134,2 kHz | transponder FDX-B ISO 11784/11785 | tidak |
| label antimaling toko atau label logistik | 860 sampai 960 MHz | UHF RAIN RFID, EPC Gen2 | tidak |
| kunci kamar hotel atau kartu transit lama | 13,56 MHz | MIFARE Classic atau kartu HF proprietary | Android kadang-kadang, iPhone hanya menampilkan UID |
| kartu bank | 13,56 MHz | kartu pintar EMV yang berbicara ISO-DEP | secara teknis ya; sebuah aplikasi bisa membaca daftar aplikasi dan data publik kartu, tetapi Core NFC milik Apple memblokir pembacaan kartu pembayaran dan tidak ada ponsel yang bisa membuat salinan yang berfungsi |
| paspor | 13,56 MHz | e-dokumen ICAO 9303 | ya, dengan zona baca mesin (MRZ) sebagai kuncinya; [saya sudah membuatnya](/blog/read-passport-nfc-chip/) |
| kunci keamanan | 13,56 MHz | autentikator FIDO2 lewat ISO 7816 | ya untuk browser, tapi tidak sebagai tag |

Kartu 125 kHz itulah yang paling menyakitkan. Kartu itu cocok dengan pembaca di pintu, bentuknya kartu plastik dengan kumparan di dalamnya, dan ia tidak akan pernah bisa berbicara dengan ponsel. Saya menulis tentang [kenapa iPhone tidak bisa membuka pintu apartemen Anda](/blog/iphone-rfid-condo-doors/) karena jawaban jujurnya ada di perangkat keras.

---

## Cara membaca datasheet atau deskripsi produk

Halaman depan sebuah datasheet berisi semua angka yang Anda butuhkan, dan deskripsi produk yang baik menyalinnya. Berikut arti setiap angka, dan mana yang suka menyesatkan.

### Memori pengguna versus memori total

Setiap chip punya EEPROM lebih banyak daripada yang bisa Anda pakai. NTAG213 punya total 180 byte dan 144 di antaranya milik Anda; 36 sisanya menyimpan UID, lock bit, capability container, dan halaman konfigurasi. MIFARE Classic 1K punya 1024 byte dan 752 di antaranya data, karena setiap sektor kehilangan satu blok untuk kuncinya. Deskripsi produk mengutip angka mana pun yang lebih besar. Angka yang penting adalah **memori pengguna**, dan itu pun belum sama dengan yang muat dalam pesan NDEF, yang dibahas di bagian berikutnya.

### UID

Pengenal unik (UID) ditanam di pabrik dan tidak bisa diubah, kecuali pada tiruan yang memang dibuat untuk bisa diubah. Ada tiga panjang:

| Panjang UID | Di mana | Catatan |
| --- | --- | --- |
| 4 byte | MIFARE Classic lama, kartu Classic murah saat ini | NXP menyebutnya "non-unique identifiers" (NUID) karena kombinasi 4 byte sudah habis. Tidak ada kode produsen di UID 4 byte. Byte pertama 08 berarti chip membuat ID acak di setiap ketukan |
| 7 byte | NTAG, Ultralight, DESFire, NTAG 424 DNA, Classic EV1 (opsional); IDm 8 byte milik FeliCa adalah kerabatnya | byte pertama adalah kode produsen |
| 8 byte | setiap chip ISO 15693 | byte pertama selalu E0, byte kedua adalah kode produsen |

Kode produsen berasal dari daftar ISO/IEC 7816-6, dan itulah cara tercepat yang jujur untuk memeriksa sebuah deskripsi produk. Kalau tag "NXP asli" melaporkan 1D, tag itu buatan Fudan.

| Kode | Produsen |
| --- | --- |
| 01 | Motorola |
| 02 | STMicroelectronics |
| 03 | Hitachi |
| 04 | NXP Semiconductors |
| 05 | Infineon |
| 07 | Texas Instruments |
| 08 | Fujitsu |
| 16 | EM Microelectronic |
| 1A | Sony |
| 1D | Shanghai Fudan Microelectronics |
| 25 | Innovision (Topaz) |
| 2C | Impinj |
| 2E | Broadcom |

### ATQA, SAK, dan GET_VERSION: cara pembaca membedakan chip

Saat chip Type A menjawab ponsel, ia mengirim dua nilai kecil, **ATQA** dan **SAK**. Pembaca, termasuk aplikasi saya, memakai SAK untuk mengelompokkan chip ke dalam keluarga, karena bit-bit SAK memberi tahu apakah chip berbicara ISO-DEP dan masuk keluarga besar yang mana. Catatan identifikasi dari NXP sendiri menulis dengan huruf tebal agar ATQA tidak dipakai untuk apa pun, karena nilainya bertabrakan dan menyesatkan, dan saya mendapati hal itu memang benar.

| SAK | Keluarga | ATQA yang biasa terlihat |
| --- | --- | --- |
| 00 | NTAG dan MIFARE Ultralight, semuanya | 00 44 |
| 08 | MIFARE Classic 1K, MIFARE Plus 2K atau SE di security level 1 | 00 04 (UID 4 byte), 00 44 (7 byte) |
| 09 | MIFARE Classic Mini | |
| 18 | MIFARE Classic 4K, MIFARE Plus 4K di level 1 | 00 02 atau 00 42 |
| 10, 11 | MIFARE Plus X di level 2 | |
| 20 | apa pun yang berbicara ISO-DEP: DESFire, NTAG 424 DNA, Plus di level 3, kartu bank, JCOP | 03 44 (DESFire, 424), 03 04 dengan ID acak |

Karena setiap NTAG dan setiap Ultralight menjawab SAK 00, membedakan NTAG213 dari NTAG216 atau dari Ultralight EV1 butuh satu perintah lagi: **GET_VERSION**. Perintah ini mengembalikan delapan byte, dan tiga di antaranya yang bekerja. Byte 2 adalah tipe produk (03 Ultralight, 04 NTAG, 07 NTAG I2C, 01 DESFire, 02 Plus, 08 DESFire Light), byte 4 adalah generasinya, dan byte 6 mengodekan ukuran penyimpanan. Begitulah NFC.cool tahu apa yang sedang dihadapinya, dan ini juga hal pertama yang ditanyakan konsol pembaca Amiibo kepada sebuah tag.

| Chip | Respons GET_VERSION |
| --- | --- |
| NTAG213 | 00 04 04 02 01 00 0F 03 |
| NTAG215 | 00 04 04 02 01 00 11 03 |
| NTAG216 | 00 04 04 02 01 00 13 03 |
| NTAG210 | 00 04 04 01 01 00 0B 03 |
| NTAG212 | 00 04 04 01 01 00 0E 03 |
| Ultralight EV1 48 B | 00 04 03 01 01 00 0B 03 |
| Ultralight EV1 128 B | 00 04 03 01 01 00 0E 03 |
| Ultralight AES | 00 04 03 0x 04 00 0F 03 |
| NTAG 223 DNA | 00 04 04 02 04 00 0F 03 |
| NTAG 424 DNA (dibungkus dalam APDU) | vendor 04, tipe 04, major 30, penyimpanan 11 |

Ada chip yang tidak punya GET_VERSION: Ultralight orisinal, Ultralight C, dan NTAG203 lama tidak pernah memilikinya, begitu juga sebagian besar tiruan. Ketiadaan itu sendiri sudah menjadi sidik jari.

### Ketahanan tulis, retensi, suhu

Inilah tiga angka yang hampir tidak pernah dikutip deskripsi produk dan selalu dicantumkan datasheet.

- **Ketahanan tulis** (write endurance) adalah berapa kali satu byte bisa ditulis ulang. 100.000 siklus adalah batas bawah untuk chip apa pun yang masih diproduksi; chip era Classic dan Ultralight orisinal diberi rating 10.000. DESFire EV3 dan keluarga ST25DV diberi rating tipikal 1.000.000.
- **Retensi data** adalah berapa lama byte bertahan tanpa daya. 10 tahun adalah standar lama, 50 tahun adalah rating NXP untuk NTAG 424 DNA dan keluarga ICODE SLIX, dan ST memberi rating 200 tahun untuk chip Type 4 ST25TA. Retensi dispesifikasikan pada suhu ruang; panas memperpendeknya.
- **Suhu operasional** adalah -25 sampai +70 °C untuk sebagian besar chip konsumen NXP, -40 sampai +85 °C untuk komponen ST dan EM, dan hingga 105 °C untuk ICODE 3. Biasanya bukan chip yang menjadi batasnya, melainkan perekat dan substratnya.

### Tangga keamanan

Inilah bagian deskripsi produk yang paling sering berbohong. "Terenkripsi", "aman", "anti-clone" dicetak di tag yang satu-satunya perlindungannya adalah kata sandi 32 bit yang dikirim tanpa enkripsi. Berikut tangganya, dari bawah ke atas, dan setiap chip di panduan ini berada di salah satu anak tangganya.

| Anak tangga | Apa itu | Chip | Yang dihentikannya |
| --- | --- | --- | --- |
| 0. Tidak ada | siapa pun bisa membaca dan menulis | Ultralight orisinal, NTAG203, TI Tag-it Standard, Topaz | tidak ada |
| 1. Lock bit | bit satu arah yang membuat halaman menjadi baca-saja selamanya | setiap chip Type 2 dan Type 5 | penulisan ulang; tidak menghentikan penyalinan |
| 2. Kata sandi | kata sandi 32 bit plus konfirmasi 16 bit (PACK), dengan batas percobaan gagal opsional; di NTAG21x kata sandinya melintas di udara tanpa enkripsi | NTAG21x, Ultralight EV1, NTAG 223 DNA, keluarga ICODE SLIX (32 bit), ST25TV (32 atau 64 bit), ST25TA (128 bit) | penulisan ulang iseng oleh orang asing dengan aplikasi; bukan penyerang serius dengan alat penyadap |
| 3. CRYPTO1 | stream cipher 48 bit milik NXP dari era 1990-an | MIFARE Classic, MIFARE Plus di level 1 | tidak ada sejak 2008; anggap sama dengan anak tangga 0 |
| 4. Triple DES | autentikasi dua arah dengan kunci 16 byte | Ultralight C, FeliCa Lite-S, DESFire D40 dan EV1 | penyalinan isi tanpa kunci |
| 5. AES-128 | autentikasi dua arah, secure messaging | Ultralight AES, NTAG 224 DNA, DESFire EV1 sampai EV3, DESFire Light, Plus di level 3, ICODE DNA, FeliCa Standard, EM4425 | sama, dengan cipher yang masih dipercaya |
| 6. AES plus SUN | setiap ketukan menghasilkan bukti kriptografis baru langsung di dalam URL | NTAG 424 DNA, NTAG 22x DNA, DESFire EV3 | kloning, karena salinan tidak bisa menandatangani ketukan berikutnya |
| 7. Loop anti-rusak | seutas kawat yang melaporkan secara permanen jika pernah diputus | NTAG 213 TT, NTAG 424 DNA TT, NTAG 22x DNA StatusDetect, ICODE 3 TT, ST25TV02KC-T | pemakaian ulang segel |

Ada dua fitur yang berdiri di samping tangga, bukan di atasnya. **Tanda tangan keaslian** (originality signature) adalah tanda tangan digital atas UID, ditulis oleh produsen, yang memungkinkan pembaca memeriksa bahwa chip berasal dari NXP atau ST. Fitur ini tidak menghentikan penyalinan, karena tiruan bisa membawa tanda tangan hasil salinan, dan NXP sendiri mengatakannya dalam catatan aplikasinya. Lalu **penghitung** (penghitung baca 24 bit di NTAG213/215/216, tiga penghitung satu arah di Ultralight EV1, penghitung tulis 16 bit di SLIX2) dibuat untuk kebutuhan pemakaian, bukan keamanan, kecuali jika dimasukkan ke dalam pesan SUN.

---

## NDEF dan apa yang benar-benar muat di sebuah tag

**NDEF** (NFC Data Exchange Format) adalah amplopnya. Ponsel tidak membaca "sebuah URL" dari tag; ia membaca pesan NDEF yang berisi rekaman URI, dan amplop itu punya bobot. Mengetahui bobotnya adalah cara menjawab "apakah tautan saya muat di NTAG213".

### Rekaman

Setiap rekaman diawali satu byte flag (awal pesan, akhir pesan, rekaman pendek, dan type name format tiga bit), lalu panjang tipe, panjang payload (satu byte jika payload di bawah 256 byte, empat byte jika lebih), tipenya sendiri, dan payload. Jadi rekaman URL pendek memakan 4 byte header sebelum byte pertama tautan Anda.

| Rekaman | Tipe | Payload |
| --- | --- | --- |
| URL | well-known type `U` | satu byte prefiks plus sisa URL dalam UTF-8 |
| Teks | well-known type `T` | satu byte status, kode bahasa (`en`), lalu teksnya |
| Smart Poster | well-known type `Sp` | seluruh pesan NDEF di dalamnya: sebuah URL plus judul dan aksi opsional |
| Kontak | MIME `text/vcard` | teks vCard apa adanya |
| Wi-Fi | MIME `application/vnd.wfa.wsc` | atribut Wi-Fi Simple Configuration: SSID, jenis autentikasi, kunci |
| Aplikasi Android | external type `android.com:pkg` | nama paket; Android membuka aplikasi itu atau halaman Play Store-nya |

Byte prefiks adalah satu-satunya hal cerdik di rekaman URI. Alih-alih menulis `https://` secara utuh, byte pertama payload adalah kode untuk prefiks yang umum, dan ponsel mengembalikannya.

| Kode | Prefiks | Kode | Prefiks |
| --- | --- | --- | --- |
| 00 | tidak ada | 12 | rtsp:// |
| 01 | http://www. | 13 | urn: |
| 02 | https://www. | 14 | pop: |
| 03 | http:// | 15 | sip: |
| 04 | https:// | 16 | sips: |
| 05 | tel: | 17 | tftp: |
| 06 | mailto: | 18 | btspp:// |
| 07 | ftp://anonymous:anonymous@ | 19 | btl2cap:// |
| 08 | ftp://ftp. | 1A | btgoep:// |
| 09 | ftps:// | 1B | tcpobex:// |
| 0A | sftp:// | 1C | irdaobex:// |
| 0B | smb:// | 1D | file:// |
| 0C | nfs:// | 1E | urn:epc:id: |
| 0D | ftp:// | 1F | urn:epc:tag: |
| 0E | dav:// | 20 | urn:epc:pat: |
| 0F | news: | 21 | urn:epc:raw: |
| 10 | telnet:// | 22 | urn:epc: |
| 11 | imap: | 23 | urn:nfc: |

Jadi `https://nfc.cool/` disimpan sebagai byte 04 diikuti `nfc.cool/`: sembilan byte payload untuk URL tujuh belas karakter. Datasheet NTAG 5 milik NXP sendiri menyertakan contoh `D1 01 0C 55 01` diikuti `nxp.com/nfc`, yang jika didekodekan menjadi `http://www.nxp.com/nfc`.

### Amplop di sekeliling rekaman

Di tag Type 2 atau Type 5, pesan berada di dalam sebuah TLV: satu byte yang berkata "pesan NDEF" (03), satu byte panjang (tiga byte jika pesannya 255 byte atau lebih), pesannya, dan satu byte penutup (FE). Di tag Type 4 tidak ada TLV; file NDEF diawali panjang dua byte. Dan pada NTAG213 atau NTAG212 dari pabrik, lima byte pertama memori pengguna sudah terisi oleh Lock Control TLV yang ditulis NXP sejak pabrik dan dipertahankan oleh setiap aplikasi penulis.

Inilah hitungannya untuk satu tautan `https://`, dikerjakan manual untuk chip yang dibeli kebanyakan orang:

- memori pengguna NTAG213: 144 byte
- dikurangi Lock Control TLV dari pabrik: 139
- dikurangi bingkai NDEF TLV (03, panjang, FE): 136 byte untuk pesan
- dikurangi header rekaman (flag, panjang tipe, panjang payload, `U`): 132 byte payload
- dikurangi byte prefiks: **131 karakter setelah `https://`**

### Apa muat di mana

<div class="table-scroll">

| Tag | Area NDEF | Karakter URL setelah https:// | vCard minimal (132 B, nama, telepon, email, URL) | vCard tipikal (250 sampai 500 B) | Rekaman Wi-Fi (67 sampai 88 B) |
| --- | --- | --- | --- | --- | --- |
| NTAG210, Ultralight EV1 48 B | 48 | 40 | tidak | tidak | tidak |
| NTAG212 | 128 | 115 | tidak | tidak | ya |
| Ultralight EV1 128 B | 128 | 120 | tidak | tidak | ya |
| NTAG213, kondisi pabrik | 144 | 131 | tidak, kurang 9 byte | tidak | ya |
| NTAG213, lock TLV dihapus | 144 | 136 | tidak, kurang 4 byte | tidak | ya |
| ST25TN01K | 160 | sekitar 147 | ya, pas-pasan | tidak | ya |
| NTAG215 | 496 dideklarasikan (504 pengguna) | 483 | ya | ya, sebagian besar | ya |
| NTAG216 | 872 dideklarasikan (888 pengguna) | 859 | ya | ya | ya |
| ICODE SLIX | 112 (termasuk CC) | 100 | tidak | tidak | ya |
| ICODE SLIX2 | 316 | sekitar 300 | ya | biasanya | ya |
| NTAG 424 DNA | file NDEF 256 byte | 249 | ya | yang kecil | ya |
| DESFire EV3 2K | file NDEF hingga 2048 byte | hingga 2038 | ya | ya | ya |

</div>

Ada dua catatan kaki yang sering menjebak. Capability container bawaan NXP di NTAG215 dan NTAG216 mendeklarasikan 496 dan 872 byte, lebih kecil dari memori penggunanya, sehingga `getMaxSize()` di Android melaporkan angka yang lebih kecil, dan angka itu benar. Lalu vCard berisi nama, telepon, email, dan URL berukuran 132 byte sebelum amplop dan 148 byte setelahnya. Itulah sebabnya vCard itu tidak cukup muat di NTAG213 dan kenapa penjual kartu nama memakai NTAG215 atau NTAG216 sebagai standar. Angka bulat yang saya pakai di panduan pemula (sekitar 130, 480, dan 850 karakter) adalah angka-angka ini yang dibulatkan.

---

## Peta memori: isi chip dan letaknya

Kalau Anda pernah membuat dump sebuah tag di NFC.cool lalu menatap deretan hex-nya, inilah kunci untuk membacanya.

### Type 2: peta halaman NTAG213

| Halaman | Byte | Isi |
| --- | --- | --- |
| 00 | 4 | byte UID 0 sampai 2 dan satu byte pemeriksa |
| 01 | 4 | byte UID 3 sampai 6 |
| 02 | 4 | byte pemeriksa, satu byte internal, dua byte lock statis untuk halaman 3 sampai 15 |
| 03 | 4 | capability container: E1 10 12 00 (magic, versi 1.0, 18 x 8 = 144 byte, baca dan tulis diizinkan) |
| 04 sampai 27 | 144 | memori pengguna, tempat TLV berada |
| 28 | 4 | byte lock dinamis untuk halaman 16 ke atas |
| 29 | 4 | CFG0: konfigurasi mirror, halaman tempat mirror ditulis, dan AUTH0, halaman pertama yang dilindungi kata sandi |
| 2A | 4 | CFG1: byte ACCESS dengan bit perlindungan baca-atau-tulis dan AUTHLIM, batas percobaan gagal |
| 2B | 4 | PWD, kata sandinya, hanya bisa ditulis |
| 2C | 4 | PACK, konfirmasi dua byte, plus dua byte cadangan |

NTAG215 punya bentuk yang sama dengan memori pengguna sampai halaman 81 dan konfigurasi di 83 sampai 86; NTAG216 sampai E1 dengan konfigurasi di E3 sampai E6. Bit capability container bersifat satu arah: begitu flag baca-saja di byte 3 diset, atau sebuah lock bit diset, ia tidak bisa dihapus lagi, dan itulah yang sebenarnya ditulis oleh "kunci permanen" di aplikasi. "Format" pada Type 2 menulis NDEF TLV kosong (03 00 FE) ke halaman 4; memori tidak dinolkan, jadi data lama masih bisa di-dump sampai tertimpa.

### Type 4: sistem file NTAG 424 DNA

Di sini tidak ada halaman. Sebuah aplikasi ISO 7816 bernama D2760000850101 berisi tiga file: capability container 32 byte (E103), file NDEF 256 byte (E104), dan file proprietary 128 byte (E105). Setiap file punya hak akses baca, tulis, dan ubah sendiri, masing-masing dipetakan ke salah satu dari lima kunci AES. DESFire bekerja dengan cara yang sama tetapi membiarkan Anda membuat aplikasi dan file sendiri; tiga file di NTAG 424 DNA sudah tetap, itulah sebabnya saya menyebutnya [brankas kecil terkunci dengan tiga laci](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/).

### Type 5: blok ISO 15693

Blok empat byte, dinomori mulai dari nol, dengan capability container di blok 0 (E1 40 diikuti ukurannya) dan NDEF TLV mulai di blok 1. UID, AFI, DSFID, dan status lock berada di luar blok yang bisa dialamatkan dan dibaca dengan perintah terpisah, GET SYSTEM INFORMATION. Di ICODE SLIX2, blok terakhir yang bisa dialamatkan, 79, adalah penghitung 16 bit; di ICODE 3, blok 75 menyimpan penghitung 24 bit dan blok 76 ke atas adalah area konfigurasi terpisah.

### MIFARE Classic: sektor, trailer, dan direktori

Classic 1K punya 16 sektor berisi masing-masing 4 blok berukuran 16 byte. Blok terakhir setiap sektor adalah **sector trailer**: kunci A, tiga byte akses, satu byte bebas, kunci B. Blok 0 di sektor 0 adalah blok produsen yang berisi UID. Untuk menaruh NDEF di Classic, NXP mendefinisikan sebuah direktori: sektor 0 menjadi **MIFARE Application Directory** (MAD), yang bisa dibaca dengan kunci publik A0 A1 A2 A3 A4 A5, dan isinya mendaftar sektor mana yang menyimpan NDEF dengan kode aplikasi 03 E1. Sektor-sektor itu memakai kunci publik kedua, D3 F7 D3 F7 D3 F7. Kartu yang baru keluar pabrik punya semua kunci bernilai FF FF FF FF FF FF. Saat NFC.cool di Android memformat kartu Classic, direktori dan kunci-kunci inilah yang ditulisnya, dan inilah alasan kartu Classic yang sudah diformat terbaca di sebagian ponsel Android dan tidak terbaca di iPhone mana pun.

---

## Tabel keputusan

Mulailah dari sini kalau Anda sudah tahu pekerjaannya dan mencari chipnya.

| Pekerjaan | Chip | Alasan | Dukungan NFC.cool |
| --- | --- | --- | --- |
| tautan, jaringan Wi-Fi, pemicu Shortcut, stiker yang ditempel di suatu benda | NTAG213 | 131 karakter URL, kata sandi, penghitung, delapan sen | penuh di iPhone, Android, iPad, dan Mac |
| kartu kontak, tautan yang lebih panjang, apa pun yang perlu ruang untuk berkembang | NTAG216 | 859 karakter, fitur yang sama, chip yang saya pakai untuk pengujian | penuh |
| Amiibo | NTAG215 | konsol memeriksa persis chip ini dan 504 byte-nya | backup dan restore di kedua platform |
| menghitung ketukan di poster, kartu nama, unit demo | NTAG213, 215, atau 216 | penghitung baca di perangkat keras dan mirror ASCII, dan ketiga chip ini yang didukung Tap Counter di aplikasi | [Tap Counter](/blog/count-nfc-tag-scans/) di kedua platform |
| antena mungil, cincin, barang murah sekali pakai | NTAG 210µ atau Ultralight EV1 48 B | 48 byte, 17 pF untuk kumparan kecil, tanpa kata sandi | baca dan tulis |
| membuktikan produk asli, sekali ketuk, tanpa aplikasi | NTAG 424 DNA | setiap ketukan menandatangani dirinya dengan AES-128; salinan tidak bisa | konfigurasi penuh, termasuk pemeriksaan tanda tangan |
| sama, tetapi berupa stiker Type 2 yang murah | NTAG 223 DNA | SUN di chip Type 2, 144 byte | tampil sebagai tag Type 2; pengaturan SUN belum didukung |
| segel yang melaporkan kapan ia dibuka | NTAG 213 TT, NTAG 424 DNA TT, ST25TV02KC-T | kawat anti-rusak, diingat secara permanen | 424 TT sepenuhnya; yang lain terbaca sebagai chip dasarnya |
| inventaris atau perpustakaan dalam jarak satu lengan dengan pembaca gerbang | ICODE SLIX2 atau ICODE 3 | ISO 15693 terbaca dari 1 sampai 1,5 meter dengan pembaca yang layak, dan tetap bisa diketuk dengan ponsel | baca, tulis, format di kedua platform |
| gulungan filamen printer 3D yang harus dibaca printernya sendiri | ICODE SLIX2 | standar [OpenPrintTag](/blog/openprinttag-read-write-nfc-spools-phone/) mengharapkan NFC-V | baca dan tulis |
| pintu, pintu putar, sistem transit | DESFire EV3 atau MIFARE Plus EV2 | AES, manajemen kunci yang sungguhan, keamanan bersertifikat | mengidentifikasi dan membuat dump bagian yang publik; tanpa operasi kunci |
| sensor tanpa baterai yang berbicara dengan mikrokontroler | NTAG I2C plus, ST25DV, NTAG 5 | antarmuka I2C dan energy harvesting di satu die | terbaca lewat sisi NFC-nya |
| apa pun di dunia transit atau uang elektronik Jepang | FeliCa | itulah bahasa pembaca-pembacanya | baca; tulis NDEF di Lite-S dan Standard di iPhone |
| tag di permukaan logam | chip mana pun di atas dalam bentuk on-metal | lapisan ferit, bukan chipnya, yang membuatnya berfungsi | sesuai chipnya |
| di bawah kulit | NTAG216 (xNT), NTAG I2C (xSIID), DESFire (xDF) | antena kaca kecil butuh titik paling pas di ponsel | sesuai chipnya |

Yang tidak ada di tabel: MIFARE Classic. Tidak ada satu pun pekerjaan di 2026 yang membuat saya mau membeli chip Classic, dan bagian di bawah menjelaskan alasannya.

---

## Keluarga demi keluarga

Setiap keluarga mendapat perlakuan yang sama: tabel spesifikasi dari datasheet, kegunaan chipnya, apa yang dilakukan ponsel dengannya, dan catatan pengalaman langsung kalau saya punya.

### NTAG 21x: keluarga stiker

Inilah chip di hampir setiap stiker, koin, dan kartu NFC yang dijual ke konsumen, dan NXP masih mencantumkan semuanya sebagai aktif di 2026 meskipun datasheet-nya tidak berubah sejak 2015.

<div class="table-scroll">

| Chip | Byte pengguna / total | Kata sandi | Penghitung | Mirror | Tanda tangan | Ketahanan / retensi | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 210µ | 48 / 64 | tidak | tidak | tidak | ya, bisa diprogram ulang | 100k / 10 tahun | aktif |
| NTAG210 | 48 / 80 | 32 bit + PACK, AUTHLIM | tidak | UID | ya | 100k / 10 tahun | aktif |
| NTAG212 | 128 / 164 | ya | tidak | UID | ya | 100k / 10 tahun | aktif |
| NTAG213 | 144 / 180 | ya | penghitung baca 24 bit | UID dan penghitung | ya | 100k / 10 tahun | aktif |
| NTAG215 | 504 / 540 | ya | ya | ya | ya | 100k / 10 tahun | aktif |
| NTAG216 | 888 / 924 | ya | ya | ya | ya | 100k / 10 tahun | aktif |
| NTAG213F, NTAG216F | 144 atau 888 | ya | ya | ya | ya | 100k / 10 tahun | aktif; menambahkan pin deteksi medan dan mode tidur untuk ditanam di perangkat elektronik |
| NTAG 213 TT | 144 / 184 | ya | ya | UID, penghitung, dan status anti-rusak | ya | 100k / 10 tahun | aktif; menambahkan kawat anti-rusak |
| NTAG203 | 144 / 168 | tidak, area OTP 32 bit | penghitung tulis 16 bit | tidak | tidak | 10k / 5 tahun | sudah tidak diproduksi, digantikan NTAG213 |

</div>

Semuanya NFC Forum Type 2, ISO/IEC 14443 Type A, UID 7 byte, 106 kbit/s, dengan rating -25 sampai +70 °C. NTAG210 dan NTAG212 punya kapasitansi input 17 pF untuk antena kecil; 213, 215, dan 216 punya 50 pF. Tanda tangan keasliannya adalah ECDSA pada kurva secp128r1, 32 byte, dibaca dengan perintah READ_SIG; kunci verifikasinya ada di catatan aplikasi NXP yang tidak publik, itulah sebabnya hampir tidak ada aplikasi konsumen yang memeriksanya.

Tiga fitur yang penting dalam praktik adalah **kata sandi** (PWD 32 bit, PACK 16 bit yang dijawab tag, AUTH0 untuk menentukan dari mana perlindungan dimulai, dan AUTHLIM untuk mematikan tag secara permanen setelah sejumlah tebakan salah yang Anda tentukan), **penghitung NFC** (24 bit, bertambah satu setiap sesi baca, bisa dibaca dengan perintah khusus), dan **mirror ASCII**, yang menempelkan UID dan penghitung sebagai teks ke dalam pesan NDEF Anda sehingga URL biasa menjadi `https://example.com/?u=04A1...&c=000123` di setiap ketukan. Kepala sikat Philips Sonicare yang pernah saya tulis memakai NTAG213 dengan AUTHLIM diset ke tiga, dan begitulah [kepala sikat mengunci dirinya sendiri](/blog/reset-sonicare-brush-head-nfc/) kalau Anda salah menebak.

> **Pengalaman langsung:** inilah chip yang saya pakai untuk menguji setiap rilis, dan NTAG216 adalah yang saya rekomendasikan kalau seseorang ingin membeli satu paket lalu berhenti memikirkannya. Kata sandi layak diset pada apa pun yang Anda tinggalkan di tempat umum; itu menghentikan orang dengan aplikasi gratisan, dan itu sudah mencakup kebanyakan orang. Kata sandi itu tidak menghentikan siapa pun yang punya alat penyadap, karena kata sandinya sendiri melintas di udara tanpa enkripsi, dan saya mengatakannya terus terang di aplikasi.

Di ponsel: baca dan tulis NDEF di semua perangkat, pembacaan latar belakang rekaman URL di iPhone, dan akses mentah di kedua platform untuk kata sandi, penghitung, dan mirror. NFC.cool melakukan semua itu di iPhone, Android, dan lewat pembaca USB di iPad dan Mac.

### NTAG DNA: chip yang menandatangani setiap ketukan

Tiga generasi, dua di antaranya masih diproduksi.

<div class="table-scroll">

| Chip | Tipe Forum | Byte pengguna | Kunci | SUN | Tanda tangan | Ketahanan / retensi | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 413 DNA | Type 4 | 160 (32 CC + 128 NDEF) | 3 AES-128 | ya, penghitung 24 bit | ECC | 200k / 50 tahun | tidak diproduksi lagi |
| NTAG 424 DNA | Type 4 | 416 (32 + 256 + 128) | 5 AES-128, opsi LRP, opsi Random ID | ya, dengan opsi UID terenkripsi | ECDSA secp224r1, 56 byte, plus kunci keaslian AES | 200k / 50 tahun | aktif; Common Criteria EAL4 |
| NTAG 424 DNA TT | Type 4 | 416 | 5 AES-128 | ya, plus status anti-rusak di dalam pesan | sama | 200k / 50 tahun | aktif |
| NTAG 223 DNA | Type 2 | 144 / 240 | satu kunci SUN 16 byte plus kata sandi 32 bit | ya, penghitung 24 bit | ECDSA secp192r1, 48 byte | 100k / 10 tahun | aktif sejak Februari 2022 |
| NTAG 224 DNA | Type 2 | 208 / 304 | autentikasi dua arah AES-128 menggantikan kata sandi | ya | sama | 100k / 10 tahun | aktif |
| NTAG 223 dan 224 DNA StatusDetect | Type 2 | seperti di atas | seperti di atas | ya, dengan status sensor di dalam pesan | sama | 100k / 10 tahun | aktif |

</div>

**SUN**, Secure Unique NFC, adalah fitur yang membuat chip ini layak dihargai tiga kali lipat NTAG213: tag menyalin UID dan penghitung bacanya ke dalam URL dan menambahkan CMAC AES-128 atas keduanya, yang dihitung ulang di setiap ketukan. Server memeriksa MAC tersebut; tag hasil kloning tidak punya kuncinya dan gagal. Saya sudah membahas semuanya, termasuk mode LRP dan kelima kuncinya, di [artikel NTAG 424 DNA](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/), jadi di sini hanya yang berubah sejak itu: NXP kini juga menjual NTAG 426Q DNA dan NTAG X DNA, chip Type 4 terhubung berkapasitas 16 kB yang bersertifikat EAL6+, jadi 424 bukan lagi chip DNA terbaru, hanya yang memang bisa Anda beli dalam bentuk stiker.

Keluarga 22x DNA adalah pendatang baru yang menarik: SUN di chip Type 2, yang berarti stikernya lebih murah dan ponsel membacanya sebagai NTAG biasa. Varian **StatusDetect** menambahkan sensor: entah loop konduktif yang mencatat secara permanen bahwa ia pernah diputus, atau pengukuran kapasitansi dari 0 sampai 11 pF di antara dua pin, yang ditawarkan NXP untuk ketinggian cairan, kelembapan, dan tekanan.

> **Pengalaman langsung:** saya membeli tag NTAG 424 DNA pertama saya di AliExpress seharga beberapa euro dan membangun seluruh fitur 424 di aplikasi berdasarkan tag-tag itu: penggantian kunci, SUN dalam mode polos dan terenkripsi, hak akses file, file vault, status anti-rusak. 424 juga satu-satunya chip yang tanda tangan keasliannya diverifikasi NFC.cool terhadap kunci publik yang dipublikasikan NXP, lalu ditampilkan sebagai "Genuine NXP". Untuk 22x DNA, saya baru mengenalnya di atas kertas.

### MIFARE Ultralight: keluarga tiket

Ultralight adalah kakak dari NTAG. Antarmuka udaranya sama, halaman 4 byte-nya sama, SAK-nya sama, dan mulai dari EV1 perintahnya pun sama. Bedanya ada pada tujuannya: Ultralight dibuat untuk tiket sekali jalan dan lini NTAG untuk stiker berisi URL, itulah sebabnya NTAG dikirim dengan capability container yang sudah tertulis sementara Ultralight tidak.

<div class="table-scroll">

| Chip | Byte pengguna / total | Perlindungan | Penghitung | Tanda tangan | Ketahanan / retensi | Status |
| --- | --- | --- | --- | --- | --- | --- |
| MIFARE Ultralight (MF0ICU1) | 48 / 64 | lock bit dan area OTP 32 bit | tidak | tidak | 10k / 5 tahun | tidak diproduksi lagi |
| Ultralight C | 144 / 192 | autentikasi dua arah triple DES, kunci 16 byte | 16 bit satu arah | tidak | 100k / 10 tahun | tidak direkomendasikan untuk desain baru, digantikan Ultralight AES |
| Ultralight EV1 | 48 / 80 atau 128 / 164 | kata sandi 32 bit, AUTHLIM | tiga penghitung satu arah 24 bit yang independen | ya, 32 byte | 100k / 10 tahun | aktif |
| Ultralight AES | 144 / 240 | autentikasi dua arah AES-128, pesan dengan CMAC, opsi Random ID | tiga penghitung 24 bit | ya, plus kunci keaslian AES | 100k / 10 tahun | aktif sejak Februari 2022, Common Criteria EAL3+ |
| Ultralight Nano | 40 / 56 | lock bit dan OTP | tidak | ya | 100k / 10 tahun | hilang dari katalog NXP tanpa pemberitahuan yang bisa saya temukan |

</div>

Tiga penghitung satu arah di Ultralight EV1 adalah ciri khasnya: operator transit menurunkan hitungan dan chip menolak untuk naik lagi. Ultralight AES adalah jawaban diam-diam untuk "saya ingin NTAG213 dengan autentikasi sungguhan": 144 byte yang sama, AES-128 sebagai pengganti kata sandi, di tag Type 2 yang bisa dibaca ponsel mana pun.

Di ponsel: semua chip di sini terbaca sebagai tag Type 2. Core NFC milik Apple menyediakan keluarga `.ultralight` dan mengizinkan aplikasi mengirim perintah native; Android punya kelas `MifareUltralight` yang sifatnya opsional tetapi ada di setiap ponsel yang pernah saya lihat. NFC.cool menamai varian EV1 dan AES dari GET_VERSION dan memperlakukan kata sandi di EV1 seperti di NTAG; autentikasi AES-nya sendiri bukan sesuatu yang dilakukan aplikasi ini.

### MIFARE Classic, Plus, dan DESFire: keluarga kontrol akses

Tiga keluarga dalam satu bagian karena ceritanya satu: Classic berhasil dibobol, Plus adalah jalur migrasinya, dan DESFire adalah tempat industri akhirnya berlabuh.

**MIFARE Classic** adalah chip di kunci hotel lama Anda, kartu gym Anda, dan banyak sekali kartu akses kantor. Ia bukan tipe tag NFC Forum. Ia punya cipher sendiri, CRYPTO1, yang direkayasa balik oleh dua kelompok peneliti pada 2008: Nohl dan Plötz dengan mengamati silikonnya di bawah mikroskop, dan kelompok dari Radboud University dengan mengamati protokolnya, yang berhasil memulihkan sebuah kunci "hanya dari satu atau dua upaya autentikasi dengan pembaca asli dalam waktu kurang dari satu detik". NXP menempuh jalur pengadilan untuk menghentikan publikasi makalah kedua dan kalah. Enam belas tahun kemudian, pada Agustus 2024, Quarkslab memublikasikan backdoor perangkat keras di Fudan FM11RF08S, chip yang kompatibel dengan Classic dan paling umum dalam lima tahun terakhir, dan menemukan kunci backdoor yang lebih tua yang dipakai bersama oleh chip Fudan sebelumnya, sebagian chip Infineon, dan bahkan sebagian chip NXP dari sekitar tahun 2000. Classic bukan produk keamanan, dan halaman produk NXP sendiri untuk Classic EV1 kini menulis "not recommended for new designs" serta mengarahkan ke DESFire Light.

<div class="table-scroll">

| Chip | Byte pengguna / total | UID | Perlindungan | Ketahanan / retensi | Status |
| --- | --- | --- | --- | --- | --- |
| Classic Mini | 224 / 320 | 4 byte | CRYPTO1 | 100k / 10 tahun | dihentikan |
| Classic 1K | 752 / 1024 | NUID 4 byte | CRYPTO1 | 100k / 10 tahun | dihentikan; EV1 tidak direkomendasikan untuk desain baru |
| Classic 4K | 3440 / 4096 | NUID 4 byte | CRYPTO1 | 100k / 10 tahun | dihentikan; EV1 tidak direkomendasikan |
| Classic EV1 1K dan 4K | seperti di atas | 7 byte atau 4 byte, opsi ID acak | CRYPTO1; pemeriksaan keaslian hanya di 1K | minimal 100k / 10 tahun | tidak direkomendasikan untuk desain baru |

</div>

Jawaban lugas untuk iPhone, karena pertanyaan ini datang setiap minggu: **iPhone tidak bisa membaca isi kartu MIFARE Classic, dan tidak ada aplikasi yang bisa mengubah itu.** Core NFC milik Apple tidak punya keluarga Classic di API-nya, dan dokumentasi untuk perintah MIFARE-nya terang-terangan menyebut bahwa ia "doesn't support the Crypto1 protocol". Ponsel melihat UID dan SAK, aplikasi saya menamai keluarganya dari situ, dan selesai sampai di situ. Android berbeda: kelas `MifareClassic` bersifat opsional, diimplementasikan oleh ponsel yang pengendali NFC-nya punya CRYPTO1 di perangkat keras (pengendali NXP punya; chip Broadcom di satu generasi ponsel Nexus dan Galaxy tidak), dan di ponsel-ponsel itu NFC.cool membaca setiap sektor yang bisa dibuka dengan kunci pabrik dan bisa memformat kartu baru untuk NDEF.

**MIFARE Plus** adalah peta memori Classic yang ditambahi AES-128, sehingga operator bisa mengganti kartu lebih dulu dan pembacanya belakangan. Chip ini berjalan dalam beberapa security level: SL1 berperilaku seperti Classic (dengan AES opsional), SL3 hanya AES lewat ISO-DEP, dan Plus X dulu punya SL2 di antaranya. Plus S dan Plus X sudah dihentikan; Plus SE (1K, 752 byte) dan Plus EV2 (2K atau 4K, EAL5+, retensi 25 tahun, ketahanan tipikal 1.000.000 siklus) masih diproduksi. Di SL1 ponsel melihat SAK 08 atau 18, sama seperti Classic; di SL3 ponsel melihat kartu ISO-DEP.

**MIFARE DESFire** adalah makhluk yang berbeda: sistem file kecil dengan aplikasi, file, hak akses per file, dan hingga 14 kunci per aplikasi, yang berbicara dengan APDU lewat ISO-DEP hingga 848 kbit/s.

<div class="table-scroll">

| Chip | Memori yang bisa dipakai | Kripto | Tambahan | Ketahanan / retensi | Status |
| --- | --- | --- | --- | --- | --- |
| DESFire D40 | 4 kB | DES, triple DES | | 100k / 10 tahun | dihentikan bertahap pada 2011; kuncinya berhasil dipulihkan lewat analisis daya di tahun yang sama |
| DESFire EV1 | 2304, 4864, atau 7936 byte | DES, 3DES, AES-128 | mampu NFC Forum Type 4, ID acak | minimal 200k / 10 tahun | tidak direkomendasikan untuk desain baru |
| DESFire EV2 | 2560, 5120, 8192, atau 16384 byte | AES-128, EAL5+ | transaction MAC, proximity check, tanda tangan keaslian | 200k / 25 tahun | tidak direkomendasikan untuk desain baru |
| DESFire EV3 | 2560, 5120, 8192, atau 16384 byte | AES-128, EAL5+ | semua yang ada di EV2 plus SUN/SDM dan timer transaksi; sertifikat NFC Forum Type 4 nomor 58652 | minimal 200k, tipikal 1M / 25 tahun, -25 sampai +85 °C | aktif |
| DESFire Light | 640 byte | hanya AES-128, opsi LRP, EAL4 | satu aplikasi tetap dengan enam file | 200k / 10 tahun | aktif |

</div>

"2K" di nama DESFire bukan berarti 2048 byte yang bisa langsung Anda pakai. Catatan perbandingan dari NXP memberikan angka yang bisa dipakai seperti di tabel, dan setiap aplikasi serta file yang Anda buat mengambil sebagian untuk header-nya sendiri, dialokasikan per halaman 256 byte. Tanyakan langsung ke kartunya dengan perintah FreeMemory alih-alih memercayai labelnya. DESFire EV3 juga membawa SUN ke keluarga ini, jadi EV3 bisa melakukan trik NTAG 424 DNA, yaitu menandatangani URL, yang tidak bisa dilakukan EV2.

Di ponsel: iOS menyajikan DESFire sebagai tag MIFARE `.desfire`, atau sebagai tag ISO 7816 jika aplikasi meminta aplikasi NDEF; Android memakai `IsoDep`. NFC.cool mengidentifikasi generasi dan ukurannya dari GetVersion dan mendaftar aplikasi dan file yang boleh dilihatnya tanpa kunci. Aplikasi ini tidak melakukan autentikasi ke DESFire dan tidak menulis ke sana; itu pekerjaan perangkat lunak milik operator sendiri, dan saya lebih suka mengatakannya terus terang daripada berpura-pura.

### ISO 15693: keluarga jarak jauh

Inilah chip yang dirancang untuk jarak satu meter, bukan satu sentimeter. Ponsel tetap bisa membacanya (Apple sejak iOS 13, Android lewat `NfcV`), dan GoToTags mengukur tag Type 5 terbaca dari jarak kira-kira dua kali tag Type 2 di iPhone, tetapi rumah aslinya adalah gerbang perpustakaan, rak gudang, dan binatu. UID-nya 8 byte yang diawali E0, bloknya 4 byte, dan keluarga ini menambahkan tiga hal yang tidak dimiliki chip Type A: **AFI** (byte keluarga aplikasi yang bisa dipakai pembaca untuk menyaring), **DSFID** (byte format data), dan **EAS**, bit electronic article surveillance yang membuat gerbang toko berbunyi.

**NXP ICODE.** Garis keturunannya: SLI (2000), SLI-S dan SLI-L (2007), SLIX beserta varian S dan L-nya (2010), SLIX2 (2014), ICODE DNA (2016), dan ICODE 3 (2024). Tidak ada "SLIX3"; deskripsi produk yang menyebutnya entah maksudnya ICODE 3 atau sekadar menebak.

<div class="table-scroll">

| Chip | Byte pengguna / total | Perlindungan | Penghitung | Tanda tangan | Ketahanan / retensi | Status |
| --- | --- | --- | --- | --- | --- | --- |
| ICODE SLI | 112 / 128 | hanya lock bit | tidak | tidak | 100k / 10 tahun | sudah tidak diproduksi |
| ICODE SLI-S | 160 / 256 | lima kata sandi 32 bit: baca, tulis, hancurkan, privasi, EAS | tidak | tidak | 100k / 10 tahun | tidak diproduksi lagi |
| ICODE SLI-L | 32 / 64 | tiga kata sandi | tidak | tidak | 100k / 10 tahun | tidak diproduksi lagi |
| ICODE SLIX | 112 / 128 | satu kata sandi 32 bit untuk EAS dan AFI | tidak | tidak | 100k / 50 tahun | tidak direkomendasikan untuk desain baru |
| ICODE SLIX-S | 160 / 256 | lima kata sandi 32 bit, mode privasi, hancurkan | tidak | tidak | 100k / 50 tahun | aktif |
| ICODE SLIX-L | 32 / 64 | tiga kata sandi | tidak | tidak | 100k / 50 tahun | aktif |
| ICODE SLIX2 | 316 / 320 | lima kata sandi 32 bit, mode privasi, hancurkan | 16 bit, dinaikkan lewat perintah tulis | ya, 32 byte | 100k / 50 tahun | aktif |
| ICODE DNA | 252 / 256 | autentikasi dua arah AES-128, tiga kunci | 16 bit | ya, bisa diprogram ulang | 100k / 50 tahun | aktif |
| ICODE 3 | 300 / 304 plus area konfigurasi 192 byte | enam kata sandi 32 bit, dua mode privasi | 24 bit, bisa menghitung ketukan seperti NTAG | ya, 32 atau 48 byte, bisa diprogram ulang | 100k / 50 tahun, hingga 105 °C | aktif; tersedia varian TagTamper |

</div>

ICODE 3 adalah yang perlu Anda kenal: ia menyalin UID dan penghitung ketukannya ke dalam pesan NDEF seperti NTAG213, terbaca hingga 212 kbit/s, dan menyetel antenanya sendiri. Ia tidak punya AES; ICODE DNA-lah yang punya AES, dan tidak satu pun dari keduanya mendukung SUN.

**STMicroelectronics ST25TV dan ST25DV.** Lini Type 5 milik ST, dan lini dengan angka datasheet terbaik di seluruh panduan ini.

<div class="table-scroll">

| Chip | Byte pengguna | Perlindungan | Penghitung | Tanda tangan | Ketahanan / retensi | Status |
| --- | --- | --- | --- | --- | --- | --- |
| ST25TV512, ST25TV02K | 64 atau 256 | kata sandi 32 atau 64 bit, kill, mode tak terlacak, anti-rusak pada varian -AD | penghitung event tulis 16 bit | TruST25 | 100k / 60 tahun | tidak direkomendasikan untuk desain baru |
| ST25TV512C, ST25TV02KC | 64 atau 320 | kata sandi, kill, mode silent dan discreet, anti-rusak pada varian -T | tidak ada; sebagai gantinya kode ketukan unik 3 digit | TruST25 | 100k / 60 tahun | aktif, tersedia sampai 2035 |
| ST25TV04K-P | 512 | kata sandi 64 bit, kill | tidak | tidak | 1M / 40 tahun | aktif; punya pin energy harvesting |
| ST25TV16K, ST25TV64K, dan versi KC | 2048 atau 8192 | kata sandi 64 bit, kill | tidak | tidak | 1M / 40 tahun | komponen K tidak direkomendasikan, komponen KC aktif |
| ST25DV04K, 16K, 64K, dan versi KC | 512, 2048, atau 8192 | tiga kata sandi RF 64 bit plus kata sandi I2C | tidak | tidak | 1M / 40 tahun | komponen K tidak direkomendasikan, komponen KC aktif |
| M24LR04E, 16E, 64E | 512, 2048, atau 8192 | kata sandi 32 bit | tidak | tidak | 1M / 40 tahun | tidak direkomendasikan untuk desain baru |

</div>

**Augmented NDEF** di ST25TV02KC layak mendapat satu paragraf karena fitur ini dijual sebagai keamanan. Chip menyisipkan UID-nya, satu bidang kustom, dan **kode ketukan unik** tiga karakter ke dalam URL di setiap pembacaan, tanpa menyentuh EEPROM. Kode ketukan berubah di setiap ketukan, dan datasheet ST secara gamblang menyebutnya "predictable". Itu adalah token kebaruan yang memberi tahu server Anda bahwa ini ketukan baru, bukan bukti bahwa tagnya asli. TruST25, tanda tangan keaslian ST atas UID, adalah fitur keasliannya, dan seperti milik NXP, itu tanda tangan statis yang bisa disalin oleh tiruan.

**Sisa dunia Type 5.** Inlay Tag-it HF-I dari Texas Instruments (Standard 32 byte, Pro 32 byte dengan penulisan yang dilindungi kata sandi dan perintah kill, Plus 256 byte) ada di setiap perpustakaan yang memasang NFC sebelum 2015, dan semuanya kini ditandai tidak direkomendasikan atau usang. EM4233 dari EM Microelectronic (208 byte, mode privasi dengan kunci 96 bit, retensi 60 tahun) tersedia atas permintaan. my-d dari Infineon dan MB89R118 dari Fujitsu muncul di kode identifikasi NFC.cool karena pengguna mengirimkannya. NTAG 5 dari NXP (link, boost, switch) adalah chip ISO 15693 meskipun bernama NTAG, dengan 2048 atau 512 byte, port I2C, energy harvesting hingga 30 mW, dan EEPROM 1.000.000 siklus dengan retensi 40 tahun: tag terhubung untuk perangkat elektronik, bukan stiker, dan perangkat lunak yang ditulis untuk NTAG21x tidak akan bisa berbicara dengannya.

> **Pengalaman langsung:** SLIX2 adalah chip di dalam setiap gulungan filamen OpenPrintTag, jadi saya sudah memegang cukup banyak, dan NFC.cool membaca, menulis, dan memformatnya di kedua platform. Yang tidak dilakukan aplikasi ini, dan saya ingin jelas soal itu, adalah perintah kata sandi, privasi, EAS, dan AFI dari ISO 15693. Byte perintahnya ada di kode sebagai tabel referensi; tombolnya belum ada.

### Type 4 di luar MIFARE: ST25TA

Keluarga ST25TA dari ST adalah tag Type 4 di ISO/IEC 14443 Type A tanpa mesin DESFire sama sekali: satu file NDEF, satu file capability container, dan satu file sistem, dua kata sandi 128 bit (baca dan tulis), dan penghitung event 20 bit yang bisa menghitung pembacaan atau penulisan.

<div class="table-scroll">

| Chip | File NDEF | Kata sandi | Penghitung | Tanda tangan | Ketahanan / retensi | Status |
| --- | --- | --- | --- | --- | --- | --- |
| ST25TA512, ST25TA512B | 64 byte | dua, 128 bit | 20 bit di varian B | TruST25 di varian B | 1M / 200 tahun | 512 tidak direkomendasikan |
| ST25TA02K, ST25TA02KB (-P, -D) | 256 byte | dua, 128 bit | 20 bit | TruST25 di varian B | 1M / 200 tahun | 02K dan 02KB tidak direkomendasikan; 02KB-P dan 02KB-D aktif |
| ST25TA16K, ST25TA64K | 2048 atau 8192 byte | dua, 128 bit | tidak | tidak | 1M / 200 tahun | aktif |

</div>

Retensi dua ratus tahun dan sejuta siklus tulis, hanya pada 106 kbit/s. Varian -P dan -D punya pin output serbaguna yang berganti status saat tag dibaca, dan begitulah cara membuat lampu bereaksi terhadap ponsel. Di kedua ponsel, chip ini terbaca sebagai tag Type 4; NFC.cool membaca dan menulis NDEF di sana dan menampilkan detail ISO-DEP-nya.

### Chip sensor dan antarmuka ganda

Inilah chip dengan dua wajah: antena NFC di satu sisi dan bus I2C, sensor, atau radio kedua di sisi lain.

| Chip | Sisi NFC | Sisi lainnya | Memori | Yang menonjol |
| --- | --- | --- | --- | --- |
| NTAG I2C plus (NT3H2111, NT3H2211) | Type 2, 888 atau 1912 byte, kata sandi 32 bit, tanda tangan | I2C hingga 400 kHz, SRAM pass-through 64 byte, pin deteksi medan | 200k sampai 500k / 20 tahun | energy harvesting hingga 15 mW; chip di dalam implan xSIID |
| ST25DV (lihat di atas) | Type 5 | I2C hingga 1 MHz, mailbox 256 byte untuk streaming | 1M / 40 tahun | energy harvesting di pin V_EH, tanpa regulasi, "some µW" menurut datasheet |
| NTAG 5 link, boost, switch | Type 5, 2048 atau 512 byte, AES di 5332 | I2C, GPIO, output PWM | 1M / 40 tahun | harvesting hingga 30 mW; varian switch sama sekali tidak butuh mikrokontroler |
| NHS3100 | Type 2, diemulasikan oleh firmware | Cortex-M0+ dengan sensor suhu berakurasi 0,3 °C | flash 32 kB, EEPROM 4 kB | pencatat rantai dingin di atas lembaran foil, bersertifikat NFC Forum |
| EM4423 "em echo" | Type 2, area NDEF 240 byte | UHF RAIN RFID, memori sama, nomor seri sama | 100k / 10 tahun | dihentikan |
| EM4425 "em echo-V" | Type 5, hingga 256 byte bersama | UHF RAIN RFID, AES-128, pad anti-rusak, tanda tangan digital | 100k / 50 tahun | masih diproduksi; satu die yang bisa dibaca ponsel dari jarak satu sentimeter dan oleh pembaca UHF di pintu gudang dari jarak beberapa meter |

Saya belum pernah membangun apa pun dengan chip-chip ini, jadi tabel ini murni dari datasheet. Chip-chip ini penting bagi panduan ini karena muncul di deskripsi produk sebagai "chip NFC" dan membingungkan orang: NTAG 5 bukan NTAG213, dan tag em echo tidak akan melakukan sesuatu yang istimewa di ponsel Anda.

### Lawas dan khusus

**Topaz** (Innovision, belakangan Broadcom) adalah NFC Forum Type 1: blok 8 byte, 96 atau 512 byte, kunci satu kali, 10.000 siklus tulis. Kedua ponsel masih membaca NDEF dari Topaz, tetapi NFC Forum menghapus Type 1 dari set spesifikasinya tahun 2021 dan tidak ada lagi yang memakainya di desain baru. Para penjual ulang masih punya stok.

**FeliCa** adalah keluarga milik Sony dan tulang punggung transportasi umum Jepang. FeliCa Lite-S (224 byte memori pengguna dalam blok 16 byte, IDm 8 byte, MAC triple DES yang disederhanakan) adalah versi tag-nya dan NFC Forum Type 3; FeliCa Standard adalah versi kartu pintarnya, kini dengan AES dan rating Common Criteria EAL6+ pada RC-SA01 yang terbaru, dan di atasnya berjalan Suica, PASMO, Edy, WAON, nanaco, dan Octopus di Hong Kong. Modul FeliCa Plug dari Sony dihentikan pada Maret 2026. NFC.cool menamai merek transit dan uang elektronik dari system code di kedua platform, membaca Lite-S dan Standard, dan menulis NDEF ke keduanya di iPhone.

**Kovio NFC Barcode** adalah tag baca-saja 16 byte dari silikon cetak. Android masih punya kelas `NfcBarcode` untuknya. Aset Kovio berpindah ke Thinfilm pada 2014, Thinfilm menghentikan produksi NFC pada 2019 dan berganti nama pada 2021. Kelas itu tinggal fosil.

**Chip memori ISO 14443 Type B.** SRI512, SRT512, dan SRI4K dari ST (512 atau 4096 bit dalam blok 32 bit, dua penghitung mundur, 1.000.000 siklus, 40 tahun) dipakai di transit Prancis dan Belgia dan di sebagian tiket ski. Android menyediakannya lewat `NfcB`; iPhone sama sekali tidak punya objek tag Type B mentah, jadi kecuali kartu Type B itu berbicara ISO-DEP dan menjawab SELECT, iPhone tidak akan melihatnya. Calypso, sistem Navigo di Paris, adalah kartu pintar Type B yang melakukannya.

### Tiruan dan yang kompatibel

Para penjual tidak ingin Anda membaca bagian ini.

**Fudan FM11NT021** adalah "NTAG213" paling umum yang sebenarnya bukan NTAG213. Ia punya 180 byte yang sama dalam 45 halaman, area pengguna 144 byte yang sama, kata sandi, penghitung baca 24 bit, dan kode produsen Fudan 1D di UID-nya. Ia tidak mengimplementasikan GET_VERSION dan datasheet terbarunya tidak mencantumkan perintah READ_SIG, jadi pembaca yang menanyakan salah satunya hanya mendapat keheningan lalu terpaksa menebak dari ukuran memori, itulah sebabnya komunitas Proxmark3 melaporkannya sebagai NTAG203. Fudan juga membuat versi 504 dan 888 byte (FM11NT041, FM11NT081). Untuk tautan di stiker, chip ini berfungsi. Untuk Amiibo tidak, karena konsol menanyakan GET_VERSION lebih dulu.

**Fudan FM11RF08 dan FM11RF08S** adalah chip kompatibel Classic di sebagian besar kartu "1K" murah. 08S menambahkan penangkal terhadap serangan Classic yang sudah dikenal pada 2020, lalu ternyata membawa kunci backdoor perangkat keras yang sama di setiap kartu yang dibuat, yang dipublikasikan Quarkslab pada 2024 beserta perangkat lunak yang kini ada di firmware Proxmark3.

**Kartu magic MIFARE Classic** adalah chip yang dibuat agar UID dan blok produsennya bisa ditulis ulang, sesuatu yang tidak pernah diizinkan Classic asli. Generasinya sudah menjadi hobi tersendiri:

| Generasi | Cara mengubah UID | Bisa dideteksi | Catatan |
| --- | --- | --- | --- |
| Gen1a, Gen1b | perintah bangun backdoor | ya, pembaca mana pun bisa menguji keberadaan backdoor-nya | "kartu magic China" yang asli; sistem akses menyaringnya |
| Gen2, CUID | penulisan biasa ke blok 0 setelah autentikasi | tidak ada backdoor yang bisa diuji; pembaca harus mencoba menulis | kompatibel dengan ponsel, yang paling umum saat ini |
| FUID, UFUID | sekali, atau sampai disegel | sebelum disegel | kartu sekali pakai untuk mengklon kartu akses secara permanen |
| Gen3, APDU | perintah APDU khusus | pembaca yang tahu perintahnya | |
| Gen4 GTU, GDM, "Ultimate" | konfigurasi yang dilindungi kata sandi; juga bisa mengemulasikan Ultralight dan NTAG | hanya selama kata sandinya masih bawaan | bunglon berbentuk kartu dengan UID 7 byte yang bisa menjadi keluarga apa pun |

Kartu magic NTAG21x juga ada, dan yang mengemulasikan sepenuhnya bahkan mau menerima tanda tangan keaslian hasil salinan, dan itulah poin yang disampaikan NXP soal tanda tangan statis.

**"Kompatibel NTAG215" untuk Amiibo.** Amiibo adalah NTAG215 biasa yang 540 byte-nya membawa data yang dienkripsi dan ditandatangani dengan kunci yang diturunkan dari UID tag itu sendiri. Salin byte-nya ke tag lain dan tanda tangannya tidak cocok lagi, itulah sebabnya sebuah backup harus dikunci ulang ke UID tag tujuan, dan itulah yang dilakukan fitur [backup dan restore Amiibo](/blog/amiibo-iphone-android-read-collect-backup/) di NFC.cool. Urutan baca konsol dimulai dengan GET_VERSION, lalu autentikasi kata sandi yang diturunkan dari UID, lalu pembacaan seluruh 135 halaman termasuk halaman konfigurasi. Chip yang tidak punya GET_VERSION atau punya 45 halaman alih-alih 135 sudah gagal di langkah pertama. Dokumentasi TagMo merangkumnya dalam satu kalimat: hanya NTAG215 yang dikenali.

**Bagaimana tiruan terlihat di aplikasi.** NFC.cool mengidentifikasi lewat GET_VERSION lebih dulu. Chip yang tidak menjawabnya, atau menjawab dengan ukuran memori yang tidak cocok dengan yang diiklankan, dinamai sesuai wujud aslinya, bukan sesuai deskripsi produknya. Pada NTAG 424 DNA aplikasi melangkah lebih jauh dan memverifikasi tanda tangan keaslian ECDSA terhadap kunci publik NXP, dan itulah satu-satunya tempat di aplikasi yang bisa menyatakan "Genuine NXP" dengan dukungan kriptografis. Untuk NTAG21x, aplikasi tidak membaca tanda tangannya, sebagian karena kunci verifikasi NXP berada di bawah NDA dan sebagian lagi karena tanda tangan statis hasil salinan tetap akan lolos. Rantai bukti yang jujur untuk tag Type 2 adalah kode produsen, GET_VERSION, ukuran memori, dan ada tidaknya fitur yang diklaim chip tersebut.

---

## Bentuk fisik dan jangkauan baca

Chip menentukan apa yang bisa dilakukan tag; bentuk fisiknya menentukan apakah ponsel bisa menjangkaunya.

| Bentuk | Apa itu | Antena tipikal | Jangkauan baca ponsel | Rating dan catatan |
| --- | --- | --- | --- | --- |
| Wet inlay | antena hasil etsa dan chip di atas film PET dengan perekat dan lapisan pelindung | 22 sampai 38 mm | 2 sampai 4 cm | cara termurah untuk membeli chip; hanya bisa ditempel sekali |
| Dry inlay | sama, tanpa perekat | seperti di atas | seperti di atas | untuk dilaminasi ke dalam benda lain |
| Stiker kertas atau PET | inlay dengan permukaan yang bisa dicetak | 22 sampai 38 mm | 2 sampai 4 cm | permukaan kertas bisa dicetak, permukaan PET tahan air |
| Kartu PVC | ISO 7810 ID-1, 85,60 x 53,98 mm, tebal 0,76 mm | seluruh kartu | 3 sampai 5 cm | antena terbesar yang akan Anda pegang; juga acuan desain pembaca |
| Koin, token epoksi | inlay di bawah kubah resin keras, sering kali dengan lubang | 20 sampai 30 mm | 2 sampai 3 cm | tahan air; bentuk yang dipakai Amiibo |
| Gantungan kunci | inlay di dalam cangkang ABS | 20 sampai 30 mm | 2 sampai 3 cm | gantungan kunci GoToTags diberi rating IP67 dan -25 sampai +75 °C |
| Gelang | silikon dengan inlay | 20 sampai 25 mm | 1 sampai 3 cm | festival, kolam renang; gelangnya boleh menekuk, inlay-nya jangan |
| On-metal | inlay dengan lembaran ferit di antara antena dan logam | 22 sampai 34 mm | 2 sampai 3 cm di atas logam | Seritag mengukur 21 sampai 25 mm di atas logam dibanding 26 sampai 30 mm di luar logam untuk tag 22 mm yang sama; versi industri 34 mm terbaca di 31 sampai 40 mm dan berating IP68, -25 sampai +85 °C |
| Tag laundry | chip di dalam kancing PPS | 16 mm | 1 sampai 2 cm | Smartrac memberi rating tag laundry HF-nya untuk 200 siklus cuci, -30 sampai +200 °C, dan 60 bar; sebagian besar tag laundry adalah ISO 15693 yang hanya berisi UID |
| Implan | chip di dalam kapsul kaca 2 x 12 mm atau polimer fleksibel | beberapa milimeter | butuh titik yang benar-benar pas di ponsel | xNT adalah NTAG216, NExT menambahkan T5577 125 kHz, xSIID adalah NTAG I2C plus dengan LED, xDF adalah DESFire; versi fleksibel terbaca jauh lebih baik daripada versi kaca |

Dua aturan fisika menjelaskan sebagian besar keluhan "tidak terbaca". **Ukuran antena menentukan jangkauan**, kira-kira begini: kartu terbaca dari jarak lebih jauh daripada koin, koin lebih jauh daripada inlay 10 mm, dan implan butuh kontak langsung. **Logam mengacaukan penyetelan antena**: kumparan di atas permukaan logam menginduksi arus eddy di logam itu, induktansinya turun dan resonansinya bergeser menjauh dari 13,56 MHz, sehingga tag biasa di lemari baja mati total. Lembaran ferit di antara kumparan dan logam mengarahkan ulang medannya dan menghidupkan tag kembali, dengan harga jangkauan yang lebih pendek dan biaya lebih tinggi, itulah sebabnya tag on-metal harganya tiga kali lipat.

Di mana ponsel dipegang sama pentingnya dengan tagnya. Di iPhone antenanya ada di tepi atas; instruksi Apple sendiri adalah "dekatkan bagian atas iPhone Anda" ke tag. Di Android letaknya berbeda-beda per model, biasanya di tengah bagian belakang atau di dekat kamera. [Panduan pemula](/blog/nfc-tags-beginners-guide/) punya langkah-langkahnya.

---

## Siapa bisa membaca apa

Matriks ponsel dan pembaca. Kolom ponsel berasal dari dokumentasi Apple dan Google serta dari aplikasi saya sendiri; kolom desktop dan perangkat hobi berasal dari lembar spesifikasi vendor dan dokumentasi proyeknya masing-masing, dan saya belum menguji perangkat-perangkat itu sendiri kecuali pembaca yang disebut di kolom iPad dan Mac.

<div class="table-scroll sticky-first">

| Keluarga chip | iPhone di latar belakang | iPhone di dalam aplikasi | Android | iPad dan Mac dengan pembaca USB | Web NFC (Chrome di Android) | ACR122U | ACR1552U, OMNIKEY 5022 | Papan PN532 | Proxmark3 | Flipper Zero |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG21x, Ultralight EV1, Type 2 lainnya | hanya rekaman URL | NDEF, kata sandi, penghitung, mirror, dump | sama | sama, lewat NFC.cool | hanya NDEF | ya | ya | ya | ya, plus emulasi | ya, plus emulasi |
| NTAG 22x DNA | rekaman URL | NDEF, perintah mentah | sama | seperti Type 2 | NDEF | ya | ya | ya | ya | terbaca sebagai NTAG |
| NTAG 424 DNA, ST25TA, DESFire sebagai Type 4 | rekaman URL | NDEF, APDU | NDEF, APDU | NDEF, konfigurasi 424 penuh | NDEF | ya | ya | ya | ya | membaca NDEF; tanpa operasi kunci |
| Ultralight C | NDEF jika sudah diformat | NDEF, perintah native | sama | NDEF | NDEF | ya | ya | ya | ya | ya |
| Ultralight AES | NDEF jika sudah diformat | NDEF, perintah native | sama | NDEF | NDEF | ya | ya | ya | ya | terbaca sebagai Ultralight |
| MIFARE Classic | tidak | hanya UID dan keluarga | baca dan tulis penuh di ponsel yang pengendalinya punya CRYPTO1 | hanya baca NDEF, kunci yang umum diketahui | tidak | ya, dengan kunci | ya, dengan kunci | ya, dengan kunci | ya, plus pemulihan kunci dan emulasi | ya, plus pemulihan kunci dan emulasi |
| MIFARE Plus | tidak | UID di SL1; ISO-DEP di SL3 | seperti Classic di SL1; IsoDep di SL3 | UID | tidak | ya | ya | ya | ya | tidak terdokumentasi |
| DESFire, native | tidak | keluarga dan versi, APDU | IsoDep | versi | tidak | ya | ya | ya | ya | hanya baca dan simpan |
| ISO 15693: ICODE, ST25TV, ST25DV, TI, EM | rekaman URL | set perintah ISO 15693 lengkap sejak iOS 13 | NfcV | belum diuji | NDEF | tidak | ya | tidak | ya, plus emulasi | ya, plus emulasi |
| FeliCa Lite-S dan Standard | rekaman URL | baca dan tulis, dengan system code yang dideklarasikan | NfcF | baca; tulis di FeliCa lewat NFC.cool | NDEF | ya | hanya UID di OMNIKEY | ya | ya | baca dan emulasi Lite-S |
| Topaz (Type 1) | NDEF | NDEF | NDEF | belum diuji | NDEF | ya | tidak terdokumentasi | ya | ya | tidak terdokumentasi |
| Memori ISO 14443 Type B (SRI512) | tidak | tidak | NfcB | belum diuji | tidak | ya | ya | hanya sebagai pembaca | ya | hanya UID |
| Kartu 125 kHz, chip hewan, label UHF | tidak | tidak | tidak | tidak | tidak | tidak | tidak | tidak | 125 kHz ya | 125 kHz ya |

</div>

Beberapa baris layak diberi satu kalimat.

- **Pembacaan latar belakang di iPhone** hanya aktif untuk rekaman URL NDEF, hanya saat ponsel tidak terkunci dan sedang dipakai, dan tidak saat kamera, Wallet, sesi pembaca, atau mode pesawat aktif. Ia tidak pernah membaca chip mentah. iPhone XS dan yang lebih baru.
- **iPhone mana yang bisa membaca tag sama sekali:** iPhone 7 dan yang lebih baru di dalam aplikasi, menurut sesi WWDC 2019 dari Apple. Penulisan dan perintah mentah datang bersama iOS 13.
- **Kelas `MifareClassic` di Android bersifat opsional.** Dalam kata-kata Google sendiri: "if it is not implemented, then MifareClassic will never be enumerated". Penentunya adalah pengendalinya, bukan versi Android.
- **Web NFC** hanya NDEF, Chrome 89 dan yang lebih baru, hanya Android, dan Apple punya sikap menolak terhadapnya, jadi tidak akan ada versi Safari. Itulah sebabnya [pembaca NFC online](/online-nfc-reader/) di situs ini berfungsi di Android dan menyarankan pengguna iPhone memakai aplikasi.
- **iPad dan Mac tidak punya radio NFC.** Sejak NFC.cool 6.15.0, aplikasi berbicara dengan pembaca USB CCID lewat stack kartu pintar Apple sebagai gantinya; HID OMNIKEY 5022 CL adalah yang saya uji, ACS ACR1552U-M1 dan ACR1255U-J1 dilaporkan berfungsi oleh pengguna, dan [artikelnya](/blog/nfc-reading-ipad-mac/) mencantumkan batasannya. Mengeset kata sandi NTAG bisa dilakukan lewat pembaca; menghapusnya butuh perintah yang ditolak OMNIKEY, jadi yang satu itu pekerjaan ponsel.
- **ACS ACR122U tidak mendukung ISO 15693**, begitu juga ACR1252U dan ACR1255U-J1. Di lini ACS, hanya ACR1552U yang mendukungnya. OMNIKEY 5022 mendukung keduanya. Ini perlu diketahui sebelum membeli pembaca untuk tag perpustakaan.
- **Proxmark3 dan Flipper Zero** adalah alat yang bisa memulihkan kunci MIFARE Classic dan mengemulasikan kartu. Memang untuk itulah alat-alat ini dibuat, dan panduan ini menyebutnya karena pembahasan "apa yang bisa membacanya" akan tidak jujur tanpa mereka.

<div class="table-scroll">

| Pembaca | Antarmuka | Type A | Type B | FeliCa | ISO 15693 | 125 kHz | Classic dengan kunci | Pemulihan kunci Classic | Emulasi | Harga yang terlihat pada September 2026 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ACS ACR122U | USB, PC/SC | ya | ya | ya | tidak | tidak | ya | tidak | tidak | sekitar USD 40 sampai 50; ACS sudah menghentikannya, barang palsunya banyak |
| ACS ACR1252U | USB, PC/SC | ya | ya | ya | tidak | tidak | ya | tidak | mode emulasi kartu | USD 97,50 |
| ACS ACR1552U | USB, PC/SC | ya | ya | ya | ya | tidak | ya | tidak | mode emulasi kartu | USD 44,81 |
| ACS ACR1255U-J1 | Bluetooth dan USB | ya | ya | ya | tidak | tidak | ya | tidak | tidak | USD 64,81 |
| HID OMNIKEY 5022 CL | USB, PC/SC | ya | ya | hanya UID | ya | tidak | ya | tidak | tidak | EUR 69,99 |
| Breakout PN532 | SPI, I2C, UART | ya | hanya sebagai pembaca | ya | tidak | tidak | ya | lewat perangkat lunak host | Classic 1K/4K dan FeliCa | USD 24 sampai 40 |
| Proxmark3 RDV4 | USB, opsi BLE | ya | ya | ya | ya | ya | ya | ya | ya | EUR 329 sampai 529 |
| Proxmark3 Easy | USB | ya | ya | ya | ya | ya | ya | sebagian | ya | EUR 78; tiruan mulai sekitar GBP 28 |
| Flipper Zero | mandiri, USB-C, BLE | ya | terbatas | Lite-S | ya | ya | ya | ya | ya | USD 169 |
| Chameleon Ultra | USB-C, BLE | baca dan emulasi | tidak | tidak | tidak | emulasi dan baca | ya | ya | ya | EUR 129 |

</div>

---

## Apa yang dilakukan NFC.cool Tools dengan setiap chip

Inilah titik di sebuah artikel tempat barang buatan saya muncul, dan ia memang pantas ada di sini karena setiap baris di atas berakhir dengan "lalu apa yang dilakukan aplikasi dengannya". Tabel di bawah ini bukan teks pemasaran; saya menariknya langsung dari kode sumber aplikasi saat menulis panduan ini, dan tabel itu mengoreksi dua hal yang tadinya akan saya klaim.

| Keluarga chip | iPhone | Android | iPad dan Mac dengan pembaca |
| --- | --- | --- | --- |
| Identifikasi per produk | sekitar 60 nama: NTAG203 sampai 216, NTAG I2C, Ultralight dan C, Ultralight EV1 per ukuran, Ultralight AES, Classic Mini, 1K, dan 4K, Plus 2K dan 4K per security level, DESFire EV1, EV2, dan EV3 per ukuran, NTAG 424 DNA dan varian TagTamper-nya, ICODE SLI, SLI-S, SLI-L, SLIX, SLIX-S, SLIX-L, dan SLIX2, TI Tag-it Standard, Pro, dan Plus, ST25TV, ST25DV, dan M24LR, Infineon my-d, Fujitsu MB89R118, EM4233 dan EM4423, FeliCa Lite dan Standard plus Suica, PASMO, ICOCA, Edy, WAON, dan nanaco; kartu EMV dan PIV dikenali sebagai kartu EMV dan PIV | sekitar 20 nama: NTAG203, 213, 215, dan 216, NTAG 424 DNA, DESFire, Classic Mini, 1K, dan 4K, Plus 2K dan 4K, JCOP dan SmartMX, merek FeliCa termasuk Octopus; chip ISO 15693 dilaporkan per ukuran, bukan per produk | jenis kartu dari answer-to-reset pembaca |
| Baca NDEF | setiap keluarga | setiap keluarga | Type 2, Type 4, FeliCa; Classic dengan kunci publik |
| Tulis NDEF, kosongkan tag | Type 2, Type 4, Type 5, FeliCa Lite-S dan Standard | Type 2, Type 5, MIFARE Classic dengan direktori NDEF, apa pun yang bisa diformat Android | Type 2, Type 4, FeliCa |
| Nolkan seluruh memori | Type 5 | Type 2, Type 5, Classic | seperti iPhone |
| Kunci permanen | byte lock Type 2; NDEF baca-saja di Type 4, Type 5, dan FeliCa; sengaja ditolak di NTAG 424 DNA | Type 2 | ya |
| Kata sandi | NTAG213, 215, 216, dan 203 | keluarga Type 2 | mengeset ya; menghapus tergantung pembacanya |
| Penghitung ketukan dan mirror | NTAG213, 215, 216 | NTAG213, 215, 216 | ya |
| Dump memori penuh | Type 2, ISO 15693, daftar file DESFire, FeliCa, file NTAG 424 DNA | Classic dengan kunci pabrik, Ultralight, ISO 15693, FeliCa, Type A apa pun | Type 2, Type 4, FeliCa |
| Isi MIFARE Classic | tidak; Core NFC tidak punya CRYPTO1 | baca dengan kunci pabrik, format dan tulis dengan kunci yang umum diketahui | hanya baca NDEF |
| NTAG 424 DNA | kunci, SUN dalam mode polos dan terenkripsi, hak akses file, konfigurasi chip, file vault, UID acak, LRP, status anti-rusak, verifikasi tanda tangan keaslian | sama | sama |
| Amiibo | backup dan restore NTAG215, dikunci ulang ke tag tujuan | sama | ya |
| Kata sandi, EAS, AFI ISO 15693 | belum | belum | tidak |
| Autentikasi dan penulisan DESFire | tidak | tidak | tidak |
| Perintah mentah | mode APDU untuk ahli | katalog perintah | ya |

Dua koreksi itu, supaya tercatat: tadinya saya akan menulis bahwa aplikasi memverifikasi tanda tangan keaslian di tag NTAG21x, padahal tidak; hanya 424 yang mendapatkannya. Dan tadinya saya akan menulis bahwa perintah kata sandi ISO 15693 sudah ada, padahal baru berupa tabel referensi yang menunggu antarmukanya. Keduanya ada di daftar pekerjaan saya.

---

## Membeli tanpa tertipu

Yang harus disebutkan sebuah deskripsi produk sebelum saya mau membeli:

1. **Nama chip yang persis.** "NTAG213", bukan "NFC 213"; "ICODE SLIX2", bukan "tag ISO 15693"; "MIFARE Classic EV1 1K", bukan "kartu 1K". Kalau deskripsinya tidak menyebut nama chip, berarti penjualnya tidak tahu atau tidak ingin Anda tahu.
2. **Memori pengguna dalam byte**, dan angkanya harus cocok dengan chipnya: 144 untuk NTAG213, 504 untuk 215, 888 untuk 216, 316 untuk SLIX2. "1K" yang ternyata berarti MIFARE Classic tidak akan berfungsi di iPhone.
3. **Produsennya**, kalau penjual mengklaim NXP atau ST asli. Kode produsen di UID akan memberi tahu kebenarannya setelah Anda membeli; harganya akan memberi tahu sebelum itu. Tidak ada yang menjual stiker NTAG216 asli dengan sepertiga harga pasaran.
4. **Ukuran antena dan bentuk fisiknya.** Inlay 10 mm terbaca dari jarak satu sentimeter; yang 38 mm dari empat sentimeter. Tag on-metal harus menyebut on-metal.
5. **Apakah sudah diformat NDEF.** NTAG dikirim sudah terformat; Ultralight EV1 dan sebagian besar chip ISO 15693 tidak, dan NFC.cool bisa memformatnya, tetapi itu satu langkah tambahan.

Tanda bahaya: "kompatibel NTAG215" (berarti itu bukan NTAG215), "terenkripsi" pada apa pun di bawah anak tangga 4, "bisa untuk semua ponsel" pada MIFARE Classic, dan nama chip apa pun dengan huruf yang tidak pernah dipakai produsennya, seperti SLIX3.

**Berapa harga tag.** Harga di halaman produk yang saya lihat pada 9 September 2026 di Seritag, Shop NFC, GoToTags, NFCW Shop, NFC.CARDS, NFC-Tag-Shop.de, Tagstand, dan Digi-Key. Sebagian besar toko menjual minimal per sepuluh buah, jadi kolom "satuan" adalah tingkat pembelian terkecil yang mereka tawarkan. Harga bisa berubah; anggap angka ini sebagai perbandingan.

| Tag | Satuan atau tingkat terkecil | Per 100 | Per 1.000 | Chip mentah |
| --- | --- | --- | --- | --- |
| Stiker NTAG213 | EUR 0,32 sampai 0,65, USD 0,33 sampai 0,58 | EUR 0,29 sampai 0,34 | EUR 0,23 sampai 0,24, USD 0,50 | USD 0,14 dalam volume wafer |
| Stiker atau kartu NTAG215 | USD 0,48 sampai 0,54, GBP 0,64 sampai 0,67 | USD 0,35 | USD 0,33 | USD 0,21 |
| Stiker NTAG216 | EUR 0,97, USD 0,71 | EUR 0,70, USD 0,61 | EUR 0,56, USD 0,56 | USD 0,37 |
| Stiker NTAG 424 DNA | EUR 0,63, USD 0,90 | EUR 0,62, USD 0,77 | EUR 0,57, USD 0,68 | USD 0,79 satuan, 0,51 per 1.000 |
| Kartu MIFARE Classic 1K | EUR 1,35 sampai 1,59 per sepuluh; EUR 6,69 sebagai kartu eceran satuan | EUR 1,29 sampai 1,52, USD 1,98 | EUR 0,95 sampai 1,13, USD 0,86 | |
| Kartu DESFire EV3 | EUR 1,85 sampai 2,79 | EUR 1,85 sampai 2,45 | EUR 1,35 sampai 2,29 | USD 1,18 untuk 31.000 |
| Label ICODE SLIX2 | EUR 0,69 | EUR 0,34 sampai 0,37 | EUR 0,22 sampai 0,25 | USD 0,35 satuan, 0,22 per 1.000 |
| Inlay ST25TV02KC | USD 0,32 sampai 0,87 | USD 0,30 sampai 0,79 | USD 0,28 sampai 0,77 | USD 0,13 per gulungan |

Polanya sesuai dugaan Anda: memori hampir gratis, kriptografi kira-kira dua kali lipat harganya, dan bentuk fisik lebih mahal daripada chipnya. Die NTAG213 mentah harganya empat belas sen; stiker di sekelilingnya adalah sebagian besar harganya.

Tempat membeli: saya menyimpan daftar tag dan pembaca yang benar-benar saya pakai di [halaman tautan afiliasi](/affiliate-links/), dan tag 424 yang menjadi awal seluruh fitur DNA berasal dari AliExpress, jadi saya tidak akan bilang marketplace itu terlarang. Periksa barang yang datang dengan aplikasi sebelum Anda menulis apa pun ke sana.

---

## Seluruh katalog dalam satu tabel

Satu baris per chip. "Byte pengguna" adalah yang bisa Anda tulis; untuk DESFire, itu angka yang bisa dipakai menurut NXP. Kolom ponsel menyebutkan apa yang bisa dilakukan platformnya, bukan yang dilakukan setiap aplikasi; kolom NFC.cool menyebutkan apa yang dilakukan aplikasi saya. Di ponsel, geser ke samping; kolom pertama tetap di tempatnya.

<div class="table-scroll sticky-first">

| Chip | Produsen | Tipe Forum | Standar | Byte pengguna | UID | Perlindungan | Ketahanan / retensi | iPhone | Android | NFC.cool | Paling cocok untuk |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 210µ | NXP | 2 | 14443-A | 48 | 7 | lock bit | 100k / 10 thn | NDEF, mentah | NDEF, mentah | baca, tulis | barang sekali pakai yang mungil |
| NTAG210 | NXP | 2 | 14443-A | 48 | 7 | kata sandi | 100k / 10 thn | NDEF, mentah | NDEF, mentah | baca, tulis | antena kecil |
| NTAG212 | NXP | 2 | 14443-A | 128 | 7 | kata sandi | 100k / 10 thn | NDEF, mentah | NDEF, mentah | baca, tulis | antena kecil dengan ruang lebih |
| NTAG213 | NXP | 2 | 14443-A | 144 | 7 | kata sandi, penghitung, mirror | 100k / 10 thn | NDEF, mentah | NDEF, mentah | semuanya | stiker standar |
| NTAG215 | NXP | 2 | 14443-A | 504 | 7 | kata sandi, penghitung, mirror | 100k / 10 thn | NDEF, mentah | NDEF, mentah | semuanya, Amiibo | Amiibo, data ukuran sedang |
| NTAG216 | NXP | 2 | 14443-A | 888 | 7 | kata sandi, penghitung, mirror | 100k / 10 thn | NDEF, mentah | NDEF, mentah | semuanya | kontak, pilihan yang aman |
| NTAG213F, 216F | NXP | 2 | 14443-A | 144, 888 | 7 | kata sandi, pin deteksi medan | 100k / 10 thn | seperti 213 | seperti 213 | seperti 213 | tag yang ditanam di perangkat elektronik |
| NTAG 213 TT | NXP | 2 | 14443-A | 144 | 7 | kata sandi, kawat anti-rusak | 100k / 10 thn | seperti 213 | seperti 213 | seperti 213 | segel |
| NTAG203 | NXP | 2 | 14443-A | 144 | 7 | lock, OTP | 10k / 5 thn | NDEF | NDEF | baca, tulis, kata sandi | stok lama |
| NTAG I2C plus | NXP | 2 | 14443-A | 888, 1912 | 7 | kata sandi | 200k sampai 500k / 20 thn | NDEF, mentah | NDEF, mentah | identifikasi, baca, tulis | perangkat elektronik dengan MCU |
| NTAG 223, 224 DNA | NXP | 2 | 14443-A | 144, 208 | 7 | kata sandi atau AES, SUN | 100k / 10 thn | NDEF, mentah | NDEF, mentah | seperti Type 2 | bukti keaslian yang murah |
| NTAG 22x DNA StatusDetect | NXP | 2 | 14443-A | 144, 208 | 7 | seperti di atas, sensor | 100k / 10 thn | NDEF, mentah | NDEF, mentah | seperti Type 2 | segel dan penginderaan |
| NTAG 413 DNA | NXP | 4 | 14443-4 | 160 | 7 | 3 kunci AES, SUN | 200k / 50 thn | NDEF, APDU | NDEF, APDU | identifikasi | dihentikan |
| NTAG 424 DNA | NXP | 4 | 14443-4 | 416 | 7 | 5 kunci AES, SUN, LRP | 200k / 50 thn | NDEF, APDU | NDEF, APDU | konfigurasi penuh | bukti keaslian |
| NTAG 424 DNA TT | NXP | 4 | 14443-4 | 416 | 7 | seperti di atas, anti-rusak | 200k / 50 thn | NDEF, APDU | NDEF, APDU | konfigurasi penuh | segel keaslian |
| Ultralight | NXP | 2 | 14443-A | 48 | 7 | lock, OTP | 10k / 5 thn | NDEF | NDEF | baca, tulis | dihentikan |
| Ultralight C | NXP | 2 | 14443-A | 144 | 7 | 3DES | 100k / 10 thn | NDEF, mentah | NDEF, mentah | baca, tulis | tiket lama |
| Ultralight EV1 | NXP | 2 | 14443-A | 48, 128 | 7 | kata sandi, 3 penghitung | 100k / 10 thn | NDEF, mentah | NDEF, mentah | baca, tulis, kata sandi | tiket, barang sekali pakai |
| Ultralight AES | NXP | 2 | 14443-A | 144 | 7 | AES-128 | 100k / 10 thn | NDEF, mentah | NDEF, mentah | baca, tulis | Type 2 dengan autentikasi |
| Ultralight Nano | NXP | 2 | 14443-A | 40 | 7 | lock, OTP | 100k / 10 thn | NDEF | NDEF | baca, tulis | tiket sekali jalan |
| Classic Mini | NXP | tidak ada | 14443-A | 224 | 4 | CRYPTO1 | 100k / 10 thn | UID | tergantung pengendali | Android: baca, format | tidak ada |
| Classic 1K, EV1 | NXP | tidak ada | 14443-A | 752 | 4 atau 7 | CRYPTO1 | 100k / 10 thn | UID | tergantung pengendali | Android: baca, format | tidak ada |
| Classic 4K, EV1 | NXP | tidak ada | 14443-A | 3440 | 4 atau 7 | CRYPTO1 | 100k / 10 thn | UID | tergantung pengendali | Android: baca, format | tidak ada |
| Plus SE | NXP | tidak ada | 14443-A | 752 | 4 atau 7 | AES di SL3 | 100k / 10 thn | UID | seperti Classic | identifikasi | migrasi dari Classic |
| Plus EV2 | NXP | tidak ada | 14443-4 di SL3 | 1520, 3440 | 4 atau 7 | AES-128, EAL5+ | 200k / 25 thn | ISO-DEP | IsoDep | identifikasi | kontrol akses |
| DESFire EV1 | NXP | 4 | 14443-4 | 2304 sampai 7936 | 7 | DES, 3DES, AES | 200k / 10 thn | NDEF, APDU | NDEF, APDU | identifikasi, daftar file | transit lama |
| DESFire EV2 | NXP | 4 | 14443-4 | 2560 sampai 16384 | 7 | AES, EAL5+ | 200k / 25 thn | NDEF, APDU | NDEF, APDU | identifikasi, daftar file | kontrol akses |
| DESFire EV3 | NXP | 4 | 14443-4 | 2560 sampai 16384 | 7 | AES, SUN, EAL5+ | 200k min, 1M tipikal / 25 thn | NDEF, APDU | NDEF, APDU | identifikasi, daftar file | kontrol akses, transit |
| DESFire Light | NXP | 4 | 14443-4 | 640 | 7 | AES, LRP, EAL4 | 200k / 10 thn | NDEF, APDU | NDEF, APDU | identifikasi | kartu satu aplikasi |
| ICODE SLI | NXP | 5 | 15693 | 112 | 8 | lock | 100k / 10 thn | NDEF, mentah | NfcV | baca, tulis, format | sudah tidak diproduksi |
| ICODE SLI-S, SLI-L | NXP | 5 | 15693 | 160, 32 | 8 | kata sandi | 100k / 10 thn | NDEF, mentah | NfcV | baca, tulis, format | tidak dibuat lagi |
| ICODE SLIX | NXP | 5 | 15693 | 112 | 8 | kata sandi EAS/AFI | 100k / 50 thn | NDEF, mentah | NfcV | baca, tulis, format | stok perpustakaan dan logistik |
| ICODE SLIX-S, SLIX-L | NXP | 5 | 15693 | 160, 32 | 8 | kata sandi, privasi | 100k / 50 thn | NDEF, mentah | NfcV | baca, tulis, format | logistik |
| ICODE SLIX2 | NXP | 5 | 15693 | 316 | 8 | kata sandi, privasi, penghitung, tanda tangan | 100k / 50 thn | NDEF, mentah | NfcV | baca, tulis, format | inventaris, gulungan OpenPrintTag |
| ICODE DNA | NXP | 5 | 15693 | 252 | 8 | AES-128 | 100k / 50 thn | NDEF, mentah | NfcV | terbaca sebagai ISO 15693 | perlindungan merek dari jarak jauh |
| ICODE 3 | NXP | 5 | 15693 | 300 | 8 | kata sandi, penghitung ketukan, mirror, tanda tangan | 100k / 50 thn | NDEF, mentah | NfcV | terbaca sebagai ISO 15693 | chip inventaris terkini |
| NTAG 5 | NXP | 5 | 15693 | 512, 2048 | 8 | kata sandi, AES di 5332 | 1M / 40 thn | NDEF, mentah | NfcV | terbaca sebagai ISO 15693 | perangkat elektronik terhubung |
| ST25TN512, 01K | ST | 2 | 14443-A | 64, 160 | 7 | kill, kode ketukan, TruST25 | 100k / 40 thn | NDEF, mentah | NDEF, mentah | terbaca sebagai Type 2 | alternatif NTAG213 |
| ST25TV512C, 02KC | ST | 5 | 15693 | 64, 320 | 8 | kata sandi, kill, privasi, kode ketukan, TruST25 | 100k / 60 thn | NDEF, mentah | NfcV | identifikasi ST25TV, baca, tulis | label dengan URL baru di setiap ketukan |
| ST25TV16K, 64K | ST | 5 | 15693 | 2048, 8192 | 8 | kata sandi 64 bit, kill | 1M / 40 thn | NDEF, mentah | NfcV | baca, tulis | penyimpanan Type 5 besar |
| ST25DV04K sampai 64K | ST | 5 | 15693 | 512 sampai 8192 | 8 | kata sandi 64 bit | 1M / 40 thn | NDEF, mentah | NfcV | identifikasi ST25DV, baca, tulis | tag dinamis dengan MCU |
| M24LR | ST | tidak diklaim | 15693 | 512 sampai 8192 | 8 | kata sandi 32 bit | 1M / 40 thn | NDEF, mentah | NfcV | terbaca sebagai ST25TV | antarmuka ganda lama |
| ST25TA02K, 02KB | ST | 4 | 14443-4 | 256 | 7 | kata sandi 128 bit, penghitung, TruST25 di B | 1M / 200 thn | NDEF, APDU | NDEF, APDU | baca, tulis | Type 4 tanpa DESFire |
| ST25TA16K, 64K | ST | 4 | 14443-4 | 2048, 8192 | 7 | kata sandi 128 bit | 1M / 200 thn | NDEF, APDU | NDEF, APDU | baca, tulis | penyimpanan Type 4 besar |
| TI Tag-it HF-I Standard, Pro, Plus | TI | tidak diklaim | 15693 | 32, 32, 256 | 8 | lock; Pro menambahkan penulisan dengan kata sandi dan kill | 100k / 10 thn | NDEF, mentah | NfcV | identifikasi, baca | perpustakaan lama |
| EM4233 | EM | tidak diklaim | 15693 | 208 | 8 | kunci 96 bit, privasi, hancurkan | ? / 60 thn | NDEF, mentah | NfcV | identifikasi, baca | atas permintaan |
| EM4425 em echo-V | EM | 5 | 15693 plus UHF | hingga 256 | 8 | AES-128, kata sandi, anti-rusak | 100k / 50 thn | NDEF, mentah | NfcV | terbaca sebagai ISO 15693 | ritel dua frekuensi |
| Infineon my-d move | Infineon | 2 | 14443-A | 128 | 7 | kata sandi, penghitung nilai | 100k / 10 thn | NDEF, mentah | NDEF, mentah | identifikasi, baca | tiket |
| Fudan FM11NT021 | Fudan | 2 | 14443-A | 144 | 7 | kata sandi, penghitung | 500k diklaim / 10 thn | NDEF, mentah | NDEF, mentah | terbaca sebagai Type 2 generik | stiker tautan murah |
| Fudan FM11RF08, 08S | Fudan | tidak ada | 14443-A | 752 | 4 | CRYPTO1, ber-backdoor | ? | UID | tergantung pengendali | seperti Classic | tidak ada |
| Topaz 96, 512 | Innovision, Broadcom | 1 | 14443-A | 96, sekitar 480 | 7 | kunci satu kali | 10k / 5 thn | NDEF | NDEF | NDEF | lawas |
| FeliCa Lite-S | Sony | 3 | 18092, JIS X 6319-4 | 224 | 8 (IDm) | MAC 3DES | ? | NDEF, mentah | NfcF | baca, tulis | Jepang |
| FeliCa Standard | Sony | 3 | 18092 | 4 kB | 8 | AES, EAL6+ | ? | NDEF, mentah | NfcF | baca, merek | transit dan uang elektronik |
| Kovio NFC Barcode | Kovio, Thinfilm | tidak ada | proprietary | 16 baca-saja | tidak ada | tidak ada | t/a | tidak | NfcBarcode | tidak | sudah mati |
| ST SRI512, SRT512, SRI4K | ST | tidak ada | 14443-B | 64, 512 | 8 | penghitung, lock | 1M / 40 thn | tidak | NfcB | tidak | transit Type B |

</div>

---

## Perbandingan yang paling sering dicari

**NTAG213 vs NTAG215 vs NTAG216.** Chip yang sama dalam tiga ukuran memori: 144, 504, dan 888 byte, dengan kata sandi, penghitung, mirror, dan tanda tangan yang sama. Beli 213 untuk tautan, 215 untuk Amiibo, 216 untuk kartu kontak atau supaya tidak perlu berpikir. Selisih harganya sekitar tiga puluh sen.

**NTAG213 vs Ultralight EV1.** Antarmuka udara dan perintahnya sama; NTAG punya mirror ASCII dan capability container yang sudah tertulis, EV1 punya tiga penghitung satu arah dan tersedia dalam 48 atau 128 byte. Stiker cocoknya NTAG; tiket cocoknya EV1.

**NTAG213 vs ST25TN01K vs Fudan FM11NT021.** Tiga chip Type 2 berukuran 144 sampai 160 byte. NTAG punya kata sandi dan penghitung baca serta menjawab GET_VERSION; ST25TN punya memori lebih besar, perintah kill, kode ketukan, dan TruST25, tetapi tanpa kata sandi; Fudan meniru fitur NTAG kecuali GET_VERSION dan, menurut datasheet terbarunya, tanda tangan. Untuk tautan biasa, yang mana pun bisa; untuk penghitung atau Amiibo, pilih NTAG.

**MIFARE Classic vs DESFire.** Ini bukan pertandingan. Cipher Classic dibobol pada 2008 dan tiruannya yang paling umum ketahuan punya backdoor pada 2024; DESFire EV3 punya AES, manajemen kunci, sertifikasi EAL5+, dan SUN. Satu-satunya argumen untuk Classic adalah bahwa pembaca di dinding sudah terpasang sejak 2009.

**NTAG 424 DNA vs NTAG213.** 424 menandatangani setiap ketukan dengan AES-128 dan menyimpan 416 byte dalam tiga file dengan lima kunci; 213 menyimpan 144 byte dengan kata sandi 32 bit. Kalau pertanyaannya "apakah produk ini asli", hanya 424 yang bisa menjawabnya. Kalau pertanyaannya "apakah stiker ini membuka tautan", 213 melakukannya dengan sepertiga harganya.

**NTAG 424 DNA vs NTAG 223 DNA.** Keduanya mendukung SUN. 424 adalah Type 4 dengan lima kunci, LRP, opsi UID acak, file vault, dan retensi 50 tahun; 223 adalah stiker Type 2 dengan satu kunci SUN, kata sandi 32 bit, dan retensi 10 tahun. 223 adalah cara yang lebih murah untuk menaruh URL bertanda tangan di sebuah label; 424 adalah yang sudah punya aplikasi untuk mengonfigurasinya saat ini.

**ICODE SLIX2 vs NTAG216 untuk inventaris.** Kalau ponsel satu-satunya pembaca, NTAG216 punya memori lebih besar dan penghitung. Kalau ada gerbang atau pembaca genggam yang terlibat, SLIX2 terbaca dari satu meter dan NTAG dari empat sentimeter, dan itu yang menentukan.

**FeliCa vs NTAG di Jepang.** Gerbang transit Jepang hanya berbicara FeliCa; ponsel Jepang membaca keduanya. Untuk tag di poster di Tokyo, NTAG sudah cukup. Untuk apa pun yang harus diterima pembaca Suica, pilih FeliCa, dan itu bukan chip yang bisa Anda program dengan aplikasi ponsel.

---

## Pertanyaan yang sering diajukan

### Sebaiknya beli NTAG215 atau NTAG216?

216, kecuali Anda menulis Amiibo. Kapasitasnya 888 byte dibanding 504 byte di 215, dengan kata sandi, penghitung, mirror, dan dukungan ponsel yang sama. 215 ada di setiap toko karena figur Nintendo memakainya, dan kalau itu pekerjaan Anda, hanya chip itu pilihannya.

### Bisakah iPhone membaca tag MIFARE Classic?

iPhone bisa melihat bahwa tag itu ada. Core NFC membaca UID dan SAK lalu berhenti; API Apple tidak punya keluarga Classic dan dokumentasinya menyebut perintah MIFARE "doesn't support the Crypto1 protocol". Tidak ada aplikasi yang bisa membaca sebuah sektor di iPhone. Ponsel Android dengan pengendali NFC dari NXP bisa; ponsel dengan pengendali lain tertentu tidak bisa, dan di ponsel-ponsel itu kelas `MifareClassic` memang tidak muncul.

### Berapa kali tag NFC bisa ditulis ulang?

100.000 kali untuk chip NXP atau ST apa pun yang masih diproduksi pada suhu ruang, dan angka di datasheet adalah angka minimum. DESFire EV3 atau ST25DV diberi rating satu juta. NTAG203 lama, Ultralight orisinal, dan Topaz diberi rating 10.000. Tidak ada yang menulis ulang stiker sepuluh ribu kali; angka ini penting untuk penghitung dan untuk tag yang mencatat log.

### Seberapa jauh tag NFC bisa bekerja?

Dari ponsel, hingga sekitar empat sentimeter untuk antena seukuran kartu dan sekitar dua sentimeter untuk stiker kecil, di titik yang tepat pada ponsel. Definisi NFC Forum sendiri menyebut "hingga 2 cm". Tag ISO 15693 di pembaca gerbang dengan antena besar bekerja dari jarak satu meter, tetapi ponsel membacanya dari beberapa sentimeter yang sama seperti tag lain, mungkin dua kali jarak tag Type 2.

### Apakah tag NFC bisa kedaluwarsa atau aus?

Data chip diberi rating 10 tahun untuk sebagian besar chip konsumen, 50 tahun untuk NTAG 424 DNA dan keluarga ICODE SLIX, 60 tahun untuk ST25TV, dan 200 tahun untuk ST25TA, semuanya pada suhu ruang. Panas memperpendeknya. Dalam praktiknya, perekat, permukaan kertas, dan antena sudah menyerah jauh sebelum EEPROM-nya.

### Apakah tag NFC murah dari marketplace aman untuk dibeli?

Aman, ya; sesuai klaimnya, belum tentu. "NTAG213" murah sering kali adalah Fudan FM11NT021, yang berfungsi untuk tautan dan gagal untuk apa pun yang menanyakan GET_VERSION. "NTAG215" murah sering kali bukan NTAG215, dan Amiibo akan menolaknya. Periksa kode produsen dan nama chip di aplikasi sebelum Anda menulis apa pun, dan belilah dari toko yang menyebutkan nama chipnya.

### Bisakah ponsel saya membaca kartu bank atau paspor saya dengan aplikasi NFC?

Paspor, ya: dengan zona baca mesin (MRZ) sebagai kuncinya, sebuah aplikasi bisa membaca kelompok data di chipnya, dan NFC.cool melakukannya di kedua platform. Kartu bank adalah kartu pintar EMV; sebuah aplikasi bisa membaca daftar aplikasinya dan sebagian rekaman publiknya, tetapi Apple memblokir pembacaan kartu pembayaran di Core NFC, kode keamanan kartu tidak ada di chip, dan setiap transaksi ditandatangani dengan kunci yang tidak pernah keluar dari kartu, jadi tidak ada yang bisa disalin.

### Kenapa kartu akses kantor atau kunci hotel saya tidak muncul di aplikasi?

Sebagian besar kartu akses kantor adalah kartu proximity 125 kHz, yang bahkan tidak bisa dirasakan kumparan 13,56 MHz di ponsel. Sebagian besar kunci hotel dan kartu transit lama adalah MIFARE Classic, yang hanya bisa diidentifikasi oleh iPhone dan hanya bisa dibaca ponsel Android dengan pengendali yang tepat dan kunci yang tepat. Tidak satu pun dari keduanya bisa diperbaiki oleh aplikasi, dan saya lebih suka mengatakan itu daripada menjual jalan pintas kepada Anda.

### Bisakah saya membuka kunci tag NFC yang sudah dibuat baca-saja?

Tidak. Lock bit di tag Type 2 atau Type 5 adalah bit satu arah di dalam chip; flag baca-saja di capability container juga sama. Kata sandi bisa dihapus kalau Anda mengetahuinya; kunci tidak bisa. Itulah sebabnya NFC.cool bertanya dua kali sebelum mengunci apa pun.

### Apakah kata sandi NTAG benar-benar aman?

Kata sandi itu menghentikan orang dengan aplikasi gratisan, dan itu sudah mencakup kebanyakan orang. Ia tidak menghentikan siapa pun yang punya pembaca yang bisa menyadap, karena kata sandi 32 bit melintas di udara tanpa enkripsi dan tag menjawab dengan konfirmasi 16 bit. Untuk apa pun yang harus bertahan dari penyerang yang serius, tangganya dimulai dari AES: Ultralight AES untuk stiker Type 2, NTAG 424 DNA kalau ketukannya sendiri harus membuktikan sesuatu.

### Tag apa yang saya butuhkan untuk Amiibo?

NTAG215, dan hanya NTAG215. Konsol menanyakan GET_VERSION, melakukan autentikasi dengan kata sandi yang diturunkan dari UID, dan membaca seluruh 135 halaman. Chip tanpa GET_VERSION atau dengan jumlah halaman yang berbeda gagal di perintah pertama. Menulis Amiibo ke sebuah tag bersifat permanen, karena byte lock dan kata sandinya merupakan bagian dari formatnya.

### Tag NFC mana yang bisa dipakai di permukaan logam?

Chip apa pun dalam bentuk on-metal, artinya ada lembaran ferit di antara antena dan logamnya. Tag biasa yang ditempel di baja sama sekali tidak terbaca; tag on-metal terbaca di kira-kira empat perlima jangkauan normalnya. Kalau Anda bisa menyisipkan tiga milimeter bahan apa pun yang bukan logam di antara tag biasa dan logamnya, itu juga berhasil.

### Apakah NFC.cool bisa dipakai di iPad dan Mac?

Ya, sejak versi 6.15.0, lewat pembaca kartu pintar USB; kedua perangkat itu tidak punya radio NFC sendiri. HID OMNIKEY 5022 CL adalah yang saya uji, dan ACS ACR1552U serta ACR1255U-J1 dilaporkan berfungsi. Semua yang berfungsi di Type 2, Type 4, dan FeliCa lewat ponsel juga berfungsi lewat pembaca, dengan MIFARE Classic hanya bisa dibaca.

---

## Glosarium

| Istilah | Arti |
| --- | --- |
| AFI | Application Family Identifier, satu byte di tag ISO 15693 yang memungkinkan pembaca menginventarisasi hanya tag dari satu jenis |
| APDU | Application Protocol Data Unit, format perintah dan respons ISO 7816-4, dipakai oleh setiap chip ISO-DEP |
| ATQA | Answer To Request, dua byte pertama yang dikirim chip Type A; menurut NXP, chip jangan diidentifikasi berdasarkan nilai ini |
| AUTH0 | byte konfigurasi NTAG yang menyebut halaman pertama yang membutuhkan kata sandi |
| AUTHLIM | pengaturan NTAG yang mengunci tag setelah sejumlah percobaan kata sandi gagal yang Anda tentukan |
| CC | Capability Container, empat byte (atau file, di Type 4) yang memberi tahu pembaca bahwa tag berisi NDEF dan berapa banyak |
| CMAC | kode autentikasi pesan yang dihitung dengan AES; inilah yang membuat pesan SUN tidak bisa dipalsukan |
| CRYPTO1 | stream cipher 48 bit proprietary milik NXP di MIFARE Classic, dibobol pada 2008 |
| DSFID | Data Storage Format Identifier, satu byte ISO 15693 yang menjelaskan cara memori disusun |
| EAS | Electronic Article Surveillance, bit di tag ISO 15693 yang membuat alarm gerbang toko berbunyi |
| GET_VERSION | perintah NXP yang mengembalikan delapan byte untuk mengidentifikasi vendor, tipe, generasi, dan ukuran chip |
| ISO-DEP | protokol transport ISO/IEC 14443-4; chip yang berbicara dengan protokol ini menjawab SAK 20 dan menerima APDU |
| Modulasi beban | cara tag pasif mengirim data: dengan menyalakan dan mematikan beban di antenanya, yang dirasakan pembaca di medannya sendiri |
| LRP | Leakage Resilient Primitive, mode AES di NTAG 424 DNA dan DESFire Light yang tahan terhadap serangan side-channel |
| MAD | MIFARE Application Directory, sektor 0 di kartu Classic yang mendaftar isi sektor-sektor lainnya |
| Mirror | fitur NTAG yang menempelkan UID dan penghitung sebagai ASCII ke dalam pesan NDEF di setiap pembacaan |
| NDEF | NFC Data Exchange Format, wadah rekaman yang dibaca setiap ponsel |
| NUID | Non-Unique Identifier, sebutan NXP untuk UID 4 byte |
| OTP | One Time Programmable, bit yang bisa diset satu kali dan tidak pernah bisa dihapus |
| PACK | Password Acknowledge, dua byte yang dikembalikan NTAG setelah kata sandi yang benar |
| PICC, PCD | sebutan standar untuk kartu dan pembaca |
| Random ID | mode ketika chip menjawab antikolisi dengan ID acak 4 byte yang baru setiap kali, demi privasi |
| READ_SIG | perintah yang mengembalikan tanda tangan keaslian sebuah chip |
| SAK | Select Acknowledge, byte yang dikembalikan chip Type A setelah dipilih; bit-bitnya mengelompokkan chip ke dalam keluarga |
| SDM | Secure Dynamic Messaging, mekanisme NTAG 424 DNA dan DESFire EV3 di balik SUN |
| SUN | Secure Unique NFC, URL yang membawa bukti kriptografis baru di setiap ketukan |
| T5T, T2T, T4T | singkatan NFC Forum untuk tag Type 5, Type 2, dan Type 4 |
| TLV | Tag-Length-Value, bingkai di sekeliling pesan NDEF di chip Type 2 dan Type 5 |
| TruST25 | tanda tangan keaslian ST atas UID |
| UID | pengenal chip yang diprogram di pabrik, 4, 7, atau 8 byte |

---

## Sumber dan bacaan lanjutan

Setiap tabel di panduan ini diperiksa terhadap salah satu sumber berikut. Harga berasal dari toko-toko yang disebut di bagian pembelian pada 9 September 2026.

**NXP NTAG**

- [Datasheet NTAG213/215/216, Rev 3.2](https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf)
- Datasheet [NTAG210/212](https://www.nxp.com/docs/en/data-sheet/NTAG210_212.pdf), [NTAG 210µ](https://www.nxp.com/docs/en/data-sheet/NT2L1001_NT2H1001.pdf), [NTAG213F/216F](https://www.nxp.com/docs/en/data-sheet/NTAG213F_216F.pdf), dan [NTAG 213 TT](https://www.nxp.com/docs/en/data-sheet/NT2H1311TT.pdf)
- Datasheet [NTAG 223 DNA](https://www.nxp.com/docs/en/data-sheet/NT2H2331G0.pdf) dan [NTAG 224 DNA StatusDetect](https://www.nxp.com/docs/en/data-sheet/NT2H2421S0.pdf)
- Datasheet [NTAG 424 DNA](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf) dan [NTAG 424 DNA TagTamper](https://www.nxp.com/docs/en/data-sheet/NT4H2421Tx.pdf), serta [AN12196, catatan fitur dan tips 424 yang memuat kunci publik keaslian](https://www.nxp.com/docs/en/application-note/AN12196.pdf)
- Datasheet [NTAG I2C plus](https://www.nxp.com/docs/en/data-sheet/NT3H2111_2211.pdf) dan [NTAG 5 boost](https://www.nxp.com/docs/en/data-sheet/NTA5332.pdf)
- [AN13089, fitur dan tips NTAG 21x](https://www.puntoflotante.net/AN13089.pdf), tentang alasan tanda tangan keaslian statis bukan jaminan anti-kloning (salinan cermin; versi di nxp.com tidak publik)

**NXP MIFARE**

- Datasheet [MIFARE Ultralight](https://www.nxp.com/docs/en/data-sheet/MF0ICU1.pdf), [Ultralight C](https://www.nxp.com/docs/en/data-sheet/MF0ICU2.pdf), [Ultralight EV1](https://www.nxp.com/docs/en/data-sheet/MF0ULX1.pdf), dan [Ultralight AES](https://www.nxp.com/docs/en/data-sheet/MF0AES(H)20.pdf)
- Datasheet [MIFARE Classic EV1 1K](https://www.nxp.com/docs/en/data-sheet/MF1S50YYX_V1.pdf) dan [Classic EV1 4K](https://www.nxp.com/docs/en/data-sheet/MF1S70YYX_V1.pdf)
- Datasheet ringkas [MIFARE Plus S](https://www.nxp.com/docs/en/data-sheet/MF1SPLUSX0Y1_SDS.pdf), [Plus SE](https://www.nxp.com/docs/en/data-sheet/MF1SEP_H_10X1_SDS.pdf), dan [Plus EV2](https://www.nxp.com/docs/en/data-sheet/MF1P(H)x2.pdf)
- Datasheet [DESFire EV1](https://www.nxp.com/docs/en/data-sheet/MF3ICDX21_41_81_SDS.pdf), [DESFire EV2](https://www.nxp.com/docs/en/data-sheet/MF3DX2_MF3DHX2_SDS.pdf), [DESFire EV3](https://www.nxp.com/docs/en/data-sheet/MF3D_H_X3_SDS.pdf), dan [DESFire Light](https://www.nxp.com/docs/en/data-sheet/MF2DLHX0.pdf), serta [AN12752 tentang memori DESFire yang bisa dipakai](https://www.nxp.com/docs/en/application-note/AN12752.pdf)
- [AN10833, identifikasi tipe MIFARE](https://www.nxp.com/docs/en/application-note/AN10833.pdf), [AN10927, UID MIFARE](https://www.nxp.com/docs/en/application-note/AN10927.pdf), [AN1305, NDEF di MIFARE Classic](https://www.nxp.com/docs/en/application-note/AN1305.pdf), [AN10787, MIFARE Application Directory](https://www.nxp.com/docs/en/application-note/AN10787.pdf), [AN11004, DESFire sebagai tag Type 4](https://www.nxp.com/docs/en/application-note/AN11004.pdf)

**NXP ICODE**

- Datasheet [ICODE SLIX](https://www.nxp.com/docs/en/data-sheet/SL2S2002_SL2S2102.pdf), [SLIX-S](https://www.nxp.com/docs/en/data-sheet/SL2S5302_SL2S5402.pdf), [SLIX-L](https://www.nxp.com/docs/en/data-sheet/SL2S5002_SL2S5102.pdf), [SLIX2](https://www.nxp.com/docs/en/data-sheet/SL2S2602.pdf), [ICODE DNA](https://www.nxp.com/docs/en/data-sheet/SL2S6002_SDS.pdf), dan [ICODE 3](https://www.nxp.com/docs/en/data-sheet/SL2S3003_SL2S3003TT.pdf)
- [AN11809, perbandingan keluarga ICODE](https://www.nxp.com/docs/en/application-note/AN11809.pdf)

**STMicroelectronics, TI, EM, Sony, Fudan**

- Datasheet ST [ST25TV02KC](https://www.st.com/resource/en/datasheet/st25tv02kc.pdf), [ST25TN01K](https://www.st.com/resource/en/datasheet/st25tn01k.pdf), [ST25DV64KC](https://www.st.com/resource/en/datasheet/st25dv64kc.pdf), [ST25TA02KB](https://www.st.com/resource/en/datasheet/st25ta02kb.pdf), dan [M24LR64E-R](https://www.st.com/resource/en/datasheet/m24lr64e-r.pdf), [AN5658 tentang Augmented NDEF](https://www.st.com/resource/en/application_note/an5658-augmented-ndef-messages-with-st25tv512c-and-st25tv02kc-devices-stmicroelectronics.pdf), dan [TA0358 tentang TruST25](https://www.st.com/resource/en/technical_article/ta0358-developing-supply-chain-confidence-with-trust25-digital-signature-in-rfidnfc-tags-stmicroelectronics.pdf)
- Datasheet TI Tag-it HF-I [Standard](https://www.ti.com/lit/ds/scbs828c/scbs828c.pdf), [Pro](https://www.ti.com/lit/ds/scbs822c/scbs822c.pdf), dan [Plus](https://www.ti.com/lit/ds/scbs827b/scbs827b.pdf)
- EM Microelectronic [EM4233](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em4233), [EM4423](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em-echo-em4423), dan [EM4425](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em-echo-v)
- Sony [datasheet FeliCa Lite-S](https://www.sony.co.jp/en/Products/felica/business/data/RC-S966_E.pdf) dan [FeliCa Standard RC-SA01](https://www.sony.co.jp/en/Products/felica/business/products/RC-SA01.html)
- [Datasheet Fudan FM11NT021](https://github.com/user-attachments/files/16667599/FM11NT021_sds_eng.pdf)

**Riset keamanan dan standar**

- Quarkslab, [MIFARE Classic: exposing the static encrypted nonce variant and a few hardware backdoors](https://blog.quarkslab.com/mifare-classic-static-encrypted-nonce-and-backdoors.html) (2024)
- Nohl, Evans, Starbug, dan Plötz, [Reverse-Engineering a Cryptographic RFID Tag](https://www.usenix.org/legacy/event/sec08/tech/full_papers/nohl/nohl.pdf) (USENIX Security 2008)
- Garcia dkk., [Dismantling MIFARE Classic](https://link.springer.com/chapter/10.1007/978-3-540-88313-5_7) (ESORICS 2008)
- [ISO/IEC JTC1/SC17 Standing Document 5, daftar produsen IC](https://www.aimglobal.org/wp-content/uploads/2022/04/ISO_IEC_JTC1_SC17_Standing_Document_5_Register_of_IC_Manufacturers.pdf)
- [Catatan kartu magic dari Proxmark3](https://github.com/RfidResearchGroup/proxmark3/blob/master/doc/magic_cards_notes.md) dan [3dbrew tentang tata letak tag Amiibo](https://www.3dbrew.org/wiki/Amiibo)
- NFC Forum tentang [teknologinya](https://nfc-forum.org/learn/nfc-technology/) dan [spesifikasi tag Type 2](https://nfc-forum.org/build/specifications/type-2-tag-specification/)

**Ponsel dan pembaca**

- Apple [Core NFC](https://developer.apple.com/documentation/corenfc), [pembacaan tag di latar belakang](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading), [perintah MIFARE yang tidak mencakup CRYPTO1](https://developer.apple.com/documentation/corenfc/nfcmifaretag/sendmifarecommand(commandpacket:completionhandler:)), dan [sesi WWDC 2019 nomor 715](https://developer.apple.com/videos/play/wwdc2019/715/)
- Android [MifareClassic](https://developer.android.com/reference/android/nfc/tech/MifareClassic), [panduan NFC lanjutan](https://developer.android.com/develop/connectivity/nfc/advanced-nfc), dan [Web NFC di Chrome](https://developer.chrome.com/docs/capabilities/nfc)
- Pembaca: [ACS ACR122U](https://www.acs.com.hk/download-manual/418/TSP-ACR122U-3.06.pdf), [HID OMNIKEY 5022 CL](https://www.hidglobal.com/doclib/files/resource_files/eat-omnikey-5022-usb-reader-ds-en.pdf), [NXP PN532](https://www.nxp.com/docs/en/nxp/data-sheets/PN532_C1.pdf), [Proxmark3](https://github.com/RfidResearchGroup/proxmark3), [Flipper Zero](https://docs.flipper.net/nfc), dan [Chameleon Ultra](https://github.com/RfidResearchGroup/ChameleonUltraDocs)
- Antena dan ferit: [TI SLOA241](https://www.ti.com/lit/an/sloa241b/sloa241b.pdf) dan [Würth ANP022](https://www.mouser.com/pdfdocs/Selection_and_Characteristics_of_WEFSFS_APPNOTE.PDF)

---

## Intinya

Cocokkan chip dengan pekerjaannya. NTAG213 untuk tautan, NTAG216 kalau Anda ragu, NTAG215 untuk Amiibo, NTAG 424 DNA kalau sebuah ketukan harus membuktikan sesuatu, ICODE SLIX2 atau ICODE 3 kalau sebuah gerbang harus membacanya, DESFire EV3 kalau sebuah pintu harus memercayainya, dan tidak ada satu pun dari rak MIFARE Classic. Semua hal lain di panduan ini adalah alasan di balik kalimat itu, dan tabel-tabelnya ada supaya Anda tidak perlu lagi memercayai begitu saja apa kata deskripsi produk.

Kalau Anda ingin melihat tag itu sebenarnya apa sebelum menulis ke sana, itulah yang dilakukan [NFC.cool Tools](/features/nfc-reader-writer/) di setiap ketukan, di [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ultimate-nfc-tag-guide-id&mt=8), di [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ultimate-nfc-tag-guide-id), dan di iPad atau Mac dengan pembaca yang tercolok. Dan kalau ada chip di meja Anda yang dinamai keliru oleh aplikasi, atau sama sekali tidak dinamai, kirimi saya pesan. Begitulah sebagian besar dari enam puluh nama itu masuk ke daftarnya.
