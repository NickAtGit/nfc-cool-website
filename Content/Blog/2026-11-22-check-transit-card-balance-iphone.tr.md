---
id: "check-transit-card-balance-iphone-2026-11"
title: "iPhone ile ulaşım kartı ve IC kart bakiyesi nasıl sorgulanır: Suica, Octopus, T-money ve daha fazlası"
date: "2026-11-22"
tags: ["guides", "iphone", "privacy"]
summary: "Suica, Octopus ya da T-money gibi IC, ulaşım veya e-para kartını iPhone'una yaklaştır, NFC.cool bakiyesini ve son yolculuklarını göstersin. Okuduğu bütün kartlar, banka kartının neleri ele verdiği ve herkesin seninkinden neler okuyabileceği burada."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/check-transit-card-balance-iphone-v4.webp"
imageAlt: "Yeşil IC kart yaklaştırılmış, ekranında ulaşım kartının bakiyesini ve grafiğini gösteren iPhone; önünde iki ulaşım kartı daha duruyor"
metaTitle: "iPhone'da ulaşım ve IC kart bakiyesi sorgula: Suica ve fazlası"
metaDescription: "Suica, PASMO, Octopus, T-money, Clipper ve Opal gibi IC, ulaşım ve e-para kartlarının bakiyesini ve yolculuklarını iPhone'unda gör. NFC.cool'un okuduğu bütün kartlar."
ogTitle: "Ulaşım ve IC kart bakiyeni iPhone'unla öğren"
ogDescription: "Suica, Octopus, T-money, Navigo, Clipper ve daha birçok IC kart: kartı iPhone'una yaklaştır, bakiyesini, yolculuklarını ve herkesin ondan neler okuyabildiğini gör."
---
Yıllarca gelen kutuma hep aynı türden e-postalar düştü; bir düzine dilde, her birinde başka bir kart adıyla. "Uygulaman e-para kartımı okumuyor." "IC kartımı göremiyor." "Metro biletimi telefona tuttum, hiçbir şey olmadı."

Haklılardı da. NFC.cool çipi buluyor, [kimlik numarasını ve çip tipini gösteriyor](/tr/features/nfc-reader-writer/), orada kalıyordu. Elinde içine para yüklenmiş kart tutan biri için uygulama pes etmiş gibi görünüyordu. Ne de olsa aradıkları bakiye tam orada, kartın üstündeydi.

[NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-tr&mt=8) uygulamasının 7.4.0 sürümü, o gelen kutusuna verdiğim yanıt. iPhone'una ulaşım kartı, e-para kartı ya da banka kartı yaklaştır; uygulama artık kartın bakiyesini, son yolculuklarını ve en az bunlar kadar ilginç olanı, başka birinin ondan okuyabileceği her şeyi gösteriyor. Özellik iPhone'da başlıyor, [Android için NFC.cool Tools](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-check-transit-card-balance-iphone-tr) (yakında) da aynı kart okumaya kavuşacak.

---

## Her "NFC kartı" aynı şey değil

Bu kartların hepsi [telefonunla NFC üzerinden konuşuyor](/tr/blog/nfc-on-iphones-insider-look/). Benzerlik de orada bitiyor.

Ben bunu şöyle düşünüyorum: NFC yalnızca giriş kapısı. Kapının ardında her kart, kendi kat planı ve kendi kilitli odaları olan ayrı bir bina. Japonya'nın kartları Sony'nin geliştirdiği **FeliCa** ile çalışıyor. Avrupa'daki ulaşım kartlarının pek çoğu **Calypso** kullanıyor. San Francisco, Sidney ve Helsinki [**MIFARE DESFire**](/tr/blog/ultimate-nfc-tag-guide/#mifare-classic-plus-ve-desfire-geçiş-kontrolü-ailesi) kullanıyor, her birinin içi farklı düzenlenmiş. Banka kartları ise **EMV** konuşuyor; markette kasadaki ödeme terminalinin kullandığı standardın ta kendisi.

