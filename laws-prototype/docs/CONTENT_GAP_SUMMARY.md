# 内容缺口总结 CONTENT_GAP_SUMMARY

> 任务来源：`laws-prototype/docs/CONTENT_GAP_SPEC.md`（Kiro 2026-11-10，基于 `count_coverage.py`）
> 执行：2026-11-10，四区并行 + 总协调合入。范围只做优先级表 P1–P5；CB/CG/YL/VB/TM 教师层、NE/GR 等未进表缺口不动，见末节。
> 基线 `9cf5516` → HEAD `a71316b`，共 7 个提交（4 区 + 收尾清理 + 总表同步 + 再生），已推送。
> 验证：`check_all.py` **27/27**、`check_upstream.py` 五链全过、`gen_laws.py --check` PASS、`gen_errors.py --check` PASS、`gen_borrow.py --check` PASS。

## 一、按区结果

| 区 | 目标 | 完成 | 数字 | 提交 |
|---|---|---|---|---|
| P1 TA 组 quiz 回灌 | 18 条 | 18/18 | **87 题**（每单元 4–6 题：5,5,5,5,5,6,5,5,5,5,5,4,5,4,5,5,4,4） | `01b87e8` |
| P2 S 组 quiz | 44 条 | 43/43（yaml 实有 43 条） | **86 题**（每条 2 道） | `54ff7cc` |
| P2 SR 组 quiz | 9 条 | 9/9 | **18 题**（每条 2 道） | `54ff7cc` |
| P5 WA 组 quiz | 9 条 | 9/9 | **18 题**（每条 2 道） | `2d5a8c9` |
| P3 PB 组 cases | 13 条 | **8/13** | 8 条病例（VEC-032 起编号段内） | `6527ec9` |
| P4 W 组 cases | 12 条 | 12/12 | 12 条病例 | `6527ec9` |
| P4 E 组 cases | 4 条 | 4/4 | 4 条病例 | `6527ec9` |

- quiz 合计 **209 题**（TA 87 + S 86 + SR 18 + WA 18），全部只改 `model/laws/*.yaml` 的 `quiz` 字段；病例合计 **24 条**，全部写进 yaml `error_cases`（PB 原待补占位已替换，不是并列追加）。
- ERRIDX（`gen_errors.build` 再生，唯一权威源）：总数 **524 → 548**（+24），覆盖律 **311 → 335**（+24），来源 {lawdata 259, yaml **111 → 135**, zone 154}，教学法 55 不变，辨析标记 16 不变，diag_kid 改写 **366 → 390**。24 条目标律在 ERRIDX 里各为 1 条；5 条留空仍为 0 条。新病例 wrong 经全库 492 条去重撞句检查，**0 撞句**。
- 总表同步：四区 yaml 改动进 `laws_master.json` 的 `yaml` 分仓共 **103 条**（TA 18 + S 43 + SR 9 + WA 9 + PB 8 + W 12 + E 4）；收尾清理又重同步 **70 条**（TA 18 changelog + S/SR 52 gaps）。`gen_laws.py --write` 不做这一步（见“三”），同步为手工机械操作，格式 `json.dumps(indent=1, ensure_ascii=False)` 无尾换行，`check_upstream` 链 [a] 428 条深比全等。
- 再生与联动：`gen_laws --write`、`gen_errors --write`（ERRIDX 字面量 220,467 字符落盘）、`gen_borrow --write` 均已跑；`#v-expr` 儿童行徽标翻转 **10 处**（E-10、E-11、W-01～W-07、W-10：`part（有练习 · 查过·没有病例）` → `ok（有病例 · 有练习）`）；其余 14 条不用翻（PB 为教师侧；W-08/09/11/15、E-12/14 在 #v-expr 里本就是教师层行）。天坑榜冻结值更新：TA-17 0→4 题、TA-06 0→6 题推高天坑分，**TA-06 进榜、C-08 出榜**，新榜 `['GR-05','TA-15','S-43','GR-12','W-14','C-10','TA-17','GR-02','GR-08','TA-06']`。

### 重要口径：count_coverage.py 的表没有动

