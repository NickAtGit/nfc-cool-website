---
id: "nfc-safe-2026-05"
title: "NFC Safe: Guardar Segredos Encriptados em Tags NFC Duradouras"
date: "2026-05-03"
tags: ["nfc-tags", "privacy"]
summary: "AES de 256 bits em tags NFC revestidas a epóxi. As cópias de segurança em papel ardem. As cópias na nuvem ficam offline. As tags NFC não."
image: "/assets/images/Blog/nfc-safe-encrypted-secrets.webp"
imageAlt: "Telemóvel, cartão NFC, escudo e cadeado a representar segredos NFC encriptados"
author: "Nicolo Stanciu"
---

A sua seed phrase está provavelmente num pedaço de papel. Talvez num cofre. Talvez debaixo de uma tábua do soalho. Talvez dividida por três locais porque alguém no Reddit disse que é o que as pessoas "a sério" do mundo cripto fazem. Mas continua a ser papel. O papel arde. O papel inunda-se. O papel perde-se.

Passei anos a construir a NFC.cool, uma aplicação para ler e gravar tags NFC, e a certa altura comecei a fazer-me uma pergunta que não tem nada a ver com pagamentos ou cartões de acesso: e se a sua cópia de segurança não pudesse apodrecer, não pudesse degradar-se, e não parecesse nada para quem a encontrasse?

É por causa dessa pergunta que construí o **NFC Safe**. Ele encripta qualquer texto - seed phrases, palavras-passe, códigos de recuperação, o que quer que precise de manter secreto - numa tag NFC com encriptação AES de 256 bits. A tag é autónoma. Sem nuvem. Sem servidor. Sem conta. Para ler o segredo, precisa da tag física *e* da frase-passe. Sem ambas, a tag é apenas um pequeno pedaço de plástico com um amontoado de caracteres sem sentido.

