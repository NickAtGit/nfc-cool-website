---
id: "ntag-424-dna-2026-07"
title: "NTAG 424 DNA: as tags NFC que provam que não são falsas"
date: "2026-07-24"
tags: ["announcements", "nfc-tags", "industry"]
summary: "Ouvi dizer que as marcas de luxo usam tags NTAG 424 DNA para provar que um produto é genuíno, por isso comprei um lote no AliExpress para ver o que fazem realmente. Afinal, são o Contador de Toques NFC com uma camada criptográfica acrescentada, e a NFC.cool Tools lê-as, verifica-as e configura-as por completo no iPhone e no Android - cada chave, as permissões de cada ficheiro e as próprias definições do chip."
image: "/assets/images/Blog/ntag-424-dna-counterfeit-proof-nfc-tags.webp"
imageAlt: "Uma mala de couro com uma etiqueta de autenticação NFC ao lado de um iPhone a mostrar um escudo de segurança e ícones de chave"
author: "Nicolo Stanciu"
metaTitle: "NTAG 424 DNA: a tag NFC antifalsificação explicada"
metaDescription: "Comprei tags NTAG 424 DNA para ver como as marcas provam que um produto é genuíno. Eis como funcionam estas tags NFC antifalsificação, e como a NFC.cool as lê, verifica e programa."
ogTitle: "As tags NFC que provam que não são falsas"
ogDescription: "Como as tags NTAG 424 DNA apanham clones, e como a NFC.cool as lê, verifica e configura no iPhone e no Android."
---

Há algum tempo, não parava de ler a mesma afirmação de passagem: as marcas de luxo estão a colocar chips NFC nos seus produtos para que possa tocar com o telemóvel numa mala ou num par de ténis e saber que é o artigo verdadeiro, não uma imitação. Todos os artigos repetiam a mesma frase reluzente e nenhum dizia *como*. O que impede realmente um falsificador de copiar o chip juntamente com a mala?

Por isso, fiz aquilo que faço sempre quando fico curioso sobre uma tag. Fui ao AliExpress, encontrei um anúncio de tags "NTAG 424 DNA", encomendei um pequeno lote e esperei que o envelope aparecesse. Uns euros, um par de semanas, e tinha em cima da secretária o mesmo silício em que assentam esses sistemas de proteção de marca. Depois toquei numa para ver o que faz.

## O que é realmente uma tag NTAG 424 DNA

Por fora, é uma tag NFC vulgar. Não a conseguiria distinguir de um monte de tags baratas, e qualquer telemóvel a lê sem se queixar. Se leu o meu [guia sobre os tipos de tags NFC](/blog/nfc-tag-types-for-iphones/), encaixa-se como mais uma tag de Tipo 4 que o seu iPhone lê de bom grado.

A parte do "DNA" é o que faz a diferença. Lá dentro, o chip guarda algumas chaves AES-128 e um pequeno motor criptográfico, e consegue fazer algo que nenhum NTAG215 comum ou autocolante de uma embalagem múltipla consegue: consegue *assinar* cada um dos toques. Essa assinatura é tudo o que importa. É a diferença entre uma tag que diz "aqui está um link" e uma tag que diz "aqui está um link, e aqui está a prova criptográfica de que eu, este chip genuíno específico, sou quem o está a servir, neste preciso momento".

É por isto que as marcas de luxo estão realmente a pagar - não pelo link, mas pela prova de que é um chip genuíno a servi-lo.

## Como funcionam o SUN e o SDM: um link que se reescreve a cada toque

Foi aqui que a ficha me caiu. Quando olhei para o que a tag estava realmente a enviar, percebi que já tinha construído a maior parte da maquinaria para o compreender.

No início deste ano, lancei a [funcionalidade Contador de Toques NFC](/blog/count-nfc-tag-scans/): uma tag que conta quantas vezes foi lida e coloca esse número no URL, para que um link possa saber que é a 47.ª vez que alguém a leu. Uma tag NTAG 424 DNA é essa mesma ideia, com uma camada de encriptação à volta que a torna impossível de falsificar.

O mecanismo chama-se **SUN** (Secure Unique NFC), ou **SDM** (Secure Dynamic Messaging) se estiver a ler a [ficha técnica da NXP](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf). Guarda um link normal na tag, algo como `https://example.com`. Mas diz ao chip para reescrever partes desse link em tempo real de cada vez que é tocada. Por isso, o que o seu telemóvel recebe na verdade é mais parecido com:

`https://example.com/?picc_data=A1B2...&cmac=9F3C...`

