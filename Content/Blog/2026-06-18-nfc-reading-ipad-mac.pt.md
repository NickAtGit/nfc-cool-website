---
id: "nfc-reading-ipad-mac-2026-06"
title: "Como o NFC.cool lê tags NFC no iPad e no Mac"
date: "2026-06-18"
tags: ["announcements", "nfc-tags"]
summary: "Os iPads e os Macs não têm chip NFC, por isso sempre disse que não conseguiam ler tags NFC. Com um leitor USB externo, a versão 6.15.0 muda isso - eis como funciona e de onde veio."
image: "/assets/images/Blog/nfc-ipad-mac-external-reader.webp"
imageAlt: "Um iPad ao lado de um leitor NFC USB HID OMNIKEY com uma tag pousada sobre ele"
author: "Nicolo Stanciu"
metaTitle: "Como o NFC.cool lê tags NFC no iPad e no Mac"
metaDescription: "Os iPads e os Macs não têm rádio NFC, por isso não conseguiam ler tags NFC. No NFC.cool 6.15.0, um leitor USB externo muda isso no iPad e no Mac. Eis como funciona."
ogTitle: "A leitura de tags NFC chega ao iPad e ao Mac"
ogDescription: "Sem chip NFC no seu iPad ou Mac? Com um leitor USB externo, o NFC.cool 6.15.0 também lê e escreve tags aí - além das limitações honestas."
---
No ano passado estive em Bologna para a [PragmaConf 2025](https://pragmaconference.com). Foi a minha primeira vez naquela conferência e, como se veio a verificar, também a última - os organizadores não conseguem mantê-la a funcionar, por isso a edição a que fui foi a derradeira. Continuo um pouco triste com isso.

Enquanto lá estive, comecei a conversar com o [Alexander Manzer](https://www.linkedin.com/in/alexander-manzer), um colega programador de iOS e NFC. A certa altura a conversa derivou para um problema que eu há muito arquivara como "impossível": ler tags NFC num iPad. Os iPads não têm chip NFC, por isso eu sempre disse às pessoas que simplesmente não dava. O Alexander disse-me que dava - com o leitor externo certo - e ofereceu-se para me enviar um pequeno trecho de código para começar. E enviou, uns dias depois. Esse trecho é a razão pela qual o NFC.cool consegue agora ler tags NFC no iPad e no Mac.

---

## Eu disse-vos que isto não ia funcionar

Em maio, [quando o NFC.cool chegou ao Mac](/blog/nfc-cool-comes-to-mac/), escrevi uma secção inteira sobre o que o Mac não consegue fazer e coloquei a leitura NFC logo no topo dela. O meu raciocínio era simples: os Macs não têm rádio NFC, os iPads não têm rádio NFC, e isso é um limite de hardware que nenhuma atualização de software minha consegue corrigir.

Essa parte continua a ser verdade - para o chip integrado no dispositivo. O que me escapou é que não tem de usar o chip integrado. Pode ligar um.

---

## Como funciona sem chip NFC

O truque é um leitor NFC USB externo. Liga-o ao seu iPad ou Mac e o NFC.cool fala diretamente com ele. Não há controladores a instalar: funciona através do suporte para smart cards que a Apple já inclui no iPadOS e no macOS, por isso, no momento em que liga o leitor à porta USB-C, a app deteta-o e passa a usá-lo por sua conta.

A app prefere um leitor externo sempre que houver um ligado. Num iPad ou Mac, esse leitor é o único hardware NFC em jogo, por isso não há nada a decidir. Num iPhone passa a ser uma escolha que a app faz por si: ligue um leitor e o NFC.cool usa-o, deixe-o desligado e o telemóvel recorre ao seu próprio NFC integrado. Não tem de mudar uma definição nem de escolher um modo - a app percebe que hardware tem e age em conformidade.

O leitor em torno do qual construí isto, e o único que testei de facto, é o HID OMNIKEY 5022 CL. Outros leitores USB podem funcionar, mas não o posso prometer, porque só verifiquei a experiência de ponta a ponta com esse. Se experimentar um leitor diferente, quero mesmo saber como correu: [diga-me](/contact/) se funcionou ou onde falhou, e eu incorporo o que aprender de volta na app e neste artigo.

---

## O que pode fazer com ele

Quase tudo o que faria num iPhone. Pode ler tags e extrair toda a sua memória, escrever mensagens NDEF e executar tarefas em lote que leem ou escrevem uma pilha inteira de tags umas a seguir às outras. Proteger tags com palavra-passe funciona. O mesmo acontece com o [OpenPrintTag](/blog/openprinttag-read-write-nfc-spools-phone/), o formato dos rolos de filamento de impressoras 3D, em ambos os sentidos. E sim, a [reposição da cabeça da escova Philips Sonicare](/blog/reset-sonicare-brush-head-nfc/) também corre.

Esta última foi a parte difícil. Repor uma cabeça Sonicare significa ler um contador da tag e depois escrever de volta numa página protegida por palavra-passe, e a tag só aceita essa escrita se ainda o considerar autenticado de um instante antes. Através de um leitor externo, isso implicou manter uma única sessão aberta com o leitor ao longo de ambos os passos, em vez de a deixar fechar pelo meio. Assim que isso se manteve, as operações que dependem disso - escritas protegidas, a reposição da escova - começaram a comportar-se como o fazem num telemóvel.

---

## As limitações honestas

Há algumas coisas que ainda não estão lá, e prefiro dizer-lhe do que deixá-lo descobrir.

- O OMNIKEY 5022 CL é o único leitor que testei. Um diferente coloca-o em território não verificado.
- As tags MIFARE Classic são apenas de leitura através do leitor. Pode lê-las, não escrevê-las.

Nenhuma destas estraga a forma como a maioria das pessoas vai usar isto, mas são reais e são o género de coisa que eu gostaria de saber antes de comprar um leitor.

---

## Obrigado, Alexander

Quero ser claro quanto à origem disto. Não me sentei a inventá-lo - o Alexander deu-me o fio e eu puxei por ele. Não tinha de partilhar aquele código, e estou-lhe grato por o ter feito. Parte da razão por que persegui isto com tanta determinação depois é simples: queria que o NFC.cool fosse a primeira app de iPad capaz de ler de facto uma tag NFC. Quer venha a ser ou não a primeira de todas, chegar lá valeu o trabalho.

A leitura de tags NFC no iPad e no Mac chega no NFC.cool 6.15.0. Se tiver um iPad ou um Mac, um leitor compatível e uma tag que nunca conseguiu ler da sua secretária, vai simplesmente funcionar.

Precisa do leitor? Aqui está o HID OMNIKEY 5022 CL na [Amazon EUA](https://amzn.to/4rq6gCj) e na [Amazon Europa](https://amzn.to/483UyEp). São links de afiliado: se comprar através de um deles, posso receber uma pequena comissão sem custo adicional para si, e ajuda a financiar o trabalho no NFC.cool.

[Descarregue o NFC.cool Tools para iPhone, iPad e Mac](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-reading-ipad-mac-pt&mt=8)

E se esteve naquela última PragmaConf em Bologna: obrigado por uma boa edição. Quem me dera que fosse haver outra.
