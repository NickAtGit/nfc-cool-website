---
id: "nxp-icode-3-2026-10"
title: "ICODE 3, SLIX, ICODE DNA e NTAG 5 passam a funcionar na NFC.cool para iPhone"
date: "2026-10-04"
tags: ["announcements", "nfc-tags", "iphone"]
summary: "A NFC.cool Tools 7.1.0 passa a entender-se com os chips ICODE da NXP: lê, verifica e gere tags ICODE 3, da família SLIX, ICODE DNA e NTAG 5 no iPhone, e também no iPad e no Mac com um leitor externo. Explico o que conseguem fazer estes chips das bibliotecas e das lojas, e a particularidade do iOS que quase me convenceu de que o meu próprio código estava avariado."
image: "/assets/images/Blog/nxp-icode-3-slix-ntag-5.webp"
imageAlt: "Um livro de biblioteca com uma etiqueta RFID no interior da capa, ao lado de um iPhone a mostrar os detalhes de uma tag NFC"
author: "Nicolo Stanciu"
metaTitle: "Tags NXP ICODE 3 e SLIX no iPhone: ler e gerir"
metaDescription: "A NFC.cool já lê e gere tags NXP ICODE 3, SLIX, SLIX2, ICODE DNA e NTAG 5 no iPhone: palavras-passe, contador, indicador antifurto, modo de privacidade e mais."
ogTitle: "ICODE 3, SLIX e NTAG 5 já funcionam no iPhone"
ogDescription: "O que conseguem fazer os chips da NXP usados em bibliotecas e lojas, e como a NFC.cool os lê e gere no iPhone, no iPad e no Mac."
---

Tinha uma tag ICODE 3 em cima da secretária, o iPhone pousado sobre ela e a aplicação a ler alegremente tudo o que o chip tinha para dizer: o ID, a memória, o contador de leituras, a assinatura da NXP a provar que era genuíno. Depois pedi-lhe para mudar uma única coisa, o contador, e a aplicação respondeu-me que a tag se tinha afastado.

Não se tinha afastado. Tentei outra vez. A mesma mensagem. Experimentei antes definir uma palavra-passe. A mesma mensagem.

Já lá vou explicar o que se passava, porque foi o bug mais interessante que persegui este ano. Mas primeiro, porque é que eu andava sequer a mexer numa tag ICODE.

Quero que a NFC.cool seja a aplicação NFC mais completa que se pode ter num telemóvel. Este verão, isso significou o [NTAG 424 DNA](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/), as tags que as marcas usam para provar que um produto é genuíno. Depois disso, a maior família de chips com que a aplicação ainda não se entendia a sério era a ICODE da NXP. Com a **NFC.cool Tools 7.1.0**, isso mudou.

---

## ICODE, as tags que já teve na mão sem dar por isso

Se requisitou um livro numa biblioteca nos últimos vinte anos, é bem provável que já tenha tido uma tag ICODE na mão. É aquela etiqueta plana com uma antena em espiral, colada no interior da capa. Os mesmos chips aparecem nas etiquetas antifurto das lojas, nas etiquetas de lavandaria e nas de produtos.

Tecnicamente, são chips **ISO 15693**, a que o NFC chama **Tipo 5**. Os autocolantes NFC que a maioria das pessoas compra, como o NTAG215, seguem outra norma. Penso nisto como dois telefones ligados à mesma rede: o iPhone consegue ligar para os dois, mas, quando atendem, não falam a mesma língua.

O que leva as bibliotecas e as lojas a escolher ICODE é o alcance. Uma antena grande no pórtico de uma biblioteca ou num posto de autoatendimento consegue ler estas tags a uma distância maior do que a que um autocolante NFC típico permite. Com um telemóvel, continua a ser preciso encostá-las, porque a antena do iPhone é minúscula, mas o chip foi feito para esses pórticos.

