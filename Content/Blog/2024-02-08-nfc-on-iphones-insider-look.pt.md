---
id: nfc-blog-020
title: "NFC no iPhone por dentro: um olhar de quem o conhece"
date: 2024-02-08
tags: ["nfc-tags", "iphone"]
summary: "Como o NFC funciona realmente no iPhone - desde o elemento seguro do Apple Pay até à leitura de tags com o Core NFC. Um olhar prático sobre o protocolo, a história no iOS e porque o curto alcance é uma funcionalidade, não uma limitação."
metaTitle: "Como Funciona o NFC no iPhone: Um Olhar de Quem o Conhece"
metaDescription: "Uma explicação prática do NFC no iPhone - como funciona o protocolo, o elemento seguro do Apple Pay, a leitura de tags com o Core NFC e porque o curto alcance é uma funcionalidade de segurança."
ogTitle: "NFC no iPhone por dentro: um olhar de quem o conhece"
ogDescription: "Como o NFC funciona realmente no iPhone - protocolo, elemento seguro, leitura de tags com o Core NFC e a história no iOS."
image: "/assets/images/Blog/nfc-on-iphones-insider-look.webp"
---
Grande parte da tecnologia que usamos todos os dias desaparece para segundo plano. Faz um toque para pagar, desbloquear, digitalizar, partilhar - e nunca pensa no protocolo que está por baixo. O NFC é uma dessas peças discretas da canalização, e depois de anos a construir a NFC.cool, uma app para ler e gravar tags NFC, passei mais tempo dentro dessa canalização do que a maioria das pessoas alguma vez passará. Eis como ele funciona realmente no seu iPhone, da forma como eu o explicaria a um amigo curioso.

---

## O que é realmente o NFC

**Near Field Communication** é um protocolo sem fios de curto alcance - dois dispositivos podem trocar dados quando estão a cerca de 4 cm um do outro. Eu penso nele como um primo simplificado e de alcance muito mais curto do Bluetooth e do Wi-Fi.

Esse curto alcance baralha as pessoas ao início, mas não é uma limitação. É o modelo de segurança, e assim que isto fez sentido para mim, muitas das escolhas de design do NFC passaram a fazer sentido. Não consegue fazer um toque acidental num terminal de pagamento do outro lado da sala, e um leitor malicioso não consegue extrair dados em silêncio da sua carteira à distância. Se isto tudo é novo para si, eu escrevi um [guia para principiantes sobre tags NFC](/blog/nfc-tags-beginners-guide/) que começa mais atrás do que este artigo.

---

## NFC no iPhone: uma breve história

A Apple incluiu hardware NFC pela primeira vez no iPhone 6 e 6 Plus em 2014, mas o rádio estava bloqueado apenas para o Apple Pay. As apps de terceiros não conseguiam ler tags NFC de todo - o que, para alguém que viria mais tarde a construir uma app de NFC, foram uns anos frustrantes de assistir.

Isso mudou com o **iOS 11** (2017), que introduziu a framework **Core NFC** e finalmente permitiu a programadores como eu ler tags NDEF. A Apple continuou a abrir mais a porta nos lançamentos seguintes - o iOS 13 adicionou suporte para gravação, e o iPhone XS e mais recentes adicionaram a leitura de tags em segundo plano sempre ativa. Hoje, em qualquer iPhone moderno, pode fazer um toque numa tag sem abrir nada: o sistema operativo reconhece-a e oferece a ação certa.

---

## Como o NFC movimenta realmente os dados

Os dispositivos NFC operam num de dois papéis por interação: **ativo** (alimentado, gera um campo) ou **passivo** (sem bateria, capta energia do campo). Esta é a única ideia a que volto sempre que alguém me pergunta como funciona o NFC.

Quando faz um pagamento com o Apple Pay, o seu iPhone é o leitor ativo. Gera um campo de rádio a 13,56 MHz. O elemento NFC do terminal de pagamento desperta dentro desse campo, identifica-se e troca uma pequena quantidade de dados criptográficos com o seu telemóvel. Os dados do seu cartão nunca saem do **Secure Element** - um chip dedicado e isolado por hardware no telemóvel. O que sai é um token de utilização única.

Quando faz um toque num autocolante NFC num cartaz, os papéis invertem-se. A tag do cartaz é passiva - não tem bateria. O leitor do seu iPhone alimenta-a, a tag responde com os registos NDEF que tiver guardados, e o iOS decide o que fazer (abrir um URL, lançar uma app, mostrar um cartão de contacto, acionar um Atalho). Essa segunda metade - o lado da tag - é a parte onde a NFC.cool vive, e se quiser vê-la em ação sem instalar nada, pode [ler tags NFC diretamente do seu navegador](/online-nfc-reader/) no Android.

---

## NDEF: a língua franca

A camada de dados por cima do rádio NFC é o **NDEF** - NFC Data Exchange Format. Eu descrevo-o como um pequeno formato de registo autodescritivo: uma tag transporta um ou mais registos, e cada registo tem um tipo (URI, texto, vCard, credenciais Wi-Fi, MIME personalizado) e um conteúdo.

Todos os telemóveis com NFC do planeta falam NDEF, e é por isso que uma tag programada num dispositivo Android é lida sem problemas num iPhone e vice-versa. É um dos poucos sítios no mundo móvel onde o iOS e o Android partilham genuinamente uma norma, e, sinceramente, essa interoperabilidade é a coisa pela qual fico mais grato quando estou a construir funcionalidades - escrevo para o formato, não para uma plataforma. Se quiser experimentar gravar os seus próprios registos, eu explico tudo em [como gravar tags NFC no iPhone](/blog/write-nfc-tags-iphone/).

---

## Privacidade e segurança

Vale a pena mencionar duas camadas de defesa, e são as duas que mais me dou por explicar:

- **Alcance.** Poucos centímetros são difíceis de intercetar sem uma antena percetível - este é o modelo de ameaça original em torno do qual o NFC foi concebido.
- **Tokenização.** O Apple Pay nunca transmite o número real do seu cartão. Cada transação usa um Device Account Number e um criptograma de utilização única, gerado dentro do Secure Element. Nem mesmo um terminal comprometido o consegue reproduzir.

Para a leitura de tags, a superfície de ameaça é diferente - a própria tag é aquilo em que se confia. Se controla o que está na tag (as suas próprias automações domésticas, o seu cartão de visita), está tudo bem. Se fizer um toque numa tag aleatória num espaço público, deve ainda assim ver um pedido de confirmação no iOS antes de qualquer coisa acontecer. Quando preciso mesmo que uma tag guarde um segredo em vez de apenas apontar para um, recorro a tags criptográficas, e eu abordei isso em [guardar segredos seguros e encriptados em tags NFC](/blog/nfc-safe-encrypted-secrets/).

---

## Porque é que isto importa

O NFC é um daqueles protocolos que desaparece quando funciona, e é exatamente por isso que acho satisfatório construir sobre ele. Faz um toque num torniquete, num terminal de pagamento, num cartão de visita, numa coluna inteligente - e algo acontece. Não há emparelhamento, não há PIN, não há lançamento de app. Apenas um gesto físico deliberado que autoriza uma troca específica.

É por isso que eu construí a [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-on-iphones-insider-look-en&mt=8) - para tornar toda a superfície NDEF do NFC disponível sem que ninguém tenha de aprender o protocolo primeiro. Leia qualquer tag, grave qualquer tipo de registo, bloqueie uma tag quando terminar. No iPhone ou no [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-nfc-on-iphones-insider-look-en).
