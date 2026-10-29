# 合并记录（R1 零丢失）：`stress_rhythm` → 「🎵 语调地图」`intonation_map`

> 2026-10-30（MASTER_DESIGN 决策 5）。旧页签「⑥ 名动重音与弱读连读机」整体并入新页签的「🎯 重音与弱读」区。导出清单（`export_inventory.py stress_rhythm STRESS_RHYTHM_CASES`）共 3 幕、约 190 条字幕 / 白板 / 朗读，全部随原白板模块 `wbmod-stress_rhythm` 原样保留。

## 新页签结构

- 顶部切换条：「🎵 语调」（默认）｜「🎯 重音与弱读」。
- 🎵 语调：`cases/intonation_map.js` 两幕（v2 + 讲解员）——① 升调与降调（陈述 / 特殊疑问降、一般疑问升、选择前升后降、列举最后降）；② 句重音（实词重、虚词轻、节拍、换重音换焦点、弱读 /ə/，结尾指向「🎯 重音与弱读」）。
- 🎯 重音与弱读：原 `stress_rhythm` 页签正文**逐字原样**（3 个案例按钮、标题、原理段、白板舞台 `wbStageHtml("stress_rhythm", stressIdx)`、可点读词卡）。

## 逐项对照

| ☐ | 原内容 | 新位置 | 核对 |
|---|---|---|---|
| ✅ | 页签正文 `bodyHtml` 整段 | 🎯 区，只在前面拼了切换条 `imBar` | 脚本逐字比对 |
| ✅ | `STRESS_AND_SCHWA_DB`（3 案例：名前动后、-tion 重音吸引、弱读连读，含全部词卡） | 原样 | 逐字比对 |
| ✅ | 白板模块 `WB_LAB.stress_rhythm`（3 幕） | 原样（模块 id 不变，仍按需加载） | 逐字比对；appwb stress_rhythm 3 幕挂载 |
| ✅ | Canvas 回落（`tab === "stress_rhythm"` 画法） | 改成 `tab === "intonation_map"`，内容不变 | — |
| ✅ | 首页卡片「名动重音移位 & 弱读吞音听力机」 | 标题改「语调地图（含名动重音移位 & 弱读吞音听力机）」，原描述保留并在前面补「升调降调、实词重虚词轻」 | — |
| ✅ | 页签按钮、`tabTitles` | 「🎵👂 ⑥ 语调地图」（标题保留「含名动重音与弱读连读机」） | — |
| ✅ | 旧入口 `labTab: 'stress_rhythm'` | 自动打开 `intonation_map` 的 🎯 区 | App 冒烟 |

## 结论

- ❌ 丢失 0。旧页签只剩兼容跳转。
- 原 3 幕的 R2 旧欠账（缺朗读）不变，留在「持续」待办里，合并不改原幕。
- 决策 6「合成词重音（BLACKboard vs black BOARD）」以后做在本页签旁边。
