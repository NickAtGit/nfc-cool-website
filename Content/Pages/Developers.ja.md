---
title: "開発者向け"
slug: "developers"
description: "NFC.coolをあなたのスタックへ接続:Webhookペイロード、App Intents、URLスキーム、機械可読フィード。"
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# ビルダーのために

NFC.coolは、あなたのスタックを尊重するスキャナーです。すべてのスキャンを、構造化されたHTTP POSTとしてあなたのバックエンドへ送れます - 予測可能なJSON、デバイスから直接。仲介者なし、NFC.coolアカウント不要、NFC.coolのサーバーへのアップロードもありません。

<a href="#webhook-payload" class="landing-cta-button">ペイロードを見る</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/webhook.webp" alt="スキャンデータがWebhookエンドポイントへ流れる図" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section">

## NFC.coolはどこへ接続できるか

WebhookはJSONの`POST`を指定URLへ送るだけ - HTTPに対応するものなら何でも繋げられます。

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
<p>JSON POSTを受信可能なHTTPSエンドポイントなら何でも動作します。スキーマ、認証モデル、サンプル受信プログラムは以下に記載しています。</p>
</article>

</div>

</section>

<section class="page-section">

## よくあるワークフロー・パターン

- **在庫管理 + 監査トレイル。** 商品のタグをタップ → NFC.coolがスプレッドシートや倉庫システムへPOST → タイムスタンプ、タグ識別子、ペイロード付きの行が追加。
- **イベントでのリード収集。** ブースのバナーにあるタグをタップ → CRMがフォローアップメールを自動送信。
- **スマートホーム・トリガー。** 玄関のタグをタップして「帰宅した」を記録 → Home Assistant / Homey / HubitatがWebhook経由で受信。
- **資産トラッキング。** メンテナンス担当者が機器のタグをタップして点検を記録 → バックエンドがコンプライアンス・ログを構築。
- **カンファレンスのチェックイン。** 参加者のNFCバッジをタップ → イベント・プラットフォームがリアルタイムで更新。

</section>

<section class="page-section" id="webhooks">

## Webhook

アプリ内の **「その他」タブ → Webhook** で有効化できます:HTTPSのURLを1つ入力し、必要に応じてHTTP Basic認証用のユーザー名/パスワードを設定、続いて「NFCスキャン」と「QR & バーコードスキャン」を個別にオン/オフできます。iOSとAndroidで利用可能。

各スキャンにつき、設定したURLへ単一の`POST`が送信されます。専用のリトライ・キューはありません:エンドポイントに到達できない、または2xx以外のレスポンスが返ると、そのPOSTは失敗扱いになります。成功時は`204 No Content`を返すのが理想です(2xxはすべて受け取り成功として扱います)。

このページは技術リファレンスです。機能の概要 - 他の4つのiOS自動化フック、料金、FAQ - は [Webhook & オートメーションの機能ページ](/ja/features/webhooks/) をご覧ください。

</section>

<section class="page-section" id="webhook-payload">

## Webhookペイロード

Content-Typeは`application/json`、ボディは整形済みJSONです:

```json
{
  "identifier" : "04:A2:7F:1B:5E:80:00",
  "date" : "2026-05-12T14:23:01Z",
  "content" : "https://example.com/check-in/abc123"
}
```

構造化タグ(現状はOpenPrintTag)では、さらに2つのフィールドが追加されます:

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

フィールド・リファレンス:

- `identifier` - NFCスキャンでは、タグのハードウェアUIDをコロン区切りの大文字16進数で表現したもの(例:`04:A2:7F:1B:5E:80:00`)。タグごとに安定しているため、重複排除に使えます。一方、QR・バーコードスキャンではスキャンごとに新しいUUIDが発行されるため、コードに紐づく安定した識別子ではありません。古いiOSのNFC互換モードでUIDが取得できない場合は、文字列`NoIdentifierInCompatibilityMode`が入ります。
- `date` - ISO 8601形式。デバイス上でスキャンが発生した時刻。
- `content` - デコード済みの内容。NFCの場合はNDEFレコードの値(URIまたはテキスト)、QR/バーコードの場合は生のデコード文字列。
- `tagType` - 通常のスキャンでは省略されます。OpenPrintTagの場合は`"openPrintTag"`。
- `structured` - 通常のスキャンでは省略されます。`tagType`がある場合、パース済みの構造化ペイロード。

</section>

<section class="page-section">

## 認証

Webhookは **HTTP Basic認証のみ** をサポートします。**「その他」タブ → Webhook** で、ユーザー名とパスワードをiOSキーチェーンに保存できます(任意)。これらの値を使い、サーバーからの`401 / WWW-Authenticate: Basic`チャレンジに応答します。

つまり、認証の要否はあなたのエンドポイント次第です。不要なら、アプリ側のユーザー名/パスワードを空にし、サーバー側でもチャレンジを発行しなければOK。必要なら、最初のPOSTに対して`401`と`WWW-Authenticate: Basic realm="…"`を返してください - デバイスは保存した認証情報を`Authorization: Basic …`としてリトライします。すべてTLSで送られ、NFC.coolのサーバーが認証情報を見ることはありません。

Bearerトークン、APIキー、HMAC署名は現状サポートしていません。必要な場合は、Cloudflare Workerやnginxなどのリバースプロキシでこれらの方式をBasic認証に変換してください。

