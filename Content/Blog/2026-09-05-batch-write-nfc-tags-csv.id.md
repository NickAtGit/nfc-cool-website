---
id: batch-write-nfc-tags-csv-2026-09
title: "Cara menulis banyak tag NFC sekaligus dari spreadsheet"
date: 2026-09-05
tags: ["guides", "nfc-tags", "iphone"]
summary: "Saya membagikan kode promo App Store lewat tag NFC di konferensi dan meetup, sampai sekarang sudah ratusan. Begini cara saya menulisnya, dan caranya berlaku untuk daftar apa pun: susun di spreadsheet, ekspor ke CSV, pindahkan filenya ke ponsel, lalu biarkan NFC.cool Tools menulis tag satu demi satu."
image: "/assets/images/Features/nfc-reader-writer-csv-batch-write.webp"
imageAlt: "iPhone menampilkan file spreadsheet di layar sambil menulis baris demi baris dari spreadsheet ke deretan tag NFC"
author: "Nicolo Stanciu"
metaTitle: "Tulis tag NFC massal dari file CSV di iPhone dan Android"
metaDescription: "Program ratusan tag NFC dari satu spreadsheet: susun daftarnya, ekspor ke CSV, pindahkan ke ponsel, lalu biarkan NFC.cool Tools menulis tag demi tag."
ogTitle: "Tulis tag NFC massal dari spreadsheet"
ogDescription: "Dari file CSV di komputer sampai setumpuk tag NFC yang sudah terisi, cukup satu tempel per tag. Begini cara saya menyiapkan ratusan tag kode promo untuk konferensi."
---
Saya sering datang ke konferensi dan meetup untuk memperlihatkan aplikasi saya kepada orang lain, dan kalau obrolannya menyenangkan, di akhir saya suka memberikan tag NFC berisi kode promo. Tempelkan tag itu ke ponsel, App Store terbuka dengan kodenya sudah terisi, dan aplikasinya langsung jadi milik Anda.

Tagnya sendiri tidak pernah jadi masalah. Jumlahnya yang jadi masalah. Setiap kode promo berbeda, jadi setiap tag butuh tautannya sendiri, dan saya ingin punya beberapa ratus. Menulisnya satu per satu di aplikasi jelas tidak masuk akal pada jumlah sebanyak itu. Karena itulah saya membangun **penulisan batch CSV** ke dalam NFC.cool Tools: saya menyusun daftarnya di Mac, mengekspornya sebagai CSV, memindahkan filenya ke ponsel, lalu menempelkan tag satu demi satu ke ponsel sementara aplikasi memproses baris demi baris. Sampai sekarang sudah ratusan tag yang saya tulis dengan cara ini.

Berikut seluruh prosesnya, dari spreadsheet sampai tag terakhir. Caranya sama persis untuk tautan produk, nomor seri, kredensial Wi-Fi, atau apa pun yang bisa Anda masukkan ke dalam sebuah sel spreadsheet.

---

## Apa yang sebenarnya dilakukan penulisan batch CSV

Anda memberikan file CSV ke aplikasi, dan setiap baris menjadi satu tag. Aplikasi menampilkan pratinjau isi setiap tag, Anda mengetuk Mulai Menulis, lalu menempelkan tag satu demi satu ke ponsel. Setiap baris yang sudah ditulis dihapus dari file, sehingga daftar di layar selalu menunjukkan apa yang masih tersisa. Anda bisa berhenti kapan saja dan melanjutkannya nanti, bahkan beberapa hari kemudian.

Kalau Anda belum pernah menulis tag NFC sama sekali, mulailah dari [panduan saya menulis tag NFC dengan iPhone](/blog/write-nfc-tags-iphone/). Tulisan ini khusus membahas cara menulis tag dalam jumlah banyak.

---

## Langkah 1: Susun spreadsheet di komputer

Buka Numbers, Excel, atau Google Sheets dan buat daftarnya di komputer. Jauh lebih cepat daripada mengerjakan apa pun di ponsel, dan spreadsheet bisa menyusun tautannya untuk Anda.

