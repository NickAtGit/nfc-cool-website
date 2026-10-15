---
id: nfc-blog-022
title: "Okut, tara, kazan: QR kodlar adresten başka ne taşıyabilir"
date: 2024-02-17
tags: ["qr-codes", "business-cards"]
summary: "QR kodlar yalnızca adres için değil. Wi-Fi bilgisi, takvim etkinliği, konum, vCard, düz metin, kodlayabildiğin her şeyi taşıyabilirler. NFC.cool'un QR üreticisiyle tarayıcısının yapabildiklerinin tam listesi."
metaTitle: "QR kodlar ne taşıyabilir: adreslerin ötesinde"
metaDescription: "QR kodlar yalnızca adres değil, Wi-Fi bilgisi, kişi, takvim etkinliği, konum ve daha fazlasını kodlayabilir. Her QR içerik türü ve nerede kullanılacağı için uygulamalı rehber."
ogTitle: "Okut, tara, kazan: QR kodlar adresten başka ne taşıyabilir"
ogDescription: "QR kodlar Wi-Fi, kişi, takvim ve konum kodlayabilir, yalnızca adres değil."
image: "/assets/images/Blog/tap-scan-thrive.webp"
---
QR kod, aslında bir kova dolusu bayt. Adresler açık ara en yaygın içerik ama belirtim buna aldırmıyor: Wi-Fi bilgisi, takvim etkinliği, harita imi, kişi kartı, düz metin ya da bir uygulamanın çözmeyi bildiği özel bir içerik de kodlayabilirsin.

NFC.cool'un QR üreticisi bunların hepsini kapsıyor. İşte her birinin tarandığında gerçekte ne yaptığı.

---

## Adresler

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/tap-scan-thrive/types-440w.webp" alt="NFC.cool Tools'ta Create QR Code: Web Link, Google Review Link, Text, Business Card, Telephone Number, Email, SMS, Location, FaceTime ve Event"><p><strong>Tek liste, her içerik.</strong> Bağlantılar, Wi-Fi, kişiler, konumlar ve etkinlikler hep buradan başlar.</p></li>
</ol>
</figure>

Temel durum. `https://ornek.com` kodla, herhangi bir kamerayla tara, cihaz açmayı önersin. Son on yılda üretilmiş her telefonda çalışıyor.

İşe yarar bir varyant: kısa bağlantılar. Analitik parametreleriyle şişmiş adreslerin varsa QR'ı kısa sürüm üzerinden üret; kod fiziksel olarak küçülür (daha az modül, daha seyrek desen) ve uzaktan taranması kolaylaşır.

---

## Wi-Fi bilgileri

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/tap-scan-thrive/1-wifi-form-440w.webp" alt="NFC.cool Tools'taki Wi-Fi QR formu: ağ adı, parola, WPA/WPA2 kimlik doğrulama ve gizli ağ"><p><strong>Ağı gir.</strong> Ad, parola ve güvenlik türü.</p></li>
<li><img src="/assets/images/Blog/screens/tap-scan-thrive/2-wifi-code-440w.webp" alt="Guest WiFi başlıklı hazır Wi-Fi QR kodu; biçimlendirmek için QR Code Studio ile"><p><strong>Kodu paylaş.</strong> Misafirler tarar ve bağlanır, yazmak yok.</p></li>
</ol>
</figure>

Ağ adını, parolayı ve güvenlik türünü (WPA2, WPA3, açık) standart `WIFI:T:WPA;S:...;P:...;;` biçiminde kodla. iOS, Android ve modern Windows bu biçimi tanıyıp ağa katılmayı öneriyor.

Bunu misafir odandaki küçük bir karta bastır. Modemin arkasına yapıştır. Kafede duvara bantla. Misafirler tarar, katılır, biter; 24 karakterlik parolayı yazmaya gerek kalmaz.

---

## Takvim etkinlikleri

Etkinliği `BEGIN:VEVENT` bloğu olarak, yani iCalendar biçiminde kodla. Tarandığında cihazın takvim uygulamasına eklemeyi önerir; başlangıç, bitiş, konum ve açıklamasıyla birlikte.

Etkinlik afişlerinde, konferans tabelalarında ya da "tarihi not al" kartlarında işe yarıyor. Karşındaki etkinliği web sitesinde aramak zorunda kalmıyor, tek dokunuşla takvimine düşüyor.

---

## Konumlar

Enlem ve boylam içeren bir `geo:` adresi kodla. Tarandığında varsayılan harita uygulaması o imle açılır: iOS'ta Apple Haritalar, çoğu Android telefonda Google Haritalar.

Restoranlar, mekanlar, buluşma noktaları: broşüre ya da davetiyeye küçük bir QR koy, karşındaki tek dokunuşla yol tarifini alsın.

---

## vCard (kişiler)

Adreslerin en yaygın alternatifi. Tam bir vCard kodla (ad, telefon, e-posta, kurum, adres, adres bağlantısı, fotoğraf), cihaz da bunu kişi olarak kaydetmeyi önersin.

QR kartvizitler kutudan çıktığı gibi böyle çalışıyor. Özel bir uygulama olmadan her telefonda vCard QR'ın çalışmasının sebebi de bu: vCard, işletim sisteminin zaten bildiği 30 yıllık bir standart.

NFC.cool kartvizit akışına göre ödünü şu: vCard QR güncellenemez. Bir kez basıldıktan sonra kişi bilgisi donar. Sonradan düzenleyebileceğin tek bir doğru kaynak istiyorsan onun yerine canlı kartvizit sayfana giden bir adres kodla. [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-tap-scan-thrive-tr&mt=8) tam bunu yapıyor ve ciddi tanışmalarda ham vCard QR yerine bunu önermemizin sebebi de bu.

---

## Düz metin

Tarandığında yalnızca bir metin göstermek istiyorsan, örneğin bir mesaj, indirim kodu ya da bilmece, düz metin kodlayabilirsin. Tarayıcı uygulamalarının çoğu bunu gösterip kopyalamayı ya da paylaşmayı önerir.

---

## Özel içerikler

Bazı uygulamalar özel adres şemaları (`myapp://...`) kaydeder ve bunlarla kodlanmış QR kodları tanır. NFC.cool'un tarayıcısı buna saygı duyar: içeriği okur ve kayıtlı uygulamaya devreder, tıpkı iOS ya da Android'in Universal Links ile yaptığı gibi.

---

## Tarama tarafında

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/tap-scan-thrive/scanner-440w.webp" alt="NFC.cool Tools'taki QR tarayıcı; basılı bir kartta bulunan kod ve Finish düğmesi"><p><strong>Tarama.</strong> Kamerayı tut, uygulama içeriği okur ve doğru eylemi önerir.</p></li>
</ol>
</figure>

NFC.cool'un tarayıcısı yukarıdaki biçimlerin hepsini okur ve doğru eyleme yönlendirir: adresler tarayıcıda açılır, vCard'lar kaydetmeyi önerir, Wi-Fi bağlanmayı sorar, konumlar haritada açılır. Ayrıca her taramanın yerel geçmişini tutar; bir konferansta 30 menü okuttuysan ve birine geri dönmek istiyorsan bu çok işe yarar.

QR yığınının tamamı, hem üretici hem tarayıcı, [iPhone için NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-tap-scan-thrive-tr&mt=8) ve [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-tap-scan-thrive-tr) içinde bulunuyor.
