# 病例补齐报告：表达写作 E/W + 自然英语 NE（2026-11-09）

## 0. 口径核对：TODO 的 29 条与实测的 53 条对不上

- TODO 清单 §1.1 称 E/W 17 条、NE 12 条，共 29 条 `st.part`（有练习题壳、无真实病例）。
- 实测（`gen_errors.py` 四路汇合口径：`lawdata.cases` / `yaml.error_cases` / 专区 `zone.data.errors` / 合并律 `zone.parts[*].data.errors`，律内按 `norm(wrong)` 去重）：E/W/NE 共 59 条律中，**53 条零病例**（E 12、W 14、NE 27），仅 6 条已有病例（E-02 1 例、E-06 2 例、E-09 1 例、W-14 6 例、NE-08 1 例、NE-14 1 例）。
- TODO 的 17/12 无法从现行总表复现：按“有练习题壳（`lawdata.quiz` 非空）且无病例”算，E/W 26 条、NE 27 条；按“无病例”算同样是 26/27；全表“有练习无病例”为 119 条，与 TODO 的 126 也不符。TODO 称 ERRIDX“只覆盖 163 条规律”，实为儿童层（非教学法）覆盖数，与 `gen_errors.py` 的 217 律总覆盖口径不同。结论：TODO 的 17/12 疑似旧快照口径，**本次以实测 53 条为工作范围**。
- 另：主文件内 E-16…E-29 字样均为 NE-16 等的子串误命中，不存在 E-16 及以后的 E 律。

## 1. 覆盖表：53 条实测缺病例律

### 1.1 已补（15 律，19 例）

| 律 | 律名（简称） | 补例数 | 病例号 |
|---|---|---|---|
| E-01 | 说话就是做事（言语行为） | 1 | EWNE-01 |
| E-03 | 合作原则：答非所问 | 1 | EWNE-02 |
| E-04 | 日常句子是整块取用的 | 1 | EWNE-19 |
| E-05 | 语用失误比语法错误更伤人 | 1 | EWNE-03 |
| E-07 | 请求越压人越要加缓冲 | 1 | EWNE-04 |
| E-08 | 回应“对不对”看三件事 | 1 | EWNE-05 |
| E-13 | 对话是轮流搭的“对子” | 1 | EWNE-06 |
| E-15 | 说错了能自己改回来 | 1 | EWNE-07 |
| W-12 | 基本功不自动化会堵住脑子 | 2 | EWNE-08、EWNE-09 |
| W-13 | 句子是攒出来的（句子合并） | 2 | EWNE-10、EWNE-11 |
| NE-01 | 合语法不等于地道 | 2 | EWNE-12、EWNE-13 |
| NE-02 | 大脑里整存着“句干仓库” | 2 | EWNE-14、EWNE-15 |
| NE-03 | 起步单位是整块 | 1 | EWNE-16 |
| NE-04 | 没有哪条规则被所有人永远遵守 | 1 | EWNE-17 |
| NE-24 | 谈话有三型 | 1 | EWNE-18 |

### 1.2 本就已有病例（6 律，不在本批补）

| 律 | 现有病例数 |
|---|---|
| E-02 | 1 |
| E-06 | 2 |
| E-09 | 1 |
| W-14 | 6 |
| NE-08 | 1 |
| NE-14 | 1 |

### 1.3 未找到真实病例（38 律，原因见 §3）

