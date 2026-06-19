---
id: "app-clip-lessons-2026-01"
title: "Ein starkes App-Clip-Erlebnis bauen: Erkenntnisse aus NFC.cool Business Card"
date: "2026-01-23"
tags: ["business-cards", "networking", "iphone"]
summary: "Rückblick auf meinen Talk vom mDevCamp 2025 in Prag über die Architektur hinter dem App-Clip-Flow von NFC.cool Business Card."
metaDescription: "Lektionen aus dem Bau des App Clips von NFC.cool Business Card - Architektur, Größenlimits und Kontakt-Speichern per Tap, aus meinem mDevCamp-2025-Vortrag in Prag."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/app-clip-mdevcamp.webp"
imageAlt: "Vortrag auf dem mDevCamp 2025 in Prag"
---

2025 habe ich meinen ersten Konferenzvortrag gehalten, und ich habe mir ein Thema ausgesucht, in dem ich seit Jahren stecke, das ich aber noch nie vor einem Raum voller Leute erklären musste: wie der App Clip hinter NFC.cool Business Card tatsächlich funktioniert. Der Talk fand auf dem mDevCamp 2025 in Prag statt, und ich habe ihm denselben Titel gegeben wie diesem Beitrag.

Falls dir noch keiner begegnet ist: Ein App Clip ist der kleine Teil einer iOS-App, der sich sofort über einen NFC-Tap oder einen QR-Scan öffnet - kein App Store, keine Installation. Das ist es, was jemandem deine NFC.cool-Visitenkarte etwa eine Sekunde nach dem Aneinanderhalten der Handys zeigt, ohne dass irgendetwas heruntergeladen werden muss. Das wirklich sofort wirken zu lassen, und dabei die Daten geteilter Karten trotzdem sicher zu halten und niemanden zur Registrierung zu zwingen, braucht mehr architektonische Entscheidungen, als es von außen aussieht. Der Talk ist sie durchgegangen: wie der App Clip aufgebaut ist, wo SwiftUI seinen Platz verdient, und wie das Backend mit den Kartendaten umgeht.

Es von einer Bühne aus zu erklären, war gut für mich. Es hat mich dazu gebracht, Entscheidungen zu rechtfertigen, die ich größtenteils aus dem Bauch heraus getroffen hatte, und die Fragen danach - von iOS-Entwicklerinnen und Entwicklern, die offensichtlich dieselben Kämpfe ausgefochten hatten - waren schärfer als jedes Code-Review. Die Form, auf die ich mich festgelegt hatte, App Clips mit SwiftUI und einem sicheren Backend-API, hat dieser Prüfung standgehalten, und ein paar Anregungen aus den Gesprächen auf dem Flur haben es bereits in die App geschafft.

Den vollständigen Vortrag kannst du auf [Slideslive](https://slideslive.com/39043369/building-a-great-app-clip-experience-lessons-from-nfccool-business-card) ansehen.
