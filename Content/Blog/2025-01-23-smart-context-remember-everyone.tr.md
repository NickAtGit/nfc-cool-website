---
id: nfc-blog-028
title: "Tanıştığım kimseyi hatırlayamıyorum. Bu yüzden bunu kartvizit uygulamasına ekledim."
date: 2025-01-23
tags: ["business-cards", "networking", "iphone"]
summary: "Yeterince konferans ve tanışma etkinliğinden sonra fark ettim ki dijital kartvizitler yanlış sorunu çözüyordu. Ağaçları kurtarıyorlar ama bağlamı değil. Bu yüzden NFC.cool Business Card'a Akıllı Bağlam katmanını ekledim: nerede tanıştın, ne üzerine çalışıyor, neyi takip edeceksin."
metaTitle: "Akıllı Bağlam: dijital kartvizitler için hafıza yükseltmesi"
metaDescription: "Dijital kartvizitler kağıt sorununu çözüyor. İnsanları unutma sorununu çözmüyor. NFC.cool Business Card'ın Akıllı Bağlam katmanı nerede, ne zaman ve niçin sorularını yakalıyor, takvimine eşitliyor."
ogTitle: "Tanıştığım kimseyi hatırlayamıyorum. Bu yüzden bunu kartvizit uygulamasına ekledim."
ogDescription: "Dijital kartvizitler neden iletişim bilgisinden fazlasına ihtiyaç duyuyordu ve bunu düzelten Akıllı Bağlam katmanı."
image: "/assets/images/Blog/smart-context-remember-everyone.webp"
---
Yıllarca dijital kartvizit yazılımı geliştirdikten sonra beni rahatsız etmeyi sürdüren tek bir sorun kaldı: yanlış yarıyı çözmüştük.

Kağıt kart sorunu gerçek. Kartlar bayatlar, cüzdanı doldurur, kaybolur, güncellenemez. Dijital kartlar bunu düzeltti. Ama asıl tanışma sorununu düzeltmediler ve o sorun çok daha basit:

> Konferansta 50 kişiyle tanışıyorum, 20'siyle bilgi alışverişi yapıyorum ve üç hafta sonra tek bir konuşmayı bile hatırlamıyorum.

O kişinin neden rehberinde olduğunu hatırlamıyorsan telefonundaki iletişim bilgisi işe yaramaz.

---

## Eksik parça bağlam

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/smart-context-remember-everyone/1-networking-440w.webp" alt="NFC.cool Business Card'ta Networking sekmesi: Bay Area Product Summit'te tanışılan Priya Raman, Design Systems Meetup'ta Tom Alvarez, NFC Developer Day'de Hanna Vogel"><p><strong>Nerede tanıştınız.</strong> Her kişi etkinliği ve tarihi taşır.</p></li>
<li><img src="/assets/images/Blog/screens/smart-context-remember-everyone/2-context-440w.webp" alt="Bir networking kişisi: Lantern Metrics'ten Priya Raman; Add Reminder, Add Meeting ve görüşme ayrıntılarıyla"><p><strong>Sırada ne var.</strong> Hatırlatıcılar ve toplantılar, konuşma tazeyken takvime düşer.</p></li>
</ol>
</figure>

Ben de NFC.cool Business Card'a "hafıza yükseltmesi" dediğim şeyi ekledim. Bağlantı kurulduktan hemen sonra, ister NFC okutmasıyla ister App Clip ya da Konferans Modu'nun kilit ekranı QR'ıyla olsun, bağlamı yakalaman isteniyor:

- **Nerede ve ne zaman tanıştınız.** Tarih ve yerle kendiliğinden dolar, düzenlenebilir.
- **Ne üzerine çalışıyor.** Projesi, şirketi ya da odağı hakkında kısa bir not.
- **Konuşmanın öne çıkanları.** Gerçekten konuştuğunuz ve hatırlamak isteyeceğin bir iki şey.
- **Takip planları.** "Yatırımcısıyla tanıştıracak." "Pazartesi sunumu göndermeliyim."

