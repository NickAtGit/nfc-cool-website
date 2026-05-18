---
title: "サポート & お問い合わせ"
slug: "contact"
description: "NFC.coolへのお問い合わせ - メールサポート、よくある質問、パートナーシップやインテグレーションに関する開発者への直接連絡、そして各種SNSチャンネル。NFC.coolについてご質問のある方はお気軽にどうぞ。"
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# サポート & お問い合わせ

いちばん早い連絡手段はメールです。一通一通、すべて目を通し、原則として翌営業日までに返信します。

<a href="mailto:info@nfc.cool?subject=NFC.cool%20Support" class="landing-cta-button">メールを送る</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/nfc-scan-tag.webp" alt="iPhoneでNFCタグをスキャン" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section">

## よくある質問

### はじめに

<details class="faq-item">
<summary>アプリは無料ですか？</summary>
<p>はい - App StoreとGoogle Playで両方とも無料で、広告もありません。アプリ内で一部の高度なワークフローはアンロック方式で提供される場合がありますが、NFC、QR、書類、3D、デジタル名刺の中核機能はすべて無料です。</p>
</details>

<details class="faq-item">
<summary>私のスマートフォンはNFCに対応していますか？</summary>
<p>iPhone 7以降のすべてのiPhoneがNFCに対応しており、iPhone XS以降ならアプリを起動せずロック画面からタグを読み取れます。Androidは2015年以降のほとんどの機種でNFCに対応しています - お使いの機種のスペックをご確認ください。NFC.coolは初回起動時に対応状況をお知らせします。</p>
</details>

<details class="faq-item">
<summary>iOS版とAndroid版の違いは？</summary>
<p>iPhone版はフル機能のスキャン・ツールキットです - NFC、QR・バーコード、書類(OCR付き)、3D・ルームスキャン。Android版はNFCの読み取りと書き込みに加え、デジタル名刺機能を備えています。その他のツールはAndroidのロードマップに含まれています。</p>
</details>

<details class="faq-item">
<summary>Mac、iPad、Apple Watch版はありますか？</summary>
<p>NFC.cool ToolsはiPhoneとiPadで動作し、Apple SiliconのMacでもMac対応のiPadアプリとして使えます。詳しくは<a href="/ja/blog/nfc-cool-comes-to-mac/">NFC.coolのMac対応について</a>をご覧ください。3D・ルームスキャンにはLiDAR搭載のiPadが必要です。Apple Watch版はありません。NFC.cool Business CardはiOSとAndroidでのみ利用できます。</p>
</details>

<details class="faq-item">
<summary>デジタル名刺は別のアプリですか？</summary>
<p>iPhoneでは、はい - NFC.cool Business Card Makerはbusiness-card.nfc.coolで提供されている専用アプリです。Androidでは同じデジタル名刺機能がNFC.cool Toolsに組み込まれており、追加のインストールは必要ありません。</p>
</details>

### デバイス・タグ・機能

<details class="faq-item">
<summary>どのNFCタグを買えばいいですか？</summary>
<p>iPhone用には、NTAGシリーズのType 2タグ(NTAG213/215/216)が最も適しています。NFC.coolはNFC Forum仕様(Type 1-5)に完全対応しており、MIFARE Classic、MIFARE Ultralight、MIFARE DESFire、ISO 14443、ISO 15693、FeliCaなどを含みます。極端に安いステッカーは避けてください - アンテナの品質が重要です。</p>
</details>

<details class="faq-item">
<summary>3D・ルームスキャンには専用のiPhoneが必要ですか？</summary>
<p>3DオブジェクトスキャンとルームスキャンはどちらもAppleのLiDARセンサーを使用します - iPhone 12 Pro以降のProモデル、およびiPad Pro 2020以降が対象です。AppleのObject CaptureとRoomPlanはどちらもLiDARを必要とするため、Pro以外のiPhoneでは動作しません。</p>
</details>

<details class="faq-item">
<summary>OCRはどの言語に対応していますか？</summary>
<p>書類スキャンはAppleのVisionフレームワークを使用しており、現在は英語、フランス語、イタリア語、ドイツ語、スペイン語、ポルトガル語、簡体字中国語を認識します。手書き認識はiOS 16以降でサポートされます。</p>
</details>

<details class="faq-item">
<summary>NFCタグが読み取れません - 何を確認すればいいですか？</summary>
<p>お使いのiPhoneがiPhone 7以降であることを確認してください。スマホの上端をタグのチップ部分に合わせ、安定した状態で当ててください。新品のタグの場合はフォーマット済みかも確認を(NFC.coolで空のタグをフォーマットできます)。</p>
</details>

### プライバシーとデータ

