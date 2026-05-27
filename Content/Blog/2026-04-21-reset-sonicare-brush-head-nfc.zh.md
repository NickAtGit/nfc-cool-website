---
id: nfc-blog-015
title: "如何用 NFC 查看并重置你的 Philips Sonicare 刷头计数器"
date: 2026-04-21
tags: ["nfc-tags", "guides", "automation"]
summary: "你的 Sonicare 电动牙刷在每个刷头里都有一枚 NFC 芯片，倒计时催你购买替换头。本文讲讲它实际记录了些什么，以及如何用 NFC.cool Tools 查看你的用量或重置计数器。"
image: "/assets/images/Blog/reset-sonicare-brush-head-nfc.webp"
imageAlt: "用手机重置电动牙刷刷头的 NFC 标签"
metaTitle: "用 NFC 查看并重置 Philips Sonicare 刷头计数器（2026）"
metaDescription: "你的 Sonicare 刷头里有一枚 NFC 芯片，记录你刷牙刷了多久。看看还剩多少寿命，并用 NFC.cool Tools 重置计数器。"
ogTitle: "如何查看并重置你的 Sonicare 刷头计数器"
ogDescription: "每个 Sonicare 刷头都有一枚 NFC 芯片，倒计时催你更换。查看你的用量统计，想重置的话还能重置计时器。"
---

你的电动牙刷正在监视你。

倒不是那种令人毛骨悚然的监控，而是那种「我们在你的刷头里塞了一枚小小的 NFC 芯片，催你去买替换头」的方式。每个 Philips Sonicare 替换头都在塑料里嵌了一枚 NTAG213，它记录你刷牙刷了多久，并在它认定你的三个月到期时让刷柄闪起警示灯。

欢迎来到「破烂物联网」（Internet of Shit）。

问题在于，三个月只是一个建议，而非医学事实。刷毛的磨损取决于你刷得有多用力、用什么牙膏、以及刷得有多频繁。芯片并不测量刷毛的状态，它只是数秒数。一个手法轻柔、用温和牙膏的人，到三个月时刷毛可能完好如初。计时器既不知道，也不在乎。

NFC.cool Tools 现在可以读取那枚芯片，准确地告诉你刷头用掉了多少寿命，如果你认定刷毛还好用，它还能重置计时器。下面就讲讲它是怎么运作的。

---

## 芯片上实际有些什么

