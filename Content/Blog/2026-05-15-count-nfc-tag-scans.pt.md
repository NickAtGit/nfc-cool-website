---
id: "count-nfc-tag-scans-2026-05"
title: "Como Contar Leituras de Tags NFC Sem um Servidor"
date: "2026-05-15"
tags: ["nfc-tags", "guides"]
summary: "Coloque o mesmo URL em 50 autocolantes NFC e não conseguirá saber em qual deles tocaram - a menos que a tag se conte a si própria. Eis como."
image: "/assets/images/Blog/count-nfc-tag-scans.webp"
imageAlt: "Uma tag NFC a ser tocada por um telemóvel, com um número crescente de leituras ao lado"
author: "Nicolo Stanciu"
metaTitle: "Como Contar Leituras de Tags NFC Sem um Servidor"
metaDescription: "Saiba quantas vezes uma tag NFC foi tocada - e qual a tag física em causa - usando o contador integrado do chip. Sem backend, sem internet. Um guia prático."
ogTitle: "Como Contar Leituras de Tags NFC Sem um Servidor"
ogDescription: "A sua tag NFC pode contar as suas próprias leituras. Eis como usar isso para acompanhar a interação, edições limitadas e verificações antifalsificação."
---

Imagine que imprime o mesmo URL em cinquenta autocolantes NFC e os cola em cinquenta produtos, cinquenta cartazes ou cinquenta cartões de visita. Uma semana depois, alguém faz a pergunta óbvia: em qual deles tocaram, afinal? E quantas vezes?

Construo a NFC.cool há anos, e a resposta habitual que ouço é um servidor. Geramos cinquenta ligações únicas, apontamo-las todas para um backend, e deixamos que o software de análise conte os acessos. Funciona, mas agora está a manter infraestrutura, a pagar por ela e a confiar que se mantenha online enquanto esses autocolantes existirem. Sempre me pareceu muita engrenagem para uma pergunta tão simples.

Há uma forma mais simples, e esteve dentro do chip NFC este tempo todo. Muitas tags conseguem contar as suas próprias leituras. Com a configuração certa, uma tag dir-lhe-á quantas vezes foi lida e qual a tag física em causa, sem qualquer backend envolvido. Este é um dos meus truques de NFC preferidos para mostrar às pessoas, por isso eis como funciona e como o configurar.

---

## O Que é Realmente um Contador de Toques NFC

A maioria dos [autocolantes NFC que pode comprar](/affiliate-links/) usa chips da família NTAG21x - `NTAG213`, `NTAG215` e `NTAG216`. Esses chips têm uma pequena funcionalidade que, pelo que vejo, a maioria das pessoas nunca soube que existia: um contador integrado. De cada vez que a tag é lida, o contador avança uma unidade. Vive no hardware do chip, não numa aplicação, e não num servidor. (Se quiser a análise mais aprofundada destes chips, falei deles em [tipos de tags NFC para iPhone](/blog/nfc-tag-types-for-iphones/).)

A forma como o descrevo é como um conta-quilómetros para a tag. O conta-quilómetros de um carro conta os quilómetros quer alguém esteja a olhar ou não; o contador NFC conta as leituras da mesma forma. O número está sempre lá. A única questão é se há algo configurado para o mostrar.

É exatamente isso que a funcionalidade Contador de Toques NFC na NFC.cool Tools faz, e é a parte de que mais me orgulho. Configura a tag uma vez para que, a partir daí, a tag comunique a sua própria contagem. Não precisa de digitalizar a tag você mesmo para verificar o número, e não precisa que a aplicação esteja presente quando outras pessoas tocam nela. A tag faz a contagem e a comunicação por conta própria.

Os mesmos chips trazem também um ID de tag único - um número de série gravado de fábrica, um pouco como um endereço MAC numa placa de rede. A funcionalidade Contador de Toques também pode expor esse ID, e é isso que lhe permite distinguir cinquenta autocolantes de aspeto idêntico.

---

## Como Funciona, Sem o Jargão

Quando grava conteúdo numa tag com o Contador de Toques ativado, a aplicação faz algo que considero genuinamente inteligente. Insere uma linha de caracteres marcadores de posição naquilo que está a gravar - um substituto para a contagem e o ID. Essa parte ainda me parece um pouco um truque de magia, mesmo depois de a ter construído.

A partir daí, o chip trata do resto. Como o ecrã de ajuda dentro da aplicação explica: "A aplicação insere bytes marcadores de posição no seu conteúdo. Em cada leitura, o chip substitui-os pela contagem de toques atual (e/ou pelo ID da tag) antes de o iPhone os ler. Sem servidor nem internet."

Por isso, a sequência em cada toque é assim. Alguém encosta o telemóvel à tag. O chip acorda, incrementa o contador, troca os marcadores de posição pelos números reais, e só depois entrega o conteúdo final ao telemóvel. O telemóvel que leu a tag nunca vê um marcador de posição - vê um URL completo com uma contagem ao vivo já incorporada.

