# 词库缺口普查并全补 · 报告（2026-11-03）

执行位置：独立克隆 `~/workspace/work-clones/wordfill`（基线 master 07919c3）。**未 commit、未 push**，等主会话验收合并。

## 一、前后计数全表

| 口径 | 补前 | 补后 | 增量 |
|---|---|---|---|
| wordbank.json（词库上游） | 2,473 | **2,942** | +469（新 id ADD_0907–ADD_1375） |
| words_master 总记录 | 2,486 | **2,955** | +469（表外 13 例外不变） |
| phonetic_gb.json 条目 | 2,287 | **2,756** | +469（新词全部有英式音标条目） |
| morph 四类：split 可拆 | 926 | **962** | +36 |
| morph 四类：whole 整词 | 1,199 | **1,530** | +331 |
| morph 四类：nosplit 禁拆 | 230 | **240** | +10 |
| morph 四类：form 词形归原形 | 118 | **210** | +92（动词过去式 35 · 现在分词 1 · 名词复数 56） |
| 词源区 verified / pending | 1,816 / 462 | 1,816 / 462 | 不变（etymology.json 未动） |
| 词源「未收」 | 195 | **664** | +469（新词无词源记录，运行时呈未收＝预期行为） |
| 复习池题量 | 1,796 | **1,796** | 不变（自证见 §六） |
| VC 词表 WLIST / WPAGE | 2,351 / 2,204 | 不变 | 新词未入 VC（见 §七登记） |

## 二、普查口径与缺口构成

三表实际下载（2026-11-03）：① Dolch——Wikipedia 镜像（五级服务词 221 条：pre-primer 40 / primer 52 / grade1 41 / grade2 47 / grade3 41；名词段标称 97 词）；② Fry 前 1000——readingblocks 编号表 + nomadkazoku PDF 版取并集；③ YLE——剑桥官方 PDF（2018 版）三级合并字母表（印刷页 23–30），按页面坐标解析词条 + S/M/F 首现级别标记，共 1,407 条原始条目。快照存 `laws-prototype/imported/wordlist-snapshots-2026-11-03/`（含 README，按规范 §5 登记为外部快照、非事实源）。

归一化口径：单字、小写、纯字母 [a-z]+。剔除计数：YLE 短语 96 / 专名 78 / 非纯字母 10 / 解析垃圾 1；Fry 专名 17 / 非纯字母 13 / 缩写断词伪影 21 次命中；Dolch 短语 1 / 专名 1 / 非纯字母 1。

| 词表 | 归一化后词数 | 并集中独有贡献（缺口） |
|---|---|---|
| Dolch（服务词+名词） | 315 | 3 |
| Fry 前 1000 | 995 | 253 |
| YLE 三级 | 1,179 | 174 |
| **三表并集** | **1,634** | — |

覆盖口径：wordbank 2,473 词形 + 复合词头 aliases（14 条记录）+ words_master 13 个功能词例外。**缺口 = 469 词**，来源组合：仅 Fry 253 · 仅 YLE 174 · Fry+YLE 37 · 仅 Dolch 3 · Dolch+YLE 1 · Dolch+Fry 1。命题验证：此前发现的 might 确在缺口内（已补，modal 义）；rat / shake 不在三表内（非缺口）。

镜像差异（如实记录）：Dolch 镜像 grade2 为 47 词（通行 46，多 "left"）；名词段 97 词（通行 95 版含 good-bye，此镜像无、另含 goat/woman/women）。Fry readingblocks 尾部编号不可靠（731 号缺失、711/712/732 重号），故取并集，百词段归属以 readingblocks 编号为准、无编号者记「补集」。

## 三、补词字段来源

每词全字段按词库既有记录格式补齐（id/word/phonetic/syllables/pos/meaning/emoji/freq_rank=null/theme/sight_type/is_function_word/has_polysemy/dolch/kebiao_level/verb_form_of/gpc_patterns=[]/morphemes/law_refs=[]/pos_tags/phonetic_gb/morph_class+reason/source/source_ref）。

