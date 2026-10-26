---
id: "app-clip-lessons-2026-01"
title: "Як зробити добрий App Clip: досвід NFC.cool Business Card"
date: "2026-01-23"
tags: ["business-cards", "networking", "iphone"]
summary: "Переказ доповіді з mDevCamp 2025 у Празі про архітектуру, на якій тримається App Clip у NFC.cool Business Card."
metaDescription: "Досвід створення App Clip для NFC.cool Business Card: архітектура, обмеження на розмір і збереження контакту одним дотиком. Переказ моєї доповіді на mDevCamp 2025 у Празі."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/app-clip-mdevcamp.webp"
imageAlt: "Виступ на mDevCamp 2025 у Празі"
---

У 2025 році я вперше виступив на конференції і взяв тему, всередині якої прожив кілька років, але жодного разу не пояснював її залу: як насправді влаштований App Clip у NFC.cool Business Card. Доповідь була на mDevCamp 2025 у Празі, і назвав я її так само, як цей допис.

Якщо ти з таким ще не стикався, поясню коротко: App Clip запускає невеликий шматок застосунку для iOS одразу після дотику до NFC-мітки чи сканування QR-коду, без App Store і без встановлення. Саме завдяки йому співрозмовник бачить твою візитівку NFC.cool десь за секунду після дотику телефонами, і завантажувати нічого не треба. Щоб це відчувалося миттєвим, а дані картки при цьому лишалися захищеними і реєструватися нікому не доводилося, потрібно куди більше архітектурних рішень, ніж здається збоку. Про них і була доповідь: як влаштований App Clip, де SwiftUI справді на своєму місці і як сервер працює з даними картки.

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/app-clip-lessons-from-business-card/app-clip-440w.webp" alt="App Clip NFC.cool Business Card після дотику: Devon Baptiste з Baptiste Electrical з посиланнями Website, Facebook і YouTube та кнопкою Save Contact"><p><strong>App Clip.</strong> Відкривається приблизно за секунду після дотику, без встановлення.</p></li>
</ol>
</figure>

Пояснювати все це зі сцени було корисно мені самому. Довелося обґрунтувати рішення, які я здебільшого ухвалював на інтуїції, а питання після виступу від iOS-розробників, які явно билися з тим самим, виявилися гострішими за будь-яке рев'ю коду. Схема, на якій я зупинився, тобто App Clip разом зі SwiftUI і захищеним API на сервері, цю перевірку витримала, а кілька порад з розмов у коридорі вже потрапили в застосунок.

Повну доповідь можна подивитися на [Slideslive](https://slideslive.com/39043369/building-a-great-app-clip-experience-lessons-from-nfccool-business-card).
