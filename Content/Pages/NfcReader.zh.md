---
title: "在线 NFC 读取器"
slug: "online-nfc-reader"
description: "直接在浏览器里读写 NFC 标签：无需 App，无需注册。扫描一个标签看看里面有什么，或者向它写入一个链接或文本。免费，在 Android 的 Chrome 中运行；iPhone 用户可使用免费的 NFC.cool App。"
image: "/assets/images/og-landing.webp"
---

<div style="display:none" aria-hidden="true"><svg><symbol id="nfc-icon-wave" viewBox="0 0 24 24"><path fill="currentColor" d="M8.77 12C8.77 10.18 8.14 8.48 7.02 7.15C6.29 6.29 5.22 7.27 5.77 7.97C6.84 9.32 7.25 10.44 7.25 12C7.25 13.55 6.84 14.67 5.77 16.02C5.23 16.72 6.3 17.69 7.02 16.83C8.14 15.51 8.77 13.82 8.77 12ZM13.56 12C13.56 9.22 12.69 6.61 11.12 4.5C10.41 3.56 9.18 4.47 9.84 5.33C11.28 7.22 12.05 9.53 12.05 12C12.05 14.46 11.28 16.77 9.84 18.66C9.18 19.53 10.41 20.44 11.12 19.48C12.69 17.37 13.56 14.77 13.56 12ZM18.38 12C18.38 8.26 17.21 4.78 15.14 1.89C14.5 1 13.2 1.78 13.89 2.71C15.83 5.37 16.86 8.58 16.86 12C16.86 15.42 15.82 18.62 13.89 21.28C13.22 22.2 14.47 23.02 15.14 22.1C17.21 19.21 18.38 15.73 18.38 12Z"/></symbol><symbol id="nfc-icon-android" viewBox="0 0 24 24" fill="none"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></symbol><symbol id="nfc-icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17.5 19 7"/></symbol><symbol id="nfc-icon-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></symbol></svg></div>

<section class="page-hero nfc-reader-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# 在线 NFC 读取器

我打造了这个工具，让你能直接从浏览器里读取 NFC 标签：无需 App，无需注册。轻触 *扫描标签*，把手机贴近标签，它的内容会立刻显示出来。切换到 *写入* 标签页，你也可以把一个链接或文本写到标签上。一切都在你的手机上运行，你扫描的任何内容都不会离开它。

<div class="nfc-hero-reqs"><span class="platform-pill is-android"><svg class="platform-pill-icon" viewBox="2 2 20 20" fill="none" aria-hidden="true"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></svg><span class="platform-pill-label">Android 上的 Chrome</span></span></div>

</div>

<div class="page-hero-visual">

