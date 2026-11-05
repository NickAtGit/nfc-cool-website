---
id: nfc-blog-028
title: "出会った人を覚えられない。だから名刺アプリにこの機能を入れた。"
date: 2025-01-23
lastModified: "2026-11-05"
tags: ["business-cards", "networking", "iphone"]
summary: "十分な数のカンファレンスとネットワーキングイベントを経て、デジタル名刺は間違った問題を解いていたと気づきました。紙は救えても、コンテクストは救えない。だからNFC.cool Business CardにSmart Contextレイヤーを追加しました - どこで会ったか、何に取り組んでいるか、何をフォローアップすべきか。"
metaTitle: "Smart Context：デジタル名刺の記憶アップグレード"
metaDescription: "デジタル名刺は紙の問題を解決しますが、人を忘れる問題は解決しません。NFC.cool Business Cardのネットワーキングタブなら、どこで、いつ、なぜ出会ったのかを連絡先ごとに残せます。リマインダーや予定の追加もその場でできます。"
ogTitle: "出会った人を覚えられない。だから名刺アプリにこの機能を入れた。"
ogDescription: "デジタル名刺になぜ連絡先情報以上が必要だったのか - そしてそれを解決するSmart Contextレイヤー。"
image: "/assets/images/Blog/smart-context-remember-everyone.webp"
---
何年もデジタル名刺ソフトウェアを作ってきて、ずっと気になっていた問題がありました：私たちは間違った半分を解いていたのです。

紙の名刺の問題は実在します - 名刺は古びる、財布を埋める、紛失する、更新できない。デジタル名刺はそれを解決しました。しかし、実際のネットワーキング問題は解決していませんでした。それはずっとシンプルです：

> カンファレンスで50人と会い、20人と情報交換し、3週間後には1つの会話も思い出せない。

連絡先がスマホにあっても、その人がなぜアドレス帳にいるのか思い出せなければ無意味です。

---

## 欠けている部分はコンテクスト

<figure class="phone-figure" data-layout="float">
<ol>
<li><img src="/assets/images/Blog/screens/smart-context-remember-everyone/1-networking-440w.webp" alt="NFC.cool Business CardのNetworkingタブ。Bay Area Product SummitのPriya Raman、Design Systems MeetupのTom Alvarez、NFC Developer DayのHanna Vogel"><p><strong>どこで会ったか。</strong>連絡先ごとにイベントと日付が残ります。</p></li>
<li><img src="/assets/images/Blog/screens/smart-context-remember-everyone/2-context-440w.webp" alt="ネットワーキングの連絡先、Lantern MetricsのPriya Raman。Add Reminder、Add Meeting、ミーティングの詳細"><p><strong>次にやること。</strong>会話の記憶が新しいうちに、リマインダーや予定をカレンダーへ。</p></li>
</ol>
</figure>

そこで、私が「メモリーアップグレード」と呼ぶものをNFC.cool Business Cardに追加しました。iPhoneのネットワーキングタブです。連絡先から誰かを選べば、覚えておきたいことを書き留められます：

- **いつ、どこで会ったか**。日付、イベント、場所、紹介してくれた人。
- **相手が取り組んでいること**。現在のプロジェクト、専門分野、一緒に仕事ができそうな領域。
- **会話のハイライト**。実際に話したうち、覚えておきたい1〜2つのことと、共通の関心事。
- **フォローアップ計画**。「VCへのイントロを送ってくれる」「月曜にデッキを送る」。

最後の項目はカレンダーとリマインダーにつながっています。私たちは皆フォロースルーが苦手で、誰でも一押しが必要だからです。連絡先の画面には、「リマインダーを追加する」と「ミーティングを追加する」がそのまま並んでいます。

---

## 会話の直後に書き留める理由

コツは、会話がまだ頭に新鮮なうちに書き留めることです。5分後には次の人へ移っています。3日後にはAIファウンダーがオースティンのピッチ大会の人だったかベルリンのハッカソンの人だったかわかりません。

だから私は連絡先を保存したらネットワーキングタブを開き、次の人のところへ歩いていく前にコンテクストを追加します。来週になって記憶を頼りに追加する、というやり方は、実際にはまず実行されません。

---

## 自分にとって何が変わったか

数イベントでのベータテスト中、体験は「これらの名刺がスマホにある」から「人、彼らの仕事、自分が彼らに何を約束したかのクエリ可能なグラフを持っている」に変わりました。

NFC.cool Business Cardのネットワーキングタブを開くと見えます：誰とどこで会ったか、何を話したか、フォローアップすると言ったか、まだオープンなものは何か。再会後はエントリーを更新します - 新しい会話、新しいコンテクスト。名刺は関係性の生きた記録になり、連絡先のスナップショットではなくなります。

---

## どんな出会い方でも使える

ネットワーキングタブはスマホの連絡先を起点にするので、相手がどうやってアドレス帳に入ったかは関係ありません。相手のカードをタップした場合でも、騒がしいカンファレンスでQRコードをスキャンした場合でも、紙の名刺を自分で入力した場合でも同じです。

FreeとPersonalはカード1枚、Proは最大10枚（異なる役割、異なるイベント、異なるバージョンのあなた）、チームは1人あたり最大10枚です。コンテクストは連絡先に紐づくので、どのカードを共有した場合でも残ります。

---

## なぜ今これが重要か

5年前にこれが存在しなかった理由は技術ではなく、摩擦でした。コンテクストの記録は別のメモアプリを取り出し、相手が見ている前で入力し、後でなんとか連絡先と紐づけるという作業でした。ほとんどの人が諦めました。

[NFC.cool Business Card](/ja/business-card/)なら、メモは連絡先のすぐ隣、自分のカードと同じアプリの中にあります。「これを覚えておかなくては」と「これは今、記憶された」の違いです。

これまで以上に速く連絡先を交換する世界で、本当に重要なデータは「誰を知っているか」ではなく「なぜ知っているか」です。

[iPhone向けNFC.cool Business Cardをダウンロード](https://apps.apple.com/app/apple-store/id6502926572?pt=106913804&ct=blog-smart-context-remember-everyone-ja&mt=8)すれば、ネットワーキングタブを使えます。Androidユーザーは同じ名刺を[Android向けNFC.cool Business Card](https://play.google.com/store/apps/details?id=cool.nfc.businesscard&referrer=utm_source%3Dnfc.cool%26utm_medium%3Dblog%26utm_campaign%3Dblog-smart-context-remember-everyone-ja)で利用できます。
