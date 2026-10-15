---
id: nfc-blog-024
title: "NFC.cool Tools ile cebe sığan belge tarama"
date: 2024-02-20
tags: ["guides", "iphone"]
summary: "NFC.cool'un belge tarayıcısı için uygulamalı rehber: keskin tarama nasıl çekilir, işleme adımı neden önemli ve OCR taramayı nasıl aranabilir metne ve PDF'e çevirir."
metaTitle: "NFC.cool Tools ile belge tarama - uygulamalı rehber"
metaDescription: "NFC.cool Tools ile belge nasıl taranır: çek, işle, OCR çalıştır ve aranabilir PDF olarak dışa aktar. Işık ve köşe algılama ipuçlarıyla birlikte."
ogTitle: "NFC.cool Tools ile cebe sığan belge tarama"
ogDescription: "NFC.cool Tools ile belge tarama, OCR çalıştırma ve aranabilir PDF üretme."
image: "/assets/images/Blog/document-scanning-guide.webp"
---
Modern bir iPhone'un kamerası ve işlem gücü öyle bir noktaya geldi ki "belge taramak" artık yazıcı işlevi değil, tek dokunuş. NFC.cool Tools'un belge tarayıcısı Apple'ın Vision çerçevesi üzerine kurulu; yani hızlı çekim, kendiliğinden kenar algılama ve tamamen cihazda çalışan OCR elde ediyorsun.

İşte bunu iyi kullanmanın yolu.

---

## Çekim: sabit tut, ışık önemli

NFC.cool Tools'u aç, belge simgesine dokun ve sayfayı çerçevele. Tarayıcı, sayfa kenarı olduğunu düşündüğü yerin çevresine sarı bir dörtgen çizer. Çoğu zaman haklıdır. Değilse köşeleri oturana kadar sürükle.

<figure class="phone-figure" data-layout="stage">
<figcaption>Kâğıttan aranabilir PDF'e</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/document-scanning-guide/1-capture-440w.webp" alt="NFC.cool Tools'taki belge kamerası; algılanmış bir kira sözleşmesi ve işaretlenmiş köşeleri"><p><strong>Yakala.</strong> Sayfa bulunur, köşeleri senin yerine hizalanır.</p></li>
<li><img src="/assets/images/Blog/screens/document-scanning-guide/2-text-440w.webp" alt="Bir faturadan tanınan metin; Share text ve Copy text to clipboard ile"><p><strong>Metni oku.</strong> OCR, taramayı kopyalayıp paylaşabileceğin metne çevirir.</p></li>
<li><img src="/assets/images/Blog/screens/document-scanning-guide/3-search-440w.webp" alt="Portland diye aranan kayıtlı belgeler: bir fatura, bir fiş ve bir kira sözleşmesi"><p><strong>Sonra bul.</strong> Arama, bir belgeyi içindeki herhangi bir kelimeyle bulur.</p></li>
<li><img src="/assets/images/Blog/screens/document-scanning-guide/4-pdf-440w.webp" alt="Share ve Save to Files ile Export as PDF"><p><strong>Dışa aktar.</strong> Aranabilir bir PDF; paylaş ya da Dosyalar'a kaydet.</p></li>
</ol>
</figure>

Çıktıyı gerçekten iyileştiren birkaç ipucu:

- **Doğal ışık, tepe ışığını yener.** Ofisin tavan lambaları telefonun kendi gölgesini sayfaya düşürür. Pencereden gelen gün ışığı ya da sayfaya yandan vuran masa lambası daha iyi.
- **Düz zemin.** Kıvrılmış sayfa metni büker ve OCR'ı şaşırtır.
- **Parlamadan kaç.** Parlak kağıttaki beyaz kare yansımadan kurtulmak için telefonu hafifçe eğ.
- **Çok sayfalı belgeler.** Sayfaları arka arkaya tara; uygulama hepsini tek belgede toplar.

---

## İşleme: köşeleri oturt, rengi ayarla

Çekimden sonra bir işleme adımı geliyor. Kullanmaya değer iki şey var:

- **Köşe ayarı.** Tarayıcının otomatik algılaması iyi ama kusursuz değil. Sayfanın zeminle kontrastı düşükse köşeleri elle, hassas biçimde sürükle.
- **Renk modu.** Üç seçenek: renkli (fotoğraflar, renkli belgeler), gri tonlama (beyaz kağıt üstünde metin, OCR için en keskin sonuç) ve siyah beyaz (el yazısı, fişler, en temiz hali).

Fatura, fiş, sözleşme gibi çoğu evrak işinde gri tonlama, dosya boyutuyla OCR isabeti arasında en iyi dengeyi veriyor.

---

## OCR: taranan görselden aranabilir metne

OCR'ı çalıştırmak için taranan görselin altındaki **Tanınan metni göster**'e dokun. Metin, kopyalayabileceğin, içinde arama yapabileceğin ya da kaydedebileceğin bir panelde çıkar.

OCR kalitesi üç şeye bağlı: görselin keskinliği, ışık ve yazı tipi. Temiz beyaz zemindeki basılı metin neredeyse yüzde 100 tanınıyor. El yazısı daha zor; Vision'ın el yazısı tanıyıcısı düzgün matbaa harflerinde fena değil ama bitişik yazıda zorlanıyor. Tarama kötü çıktıysa en sık işe yarayan çözüm, OCR sonucuyla boğuşmak yerine daha iyi ışıkta yeniden taramak.

---

## Dışa aktarma: aranabilir PDF

Taramaları uzun vadede gerçekten işe yarar kılan hile **aranabilir PDF** çıktısı. Her sayfası taranan görsel olan, altına OCR metninin görünmez biçimde katmanlandığı bir PDF. Yani belge görsel gibi durur ama arama motorları (ve macOS Spotlight ile Finder) içindeki kelimeleri bulabilir.

NFC.cool Tools'ta **Sayfayı PDF olarak paylaş**'a bas, çıktı OCR katmanını kendiliğinden içersin. PDF'i dosyalama sistemine at, üç ay sonra "fatura 2024-02 acme corp" diye ara, doğru belge karşına çıksın.

---

## Neden fotoğraf değil de tarama?

Belgenin fotoğrafını da çekebilirsin. Onun yerine tarayıcı kullanmanın sebepleri:

- **Kenar kırpma.** Tarama sayfaya göre kırpılır. Fotoğrafta masa, kahve fincanı ve kedi de vardır.
- **Perspektif düzeltme.** Telefonu düz tutsan bile açı tam dik olmaz. Tarayıcılar bunu düzeltir, sayfa "açıyla çekilmiş" değil "taranmış" görünür.
- **Çok sayfayı tek dosyada toplama.** Beş fotoğraf, galeride beş dosya demek. Beş tarama, tek PDF demek.
- **Aranabilir metin.** OCR çıktının içine gömülü gelir.

Fişler, sözleşmeler, imzalı formlar, iş belgeleri: fotoğraflama, tara.

Belge tarama [iPhone için NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-document-scanning-guide-tr&mt=8) içinde bulunuyor (Android sürümü NFC'ye odaklanıyor; belge tarayıcı Apple'ın Vision çerçevesini gerektiriyor).
