---
id: "e-ink-phone-case-2026-10"
title: "Hackeei a minha capa com ecrã e-ink para o iPhone conseguir escrever nela"
date: "2026-10-12"
tags: ["announcements", "iphone", "nfc-tags"]
summary: "Tenho uma daquelas capas de telemóvel com ecrã e-ink NFC, sem bateria, e não gostava da aplicação que vinha com ela. Por isso, descobri como é que ela comunica, e a NFC.cool Tools 7.2.0 já consegue pôr fotografias, códigos QR, o próximo evento, a agenda do dia e os seus lembretes nas capas que usam a aplicação DeerPhoneCase, KAZAVA, Novixand ou TYOHINN."
image: "/assets/images/Blog/nfc-e-ink-phone-case-iphone.webp"
imageAlt: "Um iPhone numa capa preta com um ecrã e-ink nas costas a mostrar um sol vermelho e amarelo sobre colinas pretas, ao lado de um segundo iPhone a enviar a mesma imagem por NFC"
author: "Nicolo Stanciu"
metaTitle: "Capa de telemóvel e-ink NFC no iPhone: fotos, agenda, QR"
metaDescription: "Ponha fotografias, códigos QR, a agenda e lembretes numa capa e-ink NFC sem bateria a partir do iPhone. Funciona com capas DeerPhoneCase, KAZAVA, Novixand e TYOHINN."
ogTitle: "Hackeei a minha capa e-ink para o iPhone escrever nela"
ogDescription: "Como descobri o protocolo de uma capa de telemóvel e-ink NFC sem bateria, e o que a NFC.cool já consegue pôr no ecrã dela."
---

O ecrã piscou.

É um pormenor. Os ecrãs e-ink fazem isto sempre que se redesenham: um clarão rápido por todas as cores antes de a nova imagem assentar. Só que este clarão vinha de código escrito por mim, enviado do meu iPhone para as costas de uma capa de telemóvel que não tem bateria. Uns segundos depois, o ecrã inteiro estava vermelho, um vermelho uniforme com um ar ligeiramente de papel. Mais nada. Só vermelho.

Ao longo dos anos construí muitas funcionalidades NFC, e aquele simples retângulo vermelho continua a ser um dos momentos de que mais gosto.

---

## Um ecrã sem bateria

Se nunca viu uma destas capas: parece uma capa de telemóvel normal, só que boa parte das costas é um ecrã e-ink, o mesmo tipo de ecrã de um leitor de livros digitais. O meu desenha com quatro tintas: preto, branco, vermelho e amarelo.

Lá dentro não há bateria nem porta de carregamento. A capa vai buscar a energia ao campo NFC do telemóvel, o mesmo campo que acorda um autocolante NFC quando o lê. Enquanto o telemóvel está encostado à capa, alimenta um pequeno chip e um microcontrolador, que redesenham o ecrã. Depois de a imagem lá estar, o e-ink não precisa de energia nenhuma para a manter. Fica simplesmente ali, com o telemóvel desligado, numa gaveta, onde for.

Para mim, é como um Etch A Sketch, aquele quadro de desenhar que se apaga a abanar, só que aqui quem o abana é o telemóvel. Nada muda até voltar a encostá-lo.

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

## O que a NFC.cool consegue pôr na sua capa

A funcionalidade está na **NFC.cool Tools 7.2.0**, em Aplicações NFC, com o nome **Capa E-ink**. Escolhe um design, vê uma pré-visualização exata de como a capa o vai mostrar, tira a capa do telemóvel e encosta o iPhone às costas dela até a janela de leitura NFC fechar.

- **Fotografia**: qualquer imagem da sua fototeca, recortada à medida do ecrã. Esta é gratuita. Converte a fotografia nas quatro tintas, com realce de cor (Padrão, Vívido ou Máx.) e uma opção a preto e branco.
- **Recorte**: separa a pessoa, o animal ou o objeto de uma fotografia e coloca-o sobre um fundo numa das quatro tintas.
- **Código QR**: qualquer código QR que tenha guardado na NFC.cool, com o design que lhe deu, ou um que escreva na hora. Pode invertê-lo, e a aplicação avisa quando o texto é demasiado longo para o código continuar legível num ecrã tão pequeno.
- **Próximo evento** ou um **Evento escolhido** do seu calendário.
- **Agenda de hoje**: tudo o que tem no calendário para hoje.
- **Lembretes**: os lembretes por concluir de uma das suas listas, em três tamanhos de letra.

Os designs do calendário e dos lembretes são retratos de um momento. A capa mostra o que era verdade quando os pôs lá, até pôr o seguinte. Sem o telemóvel, não se consegue atualizar sozinha, e é esse o preço de nunca precisar de carregador.

---

## Antes de experimentar

**Dê um descanso à capa entre gravações.** Se puser dois designs seguidos, o segundo sai desbotado e cinzento. A capa precisa de um momento para recuperar entre um redesenho e o seguinte. A aplicação oficial pede para esperar um minuto, e é um bom conselho também para a NFC.cool.

**Não mexa o telemóvel.** O processo todo demora um bocadinho, quase tudo no próprio redesenho. Se o afastar antes do tempo, a aplicação avisa e basta tentar outra vez.

**Só no iPhone, por enquanto.** Isto está na aplicação para iPhone. A aplicação para Android ainda não tem.

**Que capas funcionam.** A maioria destas capas vem de um único programador, que publica uma aplicação diferente para quase todas as marcas. Experimentei com a minha capa todas as que consegui encontrar:

- A **DeerPhoneCase**, a **KAZAVA**, a **Novixand** e a **TYOHINN** funcionam com a minha capa, e a NFC.cool também. Se a sua capa veio com uma destas aplicações, a NFC.cool deve funcionar com ela.
- A **Bestie e-INK** e a **KINGZER** não funcionam com a minha. A imagem passa por NFC sem problemas, mas quando a capa devia redesenhar o ecrã, não acontece nada.
- A **SpaceInk+**, de outro programador, não funciona de todo com a minha capa. A aplicação só diz "device channel information mismatch".

Isso não quer dizer que a NFC.cool não funcione com capas da Bestie e-INK, da KINGZER ou da SpaceInk+. Podem ser apenas capas um pouco diferentes da minha, e não as consigo testar. Se tiver uma, [diga-me](/contact/) se a NFC.cool funciona com ela ou não. Se a sua usa outra, a aplicação diz que ainda não é suportada e mostra um botão **Enviar detalhes da capa**. Esse botão envia os dados técnicos do chip, nada que o identifique a si ou à sua capa, para eu perceber que capas as pessoas têm de facto e acrescentá-las.

**Onde comprar uma.** Na Amazon, estas capas aparecem com muitas marcas diferentes, algumas bem enigmáticas, mas por trás estão as mesmas capas. [Aqui fica uma pesquisa na Amazon](https://link.amazon/B0hUxLZTR) (ligação de afiliado). A minha tem DIY impresso por dentro, e alguns anúncios têm DIY no título, por isso é uma boa palavra para procurar. Se o anúncio indicar a aplicação que a capa usa, procure DeerPhoneCase, KAZAVA, Novixand ou TYOHINN.

---

## Em resumo

Se tem uma destas capas esquecida numa gaveta, ainda com a mesma imagem do primeiro dia, dê-lhe algo mais útil para mostrar. A NFC.cool Tools está na [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-e-ink-phone-case-iphone-pt&mt=8).

E se nunca viu um ecrã e-ink a piscar até mostrar uma imagem enviada por si, recomendo vivamente. São uns segundos muito satisfatórios.
