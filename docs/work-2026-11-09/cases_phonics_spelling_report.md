# TODO 1.1 病例补齐（拼读+拼写区）报告

- 日期：2026-11-09
- 范围：拼读区 S-01–S-43（41 条）+ 拼写区 SR-01–SR-09（8 条），共 49 条律
- 交付：`docs/work-2026-11-09/cases_phonics_spelling.json`（病例数据）、
  `docs/work-2026-11-09/apply_cases_phonics_spelling.py`（合并脚本）、本报告
- 口径：以 `laws-prototype/tools/gen_errors.py` 的四路汇合+去重逻辑实测为准
  （lawdata.cases / yaml.error_cases / 专区 errors / parts errors，先到先得、律内按 `norm(wrong)` 去重）

## 结论先行

- **补了 49 条律、56 条病例**（42 条律各 1 例；7 条律各 2 例：S-03、S-33、S-42、SR-01、SR-02、SR-07、SR-08）。
- **找不到真实病例的律：0 条。** 49 条全部补上。
- 结构发现：52 条目标律中 **S-14、S-43、SR-04 已有 yaml 病例，无需补**（S-14 有 2 条、S-43 有 7 条、SR-04 有 1 条）；其余 49 条在 gen_errors 口径下确实缺病例。
- 另一结构发现：**49 条目标律的 `lawdata` 字段全为 null**（键在、值为 null），合并脚本需先创建 `lawdata: {"cases": [...]}` 再追加；这也是本批病例全部走 lawdata 来源的原因。
- 字段口径：严格照抄已有 `lawdata.cases` 条目的字段集 `{wrong, right, type, diag, src, diag_kid}`，
  另加任务要求的 `source_url`（出处链接）。`gen_errors.py` 只读其中 `wrong/right/diag/diag_kid`，
  `src` 与 `source_url` 对下游无害。`diag`（成人版）与 `diag_kid`（孩子版白话）在全部 56 条中均不相同。

## 覆盖表

