---
id: "google-review-nfc-stand-2026-10"
title: "NFCでGoogleクチコミスタンドを自作する方法"
date: "2026-10-15"
tags: ["guides", "nfc-tags", "business-cards"]
summary: "カフェのレジ横でよく見かける、Googleクチコミ用の小さなスタンド。中身は、リンクを書き込んだNFCタグとQRコードだけです。自作の方法と、Piano Negroのテーブルに置いたスタンドに、クチコミのリンクだけでなくお店のNFC.cool Business Cardを丸ごと載せた理由をお話しします。"
image: "/assets/images/Blog/google-review-nfc-stand.webp"
imageAlt: "カフェのテーブルに置かれた透明なアクリルスタンド。金色の星5つとNFCマーク、QRコードが入ったカードが差し込まれ、隣には星5つのクチコミ画面を表示したiPhone"
author: "Nicolo Stanciu"
metaTitle: "お店用のGoogleクチコミNFCスタンドを自作する方法"
metaDescription: "Googleクチコミスタンドの正体は、NFCタグとQRコードだけ。自分で作る手順と、メニューやSNS、クチコミのリンクをすべてのテーブルに置く方法を紹介します。"
ogTitle: "Googleクチコミスタンドは自作できる"
ogDescription: "NFCタグとQRコード、それに差し込み式のアクリルスタンド。バーのメニューとSNS、Googleクチコミのリンクを、すべてのテーブルに置いた方法です。"
---

ここ数年で、あちこちで見かけるようになりました。レジ横や飲食店のテーブル、美容院の受付に置かれた、小さなアクリルのスタンドです。「Googleクチコミにご協力ください」の文字に星が5つ、QRコード、そしてたいていは小さなNFCマーク。スマホをかざすと、クチコミのページが開きます。

NFCアプリを作って暮らしている身としては、中に何が入っているのか気にならないはずがありません。Google専用の特別なチップでも入っているのか。それとも、何か秘密の提携があるのか。

答えはどちらでもありませんでした。中身は普通のNFCタグと印刷されたQRコードで、どちらも同じリンクを指しているだけです。仕掛けはそれで全部。つまり、半日もあれば自分で作れます。

---

## Googleクチコミスタンドの中身

こうしたスタンドに入っているNFCタグは、[50枚入りのパックで買える](/affiliate-links/)安いステッカーと同じものです。そこにWebリンクが1つ書き込まれています。隣のQRコードは、同じリンクを四角い模様として印刷したもの。スマホがNFCに対応していない人や、NFCをオフにしている人のためにあります。

