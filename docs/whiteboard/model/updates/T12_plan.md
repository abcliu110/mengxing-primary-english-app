# T12 阶段一 · 存量动画盘点与迁移批次表

> 任务：只盘点与规划，不动任何场景文件。日期：2026-11-01（通宵班）。
> 方法：python3 静态扫描 `docs/whiteboard/v5/scenes/*.js`（import/引擎特征分类 + 文案匹配），全程只读。
> 对照基线：`~/workspace/audit-parts/stock_stats.md`（2026-11-01 早前盘点，552 幕口径）。
> 污染匹配源：`model/scene_fixes.yaml` 46 条修正记录（错误 9 + 过度简化 36 + 基本成立顺手订正 1），
> 其 `original` 原句与 wb_claims.json / wb_know_todo.json 的问题项 1:1 对应（T5 建集时已逐字核对）。
> 匹配方式双通道：原句逐字子串 + 归一化子串（去空白/标点/大小写）。**46 条记录的声明 scenes 与全仓扫描命中完全一致，零出入**——声明清单可信，扫描无漏检（在该匹配口径内）。

---

## 1. 存量幕清单（与 stock_stats 对照核实）

当前 `v5/scenes/` 共 **585 个 .js** = 8 个共享引擎/库 + **577 个场景文件**。与 stock_stats 的 552 幕口径对账如下，**完全闭合**：

| 项 | 幕数 | 说明 |
|---|---:|---|
| stock_stats 基线（当时场景文件） | 552 | 含原理原文件 25（见下） |
| T11 新增生成幕 `gen_*` | +24 | 原理六家族 × 4，已迁完，不在本计划范围 |
| T11a 新建模板变体 `fp_economy_1_v2.js` | +1 | ① 家族第 1 幕的模板变体（v1 不动），生成 gen_phonology_1 用 |
| **当前场景文件合计** | **577** | 552 + 24 + 1 ✓ |

原理六家族原文件共 26 个（24 幕 + boundedness_1 的 v2/v3 变体 + 上行 economy 变体）：
fp_boundedness 6（1/1_v2/1_v3/2/3/4）、fp_economy 6（1/1_v2/2/3/4/p2_1）、fp_iconicity 4、
fp_one_king 3（仅 _2/_3/_4）、fp_vectors 4、fp_zoom_focus 3（仅 _2/_3/_4）。
**登记事项**：`fp_one_king_1.js`、`fp_zoom_focus_1.js` 在 v5/scenes 中缺失（两家族第 1 幕未以 fp_ 名落盘；
其 gen 版已由 T11 生成验收），阶段二无需处理，仅备查。

**待迁存量 = 577 − 24（gen 新幕）− 26（原理原文件，已迁完，源文件保留作模板/对照）= 527 幕**，按模式分组：

| 模式 | 引擎 | 待迁幕数 | stock_stats 对应口径 | 核实 |
|---|---|---:|---:|---|
| autoBuild 数据幕 | auto.js（items 清单流） | 263 | 280 − 原理 17（iconicity 4 + boundedness kit 外 auto 幕等） | ✓ |
| oralBuild 数据幕 | oral.js（口语对话流） | 144 | 144（无原理幕） | ✓ |
| polyBuild 数据幕 | poly.js（一词多义桥） | 51 | 51 | ✓ |
| mindmapBuild 数据幕 | auto.js（导图版式） | 25 | 25 | ✓ |
| kit 样板幕 | fb39_lib kit() | 0 | 6 幕全属 boundedness 家族，已迁 | ✓ |
| buildAdj 家族版式 | adj_train.js | 4 | 4（adj_order_1–4） | ✓ |
| frBuild 家族版式 | fr_lib.js | 4 | 4（hd_fr01_1–4） | ✓ |
| 完全手写 | 无引擎，K/C 直写 | 36 | 38 − 原理侧 3 + T11a 变体 1 的口径差，见注 | ✓ |
| **合计** | | **527** | | |

