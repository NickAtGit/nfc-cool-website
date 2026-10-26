---
id: "e-ink-phone-case-2026-10"
title: "Hackeei a minha capa com ecrã e-ink para o iPhone conseguir escrever nela"
date: "2026-10-12"
tags: ["announcements", "iphone", "nfc-tags"]
summary: "Tenho uma daquelas capas de telemóvel com ecrã e-ink NFC, sem bateria, e não gostava da aplicação que vinha com ela. Por isso, descobri como é que ela comunica, e a NFC.cool Tools 7.2.0 já consegue pôr fotografias, códigos QR, o próximo evento, a agenda do dia e os seus lembretes nas capas que usam a aplicação DeerPhoneCase, KAZAVA, Novixand ou TYOHINN. Desde a versão 7.3.0, também consegue desenhar nas capas maiores que usam a aplicação AI Cast Assistant."
image: "/assets/images/Blog/nfc-e-ink-phone-case-iphone.webp"
imageAlt: "Um iPhone numa capa preta com um ecrã e-ink nas costas a mostrar um sol vermelho e amarelo sobre colinas pretas, ao lado de um segundo iPhone a enviar a mesma imagem por NFC"
author: "Nicolo Stanciu"
metaTitle: "Capa de telemóvel e-ink NFC no iPhone: fotos, agenda, QR"
metaDescription: "Ponha fotografias, códigos QR, a agenda e lembretes numa capa e-ink NFC sem bateria a partir do iPhone. Funciona com capas DeerPhoneCase, KAZAVA e AI Cast Assistant."
ogTitle: "Hackeei a minha capa e-ink para o iPhone escrever nela"
ogDescription: "Como descobri o protocolo de uma capa de telemóvel e-ink NFC sem bateria, e o que a NFC.cool já consegue pôr no ecrã dela."
---

> **Atualização de outubro de 2026:** A NFC.cool Tools 7.3.0 também desenha nas capas maiores que usam a aplicação **AI Cast Assistant** e traz dois designs novos, **Editor** e **AI Playground**. Como pusemos essa segunda capa a funcionar, conto mais abaixo.

O ecrã piscou.

É um pormenor. Os ecrãs e-ink fazem isto sempre que se redesenham: um clarão rápido por todas as cores antes de a nova imagem assentar. Só que este clarão vinha de código escrito por mim, enviado do meu iPhone para as costas de uma capa de telemóvel que não tem bateria. Uns segundos depois, o ecrã inteiro estava vermelho, um vermelho uniforme com um ar ligeiramente de papel. Mais nada. Só vermelho.

Ao longo dos anos construí muitas funcionalidades NFC, e aquele simples retângulo vermelho continua a ser um dos momentos de que mais gosto.

---

## Um ecrã sem bateria

<figure class="phone-figure" data-layout="float" data-device="einkcase">
<ol>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-1-photo-480w.webp" alt="A traseira de um iPhone numa capa NFC de tinta eletrónica laranja, com o ecrã a mostrar a fotografia de um golden retriever em quatro tintas"><p><strong>Uma fotografia.</strong> A preto, branco, vermelho e amarelo, sem bateria na capa.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-2-qr-480w.webp" alt="O ecrã de tinta eletrónica da capa com um código QR para nfc.cool"><p><strong>Um código QR.</strong> Qualquer pessoa o lê nas costas do seu telemóvel.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-3-event-480w.webp" alt="O ecrã de tinta eletrónica da capa em amarelo: Next, Dinner with Mia, quarta, 14 de outubro, 19:30 às 21:30, Trattoria Roma"><p><strong>O próximo evento.</strong> Um instantâneo do seu calendário.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-4-today-480w.webp" alt="O ecrã de tinta eletrónica da capa com quarta-feira, 14 de outubro: Gym, Team stand-up, Lunch with Alex, Dentist, Dinner with Mia"><p><strong>A agenda de hoje.</strong> O dia inteiro, até pôr o próximo design.</p></li>
</ol>
</figure>

Se nunca viu uma destas capas: parece uma capa de telemóvel normal, só que boa parte das costas é um ecrã e-ink, o mesmo tipo de ecrã de um leitor de livros digitais. O meu desenha com quatro tintas: preto, branco, vermelho e amarelo.

