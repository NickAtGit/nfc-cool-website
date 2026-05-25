---
id: nfc-blog-010
title: "Como Gravar Tags NFC com o Seu iPhone"
date: 2026-03-16
tags: ["nfc-tags", "guides", "iphone"]
summary: "O seu iPhone faz mais do que ler tags NFC - também as consegue gravar. Aqui fica um guia passo a passo para programar tags NFC com o seu iPhone, desde escolher as tags certas até gravar URLs, credenciais de Wi-Fi, cartões de contacto e automações."
image: "/assets/images/Blog/write-nfc-tags-iphone.webp"
imageAlt: "iPhone a gravar dados em tags NFC em branco com ícones de progresso e de verificação"
metaTitle: "Como Gravar Tags NFC com o Seu iPhone: Guia Passo a Passo (2026)"
metaDescription: "Saiba como gravar tags NFC com o seu iPhone. Instruções passo a passo para programar URLs, Wi-Fi, contactos e automações usando o NFC.cool Tools e os Atalhos do iOS."
ogTitle: "Como Gravar Tags NFC com o Seu iPhone"
ogDescription: "Guia passo a passo para gravar tags NFC com o seu iPhone - URLs, Wi-Fi, contactos e automações. Sem necessidade de equipamento especial."
---
A maioria das pessoas sabe que o seu iPhone consegue *ler* tags NFC - tocar para pagar, ler um cartão de transportes, abrir uma ligação. Mas aquilo de que tenho sempre de convencer as pessoas é de que o seu iPhone também consegue *gravar* em tags NFC, transformando tags em branco em acionadores inteligentes para praticamente tudo.

Passei anos a construir o NFC.cool, uma app para ler e gravar tags NFC, e gravar é genuinamente a parte de que nunca me canso. Quer uma tag na sua mesa de cabeceira que silencie o telemóvel e configure um alarme? Uma tag na sua secretária que abra a sua playlist de trabalho? Uma tag à porta de casa que partilhe a palavra-passe do Wi-Fi com as visitas? O seu iPhone consegue programar todas estas, e depois de o fazer uma vez vai perguntar-se porque é que esperou tanto.

Este é o guia que daria a um amigo que acabou de comprar o seu primeiro pacote de tags: o que precisa, como gravar os diferentes tipos de dados e os projetos práticos que eu próprio montaria em minutos. Se for totalmente novo na tecnologia em si, o meu [guia completo para principiantes sobre tags NFC](/blog/nfc-tags-beginners-guide/) cobre primeiro as bases.

---

## O Que Precisa

Só precisa de três coisas para começar a gravar, e nenhuma delas é cara.

### 1. Um iPhone Compatível

Gravar tags NFC requer um **iPhone 7 ou mais recente** com **iOS 13 ou posterior**. Se comprou o seu iPhone nos últimos oito anos, está coberto.

Para a melhor experiência, eu optaria por um iPhone com **leitura NFC em segundo plano** (iPhone XS e mais recentes). Estes modelos conseguem ler tags NFC sem abrir primeiro uma app, o que torna as tags que grava muito mais agradáveis de usar na prática. Se quiser saber exatamente como o hardware do iPhone lida com tudo isto, aprofundei o tema num [olhar de dentro sobre o NFC nos iPhone](/blog/nfc-on-iphones-insider-look/).

### 2. Tags NFC em Branco

Pode [comprar tags NFC em branco](/affiliate-links/) online por apenas **0,30 a 1,00 € cada**. Vêm em vários formatos:

| Formato | Melhor Para |
|-------------|----------|
| **Autocolantes** (redondos, 25-30 mm) | Superfícies, objetos, cartazes |
| **Cartões** (tamanho de cartão de crédito) | Carteiras, cartões de visita |
| **Porta-chaves** | Chaveiros, acessórios para sacos |
| **Pulseiras** | Eventos, controlo de acessos |
| **Tags em moeda** (discos grossos) | Embutir em objetos |

**Que chip deve comprar?**

Se me pedisse para escolher um, para a maioria dos projetos o **NTAG216** é o ponto ideal - 888 bytes de memória utilizável, amplamente compatível e acessível em quantidade. É o chip que recomendo e contra o qual mais testo. Aqui fica o resumo rápido:

- **NTAG213** (144 bytes) - Suficiente para URLs e texto simples. A opção mais barata.
- **NTAG215** (504 bytes) - Suficiente para cartões de contacto, credenciais de Wi-Fi e vários registos.
- **NTAG216** (888 bytes) - O melhor para tudo. A maior margem para cartões de contacto, credenciais de Wi-Fi e conteúdo mais longo, como vCards detalhados - o que recomendo para a maioria dos projetos.

