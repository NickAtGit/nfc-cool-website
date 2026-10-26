---
id: nfc-blog-013
title: "vCard NFC tag'ler iPhone'da neden çalışmıyor (ve gerçekte ne çalışıyor)"
date: 2026-04-16
tags: ["nfc-tags", "business-cards", "guides", "iphone"]
summary: "vCard'lı NFC kartvizitin Android'de çalışıyor ama iPhone'da çalışmıyor mu? iOS'un vCard verisini neden yok saydığı ve her telefonda işleyen basit çözüm burada."
image: "/assets/images/Blog/vcard-nfc-iphone-not-working.webp"
imageAlt: "Çözüm adımlarıyla vCard'lı NFC kartvizit sorununu gideren iPhone"
metaTitle: "vCard NFC tag'ler iPhone'da neden çalışmıyor | NFC.cool"
metaDescription: "vCard'lı NFC kartvizitin Android'de çalışıyor ama iPhone'da çalışmıyor mu? iOS'un tag'deki vCard verisini neden sessizce yok saydığı ve her telefonda işleyen basit çözüm burada."
ogTitle: "vCard NFC tag'ler iPhone'da neden çalışmıyor"
ogDescription: "iPhone'lar NFC tag'lerdeki vCard verisini sessizce yok sayıyor. Nedeni ve onun yerine gerçekte ne çalıştığı."
---
Yıllardır NFC uygulaması geliştiriyorum. Ve her hafta, istisnasız, biri bana bunun bir sürümünü yazıyor:

> "Merhaba, bir NFC kartvizit aldım. vCard'ımı üstüne programladım. Arkadaşımın Android'inde harika çalışıyor. Ama iPhone'uma okuttuğumda hiçbir şey olmuyor. Kartım bozuk mu?"

Kartın bozuk değil.

iPhone'un NFC tag'lerdeki vCard'ı desteklemiyor. Ve muhtemelen hiç desteklemeyecek.

Nedenini ve onun yerine ne çalıştığını anlatayım.

---

## vCard NFC tag'ler iPhone'da neden çalışmıyor

vCard verisi olan bir NFC tag'i okuttuğunda olan şu:

**Android'de:** Rehber uygulaması açılır. Kişi bilgilerini görürsün. Kaydet'e dokunursun. Bitti. Kusursuz.

**iPhone'da:** Hiçbir şey. Gerçekten hiçbir şey olmaz. Pencere yok, hata iletisi yok. iPhone'un öylece durur ve seni sessizce yok sayar.

Bunu ilk kez bir konferansta yaşadığımda, kartı okutan kişi bana *ben* bozukmuşum gibi baktı.

**Bu neden oluyor?**

Apple'ın geliştirici belgelerine göre iPhone'da arka planda NFC tag okuma yalnızca belirli veri türlerini destekliyor:

- ✓ Web adresleri (http:// ve https://)
- ✓ Telefon numaraları (tel:)
- ✓ SMS bağlantıları (sms:)
- ✗ vCard kişi dosyaları - **desteklenmiyor**

iPhone'un, vCard verisi taşıyan bir NFC tag algıladığında onu basitçe yok sayıyor. Yedek bir yol yok. Yardımcı bir hata yok. Hiçbir şey yok.

Android vCard'ları doğrudan işliyor, çünkü Google bunun mantıklı olduğuna karar verdi. Apple ise adreslerin yeterli olduğuna karar verdi.

Kuralları ben koymuyorum. Yalnızca etrafında bir şeyler kuruyorum.

---

## Peki iPhone'da bir uygulama vCard okuyamaz mı?

Teknik olarak okur. iPhone'a [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-tr&mt=8) ya da Android'e [NFC.cool Tools](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-tr) gibi bir NFC okuyucu uygulaması kurarsan ham tag verisini, vCard kayıtları dahil, okuyup kişi bilgilerini gösterebilir. Android'de [NFC.cool Tools](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-tr) bir tag'de vCard algıladığında bunu kendiliğinden yapıyor.

Ama sorun şu: **kartını okutan kişinin uygulamayı çoktan kurmuş olması gerekiyor.**

Bir tanışma etkinliğinde bu şu demek: *"Merhaba, kartımı okutmadan önce App Store'a gidip bir NFC uygulaması arar, indirir, kurulumu bekler, açar, NFC izni verir ve sonra okutur musun?"*

Karşındaki çoktan gitti. Sihir bitti.

NFC'nin bütün mesele *okut ve bitsin*. Fazladan adım eklediğin anda kaybettin.

NFC.cool Tools, NFC tag okuyup yazmak için harika; onu tam bunun için yazdım. Ama iletişim bilgini tanımadığın biriyle paylaşmak için, karşı tarafta hiçbir uygulama olmadan çalışan bir şeye ihtiyacın var.

---

## Çözüm: adres tabanlı NFC kartvizitler

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/vcard-nfc-iphone-not-working/profile-440w.webp" alt="Dokunduktan sonra açılan dijital profil: Meridian Systems'tan Rin Nakashima; Website, Blog, Reddit ve Bluesky bağlantıları ve Save Contact düğmesiyle"><p><strong>Dokun. Profil. Kaydet.</strong> Tag'deki bağlantı bu profili açar, tek dokunuş da kişiyi kaydeder.</p></li>
</ol>
</figure>

NFC kartvizit satın alırken kimsenin sana söylemediği şey şu:

**Kişi verisini tag'in üstünde hiç saklamamalısın.**

Onun yerine, dijital bir profile işaret eden bir adres sakla.

[NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-tr&mt=8) tam bunu yapıyor. vCard verisini tag'e tıkıştırmak (ki iPhone'lar orada yok sayıyor) yerine dijital profiline giden akıllı bir bağlantı saklıyoruz.

