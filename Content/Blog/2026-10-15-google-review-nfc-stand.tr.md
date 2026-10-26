---
id: "google-review-nfc-stand-2026-10"
title: "NFC ile kendi Google yorum standını nasıl yaparsın"
date: "2026-10-15"
tags: ["guides", "nfc-tags", "business-cards"]
summary: "Kafe tezgâhlarındaki o küçük Google yorum stantları, bir bağlantıya giden bir NFC tag ve bir QR koddan ibaret. Kendininkini nasıl yapacağını ve Piano Negro'nun masalarındaki stantların neden yalnızca yorum bağlantısını değil, barın NFC.cool Business Card ile hazırlanmış kartının tamamını taşıdığını anlatıyorum."
image: "/assets/images/Blog/google-review-nfc-stand.webp"
imageAlt: "Kafe masasında, üzerinde beş altın yıldız, NFC simgesi ve QR kod olan bir kartı tutan şeffaf akrilik stant; yanında beş yıldızlı yorum ekranını gösteren bir iPhone"
author: "Nicolo Stanciu"
metaTitle: "İşletmen için NFC'li Google yorum standını kendin yap"
metaDescription: "Google yorum standı bir NFC tag ve bir QR koddan ibaret. Kendin nasıl yaparsın, menünü, sosyal medyanı ve yorum bağlantını her masaya nasıl koyarsın?"
ogTitle: "Kendi Google yorum standını yap"
ogDescription: "Bir NFC tag, bir QR kod ve şeffaf bir menülük. Bir barın menüsünü, sosyal medyasını ve Google yorum bağlantısını her masaya nasıl koyduğumu anlatıyorum."
---

Son birkaç yılda her yerde çoğaldıklarını gördüm: kasanın yanında, restoran masalarında, kuaförün girişindeki tezgâhta duran küçük akrilik stantlar. Üzerlerinde "Bizi Google'da değerlendirin" yazar, beş yıldız, bir QR kod ve çoğu zaman küçük bir NFC simgesi olur. Telefonunu yaklaştırırsın, bir yorum sayfası açılır.

İşim NFC uygulaması geliştirmek, yani içlerinde ne olduğunu merak etmemem mümkün değildi. Google'a özel bir çip mi vardı? Gizli bir ortaklık mı?

Hayır. Sıradan bir NFC tag ve basılı bir QR koddan ibaretler, ikisi de aynı bağlantıya gidiyor. Bütün numara bu. Yani kendininkini bir öğleden sonrada yapabilirsin.

---

## Google yorum standının içinde aslında ne var

