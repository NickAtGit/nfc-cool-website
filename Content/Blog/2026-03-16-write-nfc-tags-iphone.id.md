---
id: nfc-blog-010
title: "Cara menulis tag NFC dengan iPhone Anda"
date: 2026-03-16
tags: ["nfc-tags", "guides", "iphone"]
summary: "iPhone Anda bisa lebih dari sekadar membaca tag NFC - iPhone juga bisa menulisnya. Berikut panduan langkah demi langkah untuk memprogram tag NFC dengan iPhone Anda, mulai dari memilih tag yang tepat hingga menulis URL, kredensial Wi-Fi, kartu kontak, dan otomatisasi."
image: "/assets/images/Blog/write-nfc-tags-iphone.webp"
imageAlt: "iPhone menulis data ke tag NFC kosong dengan ikon kemajuan dan centang"
metaTitle: "Cara menulis tag NFC dengan iPhone Anda: panduan langkah demi langkah (2026)"
metaDescription: "Pelajari cara menulis tag NFC dengan iPhone Anda. Instruksi langkah demi langkah untuk memprogram URL, Wi-Fi, kontak, dan otomatisasi menggunakan NFC.cool Tools dan iOS Shortcuts."
ogTitle: "Cara menulis tag NFC dengan iPhone Anda"
ogDescription: "Panduan langkah demi langkah untuk menulis tag NFC dengan iPhone Anda - URL, Wi-Fi, kontak, dan otomatisasi. Tidak perlu peralatan khusus."
---
Kebanyakan orang tahu iPhone mereka bisa *membaca* tag NFC - ketuk untuk membayar, memindai kartu transit, membuka tautan. Namun hal yang terus harus saya yakinkan kepada orang-orang adalah bahwa iPhone Anda juga bisa *menulis* ke tag NFC, mengubah tag kosong menjadi pemicu cerdas untuk hampir semua hal.

Saya telah menghabiskan bertahun-tahun membangun NFC.cool, sebuah aplikasi untuk membaca dan menulis tag NFC, dan menulis adalah bagian yang tidak pernah saya bosan. Ingin tag di meja samping tempat tidur yang membisukan ponsel Anda dan mengatur alarm? Tag di meja Anda yang membuka playlist kerja? Tag di depan pintu yang berbagi kata sandi Wi-Fi dengan tamu? iPhone Anda bisa memprogram semua ini, dan begitu Anda melakukannya sekali, Anda akan bertanya-tanya kenapa Anda menunggu.

Ini adalah panduan yang akan saya berikan kepada teman yang baru saja membeli paket tag pertama mereka: apa yang Anda butuhkan, cara menulis berbagai jenis data, dan proyek praktis yang benar-benar akan saya siapkan dalam hitungan menit. Jika Anda benar-benar baru mengenal teknologi ini, [panduan lengkap pemula tentang tag NFC](/blog/nfc-tags-beginners-guide/) saya membahas dasarnya terlebih dahulu.

---

## Apa yang Anda butuhkan

Anda hanya membutuhkan tiga hal untuk mulai menulis, dan tidak ada yang mahal.

### 1. iPhone yang kompatibel

Penulisan tag NFC memerlukan **iPhone 7 atau lebih baru** yang menjalankan **iOS 13 atau lebih baru**. Jika Anda membeli iPhone dalam delapan tahun terakhir, Anda sudah tercakup.

Untuk pengalaman terbaik, saya akan memilih iPhone dengan **pembacaan NFC latar belakang** (iPhone XS dan lebih baru). Model-model ini dapat membaca tag NFC tanpa terlebih dahulu membuka aplikasi, yang membuat tag yang Anda tulis jauh lebih menyenangkan untuk digunakan. Jika Anda ingin mengetahui secara tepat bagaimana perangkat keras iPhone menangani semua ini, saya membahasnya secara mendalam di [panduan orang dalam tentang NFC di iPhone](/blog/nfc-on-iphones-insider-look/).

### 2. Tag NFC kosong

Anda bisa [membeli tag NFC kosong](/affiliate-links/) secara online seharga **€0,30-€1,00 per buah**. Tag tersedia dalam beberapa bentuk:

