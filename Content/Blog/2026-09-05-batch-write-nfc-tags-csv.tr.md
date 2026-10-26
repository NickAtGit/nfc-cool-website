---
id: batch-write-nfc-tags-csv-2026-09
title: "E-tablodan NFC tag'lere toplu yazma"
date: 2026-09-05
tags: ["guides", "nfc-tags", "iphone"]
summary: "Konferanslarda ve buluşmalarda NFC tag'lerin üstünde App Store promosyon kodu dağıtıyorum, şimdiye kadar yüzlercesini. Onları böyle yazıyorum ve bu yöntem her liste için işliyor: listeyi e-tabloda hazırla, CSV olarak dışa aktar, dosyayı telefona taşı ve NFC.cool Tools tag'leri birbiri ardına yazsın."
image: "/assets/images/Features/nfc-reader-writer-csv-batch-write.webp"
imageAlt: "Ekranında e-tablo dosyası olan, satırları bir dizi NFC tag'ine yazan iPhone"
author: "Nicolo Stanciu"
metaTitle: "iPhone ve Android'de CSV dosyasından NFC tag'lere toplu yazma"
metaDescription: "Tek bir e-tablodan yüzlerce NFC tag programla: listeyi hazırla, CSV olarak dışa aktar, telefonuna taşı ve NFC.cool Tools tag'leri sırayla yazsın."
ogTitle: "E-tablodan NFC tag'lere toplu yazma"
ogDescription: "Bilgisayarındaki CSV'den yazılmış bir yığın NFC tag'e, her biri tek okutmayla. Konferanslar için yüzlerce promosyon kodu tag'ini nasıl hazırlıyorum."
---
Uygulamalarımı başkalarına göstermek için konferanslara ve buluşmalara gidiyorum ve iyi bir sohbetin sonunda üstünde promosyon kodu olan bir NFC tag uzatmayı seviyorum. Tag'i okutuyorsun, App Store kod önceden girilmiş halde açılıyor ve uygulama sende.

Sorun hiçbir zaman tag'ler değildi. Sayıydı. Her promosyon kodu farklı, yani her tag'in kendi bağlantısı olmalı ve ben bunlardan birkaç yüz tane istiyordum. Uygulamada teker teker yazmak bu ölçekte işe yaramayacaktı. **CSV ile toplu yazmayı** NFC.cool Tools'a bu yüzden ekledim: listeyi Mac'te hazırlıyorum, CSV olarak dışa aktarıyorum, dosyayı telefona geçiriyorum ve uygulama satırları işlerken tag'leri birbiri ardına telefona tutuyorum. Bugüne dek yüzlerce tag'i böyle yazdım.

Bütün süreç, e-tablodan son tag'e kadar burada. Ürün bağlantıları, seri numaraları, Wi-Fi bilgileri ya da bir e-tablo hücresine koyabileceğin başka her şey için aynı biçimde işliyor.

---

## CSV ile toplu yazma aslında ne yapıyor

Uygulamaya bir CSV dosyası veriyorsun ve her satır bir tag oluyor. Uygulama her tag'e neyin gideceğinin önizlemesini gösteriyor, Yazmaya Başla'ya dokunuyorsun ve tag'leri birbiri ardına telefona tutuyorsun. Yazılan her satır dosyadan siliniyor, yani ekrandaki liste her zaman geriye kalan. İstediğin noktada durup sonra, hatta günler sonra devam edebilirsin.

