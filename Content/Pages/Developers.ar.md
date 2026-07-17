---
title: "المطوّرون"
slug: "developers"
description: "كيفية ربط NFC.cool بمنظومتك التقنية - مرجع حمولة الـwebhook، وApp Intents، ومخطّطات URL، والخلاصات القابلة للقراءة آليًا، وكل ما تحتاجه للتكامل من جهة الخادم على iPhone و Android."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# للبُناة

NFC.cool ماسح يحترم منظومتك التقنية. يمكن أن تتحوّل كل عملية مسح إلى طلب HTTP POST منظَّم إلى الخادم الخلفي الخاص بك، بصيغة JSON متوقّعة، يُرسَل مباشرةً من الجهاز. دون وسيط، ودون حساب NFC.cool، ودون رفع أي شيء إلى خوادمنا.

<a href="#webhook-payload" class="landing-cta-button">اطّلع على الحمولة</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/webhook.webp" alt="تدفّق بيانات المسح إلى نقطة نهاية webhook" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section">

## أين يمكنك ربط NFC.cool

الـwebhook ليس سوى طلب `POST` بصيغة JSON إلى URL تتحكّم به - لذا فإن أي شيء يتحدّث بروتوكول HTTP صالح للاستخدام.

<div class="feature-capabilities-grid">

<article class="feature-capability-card">
<h3>Zapier</h3>
<p>استخدم مُشغّل "Catch Webhook" في Zapier لتوجيه عمليات المسح إلى أكثر من ٥٬٠٠٠ تطبيق - أنظمة CRM والجداول وSlack وغيرها. تكفي الباقة المجانية للأحجام الخفيفة.</p>
</article>

<article class="feature-capability-card">
<h3>n8n</h3>
<p>استضِف n8n ذاتيًا لتشغيل عدد غير محدود من مسارات العمل دون تسعير لكل مهمة. تقبل عقدة مُشغّل HTTP طلبات POST من NFC.cool مباشرةً.</p>
</article>

<article class="feature-capability-card">
<h3>Make (المعروف سابقًا باسم Integromat)</h3>
<p>مُنشئ مرئي لمسارات العمل مع تغطية واسعة للتطبيقات. استخدم وحدة Webhooks كنقطة دخول لكل عملية مسح من NFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>IFTTT</h3>
<p>للتوجيه البسيط من نوع "if this then that". تمنحك خدمة Webhooks في IFTTT عنوان URL فريدًا لإدراجه في إعدادات webhook الخاصة بـNFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>Slack / Discord / Teams</h3>
<p>وجّه عنوان URL الخاص بالـwebhook إلى incoming-webhook في Slack (أو ما يعادله في Discord/Teams) لتنبيه قناة في كل مرة يُلمَس فيها وسم.</p>
</article>

<article class="feature-capability-card">
<h3>خادمك الخلفي الخاص</h3>
<p>تعمل أي نقطة نهاية HTTPS تقبل طلب POST بصيغة JSON. المخطّط ونموذج المصادقة وأمثلة المستقبِلات موثّقة أدناه.</p>
</article>

</div>

</section>

<section class="page-section">

## أنماط مسارات العمل الشائعة

- **الجرد وسجلّ التدقيق.** المس وسمًا على منتج، فيرسل NFC.cool طلب POST إلى جدول أو نظام مستودع؛ فيظهر صفٌّ يحوي الطابع الزمني ومعرّف الوسم والحمولة.
- **التقاط العملاء المحتملين في الفعاليات.** المس وسمًا على لافتة جناحك، فيرسل نظام CRM لديك بريد متابعة تلقائيًا.
- **مُشغّلات المنزل الذكي.** المس وسمًا على الباب الأمامي لتسجيل "أنا في المنزل" - فيلتقطه Home Assistant / Homey / Hubitat عبر webhook.
- **تتبّع الأصول.** يلمس موظفو الصيانة وسومًا على المعدّات لتسجيل عمليات الفحص؛ فيبني الخادم الخلفي سجلّ الامتثال.
- **تسجيل الحضور في المؤتمرات.** المس شارة NFC لأحد الحضور؛ فيحدّث الـwebhook منصة فعاليتك في الوقت الفعلي.

</section>

<section class="page-section" id="webhooks">

## Webhooks

فعّلها من **تبويب More ← Webhook** داخل التطبيق: أدخِل عنوان HTTPS URL واحدًا، واختياريًا اسم مستخدم/كلمة مرور لمصادقة HTTP Basic، ثم فعّل "NFC scans" و"QR & barcode scans" كلًّا على حدة. متوفّر على iOS و Android.