| Bentuk | Terbaik untuk |
|--------|---------------|
| **Stiker** (bulat, 25-30mm) | Permukaan, objek, poster |
| **Kartu** (ukuran kartu kredit) | Dompet, kartu nama |
| **Gantungan kunci** | Gantungan kunci, aksesori tas |
| **Gelang** | Acara, kontrol akses |
| **Tag koin** (cakram tebal) | Tertanam di dalam objek |

**Chip mana yang harus Anda beli?**

Jika Anda meminta saya memilih satu, untuk sebagian besar proyek **NTAG216** adalah pilihan terbaik - 888 byte memori yang dapat digunakan, kompatibel secara luas, dan terjangkau dalam jumlah banyak. Ini adalah chip yang paling sering saya rekomendasikan dan uji. Berikut rangkuman singkatnya:

- **NTAG213** (144 byte) - Cukup untuk URL dan teks sederhana. Opsi paling murah.
- **NTAG215** (504 byte) - Cukup untuk kartu kontak, kredensial Wi-Fi, dan beberapa rekaman.
- **NTAG216** (888 byte) - Pilihan terbaik secara keseluruhan. Ruang paling besar untuk kartu kontak, kredensial Wi-Fi, dan konten lebih panjang seperti vCard terperinci - yang saya rekomendasikan untuk sebagian besar proyek.

Jika Anda tidak yakin, mulailah dengan paket campuran stiker NTAG216 dan jangan terlalu banyak berpikir - tag ini menangani 90% kasus penggunaan. Untuk panduan lengkap chip per chip, termasuk jenis mana yang benar-benar disukai iPhone, saya menulis [panduan tentang jenis tag NFC untuk iPhone](/blog/nfc-tag-types-for-iphones/).

### 3. Aplikasi penulisan NFC

iPhone Anda membutuhkan aplikasi untuk menulis data ke tag. Dukungan NFC bawaan Apple menangani pembacaan, tetapi untuk penulisan, Anda membutuhkan aplikasi khusus.

Ini adalah bagian yang telah saya kerjakan bertahun-tahun, jadi saya akan terus terang tentang bias saya: **[NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-en&mt=8)** dirancang khusus untuk ini, baik di iPhone maupun [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-en). Aplikasi ini mendukung penulisan semua jenis rekaman NDEF standar - URL, teks, konfigurasi Wi-Fi, kontak, dan lainnya - dengan antarmuka bersih yang menunjukkan persis berapa banyak memori tag yang Anda gunakan. Aplikasi ini juga memungkinkan Anda mengunci tag, membaca detail teknis, dan mengotomatiskan penulisan melalui iOS Shortcuts. Anda bisa melihat daftar fitur lengkap di [halaman pembaca dan penulis NFC](/features/nfc-reader-writer/).

Opsi lain ada (seperti aplikasi Shortcuts Apple untuk penulisan URL dasar), tetapi aplikasi NFC khusus memberi Anda lebih banyak kontrol atas apa yang Anda tulis dan bagaimana caranya.

---

## Langkah demi langkah: menulis tag NFC pertama Anda

Saya akan memulai dari mana saya selalu memulai semua orang: menulis URL ke tag. Ini adalah kasus penggunaan paling umum dan kemenangan tercepat.

### Menulis URL

1. **Buka NFC.cool Tools** dan ketuk tab **Write**
2. **Pilih "URL"** sebagai jenis rekaman
3. **Masukkan URL Anda** - misalnya, `https://nfc.cool`
4. **Ketuk "Write to Tag"**
5. **Dekatkan iPhone Anda ke tag NFC kosong** - tepi atas iPhone Anda (tempat antena NFC berada) harus berada dalam jarak 2-3 cm dari tag
6. **Tunggu konfirmasi berhasil** - Anda akan merasakan ketukan haptic dan melihat tanda centang

Hanya itu. Siapa pun yang mengetuk tag itu dengan ponsel mereka sekarang akan dibawa ke URL Anda - tidak perlu aplikasi, tidak perlu memindai kode QR. Pertama kali saya melihat ekspresi wajah kolega saya ketika sebuah stiker kosong membuka situs web, saya tahu inilah demo yang harus didahulukan.

**Tips:** Antena NFC di iPhone terletak di **tepi atas** ponsel, dekat kamera. Untuk koneksi terkuat, dekatkan bagian atas iPhone Anda langsung di atas tag. Jika Anda ingin memeriksa kembali apa yang Anda tulis tanpa aplikasi, Anda bisa [membaca tag NFC langsung dari browser Anda](/online-nfc-reader/) di Android.

