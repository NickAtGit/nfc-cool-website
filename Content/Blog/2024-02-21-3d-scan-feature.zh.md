---
id: nfc-blog-025
title: "在 iPhone 上做 3D 扫描：摄影测量与 LiDAR 在你口袋里能做什么"
date: 2024-02-21
tags: ["guides", "iphone"]
summary: "NFC.cool Tools 借助 Apple 的 Object Capture API，把你的 iPhone 变成一台 3D 扫描仪。摄影测量加上 LiDAR，能生成可导出为 .stl、.obj、.usdz 的模型，随时可用于 3D 打印、AR，或任何建模流程。"
metaTitle: "用 NFC.cool Tools 在 iPhone 上做 3D 扫描"
metaDescription: "NFC.cool Tools 的 3D 扫描功能如何运作：摄影测量、LiDAR，以及 Apple 的 Object Capture API。可导出 .stl、.obj、.ply、.usdz，用于 3D 打印和 AR。"
ogTitle: "在 iPhone 上做 3D 扫描：摄影测量与 LiDAR 在你口袋里能做什么"
ogDescription: "NFC.cool Tools 的 3D 扫描功能如何运作：摄影测量、LiDAR，以及导出为 .stl、.obj、.usdz。"
image: "/assets/images/Blog/3d-scan-feature.webp"
---
几年前，3D 扫描意味着一台微波炉大小的专用扫描仪，外加一套比硬件还贵的软件。今天，一部带 LiDAR 传感器的 iPhone 配上 Apple 的 Object Capture API，就能用寥寥几张照片生成一个可用的 3D 模型。

NFC.cool Tools 的 **3D Scan** 功能，把这整套流程封装成了可随身携带的工作流。

---

## 背后到底发生了什么

两项技术协同工作：

- **摄影测量** ：App 会从不同角度对物体拍摄数十张照片。摄影测量引擎（iOS 上是 Apple 的 Object Capture API）在这些照片之间找出匹配的特征点，再三角化成一个 3D 网格。
- **LiDAR** ：在带 LiDAR 传感器的 iPhone 上（iPhone 12 及之后的 Pro 机型），每一帧都会附带传感器测得的深度数据。这能从两方面大幅改善网格：尺寸更准确（模型即真实世界的大小），而那些缺乏明显视觉特征的表面（一面纯白的墙、一道光滑的弧面）也能得到可用的几何形状，单靠摄影测量在这些地方往往会失败。

这两步你都不必操心，App 会引导你完成拍摄，然后在设备本地完成重建。

---

## 如何拍出一份好扫描

几条实用的规则：

- **绕着物体慢慢移动。** App 期望覆盖大致连续。别从一侧直接跳到对面，要绕着走。
- **让物体保持在取景框内。** 物体四周留一圈一致的边距没问题；如果在边缘把它裁掉，就会丢失数据。
- **光照均匀。** 强烈的阴影会扰乱摄影测量阶段。散射光（开阔的天空、柔光箱、室内的日光）能得到最干净的网格。
- **有纹理的物体比无特征的物体更好扫。** 一只带花纹的马克杯几乎能扫得完美。一颗抛光的金属球则确实很难。LiDAR 对后者有帮助，但救不全。
- **在每个角度停顿片刻。** 运动模糊会吞掉细节。

完整一次扫描，需要 20 到 40 秒的环绕走动，再加上 30 到 60 秒的处理时间。

---

## 导出格式

NFC.cool Tools 可以导出你后续真正需要的格式：

- **.stl** ：3D 打印机。Bambu Studio、Cura、PrusaSlicer 这类切片软件都支持。
- **.obj** ：通用 3D 格式。可导入 Blender、Cinema 4D、Unity、Unreal，基本上每一款建模工具都行。
- **.ply** ：保留顶点颜色的网格格式，当纹理比 UV 映射材质更重要时很有用。
- **.usdz** ：Apple 的 AR 格式。可放进 Quick Look、AR Quick Look，或在 RealityKit 中使用。
- **.abc**（Alembic）：动画流程。
- **.usd** ：通用场景描述（Universal Scene Description），大多数现代 DCC 工具都支持。

模型都是同一个，格式只是决定了哪种后续工具能读取它。

---

## 拿到结果后能做什么

我从用户那里见过的最有意思的用途：

- **3D 打印一件独一无二的复制品。** 扫描一个捡来的物件，切片，打印。
- **为现实世界的资产建档。** 遗产记录、博物馆编目，或者搞清楚“奶奶那只花瓶到底长什么样”。
- **以 AR 形式分享。** 把 .usdz 发给一位用 iPhone 的人，他们轻触一下，就能通过 AR Quick Look 看到那个物体漂浮在自家客厅里。
- **放进游戏引擎。** 把现实世界中的道具放进 Unity 场景，90 秒就建好模，无需 3D 美术。

---

## 什么时候管用，什么时候不管用

摄影测量加 LiDAR 擅长处理：
- 实心、不透明的物体
- 带纹理或带花纹的表面
- 静态对象（任何在扫描过程中不会移动的东西）

它在这些情况下会吃力：
- 透明或会折射的物体（玻璃、水、镜头）
- 高反光的金属
- 非常细的特征（线缆、金属丝、毛发）
- 任何会移动的东西

对于它擅长的东西，结果是真正有用的，而不是玩具。对于其余的部分，要么准备在 Blender 里清理网格，要么接受它的局限。

3D Scan 是 [NFC.cool Tools for iPhone](https://apps.apple.com/app/apple-store/id1249686798?pt=106913804&ct=blog-3d-scan-feature-en&mt=8) 的一部分。Apple 的 Object Capture 需要 LiDAR 传感器，因此它运行在 Pro 版 iPhone（iPhone 12 Pro 及之后）和 iPad Pro 机型（2020 年及之后）上。