| 律 | 律名（简称） | 原因组 |
|---|---|---|
| E-10 | “会说英语”是四种本事合起来 | A |
| E-11 | 卡壳不是失败 | A |
| E-12 | 得体不会自己长出来 | A |
| E-14 | 没注意到的东西学不会 | A |
| W-01 | 写作和说话最大的不同 | D |
| W-02 | 写好作文不是一口气写到底 | A |
| W-03 | “想到什么写什么”是发展阶段 | D |
| W-04 | 修改分两层，顺序不能反 | D |
| W-05 | 最省力的进步法是“接着写” | A |
| W-06 | 内容要创造，语言要模仿 | A |
| W-07 | 写不出来是最有用的时刻 | A |
| W-08 | 小学写作官方证据清单 | A |
| W-09 | 元分析：教写作策略排第一 | A |
| W-10 | 支架的意义在于“用完要撤” | A |
| W-11 | 先把课上成“围着写作转” | A |
| W-15 | “套公式保满分”没有研究支持 | A |
| NE-05 | “语法铁律”是照拉丁语发明的 | C |
| NE-06 | 英语已经不归母语者管了 | C |
| NE-07 | 只用三千已知词解释一切新词 | A |
| NE-09 | 先有情景，再有句型 | A |
| NE-10 | 语调的“三 T” | B |
| NE-11 | 口音是地图不是污点 | B |
| NE-12 | 发音先练肌肉 | B |
| NE-13 | 音标表是一张发音地图 | B |
| NE-15 | 规则先过证据关（手册认错被动语态） | D |
| NE-16 | 语法是“选择的仓库” | A |
| NE-17 | 语法要嵌在写作里教才有效 | A |
| NE-18 | 语类是分阶段做事的方式 | D |
| NE-19 | 教学循环：拆一篇→合写一篇→自己写 | A |
| NE-20 | Reading to Learn | A |
| NE-21 | Derewianka：语言的四种活儿 | A |
| NE-22 | 印刷概念（书是怎么运作的） | B |
| NE-23 | Reading Recovery | A |
| NE-25 | Thinking Together：先约法再讨论 | A |
| NE-26 | 对话式教学五原则 | A |
| NE-27 | Talk for Writing 三段 | A |
| NE-28 | 故事地图 + 全身动作 | A |
| NE-29 | 支架是设计出来的 | A |

## 2. 出处清单（每例的 source / source_url 与之一一对应）

| 出处 | 用于病例 | URL |
|---|---|---|
| Muir 2011《Exploring Pragmatic Failure into the Writing of Young EFL Learners》, English Language Teaching 4(4), DOI 10.5539/elt.v4n4p254 | E-01、E-05、W-13×2 | https://doi.org/10.5539/elt.v4n4p254 |
| Karapetyan 2014《Pragmatic Failures in Cross-Cultural Communication》, Lingua Montenegrina 7(1) | E-03、E-08 | https://linguamontenegrina.me/index.php/lm/article/download/391/395/768 |
| Wang 2011《Making Requests by Chinese EFL Learners》（Hsieh 2013 书评转引） | E-07 | https://web.fu-berlin.de/phin/pragrev/pragrev2013.1.1/pragrev2013.1.1_7.pdf |
| 《英语句子常见错误》教学文档（人人文档） | E-04 | https://www.renrendoc.com/paper/211588796.html |
| “How Do You Do? vs How Are You? Explained”问候教学页 | E-13 | https://eathealthy365.com/comparing-how-do-you-do-and-how-are-you/ |
| Global Language Review《教师口头反馈话语批判分析》课堂转写例 | E-15 | https://glrjournal.com/article/critical-discourse-analysis-of-esl-teachers-oral-feedback-practices |
| 剑桥 KET 读写练习册《Ket Read Write》考生拼写错例 | W-12×2 | https://www.scribd.com/document/434481903/Ket-Read-Write |
| 剑桥学习者语料库（CLC）搭配错例清单《Common Mistakes》选录 | NE-01（do a mistake） | https://www.scribd.com/document/522746609/Com-Mistakes |
| Cowie 1998（转引自 Journal of Curriculum and Teaching 2023, 12(4), DOI 10.5430/jct.v12n4p47） | NE-01（make damage） | https://www.sciedupress.com/journal/index.php/jct/article/viewFile/23695/16906 |
| Kong 2025《The Formation of Chinglish from the Perspective of Psycholinguistics》, Linguistics 7(3), DOI 10.35534/lin.0703016 | NE-02（open the light） | https://www.sciscanpub.com/uploads/2025/09/10/8fd96861611d1f9b62b2d35eba1794c0.pdf |
| 《Analysis of Chinglish in Chinese-English Translation》 | NE-02（eat medicine）、NE-03 | https://www.researchgate.net/publication/303482951_Analysis_of_Chinglish_in_Chinese-English_Translation |
| Merriam-Webster《Between You and I vs. Between You and Me》 | NE-04 | https://www.merriam-webster.com/grammar/is-it-wrong-to-say-between-you-and-i |
| Dawes 等《Thinking Together in the Primary Classroom》（CREET） | NE-24 | https://www.readkong.com/html/page/thinking-together-in-the-primary-classroom-7283716/1?clickable=1&115741 |

## 3. 未找到真实病例的 38 条律：原因分组

