---
id: "e-ink-phone-case-2026-10"
title: "我破解了自己的墨水屏手机壳，现在用 iPhone 就能给它换画面"
date: "2026-10-12"
tags: ["announcements", "iphone", "nfc-tags"]
summary: "我有一个不用电池的 NFC 墨水屏手机壳，可随附的 App 实在不合我意。于是我把它的通信方式逆向了出来。现在，NFC.cool Tools 7.2.0 能把照片、QR 码、下一个日程、今日日程和提醒事项显示到使用 DeerPhoneCase、KAZAVA、Novixand 或 TYOHINN App 的手机壳上。"
image: "/assets/images/Blog/nfc-e-ink-phone-case-iphone.webp"
imageAlt: "一台装着黑色手机壳的 iPhone，背面的墨水屏上是黑色山丘上方一轮红黄相间的太阳；旁边另一台 iPhone 正通过 NFC 发送同一张图片"
author: "Nicolo Stanciu"
metaTitle: "iPhone 上的 NFC 墨水屏手机壳 App：照片、日历、QR 码"
metaDescription: "用 iPhone 把照片、QR 码、日程和提醒事项显示到不用电池的 NFC 墨水屏手机壳上，支持 DeerPhoneCase、KAZAVA、Novixand 和 TYOHINN 手机壳。"
ogTitle: "我破解了墨水屏手机壳，让 iPhone 直接给它换画面"
ogDescription: "我是怎么逆向一个不用电池的 NFC 墨水屏手机壳的，以及 NFC.cool 现在能在它的屏幕上显示什么。"
---

屏幕闪了一下。

这本来不算什么。墨水屏每次刷新都会这样：几种颜色飞快地闪过一轮，新画面才稳稳落定。可这一次的闪烁，来自我自己写的代码。它从我的 iPhone 发出，送进了一个连电池都没有的手机壳背面。几秒钟后，整块屏幕变成了一片纯红，还带着点纸张的质感。别的什么都没有，就是一片红。

这些年我做过不少 NFC 功能，而那个平平无奇的红色方块，是其中我最喜欢的时刻之一。

---

## 一块不用电池的屏幕

<figure class="phone-figure" data-layout="float" data-device="einkcase">
<ol>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-1-photo-480w.webp" alt="装在橙色 NFC 墨水屏手机壳里的 iPhone 背面，屏上是一张四色的金毛犬照片"><p><strong>一张照片。</strong>黑、白、红、黄四色，手机壳里没有电池。</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-2-qr-480w.webp" alt="手机壳的墨水屏上显示一个 nfc.cool 的二维码"><p><strong>一个二维码。</strong>任何人都能从你手机背面扫码。</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-3-event-480w.webp" alt="黄色底的墨水屏：Next、Dinner with Mia、10 月 14 日周三、晚上 7:30 到 9:30、Trattoria Roma"><p><strong>下一个日程。</strong>日历的一张快照。</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/case-4-today-480w.webp" alt="墨水屏上显示 10 月 14 日周三的日程：Gym、Team stand-up、Lunch with Alex、Dentist、Dinner with Mia"><p><strong>今日日程。</strong>一整天的安排，直到你换上下一个设计。</p></li>
</ol>
</figure>

如果你还没见过这种手机壳：它看上去和普通手机壳没什么两样，只是背面很大一块是墨水屏，也就是电子书阅读器用的那种屏幕。我这块能显示四种墨色：黑、白、红、黄。

壳里没有电池，也没有充电口。它的电来自手机的 NFC 场，也就是你扫描 NFC 贴纸时把贴纸唤醒的那个场。手机贴着手机壳的时候，会给里面的一枚小芯片和一颗微控制器供电，由它们来刷新屏幕。画面一旦显示出来，墨水屏就不再需要任何电力来维持。它会一直留在那里，不管手机没电了，还是壳被扔进了抽屉，都一样。

我把它想成一块只有手机才能擦写的磁性画板。你不拿手机再贴上去，上面的画面就一直不变。

这类手机壳换着各种牌子在卖，几乎每个牌子都有自己的 App。我这个配套的 App 叫 **DeerPhoneCase**，其他的后面再说。

