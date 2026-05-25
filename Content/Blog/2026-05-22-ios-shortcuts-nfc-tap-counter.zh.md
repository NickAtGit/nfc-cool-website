---
id: "ios-shortcuts-nfc-tap-counter-2026-05"
title: "用 iOS 快捷指令解析 NFC 轻触计数器的数据"
date: "2026-05-22"
tags: ["nfc-tags", "automation", "iphone"]
summary: "拿来即用的 iOS 快捷指令，解析 NFC 轻触计数器的标签 ID 和扫描计数：一个可复用的解析器，外加一个用到它的标签提醒演示。"
image: "/assets/images/Blog/ios-shortcuts-nfc-tap-counter.webp"
imageAlt: "一部 iPhone，在轻触一枚 NFC 贴纸后显示出一条带有标签 ID 和扫描计数的提醒"
author: "Nicolo Stanciu"
metaTitle: "用 iOS 快捷指令解析 NFC 轻触计数器的数据"
metaDescription: "一个可复用的 iOS 快捷指令，解析 NFC 轻触计数器的负载（标签 ID + 扫描计数），外加一个标签提醒演示。拿来即用的 iCloud 链接，无需设置。"
ogTitle: "用 iOS 快捷指令解析 NFC 轻触计数器的数据"
ogDescription: "面向 NFC 轻触计数器的拿来即用 iOS 快捷指令：一个可复用的解析器和一个标签提醒演示。"
---

一周前我[讲解过 NFC 轻触计数器是怎么工作的](/blog/count-nfc-tag-scans/)：芯片自己统计扫描次数，App 嵌入占位字节，而标签在每次轻触时把实时计数和标签 ID 替换进它所携带的任何内容里。那篇文章止步于标签止步的地方，也就是这些值到达你手机的那一刻。

从那以后我一直被问到的，是那个显而易见的下一个问题：“很好，标签递给我 `049F50824F1390x000007` 了，那现在怎么办？”如果你用的是 iPhone，并且想在一个快捷指令里对这些值做点什么，你就得先解析它们。这是一件不大却挺琐碎的字符串处理活儿，我宁可你不必自己去写。

所以我做了两个快捷指令，并以 iCloud 链接的形式分享出来。一个是大脑，另一个是用到这个大脑的演示。

---

## 标签递给你的是什么

在讲快捷指令之前，先快速回顾一下它们实际收到的是什么，因为这关系到你怎么用它们。

在轻触计数器的设置界面里，你为标签选择一种内容类型：URL、Email、SMS 或 Shortcut。当你打开轻触计数器和/或标签 ID 开关时，App 会在那段内容里嵌入占位字节，芯片则在每次读取时把它们替换成实时值。以 `049F50824F1390` 作为标签 ID、`000007` 作为计数，这四种内容类型最终长这样：

