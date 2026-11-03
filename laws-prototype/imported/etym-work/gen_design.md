# 生成器设计（字段提炼规则，全部锚定来源原文）

## verified 候选门槛
- 在 ETYM_DB 625 内：链 = ETYM_DB 链（已双源核实），其余字段从本次抓到的 etymo/wikt 原文提炼；若本次两源文本都抓不到 → 待核（原因：来源文本本次未抓到，无法补全字段）。
- 不在 ETYM_DB：parsed chain 截到 chain_ok 级，且满足：级数 ≥2，或 =1 且该级为非英语来源且带 gloss；且 morph_ok 可作为复合/派生词的加固（构词部分在 etymo 正文出现）。
- 链只剩 enm 一级且同形无 gloss → 无信息量 → 待核。

## source_chain（旧→新 = ETYM_DB/parsed 链反转）
- lang：英文名（grc→Ancient Greek, la→Latin, LL→Late Latin, ML→Medieval Latin, VL→Vulgar Latin, fro→Old French, xno→Anglo-Norman, onf→Old North French, frm→Middle French, fr→French, ang→Old English, enm→Middle English, gem-pro→Proto-Germanic, gmw-pro→Proto-West Germanic, ine-pro→Proto-Indo-European, non→Old Norse, 其他照 LANG 表英文名首选）
- ETYM_DB 链的 lang 是中文（中古英语/古英语/原始西日耳曼语/晚期拉丁语/古希腊语/原始印欧语…）→ 需反向映射回英文名。
- period：按 lang 的中文时期标签（ine-pro 原始印欧语时期 / gem-pro 原始日耳曼语时期 / gmw-pro 原始西日耳曼语时期 / ang 古英语时期 / enm 中古英语时期 / la 古典拉丁时期 / LL 晚期拉丁语时期 / ML 中世纪拉丁语时期 / VL 通俗拉丁语时期 / fro 古法语时期 / grc 古希腊时期 / non 古诺斯语时期 / 现代捐赠语 → 该语历史时期，不给具体年份数字以免无据）
- gloss：Wiktionary 英文 gloss 的忠实中文翻译（gloss_map 人工词表）；空 gloss 站保留空串（brief 示例外字段不允许缺项，但链内单站 gloss 原文本就常空——ETYM_DB 亦然；notes 里记为规格问题）。

## first_attested（优先级）
1. etymo 正文前 700 字符内的世纪/年份标记（late 14c. / c. 1300 / 1590s / 1839 等），原文照录进字段，如「约 14 世纪晚期（Etymonline 词条原文记作 late 14c.）」。须防误抓：标记须出现在首段词源叙述内。
2. 链首站（最新站）为 ang → 「古英语时期已有」；为 enm → 「中古英语时期见载」；为其他语言（近代借词）→ etymo 首段若有 "from French" 等 + 世纪标记优先用 1；否则按 etymo 首段借入叙述写「近代借入（Etymonline 词条以借词叙述起头，未给世纪）」——若两者皆无 → 门槛失败待核。

## original_meaning
= 词进入英语那一站的 gloss 中译（链最新站优先：enm/ang 站 gloss；若最新站是外语站 gloss 即借入时义）。gloss 空时用 etymo 首段引号义提取（headword 形式后第一处引号内释义）再译。仍无 → 待核。

## semantic_path
- 站点 = 链（旧→新）中带 gloss 的站（meaning=中译 gloss, period=该站 period, how 首站「本义」；其后站：与前站 gloss 相同→「义随词借入/传承，无变化」；不同→「义项转移：由『前义』到『后义』（随借入/传承发生）」）。
- 末站追加今义站：meaning=词库 meaning 首段，period「现代」，how：与 original_meaning 中译相同或互含→「传承至今，无显著跳变」；否则「进入英语后语义继续演变至此（详见首末站对照）」。
- 只有一个 gloss 站时：[原义站， 今义站] 两站。

## mechanism_sentence
由 path 首末站模板生成：有跳变→「语义从『首义』一路转移到『末义』：中间经过 {站数} 站（列出中间义），最终固定为今义。」无跳变→「从{最老站语言}的『义』到今天，核心意思基本没变，是直接传承下来的词。」

## modern_meanings_link
「今义『{今义首段}』与原义『{原义}』：」+ （互含/相同→「同一个意思的直接延续」；否则「已经过上述路径的转移，关系见 semantic_path 首末站」）。

## story_hooks（模板，全部由链数据生成）
- 「最深可追到 {最老站 lang} {form}」
- 「进入英语时的词形是 {最新站 lang} {form}」
- 「原义『{原义}』与今义『{今义}』相差{远/近}」— 远近按互含判断
- 若经 fro/la 等借入：「辗转经过 {中间语言列举} 才进入英语」
- morph_ok 且有 morph：「构词可拆：{parts 拼接}（构词部分经 Etymonline 正文互证）」

## disputes
扫 etymo 首段 + wikt 词源节的未定标记（uncertain/unknown origin/perhaps/possibly/disputed/not certainly known 等）：命中→「{标记摘要}（来源原文措辞：『{原文片段}』）」；注意区分：标记若只针对最深层词根（如 *seǵʰ- 的更早来源）不算本词争议——只取针对本词直接来源的句子。无 → 「无已知争议」。
light 型多词条：etymo 文本含 (n.2)/(adj.2) 等多个词源义项组时，在 disputes 记「来源分列多条（名词/形容词各有来源链），本档取与词库登记词性对应的一条」——实际只对 light 这类少数词成立，靠 etymo 文本含多个 "also from"/分号义项判断太脆弱；改为：人工清单（light）+ 文本含同形异源标记（(n.2) 且链不同）时登记。

## folk_etymology_check
- 任务书点名且在库：posh / golf / news → 读 etymo 原文写排除（以原文为准）。
- 全库扫 etymo 文本含 folk etymology / acronym / false 的词 → 逐词按原文登记。
- 其余：未见流传假词源。

## sources
- Etymonline: url https://www.etymonline.com/word/{slug}（slug = 小写、空格转 -、去撇号；ETYM_DB 的 e 字段优先）
- Wiktionary: url https://en.wiktionary.org/wiki/{词形_下划线}
- detail 标注词条名与「词源小节」。

## evidence_grade
统一「二级双源互证（待一级复核）」。

## 待核原因分类
phrase（词组/词形组/多词条目）/ wikt_no_entry（Wiktionary 无词条或未抓到）/ wikt_no_etym（无英语词源小节）/ etymo_no_entry（Etymonline 无词条或存档无快照）/ etymo_fetch_fail（抓取失败待重试）/ chain_mismatch（两源链对不上）/ chain_no_parse（词源无可解析链/构词）/ chain_too_short（链无有效信息）/ fields_unfillable（链过关但原义/年代无法从原文提炼）
