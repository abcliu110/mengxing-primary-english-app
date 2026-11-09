# TODO 1.1 病例补齐报告：词汇解码 V + 构式 CO + 疑问 QI

日期：2026-11-09　|　交付：`cases_vocab_constr_question.json` + `apply_cases_vocab_constr_question.py`（本目录）

## 结论

- 实测目标律 **47 条**（V 24 + CO 12 + QI 11），不是 TODO 清单口径的 48 条（见 §1）。
- 补上病例的律 **40 条**，共 **68 条病例**；找不到真实病例的律 **7 条**（见 §4）。
- 脚本已在 `/tmp` 副本上实测通过（首跑 +68，第二遍 +0/跳过 68，幂等），未动真文件。

## 1. 口径说明：48 → 47

按 `laws-prototype/tools/gen_errors.py` 的口径（lawdata.cases 为空即缺病例）实测：

| 区 | TODO 清单口径 | 实测 lawdata 缺病例 | 说明 |
|---|---|---|---|
| V 词汇解码 | 25 | **24** | 清单未列律号，无法定位多出来的第 25 条；以实测 24 条为准 |
| CO 构式 | 12 | **12** | 与清单一致 |
| QI 疑问 | 11 | **11** | 与清单一致，但性质不同：QI 15 条律在 ERRIDX 里其实都有专区病例（各 2 条），缺的只是 lawdata 层；本批补的是 lawdata 层 |
| 合计 | 48 | **47** | |

另：QI-04、QI-10、QI-11 各已有 1 条 lawdata 病例，QI-13 已有 2 条，不在目标内。

## 2. 覆盖表（47 条律）

| 律 | 补几例 | 律 | 补几例 | 律 | 补几例 |
|---|---|---|---|---|---|
| V-02 | 1 | CO-01 | 1 | QI-01 | 1 |
| V-03 | 2 | CO-02 | 1 | QI-02 | **0** |
| V-04 | **0** | CO-05 | 1 | QI-03 | 2 |
| V-06 | 2 | CO-06 | 2 | QI-05 | 1 |
| V-08 | 1 | CO-08 | 2 | QI-06 | 2 |
| V-09 | 2 | CO-09 | 2 | QI-07 | 2 |
| V-11 | 1 | CO-10 | 1 | QI-08 | 2 |
| V-13 | 2 | CO-11 | **0** | QI-09 | 2 |
| V-14 | 2 | CO-12 | 2 | QI-12 | 2 |
| V-17 | 2 | CO-14 | 2 | QI-14 | 2 |
| V-19 | 1 | CO-15 | 2 | QI-15 | 2 |
| V-20 | 2 | CO-17 | 2 | | |
| V-22 | **0** | | | | |
| V-23 | **0** | | | | |
| V-24 | 3 | | | | |
| V-26 | **0** | | | | |
| V-27 | 2 | | | | |
| V-28 | 2 | | | | |
| V-29 | 1 | | | | |
| V-30 | 2 | | | | |
| V-31 | **0** | | | | |
| V-41 | 1 | | | | |
| V-42 | 2 | | | | |
| V-45 | 1 | | | | |

小计：V 32 例（19/24 律）、CO 18 例（11/12 律）、QI 18 例（10/11 律），合计 **68 例、40/47 律**。

## 3. 出处清单（51 个来源，均已用 browser.search / browser.open 核对）

### 论文与语料

