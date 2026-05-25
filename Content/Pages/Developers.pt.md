---
title: "Programadores"
slug: "developers"
description: "Como integrar a NFC.cool na sua stack - referência do payload de webhook, App Intents, esquemas de URL, feeds legíveis por máquina e tudo o que precisa para a integração no servidor, em iPhone e Android."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# Para quem constrói

A NFC.cool é um leitor que respeita a sua stack. Cada leitura pode ser um HTTP POST estruturado para o seu próprio backend, em JSON previsível, enviado diretamente a partir do dispositivo. Sem intermediários, sem conta NFC.cool, sem envio para os nossos servidores.

<a href="#webhook-payload" class="landing-cta-button">Ver o payload</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/webhook.webp" alt="Dados de leitura a fluir para um endpoint de webhook" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section">

## Onde pode integrar a NFC.cool

Um webhook é apenas um `POST` JSON para um URL que você controla - por isso, tudo o que fala HTTP é jogo limpo.

<div class="feature-capabilities-grid">

<article class="feature-capability-card">
<h3>Zapier</h3>
<p>Use o acionador "Catch Webhook" do Zapier para encaminhar leituras para mais de 5000 apps - CRMs, folhas de cálculo, Slack, o que quiser. A versão gratuita aguenta volumes ligeiros.</p>
</article>

<article class="feature-capability-card">
<h3>n8n</h3>
<p>Aloje o n8n por conta própria para execuções de fluxos de trabalho ilimitadas, sem preço por tarefa. O nó de acionamento por HTTP aceita diretamente os POST da NFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>Make (anteriormente Integromat)</h3>
<p>Construtor visual de fluxos de trabalho com ampla cobertura de apps. Use o módulo Webhooks como ponto de entrada para cada leitura da NFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>IFTTT</h3>
<p>Para um encaminhamento simples do tipo "if this then that". O serviço Webhooks do IFTTT dá-lhe um URL único para colocar na configuração de webhook da NFC.cool.</p>
</article>

<article class="feature-capability-card">
<h3>Slack / Discord / Teams</h3>
<p>Aponte o URL do webhook para um incoming-webhook do Slack (ou equivalente no Discord/Teams) para notificar um canal sempre que houver um toque numa tag.</p>
</article>

<article class="feature-capability-card">
<h3>O seu próprio backend</h3>
<p>Qualquer endpoint HTTPS que aceite um POST JSON serve. O esquema, o modelo de autenticação e exemplos de recetores estão documentados abaixo.</p>
</article>

</div>

</section>

<section class="page-section">

## Padrões comuns de fluxo de trabalho

- **Inventário + registo de auditoria.** Toque numa tag colocada num artigo e a NFC.cool faz POST para uma folha de cálculo ou sistema de armazém; surge uma linha com o carimbo de data/hora, o identificador da tag e o payload.
- **Captura de leads em eventos.** Toque numa tag no painel do seu stand e o seu CRM dispara automaticamente um email de seguimento.
- **Acionadores de casa inteligente.** Toque numa tag na porta de entrada para marcar "Estou em casa" - o Home Assistant / Homey / Hubitat capta-o via webhook.
- **Rastreio de ativos.** O pessoal de manutenção toca em tags nos equipamentos para registar inspeções; o backend constrói o registo de conformidade.
- **Check-ins em conferências.** Toque no crachá NFC de um participante; o webhook atualiza a sua plataforma de eventos em tempo real.

</section>

<section class="page-section" id="webhooks">

## Webhooks

Ative em **separador Mais → Webhook** dentro da app: introduza um URL HTTPS, opcionalmente um nome de utilizador/palavra-passe para HTTP Basic Auth e, depois, ative "leituras NFC" e "leituras de QR e códigos de barras" de forma independente. Disponível em iOS e Android.

A app dispara um único `POST` por leitura para o URL que configurou. Não há uma fila de repetição em separado: se o seu endpoint não estiver acessível ou devolver uma resposta que não seja 2xx, o POST da leitura falha. Procure devolver `204 No Content` em caso de sucesso; qualquer 2xx é tratado como aceite.

