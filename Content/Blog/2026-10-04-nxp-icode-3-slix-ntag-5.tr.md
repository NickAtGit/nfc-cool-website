---
id: "nxp-icode-3-2026-10"
title: "ICODE 3, SLIX, ICODE DNA ve NTAG 5 artık iPhone'da NFC.cool ile çalışıyor"
date: "2026-10-04"
tags: ["announcements", "nfc-tags", "iphone"]
summary: "NFC.cool Tools 7.1.0 artık NXP ICODE'un dilinden anlıyor: ICODE 3, SLIX ailesi, ICODE DNA ve NTAG 5 tag'lerini iPhone'da, harici okuyucuyla da iPad ve Mac'te okuyor, doğruluyor ve yönetiyor. Kütüphanelerin ve mağazaların kullandığı bu çiplerin neler yapabildiğini ve az kalsın kendi kodumun bozuk olduğuna beni inandıran iOS tuhaflığını anlatıyorum."
image: "/assets/images/Blog/nxp-icode-3-slix-ntag-5.webp"
imageAlt: "Kapağının içinde RFID etiketi olan bir kütüphane kitabının yanında, NFC tag ayrıntılarını gösteren bir iPhone"
author: "Nicolo Stanciu"
metaTitle: "iPhone'da NXP ICODE 3 ve SLIX tag'leri okuyup yönet"
metaDescription: "NFC.cool artık iPhone'da NXP ICODE 3, SLIX, SLIX2, ICODE DNA ve NTAG 5 tag'lerini okuyup yönetiyor: parolalar, okutma sayacı, hırsızlık önleme bayrağı, gizlilik modu ve dahası."
ogTitle: "ICODE 3, SLIX ve NTAG 5 artık iPhone'da çalışıyor"
ogDescription: "NXP'nin kütüphane ve mağaza çipleri neler yapabiliyor ve NFC.cool onları iPhone, iPad ve Mac'te nasıl okuyup yönetiyor."
---

Masamda bir ICODE 3 tag duruyordu, iPhone'um da üstündeydi. Uygulama, çipin anlatacak neyi varsa hiç itirazsız okuyordu: kimlik numarasını, belleğini, okutma sayacını ve orijinal olduğunu kanıtlayan NXP imzasını. Sonra ondan tek bir şeyi, sayacı değiştirmesini istedim. Uygulama bana tag'in uzaklaştığını söyledi.

Tag yerinden kıpırdamamıştı. Tekrar denedim. Aynı mesaj. Bu sefer parola belirlemeyi denedim. Yine aynı mesaj.

Neler olduğuna birazdan döneceğim, çünkü bu yıl peşine düştüğüm en ilginç hata buydu. Ama önce şunu anlatayım: bir ICODE tag'iyle ne diye uğraşıyordum?

NFC.cool'un telefona yükleyebileceğin en yetenekli NFC uygulaması olmasını istiyorum. Bu yaz sıra [NTAG 424 DNA](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/) tag'lerdeydi; markalar bir ürünün orijinal olduğunu kanıtlamak için onları kullanıyor. Ardından uygulamanın hâlâ doğru dürüst anlaşamadığı en büyük çip ailesi kalmıştı: NXP'nin ICODE serisi. **NFC.cool Tools 7.1.0** ile artık onunla da anlaşıyor.

---

## ICODE: farkında olmadan elinde tuttuğun tag'ler

Son yirmi yılda kütüphaneden kitap ödünç aldıysan büyük ihtimalle elinden bir ICODE tag geçmiştir. Kapağın içine yapıştırılmış, sarmal antenli o yassı etiketten söz ediyorum. Aynı çipler mağazalardaki hırsızlık önleme etiketlerinde, çamaşırhane etiketlerinde ve ürün etiketlerinde de var.

Teknik olarak bunlar **ISO 15693** çipleri; NFC dünyasındaki adları **Tip 5**. Çoğu insanın satın aldığı NFC çıkartmaları, örneğin NTAG215, başka bir standarda dayanıyor. Bunu aynı frekansta yayın yapan iki radyo istasyonu gibi düşünüyorum: iPhone'un ikisini de çekiyor ama bağlantı kurulunca ikisi aynı dili konuşmuyor.

Kütüphanelerin ve mağazaların ICODE'u seçmesinin sebebi menzil. Kütüphane kapısındaki ya da self servis kasadaki büyük bir anten, bu çipleri sıradan bir NFC çıkartmasından daha uzaktan okuyabiliyor. Telefonla okutacaksan yine de iyice yaklaştırman gerekiyor, çünkü iPhone'unun anteni minicik; ama çip o kapılar için tasarlandı.

