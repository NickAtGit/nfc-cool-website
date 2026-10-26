---
id: "read-passport-nfc-chip-2026-07"
title: "Pasaportundaki NFC çipini telefonunla oku"
date: "2026-07-20"
tags: ["announcements", "nfc-tags", "privacy"]
summary: "Pasaportunun içinde bir NFC çipi var ve telefonun artık onu okuyabiliyor. NFC.cool Tools, iPhone ve Android'de pasaporttaki, kimlik kartındaki ya da oturma iznindeki çipi okuyor: saklı fotoğrafı ve bilgileri gösteriyor, belgenin gerçek olup olmadığını denetliyor."
image: "/assets/images/Blog/read-passport-nfc-chip.webp"
imageAlt: "Onay işareti gösteren bir iPhone'un yanında, altın NFC simgesi taşıyan lacivert pasaport"
author: "Nicolo Stanciu"
metaTitle: "Pasaportundaki NFC çipini telefonunla oku"
metaDescription: "Pasaportunda bir NFC çipi var ve NFC.cool onu iPhone ile Android'de okuyabiliyor. Çipte saklı fotoğrafı ve bilgileri gör, belgenin gerçek olup olmadığını denetle."
ogTitle: "Pasaportunda bir NFC çipi var. Artık telefonun onu okuyabiliyor."
ogDescription: "NFC.cool artık pasaportundaki, kimlik kartındaki ya da oturma iznindeki çipi okuyor: fotoğrafı, bilgileri ve gerçek olup olmadığını. iPhone ve Android'de."
---
En son uçtuğumda o otomatik pasaport kapılarından birinin önünde bir dakika bekledim; pasaportu okuyucuya koyduğun, kameraya baktığın ve kapıların seni beğenmesini beklediğin cam kabin. Biraz sürüyor. O sürede kendimi makinenin aslında ne yaptığını düşünürken buldum. Yalnızca basılı sayfayı okumuyordu. Pasaportumun kapağının içine gizlenmiş küçük çiple de konuşuyordu.

Yıllardır geçimimi NFC çipi okuyarak sağlıyorum. O çipin orada olduğunu biliyordum. Yalnızca kendi uygulamamı ona hiç doğrultmamıştım. O kapının önünde dururken bir sınır kioskunun pasaportumu okuyup NFC.cool'un okuyamaması beni gerçekten rahatsız etti.

NFC.cool'un var olma sebebi bu tür kaşıntılar. Onun için hedefim hep basit ve biraz da inatçı oldu: telefona koyabileceğin en iyi NFC okuyucu olmak ve NFC'nin fiilen yapabildiği her şeyi desteklemek, üstelik bunu tutmak için mühendislik diploması gereken bir araca dönüşmeden. Pasaport çipi de "NFC'nin yapabildiği her şey"in epey iyi bir örneği. Ben de ekledim.

NFC.cool Tools artık hem iPhone hem Android'de biyometrik pasaportun, kimlik kartının ya da oturma izninin içindeki çipi okuyor. Çipte saklı fotoğrafı ve kişisel bilgileri gösteriyor, belgenin gerçek görünüp görünmediğini söylüyor. Nasıl çalıştığı ve dürüst sınırları burada.

---

## Belgeyi elinde tuttuğunu kanıtlamadan çip konuşmuyor

İnsanları şaşırtan kısım bu: telefonunu pasaportun üstünde sallayıp okuyamıyorsun. Çip bilerek kilitli. Ona bir anahtar uzatmadan tek kelime etmiyor ve o anahtar kendi belgenin üstünde basılı duruyor.

Bunu çok hoş bir tasarım buluyorum. Yani kimse cebinde ya da çantanda dururken pasaportunu sessizce okuyamıyor. İçeri girmenin tek yolu belgeyi zaten elinde açık tutmak, çünkü anahtar üstünde yazanlardan kuruluyor: belge numarası, doğum tarihin ve son kullanma tarihi.

Uygulama da önce tam bu üç şeyi, iki yoldan biriyle istiyor. Kameranı makineyle okunabilir alana doğrultabilirsin; pasaportunun fotoğraf sayfasının altındaki ya da kimlik kartının arkasındaki o kalın `<<<` karakterlerinden oluşan şerit. NFC.cool onu havalimanı kapısıyla aynı şekilde, optik olarak okuyor. Ya da belge yıpranmışsa veya ışık kötüyse üç değeri elle yazarsın. Nasıl olursa olsun, uygulama anahtarı aldıktan sonra telefonun üst kısmını belgeye tutmanı istiyor ve asıl çip okuması başlıyor. [NFC'nin iPhone'da gerçekte nasıl çalıştığını](/blog/nfc-on-iphones-insider-look/) hiç merak ettiysen bu da aynı yakın mesafe tokalaşması, yalnızca karşı tarafta çok daha titiz bir çip var.

---

## Çipten neler geliyor

Birkaç saniye sonra çipin bunca zamandır taşıdığı şeye bakıyorsun: belgeyi veren makamın sakladığı fotoğrafın, adın, uyruğun, belge numaran, doğum ve son kullanma tarihin, bazı belgelerde biraz daha fazlası: doğum yeri, veren makam, veriliş tarihi. Görevlinin kabininde çekilen verinin aynısı, yalnızca senin elinde duruyor.