<details class="faq-item">
<summary>私のデータはどこに保存されますか？</summary>
<p>標準ではすべてがあなたのデバイス上に保存されます - スキャン、書き込みタグ、連絡先、書類、3Dモデル。NFC.coolにアップロードされることはありません。ご自身のサーバーへスキャン・データを転送したい場合はWebhookを有効にできますが、その場合でもNFC.coolはデータを参照しません。</p>
</details>

<details class="faq-item">
<summary>GDPRに準拠していますか？</summary>
<p>アプリはデバイス上でデータを処理するため、標準モードでは個人データがNFC.coolへ転送されることはありません。ウェブサイト自体もCookieを使用しません。ニュースレター(Mailjet)が唯一の第三者データフローですが、フォームはセルフホストなので訪問時にCookieは設定されません。詳しくは<a href="/ja/privacy/">プライバシーポリシー</a>をご覧ください。</p>
</details>

<details class="faq-item">
<summary>2台のiPhone間でデータを移行するには？</summary>
<p>NFC.coolのデータはアプリのサンドボックスに保存されます。元のデバイスでiCloudバックアップを作成し、新しいデバイスで復元してください - スキャン、書き込んだタグ、名刺、Webhook設定がすべて引き継がれます。</p>
</details>

### 支払い・お問い合わせ

<details class="faq-item">
<summary>サブスクリプションを解約するには？</summary>
<p>サブスクリプションはApp StoreまたはGoogle Playを通じて課金されるため、解約はそちらで行います(NFC.coolでは処理しません)。iOSでは<a href="https://support.apple.com/118428" target="_blank" rel="noopener">Appleのサブスクリプション解約手順</a>を、Androidでは<a href="https://support.google.com/googleplay/answer/7018481" target="_blank" rel="noopener">Google Playの解約手順</a>をご覧ください。</p>
</details>

<details class="faq-item">
<summary>返金はどうすればいいですか？</summary>
<p>返金はAppleまたはGoogleが対応しており、NFC.coolでは処理しません。iOSでは<a href="https://support.apple.com/118223" target="_blank" rel="noopener">Appleの返金リクエストページ</a>から申請してください。Androidでは<a href="https://support.google.com/googleplay/workflow/9813244" target="_blank" rel="noopener">Google Playの返金手続き</a>をご利用ください。</p>
</details>

<details class="faq-item">
<summary>機能の提案や懸念の報告はどうすればいいですか？</summary>
<p>どちらも<a href="mailto:info@nfc.cool?subject=NFC.cool%20Support">メールでご連絡ください</a>。機能のご提案はすべて記録し、ロードマップに反映します。プライバシーやセキュリティに関する懸念には5営業日以内に返信します。</p>
</details>

</section>

<section class="page-section">

## SNS

<div class="contact-social-grid">

<a href="https://www.instagram.com/nfc.cool" class="contact-social-card" target="_blank" rel="noopener">
<span class="contact-social-name">Instagram</span>
<span class="contact-social-handle">@nfc.cool</span>
</a>

<a href="https://www.tiktok.com/@nfc.cool" class="contact-social-card" target="_blank" rel="noopener">
<span class="contact-social-name">TikTok</span>
<span class="contact-social-handle">@nfc.cool</span>
</a>

<a href="https://www.youtube.com/@nfc.cool" class="contact-social-card" target="_blank" rel="noopener">
<span class="contact-social-name">YouTube</span>
<span class="contact-social-handle">@nfc.cool</span>
</a>

<a href="https://x.com/nfc_cool" class="contact-social-card" target="_blank" rel="noopener">
<span class="contact-social-name">X</span>
<span class="contact-social-handle">@nfc_cool</span>
</a>

<a href="https://www.linkedin.com/company/nfc-cool" class="contact-social-card" target="_blank" rel="noopener">
<span class="contact-social-name">LinkedIn</span>
<span class="contact-social-handle">nfc-cool</span>
</a>

<a href="https://bsky.app/profile/nfc.cool" class="contact-social-card" target="_blank" rel="noopener">
<span class="contact-social-name">Bluesky</span>
<span class="contact-social-handle">@nfc.cool</span>
</a>

<a href="https://www.threads.net/@nfc.cool" class="contact-social-card" target="_blank" rel="noopener">
<span class="contact-social-name">Threads</span>
<span class="contact-social-handle">@nfc.cool</span>
</a>

<a href="https://www.facebook.com/NFC.cool/" class="contact-social-card" target="_blank" rel="noopener">
<span class="contact-social-name">Facebook</span>
<span class="contact-social-handle">NFC.cool</span>
</a>

<a href="https://indieapps.space/@NFC" class="contact-social-card" target="_blank" rel="noopener">
<span class="contact-social-name">Mastodon</span>
<span class="contact-social-handle">@NFC</span>
</a>

<a href="/feed.xml" class="contact-social-card">
<span class="contact-social-name">RSS</span>
<span class="contact-social-handle">feed.xml</span>
</a>

</div>

</section>