`count_coverage.py` 读的是 `lawdata.cases`，本波填的是 yaml 字段（quiz / error_cases），不进 lawdata——所以它的按区表（PB 病例 0、W 病例 3、S/TA/WA 练习 0）**合入后原样不动**。这不是没做完，是口径所致：真正的移动在 ERRIDX（548/335）与 yaml quiz 字段（209 题）里，见上表。规格文档的“456 条、175 条六步全齐”基数同样以 lawdata 计，本波不改动它。

## 二、病例出处清单（24 条，全部带出处；无出处的不写）

| 律 | wrong → right | 出处 |
|---|---|---|
| PB-01 | `on my opinion` → `in my opinion` | 郭佳佳. 英语介词“on”使用的数据驱动研究[J]. 国外英语考试教学与研究, 2023, 5(3): 146-159. DOI: 10.12677/oetpr.2023.53015（表 8 语料片段） |
| PB-02 | `people can be on car` → `people can be in the car` | 郭佳佳 2023，同上（表 8 语料片段） |
| PB-03 | `go on bus` → `go by bus` | 郭佳佳 2023，同上（表 8 语料片段） |
| PB-08 | `I am at the bed` → `I am on the bed` | 王倩. 初一学生英语写作中的介词错误分析[J]. 职业教育发展, 2026, 15(4): 156-164. DOI: 10.12677/ve.2026.154180 |
| PB-09 | `in the wall` → `on the wall` | 谢世君. 基于语料库分析的高二英语读后续写介词使用偏误分析[J]. 职业教育发展, 2026, 15(6): 15-22. DOI: 10.12677/ve.2026.156238（§5.3 短语级） |
| PB-10 | `He is in home` → `He is at home` | 熊汇丹. 初二学生英语写作中介词偏误分析——以介词“in”“on”“at”为例[J]. 教育进展, 2026, 16(3): 449-454. DOI: 10.12677/ae.2026.163503 |
| PB-12 | `The bird landed on the tree.` → `The bird landed in the tree.` | 谢世君 2026，同上 |
| PB-13 | `The party will be held in July 1st.` → `The party will be held on July 1st.` | 谢世君 2026，同上 |
| W-01 | `In the life, have many disabled people.` → `In life, there are many disabled people.` | 赵柳棚. 初二学生英语写作动词偏误实证分析[J]. 职业教育发展, 2026, 15(1): 335-344. DOI: 10.12677/ve.2026.151045 |
| W-02 | `Different people have different views, have different choices.` → `Views and choices vary from people to people.` | Sun, F. Negative Transfer of Chinese Sentence Patterns on Students' English Writing[J]. JLTR, 2013, 4(6): 1298-1302. DOI: 10.4304/jltr.4.6.1298-1302 |
| W-03 | `We can buy clothes, pay for tuition, go travel with it.` → `...and go traveling with it.` | Sun 2013，同上 |
| W-04 | `Credit cards have many advantages and disadvantages.` → `There are many advantages and disadvantages of having credit cards.` | Sun 2013，同上 |
| W-05 | `On the one hand, Frank helped Sheila; on the other hand, he ran a successful gallery.` → `While running a successful gallery, Frank helped Sheila.` | 秦榛嘉. 高一学生英语读后续写中逻辑连接词偏误分析[J]. 职业教育发展, 2026, 15(3): 217-227. DOI: 10.12677/ve.2026.153145 |
| W-06 | `In addition, I think use credit card to pay for goods is a fashionable style.` → `...using a credit card...` | Sun 2013，同上 |
| W-07 | `It has become a fashion, and we can happy to have a credit card.` → `...we can be happy...` | Sun 2013，同上 |
| W-08 | `They hard the news of important events in history.` → `They heard the news...` | 赵柳棚 2026，同上 |
| W-09 | `I have a credit card, it makes me happy.` → `I have a credit card, which makes me happy.` | Sun 2013，同上 |
| W-10 | `I was good at singed and danced.` → `I was good at singing and dancing.` | 赵柳棚 2026，同上 |
| W-11 | `I don't parents should push their children to take after-school classes.` → `I don't think parents should...` | 赵柳棚 2026，同上 |
| W-15 | `On the one hand, using credit cards brings us convenience, we needn't take much cash any longer.` → `...because we don't have to take much cash any longer.` | Sun 2013，同上 |
| E-10 | `Firstly, it's useful and convenient to buy things, it's necessary for you.` → `...so it's necessary for you.` | Sun 2013，同上 |
| E-11 | `I hope students can happy.` → `I hope students can feel happy.` | 赵柳棚 2026，同上 |
| E-12 | （对好朋友说）`Could you possibly help me with this heavy luggage?` → `Could you help me with this heavy luggage?` | 邬颖祺, 陈国华. 中国大学生英语语用语言能力：调查与分析[J]. 外语界, 2010（**刊期页码待核**） |
| E-14 | `For example, we are in the college far away from home, ...` → `For example, if we are in the college...` | Sun 2013，同上 |

