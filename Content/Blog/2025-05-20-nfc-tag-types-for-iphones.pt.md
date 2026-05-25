---
id: "nfc-tag-types-2025-05"
title: "Compreender os Diferentes Tipos de Tags NFC - e Quais Funcionam com iPhones"
date: "2025-05-20"
tags: ["nfc-tags", "guides", "iphone"]
summary: "Do Tipo 1 ao Tipo 5, quem os fabrica e porque é que a série NTAG (Tipo 2) é a aposta mais segura para projetos com iPhone."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/nfc-tag-types.webp"
imageAlt: "Tipos de tags NFC alinhados ao lado de um iPhone"
---

As tags NFC são pequenos circuitos integrados que armazenam informação que qualquer dispositivo com NFC, como o seu telemóvel, consegue ler. Mas há uma coisa que gostava que alguém me tivesse dito mais cedo: nem todas as tags NFC são iguais. Existe todo um zoo de tipos de diferentes fabricantes, cada um com as suas particularidades, e isso torna a escolha do tipo certo para o seu iPhone surpreendentemente complicada.

Passei anos a desenvolver o NFC.cool, uma app para ler e gravar tags NFC, e "que tag devo comprar para o meu iPhone?" é facilmente uma das perguntas que mais recebo. Por isso, esta é a resposta que dou. Vou percorrer os cinco tipos de tags NFC, quem os fabrica de facto, e porque é que um deles é a aposta segura para quase qualquer projeto com iPhone. Se for completamente novo nisto, talvez queira começar pelo meu [guia completo para principiantes sobre tags NFC](/blog/nfc-tags-beginners-guide/) primeiro - este artigo aprofunda mais uma camada.

---

## Compreender os tipos de tags NFC

As tags NFC dividem-se em cinco tipos: Tipo 1, Tipo 2, Tipo 3, Tipo 4 e Tipo 5. Essa classificação não é algo inventado pelos fabricantes - vem do NFC Forum, o consórcio da indústria que define as normas. Cada tipo tem a sua própria capacidade de memória e velocidade, e pode ser de leitura e escrita ou apenas de leitura.

É essa a lente que uso sempre que olho para a ficha técnica de uma tag, por isso deixe-me percorrê-los um a um.

---

## Tipo 1 e 2 - Topaz e MIFARE Ultralight®

O Tipo 1 (Topaz, da Broadcom) e o Tipo 2 (MIFARE Ultralight®, da [NXP Semiconductors](https://nxp.com)) são a ponta barata e simpática do espetro. Adaptam-se bem a aplicações simples como cartazes e cartões de visita. A sua capacidade de memória é pequena (de 48 bytes a cerca de 2 KB), mas, pela minha experiência, isso é mais que suficiente para um URL ou um pequeno texto, que é o que a maioria das pessoas realmente quer.

---

## Tipo 3 - FeliCa™

As tags de Tipo 3, também conhecidas como FeliCa™, foram desenvolvidas pela Sony. Vai vê-las sobretudo na Ásia, a alimentar bilhetes de transportes públicos e dinheiro eletrónico. Oferecem maior velocidade e memória (até 1 MB), mas o seu uso é bastante limitado porque custam mais e estão ligadas a aplicações específicas de cada região. Raramente recorro a elas fora desse contexto.

---

## Tipo 4 - MIFARE DESFire®

As tags MIFARE DESFire®, também da NXP Semiconductors, são de Tipo 4. São a opção de alta segurança e alta capacidade, concebidas para tarefas complexas como controlo de acessos seguro e sistemas de transportes públicos. Conseguem armazenar até 8 KB. Quando um projeto precisa genuinamente de proteção criptográfica, é nesta família que olho - aprofundei o lado da segurança no meu artigo sobre [manter segredos seguros em tags NFC encriptadas](/blog/nfc-safe-encrypted-secrets/).

---

## Tipo 5 - ISO 15693

As tags de Tipo 5 cumprem a norma ISO 15693 e são relativamente recentes no ecossistema NFC. São sobretudo uma história industrial, e a sua característica de destaque é um alcance de leitura alargado em comparação com os outros tipos. Úteis se estiver a controlar inventário num armazém, menos úteis para a tag colada no frigorífico.

---

## Que tags NFC deve escolher para o seu iPhone?

Aqui está a parte que mais importa. Os iPhones a partir do iPhone 7 são compatíveis com NFC de Tipo 1, 2 e 5, mas oferecem o melhor suporte para o Tipo 2. As tags NFC de Tipo 2 são a [série NTAG](https://www.nxp.com/products/wireless-connectivity/nfc-hf/ntag-for-tags-and-labels:NTAG-TAGS-AND-LABELS) da NXP Semiconductors.

Os modelos NTAG213, NTAG215 e NTAG216 são os mais populares dessa série, e funcionam às mil maravilhas com iPhones - é contra eles que faço testes dia após dia. Dão-lhe memória suficiente (de 144 a 888 bytes) para a maioria dos projetos práticos, são totalmente graváveis e legíveis por qualquer iPhone com NFC, e são regraváveis, por isso pode alterar o seu conteúdo as vezes que quiser.

Uma nota prática que me poupou muita frustração: quanto maior a tag e a sua antena, mais fiável é a leitura por um leitor NFC. Eu evitaria os autocolantes extremamente baratos e frágeis se a fiabilidade for importante para o seu projeto - os poucos cêntimos que poupa não compensam uma tag que só lê ao terceiro toque.

O principal que os iPhones fazem com NFC é ler mensagens no formato NFC Data Exchange Format (NDEF) - URLs, texto simples ou vCards (cartões de visita digitais). Qualquer tag que suporte NDEF, e a maioria das tags da série NTAG suporta, é uma escolha sólida para utilizadores de iPhone. Quando estiver pronto para colocar de facto dados numa, escrevi um guia passo a passo sobre [como gravar tags NFC no iPhone](/blog/write-nfc-tags-iphone/).

---

## Resumo

Se anda à procura de tags NFC para usar com o seu iPhone, a minha recomendação honesta é simples: tags de Tipo 2 da série NTAG da NXP Semiconductors. São económicas e dão-lhe a melhor compatibilidade e funcionalidade para o que a maioria das pessoas realmente quer fazer com NFC em iPhones. Compre um pacote de autocolantes NTAG215 e estará preparado para quase tudo.

O NFC continua a evoluir, por isso vale a pena manter um olho atento aos novos desenvolvimentos e às especificações das tags. Para saber mais, veja o meu artigo anterior sobre [aproveitar a magia do NFC em iPhones](/blog/nfc-on-iphones-insider-look/), e se só quiser ver o que já está numa tag, pode [ler tags NFC diretamente no seu navegador](/online-nfc-reader/).

Boas gravações!
