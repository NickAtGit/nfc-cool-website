---
title: "قارئ NFC عبر الإنترنت"
slug: "online-nfc-reader"
description: "اقرأ وسوم NFC واكتب عليها مباشرةً في متصفّحك - دون تطبيق ودون تسجيل. امسح وسمًا لترى محتواه، أو اكتب رابطًا أو نصًا عليه. مجاني، ويعمل في Chrome على Android؛ ويحصل مستخدمو iPhone على تطبيق NFC.cool المجاني."
image: "/assets/images/og-landing.webp"
---

<div style="display:none" aria-hidden="true"><svg><symbol id="nfc-icon-wave" viewBox="0 0 24 24"><path fill="currentColor" d="M8.77 12C8.77 10.18 8.14 8.48 7.02 7.15C6.29 6.29 5.22 7.27 5.77 7.97C6.84 9.32 7.25 10.44 7.25 12C7.25 13.55 6.84 14.67 5.77 16.02C5.23 16.72 6.3 17.69 7.02 16.83C8.14 15.51 8.77 13.82 8.77 12ZM13.56 12C13.56 9.22 12.69 6.61 11.12 4.5C10.41 3.56 9.18 4.47 9.84 5.33C11.28 7.22 12.05 9.53 12.05 12C12.05 14.46 11.28 16.77 9.84 18.66C9.18 19.53 10.41 20.44 11.12 19.48C12.69 17.37 13.56 14.77 13.56 12ZM18.38 12C18.38 8.26 17.21 4.78 15.14 1.89C14.5 1 13.2 1.78 13.89 2.71C15.83 5.37 16.86 8.58 16.86 12C16.86 15.42 15.82 18.62 13.89 21.28C13.22 22.2 14.47 23.02 15.14 22.1C17.21 19.21 18.38 15.73 18.38 12Z"/></symbol><symbol id="nfc-icon-android" viewBox="0 0 24 24" fill="none"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></symbol><symbol id="nfc-icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17.5 19 7"/></symbol><symbol id="nfc-icon-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></symbol></svg></div>

<section class="page-hero nfc-reader-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# قارئ NFC عبر الإنترنت

بنيتُ هذه الأداة لتتمكّن من قراءة وسم NFC مباشرةً من متصفّحك - دون تطبيق ودون تسجيل. المس *امسح وسمًا*، وقرّب هاتفك من الوسم، فيظهر محتواه على الفور. انتقل إلى تبويب *الكتابة* لتضع أيضًا رابطًا أو نصًا على وسم. كل شيء يجري على هاتفك، ولا يغادره أيّ شيء تمسحه إطلاقًا.

<div class="nfc-hero-reqs"><span class="platform-pill is-android"><svg class="platform-pill-icon" viewBox="2 2 20 20" fill="none" aria-hidden="true"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></svg><span class="platform-pill-label">Chrome على Android</span></span></div>

</div>

<div class="page-hero-visual">

