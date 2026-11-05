---
title: "Geliştiriciler"
slug: "developers"
description: "NFC.cool'u kendi sistemine nasıl bağlarsın: webhook yükü belgeleri, App Intents, URL şemaları, makine tarafından okunabilir akışlar ve iPhone ile Android'de sunucu tarafı entegrasyon için gereken her şey."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Geliştirenler için

NFC.cool, kurduğun sisteme saygı duyan bir tarayıcı. Her tarama, öngörülebilir JSON ile doğrudan cihazdan kendi arka ucuna giden yapılandırılmış bir HTTP POST olabilir. Arada aracı yok, NFC.cool hesabı yok, bizim sunucularımıza yükleme yok.

<a href="#webhook-payload" class="landing-cta-button">Yükü gör</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/webhook.webp" alt="Webhook uç noktasına akan tarama verisi" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section">

## NFC.cool'u nereye bağlayabilirsin

Webhook, denetimindeki bir adrese giden JSON `POST` isteğinden ibaret; yani HTTP konuşan her şey oyunun içinde.

<div class="feature-capabilities-grid">

<article class="feature-capability-card">
<h3>Zapier</h3>
<p>Zapier'in "Catch Webhook" tetikleyicisiyle taramaları 5.000'den fazla uygulamaya yönlendir: CRM'ler, tablolar, Slack, aklına ne gelirse. Ücretsiz plan düşük hacimleri kaldırır.</p>
</article>

<article class="feature-capability-card">
<h3>n8n</h3>
<p>n8n'i kendi sunucunda çalıştır, görev başına ücret ödemeden sınırsız akış işlet. HTTP tetikleyici düğümü NFC.cool POST isteklerini doğrudan kabul eder.</p>
</article>

<article class="feature-capability-card">
<h3>Make (eski adıyla Integromat)</h3>
<p>Geniş uygulama desteği olan görsel akış kurucusu. Her NFC.cool taraması için giriş noktası olarak Webhooks modülünü kullan.</p>
</article>

<article class="feature-capability-card">
<h3>IFTTT</h3>
<p>Basit "şu olursa bunu yap" yönlendirmeleri için. IFTTT'nin Webhooks servisi sana NFC.cool webhook ayarına yapıştıracağın benzersiz bir adres verir.</p>
</article>

<article class="feature-capability-card">
<h3>Slack, Discord, Teams</h3>
<p>Webhook adresini bir Slack gelen webhook'una (ya da Discord/Teams karşılığına) yönlendir, tag her okutulduğunda kanala haber düşsün.</p>
</article>

<article class="feature-capability-card">
<h3>Kendi arka ucun</h3>
<p>JSON POST kabul eden her HTTPS uç noktası çalışır. Şema, kimlik doğrulama modeli ve örnek alıcılar aşağıda belgelenmiş.</p>
</article>

</div>

</section>

<section class="page-section">

## Sık kullanılan akış kalıpları

- **Stok ve denetim kaydı.** Ürünün üstündeki tag'i okut, NFC.cool bir tabloya ya da depo sistemine POST atsın; zaman damgası, tag kimliği ve içerikle birlikte satır düşsün.
- **Etkinlikte müşteri adayı toplama.** Stant afişindeki tag'i okut, CRM'in takip e-postasını kendiliğinden göndersin.
- **Akıllı ev tetikleyicileri.** Kapıdaki tag'i okutup "evdeyim" işaretle; Home Assistant, Homey ya da Hubitat bunu webhook üzerinden alsın.
- **Varlık takibi.** Bakım ekibi ekipmandaki tag'leri okutup denetimleri kaydetsin; uyum kaydını arka uç oluştursun.
- **Konferans girişleri.** Katılımcının NFC yakasını okut, webhook etkinlik platformunu anlık güncellesin.

</section>

<section class="page-section" id="webhooks">

## Webhook'lar

Uygulama içinde **Daha fazla sekmesi → Webhook** yolundan aç: tek bir HTTPS adresi gir, istersen HTTP Basic kimlik doğrulaması için kullanıcı adı ve parola ekle, sonra "NFC taramaları" ile "QR ve barkod taramaları" anahtarlarını ayrı ayrı aç. iOS ve Android'de var.

Uygulama, ayarladığın adrese tarama başına tek bir `POST` gönderir. Ayrı bir yeniden deneme kuyruğu yok: uç noktana ulaşılamıyorsa ya da 2xx dışında yanıt dönüyorsa tarama POST'u başarısız olur. Başarıda `204 No Content` dönmeyi hedefle; herhangi bir 2xx kabul sayılır.

Bu sayfa teknik başvuru kaynağı. Özelliğin genel tanıtımı için (diğer dört iOS otomasyon kancası, fiyatlandırma ve sık sorulanlar) [Webhook ve Otomasyon özellik sayfasına](/tr/features/webhooks/) bak.

