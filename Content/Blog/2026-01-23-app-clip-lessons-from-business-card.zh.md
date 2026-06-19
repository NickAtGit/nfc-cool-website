---
id: "app-clip-lessons-2026-01"
title: "打造出色的 App Clip 体验：来自 NFC.cool Business Card 的经验"
date: "2026-01-23"
tags: ["business-cards", "networking", "iphone"]
summary: "回顾在布拉格 mDevCamp 2025 上关于 NFC.cool Business Card App Clip 流程背后架构的演讲。"
metaDescription: "打造 NFC.cool Business Card App Clip 的经验 - 架构、体积限制，以及一触保存联系人，整理自我在布拉格 mDevCamp 2025 的演讲。"
author: "Nicolo Stanciu"
image: "/assets/images/Blog/app-clip-mdevcamp.webp"
imageAlt: "在布拉格 mDevCamp 2025 上演讲"
---

2025 年，我做了人生第一场大会演讲，选的主题是一件我已经身处其中多年、却从没需要向一屋子人解释过的事：NFC.cool Business Card 背后的 App Clip 究竟是怎么工作的。这场演讲是在布拉格的 mDevCamp 2025 上做的，标题和这篇文章一样。

如果你还没遇到过，App Clip 是一段轻量的 iOS 应用，它能从一次 NFC 轻触或一次扫描二维码即时打开，不用经过 App Store，也不用安装。正是它让别人在你们手机轻触之后大约一秒，就能看到你的 NFC.cool 电子名片，而无需下载任何东西。要让这个过程显得即时，同时还要保证共享名片数据的安全、又不强迫任何人注册，背后所需的架构决策比从外面看上去要多。这场演讲就逐一讲解了它们：App Clip 是如何组织的、SwiftUI 在哪里发挥了它的价值，以及后端是如何处理名片数据的。

站在台上把它讲清楚，对我很有好处。它逼着我为那些大多凭直觉做出的选择给出理由，而结束后的提问（来自显然打过同样硬仗的 iOS 开发者）比任何一次代码评审都更尖锐。我最终定下的方案，也就是用 SwiftUI 搭配安全后端 API 的 App Clip，经受住了这番审视，而且走廊闲聊里提到的几条建议，已经落进了应用里。

你可以在 [Slideslive](https://slideslive.com/39043369/building-a-great-app-clip-experience-lessons-from-nfccool-business-card) 上观看完整演讲。
