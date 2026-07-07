---
id: "amiibo-iphone-android-read-collect-backup-2026-07"
title: "Membaca, mengoleksi, dan mencadangkan Amiibo di iPhone dan Android"
date: "2026-07-02"
tags: ["announcements", "iphone", "android"]
summary: "Saya ingin NFC.cool menjadi aplikasi NFC terbaik di iPhone dan Android, jadi saya memberinya dukungan Amiibo penuh: pindai sebuah figur untuk melihat detailnya, bangun koleksi pribadi, dan cadangkan salah satunya ke NTAG215 kosong. Inilah cara kerja Amiibo yang sebenarnya di balik layar - dan mengapa aplikasi ini tidak menyertakan kunci apa pun."
image: "/assets/images/Blog/amiibo-iphone-android-read-collect-backup.webp"
imageAlt: "Sebuah figur koleksi NFC imajiner di samping ponsel yang menampilkan layar koleksi pribadi"
author: "Nicolo Stanciu"
metaTitle: "Amiibo di iPhone dan Android: membaca, mengoleksi, mencadangkan"
metaDescription: "NFC.cool membaca Amiibo di iPhone dan Android, menyimpan koleksi, dan mencadangkannya ke tag NTAG215 kosong. Cara kerja Amiibo di balik layar, beserta batasannya yang jujur."
ogTitle: "Membaca, mengoleksi, dan mencadangkan Amiibo di iPhone dan Android"
ogDescription: "Saya memberi NFC.cool dukungan Amiibo penuh - pindai, koleksi, dan cadangkan ke tag kosong. Inilah cara kerja Amiibo yang sebenarnya, dan mengapa aplikasi ini tidak menyertakan kunci apa pun."
---
Orang mengira ada sesuatu yang eksotis di dalam Amiibo. Semacam kepingan silikon buatan Nintendo yang tidak bisa Anda beli di tempat lain. Tidak ada. Yang tersegel di dalam alas figur itu adalah sebuah [NTAG215](/affiliate-links/) - chip stiker kosong yang sama yang saya baca dan tulis setiap hari, jenis yang dijual sepuluh dalam satu paket dengan harga receh. Memori sekitar 540 byte, sebuah nomor seri yang ditanamkan di pabrik, dan itulah keseluruhan figurnya. Plastiknya adalah bagian yang mahal. Chipnya nyaris hanya pelengkap.

Justru itulah yang mengganjal saya begitu lama. Saya membaca dan menulis tag NFC untuk mencari nafkah, dan ada satu kategori penuh dari tag itu - segelintir figur di rak dekat meja saya - yang justru diabaikan begitu saja oleh aplikasi saya sendiri. Saya ingin NFC.cool menjadi aplikasi NFC paling mumpuni yang bisa Anda pasang di ponsel, yang tidak menyisakan satu jenis tag pun.

Jadi saya duduk, dengan figur di satu sisi dan Switch saya di sisi lain, lalu memberi NFC.cool dukungan Amiibo yang sesungguhnya. Inilah hasilnya, dan apa yang saya pelajari sepanjang jalan - dimulai dari mengapa chip semurah ini ternyata begitu sulit disalin.

---

## Di mana letak keajaibannya?

Jika chipnya sebiasa ini, keajaibannya jelas bukan pada silikonnya. Melainkan pada byte-nya. Amiibo sebenarnya adalah buku catatan murah yang ditulisi Nintendo dengan kode rahasia, lalu ditandatangani di bagian bawah agar Anda bisa membedakan yang palsu dari yang asli. (Chipnya sendiri hanyalah [NTAG215](/blog/nfc-tag-types-for-iphones/) biasa, jika Anda ingin penjelasan lebih mendalam tentang jenis-jenis tag.)

Ada dua hal yang tersimpan dalam byte-byte itu. Yang pertama terbuka: sebuah blok kecil yang menyatakan karakter apa ini - Link, dari seri Legend of Zelda, dalam jajaran Amiibo tertentu. Itulah bagian yang dibaca Switch Anda untuk tahu bahwa sebuah figur baru saja disentuhkan. Bagian kedua terkunci: data simpanan yang sebenarnya, seperti nama panggilan, Mii milik pemilik, berapa kali figur itu telah digunakan, dan apa pun yang dicoret-coretkan game yang sedang berjalan ke dalam ruang catatan kecil yang boleh digunakannya. Bagian itu terenkripsi, dan ditandatangani.

