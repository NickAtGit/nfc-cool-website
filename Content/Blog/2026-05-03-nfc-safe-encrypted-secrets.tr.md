---
id: "nfc-safe-2026-05"
title: "NFC Safe: dayanıklı NFC tag'lerde şifreli sırlar sakla"
date: "2026-05-03"
tags: ["nfc-tags", "privacy"]
summary: "Epoksi kaplı NFC tag'lerde 256 bit AES. Kağıt yedekler yanar. Bulut yedekler çöker. NFC tag'ler çökmez."
metaDescription: "NFC Safe sırlarını (kurtarma ifadeleri, parolalar, kurtarma kodları) 256 bit AES ile NFC tag'e şifreler. Bulut yok, hesap yok, yalnızca tag ve parolan."
image: "/assets/images/Blog/nfc-safe-encrypted-secrets.webp"
imageAlt: "Şifreli NFC sırlarını temsil eden telefon, NFC kartı, kalkan ve kilit"
author: "Nicolo Stanciu"
---

Kurtarma ifaden büyük olasılıkla bir kağıt parçasında. Belki kasada. Belki döşemenin altında. Belki de Reddit'te biri "ciddi" kripto insanları böyle yapar dediği için üç ayrı yere bölünmüş. Ama yine de kağıt. Kağıt yanar. Kağıt su alır. Kağıt kaybolur.

NFC tag okuyup yazan bir uygulama olan NFC.cool'u yıllardır geliştiriyorum ve bir noktada kendime ödemelerle ya da geçiş kartlarıyla hiç ilgisi olmayan bir soru sormaya başladım: yedeğin çürüyemese, bozulamasa ve onu bulan birine hiçbir şey ifade etmese nasıl olurdu?

**NFC Safe**'i yazmamın sebebi bu soru. Herhangi bir metni (kurtarma ifadeleri, parolalar, kurtarma kodları, gizli tutman gereken ne varsa) 256 bit AES ile şifreleyip NFC tag'e yazıyor. Tag kendi başına yeterli. Bulut yok. Sunucu yok. Hesap yok. Sırrı okumak için hem fiziksel tag'e *hem* parolaya ihtiyacın var. İkisi birden olmadan tag, üstünde anlamsız veri taşıyan minik bir plastik parçası.

