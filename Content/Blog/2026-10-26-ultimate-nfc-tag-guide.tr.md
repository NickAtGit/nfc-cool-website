---
id: "ultimate-nfc-tag-guide-2026-09"
title: "En kapsamlı NFC tag rehberi: her çip, ne işe yarar ve onu ne okur"
date: "2026-10-26"
tags: ["nfc-tags", "guides"]
summary: "48 baytlık NTAG210'dan DESFire EV3'e kadar satın alabileceğin her NFC çipi, gerçek rakamlarıyla: bellek, koruma, dayanıklılık, iPhone'un ve Android telefonun onunla neler yapabildiği ve aslında hangi iş için üretildiği."
image: "/assets/images/Blog/ultimate-nfc-tag-guide.webp"
imageAlt: "Arkasında parlayan NFC simgesi olan bir iPhone ve önünde sıra halinde dizilmiş NFC tag biçimleri: etiket, jeton, PVC kart, anahtarlık, bileklik ve şeffaf inlay"
author: "Nicolo Stanciu"
metaTitle: "En kapsamlı NFC tag rehberi: bütün çipler tek tek"
metaDescription: "Bütün NFC çipleri tek yerde: NTAG, MIFARE, DESFire, ICODE, ST25, FeliCa, Topaz ve klonlar. Bellek, güvenlik, dayanıklılık, onu ne okur ve hangi tag hangi işe uyar."
ogTitle: "Her NFC çipi, tek rehberde"
ogDescription: "Satın alabileceğin her NFC çipi için bellek, güvenlik, dayanıklılık, telefon desteği ve dürüst kullanım alanı. Teknik tablolar, karar tablosu ve tam katalog."
---

Bir paket NFC tag'in ilanını açıyorsun. "NFC 213" yazıyor, ya da "NTAG215 uyumlu", ya da sadece "1K NFC kart, tüm telefonlarla çalışır". Tek bir şey öğrenmek istiyorsun: aklımdaki işi görür mü? İlan bunu söyleyemiyor, çünkü onu yazan kişi de bilmiyor.

