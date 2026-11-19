---
title: "NFC.cool x-callback-url"
slug: "x-callback-url"
description: "Diğer uygulamalar ve web sayfaları, x-callback-url kuralına göre iPhone'daki NFC.cool'dan bir işlem isteyip sonucu geri alabilir."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# NFC.cool x-callback-url

Diğer uygulamalar ve web sayfaları, [x-callback-url](https://x-callback-url.com) kuralına göre iPhone'daki NFC.cool'dan bir işlem isteyip sonucu geri alabilir.

Webhook'lar, Kestirmeler ve URL şemaları [geliştirici sayfasında](/tr/developers/).

<a href="#read-uid" class="landing-cta-button">Belgelere git</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/nfc-scan-tag.webp" alt="NFC tag okutan iPhone" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section" id="read-uid">

## Uygulamandan ya da web sayfandan tag kimliği okuma

Bir bağlantıyla NFC.cool'dan tek bir tag okumasını ve UID'sini sana geri vermesini istersin; `ndef=1` eklersen tag'in NDEF mesajı da gelir. iPhone'daki her web sayfasından ve uygulamadan çalışır, NFC.cool'u yüklemek dışında hiçbir kurulum gerektirmez. Bağlantı [x-callback-url](https://x-callback-url.com) kuralına uyar. Başka uygulamalar ve web siteleri için tag okuma, NFC.cool'un iPhone'daki şirket lisansı NFC.cool Business'ın parçasıdır: lisans için [bize yaz](mailto:info@nfc.cool?subject=NFC.cool%20Business).

```
https://nfc.cool/x-callback-url/read-uid?<parameters>
nfcforiphone://x-callback-url/read-uid?<parameters>
```

İki biçim de aynı işi yapar. `https` olanı tercih et: NFC.cool yüklü olmayan bir iPhone'da sessizce başarısız olmak yerine uygulamanın nasıl edinileceğini anlatan bir sayfa açar. Bağlantıyı kişinin kendisinin dokunacağı yere koy; iOS, bir betiğin kendi başına izlediği bağlantılar için uygulama açmaz.

NFC.cool öne gelir, tag kimliğini kimin alacağını gösterir ve okumayı başlatır. Açık bir read-uid bağlantısı varken yenisi gelirse yeni bağlantı onun yerini alır ve önceki çağıran taraf `cancelled` alır.

### Parametreler

<div class="page-cards-grid">

<article class="page-card">
<h3><code>x-get</code></h3>
<p>NFC.cool bu URL'yi arka planda çağırır ve sonucu sorgu parametreleri olarak ekler. Hatalar ve iptaller dahil her sonuç anında buraya gelir.</p>
<p><strong>Zorunlu:</strong> <code>x-get</code>, <code>x-post</code> veya <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-post</code></h3>
<p>NFC.cool sonucu JSON olarak buraya POST eder.</p>
<p><strong>Zorunlu:</strong> <code>x-get</code>, <code>x-post</code> veya <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-success</code></h3>
<p>Başarılı okumadan sonra <code>uid</code>, <code>ndef</code> ve <code>state</code> eklenerek açılır. <code>x-get</code> ya da <code>x-post</code> ile birlikte kullanılırsa yalnızca <code>state</code> alır: UID, kişiye gösterilen sunucudan başka hiçbir yere gitmez.</p>
<p><strong>Zorunlu:</strong> <code>x-get</code>, <code>x-post</code> veya <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-error</code></h3>
<p>Hatadan sonra kişi NFC.cool'u kapattığında <code>errorCode</code>, <code>errorMessage</code> ve <code>state</code> ile açılır.</p>
<p><strong>Zorunlu:</strong> hayır</p>
</article>

<article class="page-card">
<h3><code>x-cancel</code></h3>
<p>Kişi iptal ettiğinde <code>state</code> ile açılır.</p>
<p><strong>Zorunlu:</strong> hayır</p>
</article>

<article class="page-card">
<h3><code>state</code></h3>
<p>Herhangi bir dize, örneğin tek kullanımlık istek kimliği. Her sonuçla birlikte değişmeden geri gelir.</p>
<p><strong>Zorunlu:</strong> hayır, ama önerilir</p>
</article>

<article class="page-card">
<h3><code>ndef</code></h3>
<p><code>1</code> olursa tag'in NDEF mesajı da okunur. Yoksa yalnızca UID okunur.</p>
<p><strong>Zorunlu:</strong> hayır</p>
</article>

</div>

`x-get` ya da `x-post` kullan, ikisini birden değil. Her callback değerini URL kodlamasından geçir.

Bu bağlantıyı herhangi bir web sayfası açabildiği için NFC.cool yalnızca `https` URL'lerine ve `yourapp://nfc-done` gibi başka uygulamaların URL şemalarına geri çağrı yapar; `x-get` ve `x-post` mutlaka `https` olmalıdır. Düz `http`, `javascript:`, `data:`, `tel:`, NFC.cool'un kendi şemaları ve kendi başına iş yapan sistem şemaları (`shortcuts:`, `itms-services:`, `mailto:`, `App-Prefs:` ve benzerleri) reddedilir; reddedilen tek bir callback bile içeren bağlantı tümüyle yok sayılır.

### UID

Büyük harf onaltılık, ayırıcısız, en anlamlı bayt önde. Uzunluğu çip ailelerini birbirinden ayırır:

<div class="page-cards-grid">

<article class="page-card">
<h3>NTAG, MIFARE Ultralight (ISO 14443-A)</h3>
<p>7 bayt</p>
<p><code>04A1B2C3D4E5F6</code></p>
</article>

<article class="page-card">
<h3>ICODE ve diğer ISO 15693 tag'leri</h3>
<p>8 bayt</p>
<p><code>E004015012345678</code></p>
</article>

</div>

ISO 15693 UID'leri, çipin üzerinde basılı olan ve çoğu okuyucunun gösterdiği sırayla `E0` ile başlar.

### NDEF mesajı

`ndef=1` ile `ndef`, tag'in ham NDEF mesajını, yani TLV başlığı olmadan kayıtları, dolgusuz Base64url olarak taşır ([RFC 4648, bölüm 5](https://www.rfc-editor.org/rfc/rfc4648#section-5)): `+` ve `/` yerine `-` ve `_`, hiç `=` yok. Tag'de NDEF mesajı yoksa bu alan gönderilmez.

```js
// Node.js
const bytes = Buffer.from(ndef, "base64url");
```

```python
# Python
import base64
data = base64.urlsafe_b64decode(ndef + "=" * (-len(ndef) % 4))
```

### `x-get`

```
GET https://your-server.example/nfc?code=abc123&uid=E004015012345678&ndef=0QEFVAJkZUhp&state=7f3c9a
GET https://your-server.example/nfc?code=abc123&error=cancelled&state=7f3c9a
```

URL'n olduğu gibi çağrılır; sonuç, içinde zaten bulunan parametrelerin arkasına eklenir. Her deneme tam olarak bir çağrı alır, yani bekleyen sayfa çağrı gelir gelmez beklemeyi bırakabilir:

<div class="page-cards-grid">

<article class="page-card">
<h3><code>cancelled</code></h3>
<p>Kişi okumayı iptal etti ya da tag okunmadan NFC.cool'u kapattı.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>Zamanında tag bulunamadı ya da tag okunamadı.</p>
</article>

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>Bu iPhone'da NFC.cool Business erişimi yok.</p>
</article>

</div>

`cancelled` ya da `scan-failed` sonrasında kişi yeniden deneyebilir; başarılı okuma da `x-get` adresini bu kez `uid` ile yeniden çağırır. Bir `state` için gelen son çağrıyı geçerli yanıt say. Herhangi bir 2xx durum koduyla yanıt ver. Başarılı okumanın çağrısı başarısız olursa NFC.cool yeniden göndermeyi önerir.

### `x-post`

```
POST https://your-server.example/api/uid
Content-Type: application/json

{"uid":"04A1B2C3D4E5F6","state":"7f3c9a","readAt":"2026-11-19T09:30:00Z","ndef":"0QEFVAJkZUhp"}
```

20 saniye içinde herhangi bir 2xx durum koduyla yanıt ver. Bunun dışındaki her şey hata sayılır: kişi isteği yeniden gönderebilir, NFC.cool'u kapatınca da `x-error` adresine `delivery-failed` bildirilir. Okumayı başlatan sayfa URL ile yeniden açılamıyorsa `x-post` kullan, örneğin başka bir uygulamanın içindeki web görünümünde; kişi, iOS'un sol üst köşede gösterdiği bağlantıyla geri döner.

NFC.cool, `x-get` ve `x-post` isteklerinde çerez göndermez. İsteği, bağlantıya koyduğun tek kullanımlık `state` değerinden tanı.

### `x-error` kodları

<div class="page-cards-grid">

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>Bu iPhone'da NFC.cool Business erişimi yok.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>Zamanında tag bulunamadı ya da tag okunamadı.</p>
</article>

<article class="page-card">
<h3><code>delivery-failed</code></h3>
<p><code>x-post</code> isteği başarısız oldu.</p>
</article>

</div>

### Örnek

Kendi sunucusunu bekleyen ve NDEF mesajını da isteyen sayfa:

```html
<a href="https://nfc.cool/x-callback-url/read-uid?x-get=https%3A%2F%2Fexample.com%2Fnfc%3Fcode%3Dabc123&ndef=1&state=7f3c9a">
  Scan tag
</a>
```

</section>