出处核实说明：病例实施者逐条读过原文（Sun 2013 的 4 句与赵柳棚 2026 的 3 句已在 ERRIDX 中，本次所用 24 句均经撞句检查无重复；秦榛嘉 2026 的 6 句 Sheila 错句已在 W-14 的 lawdata 病例中，本次 W/E 组只用了其剩余 1 句带改正的例句）。总协调抽查：**赵柳棚 2026 已逐字核对无误**（题名、刊、卷期页码、DOI 均与 Hans 原文一致）；**郭佳佳 2023 未及独立复核**（DOI 直链取不到可抽取内容、通用搜索未直接命中该文，实施者的“表 8 语料片段”核实记录未推翻，但复核仍待补）；E-12 的邬颖祺、陈国华文已读全文核实错句与调查数据（80 名大学生，判断题第 3 题，29 人误判），唯刊期页码多方搜索仍未核实，diagnosis 里如实写“刊期页码待核”。

## 三、留空的条目（5 条，PB 组）

| 条目 | 机制 | 留空原因 |
|---|---|---|
| PB-04 | against/through | 已发表的中国学习者语料中未找到 against/through 的原文错句；剑桥词典典型错误例与网站例句不是学习者语料研究，不能用 |
| PB-05 | over（其一） | 未找到已发表语料中的 over 原文错句；程焕福、李媛媛的 over 实证研究（BISU 学报）PDF 本次打不开（上游拉取失败，未重试），全文未读到 |
| PB-06 | over（其二） | 同上 |
| PB-07 | over（其三） | 同上 |
| PB-11 | 母语刀口“紧” | 未找到中国学习者“紧”维度的原文错句；李欣、刘文静 2022（CLEC at/on/in，现代语言学 2022, 10(6): 1228-1235，DOI 10.12677/ML.2022.106164）只核实了题录，全文 PDF 未取到，未确认是否含可用错例 |

5 条的 yaml `error_cases` 待补占位原样保留，未写无出处病例。

## 四、合入时总协调做的决定

1. **S 组 11 条无例词条目的纯概念题，保留。**S-01、S-03、S-04、S-06、S-07、S-10、S-11、S-13、S-23、S-28、S-29 共 11 条 `examples` 为空，实施者按各条 mechanism/claim 出了纯概念选择题（题干零英文词，取自本条自身机制，未编新内容）。决定保留：题目有效、无词库外词、无编造；留空反会让这 11 条继续 0 练习。
2. **陈旧登记已清理（提交 `23c388c`）。**TA 组 18 条 changelog 各补一条 2026-11-10 回灌登记（原“按 L2 口径留空”作废），`grammar_ext.yaml` 头注加一行作废说明；S/SR 52 条 `gaps` 列表去掉 `quiz` 待补（其余待补项不动）；`DATA_SOURCE_SPEC.md` §1 ERRIDX 行补 2026-11-10 登记（548/335，来源 259/135/154）。TA 各条 `status` 仍为「入模中」（GR-02 前例，状态改动另议）。
3. **S/SR quiz 不进运行时 PHONLAWS 字面量。**实测：主文件 52 条 PHONLAWS 条目的 `quiz` 全为 `[]`，且没有任何工具生成 `var PHONLAWS=`（各检查脚本只读它）。104 题已进事实源（phonics.yaml + 总表 yaml 分仓），但拼读律页运行时仍显示 0 练习——要打通需新做一个 PHONLAWS 生成器，超出本次范围，不手工往 4.2MB 字面量里塞 104 题。记为待办（见“六”）。
4. **TA / WA quiz 的运行时到达情况如实记录。**TA 的 87 题在运行时经 `gen_interact.py` 生成块（源自 `ta_exercises.json`）已接入 TA 站，本次 yaml 回灌是事实源补全；WA 的 9 条 lawdata 为 null，不在 LAWDATA 里，quiz 只活在 yaml/总表，运行时未到达（与 TA、S/SR 同类问题，见“六”）。
5. **S-44 不动。**S 组 yaml 实有 43 条（S-01..S-43）；S-44 只存在于总表（zone 来源条目，yaml 为 null，2026-11-03 由 Stewart 自 NEW-T 提升，内容在 morph 区），无法经 yaml 补 quiz，不擅自扩大范围。

