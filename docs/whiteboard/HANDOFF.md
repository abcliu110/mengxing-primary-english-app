# 交接文档（HANDOFF）· 白板动画与新模块

> 更新：2026-10-30 01:10 JST（新增决策 23 三大厅白板化、24 老白板 58 幕升 v2、25 词源 / 格林定律 / 词根词缀全量入库）
> **当前阶段**：阶段 0–4、首页改版 1–6 步已完成；**正在做：阶段 7 全 App 白板化试点（fp_economy 第 1 幕已出对比图待用户审，FR01 买卖待做）+ 阶段 8 词源审计**；练习闭环（决策 14）等用户点头。
> 接手先读：本文（现状 + 下一步）→ `MASTER_DESIGN.md`（总设计，23 条决策：1–19、22–25）→ `SOP.md`（标准流程 + 验收清单）。历史进度、每步验收数字、引擎新工具登记都在 `CHANGELOG.md`（原 HANDOFF 全文，章节号不变）。
> 用户规矩：直接提交推送 `master`，不新建分支；做完一个单元 / 改完一个文档立即提交；发现 bug 直接修。本文只写现状和下一步，流水写进 `CHANGELOG.md`。

## 1. 现在做到哪

| 阶段（MASTER_DESIGN §4） | 状态 | 最后一个提交 |
|---|---|---|
| 0 文档、1 骨架补齐（引擎 v2、讲解员、R2/R4 检查、port 样板幕、按需加载） | ✅ | `abb050c` port 审片通过、`f575002` 按需加载 |
| 2 单词身世第一批（Europe、Bluetooth、身世标签、格林定律章 4 幕、时间与度量 2 幕；删 `vowel_shift`） | ✅ | `a29cb70`、`4347111` |
| 3 中英对照总枢（11 幕，全部 v2 + 讲解员；④-1 / ⑥-1 零丢失搬迁） | ✅ | `b8366bd` |
| 4 实验室新页签（phrasal_key 并入 verb_matrix、eight_endings、pron_map、intonation_map 并入 stress_rhythm） | ✅ | `f497a1a` |
| 旧幕 R2 补朗读（P1–P4 + metaphor_code + past_clans） | ✅ | `0a5d255` |
| 5 新模块（决策 6）：✅ 合成词重音（语调地图第 3 幕）、✅ 不规则复数（页签 ⑮）；⬜ 空间隐喻、拼写潜规则、交际句型地图 | 进行中 | `52b7121` |
| 首页改版 1–6 步（继续上次 → 三大厅 → 三大总枢小卡 → 王炸实验室入口卡 → 更多） | ✅ | `f1cd18f` |
| **中点：练习闭环 + 总地图（决策 14）** | ⏰ 已到点未做 | — |
| 文档清理（HANDOFF 拆分、计数、时间戳、§3 总表、README）+ 锚点检查 + 审片清单 | ✅ | `121ce9c`、`562b6d4`、`c27c278` |
| 7 全 App 白板化（决策 23 / 24）：试点 fp_economy 第 1 幕 | 🟡 已做，待用户审对比图（未推送） | — |
| 8 词源 / 格林定律 / 词根词缀全量入库（决策 25） | 🟡 审计中 | `3cc5e98`（决策） |

## 2. 下一步（按优先级）

0. **全 App 白板化（决策 23 / 24，用户 2026-10-30 定为最优先）**：用户认可 fp_economy 第 1 幕对比图 → 推送 → 框架语义 FR01 买卖小剧场试点（与 fp_economy 一起审）→ 老白板 58 幕逐文件升 v2 → 三大厅：框架语义 → 易混词 → 自然拼读 → 构词 → 单词卡模板 → 语法 40 点 → 口语 16 场景。流程见 `SOP.md` §14。**每个入口先导出旧内容清单，验收后才拆旧 canvas。**
0b. **词源 / 格林定律 / 词根词缀全量入库（决策 25，并行）**：审计报告先给用户 → 分批补齐 → `word_origins/COVERAGE.md`。流程见 `SOP.md` §15。
1. **用户真机审片**（清单见 `REVIEW_LIST.md`）——除 port 外的新幕都没正式审过。
2. **练习闭环 + 全 App 总地图（决策 14）**：每模块 3–5 道小测（认出 → 选择 → 拼写），答错进现有错题本（跨 2 个学习日、连续答对 3 次消错），完成度存 `localStorage`、总地图点亮；不接第三方统计。**等用户点头再开工。**
3. 决策 6 剩余三个新模块：空间隐喻 → 拼写潜规则 → 交际句型地图（开工前和用户确认位置，MASTER_DESIGN 决策 6 表是建议）。
4. 之后：决策 7 词汇大数据 → 决策 8 家长指南 / 英美对照 / 大写标点 → 决策 9 欧洲文化 6 章 + 美国篇。
5. 持续：旧幕补 R4 `actionWords`（要和视觉 v2 升级一起做，旧幕还没有讲解员）；R2 剩余缺口只在 stress_rhythm 原 3 幕（已并入语调地图「🎯 重音与弱读」区，原样保留）。

## 3. 已知风险

