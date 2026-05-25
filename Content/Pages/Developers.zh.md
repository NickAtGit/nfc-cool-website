---
title: "开发者"
slug: "developers"
description: "如何把 NFC.cool 接入你的技术栈：webhook 载荷参考、App Intents、URL scheme、机器可读的数据源，以及在 iPhone 和 Android 上进行服务端集成所需的一切。"
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# 为构建者准备

NFC.cool 是一款尊重你技术栈的扫描工具。每一次扫描都可以变成一个结构化的 HTTP POST，以可预测的 JSON 格式从设备直接发送到你自己的后端。没有中间人，不需要 NFC.cool 账户，也不会上传到我们的服务器。

<a href="#webhook-payload" class="landing-cta-button">查看载荷</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/webhook.webp" alt="扫描数据流向一个 webhook 端点" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section">

## 你可以把 NFC.cool 接到哪里

一个 webhook 不过是向你掌控的某个 URL 发送一个 JSON `POST`，因此任何能讲 HTTP 的东西都行得通。

<div class="feature-capabilities-grid">

<article class="feature-capability-card">
<h3>Zapier</h3>
<p>用 Zapier 的 "Catch Webhook" 触发器把扫描结果路由到 5000 多个 App：CRM、表格、Slack，应有尽有。免费版可应对较小的流量。</p>
</article>

<article class="feature-capability-card">
<h3>n8n</h3>
<p>自托管 n8n，无需按任务计费即可无限运行工作流。它的 HTTP 触发节点可直接接收 NFC.cool 的 POST。</p>
</article>

<article class="feature-capability-card">
<h3>Make（原 Integromat）</h3>
<p>覆盖众多 App 的可视化工作流构建器。把 Webhooks 模块作为每一次 NFC.cool 扫描的入口。</p>
</article>

<article class="feature-capability-card">
<h3>IFTTT</h3>
<p>适合简单的 "if this then that" 路由。IFTTT 的 Webhooks 服务会给你一个独有的 URL，填进 NFC.cool 的 webhook 配置即可。</p>
</article>

<article class="feature-capability-card">
<h3>Slack / Discord / Teams</h3>
<p>把 webhook URL 指向 Slack 的 incoming webhook（或 Discord / Teams 的对应功能），每当有标签被轻触时就在频道里发出通知。</p>
</article>

<article class="feature-capability-card">
<h3>你自己的后端</h3>
<p>任何接受 JSON POST 的 HTTPS 端点都行。其数据结构、鉴权模型和示例接收端都记录在下文。</p>
</article>

</div>

</section>

<section class="page-section">

## 常见工作流模式

- **库存 + 审计追踪。**轻触物品上的标签，NFC.cool 就向某张表格或仓储系统发送 POST；表里随即出现一行，包含时间戳、标签标识符和载荷。
- **活动现场线索收集。**轻触展位横幅上的标签，你的 CRM 就会自动发出一封跟进邮件。
- **智能家居触发。**轻触前门上的标签来标记 "我到家了"，Home Assistant / Homey / Hubitat 会通过 webhook 接收到。
- **资产追踪。**维护人员轻触设备上的标签来记录巡检；后端据此构建合规日志。
- **会议签到。**轻触参会者的 NFC 胸牌；webhook 会实时更新你的活动平台。

</section>

<section class="page-section" id="webhooks">

## Webhook

在 App 内的 **More 标签页 → Webhook** 中启用：填入一个 HTTPS URL，可选地填写用于 HTTP Basic Auth 的用户名和密码，然后分别开启 "NFC scans" 和 "QR & barcode scans"。iOS 和 Android 均可使用。

每次扫描，App 都会向你配置的 URL 发出一个 `POST`。没有单独的重试队列：如果你的端点无法访问或返回非 2xx 响应，这次扫描的 POST 就会失败。成功时建议返回 `204 No Content`；任何 2xx 都会被视为已接受。

本页是技术参考。功能概览（另外四种 iOS 自动化挂钩、定价和常见问题）请查看 [Webhook 与自动化功能页面](/features/webhooks/)。

</section>

<section class="page-section" id="webhook-payload">

## Webhook 载荷

Content-type 为 `application/json`，请求体是经过美化格式化的 JSON：

```json
{
  "identifier" : "04:A2:7F:1B:5E:80:00",
  "date" : "2026-05-12T14:23:01Z",
  "content" : "https://example.com/check-in/abc123"
}
```

结构化标签（目前为 OpenPrintTag）会多出两个字段：

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

字段参考：

- `identifier`：对于 NFC 扫描，是标签的硬件 UID，以冒号分隔的大写十六进制表示（例如 `04:A2:7F:1B:5E:80:00`）。每个标签固定不变，因此可用于去重。对于二维码和条形码扫描，每次扫描都是一个新的 UUID，并非稳定的码 ID。在不暴露 UID 的旧版 iOS NFC 兼容模式下，该值为字面字符串 `NoIdentifierInCompatibilityMode`。
- `date`：ISO 8601 格式，表示扫描在设备端发生的时间。
- `content`：解码后的内容。对于 NFC，是 NDEF 记录的值（URI 或文本）；对于二维码 / 条形码，是解码出的原始字符串。
- `tagType`：普通扫描时省略。OpenPrintTag 扫描时设为 `"openPrintTag"`。
- `structured`：普通扫描时省略。当存在 `tagType` 时，为解析出的结构化载荷。

</section>

<section class="page-section">

## 鉴权

Webhook **仅支持 HTTP Basic Auth**。在 **More 标签页 → Webhook** 中，你可以选择把用户名和密码存入 iOS 钥匙串。随后，App 会用这些凭据响应来自你服务器的标准 HTTP `401 / WWW-Authenticate: Basic` 质询。

