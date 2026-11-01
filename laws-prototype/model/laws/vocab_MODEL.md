# 词汇解码区建模文档（W2 波次）

> 对象：`vocab.yaml`（V-01–V-45，共 45 条）+ `../hitching/vocab_hitching.yaml`。
> 依据：`../../docs/DESIGN.md` §3（schema 与分型硬门槛）、`../WORDBANK.md`、`expert-summaries-catalog-v6.md` V 组全文及簇源（catalog_add_etymology / roots_evidence / affixes / polysemy）。
> 建模日期：2026-11-01。状态：45 条全部 `status: 入模中`——硬门槛已过，待补项清零后方可升「已入模/定版」。

## 1. 口径（本波次的定版决策）

### 1.1 分型分布与理由

| claim.type | 条数 | 条目 | 理由 |
|---|---|---|---|
| tendency | 38 | 其余全部 | V 组绝大多数是「有例外的规律性」：词频分布、构词产出性、搭配分工、多义组织等都自带登记例外，符合 DESIGN §3.2 tendency 定义（scope 必填 + exceptions ≥1） |
| rule | 1 | V-34（同化分布） | 唯一可判定对错的分布规则：同化变体由后随辅音唯一决定，evidence ≥1（Crystal / OED 系）+ 3 条 supports 例证（impossible / collect / support，均引词库 id） |
| etymology | 6 | V-23、V-24、V-25、V-26、V-27、V-38 | 词源叙事型条目：同源对、民间词源、假词源、*spek- 词根、借词、假拆分——每条 `claim.source` 必填（来源语、原义、出处），叙事与事实分开标注（`adult.narrative_note`） |
| mnemonic | 0 | — | V 组无纯助记条目；清单中的口诀性说法（如「一词多义像一棵树」）已并入对应 tendency 条目的 mechanism，不单列 mnemonic |

### 1.2 纠正记录（corrections）

清单原稿中已被一手来源证伪/需要降格的说法，**只进条目的 `corrections` 字段，claim 一律用定版口径**。本波次登记 12 条带 corrections 的条目，要点：

- V-22：语义变迁「四律」归属纠正（Bloomfield 只立 degeneration/elevation，四分经 Ullmann；Traugott 是机制不是律）。
- V-23：三连正组定为 ask/question/interrogate，inquire 为同层备选。
- V-27：long time no see 是 OED 19 世纪老词条（非新收）；add oil 才是 2018 年入 OED 者；ginseng 的 man-root 全译降格；「逻辑」是本土音译胜出，非自日语转来。
- V-28：Anglin「2/3」不存在——定版：五年级已认词汇约 40% 形态相关；约 68% 是另一个分母。
- V-29：「6 万词族」不是 Nagy & Anderson 的数字——定版 88,533；「1–3 个派生」改精确均值 1.57。
- V-30：White, Power & White (1989) 是语料分析，不是教学实验——claim 已按此降格表述。
- V-32：「半数不可推」被数据否证——定版 SEM 3–5 约 18–24%、SEM 0–1 约 56–62%；predict 失败主因是黏着根未知（根缺失型），不是 pre-。
- V-33：「14 个前缀 ≈58%」证伪——定版 White, Sowell & Yanagihara (1989)：20 个前缀覆盖 97%，前四（un-/re-/否定 in-/dis-）= 58%，un- 独占 26%；后缀侧前十 = 85%，-s/-es + -ed + -ing = 65%。
- V-38：butterfly 在分割层就是 butter+fly（古英语 buttorflēoge），「不可拆」说法纠正；假拆分重新诊断为三型（不可拆 / 可拆不可解 / 组合失效）。
- V-39：「Graves 1987 四步法」查无——可核经典是 White et al. 六课序列；Baumann 2002 与 2003 两个设计分清，不存在「纯 vs 混合」正面对照。
- V-41：run「645 义项」仅在 OED3 (2011) 最细粒度口径下成立；OED 现行页面自述 245；学习词典口径 46（Fang & Liu 2022），不是「约 30」。
- V-45：run 最高频义项「经营」只在商业语料偏斜的样本成立——定版：两把尺（书面语料频率 vs 学习者产出）确实可因语域分叉。

### 1.3 探针与 scene_spec 的延后政策

- 探针库 v1 只覆盖 8 组 × 5 探针，其中落在 V 组的只有两组：探针库第六组 → V-33（PRB-V33-1..5）、第四组 → V-40（PRB-V40-1..5），按 DESIGN §3.6 的 `PRB-<law>-<n>` 格式映射。其余 43 条 `probes: []` 并在 pending 登记「探针待补写（PRB-Vxx-* 预留）」——**不从其他组借探针、不自编探针**。
- `scene_spec` 仅 V-40 有现成事实表（门/灯/汽车/会议四对象 + 状态与不变式）；其余 44 条登记待补，待动画波次按事实表先行纪律补写。