</section>

<section class="page-section" id="webhook-payload">

## Webhook yükü

İçerik türü `application/json`, gövde biçimlendirilmiş JSON:

```json
{
  "identifier" : "04:A2:7F:1B:5E:80:00",
  "date" : "2026-05-12T14:23:01Z",
  "content" : "https://example.com/check-in/abc123"
}
```

Yapılandırılmış tag'ler (şu anda OpenPrintTag) iki alan daha ekler:

```json
{
  "identifier" : "04:A2:7F:1B:5E:80:00",
  "date" : "2026-05-12T14:23:01Z",
  "content" : "Filament Spool #1234",
  "tagType" : "openPrintTag",
  "structured" : {
    "material" : "PLA",
    "color" : "#FF6F4C",
    "manufacturer" : "Prusament",
    "uuid" : "5e8a-7c1d-4f90"
  }
}
```

Alan açıklamaları:

- `identifier` - NFC taramalarında tag'in donanım UID'si, iki nokta ile ayrılmış büyük harf onaltılık olarak (örneğin `04:A2:7F:1B:5E:80:00`). Tag başına sabittir, yani yinelenenleri ayıklamak için kullanabilirsin. QR ve barkod taramalarında ise her tarama için taze bir UUID gelir; kodun sabit kimliği değildir. UID'yi açığa çıkarmayan eski iOS uyumluluk modlarında değer düz metin olarak `NoIdentifierInCompatibilityMode` olur.
- `date` - ISO 8601 biçiminde, taramanın cihazda gerçekleştiği an.
- `content` - Çözülmüş içerik. NFC'de NDEF kaydının değeri (URI ya da metin); QR ve barkodda ham çözülmüş dize.
- `tagType` - Düz taramalarda gönderilmez. OpenPrintTag taramalarında `"openPrintTag"` olur.
- `structured` - Düz taramalarda gönderilmez. `tagType` varsa çözümlenmiş yapılandırılmış yük gelir.

</section>

<section class="page-section">

## Kimlik doğrulama

Webhook'lar **yalnızca HTTP Basic kimlik doğrulamasını** destekler. **Daha fazla sekmesi → Webhook** yolundan istersen kullanıcı adı ve parolayı iOS Anahtar Zinciri'nde saklarsın. Uygulama da sunucundan gelen standart `401 / WWW-Authenticate: Basic` isteklerine bu bilgilerle yanıt verir.

Yani kimlik doğrulamanın gerekip gerekmediğine uç noktan karar verir. Gerekmiyorsa uygulamada kullanıcı adı ve parolayı boş bırak, sunucuda da istekte bulunma. Gerekiyorsa ilk POST'ta `WWW-Authenticate: Basic realm="…"` başlığıyla `401` dön; cihaz saklanan bilgileri taşıyan `Authorization: Basic …` başlığıyla yeniden dener. Her şey TLS üzerinden gider ve NFC.cool sunucuları kimlik bilgilerini hiç görmez.

Bugün Bearer token, API anahtarı ya da HMAC imza desteği yok. Bunlara ihtiyacın varsa Basic'i kendi şemana çeviren bir ters vekil sunucuda (Cloudflare Worker, nginx ve benzeri) sonlandır.

</section>

<section class="page-section">

## Örnek alıcılar