Her binanın içinde hangi odaların açık olacağına da işletmeci karar veriyor. Kimisi bakiyeyi ve son yirmi yolculuğu herkesin girebileceği bir odada bırakıyor. Kimisi her kapıyı kilitliyor ve anahtar yalnızca kendi turnikelerinde ve bilet makinelerinde duruyor. Bunu hiçbir uygulama aşamaz, NFC.cool da denemiyor: her okuma salt okunur, hiçbir anahtar kullanmıyor ve karta hiçbir şey yazmıyor.

Yani bu özelliğin arkasındaki asıl iş, her kart sisteminin kat planını tek tek öğrenmekti.

---

## NFC.cool hangi IC ve ulaşım kartlarını okuyor

Uygulamanın bugün okumayı bildikleri şunlar. Önce dürüst bir not. Kendi cüzdanımda ne varsa denedim; Hollanda'nın tek kullanımlık kağıt OV-chipkaart bileti ve kendi banka kartlarım dahil. Ama dünyada herhangi bir cüzdana sığacağından çok daha fazla kart var. Bu yüzden aşağıdaki okuyucuların çoğu, elimde tuttuğum bir karta değil, her kart sisteminin içinin nasıl düzenlendiğine dayanıyor. Seninki yanlış okunursa ya da hiç okunmazsa bunu gerçekten duymak istiyorum. Nasıl haber vereceğini aşağıda anlatıyorum.

<figure class="phone-figure" data-layout="stage">
<figcaption>NFC.cool kartın için neler gösteriyor</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/1-suica-balance-440w.webp" alt="NFC.cool'da Suica kart: ¥2.140 bakiyeli yeşil kart yüzü, altında bakiye grafiği ve ilk yolculuklarla ödemeler"><p><strong>Bakiye.</strong> Kartın bakiyesi en üstte, son yolculuklarda nasıl değiştiği de hemen altında.</p></li>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/2-tmoney-trips-440w.webp" alt="NFC.cool'da ₩12.350 bakiyeli T-money kart ve tarih, saat, tutar ile her işlemden sonra kalan bakiyeyi gösteren ödeme listesi"><p><strong>Yolculuklar ve ödemeler.</strong> Kartın sakladığı her kayıt, ardından kalan bakiyeyle birlikte.</p></li>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/3-locked-card-440w.webp" alt="NFC.cool'da MIFARE DESFire ulaşım kartı: çip tipi ve seri numarası okunabiliyor, yolculuklar, bakiye ve abonmanlar Okunamaz olarak işaretli"><p><strong>Kilitli kartlar.</strong> İşletmeci kartı kilitlediyse uygulama neyin kapalı kaldığını söylüyor.</p></li>
</ol>
</figure>

### Bakiye ve son yolculuklar

- **Japonya:** Suica, PASMO, ICOCA, Kitaca, manaca, nimoca, PiTaPa, TOICA ve Hayakaken; son 20 yolculuğa kadar, uygulamanın tanıdığı yerlerde istasyon adlarıyla birlikte. Rakuten Edy, nanaco ve WAON da bakiyelerini ve geçmişlerini gösteriyor.
- **Güney Kore:** T-money ve Cashbee; son yolculuklar, kartın veriliş ve son kullanma tarihleriyle.
- **Çin ve Hong Kong:** Shenzhen Tong, Wuhan Tong, City Union kartları (Şanghay kartıysa Shanghai Public Transport olarak görünüyor) ve T-Union; son yolculuklar ve geçerlilik tarihleriyle. Hong Kong'un Octopus kartı bakiyesini gösteriyor.
- **Endonezya:** Mandiri e-money, BCA Flazz, BNI TapCash, MegaCash ve KRL Kartu Multi Trip, geçmişleriyle birlikte. JakCard ve MRT Jakarta kartları bakiyeyi gösteriyor.
- **Avustralya ve Yeni Zelanda:** Sidney'deki Opal, bakiyesi ve son yolculuğuyla; bir de T-money ile aynı sistemde çalışan ve NZ$ cinsinden görünen Wellington'ın Snapper kartı.
- **ABD:** San Francisco'da Clipper ve Seattle'da ORCA.
- **Finlandiya:** HSL, Waltti ve Tampere kartları.
- **İsrail:** Rav-Kav; yüklü tutarı, abonmanları ve yolculuklarıyla.

