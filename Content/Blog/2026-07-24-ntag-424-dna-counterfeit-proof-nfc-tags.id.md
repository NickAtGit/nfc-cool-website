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

Beberapa waktu lalu saya berulang kali menjumpai klaim yang sama secara sepintas: merek-merek mewah memasang chip NFC pada produk mereka sehingga Anda bisa mengetuk sebuah tas atau botol dengan ponsel dan tahu bahwa itu barang asli, bukan tiruan. Setiap artikel melontarkan kalimat manis yang sama dan tidak satu pun menjelaskan *bagaimana*. Apa sebenarnya yang membuat pemalsu tidak bisa sekalian menyalin chip itu bersama tas tangannya?

Jadi saya melakukan hal yang selalu saya lakukan ketika penasaran dengan sebuah tag. Saya masuk ke AliExpress, menemukan lapak yang menjual tag "NTAG 424 DNA", memesan satu kumpulan kecil, dan menunggu amplopnya datang. Beberapa euro, beberapa minggu, dan silikon yang sama dengan yang menjadi dasar sistem perlindungan merek itu kini tergeletak di meja saya. Lalu saya mengetuk salah satunya untuk melihat apa yang bisa dilakukannya.

## Apa sebenarnya tag NTAG 424 DNA itu

Dari luar ia adalah tag NFC biasa. Anda tidak akan bisa membedakannya dari setumpuk tag murah, dan ponsel mana pun membacanya tanpa keluhan. Jika Anda sudah membaca [panduan saya tentang jenis-jenis tag NFC](/blog/nfc-tag-types-for-iphones/), ia masuk sebagai satu lagi tag Type 4 yang dengan senang hati dibaca iPhone Anda.

Bagian "DNA"-lah yang membuatnya berbeda. Di dalamnya, chip menyimpan beberapa kunci AES-128 dan sebuah mesin kriptografis kecil, dan ia bisa melakukan sesuatu yang tidak bisa dilakukan NTAG215 biasa atau stiker dari sebuah multipack: ia bisa *menandatangani* setiap ketukan. Tanda tangan itulah intinya. Itulah perbedaan antara tag yang berkata "ini sebuah tautan" dan tag yang berkata "ini sebuah tautan, dan ini bukti kriptografis bahwa saya, chip asli spesifik ini, adalah yang menyajikannya, saat ini juga".

Itulah yang sebenarnya dibayar merek-merek mewah - bukan tautannya, melainkan bukti bahwa chip aslilah yang menyajikannya.

## Cara kerja SUN dan SDM: tautan yang menulis ulang dirinya setiap ketukan

Di titik inilah semuanya tiba-tiba masuk akal bagi saya. Ketika saya melihat apa yang sebenarnya dikirim tag tersebut, saya sadar bahwa saya sudah membangun hampir seluruh mekanisme yang dibutuhkan untuk memahaminya.

Awal tahun ini saya merilis [fitur NFC Tap Counter](/blog/count-nfc-tag-scans/): sebuah tag yang menghitung berapa kali ia sudah dibaca dan menaruh angka itu di dalam URL, sehingga sebuah tautan bisa tahu bahwa ini adalah kali ke-47 seseorang memindainya. Tag NTAG 424 DNA adalah ide yang sama, dengan lapisan enkripsi yang membungkusnya sehingga mustahil dipalsukan.

Mekanisme ini disebut **SUN** (Secure Unique NFC), atau **SDM** (Secure Dynamic Messaging) jika Anda membaca [datasheet NXP](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf). Anda menyimpan tautan biasa di tag, sesuatu seperti `https://example.com`. Tetapi Anda menyuruh chip untuk menulis ulang bagian-bagian dari tautan itu saat itu juga setiap kali diketuk. Jadi apa yang sebenarnya diterima ponsel Anda lebih mirip seperti ini:

`https://example.com/?picc_data=A1B2...&cmac=9F3C...`

Kedua nilai itu bukan hiasan. `picc_data` adalah salinan terenkripsi dari ID asli tag ditambah sebuah penghitung ketukan, diacak dengan kunci yang tidak pernah keluar dari chip. `cmac` adalah tanda tangan kriptografis atas data tersebut. Keduanya berubah setiap ketukan. Ketuk tag yang sama dua kali dan Anda mendapatkan dua URL yang sepenuhnya berbeda, masing-masing dengan tanda tangan baru dari chip.

