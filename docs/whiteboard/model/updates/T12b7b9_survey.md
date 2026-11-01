# T12 阶段二 · B7/B9 先行专项：oral / mindmap 场景内嵌拷贝与已修正 DB 的分叉核查

> 任务：只核查，不改任何场景/DB 文件。日期：2026-11-01（通宵班）。
> 前置：T12_plan.md §2.4 诚实声明——oral 144 幕、mindmap 25 幕在 46 条白板问题集中零命中，
> 但其内容源 DB（DAILY_EXPRESSIONS_DB / VOCAB_DB）已经 T4/T3 修正、T9 补丁进主 HTML；
> 场景内嵌拷贝是否同步携带旧错句，此前未知。本专项即为定此数。
> 结论一句话：**两族场景都是补丁前 DB 的逐字忠实拷贝——场景侧零独有内容、零修正；
> 污染全部来自「DB 已改、场景未跟」，oral 38 幕 87 行，mindmap 3 幕 3 叶。**

---

## 0. 方法与口径

**比对三方**（均为全量，无抽样）：
- 补丁后 DB（基准）：从仓库主 HTML `萌星小学英语_最终合并版.html` 现抽 DAILY_EXPRESSIONS_DB（144 条）/ VOCAB_DB（1567 条）。
- 补丁前 DB（旧版对照）：`~/workspace/content-audit/*.json`。已验证该批快照与 `main_html_backup_pre_T9.html` 现抽结果逐条深相等，快照确为补丁前版本。
- 场景拷贝：`v5/scenes/hd_oral_*.js`（144）的 ITEMS、`hd_mindmap_*.js`（25）的 GROUPS，以数据字面量解析抽取（非正则猜测），解析零失败。

**映射关系**（先验证再比对）：
- oral：场景 `hd_oral_scXX_N` ↔ DAILY 中 scenario_id=SCXX 的第 N 条（DB 数组序）。144/144 以话题名+核心句验证成立（sc14_4 的核心句与补丁后 DB 不符，恰因该句被 EXP_111 改写、场景留旧版——反证映射与「场景=旧版」结论，见 §1.3）。
- mindmap：场景 `hd_mindmap_K` ↔ `mindmap_groups.json` 的 subs[idx=K−1]；叶序 = groups[].ids 顺序。25 幕分组名、叶数与 groups 表全一致（398 叶）。

**归一化与命中口径**（按任务要求明示）：三级命中——逐字相同（exact）/ N1（NFC+引号统一+空白折叠后相同）/ N2（再去全部空白标点、大小写不敏感）。分类规则：
- **一致**：命中补丁后 DB 对应行（任一级）。
- **污染**：不命中补丁后、命中补丁前、且该行确被 T9 改动（补丁前≠补丁后）——即场景携已裁定修正的旧文、DB 已改新文。逐行归因到修正记录 ID。
- **无法对齐**：两版皆不命中（场景自有文本/改写）。
- **实测命中级别**：全部「一致」与「污染」命中均为 **exact 逐字级**，N1/N2 增量为 0——两份拷贝是逐字复制关系，无转写漂移。故下文数字不依赖归一化宽容度。

**比对单位**：
- oral「台词行」= 对话轮次的 EN 行与 ZH 行（以 's' 朗读对为正本；'w' 角色行/中文行是同文双写，已全量交叉核对零不一致）；「框架行」= 核心交际句 EN/ZH + usage_note（每幕 3 行）。'w' 行全量审计无未归类行（144 话题行 + 427 轮次标签 + 427 'w' 中文行均已归账）。
- mindmap「词条行」= 叶（leaf）；按 word / meaning / emoji 三字段分别比对。

---

## 1. B7 · oralBuild 144 幕（内容源 DAILY_EXPRESSIONS_DB）

### 1.1 总账

| 口径 | 幕数 | 行数 |
|---|---:|---:|
| 场景总数 / 可比单位总数 | 144 | 1,286（对话行 854 = 427 轮 × EN/ZH；框架行 432 = 144 × 3） |
| **完全一致**（全行命中补丁后 DB） | **106** | **1,199（93.2%，全部逐字）** |
| **污染**（携已裁定旧文） | **38** | **87（6.8%）** |
| **无法对齐**（场景自有文本） | **0** | **0** |

