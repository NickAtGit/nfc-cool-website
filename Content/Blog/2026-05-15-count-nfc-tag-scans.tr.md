---
id: "count-nfc-tag-scans-2026-05"
title: "Sunucu olmadan NFC tag okumaları nasıl sayılır"
date: "2026-05-15"
tags: ["nfc-tags", "guides"]
summary: "Aynı adresi 50 NFC etiketine yaz, hangisinin okutulduğunu bilemezsin. Tag kendini saymıyorsa tabii. Nasıl olduğu burada."
image: "/assets/images/Blog/count-nfc-tag-scans.webp"
imageAlt: "Telefonla okutulan ve yanında okuma sayısı yükselen NFC tag'i"
author: "Nicolo Stanciu"
metaTitle: "Sunucu olmadan NFC tag okumaları nasıl sayılır"
metaDescription: "Bir NFC tag'inin kaç kez okutulduğunu ve hangi fiziksel tag olduğunu, çipin yerleşik sayacıyla izle. Arka uç yok, internet yok. Uygulamalı rehber."
ogTitle: "Sunucu olmadan NFC tag okumaları nasıl sayılır"
ogDescription: "NFC tag'in kendi okunmalarını sayabilir. Bunu ilgi ölçmede, sınırlı üretimlerde ve sahtecilik denetiminde nasıl kullanacağın burada."
---

Diyelim aynı adresi elli NFC etiketine bastırdın ve elli ürüne, elli afişe ya da elli kartvizite yapıştırdın. Bir hafta sonra biri bariz soruyu soruyor: hangisi okutuldu? Ve kaç kez?

NFC.cool'u yıllardır geliştiriyorum ve duyduğum olağan yanıt sunucu. Elli benzersiz bağlantı üretiyorsun, hepsini bir arka uca yönlendiriyorsun ve istatistik yazılımı isabetleri saysın diyorsun. İşe yarıyor ama artık altyapı çalıştırıyor, parasını ödüyor ve o etiketler var olduğu sürece ayakta kalacağına güveniyorsun. Bu kadar basit bir soru için bu bana hep fazla hareketli parça gibi geldi.

Daha basit bir yol var ve bunca zamandır NFC çipinin içinde duruyordu. Pek çok tag kendi okunmalarını sayabiliyor. Doğru kurulumla bir tag sana kaç kez okunduğunu ve hangi fiziksel tag olduğunu, araya hiç arka uç girmeden söylüyor. Bu, insanlara göstermeyi en sevdiğim NFC numaralarından biri; işte nasıl çalıştığı ve nasıl kurulduğu.

---

## NFC okutma sayacı aslında ne

[Satın alabileceğin NFC etiketlerinin](/affiliate-links/) çoğu NTAG21x ailesinden çip kullanıyor: `NTAG213`, `NTAG215` ve `NTAG216`. Bu çiplerde, çoğu kişinin varlığından hiç haberdar olmadığını gördüğüm küçük bir özellik var: yerleşik bir sayaç. Tag her okunduğunda sayaç bir artıyor. Uygulamada ya da sunucuda değil, çipin donanımında yaşıyor. (Bu çiplerin ayrıntılı dökümünü [iPhone için NFC tag türleri](/blog/nfc-tag-types-for-iphones/) yazısında anlattım.)

Ben bunu tag'in kilometre sayacı diye anlatıyorum. Arabanın kilometre sayacı kimse bakmasa da kilometreyi sayar; NFC sayacı da okumaları aynı şekilde sayar. Sayı her zaman orada. Tek soru, onu sana gösterecek bir şeyin kurulu olup olmadığı.

NFC.cool Tools'taki NFC okutma sayacı özelliği tam bunu yapıyor ve en gurur duyduğum kısım bu. Tag'i bir kez öyle ayarlıyor ki, o andan sonra tag kendi sayısını kendi bildiriyor. Sayıya bakmak için tag'i kendin okutmana gerek yok ve başkaları okuttuğunda uygulamanın orada olmasına da gerek yok. Saymayı da bildirmeyi de tag kendi başına yapıyor.

Aynı çipler benzersiz bir tag kimliği de taşıyor: fabrikada yakılmış bir seri numarası, ağ kartındaki MAC adresi gibi. Okutma sayacı özelliği bunu da öne çıkarabiliyor ve birbirinin tıpkısı elli etiketi ayırt etmeni sağlayan şey bu.

---

## Jargonsuz, nasıl çalışıyor

