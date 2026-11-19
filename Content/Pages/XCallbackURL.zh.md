---
title: "NFC.cool x-callback-url"
slug: "x-callback-url"
description: "其他 App 和网页可以按照 x-callback-url 约定，请 iPhone 上的 NFC.cool 完成操作并返回结果。"
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# NFC.cool x-callback-url

其他 App 和网页可以按照 [x-callback-url](https://x-callback-url.com) 约定，请 iPhone 上的 NFC.cool 完成操作并返回结果。

Webhook、快捷指令和 URL scheme 请见[开发者页面](/zh/developers/)。

<a href="#read-uid" class="landing-cta-button">查看文档</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/nfc-scan-tag.webp" alt="iPhone 正在扫描一个 NFC 标签" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section" id="read-uid">

## 从你的 App 或网页读取标签 ID

只需一个链接，就能让 NFC.cool 扫描一枚标签并把它的 UID 交还给你；加上 `ndef=1` 时，还会附带标签的 NDEF 消息。它可以从 iPhone 上的任何网页或 App 发起，除了安装 NFC.cool 之外无需任何设置。该链接遵循 [x-callback-url](https://x-callback-url.com) 约定。为其他 App 和网站读取标签属于 NFC.cool Business 的功能，即 iPhone 版 NFC.cool 的企业授权：如需开通，请[给我们写信](mailto:info@nfc.cool?subject=NFC.cool%20Business)。

```
https://nfc.cool/x-callback-url/read-uid?<parameters>
nfcforiphone://x-callback-url/read-uid?<parameters>
```

两种形式效果相同。推荐使用 `https` 形式：在没有安装 NFC.cool 的 iPhone 上，它会打开一个说明如何获取 App 的页面，而不是悄无声息地失败。请把它放在由用户点按的链接里；对于脚本自行跳转的链接，iOS 不会打开 App。

NFC.cool 会切换到前台，显示由谁接收标签的 ID，然后开始扫描。如果已有一个 read-uid 链接处于打开状态，新的链接会接管它，之前的调用方会收到 `cancelled`。

### 参数

<div class="page-cards-grid">

<article class="page-card">
<h3><code>x-get</code></h3>
<p>NFC.cool 在后台调用此 URL，并以查询参数的形式附上结果。每一种结果都会立即送达这里，包括失败和取消。</p>
<p><strong>是否必填:</strong> <code>x-get</code>、<code>x-post</code> 或 <code>x-success</code> 之一</p>
</article>

<article class="page-card">
<h3><code>x-post</code></h3>
<p>NFC.cool 以 JSON 形式把结果 POST 到这里。</p>
<p><strong>是否必填:</strong> <code>x-get</code>、<code>x-post</code> 或 <code>x-success</code> 之一</p>
</article>

<article class="page-card">
<h3><code>x-success</code></h3>
<p>读取成功后打开，并附加 <code>uid</code>、<code>ndef</code> 和 <code>state</code>。与 <code>x-get</code> 或 <code>x-post</code> 同时使用时，它只会收到 <code>state</code>：UID 只发送到向用户展示过的那台服务器，不会发往别处。</p>
<p><strong>是否必填:</strong> <code>x-get</code>、<code>x-post</code> 或 <code>x-success</code> 之一</p>
</article>

<article class="page-card">
<h3><code>x-error</code></h3>
<p>用户在失败后关闭 NFC.cool 时打开，并附加 <code>errorCode</code>、<code>errorMessage</code> 和 <code>state</code>。</p>
<p><strong>是否必填:</strong> 否</p>
</article>

<article class="page-card">
<h3><code>x-cancel</code></h3>
<p>用户取消时打开，并附加 <code>state</code>。</p>
<p><strong>是否必填:</strong> 否</p>
</article>

<article class="page-card">
<h3><code>state</code></h3>
<p>任意字符串，例如一次性请求 ID。每个结果都会原样带回。</p>
<p><strong>是否必填:</strong> 否，但建议使用</p>
</article>

<article class="page-card">
<h3><code>ndef</code></h3>
<p>设为 <code>1</code> 时会同时读取标签的 NDEF 消息。不设置时只读取 UID。</p>
<p><strong>是否必填:</strong> 否</p>
</article>

</div>

`x-get` 和 `x-post` 只能二选一。每个回调值都要进行 URL 编码。

任何网页都能打开这个链接，因此 NFC.cool 只会回调 `https` URL 以及其他 App 的 URL scheme，例如 `yourapp://nfc-done`；`x-get` 和 `x-post` 必须是 `https`。普通的 `http`、`javascript:`、`data:`、`tel:`、NFC.cool 自己的 scheme，以及会自行执行操作的系统 scheme（`shortcuts:`、`itms-services:`、`mailto:`、`App-Prefs:` 等）都会被拒绝；只要有一个回调被拒绝，整个链接都会被忽略。

### UID

大写十六进制，无分隔符，最高有效字节在前。根据长度即可区分芯片系列：

<div class="page-cards-grid">

<article class="page-card">
<h3>NTAG、MIFARE Ultralight（ISO 14443-A）</h3>
<p>7 字节</p>
<p><code>04A1B2C3D4E5F6</code></p>
</article>

<article class="page-card">
<h3>ICODE 及其他 ISO 15693 标签</h3>
<p>8 字节</p>
<p><code>E004015012345678</code></p>
</article>

</div>

ISO 15693 的 UID 以 `E0` 开头，字节顺序与芯片上印刷的、以及大多数读卡器显示的一致。

### NDEF 消息

设置 `ndef=1` 后，`ndef` 中是标签的原始 NDEF 消息（即不含 TLV 头的记录），编码为不带填充的 Base64url（[RFC 4648 第 5 节](https://www.rfc-editor.org/rfc/rfc4648#section-5)）：用 `-` 和 `_` 代替 `+` 和 `/`，且没有 `=`。标签中没有 NDEF 消息时省略该字段。

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

你的 URL 会按原样调用，结果追加在它已有的参数之后。每次尝试恰好调用一次，因此等待结果的页面一收到调用即可停止等待：

<div class="page-cards-grid">

<article class="page-card">
<h3><code>cancelled</code></h3>
<p>用户取消了扫描，或在读取到标签之前关闭了 NFC.cool。</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>未能及时找到标签，或无法读取该标签。</p>
</article>

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>这台 iPhone 没有 NFC.cool Business 权限。</p>
</article>

</div>

出现 `cancelled` 或 `scan-failed` 后，用户可以重试，之后若读取成功，会再次带着 `uid` 调用 `x-get`：同一个 `state` 请以最新一次调用为准。返回任意 2xx 状态码即可。如果成功结果的调用失败，NFC.cool 会提供重新发送的选项。

### `x-post`

```
POST https://your-server.example/api/uid
Content-Type: application/json

{"uid":"04A1B2C3D4E5F6","state":"7f3c9a","readAt":"2026-11-19T09:30:00Z","ndef":"0QEFVAJkZUhp"}
```

请在 20 秒内返回任意 2xx 状态码。其他任何情况都视为失败：用户可以重新发送，关闭 NFC.cool 时会向 `x-error` 报告 `delivery-failed`。如果发起读取的页面无法通过 URL 重新打开（例如其他 App 内的 Web 视图），请使用 `x-post`；用户可以通过 iOS 在左上角显示的链接返回。

NFC.cool 在 `x-get` 和 `x-post` 中都不会发送 Cookie。请通过你放在链接里的一次性 `state` 来识别请求。

### `x-error` 错误码

<div class="page-cards-grid">

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>这台 iPhone 没有 NFC.cool Business 权限。</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>未能及时找到标签，或无法读取该标签。</p>
</article>

<article class="page-card">
<h3><code>delivery-failed</code></h3>
<p><code>x-post</code> 请求失败。</p>
</article>

</div>

### 示例

一个等待自家服务器返回结果、并同时读取 NDEF 消息的页面：

```html
<a href="https://nfc.cool/x-callback-url/read-uid?x-get=https%3A%2F%2Fexample.com%2Fnfc%3Fcode%3Dabc123&ndef=1&state=7f3c9a">
  Scan tag
</a>
```

</section>
