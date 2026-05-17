---
title: "オンライン NFC リーダー"
slug: "online-nfc-reader"
description: "ブラウザでそのまま NFC タグを読み書き。アプリも登録も不要です。タグをスキャンして中身を確認したり、リンクやテキストを書き込んだりできます。無料で、Android の Chrome で動作します。iPhone をお使いの方には無料の NFC.cool アプリをご用意しています。"
image: "/assets/images/og-landing.webp"
---

<script type="application/json" id="nfc-i18n">{"rec.text":"テキスト","rec.link":"リンク","rec.phone":"電話番号","rec.email":"メール","rec.sms":"SMS","rec.location":"位置情報","rec.contact":"連絡先","rec.contactCard":"連絡先カード","rec.wifi":"Wi-Fi","rec.wifiNetwork":"Wi-Fi ネットワーク","rec.smartPoster":"スマートポスター","rec.app":"アプリ","rec.empty":"空","rec.emptyValue":"このレコードにはデータがありません。","rec.data":"データ","rec.generic":"レコード","rec.undecodable":"(デコードできませんでした)","read.unavailable":"利用不可","read.noRecords":"タグは読み取れましたが、レコードはありません。","unit.bytes":"バイト","tech.records":"レコード","tech.total":"ペイロード合計","tech.record":"レコード","tech.type":"タイプ","tech.media":"メディアタイプ","tech.id":"レコード ID","tech.encoding":"エンコーディング","tech.language":"言語","tech.size":"サイズ","tech.note1":"ブラウザではチップのモデル、メモリ容量、ロック状態は確認できません。","tech.appLink":"NFC.cool アプリ","tech.note2":"なら、それらに加えてチップの生メモリまで読み取れます。","summary.contact":"連絡先: ","summary.wifi":"Wi-Fi: ","valid.link":"タグに書き込むリンクを入力してください。","valid.linkInvalid":"有効なリンクではないようです。","valid.text":"タグに書き込むテキストを入力してください。","valid.phone":"電話番号を入力してください。","valid.email":"メールアドレスを入力してください。","valid.latlng":"緯度と経度の両方を入力してください。","valid.latlngNum":"緯度と経度は数値で入力してください。","valid.contact":"連絡先の名前を入力してください。","valid.wifiSsid":"Wi-Fi ネットワーク名を入力してください。","valid.wifiPass":"Wi-Fi のパスワードを入力してください。","err.readingError":"このタグを読み取れませんでした。スマートフォンの上部に平らに当てて、もう一度お試しください。","err.blocked":"NFC へのアクセスがブロックされました。このサイトに NFC を許可してから、もう一度お試しください。","err.notSupported":"このスマートフォンは NFC チップに到達できません。Android の設定で NFC がオンになっているか確認してください。","err.notReadable":"Android が NFC を開けませんでした。NFC がオンになっていることを確認してから、もう一度お試しください。","err.write":"タグに書き込めませんでした。ロックされているか、容量が足りないか、早く離してしまった可能性があります。","err.read":"スキャンが予期せず停止しました。タグをスマートフォンに当てて、もう一度お試しください。"}</script>

<svg style="display:none" aria-hidden="true"><symbol id="nfc-icon-wave" viewBox="0 0 24 24"><path fill="currentColor" d="M8.77 12C8.77 10.18 8.14 8.48 7.02 7.15C6.29 6.29 5.22 7.27 5.77 7.97C6.84 9.32 7.25 10.44 7.25 12C7.25 13.55 6.84 14.67 5.77 16.02C5.23 16.72 6.3 17.69 7.02 16.83C8.14 15.51 8.77 13.82 8.77 12ZM13.56 12C13.56 9.22 12.69 6.61 11.12 4.5C10.41 3.56 9.18 4.47 9.84 5.33C11.28 7.22 12.05 9.53 12.05 12C12.05 14.46 11.28 16.77 9.84 18.66C9.18 19.53 10.41 20.44 11.12 19.48C12.69 17.37 13.56 14.77 13.56 12ZM18.38 12C18.38 8.26 17.21 4.78 15.14 1.89C14.5 1 13.2 1.78 13.89 2.71C15.83 5.37 16.86 8.58 16.86 12C16.86 15.42 15.82 18.62 13.89 21.28C13.22 22.2 14.47 23.02 15.14 22.1C17.21 19.21 18.38 15.73 18.38 12Z"/></symbol><symbol id="nfc-icon-android" viewBox="0 0 24 24" fill="none"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></symbol><symbol id="nfc-icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17.5 19 7"/></symbol><symbol id="nfc-icon-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></symbol></svg>

