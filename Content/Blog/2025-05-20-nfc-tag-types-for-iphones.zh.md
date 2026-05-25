---
id: "nfc-tag-types-2025-05"
title: "读懂不同类型的 NFC 标签：哪些能配合 iPhone 使用"
date: "2025-05-20"
tags: ["nfc-tags", "guides", "iphone"]
summary: "从 Type 1 到 Type 5，它们由谁生产，以及为什么 NTAG 系列（Type 2）是 iPhone 项目最稳妥的选择。"
author: "Nicolo Stanciu"
image: "/assets/images/Blog/nfc-tag-types.webp"
imageAlt: "各种类型的 NFC 标签摆在 iPhone 旁边"
---

NFC 标签是一种小型集成电路，用来存储信息，任何支持 NFC 的设备（比如你的手机）都能读取。但有一件事我真希望早点有人告诉我：并非所有 NFC 标签都一样。市面上有来自不同厂商的一大堆类型，各有各的脾气，这让你为 iPhone 挑选合适的标签变得意外地麻烦。

我做 NFC.cool 已经好几年了，这是一款用来读取和写入 NFC 标签的应用，而「我该给 iPhone 买哪种标签？」毫无疑问是我被问得最多的问题之一。所以下面就是我的答案。我会逐一介绍五种 NFC 标签类型、它们究竟由谁生产，以及为什么其中一种几乎是任何 iPhone 项目的稳妥之选。如果你对这一切完全是新手，那或许应该先从我的[NFC 标签完全新手指南](/blog/nfc-tags-beginners-guide/)看起，本文会再深入一层。

---

## 读懂 NFC 标签类型

NFC 标签分为五种类型：Type 1、Type 2、Type 3、Type 4 和 Type 5。这套分类不是厂商自己编出来的，而是来自 NFC Forum，也就是制定相关标准的行业联盟。每种类型都有各自的存储容量和速度，并且可以是可读写的，也可以是只读的。

每当我查看一张标签的规格表时，用的就是这个视角，所以让我来逐个讲讲。

---

## Type 1 与 Type 2：Topaz 和 MIFARE Ultralight®

Type 1（Topaz，由 Broadcom 生产）和 Type 2（MIFARE Ultralight®，由 [NXP Semiconductors](https://nxp.com) 生产）属于便宜又实用的那一端。它们很适合海报、名片这类简单用途。它们的存储容量很小（48 字节到约 2 KB），但以我的经验，这足够放下一个网址或一段短文本了，而这正是大多数人真正想要的。

---

## Type 3：FeliCa™

Type 3 标签也叫 FeliCa™，由 Sony 研发。你大多会在亚洲见到它们，用于公共交通票务和电子货币。它们速度更快、容量更高（最高可达 1 MB），但用途相当有限，因为成本更高，而且绑定在特定地区的应用上。在这类场景之外，我很少会用到它们。

---

## Type 4：MIFARE DESFire®

MIFARE DESFire® 标签同样来自 NXP Semiconductors，属于 Type 4。它们是高安全性、高容量的选择，专为安全门禁和公共交通系统这类复杂任务而生，最高可存储 8 KB。当一个项目确实需要加密保护时，我会考虑的就是这一系列。关于安全这一面，我在[在加密 NFC 标签上安全保存秘密信息](/blog/nfc-safe-encrypted-secrets/)那篇文章里讲得更详细。

---

## Type 5：ISO 15693

Type 5 标签符合 ISO 15693 标准，在 NFC 生态里算是比较新的。它们大多用于工业场景，最大的亮点是相比其他类型拥有更远的读取距离。如果你要在仓库里追踪库存，它会很有用；要贴在冰箱上的那张标签，就没那么必要了。

---

## iPhone 应该选哪种 NFC 标签？

下面是最重要的部分。iPhone 7 及之后的机型兼容 NFC 的 Type 1、Type 2 和 Type 5，但对 Type 2 的支持最好。Type 2 NFC 标签就是 NXP Semiconductors 的 [NTAG 系列](https://www.nxp.com/products/wireless-connectivity/nfc-hf/ntag-for-tags-and-labels:NTAG-TAGS-AND-LABELS)。

NTAG213、NTAG215 和 NTAG216 这几款是该系列里最受欢迎的，它们和 iPhone 配合得非常好，这也是我日复一日拿来测试的对象。它们提供的存储空间（144 到 888 字节）足以应付大多数实际项目，能被任何支持 NFC 的 iPhone 完整写入和读取，而且可以反复擦写，所以你想改多少次内容都行。

还有一条让我省去不少烦恼的实用建议：标签及其天线越大，NFC 读取设备就越能稳定地识别它。如果可靠性对你的项目很重要，我会避开那些极其便宜、做工单薄的贴纸：省下的那几分钱，不值得换一张要轻触第三次才读得到的标签。

iPhone 用 NFC 主要做的事情，就是读取 NFC 数据交换格式（NDEF）消息：网址、纯文本，或者 vCard（电子名片）。任何支持 NDEF 的标签（大多数 NTAG 系列标签都支持）对 iPhone 用户来说都是稳妥之选。等你真要往标签里写数据时，我写过一篇分步教程：[如何在 iPhone 上写入 NFC 标签](/blog/write-nfc-tags-iphone/)。

---

## 小结

如果你要选购搭配 iPhone 使用的 NFC 标签，我的真心建议很简单：选 NXP Semiconductors NTAG 系列的 Type 2 标签。它们性价比高，针对大多数人真正想在 iPhone 上用 NFC 做的事，提供了最好的兼容性和功能。买一包 NTAG215 贴纸，几乎什么需求都能搞定。

NFC 一直在演进，所以不妨稍微留意一下新进展和标签规格。想了解更多，可以看我之前那篇[揭秘 iPhone 上 NFC 的奥妙](/blog/nfc-on-iphones-insider-look/)；如果你只是想看看一张标签里已经有什么，你可以[直接在浏览器里读取 NFC 标签](/online-nfc-reader/)。

祝你玩标签玩得愉快！
