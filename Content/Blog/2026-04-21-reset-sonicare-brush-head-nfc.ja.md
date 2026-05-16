---
id: nfc-blog-015
title: "Philips SonicareブラシヘッドのカウンターをNFCで確認・リセットする方法"
date: 2026-04-21
tags: [nfc-tech, sonicare, guides]
summary: "Sonicareの電動歯ブラシは、すべてのブラシヘッドの中にNFCチップを内蔵し、交換購入を促すまでカウントダウンしています。実際に何を記録しているのか、そしてNFC.cool Toolsで使用状況を確認してカウンターをリセットする方法を解説します。"
image: "/assets/images/Blog/reset-sonicare-brush-head-nfc.webp"
imageAlt: "スマートフォンでリセットされる電動歯ブラシヘッドのNFCタグ"
metaTitle: "Philips Sonicareブラシヘッドのカウンター確認・NFCリセット方法（2026年）"
metaDescription: "SonicareブラシヘッドのNFCチップは、あなたが歯磨きをした時間を記録しています。残りの寿命を確認し、NFC.cool Toolsでカウンターをリセットする方法をご紹介。"
ogTitle: "Sonicareブラシヘッドのカウンターを確認・リセットする方法"
ogDescription: "すべてのSonicareブラシヘッドにはNFCチップが入っており、交換時期までカウントダウンしています。使用状況を見て、必要ならタイマーをリセットしましょう。"
---

あなたの電動歯ブラシは、あなたを監視している。

不気味なサーベイランスの話ではない。「あなたを買い替えに駆り立てるために、ブラシヘッドに小さなNFCチップを仕込んだ」という話だ。Philips Sonicareの交換用ヘッドにはすべて、プラスチックの中にNTAG213が埋め込まれており、あなたが歯磨きをした時間を記録し、3か月経ったとハンドル側が判断すると警告ランプを点滅させるよう指示する。

ようこそ、Internet of Shitへ。

実のところ、3か月というのは推奨であって医学的な事実ではない。毛先の摩耗は、磨く強さ、使う歯磨き粉、頻度によって変わる。チップは毛先の状態を測っていない。ただ秒数を数えているだけだ。優しく磨き、マイルドな歯磨き粉を使う人なら、3か月経っても毛先は十分きれいかもしれない。タイマーはそれを知らないし、気にもしない。

NFC.cool Toolsは今、そのチップを読み取り、あなたのブラシヘッドがどれだけの寿命を使ったかを正確に表示し、毛先がまだ大丈夫だと判断したらタイマーをリセットできる。仕組みはこうだ。

---

## チップに実際に記録されているもの