<section class="page-hero nfc-reader-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# オンライン NFC リーダー

ブラウザからそのまま NFC タグを読み取れるように、私がこれを作りました。アプリも登録も不要です。*タグをスキャン* をタップして、スマートフォンをタグに当てると、その中身がすぐに表示されます。*書き込み* タブに切り替えれば、タグにリンクやテキストを書き込むこともできます。すべての処理はお使いのスマートフォン上で行われ、スキャンした内容が外部に送信されることは一切ありません。

<div class="nfc-hero-reqs"><span class="platform-pill is-android"><svg class="platform-pill-icon" viewBox="2 2 20 20" fill="none" aria-hidden="true"><path d="M8.4 3 9.9 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M15.6 3 14.1 5.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.5 10.4a6.5 6.5 0 0 1 13 0Z" fill="currentColor"/><circle cx="9.6" cy="7.9" r="1" fill="#fff"/><circle cx="14.4" cy="7.9" r="1" fill="#fff"/><rect x="5.6" y="11.3" width="12.8" height="7.3" rx="1.5" fill="currentColor"/><rect x="2.4" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="19.2" y="11.6" width="2.4" height="6" rx="1.2" fill="currentColor"/><rect x="7.9" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/><rect x="13.7" y="18" width="2.4" height="3.9" rx="1.2" fill="currentColor"/></svg><span class="platform-pill-label">Android の Chrome</span></span></div>

</div>

<div class="page-hero-visual">