---

## 为什么我没直接用官方 App

厂商的 App 我用自己的手机壳试了一大堆，很多都能用。但它们用起来都很糟糕。它们不是原生的 iPhone App，大部分功能都得先登录才能用，而且说到底，它们能做的也就是放张图。

看着手机背面那块屏幕，我想到的不是相框，而是一块常亮又不耗电的小显示屏。拿它来显示我的下一个会议、今天的日程，或者一个别人能直接从我手机背面扫的 QR 码，再合适不过了。这些官方 App 一样都做不到，而我做的偏偏就是一款围着 NFC 转的 App。所以我决定自己动手，教 NFC.cool 和这个手机壳对话。

---

## 摸清它的通信方式

这件事我是和 Anthropic 的 AI 模型 Claude 一起做的。事实证明，在啃反编译出来的代码这件事上，它是个极有耐心的搭档。

最先想到的办法再明显不过：看看官方 iPhone App 是怎么和手机壳通信的。结果一无所获。App Store 上的 App 都经过加密，根本读不出什么有用的东西。

Android 版就是另一回事了。这个手机壳是贴牌产品，同一家厂商的 App 也以自己的名字上架在 Google Play 上，而 Android App 是可以反编译的。我们把它拆了个底朝天，再结合网上能找到的关于壳内芯片的资料（芯片来自 Fudan，也就是复旦微电子，后面还接着一颗微控制器），手机和手机壳之间的整套对话就浮出了水面：

1. 手机和手机壳先做一次简短的登录握手，让手机壳确认和它说话的是一个正经 App。
2. 从这之后，每一条指令都是加密的。
3. 图片拆成 139 个数据包，以原始像素的形式传过去。每个像素占两个比特，刚好够表示四种墨色。
4. 手机通知手机壳开始刷新，然后每秒问一次刷完没有。

我第一次测试没写什么花哨的东西，只是把整块屏幕涂成一种颜色。那就是那个红色方块。

---

## 卡在 20 秒这道坎上

接着我试了真正的图片，结果显示出来的全是乱的：屏幕上横着几道线，颜色不对，照片只出来一半。

刷新大约要 18 秒，而连接总是在 20 秒左右断掉。Claude 认定 iOS 就是会在 20 秒后结束每一个 NFC 会话，这事我们无能为力。我不信，因为官方 App 在同一台 iPhone 上就做到了。

于是我把 iPhone 连到 Mac 上，趁官方 App 往壳上画图的时候录下系统日志。门道就藏在里面：iOS 限制的是与标签的每一次*连接*大约 20 秒，而不是整个会话。官方 App 刚把图片发完，就主动断开连接，大约十分之一秒后再重新连上，然后让手机壳在这条新连接上刷新，手里又有了整整 20 秒。

NFC.cool 照这个办法改过之后，图片就显示得干干净净了。我承认，这回让我说中了，心里还挺得意的。

---

## NFC.cool 能在手机壳上显示什么

这个功能在 **NFC.cool Tools 7.2.0** 的 NFC 应用程序里，名叫**墨水屏手机壳**。你先选一种样式，预览会准确显示它在手机壳上的效果。然后把手机壳从手机上取下来，用 iPhone 贴住它的背面，直到 NFC 面板自动关闭。

- **照片**：从图库里任选一张图片，裁剪成屏幕的大小。这项是免费的。它会把你的照片转换成四种墨色，还提供色彩增强（标准、鲜艳或最强）和黑白选项。
- **抠图**：从照片里把人物、宠物或物体抠出来，放到四种墨色之一的背景上。
- **QR 码**：可以是你在 NFC.cool 里保存过的任意 QR 码，保留它自己的样式，也可以现场输入一段内容。你还能把它反色。如果内容太长，QR 码在这块小屏幕上就没法清晰识别，这时 App 会提醒你。
- 日历里的**下一个日程**或**所选日程**。
- **今日日程**：日历上今天的全部安排。
- **提醒事项**：你某个列表里尚未完成的提醒事项，有三种字号可选。

日历和提醒事项这几种样式都只是快照。手机壳显示的是你写入那一刻的内容，一直到你换上下一张为止。没有手机，它没法自己更新，这就是永远不用充电要付出的代价。

