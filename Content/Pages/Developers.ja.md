---
title: "開発者向け"
slug: "developers"
description: "Webhookペイロード仕様、cURL/Node.js/Pythonのコードサンプル、ツールやAIエージェント向けの機械可読フィード。"
---

<section class="page-hero">

# ビルダーのために

NFC.coolは、あなたのスタックを尊重するスキャナーです。すべてのスキャンを、構造化されたHTTP POSTとしてあなたのバックエンドへ送れます — 予測可能なJSON、設定可能な認証、オフライン・リトライキュー付き。

</section>

<section class="page-section">

## Webhookペイロード

各スキャンは設定したURLへ単一の`POST`を送信します。BodyはJSON、Content-Typeは`application/json`:

```json
{
  "type": "nfc",
  "payload": "https://example.com/check-in/abc123",
  "uid": "04:A2:7F:1B:5E:80:00",
  "timestamp": "2026-05-12T14:23:01Z",
  "device": "Nicolo's iPhone 16 Pro",
  "metadata": {
    "campaign": "front-desk",
    "tag_label": "Reception NFC"
  }
}
```

フィールド・リファレンス:

- `type` — `nfc`、`qr`、`barcode`のいずれか。
- `payload` — デコードされた内容(URI、テキスト、vCard、Wi-Fi設定など)。NFCタグの場合はパース済みNDEFレコードの値、QR/バーコードの場合は生のデコード文字列。
- `uid` — タグ識別子(NFCの場合)またはコード識別子(QR/バーコードの場合)。同じタグは常に同じUIDを返します。重複排除に有用です。
- `timestamp` — UTCのISO 8601形式、デバイス上でスキャンが発生した時刻。
- `device` — 任意の、ユーザー設定可能なデバイスラベル(例: "Reception iPhone")。
- `metadata` — 任意のキー/値オブジェクト。NFC.cool内でタグごとに設定できます。

</section>

<section class="page-section">

## セキュリティ

Webhookはカスタム・リクエストヘッダーをサポートします — クライアントサイドのコードにシークレットを残さず認証するために使用してください:

- **Bearerトークン:** `Authorization: Bearer YOUR_TOKEN`
- **APIキー:** `X-API-Key: YOUR_KEY`
- **HMAC署名:** 共有シークレットとペイロードから計算したカスタム`X-Signature`ヘッダーを追加し、サーバー側で検証。

アプリはヘッダーをシステム・キーチェーンに保存します。NFC.cool自体がそれを見ることも送信することもありません — デバイスからあなたのエンドポイントへ、TLS 1.2以降を介して直接送られます。

</section>

<section class="page-section">

## レシーバー例

### cURL — クイック・スモークテスト

```bash
curl -X POST https://your-server.example/webhook \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer test-token' \
  -d '{"type":"nfc","payload":"hello","uid":"04:00","timestamp":"2026-05-12T14:00:00Z"}'
```

### Node.js — Expressレシーバー

```js
import express from "express";
const app = express();
app.use(express.json());

app.post("/webhook", (req, res) => {
  const auth = req.header("authorization");
  if (auth !== `Bearer ${process.env.WEBHOOK_TOKEN}`) {
    return res.status(401).send("unauthorized");
  }
  const { type, payload, uid, timestamp } = req.body;
  console.log(`scan: ${type} ${payload} uid=${uid} at ${timestamp}`);
  res.status(204).end();
});

app.listen(3000);
```

### Python — FastAPIレシーバー

```python
from fastapi import FastAPI, Header, HTTPException, Request
import os

app = FastAPI()

@app.post("/webhook")
async def webhook(request: Request, authorization: str | None = Header(None)):
    if authorization != f"Bearer {os.environ['WEBHOOK_TOKEN']}":
        raise HTTPException(401, "unauthorized")
    body = await request.json()
    print(f"scan: {body['type']} {body['payload']} uid={body['uid']}")
    return {"ok": True}
```

</section>

<section class="page-section">

## 信頼性

サーバーに到達できない場合や2xx以外のレスポンスが返った場合、NFC.coolはPOSTをデバイス上のローカルキューに溜め、指数バックオフで再試行します(最大5回)。アプリ内の履歴からいつでも過去のスキャンを手動で再送信できます。スキャンが静かに失われることはありません。

推奨のレスポンス: 成功時は `204 No Content` を返してください。2xxはすべて成功配送として扱われます。

</section>

<section class="page-section">

## 機械可読リソース

ツール、検索エンジン、AIエージェント向けに発見可能なフィード:

- [`/sitemap.xml`](/sitemap.xml) — サイト全体のインデックス
- [`/llms.txt`](/llms.txt) — AI向けのサイト・ディレクトリ(自動生成)
- [`/feed.xml`](/feed.xml) — サイト全体のRSS(全文)
- [`/blog/feed.xml`](/blog/feed.xml) — ブログ専用RSS
- [`/changelog/feed.xml`](/changelog/feed.xml) — リリースフィード
- [`/assets/nav-index.json`](/assets/nav-index.json) — 構造化されたナビゲーション・インデックス
- [`/assets/search-index.json`](/assets/search-index.json) — 全文検索インデックス

インテグレーションや自動ディスカバリーを構築していて、必要なものが見つからない場合は: <hello@nfc.cool>。

</section>