<div id="nfc-reader-app" class="nfc-reader" data-state="desktop" data-mode="read" data-write-type="url">
<div class="nfc-phone">
<div class="nfc-phone-screen">
<div class="nfc-reader-tabs" role="tablist" aria-label="リーダーモード">
<button type="button" class="nfc-reader-tab" data-nfc-tab="read" role="tab" aria-selected="true">読み取り</button>
<button type="button" class="nfc-reader-tab" data-nfc-tab="write" role="tab" aria-selected="false">書き込み</button>
</div>
<div class="nfc-reader-body">
<div class="nfc-reader-panel" data-panel="read-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">NFC タグを読み取る</p>
<p class="nfc-reader-lead">ボタンをタップして、スマートフォンの上部にタグを当ててください。中身を表示します。</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-scan><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>NFC を読み取る</span></button>
<p class="nfc-reader-fineprint">より多くの NFC 機能を備えたネイティブの NFC 体験をご希望ですか？ <a href="/features/nfc-reader-writer/">NFC.cool アプリを入手！</a></p>
</div>
<div class="nfc-reader-panel" data-panel="scanning">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">NFC を読み取る</p>
<p class="nfc-reader-lead">NFC タグをスマートフォンの背面上部に当ててください。</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>キャンセル</span></button>
</div>
<div class="nfc-reader-panel" data-panel="result">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>タグを読み取りました</span>
<ul class="nfc-reader-records" data-nfc-records></ul>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">シリアル番号</span><span class="nfc-reader-value" data-nfc-serial></span></div>
<details class="nfc-reader-details"><summary>技術的な詳細</summary><div class="nfc-reader-tech" data-nfc-tech></div></details>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>NFC を読み取る</span></button>
</div>
<div class="nfc-reader-panel" data-panel="write-ready">
<span class="nfc-reader-badge"><svg class="nfc-reader-os-icon" aria-hidden="true"><use href="#nfc-icon-android"/></svg>Android · Chrome</span>
<p class="nfc-reader-title">NFC タグに書き込む</p>
<select class="nfc-reader-select" data-nfc-type-select aria-label="タグに書き込む内容">
<optgroup label="基本">
<option value="link">リンク</option>
<option value="text">テキスト</option>
</optgroup>
<optgroup label="連絡先">
<option value="phone">電話番号</option>
<option value="email">メール</option>
<option value="sms">SMS メッセージ</option>
<option value="contact">連絡先カード</option>
</optgroup>
<optgroup label="ネットワーク">
<option value="wifi">Wi-Fi ネットワーク</option>
<option value="location">位置情報</option>
</optgroup>
</select>
<div class="nfc-reader-form" data-nfc-form>
<div class="nfc-reader-fields" data-nfc-fields="link">
<input type="url" class="nfc-reader-input" data-k="url" placeholder="https://example.com" aria-label="書き込むリンク"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="text" hidden>
<textarea class="nfc-reader-input nfc-reader-textarea" data-k="text" rows="3" placeholder="ここにテキストを入力" aria-label="書き込むテキスト"></textarea>
</div>
<div class="nfc-reader-fields" data-nfc-fields="phone" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="電話番号" aria-label="電話番号"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="email" hidden>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="メールアドレス" aria-label="メールアドレス"/>
<input type="text" class="nfc-reader-input" data-k="subject" placeholder="件名（任意）" aria-label="メールの件名（任意）"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="sms" hidden>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="電話番号" aria-label="SMS の電話番号"/>
<input type="text" class="nfc-reader-input" data-k="body" placeholder="メッセージ（任意）" aria-label="SMS メッセージ（任意）"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="location" hidden>
<input type="text" class="nfc-reader-input" data-k="lat" inputmode="decimal" placeholder="緯度" aria-label="緯度"/>
<input type="text" class="nfc-reader-input" data-k="lng" inputmode="decimal" placeholder="経度" aria-label="経度"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="contact" hidden>
<input type="text" class="nfc-reader-input" data-k="name" placeholder="氏名" aria-label="連絡先の名前"/>
<input type="tel" class="nfc-reader-input" data-k="tel" placeholder="電話番号（任意）" aria-label="連絡先の電話番号（任意）"/>
<input type="email" class="nfc-reader-input" data-k="email" placeholder="メール（任意）" aria-label="連絡先のメール（任意）"/>
<input type="text" class="nfc-reader-input" data-k="org" placeholder="所属（任意）" aria-label="連絡先の所属（任意）"/>
</div>
<div class="nfc-reader-fields" data-nfc-fields="wifi" hidden>
<input type="text" class="nfc-reader-input" data-k="ssid" placeholder="ネットワーク名（SSID）" aria-label="Wi-Fi ネットワーク名"/>
<input type="text" class="nfc-reader-input" data-k="password" placeholder="パスワード" aria-label="Wi-Fi のパスワード"/>
<select class="nfc-reader-select" data-k="security" aria-label="Wi-Fi のセキュリティ">
<option value="wpa">WPA / WPA2</option>
<option value="wep">WEP</option>
<option value="open">オープン（パスワードなし）</option>
</select>
</div>
</div>
<p class="nfc-reader-input-error" data-nfc-input-error></p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>タグに書き込む</span></button>
<p class="nfc-reader-fineprint">より多くの NFC 機能を備えたネイティブの NFC 体験をご希望ですか？ <a href="/features/nfc-reader-writer/">NFC.cool アプリを入手！</a></p>
</div>
<div class="nfc-reader-panel" data-panel="writing">
<div class="nfc-reader-radar" aria-hidden="true"><span class="nfc-reader-radar-core"><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg></span></div>
<p class="nfc-reader-title">NFC に書き込む</p>
<p class="nfc-reader-lead">NFC タグをスマートフォンの背面上部に当ててください。</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-cancel><span>キャンセル</span></button>
</div>
<div class="nfc-reader-panel" data-panel="written">
<span class="nfc-reader-badge is-success"><svg class="nfc-reader-check" aria-hidden="true"><use href="#nfc-icon-check"/></svg>タグに書き込みました</span>
<div class="nfc-reader-field"><span class="nfc-reader-field-label">タグに書き込んだ内容</span><span class="nfc-reader-value" data-nfc-written></span></div>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-write-again><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>別のタグに書き込む</span></button>
</div>
<div class="nfc-reader-panel" data-panel="error">
<span class="nfc-reader-badge is-error">問題が発生しました</span>
<p class="nfc-reader-lead" data-nfc-error-msg>問題が発生しました。</p>
<button type="button" class="landing-cta-button landing-cta-button--block" data-nfc-retry><svg class="nfc-reader-wave-icon" aria-hidden="true"><use href="#nfc-icon-wave"/></svg><span>もう一度試す</span></button>
</div>
<div class="nfc-reader-panel" data-panel="ios">
<span class="nfc-reader-badge is-muted">iPhone</span>
<p class="nfc-reader-title">iPhone ではブラウザの NFC を利用できません</p>
<p class="nfc-reader-lead">Apple はどのブラウザにも NFC チップへのアクセスを許可していません。そこで、iPhone でタグを読み書きできるよう、私が無料の NFC.cool アプリを作りました。</p>
<div class="landing-store-buttons"><a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-en&mt=8" class="landing-store-button is-apple" aria-label="App Store でダウンロード" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/AppStore.svg" alt="App Store で NFC.cool をダウンロード" width="156" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="android-other">
<span class="nfc-reader-badge is-muted">Chrome で開く</span>
<p class="nfc-reader-title">ここでスキャンするには Chrome に切り替えてください</p>
<p class="nfc-reader-lead">お使いの端末は Android なので、ブラウザでの読み書きは利用できます。ただし Chrome が必要です。このページを Chrome で開くと、リーダーが有効になります。</p>
<div class="landing-store-buttons"><a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-en" class="landing-store-button is-google" aria-label="Google Play で入手" target="_blank" rel="noopener nofollow sponsored"><img src="/assets/theme/images/GooglePlay.svg" alt="Google Play で NFC.cool を入手" width="173" height="52"/></a></div>
</div>
<div class="nfc-reader-panel" data-panel="desktop">
<span class="nfc-reader-badge is-muted">Android と Chrome のみ</span>
<img class="nfc-reader-qr" src="/assets/images/nfc-reader-qr.svg" alt="このページをスマートフォンで開く QR コード" width="188" height="188"/>
<p class="nfc-reader-lead">Android スマートフォンでこれをスキャンすると、その端末でリーダーが開きます。ブラウザでの NFC には Android の Chrome が必要です。</p>
<p class="nfc-reader-fineprint">iPhone をお使いですか？ <a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-en&mt=8" target="_blank" rel="noopener nofollow sponsored">NFC.cool アプリを入手</a>。</p>
</div>
</div>
</div>
</div>
</div>