注：手写口径差说明——stock_stats 手写 38 幕含原理家族的 economy 手写幕等；本次按「原理原文件 26 个整体排除」后为 36 幕，
其中带 predict+rule+aha 认知闭环的 E 型 20 幕（hd_g05/g07/g14/g18/g19/g37/g38/g39、tense_matrix_3、wo_grimm 三件、
wordcard_tpl 等），非 E 型 16 幕（past_clans 多数、tense_matrix 多数、adj_order 分节续篇、wordcard_items 等）。
自动检测的 E 型判定为子串启发式，与 stock_stats 的原语签名口径（手写 E 型 22 幕）差 2 幕
（tense_matrix_5、past_clans_4 用了变体写法，未被子串命中）——批次表中按家族归属计入 E 型处置。

---

## 2. 污染映射（逐幕扫描结果）

46 条问题原句在全仓（577 幕，排除 8 个库文件与 24 个 gen 新幕）的总命中：**44 个文件、65 处（幕×条）**。
其中原理原文件 16 个、28 处——已由 T11 迁移解决，新版 gen 幕中原句零残留（T11 各家族审查已验），源文件仅作对照保留，**不进迁移批次**。

**待迁存量中招：28 幕、37 处**，分布与优先级如下（严重度 = 裁定等级优先：错误 > 过度简化；条数次之）：

### 2.1 错误级（6 幕，12 处）——最高优先级

| 幕 | 模式 | 命中 | 修正记录 | 病灶 |
|---|---|---:|---|---|
| hd_poly_g4_157_1 | polyBuild | 3 | sf-003/004/005 | light 多义家族伪派生叙事（同形异源讲成意象纽带） |
| hd_poly_g4_157_2 | polyBuild | 3 | sf-003/004/005 | 同上（同词三幕共用同一叙事） |
| hd_poly_g4_157_3 | polyBuild | 3 | sf-003/004/005 | 同上 |
| hd_g19_1 | 手写 E 型 | 1 | sf-002 | 三单 -s「勋章转移」伪机制故事 |
| hd_phonics_1 | autoBuild | 1 | sf-008 | 闭音节 a 规则错误表述 |
| past_clans_4 | 手写 | 1 | sf-009 | 过去式家族错误条（报告 ③-A） |

### 2.2 过度简化 · 多条（3 幕，6 处）

| 幕 | 模式 | 命中 | 修正记录 | 备注 |
|---|---|---:|---|---|
| hd_g03_1 | autoBuild | 2 | sf-010/029 | G03「没有固定形状」旧理论的第三份拷贝（另两份已在 T2/T11 处理） |
| hd_g40_1 | autoBuild | 2 | sf-035/036 | |
| tense_matrix_5 | 手写 | 2 | sf-037/038 | 完成态表述（与 viewpoint 模型口径对齐） |

### 2.3 过度简化 · 单条（18 幕，18 处）+ 顺手订正（1 幕，1 处）

| 幕 | 模式 | 记录 | 幕 | 模式 | 记录 |
|---|---|---:|---|---|---:|
| bamboo_tree_1 | autoBuild | sf-015 | metaphor_code_4 | autoBuild | sf-045 |
| five_patterns_p2_2 | autoBuild | sf-043 | wo_rule_assim_1 | autoBuild | sf-026 |
| hd_g04_1 | autoBuild | sf-030 | wo_vowel_a_1 | autoBuild | sf-040 |
| hd_g06_1 | autoBuild | sf-031 | writing_alchemist_1 | autoBuild | sf-042 |
| hd_g15_1 | autoBuild | sf-032 | ze_be_1 | autoBuild | sf-044 |
| hd_g33_1 | autoBuild | sf-033 | ze_same_1 | autoBuild | sf-041 |
| hd_phonics_3 | autoBuild | sf-039 | hd_g14_1 | 手写 E 型 | sf-013 |
| hd_g39_1 | 手写 E 型 | sf-034 | wo_grimm_1 | 手写 E 型 | sf-020 |
| wo_grimm_more_1 | 手写 E 型 | sf-020 | wo_grimm_rows_1 | 手写 E 型 | sf-020 |
| wo_europe_1 | autoBuild | sf-046（订正：euro 定名年份 1996→1995） | | | |

### 2.4 未中招但须专项核查的通道（诚实声明）