Tata letak paling sederhana adalah **satu kolom, satu baris per tag**. Setiap baris persis berisi apa yang akan masuk ke satu tag. Sebuah kolom tautan produk terlihat seperti ini:

```
https://example.com/products/1001
https://example.com/products/1002
https://example.com/products/1003
```

Kalau nilai-nilainya hanya berbeda pada angka atau ID, biarkan rumus yang menyusun kolomnya. Ketik yang pertama, tarik ke bawah, dan daftarnya langsung jadi, mau sepanjang apa pun. Kalau ID-nya sudah ada di sebuah file, buka file itu di spreadsheet dan tambahkan bagian tetapnya di depan dengan rumus.

Aplikasi melihat awalan setiap nilai dan memilih jenis record yang sesuai:

- Tautan (`https://`, `http://`, atau `www.`) menjadi record URL. Tempelkan tag, dan browser membukanya.
- `tel:`, `mailto:`, `sms:`, dan `geo:` menjadi aksi yang sesuai, jadi sebuah tag bisa memanggil nomor, memulai email, atau membuka lokasi.
- `WIFI:T:WPA;S:MyNetwork;P:secret;;` menjadi record Wi-Fi, format yang sama dengan kode QR Wi-Fi. Ada satu jebakan: string itu mengandung titik koma, jadi aplikasi akan mengira file Anda dipisahkan titik koma dan memecahnya menjadi beberapa bagian. Atur pemisahnya ke koma di aplikasi, dan barisnya tetap utuh.
- `shortcuts://` menjalankan Pintasan iOS.
- Nilai lain di luar itu ditulis sebagai teks biasa.

Jaga agar setiap nilai tetap dalam satu baris. File dibaca baris demi baris, jadi kartu kontak yang membentang beberapa baris akan tersebar ke beberapa tag.

Dua hal yang perlu diperhatikan:

1. **Jangan pakai baris judul.** Aplikasi memperlakukan setiap baris yang tidak kosong sebagai isi. Kalau baris pertama Anda berbunyi "URL", tag pertama akan berisi kata URL.
2. **Baris kosong tidak masalah.** Baris kosong dilewati, begitu juga spasi di sekitar nilai.

### Kalau satu tag butuh beberapa record

Kadang satu tag harus membawa lebih dari satu hal, misalnya situs web, nomor telepon, dan alamat email untuk setiap orang. Tambahkan kolom untuk itu. Di aplikasi, pada pilihan **Kelompokkan berdasarkan** pilih **Per Baris**, dan setiap baris menjadi satu tag dengan satu record per sel. **Per Kolom** melakukan kebalikannya dan mengubah setiap kolom menjadi satu tag, kalau-kalau Anda menyusun lembarnya dengan arah sebaliknya. Untuk file satu kolom, yang tersedia adalah pengaturan **Baris per tag**, sehingga tiga baris bisa masuk ke satu tag sebagai tiga record.

---

## Langkah 2: Ekspor sebagai CSV

File CSV adalah file teks biasa. Satu baris teks untuk setiap baris tabel, dan sel-sel dalam satu baris dipisahkan oleh koma, titik koma, atau tab. Kalau Anda membukanya di TextEdit atau Notepad, Anda melihat persis apa yang akan dilihat aplikasi. Lembar dengan tautan dan nomor telepon per orang terlihat seperti ini setelah diekspor:

```
https://example.com/anna,tel:+4915112345678
https://example.com/ben,tel:+4915198765432
```

Pemformatan dan rumus tidak ikut terbawa saat ekspor, hanya nilainya. Berikut cara mengeluarkan file itu dari Numbers, Excel, dan Google Sheets.

### Numbers di Mac

