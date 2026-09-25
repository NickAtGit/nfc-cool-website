---
id: "nfc-alarm-2026-09"
title: "Despertador NFC para iPhone: leia as suas tags para desligar o alarme"
date: "2026-09-24"
tags: ["announcements", "iphone", "nfc-tags"]
summary: "As noitadas a programar perdiam sempre contra o botão de adiar, por isso construí o Alarme NFC na NFC.cool Tools: um despertador para iPhone que só se cala depois de ler, pela ordem certa, um percurso de tags NFC espalhadas pela casa. Explico como funciona e como contornei o botão Parar que a Apple põe em todos os alarmes."
image: "/assets/images/Blog/nfc-alarm-clock.webp"
imageAlt: "Um iPhone com o anel de leitura do alarme em 2 de 3 ao lado de uma máquina do café com um autocolante NFC, e um rasto pontilhado de tags NFC que passa por uma prateleira do corredor e volta até à cama"
author: "Nicolo Stanciu"
metaTitle: "Despertador NFC para iPhone: leia as tags para o desligar"
metaDescription: "Um despertador para iPhone que só para quando lê as suas tags NFC pela ordem certa. Como construí o Alarme NFC com o AlarmKit e contornei o botão Parar."
ogTitle: "Um despertador que não dá para adiar"
ogDescription: "O Alarme NFC só se cala quando lê, uma a uma, as tags NFC espalhadas pela casa. Veja como funciona no iPhone."
---
Ser programador independente tem um ritmo que não quer saber de horários de escritório. O melhor código sai-me tarde, quando as mensagens param e a casa fica em silêncio, e quando dou por mim já são duas da manhã. O despertador, claro, toca à mesma hora de sempre. E eu carrego em adiar. E outra vez. E uma terceira, até já ter perdido metade da manhã que tinha planeado.

Passei algum tempo a pensar no que podia fazer quanto a isto. Um despertador mais alto? Acabaria por me habituar e continuar a dormir. Deixar o telemóvel do outro lado do quarto? Levantava-me, carregava em Parar e voltava a enfiar-me na cama. O problema nunca foi ouvir o despertador. O problema é que desligá-lo custava um toque e zero esforço mental.

Até que me lembrei: passo os dias a construir uma aplicação para tags NFC. Porque não juntar as duas coisas e espalhar pela casa um percurso de tags que tenho de seguir todas as manhãs antes de o despertador me deixar em paz?

Assim nasceu o **Alarme NFC**, que já faz parte da NFC.cool Tools no iPhone. A versão para Android chega em breve.

---

## Da cama à máquina do café

O meu percurso tem três paragens. A primeira tag está ao lado da cama. A segunda, numa prateleira do corredor. A terceira está colada à máquina do café.

Quando o despertador toca, tenho de ler as três, e por esta ordem. A da cama é fácil, está mesmo ali. Mas depois tenho de me levantar e ir até ao corredor, e quando chego à máquina do café já estou de pé, exatamente no sítio onde a minha manhã começa. Nessa altura, voltar para a cama seria ridículo. Mais vale carregar no botão e tirar um café.

A ordem conta. Se desse para ler as tags por qualquer ordem, bastava deixá-las todas na mesa de cabeceira e despachar o assunto sem sair do lugar. Por isso a aplicação fica à espera da tag seguinte do percurso e, se encostar a errada, avisa logo: "Esta não é Corredor". Depois de ler a última, recebe uma chuva de confétis, um "Bom dia", e o alarme fica desligado por hoje. Amanhã volta a tocar como de costume.

E sim, funciona. O percurso tira-me mesmo da cama, coisa que nenhum despertador que tive até hoje conseguiu.

---

## O botão Parar que não consegui tirar

Esta foi a parte que me deu mais que pensar. O Alarme NFC assenta no **AlarmKit**, a framework da Apple que permite às aplicações fazer tocar um alarme a sério, daqueles que tocam mesmo com o telemóvel em silêncio e ocupam o ecrã bloqueado tal como os da aplicação Relógio. É exatamente o que uma aplicação de despertador precisa, com um senão: todos os alarmes do AlarmKit trazem um botão **Parar** desenhado pelo próprio sistema. Nenhuma aplicação o pode remover, esconder ou mudar de aspeto.

Ou seja, em teoria, um despertador que insiste para que vá até às suas tags vem com um botão que o desliga com um único toque. Não é famoso.