---

## Apa yang bisa Anda tulis ke tag NFC?

Tag NFC menggunakan format yang disebut **NDEF** (NFC Data Exchange Format) yang mendefinisikan jenis rekaman standar. Begitu model itu terklik bagi saya, seluruh teknologi berhenti terasa seperti sihir. Ini yang bisa Anda tulis:

### URL dan tautan

Penggunaan paling umum, dan yang paling sering saya gunakan. Tulis alamat web apa pun, dan mengetuk tag akan membukanya di browser ponsel.

**Penggunaan praktis:**
- Tautan menu restoran di tag meja
- Portofolio atau profil LinkedIn di kartu nama
- Tautan halaman produk di tag rak ritel
- Tautan formulir umpan balik di resepsionis

**Memori yang dibutuhkan:** ~30-80 byte (sebagian besar URL muat di tag mana pun)

### Kredensial jaringan Wi-Fi

Tulis nama jaringan Wi-Fi (SSID) dan kata sandi ke tag. Tamu mengetuk tag dan terhubung secara otomatis - tidak perlu mengetik kata sandi yang panjang.

**Cara menulis kredensial Wi-Fi:**

1. Di NFC.cool Tools, pilih **"Wi-Fi"** sebagai jenis rekaman
2. Masukkan **nama jaringan** Anda (SSID)
3. Masukkan **kata sandi**
4. Pilih **jenis keamanan** (WPA2 atau WPA3 untuk sebagian besar jaringan rumah)
5. Tulis ke tag

**Tips:** Tempatkan tag Wi-Fi di dekat router, di gantungan kunci dekat pintu, atau di dalam kamar tamu. Beri label "Ketuk untuk Wi-Fi" - dalam pengalaman saya ini adalah satu tag yang selalu membuat setiap tamu berterima kasih.

**Memori yang dibutuhkan:** ~60-120 byte tergantung panjang kata sandi

### Kartu kontak (vCard)

Tulis kontak vCard ke tag. Ketika seseorang mengetuknya, detail kontak Anda muncul siap disimpan - nama, telepon, email, perusahaan, alamat.

Ini pada dasarnya adalah apa yang dilakukan kartu nama digital, tetapi langsung tertanam ke dalam tag fisik. Tidak perlu aplikasi, tidak perlu koneksi internet - data kontak berada di tag itu sendiri.

**Cara menulis kontak:**

1. Pilih **"Contact"** sebagai jenis rekaman
2. Isi bidang yang ingin Anda bagikan (nama, telepon, email, dll.)
3. Tulis ke tag

**Memori yang dibutuhkan:** ~100-400 byte tergantung berapa banyak bidang yang Anda sertakan. Gunakan NTAG215 atau NTAG216 untuk kontak dengan alamat dan catatan.

Satu peringatan jujur dari email dukungan yang saya baca: vCard mentah di tag bisa berperilaku tidak konsisten di iPhone. Jika vCard Anda tidak terbuka dengan bersih, saya menggali penyebabnya di [mengapa tag NFC vCard Anda tidak berfungsi di iPhone](/blog/vcard-nfc-iphone-not-working/).

**Catatan:** Untuk pengalaman yang lebih kaya dengan foto, tautan sosial, dan analitik, lihat **[NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-en&mt=8)** - ini membuat profil kartu nama digital yang dihosting dan dapat menulis tautannya ke tag NFC mana pun. Ketika seseorang mengetuk, pengguna iOS melihat App Clip native dan pengguna Android membuka situs web di domain nfc.cool - tidak perlu aplikasi. Dalam networking saya sendiri, saya menemukan ini jauh lebih andal daripada vCard mentah.

### Teks biasa

Tulis pesan teks apa pun ke tag. Kurang umum dari URL, tetapi berguna untuk:

- Label inventaris (nomor seri, deskripsi)
- Instruksi atau catatan yang dilampirkan pada peralatan
- Pesan kejutan dalam perburuan harta karun
- Pelacakan aset di gudang

**Memori yang dibutuhkan:** Bervariasi berdasarkan panjang teks (~1 byte per karakter)

### Nomor telepon dan alamat email