Yıllardır [NFC.cool Tools](/features/nfc-reader-writer/) uygulamasını geliştiriyorum. Uygulamanın her okutmadaki ilk işi tam olarak bu soruyu yanıtlamak: bu hangi çip ve ne yapabilir? Yalnızca tanımlama kodu, yedi üreticiden altmış civarında ürünü tanıyor ve her biri o listeye, biri onu telefona yaklaştırdığında ilanda vaat edilen gibi davranmadığı için girdi. Bu rehber, o kodu yazarken keşke elimde olsaydı dediğim başvuru kaynağı. Bilerek uzun. Kısa sürümünü istiyorsan [NFC tag'lere yeni başlayanlar rehberi](/blog/nfc-tags-beginners-guide/) iyi bir başlangıç; o da ayrıntı için buraya bağlantı veriyor.

Tablolardan önce aklında olsun diye tek cümlelik özet: **en iyi NFC tag diye bir şey yok, yalnızca işe uygun çip var**. İşi de üç şey belirliyor: ne kadar veri saklaman gerektiği, kimi dışarıda tutman gerektiği ve onu neyin okuyabilmesi gerektiği.

---

## Bu rehber nasıl kullanılır

Bu rehberdeki her rakam bir üreticinin veri sayfasından, Apple'ın ya da Google'ın platform belgelerinden veya kendi uygulamamın kodundan geliyor; [kaynaklar](#kaynaklar-ve-ek-okumalar) en sonda listeli. Bir çip masama geldiyse bunu "Kendi deneyimim" notunda söylüyorum. Gelmediyse onu da söylüyorum: egzotik parçalar veri sayfalarından geliyor ve veri sayfası bir ölçüm değil, bir vaattir.

Burada bulamayacağın iki şey var: ilk tag'ini adım adım yazma anlatımı (o [yazma rehberinde](/blog/write-nfc-tags-iphone/)) ve [ayrı bir yazısı](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/) olan NTAG 424 DNA'nın bütün hikayesi.

- [NFC tag fiziksel olarak nedir](#nfc-tag-fiziksel-olarak-nedir)
- [Kısaltma çorbası: standartlar, Forum tipleri ve NFC olmayanlar](#kısaltma-çorbası-standartlar-forum-tipleri-ve-nfc-olmayanlar)
- [Veri sayfası ya da ilan nasıl okunur](#veri-sayfası-ya-da-ilan-nasıl-okunur)
- [NDEF ve bir tag'e gerçekte ne sığar](#ndef-ve-bir-tage-gerçekte-ne-sığar)
- [Bellek haritaları: çipte ne nerede](#bellek-haritaları-çipte-ne-nerede)
- [Karar tablosu](#karar-tablosu)
- [Aile aile çipler](#aile-aile-çipler)
- [Form faktörleri ve okuma mesafesi](#form-faktörleri-ve-okuma-mesafesi)
- [Hangi cihaz neyi okur](#hangi-cihaz-neyi-okur)
- [NFC.cool Tools her çiple ne yapıyor](#nfccool-tools-her-çiple-ne-yapıyor)
- [Kazıklanmadan tag almak](#kazıklanmadan-tag-almak)
- [Bütün katalog tek tabloda](#bütün-katalog-tek-tabloda)
- [En çok aranan karşılaştırmalar](#en-çok-aranan-karşılaştırmalar)
- [Sık sorulan sorular](#sık-sorulan-sorular)
- [Terimler sözlüğü](#terimler-sözlüğü)
- [Kaynaklar ve ek okumalar](#kaynaklar-ve-ek-okumalar)

---

## NFC tag fiziksel olarak nedir

NFC tag, birbirine yapıştırılmış üç parçadan oluşur: kum tanesi büyüklüğünde bir **çip**, birkaç tur kazınmış alüminyum ya da bakırdan oluşan bir **anten** ve bunları taşıyan bir **taban malzemesi**. Taban; kağıt etiket, PET inlay, PVC kart ya da cam kapsül olabilir. Çipin pili yok. Gücünü telefondan alıyor.

Bunun yolu endüktif kuplaj. Telefonun anteni, saniyede 13,56 milyon kez yön değiştiren bir manyetik alan üreten bobin. Bu alana ikinci bir bobin getirdiğinde onda akım indüklenir; kablosuz şarj cihazıyla aynı ilke, yalnızca gücün çok küçük bir kesriyle. Tag'in çipi bu indüklenen akımla yaşıyor. Veri geri gönderirken kendi başına hiçbir şey yayınlamıyor: anteninin üzerindeki bir yükü açıp kapatıyor, telefonun bobini de bunu kendi alanındaki minik bir değişim olarak hissediyor. Bu numaranın adı **yük modülasyonu**. Bütün işi telefonun yapmasının ve tag'in sekiz sente mal olabilmesinin nedeni bu.

Menzilin neden bu kadar olduğu da buradan geliyor. Küçük bir bobinin alanı mesafenin küpüyle zayıflar; bir santimetrede kusursuz okunan tag on santimetrede hiçbir şey almaz. Bunu mum gibi düşünüyorum: yakınsan ışığında kitap okursun, odanın öbür ucundan ise ne kadar gözünü kısarsan kıs işe yaramaz. NFC Forum'un kendi tanımı "tipik olarak 2 cm'ye kadar" bir menzilden söz ediyor, Android'in belgeleri "4 cm ya da daha az" diyor, NXP'nin veri sayfaları ise "alan gücüne ve anten geometrisine bağlı olarak 100 mm'ye kadar". Üçü de doğru. Telefonda karşılaşacağın rakam ilk ikisi; 100 mm ise çipin büyük bir okuyucu ve büyük bir antenle yapabildiği.

Veri hızları mütevazı, çünkü daha fazlasına gerek yok. Type A ya da Type B tag 106 kbit/s ile konuşur; hızlı çipler ilk el sıkışmadan sonra 212, 424 ya da 848 kbit/s üzerinde anlaşır. FeliCa 212 ya da 424'te çalışır. Uzun menzilli aile olan ISO 15693 normal modunda 26,48 kbit/s ile daha da yavaştır, çünkü telefondan değil, bir metre ötedeki depo kapısı okuyucusundan okunmak için tasarlandı. NTAG216'nın 888 baytının tam dökümü her durumda saniyenin küçük bir kesrinde biter.

| Standart | Temel hız | Hızlı modlar | Dönüş kanalı |
| --- | --- | --- | --- |
| ISO/IEC 14443 Type A ve B | 106 kbit/s | bunları destekleyen çiplerde 212, 424, 848 kbit/s (DESFire, Plus, NTAG 424 DNA) | 847,5 kHz alt taşıyıcıda yük modülasyonu |
| FeliCa (JIS X 6319-4, ISO/IEC 18092) | 212 kbit/s | 424 kbit/s | yük modülasyonu |
| ISO/IEC 15693 | 26,48 kbit/s (düşük hızda 6,62 kbit/s) | NXP hızlı modu 53 kbit/s; ICODE 3'te 212 kbit/s'ye kadar | 423,75 kHz alt taşıyıcıda yük modülasyonu |

---

## Kısaltma çorbası: standartlar, Forum tipleri ve NFC olmayanlar

Her ilan üç adlandırma sistemini birbirine karıştırır: radyoyu tanımlayan ISO standartları, verinin nasıl yerleştirildiğini tanımlayan NFC Forum tag tipleri ve üreticilerin ürün adları. Harita şöyle.

### Standartlar

| Standart | Neyi tanımlar | NFC Forum adı | Örnek çipler |
| --- | --- | --- | --- |
| ISO/IEC 14443 Type A (bölüm 1-3) | yakınlık kartları, 106 kbit/s, Type A modülasyonu, çakışma önleme, UID | NFC-A | NTAG, MIFARE Ultralight, MIFARE Classic, Topaz |
| ISO/IEC 14443 Type B | aynısı, farklı bir modülasyonla ve aynı anlamda bir UID olmadan | NFC-B | ST SRI512, Calypso ulaşım kartları, birçok e-pasaport |
| ISO/IEC 14443-4 | A ya da B üzerinde çalışan, ISO-DEP denen taşıma protokolü | ISO-DEP | DESFire, NTAG 424 DNA, SL3'teki MIFARE Plus, banka kartları, pasaportlar |
| ISO/IEC 7816-4 | ISO-DEP üzerinden kullanılan komut dili (APDU'lar) ve dosya sistemi | | üst satırdaki her şey |
| ISO/IEC 7816-6 | başka şeylerin yanı sıra çip üreticisi kodlarının kaydı | | UID'nin ilk baytı |
| ISO/IEC 15693 | uzak mesafe (vicinity) kartları, doğru okuyucuyla bir metreye kadar, 8 baytlık UID | NFC-V | ICODE, ST25TV, ST25DV, TI Tag-it, NTAG 5 |
| JIS X 6319-4 | Sony'nin FeliCa'sı | NFC-F | FeliCa Lite-S, Suica, Octopus |
| ISO/IEC 18092 | NFC'nin kendisi (NFCIP-1): eşler arası iletişim ve telefonların kullandığı pasif modlar | | senin telefonun |

### NFC Forum tag tipleri

NFC Forum çip tasarlamadı. Zaten var olan çiplere **NDEF** mesajı (her telefonun anladığı kapsayıcı biçim) saklamak için beş tarif yazdı. "Tip 2 tag" bunu anlatır: bir çipi değil, bir yerleşim düzenini.

| Forum tipi | Radyo | Bellek modeli | Tipik çipler | Telefon desteği |
| --- | --- | --- | --- | --- |
| Tip 1 | NFC-A | 8 baytlık bloklar, bir kez kilitlenebilir | Innovision/Broadcom Topaz | iki platformda da okunur; NFC Forum, Tip 1'i 2021 spesifikasyon sürümünden çıkardı |
| Tip 2 | NFC-A | 4 baytlık sayfalar, 3. sayfada yetenek kapsayıcısı, TLV blokları | NTAG21x, MIFARE Ultralight, ST25TN, Fudan FM11NT0x1, Infineon my-d move | iPhone ve Android, iPhone'da arka planda okuma dahil |
| Tip 3 | NFC-F | 16 baytlık bloklar, servis kodları | FeliCa Lite-S, FeliCa Standard | iPhone ve Android (Android'de NFC-F desteği zorunlu) |
| Tip 4 | NFC-A ya da NFC-B üzerinde ISO-DEP | APDU ile seçilen dosyalar: bir CC dosyası ve bir NDEF dosyası | NTAG 424 DNA, DESFire, ST25TA | iPhone ve Android |
| Tip 5 | NFC-V | 4 baytlık bloklar, 0. blokta CC | ICODE SLIX ve SLIX2, ST25TV, ST25DV, NTAG 5 | iPhone'da iOS 13'ten beri, Android'de NfcV ile; Forum'a 2015'te eklendi |

Listede bilerek yer almayan iki şey var. **MIFARE Classic** bir Forum tag tipi bile değil; Classic üzerinde NDEF, NXP'nin tanımladığı bir eşleme. Android bunu bazı telefonlarda destekliyor, iOS ise hiçbirinde. Ayrıca Forum tarifleri güvenlik hakkında hiçbir şey söylemez. Tip 2 tag düz bir NTAG213 de olabilir, AES-128 kimlik doğrulamalı bir NTAG 224 DNA da; Tip 4 tag çıplak bir ST25TA02K da olabilir, bir banka kartı da. Tip, NDEF mesajının nasıl saklandığını söyler, ona kimin erişebildiğini değil.

### NFC tag olmayanlar

Aldığım "telefonum bunu neden okumuyor" mesajlarının yarısı aslında hiç NFC olmayan şeyler hakkında. Telefonun NFC bobini 13,56 MHz'e ayarlı ve yukarıdaki protokolleri konuşuyor. Geri kalan her şey, ne kadar tag'e benzerse benzesin, ona görünmez.

| Tag'e benziyor ama | Frekans | Aslında ne | Telefon okuyabilir mi |
| --- | --- | --- | --- |
| görünür çipi olmayan ofis ya da otopark kartı | 125 kHz | düşük frekanslı RFID: salt okunur EM4100 kimlikleri, HID Prox, yeniden yazılabilir T5577 | hayır ve bunu hiçbir uygulama değiştiremez |
| evcil hayvan mikroçipi | 134,2 kHz | ISO 11784/11785 FDX-B transponder | hayır |
| mağaza hırsızlık önleme ya da lojistik etiketi | 860-960 MHz | UHF RAIN RFID, EPC Gen2 | hayır |
| otel anahtarı ya da eski ulaşım kartı | 13,56 MHz | MIFARE Classic ya da tescilli bir HF kart | Android bazen; iPhone yalnızca UID'yi gösterir |
| banka kartı | 13,56 MHz | ISO-DEP konuşan EMV akıllı kart | teknik olarak evet; uygulama kartın uygulama listesini ve herkese açık verilerini okuyabilir, ama Apple'ın Core NFC'si ödeme kartı okumayı engelliyor ve hiçbir telefon çalışan bir kopya üretemez |
| pasaport | 13,56 MHz | ICAO 9303 e-belge | evet, anahtar olarak makine tarafından okunabilir bölgeyle; [bunu ben yaptım](/blog/read-passport-nfc-chip/) |
| güvenlik anahtarı | 13,56 MHz | ISO 7816 üzerinden çalışan FIDO2 kimlik doğrulayıcı | tarayıcı için evet, tag olarak hayır |

Asıl can sıkan 125 kHz'lik kart. Kapıdaki okuyucuya uyuyor, içinde bobin olan plastik bir kart ve asla bir telefonla konuşmayacak. [iPhone'un site kapısını neden açamadığını](/blog/iphone-rfid-condo-doors/) ayrıca yazdım, çünkü dürüst yanıt donanımda yatıyor.

---

## Veri sayfası ya da ilan nasıl okunur

Veri sayfasının ilk sayfasında ihtiyacın olan bütün rakamlar var, iyi bir ilan da bunları aynen aktarır. Her birinin ne anlama geldiği ve hangilerinin yalan söylediği aşağıda.

### Kullanıcı belleği ve toplam bellek

Her çipte kullanabileceğinden fazla EEPROM var. NTAG213'te toplam 180 bayt var ve bunun 144'ü senin; kalan 36 bayt UID'yi, kilit bitlerini, yetenek kapsayıcısını ve yapılandırma sayfalarını tutuyor. MIFARE Classic 1K'da 1024 bayt var ve 752'si veri, çünkü her sektör bloklarından birini anahtarlarına veriyor. İlanlar hangisi büyükse onu yazar. Önemli olan rakam **kullanıcı belleği** ve o bile NDEF mesajına sığan miktar değil; o da sonraki bölümün konusu.

### UID

Benzersiz tanımlayıcı fabrikada çipe yakılır ve değiştirilemez; tabii onu değiştirmek için yapılmış klonlar hariç. Üç uzunluk var:

| UID uzunluğu | Nerede | Notlar |
| --- | --- | --- |
| 4 bayt | eski MIFARE Classic, bugünün ucuz Classic kartları | NXP bunlara "non-unique identifier" (NUID, benzersiz olmayan tanımlayıcı) diyor, çünkü 4 bayt tükendi. 4 baytlık UID'de üretici kodu yok. İlk bayt 08 ise çip her okutmada rastgele bir kimlik üretiyor demektir |
| 7 bayt | NTAG, Ultralight, DESFire, NTAG 424 DNA, Classic EV1 (isteğe bağlı); FeliCa'nın 8 baytlık IDm'i de yakın akrabası | ilk bayt üretici kodu |
| 8 bayt | her ISO 15693 çipi | ilk bayt her zaman E0, ikincisi üretici kodu |

Üretici kodu ISO/IEC 7816-6 kaydından gelir ve bir ilanı dürüstçe sınamanın en hızlı yolu. "Orijinal NXP" diye satılan tag 1D bildiriyorsa onu Fudan üretmiştir.

| Kod | Üretici |
| --- | --- |
| 01 | Motorola |
| 02 | STMicroelectronics |
| 03 | Hitachi |
| 04 | NXP Semiconductors |
| 05 | Infineon |
| 07 | Texas Instruments |
| 08 | Fujitsu |
| 16 | EM Microelectronic |
| 1A | Sony |
| 1D | Shanghai Fudan Microelectronics |
| 25 | Innovision (Topaz) |
| 2C | Impinj |
| 2E | Broadcom |

### ATQA, SAK ve GET_VERSION: okuyucu çipleri nasıl ayırt eder

Type A çip telefona yanıt verirken iki küçük değer gönderir: **ATQA** ve **SAK**. Okuyucular, benim uygulamam da dahil, çipleri ailelere ayırmak için SAK'ı kullanır, çünkü SAK bitleri çipin ISO-DEP konuşup konuşmadığını ve hangi geniş aileye ait olduğunu söyler. NXP'nin kendi tanımlama notu kalın harflerle ATQA'nın hiçbir şey için kullanılmamasını söylüyor, çünkü çakışıyor ve yanıltıyor. Ben de bunun doğru olduğunu gördüm.

| SAK | Aile | Genelde görülen ATQA |
| --- | --- | --- |
| 00 | NTAG ve MIFARE Ultralight, hepsi | 00 44 |
| 08 | MIFARE Classic 1K, güvenlik seviyesi 1'deki MIFARE Plus 2K ya da SE | 00 04 (4 baytlık UID), 00 44 (7 bayt) |
| 09 | MIFARE Classic Mini | |
| 18 | MIFARE Classic 4K, seviye 1'deki MIFARE Plus 4K | 00 02 ya da 00 42 |
| 10, 11 | seviye 2'deki MIFARE Plus X | |
| 20 | ISO-DEP konuşan her şey: DESFire, NTAG 424 DNA, seviye 3'teki Plus, banka kartları, JCOP | 03 44 (DESFire, 424), rastgele kimlikle 03 04 |

Her NTAG ve her Ultralight SAK 00 yanıtı verdiği için NTAG213'ü NTAG216'dan ve Ultralight EV1'den ayırmak bir komut daha gerektirir: **GET_VERSION**. Sekiz bayt döndürür ve işi bunlardan üçü görür. 2. bayt ürün tipi (03 Ultralight, 04 NTAG, 07 NTAG I2C, 01 DESFire, 02 Plus, 08 DESFire Light), 4. bayt nesil, 6. bayt ise depolama boyutunu kodlar. NFC.cool neye baktığını böyle anlıyor; Amiibo okuyan bir konsolun tag'e sorduğu ilk şey de bu.

| Çip | GET_VERSION yanıtı |
| --- | --- |
| NTAG213 | 00 04 04 02 01 00 0F 03 |
| NTAG215 | 00 04 04 02 01 00 11 03 |
| NTAG216 | 00 04 04 02 01 00 13 03 |
| NTAG210 | 00 04 04 01 01 00 0B 03 |
| NTAG212 | 00 04 04 01 01 00 0E 03 |
| Ultralight EV1 48 B | 00 04 03 01 01 00 0B 03 |
| Ultralight EV1 128 B | 00 04 03 01 01 00 0E 03 |
| Ultralight AES | 00 04 03 0x 04 00 0F 03 |
| NTAG 223 DNA | 00 04 04 02 04 00 0F 03 |
| NTAG 424 DNA (APDU içine sarılı) | üretici 04, tip 04, ana sürüm 30, depolama 11 |

GET_VERSION'ı olmayan çipler de var: orijinal Ultralight, Ultralight C ve eski NTAG203'te hiç olmadı, klonların çoğunda da yok. Bu yokluk başlı başına bir parmak izi.

### Dayanıklılık, veri saklama, sıcaklık

İlanların neredeyse hiç yazmadığı, veri sayfalarının ise her zaman yazdığı üç rakam bunlar.

- **Yazma dayanıklılığı**, bir baytın kaç kez yeniden yazılabildiğidir. Güncel her çip için taban 100.000 döngü; Classic dönemi çipler ve orijinal Ultralight 10.000 döngüye göre derecelendirilmiş. DESFire EV3 ve ST25DV ailesinde tipik değer 1.000.000.
- **Veri saklama süresi**, baytların güç olmadan ne kadar dayandığıdır. Eski standart 10 yıl; NXP, NTAG 424 DNA ve ICODE SLIX ailesi için 50 yıl veriyor, ST ise ST25TA Tip 4 çipleri için 200 yıl. Saklama süresi oda sıcaklığı için belirtilir; ısı onu kısaltır.
- **Çalışma sıcaklığı** NXP'nin çoğu tüketici çipinde -25 ile +70 °C, ST ve EM parçalarında -40 ile +85 °C, ICODE 3'te 105 °C'ye kadar. Sınırı genellikle çip koymaz; yapışkan ve taban malzemesi koyar.

### Güvenlik merdiveni

İlanın en çok yalan söyleyen kısmı burası. "Şifreli", "güvenli", "kopyalanamaz" gibi sözler, tek koruması açık metin olarak gönderilen 32 bitlik parola olan tag'lerin üstüne basılıyor. Merdiven aşağıdan yukarıya şöyle ve bu rehberdeki her çip bir basamakta duruyor.

| Basamak | Nedir | Çipler | Neyi engeller |
| --- | --- | --- | --- |
| 0. Hiçbir şey | herkes okuyup yazabilir | orijinal Ultralight, NTAG203, TI Tag-it Standard, Topaz | hiçbir şeyi |
| 1. Kilit bitleri | sayfaları sonsuza dek salt okunur yapan tek yönlü bitler | her Tip 2 ve Tip 5 çip | üzerine yazmayı; kopyalamayı engellemez |
| 2. Parola | 32 bitlik parola ve 16 bitlik onay (PACK), isteğe bağlı hatalı deneme sınırıyla; NTAG21x'te parola havadan şifrelenmeden geçer | NTAG21x, Ultralight EV1, NTAG 223 DNA, ICODE SLIX ailesi (32 bit), ST25TV (32 ya da 64 bit), ST25TA (128 bit) | elinde uygulama olan bir yabancının öylesine üzerine yazmasını; dinleme cihazı (sniffer) olan kararlı bir saldırganı değil |
| 3. CRYPTO1 | NXP'nin 1990'lardan kalma 48 bitlik akış şifresi | MIFARE Classic, seviye 1'deki MIFARE Plus | 2008'den beri hiçbir şeyi; 0. basamak say |
| 4. Triple DES | 16 baytlık anahtarla karşılıklı kimlik doğrulama | Ultralight C, FeliCa Lite-S, DESFire D40 ve EV1 | anahtar olmadan içeriğin kopyalanmasını |
| 5. AES-128 | karşılıklı kimlik doğrulama, güvenli mesajlaşma | Ultralight AES, NTAG 224 DNA, DESFire EV1'den EV3'e, DESFire Light, seviye 3'teki Plus, ICODE DNA, FeliCa Standard, EM4425 | aynısını, hâlâ güvenilen bir şifreyle |
| 6. AES artı SUN | her okutma, URL'nin içinde taze bir kriptografik kanıt üretir | NTAG 424 DNA, NTAG 22x DNA, DESFire EV3 | klonlamayı, çünkü kopya bir sonraki okutmayı imzalayamaz |
| 7. Kurcalama döngüsü | hiç koparılıp koparılmadığını kalıcı olarak bildiren bir tel | NTAG 213 TT, NTAG 424 DNA TT, NTAG 22x DNA StatusDetect, ICODE 3 TT, ST25TV02KC-T | mührün yeniden kullanılmasını |

İki özellik merdivenin üstünde değil, yanında durur. **Orijinallik imzası**, üreticinin UID üzerine yazdığı ve okuyucunun çipin NXP'den ya da ST'den geldiğini kontrol etmesini sağlayan dijital imza. Kopyalamayı engellemez, çünkü klon kopyalanmış bir imza taşıyabilir; NXP bunu kendi uygulama notunda söylüyor. **Sayaçlar** ise (NTAG213/215/216'da 24 bitlik okuma sayacı, Ultralight EV1'de üç tek yönlü sayaç, SLIX2'de 16 bitlik yazma sayacı) bir SUN mesajına katılmadıkça güvenlik için değil, kullanım senaryoları için var.

---

## NDEF ve bir tag'e gerçekte ne sığar

**NDEF** (NFC Data Exchange Format) zarftır. Telefon tag'den "bir URL" okumaz; URI kaydı içeren bir NDEF mesajı okur ve zarfın da bir ağırlığı vardır. "Bağlantım NTAG213'e sığar mı" sorusunu bu ağırlığı bilerek yanıtlarsın.

### Kayıt

Her kayıt bir bayrak baytıyla başlar (mesaj başı, mesaj sonu, kısa kayıt ve üç bitlik tip adı biçimi). Ardından tipin uzunluğu, yükün uzunluğu (yük 256 bayttan kısaysa bir bayt, değilse dört bayt), tipin kendisi ve yük gelir. Yani kısa bir URL kaydı, bağlantının ilk baytından önce 4 baytlık başlık harcar.

| Kayıt | Tip | Yük |
| --- | --- | --- |
| URL | well-known tip `U` | bir önek baytı ve URL'nin geri kalanı, UTF-8 olarak |
| Metin | well-known tip `T` | bir durum baytı, bir dil kodu (`en`), sonra metin |
| Smart Poster | well-known tip `Sp` | içinde koca bir NDEF mesajı: bir URL, isteğe bağlı başlıklar ve bir eylem |
| Kişi | MIME `text/vcard` | vCard metninin kendisi |
| Wi-Fi | MIME `application/vnd.wfa.wsc` | Wi-Fi Simple Configuration öznitelikleri: SSID, kimlik doğrulama tipi, anahtar |
| Android uygulaması | harici tip `android.com:pkg` | bir paket adı; Android o uygulamayı ya da onun Play Store sayfasını açar |

URI kaydının tek zekice yanı önek baytı. `https://` yazmak yerine ilk yük baytı yaygın bir önekin kodudur, telefon da öneki geri yerine koyar.

| Kod | Önek | Kod | Önek |
| --- | --- | --- | --- |
| 00 | yok | 12 | rtsp:// |
| 01 | http://www. | 13 | urn: |
| 02 | https://www. | 14 | pop: |
| 03 | http:// | 15 | sip: |
| 04 | https:// | 16 | sips: |
| 05 | tel: | 17 | tftp: |
| 06 | mailto: | 18 | btspp:// |
| 07 | ftp://anonymous:anonymous@ | 19 | btl2cap:// |
| 08 | ftp://ftp. | 1A | btgoep:// |
| 09 | ftps:// | 1B | tcpobex:// |
| 0A | sftp:// | 1C | irdaobex:// |
| 0B | smb:// | 1D | file:// |
| 0C | nfs:// | 1E | urn:epc:id: |
| 0D | ftp:// | 1F | urn:epc:tag: |
| 0E | dav:// | 20 | urn:epc:pat: |
| 0F | news: | 21 | urn:epc:raw: |
| 10 | telnet:// | 22 | urn:epc: |
| 11 | imap: | 23 | urn:nfc: |

Yani `https://nfc.cool/`, 04 baytı ve ardından `nfc.cool/` olarak saklanır: on yedi karakterlik URL için dokuz baytlık yük. NXP'nin kendi NTAG 5 veri sayfası örnek olarak `D1 01 0C 55 01` ve ardından `nxp.com/nfc` veriyor; çözüldüğünde `http://www.nxp.com/nfc` çıkıyor.

### Kaydın etrafındaki zarf

Tip 2 ya da Tip 5 tag'de mesaj bir TLV'nin içinde durur: "NDEF mesajı" diyen bir bayt (03), bir uzunluk baytı (mesaj 255 bayt ya da daha uzunsa üç bayt), mesajın kendisi ve bir sonlandırıcı bayt (FE). Tip 4 tag'de TLV yok; NDEF dosyası iki baytlık bir uzunlukla başlar. Fabrikadan yeni çıkmış NTAG213 ya da NTAG212'de ise kullanıcı belleğinin ilk beş baytını, NXP'nin önceden yazıp gönderdiği ve her yazma uygulamasının koruduğu bir Lock Control TLV zaten kaplıyor.

İnsanların en çok aldığı çip için tek bir `https://` bağlantısının hesabı, elle yapılmış haliyle:

- NTAG213 kullanıcı belleği: 144 bayt
- fabrika Lock Control TLV'si düşülünce: 139
- NDEF TLV çerçevesi (03, uzunluk, FE) düşülünce: mesaj için 136 bayt
- kayıt başlığı (bayraklar, tip uzunluğu, yük uzunluğu, `U`) düşülünce: 132 bayt yük
- önek baytı düşülünce: **`https://` sonrasında 131 karakter**

### Nereye ne sığar

<div class="table-scroll">

| Tag | NDEF alanı | https:// sonrasında URL karakteri | En sade vCard (132 B; ad, telefon, e-posta, URL) | Tipik vCard (250-500 B) | Wi-Fi kaydı (67-88 B) |
| --- | --- | --- | --- | --- | --- |
| NTAG210, Ultralight EV1 48 B | 48 | 40 | hayır | hayır | hayır |
| NTAG212 | 128 | 115 | hayır | hayır | evet |
| Ultralight EV1 128 B | 128 | 120 | hayır | hayır | evet |
| NTAG213, fabrika hali | 144 | 131 | hayır, 9 bayt eksik | hayır | evet |
| NTAG213, kilit TLV'si silinmiş | 144 | 136 | hayır, 4 bayt eksik | hayır | evet |
| ST25TN01K | 160 | yaklaşık 147 | evet, kıl payı | hayır | evet |
| NTAG215 | 496 beyan edilen (504 kullanıcı) | 483 | evet | evet, çoğu | evet |
| NTAG216 | 872 beyan edilen (888 kullanıcı) | 859 | evet | evet | evet |
| ICODE SLIX | 112 (CC dahil) | 100 | hayır | hayır | evet |
| ICODE SLIX2 | 316 | yaklaşık 300 | evet | genelde | evet |
| NTAG 424 DNA | 256 baytlık NDEF dosyası | 249 | evet | küçük olanlar | evet |
| DESFire EV3 2K | 2048 bayta kadar NDEF dosyası | 2038'e kadar | evet | evet | evet |

</div>

İnsanların takıldığı iki dipnot var. NXP'nin NTAG215 ve NTAG216'daki kendi yetenek kapsayıcısı 496 ve 872 bayt beyan ediyor, yani kullanıcı belleğinden daha az; bu yüzden Android'in `getMaxSize()` çağrısı küçük rakamı bildiriyor ve doğru olan da o. Ayrıca ad, telefon, e-posta ve URL içeren bir vCard zarfsız 132, zarfla 148 bayt tutuyor. NTAG213'e tam sığmamasının ve kartvizit satıcılarının varsayılan olarak NTAG215 ya da NTAG216 seçmesinin nedeni bu. Yeni başlayanlar rehberinde kullandığım yuvarlak rakamlar (yaklaşık 130, 480 ve 850 karakter) bu rakamların köşeleri törpülenmiş hali.

---

## Bellek haritaları: çipte ne nerede

NFC.cool'da bir tag'in dökümünü alıp onaltılık değerlere boş boş baktıysan, şifre çözücü anahtar burada.

### Tip 2: NTAG213 sayfa haritası

| Sayfa | Bayt | İçerik |
| --- | --- | --- |
| 00 | 4 | UID'nin 0-2. baytları ve bir kontrol baytı |
| 01 | 4 | UID'nin 3-6. baytları |
| 02 | 4 | kontrol baytı, dahili bir bayt, 3-15. sayfalar için iki statik kilit baytı |
| 03 | 4 | yetenek kapsayıcısı: E1 10 12 00 (sihirli sayı, sürüm 1.0, 18 x 8 = 144 bayt, okuma ve yazma serbest) |
| 04-27 | 144 | TLV'lerin bulunduğu kullanıcı belleği |
| 28 | 4 | 16. ve sonraki sayfalar için dinamik kilit baytları |
| 29 | 4 | CFG0: ayna (mirror) yapılandırması, aynanın yazıldığı sayfa ve parolayla korunan ilk sayfayı belirten AUTH0 |
| 2A | 4 | CFG1: okuma ya da yazma koruma bitini içeren ACCESS baytı ve hatalı deneme sınırı AUTHLIM |
| 2B | 4 | PWD, yani parola; yalnızca yazılabilir |
| 2C | 4 | PACK, iki baytlık onay, artı iki ayrılmış bayt |

NTAG215 aynı yapıda; kullanıcı belleği 81. sayfaya kadar gidiyor, yapılandırma 83-86'da. NTAG216'da bellek E1'e kadar gidiyor, yapılandırma E3-E6'da. Yetenek kapsayıcısının bitleri tek yönlüdür: 3. bayttaki salt okunur bayrağı ya da bir kilit biti bir kez ayarlandı mı geri alınamaz; uygulamadaki "kalıcı kilit" de tam olarak bunu yazar. Tip 2'de "biçimlendirme" 4. sayfaya boş bir NDEF TLV'si (03 00 FE) yazar; belleği sıfırlamaz, yani eski veriler üzerine yazılana kadar dökümle okunabilir.

### Tip 4: NTAG 424 DNA dosya sistemi

Sayfa yok. D2760000850101 adlı bir ISO 7816 uygulaması üç dosya içerir: 32 baytlık yetenek kapsayıcısı (E103), 256 baytlık NDEF dosyası (E104) ve 128 baytlık tescilli dosya (E105). Her dosyanın kendi okuma, yazma ve değiştirme erişim hakları var ve her biri beş AES anahtarından birine bağlı. DESFire da aynı şekilde çalışır ama kendi uygulamalarını ve dosyalarını oluşturmana izin verir; NTAG 424 DNA'nın üç dosyası ise sabit. Onu [üç çekmeceli, küçük, kilitli bir kasa](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/) diye anlatmamın nedeni bu.

### Tip 5: ISO 15693 blokları

Sıfırdan numaralanan dört baytlık bloklar. Yetenek kapsayıcısı 0. blokta (E1 40 ve ardından boyut), NDEF TLV'si 1. blokta başlar. UID, AFI, DSFID ve kilit durumu adreslenebilir blokların dışında durur ve ayrı bir GET SYSTEM INFORMATION komutuyla okunur. ICODE SLIX2'de adreslenebilir son blok olan 79, 16 bitlik sayaçtır; ICODE 3'te 75. blok 24 bitlik bir sayaç tutar, 76 ve sonrası ise ayrı bir yapılandırma alanıdır.

### MIFARE Classic: sektörler, kuyruk blokları ve dizin

Classic 1K'da her biri 16 baytlık 4 bloktan oluşan 16 sektör var. Her sektörün son bloğu **sektör kuyruğu** (sector trailer): A anahtarı, üç erişim baytı, bir boş bayt, B anahtarı. 0. sektörün 0. bloğu, UID'yi içeren üretici bloğu. NXP, Classic'e NDEF koyabilmek için bir dizin tanımladı: 0. sektör, herkese açık A0 A1 A2 A3 A4 A5 anahtarıyla okunabilen **MIFARE Application Directory** (MAD) olur ve hangi sektörlerin 03 E1 uygulama koduyla NDEF tuttuğunu listeler. O sektörler ikinci bir herkese açık anahtar kullanır: D3 F7 D3 F7 D3 F7. Fabrikadan yeni çıkmış kartta her anahtar FF FF FF FF FF FF. Android'deki NFC.cool bir Classic kartı biçimlendirdiğinde yazdığı şey bu dizin ve bu anahtarlar. Biçimlendirilmiş Classic kartın bazı Android telefonlarda okunup hiçbir iPhone'da okunmamasının nedeni de bu.

---

## Karar tablosu

İşi biliyor ve çipi arıyorsan buradan başla.

| İş | Çip | Neden | NFC.cool desteği |
| --- | --- | --- | --- |
| bağlantı, Wi-Fi ağı, kısayol tetikleyicisi, bir eşyaya yapışan etiket | NTAG213 | 131 karakter URL, parola, sayaç, sekiz sent | iPhone, Android, iPad ve Mac'te tam |
| kişi kartı, daha uzun bağlantı, büyüme payı gereken her şey | NTAG216 | 859 karakter, aynı özellikler, testlerimi üzerinde yaptığım çip | tam |
| Amiibo | NTAG215 | konsol tam olarak bu çipi ve onun 504 baytını arar | iki platformda da yedekleme ve geri yükleme |
| posterde, kartvizitte, demo cihazında okutmaları saymak | NTAG213, 215 ya da 216 | donanım okuma sayacı ve ASCII aynası; uygulamanın okutma sayacının desteklediği üç çip de bunlar | iki platformda da [okutma sayacı](/blog/count-nfc-tag-scans/) |
| minik anten, yüzük, ucuz tek kullanımlık | NTAG 210µ ya da Ultralight EV1 48 B | 48 bayt, küçük bobinler için 17 pF, parola yok | okuma ve yazma |
| ürünün gerçek olduğunu kanıtlamak, tek okutmayla, uygulamasız | NTAG 424 DNA | her okutma kendini AES-128 ile imzalar; kopya bunu yapamaz | imza kontrolü dahil tam yapılandırma |
| aynısı, ama ucuz bir Tip 2 etiket olarak | NTAG 223 DNA | Tip 2 çipte SUN, 144 bayt | Tip 2 tag olarak görünür; SUN kurulumu henüz desteklenmiyor |
| açıldığında bunu bildiren mühür | NTAG 213 TT, NTAG 424 DNA TT, ST25TV02KC-T | kalıcı olarak hatırlanan bir kurcalama teli | 424 TT tam; diğerleri temel çipleri olarak okunur |
| geçiş kapısı okuyucusuyla, kol boyu mesafeden envanter ya da kütüphane | ICODE SLIX2 ya da ICODE 3 | ISO 15693 düzgün bir okuyucuyla 1-1,5 metreden okunur, telefonla da okutulabilir | iki platformda da okuma, yazma, biçimlendirme |
| yazıcının kendisinin okuması gereken 3B yazıcı makarası | ICODE SLIX2 | [OpenPrintTag](/blog/openprinttag-read-write-nfc-spools-phone/) standardı NFC-V bekliyor | okuma ve yazma |
| kapı, turnike, ulaşım sistemi | DESFire EV3 ya da MIFARE Plus EV2 | AES, gerçek anahtar yönetimi, sertifikalı güvenlik | herkese açık kısmı tanımlar ve döker; anahtar işlemi yok |
| mikrodenetleyiciyle konuşan pilsiz sensör | NTAG I2C plus, ST25DV, NTAG 5 | aynı kalıpta I2C arayüzü ve enerji hasadı | NFC yüzü olarak okunur |
| Japonya'nın ulaşım ya da e-para dünyasındaki her şey | FeliCa | oradaki okuyucuların konuştuğu dil bu | okuma; iPhone'da Lite-S ve Standard'a NDEF yazma |
| metal yüzeydeki tag | yukarıdakilerin herhangi biri, metal üstü form faktöründe | işi gören çip değil, ferrit katman | çipe göre |
| deri altı | NTAG216 (xNT), NTAG I2C (xSIID), DESFire (xDF) | küçük cam antenler telefonun en iyi noktasını ister | çipe göre |

Tabloda olmayan: MIFARE Classic. 2026'da Classic çip alacağım tek bir iş bile yok; nedenini aşağıdaki bölüm anlatıyor.

---

## Aile aile çipler

Her aile aynı muameleyi görüyor: veri sayfasından bir özellik tablosu, çipin ne işe yaradığı, telefonların onunla ne yaptığı ve varsa kendi deneyimimden bir not.

### NTAG 21x: etiket ailesi

Tüketicilere satılan neredeyse her NFC etiketinde, jetonunda ve kartında bu çip var. Veri sayfası 2015'ten beri değişmemiş olsa da NXP 2026'da hepsini hâlâ aktif olarak listeliyor.

<div class="table-scroll">

| Çip | Kullanıcı / toplam bayt | Parola | Sayaç | Ayna | İmza | Dayanıklılık / saklama | Durum |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 210µ | 48 / 64 | hayır | hayır | hayır | evet, yeniden programlanabilir | 100k / 10 yıl | aktif |
| NTAG210 | 48 / 80 | 32 bit + PACK, AUTHLIM | hayır | UID | evet | 100k / 10 yıl | aktif |
| NTAG212 | 128 / 164 | evet | hayır | UID | evet | 100k / 10 yıl | aktif |
| NTAG213 | 144 / 180 | evet | 24 bitlik okuma sayacı | UID ve sayaç | evet | 100k / 10 yıl | aktif |
| NTAG215 | 504 / 540 | evet | evet | evet | evet | 100k / 10 yıl | aktif |
| NTAG216 | 888 / 924 | evet | evet | evet | evet | 100k / 10 yıl | aktif |
| NTAG213F, NTAG216F | 144 ya da 888 | evet | evet | evet | evet | 100k / 10 yıl | aktif; elektroniğe gömmek için alan algılama pini ve uyku modu ekler |
| NTAG 213 TT | 144 / 184 | evet | evet | UID, sayaç ve kurcalama durumu | evet | 100k / 10 yıl | aktif; kurcalama teli ekler |
| NTAG203 | 144 / 168 | hayır, 32 bitlik OTP alanı | 16 bitlik yazma sayacı | hayır | hayır | 10k / 5 yıl | üretimi bitti, yerini NTAG213 aldı |

</div>

Hepsi NFC Forum Tip 2, ISO/IEC 14443 Type A, 7 baytlık UID, 106 kbit/s ve -25 ile +70 °C için derecelendirilmiş. NTAG210 ve NTAG212 küçük antenler için 17 pF giriş kapasitansıyla gelir; 213, 215 ve 216'da bu değer 50 pF. Orijinallik imzası secp128r1 eğrisinde ECDSA, 32 bayt ve READ_SIG komutuyla okunuyor. Doğrulama anahtarı herkese açık olmayan bir NXP uygulama notunda duruyor; neredeyse hiçbir tüketici uygulamasının imzayı kontrol etmemesinin nedeni bu.

Pratikte önemli olan üç özellik var. **Parola**: 32 bitlik PWD, tag'in yanıt olarak verdiği 16 bitlik PACK, korumanın nereden başladığını söyleyen AUTH0 ve seçtiğin sayıda yanlış tahminden sonra tag'i kullanılmaz hale getiren AUTHLIM. **NFC sayacı**: 24 bit, her okuma oturumunda bir artar, özel bir komutla okunur. **ASCII aynası**: UID'yi ve sayacı metin olarak NDEF mesajına yapıştırır, böylece düz bir URL her okutmada `https://example.com/?u=04A1...&c=000123` haline gelir. Hakkında yazdığım Philips Sonicare fırça başlıkları, AUTHLIM'i üçe ayarlanmış bir NTAG213 kullanıyor; yanlış tahmin edince [fırça başlığının kendini kilitlemesi](/blog/reset-sonicare-brush-head-nfc/) bundan.

> **Kendi deneyimim:** her sürümü bu çiplerle test ediyorum ve biri tek paket alıp bir daha düşünmek istemediğinde önerdiğim çip NTAG216. Herkese açık bir yerde bıraktığın her şeye parola koymaya değer; ücretsiz uygulaması olan kişiyi, yani çoğu insanı durdurur. Dinleme cihazı olan kimseyi durdurmaz, çünkü parolanın kendisi havada şifrelenmeden gidiyor; bunu uygulamada da açıkça söylüyorum.

Telefonlarda: her şeyde NDEF okuma ve yazma, iPhone'da URL kayıtlarının arka planda okunması, parola, sayaç ve ayna için de iki platformda ham erişim. NFC.cool bunların hepsini iPhone'da, Android'de ve USB okuyucuyla iPad ile Mac'te yapıyor.

### NTAG DNA: her okutmayı imzalayanlar

Üç nesil, ikisi hâlâ üretiliyor.

<div class="table-scroll">

| Çip | Forum tipi | Kullanıcı baytı | Anahtarlar | SUN | İmza | Dayanıklılık / saklama | Durum |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 413 DNA | Tip 4 | 160 (32 CC + 128 NDEF) | 3 AES-128 | evet, 24 bitlik sayaç | ECC | 200k / 50 yıl | artık üretilmiyor |
| NTAG 424 DNA | Tip 4 | 416 (32 + 256 + 128) | 5 AES-128, LRP seçeneği, Random ID seçeneği | evet, şifreli UID seçeneğiyle | ECDSA secp224r1, 56 bayt, artı AES orijinallik anahtarları | 200k / 50 yıl | aktif; Common Criteria EAL4 |
| NTAG 424 DNA TT | Tip 4 | 416 | 5 AES-128 | evet, artı mesajda kurcalama durumu | aynı | 200k / 50 yıl | aktif |
| NTAG 223 DNA | Tip 2 | 144 / 240 | 16 baytlık tek SUN anahtarı artı 32 bitlik parola | evet, 24 bitlik sayaç | ECDSA secp192r1, 48 bayt | 100k / 10 yıl | Şubat 2022'den beri aktif |
| NTAG 224 DNA | Tip 2 | 208 / 304 | parolanın yerini AES-128 karşılıklı kimlik doğrulama alıyor | evet | aynı | 100k / 10 yıl | aktif |
| NTAG 223 ve 224 DNA StatusDetect | Tip 2 | yukarıdaki gibi | yukarıdaki gibi | evet, mesajda sensör durumuyla | aynı | 100k / 10 yıl | aktif |

</div>

**SUN** (Secure Unique NFC), bu çipleri NTAG213'ün üç katı fiyata değer kılan özellik: tag, UID'sini ve okuma sayacını URL'ye yansıtır ve bunların üzerine her okutmada yeniden hesaplanan bir AES-128 CMAC ekler. Sunucu MAC'i kontrol eder; klonlanmış tag'in anahtarı yoktur ve kontrolden geçemez. LRP modu ve beş anahtar dahil hepsini [NTAG 424 DNA yazısında](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/) anlattım, o yüzden burada yalnızca o zamandan beri değişenler var: NXP artık NTAG 426Q DNA'yı ve EAL6+ sertifikalı, 16 kB'lık bağlantılı bir Tip 4 çip olan NTAG X DNA'yı da satıyor. Yani 424 artık en yeni DNA çipi değil; yalnızca etiket olarak gerçekten satın alabildiğin çip.

22x DNA ailesi ilginç bir yeni gelen: Tip 2 çipte SUN. Etiket daha ucuz ve telefon onu düz bir NTAG olarak okuyor. **StatusDetect** varyantları bir sensör ekliyor: ya koptuğunu geri dönüşsüz kaydeden iletken bir döngü ya da iki pin arasında 0-11 pF aralığında kapasitans ölçümü. NXP ikincisini sıvı seviyesi, nem ve basınç için öneriyor.

> **Kendi deneyimim:** ilk NTAG 424 DNA tag'lerimi AliExpress'ten birkaç avroya aldım ve uygulamanın bütün 424 özelliklerini onların üzerine kurdum: anahtar değiştirme, düz ve şifreli modda SUN, dosya erişim hakları, kasa dosyası, kurcalama durumu. 424 aynı zamanda NFC.cool'un orijinallik imzasını NXP'nin yayımladığı açık anahtarla doğrulayıp "Genuine NXP" gösterdiği tek çip. 22x DNA'yı ise yalnızca kağıt üzerinden biliyorum.

### MIFARE Ultralight: bilet ailesi

Ultralight, NTAG'in ağabeyi. Aynı hava arayüzü, aynı 4 baytlık sayfalar, aynı SAK ve EV1'den itibaren aynı komutlar. Fark amaçta: Ultralight tek yolculuk biletleri için, NTAG serisi ise URL taşıyan etiketler için yapıldı. NTAG'in önceden yazılmış bir yetenek kapsayıcısıyla gelip Ultralight'ın gelmemesinin nedeni bu.

<div class="table-scroll">

| Çip | Kullanıcı / toplam bayt | Koruma | Sayaç | İmza | Dayanıklılık / saklama | Durum |
| --- | --- | --- | --- | --- | --- | --- |
| MIFARE Ultralight (MF0ICU1) | 48 / 64 | kilit bitleri ve 32 bitlik OTP alanı | hayır | hayır | 10k / 5 yıl | artık üretilmiyor |
| Ultralight C | 144 / 192 | 16 baytlık anahtarla Triple DES karşılıklı kimlik doğrulama | 16 bit, tek yönlü | hayır | 100k / 10 yıl | yeni tasarımlar için önerilmiyor, yerini Ultralight AES aldı |
| Ultralight EV1 | 48 / 80 ya da 128 / 164 | 32 bitlik parola, AUTHLIM | birbirinden bağımsız üç adet 24 bitlik tek yönlü sayaç | evet, 32 bayt | 100k / 10 yıl | aktif |
| Ultralight AES | 144 / 240 | AES-128 karşılıklı kimlik doğrulama, CMAC ile mesajlaşma, Random ID seçeneği | üç adet 24 bitlik sayaç | evet, artı AES orijinallik anahtarı | 100k / 10 yıl | Şubat 2022'den beri aktif, Common Criteria EAL3+ |
| Ultralight Nano | 40 / 56 | kilit bitleri ve OTP | hayır | evet | 100k / 10 yıl | bulabildiğim herhangi bir duyuru olmadan NXP kataloğundan çıktı |

</div>

Ultralight EV1'i öne çıkaran şey üç tek yönlü sayacı: ulaşım işletmecisi sayıyı azaltır, çip de geri yükselmeyi reddeder. Ultralight AES ise "gerçek kimlik doğrulamalı bir NTAG213 istiyorum" dileğinin sessiz yanıtı: aynı 144 bayt, parola yerine AES-128, üstelik her telefonun okuyabildiği bir Tip 2 tag'de.

Telefonlarda: buradaki her şey Tip 2 tag olarak okunur. Apple'ın Core NFC'si `.ultralight` ailesi sunuyor ve uygulamanın yerel komutlar göndermesine izin veriyor; Android'de isteğe bağlı ama gördüğüm her telefonda bulunan bir `MifareUltralight` sınıfı var. NFC.cool EV1 varyantlarını ve AES'i GET_VERSION'dan adlandırıyor ve EV1'deki parolayı NTAG'inki gibi ele alıyor; AES kimlik doğrulamanın kendisi ise uygulamanın yaptığı bir şey değil.

### MIFARE Classic, Plus ve DESFire: geçiş kontrolü ailesi

Üç aile tek bölümde, çünkü hikayeleri tek: Classic kırıldı, Plus geçiş yoluydu, DESFire da sektörün sonunda vardığı yer.

**MIFARE Classic**, eski otel anahtarındaki, spor salonu kartındaki ve sayısız ofis kartındaki çip. NFC Forum tag tipi değil. Kendi şifresi var: CRYPTO1. İki araştırma grubu onu 2008'de tersine mühendislikle çözdü: Nohl ile Plötz silikona mikroskopla bakarak, Radboud Üniversitesi grubu ise protokolü izleyerek. Radboud grubu bir anahtarı "gerçek bir okuyucuyla yapılan yalnızca bir ya da iki kimlik doğrulama denemesinden, bir saniyeden kısa sürede" elde etti. NXP ikinci makaleyi durdurmak için mahkemeye gitti ve kaybetti. On altı yıl sonra, Ağustos 2024'te Quarkslab, son beş yılın en yaygın Classic uyumlu çipi olan Fudan FM11RF08S'teki bir donanım arka kapısını yayımladı. Ayrıca daha eski Fudan çiplerinin, bazı Infineon çiplerinin ve hatta 2000 civarından kalma bazı NXP çiplerinin paylaştığı daha eski bir arka kapı anahtarı buldu. Classic bir güvenlik ürünü değil; NXP'nin Classic EV1 ürün sayfası da artık "yeni tasarımlar için önerilmez" diyor ve DESFire Light'ı gösteriyor.

<div class="table-scroll">

| Çip | Kullanıcı / toplam bayt | UID | Koruma | Dayanıklılık / saklama | Durum |
| --- | --- | --- | --- | --- | --- |
| Classic Mini | 224 / 320 | 4 bayt | CRYPTO1 | 100k / 10 yıl | üretimi durduruldu |
| Classic 1K | 752 / 1024 | 4 bayt NUID | CRYPTO1 | 100k / 10 yıl | üretimi durduruldu; EV1 yeni tasarımlar için önerilmiyor |
| Classic 4K | 3440 / 4096 | 4 bayt NUID | CRYPTO1 | 100k / 10 yıl | üretimi durduruldu; EV1 önerilmiyor |
| Classic EV1 1K ve 4K | yukarıdaki gibi | 7 ya da 4 bayt, rastgele kimlik seçeneği | CRYPTO1; orijinallik kontrolü yalnızca 1K'da | en az 100k / 10 yıl | yeni tasarımlar için önerilmiyor |

</div>

Her hafta sorulduğu için iPhone konusunda net yanıt: **iPhone, MIFARE Classic kartın içeriğini okuyamaz ve bunu hiçbir uygulama değiştiremez.** Apple'ın Core NFC API'sinde Classic ailesi yok ve MIFARE komutunun belgeleri açıkça "Crypto1 protokolünü desteklemediğini" söylüyor. Telefon UID'yi ve SAK'ı görür, uygulamam bunlardan aileyi adlandırır ve iş orada biter. Android farklı: `MifareClassic` sınıfı isteğe bağlı ve NFC denetleyicisinde donanımsal CRYPTO1 olan telefonlarda bulunuyor (NXP'nin denetleyicilerinde var; bir nesil Nexus ve Galaxy telefondaki Broadcom çiplerinde yoktu). Bu telefonlarda NFC.cool fabrika anahtarının açtığı her sektörü okuyor ve yeni bir kartı NDEF için biçimlendirebiliyor.

**MIFARE Plus**, Classic'in bellek haritasına AES-128 eklenmiş hali; böylece işletmeci önce kartları, sonra okuyucuları değiştirebiliyordu. Güvenlik seviyeleriyle çalışır: SL1 Classic gibi davranır (isteğe bağlı AES ile), SL3 ISO-DEP üzerinden yalnızca AES'tir, Plus X'te ise arada bir SL2 vardı. Plus S ve Plus X'in üretimi durdu; Plus SE (752 baytlık bir 1K) ve Plus EV2 (2K ya da 4K, EAL5+, 25 yıl veri saklama, tipik 1.000.000 döngü dayanıklılık) güncel. SL1'de telefon, Classic'teki gibi SAK 08 ya da 18 görür; SL3'te ise bir ISO-DEP kart görür.

**MIFARE DESFire** bambaşka bir hayvan: uygulamaları, dosyaları, dosya başına erişim hakları ve uygulama başına 14'e kadar anahtarı olan küçük bir dosya sistemi. ISO-DEP üzerinden 848 kbit/s'ye kadar APDU konuşur.

<div class="table-scroll">

| Çip | Kullanılabilir bellek | Kripto | Ekstralar | Dayanıklılık / saklama | Durum |
| --- | --- | --- | --- | --- | --- |
| DESFire D40 | 4 kB | DES, Triple DES | | 100k / 10 yıl | 2011'de piyasadan çekildi; anahtarları aynı yıl güç analiziyle ele geçirildi |
| DESFire EV1 | 2304, 4864 ya da 7936 bayt | DES, 3DES, AES-128 | NFC Forum Tip 4 olarak kullanılabilir, rastgele kimlik | en az 200k / 10 yıl | yeni tasarımlar için önerilmiyor |
| DESFire EV2 | 2560, 5120, 8192 ya da 16384 bayt | AES-128, EAL5+ | işlem MAC'i, yakınlık kontrolü, orijinallik imzası | 200k / 25 yıl | yeni tasarımlar için önerilmiyor |
| DESFire EV3 | 2560, 5120, 8192 ya da 16384 bayt | AES-128, EAL5+ | EV2'deki her şey artı SUN/SDM ve işlem zamanlayıcısı; NFC Forum Tip 4 sertifikası 58652 | en az 200k, tipik 1M / 25 yıl, -25 ile +85 °C | aktif |
| DESFire Light | 640 bayt | yalnızca AES-128, LRP seçeneği, EAL4 | altı dosyalı tek sabit uygulama | 200k / 10 yıl | aktif |

</div>

DESFire adındaki "2K", doğrudan kullanabileceğin 2048 baytlık bir şey değil. NXP'nin karşılaştırma notu kullanılabilir rakamları tablodaki gibi veriyor; oluşturduğun her uygulama ve dosya da kendi başlıkları için 256 baytlık sayfalar halinde ayrılan bir pay alıyor. Etikete güvenmek yerine karta FreeMemory komutuyla sor. DESFire EV3 aileye SUN'ı da getirdi; yani EV3, NTAG 424 DNA'nın URL imzalama numarasını yapabiliyor, EV2 ise yapamıyor.

Telefonlarda: iOS, DESFire'ı `.desfire` MIFARE tag'i olarak, uygulama NDEF uygulamasını isterse de ISO 7816 tag'i olarak sunuyor; Android `IsoDep` kullanıyor. NFC.cool nesli ve boyutu GetVersion'dan belirliyor ve anahtarsız görmesine izin verilen uygulamaları ve dosyaları listeliyor. DESFire'da kimlik doğrulamıyor ve ona yazmıyor. Bu, işletmecinin kendi araçlarının işi ve yapıyormuş gibi davranmaktansa bunu açıkça söylemeyi tercih ederim.

### ISO 15693: uzun menzil ailesi

Bunlar santimetre için değil, metre için tasarlanmış çipler. Telefon onları yine okur (Apple iOS 13'ten beri, Android `NfcV` üzerinden) ve GoToTags'in ölçümüne göre iPhone'da Tip 5 tag'ler Tip 2 tag'lerin kabaca iki katı mesafeden okunuyor. Ama asıl evleri kütüphane kapısı, depo rafı ve çamaşırhane. UID 8 bayt ve E0 ile başlar, bloklar 4 bayttır; aile, Type A çiplerde olmayan üç şey ekler: **AFI** (okuyucunun filtreleyebildiği uygulama ailesi baytı), **DSFID** (veri biçimi baytı) ve mağaza kapısını öttüren elektronik ürün gözetimi biti **EAS**.

**NXP ICODE.** Soy ağacı şöyle: SLI (2000), SLI-S ve SLI-L (2007), SLIX ile S ve L varyantları (2010), SLIX2 (2014), ICODE DNA (2016) ve ICODE 3 (2024). "SLIX3" diye bir şey yok; bunu yazan ilan ya ICODE 3'ü kastediyor ya da tahmin yürütüyor.

<div class="table-scroll">

| Çip | Kullanıcı / toplam bayt | Koruma | Sayaç | İmza | Dayanıklılık / saklama | Durum |
| --- | --- | --- | --- | --- | --- | --- |
| ICODE SLI | 112 / 128 | yalnızca kilit bitleri | hayır | hayır | 100k / 10 yıl | üretimi bitti |
| ICODE SLI-S | 160 / 256 | beş adet 32 bitlik parola: okuma, yazma, imha, gizlilik, EAS | hayır | hayır | 100k / 10 yıl | artık üretilmiyor |
| ICODE SLI-L | 32 / 64 | üç parola | hayır | hayır | 100k / 10 yıl | artık üretilmiyor |
| ICODE SLIX | 112 / 128 | EAS ve AFI için tek bir 32 bitlik parola | hayır | hayır | 100k / 50 yıl | yeni tasarımlar için önerilmiyor |
| ICODE SLIX-S | 160 / 256 | beş adet 32 bitlik parola, gizlilik modu, imha | hayır | hayır | 100k / 50 yıl | aktif |
| ICODE SLIX-L | 32 / 64 | üç parola | hayır | hayır | 100k / 50 yıl | aktif |
| ICODE SLIX2 | 316 / 320 | beş adet 32 bitlik parola, gizlilik modu, imha | 16 bit, yazma komutuyla ilerler | evet, 32 bayt | 100k / 50 yıl | aktif |
| ICODE DNA | 252 / 256 | AES-128 karşılıklı kimlik doğrulama, üç anahtar | 16 bit | evet, yeniden programlanabilir | 100k / 50 yıl | aktif |
| ICODE 3 | 300 / 304 artı 192 baytlık yapılandırma alanı | altı adet 32 bitlik parola, iki gizlilik modu | 24 bit, NTAG gibi okutma sayabilir | evet, 32 ya da 48 bayt, yeniden programlanabilir | 100k / 50 yıl, 105 °C'ye kadar | aktif; TagTamper varyantı mevcut |

</div>

Bu ailede bilmen gereken çip ICODE 3: UID'yi ve okutma sayacını NTAG213 gibi NDEF mesajına yansıtıyor, 212 kbit/s'ye kadar hızla okunuyor ve antenini kendi kendine ayarlıyor. AES'i yok; AES'li parça ICODE DNA ve ikisi de SUN yapmıyor.

**STMicroelectronics ST25TV ve ST25DV.** ST'nin Tip 5 serisi ve bütün rehberde veri sayfası rakamları en iyi olan seri.

<div class="table-scroll">

| Çip | Kullanıcı baytı | Koruma | Sayaç | İmza | Dayanıklılık / saklama | Durum |
| --- | --- | --- | --- | --- | --- | --- |
| ST25TV512, ST25TV02K | 64 ya da 256 | 32 ya da 64 bitlik parolalar, kill komutu, izlenemez mod, -AD varyantında kurcalama | 16 bitlik yazma olayı sayacı | TruST25 | 100k / 60 yıl | yeni tasarımlar için önerilmiyor |
| ST25TV512C, ST25TV02KC | 64 ya da 320 | parolalar, kill komutu, sessiz ve gizli modlar, -T varyantında kurcalama | yok; onun yerine 3 haneli benzersiz okutma kodu | TruST25 | 100k / 60 yıl | aktif, 2035'e kadar temin edilebilir |
| ST25TV04K-P | 512 | 64 bitlik parolalar, kill komutu | hayır | hayır | 1M / 40 yıl | aktif; enerji hasadı pini var |
| ST25TV16K, ST25TV64K ve KC sürümleri | 2048 ya da 8192 | 64 bitlik parolalar, kill komutu | hayır | hayır | 1M / 40 yıl | K parçaları önerilmiyor, KC parçaları aktif |
| ST25DV04K, 16K, 64K ve KC sürümleri | 512, 2048 ya da 8192 | üç adet 64 bitlik RF parolası artı bir I2C parolası | hayır | hayır | 1M / 40 yıl | K parçaları önerilmiyor, KC parçaları aktif |
| M24LR04E, 16E, 64E | 512, 2048 ya da 8192 | 32 bitlik parolalar | hayır | hayır | 1M / 40 yıl | yeni tasarımlar için önerilmiyor |

</div>

ST25TV02KC'nin **Augmented NDEF** özelliği ayrı bir paragrafı hak ediyor, çünkü güvenlik diye satılıyor. Çip her okumada, EEPROM'a dokunmadan, URL'ye UID'sini, özel bir alanı ve üç karakterlik bir **benzersiz okutma kodu** ekliyor. Okutma kodu her okutmada değişiyor ve ST'nin veri sayfası açık açık bu kodun "tahmin edilebilir" olduğunu söylüyor. Bu, sunucuna bunun yeni bir okutma olduğunu söyleyen bir tazelik belirteci; tag'in gerçek olduğunun kanıtı değil. Gerçeklik özelliği, ST'nin UID üzerindeki orijinallik imzası TruST25. O da NXP'ninki gibi bir klonun kopyalayabileceği statik bir imza.

**Tip 5 dünyasının geri kalanı.** Texas Instruments'ın Tag-it HF-I inlay'leri (Standard 32 bayt; parolayla korunan yazma ve kill komutu olan Pro 32 bayt; Plus 256 bayt) 2015'ten önce NFC'ye geçen her kütüphanede var ve hepsi artık önerilmiyor ya da eskimiş olarak işaretli. EM Microelectronic'in EM4233'ü (208 bayt, 96 bitlik anahtarlı gizlilik modu, 60 yıl veri saklama) talep üzerine temin ediliyor. Infineon'un my-d'si ve Fujitsu'nun MB89R118'i, kullanıcılar gönderdiği için NFC.cool'un tanımlama kodunda yer alıyor. NXP'nin NTAG 5'i (link, boost, switch), adındaki NTAG'e rağmen bir ISO 15693 çipi: 2048 ya da 512 bayt, I2C portu, 30 mW'a kadar enerji hasadı ve 1.000.000 döngülük, 40 yıllık EEPROM. Etiket değil, elektronik için bağlantılı bir tag; NTAG21x için yazılmış yazılım onunla konuşamaz.

> **Kendi deneyimim:** SLIX2, her OpenPrintTag filament makarasının içindeki çip; bu yüzden epey tanesi elimden geçti ve NFC.cool onları iki platformda da okuyor, yazıyor ve biçimlendiriyor. Uygulamanın yapmadığı şey, ki bunu açıkça söylemek istiyorum, ISO 15693 parola, gizlilik, EAS ve AFI komutları. Komut baytları kodda başvuru tablosu olarak duruyor; düğmeler henüz yok.

### MIFARE dışındaki Tip 4: ST25TA

ST'nin ST25TA ailesi, DESFire düzeneğinin hiçbir parçası olmadan ISO/IEC 14443 Type A üzerinde çalışan Tip 4 tag'ler: bir NDEF dosyası, bir yetenek kapsayıcısı dosyası ve bir sistem dosyası, iki adet 128 bitlik parola (okuma ve yazma) ve okumaları ya da yazmaları sayabilen 20 bitlik bir olay sayacı.

<div class="table-scroll">

| Çip | NDEF dosyası | Parolalar | Sayaç | İmza | Dayanıklılık / saklama | Durum |
| --- | --- | --- | --- | --- | --- | --- |
| ST25TA512, ST25TA512B | 64 bayt | iki adet 128 bit | B'de 20 bit | B'de TruST25 | 1M / 200 yıl | 512 önerilmiyor |
| ST25TA02K, ST25TA02KB (-P, -D) | 256 bayt | iki adet 128 bit | 20 bit | B'de TruST25 | 1M / 200 yıl | 02K ve 02KB önerilmiyor; 02KB-P ve 02KB-D aktif |
| ST25TA16K, ST25TA64K | 2048 ya da 8192 bayt | iki adet 128 bit | hayır | hayır | 1M / 200 yıl | aktif |

</div>

İki yüz yıl veri saklama ve bir milyon yazma döngüsü, ama yalnızca 106 kbit/s. -P ve -D varyantlarında tag okunduğunda durum değiştiren genel amaçlı bir çıkış pini var; bir lambanın telefona tepki vermesini böyle sağlarsın. İki telefonda da bunlar Tip 4 tag olarak okunur; NFC.cool onlarda NDEF okuyup yazıyor ve ISO-DEP ayrıntılarını gösteriyor.

### Sensörlü ve çift arayüzlü çipler

Bunlar iki yüzlü çipler: bir tarafta NFC anteni, öbür tarafta I2C veri yolu, bir sensör ya da ikinci bir radyo.

| Çip | NFC tarafı | Diğer taraf | Bellek | Dikkat çeken |
| --- | --- | --- | --- | --- |
| NTAG I2C plus (NT3H2111, NT3H2211) | Tip 2, 888 ya da 1912 bayt, 32 bitlik parola, imza | 400 kHz'e kadar I2C, 64 baytlık SRAM üzerinden aktarım, alan algılama pini | 200k-500k / 20 yıl | 15 mW'a kadar enerji hasadı; xSIID implantındaki çip |
| ST25DV (yukarıya bak) | Tip 5 | 1 MHz'e kadar I2C, veri akışı için 256 baytlık posta kutusu | 1M / 40 yıl | V_EH pininde regüle edilmemiş enerji hasadı, veri sayfasına göre "birkaç µW" |
| NTAG 5 link, boost, switch | Tip 5, 2048 ya da 512 bayt, 5332'de AES | I2C, GPIO, PWM çıkışları | 1M / 40 yıl | 30 mW'a kadar hasat; switch varyantı hiç mikrodenetleyici gerektirmiyor |
| NHS3100 | Tip 2, ürün yazılımıyla öykünülüyor | 0,3 °C hassasiyetli sıcaklık sensörüne sahip bir Cortex-M0+ | 32 kB flash, 4 kB EEPROM | folyo üzerinde soğuk zincir kaydedicisi, NFC Forum sertifikalı |
| EM4423 "em echo" | Tip 2, 240 baytlık NDEF alanı | UHF RAIN RFID, aynı bellek, aynı seri numarası | 100k / 10 yıl | üretimi durduruldu |
| EM4425 "em echo-V" | Tip 5, paylaşılan 256 bayta kadar | UHF RAIN RFID, AES-128, kurcalama pedleri, dijital imza | 100k / 50 yıl | güncel; telefonun bir santimetreden, UHF yükleme kapısı okuyucusunun ise metrelerce öteden okuyabildiği tek kalıp |

Bunlarla kendim hiçbir şey yapmadım, yani bu tablo yalnızca veri sayfalarına dayanıyor. Rehber için önemliler, çünkü ilanlarda "NFC çip" diye çıkıp insanların kafasını karıştırıyorlar: NTAG 5 bir NTAG213 değil ve em echo tag'i telefonunda özel bir şey yapmaz.

### Eski ve niş çipler

**Topaz** (Innovision, sonra Broadcom) NFC Forum Tip 1: 8 baytlık bloklar, 96 ya da 512 bayt, tek seferlik kilitler, 10.000 yazma döngüsü. İki telefon da Topaz'dan hâlâ NDEF okuyor, ama NFC Forum, Tip 1'i 2021 spesifikasyon setinden çıkardı ve artık kimse onu yeni tasarımlara koymuyor. Bayilerde hâlâ stok var.

**FeliCa**, Sony'nin ailesi ve Japonya'nın toplu taşıması. FeliCa Lite-S (16 baytlık bloklarda 224 bayt kullanıcı belleği, 8 baytlık IDm, sadeleştirilmiş bir Triple DES MAC) tag sürümü ve NFC Forum Tip 3. FeliCa Standard ise akıllı kart sürümü; güncel RC-SA01'de artık AES ve Common Criteria EAL6+ derecesiyle geliyor ve Suica, PASMO, Edy, WAON, nanaco ile Hong Kong'un Octopus'u bunun üzerinde çalışıyor. Sony'nin FeliCa Plug modüllerinin üretimi Mart 2026'da durduruldu. NFC.cool iki platformda da sistem kodundan ulaşım ve e-para markalarını adlandırıyor, Lite-S ile Standard'ı okuyor ve iPhone'da onlara NDEF yazıyor.

**Kovio NFC Barcode**, basılı silikondan yapılmış, salt okunur, 16 baytlık bir tag'di. Android'de onun için hâlâ bir `NfcBarcode` sınıfı var. Kovio'nun varlıkları 2014'te Thinfilm'e geçti, Thinfilm 2019'da NFC üretimini bıraktı ve 2021'de adını değiştirdi. Sınıf artık bir fosil.

**ISO 14443 Type B bellek çipleri.** ST'nin SRI512, SRT512 ve SRI4K'sı (32 bitlik bloklarda 512 ya da 4096 bit, iki geri sayım sayacı, 1.000.000 döngü, 40 yıl) Fransa ve Belçika'daki ulaşım sistemlerinde ve bazı kayak kartlarında yaşıyor. Android bunları `NfcB` üzerinden sunuyor; iPhone'da ise ham Type B tag nesnesi hiç yok. Yani Type B kart ISO-DEP konuşup bir SELECT komutuna yanıt vermedikçe iPhone onu görmez. Paris'in Navigo sistemi Calypso, bunu yapan bir Type B akıllı kart.

### Klonlar ve uyumlular

Bu, ilanların okumanı istemediği bölüm.

**Fudan FM11NT021**, NTAG213 olmayan en yaygın "NTAG213". 45 sayfada aynı 180 bayt, aynı 144 baytlık kullanıcı alanı, bir parola, 24 bitlik okuma sayacı ve UID'de Fudan'ın 1D üretici kodu var. GET_VERSION'ı desteklemiyor ve güncel veri sayfasında READ_SIG komutu yer almıyor. Bu yüzden iki sorudan birini soran okuyucu sessizlikle karşılaşıp bellek boyutundan tahmin yürütmeye geri dönüyor; Proxmark3 topluluğunun onu NTAG203 olarak bildirmesinin nedeni bu. Fudan 504 ve 888 baytlık sürümler de yapıyor (FM11NT041, FM11NT081). Etiketteki bir bağlantı için iş görürler. Amiibo için görmezler, çünkü konsol ilk olarak GET_VERSION soruyor.

**Fudan FM11RF08 ve FM11RF08S**, ucuz "1K" kartların çoğundaki Classic uyumlu çipler. 08S, 2020'de bilinen Classic saldırılarına karşı önlemler ekledi; sonra üretilen her kartta ortak olan bir donanım arka kapı anahtarı taşıdığı ortaya çıktı. Quarkslab bunu 2024'te, bugün Proxmark3 ürün yazılımında bulunan araçlarla birlikte yayımladı.

**Magic MIFARE Classic kartlar**, UID'nin ve üretici bloğunun yeniden yazılabileceği şekilde yapılmış çipler; gerçek bir Classic buna asla izin vermez. Nesilleri başlı başına bir hobi:

| Nesil | UID'yi nasıl değiştirir | Tespit edilebilir mi | Notlar |
| --- | --- | --- | --- |
| Gen1a, Gen1b | arka kapı uyandırma komutuyla | evet, her okuyucu arka kapıyı yoklayabilir | orijinal "Çin magic kartı"; geçiş sistemleri onu filtreler |
| Gen2, CUID | kimlik doğrulamadan sonra 0. bloğa sıradan bir yazmayla | yoklanacak arka kapı yok; okuyucunun yazmayı denemesi gerekir | telefonla uyumlu, bugün en yaygın olanı |
| FUID, UFUID | bir kez ya da mühürlenene kadar | mühürlenmeden önce | bir kartı kalıcı olarak klonlamak için tek seferlik kartlar |
| Gen3, APDU | özel APDU komutlarıyla | komutları bilen bir okuyucu | |
| Gen4 GTU, GDM, "Ultimate" | parolayla korunan bir yapılandırmayla; Ultralight ve NTAG'e de öykünebilir | yalnızca parola varsayılanken | kart biçiminde, 7 baytlık UID'li, her aileye bürünebilen bir bukalemun |

Magic NTAG21x kartlar da var ve tam öykünen olanlar kopyalanmış bir orijinallik imzasını bile kabul ediyor. NXP'nin statik imzalar konusundaki uyarısı da tam olarak bu.

**Amiibo için "NTAG215 uyumlu".** Amiibo, 540 baytında tag'in kendi UID'sinden türetilen anahtarlarla şifrelenmiş ve imzalanmış veri taşıyan düz bir NTAG215. Baytları başka bir tag'e kopyalarsan imzalar artık tutmaz. Yedeğin hedef UID'ye göre yeniden anahtarlanması gerekmesinin nedeni bu ve NFC.cool'un [Amiibo yedekleme ve geri yükleme](/blog/amiibo-iphone-android-read-collect-backup/) özelliği de tam olarak bunu yapıyor. Konsolun okuma sırası GET_VERSION ile başlar, ardından UID'den türetilen parolayla kimlik doğrulama gelir, sonra yapılandırma sayfaları dahil 135 sayfanın tamamı okunur. GET_VERSION'ı olmayan ya da 135 yerine 45 sayfası olan çip ilk adımda takılır. TagMo'nun belgeleri bunu tek satırda söylüyor: yalnızca NTAG215 tanınır.

**Klon uygulamada nasıl görünür.** NFC.cool önce GET_VERSION ile tanımlıyor. Buna yanıt vermeyen ya da ilan ettiğiyle eşleşmeyen bir bellek boyutu bildiren çip, ilandaki adıyla değil, gerçekte ne olduğuyla adlandırılıyor. NTAG 424 DNA'da uygulama bir adım daha ileri gidip ECDSA orijinallik imzasını NXP'nin açık anahtarıyla doğruluyor; uygulamada kriptografik dayanakla "Genuine NXP" diyebilen tek yer burası. NTAG21x'te uygulama imzayı okumuyor; kısmen NXP'nin doğrulama anahtarı gizlilik sözleşmesi (NDA) kapsamında olduğu için, kısmen de kopyalanmış statik bir imza zaten kontrolden geçtiği için. Tip 2 tag için dürüst kanıt zinciri şu: üretici kodu, GET_VERSION, bellek boyutu ve çipin iddia ettiği özelliklerin gerçekten var olması.

---

## Form faktörleri ve okuma mesafesi

Tag'in ne yapabileceğine çip karar verir; telefonun ona ulaşıp ulaşamayacağına ise form faktörü.

| Form faktörü | Nedir | Tipik anten | Telefonla okuma mesafesi | Derecelendirmeler ve notlar |
| --- | --- | --- | --- | --- |
| Islak inlay | yapışkanlı ve koruyucu astarlı bir PET film üzerinde kazınmış anten ve çip | 22-38 mm | 2-4 cm | bir çipi almanın en ucuz yolu; bir kez yapışır |
| Kuru inlay | aynısı, yapışkansız | yukarıdaki gibi | yukarıdaki gibi | başka bir şeyin içine laminelemek için |
| Kağıt ya da PET etiket | üzerine baskı yapılabilen bir inlay | 22-38 mm | 2-4 cm | kağıt yüzeye baskı yapılır, PET yüzey suya dayanır |
| PVC kart | ISO 7810 ID-1, 85,60 x 53,98 mm, 0,76 mm kalınlık | kartın tamamı | 3-5 cm | elinde tutacağın en büyük anten; okuyucuların tasarım hedefi de bu |
| Jeton, epoksi token | sert reçine kubbenin altında bir inlay, genelde delikli | 20-30 mm | 2-3 cm | su geçirmez; Amiibo'nun form faktörü |
| Anahtarlık | ABS kabuk içinde bir inlay | 20-30 mm | 2-3 cm | GoToTags'in bir anahtarlığı IP67 ve -25 ile +75 °C için derecelendirilmiş |
| Bileklik | içinde inlay olan silikon | 20-25 mm | 1-3 cm | festivaller, havuzlar; bileklik bükülür, inlay bükülmemeli |
| Metal üstü | anten ile metal arasında ferrit tabakalı bir inlay | 22-34 mm | metal üzerinde 2-3 cm | Seritag aynı 22 mm tag için metal üzerinde 21-25 mm, metal dışında 26-30 mm ölçüyor; endüstriyel 34 mm sürüm 31-40 mm'den okunuyor ve IP68, -25 ile +85 °C |
| Çamaşır tag'i | PPS düğme içinde bir çip | 16 mm | 1-2 cm | Smartrac, HF çamaşır tag'ini 200 yıkama döngüsü, -30 ile +200 °C ve 60 bar için derecelendiriyor; çamaşır tag'lerinin çoğu yalnızca UID taşıyan ISO 15693 |
| İmplant | 2 x 12 mm cam kapsülde ya da esnek polimerde bir çip | birkaç milimetre | telefonun tam en iyi noktasını gerektirir | xNT bir NTAG216, NExT buna 125 kHz T5577 ekliyor, xSIID LED'li bir NTAG I2C plus, xDF bir DESFire; esnek sürümler cam olanlardan çok daha iyi okunuyor |

İki fiziksel kural, "okumuyor" şikayetlerinin çoğunu açıklıyor. **Menzili anten boyutu belirler**, kabaca: kart jetondan, jeton 10 mm'lik inlay'den daha uzaktan okunur, implant ise neredeyse temas ister. **Metal anteni bozar**: metal yüzeydeki bobin metalde girdap akımları indükler, bobinin endüktansı düşer ve rezonansı 13,56 MHz'den kayar; çelik dolaba yapıştırılmış normal bir tag bu yüzden ölüdür. Bobinle metal arasına konan ferrit tabaka alanı yönlendirip tag'i geri getirir, ama bedeli daha kısa menzil ve daha yüksek maliyet. Metal üstü tag'lerin üç kat pahalı olmasının nedeni bu.

Telefonu nerede tuttuğun da tag kadar önemli. iPhone'da anten üst kenarda; Apple'ın kendi talimatı da "iPhone'unun üst kısmını" tag'e "yakın tut" diyor. Android'de modele göre değişiyor, genelde arka yüzün ortası ya da kameranın yakını. [Yeni başlayanlar rehberinde](/blog/nfc-tags-beginners-guide/) adım adım anlatım var.

---

## Hangi cihaz neyi okur

Telefon ve okuyucu matrisi. Telefon sütunları Apple'ın ve Google'ın belgelerinden ve kendi uygulamamdan geliyor; masaüstü ve hobi sütunları ise üreticilerin teknik özellik sayfalarından ve projelerin kendi belgelerinden. iPad ve Mac sütununda adı geçen okuyucular dışında bu cihazları kendim test etmedim.

<div class="table-scroll sticky-first">

| Çip ailesi | iPhone, arka planda | iPhone, uygulama içinde | Android | iPad ve Mac, USB okuyucuyla | Web NFC (Android'de Chrome) | ACR122U | ACR1552U, OMNIKEY 5022 | PN532 kartı | Proxmark3 | Flipper Zero |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG21x, Ultralight EV1, diğer Tip 2 | yalnızca URL kayıtları | NDEF, parola, sayaç, ayna, döküm | aynı | aynı, NFC.cool üzerinden | yalnızca NDEF | evet | evet | evet | evet, artı öykünme | evet, artı öykünme |
| NTAG 22x DNA | URL kayıtları | NDEF, ham komutlar | aynı | Tip 2 gibi | NDEF | evet | evet | evet | evet | NTAG olarak okur |
| NTAG 424 DNA, ST25TA, Tip 4 olarak DESFire | URL kayıtları | NDEF, APDU'lar | NDEF, APDU'lar | NDEF, tam 424 yapılandırması | NDEF | evet | evet | evet | evet | NDEF okur; anahtar işlemi yok |
| Ultralight C | biçimlendirilmişse NDEF | NDEF, yerel komutlar | aynı | NDEF | NDEF | evet | evet | evet | evet | evet |
| Ultralight AES | biçimlendirilmişse NDEF | NDEF, yerel komutlar | aynı | NDEF | NDEF | evet | evet | evet | evet | Ultralight olarak okur |
| MIFARE Classic | hayır | yalnızca UID ve aile | denetleyicisinde CRYPTO1 olan telefonlarda tam okuma ve yazma | yalnızca NDEF okuma, bilinen anahtarlarla | hayır | evet, anahtarlarla | evet, anahtarlarla | evet, anahtarlarla | evet, artı anahtar kurtarma ve öykünme | evet, artı anahtar kurtarma ve öykünme |
| MIFARE Plus | hayır | SL1'de UID; SL3'te ISO-DEP | SL1'de Classic gibi; SL3'te IsoDep | UID | hayır | evet | evet | evet | evet | belgelenmemiş |
| DESFire, yerel | hayır | aile ve sürüm, APDU'lar | IsoDep | sürüm | hayır | evet | evet | evet | evet | yalnızca okuma ve kaydetme |
| ISO 15693: ICODE, ST25TV, ST25DV, TI, EM | URL kayıtları | iOS 13'ten beri tam ISO 15693 komut seti | NfcV | denenmedi | NDEF | hayır | evet | hayır | evet, artı öykünme | evet, artı öykünme |
| FeliCa Lite-S ve Standard | URL kayıtları | sistem kodu bildirilmişse okuma ve yazma | NfcF | okuma; NFC.cool üzerinden FeliCa'ya yazma | NDEF | evet | OMNIKEY'de yalnızca UID | evet | evet | Lite-S okuma ve öykünme |
| Topaz (Tip 1) | NDEF | NDEF | NDEF | denenmedi | NDEF | evet | belgelenmemiş | evet | evet | belgelenmemiş |
| ISO 14443 Type B bellek çipi (SRI512) | hayır | hayır | NfcB | denenmedi | hayır | evet | evet | yalnızca okuyucu modu | evet | yalnızca UID |
| 125 kHz kartlar, evcil hayvan çipleri, UHF etiketler | hayır | hayır | hayır | hayır | hayır | hayır | hayır | hayır | 125 kHz evet | 125 kHz evet |

</div>

Birkaç satır ayrıca bir cümleyi hak ediyor.

- **iPhone'da arka planda okuma** yalnızca NDEF URL kaydı için, yalnızca telefonun kilidi açıkken ve telefon kullanımdayken çalışır; kamera, Wallet, bir okuma oturumu ya da uçak modu etkinken çalışmaz. Asla ham bir çipi okumaz. iPhone XS ve sonrasında var.
- **Hangi iPhone'lar tag okuyabiliyor:** Apple'ın WWDC 2019 oturumuna göre uygulama içinde iPhone 7 ve sonrası. Yazma ve ham komutlar iOS 13 ile geldi.
- **Android'in `MifareClassic` sınıfı isteğe bağlı.** Google'ın kendi sözleriyle: "uygulanmamışsa MifareClassic asla listelenmez". Belirleyici olan Android sürümü değil, denetleyici.
- **Web NFC** yalnızca NDEF; Chrome 89 ve sonrası, yalnızca Android. Apple'ın ona karşı olumsuz bir tutumu var, yani Safari sürümü olmayacak. Bu sitedeki [çevrimiçi NFC okuyucunun](/online-nfc-reader/) Android'de çalışıp iPhone kullanıcılarını uygulamaya yönlendirmesinin nedeni bu.
- **iPad ve Mac'te NFC radyosu yok.** NFC.cool 6.15.0'dan beri uygulama bunun yerine Apple'ın akıllı kart altyapısı üzerinden bir USB CCID okuyucuyla konuşuyor. Test ettiğim model HID OMNIKEY 5022 CL; ACS ACR1552U-M1 ve ACR1255U-J1'in çalıştığını ise kullanıcılar bildirdi. Sınırları [ilgili yazıda](/blog/nfc-reading-ipad-mac/) listeledim. NTAG parolası belirlemek okuyucuyla çalışıyor; kaldırmak ise OMNIKEY'in reddettiği bir komut gerektiriyor, yani o iş telefona kalıyor.
- **ACS ACR122U, ISO 15693 desteklemiyor**; ACR1252U ve ACR1255U-J1 de desteklemiyor. ACS serisinde bunu yalnızca ACR1552U yapıyor. OMNIKEY 5022 ise ikisini de yapıyor. Kütüphane tag'leri için okuyucu almadan önce bilmeye değer.
- **Proxmark3 ve Flipper Zero**, MIFARE Classic anahtarlarını kurtarıp kartlara öykünebilen araçlar. Varlık nedenleri bu; rehberde yer almalarının nedeni de "onu ne okur" sorusunun yanıtının onlarsız dürüst olmayacak olması.

<div class="table-scroll">

| Okuyucu | Arayüz | Type A | Type B | FeliCa | ISO 15693 | 125 kHz | Anahtarlarla Classic | Classic anahtar kurtarma | Öykünme | Eylül 2026'da görülen fiyat |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ACS ACR122U | USB, PC/SC | evet | evet | evet | hayır | hayır | evet | hayır | hayır | yaklaşık 40-50 USD; ACS üretimi bitirdi, sahtesi yaygın |
| ACS ACR1252U | USB, PC/SC | evet | evet | evet | hayır | hayır | evet | hayır | kart öykünme modu | 97,50 USD |
| ACS ACR1552U | USB, PC/SC | evet | evet | evet | evet | hayır | evet | hayır | kart öykünme modu | 44,81 USD |
| ACS ACR1255U-J1 | Bluetooth ve USB | evet | evet | evet | hayır | hayır | evet | hayır | hayır | 64,81 USD |
| HID OMNIKEY 5022 CL | USB, PC/SC | evet | evet | yalnızca UID | evet | hayır | evet | hayır | hayır | 69,99 EUR |
| PN532 geliştirme kartı | SPI, I2C, UART | evet | yalnızca okuyucu modu | evet | hayır | hayır | evet | bilgisayardaki araçlarla | Classic 1K/4K ve FeliCa | 24-40 USD |
| Proxmark3 RDV4 | USB, isteğe bağlı BLE | evet | evet | evet | evet | evet | evet | evet | evet | 329-529 EUR |
| Proxmark3 Easy | USB | evet | evet | evet | evet | evet | evet | kısmen | evet | 78 EUR; klonları yaklaşık 28 GBP'den başlıyor |
| Flipper Zero | bağımsız, USB-C, BLE | evet | sınırlı | Lite-S | evet | evet | evet | evet | evet | 169 USD |
| Chameleon Ultra | USB-C, BLE | okuma ve öykünme | hayır | hayır | hayır | öykünme ve okuma | evet | evet | evet | 129 EUR |

</div>

---

## NFC.cool Tools her çiple ne yapıyor

Bir yazıda yaptığım şeyin sahneye çıktığı yer burası ve tam yerinde, çünkü yukarıdaki her satır "peki uygulama bununla ne yapıyor" sorusuyla bitiyor. Aşağıdaki tablo pazarlama metni değil; bu rehberi yazarken onu uygulamanın kendi kaynak kodundan çıkardım ve aksi halde iddia edeceğim iki şeyi düzeltti.

| Çip ailesi | iPhone | Android | Okuyuculu iPad ve Mac |
| --- | --- | --- | --- |
| Ürüne göre tanımlama | yaklaşık 60 ad: NTAG203'ten 216'ya, NTAG I2C, Ultralight ve C, boyuta göre Ultralight EV1, Ultralight AES, Classic Mini, 1K ve 4K, güvenlik seviyesine göre Plus 2K ve 4K, boyuta göre DESFire EV1, EV2 ve EV3, NTAG 424 DNA ve TagTamper varyantı, ICODE SLI, SLI-S, SLI-L, SLIX, SLIX-S, SLIX-L ve SLIX2, TI Tag-it Standard, Pro ve Plus, ST25TV, ST25DV ve M24LR, Infineon my-d, Fujitsu MB89R118, EM4233 ve EM4423, FeliCa Lite ve Standard artı Suica, PASMO, ICOCA, Edy, WAON ve nanaco; EMV ve PIV kartlar da kendi türleriyle tanınır | yaklaşık 20 ad: NTAG203, 213, 215 ve 216, NTAG 424 DNA, DESFire, Classic Mini, 1K ve 4K, Plus 2K ve 4K, JCOP ve SmartMX, Octopus dahil FeliCa markaları; ISO 15693 çipleri ürüne göre değil, boyuta göre bildirilir | okuyucunun answer-to-reset (ATR) yanıtından kart tipi |
| NDEF okuma | her aile | her aile | Tip 2, Tip 4, FeliCa; herkese açık anahtarlarla Classic |
| NDEF yazma, tag'i boşaltma | Tip 2, Tip 4, Tip 5, FeliCa Lite-S ve Standard | Tip 2, Tip 5, NDEF dizinli MIFARE Classic, Android'in biçimlendirebildiği her şey | Tip 2, Tip 4, FeliCa |
| Belleğin tamamını sıfırlama | Tip 5 | Tip 2, Tip 5, Classic | iPhone'daki gibi |
| Kalıcı kilit | Tip 2 kilit baytları; Tip 4, Tip 5 ve FeliCa'da NDEF salt okunur; NTAG 424 DNA'da bilerek reddedilir | Tip 2 | evet |
| Parola | NTAG213, 215, 216 ve 203 | Tip 2 ailesi | belirleme evet; kaldırma okuyucuya bağlı |
| Okutma sayacı ve ayna | NTAG213, 215, 216 | NTAG213, 215, 216 | evet |
| Tam bellek dökümü | Tip 2, ISO 15693, DESFire dosya listesi, FeliCa, NTAG 424 DNA dosyaları | fabrika anahtarıyla Classic, Ultralight, ISO 15693, FeliCa, her Type A çip | Tip 2, Tip 4, FeliCa |
| MIFARE Classic içeriği | hayır; Core NFC'de CRYPTO1 yok | fabrika anahtarıyla okuma, bilinen anahtarlarla biçimlendirme ve yazma | yalnızca NDEF okuma |
| NTAG 424 DNA | anahtarlar, düz ve şifreli modda SUN, dosya erişim hakları, çip yapılandırması, kasa dosyası, rastgele UID, LRP, kurcalama durumu, orijinallik imzası doğrulama | aynısı | aynısı |
| Amiibo | NTAG215 yedekleme ve geri yükleme, hedef tag'e göre yeniden anahtarlanarak | aynısı | evet |
| ISO 15693 parolası, EAS, AFI | henüz yok | henüz yok | hayır |
| DESFire kimlik doğrulama ve yazma | hayır | hayır | hayır |
| Ham komutlar | uzman APDU modu | komut kataloğu | evet |

Kayıtlara geçsin diye iki düzeltme: uygulamanın NTAG21x tag'lerde orijinallik imzasını doğruladığını yazacaktım, doğrulamıyor; bunu yalnızca 424 alıyor. ISO 15693 parola komutlarının da eklendiğini yazacaktım, oysa onlar arayüz bekleyen bir başvuru tablosu. İkisi de yapılacaklar listemde.

---

## Kazıklanmadan tag almak

Bir ilandan almadan önce orada görmem gerekenler:

1. **Çipin tam adı.** "NFC 213" değil "NTAG213"; "ISO 15693 tag" değil "ICODE SLIX2"; "1K kart" değil "MIFARE Classic EV1 1K". İlan çipin adını vermiyorsa satıcı ya bilmiyordur ya da senin bilmeni istemiyordur.
2. **Bayt cinsinden kullanıcı belleği** ve bunun çiple eşleşmesi: NTAG213 için 144, 215 için 504, 216 için 888, SLIX2 için 316. MIFARE Classic çıkan bir "1K", iPhone'da çalışmaz.
3. **Üretici**, eğer ilan orijinal NXP ya da ST olduğunu iddia ediyorsa. UID'deki üretici kodu gerçeği aldıktan sonra söyler; fiyat ise almadan önce. Kimse orijinal NTAG216 etiketlerini piyasa fiyatının üçte birine satmaz.
4. **Anten boyutu ve form faktörü.** 10 mm'lik inlay bir santimetreden okunur, 38 mm'lik dört santimetreden. Metal üstü olan, metal üstü olduğunu yazmalı.
5. **NDEF için biçimlendirilmiş olup olmadığı.** NTAG biçimlendirilmiş gelir; Ultralight EV1 ve ISO 15693 çiplerinin çoğu gelmez. NFC.cool onları biçimlendirir, ama bu bir adım daha demek.

Tehlike işaretleri: "NTAG215 uyumlu" (NTAG215 değildir), merdivenin 4. basamağının altındaki herhangi bir çipte "şifreli" yazması, MIFARE Classic için "tüm telefonlarla çalışır" denmesi ve SLIX3 gibi üreticinin hiç kullanmadığı bir harf içeren her çip adı.

**Tag'ler ne kadar.** 9 Eylül 2026'da Seritag, Shop NFC, GoToTags, NFCW Shop, NFC.CARDS, NFC-Tag-Shop.de, Tagstand ve Digi-Key'de gördüğüm ilan fiyatları. Çoğu mağaza en az onarlı satıyor, yani "tek" sütunu sundukları en küçük kademe. Fiyatlar değişir; bunları oran olarak gör.

| Tag | Tek adet ya da en küçük kademe | 100 adetlik alımda | 1.000 adetlik alımda | Çıplak çip |
| --- | --- | --- | --- | --- |
| NTAG213 etiket | 0,32-0,65 EUR, 0,33-0,58 USD | 0,29-0,34 EUR | 0,23-0,24 EUR, 0,50 USD | wafer hacminde 0,14 USD |
| NTAG215 etiket ya da kart | 0,48-0,54 USD, 0,64-0,67 GBP | 0,35 USD | 0,33 USD | 0,21 USD |
| NTAG216 etiket | 0,97 EUR, 0,71 USD | 0,70 EUR, 0,61 USD | 0,56 EUR, 0,56 USD | 0,37 USD |
| NTAG 424 DNA etiket | 0,63 EUR, 0,90 USD | 0,62 EUR, 0,77 USD | 0,57 EUR, 0,68 USD | tek adet 0,79 USD, 1.000 adette 0,51 |
| MIFARE Classic 1K kart | onluk pakette 1,35-1,59 EUR; tek perakende kart olarak 6,69 EUR | 1,29-1,52 EUR, 1,98 USD | 0,95-1,13 EUR, 0,86 USD | |
| DESFire EV3 kart | 1,85-2,79 EUR | 1,85-2,45 EUR | 1,35-2,29 EUR | 31.000 adette 1,18 USD |
| ICODE SLIX2 etiket | 0,69 EUR | 0,34-0,37 EUR | 0,22-0,25 EUR | tek adet 0,35 USD, 1.000 adette 0,22 |
| ST25TV02KC inlay | 0,32-0,87 USD | 0,30-0,79 USD | 0,28-0,77 USD | makarada 0,13 USD |

Örüntü tahmin edeceğin gibi: bellek neredeyse bedava, kriptografi fiyatı aşağı yukarı ikiye katlıyor, form faktörü de çipten pahalı. Çıplak bir NTAG213 kalıbı on dört sent; fiyatın çoğu onu saran etiket.

Nereden alınır: Gerçekten kullandığım tag'lerin ve okuyucuların listesini [satış ortaklığı bağlantıları sayfasında](/affiliate-links/) tutuyorum. Bütün DNA özelliklerini başlatan 424 tag'ler de AliExpress'ten geldi, yani sana pazar yerlerinden uzak dur demeyeceğim. Bir şey yazmadan önce gelen ürünü uygulamayla kontrol et.

---

## Bütün katalog tek tabloda

Her çip için bir satır. "Kullanıcı baytı" yazabileceğin miktar; DESFire için NXP'nin verdiği kullanılabilir rakam. Telefon sütunları her uygulamanın ne yaptığını değil, platformun ne yapabildiğini söylüyor; NFC.cool sütunu ise benim uygulamamın ne yaptığını. Telefonda tabloyu yana kaydır; ilk sütun yerinde kalır.

<div class="table-scroll sticky-first">

| Çip | Üretici | Forum tipi | Standart | Kullanıcı baytı | UID | Koruma | Dayanıklılık / saklama | iPhone | Android | NFC.cool | En uygun kullanım |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 210µ | NXP | 2 | 14443-A | 48 | 7 | kilit bitleri | 100k / 10 yıl | NDEF, ham | NDEF, ham | okuma, yazma | minik tek kullanımlıklar |
| NTAG210 | NXP | 2 | 14443-A | 48 | 7 | parola | 100k / 10 yıl | NDEF, ham | NDEF, ham | okuma, yazma | küçük antenler |
| NTAG212 | NXP | 2 | 14443-A | 128 | 7 | parola | 100k / 10 yıl | NDEF, ham | NDEF, ham | okuma, yazma | daha fazla yer isteyen küçük antenler |
| NTAG213 | NXP | 2 | 14443-A | 144 | 7 | parola, sayaç, ayna | 100k / 10 yıl | NDEF, ham | NDEF, ham | her şey | varsayılan etiket |
| NTAG215 | NXP | 2 | 14443-A | 504 | 7 | parola, sayaç, ayna | 100k / 10 yıl | NDEF, ham | NDEF, ham | her şey, Amiibo | Amiibo, orta boy içerikler |
| NTAG216 | NXP | 2 | 14443-A | 888 | 7 | parola, sayaç, ayna | 100k / 10 yıl | NDEF, ham | NDEF, ham | her şey | kişi kartları, güvenli seçim |
| NTAG213F, 216F | NXP | 2 | 14443-A | 144, 888 | 7 | parola, alan algılama pini | 100k / 10 yıl | 213 gibi | 213 gibi | 213 gibi | elektroniğe gömülü tag'ler |
| NTAG 213 TT | NXP | 2 | 14443-A | 144 | 7 | parola, kurcalama teli | 100k / 10 yıl | 213 gibi | 213 gibi | 213 gibi | mühürler |
| NTAG203 | NXP | 2 | 14443-A | 144 | 7 | kilit, OTP | 10k / 5 yıl | NDEF | NDEF | okuma, yazma, parola | eski stok |
| NTAG I2C plus | NXP | 2 | 14443-A | 888, 1912 | 7 | parola | 200k-500k / 20 yıl | NDEF, ham | NDEF, ham | tanımlama, okuma, yazma | mikrodenetleyicili elektronik |
| NTAG 223, 224 DNA | NXP | 2 | 14443-A | 144, 208 | 7 | parola ya da AES, SUN | 100k / 10 yıl | NDEF, ham | NDEF, ham | Tip 2 gibi | ucuz orijinallik kanıtı |
| NTAG 22x DNA StatusDetect | NXP | 2 | 14443-A | 144, 208 | 7 | yukarıdaki gibi, sensör | 100k / 10 yıl | NDEF, ham | NDEF, ham | Tip 2 gibi | mühür ve algılama |
| NTAG 413 DNA | NXP | 4 | 14443-4 | 160 | 7 | 3 AES anahtarı, SUN | 200k / 50 yıl | NDEF, APDU | NDEF, APDU | tanımlama | üretimi durdu |
| NTAG 424 DNA | NXP | 4 | 14443-4 | 416 | 7 | 5 AES anahtarı, SUN, LRP | 200k / 50 yıl | NDEF, APDU | NDEF, APDU | tam yapılandırma | orijinallik kanıtı |
| NTAG 424 DNA TT | NXP | 4 | 14443-4 | 416 | 7 | yukarıdaki gibi, kurcalama | 200k / 50 yıl | NDEF, APDU | NDEF, APDU | tam yapılandırma | orijinallik mühürleri |
| Ultralight | NXP | 2 | 14443-A | 48 | 7 | kilit, OTP | 10k / 5 yıl | NDEF | NDEF | okuma, yazma | üretimi durdu |
| Ultralight C | NXP | 2 | 14443-A | 144 | 7 | 3DES | 100k / 10 yıl | NDEF, ham | NDEF, ham | okuma, yazma | eski biletler |
| Ultralight EV1 | NXP | 2 | 14443-A | 48, 128 | 7 | parola, 3 sayaç | 100k / 10 yıl | NDEF, ham | NDEF, ham | okuma, yazma, parola | biletler, tek kullanımlıklar |
| Ultralight AES | NXP | 2 | 14443-A | 144 | 7 | AES-128 | 100k / 10 yıl | NDEF, ham | NDEF, ham | okuma, yazma | kimlik doğrulamalı Tip 2 |
| Ultralight Nano | NXP | 2 | 14443-A | 40 | 7 | kilit, OTP | 100k / 10 yıl | NDEF | NDEF | okuma, yazma | tek yolculuk biletleri |
| Classic Mini | NXP | yok | 14443-A | 224 | 4 | CRYPTO1 | 100k / 10 yıl | UID | denetleyiciye bağlı | Android: okuma, biçimlendirme | hiçbir şey |
| Classic 1K, EV1 | NXP | yok | 14443-A | 752 | 4 ya da 7 | CRYPTO1 | 100k / 10 yıl | UID | denetleyiciye bağlı | Android: okuma, biçimlendirme | hiçbir şey |
| Classic 4K, EV1 | NXP | yok | 14443-A | 3440 | 4 ya da 7 | CRYPTO1 | 100k / 10 yıl | UID | denetleyiciye bağlı | Android: okuma, biçimlendirme | hiçbir şey |
| Plus SE | NXP | yok | 14443-A | 752 | 4 ya da 7 | SL3'te AES | 100k / 10 yıl | UID | Classic gibi | tanımlama | Classic'ten geçiş |
| Plus EV2 | NXP | yok | SL3'te 14443-4 | 1520, 3440 | 4 ya da 7 | AES-128, EAL5+ | 200k / 25 yıl | ISO-DEP | IsoDep | tanımlama | geçiş kontrolü |
| DESFire EV1 | NXP | 4 | 14443-4 | 2304-7936 | 7 | DES, 3DES, AES | 200k / 10 yıl | NDEF, APDU | NDEF, APDU | tanımlama, dosya listeleme | eski ulaşım sistemleri |
| DESFire EV2 | NXP | 4 | 14443-4 | 2560-16384 | 7 | AES, EAL5+ | 200k / 25 yıl | NDEF, APDU | NDEF, APDU | tanımlama, dosya listeleme | geçiş kontrolü |
| DESFire EV3 | NXP | 4 | 14443-4 | 2560-16384 | 7 | AES, SUN, EAL5+ | en az 200k, tipik 1M / 25 yıl | NDEF, APDU | NDEF, APDU | tanımlama, dosya listeleme | geçiş kontrolü, ulaşım |
| DESFire Light | NXP | 4 | 14443-4 | 640 | 7 | AES, LRP, EAL4 | 200k / 10 yıl | NDEF, APDU | NDEF, APDU | tanımlama | tek uygulamalı kartlar |
| ICODE SLI | NXP | 5 | 15693 | 112 | 8 | kilit | 100k / 10 yıl | NDEF, ham | NfcV | okuma, yazma, biçimlendirme | üretimi bitti |
| ICODE SLI-S, SLI-L | NXP | 5 | 15693 | 160, 32 | 8 | parolalar | 100k / 10 yıl | NDEF, ham | NfcV | okuma, yazma, biçimlendirme | artık üretilmiyor |
| ICODE SLIX | NXP | 5 | 15693 | 112 | 8 | EAS/AFI parolası | 100k / 50 yıl | NDEF, ham | NfcV | okuma, yazma, biçimlendirme | kütüphane ve lojistik stoku |
| ICODE SLIX-S, SLIX-L | NXP | 5 | 15693 | 160, 32 | 8 | parolalar, gizlilik | 100k / 50 yıl | NDEF, ham | NfcV | okuma, yazma, biçimlendirme | lojistik |
| ICODE SLIX2 | NXP | 5 | 15693 | 316 | 8 | parolalar, gizlilik, sayaç, imza | 100k / 50 yıl | NDEF, ham | NfcV | okuma, yazma, biçimlendirme | envanter, OpenPrintTag makaraları |
| ICODE DNA | NXP | 5 | 15693 | 252 | 8 | AES-128 | 100k / 50 yıl | NDEF, ham | NfcV | ISO 15693 olarak okur | uzaktan marka koruma |
| ICODE 3 | NXP | 5 | 15693 | 300 | 8 | parolalar, okutma sayacı, ayna, imza | 100k / 50 yıl | NDEF, ham | NfcV | ISO 15693 olarak okur | güncel envanter çipi |
| NTAG 5 | NXP | 5 | 15693 | 512, 2048 | 8 | parolalar, 5332'de AES | 1M / 40 yıl | NDEF, ham | NfcV | ISO 15693 olarak okur | bağlantılı elektronik |
| ST25TN512, 01K | ST | 2 | 14443-A | 64, 160 | 7 | kill, okutma kodu, TruST25 | 100k / 40 yıl | NDEF, ham | NDEF, ham | Tip 2 olarak okur | NTAG213 alternatifi |
| ST25TV512C, 02KC | ST | 5 | 15693 | 64, 320 | 8 | parolalar, kill, gizlilik, okutma kodu, TruST25 | 100k / 60 yıl | NDEF, ham | NfcV | ST25TV olarak tanımlama, okuma, yazma | her okutmada taze URL veren etiketler |
| ST25TV16K, 64K | ST | 5 | 15693 | 2048, 8192 | 8 | 64 bitlik parolalar, kill | 1M / 40 yıl | NDEF, ham | NfcV | okuma, yazma | büyük Tip 5 depolama |
| ST25DV04K - 64K | ST | 5 | 15693 | 512-8192 | 8 | 64 bitlik parolalar | 1M / 40 yıl | NDEF, ham | NfcV | ST25DV olarak tanımlama, okuma, yazma | mikrodenetleyicili dinamik tag'ler |
| M24LR | ST | iddia edilmiyor | 15693 | 512-8192 | 8 | 32 bitlik parolalar | 1M / 40 yıl | NDEF, ham | NfcV | ST25TV olarak okur | eski çift arayüz |
| ST25TA02K, 02KB | ST | 4 | 14443-4 | 256 | 7 | 128 bitlik parolalar, sayaç, B'de TruST25 | 1M / 200 yıl | NDEF, APDU | NDEF, APDU | okuma, yazma | DESFire'sız Tip 4 |
| ST25TA16K, 64K | ST | 4 | 14443-4 | 2048, 8192 | 7 | 128 bitlik parolalar | 1M / 200 yıl | NDEF, APDU | NDEF, APDU | okuma, yazma | büyük Tip 4 depolama |
| TI Tag-it HF-I Standard, Pro, Plus | TI | iddia edilmiyor | 15693 | 32, 32, 256 | 8 | kilit; Pro parolalı yazma ve kill ekler | 100k / 10 yıl | NDEF, ham | NfcV | tanımlama, okuma | eski kütüphaneler |
| EM4233 | EM | iddia edilmiyor | 15693 | 208 | 8 | 96 bitlik anahtar, gizlilik, imha | ? / 60 yıl | NDEF, ham | NfcV | tanımlama, okuma | talep üzerine |
| EM4425 em echo-V | EM | 5 | 15693 artı UHF | 256'ya kadar | 8 | AES-128, parolalar, kurcalama | 100k / 50 yıl | NDEF, ham | NfcV | ISO 15693 olarak okur | çift frekanslı perakende |
| Infineon my-d move | Infineon | 2 | 14443-A | 128 | 7 | parola, değer sayacı | 100k / 10 yıl | NDEF, ham | NDEF, ham | tanımlama, okuma | biletleme |
| Fudan FM11NT021 | Fudan | 2 | 14443-A | 144 | 7 | parola, sayaç | 500k (iddia) / 10 yıl | NDEF, ham | NDEF, ham | genel bir Tip 2 olarak okur | ucuz bağlantı etiketleri |
| Fudan FM11RF08, 08S | Fudan | yok | 14443-A | 752 | 4 | CRYPTO1, arka kapılı | ? | UID | denetleyiciye bağlı | Classic gibi | hiçbir şey |
| Topaz 96, 512 | Innovision, Broadcom | 1 | 14443-A | 96, yaklaşık 480 | 7 | tek seferlik kilitler | 10k / 5 yıl | NDEF | NDEF | NDEF | eski sistemler |
| FeliCa Lite-S | Sony | 3 | 18092, JIS X 6319-4 | 224 | 8 (IDm) | 3DES MAC | ? | NDEF, ham | NfcF | okuma, yazma | Japonya |
| FeliCa Standard | Sony | 3 | 18092 | 4 kB | 8 | AES, EAL6+ | ? | NDEF, ham | NfcF | okuma, markalar | ulaşım ve e-para |
| Kovio NFC Barcode | Kovio, Thinfilm | yok | tescilli | 16, salt okunur | yok | yok | geçerli değil | hayır | NfcBarcode | hayır | tarihe karıştı |
| ST SRI512, SRT512, SRI4K | ST | yok | 14443-B | 64, 512 | 8 | sayaçlar, kilit | 1M / 40 yıl | hayır | NfcB | hayır | Type B ulaşım kartları |

</div>

---

## En çok aranan karşılaştırmalar

**NTAG213 vs NTAG215 vs NTAG216.** Üç bellek boyutunda aynı çip: 144, 504 ve 888 bayt; parola, sayaç, ayna ve imza aynı. Bağlantı için 213'ü, Amiibo için 215'i, kişi kartı için ya da hiç kafa yormamak için 216'yı al. Fiyat farkı otuz sent civarında.

**NTAG213 vs Ultralight EV1.** Hava arayüzü ve komutlar aynı. NTAG'de ASCII aynası ve önceden yazılmış yetenek kapsayıcısı var; EV1'de üç tek yönlü sayaç var ve 48 ya da 128 baytlık seçeneklerle geliyor. Etiketlere NTAG, biletlere EV1 yakışır.

**NTAG213 vs ST25TN01K vs Fudan FM11NT021.** 144 ile 160 bayt arasında üç Tip 2 çip. NTAG'de parola ve okuma sayacı var ve GET_VERSION'a yanıt veriyor; ST25TN'de daha fazla bellek, kill komutu, okutma kodu ve TruST25 var ama parola yok; Fudan ise GET_VERSION dışında ve güncel veri sayfasına bakılırsa imza dışında NTAG'in özelliklerini kopyalıyor. Düz bir bağlantı için herhangi biri olur; sayaç ya da Amiibo için NTAG.

**MIFARE Classic vs DESFire.** Yarış bile değil. Classic'in şifresi 2008'de kırıldı ve en yaygın klonunun 2024'te arka kapılı olduğu ortaya çıktı; DESFire EV3'te ise AES, anahtar yönetimi, EAL5+ sertifikası ve SUN var. Classic'ten yana tek argüman, duvardaki okuyucunun 2009'da takılmış olması.

**NTAG 424 DNA vs NTAG213.** 424 her okutmayı AES-128 ile imzalıyor ve beş anahtarla üç dosyada 416 bayt saklıyor; 213 ise 32 bitlik parolayla 144 bayt saklıyor. Soru "bu ürün gerçek mi" ise ona yalnızca 424 yanıt verebilir. Soru "bu etiket bir bağlantı açar mı" ise 213 bunu üçte bir fiyatına yapar.

**NTAG 424 DNA vs NTAG 223 DNA.** İkisi de SUN yapıyor. 424; beş anahtar, LRP, rastgele UID seçeneği, kasa dosyası ve 50 yıl veri saklama süresine sahip bir Tip 4 çip. 223 ise tek SUN anahtarı, 32 bitlik parolası ve 10 yılıyla bir Tip 2 etiket. Bir etikete imzalı URL koymanın daha ucuz yolu 223; bugün yapılandırabilen bir uygulaması olan ise 424.

**Envanter için ICODE SLIX2 vs NTAG216.** Tek okuyucu telefonsa NTAG216'da daha fazla bellek ve sayaç var. İşin içinde bir geçiş kapısı ya da el terminali varsa SLIX2 bir metreden, NTAG ise dört santimetreden okunur ve kararı bu verir.

**Japonya'da FeliCa vs NTAG.** Japonya'daki ulaşım turnikesi FeliCa'dan başka bir şey konuşmaz; Japon telefonları ise ikisini de okur. Tokyo'da bir posterdeki tag için NTAG yeter. Suica okuyucusunun kabul etmesi gereken her şey için FeliCa gerekir ve bu, telefon uygulamasıyla programlayabileceğin bir çip değil.

---

## Sık sorulan sorular

### NTAG215 mi almalıyım, NTAG216 mı?

Amiibo yazmıyorsan 216. 215'in 504 baytına karşı 888 bayt sunuyor; parola, sayaç, ayna ve telefon desteği aynı. 215 her mağazada var, çünkü Nintendo'nun figürleri onu kullanıyor; işin buysa tek seçenek de o.

### iPhone, MIFARE Classic tag'leri okuyabilir mi?

Orada bir tane olduğunu görebilir. Core NFC, UID'yi ve SAK'ı okur ve durur; Apple'ın API'sinde Classic ailesi yok ve belgeleri MIFARE komutunun "Crypto1 protokolünü desteklemediğini" söylüyor. iPhone'da hiçbir uygulama bir sektörü okuyamaz. NXP NFC denetleyicili Android telefonlar okuyabilir; başka bazı denetleyicilere sahip telefonlar okuyamaz ve onlarda `MifareClassic` sınıfı hiç görünmez.

### NFC tag'e kaç kez yeniden yazabilirim?

NXP'nin ya da ST'nin güncel her çipinde oda sıcaklığında 100.000 kez ve veri sayfası rakamları alt sınırdır. DESFire EV3 ya da ST25DV bir milyon döngü için derecelendirilmiş. Eski NTAG203, orijinal Ultralight ve Topaz ise 10.000 içindi. Kimse bir etiketi on bin kez yeniden yazmaz; bu rakam sayaçlar ve kayıt tutan tag'ler için önemli.

### NFC tag ne kadar uzaktan çalışır?

Telefonla, telefonun doğru noktasında, kart boyutunda bir anten için yaklaşık dört santimetreye, küçük bir etiket için yaklaşık ikiye kadar. NFC Forum'un kendi tanımı "2 cm'ye kadar" diyor. Büyük antenli bir kapı okuyucusunda ISO 15693 tag bir metreden çalışır, ama telefon onu da her şey gibi birkaç santimetreden okur; belki Tip 2 tag'in iki katı mesafeden.

### NFC tag'lerin ömrü dolar mı, yıpranırlar mı?

Çipteki veri çoğu tüketici çipinde 10 yıl, NTAG 424 DNA ve ICODE SLIX ailesinde 50, ST25TV'de 60, ST25TA'da 200 yıl için derecelendirilmiş; hepsi oda sıcaklığında. Isı bu süreyi kısaltır. Pratikte yapışkan, kağıt yüzey ve anten EEPROM'dan çok önce pes eder.

### Pazar yerlerinden ucuz NFC tag almak güvenli mi?

Güvenli, evet; iddia ettikleri gibi olmaları ise her zaman değil. Ucuz bir "NTAG213" çoğu zaman bir Fudan FM11NT021'dir; bağlantı için çalışır, GET_VERSION soran her şeyde başarısız olur. Ucuz bir "NTAG215" çoğu zaman NTAG215 değildir ve Amiibo onu reddeder. Bir şey yazmadan önce uygulamada üretici kodunu ve çip adını kontrol et, çipin adını açıkça veren bir mağazadan al.

### Telefonum NFC uygulamasıyla banka kartımı ya da pasaportumu okuyabilir mi?

Pasaportu evet: makine tarafından okunabilir bölgeyi anahtar olarak kullanan bir uygulama çipin veri gruplarını okuyabilir ve NFC.cool bunu iki platformda da yapıyor. Banka kartı ise bir EMV akıllı kart. Uygulama onun uygulama listesini ve bazı herkese açık kayıtlarını okuyabilir, ama Apple, Core NFC'de ödeme kartı okumayı engelliyor, kartın güvenlik kodu çipte değil ve her işlem karttan hiç çıkmayan bir anahtarla imzalanıyor. Yani kopyalanacak bir şey yok.

### Ofis kartım ya da otel anahtarım uygulamada neden görünmüyor?

Ofis kartlarının çoğu 125 kHz yakınlık kartıdır ve telefonun 13,56 MHz bobini onları algılayamaz bile. Otel anahtarlarının ve eski ulaşım kartlarının çoğu ise MIFARE Classic'tir; iPhone onu yalnızca tanımlayabilir, Android telefon da ancak doğru denetleyici ve doğru anahtarlarla okuyabilir. İkisi de bir uygulamanın düzeltebileceği şey değil ve sana geçici bir çözüm satmaktansa bunu söylemeyi tercih ederim.

### Salt okunur yapılmış bir NFC tag'in kilidi açılabilir mi?

Hayır. Tip 2 ya da Tip 5 tag'deki kilit bitleri, çipin içindeki tek yönlü bitlerdir; yetenek kapsayıcısındaki salt okunur bayrağı da öyle. Parolayı biliyorsan onu kaldırabilirsin; kilidi kaldıramazsın. NFC.cool'un bir şeyi kilitlemeden önce iki kez sormasının nedeni bu.

### NTAG parolası gerçek güvenlik sağlar mı?

Ücretsiz uygulaması olan kişiyi, yani çoğu insanı durdurur. Trafiği dinleyebilen bir okuyucusu olan kimseyi durdurmaz, çünkü 32 bitlik parola havadan şifrelenmeden geçer ve tag 16 bitlik bir onayla yanıt verir. Kararlı bir saldırgana dayanması gereken her şey için merdiven AES'te başlar: Tip 2 etiket için Ultralight AES, okutmanın kendisinin bir şey kanıtlaması gerekiyorsa NTAG 424 DNA.

### Amiibo için hangi tag gerekir?

NTAG215 ve yalnızca NTAG215. Konsol GET_VERSION soruyor, UID'den türetilen bir parolayla kimlik doğruluyor ve 135 sayfanın tamamını okuyor. GET_VERSION'ı olmayan ya da sayfa sayısı farklı olan çip ilk komutta takılır. Bir tag'e Amiibo yazmak kalıcıdır, çünkü kilit baytları ve parola biçimin parçası.

### Metal yüzeyde hangi NFC tag çalışır?

Metal üstü form faktöründeki herhangi bir çip; yani anten ile metal arasında ferrit tabaka olan. Çeliğe yapıştırılmış normal bir tag hiç okunmaz; metal üstü tag ise normal menzilinin kabaca beşte dördünden okunur. Normal bir tag ile metal arasına metal olmayan herhangi bir malzemeden üç milimetre koyabiliyorsan o da işe yarar.

### NFC.cool iPad ve Mac'te çalışıyor mu?

Evet, 6.15.0 sürümünden beri, USB akıllı kart okuyucuyla; iki cihazın da kendi NFC radyosu yok. Test ettiğim model HID OMNIKEY 5022 CL; ACS ACR1552U ve ACR1255U-J1'in de çalıştığı bildirildi. Telefonla Tip 2, Tip 4 ve FeliCa üzerinde çalışan her şey okuyucuyla da çalışıyor; MIFARE Classic ise yalnızca okunabiliyor.

---

## Terimler sözlüğü

| Terim | Anlamı |
| --- | --- |
| AFI | Application Family Identifier; ISO 15693 tag'lerde okuyucunun yalnızca tek bir türdeki tag'leri saymasını sağlayan bayt |
| APDU | Application Protocol Data Unit; her ISO-DEP çipinin kullandığı, ISO 7816-4'ün komut ve yanıt biçimi |
| ATQA | Answer To Request; Type A çipin gönderdiği ilk iki bayt; NXP çiplerin buna göre tanımlanmamasını söylüyor |
| AUTH0 | parola gerektiren ilk sayfayı belirten NTAG yapılandırma baytı |
| AUTHLIM | seçilen sayıda başarısız parola denemesinden sonra tag'i kilitleyen NTAG ayarı |
| CC | Capability Container (yetenek kapsayıcısı); okuyucuya tag'in NDEF tuttuğunu ve ne kadar tuttuğunu söyleyen dört bayt (Tip 4'te bir dosya) |
| CMAC | AES ile hesaplanan mesaj doğrulama kodu; SUN mesajını taklit edilemez kılan şey |
| CRYPTO1 | NXP'nin MIFARE Classic'te kullandığı tescilli 48 bitlik akış şifresi; 2008'de kırıldı |
| DSFID | Data Storage Format Identifier; belleğin nasıl düzenlendiğini anlatan ISO 15693 baytı |
| EAS | Electronic Article Surveillance; ISO 15693 tag'lerde mağaza kapısının alarm vermesini sağlayan bit |
| GET_VERSION | çipin üreticisini, tipini, neslini ve boyutunu tanımlayan sekiz bayt döndüren NXP komutu |
| ISO-DEP | ISO/IEC 14443-4 taşıma protokolü; onu konuşan çip SAK 20 yanıtı verir ve APDU kabul eder |
| Yük modülasyonu | pasif tag'in veri gönderme yolu: anteni üzerindeki bir yükü açıp kapatır, okuyucu da bunu kendi alanında hisseder |
| LRP | Leakage Resilient Primitive; NTAG 424 DNA ve DESFire Light'ta yan kanal saldırılarına dayanıklı bir AES modu |
| MAD | MIFARE Application Directory; Classic kartın 0. sektörü, diğer sektörlerde ne olduğunu listeler |
| Ayna (mirror) | UID'yi ve sayacı her okumada ASCII olarak NDEF mesajına yapıştıran NTAG özelliği |
| NDEF | NFC Data Exchange Format; her telefonun okuduğu kayıt kapsayıcısı |
| NUID | Non-Unique Identifier; NXP'nin 4 baytlık UID için kullandığı ad |
| OTP | One Time Programmable; bir kez ayarlanıp asla geri alınamayan bitler |
| PACK | Password Acknowledge; doğru paroladan sonra NTAG'in döndürdüğü iki bayt |
| PICC, PCD | standartların kart ve okuyucu için kullandığı adlar |
| Random ID | gizlilik için çipin çakışma önleme sırasında her seferinde yeni, rastgele 4 baytlık bir kimlikle yanıt verdiği mod |
| READ_SIG | çipin orijinallik imzasını döndüren komut |
| SAK | Select Acknowledge; Type A çipin seçildikten sonra döndürdüğü bayt; bitleri çipleri ailelere ayırır |
| SDM | Secure Dynamic Messaging; SUN'ın arkasındaki NTAG 424 DNA ve DESFire EV3 mekanizması |
| SUN | Secure Unique NFC; her okutmada taze bir kriptografik kanıt taşıyan URL |
| T5T, T2T, T4T | NFC Forum'un Tip 5, Tip 2 ve Tip 4 tag'ler için kullandığı kısaltmalar |
| TLV | Tag-Length-Value; Tip 2 ve Tip 5 çiplerde NDEF mesajını saran çerçeve |
| TruST25 | ST'nin UID üzerindeki orijinallik imzası |
| UID | çipin fabrikada programlanan 4, 7 ya da 8 baytlık tanımlayıcısı |

---

## Kaynaklar ve ek okumalar

Bu rehberdeki her tablo bunlardan biriyle karşılaştırılarak kontrol edildi. Fiyatlar, satın alma bölümünde adı geçen mağazalardan 9 Eylül 2026'da alındı.

**NXP NTAG**

- [NTAG213/215/216 veri sayfası, Rev 3.2](https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf)
- [NTAG210/212](https://www.nxp.com/docs/en/data-sheet/NTAG210_212.pdf), [NTAG 210µ](https://www.nxp.com/docs/en/data-sheet/NT2L1001_NT2H1001.pdf), [NTAG213F/216F](https://www.nxp.com/docs/en/data-sheet/NTAG213F_216F.pdf) ve [NTAG 213 TT](https://www.nxp.com/docs/en/data-sheet/NT2H1311TT.pdf) veri sayfaları
- [NTAG 223 DNA](https://www.nxp.com/docs/en/data-sheet/NT2H2331G0.pdf) ve [NTAG 224 DNA StatusDetect](https://www.nxp.com/docs/en/data-sheet/NT2H2421S0.pdf) veri sayfaları
- [NTAG 424 DNA](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf) ve [NTAG 424 DNA TagTamper](https://www.nxp.com/docs/en/data-sheet/NT4H2421Tx.pdf) veri sayfaları ile [AN12196, orijinallik açık anahtarını da içeren 424 özellikler ve ipuçları notu](https://www.nxp.com/docs/en/application-note/AN12196.pdf)
- [NTAG I2C plus](https://www.nxp.com/docs/en/data-sheet/NT3H2111_2211.pdf) ve [NTAG 5 boost](https://www.nxp.com/docs/en/data-sheet/NTA5332.pdf) veri sayfaları
- [AN13089, NTAG 21x özellikler ve ipuçları](https://www.puntoflotante.net/AN13089.pdf); statik bir orijinallik imzasının neden klonlamaya karşı güvence olmadığını anlatıyor (ayna kopya; nxp.com'daki kopya herkese açık değil)

**NXP MIFARE**

- [MIFARE Ultralight](https://www.nxp.com/docs/en/data-sheet/MF0ICU1.pdf), [Ultralight C](https://www.nxp.com/docs/en/data-sheet/MF0ICU2.pdf), [Ultralight EV1](https://www.nxp.com/docs/en/data-sheet/MF0ULX1.pdf) ve [Ultralight AES](https://www.nxp.com/docs/en/data-sheet/MF0AES(H)20.pdf) veri sayfaları
- [MIFARE Classic EV1 1K](https://www.nxp.com/docs/en/data-sheet/MF1S50YYX_V1.pdf) ve [Classic EV1 4K](https://www.nxp.com/docs/en/data-sheet/MF1S70YYX_V1.pdf) veri sayfaları
- [MIFARE Plus S](https://www.nxp.com/docs/en/data-sheet/MF1SPLUSX0Y1_SDS.pdf), [Plus SE](https://www.nxp.com/docs/en/data-sheet/MF1SEP_H_10X1_SDS.pdf) ve [Plus EV2](https://www.nxp.com/docs/en/data-sheet/MF1P(H)x2.pdf) kısa veri sayfaları
- [DESFire EV1](https://www.nxp.com/docs/en/data-sheet/MF3ICDX21_41_81_SDS.pdf), [DESFire EV2](https://www.nxp.com/docs/en/data-sheet/MF3DX2_MF3DHX2_SDS.pdf), [DESFire EV3](https://www.nxp.com/docs/en/data-sheet/MF3D_H_X3_SDS.pdf) ve [DESFire Light](https://www.nxp.com/docs/en/data-sheet/MF2DLHX0.pdf) veri sayfaları ile [kullanılabilir DESFire belleği üzerine AN12752](https://www.nxp.com/docs/en/application-note/AN12752.pdf)
- [AN10833, MIFARE tip tanımlama](https://www.nxp.com/docs/en/application-note/AN10833.pdf), [AN10927, MIFARE UID'leri](https://www.nxp.com/docs/en/application-note/AN10927.pdf), [AN1305, MIFARE Classic üzerinde NDEF](https://www.nxp.com/docs/en/application-note/AN1305.pdf), [AN10787, MIFARE Application Directory](https://www.nxp.com/docs/en/application-note/AN10787.pdf), [AN11004, Tip 4 tag olarak DESFire](https://www.nxp.com/docs/en/application-note/AN11004.pdf)

**NXP ICODE**

- [ICODE SLIX](https://www.nxp.com/docs/en/data-sheet/SL2S2002_SL2S2102.pdf), [SLIX-S](https://www.nxp.com/docs/en/data-sheet/SL2S5302_SL2S5402.pdf), [SLIX-L](https://www.nxp.com/docs/en/data-sheet/SL2S5002_SL2S5102.pdf), [SLIX2](https://www.nxp.com/docs/en/data-sheet/SL2S2602.pdf), [ICODE DNA](https://www.nxp.com/docs/en/data-sheet/SL2S6002_SDS.pdf) ve [ICODE 3](https://www.nxp.com/docs/en/data-sheet/SL2S3003_SL2S3003TT.pdf) veri sayfaları
- [AN11809, ICODE ailesi karşılaştırması](https://www.nxp.com/docs/en/application-note/AN11809.pdf)

**STMicroelectronics, TI, EM, Sony, Fudan**

- ST [ST25TV02KC](https://www.st.com/resource/en/datasheet/st25tv02kc.pdf), [ST25TN01K](https://www.st.com/resource/en/datasheet/st25tn01k.pdf), [ST25DV64KC](https://www.st.com/resource/en/datasheet/st25dv64kc.pdf), [ST25TA02KB](https://www.st.com/resource/en/datasheet/st25ta02kb.pdf) ve [M24LR64E-R](https://www.st.com/resource/en/datasheet/m24lr64e-r.pdf) veri sayfaları, [Augmented NDEF üzerine AN5658](https://www.st.com/resource/en/application_note/an5658-augmented-ndef-messages-with-st25tv512c-and-st25tv02kc-devices-stmicroelectronics.pdf) ve [TruST25 üzerine TA0358](https://www.st.com/resource/en/technical_article/ta0358-developing-supply-chain-confidence-with-trust25-digital-signature-in-rfidnfc-tags-stmicroelectronics.pdf)
- TI Tag-it HF-I [Standard](https://www.ti.com/lit/ds/scbs828c/scbs828c.pdf), [Pro](https://www.ti.com/lit/ds/scbs822c/scbs822c.pdf) ve [Plus](https://www.ti.com/lit/ds/scbs827b/scbs827b.pdf) veri sayfaları
- EM Microelectronic [EM4233](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em4233), [EM4423](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em-echo-em4423) ve [EM4425](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em-echo-v)
- Sony [FeliCa Lite-S veri sayfası](https://www.sony.co.jp/en/Products/felica/business/data/RC-S966_E.pdf) ve [FeliCa Standard RC-SA01](https://www.sony.co.jp/en/Products/felica/business/products/RC-SA01.html)
- [Fudan FM11NT021 veri sayfası](https://github.com/user-attachments/files/16667599/FM11NT021_sds_eng.pdf)

**Güvenlik araştırmaları ve standartlar**

- Quarkslab, [MIFARE Classic: exposing the static encrypted nonce variant and a few hardware backdoors](https://blog.quarkslab.com/mifare-classic-static-encrypted-nonce-and-backdoors.html) (2024)
- Nohl, Evans, Starbug ve Plötz, [Reverse-Engineering a Cryptographic RFID Tag](https://www.usenix.org/legacy/event/sec08/tech/full_papers/nohl/nohl.pdf) (USENIX Security 2008)
- Garcia ve diğerleri, [Dismantling MIFARE Classic](https://link.springer.com/chapter/10.1007/978-3-540-88313-5_7) (ESORICS 2008)
- [ISO/IEC JTC1/SC17 Standing Document 5, entegre devre üreticileri kaydı](https://www.aimglobal.org/wp-content/uploads/2022/04/ISO_IEC_JTC1_SC17_Standing_Document_5_Register_of_IC_Manufacturers.pdf)
- [Proxmark3 magic kart notları](https://github.com/RfidResearchGroup/proxmark3/blob/master/doc/magic_cards_notes.md) ve [3dbrew'de Amiibo tag yerleşimi](https://www.3dbrew.org/wiki/Amiibo)
- NFC Forum: [teknoloji hakkında](https://nfc-forum.org/learn/nfc-technology/) ve [Tip 2 tag spesifikasyonu](https://nfc-forum.org/build/specifications/type-2-tag-specification/)

**Telefonlar ve okuyucular**

- Apple [Core NFC](https://developer.apple.com/documentation/corenfc), [arka planda tag okuma](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading), [CRYPTO1'i dışarıda bırakan MIFARE komutu](https://developer.apple.com/documentation/corenfc/nfcmifaretag/sendmifarecommand(commandpacket:completionhandler:)) ve [WWDC 2019 oturumu 715](https://developer.apple.com/videos/play/wwdc2019/715/)
- Android [MifareClassic](https://developer.android.com/reference/android/nfc/tech/MifareClassic), [gelişmiş NFC rehberi](https://developer.android.com/develop/connectivity/nfc/advanced-nfc) ve [Chrome'da Web NFC](https://developer.chrome.com/docs/capabilities/nfc)
- Okuyucular: [ACS ACR122U](https://www.acs.com.hk/download-manual/418/TSP-ACR122U-3.06.pdf), [HID OMNIKEY 5022 CL](https://www.hidglobal.com/doclib/files/resource_files/eat-omnikey-5022-usb-reader-ds-en.pdf), [NXP PN532](https://www.nxp.com/docs/en/nxp/data-sheets/PN532_C1.pdf), [Proxmark3](https://github.com/RfidResearchGroup/proxmark3), [Flipper Zero](https://docs.flipper.net/nfc) ve [Chameleon Ultra](https://github.com/RfidResearchGroup/ChameleonUltraDocs)
- Antenler ve ferrit: [TI SLOA241](https://www.ti.com/lit/an/sloa241b/sloa241b.pdf) ve [Würth ANP022](https://www.mouser.com/pdfdocs/Selection_and_Characteristics_of_WEFSFS_APPNOTE.PDF)

---

## Toparlarsak

Çipi işe göre seç. Bağlantı için NTAG213, emin değilsen NTAG216, Amiibo için NTAG215, okutmanın bir şey kanıtlaması gerekiyorsa NTAG 424 DNA, bir geçiş kapısının okuması gerekiyorsa ICODE SLIX2 ya da ICODE 3, bir kapının ona güvenmesi gerekiyorsa DESFire EV3 ve MIFARE Classic rafından hiçbir şey. Bu rehberdeki geri kalan her şey o cümlenin gerekçesi; tablolar da bir daha asla bir ilanın sözüne güvenmek zorunda kalmaman için orada.

Bir tag'e yazmadan önce onun gerçekte ne olduğunu görmek istiyorsan, [NFC.cool Tools](/features/nfc-reader-writer/) her okutmada tam olarak bunu yapıyor: [iPhone'da](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ultimate-nfc-tag-guide-tr&mt=8), [Android'de](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ultimate-nfc-tag-guide-tr) ve okuyucu takılı bir iPad'de ya da Mac'te. Masanda uygulamanın yanlış adlandırdığı ya da hiç adlandıramadığı bir çip varsa bana yaz. O altmış çipin çoğu listeye böyle girdi.