O que quero que retenha é que só faz a configuração uma vez. Depois dessa primeira gravação, a tag fica por sua conta: vai contar e substituir a cada toque, de cada pessoa, em cada telemóvel, durante toda a vida do autocolante. Nada nessa cadeia toca na internet. A contagem acontece no chip. A substituição acontece no chip. Se apontar o URL final para um site que controle, o seu próprio servidor vê a contagem chegar - mas isso é uma escolha sua, não uma exigência da funcionalidade.

---

## O Que Pode Realmente Fazer Com Isto

Uma tag que se conta a si própria parece um truque engenhoso até que a associa a um problema real. Estes são os quatro usos a que volto sempre quando me perguntam para que serve.

**Saber qual o autocolante físico que foi lido.** Este é o problema dos cinquenta autocolantes do início deste artigo. Coloque o mesmo URL em todas as tags, ative o ID da tag, e cada toque chega carimbado com o número de série da tag exata de onde veio. Um URL para gerir, cinquenta tags que ainda consegue distinguir.

**Limitar o acesso gratuito.** Como a contagem viaja em cada toque, pode agir sobre ela. Faça uma promoção em que as primeiras cem leituras recebem a versão de demonstração e as leituras posteriores são redirecionadas para outro lado. Uma tiragem limitada pode entregar a recompensa completa até o contador ultrapassar um limiar que escolheu. A tag aplica o "primeiro a chegar, primeiro a ser servido" sem um sistema de inscrição por trás.

**Acompanhar a interação.** Cole uma tag num cartão de visita, num cartaz, numa caixa de produto ou numa montra, e o contador torna-se uma métrica de interação discreta. Consegue ver se um cartão foi tocado duas vezes ou duzentas, sem ter de construir uma infraestrutura de análise para isso.

**Provar a autenticidade.** O contador só sobe - não pode ser revertido. Um número que só pode aumentar é difícil de falsificar de forma convincente, e é por isso que acho que merece o seu lugar em artigos de edição limitada e verificações antifalsificação. Uma tag genuína tem um histórico plausível e crescente; uma clonada não. Se esse lado do NFC lhe interessa, aprofundei-o em [como o NFC mantém segredos encriptados em segurança](/blog/nfc-safe-encrypted-secrets/).

Junte alguns destes e obtém algo assim: um artesão coloca uma tag em cada tiragem numerada de um produto, todas a apontar para a mesma página de destino. O ID da tag diz-lhe que artigo um comprador tem nas mãos, a contagem diz-lhe com que frequência esse comprador voltou, e como a contagem só sobe, um revendedor não consegue, sem que se note, fazer passar uma cópia pelo original. Sem contas, sem base de dados, sem fatura mensal - apenas o chip a fazer o seu trabalho. É o tipo de resultado para o qual construí esta funcionalidade.

---

## Como Configurar, Passo a Passo

A funcionalidade vive na NFC.cool Tools, tanto no iPhone como no Android. Faz parte da subscrição Pro (Platinum), por isso vai precisar dela para gravar tags com contador ativado. Se nunca gravou uma tag, a minha explicação passo a passo sobre [como gravar tags NFC no iPhone](/blog/write-nfc-tags-iphone/) cobre primeiro os fundamentos.

1. Abra a NFC.cool Tools, vá à secção **NFC Tools** e toque em **NFC Tap Counter**.
2. Escolha o que a tag deve entregar: um **URL**, um **Email**, um **SMS** ou um **Atalho**. (O Atalho é só no iOS, uma vez que os Atalhos são uma aplicação da Apple; o URL, o Email e o SMS funcionam em ambas as plataformas.)
3. Componha esse conteúdo da forma habitual - escreva a ligação, redija a mensagem, escolha o atalho.
4. Ative as opções que pretende: **NFC Tap Counter** adiciona a contagem ao vivo, e **NFC Tag ID** adiciona o número de série da tag. Pode usar qualquer uma, ou ambas.
5. Se estiver a programar um lote de tags com o mesmo conteúdo, ative a **Gravação em lote** para que o leitor permaneça aberto e possa gravar uma tag após outra.
6. Verifique a **Pré-visualização**. Mostra um exemplo do resultado com valores de substituição, para que veja exatamente onde a contagem e o ID vão ficar antes de confirmar.
7. Toque em **Gravar na Tag NFC** e encoste uma tag ao topo do seu telemóvel.

Esta é toda a configuração, e mantive-a deliberadamente assim tão curta. A partir desse ponto, a tag é autossuficiente - conta e comunica por conta própria, para cada pessoa que toca nela, com ou sem a aplicação.

Se alguma vez quiser parar, a aplicação pode desligar o contador numa tag existente. O chip deixa de trocar os valores ao vivo, mas o conteúdo permanece na tag exatamente como foi gravado da última vez. Um detalhe que vale a pena saber: o chip continua a contar internamente mesmo depois de desligar a substituição - a contagem nunca se perde, apenas deixa de ser mostrada.

---

## Onde Aparecem a Contagem e o ID da Tag

O sítio onde os valores ficam depende do tipo de conteúdo que escolheu. Com ambas as opções ativadas, o ID da tag e a contagem são inseridos juntos - primeiro o ID, depois a contagem, ligados por um pequeno `x`. Usando `049F50824F1390` como ID da tag e `000007` como contagem, eis o antes e o depois para cada tipo:

- **URL:** `https://example.com/page` torna-se `https://example.com/page?nfc=049F50824F1390x000007`
- **Corpo do email:** `Hi, here's my card.` torna-se `Hi, here's my card. 049F50824F1390x000007`
- **Corpo do SMS:** `Order confirmed!` torna-se `Order confirmed! 049F50824F1390x000007`
- **Entrada do atalho:** `log-entry` torna-se `log-entry 049F50824F1390x000007`

Os valores são acrescentados de forma limpa, por isso o resto do seu conteúdo continua a funcionar normalmente. Desligue uma das opções e fica simplesmente com a outra por si só: só a contagem (`000007`) ou só o ID da tag (`049F50824F1390`).

Agora, a pergunta que me fazem sempre aqui: porquê `000007` e não apenas `7`? A contagem é escrita em hexadecimal - o sistema numérico de base 16, que vai de 0 a 9 e depois de A a F - e preenchida até seis caracteres. Por isso `000007` é simplesmente a sétima leitura da tag. Quando passa da leitura nove, começa a ver letras: `00000A` é 10. O limite máximo é `FFFFFF`, que são cerca de 16 milhões de leituras, mais margem do que quase qualquer tag do mundo real alguma vez precisará. O ID da tag é uma cadeia hexadecimal mais longa - o número de série de fábrica de 7 bytes do chip - e, ao contrário da contagem, nunca muda.

Se estiver a encaminhar o URL final para o seu próprio site, o seu servidor lê esses valores diretamente do endereço: registe a contagem, compare-a com um limiar, ou distinga uma tag de outra pelo seu ID.

---

## Que Tags Precisa

Esta funcionalidade depende do chip, por isso a tag importa. A NFC.cool suporta os chips `NTAG213`, `NTAG215` e `NTAG216` para o Contador de Toques. Estes são os autocolantes NFC mais comuns à venda para telemóveis, por isso são fáceis de encontrar, mas ainda assim verificaria o tipo de chip antes de comprar em quantidade. Se tentar usar uma tag que a funcionalidade não suporta, a aplicação avisa-o em vez de gravar algo que não vai funcionar - garanti isso porque já vi como uma falha silenciosa é frustrante.

Se precisar de se abastecer, a nossa página de [tags NFC recomendadas](/affiliate-links/) lista os autocolantes `NTAG216` que usamos e com os quais testamos. E se está a começar a escolher tags, o meu guia sobre [os diferentes tipos de tags NFC para iPhone](/blog/nfc-tag-types-for-iphones/) explica os prós e contras em termos simples.

---

## Algumas Perguntas Rápidas

**Posso repor o contador?** Não. É um contador unidirecional integrado no chip e só pode subir. Isso é deliberado e, honestamente, é o ponto central de tudo - um contador que pudesse repor seria inútil para edições limitadas ou verificações antifalsificação. Se precisar de uma contagem nova, use uma tag nova.

**Qualquer pessoa pode ler a contagem, ou só eu?** Qualquer pessoa. Cada telemóvel que toca na tag recebe o conteúdo final com a contagem já incluída, com ou sem a aplicação instalada. É esse o objetivo - a tag comunica por si própria.

**Posso desligá-lo mais tarde?** Sim. A aplicação pode impedir o chip de substituir os marcadores de posição. O URL ou a mensagem permanecem na tag; só as atualizações ao vivo é que param. O chip continua a contar internamente.

**O contador é privado?** A contagem vive na tag, não num servidor. Quem toca na tag vê a contagem no conteúdo e, se esse conteúdo apontar para um servidor que controle, só esse servidor a vê. O ID da tag é um número de série de fábrica, não informação pessoalmente identificável.

**Precisa de internet?** Não. A contagem e a substituição acontecem ambas dentro do chip. A internet só entra em jogo se o URL que gravou apontar para um site.

---

## Experimente

Durante a maior parte dos anos em que trabalhei com NFC, contar toques significava ligações únicas e um backend para as totalizar. O contador do NTAG21x elimina discretamente esse requisito: a tag mantém a sua própria contagem, e a funcionalidade Contador de Toques NFC na NFC.cool Tools é o que a ativa. É uma daquelas funcionalidades que continuo a desejar que mais pessoas soubessem sequer ser possível.

Quer vê-la a funcionar antes de gravar uma única tag? A nossa [demonstração ao vivo do contador de toques](/tap-counter/) é uma página que faz exatamente o que este artigo descreve - grave uma tag que aponte para ela, dê-lhe um toque, e a página mostra-lhe a contagem de leituras e o ID da tag que o chip acabou de lhe entregar. Sem servidor no meio, apenas o URL.

Está disponível agora na NFC.cool Tools, no [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-count-nfc-tag-scans-en&mt=8) e no [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-count-nfc-tag-scans-en). Para ver o conjunto completo de ferramentas NFC que construí, dê uma vista de olhos na [funcionalidade de leitor e gravador NFC](/features/nfc-reader-writer/).