- **URL：** `https://nfc.cool/tap-counter/` 变成 [`https://nfc.cool/tap-counter/?nfc=049F50824F1390x000007`](https://nfc.cool/tap-counter/?nfc=049F50824F1390x000007)
- **Email 正文：** `Hi, here's my card.` 变成 `Hi, here's my card. 049F50824F1390x000007`
- **SMS 正文：** `Order confirmed!` 变成 `Order confirmed! 049F50824F1390x000007`
- **Shortcut 输入：** `log-entry` 变成 `log-entry 049F50824F1390x000007`

上面那个 URL 是真实可用的。我们的[实时轻触计数器测试页面](/tap-counter/)被设置成会直接从它自己的地址栏里读取 `?nfc=` 的值，所以如果你想在编写自己的自动化之前先看看替换是怎么发生的，就写一枚指向 `https://nfc.cool/tap-counter/` 的标签，两个开关都打开，轻触它，页面就会把它刚收到的标签 ID 和计数显示给你看。

当内容类型为 **Shortcut** 时，NFC.cool 会通过 `shortcuts://run-shortcut?name=Your%20Shortcut&input=text&text=<payload>` 运行你选定的快捷指令，追加上去的 NFC 值已经在那段文本里了。你的快捷指令的输入是一个纯文本字符串。你唯一要做的，就是把标签 ID 和计数从中重新提取出来。

取决于你写入标签时打开了哪些开关，你可能会得到完整的模式（14 个十六进制字符、一个 `x`，再加 6 个十六进制字符），或者只有 14 位十六进制的标签 ID，又或者只有 6 位十六进制的计数。这个解析器三种都能处理。

---

## Parse NFC Tap Counter：可复用的解析器

[安装 Parse NFC Tap Counter](https://www.icloud.com/shortcuts/4c70ab3ade1a4398bb6a39edba94bf26)

这一个是大脑。它没有任何界面，接收单一的文本输入，返回一个字典（Dictionary）。这是有意为之的：一个没有界面的工具型快捷指令能干净地嵌进你构建的任何东西里，而字典是另一个快捷指令用 **Get Dictionary Value** 操作最容易读取的东西。

这个字典里包含的内容如下：

- `tagID`：14 个字符的十六进制标签 ID，如果该开关是关的，则为空字符串。
- `count`：以十进制数表示的扫描计数（所以 `000007` 出来是 `7`，`00000A` 是 `10`），如果该开关是关的，则为空。
- `countHex`：原始的 6 个字符十六进制计数，以备你想原样使用。不存在时为空。
- `hasTagID`、`hasCount`：用于分支的布尔值，这样你可以写 **If hasCount is true**，而不必自己去测试字符串。
- `content`：把 NFC 负载干净地剥离掉之后的输入，这样你快捷指令的其余部分看到的输入，就跟标签给它“穿衣打扮”之前一模一样。如果输入是一个带 `?nfc=...` 的 URL，你拿回的是去掉那段之后的 URL；如果它是一段追加了标签 ID 的邮件正文，你拿回的是去掉那段之后的正文。
- `raw`：未经修改的原始输入，以备你想记录它或回退到它。

要从你自己的快捷指令里调用它，配方是三个操作：

1. 用 **Receive Shortcut Input** 接收文本（NFC 负载在这里到达）。
2. **Run Shortcut** -> Parse NFC Tap Counter，把那段文本作为输入。关掉“Show When Run”，让它保持隐形。
3. **Get Dictionary Value** -> 选取 `tagID`、`count`、`content`，或你关心的任意键。

就这样。从第 3 步起，你想拿这些值做什么都行：按 `hasTagID` 分支、把 `count` 记录到备忘录、用 JSON 触发一个 webhook，任何事都行。解析器不会预设你的快捷指令想拿结果做什么，这正是它小巧又可复用的原因。

关于计数的一点说明：它在字典里是一个真正的数字（Number），而不是文本字符串，所以你可以把它直接喂进 **Calculate** 或 **If** 比较里，无需再次转换。十六进制转十进制这一步已经替你做好了。

---

## NFC Tag Alert：演示

[安装 NFC Tag Alert](https://www.icloud.com/shortcuts/f78b78c917a2417385ae25711a3e877a)

这一个是演示，即便你压根没打算在正式使用中弹提醒，我也还是会在第一天就装上它。它接收一个文本类型的 Shortcut Input，运行解析器，然后显示一条标题为 **NFC Tag Scanned** 的提醒，里面有两行：

```
Tag ID: 049F50824F1390
Scans: 7
```

我之所以会先装它，是因为对一枚启用了计数器的标签来说，它是最快的健全性检查。从 NFC.cool Tools 写一枚标签，内容类型选 **Shortcut**，名称填 **NFC Tag Alert**，打开轻触计数器和标签 ID 开关，写入，然后轻触它。一条提醒就会弹出来，带着来自你那枚实体标签的真实值。

如果提醒显示的是你预期的值，那说明你的标签在尽职工作，你可以接着去构建更精细的东西了。如果计数不对或者标签 ID 缺失，你就知道问题出在标签上（或者你写入时所选的开关上），而不是你自己的快捷指令上。能消除“这到底是不是芯片的锅？”这一整类调试，值得为此装一个只有五个操作的快捷指令。

如果你曾困惑该如何正确地调用解析器，这个快捷指令也是最小可行的范例。打开它，看那五个操作，把它的结构照抄进你自己的快捷指令里。

---

## 把它接进你自己的快捷指令

标签内容被路由进你快捷指令的方式有两种。解析器对两种都适用。

**标签驱动（Shortcut 负载）。** 写入标签时内容类型选 **Shortcut**，按名称选好你的快捷指令，打开你想要的开关。从此以后，每一次轻触都会启动你的快捷指令，NFC 负载已经在输入里了。在你的快捷指令内部，对那个输入调用 Parse NFC Tap Counter，你就拿到了可直接使用的 `tagID` / `count`。

**URL 驱动（URL 负载）。** 这是更常见的情况。标签携带一个 URL，你的手机在轻触时打开那个 URL，而计数以 `?nfc=...` 的形式一同附带过来。如果你想让一个快捷指令来处理这次轻触，而不是（或者除了）浏览器，你可以这样做：让 URL 经过一个能处理 Safari 网页输入的快捷指令，再对这个 URL 运行 Parse NFC Tap Counter。解析器会干净地剥掉 `?nfc=` 这一段，把去掉它之后的 URL 作为 `content` 还给你，这样你就能把它传给浏览器、一个 API 调用，或者任何其他期待一个纯 URL 的地方。

下面是一个“把每一次扫描都记录到 Apple 备忘录里的一条便签”的四操作示例：

1. 用 **Receive Shortcut Input** 接收文本。
2. **Run Shortcut** -> Parse NFC Tap Counter，把输入作为文本传入。
3. **Get Dictionary Value** -> 连续做三次查找，分别取 `tagID`、`count` 和 `content`，把每个存进一个变量。
4. **Append to Note** -> 写入一行，类似 `[Current Date] tag=<tagID> count=<count> url=<content>`。

现在你就有了一份由标签自己写下的、不断累加的轻触日志。没有后端，没有第三方分析，任何地方都没有账户。

---

## 一些可以继续发挥的点子

解析器解锁的一些小用法，写下来，省得你从零去想：

- **按标签 ID 分支。** 一个快捷指令，多枚标签。为每个已知的标签 ID 加一个 **If** 操作：如果扫描的是办公室门的标签，就静音通知；如果扫描的是工作室的标签，就设置一个专注模式；如果扫描的是厨房的标签，就启动一个计时器。标签 ID 标识的是实体标签，而不是内容，所以你可以给每一枚标签写同一个 URL，却仍然对每一枚单独做出反应。
- **在第 N 次扫描时选出赢家。** 把 `hasCount` 和一个比较结合起来。如果 `count` 等于 100，就触发一条确认消息；对其他每一次扫描，就做常规处理。芯片负责保证顺序，你的快捷指令只管读取它。
- **发送到一个 webhook。** 如果你想要服务端处理却不想写一个 iOS App，就把它和 NFC.cool 的 [Webhooks 功能](/features/webhooks/)搭配起来：把解析出的值作为 JSON 发出去，剩下的交给服务器。两个 iOS 操作，你的标签就接进了任何会说 HTTP 的东西里。
- **记录到文件或备忘录。** 最简单的一种，却出乎意料地有用。把 `timestamp, tagID, count` 追加到 iCloud Drive 里一个不断累加的文件或者一条备忘录里，你就有了一份日后可以翻看或绘制成图的轻触日志。很适合在不搭建基础设施的情况下，对单枚标签做互动追踪。

如果你用这些做出了什么有意思的东西，我真心想看看。

---

## 一点小小的致谢

这两个快捷指令都是用 [Shortcuts Playground](https://github.com/viticci/shortcuts-playground-plugin) 做的，这是 Federico Viticci 开发的一个用自然语言生成 iOS 快捷指令的插件。它是个很棒的工具，我要感谢他把它做了出来，没有它，这两个快捷指令我得花长得多的时间才能拼出来。

---

## 给 Android 用户的一点说明

快捷指令是一款 Apple 的 App，所以这两个只能在 iPhone 上运行。不过轻触计数器功能本身在两个平台上都能用，因为替换发生在芯片内部，并不在意是哪部手机在读取标签。在 Android 上，URL、Email 和 SMS 这几种负载类型的行为跟在 iOS 上一样；如果你想在那边做类似的自动化，Tasker 或 MacroDroid 这类 App 可以接收一个带 `?nfc=...` 的 URL，并用它们自己的字符串处理操作把这些值提取出来。在传输上的格式是相同的。

---

## 来试试看

如果你想更深入地了解轻触计数器功能底层到底是怎么工作的，那在[上一篇文章](/blog/count-nfc-tag-scans/)里。如果你想在不先设置自己的自动化的情况下，就看到一枚启用了计数器的标签实际运作，我们的[实时轻触计数器演示](/tap-counter/)页面会直接从它自己的 URL 里读取 `?nfc=` 的值：写一枚指向那里的标签，轻触它，看着计数和标签 ID 出现。

NFC 轻触计数器功能本身在 NFC.cool Tools 里，支持 [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-ios-shortcuts-nfc-tap-counter-en&mt=8) 和 [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-ios-shortcuts-nfc-tap-counter-en)。想看看我围绕 NFC 做的整套工具，可以看看 [NFC 读取与写入功能](/features/nfc-reader-writer/)。