<figure class="phone-figure" data-layout="stage">
<figcaption>手机壳上的设计</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/1-designs-440w.webp" alt="NFC.cool Tools 的 E-ink case 页面，有 Photo、QR code 和 Calendar and Reminders 三种设计"><p><strong>E-ink case。</strong>在 NFC Apps 里。选一种设计，再轻触 Put on case。</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/2-photo-440w.webp" alt="Photo 设计：一幅山丘上的日落，用手机壳的四种墨色显示，带 Crop 和亮度调节"><p><strong>照片。</strong>任何图片，都会转换成手机壳的四种墨色。</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/3-qr-code-440w.webp" alt="QR code 设计，用手机壳的墨色显示一个已保存的二维码"><p><strong>二维码。</strong>你在 NFC.cool 里保存的二维码，或者现场输入的内容。</p></li>
<li><img src="/assets/images/Blog/screens/nfc-e-ink-phone-case-iphone/4-agenda-440w.webp" alt="10 月 15 日周四的 Today's agenda 设计，列出上午 9 点到晚上 7 点的五个日程，以及 Put on case"><p><strong>今日日程。</strong>当天的日历，作为快照显示在手机背面。</p></li>
</ol>
</figure>

---

## 用之前要知道的几件事

**两次写入之间，让手机壳歇一歇**。如果你连着写入两种样式，第二张画面会发白，看着灰蒙蒙的。手机壳在两次刷新之间需要一点时间缓过来。官方 App 会让你等上一分钟，这个建议放在 NFC.cool 上也同样适用。

**拿稳别动**。整个过程要花上一会儿，大部分时间都耗在刷新上。如果你提前把手机移开了，App 会告诉你，再试一次就好。

**目前仅限 iPhone**。这个功能在 iPhone 版 App 里，Android 版暂时还没有。

**哪些手机壳能用**。这类手机壳大多出自同一个开发者，他几乎给每个牌子都单独发布了一个 App。我能找到的都用自己的手机壳试了一遍：

- **DeerPhoneCase**、**KAZAVA**、**Novixand** 和 **TYOHINN** 都能用在我的手机壳上，NFC.cool 也一样能用。如果你的手机壳配套的是其中一个 App，NFC.cool 应该也能用。
- **Bestie e-INK** 和 **KINGZER** 在我的手机壳上用不了。图片能通过 NFC 顺利传过去，但到了手机壳该刷新的时候，什么都没发生。
- 另一个开发者的 **SpaceInk+** 在我的手机壳上完全用不了，App 只会提示“device channel information mismatch”。

但这并不代表 NFC.cool 就用不了 Bestie e-INK、KINGZER 或 SpaceInk+ 的手机壳。它们可能只是和我的手机壳稍有不同，而我没办法测试。如果你有这样的手机壳，请[告诉我](/contact/) NFC.cool 能不能用。如果你的手机壳用的是别的 App，NFC.cool 会告诉你暂时还不支持，并提供一个**发送手机壳信息**按钮。它只发送芯片的技术信息，不包含任何能识别你或你手机壳的内容。这样我就能知道大家手里实际用的是哪些手机壳，再把它们一一加进来。

**哪里能买到**。在 Amazon 上，这类手机壳挂着各种各样的品牌名，有些相当让人摸不着头脑，但背后都是同样的手机壳。[这是在 Amazon 上的搜索结果](https://link.amazon/B0hUxLZTR)（推广链接）。我的手机壳内侧印着 DIY，有些商品标题里也写着 DIY，所以可以把它当作挑选时的线索。如果商品页写明了手机壳使用的 App，认准 DeerPhoneCase、KAZAVA、Novixand 或 TYOHINN。

---

## 最后说两句

如果你也有这么一个手机壳闲放着，屏幕上还是第一天那张图，不妨给它换点更有用的内容。NFC.cool Tools 可以在 [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-e-ink-phone-case-iphone-zh&mt=8) 下载。

如果你还从没见过墨水屏一闪，变成你亲手发过去的画面，我真心推荐你试一试。那短短几秒，看着特别过瘾。
