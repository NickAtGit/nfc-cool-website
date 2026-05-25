---
id: nfc-blog-025
title: "Pemindaian 3D di iPhone: apa yang bisa dilakukan fotogrametri dan LiDAR di saku Anda"
date: 2024-02-21
tags: ["guides", "iphone"]
summary: "NFC.cool Tools mengubah iPhone Anda menjadi pemindai 3D menggunakan Object Capture API Apple. Fotogrametri ditambah LiDAR menghasilkan model yang bisa diekspor ke .stl, .obj, .usdz - siap untuk cetak 3D, AR, atau pipeline pemodelan mana pun."
metaTitle: "Pemindaian 3D di iPhone dengan NFC.cool Tools"
metaDescription: "Cara kerja pemindai 3D NFC.cool Tools - fotogrametri, LiDAR, dan Object Capture API Apple. Ekspor ke .stl, .obj, .ply, .usdz untuk cetak 3D dan AR."
ogTitle: "Pemindaian 3D di iPhone: apa yang bisa dilakukan fotogrametri dan LiDAR di saku Anda"
ogDescription: "Cara kerja pemindai 3D NFC.cool Tools - fotogrametri, LiDAR, dan ekspor ke .stl, .obj, .usdz."
image: "/assets/images/Blog/3d-scan-feature.webp"
---
Beberapa tahun lalu, pemindaian 3D berarti pemindai khusus seukuran microwave, ditambah perangkat lunak yang harganya lebih mahal dari perangkat kerasnya. Hari ini iPhone dengan sensor LiDAR dan Object Capture API Apple dapat menghasilkan model 3D yang berguna dari segelintir foto.

Fitur **3D Scan** di NFC.cool Tools membungkus pipeline itu menjadi alur kerja yang bisa masuk saku.

---

## Apa yang sebenarnya terjadi

Dua teknologi bekerja sama:

- **Fotogrametri** - Aplikasi mengambil puluhan foto objek dari berbagai sudut. Mesin fotogrametri (Object Capture API Apple di iOS) menemukan fitur yang cocok di seluruh foto dan mentriangulasikannya menjadi jaring 3D.
- **LiDAR** - Di iPhone dengan sensor LiDAR (model Pro mulai iPhone 12 dan seterusnya), setiap frame diperkuat dengan pengukuran kedalaman yang diambil oleh sensor. Ini secara tajam meningkatkan jaring dalam dua cara: skala menjadi akurat (model berukuran nyata), dan permukaan tanpa fitur visual yang jelas (dinding putih polos, kurva mengkilap) mendapatkan geometri yang berguna di mana fotogrametri saja akan gagal.

Anda tidak perlu memikirkan salah satu langkah - aplikasi memandu Anda melalui pengambilan, lalu menjalankan rekonstruksi di perangkat.

---

## Cara mengambil pemindaian yang bagus

Beberapa aturan praktis:

- **Bergerak perlahan mengelilingi objek.** Aplikasi mengharapkan cakupan yang kira-kira berkelanjutan. Jangan melompat dari satu sisi ke sisi yang berlawanan - berjalanlah mengelilinginya.
- **Jaga objek dalam bingkai.** Margin yang konsisten di sekitar objek tidak masalah; memotongnya di tepi akan kehilangan data.
- **Pencahayaan merata.** Bayangan keras membingungkan tahap fotogrametri. Cahaya difus (langit terbuka, softbox, cahaya siang hari di dalam ruangan) menghasilkan jaring paling bersih.
- **Objek bertekstur lebih mudah dipindai daripada yang tidak memiliki fitur.** Cangkir bermotif dipindai hampir sempurna. Bola logam mengkilap benar-benar sulit. LiDAR membantu yang terakhir tetapi tidak sepenuhnya bisa mengatasinya.
- **Diam sejenak di setiap sudut.** Blur gerak merusak detail.

Pemindaian penuh membutuhkan 20-40 detik berjalan, lalu 30-60 detik lagi untuk pemrosesan.

---

## Format ekspor

NFC.cool Tools mengekspor ke format yang sebenarnya Anda butuhkan:

- **.stl** - Printer 3D. Slicer seperti Bambu Studio, Cura, PrusaSlicer semuanya menerimanya.
- **.obj** - Format 3D universal. Diimpor ke Blender, Cinema 4D, Unity, Unreal, pada dasarnya setiap alat pemodelan.
- **.ply** - Format jaring yang mempertahankan warna vertex - berguna saat tekstur lebih penting daripada material yang dipetakan UV.
- **.usdz** - Format AR Apple. Taruh di Quick Look, AR Quick Look, atau gunakan di RealityKit.
- **.abc** (Alembic) - Pipeline animasi.
- **.usd** - Universal Scene Description, didukung oleh sebagian besar alat DCC modern.

Modelnya sama. Format hanya menentukan alat hilir mana yang dapat mengonsumsinya.

---

## Apa yang bisa Anda lakukan dengan hasilnya

Aplikasi paling menarik yang saya lihat dari pengguna:

- **Cetak 3D replika unik.** Pindai objek yang ditemukan, potong, cetak.
- **Dokumentasikan aset dunia nyata.** Dokumentasi properti, pengatalogan museum, "seperti apa sebenarnya vas nenek".
- **Bagikan dalam AR.** Kirim .usdz ke seseorang di iPhone - mereka mengetuknya dan melihat objek melayang di ruang tamu mereka melalui AR Quick Look.
- **Masukkan ke game engine.** Properti dunia nyata di scene Unity, dimodelkan dalam 90 detik tanpa seniman 3D.

---

## Kapan berhasil, dan kapan tidak

Fotogrametri ditambah LiDAR kuat untuk:
- Objek padat dan tidak tembus cahaya
- Permukaan bertekstur atau bermotif
- Subjek statis (apa pun yang tidak bergerak selama pemindaian)

Kesulitan pada:
- Objek transparan atau refraktif (kaca, air, lensa)
- Logam sangat reflektif
- Fitur sangat tipis (kabel, kawat, rambut)
- Apa pun yang bergerak

Untuk hal-hal yang dikuasainya, hasilnya benar-benar berguna - bukan mainan. Untuk sisanya, bersiaplah untuk membersihkan jaring di Blender atau menerima batasannya.

3D Scan adalah bagian dari [NFC.cool Tools untuk iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-3d-scan-feature-en&mt=8). Object Capture Apple membutuhkan sensor LiDAR, sehingga berjalan di iPhone Pro (iPhone 12 Pro dan yang lebih baru) dan model iPad Pro (2020 dan yang lebih baru).
