---
id: "ios-shortcuts-nfc-tap-counter-2026-05"
title: "NFC okutma sayacı verisini iOS Kısayolları ile çözümle"
date: "2026-05-22"
tags: ["nfc-tags", "automation", "iphone"]
summary: "NFC okutma sayacının tag kimliğini ve okuma sayısını çözümleyen, kurup kullanabileceğin iOS kısayolları: yeniden kullanılabilir bir çözümleyici ve onu kullanan bir tag uyarısı demosu."
image: "/assets/images/Blog/ios-shortcuts-nfc-tap-counter.webp"
imageAlt: "NFC etiketi okutulduktan sonra tag kimliği ile okuma sayısını uyarıda gösteren iPhone"
author: "Nicolo Stanciu"
metaTitle: "NFC okutma sayacı verisini iOS Kısayolları ile çözümle"
metaDescription: "NFC okutma sayacı içeriklerini (tag kimliği ve okuma sayısı) çözümleyen, yeniden kullanılabilir bir iOS kısayolu ve tag uyarısı demosu. Hazır iCloud bağlantıları, kurulum yok, özelleştirmeye hazır."
ogTitle: "NFC okutma sayacı verisini iOS Kısayolları ile çözümle"
ogDescription: "NFC okutma sayacı için hazır iOS kısayolları: yeniden kullanılabilir bir çözümleyici ve bir tag uyarısı demosu."
---

Bir hafta önce [NFC okutma sayacının nasıl çalıştığını anlatmıştım](/blog/count-nfc-tag-scans/): çip kendi okunmalarını sayıyor, uygulama yer tutucu baytlar gömüyor ve tag her okutmada taşıdığı içeriğe anlık sayıyı ve tag kimliğini yerleştiriyor. O yazı tag'in bittiği yerde, yani değerlerin telefonuna ulaştığı anda duruyor.

O günden beri aldığım soru da bir sonraki bariz soru: "tamam, tag bana `049F50824F1390x000007` veriyor, şimdi ne olacak?" iPhone kullanıyorsan ve bu değerlere bir kısayolun içinde göre davranmak istiyorsan onları çözümlemen gerekiyor. Bu, küçük ama zahmetli bir metin işi ve bunu kendin yazmak zorunda kalmanı istemem.

Ben de iki kısayol hazırladım ve iCloud bağlantısı olarak paylaşıyorum. Biri beyin. Öbürü beyni kullanan bir demo.

---

## Tag sana ne veriyor

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/ios-shortcuts-nfc-tap-counter/setup-440w.webp" alt="NFC.cool Tools'ta Tap Counter kurulumu: içerik olarak bir URL, Try it out ve açık NFC Tap Counter ile NFC Tag ID anahtarları"><p><strong>Tap Counter kurulumu.</strong> İçerik türü ve neyin ekleneceğini belirleyen iki anahtar.</p></li>
</ol>
</figure>

Kısayollardan önce, tam olarak neyi aldıklarına dair kısa bir hatırlatma; nasıl kullanacağın buna bağlı.

Okutma Sayacı kurulum ekranında tag için bir içerik türü seçiyorsun: URL, E-posta, SMS ya da Kısayol. Okutma Sayacı ve Tag Kimliği anahtarlarını açtığında uygulama o içeriğin içine yer tutucu baytlar gömüyor ve çip bunları her okumada anlık değerlerle değiştiriyor. Tag kimliği olarak `049F50824F1390`, sayı olarak `000007` alırsak dört içerik türü şöyle görünüyor:

- **URL:** `https://nfc.cool/tap-counter/` şuna dönüşüyor: [`https://nfc.cool/tap-counter/?nfc=049F50824F1390x000007`](https://nfc.cool/tap-counter/?nfc=049F50824F1390x000007)
- **E-posta gövdesi:** `Merhaba, kartım burada.` şuna dönüşüyor: `Merhaba, kartım burada. 049F50824F1390x000007`
- **SMS gövdesi:** `Sipariş onaylandı!` şuna dönüşüyor: `Sipariş onaylandı! 049F50824F1390x000007`
- **Kısayol girdisi:** `log-entry` şuna dönüşüyor: `log-entry 049F50824F1390x000007`

Yukarıdaki adres gerçek. [Canlı okutma sayacı deneme sayfamız](/tap-counter/) `?nfc=` değerini doğrudan kendi adres çubuğundan okuyacak biçimde ayarlandı; yani kendi otomasyonunu yazmadan önce değişimi görmek istiyorsan `https://nfc.cool/tap-counter/` adresine işaret eden bir tag'i iki anahtar da açıkken yaz, okut ve sayfa aldığı tag kimliğiyle sayıyı sana göstersin.

İçerik türü **Kısayol** olduğunda NFC.cool, seçtiğin kısayolu `shortcuts://run-shortcut?name=Kısayolun&input=text&text=<içerik>` üzerinden çalıştırıyor ve eklenen NFC değerleri metnin içinde hazır geliyor. Kısayolunun girdisi düz bir metin dizesi. Tek işin tag kimliğiyle sayıyı oradan geri çıkarmak.

Tag'i yazarken hangi anahtarlar açıktıysa desenin tamamını (14 onaltılık karakter, bir `x`, sonra 6 onaltılık karakter), yalnızca 14 karakterlik tag kimliğini ya da yalnızca 6 karakterlik sayıyı alabilirsin. Çözümleyici üçünü de karşılıyor.

---

## Parse NFC Tap Counter: yeniden kullanılabilir çözümleyici

[Parse NFC Tap Counter'ı kur](https://www.icloud.com/shortcuts/4c70ab3ade1a4398bb6a39edba94bf26)

Bu, beyin olan kısayol. Hiç arayüz göstermiyor, tek bir metin girdisi alıyor ve bir Sözlük döndürüyor. Bu bilinçli bir tercih: arayüzsüz bir yardımcı kısayol, kuracağın her şeyin içine temiz biçimde oturuyor ve Sözlük, başka bir kısayolun **Sözlük Değeri Al** eylemiyle tüketebileceği en kolay şey.

Sözlüğün içindekiler:

- `tagID` - 14 karakterlik onaltılık tag kimliği, anahtar kapalıysa boş dize.
- `count` - okuma sayısı ondalık sayı olarak (yani `000007` sonuçta `7`, `00000A` ise `10` çıkıyor), anahtar kapalıysa boş.
- `countHex` - özgün 6 karakterlik onaltılık sayı, olduğu gibi kullanmak istersen. Yoksa boş.
- `hasTagID`, `hasCount` - dallanma için mantıksal değerler, böylece dizeyi kendin sınamadan **Eğer hasCount doğruysa** yazabiliyorsun.
- `content` - NFC içeriği temizce sökülmüş haliyle girdi; yani kısayolunun geri kalanı girdiyi, tag onu süslemeden önceki haliyle görüyor. Girdi `?nfc=...` içeren bir adresse onu içermeyen adresi geri alıyorsun. Sonuna tag kimliği eklenmiş bir e-posta gövdesiyse gövdeyi onsuz geri alıyorsun.
- `raw` - değiştirilmemiş özgün girdi; kaydetmek ya da ona geri dönmek istersen.

Kendi kısayolundan çağırmanın tarifi üç eylem:

1. **Kısayol Girdisini Al**, metin olarak (NFC içeriği buraya geliyor).
2. **Kısayolu Çalıştır** → Parse NFC Tap Counter, girdi olarak o metinle. "Çalışırken Göster"i kapat ki görünmez kalsın.
3. **Sözlük Değeri Al** → `tagID`, `count`, `content` ya da hangi anahtarlar işine yarıyorsa onları seç.

Hepsi bu. Üçüncü adımdan sonra değerlerle ne istersen yapabilirsin: `hasTagID` üzerinden dallan, `count`'u bir nota kaydet, JSON ile webhook tetikle, aklına ne gelirse. Çözümleyici, kısayolunun sonuçla ne yapmak istediğine dair varsayımda bulunmuyor; küçük ve yeniden kullanılabilir olmasının sebebi tam bu.

Sayıyla ilgili bir not: Sözlükte metin değil, gerçek bir Sayı olarak duruyor, yani yeniden çevirmeden doğrudan bir **Hesapla** ya da **Eğer** karşılaştırmasına verebilirsin. Onaltılıktan ondalığa çevirme adımı çoktan yapıldı.

---

## NFC Tag Alert: demo

[NFC Tag Alert'i kur](https://www.icloud.com/shortcuts/f78b78c917a2417385ae25711a3e877a)

Bu, üretimde uyarı kullanmaya hiç niyetin olmasa bile ilk gün kuracağım türden bir demo. Metin olarak bir Kısayol Girdisi alıyor, çözümleyiciyi çalıştırıyor ve **NFC Tag Scanned** başlıklı, iki satırlık tek bir uyarı gösteriyor:

```
Tag ID: 049F50824F1390
Scans: 7
```

İlk bunu kurmamın sebebi, sayaç açık bir tag için var olan en hızlı akıl sağlığı denetimi olması. NFC.cool Tools'ta içerik türü **Kısayol** ve ad **NFC Tag Alert** olacak şekilde bir tag yaz, Okutma Sayacı ile Tag Kimliği anahtarlarını aç, yaz ve okut. Fiziksel tag'inden gelen gerçek değerlerle bir uyarı çıkıyor.

Uyarı beklediğin değerleri gösteriyorsa tag işini yapıyor demektir ve daha ayrıntılı bir şey kurmaya geçebilirsin. Sayı yanlışsa ya da tag kimliği yoksa sorunun kendi kısayolunda değil, tag'de (ya da yazarken seçtiğin anahtarlarda) olduğunu bilirsin. "Bu gerçekten çipin suçu mu?" türünden koca bir hata ayıklama sınıfını elemek, beş eylemlik bir kısayol kurmaya değer.

Çözümleyiciyi nasıl doğru çağıracağını merak edersen bu kısayol aynı zamanda mümkün olan en küçük çalışan örnek. Aç, beş eylemine bak, yapıyı kendi kısayoluna kopyala.

---

## Kendi kısayoluna bağlamak

Tag içeriğinin kısayoluna ulaşmasının iki yolu var. Çözümleyici ikisinden de memnun.

**Tag üzerinden (Kısayol içeriği).** Tag'i **Kısayol** içerik türüyle yaz, kısayolunu adıyla seç, istediğin anahtarları aç. Bundan sonra her okutma, NFC içeriği girdide hazır halde kısayolunu başlatıyor. Kısayolunun içinde o girdi üzerinde Parse NFC Tap Counter'ı çalıştır, `tagID` ve `count` kullanıma hazır olsun.

**Adres üzerinden (URL içeriği).** Daha yaygın durum bu. Tag bir adres taşıyor, telefonun okutunca o adresi açıyor ve sayı `?nfc=...` olarak birlikte geliyor. Okutmayı tarayıcı yerine (ya da tarayıcıyla birlikte) bir kısayolun karşılamasını istiyorsan bu da mümkün: adresi, Safari web sayfası girdisi alan bir kısayola yönlendir, sonra o adres üzerinde Parse NFC Tap Counter'ı çalıştır. Çözümleyici `?nfc=` bölümünü temizce söküyor ve adresi onsuz `content` olarak geri veriyor; sen de onu tarayıcıya, bir arayüz çağrısına ya da düz adres bekleyen başka bir yere aktarabiliyorsun.

"Her okutmayı Apple Notlar'daki bir nota kaydet" için dört eylemlik bir örnek:

1. **Kısayol Girdisini Al**, metin olarak.
2. **Kısayolu Çalıştır** → Parse NFC Tap Counter, girdiyi metin olarak vererek.
3. **Sözlük Değeri Al** → arka arkaya üç arama: `tagID`, `count` ve `content`. Her birini bir değişkende sakla.
4. **Nota Ekle** → `[Şu Anki Tarih] tag=<tagID> count=<count> url=<content>` gibi tek bir satır.

Artık tag'in kendi yazdığı, çalışan bir okutma günlüğün var. Arka uç yok, üçüncü taraf analitik yok, hiçbir yerde hesap yok.

---

## Üzerine kurabileceğin birkaç fikir

Çözümleyicinin açtığı birkaç küçük şeyi, sıfırdan icat etmen gerekmesin diye yazıyorum:

- **Tag kimliğine göre dallan.** Tek kısayol, çok tag. Bilinen her tag kimliği için bir **Eğer** eylemi ekle: ofis kapısı tag'i okutulduysa bildirimleri sustur; stüdyo tag'i okutulduysa odak modunu aç; mutfak tag'i okutulduysa zamanlayıcı başlat. Tag kimliği içeriği değil fiziksel tag'i tanımlıyor, yani her tag'e aynı adresi verip yine de her birine ayrı tepki verebilirsin.
- **N. okutmada kazanan seç.** `hasCount`'u bir karşılaştırmayla birleştir. `count` 100'e eşitse onay mesajı gönder; diğer tüm okumalarda normal işleyişi sürdür. Sırayı çip dayatıyor, kısayolun yalnızca okuyor.
- **Webhook'a gönder.** iOS uygulaması yazmadan sunucu tarafında işlem istiyorsan bunu NFC.cool'un [webhook özelliğiyle](/features/webhooks/) eşleştir: çözümlenmiş değerleri JSON olarak gönder, gerisini sunucu alsın. İki iOS eylemi ve tag'in HTTP konuşan her şeye bağlanmış oluyor.
- **Dosyaya ya da nota kaydet.** En yalını ve şaşırtıcı biçimde işe yarayanı. iCloud Drive'daki bir dosyaya ya da tek bir nota `zaman damgası, tagID, count` ekle; kaydırarak gezebileceğin ya da sonradan grafiğe dökebileceğin bir okutma günlüğün olsun. Altyapı kurmadan tek bir tag'de ilgi ölçmek için iyi.

Bunlarla güzel bir şey kurarsan görmeyi gerçekten isterim.

---

## Kısa bir teşekkür

Bu kısayolların ikisi de Federico Viticci'nin doğal dilden iOS kısayolu üreten eklentisi [Shortcuts Playground](https://github.com/viticci/shortcuts-playground-plugin) ile hazırlandı. Harika bir araç ve yayınladığı için ona teşekkür etmek istiyorum; o olmasa bu ikisi çok daha uzun sürerdi.

---

## Android için kısa bir not

Kısayollar bir Apple uygulaması, yani bu ikisi yalnızca iPhone'da çalışıyor. Ama Okutma Sayacı özelliğinin kendisi iki platformda da çalışıyor, çünkü değişim çipin içinde oluyor ve tag'i hangi telefonun okuduğunu umursamıyor. Android'de URL, E-posta ve SMS içerik türleri iOS'taki gibi davranıyor; orada benzer otomasyonlar istiyorsan Tasker ya da MacroDroid gibi uygulamalar `?nfc=...` içeren bir adresi alıp değerleri kendi metin işleme eylemleriyle çıkarabiliyor. Hat üzerindeki biçim aynı.

---

## Dene

Okutma Sayacı özelliğinin kapağın altında gerçekte nasıl çalıştığına dair daha derin açıklama [önceki yazıda](/blog/count-nfc-tag-scans/). Önce kendi otomasyonunu kurmadan sayaç açık bir tag'i iş başında görmek istersen [canlı okutma sayacı demosu](/tap-counter/) sayfamız `?nfc=` değerini doğrudan kendi adresinden okuyor: oraya işaret eden bir tag yaz, okut, sayının ve tag kimliğinin belirmesini izle.

NFC okutma sayacı özelliğinin kendisi NFC.cool Tools içinde, [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ios-shortcuts-nfc-tap-counter-tr&mt=8) ve [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ios-shortcuts-nfc-tap-counter-tr) sürümlerinde. NFC çevresinde kurduğum araçların tamamı için [NFC okuma ve yazma özelliğine](/features/nfc-reader-writer/) göz at.
