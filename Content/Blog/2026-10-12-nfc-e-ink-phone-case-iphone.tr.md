---
id: "e-ink-phone-case-2026-10"
title: "E-ink telefon kılıfımı kurcaladım, artık iPhone'um ona yazabiliyor"
date: "2026-10-12"
tags: ["announcements", "iphone", "nfc-tags"]
summary: "Pilsiz çalışan o NFC e-ink telefon kılıflarından birine sahibim ve yanında gelen uygulamayı sevmedim. Ben de kılıfın telefonla nasıl konuştuğunu tersine mühendislikle çözdüm: NFC.cool Tools 7.2.0 artık DeerPhoneCase, KAZAVA, Novixand ya da TYOHINN uygulamasıyla çalışan kılıfların ekranına fotoğraf, QR kod, sıradaki etkinlik, günün ajandası ve anımsatıcılar koyabiliyor."
image: "/assets/images/Blog/nfc-e-ink-phone-case-iphone.webp"
imageAlt: "Arkasındaki e-ink ekranda siyah tepelerin üzerinde kırmızı ve sarı bir güneş görünen siyah kılıflı bir iPhone ve yanında aynı resmi NFC ile gönderen ikinci bir iPhone"
author: "Nicolo Stanciu"
metaTitle: "iPhone için NFC e-ink kılıf uygulaması: fotoğraf, takvim, QR"
metaDescription: "Pilsiz NFC e-ink telefon kılıfına iPhone'dan fotoğraf, QR kod, ajanda ve anımsatıcı yaz. DeerPhoneCase, KAZAVA, Novixand ve TYOHINN kılıflarıyla çalışır."
ogTitle: "E-ink kılıfımı kurcaladım, artık iPhone'um ona yazıyor"
ogDescription: "Pilsiz bir NFC e-ink telefon kılıfının dilini nasıl çözdüğümü ve NFC.cool'un artık ekranına neler koyabildiğini anlatıyorum."
---

Ekran titredi.

Küçük bir şey aslında. E-ink ekranlar bunu her yeniden çizimde yapar: yeni resim yerine oturmadan önce renkler arasında hızlıca gidip gelirler. Ama bu sefer o titreme benim yazdığım koddan geliyordu. Komutu iPhone'umdan, içinde pil bile olmayan bir telefon kılıfının sırtına göndermiştim. Birkaç saniye sonra bütün ekran düz, hafifçe kâğıdı andıran bir kırmızıya bürünmüştü. Başka hiçbir şey yoktu. Sadece kırmızı.

Yıllar içinde pek çok NFC özelliği geliştirdim ve o düz kırmızı dikdörtgen, hepsinin içinde en sevdiğim anlardan biri.

---

## Pili olmayan ekran

Bu kılıflardan hiç görmediysen anlatayım: sıradan bir telefon kılıfına benziyor, tek farkı arka yüzünün büyük kısmının e-ink ekran olması. E-kitap okuyucularda kullanılan türden bir ekran bu. Benimki dört renk mürekkeple çiziyor: siyah, beyaz, kırmızı ve sarı.

İçinde ne pil var ne de şarj girişi. Kılıf enerjisini telefonunun NFC alanından alıyor; bir NFC çıkartmasını okuttuğunda onu uyandıran alanın ta kendisinden. Telefon kılıfa dayalı durduğu sürece küçük bir çipe ve ekranı yeniden çizen mikrodenetleyiciye güç veriyor. Resim ekrana bir kez geldikten sonra e-ink onu orada tutmak için hiç enerji harcamıyor. Telefonun şarjı bitse de, kılıf çekmecede dursa da resim olduğu yerde kalıyor.

Ben bunu, silgisi yalnızca telefonunda olan bir sihirli yazı tahtası gibi düşünüyorum. Telefonunu yeniden yaklaştırana kadar hiçbir şey değişmiyor.

Bu kılıflar bir sürü farklı adla satılıyor ve neredeyse her markanın kendi uygulaması var. Benimki **DeerPhoneCase** adlı bir uygulamayla geldi. Diğerlerine aşağıda değineceğim.

---

## Neden resmi uygulamayla yetinmedim

Üreticilerin uygulamalarından epey bir kısmını kendi kılıfımla denedim ve birçoğu çalışıyor. Ama hepsini kullanmak gerçekten kötü bir deneyim. Yerel iPhone uygulaması değiller, çoğu şeyi yapabilmek için önce giriş yapman gerekiyor ve sonuçta resim koymaktan başka pek bir şey yapmaya niyetleri yok.

Telefonumun arkasındaki o ekrana baktığımda bir fotoğraf çerçevesi görmedim. Hep açık duran ve pil yemeyen küçük bir ekran gördüm. Sıradaki toplantım, günün ajandası ya da birinin telefonumun arkasından tarayabileceği bir QR kod için bundan iyi yer olamazdı. Resmi uygulama bunların hiçbirini yapamıyordu, bense baştan sona NFC üzerine kurulu bir uygulama geliştiriyorum. Ben de kılıfla konuşmayı NFC.cool'a kendim öğretmeye karar verdim.