Daha önce hiç NFC tag yazmadıysan [iPhone'unla NFC tag yazma rehberimle](/blog/write-nfc-tags-iphone/) başla. Bu yazı çok sayıda tag yazmakla ilgili.

---

## 1. adım: e-tabloyu bilgisayarında hazırla

Numbers, Excel ya da Google E-Tablolar'ı aç ve listeyi bilgisayarında hazırla. Telefonda bir şey yapmaktan çok daha hızlı ve e-tablo bağlantıları senin yerine kurabiliyor.

En yalın düzen, **tag başına bir satır olan tek sütun**. Her satır, bir tag'in içereceği şeyin ta kendisi. Ürün bağlantılarından oluşan bir sütun şöyle görünüyor:

```
https://example.com/products/1001
https://example.com/products/1002
https://example.com/products/1003
```

Değerlerin yalnızca bir sayı ya da kimlikle ayrılıyorsa sütunu bir formül kursun. İlkini yaz, aşağı doğru doldur, liste ne kadar uzun olursa olsun bitsin. Kimlikler zaten bir dosyadaysa o dosyayı e-tabloda aç ve sabit kısmı formülle önüne ekle.

Uygulama her değerin nasıl başladığına bakıp eşleşen kayıt türünü seçiyor:

- Bağlantı (`https://`, `http://` ya da `www.`) URL kaydı oluyor. Tag'i okut, tarayıcı açsın.
- `tel:`, `mailto:`, `sms:` ve `geo:` eşleşen eyleme dönüşüyor, yani bir tag numara çevirebilir, e-posta başlatabilir ya da konum açabilir.
- `WIFI:T:WPA;S:MyNetwork;P:secret;;` Wi-Fi kaydı oluyor; Wi-Fi QR kodunun kullandığı biçimin aynısı. Tek tuzak: bu dizede noktalı virgül var, yani uygulama dosyanın noktalı virgülle ayrıldığını varsayıp satırı parçalara böler. Uygulamada ayracı virgüle ayarla, satır tek parça kalsın.
- `shortcuts://` bir iOS kısayolu çalıştırıyor.
- Geri kalan her şey düz metin olarak yazılıyor.

Her değeri tek satırda tut. Dosya satır satır okunuyor, yani birkaç satıra yayılan bir kişi kartı birkaç tag'e dağılırdı.

Dikkat edilecek iki şey:

1. **Başlık satırı olmasın.** Uygulama boş olmayan her satırı içerik sayıyor. İlk satırında "URL" yazıyorsa ilk tag'de URL kelimesi olur.
2. **Boş satırlar sorun değil.** Atlanıyorlar, değerin çevresindeki boşluklar da öyle.

### Bir tag'e birkaç kayıt gerektiğinde

Bazen bir tag birden fazla şey taşımalı; örneğin kişi başına bir web sitesi, bir telefon ve bir e-posta. Bunun için sütun ekle. Uygulamada **Satırlara göre grupla**'yı seçiyorsun ve her satır, hücre başına bir kayıt taşıyan bir tag oluyor. **Sütunlara göre grupla** ise tersini yapıp her sütunu bir tag'e çeviriyor; tabloyu öbür türlü kurduysan işine yarar. Tek sütunlu dosyada bunun yerine **Tag başına satır** ayarı var, yani üç satır tek tag'e üç kayıt olarak gidebiliyor.

---

## 2. adım: CSV olarak dışa aktar

CSV dosyası düz bir metin dosyası. Satır başına bir kayıt ve satırdaki hücreler virgül, noktalı virgül ya da sekmeyle ayrılıyor. Birini TextEdit ya da Not Defteri'nde açtığında uygulamanın göreceğinin aynısını görüyorsun. Kişi başına bir bağlantı ve bir telefon numarası içeren bir tablo, dışa aktarımdan sonra şöyle görünüyor:

```
https://example.com/anna,tel:+4915112345678
https://example.com/ben,tel:+4915198765432
```

Biçimlendirme ve formüller dışa aktarımdan sağ çıkmıyor, yalnızca değerler çıkıyor. O dosyayı Numbers, Excel ve Google E-Tablolar'dan şöyle alıyorsun.

### Mac'te Numbers

1. **Dosya**, sonra **Şuraya Aktar**, sonra **CSV**'yi seç.
2. Belgende birden çok tablo varsa Numbers, tablo başına bir dosya mı yoksa hepsini birleştirmek mi istediğini sorar. Sen tek dosyada tek tablo istiyorsun.
3. **Tablo adlarını ekle** işaretli kalmasın. Yoksa Numbers tablo adını dosyaya kendi satırı olarak yazar ve o satır bir tag'e düşer.
4. **Gelişmiş Seçenekler** altında metin kodlamasını Unicode (UTF-8) olarak bırak.
5. **İleri**'ye tıkla, dosyaya ad ver ve **Dışa Aktar**'a bas.

Numbers'la ilgili iki şey: her yeni tablo gölgeli bir başlık satırıyla geliyor ve oraya yazdığın her şey diğer satırlar gibi dışa aktarılıyor, o yüzden boş bırak ya da sil. Bir de Numbers her zaman virgül kullanıyor. Bir değerin içinde virgül varsa Numbers onu tırnak içine alıyor ve uygulama o tırnakları kaldırmıyor. Yani Numbers'tan dışa aktarırken değerlerin içinde virgül bulundurma.

### Mac'te ya da Windows'ta Excel

1. **Dosya**, sonra **Farklı Kaydet**'i seç (bazı sürümlerde Bir Kopyasını Kaydet diyor).
2. Biçim olarak **CSV UTF-8 (Virgülle ayrılmış) (.csv)** seç.
3. Excel yalnızca baktığın sayfayı kaydediyor ve biçimlendirmenin kaybolacağını bildiriyor. Onayla, biçimlendirmeye ihtiyacın yok.

Adına rağmen Excel her zaman virgül kullanmıyor. Sistemindeki bölge ayarlarının liste ayracını kullanıyor ve Almanca, Fransızca, Felemenkçe ile diğer Avrupa sistemlerinin çoğunda bu noktalı virgül, çünkü virgül zaten ondalık ayracı. Hiçbir şeyi değiştirmene gerek yok. NFC.cool virgülü, noktalı virgülü ve sekmeyi kendiliğinden algılıyor. Bu ayrıca değerlerinin içinde virgül olabileceği anlamına geliyor.

### Google E-Tablolar

1. **Dosya**, sonra **İndir**, sonra **Virgülle Ayrılmış Değerler (.csv)**'yi seç.
2. Yalnızca o anki sayfa dışa aktarılıyor, her zaman virgülle.

### Dosyayı taşımadan önce

Dışa aktardığım dosyayı telefona göndermeden önce bir kez metin düzenleyicide açıyorum. Tag başına tek satır, başlık satırı yok, değerlerin çevresinde tırnak yok ve virgülle ayrılmış dosyanın içinde başıboş virgül yok istiyorsun. Bir değerin içinde virgül olması şartsa Excel'den noktalı virgülle dışa aktar ya da Numbers'ın TSV (sekmeyle ayrılmış) çıktısını kullanıp dosya adını `.csv` ile bitecek şekilde değiştir. iPhone'da dosyanın her hâlükârda `.csv` ile bitmesi gerekiyor, çünkü dosya seçici buna göre süzüyor.

---

## 3. adım: dosyayı telefonuna al

iPhone'da Dosyalar uygulamasında, Android'de ise sistem dosya seçicisinin ulaşabildiği bir yerde biten her yol işe yarıyor.

- Dosyayı Mac'inden iPhone'una **AirDrop**'la gönder ve Dosyalar'a Kaydet'i seç.
- **iCloud Drive:** CSV'yi Mac'te iCloud Drive'a kaydet, telefondaki Dosyalar uygulamasında görünsün. Google Drive ile Dropbox da aynı şekilde çalışıyor, Dosyalar uygulaması onlara da göz atabiliyor.
- **Kendine e-postayla gönder** ve eki kaydet.
- **Android:** dizüstü bilgisayardan Hızlı Paylaşım, Google Drive ya da USB kablosu. Uygulama sistem belge seçicisini kullanıyor, yani onun açabildiği her konum uygun.

---

## 4. adım: içe aktar ve önizlemeyi denetle

NFC.cool Tools'ta NFC araçları ekranını aç ve **Toplu Modlar** altında **CSV Toplu Yazma**'ya bak. Android'de de NFC araçları listesinde. **CSV İçe Aktar**'a dokun ve dosyanı seç.

Uygulama dosyanın kendi kopyasını çıkarıyor. Tag yazdıkça satırlar o kopyadan siliniyor. Bilgisayarındaki özgün e-tablo olduğu gibi kalıyor, yani liste sende hep tam duruyor.

Dosya seçilince uygulama ne algıladığını gösteriyor: ayraç, sütun sayısı, gruplama modu ve kaç tag'e ihtiyacın olacağı. Her zaman denetlediğim tek sayı **NFC tag başına bayt**, yani partideki en büyük mesajın boyutu. Onu tag'lerinle karşılaştır. NTAG213 144 bayt, NTAG215 504 ve NTAG216 888 bayt tutuyor. Kısa bir bağlantı yaklaşık 50 bayt, yani bağlantılar için en ucuz tag'ler yeterli. Wi-Fi kaydı ya da uzunca bir kişi kartı 215 veya 216 istiyor. Elindeki çipten emin değilsen [NFC tag türleri rehberime](/blog/nfc-tag-types-for-iphones/) göz at.

**Toplu Önizleme**'yi açıp her tag'i ve alacağı kayıtları gör. Orada gördüğün, yazılacak şeyin ta kendisi.

<figure class="phone-figure" data-layout="stage">
<figcaption>İçe aktar ve önizle</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/batch-write-nfc-tags-csv/1-import-440w.webp" alt="NFC.cool Tools'ta CSV Batch Write; Help, Import CSV ve içe aktarılmış team-links.csv dosyasıyla"><p><strong>CSV'yi içe aktar.</strong> Dosyanı seç. Uygulama kendi kopyası üzerinde çalışır.</p></li>
<li><img src="/assets/images/Blog/screens/batch-write-nfc-tags-csv/2-summary-440w.webp" alt="Toplu yazma ayarları: virgül ayırıcı, satırlara göre gruplama, 2 sütun, 24 NFC tag'i gerekli ve tag başına 49 bayt"><p><strong>Sayılara bak.</strong> Tag'lerinle karşılaştıracağın değer Bytes per NFC tag.</p></li>
<li><img src="/assets/images/Blog/screens/batch-write-nfc-tags-csv/3-preview-440w.webp" alt="Batch Preview: 1'den 4'e kadar tag'ler, her birinde 2 kayıt, bir ekip bağlantısı ve bir e-posta adresi; Start Writing ile"><p><strong>Önizle, sonra yaz.</strong> İlk tag yazılmadan önce her tag'in tam olarak ne alacağı.</p></li>
</ol>
</figure>

---

## 5. adım: yığını yaz

**Yazmaya Başla**'ya dokun ve ilk tag'i iPhone'unun üst kenarına tut. Telefon titreştiğinde tag yazılmış demektir, sonrakini alırsın. Az önce yazdığın satır listeden kayboluyor ve sayaç kaç tane kaldığını söylüyor.

Olacak ve normal olan birkaç şey:

- **Okuma penceresi 60 saniye sonra kayboluyor.** Bu bir iOS sınırı, çökme değil. Birkaç saniye sonra kendiliğinden geri geliyor ve kaldığın yerden devam ediyorsun.
- **Bir tag başarısız oluyor.** Belki kilitliydi, belki çok erken çektin. Satır dosyada kalıyor, uygulama ileri atlamıyor, sen de aynı tag'i yeniden tutuyor ya da başkasını alıyorsun.
- **Durman gerekiyor.** Uygulamayı kapat, başka işine bak, yarın geri dön. Dosya nelerin kaldığını hatırlıyor. Android'de uygulama yarım kalan partiyi gösteriyor ve devam etmeyi öneriyor.

Bir kez ritim tutturunca yüz tag uzun sürmüyor.

---

## Bunlardan yüzlercesini yazarken öğrendiklerim

**Önce iki tag yaz.** Sonra uygulamayla geri oku ve tag'in yapması gerekeni yaptığını denetle. Ancak ondan sonra gerisini yaz.

**En büyük çipe ihtiyacın yok.** Bağlantılar için NTAG213 yeterli ve toptanda gözle görülür biçimde daha ucuz. NTAG216'yı kişi kartları ile Wi-Fi'ye sakla.

**Dağıttığın tag'leri kilitle ya da parolayla koru.** CSV Toplu Yazma'nın hemen yanında Toplu Kilitleme ve Toplu Parola Koruma modları var. Kilitleme tag'i temelli salt okunur yapıyor, parola ise sonradan senin değiştirmene izin verip başkasına vermiyor. Elinden çıkan tag'leri sonrasında bunlardan birinden geçir, kimse içeriğin üstüne yazamasın.

CSV Toplu Yazma [iPhone'da NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-batch-write-nfc-tags-csv-tr&mt=8) ve [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-batch-write-nfc-tags-csv-tr) sürümünde. Bir konferansta ya da buluşmada karşılaşırsak benden bir tag iste.
