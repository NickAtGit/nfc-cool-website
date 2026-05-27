---
id: "nfc-safe-2026-05"
title: "NFC Safe: simpan rahasia terenkripsi di tag NFC yang tahan lama"
date: "2026-05-03"
tags: ["nfc-tags", "privacy"]
summary: "AES 256-bit di tag NFC berlapis epoksi. Cadangan kertas terbakar. Cadangan cloud bisa mati. Tag NFC tidak."
image: "/assets/images/Blog/nfc-safe-encrypted-secrets.webp"
imageAlt: "Ponsel, kartu NFC, perisai, dan kunci yang merepresentasikan rahasia NFC terenkripsi"
author: "Nicolo Stanciu"
---

Frasa seed Anda mungkin ada di selembar kertas. Mungkin di dalam brankas. Mungkin di bawah papan lantai. Mungkin dibagi menjadi tiga lokasi karena seseorang di Reddit bilang itulah yang dilakukan orang kripto yang "serius". Tapi tetap saja kertas. Kertas terbakar. Kertas kebanjiran. Kertas hilang.

Saya sudah bertahun-tahun membangun NFC.cool, sebuah aplikasi untuk membaca dan menulis tag NFC, dan pada suatu titik saya mulai mengajukan pertanyaan yang tidak ada hubungannya dengan pembayaran atau kartu akses: bagaimana jika cadangan Anda tidak bisa lapuk, tidak bisa rusak, dan terlihat seperti bukan apa-apa bagi siapa pun yang menemukannya?

Pertanyaan itulah yang mendorong saya membangun **NFC Safe**. Ini mengenkripsi teks apa pun - frasa seed, kata sandi, kode pemulihan, apa pun yang perlu Anda rahasiakan - ke tag NFC dengan enkripsi AES 256-bit. Tag tersebut berdiri sendiri. Tidak ada cloud. Tidak ada server. Tidak ada akun. Untuk membaca rahasianya, Anda membutuhkan tag fisik *dan* frasa sandi. Tanpa keduanya, tag hanya sepotong plastik kecil dengan omong kosong di dalamnya.

