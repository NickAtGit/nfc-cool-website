---
id: nfc-blog-011
title: "OpenPrintTag: akıllı 3B baskı makaralarını telefonunla nasıl okur ve yazarsın"
date: 2026-03-29
tags: ["nfc-tags", "automation"]
summary: "OpenPrintTag, akıllı filament makaraları için açık standart. Nasıl çalıştığını, hangi verileri sakladığını ve OpenPrintTag NFC tag'lerini yalnızca telefonunla nasıl okuyup yazacağını öğren."
image: "/assets/images/Blog/openprinttag-read-write-nfc-spools-phone.webp"
imageAlt: "Telefonla okunan, NFC tag'i olan 3B baskı makarası"
metaTitle: "OpenPrintTag: akıllı 3B baskı makaralarını telefonunla oku ve yaz"
metaDescription: "3B baskı filament makaralarını NFC ile yönetmek için OpenPrintTag'i nasıl kullanacağını öğren. iPhone ya da Android'den malzeme verisini oku, yaz ve izle; özel uygulama gerekmiyor."
ogTitle: "OpenPrintTag: NFC ile akıllı 3B baskı makaraları"
ogDescription: "OpenPrintTag NFC makaralarını telefonunla okumak ve yazmak için tam rehber. Her yazıcıyla, her filament markasıyla çalışıyor."
---
3B baskı yapıyorsan muhtemelen sen de yaşadın: yarısı kullanılmış makaralarla dolu bir raf, hangisinde ne kadar filament kaldığına dair hiçbir fikir ve şu etiketsiz makara, PETG de olabilir PLA da, deneme baskısı yapmadan anlamanın yolu yok. Ben de yaşadım ve bu, NFC'nin çözmekte gerçekten iyi olduğu türden küçük, tekrarlayan bir dert.

