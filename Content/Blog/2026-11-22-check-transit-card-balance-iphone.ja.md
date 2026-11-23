---
id: "check-transit-card-balance-iphone-2026-11"
title: "iPhoneで交通系ICカードの残高を確認する方法：Suica、オクトパス、T-moneyなど"
date: "2026-11-22"
tags: ["guides", "iphone", "privacy"]
summary: "Suica、オクトパス、T-moneyのような交通系ICカードや電子マネーをiPhoneにかざすと、NFC.coolが残高と最近の利用履歴を表示します。読み取れるカードの一覧、銀行カードからわかること、そしてあなたのカードから誰でも読み取れる情報をまとめました。"
author: "Nicolo Stanciu"
image: "/assets/images/Blog/check-transit-card-balance-iphone-v4.webp"
imageAlt: "交通系カードの残高とグラフを表示したiPhoneに緑のICカードがかざされ、手前にさらに2枚の交通系カードが置かれている"
metaTitle: "iPhoneで交通系ICカードの残高を確認：Suicaなど"
metaDescription: "Suica、PASMO、オクトパス、T-money、Clipper、Opalなど、ICカードや電子マネーの残高と利用履歴をiPhoneで確認。NFC.coolが読めるカードの一覧です。"
ogTitle: "交通系ICカードの残高をiPhoneで確認"
ogDescription: "Suica、オクトパス、T-money、Navigo、Clipperなど多くのICカードに対応。iPhoneにかざすだけで、残高、利用履歴、誰でも読み取れる情報がわかります。"
---
何年もの間、同じ種類のメールが私の受信箱に届き続けていました。言語は十数種類、書かれているカードの名前もばらばらです。「電子マネーのカードが読めません」「ICカードを認識しません」「地下鉄の切符をスマホにかざしたのに、何も起きませんでした」。

もっともな話です。NFC.coolはチップを見つけて[そのIDとチップの種類を表示し](/ja/features/nfc-reader-writer/)、そこで止まっていました。お金の入ったカードを手にしている人から見れば、アプリが途中で投げ出したように見えたはずです。知りたい残高は、カードの中にちゃんとあるのですから。

[NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-ja&mt=8)のバージョン7.4.0は、あの受信箱への私の答えです。交通系カード、電子マネー、銀行カードをiPhoneにかざすと、アプリが残高と最近の利用履歴を表示します。そして同じくらい興味深いのが、ほかの誰でもそのカードから読み取れる情報の一覧です。まずはiPhoneから始まり、[Android版のNFC.cool Tools](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-check-transit-card-balance-iphone-ja)（近日対応）にも同じカード読み取り機能が入ります。

---

## 「NFCカード」とひとくくりにできない理由

これらのカードはどれも[NFCでスマホと通信しています](/ja/blog/nfc-on-iphones-insider-look/)。共通点はそこまでです。