Tulis URI `tel:` atau `mailto:` untuk memicu panggilan telepon atau menyusun email saat diketuk.

Berguna untuk:
- Tag kontak darurat pada peralatan medis
- Tag "Hubungi untuk layanan" pada mesin penjual otomatis
- Tag kontak dukungan pada produk

### Data khusus aplikasi

Beberapa aplikasi dapat menulis rekaman NDEF kustom yang memicu tindakan aplikasi tertentu. Misalnya, Anda bisa menulis rekaman yang membuka shortcut, playlist, atau layar aplikasi tertentu.

---

## Lanjutan: menulis dengan iOS Shortcuts

Di sinilah hal-hal menjadi menyenangkan bagi saya. Aplikasi **Shortcuts** Apple memiliki dukungan penulisan NFC bawaan, dan NFC.cool Tools memperluasnya lebih jauh dengan tindakan Shortcuts-nya sendiri.

### Penulisan URL dasar dengan Shortcuts

1. Buka aplikasi **Shortcuts**
2. Buat shortcut baru
3. Cari tindakan **"Set NFC Tag"** (di bawah Scripting → NFC)
4. Konfigurasikan apa yang akan ditulis (URL, teks, dll.)
5. Jalankan shortcut dan ketuk tag

Ini berguna untuk menulis banyak tag sekaligus dengan data yang sama.

### Integrasi Shortcuts NFC.cool Tools

NFC.cool Tools menambahkan tindakan Shortcuts-nya sendiri, memberi Anda lebih banyak opsi:

- **Write Tag** - Tulis jenis rekaman yang didukung secara programatis
- **Read Tag** - Pindai dan kembalikan data tag ke shortcut Anda
- **Scan History** - Akses hasil pemindaian terbaru Anda

Ini membuka kemungkinan otomatisasi. Misalnya, Anda bisa membuat shortcut yang:
1. Meminta nama produk
2. Membuat URL seperti `https://yoursite.com/product/{name}`
3. Menulisnya ke tag NFC
4. Mencatat tag ke spreadsheet

Sempurna untuk pelabelan inventaris massal atau pengaturan lencana acara.

---

## Proyek tag NFC praktis

Ini adalah proyek yang terus saya kembangkan - siap dibangun, dan masing-masing membutuhkan beberapa menit:

### Tag rumah pintar

**Tag meja samping tempat tidur - "Mode Tidur"**
Tulis URL yang memicu iOS Shortcut untuk:
- Mengaktifkan Jangan Ganggu
- Mengatur alarm besok
- Menurunkan kecerahan layar
- Memulai playlist tidur

**Tag meja - "Mode Kerja"**
- Buka manajer tugas Anda
- Mulai pengatur waktu fokus
- Hubungkan ke VPN kerja Anda
- Putar playlist konsentrasi

**Tag pintu - "Meninggalkan Rumah"**
- Periksa prakiraan cuaca
- Tampilkan waktu perjalanan
- Picu adegan "pergi" rumah pintar

### Tag bisnis

**Tag lencana konferensi**
Tulis URL NFC.cool Business Card Anda ke tag yang ditempel di belakang lencana konferensi Anda. Kontak mengetuk lencana Anda → kartu nama digital lengkap Anda muncul.

**Tag produk**
Tulis tautan ke dokumentasi produk, registrasi garansi, atau halaman dukungan. Tempelkan pada produk atau kemasan.

**Tag ruang rapat**
Tulis tautan ke kalender pemesanan ruangan atau kredensial Wi-Fi. Tempel di dekat pintu.

### Proyek kreatif

**Tag musik**
Tulis tautan album Spotify atau Apple Music ke stiker NFC. Tempel pada sampul album fisik, dan mengetuk akan memutar albumnya.

**Tag permainan papan**
Tulis tautan ke PDF aturan atau video tutorial. Tempel di dalam tutup kotak.

**Tag resep**
Tulis tautan ke resep favorit dan tempel tag pada toples rempah atau halaman buku masak.

---

## Mengunci tag NFC

Setelah Anda menulis tag dan puas dengan isinya, Anda bisa **menguncinya**. Penguncian membuat tag menjadi hanya-baca secara permanen - tidak ada yang bisa menimpa data Anda. Saya memperlakukan ini sebagai langkah yang disengaja dan final, bukan sesuatu yang dilewati dengan cepat, karena tidak ada cara untuk membatalkannya.

