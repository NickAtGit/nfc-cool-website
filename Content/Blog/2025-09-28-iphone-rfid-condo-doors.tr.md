---
id: "iphone-rfid-2025-09"
title: "iPhone'um neden sitemin RFID kapısını açmıyor? NFC ile RFID farkı"
date: "2025-09-28"
tags: ["nfc-tags", "automation", "iphone"]
summary: "Gelen kutumdaki en sık sorulardan birinin dürüst yanıtı: iPhone'unun NFC'si sitenin RFID kartıyla konuşamıyor ve Apple bunu bilerek böyle yapıyor."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/iphone-rfid-doors.webp"
imageAlt: "Yalnızca RFID okuyan site kapısıyla karşılaşan bir iPhone"
---

Yıllardır NFC tag okuyup yazan bir uygulama olan NFC.cool'u geliştiriyorum ve gelen kutuma neredeyse hepsinden çok düşen tek bir soru var: "iPhone'um neden site kapımı açmıyor?" Kişi telefonunu binanın giriş okuyucusuna kendinden emin biçimde dayıyor, sihrin gerçekleşmesini bekliyor ve karşılığında kilitli kapının soğuk, kayıtsız sessizliğini alıyor.

Bu sen isen yalnız değilsin ve hayır, Siri sana küs değil. Dürüst yanıt çoğu kişinin beklediğinden hem daha basit hem daha teknik: sitenin kartı iPhone'unun kurallarına göre oynamıyor. Nedenini anlatayım, çünkü alttaki frekans uyuşmazlığını bir kez gördün mü olayın tamamı arıza olmaktan çıkıyor.

---

## Teknik kısım, jargonsuz

Bunu soranlara hep, birbirinin yerine kullanılan ama aslında kullanılmaması gereken iki terimi ayırarak başlıyorum:

- **RFID (Radyo Frekansıyla Tanımlama)**, nesneleri kablosuz tanımlamak ve izlemek için kullanılan geniş bir teknoloji. RFID'yi sokağın karşısındaki arkadaşına seslenmek gibi düşünüyorum: genelde tek yönlü bir alışveriş, sitenin RFID kartı sinyal yayıyor, kapı dinliyor. RFID'nin farklı türleri var: alçak frekans (LF), yüksek frekans (HF) ve ultra yüksek frekans (UHF). Geçiş kartlarını, evcil hayvan çiplerini, stok takibini ve evet, o site kartlarını çalıştıran şey bu.
- **NFC (Yakın Alan İletişimi)** ise esasen RFID'nin yüksek frekansta (13,56 MHz) çalışan özelleşmiş bir alt kümesi. Birbirine çok yakın duran iki arkadaşın samimi sohbeti gibi. NFC çift yönlü iletişime, güvenli veri alışverişine ve zengin etkileşime izin veriyor. iPhone'unun Apple Pay, AirTag ve [dijital kartvizit](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-iphone-rfid-condo-doors-tr&mt=8) gibi özelliklerde NFC kullanmasının sebebi de tam bu.

Yani her NFC bir RFID'dir ama her RFID bir NFC değildir. Aldığım "neden çalışmıyor" e-postalarının neredeyse hepsinin kökü bu tek cümlede. NFC'nin RFID'nin içine nasıl oturduğunu daha ayrıntılı istersen [sıfırdan başlayanlar için NFC tag rehberimde](/blog/nfc-tags-beginners-guide/) anlattım.

---

## iPhone'un site kartına neden "hayır" diyor

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/iphone-rfid-condo-doors/cant-read-440w.webp" alt="Üzgün bir yüz gösteren iPhone ekranı"><p><strong>Okunacak bir şey yok.</strong> Düşük frekanslı ya da tescilli RFID, iPhone'un NFC radyosunun duyabileceklerinin dışında.</p></li>
</ol>
</figure>