A minha solução: um Alarme NFC não é um alarme só. É uma cadeia inteira deles. Por trás da hora que definiu, a aplicação agenda alertas de reforço com poucos minutos de intervalo. Por omissão são mais 20, com um minuto entre cada um, e pode escolher 5, 10, 15 ou 20 alertas extra e um intervalo de 1, 2, 3 ou 5 minutos. Carregar em Parar no ecrã bloqueado só cala o alerta que está a tocar naquele momento. Um minuto depois, toca o seguinte. Só ler o percurso completo cancela o resto da cadeia dessa manhã, e o alarme em si continua ativo para o dia seguinte.

No fundo, o botão Parar é só um botão de silêncio com um prazo de validade muito curto.

O AlarmKit dá a cada aplicação direito a um único botão próprio ao lado do Parar. A maior parte das aplicações de despertador poria ali o adiar. Eu usei-o para **Ler para parar**, que abre a aplicação diretamente no ecrã de leitura. Por isso, no ecrã bloqueado não há botão de adiar, e é de propósito.

Dois pormenores mais pequenos que descobri ao testá-lo em mim próprio:

- Enquanto está a ler as tags, o toque faz uma pausa. Ninguém quer um alarme aos berros na mão enquanto encosta o telemóvel a uma tag. Mas, se desistir a meio, o alerta seguinte da cadeia toca na mesma.
- Enquanto o alarme está a tocar, a aplicação não deixa desativá-lo, apagá-lo nem editá-lo na lista de alarmes. Descobri estas escapatórias da forma mais honesta possível: com muito sono e muita imaginação às 7 da manhã.

---

## A saída de emergência

As tags perdem-se. Um autocolante descola-se da máquina do café, uma tag avaria ou vai passar a noite fora de casa. Um despertador impossível de desligar seria péssima ideia, por isso há uma **Paragem de emergência** no ecrã de leitura, que funciona sempre, com ou sem tags.

Só que obriga a escrever esta frase, palavra por palavra:

"Por favor, para, eu sei que tenho de configurar todas as minhas etiquetas outra vez."

É de propósito. Queria que a saída demorasse mais ou menos o mesmo que fazer o percurso, para nunca ser o caminho mais preguiçoso. E tem um preço a sério: a paragem de emergência desliga e apaga *todos* os alarmes, por isso a seguir tem o privilégio de configurar as tags todas outra vez. Existe para quando alguma coisa está mesmo avariada, não para aquela terça-feira em que a cama parece ainda mais confortável do que o costume. Fi-la para me castigar a mim próprio, e cumpre bem a função.

---

## Porquê NFC, e não uma fotografia do lavatório

Há aplicações de despertador que obrigam a fotografar o lavatório da casa de banho ou a ler o código de barras da pasta de dentes. Funcionam. Mas eu prefiro NFC para isto, e não só porque está no nome da minha aplicação.

Uma tag NFC, por si só, não passa de um bocadinho de metal. Um chip minúsculo com um identificador e mais nada, pousado numa prateleira. O que mais gosto em construir a NFC.cool é dar sentido a esse bocadinho de metal: transformar um autocolante que custa uns cêntimos em algo que faz realmente diferença no seu dia a dia. Com o Alarme NFC, a tag nem sequer precisa de ter conteúdo. A aplicação reconhece cada tag pelo ID do chip e não grava nada nela. Serve qualquer tag, incluindo aquele pacote de autocolantes esquecido na gaveta. E a luz também não interessa: uma tag lê-se perfeitamente num corredor às escuras, onde uma câmara teria dificuldades, e não é preciso apontar para nada.

Se ainda não tem tags, o meu [guia de tags NFC para principiantes](/blog/nfc-tags-beginners-guide/) explica quais deve comprar.

---

## Como configurar

O Alarme NFC precisa de um iPhone com iOS 26 ou posterior, porque é aí que o AlarmKit existe. Encontra-o no separador NFC, em **Aplicações NFC**. Crie um alarme, escolha a hora e os dias e depois leia as tags pela ordem em que as quer percorrer. Pode dar um nome a cada tag para saber qual vem a seguir. Espalhe-as por um percurso que o obrigue mesmo a sair da cama. Ao lado da cama é um bom começo, a cozinha é um final ainda melhor.

O Alarme NFC é gratuito e está na [NFC.cool Tools na App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-alarm-clock-pt&mt=8). A sua máquina do café está à espera.