Bu sonuncusu takvimine ve anımsatıcılarına eşitleniyor, çünkü hepimiz takip konusunda kötüyüz ve hepimizin dürtülmeye ihtiyacı var.

---

## Neden sonrasında değil, alışverişin içinde

İşin püf noktası şu: soru, kişi kaydedilir kaydedilmez, konuşma daha kafanda tazeyken çıkıyor. Beş dakika sonra bir sonraki kişiye geçmiş oluyorsun. Üç gün sonra o yapay zeka kurucusunun Austin'deki sunum yarışmasından mı yoksa Berlin'deki hackathon'dan mı olduğunu hatırlamıyorsun.

Bağlamı kişi alışverişiyle aynı akışta yakalamak, verinin gerçekten yazıya dökülmesi demek. Alternatifi, yani bağlamı gelecek hafta hafızandan elle eklemek, hiç olmuyor.

---

## Benim için neyi değiştirdi

Birkaç etkinlikte yaptığım beta denemelerinde deneyim "artık bu kartvizitler telefonumda"dan "artık elimde kimlerin ne yaptığını ve onlara ne borçlu olduğumu sorgulayabildiğim bir ağ var"a döndü.

NFC.cool Business Card'da Tanışma sekmesini açıyorum ve görüyorum: kimle nerede tanışmışım, ne konuşmuşuz, neyi takip edeceğimi söylemişim, ne hâlâ açık. Biriyle yeniden görüşünce kaydı güncelliyorum: yeni konuşma, yeni bağlam. Kart, iletişim bilgisinin donmuş bir kaydı olmaktan çıkıp ilişkinin yaşayan bir kaydına dönüşüyor.

---

## Her yolla çalışıyor

Akıllı Bağlam katmanı, kişinin rehberine hangi yolla girdiğine bakmıyor:

- **NFC okutma.** Standart akış: kartını okutuyorsun, kişiyi kaydediyorsun, bağlamı yakalıyorsun.
- **App Clip.** iOS'taki alıcılar App Clip katmanını görüyor, kişiyi kaydediyor ve aynı bağlam sorusunu alıyor.
- **Konferans Modu (kilit ekranı QR'ı).** Gürültülü ortamlarda hızlı alışveriş için kilit ekranı QR'ını göster; karşındaki kaydettiği anda aynı bağlam sorusu çıkıyor.
- **Android tarayıcısı.** Android'deki alıcılar web sayfası sürümünü açıp kişiyi kaydediyor, bağlamı da sonrasında NFC.cool Business Card uygulamasında yakalayabiliyor.

Uygulama 100 farklı kartı yönetiyor (farklı roller, farklı etkinlikler, senin farklı sürümlerin) ve Akıllı Bağlam verisi kart başına ayrı duruyor. Yani "Berlin buluşmasında tasarım danışmanı" olarak tanıştığın biri, aynı kişiyle "YC demo gününde kurucu ortak" olarak tanıştığın kayıttan ayrı.

---

## Bu neden şimdi önemli

Bunun beş yıl önce var olmamasının sebebi teknoloji değil, sürtünmeydi. Bağlamı yakalamak için ayrı bir not uygulaması açmak, karşındaki bakarken yazmak ve sonra o notları bir şekilde kişiyle eşleştirmek gerekiyordu. Çoğu kişi pes ediyordu.

NFC.cool Business Card'da yakalama, kişi alışverişinin içinde tek dokunuş. "Bunu hatırlamalıyım" ile "bu artık hatırlanıyor" arasındaki fark bu.

Kişileri her zamankinden hızlı takas ettiğimiz bir dünyada önemli olan veri kimi tanıdığın değil, onu niçin tanıdığın.

[NFC.cool Business Card'ı iPhone için indir](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-smart-context-remember-everyone-tr&mt=8). Android kullananlar aynı kartvizit ve Akıllı Bağlam özelliklerini [Android için NFC.cool Business Card](https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-smart-context-remember-everyone-tr) uygulamasında bulur.