Okutma sayacı açıkken tag'e içerik yazdığında uygulama bence gerçekten zekice bir şey yapıyor. Yazdığın şeyin içine bir dizi yer tutucu karakter gömüyor; sayı ile kimliğin yerine geçecek karakterler. Bu kısım, kurmuş olmama rağmen bana hâlâ biraz sihirbazlık numarası gibi geliyor.

Sonrası çipin işi. Uygulamanın içindeki yardım ekranının dediği gibi: "Uygulama içeriğine yer tutucu baytlar gömer. Her okumada çip, iPhone okumadan önce bunları anlık okutma sayısıyla (ve/veya tag kimliğiyle) değiştirir. Sunucu ya da internet gerekmez."

Yani her okutmadaki sıra şöyle. Biri telefonunu tag'e tutuyor. Çip uyanıyor, sayacını artırıyor, yer tutucuları gerçek sayılarla değiştiriyor ve ancak ondan sonra bitmiş içeriği telefona veriyor. Tag'i okutan telefon hiçbir zaman yer tutucu görmüyor; anlık sayısı çoktan gömülmüş, tam bir adres görüyor.

Aklında kalmasını istediğim şey şu: kurulumu yalnızca bir kez yapıyorsun. O ilk yazmadan sonra tag kendi başına: etiketin ömrü boyunca, her kişinin her okutmasında, her telefonda sayacak ve değiştirecek. Bu zincirde hiçbir şey internete dokunmuyor. Sayma çipte oluyor. Değiştirme çipte oluyor. Biten adresi kendi denetimindeki bir siteye yönlendirirsen kendi sunucun sayının geldiğini görür, ama bu senin tercihin, özelliğin gereği değil.

---

## Bununla gerçekte neler yapabilirsin

Kendini sayan bir tag, gerçek bir sorunla eşleşene kadar hoş bir numara gibi duruyor. İnsanlar bunun ne işe yaradığını sorduğunda dönüp durduğum dört kullanım şunlar.

**Hangi fiziksel etiketin okutulduğunu bil.** Bu yazının başındaki elli etiket sorunu. Aynı adresi her tag'e koy, tag kimliğini aç ve her okutma, geldiği tam tag'in seri numarasıyla damgalanmış olarak gelsin. Yönetecek tek adres, yine de ayırt edebildiğin elli tag.

**Ücretsiz erişimi sınırla.** Sayı her okutmayla birlikte geldiği için ona göre davranabilirsin. İlk yüz okumanın demo sürümünü, sonrakilerin başka bir yeri gördüğü bir kampanya yürüt. Sınırlı bir üretim, sayaç senin belirlediğin eşiği geçene kadar tam ödülü dağıtabilir. Tag, arkasında bir kayıt sistemi olmadan "ilk gelen alır" kuralını uyguluyor.

**İlgiyi ölç.** Tag'i kartvizite, afişe, ürün kutusuna ya da vitrine yapıştır, sayaç sessiz bir ilgi ölçütüne dönüşsün. Bir kartın iki kez mi iki yüz kez mi okutulduğunu, bunun için analitik altyapısı kurmadan görebiliyorsun.

**Gerçekliği kanıtla.** Sayaç yalnızca artıyor, geri sarılamıyor. Yalnızca artabilen bir sayıyı inandırıcı biçimde taklit etmek zor; sınırlı üretim ürünlerinde ve sahtecilik denetiminde yerini bu yüzden hak ettiğini düşünüyorum. Gerçek tag'in makul, tırmanan bir geçmişi olur; kopyasının olmaz. NFC'nin bu yanı ilgini çekiyorsa [NFC şifreli sırları nasıl güvende tutuyor](/blog/nfc-safe-encrypted-secrets/) yazısında daha ileri gittim.

Bunlardan birkaçını birleştirince şöyle bir şey çıkıyor: bir zanaatkar, ürünün numaralı her üretimine bir tag koyuyor ve hepsi aynı sayfaya işaret ediyor. Tag kimliği alıcının hangi ürünü tuttuğunu, sayı o alıcının kaç kez geri döndüğünü söylüyor ve sayı yalnızca yükseldiği için bir satıcı kopyayı sessizce özgün diye yutturamıyor. Hesap yok, veritabanı yok, aylık fatura yok; yalnızca çip işini yapıyor. Bu özelliği tam böyle bir sonuç için kurdum.

---

