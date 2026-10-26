---
id: nfc-blog-020
title: "iPhone'da NFC'ye içeriden bakış"
date: 2024-02-08
tags: ["nfc-tags", "iphone"]
summary: "NFC iPhone'da gerçekte nasıl çalışıyor: Apple Pay'in güvenli öğesinden Core NFC ile tag okumaya. Protokole, iOS geçmişine ve kısa menzilin neden kısıt değil özellik olduğuna uygulamalı bir bakış."
metaTitle: "iPhone'da NFC nasıl çalışıyor: içeriden bir bakış"
metaDescription: "iPhone'da NFC'nin uygulamalı açıklaması: protokol nasıl çalışıyor, Apple Pay'in güvenli öğesi, Core NFC ile tag okuma ve kısa menzil neden bir güvenlik özelliği."
ogTitle: "iPhone'da NFC'ye içeriden bakış"
ogDescription: "NFC iPhone'da gerçekte nasıl çalışıyor: protokol, güvenli öğe, Core NFC ile tag okuma ve iOS geçmişi."
image: "/assets/images/Blog/nfc-on-iphones-insider-look.webp"
---
Her gün kullandığımız teknolojinin çoğu arka plana karışıp kayboluyor. Okutup ödüyorsun, kilidi açıyorsun, tarıyorsun, paylaşıyorsun ve alttaki protokolü hiç düşünmüyorsun. NFC de bu sessiz tesisat parçalarından biri. NFC tag okuyup yazan bir uygulama olan NFC.cool'u yıllardır geliştirdiğim için o tesisatın içinde çoğu insanın geçireceğinden fazla vakit geçirdim. İşte iPhone'unda gerçekte nasıl çalıştığı, meraklı bir arkadaşa anlatır gibi.

---

## NFC aslında ne

**Yakın Alan İletişimi**, kısa menzilli bir kablosuz protokol: iki cihaz birbirine yaklaşık 4 cm yaklaştığında veri alışverişi yapabiliyor. Ben onu Bluetooth ile Wi-Fi'nin basitleştirilmiş, menzili çok daha kısa kuzeni gibi düşünüyorum.

O kısa menzil başta insanların kafasını karıştırıyor ama kısıt değil. Güvenlik modelinin kendisi ve bu bende oturduğunda NFC'nin tasarım kararlarının çoğu anlam kazandı. Odanın öbür ucundan yanlışlıkla bir ödeme terminaline dokunamıyorsun ve kötü niyetli bir okuyucu cüzdanındaki veriyi uzaktan sessizce çekemiyor. Bu işlere yeniysen, bu yazıdan daha geriden başlayan yumuşak bir [sıfırdan başlayanlar için NFC tag rehberi](/blog/nfc-tags-beginners-guide/) yazdım.

---

## iPhone'da NFC: kısa tarih

Apple ilk kez 2014'te iPhone 6 ve 6 Plus ile NFC donanımı gönderdi ama verici yalnızca Apple Pay'e açıktı. Üçüncü taraf uygulamalar NFC tag'leri hiç okuyamıyordu ve sonradan NFC uygulaması yazacak biri olarak bunu izlemek can sıkıcı birkaç yıldı.

Bu, **iOS 11** ile (2017) değişti. **Core NFC** çerçevesi geldi ve nihayet benim gibi geliştiricilerin NDEF tag okumasına izin verdi. Apple kapıyı sonraki sürümlerde daha da açtı: iOS 13 yazma desteğini getirdi, iPhone XS ve sonrası da arka planda sürekli tag okumayı ekledi. Bugün herhangi bir modern iPhone'da hiçbir şey açmadan tag okutabiliyorsun: işletim sistemi tanıyor ve doğru eylemi öneriyor.

---

## NFC veriyi gerçekte nasıl taşıyor

NFC cihazları her etkileşimde iki rolden birinde çalışıyor: **etkin** (güç alır, alan üretir) ya da **edilgen** (pili yok, alandan güç toplar). Biri bana NFC'nin nasıl çalıştığını sorduğunda hep döndüğüm tek fikir bu.

Apple Pay ile ödeme yaptığında etkin okuyucu senin iPhone'un. 13,56 MHz'de bir radyo alanı üretiyor. Ödeme terminalinin NFC öğesi bu alanın içinde uyanıyor, kendini tanıtıyor ve telefonunla küçük bir kriptografik yük alışverişi yapıyor. Kart verin **Güvenli Öğe**'den, yani telefondaki ayrı, donanımsal olarak yalıtılmış çipten hiç çıkmıyor. Dışarı çıkan şey tek kullanımlık bir simge.