يُطلق التطبيق طلب `POST` واحدًا لكل عملية مسح إلى عنوان URL الذي أعددته. لا توجد قائمة انتظار منفصلة لإعادة المحاولة: إذا تعذّر الوصول إلى نقطة النهاية أو أعادت استجابة غير 2xx، فسيفشل طلب POST الخاص بالمسح. اجعل الهدف `204 No Content` عند النجاح؛ وتُعامَل أي استجابة 2xx على أنها مقبولة.

هذه الصفحة هي المرجع التقني. للاطّلاع على نظرة عامة عن الميزة - خطّافات الأتمتة الأربعة الأخرى على iOS والتسعير والأسئلة الشائعة - راجع [صفحة ميزة Webhooks والأتمتة](/features/webhooks/).

</section>

<section class="page-section" id="webhook-payload">

## حمولة الـwebhook

نوع المحتوى `application/json`، والمتن بصيغة JSON منسّقة:

```json
{
  "identifier" : "04:A2:7F:1B:5E:80:00",
  "date" : "2026-05-12T14:23:01Z",
  "content" : "https://example.com/check-in/abc123"
}
```

تضيف الوسوم المنظَّمة (حاليًا OpenPrintTag) حقلين إضافيين:

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

مرجع الحقول:

- `identifier` - في عمليات مسح NFC، هو معرّف الأجهزة UID للوسم بصيغة hex بأحرف كبيرة مفصولة بنقطتين (مثل `04:A2:7F:1B:5E:80:00`). ثابت لكل وسم، لذا يمكنك استخدامه لإزالة التكرار. أما في عمليات مسح QR والباركود فهو UUID جديد لكل عملية مسح - وليس معرّف رمز ثابتًا. وفي أوضاع توافق NFC القديمة على iOS التي لا تكشف عن UID، تكون القيمة النص الحرفي `NoIdentifierInCompatibilityMode`.
- `date` - بصيغة ISO 8601، وقت حدوث المسح على الجهاز.
- `content` - المحتوى بعد فك ترميزه. في NFC، قيمة سجل NDEF (URI أو نص)؛ وفي QR/الباركود، السلسلة الخام بعد فك ترميزها.
- `tagType` - يُحذَف في عمليات المسح العادية. تُضبَط قيمته على `"openPrintTag"` لعمليات مسح OpenPrintTag.
- `structured` - يُحذَف في عمليات المسح العادية. حمولة منظَّمة مُحلَّلة عند وجود `tagType`.

</section>

<section class="page-section">

## المصادقة

تدعم الـwebhooks **مصادقة HTTP Basic فقط**. في **تبويب More ← Webhook** يمكنك اختياريًا تخزين اسم مستخدم وكلمة مرور في iOS Keychain. عندها يستجيب التطبيق لتحدّيات HTTP القياسية `401 / WWW-Authenticate: Basic` القادمة من خادمك باستخدام بيانات الاعتماد تلك.

هذا يعني أن نقطة النهاية لديك هي من يتحكّم في ما إذا كانت المصادقة مطلوبة. إن لم تكن بحاجة إلى مصادقة، فاترك اسم المستخدم وكلمة المرور فارغين في التطبيق وتجاوز التحدّي على الخادم. وإن كنت بحاجة إليها، فأعِد استجابة `401` مع `WWW-Authenticate: Basic realm="…"` عند أول طلب POST - وسيعيد الجهاز المحاولة مع `Authorization: Basic …` حاملًا بيانات الاعتماد المخزّنة. كل شيء ينتقل عبر TLS؛ ولا ترى خوادم NFC.cool بيانات اعتمادك أبدًا.

لا يوجد اليوم دعم لرمز Bearer أو مفتاح API أو توقيع HMAC. إن كنت بحاجة إلى ذلك، فعالِجها عند وكيل عكسي (Cloudflare Worker أو nginx وغيرهما) يترجم Basic ← مخطّطك.

</section>

<section class="page-section">

## أمثلة المستقبِلات

