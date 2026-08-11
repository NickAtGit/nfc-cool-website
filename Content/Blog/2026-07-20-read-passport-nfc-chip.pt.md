---
id: "read-passport-nfc-chip-2026-07"
title: "Leia o chip NFC do seu passaporte com o telemóvel"
date: "2026-07-20"
tags: ["announcements", "nfc-tags", "privacy"]
summary: "Há um chip NFC dentro do seu passaporte, e o seu telemóvel já o consegue ler. A NFC.cool Tools lê o chip de um passaporte, cartão de identificação ou autorização de residência no iPhone e no Android - mostrando a fotografia e os dados guardados, e verificando se o documento é genuíno."
image: "/assets/images/Blog/read-passport-nfc-chip.webp"
imageAlt: "Um passaporte azul-marinho com um símbolo NFC dourado ao lado de um iPhone a mostrar uma marca de verificação"
author: "Nicolo Stanciu"
metaTitle: "Leia o chip NFC do seu passaporte com o telemóvel"
metaDescription: "O seu passaporte tem um chip NFC, e a NFC.cool consegue lê-lo no iPhone e no Android. Veja a fotografia e os dados guardados no chip, e verifique se o documento é genuíno."
ogTitle: "O seu passaporte tem um chip NFC. Agora o telemóvel consegue lê-lo."
ogDescription: "A NFC.cool lê agora o chip do seu passaporte, cartão de identificação ou autorização de residência - a fotografia, os dados e se é genuíno. No iPhone e no Android."
---
Da última vez que apanhei um avião, passei um minuto parado num daqueles portões automáticos de passaporte - a cabina de vidro onde pousa o passaporte no leitor, olha para a câmara e espera que as portas se dignem a abrir. Demora um instante. E, nesse instante, dei por mim a pensar no que a máquina estava realmente a fazer. Não estava apenas a ler a página impressa. Estava também a comunicar com o pequeno chip escondido dentro da capa do meu passaporte.

Passei anos a ler chips NFC para ganhar a vida. Sabia que aquele chip estava ali dentro. Só nunca tinha apontado a minha própria aplicação para ele. Ali parado no portão, incomodou-me genuinamente que um quiosque de fronteira conseguisse ler o meu passaporte e a NFC.cool não.

É precisamente esse o tipo de incómodo que a NFC.cool existe para resolver. O meu objetivo para ela sempre foi simples e um pouco teimoso: ser o melhor leitor NFC que se pode ter num telemóvel e suportar tudo o que o NFC realmente consegue fazer - sem a transformar numa ferramenta que exige um curso de engenharia para se usar. Um chip de passaporte é quase o expoente máximo daquilo que "o NFC consegue fazer". Por isso, integrei-o.

A NFC.cool Tools lê agora o chip dentro de um passaporte biométrico, de um cartão de identificação ou de uma autorização de residência, tanto no iPhone como no Android. Mostra-lhe a fotografia e os dados pessoais guardados no chip, e diz-lhe se o documento parece genuíno. Eis como funciona, e onde estão, com franqueza, os seus limites.

---

## O chip não fala enquanto não provar que tem o documento na mão

Esta é a parte que surpreende as pessoas: não basta passar o telemóvel por cima de um passaporte para o ler. O chip está deliberadamente bloqueado. Não diz uma única palavra enquanto não lhe entregar uma chave, e essa chave está impressa no seu próprio documento.

Acho isto uma bela solução de design. Significa que ninguém pode ler o seu passaporte às escondidas enquanto ele está no seu bolso ou na sua mala. A única forma de entrar é já ter o documento aberto na mão, porque a chave é construída a partir daquilo que está impresso nele: o número do documento, a sua data de nascimento e a data de validade.

Por isso, a aplicação começa por pedir exatamente essas três coisas, de uma de duas formas. Pode apontar a câmara para a zona de leitura automática - aquela faixa de caracteres `<<<` grossos ao longo do fundo da página da fotografia do passaporte, ou do verso de um cartão de identificação - e a NFC.cool lê-a oticamente, da mesma forma que o portão do aeroporto. Ou, se o documento estiver gasto ou a luz for má, escreve os três valores à mão. Seja como for, assim que a aplicação tem a chave, pede-lhe que encoste o topo do telemóvel ao documento, e começa a verdadeira leitura do chip. Se alguma vez se perguntou [como o NFC funciona realmente num iPhone](/blog/nfc-on-iphones-insider-look/), este é o mesmo aperto de mão de curta distância, só que com um chip bem mais exigente do outro lado.