Cyrill Künzi氏が[プロトコルを解析](https://kuenzi.dev/toothbrush/)し、mbirth氏が[全バイトをマッピング](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html)した。あなたのブラシヘッドのNTAG213が保持している情報は次の通り：

- **ブラシヘッドのタイプとカラー** --ページ`0x1F`の1バイトで、モデル（Premium All-in-One、Gum Care、DiamondCleanなど）とカラーを識別する（[mbirth氏のメモリマップ](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html)には22の既知タイプが掲載されている）
- **目標寿命** --`0x21`に、通常は`0x5460` = 21,600秒。これは2分間の磨きセッション180回分、つまり1日2回使用で3か月分
- **製造コード** --`0x21-0x23`に、製造日とラインがASCIIで記録される。例：`241206 31K`（2024年12月6日、ライン31Kで製造）。柄にも印字されている
- **累積磨き時間** --ページ`0x24`の最初の2バイトに、ヘッドが使われた合計秒数が16ビット値として保存される。`0xFFFF`（65,535秒、約18時間連続磨き）に達するとカウンターは停止する。新品のヘッドは`00:00:02:00`から始まる --最初の2バイトはゼロ（未使用）で、後の2バイトの意味は現在不明
- **最後の強度とモード** --同じく`0x24`に：Low/Med/HighとClean/White+/Gum Health/Deep Clean+
- **URL** --`philips.com/nfcbrushheadtap`を指しており、汎用NFCリーダーでヘッドをタップすると開く

累積時間が目標（21,600秒）を超えると、ハンドルの黄色いLEDが点滅する。それは毛先ではなく、チップが喋っているのだ。

---

## リセットしたくなる理由

3か月の交換間隔はPhilipsの推奨であって、毛先の摩耗の科学的測定ではない。チップは秒を数えるのであって、毛先のほつれを数えるわけではない。カウントダウンタイマーに従うのではなく、自分の毛先を見て自分で判断したい--そう思うなら、カウンターのリセットがそれを可能にする。

複数のヘッド（旅行用と自宅用など）をローテーションして自分で管理したい場合にもリセットは役立つ。

---

## パスワードの仕組み

NTAG213はパスワード保護されている。すべてのブラシヘッドにはユニークな4バイトのパスワードがある。歯ブラシのハンドルは、タグに書き込むたびにそのパスワードで認証する。

パスワードは2つの入力から計算される：タグの7バイトUIDと、タグに保存されている（そして柄に印字されている）製造コードだ。[Aaron Christophel氏](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56)が、Cyrill Künzi氏が当初ソフトウェア無線でパスワード送信をスニッフィングした後に、Sonicareのファームウェアからアルゴリズムをリバースエンジニアリングした。

⚠️ **重要：** NTAG213は**パスワード認証に3回失敗すると永久にロックされる**。チップは永続的に読み取り専用になり--歯ブラシ自身でさえ書き込めなくなる。推測で試さないこと。

---

## NFC.cool Toolsで確認・リセットする方法

アプリでの見え方はこうです：

<figure class="sk-phone-screenshot">
  <img src="/assets/images/Blog/sonicare-reset-screen.webp" alt="NFC.cool ToolsでSonicareブラシヘッドが80%使用済みと表示され、Reset Timerボタンが見える画面" />
</figure>

NFC.cool Toolsはプロセス全体を担います：タグの読み取り、パスワードの計算、統計の表示。16進コマンドも、Web計算機も、SDRも不要です。

1. iPhoneで**NFC.cool Tools**を開く
2. **Toothbrush Head Reset**を選択
3. **Read NFC**をタップし、ブラシヘッドをスマホに当てる
4. アプリが**パーセンテージゲージ**でヘッドの使用済み寿命を表示し、その下に使用済み時間と残り時間を表示
5. **Reset Timer**をタップして使用カウンターをゼロに戻すか、別のヘッドをスキャン

[iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-ja&mt=8)で今すぐ利用可能。[Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-ja)版は今後のアップデートで対応予定です。

---

## リセットが実際にやっていること

リセットすると、ページ`0x24`に`00:00:02:00`を書き込んでいます--新品のブラシヘッドが出荷時に持っているのと同じ値です。最初の2バイト（使用カウンター）だけがゼロに戻されます。後の2バイトの意味は不明なので、アプリはそのまま保持します。

歯ブラシはまたゼロから数え始め、黄色いランプはさらに3か月後に戻ってきます。そのときに毛先を見て、自分で判断すればいいのです。

---

## より大きな視点：日常品の中のNFC

次の購入までカウントダウンするNFCチップ入りの歯ブラシヘッドは、まさにInternet of Shitの極致だ。私たちNFC.coolはNFCを愛しているが、使い捨てプラスチックの中に、買い替えを促すためだけに埋め込むのは……一つの選択ではある。

同じNTAG213チップは、消費者にとって本当に役立つことにも使われている：商品認証、アクセス制御、そしてまもなくEU Digital Product Passport。これは消費者製品にNFCタグを義務付け、購入するものとその出所を確認できるようにするものだ。これはNFCがあなたの*ために*使われている例で、あなたに対して使われているのではない。

NFC.cool Toolsはこれらすべてを読み書きできる。Sonicare機能はその一例で、身の回りのタグに何が入っているかを理解し、その情報をどう扱うかを自分で決めるためのものだ。

---

## さらに読む

- [Cyrill Künzi氏のオリジナルのリバースエンジニアリング解説](https://kuenzi.dev/toothbrush/) --SDRスニッフィング、パスワード抽出、Sonicare NFCプロトコルの最初の詳細分析
- [Aaron Christophel氏のパスワードジェネレーター](https://gist.github.com/atc1441/41af75048e4c22af1f5f0d4c1d94bb56) --Sonicareファームウェアから抽出されたアルゴリズム
- [mbirth氏のNTAG213メモリマップ](https://blog.mbirth.uk/2026/03/29/sonicare-brush-head-nfc-data.html) --チップ上の各バイトの詳細なドキュメント

*Sonicareのブラシヘッドを確認したい方は？ [iPhone版NFC.cool Toolsをダウンロード](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-reset-sonicare-brush-head-nfc-ja&mt=8)、または[Android](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-reset-sonicare-brush-head-nfc-ja)（Android版のSonicareリセットは近日対応）して、あなたの歯ブラシが何を記録していたのか確認してみてください。*
