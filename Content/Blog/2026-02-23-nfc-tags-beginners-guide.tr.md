---
id: nfc-blog-009
title: "NFC tag nedir: sıfırdan başlayanlar için tam rehber"
date: 2026-02-23
tags: ["nfc-tags", "guides", "automation"]
summary: "NFC tag'ler, tek okutmayla telefonunda eylem tetikleyebilen, pilsiz minik çipler. Bilmen gereken her şey burada: ne oldukları, nasıl çalıştıkları, hangi türü almalısın ve 15'ten fazla pratik kullanım."
image: "/assets/images/Blog/nfc-tags-beginners-guide.webp"
imageAlt: "Yeni başlayan akışı simgeleriyle birlikte telefon ve birkaç NFC tag"
metaTitle: "NFC tag nedir: sıfırdan başlayanlar için tam rehber (2026)"
metaDescription: "NFC tag'lerin ne olduğunu, nasıl çalıştığını, türlerini (NTAG213, 215, 216) ve akıllı ev otomasyonundan dijital kartvizitlere 15'ten fazla pratik kullanımını öğren."
ogTitle: "NFC tag nedir: sıfırdan başlayanlar için tam rehber"
ogDescription: "2026'da NFC tag'ler hakkında yeni başlayanların bilmesi gereken her şey: türler, nasıl çalıştıkları, ne almalı ve evde, işte ve ötesinde pratik kullanımlar."
---
Muhtemelen kahve parasını telefonunu okutarak ödedin, ulaşım kartı taradın ya da otel odasının kapısını onunla açtın. Bunların her biri iş başındaki NFC.

NFC tag okuyup yazan bir uygulama olan NFC.cool'u yıllardır geliştiriyorum ve daha çok kişinin bilmesini istediğim şey şu: NFC yalnızca ödemeler ve geçiş kartları için değil. Birkaç sente mal olan ve hiç pile ihtiyaç duymayan minik bir **NFC tag**, evini otomatikleştirebilir, iletişim bilgilerini tek okutmayla verebilir ve fiziksel dünyayı dijital eylemlere bağlayabilir.

Bu, yeni başlayan herkese vereceğim rehber. NFC tag'lerin ne olduğunu, gerçekte nasıl çalıştıklarını, hangilerini alacağımı ve gerçekten işe yaradığını gördüğüm kullanımları anlatacağım.

---

## NFC nedir

**NFC**, **Yakın Alan İletişimi** demek. İki cihazın birbirine birkaç santimetre yaklaştığında veri alışverişi yapmasını sağlayan kısa menzilli bir kablosuz teknoloji.

**13,56 MHz**'de çalışıyor ve yaklaşık **4 cm**'ye kadar erişiyor. O minik menzil başta insanların kafasını karıştırıyor ama bilinçli: bir güvenlik özelliği. Bluetooth ya da Wi-Fi'nin aksine odanın öbür ucundaki bir şeye yanlışlıkla bağlanamıyorsun.

Modern her akıllı telefonun içinde bir NFC çipi var. iPhone'lar 2016'daki iPhone 7'den beri NFC okuyor, Android telefonlar ise daha uzun süredir. Telefonunu tag'e yaklaştırıyorsun, telefon tag'e güç veriyor ve onu okuyor; tüm alışveriş saniyenin küçük bir kesrinde bitiyor.

---

## NFC tag nedir

NFC tag; bir etiketin, kartın, anahtarlığın ya da neredeyse her biçimin içine gömülü, küçük ve edilgen bir çip. Önemli kelime "edilgen": **NFC tag'in pili yoktur.** Gücünü tamamen kendisini okuyan cihazın alanından alıyor.

Onlarla yaşamayı kolaylaştıran şey de bu:
- **Pratikte kırılmaz.** Bitecek pil yok, yıpranacak bir şey yok.
- **Ucuz.** Toptanda tanesi birkaç sent.
- **Minik.** Bozuk paradan küçük, kredi kartından ince.
- **Uzun ömürlü.** Düzgün bir tag 10 yıldan fazla dayanıyor.

Her tag küçük bir bellek taşıyor. Bir adres, iletişim bilgileri, Wi-Fi bilgileri, düz metin ya da okuyan telefona ne yapacağını söyleyen yönergeler saklayabilirsin.

### NFC ile RFID'nin farkı ne

NFC aslında RFID'nin (Radyo Frekansıyla Tanımlama) bir alt kümesi. Farkı şöyle anlatıyorum:

| | NFC | RFID |
|---|---|---|
| **Frekans** | Yalnızca 13,56 MHz | 125 KHz - 960 MHz |
| **Menzil** | Yaklaşık 4 cm'ye kadar | Birkaç metreye kadar |
| **İletişim** | Çift yönlü | Genelde tek yönlü |
| **Standart** | ISO 14443 / ISO 18092 | Birden çok standart |
| **Tüketici kullanımı** | Yüksek (telefonlar, ödemeler) | Çoğunlukla endüstriyel |

Her NFC bir RFID'dir ama her RFID bir NFC değildir. Ofise girmek için okuttuğun kart çoğu zaman 125 KHz'de çalışıyor ve telefonun onu okuyamıyor. NFC tag'ler ise telefonların desteklediği 13,56 MHz frekansını kullanıyor. "Telefonum iş kartımı neden okumuyor?" en sık aldığım sorulardan biri ve yanıtı neredeyse her zaman bu. (O tavşan deliğine düştüysen [iPhone'un RFID kapısını neden açmadığı](/blog/iphone-rfid-condo-doors/) üzerine koca bir yazı yazdım.)

---

## NFC tag türleri: hangisini almalısın

NFC tag'ler, sektör standartlarını belirleyen **NFC Forum** tarafından tanımlanan türlerde geliyor. Karşına gerçekten çıkacak olanlar **NXP Semiconductors** çipleri üzerine kurulu: NTAG serisi.

### NTAG ailesi

Bunlar açık ara en yaygın tüketici NFC tag'leri:

#### NTAG213
- **Bellek:** 144 bayt (yaklaşık 132'si kullanılabilir)
- **Nerede iyi:** adresler, kişi kartları, basit otomasyonlar
- **Fiyat:** en ucuz seçenek (tanesi yaklaşık 0,15-0,30 dolar)
- **Adres kapasitesi:** yaklaşık 130 karakter

Beygir. Tek bir adres ya da kısa bir metin için NTAG213 yeterli; NFC kartvizitlerin ve pazarlama tag'lerinin çoğu bunu kullanıyor.

#### NTAG215
- **Bellek:** 504 bayt (yaklaşık 488'i kullanılabilir)
- **Nerede iyi:** uzun adresler, çok alanlı vCard'lar, Wi-Fi bilgileri
- **Fiyat:** tanesi yaklaşık 0,20-0,40 dolar
- **Adres kapasitesi:** yaklaşık 480 karakter

Sağlam bir orta seçenek: uzun adresler ve çok alanlı vCard'lar için yeterli pay, toptan almaya değecek kadar ucuz. Ayrıca Nintendo Amiibo figürlerinin içindeki çip de bu; yazılabilir NTAG215'lerin bu kadar kolay bulunmasının sebebi de o.

#### NTAG216
- **Bellek:** 888 bayt (yaklaşık 868'i kullanılabilir)
- **Nerede iyi:** tam vCard'lar, birden çok kayıt, uzun metin içerikleri
- **Fiyat:** tanesi yaklaşık 0,30-0,60 dolar
- **Adres kapasitesi:** yaklaşık 850 karakter

Tüketici NTAG hattındaki en yüksek bellek ve tek bir tag alacaksan seçeceğim tag. Fazladan pay, duvara toslamayacağın anlamına geliyor: tam vCard'lar, birden çok kayıt, uzun metin, sonraki düzenlemeler için yer. NFC.cool'un üzerinde sınadığı standart da bu.

### Karşına çıkabilecek diğer tag türleri

- **NTAG424 DNA.** Kriptografik kimlik doğrulaması olan gelişmiş bir çip. Sahtecilikle mücadelede, lüks ürün doğrulamasında ve yeni AB Dijital Ürün Pasaportu kurallarında karşına çıkıyor. Kişisel kullanımda fazla, ticari işlerde gerçekten önemli.
- **MIFARE Classic.** Geçiş kartlarında ve toplu taşıma sistemlerinde kullanılan eski bir NXP çipi. Standart bir NFC Forum tag'i olmadığı için telefon uyumluluğu yazı tura. Kişisel projelerde geçerdim.
- **ST25T.** STMicroelectronics'in NFC tag hattı. İşlev olarak NTAG'e benziyor, tüketici ürünlerinde daha az yaygın.
- **ICODE.** Kütüphane ve lojistik takibi için üretilmiş. Muhtemelen bunlara hiç dokunmayacaksın.

### Hızlı satın alma rehberi

| Kullanım | Önerilen tag | Neden |
|---|---|---|
| Web adresi | NTAG213 | Az veri, en ucuzu |
| Dijital kartvizit | NTAG213 ya da NTAG215 | Adres bağlantısı yaklaşık 100 karakter istiyor |
| Wi-Fi paylaşımı | NTAG215 | Bilgiler uzayabiliyor |
| Tag'de saklanan tam vCard | NTAG216 | Daha çok bellek gerekiyor |
| Akıllı ev tetikleyicisi | NTAG213 | Yalnızca benzersiz kimlik yeterli |
| Sahtecilikle mücadele | NTAG424 DNA | Kriptografik doğrulama |

**Nereden alınır:** [Önerilen NFC tag'ler](/affiliate-links/) sayfam, kullandığım ve üzerinde sınadığım NTAG216 etiketleri listeliyor. Etiket biçimindeki tag'ler en çok yönlü olanlar; neredeyse her şeye yapışıyorlar.

Dürüst önerim: bir paket NTAG216 etiket al ve fazla düşünme. İnsanların, 20 sentlik bir tag'in rahatça karşıladığı bir proje için çip türleri üstünde saatlerce kafa yorduğunu gördüm. Daha derin dökümü istersen çip çip [iPhone için NFC tag türleri](/blog/nfc-tag-types-for-iphones/) yazısında anlattım.

---

## NFC tag'ler nasıl çalışıyor (yalın hali)

İnsanlar bunun karmaşık olmasını bekliyor. Değil. Baştan sona hepsi şu:

1. **Güç aktarımı.** Telefonunun NFC anteni bir elektromanyetik alan üretiyor. Tag o alana girdiğinde (yaklaşık 4 cm) alan, tag'in anten bobininde minik bir akım oluşturuyor ve o akım çipe güç veriyor.

2. **Veri alışverişi.** Güç alan çip, sakladığı veriyi 13,56 MHz'de modüle edilmiş radyo dalgalarıyla telefonuna geri gönderiyor. Alışveriş yaklaşık 100 milisaniye sürüyor.

3. **Eylem.** Telefonun veriyi okuyup ne yapacağına karar veriyor. Adres tarayıcıda açılıyor. Telefon numarası arama öneriyor. Wi-Fi kaydı bağlanmayı öneriyor. Uygulamaya özel kayıt, eşleşen uygulamayı açıyor.

Eşleştirme yok. PIN yok. Temel okuma için uygulama gerekmiyor. Okut ve geç.

### NDEF: tag'lerin konuştuğu dil

NFC tag'indeki veri **NDEF** (NFC Veri Alışverişi Biçimi) ile yapılandırılıyor. NDEF'i, NFC'li her telefonun NFC'li her tag'i anlamasını sağlayan ortak dil olarak düşünüyorum.

Yaygın NDEF kayıt türleri:
- **URI.** Bir web bağlantısı (http, https, tel:, mailto:)
- **Metin.** Herhangi bir dilde düz metin
- **Smart Poster.** Adres, başlık ve simgenin birleşimi
- **Wi-Fi.** Ağ adı, parola ve güvenlik türü
- **vCard.** İletişim bilgileri
- **MIME.** Herhangi bir özel veri türü; uygulamalar özel eylemler için kullanıyor

NFC.cool Tools gibi bir uygulamada tag yazarken aslında NDEF kayıtları oluşturuyorsun. Telefon tag'i okuduğunda o kayıtları çözüp onlara göre davranıyor. Modelin tamamı bu; bende oturduğunda NFC'yle ilgili diğer her şey anlam kazandı.

---

## NFC tag okumak

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/nfc-tags-beginners-guide/1-read-nfc-440w.webp" alt="NFC.cool Tools'taki NFC sekmesi, Read NFC ve Write NFC düğmeleriyle"><p><strong>Bir uygulamayla oku.</strong> Read NFC'ye dokun ve tag'i iPhone'unun üst kenarına tut.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-tags-beginners-guide/2-record-440w.webp" alt="NFC.cool Tools'ta okunmuş bir tag: Anna Miller için bir kartvizit kaydı, altında ham vCard"><p><strong>Üstündeki her şeyi gör.</strong> Yalnızca iOS'un göstereceği bağlantıyı değil, tag'deki her kaydı.</p></li>
</ol>
</figure>

### iPhone'da

iPhone'lar tag'leri kendiliğinden karşılıyor. **iPhone XS ve sonrasında** (ve 3. nesil iPhone SE'de) NFC okuma arka planda çalışıyor: telefonun üstünü tag'e yaklaştır, anında okusun, uygulama gerekmesin. Daha eski iPhone'larda (7, 8, X) önce bir NFC okuyucu uygulaması açman gerekiyor.

Okuttuğunda ne olacağı veriye bağlı:
- **Adres.** Bildirim çıkıyor, dokununca Safari'de açılıyor
- **Telefon numarası.** Arama seçeneği
- **App Clip.** Varsa bir App Clip başlıyor
- **Özel veri.** İlgili uygulamayı açıyor

Bir tag'de ne olduğunu hemen görmek istiyorsan Android'de [NFC tag'leri doğrudan tarayıcından da okuyabilirsin](/online-nfc-reader/); kurulum yok.

### Android'de

Android telefonların çoğunda 2012 civarından beri NFC var. Okuma varsayılan olarak açık; anahtarı Ayarlar, Bağlı cihazlar, NFC altında bulursun. Tag'i okut, Android veriyi en uygun uygulamaya versin: adresleri tarayıcıya, kişileri rehbere, özel kayıtları kendi uygulamalarına.

---

## NFC tag yazmak

Gerçekten eğlenceli bulduğum kısım bu. Tag'e yazmak, onu istediğin veriyle programlamak demek.

### Neye ihtiyacın var

1. NFC'li bir telefon
2. Bir NFC yazma uygulaması (örneğin **NFC.cool Tools**; [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-tags-beginners-guide-tr&mt=8) ve [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-tags-beginners-guide-tr) sürümleri var)
3. Boş ya da yeniden yazılabilir bir NFC tag

### Tag nasıl yazılır

Süreç kısa:
1. NFC yazma uygulamanı aç
2. Ne yazacağını seç (adres, metin, Wi-Fi bilgileri, kişi ve benzeri)
3. Veriyi gir
4. Telefonunu tag'e tut
5. Onayı bekle, genelde bir saniye kadar

Hepsi bu. Tag artık verini taşıyor ve onu okuyan her NFC'li telefonla çalışıyor. iPhone'a özel anlatımı istersen burada yazdım: [iPhone'da NFC tag nasıl yazılır](/blog/write-nfc-tags-iphone/).

### Önemli: tag kilitlemek

Tag yazıldıktan sonra istersen onu **kilitleyebilirsin**. Kilitleme onu kalıcı olarak salt okunur yapıyor; kimse üstüne yazamıyor ya da silemiyor. Geri alma yok.

Kilitlemeyi bilinçli ve son bir adım olarak görüyorum, hızlıca geçilecek bir şey olarak değil. Şu durumlarda kilitle:
- Tag herkesin erişebileceği bir yerdeyse (afiş, ürün ya da kartvizit üstünde)
- Kurcalanmasını engellemek istiyorsan
- Veri değişmeyecekse

Şu durumlarda kilitleme:
- Veriyi sonradan güncelleyebilirsin
- Hâlâ deniyorsun
- Tag evin gibi denetimli bir ortamda duruyor

---

## NFC tag'leri kullanmanın 16 pratik yolu

Yüz tane sayabilirim. Bunlar dönüp durduklarım; gerçekten tuttuğunu gördüğüm kullanımlar.

### Evde

**1. Misafir Wi-Fi paylaşımı**
Kapının yanına ya da misafir odasına bir tag yapıştır ve Wi-Fi bilgilerinle programla. Misafirler okutup anında bağlansın, uzun parola yazmak yok.

**2. Akıllı ev sahneleri**
Evin içine tag'ler koyup otomasyon tetikle. Komodindekini okut, "iyi geceler" çalışsın (ışıklar kapalı, alarm kurulu, Rahatsız Etme açık). Kapıdakini okut, "evden çıkıyorum" çalışsın (ışıklar kapalı, termostat kısık, süpürge başlasın).

**3. Çalar saat**
Mutfağa ya da banyoya bir tag koy ve sabah alarmını yalnızca fiziksel olarak okuttuğunda kapatan bir kısayol kur. İşe yarıyor; seni yataktan çıkarıyor.

**4. Cihaz kılavuzları**
Çamaşır ya da bulaşık makinesine tag yapıştır ve kılavuz PDF'ine yönlendir. Bir daha kılavuz aramayacaksın.

**5. İlaç hatırlatıcıları**
İlaç kutusuna tag koy. Okutmak, bir nota ya da tabloya zaman damgası düşsün, ne zaman aldığının kaydı olsun.

### İşte

**6. Dijital kartvizitler**
İş dünyasındaki en yaygın NFC kullanımı. Kağıt kart yerine NFC kartvizit, iletişim bilgilerini tek okutmayla paylaşıyor. [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-nfc-tags-beginners-guide-tr&mt=8) profesyonel bir dijital kart kurmanı ve adresini üçüncü taraf herhangi bir NFC tag'ine yazmanı sağlıyor: iOS'taki alıcılar yerel bir App Clip, Android'dekiler nfc.cool alan adında bir site görüyor ve ikisi de kişini tek dokunuşla kaydedebiliyor.

**7. Toplantı odası girişi**
Toplantı odalarının dışına tag koy. Okutmak takvimini açsın ya da katılımı kaydetsin; her rezervasyon sisteminden basit.

**8. Ortak ekipman kaydı**
Ortak cihazlara ya da aletlere tag iliştir. Okutmak, kimin ne zaman aldığını kaydetsin.

**9. Ortak belgelere hızlı bağlantı**
Beyaz tahtaya ya da proje alanına, ortak sürücüye, Notion sayfasına veya görev panosuna işaret eden bir tag yapıştır.

### Yolda

**10. Araç Bluetooth'u ve navigasyon**
Araç tutucuna tag koy. Okutmak Bluetooth'u bağlasın, navigasyon uygulamanı açsın ve sürüş listeni başlatsın.

**11. Bagaj tanımlama**
İletişim bilgilerini taşıyan, kilitli bir NFC tag'i bavuluna koy. Bulunursa telefonu olan herkes sahibini tanıyabilir.

**12. Evcil hayvan künyesi**
Evcil hayvanının tasmasına, iletişim bilgilerini ve sağlık notlarını taşıyan bir tag tak; kazınmış künyeden hem daha dayanıklı hem daha çok bilgi taşıyor.

**13. Spor salonu ve antrenman başlatma**
Spor çantanda ya da dolabında, antrenman uygulamanı bugünkü programla açan bir tag.

### Yaratıcı kullanımlar

**14. Restoranda masadan sipariş**
Restoran işletiyorsan masalara tag göm. Müşteriler okutup menüyü görsün, sipariş versin ya da ödesin. Pek çok yer bunu Kovid döneminde benimsedi ve bir daha vazgeçmedi.

**15. Etkileşimli sanat ve sergiler**
Müzeler ve galeriler eserlerin yanına tag koyuyor; ziyaretçiler okutup sesli rehbere, sanatçı notlarına ya da AR deneyimlerine ulaşıyor.

**16. Hazine avları ve oyunlar**
Bir mekana tag'ler sakla, her biri bir ipucu ya da bulmaca versin. Ekip etkinlikleri, çocuk partileri ya da kaçış odası tarzı oyunlar için harika.

---

## NFC tag'ler ve iPhone Kısayolları

İnsanlara göstermeyi en sevdiğim şey bu. Apple'ın iOS'a gömülü **Kısayollar** uygulamasında NFC tetikleyicisi desteği var ve tag'lerin iPhone'da kullanışlıdan gerçekten güçlüye dönüştüğü yer burası.

Nasıl kurulacağı:
1. Kısayollar uygulamasını aç
2. **Otomasyon** sekmesine git
3. **Yeni Otomasyon**'a, sonra **NFC**'ye dokun
4. Tetikleyici olarak kullanacağın tag'i okut
5. İstediğin otomasyonu kur

İşin zekice yanı: tag'e veri yazılmış olması bile gerekmiyor. Kısayollar tag'i benzersiz donanım kimliğinden tanıyor, yani tamamen boş bir tag karmaşık bir şeyi tetikleyebiliyor:

- Masandaki tag'i okutunca odak modu ve zamanlayıcı başlat
- Ofis tag'ini okutunca varış saatini bir tabloya kaydet
- Araç tag'ini okutunca eşine "yola çıktım" yaz
- Belirli akıllı ev cihazlarını aç kapat

Android'de **Tasker** ve **MacroDroid** gibi uygulamalar aynı türden NFC tetikli otomasyonu yapıyor.

---

## Sık sorulan sorular

### NFC tag'lerin pile ihtiyacı var mı?
Hayır. NFC tag'ler tamamen edilgen; gücü okuyan cihazın alanından alıyorlar. Hiç tükenmiyorlar ve on yıl ya da daha uzun dayanabiliyorlar.

### NFC tag'ler ele geçirilebilir mi?
Standart tag'lerde varsayılan olarak şifreleme yok, yani NFC'li telefonu olan herkes kilitlenmemiş, korumasız bir tag'i okuyabiliyor. Adres paylaşmak ya da kısayol tetiklemek gibi kullanımların çoğunda bunu sorun görmüyorum. Hassas uygulamalarda kriptografik özellikleri olan bir tag kullan (NTAG424 DNA gibi) ya da tag'in yalnızca ek doğrulama isteyen bir eylemi tetiklediğinden emin ol.

### Telefonumu ne kadar yakın tutmam gerekiyor?
Yaklaşık 1-4 cm içinde. iPhone'larda NFC anteni telefonun üstünde, çoğu Android telefonda ise arkanın üst ortasında. Birkaç denemede doğru noktayı bulacaksın.

### NFC tag'leri yeniden yazabilir miyim?
Tag kilitlenmemişse evet. Tag'lerin çoğu kabaca 100.000 yazma çevrimi kaldırıyor, yani istediğin kadar yeniden programlayabilirsin. Bir kez kilitlendiğinde ise tag kalıcı olarak salt okunur oluyor.

### Bir NFC tag ne kadar veri saklayabiliyor?
Çipe bağlı: NTAG213 yaklaşık 144 bayt, NTAG215 yaklaşık 504 bayt, NTAG216 yaklaşık 888 bayt tutuyor. Tipik bir adres 30-80 bayt. Çok değil; tag'ler kısa veriler ya da çevrimiçi içeriğe işaret etmek için en iyisi.

### NFC tag'ler kılıfın içinden çalışıyor mu?
Evet. NFC, telefon kılıflarının çoğundan, etiketlerden ve ince malzemelerden geçiyor. Çok kalın ya da metalik kılıflar menzili kesebiliyor. Tag'i metale yapıştırıyorsan metal yüzeyler için üretilmiş olanı kullan; içinde ferrit yalıtım katmanı var.

### NFC tag ile NFC kart arasındaki fark ne?
Temelde hiçbir fark yok. NFC kart, kart biçiminde bir gövdeye konmuş NFC tag'inden ibaret; çip ve anten aynı teknoloji. Kartlar genelde NTAG213 ya da NTAG215 kullanıyor ve kartvizitlerde, geçiş kartlarında ve sadakat programlarında yaygın.

---

## Başlarken: ilk NFC projen

Denemek ister misin? Herkesi başlatacağım beş dakikalık bir proje:

**Proje: evin için Wi-Fi paylaşım tag'i**

1. **Tag al:** bir paket [NTAG216 etiket](/affiliate-links/) edin (25 tanesi yaklaşık 10 dolar)
2. **NFC.cool Tools'u indir:** [iOS](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-tags-beginners-guide-tr&mt=8) ya da [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-tags-beginners-guide-tr) için
3. **Wi-Fi bilgilerini yaz:** uygulamayı aç, Yaz'ı, sonra Wi-Fi'yi seç, ağ adını ve parolanı gir ve telefonunu tag'e tut
4. **Tag'i yerleştir:** görünür bir yere; kapının yanına, buzdolabına, misafir odasına
5. **Sına:** başka bir telefonla okut, ağa katılma istemi çıkmalı

Toplam maliyet: yaklaşık 0,30 dolar ve iki dakika. Gelen her misafir bunun için sana teşekkür edecek.

---

## Toparlarsak

NFC tag'ler, kulağa karmaşık gelip aslında şaşırtıcı derecede basit çıkan teknolojilerden biri. Pil yok, eşleştirme yok, temel okuma için uygulama yok. Birkaç sent, yıllarca dayanan ve milyarlarca telefonla çalışan programlanabilir bir çip alıyor.

İşimi bu küçük çiplerin üstüne kurdum ve hâlâ yeni kullanımlar buluyorum. İster sabahını otomatikleştirmek, ister iletişim bilgilerini paylaşmak, ister eğlenceli bir şey kurmak iste: tag, telefonu okutmakla gerçek dünyada bir şeyin olması arasındaki köprü.

**NFC tag programlamaya hazır mısın?** [NFC.cool Tools'u](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-tags-beginners-guide-tr&mt=8) iPhone ya da [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-tags-beginners-guide-tr) için indir; NFC tag okumanın, yazmanın ve yönetmenin bildiğim en kolay yolu.

**NFC destekli bir dijital kartvizit mi istiyorsun?** [NFC.cool Business Card'a](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-nfc-tags-beginners-guide-tr&mt=8) bak; iletişim bilgini tek okutmayla paylaş. Uygulama arayüzü ve App Clip 35 dilde.