<div id="nfc-reader-app" class="nfc-reader" data-state="desktop" data-mode="read" data-write-type="url">
<div class="nfc-phone">
<div class="nfc-phone-screen">
<div class="nfc-reader-tabs" role="tablist" aria-label="وضع القارئ">
<button type="button" class="nfc-reader-tab" data-nfc-tab="read" role="tab" aria-selected="true">القراءة</button>
<button type="button" class="nfc-reader-tab" data-nfc-tab="write" role="tab" aria-selected="false">الكتابة</button>
</div>
<div class="nfc-reader-body">
<div class="nfc-reader-panel" data-panel="read-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">اقرأ وسم NFC</p>
<p class="nfc-reader-lead">المس الزر، ثم قرّب وسمًا من أعلى هاتفك. سأعرض لك ما عليه.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-scan><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>اقرأ NFC</span></button>
<p class="nfc-reader-fineprint">هل تريد تجربة NFC أصيلة بوظائف NFC أكثر؟ <a href="/features/nfc-reader-writer/">احصل على تطبيق NFC.cool!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="scanning">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">اقرأ NFC</p>
<p class="nfc-reader-lead">قرّب وسم NFC من أعلى ظهر هاتفك.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>إلغاء</span></button>
</div>
<div class="nfc-reader-panel" data-panel="result">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>تمت قراءة الوسم</span>
<ul class="nfc-reader-records" data-nfc-records></ul>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">الرقم التسلسلي</span><span class="nfc-reader-value" data-nfc-serial></span></div>
<details class="nfc-reader-details"><summary>التفاصيل التقنية</summary><div class="nfc-reader-tech" data-nfc-tech></div></details>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>اقرأ NFC</span></button>
</div>
<div class="nfc-reader-panel" data-panel="write-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">اكتب على وسم NFC</p>
<select class="nfc-reader-select" data-nfc-type-select aria-label="ما الذي تريد كتابته على الوسم">
<optgroup label="أساسي">
<option value="link">رابط</option>
<option value="text">نص</option>
</optgroup>
<optgroup label="جهة اتصال">
<option value="phone">رقم الهاتف</option>
<option value="email">بريد إلكتروني</option>
<option value="sms">رسالة SMS</option>
<option value="contact">بطاقة جهة اتصال</option>
</optgroup>
<optgroup label="شبكة">
<option value="wifi">شبكة Wi-Fi</option>
<option value="location">موقع</option>
</optgroup>
</select>
<div class="nfc-reader-form" data-nfc-form>
<div class="nfc-reader-fields" data-nfc-fields="link">
<input type="url" class="nfc-reader-input" data-k="url" placeholder="https://example.com" aria-label="الرابط المراد كتابته"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="text" hidden>
<textarea class="nfc-reader-input nfc-reader-textarea" data-k="text" rows="3" placeholder="اكتب نصك هنا" aria-label="النص المراد كتابته"></textarea>
</div>
<div class="nfc-reader-fields" data-nfc-fields="phone" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="رقم الهاتف" aria-label="رقم الهاتف"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="email" hidden>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="عنوان البريد الإلكتروني" aria-label="عنوان البريد الإلكتروني"/>
<input type="text" class="nfc-reader-input" data-k="subject" placeholder="الموضوع (اختياري)" aria-label="موضوع البريد الإلكتروني، اختياري"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="sms" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="رقم الهاتف" aria-label="رقم هاتف SMS"/>
<input type="text" class="nfc-reader-input" data-k="body" placeholder="الرسالة (اختياري)" aria-label="رسالة SMS، اختياري"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="location" hidden>
<input type="text" class="nfc-reader-input" data-k="lat" inputmode="decimal" placeholder="خط العرض" aria-label="خط العرض"/>
<input type="text" class="nfc-reader-input" data-k="lng" inputmode="decimal" placeholder="خط الطول" aria-label="خط الطول"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="contact" hidden>
<input type="text" class="nfc-reader-input" data-k="name" placeholder="الاسم الكامل" aria-label="اسم جهة الاتصال"/>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="الهاتف (اختياري)" aria-label="هاتف جهة الاتصال، اختياري"/>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="البريد الإلكتروني (اختياري)" aria-label="بريد جهة الاتصال الإلكتروني، اختياري"/>
<input type="text" class="nfc-reader-input" data-k="org" placeholder="المؤسسة (اختياري)" aria-label="مؤسسة جهة الاتصال، اختياري"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="wifi" hidden>
<input type="text" class="nfc-reader-input" data-k="ssid" placeholder="اسم الشبكة (SSID)" aria-label="اسم شبكة Wi-Fi"/>
<input type="text" class="nfc-reader-input" data-k="password" placeholder="كلمة المرور" aria-label="كلمة مرور Wi-Fi"/>
<select class="nfc-reader-select" data-k="security" aria-label="حماية Wi-Fi">
<option value="wpa">WPA / WPA2</option>
<option value="wep">WEP</option>
<option value="open">مفتوحة (دون كلمة مرور)</option>
</select>
</div>
</div>
<p class="nfc-reader-input-error" data-nfc-input-error></p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>اكتب على الوسم</span></button>
<p class="nfc-reader-fineprint">هل تريد تجربة NFC أصيلة بوظائف NFC أكثر؟ <a href="/features/nfc-reader-writer/">احصل على تطبيق NFC.cool!</a></p>
</div>
<div class="nfc-reader-panel" data-panel="writing">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">اكتب NFC</p>
<p class="nfc-reader-lead">قرّب وسم NFC من أعلى ظهر هاتفك.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>إلغاء</span></button>
</div>
<div class="nfc-reader-panel" data-panel="written">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>تمت الكتابة على الوسم</span>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">ما كُتب على الوسم</span><span class="nfc-reader-value" data-nfc-written></span></div>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>اكتب على وسم آخر</span></button>
</div>
<div class="nfc-reader-panel" data-panel="error">
<span class="nfc-reader-badge is-error">حدث خطأ ما</span>
<p class="nfc-reader-lead" data-nfc-error-msg>حدث خطأ ما.</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-retry><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>أعد المحاولة</span></button>
</div>
<div class="nfc-reader-panel" data-panel="ios">
<span class="nfc-reader-badge is-muted">iPhone</span>
<p class="nfc-reader-title">قراءة NFC عبر المتصفّح غير متوفّرة على iPhone</p>
<p class="nfc-reader-lead">لا تسمح Apple لأيّ متصفّح بالوصول إلى شريحة NFC. لذلك صنعتُ تطبيق NFC.cool المجاني لقراءة الوسوم والكتابة عليها على iPhone بدلًا من ذلك.</p>
<div class="landing-store-buttons"><a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-en&mt=8" class="landing-store-button is-apple" aria-label="التنزيل من App Store" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/AppStore.svg" alt="نزّل NFC.cool من App Store" width="156" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="android-other">
<span class="nfc-reader-badge is-muted">افتحها في Chrome</span>
<p class="nfc-reader-title">انتقل إلى Chrome للمسح هنا</p>
<p class="nfc-reader-lead">أنت على Android، لذا تعمل القراءة والكتابة داخل المتصفّح - لكنها تحتاج Chrome فقط. افتح هذه الصفحة في Chrome ليعمل القارئ.</p>
<div class="landing-store-buttons"><a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-en" class="landing-store-button is-google" aria-label="احصل عليه من Google Play" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/GooglePlay.svg" alt="احصل على NFC.cool من Google Play" width="173" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="desktop">
<span class="nfc-reader-badge is-muted">Android + Chrome فقط</span>
<img class="nfc-reader-qr" src="/assets/images/nfc-reader-qr.svg" alt="رمز QR يفتح هذه الصفحة على هاتفك" width="188" height="188"/>
<p class="nfc-reader-lead">امسح هذا بهاتف Android لفتح القارئ عليه. يحتاج NFC داخل المتصفّح إلى Chrome على Android.</p>
<p class="nfc-reader-fineprint">على iPhone؟ <a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-en&mt=8" target="_blank" rel="noopener nofollow sponsored">احصل على تطبيق NFC.cool</a>.</p>
</div>
</div>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## نزّل NFC.cool&nbsp;مجانًا

