---
id: nfc-blog-011
title: "OpenPrintTag: Como Ler e Gravar Bobinas de Impressão 3D Inteligentes com o Seu Telemóvel"
date: 2026-03-29
tags: ["nfc-tags", "automation"]
summary: "O OpenPrintTag é o padrão aberto para bobinas de filamento inteligentes. Saiba como funciona, que dados armazena e como ler e gravar tags NFC OpenPrintTag usando apenas o seu telemóvel."
image: "/assets/images/Blog/openprinttag-read-write-nfc-spools-phone.webp"
imageAlt: "Bobina de impressora 3D com tag NFC a ser lida por um telemóvel"
metaTitle: "OpenPrintTag: Ler e Gravar Bobinas de Impressão 3D Inteligentes com o Seu Telemóvel"
metaDescription: "Saiba como usar o OpenPrintTag para gerir as bobinas de filamento da sua impressora 3D com NFC. Leia, grave e acompanhe os dados do material a partir do seu iPhone ou Android, sem necessidade de apps proprietárias."
ogTitle: "OpenPrintTag: Bobinas de Impressão 3D Inteligentes com NFC"
ogDescription: "O guia completo para ler e gravar bobinas NFC OpenPrintTag com o seu telemóvel. Funciona com qualquer impressora, qualquer marca de filamento."
---
Se faz impressão 3D, provavelmente já passou por isto: uma prateleira cheia de bobinas meio usadas, sem ideia de quanto filamento resta em cada uma, e aquela bobina sem etiqueta que tanto pode ser PETG como PLA, sem forma de saber sem uma impressão de teste. Eu também já passei por isso, e é o tipo de pequeno aborrecimento recorrente que o NFC é genuinamente bom a resolver.

