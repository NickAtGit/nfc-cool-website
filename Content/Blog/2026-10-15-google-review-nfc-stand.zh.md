---
id: "google-review-nfc-stand-2026-10"
title: "如何用 NFC 自制 Google 评论立牌"
date: "2026-10-15"
tags: ["guides", "nfc-tags", "business-cards"]
summary: "咖啡馆柜台上那些 Google 评论小立牌，说穿了就是一枚 NFC 标签加一个二维码，都指向同一个链接。我来教你自己做一个，也说说为什么 Piano Negro 桌上的立牌放的是整张 NFC.cool Business Card，而不只是一个评论链接。"
image: "/assets/images/Blog/google-review-nfc-stand.webp"
imageAlt: "咖啡馆桌上的一个透明亚克力立牌，卡片上印着五颗金色星星、NFC 标志和二维码，旁边的 iPhone 显示着五星评论页面"
author: "Nicolo Stanciu"
metaTitle: "为你的店自制 Google 评论 NFC 立牌"
metaDescription: "Google 评论立牌其实就是一枚 NFC 标签加一个二维码。教你自己动手做一个，把菜单、社交账号和评论链接放到每张桌上。"
ogTitle: "自己动手做 Google 评论立牌"
ogDescription: "一枚 NFC 标签、一个二维码、一个亚克力台卡。我是怎么把一家酒吧的菜单、社交账号和 Google 评论链接放到每张桌上的。"
---

这几年，我眼看着它们到处冒出来：收银台旁边、餐厅的桌上、理发店的前台，总摆着一个小小的亚克力立牌。上面写着“欢迎在 Google 上给我们写评论”，印着五颗星和一个二维码，通常还有个小小的 NFC 标志。把手机靠过去，评论页面就打开了。

我是靠做 NFC App 吃饭的，自然想知道里面装的是什么。是 Google 特制的芯片吗？还是什么不为人知的合作？

都不是。里面就是一枚普通的 NFC 标签，外加一个印上去的二维码，两者指向同一个链接。门道就这么简单，所以你花一个下午就能自己做一个。

---

## Google 评论立牌里到底有什么

这类立牌里的 NFC 标签，就是那种[五十个一包就能买到](/affiliate-links/)的便宜贴纸，有人往里面写了一个网页链接而已。旁边的二维码还是同一个链接，只不过印成了一格一格的小方块，留给手机不支持 NFC 或者关掉了 NFC 的人。

