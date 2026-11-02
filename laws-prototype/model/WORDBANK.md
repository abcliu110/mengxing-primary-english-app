# 词库（Wordbank）· 新 App 数据模型第〇层

用户定（2026-11-01）：**先有词库，其他一切依赖词库。** 词库是新 App 数据模型的根；规律条目、例词、练习、探针、动画台词用词，一律引用词库条目，不许在内容侧另立词表、自创例词。

## 文件

- `wordbank.json` —— 词库本体（机器可读，唯一事实源）。由旧 App 已核查的 VOCAB_DB 机械导出（词是同一批词，数据经全库核查），新 App 独立持有，不与旧 App 共用文件。
- 本文件 —— 结构与规则说明。词条内容的增改走词库本体，不改本文件。

## 规模

建库 1,567 条：教材/课标条目 1,065（G1–G6 + Dolch 别名）、V6 扩展 500、多义专条 2。其中 56 条为动词变形条目（带 `verb_form_of` 指回原形）——属数据层，保留；展示层是否显示由视图规则决定，不在词库层删词。
2026-11-01 覆盖审计后补入 392 条（`ADD_` 前缀），全库现 **1,959 条**；补入词的 `freq_rank` 为 null（库内口径未文档化，不编造）。

## 词条结构

| 字段 | 含义 |
|---|---|
| `id` | 稳定编号（如 `G3_K01`、`V6_学校_54`），内容侧引用词条只许用 id |
| `word` / `phonetic` / `syllables` | 词形、音标、音节划分 |
| `pos` / `meaning` | 词性、中文义（经裁定文本） |
| `theme_macro` / `theme_sub` | 课标主题 / 子主题 |
| `freq_rank` | 词频排名 |
| `sight_type` | 可解码性（decodable / irregular / na），口径见下节 |
| `is_function_word` / `has_polysemy` | 功能词、多义标记 |
| `dolch` / `kebiao_level` | Dolch 分级、课标级别（有则填） |
| `verb_form_of` | 变形条目指回原形词（原形条目为空） |
| `aliases` | 复合词头（如 `be / am / is / are`、`I / me / my / mine`、代词与疑问词组）的可查别名；归一匹配按 `word` 或 `aliases` 任一命中即算在库（2026-11-01 整理时补齐 14 条复合词头） |
| `gpc_patterns` / `morphemes` / `law_refs` | **挂接字段**：入模时由规律层回填——该词命中的 GPC 拼法、词根词缀拆分、所属规律条目编号。建库时留空 |

### `sight_type` 判定口径（2026-11-02 定版）

取值三类，不许留空（空 = 未判定，PHONICS_SOP 步 2 验收口径为「未判定 = 0」）：

- **decodable**：全词字母（组）均可由已立模式 + 位置/弱读规则对位 `phonetic_gb` 平铺拼出。
- **irregular**：至少一段只能靠未立模式或例外对应成立（心词）。
- **na**：不适用单字拼读判定，子类直接记于 `sight_type` 值内（全值写法，自描述）：`na:verb_form`（动词变形条目）、`na:phrase`（短语/多词条目）、`na:proper`（专名/缩略，含月份、星期、称谓）。（判定依据 basis 中同以该子类前缀记，供侧表对账。）

判定顺序与优先级：

1. `phonics_wordsets.json` 的 `heart_adjudication` 有裁定者从其裁定（decodable→decodable；heart / mixed→irregular）——多源冲突以心词裁定为准，优先级最高。
2. `verb_form_of` 条目一律 `na:verb_form`：判定归原形，本条不单独判定（含 said / could / would / does / done 等高频变形，其教学处理由心词屋数据承担，不走本字段）。
3. 短语条目 `na:phrase`、专名/缩略条目 `na:proper`。
4. 其余单字词按平铺检验：以模式登记表（wordsets 169 + hitching 144）为界逐段对位；全段有据 = decodable，任一段无据 = irregular。检验器对已判 GK+ADD 逐词层（984 条）校准一致率 95.4%，残余不一致为已登记的存量异常（见下）。