</section>

<section class="page-section">

## レシーバー例

ループ全体を端から端まで見たいですか？　[GitHub上のリファレンスWebhookサーバー](https://github.com/NickAtGit/nfc-cool-webhook-server) をクローンしてください - すべてのペイロードをライブでログ出力します。以下のスニペットは、あなた自身のスタックに組み込める最小限のレシーバーです。

### cURL - クイック・スモークテスト

```bash
curl -X POST https://your-server.example/webhook \
  -u 'nfc-cool:your-password' \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"04:A2:7F:1B:5E:80:00","date":"2026-05-12T14:00:00Z","content":"hello"}'
```

### Node.js - Expressレシーバー

```js
import express from "express";
import basicAuth from "express-basic-auth";

const app = express();
app.use(express.json());

app.post(
  "/webhook",
  basicAuth({
    users: { "nfc-cool": process.env.WEBHOOK_PASSWORD },
    challenge: true, // NFC.coolが認証情報付きで再送するよう促す
  }),
  (req, res) => {
    const { identifier, date, content, tagType } = req.body;
    console.log(`scan ${tagType ?? "plain"} ${content} id=${identifier} at ${date}`);
    res.status(204).end();
  }
);

app.listen(3000);
```

### Python - FastAPIレシーバー

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

## App Intents & ショートカット

NFC.cool Tools(**iOS**)は、ショートカット・アプリ、オートメーション、集中モード、Apple Intelligenceに組み込めるApp Intentsをいくつか用意しています。

<div class="page-cards-grid">

<article class="page-card">
<h3><code>スキャン</code></h3>
<p>選択した機能(NFC、QR/バーコード、ドキュメント、3Dオブジェクト、ルーム)でスキャンを開始します。</p>
</article>

<article class="page-card">
<h3><code>タブを開く</code></h3>
<p>スキャンを開始せず、指定したタブ(NFC、QR、ドキュメント、3D、その他)でNFC.coolを開きます。</p>
</article>

<article class="page-card">
<h3><code>最後のNFCタグを取得</code></h3>
<p>最後にスキャンしたNFCタグの内容を文字列として返します - ショートカットの入力として便利。アプリは起動しません。</p>
</article>

<article class="page-card">
<h3><code>最後のQRコードを取得</code></h3>
<p>最後にスキャンしたQRコード/バーコードの内容を返します。アプリは起動しません。</p>
</article>

<article class="page-card">
<h3><code>NFCに書き込み</code></h3>
<p>ショートカットから渡されたURLまたはテキストを事前入力した状態で、NFC書き込みフローを開きます。</p>
</article>

</div>

iOS 18向けの専用バリアント(`NFC Scan`、`QR Scan`、`Document Scan`、`Object Scan`、`Room Scan`)は、Spotlightやアクションボタンのピッカーに直接表示されます。

</section>

<section class="page-section" id="url-schemes">

## URLスキーム

他のiOSアプリ、ウィジェット、ホーム画面のショートカットからのディープリンク用に、NFC.cool Toolsは以下のURLを登録しています:

```
nfcforiphone://scan-nfc
nfcforiphone://scan-code
nfcforiphone://scan-document
nfcforiphone://scan-object       (iOS 17+)
nfcforiphone://scan-room         (iOS 17+)
```

いずれを開いても、対応するスキャナーが直接立ち上がります。`nfc://`と`geo://`スキームも登録されており、外部のタグ/座標リンクの受け渡しに対応します。

</section>

<section class="page-section">

## 機械可読リソース

ツール、検索エンジン、AIエージェント向けに発見可能なフィード:

<div class="page-cards-grid">

<article class="page-card">
<h3><a href="/sitemap.xml"><code>/sitemap.xml</code></a></h3>
<p>サイト全体のインデックス - すべてのルートと最終更新日時。</p>
</article>

<article class="page-card">
<h3><a href="/llms.txt"><code>/llms.txt</code></a></h3>
<p>AI向けのサイト・ディレクトリ(自動生成)。</p>
</article>

<article class="page-card">
<h3><a href="/feed.xml"><code>/feed.xml</code></a></h3>
<p>サイト全体のRSS、各セクションの全文を含みます。</p>
</article>

<article class="page-card">
<h3><a href="/blog/feed.xml"><code>/blog/feed.xml</code></a></h3>
<p>ブログ専用のRSSフィード。</p>
</article>

<article class="page-card">
<h3><a href="/changelog/feed.xml"><code>/changelog/feed.xml</code></a></h3>
<p>リリースフィード - バージョン、日付、変更内容。</p>
</article>

<article class="page-card">
<h3><a href="/assets/nav-index.json"><code>/assets/nav-index.json</code></a></h3>
<p>タイトル、サマリー、タグ、URLを含む構造化ナビゲーション・インデックス。</p>
</article>

<article class="page-card">
<h3><a href="/assets/search-index.json"><code>/assets/search-index.json</code></a></h3>
<p>クライアントサイド検索用に、すべての記事のプレーンテキスト・コンテンツ。</p>
</article>

</div>

NFC.coolの上に何か作っていますか？　ここに掲載すべきインテグレーション・パートナーをご存知ですか？　[メールでご連絡ください](mailto:info@nfc.cool?subject=NFC.cool%20Support)。

</section>