Esta página é a referência técnica. Para a visão geral da funcionalidade - os outros quatro ganchos de automação do iOS, preços e perguntas frequentes - consulte a [página da funcionalidade Webhooks e Automação](/features/webhooks/).

</section>

<section class="page-section" id="webhook-payload">

## Payload do webhook

Content-type `application/json`, o corpo é JSON formatado:

```json
{
  "identifier" : "04:A2:7F:1B:5E:80:00",
  "date" : "2026-05-12T14:23:01Z",
  "content" : "https://example.com/check-in/abc123"
}
```

As tags estruturadas (atualmente OpenPrintTag) acrescentam mais dois campos:

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

Referência dos campos:

- `identifier` - Para leituras NFC, o UID de hardware da tag em hexadecimal maiúsculo separado por dois pontos (por exemplo, `04:A2:7F:1B:5E:80:00`). Estável por tag, por isso pode usá-lo para desduplicação. Para leituras de QR e códigos de barras, é um UUID novo por leitura - não é um ID de código estável. Em modos de compatibilidade NFC mais antigos do iOS que não expõem o UID, o valor é a cadeia literal `NoIdentifierInCompatibilityMode`.
- `date` - ISO 8601, quando a leitura ocorreu no dispositivo.
- `content` - Conteúdo descodificado. Para NFC, o valor do registo NDEF (URI ou texto); para QR/código de barras, a cadeia descodificada em bruto.
- `tagType` - Omitido em leituras simples. Definido como `"openPrintTag"` para leituras de OpenPrintTag.
- `structured` - Omitido em leituras simples. Payload estruturado interpretado quando `tagType` está presente.

</section>

<section class="page-section">

## Autenticação

Os webhooks suportam **apenas HTTP Basic Auth**. Em **separador Mais → Webhook** pode, opcionalmente, guardar um nome de utilizador e palavra-passe no Keychain do iOS. A app responde então aos desafios HTTP padrão `401 / WWW-Authenticate: Basic` do seu servidor com essas credenciais.

Isso significa que é o seu endpoint que controla se a autenticação é necessária. Se não precisar de autenticação, deixe o nome de utilizador e a palavra-passe em branco na app e dispense o desafio no servidor. Se precisar, devolva um `401` com `WWW-Authenticate: Basic realm="…"` no primeiro POST - o dispositivo volta a tentar com `Authorization: Basic …` transportando as credenciais guardadas. Tudo viaja por TLS; os servidores da NFC.cool nunca veem as suas credenciais.

Hoje não há suporte para token Bearer, chave de API ou assinatura HMAC. Se precisar disso, termine-os num proxy inverso (Cloudflare Worker, nginx, etc.) que traduza Basic para o seu esquema.

</section>

<section class="page-section">

## Exemplos de recetores