## Adım adım kurulum

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/count-nfc-tag-scans/1-tap-counter-440w.webp" alt="NFC.cool Tools'taki NFC Tap Counter ekranı: her okutmada dokunma sayısını ve tag kimliğini güncelleyen bir bağlantı; NTAG213, NTAG215 ve NTAG216 için"><p><strong>NFC Tap Counter.</strong> NFC Tools altında, NTAG213, 215 ve 216 tag'leri için.</p></li>
<li><img src="/assets/images/Blog/screens/count-nfc-tag-scans/2-setup-440w.webp" alt="Tap Counter kurulumu: içerik olarak bir URL, Try it out ve açık NFC Tap Counter ile NFC Tag ID anahtarları"><p><strong>Kur.</strong> İçeriği seç, sonra sayacı, tag kimliğini ya da ikisini birden aç.</p></li>
</ol>
</figure>

Özellik NFC.cool Tools'ta, hem iPhone hem Android'de. Pro (Platinum) aboneliğinin parçası, yani sayaç açık tag yazmak için ona ihtiyacın var. Daha önce hiç tag yazmadıysan [iPhone'da NFC tag nasıl yazılır](/blog/write-nfc-tags-iphone/) yazım önce temelleri anlatıyor.

1. NFC.cool Tools'u aç, **NFC Araçları** bölümüne git ve **NFC Okutma Sayacı**'na dokun.
2. Tag'in ne teslim edeceğini seç: **URL**, **E-posta**, **SMS** ya da **Kısayol**. (Kısayol yalnızca iOS'ta, çünkü Kısayollar bir Apple uygulaması; URL, E-posta ve SMS iki platformda da çalışıyor.)
3. O içeriği her zamanki gibi hazırla: bağlantıyı yaz, mesajı kur, kısayolu seç.
4. İstediğin anahtarları aç: **NFC Okutma Sayacı** anlık sayıyı ekliyor, **NFC Tag Kimliği** ise tag'in seri numarasını. Birini ya da ikisini birden kullanabilirsin.
5. Aynı içerikle bir yığın tag programlıyorsan **Toplu yazma**'yı aç, tarayıcı açık kalsın ve tag'leri arka arkaya yazabil.
6. **Önizleme**'yi denetle. Örnek değerlerle çıktıyı gösteriyor, yani onaylamadan önce sayının ve kimliğin tam olarak nereye düşeceğini görüyorsun.
7. **NFC Tag'e Yaz**'a dokun ve bir tag'i telefonunun üst kısmına tut.

Kurulumun tamamı bu ve bilerek bu kadar kısa tuttum. O andan sonra tag kendine yetiyor: uygulamayla ya da uygulamasız, onu okutan herkes için kendi sayıp bildiriyor.

Bir gün durdurmak istersen uygulama, var olan bir tag'de sayacı kapatabiliyor. Çip anlık değerleri yerleştirmeyi bırakıyor ama içerik tag'de en son yazıldığı gibi kalıyor. Bilmeye değer bir ayrıntı: değiştirmeyi kapattıktan sonra da çip içeride saymayı sürdürüyor; sayı hiç kaybolmuyor, yalnızca gösterilmiyor.

---

## Sayı ve tag kimliği nerede görünüyor

Değerlerin nereye düşeceği seçtiğin içerik türüne bağlı. İki anahtar da açıkken tag kimliği ile sayı birlikte ekleniyor: önce kimlik, sonra sayı, aralarında küçük bir `x` ile. Tag kimliği `049F50824F1390` ve sayı `000007` olduğunda her türün öncesi ve sonrası şöyle:

- **URL:** `https://example.com/page` şuna dönüşüyor: `https://example.com/page?nfc=049F50824F1390x000007`
- **E-posta gövdesi:** `Merhaba, kartım burada.` şuna dönüşüyor: `Merhaba, kartım burada. 049F50824F1390x000007`
- **SMS gövdesi:** `Sipariş onaylandı!` şuna dönüşüyor: `Sipariş onaylandı! 049F50824F1390x000007`
- **Kısayol girdisi:** `log-entry` şuna dönüşüyor: `log-entry 049F50824F1390x000007`

Değerler temiz biçimde ekleniyor, yani içeriğinin geri kalanı normal çalışmayı sürdürüyor. Bir anahtarı kapatırsan yalnızca diğerini alıyorsun: ya sadece sayı (`000007`) ya da sadece tag kimliği (`049F50824F1390`).

