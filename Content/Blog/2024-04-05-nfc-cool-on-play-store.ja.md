---
id: nfc-blog-023
title: "NFC.coolがPlayストアに登場"
date: 2024-04-05
tags: [announcements, android, nfc-tools, business-card]
summary: "NFC.cool ToolsがGoogle Playで公開されました。NFCスキャン、タグの書き込み、同梱のNFC.cool Business Card - Androidでも、Android互換ハードウェアを共有する部分はiOSアプリと同じ機能セット。"
metaTitle: "NFC.cool Tools - Google Playで公開"
metaDescription: "NFC.cool ToolsがAndroidで利用可能に。NFCスキャン、タグの書き込み、同梱のNFC.cool Business Card - 同じブランド、同じ機能セット、Androidで。"
ogTitle: "NFC.coolがPlayストアに登場"
ogDescription: "NFC.cool ToolsがGoogle Playで公開 - NFCスキャン、タグの書き込み、同梱のNFC.cool Business Card。"
image: "/assets/images/Blog/nfc-cool-on-play-store.webp"
---
**NFC.cool Tools**が[Google Playストア](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dblog-play-store-launch)で利用可能になりました。iOSで数年を経て、Android版がライブです - そしてNFC.cool Business Cardが内蔵されています。

## Android版に入っているもの

Android版は両プラットフォームで共有されるコアNFC機能に集中しています。

- **NFCタグの読み取り。** NDEF形式のあらゆるタグ、あらゆるレコードタイプ - URL、vCard、Wi-Fi、プレーンテキスト、カスタムMIME。
- **NFCタグの書き込み。** あらゆるレコードタイプを構成し、空のタグに書き込み。タグを公共の場所に設置するなら書き込み後にロック。
- **NFC.cool Business Card（内蔵）。** Android版は名刺フローをアプリ内の機能として含みます - 名刺を作成し、タグに書き込み、ワンタップで共有。iOSの受信者はApp Clipを見て、Androidの受信者はnfc.coolドメインのウェブページを開きます。

## iOS専用のもの（今のところ）

NFC.cool Toolsのいくつかの機能はAndroidに対応物のないAppleハードウェアに依存しています - 3DスキャンとRoom ScanのためのLiDARセンサー、ドキュメントスキャンのためのVisionフレームワーク、カメラアプリの背後にあるシステムQRスキャナー。これらはiOS専用のままです。

ただしNFCの読み取り・書き込み面は同一です。iPhoneでタグでできることはAndroidでも全部できます。

## なぜ待ったか

AndroidはiPhoneより長く、2012年からNFCをサポートしてきました。なのになぜAndroidアプリにこれだけ時間がかかったのか？

正直な答え：NFC.cool Business Cardフローがクロスプラットフォームで動くようにしてからAndroidをローンチしたかったのです。それはiOSユーザーとAndroidユーザーが、相手がどちらのスマホを持っているか気にせず名刺を交換できるよう、App Clip + Webフォールバックを設計する必要があったということ。それが動くようになって初めて、Androidが現実的なローンチ候補になりました。

## 入手先

- **Android：** [Google Play](https://play.google.com/store/apps/details?id=cool.nfc&referrer=utm_source%3Dblog-play-store-launch)
- **iOS：** [App Store](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=BlogPlayStoreLaunch&mt=8)

同じブランド。ハードウェアを共有する部分は同じ機能セット。今後の計画：NFC関連はすべて両プラットフォーム同時進行で。
