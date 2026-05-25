---
id: nfc-blog-024
title: "Pemindaian dokumen siap pakai dengan NFC.cool Tools"
date: 2024-02-20
tags: ["guides", "iphone"]
summary: "Panduan praktis untuk pemindai dokumen NFC.cool: cara mengambil pemindaian yang tajam, mengapa langkah pasca-pemrosesan penting, dan bagaimana OCR mengubah pemindaian menjadi teks yang dapat dicari dan PDF."
metaTitle: "Pemindaian dokumen dengan NFC.cool Tools - panduan praktis"
metaDescription: "Cara memindai dokumen dengan NFC.cool Tools - tangkap, pasca-proses, jalankan OCR, dan ekspor sebagai PDF yang dapat dicari. Dengan tips tentang pencahayaan dan deteksi sudut."
ogTitle: "Pemindaian dokumen siap pakai dengan NFC.cool Tools"
ogDescription: "Cara memindai dokumen, menjalankan OCR, dan mengekspor PDF yang dapat dicari dengan NFC.cool Tools."
image: "/assets/images/Blog/document-scanning-guide.webp"
---
iPhone modern memiliki kamera dan daya pemrosesan yang cukup sehingga "memindai dokumen" bukan lagi fitur printer - melainkan hanya satu ketukan. Pemindai dokumen NFC.cool Tools dibangun di atas framework Vision Apple, yang berarti Anda mendapatkan pengambilan yang cepat, deteksi tepi otomatis, dan OCR yang berjalan sepenuhnya di perangkat.

Inilah cara menggunakannya dengan baik.

---

## Pengambilan: jaga keseimbangan, pencahayaan itu penting

Buka NFC.cool Tools, ketuk ikon dokumen, dan bingkai halaman. Pemindai menggambar kotak kuning di sekitar apa yang dianggapnya sebagai tepi halaman. Sebagian besar waktu itu benar. Ketika tidak, seret sudutnya hingga pas.

Beberapa tips yang benar-benar meningkatkan hasilnya:

- **Cahaya alami lebih baik dari lampu di atas kepala.** Lampu plafon kantor membuat bayangan dari ponsel itu sendiri ke halaman. Cahaya siang dari jendela, atau lampu meja yang diarahkan melintasi halaman, lebih baik.
- **Permukaan rata.** Halaman yang melengkung membengkokkan teks dan membingungkan OCR.
- **Hindari silau.** Miringkan ponsel sedikit untuk menghindari pantulan kotak putih di kertas mengkilap.
- **Dokumen multi-halaman.** Cukup pindai satu halaman demi satu - aplikasi menumpuknya dalam satu dokumen.

---

## Pasca-pemrosesan: sesuaikan sudut, atur warna

Setelah pengambilan, Anda mendapatkan proses pasca-pemrosesan. Dua hal yang layak digunakan:

- **Penyesuaian sudut.** Deteksi otomatis pemindai cukup baik tetapi tidak sempurna. Jika halaman memiliki kontras rendah terhadap permukaan, seret sudutnya dengan tepat.
- **Mode warna.** Tiga pilihan: warna (foto, dokumen berwarna), skala abu-abu (teks di kertas putih - hasil terbaik untuk OCR), dan hitam-putih (tulisan tangan, kwitansi - sepaling bersih yang mungkin).

Untuk sebagian besar dokumen - faktur, kwitansi, kontrak - skala abu-abu memberikan keseimbangan terbaik antara ukuran file dan akurasi OCR.

---

## OCR: gambar pindaian menjadi teks yang dapat dicari

Ketuk **Tampilkan teks yang dikenali** di bawah gambar yang dipindai untuk menjalankan OCR. Teks muncul di panel yang bisa Anda salin, cari, atau simpan.

Kualitas OCR bergantung pada tiga hal: ketajaman gambar, pencahayaan, dan font. Teks cetak di latar belakang putih bersih dikenali mendekati 100%. Tulisan tangan lebih sulit - pengenal tulisan tangan Vision cukup baik pada huruf blok yang rapi dan kesulitan dengan tulisan sambung. Jika pemindaian hasilnya salah, perbaikan paling umum adalah memindai ulang dengan pencahayaan yang lebih baik daripada memperjuangkan hasil OCR.

---

## Ekspor: PDF yang dapat dicari

Trik yang membuat pemindaian benar-benar berguna jangka panjang adalah ekspor **PDF yang dapat dicari**. Ini adalah PDF di mana setiap halaman adalah gambar yang dipindai, dengan teks OCR berlapis tidak terlihat di bawahnya - sehingga dokumen tampak seperti gambar, tetapi mesin pencari (dan macOS Spotlight, dan Finder) dapat menemukan kata-kata di dalamnya.

Di NFC.cool Tools, tekan **Bagikan halaman sebagai PDF** dan ekspor secara otomatis menyertakan lapisan OCR. Letakkan PDF ke sistem pengarsipan Anda, cari "invoice 2024-02 acme corp" tiga bulan kemudian, dan dokumen yang tepat akan muncul.

---

## Mengapa memindai alih-alih memotret?

Anda bisa saja mengambil foto dokumen. Alasan menggunakan pemindai sebagai gantinya:

- **Pemotongan tepi.** Pemindaian dipangkas ke halaman. Foto menyertakan meja, cangkir kopi, kucing.
- **Koreksi perspektif.** Bahkan dipegang rata, ponsel sedikit miring. Pemindai mengoreksi ini sehingga halaman terlihat "seperti dipindai" daripada "difoto dari sudut".
- **Penggabungan multi-halaman.** Lima foto = lima file di gulungan kamera. Lima pemindaian = satu PDF.
- **Teks yang dapat dicari.** OCR sudah terintegrasi dalam ekspor.

Untuk kwitansi, kontrak, formulir bertanda tangan, dokumen bisnis - pindai, jangan foto.

Pemindaian dokumen adalah bagian dari [NFC.cool Tools untuk iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-document-scanning-guide-en&mt=8) (versi Android berfokus pada NFC; pemindai dokumen membutuhkan framework Vision Apple).