1. Yan (2010)，English Language Teaching Vol. 3 No. 1（ERIC EJ1081497）——V-06、CO-17：https://ia803200.us.archive.org/26/items/ERIC_EJ1081497/ERIC_EJ1081497.pdf
2. ICIHCS 2025 会议论文《中国大学生英语口语词汇选择错误研究》——V-06、V-09、V-13：https://chr.ewaoa.com/article/view/29511.pdf
3. Theory and Practice in Language Studies Vol. 5 No. 6 (2015)《Types of Chinese Negative Transfer to English》——V-27：http://academypublication.com/issues2/tpls/vol05/06/15.pdf
4. CLEC 学习者语料（ST4、ST5），转引自 SlideServe《How can corpora help in language pedagogy?》——CO-08、CO-09：https://www.slideserve.com/lainey/how-can-corpora-help-in-language-pedagogy
5. Fisher (2005)《English Writing Suggestions for Chinese-Speaking Students》，York University——CO-08：https://bethune.yorku.ca/files/2012/04/WritingForChinese.pdf
6. Laufer (1997)，转引自 Nation (2001) 书评（ResearchGate）——V-03：https://www.researchgate.net/publication/248530869_Learning_Vocabulary_in_Another_Language_I
7. IJASOS Vol. XI Issue 33 (2025)《Question Formation Errors Among EFL Learners at Sohar》——QI-14：https://zenodo.org/records/18032810/files/3-Ar173.pdf?download=1
8. Lee, Ki Taek (HUFS)《A Reanalysis of Double Object Constructions and Dative Constructions in English》——CO-02：http://builder.hufs.ac.kr/user/ibas/No31/13.pdf
9. Rispoli (2018)《Changing the Subject》，PMC——CO-10：https://pmc.ncbi.nlm.nih.gov/articles/PMC6105126/
10. Scientific Journal of Faculty of Education, Misurata University《Lexical and Structural Ambiguity in English》，引 Fromkin et al. (2011)——V-41：https://journals.misuratau.edu.ly/edu/ojs/index.php/eduction/article/download/756/542/952
11. RSD Journal (2025)《Common errors in the use of prefixes and suffixes by language learners》——V-30（注：该研究对象是西班牙语母语学习者，非中国学习者）：https://rsdjournal.org/rsd/article/download/49494/38722/505355
12. 香港大学 Telenex《Using passive voice (Students' problems)》——CO-09：http://www.telenex.hku.hk/telec/grammar/gpass154.htm
13. Liao《Information Gap in Communicative Classrooms》，English Teaching Forum——QI-15：https://docsbay.net/doc/1052728/english-teaching-forum-online-bureau-of-educational-and-cultural-affairs
14. FP Formazione 词汇讲义《Vocabulary, Word Building & Writing Skills》——CO-17：https://fpformazione.it/pluginfile.php/121797/mod_folder/content/0/Dispense%20-%20lezione%207%20%E2%80%94%20Vocabulary%2C%20Word%20Building%20%20Writing%20Skills.pdf?forcedownload=1

### 词典与权威科普

15. Merriam-Webster《7 False Etymologies》——V-08：https://www.merriam-webster.com/wordplay/7-false-etymologies/posh
16. Merriam-Webster《Folk Etymology》——V-24：https://www.merriam-webster.com/grammar/folk-etymology
17. Merriam-Webster 词源科普帖（诺曼征服与双层词汇）——V-19：https://www.facebook.com/merriamwebster/posts/pfbid0YDgTZmLrcpRK55fsyKZjwAxasKRY3pG12Qmh83hwzV47BBQKDHegEajeG4QeQkp8l
18. Mental Floss《Why Is It Called a Hamburger?》——V-24：https://www.mentalfloss.com/language/words/why-is-it-called-a-hamburger
19. The Habit Weekly《Wedding Words》——V-24：https://thehabitweekly.substack.com/p/wedding-words
20. 《Morphological Error Analysis》（encyclopedia.ambient.tech），引 Leopold (1939–1949)——V-20、V-28、V-30：https://encyclopedia.ambient.tech/articles/morphological_error_analysis.html

### 教学材料与练习集

21. Deen Cox IELTS《Chinglish Swap Table》——V-09、V-11：https://www.deencoxielts.com/IELTS-Chinglish-Swap-Table.pdf
22. Deen Cox IELTS 简报（Chinglish 常见错误）——V-17：https://www.deencoxielts.com/briefing.html
23. Substack《Why "I am agree" sounds wrong》——V-17：https://englishgrammarapp.substack.com/p/why-i-am-agree-sounds-wrong-10-grammar
24. ChineseTrack《Common Errors That Chinese Speakers Make in English》——V-13：https://www.chinesetrack.com/blog/common-errors-that-chinese-speakers-make-in-english/
25. KotoEnglish《Ditransitive Verbs》——CO-01：https://test11.kotoenglish.com/grammar/b2/ditransitive-verbs/
26. WordReference 论坛帖（学习者原句提问）——CO-05：https://forum.wordreference.com/threads/make-someone-do-adjective-or-%E2%80%9Dmake-someone-adjective%E2%80%9D.2960610/
27. UsingEnglish 论坛帖（promise somebody / to somebody 讨论）——CO-06：https://www.usingenglish.com/forum/threads/promise-somebody-or-to-somebody.207533/
28. Facebook 教学帖（A+ English，学习者错句批改）——CO-06：https://www.facebook.com/tr.yarmae/posts/pfbid02dm4yA4KbUNk5WtdoFPdQn8KKYQKeFKVZaBTxHQvz9SWzHLM3uFanARfJtxPuKvMFl
29. Quizizz《Collocation Battle: Marketing Edition》——V-42：https://quizizz-static.s3.us-east-1.amazonaws.com/_file_conversions/pdf/52fddc74-87cd-4958-908b-5c5a547252c2
30. PracticeMe《English Collocations for Speaking》——V-42：https://practiceme.app/blog/english-collocations-speaking
31. 《Helping Intermediate Learners With Multiword Verbs》（Scribd）——V-45：https://www.scribd.com/document/410653964/Helping-Intermediate-Learners-With-Multiword-Verbs
32. SmartysEnglish《Mastering Question Words》——QI-01：https://www.smartysenglish.com/blog/-mastering-question-words-what-where-when-how-more
33. Vedantu《How to Use Whose and Who's》——QI-03：https://www.vedantu.com/english/how-to-use-whose-and-whos
34. Vedantu《What do you do / How do you do》——CO-12：https://seo-fe.vedantu.com/english/what-do-you-do-how-do-you-do
35. TryKaiwa《English Phrases Foreigners Get Wrong》——CO-12：https://trykaiwa.com/blog/english-phrases-foreigners-get-wrong-2026
36. 5-Minute English《Mastering ESL Pronunciation: Intonation & Contrast》——QI-05：https://5minuteenglish.com/lessons/pronunciation/intonation-part-3-contrast/
37. Cchatty《Chinglish Decoded: Word Order Mastery》——QI-06：https://www.cchatty.com/chinglish-decoded-word-order-mastery-g-113263
38. 新东方中考英语语法总结（XDF）——QI-07：http://sh.xdf.cn/paopaoshaoer/201701/8321356.html
39. SSC Error Detection 练习集（kajubadamvocabulary）——QI-07：https://www.kajubadamvocabulary.in/error-detection/1
40. ICanRead《How can we help Simplified Chinese [learners]?》——QI-08：https://www.icanread.asia/curriculum-licensing/how-can-we-help-simplified-chinese/
41. Vocab5000《Because vs Because Of》——QI-09：https://www.vocab5000.com/confusing-words/because-vs-because-of
42. BBC Learning English（Facebook 评论区批改实例）——QI-09：https://www.facebook.com/reel/1125592760450721/
43. 《Daily Tips on Learning English》Lesson 13——QI-12：https://www.ny-yy.com/myfyjq-13.html
44. Teach-This《Present Simple WH Questions》——QI-14：https://www.teach-this.com/grammar/present-simple-wh-questions
45. Adazing《Infinitive Examples》——CO-14：https://www.adazing.com/infinitive-examples/
46. Instagram @happyenglishny 教学短视频——CO-14：https://www.instagram.com/reel/DaTyDzUz7hD/
47. 中考英语复习资料（360doc 转载）——CO-15：https://www.360doc.cn/article/1597421_88498996.html
48. EduSphere Academy 教学图文（Instagram）——V-29：https://www.instagram.com/p/DZpaZw9E7fP/
49. 英语教学短视频（Shashikant English Trainer）——V-14：https://www.facebook.com/reel/1042416945339583/
50. 英语教学短视频（StudyMania）——V-14：https://www.facebook.com/reel/4670588349835998/
51. Threads 教师观察帖（Cathy CFY，2026-07-16）——V-02：https://www.threads.com/@channncfy/post/Da2rxwJk9-c

## 4. 找不到真实病例的 7 条律

| 律 | 原因 |
|---|---|
| V-04 四种学习条件（四股） | 教学设计层面的律（听说读写四股如何配比），文献里没有与之对应的句级学习者错句；错句只能证明某一条，没法证明“四股配比”这个设计问题 |
| V-22 词义漂移四方向 | 历史语言学知识型律（nice、silly、gay 的古今义变）。查到的都是词义演变解说，没有学习者因此产出的句级错例——读古文误读古义是理解问题，无公开记录的错句 |
| V-23 同源对/三连词 | 知识型律（ward/guard、shirt/skirt 同源）。词典只确认同源关系，未见学习者混淆二者的句级错例记录 |
| V-26 原始印欧语 *spek- 词族 | 记忆法型律（inspect/respect/suspect 同根）。只找到 inspect/expect 易混词海报，无学习者混用二者的实录错句 |
| V-31 形态教学元分析 d≈0.32–0.33 | 教学效果统计型律（Goodwin & Ahn 元分析）。元分析只给效应量，不产生句级错例 |
| CO-11 先认模具后认动词 | 心理语言学实验型律（Bencini & Goldberg 2000 分类实验）。实验材料是 16 句合乎语法的句子按意义分类，没有学习者错句；“Sam sneezed the napkin off the table”是证明构式有意义的合法例句，不是错误 |
| QI-02 wh- 与 th- 两个词族 | 该律的核心混淆（there 当疑问词用）已被专区病例覆盖（QI-02 专区已有 "There is your book?"）；另查到的 wh 问句错例（"Where do that boy come from?"、"What does you like?"）属于助动词形态问题，是 QI-13/倒装的范畴，硬贴到 QI-02 会错配律义，故未收 |

## 5. 需要说明的病例处理（诚实标注）

1. **最小框架句**：V-02（rudimentary 代 basic）、V-19（interrogate 代 ask）、V-29（happyness）、V-27（people mountain people sea）——来源记录的是错误形式/替换本身，wrong 句是承载该形式的最小中性句框，未虚构错误类型；diag 中未声称整句逐字出自来源。
2. **理解性误读病例**：V-41（bank）——来源是 Fromkin 等人 (2011) 的歧义研究与学习者歧义理解实验，wrong 是学习者按“银行”义误读的句子，diag 已注明“理解性误读病例，不是产出性错句”。
3. **信息差替换**：QI-15 两例的 right 不是原句的逐字改正，而是按 Long (1983) 信息差原则换成的真问题（referential question），diag 中已注明。
4. **语调/重音标注**：QI-05、QI-08 的 wrong 含中文括号标注（平说/降调），沿用专区病例已有的标注惯例（如 QI-05 专区 "I said green, not BLUE.（想纠正对方说的 green，却把重音落在 blue 上）"）；QI-08 的 right 用 ↗/↘ 标升降调。
5. **来源强度不一**：V-14（教学短视频）、V-02（教师社交媒体观察帖）、V-30 第二例（西班牙语母语学习者研究）已在出处清单中注明，请总协调人复核是否接受；不接受可直接删条，不影响其余病例。
6. **CO-17 的 lawdata 为 null**：事实源里 CO-17 整条 lawdata 是 null，脚本为其新建最小 lawdata `{"id": "CO-17", "cases": [...]}` 并打印警告；其余 lawdata 字段（mech/exs/quiz 等）仍缺，由总协调人决定是否补。
7. **字段口径**：交付 JSON 每条病例含 8 个字段（wrong / right / type / diag / src / diag_kid + source / source_url）；脚本只把前 6 个规范字段写入事实源，`src` 即出处名，`source_url` 只留在交付 JSON 与本报告中，不引入新字段名进事实源。任务原文说的 "correct" 字段，事实源实际字段名是 `right`，以事实源为准。

## 6. 脚本实测结果（/tmp 副本，未动真文件）

- 复制 `laws-prototype/model/laws_master.json` 到 `/tmp/laws_master_test.json`，运行脚本：首跑 40 律 +68 例、跳过 0；第二遍 +0、跳过 68（幂等，去重逻辑生效）。
- 独立复核：副本与原文件逐律比对，只有 40 条目标律变化，且只动 `lawdata.cases`、只追加、原有病例顺序与内容不变；其余 416 条律逐字节等价。
- 写回格式与原文件一致：`json.dumps(ensure_ascii=False, indent=1)` 往返逐字节相等，无末尾换行。
- 新病例的 wrong 与全库已有 lawdata 病例、全部 QI 专区病例、以及主文件内现有 ERRIDX 381 行逐一做 `norm()` 比对：**0 碰撞**，即全部 68 例都会进入 ERRIDX。
- 真文件 `laws_master.json` 与主文件均未改动（`git status` 只有本目录新增文件）。

## 7. 应用后的连锁影响（需总协调人处理，不在本任务范围内）

1. `gen_errors.py` 的硬断言将失效：总数 381 → **449**，lawdata 来源 116 → **184**，覆盖律 217 → **247**（40 条目标律中有 30 条此前在 ERRIDX 中完全无病例，另 10 条 QI 律此前已有专区病例）。需更新断言后重新生成。
2. 主文件内 `var ERRIDX` 是生成副本，需由总协调人跑 `gen_errors.py --write` 重新生成（本任务未跑、不改主文件）。
3. §4 的 7 条律与 §5 第 5 点的 3 处来源强度问题，请总协调人定夺是否接受或另寻病例。
