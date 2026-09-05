---
id: "ntag-424-dna-2026-07"
title: "NTAG 424 DNA: tag NFC yang membuktikan dirinya bukan palsu"
date: "2026-07-24"
tags: ["announcements", "nfc-tags", "industry"]
summary: "Saya mendengar merek-merek mewah menggunakan tag NTAG 424 DNA untuk membuktikan sebuah produk asli, jadi saya membeli satu kumpulan dari AliExpress untuk melihat apa fungsinya sebenarnya. Ternyata tag itu tak lebih dari NFC Tap Counter dengan lapisan kriptografis yang dipasang di atasnya, dan NFC.cool Tools kini membaca, memverifikasi, dan mengonfigurasinya sepenuhnya di iPhone dan Android - setiap kunci, izin setiap file, dan pengaturan chip itu sendiri."
image: "/assets/images/Blog/ntag-424-dna-counterfeit-proof-nfc-tags.webp"
imageAlt: "Tas kulit dengan tag autentikasi NFC di samping iPhone yang menampilkan perisai keamanan dan ikon kunci"
author: "Nicolo Stanciu"
metaTitle: "NTAG 424 DNA: tag NFC anti-pemalsuan dijelaskan"
metaDescription: "Saya membeli tag NTAG 424 DNA untuk melihat bagaimana merek membuktikan sebuah produk asli. Berikut cara kerja tag NFC anti-pemalsuan ini, dan bagaimana NFC.cool membaca, memverifikasi, dan memprogramnya."
ogTitle: "Tag NFC yang membuktikan dirinya bukan palsu"
ogDescription: "Bagaimana tag NTAG 424 DNA menangkap tiruan, dan bagaimana NFC.cool membaca, memverifikasi, dan mengonfigurasinya di iPhone dan Android."
---

Beberapa waktu lalu saya berulang kali menjumpai klaim yang sama secara sepintas: merek-merek mewah memasang chip NFC pada produk mereka sehingga Anda bisa mengetuk sebuah tas atau sepasang sepatu sneaker dengan ponsel dan tahu bahwa itu barang asli, bukan tiruan. Setiap artikel melontarkan kalimat manis yang sama dan tidak satu pun menjelaskan *bagaimana*. Apa sebenarnya yang membuat pemalsu tidak bisa sekalian menyalin chip itu bersama tas tangannya?

Jadi saya melakukan hal yang selalu saya lakukan ketika penasaran dengan sebuah tag. Saya masuk ke AliExpress, menemukan lapak yang menjual tag "NTAG 424 DNA", memesan satu kumpulan kecil, dan menunggu amplopnya datang. Beberapa euro, beberapa minggu, dan silikon yang sama dengan yang menjadi dasar sistem perlindungan merek itu kini tergeletak di meja saya. Lalu saya mengetuk salah satunya untuk melihat apa yang bisa dilakukannya.

---

## Apa sebenarnya tag NTAG 424 DNA itu

Dari luar ia adalah tag NFC biasa. Anda tidak akan bisa membedakannya dari setumpuk tag murah, dan ponsel mana pun membacanya tanpa keluhan. Jika Anda sudah membaca [panduan saya tentang jenis-jenis tag NFC](/blog/nfc-tag-types-for-iphones/), ia masuk sebagai satu lagi tag Type 4 yang dengan senang hati dibaca iPhone Anda.

Bagian "DNA"-lah yang membuatnya berbeda. Di dalamnya, chip menyimpan beberapa kunci AES-128 dan sebuah mesin kriptografis kecil, dan ia bisa melakukan sesuatu yang tidak bisa dilakukan NTAG215 biasa atau stiker dari sebuah multipack: ia bisa *menandatangani* setiap ketukan. Tanda tangan itulah intinya. Itulah perbedaan antara tag yang berkata "ini sebuah tautan" dan tag yang berkata "ini sebuah tautan, dan ini bukti kriptografis bahwa saya, chip asli spesifik ini, adalah yang menyajikannya, saat ini juga".

Itulah yang sebenarnya dibayar merek-merek mewah - bukan tautannya, melainkan bukti bahwa chip aslilah yang menyajikannya.

---