Okuduğun her belge, uygulamadaki Belgelerim adlı küçük bir cüzdana kaydediliyor, böylece sonradan bakabiliyorsun. O cüzdan cihazında yaşıyor ve iPhone'da senin kendi iCloud'unla eşitleniyor. Bana ya da bana ait herhangi bir sunucuya gelmiyor. Bu kadar kişisel bir şeyde bu ayrıntıyı dipnota gömmem.

<figure class="phone-figure" data-layout="stage">
<figcaption>NFC.cool Tools ile pasaport okumak</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/read-passport-nfc-chip/1-key-440w.webp" alt="NFC.cool Tools'taki Pasaport ve Kimlik ekranı, kamerayla tarama ve bilgileri elle girme seçenekleriyle"><p><strong>Anahtarı ver.</strong> Makinece okunabilir bölgeyi kamerayla tara ya da üç değeri elle yaz.</p></li>
<li><img src="/assets/images/Blog/screens/read-passport-nfc-chip/2-chip-440w.webp" alt="Okunmuş bir pasaport; kayıtlı fotoğraf, sahibinin adı ve belge numarası görünüyor"><p><strong>Çipi oku.</strong> Telefonunun üst kenarını belgeye tut, fotoğraf ve bilgiler çipten gelsin.</p></li>
<li><img src="/assets/images/Blog/screens/read-passport-nfc-chip/3-genuine-440w.webp" alt="Özgünlük kontrollerinin hepsi geçti: belge gerçek görünüyor, veriler verildiğinden beri değişmemiş, imza geçerli, veren kurumun sertifikası güvenilir, çipin kopyalama koruması var"><p><strong>Mührü kontrol et.</strong> Çipin desteklediği her kontrol, veren kurumun imzasından kopyalama korumasına kadar.</p></li>
<li><img src="/assets/images/Blog/screens/read-passport-nfc-chip/4-my-documents-440w.webp" alt="Belgelerim, kayıtlı beş pasaport ve kimlik kartının listesi"><p><strong>Belgelerim'de sakla.</strong> Cihazında kalır, yalnızca kendi iCloud'un üzerinden eşitlenir.</p></li>
</ol>
</figure>

---

## Gerçek mi?

En memnun olduğum kısım gerçeklik denetimi. Modern bir pasaport çipi yalnızca bellek kartı değil. Belgeyi veren ülke içeriğini imzalıyor; veriye basılmış mühür mumu gibi. NFC.cool o mührü denetliyor: çipteki hiçbir şeyin verildiğinden beri değişmemiş olduğunu, imzanın matematiksel olarak geçerli olduğunu ve uygulamanın tanıdığı gerçek bir veren makama dayandığını. Daha iyi çipler kopya değil özgün silikon olduklarını da kanıtlayabiliyor ve çip destekliyorsa uygulama bunu da denetliyor.

Yine de sözcükler konusunda kendime bir söz verdim. Uygulama pasaportuna asla "sahte" demeyecek. Tüm denetimler geçerse belge gerçek görünüyor diyor. Bir şey tutmazsa ya da çok daha sık olduğu gibi, o ülke uygulamanın taşıdığı listede olmadığı için veren makamı doğrulayamazsa doğrulayamadım diyor ve orada duruyor. "Bunu denetleyemedim" ile "bu sahte" çok farklı iki cümle ve kimliğin kadar ciddi bir konuda ikisini bulandırmaya niyetim yok.

---

## Dürüst sınırlar

Birkaç net yanıt, çünkü bu, laf kalabalığının haksızlık olacağı türden bir özellik.

Pek çok belgede çalışıyor ama her belgede çalıştığına söz veremem. Farklı ülkelerden bir yığın pasaport ve kartla sınadım, çoğu sorunsuz okundu; ama dünyanın belgeleri kusursuz biçimde tekdüze değil ve seninki istisna olabilir. Biri okumazsa sorun genelde belgede, sende değil.

Okumasına izin verilen kadarını okuyor, fazlasını değil. Bazı çipler parmak izi ya da iris verisi de saklıyor ve bunlar yalnızca resmi denetim sistemlerinde bulunan anahtarların arkasında duruyor. Bir tüketici uygulamasına verilen bir şey değil ve bende olmasını da istemezdim. NFC.cool onlara hiç dokunmuyor. Yüz fotoğrafını ve basılı türden bilgileri okuyor; yani belgeyi elinde tutan kişinin okuyabilmesi amaçlanan kısmı.

Bir de NFC'si olan bir telefon gerekiyor ve okuma boyunca telefonu belgeye sabit tutmalısın. Çip küçük ve bağlantı hassas, yani telefon kayarsa okumaya baştan başlıyorsun. Bitene kadar belgeyi telefonun üst kısmına düz tut.

O havalimanı kapısını hâlâ düşünüyorum. Modern seyahatin tüm güvenlik gösterisi ve tam ortasında minik bir NFC çipi özenli, küçük bir tokalaşma yapıyor. Yıllardır [tag okuyup yazarken](/features/nfc-reader-writer/) kullandığım tokalaşmanın aynısı. Artık cebindeki okuyucu da bunu yapabiliyor.

Kendi pasaportunun sessizce ne taşıdığını görmek istersen Pasaport ve Kimlik okuyucusu, NFC için yaptığım her şeyin yanı başında, [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-read-passport-nfc-chip-tr&mt=8) ve [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-read-passport-nfc-chip-tr) için NFC.cool Tools içinde. Pasaportunu aç, telefonuna tut ve çipte yaşayan halinle tanış.