- **oralBuild 144 幕在 46 条白板问题集中零命中**，但这不等于零污染：口语对话的内容源是 DAILY_EXPRESSIONS_DB，
  其 29 条错误已由 T4 修正、T9 补丁进主 HTML 的 DB；场景文件内的对话是另一份内嵌拷贝，是否同步携带旧错句，
  本轮未做逐行 diff（抽查显示 expressions_fixes 的订正句与场景文本约半数对不上，说明两份拷贝确已分叉）。
  阶段二 B7 批必须先做「场景内嵌对话 vs 已修 DB」逐行比对，再定污染幕数——此数目前**未知**，不预估。
- mindmapBuild 25 幕同理零命中；其内容源 VOCAB_DB 已在 T3/T9 修正，`mindmap_groups.json` 是否含旧词条释义需在 B9 批核对。
- 本映射只覆盖「已裁定问题句」口径；成立/基本成立的台词（791 条裁定中的其余部分）不在污染之列，
  它们的迁移动机是单源化与零副本（见 §5），不是纠错。

---

## 3. 迁移批次表（按 污染严重度 × 模式 排序）

原理 24 幕已迁完，全部排除。纠错批（B1–B5）先行，单源化批（B6–B11）随后；
每批的修正文案全部现成（scene_fixes.yaml 的 fixed_lines），不需新裁定。

| 批 | 范围 | 幕数 | 管线 | 验收 |
|---|---|---:|---|---|
| **B1** 错误 · 数据幕 | hd_poly_g4_157_1/2/3、hd_phonics_1 | 4 | 数据层定点替换（ITEMS 内原句→fixed_lines），poly 三幕同词同叙事，一处内容修复三幕同步 | 等效校验不合格 0 + 三幕纽带段抽帧 + 替换后原句全仓扫描零命中 |
| **B2** 错误 · 手写幕 | hd_g19_1、past_clans_4 | 2 | 逐幕 spec 化生成（know 型模板变体，fp_economy_1_v2 先例）或逐幕手改后补 spec 存档 | insightcheck 不合格 0 + 独立逻辑审查（五点）+ 抽帧 |
| **B3** 过度简化 · 多条 | hd_g03_1、hd_g40_1、tense_matrix_5 | 3 | 前两幕定点替换；tense_matrix_5 逐幕（手写） | 等效校验 0 + 抽帧；hd_g03_1 另须与 boundedness 模型判据口径交叉核对（同一旧理论不得第四次复活） |
| **B4** 过度简化 · 单条数据幕 | §2.3 表中 autoBuild 14 幕（含 wo_europe_1 订正） | 14 | 数据层定点替换，同 B1 | 等效校验 0 + 每幕抽 1 帧 + 原句零命中扫描 |
| **B5** 过度简化 · 单条手写幕 | hd_g14_1、hd_g39_1、wo_grimm_1/more_1/rows_1 | 5 | 逐幕 spec 化或手改+spec 存档；wo_grimm 三幕同条（sf-020 格林口诀尾句），一改三幕 | insightcheck/等效校验 0 + 抽帧 |
| **B6** autoBuild 干净幕单源化 | autoBuild 余 246 幕（263 − B1/B3/B4 涉 17 幕） | 246 | 全自动：ITEMS 抽取 → spec → 再生，比对再生前后等价（台词集合一致、时长漂移在容差内） | 批量等效校验 0 + 每族抽 1 幕抽帧 + 文案副本基线复测 |
| **B7** oralBuild 全量 | hd_oral_sc01–sc16 共 144 幕 | 144 | 先专项 diff（场景内嵌对话 vs T9 已修 DAILY_EXPRESSIONS_DB）定污染子集 → 污染幕定点替换、全量 spec 化（ITEMS 与 oralBuild 同形） | diff 报告先行；替换幕等效校验 0 + 每话题抽 1 幕抽帧 |
| **B8** polyBuild 干净幕 | polyBuild 余 48 幕（51 − B1 的 3 幕） | 48 | 半自动 spec 化；「意象纽带」句逐幕过目（词源真实性门，sf-003 教训） | 等效校验 0 + 纽带句逐幕签核表 |
| **B9** mindmapBuild 全量 | hd_mindmap 25 幕 | 25 | 数据层：mindmap_groups.json 与已修 VOCAB_DB 对齐核对 → 走既有 gen_mindmap.py 再生，不新建 spec 模式 | groups 对齐 diff 报告 + 再生后等效校验 0 + 抽 3 幕帧 |
| **B10** 手写 E 型干净幕 + 家族 builder | 手写 E 型余 14 幕、buildAdj 4、frBuild 4 | 约 22 | 逐幕 spec 化（E 型）/ 逐幕人工迁移（builder 两族各 4 幕，量小不另造模式） | 逐幕 insightcheck 0 + 五点逻辑审查抽检 ≥30% |
| **B11** 手写非 E 型 | 非 E 型余 14 幕（past_clans/tense_matrix 残部、adj_order 分节、wordcard 两件等） | 14 | 逐幕评估：能并入 A/E 模式的并入，独特演法保留手写但补事实表存档 | 逐幕处置表 + 构建通过 + 抽帧 |

