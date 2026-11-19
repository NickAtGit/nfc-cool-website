---
title: "NFC.cool x-callback-url"
slug: "x-callback-url"
description: "Outras apps e páginas web podem pedir à NFC.cool no iPhone que faça algo e devolva o resultado, segundo a convenção x-callback-url."
---

<section class="page-hero">

<div class="page-hero-grid">

<div class="page-hero-text">

# NFC.cool x-callback-url

Outras apps e páginas web podem pedir à NFC.cool no iPhone que faça algo e devolva o resultado, segundo a convenção [x-callback-url](https://x-callback-url.com).

Webhooks, Atalhos e esquemas de URL estão na [página para programadores](/pt/developers/).

<a href="#read-uid" class="landing-cta-button">Ver a documentação</a>

</div>

<div class="page-hero-visual">
<img src="/assets/images/Webflow/nfc-scan-tag.webp" alt="iPhone a ler uma tag NFC" loading="eager" fetchpriority="high"/>
</div>

</div>

</section>

<section class="page-section" id="read-uid">

## Ler o ID de uma tag a partir da sua app ou página web

Uma ligação pede à NFC.cool que leia uma tag e lhe devolva o respetivo UID e, com `ndef=1`, também a mensagem NDEF da tag. Funciona a partir de qualquer página web ou app no iPhone, sem nada para configurar além de instalar a NFC.cool. A ligação segue a convenção [x-callback-url](https://x-callback-url.com). A leitura de tags para outras apps e sites faz parte do NFC.cool Business, a licença empresarial da NFC.cool no iPhone: [escreva-nos](mailto:info@nfc.cool?subject=NFC.cool%20Business) para obter uma.

```
https://nfc.cool/x-callback-url/read-uid?<parameters>
nfcforiphone://x-callback-url/read-uid?<parameters>
```

As duas formas fazem o mesmo. Prefira a forma `https`: num iPhone sem a NFC.cool, abre uma página que explica como obtê-la, em vez de falhar sem aviso. Coloque-a numa ligação em que a pessoa toque; o iOS não abre apps a partir de ligações que um script segue sozinho.

A NFC.cool passa para primeiro plano, indica quem recebe o ID da tag e inicia a leitura. Se já estiver aberta uma ligação read-uid, a ligação mais recente substitui-a, e quem chamou antes recebe `cancelled`.

### Parâmetros

<div class="page-cards-grid">

<article class="page-card">
<h3><code>x-get</code></h3>
<p>A NFC.cool chama este URL em segundo plano com o resultado como parâmetros de consulta. Todos os desfechos chegam aqui de imediato, incluindo falhas e cancelamentos.</p>
<p><strong>Obrigatório:</strong> <code>x-get</code>, <code>x-post</code> ou <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-post</code></h3>
<p>A NFC.cool envia o resultado para aqui por POST, em JSON.</p>
<p><strong>Obrigatório:</strong> <code>x-get</code>, <code>x-post</code> ou <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-success</code></h3>
<p>Aberto após uma leitura bem-sucedida, com <code>uid</code>, <code>ndef</code> e <code>state</code> acrescentados. Em conjunto com <code>x-get</code> ou <code>x-post</code>, recebe apenas <code>state</code>: o UID vai para o servidor que foi mostrado à pessoa e para mais nenhum sítio.</p>
<p><strong>Obrigatório:</strong> <code>x-get</code>, <code>x-post</code> ou <code>x-success</code></p>
</article>

<article class="page-card">
<h3><code>x-error</code></h3>
<p>Aberto quando a pessoa fecha a NFC.cool após uma falha, com <code>errorCode</code>, <code>errorMessage</code> e <code>state</code>.</p>
<p><strong>Obrigatório:</strong> não</p>
</article>

<article class="page-card">
<h3><code>x-cancel</code></h3>
<p>Aberto quando a pessoa cancela, com <code>state</code>.</p>
<p><strong>Obrigatório:</strong> não</p>
</article>

<article class="page-card">
<h3><code>state</code></h3>
<p>Qualquer cadeia, por exemplo um ID de pedido de utilização única. É devolvido inalterado com cada resultado.</p>
<p><strong>Obrigatório:</strong> não, mas recomendado</p>
</article>

<article class="page-card">
<h3><code>ndef</code></h3>
<p><code>1</code> lê também a mensagem NDEF da tag. Sem ele, apenas o UID é lido.</p>
<p><strong>Obrigatório:</strong> não</p>
</article>

</div>

Use `x-get` ou `x-post`, não ambos. Codifique em URL cada valor de callback.

Qualquer página web pode abrir esta ligação, por isso a NFC.cool só faz callbacks para URLs `https` e para esquemas de URL de outras apps, como `yourapp://nfc-done`; `x-get` e `x-post` têm de ser `https`. São recusados `http` simples, `javascript:`, `data:`, `tel:`, os esquemas da própria NFC.cool e os esquemas do sistema que atuam sozinhos (`shortcuts:`, `itms-services:`, `mailto:`, `App-Prefs:` e semelhantes), e uma ligação com qualquer callback recusado é ignorada.

### O UID

Hexadecimal em maiúsculas, sem separadores, com o byte mais significativo primeiro. O comprimento distingue as famílias de chips:

<div class="page-cards-grid">

<article class="page-card">
<h3>NTAG, MIFARE Ultralight (ISO 14443-A)</h3>
<p>7 bytes</p>
<p><code>04A1B2C3D4E5F6</code></p>
</article>

<article class="page-card">
<h3>ICODE e outras tags ISO 15693</h3>
<p>8 bytes</p>
<p><code>E004015012345678</code></p>
</article>

</div>

Os UID ISO 15693 começam por `E0`, pela ordem impressa no chip e mostrada pela maioria dos leitores.

### A mensagem NDEF

Com `ndef=1`, `ndef` contém a mensagem NDEF em bruto da tag, ou seja, os registos sem o cabeçalho TLV, em Base64url sem preenchimento ([RFC 4648, secção 5](https://www.rfc-editor.org/rfc/rfc4648#section-5)): `-` e `_` em vez de `+` e `/`, e sem `=`. É omitido quando a tag não contém nenhuma mensagem NDEF.

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

O seu URL é chamado tal como está, com o resultado acrescentado a seguir aos parâmetros que já tem. Cada tentativa recebe exatamente uma chamada, por isso a página que está à espera pode parar assim que ela chega:

<div class="page-cards-grid">

<article class="page-card">
<h3><code>cancelled</code></h3>
<p>A pessoa cancelou a leitura ou fechou a NFC.cool antes de ler uma tag.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>Não foi encontrada nenhuma tag a tempo, ou não foi possível ler a tag.</p>
</article>

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>Este iPhone não tem acesso ao NFC.cool Business.</p>
</article>

</div>

Depois de `cancelled` ou `scan-failed`, a pessoa pode tentar novamente, e uma leitura bem-sucedida chama então `x-get` outra vez com o `uid`: considere a última chamada de cada `state` como a resposta. Responda com qualquer estado 2xx. Se uma chamada de sucesso falhar, a NFC.cool oferece-se para a enviar novamente.

### `x-post`

```
POST https://your-server.example/api/uid
Content-Type: application/json

{"uid":"04A1B2C3D4E5F6","state":"7f3c9a","readAt":"2026-11-19T09:30:00Z","ndef":"0QEFVAJkZUhp"}
```

Responda com qualquer estado 2xx no prazo de 20 segundos. Qualquer outra resposta conta como falha: a pessoa pode voltar a enviá-lo, e ao fechar a NFC.cool é comunicado `delivery-failed` ao `x-error`. Use `x-post` quando a página que iniciou a leitura não puder ser reaberta por URL, por exemplo uma web view dentro de outra app; a pessoa regressa com a ligação que o iOS mostra no canto superior esquerdo.

A NFC.cool não envia cookies com `x-get` nem com `x-post`. Reconheça o pedido pelo `state` de utilização única que colocou na ligação.

### Códigos de `x-error`

<div class="page-cards-grid">

<article class="page-card">
<h3><code>business-plan-required</code></h3>
<p>Este iPhone não tem acesso ao NFC.cool Business.</p>
</article>

<article class="page-card">
<h3><code>scan-failed</code></h3>
<p>Não foi encontrada nenhuma tag a tempo, ou não foi possível ler a tag.</p>
</article>

<article class="page-card">
<h3><code>delivery-failed</code></h3>
<p>O pedido <code>x-post</code> falhou.</p>
</article>

</div>

### Exemplo

Uma página que espera pelo seu próprio servidor, também com a mensagem NDEF:

```html
<a href="https://nfc.cool/x-callback-url/read-uid?x-get=https%3A%2F%2Fexample.com%2Fnfc%3Fcode%3Dabc123&ndef=1&state=7f3c9a">
  Scan tag
</a>
```

</section>