Satu hal yang sangat saya perhatikan saat merancang ini: saya tidak ingin rahasia Anda bergantung pada keberadaan aplikasi saya. Jadi format enkripsinya [didokumentasikan sepenuhnya dan terbuka](https://github.com/NickAtGit/nfc.cool-nfc-safe-format), termasuk dekoder Python referensi. Jika NFC.cool pernah menghilang, Anda masih bisa memulihkan data Anda dengan pembaca NFC standar dan spesifikasinya. Itu janji yang bisa saya tepati karena saya menulis spesifikasi agar bertahan lebih lama dari perangkat lunaknya.

---

## Masalah dalam menyimpan rahasia

Jika Anda meminta saya menyebutkan titik lemah dari setiap metode penyimpanan rahasia yang pernah saya lihat, saya bisa melakukannya tanpa berpikir: kertas terbakar, konektor USB berkarat, layanan cloud diretas, dompet perangkat keras hanya menangani frasa seed kripto, dan otak Anda lupa. Setiap pilihan gagal dengan caranya sendiri.

Jadi saya bekerja mundur. Cadangan ideal akan tahan secara fisik, terenkripsi, berdiri sendiri, redundan, dan tahan lama. Tag NFC memenuhi kelima kriteria itu, dan itu pun awalnya mengejutkan saya. Tag NFC tidak memiliki baterai, tidak ada bagian yang bergerak, dan chip NTAG216 dinilai memiliki retensi data 10+ tahun. Varian berlapis epoksi tahan terhadap air, benturan, dan puluhan tahun pengabaian. Jika Anda baru mengenal perbedaan chip ini, saya menguraikan trade-off-nya di [jenis tag NFC untuk iPhone](/blog/nfc-tag-types-for-iphones/).

---

## Cara menggunakan NFC Safe

NFC Safe ada di dalam NFC.cool Tools di bawah NFC Apps. Saya mempertahankan semuanya dalam satu layar dengan kontrol tersegmen di bagian atas - Enkripsi atau Dekripsi. Jika Anda pernah menulis tag sebelumnya, tidak ada yang terasa asing.

**Untuk mengenkripsi:**
1. Buka Tools - NFC Apps - NFC Safe
2. Pilih **Enkripsi**
3. Ketik atau tempel rahasia Anda
4. Tetapkan frasa sandi yang kuat
5. Ketuk Enkripsi; tempelkan tag NFC ke ponsel Anda

**Untuk mendekripsi:**
1. Layar yang sama, beralih ke **Dekripsi**
2. Masukkan frasa sandi Anda
3. Tempelkan tag yang sebelumnya dienkripsi - rahasia Anda muncul

Di balik layar, inilah yang sebenarnya saya lakukan: AES-256-GCM dengan PBKDF2 (HMAC-SHA-256, 100.000 iterasi, salt acak 16-byte). Hasilnya disimpan di tag sebagai rekaman NDEF kustom (`urn:nfc:ext:crypto`). Jika Anda ingin memverifikasi sendiri daripada mempercayai kata-kata saya, [spesifikasi format lengkapnya ada di GitHub](https://github.com/NickAtGit/nfc.cool-nfc-safe-format). Jika Anda penasaran seperti apa penulisan tag normal yang tidak terenkripsi, saya menjelaskannya di [cara menulis tag NFC di iPhone](/blog/write-nfc-tags-iphone/).

---

## Strategi redundansi

Inilah cara saya sebenarnya akan menggunakannya sendiri. Tag NTAG216 harganya sekitar secangkir kopi, jadi tidak ada alasan untuk hanya membuat satu. Beli beberapa, enkripsi rahasia yang sama ke masing-masing, dan distribusikan: laci meja, kantor, rumah anggota keluarga, kotak simpanan, tempat yang hanya Anda yang tahu. Setiap tag sendiri tidak berarti tanpa frasa sandi. Itulah bagian yang paling saya sukai dari desainnya - secara alami berfaktor dua: tag fisik ditambah frasa sandi, disimpan di dua tempat terpisah, tanpa pengaturan tambahan dari Anda.

---

## Mengapa NFC dan bukan USB atau kartu SD

Orang-orang bertanya mengapa saya tidak mengarahkan semua orang ke flash drive USB atau kartu SD. Jawaban jujurnya adalah saya sudah terlalu banyak menyaksikan kegagalan membosankan yang sebenarnya bisa dicegah. NFC melewati semuanya:

- **Tidak ada konektor** - tidak ada yang berkarat atau bengkok
- **Tidak ada baterai** - pasif, ditenagai oleh pembaca
- **Tidak ada filesystem** - tidak ada yang bisa rusak
- **Tidak ada driver** - setiap smartphone membaca NFC secara asli
- **Kecil dan murah** - seukuran koin, kurang dari satu dolar dalam jumlah banyak
- **Tahan lama** - varian epoksi tahan air, benturan, UV

Satu batasan nyata adalah kapasitas: sekitar 500-700 byte setelah overhead enkripsi. Itu tidak banyak, tapi cukup untuk tujuan sebenarnya - frasa seed 24 kata, kata sandi utama, atau sekumpulan kode pemulihan.

---

## Catatan keamanan

Saya lebih suka jujur tentang sisi tajamnya daripada Anda menemukannya belakangan:

- **Frasa sandi Anda adalah segalanya.** AES 256-bit tidak bisa dipecahkan. Frasa sandi yang lemah bisa. Gunakan string 20+ karakter yang dihasilkan secara acak dan jangan berkompromi di sini.
- **Jangkauan NFC pendek** (~4 cm). Tidak ada yang memindai dari seberang ruangan - jangkauan kecil itu adalah fitur, bukan bug.
- **Tidak ada penghapusan jarak jauh.** Tag hilang? Hancurkan secara fisik. Gunting bekerja, begitu pula fakta bahwa datanya tidak berguna tanpa frasa sandi.
- **Tidak ada pemulihan frasa sandi.** Lupakan dan datanya hilang. Saya membuat keputusan itu dengan sengaja - jalur pemulihan juga merupakan jalur serangan. Tuliskan frasa sandi di tempat terpisah dari tag.

---

## Gambaran lebih besar

Bekerja dengan NFC setiap hari, saya menyaksikan tag-tag ini secara diam-diam menjadi media penyimpanan untuk hal-hal yang penting. Paspor Produk Digital UE akan mewajibkan NFC untuk keaslian produk. Philips memasangnya di kepala sikat gigi. Hotel menggunakannya untuk kunci kamar. Murah, tahan lama, dan dapat dibaca secara universal oleh perangkat yang sudah ada di saku Anda - kombinasi itu langka, dan itulah tepatnya mengapa saya terus menemukan kegunaan baru untuknya. Jika Anda ingin gambaran yang lebih luas, saya membahas dasar-dasarnya di [tag NFC dijelaskan: panduan lengkap untuk pemula](/blog/nfc-tags-beginners-guide/).

NFC Safe adalah upaya saya untuk mengambil ketahanan itu dan menambahkan satu hal yang kurang - enkripsi. Cadangan yang bertahan lebih lama dari kertas, tidak bisa dibaca oleh siapa pun yang menemukannya, dan harganya kurang dari secangkir kopi. Itulah hal yang saya inginkan untuk diri sendiri, jadi saya membangunnya.

Tersedia sekarang di [NFC.cool Tools untuk iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-safe-encrypted-secrets-en&mt=8) dan [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-safe-encrypted-secrets-en).