> **补记（2026-11-10 “全部收尾”波，以下三条取代上文对应决定，原文保留作历史记录）：**
> - §四.3 已取代：`tools/gen_phonlaws.py` 已建（--check/--write），S/SR 104 题已注入运行时 PHONLAWS（52 行 quiz 全空→104 题），check_all 第 28 项门禁。
> - §四.5 已取代：S-44 yaml 已补（phonics.yaml 第 44 条 + quiz 2 道，总表同步）；但其 quiz 不进运行时 PHONLAWS（字面量无 S-44 行；加行须生成器支持行新增 + roster 门禁复核，另立项）。
> - §四.5 补记（2026-11-11 S-44 运行时线，分支 `left4/s44`）：S-44 的 2 道 quiz 已进运行时 PHONLAWS（`tools/gen_phonlaws.py` 扩展支持行新增，S-44 整行派生；53 条/106 题，check_all 28/28；ROSTER 路由 M→L）。上文「不进运行时」一句就此作废，原文保留作历史记录。
> - §五.9 已推翻：TA form_building 积木块实测已在（`ta_exercises.json` 18 道全带 `build.blocks`、运行时 RV_TA 1:1、渲染分支齐全），不是缺口，无需修。

## 五、规格文档断言与实测不符（已按实测做，记入此）

1. W 组有病例的是 W-12/13/14，不是文档所称 W-01/02/07（实测 0 条；本次 W-01/02/07 已补上）。
2. PB-01..13 的 yaml `error_cases` 全是待补占位，ERRIDX 里是 0 条，不是真病例。
3. “谢旻洋等（高中作文 300 份，构式错误）”无法核实；实际用的是谢世君 2026（高二读后续写介词，96 名学生、192 篇、450 例偏误），作者名、样本量、错误类型均与文档描述不符。
4. “狄伟进 2015（期刊分节例句）”多次搜索无任何命中，无法核实，未用。
5. WA 在 `model/laws/teaching.yaml`，不在文档所称 `expression.yaml`。
6. 规格“按 for_law 字段”是错的：TA 回灌的键是 `ta_exercises.json` 的 `units[].unit_id`。
7. `gen_laws.py --write` **不改** `laws_master.json`（只读总表、写主 HTML 与 morph 文件）；yaml 改动进总表没有现成工具，须手工同步（本波已做，103 + 70 条）。
8. “复习引擎立即可以出题”对 TA 不成立（lawdata 为 null；TA 站读 `ta_exercises.json` 是另一条通道）。
9. TA 的 form_building 题在复习引擎里只有题干、无积木块可排（prompt 原样是任务书的明确口径；积木数据仍在 `ta_exercises.json` 的 `build.blocks` 里，如需可拼）。
10. WA 条目是教师层方法论条目（Dogme、流利度/语块、被动语态误解、勘误生态等），不是任务书假设的“写作方法”——题目按各条实际 mechanism 出，未按假设改写。

## 六、未进范围的缺口（只记录，不做）

- NEW 18 条、P 19 条均为 0 练习 0 病例（覆盖表实测），规格未提，本波不动。
- CB/CG/YL/VB/TM 教师层：规格明确暂缓，不动。
- NE/GR 等未进优先级表的缺口：不动。
- PB-04/05/06/07/11 留空（见“三”），待语料。

## 七、新发现与未核实项（只记底稿，不自动实施）

