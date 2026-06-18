---
id: "nfc-reading-ipad-mac-2026-06"
title: "NFC.cool 如何在 iPad 和 Mac 上读取 NFC 标签"
date: "2026-06-18"
tags: ["announcements", "nfc-tags"]
summary: "iPad 和 Mac 都没有 NFC 芯片，所以我一直说它们读不了 NFC 标签。配上一个外接 USB 读卡器，6.15.0 版本改变了这一点 - 下面讲讲它是怎么工作的，又是从哪里来的。"
image: "/assets/images/Blog/nfc-ipad-mac-external-reader.webp"
imageAlt: "一台 iPad 旁边放着一个 HID OMNIKEY USB NFC 读卡器，上面搁着一枚标签"
author: "Nicolo Stanciu"
metaTitle: "NFC.cool 如何在 iPad 和 Mac 上读取 NFC 标签"
metaDescription: "iPad 和 Mac 都没有 NFC 射频，所以它们读不了 NFC 标签。在 NFC.cool 6.15.0 中，一个外接 USB 读卡器在 iPad 和 Mac 上改变了这一点。下面讲讲它是怎么工作的。"
ogTitle: "NFC 标签读取功能登陆 iPad 和 Mac"
ogDescription: "你的 iPad 或 Mac 里没有 NFC 芯片？配上一个外接 USB 读卡器，NFC.cool 6.15.0 在那里也能读写标签 - 还有诚实的局限说明。"
---
去年我在 Bologna 参加了 [PragmaConf 2025](https://pragmaconference.com)。那是我第一次去那个大会，结果也成了最后一次 - 主办方没法把它继续办下去，所以我去的那一届就是最后一届了。我到现在还有点为它难过。

在那里我跟 Alexander 聊了起来，他也是一位做 iOS 和 NFC 的开发者。聊着聊着话题转到了一个我早就归档为「不可能」的问题：在 iPad 上读取 NFC 标签。iPad 没有 NFC 芯片，所以我一直告诉别人这事根本做不到。Alexander 告诉我这是可以做到的 - 配上合适的外接读卡器 - 还说愿意给我发一小段代码让我起步。几天后他真的发来了。正是那段代码，让 NFC.cool 现在能在 iPad 和 Mac 上读取 NFC 标签。

---

## 我跟你说过这行不通

回到五月，[NFC.cool 登陆 Mac 的时候](/blog/nfc-cool-comes-to-mac/)，我写了一整节关于 Mac 做不到什么的内容，还把 NFC 扫描放在了最前面。我的理由很简单：Mac 没有 NFC 射频，iPad 没有 NFC 射频，而这是一个硬件层面的限制，我的任何软件更新都修不了。

那部分到现在依然成立 - 针对设备里内置的那块芯片。我没想到的是，你不一定非得用内置的芯片。你可以外接一个进来。

---

## 没有 NFC 芯片，它是怎么工作的

诀窍在于一个外接 USB NFC 读卡器。你把它接到 iPad 或 Mac 上，NFC.cool 就直接和它对话。不用安装任何驱动：它走的是 Apple 早已在 iPadOS 和 macOS 里随附的智能卡支持，所以当你把读卡器插进 USB-C 端口的那一刻，App 就会察觉到它，自动切换过去。

只要插着一个外接读卡器，App 就会优先用它。在 iPad 或 Mac 上，那个读卡器是在场的唯一一套 NFC 硬件，所以没什么好抉择的。在 iPhone 上，它就变成了 App 替你做的一个选择：插上读卡器，NFC.cool 就用它；不插，手机就回退到自己内置的 NFC。你不用去拨什么开关，也不用去挑什么模式 - App 会弄清楚自己手上有哪些硬件，然后照着行事。

我围绕它来构建、也是唯一真正测试过的那个读卡器，是 HID OMNIKEY 5022 CL。别的 USB 读卡器或许也能用，但我没法打包票，因为我只用它从头到尾验证过整个体验。如果你试了别的读卡器，我是真心想知道结果如何：[告诉我](/contact/)它好不好用，或者在哪里出了问题，我会把学到的东西回填进 App 和这篇文章里。

---

## 你能用它做什么

几乎是你在 iPhone 上会做的一切。你可以读取标签并导出它们的完整内存、写入 NDEF 消息，也可以跑批量任务，一个接一个地读取或写入一整摞标签。给标签设密码保护可以用。[OpenPrintTag](/blog/openprinttag-read-write-nfc-spools-phone/)（3D 打印机耗材线盘的格式）也可以，读写双向都行。还有，对，[Philips Sonicare 刷头重置](/blog/reset-sonicare-brush-head-nfc/)也能跑起来。

最后这一项是难啃的部分。重置一个 Sonicare 刷头，意味着要从标签上读出一个计数器，然后写回到一个有密码保护的页面，而那枚标签只有在它仍然认为你保持着片刻之前的认证状态时，才会接受这次写入。透过外接读卡器，这就意味着要在两个步骤之间一直保持同一个会话开着，而不是让它在中间关掉。一旦这个会话稳住了，依赖它的那些操作 - 受保护的写入、刷头重置 - 就开始表现得和在手机上一样了。

---

## 诚实的局限

有几件事还没到位，我宁愿告诉你，也不想让你自己撞上。

- OMNIKEY 5022 CL 是我唯一测试过的读卡器。换一个别的，你就进入了未经验证的地带。
- MIFARE Classic 标签透过读卡器只能读取。你能读它们，但写不了。

这些都不会破坏大多数人会用到的那种用法，但它们是真实存在的，而且正是那种我在买读卡器之前会想要知道的事情。

---

## 谢谢你，Alexander

我想把这件事的来龙去脉说清楚。我并不是自己坐下来发明出来的 - 是 Alexander 把线头递给了我，我顺着它一路拉了下去。他本来没有义务分享那段代码，我很感激他这么做了。我后来这么卖力去追这件事，有一部分原因很直白：我希望 NFC.cool 是第一个真正能读取 NFC 标签的 iPad App。不管它到底是不是头一个，做成这件事都值得这份功夫。

iPad 和 Mac 上的 NFC 标签读取功能，随 NFC.cool 6.15.0 一同到来。如果你有一台 iPad 或一台 Mac、一个受支持的读卡器，以及一枚你以前坐在桌前永远扫不了的标签，那它就能直接用。

需要读卡器吗？这是 HID OMNIKEY 5022 CL，在 [Amazon 美国](https://amzn.to/4rq6gCj)和 [Amazon 欧洲](https://amzn.to/483UyEp)都有。这些是联盟链接：如果你通过其中一个购买，我可能会赚取一小笔佣金，你不会因此多付一分钱，而它有助于为 NFC.cool 的开发提供资金。

[为 iPhone、iPad 和 Mac 下载 NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-nfc-reading-ipad-mac-zh&mt=8)

还有，如果你当时也在 Bologna 那最后一届 PragmaConf 上：谢谢你陪我度过了美好的一届。我真希望以后还会有下一届。
