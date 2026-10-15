---
id: "amiibo-iphone-android-read-collect-backup-2026-07"
title: "iPhone ve Android'de Amiibo oku, topla ve yedekle"
date: "2026-07-02"
tags: ["announcements", "iphone", "android"]
summary: "NFC.cool'un iPhone ve Android'deki en iyi NFC uygulaması olmasını istiyorum, bu yüzden ona tam Amiibo desteği verdim: figürü okut ve bilgilerini gör, kendi koleksiyonunu kur, birini boş bir NTAG215'e yedekle. Amiibo'ların kapağın altında gerçekte nasıl çalıştığı ve uygulamanın neden hiç anahtar taşımadığı burada."
image: "/assets/images/Blog/amiibo-iphone-android-read-collect-backup.webp"
imageAlt: "Kişisel koleksiyon ekranı gösteren bir telefonun yanında hayali bir NFC koleksiyon figürü"
author: "Nicolo Stanciu"
metaTitle: "iPhone ve Android'de Amiibo: oku, topla, yedekle"
metaDescription: "NFC.cool, iPhone ve Android'de Amiibo okuyor, koleksiyon tutuyor ve onları boş NTAG215 tag'lere yedekliyor. Amiibo'lar kapağın altında nasıl çalışıyor ve dürüst sınırları neler."
ogTitle: "iPhone ve Android'de Amiibo oku, topla ve yedekle"
ogDescription: "NFC.cool'a tam Amiibo desteği verdim: okut, topla ve birini boş bir tag'e yedekle. Amiibo'lar gerçekte nasıl çalışıyor ve uygulama neden hiç anahtar taşımıyor."
---
İnsanlar Amiibo'nun içinde egzotik bir şey olduğunu sanıyor. Başka hiçbir yerden alamayacağın bir parça Nintendo silikonu. Öyle bir şey yok. Figürün tabanına kapatılmış olan şey bir [NTAG215](/affiliate-links/): her gün okuyup yazdığım boş etiket çipinin aynısı, paketinde on tane gelen ve bozuk paraya satılan cinsten. Yaklaşık 540 bayt bellek, fabrikada yakılmış bir seri numarası ve figürün tamamı bu kadar. Pahalı olan kısım plastik. Çip neredeyse sonradan akla gelmiş gibi.

Beni bu kadar uzun süre dürtmesinin sebebi de tam bu. Geçimimi NFC tag okuyup yazarak sağlıyorum ve koca bir tag kategorisi, yani masamın yanındaki raftaki avuç dolusu figür, kendi uygulamamın omuz silktiği bir şeydi. NFC.cool'un telefonuna koyabileceğin en yetenekli NFC uygulaması olmasını, hiçbir tag türünü masada bırakmamasını istiyorum.

Ben de bir yanıma figürleri, öbür yanıma Switch'imi alıp oturdum ve NFC.cool'a doğru dürüst Amiibo desteği verdim. Ortaya çıkan şey ve yol boyunca öğrendiklerim burada. Bu kadar ucuz bir çipin kopyalanmasının neden şaşırtıcı derecede zor olduğuyla başlayalım.

---

## Peki sihir nerede?

Çip bu kadar sıradansa sihir açıkça silikonda değil. Baytlarda. Amiibo aslında Nintendo'nun kendi özel şifresiyle yazdığı, sonra da sahtesini gerçeğinden ayırabilesin diye altını imzaladığı ucuz bir defter. (Tag türlerini derinlemesine gezmek istersen çipin kendisi düz bir [NTAG215](/blog/nfc-tag-types-for-iphones/).)

O baytlarda iki şey yaşıyor. Birincisi açıkta: bu figürün kim olduğunu söyleyen küçük bir blok. Örneğin belirli bir Amiibo serisindeki, Legend of Zelda evreninden Link. Switch'in, az önce bir figürün dokunduğunu anlamak için okuduğu kısım bu. İkinci kısım kilitli: asıl kayıt verisi, yani takma ad, sahibinin Mii'si, figürün kaç kez kullanıldığı ve o anki oyunun kullanmasına izin verilen küçük not defterine karaladığı her şey. O kısım şifreli ve imzalı.

---

## Amiibo'yu neden öylece kopyalayamıyorsun

