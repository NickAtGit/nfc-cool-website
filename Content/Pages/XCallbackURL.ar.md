---
title: "NFC.cool x-callback-url"
slug: "x-callback-url"
description: "يمكن للتطبيقات وصفحات الويب الأخرى أن تطلب من NFC.cool على iPhone تنفيذ إجراء وإعادة النتيجة إليها، وفق اصطلاح x-callback-url."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# NFC.cool x-callback-url

يمكن للتطبيقات وصفحات الويب الأخرى أن تطلب من NFC.cool على iPhone تنفيذ إجراء وإعادة النتيجة إليها، وفق اصطلاح [x-callback-url](https://x-callback-url.com).

تجد الـ Webhooks والاختصارات ومخططات URL في [صفحة المطورين](/ar/developers/).

<a href="#read-uid" class="landing-cta-button">اقرأ التوثيق</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/nfc-scan-tag.webp" alt="iPhone يمسح وسم NFC" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section" id="read-uid">

## قراءة معرّف الوسم من تطبيقك أو صفحة الويب الخاصة بك

يطلب الرابط من NFC.cool أن يقرأ وسمًا واحدًا ويعيد إليك معرّفه UID، ومع `ndef=1` يعيد رسالة NDEF المخزّنة على الوسم أيضًا. يعمل الرابط من أي صفحة ويب أو تطبيق على iPhone، ولا يحتاج إلى أي إعداد سوى تثبيت NFC.cool. ويتبع الرابط اصطلاح [x-callback-url](https://x-callback-url.com). قراءة الوسوم لصالح تطبيقات ومواقع أخرى جزء من NFC.cool Business، ترخيص الشركات لـNFC.cool على iPhone: [راسلنا](mailto:info@nfc.cool?subject=NFC.cool%20Business) للحصول عليه.

```
https://nfc.cool/x-callback-url/read-uid?<parameters>
nfcforiphone://x-callback-url/read-uid?<parameters>
```

يؤدي الشكلان الوظيفة نفسها. يُفضَّل استخدام صيغة `https`: فعلى جهاز iPhone لم يُثبَّت عليه NFC.cool تفتح صفحة توضّح كيفية الحصول عليه، بدلًا من أن تفشل بصمت. ضع الرابط في وصلة ينقر عليها الشخص بنفسه، لأن iOS لا يفتح التطبيقات من روابط يتبعها سكربت تلقائيًا.

ينتقل NFC.cool إلى الواجهة، ويبيّن الجهة التي ستتلقّى معرّف الوسم، ثم يبدأ المسح. وإذا كان هناك رابط read-uid مفتوح بالفعل، يحلّ الرابط الأحدث محلّه، ويتلقّى المستدعي السابق `cancelled`.

### المعاملات

<div class="page-cards-grid">

<article class="page-card">
<h3><code>x-get</code></h3>
<p>يستدعي NFC.cool عنوان URL هذا في الخلفية ويضع النتيجة في معاملات الاستعلام. تصل إليه كل النتائج فورًا، بما فيها حالات الفشل والإلغاء.</p>
<p><strong>إلزامي:</strong> <code>x-get</code>, <code>x-post</code> أو <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-post</code></h3>
<p>يرسل NFC.cool النتيجة إلى هذا العنوان بطلب POST بصيغة JSON.</p>
<p><strong>إلزامي:</strong> <code>x-get</code>, <code>x-post</code> أو <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-success</code></h3>
<p>يُفتح بعد قراءة ناجحة، مع إلحاق <code>uid</code> و<code>ndef</code> و<code>state</code>. وإذا استُخدم مع <code>x-get</code> أو <code>x-post</code> فلا يتلقّى إلا <code>state</code>: يذهب المعرّف UID إلى الخادم الذي عُرض على الشخص ولا يذهب إلى أي مكان آخر.</p>
<p><strong>إلزامي:</strong> <code>x-get</code>, <code>x-post</code> أو <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-error</code></h3>
<p>يُفتح عندما يغلق الشخص NFC.cool بعد حدوث فشل، مع <code>errorCode</code> و<code>errorMessage</code> و<code>state</code>.</p>
<p><strong>إلزامي:</strong> لا</p>
</article>

<article class="page-card">
<h3><code>x-cancel</code></h3>
<p>يُفتح عندما يُلغي الشخص العملية، مع <code>state</code>.</p>
<p><strong>إلزامي:</strong> لا</p>
</article>

<article class="page-card">
<h3><code>state</code></h3>
<p>أي سلسلة نصية، مثل معرّف طلب يُستخدم مرة واحدة. يُعاد دون تغيير مع كل نتيجة.</p>
<p><strong>إلزامي:</strong> لا، لكنه مُستحسَن</p>
</article>

<article class="page-card">
<h3><code>ndef</code></h3>
<p>القيمة <code>1</code> تقرأ رسالة NDEF الخاصة بالوسم أيضًا. ومن دونها لا يُقرأ سوى المعرّف UID.</p>
<p><strong>إلزامي:</strong> لا</p>
</article>

</div>

استخدم `x-get` أو `x-post`، لا كليهما. ورمّز قيمة كل callback بترميز URL.

يمكن لأي صفحة ويب فتح هذا الرابط، لذا لا يستدعي NFC.cool إلا عناوين `https` ومخطّطات URL الخاصة بتطبيقات أخرى، مثل `yourapp://nfc-done`؛ ويجب أن يكون `x-get` و`x-post` بصيغة `https`. يرفض NFC.cool كلًّا من `http` العادي و`javascript:` و`data:` و`tel:` ومخطّطات NFC.cool نفسه ومخطّطات النظام التي تنفّذ إجراءً من تلقاء نفسها (`shortcuts:` و`itms-services:` و`mailto:` و`App-Prefs:` وما شابهها)، ويتجاهل أي رابط يحتوي على callback مرفوض.

### المعرّف UID

بصيغة ست عشرية بأحرف كبيرة، دون فواصل، والبايت الأعلى أهمية أولًا. ويميّز طوله بين عائلات الشرائح:

<div class="page-cards-grid">

<article class="page-card">
<h3>NTAG و MIFARE Ultralight (ISO 14443-A)</h3>
<p>7 بايتات</p>
<p><code>04A1B2C3D4E5F6</code></p>
</article>

<article class="page-card">
<h3>ICODE ووسوم ISO 15693 الأخرى</h3>
<p>8 بايتات</p>
<p><code>E004015012345678</code></p>
</article>

</div>

تبدأ معرّفات UID لوسوم ISO 15693 بـ`E0`، بالترتيب المطبوع على الشريحة والذي تعرضه معظم أجهزة القراءة.

### رسالة NDEF

مع `ndef=1` يحمل `ndef` رسالة NDEF الخام المخزّنة على الوسم، أي السجلات دون ترويسة TLV، بترميز Base64url دون حشو ([RFC 4648، القسم 5](https://www.rfc-editor.org/rfc/rfc4648#section-5)): `-` و`_` بدلًا من `+` و`/`، ودون `=`. ويُحذف هذا المعامل إذا لم يكن على الوسم رسالة NDEF.

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

يُستدعى عنوان URL الخاص بك كما هو، وتُضاف النتيجة بعد المعاملات الموجودة فيه أصلًا. تحصل كل محاولة على استدعاء واحد بالضبط، لذا يمكن للصفحة التي تنتظره أن تتوقّف عن الانتظار فور وصوله:

<div class="page-cards-grid">

<article class="page-card">
<h3><code>cancelled</code></h3>
<p>ألغى الشخص المسح أو أغلق NFC.cool قبل قراءة أي وسم.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>لم يُعثر على وسم في الوقت المحدد، أو تعذّرت قراءة الوسم.</p>
</article>

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>لا يملك هذا الـiPhone وصولًا إلى NFC.cool Business.</p>
</article>

</div>

بعد `cancelled` أو `scan-failed` يمكن للشخص المحاولة مجددًا، وعندها تستدعي القراءة الناجحة `x-get` مرة أخرى مع `uid`: اعتمد آخر استدعاء لكل `state` على أنه الإجابة. أجِب بأي رمز حالة 2xx. وإذا فشل استدعاء النجاح، يعرض NFC.cool إرساله مرة أخرى.

### `x-post`

```
POST https://your-server.example/api/uid
Content-Type: application/json

{"uid":"04A1B2C3D4E5F6","state":"7f3c9a","readAt":"2026-11-19T09:30:00Z","ndef":"0QEFVAJkZUhp"}
```

أجِب بأي رمز حالة 2xx خلال 20 ثانية. وأي استجابة أخرى تُعدّ فشلًا: يمكن للشخص إعادة الإرسال، وعند إغلاق NFC.cool يصل الخطأ `delivery-failed` إلى `x-error`. استخدم `x-post` عندما يتعذّر إعادة فتح الصفحة التي بدأت القراءة عبر URL، كما في web view داخل تطبيق آخر؛ ويعود الشخص إليها عبر الرابط الذي يعرضه iOS في الزاوية العلوية من الشاشة.

لا يرسل NFC.cool أي ملفات تعريف ارتباط (cookies) مع `x-get` أو `x-post`. تعرّف على الطلب من خلال قيمة `state` أحادية الاستخدام التي وضعتها في الرابط.

### رموز `x-error`

<div class="page-cards-grid">

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>لا يملك هذا الـiPhone وصولًا إلى NFC.cool Business.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>لم يُعثر على وسم في الوقت المحدد، أو تعذّرت قراءة الوسم.</p>
</article>

<article class="page-card">
<h3><code>delivery-failed</code></h3>
<p>فشل طلب <code>x-post</code>.</p>
</article>

</div>

### مثال

صفحة تنتظر ردّ خادمها، وتتلقّى رسالة NDEF أيضًا:

```html
<a href="https://nfc.cool/x-callback-url/read-uid?x-get=https%3A%2F%2Fexample.com%2Fnfc%3Fcode%3Dabc123&ndef=1&state=7f3c9a">
  Scan tag
</a>
```

</section>