يقرأ التطبيق الكامل أيّ وسم NFC ويكتب عليه على iPhone وAndroid.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-hero-ios-en&mt=8" class="landing-store-button is-apple" aria-label="التنزيل من App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="نزّل NFC.cool من App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-hero-android-en" class="landing-store-button is-google" aria-label="احصل عليه من Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="احصل على NFC.cool من Google Play" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## كيف يعمل

<div class="page-cards-grid">

<article class="page-card nfc-step">
<span class="landing-feature-num">01</span>
<h3>افتحها على هاتف Android</h3>
<p>افتح هذه الصفحة في Chrome على هاتف Android. يملك Chrome ميزة تُسمّى Web NFC تتيح لموقع إلكتروني التخاطب مع شريحة NFC في الهاتف - وهي المحرّك الكامل خلف هذه الصفحة.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">02</span>
<h3>اختر القراءة أو الكتابة</h3>
<p>تعرض لك القراءة كل ما هو مخزَّن على الوسم. وتضع الكتابة رابطًا أو مقطعًا نصيًا قصيرًا على الوسم. أطلب من Chrome إذن NFC في المرة الأولى، وهو يتذكّر إجابتك.</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">03</span>
<h3>قرّب وسمًا من هاتفك</h3>
<p>المس الوسم بأعلى هاتفك. أفكّ ترميزه أو أكتب عليه هناك مباشرةً على جهازك - لا أراه أبدًا، ولا يُرفع أيّ شيء، ولا يُخزَّن أيّ شيء.</p>
</article>

