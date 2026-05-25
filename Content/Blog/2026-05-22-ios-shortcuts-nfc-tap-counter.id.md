---
id: "ios-shortcuts-nfc-tap-counter-2026-05"
title: "Mem-parsing data NFC Tap Counter dengan iOS Shortcuts"
date: "2026-05-22"
tags: ["nfc-tags", "automation", "iphone"]
summary: "Shortcut iOS siap pakai yang mem-parsing ID tag dan jumlah pemindaian dari NFC Tap Counter - sebuah parser yang bisa digunakan ulang, beserta demo peringatan tag."
image: "/assets/images/Blog/ios-shortcuts-nfc-tap-counter.webp"
imageAlt: "iPhone menampilkan peringatan dengan ID tag dan jumlah pemindaian setelah menempelkan stiker NFC"
author: "Nicolo Stanciu"
metaTitle: "Mem-parsing data NFC Tap Counter dengan iOS Shortcuts"
metaDescription: "Shortcut iOS yang bisa digunakan ulang untuk mem-parsing payload NFC Tap Counter (ID tag + jumlah pemindaian), beserta demo peringatan tag. Tautan iCloud siap pakai, tanpa pengaturan."
ogTitle: "Mem-parsing data NFC Tap Counter dengan iOS Shortcuts"
ogDescription: "Shortcut iOS siap pakai untuk NFC Tap Counter: parser yang bisa digunakan ulang dan demo peringatan tag."
---

Seminggu lalu saya [menjelaskan cara kerja NFC Tap Counter](/blog/count-nfc-tag-scans/): chip menghitung pemindaiannya sendiri, aplikasi menyematkan byte placeholder, dan tag mengganti jumlah terkini beserta ID tag ke dalam konten yang dibawa pada setiap ketukan. Tulisan itu berhenti di mana tag berhenti, yaitu pada saat nilai-nilai tersebut tiba di ponsel Anda.

Pertanyaan yang terus saya terima sejak itu adalah pertanyaan lanjutan yang paling jelas: "oke, tag memberikan saya `049F50824F1390x000007` - lalu apa?" Jika Anda menggunakan iPhone dan ingin menggunakan nilai-nilai tersebut di dalam Shortcut, Anda harus mem-parsingnya. Itu adalah pekerjaan string kecil namun agak rumit, dan saya lebih memilih Anda tidak perlu menulisnya sendiri.

Jadi saya membuat dua Shortcut dan membagikannya sebagai tautan iCloud. Satu adalah otaknya. Yang lain adalah demo yang menggunakan otak tersebut.

---

## Apa yang diberikan tag kepada Anda

Sebelum shortcut: penyegaran singkat tentang apa yang sebenarnya diterima, karena ini penting untuk cara Anda menggunakannya.

Di layar pengaturan Tap Counter, Anda memilih jenis konten untuk tag: URL, Email, SMS, atau Shortcut. Ketika Anda mengaktifkan tombol Tap Counter dan/atau Tag ID, aplikasi menyematkan byte placeholder ke dalam konten yang Anda tulis, dan chip menggantinya dengan nilai terkini pada setiap pembacaan. Menggunakan `049F50824F1390` sebagai ID tag dan `000007` sebagai jumlah, keempat jenis konten akan terlihat seperti ini:

- **URL:** `https://nfc.cool/tap-counter/` menjadi [`https://nfc.cool/tap-counter/?nfc=049F50824F1390x000007`](https://nfc.cool/tap-counter/?nfc=049F50824F1390x000007)
- **Isi email:** `Hi, here's my card.` menjadi `Hi, here's my card. 049F50824F1390x000007`
- **Isi SMS:** `Order confirmed!` menjadi `Order confirmed! 049F50824F1390x000007`
- **Input Shortcut:** `log-entry` menjadi `log-entry 049F50824F1390x000007`

URL di atas adalah URL yang nyata. [Halaman demo penghitung ketukan](/tap-counter/) kami dikonfigurasi untuk membaca nilai `?nfc=` langsung dari bilah alamatnya sendiri, jadi jika Anda ingin melihat substitusi terjadi sebelum membuat otomasi sendiri, tulislah sebuah tag yang mengarah ke `https://nfc.cool/tap-counter/` dengan kedua tombol aktif, tempelkan, dan halaman akan menampilkan ID tag serta jumlah yang baru saja diterimanya.

Ketika jenis konten adalah **Shortcut**, NFC.cool menjalankan shortcut yang dipilih melalui `shortcuts://run-shortcut?name=Your%20Shortcut&input=text&text=<payload>`, dengan nilai NFC yang sudah ditambahkan di dalam teks. Input shortcut Anda adalah string teks biasa. Satu-satunya tugas Anda adalah mengekstrak kembali ID tag dan jumlah dari sana.

Tergantung pada tombol mana yang aktif saat Anda menulis tag, Anda mungkin mendapatkan pola lengkap (14 karakter hex, sebuah `x`, lalu 6 karakter hex), atau hanya ID tag 14-hex, atau hanya jumlah 6-hex. Parser menangani ketiga kemungkinan tersebut.

---

## Parse NFC Tap Counter - parser yang bisa digunakan ulang

[Pasang Parse NFC Tap Counter](https://www.icloud.com/shortcuts/4c70ab3ade1a4398bb6a39edba94bf26)

Ini adalah otaknya. Tidak ada UI, menerima satu input teks, dan mengembalikan Dictionary. Itu disengaja: shortcut utilitas tanpa UI tersusun dengan bersih di dalam apa pun yang Anda buat, dan Dictionary adalah hal yang paling mudah dikonsumsi dari shortcut lain menggunakan aksi **Get Dictionary Value**.

Inilah isi Dictionary tersebut:

- `tagID` - ID tag hex 14 karakter, atau string kosong jika tombol dimatikan.
- `count` - jumlah pemindaian sebagai angka desimal (jadi `000007` menjadi `7`, dan `00000A` menjadi `10`), atau kosong jika tombol dimatikan.
- `countHex` - jumlah hex 6 karakter asli, jika Anda ingin menggunakannya apa adanya. Kosong jika tidak ada.
- `hasTagID`, `hasCount` - boolean untuk percabangan, sehingga Anda dapat menulis **If hasCount is true** tanpa harus menguji string sendiri.
- `content` - input dengan payload NFC dihapus dengan bersih, sehingga sisa shortcut Anda melihat input seperti sebelum tag memodifikasinya. Jika input adalah URL dengan `?nfc=...`, Anda mendapatkan URL kembali tanpanya. Jika itu adalah isi email dengan ID tag yang ditambahkan, Anda mendapatkan isi tersebut kembali tanpanya.
- `raw` - input asli yang tidak dimodifikasi, jika Anda ingin mencatatnya atau menggunakannya sebagai fallback.

Untuk memanggilnya dari shortcut Anda sendiri, caranya adalah tiga aksi:

1. **Receive Shortcut Input** sebagai teks (payload NFC tiba di sini).
2. **Run Shortcut** -> Parse NFC Tap Counter, dengan teks tersebut sebagai input. Matikan "Show When Run" agar tidak terlihat.
3. **Get Dictionary Value** -> pilih `tagID`, `count`, `content`, atau kunci mana pun yang Anda butuhkan.

Itu saja. Dari langkah 3 dan seterusnya, Anda dapat melakukan apa pun dengan nilai-nilai tersebut: percabangan pada `hasTagID`, catat `count` ke Catatan, kirimkan webhook dengan JSON, apa saja. Parser tidak mengasumsikan apa yang ingin dilakukan shortcut Anda dengan hasilnya, yang persis itulah mengapa ia kecil dan bisa digunakan ulang.

Catatan tentang jumlah: itu adalah Number nyata di dalam Dictionary, bukan string teks, jadi Anda bisa langsung memasukkannya ke dalam **Calculate** atau perbandingan **If** tanpa mengonversinya lagi. Langkah hex-ke-desimal sudah dilakukan.

---

## NFC Tag Alert - demonya

[Pasang NFC Tag Alert](https://www.icloud.com/shortcuts/f78b78c917a2417385ae25711a3e877a)

Ini adalah demo yang tetap akan saya pasang di hari pertama, bahkan jika Anda tidak berniat menggunakan peringatan dalam produksi. Ia menerima input teks Shortcut, menjalankan parser, dan menampilkan satu peringatan berjudul **NFC Tag Scanned** dengan dua baris:

```
Tag ID: 049F50824F1390
Scans: 7
```

Alasan saya memasangnya terlebih dahulu adalah bahwa ini adalah cara tercepat untuk memverifikasi tag yang diaktifkan counter. Tulislah sebuah tag dari NFC.cool Tools dengan jenis konten **Shortcut** dan nama **NFC Tag Alert**, aktifkan tombol Tap Counter dan Tag ID, tulis, tempelkan. Peringatan muncul dengan nilai nyata dari tag fisik Anda.

Jika peringatan menampilkan nilai yang Anda harapkan, tag Anda berfungsi dengan baik dan Anda bisa lanjut membangun sesuatu yang lebih canggih. Jika jumlahnya salah atau ID tag tidak ada, Anda tahu masalahnya ada pada tag (atau tombol yang Anda pilih saat menulisnya) dan bukan pada shortcut Anda sendiri. Mengeliminasi satu kelas debugging "apakah ini memang salah chipnya?" sudah layak untuk memasang shortcut dengan lima aksi.

Jika Anda pernah bertanya-tanya cara memanggil parser dengan benar, shortcut ini juga merupakan contoh kerja sekecil mungkin. Buka, lihat lima aksinya, salin strukturnya ke shortcut Anda sendiri.

---

## Menghubungkannya ke shortcut Anda sendiri

Ada dua cara konten tag diarahkan ke shortcut Anda. Parser bekerja dengan keduanya.

**Digerakkan tag (payload Shortcut).** Tulislah tag dengan jenis konten **Shortcut**, pilih shortcut Anda berdasarkan nama, aktifkan tombol mana pun yang Anda inginkan. Mulai sekarang setiap ketukan meluncurkan shortcut Anda dengan payload NFC sudah ada di input. Di dalam shortcut Anda, panggil Parse NFC Tap Counter pada input tersebut dan Anda memiliki `tagID` / `count` siap digunakan.

**Digerakkan URL (payload URL).** Ini adalah kasus yang lebih umum. Tag membawa URL, ponsel Anda membuka URL tersebut saat diketuk, dan jumlah ikut sebagai `?nfc=...`. Jika Anda ingin Shortcut menangani ketukan tersebut alih-alih (atau bersamaan dengan) browser, Anda bisa: arahkan URL melalui Shortcut yang menangani input halaman web Safari, lalu jalankan Parse NFC Tap Counter pada URL tersebut. Parser menghapus segmen `?nfc=` dengan bersih dan mengembalikan URL tanpanya sebagai `content`, sehingga Anda dapat meneruskannya ke browser, panggilan API, atau ke mana saja yang mengharapkan URL biasa.

Berikut adalah contoh empat aksi untuk "catat setiap pemindaian ke catatan di Apple Notes":

1. **Receive Shortcut Input** sebagai teks.
2. **Run Shortcut** -> Parse NFC Tap Counter, dengan input sebagai teks.
3. **Get Dictionary Value** -> tiga pencarian berurutan untuk `tagID`, `count`, dan `content`. Simpan masing-masing dalam variabel.
4. **Append to Note** -> satu baris seperti `[Current Date] tag=<tagID> count=<count> url=<content>`.

Anda sekarang memiliki log ketukan yang ditulis oleh tag itu sendiri. Tanpa backend, tanpa analitik pihak ketiga, tanpa akun di mana pun.

---

## Beberapa ide untuk dikembangkan

Beberapa hal kecil yang dibuka oleh parser, ditulis agar Anda tidak perlu menemukannya dari awal:

- **Percabangan berdasarkan ID tag.** Satu shortcut, banyak tag. Tambahkan aksi **If** per ID tag yang dikenal: jika tag pintu kantor dipindai, matikan notifikasi; jika tag studio dipindai, atur mode fokus; jika tag dapur dipindai, mulai timer. ID tag mengidentifikasi tag fisik, bukan konten, sehingga Anda dapat memberikan setiap tag URL yang sama dan tetap merespons masing-masing secara individual.
- **Pilih pemenang pada pemindaian ke-N.** Gabungkan `hasCount` dengan perbandingan. Jika `count` sama dengan 100, kirimkan pesan konfirmasi; untuk setiap pemindaian lainnya, lakukan penanganan biasa. Chip menegakkan urutan; shortcut Anda tinggal membacanya.
- **Kirim ke webhook.** Padukan ini dengan fitur [Webhooks](/features/webhooks/) NFC.cool jika Anda ingin penanganan sisi server tanpa menulis aplikasi iOS: kirimkan nilai yang sudah di-parsing sebagai JSON, biarkan server yang menangani selanjutnya. Dua aksi iOS dan tag Anda terhubung ke apa pun yang berbicara HTTP.
- **Catat ke file atau Catatan.** Yang paling sederhana dan mengejutkan berguna. Tambahkan `timestamp, tagID, count` ke file yang berjalan di iCloud Drive atau satu Catatan, dan Anda memiliki log ketukan yang bisa Anda gulir atau grafikan nanti. Bagus untuk melacak keterlibatan pada satu tag tanpa membangun infrastruktur.

Jika Anda membangun sesuatu yang keren dengan ini, saya benar-benar ingin melihatnya.

---

## Ucapan terima kasih

Kedua shortcut ini dibuat dengan [Shortcuts Playground](https://github.com/viticci/shortcuts-playground-plugin), plugin Federico Viticci untuk menghasilkan iOS Shortcuts dari bahasa alami. Ini adalah alat yang hebat, dan saya ingin berterima kasih kepadanya karena telah merrilisnya - tanpanya dua shortcut ini akan membutuhkan waktu jauh lebih lama untuk disatukan.

---

## Catatan singkat untuk Android

Shortcuts adalah aplikasi Apple, jadi keduanya hanya berjalan di iPhone. Namun fitur Tap Counter itu sendiri bekerja di kedua platform, karena substitusi terjadi di dalam chip dan tidak peduli ponsel mana yang membaca tag. Di Android, jenis payload URL, Email, dan SMS berperilaku sama seperti di iOS; jika Anda menginginkan otomasi serupa di sana, aplikasi seperti Tasker atau MacroDroid dapat mengambil URL dengan `?nfc=...` dan mengekstrak nilai-nilainya dengan aksi penanganan string mereka sendiri. Formatnya pada wire-nya sama.

---

## Coba sekarang

Jika Anda menginginkan penjelasan mendalam tentang cara kerja fitur Tap Counter sesungguhnya di balik layar, itu ada di [tulisan sebelumnya](/blog/count-nfc-tag-scans/). Dan jika Anda ingin melihat tag yang diaktifkan counter beraksi tanpa menyiapkan otomasi Anda sendiri terlebih dahulu, halaman [demo tap counter langsung](/tap-counter/) kami membaca nilai `?nfc=` langsung dari URL-nya sendiri: tulislah tag yang mengarah ke sana, tempelkan, lihat jumlah dan ID tag muncul.

Fitur NFC Tap Counter itu sendiri ada di NFC.cool Tools, di [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ios-shortcuts-nfc-tap-counter-en&mt=8) dan [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ios-shortcuts-nfc-tap-counter-en). Untuk rangkaian lengkap alat yang telah saya bangun seputar NFC, lihat [fitur pembaca dan penulis NFC](/features/nfc-reader-writer/).