- **PHONLAWS 生成器缺失**（较重）：S/SR quiz 104 题无运行时通道；TA/WA quiz 同样只在 yaml/总表。打通需新增生成器或改动运行时取数口径，是工具活，不是内容活。
- TA form_building 题缺积木块（见“五”第 9 条）。
- 郭佳佳 2023 出处待总协调复核（见“二”末段）；E-12 刊期页码待核。
- 真机视觉与语音听感、孩子实测：仍未做（长期未核实项）。
- 12 句 OALD 朗读句的中文翻译未对照官方译文（长期未核实项）。
- Stewart 确认（规范 §6/§1/§8）：仍待 Priya 安排；本波未代确认。
- 第八波 14 件底稿（含 #15 空 stub 精灵包问题）：仍在底稿，Priya 未选 A/B/C。

## 八、提交清单

```
01b87e8  Content: TA 组 quiz 回灌 18 条（87 题）
54ff7cc  Content: S/SR 组 quiz 补全 52 条（S 43 + SR 9）
2d5a8c9  Content: WA 组 quiz 补全 9 条
6527ec9  Content: PB/W/E 组病例补全（PB 8 + W 12 + E 4；PB-04/05/06/07/11 留空待语料）
23c388c  Docs: 内容缺口波收尾清理（TA 18 条 changelog 补 2026-11-10 回灌登记、S/SR 52 条 gaps 去 quiz 待补、规范 ERRIDX 行 524/311→548/335）
2226c89  Docs: 内容缺口波总表同步（TA/S+SR/WA/PB+W+E 四区 yaml 分仓，103 条；含收尾清理重同步 70 条）
a71316b  Content: 内容缺口波再生（ERRIDX 548 条落盘 + BORROW 天坑榜 TA-06 进榜/C-08 出榜 + #v-expr 徽标 10 处翻转）
```

工作树：`~/workspace/gap-ta`、`~/workspace/gap-ssr`、`~/workspace/gap-wa`、`~/workspace/gap-cases`（各区的分叉工作树，合入后保留备查，未删除）。

## 补记（2026-11-10 PB 深挖线，分支 `finish/pbcases`，工作树 `~/workspace/finish-pbcases`，未推送）

- **PB-11 已补 1 例（VEC-056）**：`people could see her strolling on the sky gracefully` → `people could see her strolling in the sky gracefully`。出处：李欣, 刘文静. 概念迁移视角下中国英语学习者介词误用及分析——以介词 at, on, in 为例[J]. 现代语言学, 2022, 10(6): 1228-1235. DOI: 10.12677/ML.2022.106164（§4.2.2 例(13)，on 空间概念负迁移实例；CLEC 四个大学生子库 on 概念负迁移 78 例之一；学段大学）。全文已读（Scribd 转载全文与 Hans 题录页互证），原文分析「人不可能与天空相接触，更无法脚踩天空漫步」在案；另有 Zhang & Luo（概念迁移与介词使用研究，Semantic Scholar 全文）独立报告 `on the sky` 不可接受、正解为 `in the sky`，可作旁证。ERRIDX 548→549、覆盖 335→336、yaml 来源 135→136、diag_kid 改写 390→391。
- **郭佳佳 2023 已独立核实**（原“未及独立复核”销项）：Hans 官方页题录（郭佳佳. 英语介词“on”使用的数据驱动研究[J]. 国外英语考试教学与研究, 2023, 5(3): 146-159. DOI: 10.12677/OETPR.2023.53015；东北大学外国语学院；300 篇作文、27 例 on 错误、五分法含选择错误）与全文 PDF 表 8 原文逐字相符——PB-01 `on my opinion`（表 8 序号 5）、PB-02 `people can be on car`（序号 2）、PB-03 `go on bus`（序号 20）均为表 8 选择错误例，27 例总数相符。PB-01/02/03 病例原文不动。
- **E-12 刊期页码仍未核实**：全文已读（sinoss.net PDF，全文 1279 行，含 80 名大学生、判断题第 3 题 29 人误判等数据，与 E-12 病例一致），但该版本无刊头印记、未见期号页码；另经通用检索与英文题名检索，只命中同一全文，未见其他著录。diagnosis 里「刊期页码待核」原样保留，E-12 不动。
- **PB-04/05/06/07 仍留空**（核不到原文错句，不写无出处病例）：已全文读过谢世君 2026（450 例，无 through/against/over 例）、王倩 2026（184 例，无 through/against/over 例）、郑丽佳 2025（60 例，无逐字错句）、吴媛媛/焦新平 2025 FCE 语料研究（in/on 混淆计数，无 through/against/over 例）；程焕福/李媛媛 2016（BISU 学报 over 教学实验，试题为正确用句加访谈解读，无学习者原文错句）、马书红 2007（现代外语，IN/ON/OVER 选词填空测试研究，全文未取到，仅见二手转述，无逐字错句在案）、Finkbeiner 1998（over 习得假说，理论）、Chang 2012（Chula 博士论文，60 题空间关系选择测验，测验型数据、无语料原文错句）均不能提供符合格式的原文错句；另对 through/against 的中英文定向检索只命中词典与教学网站的“常见错误”例（非学习者语料研究，按本波口径不用）。后续可沿线索：马书红 2007 全文、Chang 2012 全文（测验题项）、CLEC 原始语料检索。
- 验证：`gen_laws.py --check` PASS、`gen_errors.py --check` PASS、`check_all.py` 27/27 全部通过。`gen_laws.py --write` 本波无改动（PB 病例只走 ERRIDX 通道，不进 LAWDATA 字面量）。