Se estiver indeciso, comece com um pacote misto de autocolantes NTAG216 e deixe de complicar - dão conta de 90% dos casos de uso. Para o resumo completo chip a chip, incluindo os tipos de que os iPhone realmente gostam, escrevi [um guia sobre os tipos de tags NFC para iPhone](/blog/nfc-tag-types-for-iphones/).

### 3. Uma App de Gravação NFC

O seu iPhone precisa de uma app para gravar dados em tags. O suporte NFC integrado da Apple trata da leitura, mas para gravar precisa de uma app dedicada.

Esta é a parte em que passei anos, por isso vou ser franco quanto à minha parcialidade: o **[NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-en&mt=8)** foi feito de propósito para exatamente isto, tanto no iPhone como no [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-en). Suporta a gravação de todos os tipos de registo NDEF padrão - URLs, texto, configurações de Wi-Fi, contactos e mais - com uma interface limpa que mostra exatamente quanta memória da tag está a usar. Também lhe permite bloquear tags, ler detalhes técnicos e automatizar a gravação através dos Atalhos do iOS. Pode ver a lista completa de funcionalidades na [página de leitor e gravador NFC](/features/nfc-reader-writer/).

Existem outras opções (como a app Atalhos da Apple para gravação básica de URLs), mas uma app NFC dedicada dá-lhe mais controlo sobre o que grava e como.

---

## Passo a Passo: Gravar a Sua Primeira Tag NFC

Vou começar consigo onde começo com toda a gente: gravar um URL numa tag. É o caso de uso mais comum e a vitória mais rápida.

### Gravar um URL

1. **Abra o NFC.cool Tools** e toque no separador **Gravar**
2. **Selecione "URL"** como tipo de registo
3. **Introduza o seu URL** - por exemplo, `https://nfc.cool`
4. **Toque em "Gravar na Tag"**
5. **Encoste o seu iPhone à tag NFC em branco** - a aresta superior do seu iPhone (onde fica a antena NFC) deve estar a 2-3 cm da tag
6. **Aguarde a confirmação de sucesso** - vai sentir um toque háptico e ver um visto

É só isto. Qualquer pessoa que encoste o telemóvel a essa tag será agora levada para o seu URL - sem necessidade de app, sem código QR para ler. A primeira vez que vi a cara de um colega quando um autocolante em branco abriu um site, soube que era esta a demonstração com que liderar.

**Dica profissional:** A antena NFC nos iPhone fica na **aresta superior** do telemóvel, junto à câmara. Para a ligação mais forte, mantenha o topo do seu iPhone diretamente sobre a tag. Se quiser confirmar o que gravou sem uma app, pode [ler tags NFC diretamente a partir do seu browser](/online-nfc-reader/) no Android.

---

## O Que Pode Gravar em Tags NFC?

As tags NFC usam um formato chamado **NDEF** (NFC Data Exchange Format) que define tipos de registo padrão. Assim que esse modelo me fez clique, toda a tecnologia deixou de parecer magia. Aqui fica o que pode gravar:

### URLs e Ligações

O uso mais comum, e aquele a que mais recorro. Grave qualquer endereço web, e tocar na tag abre-o no browser do telemóvel.

**Usos práticos:**
- Ligação para o menu do restaurante numa tag na mesa
- Portefólio ou perfil de LinkedIn num cartão de visita
- Ligação para a página do produto em tags nas prateleiras das lojas
- Ligação para o formulário de feedback na receção

**Memória necessária:** ~30-80 bytes (a maioria dos URLs cabe em qualquer tag)

### Credenciais de Rede Wi-Fi

Grave o nome da sua rede Wi-Fi (SSID) e a palavra-passe numa tag. As visitas encostam o telemóvel à tag e ligam-se automaticamente - sem digitar palavras-passe longas.

**Como gravar credenciais de Wi-Fi:**

1. No NFC.cool Tools, selecione **"Wi-Fi"** como tipo de registo
2. Introduza o **nome da rede** (SSID)
3. Introduza a **palavra-passe**
4. Selecione o **tipo de segurança** (WPA2 ou WPA3 para a maioria das redes domésticas)
5. Grave na tag

**Dica profissional:** Coloque uma tag de Wi-Fi junto ao seu router, num chaveiro à porta ou dentro de um quarto de hóspedes. Identifique-a com "Toque para Wi-Fi" - na minha experiência, esta é a tag por que todas as visitas acabam por lhe agradecer.

**Memória necessária:** ~60-120 bytes consoante o comprimento da palavra-passe

