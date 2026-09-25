---
id: "nfc-alarm-2026-09"
title: "iPhone için NFC alarm saati: alarmı susturmak için tag'lerini okut"
date: "2026-09-24"
tags: ["announcements", "iphone", "nfc-tags"]
summary: "Gece geç saatlere kadar kod yazınca sabahları hep erteleme düğmesi kazanıyordu, ben de NFC.cool Tools'a NFC Alarmı'nı ekledim: ancak evin içine dağıttığın NFC tag'leri sırayla okuttuğunda susan bir iPhone alarmı. Nasıl çalıştığını ve Apple'ın her alarma koyduğu Durdur düğmesini nasıl aştığımı anlatıyorum."
image: "/assets/images/Blog/nfc-alarm-clock.webp"
imageAlt: "NFC etiketi yapıştırılmış bir kahve makinesinin yanında, alarm okutma halkasında 3 tag'den 2'sini gösteren bir iPhone; noktalı bir NFC tag izi koridordaki raftan geçip yatağa kadar uzanıyor"
author: "Nicolo Stanciu"
metaTitle: "iPhone için NFC alarm saati: tag okutmadan alarm susmaz"
metaDescription: "NFC tag'lerini sırayla okutmadan susmayan bir iPhone alarmı. NFC Alarmı'nı AlarmKit ile nasıl yaptım ve kilit ekranındaki Durdur düğmesini nasıl aştım?"
ogTitle: "Erteleyerek kurtulamayacağın bir alarm"
ogDescription: "NFC Alarmı, evinin içindeki NFC tag'leri tek tek okutana kadar susmuyor. iPhone'da nasıl çalıştığını anlatıyorum."
---
Bağımsız geliştirici olmanın mesai saati tanımayan kendine has bir ritmi var. En verimli kod gece yazılıyor: mesajlar kesilmiş, ev sessizleşmiş, bir bakıyorum saat gece ikiyi bulmuş. Alarm ise tabii ki her sabah aynı saatte çalıyor. Ben de erteliyorum. Bir daha. Bir daha, ta ki planladığım sabahın yarısı gidene kadar.

Buna gerçekten ne yapabileceğimi epey düşündüm. Daha yüksek sesli bir alarm mı? Bir süre sonra onu da duymadan uyumayı öğrenirdim. Telefonu odanın öbür ucuna koymak mı? Kalkar, Durdur'a basar, yatağa geri gömülürdüm. Sorun hiçbir zaman alarmı duymamak değildi. Sorun, onu susturmanın tek dokunuşla, hiç düşünmeden olabilmesiydi.

Sonra aklıma geldi: günlerimi zaten NFC tag'ler için uygulama geliştirerek geçiriyorum. Neden ikisini birleştirmeyeyim? Her sabah alarmın beni bırakması için takip etmem gereken bir tag izi kursam?

İşte **NFC Alarmı** bu ve artık iPhone'daki NFC.cool Tools'un bir parçası. Android sürümü de yakında geliyor.

---

## Yataktan kahve makinesine giden yol

Benim parkurumda üç durak var. İlk tag yatağımın hemen yanında. İkincisi koridordaki rafta. Üçüncüsü kahve makinesine yapışık.

Alarm çaldığında üçünü de, üstelik bu sırayla okutmam gerekiyor. Yatağın yanındaki tag kolay, zaten elimin altında. Ama sonra kalkıp koridora yürümem gerekiyor ve kahve makinesine vardığımda artık ayaktayım, sabahımın başladığı yerde duruyorum. O noktada yatağa dönmek saçma geliyor. Madem buradayım, bir kahve yapayım bari.

Sıralama önemli. Tag'leri istediğin sırayla okutabilseydin üçünü de komodinin üstünde tutar, yerinden kıpırdamadan işi bitirirdin. O yüzden uygulama rotadaki bir sonraki tag'i bekliyor ve yanlış tag'i okutursan bunu sana söylüyor: "Bu “Koridor” değil". Son tag'i de okuttuğunda biraz konfeti, bir "Günaydın" geliyor ve alarm o gün için kapanıyor. Ertesi sabah her zamanki gibi yine çalıyor.

Ve evet, işe yarıyor. Bu parkur beni yataktan kaldırıyor; daha önce kullandığım hiçbir alarm için bunu söyleyemem.

---

## Kaldıramadığım Durdur düğmesi

En çok kafa yorduğum kısım buydu. NFC Alarmı, Apple'ın **AlarmKit** çerçevesi üzerine kurulu. AlarmKit, uygulamaların gerçek bir alarm çalmasını sağlıyor: sessiz modda bile çalan ve Saat uygulamasındaki gibi kilit ekranını kaplayan türden. Bir alarm uygulamasının tam da ihtiyaç duyduğu şey bu, yalnız bir pürüzü var: her AlarmKit alarmı, sistemin kendisinin çizdiği bir **Durdur** düğmesiyle geliyor. Uygulama onu kaldıramıyor, gizleyemiyor, görünümünü de değiştiremiyor.

Kâğıt üzerinde durum şu: seni tag'lerine kadar yürütmekte ısrar eden bir alarm, onu tek dokunuşla bitiren bir düğmeyle birlikte geliyor. Pek iç açıcı değil.