污染 87 行构成：原位旧文 81 行（对话 70 + 框架 11）+ **已删轮次残留 6 行**（3 幕各携一整轮被裁定删除的对话，EN/ZH 各 1 行——见 §1.3 注）。

### 1.2 归因闭合（污染 = T4 修正集的精确镜像）

- DAILY_EXPRESSIONS_DB 被 T9 变更的条目集合与 T4 修正集 `expressions_fixes.json` 的 42 条 daily_fixes **集合完全相等**；42 条**全部落实**进补丁后 DB（40 条字段改写型 + EXP_016/062/066 中含整轮删除型，删除亦已落实）。
- 42 条记录的文本类变更共 87 行（另有 12 处 scene_type 元数据变更，不上屏、场景无此字段，与污染无关）：**场景携旧侧 87/87，携新侧 0/87**。即污染不是「约半数对不上」的随机分叉，而是 100% 规则分叉：场景 = 补丁前 DB 的冻结拷贝。
- 反向核查同样干净：无一条场景行命中修正集的新文而 DB 未改者；无「同错未修」行（凡裁定变更，DB 均已改、仅场景未跟）。

### 1.3 污染幕清单（38 幕，后续纠错批输入）

轮次记法：dlg0/1/2 = 第 1/2/3 轮；「整轮删除残留」指该轮已被裁定删除、DB 已删、场景仍在播。

| 场景文件 | 记录 ID | 污染行数 | 污染位置 |
|---|---|---:|---|
| hd_oral_sc02_2.js | EXP_004 | 2 | dlg2 EN/ZH（道歉者自说 "That's all right." 角色错位句） |
| hd_oral_sc02_3.js | EXP_005 | 2 | dlg2 EN/ZH（同型） |
| hd_oral_sc02_4.js | EXP_041 | 2 | dlg2 EN/ZH（同型） |
| hd_oral_sc02_5.js | EXP_042 | 2 | dlg2 EN/ZH（同型） |
| hd_oral_sc04_1.js | EXP_088 | 2 | dlg2 EN/ZH |
| hd_oral_sc04_2.js | EXP_089 | 4 | dlg1+dlg2 EN/ZH |
| hd_oral_sc04_3.js | EXP_090 | 2 | dlg2 EN/ZH |
| hd_oral_sc04_4.js | EXP_091 | 2 | dlg2 EN/ZH |
| hd_oral_sc04_5.js | EXP_092 | 2 | dlg2 EN/ZH |
| hd_oral_sc04_6.js | EXP_093 | 3 | dlg2 EN/ZH + usage_note |
| hd_oral_sc04_7.js | EXP_094 | 2 | dlg2 EN/ZH |
| hd_oral_sc04_8.js | EXP_095 | 2 | dlg2 EN/ZH |
| hd_oral_sc04_9.js | EXP_096 | 2 | dlg2 EN/ZH |
| hd_oral_sc05_1.js | EXP_007 | 2 | dlg2 EN/ZH |
| hd_oral_sc06_1.js | EXP_013 | 3 | dlg2 EN/ZH + usage_note |
| hd_oral_sc06_3.js | EXP_015 | 2 | dlg2 EN/ZH |
| hd_oral_sc06_4.js | EXP_016 | 2 | **整轮删除残留** dlg2 EN/ZH（"Thank you. It tastes good." 角色反置收尾） |
| hd_oral_sc06_5.js | EXP_017 | 2 | dlg2 EN/ZH |
| hd_oral_sc06_7.js | EXP_062 | 2 | **整轮删除残留** dlg2 EN/ZH（"It tastes good." 无所指收尾） |
| hd_oral_sc06_8.js | EXP_063 | 3 | dlg2 EN/ZH + usage_note |
| hd_oral_sc07_6.js | EXP_032 | 1 | usage_note |
| hd_oral_sc07_11.js | EXP_071 | 2 | dlg1 EN/ZH |
| hd_oral_sc08_3.js | EXP_025 | 4 | dlg1+dlg2 EN/ZH |
| hd_oral_sc09_1.js | EXP_026 | 5 | dlg1+dlg2 EN/ZH + usage_note |
| hd_oral_sc10_1.js | EXP_018 | 2 | dlg2 EN/ZH |
| hd_oral_sc10_2.js | EXP_066 | 3 | usage_note + **整轮删除残留** dlg2 EN/ZH（"The same to you!" 双重回送填充） |
| hd_oral_sc10_3.js | EXP_101 | 2 | dlg2 EN/ZH |
| hd_oral_sc10_8.js | EXP_134 | 1 | usage_note |
| hd_oral_sc11_1.js | EXP_085 | 2 | dlg2 EN/ZH |
| hd_oral_sc11_2.js | EXP_086 | 2 | dlg2 EN/ZH |
| hd_oral_sc11_3.js | EXP_087 | 2 | dlg2 EN/ZH |
| hd_oral_sc12_1.js | EXP_027 | 2 | dlg2 EN/ZH |
| hd_oral_sc12_2.js | EXP_028 | 2 | dlg2 EN/ZH |
| hd_oral_sc12_3.js | EXP_035 | 2 | dlg2 EN/ZH |
| hd_oral_sc12_8.js | EXP_083 | 2 | dlg2 EN/ZH |
| hd_oral_sc12_9.js | EXP_084 | 3 | dlg2 EN/ZH + usage_note |
| hd_oral_sc14_4.js | EXP_111 | 2 | 框架行 en/zh（核心句本身被改写，场景标题与核心句仍为旧版） |
| hd_oral_sc15_4.js | EXP_053 | 3 | dlg2 EN/ZH + usage_note（含审查后补的 "OK. I will." 悬空句修正，场景未跟） |