面白いのはリンクそのものです。Googleには、特定のお店のクチコミ投稿フォームへお客さんを直接案内できるURLがあり、お店は**Place ID**で識別されます。Googleマップに載っているお店には必ずPlace IDがあります。まだ載っていない場合は、[ビジネスプロフィールの作成方法](https://support.google.com/business/answer/2911778?hl=ja)をGoogleが説明しています。このリンクをタグに書き込めば、スタンドにスマホをかざすことが、「今日はいい夜だったな」と思ってから実際にクチコミを書くまでの、いちばんの近道になります。

---

## Googleが教えてくれない落とし穴

自作する前に、知っておいてほしいことがいくつかあります。どれも、テストしながら痛い目を見て覚えたことです。

**リンクからGoogleマップのアプリは開けない**。真っ先に試したのがこれでした。スタンドにかざすとGoogleマップが開き、クチコミの画面が下からせり上がってくる。誰もが思い浮かべる流れです。見つけられる限りのリンクの書き方を試しましたが、方法はありませんでした。Googleはどうやら、クチコミのリンクから直接アプリを開かせたくないようです。

**ブラウザ版で十分**。代わりにきちんと使えるのが、ブラウザでページを開くリンクです。お客さんはその場で星を選び、ひとことコメントを書けます。手軽で、アプリのインストールも要らず、iPhoneでもAndroidでも同じように動きます。

**お客さんはGoogleにログインしている必要がある**。クチコミはGoogleアカウントからしか投稿できません。Androidスマホの多くはすでにGoogleにログインしていますし、iPhoneでもブラウザでGoogleにログインしている人は大勢います。そうでない人には、先にログインを求める画面が出ます。これは私にもあなたにもどうにもできません。それに正直なところ、Googleのクチコミがスパムだらけにならずに済んでいるのは、この仕組みのおかげでもあります。

---

## Piano Negroのテーブルに、クチコミのリンク以外も置いた理由

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/card-top-440w.webp" alt="Safariで開いたPiano NegroのNFC.cool Business Card。ロゴと、ポルトガル語と英語のメニュー、WhatsApp、Instagram、Google Maps、Google Reviewへのリンク"><p><strong>Piano Negroのカード</strong>。テーブルのスタンドにスマホをかざすと、お客さんにはこの画面が表示されます。</p></li>
</ol>
</figure>

[Piano Negro](https://mycard.nfc.cool/PianoNegro/Piano-Negro)は、ポルトガルのCoimbraで1993年から続くバーです。オーナーと一緒にスタンドを用意したとき、テーブルにクチコミのリンクだけを置くことはしませんでした。席に着いたばかりのお客さんは、まだクチコミのことなど考えていません。まず知りたいのは、メニューに何があるかです。

そこでPiano Negroでは、すべてのテーブルに、お店の[**NFC.cool Business Card**](/business-card/)を載せたスタンドを置いています。スマホをかざすか、QRコードを読み取るとカードが開き、お客さんが探しそうなものがそろっています。どれもワンタップです。

- ポルトガル語と英語のメニュー
- WhatsApp
- Instagram、TikTok、Facebook
- Googleマップ
- GoogleクチコミのリンクとTripAdvisor
- それに、お店のSpotifyプレイリストまで

[お店のカード](https://mycard.nfc.cool/PianoNegro/Piano-Negro)は実際に開けるので、お客さんが見ている画面をそのまま確かめられます。お客さんの使い方も、まさに狙いどおりです。メニューを開き、Instagramでお店をチェックし、帰りにはクチコミを書く。それが全部、同じスタンドから始まります。

この仕組みでもうひとつ気に入っているのは、スタンドの情報が古くならないことです。タグとQRコードに入っているのはカードのリンクで、メニューそのものではありません。メニューが変わったらアプリでリンクを差し替えるだけで、すべてのテーブルに新しいメニューが行き渡ります。印刷し直す必要も、タグを書き直す必要もありません。

---

## 用意するもの

買い物リストは、拍子抜けするほど短くて済みます。

- **NFCタグ**。シンプルなNTAG213のステッカーで十分です。この記事で使うリンクなら、容量にかなり余裕を残して収まります。タグの種類がよくわからない場合は、[iPhoneで使えるNFCタグの種類を整理したガイド](/blog/nfc-tag-types-for-iphones/)で違いを説明しています。
- **透明なアクリルスタンド**。印刷したカードを差し込むタイプです。メニュースタンドやPOPスタンドとして売られていて、1つ数百円ほどで買えます。
- **カラープリンター**。
- [**NFC.cool Business Card**](/business-card/)。テーブル用のスタンドに使います。
- **NFC.cool Tools**。クチコミのリンク作りと、タグのパスワード保護に使います。[iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-google-review-nfc-stand-ja&mt=8)版と[Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-google-review-nfc-stand-ja)版があります。

---

## テーブル用スタンド：お店そのものをBusiness Cardに

「Business Card」という名前ですが、個人の名刺専用というわけではありません。氏名の欄は空けたまま、会社名とロゴだけを入れておけば、カードはお店のものとして表示されます。

<figure class="phone-figure" data-layout="stage">
<figcaption>テーブル用スタンドの準備</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/table-1-links-440w.webp" alt="NFC.cool Business Cardの編集画面。Menu、WhatsApp、Instagram、Google Maps、Google Reviewという名前の5つのリンク"><p><strong>リンク</strong>。どのリンクにも、お客さんがひと目でわかる名前を付けます。</p></li>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/table-2-write-tag-440w.webp" alt="NFC.cool Business Cardのカードのアクション一覧。Write to NFC TagやShow QR Codeなど"><p><strong>NFCタグに書き込む</strong>。カードのアクションから選び、スマホをステッカーにかざします。</p></li>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/table-3-qr-code-440w.webp" alt="NFC.cool Business CardのカードのQRコード。その下にShareとSave to Photos"><p><strong>QRコードを表示</strong>。「“写真”に保存」で、印刷するカード用の画像が手に入ります。</p></li>
</ol>
</figure>

### ステップ1：リンクを追加する

**リンク**の欄で**リンクを追加**をタップし、お客さんが探しそうなものを全部登録します。メニュー、WhatsApp、Instagramなど使っているSNS、Googleマップのお店の場所、そしてGoogleクチコミのリンク。メニューがPDFなら、リンクできるように、お店のWebサイトなどネット上のどこかに置いておく必要があります。

リンクにはそれぞれ、「メニュー」や「クチコミを書く」のように、お客さんがひと目でわかる名前を付けましょう。Piano Negroには言語ごとに1つずつ、2つのメニューのリンクがあるので、海外から来たお客さんも読めるメニューを開けます。

クチコミのリンクがまだなければ、NFC.cool Toolsの**グーグル・レビューリンク**で作れます。やり方は、このあとのレジ用スタンドのところで説明します。

### ステップ2：タグに書き込み、QRコードを保存する

カードのアクションを開いて**NFCタグに書き込む**を選び、スマホをステッカーにかざします。印刷用には**QRコードを表示**を選んで、**“写真”に保存**をタップ。これで、どんなデザインにも組み込める画像が手に入ります。

### ステップ3：印刷してテストする

スタンド用に、シンプルなカードをデザインします。ロゴと、「メニュー・Instagramなどはこちら」のような短い一文、QRコード、そして「またはスマホをここにかざしてください」と添えた小さなNFCマーク。印刷したらスタンドに差し込み、カードの裏側の、ちょうどマークの位置にタグを貼ります。アクリルや紙はNFCをまったく妨げないので、タグはその上からでも問題なく読み取れます。ただし金属はNFCを遮るので、近くに置かないでください。

テーブルに置く前に、何台か違うスマホで試しておきましょう。

---

## レジ用スタンド：クチコミのページへ直行

Piano Negroでは、テーブル用のスタンドだけで運用しています。でも、もし私がゼロからお店を立ち上げるなら、レジにもうひとつ、クチコミのリンクだけを入れたスタンドを置きます。会計の瞬間は、お客さんにとって来店の締めくくりです。体験の印象がまだ新しく、もう何かを待っているわけでもありません。かざせばすぐにクチコミの投稿フォームが開き、途中でメニューを経由することもありません。

<figure class="phone-figure" data-layout="stage">
<figcaption>クチコミのリンクを作る</figcaption>
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/cashier-1-search-440w.webp" alt="NFC.cool ToolsのGoogle Review Link画面。検索欄にPiano Negro Coimbraと入力され、結果はRua Borges CarneiroのPiano Negroの1件"><p><strong>検索</strong>。お店の名前を入力して、結果から選びます。</p></li>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/cashier-2-selected-440w.webp" alt="選択したお店としてPiano Negroが表示され、その下にPreview on Google MapsとPreview the review page"><p><strong>プレビュー</strong>。保存する前に、正しいお店かどうか確かめます。</p></li>
</ol>
</figure>

### ステップ1：クチコミのリンクを作る

NFC.cool Toolsを開き、新しいNFCメッセージの作成から**グーグル・レビューリンク**を選びます。お店の名前を入力し、結果から選んでください。候補ごとに住所が表示されるので、近所に似た名前のお店がいくつかあっても見分けられます。

Googleマップをすでに開いているなら、もっと早い方法があります。マップでお店を表示して**共有**をタップし、そのままNFC.coolに共有するか、リンクをコピーして貼り付けるだけ。マップのリンクから、アプリがお店を読み取ってくれます。

保存する前に、**レビューページをプレビュー**をタップしてください。お客さんが実際に目にするページがそのまま開くので、正しいお店かどうか確認できます。当たり前に聞こえるかもしれませんが、通りを2本隔てたところに同じ名前のカフェがある例を見たことがあります。ライバル店のクチコミ集めを手伝うことになるのは、絶対に避けたいところです。

お店がまったく出てこない場合は、おそらくまだGoogleビジネスプロフィールがありません。同じ画面に、作成方法を説明したGoogleのガイドへのリンクがあります。

### ステップ2：タグに書き込む

リンクを保存したら、スマホをNFCステッカーに近づけて書き込みます。タグに書き込むのが初めてなら、[iPhoneでNFCタグに書き込む方法](/blog/write-nfc-tags-iphone/)で手順を説明しています。

### ステップ3：QRコードを作る

全員がスマホをかざしてくれるとは限りません。自分のスマホにその機能があることを知らない人もいますし、AndroidではNFCがオフになっていることもあります。そんなときの保険がQRコードです。

アプリのQRコードのセクションで、同じ**グーグル・レビューリンク**を選んでQRコードを作ります。そこから画像として共有することもできますし、先に**QRコードスタジオ**で開いてお店の色に合わせ、カードのほかの部分となじませることもできます。あとは「ご来店ありがとうございます！Googleクチコミでご感想をお聞かせください」のような一文を添えてカードを印刷し、裏にタグを貼ってスタンドに差し込めば完成です。

---

## すべてのタグにパスワードをかける

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/google-review-nfc-stand/password-440w.webp" alt="NFC.cool ToolsのPassword Protection画面。Activate PasswordとDeactivate Password"><p><strong>パスワード保護</strong>。NFC.cool Toolsの機能で、NTAG 2xxのタグに使えます。</p></li>
</ol>
</figure>

スタンドは、誰でも手の届く場所に置かれます。テーブルでもレジでも同じです。保護していなければ、NFCアプリを持っている人なら誰でも、通りすがりにタグを別の内容に書き換えられます。しかも、お客さんに指摘されるまで気づかないかもしれません。

タグを完全にロックしてしまう手もありますが、私ならパスワードで保護します。NFC.cool Toolsで**パスワード保護**を開き、**パスワードを有効にする**を選んでパスワードを入力し、スマホをタグにかざします。お客さんはこれまでどおり読み取れて、パスワードが必要なのは書き込むときだけです。しかもロックと違って、元に戻せます。お店が移転したときや、タグのリンク先を変えたくなったときは、パスワードを無効にしてから書き直せばいいのです。パスワードで守られるのは中身ではなくタグそのものなので、Business Card用のタグにも使えます。対応しているのはNTAG 2xxのタグで、買い物リストに挙げたNTAG213のステッカーなら問題ありません。

**後で保存する**をオンにしておくと、アプリがパスワードを覚えておいてくれます。パスワードがわからなくなると、そのタグはもう書き換えられません。

---

## 正直なクチコミを、すべてのお客さんに

ひとつ気をつけてほしいことがあります。クチコミのお願いは、一部のお客さんではなく、すべてのお客さんにしてください。そしてお願いするのは星5つではなく、良くも悪くも正直な感想です。Googleのクチコミに関するポリシーでは、満足していそうなお客さんにだけ依頼することも、ドリンク1杯無料や割引のように、クチコミと引き換えに何かを提供することも認められていません。ルールを破ると、クチコミが削除されたり、それ以上の措置を受けたりすることもあります。それに正直なところ、次のお客さんの目には、怪しいほど完璧なクチコミがずらりと並んでいるより、本物のクチコミが入り混じっているほうがずっと信頼できるものに映ります。

---

## まとめ

Googleクチコミスタンドは、一見すると製品のようでいて、実はステッカーに書き込んだリンクにすぎないもののひとつです。そして、どうせすべてのテーブルにステッカーを置くのなら、メニューもSNSもクチコミのリンクも、まとめて載せてしまえばいいのです。

テーブル用のスタンドに必要なのはNFC.cool Business Cardで、[iPhone](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-google-review-nfc-stand-ja&mt=8)版と[Android](https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-google-review-nfc-stand-ja)版があります。グーグル・レビューリンクとパスワード保護はNFC.cool Toolsの機能で、こちらも[iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-google-review-nfc-stand-ja&mt=8)版と[Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-google-review-nfc-stand-ja)版があります。自分のお店用に作ったら、ぜひ写真を見せてください。