</div>

</div>

</section>

<section class="page-section">

## 使い方

<div class="page-cards-grid">

<article class="page-card nfc-step">
<span class="landing-feature-num">01</span>
<h3>Android スマートフォンで開く</h3>
<p>このページを Android スマートフォンの Chrome で開いてください。Chrome には Web NFC という機能があり、ウェブサイトがスマートフォンの NFC チップとやり取りできます。それがこのページの仕組みのすべてです。</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">02</span>
<h3>読み取りか書き込みを選ぶ</h3>
<p>読み取りでは、タグに保存されているすべての内容を確認できます。書き込みでは、リンクや短いテキストをタグに記録できます。初回に Chrome へ NFC の許可を求めますが、その回答は記憶されます。</p>
</article>

<article class="page-card nfc-step">
<span class="landing-feature-num">03</span>
<h3>タグをスマートフォンに当てる</h3>
<p>タグをスマートフォンの上部に当ててください。デコードや書き込みはその場でお使いの端末上で行われます。私が中身を見ることはなく、何もアップロードされず、何も保存されません。</p>
</article>

</div>

</section>

<section class="page-section">

## NFC タグから読み取れる内容

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 14.5 14.5 9.5"/><path d="M11 6.5 12.4 5a3.8 3.8 0 0 1 5.4 5.4l-1.5 1.5"/><path d="M13 17.5 11.6 19a3.8 3.8 0 0 1-5.4-5.4l1.5-1.5"/></svg></span>
<h3>リンクと URL</h3>
<p>最も一般的なタグの内容です。ページやプロフィール、メニューを開くウェブアドレスなどがあります。リンク全体を表示するので、タップする前にどこへ移動するかを正確に確認できます。</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 7h14"/><path d="M5 12h14"/><path d="M5 17h9"/></svg></span>
<h3>プレーンテキスト</h3>
<p>メモ、説明、ID、その他テキストレコードとして保存された短いメッセージです。チップから直接、テキストとその言語をデコードします。</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4 4 8l8 4 8-4-8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 16 8 4 8-4"/></svg></span>
<h3>その他のレコード</h3>
<p>Wi-Fi の認証情報、連絡先カード、アプリ固有のデータは型付きレコードとして表示されます。また、何度読み取っても同じ値となる、タグ固有のシリアル番号も確認できます。</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>空のタグやロックされたタグ</h3>
<p>空のタグはレコードがない状態できれいに読み取れます。書き込む前に新しいタグを確認するのに便利です。ロックされたタグでも、その種類とシリアル番号は表示されます。</p>
</article>

</div>

</section>

<section class="page-section">

## 読み書き以上のことをしたいですか？

このページのリーダーは日常的な作業をこなします。タグを読み取り、よく使うデータを書き込むことです。ほとんどの方にとってはそれで十分で、ブラウザの Web NFC API もちょうどそのあたりまでです。プレーンな NDEF レコードのみ、Android の Chrome 限定です。**NFC.cool アプリ** は、このページでできることすべてに加えて、ブラウザでは届かない領域まで進みます。

<div class="page-cards-grid">

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg aria-hidden="true"><use href="#nfc-icon-lock"/></svg></span>
<h3>タグのロック、フォーマット、保護</h3>
<p>タグをロックして内容を二度と変更できないようにしたり、空の状態に戻したり、自分の端末だけが書き換えられるようパスワードで保護したりできます。</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg></span>
<h3>NFC Safe で機密情報を暗号化</h3>
<p>NFC Safe はチップそのものに AES-256 で機密情報を暗号化して書き込みます。アプリ以外からは、タグはスクランブルされたデータとしてしか読み取れません。<a href="/blog/nfc-safe-encrypted-secrets/">NFC Safe の仕組み</a>。</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"/></svg></span>
<h3>タップの動作を自動化</h3>
<p>タグでウェブフックを実行したり、iOS ショートカットを起動したり、内容を読み上げたり、スキャンされた回数を数えたりできます。<a href="/blog/count-nfc-tag-scans/">NFC タグのスキャン回数を数える方法</a>。</p>
</article>

