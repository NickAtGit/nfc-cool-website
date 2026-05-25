---
id: "app-clip-lessons-2026-01"
title: "Membangun pengalaman App Clip yang hebat: pelajaran dari NFC.cool Business Card"
date: "2026-01-23"
tags: ["business-cards", "networking", "iphone"]
summary: "Ringkasan pembicaraan di mDevCamp 2025 di Praha tentang arsitektur di balik alur App Clip NFC.cool Business Card."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/app-clip-mdevcamp.webp"
imageAlt: "Berbicara di mDevCamp 2025 di Praha"
---

Pada tahun 2025 saya memberikan pembicaraan konferensi pertama saya, dan saya memilih topik yang telah saya jalani bertahun-tahun tetapi belum pernah harus saya jelaskan di depan ruangan: bagaimana App Clip di balik NFC.cool Business Card sebenarnya bekerja. Pembicaraan itu di mDevCamp 2025 di Praha, dan saya memberinya judul yang sama dengan posting ini.

Jika Anda belum pernah menemuinya, App Clip adalah bagian kecil dari aplikasi iOS yang terbuka secara instan dari ketukan NFC atau pemindaian kode QR - tanpa App Store, tanpa instalasi. Inilah yang memungkinkan seseorang melihat kartu nama NFC.cool Anda sekitar satu detik setelah Anda mengetuk ponsel, tanpa mengunduh apa pun. Membuat itu terasa instan, sambil tetap menjaga keamanan data kartu yang dibagikan dan tidak memaksa siapa pun untuk mendaftar, membutuhkan lebih banyak keputusan arsitektur daripada yang terlihat dari luar. Pembicaraan itu membahasnya: bagaimana App Clip terstruktur, di mana SwiftUI berperan, dan bagaimana backend menangani data kartu.

Menjelaskannya dari panggung bermanfaat bagi saya. Hal itu membuat saya membenarkan pilihan yang sebagian besar saya buat berdasarkan insting, dan pertanyaan-pertanyaan sesudahnya - dari pengembang iOS yang jelas telah berjuang dengan masalah yang sama - lebih tajam dari tinjauan kode mana pun. Bentuk yang telah saya tetapkan, App Clips dengan SwiftUI dan backend API yang aman, bertahan dari pengawasan tersebut, dan beberapa saran dari percakapan di lorong sudah masuk ke dalam aplikasi.

Anda bisa menonton pembicaraan lengkapnya di [Slideslive](https://slideslive.com/39043369/building-a-great-app-clip-experience-lessons-from-nfccool-business-card).