Yüzlerce kez anlatmak zorunda kaldığım kısım burası. Site geçiş kartın büyük olasılıkla iPhone'unun tanıdığı NFC standardının dışında kalan bir RFID türü kullanıyor: çoğu zaman alçak frekanslı RFID ya da iPhone'ların yorumlayamayacağı biçimde şifrelenmiş, üreticiye özel yüksek frekanslı bir düzen. Apple, iPhone'u güvenlik, pil verimi ve tutarlı bir kullanım deneyimi için yalnızca 13,56 MHz'deki NFC ile çalışacak biçimde tasarladı.

Açıkça söylersek: iPhone'un, sitenin RFID lehçesini konuşmuyor. Netflix aboneliğinin seni sinema salonuna sokmasını beklemek gibi. Genel fikir aynı, dünyalar tamamen ayrı. Bu, kendi uygulamamda etrafından dolaşabileceğim bir hata da değil: telefonun içindeki verici, o kartın konuştuğu frekansa hiçbir şekilde ayarlanamıyor. Apple'ın NFC yığınında tam olarak neyi açıp neyi açmadığını merak ediyorsan [iPhone'larda NFC'ye içeriden bakış](/blog/nfc-on-iphones-insider-look/) yazısında yazdım.

---

## Site kartını iPhone'a kopyalayabilir misin?

Kısaca: hayır ve bunu söylemekten artık çekinmiyorum. Apple'ın Wallet'ı ve NFC yığını, apaçık güvenlik kabuslarından kaçınmak için bilerek kapalı tutuluyor; yani birinin kredi kartını ya da bina anahtarını laf olsun diye telefona kopyalamasına karşı. Herkesin geçiş kartlarını iPhone'a kopyalayabildiği bir dünya düşün: lobin döner kapıya döner. Apple'ın buradaki sınırı dijital hayatını güvende tutmak için var ve bu yığınla her gün uğraşan biri olarak ben de aynı kararı verirdim.

Şunu da bilmekte yarar var: gerçekten sır tutabilen kartlar, yani gerçek kriptografik korumaya sahip olanlar, tasarımı gereği kolay kopyalanmıyor. Bu tarafı [şifreli NFC tag'lerde sırları güvende tutmak](/blog/nfc-safe-encrypted-secrets/) yazısında ayrıntılı ele aldım.

---

## Onun yerine ne yapabilirsin

Apple bu konuda yakın zamanda geri adım atmayacak, o yüzden RFID gerçeğiyle barışmanın yolları şunlar:

- **Telefonla uyumlu sistemler.** Site yönetimine, dijital cüzdanlarla bütünleşen modern geçiş sistemlerine geçmeyi sor. Asıl çözüm bu ve her yıl daha yaygınlaşıyor.
- **NFC etiketleri ya da tag'ler.** Programlanabilir NFC tag'ler evde ve denetimli senaryolarda gerçekten işe yarıyor, ben sürekli kullanıyorum, ama burada ancak sitenin okuyucusu gerçekten NFC konuşuyorsa yardımı olur. Denemek istersen [iPhone'da kendi NFC tag'ini yazmak](/blog/write-nfc-tags-iphone/) başlanacak yer.
- **Ayrı RFID kartlar ya da anahtarlıklar.** Şimdilik o site kartını anahtarlığında tut. O kilit için hâlâ doğru araç o.

---

## Özetle

Sorun iPhone'unun inatçılığı değil; Apple'ın güvenlikle tutarlılığı öne alması ve hiçbir yazılım güncellemesinin kapatamayacağı bir frekans boşluğu. Binalar NFC uyumlu geçiş sistemlerine yaygın olarak geçene kadar o plastik parçası lobinin anahtarı olarak kalıyor. iPhone'un ödemelerde, dijital kartvizitlerde ve arkadaşlarını etkilemekte harika; ama site kapıları şimdilik hâlâ geçmişte takılı.

Hiç değilse bir dahaki sefere asansörde tuhaf bir sessizliğe düştüğünde anlatacak iyi bir hikayen olacak.