## Mengapa Anda tidak bisa asal menyalin Amiibo

Data simpanan yang terenkripsi itu tidak dilindungi oleh satu kunci tetap yang bisa Anda cari sekali lalu pakai selamanya. Setiap tag memperoleh kuncinya sendiri, diturunkan secara langsung dari sekumpulan kunci induk yang dicampur dengan data yang diambil dari tag spesifik itu - termasuk nomor serinya yang unik. Di atas itu semua, keseluruhannya ditandatangani dengan HMAC. Ubah satu byte saja tanpa menandatanganinya ulang, dan konsol akan mengendus pemalsuan itu lalu menolak figurnya.

Nah, inilah jebakannya. Karena nomor seri tertanam baik dalam penurunan kunci maupun tanda tangannya, Anda tidak bisa membaca seluruh isi Amiibo asli lalu menyalinnya byte demi byte ke tag kosong. Tag kosong itu punya nomor seri berbeda, sehingga setiap kunci turunan menjadi berbeda, tanda tangannya tidak lagi cocok, dan konsol menolaknya. Pendekatan "tinggal salin semua halaman" yang tampak jelas itu selalu gagal.

Untuk membuat salinan yang sah, Anda harus menurunkan ulang kunci terhadap tag tujuan dan menandatangani ulang datanya agar sah untuk potongan plastik dan silikon tepat itu, bukan untuk tag asal Anda membacanya. Implementasi acuan yang dijadikan dasar oleh semua orang adalah sebuah alat bernama amiitool. Saya membangun ulang seluruh tarian itu secara native di dalam aplikasi - dari format tag ke format internal dan sebaliknya, penurunan kunci, enkripsi, penandatanganan - sehingga NFC.cool bisa melakukannya langsung di ponsel dalam genggaman Anda, tanpa komputer sama sekali.

## Apa yang bisa dilakukan NFC.cool sekarang

Tiga hal, dalam urutan yang mungkin akan Anda gunakan.

**Baca.** Tempelkan Amiibo ke bagian belakang ponsel Anda, sama seperti saat Anda [membaca tag NFC apa pun](/features/nfc-reader-writer/), dan NFC.cool langsung mengidentifikasinya: karakternya, seri game-nya, seri Amiibo-nya, jenis figurnya, dan gambar karyanya, beserta beberapa fakta dari tag itu sendiri, seperti berapa kali ia telah ditulis. Untuk ini tidak dibutuhkan kunci. Mengidentifikasi figur hanya menyentuh bagian yang memang sudah terbuka.

**Koleksi.** Setiap Amiibo yang Anda pindai disimpan ke My Collection, sebuah kisi sederhana berisi semua yang Anda miliki. Semuanya tersimpan di perangkat Anda - di iPhone, koleksi itu tersinkronisasi ke perangkat Apple Anda yang lain melalui iCloud - dan gambar karyanya di-cache sehingga koleksi tetap tampil benar saat Anda offline. Itu saja sudah mengubah rak kecil saya yang menyedihkan menjadi sesuatu yang benar-benar bisa saya telusuri.

**Cadangkan dan pulihkan.** Dengan kunci Anda sendiri yang telah diimpor, Anda bisa menulis salinan figur yang kuncinya telah diturunkan ulang ke sebuah NTAG215 kosong. Anda bisa mencadangkan langsung dari figur yang baru saja Anda pindai, atau memulihkan dari berkas dump `.bin` yang tersimpan di perangkat Anda. Aplikasi menurunkan ulang kunci untuk tag kosong yang Anda pegang dan menandatangani datanya untuk tag itu, sehingga salinannya sah menurut ketentuannya sendiri, bukan sekadar pemalsuan byte demi byte yang pasti gagal. Penulisannya bersifat permanen - begitu tag terkunci, ia terkunci selamanya - dan aplikasi menyatakannya dengan jelas sebelum Anda melanjutkan.

## Apa yang sengaja tidak disertakan