### 1.4 病例（error_cases）的接地气纪律

21 条有病例，全部来自清单登记的真实来源（CLEC 语料、教学文献登记错型、条目内登记的事故例，如 *open the light、*eat medicine、*inpossible、*breaktion、*refered）。其余 24 条 `error_cases: []` + pending 明示「无清单登记病例，不自编」——宁可空缺登记，不编造中国学生错句。

## 2. 词素拆分规范（morphemes）

挂接表 `vocab_hitching.yaml` 中每个词的 `morphemes` 字段结构：

```yaml
morphemes:
  prefix: "un-"            # 前缀形，无则省略该键
  prefix_gloss: "不/相反"   # 前缀义（同化变体注明原形，如 in- 的变体 im-/il-/ir-）
  root: "happy"            # 词根/词基形
  root_gloss: "高兴的"      # 词根义
  root_bound: false        # true = 黏着根（不能独立成词，如 spect/dict/fer/cept）
  suffix: "-ness"          # 后缀形，无则省略
  suffix_gloss: "状态/性质（名词化）"
  transparency: 全透明      # 全透明 | 半透明 | 不透明（见 §2.2）
  note: "..."              # 可选：同化留痕、选配限制、封存说明等
morphemes: null            # 不可拆 / 不许拆（见 §2.3）
```

### 2.1 槽位规则

- **prefix / root / suffix 三槽**，每槽至多一项；复合词（blackbird、butterfly、smog、brunch）在 root 槽写整词构成（如 `black` + 后段记入 suffix 槽并注明「复合第二成分」；混合词在 root_gloss 注明截取来源）。
- **黏着根**（bound root）`root_bound: true`：spect/spec/spic、dict、port、fer、cept、sist、tract、cur 等拉丁黏着根。这是 V-32 定版口径的关键区分：predict 的失败是「根未知」而非「前缀不可推」，挂接表据此标注。
- **同化变体**：prefix 槽写词源原形（in-/con-/ad-/sub-/ob-/ex-/dis-），prefix_gloss 注明实际变体与触发条件（如「不（同化变体 il-，l 前）」），note 记「双写 ll 是同化留痕」。菜单与教学呈现由原形聚合（见 §3）。
- **组合形**（tele-/bio-/-ology 等新古典拼装件）按槽位登记，note 标「新古典拼装件：零件古、整词近代造」，与 V-32 口径一致。
- **词形登记**：屈折/派生词形（making、stopped、referred、studying 等）可入挂接表，note 必须写「词形登记，归一至 <原形>」；它们不是词库补词候选。

### 2.2 透明度标记（与 N&A SEM 分级对齐）

三档标记与 Nagy & Anderson 语义透明度（SEM）及 V-15/V-32 条目口径对齐：

| 标记 | 对应 SEM | 判据 | 例 |
|---|---|---|---|
| 全透明 | SEM 5（及近 5） | 零件义 + 组合规则可直接推出整词义 | unhappy、refill、readable、unfriend |
| 半透明 | SEM 3–4 | 可拆、组合义成立但需一步引申/专化 | inspect、predict、collect、return、butterfly（分割成立、动机无定论） |
| 不透明 | SEM 0–2 | 组合义不可推：或根义已漂移，或关系不透明 | invaluable、restive 所在类、species、combine、despise |

V-32 定版数字即按此对齐：小学生语料中 SEM 3–5 约 18–24%（可推带），SEM 0–1 约 56–62%。

### 2.3 禁拆名单（morphemes 必须为 null）

以下词**禁止登记拆分**，挂接表以 `morphemes: null` + note 说明，防生成层误拆：

- 假词根型：butter、river（-er 是词干一部分）、corner（非 corn+er）。
- 整词借入/tricksters：uncle（un- 不是前缀）、reason（re- 不是前缀）、unit（uni- 不是 un-）、ingenious、ingenuous、nonsense 以外的 non- 固化词按条目登记。
- 假拆分型：define、detail（de- 不是可拆前缀）。
- 义反型：inflammable（in- 非否定，与 flammable 同义）。
- 组合失效型：understand、undertake（under 取古义，组合不可用——登记历史事实于 note，不登记今义拆分）。
- 同形防假：illusion、immerse、irrigate（in- 向内义，非否定同化）。

## 3. 菜单谓词（词汇解码区，WORDBANK 规则 6）

菜单词集一律由谓词对词库 + 挂接表推导，禁止手选样本（见 `../WORDBANK.md` 规则 6 与 DESIGN §5）：

