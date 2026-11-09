# 第五波第 10 项清查底稿：anchorcheck 116 项基线分类（2026-11-09）

> 定夺（主对话 Muse 已定）：anchorcheck 116 项基线另立项做清查分类，
> **不修**。本稿只分类、不改主文件、不改 jscheck、不改 anchorcheck。
> 清查对象：`python3 docs/whiteboard/src/jscheck.py
> laws-prototype/mengxing-prototype-v1.html` 末尾的 anchorcheck 部分
> （`docs/whiteboard/src/anchorcheck.py` 的 `check()`）。
> 完整 116 项原文快照：
> `docs/work-2026-11-09/wave5_anchorcheck_triage.json`（与本稿同日实测）。
> 复现：任一时刻重跑 jscheck，取 `^FAIL anchor` 行排序后与快照逐项 diff。

---

## 一、分类总表

| 类 | 定义 | 项数 |
|---|---|---|
| **A. 已删旧文件 / 旧白板的残留锚** | 锚点所指的写入工具、引擎、总枢、首页系统已被删除或退役；现行主文件从未含这些锚点（或只含改写后的新实现） | **116** |
| **B. 现文件真实缺失的锚** | 锚点所指功能在现行主文件里仍以原实现存在、只是锚点字符串缺失 | **0** |
| **C. 其他**（应为 0 却出现的回潮项、LAB_GROUPS/READY 登记不一致等） | | **0** |

结论：116 项**全部是 A 类**。没有任何一项对应现行主文件的真实缺失，
没有任何一项是“应为 0 却出现”的回潮。anchorcheck 在现行主文件上
永远报 116 项失败，与内容对错无关——它守护的东西已经不在了。

## 二、A 类 116 项的分组明细

### 1. 标记类错误（`标记出现 0 次（应为 1）`）：60 项

全部 60 项都是“应为 1、实为 0”，其中 59 项应为 `1`、1 项（PRE_MENU
的 `class="lab-entry`）应为 `1–∞`。无任何“应为 0 却出现”的项。

