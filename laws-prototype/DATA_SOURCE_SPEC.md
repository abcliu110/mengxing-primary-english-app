# 数据源规范（单一事实源）

生效：2026-11-03，Stewart 指示设立。本规范约束 laws-prototype 全部数据资产：任何人（包括各开发线与助手）在本项目内新建、复制、修改数据，先查本规范。

## 1. 单一事实源登记表

每类数据只有一个登记在册的事实源。未列入本表的同类数据一律视为副本或归档，不作数。

| 数据类 | 唯一事实源 | 说明 |
|---|---|---|
| 词库 | `model/wordbank.json` | 词的拼写、音标（`model/phonetic_gb.json` 为其配套文件）、词义等以此为准（WORDBANK.md 既有纪律） |
| 规律 | `model/laws_master.json` | 由 YAML 模型 + LAWDATA + 各专区规律合并而成（2026-11-03 Wave 1 建成）；428 图鉴口径以 `model/laws/*.yaml` 为历史源头，合并入总表后以总表为准。派生口径（2026-11-04 小件批）：LAWDATA 的 `exc` 由 `tools/gen_laws.py` 生成时双仓并集派生（lawdata 分仓 exc ∪ yaml 分仓 claim.exceptions 文本投影，见 gen_laws.py 头注第 7 条），⚠️「有例外」徽章跟派生后 exc 走（gen_borrow 同口径），yaml 例外不许再逐条手抄进 lawdata 分仓 |
| 词根词缀 | `model/morph_data.json` | 词根分组/词缀页/构词分类（Wave 2 由两文件内嵌 DATA 合并建成）。家族页落位口径（2026-11-04 小件批登记）：新词落位按成分规则机械归属——整词按词性功能/内容分 wh-func/wh-mono、禁拆按 morph_reason 六类归 ns 页、词形归 fm-form、复合词（自由词第二成分）归 cp-main、前缀/绑根/后缀按页与 misc 分节 head 查表归属、屈折 gloss 定 if 页共置；as-main 同化叠加与历史根分节为策展层不机械补；无页无分节的成分（如 kilo-）与口径未定类（如 form 类名词复数的页落位）进待判清单，不擅自判 |
| 词汇（词页与各区用词） | `model/words_master.json` | 词页、拼读词卡、词根词表、词源词表的用词并集（Wave 3 建成）；与词库冲突时词库为准 |
| 拼读 | `model/phonics_master.json` | 模式、成员、检查点的合并总表（Wave 4 建成）；词卡内容（音标、释义）不单独存放，生成时从词汇总表/词库带出 |
| 拼读·按字母查索引（PHX_LETTERS） | `model/phonics_master.json` + `model/wordbank.json`（派生，无独立事实源） | 2026-11-04 按字母查并入波登记：主文件 `const PHX_LETTERS`（26 字母 × 读音索引）由 `tools/gen_phonics.py` 随 DATA 一并生成（`--check-letters` 单独门禁）——字母 L 的模式 = 字素以 L 开头的模式（DATA 展示序即课程序），读音按来源模式首现序全列、不分主次（Stewart 裁定）；词表 = 供词模式成员并集经词库解卡（id 精确命中优先、`#n` 剥后缀命中族条目、按词形去重、逐词标来源字素），直词条卡面运行时取 DATA.bank（生成时断言与词库 GB 面全等）、族条目卡面随索引内嵌。呈现为拼读区模式切换「按课程学 \| 按字母查」三级视图（字母墙 / 字母页 / 读音页，手写渲染器为代码非数据）。不得手改内嵌副本 |
| 拼读·按读音查索引（PHX_SOUNDS） | `model/phonics_master.json` + `model/wordbank.json`（派生，无独立事实源） | 2026-11-04 维度视图并入波登记：主文件 `const PHX_SOUNDS`（58 音 × 拼法组索引）由 `tools/gen_phonics.py` 随 DATA 一并生成（`--check-sounds` 单独门禁）——PHX_LETTERS 的同源镜像，分组键反转为音素→字素组（同字素同读音多模式聚合、词表并集去重、逐词标来源模式 id），解卡/卡面口径与 PHX_LETTERS 行完全一致；音标墙按音标符号机械分区（单元音/双元音/辅音），生成时硬断言 58 音/168 组、/eɪ/ 8 拼法 245 词且 a 系子集恰 224 词（与字母查镜像对账）；例句不内嵌、运行时按来源模式回 DATA.patterns 取 exs。呈现为拼读区三段切换第三段「按读音查」三级视图（音标墙 / 读音页 / 拼法页，手写渲染器为代码非数据）。不得手改内嵌副本 |
| 词汇维度索引（VOCAB_DIM：主题查/级别查） | `model/wordbank.json` + `model/words_master.json` + `imported/wordlist-snapshots-2026-11-03/wordlist-census-2026-11-03.json`（名单快照，本波登记为名单事实源；派生，无独立事实源） | 2026-11-04 维度视图并入波登记：主文件 `var VOCAB_DIM` 由 `tools/gen_vocab.py` 生成——主题查只用 wordbank.theme_sub 字段原值（25 真主题 2,248 词；15 个补入波次标签值共 694 词归「暂未分主题」按原标签分组如实呈现，不改名、不猜补；墙面分区由 theme_macro 派生并断言每主题真 macro 唯一）；级别查 = 名单快照（Dolch/Fry 编号表/YLE，归一与定级逐字沿用填词波普查 census 口径）∩ 词库（word 精确或 aliases 通道），「有词页」= words_master.vc 非 null；生成时硬断言命中表 Dolch 315/315/287、Fry 962/962/640、YLE 1179/1179/964。**Fry 口径登记**：以编号表分段为准，普查并集 995 中的 PDF 补集 33 词（7 词手工定段仅存普查脚本源码、26 词无分段，快照未存）不收；如需并入须先把补集词表存成快照资产再重跑生成器。呈现为词汇解码区首页两张入口卡开的新视图（主题墙/级别墙 → 列表两级，手写渲染器为代码非数据；有词页的卡走 VC.openByBank 进既有词页）。不得手改内嵌副本 |
| 错句反查索引（ERRIDX） | `model/laws_master.json` + `model/contrast_pages.json`（仅取辨析页律集合标记；派生，无独立事实源） | 2026-11-04 维度视图并入波登记：主文件 `var ERRIDX`（363 条病例索引 + 212 律简要卡）由 `tools/gen_errors.py` 生成——病例逐律三路汇合（lawdata.cases / yaml.error_cases / 专区 zone.data.errors，先到先得、律内按 norm(wrong) 归一去重），生成时硬断言总数 363、覆盖 212 律、来源 116/111/136（2026-11-04 专家对照修复波自 334/206/109/89/136 更新：病例归属回填 +29、三源影子副本卫生删除 95 条不改保留集）；diag 一律原文照录（白话改写属内容波，另行处理）；wrong 不含英文字母的 55 条判为教学法条目、呈现层只在成人层显示（分流口径）；辨析页跳转由呈现层读 CONTRAST.byLaw 现行数据、索引内只存标记不存第二份。呈现为首页学习工具区第六张卡「错句查规律」开的新视图（家族分组索引 + 关键词过滤 → 详情卡，「去看这条规律」走 LINKGO.openLaw，手写渲染器为代码非数据）。不得手改内嵌副本 |
| 词源 | `model/etymology.json` | 已是单一源；刷新通道 `tools/refresh_et.py`（2026-11-03 自归档区迁回，引擎 `tools/gen_et.py`，带断言与 --check 门禁）；归档区同名脚本仅作历史保留，不作通道 |
| 动词 | `model/verb_*.json` 等模型文件 | 事实源如左登记；主文件 VB 模块内嵌**尚未生成化**（无 gen_verb，属 Stewart 自有车道，待后续波次），不得视为生成副本 |
| 介词 | `model/laws/prep_*.yaml` + `model/prep_family*.json` | 事实源如左登记；主文件内嵌与区内静态 HTML **尚未生成化**（无 gen_prep，属 Stewart 自有车道，待后续波次），不得视为生成副本 |
| 口语对话与拍手歌 | `model/spoken_data.json` | 2026-11-03 新登记：老 App 口语资产（DAILY_EXPRESSIONS 144 条/16 场景、ORAL_12_SCENES 12 组、GRAMMAR_CHANTS 8 首）按借鉴清单 A1/A3 逐字提取保全；提取通道 `tools/extract_spoken.py`（带计数与逐条深比断言），主文件口语区内嵌为生成副本（`tools/gen_spoken.py`）。2026-11-04 小件批补：scene_qa 12 组带稳定 id（SQ-01…SQ-12，extract_spoken 按源序派生、非源字段），LINKIDX 问答词锚（gen_links 的 q 段）以此为键 |
| 借鉴呈现（王牌/天坑） | `model/laws_master.json`（派生，无独立事实源） | 2026-11-03 借鉴呈现波登记：主文件 `var BORROW`（王牌速查 15 卡 + 十大天坑榜）是规律总表的**派生呈现**，由 `tools/gen_borrow.py` 生成（选条表与聚合规则在生成器内，天坑榜带冻结断言）；词页 WEXTRA（档案卡 + 词级徽章旗）同理由 `tools/gen_words.py` 自 words_master 三分仓派生。两者均不得手改内嵌副本 |
| 规律互动题集 | `model/laws_master.json` + `model/verb_forms_completion.json` + `model/verb_error_cases.json` + `model/wordbank.json` + `model/ta_exercises.json`（派生，无独立事实源）＋主文件 TN 内嵌 WINS 段（只读解析通道，见说明） | 2026-11-03 互动集成波登记：主文件 `var INTERACT`（D6 传送带 / D2 时间窗 / D24 拔河三件操作台题集，各 150 题，含错因解析文案与出处字段）由 `tools/gen_interact.py` 生成，组题规则与原型手工工位定版表在生成器内，逐字文案带源内子串断言。其中 TN WINS（现在完成时实验室 5 窗）无 model 事实源文件：时态（TN）模块内嵌**尚未生成化**（同「动词/介词」行口径），生成器按 `extract_review_data.py` 先例只读解析主文件内嵌段，WINS 被改动时逐字断言立即报错，不静默漂移。不得手改内嵌副本 |
| 选项级反馈（阶段3 试点） | `model/laws_master.json` + `model/verb_error_cases.json`（派生，无独立事实源） | 2026-11-04 阶段3 登记：主文件 `var RV_FEEDBACK`（错选项↔病例对齐表：试点 13 律 15 题 17 条）由 `tools/gen_feedback.py` 生成——对齐口径 M1 整句等值/M2 填空还原/M3 差分词自动强对齐，M5 句级错形与 M4 弱对齐一律逐条人工核验登记（VERIFIED/EXCLUDED/REWRITES 表在生成器内），why 为病例 diag 的孩子白话改写、无登记者不进表且生成报错；复习区答错时呈现，题池/判答/盒子不动。不得手改内嵌副本 |
| 全册规律名册（ROSTER） | `model/laws_master.json` + `model/morph_data.json`（派生，无独立事实源） | 2026-11-04 名册波登记：主文件 `var ROSTER`（456 条：显示名/家族/层级/呈现路由/改名合并归一）由 `tools/gen_roster.py` 生成——户口取总表，路由按现行 LAWDATA（基础字面量+PHONLAWS+SUPPDATA 合并口径）与专区在册解析（与 gen_links 同通道）；家长地图与总地图的「暂未配练习」清单改读名册，旧编号由现行条目代表不重复列，App 内无律页的 20 条（P 层 19 + CO-17）如实标「暂无讲解页」。不得手改内嵌副本 |
| 规律补题（RV_GENQ） | `model/morph_data.json` + `model/wordbank.json`（派生，无独立事实源） | 2026-11-04 补题波登记：主文件 `var RV_GENQ`（S-44 屈折三读选择题 40 道）由 `tools/gen_questions.py` 生成——材料为 S-44 登记页（if-plural/if-past）成员词与词库屈折形条目，答案由词库实证音标尾音决定并与本律规则交叉核对，逐词断言（拼写合规/-ed 规则派生/音标可切分/规则一致）不过即跳过登记；复习引擎 srcGenQ 适配器接 SOURCES 末尾，旧题一字不动、新题只追加。/ɪz/ 类因咝音尾词形未入词库为 0 题，缺口如实登记待词库车道补词形条目 |
| 机制图式卡（SCHEMA_TA） | `model/laws_master.json`（TA yaml 分仓，内容） + `model/schema_cards.json`（结构规格） | 2026-11-04 学习阶段4 首件登记：主文件 `var SCHEMA_TA`（TA 18 律静态机制图式卡数据：axis 时间轴 / panels 分栏对照 / grid 矩阵 / path 路径四原型）由 `tools/gen_schema.py` 派生——内容（机制/例句/病例）取总表 TA 分仓，结构（原型、几何、内容下标引用）取 schema_cards.json；规格内一切字面量标签逐片段断言 ∈ 该律自有材料，例句/病例正文一律下标拉取不许手抄，后续家族推广沿同一规格文件加条。呈现由主文件手写渲染器 `window['SCHEMA_TA_RENDER']` 绘内联 SVG（sage 色板），VB.openTA 一行钩子在机制段后、例句段前调用；渲染器为代码非数据。不得手改内嵌副本 |
| 辨析对照页（CONTRAST） | `model/laws_master.json`（lawdata 分仓，内容） + `model/contrast_pages.json`（结构规格） | 2026-11-04 辨析型新建波登记：主文件 `var CONTRAST`（种子批 9 页易混规律对照页：对照呈现/分水岭/天坑病例三段，文本已按下标拉实 + byLaw 反查表）由 `tools/gen_contrast.py` 派生——律对必须在总表 relations_teaching 登记为「对照」，双方短名逐片段断言 ∈ 该律自有材料，例句/病例正文一律下标拉取不许手抄，材料缺段（如双方均无病例）在规格里 pit=null、页面如实标缺不凑。呈现由主文件手写渲染器 `window['CX']`（.cx-scope，sage 色板）绘索引页 `#v-contrast` 与对照页 `#v-contrast-detail`，入口挂语法/词汇/表达/冠词四区目录与 LINKGO.relSectionHTML 的「⚖️ 辨析页」组（CX_HOOK 钩子，全页面类型共用）；渲染器与钩子为代码非数据。未成页的对照律对及原因见当波报告（介词 PB/P 属 Stewart 自有车道、NE-04 为教师层门禁、GR-16 枢纽三对为双视角无分水岭等） |

