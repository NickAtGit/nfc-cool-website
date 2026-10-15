---
id: "nfc-reading-ipad-mac-2026-06"
title: "NFC.cool iPad ve Mac'te NFC tag'leri nasıl okuyor"
date: "2026-06-18"
tags: ["announcements", "nfc-tags"]
summary: "iPad'lerde ve Mac'lerde NFC çipi yok, bu yüzden NFC tag okuyamazlar diyordum. Harici bir USB okuyucuyla 6.15.0 sürümü bunu değiştiriyor. Nasıl çalıştığı ve nereden çıktığı burada."
image: "/assets/images/Blog/nfc-ipad-mac-external-reader.webp"
imageAlt: "Üzerinde tag duran HID OMNIKEY USB NFC okuyucunun yanındaki iPad"
author: "Nicolo Stanciu"
metaTitle: "NFC.cool iPad ve Mac'te NFC tag'leri nasıl okuyor"
metaDescription: "iPad'lerde ve Mac'lerde NFC vericisi yok, bu yüzden NFC tag okuyamıyorlardı. NFC.cool 6.15.0'da harici bir USB okuyucu bunu iPad ile Mac'te değiştiriyor. Nasıl çalıştığı burada."
ogTitle: "NFC tag okuma iPad ve Mac'e geliyor"
ogDescription: "iPad'inde ya da Mac'inde NFC çipi mi yok? Harici bir USB okuyucuyla NFC.cool 6.15.0 orada da tag okuyup yazıyor. Dürüst sınırlarıyla birlikte."
---
Geçen yıl [PragmaConf 2025](https://pragmaconference.com) için Bologna'daydım. O konferansa ilk gidişimdi ve sonradan anlaşıldı ki sonuncusu da olacaktı: düzenleyiciler devam ettiremiyor, yani katıldığım baskı sonuncusuydu. Buna hâlâ biraz üzülüyorum.

Oradayken iOS ve NFC geliştiricisi meslektaşım [Alexander Manzer](https://www.linkedin.com/in/alexander-manzer) ile sohbete daldık. Bir noktada konu, benim çoktan "imkansız" klasörüne kaldırdığım bir soruna geldi: iPad'de NFC tag okumak. iPad'lerde NFC çipi yok, o yüzden insanlara bunun basitçe yapılamayacağını söylüyordum. Alexander yapılabileceğini söyledi, doğru harici okuyucuyla, ve başlamam için küçük bir kod parçası göndermeyi önerdi. Birkaç gün sonra gönderdi de. NFC.cool'un artık iPad ile Mac'te NFC tag okuyabilmesinin sebebi o parça.

---

## Bunun çalışmayacağını söylemiştim

Mayısta, [NFC.cool Mac'e geldiğinde](/blog/nfc-cool-comes-to-mac/), Mac'in yapamadıklarına koca bir bölüm ayırmış ve NFC okumayı en başa koymuştum. Gerekçem basitti: Mac'lerde NFC vericisi yok, iPad'lerde NFC vericisi yok ve bu, benim hiçbir yazılım güncellememin düzeltemeyeceği bir donanım sınırı.

O kısım hâlâ doğru, cihazın içindeki çip için. Kaçırdığım şey şu: yerleşik çipi kullanmak zorunda değilsin. Dışarıdan takabilirsin.

---

## NFC çipi olmadan nasıl çalışıyor

Hile, harici bir USB NFC okuyucusu. Onu iPad'ine ya da Mac'ine takıyorsun, NFC.cool da doğrudan onunla konuşuyor. Kurulacak sürücü yok: Apple'ın iPadOS ile macOS'ta zaten gönderdiği akıllı kart desteği üzerinden çalışıyor, yani okuyucuyu USB-C bağlantı noktasına taktığın anda uygulama fark edip kendiliğinden ona geçiyor.

Uygulama, takılı bir harici okuyucu varsa onu tercih ediyor. iPad ya da Mac'te oyundaki tek NFC donanımı zaten o okuyucu, yani karar verilecek bir şey yok. iPhone'da ise bu, uygulamanın senin adına verdiği bir karara dönüşüyor: okuyucuyu tak, NFC.cool onu kullansın; takma, telefon kendi yerleşik NFC'sine dönsün. Ne bir ayar değiştiriyorsun ne bir mod seçiyorsun; uygulama elindeki donanımı anlayıp ona göre davranıyor.

Bunu üzerine kurduğum ve fiilen sınadığım tek okuyucu HID OMNIKEY 5022 CL. Başka USB okuyucular da çalışıyor, birkaçı aşağıdaki listede; onları deneyen kullanıcılar bildirdi.

<figure class="phone-figure" data-layout="stage" data-device="ipad">
<figcaption>USB okuyuculu bir iPad</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-1-place-tag-600w.webp" alt="Harici USB NFC okuyucu takılı bir iPad'de NFC.cool: Place tag on reader"><p><strong>Bir okuyucu tak.</strong> NFC.cool onu kendiliğinden tanır ve bir tag bekler.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-2-tag-read-600w.webp" alt="Okumadan sonra iPad'de NFC.cool: yeşil bir onay işareti ve Tag read"><p><strong>Tag'i üstüne koy.</strong> Radyo kısmını okuyucu, gerisini iPad halleder.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-3-record-600w.webp" alt="iPad'de tag'in tam kaydı: Anna Miller için bir kartvizit, altında ham vCard"><p><strong>iPhone'da göreceğin her şey.</strong> Aynı kayıtlar, aynı araçlar.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/ipad-4-sonicare-600w.webp" alt="iPad'de Sonicare Reset: yüzde 80'i kullanılmış bir fırça başlığı ve Reset Timer"><p><strong>Zor olanı bile.</strong> Bir Sonicare başlığını okuyup parola korumalı sayacına geri yazmak da çalışıyor.</p></li>
</ol>
</figure>

---

## Çalışan okuyucular

NFC.cool ile çalıştığını bugün bildiğim tüm okuyucular:

- **HID OMNIKEY 5022 CL** - üzerine kurduğum ve uçtan uca sınadığım okuyucu ([Amazon](https://amzn.to/3SNPi46))
- **HID OMNIKEY 5422** - bir kullanıcı çalıştığını bildirdi ([Amazon](https://amzn.to/4xZVEwe))
- **ACS ACR1552U-M1** - bir kullanıcı çalıştığını bildirdi ([Amazon](https://amzn.to/4xZVEwe))
- **ACS ACR1255U-J1** - bir kullanıcı çalıştığını bildirdi ([Amazon](https://amzn.to/4xZVEwe))

Yazan herkese teşekkürler. Piyasadaki her okuyucuyu satın alamam, yani ilkinden sonraki her model bu listede biri onu aldığı, denediği ve bana anlatmaya vakit ayırdığı için var. Burada olmayan bir okuyucu kullanıyorsan çalışıp çalışmadığını ya da nerede takıldığını [bana bildir](/contact/), yazıya ekleyeyim.

Bunlar Amazon ortaklık bağlantıları: birinden alışveriş yaparsan sana ek bir maliyeti olmadan küçük bir komisyon kazanabilirim.

---

## Bununla neler yapabilirsin

<figure class="phone-figure" data-layout="float" data-device="mac">
<ol>
<li><img src="/assets/images/Blog/screens/nfc-reading-ipad-mac/mac-1-my-messages-800w.webp" alt="Yanında harici bir USB NFC okuyucu olan bir MacBook; ekranda NFC.cool'un My NFC Messages'ı"><p><strong>Mac'te de.</strong> Okuyucuyu Mac'ine tak, okuduğun her tag My NFC Messages'a düşer.</p></li>
</ol>
</figure>

iPhone'da yapacağın hemen her şeyi. Tag okuyup tüm belleğini dökebilir, NDEF mesajı yazabilir ve bir yığın tag'i arka arkaya okuyup yazan toplu işler çalıştırabilirsin. Tag'i parolayla korumak da işliyor. 3B yazıcı filament makarası biçimi [OpenPrintTag](/blog/openprinttag-read-write-nfc-spools-phone/) da, iki yönde de. Ve evet, [Philips Sonicare fırça başlığı sıfırlaması](/blog/reset-sonicare-brush-head-nfc/) da çalışıyor.

Zor kısım sonuncusuydu. Sonicare başlığını sıfırlamak, tag'den bir sayacı okuyup ardından parola korumalı bir sayfaya geri yazmak demek ve tag bu yazmayı ancak seni az önceki kimlik doğrulamasından hâlâ tanıyorsa kabul ediyor. Harici okuyucu üzerinden bu, iki adım arasında okuyucuyla tek bir oturumu kapanmasına izin vermeden açık tutmak anlamına geldi. Bu tutunca ona bağlı işlemler, yani korumalı yazmalar ile fırça sıfırlaması, telefondaki gibi davranmaya başladı.

---

## Dürüst sınırlar

Birkaç şey hâlâ yerinde değil ve bunları senin keşfetmeni beklemektense söylemeyi yeğlerim.

- Kendi sınadığım tek okuyucu OMNIKEY 5022 CL. Yukarıdaki listedeki diğerleri kullanıcı bildirimlerinden geliyor, o listenin ötesi ise doğrulanmamış alan.
- MIFARE Classic tag'ler okuyucu üzerinden salt okunur. Okuyabilirsin, yazamazsın.

Bunların hiçbiri çoğu kişinin kullanım biçimini bozmuyor ama gerçekler ve okuyucu almadan önce bilmek isteyeceğim türden şeyler.

---

## Teşekkürler Alexander

Bunun nereden geldiği konusunda açık olmak istiyorum. Oturup icat etmedim; Alexander bana ipin ucunu verdi, ben de çektim. O kodu paylaşmak zorunda değildi, paylaştığı için minnettarım. Sonrasında bu kadar peşine düşmemin bir sebebi de açık: NFC.cool'un gerçekten NFC tag okuyabilen ilk iPad uygulaması olmasını istedim. En baştaki o olsun olmasın, oraya varmak emeğe değdi.

iPad ve Mac'te NFC tag okuma NFC.cool 6.15.0 ile geliyor. iPad'in ya da Mac'in, desteklenen bir okuyucun ve masandan bugüne dek hiç okutamadığın bir tag'in varsa öylece çalışacak.

Okuyucuya mı ihtiyacın var? HID OMNIKEY 5022 CL [Amazon'da](https://amzn.to/3SNPi46) burada; bağlantı seni kendi ülkendeki Amazon mağazasına götürüyor. Bu bir ortaklık bağlantısı: birinden alırsan sana ek bir maliyeti olmadan küçük bir komisyon kazanabilirim ve bu da NFC.cool'a ayrılan emeği finanse etmeye yarıyor.

[NFC.cool Tools'u iPhone, iPad ve Mac için indir](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-reading-ipad-mac-tr&mt=8)

Bologna'daki o son PragmaConf'ta olduysan: iyi bir konferans için teşekkürler. Keşke bir tane daha olacak olsaydı.