污染按话题分布：SC04（问路/指路组）9 幕最重，SC12 5 幕、SC02/SC10 各 4 幕、SC06 6 幕（含 2 个删除残留）、其余散布。病灶与 T4 审查定性一致——绝大多数是第三轮机械收尾句（角色错位/无所指/双重回送），场景原样保留。

**结构附带核查**：427 个 'w' 角色行头像序列与 DB dialogue.avatar 在 141 幕全等，3 幕差异恰为上表 3 个删除残留幕的已删轮头像，非独立问题。对话轮次顺序 144 幕与 DB 全等，无串轮。

### 1.4 场景侧独有内容：无（逐例义务的答复）

任务要求「若场景侧有 DB 没有的更新内容，逐例列出」——**实测为零**：1,286 个可比单位全部命中某一版 DB（逐字），无一场景行是 DB 两版皆无的文本。场景侧仅有生成脚手架（标题行「💬 日常用语 · 话题 · 核心句」、轮次标签「对话第 N 轮」、ACTS 动画键），属表现层而非内容更新。仓库内亦已无第三份拷贝（文件头标注的 src/cases 在现仓库不存在）。

---

## 2. B9 · mindmapBuild 25 幕（内容源 VOCAB_DB + mindmap_groups.json）

### 2.1 总账

| 口径 | 幕数 | 字段行数（398 叶 × word/meaning/emoji） |
|---|---:|---:|
| **完全一致** | **22** | **1,191（99.7%，全部逐字）** |
| **污染** | **3** | **3（均为 meaning）** |
| **无法对齐** | **0** | **0** |

word 398/398、emoji 398/398 逐字一致；meaning 395 一致 + 3 污染。

### 2.2 污染叶清单（3 叶，后续纠错批输入）

| 场景 | 词条 ID | 词 | 修正记录 | 性质 | 场景（=补丁前）释义 → 补丁后释义 |
|---|---|---|---|---|---|
| hd_mindmap_1.js | G1_002 | book | VF-031（分型错误） | 义项缺失型 | 「书，书本」→「书，书本；预订（动词：book a ticket 预订票）」 |
| hd_mindmap_12.js | G2_080 | park | VF-032（分型错误） | 义项缺失型 | 「公园」→「公园；停车（动词：park the car 停车）」 |
| hd_mindmap_13.js | POLY_WATCH | watch | VF-002（事实错误·高） | **假词源入释义** | 「…手表（戴在手腕上随时"看"时间的工具）」→「…手表（戴在手腕上的计时工具；名字来自古英语"守夜、唤醒"——最早的手表是能叫醒人的小闹钟）」 |

其中 watch 叶是错误级（一级来源已证伪的民间词源），book/park 两叶是补全型（旧释义不算错、但缺主要义项）。

### 2.3 波及面限定（为什么只有 3 叶）