<article class="page-card nfc-feature-card">
<span class="nfc-feature-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"/></svg></span>
<h3>タグのクローン、リセット、検査</h3>
<p>タグをクローンしたり、生のチップメモリをダンプして識別したり、<a href="/blog/openprinttag-read-write-nfc-spools-phone/">3D プリンターのフィラメントスプール</a>や<a href="/blog/reset-sonicare-brush-head-nfc/">電動歯ブラシのブラシヘッド</a>のような NFC で制御されるハードウェアを再プログラムしたりできます。</p>
</article>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## iPhone の NFC にはアプリが必要です

Apple はすべての iOS ブラウザで NFC をブロックしているため、どのウェブサイトも iPhone や iPad でタグを読み書きできません。NFC.cool アプリは Android と同じように、それをネイティブにこなします。

<div class="landing-store-buttons">
<a href="https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=web-nfc-reader-ios-en&mt=8" class="landing-store-button is-apple" aria-label="App Store でダウンロード" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/AppStore.svg" alt="App Store で NFC.cool をダウンロード" width="156" height="52"/>
</a>
<a href="https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dweb%26utm_campaign%3Dweb-nfc-reader-android-en" class="landing-store-button is-google" aria-label="Google Play で入手" target="_blank" rel="noopener nofollow sponsored">
<img src="/assets/theme/images/GooglePlay.svg" alt="Google Play で NFC.cool を入手" width="173" height="52"/>
</a>
</div>

</section>

<section class="page-section">

## オンライン NFC リーダー よくある質問

<div class="nfc-reader-faq">

<details class="faq-item">
<summary>アプリなしで NFC タグを読み書きできますか？</summary>
<p>はい、Android スマートフォンの Chrome でできます。このページはブラウザに組み込まれた Web NFC を使うため、インストールするものは何もありません。スキャンをタップしてタグを読み取ったり、書き込みタブを使ってリンク、テキスト、連絡先、Wi-Fi ネットワークなどをタグに記録したりできます。</p>
</details>

<details class="faq-item">
<summary>Wi-Fi ネットワークや連絡先カードをタグに書き込めますか？</summary>
<p>はい。書き込みのドロップダウンで Wi-Fi ネットワークまたは連絡先カードを選び、各項目を入力してください。Wi-Fi タグは Android スマートフォンにネットワークへの接続を促し、連絡先タグは標準的な vCard を保存します。スマートフォンはそれを保存するかどうか尋ねてきます。</p>
</details>

<details class="faq-item">
<summary>iPhone でも使えますか？</summary>
<p>いいえ。Apple はすべての iOS ブラウザで NFC をブロックしているため、どのウェブサイトも iPhone や iPad でタグを読み書きできません。代わりに無料の NFC.cool アプリが iPhone でそれをこなします。</p>
</details>

<details class="faq-item">
<summary>どのブラウザに対応していますか？</summary>
<p>Web NFC は Android の Chrome およびその他の Chromium 系ブラウザでのみ動作します。デスクトップや iOS のブラウザは対応していません。お使いのブラウザが対応していない場合は、代わりにどうすればよいかをページが案内します。</p>
</details>

<details class="faq-item">
<summary>オンライン NFC リーダーは無料ですか？</summary>
<p>完全に無料です。登録もスキャン回数の制限もありません。タグの読み書きはお使いの端末上で行われ、何もアップロードされることはありません。</p>
</details>

</div>

</section>

<section class="page-hero nfc-reader-cta">

## どこでも NFC タグを読み書き

このページはブラウザでの基本的な使い方をカバーしています。無料の NFC.cool アプリはさらに進みます。あらゆるタグを読み取り、リンク、Wi-Fi、連絡先、ショートカットなど 25 種類以上のデータを iPhone と Android の両方で書き込めます。私自身が開発し、メンテナンスしています。

<div class="tap-cta-buttons">
<a href="/features/nfc-reader-writer/" class="landing-cta-button">NFC リーダー & ライターを見る</a>
<a href="/blog/nfc-tags-beginners-guide/" class="landing-cta-button">NFC タグは初めてですか？ここから始めましょう</a>
</div>

</section>