## Cara kerja SUN dan SDM: tautan yang menulis ulang dirinya setiap ketukan

Di titik inilah semuanya tiba-tiba masuk akal bagi saya. Ketika saya melihat apa yang sebenarnya dikirim tag tersebut, saya sadar bahwa saya sudah membangun hampir seluruh mekanisme yang dibutuhkan untuk memahaminya.

Awal tahun ini saya merilis [fitur NFC Tap Counter](/blog/count-nfc-tag-scans/): sebuah tag yang menghitung berapa kali ia sudah dibaca dan menaruh angka itu di dalam URL, sehingga sebuah tautan bisa tahu bahwa ini adalah kali ke-47 seseorang memindainya. Tag NTAG 424 DNA adalah ide yang sama, dengan lapisan enkripsi yang membungkusnya sehingga mustahil dipalsukan.

Mekanisme ini disebut **SUN** (Secure Unique NFC), atau **SDM** (Secure Dynamic Messaging) jika Anda membaca [datasheet NXP](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf). Anda menyimpan tautan biasa di tag, sesuatu seperti `https://example.com`. Tetapi Anda menyuruh chip untuk menulis ulang bagian-bagian dari tautan itu saat itu juga setiap kali diketuk. Jadi apa yang sebenarnya diterima ponsel Anda lebih mirip seperti ini:

`https://example.com/?picc_data=A1B2...&cmac=9F3C...`

Kedua nilai itu bukan hiasan. `picc_data` adalah salinan terenkripsi dari ID asli tag ditambah sebuah penghitung ketukan, diacak dengan kunci yang tidak pernah keluar dari chip. `cmac` adalah tanda tangan kriptografis atas data tersebut. Keduanya berubah setiap ketukan. Ketuk tag yang sama dua kali dan Anda mendapatkan dua URL yang sepenuhnya berbeda, masing-masing dengan tanda tangan baru dari chip.

Saya membayangkan tag NFC biasa sebagai papan tanda tercetak di etalase toko. Siapa pun bisa memotretnya dan mencetak salinan yang identik. Tag SUN lebih seperti seorang satpam yang menyerahkan kepada Anda sebuah struk baru, bernomor dan bercap secara individual setiap kali Anda masuk. Menyalin struk kemarin tidak ada gunanya bagi Anda, karena nomor hari ini berbeda dan hanya cap satpam itu yang asli.

---

## Mengapa tag NTAG 424 DNA tiruan tertangkap

Inilah bagian yang menjawab pertanyaan awal saya. Seorang pemalsu benar-benar bisa mengklon *isi* sebuah tag. Mereka bisa membaca URL-nya, menyalinnya byte demi byte, dan memprogramnya ke chip kosong. Itu memang sejak dulu bisa dilakukan.

Yang tidak bisa mereka lakukan adalah menghasilkan tanda tangan valid berikutnya. Kunci penandatangan berada di dalam chip asli dan tidak pernah keluar, bahkan saat ketukan berlangsung. Artinya sebuah ketukan hanya bernilai bagi sesuatu yang benar-benar memegang kuncinya. Dalam pengaturan perlindungan merek yang sesungguhnya, tautan tag mengarah ke server yang dijalankan pembuatnya, dan server itulah yang mendekripsi setiap ketukan, menghitung ulang tanda tangan untuk memastikan kuncinya cocok, dan melacak penghitung saat angkanya terus naik.

Bagian terakhir itulah yang menangkap tiruan. Satu-satunya URL yang bisa dipasang pemalsu pada barang palsu adalah URL yang mereka tangkap dari sebuah ketukan asli, dibekukan dengan penghitung yang kebetulan dibawa ketukan itu. Putar ulang, dan server akan mendapati angka yang sudah pernah dilihatnya, dan penghitung chip asli hanya bergerak maju, jadi sebuah pengulangan atau langkah mundur langsung membongkar pemutaran ulang itu. Untuk mengirim penghitung baru yang lebih tinggi dengan tanda tangan yang tetap lolos pemeriksaan, mereka butuh kuncinya, dan untuk mendapatkan kuncinya mereka harus membobol AES atau secara fisik membongkar chip. Tidak satu pun dari itu akan terjadi demi sebuah tas tangan palsu.