## 2. 新数据准入

1. 新建任何数据前，先查 §1 登记表：同类型已有事实源的，只能向事实源添加，**禁止另起一份平行数据**（包括以「原型」「临时」「新版」等名义）。
2. 确属新类型：先在本表登记（数据类、事实源路径、维护方式），再建数据。
3. 独立原型文件是验证工具，不是数据源：原型里的数据在集成时并入事实源，原型自此冻结并按 §5 归档标记。禁止从已冻结原型往 App 回灌数据。

## 3. 副本与生成纪律

1. App 主文件（`mengxing-prototype-v1.html`）与各独立文件中的内嵌数据一律是**生成副本**：由生成脚本从事实源产出，并带生成标记（源文件、脚本、生成时间）。
2. **禁止手工编辑生成副本。** 改数据只改事实源，然后重新生成。历史上「手抄进 HTML」是漂移、过期、静默回退（词源 123235a 事件、拼读词表过期 d82fcf0、词卡音标漂移）的共同来源，一律杜绝。
3. 同一内容在两个文件里各存一份生成副本是允许的（如词根数据同时生成进主文件与 morphology 独立文件），前提是两份都由同一脚本从同一事实源生成，且 §6 校验能证明其一致。

## 4. 冲突裁定顺序

同条数据在多处内容不一致时，按以下顺序判对错，正确的合入事实源，错误的丢弃（Stewart 2026-11-03 定）：