Estes dois valores não são decoração. `picc_data` é uma cópia encriptada do ID real da tag mais um contador de toques, baralhada com uma chave que nunca sai do chip. `cmac` é uma assinatura criptográfica sobre esses dados. Ambos mudam a cada toque. Toque duas vezes na mesma tag e obtém dois URLs completamente diferentes, cada um assinado de novo pelo chip.

Penso numa tag NFC comum como um letreiro impresso na montra de uma loja. Qualquer pessoa o pode fotografar e imprimir uma cópia idêntica. Uma tag SUN é mais como um segurança que lhe entrega um recibo novo, numerado individualmente e carimbado, sempre que entra. Copiar o recibo de ontem não lhe serve de nada, porque o número de hoje é diferente e só o carimbo do segurança é verdadeiro.

## Porque é que uma tag NTAG 424 DNA clonada é apanhada

Esta é a parte que responde à minha pergunta original. Um falsificador consegue, sem dúvida, clonar o *conteúdo* de uma tag. Consegue ler o URL, copiá-lo byte a byte e gravá-lo num chip virgem. Isto sempre foi verdade.

O que não consegue é produzir a próxima assinatura válida. A chave de assinatura vive dentro do chip genuíno e nunca sai, nem sequer durante um toque. Isto significa que um toque só tem valor para algo que possua efetivamente a chave. Num sistema real de proteção de marca, o link da tag aponta para um servidor gerido pelo fabricante, e é esse servidor que desencripta cada toque, recalcula a assinatura para confirmar que a chave corresponde, e vai acompanhando o contador à medida que sobe.

Essa última parte é o que apanha um clone. O único URL que um falsificador consegue colocar numa imitação é um que tenha capturado de um toque genuíno, congelado com o contador que esse toque por acaso trazia. Repita-o e o servidor está a olhar para um número que já viu antes, e o contador de um chip verdadeiro só avança, por isso uma repetição ou um passo atrás denuncia a fraude. Para enviar um contador novo e mais alto com uma assinatura que ainda bata certo, precisaria da chave, e para obter a chave teria de quebrar o AES ou de abrir fisicamente o chip. Nenhuma das duas coisas vai acontecer por causa de uma mala falsa.

Esta é a versão honesta da frase de marketing. O chip não torna o *produto* impossível de copiar. Torna a *prova de autenticidade* impossível de copiar, e transfere essa prova para algo que o falsificador não consegue reproduzir.

## Como a NFC.cool verifica se uma tag é genuína

Assim que percebi as tags, quis que a aplicação fizesse tudo como deve ser, não apenas mostrar um despejo hexadecimal. Por isso, a NFC.cool Tools tem agora um suporte completo de NTAG 424 DNA no [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-pt&mt=8) e no [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-pt), e verifica a autenticidade de duas formas independentes, mais uma terceira, física, nas tags feitas para isso.

**A origem do chip.** Cada chip NXP genuíno traz uma assinatura de fábrica sobre o seu próprio ID, assinada com a chave privada da NXP. A NFC.cool lê essa assinatura e verifica-a contra a chave pública da NXP, no próprio telemóvel. Se bater certo, obtém um resultado simples: "NXP genuíno". Esta verificação não precisa de configuração nem de chaves suas. Responde à pergunta "isto é silício NXP verdadeiro ou um clone sem nome?".

**O próprio toque.** Esta é a verificação SUN. A NFC.cool desencripta o `picc_data`, extrai o ID da tag e o contador de toques, recalcula a assinatura e compara-a com o `cmac` que a tag enviou. Se corresponderem, o toque é genuíno e recente, e vê "Autêntico". Esta verificação prova mais, por isso pede mais: precisa da chave da tag. Uma tag acabada de sair da fábrica, ainda com a predefinição de origem, verifica-se sem qualquer introdução de dados. Uma tag que alguém bloqueou com a sua própria chave só se verifica como autêntica se tiver essa chave guardada.

**O selo físico, nas tags feitas para isso.** Uma versão destas, a NTAG 424 DNA TagTamper, é feita para ser um selo à prova de adulteração. É um autocolante com um fino fio extra a atravessá-lo, e cola-o sobre aquilo que quiser proteger, sobre a aba de uma caixa ou à volta da tampa de uma garrafa, o mesmo trabalho que os autocolantes de "garantia anulada se rompido" fazem hoje. Abra o artigo e rasga o autocolante, o que parte o fio. A NFC.cool verifica esse fio num toque e diz-lhe claramente se o selo continua intacto ou se foi quebrado. A parte engenhosa é que se trata de um trinco de sentido único: parta-o uma vez e o chip lembra-se para sempre, por isso algo que foi aberto e depois cuidadosamente voltado a selar continua a ser lido como aberto. A criptografia prova que o chip é genuíno; isto prova que ninguém entrou na caixa.

