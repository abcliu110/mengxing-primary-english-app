# 单词维度覆盖率报告（决策 25 / 26）

> 版本：审计 v1（2026-10-30 01:20 JST）；补齐进度见文末 §7（2026-10-31 00:05 JST 更新，数字随每批重算）。目标词库 = 主 HTML `VOCAB_DB` **1487 词**（G1–G6 课标 987 词 + V6 扩展 500 词；含 43 个词组）。`MH_VOCAB_DB` 22 词是子集。
> 方法：脚本解析主 HTML 数据（基线 `f1cd18f` 之后的 master）；1487 词逐词抓 Wiktionary 英文词条（API，全部抓完，33 词无词条），解析词源 / 同源 / 构词 / 近反义 / 同音 / 义项模板。
> **「应有」列是候选数**（Wiktionary 有对应数据的词数），入库前逐条核对出处（Etymonline / Wiktionary / 学习词典），核不实的标 ❓ 或不入库并写原因。数字随每批补齐更新。

## 1. 先说最大的问题：V6 扩展 500 词几乎全是模板

V6 500 词里 **445 词**整条是模板：例句「Let's learn and use "xxx" in a sentence!」、中文「核心考点词【xxx】」、`etymology`「记忆锦囊：属于【主题】高频核心词」、`memory_tip` 同模板、`visual_scene` 空。等于只有词和中文意思。

## 2. 单词卡字段（每词一条）

| 维度 | 现有真实内容 | 模板 / 编造充数 | 词库中应有（候选） | 说明 |
|---|---|---|---|---|
| 例句 `example_en` | 1042 | 445（V6 模板句） | 1487 | R2：每词必须有真例句 |
| 词源 `etymology` | **0 条有出处** → `ETYM_DB` 603 条（见 §7） | 985「巧记小故事」（多为编的，部分错，如 ear + h = hear）+ 445「记忆锦囊」模板 + 57 其它 | **1263**（Wiktionary 有词源模板；另 66 词词源不明 / 有争议 → ❓） | 旧故事保留，改标 💡；真词源另立 `ETYM_DB` |
| 词根词缀 `affix_root` | 748「积木拆词」（质量未核）+ 504 其它 | 235「基础独体词：音节拼读」 | **391** 有 Wiktionary 构词模板（复合 / 前后缀）＋ 432 词是拉丁 / 法语借词，可再拆词根（候选） | 伪拆分加 R3 纠正 |
| 一词多义 `senses` / `polysemy_data` | 16 词 senses>1；17 词 has_polysemy | — | **1329** 词 ≥2 个义项（1180 词 ≥3） | 展示层只取常用 2–4 义 |
| 搭配 `collocations.verbs` | 0（1291 词就是例句本身，196 空） | 1291 | 约 1400 个实词 | 来源：学习词典搭配，逐条登记 |
| 搭配 `collocations.adjs` | 197 | 881（a / the / my + 词） | 约 1400 | 同上 |
| 场景图 `visual_scene` | 27 | 960（与义项场景重复）+ 500 空 | 1487 | 白板画面用 |
| 不规则变形 `irregular_info` | 19 | — | 约 130 不规则动词 + 27 不规则名词 + 16 不规则形容词 / 副词（候选） | |
| 拼写提醒 `spelling_alert` | 28 | — | 待定标准（双写、去 e、y→i、静音字母…可脚本判定） | |
| 近义词 | 11 组（`WORD_RELATIONS_DB.synonyms`） | — | **1116** 词有近义数据 | |
| 反义词 | 24 + 24 + 50 条（三处重复） | — | **387** 词有反义数据 | 三处合并（R1） |
| 同音词 | 16 + 12 + 30 组（三处重复） | — | 词库内互为同音 **52 词**；与常见词同音的约 200 词（候选） | 三处合并 |
| 最小对立体 | 4 组 15 对 | — | 词库内只差一个音的词对 **808 对**（按音标脚本算，含同音） | 展示按对立类型分组（/ɪ/-/iː/、/æ/-/e/、θ-s、v-w…） |
| 词族 / 派生 | `MORPH_DERIVATIONS` 70、`WORD_FORMATION_DB` 73、`ETYMOLOGY_TREES` 5 棵 41 条 | — | **1368** 词有 Wiktionary 派生 / 相关词 | |
| 📖 身世标签 | 8 词（port 家族） | — | = 入库词源数 | 由数据自动生成 |

## 3. 格林定律（现有 11 个配对）

| 对应 | 现有 | 词库候选（自动分组，待核） |
|---|---|---|
| p → f | foot | 14（fish/piscis、few/paucus、feather/penna、fire、first、father…） |
| t → th | three | 5（thin/tenuis、thunder/tonō、three、thank / think…） |
| k → h | hundred、heart、hound | 14（horn/cornū、head/caput、hill/collis、hen、have/capiō…） |
| kʷ → hw | — | 3（what、who、where 类） |
| d → t | tooth、ten、two | 7（tree/δόρυ、two、tooth、eat、sit…） |
| g → k | — | 11（knee/genū、know/gnōscō、corn/grānum、cold/gelū、king…） |
| gʷ → kw | — | 1（quick/vīvus） |
| bh → b | — | 12（brother/frāter、bear/ferō、bean/faba、blow/flō…） |
| dh → d | — | 3（door/foris、day…） |
| gh → g | — | 6（goose/ānser·χήν、garden/hortus、guest…） |
| 维尔纳定律 | —（只在 ⚠️ 里提到） | father/pater、mother 等 + was/were、lose/forlorn 类（待核） |
| 合计 | **11 配对** → 规则组 4 幕共 30 对（见 §7） | 本族词且有拉丁 / 希腊 / 梵语同源记录的 **255 词**；自动能分进规则组 76 个，其余 179 个待人工判断（不少只是同源、辅音不落在格林规则上，会不入库并写原因） |