Itulah versi jujur dari kalimat pemasaran tersebut. Chip tidak membuat *produk* mustahil disalin. Ia membuat *bukti keaslian* mustahil disalin, dan ia memindahkan bukti itu ke sesuatu yang tidak bisa direproduksi oleh pemalsu.

---

## Apa saja yang ada di dalam chip

Semua yang dilakukan NFC.cool dengan tag-tag ini akan jauh lebih masuk akal begitu Anda punya gambaran tata letak chipnya di kepala, jadi inilah peta yang harus saya susun lebih dulu sebelum bisa menulis satu baris kode pun.

NTAG 424 DNA adalah tag NFC Forum Type 4 dengan memori 416 byte, yang tersusun sebagai satu aplikasi berisi tiga file tetap. Anda tidak bisa membuat atau menghapus file seperti pada MIFARE DESFire. Hanya tiga file inilah yang Anda dapatkan:

| File | Ukuran | Isinya |
| --- | --- | --- |
| File 01 | 32 byte | Capability container yang memberi tahu ponsel di mana data NDEF berada |
| File 02 | 256 byte | Pesan NDEF, biasanya tautan Anda. SUN mencerminkan nilai-nilai terbarunya ke file ini pada setiap pembacaan |
| File 03 | 128 byte | File proprietary yang bisa dijaga chip tetap terenkripsi. NFC.cool memakainya sebagai brankas, lebih lanjut di bawah |

Di samping file-file itu ada lima kunci AES-128, bernomor Key 0 sampai Key 4. **Key 0** adalah kunci utama aplikasi: dengan kunci inilah Anda mengautentikasi diri untuk mengubah tautan, menyalakan SUN, mengganti kunci lain mana pun, atau menyentuh konfigurasi chip. Key 1 sampai Key 4 tidak berbuat apa-apa dengan sendirinya. Kunci-kunci itu baru berarti begitu hak akses sebuah file atau pengaturan SUN mengarah kepadanya. Pada tag yang masih baru, kelima kunci berisi enam belas byte nol dan file NDEF-nya bisa ditulis siapa saja, itulah sebabnya tag baru menerima tautan biasa tanpa basa-basi apa pun.

Setiap perintah yang mengubah sesuatu berjalan di dalam sesi terautentikasi: ponsel dan chip saling membuktikan diri lewat challenge-response dengan salah satu kunci itu, menurunkan kunci sesi darinya, dan sejak saat itu setiap perintah membawa MAC atau dienkripsi seluruhnya. Itulah yang disebut secure messaging, istilah yang akan terus muncul di sisa tulisan ini. NFC.cool mengimplementasikannya secara penuh, di iPhone maupun Android, dan setiap penulisan yang dijelaskan di bawah melewatinya.

---

## Apa yang terungkap dari satu ketukan

Tempelkan sebuah tag ke ponsel Anda, dan NFC.cool Tools di [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-id&mt=8) atau [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-id) langsung melakukan pembacaan mendalam tanpa meminta apa pun dari Anda: identitas chip dan apakah ia varian TagTamper, tautannya, pengaturan serta hak akses setiap file, slot kunci mana saja yang sudah diubah dari setelan pabrik, dan hasil dari tiga pemeriksaan terpisah.

### Apakah ini silikon NXP asli?

Setiap NTAG 424 DNA meninggalkan pabrik dengan sebuah **tanda tangan orisinalitas**: tanda tangan ECDSA atas UID tujuh byte milik chip itu sendiri, dibuat dengan kunci privat NXP pada kurva P-224. NFC.cool membacanya dan memverifikasinya terhadap kunci publik yang dipublikasikan NXP, langsung di ponsel, tanpa kunci apa pun dari Anda. Jika lolos, aplikasi menampilkan "NXP Asli". Itu menjawab pertanyaan pertama: apakah ini silikon NXP sungguhan, atau chip tiruan yang sekadar mengaku bernama sama?

### Apakah ketukan ini asli?