Tudo isto é gratuito para toda a gente. Ler uma tag - o seu link, o seu contador de toques, a disposição dos seus ficheiros, se o seu selo continua intacto - e executar ambas as verificações criptográficas não custa nada. Quis que a pergunta "isto é verdadeiro?" pudesse ser respondida por qualquer pessoa que toque numa.

## Programar as suas próprias tags seguras

Ler é metade da história. A outra metade é que aquelas tags virgens do AliExpress são suas para programar, e a NFC.cool fá-lo através de um canal devidamente autenticado e encriptado, a mesma mensagem segura que o chip exige, não uma gravação em bruto feita à sorte.

A versão simples são três passos. Grave o seu próprio link, o que é gratuito. Ative o SUN para que a tag comece a assinar cada toque. E substitua a chave de fábrica pela sua, definida como uma frase-passe para que não haja nenhuma cadeia hexadecimal de 32 caracteres com que lidar, guardada no seu porta-chaves. A partir desse momento, a tag fica bloqueada a si: continua a provar que é genuína a quem quer que lhe toque, mas só você a pode voltar a programar.

Era aqui que eu podia ter parado. As poucas aplicações que sequer se aproximam destas tags param. Eu não parei.

## Configure todo o chip NTAG 424 DNA a partir do iPhone ou do Android

A certa altura de uma semana de noitadas com estas tags, tomei uma decisão: a NFC.cool Tools ia cobrir 100% da especificação do NTAG 424 DNA, não a fatia amigável para demonstrações em que todos os tutoriais de "toque para verificar" param. Se quero que esta seja a melhor aplicação de NFC que existe, então "suportamos NTAG 424 DNA" não pode significar, em surdina, "suportamos a única chave e o único modo que eram fáceis". Por isso, percorri a ficha técnica e construí o resto.

Um chip NTAG 424 DNA não tem uma chave. Tem cinco. A NFC.cool gere agora todas elas - altere qualquer posição, reponha-a nas definições de fábrica, ou introduza uma chave que definiu noutro dispositivo para que este telemóvel também possa controlar a tag. O SUN também não tem de assinar com essa chave principal: pode apontar a encriptação do toque para uma chave e a sua assinatura para outra, e decidir se a tag reflete o seu ID às claras ou o mantém encriptado.

Cada ficheiro no chip tem as suas próprias regras de acesso, e agora pode editá-las - quem pode ler um ficheiro, quem o pode gravar, quem pode alterar as suas definições - cada uma definida para uma chave específica, ou totalmente aberta, ou fechada para sempre. Por baixo dos ficheiros está a própria configuração do chip, e também está aqui: ative um ID aleatório para que a tag deixe de difundir o mesmo número de série a cada leitor por que passa (um verdadeiro ganho de privacidade), limite quantas tentativas de desbloqueio falhadas tolera antes de se bloquear, e um punhado de opções de nível mais baixo em que a maioria das pessoas nunca precisará de tocar.

O chip até guarda um pequeno cofre privado. Há nele um ficheiro encriptado, bloqueado à sua Key 0, que viaja na própria tag em vez de viver num servidor. Guarde nele um pequeno segredo, algo que queira que viaje com a tag em vez de ficar na base de dados de alguém, e só a sua chave o consegue voltar a ler. A NFC.cool grava-o e lê-o por si.

Se alguma vez fez isto antes, fê-lo a uma secretária. A NXP disponibiliza uma ferramenta para Windows chamada TagXplorer. Liga um leitor USB ao computador e navega pela configuração do chip a partir daí. A NFC.cool faz exatamente as mesmas coisas, mas é feita para ser usada, não para ser aturada. Enquanto o TagXplorer é uma aplicação de secretária cheia de hexadecimal em bruto e campos crípticos, a NFC.cool são ecrãs em linguagem simples no telemóvel que já tem no bolso, com uma frase-passe em vez de uma chave em bruto e um aviso antes de qualquer coisa permanente. Controla tudo encostando o telemóvel à tag durante um segundo ou dois.

## O que é o modo LRP do NTAG 424 DNA, e as alterações que não pode desfazer