Precisa do ciclo completo, de ponta a ponta? Clone o [servidor de webhook de referência no GitHub](https://github.com/NickAtGit/nfc-cool-webhook-server) - regista cada payload ao vivo. Os excertos abaixo são recetores mínimos para a sua própria stack.

### cURL - teste rápido de fumo

```bash
curl -X POST https://your-server.example/webhook \
  -u 'nfc-cool:your-password' \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"04:A2:7F:1B:5E:80:00","date":"2026-05-12T14:00:00Z","content":"hello"}'
```

### Node.js - recetor com Express

```js
import express from "express";
import basicAuth from "express-basic-auth";

const app = express();
app.use(express.json());

app.post(
  "/webhook",
  basicAuth({
    users: { "nfc-cool": process.env.WEBHOOK_PASSWORD },
    challenge: true, // indica à NFC.cool que volte a tentar com credenciais
  }),
  (req, res) => {
    const { identifier, date, content, tagType } = req.body;
    console.log(`scan ${tagType ?? "plain"} ${content} id=${identifier} at ${date}`);
    res.status(204).end();
  }
);

app.listen(3000);
```

### Python - recetor com FastAPI

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

## App Intents e Atalhos

A NFC.cool Tools no **iOS** inclui um conjunto de App Intents que pode ligar à app Atalhos, a automações, a modos de concentração ou ao Apple Intelligence.

<div class="page-cards-grid">

<article class="page-card">
<h3><code>Scan</code></h3>
<p>Inicia uma leitura na função que escolher: NFC, QR / código de barras, documento, objeto 3D ou divisão.</p>
</article>

<article class="page-card">
<h3><code>Open Tab</code></h3>
<p>Abre a NFC.cool num separador específico (NFC, QR, documento, 3D, mais) sem iniciar uma leitura.</p>
</article>

<article class="page-card">
<h3><code>Get Last NFC Tag</code></h3>
<p>Devolve o conteúdo da última tag NFC lida como uma cadeia de texto - útil como entrada de um Atalho. Não abre a app.</p>
</article>

<article class="page-card">
<h3><code>Get Last QR Code</code></h3>
<p>Devolve o conteúdo do último código QR / código de barras lido. Não abre a app.</p>
</article>

<article class="page-card">
<h3><code>Write NFC</code></h3>
<p>Abre o fluxo de gravação NFC pré-preenchido com um URL ou um payload de texto fornecido pelo Atalho.</p>
</article>

</div>

As variantes dedicadas do iOS 18 (`NFC Scan`, `QR Scan`, `Document Scan`, `Object Scan`, `Room Scan`) aparecem diretamente no Spotlight / no seletor do botão de ação.

</section>

<section class="page-section" id="url-schemes">

## Esquemas de URL

Para deep-linking a partir de outras apps iOS, widgets ou atalhos do ecrã principal, a NFC.cool Tools regista estes URLs:

```
nfcforiphone://scan-nfc
nfcforiphone://scan-code
nfcforiphone://scan-document
nfcforiphone://scan-object       (iOS 17 ou posterior)
nfcforiphone://scan-room         (iOS 17 ou posterior)
```

Abrir qualquer um destes leva-o diretamente ao leitor correspondente. Os esquemas `nfc://` e `geo://` também estão registados para entregar ligações externas de tags/coordenadas.

</section>

<section class="page-section">

## Recursos legíveis por máquina

Feeds detetáveis para ferramentas, motores de busca e agentes de IA:

<div class="page-cards-grid">

<article class="page-card">
<h3><a href="/sitemap.xml"><code>/sitemap.xml</code></a></h3>
<p>Índice completo do site - cada rota + data da última modificação.</p>
</article>

<article class="page-card">
<h3><a href="/llms.txt"><code>/llms.txt</code></a></h3>
<p>Diretório do site amigável para IA (emitido automaticamente pelo SiteKit).</p>
</article>

<article class="page-card">
<h3><a href="/feed.xml"><code>/feed.xml</code></a></h3>
<p>RSS de todo o site com conteúdo integral de cada secção.</p>
</article>

<article class="page-card">
<h3><a href="/blog/feed.xml"><code>/blog/feed.xml</code></a></h3>
<p>Feed RSS apenas do blogue.</p>
</article>

<article class="page-card">
<h3><a href="/changelog/feed.xml"><code>/changelog/feed.xml</code></a></h3>
<p>Feed de lançamentos - versões, datas e entradas do registo de alterações.</p>
</article>

<article class="page-card">
<h3><a href="/assets/nav-index.json"><code>/assets/nav-index.json</code></a></h3>
<p>Índice de navegação estruturado com títulos, resumos, etiquetas e URLs.</p>
</article>

<article class="page-card">
<h3><a href="/assets/search-index.json"><code>/assets/search-index.json</code></a></h3>
<p>Conteúdo em texto simples de cada artigo para pesquisa do lado do cliente.</p>
</article>

</div>

A construir algo sobre a NFC.cool? Ou descobriu um parceiro de integração que devia estar nesta página? [Deixe-nos uma nota](mailto:info@nfc.cool?subject=NFC.cool%20Support).

</section>