Ler o link ou o texto guardado numa tag ICODE nunca foi a parte difícil. O mais interessante está por baixo: palavras-passe, um contador, o indicador antifurto, um modo de privacidade. Até agora, a NFC.cool não tinha acesso a essa parte do chip.

---

## O que a NFC.cool faz com um ICODE 3

O **ICODE 3** é o chip mais recente desta família da NXP e o sucessor do ICODE SLIX2. Encontra-o muitas vezes à venda online como "SLIX 3". A NXP não tem nenhum chip com esse nome, por isso, se um anúncio disser SLIX 3, trata-se de um ICODE 3.

Leia um com a NFC.cool e fica a saber tudo: que chip é, a memória, o contador e se é um chip **NXP genuíno**. A NXP assina o ID de cada chip na fábrica e a aplicação verifica essa assinatura, por isso uma cópia que reutilize o ID não a consegue falsificar.

A partir daí, pode alterar quase tudo o que o chip oferece:

- **Contador de leituras.** O ICODE 3 consegue contar sozinho todas as leituras. Ative o espelho NFC e o chip escreve o seu ID e a contagem atual no link guardado, por isso cada toque abre um URL ligeiramente diferente que um site consegue contar. Se leu sobre o [Contador de Toques NFC](/blog/count-nfc-tag-scans/), é a mesma ideia noutro chip.
- **Palavras-passe.** O ICODE 3 tem seis: uma para a leitura, uma para a escrita, uma para a privacidade, uma para a destruição, uma para as definições antifurto e uma para a configuração. Todas as tags saem da fábrica com os mesmos valores, por isso uma proteção só serve de alguma coisa depois de definir as suas. A NFC.cool guarda as palavras-passe de cada tag no seu Porta-chaves em iCloud.
- **Proteção da memória.** Pode dividir a memória em duas partes e proteger cada uma em separado, por exemplo para deixar um link público legível e esconder os dados guardados a seguir.
- **Definições antifurto e de biblioteca.** O indicador EAS é o que faz apitar o pórtico de uma loja ou de uma biblioteca. O byte AFI é o que as bibliotecas usam para marcar um livro como emprestado. Ambos podem ser alterados e bloqueados.
- **Modo de privacidade.** A tag esconde o ID e os dados até alguém apresentar a palavra-passe de privacidade.
- **Deteção de adulteração** na versão SL2S3003TT, que tem um fio que pode passar por cima da tampa de uma garrafa ou do selo de uma caixa. A aplicação mostra se o selo alguma vez foi quebrado.
- **A sua própria assinatura.** Uma marca pode substituir a assinatura da NXP pela sua e bloqueá-la.
- **Destruição.** Desliga o chip de vez, para proteger a privacidade no fim da vida útil de um produto.

Várias destas definições são permanentes, e algumas podem deixar uma tag inacessível a partir de um iPhone. Por isso, para tudo o que não se pode desfazer, a NFC.cool pede-lhe primeiro que escreva os últimos quatro caracteres do ID da tag. Também se recusa a alterar uma tag que não seja aquela com que começou. Mesmo assim, eu experimentaria primeiro numa tag sobresselente tudo o que fosse novo.

Uma pequena coisa que corrigi pelo caminho: agora pode formatar uma tag ICODE em branco como tag NFC diretamente na aplicação, para que fique pronta a receber um link ou texto.

---

## O resto da família

A aplicação identifica o chip que tem na mão e só lhe oferece aquilo que esse chip consegue realmente fazer. Um SLIX mais antigo mostra-lhe menos opções do que um ICODE 3, simplesmente porque o chip tem menos funcionalidades.