<div id="nfc-reader-app" class="nfc-reader" data-state="desktop" data-mode="read" data-write-type="url">
<div class="nfc-phone">
<div class="nfc-phone-screen">
<div class="nfc-reader-tabs" role="tablist" aria-label="读取器模式">
<button type="button" class="nfc-reader-tab" data-nfc-tab="read" role="tab" aria-selected="true">读取</button>
<button type="button" class="nfc-reader-tab" data-nfc-tab="write" role="tab" aria-selected="false">写入</button>
</div>
<div class="nfc-reader-body">
<div class="nfc-reader-panel" data-panel="read-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">读取一个 NFC 标签</p>
<p class="nfc-reader-lead">轻触按钮，然后把标签贴近手机顶部。我会告诉你里面有什么。</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-scan><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>读取 NFC</span></button>
<p class="nfc-reader-fineprint">想要拥有更多 NFC 功能的原生 NFC 体验吗？<a href="/features/nfc-reader-writer/">下载 NFC.cool App！</a></p>
</div>
<div class="nfc-reader-panel" data-panel="scanning">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">读取 NFC</p>
<p class="nfc-reader-lead">把你的 NFC 标签贴在手机背面顶部。</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>取消</span></button>
</div>
<div class="nfc-reader-panel" data-panel="result">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>标签已读取</span>
<ul class="nfc-reader-records" data-nfc-records></ul>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">序列号</span><span class="nfc-reader-value" data-nfc-serial></span></div>
<details class="nfc-reader-details"><summary>技术详情</summary><div class="nfc-reader-tech" data-nfc-tech></div></details>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>读取 NFC</span></button>
</div>
<div class="nfc-reader-panel" data-panel="write-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">写入一个 NFC 标签</p>
<select class="nfc-reader-select" data-nfc-type-select aria-label="要写入标签的内容">
<optgroup label="基础">
<option value="link">链接</option>
<option value="text">文本</option>
</optgroup>
<optgroup label="联系方式">
<option value="phone">电话号码</option>
<option value="email">电子邮件</option>
<option value="sms">短信</option>
<option value="contact">联系人名片</option>
</optgroup>
<optgroup label="网络">
<option value="wifi">Wi-Fi 网络</option>
<option value="location">位置</option>
</optgroup>
</select>
<div class="nfc-reader-form" data-nfc-form>
<div class="nfc-reader-fields" data-nfc-fields="link">
<input type="url" class="nfc-reader-input" data-k="url" placeholder="https://example.com" aria-label="要写入的链接"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="text" hidden>
<textarea class="nfc-reader-input nfc-reader-textarea" data-k="text" rows="3" placeholder="在此输入你的文本" aria-label="要写入的文本"></textarea>
</div>
<div class="nfc-reader-fields" data-nfc-fields="phone" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="电话号码" aria-label="电话号码"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="email" hidden>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="电子邮件地址" aria-label="电子邮件地址"/>
<input type="text" class="nfc-reader-input" data-k="subject" placeholder="主题（可选）" aria-label="邮件主题，可选"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="sms" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="电话号码" aria-label="短信电话号码"/>
<input type="text" class="nfc-reader-input" data-k="body" placeholder="消息内容（可选）" aria-label="短信内容，可选"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="location" hidden>
<input type="text" class="nfc-reader-input" data-k="lat" inputmode="decimal" placeholder="纬度" aria-label="纬度"/>
<input type="text" class="nfc-reader-input" data-k="lng" inputmode="decimal" placeholder="经度" aria-label="经度"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="contact" hidden>
<input type="text" class="nfc-reader-input" data-k="name" placeholder="姓名" aria-label="联系人姓名"/>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="电话（可选）" aria-label="联系人电话，可选"/>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="电子邮件（可选）" aria-label="联系人电子邮件，可选"/>
<input type="text" class="nfc-reader-input" data-k="org" placeholder="单位（可选）" aria-label="联系人单位，可选"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="wifi" hidden>
<input type="text" class="nfc-reader-input" data-k="ssid" placeholder="网络名称（SSID）" aria-label="Wi-Fi 网络名称"/>
<input type="text" class="nfc-reader-input" data-k="password" placeholder="密码" aria-label="Wi-Fi 密码"/>
<select class="nfc-reader-select" data-k="security" aria-label="Wi-Fi 安全类型">
<option value="wpa">WPA / WPA2</option>
<option value="wep">WEP</option>
<option value="open">开放（无密码）</option>
</select>
</div>
</div>
<p class="nfc-reader-input-error" data-nfc-input-error></p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>写入标签</span></button>
<p class="nfc-reader-fineprint">想要拥有更多 NFC 功能的原生 NFC 体验吗？<a href="/features/nfc-reader-writer/">下载 NFC.cool App！</a></p>
</div>
<div class="nfc-reader-panel" data-panel="writing">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">写入 NFC</p>
<p class="nfc-reader-lead">把你的 NFC 标签贴在手机背面顶部。</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>取消</span></button>
</div>
<div class="nfc-reader-panel" data-panel="written">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>标签已写入</span>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">已写入标签的内容</span><span class="nfc-reader-value" data-nfc-written></span></div>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>写入另一个标签</span></button>
</div>
<div class="nfc-reader-panel" data-panel="error">
<span class="nfc-reader-badge is-error">出错了</span>
<p class="nfc-reader-lead" data-nfc-error-msg>出错了。</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-retry><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>重试</span></button>
</div>
<div class="nfc-reader-panel" data-panel="ios">
<span class="nfc-reader-badge is-muted">iPhone</span>
<p class="nfc-reader-title">iPhone 上无法使用浏览器 NFC</p>
<p class="nfc-reader-lead">Apple 不允许任何浏览器访问 NFC 芯片。为此，我做了免费的 NFC.cool App，用来在 iPhone 上读写标签。</p>
<div class="landing-store-buttons"><a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-en&mt=8" class="landing-store-button is-apple" aria-label="在 App Store 下载" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/AppStore.svg" alt="在 App Store 下载 NFC.cool" width="156" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="android-other">
<span class="nfc-reader-badge is-muted">在 Chrome 中打开</span>
<p class="nfc-reader-title">切换到 Chrome 以在此扫描</p>
<p class="nfc-reader-lead">你正在使用 Android，所以浏览器内的读写是可行的，只是需要 Chrome。在 Chrome 中打开本页面，读取器就会启用。</p>
<div class="landing-store-buttons"><a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-en" class="landing-store-button is-google" aria-label="在 Google Play 获取" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/GooglePlay.svg" alt="在 Google Play 获取 NFC.cool" width="173" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="desktop">
<span class="nfc-reader-badge is-muted">仅限 Android + Chrome</span>
<img class="nfc-reader-qr" src="/assets/images/nfc-reader-qr.svg" alt="可在手机上打开本页面的二维码" width="188" height="188"/>
<p class="nfc-reader-lead">用 Android 手机扫描这个二维码，即可在手机上打开读取器。浏览器内的 NFC 需要 Android 上的 Chrome。</p>
<p class="nfc-reader-fineprint">在用 iPhone？<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-en&mt=8" target="_blank" rel="noopener nofollow sponsored">下载 NFC.cool App</a>。</p>
</div>
</div>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-section">