Şifreli kayıt, bir kez bulup sonsuza dek kullanabileceğin tek bir sabit anahtarla korunmuyor. Her tag kendi anahtarlarını alıyor; bunlar bir dizi ana anahtarın, o tag'e özgü verilerle (benzersiz seri numarası dahil) karıştırılmasıyla anında türetiliyor. Üstüne, her şey bir HMAC ile imzalanıyor. Yeniden imzalamadan tek bir baytı değiştir, konsol sahtekarlığı görsün ve figürü reddetsin.

İşte tuzak burada. Seri numarası hem anahtar türetmenin hem imzanın içine gömülü olduğu için gerçek bir Amiibo'yu döküp bayt bayt boş bir tag'e kopyalayamıyorsun. Boş tag'in seri numarası farklı, yani türetilen her anahtar farklı çıkıyor, imza artık tutmuyor ve konsol reddediyor. Akla ilk gelen "bütün sayfaları kopyala" yaklaşımı her seferinde başarısız oluyor.

Geçerli bir kopya çıkarmak için anahtarları hedef tag'e göre yeniden türetmen ve veriyi, döktüğün değil elindeki tam o plastik ve silikon parçası için geçerli olacak biçimde yeniden imzalaman gerekiyor. Herkesin üstüne kurduğu örnek uygulama amiitool adlı bir araç. Ben o dansın tamamını uygulamanın içinde, doğrudan yeniden yazdım: tag biçiminden iç biçime ve geri, anahtar türetme, şifreleme, imzalama. Böylece NFC.cool bunu araya hiç bilgisayar girmeden, elindeki telefonda yapabiliyor.

---

## NFC.cool artık ne yapıyor

Üç şey, muhtemelen kullanacağın sırayla.

**Oku.** Amiibo'yu telefonunun arkasına tut, tıpkı [herhangi bir NFC tag'ini okur gibi](/features/nfc-reader-writer/), NFC.cool onu anında tanısın: karakter, oyun serisi, Amiibo serisi, figür türü ve görseli; yanında tag'in kendisinden gelen birkaç bilgi, örneğin kaç kez yazıldığı. Bunun için anahtar gerekmiyor. Figürü tanımak yalnızca zaten açıkta olan kısma dokunuyor.

**Topla.** Okuttuğun her Amiibo, sahip olduğun her şeyin yalın bir ızgarası olan Koleksiyonum'a kaydediliyor. Cihazında yaşıyor (iPhone'da iCloud üzerinden diğer Apple cihazlarına eşitleniyor) ve görseller önbelleğe alınıyor, böylece çevrimdışıyken de koleksiyon düzgün görünüyor. Tek başına bu bile masamın yanındaki o zavallı rafı gerçekten gezebildiğim bir şeye çevirdi.

**Yedekle ve geri yükle.** Kendi anahtarlarını içeri aldıysan, bir figürün anahtarı yeniden türetilmiş kopyasını boş bir NTAG215'e yazabilirsin. Az önce okuttuğun figürden doğrudan yedek alabilir ya da cihazındaki kayıtlı bir `.bin` dökümünden geri yükleyebilirsin. Uygulama, elindeki boş tag için anahtarları yeniden türetiyor ve veriyi o tag'e göre imzalıyor; böylece kopya, baştan başarısızlığa mahkum bir bayt kopyası değil, kendi başına geçerli oluyor. Yazma kalıcı; tag bir kez kilitlendi mi kilitlidir ve uygulama sen onaylamadan önce bunu açıkça söylüyor.

<figure class="phone-figure" data-layout="stage">
<figcaption>Oku, topla, yedekle</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/amiibo-iphone-android-read-collect-backup/1-read-440w.webp" alt="NFC.cool Tools'ta okutulmuş bir figür, Bramble the Badger; karakter, oyun serisi, seri, tür ve tag'in yazma sayacı"><p><strong>Oku.</strong> Karakter, seri ve tür, üstüne tag'in kendisinden bilgiler; anahtar gerekmez.</p></li>
<li><img src="/assets/images/Blog/screens/amiibo-iphone-android-read-collect-backup/2-collect-440w.webp" alt="Koleksiyonum, okutulmuş altı figürden oluşan bir ızgara"><p><strong>Topla.</strong> Okuttuğun her figür cihazındaki Koleksiyonum'a gider.</p></li>
<li><img src="/assets/images/Blog/screens/amiibo-iphone-android-read-collect-backup/3-back-up-440w.webp" alt="Scan Figure, My Collection, Restore from Backup ve NFC Keys seçenekleriyle NFC Figures ekranı"><p><strong>Yedekle ve geri yükle.</strong> Kendi anahtarlarını içe aktardıktan sonra boş bir NTAG215'e yedek yaz.</p></li>
</ol>
</figure>

