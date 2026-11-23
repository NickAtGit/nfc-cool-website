---
id: "check-transit-card-balance-iphone-2026-11"
title: "用 iPhone 查询交通卡和 IC 卡余额：Suica、八达通、T-money 等"
date: "2026-11-22"
tags: ["guides", "iphone", "privacy"]
summary: "把 Suica、八达通或 T-money 这样的 IC 卡、交通卡或电子钱包卡贴到 iPhone 上，NFC.cool 就会显示它的余额和近期行程。这里列出它能读的每一种卡，讲讲银行卡会透露什么，以及任何人能从你的卡里读到什么。"
image: "/assets/images/Blog/check-transit-card-balance-iphone-v4.webp"
imageAlt: "一部 iPhone 显示着一张交通卡的余额和图表，一张绿色 IC 卡贴在它上面，前面还摆着另外两张交通卡"
author: "Nicolo Stanciu"
metaTitle: "用 iPhone 查询交通卡和 IC 卡余额：Suica 等"
metaDescription: "在 iPhone 上查看 Suica、PASMO、八达通、T-money、Clipper、Opal 等 IC 卡和交通卡的余额与行程。NFC.cool 能读的卡全在这里。"
ogTitle: "用 iPhone 查询你的交通卡和 IC 卡余额"
ogDescription: "Suica、八达通、T-money、Navigo、Clipper 等众多 IC 卡：把卡贴到 iPhone 上，就能看到余额、行程，以及任何人能从中读到什么。"
---
这些年来，我的收件箱里总会收到同一类邮件，用十几种语言写成，里面提到的卡名也有十几种。“你的 App 读不了我的电子钱包卡。”“它看不到我的 IC 卡。”“我把地铁卡贴到手机上，什么反应都没有。”

他们说得没错。NFC.cool 能找到芯片，[显示它的 ID 和芯片类型](/zh/features/nfc-reader-writer/)，然后就到此为止了。对手里拿着一张存了钱的卡的人来说，这看上去就像 App 中途放弃了。毕竟他们想看的余额明明就存在卡里。

[NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-zh&mt=8) 7.4.0 版，就是我给这些邮件的回答。把交通卡、电子钱包卡或银行卡贴到 iPhone 上，App 现在会显示它的余额、近期行程，还有同样值得一看的：别人能从这张卡里读到的全部内容。这项功能先在 iPhone 上推出，[NFC.cool Tools 的 Android 版](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-check-transit-card-balance-iphone-zh)（即将推出）也会获得同样的读卡能力。

---

## 同样叫“NFC 卡”，里面却各不相同

这些卡全都[通过 NFC 跟你的手机通信](/zh/blog/nfc-on-iphones-insider-look/)。它们的共同点也就到此为止。