| 来源（anchorcheck.py 内分组） | 项数 | 所指内容 | 退役/删除证据 |
|---|---|---|---|
| 白板引擎与舞台（MARKERS 前段） | 12 | `// <<WB_ENGINE_START/END>>`、`<!-- <<WB_MODULES_START/END>> -->`、`<!-- WB_STAGE -->` / `<!-- WB_GLOSS -->`（bamboo_tree）、`startWBLoop(wbStage)`、fp 版 3 项、`wbmod-vv` 懒加载 2 项 | 旧 SVG 白板引擎 2026-10-30 退役（`92ea6e3` 删 45 个 wbmod 模块 + 旧引擎，insert_wb.py 停用；`7f7ecce` 删旧白板源码与工具）；现行主文件 `wbmod-` / `WB_STAGE` 出现 0 次 |
| WO/ZE 总枢（词源 / 中英对照） | 9 | `<!-- WO_HOME`、`<!-- ZE_HOME`、两总枢路由、`woAnimId` / `zeAnimId` 停循环、`<!-- WO_ORIGIN_TAGS -->`、WO_GRIMM/WO_RULES 2 项 | 老合并版文件的总枢视图；现行主文件 `renderWordOriginsHubView` / `renderZhEnHubView` / `word_origins` / `zh_en` 皆 0 次 |
| 首页改版 step*.py（决策 33）+ HD 导图 | 8 | `const LAB_GROUPS`、`homeContinueHtml`、`noteLastView`、lab-tab class、`lab-entry`（PRE_MENU）、WB5_HD 导图 3 项 | `docs/home/step*.py` 已不在仓库（docs/home/ 只剩 home_entries.py）；现行主文件 `LAB_GROUPS` / `lab-tab` / `lab-entry` / `data-home-five` 皆 0 次 |
| 词源卡 / 巧记分开（patch_etym_card） | 5 | `// ETYM_CARD_V1`、`<!-- ETYM_CARD:modal/grid -->`、ETYM_DB_JSON、`etymIsPlaceholderTip` | 2026-10-30 补丁脚本已删；现行主文件 `ETYM_CARD` / `ETYM_DB_JSON` 皆 0 次（词源现由 gen_et.py 生成 ET 载荷） |
| 练习闭环 + 总地图（patch_practice） | 5 | `// PRACTICE_LOOP_V1`、app_map 路由、`mqMount`、MODULE_QUIZ_JSON、`data-home-map` | 同上；现行主文件 `PRACTICE_LOOP` / `MODULE_QUIZ_JSON` / `data-home-map` 皆 0 次。`app_map` / `my_study` 各剩 2 处，**只在注释里**（“借鉴老 App … 按现行 App 规矩重写”，新实现为 MXM/MXW 错题本三分法），不是缺失的锚 |
| 口语功能地图（ORAL_FUNC_MAP） | 3 | `// ORAL_FUNC_MAP_V1`、oral_func_map 路由、`data-oral-func-entry` | 同上；现行主文件 3 项皆 0 次 |
| 词汇拆分（VOCAB_SPLIT） | 2 | `// VOCAB_SPLIT_V1`、VOCAB_HEAVY_JSON | 同上；皆 0 次 |
| 词缀词汇（patch_affix_vocab） | 3 | `// AFFIX_VOCAB_V1`、AFFIX_VOCAB_V1 尾标、AFFIX_WORDS_JSON | 同上；皆 0 次 |
| 语法例句（patch_grammar_examples） | 4 | `// GRAMMAR_EX_V1`、grexMount、GRAMMAR_EX_JSON、`GRAMMAR_FIXED_ACT[g.id]` | 同上；皆 0 次 |
| 去重三件套（DEDUP） | 3 | DEDUP_A、DEDUP_C、kpMount | 同上；现行主文件 `DEDUP` 0 次 |
| 别名词条（WORD_ALIAS） | 3 | `// WORD_ALIAS_V1`、`wordFormsHtml`、`migrateWordAliasRecords` | 同上；现行主文件 `WORD_ALIAS` 0 次 |
| 决策 6 空间隐喻 / 拼读剧场 | 3 | `catTitle: "🧭 密码四`、拼读剧场第三/四幕、`ttsPickVoice` 回退行 | 同上；现行主文件 `密码四` / `ttsPickVoice` / `拼写潜规则`（作标记字符串）皆 0 次（“双元音”正文 76 处是内容词，不是该锚） |
| 小计 | **60** | | |

注：MY_STUDY（决策 33①）与 MENU_V2/V3/V4/V5（决策 33②–⑤）两组标记
本次**未进入检查**（anchorcheck 的条件逻辑：MY_STUDY 只在
`renderMyStudyView` 在场时查，MENU_V2 只在 `// MENU_HOME_V2` 在场
时查、否则查 PRE_MENU，V3/V4/V5 同理）——现行主文件里这些触发条件
本身就是 0 次，所以不是“漏查”，是“旧首页系统整体不在，无从查起”。
若把这点算上，旧首页系统的残留锚实际更多，不止 60 项。

### 2. 按需加载模块缺失（`按需加载模块 wbmod-X 出现 0 次（应为 1）`）：43 项

- 构成：wb_registry.json 冻结登记表 READY 14 + FP_READY 6 + WO_READY 9
  + ZE_READY 11 = 40，另 `fp_props` 1、`wo_props` 1、WO_KITS 的
  `wo_vowel_kit` 1，共 **43**。
- 所指内容：2026-10-30 前 insert_wb.py 向老合并版主文件按需加载的
  白板模块（anchorcheck 创建时为 44 个；现冻结表 43 个，差 1 是登记
  变化所致，以冻结表为准）。