## 工作原理

<div class="page-cards-grid">

<article class="page-card nfc-step">
<span class="landing-feature-num">01</span>
<h3>在 Android 手机上打开</h3>
<p>用 Android 手机上的 Chrome 打开本页面。Chrome 有一项叫做 Web NFC 的功能，让网站能与手机的 NFC 芯片对话，这正是本页面背后的整套引擎。</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">02</span>
<h3>选择读取或写入</h3>
<p>读取会向你显示标签里存储的一切。写入会把一个链接或一小段文本放到标签上。我会在第一次时向 Chrome 申请 NFC 权限，它会记住你的回答。</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">03</span>
<h3>把标签贴近手机</h3>
<p>把标签贴到手机顶部。我会就地在你的设备上完成解码或写入，我永远看不到它，没有任何内容被上传，也没有任何内容被存储。</p>
</article>

</div>

</section>

<section class="page-section">

## 你能从 NFC 标签里读到什么

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 14.5 14.5 9.5"/><path d="M11 6.5 12.4 5a3.8 3.8 0 0 1 5.4 5.4l-1.5 1.5"/><path d="M13 17.5 11.6 19a3.8 3.8 0 0 1-5.4-5.4l1.5-1.5"/></svg></span>
<h3>链接和网址</h3>
<p>最常见的标签内容：一个用来打开页面、个人资料或菜单的网址。我会向你显示完整链接，让你在轻触之前就能看清它究竟指向哪里。</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 7h14"/><path d="M5 12h14"/><path d="M5 17h9"/></svg></span>
<h3>纯文本</h3>
<p>以文本记录形式存储的笔记、说明、编号或任意一小段消息。我会直接从芯片中解码出文本及其语言。</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4 4 8l8 4 8-4-8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/></svg></span>
<h3>其他记录</h3>
<p>Wi-Fi 凭据、联系人名片和应用专属数据会以带类型的记录形式显示。你还能看到标签独有的序列号，它在每次读取时都相同。</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>空白或已锁定的标签</h3>
<p>空白标签读取时干净利落、没有任何记录，便于在写入之前检查一个全新的标签。已锁定的标签仍会报告它们的类型和序列号。</p>
</article>

</div>

</section>

<section class="page-section">

## 想做的不止于读写？