| 律 | 病例数 | wrong（错形/错句） | 出处 |
|---|---|---|---|
| S-01 | 1 | car → CR | Treiman & Tincoff 1997 |
| S-02 | 1 | said → SED | Gentry 发展拼写（editorialge 综述） |
| S-03 | 2 | cat → CT；dog 读成 dig | Ehri 部分字母阶段（Brainscape） |
| S-04 | 1 | island 读成 IZ-land ⚠ | Kilpatrick 2019（引 Share） |
| S-05 | 1 | cat 只敲一下 | Liberman et al. 1974 |
| S-06 | 1 | said 读成 sayed | Pronuncian |
| S-07 | 1 | yacht 逐字母拼读成 /jætʃt/ ⚠ | Nation & Snowling 1998；Ricketts et al. 2008 |
| S-08 | 1 | banana 读成 BA-NA-NA | Deterding 2010；San Diego Voice and Accent |
| S-09 | 1 | and 读成 /ænd/ | Deterding 2006 |
| S-10 | 1 | revolution 读成 rev-lu-tion | Deterding 2006（Features of Chinese English 综述） |
| S-11 | 1 | I gave the book to HIM. ⚠ | Deterding 2006 |
| S-12 | 1 | an egg 听成 a negg | 《Connected Speech》连读章节 |
| S-13 | 1 | I want to leave. 听成 live | Jenkins 2000（JLS 2026 转述） |
| S-15 | 1 | great 读成 /ɡriːt/ ⚠ | 7ESL ea 词条；American Accent |
| S-16 | 1 | phone 写成 FONE | ELSA Speak 教学视频 |
| S-17 | 1 | I have two foots! | Berko 1958；Marcus et al. 1992（Lotusarise 综述） |
| S-18 | 1 | I have two watchs. | translateen 复数错误页 |
| S-19 | 1 | knight 读成 K-NIGHT | ESLBuzz（学生 Kenji 的真实误读） |
| S-20 | 1 | green HOUSE（指暖房） | Roach 2009（IOJPE 转述） |
| S-21 | 1 | Please sine your name here. ⚠ | Suber & Thorpe 同音词典 |
| S-22 | 1 | river 读成 RI-ver | Moments with Katie（OG tiger/camel 实录） |
| S-23 | 1 | hike 写成 HIGHK ◇ | Gentry 过渡阶段（editorialge 综述） |
| S-24 | 1 | beginning 写成 begining | detmocktests 拼写规则页 |
| S-25 | 1 | come 写成 KOM | Read 1975（Pitchford 讲义转述） |
| S-26 | 1 | chaos 读成 /tʃeɪɒs/ | Gettsly 发音视频 |
| S-27 | 1 | photography 读成 PHO-tography ⚠ | Coates 中国学习者错误讲义 |
| S-28 | 1 | cot 和 caught 读成一个音 | Labov, Ash & Boberg 2006（维基转述） |
| S-29 | 1 | colonel 读成 co-lo-nel | LanguageTool；Hanna et al. 1966 |
| S-30 | 1 | was 读成 /wɒ/ | Deterding 2006（LFC 论文转述） |
| S-31 | 1 | city 读成 /ˈkɪti/ | Storytime AI 软 c/g 词条 |
| S-32 | 1 | that 读成 dat | Deterding 2006 |
| S-33 | 2 | back 写成 bak；bridge 写成 brij | Sweet Phonics |
| S-34 | 1 | pen 写成 PAN | Treiman & Tincoff 1997 |
| S-35 | 1 | break 读成 /briːk/ ⚠ | Nation & Snowling 1998（Ricketts 转述）；7ESL |
| S-36 | 1 | sheep 读成 ship | Jenkins 2000（Patil 2008 转述） |
| S-37 | 1 | The knight rode through the nite. | Varsity Tutors（CCSS L.5.2.e） |
| S-38 | 1 | boat 写成 bote | Phonics Blocks（儿童真实作业） |
| S-39 | 1 | I see the moan. | Facebook 家庭作业照片 |
| S-40 | 1 | bird 读成 bard | Patil 2008（转述 Jenkins 2000） |
| S-41 | 1 | though 读成 /θaʊ/ ⚠ | Pronounce.tv |
| S-42 | 2 | through 写成 thru；enough 写成 enuff | SpellCast（引 DfE 国家课程拼写附录） |
| SR-01 | 2 | I am makeing a cake.；I am hopeing… | translateen 前后缀拼写页 |
| SR-02 | 2 | wel；clas | Akshita Jasolia FLOSS 教学视频练习页 |
| SR-03 | 1 | match 写成 mach | Sweet Phonics |
| SR-05 | 1 | boy 写成 boi | Logic of English 规则页 |
| SR-06 | 1 | station 读成 /ˈsteɪʃɪn/ | Tr Zay Yar Win 语音教材 Unit 6 |
| SR-07 | 2 | I recieve your letter.；weird 写成 wierd | 牛津语料库十大错拼（Dictionary.com）；detmocktests |
| SR-08 | 2 | laugh 读成 /lɔːf/ ⚠；bread 读成 /briːd/ ⚠ | Clymer 1963；wuolahstatic 讲义 |
| SR-09 | 1 | camel 读成 CAY-mel ⚠ | Moments with Katie（OG tiger/camel 实录） |

⚠ = 模式实例化（见下节）；◇ =  attested 错形用于分堆语境（见下节）。

## 诚实标注：证据等级

47 条病例是**逐字可证的错形**（文献/教材/作业照片原文著录的错误形式）。
以下 10 条的错误**模式**有文献依据，但例句是按该模式写出的典型呈现，须如实标注，不得当作逐字引文使用：

| 律 | 模式依据（文献已证） | 实例化部分 |
|---|---|---|
| S-04 | island 是 Kilpatrick 列出的“只差一个要素”的例外词 | 逐字母拼读得 IZ-land |
| S-07 | yacht 是 Nation & Snowling 列出的例外词，poor comprehenders 读例外词最差 | 逐字母拼读得 /jætʃt/ |
| S-11 | Deterding 2006 摘要著录“强调句尾代词” | 例句 I gave the book to HIM. |
| S-15 | great 的 ea 读 /eɪ/（7ESL 所列） | 按 eat 读成 /ɡriːt/ |
| S-21 | sign/sine 是同音词（Suber & Thorpe 词典著录） | 误写句 Please sine your name here. |
| S-27 | photograph→photography 重音移位是中国学习者难点（Coates） | 不移位读成 PHO-tography |
| S-35 | break 是 Nation & Snowling 列出的例外词 | 按 eat 读成 /briːk/ |
| S-41 | tough/through/though/thought 四词同含 -ough、四种读法（pronounce.tv） | 按 house 读成 /θaʊ/ |
| SR-08 两条 | laugh、bread 是 Clymer 1963 的破例词（口诀只对 45%） | 按 sauce/eat 读成 /lɔːf/、/briːd/ |