- VOCAB_DB 全库被 T9 变更的条目仅 **9 条**；其中 6 条（G3_K48、G4_0425、G4_0451、G4_195、G5_0427、G5_0605）不在导图 398 节点集内，对导图幕零影响。
- 节点集内的 VF 记录共 4 条：上表 3 条 meaning 修正 + VF-028（G1_055，phonetic 字段）——音标不进导图叶格式，**无场景影响**。
- T3 修正集 46 条的其余部分落在 MH_VOCAB_DB（23 条）、WORD_FORMATION/WORD_RELATIONS/HOMOPHONES（12 条）与 VOCAB_DB 非节点条目：MH_VOCAB_DB 是 app 内另一表面（多义/etymology 展示），`gen_mindmap.py` 只读 VOCAB_DB，MH 的 etymology 等字段不进导图叶——与 B9 无关，仅此备注。
- 分组名、分组归属、叶数与 mindmap_groups.json 全等 ⇒ 场景是生成器对补丁前 VOCAB_DB 的忠实产物，无人工改动痕迹。

---

## 3. 单源落点建议

### 3.1 oral：DB 为源（补丁后 DAILY_EXPRESSIONS_DB），新写 DB→spec 抽取器

依据（数据说话）：① 场景零独有内容、零修正，DB（补丁后）是唯一含裁定修正的更新侧，新旧关系单向明确——以场景回灌 DB 只会把 87 行旧错文带回；② 以 DB 为源再生，R1 零丢失自动成立（每条场景行都存在于 DB 两版之一，再生只把被裁定行换成新版）；③ ITEMS 与 oralBuild 同形，字段映射是机械的（话题行←scenario_title+en、核心句行←en/zh、提示行←usage_note、轮次标签由 dialogue 长度生成、角色行←dialogue.avatar/speaker、's' 对←dialogue）。
落地要点（与 T12_plan §4 对应）：先落 G5 抽取器 + G4 oral 校验器（轮次配对、'w'/'s' 双写一致、ACTS 键覆盖），再整批再生；**唯一不能由 DB 生成的是 ACTS**（动画帧键，不在 DB 内）——144 幕 ACTS 须机械抽取、冻结进各自 spec 的 acts 字段，作为表现层资产与内容分离登记。纠错子集即 §1.3 的 38 幕 87 行，再生后以本专项同口径复测（污染应归零）+ 等效校验验收；106 幕干净幕再生前后应逐行等价（本专项基线可直接作比对真值）。

### 3.2 mindmap：DB 为源——且架构已然成立，只差重跑生成 + 一道对齐门

`gen_mindmap.py` 的数据源就是主 HTML 的 VOCAB_DB（经 `gen_mindmap_groups.load_db()` 读仓库根主文件，即补丁后版本）+ `mindmap_groups.json`，**生成链现成且已指向修正后数据**。B9 落地仅需：① 先跑 gen_mindmap_groups 的一致性断言（分组表节点与 DB 对齐）；② 重跑 gen_mindmap.py——§2.2 的 3 叶自动订正，其余 395 叶逐字不变（本专项基线可作等价比对真值）；③ 补 G7 对齐校验器（groups↔VOCAB 叶级 diff，即本专项脚本口径）固化为门禁，并把 mindmap_groups.json 登记进模型层（现仅在 v5 目录）。场景侧零独有内容，不存在回灌议题。

### 3.3 两族共同结论

「哪一侧更新」在两族答案一致且无例外：**DB 侧（补丁后）是唯一更新侧**。分叉形态不是双向演化，而是单向冻结——场景拷贝停在补丁前时刻，DB 独自向前。单源化不需要对账谈判，只需要把生成方向定为 DB→场景并各补一道防再分叉的门禁（oral = G4/G5，mindmap = G7）。本专项的逐行基线（场景×DB 两版命中表）可直接复用作两批迁移的验收真值表。

---

## 附：方法可复现性

- 污染归因链：修正集（T4 expressions_fixes.json / T3 vocab_fixes.yaml）→ 补丁前/后 DB 逐字段 diff → 场景行三方比对，四方数字闭合（oral：93 变更字段 = 81 原位文本行 + 12 scene_type；删除 3 轮 6 行另行对上 change_note 的删除声明；mindmap：9 变更条目 = 3 污染叶 + 6 非节点条目）。
- 中间结果（逐幕命中明细 JSON）留于执行会话 /tmp/b7b9/（results.json / results2.json，临时件，如需归档请示下）。
- 本专项未修改任何场景、DB 或主 HTML 文件；工作区唯一新增为本报告与完成标记。