我是这么理解的：NFC 只是一扇大门。门后，每张卡都是一栋独立的楼，有自己的格局，也有自己上了锁的房间。日本的卡用的是索尼的 **FeliCa**。很多欧洲交通卡用的是 **Calypso**。旧金山、悉尼和赫尔辛基用的是 [**MIFARE DESFire**](/zh/blog/ultimate-nfc-tag-guide/#mifare-classicplus-和-desfire门禁家族)，但每个城市在里面的布局都不一样。银行卡说的是 **EMV**，跟超市收银台的刷卡终端用的是同一套标准。

而在每栋楼里，开哪几个房间由运营方说了算。有的把余额和最近二十次行程放在谁都能进的地方。有的把每扇门都锁上，钥匙只在他们自己的闸机和售票机手里。没有哪个 App 能绕过去，NFC.cool 也不去尝试：每一次读取都是只读的，不用任何密钥，也不会往卡里写入任何东西。

所以，这项功能背后真正的工作，是把每一种卡片系统的格局一个一个摸清楚。

---

## NFC.cool 能读哪些 IC 卡和交通卡

下面是 App 目前能读的卡。先说句实话。我钱包里有的卡都测过了，包括荷兰那种一次性的 OV-chipkaart 纸质票，还有我自己的银行卡。可世界上的卡远比任何一个钱包里装的多，所以下面大部分读卡功能，依据的是每种卡片系统的结构，而不是我亲手拿过的卡。如果你的卡读出来不对，或者根本读不出来，我真的很想知道。具体怎么告诉我，下文会讲。

<figure class="phone-figure" data-layout="stage">
<figcaption>NFC.cool 会为你的卡显示哪些内容</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/1-suica-balance-440w.webp" alt="NFC.cool 里的一张 Suica 卡：绿色卡面上显示余额 ¥2,140，下方是余额图表和最早的几笔行程与消费"><p><strong>余额。</strong>卡里的余额显示在最上面，还能看到它在最近几次行程中的变化。</p></li>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/2-tmoney-trips-440w.webp" alt="NFC.cool 里的一张 T-money 卡，余额 ₩12,350，下面是一列消费记录，每条都有日期、时间、金额和之后的余额"><p><strong>行程和消费。</strong>卡里保存的每一条记录，以及每条之后的余额。</p></li>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/3-locked-card-440w.webp" alt="NFC.cool 里的一张 MIFARE DESFire 交通卡：芯片类型和序列号可以读取，行程、余额和票种都标为不可读取"><p><strong>被锁住的卡。</strong>如果运营方把卡锁了，App 会告诉你哪些内容读不到。</p></li>
</ol>
</figure>

### 余额和近期行程

- **日本**：Suica、PASMO、ICOCA、Kitaca、manaca、nimoca、PiTaPa、TOICA 和 Hayakaken，最多显示 20 条近期行程，App 认识的车站还会显示站名。乐天 Edy、nanaco 和 WAON 同样会显示余额和记录。
- **韩国**：T-money 和 Cashbee，显示近期行程，以及卡片的发行日期和有效期。
- **中国内地和香港**：深圳通、武汉通、城市一卡通（如果是上海的卡，会显示为 Shanghai Public Transport）和交通联合卡，显示近期行程和有效期。香港的八达通会显示余额。
- **印度尼西亚**：Mandiri e-money、BCA Flazz、BNI TapCash、MegaCash 和 KRL Kartu Multi Trip，带消费记录。JakCard 和雅加达 MRT 的卡会显示余额。
- **澳大利亚和新西兰**：悉尼的 Opal，显示余额和最近一次行程；还有惠灵顿的 Snapper，它和 T-money 用的是同一套系统，余额以新西兰元显示。
- **美国**：旧金山的 Clipper 和西雅图的 ORCA。
- **芬兰**：HSL、Waltti 和坦佩雷的卡。
- **以色列**：Rav-Kav，显示储值、票种和行程。

### 能看到票种和行程，但没有余额

很多欧洲的卡根本不存余额，里面装的是月票这类票种。巴黎的 Navigo 和法国其他 Calypso 卡（Pass Pass、KorriGo、OùRA 等）、布鲁塞尔的 MOBIB、蒙特利尔的 Opus、Venezia Unica 和 Lisboa Viva，都会显示卡上的票种和近期行程。阿德莱德的 metroCARD 和阿布扎比的 Hafilat 也是一样，因为它们的余额被锁在运营方的密钥后面。

### 纸质票和单程票

那些薄薄的纸质票里也有芯片。NFC.cool 能读芝加哥的 Ventra 票和温哥华的 Compass 票、莫斯科的 Troika、Clipper 的纸质票、HSL、坦佩雷、威尼斯和比萨的车票、OV-chipkaart 纸质票，以及都灵的 GTT 车票。读出来能看到票的类型、出票时间和验票时间。

### 被运营方锁死的卡

有些运营方把一切都锁上了。对于伦敦的 Oyster、都柏林的 Leap 或曼谷的 Rabbit 卡，NFC.cool 能告诉你这是哪种卡，仅此而已，因为卡上没有别的东西是开放的。还有几种，比如墨尔本的 Myki 和多伦多的 PRESTO，会给出卡号，其余的都不给。这不是一次更新就能改变的，那些系统本来就是这样设计的。

### 需要外接读卡器的卡

有些卡，iPhone 就是不肯交给 App 去读。新加坡的 EZ-Link 和 NETS FlashPay，以及北京一卡通，都属于这一类。插上一个[外接 USB NFC 读卡器](/zh/affiliate-links/#usb-nfc-reader)，NFC.cool 就能读它们，包括余额和记录。这些读卡器是怎么工作的，我在[在 iPad 和 Mac 上读取 NFC 标签](/zh/blog/nfc-reading-ipad-mac/)那篇文章里写过。

---

## 银行卡：你能看到什么，又永远看不到什么

一说到银行卡，大家就会紧张，这完全可以理解。

在 iPhone 上，NFC.cool 只显示卡组织，也就是 Visa 或 Mastercard，别的都不显示。[Apple 不允许像我这样的 App 在 iPhone 上读取银行卡的支付数据](https://developer.apple.com/documentation/corenfc/nfctagreadersession)。作为每天都跟这套技术打交道的人，我觉得这个决定是对的。

用外接 USB 读卡器能看到的会多一些：卡组织、只露出前六位和后四位的卡号、有效期、发卡国家和币种。无论在哪台设备上，NFC.cool 都不会读取你的姓名，而安全码和 PIN 码根本就读不出来。为什么芯片上没有任何值得复制的东西，我在 [NFC 标签指南](/zh/blog/ultimate-nfc-tag-guide/#我的手机能用-nfc-应用读取银行卡或护照吗)里解释过。

---

## 陌生人的手机能从你的卡里读到什么

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/anyone-can-read-440w.webp" alt="NFC.cool 里一张 Suica 卡的任何人都能读取的内容一栏：余额和最近 6 笔行程与消费，任何手机都能读取，不需要密钥"><p><strong>任何人都能读取的内容。</strong>在 Suica 上，就是余额和最近的行程，不需要任何密钥。</p></li>
</ol>
</figure>

这是我觉得最有意思的部分，也是我拿到卡会第一个去看的地方。

NFC.cool 读到的一切，都是在没有密钥的情况下读到的。这意味着，任何一部贴到你卡上的手机都能读到同样的内容。护照恰恰相反：它的芯片一声不吭，直到你给它一把印在照片页上的钥匙，[用手机读取护照](/zh/blog/read-passport-nfc-chip/)就是这么运作的。所以每张卡的页面上都有一栏 **任何人都能读取的内容**，准确列出这次读取得到了什么：余额、带日期和车站的行程、卡号，卡交出来的任何东西。

对一张 Suica 来说，这可能是二十段带站名的行程。对一张 Navigo 来说，是你的票种和近期行程。对一张 Oyster 来说，几乎什么都没有。NFC 只在几厘米的距离内起作用，所以没人能隔着半节车厢读你的卡，但知道自己口袋里装的是哪一种卡，还是很有必要的。

在这整个过程中，没有任何数据离开你的 iPhone。读取只发生在卡和你的手机之间，仅此而已。

---

## 同一张卡，前后对比

你读过的每一张卡都会保存在扫描列表里，附带一句简短的摘要，比如“Suica • ¥1,234”，方便你以后再找到它。之后再打开，你会看到这张卡当时的样子，外加一栏 **自上次扫描以来**，显示从你上一次读这张卡到现在，余额变了多少。如果你也曾纳闷上次充的钱都花到哪儿去了，这个就很有用。

---

## 如何在 iPhone 上查询卡片余额

1. 打开 [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-zh&mt=8)，轻点 **读取 NFC**。
2. 把卡平放贴在 iPhone 顶部，保持不动，直到弹出的面板显示 **已读取卡片**。
3. 这张卡会在单独的页面中打开，余额在最上面，详细信息在下面。

你不需要先选择卡片类型，App 会自己判断这是什么卡。

---

## 你的卡不在名单上？把它发给我

接下来就需要你出手了。当 NFC.cool 认出了芯片、却没能完整读取时，卡片页面上会显示 **帮助我们读取此卡**。如果它读出了余额，但有什么地方看起来不对，同一栏的标题就会变成“**有问题？**”。

轻点 **发送读取详情**，填上卡的名称和所在国家；如果有余额，再告诉我它对不对。发送任何东西之前，你都可以轻点 **查看数据**，看清楚到底会发送哪些内容：读取过程中卡片的应答、芯片类型、你的设备和 App 版本，以及你所在的国家。你的姓名和任何账户都不在其中，卡的序列号以及 App 识别出的任何卡号也都会被遮盖。不过，一张 App 还不认识的卡里，仍可能藏着它识别不出的信息，所以才要让你先过目。如果发送失败，你也可以改用电子邮件发给我。

每一份报告，都是一张我手里没有的卡，往往来自一座我从没去过的城市，下一批卡片就是这样得到支持的。所以，如果你曾经写信告诉我 NFC.cool 读不了你的卡：[更新一下 App](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-zh&mt=8)，再试一次。如果还是不行，现在你有了一个按钮，能把我修好它所需要的东西原原本本地发给我。

[下载 iPhone 版 NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-zh&mt=8) · [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-check-transit-card-balance-iphone-zh)（即将推出）
