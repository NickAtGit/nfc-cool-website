---
title: "インテグレーション"
slug: "integrations"
description: "NFC・QRスキャンを既存のツールへ連携 - Zapier、n8n、Make、IFTTT、または任意のHTTPエンドポイントへ。"
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# NFC.coolをあらゆるものへ接続

NFC.coolのすべてのスキャンは、あなたが指定するURLへHTTP POSTを送信できます。つまり、お気に入りのツールがWebhookを受信できれば、スキャンも受信できる、ということ。仲介者なし、NFC.coolアカウント不要、当社サーバーへのアップロードもありません。

<a href="/ja/features/webhooks/" class="landing-cta-button">Webhookドキュメントを見る</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/webhook.webp" alt="スキャンデータがWebhookエンドポイントへ流れる図" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section">

## 人気のインテグレーション

<div class="feature-capabilities-grid">

<article class="feature-capability-card">
<h3>Zapier</h3>
<p>Zapierの「Catch Webhook」トリガーを使えば、スキャンを5,000以上のアプリへルーティングできます - CRM、スプレッドシート、Slackなど。無料プランで小規模な利用にも対応。</p>
</article>

<article class="feature-capability-card">
<h3>n8n</h3>
<p>セルフホストのn8nなら、タスク単位の課金なしに無制限のワークフローを動かせます。HTTPトリガー・ノードがNFC.coolのPOSTを直接受け取ります。</p>
</article>

<article class="feature-capability-card">
<h3>Make(旧Integromat)</h3>
<p>ビジュアルなワークフロー・ビルダー、対応アプリも豊富。Webhooksモジュールを各NFC.coolスキャンの入口として活用できます。</p>
</article>

<article class="feature-capability-card">
<h3>IFTTT</h3>
<p>シンプルな「if this then that」のルーティングに。IFTTTのWebhooksサービスから固有URLを取得し、NFC.coolのWebhook設定に貼り付けるだけ。</p>
</article>

<article class="feature-capability-card">
<h3>Slack / Discord / Teams</h3>
<p>SlackのIncoming WebhookのURL(またはDiscord/Teamsの同等機能)に直接Webhookを向ければ、タグがタップされるたびにチャンネルへ通知できます。</p>
</article>

<article class="feature-capability-card">
<h3>自社のバックエンド</h3>
<p>JSON POSTを受信可能なHTTPSエンドポイントなら何でも動作します。ペイロード仕様や認証規約は[開発者向けドキュメント](/ja/developers/)をご覧ください。</p>
</article>

</div>

</section>

<section class="page-section">

## よくあるワークフロー・パターン

- **在庫管理 + 監査トレイル。** 商品のタグをタップ → NFC.coolがスプレッドシートや倉庫システムへPOST → タイムスタンプ、デバイス、ペイロード付きの行が追加。
- **イベントでのリード収集。** ブースのバナーにあるタグをタップ → CRMがフォローアップメールを自動送信。
- **スマートホーム・トリガー。** 玄関のタグをタップして「帰宅した」を記録 → Home Assistant / Homey / HubitatがWebhook経由で受信。
- **資産トラッキング。** メンテナンス担当者が機器のタグをタップして点検を記録 → バックエンドがコンプライアンス・ログを構築。
- **カンファレンスのチェックイン。** 参加者のNFCバッジをタップ → イベント・プラットフォームがリアルタイムで更新。

</section>

<section class="page-section">

## さっそく作る

[開発者向けドキュメント](/ja/developers/)で、ペイロード形式、セキュリティ・ヘッダー、リトライ仕様、cURL/Node.js/Pythonのサンプル受信プログラムを解説しています。

ここに掲載すべきインテグレーション・パートナーをご存知ですか?<hello@nfc.cool>までご連絡ください。

</section>