### Abonman ve yolculuk var, bakiye yok

Avrupa'daki pek çok kart hiç bakiye tutmuyor. Onlar abonman taşıyor. Paris'in Navigo kartı ve diğer Fransız Calypso kartları (Pass Pass, KorriGo, OùRA ve fazlası), Brüksel'de MOBIB, Montreal'de Opus, Venezia Unica ve Lisboa Viva, kartta yüklü abonmanları ve son yolculukları gösteriyor. Adelaide'in metroCARD'ı ve Abu Dabi'nin Hafilat kartı da aynısını yapıyor, çünkü bakiyeleri işletmecinin anahtarının arkasında duruyor.

### Kağıt ve tek kullanımlık biletler

İnce kağıt biletlerde de çip var. NFC.cool, Chicago'nun Ventra ve Vancouver'ın Compass biletlerini, Moskova'nın Troika'sını, Clipper'ın kağıt biletlerini, HSL, Tampere, Venedik ve Pisa biletlerini, OV-chipkaart kağıt biletini ve Torino'nun GTT biletlerini okuyor. Bunlarda bilet tipini, biletin ne zaman kesildiğini ve ne zaman okutulduğunu görüyorsun.

### İşletmecinin kilitlediği kartlar

Bazı işletmeciler her şeyi kilitliyor. Londra'nın Oyster, Dublin'in Leap ya da Bangkok'un Rabbit kartında NFC.cool sana bunun hangi kart olduğunu söyleyebiliyor, o kadar; çünkü üzerinde açık başka hiçbir şey yok. Myki (Melbourne) ve PRESTO (Toronto) gibi birkaçı kart numarasını veriyor, gerisini saklıyor. Bu, bir güncellemeyle değişecek bir şey değil. O sistemler böyle kurulmuş.

### Harici okuyucu isteyen kartlar

