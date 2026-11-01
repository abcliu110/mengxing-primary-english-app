# 小系统区建模文档（small_systems_MODEL.md）

- 数据文件：`model/laws/small_systems.yaml`（63 条，波次 W4 / 数据补齐 D，2026-11-01）
- 挂接表：`model/hitching/small_systems_hitching.yaml`（148 词）
- 来源：专家规律清单 v6 的 P 组（介词系统，19 条）+ PB 组（介词专著与图式层，13 条）+ C 组（可数性与冠词，20 条）+ PR 组（代词系统，11 条），逐条按 DESIGN.md §3.1 schema 入模。
- 区属：小系统。状态：63 条全部为 `入模中`（原因见 §6 待补清单：逐字病例与探针未收口前不升 `已入模`）。

## 1. 四组建模口径

### 1.1 P 组（介词系统，P-01～P-19，order 1–19）

- 总纲口径：一个介词 = 一张原型图（空间图式）+ 一张有原则的亲戚网（辐射式多义网络）。每个空间介词条目以原型场景立条，延伸义按「哪条边长出来的」登记，不用「一词多义清单」式平铺。
- 出处纪律：专著层出处逐条保留在成人层——Lindstromberg《English Prepositions Explained》、Brugman/Lakoff 的 over 网络分析、Herskovits 的理想意义/功能偏移、Dirven 的空间关系分类；分歧（如 over 的义项切分粒度）登记在 `adult.disputes`，不静默裁定。
- 教师侧条目（P-18 及部分框架条目）：`headline_kid` 明标「（教师侧条目，不上儿童屏）」，儿童层不渲染其标题句。
- 场景规格：仅空间核心五条带 `scene_spec`（P-03 in、P-04 on、P-05 at、P-06 over、P-08），其余条目的场景规格列入待补（§6），不在本波次臆造。

### 1.2 PB 组（介词专著/图式层，PB-01～PB-13，order 20–32）

- 本组是 P 组的「证据与教学法层」：图式教学、专著论证与接触等级（目录+书评级 / 二手系统论述级 / 章节预览级 / 一手原文级）逐条原样保留在 `adult.evidence_grade`，不升格、不降格。
- 教师侧条目（PB-01、PB-03、PB-05、PB-06、PB-07、PB-08、PB-09）同 P 组处理：儿童屏不上标题，pain_points 可为空。
- PB-04 的例句因 against 未入词库，改用 through 同型句（该替换已在条目内注明）；PB-13 例 2.2 用 "You are careful at English." 替代清单的 "good at math" 结构（math 未核），已在条目 boundary 注明。
- 未裁定点：PB-10 的功能层归属（属介词图式层还是独立的功能层）在清单中未定，本波次保留原组归属并在该条 pending 登记，不擅自裁定。

### 1.3 C 组（可数性与冠词，C-01～C-20，order 33–52）

- **Boundedness 识解口径（本区硬口径）**：可数/不可数的总开关是「识解」——同一个东西被看成「一个个」（有界单位、可复制）还是「一摊/一类」（无界质料、整类打包），语法待遇（a、-s、many/much）随看法翻转。**已被证伪的「物理边界」讲法（有边/没边、摸得着边界）禁用**，不得在任何条目的儿童层或成人层复活；抽象名词（C-15）同理走「一类事」的抽象域识解，不用「没有形状」说。
- 总开关 C-01 定型为 tendency 而非 rule：识解是说话人的选择（同一名词可双生活，如 chicken），不是词的固有属性；配 scope（指称域的默认识解）+ exceptions（双生活词、词条级约定）入模。
- 冠词线口径：a = 引介新指称（C-06），the = 假定听者可定位（C-07），五路定位线索（C-08），选择本质是替听者算账的给定性等级（C-19，Gundel et al. 1993 + 2010 复制验证）；错误按漏用/滥用/替换三型分诊（C-20），只用登记病例。
- 类指（C-13）：a tiger / the tiger / tigers 三形式非自由变体，以谓词测试立界（*A tiger is endangered → The tiger is endangered 为登记病例）；the 类指只登记、高年级内容，不推翻 C-07 主读法。
- a/an（C-14）定型为 etymology（本区唯一）：源出古英语 ān「一」，判据是读音不是字母；university 已入词库（ADD_0699），其例已回填（§6）。