Saya membayangkan tag NFC biasa sebagai papan tanda tercetak di etalase toko. Siapa pun bisa memotretnya dan mencetak salinan yang identik. Tag SUN lebih seperti seorang satpam yang menyerahkan kepada Anda sebuah struk baru, bernomor dan bercap secara individual setiap kali Anda masuk. Menyalin struk kemarin tidak ada gunanya bagi Anda, karena nomor hari ini berbeda dan hanya cap satpam itu yang asli.

## Mengapa tag NTAG 424 DNA tiruan tertangkap

Inilah bagian yang menjawab pertanyaan awal saya. Seorang pemalsu benar-benar bisa mengklon *isi* sebuah tag. Mereka bisa membaca URL-nya, menyalinnya byte demi byte, dan memprogramnya ke chip kosong. Itu selalu benar, dan itulah mengapa "cukup tempelkan kode QR di atasnya" sebenarnya tidak pernah membuktikan apa pun.

Yang tidak bisa mereka lakukan adalah menghasilkan tanda tangan valid berikutnya. Kunci penandatangan berada di dalam chip asli dan tidak pernah keluar, bahkan saat ketukan berlangsung. Artinya sebuah ketukan hanya bernilai bagi sesuatu yang benar-benar memegang kuncinya. Dalam pengaturan perlindungan merek yang sesungguhnya, tautan tag mengarah ke server yang dijalankan pembuatnya, dan server itulah yang mendekripsi setiap ketukan, menghitung ulang tanda tangan untuk memastikan kuncinya cocok, dan melacak penghitung saat angkanya terus naik.

Bagian terakhir itulah yang menangkap tiruan. Satu-satunya URL yang bisa dipasang pemalsu pada barang palsu adalah URL yang mereka tangkap dari sebuah ketukan asli, dibekukan dengan penghitung yang kebetulan dibawa ketukan itu. Putar ulang, dan server akan mendapati angka yang sudah pernah dilihatnya, dan penghitung chip asli hanya bergerak maju, jadi sebuah pengulangan atau langkah mundur langsung membongkar pemutaran ulang itu. Untuk mengirim penghitung baru yang lebih tinggi dengan tanda tangan yang tetap lolos pemeriksaan, mereka butuh kuncinya, dan untuk mendapatkan kuncinya mereka harus membobol AES atau secara fisik membongkar chip. Tidak satu pun dari itu akan terjadi demi sebuah tas tangan palsu.

Itulah versi jujur dari kalimat pemasaran tersebut. Chip tidak membuat *produk* mustahil disalin. Ia membuat *bukti keaslian* mustahil disalin, dan ia memindahkan bukti itu ke sesuatu yang tidak bisa direproduksi oleh pemalsu.

## Bagaimana NFC.cool memverifikasi bahwa sebuah tag asli

Begitu saya memahami tag-tag ini, saya ingin aplikasi melakukan semuanya dengan benar, bukan sekadar menampilkan hex dump. Jadi NFC.cool Tools kini menangani NTAG 424 DNA secara penuh di [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-id&mt=8) dan [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-id), dan ia memeriksa keaslian dengan dua cara independen, ditambah cara ketiga yang bersifat fisik pada tag yang dibuat untuk itu.

**Asal-usul chip.** Setiap chip NXP asli membawa tanda tangan pabrik atas ID-nya sendiri, ditandatangani dengan kunci privat NXP. NFC.cool membaca tanda tangan itu dan memverifikasinya terhadap kunci publik NXP, langsung di ponsel. Jika lolos, Anda mendapatkan hasil sederhana "NXP Asli". Yang ini tidak butuh pengaturan apa pun dan tidak butuh kunci dari Anda. Ia menjawab "apakah ini silikon NXP asli, atau tiruan tanpa nama?".