Bazı kartları iPhone düpedüz uygulamalara bırakmıyor. Singapur'un EZ-Link ve NETS FlashPay kartları ile Pekin'in Yikatong kartı böyle. [Harici bir USB NFC okuyucu](/tr/affiliate-links/#usb-nfc-reader) tak, NFC.cool onları bakiyeleri ve geçmişleriyle okusun. Bu okuyucuların nasıl çalıştığını [iPad ve Mac'te NFC tag okuma](/tr/blog/nfc-reading-ipad-mac/) yazısında anlattım.

---

## Banka kartları: görünenler ve asla görünmeyenler

İnsanlar en çok banka kartlarında tedirgin oluyor ve bunda haksız da sayılmazlar.

iPhone'da NFC.cool sana kartın ağını, yani Visa mı Mastercard mı olduğunu gösteriyor, fazlasını değil. [Apple, benimki gibi uygulamaların banka kartının ödeme verilerini okumasına](https://developer.apple.com/documentation/corenfc/nfctagreadersession) iPhone'da izin vermiyor ve her gün bu altyapıyla çalışan biri olarak bence doğru bir karar.

Harici bir USB okuyucuyla daha fazlası çıkıyor: ağ, yalnızca ilk altı ve son dört hanesi görünecek şekilde maskelenmiş kart numarası, son kullanma tarihi, kartı veren ülke ve para birimi. NFC.cool hangi cihazda olursa olsun adını asla okumuyor; güvenlik kodu ve PIN de zaten hiç okunamıyor. Çipte kopyalamaya değer neden hiçbir şey olmadığını [NFC tag rehberimde](/tr/blog/ultimate-nfc-tag-guide/#telefonum-nfc-uygulamasıyla-banka-kartımı-ya-da-pasaportumu-okuyabilir-mi) anlatıyorum.

---

## Bir yabancının telefonu kartından neler okuyabilir

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/anyone-can-read-440w.webp" alt="NFC.cool'da Suica kartının Herkesin okuyabildikleri bölümü: bakiye ile son 6 yolculuk ve ödeme, anahtar gerekmeden her telefonca okunabiliyor"><p><strong>Herkesin okuyabildikleri.</strong> Suica'da bakiye ve son yolculuklar, anahtar gerekmeden.</p></li>
</ol>
</figure>

Bana en ilginç gelen kısım bu ve ilk bakacağım yer de burası olurdu.

NFC.cool ne okuyorsa anahtarsız okuyor. Yani kartına tutulan herhangi bir telefon aynı şeyi okuyabilir. Pasaport bunun tam tersi: çipi, fotoğraf sayfasında basılı duran anahtarı verene kadar susuyor; [pasaportunu telefonunla okumak](/tr/blog/read-passport-nfc-chip/) da böyle işliyor. Bu yüzden her kart ekranında **Herkesin okuyabildikleri** başlıklı bir bölüm var. Bölüm, o okumada ne çıktıysa tam olarak onu listeliyor: bakiye, tarihleri ve istasyonlarıyla yolculuklar, kart numarası, kart ne verdiyse.

Suica'da bu, istasyon adlarıyla yirmi yolculuk olabilir. Navigo'da abonmanların ve son yolculukların. Oyster'da neredeyse hiçbir şey. NFC yalnızca birkaç santimetrede çalışıyor, yani kimse trenin öbür ucundan kartını okumuyor; ama cebindeki kartın hangi türden olduğunu bilmekte yine de fayda var.

Bütün bunlar olurken iPhone'undan hiçbir şey çıkmıyor. Okuma kartla telefonun arasında kalıyor, o kadar.

---

## Kartın zaman içinde

Okuduğun her kart, taramalar listene "Suica • ¥1,234" gibi kısa bir özetle kaydediliyor, böylece onu yeniden bulabiliyorsun. Sonradan açtığında kartı o anki haliyle görüyorsun. Üstüne **Son taramadan bu yana** da var: aynı kartı bir önceki okumandan bu yana bakiyenin ne kadar değiştiğini gösteriyor. Son yüklediğin paranın nereye gittiğini hiç merak ettiysen işe yarar.

---

## iPhone'da kart bakiyesi nasıl sorgulanır

1. [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-tr&mt=8) uygulamasını aç ve **NFC'yi okuyun** düğmesine dokun.
2. Kartı iPhone'unun üst kısmına düz biçimde yasla ve açılan panelde **Kart okundu** yazana kadar kıpırdatma.
3. Kart kendi ekranında açılıyor: bakiye en üstte, ayrıntılar altında.

Önce kart tipi seçmen gerekmiyor. Kartın ne olduğunu uygulama kendisi anlıyor.

---

## Kartın listede yok mu? Bana gönder

İşte burada sen devreye giriyorsun. NFC.cool bir çipi tanıyıp tamamını okuyamadığında kart ekranında **Bu kartı okumamıza yardım et** bölümü çıkıyor. Bakiyeyi okuduğu halde bir şey yanlış görünüyorsa aynı bölümün adı **Bir sorun mu var?** oluyor.

**Okuma ayrıntılarını gönder** düğmesine dokun, kartın adını ve ülkesini yaz, bakiye varsa doğru olup olmadığını söyle. Herhangi bir şey gitmeden önce **Verileri gör** düğmesine dokunup tam olarak neyin gönderileceğine bak: okuma sırasında kartın verdiği yanıtlar, çip tipi, cihazın ve uygulama sürümün, bir de ülken. Adın da, herhangi bir hesap bilgisi de bunun içinde değil; kartın seri numarası ve uygulamanın tanıdığı her kart numarası da maskeleniyor. Uygulamanın henüz tanımadığı bir kart, onun fark edemediği ayrıntılar taşıyor olabilir; önce senin bakabilmenin nedeni de tam olarak bu. Gönderim çalışmazsa bunu bana e-postayla da yollayabilirsin.

Her rapor, elimde olmayan ve çoğu zaman hiç gitmediğim bir şehirden gelen bir kart demek. Sıradaki kartlara destek de böyle ekleniyor. Yani bana bir gün NFC.cool'un kartını okumadığını yazdıysan: [uygulamayı güncelle](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-tr&mt=8) ve yeniden dene. Hâlâ okumuyorsa artık bir düğmen var: bunu düzeltmem için tam olarak neye ihtiyacım varsa bana onu gönderiyor.

[iPhone için NFC.cool Tools'u indir](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-tr&mt=8) · [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-check-transit-card-balance-iphone-tr) (yakında)