---

## Kılıfın dilini çözmek

Bu işi Anthropic'in yapay zekâ modeli Claude ile birlikte yaptım. Tersine derlenmiş kodu satır satır okurken Claude'un son derece sabırlı bir ortak olduğu ortaya çıktı.

İlk fikir en bariz olanıydı: resmi iPhone uygulamasının kılıfla nasıl konuştuğuna bakmak. Buradan hiçbir şey çıkmadı. App Store'daki uygulamalar şifreli, okunacak işe yarar hiçbir şey yoktu.

Android sürümü ise bambaşka bir hikâyeydi. Kılıf beyaz etiketli bir ürün, yani aynı üreticinin uygulaması Google Play'de kendi adıyla duruyor ve Android uygulamaları tersine derlenebiliyor. Uygulamayı didik didik ettik. O koddan ve kılıfın içindeki çip hakkında internette bulabildiklerimizden (arkasında bir mikrodenetleyici bulunan bir Fudan NFC çipi) telefonla kılıf arasındaki konuşmanın tamamı ortaya çıktı:

1. Önce telefonla kılıf kısa bir el sıkışmayla tanışıyor; böylece kılıf karşısında gerçek bir uygulama olduğundan emin oluyor.
2. Bundan sonra her komut şifreli gidiyor.
3. Resim, ham piksellerden oluşan 139 paket halinde aktarılıyor. Her piksel iki bit tutuyor, bu da dört mürekkep için tam yetecek kadar.
4. Telefon kılıfa ekranı yeniden çizmesini söylüyor, sonra da işin bitip bitmediğini her saniye soruyor.

İlk testimde marifetli hiçbir şey yazmadım, bütün ekranı tek bir renge boyadım, o kadar. O kırmızı dikdörtgen buydu işte.

---

## 20 saniye engeli

Sonra gerçek resimleri denedim ve hepsi bozuk çıktı. Ekranı boydan boya kesen çizgiler, tutmayan renkler, yarım kalmış fotoğraflar.

Yeniden çizim yaklaşık 18 saniye sürüyor, bağlantı da hep 20. saniye civarında kopuyordu. Claude, iOS'un her NFC oturumunu 20 saniye sonra kestiğinden ve bu konuda yapabileceğimiz hiçbir şey olmadığından emindi. Ben buna inanmadım, çünkü resmi uygulama aynı iPhone'da bu işi becerebiliyordu.

Ben de iPhone'umu Mac'ime bağladım ve resmi uygulama resim çizerken sistem günlüğünü kaydettim. İşin püf noktası orada ortaya çıktı: iOS, oturumun tamamını değil, tag'le kurulan her *bağlantıyı* yaklaşık 20 saniyeyle sınırlıyor. Resmi uygulama görüntüyü gönderir göndermez bağlantıyı bırakıyor, saniyenin onda biri kadar sonra yeniden bağlanıyor ve kılıfın ekranı bu taze bağlantı üzerinden çizmesine izin veriyor. Önünde de koca bir 20 saniye oluyor.

NFC.cool da aynısını yapınca resimler tertemiz çıktı. İtiraf edeyim, bu konuda haklı çıkmak hoşuma gitti.

---

## NFC.cool kılıfına neler koyabiliyor

Özellik **NFC.cool Tools 7.2.0** içinde, NFC Uygulamaları altında **E-ink kılıf** adıyla duruyor. Bir tasarım seçiyorsun ve kılıfın onu nasıl göstereceğini önizlemede birebir görüyorsun. Sonra kılıfı telefondan çıkarıp iPhone'unu kılıfın arkasına yaklaştırıyorsun ve NFC penceresi kapanana kadar öyle tutuyorsun.

- **Fotoğraf**: arşivindeki herhangi bir resim, ekrana göre kırpılmış halde. Bu tasarım ücretsiz. Fotoğrafını dört mürekkebe dönüştürüyor; renk güçlendirme (Standart, Canlı ya da Maks.) ve siyah beyaz seçeneği de var.
- **Dekupe**: fotoğraftaki kişiyi, evcil hayvanı ya da nesneyi kesip çıkarıyor ve dört mürekkepten birinin renginde bir arka planın üzerine yerleştiriyor.
- **QR kodu**: NFC.cool'a kaydettiğin herhangi bir QR kod, kendi tasarımıyla, ya da içeriğini kendin yazdığın yeni bir kod. Renklerini tersine çevirebilirsin. Metin, kodun küçük ekranda okunabilir kalamayacağı kadar uzunsa uygulama seni uyarıyor.
- **Sıradaki etkinlik** ya da **Seçilen etkinlik**: takvimindeki bir sonraki etkinlik ya da kendin seçtiğin herhangi bir etkinlik.
- **Bugünün ajandası**: takviminde bugün ne varsa hepsi.
- **Anımsatıcılar**: listelerinden birindeki tamamlanmamış anımsatıcılar, üç farklı yazı boyutunda.

Takvim ve anımsatıcı tasarımları o anın fotoğrafı gibi. Kılıf, yüklediğin andaki durumu sen bir sonrakini yükleyene kadar gösteriyor. Telefonun olmadan kendini güncelleyemiyor; hiç şarj aleti istememesinin bedeli de bu.

