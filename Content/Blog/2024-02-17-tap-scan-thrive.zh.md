---
id: nfc-blog-022
title: "轻触、扫描、玩出花样：二维码除了 URL 还能装什么"
date: 2024-02-17
tags: ["qr-codes", "business-cards"]
summary: "二维码不只是用来放 URL。它可以承载 Wi-Fi 凭据、日历事件、位置、vCard、纯文本，凡是能编码的都行。这里列出 NFC.cool 的二维码生成器和扫描器能做到的完整清单。"
metaTitle: "二维码能装什么：远不止 URL"
metaDescription: "二维码可以编码 Wi-Fi 凭据、联系人、日历事件、位置等等，而不只是 URL。一份务实的指南，覆盖每一种二维码数据类型。"
ogTitle: "轻触、扫描、玩出花样：二维码除了 URL 还能装什么"
ogDescription: "二维码可以编码 Wi-Fi、联系人、日历、位置，而不只是 URL。"
image: "/assets/images/Blog/tap-scan-thrive.webp"
---
一个二维码不过是一桶字节。URL 是迄今为止最常见的内容，但规范本身并不在意这些：你可以编码 Wi-Fi 凭据、一个日历事件、一个地图坐标、一张联系人名片、纯文本，或者任何某个 App 懂得如何解码的自定义数据。

NFC.cool 的二维码生成器把上述这些全都覆盖了。下面就来看看，每一种在被扫描时究竟会发生什么。

---

## URL

最基础的情况。编码 `https://example.com`，用任意相机一扫，设备就会询问你是否打开它。过去十年里出厂的每一部手机都支持这一点。

一个实用的变体：短链接。如果你的 URL 带了一大堆统计参数，那就用它的短链接版本来生成二维码：这样码在物理上更小（码点更少，密度更低），从远处也更容易扫。

---

## Wi-Fi 凭据

用标准的 `WIFI:T:WPA;S:...;P:...;;` 格式编码一个 SSID、密码和安全类型（WPA2、WPA3、开放）。iOS、Android 和现代的 Windows 都能识别这个格式，并提示你加入网络。

把它印在客房里的一张小卡片上，贴在路由器背面，或者用胶带粘在咖啡馆的墙上。客人一扫、加入、搞定，再也不用敲那串 24 位的密码了。

---

## 日历事件

把一个事件编码为 `BEGIN:VEVENT` 块（即 iCalendar 格式）。扫描后，设备会询问你是否把它添加到日历 App，连同开始时间、结束时间、地点和描述一并带上。

它很适合用在活动海报、会议指示牌或“敬请留意日期”的卡片上。收到的人不必再去网站上找这个活动，轻触一下，它就进了他们的日历。

---

## 位置

编码一个带经纬度的 `geo:` URI。扫描后会在默认地图 App 里打开那个坐标点：iOS 上是 Apple Maps，多数 Android 手机上则是 Google Maps。

餐厅、场馆、聚会地点：在传单或请柬上贴一个小小的二维码，对方轻触一下就能拿到路线导航。

---

## vCard（联系人）

URL 之外最常见的选择。编码一张完整的 vCard（姓名、电话、邮箱、单位、地址、URL、照片），设备就会询问你是否把它存为联系人。

二维码电子名片开箱即用，靠的正是这套机制。这也是为什么一个 vCard 二维码无需任何专门 App 就能在每一部手机上用：vCard 是一项有着 30 年历史的标准，系统早就认识它。

相比 NFC.cool 电子名片的方案，它有一个取舍：vCard 二维码无法更新。一旦印出来，里面的联系人数据就被冻结了。如果你想要一个日后还能编辑的“单一可信来源”，那就改为编码一个指向你在线名片页面的 URL，这正是 [NFC.cool Business Card](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-tap-scan-thrive-en&mt=8) 所做的事，也是我们在正经社交场合更推荐它、而非原始 vCard 二维码的原因。

---

## 纯文本

如果你只是想在扫描时显示一段字符串（一条消息、一个优惠码、一道谜题），那就可以编码纯文本。大多数扫描 App 都会把它显示出来，并提供复制或分享的选项。

---

## 自定义数据

有些 App 会注册自定义的 URL scheme（`myapp://...`），并能识别用它们编码的二维码。NFC.cool 的扫描器会尊重这些 scheme：它读取数据后，把后续交给已注册的 App 处理，就和 iOS 或 Android 通过 Universal Links 所做的一样。

---

## 在扫描这一侧

NFC.cool 的扫描器能读取以上任意一种格式，并把它们引导到正确的操作上：URL 在浏览器里打开，vCard 提示保存，Wi-Fi 提示连接，位置在地图里打开。它还会在本地保留每一次扫描的历史记录，当你在一场会议上扫了 30 份菜单、之后想回头再看某一份时，这就很有用了。

整套二维码能力，包括生成器和扫描器，都已内置于 [iPhone 版 NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-tap-scan-thrive-en&mt=8) 和 [Android 版](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-tap-scan-thrive-en)。