هل تريد الحلقة الكاملة من طرف إلى طرف؟ استنسِخ [خادم webhook المرجعي على GitHub](https://github.com/NickAtGit/nfc-cool-webhook-server) - فهو يسجّل كل حمولة مباشرةً. المقتطفات أدناه مستقبِلات مبسّطة لمنظومتك التقنية الخاصة.

### cURL - اختبار تحقّق سريع

```bash
curl -X POST https://your-server.example/webhook \
  -u 'nfc-cool:your-password' \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"04:A2:7F:1B:5E:80:00","date":"2026-05-12T14:00:00Z","content":"hello"}'
```

### Node.js - مستقبِل Express

```js
import express from "express";
import basicAuth from "express-basic-auth";

const app = express();
app.use(express.json());

app.post(
  "/webhook",
  basicAuth({
    users: { "nfc-cool": process.env.WEBHOOK_PASSWORD },
    challenge: true, // يخبر NFC.cool بإعادة المحاولة مع بيانات الاعتماد
  }),
  (req, res) => {
    const { identifier, date, content, tagType } = req.body;
    console.log(`scan ${tagType ?? "plain"} ${content} id=${identifier} at ${date}`);
    res.status(204).end();
  }
);

app.listen(3000);
```

### Python - مستقبِل FastAPI

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

## App Intents والاختصارات

يوفّر NFC.cool Tools على **iOS** مجموعة من App Intents يمكنك ربطها بتطبيق الاختصارات أو الأتمتة أو أوضاع التركيز أو Apple Intelligence.

<div class="page-cards-grid">

<article class="page-card">
<h3><code>Scan</code></h3>
<p>يبدأ عملية مسح في الوظيفة التي تختارها: NFC أو QR / الباركود أو مستند أو جسم ثلاثي الأبعاد أو غرفة.</p>
</article>

<article class="page-card">
<h3><code>Open Tab</code></h3>
<p>يفتح NFC.cool على تبويب محدّد (NFC أو QR أو مستند أو ثلاثي الأبعاد أو المزيد) دون بدء عملية مسح.</p>
</article>

<article class="page-card">
<h3><code>Get Last NFC Tag</code></h3>
<p>يُعيد محتوى آخر وسم NFC تم مسحه على شكل سلسلة نصية - مفيد كمُدخل لاختصار. لا يشغّل التطبيق.</p>
</article>

<article class="page-card">
<h3><code>Get Last QR Code</code></h3>
<p>يُعيد محتوى آخر رمز QR / باركود تم مسحه. لا يشغّل التطبيق.</p>
</article>

<article class="page-card">
<h3><code>Write NFC</code></h3>
<p>يفتح مسار كتابة NFC معبّأً مسبقًا بعنوان URL أو حمولة نصية يوفّرها الاختصار.</p>
</article>

</div>

تظهر إصدارات iOS 18 المخصّصة (`NFC Scan` و`QR Scan` و`Document Scan` و`Object Scan` و`Room Scan`) مباشرةً في Spotlight / مُنتقي زر الإجراء.

</section>

<section class="page-section" id="url-schemes">

## مخطّطات URL

لإنشاء روابط عميقة من تطبيقات iOS أخرى أو الأدوات أو اختصارات الشاشة الرئيسية، يسجّل NFC.cool Tools عناوين URL هذه:

```
nfcforiphone://scan-nfc
nfcforiphone://scan-code
nfcforiphone://scan-document
nfcforiphone://scan-object       (iOS 17+)
nfcforiphone://scan-room         (iOS 17+)
```

يؤدي فتح أيٍّ منها إلى الانتقال مباشرةً إلى الماسح المطابق. كما يُسجَّل المخطّطان `nfc://` و`geo://` لتمرير روابط الوسوم/الإحداثيات الخارجية.

</section>

<section class="page-section">

## الموارد القابلة للقراءة آليًا

خلاصات قابلة للاكتشاف للأدوات ومحرّكات البحث ووكلاء الذكاء الاصطناعي:

<div class="page-cards-grid">

<article class="page-card">
<h3><a href="/sitemap.xml"><code>/sitemap.xml</code></a></h3>
<p>فهرس كامل للموقع - كل مسار وتاريخ آخر تعديل.</p>
</article>

<article class="page-card">
<h3><a href="/llms.txt"><code>/llms.txt</code></a></h3>
<p>دليل موقع ملائم للذكاء الاصطناعي (يُنشَأ تلقائيًا بواسطة SiteKit).</p>
</article>

<article class="page-card">
<h3><a href="/feed.xml"><code>/feed.xml</code></a></h3>
<p>خلاصة RSS للموقع بأكمله تحتوي على النص الكامل من كل قسم.</p>
</article>

<article class="page-card">
<h3><a href="/blog/feed.xml"><code>/blog/feed.xml</code></a></h3>
<p>خلاصة RSS للمدوّنة فقط.</p>
</article>

<article class="page-card">
<h3><a href="/changelog/feed.xml"><code>/changelog/feed.xml</code></a></h3>
<p>خلاصة الإصدارات - الإصدارات والتواريخ ومدخلات سجل التغييرات.</p>
</article>

<article class="page-card">
<h3><a href="/assets/nav-index.json"><code>/assets/nav-index.json</code></a></h3>
<p>فهرس تنقّل منظَّم يحتوي على العناوين والملخّصات والوسوم وعناوين URL.</p>
</article>

<article class="page-card">
<h3><a href="/assets/search-index.json"><code>/assets/search-index.json</code></a></h3>
<p>محتوى نصي صِرف لكل مقال من أجل البحث من جهة العميل.</p>
</article>

</div>

هل تبني شيئًا فوق NFC.cool؟ أو لاحظت شريك تكامل يستحق الظهور على هذه الصفحة؟ [راسِلنا](mailto:info@nfc.cool?subject=NFC.cool%20Support).

</section>