E depois há o LRP. Nas minhas notas de design para a primeira versão, mesmo ao lado de "modo LRP", tinha escrito "não planeado - exótico, desnecessário para uma aplicação de consumo". LRP significa Leakage-Resilient Primitive, e é o modo genuinamente paranoico da tag. Normalmente, o chip guarda as suas chaves com AES comum, e roubar uma chave implicaria quebrar o próprio AES. Mas há uma linha de ataque mais manhosa: coloque um chip numa bancada, observe a ligeira oscilação no consumo de energia e o zumbido eletromagnético enquanto executa a criptografia e, com um número suficiente desses rastos, consegue reconstruir a chave secreta apenas a partir da fuga, sem nunca tocar na matemática. O LRP é um canal seguro reconstruído, concebido para não dar a essa fuga nada a que se agarrar. É um verdadeiro exagero para um autocolante numa garrafa de vinho, e é por isso que a maioria das tags nunca o ativa e a maioria das ferramentas nunca aprende a falá-lo. Ainda assim, continuou a martelar-me a cabeça, e "cobrir toda a especificação" não vem com uma nota de rodapé que diga "exceto a parte difícil", por isso construí-o. A NFC.cool fala agora LRP, o que significa que, mesmo depois de uma tag ser mudada para esse modo, um interruptor de sentido único que não pode reverter, a aplicação continua a conseguir autenticar-se nela e a geri-la como qualquer outra. Não conheço outra aplicação de telemóvel que vá até aí.

Vou ser direto quanto aos riscos, porque agora há mais deles. Muitos destes comandos são permanentes. Ativar o LRP não pode ser desfeito. Ativar um ID aleatório não pode ser desfeito. Defina a permissão de "alteração" de um ficheiro para Nunca e congelou esse ficheiro para o resto da vida da tag. Uma chave errada pode bloquear uma posição para sempre. A aplicação não se cala quanto a isto no momento, as ações verdadeiramente irreversíveis obrigam-no a confirmar através de um aviso que explica a consequência exata, mas vale a pena dizê-lo aqui também: pratique numa tag sobresselente antes de tocar numa tag de que gosta.

## Onde as tags NFC antifalsificação são realmente usadas

Sinceramente? A maioria das pessoas que toca numa tag NFC nunca precisa de nada disto, e não há problema nenhum nisso. Um autocolante que abre um link é uma coisa maravilhosa, aborrecida e útil.

Mas depois de segurar uma destas na mão, os casos de uso tornam-se óbvios. Uma mala de luxo pode provar que é genuína. Uma garrafa de vinho ou de whisky pode mostrar que nunca foi discretamente aberta e reabastecida com algo mais barato, com o selo antiadulteração a tratar dessa metade. Uma caixa de medicamentos responde tanto pelo verdadeiro fármaco lá dentro como por um selo que ninguém quebrou. Um produto de série limitada ou uma obra de arte ganha um certificado que ninguém consegue forjar, e os bilhetes de eventos deixam de ser algo de que se tira uma captura de ecrã e se passa por aí. Coloque uma tag junto a uma porta ou numa prateleira e um toque prova que alguém esteve mesmo ali, em vez de reproduzir um link guardado a partir do sofá. Ténis e cartas colecionáveis provam que são o lançamento verdadeiro e não uma boa imitação. E qualquer criador independente pode fazer com que a sua coisa prove que é *a sua* coisa. É o mesmo problema de autenticidade que o [Passaporte Digital de Produto da UE](/blog/eu-digital-product-passport-2026/) está a abordar pelo lado da regulação, resolvido ao nível do objeto individual.

Não construí isto porque mil utilizadores o pediram. Construí-o porque comprei umas tags estranhas na internet por curiosidade, percebi como funcionavam, e depois não consegui deixar uma única página da ficha técnica por virar. Normalmente, é assim que começam as boas funcionalidades.

## A conclusão sobre as tags NTAG 424 DNA

As tags NTAG 424 DNA são o mais próximo que o NFC tem de um selo à prova de adulteração. Não conseguem impedir que alguém copie um produto, mas tornam a *prova de que o produto é genuíno* impossível de falsificar, porque essa prova é uma assinatura criptográfica nova que só o chip verdadeiro consegue produzir.

A NFC.cool Tools lê-as agora, verifica o chip, o toque e o selo antiadulteração gratuitamente, e entrega-lhe o chip inteiro para configurar - cada chave, as permissões de cada ficheiro, as suas definições de mais baixo nível, até o LRP - para preparar as suas a partir do próprio telemóvel. Se alguma vez se perguntou como é que um toque consegue distinguir o verdadeiro do falso, obtenha-a no [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-pt&mt=8) ou no [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-pt), encomende um par [destas tags](/affiliate-links/) por uns euros, e toque numa você mesmo. É o tipo de coisa em que vale a pena perder-se.
