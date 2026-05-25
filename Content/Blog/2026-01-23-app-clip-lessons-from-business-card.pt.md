---
id: "app-clip-lessons-2026-01"
title: "Criar uma Ótima Experiência de App Clip: Lições do NFC.cool Business Card"
date: "2026-01-23"
tags: ["business-cards", "networking", "iphone"]
summary: "Resumo da palestra na mDevCamp 2025 em Praga sobre a arquitetura por trás do fluxo de App Clip do NFC.cool Business Card."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/app-clip-mdevcamp.webp"
imageAlt: "A apresentar na mDevCamp 2025 em Praga"
---

Em 2025 dei a minha primeira palestra numa conferência, e escolhi um tema dentro do qual tinha vivido durante anos, mas que nunca tinha tido de explicar a uma sala: como funciona, na realidade, o App Clip por trás do NFC.cool Business Card. A palestra foi na mDevCamp 2025 em Praga, e dei-lhe o mesmo título deste artigo.

Se nunca se cruzou com um, um App Clip é a pequena parte de uma app iOS que abre instantaneamente a partir de um toque NFC ou da leitura de um código QR - sem App Store, sem instalação. É o que permite que alguém veja o seu cartão de visita NFC.cool cerca de um segundo depois de tocar com os telemóveis, sem descarregar nada. Fazer com que isso pareça instantâneo, mantendo ao mesmo tempo os dados do cartão partilhado seguros e sem obrigar ninguém a registar-se, exige mais decisões de arquitetura do que parece visto de fora. A palestra percorreu-as: como o App Clip está estruturado, onde o SwiftUI ganha o seu lugar e como o backend trata os dados do cartão.

Explicá-lo a partir de um palco foi bom para mim. Obrigou-me a justificar escolhas que tinha feito sobretudo por instinto, e as perguntas no final - de programadores iOS que claramente tinham travado as mesmas batalhas - foram mais afiadas do que qualquer revisão de código. A forma pela qual tinha optado, App Clips com SwiftUI e uma API de backend segura, aguentou esse escrutínio, e algumas sugestões das conversas de corredor já chegaram à app.

Pode ver a palestra completa no [Slideslive](https://slideslive.com/39043369/building-a-great-app-clip-experience-lessons-from-nfccool-business-card).
