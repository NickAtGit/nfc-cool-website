---
id: nfc-blog-015
title: "Philips Sonicare fırça başlığı sayacını NFC ile nasıl görür ve sıfırlarsın"
date: 2026-04-21
tags: ["nfc-tags", "guides", "automation"]
summary: "Sonicare diş fırçanın her başlığında, yenisini almana kadar geri sayan bir NFC çipi var. Aslında neyi tuttuğunu ve NFC.cool Tools ile kullanımını nasıl görüp sayacı nasıl sıfırlayacağını anlatıyorum."
image: "/assets/images/Blog/reset-sonicare-brush-head-nfc.webp"
imageAlt: "Telefonla sıfırlanan elektrikli diş fırçası başlığı NFC tag'i"
metaTitle: "Philips Sonicare fırça başlığı sayacını NFC ile görme ve sıfırlama (2026)"
metaDescription: "Sonicare fırça başlığında ne kadar süredir fırçaladığını izleyen bir NFC çipi var. Ne kadar ömür kaldığını gör ve sayacı NFC.cool Tools ile sıfırla."
ogTitle: "Sonicare fırça başlığı sayacını nasıl görür ve sıfırlarsın"
ogDescription: "Her Sonicare fırça başlığında değişime doğru geri sayan bir NFC çipi var. Kullanım verilerini gör ve istersen zamanlayıcıyı sıfırla."
---

Elektrikli diş fırçan seni gözetliyor.

Ürkütücü bir gözetleme anlamında değil. "Yenisini alman için dırdır etsin diye fırça başlığına minik bir NFC çipi koyduk" anlamında. Her Philips Sonicare yedek başlığında, plastiğin içine gömülü bir NTAG213 var; ne kadar süredir fırçaladığını izliyor ve üç ayın dolduğuna karar verdiğinde sapa uyarı ışığını yakmasını söylüyor.

Boktan Nesnelerin İnterneti'ne hoş geldin.

Mesele şu ki üç ay bir öneri, tıbbi bir gerçek değil. Kılların yıpranması ne kadar sert fırçaladığına, hangi diş macununu kullandığına ve ne sıklıkta fırçaladığına bağlı. Çip kılların durumunu ölçmüyor. Yalnızca saniye sayıyor. Yumuşak macunla nazikçe fırçalayan birinin kılları üç ay sonra gayet iyi durumda olabilir. Zamanlayıcı bunu ne bilir ne umursar.

NFC.cool Tools artık o çipi okuyabiliyor, fırça başlığının ömrünün ne kadarını kullandığını tam olarak gösteriyor ve kıllarının hâlâ iyi olduğuna karar verirsen zamanlayıcıyı sıfırlıyor. Nasıl çalıştığı burada.

---

## Çipte aslında ne var