É isso que o OpenPrintTag faz. É um padrão NFC de código aberto criado pela [Prusa Research](https://www.prusa3d.com) que transforma qualquer tag NFC compatível numa etiqueta inteligente para a sua bobina de filamento. Tipo de material, marca, cor, peso restante: tudo armazenado diretamente na bobina e legível com um toque rápido do seu telemóvel.

Sem cloud. Sem ecossistema proprietário. Sem necessidade de internet. Passei anos a construir o NFC.cool, uma app para ler e gravar tags NFC, e este é exatamente o tipo de padrão que gosto de ver - um que coloca os dados na tag e a deixa funcionar em qualquer lado. Aqui fica como funciona, e como eu leio e gravo bobinas OpenPrintTag com nada mais do que um telemóvel.

---

## O Que É o OpenPrintTag?

O OpenPrintTag é um formato de dados universal e aberto para materiais de impressão 3D. Em vez de cada fabricante inventar o seu próprio sistema de bobina inteligente incompatível - que é precisamente a confusão que vi acontecer noutros cantos do mundo do NFC - o OpenPrintTag define um único padrão que qualquer um pode adotar, incluindo fabricantes de filamento, fabricantes de impressoras, software de fatiamento e apps como a NFC.cool.

Os princípios-chave, e as razões pelas quais acho que vale a pena prestar atenção:

- **Código aberto:** publicado sob licença MIT, livre de implementar, sem taxas de licenciamento
- **Offline por conceção:** todos os dados vivem na própria tag, sem necessidade de serviço na cloud
- **Regravável:** atualize o filamento restante à medida que imprime, reutilize tags em novas bobinas
- **Universal:** funciona entre marcas e ecossistemas
- **Suporta tanto FFF (filamento) como SLA (resina)**

Mais de 22 empresas e grupos manifestaram interesse, incluindo a Prusament, a Voron, a Fillamentum, a 3DXTech, a SimplyPrint e a PrintedSolid. A especificação completa está disponível em [specs.openprinttag.org](https://specs.openprinttag.org).

---

## Que Dados Armazena uma OpenPrintTag?

Esta é a parte que me convenceu. O OpenPrintTag não é apenas uma etiqueta com um nome. É um formato de dados devidamente estruturado, com campos para quase tudo o que iria querer saber sobre uma bobina, e a especificação foi claramente escrita por pessoas que realmente imprimem.

**Identificação do material:**
- Classe do material (filamento ou resina)
- Tipo de material (PLA, PETG, ABS, TPU, ASA, PC, PA6 e mais de 30 outros)
- Nome do material (por exemplo, "PLA Galaxy Black")
- Nome da marca (por exemplo, "Prusament")
- Tags de propriedade do material: mais de 68 propriedades definidas, como abrasivo, condutor, fluorescente no escuro, seguro para alimentos, seguro contra ESD, flexível e mais

**Acompanhamento de peso e comprimento:**
- Peso nominal (anunciado, por exemplo 1000 g)
- Peso real (medido para esta bobina específica)
- Comprimento do filamento (nominal e real, em mm)
- Peso do recipiente vazio (para que possa pesar a bobina e calcular o material restante)
- Peso consumido (atualizado à medida que imprime; este é o campo que torna as bobinas verdadeiramente "inteligentes")

**Cor:**
- Cor primária em formato RGBA
- Até 5 cores secundárias (para filamentos multicor, galaxy ou com gradiente)
- Distância de transmissão (valor de opacidade, útil para projetos [HueForge](https://shop.thehueforge.com/))

**Metadados:**
- Data de fabrico e data de validade
- País de origem
- UUIDs para a marca, o material e a instância específica da bobina
- Definições de proteção contra gravação

A especificação cobre até campos específicos de resina, como `last_stir_time`, que regista quando a resina foi mexida pela última vez antes de imprimir. É o tipo de detalhe que me diz que as pessoas por detrás disto já se chatearam mesmo com resina por mexer.

---

## A Tag: Não É o Seu Autocolante NFC Habitual

Aqui fica um detalhe técnico que sinalizaria antes de comprar seja o que for: **o OpenPrintTag foi concebido para tags ISO 15693 (NFC-V)**, especificamente os chips **NXP ICODE SLIX e ICODE SLIX2**. Estas são tags NFC Forum Type 5 com um alcance de leitura significativamente maior do que as tags NFC-A padrão, até 1,5 metros com um leitor dedicado. Se até hoje só comprou os autocolantes NTAG baratos que a maioria dos projetos usa, esta é uma família de tag diferente - cubro o panorama completo em [tipos de tags NFC para iPhone](/blog/nfc-tag-types-for-iphones/).

Porquê NFC-V? O leitor NFC integrado de uma impressora precisa de detetar a bobina independentemente da sua rotação. O maior alcance do NFC-V torna isto possível sem exigir um alinhamento preciso da tag, o que é uma jogada de conceção inteligente.

**E quanto aos autocolantes NTAG normais?** O formato de dados do OpenPrintTag é baseado em NDEF, por isso uma app de telemóvel como a NFC.cool consegue tecnicamente ler e gravar dados OpenPrintTag em qualquer tag NFC, incluindo NTAG213/215/216. Eu já o fiz - funciona bem para leitura entre telemóveis. No entanto, **o hardware das impressoras e apps como a da Prusa só reconhecem tags NFC-V**. Por isso, se quiser que as suas bobinas etiquetadas funcionem com os leitores integrados das impressoras, use tags ICODE SLIX2. Não cometa o erro que esperaria que a maioria das pessoas cometesse e compre um saco de NTAG213 para isto.

Se estiver a comprar tags em branco, procure especificamente **ICODE SLIX2** ou **ISO 15693**. Pode encontrar tags compatíveis na [Amazon EUA](https://amzn.to/3LTh1fT) ou na [Amazon Europa](https://amzn.to/4oJpQr4) (ligações de afiliado).

---

## Como Ler e Gravar OpenPrintTag com o Seu Telemóvel

Não precisa de uma impressora Prusa nem de qualquer hardware especial para trabalhar com o OpenPrintTag, apenas do seu telemóvel. Esta é a parte que mais quis construir, porque um telemóvel no bolso é o leitor NFC mais acessível que existe.

O NFC.cool Tools suporta o OpenPrintTag nativamente tanto no [iOS](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-openprinttag-read-write-nfc-spools-phone-en&mt=8) como no [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-openprinttag-read-write-nfc-spools-phone-en), e fiz questão de que a funcionalidade fosse completamente gratuita.

**Ler uma tag:**
1. Abra o NFC.cool Tools
2. Encoste o telemóvel à tag NFC na bobina
3. O NFC.cool deteta automaticamente o formato OpenPrintTag
4. Veja os dados estruturados: material, marca, cor, peso, comprimento, propriedades

**Gravar uma tag:**
1. Cole uma tag ICODE SLIX2 em branco na sua bobina
2. Abra o NFC.cool → secção NFC Apps → OpenPrintTag
3. Preencha os detalhes do material: tipo, marca, cor, peso, comprimento
4. Toque para gravar

**Atualizar o material restante:**
Depois de uma impressão, atualize o campo de peso consumido na tag. Da próxima vez que ler, vai saber exatamente quanto filamento resta, sem adivinhar, sem pesar. Esta é a parte que transforma uma bobina inteligente de uma novidade em algo em que eu realmente confiaria.

Se quiser espreitar o que está por baixo do capô, pode usar o Modo Avançado para inspecionar os registos NDEF em bruto - útil quando precisa de depurar uma tag ou verificar a estrutura dos dados. Novo na gravação de tags em geral? Explico as bases em [como gravar tags NFC no iPhone](/blog/write-nfc-tags-iphone/).

---

## Porquê Usar o Seu Telemóvel?

As impressoras Prusa estão a receber leitores NFC integrados, e projetos como o [SpoolSense](https://github.com/SpoolSense) (um leitor ESP32 de código aberto) estão a acrescentar opções de hardware dedicado. Então porquê dar-se ao trabalho com o seu telemóvel? Aqui fica o argumento que eu faria:

- **Funciona com qualquer impressora:** Voron, Bambu Lab, Creality, Ender, o que quer que use
- **Grave tags para qualquer filamento:** o Prusament vem pré-etiquetado, mas pode etiquetar você mesmo Fillamentum, eSUN, Hatchbox ou qualquer marca
- **Faça a gestão do inventário longe da sua impressora:** leia bobinas na sua secretária, no seu armazenamento ou num makerspace
- **Depure tags:** quando uma impressora não consegue ler uma tag, leia-a com o seu telemóvel para ver o que está realmente nela - este é o uso a que mais recorreria
- **Sem hardware extra:** o seu telemóvel já tem um leitor NFC, e é esse o ponto central

---

## Casos de Uso Práticos

**Inventário pessoal:** Etiquete cada bobina da sua coleção. Quando estiver a planear uma impressão, leia as bobinas para verificar o tipo de material, o comprimento restante e a cor sem desembrulhar nada.

**Acompanhamento do filamento restante:** Pese a sua bobina antes e depois de uma impressão, atualize o peso consumido na tag. Acabou-se a ansiedade do "será que esta bobina vai chegar para uma impressão de 14 horas?".

**Uso em makerspace ou em equipa:** Etiquete as bobinas com os detalhes do material para que qualquer pessoa na oficina as possa ler e identificar. Acabou-se o filamento mistério.

**Notas de teste de filamento:** Encontrou a temperatura perfeita para uma bobina específica? Atualize a tag com as suas notas para a próxima vez.

**Materiais multicor e especiais:** O OpenPrintTag suporta até 6 cores por bobina e mais de 68 tags de propriedade. O seu PETG fluorescente no escuro reforçado com fibra de carbono pode finalmente ser devidamente etiquetado, com a indicação de abrasivo e tudo.

---

## O Ecossistema Está a Crescer

O OpenPrintTag ainda é jovem, mas o ímpeto é real:

- A **Prusament** vem com tags NFC OpenPrintTag em cada bobina
- As **impressoras Prusa** estão a adicionar leitores NFC nativos
- **Leitores de hardware de código aberto** como o SpoolSense (baseado em ESP32) estão a surgir da comunidade
- **Mais de 22 empresas** juntaram-se à iniciativa
- O **NFC.cool** é a única app NFC de uso geral com suporte completo de OpenPrintTag tanto no iOS como no Android, e acrescentei-o porque o queria usar eu próprio

Vi a indústria da impressão 3D precisar de um padrão aberto para bobinas inteligentes durante anos, e vi algumas tentativas proprietárias surgir e desaparecer. O OpenPrintTag é a mais credível que já vi: apoiada por um grande fabricante, totalmente de código aberto e já a chegar em produtos reais. Essa combinação é rara o suficiente para que apostasse nela.

---

## Como Começar

**O que precisa:**
- iPhone 7 ou posterior, ou um telemóvel Android com NFC
- NFC.cool Tools ([App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-openprinttag-read-write-nfc-spools-phone-en&mt=8) / [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-openprinttag-read-write-nfc-spools-phone-en)), gratuito, com OpenPrintTag incluído
- Tags NFC ICODE SLIX2 / ISO 15693 em branco ([Amazon EUA](https://amzn.to/3LTh1fT) / [Amazon Europa](https://amzn.to/4oJpQr4), ligações de afiliado)
- Algumas bobinas de filamento para etiquetar

É só isto. Daqui a cinco minutos, a sua primeira bobina pode ser inteligente. Se o NFC em si é novidade para si, o meu [guia para principiantes sobre tags NFC](/blog/nfc-tags-beginners-guide/) é o sítio para onde o encaminharia primeiro, e a [página da funcionalidade de leitor/gravador NFC](/features/nfc-reader-writer/) cobre o que o NFC.cool Tools consegue fazer para além do OpenPrintTag.

*O OpenPrintTag é uma iniciativa de código aberto da Prusa Research. A NFC.cool é uma apoiante independente do padrão. Saiba mais em [openprinttag.org](https://openprinttag.org).*