</div>

</section>

<section class="page-section">

## ما الذي يمكنك قراءته من وسم NFC

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 14.5 14.5 9.5"/><path d="M11 6.5 12.4 5a3.8 3.8 0 0 1 5.4 5.4l-1.5 1.5"/><path d="M13 17.5 11.6 19a3.8 3.8 0 0 1-5.4-5.4l1.5-1.5"/></svg></span>
<h3>الروابط وعناوين URL</h3>
<p>أكثر محتوى شائع على الوسوم - عنوان ويب يفتح صفحة أو ملفًا شخصيًا أو قائمة. أعرض لك الرابط كاملًا لترى بدقة إلى أين يشير قبل أن تلمسه.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 7h14"/><path d="M5 12h14"/><path d="M5 17h9"/></svg></span>
<h3>نص عادي</h3>
<p>ملاحظات أو تعليمات أو معرّفات أو أيّ رسالة قصيرة مخزَّنة كسجلّ نصي. أفكّ ترميز النص ولغته مباشرةً من الشريحة.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4 4 8l8 4 8-4-8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/></svg></span>
<h3>سجلّات أخرى</h3>
<p>تظهر بيانات اعتماد Wi-Fi وبطاقات جهات الاتصال والبيانات الخاصة بالتطبيقات كسجلّات مصنَّفة. كما ترى الرقم التسلسلي الفريد للوسم، وهو نفسه في كل قراءة.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>الوسوم الفارغة أو المقفلة</h3>
<p>يُقرأ الوسم الفارغ بلا سجلّات - وهذا مفيد لفحص وسم جديد قبل الكتابة عليه. أما الوسوم المقفلة فما زالت تكشف عن نوعها ورقمها التسلسلي.</p>
</article>

</div>

</section>

<section class="page-section">

## هل تريد فعل ما هو أكثر من القراءة والكتابة؟

يتولّى القارئ في هذه الصفحة المهام اليومية - قراءة وسم وكتابة البيانات الشائعة عليه. وبالنسبة لأغلب الناس هذه هي القصة كاملةً، وواجهة Web NFC في المتصفّح تتوقّف عند هذا الحد تقريبًا: سجلّات NDEF عادية، وعلى Android Chrome فقط. أما **تطبيق NFC.cool** فيفعل كل ما في هذه الصفحة، ثم يمضي إلى ما لا يستطيعه المتصفّح:

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>قفل الوسوم وتهيئتها وحمايتها</h3>
<p>اقفل وسمًا كي لا يتغيّر محتواه أبدًا، أو امسحه ليعود فارغًا، أو احمِه بكلمة مرور كي لا تتمكّن سوى أجهزتك من إعادة الكتابة عليه.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg></span>
<h3>شفّر الأسرار باستخدام NFC Safe</h3>
<p>يشفّر NFC Safe سرًا على الشريحة نفسها باستخدام AES-256، فيُقرأ الوسم كبيانات مشوّشة لأيّ شيء غير التطبيق. <a href="/blog/nfc-safe-encrypted-secrets/">كيف يعمل NFC Safe</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"/></svg></span>
<h3>أتمِت ما تفعله اللمسة</h3>
<p>يمكن لوسم أن يُطلق الـwebhook، أو يشغّل اختصار iOS، أو ينطق محتواه بصوت مسموع، أو يعدّ عدد مرات مسحه. <a href="/blog/count-nfc-tag-scans/">كيفية عدّ عمليات مسح وسوم NFC</a>.</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"/></svg></span>
<h3>استنساخ الوسوم وإعادة تعيينها وفحصها</h3>
<p>استنسخ وسمًا، أو استخرج ذاكرة شريحته الخام وتعرّف عليها، أو أعد برمجة العتاد المحمي بـNFC مثل <a href="/blog/openprinttag-read-write-nfc-spools-phone/">بكرات خيوط الطابعات ثلاثية الأبعاد</a> و<a href="/blog/reset-sonicare-brush-head-nfc/">رؤوس فرشاة الأسنان الكهربائية</a>.</p>
</article>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## يحتاج NFC على iPhone إلى التطبيق