- 退役证据：白板嵌入已定为 C（第三波定夺：白板线独立、不嵌入新 App；
  578 幕留 docs/whiteboard 研发线可独立播放）；insert_wb.py 已删除
  （2026-10-30 停用，`92ea6e3`），`92ea6e3` 同时删了 45 个 wbmod
  模块与旧引擎；现行主文件 `wbmod-` 出现 **0 次**，`WB_STAGE` 0 次。
  白板现以 docs/whiteboard/units.json（234 页签 / 578 幕）独立存在，
  不以 wbmod 形式进主文件——43 项不是“模块丢了”，是“嵌入方式已废止”。

### 3. 实验室页签舞台缺失（`实验室页签 X 的 <!-- WB_STAGE:X --> 出现 0 次`）：13 项

- 构成：登记表 TABS 8 ∪ READY 14 = 14 个页签，减去 bamboo_tree
  （用老标记 `<!-- WB_STAGE -->`，已计入 §二.1 的 60 项），剩 **13**
  项（adj_order、aux_transformer、five_patterns、metaphor_code、
  past_clans、tense_matrix、writing_alchemist、phrasal_key、
  eight_endings、pron_map、intonation_map、irregular_plural、
  stress_rhythm）。
- 所指内容：老白板实验室各页签在主文件里的 `<!-- WB_STAGE:<页签> -->`
  挂载点；与 §二.2 同源（旧白板嵌入），现行主文件 `WB_STAGE` 0 次。
  现行主文件里的“实验室”30 处皆为正文/按钮文案（“时态实验室”、
  “现在完成时实验室”等），不是该挂载系统。

## 三、为什么 B 类是 0——逐族核对的方法

对 60 项标记的每一族，都在现行主文件里搜了功能本身的 distinctive
token（不只是锚点字符串本身），结果除注释外全部为 0：

- 白板引擎：`WB_ENGINE`、`startWBLoop`、`wbmod-`、`WB_STAGE` → 0。
- WO/ZE 总枢：`word_origins_hub`、`zh_en_hub`、`renderWordOriginsHubView`、
  `renderZhEnHubView` → 0。
- 首页/实验室：`LAB_GROUPS`、`lab-tab`、`lab-entry`、`homeContinueHtml`、
  `noteLastView`、`data-home-map`、`data-home-five`、`principles_hub`、
  `practice_hub`、`method_hub` → 0。
- 各补丁功能：`ETYM_CARD`、`PRACTICE_LOOP`、`MODULE_QUIZ_JSON`、
  `ORAL_FUNC_MAP`、`VOCAB_SPLIT`、`WO_GRIMM`、`AFFIX_VOCAB`、
  `GRAMMAR_EX`、`DEDUP`、`WORD_ALIAS`、`themeMindMapCanvas`、`WB5_HD`、
  `ttsPickVoice`、`etymIsPlaceholderTip`、`GRAMMAR_FIXED_ACT` → 0。
- 仅有的非 0 相关 token 是 `app_map`（2）、`my_study`（2），皆在同一段
  注释里（“借鉴老 App v6_hub 闪电战三件套 / my_study 三分 / app_map
  总地图，按现行 App 规矩重写”），功能已在现行 App 里以 MXM/MXW
  新实现重写，不是旧锚缺失。
- 现行主文件里唯一的 `WB_` 前缀 token 是白板数据/色板类
  （WB_BLUE/WB_GREEN/WB_RED/WB_ORANGE/WB_INK、WB_BY_ID、WB_CREDIT、
  WB_SCENES、WB_SECTIONS），无任何引擎/舞台锚点。

历史核对：
- 锚点所指的老文件（仓库根目录 `萌星小学英语_最终合并版.html`，约 18MB）
  于 2026-11-03 由 `d1c946f` 删除（Stewart 裁定：可借鉴成品已搬入新 App，
  其余内容均被现行 App 覆盖或超越）；删除前一版里 `WB_ENGINE_START` /
  `WB_STAGE` / `wbmod-` 合计 20 处——锚点是为**那个文件**写的。