- **审片缺口**：只有 port 幕经过用户正式审片。Europe、Bluetooth、格林定律 4 幕、时间与度量 2 幕、中英对照 11 幕、实验室新页签（phrasal_key、eight_endings、pron_map、intonation_map 3 幕、irregular_plural 2 幕）只做了截图自审。首页改版第 4–6 步是在 `20581e9`「待用户看截图确认」之后直接做的，用户还没看。
- **实测环境**：fps、朗读同步都只在无 GPU 的 headless 沙箱 + 模拟 TTS 下测过；port v2 的 1% 低帧约 39（目标 ≥ 50），需真机复核；真实语音（尤其中文设备上的英文语音包）下的口型和时间轴跟随没验证过。
- **时长**：port v2 约 202 秒（升级前约 136 秒），对小学生偏长，审片时请用户判断要不要剪。
- **补丁脚本靠字符串锚点改 5.7 MB 主文件**（`src/insert_wb.py`、`docs/home/step*.py`）：锚点没匹配上时可能静默不改。✅ 2026-10-30 已加 `src/anchorcheck.py`（见 §5）；它只核对已知标记，新加的补丁要把自己的标记登记进去。
- **R4 缺口**：旧幕（王炸实验室 6 个老页签、第一性原理 22 幕）都没有 `actionWords` 清单。

- **文档问题清单（2026-10-30 审计，已处理，留档备查）**：① HANDOFF 头部「当前阶段」过期（写阶段 2，实际 1–4 + 首页 1–6 已完成）✅ 已改；② HANDOFF 时间戳不可信（如 irregular_plural 写 01:45、实际提交 00:06；中英对照 11 幕写 10-30 03:15、实际 10-29 23:06）✅ 已按 git log 更正（CHANGELOG 开头更正表）；③ MASTER_DESIGN 计数乱（头部 19 条、§2 标题 17 条、有 22 无 20/21、规则顺序 R1 R2 R4 R3）✅ 已统一；④ §3 合并总表过期（stress_rhythm、不规则复数仍写待做）✅；⑤ 过期待办（port R4、讲解员、port 审片、首页优化方案、DESIGN_HANDOFF「尚未决定」）✅；⑥ README 写「十二大王炸」和旧首页结构 ✅；⑦ HANDOFF 87 KB 过大、流水和交接混写 ✅ 已拆成本文 + CHANGELOG。**以后**：本文只写现状，流水只写 CHANGELOG；计数改动时同步头部和标题。
- **练习闭环拖延**：决策 14 约定「新模块做到一半时做」，已过点未做，需用户点头。
- **白板化工作量**：三大厅 HD 剧场 + 老白板 58 幕规模大，必须模板化；动作库不够时扩 `wb_actor.js`（只加不改）。
- **词源质量**：`VOCAB_DB.etymology` 多数是「秒懂巧记小故事」（记忆法，不是词源），部分含错误说法（如「ear 加 h = hear」），决策 25 要纠正标注，不删。

## 4. 待用户确认

0. fp_economy 第 1 幕 v2 对比图是否认可（认可后才铺开白板化）。
0b. 词源审计报告（决策 25）。
1. 真机审片（同 §3 第一条）。
2. 决策 14 练习闭环是否现在开工。
3. 决策 6 剩余三个模块的位置。
4. 术语「词源」在 `fp_iconicity` 和 `wo_port` 各一条，统一说法（MASTER_DESIGN §3，下次改任一文件时做）。
5. 第一性原理 ②「M 像山」（💡）将来和「字母身世」（📜）并排。

## 5. 常用做法速查

- **验收**（先 `python3 docs/whiteboard/src/insert_wb.py` 再查）：`jscheck.py`（node --check，必跑）、`r2check.py <幕|all|lab|fp|wo> [--strict|--summary]`、`reg_render.py`（旧幕渲染逐字节回归）、`appwb.py <页签>` / `appfp.py <原理>` / `appwo.py` / `appze.py` / `apptags.py`（App 内冒烟）、`docs/home/home_entries.py --check`（首页入口零丢失）。
- **补丁锚点检查**：`src/anchorcheck.py` 核对主文件里各插入标记（引擎 / 模块区块、总枢入口、路由、停循环、每个页签的 `WB_STAGE`、每个 `wbmod-*`、首页改版标记）次数正确、`LAB_GROUPS` 页签都已登记进 `READY`；`jscheck.py` 末尾自动跑，`insert_wb.py` 写文件前也跑，不通过就不写。新写补丁脚本：替换前 `assert s.count(锚点) == 1`，并把新标记加进 `anchorcheck.MARKERS`。
- **新实验室页签接线**：`cases/<id>.js`（v2 + `WO_PROPS`）→ `insert_wb.py` 的 `READY` + `LAB_DEPS` → 主文件 `LAB_GROUPS` 加一项 + 首页 `.lab-entry` 对应组加 `.lab-chip`（onclick `navigateTo('super_lab_hub', { labTab: '<id>' })`）、`tabTitles`、`} else if (tab === …)` 分支（锚点 `\n  } else if (tab === "bamboo_tree") {\n`）→ `appwb.py` IDX、`preview.html` 名单。
- **环境**：沙箱重启后 `/tmp` 清空，Playwright 要重装：`pip install playwright pillow && python3 -m playwright install chromium && python3 -m playwright install-deps chromium`。
- **零丢失（R1）**：搬迁 / 合并前先导出清单（`export_inventory.py`），搬完逐条对照（`check_inventory.py`、`check_upgrade.py`），❌ 必须为 0 才删旧。