Lá dentro não há bateria nem porta de carregamento. A capa vai buscar a energia ao campo NFC do telemóvel, o mesmo campo que acorda um autocolante NFC quando o lê. Como o telemóvel fica mesmo lá dentro, a capa está sempre ao alcance desse campo. Quando uma aplicação dá a ordem, o campo alimenta um pequeno chip e um microcontrolador, que redesenham o ecrã. Depois de a imagem lá estar, o e-ink não precisa de energia nenhuma para a manter. Fica simplesmente ali, com o telemóvel desligado, numa gaveta, onde for.

Para mim, é como um Etch A Sketch, aquele quadro de desenhar que se apaga a abanar, só que aqui quem o abana é o telemóvel. Nada muda enquanto o telemóvel não lhe disser para mudar.

Estas capas vendem-se com muitos nomes diferentes, e quase todas as marcas têm a sua própria aplicação. A minha veio com uma chamada **DeerPhoneCase**. Já falo das outras mais abaixo.

---

## Porque não fiquei pela aplicação oficial

Experimentei uma série de aplicações dos fabricantes com a minha capa, e muitas funcionam. Mas todas são mesmo más de usar. Não são aplicações nativas para iPhone, é preciso iniciar sessão para fazer quase tudo e, no fim, pôr uma imagem é a única coisa que querem fazer.

Quando olhei para aquele ecrã nas costas do telemóvel, não vi uma moldura digital. Vi um pequeno ecrã sempre ligado que não gasta bateria. É o sítio ideal para a próxima reunião, para a agenda do dia ou para um código QR que alguém pode ler diretamente das costas do meu telemóvel. A aplicação oficial não fazia nada disso, e eu faço uma aplicação que gira toda à volta do NFC. Por isso decidi ensinar eu próprio a NFC.cool a falar com a capa.

---

## Abrir a caixa negra

Fiz isto em conjunto com o Claude, o modelo de IA da Anthropic, que se revelou um parceiro com muita paciência para vasculhar código descompilado.

A primeira ideia era a óbvia: ver como é que a aplicação oficial para iPhone fala com a capa. Não deu em nada. As aplicações da App Store são encriptadas e não havia ali nada de útil para ler.

A versão para Android já foi outra história. A capa é um produto de marca branca, por isso a aplicação do mesmo fabricante existe no Google Play com outro nome, e as aplicações Android podem ser descompiladas. Desmontámo-la e, entre esse código e o que conseguimos encontrar online sobre o chip lá dentro (um chip NFC da Fudan com um microcontrolador por trás), ficámos a conhecer a conversa inteira entre o telemóvel e a capa:

1. O telemóvel e a capa fazem um pequeno aperto de mão de autenticação, para a capa saber que está a falar com uma aplicação legítima.
2. A partir daí, todos os comandos vão encriptados.
3. A imagem segue em 139 pacotes de píxeis em bruto. Cada píxel ocupa dois bits, exatamente o necessário para quatro tintas.
4. O telemóvel diz à capa para se redesenhar e depois pergunta-lhe, a cada segundo, se já terminou.

O meu primeiro teste não escreveu nada de especial, apenas uma cor no ecrã todo. Foi esse o retângulo vermelho.

---

## O muro dos 20 segundos

Depois experimentei imagens a sério, e saíram estragadas. Riscas no ecrã, cores trocadas, meia fotografia.

O redesenho demora cerca de 18 segundos, e a ligação caía sempre por volta dos 20. O Claude estava convencido de que o iOS termina todas as sessões NFC ao fim de 20 segundos e que não havia nada a fazer. Eu não acreditei, porque a aplicação oficial conseguia no mesmíssimo iPhone.

Liguei então o iPhone ao Mac e gravei o registo do sistema enquanto a aplicação oficial desenhava uma imagem. E lá estava o truque: o iOS limita cada *ligação* a uma tag a cerca de 20 segundos, não a sessão inteira. Logo depois de enviar a imagem, a aplicação oficial corta a ligação e volta a ligar-se uma décima de segundo depois, e deixa a capa redesenhar-se nessa ligação nova, com 20 segundos inteiros pela frente.

Assim que a NFC.cool passou a fazer o mesmo, as imagens começaram a sair limpas. Confesso que me soube bem ter razão desta vez.

---

## Uma capa maior e de volta à estaca zero

O meu amigo Alex tem outra destas capas, diferente da minha. É feita para o iPhone 17 Pro Max, vem com uma aplicação chamada **AI Cast Assistant** e o ecrã tem mais de quatro vezes os píxeis do meu.

Quando ele experimentou a NFC.cool nessa capa, a aplicação mostrou um erro. Nem sequer tentou desenhar.