- **中文义项与词性**：ECDICT（skywind3000/ECDICT，2026-11-03 下载 ecdict.csv）translation 首要义项，按词库 gloss 风格精简（去领域标记 [计]/[医] 义项、去括号注、去重、至多 3 个义项分项）。词性取 ECDICT 首块标记映射（a.→adj.、ad.→adv.、vt./vi.→v. 等）。
- **音标**（英式，phonetic 与 phonetic_gb 同值，与 ADD 波次先例同式）：ECDICT phonetic 字段 397 词（字形归一：ә→ə、'→ˈ、:→ː、双字母双元音 ei/ai/au/ou→eɪ/aɪ/aʊ/əʊ、ɒː→ɔː、双变体取 GB 式——内容不变、仅字形与取舍，basis 记「词典核查·ECDICT」）；剑桥词典 UK 6 词（app /æp/、funfair /ˈfʌn.feər/、laptop /ˈlæp.tɒp/、online /ˌɒnˈlaɪn/、website /ˈweb.saɪt/、wifi /ˈwaɪ.faɪ/，basis 记「词典核查·剑桥」）；规则派生 66 词（ECDICT 无音标的屈折形/复数：基形英式音标 + -s/-ed 尾音规则，basis 记「规则派生（词形）」）。
- **dolch 字段**：5 个 Dolch 命中缺词（kitty/nest/robin/squirrel/stick）全部只是名词段命中——按全库既有口径（名词段词一律 dolch=null，如 apple/dog），dolch 均留空，命中情况记在 source_ref。无 YLE/kebiao 对应字段存在于 schema：YLE 级别与 Fry 命中一并记入 source_ref（如「命中：Fry 第8百词段；YLE Flyers 首现」），kebiao_level 全部留空（课标≠YLE，不编）。
- **syllables**：规则生成（元音组+辅音归属算法），为近似值，与 ADD 波次同级处理。
- **theme**：theme_sub 统一「词表缺口普查补入」（ADD 波次有自设子题先例）；theme_macro 按词义粗分人与自我/社会/自然。

## 四、ECDICT 未收录清单（任务要求单列）

- **完全未收录的真缺词：0**。469 词全部取到字段，无编造。
- 大小写变体借行 2 词（如实登记）：**app**（ECDICT 仅 APP 大写行：义项「应用，应用程序」可用、音标缺→剑桥补 /æp/）；**pole**（ECDICT 仅 Pole 行：音标 /pəʊl/ 与中文义项「杆；极点」均在该行内，义项已剔除「波兰人」专名义）。
- ECDICT 义项加工 2 词（披露）：**laptop**——ECDICT 行仅作「[计] 膝上型的」（形容词式残 gloss），义项按 YLE 名词义写「膝上型电脑」、词性 n.、音标剑桥；**online**——ECDICT 仅「[计] 联机」，义项写「在线的，联网的」、音标外查。
- 普查伪影（非词，已剔除不补）：Fry 的 PDF 断词 couldn/didn/doesn/isn/wasn/wouldn/ll/s/t/won（won't 等缩写的断片）共 10 个——不是词条，不入庫。

## 五、morph 判定

- **form 92**：动词屈折 36（过去式/过去分词 35，如 asked/called/decided/died＋ -ied 型 cried/married；现在分词 1：being←be，be 为表外例外词，有 been 先例）；名词复数 56（animals/birds/factories/thousands…，基形多在库内）。复数归 form 是**本次新开的口径**（此前 form 118 条全为动词形）：复数无 verb_form_of 字段可用，故以 morph 条目「基形 X · 复数（链登记）」登记归属、义项作「X 的复数（首义）」——请 Stewart 复核此口径（备选：改 whole 独立词条）。
- **split 36**（逐词审定，非机器直判）：复合 backpack/cannot/cupboard/earache/funfair/jellyfish（半透明）/laptop（半透明）/motorbike/motorway/nowhere/skateboard/snowboard/suitcase（半透明）/swimsuit/website；后缀 badly/business（半透明，busy+-ness）/cooker（半透明，英式器具义）/designer/manager/statement/furry/striped/spotted/later（比较级）；-ing 派生 beginning/burning/following/missing（半透明，形容词/名词化，按 building/shopping 先例从「动词形」改判）/racing/skateboarding/snowboarding；pleased（-ed 形容词化，按 bored/closed 先例）；前缀 kilometre（kilo-）/underline（under-）/unfriendly（un-）。
- **nosplit 10**（假拆登记，附 morph_note 说明）：bandage、basement、cotton、donkey、especially、notice、poster、remain、repair、represent。
- **whole 331**：其余全部整词（morph_reason=mono）。
- **新词不挂 morph 家族页**（pages 未动）：新 split 词只入 words 索引（可搜索/词条展示），不进 126 页家族页——挂页涉及教学编排，留待后续波次决定。