另有一条特殊口径：**S-23 的 HIGHK 是 Gentry 著录的真实错拼**（editorialge 综述原文 "HIGHK for hike"），
本任务将其归入“分堆放错堆”的呈现语境——错形本身是真实的，归类到分堆活动是本任务的教学呈现，不是文献原文的语境。

## 出处清单（source_url 均已逐条写入 JSON）

- Treiman & Tincoff 1997：https://www.academia.edu/11992187/The_fragility_of_the_alphabetic_principle_Childrens_knowledge_of_letter_names_can_cause_them_to_spell_syllabically_rather_than_alphabetically
- Gentry 发展拼写（editorialge）：https://editorialge.com/benefits-of-invented-spelling-early-literacy/
- Ehri 阶段（Brainscape）：https://www.brainscape.com/flashcards/phases-of-reading-development-19189467/packs/22946477
- Kilpatrick 2019 讲座：https://grasp-online.org/wp-content/uploads/2020/07/David-Kilpatrick-PPT-Nov-2019.pdf
- Liberman et al. 1974（Iowa IRRC）：https://irrc.education.uiowa.edu/transcript-and-sources-novel-idea-episode-4
- Pronuncian（said）：https://pronuncian.com/podcasts/episode37
- Ricketts, Bishop & Nation 2008：https://wrap.warwick.ac.uk/id/eprint/2816/1/WRAP_Ricketts_0874238-cedar-120210-rickettsbishopnationjrr.pdf
- Deterding 2010：https://www.academia.edu/4082428/Norms_for_pronunciation_in_Southeast_Asia
- Deterding 2006：https://www.academia.edu/25068140/The_pronunciation_of_English_by_speakers_from_China
- Features of Chinese English（Scribd）：https://www.scribd.com/document/762413585/Features-of-Chinese-English
- Deterding & Mohamad 2016（LFC）：https://www.academia.edu/102404547/The_Lingua_Franca_Core_and_Englishes_in_East_and_Southeast_Asia
- Connected Speech（Scribd）：https://www.scribd.com/document/527513937/Conected-Speech
- Jenkins LFC（JLS 2026）：https://jls.tu.edu.iq/index.php/jls/article/download/1837/1449/6960
- Jenkins/Patil（ship/sheep、bird/bard）：https://api.digiaccess.in/api/journals/labyrinth/articles/nativization-and-its-pedagogical-implications/pdf/
- 7ESL（ea）：https://7esl.com/vowel-digraph-ea/
- ELSA Speak（phone/FONE）：https://www.instagram.com/reel/DNvOxbtQuyQ/
- Berko/Marcus（Lotusarise 综述）：https://lotusarise.com/language-acquisition-stages-and-components-psychology-optional/
- translateen（复数错误）：https://www.translateen.com/blog/learn-english/what-are-some-common-mistakes-people-make-when-forming-plurals-in-english/
- translateen（前后缀拼写，makeing/hopeing）：https://www.translateen.com/blog/learn-english/how-can-learning-about-prefixes-suffixes-and-root-words-help-with-spelling-and-pronunciation-in-english/
- ESLBuzz（knight）：https://eslbuzz.com/silent-letters-in-english-words-the-sounds-of-silence/
- Roach 复合重音（IOJPE）：https://iojpe.org/index.php/iojpe/article/download/77/81/318
- Suber & Thorpe 同音词典：http://legacy.earlham.edu/~peters/writing/homofone.htm
- Moments with Katie（tiger/camel）：https://momentswithkatie.com/vcvtigercamel/
- detmocktests（拼写规则，beginning/weird）：https://detmocktests.com/blog/english-spelling-rules
- Read 1975（slideserve 讲义）：https://www.slideserve.com/dana/spelling-reading-development
- Gettsly（chaos）：https://www.gettsly.com/video/Hi_dmA74oZYJo
- Coates（slideserve）：https://dev1.slideserve.com/stamos/common-pronunciation-and-grammar-errors-faced-by-chinese-speakers-of-english
- Labov cot–caught（维基）：https://en.wikipedia.org/wiki/Cot-caught
- LanguageTool（colonel）：https://languagetool.org/insights/post/hard-words-to-spell-spelling/
- Storytime AI（软 c/g）：https://www.storytimeaiapp.com/glossary/soft-c-and-soft-g
- Sweet Phonics（ck/tch/dge）：https://sweetphonics.com/blog/ck-tch-dge-spelling-rules
- Varsity Tutors（nite）：https://widgets.varsitytutors.com/practice/subjects/5th-grade-writing/help/spell-grade-appropriate-words-correctly
- Phonics Blocks（bote）：https://www.facebook.com/PhonicsBlocks/posts/pfbid02JGLPSgjYsBG93SSaoSAUpmc6ASbRoospH88YRijFFVrEFArNATYRTj39ti1HsKnBl
- Facebook 家庭作业（moan）：https://www.facebook.com/naledi.yameso.58/posts/pfbid035RuGnGmLgmcfng11JMcQGEvxYFfieHmERZsvqejgYeS7C7Uo7yxgTCRTxbAdM5Aql
- Pronounce.tv（-ough）：https://pronounce.tv/articles/why-english-spelling-pronunciation-dont-match
- SpellCast（-ough）：https://spellcast.academy/spelling-resources/y5-6/ough.pdf
- FLOSS 教学视频（Instagram）：https://www.instagram.com/reel/DbBDZbrCKki/
- Logic of English（boy/boi，经 joprestia 转述）：https://joprestia.edublogs.org/2014/03/
- Tr Zay Yar Win 教材（station）：https://www.facebook.com/zayyarwin2022/posts/pfbid0Tu7vujj7HuWhxUbFrnmEcaqWww26NR3yY7TUn2v43jX3s5BQimujhqFtKFoJ2vGFl
- Dictionary.com（recieve）：https://www.dictionary.com/articles/most-commonly-misspelled-words
- Cracking the ABC Code（Clymer 45%）：https://crackingtheabccode.com/two-vowels-go-walking-myth/
- wuolahstatic 讲义（bread /e/ 组）：https://cdn.wuolahstatic.com/api/previews/document/12247313/v1-0/preview.pdf