Inilah pemeriksaan SUN. Aplikasi mengambil `picc_data` dan `cmac` dari tautan yang baru saja disajikan tag, mendekripsi data PICC untuk mendapatkan UID dan penghitung pembacaannya, menghitung ulang CMAC-nya, lalu membandingkannya dengan yang dikirim tag. Jika keduanya cocok, Anda melihat "Asli" dan angka penghitungnya muncul sebagai Penghitung Pembacaan.

Pemeriksaan ini membutuhkan kunci tag, karena memang itulah intinya. Tag yang masih memakai kunci pabrik terverifikasi dengan kunci serba nol. Tag yang sudah Anda kunci dengan kunci sendiri terverifikasi dengan kunci yang disimpan NFC.cool saat Anda mengaturnya. Tag yang dikunci orang lain dengan kunci yang tidak Anda miliki menampilkan "Tidak terverifikasi", dan itu memang jawaban yang benar.

### Apakah segelnya pernah dibuka?

Salah satu versi chip ini, **NTAG 424 DNA TagTamper**, dibuat untuk menjadi segel yang memperlihatkan jejak pembukaan. Wujudnya stiker dengan jalur konduktif tipis yang membentang di dalamnya. Anda menempelkannya melintasi apa pun yang ingin dilindungi, di atas penutup kotak atau mengelilingi tutup botol, tugas yang sama seperti stiker "garansi hangus jika rusak" yang ada sekarang. Buka barangnya, stikernya robek, dan jalur tadi pun terputus.

Chip melacak dua hal tentang jalur itu: sebuah penanda permanen yang mencatat apakah segel itu *pernah* dibuka, dan kondisi sesungguhnya saat ini. NFC.cool membaca keduanya pada setiap ketukan dan melaporkan "Tersegel", "Telah Dibuka", atau yang paling penting, "Sudah dibuka, lalu ditutup kembali": seseorang memutus jalur itu lalu menutupnya kembali dengan hati-hati. Penandanya hanya berjalan satu arah, jadi kotak yang disegel ulang akan tetap terbaca sebagai telah dibuka sepanjang umur chip. Kriptonya membuktikan chipnya asli. Yang ini membuktikan tidak ada yang pernah membuka kotaknya.

---

## Memprogram tag sendiri: versi singkatnya

Membaca baru separuhnya. Separuh lainnya: tag kosong dari AliExpress itu bebas Anda program, dan penyiapan minimalnya hanya tiga langkah.

1. **Tulis tautan Anda.** Penulisan NDEF biasa, sama seperti pada tag lain mana pun.
2. **Nyalakan SUN.** Aplikasi menulis tautan Anda dengan placeholder dan menyuruh chip mencerminkan UID terenkripsi, penghitung ketukan, dan tanda tangannya ke placeholder itu pada setiap pembacaan. Sejak saat itu setiap ketukan menghasilkan URL unik yang bertanda tangan.
3. **Atur Key 0 milik Anda sendiri.** Ini menggantikan nol-nol bawaan pabrik dengan kunci yang hanya Anda ketahui, sehingga tidak ada orang lain yang bisa mengonfigurasi ulang tag itu.

Untuk langkah terakhir itu Anda mengetik passphrase, bukan kunci. NFC.cool menurunkan kunci AES darinya dengan mengambil 16 byte pertama dari hash SHA-256 passphrase tersebut, dengan cara yang sama di iPhone dan Android, sehingga tag yang Anda siapkan di satu platform bisa dibuka dengan passphrase yang sama di platform satunya. Jika Anda lebih suka memakai kunci yang dibuat di tempat lain, misalnya oleh server Anda sendiri, Anda bisa langsung menempelkan 32 karakter hex-nya.

Kunci yang hilang berarti tag yang tidak akan pernah bisa dikonfigurasi ulang lagi, jadi aplikasi sangat berhati-hati dalam menyimpannya. Di iPhone kunci masuk ke Keychain dan tersinkron lewat iCloud Keychain. Di Android kunci dienkripsi dengan kunci yang dilindungi perangkat keras dan dicerminkan ke Block Store, sehingga tetap bertahan setelah pemasangan ulang atau pindah ke ponsel baru. Kunci baru disimpan lebih dulu sebelum perubahannya dikirim, dan jika ketukan terputus di tengah proses, nilai lama dan nilai baru sama-sama tetap tersedia sampai tag mengonfirmasi mana yang dipegangnya. Passphrase yang Anda atur di perangkat lain juga bisa dimasukkan, dan aplikasi memeriksanya terhadap tag sebelum menyimpannya.

