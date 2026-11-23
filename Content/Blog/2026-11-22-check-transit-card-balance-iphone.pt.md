---
id: "check-transit-card-balance-iphone-2026-11"
title: "Como consultar o saldo do cartão de transportes ou IC no iPhone: Suica, Octopus, T-money e muitos outros"
date: "2026-11-22"
tags: ["guides", "iphone", "privacy"]
summary: "Encoste ao iPhone um cartão IC, de transportes ou de dinheiro eletrónico como o Suica, o Octopus ou o T-money e a NFC.cool mostra o saldo e as últimas viagens. Eis todos os cartões que lê, o que um cartão bancário revela e o que qualquer pessoa conseguiria ler do seu."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/check-transit-card-balance-iphone-v4.webp"
imageAlt: "Um iPhone a mostrar o saldo e o gráfico de um cartão de transportes enquanto um cartão IC verde está encostado a ele, com mais dois cartões de transportes à frente"
metaTitle: "Saldo do cartão de transportes e IC no iPhone: Suica e outros"
metaDescription: "Veja o saldo e as viagens de cartões IC, de transportes e de dinheiro eletrónico como Suica, PASMO, Octopus, T-money, Clipper e Opal no iPhone. Todos os cartões que a NFC.cool lê."
ogTitle: "Consulte o saldo do seu cartão de transportes com o iPhone"
ogDescription: "Suica, Octopus, T-money, Navigo, Clipper e muitos outros cartões IC: encoste o cartão ao iPhone e veja o saldo, as viagens e o que qualquer pessoa consegue ler dele."
---
Durante anos, houve um tipo de email que não parava de me chegar à caixa de entrada, numa dúzia de línguas e com uma dúzia de nomes de cartões diferentes. "A sua app não lê o meu cartão de dinheiro eletrónico." "Não deteta o meu cartão IC." "Encostei o meu bilhete de metro ao telemóvel e não aconteceu nada."

Tinham razão. A NFC.cool encontrava o chip, [mostrava o ID e o tipo de chip](/pt/features/nfc-reader-writer/) e ficava por aí. Para quem tinha na mão um cartão com dinheiro carregado, parecia que a app tinha desistido. Afinal, o saldo que procuravam estava ali mesmo, no cartão.

A versão 7.4.0 da [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-pt&mt=8) é a minha resposta a essa caixa de entrada. Encoste ao iPhone um cartão de transportes, de dinheiro eletrónico ou bancário, e a app mostra agora o saldo, as últimas viagens e, o que é igualmente interessante, tudo o que qualquer outra pessoa conseguiria ler dele. Começa no iPhone, e a [NFC.cool Tools para Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-check-transit-card-balance-iphone-pt) (em breve) vai receber a mesma leitura de cartões.

---

## Porque é que nem todos os cartões NFC são iguais

Todos estes cartões [falam com o telemóvel por NFC](/pt/blog/nfc-on-iphones-insider-look/). E as semelhanças acabam aí.