## 补记（2026-11-11 PB 病例线 left4/pb，分支 `left4/pb`，工作树 `~/workspace/left4-pb`）

- **PB-04、PB-05/06/07 仍留空**（四条均未补到符合铁律的原文错句，yaml `error_cases` 待补占位原样保留；ERRIDX 549 条 / 覆盖 336 律不变；`gen_errors.py` 冻结断言不动）。本轮沿三条指定线索 + 更广检索深挖，均未开出可用病例：
  - **马书红 2007 全文未取到，且方法上即无学习者原文错句**：多轮检索只命中题录与转述（马书红. 中国学生对英语空间介词语义的习得研究[J]. 现代外语, 2007(2): 173-183；全文仅存 CNKI/万方/维普付费库，无公开镜像）；李锡江, 刘永兵 2015 转述在案：该研究“采用选词填空的方法对介词 IN, ON 和 OVER 的习得做过研究”——句由研究者写、学习者只做选择，无自由产出原文错句可引；即使取到全文也只能得到题项正确率，产不出 wrong 句 + 改正 + 出处的病例格式。
  - **Chang 2012 全文未取到，且测验题项不可用**：Chula ETD 题录页（Chang, Chuan-Chi. Mandarin speakers’ difficulties with spatial prepositions in English and their conceptualization of spatial relations. Chulalongkorn University, 2012. DOI: 10.58837/CHULA.THE.2012.1924）与 DigiVerse 均未暴露全文下载（DigiVerse 显示“Data Not found”）；摘要自证方法为 60 题多项选择测验 TSR（73 份有效卷），无自由产出；题项句为研究者编写、学习者只做选择，题干 + 错选拼出的句子不是学习者原话，按铁律不可作病例。结论：测验题项不可用。
  - **CLEC 原始语料检索未执行成**：CLEC 本体随《中国学习者英语语料库》（桂诗春、杨惠中，上海外语教育出版社，2003）随书光盘发行，无公开在线全文库；SFLEP 的 WE/CLEC 页仅为交互式检索语法说明页，需 live browser 交互查询（本子代理无 live browser，未执行）；已发表 CLEC 研究中逐字引用的错句仍只覆盖 at/on/in（李欣/刘文静 2022）。
  - **程焕福/李媛媛 2016 再核**：题录与摘要核实（程焕福, 李媛媛. 基于认知语言学的多义词意义习得实证研究——以 over 及其合成词和动词短语为例[J]. 北京第二外国语学院学报, 2016, 38(2): 42-58. DOI: 10.12002/j.bisu.2016.022）；教学实验：试题为研究者编写的 69 句（受试写出 over 义项）+ 问卷访谈，无学习者原文错句。直接 PDF 拉取失败（一次 504、一次截断 65KB/736KB、浏览器取文上游失败，未再重试）。
  - **新读全文两篇，均无 over/through/against 例**：Zhang & Luo 2017（Crossroads, 17(2), DOI: 10.15290/cr.2017.17.2.04；WCEL 语料，12–17 岁中学生）全文只论 at/in/on，例(15)–(17) 的 `on the sky` 属 PB-11 已覆盖的 on 系；叶婷 2026（社会科学前沿, 15(4): 91-98. DOI: 10.12677/ass.2026.154287；万州中学七至九年级 135 篇作文）8 条示例全为 at/in/on/to/into/of，无 over/through/against。
  - **更广检索**：中英文定向检索（大学生作文 over 误用、through/against 习得、ICLE/CLEC over 例）只命中词典与教学网站“常见错误”例（剑桥词典 across/over/through 典型错误、TestLearn 等）与零散教学号文章，按口径不用；Wang & Duan 2023 纵向语料论文的介词误用例亦只含 in/during/of。已发表中国学习者语料研究逐字引用的错句，仍系统性集中在 at/in/on（+to/of），over/through/against 未见逐字错句发表。
