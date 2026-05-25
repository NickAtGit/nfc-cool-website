---
id: nfc-blog-024
title: "Digitalização de documentos sempre à mão com a NFC.cool Tools"
date: 2024-02-20
tags: ["guides", "iphone"]
summary: "Um guia prático para o digitalizador de documentos da NFC.cool: como captar digitalizações nítidas, porque é que o passo de pós-processamento importa e como o OCR transforma a digitalização em texto pesquisável e PDFs."
metaTitle: "Digitalização de Documentos com a NFC.cool Tools - Um Guia Prático"
metaDescription: "Como digitalizar documentos com a NFC.cool Tools - captar, pós-processar, executar OCR e exportar como PDFs pesquisáveis. Com dicas sobre iluminação e deteção de cantos."
ogTitle: "Digitalização de documentos sempre à mão com a NFC.cool Tools"
ogDescription: "Como digitalizar documentos, executar OCR e exportar PDFs pesquisáveis com a NFC.cool Tools."
image: "/assets/images/Blog/document-scanning-guide.webp"
---
Um iPhone moderno tem câmara e poder de processamento suficientes para que "digitalizar um documento" já não seja uma funcionalidade da impressora - é um toque. O digitalizador de documentos da NFC.cool Tools assenta na framework Vision da Apple, o que significa que tem captura rápida, deteção automática de margens e OCR que corre inteiramente no dispositivo.

Eis como usá-lo bem.

---

## Captura: mantenha firme, a luz importa

Abra a NFC.cool Tools, toque no ícone de documento e enquadre a página. O digitalizador desenha um quadrilátero amarelo à volta do que pensa serem as margens da página. Na maior parte das vezes está certo. Quando não está, arraste os cantos até encaixarem.

Algumas dicas que melhoram genuinamente o resultado:

- **A luz natural ganha à luz do teto.** As luzes do teto do escritório projetam sombras do próprio telemóvel sobre a página. A luz do dia vinda de uma janela, ou um candeeiro de secretária inclinado sobre a página, é melhor.
- **Superfície plana.** Uma página curvada dobra o texto e confunde o OCR.
- **Evite o reflexo.** Incline ligeiramente o telemóvel para evitar o reflexo do quadrado branco em papel brilhante.
- **Documentos de várias páginas.** Basta digitalizar uma página atrás da outra - a app empilha-as num único documento.

---

## Pós-processamento: ajustar cantos, ajustar a cor

Depois da captura, tem um passo de pós-processamento. As duas coisas que vale a pena usar:

- **Ajuste dos cantos.** A deteção automática do digitalizador é boa, mas não é perfeita. Se a página tiver pouco contraste com a superfície, arraste os cantos com precisão.
- **Modo de cor.** Três opções: cor (fotografias, documentos coloridos), tons de cinzento (texto sobre papel branco - o resultado mais nítido para OCR) e preto e branco (escrita à mão, recibos - o mais limpo possível).

Para a maioria do papelório - faturas, recibos, contratos - os tons de cinzento dão o melhor equilíbrio entre tamanho de ficheiro e precisão do OCR.

---

## OCR: imagem digitalizada → texto pesquisável

Toque em **Mostrar texto reconhecido** por baixo da imagem digitalizada para executar o OCR. O texto aparece num painel a partir do qual pode copiar, pesquisar ou guardar.

A qualidade do OCR depende de três coisas: a nitidez da imagem, a iluminação e o tipo de letra. O texto impresso sobre um fundo branco limpo é reconhecido a muito perto de 100%. A escrita à mão é mais difícil - o reconhecedor de escrita à mão do Vision é razoável em letras de imprensa cuidadas e tem dificuldades com a letra cursiva. Se uma digitalização saiu errada, a correção mais comum é voltar a digitalizar com melhor iluminação em vez de lutar contra o resultado do OCR.

---

## Exportação: PDF pesquisável

O truque que torna as digitalizações verdadeiramente úteis a longo prazo é a exportação para **PDF pesquisável**. É um PDF em que cada página é a imagem digitalizada, com o texto do OCR sobreposto de forma invisível por baixo - por isso o documento parece uma imagem, mas os motores de pesquisa (e o Spotlight do macOS, e o Finder) conseguem encontrar palavras dentro dele.

Na NFC.cool Tools, toque em **Partilhar página como PDF** e a exportação inclui automaticamente a camada de OCR. Coloque o PDF no seu sistema de arquivo, pesquise por "fatura 2024-02 acme corp" três meses depois, e o documento certo aparece.

---

## Porquê digitalizar em vez de fotografar?

Podia simplesmente tirar uma fotografia do documento. As razões para usar antes um digitalizador:

- **Recorte das margens.** Uma digitalização é recortada à página. Uma fotografia inclui a secretária, a chávena de café, o gato.
- **Correção da perspetiva.** Mesmo segurado direito, um telemóvel está ligeiramente fora da perpendicular. Os digitalizadores corrigem isto para que a página fique "como se tivesse sido digitalizada" em vez de "fotografada de um ângulo".
- **Agrupamento de várias páginas.** Cinco fotografias = cinco ficheiros no seu rolo da câmara. Cinco digitalizações = um PDF.
- **Texto pesquisável.** OCR integrado na exportação.

Para recibos, contratos, formulários assinados, documentos profissionais - digitalize, não fotografe.

A digitalização de documentos faz parte da [NFC.cool Tools para iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-document-scanning-guide-en&mt=8) (a versão Android foca-se no NFC; o digitalizador de documentos precisa da framework Vision da Apple).