### 待 Stewart 复核小清单（判不准/口径敏感，均已按上表先行落地，可逐条改判）

1. 复数归 form 的新口径（56 词）——见上。
2. cooker（cook+-er 半透明，器具义）、business（busy+-ness 半透明）两条 split 是否成立。
3. basement / poster / especially 判 nosplit（opaque/fake_split）是否合适（备选 whole）。
4. forward / asleep / awake / lemonade / skyscraper / northern / southern / western：判 whole 未拆（部件未收或构词已固化），是否要拆。
5. means / fries / trainers：判独立词条（means 名词义主导；fries、trainers 为定型复数词，义项分别取「炸薯条」「运动鞋（英式）」），未挂复数链。
6. filled / developed / located / stretched：基形（fill/develop/locate/stretch）不在库内，这四词作独立词条入庫（义项取 ECDICT 本词行），未作词形链登记。
7. might：义项取 ECDICT 的 aux. 块「可能；也许」、词性 modal v.（ECDICT 首块为名词「力量，权力」，按 Dolch/Fry 功能词定位取情态义）。

## 六、管线与校验

合法路径已走完：wordbank.json（上游）→ phonetic_gb.json / morph_data.json / words_master.json 同步 → `gen_morph --write`（两个 HTML）→ `gen_words --write`（稳态无改动）→ `gen_links --write`（LINKIDX 再生：对话词锚 528→542 词面、2,048→2,077 对——新入庫的 asked/called 等词使对话锚点自然增加）→ `gen_et --write`（载荷再生，verified 1816/pending 462 不变）。

配套登记：`tools/gen_et.py` 的冻结断言 EXPECTED_UNC 195→664（文件头注释已同步注明原因）——这是补词后未收数的正当更新，非放宽校验。

**check_all 输出：11/11 全部通过**（gen_morph / gen_laws / gen_phonics / gen_words / gen_spoken / gen_et / gen_borrow / check_morph_sync / check_upstream 五链零未登记漂移 / extract_review / gen_links）。

复习池自证：extract_review 三个题面（专区 138 · 词根 280 · 介词 178）逐字节不变、gen_laws 稳态（LAWDATA 未动）——池的全部来源字节未变，总量保持 **1,796**。主文件 diff 仅 6 行（morph DATA、ET 载荷、LINKIDX 三个生成段），morphology 文件 2 行。

## 七、登记为后续可选（未做）

- **拼读模式成员不扩**：新词未加入 phonics 模式/拼读卡（gpc_patterns 留空后备字段、words_master phonics_cards 为 []）。后续若要扩，须走 phonics_master 管线另行裁定。
- **新词未入 VC 词表**：WLIST/WPAGE 是带例句与页面的课程内容（22 列），不在本次补词范围；新词目前经词库、morph 区词索引、words_master 可见可查，VC 词页待后续波次。
- **新 split 词未挂家族页**：见 §五。
- 词源区：新词呈「未收」（664 之一部分），词源补录是独立波次的事。

## 八、抽查对账（10 词，ECDICT 原文 vs 入庫值）

| 词 | ECDICT phonetic 原文 | ECDICT translation 原文（节录） | 入庫 phonetic_gb | 入庫义项 |
|---|---|---|---|---|
| able | 'eibl | a. 能干的, 能够的 | /ˈeɪbl/ | 能干的，能够的 |
| backpack | 'bækpæk | n. 远足用的背包；双肩背包, 背包 | /ˈbækpæk/ | 远足用的背包，双肩背包，背包 |
| called | （空） | a. 被呼叫的 | /kɔːld/（call 音标+规则派生） | call 的过去式/过去分词（打电话） |
| business | 'biznis | n. 生意, 事情, 业务, 商业, 商行, 职责 | /ˈbiznis/ | 生意，事情，业务 |
| might | mait | n. 力量, 权力 ‖ aux. 可能, 也许 | /maɪt/ | 可能；也许（取 aux. 块，见复核 7） |
| pole | p
...[truncated 981 chars]