**Di NFC.cool Tools:**
1. Ketuk opsi **Lock** setelah menulis
2. Konfirmasi - **ini tidak dapat dibatalkan**

**Kapan harus mengunci:**
- Tag di lokasi publik (mencegah perusakan)
- Tag produk (lindungi URL Anda)
- Kartu nama (jaga keamanan data kontak Anda)
- Tag apa pun yang tidak Anda rencanakan untuk ditulis ulang

**Kapan TIDAK harus mengunci:**
- Tag yang mungkin ingin Anda perbarui nanti (perubahan kata sandi Wi-Fi, URL musiman)
- Eksperimen/pembelajaran - biarkan dapat ditulis ulang saat Anda menguji

---

## Pemecahan masalah

Sebagian besar pertanyaan "kenapa tidak bisa menulis" yang saya terima jatuh pada salah satu dari empat penyebab ini. Begini cara saya menanganinya.

### Kesalahan "Unable to Write"

- **Tag mungkin terkunci.** Jika seseorang (atau Anda) sebelumnya mengunci tag, tag itu permanen hanya-baca. Anda membutuhkan tag baru.
- **Memori tidak cukup.** Data Anda mungkin terlalu besar untuk kapasitas tag. Coba tag dengan lebih banyak memori (NTAG215 → NTAG216) atau kurangi data Anda.
- **Tag tidak diposisikan dengan benar.** Gerakkan tepi atas iPhone Anda perlahan di atas tag. Beberapa permukaan (logam, casing tebal) dapat mengganggu.
- **Tag rusak.** Tag NFC tahan lama tetapi tidak tidak bisa hancur. Panas ekstrem, tekukan, atau tusukan dapat merusaknya.

### Penulisan tampaknya berhasil tetapi tag tidak merespons

- **Periksa format NDEF.** Data harus ditulis dalam format NDEF agar ponsel dapat membacanya secara otomatis. NFC.cool Tools menangani ini untuk Anda, tetapi tag yang ditulis secara kustom mungkin memiliki masalah pemformatan.
- **Model iPhone penting.** iPhone lama (7, 8, X) memerlukan aplikasi untuk membaca tag. iPhone XS dan lebih baru membaca tag secara otomatis di latar belakang.

### Tag berfungsi di Android tetapi tidak di iPhone

- **Periksa jenis chip.** iPhone bekerja paling baik dengan chip seri NTAG (NTAG213, 215, 216). Beberapa jenis chip lain mungkin tidak kompatibel dengan iOS.
- **Format NDEF.** Tag harus diformat NDEF. Beberapa tag yang dibeli dalam jumlah banyak datang tidak terformat - tulis ke dalamnya dengan NFC.cool Tools untuk memformatnya secara otomatis.

---

## Tips untuk memaksimalkan tag NFC

Ini adalah pelajaran kecil yang saya pelajari dengan susah payah, sehingga Anda tidak perlu melakukannya.

1. **Beri label pada tag Anda.** Stiker kosong di meja tidak membantu. Gunakan pembuat label atau spidol untuk menunjukkan apa yang dilakukan tag ("Ketuk untuk Wi-Fi", "Mode Kerja", dll.).

2. **Hindari permukaan logam.** Logam mengganggu sinyal NFC. Jika Anda harus menempelkan pada logam, gunakan **tag NFC anti-logam** (tag ini memiliki lapisan ferit yang melindungi dari gangguan). Tag ini sedikit lebih tebal dan lebih mahal tetapi bekerja sempurna pada permukaan logam.

3. **Uji sebelum menempel.** Tulis tag, uji, kemudian kupas perekat dan tempelkan di tempatnya. Mengupas tag yang sudah ditempel untuk ditulis ulang adalah jenis gangguan kecil yang telah saya pelajari untuk dihindari sepenuhnya.

4. **Gunakan tag yang tepat untuk pekerjaan yang tepat.** Jangan buang NTAG216 (888 byte) untuk URL sederhana yang hanya membutuhkan 40 byte. Dan jangan mencoba memasukkan vCard lengkap ke NTAG213 (144 byte).

5. **Opsi tahan air ada.** Tag NFC berlapis epoxy tahan air dan lebih tahan lama. Bagus untuk penggunaan di luar ruangan, dapur, atau kamar mandi.