NFC.cool tidak menyertakan kunci Amiibo, dan tidak akan pernah menyertakannya. Tidak ada kunci yang disembunyikan di dalam aplikasi, dan tidak ada pustaka data Amiibo yang ditanamkan di dalamnya.

Membaca dan mengoleksi langsung berfungsi begitu saja karena keduanya hanya menyentuh bagian tag yang terbuka. Pencadangan berbeda: ia membutuhkan kunci induk, dan kunci itu milik Nintendo, bukan milik saya. Jika Anda sudah memperolehnya sendiri - baik `key.bin` gabungan, maupun dua berkas terpisah - Anda cukup mengimpornya sekali ke dalam aplikasi dan fitur pencadangan pun aktif. Jika belum, fitur itu tetap nonaktif. Saya membangun mesinnya; bahan bakarnya Anda yang bawa.

Saya rasa itulah garis yang jujur untuk ditapaki. Kemampuannya benar-benar berguna. Mencadangkan figur yang tinggal satu sore buruk dari hilang di tangan anak Anda, atau menaruh cadangan pada kartu murah alih-alih mempertaruhkan yang asli, adalah alasan nyata mengapa orang menginginkan ini. Saya lebih suka memberi Anda cara yang bersih dan pribadi untuk melakukannya di ponsel Anda sendiri ketimbang berpura-pura permintaan itu tidak ada. Tapi saya tidak akan membagikan sesuatu yang memang bukan hak saya untuk dibagikan.

## Sebagai catatan

Dua hal yang ingin saya sampaikan dengan terus terang.

Pertama, ini aplikasi saya, bukan Nintendo. NFC.cool tidak dibuat oleh, tidak berafiliasi dengan, tidak didukung oleh, maupun tidak disponsori oleh Nintendo. Amiibo, Nintendo Switch, dan judul-judul game yang saya sebutkan adalah merek dagang milik pemiliknya masing-masing, dan saya hanya menyebutnya agar Anda tahu dengan apa fitur ini kompatibel.

Kedua, perangkat pencadangan dan pemulihan ini ada untuk keperluan edukasi dan pribadi: melindungi figur yang sudah Anda miliki. Buat cadangan dari figur yang terus dijatuhkan anak Anda, atau simpan yang asli tetap dalam kotak sementara NTAG215 murah yang menanggung keausan sehari-hari. Itulah penggunaan yang saya rancang untuknya. Bawa kunci Anda sendiri, hanya cadangkan figur yang benar-benar Anda miliki, dan hormati hak Nintendo serta apa pun yang diatur hukum di tempat Anda tinggal. Apa yang Anda lakukan dengan perangkat ini adalah tanggung jawab Anda.

## Ini benar-benar berhasil

Saya tidak mau merilis ini hanya berdasarkan keyakinan, jadi saya mengujinya dengan satu-satunya cara yang benar-benar berarti.

Saya memindai salah satu figur milik saya sendiri, mencadangkannya ke NTAG215 kosong, dan membawa salinannya ke Switch saya. Saya membuka The Legend of Zelda: Tears of the Kingdom, menempelkan salinan itu ke Joy-Con kanan, dan ia menjatuhkan sejumlah item dalam game ke inventaris saya. Sama seperti yang asli. Tidak ada keluhan, tidak ada "Amiibo ini tidak dapat dibaca." Itulah momen ketika semuanya terasa nyata bagi saya. Semua perhitungan penurunan kunci dan susunan byte itu, dan hasilnya adalah stiker kosong murah yang dengan senang hati diperlakukan oleh konsol Nintendo sebagai figur asli.

---

Rak di samping meja saya kini bukan sekadar hiasan lagi. Ia sebuah fitur.

Jika Anda ingin mencobanya, perangkat Amiibo ada di NFC.cool untuk [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-amiibo-iphone-android-read-collect-backup-id&mt=8) dan [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-amiibo-iphone-android-read-collect-backup-id), berdampingan dengan semua yang telah saya bangun untuk membaca dan menulis tag. Bawa kunci Anda sendiri, tempelkan sebuah figur, dan lihat apa yang selama ini diam-diam diabaikan oleh aplikasi Anda.
