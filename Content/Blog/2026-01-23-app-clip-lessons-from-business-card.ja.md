---
id: "app-clip-lessons-2026-01"
title: "優れたApp Clip体験を作る：NFC.cool Business Cardから学んだこと"
date: "2026-01-23"
tags: ["business-cards", "networking", "iphone"]
summary: "プラハで開催されたmDevCamp 2025での私の講演の振り返り。NFC.cool Business CardのApp Clipフローを支えるアーキテクチャについて。"
metaDescription: "NFC.cool Business CardのApp Clipを作って得た学び - アーキテクチャ、サイズ制限、ワンタップでの連絡先保存を、プラハでのmDevCamp 2025の講演から振り返ります。"
author: "Nicolo Stanciu"
image: "/assets/images/Blog/app-clip-mdevcamp.webp"
imageAlt: "プラハのmDevCamp 2025での登壇"
---

2025年、私は初めてのカンファレンス登壇をしました。テーマには、何年もその中で過ごしてきたものの、これまで一度も人前で説明する必要のなかったものを選びました。NFC.cool Business Cardを支えるApp Clipが実際にどう動いているか、という話です。講演はプラハのmDevCamp 2025で行い、この記事と同じタイトルを付けました。

App Clipにまだ出会ったことがない方のために説明すると、App Clipとは、NFCのタップやQRスキャンから瞬時に開くiOSアプリの小さな一部分です。App Storeも不要、インストールも不要。これがあるおかげで、相手にスマートフォンをかざしてから1秒ほどで、何もダウンロードすることなく、あなたのNFC.coolの名刺を見てもらえます。それを本当に瞬時だと感じさせつつ、共有された名刺のデータを安全に保ち、誰にも登録を強いない。これを実現するには、外から見える以上に多くのアーキテクチャ上の判断が必要になります。講演では、それらを順を追って説明しました。App Clipがどう構築されているか、SwiftUIがどこでその価値を発揮するか、そしてバックエンドが名刺データをどう扱うか、という内容です。

ステージの上から説明することは、私にとって良い経験になりました。ほとんど直感で下していた選択を、自分で正当化する必要に迫られたからです。そして登壇後の質問は - 明らかに同じ苦労を経験してきたiOS開発者たちからのものでした - どんなコードレビューよりも鋭いものでした。私が落ち着いたかたち、つまりSwiftUIと安全なバックエンドAPIを組み合わせたApp Clipは、その厳しい目にも耐えました。さらに、廊下での会話で出たいくつかの提案は、すでにアプリに反映されています。

講演の全編は[Slideslive](https://slideslive.com/39043369/building-a-great-app-clip-experience-lessons-from-nfccool-business-card)からご覧いただけます。