## O que sai do chip

Uns segundos depois, está a olhar para aquilo que o chip andava a transportar este tempo todo: a fotografia sua que a autoridade emissora guardou, o seu nome, a sua nacionalidade, o número do documento, a sua data de nascimento e de validade, e nalguns documentos um pouco mais - o local de nascimento, a autoridade emissora, a data em que foi emitido. São os mesmos dados que a cabina do agente vai buscar, só que na sua mão.

Cada documento que lê é guardado numa pequena carteira dentro da aplicação, chamada Os Meus Documentos, para que possa voltar a consultá-lo mais tarde. Essa carteira vive no seu dispositivo e, no iPhone, sincroniza através do seu próprio iCloud. Não chega a mim, nem a nenhum servidor meu. Numa coisa tão pessoal como esta, não é um detalhe que eu fosse esconder.

## O documento é genuíno?

A parte que mais me agrada é a verificação de autenticidade. O chip de um passaporte moderno não é apenas um cartão de memória. O país emissor assina o seu conteúdo, um pouco como um selo de cera pressionado nos dados. A NFC.cool verifica esse selo: que nada no chip foi alterado desde que foi emitido, que a assinatura é matematicamente válida, e que remonta a uma autoridade emissora real que a aplicação reconhece. Os melhores chips conseguem também provar que são o silício original e não uma cópia, e a aplicação verifica isso também quando o chip o suporta.

Mas eis a promessa que fiz a mim próprio quanto à forma de o dizer. A aplicação nunca vai chamar "falso" ao seu passaporte. Se todas as verificações passarem, diz que o documento parece genuíno. Se algo não bater certo - ou, muito mais frequentemente, se simplesmente não conseguir confirmar o emissor porque esse país não consta da lista que a aplicação traz - diz que não conseguiu verificar, e fica-se por aí. "Não consegui verificar isto" e "isto é uma falsificação" são frases muito diferentes, e não estou disposto a confundi-las numa coisa tão séria como o seu documento de identificação.

## O que a aplicação não faz

Algumas respostas diretas, porque este é o tipo de funcionalidade em que andar com evasivas seria um desserviço.

Funciona com muitos documentos, mas não posso prometer que funcione com todos, sem exceção. Testei-a com uma pilha de passaportes e cartões de diferentes países e a maioria lê-se sem problemas, mas os documentos do mundo não são perfeitamente uniformes, e o seu pode ser a exceção. Se um deles se recusar, normalmente é o documento, não é você.

Lê aquilo que lhe é permitido ler, e nada mais. Alguns chips guardam também impressões digitais ou dados da íris, e esses estão protegidos por chaves que só os sistemas de inspeção governamentais possuem - algo que não é concedido a uma aplicação de consumo, e que eu também não quereria que ela tivesse. A NFC.cool nunca lhes toca. Lê a fotografia do rosto e os dados do tipo impresso, que é exatamente a parte destinada a ser legível pela pessoa que tem o documento na mão.

E precisa de um telemóvel com NFC, mantido imóvel contra o documento enquanto lê. O chip é pequeno e a ligação é delicada, por isso, se o telemóvel escorregar, terá de recomeçar a leitura. Mantenha o documento encostado ao topo do telemóvel até terminar.

---

Ainda penso naquele portão do aeroporto. Toda a encenação de segurança das viagens modernas, e no centro de tudo está um pequeno chip NFC a fazer um cuidadoso aperto de mão - o mesmo tipo de aperto de mão com que passei anos a [ler e gravar tags](/features/nfc-reader-writer/). Agora o leitor que tem no bolso também o consegue fazer.

Se quiser ver o que o seu próprio passaporte anda discretamente a transportar, o leitor de passaportes e documentos de identificação está na NFC.cool Tools no [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-read-passport-nfc-chip-pt&mt=8) e no [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-read-passport-nfc-chip-pt), mesmo ao lado de tudo o resto que construí para NFC. Abra o seu passaporte, encoste-o ao telemóvel e conheça a versão de si mesmo que vive no chip.
