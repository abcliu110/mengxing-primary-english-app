# 拼读区建模文档（S 组 43 条 + SR 组 9 条）

> 数据集：`laws/phonics.yaml`（52 条）＋`hitching/phonics_hitching.yaml`（144 模式 / 825 词）
> 规格：`docs/DESIGN.md` §3 规律条目 schema v1 ｜ 波次：W1·拼读区（数据补齐总攻·波次 A）
> 原文：`expert-summaries-catalog-v6.md` S/SR 两组定版文本 ｜ 日期：2026-11-01

## 1. 入模口径

- **一条不落**：清单 S-01…S-43、SR-01…SR-09 共 52 条逐条入模；`headline` 与 `headline_kid` 为清单标题句与儿童版**原文照录**；机制正文按清单「机制」段压缩为 beats（成人层全文），儿童话术只挂在每条第一拍（`text_kid`＝儿童版原文），不另编儿童稿。
- **claim.statement 为提炼句**：由清单标题句＋机制首段提炼为一条可判真伪的断言，数字与口径一律用清单定版文本（如 PSC 40 词/32 及格线、ough 常用 8 读全谱 10 读、Hanna 1966 的 17,310 词与 49.9%/36.4%/≈84%/~4% 口径、Clymer 45%/63%、cie:cei≈3:1）。伪数字与被推翻的旧口径**只进 `corrections` 记录，永不进 claim**（全区共 20 条纠正记录）。
- **分型结果**：rule 23 条 / tendency 24 条 / etymology 5 条（S-15、S-16、S-17、S-19、S-21，均已注入 `claim.source`）。本组无 mnemonic 型条目——FLOSS、Cat/Kite 等助记名所指的都是有判据的规则本体，按 rule/tendency 立型，不为凑型造 mnemonic。
- **分型硬门槛自检**（脚本断言通过）：tendency 24 条**全部**带 `exceptions`（非空）；rule 23 条全部带 ≥1 条 `evidence` 且绝大多数 ≥2 组例词；etymology 5 条全部有 `source`。
- **状态一律「入模中」**：全区 `quiz`、`scene_spec`、`mechanism.visual`、`examples.sentence`、`prereq` 五类要素尚未生产（见 §4），没有任何一条有资格标「已入模/定版」。
- **例词口径**：`examples[].words` 与机制 beats 的 `anchors` 词表逐条对照清单原文例词录入；词以**词形字符串**记（大小写保留原形，如 June、April、Kyle），word id 由收官步统一解析（词库规则：例词必须能在词库解析，不能解析的进 §4 待补词候选，不许临时改词库）。
- **顺序**：`order` 为组内序号（S 组 1–43、SR 组 1–9）；区内总序＝先 S 后 SR，由 `group`＋`order` 组合得到。
- **config_gates**：S-09、S-13、S-43 挂裁定 A（发音产出取向，未裁定）开关，默认档 A1（听辨全教、产出只守 LFC 核心）；条目正文不预设裁定结论。

## 2. 本区菜单谓词规范（菜单全量呈现的依据）

词库字段 `gpc_patterns` 的取值＝下述模式 id 全集（144 个，完整成员表在 `hitching/phonics_hitching.yaml` 的 `patterns` 段）。模式 id 格式：`<字素 slug>_<读音 slug>`，如 `ea_ii`（字素 ea 读 /iː/)、`ough_or`、`w_or_er`（w 后 or 读 /ɜː/)、`tion_shun`。

模式族一览（族内模式数）：短元音与 y 8｜/eɪ/ 菜单 9｜/iː/ 菜单与 ea/ie 他读 12｜/aɪ/ 菜单 7｜/əʊ/ 菜单 11｜/uː/ 菜单与 /juː/ 9｜r 控与滑音 16｜双元音组 9｜ough 全谱 10｜ou 全谱 5（另与他族共用 ou_au/ou_uu/ou_oh）｜a 全谱 5｜oo 全谱 3｜辅音组合与软硬音 27｜词尾合同价 13。

菜单谓词（DESIGN §5.1 在本区的落地）：

