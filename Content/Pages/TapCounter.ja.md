---
title: "NFC タップカウンター - ライブデモ"
slug: "tap-counter"
description: "NFCタップカウンターのライブデモ。NFC.cool ToolsでこのページのURLをNFCタグに書き込み、タグをタップすると、そのスキャン回数とタグIDが表示されます - サーバーは一切不要です。"
image: "/assets/images/Blog/count-nfc-tag-scans.webp"
---

<section class="page-hero">

<div id="tap-counter-demo" class="tap-demo">

<h1 class="tap-demo-heading">NFC タップカウンター</h1>

<div class="tap-demo-result">
<div class="tap-demo-count-row">
<span class="tap-demo-count" data-tap-count>0</span>
<span class="tap-demo-count-caption">回のスキャン - タグ自身がカウント</span>
</div>
<p class="tap-demo-id-row"><span class="tap-demo-id-label">タグID</span> <code class="tap-demo-id-value" data-tap-id></code></p>
<p class="tap-demo-raw">タグのURLからそのまま読み取り: <code data-tap-raw></code></p>
<p class="tap-demo-note">サーバーもインターネットも不要 - チップが数えました。</p>
</div>

<div class="tap-demo-empty">
<p class="tap-demo-lead">これはNFC.cool ToolsのNFCタップカウンターのライブデモです。NFCタグが下のURLを指すように書き込み、タップしてください。タグ自身のスキャン回数とIDがここに表示されます - アドレスバーから直接デコードされ、サーバーは一切介在しません。</p>
<p class="tap-demo-url">タグの宛先: <code>https://nfc.cool/ja/tap-counter/</code></p>
</div>

</div>

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-tap-counter-ja&mt=8" class="landing-store-button is-apple" aria-label="App Storeでダウンロード" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="App Storeでダウンロード" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-tap-counter-ja" class="landing-store-button is-google" aria-label="Google Playで手に入れよう" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Google Playで手に入れよう" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## このデモの仕組み

NFC.cool ToolsでNFCタップカウンターをオンにしてタグを書き込むと、アプリはURLにプレースホルダのバイトを埋め込みます。スキャンのたびに、NTAG21xチップは、あなたの電話がタグを読み取る前に、それらを2つのライブ値に置き換えます。タグの現在のスキャン回数と、その固有の工場出荷時IDです。

このページがそのウェブサイトです。バックエンドはありません - チップが自分のアドレスに付加した`?nfc=`の値を読み取り、届いたものを表示するだけです。カウントはチップの中で行われ、このページはそれを表示するだけです。

- **スキャン回数**は6桁の16進数で届きます(`000007`は7回目のスキャンです)。
- **タグID**はチップの7バイトの工場出荷時シリアル番号で、読み取りのたびに同じです。

どのチップが使えるか、実際の使用例、手順ごとの設定など、詳しい内容を知りたいですか。[サーバーなしでNFCタグのスキャン回数を数える方法](/ja/blog/count-nfc-tag-scans/)を読むか、[NFCリーダー＆ライター機能](/ja/features/nfc-reader-writer/)の全体をご覧ください。

</section>
