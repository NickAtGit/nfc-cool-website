---
id: "ntag-424-dna-2026-07"
title: "NTAG 424 DNA: sahte olmadığını kanıtlayan NFC tag'ler"
date: "2026-07-24"
tags: ["announcements", "nfc-tags", "industry"]
summary: "Lüks markaların bir ürünün gerçek olduğunu kanıtlamak için NTAG 424 DNA tag kullandığını duydum, ben de ne yaptıklarını görmek için AliExpress'ten bir parti aldım. Meğer bunlar, üstüne kriptografik bir katman eklenmiş NFC okutma sayacıymış. NFC.cool Tools artık onları iPhone ve Android'de okuyor, doğruluyor ve baştan sona ayarlıyor: her anahtar, her dosyanın izinleri ve çipin kendi ayarları."
image: "/assets/images/Blog/ntag-424-dna-counterfeit-proof-nfc-tags.webp"
imageAlt: "Güvenlik kalkanı ve anahtar simgeleri gösteren bir iPhone'un yanında, NFC doğrulama tag'i taşıyan deri çanta"
author: "Nicolo Stanciu"
metaTitle: "NTAG 424 DNA: sahtecilik karşıtı NFC tag anlatılıyor"
metaDescription: "Markaların bir ürünün gerçek olduğunu nasıl kanıtladığını görmek için NTAG 424 DNA tag aldım. Bu sahtecilik karşıtı NFC tag'ler nasıl çalışıyor ve NFC.cool onları nasıl okuyup doğruluyor ve programlıyor."
ogTitle: "Sahte olmadığını kanıtlayan NFC tag'ler"
ogDescription: "NTAG 424 DNA tag'ler kopyaları nasıl yakalıyor ve NFC.cool onları iPhone ile Android'de nasıl okuyup doğruluyor ve ayarlıyor."
---

Bir süre önce aynı iddiayı geçerken defalarca okudum: lüks markalar ürünlerine NFC çipi koyuyormuş, sen de çantaya ya da spor ayakkabıya telefonunu okutup gerçek mi sahte mi anlıyormuşsun. Her yazı aynı parlak cümleyi kuruyor ve hiçbiri *nasıl* olduğunu söylemiyordu. Bir sahteciyi, çantayla birlikte çipi de kopyalamaktan alıkoyan şey tam olarak neydi?

Ben de bir tag'i merak ettiğimde hep yaptığım şeyi yaptım. AliExpress'e girdim, "NTAG 424 DNA" tag ilanı buldum, küçük bir parti sipariş ettim ve zarfın gelmesini bekledim. Birkaç avro, birkaç hafta ve o marka koruma sistemlerinin üstüne kurulduğu silikonun aynısı masamdaydı. Sonra ne yaptığını görmek için birini okuttum.

---

## NTAG 424 DNA tag aslında nedir

Dışarıdan sıradan bir NFC tag. Bir yığın ucuz tag'in arasından ayırt edemezsin ve her telefon onu şikayetsiz okur. [NFC tag türleri rehberimi](/blog/nfc-tag-types-for-iphones/) okuduysan, iPhone'unun okumaktan memnun olduğu bir Tip 4 tag daha olarak yerine oturuyor.

Farklı olan kısım "DNA". Çipin içinde birkaç AES-128 anahtarı ve küçük bir kriptografi motoru var; düz bir NTAG215'in ya da çoklu paketten çıkan bir etiketin yapamayacağı bir şeyi yapabiliyor: her okutmayı tek tek *imzalayabiliyor*. Bütün mesele o imza. "Al sana bağlantı" diyen bir tag ile "al sana bağlantı ve şu anda onu sunanın ben, yani bu belirli gerçek çip olduğunun kriptografik kanıtı" diyen bir tag arasındaki fark bu.

Lüks markaların gerçekte parasını ödediği şey de bu: bağlantının kendisi değil, onu sunanın gerçek bir çip olduğunun kanıtı.

---

## SUN ve SDM nasıl çalışıyor: her okutmada kendini yeniden yazan bağlantı

Kafamda oturduğu an şu oldu. Tag'in gerçekte ne gönderdiğine baktığımda, bunu anlamak için gereken düzeneğin çoğunu çoktan kurmuş olduğumu fark ettim.

