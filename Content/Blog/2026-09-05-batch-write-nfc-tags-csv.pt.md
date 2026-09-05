---
id: batch-write-nfc-tags-csv-2026-09
title: "Como gravar tags NFC em lote a partir de uma folha de cálculo"
date: 2026-09-05
tags: ["guides", "nfc-tags", "iphone"]
summary: "Distribuo códigos promocionais da App Store em tags NFC em conferências e meetups, e a esta altura já vão centenas. É assim que as gravo, e o método serve para qualquer lista: faço a lista numa folha de cálculo, exporto um CSV, passo o ficheiro para o telemóvel e deixo a NFC.cool Tools gravar uma tag a seguir à outra."
image: "/assets/images/Features/nfc-reader-writer-csv-batch-write.webp"
imageAlt: "Um iPhone com um ficheiro de folha de cálculo no ecrã a gravar as linhas dessa folha numa fila de tags NFC"
author: "Nicolo Stanciu"
metaTitle: "Gravar tags NFC em lote com um CSV no iPhone e no Android"
metaDescription: "Programe centenas de tags NFC a partir de uma só folha de cálculo: faça a lista, exporte um CSV, passe-o para o telemóvel e deixe a NFC.cool Tools gravar tag após tag."
ogTitle: "Gravar tags NFC em lote a partir de uma folha de cálculo"
ogDescription: "De um CSV no computador a uma pilha de tags NFC gravadas, um toque por tag. É assim que preparo centenas de tags com códigos promocionais para as conferências."
---
Vou a conferências e meetups para mostrar as minhas aplicações a outras pessoas e, no fim de uma boa conversa, gosto de entregar uma tag NFC com um código promocional lá dentro. Basta encostar o telemóvel à tag: a App Store abre com o código já preenchido e a pessoa fica com a aplicação.

As tags nunca foram o problema. A quantidade é que foi. Cada código promocional é diferente, por isso cada tag precisa do seu próprio link, e eu queria algumas centenas. Gravá-las uma a uma na aplicação não ia funcionar a essa escala. Foi por isso que construí a **Escrita em lote CSV** na NFC.cool Tools: faço a lista no Mac, exporto-a como CSV, passo o ficheiro para o telemóvel e depois vou encostando uma tag a seguir à outra enquanto a aplicação percorre as linhas. A esta altura já gravei centenas de tags desta forma.

Aqui fica o processo completo, da folha de cálculo até à última tag. Funciona exatamente da mesma maneira para links de produtos, números de série, dados de acesso a uma rede Wi-Fi ou qualquer outra coisa que caiba numa célula de uma folha de cálculo.

---

## O que a escrita em lote CSV faz na prática

Dá um ficheiro CSV à aplicação e cada linha passa a ser uma tag. A aplicação mostra-lhe uma pré-visualização do que vai ficar em cada tag. Toca em Iniciar gravação e, a partir daí, é só ir encostando as tags ao telemóvel, uma a seguir à outra. Cada linha gravada é removida do ficheiro, por isso a lista no ecrã é sempre o que ainda falta. Pode parar a qualquer momento e continuar mais tarde, mesmo dias depois.

Se nunca gravou uma tag NFC, comece pelo meu [guia para gravar tags NFC com o iPhone](/blog/write-nfc-tags-iphone/). Este artigo é sobre gravar muitas de uma vez.

---

## Passo 1: monte a folha de cálculo no computador

Abra o Numbers, o Excel ou o Google Sheets e faça a lista no computador. É muito mais rápido do que fazer seja o que for no telemóvel, e pode deixar a folha de cálculo construir os links.

O formato mais simples é **uma coluna, com uma linha por tag**. Cada linha é exatamente o que uma tag vai conter. Uma coluna de links de produtos fica assim:

```
https://example.com/products/1001
https://example.com/products/1002
https://example.com/products/1003
```

Se os seus valores só diferem num número ou num ID, deixe uma fórmula construir a coluna. Escreva o primeiro, arraste para baixo, e a lista fica pronta, por mais comprida que seja. Se já tem os IDs num ficheiro, abra esse ficheiro na folha de cálculo e acrescente a parte fixa à frente com uma fórmula.

A aplicação olha para o início de cada valor e escolhe o tipo de registo correspondente:

- Um link (`https://`, `http://` ou `www.`) passa a ser um registo URL. Encosta-se o telemóvel à tag e o browser abre-o.
- `tel:`, `mailto:`, `sms:` e `geo:` passam a ser a ação correspondente, por isso uma tag pode marcar um número, começar um email ou abrir uma localização.
- `WIFI:T:WPA;S:MyNetwork;P:secret;;` passa a ser um registo Wi-Fi, o mesmo formato que um código QR de Wi-Fi usa. Há um senão: esse valor contém pontos e vírgulas, por isso a aplicação vai assumir que o ficheiro está separado por ponto e vírgula e parte-o em pedaços. Defina o delimitador como vírgula na aplicação e a linha fica inteira.
- `shortcuts://` executa um atalho do iOS.
- Tudo o resto é gravado como texto simples.