OpenPrintTag işte bunu yapıyor. [Prusa Research](https://www.prusa3d.com) tarafından oluşturulan, uyumlu her NFC tag'ini filament makaran için akıllı bir etikete çeviren açık kaynaklı bir NFC standardı. Malzeme türü, marka, renk, kalan ağırlık: hepsi doğrudan makarada duruyor ve telefonunu hızlıca okutarak görülüyor.

Bulut yok. Kapalı ekosistem yok. İnternet gerekmiyor. NFC tag okuyup yazan bir uygulama olan NFC.cool'u yıllardır geliştiriyorum ve bu tam da görmekten hoşlandığım türden bir standart: veriyi tag'in üstüne koyan ve her yerde çalışmasına izin veren cinsten. Nasıl çalıştığı ve OpenPrintTag makaralarını yalnızca telefonla nasıl okuyup yazdığım burada.

---

## OpenPrintTag nedir

OpenPrintTag, 3B baskı malzemeleri için evrensel, açık bir veri biçimi. Her üreticinin kendi uyumsuz akıllı makara sistemini icat etmesi yerine, ki NFC dünyasının başka köşelerinde bu karmaşanın nasıl yaşandığını izledim, OpenPrintTag herkesin benimseyebileceği tek bir standart tanımlıyor: filament üreticileri, yazıcı üreticileri, dilimleyici yazılımlar ve NFC.cool gibi uygulamalar dahil.

Temel ilkeler ve bence dikkate değer olmasının sebepleri:

- **Açık kaynak:** MIT lisansıyla yayımlandı, uygulaması serbest, lisans ücreti yok
- **Tasarımı gereği çevrimdışı:** tüm veri tag'in kendisinde yaşıyor, bulut hizmeti gerekmiyor
- **Yeniden yazılabilir:** bastıkça kalan filamenti güncelle, tag'leri yeni makaralarda yeniden kullan
- **Evrensel:** markalar ve ekosistemler arasında çalışıyor
- **Hem FFF (filament) hem SLA (reçine) destekliyor**

Prusament, Voron, Fillamentum, 3DXTech, SimplyPrint ve PrintedSolid dahil 22'den fazla şirket ve topluluk ilgi gösterdi. Belirtimin tamamı [specs.openprinttag.org](https://specs.openprinttag.org) adresinde.

---

## OpenPrintTag hangi verileri saklıyor

Beni kazanan kısım burası. OpenPrintTag üstünde yalnızca bir ad yazan bir etiket değil. Bir makara hakkında bilmek isteyeceğin neredeyse her şey için alanı olan, düzgün yapılandırılmış bir veri biçimi ve belirtimin gerçekten baskı yapan insanlarca yazıldığı belli.

**Malzeme tanımı:**
- Malzeme sınıfı (filament ya da reçine)
- Malzeme türü (PLA, PETG, ABS, TPU, ASA, PC, PA6 ve 30'dan fazlası)
- Malzeme adı (örneğin "PLA Galaxy Black")
- Marka adı (örneğin "Prusament")
- Malzeme özellik etiketleri: aşındırıcı, iletken, karanlıkta parlayan, gıdaya uygun, ESD güvenli, esnek gibi tanımlı 68'den fazla özellik

**Ağırlık ve uzunluk takibi:**
- Nominal ağırlık (ilan edilen, örneğin 1000 g)
- Gerçek ağırlık (bu makara için ölçülen)
- Filament uzunluğu (nominal ve gerçek, mm cinsinden)
- Boş makara ağırlığı (makarayı tartıp kalan malzemeyi hesaplayabilesin diye)
- Tüketilen ağırlık (bastıkça güncelleniyor; makarayı gerçekten "akıllı" yapan alan bu)

**Renk:**
- RGBA biçiminde ana renk
- 5 adede kadar ikincil renk (çok renkli, galaksi ya da geçişli filamentler için)
- Işık geçirgenlik mesafesi (matlık değeri, [HueForge](https://shop.thehueforge.com/) projelerinde işe yarıyor)

**Üst veriler:**
- Üretim tarihi ve son kullanma tarihi
- Menşe ülkesi
- Marka, malzeme ve o makaraya özel UUID'ler
- Yazma koruması ayarları

Belirtim, reçineye özel `last_stir_time` gibi alanları bile kapsıyor; bu alan reçinenin baskıdan önce en son ne zaman karıştırıldığını kaydediyor. Bu tür bir ayrıntı bana, arkasındaki insanların karıştırılmamış reçineden gerçekten yandığını söylüyor.

---

## Tag: alışıldık NFC etiketi değil

Bir şey satın almadan önce belirteceğim teknik bir ayrıntı var: **OpenPrintTag, ISO 15693 (NFC-V) tag'leri için tasarlandı**, özellikle de **NXP ICODE SLIX ve ICODE SLIX2** çipleri için. Bunlar NFC Forum Tip 5 tag'ler ve standart NFC-A tag'lerine göre belirgin biçimde daha uzun okuma menzilleri var; özel bir okuyucuyla 1,5 metreye kadar. Şimdiye dek yalnızca çoğu projenin kullandığı ucuz NTAG etiketlerinden aldıysan bu farklı bir tag ailesi; tüm manzarayı [iPhone için NFC tag türleri](/blog/nfc-tag-types-for-iphones/) yazısında anlatıyorum.

Neden NFC-V? Yazıcının yerleşik NFC okuyucusunun makarayı hangi konumda dönmüş olursa olsun algılaması gerekiyor. NFC-V'nin uzun menzili bunu, tag'i hassas biçimde hizalamaya gerek kalmadan mümkün kılıyor; akıllıca bir tasarım.

**Peki sıradan NTAG etiketleri?** OpenPrintTag veri biçimi NDEF tabanlı, yani NFC.cool gibi bir telefon uygulaması teknik olarak OpenPrintTag verisini NTAG213/215/216 dahil her NFC tag'inde okuyup yazabiliyor. Ben yaptım ve telefondan telefona okumada gayet iyi işliyor. Ama **yazıcı donanımı ve Prusa'nınki gibi uygulamalar yalnızca NFC-V tag'leri tanıyor**. Yani etiketlediğin makaraların yerleşik yazıcı okuyucularıyla çalışmasını istiyorsan ICODE SLIX2 tag kullan. Çoğu kişinin yapmasını beklediğim hatayı yapıp bunun için bir torba NTAG213 alma.

Boş tag alacaksan özellikle **ICODE SLIX2** ya da **ISO 15693** ara. Uyumlu tag'leri [Amazon ABD](https://amzn.to/3LTh1fT) veya [Amazon Avrupa](https://amzn.to/4oJpQr4) üzerinde bulabilirsin (ortaklık bağlantıları).

---

## OpenPrintTag'i telefonunla nasıl okur ve yazarsın

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/openprinttag-read-write-nfc-spools-phone/write-440w.webp" alt="NFC.cool Tools'taki OpenPrintTag ekranı; Northline Filaments PLA Matte, 1,75 mm, Filament (FFF) için doldurulmuş"><p><strong>Bir makara tag'ine yazmak.</strong> Malzeme bilgilerini doldur, NFC düğmesine dokun ve tag'i telefonuna tut.</p></li>
</ol>
</figure>

OpenPrintTag ile çalışmak için Prusa yazıcıya ya da özel donanıma ihtiyacın yok, yalnızca telefonuna. Kurmayı en çok istediğim kısım buydu, çünkü cebindeki telefon var olan en erişilebilir NFC okuyucu.

NFC.cool Tools, OpenPrintTag'i hem [iOS](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-openprinttag-read-write-nfc-spools-phone-tr&mt=8) hem [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-openprinttag-read-write-nfc-spools-phone-tr) tarafında doğrudan destekliyor ve özelliğin tamamen ücretsiz olmasına dikkat ettim.

**Tag okumak:**
1. NFC.cool Tools'u aç
2. Telefonunu makaradaki NFC tag'ine yaklaştır
3. NFC.cool OpenPrintTag biçimini kendiliğinden algılasın
4. Yapılandırılmış veriyi gör: malzeme, marka, renk, ağırlık, uzunluk, özellikler

**Tag yazmak:**
1. Makarana boş bir ICODE SLIX2 tag yapıştır
2. NFC.cool → NFC Apps bölümü → OpenPrintTag'i aç
3. Malzeme bilgilerini gir: tür, marka, renk, ağırlık, uzunluk
4. Yazmak için dokun

**Kalan malzemeyi güncellemek:**
Baskıdan sonra tag'deki tüketilen ağırlık alanını güncelle. Bir dahaki okutmanda ne kadar filament kaldığını tam olarak bilirsin; tahmin yok, tartı yok. Akıllı makarayı ilginç bir oyuncaktan gerçekten güvendiğim bir şeye çeviren kısım bu.

Kapağın altına bakmak istersen Uzman Modu ile ham NDEF kayıtlarını inceleyebilirsin; bir tag'de sorun ararken ya da veri yapısını doğrularken işe yarıyor. Genel olarak tag yazmaya yeniysen temelleri [iPhone'da NFC tag nasıl yazılır](/blog/write-nfc-tags-iphone/) yazısında anlatıyorum.

---

## Neden telefon kullanmalı?

Prusa yazıcılara yerleşik NFC okuyucular geliyor ve [SpoolSense](https://github.com/SpoolSense) (açık kaynaklı bir ESP32 okuyucusu) gibi projeler özel donanım seçenekleri ekliyor. Peki neden telefonla uğraşasın? Savunmam şu:

- **Her yazıcıyla çalışıyor:** Voron, Bambu Lab, Creality, Ender, ne kullanıyorsan
- **Her filamente tag yaz:** Prusament etiketli geliyor ama Fillamentum, eSUN, Hatchbox ya da başka bir markayı kendin etiketleyebilirsin
- **Yazıcıdan uzakta stok yönet:** makaraları masanda, deponda ya da bir üretim atölyesinde okut
- **Tag'de sorun ara:** yazıcı bir tag'i okuyamadığında telefonunla okutup üstünde gerçekte ne olduğunu gör; en çok başvuracağım kullanım bu
- **Fazladan donanım yok:** telefonunda zaten NFC okuyucu var, bütün mesele de bu

---

## Pratik kullanımlar

**Kişisel stok.** Koleksiyonundaki her makarayı etiketle. Baskı planlarken hiçbir şeyi kutusundan çıkarmadan makaraları okutup malzeme türünü, kalan uzunluğu ve rengi denetle.

**Kalan filament takibi.** Makarayı baskıdan önce ve sonra tart, tag'deki tüketilen ağırlığı güncelle. "Bu makara 14 saatlik baskıya yeter mi?" kaygısı bitsin.

**Atölye ya da ekip kullanımı.** Makaraları malzeme bilgileriyle etiketle, atölyedeki herkes okutup tanıyabilsin. Gizemli filament kalmasın.

**Filament deneme notları.** Belirli bir makara için mükemmel sıcaklığı mı buldun? Bir dahaki sefere hazır olsun diye notunu tag'e yaz.

**Çok renkli ve özel malzemeler.** OpenPrintTag makara başına 6 renge ve 68'den fazla özellik etiketine izin veriyor. Karanlıkta parlayan, karbon elyaf katkılı PETG'in nihayet doğru dürüst, aşındırıcı işaretiyle birlikte etiketlenebilsin.

---

## Ekosistem büyüyor

OpenPrintTag hâlâ genç ama ivme gerçek:

- **Prusament** her makarada OpenPrintTag NFC tag'iyle geliyor
- **Prusa yazıcılar** yerleşik NFC okuyucu ekliyor
- **Açık kaynaklı donanım okuyucular**, örneğin ESP32 tabanlı SpoolSense, topluluktan çıkıyor
- **22'den fazla şirket** girişime katıldı
- **NFC.cool**, hem iOS hem Android'de tam OpenPrintTag desteği olan tek genel amaçlı NFC uygulaması ve bunu kendim kullanmak istediğim için ekledim

3B baskı sektörünün akıllı makaralar için yıllardır açık bir standarda ihtiyaç duyduğunu izledim, birkaç kapalı denemenin gelip gittiğini de. OpenPrintTag gördüğüm en inandırıcı olanı: büyük bir üretici destekliyor, tamamen açık kaynak ve gerçek ürünlerde çoktan yayında. Bu birleşim yeterince nadir ki üstüne oynarım.

---

## Başlarken

**Neye ihtiyacın var:**
- iPhone 7 ya da sonrası, veya NFC'si olan bir Android telefon
- NFC.cool Tools ([App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-openprinttag-read-write-nfc-spools-phone-tr&mt=8) / [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-openprinttag-read-write-nfc-spools-phone-tr)), ücretsiz, OpenPrintTag dahil
- Boş ICODE SLIX2 ya da ISO 15693 NFC tag'ler ([Amazon ABD](https://amzn.to/3LTh1fT) / [Amazon Avrupa](https://amzn.to/4oJpQr4), ortaklık bağlantıları)
- Etiketlenecek birkaç filament makarası

Hepsi bu. Bundan beş dakika sonra ilk makaran akıllı olabilir. NFC'nin kendisi sana yeniyse önce [sıfırdan başlayanlar için NFC tag rehberime](/blog/nfc-tags-beginners-guide/) yönlendiririm; [NFC okuma ve yazma özellik sayfası](/features/nfc-reader-writer/) ise NFC.cool Tools'un OpenPrintTag dışında neler yapabildiğini anlatıyor.

*OpenPrintTag, Prusa Research'ün açık kaynaklı bir girişimi. NFC.cool standardın bağımsız bir destekçisi. Daha fazlası için [openprinttag.org](https://openprinttag.org).*