- `git log -S'WB_ENGINE_START' / -S'MENU_HOME_V2' / -S'lab-entry'` 在
  现行主文件路径 `laws-prototype/mengxing-prototype-v1.html` 上**无任何
  提交**：这些锚点字符串从未进入现行主文件的 git 历史。
- anchorcheck 本身创建于 `63b7be4`（验收·锚点检查，2026-10-31 前后），
  当时主文件还是老合并版；`92ea6e3`（2026-10-30）删旧白板兜底时
  “anchorcheck 适配”，`7f7ecce` 删旧白板源码与工具时“anchorcheck
  登记表冻结”——登记表 `wb_registry.json` 自此冻结，不再随白板研发线
  （现 234 页签 / 578 幕）更新。
- 基线一致性：e97aaec 版主文件的 116 项与 d698a3c 版逐项集合比对
  **完全一致**（本波实测，`git show e97aaec:...` 临时检出比对），
  116 项自起点以来一字未变，是冻结基线，不是新增缺失。
- 附带发现：`// <<WB_OLD_RETIRED>>`（退役跳过标记）在现行主文件里
  也是 0 次——退役流程本应把该标记写进主文件以跳过
  `// <<WB_ENGINE_START/END>>` 与 `wbmod-vv` 三项检查，但现行主文件
  是重建而非补丁产物，从未写过该标记，所以连跳过路径都不生效。
  这不改变分类（仍是 A 类），只说明“适配”从未在新文件上生效过。

## 四、每类的推荐处置

### A 类（116 项）：推荐正式废止 anchorcheck，不修锚点

- **推荐**：由白板线/总协调人定夺后，正式废止 `docs/whiteboard/src/anchorcheck.py`
  （参照第四波第 4(c) 项 r2check 的废止做法：不删文件，立
  `anchorcheck.RETIRED.md` 标记，写明废止原因与替代验证法；同时把
  jscheck.py 末尾对 anchorcheck 的调用摘掉，或给 jscheck 加一个
  只跑 node --check 的开关——注意 `check_js_syntax.py` 门禁 wrapper
  已忽略 anchorcheck 行，摘掉不影响 check_all）。
- **理由**：它守护的写入工具（insert_wb.py、docs/home/step*.py）均已
  删除/停用，被守护的主文件（老合并版）已删除，现行主文件从未含这些
  锚点；继续跑它只会永远报 116 项基线失败，无拦截价值，且会误导后人
  以为“主文件缺了 116 处东西”。
- **替代验证法**（现行管线，已在用）：build 打包 + grep 打包产物 +
  探针时长（durcheck.py）+ wbtextcheck + jscheck node --check
  （已进 check_all 第 27 项）。白板线如将来需要锚点检查，应针对现行
  文件的新锚点重写，不复用冻结的 wb_registry.json。
- **不推荐的处置**：① 往现行主文件里补 116 个旧锚点（等于把已退役
  的旧引擎/旧首页以注释形式复活，无功能、只为过检查）；② 更新
  anchorcheck 的期望值去迁就现状（如把全部标记改为 0–0，检查变空转）；
  ③ 把 116 项列入 check_all 门禁（会让全绿的 27 项总检永久变红，
  第四波第 8 项已刻意排除）。
- **权限**：anchorcheck 属白板工具，废止决定须白板线/总协调人定夺；
  本项只做清查分类，未擅自废止、未改 jscheck、未改主文件。

### B 类（0 项）：无处置

### C 类（0 项）：无处置

## 五、未核实项

- 真机未核实：本项只做静态文本清查；白板研发线（docs/whiteboard，
  234 页签 / 578 幕）的独立播放状态不在本次范围。
- 登记表冻结后白板研发线新增的页签（READY 14 → 现行 234 页签）与
  anchorcheck 登记表的差额未逐项比对——登记表既已冻结且检查对象
  已废止，该差额无对账意义，只在此登记。