### 1.4 PR 组（代词系统，PR-01～PR-11，order 53–63）

- 框架口径：代词首先是关系词（个人/社会指示 + 身份建构，Mühlhäusler & Harré 1990），不是「代替名词的词」；人称是范畴家族（Siewierska 2004，700+ 语言），英语是其中最朴素的实现。
- 分歧处理：PR-10（天气 it）为重大分歧条目——Bolinger 环境说 vs Quirk prop it 说并列登记于 `adult.disputes`，教学主读法取 Bolinger，学术胜负不裁；本条因此定型 tendency。
- 引文销项：PR-11 的「Chen (2004) 17.65%」经核定原始出处为未出版硕论，已按销项规程处理——入模引用改用已发表的 Dong & Jia (2011) 数据（口语 6.47% / 写作 15%），硕论数字只在成人层登记备查。
- 迁移线：PR-08/PR-09 以 Li & Thompson 话题突出框架 + Schachter & Rutherford (1979) 功能迁移立条；突出性按连续统勘误登记（教学用二元机制、成人层留档）。

## 2. 分型统计与定型决定

| claim.type | 条数 | 说明 |
|---|---|---|
| rule | 39 | 机制明确、例外可枚举者 |
| tendency | 23 | 见下方降格理由四类 |
| etymology | 1 | C-14（a/an），带 source，通过硬门槛 |
| mnemonic | 0 | 本区无口诀型条目 |

tendency 降格理由（逐条已在条目内以 scope + exceptions 落实）：

- 识解选择型：C-01（总开关）、C-16（集合名词轮廓切换）——结论随说话人取景而变，且带方言参数（英/美）。
- 分歧未裁型：PR-10——两派并列，教学只立主读法。
- 加工/分布型：PR-06（可及性定价）、PR-08（话题突出倾向）、PR-11（he/she 口头/书面分布）——陈述的是系统倾向与概率分布，不是个体必然。
- 介词侧的延伸义覆盖度型（P 组与 PB 组若干条）：辐射网络的延伸边是「多半如此」的家族相似，不可作硬规则陈述。

硬门槛自检（脚本核验，2026-11-01）：YAML 可解析；63 条 = 19+13+20+11；order 1–63 连续唯一；tendency 23 条全部带 scope 且 exceptions ≥1，statement 无绝对化措辞（绝不/从不/永远不/完全不 零命中）；etymology 带 source；rule 全部 ≥2 条 supporting 例句且例句覆盖 ≥2 个 level；全部 word_ids（145 个不同 id）在 wordbank.json 中可解析；quiz 的 answer 均在 options 内且带 hint_ref 指向 mechanism 节拍。

## 3. 本区菜单谓词（系统词全量推导口径）

按 WORDBANK.md 规则 6，本区四个系统词菜单一律由词库字段谓词推导，不手挑（2026-11-01 实测自 wordbank.json，1,959 条）：

| 菜单 | 谓词 | 实测条数 |
|---|---|---|
| 介词 | `pos_tags` 含 `prep.` | 38 |
| 代词 | `pos_tags` 含 `pron.` | 56 |
| 冠词 | `pos_tags` 含 `art.` | 2（a / an 合条 G1_K01、the G1_K02） |
| 限定词 | `pos_tags` 含 `det.` | 31 |
| 功能词总集 | `is_function_word = true` | 65 |

推导说明：pos_tags 为多值字段，一词可同属多类（如代词与限定词的交叉形）；别名（aliases）参与解析——复合条目（如 V6_核心_0「I / me / my / mine」）的别名形（me、my、mine）在挂接与菜单渲染时归一到主条目 id。冠词菜单只有 2 条是词库的既定合条方式（a/an 同源同条，见 C-14），不是遗漏。

## 4. 挂接表生成法

`small_systems_hitching.yaml`（148 词）由两层合并生成，脚本可重跑：