- **后续线索（再挖须换方法）**：① 机构订阅的 CNKI/万方/维普内取马书红 2007 全文复核（但方法已定，预期仍无原文错句）；② 向 Chula 图书馆/作者索取 Chang 2012 全文复核附录 60 题（预期仍为测验题项，不可用）；③ 有 live browser 或 CLEC 光盘者执行 CLEC 错误标注子库的 over/through/against 检索；④ 盯住 Hans 系新刊的初中生介词偏误论文（如郑丽佳/叶婷同系列），看是否出现 over/through/against 逐字例。
- 验证：`gen_laws.py --check` PASS、`gen_errors.py --check` PASS、`check_all.py` 28/28 全部通过（本轮零内容改动，仅本文档补记）。

## 补记（2026-11-11 E-12 刊期线，分支 `left4/e12`，工作树 `~/workspace/left4-e12`，已推送）

- **E-12 刊期页码仍未核实——多路核实后结论不变，E-12 一字未动**：diagnosis（`expression.yaml` E-12）与总表第 55 行出处里的「刊期页码待核」原样保留；卷、期、页码三者均未核到，DOI 亦未见。本轮查过的渠道与每条结果：① 全文重读（sinoss.net PDF `uploadfile/2010/1130/5040.pdf`，全文 1279 行）：确为 Word 转 PDF（题头 `Microsoft Word - 5040.doc`），无刊头、无期号页码、无 DOI；② 通用检索（中文题名+作者+外语界+2010、题名+卷期页码、题名+2005/2006、英文题名原文、英文作者名变体）：十余次检索每次只命中同一 sinoss 全文，未见第二著录；③ 知网/万方/维普/百度学术/国家哲学社会科学文献中心定向检索：均无该文题录，万方《外语界》刊页与 NCPSSD《外语界》刊页只见他文；④ 期刊官网 waiyujie.net 过刊页与万方刊页直读失败（DNS/连接错误，按工具指示未重试），其 2010 年第 5/6 期目录检索亦无此文；⑤ 作者主页（UCAS people.ucas.ac.cn / foreign.ucas.ac.cn）发表论文列表只列 2017/2019 三篇，未列此文；⑥ 引文追踪（后文引用“邬颖祺，陈国华，2010”）与文档分享站（道客巴巴/豆丁）检索：无命中；⑦ DOI 模式检索（`10.3969/j.issn.1004-5112.2010` + 作者/题名）：无命中。
- **新发现（只记不改，需 Priya/总协调定夺）**：全文重读新见文内信息——「收稿日期：2005-07-15；本刊修订稿，2005-07-30」，且作者简介称邬颖祺当时为北外硕士生（UCAS 简历：硕士 2003-09–2005-06），英文题名为 `Chinese College Students' Pragmalinguistic Competence: A Survey and Analysis`（WU Ying-qi, CHEN Guo-hua）。这与诊断所写「外语界，2010」对不上：2010 只是 sinoss 上传日期（`2010/1130`），不是文内给出的发表年份；该文可能是 2005 年投稿的稿件、未见正式刊出记录，或刊于 2005/2006 年某期但无任何数据库著录。按本次任务口径（核不到则 E-12 一字不动），未擅自改年份、未把 2005 写进出处；后续定夺：是把出处年份改为待核/改注为“2005 年稿（刊出未见记录）”，还是继续沿用“外语界，2010（刊期页码待核）”。
- 验证：本分支只改两份总结文档（本文件 + `docs/work-2026-11-09/finish_all_summary.md`），yaml/json/主 HTML 一字未动；`gen_laws.py --check` PASS、`check_all.py` 28/28 全部通过。