这些我自己一点都没有逆向。Cyrill Künzi [拆解了协议](https://kuenzi.dev/toothbrush/)，mbirth [把每个字节都标了出来](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html)，下面这些全是他们俩弄明白的。以下就是你刷头里的 NTAG213 所存储的内容：

- **刷头类型和颜色：**位于页 `0x1F` 的单个字节，用来标识型号（Premium All-in-One、Gum Care、DiamondClean 等）及其颜色（[mbirth 的内存映射](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html)列出了 22 种已知类型）
- **目标寿命：**位于 `0x21`，通常为 `0x5460` = 21,600 秒，也就是 180 次每次两分钟的刷牙，或者每天两次、连用三个月
- **生产代码：**位于 `0x21-0x23`，以 ASCII 形式存储的生产日期和生产线，例如 `241206 31K`（2024 年 12 月 6 日在 31K 生产线制造）。刷杆上也印有该代码
- **累计刷牙时间：**页 `0x24` 的前两个字节以 16 位数值存储刷头已使用的总秒数。当它达到 `0xFFFF`（65,535 秒，约合连续刷牙 18 小时）时，计数器停止。全新的刷头从 `00:00:02:00` 开始：前两个字节为零（未使用），后两个字节的含义目前未知
- **上次的强度和模式：**同样位于 `0x24`：低/中/高，以及 Clean/White+/Gum Health/Deep Clean+
- **一个网址：**指向 `philips.com/nfcbrushheadtap`，如果你用通用 NFC 读取器轻触刷头，它就会打开

当累计时间超过目标值（21,600 秒）时，刷柄会闪烁它的琥珀色 LED。那是芯片在说话，而不是刷毛。

---

## 你为什么可能想重置它

三个月的更换周期是 Philips 的建议，而不是对刷毛磨损的科学测量。芯片数的是秒，不是刷毛的磨损开叉。如果你想自己来决定（看你的刷毛，而不是听一个倒计时器的），那么重置计数器就能让你做到这一点。

如果你在多个刷头之间轮换（出差用和家用），想自己来追踪它们，你也可能会重置。

---

## 密码是怎么运作的

NTAG213 有密码保护。每个刷头都有一个唯一的 4 字节密码。牙刷刷柄每次往标签写入时都用它来认证。

密码由两个输入计算得出：标签的 7 字节 UID，以及存储在标签上（并印在刷杆上）的生产代码。在 Cyrill Künzi 最初用软件无线电（SDR）嗅探到密码传输之后，[Aaron Christophel](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) 从 Sonicare 固件中逆向出了这套算法。

⚠️**重要提示：** NTAG213 在**三次密码尝试失败**后会永久锁定。芯片将永远变为只读，连牙刷自己都再也写不进去了。别去乱猜。

---

## 如何用 NFC.cool Tools 查看并重置

它在 App 里是这样的：

<figure class="sk-phone-screenshot">
  <img src="/assets/images/Blog/sonicare-reset-screen.webp" alt="NFC.cool Tools 显示一个用量 80% 的 Sonicare 刷头，并带有「重置计时器」按钮" />
</figure>

NFC.cool Tools 会处理整个流程：读取标签、计算密码、并把统计数据展示给你。无需十六进制命令，无需网页计算器，无需 SDR。

1. 在你的 iPhone 上打开 **NFC.cool Tools**
2. 进入 **Toothbrush Head Reset**
3. 轻触 **Read NFC**，并把刷头贴到你的手机上
4. App 会显示一个表示刷头已用掉多少寿命的**百分比仪表**，下方还有已用时间和剩余时间
5. 轻触 **Reset Timer** 把使用计数器归零，或者扫描另一个刷头

现已在 [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-en&mt=8) 和 [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-en) 上可用。

---

## 重置实际做了什么

当你重置时，你是在往页 `0x24` 写入 `00:00:02:00`，也就是全新刷头出厂时的同一个值。只有前两个字节（使用计数器）被改回零。后两个字节的含义未知，所以 App 会原样保留它们。

牙刷重新从零开始计数，琥珀色的灯会在又一个三个月后回来。到那时你就可以看看你的刷毛，自己来决定。

---

## 更大的图景：NFC 走进日常物品

一个带 NFC 芯片、倒计时催你下一次购买的刷头，正是「破烂物联网」的巅峰之作。我一直围绕 NFC 来开展我的工作，因为我认为它确实有用，但把它嵌进一次性塑料里、专门用来推着你去买更多，这……是一种选择。

同样是 NTAG213 芯片，也被用于那些真正服务于消费者的事情：产品防伪、门禁管理，以及很快到来的欧盟数字产品护照（EU Digital Product Passport）。后者将要求消费品上配备 NFC 标签，好让你能够核实自己买的是什么、来自哪里。那才是 NFC 被用来*为*你服务，而不是与你作对。

NFC.cool Tools 对这些全都能读能写。Sonicare 这个功能就是一个例子：理解你周围那些标签上有什么，并决定拿这些信息做什么。

---

## 延伸阅读

- [Cyrill Künzi 最初的逆向工程记录](https://kuenzi.dev/toothbrush/)：SDR 嗅探、密码提取，以及对 Sonicare NFC 协议的首次详细分析
- [Aaron Christophel 的密码生成器](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56)：从 Sonicare 固件中提取出的算法
- [mbirth 的 NTAG213 内存映射](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html)：对芯片上每个字节的详细文档

*有一个 Sonicare 刷头想查一查？[在 iPhone 上下载 NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-en&mt=8) 或 [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-en)，看看你的牙刷一直在追踪些什么。*