Satu hal yang sengaja ditolak aplikasi: menulis tautan biasa ke tag yang SUN-nya aktif melalui layar tulis biasa. Posisi pencerminannya (offset) sudah terpatok pada URL yang dipakai saat dikonfigurasi, dan URL dengan panjang berbeda akan membuat chip mencerminkan nilai-nilainya ke tengah-tengah konten baru Anda pada setiap ketukan. Layar NTAG 424 mematikan SUN lebih dulu, baru menulis.

---

## Bagian chip yang lain

Kebanyakan tutorial berhenti di versi singkat itu, dan sampai sekarang satu-satunya jalan untuk melangkah lebih jauh adalah TagXplorer dari NXP di desktop dengan pembaca USB. Saya ingin seluruh datasheet bisa dijangkau dari ponsel, jadi saya menyusurinya bagian demi bagian.

### Kelima kunci

Key 0 punya layarnya sendiri, dan Key 1 sampai Key 4 berada di bawah Lanjutan. Masing-masing bisa diatur dari passphrase atau hex, direset ke bawaan pabrik, atau dimasukkan setelah diatur di perangkat lain. Setiap perubahan diautentikasi dengan Key 0, satu-satunya yang berwenang mengubah kelima slot.

### SUN dengan kunci pilihan Anda

Menyalakan SUN bukan sekadar membalik satu sakelar. Anda memilih **mode**-nya: terenkripsi, yang menyembunyikan UID di dalam `picc_data` sehingga hanya pemegang kunci yang bisa membacanya, atau teks biasa, yang menampilkan UID dan penghitung secara terbuka di URL dan hanya merahasiakan tanda tangannya. Dan Anda memilih kunci mana yang dipakai: sebuah **kunci meta-read** yang mengenkripsi data PICC dan sebuah **kunci file-read** yang menghitung tanda tangannya. Keduanya bisa memakai slot yang sama atau dua slot yang berbeda, dan begitulah sebuah merek bisa menyerahkan kunci untuk memverifikasi ketukan kepada mitranya tanpa ikut menyerahkan kunci yang mendekripsi UID.

Aplikasi memperingatkan Anda jika memilih slot yang masih berisi nol bawaan pabrik, karena tanda tangan yang dibuat dengan kunci yang sudah diketahui semua orang tidak melindungi apa pun. Dan sisi verifikasinya mengerti semua kombinasi itu: ketukan yang ditandatangani dengan Key 3 dan dienkripsi dengan Key 1 tetap terverifikasi dengan benar selama kedua kunci itu tersimpan di ponsel.

### Hak akses file

Setiap file membawa empat izin: Baca, Tulis, Baca & Tulis, dan Ubah, dan yang terakhir menentukan siapa yang boleh mengedit tiga izin lainnya. Setiap izin mengarah ke salah satu dari lima kunci, ke Bebas (siapa saja), atau ke Tidak pernah (tidak seorang pun, selamanya). Jadi Anda bisa menetapkan "siapa saja boleh membaca File 02, hanya Key 2 yang boleh menulisnya, dan hanya Key 0 yang boleh mengubah aturan ini", dan chip menegakkannya sendiri tanpa perlu aplikasi apa pun di tengahnya.

NFC.cool menampilkan hak akses setiap file saat ini dan membiarkan Anda mengeditnya, dengan dua peringatan bawaan. Ia memberi tahu ketika sebuah izin mengarah ke kunci yang tidak dipegang ponsel ini, karena bisa jadi Anda justru sedang menutup akses Anda sendiri. Dan ia mewajibkan konfirmasi lewat langkah terpisah sebelum mengatur Ubah ke Tidak pernah, karena begitu tertulis, aturan file tersebut membeku sepanjang umur chip.

### Konfigurasi chip

Di bawah file-file itu ada konfigurasi chip itu sendiri, yang dibuka NXP lewat satu perintah SetConfiguration. NFC.cool mencakup opsi-opsi berikut:

- **UID Acak.** Normalnya chip melaporkan UID tetap yang sama ke setiap pembaca, sehingga siapa pun bisa melacak sebuah tag dari ketukan ke ketukan. Dengan UID Acak aktif, chip menjawab dengan ID acak yang baru setiap kali dan baru mengungkap UID aslinya setelah Anda terautentikasi. Keuntungan privasi yang nyata, dan permanen. Aplikasi mengenali tag lewat UID-nya, jadi setelah itu ia memulihkan UID asli dengan mencoba setiap Key 0 yang diketahuinya melalui GetCardUID terautentikasi, dan tag tetap bisa dikelola di ponsel yang menyiapkannya.
- **Batas kegagalan autentikasi.** Berapa kali percobaan dengan kunci salah yang ditoleransi chip sebelum ia mengunci Key 0. Ini perlindungan dari upaya menebak kunci, tetapi atur terlalu rendah dan beberapa ketukan yang gagal saja sudah bisa mengunci kunci utama untuk selamanya.
- **Kekuatan modulasi balik.** Kuat atau standar. Standar bisa tidak terbaca pada antena kecil, jadi paling aman biarkan saja pada setelan bawaannya.
- **Penulisan berantai.** Bisa dinonaktifkan sehingga satu kali penulisan dibatasi hanya satu frame. Permanen.
- **Byte kapabilitas.** Dua byte bebas yang disisakan NXP untuk keperluan Anda sendiri.
- **LRP.** Sakelar secure messaging, yang mendapat bagiannya sendiri di bawah.

### Brankas

File 03 adalah file proprietary 128 byte yang bisa dijaga chip tetap terenkripsi, dan NFC.cool mengubahnya menjadi tempat penyimpanan pribadi kecil di tag itu sendiri. Saat pertama kali Anda menyimpan sesuatu, aplikasi mengalihkan file itu ke mode terenkripsi penuh dan mengunci semua hak aksesnya ke Key 0. Setelah itu, brankas menampung hingga 126 byte teks yang hanya bisa dibaca kembali dengan kunci Anda, dan pembacaan mendalam dari ponsel lain mana pun hanya akan mendapat pesan kesalahan izin, tidak lebih.

Ini untuk rahasia yang seharusnya ikut bersama bendanya, bukan mengendap di database seseorang: nomor seri, catatan untuk diri Anda di masa depan, token yang diharapkan server Anda sendiri. Mereset Key 0 ke bawaan pabrik menghapusnya, dan hanya dengan cara itulah brankas ini lenyap.

---

## Mode LRP

Normalnya chip melindungi kunci-kuncinya dengan AES biasa, dan mencuri sebuah kunci berarti membobol AES itu sendiri. Tetapi ada jalur serangan yang lebih licik. Taruh chip di meja kerja, ukur variasi samar pada tarikan daya dan pancaran elektromagnetiknya saat ia menjalankan cipher, dan dengan cukup banyak jejak seperti itu Anda bisa merekonstruksi kuncinya dari kebocoran itu saja, tanpa pernah menyentuh matematikanya. **LRP**, Leakage-Resilient Primitive, adalah saluran aman yang dibangun ulang, dirancang supaya kebocoran itu tidak menyisakan apa pun yang bisa dijadikan pegangan. NXP mendokumentasikannya di AN12304, dan ini benar-benar berlebihan untuk stiker di botol anggur, itulah sebabnya kebanyakan tag tidak pernah menyalakannya dan kebanyakan alat tidak pernah belajar berbicara dengannya.

Dalam catatan desain saya untuk versi pertama, tepat di samping "mode LRP", saya menulis "tidak direncanakan". Tapi hal itu terus mengusik saya, jadi saya membangunnya. NFC.cool bisa mengalihkan sebuah tag ke mode LRP dan, yang lebih penting, tetap bisa mengautentikasi diri kepadanya dan mengelolanya setelah itu: kunci, hak akses file, brankas, konfigurasi chip, semuanya lewat saluran LRP alih-alih AES.