Burada hep aldığım soru: neden `7` değil de `000007`? Sayı onaltılık yazılıyor, yani 0'dan 9'a, sonra A'dan F'ye giden 16 tabanlı sayı sisteminde, ve altı karaktere tamamlanıyor. Yani `000007` basitçe tag'in yedinci okuması. Dokuzuncu okumayı geçince harfler görmeye başlıyorsun: `00000A` 10 demek. Tavan `FFFFFF`, yani kabaca 16 milyon okuma; gerçek hayattaki hemen hiçbir tag'in ihtiyaç duymayacağı bir pay. Tag kimliği ise daha uzun bir onaltılık dize, çipin 7 baytlık fabrika seri numarası ve sayının aksine hiç değişmiyor.

Biten adresi kendi sitene yönlendiriyorsan sunucun bu değerleri doğrudan adresten okuyor: sayıyı kaydet, bir eşikle karşılaştır ya da kimliğinden bir tag'i diğerinden ayır.

---

## Hangi tag'lere ihtiyacın var

Bu özellik çipe bağlı, yani tag önemli. NFC.cool okutma sayacı için `NTAG213`, `NTAG215` ve `NTAG216` çiplerini destekliyor. Bunlar telefonlar için satılan en yaygın NFC etiketleri, yani bulması kolay; yine de toptan almadan önce çip türünü denetlerdim. Özelliğin desteklemediği bir tag kullanmayı denersen uygulama, çalışmayacak bir şey yazmak yerine seni uyarıyor. Sessiz başarısızlığın ne kadar sinir bozucu olduğunu gördüğüm için buna özellikle dikkat ettim.

Stok yapman gerekiyorsa [önerilen NFC tag'ler](/affiliate-links/) sayfamız, kullandığımız ve üzerinde sınadığımız `NTAG216` etiketlerini listeliyor. Tag seçmeye yeniysen [iPhone'lar için farklı NFC tag türleri](/blog/nfc-tag-types-for-iphones/) rehberim ödünleri yalın biçimde anlatıyor.

---

## Birkaç kısa soru

**Sayacı sıfırlayabilir miyim?** Hayır. Çipe gömülü, tek yönlü bir sayaç ve yalnızca artabiliyor. Bu bilinçli ve açıkçası bütün mesele bu: sıfırlayabildiğin bir sayaç, sınırlı üretimlerde ya da sahtecilik denetiminde işe yaramazdı. Sıfırdan bir sayıya ihtiyacın varsa yeni tag kullan.

**Sayıyı herkes okuyabilir mi, yoksa yalnızca ben mi?** Herkes. Tag'i okutan her telefon, sayı içine gömülmüş halde bitmiş içeriği alıyor; uygulama kurulu olsun olmasın. Mesele de bu: tag kendi adına bildiriyor.

**Sonradan kapatabilir miyim?** Evet. Uygulama, çipin yer tutucuları değiştirmesini durdurabiliyor. Adres ya da mesaj tag'de kalıyor, yalnızca anlık güncellemeler duruyor. Çip içeride saymayı sürdürüyor.

**Sayaç gizli mi?** Sayı sunucuda değil, tag'de yaşıyor. Tag'i okutan herkes sayıyı içerikte görüyor ve o içerik senin denetimindeki bir sunucuya işaret ediyorsa yalnızca o sunucu görüyor. Tag kimliği ise fabrika seri numarası, kişiyi tanımlayan bir bilgi değil.

**İnternet gerekiyor mu?** Hayır. Sayma da değiştirme de çipin içinde oluyor. İnternet ancak yazdığın adres bir siteye işaret ediyorsa devreye giriyor.

---

## Dene

NFC ile çalıştığım yılların çoğunda okutma saymak, benzersiz bağlantılar ve onları toplayan bir arka uç demekti. NTAG21x sayacı bu zorunluluğu sessizce ortadan kaldırıyor: tag kendi hesabını tutuyor ve NFC.cool Tools'taki NFC okutma sayacı özelliği bunu açan şey. Daha çok insanın mümkün olduğunu bilmesini istediğim özelliklerden biri.

Tek bir tag yazmadan önce çalışırken görmek ister misin? [Canlı okutma sayacı demomuz](/tap-counter/) tam da bu yazının anlattığını yapan bir sayfa: oraya işaret eden bir tag yaz, okut ve sayfa çipin az önce verdiği okuma sayısıyla tag kimliğini sana göstersin. Araya sunucu girmiyor, yalnızca adres var.

Şu anda NFC.cool Tools içinde, [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-count-nfc-tag-scans-tr&mt=8) ve [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-count-nfc-tag-scans-tr) sürümlerinde. Kurduğum NFC araç setinin tamamını görmek için [NFC okuma ve yazma özelliğine](/features/nfc-reader-writer/) göz at.