Mantenha cada valor numa única linha. O ficheiro é lido linha a linha, por isso um cartão de contacto que ocupe várias linhas acabaria espalhado por várias tags.

Duas coisas a que deve estar atento:

1. **Sem linha de cabeçalho.** A aplicação trata todas as linhas não vazias como conteúdo. Se a primeira linha disser "URL", a primeira tag vai conter a palavra URL.
2. **Linhas vazias não fazem mal.** São ignoradas, tal como os espaços à volta de um valor.

### Quando uma tag precisa de vários registos

Às vezes uma tag deve levar mais do que uma coisa, por exemplo um site, um número de telefone e um endereço de email por pessoa. Para isso, acrescente colunas. Na aplicação, em **Agrupar por**, escolha **Por Linhas**, e cada linha passa a ser uma tag com um registo por célula. **Por Colunas** faz o contrário e transforma cada coluna numa tag, caso tenha montado a folha ao contrário. Para um ficheiro de coluna única existe, em vez disso, a definição **Linhas por etiqueta**, para que três linhas possam ir para uma só tag como três registos.

---

## Passo 2: exporte a folha como CSV

Um ficheiro CSV é um ficheiro de texto simples. Uma linha de texto por cada linha da folha, e as células de uma linha separadas por uma vírgula, um ponto e vírgula ou uma tabulação. Se abrir um no TextEdit ou no Bloco de Notas, vê exatamente o que a aplicação vai ver. Uma folha com um link e um número de telefone por pessoa fica assim depois da exportação:

```
https://example.com/anna,tel:+4915112345678
https://example.com/ben,tel:+4915198765432
```

A formatação e as fórmulas não sobrevivem à exportação, só os valores. Eis como exportar esse ficheiro a partir do Numbers, do Excel e do Google Sheets.

### Numbers no Mac

1. Escolha **Ficheiro**, depois **Exportar para** e depois **CSV**.
2. Se o documento tiver mais do que uma tabela, o Numbers pergunta se quer criar um ficheiro por tabela ou combiná-las. O que quer é uma tabela num ficheiro.
3. Deixe **Incluir nomes das tabelas** desmarcado. Caso contrário, o Numbers escreve o nome da tabela no ficheiro como uma linha própria, e essa linha acabaria numa tag.
4. Em **Opções avançadas**, deixe a codificação de texto em Unicode (UTF-8).
5. Clique em **Seguinte**, dê um nome ao ficheiro e clique em **Exportar**.

Duas notas sobre o Numbers: todas as tabelas novas vêm com uma linha de cabeçalho sombreada, e o que quer que escreva lá é exportado como qualquer outra linha, por isso deixe-a vazia ou apague-a. E o Numbers usa sempre vírgulas. Se um valor contiver uma vírgula, o Numbers envolve-o em aspas, e a aplicação não remove essas aspas. Portanto, quando exportar do Numbers, mantenha as vírgulas fora dos valores.

### Excel no Mac ou no Windows

1. Escolha **Ficheiro** e depois **Guardar como** (algumas versões chamam-lhe Guardar uma cópia).
2. Escolha o formato **CSV UTF-8 (delimitado por vírgulas) (.csv)**.
3. O Excel guarda apenas a folha que está a ver e avisa que a formatação se vai perder. Confirme, não precisa da formatação.

Apesar do nome, o Excel nem sempre usa vírgulas. Usa o separador de listas das definições regionais do sistema e, num sistema português, espanhol, alemão ou francês, como na maioria da Europa, isso é um ponto e vírgula, porque a vírgula já está ocupada como separador decimal. Não precisa de mudar nada. A NFC.cool deteta vírgula, ponto e vírgula e tabulação automaticamente. E isso também significa que os seus valores podem conter vírgulas.

### Google Sheets

1. Escolha **Ficheiro**, depois **Transferir** e depois **Valores separados por vírgulas (.csv)**.
2. Só a folha atual é exportada, sempre com vírgulas.

### Antes de passar o ficheiro

Abro sempre o ficheiro exportado num editor de texto antes de ele ir para o telemóvel. O que quer ver é uma linha por tag, sem linha de cabeçalho, sem aspas à volta dos valores e sem vírgulas perdidas dentro de um ficheiro separado por vírgulas. Se um valor tiver mesmo de conter uma vírgula, exporte com pontos e vírgulas a partir do Excel, ou use a exportação TSV do Numbers (separada por tabulações) e mude o nome do ficheiro para terminar em `.csv`. No iPhone, o ficheiro tem de terminar em `.csv` de qualquer forma, porque é por essa extensão que o seletor de ficheiros filtra.