Benim çözümüm şu: NFC Alarmı tek bir alarm değil, koca bir alarm zinciri. Uygulama, ayarladığın saatin arkasına birkaç dakika arayla ek alarmlar diziyor. Varsayılan olarak bunlar birer dakika arayla 20 tane; istersen 5, 10, 15 ya da 20 ek alarm ve 1, 2, 3 ya da 5 dakikalık aralık seçebiliyorsun. Kilit ekranında Durdur'a basmak yalnızca o an çalanı susturuyor. Bir dakika sonra sıradaki çalıyor. O sabahki zincirin geri kalanını iptal etmenin tek yolu bütün parkuru okutmak; alarmın kendisi ise ertesi gün için kurulu kalıyor.

Yani Durdur düğmesi aslında pili bir dakika dayanan bir sessize alma düğmesi.

AlarmKit, Durdur'un yanına uygulamanın kendi düğmesi için yalnızca tek bir yer bırakıyor. Çoğu alarm uygulaması oraya erteleme koyardı. Ben oraya **Tarayarak durdur** düğmesini koydum; uygulamayı doğrudan okutma ekranında açıyor. Kilit ekranında erteleme düğmesi hiç yok ve bu bilinçli bir tercih.

Kendi üstümde denerken ortaya çıkan iki küçük ayrıntı daha var:

- Sen okuturken alarmın sesi duruyor. Telefonu bir tag'e tutarken elinin içinde ciyak ciyak öten bir alarm kimsenin istemeyeceği bir şey. Ama yarıda bırakırsan zincirdeki sıradaki alarm yine de geri geliyor.
- Alarm çalarken uygulama, alarm listesinden onu kapatmana, silmene ya da düzenlemene izin vermiyor. Bu açıkları en dürüst yoldan buldum: sabahın 7'sinde insan hem çok uykulu hem de şaşırtıcı derecede yaratıcı oluyor.

---

## Acil çıkış kapısı

Tag'ler kaybolur. Kahve makinesindeki etiket düşer, bir tag bozulur ya da o gece başka bir yerde kalırsın. Hiçbir şekilde susturulamayan bir alarm berbat bir fikir olurdu, o yüzden okutma ekranında bir **Acil durdurma** seçeneği var ve tag olsun olmasın her zaman çalışıyor.

Ama senden şu cümleyi harfi harfine yazmanı istiyor:

"Lütfen dur, tüm etiketlerimi yeniden kurmam gerektiğini biliyorum."

Bunu bilerek böyle yaptım. Bu çıkışın, parkuru yürümek kadar zaman almasını istedim ki hiçbir zaman kolaya kaçmanın yolu olmasın. Bir de gerçek bir bedeli var: acil durdurma *bütün* alarmları durdurup siliyor, yani sonrasında tüm tag'lerini baştan kurman gerekiyor. Bu seçenek bir şey gerçekten bozulduğunda işe yarasın diye var, yatağın her zamankinden fazla çektiği sıradan bir salı sabahı için değil. Kendime ceza olsun diye yaptım ve gerçekten de ceza gibi.

---

## Neden NFC, neden lavabonun fotoğrafı değil

Banyo lavabonun fotoğrafını çektiren ya da diş macununun barkodunu okutturan alarm uygulamaları var. İşe de yarıyorlar. Ama bu iş için NFC'yi seviyorum, üstelik yalnızca uygulamamın adında geçtiği için değil.

Tek başına bir NFC tag'i çıplak bir parça metalden ibaret: rafta duran, bir kimlik numarasından başka hiçbir şeyi olmayan minik bir çip. NFC.cool'u geliştirirken en çok keyif aldığım şey, o çıplak metale bir anlam katmak: birkaç kuruşluk bir etiketi hayatında gerçekten bir işe yarayan bir şeye dönüştürmek. NFC Alarmı'nda tag'in üstünde herhangi bir içerik olmasına bile gerek yok. Uygulama her tag'i çip kimliğinden tanıyor ve üstüne hiçbir şey yazmıyor. Çekmecende duran o yedek etiket paketi dahil, her tag işini görüyor. Işık da umurunda değil: kameranın zorlanacağı karanlık bir koridorda bile tag okutmak sorunsuz çalışıyor ve bir yere nişan almana da gerek yok.

Henüz tag'in yoksa [NFC tag'ler için başlangıç rehberimde](/blog/nfc-tags-beginners-guide/) hangilerini alman gerektiğini anlatıyorum.

---

## Nasıl kurulur

NFC Alarmı, iOS 26 ya da sonrası yüklü bir iPhone istiyor, çünkü AlarmKit bu sürümle geldi. Onu NFC sekmesinde, **NFC Uygulamaları** altında bulabilirsin. Bir alarm oluştur, saati ve günleri seç, sonra kullanmak istediğin tag'leri, yürümek istediğin sırayla okut. Sıradakinin hangisi olduğunu bilmek için her tag'e bir ad verebilirsin. Onları seni gerçekten yataktan çıkaracak bir rotaya yerleştir. Yatağın yanı iyi bir başlangıç, mutfak daha da iyi bir bitiş.

NFC Alarmı ücretsiz ve [App Store'daki NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-alarm-clock-tr&mt=8) içinde seni bekliyor. Kahve makinen de öyle.
