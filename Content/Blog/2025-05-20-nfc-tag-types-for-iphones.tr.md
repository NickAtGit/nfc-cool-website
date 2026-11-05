---
id: "nfc-tag-types-2025-05"
title: "Farklı NFC tag türlerini anlamak ve iPhone'la hangileri çalışıyor"
date: "2025-05-20"
tags: ["nfc-tags", "guides", "iphone"]
summary: "Tip 1'den Tip 5'e, kimlerin ürettiği ve NTAG serisinin (Tip 2) iPhone projeleri için neden en güvenli seçim olduğu."
metaDescription: "NFC tag türleri anlatılıyor: Tip 1'den Tip 5'e, çipleri kimler üretiyor ve NTAG serisi (Tip 2) iPhone tag projeleri için neden en güvenli, en iyi desteklenen seçim."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/nfc-tag-types.webp"
imageAlt: "Bir iPhone'un yanına dizilmiş NFC tag türleri"
---

NFC tag'ler, telefonun gibi NFC destekli her cihazın okuyabildiği bilgileri saklayan küçük tümleşik devreler. Ama keşke biri bana daha erken söyleseydi dediğim şey şu: her NFC tag birbirinin aynısı değil. Farklı üreticilerden gelen, her birinin kendi tuhaflığı olan koca bir tür bahçesi var ve bu da iPhone'una doğru olanı seçmeyi şaşırtıcı biçimde zorlaştırıyor.

Yıllardır NFC tag okuyup yazan bir uygulama olan NFC.cool'u geliştiriyorum ve "iPhone'um için hangi tag'i almalıyım?" en sık karşıma çıkan sorulardan biri. Bu yazı da verdiğim yanıt. Beş NFC tag türünü, bunları kimlerin ürettiğini ve neredeyse her iPhone projesi için hangisinin güvenli seçim olduğunu anlatacağım. Bu işlere yepyeniysen önce [sıfırdan başlayanlar için NFC tag rehberimle](/tr/blog/nfc-tags-beginners-guide/) başlamak isteyebilirsin; bu yazı bir kat daha derine iniyor.

---

## NFC tag türlerini anlamak

NFC tag'ler beş türe ayrılıyor: Tip 1, Tip 2, Tip 3, Tip 4 ve Tip 5. Bu sınıflandırmayı üreticiler uydurmadı; standartları belirleyen sektör birliği NFC Forum'dan geliyor. Her türün kendi bellek kapasitesi ve hızı var, ayrıca okuma yazma ya da salt okunur olabiliyorlar.

Bir tag'in teknik özelliklerine bakarken kullandığım mercek bu, o yüzden hepsini tek tek gezeyim.

---

## Tip 1 ve 2: Topaz ile MIFARE Ultralight®

