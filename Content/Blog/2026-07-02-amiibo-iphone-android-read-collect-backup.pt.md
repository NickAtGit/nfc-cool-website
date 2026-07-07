---
id: "amiibo-iphone-android-read-collect-backup-2026-07"
title: "Ler, colecionar e fazer backup de Amiibo no iPhone e no Android"
date: "2026-07-02"
tags: ["announcements", "iphone", "android"]
summary: "Quero que a NFC.cool seja a melhor app de NFC no iPhone e no Android, por isso dei-lhe suporte completo para Amiibo: leia uma figura para ver os detalhes, monte uma coleção pessoal e faça o backup de uma para um NTAG215 em branco. Eis como os Amiibo funcionam mesmo por dentro - e porque a app não inclui nenhuma chave."
image: "/assets/images/Blog/amiibo-iphone-android-read-collect-backup.webp"
imageAlt: "Uma figura colecionável NFC imaginária ao lado de um telemóvel a mostrar um ecrã de coleção privada"
author: "Nicolo Stanciu"
metaTitle: "Amiibo no iPhone e Android: ler, colecionar, fazer backup"
metaDescription: "A NFC.cool lê Amiibo no iPhone e no Android, guarda uma coleção e faz o backup deles para tags NTAG215 em branco. Como os Amiibo funcionam por dentro e os limites honestos."
ogTitle: "Ler, colecionar e fazer backup de Amiibo no iPhone e no Android"
ogDescription: "Dei à NFC.cool suporte completo para Amiibo - ler, colecionar e fazer o backup de uma para uma tag em branco. Eis como os Amiibo realmente funcionam e porque a app não inclui chaves."
---
As pessoas assumem que há algo de exótico dentro de um Amiibo. Um pedaço de silício da Nintendo que não se compra em mais lado nenhum. Não há. Selado na base da figura está um [NTAG215](/affiliate-links/) - o mesmo chip autocolante em branco que leio e gravo todos os dias, do tipo que vem dez por embalagem por trocos. Cerca de 540 bytes de memória, um número de série gravado de fábrica, e é isto a figura toda. O plástico é a parte cara. O chip é quase um pormenor secundário.

E foi exatamente por isso que me incomodou durante tanto tempo. Leio e gravo tags NFC para viver, e havia toda uma categoria delas - um punhado de figuras na prateleira ao lado da minha secretária - que a minha própria app simplesmente ignorava. Quero que a NFC.cool seja a app de NFC mais capaz que se pode ter no telemóvel, aquela que não deixa nenhum tipo de tag de fora.

Por isso sentei-me, as figuras de um lado e a minha Switch do outro, e dei à NFC.cool suporte a sério para Amiibo. Eis no que isso resultou, e o que aprendi pelo caminho - a começar por porque é que um chip tão barato é tão surpreendentemente difícil de copiar.

---

## Então onde está a magia?

Se o chip é assim tão banal, a magia claramente não está no silício. Está nos bytes. Um Amiibo é, na verdade, um caderno barato que a Nintendo escreveu num código privado e depois assinou no fundo, para que se distinga uma falsificação do original. (O chip em si é um simples [NTAG215](/blog/nfc-tag-types-for-iphones/), se quiser a visita guiada mais aprofundada aos tipos de tag.)

Duas coisas vivem nesses bytes. A primeira está à vista de todos: um pequeno bloco que diz qual é a personagem - o Link, da série Legend of Zelda, numa linha específica de Amiibo. É a parte que a sua Switch lê para saber que uma figura acabou de lhe tocar. A segunda parte está bloqueada: os dados de gravação propriamente ditos, como uma alcunha, o Mii do dono, quantas vezes a figura foi usada e o que quer que o jogo atual tenha rabiscado no pequeno bloco de notas que lhe é permitido usar. Essa parte está cifrada e está assinada.

## Porque não se pode simplesmente copiar um Amiibo

A gravação cifrada não está protegida por uma chave fixa que se pudesse consultar uma vez e reutilizar para sempre. Cada tag tem as suas próprias chaves, derivadas na hora a partir de um conjunto de chaves-mestras misturadas com dados retirados dessa tag específica - incluindo o seu número de série único. Além disso, o conjunto todo é assinado com um HMAC. Mude um único byte sem o voltar a assinar e a consola deteta a falsificação e recusa a figura.

E aqui está a armadilha. Como o número de série está integrado tanto na derivação das chaves como na assinatura, não se pode extrair um Amiibo verdadeiro e copiá-lo byte a byte para uma tag em branco. A tag em branco tem um número de série diferente, por isso cada chave derivada sai diferente, a assinatura deixa de corresponder e a consola rejeita-a. A abordagem óbvia de "copiar todas as páginas" falha sempre.

Para fazer uma cópia válida, é preciso voltar a derivar as chaves em relação à tag de destino e voltar a assinar os dados, para que sejam válidos para aquele exato pedaço de plástico e silício, e não para aquele de onde os extraiu. A implementação de referência sobre a qual toda a gente constrói é uma ferramenta chamada amiitool. Reconstruí toda essa dança de forma nativa dentro da app - formato da tag para formato interno e de volta, derivação de chaves, cifragem, assinatura - para que a NFC.cool o consiga fazer no telemóvel que tem na mão, sem nenhum computador pelo meio.

