---
id: nfc-blog-015
title: "Como Verificar e Repor o Contador da Cabeça de Escova Philips Sonicare com NFC"
date: 2026-04-21
tags: ["nfc-tags", "guides", "automation"]
summary: "A sua escova de dentes Sonicare tem um chip NFC dentro de cada cabeça de escova que faz a contagem decrescente até comprar uma substituição. Eis o que ele realmente regista, e como verificar a sua utilização ou repor o contador com o NFC.cool Tools."
image: "/assets/images/Blog/reset-sonicare-brush-head-nfc.webp"
imageAlt: "Tag NFC de uma cabeça de escova de dentes elétrica a ser reposta com um telemóvel"
metaTitle: "Verificar e Repor o Contador da Cabeça de Escova Philips Sonicare com NFC (2026)"
metaDescription: "A sua cabeça de escova Sonicare tem um chip NFC que regista há quanto tempo escova os dentes. Veja quanta vida resta e reponha o contador com o NFC.cool Tools."
ogTitle: "Como Verificar e Repor o Contador da Cabeça de Escova Sonicare"
ogDescription: "Cada cabeça de escova Sonicare tem um chip NFC a fazer a contagem decrescente até à substituição. Veja as suas estatísticas de utilização e reponha o temporizador, se quiser."
---

A sua escova de dentes elétrica anda a espiá-lo.

Não de uma forma de vigilância arrepiante. Mas no sentido de "metemos um chip NFC minúsculo na sua cabeça de escova para o chatear até comprar substituições". Cada cabeça de substituição Philips Sonicare tem um NTAG213 embutido no plástico que regista há quanto tempo escova os dentes e diz ao corpo da escova para piscar uma luz de aviso quando decide que os seus três meses terminaram.

Bem-vindo à Internet of Shit.

A questão é que três meses são uma recomendação, não um facto médico. O desgaste das cerdas depende da força com que escova, da pasta de dentes que usa e da frequência. O chip não mede o estado das cerdas. Apenas conta segundos. Quem escova com suavidade e pasta macia pode ter cerdas perfeitamente boas aos três meses. O temporizador não sabe nem quer saber.

O NFC.cool Tools consegue agora ler esse chip, mostrar-lhe exatamente quanta vida a sua cabeça de escova já gastou e repor o temporizador, se decidir que as cerdas ainda estão boas. Eis como funciona.

---

## O Que Está Realmente no Chip