Bunların hiçbirini kendim tersine mühendislikle çözmedim. Cyrill Künzi [protokolü söktü](https://kuenzi.dev/toothbrush/), mbirth de [her baytı haritaladı](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html); aşağıdaki her şeyi ikisi birlikte çözdü. Fırça başlığındaki NTAG213'ün sakladıkları:

- **Fırça başlığı türü ve rengi** - `0x1F` sayfasındaki tek bir bayt, modeli (Premium All-in-One, Gum Care, DiamondClean ve diğerleri) ve rengini tanımlıyor ([mbirth'ün bellek haritası](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) bilinen 22 türü listeliyor)
- **Hedef ömür** - `0x21`'de, genelde `0x5460` = 21.600 saniye, yani 180 adet iki dakikalık fırçalama ya da günde iki kez kullanımla üç ay
- **Üretim kodu** - `0x21-0x23` arasında, üretim tarihi ve hattı ASCII olarak, örneğin `241206 31K` (6 Aralık 2024'te, 31K hattında üretildi). Sapın üstünde de basılı
- **Birikmiş fırçalama süresi** - `0x24` sayfasının ilk iki baytı, başlığın kullanımda geçirdiği toplam saniyeyi 16 bitlik bir değer olarak tutuyor. `0xFFFF`'e (65.535 saniye, kesintisiz yaklaşık 18 saat fırçalama) ulaşınca sayaç duruyor. Yepyeni bir başlık `00:00:02:00` ile başlıyor; ilk iki bayt sıfır (kullanım yok), son iki baytın anlamı şu an bilinmiyor
- **Son yoğunluk ve mod** - yine `0x24`'te: Düşük/Orta/Yüksek ve Clean/White+/Gum Health/Deep Clean+
- **Bir adres** - `philips.com/nfcbrushheadtap` adresine işaret ediyor; başlığı sıradan bir NFC okuyucuyla okuttuğunda açılıyor

Birikmiş süre hedefi (21.600 saniye) aştığında sap kehribar rengi ışığını yakıp söndürüyor. Konuşan çip, kıllar değil.

---

## Neden sıfırlamak isteyebilirsin

Üç aylık değiştirme aralığı Philips'in önerisi, kılların yıpranmasının bilimsel ölçümü değil. Çip saniye sayıyor, kıl yıpranması değil. Bunu kendin belirlemek istiyorsan, yani geri sayan bir zamanlayıcıya uymak yerine kıllarına bakarak karar vermek istiyorsan, sayacı sıfırlamak bunu yapmanı sağlıyor.

Birden çok başlık arasında dönüşümlü kullanıyorsan (seyahat ve ev gibi) ve bunları kendin izlemek istiyorsan da sıfırlayabilirsin.

---

## Parola nasıl çalışıyor

NTAG213 parola korumalı. Her fırça başlığının kendine özgü 4 baytlık bir parolası var. Diş fırçasının sapı, tag'e her yazışında bununla kimlik doğruluyor.

Parola iki girdiden hesaplanıyor: tag'in 7 baytlık UID'si ve tag'de saklı olan (ve sapın üstüne basılı) üretim kodu. [Aaron Christophel](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) algoritmayı Sonicare donanım yazılımından tersine mühendislikle çıkardı; öncesinde Cyrill Künzi parola aktarımını yazılım tanımlı radyoyla dinlemişti.

**Önemli:** NTAG213, **üç başarısız parola denemesinden** sonra kalıcı olarak kilitleniyor. Çip sonsuza dek salt okunur oluyor; diş fırçası bile artık üstüne yazamıyor. Tahmin yürütme.

---

## NFC.cool Tools ile nasıl görülür ve sıfırlanır

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/reset-sonicare-brush-head-nfc/1-read-440w.webp" alt="NFC.cool Tools'taki Sonicare Reset ekranı, fırça başlığını iPhone'a tutmanı istiyor"><p><strong>Başlığı oku.</strong> NFC Oku'ya dokun ve fırça başlığını iPhone'una tut.</p></li>
<li><img src="/assets/images/Blog/screens/reset-sonicare-brush-head-nfc/2-stats-440w.webp" alt="Yüzde 80'i kullanılmış bir Sonicare fırça başlığı; 4 sa 50 dk kullanılmış, 1 sa 10 dk kalmış"><p><strong>Verilere bak.</strong> Başlığın ömrünün ne kadarını kullandığını gör.</p></li>
<li><img src="/assets/images/Blog/screens/reset-sonicare-brush-head-nfc/3-reset-440w.webp" alt="Sıfırlamadan sonra aynı fırça başlığı, yeniden yüzde 0 kullanımda"><p><strong>Sıfırla.</strong> Kılların izin veriyorsa yeniden sıfıra.</p></li>
</ol>
</figure>

NFC.cool Tools sürecin tamamını hallediyor: tag'i okuyor, parolayı hesaplıyor ve verileri gösteriyor. Onaltılık komut yok, web hesaplayıcı yok, yazılım tanımlı radyo yok.

1. iPhone'unda **NFC.cool Tools**'u aç
2. **Diş Fırçası Başlığı Sıfırlama**'ya git
3. **NFC Oku**'ya dokun ve fırça başlığını telefonuna tut
4. Uygulama, başlığın ömrünün ne kadarını kullandığını **yüzde göstergesiyle** gösteriyor; altında kullanılan ve kalan süre yazıyor
5. Kullanım sayacını sıfıra döndürmek için **Zamanlayıcıyı Sıfırla**'ya dokun ya da başka bir başlık okut

Şu anda [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-tr&mt=8) ve [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-tr) sürümünde bulunuyor.

---

## Sıfırlama aslında ne yapıyor

Sıfırladığında `0x24` sayfasına `00:00:02:00` yazıyorsun; yepyeni bir fırça başlığının kutudan çıktığı değerin aynısı. Yalnızca ilk iki bayt (kullanım sayacı) sıfıra dönüyor. Son iki baytın anlamı bilinmediği için uygulama onları olduğu gibi bırakıyor.

Diş fırçası sıfırdan saymaya başlıyor ve kehribar ışık üç ay sonra yeniden geliyor. O noktada kıllarına bakıp kendin karar verebilirsin.

---

## Büyük resim: gündelik nesnelerde NFC

Bir sonraki alışverişine doğru geri sayan NFC çipli diş fırçası başlığı, Boktan Nesnelerin İnterneti'nin zirvesi. İşimi NFC üzerine kurdum çünkü gerçekten yararlı olduğunu düşünüyorum; ama onu tam da daha fazla satın almaya itmek için tek kullanımlık plastiğe gömmek... bir tercih.

Aynı NTAG213 çipi, tüketicinin gerçekten işine yarayan şeylerde de kullanılıyor: ürün doğrulama, geçiş denetimi ve yakında AB Dijital Ürün Pasaportu. Bu sonuncusu, ne aldığını ve nereden geldiğini doğrulayabilesin diye tüketici ürünlerinde NFC tag'i zorunlu kılacak. İşte bu, NFC'nin sana karşı değil, senin *için* kullanılması.

NFC.cool Tools bunların hepsini okuyup yazıyor. Sonicare özelliği, çevrendeki tag'lerin üstünde ne olduğunu anlamanın ve o bilgiyle ne yapacağına karar vermenin bir örneği.

---

## İleri okuma

- [Cyrill Künzi'nin özgün tersine mühendislik yazısı](https://kuenzi.dev/toothbrush/) - yazılım tanımlı radyoyla dinleme, parola çıkarma ve Sonicare NFC protokolünün ilk ayrıntılı çözümlemesi
- [Aaron Christophel'in parola üreticisi](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) - Sonicare donanım yazılımından çıkarılan algoritma
- [mbirth'ün NTAG213 bellek haritası](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) - çipteki her baytın ayrıntılı belgesi

*Bakacak bir Sonicare fırça başlığın mı var? [NFC.cool Tools'u iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-tr&mt=8) ya da [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-tr) için indir ve diş fırçanın neleri izlediğini gör.*