**Biri kartını okuttuğunda:**

- iPhone → Bağlantı açılır → Şık profil yüklenir → Tek dokunuşla kişi kaydedilir
- Android → Aynı deneyim → Kusursuz çalışır
- Herhangi bir akıllı telefon → Evrensel uyumluluk

Kartını alan kişi için uygulama gerekmiyor. Anlatım gerekmiyor. Sürtünme yok.

Okut. Profil. Kaydet. Bitti.

---

## Dijital profil vCard'dan neden daha iyi

Bu çözümü ilk kurduğumda Apple'ın sınırlarına karşı bir baypas sandım.

Sonra fark ettim: bu yaklaşım vCard'ların hiç olmadığı kadar *iyi*.

**vCard'ın verdiği:** Ad. Telefon numarası. E-posta. Belki bir unvan. Hepsi bu. 2005'ten kalma durağan veri.

**Adres tabanlı dijital profilin verdiği:**

▸ **Tüm bağlantıların tek yerde**
LinkedIn, Twitter, Instagram, portföyün, randevu bağlantın; hepsine tek dokunuşla ulaşılıyor.

▸ **Akıllı tanışma özellikleri**
Hani biriyle tanışıyorsun, kişisini kaydediyorsun ve iki hafta sonra "John - Konferans" yazısına bakıp John'un kim olduğunu hiç hatırlamıyorsun ya?

NFC.cool bağlamı yakalamana izin veriyor: nerede tanıştığın, ne konuştuğunuz, takip notları. Ayda 50 dolar tutmayan bir CRM gibi.

▸ **Apple Wallet ile bütünleşme**
Dijital kartvizitin Apple Wallet'ta duruyor. Fiziksel NFC kartını evde mi unuttun? Telefonunu göstermen yeterli.

▸ **İstediğin an güncelle**
İş mi değiştirdin? Yeni numara mı aldın? Profilini bir kez güncelle, bağlantın elinde olan herkes yeni bilgiyi anında görsün. Kart bastırmak yok, tag'i yeniden programlamak yok.

vCard'lar bunların hiçbirini yapamıyor. Yazdığın anda zamanda donuyorlar.

▸ **Her telefonda çalışır**
vCard'ın aksine adres tabanlı profil her akıllı telefonda çalışır: iPhone, Android, hatta yalnızca tarayıcısı olan eski cihazlar. iOS'taki [NFC.cool Business Card uygulaması](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-tr&mt=8) bir [App Clip](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-tr&mt=8) kullanıyor, yani alıcıların hiçbir şey kurması gerekmiyor. Android'de [NFC.cool Business Card](https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-tr) anında bir web profili açıyor.

---

## Sık sorulanlar

**Apple NFC tag'lerde vCard'ı hiç destekleyecek mi?**

Yıllar geçti ve Apple bu davranışı değiştirmedi. Arka planda NFC okuma, iPhone XS'ten beri adreslerle, telefon numaralarıyla ve SMS bağlantılarıyla sınırlı kaldı. Değişeceğine bel bağlamazdım.

**Bu tüm iPhone'ları etkiliyor mu?**

Evet. Arka planda NFC okuyan her iPhone (iPhone XS ve sonrası, iOS 13 ve üzeri) NFC tag'lerdeki vCard verisini yok sayıyor.

**iPhone'da vCard NFC tag'leri hiç okuyamaz mıyım?**

Yalnızca kurulu bir NFC okuyucu uygulamasıyla. iPhone'da [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-tr&mt=8) ve [Android'de NFC.cool Tools](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-tr) NFC tag'lerdeki vCard verisini okuyup gösterebiliyor. Android bunu uygulamasız, doğrudan yapıyor; iPhone bir uygulama istiyor. Ama kartvizit paylaşımında daha iyi yol [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-tr&mt=8): alıcı tarafında uygulama gerekmiyor.

**Dijital kartvizitler için hangi NFC tag'ler en iyisi?**

NTAG213 ya da NTAG215 tag'lerin hepsi gayet iyi çalışıyor. Saklanan veri yalnızca bir adres olduğu için fazla belleğe ihtiyacın yok.

**iPhone'umla NFC tag yazabilir miyim?**

Evet, [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-tr&mt=8) doğrudan iPhone'da NFC tag'lere adres ve başka veri yazmanı sağlıyor. Yaygın tüm NDEF kayıt türlerini destekliyor ve her NTAG tag'iyle çalışıyor.

---

## Özetle

NFC kartvizitin vCard verisi kullanıyorsa kitlenin yarısı için görünmez. iPhone'lar uygulama olmadan okumuyor ve her yeni tanıştığın kişiden uygulama kurmasını isteyemezsin.

Çözüm bir baypas değil, temelden daha iyi bir yaklaşım:

1. Kişi verisi yerine bir adres sakla
2. O adresi zengin bir dijital profile yönlendir
3. Kişi kaydetmeyi, bağlantı paylaşmayı ve gerisini profil halletsin

NFC.cool Business Card'ın yaptığı bu. Her konferansta, buluşmada ve tanışma etkinliğinde kullandığım şey de bu.

Ben okutuyorum. Karşımdaki kaydediyor. İkimiz de hayatımıza devam ediyoruz.

**Böyle çalışması gerekiyor.**

*NFC.cool Business Card [App Store](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-tr&mt=8) ve [Google Play](https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-tr) üzerinde. NFC.cool Tools (tag okuyucu ve yazıcı) [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-vcard-nfc-iphone-not-working-tr&mt=8) ve [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-vcard-nfc-iphone-not-working-tr) üzerinde.*
