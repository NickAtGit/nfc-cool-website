---
id: "app-clip-lessons-2026-01"
title: "Einen richtig guten App Clip bauen: Was ich bei NFC.cool Business Card gelernt habe"
date: "2026-01-23"
tags: ["business-cards", "networking", "iphone"]
summary: "Rückblick auf meinen Vortrag beim mDevCamp 2025 in Prag über die Architektur hinter dem App Clip von NFC.cool Business Card."
metaDescription: "Was ich beim App Clip von NFC.cool Business Card gelernt habe: Architektur, Größenlimits, Kontakt speichern per Fingertipp. Mein Vortrag vom mDevCamp 2025 in Prag."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/app-clip-mdevcamp.webp"
imageAlt: "Auf der Bühne beim mDevCamp 2025 in Prag"
---

2025 habe ich meinen ersten Konferenzvortrag gehalten. Als Thema habe ich mir etwas ausgesucht, in dem ich seit Jahren drinstecke, das ich aber noch nie vor einem vollen Raum erklären musste: wie der App Clip hinter NFC.cool Business Card eigentlich funktioniert. Gehalten habe ich den Vortrag beim mDevCamp 2025 in Prag, und er trug denselben Titel wie dieser Beitrag.

Falls dir der Begriff nichts sagt: Ein App Clip ist ein kleiner Ausschnitt einer iOS-App, der sich sofort öffnet, sobald man das Handy an einen NFC-Tag hält oder einen QR-Code scannt - ohne App Store, ohne Installation. Genau deshalb sieht dein Gegenüber deine NFC.cool-Visitenkarte etwa eine Sekunde, nachdem ihr die Handys aneinandergehalten habt, und muss dafür nichts herunterladen. Damit sich das wirklich sofort anfühlt, die Daten geteilter Karten trotzdem geschützt bleiben und sich niemand registrieren muss, braucht es mehr Architekturentscheidungen, als man von außen vermuten würde. Im Vortrag bin ich sie der Reihe nach durchgegangen: wie der App Clip aufgebaut ist, wo sich SwiftUI wirklich lohnt und wie das Backend mit den Kartendaten umgeht.

Das Ganze von einer Bühne aus zu erklären, hat mir gutgetan. Ich musste Entscheidungen begründen, die ich größtenteils aus dem Bauch heraus getroffen hatte, und die Fragen danach waren härter als jedes Code-Review - sie kamen von iOS-Entwicklerinnen und -Entwicklern, die sich offensichtlich schon mit denselben Problemen herumgeschlagen hatten. Der Ansatz, für den ich mich entschieden hatte, App Clips mit SwiftUI und einer abgesicherten Backend-API, hat dieser Prüfung standgehalten, und ein paar Vorschläge aus den Flurgesprächen stecken inzwischen schon in der App.

Den kompletten Vortrag kannst du dir auf [Slideslive](https://slideslive.com/39043369/building-a-great-app-clip-experience-lessons-from-nfccool-business-card) ansehen.