| 菜单 | 谓词 | 数据源 |
|---|---|---|
| 词根家族菜单（如「看」家族） | `morphemes.root ∈ 家族根集`（spect/spec/spic/spis/skop 归一至 *spek-；dict、port、fer、cept 同理） | 挂接表 morphemes |
| 前缀菜单 | `morphemes.prefix = <原形>`（同化变体自动归并：im-/il-/ir- → in-；col-/com-/cor- → con- …） | 挂接表 morphemes |
| 后缀菜单 | `morphemes.suffix = <后缀>`（-able 活后缀与 -ible 封存后缀分列，判据见 V-36/V-37） | 挂接表 morphemes |
| 透明度菜单（能拆队 / 不能拆队） | `morphemes.transparency = 全透明`（能拆队）；`transparency = 不透明` 或 `morphemes = null 且 note 含禁拆标记`（不能拆队，对应 V-38 三诊室） | 挂接表 morphemes |
| 条目例词菜单 | `law_refs ∋ V-xx` 的全部词（挂接表反查） | 挂接表 law_refs |
| 多义菜单 | 词库 `has_polysemy = true` ∪ 挂接表 `polysemy_marks` 中 action=mark 且已回填者；action=review 的（bank、light）**不进**多义菜单，走分源登记（见 §4） | 词库 + 挂接表 polysemy_marks |

全量呈现校验：词族成员在挂接表逐词列全（如 *spek- 家族 27 词、V-34 同化家族 60+ 词），菜单生成后由校验层比对谓词结果与条目正文的成员数，零遗漏才过（DESIGN §6）。

## 4. has_polysemy 处置（挂接表 polysemy_marks 节）

盘点结论（16 词）：

- **mark（应标 true，词库现未标）**：run、get、take、hold、keep、eye、cause、set——均为 V 组条目实际展开多义/搭配网络的词，待词库下一波回填。
- **review（不走多义标）**：bank（同形异义，两源汇流——应分源登记两个词条）、light（同形异源两棵树，VF-003 已拆分事实——词库现以单条 POLY 处理，两源不得以一条多义标混同，需在词库层裁决拆条）。
- **keep（词库已标，确认无误）**：watch、turn、play、book、fly、draw。

## 5. 取舍

- **入模**：45/45 条全入模，无剔除。清单中证据等级最低的条目（V-12 二手论述、V-28 Anglin 原文未直开）在 `adult.evidence_grade` 与 pending 中如实标注，不降格删除。
- **未采**：清单原稿的伪数字与伪归属（见 §1.2）一律不进 claim；Graves 1987 四步法查无此文，V-39 以 White 六课序列为可核经典替代并登记纠正。
- **延后**：探针 43 条、scene_spec 44 条、病例 24 条（见 §1.3/§1.4）——均为「不自编」纪律下的显性待补，不是遗漏。
- **词形不入例证正文**：examples 的 word_ids 只引词条 id；词形（referred 等）只在挂接表登记并注明归一目标。

## 6. 待补清单（汇总）

| 类别 | 数量 | 说明 |
|---|---|---|
| 补词候选 | 挂接表 339 词中 201 词 `bank_id: null` | 含 V-34 同化家族、*spek- 家族、V-36/37 派生例词等整族缺词；须按 WORDBANK 规则 2 先核验后入词库，其中约 10 个为词形登记（归一至原形，不单独入词条）。代表：inspect、respect、cause、set、price、inquire、interrogate、kingly、regal、visible、credible、government、development、readable、uncertain、unbelievable、incredible、illegal、irregular、refill、disconnect、simplify、modernize 等 |
| 例词 pending_words | 40 个（去重） | 已写在各条目 examples.pending_words，与上行同源，补词后回填 word_ids |
| exceptions 例词 id 回填 | 38 条 exception 暂无 word_ids | 例外所述词多在补词候选中；补词落地后逐条回填，满足 DESIGN §3.2「每条例外自带例词 id」 |
| 探针 | 43 条 | PRB-Vxx-* 编号已预留，待探针波次按五字段格式补写 |
| scene_spec | 44 条 | 待动画波次按事实表先行纪律补写（V-40 已有） |
| error_cases | 24 条 | 只接受真实语料/文献登记病例，不自编 |
| 未决核验 | 6 项 | Anglin (1993) 原文未直开；V-16「约 300 个组合形」统计待核；Graves (1987) 查无（已替代处理）；crayfish 的 cray- 路径待核；typhoon 两线主次未定；ketchup 本字三说并存——全部已在对应条目 pending/disputes 登记，呈现层按「有分歧」口径处理 |