تحجب Apple تقنية NFC في كل متصفّح على iOS، لذا لا يمكن لأيّ موقع إلكتروني قراءة الوسوم أو الكتابة عليها على iPhone أو iPad. أما تطبيق NFC.cool فيفعل ذلك بشكل أصيل، وبكفاءة مماثلة لما هو عليه على Android.

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-en&mt=8" class="landing-store-button is-apple" aria-label="التنزيل من App Store" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="نزّل NFC.cool من App Store" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-en" class="landing-store-button is-google" aria-label="احصل عليه من Google Play" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="احصل على NFC.cool من Google Play" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## الأسئلة الشائعة حول قارئ NFC عبر الإنترنت

<div class="nfc-reader-faq">

<details class="faq-item">
<summary>هل يمكنني قراءة وسوم NFC والكتابة عليها دون تطبيق؟</summary>
<p>نعم، على هاتف Android في Chrome. تستخدم الصفحة تقنية Web NFC المدمجة في متصفّحك، فلا شيء لتثبّته - المس المسح لقراءة وسم، أو استخدم تبويب الكتابة لتضع رابطًا أو نصًا أو جهة اتصال أو شبكة Wi-Fi وأكثر على الوسم.</p>
</details>

<details class="faq-item">
<summary>هل يمكنني كتابة شبكة Wi-Fi أو بطاقة جهة اتصال على وسم؟</summary>
<p>نعم. اختر شبكة Wi-Fi أو بطاقة جهة اتصال من قائمة الكتابة المنسدلة واملأ الحقول. يدعو وسم Wi-Fi هواتف Android للانضمام إلى الشبكة؛ أما وسم جهة الاتصال فيخزّن vCard قياسية تعرض الهواتف حفظها.</p>
</details>

<details class="faq-item">
<summary>هل يعمل على iPhone؟</summary>
<p>لا. تحجب Apple تقنية NFC في كل متصفّح على iOS، لذا لا يمكن لأيّ موقع إلكتروني قراءة الوسوم أو الكتابة عليها على iPhone أو iPad. أما تطبيق NFC.cool المجاني فيفعل ذلك على iPhone بدلًا من ذلك.</p>
</details>

<details class="faq-item">
<summary>ما المتصفّحات المدعومة؟</summary>
<p>تعمل تقنية Web NFC فقط في Chrome وغيره من متصفّحات Chromium على Android. أما متصفّحات سطح المكتب وiOS فلا تدعمها - وإذا كان متصفّحك لا يدعمها، تعرض لك الصفحة ما تفعله بدلًا من ذلك.</p>
</details>

<details class="faq-item">
<summary>هل قارئ NFC عبر الإنترنت مجاني؟</summary>
<p>مجاني تمامًا - دون تسجيل ودون حد لعدد عمليات المسح. تُقرأ الوسوم ويُكتب عليها على جهازك أنت، ولا يُرفع أيّ شيء إطلاقًا.</p>
</details>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## اقرأ وسوم NFC واكتب عليها في أيّ مكان

تغطّي هذه الصفحة الأساسيات في المتصفّح. أما تطبيق NFC.cool المجاني فيمضي أبعد - إذ يقرأ أيّ وسم ويكتب أكثر من ٢٥ نوعًا من البيانات: روابط وWi-Fi وجهات اتصال واختصارات وأكثر، على iPhone وAndroid معًا. أبنيه وأعتني به بنفسي.

<div class="tap-cta-buttons">
<a href="/features/nfc-reader-writer/" class="landing-cta-button">تعرّف على قارئ وكاتب NFC</a>
<a href="/blog/nfc-tags-beginners-guide/" class="landing-cta-button">جديد على وسوم NFC؟ ابدأ من هنا</a>
</div>

</section>