---

## Bilerek dışarıda bırakılanlar

NFC.cool, Amiibo anahtarlarını taşımıyor ve asla taşımayacak. Uygulamada gizlenmiş anahtar yok, içine gömülmüş bir Amiibo veri kitaplığı da yok.

Okuma ve toplama kutudan çıktığı gibi çalışıyor, çünkü yalnızca tag'in açık kısmına dokunuyorlar. Yedekleme başka: ana anahtarları istiyor ve onlar benim değil, Nintendo'nun. Onları kendin edindiysen (birleşik `key.bin` ya da iki ayrı dosya) uygulamaya bir kez aktarıyorsun ve yedekleme özelliği açılıyor. Edinmediysen kapalı kalıyor. Makineyi ben yaptım; yakıtı sen getiriyorsun.

Yürünecek dürüst çizginin bu olduğunu düşünüyorum. Yetenek gerçekten yararlı. Çocuğunun kötü bir öğleden sonrada kaybetmesine ramak kalan bir figürü yedeklemek ya da özgününü riske atmak yerine ucuz bir karta yedek koymak, insanların bunu istemesinin gerçek sebepleri. Talebin var olmadığını varsaymaktansa bunu kendi telefonunda, temiz ve gizli biçimde yapmanın bir yolunu vermeyi yeğlerim. Ama hiçbir zaman benim olmayan bir şeyi dağıtacak da değilim.

---

## Kayıtlara geçsin

Açık olmak istediğim iki şey var.

Birincisi, bu benim uygulamam, Nintendo'nun değil. NFC.cool Nintendo tarafından yapılmadı; Nintendo ile bağlantılı değil, onaylanmadı ve desteklenmiyor. Amiibo, Nintendo Switch ve andığım oyun adları sahiplerinin ticari markaları; onları yalnızca özelliğin neyle uyumlu olduğunu bilesin diye anıyorum.

İkincisi, yedekleme ve geri yükleme araçları eğitim ve kişisel kullanım için burada: zaten sahip olduğun figürleri korumak için. Çocuğunun sürekli düşürdüğü figürün yedeğini al ya da özgününü kutusunda tut, günlük yıpranmayı ucuz bir NTAG215 üstlensin. Bunu yazma amacım o. Kendi anahtarlarını getir, yalnızca gerçekten sahip olduğun figürleri yedekle ve Nintendo'nun haklarına, ayrıca yaşadığın yerdeki yasalara saygı göster. Aracı ne için kullandığın senin sorumluluğunda.

---

## Gerçekten çalışıyor

Bunu inanca dayanarak yayınlamak istemedim, o yüzden tek geçerli yoldan sınadım.

Kendi figürlerimden birini okuttum, boş bir NTAG215'e yedekledim ve kopyayı Switch'ime götürdüm. The Legend of Zelda: Tears of the Kingdom'ı açtım, kopyayı doğru Joy-Con'a okuttum ve envanterime bir avuç oyun içi eşya düştü. Özgünüyle aynı. Şikayet yok, "bu Amiibo okunamıyor" yok. Bütün iş bana o anda gerçek geldi. Onca anahtar türetme matematiği ve bayt düzeni ve karşılığı, bir Nintendo konsolunun gönül rahatlığıyla gerçek figür saydığı ucuz, boş bir etiket.

Masamın yanındaki o raf artık yalnızca süs değil. Bir özellik.

Denemek istersen Amiibo araçları, tag okuyup yazmak için yaptığım her şeyin yanı başında, [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-amiibo-iphone-android-read-collect-backup-tr&mt=8) ve [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-amiibo-iphone-android-read-collect-backup-tr) için NFC.cool içinde. Kendi anahtarlarını getir, bir figür okut ve uygulamanın bunca zaman sessizce görmezden geldiği şeyi gör.