- **按音查拼法**：`gpc_patterns` 的读音 slug 等于目标音 → 该音的全部拼法菜单（如读音 slug `ii` 的全部模式＝/iː/ 菜单 9 拼）。
- **按字素查读法**：模式 id 前缀等于字素 slug → 该字素全部读法（变脸榜 S-42 的数据形态，如前缀 `ough_` 共 10 模式）。
- **整词菜单**：条目 `examples` 给「例词清单」，`hitching` 给「词→模式＋回链规律」全量表；某模式的成员词＝`patterns.<id>.members`，不得手选增减（成员词全部来自本组条目例词与机制词，无一外加）。
- **sight_type 回填不在本表**：不规则/熟词判定属 S-24/S-25 口径，由收官步按 Dolch 与不规则口径统一判定后回填词库，本波次不逐词预判。

## 3. 取舍与建模决定

- **SR 组以清单 v6 定版为准**：簇源文件（`catalog_add_spelling_rules.md` 等）中的 SR 草案与清单定版编号、内容不一致（如 -ible/-able 分工、Evans 版 i-before-e），一律以清单 v6 的 SR-01…SR-09 定版入模，簇源版本不入模。
- **S-27 的「两班/三班」口径差**：清单标题句按两班（自重/受拉）表述，机制实为三班（自重/前拉/中性）——claim 按机制三班立论，标题句原文照录不改，差异在此登记。
- **error_cases 只收清单实录错型**：S-14（think→sink/fink、词尾削减）、S-43（七项实录错型）、SR-04（*paniced 式后缀错）共 3 条 10 例；其余 49 条标 `待补`，不编造病例。
- **probes 只挂已交付的探针组**：S-36、S-42、SR-01 各 5 个（`PRB-<条目>-1…5`，源自 misunderstanding_probes_v1）；其余 49 条标待补。
- **纠正记录 20 条**：含 PSC 与 ough/ou 计数定版、both 归类、Hanna「166 GPC」归属、Clymer 31% 错挂与 VCV 75% 民俗数降级、SR-01 五职节选口径、SR-03 判据精化、SR-07「不足六成」与 weird 分层纠正等——全部只以纠正形态存在，旧数字不进任何 claim。
- **成人层保全**：清单的出处、接触等级、边界、专家分歧逐条进 `adult`（sources/boundary/disputes/evidence_grade）；学界分歧（如 S-21 Venezky 结构派 vs SWI 词源派、SR-07 官方派 vs Pullum 辩护派）并存登记，不裁定、不删减。

## 4. 待补清单（全区共 358 项字段级缺口 + 11 项内容待核）

字段级缺口（按类计）：`quiz` 52｜`scene_spec` 52｜`mechanism.visual` 52｜`examples.sentence` 52｜`prereq` 52｜`error_cases` 49｜`probes` 49。以上在每条的 `gaps` 字段逐项登记，后续波次（题库/场景/探针生产）按 gaps 领取。

内容待核 11 项（各条 `adult.pending` 原文）：S-21 does 分析措辞级出处｜S-22「第七型」口径｜S-24 LSCWC 无单一原始文献｜S-25 Dolch 成书年 1936/1948 与「50–75%」通行说法｜S-29「166」疑 Carney (1994) 归属｜SR-01 Eide 原书未直开｜SR-05 ow 两读无全词表计量｜SR-07 Cunningham 原始博客未直开｜SR-08 Clymer 原文未直开｜SR-09 VCV 75% 未定位一手计量。

待补词候选 84 个词形（`hitching` 中 `in_bank: false`；按词库规矩须先核查入词库、再回解析 id，本波次不动词库）：真缺词如 ache、alphabet、animate、apply、author、bachelor、cause、course、culture、motion、society、system、symbol、tension、until、wine、wrap 等；派生/屈折形如 buses、cats、dogs、horses、watches、panicking、picnicking、trafficked、frolicking、mimicking、hoping、wanted、says；专名 Chicago、Christian、Japanese、Kyle；短语（非单词，收官步决定拆解或剔除）apple pie、blue-green、icy cold、easy-going；清单点名的库外词 sceptic、hough、mnemonic 在内。

