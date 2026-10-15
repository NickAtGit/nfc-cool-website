---
id: nfc-blog-010
title: "iPhone'unla NFC tag nasıl yazılır"
date: 2026-03-16
tags: ["nfc-tags", "guides", "iphone"]
summary: "iPhone'un NFC tag okumaktan fazlasını yapabiliyor: yazabiliyor da. Doğru tag'i seçmekten adres, Wi-Fi bilgisi, kişi kartı ve otomasyon yazmaya kadar iPhone'la NFC tag programlamanın adım adım rehberi."
image: "/assets/images/Blog/write-nfc-tags-iphone.webp"
imageAlt: "İlerleme ve onay simgeleriyle boş NFC tag'lere veri yazan iPhone"
metaTitle: "iPhone'unla NFC tag nasıl yazılır: adım adım rehber (2026)"
metaDescription: "iPhone'unla NFC tag yazmayı öğren. NFC.cool Tools ve iOS Kısayolları ile adres, Wi-Fi, kişi ve otomasyon programlamak için adım adım yönergeler."
ogTitle: "iPhone'unla NFC tag nasıl yazılır"
ogDescription: "iPhone'unla NFC tag yazmak için adım adım rehber: adresler, Wi-Fi, kişiler ve otomasyonlar. Özel donanım gerekmiyor."
---
Çoğu kişi iPhone'unun NFC tag *okuyabildiğini* biliyor: okutup ödemek, ulaşım kartı taramak, bağlantı açmak. Ama insanları ikna etmek zorunda kaldığım şey şu: iPhone'un NFC tag'lere *yazabiliyor* da; boş tag'leri neredeyse her şeyi tetikleyen akıllı düğmelere çeviriyor.

NFC tag okuyup yazan bir uygulama olan NFC.cool'u yıllardır geliştiriyorum ve yazma kısmı gerçekten hiç bıkmadığım bölüm. Komodinde, telefonu susturup alarm kuran bir tag ister misin? Masanda çalışma listeni açan bir tag? Kapının yanında misafirlere Wi-Fi parolanı veren bir tag? iPhone'un bunların hepsini programlayabiliyor ve bir kez yaptığında neden beklediğine şaşıracaksın.

Bu, ilk tag paketini yeni almış bir arkadaşıma anlatacağım rehber: neye ihtiyacın var, farklı veri türleri nasıl yazılır ve dakikalar içinde kurabileceğim projeler neler. Teknolojinin kendisine yepyeniysen [sıfırdan başlayanlar için NFC tag rehberim](/blog/nfc-tags-beginners-guide/) önce zemini hazırlıyor.

---

## Neye ihtiyacın var

Yazmaya başlamak için yalnızca üç şey gerekiyor ve hiçbiri pahalı değil.

### 1. Uyumlu bir iPhone

NFC tag yazmak, **iOS 13 ya da sonrasını** çalıştıran **iPhone 7 ya da sonrası** istiyor. iPhone'unu son sekiz yılda aldıysan sorun yok.

En iyi deneyim için **arka planda NFC okuyan** bir iPhone'a uzanırdım (iPhone XS ve sonrası). Bu modeller önce uygulama açmadan NFC tag okuyabiliyor ve bu, yazdığın tag'lerin kullanımını çok daha keyifli kılıyor. iPhone donanımının tüm bunu tam olarak nasıl karşıladığını merak ediyorsan [iPhone'da NFC'ye içeriden bakış](/blog/nfc-on-iphones-insider-look/) yazısında derinlemesine anlattım.

### 2. Boş NFC tag'ler