## O que a NFC.cool faz agora

Três coisas, pela ordem em que provavelmente as vai usar.

**Ler.** Encoste um Amiibo às costas do telemóvel, tal como faria para [ler qualquer tag NFC](/features/nfc-reader-writer/), e a NFC.cool identifica-o na hora: a personagem, a série do jogo, a série do Amiibo, o tipo de figura e a arte, além de alguns dados da própria tag, como quantas vezes foi gravada. Para isto não são precisas chaves. Identificar uma figura só toca na parte que já está à vista.

**Colecionar.** Cada Amiibo que lê é guardado em A Minha Coleção, uma grelha simples de tudo o que possui. Fica no seu dispositivo - no iPhone sincroniza com os seus outros dispositivos Apple através do iCloud - e a arte fica em cache, para que a coleção continue com bom aspeto mesmo offline. Só isso transformou a minha pobre prateleira em algo que posso mesmo percorrer.

**Fazer backup e restaurar.** Com as suas próprias chaves importadas, pode gravar uma cópia com novas chaves de uma figura num NTAG215 em branco. Pode fazer o backup de uma diretamente a partir de uma figura que acabou de ler, ou restaurar a partir de um ficheiro `.bin` guardado no seu dispositivo. A app volta a derivar as chaves para a tag em branco que tem na mão e assina os dados para essa tag, por isso a cópia é válida por si mesma, em vez de uma falsificação byte a byte condenada ao fracasso. A gravação é permanente - depois de a tag ser bloqueada, fica bloqueada - e a app di-lo claramente antes de avançar.

## O que fica deliberadamente de fora

A NFC.cool não inclui as chaves dos Amiibo, e nunca incluirá. Não há chaves escondidas na app, nem qualquer biblioteca de dados de Amiibo integrada.

Ler e colecionar funcionam de imediato, porque só tocam na parte aberta da tag. Fazer o backup é diferente: precisa das chaves-mestras, e essas são da Nintendo, não minhas. Se as obteve por conta própria - o `key.bin` combinado, ou os dois ficheiros separados - importa-as para a app uma vez e a funcionalidade de backup ativa-se. Se não as tiver, fica desativada. Eu construí a máquina; o combustível é você que o traz.

Acho que é a linha honesta a seguir. A capacidade é genuinamente útil. Fazer uma cópia de segurança de uma figura que o seu filho está a uma tarde má de perder, ou pôr um suplente num cartão barato em vez de arriscar o original, são razões reais pelas quais as pessoas querem isto. Prefiro dar-lhe uma forma limpa e privada de o fazer no seu próprio telemóvel do que fingir que a procura não existe. Mas não vou distribuir algo que nunca foi meu para distribuir.

## Que fique claro

Duas coisas sobre as quais quero ser direto.

Primeiro, esta é a minha app, não da Nintendo. A NFC.cool não é feita, afiliada, aprovada nem patrocinada pela Nintendo. Amiibo, Nintendo Switch e os títulos de jogos que menciono são marcas registadas dos respetivos donos, e só os nomeio para que saiba com o que a funcionalidade é compatível.

Segundo, as ferramentas de backup e restauro estão aqui para uso educativo e pessoal: proteger figuras que já possui. Faça um suplente daquela que o seu filho não para de deixar cair, ou mantenha um original na caixa enquanto um NTAG215 barato leva o desgaste do dia a dia. É para esse uso que a construí. Traga as suas próprias chaves, faça apenas o backup de figuras que realmente possui e respeite os direitos da Nintendo e o que quer que a lei diga onde vive. O que faz com a ferramenta é da sua responsabilidade.

## Funciona mesmo

Não queria lançar isto por fé, por isso testei-o da única forma que conta.

Li uma das minhas próprias figuras, fiz-lhe o backup para um NTAG215 em branco e levei a cópia até à minha Switch. Abri The Legend of Zelda: Tears of the Kingdom, encostei a cópia ao Joy-Con direito e ele deixou cair um punhado de itens no meu inventário. Igual ao original. Sem reclamações, sem "este Amiibo não pode ser lido". Foi nesse momento que a coisa toda me pareceu real. Toda aquela matemática de derivação de chaves e aqueles esquemas de bytes, e o resultado é um autocolante barato em branco que uma consola da Nintendo trata alegremente como a figura verdadeira.

---

Aquela prateleira ao lado da minha secretária já não é só decoração. É uma funcionalidade.

Se quiser experimentar, as ferramentas para Amiibo estão na NFC.cool no [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-amiibo-iphone-android-read-collect-backup-pt&mt=8) e no [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-amiibo-iphone-android-read-collect-backup-pt), mesmo ao lado de tudo o resto que construí para ler e gravar tags. Traga as suas próprias chaves, encoste uma figura e veja o que a sua app tem andado a ignorar em silêncio este tempo todo.