1. Pilih **File**, lalu **Ekspor ke**, lalu **CSV**.
2. Kalau dokumen Anda punya lebih dari satu tabel, Numbers bertanya apakah ingin membuat satu file per tabel atau menggabungkannya. Yang Anda mau adalah satu tabel dalam satu file.
3. Biarkan **Sertakan nama tabel** tidak dicentang. Kalau tidak, Numbers menulis nama tabel ke dalam file sebagai baris tersendiri, dan baris itu akan berakhir di sebuah tag.
4. Di bagian **Pilihan Lanjutan**, biarkan pengkodean teks pada Unicode (UTF-8).
5. Klik **Berikutnya**, beri nama filenya, lalu klik **Ekspor**.

Dua catatan soal Numbers: setiap tabel baru datang dengan baris judul yang diarsir, dan apa pun yang Anda ketik di sana ikut diekspor seperti baris lainnya, jadi biarkan kosong atau hapus saja. Dan Numbers selalu memakai koma. Kalau sebuah nilai mengandung koma, Numbers membungkusnya dengan tanda kutip, dan aplikasi tidak membuang tanda kutip itu. Jadi hindari koma di dalam nilai kalau Anda mengekspor dari Numbers.

### Excel di Mac atau Windows

1. Pilih **File**, lalu **Simpan Sebagai** (di beberapa versi namanya Simpan Salinan).
2. Pilih format **CSV UTF-8 (Dipisahkan koma) (.csv)**.
3. Excel hanya menyimpan lembar yang sedang Anda buka dan memperingatkan bahwa pemformatan akan hilang. Konfirmasi saja, Anda tidak butuh pemformatannya.

Meski namanya begitu, Excel tidak selalu memakai koma. Excel memakai pemisah daftar dari pengaturan wilayah sistem Anda, dan pada pengaturan wilayah Indonesia, begitu juga Jerman, Prancis, dan kebanyakan negara Eropa, pemisahnya adalah titik koma, karena koma di sana sudah dipakai sebagai pemisah desimal. Anda tidak perlu mengubah apa pun. NFC.cool mendeteksi koma, titik koma, dan tab secara otomatis. Itu juga berarti nilai Anda boleh mengandung koma.

### Google Sheets

1. Pilih **File**, lalu **Download**, lalu **Nilai yang dipisahkan koma (.csv)**.
2. Hanya lembar yang sedang aktif yang diekspor, selalu dengan koma.

### Sebelum memindahkan filenya

Saya selalu membuka file hasil ekspor di editor teks sekali sebelum mengirimnya ke ponsel. Yang Anda mau: satu baris per tag, tanpa baris judul, tanpa tanda kutip di sekeliling nilai, dan tanpa koma nyasar di dalam file yang dipisahkan koma. Kalau sebuah nilai memang harus mengandung koma, ekspor dengan titik koma dari Excel, atau pakai ekspor TSV di Numbers (dipisahkan tab) lalu ubah nama filenya supaya berakhiran `.csv`. Di iPhone, nama file memang harus berakhiran `.csv` apa pun caranya, karena itulah yang disaring oleh pemilih file.

---

## Langkah 3: Pindahkan file ke ponsel

Cara apa pun yang berujung di aplikasi File di iPhone, atau di lokasi yang bisa dijangkau pemilih file sistem di Android, bisa dipakai.

- Kirim filenya lewat **AirDrop** dari Mac ke iPhone dan pilih Simpan ke File.
- **iCloud Drive:** simpan CSV ke iCloud Drive di Mac dan filenya muncul di aplikasi File di ponsel. Google Drive dan Dropbox bekerja dengan cara yang sama, aplikasi File juga bisa menjelajahinya.
- **Kirim email ke diri sendiri** dan simpan lampirannya.
- **Android:** Quick Share dari laptop, Google Drive, atau kabel USB. Aplikasi memakai pemilih dokumen sistem, jadi lokasi apa pun yang bisa dibukanya tidak masalah.

---

## Langkah 4: Impor dan periksa pratinjaunya

Di NFC.cool Tools, buka layar Alat NFC dan cari **Menulis Batch CSV** di bagian **Mode Batch**. Di Android, fitur ini juga ada di daftar alat NFC. Ketuk **Impor CSV** dan pilih file Anda.