计入「已立」的范围（由已判集反推，非新立规则）：face 家族常读（ea 两读、oo 两读、ou 四读及多音节 ou→/ʌ/、ear 四读等）；弱读与位置规则（非重读元音弱化、成音节辅音等价与元音脱落、词尾 -er/-or/-ar 弱读 /ə/、w 后 or→/ɜː/、元音前 r 分读、yod 合音与滑音、-ed 三读、双写单读、复合词尾 one 读 /wʌn/ 等）；已裁模式 o→/ʌ/、词尾 -er→/ə/ 正常计入，但 o→/ʌ/ 处于重读 VCe 框架时为例外（done / once / glove，从 one / become 先例）。

不计入（靠其成立即 irregular）：静音字母组合 kn / gn / wr / -mb / -mn / ps- / pn- / pt-（先例 knight / lamb / hymn 等无一判 decodable）；例外读法 ei→/iː/、ie→/e/、ch→/ʃ/、ea→/eɪ/、oo→/ʌ/、单音节 ou→/ʌ/、o→/uː/（do / to / move 家族，hitching 自名 o_uu_irreg）、基词口径的 eigh→/eɪ/（eight / weight 判 irregular；数词派生 eigh 居词中从 eighteen 先例，eighty / eighth 判 decodable——存量张力，登记于销项 uncertain 清单）；未立项字素（uy、ui→/ɪ/、eye、aigh、augh、gh→/ɡ/ 等登记缺口——以登记表为界判定，补立后可翻判）。

复合词按部分判定：部分属元音位置类例外者从 watermelon 先例宽免（waterfall、crosswalk 等判 decodable）；部分含静音字母组合者不宽免（handwriting、climber 判 irregular）。

存量分层注记：口径基准为 GK + ADD 逐词判定层；V6 500 条为整批默认 decodable（未经逐词裁定，含 of / who / people 等已知不合者），不在本口径追认范围。已判集内部个别不一致（如 giggle 词库 irregular 与心词裁定 decodable 并存、ancient 与 efficient 的 ci→/ʃ/ 取舍相反）按心词优先与登记保留原则维持原值，不在本口径处理范围。

856 条空值销项（2026-11-02）：侧表 `~/workspace/sight_fix/verdicts.json` 逐条给值与 basis——decodable 735 / irregular 60 / na 61（verb_form 28 + phrase 8 + proper 25）；两面性条目另列 `~/workspace/sight_fix/uncertain.json`（含倾向与翻判条件）。合并已于 2026-11-02 由收尾合并车道落盘（连同同日用户裁定全收的 uncertain 7 词建条 ADD_0873–0879，全库 2,446 条）：实测分布 decodable 2,203 / irregular 182 / na 61，未判定 = 0。本节与侧表为判定依据。

## 依赖规则（硬规则）

1. **例词必有出处**：任何规律条目、练习题、探针题、场景台词里出现的英语词，必须能在词库中按 `word`（或经 `verb_form_of` 归一到原形）找到。找不到 = 入模不合格，要么先补词入（走核查），要么换例词。
2. **新词先入再用**：内容需要词库外的新词时，先给词库补条目（音标、词性、释义经核查），再在内容里引用。不许内容先行、词库欠账。
3. **一词一源**：同一个词的音标、释义、拼法信息只在词库存一份；规律层的例词展示从词库渲染，不在条目里手写第二份。
4. **挂接单向**：规律层通过 `law_refs` 等字段回连词库；词库不反向依赖任何规律条目的存在与否（删一条规律，词库不受影响）。
5. **校验**：入模校验器须含「例词覆盖检查」——扫描全部内容条目的例词，比对词库，输出库外词清单；清单非空不过关。首轮存量审计见 `~/workspace/content-depth/wordbank_coverage_audit.md`（工作文件）。
6. **菜单全量呈现**（用户 2026-11-01 定）：每个菜单（区）呈现的词，必须是词库中符合该菜单口径的**全部**词，不许只挑几个例词。实现方式：菜单词集不手工挑选，由词库字段谓词推导——拼读区按 `gpc_patterns` 与 `sight_type`、词汇解码区按 `morphemes` 与 `has_polysemy`、语法与小系统区按 `pos_tags` 与功能词标记、表达区按主题与短语标记；各菜单的谓词口径写入该区建模文档评审定版。校验器含「菜单完整性检查」：菜单词集与谓词推导集比对，遗漏非空不过关。前置工作：入模时给全库每个词回填挂接标记（见总账）。