也就是说，是否需要鉴权由你的端点决定。如果你不需要鉴权，就在 App 里把用户名和密码留空，并在服务器上跳过质询。如果你确实需要，就在第一个 POST 时返回带有 `WWW-Authenticate: Basic realm="…"` 的 `401`，设备会带上 `Authorization: Basic …`（携带已保存的凭据）重试。一切都通过 TLS 传输；NFC.cool 的服务器永远看不到你的凭据。

目前不支持 Bearer token、API 密钥或 HMAC 签名。如果你需要这些，请在反向代理（Cloudflare Worker、nginx 等）上把 Basic 转换成你的方案，由其负责终结这部分鉴权。

</section>

<section class="page-section">

## 示例接收端

想要一条端到端的完整链路？克隆 [GitHub 上的参考 webhook 服务器](https://github.com/NickAtGit/nfc-cool-webhook-server)，它会实时记录每一个载荷。下面的代码片段是给你自己技术栈用的最小化接收端。

### cURL：快速冒烟测试

```bash
curl -X POST https://your-server.example/webhook \
  -u 'nfc-cool:your-password' \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"04:A2:7F:1B:5E:80:00","date":"2026-05-12T14:00:00Z","content":"hello"}'
```

### Node.js：Express 接收端

```js
import express from "express";
import basicAuth from "express-basic-auth";

const app = express();
app.use(express.json());

app.post(
  "/webhook",
  basicAuth({
    users: { "nfc-cool": process.env.WEBHOOK_PASSWORD },
    challenge: true, // 告知 NFC.cool 携带凭据重试
  }),
  (req, res) => {
    const { identifier, date, content, tagType } = req.body;
    console.log(`scan ${tagType ?? "plain"} ${content} id=${identifier} at ${date}`);
    res.status(204).end();
  }
);

app.listen(3000);
```

### Python：FastAPI 接收端

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

## App Intents 与快捷指令

**iOS** 版 NFC.cool Tools 提供了若干 App Intents，你可以把它们接入快捷指令 App、自动化、专注模式或 Apple Intelligence。

<div class="page-cards-grid">

<article class="page-card">
<h3><code>Scan</code></h3>
<p>在你选择的功能中启动一次扫描：NFC、二维码 / 条形码、文档、3D 物体或房间。</p>
</article>

<article class="page-card">
<h3><code>Open Tab</code></h3>
<p>将 NFC.cool 打开到指定标签页（NFC、二维码、文档、3D、更多），而不启动扫描。</p>
</article>

<article class="page-card">
<h3><code>Get Last NFC Tag</code></h3>
<p>以字符串形式返回上一次扫描的 NFC 标签的内容，适合作为快捷指令的输入。不会启动 App。</p>
</article>

<article class="page-card">
<h3><code>Get Last QR Code</code></h3>
<p>返回上一次扫描的二维码 / 条形码的内容。不会启动 App。</p>
</article>

<article class="page-card">
<h3><code>Write NFC</code></h3>
<p>打开 NFC 写入流程，并用快捷指令提供的网址或文本载荷预先填好。</p>
</article>

</div>

专用的 iOS 18 变体（`NFC Scan`、`QR Scan`、`Document Scan`、`Object Scan`、`Room Scan`）会直接出现在 Spotlight 和操作按钮的选择器中。

</section>

<section class="page-section" id="url-schemes">

## URL scheme

为便于从其他 iOS App、小组件或主屏幕快捷方式进行深度链接，NFC.cool Tools 注册了以下 URL：

```
nfcforiphone://scan-nfc
nfcforiphone://scan-code
nfcforiphone://scan-document
nfcforiphone://scan-object       (iOS 17+)
nfcforiphone://scan-room         (iOS 17+)
```

打开其中任意一个都会直接跳进对应的扫描器。`nfc://` 和 `geo://` scheme 也已注册，用于接管外部的标签 / 坐标链接。

</section>

<section class="page-section">

## 机器可读资源

面向工具、搜索引擎和 AI 智能体的可发现数据源：

<div class="page-cards-grid">

<article class="page-card">
<h3><a href="/sitemap.xml"><code>/sitemap.xml</code></a></h3>
<p>完整的站点索引：每一条路由及其最后修改时间。</p>
</article>

<article class="page-card">
<h3><a href="/llms.txt"><code>/llms.txt</code></a></h3>
<p>对 AI 友好的站点目录（由 SiteKit 自动生成）。</p>
</article>

<article class="page-card">
<h3><a href="/feed.xml"><code>/feed.xml</code></a></h3>
<p>全站 RSS，包含每个板块的全文内容。</p>
</article>

<article class="page-card">
<h3><a href="/blog/feed.xml"><code>/blog/feed.xml</code></a></h3>
<p>仅博客的 RSS 数据源。</p>
</article>

<article class="page-card">
<h3><a href="/changelog/feed.xml"><code>/changelog/feed.xml</code></a></h3>
<p>发布数据源：版本号、日期和更新日志条目。</p>
</article>

<article class="page-card">
<h3><a href="/assets/nav-index.json"><code>/assets/nav-index.json</code></a></h3>
<p>结构化导航索引，含标题、摘要、标签和 URL。</p>
</article>

<article class="page-card">
<h3><a href="/assets/search-index.json"><code>/assets/search-index.json</code></a></h3>
<p>每篇文章的纯文本内容，供客户端搜索使用。</p>
</article>

</div>

正在基于 NFC.cool 构建什么？或者发现了某个应当出现在本页的集成伙伴？[给我们留个言](mailto:info@nfc.cool?subject=NFC.cool%20Support)。

</section>