**2026-11-02 补词清零波处置**：`phonics_hitching.yaml` 中 `in_bank: false` 行实测 95 行（本节原记 84 为早期计数，以文件为准），已全部处置——72 词经回查已在词库（补入轮次 ADD_0396–0716 等），`in_bank` 翻 true；余 23 行非真缺词：屈折/派生词形 15（buses、cats、chips、computers、dogs、frolicking、hoping、horses、mimicking、panicking、picnicking、says、trafficked、wanted、watches，逐行 note 登记归一词元与 bank_id）、专名 4（Chicago、Christian、Japanese、Kyle，待词库专名口径裁定）、短语 4（apple pie、blue-green、icy cold、easy-going，非单词条目）。本节待补词候选就此清零；sceptic、hough、mnemonic 三词为清单点名的库外词，未在 hitching 行内，不属本轮处置范围。

## 5. 与清单原文的差异点

1. 字段化拆分：清单的「机制/出处/支撑/边界/专家分歧」五段映射为 `mechanism.beats`（按小节切分）、`adult.sources`（出处＋支撑合并、保留接触等级原话）、`adult.boundary`、`adult.disputes`；无信息丢失性改写，claim.statement 为唯一提炼加工（见 §1）。
2. SR-01 标题句与职能口径以清单定版（Eide 九项原表、五职节选）为准，覆盖簇源草案的另一套职能清单——草案文本未入模任何一句。
3. 例词表的个案合并：同一词在一条内多个小节出现的（如 S-42 的 read 兼指现在时/过去式两读），在 examples 中按读音分组各记一次，hitching 中 law_refs 只记条目一次。
4. 清单正文中的跨条互挂（「见 S-42」「归 SR-05」等）转为结构化 `relatives`；互挂目标以清单 v6 实际编号为准（如位置规则＝SR-05、合同价 -age 读音＝SR-06）。


## 6. 2026-11-02 核查销项（待核债务专项，与模型本体同步）

§4「内容待核」清单处置如下（逐条原文见各条 `adult.pending` / `corrections`）：

- **销项**：S-21（does 词和已经 Bowers 2012 博士论文逐字核对：do + es → does）；S-22（「第七型」口径核清：七型为变体家族，双元音单列为最常见口径，OG 共同体七型表可引）；S-25（Dolch 年份定版：1936 期刊首发 / 1948 成书，两说各有所指）。
- **纠正**：SR-01——Eide 9 职清点原误作「略去三职」，漏列第 8 职「澄清意义」（for/fore、by/bye 等），实为四职；claim、成人层边界与 corrections 已同步修正。
- **终局登记**：S-24（LSCWC 无单一发明人/原始文献，系传统策略家族）；S-29（「166」归属 Carney 未能坐实，维持「疑似」）；SR-05（ow 两读全词表计量研究经两轮检索不存在）；SR-09（VCV 75% 为 OG 教学共同体通称、非实测，出处链止于教学文献）。
- **仍开放**：SR-07（Cunningham 原始博客未直开）、SR-08（Clymer 原文未直开）两项未在本轮处置范围，维持原登记。

## 裁定落地记录（2026-11-02 · 裁定 A）

- 裁定 A 已定版（2026-11-02，用户裁定）：弱读/连读听辨全教、产出只要求 LFC 核心、弱读产出「认识即可」（不练不测）。S-09、S-13、S-43 三条的 `config_gates.ruling_A` 已由门控改写为裁定记录（原门控与默认档 A1 沿革保留在字段内，不删史）；三条的 claim.scope 与 adult.disputes 待裁表述同步落定；S-13 的 adult.pending「练习不设 · 终态登记」转为定版口径（政策条只作呈现、非待裁状态），三条各加一条 2026-11-02 changelog。

## sight_type 空值销项（2026-11-02）

- 词库 sight_type 空值 856 条已逐词判定销项：侧表 `~/workspace/sight_fix/verdicts.json`（decodable 735 / irregular 60 / na 61），判定口径定版于 `model/WORDBANK.md`「sight_type 判定口径（2026-11-02 定版）」节；两面性条目列 `~/workspace/sight_fix/uncertain.json`。合并后全库未判定 = 0，PHONICS_SOP 步 2 验收口径达成（合并落盘由词库车道执行）。登记缺口（uy / ui→/ɪ/ / eye / aigh / augh / gh→/ɡ/ 未立项）随 uncertain 清单保留，补立后相关条目可翻判。