1. Stewart 的较新裁定胜过旧说法（如 GR-36「脱帽」改箭头口径）。
2. 有明确出处的胜过新拟的。
3. 与事实源（词库、图鉴原文）一致的胜过漂移的。
4. 三条都判不了：登记进待裁清单，交 Stewart 裁定，不许猜、不许静默选边。

不打架的互补内容全部保留（并集），不许整份二选一丢掉一方的独有内容。

## 5. 命名与归档

1. 快照、交付件、旧版本必须在文件名或所在目录名中标明「归档/快照 + 日期或版本」，**禁止与现行事实源同名**（教训：旧词源交付快照与真源同名，一度构成回退陷阱，现已入仓 `imported/etymology-delivery/` 并在该区 README 明标过期）。
2. 归档区：`imported/`（2026-11-03 全量入仓的 workspace 资产）。归档内容不参与任何生成与引用。

## 6. 校验门

数据类提交前必须过对账校验（脚本随合并波次入仓，置于 `tools/`）：
- 事实源与各生成副本的计数一致、应同源的副本逐字节一致；
- 成员类数据验成员也验内容字段（教训：拼读刷新只验成员、漏了内容，4 张错音标卡混入）；
- 文案中的计数口径与事实源实测一致。

统一入口：`tools/check_all.py`（一键跑全部 gen_* --check + check_morph_sync + check_upstream）。上游对账（`tools/check_upstream.py`）验「上游源头 ↔ 总表分仓」五条链（YAML/wordbank/phonetic_gb/wordsets/checkpoints），与 gen_* 的「总表 ↔ 内嵌」互补，缺一不可。