Afişteki bir NFC etiketini okuttuğunda roller yer değiştiriyor. Afişin tag'i edilgen, pili yok. Senin iPhone'unun okuyucusu ona güç veriyor, tag üzerinde saklı NDEF kayıtlarıyla yanıt veriyor ve iOS ne yapacağına karar veriyor (adresi aç, uygulama başlat, kişi kartı göster, kısayol tetikle). O ikinci yarı, yani tag tarafı, NFC.cool'un yaşadığı yer. Hiçbir şey kurmadan iş başında görmek istersen Android'de [NFC tag'leri doğrudan tarayıcından okuyabilirsin](/online-nfc-reader/).

---

## NDEF: ortak dil

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/nfc-on-iphones-insider-look/ndef-record-440w.webp" alt="NFC.cool Tools'ta okunmuş bir kartvizit kaydı, altında ham vCard içeriği: BEGIN:VCARD, VERSION:3.0, Anna Miller için N ve FN"><p><strong>Açılmış bir NDEF kaydı.</strong> NFC.cool'un gösterdiği haliyle bir kişi kaydı, altında ham vCard.</p></li>
</ol>
</figure>

NFC vericisinin üstündeki veri katmanı **NDEF**, yani NFC Veri Alışverişi Biçimi. Ben onu kendini tanıtan küçük bir kayıt biçimi diye anlatıyorum: tag bir ya da daha çok kayıt taşıyor ve her kaydın bir türü (URI, metin, vCard, Wi-Fi bilgisi, özel MIME) ve bir içeriği var.

Gezegendeki NFC destekli her telefon NDEF konuşuyor; Android'de programlanan bir tag'in iPhone'da sorunsuz okunmasının, tersinin de geçerli olmasının sebebi bu. Mobil dünyada iOS ile Android'in gerçekten aynı standardı paylaştığı az sayıdaki yerden biri. Doğrusu, özellik yazarken en çok minnettar olduğum şey bu birlikte çalışabilirlik: bir platforma değil, bir biçime yazıyorum. Kendi kayıtlarını yazmayı denemek istersen [iPhone'da NFC tag nasıl yazılır](/blog/write-nfc-tags-iphone/) yazısında adım adım anlatıyorum.

---

## Gizlilik ve güvenlik

Anmaya değer iki savunma katmanı var ve bunlar en sık anlatmak zorunda kaldığım ikisi:

- **Menzil.** Birkaç santimetreyi gözle görülür bir anten olmadan araya girip dinlemek zor; NFC'nin tasarlandığı özgün tehdit modeli bu.
- **Simgeleştirme.** Apple Pay gerçek kart numaranı hiç göndermiyor. Her işlem, Güvenli Öğe'nin içinde üretilen bir Cihaz Hesap Numarası ile tek kullanımlık bir kriptogram kullanıyor. Ele geçirilmiş bir terminal bile bunu yeniden oynatamıyor.

Tag okumada tehdit yüzeyi başka: güvenilen şey tag'in kendisi. Tag'in üstündekini sen denetliyorsan (kendi ev otomasyonların, kendi kartvizitin) sorun yok. Halka açık bir yerde rastgele bir tag okutuyorsan bir şey olmadan önce iOS'ta yine de onay istemi görmelisin. Bir tag'in bir sırra yalnızca işaret etmesini değil, sırrı gerçekten taşımasını istediğimde kriptografik tag'lere uzanıyorum ve bunu [NFC tag'lerde güvenli, şifreli sırlar saklamak](/blog/nfc-safe-encrypted-secrets/) yazısında anlattım.

---

## Bu neden önemli

NFC, çalıştığında gözden kaybolan protokollerden biri ve üstüne bir şeyler kurmayı tam da bu yüzden keyifli buluyorum. Turnikeye, ödeme terminaline, kartvizite, akıllı hoparlöre okutuyorsun ve bir şey oluyor. Eşleştirme yok, PIN yok, uygulama açma yok. Yalnızca tek bir alışverişi yetkilendiren bilinçli, fiziksel bir hareket.

[NFC.cool Tools'u](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-on-iphones-insider-look-tr&mt=8) bu yüzden yazdım: NFC'nin tüm NDEF yüzeyini, kimse önce protokolü öğrenmek zorunda kalmadan kullanılabilir kılmak için. Her tag'i oku, her kayıt türünü yaz, işin bitince tag'i kilitle. iPhone'da ya da [Android'de](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-on-iphones-insider-look-tr).