- A组（26 条）：纲领 / 教学法主张类。律本身是教学原则、证据清单或理论主张，没有“学习者说错某句话”这一层可立档。前人已在 `lawdata.nocase` 登记“不设学习者句级病例口径”，本次复核未检得反例。律：E-10、E-11、E-12、E-14；W-02、W-05、W-06、W-07、W-08、W-09、W-10、W-11、W-15；NE-07、NE-09、NE-16、NE-17、NE-19、NE-20、NE-21、NE-23、NE-25、NE-26、NE-27、NE-28、NE-29。
- B组（5 条）：需语音 / 行为语料，句级错句无法承载。NE-10（语调三 T，须音频）、NE-11（口音，属态度与身份议题，无错句）、NE-12（发音肌肉，须音频）、NE-13（音标地图，须发音演示）、NE-22（印刷概念是指书行为，如拿倒书、指读方向，非句子错误）。
- C组（2 条）：立档即违背本律主张。NE-05（拉丁造法史：错的是旧规矩本身，不存在学习者错句）；NE-06（世界英语：把印度英语等变体形式判为“错”，正与本律“英语不归母语者管”的主张相反）。
- D组（5 条）：文献只有论述 / 转述，无逐字可引原句。W-01（Flower 1979 案例为学生进度报告两稿，无公开逐字句可引）；W-03（知识讲述：只有 12 岁学生的策略自述，无逐字作文）；W-04（Sommers 1980 与 Baker 2016 只有修改倾向统计与编码示例，无 wrong→right 逐字对）；NE-15（Pullum 的被动误判本身有争议：Strunk & White 原文并未明言“落叶句”是被动语态，无定论的逐字病例可立）；NE-18（Derewianka 只有带 orientation 的范文，无缺 orientation 的学生逐字文本）。

## 4. 诚实标注：本批 19 例的口径说明

- 逐字原句（14 例）：wrong 逐字引自来源文献——E-01、E-03、E-04、E-05、E-07、E-08、E-13、E-15、W-12×2、W-13×2、NE-03、NE-24（NE-24 的 wrong 为报告登记的短交换模式原文）。
- 搭配 / 短语级登记 + 最小载体句（5 例）：文献登记的是偏误搭配本身，wrong 为围绕该搭配的最小载体句，diag 与 src 已注明——NE-01×2（do a mistake / make damage）、NE-02×2（open the light / eat medicine）、NE-04（between you and I）。
- right 侧：除 W-13 例 [14] 的 if 改法与 NE-24 的探索型改法有来源依据外，其余 right 均为按来源说明给出的最小改法（diag 已注明），非来源逐字给出。
- E-15 注：修复由老师重复提示触发，非完全自发自我修复，diag 已注明。
- 全部 19 例的 wrong 均含英文字母（不落入教学法条目分流），diag 与 diag_kid 齐全且互不相同，diag_kid 均为孩子版白话。

## 5. 合并后影响与待办

- 合并后 ERRIDX 新实测数（在 /tmp 副本上用 `gen_errors.py` 的 build 逻辑复算，断言剥离后）：病例 400（+19）、覆盖 232 律（+15）、儿童层覆盖 178 律（+15）、来源 lawdata 135 / yaml 111 / zone 154、教学法条目 55 不变、diag_kid 改写 242（+19）、空 diag_kid 0 条、有辨析页标记 12（+1：NE-04 在 contrast_pages 中，合并后自动带标）。
- `gen_errors.py` 的冻结断言（381 / 217 / 116 / 111 / 154 / 223）须按上述新数更新，否则 `--check` 失败；ERRIDX 需重跑 `--write`。
- 15 条已补律的 `lawdata.nocase`（“已查·无逐字病例”）已过时：本次只追加 cases、未动其他字段；请数据负责人决定是否清除 / 改写这 15 条的 nocase 备注。
- 合并脚本未在真文件上跑过；真文件仍为 HEAD e97aaec 状态，主文件未动。

## 6. 交付与验证

- `docs/work-2026-11-09/cases_expr_ne.json`：15 律 19 例；字段照抄现行 `lawdata.cases` 条目结构（wrong / right / type / diag / src / diag_kid）+ 任务要求的 source / source_url。
- `docs/work-2026-11-09/apply_cases_expr_ne.py`：`--dry-run` 通过；在 /tmp 副本上合并通过；二次运行幂等（新增 0、跳过 19）；结构 diff 证实仅 15 律的 `lawdata.cases` 被追加、既有病例顺序与内容未动、其他字段未动；真文件未动（git status 干净）。
- 本报告：`docs/work-2026-11-09/cases_expr_ne_report.md`。
