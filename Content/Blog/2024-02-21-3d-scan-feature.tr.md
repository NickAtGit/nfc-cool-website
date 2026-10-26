---
id: nfc-blog-025
title: "iPhone'da 3B tarama: fotogrametri ve LiDAR cebinde neler yapabiliyor"
date: 2024-02-21
tags: ["guides", "iphone"]
summary: "NFC.cool Tools, Apple'ın Object Capture arayüzüyle iPhone'unu 3B tarayıcıya çeviriyor. Fotogrametri ve LiDAR birlikte, .stl, .obj, .usdz olarak dışa aktarabildiğin modeller üretiyor: 3B baskıya, AR'a ya da herhangi bir modelleme hattına hazır."
metaTitle: "NFC.cool Tools ile iPhone'da 3B tarama"
metaDescription: "NFC.cool Tools'un 3B tarayıcısı nasıl çalışıyor: fotogrametri, LiDAR ve Apple'ın Object Capture arayüzü. 3B baskı ile AR için .stl, .obj, .ply, .usdz çıktısı."
ogTitle: "iPhone'da 3B tarama: fotogrametri ve LiDAR cebinde neler yapabiliyor"
ogDescription: "NFC.cool Tools'un 3B tarayıcısı nasıl çalışıyor: fotogrametri, LiDAR ve .stl, .obj, .usdz çıktısı."
image: "/assets/images/Blog/3d-scan-feature.webp"
---
Birkaç yıl önce 3B tarama demek, mikrodalga boyunda özel bir tarayıcı ve donanımdan pahalı bir yazılım demekti. Bugün LiDAR algılayıcılı bir iPhone ile Apple'ın Object Capture arayüzü, avuç dolusu fotoğraftan kullanılabilir bir 3B model çıkarabiliyor.

NFC.cool Tools'un **3B Tarama** özelliği bu hattı cebe sığan bir akışa sarıyor.

---

## Aslında ne oluyor

İki teknoloji birlikte çalışıyor:

- **Fotogrametri.** Uygulama nesnenin farklı açılardan onlarca fotoğrafını çeker. Fotogrametri motoru (iOS'ta Apple'ın Object Capture arayüzü) fotoğraflar arasında eşleşen özellikleri bulur ve bunları üçgenleyerek 3B ağa dönüştürür.
- **LiDAR.** LiDAR algılayıcılı iPhone'larda (iPhone 12'den itibaren Pro modeller) her kare, algılayıcının aldığı derinlik ölçümleriyle zenginleşir. Bu, ağı iki yönden belirgin biçimde iyileştirir: ölçek doğru olur (model gerçek dünyadaki boyutundadır) ve belirgin görsel özelliği olmayan yüzeyler (düz beyaz duvar, parlak bir kavis) yalnızca fotogrametriyle çıkmayacak kullanılabilir geometriye kavuşur.

İki adımı da düşünmene gerek yok; uygulama çekimde sana eşlik ediyor, sonra yeniden kurulumu cihazda çalıştırıyor.

---

## İyi bir tarama nasıl çekilir

Birkaç pratik kural:

- **Nesnenin etrafında yavaş dolaş.** Uygulama aşağı yukarı kesintisiz bir kaplama bekler. Bir yandan karşı yana atlama, yürüyerek dolaş.
- **Nesneyi kadrajda tut.** Nesnenin çevresinde tutarlı bir boşluk bırakmak sorun değil; kenarlardan kesmek veri kaybettirir.
- **Eşit ışık.** Sert gölgeler fotogrametri adımını şaşırtır. Dağınık ışık (açık gökyüzü, softbox, iç mekanda gün ışığı) en temiz ağı verir.
- **Dokulu nesneler düz olanlardan daha iyi taranır.** Desenli bir kupa neredeyse kusursuz çıkar. Parlatılmış metal küre gerçekten zordur. LiDAR bu ikincisinde yardım eder ama tamamen kurtarmaz.
- **Her açıda bir an dur.** Hareket bulanıklığı ayrıntıyı yer.

Tam tarama 20-40 saniyelik yürüyüş, sonra 30-60 saniyelik işlem sürüyor.