真正有意思的是这个链接本身。Google 有一种网址，能把客人直接带到某一家商家的评论表单，靠的是这家商家的 **Place ID**。Google 地图上的每家商家都有一个。如果你的店还不在 Google 地图上，Google 有说明教你[创建商家资料](https://support.google.com/business/answer/2911778?hl=zh-Hans)。把这个链接写进标签，从客人心想“今晚真不错”到真正写下一条评论，中间就只隔着碰一下立牌。

---

## Google 没告诉你的几个坑

动手之前，有几件事是我测试时踩了坑才知道的。

**链接打不开 Google 地图 App**。这是我最先尝试的，因为这看起来是最顺理成章的体验：碰一下立牌，Google 地图打开，评论面板随之滑出来。我能找到的各种链接写法都试遍了，就是做不到。看样子，Google 就是不希望评论链接直接打开 App。

**浏览器版其实完全够用**。*真正*行得通的，是在浏览器里打开一个页面，客人可以当场选星级、写几句话。速度快，不用装任何 App，在 iPhone 和 Android 上效果都一样。

**客人必须登录 Google 账号**。只有来自 Google 账号的评论才会被计入。大多数 Android 手机本来就登录了 Google，很多 iPhone 用户也在浏览器里登录了 Google。没登录的人会先被要求登录。这一点你我都无能为力，而且说实话，Google 评论没有被垃圾评论彻底淹没，这也是原因之一。

---

## 为什么 Piano Negro 的桌上不只放了一个评论链接

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/card-top-440w.webp" alt="在 Safari 中打开的 Piano Negro 的 NFC.cool Business Card，上面有 Logo，以及葡萄牙语和英语菜单、WhatsApp、Instagram、Google Maps 和 Google Review 的链接"><p><strong>Piano Negro 的名片</strong>。客人把手机靠近桌上的立牌，看到的就是它。</p></li>
</ol>
</figure>

[Piano Negro](https://mycard.nfc.cool/PianoNegro/Piano-Negro) 是葡萄牙 Coimbra 的一家酒吧，1993 年就开业了。我帮老板布置立牌的时候，桌上放的并不只是一个评论链接。刚在桌边坐下的人，还想不到评论这回事。他们想先看看菜单上有什么。

所以 Piano Negro 的每张桌上都有一个立牌，里面放的是这家酒吧的 [**NFC.cool Business Card**](/business-card/)。把手机靠上去，或者扫一下二维码，名片就会打开。客人可能想要的东西都在上面，每样点一下就到：

- 菜单，葡萄牙语和英语各一份
- WhatsApp
- Instagram、TikTok 和 Facebook
- Google 地图
- Google 评论链接，还有 TripAdvisor
- 甚至还有酒吧的 Spotify 歌单

你可以自己[打开他们的名片](https://mycard.nfc.cool/PianoNegro/Piano-Negro)，亲眼看看客人看到的是什么。客人也确实是这么用的：打开菜单，上 Instagram 看看这家酒吧，再顺手留条评论，全在同一个立牌上完成。

这套做法我还喜欢的一点是，立牌永远不会过时。标签和二维码里存的是名片的链接，而不是菜单本身。菜单换了，你在 App 里改一下链接，每张桌上的立牌就都跟着更新了。不用重新打印，也不用重写标签。

---

## 需要准备什么

要准备的东西少得出奇：

- **NFC 标签**。一张普通的 NTAG213 贴纸就够了，这篇文章里的链接放进去还绰绰有余。如果你拿不准该选哪种标签，我写的 [iPhone 适用的 NFC 标签指南](/blog/nfc-tag-types-for-iphones/)讲清楚了它们的区别。
- **透明亚克力台卡**，就是能把印好的卡片插进去的那种。它们一般当作菜单架或桌牌架来卖，一个只要几欧元。
- **一台彩色打印机**。
- [**NFC.cool Business Card**](/business-card/)，用来做桌上的立牌。
- **NFC.cool Tools**，用来生成评论链接，以及给标签加密码，有 [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-google-review-nfc-stand-zh&mt=8) 版和 [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-google-review-nfc-stand-zh) 版。

---

## 桌上的立牌：把你的店做成一张名片

别看名字叫名片，Business Card 不一定非得属于某个人。你可以把姓名栏留空，只填公司名称和 Logo，名片显示出来的就是你的店。

<figure class="phone-figure" data-layout="stage">
<figcaption>设置桌上的立牌</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/table-1-links-440w.webp" alt="NFC.cool Business Card 的编辑界面，有五个链接，名称分别是 Menu、WhatsApp、Instagram、Google Maps 和 Google Review"><p><strong>链接</strong>。给每个链接起一个客人一眼就能看懂的名字。</p></li>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/table-2-write-tag-440w.webp" alt="NFC.cool Business Card 中一张名片的操作选项，其中有写入 NFC 标签和显示二维码"><p><strong>写入 NFC 标签</strong>。在名片的操作里选择它，然后把手机靠近贴纸。</p></li>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/table-3-qr-code-440w.webp" alt="NFC.cool Business Card 中一张名片的二维码，下方是共享和存储到“照片”按钮"><p><strong>显示二维码</strong>。点按存储到“照片”，就能得到一张用来印在卡片上的图片。</p></li>
</ol>
</figure>

### 第 1 步：添加链接

在**链接**下面点按**添加链接**，把客人可能会找的东西都加上：你的菜单、WhatsApp、Instagram 和你在用的其他平台、你在 Google 地图上的位置，还有你的 Google 评论链接。如果你的菜单是 PDF，得先把它放到网上的某个地方，比如你的网站，这样才能链接过去。

给每个链接起一个客人一眼就能看懂的名字，比如“菜单”或者“给我们写评论”。Piano Negro 有两个菜单链接，每种语言一个，这样从国外来的客人也能拿到一份看得懂的菜单。

如果你还没有评论链接，NFC.cool Tools 的**谷歌评论链接**可以帮你生成一个。具体怎么做，我会在下面讲收银台立牌的部分演示。

### 第 2 步：写入标签，保存二维码

打开名片的操作，选择**写入 NFC 标签**，然后把手机靠近贴纸。要印在卡片上的二维码，则先选择**显示二维码**，再选择**存储到“照片”**，你就有了一张能放进任何设计里的图片。

### 第 3 步：打印并测试

给立牌设计一张简单的卡片：你的 Logo，一句简短的话，比如“菜单、Instagram 等更多内容”，再加上二维码和一个小小的 NFC 标志，标志旁边写上“或将手机靠近此处”。打印出来插进台卡，再把标签贴在卡片背面，正好对着那个标志。亚克力和纸完全挡不住 NFC，隔着它们，标签照样读得很顺利。只是要离金属远一点，金属是会挡的。

摆上桌之前，先用几部不同的手机测试一下。

---

## 收银台立牌：直达评论页面

Piano Negro 只用了桌上的立牌。如果让我从零开始布置一家店，我会再加一个立牌，就放在收银台，上面只有评论链接。这时客人刚结完账，印象还新鲜，该等的也都等完了。碰一下就直接进入评论页面，中间不用经过菜单。

<figure class="phone-figure" data-layout="stage">
<figcaption>生成评论链接</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/cashier-1-search-440w.webp" alt="NFC.cool Tools 的谷歌评论链接页面，搜索框里输入了 Piano Negro Coimbra，只有一个结果：位于 Rua Borges Carneiro 的 Piano Negro"><p><strong>搜索</strong>。输入你的店名，再从结果里选中它。</p></li>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/cashier-2-selected-440w.webp" alt="已选中的商家 Piano Negro，下方是在 Google 地图中预览和预览评论页面"><p><strong>预览</strong>。保存之前，先确认是不是你的店。</p></li>
</ol>
</figure>

### 第 1 步：生成评论链接

打开 NFC.cool Tools，新建一条 NFC 消息，选择**谷歌评论链接**。输入你的店名，再从结果里选中它。每个结果下面都会显示地址，要是城里有几家名字差不多的店，这一点就很有用。

如果你已经打开了 Google 地图，还有更快的办法。在地图里找到你的店，点按**分享**，然后直接分享到 NFC.cool，或者复制链接再粘贴进来。App 会自动从地图链接里认出是哪家店。

保存之前，点按**预览评论页面**。它打开的正是客人会看到的页面，你可以借此确认没有选错店。这话听着像废话，但我真见过两条街外就有一家同名的咖啡馆，你肯定不想替竞争对手收集评论。

如果你的店根本搜不到，很可能是它还没有 Google 商家资料。同一个页面里就有链接，指向 Google 介绍如何创建商家资料的说明。

### 第 2 步：写入标签

保存链接，然后把手机靠近 NFC 贴纸，把链接写进去。如果你从没写过标签，可以看看[如何用 iPhone 写入 NFC 标签](/blog/write-nfc-tags-iphone/)，我在那篇文章里一步步讲过。

### 第 3 步：制作二维码

不是每个人都会去碰一下。有些人不知道自己的手机还能这么用，而在 Android 上，NFC 也可能是关着的。二维码就是兜底的办法。

在 App 的二维码部分，用同一个**谷歌评论链接**选项生成二维码。你可以直接把它作为图片分享出去，也可以先在 **QR 码工作室**里打开，换上你的配色，让它和卡片的其他部分风格一致。然后印一张卡片，写上“还满意吗？来 Google 上说说吧”之类的话，插进台卡，标签贴在卡片背面。

---

## 给每个标签都加上密码

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/password-440w.webp" alt="NFC.cool Tools 的密码保护页面，有激活密码和停用密码两个选项"><p><strong>密码保护</strong>。在 NFC.cool Tools 里，适用于 NTAG 2xx 标签。</p></li>
</ol>
</figure>

立牌摆在公共场合，桌上的和收银台的都一样。如果不加保护，任何装了 NFC App 的人路过时都能把你的标签改写成别的内容，而你要等到有客人提起才会发现。

你可以把标签永久锁定，但我更愿意给它加个密码。在 NFC.cool Tools 里打开**密码保护**，选择**激活密码**，输入密码，再把手机靠近标签。客人照样能读取，只有写入才需要密码。而且和永久锁定不同，加密码是可以撤销的：哪天你的店搬了家，或者你想让标签指向别处，取消密码后重新写入就行。Business Card 的标签也一样能加密码，因为密码保护的是标签本身，而不是标签里的内容。前提是要用 NTAG 2xx 标签，比如上面清单里的 NTAG213 贴纸。

记得打开**保存备用**，让 App 替你记住密码。密码一旦丢了，那个标签就再也改不了了。

---

## 邀请每一位客人，也请他们说真话

有一件事我希望你多加留意：邀请*每一位*客人留评论，请他们实话实说，好评差评都可以，而不是开口要五星好评。Google 的评论政策不允许商家只去邀请那些看起来满意的顾客，也不允许拿任何东西来换评论，比如送一杯饮料或者打个折。违反这些规定，评论可能会被删除，后果甚至更严重。而且说实话，在下一位客人眼里，有好有坏的真实评论，远比满屏完美得可疑的好评更让人信服。

---

## 最后说两句

Google 评论立牌看上去像是一件产品，其实不过是贴纸上的一个链接。既然你反正都要在每张桌上贴一张贴纸，不如让它把菜单、社交账号和评论链接一起装进去。

桌上的立牌要用 NFC.cool Business Card，有 [iPhone](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-google-review-nfc-stand-zh&mt=8) 版和 [Android](https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-google-review-nfc-stand-zh) 版。谷歌评论链接和密码保护在 NFC.cool Tools 里，同样有 [iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-google-review-nfc-stand-zh&mt=8) 版和 [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-google-review-nfc-stand-zh) 版。如果你也给自己的店做了一个，我很想看看照片。
