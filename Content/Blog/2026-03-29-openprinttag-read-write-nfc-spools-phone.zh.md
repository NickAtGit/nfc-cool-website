---
id: nfc-blog-011
title: "OpenPrintTag：如何用手机读写智能 3D 打印线轴"
date: 2026-03-29
tags: ["nfc-tags", "automation"]
summary: "OpenPrintTag 是智能耗材线轴的开放标准。了解它的工作原理、它存储哪些数据，以及如何只用一部手机来读取和写入 OpenPrintTag NFC 标签。"
image: "/assets/images/Blog/openprinttag-read-write-nfc-spools-phone.webp"
imageAlt: "带有 NFC 标签的 3D 打印线轴正被一部手机读取"
metaTitle: "OpenPrintTag：用手机读写智能 3D 打印线轴"
metaDescription: "学习如何用 OpenPrintTag 配合 NFC 来管理你的 3D 打印耗材线轴。在 iPhone 或 Android 上读取、写入并追踪材料数据，无需任何专有 App。"
ogTitle: "OpenPrintTag：基于 NFC 的智能 3D 打印线轴"
ogDescription: "用手机读取和写入 OpenPrintTag NFC 线轴的完整指南。兼容任何打印机、任何耗材品牌。"
---
如果你做 3D 打印，你大概经历过这样的场景：一架子用了一半的线轴，不知道哪一卷上还剩多少耗材，还有那一卷没贴标的线轴，可能是 PETG 也可能是 PLA，不试打一下根本没法分辨。我也经历过，而这正是 NFC 真正擅长解决的那种小而反复出现的烦恼。