**Ketukan itu sendiri.** Ini adalah pemeriksaan SUN. NFC.cool mendekripsi `picc_data`, menarik keluar ID tag dan penghitung ketukan, menghitung ulang tanda tangannya, dan membandingkannya dengan `cmac` yang dikirim tag. Jika cocok, ketukan tersebut asli dan baru, dan Anda melihat "Autentik". Yang ini membuktikan lebih banyak, jadi ia meminta lebih banyak: ia butuh kunci tag. Tag yang masih baru dengan setelan pabrik terverifikasi tanpa masukan sama sekali. Tag yang dikunci seseorang dengan kuncinya sendiri hanya terverifikasi sebagai autentik jika Anda memiliki kunci itu tersimpan.

**Segel fisik, pada tag yang dibuat untuk itu.** Salah satu versi dari tag ini, NTAG 424 DNA TagTamper, dibuat untuk menjadi segel yang menunjukkan bukti perusakan. Ia adalah stiker dengan kawat tipis tambahan yang membentang di dalamnya, dan Anda menempelkannya melintasi apa pun yang ingin Anda lindungi, di atas penutup kotak atau di sekeliling tutup botol, tugas yang sama seperti yang dilakukan stiker "garansi hangus jika rusak" saat ini. Buka barangnya dan Anda merobek stikernya, yang memutuskan kawat itu. NFC.cool memeriksa kawat itu saat ketukan dan memberi tahu Anda dengan jelas apakah segelnya masih utuh atau sudah rusak. Yang menariknya, ini bersifat satu arah: putuskan sekali dan chip mengingatnya selamanya, sehingga sesuatu yang telah dibuka lalu disegel ulang dengan hati-hati tetap terbaca sebagai telah dibuka. Kripto membuktikan chip tersebut asli; ini membuktikan tidak ada yang pernah masuk ke dalam kotaknya.

Semua ini gratis untuk semua orang. Membaca sebuah tag - tautannya, penghitung ketukannya, tata letak filenya, apakah segelnya masih utuh - dan menjalankan kedua pemeriksaan kriptografis tidak dikenai biaya sama sekali. Saya ingin pertanyaan "apakah benda ini asli?" bisa dijawab oleh siapa saja yang mengetuknya.

## Memprogram tag aman Anda sendiri

Membaca hanyalah separuhnya. Separuh lainnya adalah bahwa tag kosong dari AliExpress itu bebas Anda program, dan NFC.cool melakukannya melalui saluran yang terautentikasi dan terenkripsi dengan benar, secure messaging yang sama yang diharuskan chip, bukan sekadar menuliskan data mentah begitu saja sambil berharap berhasil.

Versi mudahnya ada tiga langkah. Tulis tautan Anda sendiri, yang gratis. Nyalakan SUN sehingga tag mulai menandatangani setiap ketukan. Dan ganti kunci pabrik dengan kunci Anda sendiri, yang diatur sebagai passphrase sehingga tidak ada string hex 32 karakter yang harus diurus, tersimpan di keychain Anda. Mulai saat itu tag terkunci untuk Anda: ia terus membuktikan dirinya asli kepada siapa saja yang mengetuknya, tetapi hanya Anda yang bisa memprogramnya ulang.

Di situlah saya bisa saja berhenti. Segelintir aplikasi yang bahkan mau menyentuh tag semacam ini pun berhenti di situ. Saya tidak.

## Konfigurasikan seluruh chip NTAG 424 DNA dari iPhone atau Android Anda

Di suatu titik dalam seminggu penuh begadang dengan tag-tag ini, saya membuat sebuah keputusan: NFC.cool Tools akan mencakup 100% spesifikasi NTAG 424 DNA, bukan potongan kecil yang enak untuk demo, yang menjadi tempat berhenti setiap tutorial "ketuk untuk verifikasi". Jika saya ingin ini menjadi aplikasi NFC terbaik yang ada, maka "kami mendukung NTAG 424 DNA" tidak boleh diam-diam berarti "kami mendukung satu kunci dan satu mode yang mudah saja". Jadi saya menyusuri datasheet dan membangun sisanya.

Chip NTAG 424 DNA tidak memiliki satu kunci. Ia memiliki lima. NFC.cool kini mengelola semuanya - mengubah slot mana pun, meresetnya kembali ke setelan pabrik, atau memasukkan kunci yang Anda atur di perangkat lain sehingga ponsel ini juga bisa menjalankan tag. SUN pun tidak harus menandatangani dengan kunci utama itu: Anda bisa mengarahkan enkripsi ketukan ke satu kunci dan tanda tangannya ke kunci lain, serta memutuskan apakah tag mencerminkan ID-nya secara terbuka atau menjaganya tetap terenkripsi.