<figure class="phone-figure" data-layout="stage">
<figcaption>Kılıf için tasarımlar</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/1-designs-440w.webp" alt="NFC.cool Tools'taki E-ink case ekranı; Photo, QR code ve Calendar and Reminders tasarımlarıyla"><p><strong>E-ink case.</strong> NFC Apps altında. Bir tasarım seç, sonra Put on case'e dokun.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/2-photo-440w.webp" alt="Photo tasarımı: kılıfın dört mürekkebiyle tepelerin üzerinde bir gün batımı; Crop ve parlaklık ayarıyla"><p><strong>Fotoğraf.</strong> Herhangi bir resim, kılıfın dört mürekkebine dönüştürülür.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/3-qr-code-440w.webp" alt="QR code tasarımı; kayıtlı bir QR kodu kılıfın mürekkepleriyle gösteriyor"><p><strong>QR kod.</strong> NFC.cool'da kaydettiğin bir kod ya da yazdığın bir kod.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/4-agenda-440w.webp" alt="15 Ekim Perşembe için Today's agenda tasarımı; 9.00 ile 19.00 arasında beş etkinlik ve Put on case"><p><strong>Bugünün ajandası.</strong> Günün takvimi, telefonun arkasında bir anlık görüntü olarak.</p></li>
</ol>
</figure>

---

## Bilmekte fayda var

**Yüklemeler arasında kılıfı dinlendir.** İki tasarımı art arda yüklersen ikincisi soluk ve gri çıkıyor. Kılıfın iki yeniden çizim arasında toparlanması için biraz zaman gerekiyor. Resmi uygulama bir dakika beklemeni istiyor ve bu, NFC.cool için de yerinde bir tavsiye.

**Kıpırdama.** Bütün iş biraz zaman alıyor, sürenin çoğunu da yeniden çizimin kendisi yiyor. Telefonu erkenden çekersen uygulama bunu sana söylüyor; tekrar denemen yeterli.

**Şimdilik yalnızca iPhone'da.** Bu özellik iPhone uygulamasında var. Android uygulamasında henüz yok.

**Hangi kılıflar çalışıyor.** Bu kılıfların çoğu, neredeyse her marka için ayrı bir uygulama yayımlayan tek bir geliştiriciden geliyor. Bulabildiğim her birini kendi kılıfımla denedim:

- **DeerPhoneCase**, **KAZAVA**, **Novixand** ve **TYOHINN** benim kılıfımla çalışıyor, NFC.cool da öyle. Kılıfın bu uygulamalardan biriyle geldiyse NFC.cool'un da onunla çalışması gerekir.
- **Bestie e-INK** ve **KINGZER** benimkiyle çalışmıyor. Resim NFC üzerinden sorunsuz gidiyor, ama kılıfın ekranı yeniden çizmesi gereken anda hiçbir şey olmuyor.
- Başka bir geliştiricinin uygulaması olan **SpaceInk+** benim kılıfımla hiç çalışmıyor. Uygulama yalnızca "device channel information mismatch" diyor.

Bu, NFC.cool'un Bestie e-INK, KINGZER ya da SpaceInk+ kılıflarıyla çalışmadığı anlamına gelmiyor. Bunlar benimkinden biraz farklı kılıflar olabilir ve ben onları deneyemiyorum. Sende bunlardan biri varsa NFC.cool'un onunla çalışıp çalışmadığını [bana yaz](/contact/). Seninki başka bir uygulama kullanıyorsa NFC.cool kılıfın henüz desteklenmediğini söylüyor ve sana **Kılıf bilgilerini gönder** düğmesini sunuyor. Bu düğme yalnızca çipin teknik ayrıntılarını gönderiyor; seni ya da kılıfını tanımlayan hiçbir şeyi değil. Böylece insanların elinde gerçekten hangi kılıfların olduğunu görüp onlara da destek ekleyebiliyorum.

**Nereden alabilirsin.** Amazon'da bu kılıflar bir sürü marka adıyla satılıyor, bazıları epey anlaşılmaz, ama arkalarında aynı kılıflar var. [Amazon'da bunlar için bir arama burada](https://link.amazon/B0hUxLZTR) (ortaklık bağlantısı). Benimkinin içinde DIY yazıyor, bazı ilanların başlığında da DIY geçiyor; yani aramak için iyi bir kelime. İlan, kılıfın kullandığı uygulamayı belirtiyorsa DeerPhoneCase, KAZAVA, Novixand ya da TYOHINN'i ara.

---

## Son söz

Sende de ilk günden beri aynı resmi gösteren böyle bir kılıf bir köşede duruyorsa, ekranına daha işe yarar bir şey koy. NFC.cool Tools [App Store'da](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-e-ink-phone-case-iphone-tr&mt=8) seni bekliyor.

Kendi gönderdiğin bir resmin e-ink ekranda titreyerek belirişini hiç izlemediysen bir dene derim. İnsana ayrı bir keyif veren birkaç saniye.