Dua hal yang perlu Anda ketahui sebelum membalik sakelar itu. Ini permanen: begitu sebuah tag masuk mode LRP, secure messaging AES-nya dinonaktifkan selamanya, dan alat mana pun yang hanya bisa berbicara AES tidak akan pernah bisa berbicara dengannya lagi. Dan SUN tidak tersedia pada tag LRP, jadi tag yang tugasnya menandatangani ketukan sebaiknya tetap di mode AES.

---

## Perubahan yang tidak bisa dibatalkan

Banyak dari perintah ini bersifat permanen, dan aplikasi menyuarakannya dengan lantang tepat saat Anda hendak melakukannya: setiap tindakan yang tidak bisa dibalik mengharuskan Anda mengonfirmasi lewat peringatan yang menjabarkan konsekuensi persisnya. Meski begitu, daftarnya layak ditulis di sini juga.

- Mengaktifkan LRP.
- Mengaktifkan UID Acak.
- Menonaktifkan penulisan berantai.
- Mengatur izin Ubah sebuah file ke Tidak pernah.
- Kehilangan kunci. Chip ini tidak punya reset pabrik. Jika Key 0 hilang, hilang pula kemampuan Anda untuk mengonfigurasi ulang tag.
- Batas kegagalan autentikasi yang diatur terlalu rendah, yang bisa mengunci Key 0 setelah beberapa ketukan yang salah.

Berlatihlah pada tag cadangan sebelum Anda menyentuh tag yang Anda pedulikan.

---

## Di mana tag NFC anti-pemalsuan benar-benar digunakan

Jujur saja? Kebanyakan orang yang mengetuk tag NFC tidak pernah membutuhkan semua ini, dan itu tidak masalah. Stiker yang membuka sebuah tautan adalah benda yang luar biasa, membosankan, dan berguna.

Tetapi begitu Anda pernah memegang salah satu tag ini, kegunaannya langsung terlihat jelas. Tas mewah bisa membuktikan dirinya asli. Sebotol anggur atau wiski bisa menunjukkan bahwa ia tidak pernah diam-diam dibuka lalu diisi ulang, dengan segel anti-perusakan yang menjaga sisi itu. Sekotak obat menjamin baik obat asli di dalamnya maupun segel yang tidak pernah dirusak siapa pun. Tiket acara berhenti menjadi sesuatu yang bisa Anda tangkap layar lalu bagikan ke sana-sini, dan tag di dekat pintu membuktikan bahwa seseorang benar-benar berdiri di sana, alih-alih memutar ulang tautan tersimpan dari sofanya. Ini masalah keaslian yang sama yang sedang didekati [Paspor Produk Digital UE](/blog/eu-digital-product-passport-2026/) dari sisi regulasi, dipecahkan pada tingkat objek individual.

Saya tidak membangun ini karena seribu pengguna memintanya. Saya membangunnya karena saya membeli beberapa tag aneh dari internet karena rasa penasaran, memahami cara kerjanya, dan kemudian tidak sanggup membiarkan satu halaman pun dari datasheet itu tak terbuka. Biasanya begitulah fitur-fitur yang bagus bermula.

---

## Kesimpulan akhir tentang tag NTAG 424 DNA

Tag NTAG 424 DNA adalah hal yang paling mendekati segel anti-perusakan yang dimiliki NFC. Tag ini tidak bisa menghentikan seseorang menyalin sebuah produk, tetapi membuat *bukti keaslian* produk tersebut mustahil dipalsukan, karena bukti itu adalah tanda tangan kriptografis baru yang hanya bisa dihasilkan chip asli.

NFC.cool Tools membacanya, memverifikasi chip, ketukan, dan segel anti-perusakannya, lalu menyerahkan seluruh chip kepada Anda untuk dikonfigurasi: setiap kunci, izin setiap file, pengaturan chip itu sendiri, bahkan LRP, semuanya dari ponsel Anda. Jika Anda pernah bertanya-tanya bagaimana sebuah ketukan bisa membedakan asli dari palsu, dapatkan di [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-id&mt=8) atau [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-id), pesan beberapa [tag ini](/affiliate-links/) seharga beberapa euro, dan ketuk sendiri salah satunya. Ini benar-benar topik yang asyik untuk didalami.