ICODE tag'deki bağlantıyı ya da metni okumak hiçbir zaman işin zor kısmı olmadı. Asıl ilginç şeyler bir alt katmanda: parolalar, sayaç, hırsızlık önleme bayrağı, gizlilik modu. Çipin bu tarafına NFC.cool şimdiye kadar el atamıyordu.

---

## NFC.cool'un ICODE 3 ile yapabildikleri

**ICODE 3**, NXP'nin bu ailedeki en yeni çipi ve ICODE SLIX2'nin yerini alıyor. İnternette sık sık "SLIX 3" adıyla satıldığını görürsün. NXP'nin bu adda bir çipi yok; yani bir ilanda SLIX 3 yazıyorsa o çip aslında ICODE 3.

Birini NFC.cool ile okut, uygulama her şeyi önüne sersin: hangi çip olduğu, belleği, sayacı ve çipin **Orijinal NXP** olup olmadığı. NXP her çipin kimlik numarasını fabrikada imzalıyor, uygulama da bu imzayı kontrol ediyor. Böylece aynı kimlik numarasını kullanan bir kopya bu imzayı taklit edemiyor.

Ardından çipin sunduğu neredeyse her şeyi değiştirebilirsin:

- **Okutma sayacı.** ICODE 3 her okumayı kendi kendine sayabiliyor. NFC yansıtmayı açarsan çip, kimlik numarasını ve güncel sayıyı kayıtlı bağlantının içine yazıyor; böylece her okutma, bir web sitesinin sayabileceği, biraz farklı bir adres açıyor. [NFC okutma sayacını](/blog/count-nfc-tag-scans/) anlattığım yazıyı okuduysan, bu aynı fikrin başka bir çipteki hali.
- **Parolalar.** ICODE 3'te altı parola var: okuma, yazma, gizlilik, imha, hırsızlık önleme ayarları ve yapılandırma için birer tane. Her tag aynı fabrika değerleriyle geliyor, yani bir koruma ancak kendi parolanı belirlediğinde anlam kazanıyor. NFC.cool parolalarını her tag için ayrı ayrı iCloud Anahtar Zinciri'nde saklıyor.
- **Bellek koruması.** Belleği iki parçaya bölüp her birini ayrı ayrı koruyabilirsin; örneğin herkese açık bağlantı okunabilir kalırken arkasında saklanan verileri gizlersin.
- **Hırsızlık önleme ve kütüphane ayarları.** Mağazada ya da kütüphanede kapıdaki alarmı öttüren şey EAS bayrağı. AFI baytını ise kütüphaneler bir kitabın ödünç verildiğini işaretlemek için kullanıyor. İkisini de değiştirip kilitleyebilirsin.
- **Gizlilik modu.** Biri gizlilik parolasını gönderene kadar tag, kimlik numarasını ve verilerini saklıyor.
- **Kurcalama tespiti.** SL2S3003TT sürümünün, şişe kapağının ya da kutu mührünün üzerinden geçirebileceğin bir teli var. Uygulama mührün hiç kırılıp kırılmadığını gösteriyor.
- **Kendi imzan.** Bir marka NXP'nin imzasının yerine kendi imzasını koyup kilitleyebiliyor.
- **İmha.** Ürünün ömrü bittiğinde gizliliği korumak için çipi temelli kapatıyor.

Bu ayarların birkaçı kalıcı, bazıları da tag'i iPhone'dan erişilemez hale getirebiliyor. Bu yüzden geri alınamayan her işlemden önce NFC.cool senden tag'in kimlik numarasının son dört karakterini yazmanı istiyor. Ayrıca işe başladığın tag'den başka bir tag'i değiştirmeyi reddediyor. Yine de ben olsam yeni bir şeyi önce yedek bir tag'de denerdim.

Bu arada küçük bir şeyi de düzelttim: artık boş bir ICODE tag'i uygulamadan NFC tag olarak biçimlendirebiliyorsun, böylece bağlantı ya da metin yazmaya hazır oluyor.

---

## Ailenin geri kalanı

Uygulama elindeki çipin hangisi olduğunu tanıyor ve yalnızca o çipin gerçekten yapabildiklerini sunuyor. Eski bir SLIX, ICODE 3'ten daha az seçenek gösteriyor; bunun tek sebebi çipin daha az özelliği olması.