<figure class="phone-figure" data-layout="stage">
<figcaption>Bir nesneyi 3B taramak</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/3d-scan-feature/1-scan-object-440w.webp" alt="NFC.cool Tools'taki 3D sekmesi, Scan Object ve Scan Room ile"><p><strong>Scan Object.</strong> 3D sekmesinde, Scan Room'un yanında.</p></li>
<li><img src="/assets/images/Blog/screens/3d-scan-feature/2-walk-around-440w.webp" alt="Nesne yakalama ekranı: çerçevenin içinde taşınabilir bir radyo ve etrafında dolaşırken nesnenin tamamını çerçevede tutma uyarısı"><p><strong>Etrafında dolaş.</strong> Nesneyi çerçevede tutarak yavaşça etrafını dön.</p></li>
<li><img src="/assets/images/Blog/screens/3d-scan-feature/3-building-440w.webp" alt="Yüzde 62'deki ilerleme halkası: Building your 3D model"><p><strong>Oluşmasını bekle.</strong> Model iPhone'unda oluşturulur. Bu sırada uygulamayı açık tut.</p></li>
<li><img src="/assets/images/Blog/screens/3d-scan-feature/4-model-440w.webp" alt="Bitmiş model: nesne olarak kaydedilmiş Vintage Radio"><p><strong>Modelin.</strong> Diğerleriyle birlikte kaydedilir, görüntülemeye ya da dışa aktarmaya hazır.</p></li>
</ol>
</figure>

---

## Dışa aktarma biçimleri

NFC.cool Tools, sonrasında gerçekten ihtiyacın olan biçimlere çıktı veriyor:

- **.stl** - 3B yazıcılar. Bambu Studio, Cura, PrusaSlicer gibi dilimleyicilerin hepsi kabul eder.
- **.obj** - Evrensel 3B biçim. Blender, Cinema 4D, Unity, Unreal, kısaca her modelleme aracına girer.
- **.ply** - Köşe renklerini koruyan ağ biçimi; dokunun UV eşlemeli malzemelerden daha önemli olduğu yerde işe yarar.
- **.usdz** - Apple'ın AR biçimi. Quick Look ile AR Quick Look'a at ya da RealityKit'te kullan.
- **.abc** (Alembic) - Animasyon hatları.
- **.usd** - Universal Scene Description, modern içerik üretim araçlarının çoğu destekliyor.

Model hep aynı. Biçim yalnızca sonraki hangi aracın onu kullanabileceğini belirliyor.

---

## Sonuçla neler yapabilirsin

Kullanıcılardan gördüğüm en keyifli uygulamalar:

- **Tek parçalık kopya bas.** Bulduğun nesneyi tara, dilimle, bas.
- **Gerçek bir varlığı belgele.** Miras belgelemesi, müze kataloglaması, "büyükannenin vazosu gerçekte nasıl görünüyordu".
- **AR'da paylaş.** .usdz dosyasını iPhone'u olan birine gönder; dokunsun ve nesneyi AR Quick Look ile kendi salonunda süzülürken görsün.
- **Oyun motoruna at.** Gerçek dünyadan bir aksesuar, 3B sanatçısı olmadan 90 saniyede modellenip Unity sahnesine girsin.

---

## Ne zaman işe yarıyor, ne zaman yaramıyor

Fotogrametri ve LiDAR şunlarda güçlü:
- Katı, ışık geçirmez nesneler
- Dokulu ya da desenli yüzeyler
- Durağan özneler (tarama sırasında kımıldamayan her şey)

Şunlarda zorlanıyor:
- Saydam ya da ışığı kıran nesneler (cam, su, mercek)
- Çok yansıtıcı metal
- Çok ince ayrıntılar (kablo, tel, saç)
- Kımıldayan her şey

İyi olduğu işlerde sonuç gerçekten kullanışlı, oyuncak değil. Kalanında ağı Blender'da temizlemeyi bekle ya da sınırları kabul et.

3B Tarama, [iPhone için NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-3d-scan-feature-tr&mt=8) içinde bulunuyor. Apple'ın Object Capture'ı LiDAR algılayıcısı istiyor, bu yüzden Pro iPhone'larda (iPhone 12 Pro ve sonrası) ve iPad Pro modellerinde (2020 ve sonrası) çalışıyor.