Döngünün tamamını uçtan uca mı görmek istiyorsun? [GitHub'daki örnek webhook sunucusunu](https://github.com/NickAtGit/nfc-cool-webhook-server) klonla, her yükü canlı kaydeder. Aşağıdaki parçalar ise kendi sistemin için en yalın alıcılar.

### cURL - hızlı deneme

```bash
curl -X POST https://your-server.example/webhook \
  -u 'nfc-cool:your-password' \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"04:A2:7F:1B:5E:80:00","date":"2026-05-12T14:00:00Z","content":"hello"}'
```

### Node.js - Express alıcısı

```js
import express from "express";
import basicAuth from "express-basic-auth";

const app = express();
app.use(express.json());

app.post(
  "/webhook",
  basicAuth({
    users: { "nfc-cool": process.env.WEBHOOK_PASSWORD },
    challenge: true, // tells NFC.cool to retry with credentials
  }),
  (req, res) => {
    const { identifier, date, content, tagType } = req.body;
    console.log(`scan ${tagType ?? "plain"} ${content} id=${identifier} at ${date}`);
    res.status(204).end();
  }
);

app.listen(3000);
```

### Python - FastAPI alıcısı

```python
import os
import secrets
from fastapi import FastAPI, Depends, HTTPException, Request, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials

app = FastAPI()
security = HTTPBasic()

def check(creds: HTTPBasicCredentials = Depends(security)):
    ok_user = secrets.compare_digest(creds.username, "nfc-cool")
    ok_pass = secrets.compare_digest(creds.password, os.environ["WEBHOOK_PASSWORD"])
    if not (ok_user and ok_pass):
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            headers={"WWW-Authenticate": 'Basic realm="nfc-cool"'},
        )

@app.post("/webhook")
async def webhook(request: Request, _: None = Depends(check)):
    body = await request.json()
    print(f"scan: {body['content']} id={body['identifier']}")
    return {"status": "ok"}
```

</section>

<section class="page-section" id="shortcuts">

## App Intents ve Kısayollar

**iOS'taki** NFC.cool Tools, Kısayollar uygulamasına, otomasyonlara, odak modlarına ya da Apple Intelligence'a bağlayabileceğin birkaç App Intent ile geliyor.

<div class="page-cards-grid">

<article class="page-card">
<h3><code>Scan</code></h3>
<p>Seçtiğin işlevde tarama başlatır: NFC, QR ve barkod, belge, 3B nesne ya da oda.</p>
</article>

<article class="page-card">
<h3><code>Open Tab</code></h3>
<p>Tarama başlatmadan NFC.cool'u belirli bir sekmede açar (NFC, QR, belge, 3B, daha fazlası).</p>
</article>

<article class="page-card">
<h3><code>Get Last NFC Tag</code></h3>
<p>Son okunan NFC tag'inin içeriğini metin olarak döndürür; kısayola girdi olarak vermek için birebir. Uygulamayı açmaz.</p>
</article>

<article class="page-card">
<h3><code>Get Last QR Code</code></h3>
<p>Son okunan QR kodun ya da barkodun içeriğini döndürür. Uygulamayı açmaz.</p>
</article>

<article class="page-card">
<h3><code>Write NFC</code></h3>
<p>Kısayolun verdiği adres ya da metinle önceden doldurulmuş NFC yazma akışını açar.</p>
</article>

</div>

iOS 18'e özel sürümler (`NFC Scan`, `QR Scan`, `Document Scan`, `Object Scan`, `Room Scan`) doğrudan Spotlight'ta ve aksiyon düğmesi seçicisinde görünür.

</section>

<section class="page-section" id="url-schemes">

## URL şemaları

Diğer iOS uygulamalarından, widget'lardan ya da ana ekran kısayollarından derin bağlantı vermek için NFC.cool Tools şu adresleri kaydeder:

```
nfcforiphone://scan-nfc
nfcforiphone://scan-code
nfcforiphone://scan-document
nfcforiphone://scan-object       (iOS 17+)
nfcforiphone://scan-room         (iOS 17+)
```

Bunlardan herhangi birini açmak doğrudan ilgili tarayıcıya götürür. Dışarıdan gelen tag ve konum bağlantılarını devralmak için `nfc://` ve `geo://` şemaları da kayıtlıdır.

</section>

<section class="page-section">

## Makine tarafından okunabilir kaynaklar

Araçlar, arama motorları ve yapay zeka ajanları için keşfedilebilir akışlar:

<div class="page-cards-grid">

<article class="page-card">
<h3><a href="/sitemap.xml"><code>/sitemap.xml</code></a></h3>
<p>Tam site dizini: her adres ve son değişiklik tarihi.</p>
</article>

<article class="page-card">
<h3><a href="/llms.txt"><code>/llms.txt</code></a></h3>
<p>Yapay zeka dostu site rehberi (SiteKit kendiliğinden üretir).</p>
</article>

<article class="page-card">
<h3><a href="/feed.xml"><code>/feed.xml</code></a></h3>
<p>Her bölümün tam metnini içeren site geneli RSS.</p>
</article>

<article class="page-card">
<h3><a href="/blog/feed.xml"><code>/blog/feed.xml</code></a></h3>
<p>Yalnızca blog için RSS akışı.</p>
</article>

<article class="page-card">
<h3><a href="/changelog/feed.xml"><code>/changelog/feed.xml</code></a></h3>
<p>Sürüm akışı: sürümler, tarihler ve sürüm notları.</p>
</article>

<article class="page-card">
<h3><a href="/assets/nav-index.json"><code>/assets/nav-index.json</code></a></h3>
<p>Başlıklar, özetler, etiketler ve adreslerle yapılandırılmış gezinme dizini.</p>
</article>

<article class="page-card">
<h3><a href="/assets/search-index.json"><code>/assets/search-index.json</code></a></h3>
<p>İstemci tarafı arama için her yazının düz metin içeriği.</p>
</article>

</div>

NFC.cool üzerine bir şey mi kuruyorsun? Ya da bu sayfada olması gereken bir entegrasyon ortağı mı gördün? [Bize yaz](mailto:info@nfc.cool?subject=NFC.cool%20Support).

</section>