- Çoğu kütüphanede işin yükünü **SLIX, SLIX-S, SLIX-L, SLIX2** ve daha eski **SLI** çipleri çekiyor. SLIX2'de sayaç ve bellek koruması var. SLIX-S belleğini sayfa sayfa koruyor ve 64 bit parolaları destekliyor; bu modda korumalı her erişim için hem okuma hem yazma parolası gerekiyor.
- **ICODE DNA** ailenin güvenlik odaklı üyesi. Çipten hiç çıkmayan gizli AES anahtarları taşıyor. Anahtarı NFC.cool'a girdiğinde uygulama, çipten bu anahtarın kendisinde olduğunu kanıtlamasını istiyor. Kimlik numarası ve belleği birebir aynı olsa bile kopya bu sınavı geçemiyor.
- Elektronikle uğraşmayı seven biri olarak beni en çok heyecanlandıran **NTAG 5**. Devre kartına yerleştirilmek için tasarlanmış bir NFC çipi. NTAG 5 **switch** pinleri doğrudan sürüyor; **link** ve **boost** ise I2C üzerinden bir mikrodenetleyiciyle konuşuyor. Yalnızca telefonunun NFC alanından aldıkları enerjiyle küçük bir devreyi besleyebiliyor, bir pin üzerinden olayları bildirebiliyor ve kartla 256 baytlık belleği paylaşabiliyorlar. NFC.cool bu ayarları okuyor ve değiştiriyor; NTP5332 ve NTA5332'de ise çipe bağlı sensörlerle doğrudan iPhone'undan konuşabiliyor bile.

Hepsini NFC araçlarında, NTAG 424 DNA'nın hemen yanında, **NXP ICODE ve NTAG 5** altında bulabilirsin. Ya da bir ICODE tag'i okut, uygulama ayrıntılarını kendiliğinden açsın.

---

## iOS'un düzeltmemi istemediği hata

Masama ve "uzaklaşan" o tag'e dönelim.

ISO 15693, telefona tag'le konuşmak için iki yol sunuyor. Birincisinde telefon her mesaja, zarfın üstüne alıcının adını yazar gibi tag'in kimlik numarasını ekliyor; böylece yalnızca o tag yanıt veriyor. İkincisinde önce tag'i **seçiyor**, tıpkı kalabalık bir odada yüzünü tek bir kişiye çevirmek gibi, sonra da her mesaja adres yazmadan konuşuyor.

Zarf yöntemi daha temiz, bu yüzden NFC.cool önce onu deniyordu. İşe yarayıp yaramadığını anlamak için uygulama, üstünde kimlik numarası olan kısa bir test mesajı gönderiyordu. Tag yanıt veriyordu; uygulama da adresli mesajların çalıştığına karar verip yoluna devam ediyordu.

Bilmediğim şey şuydu: iOS bu komutları iki gruba ayırıyor. Bir yanda her ISO 15693 çipinin anladığı standart komutlar var, öbür yanda NXP'nin kendi komutları, yani parolalar, sayaç ve yapılandırma için olanlar. Adresli bir mesaj NXP'nin kendi komutlarından birini taşıyorsa iOS onu göndermeyi reddediyor. Mesaj telefondan hiç çıkmıyor. iOS sessizce "geçersiz parametre" hatası döndürüyor. Benim kodumun gözündeyse bu hata, menzilden çıkmış bir tag'den farksızdı.

Benim test mesajım standart bir komuttu; bu yüzden hiç takılmadan geçti ve bana her şeyin yolunda olduğunu söyledi. Gerçek değişikliklerin her biri ise NXP komutu kullanıyordu, o yüzden her biri başarısız oluyordu.

Sorunu anlayınca çözüm gülünç derecede basit çıktı. Test artık NXP'nin kendi komutlarından birini kullanıyor: çipten yalnızca rastgele bir sayı isteyen, zararsız bir komut. iOS bunu reddederse uygulama tag'i seçme yöntemine geçiyor. ICODE 3'ü yeniden iPhone'umun altına koydum, **Sayacı ayarla** düğmesine dokundum ve tag'deki sayı değişti. Bir sayacın değiştiğini görünce bu kadar sevindiğim pek olmamıştır.

---

## Hangi cihazlarda çalışıyor

iPhone'da bunların hepsi telefonun yerleşik NFC okuyucusuyla çalışıyor. NFC çipi olmayan iPad ve Mac'te ise [harici bir USB NFC okuyucu](/blog/nfc-reading-ipad-mac/) üzerinden çalışıyor. Okuyucunun ICODE komutlarını olduğu gibi tag'e iletmesi gerekiyor. Seninki bunu yapıyorsa uygulama ICODE tag'lerini iPhone'daki gibi okuyup yönetiyor; üstelik önceki bölümde anlattığım hata orada hiç yaşanmıyor. Komutları iletemeyen bir okuyucuyla da tag'in belleğini yine okuyabiliyorsun.

Android uygulaması ise henüz ICODE'un dilinden anlamıyor.

Çekmecende bugüne kadar pek bir işe yaramamış kütüphane tipi tag'ler duruyorsa ya da proje bekleyen bir NTAG 5 kartın varsa, 7.1.0'a güncelle ve birini okut. NFC.cool Tools [App Store'da](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nxp-icode-3-slix-ntag-5-tr&mt=8) seni bekliyor.