校验不过，不得提交。

## 7. 例外登记

破例必须登记在此，不许默默存在：
- 拼读词卡中有 13 个词不在词库（whom、itself、am、is、are、be、a、an、how many/how much/how old/how tall/how heavy 等功能词与疑问短语）：属教学必需的功能词例外，卡面内容以图鉴/词典口径为准，登记备查。
- C-14 与 GR-15（a/an 两条）为目录内双登记：Stewart 已裁定暂不合并，总表中保持两条并登记关系。
- V-39 仅有解码区一份（无专区注册）：七条词缀规律待遇不对称系历史形成，登记备查。
- TEC-* 为外部 id 空间（2026-11-03 知识联动阶段 1 登记）：技巧区自有户口，不入 laws_master；VC 词行 law_refs 中 363 条引用指向 89 个 TEC-* id，LINKIDX 对其不建链（词页按既有口径灰显只登记编号），计数由 tools/gen_links.py 每次生成时登记。
- morph_class 判类口径扩充（2026-11-03 词库缺口全补波登记，Stewart 当日确认）：名词复数可归 `form` 类（以「基形 X · 复数（链登记）」登记与基形挂链）；此前 form 类仅有动词形与 13 个功能词例外，本口径自本波 56 个名词复数起生效，后续补词同此办理。
- 例句变式表口径（2026-11-04 学习改善阶段 2 登记）：规律例句补齐执行 `docs/variation-spec.md`——每律先定变式表（可变维度/不变内核/边界）、例句 ≥10（小律按实有维度铺满并注明）、分组呈
...[truncated 197 chars]：phonics_master checkpoints.addendum 自带注记——entries/units 覆盖对账仍为 2,287 条基线，GP-o-ʌ/GP-er-ə 两池按当时词库 2,352 条推导，与现行词库 2,473 条不同基。已核对：分叉来源是两池新建时（2026-11-02 裁定）的推导基数与旧覆盖对账口径不一致，非数据错误；48 站检查点本体已按现行 167 站主线与定版词池全量重算对齐（check_upstream 链 e 常设核对）。处理：接受现状，addendum 注记原文保留作历史记录，不再视为待裁分叉；基线口径如需统一，另行立项。

## 8. 变更本规范

本规范的修订须经 Stewart 确认；数据类裁定（§4 第 4 项的待裁清单处理结果）回写本规范或对应事实源的登记说明。