## 找不到真实病例的律

**无。** 49 条全部找到真实病例（其中 10 条为例句实例化，见上节标注）。

## 合并脚本与 /tmp 实测

- 脚本：`docs/work-2026-11-09/apply_cases_phonics_spelling.py`，从仓库根目录运行，
  默认目标 `laws-prototype/model/laws_master.json`，可传参指定副本路径。
  行为：断言每条律存在、每条病例 7 个字段齐全且 `wrong/diag/diag_kid` 非空、
  `source_url` 为 http(s)、`wrong` 含英文字母（否则会变成教学法条目）、`diag ≠ diag_kid`；
  `lawdata` 为 null 时创建 `{"cases": []}`；按 `gen_errors.py` 的 `norm()`（已逐字照抄，含 PUNCT 集）
  对四路来源去重，重复则跳过并计数；只追加，不改其他任何字段。
- 实测（在 `/tmp/laws_master_test.json` 副本上，**未动真文件**）：
  - 第一遍：56 条全部追加、0 跳过、49 条律。
  - 第二遍（幂等性）：0 追加、56 跳过。
  - 逐律比对：副本中恰好 49 条律有变化，且每条仅 `lawdata: null → {"cases": [...]}`，
    其余字段与原文件逐字节一致。
  - JSON 合法；无空 `diag_kid`。

## 协调人注意：gen_errors.py 硬断言需更新

合并落地后，`gen_errors.py` 的 `build()` 硬断言会失败（这是预期内的，断言值是旧盘点数）。
用 `gen_errors.py` 自己的 `build()` 逻辑对合并后副本实测的新值：

| 指标 | 旧断言值 | 合并后实测 |
|---|---|---|
| 病例总数 | 381 | **437**（+56） |
| 覆盖律 | 217 | **266**（+49） |
| 来源 lawdata | 116 | **172**（+56） |
| 来源 yaml | 111 | 111（不变） |
| 来源 zone | 154 | 154（不变） |
| 教学法条目 | 55 | 55（不变） |
| 有辨析页的律 | 11 | 11（不变） |
| diag_kid 改写 | 223 | **279**（+56） |

更新 `gen_errors.py` 的断言值是另一项工作，不在本任务范围内；合并脚本本身不改该文件。
另：S-28（cot/caught）按口音合并处理为“口音差异、非错误”，diag 中已写明 RP/美式口音口径，
如需在产品中改为“不算错”的展示口径，请协调人定夺。