[Boş NFC tag'leri](/affiliate-links/) internetten tanesi **0,30 ile 1,00 avro** arasında alabilirsin. Birkaç biçimde geliyorlar:

| Biçim | Nerede iyi |
|-------------|----------|
| **Etiketler** (yuvarlak, 25-30 mm) | Yüzeyler, nesneler, afişler |
| **Kartlar** (kredi kartı boyutu) | Cüzdanlar, kartvizitler |
| **Anahtarlıklar** | Anahtarlık, çanta askısı |
| **Bileklikler** | Etkinlikler, geçiş denetimi |
| **Jeton tag'ler** (kalın diskler) | Nesnelerin içine gömme |

**Hangi çipi almalısın?**

Bir tane seçmemi istesen çoğu proje için **NTAG216** tam kıvamında: 888 bayt kullanılabilir bellek, geniş uyumluluk ve toptanda uygun fiyat. En çok önerdiğim ve üzerinde sınadığım çip bu. Kısa döküm şöyle:

- **NTAG213** (144 bayt) - Adresler ve basit metin için yeterli. En ucuz seçenek.
- **NTAG215** (504 bayt) - Kişi kartları, Wi-Fi bilgileri ve birden çok kayıt için yeterli.
- **NTAG216** (888 bayt) - En iyi çok yönlü seçim. Kişi kartları, Wi-Fi bilgileri ve ayrıntılı vCard gibi uzun içerikler için en geniş pay; çoğu projede önerdiğim de bu.

Emin değilsen NTAG216 etiketlerden karışık bir paketle başla ve fazla düşünme; kullanımların yüzde 90'ını karşılıyorlar. Çip çip tam dökümü, iPhone'ların hangi türleri sevdiği dahil, [iPhone'lar için NFC tag türleri rehberimde](/blog/nfc-tag-types-for-iphones/) yazdım.

### 3. NFC yazma uygulaması

iPhone'unun tag'lere veri yazmak için bir uygulamaya ihtiyacı var. Apple'ın yerleşik NFC desteği okumayı karşılıyor ama yazmak için ayrı bir uygulama gerekiyor.

Yıllarımı buna verdiğim için yanlılığımı açıkça söyleyeyim: **[NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-tr&mt=8)** hem iPhone hem [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-tr) için tam bunun üzerine kuruldu. Standart tüm NDEF kayıt türlerini (adresler, metin, Wi-Fi ayarları, kişiler ve dahası) yazmayı destekliyor ve tag belleğinin ne kadarını kullandığını tam olarak gösteren temiz bir arayüzü var. Ayrıca tag kilitlemeni, teknik ayrıntıları okumanı ve iOS Kısayolları üzerinden yazmayı otomatikleştirmeni sağlıyor. Özelliklerin tamamını [NFC okuma ve yazma sayfasında](/features/nfc-reader-writer/) görebilirsin.

Başka seçenekler de var (temel adres yazımı için Apple'ın Kısayollar uygulaması gibi) ama ayrı bir NFC uygulaması, ne yazdığın ve nasıl yazdığın üzerinde daha çok denetim veriyor.

---

## Adım adım: ilk NFC tag'ini yazmak

Herkesi başlattığım yerden başlatıyorum: tag'e adres yazmak. En yaygın kullanım ve en hızlı kazanç.

### Adres yazmak

1. **NFC.cool Tools'u aç** ve **Yaz** sekmesine dokun
2. Kayıt türü olarak **"URL"yi seç**
3. **Adresini gir**, örneğin `https://nfc.cool`
4. **"Tag'e Yaz"a dokun**
5. **iPhone'unu boş NFC tag'e yaklaştır**: iPhone'unun üst kenarı (NFC anteninin olduğu yer) tag'e 2-3 cm mesafede olmalı
6. **Başarı onayını bekle**: bir titreşim hissedecek ve onay işareti göreceksin

Hepsi bu. O tag'i telefonuyla okutan herkes artık senin adresine gidecek; uygulama gerekmiyor, taranacak QR kod yok. Bir meslektaşımın yüzünde, boş bir etiketin bir siteyi açtığını gördüğü andaki ifadeyi görünce bu gösterinin baş rolde olması gerektiğini anladım.

**İpucu:** iPhone'larda NFC anteni telefonun **üst kenarında**, kameranın yakınında duruyor. En güçlü bağlantı için iPhone'unun üstünü doğrudan tag'in üzerine tut. Yazdığın şeyi uygulama olmadan denetlemek istersen Android'de [NFC tag'leri doğrudan tarayıcından okuyabilirsin](/online-nfc-reader/).

<figure class="phone-figure" data-layout="stage">
<figcaption>İlk tag'ine yazmak</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/write-nfc-tags-iphone/1-write-nfc-440w.webp" alt="NFC.cool Tools'taki NFC sekmesi, Read NFC ve Write NFC düğmeleriyle"><p><strong>Write NFC'ye dokun.</strong> NFC sekmesinde, Read NFC'nin yanında.</p></li>
<li><img src="/assets/images/Blog/screens/write-nfc-tags-iphone/2-web-link-440w.webp" alt="Create NFC Message: Web Link, Google Review Link, Text, Business Card, Telephone Number, Email, SMS, Location ve FaceTime"><p><strong>Web Link'i seç.</strong> Ya da metin, kişi, telefon numarası ve daha fazlası. Bağlantını gir, yaz ve tag'i iPhone'unun üst kenarına tut.</p></li>
<li><img src="/assets/images/Blog/screens/write-nfc-tags-iphone/3-my-messages-440w.webp" alt="Bir web bağlantısı, bir kartvizit ve bir Wi-Fi kaydıyla My NFC Messages"><p><strong>Yeniden bul.</strong> Yazdığın her şey My NFC Messages'a kaydedilir, sonraki tag'e hazır.</p></li>
</ol>
</figure>

---

## NFC tag'lere neler yazabilirsin

NFC tag'ler, standart kayıt türlerini tanımlayan **NDEF** (NFC Veri Alışverişi Biçimi) adlı bir biçim kullanıyor. Bu model kafamda oturunca teknolojinin tamamı sihir olmaktan çıktı. Yazabileceklerin:

### Adresler ve bağlantılar

En yaygın kullanım ve en çok uzandığım tür. Herhangi bir web adresi yaz, tag okutulunca telefonun tarayıcısında açılsın.

**Pratik kullanımlar:**
- Masadaki tag'de restoran menüsü bağlantısı
- Kartvizitte portföy ya da LinkedIn profili
- Raf tag'lerinde ürün sayfası bağlantısı
- Resepsiyonda geri bildirim formu bağlantısı

**Gereken bellek:** yaklaşık 30-80 bayt (adreslerin çoğu her tag'e sığıyor)

### Wi-Fi ağ bilgileri

Wi-Fi ağ adını (SSID) ve parolanı tag'e yaz. Misafirler tag'i okutup kendiliğinden bağlansın; uzun parolaları yazmak yok.

**Wi-Fi bilgileri nasıl yazılır:**

1. NFC.cool Tools'ta kayıt türü olarak **"Wi-Fi"yi** seç
2. **Ağ adını** (SSID) gir
3. **Parolayı** gir
4. **Güvenlik türünü** seç (ev ağlarının çoğu için WPA2 ya da WPA3)
5. Tag'e yaz

**İpucu:** Wi-Fi tag'ini modemin yanına, kapının yanındaki bir anahtarlığa ya da misafir odasının içine koy. Üstüne "Wi-Fi için okut" yaz; deneyimime göre her misafirin sonunda teşekkür ettiği tag bu oluyor.

**Gereken bellek:** parola uzunluğuna göre yaklaşık 60-120 bayt

### Kişi kartları (vCard)

Tag'e vCard biçiminde bir kişi yaz. Biri okuttuğunda iletişim bilgilerin kaydedilmeye hazır beliriyor: ad, telefon, e-posta, şirket, adres.

Bu, aslında dijital kartvizitin yaptığı işin doğrudan fiziksel tag'e gömülmüş hali. Uygulama yok, internet bağlantısı gerekmiyor; kişi verisi tag'in üstünde yaşıyor.

**Kişi nasıl yazılır:**

1. Kayıt türü olarak **"Kişi"yi** seç
2. Paylaşmak istediğin alanları doldur (ad, telefon, e-posta ve diğerleri)
3. Tag'e yaz

**Gereken bellek:** kaç alan eklediğine göre yaklaşık 100-400 bayt. Adres ve not içeren kişiler için NTAG215 ya da NTAG216 kullan.

Okuduğum destek e-postalarından dürüst bir uyarı: tag'in üstündeki ham vCard'lar iPhone'da tutarsız davranabiliyor. Seninki düzgün açılmıyorsa sebepleri [vCard NFC tag'in iPhone'da neden çalışmıyor](/blog/vcard-nfc-iphone-not-working/) yazısında inceledim.

**Not:** Fotoğraflar, sosyal bağlantılar ve istatistiklerle daha zengin bir deneyim için **[NFC.cool Business Card'a](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-tr&mt=8)** bak; barındırılan bir dijital kartvizit profili oluşturuyor ve bağlantısını herhangi bir NFC tag'ine yazabiliyor. Biri okuttuğunda iOS kullanıcıları yerel bir App Clip, Android kullanıcıları ise nfc.cool alan adında bir site görüyor; uygulama gerekmiyor. Kendi tanışmalarımda bunu ham vCard'lardan çok daha güvenilir buldum.

### Düz metin

Tag'e istediğin metni yaz. Adreslerden daha az yaygın ama şunlarda işe yarıyor:

- Stok etiketleri (seri numaraları, açıklamalar)
- Ekipmana iliştirilmiş yönerge ya da notlar
- Hazine avlarındaki gizli mesajlar
- Depolarda varlık takibi

**Gereken bellek:** metnin uzunluğuna göre değişiyor (karakter başına yaklaşık 1 bayt)

### Telefon numaraları ve e-posta adresleri

Okutulduğunda arama başlatmak ya da e-posta yazmak için bir `tel:` veya `mailto:` adresi yaz.

Şurada işe yarıyor:
- Tıbbi ekipmandaki acil durum iletişim tag'leri
- Otomatlardaki "servis için ara" tag'leri
- Ürünlerdeki destek iletişim tag'leri

### Uygulamaya özel veri

Bazı uygulamalar, kendi uygulama eylemlerini tetikleyen özel NDEF kayıtları yazabiliyor. Örneğin belirli bir kısayolu, çalma listesini ya da uygulama ekranını açan bir kayıt yazabilirsin.

---

## İleri düzey: iOS Kısayolları ile yazmak

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/write-nfc-tags-iphone/shortcuts-440w.webp" alt="NFC.cool Tools'taki Shortcuts ekranı; Scan NFC in NFC.cool ve Scan QR and Barcode in NFC.cool gibi Siri ifadeleriyle"><p><strong>NFC.cool'un kendi eylemleri.</strong> Uygulamanın Kestirmeler'e ve Siri'ye eklediği her eylem, Kestirmeler uygulamasına tek dokunuşla.</p></li>
</ol>
</figure>

Burası benim için işin eğlenceli olduğu yer. Apple'ın **Kısayollar** uygulamasında yerleşik NFC yazma desteği var ve NFC.cool Tools bunu kendi kısayol eylemleriyle daha da genişletiyor.

### Kısayollarla temel adres yazımı

1. **Kısayollar** uygulamasını aç
2. Yeni bir kısayol oluştur
3. **"NFC Tag Ayarla"** eylemini ara (Betikleme → NFC altında)
4. Ne yazılacağını ayarla (adres, metin ve benzeri)
5. Kısayolu çalıştır ve bir tag okut

Aynı veriyle birden çok tag'i toplu yazmak için işe yarıyor.

### NFC.cool Tools kısayol bütünleşmesi

NFC.cool Tools kendi kısayol eylemlerini ekliyor ve sana daha çok seçenek veriyor:

- **Tag Yaz.** Desteklenen herhangi bir kayıt türünü programlı olarak yaz.
- **Tag Oku.** Tara ve tag verisini kısayoluna döndür.
- **Okuma Geçmişi.** Son okuma sonuçlarına eriş.

Bu, otomasyon olanaklarını açıyor. Örneğin şunu yapan bir kısayol kurabilirsin:
1. Ürün adını sorar
2. `https://siten.com/urun/{ad}` gibi bir adres üretir
3. Bunu bir NFC tag'e yazar
4. Tag'i bir e-tabloya kaydeder

Toplu stok etiketlemede ya da etkinlik yakalığı kurulumunda birebir.

---

## Pratik NFC tag projeleri

Dönüp durduğum projeler bunlar; kurmaya hazır ve her biri birkaç dakika sürüyor:

### Akıllı ev tag'leri

**Komodin tag'i: "uyku modu"**
Şunları yapan bir iOS kısayolunu tetikleyen adres yaz:
- Rahatsız Etme'yi aç
- Yarının alarmını kur
- Ekran parlaklığını düşür
- Uyku çalma listesini başlat

**Masa tag'i: "çalışma modu"**
- Görev yöneticini aç
- Odak zamanlayıcısı başlat
- İş VPN'ine bağlan
- Konsantrasyon listesini çal

**Kapı tag'i: "evden çıkıyorum"**
- Hava durumunu denetle
- Yol süresini göster
- Akıllı evde "dışarıda" sahnesini tetikle

### İş tag'leri

**Konferans yakalığı tag'i**
NFC.cool Business Card adresini, konferans yakalığının arkasına yapıştırdığın bir tag'e yaz. Karşındakiler yakalığını okutuyor, dijital kartvizitinin tamamı beliriyor.

**Ürün tag'leri**
Ürün belgelerine, garanti kaydına ya da destek sayfalarına giden bağlantılar yaz. Ürünlere ya da ambalaja iliştir.

**Toplantı odası tag'leri**
Oda rezervasyon takvimlerine ya da Wi-Fi bilgilerine giden bağlantılar yaz. Kapının yanına yapıştır.

### Yaratıcı projeler

**Müzik tag'leri**
Spotify ya da Apple Music albüm bağlantılarını NFC etiketlerine yaz. Bunları fiziksel albüm kapaklarına yapıştır, okutunca albüm çalsın.

**Kutu oyunu tag'leri**
Kural PDF'lerine ya da anlatım videolarına bağlantı yaz. Kutunun kapağının içine yapıştır.

**Tarif tag'leri**
Sevdiğin tariflere bağlantı yaz ve tag'leri baharat kavanozlarına ya da yemek kitabı sayfalarına yapıştır.

---

## NFC tag'leri kilitlemek

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/write-nfc-tags-iphone/lock-440w.webp" alt="Lock Tag ekranı: tag'i kalıcı olarak salt okunur yapar, geri alınamaz"><p><strong>Lock Tag.</strong> İçeriği her telefonda okunur ama bir daha asla değişmez.</p></li>
</ol>
</figure>

Bir tag'i yazdın ve içeriğinden memnunsun; artık onu **kilitleyebilirsin**. Kilitleme, tag'i kalıcı olarak salt okunur yapıyor; kimse verinin üstüne yazamıyor. Bunu bilinçli ve son bir adım olarak görüyorum, hızlıca geçilecek bir şey olarak değil, çünkü geri alma yok.

**NFC.cool Tools'ta:**
1. Yazdıktan sonra **Kilitle** seçeneğine dokun
2. Onayla; **bu geri alınamaz**

**Ne zaman kilitlemeli:**
- Halka açık yerlerdeki tag'ler (kurcalamayı önlemek için)
- Ürün tag'leri (adreslerini korumak için)
- Kartvizitler (iletişim verini güvende tutmak için)
- Yeniden yazmayı planlamadığın her tag

**Ne zaman kilitlememeli:**
- Sonradan güncellemek isteyebileceğin tag'ler (Wi-Fi parolası değişiklikleri, mevsimlik adresler)
- Deneme ve öğrenme; sınarken yeniden yazılabilir bıraksın

---

## Sorun giderme

Aldığım "neden yazmıyor" sorularının çoğu şu dört sebepten birine iniyor. Nasıl ilerleyeceğin burada.

### "Yazılamıyor" hatası

- **Tag kilitli olabilir.** Biri (ya da sen) daha önce kilitlediyse tag kalıcı olarak salt okunur. Yeni tag'e ihtiyacın var.
- **Bellek yetmiyor.** Verin, tag'in kapasitesi için fazla büyük olabilir. Daha çok belleği olan bir tag dene (NTAG215'ten NTAG216'ya) ya da veriyi azalt.
- **Tag doğru konumlanmamış.** iPhone'unun üst kenarını tag'in üstünde yavaşça gezdir. Bazı yüzeyler (metal, kalın kılıflar) araya girebiliyor.
- **Tag hasarlı.** NFC tag'ler dayanıklı ama kırılmaz değil. Aşırı sıcaklık, bükülme ya da delinme onları öldürebiliyor.

### Yazma tamam görünüyor ama tag yanıt vermiyor

- **NDEF biçimini denetle.** Telefonların kendiliğinden okuyabilmesi için verinin NDEF biçiminde yazılması gerekiyor. NFC.cool Tools bunu senin için hallediyor ama elle yazılmış tag'lerde biçim sorunları olabiliyor.
- **iPhone modeli önemli.** Eski iPhone'lar (7, 8, X) tag okumak için uygulama istiyor. iPhone XS ve sonrası tag'leri arka planda kendiliğinden okuyor.

### Tag Android'de çalışıyor ama iPhone'da çalışmıyor

- **Çip türünü denetle.** iPhone'lar en iyi NTAG serisi çiplerle (NTAG213, 215, 216) çalışıyor. Bazı başka çip türleri iOS ile uyumlu olmayabiliyor.
- **NDEF biçimlendirmesi.** Tag'in NDEF biçiminde olması gerekiyor. Toptan alınan bazı tag'ler biçimlendirilmemiş geliyor; NFC.cool Tools ile üstüne yazarsan kendiliğinden biçimlendiriliyorlar.

---

## NFC tag'lerden en iyi verimi almak için ipuçları

Bunlar zor yoldan öğrendiğim küçük dersler; sen öğrenmek zorunda kalma.

1. **Tag'lerini etiketle.** Masadaki boş bir etiket işine yaramıyor. Etiket makinesi ya da kalemle tag'in ne yaptığını yaz ("Wi-Fi için okut", "Çalışma modu" ve benzeri).

2. **Metal yüzeylerden kaçın.** Metal, NFC sinyallerine karışıyor. Metale yapıştırman şartsa **metal üstü NFC tag** kullan (araya karışmayı engelleyen bir ferrit katmanları var). Biraz daha kalın ve pahalılar ama metal yüzeylerde kusursuz çalışıyorlar.

3. **Yapıştırmadan önce dene.** Tag'i yaz, sına, sonra yapışkanını soyup yerine koy. Yapışmış bir tag'i yeniden yazmak için sökmek, tamamen kaçınmayı öğrendiğim türden küçük bir dert.

4. **İşe uygun tag kullan.** 40 bayt tutan basit bir adres için NTAG216'yı (888 bayt) harcama. Tam bir vCard'ı da NTAG213'e (144 bayt) sığdırmaya çalışma.

5. **Suya dayanıklı seçenekler var.** Epoksi kaplı NFC tag'ler su geçirmiyor ve daha dayanıklı. Dış mekan, mutfak ya da banyo için iyi.

6. **NFC tag'leri Kısayollar'la birleştir.** iPhone'da NFC tag'lerin asıl gücü yalnızca adres açmak değil, karmaşık otomasyonlar tetiklemek. Bir NFC tag herhangi bir iOS kısayolunu başlatabiliyor; o da akıllı ev cihazlarını denetleyebiliyor, mesaj gönderebiliyor, veri kaydedebiliyor ve dahası.

---

## Sık sorulan sorular

### NFC tag'i yeniden yazabilir miyim?

Tag kilitlenmemişse evet. Standart NFC tag'ler **100.000'den fazla kez** yeniden yazılabiliyor. Yeni veriyi eskinin üstüne yaz, önce "silmeye" gerek yok.

### iPhone'umun ne kadar yakın olması gerekiyor?

**2-4 cm** içinde. NFC anteni iPhone'un üst kenarında. En iyi bağlantı için telefonunun üstünü doğrudan tag'in üzerine tut.

### Uygulama olmadan NFC tag yazabilir miyim?

iOS Kısayolları'nda temel yazma işleri için (adresler, metin) yerleşik bir "NFC Tag Ayarla" eylemi var. Ama Wi-Fi bilgileri, kişiler ve daha karmaşık kayıtlar için NFC.cool Tools gibi bir uygulamaya ihtiyacın olacak.

### NFC tag'lerin pile ihtiyacı var mı?

Hayır. NFC tag'ler **edilgen**; pilleri yok ve okuttuğunda güçlerini telefonunun NFC okuyucusundan alıyorlar. Bitecek bir şey olmadığı için tag'ler **10 yıldan uzun** dayanabiliyor.

### NFC tag'i parolayla koruyabilir miyim?

Evet. NFC.cool Tools, NTAG tag'lerinde hem iPhone'da hem Android'de parola koruması kurabiliyor. Şunu bil ki bu yalnızca tag'in **üstüne yazılmasını** engelliyor; tag'de zaten olanı birinin **okumasını** engellemiyor. İçeriğin kendisinin anahtar olmadan okunamamasını istiyorsan şifreli veri istiyorsun demektir; [NFC Safe rehberimize](/blog/nfc-safe-encrypted-secrets/) bak. Tag'i kilitlemek ise diğer seçenek: sonraki tüm yazmaları kalıcı olarak engelliyor.

### NFC tag'ler telefon kılıfının içinden çalışır mı?

Evet, telefon kılıflarının çoğu sorun çıkarmıyor. NFC plastikten, silikondan, deriden ve hatta ince cüzdanlardan geçiyor. Çok kalın kılıflar (ağır darbeye dayanıklı olanlar) ya da metal plakalı kılıflar (mıknatıslı araç tutucuları için) araya girebiliyor.

### Tek bir iPhone'la kaç tag yazabilirim?

Sınırsız. Kaç tag yazacağına dair bir kısıt yok. Sınırlayıcı etken telefonun değil, tag'lerin kendisi.

---

## Sırada ne var

Artık NFC tag yazmayı bildiğine göre olanaklar sonuna kadar açık. Önerim hep aynı: basit tek bir projeyle başla, örneğin misafirler için bir Wi-Fi tag'i ya da bir kartvizit tag'i, o küçük kazancı al ve üstüne kur.

Güçlü ve kullanımı kolay bir NFC yazma uygulaması arıyorsan **[NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-tr&mt=8)**, tam bunu karşılamak için yazdığım uygulama: temel adres yazımından gelişmiş tag yönetimine, otomasyon için iOS Kısayolları bütünleşmesine kadar.

NFC tag'leri profesyonel dijital kartvizitlere çevirmek istiyorsan **[NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-tr&mt=8)** güzel bir kart profili oluşturmanı ve adresini herhangi bir NFC tag'ine yazmanı sağlıyor. Uygulama arayüzü ve App Clip iOS'ta 35 dili destekliyor; Android'deki alıcılar ise nfc.cool alan adında bir site görüyor (şimdilik yalnızca İngilizce).

**NFC.cool Tools'u indir:** [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-tr&mt=8) | [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-tr)

**NFC.cool Business Card'ı indir:** [App Store](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-tr&mt=8) | [Google Play](https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-tr)