Tip 1 (Broadcom üretimi Topaz) ile Tip 2 ([NXP Semiconductors](https://nxp.com) üretimi MIFARE Ultralight®) yelpazenin ucuz ve neşeli ucu. Afiş ve kartvizit gibi basit işlere çok uygunlar. Bellek kapasiteleri küçük (48 bayttan yaklaşık 2 KB'a kadar) ama deneyimime göre bu, bir adres ya da kısa bir metin için fazlasıyla yeterli; zaten çoğu kişinin istediği de bu.

---

## Tip 3: FeliCa™

FeliCa™ olarak da bilinen Tip 3 tag'leri Sony geliştirdi. Çoğunlukla Asya'da, toplu taşıma biletlerinde ve elektronik parada karşına çıkar. Daha yüksek hız ve bellek (1 MB'a kadar) sunuyorlar ama daha pahalı oldukları ve bölgeye özgü uygulamalara bağlı kaldıkları için kullanımları epey sınırlı. O bağlamın dışında bunlara pek uzanmıyorum.

---

## Tip 4: MIFARE DESFire®

Yine NXP Semiconductors'ın ürettiği MIFARE DESFire® tag'ler Tip 4. Bunlar yüksek güvenlikli, yüksek kapasiteli seçenek; güvenli geçiş denetimi ve toplu taşıma sistemleri gibi karmaşık işler için tasarlanmışlar. 8 KB'a kadar veri saklayabiliyorlar. Bir proje gerçekten kriptografik koruma istiyorsa baktığım aile bu. Güvenlik tarafını [şifreli NFC tag'lerde sırları güvende tutmak](/tr/blog/nfc-safe-encrypted-secrets/) yazısında daha ayrıntılı ele aldım.

---

## Tip 5: ISO 15693

Tip 5 tag'ler ISO 15693 standardına uyuyor ve NFC ekosisteminde nispeten yeniler. Çoğunlukla endüstriyel bir hikaye ve öne çıkan özellikleri diğer türlere göre daha uzun okuma menzili. Depoda stok izliyorsan işe yarar, buzdolabına yapıştırdığın tag için pek değil.

---

## iPhone'un için hangi NFC tag'leri seçmelisin

En önemli kısım burası. iPhone 7 ve sonrası iPhone'lar beş NFC Forum türünün hepsinden NDEF okuyabiliyor ve iOS 13'ten beri benimki gibi uygulamalar Tip 3, 4 ve 5 tag'lerle düz NDEF'in ötesinde, doğrudan da konuşabiliyor. Yine de en akıcı, en öngörülebilir yol hâlâ Tip 2 ve neredeyse her proje için önerdiğim de bu. Tip 2 NFC tag'ler, NXP Semiconductors'ın [NTAG serisi](https://www.nxp.com/products/wireless-connectivity/nfc-hf/ntag-for-tags-and-labels:NTAG-TAGS-AND-LABELS).

O serideki NTAG213, NTAG215 ve NTAG216 modelleri en yaygın olanlar ve iPhone'larla harika çalışıyorlar; günü gününe sınadığım şey de bu. Çoğu pratik proje için yeterli bellek veriyorlar (144 ile 888 bayt arası), NFC destekli her iPhone tarafından tamamen yazılıp okunabiliyorlar ve yeniden yazılabiliyorlar, yani içeriklerini istediğin kadar değiştirebilirsin.

Bana çok sinir kaybı kazandıran pratik bir not: tag ve anteni büyüdükçe NFC okuyucu onu daha güvenilir yakalıyor. Projende güvenilirlik önemliyse aşırı ucuz, cılız etiketlerden uzak dururdum; kazandığın birkaç kuruş, ancak üçüncü denemede okunan bir tag'e değmiyor.

iPhone'ların NFC ile yaptığı asıl iş, NFC Veri Alışverişi Biçimi (NDEF) mesajlarını okumak: adresler, düz metin ya da vCard'lar (dijital kartvizitler). NDEF destekleyen her tag, ki NTAG serisinin çoğu destekliyor, iPhone kullananlar için sağlam bir seçim. Gerçekten veri yazmaya hazır olduğunda [iPhone'da NFC tag nasıl yazılır](/tr/blog/write-nfc-tags-iphone/) yazısında adım adım anlattım.

---

## Özet

iPhone'unla kullanmak için NFC tag arıyorsan dürüst önerim basit: NXP Semiconductors'ın NTAG serisinden Tip 2 tag'ler. Hem uygun maliyetliler hem de çoğu kişinin iPhone'da NFC ile yapmak istediği işler için en iyi uyumluluğu ve işlevi veriyorlar. Bir paket NTAG215 etiket al, neredeyse her işe hazır olursun.

NFC gelişmeyi sürdürüyor, o yüzden yeni gelişmelere ve tag belirtimlerine göz ucuyla bakmakta yarar var. Daha fazlası için [iPhone'larda NFC'nin büyüsüne dair](/tr/blog/nfc-on-iphones-insider-look/) eski yazıma bakabilirsin; yalnızca bir tag'de ne olduğunu görmek istiyorsan [NFC tag'leri doğrudan tarayıcından okuyabilirsin](/tr/online-nfc-reader/).

Kolay gelsin!