Setiap file pada chip membawa aturan aksesnya sendiri, dan kini Anda bisa mengeditnya - siapa yang boleh membaca sebuah file, siapa yang boleh menulisnya, siapa yang boleh mengubah pengaturannya - masing-masing diatur ke kunci tertentu, atau dibuka lebar, atau ditutup selamanya. Di bawah file-file itu terletak konfigurasi chip itu sendiri, dan itu juga ada di sini: nyalakan ID acak sehingga tag berhenti menyiarkan nomor seri yang sama ke setiap pembaca yang dilewatinya (keuntungan nyata untuk privasi), batasi berapa kali upaya buka kunci boleh gagal sebelum ia mengunci dirinya sendiri, dan segelintir sakelar tingkat lebih rendah yang tidak akan pernah perlu disentuh kebanyakan orang.

Chip bahkan menyimpan sebuah brankas pribadi kecil. Ada sebuah file terenkripsi di dalamnya, terkunci pada Key 0 Anda, yang ikut menumpang pada tag itu sendiri alih-alih berada di sebuah server. Simpan sebuah rahasia kecil di dalamnya, sesuatu yang ingin Anda bawa bersama tag alih-alih tersimpan di database seseorang, dan hanya kunci Anda yang bisa membacanya kembali. NFC.cool menuliskannya dan membacakannya untuk Anda.

Jika Anda pernah melakukan ini sebelumnya, Anda melakukannya di meja kerja. NXP menyediakan sebuah alat Windows bernama TagXplorer, Anda mencolokkan pembaca USB ke komputer, dan Anda mengeklik menyusuri konfigurasi chip dari sana. NFC.cool melakukan semua hal yang sama, tetapi ia dibangun untuk digunakan, bukan untuk diderita. Di mana TagXplorer adalah aplikasi desktop yang penuh dengan hex mentah dan bidang-bidang yang membingungkan, NFC.cool adalah layar berbahasa lugas di ponsel yang sudah ada di saku Anda, dengan passphrase menggantikan kunci mentah dan sebuah peringatan sebelum apa pun yang bersifat permanen. Anda mengendalikan semuanya dengan menempelkan ponsel Anda ke tag selama satu-dua detik.

## Apa itu mode LRP NTAG 424 DNA, dan perubahan yang tidak bisa Anda batalkan

Lalu ada LRP. Dalam catatan desain saya untuk versi pertama, tepat di samping "mode LRP", saya menuliskan "tidak direncanakan - eksotis, tidak dibutuhkan aplikasi konsumen". LRP adalah singkatan dari Leakage-Resilient Primitive, dan ia adalah mode paling paranoid dari tag ini. Normalnya chip menjaga kunci-kuncinya dengan AES biasa, dan mencuri sebuah kunci berarti membobol AES itu sendiri. Tetapi ada jalur serangan yang lebih licik: taruh sebuah chip di meja kerja, amati goyangan samar pada tarikan dayanya dan dengungan elektromagnetiknya saat ia menjalankan kripto, dan dengan cukup banyak jejak seperti itu Anda bisa merekonstruksi kunci rahasia dari kebocoran itu saja, tanpa pernah menyentuh matematikanya. LRP adalah saluran aman yang dibangun ulang, dirancang agar kebocoran itu tidak menyisakan apa pun yang bisa dimanfaatkan. Ini benar-benar berlebihan untuk sebuah stiker pada botol anggur, itulah mengapa kebanyakan tag tidak pernah menyalakannya dan kebanyakan alat tidak pernah belajar berbicara dengannya. Namun ia terus mengganggu saya, dan "cakup seluruh spesifikasi" tidak disertai catatan kaki yang berbunyi "kecuali bagian yang sulit", jadi saya membangunnya. NFC.cool kini berbicara LRP, yang artinya bahkan setelah sebuah tag dialihkan ke mode itu, sebuah sakelar satu arah yang tidak bisa Anda tarik kembali, aplikasi masih bisa terautentikasi kepadanya dan mengelolanya seperti tag lainnya. Saya tidak tahu ada aplikasi ponsel lain yang sampai ke sana.