### Cartões de Contacto (vCard)

Grave um contacto vCard numa tag. Quando alguém lhe encosta o telemóvel, os seus detalhes de contacto aparecem prontos a guardar - nome, telefone, e-mail, empresa, morada.

Isto é essencialmente o que um cartão de visita digital faz, mas integrado diretamente numa tag física. Sem app, sem necessidade de ligação à internet - os dados de contacto vivem na própria tag.

**Como gravar um contacto:**

1. Selecione **"Contacto"** como tipo de registo
2. Preencha os campos que quer partilhar (nome, telefone, e-mail, etc.)
3. Grave na tag

**Memória necessária:** ~100-400 bytes consoante o número de campos que incluir. Use NTAG215 ou NTAG216 para contactos com moradas e notas.

Um aviso honesto, vindo dos e-mails de suporte que leio: os vCards em bruto numa tag podem comportar-se de forma inconsistente no iPhone. Se o seu não estiver a abrir corretamente, analisei as causas em [porque é que a sua tag NFC com vCard não está a funcionar no iPhone](/blog/vcard-nfc-iphone-not-working/).

**Nota:** Para uma experiência mais rica com fotografias, ligações sociais e estatísticas, dê uma vista de olhos ao **[NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-en&mt=8)** - cria um perfil de cartão de visita digital alojado e consegue gravar a ligação em qualquer tag NFC. Quando alguém encosta o telemóvel, os utilizadores de iOS veem um App Clip nativo e os utilizadores de Android abrem um site no domínio nfc.cool - sem necessidade de app. No meu próprio networking, achei isto muito mais fiável do que os vCards em bruto.

### Texto Simples

Grave qualquer mensagem de texto numa tag. Menos comum do que os URLs, mas útil para:

- Etiquetas de inventário (números de série, descrições)
- Instruções ou notas anexadas a equipamento
- Mensagens "easter egg" em caças ao tesouro
- Rastreamento de ativos em armazéns

**Memória necessária:** Varia consoante o comprimento do texto (~1 byte por caráter)

### Números de Telefone e Endereços de E-mail

Grave um URI `tel:` ou `mailto:` para iniciar uma chamada telefónica ou compor um e-mail ao tocar.

Útil para:
- Tags de contacto de emergência em equipamento médico
- Tags "ligar para assistência" em máquinas de venda automática
- Tags de contacto de suporte em produtos

### Dados Específicos de Apps

Algumas apps conseguem gravar registos NDEF personalizados que acionam ações específicas da app. Por exemplo, poderia gravar um registo que abre um atalho, uma playlist ou um ecrã de app específicos.

---

## Avançado: Gravar com os Atalhos do iOS

É aqui que as coisas ficam divertidas para mim. A app **Atalhos** da Apple tem suporte de gravação NFC integrado, e o NFC.cool Tools estende-o ainda mais com as suas próprias ações de Atalhos.

### Gravação Básica de URL com Atalhos

1. Abra a app **Atalhos**
2. Crie um novo atalho
3. Procure a ação **"Definir Tag NFC"** (em Scripting → NFC)
4. Configure o que gravar (URL, texto, etc.)
5. Execute o atalho e toque numa tag

Isto é útil para gravar em lote várias tags com os mesmos dados.

### Integração de Atalhos do NFC.cool Tools

O NFC.cool Tools acrescenta as suas próprias ações de Atalhos, dando-lhe mais opções:

- **Gravar Tag** - Grave programaticamente qualquer tipo de registo suportado
- **Ler Tag** - Leia e devolva os dados da tag ao seu atalho
- **Histórico de Leituras** - Aceda aos seus resultados de leitura recentes

Isto abre possibilidades de automação. Por exemplo, poderia criar um atalho que:
1. Pede o nome de um produto
2. Gera um URL como `https://yoursite.com/product/{name}`
3. Grava-o numa tag NFC
4. Regista a tag numa folha de cálculo

Perfeito para etiquetar inventário em lote ou configurar crachás de eventos.

---

## Projetos Práticos com Tags NFC

Estes são os projetos a que continuo a voltar - prontos a montar, e cada um demora uns minutos:

### Tags de Casa Inteligente

**Tag da Mesa de Cabeceira - "Modo Dormir"**
Grave um URL que aciona um Atalho do iOS para:
- Ativar Não Incomodar
- Configurar o alarme de amanhã
- Reduzir o brilho do ecrã
- Iniciar uma playlist para dormir

**Tag da Secretária - "Modo Trabalho"**
- Abrir o seu gestor de tarefas
- Iniciar um temporizador de foco
- Ligar à VPN do trabalho
- Reproduzir uma playlist de concentração