私はこう考えています。NFCは玄関にすぎません。その奥にあるのはカードごとにまったく別の建物で、間取りも、鍵のかかった部屋もそれぞれ違います。日本のカードはソニーの**FeliCa**で動いています。ヨーロッパの交通系カードの多くは**Calypso**です。サンフランシスコ、シドニー、ヘルシンキは[**MIFARE DESFire**](/ja/blog/ultimate-nfc-tag-guide/#mifare-classicplusdesfire入退室管理のファミリー)を使っていますが、中の構成は都市ごとに違います。銀行カードが話すのは**EMV**で、スーパーのレジの端末が使っているのと同じ規格です。

そして建物の中のどの部屋を開けておくかは、運営する事業者が決めます。残高と直近20件の利用履歴を、誰でも入れる場所に置いている事業者もあります。すべての扉に鍵をかけ、自社の改札機や券売機だけに鍵を持たせている事業者もあります。その扉を越えられるアプリはありませんし、NFC.coolも越えようとはしません。読み取りはすべて読み取り専用で、鍵は使わず、カードには何も書き込みません。

ですから、この機能の本当の仕事は、カードシステムごとの間取りを一つずつ覚えていくことでした。

---

## NFC.coolで読み取れる交通系ICカードと電子マネー

現時点でアプリが読み取れるのは次のカードです。その前に、正直に書いておきたいことがあります。私は自分の財布に入っているものはすべて試しました。オランダの使い捨ての紙のOV-chipkaartや、私自身の銀行カードも含めてです。でも世界にはどんな財布にも収まらないほど多くのカードがあります。そのため、下に挙げた読み取り機能のほとんどは、私が実際に手にしたカードではなく、各カードシステムの構成をもとに作っています。あなたのカードが正しく読めなかったり、まったく読めなかったりしたら、ぜひ知らせてください。その方法は後で説明します。

<figure class="phone-figure" data-layout="stage">
<figcaption>NFC.coolでのカードの表示</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/1-suica-balance-440w.webp" alt="NFC.coolで読み取ったSuica。緑のカード面に残高¥2,140、その下に残高のグラフと最初の利用履歴や支払い"><p><strong>残高。</strong>上部にカードの残高、そして直近の利用でそれがどう推移したかを表示します。</p></li>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/2-tmoney-trips-440w.webp" alt="NFC.coolで読み取った残高₩12,350のT-money。日付、時刻、金額、各回の後の残高が並ぶ支払いの一覧"><p><strong>利用履歴と支払い。</strong>カードに残っているすべての記録を、その時点の残高とともに表示します。</p></li>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/3-locked-card-440w.webp" alt="NFC.coolで読み取ったMIFARE DESFireの交通系カード。チップの種類とシリアル番号は読み取れ、利用履歴、残高、定期券は読み取り不可と表示されている"><p><strong>ロックされたカード。</strong>事業者がロックしている場合は、どこが閉じたままなのかをアプリが教えてくれます。</p></li>
</ol>
</figure>

### 残高と最近の利用履歴

- **日本**：Suica、PASMO、ICOCA、Kitaca、manaca、nimoca、PiTaPa、TOICA、はやかけん。最大20件の最近の利用履歴と、アプリが知っている駅なら駅名も表示します。楽天Edy、nanaco、WAONも残高と履歴を表示します。
- **韓国**：T-moneyとCashbee。最近の利用履歴と、カードの発行日と有効期限を表示します。
- **中国と香港**：深圳通、武漢通、城市一卡通（上海のカードならShanghai Public Transportとして表示）、交通聯合（T-Union）。最近の利用履歴と有効期間を表示します。香港のオクトパス（八達通）は残高を表示します。
- **インドネシア**：Mandiri e-money、BCA Flazz、BNI TapCash、MegaCash、KRLのKartu Multi Tripは履歴まで表示します。JakCardとMRT Jakartaのカードは残高を表示します。
- **オーストラリアとニュージーランド**：シドニーのOpalは残高と最後の利用を表示します。ウェリントンのSnapperはT-moneyと同じシステムで動いていて、NZドルで表示されます。
- **アメリカ**：サンフランシスコのClipperとシアトルのORCA。
- **フィンランド**：HSL、Waltti、タンペレのカード。
- **イスラエル**：Rav-Kav。チャージ残高、定期券、利用履歴を表示します。

### 残高はなくても、定期券と利用履歴がわかるカード

ヨーロッパのカードの多くは、そもそも残高を持っていません。入っているのは定期券です。パリのNavigoをはじめとするフランスのCalypsoカード（Pass Pass、KorriGo、OùRAなど）、ブリュッセルのMOBIB、モントリオールのOpus、Venezia Unica、Lisboa Vivaは、カードに入っている定期券と最近の利用履歴を表示します。アデレードのmetroCARDとアブダビのHafilatも同じです。残高が事業者の鍵の向こう側にあるからです。

### 紙のきっぷと使い捨てのチケット

薄い紙のきっぷにもチップが入っています。NFC.coolが読み取れるのは、シカゴのVentraとバンクーバーのCompassのチケット、モスクワのTroika、Clipperの紙のチケット、HSL、タンペレ、ヴェネツィア、ピサのチケット、OV-chipkaartの紙のチケット、そしてトリノのGTTのチケットです。GTTのチケットでは、チケットの種類、発行された日時、改札で有効化された日時がわかります。

### 事業者がロックしているカード

すべてをロックしている事業者もあります。ロンドンのOyster、ダブリンのLeap、バンコクのRabbitカードでは、NFC.coolにわかるのはそれがどのカードかということだけです。ほかに開いている部分が何もないからです。メルボルンのMykiやトロントのPRESTOのように、カード番号だけは見せて、残りは閉じているものもあります。これはアップデートで変えられることではありません。それらのシステムが、そういう作りになっているのです。

### 外付けリーダーが必要なカード

iPhoneがそもそもアプリに渡してくれないカードもあります。シンガポールのEZ-LinkとNETS FlashPay、北京の一卡通（Yikatong）がそうです。[外付けのUSB NFCリーダー](/ja/affiliate-links/#usb-nfc-reader)をつなげば、NFC.coolで残高と履歴まで読み取れます。こうしたリーダーの仕組みは、[iPadとMacでNFCタグを読み取る](/ja/blog/nfc-reading-ipad-mac/)記事で書きました。

---

## 銀行カード：見えるもの、決して見えないもの

銀行カードの話になると、みなさん身構えます。無理もありません。

iPhoneでNFC.coolが表示するのは、VisaかMastercardかという国際ブランドだけで、それ以上は何もありません。[Appleは、私のアプリのようなアプリがiPhoneで銀行カードの決済データを読むことを認めていません](https://developer.apple.com/documentation/corenfc/nfctagreadersession)。毎日この技術を扱っている身として、私はそれが正しい判断だと思っています。

外付けのUSBリーダーを使うと、もう少しわかることが増えます。国際ブランド、先頭6桁と末尾4桁以外を伏せたカード番号、有効期限、発行国、通貨です。NFC.coolがどの端末でも決して読まないのはあなたの名前で、セキュリティコードとPINはそもそも読み取れません。チップにコピーする価値のあるものが何もない理由は、[私のNFCタグ大全](/ja/blog/ultimate-nfc-tag-guide/#nfcアプリでスマホから銀行カードやパスポートを読めますか)で説明しています。

---

## 他人のスマホがあなたのカードから読み取れるもの

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/check-transit-card-balance-iphone/anyone-can-read-440w.webp" alt="NFC.coolで読み取ったSuicaの誰でも読み取れる情報の欄。残高と直近6件の利用履歴や支払いが、鍵なしでどのスマホからも読み取れる"><p><strong>誰でも読み取れる情報。</strong>Suicaなら、残高と直近の利用履歴が鍵なしで読めます。</p></li>
</ol>
</figure>

ここは私がいちばん興味深いと思っている部分で、私ならまずここを見ます。

NFC.coolは、読み取るものをすべて鍵なしで読み取っています。つまり、あなたのカードにかざしたスマホなら、どれでも同じものが読めるということです。パスポートはその逆です。顔写真のページに印刷された鍵を渡すまで、チップは何も話しません。[スマホでパスポートを読み取る](/ja/blog/read-passport-nfc-chip/)のも、この仕組みによるものです。だからカードの画面にはどれも**誰でも読み取れる情報**という欄があり、今回の読み取りで出てきたものがそのまま並びます。残高、日付と駅名つきの利用履歴、カード番号など、カードが渡してきたものすべてです。

Suicaなら、駅名つきで20件の乗車記録が出てくることもあります。Navigoなら、定期券と最近の利用履歴。Oysterなら、ほとんど何も出てきません。NFCは数センチの距離でしか働かないので、電車の向こう側から誰かがあなたのカードを読むことはありません。それでも、自分のポケットに入っているのがどちらのタイプのカードなのかは、知っておいて損はありません。

この間、データがiPhoneの外に出ることは一切ありません。読み取りはカードとあなたのスマホの間だけのやりとりで、それで完結します。

---

## カードの変化をあとから追う

読み取ったカードはすべてスキャンの一覧に保存され、「Suica • ¥1,234」のような短い概要がつくので、あとから簡単に見つけられます。後で開くと、読み取ったときのカードの状態に加えて、**前回のスキャンから**が表示されます。同じカードを前回読み取ったときから、残高がどれだけ変わったかがわかる表示です。この前のチャージはどこに消えたのか、と首をかしげたことがあるなら便利です。

---

## iPhoneでカードの残高を確認する方法

1. [NFC.cool Tools](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-ja&mt=8)を開き、**NFCを読む**をタップします。
2. カードをiPhoneの上部に平らに当て、シートに**カードを読み取りました**と表示されるまで動かさずに待ちます。
3. カードが専用の画面で開きます。上部に残高、その下に詳細が表示されます。

先にカードの種類を選ぶ必要はありません。どんなカードなのかは、アプリが自分で判断します。

---

## リストにないカードは、私に送ってください

ここからはあなたの出番です。NFC.coolがチップを認識しても全部は読み取れなかった場合、カードの画面に**このカードの読み取りにご協力ください**という欄が表示されます。残高は読めたのに何かがおかしく見える場合、同じ欄は**問題がありますか**？という見出しになります。

**読み取り詳細を送信**をタップし、カードの名前と国を入力します。残高がある場合は、それが正しいかどうかも教えてください。何かが送られる前に、**データを見る**をタップすれば、送信される内容をそのまま確認できます。読み取り中にカードが返した応答、チップの種類、お使いの端末とアプリのバージョン、そしてあなたの国です。名前やアカウントは含まれず、カードのシリアル番号と、アプリが認識したカード番号は伏せられます。ただ、アプリがまだ知らないカードには、アプリが見分けられない情報が含まれている可能性もあります。だからこそ、送る前に自分の目で確認できるようにしているのです。送信がうまくいかない場合は、代わりにメールで送ることもできます。

届くレポートの一つひとつが、私の手元にないカードです。私が一度も訪れたことのない街のものも少なくありません。そして次のカードに対応できるのは、そうしたレポートのおかげです。ですから、もしあなたが以前「NFC.coolで自分のカードが読めない」と私に連絡してくれたことがあるなら、[アプリをアップデートして](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-ja&mt=8)もう一度試してみてください。それでも読めなければ、今度は私が直すのに必要な情報をそのまま送れるボタンがあります。

[iPhone版NFC.cool Toolsをダウンロード](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-check-transit-card-balance-iphone-ja&mt=8) · [Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-check-transit-card-balance-iphone-ja)（近日対応）