这就是 OpenPrintTag 所做的事。它是一个由 [Prusa Research](https://www.prusa3d.com) 创建的开源 NFC 标准，能把任何兼容的 NFC 标签变成你耗材线轴的智能标签。材料类型、品牌、颜色、剩余重量：全都直接存储在线轴上，用手机快速一轻触就能读取。

无云端。无专有生态。无需联网。我花了多年时间打造 NFC.cool，一款用于读取和写入 NFC 标签的 App，而这正是我乐于见到的那种标准：把数据放在标签上，让它在任何地方都能工作。下面就讲讲它的工作原理，以及我如何只用一部手机来读取和写入 OpenPrintTag 线轴。

---

## 什么是 OpenPrintTag？

OpenPrintTag 是一种面向 3D 打印材料的通用、开放数据格式。与其让每家制造商各自发明互不兼容的智能线轴系统（这正是我眼看着在 NFC 世界其他角落上演的那种乱象），OpenPrintTag 定义了一个任何人都能采纳的单一标准，包括耗材厂商、打印机制造商、切片软件，以及像 NFC.cool 这样的 App。

它的核心原则，以及我认为它值得关注的理由：

- **开源：** 以 MIT 许可证发布，可自由实现，无授权费用
- **天生离线：** 所有数据都存在标签本身上，无需云端服务
- **可重写：** 随着你打印更新剩余耗材，在新线轴上重复使用标签
- **通用：** 跨品牌、跨生态工作
- **同时支持 FFF（耗材）和 SLA（树脂）**

已有超过 22 家公司和团体表达了兴趣，包括 Prusament、Voron、Fillamentum、3DXTech、SimplyPrint 和 PrintedSolid。完整规范可在 [specs.openprinttag.org](https://specs.openprinttag.org) 查阅。

---

## 一张 OpenPrintTag 存储哪些数据？

这正是打动我的部分。OpenPrintTag 不只是一张写着名字的标签。它是一种结构严谨的数据格式，几乎为你想知道的关于一卷线轴的一切都设有字段，而且这份规范显然出自真正动手打印的人之手。

**材料识别：**
- 材料类别（耗材或树脂）
- 材料类型（PLA、PETG、ABS、TPU、ASA、PC、PA6，以及另外 30 多种）
- 材料名称（例如 "PLA Galaxy Black"）
- 品牌名称（例如 "Prusament"）
- 材料属性标签：超过 68 项已定义属性，如磨蚀性、导电、夜光、食品级安全、防静电、柔性等等

**重量与长度追踪：**
- 标称重量（标注的，例如 1000 克）
- 实际重量（针对这一卷线轴实测得出）
- 耗材长度（标称和实际，以毫米计）
- 空容器重量（这样你就能称量线轴并计算剩余材料）
- 已消耗重量（随你打印而更新；正是这个字段让线轴真正变得"智能"）

**颜色：**
- RGBA 格式的主色
- 最多 5 种辅色（用于多色、星空或渐变耗材）
- 透射距离（不透明度数值，对 [HueForge](https://shop.thehueforge.com/) 项目很有用）

**元数据：**
- 生产日期和有效期
- 原产国
- 品牌、材料和具体线轴实例的 UUID
- 写保护设置

这份规范甚至涵盖了树脂专属字段，比如 `last_stir_time`，它记录树脂在打印前最后一次搅拌的时间。正是这种细节告诉我，它背后的那些人确实被没搅拌的树脂坑过。

---

## 这种标签：不是你常见的 NFC 贴纸

这里有一个技术细节，我想在你买任何东西之前先提醒你：**OpenPrintTag 是为 ISO 15693（NFC-V）标签设计的**，具体来说是 **NXP ICODE SLIX 和 ICODE SLIX2** 芯片。这些是 NFC Forum Type 5 标签，读取距离比标准的 NFC-A 标签要长得多，配合专用读取器可达 1.5 米。如果你以往只买过大多数项目用的那种便宜 NTAG 贴纸，这是另一族标签。我在 [面向 iPhone 的 NFC 标签类型](/blog/nfc-tag-types-for-iphones/) 里梳理了完整的全貌。

为什么用 NFC-V？打印机内置的 NFC 读取器需要无论线轴如何旋转都能检测到它。NFC-V 更长的读取距离让这成为可能，无需精确的标签对齐，这是一处巧妙的设计。

**那普通的 NTAG 贴纸呢？** OpenPrintTag 的数据格式基于 NDEF，所以像 NFC.cool 这样的手机 App 在技术上可以在任何 NFC 标签上读取和写入 OpenPrintTag 数据，包括 NTAG213/215/216。我试过，用于手机对手机的读取没问题。然而，**打印机硬件以及像 Prusa 那样的 App 只识别 NFC-V 标签**。所以如果你想让贴了标的线轴能配合内置的打印机读取器工作，请使用 ICODE SLIX2 标签。别犯我料想大多数人都会犯的错误，为此买一袋 NTAG213。

如果你要购买空白标签，请专门寻找 **ICODE SLIX2** 或 **ISO 15693**。你可以在 [Amazon 美国](https://amzn.to/3LTh1fT) 或 [Amazon 欧洲](https://amzn.to/4oJpQr4) 找到兼容的标签（推广链接）。

---

## 如何用你的手机读取和写入 OpenPrintTag

你不需要一台 Prusa 打印机或任何特殊硬件就能使用 OpenPrintTag，只要你的手机就行。这是我最想打造的部分，因为口袋里的一部手机就是最触手可及的 NFC 读取器。

NFC.cool Tools 在 [iOS](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-openprinttag-read-write-nfc-spools-phone-en&mt=8) 和 [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-openprinttag-read-write-nfc-spools-phone-en) 上都原生支持 OpenPrintTag，而且我确保这项功能完全免费。

**读取一张标签：**
1. 打开 NFC.cool Tools
2. 把你的手机靠近线轴上的 NFC 标签
3. NFC.cool 自动检测 OpenPrintTag 格式
4. 查看结构化的数据：材料、品牌、颜色、重量、长度、属性

**写入一张标签：**
1. 在你的线轴上贴一张空白的 ICODE SLIX2 标签
2. 打开 NFC.cool → NFC Apps 部分 → OpenPrintTag
3. 填上材料详情：类型、品牌、颜色、重量、长度
4. 轻触以写入

**更新剩余材料：**
打印结束后，更新标签上的已消耗重量字段。下次你扫描时，就会确切知道还剩多少耗材，无需猜测，无需称重。正是这一点，把一卷智能线轴从一个新奇玩意儿变成了我真正会依赖的东西。

如果你想看看底层是怎么回事，可以用专家模式（Expert Mode）查看原始的 NDEF 记录，在你需要调试一张标签或核实数据结构时很有用。对写入标签整体还很陌生？我在 [如何在 iPhone 上写入 NFC 标签](/blog/write-nfc-tags-iphone/) 里讲了基础知识。

---

## 为什么要用你的手机？

Prusa 打印机正在配备内置 NFC 读取器，而像 [SpoolSense](https://github.com/SpoolSense)（一款开源的 ESP32 读取器）这样的项目也在增加专用的硬件选项。那为什么还要费心用手机呢？这是我会给出的理由：

- **兼容任何打印机：** Voron、Bambu Lab、Creality、Ender，无论你用什么
- **为任何耗材写入标签：** Prusament 出厂就贴好了标，但你可以自己给 Fillamentum、eSUN、Hatchbox 或任何品牌贴标
- **离开打印机也能管理库存：** 在你的书桌旁、储物处或创客空间里扫描线轴
- **调试标签：** 当打印机读不出一张标签时，用你的手机扫描它，看看上面实际有什么，这是我最常会用到的场景
- **无需额外硬件：** 你的手机本来就有 NFC 读取器，而这正是关键所在

---

## 实用场景

**个人库存：** 给你收藏的每一卷线轴贴标。当你计划一次打印时，扫描线轴来查看材料类型、剩余长度和颜色，无需拆开任何包装。

**剩余耗材追踪：** 在一次打印前后称量你的线轴，更新标签上的已消耗重量。再也不用为"这卷线轴够不够打完一个 14 小时的件"而焦虑。

**创客空间或团队使用：** 给线轴贴上材料详情的标签，这样工坊里的任何人都能扫描并识别它们。再也没有神秘耗材。

**耗材测试笔记：** 为某一卷线轴找到了完美的温度？把你的笔记更新到标签上，留待下次使用。

**多色与特种材料：** OpenPrintTag 每卷线轴支持最多 6 种颜色和 68 项以上的属性标签。你那卷夜光、碳纤维填充的 PETG 终于可以被妥善标注了，连磨蚀性标记也一应俱全。

---

## 这个生态正在壮大

OpenPrintTag 还很年轻，但势头是实实在在的：

- **Prusament** 出厂时每一卷线轴都带有 OpenPrintTag NFC 标签
- **Prusa 打印机** 正在加入原生 NFC 读取器
- 像 SpoolSense（基于 ESP32）这样的 **开源硬件读取器** 正从社区中涌现
- **22 家以上的公司** 加入了这一倡议
- **NFC.cool** 是唯一一款在 iOS 和 Android 上都完整支持 OpenPrintTag 的通用型 NFC App，我加入这项支持是因为我自己想用它

我眼看着 3D 打印行业多年来一直需要一个智能线轴的开放标准，也眼看着几次专有的尝试来了又走。OpenPrintTag 是我见过最靠谱的一个：有一家主要制造商背书、完全开源，而且已经搭载在真实的产品上出货了。这样的组合罕见到足以让我押注于它。

---

## 开始上手

**你需要什么：**
- iPhone 7 或更新机型，或一部带 NFC 的 Android 手机
- NFC.cool Tools（[App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-openprinttag-read-write-nfc-spools-phone-en&mt=8) / [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-openprinttag-read-write-nfc-spools-phone-en)），免费，已包含 OpenPrintTag
- 空白的 ICODE SLIX2 / ISO 15693 NFC 标签（[Amazon 美国](https://amzn.to/3LTh1fT) / [Amazon 欧洲](https://amzn.to/4oJpQr4)，推广链接）
- 一些待贴标的耗材线轴

就这些。从现在起五分钟，你的第一卷线轴就能变智能。如果 NFC 本身对你还很陌生，我的 [NFC 标签新手指南](/blog/nfc-tags-beginners-guide/) 是我最先会带你去看的地方，而 [NFC 读取/写入功能页](/features/nfc-reader-writer/) 则介绍了 NFC.cool Tools 在 OpenPrintTag 之外还能做什么。

*OpenPrintTag 是 Prusa Research 发起的一项开源倡议。NFC.cool 是该标准的一个独立支持者。在 [openprinttag.org](https://openprinttag.org) 了解更多。*
