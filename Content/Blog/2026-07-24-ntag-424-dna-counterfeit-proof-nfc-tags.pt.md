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

Há algum tempo, não parava de ler a mesma afirmação de passagem: as marcas de luxo estão a colocar chips NFC nos seus produtos para que possa tocar com o telemóvel numa mala ou num par de ténis e saber que é o artigo verdadeiro, não uma imitação. Todos os artigos repetiam a mesma frase feita e nenhum explicava *como*. O que impede realmente um falsificador de copiar o chip juntamente com a mala?

Por isso, fiz aquilo que faço sempre quando fico curioso sobre uma tag. Fui ao AliExpress, encontrei um anúncio de tags "NTAG 424 DNA", encomendei um pequeno lote e esperei que o envelope aparecesse. Uns euros, um par de semanas, e tinha em cima da secretária o mesmo silício em que assentam esses sistemas de proteção de marca. Depois encostei uma ao telemóvel para ver o que faz.

---

## O que é realmente uma tag NTAG 424 DNA

Por fora, é uma tag NFC vulgar. Não a conseguiria distinguir de um monte de tags baratas, e qualquer telemóvel a lê sem se queixar. Se leu o meu [guia sobre os tipos de tags NFC](/blog/nfc-tag-types-for-iphones/), encaixa-se como mais uma tag de Tipo 4 que o seu iPhone lê de bom grado.

A parte do "DNA" é o que faz a diferença. Lá dentro, o chip guarda algumas chaves AES-128 e um pequeno motor criptográfico, e consegue fazer algo que nenhum NTAG215 comum ou autocolante de uma embalagem de dez consegue: consegue *assinar* cada um dos toques. Essa assinatura é tudo o que importa. É a diferença entre uma tag que diz "aqui está um link" e uma tag que diz "aqui está um link, e aqui está a prova criptográfica de que eu, este chip genuíno específico, sou quem o está a servir, neste preciso momento".

É por isto que as marcas de luxo estão realmente a pagar - não pelo link, mas pela prova de que é um chip genuíno a servi-lo.

---

## Como funcionam o SUN e o SDM: um link que se reescreve a cada toque

Foi aqui que a ficha me caiu. Quando olhei para o que a tag estava realmente a enviar, percebi que já tinha construído a maior parte da maquinaria para o compreender.

No início deste ano, lancei a [funcionalidade Contador de Toques NFC](/blog/count-nfc-tag-scans/): uma tag que conta quantas vezes foi lida e coloca esse número no URL, para que um link possa saber que é a 47.ª vez que alguém a leu. Uma tag NTAG 424 DNA é essa mesma ideia, com uma camada de encriptação à volta que a torna impossível de falsificar.