6. **Kombinasikan tag NFC dengan Shortcuts.** Kekuatan nyata tag NFC di iPhone bukan hanya membuka URL - melainkan memicu otomatisasi yang kompleks. Tag NFC dapat meluncurkan iOS Shortcut apa pun, yang dapat mengontrol perangkat rumah pintar, mengirim pesan, mencatat data, dan lainnya.

---

## Pertanyaan yang sering diajukan

### Bisakah saya menulis ulang tag NFC?

Ya, selama tag belum dikunci. Tag NFC standar dapat ditulis ulang **100.000+ kali**. Cukup tulis data baru di atas data lama - tidak perlu "menghapus" terlebih dahulu.

### Seberapa dekat iPhone saya perlu berada?

Dalam jarak **2-4 cm** (sekitar 1-2 inci). Antena NFC berada di tepi atas iPhone. Dekatkan bagian atas ponsel Anda langsung di atas tag untuk koneksi terbaik.

### Bisakah saya menulis ke tag NFC tanpa aplikasi?

iOS Shortcuts memiliki tindakan "Set NFC Tag" bawaan untuk penulisan dasar (URL, teks). Tetapi untuk kredensial Wi-Fi, kontak, dan rekaman yang lebih kompleks, Anda membutuhkan aplikasi seperti NFC.cool Tools.

### Apakah tag NFC membutuhkan baterai?

Tidak. Tag NFC bersifat **pasif** - tidak memiliki baterai dan mengambil daya dari pembaca NFC ponsel Anda saat Anda mengetuknya. Tag dapat bertahan **10+ tahun** karena tidak ada yang habis.

### Bisakah saya melindungi tag NFC dengan kata sandi?

Ya. NFC.cool Tools dapat mengatur perlindungan kata sandi pada tag NTAG, baik di iPhone maupun Android. Perhatikan bahwa ini hanya mencegah tag dari **ditimpa** - ini tidak menghentikan siapa pun dari **membaca** apa yang sudah ada di tag. Jika Anda membutuhkan konten itu sendiri tidak dapat dibaca tanpa kunci, Anda menginginkan data terenkripsi - lihat panduan kami tentang [NFC Safe](/blog/nfc-safe-encrypted-secrets/). Mengunci tag adalah opsi lain: ini secara permanen memblokir penulisan lebih lanjut.

### Apakah tag NFC berfungsi melalui casing ponsel?

Ya, sebagian besar casing ponsel tidak masalah. NFC berfungsi melalui plastik, silikon, kulit, dan bahkan dompet tipis. Casing yang sangat tebal (seperti casing kokoh yang berat) atau casing dengan pelat logam (untuk dudukan mobil magnetik) mungkin mengganggu.

### Berapa banyak tag yang bisa saya tulis dengan satu iPhone?

Tidak terbatas. Tidak ada batasan berapa banyak tag yang Anda tulis. Faktor pembatasnya adalah tag itu sendiri, bukan ponsel Anda.

---

## Apa selanjutnya?

Sekarang setelah Anda tahu cara menulis tag NFC, kemungkinannya terbuka lebar. Saran saya selalu sama: mulailah dengan satu proyek sederhana - tag Wi-Fi untuk tamu atau tag kartu nama - raih kemenangan kecil itu, dan bangun dari sana.

Jika Anda mencari aplikasi penulisan NFC yang powerful dan mudah digunakan, **[NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-en&mt=8)** adalah aplikasi yang saya bangun untuk menangani tepat ini - dari penulisan URL dasar hingga manajemen tag lanjutan, dengan integrasi iOS Shortcuts untuk otomatisasi.

Dan jika Anda ingin mengubah tag NFC menjadi kartu nama digital profesional, **[NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-en&mt=8)** memungkinkan Anda membuat profil kartu yang indah dan menulis URL-nya ke tag NFC mana pun. UI aplikasi dan App Clip mendukung 35 bahasa di iOS, dan penerima Android melihat situs web di domain nfc.cool (saat ini hanya bahasa Inggris).

**Unduh NFC.cool Tools:** [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-en&mt=8) | [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-en)

**Unduh NFC.cool Business Card:** [App Store](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-en&mt=8) | [Android (dalam NFC.cool Tools)](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-en)
