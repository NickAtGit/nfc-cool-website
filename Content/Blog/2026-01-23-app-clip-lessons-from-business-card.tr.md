---
id: "app-clip-lessons-2026-01"
title: "İyi bir App Clip deneyimi kurmak: NFC.cool Business Card'dan çıkarımlar"
date: "2026-01-23"
tags: ["business-cards", "networking", "iphone"]
summary: "NFC.cool Business Card'ın App Clip akışının arkasındaki mimariyi anlattığım, Prag'daki mDevCamp 2025 konuşmasının özeti."
metaDescription: "NFC.cool Business Card App Clip'ini kurarken öğrendiklerim: mimari, boyut sınırları ve tek dokunuşla kişi kaydetme. Prag'daki mDevCamp 2025 konuşmamdan derledim."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/app-clip-mdevcamp.webp"
imageAlt: "Prag'daki mDevCamp 2025'te konuşma yaparken"
---

2025'te ilk konferans konuşmamı yaptım ve konu olarak yıllardır içinde yaşadığım ama hiçbir salona anlatmak zorunda kalmadığım şeyi seçtim: NFC.cool Business Card'ın arkasındaki App Clip gerçekte nasıl çalışıyor. Konuşma Prag'daki mDevCamp 2025'teydi ve başlığı bu yazınınkiyle aynı.

Hiç denk gelmediysen: App Clip, bir iOS uygulamasının NFC okutmasıyla ya da QR taramasıyla anında açılan küçük parçası. App Store yok, kurulum yok. Telefonları yaklaştırdıktan yaklaşık bir saniye sonra karşındakinin NFC.cool kartvizitini hiçbir şey indirmeden görmesini sağlayan şey bu. Bunu anlık hissettirmek, üstelik paylaşılan kart verisini güvende tutup kimseyi kayıt olmaya zorlamadan yapmak, dışarıdan göründüğünden çok daha fazla mimari karar gerektiriyor. Konuşma bunları tek tek gezdi: App Clip nasıl kurgulanmış, SwiftUI hangi noktada hak ediyor ve arka uç kart verisini nasıl ele alıyor.

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/app-clip-lessons-from-business-card/app-clip-440w.webp" alt="Dokunduktan sonra NFC.cool Business Card App Clip'i: Baptiste Electrical'dan Devon Baptiste; Website, Facebook ve YouTube bağlantıları ve Save Contact düğmesiyle"><p><strong>App Clip.</strong> Dokunuştan yaklaşık bir saniye sonra, kurulum olmadan açılan ekran.</p></li>
</ol>
</figure>

Bunu sahneden anlatmak bana iyi geldi. Çoğunu sezgiyle verdiğim kararları gerekçelendirmek zorunda kaldım ve sonrasında gelen sorular, ki aynı kavgaları verdiği belli olan iOS geliştiricilerinden geliyordu, herhangi bir kod incelemesinden daha keskindi. Oturduğum yapı, yani SwiftUI ile App Clip ve güvenli bir arka uç arayüzü, bu sınamayı geçti. Koridor sohbetlerinden çıkan birkaç öneri de uygulamaya çoktan girdi.

Konuşmanın tamamını [Slideslive'da](https://slideslive.com/39043369/building-a-great-app-clip-experience-lessons-from-nfccool-business-card) izleyebilirsin.