---

## Passo 3: passe o ficheiro para o telemóvel

Qualquer caminho serve, desde que acabe na aplicação Ficheiros no iPhone ou, no Android, num sítio a que o seletor de ficheiros do sistema chegue.

- Envie o ficheiro por **AirDrop** do Mac para o iPhone e escolha Guardar em Ficheiros.
- **iCloud Drive:** guarde o CSV no iCloud Drive do Mac e ele aparece na aplicação Ficheiros do telemóvel. O Google Drive e o Dropbox funcionam da mesma forma, a aplicação Ficheiros também os consegue percorrer.
- **Envie-o por email a si próprio** e guarde o anexo.
- **Android:** Quick Share a partir de um portátil, Google Drive ou um cabo USB. A aplicação usa o seletor de documentos do sistema, por isso qualquer localização que ele consiga abrir serve.

---

## Passo 4: importe o ficheiro e verifique a pré-visualização

Na NFC.cool Tools, abra o ecrã Ferramentas NFC e procure **Escrita em lote CSV** em **Modos em lote**. No Android está igualmente na lista de ferramentas NFC. Toque em **Importar CSV** e escolha o seu ficheiro.

A aplicação faz a sua própria cópia do ficheiro. À medida que grava tags, as linhas vão sendo removidas dessa cópia. A folha de cálculo original no computador fica como está, por isso tem sempre a lista completa.

Assim que o ficheiro está selecionado, a aplicação mostra o que detetou: o delimitador, o número de colunas, o modo de agrupamento e de quantas tags vai precisar. O número que verifico sempre é **Bytes por etiqueta NFC**, o tamanho da maior mensagem do lote. Compare-o com as suas tags. Um NTAG213 leva 144 bytes, um NTAG215 504 e um NTAG216 888. Um link curto anda à volta dos 50 bytes, por isso as tags mais baratas chegam perfeitamente para links. Um registo Wi-Fi ou um cartão de contacto mais comprido precisa de um 215 ou de um 216. Se não sabe ao certo qual é o chip das suas tags, dê uma vista de olhos ao meu [guia sobre os tipos de tags NFC](/blog/nfc-tag-types-for-iphones/).

Abra a **Pré-visualização do lote** para ver cada tag com os registos que vai receber. O que vê ali é exatamente o que vai ser gravado.

---

## Passo 5: grave a pilha toda

Toque em **Iniciar gravação** e encoste a primeira tag ao topo do iPhone. Quando o telemóvel vibrar, a tag está gravada e passa à seguinte. A linha que acabou de gravar desaparece da lista e o contador diz-lhe quantas faltam.

Algumas coisas que vão acontecer e são perfeitamente normais:

- **A folha de leitura desaparece ao fim de 60 segundos.** É um limite do iOS, não é um erro da aplicação. Volta sozinha passados uns segundos e pode continuar de onde ficou.
- **Uma tag falha.** Talvez estivesse bloqueada, talvez a tenha afastado cedo demais. A linha fica no ficheiro e a aplicação não salta para a frente; basta encostar a mesma tag outra vez ou pegar noutra.
- **Tem de parar.** Feche a aplicação, vá fazer outra coisa, volte amanhã. O ficheiro lembra-se do que falta. No Android, a aplicação mostra o lote inacabado e propõe retomá-lo.

Cem tags não demoram muito depois de apanhar o ritmo.

---

## O que aprendi ao gravar centenas destas

**Grave duas tags primeiro.** Depois leia-as com a aplicação e confirme que a tag faz o que deve. Só então grave as restantes.

**Não precisa do maior chip.** Para links, um NTAG213 chega e é bastante mais barato em quantidade. Guarde os NTAG216 para cartões de contacto e Wi-Fi.

**Bloqueie ou proteja com palavra-passe as tags que oferece.** Mesmo ao lado da Escrita em lote CSV estão os modos Bloqueio em lote e Proteção por palavra-passe em lote. O bloqueio torna a tag só de leitura para sempre; a palavra-passe deixa-o alterá-la mais tarde, a si e a mais ninguém. Para tags que saem das suas mãos, passe a pilha por um dos dois no fim, para que ninguém possa substituir o conteúdo.

A Escrita em lote CSV está na [NFC.cool Tools para iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-batch-write-nfc-tags-csv-pt&mt=8) e para [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-batch-write-nfc-tags-csv-pt). E se me encontrar numa conferência ou num meetup, peça-me uma tag.