- 反演层：遍历 small_systems.yaml 全部条目，凡 examples、mechanism anchors、claim exceptions 中实际引用的 word_id（共 145 个不同 id），逐词回挂 law_refs。
- 系统词精选层（subject_refs）：以该词为主题的条目单独标记——in→P-03、on→P-04、at→P-05、a/an→C-06/C-14/C-19/C-20、the→C-07/C-13/C-19/C-20、I→PR-02、we→PR-03、you→PR-04、he/she→PR-11、it→PR-10、many/much/few/little→C-17、chicken→C-17。此层补上反演层抓不到的主题关系（如冠词条目未在例句中以 word_id 出现）。

校验：反演层 145 词无一遗漏；全部 law_refs 在本文件内可解析（零悬空）。

## 5. 例词与病例纪律（本波次执行情况）

- 例词：只引词库 id；例句中未入词库的词只允许出现在登记原句里并在 scene_note/pending 中点名（如 C-13 的 stripes、P-16 的 along 原句），不作 word_id 引用。
- 真实登记病例 5 条：C-03 与 C-15 共案（*an information）、C-09 与 C-20 共案（I saw the dog yesterday. 的滥用型）、C-13（*A tiger is endangered，谓词测试）——独立错型 3 个，均为清单成人层明载的星号形式。
- 其余 58 条的 error_cases 为占位形 `{status: 待补， error_type, note}`：错型与机制多已登记，逐字病例待补录，**不自编**。
- 探针：已挂接 5 条（探针库 v1 Boundedness 组，编号于 W7 正式定号）——PRB-BND-1→C-01、PRB-BND-4→C-02、PRB-BND-2→C-04、PRB-BND-3→C-17、PRB-BND-5→C-18；其余 58 条 probes 为 [] 并在 pending 注明「误解探针待补（W7 收口）」。

## 6. 待补清单（收口波次处理，本波次不臆造）

1. ~~词库缺词~~ **已清零（2026-11-02 补词清零波）**：原列 27 词逐词回查——26 词已在词库（beer ADD_0427、below ADD_0428、along ADD_0404、against ADD_0400、university ADD_0699、ladder ADD_0559、tunnel ADD_0691、crowd ADD_0471、wedding ADD_0710、bride ADD_0433、moment ADD_0578、paragraph ADD_0595、tummy ADD_0690、blanket ADD_0432、trouble ADD_0689、sand G4_0977、other ADD_0593、another ADD_0410、same ADD_0630、ready ADD_0614、end ADD_0497、hate ADD_0523、yummy ADD_0718、stripes→stripe ADD_0661、knowledge G6_0627；hands 为 hand（G3_118）复数形归一），仅 meeting 为真缺词，经 Cambridge 核验补入（ADD_0782）。回填已落地：P-13 below 例句补入、P-16 along 回填 word_ids、PB-04 against 例句补入（不再以 through 暂代）、PB-12「at the meeting」例补入、C-14 a university 例补入、C-13 stripes 回填 ADD_0661、C-15 knowledge 例外例回填 G6_0627、C-02 sand 回填 G4_0977，相关 pending 与注记同步改写。
2. 逐字病例 58 条（见 §5），来源限于 CLEC 等已登记语料与课堂实录补录。
3. 误解探针 58 条，W7 收口时统一编号并回挂。
4. scene_spec 58 条（现仅空间核心 5 条有），随场景生产波次补齐。
5. PB-10 功能层归属未裁定，待总账评审时定。
6. ~~PB-13 例句的 math 核定（现以 English 同型句暂代，见 §1.2）~~ **已核定（2026-11-02）**：math、maths 均有独立条目（V6_学校_30 / V6_学校_31），条目 boundary 注记已同步改写。

## 7. 文件清单

- `model/laws/small_systems.yaml` — 276,382 B，63 条。
- `model/hitching/small_systems_hitching.yaml` — 13,208 B，148 词。
- 本文件 — 建模口径与待补总账（小系统区分册，同步登记于 model/README.md 数据总账时以本文件为准）。