Saya akan berterus terang soal sisi-sisi berbahayanya, karena kini jumlahnya makin banyak. Banyak dari perintah ini bersifat permanen. Mengaktifkan LRP tidak bisa dibatalkan. Menyalakan ID acak tidak bisa dibatalkan. Atur izin "ubah" sebuah file ke "Tidak Pernah" dan Anda telah membekukan file itu selama masa pakai tag. Kunci yang salah bisa mengunci sebuah slot untuk selamanya. Aplikasi memperingatkan hal ini dengan tegas saat itu juga: tindakan yang benar-benar tidak bisa dibalik mengharuskan Anda mengonfirmasi melalui peringatan yang menjabarkan konsekuensinya secara persis. Namun hal ini layak disampaikan di sini juga: berlatihlah pada tag cadangan sebelum Anda menyentuh tag yang Anda pedulikan.

## Di mana tag NFC anti-pemalsuan benar-benar digunakan

Jujur saja? Kebanyakan orang yang mengetuk sebuah tag NFC tidak pernah membutuhkan semua ini, dan itu tidak masalah. Sebuah stiker yang membuka sebuah tautan adalah benda yang luar biasa, membosankan, dan berguna.

Tetapi begitu Anda memegang salah satu tag ini, kegunaannya langsung terlihat jelas. Sebuah tas mewah bisa membuktikan dirinya asli. Sebotol anggur atau wiski bisa menunjukkan bahwa ia tidak pernah diam-diam dibuka lalu diisi ulang dengan sesuatu yang lebih murah, dengan segel anti-perusakan yang menjaga sisi itu. Sekotak obat menjamin baik obat asli di dalamnya maupun segel yang tidak pernah dirusak siapa pun. Sebuah produk edisi terbatas atau sebuah karya seni mendapatkan sertifikat yang tidak bisa dipalsukan siapa pun, dan tiket acara berhenti menjadi sesuatu yang bisa Anda tangkap layar dan bagikan ke sana-sini. Pasang tag di dekat pintu atau di rak, dan satu ketukan membuktikan bahwa seseorang benar-benar berdiri di sana, alih-alih memutar ulang tautan tersimpan dari sofa mereka. Sepatu sneaker dan kartu koleksi bisa membuktikan dirinya rilisan asli, bukan tiruan yang meyakinkan. Dan setiap pembuat indie bisa membuat barangnya membuktikan bahwa ia adalah barang *mereka* sendiri. Ini adalah masalah keaslian yang sama yang sedang didekati [Paspor Produk Digital UE](/blog/eu-digital-product-passport-2026/) dari sisi regulasi, dipecahkan pada tingkat objek individual.

Saya tidak membangun ini karena seribu pengguna memintanya. Saya membangunnya karena saya membeli beberapa tag aneh dari internet karena rasa penasaran, memahami cara kerjanya, dan kemudian tidak sanggup membiarkan satu halaman pun dari datasheet itu tak terbuka. Biasanya begitulah fitur-fitur yang bagus bermula.

## Kesimpulan akhir tentang tag NTAG 424 DNA

Tag NTAG 424 DNA adalah hal yang paling mendekati segel anti-perusakan yang dimiliki NFC. Tag ini tidak bisa menghentikan seseorang menyalin sebuah produk, tetapi membuat *bukti keaslian* produk tersebut mustahil dipalsukan, karena bukti itu adalah tanda tangan kriptografis baru yang hanya bisa dihasilkan chip asli.

NFC.cool Tools kini membacanya, memverifikasi chip, ketukan, dan segel anti-perusakan secara gratis, dan menyerahkan seluruh chip kepada Anda untuk dikonfigurasi - setiap kunci, izin setiap file, pengaturan tingkat terendahnya, bahkan LRP - untuk menyiapkan tag Anda sendiri langsung dari ponsel Anda. Jika Anda pernah bertanya-tanya bagaimana sebuah ketukan bisa membedakan asli dari palsu, dapatkan di [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-id&mt=8) atau [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-id), pesan beberapa [tag ini](/affiliate-links/) seharga beberapa euro, dan ketuk sendiri salah satunya. Ini benar-benar topik yang asyik untuk didalami.
