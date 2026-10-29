# 单词维度覆盖率报告（决策 25、26）

> 目标词库：主 HTML `VOCAB_DB` **1487 词**（G1 66、G2 83、G3 130、G4 206、G5 296、G6 204 课标词 985 + V6 扩展 500 + 多义 2；含 43 个词组）。`MH_VOCAB_DB` 22 词是它的子集。
> 审计日期：2026-10-30（基线，任何补齐之前）。「应有」= Wiktionary 英文词条（2026-10-30 抓取 1487 词，1454 有词条）里有对应内容的词数，是**候选上限**，入库前逐条用 Etymonline / 词典核对，核对不过的不入库并写原因。
> 「模板充数」定义见 MASTER_DESIGN 决策 26。

## 1. 单词卡字段（逐词）

| 维度 | 现有（有内容） | 其中模板充数 / 编造 | 真正有效 | 应有（候选上限） | 缺口 |
|---|---|---|---|---|---|
| 词源 `etymology` | 1487 | 「记忆锦囊：属于【主题】」模板 445；「秒懂巧记 / 造词小故事」985（编的故事，部分说法错误）；多义抄写 2 | 有出处的真词源 **0**（词卡字段里）；另有身世标签 8 词（port 家族） | 1244（有词源模板；另 63 词词源「不详」，要如实写不详） | ≈1236 |
| 格林定律 | 溯源幕 ④ 11 个配对（p→f 1、t→th 1、d→t 3、k→h 3…） | — | 11 | 227 个本族词有拉丁 / 希腊同源词；其中词首辅音已能对上规则的约 78 词（下表） | ≈216 |
| 词根词缀 `affix_root` | 1487 | 「基础独体词 / 音节拼读」235；「积木拆词」748 需逐条核（含伪拆分，如 ear + h = hear） | 未核实 | 383（Wiktionary 有合成 / 前后缀拆分）+ 426 个拉丁 / 希腊 / 法语来源词中可拆词根的部分 | 待核 |
| 一词多义 `senses` / `has_polysemy` | has_polysemy 17；senses > 1 只有 16 | — | 16 | 1354 词在词典里有 ≥ 2 个义项（展示层按课标挑常用义） | ≈1338 |
| 搭配 `collocations` | verbs 1291 + adjs 1078 | verbs 就是例句本身 1291（另 196 空）；adjs 只是「a / the / my + 词」881 | adjs 197 | 全部实词（约 1400） | ≈1400 |
| 场景图 `visual_scene` | 987 | 与 senses.scene 重复 960 | 27 | 全部可画的词 | ≈1400 |
| 不规则变形 `irregular_info` | 19 | — | 19 | 动词不规则 51 + 名词不规则复数 27 + 形容词比较级不规则 16（候选） | ≈75 |
| 拼写提醒 `spelling_alert` | 28 | — | 28 | 待定（双写、去 e、ie/ei 等规则可脚本判出） | 待算 |

## 2. 维度菜单（词表型）

| 菜单 | 数据 | 现有条数 | 应有（候选上限） |
|---|---|---|---|
| 🔊 同音词 | `HOMOPHONES_LIST` 16 + `HOMOPHONES_DB` 12 组 + `HOMOPHONES_30` 30 | 约 30 组（有重复） | 词库内两边都在库的同音组 52；任一边在库 367 词有同音词（去掉只在某些口音成立的，标 ⚠️） |
| 🔄 反义词 | `ANTONYMS_LIST` 24 + `ANTONYMS_50` 50 + `WORD_RELATIONS_DB.antonyms` 24 | 约 50 对 | 371 词有反义词 |
| 近义 / 同义词 | `WORD_RELATIONS_DB.synonyms` 11 | 11 | 1087 词有近义词 |
| 易混词 | `WORD_RELATIONS_DB.confusables` 8 | 8 | 待定（以学习词典 usage note 为准） |
| 类属 / 部分整体 | `category_sets` 10、`meronyms` 10 | 20 | 待定 |
| 最小对立体 | `MINIMAL_PAIRS_DB` 4 组 15 对 | 15 对 | 待算（按音标脚本在 1487 词里配对） |
| 🧩 变形表 | `MORPH_DERIVATIONS` 70 | 70 | 同上「不规则变形」 |
| 🌳 词源树 | `ETYMOLOGY_TREES` 5 棵 41 条（其实是后缀族，不是词源） | 41 | 并入词根词缀；真词源走 `ETYM_DB` |
| 构词 | `WORD_FORMATION_DB`：合成 25、前缀 20、后缀 12、词族 10、词根 6 | 73 | 383 + 词根词 |
| 词族 / 派生 | 只在 affix_root 文字里 | — | 589 词有派生词（Derived terms） |
| 框架语义 | `FRAME_SEMANTICS_DB` 10 剧场 | 10 | 待定 |
| 主题导图 / Sight Words | 按 `theme_sub` / `sight_type` 生成 | sight_type 有值 745 | 全量（数据层已有，改动画见决策 23） |

## 3. 格林定律候选（词首辅音，Wiktionary 同源词，待逐条核对）

| 规则 | 候选数 | 示例 |
|---|---|---|
| p → f | 23 | fish / piscis、five / pente、few / paucus、feather / penna |
| t → th | 6 | three / tres、thin / tenuis、thunder / tonare |
| k → h | 21 | heart / cor、head / caput、hill / collis、horn / keras、have / capere |
| kʷ → hw | 3 | what / quod、when / quando、why / qui |
| d → t | 11 | two / duo、tooth / dens、tree / doru、teach / dicere |
| g → k | 12 | knee / genu、know / gnoscere、cold / gelu、corn / granum、king / genus |
| b → p | 1 | 极少（教科书也只有零星例子），如实写 |
| bh → b | 16 | brother / frater、bear / ferre、bean / faba、blue / flavus |
| dh → d | 4 | door / foris、thyra |
| gh → g | 7 | goose / chen、yellow / chloros、garden / hortus、guest / hostis |
| 维尔纳定律 | 待核 | father / pater、mother / mater 的 d / th |

另：词中、词尾的对应（foot / pedis、heart / cordis、eat / edere、sit / sedere、ten / decem、hundred / centum）没有计入上表，核对时一并补。

## 4. 未入库原因（补齐后逐批填写）

| 原因 | 词数 |
|---|---|
| 词典无词条（专有名词、词组） | 33 |
| 词源不详（如实标「不详」，不编） | 63 |
| 同源有争议 / 只是民间说法 | 待填 |
| 同音只在部分口音成立 | 待填 |