O mecanismo chama-se **SUN** (Secure Unique NFC), ou **SDM** (Secure Dynamic Messaging) se estiver a ler a [ficha técnica da NXP](https://www.nxp.com/docs/en/data-sheet/NT4H2421Gx.pdf). Guarda um link normal na tag, algo como `https://example.com`. Mas diz ao chip para reescrever partes desse link em tempo real de cada vez que é tocada. Por isso, o que o seu telemóvel recebe na verdade é mais parecido com:

`https://example.com/?picc_data=A1B2...&cmac=9F3C...`

Estes dois valores não são decoração. `picc_data` é uma cópia encriptada do ID real da tag mais um contador de toques, baralhada com uma chave que nunca sai do chip. `cmac` é uma assinatura criptográfica sobre esses dados. Ambos mudam a cada toque. Toque duas vezes na mesma tag e obtém dois URLs completamente diferentes, cada um assinado de novo pelo chip.

Penso numa tag NFC comum como um letreiro impresso na montra de uma loja. Qualquer pessoa o pode fotografar e imprimir uma cópia idêntica. Uma tag SUN é mais como um segurança que lhe entrega um recibo novo, numerado individualmente e carimbado, sempre que entra. Copiar o recibo de ontem não lhe serve de nada, porque o número de hoje é diferente e só o carimbo do segurança é verdadeiro.

---

## Porque é que uma tag NTAG 424 DNA clonada é apanhada

Esta é a parte que responde à minha pergunta original. Um falsificador consegue, sem dúvida, clonar o *conteúdo* de uma tag. Consegue ler o URL, copiá-lo byte a byte e gravá-lo num chip virgem. Isto sempre foi verdade.

O que não consegue é produzir a próxima assinatura válida. A chave de assinatura vive dentro do chip genuíno e nunca sai, nem sequer durante um toque. Isto significa que um toque só tem valor para algo que possua efetivamente a chave. Num sistema real de proteção de marca, o link da tag aponta para um servidor gerido pelo fabricante, e é esse servidor que desencripta cada toque, recalcula a assinatura para confirmar que a chave corresponde, e vai acompanhando o contador à medida que sobe.

Essa última parte é o que apanha um clone. O único URL que um falsificador consegue colocar numa imitação é um que tenha capturado de um toque genuíno, congelado com o contador que esse toque por acaso trazia. Repita-o e o servidor está a olhar para um número que já viu antes, e o contador de um chip verdadeiro só avança, por isso uma repetição ou um passo atrás denuncia a fraude. Para enviar um contador novo e mais alto com uma assinatura que ainda bata certo, precisaria da chave, e para obter a chave teria de quebrar o AES ou de abrir fisicamente o chip. Nenhuma das duas coisas vai acontecer por causa de uma mala falsa.

Esta é a versão honesta da frase de marketing. O chip não torna o *produto* impossível de copiar. Torna a *prova de autenticidade* impossível de copiar, e transfere essa prova para algo que o falsificador não consegue reproduzir.

---

## O que há dentro do chip

Tudo o que a NFC.cool faz com estas tags ganha muito mais sentido quando se tem a estrutura do chip na cabeça, por isso aqui fica o mapa que tive de montar antes de conseguir escrever uma única linha de código.

Um NTAG 424 DNA é uma tag de Tipo 4 do NFC Forum com 416 bytes de memória, organizados, na terminologia da NXP, numa única aplicação com três ficheiros fixos. Não é possível criar nem apagar ficheiros como num MIFARE DESFire. Estes três são tudo o que há:

| Ficheiro | Tamanho | O que guarda |
| --- | --- | --- |
| File 01 | 32 bytes | O "capability container", que indica ao telemóvel onde estão os dados NDEF |
| File 02 | 256 bytes | A mensagem NDEF, normalmente o seu link. É aqui que o SUN espelha os seus valores dinâmicos a cada leitura |
| File 03 | 128 bytes | Um ficheiro proprietário que o chip pode manter encriptado. A NFC.cool usa-o como cofre, mais sobre isso adiante |

Ao lado dos ficheiros estão cinco chaves AES-128, numeradas de Key 0 a Key 4. A **Key 0** é a chave mestra dessa aplicação: é com ela que se autentica para alterar o link, ativar o SUN, mudar qualquer outra chave ou mexer na configuração do chip. As Key 1 a Key 4 não fazem nada sozinhas. Só passam a contar quando as permissões de acesso de um ficheiro ou a configuração do SUN apontam para elas. Numa tag acabada de sair da fábrica, as cinco chaves são dezasseis bytes a zero e o ficheiro NDEF pode ser gravado por qualquer pessoa, e é por isso que uma tag nova aceita um link simples sem qualquer cerimónia.

Todos os comandos que alteram alguma coisa correm dentro de uma sessão autenticada: o telemóvel e o chip fazem um desafio-resposta mútuo com uma dessas chaves, derivam daí chaves de sessão e, a partir desse momento, cada comando leva um MAC ou segue totalmente encriptado. É a essa comunicação segura que o resto do artigo se vai referindo. A NFC.cool implementa-a por completo, no iPhone e no Android, e todas as gravações descritas abaixo passam por ela.

---

## O que um toque revela

Encoste uma tag ao telemóvel e a NFC.cool Tools no [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-pt&mt=8) ou no [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-pt) faz uma leitura aprofundada sem lhe pedir nada: a identidade do chip e se é a variante TagTamper, o link, as definições e as permissões de acesso de cada ficheiro, que posições de chave já não estão nos valores de fábrica, e o resultado de três verificações distintas.

### É silício NXP genuíno?

Cada NTAG 424 DNA sai da fábrica com uma **assinatura de originalidade**: uma assinatura ECDSA sobre o UID de sete bytes do próprio chip, feita com a chave privada da NXP na curva P-224. A NFC.cool lê-a e confirma-a com a chave pública que a NXP publicou, no próprio telemóvel, sem precisar de nenhuma chave sua. Se bater certo, a aplicação mostra "NXP genuíno". Isto responde à primeira pergunta: é silício NXP verdadeiro ou um chip parecido que apenas responde pelo mesmo nome?

### Este toque é autêntico?

Esta é a verificação SUN. A aplicação pega no `picc_data` e no `cmac` do link que a tag acabou de servir, desencripta os dados PICC para obter o UID e o contador de leituras, recalcula o CMAC e compara-o com o que a tag enviou. Se os dois coincidirem, vê "Autêntico" e o contador aparece como "Contador de leituras".

Esta verificação precisa da chave da tag, porque é precisamente essa a sua razão de ser. Uma tag ainda com as chaves de fábrica verifica-se com a chave toda a zeros. Uma tag que bloqueou com a sua própria chave verifica-se com a chave que a NFC.cool guardou quando a definiu. Uma tag que outra pessoa bloqueou com uma chave que você não tem mostra "Não verificado", que é a resposta correta.

### O selo foi quebrado?

Uma versão destes chips, o **NTAG 424 DNA TagTamper**, foi feita para funcionar como selo antiadulteração. É um autocolante atravessado por um fino circuito condutor. Cola-o sobre o que quiser proteger, sobre a aba de uma caixa ou à volta da tampa de uma garrafa, o mesmo trabalho que os autocolantes de "garantia anulada se rompido" fazem hoje. Abra o artigo e rasga o autocolante, o que interrompe o circuito.

O chip regista duas coisas sobre esse circuito: um trinco permanente que memoriza se *alguma vez* foi aberto, e o estado atual, neste preciso momento. A NFC.cool lê ambos a cada toque e indica "Selado", "Aberto" ou, o que mais importa, "Aberto, voltado a selar": alguém interrompeu o circuito e depois voltou a fechá-lo com cuidado. O trinco é de sentido único, por isso uma caixa selada de novo continua a ler-se como aberta para o resto da vida do chip. A criptografia prova que o chip é genuíno. Isto prova que ninguém mexeu na caixa.

---

## Programar as suas próprias tags: a versão curta

Ler é metade da história. A outra metade é que aquelas tags virgens do AliExpress são suas para programar, e a configuração mínima resume-se a três passos.

1. **Grave o seu link.** Uma gravação NDEF normal, igual à de qualquer outra tag.
2. **Ative o SUN.** A aplicação grava o seu link com espaços reservados e diz ao chip para espelhar neles, a cada leitura, o seu UID encriptado, o contador de toques e a assinatura. A partir daí, cada toque produz um URL único e assinado.
3. **Defina a sua própria Key 0.** Isto substitui os zeros de fábrica por uma chave que só você conhece, para que mais ninguém possa reconfigurar a tag.

Nesse último passo, escreve uma frase-passe, não uma chave. A NFC.cool deriva a chave AES a partir dela, usando os primeiros 16 bytes do hash SHA-256 da frase-passe, exatamente da mesma forma no iPhone e no Android, para que uma tag preparada num deles abra com a mesma frase-passe no outro. Se preferir usar uma chave gerada noutro lado, pelo seu próprio servidor, por exemplo, pode simplesmente colar os 32 caracteres hexadecimais.

Uma chave perdida significa uma tag que nunca mais consegue reconfigurar, por isso a aplicação tem cuidado com o sítio onde a guarda. No iPhone, vai para o porta-chaves e sincroniza através do iCloud Keychain. No Android, é encriptada com uma chave protegida por hardware e espelhada no Block Store, para sobreviver a uma reinstalação ou a um telemóvel novo. A chave nova é guardada antes de a alteração ser enviada e, se o toque for interrompido a meio, tanto o valor antigo como o novo ficam disponíveis até a tag confirmar qual deles tem. Também pode introduzir uma frase-passe definida noutro dispositivo, e a aplicação confere-a com a tag antes de a guardar.

Há uma coisa que a aplicação recusa deliberadamente: gravar um link simples numa tag com SUN ativo através do ecrã de gravação normal. As posições de espelhamento ficam fixas para o URL com que foram configuradas, e um URL de outro comprimento deixaria o chip a espelhar para o meio do seu novo conteúdo a cada toque. O ecrã do NTAG 424 desativa primeiro o SUN e só depois grava.

---

## O resto do chip

A maioria dos tutoriais fica-se por esta versão curta, e até agora a forma de ir mais longe era o TagXplorer da NXP num computador com um leitor USB. Eu queria a ficha técnica inteira ao alcance do telemóvel, por isso percorri-a secção a secção.

### As cinco chaves

A Key 0 tem o seu próprio ecrã, e as Key 1 a Key 4 estão em "Avançado". Cada uma pode ser definida a partir de uma frase-passe ou em hexadecimal, reposta na predefinição de fábrica, ou introduzida depois de ter sido definida noutro dispositivo. Todas as alterações se autenticam com a Key 0, que é a chave com autoridade para mudar qualquer uma das cinco posições.

### SUN com as chaves que escolher

Ativar o SUN não se resume a ligar um interruptor. Escolhe o **modo**: encriptado, em que o UID viaja dentro do `picc_data` e só quem tem a chave o consegue ler, ou em texto simples, em que o UID e o contador aparecem no URL às claras e só a assinatura é secreta. E escolhe que chaves fazem o trabalho: uma **chave de meta-leitura** que encripta os dados PICC e uma **chave de leitura de ficheiro** que calcula a assinatura. Podem ser a mesma posição ou duas diferentes, e é assim que uma marca pode entregar a um parceiro a chave que verifica os toques sem entregar a chave que desencripta os UIDs.

A aplicação avisa-o se escolher uma posição ainda com os zeros de fábrica, porque uma assinatura feita com uma chave conhecida não protege nada. E a verificação acompanha essa mesma flexibilidade: um toque assinado com a Key 3 e encriptado com a Key 1 verifica-se corretamente, desde que essas chaves estejam guardadas no telemóvel.

### Permissões de acesso dos ficheiros

Cada ficheiro tem quatro permissões: "Ler", "Escrever", "Ler e escrever" e "Alterar", sendo esta última a que decide quem pode editar as outras três. Cada permissão aponta para uma das cinco chaves, para "Livre" (qualquer pessoa) ou para "Nunca" (ninguém, jamais). Pode assim dizer "qualquer pessoa pode ler o File 02, só a Key 2 o pode gravar e só a Key 0 pode alterar estas regras", e o chip faz cumprir isso sem nenhuma aplicação pelo meio.

A NFC.cool mostra as permissões atuais de cada ficheiro e deixa-o editá-las, com dois avisos incorporados. Diz-lhe quando uma permissão aponta para uma chave que este telemóvel não tem, porque pode acabar por perder o acesso à sua própria tag. E obriga-o a confirmar num passo à parte antes de definir "Alterar" como "Nunca", porque, uma vez gravado isso, as regras desse ficheiro ficam congeladas para o resto da vida do chip.

### Configuração do chip

Por baixo dos ficheiros está a configuração do próprio chip, que a NXP expõe através de um único comando SetConfiguration. A NFC.cool cobre estas opções:

- **UID aleatório.** Normalmente, o chip apresenta o mesmo UID fixo a todos os leitores, o que permite a qualquer pessoa seguir uma tag de toque em toque. Com o UID aleatório ativo, responde de cada vez com um ID aleatório novo e só revela o verdadeiro depois de se autenticar. Um verdadeiro ganho de privacidade, e permanente. A aplicação identifica as tags pelo UID, por isso recupera depois o verdadeiro experimentando cada Key 0 que conhece num GetCardUID autenticado, e a tag continua a poder ser gerida no telemóvel que a preparou.
- **Limite de autenticações falhadas.** Quantas tentativas com a chave errada o chip tolera antes de bloquear a Key 0. É uma proteção contra a adivinhação de chaves, mas, se o definir demasiado baixo, bastam uns quantos toques falhados para bloquear a chave mestra de vez.
- **Intensidade da modulação de retorno.** Forte ou normal. A normal pode ser ilegível em antenas pequenas, por isso o mais sensato é deixar a predefinição como está.
- **Escrita encadeada.** Pode ser desativada, limitando cada gravação a uma única trama. Permanente.
- **Bytes de capacidade.** Dois bytes livres que a NXP reserva para o que quiser fazer com eles.
- **LRP.** O interruptor da comunicação segura, que tem a sua própria secção mais abaixo.

### O cofre

O File 03 é um ficheiro proprietário de 128 bytes que o chip pode manter encriptado, e a NFC.cool transforma-o num pequeno depósito privado na própria tag, a que chama "Cofre". Na primeira vez que guarda alguma coisa, a aplicação passa o ficheiro para o modo totalmente encriptado e tranca todas as permissões de acesso à Key 0. A partir daí, o cofre guarda até 126 bytes de texto que só a sua chave consegue voltar a ler, e uma leitura aprofundada a partir de qualquer outro telemóvel recebe um erro de permissão e nada mais.

Serve para guardar um segredo que deva viajar com o objeto em vez de ficar parado na base de dados de alguém: um número de série, um recado para si mesmo daqui a uns anos, um token que o seu próprio servidor espera. Repor a Key 0 nos valores de fábrica apaga-o, e essa é a única forma de o cofre desaparecer.

---

## O modo LRP

Normalmente, o chip protege as chaves com AES comum, e roubar uma chave implicaria quebrar o próprio AES. Mas há uma linha de ataque mais manhosa. Coloca-se o chip numa bancada, medem-se as ligeiras variações no consumo de energia e nas emissões eletromagnéticas enquanto executa a cifra e, com um número suficiente desses rastos, reconstrói-se a chave apenas a partir da fuga, sem nunca tocar na matemática. O **LRP**, Leakage-Resilient Primitive, é um canal seguro reconstruído de raiz para não dar a essa fuga nada a que se agarrar. A NXP documenta-o na nota de aplicação AN12304. Para um autocolante numa garrafa de vinho é um exagero completo, e é por isso que a maioria das tags nunca o ativa e a maioria das ferramentas nunca aprende a falá-lo.

Nas minhas notas de design para a primeira versão, mesmo ao lado de "modo LRP", tinha escrito "não planeado". Mas aquilo não me largava, por isso construí-o. A NFC.cool consegue passar uma tag para o modo LRP e, mais importante ainda, continuar depois a autenticar-se nela e a geri-la: chaves, permissões de ficheiros, cofre, configuração do chip, tudo pelo canal LRP em vez de AES.

Duas coisas a saber antes de ligar esse interruptor. É permanente: assim que uma tag está em modo LRP, a sua comunicação segura por AES fica desativada para sempre, e qualquer ferramenta que só fale AES nunca mais consegue falar com ela. E o SUN não está disponível numa tag LRP, por isso uma tag cujo trabalho é assinar toques deve ficar em modo AES.

---

## O que não se pode desfazer

Muitos destes comandos são permanentes, e a aplicação faz questão de o dizer bem alto na altura: cada ação irreversível obriga-o a confirmar através de um aviso que explica a consequência exata. Ainda assim, vale a pena listá-los aqui também.

- Ativar o LRP.
- Ativar o UID aleatório.
- Desativar a escrita encadeada.
- Definir a permissão "Alterar" de um ficheiro como "Nunca".
- Perder uma chave. O chip não tem reposição de fábrica. Se a Key 0 desaparecer, desaparece com ela a possibilidade de reconfigurar a tag.
- Um limite de autenticações falhadas demasiado baixo, que pode bloquear a Key 0 ao fim de uns quantos toques errados.

Pratique numa tag sobresselente antes de mexer numa de que gosta.

---

## Onde as tags NFC antifalsificação são realmente usadas

Sinceramente? A maioria das pessoas que toca numa tag NFC nunca precisa de nada disto, e não há problema nenhum nisso. Um autocolante que abre um link é uma coisa maravilhosa, aborrecida e útil.

Mas depois de segurar uma destas na mão, os casos de uso tornam-se óbvios. Uma mala de luxo pode provar que é genuína. Uma garrafa de vinho ou de whisky pode mostrar que nunca foi discretamente aberta e reabastecida, com o selo antiadulteração a tratar dessa metade. Uma caixa de medicamentos responde tanto pelo verdadeiro fármaco lá dentro como por um selo que ninguém quebrou. Os bilhetes de eventos deixam de ser algo de que se tira uma captura de ecrã e se passa por aí, e uma tag junto a uma porta prova que alguém esteve mesmo ali, em vez de reproduzir um link guardado a partir do sofá. É o mesmo problema de autenticidade que o [Passaporte Digital de Produto da UE](/blog/eu-digital-product-passport-2026/) está a abordar pelo lado da regulação, resolvido ao nível do objeto individual.

Não construí isto porque mil utilizadores o pediram. Construí-o porque comprei umas tags estranhas na internet por curiosidade, percebi como funcionavam, e depois não consegui deixar uma única página da ficha técnica por virar. Normalmente, é assim que começam as boas funcionalidades.

---

## A conclusão sobre as tags NTAG 424 DNA

As tags NTAG 424 DNA são o mais próximo que o NFC tem de um selo à prova de adulteração. Não conseguem impedir que alguém copie um produto, mas tornam a *prova de que o produto é genuíno* impossível de falsificar, porque essa prova é uma assinatura criptográfica nova que só o chip verdadeiro consegue produzir.

A NFC.cool Tools lê-as, verifica o chip, o toque e o selo antiadulteração, e entrega-lhe o chip inteiro para configurar: cada chave, as permissões de cada ficheiro, as definições do próprio chip, até o LRP, tudo a partir do telemóvel. Se alguma vez se perguntou como é que um toque consegue distinguir o verdadeiro do falso, descarregue-a no [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ntag-424-dna-counterfeit-proof-nfc-tags-pt&mt=8) ou no [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ntag-424-dna-counterfeit-proof-nfc-tags-pt), encomende um par [destas tags](/affiliate-links/) por uns euros, e encoste uma ao telemóvel você mesmo. É o tipo de coisa em que vale a pena perder-se.