Também não podia simplesmente pedir-lhe a capa emprestada e trabalhar nela em casa. Com o meu 15 Pro Max dentro de uma capa feita para o 17 Pro Max, as coisas ficavam esquisitas. Parece que a antena da capa está afinada para o telemóvel a que se destina. Por isso, tudo o que se segue aconteceu com a capa do Alex, no telemóvel do Alex.

Desta vez, a aplicação Android não ajudou muito. O código que tirámos dela falava com esta capa de uma forma que o iPhone não tem autorização para usar, por isso copiá-lo não nos levou a lado nenhum.

Então construímos um sniffer: uma pequena aplicação Android que se faz passar pela capa. Encosta-se o iPhone ao telemóvel Android, abre-se a AI Cast Assistant, e o iPhone, todo contente, envia a imagem para aquilo que julga ser uma capa, enquanto a aplicação Android aponta cada byte.

Esse registo trazia duas surpresas:

1. A aplicação oficial comprime a imagem antes de a enviar. Nós tínhamos experimentado sem compressão, e a capa respondia OK a cada pacote e depois não desenhava nada.
2. Quando o telemóvel pergunta à capa se já terminou, ela simplesmente não responde enquanto o redesenho não acabar, cerca de 21 segundos depois. Ao reter essa resposta, mantém a ligação ativa, por isso esta capa nunca chega a esbarrar no muro dos 20 segundos.

Assim que a NFC.cool passou a fazer as duas coisas, a primeira imagem que enviámos foi uma fotografia do cão do Alex.

---

## O que a NFC.cool consegue pôr na sua capa

A funcionalidade está na **NFC.cool Tools**, em Aplicações NFC, com o nome **Capa E-ink**. Escolha um design, veja uma pré-visualização exata de como a capa o vai mostrar e toque em **Enviar para a capa**. O seu iPhone já está dentro da capa, por isso não há nada a alinhar: a janela de leitura NFC abre-se, a capa redesenha o ecrã e a janela fecha-se quando termina.

- **Fotografia**: qualquer imagem da sua fototeca, recortada à medida do ecrã. Esta é gratuita. Converte a fotografia nas quatro tintas, com realce de cor (Padrão, Vívido ou Máx.) e uma opção a preto e branco.
- **Recorte**: separa a pessoa, o animal ou o objeto de uma fotografia e coloca-o sobre um fundo numa das quatro tintas.
- **Editor**: comece com uma tela em branco ou uma fotografia e junte texto, emoji e mais fotografias, ou desenhe com uma caneta, um marcador e um balde de tinta. O rascunho fica guardado, por isso pode voltar a ele e alterá-lo mais tarde.
- **AI Playground**: escolha uma fotografia, deixe o Apple Intelligence dar-lhe um novo estilo e ponha o resultado na capa. Este design só aparece nos modelos de iPhone com Apple Intelligence.
- **Código QR**: qualquer código QR que tenha guardado na NFC.cool, com o design que lhe deu, ou um que escreva na hora. Pode invertê-lo, e a aplicação avisa quando o texto é demasiado longo para o código continuar legível num ecrã tão pequeno.
- **Próximo evento** ou um **Evento escolhido** do seu calendário.
- **Agenda de hoje**: tudo o que tem no calendário para hoje.
- **Lembretes**: os lembretes por concluir de uma das suas listas, em três tamanhos de letra.

Os designs do calendário e dos lembretes são retratos de um momento. A capa mostra o que era verdade quando os pôs lá, até pôr o seguinte. Sem o telemóvel, não se consegue atualizar sozinha, e é esse o preço de nunca precisar de carregador.

<figure class="phone-figure" data-layout="stage">
<figcaption>Designs para a capa</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/1-designs-440w.webp" alt="O ecrã E-ink case no NFC.cool Tools, com os designs Photo, QR code e Calendar and Reminders"><p><strong>E-ink case.</strong> Em NFC Apps. Escolha um design e toque em Put on case.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/2-photo-440w.webp" alt="O design Photo: um pôr do sol sobre colinas nas quatro tintas da capa, com Crop e controlo de brilho"><p><strong>Fotografia.</strong> Qualquer imagem, convertida nas quatro tintas da capa.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/3-qr-code-440w.webp" alt="O design QR code, com um código QR guardado nas tintas da capa"><p><strong>Código QR.</strong> Um código que guardou no NFC.cool, ou um que escreve na hora.</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/4-agenda-440w.webp" alt="O design Today's agenda para quinta-feira, 15 de outubro, com cinco eventos das 9:00 às 19:00 e Put on case"><p><strong>Agenda de hoje.</strong> O seu calendário do dia, como instantâneo nas costas do telemóvel.</p></li>
</ol>
</figure>

