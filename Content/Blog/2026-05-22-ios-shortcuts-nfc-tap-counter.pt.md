---
id: "ios-shortcuts-nfc-tap-counter-2026-05"
title: "Processar Dados do Contador de Toques NFC Com os Atalhos do iOS"
date: "2026-05-22"
tags: ["nfc-tags", "automation", "iphone"]
summary: "Atalhos do iOS prontos a usar que processam o ID da tag e a contagem de leituras do Contador de Toques NFC - um processador reutilizável, e uma demonstração de alerta de tag que o usa."
image: "/assets/images/Blog/ios-shortcuts-nfc-tap-counter.webp"
imageAlt: "Um iPhone a mostrar um alerta com um ID de tag e uma contagem de leituras depois de tocar num autocolante NFC"
author: "Nicolo Stanciu"
metaTitle: "Processar Dados do Contador de Toques NFC Com os Atalhos do iOS"
metaDescription: "Um Atalho do iOS reutilizável que processa as cargas do Contador de Toques NFC (ID da tag + contagem de leituras), mais uma demonstração de alerta de tag. Ligações iCloud prontas a usar, sem configuração."
ogTitle: "Processar Dados do Contador de Toques NFC Com os Atalhos do iOS"
ogDescription: "Atalhos do iOS prontos a usar para o Contador de Toques NFC: um processador reutilizável e uma demonstração de alerta de tag."
---

Há uma semana, [expliquei passo a passo como funciona o Contador de Toques NFC](/blog/count-nfc-tag-scans/): o chip conta as suas próprias leituras, a aplicação insere bytes marcadores de posição, e a tag substitui a contagem ao vivo e o ID da tag naquilo que transporta a cada toque. Esse artigo para onde a tag para, ou seja, no momento em que os valores chegam ao seu telemóvel.

A pergunta que me têm feito desde então é a próxima óbvia: "ótimo, a tag está a entregar-me `049F50824F1390x000007` - e agora?" Se está no iPhone e quer agir sobre esses valores dentro de um Atalho, tem de os processar. É um trabalho de manipulação de cadeias pequeno mas chato, e prefiro que não tenha de o escrever você mesmo.

Por isso construí dois Atalhos e estou a partilhá-los como ligações iCloud. Um é o cérebro. O outro é uma demonstração que usa o cérebro.

---

## O Que a Tag Lhe Entrega

Antes dos atalhos: uma revisão rápida do que eles recebem de facto, porque isso importa para a forma como os usa.

No ecrã de configuração do Contador de Toques, escolhe um tipo de conteúdo para a tag: URL, Email, SMS ou Atalho. Quando ativa as opções Contador de Toques e/ou ID da Tag, a aplicação insere bytes marcadores de posição dentro desse conteúdo, e o chip troca-os pelos valores ao vivo a cada leitura. Usando `049F50824F1390` como ID da tag e `000007` como contagem, os quatro tipos de conteúdo acabam por ficar assim:

- **URL:** `https://nfc.cool/tap-counter/` torna-se [`https://nfc.cool/tap-counter/?nfc=049F50824F1390x000007`](https://nfc.cool/tap-counter/?nfc=049F50824F1390x000007)
- **Corpo do email:** `Hi, here's my card.` torna-se `Hi, here's my card. 049F50824F1390x000007`
- **Corpo do SMS:** `Order confirmed!` torna-se `Order confirmed! 049F50824F1390x000007`
- **Entrada do atalho:** `log-entry` torna-se `log-entry 049F50824F1390x000007`

O URL acima é real. A nossa [página de teste ao vivo do contador de toques](/tap-counter/) está configurada para ler o valor `?nfc=` diretamente da sua própria barra de endereço, por isso, se quiser ver a substituição acontecer antes de escrever a sua própria automatização, grave uma tag a apontar para `https://nfc.cool/tap-counter/` com ambas as opções ativadas, toque nela, e a página mostra-lhe o ID da tag e a contagem que acabou de receber.

Quando o tipo de conteúdo é **Atalho**, a NFC.cool executa o atalho escolhido através de `shortcuts://run-shortcut?name=Your%20Shortcut&input=text&text=<payload>`, com os valores NFC acrescentados já no texto. A entrada do seu atalho é uma cadeia de texto simples. A sua única tarefa é voltar a extrair daí o ID da tag e a contagem.

Consoante as opções que estivessem ativadas quando gravou a tag, pode obter o padrão completo (14 caracteres hexadecimais, um `x` e depois 6 caracteres hexadecimais), ou apenas o ID da tag de 14 hexadecimais, ou apenas a contagem de 6 hexadecimais. O processador lida com os três casos.

---

## Parse NFC Tap Counter - o Processador Reutilizável

[Instalar o Parse NFC Tap Counter](https://www.icloud.com/shortcuts/4c70ab3ade1a4398bb6a39edba94bf26)

Este é o cérebro. Não tem qualquer interface, recebe uma única entrada de texto e devolve um Dicionário. Isto é deliberado: um atalho utilitário sem interface combina-se de forma limpa dentro de qualquer outra coisa que construa, e um Dicionário é o mais fácil de consumir a partir de outro atalho com a ação **Get Dictionary Value**.

Eis o que o Dicionário contém:

- `tagID` - o ID da tag de 14 caracteres hexadecimais, ou uma cadeia vazia se a opção estivesse desligada.
- `count` - a contagem de leituras como um número decimal (por isso `000007` aparece como `7`, e `00000A` como `10`), ou vazio se a opção estivesse desligada.
- `countHex` - a contagem hexadecimal original de 6 caracteres, caso queira usá-la tal como está. Vazio se ausente.
- `hasTagID`, `hasCount` - valores booleanos para ramificação, para que possa escrever **If hasCount is true** sem ter de testar a cadeia você mesmo.
- `content` - a entrada com a carga NFC removida de forma limpa, para que o resto do seu atalho veja a entrada tal como estava antes de a tag a vestir. Se a entrada era um URL com `?nfc=...`, recebe o URL de volta sem isso. Se era um corpo de email com o ID da tag acrescentado, recebe o corpo de volta sem isso.
- `raw` - a entrada original sem modificações, caso queira registá-la ou recorrer a ela.

Para o chamar a partir do seu próprio atalho, a receita são três ações:

1. **Receive Shortcut Input** como texto (a carga NFC chega aqui).
2. **Run Shortcut** -> Parse NFC Tap Counter, com esse texto como entrada. Desligue "Show When Run" para que se mantenha invisível.
3. **Get Dictionary Value** -> escolha `tagID`, `count`, `content`, ou as chaves que lhe interessarem.

É só isto. A partir do passo 3 pode fazer o que quiser com os valores: ramificar com base em `hasTagID`, registar `count` numa Nota, disparar um webhook com o JSON, qualquer coisa. O processador não assume o que o seu atalho quer fazer com o resultado, e é exatamente por isso que é pequeno e reutilizável.

Uma nota sobre a contagem: é um Número a sério no Dicionário, não uma cadeia de texto, por isso pode introduzi-la diretamente numa comparação **Calculate** ou **If** sem a voltar a converter. O passo de hexadecimal para decimal já está feito.

---

## NFC Tag Alert - a Demonstração

[Instalar o NFC Tag Alert](https://www.icloud.com/shortcuts/f78b78c917a2417385ae25711a3e877a)

Esta é uma demonstração que eu próprio instalaria logo no primeiro dia, mesmo que não tenha qualquer intenção de usar alertas em produção. Recebe uma entrada de texto, executa o processador e mostra um único alerta intitulado **NFC Tag Scanned** com duas linhas:

```
Tag ID: 049F50824F1390
Scans: 7
```

A razão pela qual a instalaria primeiro é que é a verificação de sanidade mais rápida possível para uma tag com contador ativado. Grave uma tag a partir da NFC.cool Tools com o tipo de conteúdo **Atalho** e o nome **NFC Tag Alert**, ative as opções Contador de Toques e ID da Tag, grave-a, toque nela. Aparece um alerta com os valores reais da sua tag física.

Se o alerta mostrar os valores que esperava, a sua tag está a fazer o seu trabalho e pode avançar para construir algo mais elaborado. Se a contagem estiver errada ou faltar o ID da tag, sabe que o problema é a tag (ou as opções que escolheu ao gravá-la) e não o seu próprio atalho. Eliminar toda uma categoria de depuração do tipo "isto é sequer culpa do chip?" justifica bem instalar um atalho de cinco ações.

Se alguma vez se questionar sobre como chamar o processador corretamente, este atalho é também o exemplo prático mais pequeno possível. Abra-o, veja as cinco ações, copie a estrutura para o seu próprio atalho.

---

## Como Integrá-lo no Seu Próprio Atalho

Há duas formas de encaminhar o conteúdo da tag para o seu atalho. O processador lida bem com ambas.

**Conduzido pela tag (a carga do Atalho).** Grave a tag com o tipo de conteúdo **Atalho**, escolha o seu atalho pelo nome, ative as opções que quiser. A partir daí, cada toque lança o seu atalho com a carga NFC já na entrada. Dentro do seu atalho, chame o Parse NFC Tap Counter sobre essa entrada e fica com `tagID` / `count` prontos a usar.

**Conduzido pelo URL (a carga do URL).** Este é o caso mais comum. A tag transporta um URL, o seu telemóvel abre esse URL ao tocar, e a contagem segue junto como `?nfc=...`. Se quiser que um Atalho trate do toque em vez de (ou em conjunto com) um navegador, pode: encaminhe o URL através de um Atalho que aceite uma entrada de página web do Safari, e depois execute o Parse NFC Tap Counter sobre o URL. O processador remove o segmento `?nfc=` de forma limpa e devolve-lhe o URL sem ele como `content`, para que o possa passar a um navegador, a uma chamada de API, ou a qualquer outro sítio que espere um URL simples.

Eis um exemplo de quatro ações para "registar cada leitura numa nota no Notas da Apple":

1. **Receive Shortcut Input** como texto.
2. **Run Shortcut** -> Parse NFC Tap Counter, com a entrada como texto.
3. **Get Dictionary Value** -> três consultas seguidas para `tagID`, `count` e `content`. Guarde cada uma numa variável.
4. **Append to Note** -> uma única linha como `[Current Date] tag=<tagID> count=<count> url=<content>`.

Fica agora com um registo de toques contínuo escrito pela própria tag. Sem backend, sem análise de terceiros, sem conta em lado nenhum.

---

## Algumas Ideias para Desenvolver

Um punhado de pequenas coisas que o processador desbloqueia, escritas para que não as tenha de inventar de raiz:

- **Ramificar com base no ID da tag.** Um atalho, muitas tags. Acrescente uma ação **If** por cada ID de tag conhecido: se a tag da porta do escritório foi lida, silencie as notificações; se a tag do estúdio foi lida, defina um modo de foco; se a tag da cozinha foi lida, inicie um temporizador. O ID da tag identifica a tag física, não o conteúdo, por isso pode dar o mesmo URL a todas as tags e ainda assim reagir a cada uma individualmente.
- **Escolher um vencedor na leitura N.** Combine `hasCount` com uma comparação. Se `count` for igual a 100, dispare uma mensagem de confirmação; para todas as outras leituras, faça o tratamento normal. O chip impõe a ordem; o seu atalho limita-se a lê-la.
- **Enviar para um webhook.** Combine isto com a [funcionalidade de Webhooks](/features/webhooks/) da NFC.cool se quiser tratamento no servidor sem escrever uma aplicação iOS: envie os valores processados como JSON, e deixe o servidor continuar a partir daí. Duas ações no iOS e a sua tag fica ligada a qualquer coisa que fale HTTP.
- **Registar num ficheiro ou numa Nota.** A mais simples e surpreendentemente útil. Acrescente `timestamp, tagID, count` a um ficheiro contínuo no iCloud Drive ou a uma única Nota, e fica com um registo de toques pelo qual pode navegar ou que pode representar graficamente mais tarde. Bom para acompanhar a interação numa única tag sem montar infraestrutura.

Se construir algo interessante com estes, gostaria genuinamente de ver.

---

## Um Breve Agradecimento

Ambos os atalhos foram construídos com o [Shortcuts Playground](https://github.com/viticci/shortcuts-playground-plugin), o plugin de Federico Viticci para gerar Atalhos do iOS a partir de linguagem natural. É uma excelente ferramenta, e quero agradecer-lhe por a ter lançado - sem ela, estes dois teriam-me levado muito mais tempo a montar.

---

## Uma Nota Rápida para Android

Os Atalhos são uma aplicação da Apple, por isso estes dois só funcionam no iPhone. A funcionalidade Contador de Toques em si funciona em ambas as plataformas, porque a substituição acontece dentro do chip e não se importa com qual o telemóvel que está a ler a tag. No Android, os tipos de carga URL, Email e SMS comportam-se da mesma forma que no iOS; se quiser automatizações semelhantes por lá, aplicações como o Tasker ou o MacroDroid conseguem pegar num URL com `?nfc=...` e extrair os valores com as suas próprias ações de manipulação de cadeias. O formato em trânsito é o mesmo.

---

## Experimente

Se quiser a explicação mais aprofundada de como a funcionalidade Contador de Toques realmente funciona nos bastidores, está no [artigo anterior](/blog/count-nfc-tag-scans/). E se quiser ver uma tag com contador ativado em ação sem configurar primeiro a sua própria automatização, a nossa página de [demonstração ao vivo do contador de toques](/tap-counter/) lê o valor `?nfc=` diretamente do seu próprio URL: grave uma tag que aponte para lá, toque nela, veja a contagem e o ID da tag aparecerem.

A funcionalidade Contador de Toques NFC em si vive na NFC.cool Tools, no [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ios-shortcuts-nfc-tap-counter-en&mt=8) e no [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ios-shortcuts-nfc-tap-counter-en). Para o conjunto completo de ferramentas que construí em torno do NFC, dê uma vista de olhos na [funcionalidade de leitor e gravador NFC](/features/nfc-reader-writer/).