- Os **SLIX, SLIX-S, SLIX-L, SLIX2** e os mais antigos **SLI** são os chips do dia a dia que vai encontrar na maioria das bibliotecas. O SLIX2 tem o contador e a proteção da memória. O SLIX-S protege a memória página a página e suporta palavras-passe de 64 bits, em que cada acesso protegido exige tanto a palavra-passe de leitura como a de escrita.
- O **ICODE DNA** é o irmão dedicado à segurança. Guarda chaves AES secretas que nunca saem do chip. Introduza a chave na NFC.cool e a aplicação desafia o chip a provar que a tem. Uma cópia falha mesmo que o ID e a memória coincidam na perfeição.
- O **NTAG 5** é o que mais me entusiasma, como alguém que gosta de mexer em eletrónica. É um chip NFC feito para ser montado numa placa de circuito. A versão **switch** controla pinos diretamente, e as versões **link** e **boost** comunicam com um microcontrolador por I2C. Conseguem alimentar um pequeno circuito só com o campo do telemóvel, sinalizar eventos num pino e partilhar 256 bytes de memória com a placa. A NFC.cool lê e altera essas definições e, no NTP5332 e no NTA5332, consegue até falar com sensores ligados ao chip, diretamente a partir do iPhone.

Encontra tudo isto nas ferramentas NFC, em **NXP ICODE e NTAG 5**, mesmo ao lado do NTAG 424 DNA. Ou basta ler uma tag ICODE e a aplicação abre os detalhes sozinha.

---

## O bug que o iOS não queria que eu corrigisse

De volta à minha secretária e à tag que "se tinha afastado".

A norma ISO 15693 dá a um telemóvel duas formas de falar com uma tag. Pode escrever o ID da tag em cada mensagem, como quem põe o nome do destinatário num envelope, para que só essa tag responda. Ou pode primeiro **selecionar** a tag, como quem se vira para uma pessoa no meio de uma sala, e só depois começar a falar.

A via do envelope é a mais limpa, por isso a NFC.cool tenta-a primeiro. Para confirmar que funcionava, a aplicação enviou uma mensagem de teste rápida com um ID. A tag respondeu, a aplicação concluiu que as mensagens endereçadas funcionavam e seguiu em frente.

O que eu não sabia era isto. O iOS divide estes comandos em dois grupos: os comandos normalizados, que qualquer chip ISO 15693 entende, e os comandos próprios da NXP, os das palavras-passe, do contador e da configuração. Quando uma mensagem endereçada leva um dos comandos próprios da NXP, o iOS recusa-se a enviá-la. A mensagem nunca chega a sair do telemóvel. Em vez disso, devolve discretamente um erro de "parâmetro inválido", e para o meu código esse erro era exatamente igual a uma tag que tinha saído do alcance.

A minha mensagem de teste usava um comando normalizado, por isso passou sem qualquer problema e disse-me que estava tudo bem. Todas as alterações reais usavam um comando da NXP, por isso todas falhavam.

Depois de perceber o que se passava, a correção acabou por ser tão pequena que quase dá vergonha. O teste usa agora um comando próprio da NXP, inofensivo, que se limita a pedir ao chip um número aleatório. Se o iOS o recusar, a aplicação passa a selecionar a tag. Voltei a pôr o ICODE 3 debaixo do iPhone, toquei em **Definir contador** e o número da tag mudou. Poucas vezes fiquei tão contente por ver um contador mexer.

---

## Onde funciona

No iPhone, tudo isto funciona com o leitor NFC integrado no telemóvel. No iPad e no Mac, que não têm chip NFC, funciona através de um [leitor NFC USB externo](/blog/nfc-reading-ipad-mac/). O leitor tem de passar os comandos ICODE diretamente à tag. Se o seu o fizer, a aplicação lê e gere tags ICODE exatamente como num iPhone, e o bug da secção anterior nem sequer existe aí. Um leitor que não os consiga passar continua a permitir ler a memória da tag.

A aplicação para Android ainda não suporta ICODE.

Se tem na gaveta umas quantas tags iguais às das bibliotecas com que nunca conseguiu fazer grande coisa, ou uma placa NTAG 5 à espera de um projeto, atualize para a versão 7.1.0 e encoste-as ao iPhone. A NFC.cool Tools está na [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nxp-icode-3-slix-ntag-5-pt&mt=8).
