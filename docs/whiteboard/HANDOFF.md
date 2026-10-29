# 交接文档（HANDOFF）· 白板动画与新模块

> 更新：2026-10-30 JST（文档清理：原 87 KB 的 HANDOFF 拆成本文 + `CHANGELOG.md`）
> 接手先读：本文（现状 + 下一步）→ `MASTER_DESIGN.md`（总设计，20 条决策：1–19、22）→ `SOP.md`（标准流程 + 验收清单）。历史进度、每步验收数字、引擎新工具登记都在 `CHANGELOG.md`（原 HANDOFF 全文，章节号不变）。
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

## 2. 下一步（按优先级）

1. **用户真机审片**（见 §4 清单）——除 port 外的新幕都没正式审过。
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

## 4. 待用户确认

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
