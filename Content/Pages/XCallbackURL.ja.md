---
title: "NFC.cool x-callback-url"
slug: "x-callback-url"
description: "ほかのアプリやWebページから、x-callback-urlの仕組みでiPhoneのNFC.coolに処理を依頼し、結果を受け取れます。"
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# NFC.cool x-callback-url

ほかのアプリやWebページから、[x-callback-url](https://x-callback-url.com)の仕組みでiPhoneのNFC.coolに処理を依頼し、結果を受け取れます。

Webhook、ショートカット、URLスキームについては[開発者向けページ](/ja/developers/)をご覧ください。

<a href="#read-uid" class="landing-cta-button">ドキュメントを見る</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/nfc-scan-tag.webp" alt="iPhoneでNFCタグをスキャン" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section" id="read-uid">

## アプリやWebページからタグのIDを読み取る

リンクひとつで、NFC.coolにタグを1枚スキャンさせ、そのUIDを受け取れます。`ndef=1`を付ければ、タグのNDEFメッセージも受け取れます。iPhone上のどのWebページやアプリからでも使え、NFC.coolをインストールする以外の準備は要りません。リンクは[x-callback-url](https://x-callback-url.com)の規約に従います。他のアプリやWebサイトのためのタグ読み取りは、iPhone版NFC.coolの法人向けライセンスであるNFC.cool Businessに含まれます。ご希望の方は[お問い合わせください](mailto:info@nfc.cool?subject=NFC.cool%20Business)。

```
https://nfc.cool/x-callback-url/read-uid?<parameters>
nfcforiphone://x-callback-url/read-uid?<parameters>
```

どちらの形式も動作は同じです。おすすめは`https`形式です。NFC.coolが入っていないiPhoneでは、何も起きずに失敗する代わりに、入手方法を案内するページが開きます。ユーザーがタップするリンクとして置いてください。スクリプトが自動的に開くリンクでは、iOSはアプリを起動しません。

NFC.coolが前面に表示され、タグのIDを誰が受け取るのかを示してからスキャンを始めます。すでにread-uidリンクが開いている場合は新しいリンクが処理を引き継ぎ、前の呼び出し元には`cancelled`が届きます。

### パラメーター

<div class="page-cards-grid">

<article class="page-card">
<h3><code>x-get</code></h3>
<p>NFC.coolがこのURLをバックグラウンドで呼び出し、結果をクエリパラメーターとして渡します。失敗やキャンセルも含め、すべての結果がすぐにここへ届きます。</p>
<p><strong>必須:</strong> <code>x-get</code>、<code>x-post</code>、<code>x-success</code>のいずれか</p>
</article>

<article class="page-card">
<h3><code>x-post</code></h3>
<p>NFC.coolが結果をJSONとしてここへPOSTします。</p>
<p><strong>必須:</strong> <code>x-get</code>、<code>x-post</code>、<code>x-success</code>のいずれか</p>
</article>

<article class="page-card">
<h3><code>x-success</code></h3>
<p>読み取りに成功すると開かれ、<code>uid</code>、<code>ndef</code>、<code>state</code>が付加されます。<code>x-get</code>または<code>x-post</code>と併用した場合は<code>state</code>だけを受け取ります。UIDはユーザーに表示されたサーバーにだけ送られ、ほかには渡りません。</p>
<p><strong>必須:</strong> <code>x-get</code>、<code>x-post</code>、<code>x-success</code>のいずれか</p>
</article>

<article class="page-card">
<h3><code>x-error</code></h3>
<p>失敗の後にユーザーがNFC.coolを閉じると開かれ、<code>errorCode</code>、<code>errorMessage</code>、<code>state</code>が付加されます。</p>
<p><strong>必須:</strong> いいえ</p>
</article>

<article class="page-card">
<h3><code>x-cancel</code></h3>
<p>ユーザーがキャンセルすると開かれ、<code>state</code>が付加されます。</p>
<p><strong>必須:</strong> いいえ</p>
</article>

<article class="page-card">
<h3><code>state</code></h3>
<p>任意の文字列。たとえば使い捨てのリクエストIDなど。すべての結果にそのまま返されます。</p>
<p><strong>必須:</strong> いいえ(推奨)</p>
</article>

<article class="page-card">
<h3><code>ndef</code></h3>
<p><code>1</code>でタグのNDEFメッセージも読み取ります。指定しなければ、読み取るのはUIDだけです。</p>
<p><strong>必須:</strong> いいえ</p>
</article>

</div>

`x-get`と`x-post`はどちらか一方だけを使ってください。コールバックの値はすべてURLエンコードしてください。

このリンクはどのWebページからでも開けるため、NFC.coolがコールバックするのは`https`のURLと、`yourapp://nfc-done`のような他のアプリのURLスキームだけです。`x-get`と`x-post`は`https`である必要があります。通常の`http`、`javascript:`、`data:`、`tel:`、NFC.cool自身のスキーム、それ自体で動作を起こすシステムスキーム(`shortcuts:`、`itms-services:`、`mailto:`、`App-Prefs:`など)は拒否され、拒否されるコールバックをひとつでも含むリンクは無視されます。

### UID

大文字の16進数で、区切り文字はなく、最上位バイトが先頭です。長さでチップファミリーを見分けられます:

<div class="page-cards-grid">

<article class="page-card">
<h3>NTAG、MIFARE Ultralight(ISO 14443-A)</h3>
<p>7バイト</p>
<p><code>04A1B2C3D4E5F6</code></p>
</article>

<article class="page-card">
<h3>ICODEおよびその他のISO 15693タグ</h3>
<p>8バイト</p>
<p><code>E004015012345678</code></p>
</article>

</div>

ISO 15693のUIDは`E0`で始まります。並びはチップに印字され、多くのリーダーが表示する順序と同じです。

### NDEFメッセージ

`ndef=1`を指定すると、`ndef`にはタグの生のNDEFメッセージ(TLVヘッダーを除いたレコード)が、パディングなしのBase64url([RFC 4648 セクション5](https://www.rfc-editor.org/rfc/rfc4648#section-5))で入ります。`+`と`/`の代わりに`-`と`_`を使い、`=`は付きません。タグにNDEFメッセージがない場合は省略されます。

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

URLはそのままの形で呼び出され、もともと付いているパラメーターの後ろに結果が追加されます。1回の試行につき呼び出しはちょうど1回なので、待っているページは呼び出しが届いた時点で待機をやめられます:

<div class="page-cards-grid">

<article class="page-card">
<h3><code>cancelled</code></h3>
<p>ユーザーがスキャンをキャンセルしたか、タグを読み取る前にNFC.coolを閉じました。</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>時間内にタグが見つからなかったか、タグを読み取れませんでした。</p>
</article>

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>このiPhoneにはNFC.cool Businessのアクセス権がありません。</p>
</article>

</div>

`cancelled`や`scan-failed`の後もユーザーは再試行でき、読み取りに成功すると`uid`付きで`x-get`が再び呼び出されます。同じ`state`については、最新の呼び出しを答えとして扱ってください。応答は任意の2xxステータスで構いません。成功の呼び出しが失敗した場合、NFC.coolは再送を提案します。

### `x-post`

```
POST https://your-server.example/api/uid
Content-Type: application/json

{"uid":"04A1B2C3D4E5F6","state":"7f3c9a","readAt":"2026-11-19T09:30:00Z","ndef":"0QEFVAJkZUhp"}
```

20秒以内に任意の2xxステータスで応答してください。それ以外はすべて失敗とみなされます。ユーザーは再送でき、NFC.coolを閉じると`x-error`に`delivery-failed`が通知されます。読み取りを始めたページをURLで再び開けない場合、たとえば他のアプリ内のWebビューなどでは、`x-post`を使ってください。ユーザーはiOSが左上に表示するリンクから戻れます。

NFC.coolは`x-get`でも`x-post`でもCookieを送りません。リクエストは、リンクに入れた使い捨ての`state`で識別してください。

### `x-error`コード

<div class="page-cards-grid">

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>このiPhoneにはNFC.cool Businessのアクセス権がありません。</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>時間内にタグが見つからなかったか、タグを読み取れませんでした。</p>
</article>

<article class="page-card">
<h3><code>delivery-failed</code></h3>
<p><code>x-post</code>リクエストが失敗しました。</p>
</article>

</div>

### 例

自分のサーバーからの結果を待ち、NDEFメッセージも読み取るページの例です:

```html
<a href="https://nfc.cool/x-callback-url/read-uid?x-get=https%3A%2F%2Fexample.com%2Fnfc%3Fcode%3Dabc123&ndef=1&state=7f3c9a">
  Scan tag
</a>
```

</section>