Bu stantlardaki NFC tag, [50'li paketler halinde satılan](/affiliate-links/) ucuz çıkartmaların aynısı. Biri üzerine tek bir web bağlantısı yazmış. Yanındaki QR kod da aynı bağlantı; telefonunda NFC olmayanlar ya da NFC'si kapalı olanlar için karelerden oluşan bir desen olarak basılmış.

Asıl ilginç olan bağlantının kendisi. Google'ın, misafiri doğrudan belirli bir işletmenin yorum formuna götüren bir URL'si var. İşletmeyi **Place ID** ile tanıyor. Google Haritalar'daki her işletmenin bir Place ID'si var; seninki henüz orada değilse Google, [İşletme Profili oluşturmayı](https://support.google.com/business/answer/2911778?hl=tr) adım adım anlatıyor. Bu bağlantıyı tag'e yazdığında, "ne güzel bir akşamdı" düşüncesinden yazılmış bir yoruma giden en kısa yol, telefonu standa yaklaştırmak oluyor.

---

## Google'ın anlatmadığı pürüzler

Kendi standını yapmadan önce, test ederken deneye yanıla öğrendiğim birkaç şeyi anlatayım.

**Bağlantı Google Haritalar uygulamasını açamıyor.** İlk denediğim şey buydu, çünkü en doğal deneyim bu gibi görünüyordu: telefonu standa yaklaştırırsın, Google Haritalar açılır, yorum penceresi aşağıdan kayarak gelir. Bağlantının bulabildiğim her türlü varyasyonunu denedim. Bunun bir yolu yok. Google, yorum bağlantılarının uygulamayı doğrudan açmasını pek istemiyor gibi.

**Tarayıcı sürümü aslında gayet iyi.** *Çalışan* şey, tarayıcıda bir sayfa açan bağlantı. Misafir orada yıldızlarını seçip hemen birkaç kelime yazabiliyor. Hızlı, hiçbir uygulama yüklemek gerekmiyor ve iPhone'da da Android'de de aynı şekilde çalışıyor.

**Misafirin Google'da oturum açmış olmalı.** Yorum ancak bir Google hesabından geldiğinde sayılıyor. Çoğu Android telefonda Google hesabı zaten açık, birçok iPhone kullanıcısı da tarayıcısında Google'a giriş yapmış durumda. Giriş yapmamış olanlardan önce oturum açmaları isteniyor. Bu konuda ne senin ne de benim yapabileceğim bir şey var. Açıkçası Google yorumlarının tamamen spama boğulmamasının bir nedeni de bu.

---

## Piano Negro'nun masalarında neden yorum bağlantısından fazlası var

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/card-top-440w.webp" alt="Piano Negro'nun NFC.cool Business Card kartı Safari'de açık; logonun altında Portekizce ve İngilizce menü, WhatsApp, Instagram, Google Haritalar ve Google yorumu bağlantıları"><p><strong>Piano Negro'nun kartı.</strong> Misafir telefonunu masadaki standa yaklaştırınca bunu görüyor.</p></li>
</ol>
</figure>

[Piano Negro](https://mycard.nfc.cool/PianoNegro/Piano-Negro), Coimbra'da 1993'ten beri açık olan bir bar. Sahibine stantları kurarken yardım ettiğimde masalara yalnızca yorum bağlantısı koymadık. Masaya yeni oturan biri henüz yorumu düşünmüyor. Menüde ne olduğunu görmek istiyor.

Bu yüzden Piano Negro'daki her masada, barın **[NFC.cool Business Card](/business-card/)** ile hazırlanmış kartını taşıyan bir stant var. Telefonu yaklaştırınca ya da QR kodu tarayınca kart açılıyor ve misafirin isteyebileceği her şey tek dokunuş uzağında:

- Portekizce ve İngilizce menü
- WhatsApp
- Instagram, TikTok ve Facebook
- Google Haritalar
- Google yorum bağlantısı ve TripAdvisor
- hatta barın Spotify çalma listesi

[Kartlarını](https://mycard.nfc.cool/PianoNegro/Piano-Negro) kendin açıp misafirin tam olarak ne gördüğüne bakabilirsin. Misafirler de kartı tam umduğun gibi kullanıyor: menüye bakıyor, barı Instagram'da buluyor, sonra da yorum bırakıyor. Hepsi aynı stanttan.

Bu düzende sevdiğim bir şey daha var: stant hiç eskimiyor. Tag ve QR kod menünün kendisini değil, kartın bağlantısını taşıyor. Menü değişince uygulamada menü bağlantısını güncelliyorsun ve her masada hemen yenisi oluyor. Yeniden baskı yok, tag'leri yeniden yazmak yok.

---

## Neye ihtiyacın var

Alışveriş listesi kısacık:

- **NFC tag'ler.** Basit bir NTAG213 çıkartma fazlasıyla yeter; bu yazıdaki bağlantılar üzerine rahatça sığıyor. Tag türlerinden emin değilsen [iPhone için NFC tag rehberimde](/blog/nfc-tag-types-for-iphones/) farkları anlatıyorum.
- **Şeffaf akrilik stantlar**, basılı kartı içine kaydırdığın türden. Menülük ya da masa standı adıyla satılıyorlar ve tanesi birkaç avro.
- **Renkli yazıcı.**
- Masa stantları için **[NFC.cool Business Card](/business-card/)**.
- Yorum bağlantısını oluşturmak ve tag'lerini parolayla korumak için **NFC.cool Tools**: [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-google-review-nfc-stand-tr&mt=8) ve [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-google-review-nfc-stand-tr).

---

## Masa standı: işletmen bir kartvizitte

Adı kartvizit anlamına gelse de Business Card'daki kartın bir kişiye ait olması gerekmiyor. Ad alanlarını boş bırakıp yalnızca işletmenin adını ve logosunu girebilirsin; kart o zaman işletmenin kartı olarak görünür.

<figure class="phone-figure" data-layout="stage">
<figcaption>Masa standını hazırlamak</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/table-1-links-440w.webp" alt="NFC.cool Business Card düzenleyicisinde Menu, WhatsApp, Instagram, Google Maps ve Google Review adlı beş bağlantı"><p><strong>Bağlantılar.</strong> Her bağlantıya misafirlerin ilk bakışta anlayacağı bir ad ver.</p></li>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/table-2-write-tag-440w.webp" alt="NFC.cool Business Card'da bir kartın eylemleri; aralarında NFC Tag'e Yaz ve QR Kodu Göster de var"><p><strong>NFC Tag'e Yaz.</strong> Kartın eylemlerinden seç, sonra telefonu çıkartmaya yaklaştır.</p></li>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/table-3-qr-code-440w.webp" alt="NFC.cool Business Card'da bir kartın QR kodu; altında Paylaş ve Fotoğraflar’a Kaydet"><p><strong>QR Kodu Göster.</strong> Fotoğraflar’a Kaydet ile basılı kart için görseli al.</p></li>
</ol>
</figure>

### Adım 1: Bağlantılarını ekle

**Bağlantılar** bölümünde **Bağlantı ekle** düğmesine dokunup misafirin arayabileceği her şeyi ekle: menün, WhatsApp, Instagram ve kullandığın diğer hesaplar, Google Haritalar'daki konumun ve Google yorum bağlantın. Menün PDF ise ona bağlantı verebilmek için dosyayı internette bir yere, örneğin web sitene koyman gerekiyor.

Her bağlantıya misafirlerinin ilk bakışta anlayacağı bir ad ver, "Menü" ya da "Bizi değerlendirin" gibi. Piano Negro'da her dil için bir tane olmak üzere iki menü bağlantısı var; böylece yurt dışından gelenler de okuyabildikleri bir menü buluyor.

Yorum bağlantın henüz yoksa NFC.cool Tools onu **Google İnceleme Bağlantısı** ile senin için oluşturur. Nasıl yapıldığını aşağıda, kasa standı bölümünde gösteriyorum.

### Adım 2: Tag'i yaz ve QR kodu kaydet

Kartın eylemlerini aç, **NFC Tag'e Yaz** seçeneğine dokun ve telefonunu çıkartmaya yaklaştır. Basılı kart için önce **QR Kodu Göster**, sonra **Fotoğraflar’a Kaydet** seçeneğine dokun. Elinde istediğin tasarıma ekleyebileceğin bir görsel olur.

### Adım 3: Yazdır ve dene

Stant için sade bir kart tasarla: logon, "Menü, Instagram ve daha fazlası" gibi kısa bir satır, QR kod ve yanında "ya da telefonunuzu buraya yaklaştırın" yazan küçük bir NFC simgesi. Kartı yazdır, standa yerleştir ve tag'i kartın arkasına, tam simgenin olduğu yere yapıştır. Akrilik ve kâğıt NFC'yi hiç engellemez, tag onların arkasından sorunsuz okunur. Yalnızca metalden uzak tut, çünkü metal engeller.

Masaya koymadan önce de birkaç farklı telefonla dene.

---

## Kasa standı: doğrudan yorum sayfasına

Piano Negro masa stantlarıyla yetiniyor. Ben sıfırdan bir dükkân kuruyor olsaydım bir stant daha eklerdim: tam kasanın yanına, üzerinde yorum bağlantısından başka hiçbir şey olmayan bir stant. İnsanlar ziyaretlerini tam orada bitiriyor. Yaşadıkları henüz akıllarında taze ve artık hiçbir şey beklemiyorlar. Telefonu bir kez yaklaştırmaları yeterli; arada menü olmadan doğrudan yorum formuna düşüyorlar.

<figure class="phone-figure" data-layout="stage">
<figcaption>Yorum bağlantısını oluşturmak</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/cashier-1-search-440w.webp" alt="NFC.cool Tools'taki Google İnceleme Bağlantısı ekranı; arama alanında Piano Negro Coimbra yazıyor ve tek sonuç var: Rua Borges Carneiro'daki Piano Negro"><p><strong>Ara.</strong> İşletmenin adını yaz ve sonuçlardan seç.</p></li>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/cashier-2-selected-440w.webp" alt="Seçili işletme olarak Piano Negro; altında Google Haritalar'da önizle ve Değerlendirme sayfasını önizle"><p><strong>Önizle.</strong> Kaydetmeden önce doğru işletme olduğundan emin ol.</p></li>
</ol>
</figure>

### Adım 1: Yorum bağlantısını oluştur

NFC.cool Tools'u aç, yeni bir NFC mesajı oluşturmaya git ve **Google İnceleme Bağlantısı** seçeneğine dokun. İşletmenin adını yaz ve sonuçlardan seç. Her sonucun altında adresi de görünüyor; şehirde benzer adlı birkaç yer varsa bu epey işe yarıyor.

Google Haritalar zaten açıksa daha da hızlı bir yol var. İşletmeni orada bul, **Paylaş** düğmesine dokun ve doğrudan NFC.cool'a gönder ya da bağlantıyı kopyalayıp yapıştır. Uygulama, işletmeyi Haritalar bağlantısından kendisi çıkarıyor.

Kaydetmeden önce **Değerlendirme sayfasını önizle** seçeneğine dokun. Misafirlerinin göreceği sayfanın aynısı açılır, böylece doğru işletme olduğundan emin olursun. Kulağa çok bariz geliyor, ama iki sokak ötede aynı adı taşıyan bir kafe gördüm. Rakibin için yorum toplamak istemezsin.

İşletmen sonuçlarda hiç çıkmıyorsa büyük ihtimalle henüz Google İşletme Profili yoktur. Aynı ekranda, Google'ın profil oluşturma rehberine giden bir bağlantı var.

### Adım 2: Tag'i yaz

Bağlantıyı kaydet ve telefonunu NFC çıkartmana yaklaştırarak tag'e yaz. Daha önce hiç tag yazmadıysan [iPhone ile NFC tag'e nasıl yazılır](/blog/write-nfc-tags-iphone/) yazımda adım adım anlatıyorum.

### Adım 3: QR kodu hazırla

Herkes telefonunu yaklaştırmayacak. Kimisi telefonunun bunu yapabildiğini bilmiyor, Android'de de NFC kapalı olabiliyor. QR kod burada yedek plan.

Uygulamanın QR bölümünde aynı **Google İnceleme Bağlantısı** seçeneğiyle bir QR kod oluştur. Oradan görsel olarak paylaşabilirsin. İstersen önce **QR Kod Stüdyosu** içinde açıp kendi renklerini ver, böylece kartın geri kalanıyla uyumlu olur. Sonra kartı "Memnun kaldınız mı? Google'da yorum bırakın" gibi bir satırla yazdır ve arkasındaki tag'le birlikte standa yerleştir.

---

## Her tag'i parolayla koru

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/password-440w.webp" alt="NFC.cool Tools'taki Parola koruması ekranı; Şifreyi Etkinleştir ve Şifreyi Devre Dışı Bırak seçenekleriyle"><p><strong>Parola koruması.</strong> NFC.cool Tools'ta, NTAG 2xx tag'ler için.</p></li>
</ol>
</figure>

Stant herkesin gözü önünde duruyor; bu, masadakiler için de kasadaki için de geçerli. Koruma olmadan NFC uygulaması olan herhangi biri yanından geçerken tag'ini bambaşka bir şeyle yeniden yazabilir, sen de bir misafir söyleyene kadar fark etmezsin.

Tag'i kalıcı olarak kilitleyebilirsin, ama ben parolayla korumayı tercih ederim. NFC.cool Tools'ta **Parola koruması** ekranını aç, **Şifreyi Etkinleştir** seçeneğine dokun, bir parola gir ve telefonunu tag'e yaklaştır. Misafirler onu eskisi gibi okuyabilir, parola yalnızca yazmak için gerekir. Üstelik kilitlemenin aksine geri alınabilir: işletmen bir gün taşınırsa ya da tag'in başka bir yere gitmesini istersen parolayı kaldırır ve yeniden yazarsın. Bu, Business Card tag'lerinde de işe yarar, çünkü parola tag'in içeriğini değil, tag'in kendisini korur. Bunun için NTAG 2xx bir tag gerekiyor, alışveriş listesindeki NTAG213 çıkartmalar gibi.

Uygulamanın parolayı senin yerine hatırlaması için **Daha sonrası için kaydet** seçeneğini aç. Parolayı kaybedersen o tag'i bir daha değiştiremezsin.

---

## Herkese sor, dürüst yorum iste

Dikkat etmeni rica edeceğim bir konu var: yorum bırakmaya *her* misafiri davet et ve beş yıldız değil, iyi ya da kötü, dürüst bir yorum iste. Google'ın yorum politikası, işletmelerin yalnızca memnun olduğunu düşündükleri müşterilerden yorum istemesine izin vermiyor. Yorum karşılığında bedava içecek ya da indirim gibi herhangi bir şey sunmak da yasak. Bu kuralları çiğnersen yorumların silinebilir, hatta başına daha kötüsü gelebilir. Açıkçası, iyisiyle kötüsüyle gerçek yorumlar bir sonraki misafire, şüphe uyandıracak kadar kusursuz bir yorum yığınından çok daha güvenilir görünür.

---

## Son söz

Google yorum standı, ürün gibi görünen ama aslında bir çıkartmadaki bağlantıdan ibaret olan şeylerden biri. Madem her masaya zaten bir çıkartma koyuyorsun, bari o çıkartma menünü, sosyal medya hesaplarını ve yorum bağlantını bir arada taşısın.

Masa stantları için NFC.cool Business Card gerekiyor: [iPhone](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-google-review-nfc-stand-tr&mt=8) ve [Android](https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-google-review-nfc-stand-tr). Google İnceleme Bağlantısı ve Parola koruması ise NFC.cool Tools'ta: [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-google-review-nfc-stand-tr&mt=8) ve [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-google-review-nfc-stand-tr). Kendi dükkânın için bir tane yaparsan fotoğrafını görmeyi çok isterim.