## 4. 「音变与词汇规律」系列（决策 25 扩展，词库可匹配词数，均为候选）

| # | 规律 | 词库可匹配（候选） | 例 |
|---|---|---|---|
| 1 | 维尔纳定律 | 约 5–10（待核） | was/were、father、mother |
| 2 | 元音大转移 GVS | 长元音拼写词 186（a_e 类）+ 341（双字母元音） | bite、house、name、meet |
| 3 | i-变音 | 词对两边都在词库 10、一边在 5 | foot/feet、man/men、mouse/mice、food/feed、long/length |
| 4 | 元音递变 / 强动词 | 不规则动词约 130 | sing/sang/sung、ride/rode/ridden |
| 5 | 高地德语辅音推移 | 有德语同源记录 510；经典对照 43 | water/Wasser、apple/Apfel、ten/zehn |
| 6 | 腭化 / 古诺斯语双形 | 古诺斯语来源 62 | skirt/shirt、egg、sky、give、get |
| 7 | 诺曼法语 w→g | 约 3 | wise/guise、wait、guide（⚠️） |
| 8 | 法语脱落 s | 约 6 | forest、hospital、hotel、host、cost、island（⚠️ s 是后加的） |
| 9 | 双形词 / 层级词汇 | 本族-借词对两边都在词库 9；本族词在词库可挂借词 35；法语借词共 297 | cow/beef、pig/pork、ask/question |
| 10 | 前缀同化 | 约 7 | impossible、impolite、import、appear、arrive |
| 11 | 派生音变（短化等） | 两边都在词库 12 对 | nature/natural、five/fifth、wide/width、keep/kept |
| 12 | 音位转换 + 不发音字母 | 不发音字母 63；音位转换约 3 | bird、third/three、knight、climb、daughter |

审计中发现、建议一并加入：**词尾 -ough 多种读法**（GVS 后续）、**拉丁 / 希腊词根大家族**（432 个借词可拆，如 port、vis、spect、dict）、**复合词重音**（已做，挂词卡）。

## 5. 其它菜单

| 菜单 | 现有 | 判断 |
|---|---|---|
| v6 拓展教室「🌳 词源树」 | `ETYMOLOGY_TREES` 5 棵（其实是后缀族，不是词源） | 改名或并入词根词缀；真词源树按 `ETYM_DB` 生成 |
| v6「🧩 变形表」 | `MORPH_DERIVATIONS` 70 | 补到全部不规则变形 |
| v6「🔊 同音词」「🔄 反义词」 | 30 组 / 50 对，与单词大世界另两份重复 | 三处合并成一份全量数据 |
| 框架语义 | 10 剧场 25 视角 | 动词框架可扩（give/take、bring/carry、teach/learn、borrow/lend…），待列候选 |
| 主题导图 | 按 `theme_sub` 主题 | 1487 词都有主题；导图改白板（决策 28） |
| Sight Words | 19 词标 irregular，742 词 `sight_type` 空 | 按 Dolch / Fry 名单对 1487 词全量标注 |

## 6. 补齐顺序（每批一提交，更新本表）

1. 格林定律按规则组（p→f 起）+ 维尔纳定律
2. 词源 `ETYM_DB`（按年级 G1→G6→V6）
3. 词根词缀 `MORPH_DB`（按词缀族）
4. 一词多义、搭配、近 / 反义、同音、最小对立体
5. 音变与词汇规律 2–12
6. V6 500 词例句与中文（R2）

未入库原因分类：无出处 / 出处冲突（❓）、非同源（只是长得像）、专有名词 / 词组、Wiktionary 无词条（33 词）。

## 7. 补齐进度（2026-10-31 00:05 JST）

| 项 | 审计时 | 现在 | 明细 |
|---|---|---|---|
| 真实词源 `ETYM_DB`（Wiktionary + Etymonline 两处互证） | 0 | **603 / 1487**（G1 32、G2 35、G3 60、G4 80、G5 94、G6 62、V6 238、POLY 2；Etymonline 缓存 1288 / 1487 时） | `ETYM_REVIEW.md`；未入库：两处对不上 413、Etymonline 尚未抓取 179、Wiktionary 无可解析来源链 149、无英语词源小节 71、词组 37、Etymonline 无词条 35 |
| 真实构词 `MORPH_DB` | 0 | **182** | `MORPH_REVIEW.md` |
| 格林定律配对 | 11（1 幕） | **30 对**（原 1 幕 + 规则组 4 幕：清音 / 浊音 / 送气音 / 维尔纳） | `GRIMM_GROUPS.md`（每对两处互证；未用的逐条写原因） |
| 音变与词汇规律（§4 的 12 条 + 审计补充 6 条） | 0 幕 | **18 / 18 条有幕**（16 个新幕 + 复用 2 幕），共约 60 个例词 | `RULES_REVIEW.md` |
| 词卡「📖 词源 📜」/「💡 巧记小故事」分开显示 | — | ✅ 1487 词全部分开；未核实的词写「暂未收录」 | `src/patch_etym_card.py` |

说明：§2 表里「应有（候选）」1263 条词源是 Wiktionary 有词源模板的数；能入库的上限取决于 Etymonline 存档有没有快照（经 Wayback 读取，约 10 词 / 分钟）。抓完后 `parse_etym.py` → `build_etym_db.py etym` / `morph` 重跑，本节数字跟着改。
