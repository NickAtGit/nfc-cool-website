---
id: "ultimate-nfc-tag-guide-2026-09"
title: "O guia definitivo das tags NFC: cada chip, para que serve e o que o lê"
date: "2026-10-26"
tags: ["nfc-tags", "guides"]
summary: "Todos os chips NFC que pode comprar, de um NTAG210 de 48 bytes a um DESFire EV3, com os números reais: memória, proteção, resistência, o que um iPhone e um telemóvel Android conseguem fazer com eles e para que trabalho foram realmente concebidos."
image: "/assets/images/Blog/ultimate-nfc-tag-guide.webp"
imageAlt: "Um iPhone com um ícone NFC luminoso atrás de uma fila de formatos de tags NFC: um autocolante, uma moeda, um cartão de PVC, um porta-chaves, uma pulseira e um inlay transparente"
author: "Nicolo Stanciu"
metaTitle: "O guia definitivo das tags NFC: cada chip explicado"
metaDescription: "Todos os chips NFC num só sítio: NTAG, MIFARE, DESFire, ICODE, ST25, FeliCa, Topaz e os clones. Memória, segurança, resistência, o que os lê e que tag serve para cada trabalho."
ogTitle: "Todos os chips NFC num só guia"
ogDescription: "Memória, segurança, resistência, suporte nos telemóveis e o trabalho honesto de cada chip NFC que pode comprar. Tabelas de especificações, uma tabela de decisão e um catálogo completo."
---

Abre o anúncio de um pacote de tags NFC. Diz "NFC 213", ou "compatível com NTAG215", ou apenas "cartão NFC 1K, funciona com todos os telemóveis". Só quer saber uma coisa: isto serve para o que tenho em mente? E o anúncio não lhe consegue responder, porque quem o escreveu também não sabe.

Passei anos a construir a [NFC.cool Tools](/features/nfc-reader-writer/), uma app cuja primeira tarefa em cada leitura é responder exatamente a essa pergunta: que chip é este e o que consegue fazer? Só o código de identificação reconhece cerca de sessenta produtos de sete fabricantes, e cada um deles entrou nessa lista porque alguém o aproximou de um telemóvel e algo não se comportou como o anúncio prometia. Este guia é a referência que eu gostava que existisse enquanto escrevia esse código. É longo de propósito. Se quiser a versão curta, o [guia para iniciantes sobre tags NFC](/blog/nfc-tags-beginners-guide/) é o sítio por onde começar, e remete para aqui quando precisar de mais profundidade.

A ideia numa frase, para a ter antes das tabelas: **não existe a melhor tag NFC, existe apenas o chip certo para o trabalho**, e o trabalho é decidido por três coisas: quanto precisa de guardar, quem precisa de manter de fora e o que tem de conseguir lê-la.

---

## Como usar este guia