Aplikasi membuat salinan filenya sendiri. Saat Anda menulis tag, baris-baris dihapus dari salinan itu. Spreadsheet asli di komputer Anda tetap utuh, jadi Anda selalu punya daftar lengkapnya.

Begitu file dipilih, aplikasi menampilkan apa yang terdeteksi: pemisahnya, jumlah kolom, mode pengelompokan, dan berapa tag yang Anda butuhkan. Satu angka yang selalu saya periksa adalah **Byte per tag NFC**, yaitu ukuran pesan terbesar dalam batch itu. Bandingkan dengan tag Anda. NTAG213 menampung 144 byte, NTAG215 504 byte, dan NTAG216 888 byte. Tautan pendek sekitar 50 byte, jadi tag paling murah pun cukup untuk tautan. Record Wi-Fi atau kartu kontak yang lebih panjang butuh 215 atau 216. Kalau tidak yakin chip mana yang Anda punya, lihat [panduan saya tentang jenis-jenis tag NFC](/blog/nfc-tag-types-for-iphones/).

Buka **Pratinjau Batch** untuk melihat setiap tag beserta record yang akan diterimanya. Yang Anda lihat di sana persis sama dengan yang akan ditulis.

---

## Langkah 5: Tulis setumpuk tagnya

Ketuk **Mulai Menulis** dan tempelkan tag pertama ke tepi atas iPhone Anda. Begitu ponsel bergetar, tag itu sudah tertulis dan Anda ambil tag berikutnya. Baris yang baru saja ditulis hilang dari daftar, dan penghitungnya memberi tahu berapa yang tersisa.

Beberapa hal yang akan Anda alami, dan semuanya normal:

- **Lembar pemindaian menghilang setelah 60 detik.** Itu batasan iOS, bukan aplikasinya yang crash. Lembar itu muncul kembali sendiri setelah beberapa detik dan Anda melanjutkan dari posisi terakhir.
- **Ada tag yang gagal.** Mungkin tagnya terkunci, mungkin Anda menariknya terlalu cepat. Barisnya tetap ada di file, aplikasi tidak melompat ke baris berikutnya, dan Anda tinggal menempelkan tag itu lagi atau mengambil tag lain.
- **Anda harus berhenti di tengah jalan.** Tutup aplikasi, kerjakan hal lain, kembali besok. File mengingat apa yang masih tersisa. Di Android, aplikasi menampilkan batch yang belum selesai dan menawarkan untuk melanjutkannya.

Seratus tag tidak butuh waktu lama begitu Anda sudah menemukan ritmenya.

---

## Yang saya pelajari setelah menulis ratusan tag seperti ini

**Tulis dua tag dulu.** Lalu baca kembali dengan aplikasi dan pastikan tag itu melakukan apa yang seharusnya. Baru setelah itu tulis sisanya.

**Anda tidak butuh chip terbesar.** Untuk tautan, NTAG213 sudah cukup dan jauh lebih murah kalau dibeli dalam jumlah banyak. Simpan NTAG216 untuk kartu kontak dan Wi-Fi.

**Kunci atau beri kata sandi pada tag yang Anda bagikan.** Tepat di samping Menulis Batch CSV ada mode Kunci Batch dan Perlindungan kata sandi batch. Kunci membuat tag hanya bisa dibaca, selamanya. Kata sandi membuat tag masih bisa Anda ubah nanti, tetapi tidak oleh orang lain. Untuk tag yang akan Anda berikan ke orang lain, proses tumpukannya dengan salah satu mode itu setelah selesai menulis, supaya tidak ada yang bisa menimpa isinya.

Menulis Batch CSV tersedia di [NFC.cool Tools untuk iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-batch-write-nfc-tags-csv-id&mt=8) dan [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-batch-write-nfc-tags-csv-id). Dan kalau Anda bertemu saya di konferensi atau meetup, minta saja satu tagnya.