Eu vejo a coisa assim: o NFC é apenas a porta da rua. Atrás dela, cada cartão é um edifício à parte, com a sua própria planta e as suas próprias salas fechadas à chave. Os cartões do Japão funcionam com o **FeliCa** da Sony. Muitos cartões de transportes europeus usam **Calypso**. São Francisco, Sydney e Helsínquia usam [**MIFARE DESFire**](/pt/blog/ultimate-nfc-tag-guide/#mifare-classic-plus-e-desfire-a-família-do-controlo-de-acessos), cada uma com uma organização interna diferente. Os cartões bancários falam **EMV**, a mesma norma que o terminal da caixa do supermercado usa.

E, dentro de cada edifício, é o operador que decide que salas ficam abertas. Uns deixam o saldo e as últimas vinte viagens à vista de quem quiser entrar. Outros trancam todas as portas, e só os seus próprios torniquetes e máquinas de bilhetes têm a chave. Nenhuma app passa daí, e a NFC.cool nem tenta: limita-se a ler, não usa chaves e não grava nada no cartão.

Por isso, o verdadeiro trabalho por trás desta funcionalidade foi aprender a planta de cada sistema de cartões, um de cada vez.

---

## Que cartões IC e de transportes a NFC.cool consegue ler

Eis o que a app sabe ler hoje. Antes disso, uma nota honesta. Testei tudo o que tinha na minha própria carteira, incluindo o bilhete descartável de papel do OV-chipkaart dos Países Baixos e os meus próprios cartões bancários. Mas há muito mais cartões no mundo do que em qualquer carteira, por isso, na maioria dos cartões abaixo, a leitura assenta na forma como cada sistema está organizado e não num cartão que eu próprio tenha tido na mão. Se o seu for mal lido, ou nem sequer for lido, quero mesmo saber. Explico como mais abaixo.

<figure class="phone-figure" data-layout="stage">
<figcaption>O que a NFC.cool mostra do seu cartão</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/1-suica-balance-440w.webp" alt="Um cartão Suica na NFC.cool: a face verde do cartão com um saldo de ¥2,140, um gráfico do saldo por baixo e as primeiras viagens e pagamentos"><p><strong>Saldo.</strong> O saldo do cartão no topo e a forma como foi variando nas últimas viagens.</p></li>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/2-tmoney-trips-440w.webp" alt="Um cartão T-money na NFC.cool com um saldo de ₩12,350 e uma lista de pagamentos com data, hora, valor e o saldo depois de cada um"><p><strong>Viagens e pagamentos.</strong> Todos os registos que o cartão guarda, com o saldo que ficou depois de cada um.</p></li>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/3-locked-card-440w.webp" alt="Um cartão de transportes MIFARE DESFire na NFC.cool: o tipo de chip e o número de série são legíveis, e as viagens, o saldo e os passes aparecem como Não legível"><p><strong>Cartões trancados.</strong> Quando o operador tranca o cartão, a app diz-lhe o que fica fechado.</p></li>
</ol>
</figure>

### Saldo e últimas viagens

- **Japão:** Suica, PASMO, ICOCA, Kitaca, manaca, nimoca, PiTaPa, TOICA e Hayakaken, com até 20 viagens recentes e as respetivas estações, quando a app as conhece. O Rakuten Edy, o nanaco e o WAON também mostram o saldo e o histórico.
- **Coreia do Sul:** T-money e Cashbee, com as últimas viagens e as datas de emissão e de validade do cartão.
- **China e Hong Kong:** Shenzhen Tong, Wuhan Tong, os cartões City Union (apresentados como Shanghai Public Transport quando são de Xangai) e T-Union, com as últimas viagens e as datas de validade. O Octopus de Hong Kong mostra o saldo.
- **Indonésia:** Mandiri e-money, BCA Flazz, BNI TapCash, MegaCash e o KRL Kartu Multi Trip, com histórico. Os cartões JakCard e MRT Jakarta mostram o saldo.
- **Austrália e Nova Zelândia:** o Opal de Sydney, com o saldo e a última viagem, e o Snapper de Wellington, que funciona com o mesmo sistema do T-money e aparece em NZ$.
- **EUA:** Clipper em São Francisco e ORCA em Seattle.
- **Finlândia:** os cartões HSL, Waltti e de Tampere.
- **Israel:** Rav-Kav, com o valor carregado, os passes e as viagens.

### Passes e viagens, mas sem saldo

Muitos cartões europeus nem sequer guardam um saldo. Em vez disso, têm passes carregados. O Navigo de Paris e os outros cartões Calypso franceses (Pass Pass, KorriGo, OùRA e outros), o MOBIB em Bruxelas, o Opus em Montreal, o Venezia Unica e o Lisboa Viva mostram os passes que estão no cartão e as últimas viagens. O metroCARD de Adelaide e o Hafilat de Abu Dhabi fazem o mesmo, porque o saldo deles está protegido pela chave do operador.

### Bilhetes de papel e de uso único

Os bilhetes finos de papel também têm um chip. A NFC.cool lê os bilhetes Ventra de Chicago e Compass de Vancouver, o Troika de Moscovo, os bilhetes de papel do Clipper, os bilhetes da HSL, de Tampere, de Veneza e de Pisa, o bilhete de papel do OV-chipkaart e os bilhetes GTT de Turim, onde vai ver o tipo de bilhete, quando foi emitido e quando foi validado.

### Trancados pelo operador

Há operadores que trancam tudo. No Oyster de Londres, no Leap de Dublin ou no cartão Rabbit de Banguecoque, a NFC.cool consegue dizer-lhe que cartão é, e mais nada, porque não há mais nada aberto nele. Alguns, como o Myki de Melbourne e o PRESTO de Toronto, deixam ver o número do cartão e guardam o resto. Não é algo que uma atualização possa mudar. É assim que esses sistemas foram construídos.

### Cartões que precisam de um leitor externo

Há cartões que o iPhone simplesmente não entrega a uma app. É o caso do EZ-Link e do NETS FlashPay de Singapura e do Yikatong de Pequim. Ligue um [leitor NFC USB externo](/pt/affiliate-links/#usb-nfc-reader) e a NFC.cool lê-os, com saldo e histórico. Expliquei como funcionam esses leitores no artigo sobre [ler tags NFC no iPad e no Mac](/pt/blog/nfc-reading-ipad-mac/).

---

## Cartões bancários: o que vê e o que nunca vai ver

É com os cartões bancários que as pessoas ficam nervosas, e com razão.

No iPhone, a NFC.cool mostra-lhe a rede, Visa ou Mastercard, e nada mais. [A Apple não deixa que apps como a minha leiam os dados de pagamento de um cartão bancário](https://developer.apple.com/documentation/corenfc/nfctagreadersession) no iPhone e, como alguém que trabalha com esta tecnologia todos os dias, acho que é a decisão certa.

Com um leitor USB externo há mais: a rede, o número do cartão mascarado, com apenas os primeiros seis e os últimos quatro dígitos visíveis, a data de validade, o país emissor e a moeda. O que a NFC.cool nunca lê, em nenhum dispositivo, é o seu nome, e o código de segurança e o PIN nem sequer são legíveis. No [meu guia de tags NFC](/pt/blog/ultimate-nfc-tag-guide/#o-meu-telemóvel-consegue-ler-o-meu-cartão-bancário-ou-o-meu-passaporte-com-uma-app-nfc) explico porque é que não há nada no chip que valha a pena copiar.

---

## O que o telemóvel de um desconhecido conseguiria ler do seu cartão

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/anyone-can-read-440w.webp" alt="A secção O que qualquer pessoa pode ler de um cartão Suica na NFC.cool: o saldo e as últimas 6 viagens e pagamentos podem ser lidos por qualquer telemóvel, sem chave"><p><strong>O que qualquer pessoa pode ler.</strong> Num Suica, o saldo e as últimas viagens, sem precisar de chave.</p></li>
</ol>
</figure>

Esta é a parte que acho mais interessante, e é a primeira coisa que eu iria ver.

Tudo o que a NFC.cool lê, lê sem chave. Isso significa que qualquer telemóvel encostado ao seu cartão conseguiria ler o mesmo. Com um passaporte passa-se o contrário: o chip fica calado até lhe dar uma chave impressa na página da fotografia, e é assim que funciona [ler o passaporte com o telemóvel](/pt/blog/read-passport-nfc-chip/). Por isso, o ecrã de cada cartão tem uma secção chamada **O que qualquer pessoa pode ler**, que lista exatamente o que esta leitura encontrou: o saldo, as viagens com as datas e as estações, um número de cartão, tudo o que o cartão tiver revelado.

Num Suica, podem ser vinte viagens com os nomes das estações. Num Navigo, os seus passes e as últimas viagens. Num Oyster, quase nada. O NFC só funciona a poucos centímetros, por isso ninguém está a ler o seu cartão do outro lado da carruagem, mas mesmo assim vale a pena saber que tipo de cartão traz no bolso.

Enquanto tudo isto acontece, nada sai do seu iPhone. A leitura passa-se entre o cartão e o telemóvel, e é só isso.

---

## O seu cartão ao longo do tempo

Cada cartão que lê fica guardado na sua lista de leituras, com um pequeno resumo como "Suica • ¥1,234" para o voltar a encontrar. Abra-o mais tarde e vê o cartão tal como estava, mais **Desde a última leitura**, que mostra quanto o saldo mudou desde a vez anterior em que leu esse mesmo cartão. Dá jeito se alguma vez se perguntou para onde foi o último carregamento.

---

## Como consultar o saldo do cartão no iPhone

1. Abra a [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-pt&mt=8) e toque em **Ler NFC**.
2. Encoste o cartão, bem plano, à parte de cima do iPhone e mantenha-o imóvel até o painel indicar **Cartão lido**.
3. O cartão abre no seu próprio ecrã, com o saldo no topo e os detalhes por baixo.

Não precisa de escolher primeiro o tipo de cartão. A app descobre sozinha que cartão é.

---

## O seu cartão não está na lista? Envie-mo

Aqui preciso da sua ajuda. Quando a NFC.cool reconhece um chip mas não o consegue ler por completo, o ecrã do cartão mostra **Ajuda-nos a ler este cartão**. Quando leu um saldo e algo não parece bater certo, a mesma secção chama-se **Algo não está bem?**

Toque em **Enviar detalhes da leitura**, escreva o nome e o país do cartão e, se houver saldo, diga-me se está certo. Antes de enviar seja o que for, toque em **Ver os dados** para ver exatamente o que vai ser enviado: o que o cartão respondeu durante a leitura, o tipo de chip, o seu dispositivo e a versão da app, e o seu país. O seu nome e qualquer conta ficam de fora, e o número de série do cartão e qualquer número de cartão que a app reconheça aparecem mascarados. Um cartão que a app ainda não conhece pode conter dados que ela não consegue identificar, e é exatamente por isso que pode ver tudo primeiro. Se o envio não funcionar, pode mandar-mo por email.

Cada relatório é um cartão que eu não tenho, muitas vezes de uma cidade onde nunca estive, e é assim que os próximos cartões passam a ser suportados. Por isso, se alguma vez me escreveu a dizer que a NFC.cool não lê o seu cartão: [atualize a app](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-pt&mt=8) e experimente outra vez. E, se continuar sem o ler, tem agora um botão que me envia exatamente aquilo de que preciso para o resolver.

[Descarregar a NFC.cool Tools para iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-pt&mt=8) · [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-check-transit-card-balance-iphone-pt) (em breve)