**Tag da Porta - "A Sair de Casa"**
- Verificar a previsão do tempo
- Mostrar o tempo de deslocação
- Acionar o cenário "ausente" da casa inteligente

### Tags de Negócio

**Tag do Crachá de Conferência**
Grave o URL do seu NFC.cool Business Card numa tag colada na parte de trás do seu crachá de conferência. Os contactos encostam o telemóvel ao seu crachá → aparece todo o seu cartão de visita digital.

**Tags de Produto**
Grave ligações para a documentação do produto, registo de garantia ou páginas de suporte. Cole em produtos ou embalagens.

**Tags de Sala de Reuniões**
Grave ligações para calendários de reserva de salas ou credenciais de Wi-Fi. Cole junto à porta.

### Projetos Criativos

**Tags de Música**
Grave ligações de álbuns do Spotify ou Apple Music em autocolantes NFC. Cole-os nas capas físicas dos álbuns, e tocar reproduz o álbum.

**Tags de Jogos de Tabuleiro**
Grave ligações para PDFs de regras ou vídeos tutoriais. Cole por dentro da tampa da caixa.

**Tags de Receitas**
Grave ligações para as receitas favoritas e cole tags em frascos de especiarias ou páginas de livros de cozinha.

---

## Bloquear Tags NFC

Depois de gravar uma tag e de estar satisfeito com o seu conteúdo, pode **bloqueá-la**. Bloquear torna a tag permanentemente só de leitura - ninguém pode sobrescrever os seus dados. Trato isto como um passo deliberado e final, nunca como algo a aceitar à pressa, porque não há como desfazer.

**No NFC.cool Tools:**
1. Toque na opção **Bloquear** após gravar
2. Confirme - **isto é irreversível**

**Quando bloquear:**
- Tags em locais públicos (evitar adulteração)
- Tags de produto (proteger os seus URLs)
- Cartões de visita (manter os seus dados de contacto seguros)
- Qualquer tag que não pretenda voltar a gravar

**Quando NÃO bloquear:**
- Tags que possa querer atualizar mais tarde (mudanças de palavra-passe de Wi-Fi, URLs sazonais)
- Experimentação/aprendizagem - deixe-as regraváveis enquanto testa

---

## Resolução de Problemas

A maior parte das perguntas "porque é que não grava" que recebo cai numa destas quatro causas. Aqui fica como eu as resolveria.

### Erro "Não é Possível Gravar"

- **A tag pode estar bloqueada.** Se alguém (ou você) bloqueou previamente a tag, ela está permanentemente só de leitura. Vai precisar de uma tag nova.
- **Memória insuficiente.** Os seus dados podem ser demasiado grandes para a capacidade da tag. Experimente uma tag com mais memória (NTAG215 → NTAG216) ou reduza os seus dados.
- **Tag mal posicionada.** Mova lentamente a aresta superior do seu iPhone sobre a tag. Algumas superfícies (metal, capas grossas) podem interferir.
- **A tag está danificada.** As tags NFC são duráveis mas não indestrutíveis. Calor extremo, dobragens ou perfurações podem inutilizá-las.

### A Gravação Parece Funcionar Mas a Tag Não Responde

- **Verifique o formato NDEF.** Os dados têm de ser gravados em formato NDEF para que os telemóveis os leiam automaticamente. O NFC.cool Tools trata disto por si, mas tags gravadas de forma personalizada podem ter problemas de formatação.
- **O modelo de iPhone importa.** Os iPhone mais antigos (7, 8, X) exigem uma app para ler tags. O iPhone XS e mais recentes leem tags automaticamente em segundo plano.

### A Tag Funciona no Android Mas Não no iPhone

- **Verifique o tipo de chip.** Os iPhone funcionam melhor com chips da série NTAG (NTAG213, 215, 216). Alguns outros tipos de chip podem não ser compatíveis com o iOS.
- **Formatação NDEF.** A tag tem de estar formatada em NDEF. Algumas tags compradas a granel chegam sem formatação - grave nelas com o NFC.cool Tools para as formatar automaticamente.

---

## Dicas para Tirar o Máximo Partido das Tags NFC

Estas são as pequenas lições que aprendi à força, para que não tenha de o fazer.

1. **Identifique as suas tags.** Um autocolante em branco numa secretária não ajuda. Use uma máquina de etiquetas ou um marcador para indicar o que a tag faz ("Toque para Wi-Fi", "Modo Trabalho", etc.).

