---
id: nfc-blog-022
title: "Toque, leia, prospere: o que os códigos QR podem transportar para além de um URL"
date: 2024-02-17
tags: ["qr-codes", "business-cards"]
summary: "Os códigos QR não servem apenas para URLs. Podem transportar credenciais Wi-Fi, eventos de calendário, localizações, vCards, texto simples - tudo o que seja possível codificar. Eis o menu completo do que o gerador e o leitor de QR da NFC.cool conseguem fazer."
metaTitle: "O Que os Códigos QR Podem Transportar: Para Além de Simples URLs"
metaDescription: "Os códigos QR conseguem codificar credenciais Wi-Fi, contactos, eventos de calendário, localizações e mais - não apenas URLs. Um guia prático para cada tipo de conteúdo de QR."
ogTitle: "Toque, leia, prospere: o que os códigos QR podem transportar para além de um URL"
ogDescription: "Os códigos QR conseguem codificar Wi-Fi, contactos, calendários, localizações - não apenas URLs."
image: "/assets/images/Blog/tap-scan-thrive.webp"
---
Um código QR é apenas um conjunto de bytes. Os URLs são de longe o conteúdo mais comum, mas a especificação não se importa - pode codificar credenciais Wi-Fi, um evento de calendário, um marcador no mapa, um cartão de contacto, texto simples ou qualquer conteúdo personalizado que uma app saiba descodificar.

O gerador de QR da NFC.cool cobre tudo isso. Eis o que cada um faz de facto quando é lido.

---

## URLs

O caso básico. Codifique `https://example.com`, leia com qualquer câmara, e o dispositivo oferece-se para o abrir. Funciona em todos os telemóveis feitos na última década.

Uma variante útil: links curtos. Se tem URLs carregados de parâmetros de análise, gere o QR sobre a versão curta - torna o código QR fisicamente mais pequeno (menos módulos = menos denso) e mais fácil de ler à distância.

---

## Credenciais Wi-Fi

Codifique um SSID, palavra-passe e tipo de segurança (WPA2, WPA3, aberto) no formato padrão `WIFI:T:WPA;S:...;P:...;;`. O iOS, o Android e o Windows moderno reconhecem todos o formato e propõem ligar-se.

Imprima isto num pequeno cartão no seu quarto de hóspedes. Cole-o nas costas do router. Pendure-o na parede de um café. Os hóspedes leem, ligam-se, pronto - sem ter de escrever palavras-passe de 24 caracteres.

---

## Eventos de calendário

Codifique um evento como um bloco `BEGIN:VEVENT` (o formato iCalendar). A leitura oferece-se para o adicionar à app de calendário do dispositivo, completo com hora de início, hora de fim, localização e descrição.

Útil em cartazes de eventos, sinalética de conferências ou cartões "guarde a data". O destinatário não tem de encontrar o evento num site - faz um toque uma vez e fica no seu calendário.

---

## Localizações

Codifique um URI `geo:` com latitude e longitude. A leitura abre a app de mapas predefinida nesse marcador - o Apple Maps no iOS, o Google Maps na maioria dos telemóveis Android.

Restaurantes, locais de eventos, pontos de encontro: cole um pequeno QR no panfleto ou convite, e os destinatários obtêm indicações com um toque.

---

## vCard (contactos)

A alternativa mais comum aos URLs. Codifique um vCard completo (nome, telefone, email, organização, morada, URL, fotografia) e o dispositivo oferece-se para o guardar como contacto.

Os cartões de visita em QR funcionam assim, logo à partida. É também por isso que um QR com vCard funciona em todos os telemóveis sem nenhuma app especial - o vCard é uma norma com 30 anos que o sistema operativo já conhece.

O compromisso face ao fluxo de cartão de visita da NFC.cool: um QR com vCard não pode ser atualizado. Uma vez impresso, os dados de contacto ficam congelados. Se quiser uma "fonte única de verdade" que possa editar mais tarde, codifique antes um URL para a sua página de cartão de visita ativa - é o que o [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-tap-scan-thrive-en&mt=8) faz, e é por isso que o recomendamos em vez de um QR com vCard puro para networking a sério.

---

## Texto simples

Se quiser apenas mostrar uma cadeia de texto quando o código é lido - uma mensagem, um código de cupão, um enigma - pode codificar texto simples. A maioria das apps de leitura mostra-o e oferece-se para o copiar ou partilhar.

---

## Conteúdos personalizados

Algumas apps registam esquemas de URL personalizados (`myapp://...`) e reconhecem códigos QR codificados com eles. O leitor da NFC.cool respeita-os - lê o conteúdo e entrega-o à app registada, da mesma forma que o iOS ou o Android fariam através de Universal Links.

---

## Do lado da leitura

O leitor da NFC.cool lê qualquer um dos formatos acima e encaminha-os para a ação certa: os URLs abrem no navegador, os vCards oferecem-se para guardar, o Wi-Fi propõe ligar, as localizações abrem nos mapas. Mantém também um histórico local de cada leitura, o que é útil quando leu 30 ementas numa conferência e quer voltar a uma delas.

Toda a stack de QR - gerador e leitor - está disponível na [NFC.cool Tools para iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-tap-scan-thrive-en&mt=8) e no [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-tap-scan-thrive-en).
