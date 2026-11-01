# 表达写作区建模文档（expression.yaml）

- 文件：`laws-prototype/model/laws/expression.yaml`（波次 W5，2026-11-01）
- 挂接：`laws-prototype/model/hitching/expression_hitching.yaml`
- 源：专家规律清单 v6 之 **E 组（15）+ W 组（15）+ NE 组（29）= 59 条**，逐条按 `docs/DESIGN.md` §3 schema 转化
- 区属：全部 59 条 `zone = 表达写作`

## 1. 本区口径

本区与语法、词汇诸区的根本差异：**条目以「功能与操作」为主干，不以词句形式为主干**。E 组是语用功能与话语规则（怎样说得对、说得合场合），W 组是写作机制与课堂流程（怎样把话写成长的、有组织的文本），NE 组是母语国家专家视角（教学侧/设计侧条目居多，多为教师与设计层使用）。三条建模纪律据此确立：

1. **claim 分型以 `tendency` 为默认**。本区 59 条分型：`tendency` 57、`rule` 1、`etymology` 1。语用与写作主张本质是「在某条件下大概率有效/合宜」，不是恒真规则；凡清单口径带条件的（大多数条目），宁可降为 tendency 并把边界写进 scope/exceptions，也不拔高为 rule。
   - 唯一的 `rule`：**E-08**（三问式产出规范——情境问答任务的设计规范，属本 App 内部生产规约而非语言规律陈述，故按 rule 立，证据为清单登记的两个任务例）。
   - 唯一的 `etymology`：**NE-05**（split infinitive 禁令的出身故事，Lowth 1762 / Alford 1864，`claim.source` 字段随条目落位；其本体是「禁令来历」而非现代用法主张，现代口径以配套 tendency 口径呈现在同一 claim 内并标注争议）。
2. **W-11（POA）按裁定默认档 B1 入模**。claim 只收「排序思想」（先试产出、暴露缺口、再给输入）作关卡排序原则；POA 完整流程（驱动—促成—评价）**不作 claim**，只在 `adult` 层登记来历。三档状态（B1 只收排序思想 / B2 简化版试点 / B3 不入模）全部登记于条目 `config_gates.poa`（`current: B1`，注记「裁定未落档」）；`adult.pending` 同步登记裁定未落档与小学适配待验两项。
3. **不自编**。例句与病例只用清单登记者：全区有登记例句的条目 **15 条**，有登记病例的条目 **4 条**（E-02、E-09、NE-08、NE-14）；其余条目 `examples: []` / `error_cases: []`，并在条目 `pending` 中明确标「待补：清单未登记具体例句/病例」，等后续轮次按同一纪律补登，**不从机制文字反推例句、不虚构「真实错误」**。探针库 v1 未覆盖本区，59 条 `probes` 均为空并在 pending 登记待补写（PRB-E/W/NE 预留号段待探针波次统一编号）。
   - quiz 每条 1 道为**自拟理解检查**（题面直接由该条 mechanism 派生，`hint_ref` 指向机制 beat），其性质是教学脚手架而非清单登记材料，与例句/病例的「只用登记者」纪律不冲突，文档在此标明以免混淆。

## 2. 本区菜单谓词（DESIGN §5.1 推导）

表达区没有独立词表，其菜单从词库字段**推导**而非手选（WORDBANK 规则 6：谓词全量呈现，校验查零遗漏）：

| 菜单 | 谓词（词库字段） | 说明 |
|---|---|---|
| 功能短语墙 | `pos_tags` 含 `phr.`（公式语块/功能短语） | E 组条目的例词来源：情景公式、应答程式、求生句的构成词走此菜单全量呈现 |
| 主题词墙（表达向） | `theme_macro`/`theme_sub` ∈ 与本区任务相关的主题（日常交际、情感、学校、食物等） | 与词汇区共用主题菜单，但按本区条目的 `pain_points`（说不出/写不长/读不快）筛任务，不另立词表 |
| 衔接词菜单 | `pos_tags` 含连接功能（conj./连接副词类）+ 条目 W-14/NE-28 登记的时序词集合 | W-14 衔接分诊、NE-28 动作锚点的词面来源；库外词（however/moreover/suddenly 等）先进 pending_words，补词入模后自动纳入 |
| 例词回连 | 本波 `expression_hitching.yaml` | 53 个已入库词逐词 `word → {bank_id, law_refs}`；9 个库外词单列 `pending_words`，补词后回填 |

校验口径：菜单完备性按谓词在词库全量扫描（DESIGN §5.1），本区条目的 examples 只允许引用命中上述菜单或挂接表的词库 id；本波已全量验证 53 个 distinct 词库 id 均真实存在。