本页面的读取器应付的是日常活儿：读取一个标签，并向其写入常见数据。对大多数人来说，这就是全部了，而浏览器的 Web NFC API 也差不多到此为止：仅限纯 NDEF 记录、仅限 Android 的 Chrome。**NFC.cool App** 能完成本页面上的一切，然后在浏览器无能为力的地方继续前进：

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>锁定、格式化与保护标签</h3>
<p>锁定一个标签，让它的内容永不可改；把一个标签清空还原成空白；或者为它设置密码保护，只有你的设备才能重写它。</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg></span>
<h3>用 NFC Safe 加密机密</h3>
<p>NFC Safe 用 AES-256 把一段机密加密写到芯片本身，因此除了这个 App 之外，任何东西读取该标签都只会看到一堆乱码数据。<a href="/blog/nfc-safe-encrypted-secrets/">NFC Safe 的工作原理</a>。</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"/></svg></span>
<h3>自动化轻触后的动作</h3>
<p>一个标签可以触发 webhook、运行一条 iOS 快捷指令、朗读它的内容，或者统计它被扫描的次数。<a href="/blog/count-nfc-tag-scans/">如何统计 NFC 标签扫描次数</a>。</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"/></svg></span>
<h3>克隆、重置与检查标签</h3>
<p>克隆一个标签，导出并识别它的原始芯片内存，或者重新编程那些受 NFC 控制的硬件，比如<a href="/blog/openprinttag-read-write-nfc-spools-phone/">3D 打印机的耗材线轴</a>和<a href="/blog/reset-sonicare-brush-head-nfc/">电动牙刷的刷头</a>。</p>
</article>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## iPhone 上的 NFC 需要这个 App

Apple 在所有 iOS 浏览器中都封锁了 NFC，因此没有任何网站能在 iPhone 或 iPad 上读写标签。NFC.cool App 以原生方式实现这一点，效果和在 Android 上一样好。

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-en&mt=8" class="landing-store-button is-apple" aria-label="在 App Store 下载" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="在 App Store 下载 NFC.cool" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-en" class="landing-store-button is-google" aria-label="在 Google Play 获取" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="在 Google Play 获取 NFC.cool" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## 在线 NFC 读取器常见问题

<div class="nfc-reader-faq">

<details class="faq-item">
<summary>不用 App 也能读写 NFC 标签吗？</summary>
<p>可以，在 Android 手机的 Chrome 里就行。本页面使用浏览器内置的 Web NFC，所以无需安装任何东西：轻触扫描即可读取一个标签，或者用写入标签页把链接、文本、联系人、Wi-Fi 网络等内容写到标签上。</p>
</details>

<details class="faq-item">
<summary>我能把一个 Wi-Fi 网络或联系人名片写到标签上吗？</summary>
<p>可以。在写入下拉菜单中选择 Wi-Fi 网络或联系人名片，并填好各字段。Wi-Fi 标签会提示 Android 手机加入该网络；联系人标签则存储一份标准 vCard，手机会提示保存。</p>
</details>

<details class="faq-item">
<summary>它在 iPhone 上能用吗？</summary>
<p>不能。Apple 在所有 iOS 浏览器中都封锁了 NFC，因此没有任何网站能在 iPhone 或 iPad 上读写标签。免费的 NFC.cool App 可以在 iPhone 上代为完成。</p>
</details>

<details class="faq-item">
<summary>支持哪些浏览器？</summary>
<p>Web NFC 仅在 Android 上的 Chrome 及其他 Chromium 浏览器中可用。桌面浏览器和 iOS 浏览器不支持它，如果你的浏览器不行，本页面会告诉你该改用什么方式。</p>
</details>

<details class="faq-item">
<summary>在线 NFC 读取器是免费的吗？</summary>
<p>完全免费，无需注册，也没有扫描次数限制。标签都在你自己的设备上读写，没有任何内容会被上传。</p>
</details>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## 随时随地读写 NFC 标签

本页面涵盖了浏览器里的基础操作。免费的 NFC.cool App 走得更远：它能读取任何标签，并写入 25 多种数据，包括链接、Wi-Fi、联系人、快捷指令等等，在 iPhone 和 Android 上都行。它由我亲手开发和维护。

<div class="tap-cta-buttons">
<a href="/features/nfc-reader-writer/" class="landing-cta-button">了解 NFC 读取与写入工具</a>
<a href="/blog/nfc-tags-beginners-guide/" class="landing-cta-button">刚接触 NFC 标签？从这里开始</a>
</div>

</section>