纠错批合计 **28 幕**（B1–B5），单源化批合计 **499 幕**（B6–B11），总计 527，与 §1 待迁存量闭合。

---

## 4. 管线缺口（阶段二开发清单）

现 `gen_scene.py` 两模式：**know 模式**（模板须含 `export const KNOW` + aha 四键 + `kit(K, C, '标题'`，即 fb39 家族模板）
与 **items 模式**（模板须为 autoBuild：`const ITEMS` + `autoBuild(SP, { title:`）。逐模式缺口：

| # | 缺口 | 影响模式/批次 | 工作量定性 |
|---|---|---|---|
| G1 | items 模式的标题正则只认 `autoBuild(SP, { title:`；oralBuild/polyBuild 签名同为 `(SP, { title: '…'`、ITEMS 块形状一致，仅引擎名不同 | oral/poly（B1/B4/B7/B8） | 小：正则泛化为 `(auto|oral|poly)Build` |
| G2 | gen_scene 在分支前无条件加载 `model/{family}.yaml` 建 claims/chants 索引；存量幕多无家族模型文件，items 模式实际不依赖它也会崩 | 全部 items 批 | 小：family 改为可选，或加 spec-only 模式（内容直接由 spec 承载） |
| G3 | 两模式均强制要求 spec.facts（objects/invariants）；500+ 幕批量 spec 化时事实表无法逐幕手写 | B6–B8 | 小：facts 改可选，缺省生成「待补」事实表并在验收中标记 |
| G4 | oral 的 ITEMS 含轮次语义（'w' 对话行与 's' 朗读行成对、ACTS 按说话人键 '*'/M/F）；现 items 模式只校验「非空数组」，无配对校验，错位替换会静默串轮 | oral（B7） | 中：加 oral 专用校验器（轮次配对 + ACTS 键覆盖） |
| G5 | oral 内容源在 DB 层（DAILY_EXPRESSIONS_DB，T9 已修）而非家族 YAML；且 v5 另有旧生成链 gen_oral38.py（src/cases 层）。须先裁定单源落点（建议：模型层 DB 为源，场景 ITEMS 为产物），再写 DB→spec 抽取器 | oral（B7） | 中：一次裁定 + 一个抽取器 |
| G6 | poly 的「意象纽带」句是内容风险位（伪派生叙事的载体），现 items 模式对它与普通台词无区别对待 | poly（B1/B8） | 小：spec 中纽带句单列字段 + 迁移时强制过词源核查门 |
| G7 | mindmapBuild 数据形是 GROUPS（name + leaves 三元组），gen_scene 无此模式；但已有专用链 gen_mindmap.py + mindmap_groups.json（25 幕已是「数据→生成」形态） | mindmap（B9） | 中：不造新模式；缺的是 groups↔VOCAB_DB 对齐校验器 + 把 groups 文件纳入模型层登记 |
| G8 | know 模式只适配 kit 模板（存量 kit 幕已为 0）；手写 E 型幕（约 22 幕）台词散在 narr()/C.* 调用中、无 KNOW 块可换 | 手写 E 型（B2/B5/B10） | 大：先做「手写幕台词抽取器」（按 wb_scene_sentences.json 抽取口径）产候选 spec，逐幕人工确认后按 fp_economy_1_v2 先例建模板变体生成 |
| G9 | buildAdj/frBuild 的数据是深层嵌套对象（cars[] 数组、V 对象），无 spec 模式 | builder（B10） | 小（量小）：二选一——逐幕人工迁移，或各写一个薄适配器；建议前者，8 幕不值得造模式 |
| G10 | items 模式无「共享句库引用」语法：口语套语、poly 槽位词等跨幕重复句（基线 ≈556 组 / 1,257 份冗余）生成化后仍是逐幕内嵌，达不到文案零副本验收 | oral/poly/auto（B6–B8） | 中：items 行加 ref 型（引用共享句 ID），生成时展开；与 B7 的句库抽取合并做 |
| G11 | 验收门禁缺口：官方 insightcheck 强制集不覆盖 autoBuild 家族（T11b/T11d 已记录），现靠等效校验脚本（tools/ic_gen8.py 等）临时支撑；oral/mindmap 的等效参数未各调一版 | 全部批次 | 中：把等效校验固化为批量门禁工具 + 两版参数 |