## 3. 分组与受众口径

- **E 组（15）**：`audience` 以孩子层为主（12 条孩子层 + 3 条教师/设计层，后者为纯教学侧条目）；儿童版 headline/mechanism 与成人层边界同条呈现；`order` 1–15 沿清单序。
- **W 组（15）**：11 条孩子层 + 4 条教师/设计层（教学机制类）；`order` 16–30。W-11 例外见 §1.2。
- **NE 组（29)**：母语专家视角。17 条教师/设计层（教学法、评估观、专家之争，儿童不直接消费），12 条双层（结论可直接给孩子、成人层同时承载边界与争议，如 NE-03/NE-27/NE-28)；`order` 31–59，`subgroup` 按专家簇登记（Lewis 语块教学、Hyland 体裁与立场、Myhill 语法即选择、悉尼学派、Clay 早期读写、Mercer/Alexander 课堂谈话、Corbett Talk for Writing、Gibbons 支架设计等）。全区受众总分布：孩子层 23 / 双层 12 / 教师设计层 24。
- **出处与接触等级按原登记保留**：NE 各条 `adult.sources` 为清单登记的专家+著作+出处形态，`adult.evidence_grade` 逐条保留清单原口径（原文级/二手论述级/RCT 级/出版社页级/实践框架级等），不升级、不改写；NE-23（Reading Recovery）的长期效应争议按清单全文落入 `adult.disputes`，条目 claim 只立「短期有据、长期未定论」。

## 4. 取舍与待补（全量登记）

### 4.1 材料待补（不自编的代价，逐项在条目 pending 中落位）
- **例句待补 44 条**：除 E-01/E-02/E-04/E-07/E-08/E-09/E-11、NE-01/NE-08/NE-10/NE-11/NE-14/NE-25/NE-28 等 15 条有清单登记例句外，其余条目例句为空待补。
- **病例待补 55 条**：仅 E-02（字面直答）、E-09（No, no 应答误用）、NE-08（propose 搭配误用）、NE-14（shave/safe 事故例）4 条有清单登记病例；error_cases 的 `source_type` 均为清单登记形态，无一条虚构「真实学生错误」。
- **探针全区待补**：59 条 probes 为空，待探针波次按探针库纪律补写后回填编号。
- **scene_spec 全区待补**：白板场景规格不在本波范围，59 条均为 null + pending 登记。

### 4.2 词库待补（9 词，进 hitching 的 pending_words）
`same`（E-08)、`mean`（E-11)、`propose`（NE-08)、`shave`（NE-14)、`however`、`moreover`（W-14)、`fleece`、`kit`（NE-11)、`suddenly`（NE-28)。纪律：先核词、入词库、再回填 law_refs 与各条 word_ids；本波未自造任何 id。

### 4.3 清单登记的待核项（随条目 adult.pending 落位，不静默消解）
- NE-01/NE-02:Pawley & Syder 原文页码为二手转述，入模引文前补核原文。
- NE-14:Hancock 书内分工（最小对立归属章节）未逐页核。
- NE-18:Martin (1999）语类定义出处页完整链接未随检索返回，补核。
- NE-20:R2L 斯德哥尔摩项目效应量未打开原始评估报告——本条未写任何 R2L 效应量，引用数字前补核。
- NE-21:《Exploring How Texts Work》第 2 版出版年未单独核，条目只表述「1990 初版；现行第 2 版」。
- NE-26:Alexander (2020）修订框架未逐项核（本条只用经典五原则）;EEF 对话教学试验效应量未登记。
- NE-27/NE-28:Corbett 原著出版年与版次未打开出版社页核对（三阶段体系本身已以学校定版说明核实）。
- W-11：裁定 B 未落档（默认 B1 已登记）;POA 向小学段迁移的有效性待验。

## 5. 自检结论（2026-11-01 本波脚本与独立复核双验）

- 条数：59 = E 15 + W 15 + NE 29,id 集合精确（E-01…E-15、W-01…W-15、NE-01…NE-29)，无重复。
- 分型合法：tendency 57 / rule 1(E-08) / etymology 1(NE-05,source 已填）;rule 条目有 ≥2 条登记证据，tendency 条目均有 scope 与 exceptions（或明确「无已知例外」的 scope 限定）。
- YAML 可解析（safe_load 复核通过）;zone 全为「表达写作」；全部 examples/error_cases 引用的 53 个词库 id 均在 wordbank.json 中真实存在；挂接表 53 词 resolved、9 词 pending、0 个自造 id。
- 文件大小（落盘复核）:expression.yaml 235,005 B;expression_hitching.yaml 5,056 B；尾行完整。