Houve uma coisa em que insisti muito ao desenhar isto: não queria que os seus segredos dependessem da existência da minha aplicação. Por isso, o formato de encriptação está [totalmente documentado e aberto](https://github.com/NickAtGit/nfc.cool-nfc-safe-format), incluindo um descodificador de referência em Python. Se a NFC.cool alguma vez desaparecer, ainda poderá recuperar os seus dados com um leitor NFC normal e a especificação. É uma promessa que consigo cumprir porque escrevi a especificação para sobreviver ao software.

---

## O problema de guardar segredos

Se me pedisse para nomear o ponto fraco de todos os métodos de armazenamento de segredos que já vi, conseguiria fazê-lo sem pensar: o papel arde, os conectores USB corroem-se, os serviços na nuvem são alvo de fugas, as carteiras de hardware só lidam com seed phrases de cripto, e o seu cérebro esquece-se. Cada opção falha à sua maneira.

Por isso trabalhei de trás para a frente. A cópia de segurança ideal seria fisicamente duradoura, encriptada, autónoma, redundante e de longa duração. As tags NFC cumprem as cinco, e isso também me surpreendeu ao início. Não têm bateria, não têm peças móveis, e o chip NTAG216 está classificado para mais de 10 anos de retenção de dados. As variantes revestidas a epóxi sobrevivem à água, ao impacto e a décadas de abandono. Se ainda não conhece as diferenças entre estes chips, expliquei os prós e contras em [tipos de tags NFC para iPhone](/blog/nfc-tag-types-for-iphones/).

---

## Como usar o NFC Safe

O NFC Safe vive dentro da NFC.cool Tools, em NFC Apps. Mantive tudo num único ecrã, com um controlo segmentado no topo - Encriptar ou Desencriptar. Se já alguma vez gravou uma tag, nada disto lhe parecerá estranho.

**Para encriptar:**
1. Abra Tools → NFC Apps → NFC Safe
2. Selecione **Encriptar**
3. Escreva ou cole o seu segredo
4. Defina uma frase-passe forte
5. Toque em Encriptar; encoste uma tag NFC ao seu telemóvel

**Para desencriptar:**
1. No mesmo ecrã, mude para **Desencriptar**
2. Introduza a sua frase-passe
3. Toque numa tag previamente encriptada - o seu segredo aparece

Nos bastidores, eis o que estou de facto a fazer: AES-256-GCM com PBKDF2 (HMAC-SHA-256, 100 000 iterações, salt aleatório de 16 bytes). O resultado é guardado na tag como um registo NDEF personalizado (`urn:nfc:ext:crypto`). Se quiser verificar tudo isto por si próprio em vez de acreditar na minha palavra, a [especificação completa do formato está no GitHub](https://github.com/NickAtGit/nfc.cool-nfc-safe-format). E se tiver curiosidade em ver primeiro como é uma gravação normal, sem encriptação, descrevo-a passo a passo em [como gravar tags NFC no iPhone](/blog/write-nfc-tags-iphone/).

---

## A estratégia de redundância

Eis como eu próprio usaria isto. Uma tag NTAG216 custa mais ou menos o mesmo que um café, por isso não há razão para fazer apenas uma. Compre algumas, encripte o mesmo segredo em cada uma e distribua-as: gaveta da secretária, escritório, casa de um familiar, cofre de um banco, algures onde só você se lembraria de procurar. Cada tag, por si só, não significa nada sem a frase-passe. É a parte de que mais gosto neste design - é de dois fatores por natureza: uma tag física mais uma frase-passe, guardadas em dois locais separados, sem qualquer configuração adicional da sua parte.

---

## Porquê NFC em vez de USB ou cartão SD

As pessoas perguntam-me porque é que não apontei toda a gente simplesmente para uma pen USB ou um cartão SD. A resposta honesta é que vi demasiados desses falharem de formas aborrecidas e evitáveis. O NFC contorna todas elas:

- **Sem conector** - nada para corroer ou dobrar
- **Sem bateria** - passivo, alimentado pelo leitor
- **Sem sistema de ficheiros** - nada para corromper
- **Sem driver** - todos os smartphones leem NFC nativamente
- **Pequeno e barato** - do tamanho de uma moeda, abaixo de um dólar em quantidade
- **Duradouro** - as variantes em epóxi aguentam água, impacto e UV

O único limite real é a capacidade: cerca de 500 a 700 bytes depois da sobrecarga da encriptação. Não é muito, mas é mais do que suficiente para aquilo a que isto realmente serve - uma seed phrase de 24 palavras, uma palavra-passe principal ou um conjunto de códigos de recuperação.

---

## Notas de segurança

Prefiro ser claro quanto às arestas afiadas do que deixar que as descubra mais tarde:

- **A sua frase-passe é tudo.** O AES de 256 bits é inquebrável. Uma frase-passe fraca não é. Use uma cadeia de mais de 20 caracteres gerada aleatoriamente e não faça cedências aqui.
- **O alcance do NFC é curto** (~4 cm). Ninguém faz uma leitura do outro lado da sala - esse alcance minúsculo é uma vantagem, não um defeito.
- **Não há limpeza remota.** Perdeu a tag? Destrua-a fisicamente. Uma tesoura resolve, e além disso os dados são inúteis sem a frase-passe.
- **Não há recuperação da frase-passe.** Esqueça-a e os dados desaparecem. Tomei essa decisão deliberadamente - um caminho de recuperação é também um caminho de ataque. Anote a frase-passe algures separado das tags.

---

## A visão mais ampla

A trabalhar com NFC todos os dias, tenho visto estas tags tornarem-se discretamente o meio de armazenamento de coisas que importam. O Passaporte Digital de Produto da UE vai exigir NFC para autenticidade de produtos. A Philips coloca-as nas cabeças das escovas de dentes. Os hotéis usam-nas como chaves de quarto. Baratas, duradouras e universalmente legíveis pelo dispositivo que já tem no bolso - essa combinação é rara, e é exatamente por isso que continuo a encontrar-lhes novos usos. Se quiser uma perspetiva mais alargada, abordei os fundamentos em [tags NFC explicadas: um guia completo para principiantes](/blog/nfc-tags-beginners-guide/).

O NFC Safe é a minha tentativa de pegar nessa durabilidade e acrescentar a única coisa que lhe faltava - encriptação. Uma cópia de segurança que dura mais do que o papel, que não pode ser lida por quem a encontre, e que custa menos do que uma chávena de café. É o tipo de coisa que eu queria para mim próprio, por isso construí-a.

Já disponível na [NFC.cool Tools para iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-safe-encrypted-secrets-en&mt=8). Em breve para Android.