Não fiz nada disto por engenharia inversa eu próprio. O Cyrill Künzi [desmontou o protocolo](https://kuenzi.dev/toothbrush/) e o mbirth [mapeou cada byte](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html), e entre os dois descobriram tudo o que se segue. Eis o que o NTAG213 na sua cabeça de escova armazena:

- **Tipo e cor da cabeça de escova** - um único byte na página `0x1F` que identifica o modelo (Premium All-in-One, Gum Care, DiamondClean, etc.) e a sua cor (o [mapa de memória do mbirth](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) lista 22 tipos conhecidos)
- **Vida útil alvo** - em `0x21`, normalmente `0x5460` = 21.600 segundos, ou seja, 180 sessões de escovagem de dois minutos, ou três meses de uso duas vezes por dia
- **Código de fabrico** - em `0x21-0x23`, a data e a linha de produção em ASCII, como `241206 31K` (fabricado a 6 de dezembro de 2024, na linha 31K). Também impresso na haste
- **Tempo de escovagem acumulado** - os primeiros dois bytes da página `0x24` armazenam o total de segundos que a cabeça esteve em uso, como um valor de 16 bits. Quando chega a `0xFFFF` (65.535 segundos, cerca de 18 horas de escovagem contínua), o contador para. Uma cabeça nova em folha começa em `00:00:02:00` - os primeiros dois bytes são zero (sem utilização), o significado dos últimos dois bytes é atualmente desconhecido
- **Última intensidade e modo** - também em `0x24`: Baixa/Média/Alta e Clean/White+/Gum Health/Deep Clean+
- **Um URL** - a apontar para `philips.com/nfcbrushheadtap`, que abre se tocar na cabeça com um leitor NFC genérico

Quando o tempo acumulado ultrapassa o alvo (21.600 segundos), o corpo da escova pisca o LED âmbar. É o chip a falar, não as cerdas.

---

## Porque é que Poderá Querer Repô-lo

O intervalo de substituição de três meses é uma recomendação da Philips, não uma medição científica do desgaste das cerdas. O chip conta segundos, não o desgaste das cerdas. Se quiser decidir por si próprio - olhando para as cerdas em vez de obedecer a um temporizador de contagem decrescente - repor o contador permite-lhe fazê-lo.

Pode também repô-lo se alternar entre várias cabeças (viagem vs. casa) e quiser acompanhá-las por si próprio.

---

## Como Funciona a Palavra-Passe

O NTAG213 está protegido por palavra-passe. Cada cabeça de escova tem uma palavra-passe única de 4 bytes. O corpo da escova autentica-se com ela sempre que escreve na tag.

A palavra-passe é calculada a partir de duas entradas: o UID de 7 bytes da tag e o código de fabrico armazenado na tag (e impresso na haste). O [Aaron Christophel](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) reconstruiu o algoritmo por engenharia inversa a partir do firmware da Sonicare, depois de o Cyrill Künzi ter originalmente intercetado a transmissão da palavra-passe usando um rádio definido por software.

⚠️**Importante:** o NTAG213 bloqueia-se permanentemente após **três tentativas de palavra-passe falhadas**. O chip fica apenas de leitura para sempre - nem sequer a escova lhe consegue voltar a escrever. Não adivinhe.

---

## Como Verificar e Repor com o NFC.cool Tools

Eis como fica na app:

<figure class="sk-phone-screenshot">
  <img src="/assets/images/Blog/sonicare-reset-screen.webp" alt="NFC.cool Tools a mostrar uma cabeça de escova Sonicare com 80% de utilização e o botão Repor Temporizador" />
</figure>

O NFC.cool Tools trata de todo o processo: ler a tag, calcular a palavra-passe e mostrar-lhe as estatísticas. Sem comandos hex, sem calculadoras web, sem SDR.

1. Abra o **NFC.cool Tools** no seu iPhone
2. Vá a **Reposição da Cabeça de Escova**
3. Toque em **Ler NFC** e encoste a cabeça de escova ao seu telemóvel
4. A app mostra um **indicador de percentagem** de quanta vida a cabeça já gastou, com o tempo usado e o tempo restante por baixo
5. Toque em **Repor Temporizador** para colocar o contador de utilização de novo a zero, ou leia outra cabeça

Disponível já no [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-en&mt=8), a chegar ao [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-en) numa atualização futura.

---

## O Que a Reposição Faz Realmente

Quando faz a reposição, está a escrever `00:00:02:00` na página `0x24` - o mesmo valor com que uma cabeça de escova nova em folha vem de fábrica. Apenas os primeiros dois bytes (o contador de utilização) são repostos a zero. O significado dos últimos dois bytes é desconhecido, por isso a app preserva-os.

A escova começa a contar de novo a partir de zero, e a luz âmbar volta passados outros três meses. Altura em que pode verificar as suas cerdas e decidir por si próprio.

---

## O Quadro Mais Amplo: NFC em Objetos do Dia a Dia

Uma cabeça de escova de dentes com um chip NFC a fazer a contagem decrescente até à sua próxima compra é o auge da Internet of Shit. Construí o meu trabalho à volta do NFC porque o considero genuinamente útil, mas embuti-lo em plástico descartável especificamente para o empurrar a comprar mais é... uma escolha.

O mesmo chip NTAG213 é também usado para coisas que de facto servem o consumidor: autenticação de produtos, controlo de acessos e, em breve, o Passaporte Digital de Produto da UE, que irá exigir tags NFC em produtos de consumo para que possa verificar o que está a comprar e de onde veio. Isso é o NFC a ser usado *a seu favor*, não contra si.

O NFC.cool Tools lê e grava tudo isto. A funcionalidade Sonicare é um exemplo de perceber o que está nas tags à sua volta, e decidir o que fazer com essa informação.

---

## Leitura Adicional

- [Artigo original de engenharia inversa do Cyrill Künzi](https://kuenzi.dev/toothbrush/) - interceção por SDR, extração da palavra-passe e a primeira análise detalhada do protocolo NFC da Sonicare
- [Gerador de palavras-passe do Aaron Christophel](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) - o algoritmo extraído do firmware da Sonicare
- [Mapa de memória do NTAG213 do mbirth](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) - documentação detalhada de cada byte no chip

*Tem uma cabeça de escova Sonicare para verificar? [Descarregue o NFC.cool Tools para iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-en&mt=8) ou [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-en) (reposição Sonicare a chegar em breve ao Android) e veja o que a sua escova de dentes anda a registar.*