---

## Uma engenhoca genial, com um senão

Há uma coisa que convém saber antes de comprar uma. Para o iPhone, a capa não é só um ecrã. Também parece uma tag NFC, e pode gravar nela como em qualquer outra tag.

Parece prático, até experimentar. Imagine que grava um link na capa. A capa está mesmo por cima da antena NFC do telemóvel, por isso a leitura de tags em segundo plano do iPhone encontra esse link vezes sem conta e não para de lhe mostrar a notificação. É como andar com um post-it colado na testa que o telemóvel insiste em ler em voz alta.

Também acontece ao contrário. O chip da capa está em cima da antena NFC do telemóvel, por isso, quando encosta outra tag às costas do telemóvel, o iPhone não a reconhece. Só vê a capa.

Já gravei coisas na minha própria capa sem querer mais vezes do que gostaria de admitir. Felizmente, a solução é simples: a NFC.cool consegue formatar a capa outra vez, e a partir daí ela fica sossegada.

Nada disto é motivo para pôr estas capas de parte. Têm o seu quê de engenhoca, mas é uma engenhoca das boas. Só convém saber que um ecrã NFC nas costas do telemóvel e tudo o resto que faz com NFC se atropelam um bocadinho.

---

## Antes de experimentar

**Só no iPhone, por enquanto.** Isto está na aplicação para iPhone. A aplicação para Android ainda não tem.

**Que capas funcionam.** A maioria destas capas vem de um único programador, que publica uma aplicação diferente para quase todas as marcas. Experimentei com a minha capa todas as que consegui encontrar:

- A **DeerPhoneCase**, a **KAZAVA**, a **Novixand** e a **TYOHINN** funcionam com a minha capa, e a NFC.cool também. Se a sua capa veio com uma destas aplicações, a NFC.cool deve funcionar com ela.
- A **Bestie e-INK** e a **KINGZER** não funcionam com a minha. A imagem passa por NFC sem problemas, mas quando a capa devia redesenhar o ecrã, não acontece nada.
- A **SpaceInk+**, de outro programador, não funciona de todo com a minha capa. A aplicação só diz "device channel information mismatch".
- A **AI Cast Assistant** vem com uma capa diferente e maior, e a NFC.cool funciona com ela desde a versão 7.3.0. Só consegui experimentar a do Alex, a do iPhone 17 Pro Max.

Isso não quer dizer que a NFC.cool não funcione com capas da Bestie e-INK, da KINGZER ou da SpaceInk+. Podem ser apenas capas um pouco diferentes da minha, e não as consigo testar. Se tiver uma, [diga-me](/contact/) se a NFC.cool funciona com ela ou não. Se a sua usa outra, a aplicação diz que ainda não é suportada e mostra um botão **Enviar detalhes da capa**. Esse botão envia os dados técnicos do chip, nada que o identifique a si ou à sua capa, para eu perceber que capas as pessoas têm de facto e acrescentá-las.

**Onde comprar uma.** Na Amazon, estas capas aparecem com muitas marcas diferentes, algumas bem enigmáticas, mas por trás estão as mesmas capas. [Aqui fica uma pesquisa na Amazon](https://link.amazon/B0hUxLZTR) (ligação de afiliado). A minha tem DIY impresso por dentro, e alguns anúncios têm DIY no título, por isso é uma boa palavra para procurar. Se o anúncio indicar a aplicação que a capa usa, procure DeerPhoneCase, KAZAVA, Novixand, TYOHINN ou AI Cast Assistant. E compre a capa feita para o seu modelo exato de iPhone: a antena é afinada para esse telemóvel, e o meu 15 Pro Max não se deu nada bem com a capa do Alex, feita para o 17 Pro Max.

---

## Em resumo

Se tem uma destas capas esquecida numa gaveta, ainda com a mesma imagem do primeiro dia, dê-lhe algo mais útil para mostrar. A NFC.cool Tools está na [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-e-ink-phone-case-iphone-pt&mt=8).

E se nunca viu um ecrã e-ink a piscar até mostrar uma imagem enviada por si, recomendo vivamente. São uns segundos muito satisfatórios. Até agora, toda a gente a quem mostrei a capa ficou agradavelmente surpreendida.
