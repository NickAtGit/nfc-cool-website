---
id: "app-clip-lessons-2026-01"
title: "Concevoir une bonne expérience App Clip : les leçons de NFC.cool Business Card"
date: "2026-01-23"
tags: ["business-cards", "networking", "iphone"]
summary: "Retour sur ma conférence au mDevCamp 2025 à Prague, consacrée à l'architecture derrière le parcours App Clip de NFC.cool Business Card."
metaDescription: "Les leçons tirées de la création de l'App Clip de NFC.cool Business Card - architecture, limites de taille et enregistrement d'un contact en un geste, d'après ma conférence au mDevCamp 2025 à Prague."
author: "Nicolo Stanciu"
image: "/assets/images/Blog/app-clip-mdevcamp.webp"
imageAlt: "En conférence au mDevCamp 2025 à Prague"
---

En 2025, j'ai donné ma toute première conférence, et j'ai choisi un sujet dans lequel je baignais depuis des années sans avoir jamais eu à l'expliquer à une salle : comment l'App Clip derrière NFC.cool Business Card fonctionne réellement. La conférence avait lieu au mDevCamp 2025 à Prague, et je lui ai donné le même titre que cet article.

Si vous n'en avez jamais croisé, un App Clip est cette petite partie d'une app iOS qui s'ouvre instantanément lorsqu'on approche un tag NFC ou qu'on scanne un QR code - sans App Store, sans installation. C'est ce qui permet à quelqu'un de voir votre carte de visite NFC.cool environ une seconde après avoir approché les téléphones l'un de l'autre, sans rien télécharger. Rendre cela instantané, tout en gardant les données de la carte partagée sécurisées et sans forcer qui que ce soit à créer un compte, demande plus de choix d'architecture qu'il n'y paraît de l'extérieur. La conférence les passait en revue : comment l'App Clip est structuré, où SwiftUI trouve toute sa place, et comment le backend gère les données de la carte.

L'expliquer sur une scène m'a fait du bien. Ça m'a obligé à justifier des choix que j'avais surtout faits à l'instinct, et les questions posées ensuite - par des développeurs iOS qui avaient de toute évidence mené les mêmes batailles - étaient plus pointues que n'importe quelle revue de code. L'approche pour laquelle j'avais opté, des App Clips avec SwiftUI et une API backend sécurisée, a tenu bon face à cet examen, et deux ou trois suggestions issues des conversations de couloir ont déjà été intégrées à l'app.

Vous pouvez regarder la conférence complète sur [Slideslive](https://slideslive.com/39043369/building-a-great-app-clip-experience-lessons-from-nfccool-business-card).