---

## 5. 阶段二规模估计

按「机器能闭环 / 人必须逐幕介入 / 人必须精调」三档，依据为 §2 污染分布与 §4 缺口的工作量定性：

| 档 | 幕数 | 构成 | 依据 |
|---|---:|---|---|
| **可全自动批** | **266** | B1/B3/B4 的数据幕定点替换 20 幕（修正文案现成、ITEMS 内字符串替换、机检闭环）+ B6 干净 autoBuild 246 幕的机械 spec 化（内容已裁定干净，迁移=抽取→再生→等价比对） | 前置：G1/G2/G3 三个小改落地；等价比对口径沿 T11 的等效校验 |
| **需人工逐幕批** | **约 239** | B7 oral 144（机检 diff 为主，人工只裁定差异行——若差异率与本轮抽查相符，实际动手幕会显著少于 144，但逐幕比对这一步不可省）+ B8 poly 48（纽带句逐幕签核）+ B9 mindmap 25（groups 逐组对齐确认）+ B10 的 builder 8 与 E 型逐幕 spec 确认 14 | 人工的工作是「确认/裁定」而非「重写」：每幕有现成数据与现成判据，卡点在 G4/G5/G7/G8 的工具就位 |
| **真正手写批** | **约 22** | B2/B3/B5 的手写污染幕 8（hd_g19_1、past_clans_4、tense_matrix_5、hd_g14_1、hd_g39_1、wo_grimm ×3）+ B11 非 E 型独特演法幕 14（tense_matrix 矩阵交互、past_clans 残部、wordcard 模板对、adj_order 分节续篇等），落在 stock_stats 估计的 12–28 幕精调区间内 | 这批的产出是模板变体/事实表/逐幕审查，节奏以幕为单位，不批量 |
| 合计 | 527 | 与待迁存量闭合（239 档内 oral 的「逐幕比对但零改动」幕与 22 档的手写污染幕不重叠） | |

**排期含义**：阶段二的真实瓶颈不是 527 这个幕数，而是 §4 的 11 项缺口（其中 G8 最大、G5 需一次裁定）。
缺口清完后，全自动批 266 幕是机器时间；人工逐幕批约 239 幕按「确认」节奏推进；手写批约 22 幕是唯一以「幕/天」计的硬骨头。
纠错批 B1–B5（28 幕）不依赖大缺口（只需 G1–G3 小改 + G8 对 7 幕手写幕的逐幕处置），应最先清零——
**全部已裁定错句在存量中下线，是阶段二的第一里程碑**；单源化（B6–B11）随后按模式推进，最终以文案零副本全仓复测收口。

---

## 附：方法与可复现性

- 分类器口径与 stock_stats 一致（import 的 *Build 特征 + kit 调用），本次复跑与基线逐模式对账闭合（§1）。
- 污染扫描脚本逻辑：对 46 条 `original` 做逐字 + 归一化双通道子串匹配，遍历全部场景文件（排除 8 库 + 24 gen）；
  结果与 scene_fixes.yaml 自带 scenes 声明零出入，故本表幕数可直接采信，无需再抽样复核匹配环节。
- 本计划未改动任何场景文件；扫描中间结果（逐幕命中明细 JSON）留于执行会话 /tmp/t12_scan.json（临时件，如需归档请示下）。