Todos os números deste guia vêm de uma ficha técnica do fabricante, de um documento da Apple ou da Google, ou do código da minha própria app, e as [fontes](#fontes-e-leituras-adicionais) estão listadas no fim. Quando tive um chip em cima da secretária, digo-o numa nota prática. Quando não tive, também o digo: as peças mais exóticas vêm das fichas técnicas, e uma ficha técnica é uma promessa, não uma medição.

Há duas coisas que não vai encontrar aqui: um passo a passo para gravar a sua primeira tag (esse é o [guia de gravação](/blog/write-nfc-tags-iphone/)) e a história completa da NTAG 424 DNA, que tem [o seu próprio artigo](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/).

- [O que é fisicamente uma tag NFC](#o-que-é-fisicamente-uma-tag-nfc)
- [A sopa de letras: normas, tipos do Forum e o que não é NFC](#a-sopa-de-letras-normas-tipos-do-forum-e-o-que-não-é-nfc)
- [Como ler uma ficha técnica ou um anúncio](#como-ler-uma-ficha-técnica-ou-um-anúncio)
- [O NDEF e o que cabe realmente numa tag](#o-ndef-e-o-que-cabe-realmente-numa-tag)
- [Mapas de memória: o que está onde no chip](#mapas-de-memória-o-que-está-onde-no-chip)
- [A tabela de decisão](#a-tabela-de-decisão)
- [Família a família](#família-a-família)
- [Formatos e alcance de leitura](#formatos-e-alcance-de-leitura)
- [O que lê o quê](#o-que-lê-o-quê)
- [O que a NFC.cool Tools faz com cada chip](#o-que-a-nfccool-tools-faz-com-cada-chip)
- [Comprar sem ser enganado](#comprar-sem-ser-enganado)
- [O catálogo completo numa só tabela](#o-catálogo-completo-numa-só-tabela)
- [As comparações que toda a gente pesquisa](#as-comparações-que-toda-a-gente-pesquisa)
- [Perguntas frequentes](#perguntas-frequentes)
- [Glossário](#glossário)
- [Fontes e leituras adicionais](#fontes-e-leituras-adicionais)

---

## O que é fisicamente uma tag NFC

Uma tag NFC são três coisas coladas: um **chip** do tamanho de um grão de areia, uma **antena** que é meia dúzia de espiras de alumínio ou cobre gravado, e um **substrato** que os segura, que pode ser um autocolante de papel, um inlay de PET, um cartão de PVC ou uma cápsula de vidro. O chip não tem bateria. É alimentado pelo telemóvel.

Isto funciona por acoplamento indutivo. A antena do telemóvel é uma bobina que gera um campo magnético que alterna 13,56 milhões de vezes por segundo. Coloque uma segunda bobina nesse campo e é induzida nela uma corrente, tal como num carregador sem fios, só que com uma fração ínfima da potência. O chip da tag vive dessa corrente induzida. Para enviar dados de volta, não transmite nada por si. Liga e desliga uma carga aos terminais da antena, e a bobina do telemóvel sente isso como uma pequena variação no seu próprio campo. Esse truque chama-se **modulação de carga**, e é por isso que o telemóvel faz todo o trabalho e a tag pode custar oito cêntimos.

É também por isso que o alcance é o que é. O campo de uma bobina pequena diminui com o cubo da distância, por isso uma tag que lê perfeitamente a um centímetro não recebe nada a dez. Penso nisto como numa vela: consegue ler à luz dela se estiver perto, e do outro lado da sala não há esforço de vista que lhe valha. A própria definição do NFC Forum fala de "um alcance típico até 2 cm", a documentação do Android diz "4 cm ou menos" e as fichas técnicas da NXP dizem "até 100 mm, consoante a intensidade do campo e a geometria da antena". Os três têm razão. O valor do telemóvel é o que vai ver na prática; os 100 mm são o que o chip consegue fazer com um leitor grande e uma antena grande.

As velocidades de transmissão são modestas porque não é preciso mais. Uma tag de Tipo A ou Tipo B comunica a 106 kbit/s, e os chips mais rápidos negoceiam 212, 424 ou 848 kbit/s depois do primeiro contacto. O FeliCa funciona a 212 ou 424. O ISO 15693, a família de longo alcance, é ainda mais lento, com 26,48 kbit/s no modo normal, porque foi pensado para ser lido a um metro de distância por um pórtico de armazém e não por um telemóvel. Uma cópia completa dos 888 bytes de um NTAG216 demora uma fração de segundo em qualquer dos casos.

| Norma | Velocidade base | Modos mais rápidos | Canal de retorno |
| --- | --- | --- | --- |
| ISO/IEC 14443 Tipo A e B | 106 kbit/s | 212, 424, 848 kbit/s nos chips que os negoceiam (DESFire, Plus, NTAG 424 DNA) | modulação de carga numa subportadora de 847,5 kHz |
| FeliCa (JIS X 6319-4, ISO/IEC 18092) | 212 kbit/s | 424 kbit/s | modulação de carga |
| ISO/IEC 15693 | 26,48 kbit/s (6,62 kbit/s em modo lento) | modo rápido da NXP a 53 kbit/s; ICODE 3 até 212 kbit/s | modulação de carga numa subportadora de 423,75 kHz |

---

## A sopa de letras: normas, tipos do Forum e o que não é NFC

Todos os anúncios misturam três sistemas de nomes: as normas ISO que definem a parte rádio, os tipos de tag do NFC Forum que definem como os dados são organizados, e os nomes comerciais dos fabricantes. Aqui fica o mapa.

### As normas

| Norma | O que define | Nome no NFC Forum | Chips de exemplo |
| --- | --- | --- | --- |
| ISO/IEC 14443 Tipo A (partes 1 a 3) | cartões de proximidade, 106 kbit/s, modulação Tipo A, anticolisão, o UID | NFC-A | NTAG, MIFARE Ultralight, MIFARE Classic, Topaz |
| ISO/IEC 14443 Tipo B | o mesmo, com outra modulação e sem UID no mesmo sentido | NFC-B | ST SRI512, cartões de transporte Calypso, muitos passaportes eletrónicos |
| ISO/IEC 14443-4 | o protocolo de transporte por cima do A ou do B, chamado ISO-DEP | ISO-DEP | DESFire, NTAG 424 DNA, MIFARE Plus em SL3, cartões bancários, passaportes |
| ISO/IEC 7816-4 | a linguagem de comandos (APDUs) e o sistema de ficheiros usados sobre ISO-DEP | | tudo o que está na linha acima |
| ISO/IEC 7816-6 | entre outras coisas, o registo dos códigos de fabricante de chips | | o primeiro byte do UID |
| ISO/IEC 15693 | cartões de vizinhança, até um metro com o leitor certo, UID de 8 bytes | NFC-V | ICODE, ST25TV, ST25DV, TI Tag-it, NTAG 5 |
| JIS X 6319-4 | o FeliCa da Sony | NFC-F | FeliCa Lite-S, Suica, Octopus |
| ISO/IEC 18092 | o próprio NFC (NFCIP-1): peer-to-peer e os modos passivos que os telemóveis usam | | o seu telemóvel |

### Os tipos de tag do NFC Forum

O NFC Forum não desenhou chips. Escreveu cinco receitas para guardar uma mensagem **NDEF** (o formato contentor que todos os telemóveis entendem) em chips que já existiam. É isso que significa "tag de Tipo 2": não é um chip, é uma organização da memória.

| Tipo do Forum | Rádio | Modelo de memória | Chips típicos | Suporte nos telemóveis |
| --- | --- | --- | --- | --- |
| Tipo 1 | NFC-A | blocos de 8 bytes, bloqueáveis uma única vez | Topaz da Innovision/Broadcom | lido nas duas plataformas; o NFC Forum retirou o Tipo 1 da versão de 2021 da sua especificação |
| Tipo 2 | NFC-A | páginas de 4 bytes, um capability container na página 3, blocos TLV | NTAG21x, MIFARE Ultralight, ST25TN, Fudan FM11NT0x1, Infineon my-d move | iPhone e Android, incluindo a leitura em segundo plano do iPhone |
| Tipo 3 | NFC-F | blocos de 16 bytes, códigos de serviço | FeliCa Lite-S, FeliCa Standard | iPhone e Android (no Android, o suporte de NFC-F é obrigatório) |
| Tipo 4 | ISO-DEP sobre NFC-A ou NFC-B | ficheiros selecionados por APDU: um ficheiro CC e um ficheiro NDEF | NTAG 424 DNA, DESFire, ST25TA | iPhone e Android |
| Tipo 5 | NFC-V | blocos de 4 bytes, CC no bloco 0 | ICODE SLIX e SLIX2, ST25TV, ST25DV, NTAG 5 | iPhone desde o iOS 13, Android através de NfcV; acrescentado ao Forum em 2015 |

Há duas coisas que ficaram de fora dessa lista de propósito. A **MIFARE Classic** não é de todo um tipo de tag do Forum; o NDEF na Classic é um mapeamento da NXP que o Android suporta em alguns telemóveis e o iOS não suporta em nenhum. E as receitas do Forum não dizem nada sobre segurança. Uma tag de Tipo 2 pode ser um simples NTAG213 ou um NTAG 224 DNA com autenticação AES-128; uma tag de Tipo 4 pode ser um ST25TA02K sem nada ou um cartão bancário. O tipo diz-lhe como a mensagem NDEF está guardada, não quem lhe consegue chegar.

### O que não é uma tag NFC

Metade das mensagens do género "porque é que o meu telemóvel não lê isto" que recebo são sobre coisas que nunca foram NFC. A bobina NFC de um telemóvel está sintonizada nos 13,56 MHz e fala os protocolos acima. Tudo o resto é invisível para ela, por muito que tenha aspeto de tag.

| Parece uma tag, mas | Frequência | O que é realmente | Um telemóvel consegue lê-la |
| --- | --- | --- | --- |
| um crachá de escritório ou de parque de estacionamento sem chip visível | 125 kHz | RFID de baixa frequência: IDs só de leitura EM4100, HID Prox, regraváveis T5577 | não, e nenhuma app pode mudar isso |
| um microchip de animal de estimação | 134,2 kHz | transponder FDX-B ISO 11784/11785 | não |
| uma etiqueta antirroubo de loja ou de logística | 860 a 960 MHz | RFID UHF RAIN, EPC Gen2 | não |
| uma chave de hotel ou um cartão de transporte antigo | 13,56 MHz | MIFARE Classic ou um cartão HF proprietário | o Android às vezes, o iPhone mostra apenas o UID |
| um cartão bancário | 13,56 MHz | um smart card EMV que fala ISO-DEP | tecnicamente sim; uma app consegue ler a lista de aplicações do cartão e os dados públicos, mas o Core NFC da Apple bloqueia a leitura de cartões de pagamento e nenhum telemóvel consegue produzir uma cópia funcional |
| um passaporte | 13,56 MHz | um documento eletrónico ICAO 9303 | sim, com a zona de leitura ótica como chave; [fui eu que construí isso](/blog/read-passport-nfc-chip/) |
| uma chave de segurança | 13,56 MHz | um autenticador FIDO2 sobre ISO 7816 | sim para o navegador, não como tag |

O crachá de 125 kHz é o que mais custa. Encaixa no leitor da porta, é um cartão de plástico com uma bobina lá dentro e nunca vai falar com um telemóvel. Escrevi sobre [porque é que um iPhone não consegue abrir a porta do seu condomínio](/blog/iphone-rfid-condo-doors/) porque a resposta honesta é uma questão de hardware.

---

## Como ler uma ficha técnica ou um anúncio

A primeira página de uma ficha técnica tem todos os números de que precisa, e um bom anúncio copia-os. Eis o que cada um significa e quais é que mentem.

### Memória de utilizador versus memória total

Todos os chips têm mais EEPROM do que aquela que pode usar. Um NTAG213 tem 180 bytes no total e 144 são seus; os outros 36 guardam o UID, os bits de bloqueio, o capability container e as páginas de configuração. Uma MIFARE Classic 1K tem 1024 bytes e 752 são dados, porque cada setor perde um bloco para as suas chaves. Os anúncios citam o número que for maior. O número que interessa é a **memória de utilizador**, e mesmo essa não é o que cabe numa mensagem NDEF, que é o tema da próxima secção.

### O UID

O identificador único é gravado na fábrica e não pode ser alterado, exceto nos clones feitos precisamente para isso. Existem três comprimentos:

| Comprimento do UID | Onde | Notas |
| --- | --- | --- |
| 4 bytes | MIFARE Classic antigas, cartões Classic baratos de hoje | a NXP chama-lhes "identificadores não únicos" (NUID) porque 4 bytes se esgotaram. Um UID de 4 bytes não tem código de fabricante. Um primeiro byte 08 significa que o chip está a gerar um ID aleatório em cada leitura |
| 7 bytes | NTAG, Ultralight, DESFire, NTAG 424 DNA, Classic EV1 (opcional), o IDm de 8 bytes do FeliCa é um parente próximo | o primeiro byte é o código do fabricante |
| 8 bytes | todos os chips ISO 15693 | o primeiro byte é sempre E0, o segundo é o código do fabricante |

O código do fabricante vem do registo ISO/IEC 7816-6, e é a verificação honesta mais rápida que pode fazer a um anúncio. Se uma tag "NXP genuína" devolve 1D, foi fabricada pela Fudan.

| Código | Fabricante |
| --- | --- |
| 01 | Motorola |
| 02 | STMicroelectronics |
| 03 | Hitachi |
| 04 | NXP Semiconductors |
| 05 | Infineon |
| 07 | Texas Instruments |
| 08 | Fujitsu |
| 16 | EM Microelectronic |
| 1A | Sony |
| 1D | Shanghai Fudan Microelectronics |
| 25 | Innovision (Topaz) |
| 2C | Impinj |
| 2E | Broadcom |

### ATQA, SAK e GET_VERSION: como um leitor distingue os chips

Quando um chip de Tipo A responde a um telemóvel, envia dois pequenos valores, o **ATQA** e o **SAK**. Os leitores, incluindo a minha app, usam o SAK para separar os chips por famílias, porque os bits do SAK dizem se o chip fala ISO-DEP e a que grande família pertence. A própria nota de identificação da NXP diz, a negrito, para não usar o ATQA para nada, porque colide e engana, e eu confirmei que é verdade.

| SAK | Família | ATQA mais comum |
| --- | --- | --- |
| 00 | NTAG e MIFARE Ultralight, todas | 00 44 |
| 08 | MIFARE Classic 1K, MIFARE Plus 2K ou SE no nível de segurança 1 | 00 04 (UID de 4 bytes), 00 44 (7 bytes) |
| 09 | MIFARE Classic Mini | |
| 18 | MIFARE Classic 4K, MIFARE Plus 4K no nível 1 | 00 02 ou 00 42 |
| 10, 11 | MIFARE Plus X no nível 2 | |
| 20 | tudo o que fala ISO-DEP: DESFire, NTAG 424 DNA, Plus no nível 3, cartões bancários, JCOP | 03 44 (DESFire, 424), 03 04 com ID aleatório |

Como todos os NTAG e todas as Ultralight respondem com SAK 00, distinguir um NTAG213 de um NTAG216 ou de uma Ultralight EV1 exige mais um comando: o **GET_VERSION**. Devolve oito bytes, e três deles fazem o trabalho. O byte 2 é o tipo de produto (03 Ultralight, 04 NTAG, 07 NTAG I2C, 01 DESFire, 02 Plus, 08 DESFire Light), o byte 4 é a geração e o byte 6 codifica o tamanho da memória. É assim que a NFC.cool sabe o que tem à frente, e é também a primeira coisa que uma consola que lê Amiibo pergunta a uma tag.

| Chip | Resposta ao GET_VERSION |
| --- | --- |
| NTAG213 | 00 04 04 02 01 00 0F 03 |
| NTAG215 | 00 04 04 02 01 00 11 03 |
| NTAG216 | 00 04 04 02 01 00 13 03 |
| NTAG210 | 00 04 04 01 01 00 0B 03 |
| NTAG212 | 00 04 04 01 01 00 0E 03 |
| Ultralight EV1 48 B | 00 04 03 01 01 00 0B 03 |
| Ultralight EV1 128 B | 00 04 03 01 01 00 0E 03 |
| Ultralight AES | 00 04 03 0x 04 00 0F 03 |
| NTAG 223 DNA | 00 04 04 02 04 00 0F 03 |
| NTAG 424 DNA (dentro de uma APDU) | fabricante 04, tipo 04, versão principal 30, memória 11 |

Há chips sem GET_VERSION: a Ultralight original, a Ultralight C e o antigo NTAG203 nunca o tiveram, e a maioria dos clones também não. Essa ausência é, por si só, uma impressão digital.

### Resistência, retenção, temperatura

Estes três são os números que os anúncios quase nunca indicam e as fichas técnicas indicam sempre.

- **Resistência à escrita** é quantas vezes um byte pode ser regravado. 100.000 ciclos é o mínimo em qualquer chip atual; os chips da era Classic e a Ultralight original estão especificados para 10.000. O DESFire EV3 e a família ST25DV estão especificados para 1.000.000 em valor típico.
- **Retenção de dados** é quanto tempo os bytes sobrevivem sem alimentação. 10 anos é a norma antiga, 50 anos é o que a NXP indica para a NTAG 424 DNA e para a família ICODE SLIX, e a ST indica 200 anos para os chips de Tipo 4 ST25TA. A retenção é especificada à temperatura ambiente; o calor reduz-na.
- **Temperatura de funcionamento** é de -25 a +70 °C na maioria dos chips de consumo da NXP, de -40 a +85 °C nas peças da ST e da EM, e até 105 °C no ICODE 3. Normalmente, o limite não é o chip; é o adesivo e o substrato.

### A escada da segurança

Esta é a parte de um anúncio que mais mente. "Encriptada", "segura", "anticlonagem" aparecem impressos em tags cuja única proteção é uma palavra-passe de 32 bits enviada às claras. Aqui fica a escada, de baixo para cima, e cada chip deste guia está num dos degraus.

| Degrau | O que é | Chips | O que impede |
| --- | --- | --- | --- |
| 0. Nada | qualquer pessoa pode ler e gravar | Ultralight original, NTAG203, TI Tag-it Standard, Topaz | nada |
| 1. Bits de bloqueio | bits irreversíveis que tornam páginas só de leitura para sempre | todos os chips de Tipo 2 e Tipo 5 | a regravação; não impede a cópia |
| 2. Palavra-passe | uma palavra-passe de 32 bits mais uma confirmação de 16 bits (PACK), com um limite opcional de tentativas falhadas; no NTAG21x a palavra-passe viaja pelo ar sem encriptação | NTAG21x, Ultralight EV1, NTAG 223 DNA, família ICODE SLIX (32 bits), ST25TV (32 ou 64 bits), ST25TA (128 bits) | a regravação casual por um desconhecido com uma app; não um atacante determinado com um sniffer |
| 3. CRYPTO1 | a cifra de fluxo de 48 bits da NXP, dos anos 90 | MIFARE Classic, MIFARE Plus no nível 1 | nada desde 2008; trate-a como o degrau 0 |
| 4. Triple DES | autenticação mútua com uma chave de 16 bytes | Ultralight C, FeliCa Lite-S, DESFire D40 e EV1 | copiar o conteúdo sem a chave |
| 5. AES-128 | autenticação mútua, mensagens seguras | Ultralight AES, NTAG 224 DNA, DESFire EV1 a EV3, DESFire Light, Plus no nível 3, ICODE DNA, FeliCa Standard, EM4425 | o mesmo, com uma cifra em que ainda se confia |
| 6. AES mais SUN | cada leitura produz uma prova criptográfica nova no próprio URL | NTAG 424 DNA, NTAG 22x DNA, DESFire EV3 | a clonagem, porque uma cópia não consegue assinar a leitura seguinte |
| 7. Circuito de violação | um fio que regista, para sempre, se alguma vez foi partido | NTAG 213 TT, NTAG 424 DNA TT, NTAG 22x DNA StatusDetect, ICODE 3 TT, ST25TV02KC-T | a reutilização de um selo |

Há duas funcionalidades que ficam ao lado da escada e não num degrau. Uma **assinatura de originalidade** é uma assinatura digital sobre o UID, escrita pelo fabricante, que permite a um leitor confirmar que o chip veio da NXP ou da ST. Não impede a cópia, porque um clone pode levar uma assinatura copiada, e a própria NXP o diz numa nota de aplicação. E os **contadores** (um contador de leituras de 24 bits no NTAG213/215/216, três contadores irreversíveis na Ultralight EV1, um contador de escritas de 16 bits na SLIX2) servem casos de uso, não a segurança, a não ser que entrem numa mensagem SUN.

---

## O NDEF e o que cabe realmente numa tag

O **NDEF** (NFC Data Exchange Format) é o envelope. Um telemóvel não lê "um URL" de uma tag; lê uma mensagem NDEF que contém um registo URI, e o envelope tem peso. Saber quanto pesa é a forma de responder a "o meu link cabe num NTAG213?".

### O registo

Cada registo começa com um byte de flags (início de mensagem, fim de mensagem, registo curto e um formato de nome de tipo de três bits), seguido do comprimento do tipo, do comprimento do payload (um byte se o payload tiver menos de 256 bytes, quatro bytes caso contrário), do próprio tipo e do payload. Um registo URL curto custa, portanto, 4 bytes de cabeçalho antes do primeiro byte do seu link.

| Registo | Tipo | Payload |
| --- | --- | --- |
| URL | tipo well-known `U` | um byte de prefixo mais o resto do URL em UTF-8 |
| Texto | tipo well-known `T` | um byte de estado, um código de idioma (`en`) e depois o texto |
| Smart Poster | tipo well-known `Sp` | uma mensagem NDEF inteira lá dentro: um URL mais títulos opcionais e uma ação |
| Contacto | MIME `text/vcard` | o texto do vCard tal como está |
| Wi-Fi | MIME `application/vnd.wfa.wsc` | atributos do Wi-Fi Simple Configuration: SSID, tipo de autenticação, chave |
| App Android | tipo externo `android.com:pkg` | um nome de pacote; o Android abre essa app ou a respetiva página na Play Store |

O byte de prefixo é o único golpe de génio do registo URI. Em vez de escrever `https://` por extenso, o primeiro byte do payload é um código para um prefixo comum, e o telemóvel volta a pô-lo no sítio.

| Código | Prefixo | Código | Prefixo |
| --- | --- | --- | --- |
| 00 | nenhum | 12 | rtsp:// |
| 01 | http://www. | 13 | urn: |
| 02 | https://www. | 14 | pop: |
| 03 | http:// | 15 | sip: |
| 04 | https:// | 16 | sips: |
| 05 | tel: | 17 | tftp: |
| 06 | mailto: | 18 | btspp:// |
| 07 | ftp://anonymous:anonymous@ | 19 | btl2cap:// |
| 08 | ftp://ftp. | 1A | btgoep:// |
| 09 | ftps:// | 1B | tcpobex:// |
| 0A | sftp:// | 1C | irdaobex:// |
| 0B | smb:// | 1D | file:// |
| 0C | nfs:// | 1E | urn:epc:id: |
| 0D | ftp:// | 1F | urn:epc:tag: |
| 0E | dav:// | 20 | urn:epc:pat: |
| 0F | news: | 21 | urn:epc:raw: |
| 10 | telnet:// | 22 | urn:epc: |
| 11 | imap: | 23 | urn:nfc: |

Assim, `https://nfc.cool/` é guardado como o byte 04 seguido de `nfc.cool/`: nove bytes de payload para um URL de dezassete caracteres. A própria ficha técnica do NTAG 5 da NXP traz o exemplo `D1 01 0C 55 01` seguido de `nxp.com/nfc`, que descodificado dá `http://www.nxp.com/nfc`.

### O envelope à volta do registo

Numa tag de Tipo 2 ou Tipo 5, a mensagem fica dentro de um TLV: um byte que diz "mensagem NDEF" (03), um byte de comprimento (três bytes se a mensagem tiver 255 bytes ou mais), a mensagem e um byte terminador (FE). Numa tag de Tipo 4 não há TLV; o ficheiro NDEF começa com um comprimento de dois bytes. E num NTAG213 ou NTAG212 de fábrica, os primeiros cinco bytes da memória de utilizador já estão ocupados por um Lock Control TLV que a NXP envia pré-gravado e que qualquer aplicação de gravação preserva.

Eis as contas para um único link `https://`, feitas à mão para o chip que a maioria das pessoas compra:

- memória de utilizador do NTAG213: 144 bytes
- menos o Lock Control TLV de fábrica: 139
- menos o enquadramento do TLV NDEF (03, comprimento, FE): 136 bytes para a mensagem
- menos o cabeçalho do registo (flags, comprimento do tipo, comprimento do payload, `U`): 132 bytes de payload
- menos o byte de prefixo: **131 caracteres depois de `https://`**

### O que cabe onde

<div class="table-scroll">

| Tag | Área NDEF | Caracteres de URL depois de https:// | vCard mínimo (132 B, nome, telefone, email, URL) | vCard típico (250 a 500 B) | Registo Wi-Fi (67 a 88 B) |
| --- | --- | --- | --- | --- | --- |
| NTAG210, Ultralight EV1 48 B | 48 | 40 | não | não | não |
| NTAG212 | 128 | 115 | não | não | sim |
| Ultralight EV1 128 B | 128 | 120 | não | não | sim |
| NTAG213, estado de fábrica | 144 | 131 | não, por 9 bytes | não | sim |
| NTAG213, sem o lock TLV | 144 | 136 | não, por 4 bytes | não | sim |
| ST25TN01K | 160 | cerca de 147 | sim, à justa | não | sim |
| NTAG215 | 496 declarados (504 de utilizador) | 483 | sim | sim, a maioria | sim |
| NTAG216 | 872 declarados (888 de utilizador) | 859 | sim | sim | sim |
| ICODE SLIX | 112 (com o CC incluído) | 100 | não | não | sim |
| ICODE SLIX2 | 316 | cerca de 300 | sim | normalmente | sim |
| NTAG 424 DNA | ficheiro NDEF de 256 bytes | 249 | sim | os pequenos | sim |
| DESFire EV3 2K | ficheiro NDEF até 2048 bytes | até 2038 | sim | sim | sim |

</div>

Duas notas de rodapé que costumam apanhar as pessoas. O próprio capability container da NXP no NTAG215 e no NTAG216 declara 496 e 872 bytes, menos do que a memória de utilizador, por isso o `getMaxSize()` do Android indica o número mais pequeno, e está certo. E um vCard com nome, telefone, email e URL tem 132 bytes antes do envelope e 148 depois dele, e é por isso que não cabe bem num NTAG213 e que os fornecedores de cartões de visita usam por defeito o NTAG215 ou o NTAG216. Os valores arredondados que usei no guia para iniciantes (cerca de 130, 480 e 850 caracteres) são estes números com as arestas limadas.

---

## Mapas de memória: o que está onde no chip

Se alguma vez fez uma cópia de uma tag na NFC.cool e ficou a olhar para o hexadecimal, isto é o descodificador.

### Tipo 2: o mapa de páginas do NTAG213

| Página | Bytes | Conteúdo |
| --- | --- | --- |
| 00 | 4 | bytes 0 a 2 do UID e um byte de verificação |
| 01 | 4 | bytes 3 a 6 do UID |
| 02 | 4 | byte de verificação, um byte interno, dois bytes de bloqueio estático para as páginas 3 a 15 |
| 03 | 4 | capability container: E1 10 12 00 (número mágico, versão 1.0, 18 x 8 = 144 bytes, leitura e escrita permitidas) |
| 04 a 27 | 144 | memória de utilizador, onde vivem os TLV |
| 28 | 4 | bytes de bloqueio dinâmico para as páginas 16 em diante |
| 29 | 4 | CFG0: configuração do espelho, a página onde o espelho é colocado, e AUTH0, a primeira página protegida por palavra-passe |
| 2A | 4 | CFG1: byte ACCESS com o bit de proteção de leitura ou escrita, e AUTHLIM, o limite de tentativas falhadas |
| 2B | 4 | PWD, a palavra-passe, só de escrita |
| 2C | 4 | PACK, a confirmação de dois bytes, mais dois bytes reservados |

Um NTAG215 tem a mesma forma, com a memória de utilizador a ir até à página 81 e a configuração de 83 a 86; um NTAG216 vai até E1, com a configuração de E3 a E6. Os bits do capability container são irreversíveis: depois de ativada a flag de só leitura no byte 3, ou de ativado um bit de bloqueio, não há volta a dar, e é exatamente isso que o "bloqueio permanente" da app grava. Uma "formatação" num Tipo 2 grava um TLV NDEF vazio (03 00 FE) na página 4; não põe a memória a zeros, por isso os dados antigos ainda podem ser copiados até serem sobrescritos.

### Tipo 4: o sistema de ficheiros da NTAG 424 DNA

Aqui não há páginas. Uma aplicação ISO 7816 chamada D2760000850101 contém três ficheiros: um capability container de 32 bytes (E103), um ficheiro NDEF de 256 bytes (E104) e um ficheiro proprietário de 128 bytes (E105). Cada ficheiro tem os seus próprios direitos de leitura, escrita e alteração de acesso, cada um associado a uma de cinco chaves AES. O DESFire funciona da mesma maneira, mas deixa-o criar as suas próprias aplicações e ficheiros; os três da NTAG 424 DNA são fixos, e é por isso que a descrevi como [um pequeno cofre trancado com três gavetas](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/).

### Tipo 5: os blocos ISO 15693

Blocos de quatro bytes, numerados a partir de zero, com o capability container no bloco 0 (E1 40 seguido do tamanho) e o TLV NDEF a começar no bloco 1. O UID, o AFI, o DSFID e o estado de bloqueio vivem fora dos blocos endereçáveis e são lidos com um comando separado, GET SYSTEM INFORMATION. Num ICODE SLIX2, o último bloco endereçável, o 79, é o contador de 16 bits; no ICODE 3, o bloco 75 guarda um contador de 24 bits e os blocos 76 em diante são uma área de configuração separada.

### MIFARE Classic: setores, trailers e o diretório

Uma Classic 1K tem 16 setores de 4 blocos de 16 bytes. O último bloco de cada setor é o **sector trailer**: chave A, três bytes de acesso, um byte livre, chave B. O bloco 0 do setor 0 é o bloco do fabricante, com o UID. Para pôr NDEF numa Classic, a NXP definiu um diretório: o setor 0 passa a ser o **MIFARE Application Directory** (MAD), legível com a chave pública A0 A1 A2 A3 A4 A5, e indica que setores guardam NDEF sob o código de aplicação 03 E1. Esses setores usam uma segunda chave pública, D3 F7 D3 F7 D3 F7. Um cartão acabado de sair da fábrica tem todas as chaves a FF FF FF FF FF FF. Quando a NFC.cool no Android formata um cartão Classic, são este diretório e estas chaves que grava, e é por isso que um cartão Classic formatado é lido em alguns telemóveis Android e em nenhum iPhone.

---

## A tabela de decisão

Comece aqui se já sabe qual é o trabalho e quer o chip.

| O trabalho | O chip | Porquê | Suporte na NFC.cool |
| --- | --- | --- | --- |
| um link, uma rede Wi-Fi, um gatilho para um Atalho, um autocolante numa coisa | NTAG213 | 131 caracteres de URL, palavra-passe, contador, oito cêntimos | completo no iPhone, Android, iPad e Mac |
| um cartão de contacto, um link mais longo, qualquer coisa com margem para crescer | NTAG216 | 859 caracteres, as mesmas funcionalidades, o chip com que eu testo | completo |
| Amiibo | NTAG215 | a consola verifica exatamente este chip e os seus 504 bytes | cópia de segurança e restauro nas duas plataformas |
| contar leituras num cartaz, num cartão de visita, numa unidade de demonstração | NTAG213, 215 ou 216 | o contador de leituras em hardware e o espelho ASCII, e os três chips que o Contador de Toques da app suporta | [Contador de Toques](/blog/count-nfc-tag-scans/) nas duas plataformas |
| uma antena minúscula, um anel, um descartável barato | NTAG 210µ ou Ultralight EV1 48 B | 48 bytes, 17 pF para bobinas pequenas, sem palavra-passe | leitura e gravação |
| provar que um produto é genuíno, uma leitura, sem app | NTAG 424 DNA | cada leitura assina-se a si própria com AES-128; uma cópia não consegue | configuração completa, incluindo a verificação da assinatura |
| o mesmo, mas como autocolante barato de Tipo 2 | NTAG 223 DNA | SUN num chip de Tipo 2, 144 bytes | aparece como tag de Tipo 2; a configuração SUN ainda não é suportada |
| um selo que avisa quando foi aberto | NTAG 213 TT, NTAG 424 DNA TT, ST25TV02KC-T | um fio de violação, memorizado para sempre | a 424 TT por completo; as outras são lidas como o chip base |
| inventário ou uma biblioteca à distância de um braço, com um leitor de pórtico | ICODE SLIX2 ou ICODE 3 | o ISO 15693 lê a 1 a 1,5 metros com um leitor adequado, e continua a ler por aproximação num telemóvel | leitura, gravação e formatação nas duas plataformas |
| uma bobina de filamento de impressora 3D que a própria impressora tem de ler | ICODE SLIX2 | a norma [OpenPrintTag](/blog/openprinttag-read-write-nfc-spools-phone/) espera NFC-V | leitura e gravação |
| uma porta, um torniquete, um sistema de transportes | DESFire EV3 ou MIFARE Plus EV2 | AES, gestão de chaves a sério, segurança certificada | identifica e copia o que é público; sem operações com chaves |
| um sensor sem bateria a falar com um microcontrolador | NTAG I2C plus, ST25DV, NTAG 5 | uma interface I2C e recolha de energia no mesmo chip | lido pela sua face NFC |
| qualquer coisa no mundo dos transportes ou do dinheiro eletrónico do Japão | FeliCa | é isso que os leitores falam | leitura; gravação NDEF no Lite-S e no Standard no iPhone |
| uma tag numa superfície metálica | qualquer uma das anteriores num formato para metal | é a camada de ferrite, não o chip, que a faz funcionar | como o chip |
| debaixo da pele | NTAG216 (xNT), NTAG I2C (xSIID), DESFire (xDF) | antenas de vidro pequenas precisam do ponto ideal do telemóvel | como o chip |

O que não está na tabela: a MIFARE Classic. Não há nenhum trabalho em 2026 para o qual eu comprasse um chip Classic, e a secção abaixo explica porquê.

---

## Família a família

Cada família recebe o mesmo tratamento: uma tabela de especificações tirada da ficha técnica, para que serve o chip, o que os telemóveis fazem com ele e uma nota prática quando a tenho.

### NTAG 21x: a família dos autocolantes

É o chip que está em quase todos os autocolantes, moedas e cartões NFC vendidos ao público, e a NXP ainda os lista todos como ativos em 2026, apesar de a ficha técnica não mudar desde 2015.

<div class="table-scroll">

| Chip | Bytes de utilizador / totais | Palavra-passe | Contador | Espelho | Assinatura | Resistência / retenção | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 210µ | 48 / 64 | não | não | não | sim, reprogramável | 100k / 10 anos | ativo |
| NTAG210 | 48 / 80 | 32 bits + PACK, AUTHLIM | não | UID | sim | 100k / 10 anos | ativo |
| NTAG212 | 128 / 164 | sim | não | UID | sim | 100k / 10 anos | ativo |
| NTAG213 | 144 / 180 | sim | contador de leituras de 24 bits | UID e contador | sim | 100k / 10 anos | ativo |
| NTAG215 | 504 / 540 | sim | sim | sim | sim | 100k / 10 anos | ativo |
| NTAG216 | 888 / 924 | sim | sim | sim | sim | 100k / 10 anos | ativo |
| NTAG213F, NTAG216F | 144 ou 888 | sim | sim | sim | sim | 100k / 10 anos | ativo; acrescenta um pino de deteção de campo e um modo de repouso para integração em eletrónica |
| NTAG 213 TT | 144 / 184 | sim | sim | UID, contador e estado de violação | sim | 100k / 10 anos | ativo; acrescenta um fio de violação |
| NTAG203 | 144 / 168 | não, uma área OTP de 32 bits | contador de escritas de 16 bits | não | não | 10k / 5 anos | fim de vida, substituído pelo NTAG213 |

</div>

Todos são NFC Forum Tipo 2, ISO/IEC 14443 Tipo A, UID de 7 bytes, 106 kbit/s, especificados de -25 a +70 °C. O NTAG210 e o NTAG212 têm uma capacidade de entrada de 17 pF para antenas pequenas; o 213, o 215 e o 216 têm 50 pF. A assinatura de originalidade é ECDSA na curva secp128r1, com 32 bytes, lida com o comando READ_SIG; a chave de verificação está numa nota de aplicação da NXP que não é pública, e é por isso que quase nenhuma app de consumo a verifica.

As três funcionalidades que contam na prática são a **palavra-passe** (um PWD de 32 bits, um PACK de 16 bits com que a tag responde, o AUTH0 para dizer onde começa a proteção e o AUTHLIM para inutilizar a tag ao fim de um número escolhido de tentativas erradas), o **contador NFC** (24 bits, incrementado uma vez por sessão de leitura, legível com um comando próprio) e o **espelho ASCII**, que cola o UID e o contador como texto na sua mensagem NDEF, de modo que um URL simples passa a `https://example.com/?u=04A1...&c=000123` em cada leitura. As cabeças de escova Philips Sonicare sobre as quais escrevi usam um NTAG213 com o AUTHLIM a três, e é assim que [uma cabeça de escova se bloqueia a si própria](/blog/reset-sonicare-brush-head-nfc/) se errar a palavra-passe.

> **Na prática:** são estes os chips com que testo cada versão, e o NTAG216 é o que recomendo quando alguém quer comprar um pacote e não pensar mais no assunto. Vale a pena definir a palavra-passe em tudo o que deixar em sítios públicos; trava a pessoa com uma app gratuita, que é a maioria das pessoas. Não trava ninguém que tenha um sniffer, porque a própria palavra-passe viaja pelo ar sem encriptação, e digo-o claramente na app.

Nos telemóveis: leitura e gravação NDEF em tudo, leitura em segundo plano de registos URL no iPhone e acesso direto nas duas plataformas à palavra-passe, ao contador e ao espelho. A NFC.cool faz tudo isso no iPhone, no Android e, através de um leitor USB, no iPad e no Mac.

### NTAG DNA: as que assinam cada leitura

Três gerações, duas delas ainda em produção.

<div class="table-scroll">

| Chip | Tipo do Forum | Bytes de utilizador | Chaves | SUN | Assinatura | Resistência / retenção | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 413 DNA | Tipo 4 | 160 (32 CC + 128 NDEF) | 3 AES-128 | sim, contador de 24 bits | ECC | 200k / 50 anos | já não é fabricado |
| NTAG 424 DNA | Tipo 4 | 416 (32 + 256 + 128) | 5 AES-128, opção LRP, opção Random ID | sim, com opção de UID encriptado | ECDSA secp224r1, 56 bytes, mais chaves AES de originalidade | 200k / 50 anos | ativo; Common Criteria EAL4 |
| NTAG 424 DNA TT | Tipo 4 | 416 | 5 AES-128 | sim, mais o estado de violação na mensagem | igual | 200k / 50 anos | ativo |
| NTAG 223 DNA | Tipo 2 | 144 / 240 | uma chave SUN de 16 bytes mais uma palavra-passe de 32 bits | sim, contador de 24 bits | ECDSA secp192r1, 48 bytes | 100k / 10 anos | ativo desde fevereiro de 2022 |
| NTAG 224 DNA | Tipo 2 | 208 / 304 | a autenticação mútua AES-128 substitui a palavra-passe | sim | igual | 100k / 10 anos | ativo |
| NTAG 223 e 224 DNA StatusDetect | Tipo 2 | como acima | como acima | sim, com o estado do sensor na mensagem | igual | 100k / 10 anos | ativo |

</div>

O **SUN**, Secure Unique NFC, é a funcionalidade que faz estas tags valerem o triplo do preço de um NTAG213: a tag espelha o seu UID e o contador de leituras no URL e acrescenta um CMAC AES-128 calculado sobre eles, gerado de novo a cada leitura. O servidor verifica o MAC; uma tag clonada não tem a chave e falha. Expliquei tudo isto, incluindo o modo LRP e as cinco chaves, no [artigo sobre a NTAG 424 DNA](/blog/ntag-424-dna-counterfeit-proof-nfc-tags/), por isso aqui fica só o que mudou desde então: a NXP vende agora também a NTAG 426Q DNA e a NTAG X DNA, um chip de Tipo 4 conectado de 16 kB certificado EAL6+, por isso a 424 já não é o chip DNA mais recente, é apenas aquele que consegue realmente comprar em autocolante.

A família 22x DNA é a novidade interessante: SUN num chip de Tipo 2, o que significa que o autocolante é mais barato e que o telemóvel o lê como um NTAG normal. As variantes **StatusDetect** acrescentam um sensor: ou um circuito condutor que regista, de forma irreversível, que foi partido, ou uma medição de capacidade de 0 a 11 pF entre dois pinos, que a NXP apresenta para nível de líquidos, humidade e pressão.

> **Na prática:** comprei as minhas primeiras tags NTAG 424 DNA no AliExpress por uns euros e construí à volta delas todo o conjunto de funcionalidades 424 da app: alteração de chaves, SUN em modo simples e encriptado, direitos de acesso aos ficheiros, o ficheiro cofre, o estado de violação. A 424 é também o único chip em que a NFC.cool verifica a assinatura de originalidade com a chave pública publicada pela NXP e mostra "Genuine NXP". A 22x DNA só a conheço do papel.

### MIFARE Ultralight: a família dos bilhetes

A Ultralight é a irmã mais velha do NTAG. A mesma interface rádio, as mesmas páginas de 4 bytes, o mesmo SAK e, a partir da EV1, os mesmos comandos. A diferença está na intenção: a Ultralight foi feita para bilhetes de viagem única e a linha NTAG para autocolantes com um URL, e é por isso que o NTAG sai de fábrica com um capability container pré-gravado e a Ultralight não.

<div class="table-scroll">

| Chip | Bytes de utilizador / totais | Proteção | Contador | Assinatura | Resistência / retenção | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| MIFARE Ultralight (MF0ICU1) | 48 / 64 | bits de bloqueio e uma área OTP de 32 bits | não | não | 10k / 5 anos | já não é fabricada |
| Ultralight C | 144 / 192 | autenticação mútua triple DES, chave de 16 bytes | 16 bits, irreversível | não | 100k / 10 anos | não recomendada para novos projetos, substituída pela Ultralight AES |
| Ultralight EV1 | 48 / 80 ou 128 / 164 | palavra-passe de 32 bits, AUTHLIM | três contadores irreversíveis independentes de 24 bits | sim, 32 bytes | 100k / 10 anos | ativa |
| Ultralight AES | 144 / 240 | autenticação mútua AES-128, mensagens com CMAC, opção Random ID | três contadores de 24 bits | sim, mais uma chave AES de originalidade | 100k / 10 anos | ativa desde fevereiro de 2022, Common Criteria EAL3+ |
| Ultralight Nano | 40 / 56 | bits de bloqueio e OTP | não | sim | 100k / 10 anos | desapareceu do catálogo da NXP sem nenhum aviso que eu tenha encontrado |

</div>

Os três contadores irreversíveis da Ultralight EV1 são o que a distingue: um operador de transportes vai descontando viagens e o chip recusa-se a voltar a subir. A Ultralight AES é a resposta discreta a "quero um NTAG213 com autenticação a sério": os mesmos 144 bytes, AES-128 em vez de uma palavra-passe, numa tag de Tipo 2 que qualquer telemóvel lê.

Nos telemóveis: tudo isto é lido como uma tag de Tipo 2. O Core NFC da Apple expõe uma família `.ultralight` e deixa uma app enviar comandos nativos; o Android tem uma classe `MifareUltralight` que é opcional, mas que está presente em todos os telemóveis que vi. A NFC.cool identifica as variantes EV1 e a AES através do GET_VERSION e trata a palavra-passe da EV1 como a do NTAG; a autenticação AES propriamente dita não é algo que a app faça.

### MIFARE Classic, Plus e DESFire: a família do controlo de acessos

Três famílias numa só secção porque são uma só história: a Classic foi quebrada, a Plus foi o caminho de migração e o DESFire é onde a indústria acabou por ficar.

A **MIFARE Classic** é o chip da sua antiga chave de hotel, do seu cartão do ginásio e de muitíssimos crachás de escritório. Não é um tipo de tag do NFC Forum. Tem a sua própria cifra, a CRYPTO1, que dois grupos de investigação descobriram por engenharia inversa em 2008: Nohl e Plötz olhando para o silício ao microscópio, e o grupo da Universidade de Radboud observando o protocolo, recuperando uma chave "a partir de apenas uma ou duas tentativas de autenticação com um leitor genuíno, em menos de um segundo". A NXP foi a tribunal para travar o segundo artigo e perdeu. Dezasseis anos depois, em agosto de 2024, a Quarkslab publicou uma backdoor de hardware no Fudan FM11RF08S, o chip compatível com Classic mais comum dos últimos cinco anos, e encontrou uma chave de backdoor mais antiga partilhada por chips Fudan anteriores, alguns chips Infineon e até alguns chips NXP de por volta de 2000. A Classic não é um produto de segurança, e a própria página de produto da NXP para a Classic EV1 diz agora "não recomendada para novos projetos" e remete para o DESFire Light.

<div class="table-scroll">

| Chip | Bytes de utilizador / totais | UID | Proteção | Resistência / retenção | Estado |
| --- | --- | --- | --- | --- | --- |
| Classic Mini | 224 / 320 | 4 bytes | CRYPTO1 | 100k / 10 anos | descontinuada |
| Classic 1K | 752 / 1024 | NUID de 4 bytes | CRYPTO1 | 100k / 10 anos | descontinuada; a EV1 não é recomendada para novos projetos |
| Classic 4K | 3440 / 4096 | NUID de 4 bytes | CRYPTO1 | 100k / 10 anos | descontinuada; a EV1 não é recomendada |
| Classic EV1 1K e 4K | como acima | 7 ou 4 bytes, opção de ID aleatório | CRYPTO1; verificação de originalidade só na 1K | 100k no mínimo / 10 anos | não recomendada para novos projetos |

</div>

A resposta direta para o iPhone, porque me perguntam isto todas as semanas: **um iPhone não consegue ler o conteúdo de um cartão MIFARE Classic, e nenhuma app pode mudar isso.** O Core NFC da Apple não tem nenhuma família Classic na sua API, e a documentação do seu comando MIFARE diz sem rodeios que "não suporta o protocolo Crypto1". O telemóvel vê o UID e o SAK, a minha app identifica a família a partir deles, e mais nada. No Android é diferente: a classe `MifareClassic` é opcional, implementada pelos telemóveis cujo controlador NFC tem CRYPTO1 em hardware (os controladores da NXP têm; os chips da Broadcom numa geração de telemóveis Nexus e Galaxy não tinham), e nesses telemóveis a NFC.cool lê todos os setores que a chave de fábrica abre e consegue formatar um cartão novo para NDEF.

A **MIFARE Plus** é o mapa de memória da Classic com AES-128 aparafusado por cima, para que um operador pudesse trocar primeiro os cartões e só depois os leitores. Funciona por níveis de segurança: o SL1 comporta-se como uma Classic (com AES opcional), o SL3 é só AES sobre ISO-DEP, e a Plus X tinha um SL2 pelo meio. A Plus S e a Plus X estão descontinuadas; a Plus SE (uma 1K, 752 bytes) e a Plus EV2 (2K ou 4K, EAL5+, retenção de 25 anos, resistência típica de 1.000.000 de ciclos) são atuais. Em SL1, um telemóvel vê SAK 08 ou 18, tal como numa Classic; em SL3, vê um cartão ISO-DEP.

O **MIFARE DESFire** é outro bicho: um pequeno sistema de ficheiros com aplicações, ficheiros, direitos de acesso por ficheiro e até 14 chaves por aplicação, que fala APDUs sobre ISO-DEP a até 848 kbit/s.

<div class="table-scroll">

| Chip | Memória utilizável | Criptografia | Extras | Resistência / retenção | Estado |
| --- | --- | --- | --- | --- | --- |
| DESFire D40 | 4 kB | DES, triple DES | | 100k / 10 anos | retirado em 2011; as suas chaves foram recuperadas por análise de consumo nesse mesmo ano |
| DESFire EV1 | 2304, 4864 ou 7936 bytes | DES, 3DES, AES-128 | compatível com NFC Forum Tipo 4, ID aleatório | 200k no mínimo / 10 anos | não recomendado para novos projetos |
| DESFire EV2 | 2560, 5120, 8192 ou 16384 bytes | AES-128, EAL5+ | MAC de transação, verificação de proximidade, assinatura de originalidade | 200k / 25 anos | não recomendado para novos projetos |
| DESFire EV3 | 2560, 5120, 8192 ou 16384 bytes | AES-128, EAL5+ | tudo o que o EV2 tem mais SUN/SDM e um temporizador de transação; certificado NFC Forum Tipo 4 n.º 58652 | 200k no mínimo, 1M típico / 25 anos, -25 a +85 °C | ativo |
| DESFire Light | 640 bytes | só AES-128, opção LRP, EAL4 | uma aplicação fixa com seis ficheiros | 200k / 10 anos | ativo |

</div>

O "2K" no nome de um DESFire não são 2048 bytes de nada que possa usar diretamente. A nota comparativa da NXP dá os valores utilizáveis que estão na tabela, e cada aplicação e cada ficheiro que criar fica com uma fatia para os seus próprios cabeçalhos, atribuída em páginas de 256 bytes. Pergunte ao cartão com o comando FreeMemory em vez de confiar no rótulo. O DESFire EV3 trouxe também o SUN para a família, por isso um EV3 consegue fazer o truque da NTAG 424 DNA de assinar um URL, coisa que o EV2 não consegue.

Nos telemóveis: o iOS entrega o DESFire como uma tag MIFARE `.desfire`, ou como uma tag ISO 7816 se a app pedir a aplicação NDEF; o Android usa `IsoDep`. A NFC.cool identifica a geração e o tamanho a partir do GetVersion e lista as aplicações e os ficheiros que pode ver sem chaves. Não se autentica num DESFire nem grava nele; isso é trabalho para as ferramentas do próprio operador, e prefiro dizê-lo a fingir o contrário.

### ISO 15693: a família de longo alcance

Estes são os chips que foram concebidos para um metro, não para um centímetro. Um telemóvel continua a lê-los (a Apple desde o iOS 13, o Android através de `NfcV`), e a GoToTags mediu tags de Tipo 5 a serem lidas a cerca do dobro da distância das tags de Tipo 2 num iPhone, mas o seu habitat natural é o pórtico da biblioteca, a prateleira do armazém e a lavandaria. O UID tem 8 bytes e começa por E0, os blocos têm 4 bytes, e a família acrescenta três coisas que os chips de Tipo A não têm: um **AFI** (um byte de família de aplicação pelo qual um leitor pode filtrar), um **DSFID** (um byte de formato de dados) e o **EAS**, o bit de vigilância eletrónica de artigos que faz apitar o pórtico de uma loja.

**NXP ICODE.** A linhagem é SLI (2000), SLI-S e SLI-L (2007), SLIX e as suas variantes S e L (2010), SLIX2 (2014), ICODE DNA (2016) e ICODE 3 (2024). Não existe "SLIX3"; um anúncio que diga isso quer dizer ICODE 3 ou está a adivinhar.

<div class="table-scroll">

| Chip | Bytes de utilizador / totais | Proteção | Contador | Assinatura | Resistência / retenção | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| ICODE SLI | 112 / 128 | só bits de bloqueio | não | não | 100k / 10 anos | fim de vida |
| ICODE SLI-S | 160 / 256 | cinco palavras-passe de 32 bits: leitura, escrita, destruição, privacidade, EAS | não | não | 100k / 10 anos | já não é fabricado |
| ICODE SLI-L | 32 / 64 | três palavras-passe | não | não | 100k / 10 anos | já não é fabricado |
| ICODE SLIX | 112 / 128 | uma palavra-passe de 32 bits para EAS e AFI | não | não | 100k / 50 anos | não recomendado para novos projetos |
| ICODE SLIX-S | 160 / 256 | cinco palavras-passe de 32 bits, modo de privacidade, destruição | não | não | 100k / 50 anos | ativo |
| ICODE SLIX-L | 32 / 64 | três palavras-passe | não | não | 100k / 50 anos | ativo |
| ICODE SLIX2 | 316 / 320 | cinco palavras-passe de 32 bits, modo de privacidade, destruição | 16 bits, avançado por um comando de escrita | sim, 32 bytes | 100k / 50 anos | ativo |
| ICODE DNA | 252 / 256 | autenticação mútua AES-128, três chaves | 16 bits | sim, reprogramável | 100k / 50 anos | ativo |
| ICODE 3 | 300 / 304 mais uma área de configuração de 192 bytes | seis palavras-passe de 32 bits, dois modos de privacidade | 24 bits, pode contar leituras como um NTAG | sim, 32 ou 48 bytes, reprogramável | 100k / 50 anos, até 105 °C | ativo; existe uma variante TagTamper |

</div>

O ICODE 3 é o que convém conhecer: espelha o UID e o seu contador de leituras na mensagem NDEF tal como um NTAG213, lê a até 212 kbit/s e afina a própria antena. Não tem AES; a peça com AES é o ICODE DNA, e nenhum dos dois faz SUN.

**STMicroelectronics ST25TV e ST25DV.** A linha de Tipo 5 da ST, e a que tem os melhores números de ficha técnica de todo o guia.

<div class="table-scroll">

| Chip | Bytes de utilizador | Proteção | Contador | Assinatura | Resistência / retenção | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| ST25TV512, ST25TV02K | 64 ou 256 | palavras-passe de 32 ou 64 bits, kill, modo não rastreável, violação na variante -AD | contador de eventos de escrita de 16 bits | TruST25 | 100k / 60 anos | não recomendado para novos projetos |
| ST25TV512C, ST25TV02KC | 64 ou 320 | palavras-passe, kill, modos silencioso e discreto, violação na variante -T | nenhum; em vez disso, um código de leitura único de 3 caracteres | TruST25 | 100k / 60 anos | ativo, disponível até 2035 |
| ST25TV04K-P | 512 | palavras-passe de 64 bits, kill | não | não | 1M / 40 anos | ativo; tem um pino de recolha de energia |
| ST25TV16K, ST25TV64K e as versões KC | 2048 ou 8192 | palavras-passe de 64 bits, kill | não | não | 1M / 40 anos | peças K não recomendadas, peças KC ativas |
| ST25DV04K, 16K, 64K e as versões KC | 512, 2048 ou 8192 | três palavras-passe RF de 64 bits mais uma palavra-passe I2C | não | não | 1M / 40 anos | peças K não recomendadas, peças KC ativas |
| M24LR04E, 16E, 64E | 512, 2048 ou 8192 | palavras-passe de 32 bits | não | não | 1M / 40 anos | não recomendado para novos projetos |

</div>

O **Augmented NDEF** do ST25TV02KC merece um parágrafo, porque é vendido como segurança. O chip insere o seu UID, um campo personalizado e um **código de leitura único** de três caracteres no URL em cada leitura, sem tocar na EEPROM. O código muda a cada leitura, e a ficha técnica da ST diz com todas as letras que é "previsível". É um indicador de frescura que diz ao seu servidor que esta é uma leitura nova, não uma prova de que a tag é genuína. O TruST25, a assinatura de originalidade da ST sobre o UID, é a funcionalidade de autenticidade e, tal como a da NXP, é uma assinatura estática que um clone pode copiar.

**O resto do mundo do Tipo 5.** Os inlays Tag-it HF-I da Texas Instruments (Standard com 32 bytes, Pro com 32 bytes, escrita protegida por palavra-passe e um comando kill, Plus com 256 bytes) estão em todas as bibliotecas que instalaram NFC antes de 2015, e hoje estão todos marcados como não recomendados ou obsoletos. O EM4233 da EM Microelectronic (208 bytes, um modo de privacidade com chave de 96 bits, retenção de 60 anos) está disponível por encomenda. O my-d da Infineon e o MB89R118 da Fujitsu aparecem no código de identificação da NFC.cool porque houve utilizadores que mos enviaram. O NTAG 5 da NXP (link, boost, switch) é um chip ISO 15693 apesar do nome NTAG, com 2048 ou 512 bytes, uma porta I2C, recolha de energia até 30 mW e uma EEPROM de 1.000.000 de ciclos e 40 anos: uma tag conectada para eletrónica, não um autocolante, e o software escrito para o NTAG21x não fala com ela.

> **Na prática:** a SLIX2 é o chip que está dentro de todas as bobinas de filamento OpenPrintTag, por isso já me passaram muitas pelas mãos, e a NFC.cool lê-as, grava-as e formata-as nas duas plataformas. O que a app não faz, e quero ser claro quanto a isso, são os comandos ISO 15693 de palavra-passe, privacidade, EAS e AFI. Os bytes desses comandos estão no código como tabela de referência; os botões ainda não estão lá.

### Tipo 4 fora da MIFARE: ST25TA

A família ST25TA da ST são tags de Tipo 4 sobre ISO/IEC 14443 Tipo A sem nada da maquinaria do DESFire: um ficheiro NDEF, um ficheiro capability container e um ficheiro de sistema, duas palavras-passe de 128 bits (leitura e escrita) e um contador de eventos de 20 bits que pode contar leituras ou escritas.

<div class="table-scroll">

| Chip | Ficheiro NDEF | Palavras-passe | Contador | Assinatura | Resistência / retenção | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| ST25TA512, ST25TA512B | 64 bytes | duas de 128 bits | 20 bits no B | TruST25 no B | 1M / 200 anos | 512 não recomendado |
| ST25TA02K, ST25TA02KB (-P, -D) | 256 bytes | duas de 128 bits | 20 bits | TruST25 no B | 1M / 200 anos | 02K e 02KB não recomendados; 02KB-P e 02KB-D ativos |
| ST25TA16K, ST25TA64K | 2048 ou 8192 bytes | duas de 128 bits | não | não | 1M / 200 anos | ativo |

</div>

Duzentos anos de retenção e um milhão de ciclos de escrita, mas só a 106 kbit/s. As variantes -P e -D têm um pino de saída de uso geral que muda de estado quando a tag é lida, e é assim que se faz um candeeiro reagir a um telemóvel. Nos dois sistemas, são lidas como tags de Tipo 4; a NFC.cool lê e grava NDEF nelas e mostra os detalhes ISO-DEP.

### Chips com sensores e dupla interface

São chips com duas caras: uma antena NFC de um lado e, do outro, um barramento I2C, um sensor ou um segundo rádio.

| Chip | Lado NFC | Outro lado | Memória | A destacar |
| --- | --- | --- | --- | --- |
| NTAG I2C plus (NT3H2111, NT3H2211) | Tipo 2, 888 ou 1912 bytes, palavra-passe de 32 bits, assinatura | I2C até 400 kHz, SRAM de passagem de 64 bytes, pino de deteção de campo | 200k a 500k / 20 anos | recolha de energia até 15 mW; o chip do implante xSIID |
| ST25DV (ver acima) | Tipo 5 | I2C até 1 MHz, uma caixa de correio de 256 bytes para streaming | 1M / 40 anos | recolha de energia no pino V_EH, não regulada, "alguns µW" segundo a ficha técnica |
| NTAG 5 link, boost, switch | Tipo 5, 2048 ou 512 bytes, AES no 5332 | I2C, GPIO, saídas PWM | 1M / 40 anos | recolha de energia até 30 mW; a variante switch não precisa de microcontrolador nenhum |
| NHS3100 | Tipo 2, emulado por firmware | um Cortex-M0+ com um sensor de temperatura com precisão de 0,3 °C | 32 kB de flash, 4 kB de EEPROM | um registador da cadeia de frio numa película, certificado pelo NFC Forum |
| EM4423 "em echo" | Tipo 2, área NDEF de 240 bytes | RFID UHF RAIN, mesma memória, mesmo número de série | 100k / 10 anos | descontinuado |
| EM4425 "em echo-V" | Tipo 5, até 256 bytes partilhados | RFID UHF RAIN, AES-128, contactos de violação, assinatura digital | 100k / 50 anos | atual; um único chip legível por um telemóvel a um centímetro e por um leitor UHF de porta de cais a vários metros |

Não construí nada com estes, por isso esta tabela é só ficha técnica. Interessam ao guia porque aparecem nos anúncios como "chip NFC" e confundem as pessoas: um NTAG 5 não é um NTAG213, e uma tag em echo não vai fazer nada de especial no seu telemóvel.

### Antigos e de nicho

A **Topaz** (Innovision, mais tarde Broadcom) é NFC Forum Tipo 1: blocos de 8 bytes, 96 ou 512 bytes, bloqueios de utilização única, 10.000 ciclos de escrita. Os dois sistemas ainda leem NDEF de uma Topaz, mas o NFC Forum retirou o Tipo 1 do seu conjunto de especificações de 2021 e já ninguém a usa em produtos novos. Os revendedores ainda têm stock.

O **FeliCa** é a família da Sony e o sistema dos transportes públicos do Japão. O FeliCa Lite-S (224 bytes de memória de utilizador em blocos de 16 bytes, um IDm de 8 bytes, um MAC triple DES simplificado) é a versão em tag e é NFC Forum Tipo 3; o FeliCa Standard é a versão smart card, agora com AES e uma certificação Common Criteria EAL6+ no atual RC-SA01, e é nele que funcionam o Suica, o PASMO, o Edy, o WAON, o nanaco e o Octopus de Hong Kong. Os módulos FeliCa Plug da Sony foram descontinuados em março de 2026. A NFC.cool identifica as marcas de transportes e de dinheiro eletrónico a partir do código de sistema nas duas plataformas, lê o Lite-S e o Standard e grava NDEF neles no iPhone.

O **Kovio NFC Barcode** era uma tag de silício impresso, só de leitura, com 16 bytes. O Android ainda tem uma classe `NfcBarcode` para ela. Os ativos da Kovio passaram para a Thinfilm em 2014, a Thinfilm parou a produção NFC em 2019 e mudou de nome em 2021. A classe é um fóssil.

**Chips de memória ISO 14443 Tipo B.** Os SRI512, SRT512 e SRI4K da ST (512 ou 4096 bits em blocos de 32 bits, dois contadores decrescentes, 1.000.000 de ciclos, 40 anos) vivem nos transportes franceses e belgas e em alguns passes de esqui. O Android expõe-nos através de `NfcB`; o iPhone não tem qualquer objeto de tag Tipo B em bruto, por isso, a não ser que um cartão Tipo B fale ISO-DEP e responda a um SELECT, um iPhone não o vê. O Calypso, o sistema Navigo de Paris, é um smart card Tipo B que responde.

### Clones e compatíveis

Esta é a secção que os anúncios não querem que leia.

O **Fudan FM11NT021** é o "NTAG213" mais comum que não é um NTAG213. Tem os mesmos 180 bytes em 45 páginas, a mesma área de utilizador de 144 bytes, uma palavra-passe, um contador de leituras de 24 bits e o código de fabricante 1D da Fudan no UID. Não implementa o GET_VERSION e a sua ficha técnica atual não inclui nenhum comando READ_SIG, por isso um leitor que faça qualquer uma dessas perguntas não recebe resposta e acaba por adivinhar pelo tamanho da memória, e é por isso que a comunidade do Proxmark3 o identifica como um NTAG203. A Fudan também faz versões de 504 e 888 bytes (FM11NT041, FM11NT081). Para um link num autocolante, funcionam. Para Amiibo, não, porque a consola pergunta primeiro o GET_VERSION.

Os **Fudan FM11RF08 e FM11RF08S** são os chips compatíveis com Classic que estão na maioria dos cartões "1K" baratos. O 08S acrescentou em 2020 contramedidas contra os ataques conhecidos à Classic e depois descobriu-se que trazia uma chave de backdoor em hardware comum a todos os cartões fabricados, que a Quarkslab publicou em 2024 juntamente com ferramentas que hoje fazem parte do firmware do Proxmark3.

Os **cartões MIFARE Classic "mágicos"** são chips feitos para que o UID e o bloco do fabricante possam ser regravados, coisa que uma Classic verdadeira nunca permite. As gerações são um passatempo à parte:

| Geração | Como muda o UID | Detetável | Notas |
| --- | --- | --- | --- |
| Gen1a, Gen1b | um comando de despertar de backdoor | sim, qualquer leitor pode sondar a backdoor | o "cartão mágico chinês" original; os sistemas de acesso filtram-no |
| Gen2, CUID | uma escrita normal no bloco 0 depois da autenticação | não há backdoor para sondar; um leitor tem de tentar uma escrita | compatível com telemóveis, o mais comum hoje |
| FUID, UFUID | uma vez, ou até ser selado | antes de ser selado | cartões de uso único para clonar um crachá de forma permanente |
| Gen3, APDU | comandos APDU especiais | um leitor que conheça os comandos | |
| Gen4 GTU, GDM, "Ultimate" | uma configuração protegida por palavra-passe; também pode emular Ultralight e NTAG | só enquanto a palavra-passe for a de origem | um camaleão de UID de 7 bytes e de qualquer família, em formato de cartão |

Também existem cartões NTAG21x mágicos, e os que emulam por completo aceitam até uma assinatura de originalidade copiada, que é precisamente o argumento da NXP sobre as assinaturas estáticas.

**"Compatível com NTAG215" para Amiibo.** Um Amiibo é um NTAG215 normal cujos 540 bytes levam dados encriptados e assinados com chaves derivadas do UID da própria tag. Copie os bytes para outra tag e as assinaturas deixam de bater certo, e é por isso que uma cópia de segurança tem de ser recodificada para o UID da tag de destino, que é exatamente o que faz a [cópia de segurança e restauro de Amiibo](/blog/amiibo-iphone-android-read-collect-backup/) da NFC.cool. A sequência de leitura da consola começa com o GET_VERSION, depois uma autenticação por palavra-passe derivada do UID e depois a leitura das 135 páginas, incluindo as de configuração. Um chip sem GET_VERSION, ou com 45 páginas em vez de 135, falha logo no primeiro passo. A documentação do TagMo resume-o numa linha: só o NTAG215 é reconhecido.

**Como um clone aparece na app.** A NFC.cool identifica primeiro pelo GET_VERSION. Um chip que não lhe responda, ou que responda com um tamanho de memória que não bate certo com o que anuncia, é identificado pelo que realmente é, não pelo anúncio. Numa NTAG 424 DNA, a app vai um passo mais longe e verifica a assinatura de originalidade ECDSA com a chave pública da NXP, e esse é o único sítio na app onde pode aparecer "Genuine NXP" com respaldo criptográfico. No NTAG21x, a app não lê a assinatura, em parte porque a chave de verificação da NXP está sob NDA e em parte porque uma assinatura estática copiada passa na verificação de qualquer maneira. A cadeia de provas honesta para uma tag de Tipo 2 é o código do fabricante, o GET_VERSION, o tamanho da memória e a presença das funcionalidades que o chip diz ter.

---

## Formatos e alcance de leitura

O chip decide o que a tag consegue fazer; o formato decide se o telemóvel lhe consegue chegar.

| Formato | O que é | Antena típica | Alcance de leitura com telemóvel | Especificações e notas |
| --- | --- | --- | --- | --- |
| Inlay húmido | a antena gravada e o chip numa película de PET com adesivo e papel protetor | 22 a 38 mm | 2 a 4 cm | a forma mais barata de comprar um chip; cola-se uma vez |
| Inlay seco | o mesmo sem adesivo | como acima | como acima | para laminar dentro de outra coisa |
| Autocolante de papel ou PET | um inlay com uma face imprimível | 22 a 38 mm | 2 a 4 cm | uma face de papel aceita impressão, uma face de PET resiste à água |
| Cartão de PVC | ISO 7810 ID-1, 85,60 x 53,98 mm, 0,76 mm de espessura | o cartão inteiro | 3 a 5 cm | a maior antena que vai ter na mão; é também o formato para o qual os leitores são desenhados |
| Moeda, token de epóxi | um inlay debaixo de uma cúpula de resina dura, muitas vezes com um furo | 20 a 30 mm | 2 a 3 cm | à prova de água; o formato dos Amiibo |
| Porta-chaves | um inlay num invólucro de ABS | 20 a 30 mm | 2 a 3 cm | um porta-chaves da GoToTags tem certificação IP67 e vai de -25 a +75 °C |
| Pulseira | silicone com um inlay | 20 a 25 mm | 1 a 3 cm | festivais, piscinas; a pulseira dobra, o inlay não deve dobrar |
| Para metal | um inlay com uma folha de ferrite entre a antena e o metal | 22 a 34 mm | 2 a 3 cm em metal | a Seritag mede 21 a 25 mm em metal contra 26 a 30 mm fora dele para a mesma tag de 22 mm; a versão industrial de 34 mm lê a 31 a 40 mm e tem IP68, -25 a +85 °C |
| Etiqueta de lavandaria | um chip num botão de PPS | 16 mm | 1 a 2 cm | a Smartrac especifica a sua etiqueta HF de lavandaria para 200 ciclos de lavagem, -30 a +200 °C e 60 bar; a maioria das etiquetas de lavandaria são ISO 15693 só com UID |
| Implante | um chip numa cápsula de vidro de 2 x 12 mm ou num polímero flexível | poucos milímetros | precisa exatamente do ponto ideal do telemóvel | o xNT é um NTAG216, o NExT acrescenta um T5577 de 125 kHz, o xSIID é um NTAG I2C plus com um LED, o xDF é um DESFire; as versões flexíveis leem muito melhor do que as de vidro |

Duas regras físicas explicam a maioria das queixas de "não lê". **O tamanho da antena define o alcance**, grosso modo: um cartão lê de mais longe do que uma moeda, uma moeda de mais longe do que um inlay de 10 mm, e um implante precisa de contacto. **O metal dessintoniza a antena**: uma bobina numa superfície metálica induz correntes parasitas no metal, a sua indutância desce e a ressonância afasta-se dos 13,56 MHz, por isso uma tag normal num armário de aço está morta. Uma folha de ferrite entre a bobina e o metal redireciona o campo e devolve a vida à tag, à custa de um alcance mais curto e de um custo mais alto, e é por isso que as tags para metal custam o triplo.

Onde segura o telemóvel conta tanto como a tag. No iPhone, a antena está no rebordo superior; a própria instrução da Apple é "segure a parte de cima do iPhone perto" da tag. No Android, varia consoante o modelo, normalmente no centro da traseira ou perto da câmara. O [guia para iniciantes](/blog/nfc-tags-beginners-guide/) explica isto passo a passo.

---

## O que lê o quê

A matriz de telemóveis e leitores. As colunas dos telemóveis vêm da documentação da Apple e da Google e da minha própria app; as colunas de computador e de hobby vêm das fichas de especificações dos fabricantes e da documentação dos próprios projetos, e não testei esses dispositivos eu mesmo, à exceção dos leitores indicados na coluna de iPad e Mac.

<div class="table-scroll sticky-first">

| Família de chips | iPhone em segundo plano | iPhone numa app | Android | iPad e Mac com um leitor USB | Web NFC (Chrome no Android) | ACR122U | ACR1552U, OMNIKEY 5022 | Placa PN532 | Proxmark3 | Flipper Zero |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG21x, Ultralight EV1, outras de Tipo 2 | só registos URL | NDEF, palavra-passe, contador, espelho, cópia | igual | igual, através da NFC.cool | só NDEF | sim | sim | sim | sim, mais emulação | sim, mais emulação |
| NTAG 22x DNA | registos URL | NDEF, comandos diretos | igual | como Tipo 2 | NDEF | sim | sim | sim | sim | lida como NTAG |
| NTAG 424 DNA, ST25TA, DESFire como Tipo 4 | registos URL | NDEF, APDUs | NDEF, APDUs | NDEF, configuração 424 completa | NDEF | sim | sim | sim | sim | lê NDEF; sem operações com chaves |
| Ultralight C | NDEF se formatada | NDEF, comandos nativos | igual | NDEF | NDEF | sim | sim | sim | sim | sim |
| Ultralight AES | NDEF se formatada | NDEF, comandos nativos | igual | NDEF | NDEF | sim | sim | sim | sim | lida como Ultralight |
| MIFARE Classic | não | só UID e família | leitura e gravação completas nos telemóveis cujo controlador tem CRYPTO1 | só leitura NDEF, chaves conhecidas | não | sim, com chaves | sim, com chaves | sim, com chaves | sim, mais recuperação de chaves e emulação | sim, mais recuperação de chaves e emulação |
| MIFARE Plus | não | UID em SL1; ISO-DEP em SL3 | como a Classic em SL1; IsoDep em SL3 | UID | não | sim | sim | sim | sim | não documentado |
| DESFire, nativo | não | família e versão, APDUs | IsoDep | versão | não | sim | sim | sim | sim | só leitura e gravação em ficheiro |
| ISO 15693: ICODE, ST25TV, ST25DV, TI, EM | registos URL | conjunto completo de comandos ISO 15693 desde o iOS 13 | NfcV | não testado | NDEF | não | sim | não | sim, mais emulação | sim, mais emulação |
| FeliCa Lite-S e Standard | registos URL | leitura e gravação, com o código de sistema declarado | NfcF | leitura; gravação em FeliCa através da NFC.cool | NDEF | sim | só UID no OMNIKEY | sim | sim | leitura e emulação do Lite-S |
| Topaz (Tipo 1) | NDEF | NDEF | NDEF | não testado | NDEF | sim | não documentado | sim | sim | não documentado |
| Memória ISO 14443 Tipo B (SRI512) | não | não | NfcB | não testado | não | sim | sim | só leitor | sim | só UID |
| Crachás de 125 kHz, chips de animais, etiquetas UHF | não | não | não | não | não | não | não | não | 125 kHz sim | 125 kHz sim |

</div>

Algumas linhas merecem uma frase.

- **A leitura em segundo plano do iPhone** só dispara com um registo URL NDEF, só quando o telemóvel está desbloqueado e em uso, e não enquanto a câmara, a Carteira, uma sessão de leitura ou o modo de voo estiverem ativos. Nunca lê um chip em bruto. iPhone XS e posteriores.
- **Que iPhones leem tags de todo:** o iPhone 7 e posteriores dentro de uma app, segundo a sessão da WWDC 2019 da Apple. A gravação e os comandos diretos chegaram com o iOS 13.
- **A classe `MifareClassic` do Android é opcional.** Nas palavras da própria Google: "se não estiver implementada, a MifareClassic nunca será enumerada". Depende do controlador, não da versão do Android.
- **O Web NFC** é só NDEF, Chrome 89 e posterior, só Android, e a Apple tem uma posição negativa sobre ele, por isso não vai haver versão para o Safari. É por isso que o [leitor NFC online](/online-nfc-reader/) deste site funciona no Android e diz aos utilizadores de iPhone para usarem a app.
- **O iPad e o Mac não têm rádio NFC.** Desde a NFC.cool 6.15.0, a app fala com um leitor USB CCID através da pilha de smart cards da Apple; o HID OMNIKEY 5022 CL é o que testei, o ACS ACR1552U-M1 e o ACR1255U-J1 foram reportados como funcionais por utilizadores, e [o artigo](/blog/nfc-reading-ipad-mac/) lista os limites. Definir uma palavra-passe NTAG funciona através de um leitor; removê-la exige um comando que o OMNIKEY recusa, por isso essa tarefa fica para o telemóvel.
- **O ACS ACR122U não faz ISO 15693**, e o ACR1252U e o ACR1255U-J1 também não. Na linha da ACS, só o ACR1552U o faz. O OMNIKEY 5022 faz as duas coisas. Convém saber isto antes de comprar um leitor para tags de biblioteca.
- **O Proxmark3 e o Flipper Zero** são as ferramentas que conseguem recuperar chaves MIFARE Classic e emular cartões. É para isso que servem, e o guia menciona-os porque "o que o lê" seria desonesto sem eles.

<div class="table-scroll">

| Leitor | Interface | Tipo A | Tipo B | FeliCa | ISO 15693 | 125 kHz | Classic com chaves | Recuperação de chaves Classic | Emulação | Preço visto em setembro de 2026 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ACS ACR122U | USB, PC/SC | sim | sim | sim | não | não | sim | não | não | cerca de 40 a 50 USD; a ACS descontinuou-o e as contrafações são comuns |
| ACS ACR1252U | USB, PC/SC | sim | sim | sim | não | não | sim | não | modo de emulação de cartão | 97,50 USD |
| ACS ACR1552U | USB, PC/SC | sim | sim | sim | sim | não | sim | não | modo de emulação de cartão | 44,81 USD |
| ACS ACR1255U-J1 | Bluetooth e USB | sim | sim | sim | não | não | sim | não | não | 64,81 USD |
| HID OMNIKEY 5022 CL | USB, PC/SC | sim | sim | só UID | sim | não | sim | não | não | 69,99 EUR |
| Placa PN532 | SPI, I2C, UART | sim | só leitor | sim | não | não | sim | ferramentas no anfitrião | Classic 1K/4K e FeliCa | 24 a 40 USD |
| Proxmark3 RDV4 | USB, opção BLE | sim | sim | sim | sim | sim | sim | sim | sim | 329 a 529 EUR |
| Proxmark3 Easy | USB | sim | sim | sim | sim | sim | sim | parcial | sim | 78 EUR; clones a partir de cerca de 28 GBP |
| Flipper Zero | autónomo, USB-C, BLE | sim | limitado | Lite-S | sim | sim | sim | sim | sim | 169 USD |
| Chameleon Ultra | USB-C, BLE | leitura e emulação | não | não | não | emulação e leitura | sim | sim | sim | 129 EUR |

</div>

---

## O que a NFC.cool Tools faz com cada chip

Este é o momento do artigo em que aparece aquilo que eu construí, e faz sentido que seja aqui, porque cada linha acima termina em "e o que é que a app faz com isto?". A tabela abaixo não é texto de marketing; tirei-a do próprio código-fonte da app enquanto escrevia este guia, e corrigiu duas coisas que, de outra forma, eu teria afirmado.

| Família de chips | iPhone | Android | iPad e Mac com um leitor |
| --- | --- | --- | --- |
| Identificar o produto | cerca de 60 nomes: NTAG203 a 216, NTAG I2C, Ultralight e C, Ultralight EV1 por tamanho, Ultralight AES, Classic Mini, 1K e 4K, Plus 2K e 4K por nível de segurança, DESFire EV1, EV2 e EV3 por tamanho, NTAG 424 DNA e a sua variante TagTamper, ICODE SLI, SLI-S, SLI-L, SLIX, SLIX-S, SLIX-L e SLIX2, TI Tag-it Standard, Pro e Plus, ST25TV, ST25DV e M24LR, Infineon my-d, Fujitsu MB89R118, EM4233 e EM4423, FeliCa Lite e Standard, mais Suica, PASMO, ICOCA, Edy, WAON e nanaco; os cartões EMV e PIV são reconhecidos como tal | cerca de 20 nomes: NTAG203, 213, 215 e 216, NTAG 424 DNA, DESFire, Classic Mini, 1K e 4K, Plus 2K e 4K, JCOP e SmartMX, marcas FeliCa incluindo o Octopus; os chips ISO 15693 são indicados pelo tamanho, não pelo produto | o tipo de cartão a partir da resposta do leitor ao reset (ATR) |
| Ler NDEF | todas as famílias | todas as famílias | Tipo 2, Tipo 4, FeliCa; Classic com as chaves públicas |
| Gravar NDEF, esvaziar uma tag | Tipo 2, Tipo 4, Tipo 5, FeliCa Lite-S e Standard | Tipo 2, Tipo 5, MIFARE Classic com o diretório NDEF, tudo o que o Android consiga formatar | Tipo 2, Tipo 4, FeliCa |
| Pôr a memória toda a zeros | Tipo 5 | Tipo 2, Tipo 5, Classic | como no iPhone |
| Bloqueio permanente | bytes de bloqueio do Tipo 2; NDEF só de leitura em Tipo 4, Tipo 5 e FeliCa; recusado de propósito na NTAG 424 DNA | Tipo 2 | sim |
| Palavra-passe | NTAG213, 215, 216 e 203 | a família Tipo 2 | definir sim; remover depende do leitor |
| Contador de leituras e espelho | NTAG213, 215, 216 | NTAG213, 215, 216 | sim |
| Cópia completa da memória | Tipo 2, ISO 15693, lista de ficheiros DESFire, FeliCa, ficheiros da NTAG 424 DNA | Classic com a chave de fábrica, Ultralight, ISO 15693, FeliCa, qualquer Tipo A | Tipo 2, Tipo 4, FeliCa |
| Conteúdo de MIFARE Classic | não; o Core NFC não tem CRYPTO1 | leitura com a chave de fábrica, formatação e gravação com as chaves conhecidas | só leitura NDEF |
| NTAG 424 DNA | chaves, SUN em modo simples e encriptado, direitos de acesso aos ficheiros, configuração do chip, o ficheiro cofre, UID aleatório, LRP, estado de violação, verificação da assinatura de originalidade | igual | igual |
| Amiibo | cópia de segurança e restauro de NTAG215, recodificada para a tag de destino | igual | sim |
| Palavra-passe, EAS e AFI ISO 15693 | ainda não | ainda não | não |
| Autenticação e gravação em DESFire | não | não | não |
| Comandos diretos | modo APDU para especialistas | um catálogo de comandos | sim |

As duas correções, para que fique registado: eu teria escrito que a app verifica a assinatura de originalidade nas tags NTAG21x, e não verifica; só a 424 tem isso. E teria escrito que os comandos de palavra-passe ISO 15693 já estavam incluídos, quando são uma tabela de referência à espera de uma interface. Ambas estão na lista de tarefas.

---

## Comprar sem ser enganado

O que um anúncio tem de dizer antes de eu comprar:

1. **O nome exato do chip.** "NTAG213" e não "NFC 213"; "ICODE SLIX2" e não "tag ISO 15693"; "MIFARE Classic EV1 1K" e não "cartão 1K". Se o anúncio não indica o chip, o vendedor não sabe ou não quer que saiba.
2. **A memória de utilizador em bytes**, e tem de bater certo com o chip: 144 para um NTAG213, 504 para um 215, 888 para um 216, 316 para uma SLIX2. Um "1K" que afinal é uma MIFARE Classic não vai funcionar num iPhone.
3. **O fabricante**, se o anúncio diz que é NXP ou ST genuíno. O código do fabricante no UID diz-lhe a verdade depois de comprar; o preço diz-lha antes. Ninguém vende autocolantes NTAG216 genuínos a um terço do preço de mercado.
4. **O tamanho da antena e o formato.** Um inlay de 10 mm lê a um centímetro; um de 38 mm, a quatro. Uma tag para metal tem de dizer que é para metal.
5. **Se vem formatada em NDEF.** O NTAG sai de fábrica formatado; a Ultralight EV1 e a maioria dos chips ISO 15693 não, e a NFC.cool formata-os, mas é mais um passo.

Sinais de alarme: "compatível com NTAG215" (não é um NTAG215), "encriptada" em qualquer coisa abaixo do degrau 4 da escada, "funciona com todos os telemóveis" numa MIFARE Classic, e qualquer nome de chip com uma letra que o fabricante nunca usou, como SLIX3.

**Quanto custam as tags.** Preços de catálogo que vi a 9 de setembro de 2026 na Seritag, Shop NFC, GoToTags, NFCW Shop, NFC.CARDS, NFC-Tag-Shop.de, Tagstand e Digi-Key. A maioria das lojas vende no mínimo às dezenas, por isso a coluna "unidade" é o escalão mais pequeno que oferecem. Os preços mudam; leia-os como proporções.

| Tag | Unidade ou escalão mais pequeno | Por 100 | Por 1.000 | Chip sem invólucro |
| --- | --- | --- | --- | --- |
| Autocolante NTAG213 | 0,32 a 0,65 EUR, 0,33 a 0,58 USD | 0,29 a 0,34 EUR | 0,23 a 0,24 EUR, 0,50 USD | 0,14 USD em volume de wafer |
| Autocolante ou cartão NTAG215 | 0,48 a 0,54 USD, 0,64 a 0,67 GBP | 0,35 USD | 0,33 USD | 0,21 USD |
| Autocolante NTAG216 | 0,97 EUR, 0,71 USD | 0,70 EUR, 0,61 USD | 0,56 EUR, 0,56 USD | 0,37 USD |
| Autocolante NTAG 424 DNA | 0,63 EUR, 0,90 USD | 0,62 EUR, 0,77 USD | 0,57 EUR, 0,68 USD | 0,79 USD à unidade, 0,51 por 1.000 |
| Cartão MIFARE Classic 1K | 1,35 a 1,59 EUR às dezenas; 6,69 EUR como cartão avulso no retalho | 1,29 a 1,52 EUR, 1,98 USD | 0,95 a 1,13 EUR, 0,86 USD | |
| Cartão DESFire EV3 | 1,85 a 2,79 EUR | 1,85 a 2,45 EUR | 1,35 a 2,29 EUR | 1,18 USD a 31.000 unidades |
| Etiqueta ICODE SLIX2 | 0,69 EUR | 0,34 a 0,37 EUR | 0,22 a 0,25 EUR | 0,35 USD à unidade, 0,22 por 1.000 |
| Inlay ST25TV02KC | 0,32 a 0,87 USD | 0,30 a 0,79 USD | 0,28 a 0,77 USD | 0,13 USD por bobina |

O padrão é o que seria de esperar: a memória é quase de graça, a criptografia custa mais ou menos o dobro e o formato custa mais do que o chip. Um chip NTAG213 sem invólucro custa catorze cêntimos; o autocolante à volta dele é a maior parte do preço.

Onde comprar: mantenho uma lista das tags e dos leitores que uso de facto na [página de links de afiliados](/affiliate-links/), e as tags 424 que deram origem a todo o conjunto de funcionalidades DNA vieram do AliExpress, por isso não lhe vou dizer que os marketplaces estão fora de questão. Verifique com a app o que lhe chega antes de gravar seja o que for.

---

## O catálogo completo numa só tabela

Uma linha por chip. "Bytes de utilizador" é o que pode gravar; no DESFire, é o valor utilizável indicado pela NXP. As colunas dos telemóveis dizem o que a plataforma consegue fazer, não o que todas as apps fazem; a coluna NFC.cool diz o que a minha faz. Num telemóvel, deslize para o lado; a primeira coluna fica fixa.

<div class="table-scroll sticky-first">

| Chip | Fabricante | Tipo do Forum | Norma | Bytes de utilizador | UID | Proteção | Resistência / retenção | iPhone | Android | NFC.cool | Ideal para |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NTAG 210µ | NXP | 2 | 14443-A | 48 | 7 | bits de bloqueio | 100k / 10 anos | NDEF, direto | NDEF, direto | leitura, gravação | descartáveis minúsculos |
| NTAG210 | NXP | 2 | 14443-A | 48 | 7 | palavra-passe | 100k / 10 anos | NDEF, direto | NDEF, direto | leitura, gravação | antenas pequenas |
| NTAG212 | NXP | 2 | 14443-A | 128 | 7 | palavra-passe | 100k / 10 anos | NDEF, direto | NDEF, direto | leitura, gravação | antenas pequenas com mais espaço |
| NTAG213 | NXP | 2 | 14443-A | 144 | 7 | palavra-passe, contador, espelho | 100k / 10 anos | NDEF, direto | NDEF, direto | tudo | o autocolante por defeito |
| NTAG215 | NXP | 2 | 14443-A | 504 | 7 | palavra-passe, contador, espelho | 100k / 10 anos | NDEF, direto | NDEF, direto | tudo, Amiibo | Amiibo, dados de tamanho médio |
| NTAG216 | NXP | 2 | 14443-A | 888 | 7 | palavra-passe, contador, espelho | 100k / 10 anos | NDEF, direto | NDEF, direto | tudo | contactos, a escolha segura |
| NTAG213F, 216F | NXP | 2 | 14443-A | 144, 888 | 7 | palavra-passe, pino de deteção de campo | 100k / 10 anos | como o 213 | como o 213 | como o 213 | tags integradas em eletrónica |
| NTAG 213 TT | NXP | 2 | 14443-A | 144 | 7 | palavra-passe, fio de violação | 100k / 10 anos | como o 213 | como o 213 | como o 213 | selos |
| NTAG203 | NXP | 2 | 14443-A | 144 | 7 | bloqueio, OTP | 10k / 5 anos | NDEF | NDEF | leitura, gravação, palavra-passe | stock antigo |
| NTAG I2C plus | NXP | 2 | 14443-A | 888, 1912 | 7 | palavra-passe | 200k a 500k / 20 anos | NDEF, direto | NDEF, direto | identifica, leitura, gravação | eletrónica com um MCU |
| NTAG 223, 224 DNA | NXP | 2 | 14443-A | 144, 208 | 7 | palavra-passe ou AES, SUN | 100k / 10 anos | NDEF, direto | NDEF, direto | como Tipo 2 | autenticidade barata |
| NTAG 22x DNA StatusDetect | NXP | 2 | 14443-A | 144, 208 | 7 | como acima, sensor | 100k / 10 anos | NDEF, direto | NDEF, direto | como Tipo 2 | selos e sensores |
| NTAG 413 DNA | NXP | 4 | 14443-4 | 160 | 7 | 3 chaves AES, SUN | 200k / 50 anos | NDEF, APDU | NDEF, APDU | identifica | descontinuado |
| NTAG 424 DNA | NXP | 4 | 14443-4 | 416 | 7 | 5 chaves AES, SUN, LRP | 200k / 50 anos | NDEF, APDU | NDEF, APDU | configuração completa | autenticidade |
| NTAG 424 DNA TT | NXP | 4 | 14443-4 | 416 | 7 | como acima, violação | 200k / 50 anos | NDEF, APDU | NDEF, APDU | configuração completa | selos de autenticidade |
| Ultralight | NXP | 2 | 14443-A | 48 | 7 | bloqueio, OTP | 10k / 5 anos | NDEF | NDEF | leitura, gravação | descontinuada |
| Ultralight C | NXP | 2 | 14443-A | 144 | 7 | 3DES | 100k / 10 anos | NDEF, direto | NDEF, direto | leitura, gravação | bilhetes antigos |
| Ultralight EV1 | NXP | 2 | 14443-A | 48, 128 | 7 | palavra-passe, 3 contadores | 100k / 10 anos | NDEF, direto | NDEF, direto | leitura, gravação, palavra-passe | bilhetes, descartáveis |
| Ultralight AES | NXP | 2 | 14443-A | 144 | 7 | AES-128 | 100k / 10 anos | NDEF, direto | NDEF, direto | leitura, gravação | Tipo 2 com autenticação |
| Ultralight Nano | NXP | 2 | 14443-A | 40 | 7 | bloqueio, OTP | 100k / 10 anos | NDEF | NDEF | leitura, gravação | bilhetes de viagem única |
| Classic Mini | NXP | nenhum | 14443-A | 224 | 4 | CRYPTO1 | 100k / 10 anos | UID | depende do controlador | Android: leitura, formatação | nada |
| Classic 1K, EV1 | NXP | nenhum | 14443-A | 752 | 4 ou 7 | CRYPTO1 | 100k / 10 anos | UID | depende do controlador | Android: leitura, formatação | nada |
| Classic 4K, EV1 | NXP | nenhum | 14443-A | 3440 | 4 ou 7 | CRYPTO1 | 100k / 10 anos | UID | depende do controlador | Android: leitura, formatação | nada |
| Plus SE | NXP | nenhum | 14443-A | 752 | 4 ou 7 | AES em SL3 | 100k / 10 anos | UID | como a Classic | identifica | migração da Classic |
| Plus EV2 | NXP | nenhum | 14443-4 em SL3 | 1520, 3440 | 4 ou 7 | AES-128, EAL5+ | 200k / 25 anos | ISO-DEP | IsoDep | identifica | controlo de acessos |
| DESFire EV1 | NXP | 4 | 14443-4 | 2304 a 7936 | 7 | DES, 3DES, AES | 200k / 10 anos | NDEF, APDU | NDEF, APDU | identifica, lista ficheiros | transportes antigos |
| DESFire EV2 | NXP | 4 | 14443-4 | 2560 a 16384 | 7 | AES, EAL5+ | 200k / 25 anos | NDEF, APDU | NDEF, APDU | identifica, lista ficheiros | controlo de acessos |
| DESFire EV3 | NXP | 4 | 14443-4 | 2560 a 16384 | 7 | AES, SUN, EAL5+ | 200k mín., 1M típ. / 25 anos | NDEF, APDU | NDEF, APDU | identifica, lista ficheiros | controlo de acessos, transportes |
| DESFire Light | NXP | 4 | 14443-4 | 640 | 7 | AES, LRP, EAL4 | 200k / 10 anos | NDEF, APDU | NDEF, APDU | identifica | cartões de aplicação única |
| ICODE SLI | NXP | 5 | 15693 | 112 | 8 | bloqueio | 100k / 10 anos | NDEF, direto | NfcV | leitura, gravação, formatação | fim de vida |
| ICODE SLI-S, SLI-L | NXP | 5 | 15693 | 160, 32 | 8 | palavras-passe | 100k / 10 anos | NDEF, direto | NfcV | leitura, gravação, formatação | já não é fabricado |
| ICODE SLIX | NXP | 5 | 15693 | 112 | 8 | palavra-passe EAS/AFI | 100k / 50 anos | NDEF, direto | NfcV | leitura, gravação, formatação | stock de bibliotecas e logística |
| ICODE SLIX-S, SLIX-L | NXP | 5 | 15693 | 160, 32 | 8 | palavras-passe, privacidade | 100k / 50 anos | NDEF, direto | NfcV | leitura, gravação, formatação | logística |
| ICODE SLIX2 | NXP | 5 | 15693 | 316 | 8 | palavras-passe, privacidade, contador, assinatura | 100k / 50 anos | NDEF, direto | NfcV | leitura, gravação, formatação | inventário, bobinas OpenPrintTag |
| ICODE DNA | NXP | 5 | 15693 | 252 | 8 | AES-128 | 100k / 50 anos | NDEF, direto | NfcV | lido como ISO 15693 | proteção de marca à distância |
| ICODE 3 | NXP | 5 | 15693 | 300 | 8 | palavras-passe, contador de leituras, espelho, assinatura | 100k / 50 anos | NDEF, direto | NfcV | lido como ISO 15693 | o chip de inventário atual |
| NTAG 5 | NXP | 5 | 15693 | 512, 2048 | 8 | palavras-passe, AES no 5332 | 1M / 40 anos | NDEF, direto | NfcV | lido como ISO 15693 | eletrónica conectada |
| ST25TN512, 01K | ST | 2 | 14443-A | 64, 160 | 7 | kill, código de leitura, TruST25 | 100k / 40 anos | NDEF, direto | NDEF, direto | lido como Tipo 2 | a alternativa ao NTAG213 |
| ST25TV512C, 02KC | ST | 5 | 15693 | 64, 320 | 8 | palavras-passe, kill, privacidade, código de leitura, TruST25 | 100k / 60 anos | NDEF, direto | NfcV | identifica ST25TV, leitura, gravação | etiquetas com um URL novo a cada leitura |
| ST25TV16K, 64K | ST | 5 | 15693 | 2048, 8192 | 8 | palavras-passe de 64 bits, kill | 1M / 40 anos | NDEF, direto | NfcV | leitura, gravação | armazenamento Tipo 5 grande |
| ST25DV04K a 64K | ST | 5 | 15693 | 512 a 8192 | 8 | palavras-passe de 64 bits | 1M / 40 anos | NDEF, direto | NfcV | identifica ST25DV, leitura, gravação | tags dinâmicas com um MCU |
| M24LR | ST | nenhum declarado | 15693 | 512 a 8192 | 8 | palavras-passe de 32 bits | 1M / 40 anos | NDEF, direto | NfcV | lido como ST25TV | dupla interface antiga |
| ST25TA02K, 02KB | ST | 4 | 14443-4 | 256 | 7 | palavras-passe de 128 bits, contador, TruST25 no B | 1M / 200 anos | NDEF, APDU | NDEF, APDU | leitura, gravação | Tipo 4 sem DESFire |
| ST25TA16K, 64K | ST | 4 | 14443-4 | 2048, 8192 | 7 | palavras-passe de 128 bits | 1M / 200 anos | NDEF, APDU | NDEF, APDU | leitura, gravação | armazenamento Tipo 4 grande |
| TI Tag-it HF-I Standard, Pro, Plus | TI | nenhum declarado | 15693 | 32, 32, 256 | 8 | bloqueio; o Pro acrescenta escrita com palavra-passe e kill | 100k / 10 anos | NDEF, direto | NfcV | identifica, leitura | bibliotecas antigas |
| EM4233 | EM | nenhum declarado | 15693 | 208 | 8 | chave de 96 bits, privacidade, destruição | ? / 60 anos | NDEF, direto | NfcV | identifica, leitura | por encomenda |
| EM4425 em echo-V | EM | 5 | 15693 mais UHF | até 256 | 8 | AES-128, palavras-passe, violação | 100k / 50 anos | NDEF, direto | NfcV | lido como ISO 15693 | retalho em dupla frequência |
| Infineon my-d move | Infineon | 2 | 14443-A | 128 | 7 | palavra-passe, contador de valor | 100k / 10 anos | NDEF, direto | NDEF, direto | identifica, leitura | bilhética |
| Fudan FM11NT021 | Fudan | 2 | 14443-A | 144 | 7 | palavra-passe, contador | 500k declarados / 10 anos | NDEF, direto | NDEF, direto | lido como Tipo 2 genérico | autocolantes baratos para links |
| Fudan FM11RF08, 08S | Fudan | nenhum | 14443-A | 752 | 4 | CRYPTO1, com backdoor | ? | UID | depende do controlador | como a Classic | nada |
| Topaz 96, 512 | Innovision, Broadcom | 1 | 14443-A | 96, cerca de 480 | 7 | bloqueios de utilização única | 10k / 5 anos | NDEF | NDEF | NDEF | antigo |
| FeliCa Lite-S | Sony | 3 | 18092, JIS X 6319-4 | 224 | 8 (IDm) | MAC 3DES | ? | NDEF, direto | NfcF | leitura, gravação | Japão |
| FeliCa Standard | Sony | 3 | 18092 | 4 kB | 8 | AES, EAL6+ | ? | NDEF, direto | NfcF | leitura, marcas | transportes e dinheiro eletrónico |
| Kovio NFC Barcode | Kovio, Thinfilm | nenhum | proprietário | 16 só de leitura | nenhum | nenhuma | n/d | não | NfcBarcode | não | extinto |
| ST SRI512, SRT512, SRI4K | ST | nenhum | 14443-B | 64, 512 | 8 | contadores, bloqueio | 1M / 40 anos | não | NfcB | não | transportes Tipo B |

</div>

---

## As comparações que toda a gente pesquisa

**NTAG213 vs NTAG215 vs NTAG216.** O mesmo chip em três tamanhos de memória: 144, 504 e 888 bytes, com a mesma palavra-passe, contador, espelho e assinatura. Compre o 213 para um link, o 215 para Amiibo e o 216 para um cartão de contacto ou para não ter de pensar no assunto. A diferença de preço anda pelos trinta cêntimos.

**NTAG213 vs Ultralight EV1.** A mesma interface rádio e os mesmos comandos; o NTAG tem o espelho ASCII e um capability container pré-gravado, a EV1 tem três contadores irreversíveis e existe em 48 ou 128 bytes. Para autocolantes, o NTAG; para bilhetes, a EV1.

**NTAG213 vs ST25TN01K vs Fudan FM11NT021.** Três chips de Tipo 2 entre 144 e 160 bytes. O NTAG tem palavra-passe e contador de leituras e responde ao GET_VERSION; o ST25TN tem mais memória, um comando kill, um código de leitura e TruST25, mas não tem palavra-passe; o Fudan copia as funcionalidades do NTAG, exceto o GET_VERSION e, na sua ficha técnica atual, a assinatura. Para um link simples, qualquer um deles; para um contador ou para Amiibo, o NTAG.

**MIFARE Classic vs DESFire.** Não há competição. A cifra da Classic foi quebrada em 2008 e o seu clone mais comum tinha uma backdoor descoberta em 2024; o DESFire EV3 tem AES, gestão de chaves, certificação EAL5+ e SUN. O único argumento a favor da Classic é que o leitor na parede foi instalado em 2009.

**NTAG 424 DNA vs NTAG213.** A 424 assina cada leitura com AES-128 e guarda 416 bytes em três ficheiros com cinco chaves; o 213 guarda 144 bytes com uma palavra-passe de 32 bits. Se a pergunta é "este produto é verdadeiro?", só a 424 responde. Se a pergunta é "este autocolante abre um link?", o 213 faz isso por um terço do preço.

**NTAG 424 DNA vs NTAG 223 DNA.** Ambas fazem SUN. A 424 é Tipo 4 com cinco chaves, LRP, opção de UID aleatório, um ficheiro cofre e retenção de 50 anos; a 223 é um autocolante de Tipo 2 com uma chave SUN, uma palavra-passe de 32 bits e 10 anos. A 223 é a forma mais barata de pôr um URL assinado numa etiqueta; a 424 é a que tem hoje uma app capaz de a configurar.

**ICODE SLIX2 vs NTAG216 para inventário.** Se o único leitor for um telemóvel, o NTAG216 tem mais memória e o contador. Se houver um pórtico ou um leitor portátil envolvido, a SLIX2 lê a um metro e o NTAG a quatro centímetros, e isso decide a questão.

**FeliCa vs NTAG no Japão.** Um torniquete de transportes japonês fala FeliCa e mais nada; um telemóvel japonês lê os dois. Para uma tag num cartaz em Tóquio, o NTAG serve perfeitamente. Para qualquer coisa que um leitor Suica tenha de aceitar, FeliCa, e esse não é um chip que se programe com uma app de telemóvel.

---

## Perguntas frequentes

### Devo comprar NTAG215 ou NTAG216?

O 216, a não ser que vá gravar Amiibo. Tem 888 bytes contra os 504 do 215, a mesma palavra-passe, contador e espelho, e o mesmo suporte nos telemóveis. O 215 existe em todas as lojas porque as figuras da Nintendo o usam, e se é esse o seu objetivo, é a única escolha.

### Um iPhone consegue ler tags MIFARE Classic?

Consegue ver que está ali uma. O Core NFC lê o UID e o SAK e fica por aí; a API da Apple não tem nenhuma família Classic e a sua documentação diz que o comando MIFARE "não suporta o protocolo Crypto1". Nenhuma app consegue ler um setor num iPhone. Os telemóveis Android com um controlador NFC da NXP conseguem; os telemóveis com alguns outros controladores não, e nesses a classe `MifareClassic` simplesmente não aparece.

### Quantas vezes posso regravar uma tag NFC?

100.000 vezes em qualquer chip atual da NXP ou da ST à temperatura ambiente, e os números das fichas técnicas são mínimos. Um DESFire EV3 ou um ST25DV está especificado para um milhão. O antigo NTAG203, a Ultralight original e a Topaz estavam especificados para 10.000. Ninguém regrava um autocolante dez mil vezes; o número interessa para contadores e para tags que registam dados.

### A que distância funciona uma tag NFC?

Com um telemóvel, até cerca de quatro centímetros para uma antena do tamanho de um cartão e cerca de dois para um autocolante pequeno, no sítio certo do telemóvel. A própria definição do NFC Forum diz "até 2 cm". Uma tag ISO 15693 num leitor de pórtico com uma antena grande funciona a um metro, mas um telemóvel lê-a aos mesmos poucos centímetros que tudo o resto, talvez o dobro de uma tag de Tipo 2.

### As tags NFC caducam ou desgastam-se?

Os dados do chip estão especificados para 10 anos na maioria dos chips de consumo, 50 na NTAG 424 DNA e na família ICODE SLIX, 60 no ST25TV e 200 no ST25TA, sempre à temperatura ambiente. O calor encurta esses valores. Na prática, o adesivo, a face de papel e a antena desistem muito antes da EEPROM.

### É seguro comprar tags NFC baratas em marketplaces?

Seguro, sim; serem o que dizem ser, nem sempre. Um "NTAG213" barato é muitas vezes um Fudan FM11NT021, que funciona para um link e falha em tudo o que pergunte o GET_VERSION. Um "NTAG215" barato muitas vezes não o é, e os Amiibo vão recusá-lo. Verifique o código do fabricante e o nome do chip na app antes de gravar o que quer que seja, e compre numa loja que indique o chip.

### O meu telemóvel consegue ler o meu cartão bancário ou o meu passaporte com uma app NFC?

O passaporte, sim: com a zona de leitura ótica como chave, uma app consegue ler os grupos de dados do chip, e a NFC.cool faz isso nas duas plataformas. O cartão bancário é um smart card EMV; uma app consegue ler a sua lista de aplicações e alguns registos públicos, mas a Apple bloqueia a leitura de cartões de pagamento no Core NFC, o código de segurança do cartão não está no chip e cada transação é assinada por uma chave que nunca sai do cartão, por isso não há nada para copiar.

### Porque é que o meu crachá do escritório ou a chave do hotel não aparecem na app?

A maioria dos crachás de escritório são cartões de proximidade de 125 kHz, que a bobina de 13,56 MHz de um telemóvel nem sequer consegue detetar. A maioria das chaves de hotel e dos cartões de transporte mais antigos são MIFARE Classic, que um iPhone só consegue identificar e que um telemóvel Android só consegue ler com o controlador certo e as chaves certas. Nenhuma das duas coisas se resolve com uma app, e prefiro dizê-lo a vender-lhe uma solução improvisada.

### Posso desbloquear uma tag NFC que foi tornada só de leitura?

Não. Os bits de bloqueio de uma tag de Tipo 2 ou Tipo 5 são bits irreversíveis no chip; a flag de só leitura no capability container é igual. Uma palavra-passe pode ser removida se a souber; um bloqueio não. É por isso que a NFC.cool pergunta duas vezes antes de bloquear seja o que for.

### A palavra-passe do NTAG é segurança a sério?

Trava a pessoa com uma app gratuita, que é a maioria das pessoas. Não trava ninguém com um leitor capaz de escutar, porque a palavra-passe de 32 bits viaja pelo ar sem encriptação e a tag responde com uma confirmação de 16 bits. Para tudo o que tenha de resistir a um atacante motivado, a escada começa no AES: a Ultralight AES para um autocolante de Tipo 2, a NTAG 424 DNA se a própria leitura tiver de provar alguma coisa.

### Que tag preciso para Amiibo?

Um NTAG215, e só um NTAG215. A consola pergunta o GET_VERSION, autentica-se com uma palavra-passe derivada do UID e lê as 135 páginas. Um chip sem GET_VERSION ou com outro número de páginas falha no primeiro comando. Gravar um Amiibo numa tag é permanente, porque os bytes de bloqueio e a palavra-passe fazem parte do formato.

### Que tag NFC funciona numa superfície metálica?

Qualquer chip num formato para metal, o que significa uma folha de ferrite entre a antena e o metal. Uma tag normal colada a aço não lê de todo; uma tag para metal lê a cerca de quatro quintos do seu alcance normal. Se conseguir pôr três milímetros de qualquer material não metálico entre uma tag normal e o metal, também funciona.

### A NFC.cool funciona no iPad e no Mac?

Sim, desde a versão 6.15.0, através de um leitor de smart cards USB; nenhum dos dois dispositivos tem rádio NFC próprio. O HID OMNIKEY 5022 CL é o que testei, e o ACS ACR1552U e o ACR1255U-J1 foram reportados como funcionais. Tudo o que funciona em Tipo 2, Tipo 4 e FeliCa através do telemóvel funciona através do leitor, com a MIFARE Classic só em leitura.

---

## Glossário

| Termo | Significado |
| --- | --- |
| AFI | Application Family Identifier, um byte nas tags ISO 15693 que permite a um leitor inventariar apenas as tags de um determinado tipo |
| APDU | Application Protocol Data Unit, o formato de comando e resposta da ISO 7816-4, usado por todos os chips ISO-DEP |
| ATQA | Answer To Request, os dois primeiros bytes que um chip de Tipo A envia; a NXP diz para não identificar chips por ele |
| AUTH0 | o byte de configuração do NTAG que indica a primeira página que precisa da palavra-passe |
| AUTHLIM | a definição do NTAG que bloqueia a tag ao fim de um número escolhido de tentativas de palavra-passe falhadas |
| CC | Capability Container, os quatro bytes (ou o ficheiro, no Tipo 4) que dizem a um leitor que a tag contém NDEF e quanto |
| CMAC | um código de autenticação de mensagens calculado com AES; é o que torna uma mensagem SUN impossível de falsificar |
| CRYPTO1 | a cifra de fluxo proprietária de 48 bits da NXP na MIFARE Classic, quebrada em 2008 |
| DSFID | Data Storage Format Identifier, um byte ISO 15693 que descreve como a memória está organizada |
| EAS | Electronic Article Surveillance, o bit nas tags ISO 15693 que faz disparar o alarme do pórtico de uma loja |
| GET_VERSION | o comando da NXP que devolve oito bytes que identificam o fabricante, o tipo, a geração e o tamanho do chip |
| ISO-DEP | o protocolo de transporte ISO/IEC 14443-4; um chip que o fala responde com SAK 20 e aceita APDUs |
| Modulação de carga | a forma como uma tag passiva envia dados: ligando e desligando uma carga na antena, que o leitor sente no seu próprio campo |
| LRP | Leakage Resilient Primitive, um modo AES na NTAG 424 DNA e no DESFire Light que resiste a ataques de canal lateral |
| MAD | MIFARE Application Directory, o setor 0 de um cartão Classic que indica o que os outros setores contêm |
| Espelho | a funcionalidade do NTAG que cola o UID e o contador em ASCII na mensagem NDEF a cada leitura |
| NDEF | NFC Data Exchange Format, o contentor de registos que todos os telemóveis leem |
| NUID | Non-Unique Identifier, o nome que a NXP dá a um UID de 4 bytes |
| OTP | One Time Programmable, bits que podem ser ativados uma vez e nunca mais desativados |
| PACK | Password Acknowledge, os dois bytes que um NTAG devolve depois de uma palavra-passe correta |
| PICC, PCD | os nomes que as normas dão ao cartão e ao leitor |
| Random ID | um modo em que o chip responde à anticolisão com um ID aleatório de 4 bytes novo de cada vez, por privacidade |
| READ_SIG | o comando que devolve a assinatura de originalidade de um chip |
| SAK | Select Acknowledge, o byte que um chip de Tipo A devolve depois de ser selecionado; os seus bits separam os chips por famílias |
| SDM | Secure Dynamic Messaging, o mecanismo da NTAG 424 DNA e do DESFire EV3 por trás do SUN |
| SUN | Secure Unique NFC, um URL que leva uma prova criptográfica nova a cada leitura |
| T5T, T2T, T4T | a abreviatura do NFC Forum para tags de Tipo 5, Tipo 2 e Tipo 4 |
| TLV | Tag-Length-Value, o enquadramento à volta de uma mensagem NDEF nos chips de Tipo 2 e Tipo 5 |
| TruST25 | a assinatura de originalidade da ST sobre o UID |
| UID | o identificador do chip, programado na fábrica, com 4, 7 ou 8 bytes |

---

## Fontes e leituras adicionais

Todas as tabelas deste guia foram verificadas com uma destas fontes. Os preços são das lojas indicadas na secção de compras, a 9 de setembro de 2026.

**NXP NTAG**

- [Ficha técnica do NTAG213/215/216, Rev 3.2](https://www.nxp.com/docs/en/data-sheet/NTAG213_215_216.pdf)
- Fichas técnicas do [NTAG210/212](https://www.nxp.com/docs/en/data-sheet/NTAG210_212.pdf), do [NTAG 210µ](https://www.nxp.com/docs/en/data-sheet/NT2L1001_NT2H1001.pdf), do [NTAG213F/216F](https://www.nxp.com/docs/en/data-sheet/NTAG213F_216F.pdf) e do [NTAG 213 TT](https://www.nxp.com/docs/en/data-sheet/NT2H1311TT.pdf)
- Fichas técnicas da [NTAG 223 DNA](https://www.nxp.com/docs/en/data-sheet/NT2H2331G0.pdf) e da [NTAG 224 DNA StatusDetect](https://www.nxp.com/docs/en/data-sheet/NT2H2421S0.pdf)
- Fichas técnicas da [NTAG 424 DNA](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf) e da [NTAG 424 DNA TagTamper](https://www.nxp.com/docs/en/data-sheet/NT4H2421Tx.pdf), e a [AN12196, a nota de funcionalidades e dicas da 424 com a chave pública de originalidade](https://www.nxp.com/docs/en/application-note/AN12196.pdf)
- Fichas técnicas do [NTAG I2C plus](https://www.nxp.com/docs/en/data-sheet/NT3H2111_2211.pdf) e do [NTAG 5 boost](https://www.nxp.com/docs/en/data-sheet/NTA5332.pdf)
- [AN13089, funcionalidades e dicas do NTAG 21x](https://www.puntoflotante.net/AN13089.pdf), sobre porque é que uma assinatura de originalidade estática não é garantia contra clones (cópia espelhada; a versão em nxp.com não é pública)

**NXP MIFARE**

- Fichas técnicas da [MIFARE Ultralight](https://www.nxp.com/docs/en/data-sheet/MF0ICU1.pdf), da [Ultralight C](https://www.nxp.com/docs/en/data-sheet/MF0ICU2.pdf), da [Ultralight EV1](https://www.nxp.com/docs/en/data-sheet/MF0ULX1.pdf) e da [Ultralight AES](https://www.nxp.com/docs/en/data-sheet/MF0AES(H)20.pdf)
- Fichas técnicas da [MIFARE Classic EV1 1K](https://www.nxp.com/docs/en/data-sheet/MF1S50YYX_V1.pdf) e da [Classic EV1 4K](https://www.nxp.com/docs/en/data-sheet/MF1S70YYX_V1.pdf)
- Fichas técnicas resumidas da [MIFARE Plus S](https://www.nxp.com/docs/en/data-sheet/MF1SPLUSX0Y1_SDS.pdf), da [Plus SE](https://www.nxp.com/docs/en/data-sheet/MF1SEP_H_10X1_SDS.pdf) e da [Plus EV2](https://www.nxp.com/docs/en/data-sheet/MF1P(H)x2.pdf)
- Fichas técnicas do [DESFire EV1](https://www.nxp.com/docs/en/data-sheet/MF3ICDX21_41_81_SDS.pdf), do [DESFire EV2](https://www.nxp.com/docs/en/data-sheet/MF3DX2_MF3DHX2_SDS.pdf), do [DESFire EV3](https://www.nxp.com/docs/en/data-sheet/MF3D_H_X3_SDS.pdf) e do [DESFire Light](https://www.nxp.com/docs/en/data-sheet/MF2DLHX0.pdf), e a [AN12752 sobre a memória utilizável do DESFire](https://www.nxp.com/docs/en/application-note/AN12752.pdf)
- [AN10833, identificação do tipo MIFARE](https://www.nxp.com/docs/en/application-note/AN10833.pdf), [AN10927, UIDs MIFARE](https://www.nxp.com/docs/en/application-note/AN10927.pdf), [AN1305, NDEF na MIFARE Classic](https://www.nxp.com/docs/en/application-note/AN1305.pdf), [AN10787, o MIFARE Application Directory](https://www.nxp.com/docs/en/application-note/AN10787.pdf), [AN11004, o DESFire como tag de Tipo 4](https://www.nxp.com/docs/en/application-note/AN11004.pdf)

**NXP ICODE**

- Fichas técnicas do [ICODE SLIX](https://www.nxp.com/docs/en/data-sheet/SL2S2002_SL2S2102.pdf), [SLIX-S](https://www.nxp.com/docs/en/data-sheet/SL2S5302_SL2S5402.pdf), [SLIX-L](https://www.nxp.com/docs/en/data-sheet/SL2S5002_SL2S5102.pdf), [SLIX2](https://www.nxp.com/docs/en/data-sheet/SL2S2602.pdf), [ICODE DNA](https://www.nxp.com/docs/en/data-sheet/SL2S6002_SDS.pdf) e [ICODE 3](https://www.nxp.com/docs/en/data-sheet/SL2S3003_SL2S3003TT.pdf)
- [AN11809, a comparação da família ICODE](https://www.nxp.com/docs/en/application-note/AN11809.pdf)

**STMicroelectronics, TI, EM, Sony, Fudan**

- Fichas técnicas da ST do [ST25TV02KC](https://www.st.com/resource/en/datasheet/st25tv02kc.pdf), [ST25TN01K](https://www.st.com/resource/en/datasheet/st25tn01k.pdf), [ST25DV64KC](https://www.st.com/resource/en/datasheet/st25dv64kc.pdf), [ST25TA02KB](https://www.st.com/resource/en/datasheet/st25ta02kb.pdf) e [M24LR64E-R](https://www.st.com/resource/en/datasheet/m24lr64e-r.pdf), a [AN5658 sobre o Augmented NDEF](https://www.st.com/resource/en/application_note/an5658-augmented-ndef-messages-with-st25tv512c-and-st25tv02kc-devices-stmicroelectronics.pdf) e o [TA0358 sobre o TruST25](https://www.st.com/resource/en/technical_article/ta0358-developing-supply-chain-confidence-with-trust25-digital-signature-in-rfidnfc-tags-stmicroelectronics.pdf)
- Fichas técnicas do TI Tag-it HF-I [Standard](https://www.ti.com/lit/ds/scbs828c/scbs828c.pdf), [Pro](https://www.ti.com/lit/ds/scbs822c/scbs822c.pdf) e [Plus](https://www.ti.com/lit/ds/scbs827b/scbs827b.pdf)
- EM Microelectronic [EM4233](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em4233), [EM4423](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em-echo-em4423) e [EM4425](https://www.emmicroelectronic.com/product/nfc-high-frequency-ics/em-echo-v)
- Sony: [ficha técnica do FeliCa Lite-S](https://www.sony.co.jp/en/Products/felica/business/data/RC-S966_E.pdf) e [FeliCa Standard RC-SA01](https://www.sony.co.jp/en/Products/felica/business/products/RC-SA01.html)
- [Ficha técnica do Fudan FM11NT021](https://github.com/user-attachments/files/16667599/FM11NT021_sds_eng.pdf)

**Investigação de segurança e normas**

- Quarkslab, [MIFARE Classic: exposing the static encrypted nonce variant and a few hardware backdoors](https://blog.quarkslab.com/mifare-classic-static-encrypted-nonce-and-backdoors.html) (2024)
- Nohl, Evans, Starbug e Plötz, [Reverse-Engineering a Cryptographic RFID Tag](https://www.usenix.org/legacy/event/sec08/tech/full_papers/nohl/nohl.pdf) (USENIX Security 2008)
- Garcia et al., [Dismantling MIFARE Classic](https://link.springer.com/chapter/10.1007/978-3-540-88313-5_7) (ESORICS 2008)
- [ISO/IEC JTC1/SC17 Standing Document 5, o registo dos fabricantes de circuitos integrados](https://www.aimglobal.org/wp-content/uploads/2022/04/ISO_IEC_JTC1_SC17_Standing_Document_5_Register_of_IC_Manufacturers.pdf)
- [Notas do Proxmark3 sobre cartões mágicos](https://github.com/RfidResearchGroup/proxmark3/blob/master/doc/magic_cards_notes.md) e [3dbrew sobre a estrutura da tag Amiibo](https://www.3dbrew.org/wiki/Amiibo)
- O NFC Forum sobre [a tecnologia](https://nfc-forum.org/learn/nfc-technology/) e [a especificação das tags de Tipo 2](https://nfc-forum.org/build/specifications/type-2-tag-specification/)

**Telemóveis e leitores**

- Apple: [Core NFC](https://developer.apple.com/documentation/corenfc), [leitura de tags em segundo plano](https://developer.apple.com/documentation/corenfc/adding-support-for-background-tag-reading), [o comando MIFARE que exclui o CRYPTO1](https://developer.apple.com/documentation/corenfc/nfcmifaretag/sendmifarecommand(commandpacket:completionhandler:)) e [a sessão 715 da WWDC 2019](https://developer.apple.com/videos/play/wwdc2019/715/)
- Android: [MifareClassic](https://developer.android.com/reference/android/nfc/tech/MifareClassic), [o guia avançado de NFC](https://developer.android.com/develop/connectivity/nfc/advanced-nfc) e [o Web NFC no Chrome](https://developer.chrome.com/docs/capabilities/nfc)
- Leitores: [ACS ACR122U](https://www.acs.com.hk/download-manual/418/TSP-ACR122U-3.06.pdf), [HID OMNIKEY 5022 CL](https://www.hidglobal.com/doclib/files/resource_files/eat-omnikey-5022-usb-reader-ds-en.pdf), [NXP PN532](https://www.nxp.com/docs/en/nxp/data-sheets/PN532_C1.pdf), [Proxmark3](https://github.com/RfidResearchGroup/proxmark3), [Flipper Zero](https://docs.flipper.net/nfc) e [Chameleon Ultra](https://github.com/RfidResearchGroup/ChameleonUltraDocs)
- Antenas e ferrite: [TI SLOA241](https://www.ti.com/lit/an/sloa241b/sloa241b.pdf) e [Würth ANP022](https://www.mouser.com/pdfdocs/Selection_and_Characteristics_of_WEFSFS_APPNOTE.PDF)

---

## Em resumo

Escolha o chip em função do trabalho. Um NTAG213 para um link, um NTAG216 quando não tem a certeza, um NTAG215 para Amiibo, uma NTAG 424 DNA quando uma leitura tem de provar alguma coisa, um ICODE SLIX2 ou um ICODE 3 quando um pórtico o tem de ler, um DESFire EV3 quando uma porta tem de confiar nele, e nada, mas mesmo nada, da prateleira da MIFARE Classic. Tudo o resto neste guia é o raciocínio por trás desta frase, e as tabelas estão cá para que nunca mais tenha de acreditar na palavra de um anúncio.

Se quiser ver o que uma tag é realmente antes de gravar nela, é isso que a [NFC.cool Tools](/features/nfc-reader-writer/) faz em cada leitura, no [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ultimate-nfc-tag-guide-pt&mt=8), no [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ultimate-nfc-tag-guide-pt) e num iPad ou Mac com um leitor ligado. E se tiver na secretária um chip que a app identifica mal, ou que não identifica de todo, escreva-me. Foi assim que a maioria dos sessenta lá chegou.
