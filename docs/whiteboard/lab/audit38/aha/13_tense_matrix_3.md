# 啊哈卡 13 · `tense_matrix-2` 一般过去时

> 决策 38 第 13 幕。场景 `v5/scenes/tense_matrix_3.js` 改 concept.js（原决策 32 手工幕 12 块白板）。人物帧沿用手工帧库 `sprites/tm3.js`（cam 拍照、kick 踢球、l_no 摇头）。按表第 13 行：先找不同再出 -ed；**中段拼写**（y→i、双写）不再单独占板，只进字幕 + 朗读。

| 孩子先看到 | 先猜 | 揭晓 | 规则 |
|---|---|---|---|
| 分屏：左「昨天」一张发黄老照片里 Leo 在博物馆拍照，右「今天」Leo 又在博物馆；下面 I visited the museum yesterday. / I visit the museum. | 两句只差一点点——差在哪？为什么左边要多出那一点？（4 s） | 一枚橙色「-ed」邮戳盖到 visit 尾巴上，「-ed = 过去的邮戳 📮」「yesterday ✔」 | 老照片比喻 → 公式 → 时×体小格子（过去 × 一般体）→ I / He / They 都是 visited（不看主语）→ take 盖不上邮戳直接换 took → 拼写字幕 → was / were 两卡 → 信号词 → 陷阱 Did you went → go → **第二次预测** play / played → 口诀 + 金句 |

## 遮字幕测
- 两张图唯一差别是「昨天的老照片」，两句唯一差别是 -ed：-ed 表示过去。
- 三个主语后面都是同一个 visited。
- 有 Did 的句子里，动词回到没邮戳的样子。

## 知识点不丢
旧幕全部字幕、朗读句、公式、信号词、陷阱、口诀、金句共 38 条在 `KNOW`（`v5/check_r38.py tense_matrix_3`）。144 s（旧版也很长；内容未删）。

## 决策 36-② 分两节（2026-10-31 18:00 JST）
144 s → 第 1 节 `tense_matrix_3`（昨天 / 今天找不同 → -ed 邮戳 → 矩阵格子 → 不看主语 → take→took，61 s）；第 2 节 `tense_matrix_p2_3`（拼写 studied / stopped → was / were → 信号词 → Did you went ✗ → 预测 play / played → 口诀，85 s）。tense_matrix 一时态一幕、幕号跟 TENSE_ASPECT_MATRIX_DB 绑定，所以第 2 节不加新幕，而是同幕的子页签 `tense_matrix_p2`，App 白板下「🎬 第 1 节 / 第 2 节 ▶」切换（`src/patch_wb5_parts.py`）。