Bunu tasarlarken kesin olarak istediğim bir şey vardı: sırlarının benim uygulamamın var olmasına bağlı kalmasını istemedim. Bu yüzden şifreleme biçimi, örnek bir Python çözücüsüyle birlikte [tamamen belgelenmiş ve açık](https://github.com/NickAtGit/nfc.cool-nfc-safe-format). NFC.cool bir gün ortadan kalkarsa verini standart bir NFC okuyucu ve belirtimle yine kurtarabilirsin. Bu sözü tutabilirim, çünkü belirtimi yazılımdan uzun yaşasın diye yazdım.

---

## Sır saklamanın sorunu

Gördüğüm her sır saklama yönteminin zayıf noktasını saymamı istesen düşünmeden sayarım: kağıt yanar, USB uçları paslanır, bulut hizmetleri sızdırır, donanım cüzdanları yalnızca kripto kurtarma ifadesi tutar ve beynin unutur. Her seçenek kendince çöküyor.

Ben de tersten çalıştım. İdeal yedek fiziksel olarak dayanıklı, şifreli, kendi başına yeterli, çoğaltılabilir ve uzun ömürlü olurdu. NFC tag'ler beşini de tutturuyor ve bu başta beni de şaşırttı. Pilleri yok, hareketli parçaları yok ve NTAG216 çipi 10 yılı aşkın veri saklama için belgelendirilmiş. Epoksi kaplı türleri suya, darbeye ve onlarca yıllık ihmale dayanıyor. Bu çiplerin nasıl ayrıştığına yeniysen ödünleri [iPhone için NFC tag türleri](/blog/nfc-tag-types-for-iphones/) yazısında ayrıştırdım.

---

## NFC Safe nasıl kullanılır

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/nfc-safe-encrypted-secrets/1-encrypt-440w.webp" alt="Encrypt modunda NFC Safe; gizli bir mesaj ve correct-horse-battery parolası girilmiş"><p><strong>Şifrele.</strong> Sırrını ve güçlü bir parolayı yaz, sonra bir tag'i telefonuna tut.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-safe-encrypted-secrets/2-decrypt-440w.webp" alt="Decrypt modunda NFC Safe; tag'den geri okunan sırrı gösteriyor"><p><strong>Çöz.</strong> Aynı parola ve bir okutma, sırrın geri gelir.</p></li>
</ol>
</figure>

NFC Safe, NFC.cool Tools içinde NFC Apps altında duruyor. Her şeyi, üstünde Şifrele ya da Çöz seçeneği olan tek bir ekrana sığdırdım. Daha önce hiç tag yazdıysan burada sana yabancı gelen bir şey olmayacak.

**Şifrelemek için:**
1. Tools → NFC Apps → NFC Safe'i aç
2. **Şifrele**'yi seç
3. Sırrını yaz ya da yapıştır
4. Güçlü bir parola belirle
5. Şifrele'ye dokun ve NFC tag'i telefonuna tut

**Çözmek için:**
1. Aynı ekranda **Çöz**'e geç
2. Parolanı gir
3. Daha önce şifrelediğin tag'i okut, sırrın karşına çıksın

Kapağın altında yaptığım şu: PBKDF2 ile AES-256-GCM (HMAC-SHA-256, 100.000 yineleme, 16 baytlık rastgele tuz). Sonuç, tag'e özel bir NDEF kaydı (`urn:nfc:ext:crypto`) olarak yazılıyor. Bunların herhangi birini benim sözüme güvenmek yerine kendin doğrulamak istersen [biçim belirtiminin tamamı GitHub'da](https://github.com/NickAtGit/nfc.cool-nfc-safe-format). Önce sıradan, şifresiz bir tag yazmanın nasıl göründüğünü merak ediyorsan [iPhone'da NFC tag nasıl yazılır](/blog/write-nfc-tags-iphone/) yazısında anlatıyorum.

---

## Çoğaltma stratejisi

Bunu kendim nasıl kullanırdım, anlatayım. NTAG216 tag'in fiyatı aşağı yukarı bir kahve kadar, yani tek tane yapmak için hiçbir sebep yok. Birkaç tane al, aynı sırrı her birine şifrele ve dağıt: çekmece, ofis, bir aile üyesinin evi, kiralık kasa, yalnızca senin aklına gelecek bir yer. Her tag tek başına, parola olmadan anlamsız. Tasarımda en sevdiğim yan da bu: doğası gereği iki aşamalı. Fiziksel tag ile parola, iki ayrı yerde duruyor ve senden fazladan hiçbir kurulum istemiyor.

---

## Neden USB ya da SD kart değil de NFC

İnsanlar bana neden herkesi bir USB belleğe ya da SD karta yönlendirmediğimi soruyor. Dürüst yanıt şu: bunların sıkıcı ve önlenebilir biçimlerde çöktüğünü fazlaca gördüm. NFC hepsinin etrafından dolaşıyor:

- **Bağlantı ucu yok** - paslanacak ya da bükülecek bir şey yok
- **Pil yok** - edilgen, gücünü okuyucudan alıyor
- **Dosya sistemi yok** - bozulacak bir şey yok
- **Sürücü yok** - her akıllı telefon NFC'yi doğrudan okuyor
- **Küçük ve ucuz** - bozuk para boyunda, toptanda bir doların altında
- **Dayanıklı** - epoksi türleri suya, darbeye, mora dayanıyor

Tek gerçek sınır kapasite: şifreleme yükünden sonra kabaca 500-700 bayt. Çok değil ama bu işin gerçek amacı için fazlasıyla yeterli: 24 kelimelik kurtarma ifadesi, bir ana parola ya da bir dizi kurtarma kodu.

---

## Güvenlik notları

Keskin köşeleri sonradan keşfetmeni beklemektense baştan söylemeyi yeğlerim:

- **Her şey parolan.** 256 bit AES kırılamaz. Zayıf parola kırılır. Rastgele üretilmiş, 20 karakterden uzun bir dize kullan ve burada taviz verme.
- **NFC menzili kısa** (yaklaşık 4 cm). Kimse odanın öbür ucundan okutamaz; o minik menzil hata değil, özellik.
- **Uzaktan silme yok.** Tag'i mi kaybettin? Fiziksel olarak yok et. Makas iş görür, zaten parola olmadan veri de işe yaramaz.
- **Parola kurtarma yok.** Unutursan veri gider. Bu kararı bilerek verdim: kurtarma yolu aynı zamanda saldırı yoludur. Parolayı tag'lerden ayrı bir yere yaz.

---

## Büyük resim

NFC ile her gün uğraşırken bu tag'lerin sessizce önemli şeylerin saklama ortamına dönüştüğünü izledim. AB Dijital Ürün Pasaportu, onaylı veri taşıyıcıları arasında NFC'yi QR kodların hemen yanında sayıyor. Philips bunları diş fırçası başlıklarına koyuyor. Oteller oda anahtarı olarak kullanıyor. Ucuz, dayanıklı ve zaten cebinde duran cihazla evrensel biçimde okunabilir; bu birleşim nadir ve onlara sürekli yeni kullanım bulmamın sebebi tam bu. Daha geniş bir bakış istersen temelleri [NFC tag nedir: sıfırdan başlayanlar için tam rehber](/blog/nfc-tags-beginners-guide/) yazısında anlattım.

NFC Safe, o dayanıklılığı alıp eksik olan tek şeyi, yani şifrelemeyi eklemek için attığım adım. Kağıttan uzun yaşayan, onu bulan hiç kimsenin okuyamayacağı ve bir fincan kahveden ucuza gelen bir yedek. Kendim için istediğim türden bir şeydi, ben de yazdım.

Şu anda [iPhone için NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-safe-encrypted-secrets-tr&mt=8) ve [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-safe-encrypted-secrets-tr) sürümünde bulunuyor.