Bu yılın başında bir [NFC okutma sayacı özelliği](/blog/count-nfc-tag-scans/) yayınladım: kaç kez okunduğunu sayan ve o sayıyı adrese koyan, böylece bir bağlantının bunun 47. okutma olduğunu bilebildiği bir tag. NTAG 424 DNA tag de aynı fikir, üstüne taklit edilmesini olanaksız kılan bir şifreleme katmanı sarılmış hali.

Mekanizmanın adı **SUN** (Güvenli Benzersiz NFC) ya da [NXP'nin veri sayfasını](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf) okuyorsan **SDM** (Güvenli Dinamik Mesajlaşma). Tag'e `https://example.com` gibi normal bir bağlantı yazıyorsun. Ama çipe, her okutulduğunda o bağlantının bazı parçalarını anında yeniden yazmasını söylüyorsun. Yani telefonunun gerçekte aldığı şey şuna benziyor:

`https://example.com/?picc_data=A1B2...&cmac=9F3C...`

Bu iki değer süs değil. `picc_data`, tag'in gerçek kimliğinin ve bir okutma sayacının, çipten hiç çıkmayan bir anahtarla karıştırılmış şifreli kopyası. `cmac` ise o verinin üstüne atılmış kriptografik imza. İkisi de her okutmada değişiyor. Aynı tag'i iki kez okut, birbirinden tamamen farklı iki adres al; her biri çip tarafından o an taze imzalanmış.

Düz bir NFC tag'i, dükkan vitrinindeki basılı bir tabela gibi düşünüyorum. Herkes fotoğrafını çekip birebir aynısını bastırabilir. SUN tag'i ise daha çok, her girişinde sana ayrı ayrı numaralanmış ve mühürlenmiş yeni bir fiş veren güvenlik görevlisi gibi. Dünkü fişi kopyalaman işine yaramıyor, çünkü bugünün numarası farklı ve yalnızca görevlinin mührü gerçek.

---

## Kopyalanmış bir NTAG 424 DNA tag neden yakalanıyor

İlk sorumu yanıtlayan kısım bu. Bir sahteci tag'in *içeriğini* kesinlikle kopyalayabilir. Adresi okur, bayt bayt kopyalar ve boş bir çipe programlar. Bu hep böyleydi.

Yapamadığı şey, bir sonraki geçerli imzayı üretmek. İmzalama anahtarı gerçek çipin içinde yaşıyor ve okutma sırasında bile dışarı çıkmıyor. Yani bir okutma, ancak anahtarı gerçekten elinde tutan bir şey için değer taşıyor. Gerçek bir marka koruma düzeneğinde tag'in bağlantısı, üreticinin işlettiği bir sunucuya işaret ediyor ve her okutmayı çözen, anahtarın tuttuğunu doğrulamak için imzayı yeniden hesaplayan ve sayacı tırmandıkça izleyen o sunucu oluyor.

Kopyayı yakalayan da son kısım. Sahtecinin taklide koyabileceği tek adres, gerçek bir okutmadan yakaladığı ve o okutmanın taşıdığı sayaçla donmuş olan adres. Onu yeniden gönderdiğinde sunucu, daha önce gördüğü bir sayıya bakıyor ve gerçek bir çipin sayacı yalnızca ileri gittiği için tekrar ya da geri adım, kopyayı ele veriyor. İmzası hâlâ tutan, taze ve daha yüksek bir sayaç göndermek için anahtara ihtiyacı var; anahtarı almak için de ya AES'i kırması ya da çipi fiziksel olarak açması gerekiyor. Sahte bir çanta için ikisi de olacak iş değil.

Pazarlama cümlesinin dürüst hali bu. Çip, *ürünün* kopyalanmasını olanaksız kılmıyor. *Gerçeklik kanıtının* kopyalanmasını olanaksız kılıyor ve o kanıtı, sahtecinin üretemeyeceği bir şeye taşıyor.

---

## Çipin içinde ne var

NFC.cool'un bu tag'lerle yaptığı her şey, çipin yerleşimi kafanda oturunca daha anlamlı geliyor; işte tek satır kod yazabilmeden önce kurmam gereken harita.

NTAG 424 DNA, 416 baytlık belleği olan bir NFC Forum Tip 4 tag'i ve bellek, sabit üç dosya taşıyan tek bir uygulama olarak düzenlenmiş. MIFARE DESFire'da yapabildiğin gibi dosya oluşturamıyor ya da silemiyorsun. Elindekiler bu üçü:

| Dosya | Boyut | Ne taşıyor |
| --- | --- | --- |
| Dosya 01 | 32 bayt | Telefona NDEF verisinin nerede olduğunu söyleyen yetenek kabı |
| Dosya 02 | 256 bayt | NDEF mesajı, genelde bağlantın. SUN her okumada anlık değerlerini bu dosyaya yansıtıyor |
| Dosya 03 | 128 bayt | Çipin şifreli tutabildiği, üreticiye özel bir dosya. NFC.cool bunu kasa olarak kullanıyor, aşağıda daha fazlası var |

Dosyaların yanında beş AES-128 anahtarı duruyor: Anahtar 0'dan Anahtar 4'e. **Anahtar 0** uygulama ana anahtarı: bağlantıyı değiştirmek, SUN'ı açmak, başka bir anahtarı değiştirmek ya da çipin yapılandırmasına dokunmak için onunla kimlik doğruluyorsun. Anahtar 1'den 4'e kadar olanlar tek başlarına hiçbir şey yapmıyor. Ancak bir dosyanın erişim hakları ya da SUN kurulumu onlara işaret ettiğinde anlam kazanıyorlar. Yeni bir tag'de beş anahtarın hepsi on altı sıfır bayt ve NDEF dosyasını herkes yazabiliyor; yepyeni bir tag'in düz bir bağlantıyı hiç merasimsiz kabul etmesinin sebebi de bu.

Bir şeyi değiştiren her komut, kimliği doğrulanmış bir oturumun içinde çalışıyor: telefonla çip o anahtarlardan biriyle karşılıklı soru cevap yapıyor, bundan oturum anahtarları türetiyor ve o andan sonra her komut ya bir MAC taşıyor ya tamamen şifreleniyor. Yazının geri kalanının sürekli andığı güvenli mesajlaşma bu. NFC.cool bunu hem iPhone'da hem Android'de eksiksiz uyguluyor ve aşağıda anlatılan her yazma bunun içinden geçiyor.

---

## Bir okutma sana ne gösteriyor

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/ntag-424-dna-counterfeit-proof-nfc-tags/1-tap-440w.webp" alt="Bir NTAG 424 DNA tag'i okutulduktan sonra NFC.cool Tools: imzalı bağlantı, 137 okuma sayacı ve Authentic durumundaki SUN doğrulaması"><p><strong>Gerçek bir okutma.</strong> İmzalı bağlantı, okuma sayacı ve geçilen SUN kontrolü.</p></li>
</ol>
</figure>

Tag'i telefonuna tut, [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-tr&mt=8) ya da [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-tr) üzerindeki NFC.cool Tools senden hiçbir şey istemeden derin bir okuma yapsın: çipin kimliği ve TagTamper türevi olup olmadığı, bağlantı, her dosyanın ayarları ve erişim hakları, hangi anahtar yuvalarının fabrika değerinden değiştirildiği ve üç ayrı denetimin sonuçları.

### Gerçek NXP silikonu mu?

Her NTAG 424 DNA fabrikadan bir **özgünlük imzasıyla** çıkıyor: çipin kendi yedi baytlık UID'si üzerine, NXP'nin özel anahtarıyla ve P-224 eğrisiyle atılmış bir ECDSA imzası. NFC.cool bunu okuyup NXP'nin yayımlanmış açık anahtarına karşı doğruluyor; doğrudan telefonda, senden hiçbir anahtar istemeden. Tutuyorsa uygulama "Gerçek NXP" gösteriyor. Bu, ilk soruyu yanıtlıyor: bu gerçek NXP silikonu mu, yoksa yalnızca aynı ada yanıt veren bir benzer çip mi?

### Bu okutma gerçek mi?

Bu, SUN denetimi. Uygulama, tag'in az önce sunduğu bağlantıdaki `picc_data` ile `cmac`'ı alıyor, UID'yi ve okuma sayacını elde etmek için PICC verisini çözüyor, CMAC'ı yeniden hesaplıyor ve tag'in gönderdiğiyle karşılaştırıyor. İkisi tutuyorsa "Gerçek" görüyorsun ve sayaç Okuma Sayacı olarak beliriyor.

Bu denetim tag'in anahtarını istiyor, çünkü bütün mesele bu. Hâlâ fabrika anahtarlarında olan bir tag, tamamı sıfır olan anahtarla doğrulanıyor. Kendi anahtarınla kilitlediğin bir tag, NFC.cool'un ayarlarken sakladığı anahtarla doğrulanıyor. Başkasının, sende olmayan bir anahtarla kilitlediği bir tag ise "Doğrulanmadı" gösteriyor; doğru yanıt da bu.

### Mühür kırılmış mı?

Bu çiplerin bir sürümü, **NTAG 424 DNA TagTamper**, kurcalamayı belli eden bir mühür olacak biçimde üretilmiş. İçinden ince, iletken bir halka geçen bir etiket. Korumak istediğin şeyin üstüne, kutunun kapağına ya da şişenin kapağının çevresine yapıştırıyorsun; bugün "sökülürse garanti geçersiz" etiketlerinin yaptığı işin aynısı. Ürünü açtığında etiketi yırtıyorsun ve halka kopuyor.

Çip o halkayla ilgili iki şey izliyor: *hiç* açılıp açılmadığını kaydeden kalıcı bir mandal ve şu anki canlı durum. NFC.cool her okutmada ikisini de okuyup "Mühürlü", "Açılmış" ya da en önemlisi "Açılmış, yeniden mühürlenmiş" bildiriyor: biri halkayı kırmış ve sonra özenle yeniden kapatmış. Mandal tek yönlü, yani yeniden mühürlenmiş bir kutu çipin ömrü boyunca açılmış olarak okunuyor. Kriptografi çipin gerçek olduğunu kanıtlıyor. Bu ise kutuya kimsenin girmediğini kanıtlıyor.

---

## Kendi tag'ini programlamak: kısa yol

Okuma işin yarısı. Diğer yarısı, AliExpress'ten aldığın o boş tag'lerin senin programlaman için orada olması ve en yalın kurulumun üç adım sürmesi.

1. **Bağlantını yaz.** Sıradan bir NDEF yazma; her tag'deki gibi.
2. **SUN'ı aç.** Uygulama bağlantını yer tutucularla yazıyor ve çipe, her okumada şifreli UID'sini, okutma sayacını ve imzasını o yer tutuculara yansıtmasını söylüyor. Bundan sonra her okutma benzersiz, imzalı bir adres üretiyor.
3. **Kendi Anahtar 0'ını belirle.** Bu, fabrika sıfırlarını yalnızca senin bildiğin bir anahtarla değiştiriyor, böylece tag'i başkası yeniden ayarlayamıyor.

Son adımda anahtar değil, bir parola yazıyorsun. NFC.cool AES anahtarını ondan türetiyor: parolanın SHA-256 özetinin ilk 16 baytını alarak, iPhone'da da Android'de de aynı şekilde. Böylece birinde hazırladığın tag'i diğerinde aynı parolayla açıyorsun. Başka bir yerde, örneğin kendi sunucunda üretilmiş bir anahtarı yeğliyorsan 32 onaltılık karakteri yapıştırabilirsin.

Kaybolan anahtar, bir daha asla yeniden ayarlayamayacağın bir tag demek; bu yüzden uygulama anahtarın nereye gittiği konusunda titiz. iPhone'da Anahtar Zinciri'ne düşüyor ve iCloud Anahtar Zinciri ile eşitleniyor. Android'de donanım destekli bir anahtarla şifrelenip Block Store'a yansıtılıyor, böylece yeniden kurulumdan ya da yeni telefondan sağ çıkıyor. Yeni anahtar, değişiklik gönderilmeden önce kaydediliyor ve okutma değişikliğin ortasında kesilirse tag hangisini taşıdığını doğrulayana kadar hem eski hem yeni değer elde kalıyor. Başka bir cihazda belirlediğin bir parola da girilebiliyor ve uygulama kaydetmeden önce onu tag'e karşı denetliyor.

Uygulamanın bilerek reddettiği bir şey var: SUN açık bir tag'e, sıradan yazma ekranından düz bir bağlantı yazmak. Yansıtma konumları, ayarlandıkları adrese göre sabit; başka uzunlukta bir adres, çipin her okutmada yeni içeriğinin ortasına yansıtma yapmasına yol açardı. NTAG 424 ekranı önce SUN'ı kapatıyor, sonra yazıyor.

---

## Çipin geri kalanı

Çoğu anlatım o kısa yolda duruyor ve şimdiye dek daha ileri gitmenin yolu, USB okuyuculu bir masaüstünde NXP'nin TagXplorer'ıydı. Ben veri sayfasının tamamına telefondan ulaşılabilmesini istedim, o yüzden bölüm bölüm indim.

<figure class="phone-figure" data-layout="stage">
<figcaption>Çipin geri kalanı, telefonunda</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/ntag-424-dna-counterfeit-proof-nfc-tags/2-key-0-440w.webp" alt="Anahtar 0 ekranı: anahtarı paroladan ya da onaltılık olarak ayarlama, başka bir cihazda ayarlananı girme veya fabrika değerine dönme"><p><strong>Anahtar 0.</strong> Paroladan ya da onaltılık bir anahtardan ayarla, başka bir cihazda ayarladığını gir ya da fabrika değerine dön.</p></li>
<li><img src="/assets/images/Blog/screens/ntag-424-dna-counterfeit-proof-nfc-tags/3-advanced-440w.webp" alt="Gelişmiş ekranı: çipin kimliği, belleği, açık SUN ve Anahtar 1'den 4'e kadar"><p><strong>Gelişmiş.</strong> Çipin kimliği ve diğer dört anahtar; her birinde Anahtar 0'la aynı seçenekler var.</p></li>
<li><img src="/assets/images/Blog/screens/ntag-424-dna-counterfeit-proof-nfc-tags/4-vault-440w.webp" alt="Bir not saklayan Kasa ekranı, 126 baytın 36'sı dolu"><p><strong>Kasa.</strong> Yalnızca senin Anahtar 0'ının geri okuyabildiği en fazla 126 bayt metin.</p></li>
</ol>
</figure>

### Beş anahtarın hepsi

Anahtar 0'ın kendi ekranı var, Anahtar 1'den 4'e kadar olanlar ise Gelişmiş altında. Her biri paroladan ya da onaltılıktan ayarlanabiliyor, fabrika değerine döndürülebiliyor veya başka bir cihazda belirlendikten sonra girilebiliyor. Her değişiklik Anahtar 0 ile kimlik doğruluyor; beş yuvanın da değişim yetkisi onda.

### İstediğin anahtarlarla SUN

SUN'ı açmak tek bir anahtar değil. **Modu** seçiyorsun: UID'nin `picc_data` içinde yolculuk ettiği ve yalnızca anahtar sahibinin okuyabildiği şifreli mod, ya da UID ile sayacın adreste açıkça göründüğü ve yalnızca imzanın gizli kaldığı düz mod. Bir de işi hangi anahtarların yapacağını seçiyorsun: PICC verisini şifreleyen bir **üst veri okuma anahtarı** ve imzayı hesaplayan bir **dosya okuma anahtarı**. Bunlar aynı yuva olabilir ya da iki farklı yuva; bir markanın, UID'leri çözen anahtarı vermeden okutmaları doğrulayan anahtarı bir iş ortağına verebilmesinin yolu da bu.

Hâlâ fabrika sıfırlarında olan bir yuva seçersen uygulama seni uyarıyor, çünkü bilinen bir anahtarla atılmış imza hiçbir şeyi korumuyor. Doğrulama tarafı da aynı çeşitliliği anlıyor: Anahtar 3 ile imzalanıp Anahtar 1 ile şifrelenmiş bir okutma, o anahtarlar telefonda saklı olduğu sürece doğru biçimde doğrulanıyor.

### Dosya erişim hakları

Her dosya dört izin taşıyor: Okuma, Yazma, Okuma ve Yazma ile Değiştirme; sonuncusu diğer üçünü kimin düzenleyebileceğini belirliyor. Her izin beş anahtardan birine, Serbest'e (herkes) ya da Asla'ya (hiç kimse) işaret ediyor. Yani "Dosya 02'yi herkes okuyabilir, yalnızca Anahtar 2 yazabilir ve bu kuralları yalnızca Anahtar 0 değiştirebilir" diyebiliyorsun ve çip bunu araya hiç uygulama girmeden uyguluyor.

NFC.cool her dosyanın güncel haklarını gösteriyor ve düzenlemene izin veriyor; içine iki uyarı gömülü. Bir izin, bu telefonun elinde olmayan bir anahtara işaret ediyorsa sana söylüyor, çünkü kendini dışarıda bırakıyor olabilirsin. Ve Değiştirme'yi Asla yapmadan önce ayrı bir adımda onaylatıyor, çünkü bu bir kez yazıldığında dosyanın kuralları çipin ömrü boyunca donuyor.

### Çip yapılandırması

Dosyaların altında çipin kendi yapılandırması duruyor; NXP bunu tek bir SetConfiguration komutuyla açıyor. NFC.cool şu seçenekleri kapsıyor:

- **Rastgele UID.** Normalde çip her okuyucuya aynı sabit UID'yi bildiriyor ve bu, herkesin bir tag'i okutmalar boyunca izleyebilmesine yol açıyor. Rastgele UID açıkken her seferinde taze, rastgele bir kimlikle yanıt veriyor ve gerçek olanı ancak sen kimlik doğruladıktan sonra açıklıyor. Gerçek bir gizlilik kazancı ve kalıcı. Uygulama tag'leri UID ile tanıdığı için gerçek olanı sonrasında, bildiği her Anahtar 0'ı kimliği doğrulanmış bir GetCardUID üzerinden deneyerek geri buluyor ve tag, onu hazırlayan telefonda yönetilebilir kalıyor.
- **Başarısız kimlik doğrulama sınırı.** Çipin, Anahtar 0'ı kilitlemeden önce kaç yanlış anahtar denemesine katlanacağı. Anahtar tahminine karşı bir koruma ama fazla düşük ayarlarsan bir avuç başarısız okutma ana anahtarı temelli kilitleyebiliyor.
- **Geri modülasyon gücü.** Güçlü ya da standart. Standart, küçük antenlerde okunamaz olabiliyor, yani varsayılanı bırakmak mantıklı bir yer.
- **Zincirli yazma.** Kapatılabiliyor, böylece tek bir yazma tek bir çerçeveyle sınırlanıyor. Kalıcı.
- **Yetenek baytları.** NXP'nin senin kullanımına bıraktığı iki serbest bayt.
- **LRP.** Güvenli mesajlaşma anahtarı; aşağıda kendi bölümü var.

### Kasa

Dosya 03, çipin şifreli tutabildiği 128 baytlık, üreticiye özel bir dosya ve NFC.cool onu tag'in üstündeki küçük bir özel depoya çeviriyor. Bir şeyi ilk kaydettiğinde uygulama dosyayı tamamen şifreli moda alıyor ve tüm erişim haklarını Anahtar 0'a kilitliyor. Bundan sonra kasa, yalnızca senin anahtarının geri okuyabildiği 126 bayta kadar metin tutuyor ve başka bir telefondan yapılan derin okuma, izin hatası dışında hiçbir şey almıyor.

Bu, birinin veritabanında oturmak yerine nesneyle birlikte yolculuk etmesi gereken bir sır için: bir seri numarası, gelecekteki kendine bir not, kendi sunucunun beklediği bir simge. Anahtar 0'ı fabrika değerine döndürmek bunu siliyor; kasanın yok olmasının tek yolu da bu.

---

## LRP modu

Normalde çip anahtarlarını sıradan AES ile koruyor ve bir anahtarı çalmak AES'in kendisini kırmak demek olurdu. Ama daha sinsi bir saldırı hattı var. Çipi bir tezgaha koy, şifreyi çalıştırırken güç çekişindeki ve elektromanyetik yayılımındaki minik değişimleri ölç ve yeterince iz topladığında matematiğe hiç dokunmadan, yalnızca o sızıntıdan anahtarı yeniden kurabilirsin. **LRP**, yani Sızıntıya Dayanıklı İlkel, o sızıntıya tutunacak hiçbir şey bırakmamak için yeniden kurulmuş bir güvenli kanal. NXP bunu AN12304'te belgeliyor ve bir şarap şişesindeki etiket için fena halde fazla; tag'lerin çoğunun bunu hiç açmamasının ve araçların çoğunun bu dili hiç öğrenmemesinin sebebi de bu.

İlk sürümün tasarım notlarımda, "LRP modu"nun hemen yanına "planlanmıyor" yazmıştım. İçime kurt düşürüp durdu, ben de yaptım. NFC.cool bir tag'i LRP moduna alabiliyor ve daha önemlisi, sonrasında ona kimlik doğrulayıp yönetebiliyor: anahtarlar, dosya hakları, kasa, çip yapılandırması, hepsi AES yerine LRP kanalı üzerinden.

O anahtarı çevirmeden önce bilinmesi gereken iki şey var. Kalıcı: bir tag LRP moduna girdiğinde AES güvenli mesajlaşması sonsuza dek kapanıyor ve yalnızca AES konuşan hiçbir araç onunla bir daha konuşamıyor. Bir de LRP tag'inde SUN kullanılamıyor, yani işi okutmaları imzalamak olan bir tag AES modunda kalmalı.

---

## Geri alınamayanlar

Bu komutların çoğu kalıcı ve uygulama bunu o anda yüksek sesle söylüyor: geri alınamaz her eylem, sonucu tam olarak yazan bir uyarıdan onay alıyor. Yine de burada da listelemeye değer.

- LRP'yi açmak.
- Rastgele UID'yi açmak.
- Zincirli yazmayı kapatmak.
- Bir dosyanın Değiştirme iznini Asla yapmak.
- Bir anahtarı kaybetmek. Çipin fabrika ayarına dönüşü yok. Anahtar 0 gittiyse tag'i yeniden ayarlama yeteneğin de gitti.
- Başarısız kimlik doğrulama sınırını fazla düşük ayarlamak; birkaç yanlış okutmadan sonra Anahtar 0'ı kilitleyebiliyor.

Değer verdiğin bir tag'e dokunmadan önce yedeğinde alıştırma yap.

---

## Sahtecilik karşıtı NFC tag'ler gerçekte nerede kullanılıyor

Açıkçası? NFC tag okutan çoğu kişinin bunların hiçbirine ihtiyacı olmuyor ve bunda bir sorun yok. Bağlantı açan bir etiket harika, sıkıcı ve işe yarar bir şey.

Ama bunlardan birini bir kez elinde tuttuğunda kullanımlar apaçık oluyor. Lüks bir çanta gerçek olduğunu kanıtlayabiliyor. Bir şişe şarap ya da viski, sessizce açılıp yeniden doldurulmadığını gösterebiliyor; o yarısını kurcalama mührü taşıyor. Bir kutu ilaç, hem içindeki gerçek ilaca hem kimsenin kırmadığı bir mühre kefil oluyor. Etkinlik biletleri ekran görüntüsü alınıp dağıtılabilen şeyler olmaktan çıkıyor ve kapıdaki bir tag, birinin kanepesinden kayıtlı bir bağlantıyı yeniden göndermek yerine gerçekten orada durduğunu kanıtlıyor. [AB Dijital Ürün Pasaportu'nun](/blog/eu-digital-product-passport-2026/) düzenleme tarafından dolandığı gerçeklik sorununun aynısı, tek tek nesne düzeyinde çözülmüş hali.

Bunu bin kullanıcı istedi diye yapmadım. Merakımdan internetten tuhaf tag'ler aldım, nasıl çalıştıklarını çözdüm ve sonra veri sayfasının tek bir sayfasını bile çevirmeden bırakamadım diye yaptım. İyi özellikler genelde böyle başlıyor.

---

## NTAG 424 DNA tag'ler üzerine son söz

NTAG 424 DNA tag'ler, NFC'nin kurcalamaya karşı korumalı mühre en çok yaklaştığı nokta. Birinin ürünü kopyalamasını engelleyemiyorlar ama ürünün *gerçek olduğunun kanıtını* taklit edilemez kılıyorlar, çünkü o kanıt yalnızca gerçek çipin üretebileceği taze bir kriptografik imza.

NFC.cool Tools onları okuyor; çipi, okutmayı ve kurcalama mührünü doğruluyor ve çipin tamamını ayarlaman için sana veriyor: her anahtar, her dosyanın izinleri, çipin kendi ayarları, hatta LRP, hepsi telefonundan. Bir okutmanın gerçeği sahteden nasıl ayırdığını hiç merak ettiysen [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-tr&mt=8) ya da [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-tr) için indir, birkaç avroya [bu tag'lerden](/affiliate-links/) birkaç tane sipariş et ve kendin okut. İyi bir tavşan deliği.