2. **Evite superfícies metálicas.** O metal interfere com os sinais NFC. Se tiver mesmo de a colar em metal, use **tags NFC anti-metal** (têm uma camada de ferrite que protege contra interferências). São ligeiramente mais grossas e mais caras, mas funcionam perfeitamente em superfícies metálicas.

3. **Teste antes de colar.** Grave a tag, teste-a, e só depois retire o adesivo e cole-a no lugar. Descolar uma tag já colada para a regravar é o tipo de pequeno aborrecimento que aprendi a evitar por completo.

4. **Use a tag certa para a tarefa.** Não desperdice uma NTAG216 (888 bytes) num simples URL que ocupa 40 bytes. E não tente meter um vCard completo numa NTAG213 (144 bytes).

5. **Existem opções à prova de água.** As tags NFC revestidas a epóxi são à prova de água e mais duráveis. Boas para uso no exterior, cozinhas ou casas de banho.

6. **Combine tags NFC com Atalhos.** O verdadeiro poder das tags NFC no iPhone não é apenas abrir URLs - é acionar automações complexas. Uma tag NFC pode iniciar qualquer Atalho do iOS, que por sua vez pode controlar dispositivos de casa inteligente, enviar mensagens, registar dados e muito mais.

---

## Perguntas Frequentes

### Posso regravar uma tag NFC?

Sim, desde que a tag não tenha sido bloqueada. As tags NFC padrão podem ser regravadas **mais de 100 000 vezes**. Basta gravar os novos dados por cima dos antigos - sem necessidade de "apagar" primeiro.

### A que distância precisa de estar o meu iPhone?

A **2-4 cm** (cerca de 1-2 polegadas). A antena NFC fica na aresta superior do iPhone. Mantenha o topo do seu telemóvel diretamente sobre a tag para a melhor ligação.

### Posso gravar tags NFC sem uma app?

Os Atalhos do iOS têm uma ação "Definir Tag NFC" integrada para gravações básicas (URLs, texto). Mas para credenciais de Wi-Fi, contactos e registos mais complexos, vai precisar de uma app como o NFC.cool Tools.

### As tags NFC precisam de pilhas?

Não. As tags NFC são **passivas** - não têm pilha e obtêm energia do leitor NFC do seu telemóvel quando lhes toca. As tags podem durar **mais de 10 anos** porque não há nada que se esgote.

### Posso proteger uma tag NFC com palavra-passe?

Sim. O NFC.cool Tools consegue definir proteção por palavra-passe em tags NTAG, tanto no iPhone como no Android. Note que isto apenas impede que a tag seja **sobrescrita** - não impede ninguém de **ler** o que já está na tag. Se precisar de tornar o próprio conteúdo ilegível sem uma chave, o que quer são dados encriptados - veja o nosso guia sobre o [NFC Safe](/blog/nfc-safe-encrypted-secrets/). Bloquear uma tag é a outra opção: bloqueia permanentemente quaisquer gravações futuras.

### As tags NFC funcionam através de uma capa de telemóvel?

Sim, a maioria das capas de telemóvel não é problema. O NFC funciona através de plástico, silicone, couro e até carteiras finas. Capas muito grossas (como capas robustas de uso intensivo) ou capas com placas de metal (para suportes magnéticos de carro) podem interferir.

### Quantas tags posso gravar com um iPhone?

Ilimitadas. Não há restrição quanto ao número de tags que grava. O fator limitante são as próprias tags, não o seu telemóvel.

---

## E a Seguir?

Agora que já sabe gravar tags NFC, as possibilidades estão escancaradas. O meu conselho é o de sempre: comece com um projeto simples - uma tag de Wi-Fi para as visitas ou uma tag de cartão de visita - obtenha a pequena vitória, e construa a partir daí.

Se procura uma app de gravação NFC poderosa e fácil de usar, o **[NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-en&mt=8)** é a app que construí para tratar exatamente disto - desde a gravação básica de URLs até à gestão avançada de tags, com integração com os Atalhos do iOS para automação.

E se quiser transformar tags NFC em cartões de visita digitais profissionais, o **[NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-en&mt=8)** permite-lhe criar um lindo perfil de cartão e gravar o seu URL em qualquer tag NFC. A interface da app e o App Clip suportam 35 línguas no iOS, e os destinatários de Android veem um site no domínio nfc.cool (atualmente apenas em inglês).

**Transferir o NFC.cool Tools:** [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-write-nfc-tags-iphone-en&mt=8) | [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-en)

**Transferir o NFC.cool Business Card:** [App Store](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-write-nfc-tags-iphone-en&mt=8) | [Android (no NFC.cool Tools)](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-write-nfc-tags-iphone-en)
