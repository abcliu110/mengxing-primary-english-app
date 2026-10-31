# T3 更新包 · 词汇修正（vocab_update）

> 来源：`~/workspace/content-audit/report_vocab.md`（审查 354 单元：成立/基本成立 ≈86%，过度简化 39，错误 12）。
> 机器可读修正集：`docs/whiteboard/model/vocab_fixes.yaml`（46 条修正记录）。
> 口径：审查裁定即执行依据（通宵授权豁免拍板门）；修正文以报告所引一级来源（Etymonline / OED / 牛津·剑桥词典）为准绳。

## 一、分类统计

| 修正类型 | 条数 |
|---|---|
| 分型错误 | 20 |
| 事实错误 | 15 |
| 全称降格 | 7 |
| 概念错误 | 2 |
| 音标混标 | 2 |
| **合计** | **46** |

注：VF-033 一条覆盖 21 个 func_info 条目，VF-016 为 MH 全库字段结构修正，VF-017～VF-024 为 8 条 etymology 归位——实际受影响条目远多于 46。讲法升级 L-01～L-15 中涉及数据字段修改者已全部落为修正记录（L-13「拆词三问」为编辑判据，已写入 VF-036/037/039 的依据；L-12/L-15 的治理口径分别落实于 VF-028/029/034 与 VF-031/032）。

## 二、汇总表（原 → 新）

| ID | 库 · 条目 · 字段 | 类型 | 原文（节录） | 修正文（节录） |
|---|---|---|---|---|
| VF-001 | MH_VOCAB_DB · POLY_WATCH · etymology | 事实错误 | ⌚ 戴在手腕上随时低头"注视（watch）"时间的小机器，就叫手表 watch！ | ⌚ watch 这个词最早是"守夜、保持清醒"的意思。最早的"手表"其实是能把人叫醒的小闹钟——它替你"守夜"，到点喊你… |
| VF-002 | VOCAB_DB · POLY_WATCH · meaning | 事实错误 | 观看，注视（电视、比赛等动态画面） / 手表（戴在手腕上随时"看"时间的工具） | 观看，注视（电视、比赛等动态画面） / 手表（戴在手腕上的计时工具；名字来自古英语"守夜、唤醒"——最早的手表是能叫醒人… |
| VF-003 | MH_VOCAB_DB · G4_157 · etymology | 概念错误 | 💡 追光 -ight 家族领头羊：有光的地方既明亮，又轻盈，颜色又清浅！ | 💡 light 其实是两个长得一模一样的"陌生人"：一个 light 是"光"（light a candle），一个 l… |
| VF-004 | MH_VOCAB_DB · G3_130 · etymology | 事实错误 | 👫 一辈子在一起直到最后（end）也不分开的人，就是好朋友 friend！ | 👫 真身世：friend 的老祖宗是古英语 frēond，意思是"爱着你的人"（来自 frēon"去爱"）——朋友的本质… |
| VF-005 | MH_VOCAB_DB · G6_278 · etymology | 事实错误 | 🧑‍🔬 把科学（science）末尾的 ce 换成专家尾巴 -tist，探索宇宙奥秘的人就是科学家 scientist！ | 🧑‍🔬 scientist 是个"发明出来的词"，年纪比火车还小：1833 年，英国学者 Whewell 觉得研究科学的… |
| VF-006 | MH_VOCAB_DB · G1_001 · affix_root | 分型错误 | 🧩 基础词根 bag ➔ schoolbag (书包) · handbag (手提包) | 🧩 复合词：bag 本身就是一个完整的词（不是词根），schoolbag = school + bag（书包）、hand… |
| VF-007 | MH_VOCAB_DB · G1_002 · etymology | 事实错误 | 📖 古人把字写在桦树皮木片（book）上订成册，后来既指书本，又指登记预订！ | 📖 一种主流说法：book 和"山毛榉树"（beech）是亲戚——日耳曼人把文字刻在山毛榉木片上订成册（这是学界主流假说… |
| VF-008 | MH_VOCAB_DB · G1_009 · affix_root | 事实错误 | 🧩 eye (眼睛) ➔ eyebrow (眉毛) · eyesight (视力) · glasses (眼镜) | 🧩 eye (眼睛) ➔ eyebrow (眉毛) · eyesight (视力)（glasses"眼镜"是 glass… |
| VF-009 | MH_VOCAB_DB · G1_039 · affix_root | 分型错误 | 🧩 or-ange（注意元音音素 /ɔː/ 开头，一个橙子必用 an orange） | （本条 affix_root 清空：orange 不可这样拆——它源自梵语 nāraṅga 经波斯语、阿拉伯语、法语辗转… |
| VF-010 | MH_VOCAB_DB · G2_0489 · syntax_contrast | 全称降格 | 【The 的生死线】play + 球类/棋类 绝不加 the；play + 西洋乐器 必须加 the！ | 【play 的冠词习惯】play 后面跟球类、棋类：不加 the（play football）；跟乐器：一般加 the（… |
| VF-011 | MH_VOCAB_DB · G1_017 · syntax_contrast | 全称降格 | 【单复数同形三剑客】sheep（绵羊）、deer（鹿）、fish（鱼条数）复数绝不加 s！ | 【单复数同形三剑客】sheep（绵羊）、deer（鹿）复数永远是原形；fish 有个小机关：看一群鱼用 fish 不变（… |
| VF-012 | MH_VOCAB_DB · G1_055 · syntax_contrast | 全称降格 | 【不可数名词铁律】water 绝不能加 a 或 s，谓语配单数 Water is important。 | 【不可数名词主干规则】water 一般不加 a 或 s，谓语配单数（Water is important）；但指"水域、… |
| VF-013 | MH_VOCAB_DB · G3_Q08 · syntax_contrast | 全称降格 | 【可数与不可数提问铁律】How many 后必须紧跟可数名词复数；How much 问不可数或金钱价格。 | 【可数与不可数提问规则】How many 后面跟被问的那个可数名词、用复数（How many books?）；上文已经很… |
| VF-014 | MH_VOCAB_DB · G1_P01 · syntax_contrast | 全称降格 | 【代词变格铁律】英语代词必须随句中位置变格，且名物代 = 形物代 + 名词（mine = my book）。 | 【代词变格规则】英语代词随句中位置变格。名物代大多是"形物代的独立版"：my→mine、your→yours、her→h… |
| VF-015 | MH_VOCAB_DB · G6_264 · syntax_contrast | 分型错误 | 【将来时计划铁律】含有 tomorrow/tonight/next week 时，用 be going to + 动词原… | （本条 syntax_contrast 清空：原内容是与 dictionary 无关的将来时规则，属字段内容错位，已移出… |
| VF-016 | MH_VOCAB_DB · （全库结构） · etymology（字段定义） | 分型错误 | etymology 单栏混装：真词源、联想故事、可数性/冠词/义项等用法说明不加区分（22 条中仅少数为真词源）。 | 字段拆为三栏并强制标注：①【单词身世】（有 Etymonline/OED 级出处才准用）；②【巧记故事】（编的故事，明说… |
| VF-017 | MH_VOCAB_DB · G1_017 · etymology | 分型错误 | 📖 游在水里数条数是可数（单复同形），端上餐桌吃鱼肉是不可数！ | （移出 etymology 栏 → 【用法说明】栏，原文保留不改动；etymology 栏清空，待按【单词身世】标准补写… |
| VF-018 | MH_VOCAB_DB · G1_055 · etymology | 分型错误 | 💧 既是不可数名词"水"，也是动词"浇水"！ | （移出 etymology 栏 → 【用法说明】栏，原文保留不改动；etymology 栏清空，待按【单词身世】标准补写… |
| VF-019 | MH_VOCAB_DB · G2_080 · etymology | 分型错误 | 🏞️ 供人散步停留的绿地是名词"公园"，供车辆停靠的动作是动词"停车"！ | （移出 etymology 栏 → 【用法说明】栏，原文保留不改动；etymology 栏清空，待按【单词身世】标准补写… |
| VF-020 | MH_VOCAB_DB · G2_0489 · etymology | 分型错误 | 🎮 三合一全能王：玩游戏、打球（零冠词）、弹琴（定冠词 the）、演话剧！ | （移出 etymology 栏 → 【用法说明】栏，原文保留不改动；etymology 栏清空，待按【单词身世】标准补写… |
| VF-021 | MH_VOCAB_DB · G1_001 · etymology | 分型错误 | 📖 b-a-g 三个字母拼成随身小包，衍生出 schoolbag（书包）、handbag（手提包）！ | （移出 etymology 栏 → 【用法说明】栏，原文保留不改动；etymology 栏清空，待按【单词身世】标准补写… |
| VF-022 | MH_VOCAB_DB · G4_174 · etymology | 分型错误 | 📚 既指"学习"的动作，也指家里专门用来学习的"书房"！ | （移出 etymology 栏 → 【用法说明】栏，原文保留不改动；etymology 栏清空，待按【单词身世】标准补写… |
| VF-023 | MH_VOCAB_DB · G3_Q08 · etymology | 分型错误 | 🔢 单用 how 问方式或身体；加 many 数可数复数；加 much 问不可数或价格！ | （移出 etymology 栏 → 【用法说明】栏，原文保留不改动；etymology 栏清空，待按【单词身世】标准补写… |
| VF-024 | MH_VOCAB_DB · G1_P01 · etymology | 分型错误 | 🙋 句首当队长用大写的 I，动介词后用宾格 me，牵着名词用 my，独立结尾用 mine！ | （移出 etymology 栏 → 【用法说明】栏，原文保留不改动；etymology 栏清空，待按【单词身世】标准补写… |
| VF-025 | VOCAB_DB · G4_195 · spelling_alert | 事实错误 | ⚠️ 易错预警：有生命的植物果实以 o 结尾，复数要加 es（tomatoes）！ | ⚠️ 易错预警：-o 结尾的词变复数没有总规则，只有一张小名单要死记：hero、potato、tomato、echo 加… |
| VF-026 | VOCAB_DB · G4_0451 · spelling_alert | 事实错误 | ⚠️ 易错预警：元音串 eau 别漏字母！巧记：b + eau（美丽的水）+ ti + ful。 | ⚠️ 易错预警：元音串 eau 别漏字母！巧记：b + eau + ti + ful——eau 三个字母连在一起最容易漏… |
| VF-027 | VOCAB_DB · G5_0605 · spelling_alert | 全称降格 | ⚠️ 易错预警：首字母大写，第一个 r 不发音但必须写出来（Feb-ru-ary）！ | ⚠️ 易错预警：首字母大写，拼写时第一个 r 必须写出来（Feb-ru-ary）！发音上它随口音变：英式常读出来，美式口… |
| VF-028 | VOCAB_DB · G1_055 · phonetic | 音标混标 | /ˈwɔːtər/（英式元音 + 美式卷舌 r 的拼接体，两式皆非） | 二选一并全库统一：英式 /ˈwɔːtə/；美式 /ˈwɔːt̬ɚ/（简化标法 /ˈwɔːtər/ 仅当全库以美式为准且 … |
| VF-029 | VOCAB_DB · G6_0778 · phonetic | 音标混标 | /ˈneɪbərhʊd/（英式拼写词条配美式音标） | 与英式拼写对齐：/ˈneɪbəhʊd/。（若全库最终定美式：词条改拼 neighborhood、音标保留 /ˈneɪbə… |
| VF-030 | VOCAB_DB · G3_K48 · meaning | 概念错误 | 将；……好吗（提建议） | ……好吗（用于 I / we 开头的问句提建议：Shall we go?）；将要（正式/书面语，日常口语少用） |
| VF-031 | VOCAB_DB · G1_002 · meaning | 分型错误 | 书，书本（has_polysemy=true 但"预订"义缺失，与 MH 不一致） | 书，书本；预订（动词：book a ticket 预订票） |
| VF-032 | VOCAB_DB · G2_080 · meaning | 分型错误 | 公园（has_polysemy=true 但"停车"义缺失，与 MH 不一致） | 公园；停车（动词：park the car 停车） |
| VF-033 | VOCAB_DB · G4_0425、G5_0426、G5_0427、G5_0428、G5_0429、G5_0430、G5_0431、G4_0432、G5_0433、G5_0434、G5_0435、G5_0612、G5_0613、G5_0614、G5_0615、G6_0616、G6_0617、G6_0618、G5_0638、G4_0721、G4_0722 · func_info.tip | 分型错误 | 高频功能词（代词/介词）：主要承担句子连接、指代或空间时间定位功能，建议结合 Sight Words 与语法模块掌握。（… | 删除模板套话，逐条按"功能目的式 + 最小对立"人工撰写。已定稿示范两条——everyone："everyone 是'全… |
| VF-034 | VOCAB_DB · （全库结构，822/1567 条为空） · sight_type | 分型错误 | sight_type 仅 decodable / irregular 两类且 52% 为空；irregular 的 19… | 按可操作定义重建三档：①全规则 decodable（能靠拼读规则自己读出，如 bag）；②一半规则一半死记 partly… |
| VF-035 | WORD_FORMATION_DB · compounds · newspaper · tip | 事实错误 | 印满四方新闻的纸（news=North+East+West+South） | 印满新闻的纸。news 的真身世很简单：它就是 new（新的）变成的名词——"一堆新事情"。网上流传的"North+Ea… |
| VF-036 | WORD_FORMATION_DB · prefixes · pre- · examples | 事实错误 | pare ➔ prepare（提前准备） | （删除本例）prepare 拆不成 pre- + pare：它来自拉丁语 praeparāre（prae"预先" + p… |
| VF-037 | WORD_FORMATION_DB · prefixes · auto- · examples | 事实错误 | matic ➔ automatic（自动的） | auto-（自己、自动）例词改为：mobile ➔ automobile（汽车）、autograph（亲笔签名）。aut… |
| VF-038 | WORD_FORMATION_DB · prefixes · mis- · examples | 事实错误 | take ➔ mistake（错误） | take ➔ mistake（误拿；误解） |
| VF-039 | WORD_FORMATION_DB · roots · vis/vid · words | 事实错误 | visit (vis 看 + it 走 ➔ 走过去看望：参观/拜访) | visit (vis 看 ➔ 一再去看 ➔ 参观/拜访)——它来自拉丁语 vīsitāre，是 vīsere"去看"的反… |
| VF-040 | WORD_FORMATION_DB · compounds · strawberry · tip | 全称降格 | 铺着稻草种植的红浆果 | 红浆果；straw 的来历学界还没有定论——一种说法是莓田里铺稻草护果，另有"茎蔓散乱如草""果面籽粒如草屑"等说法。先… |
| VF-041 | WORD_FORMATION_DB · prefixes · en- · examples | 分型错误 | joy ➔ enjoy (享有/喜爱)（与 rich ➔ enrich 并列作 en- 派生演示） | （从 en- 派生演示中移出）enjoy 是经古法语 enjoir 整体借进英语的，不是在英语里用 en- 现场加在 j… |
| VF-042 | WORD_FORMATION_DB · family_matrices · teach · opposite | 分型错误 | opposite: learn (学习) | opposite: —（teach 没有反义词；learn 是"对转词"——同一件事的施受两面，如 buy/sell，不… |
| VF-043 | WORD_RELATIONS_DB · synonyms · 桌子组 · words | 事实错误 | desk（带抽屉用于读书办公的书桌/课桌），table（无抽屉用于吃饭聚餐的餐桌/圆桌） | desk（干活的台面：写字、办公、上课用的书桌/课桌），table（摆东西、吃饭的台面：餐桌/桌子）——区别在"干什么活… |
| VF-044 | WORD_RELATIONS_DB · synonyms · 英美同义词对 · group（类目名与释义） | 分型错误 | 组名"英美同义词对"；其中 shop (英：商店) = store (美) | 组名改为"英美方言等价词"（同一东西在英式/美式里的不同说法，不是同义词）。shop/store 一对改注：shop（商… |
| VF-045 | WORD_RELATIONS_DB · category_sets · season & weather · hypernym / hyponyms | 分型错误 | hypernym "season & weather (四季与天气)"，hyponyms 混装 spring…winte… | 拆为两个集合：① season（四季）：spring、summer、autumn、winter；② weather（天气… |
| VF-046 | HOMOPHONES_DB · HM02 · words[two].tip | 事实错误 | 中间藏着静音 w（像双胞胎 twin 的 w） | 中间藏着静音 w（像 write、wrong 里的静音 w 一样，写出来但不发音） |

## 三、逐条全文（原 → 新）

### VF-001（报告 W-01）MH_VOCAB_DB · POLY_WATCH · watch · etymology —— 事实错误（严重度 高）

- **原**：⌚ 戴在手腕上随时低头"注视（watch）"时间的小机器，就叫手表 watch！
- **新**：⌚ watch 这个词最早是"守夜、保持清醒"的意思。最早的"手表"其实是能把人叫醒的小闹钟——它替你"守夜"，到点喊你起床，所以继承了 watch 这个名字；后来它越做越小，戴上了手腕。
- **依据**：Etymonline：watch（名词"表"义）源自古英语 wæcce"守醒、守夜"，表义（1580年代）由"能唤醒睡者的闹钟"义发展而来；词源学家 Ayto：手表得名"probably not because you look at it, but because originally it woke you up"。报告 ④ L-02 讲法。
- **联动**：VF-002

### VF-002（报告 W-01）VOCAB_DB · POLY_WATCH · watch · meaning —— 事实错误（严重度 高）

- **原**：观看，注视（电视、比赛等动态画面） / 手表（戴在手腕上随时"看"时间的工具）
- **新**：观看，注视（电视、比赛等动态画面） / 手表（戴在手腕上的计时工具；名字来自古英语"守夜、唤醒"——最早的手表是能叫醒人的小闹钟）
- **依据**：同 VF-001：MH 与 VOCAB 同一假词源故事跨库联动修正（报告 W-01 注明 VOCAB meaning 需一并改）。
- **联动**：VF-001

### VF-003（报告 W-02）MH_VOCAB_DB · G4_157 · light · etymology —— 概念错误（严重度 高）

- **原**：💡 追光 -ight 家族领头羊：有光的地方既明亮，又轻盈，颜色又清浅！
- **新**：💡 light 其实是两个长得一模一样的"陌生人"：一个 light 是"光"（light a candle），一个 light 是"轻"（light as a feather）。它们祖上不是一家，只是后来拼写撞衫了。判断方法：看搭配——跟 lamp、sun 一组的是"光"，跟 heavy 相反的是"轻"。（类比边界："撞衫"只指外形同、来源异；日常使用仍须按语境选义。）
- **依据**：Etymonline/OED：light"光"源自印欧根 *leuk-（发光），light"轻"源自印欧根 *legʷʰ-（轻），古英语中为两个词（lēoht / lēoht），仅拼写趋同。报告 ④ L-03 讲法。

### VF-004（报告 W-03）MH_VOCAB_DB · G3_130 · friend · etymology —— 事实错误（严重度 高）

- **原**：👫 一辈子在一起直到最后（end）也不分开的人，就是好朋友 friend！
- **新**：👫 真身世：friend 的老祖宗是古英语 frēond，意思是"爱着你的人"（来自 frēon"去爱"）——朋友的本质是"爱你的人"，这才是它真正的来历。（拼写小钩子另见巧记栏：fri+end 只帮记拼写，不是来历。）
- **依据**：Etymonline/OED：friend < 古英语 frēond（frēon"爱"的现在分词），与 end 无任何关系。报告 ④ L-04 讲法。注：VOCAB_DB G3_130 spelling_alert 将同一故事明确标作"巧记"，属合法记忆术，不改；错只在 MH 把它写进 etymology 当身世。
- **联动**：VF-031

### VF-005（报告 W-04）MH_VOCAB_DB · G6_278 · scientist · etymology —— 事实错误（严重度 中）

- **原**：🧑‍🔬 把科学（science）末尾的 ce 换成专家尾巴 -tist，探索宇宙奥秘的人就是科学家 scientist！
- **新**：🧑‍🔬 scientist 是个"发明出来的词"，年纪比火车还小：1833 年，英国学者 Whewell 觉得研究科学的人没有统一称呼，就仿照 artist（艺术家）的样子，给 science 安上"做这行的人"的尾巴 -ist，造出了 scientist。它不是从 science 里"换零件"变出来的，是照着 artist 的样子新造的。（提醒：-ist 不是万能尾巴，不能类推造词。）
- **依据**：OED：scientist 首证 1834 年 Whewell 书评，1833 年由其仿 artist 类推新造（"by analogy with artist"）；构词为词干 scient- + 后缀 -ist，不存在"ce 换 -tist"一步，"-tist"非后缀。报告 ④ L-08 讲法。同条 affix_root"sci（知晓）"本身正确（拉丁 scīre），不改；WORD_FORMATION_DB 后缀表"science ➔ scientist（加 -ist）"口径正确，与本条修正后一致（消除报告 C-06 的跨库矛盾）。

### VF-006（报告 W-07）MH_VOCAB_DB · G1_001 · bag · affix_root —— 分型错误（严重度 中）

- **原**：🧩 基础词根 bag ➔ schoolbag (书包) · handbag (手提包)
- **新**：🧩 复合词：bag 本身就是一个完整的词（不是词根），schoolbag = school + bag（书包）、handbag = hand + bag（手提包）——两个现成的词拼成新词，叫复合词。
- **依据**：构词学常识：bag 为自由语素（独立单词），schoolbag、handbag 为复合词而非词根派生；原标签"词根"会污染词根/复合的区分（报告 W-07）。

### VF-007（报告 W-08）MH_VOCAB_DB · G1_002 · book · etymology —— 事实错误（严重度 中）

- **原**：📖 古人把字写在桦树皮木片（book）上订成册，后来既指书本，又指登记预订！
- **新**：📖 一种主流说法：book 和"山毛榉树"（beech）是亲戚——日耳曼人把文字刻在山毛榉木片上订成册（这是学界主流假说，不是百分百定论）。后来"书"又引申出"登记入册"，所以 book 还能当"预订"讲。
- **依据**：Etymonline：book 与 beech（山毛榉）的关联为词源学界主流假说；原文"桦树皮"树种错误（桦树 = birch）。报告 W-08。

### VF-008（报告 W-09）MH_VOCAB_DB · G1_009 · eye · affix_root —— 事实错误（严重度 中）

- **原**：🧩 eye (眼睛) ➔ eyebrow (眉毛) · eyesight (视力) · glasses (眼镜)
- **新**：🧩 eye (眼睛) ➔ eyebrow (眉毛) · eyesight (视力)（glasses"眼镜"是 glass 的复数转指，与 eye 没有构词关系，已移出本条）
- **依据**：glasses 源自 glass（玻璃/镜片材料），与 eye 无构词关系（报告 W-09）。

### VF-009（报告 W-10）MH_VOCAB_DB · G1_039 · orange · affix_root —— 分型错误（严重度 中）

- **原**：🧩 or-ange（注意元音音素 /ɔː/ 开头，一个橙子必用 an orange）
- **新**：（本条 affix_root 清空：orange 不可这样拆——它源自梵语 nāraṅga 经波斯语、阿拉伯语、法语辗转而来，"or-ange"是为发音硬切的假块。发音提醒"以元音音开头、用 an orange"移入拼读提示栏。）
- **依据**：Etymonline：orange < 梵语 nāraṅga，经波斯语 nārang、阿拉伯语 nāranj、法语 orenge 传入，切分点在历史中不存在（报告 W-10）。本条 etymology"先有水果名、后有颜色名"成立，保留不改。

### VF-010（报告 W-05 / L-05）MH_VOCAB_DB · G2_0489 · play · syntax_contrast —— 全称降格（严重度 中）

- **原**：【The 的生死线】play + 球类/棋类 绝不加 the；play + 西洋乐器 必须加 the！
- **新**：【play 的冠词习惯】play 后面跟球类、棋类：不加 the（play football）；跟乐器：一般加 the（play the piano）——不分西洋还是民族乐器（play the erhu 也一样）。小口袋再装一条：美国人口语里乐器前的 the 常常省掉，听到 play piano 别奇怪，那不是错。"一般"二字不许删。
- **依据**：报告 W-05 / L-05：主干规则成立，但"绝不/必须"双全称过头——美式口语 play piano 省 the 常见；规则对象应为"乐器类"而非"西洋乐器"。

### VF-011（报告 W-06 / L-06）MH_VOCAB_DB · G1_017 · fish · syntax_contrast —— 全称降格（严重度 中）

- **原**：【单复数同形三剑客】sheep（绵羊）、deer（鹿）、fish（鱼条数）复数绝不加 s！
- **新**：【单复数同形三剑客】sheep（绵羊）、deer（鹿）复数永远是原形；fish 有个小机关：看一群鱼用 fish 不变（three fish），数"有多少种鱼"时可以加 -es 变 fishes。
- **依据**：牛津/剑桥词典：fishes 为合法复数（指种类或多条个体，如 the fishes of the Pacific）。与 VOCAB_DB G3_127 fish spelling_alert"指种类时才加 es"对齐——消除报告 W-06 指出的 MH 与 VOCAB 自相矛盾。报告 ④ L-06 讲法（镜头框架）。

### VF-012（报告 W-11）MH_VOCAB_DB · G1_055 · water · syntax_contrast —— 全称降格（严重度 低）

- **原**：【不可数名词铁律】water 绝不能加 a 或 s，谓语配单数 Water is important。
- **新**：【不可数名词主干规则】water 一般不加 a 或 s，谓语配单数（Water is important）；但指"水域、水体"时有 waters 的用法（如 territorial waters 领海）——"一般"指日常喝的水那种情形。
- **依据**：词典例证：waters"水域"为标准用法（报告 W-11）。

### VF-013（报告 W-12）MH_VOCAB_DB · G3_Q08 · how / how many / how much · syntax_contrast —— 全称降格（严重度 中）

- **原**：【可数与不可数提问铁律】How many 后必须紧跟可数名词复数；How much 问不可数或金钱价格。
- **新**：【可数与不可数提问规则】How many 后面跟被问的那个可数名词、用复数（How many books?）；上文已经很清楚时，名词可以省掉（How many are there?）。How much 问不可数的量或金钱价格。
- **依据**：报告 W-12：名词承前省略（How many are there?）为合法反例，"必须紧跟"不成立。

### VF-014（报告 C-02）MH_VOCAB_DB · G1_P01 · I / me / my / mine · syntax_contrast —— 全称降格（严重度 中）

- **原**：【代词变格铁律】英语代词必须随句中位置变格，且名物代 = 形物代 + 名词（mine = my book）。
- **新**：【代词变格规则】英语代词随句中位置变格。名物代大多是"形物代的独立版"：my→mine、your→yours、her→hers、our→ours、their→theirs（多在尾巴上加 -s 或换尾）；但 his 主格形物两用同形、its 几乎不当名物代用——这两个要单独记。"mine = my book"只是帮记的钩子，不是拼法公式。
- **依据**：报告 C-02：hers 并非"her + 名词"的简单拼接（需加 -s），its 亦为例外；原式立为"铁律"不成立，降格为倾向 + 例外清单。

### VF-015（报告 W-12）MH_VOCAB_DB · G6_264 · dictionary · syntax_contrast —— 分型错误（严重度 中）

- **原**：【将来时计划铁律】含有 tomorrow/tonight/next week 时，用 be going to + 动词原形表计划打算。
- **新**：（本条 syntax_contrast 清空：原内容是与 dictionary 无关的将来时规则，属字段内容错位，已移出本词条。该规则本身亦需降格——"有计划打算常用 be going to，will 也可以"，归语法库将来时条目处理。）
- **依据**：报告 W-12 后半：dictionary 条的 syntax_contrast 与本词无关；且"含 tomorrow 就用 be going to"过头（will 同样可以）。本条 etymology/affix_root 的 dict 词根内容成立，保留。

### VF-016（报告 C-01 / L-01）MH_VOCAB_DB · （全库结构） · — · etymology（字段定义） —— 分型错误（严重度 高）

- **原**：etymology 单栏混装：真词源、联想故事、可数性/冠词/义项等用法说明不加区分（22 条中仅少数为真词源）。
- **新**：字段拆为三栏并强制标注：①【单词身世】（有 Etymonline/OED 级出处才准用）；②【巧记故事】（编的故事，明说"这是编来帮你记住的，不是真的来历"）；③【用法说明】（可数性、冠词、义项辨析等从 etymology 栏移出）。查不到出处的"身世"一律降格为【巧记故事】。
- **依据**：报告 C-01 / L-01：字段名实不符是假词源的总源头；联想可留但必须贴标签。

### VF-017（报告 C-01 / L-01）MH_VOCAB_DB · G1_017 · fish · etymology —— 分型错误（严重度 中）

- **原**：📖 游在水里数条数是可数（单复同形），端上餐桌吃鱼肉是不可数！
- **新**：（移出 etymology 栏 → 【用法说明】栏，原文保留不改动；etymology 栏清空，待按【单词身世】标准补写有出处的真词源——见存疑清单。）原因为：内容为可数性说明，不是词源。
- **依据**：报告 C-01 点名：fish、water、park、play、bag 等条 etymology 装的不是词源；L-01 字段三分方案。
- **联动**：VF-016

### VF-018（报告 C-01 / L-01）MH_VOCAB_DB · G1_055 · water · etymology —— 分型错误（严重度 中）

- **原**：💧 既是不可数名词"水"，也是动词"浇水"！
- **新**：（移出 etymology 栏 → 【用法说明】栏，原文保留不改动；etymology 栏清空，待按【单词身世】标准补写有出处的真词源——见存疑清单。）原因为：内容为词性/义项说明，不是词源。
- **依据**：报告 C-01 点名：fish、water、park、play、bag 等条 etymology 装的不是词源；L-01 字段三分方案。
- **联动**：VF-016

### VF-019（报告 C-01 / L-01）MH_VOCAB_DB · G2_080 · park · etymology —— 分型错误（严重度 中）

- **原**：🏞️ 供人散步停留的绿地是名词"公园"，供车辆停靠的动作是动词"停车"！
- **新**：（移出 etymology 栏 → 【用法说明】栏，原文保留不改动；etymology 栏清空，待按【单词身世】标准补写有出处的真词源——见存疑清单。）原因为：内容为义项罗列，不是词源。
- **依据**：报告 C-01 点名：fish、water、park、play、bag 等条 etymology 装的不是词源；L-01 字段三分方案。
- **联动**：VF-016

### VF-020（报告 C-01 / L-01）MH_VOCAB_DB · G2_0489 · play · etymology —— 分型错误（严重度 中）

- **原**：🎮 三合一全能王：玩游戏、打球（零冠词）、弹琴（定冠词 the）、演话剧！
- **新**：（移出 etymology 栏 → 【用法说明】栏，原文保留不改动；etymology 栏清空，待按【单词身世】标准补写有出处的真词源——见存疑清单。）原因为：内容为用法罗列，不是词源。
- **依据**：报告 C-01 点名：fish、water、park、play、bag 等条 etymology 装的不是词源；L-01 字段三分方案。
- **联动**：VF-016

### VF-021（报告 C-01 / L-01）MH_VOCAB_DB · G1_001 · bag · etymology —— 分型错误（严重度 中）

- **原**：📖 b-a-g 三个字母拼成随身小包，衍生出 schoolbag（书包）、handbag（手提包）！
- **新**：（移出 etymology 栏 → 【用法说明】栏，原文保留不改动；etymology 栏清空，待按【单词身世】标准补写有出处的真词源——见存疑清单。）原因为：内容为拼读+复合词说明，不是词源。
- **依据**：报告 C-01 点名：fish、water、park、play、bag 等条 etymology 装的不是词源；L-01 字段三分方案。
- **联动**：VF-016

### VF-022（报告 C-01 / L-01）MH_VOCAB_DB · G4_174 · study · etymology —— 分型错误（严重度 中）

- **原**：📚 既指"学习"的动作，也指家里专门用来学习的"书房"！
- **新**：（移出 etymology 栏 → 【用法说明】栏，原文保留不改动；etymology 栏清空，待按【单词身世】标准补写有出处的真词源——见存疑清单。）原因为：内容为义项说明，不是词源。
- **依据**：报告 C-01 点名：fish、water、park、play、bag 等条 etymology 装的不是词源；L-01 字段三分方案。
- **联动**：VF-016

### VF-023（报告 C-01 / L-01）MH_VOCAB_DB · G3_Q08 · how / how many / how much · etymology —— 分型错误（严重度 中）

- **原**：🔢 单用 how 问方式或身体；加 many 数可数复数；加 much 问不可数或价格！
- **新**：（移出 etymology 栏 → 【用法说明】栏，原文保留不改动；etymology 栏清空，待按【单词身世】标准补写有出处的真词源——见存疑清单。）原因为：内容为用法说明，不是词源。
- **依据**：报告 C-01 点名：fish、water、park、play、bag 等条 etymology 装的不是词源；L-01 字段三分方案。
- **联动**：VF-016

### VF-024（报告 C-01 / L-01）MH_VOCAB_DB · G1_P01 · I / me / my / mine · etymology —— 分型错误（严重度 中）

- **原**：🙋 句首当队长用大写的 I，动介词后用宾格 me，牵着名词用 my，独立结尾用 mine！
- **新**：（移出 etymology 栏 → 【用法说明】栏，原文保留不改动；etymology 栏清空，待按【单词身世】标准补写有出处的真词源——见存疑清单。）原因为：内容为用法说明，不是词源。
- **依据**：报告 C-01 点名：fish、water、park、play、bag 等条 etymology 装的不是词源；L-01 字段三分方案。
- **联动**：VF-016

### VF-025（报告 V-01 / L-07）VOCAB_DB · G4_195 · tomato · spelling_alert —— 事实错误（严重度 高）

- **原**：⚠️ 易错预警：有生命的植物果实以 o 结尾，复数要加 es（tomatoes）！
- **新**：⚠️ 易错预警：-o 结尾的词变复数没有总规则，只有一张小名单要死记：hero、potato、tomato、echo 加 -es；其余认识的 -o 词（photo、piano、radio、kilo）都加 -s。名单用钩子背："英雄爱吃土豆和西红柿"（见 potato 条）。
- **依据**：报告 V-01 / L-07：伪规则——判据"有生命的植物果实"不成立，同库 photo 条（G4_0381）"复数直接加 s（photos）"即为反例；-es 组实为需死记的小名单。修正后与 potato 条（G4_193）的名单钩子统一，消除两条互相打架。

### VF-026（报告 V-02）VOCAB_DB · G4_0451 · beautiful · spelling_alert —— 事实错误（严重度 低）

- **原**：⚠️ 易错预警：元音串 eau 别漏字母！巧记：b + eau（美丽的水）+ ti + ful。
- **新**：⚠️ 易错预警：元音串 eau 别漏字母！巧记：b + eau + ti + ful——eau 三个字母连在一起最容易漏，单独圈出来记。（beautiful 的构词是 beauty + -ful；eau 只是借来记字母顺序的串，不要讲成"美丽的水"。）
- **依据**：报告 V-02：eau 是法语"水"，不是"美丽的水"，原释义把 beau（美）的语义错安到 eau 头上；口诀可留，释义须删。构词依据：beauty + -ful。

### VF-027（报告 V-04）VOCAB_DB · G5_0605 · February · spelling_alert —— 全称降格（严重度 低）

- **原**：⚠️ 易错预警：首字母大写，第一个 r 不发音但必须写出来（Feb-ru-ary）！
- **新**：⚠️ 易错预警：首字母大写，拼写时第一个 r 必须写出来（Feb-ru-ary）！发音上它随口音变：英式常读出来，美式口语常吞掉——写的时候一个都不能少。
- **依据**：报告 V-04：英式常读 /ˈfebrʊəri/，美式口语常吞 r，"不发音"写成无条件事实不准。

### VF-028（报告 C-05）VOCAB_DB · G1_055 · water · phonetic —— 音标混标（严重度 中）

- **原**：/ˈwɔːtər/（英式元音 + 美式卷舌 r 的拼接体，两式皆非）
- **新**：二选一并全库统一：英式 /ˈwɔːtə/；美式 /ˈwɔːt̬ɚ/（简化标法 /ˈwɔːtər/ 仅当全库以美式为准且 r 为卷舌音时成立，但长音符号须与美式体系一致）。最终选哪一式见存疑清单（须与教材配套音频一致），拼接体必须消除。
- **依据**：报告 C-05 / L-12：英式应为 /ˈwɔːtə/，美式应为 /ˈwɔːt̬ɚ/ 或 /ˈwɑːtər/；原标为两式拼接。

### VF-029（报告 V-05 / C-05）VOCAB_DB · G6_0778 · neighbourhood · phonetic —— 音标混标（严重度 低）

- **原**：/ˈneɪbərhʊd/（英式拼写词条配美式音标）
- **新**：与英式拼写对齐：/ˈneɪbəhʊd/。（若全库最终定美式：词条改拼 neighborhood、音标保留 /ˈneɪbərhʊd/；二选一，见存疑清单。）
- **依据**：报告 V-05：neighbourhood 以英式拼写立条、音标却给美式，与 C-05 同源。

### VF-030（报告 V-05）VOCAB_DB · G3_K48 · shall · meaning —— 概念错误（严重度 低）

- **原**：将；……好吗（提建议）
- **新**：……好吗（用于 I / we 开头的问句提建议：Shall we go?）；将要（正式/书面语，日常口语少用）
- **依据**：报告 V-05：现代英语 shall 主要用于建议/提议，"将"居首位易误导；本条 func_info 的提示反而写对了，仅调换义项顺序并加注。

### VF-031（报告 C-06 / L-15）VOCAB_DB · G1_002 · book · meaning —— 分型错误（严重度 中）

- **原**：书，书本（has_polysemy=true 但"预订"义缺失，与 MH 不一致）
- **新**：书，书本；预订（动词：book a ticket 预订票）
- **依据**：报告 C-06 / L-15：VOCAB 为主表，义项清单只许一个出处；MH G1_002 已有"预订"义，VOCAB 须补齐以兑现 has_polysemy 标记。

### VF-032（报告 C-06 / L-15）VOCAB_DB · G2_080 · park · meaning —— 分型错误（严重度 中）

- **原**：公园（has_polysemy=true 但"停车"义缺失，与 MH 不一致）
- **新**：公园；停车（动词：park the car 停车）
- **依据**：报告 C-06 / L-15：同 VF-031，MH 已有"停车"义，VOCAB 主表须补齐。

### VF-033（报告 C-03 / V-03 / L-10）VOCAB_DB · G4_0425、G5_0426、G5_0427、G5_0428、G5_0429、G5_0430、G5_0431、G4_0432、G5_0433、G5_0434、G5_0435、G5_0612、G5_0613、G5_0614、G5_0615、G6_0616、G6_0617、G6_0618、G5_0638、G4_0721、G4_0722 · （21 条，见 note） · func_info.tip —— 分型错误（严重度 中）

- **原**：高频功能词（代词/介词）：主要承担句子连接、指代或空间时间定位功能，建议结合 Sight Words 与语法模块掌握。（21 条同一套话）
- **新**：删除模板套话，逐条按"功能目的式 + 最小对立"人工撰写。已定稿示范两条——everyone："everyone 是'全体集合'词：指所有人，但动词按单数走（Everyone is here）——一个人称代词顶起一整群人。"；someone："someone 是'不知是谁的某个人'：肯定句用它（Someone is at the door），否定和疑问句里换成 anyone。"其余 19 条文案待逐条撰写（见存疑清单），禁止再用模板批量生成。
- **依据**：报告 C-03 / L-10：套话对每个具体词零信息，是占位符泄漏冒充语法说明；L-10 给出 everyone/someone 示范全文。
- **注**：条目清单：G4_0425 everyone、G5_0426 everybody、G5_0427 someone、G5_0428 somebody、G5_0429 anyone、G5_0430 anybody、G5_0431 nobody、G4_0432 something、G5_0433 anything、G5_0434 everything、G5_0435 nothing、G5_0612 myself、G5_0613 yourself、G5_0614 himself、G5_0615 herself、G6_0616 ourselves、G6_0617 yourselves、G6_0618 themselves、G5_0638 across、G4_0721 outside、G4_0722 inside

### VF-034（报告 C-04 / L-11）VOCAB_DB · （全库结构，822/1567 条为空） · — · sight_type —— 分型错误（严重度 中）

- **原**：sight_type 仅 decodable / irregular 两类且 52% 为空；irregular 的 19 条与 irregular_info 完全重合（分型零增量信息）；kitchen（G4_171）有 spelling_alert 却无 sight_type、chicken（G1_049）为 decodable，标注不一致；"I / me / my / mine"词形表条目被标 decodable 属类目误用。
- **新**：按可操作定义重建三档：①全规则 decodable（能靠拼读规则自己读出，如 bag）；②一半规则一半死记 partly（如 said 的 ai 读 /e/，须在 irregular_info 指出哪部分不合规则）；③全靠记 heart word（如 one）。822 条空缺限期补齐，补不齐则整字段下线——半成品分型比没有更误导。词形表类条目（如 I/me/my/mine）不标 sight_type。
- **依据**：报告 C-04 / L-11。

### VF-035（报告 F-01 / L-09）WORD_FORMATION_DB · compounds · newspaper · newspaper · tip —— 事实错误（严重度 高）

- **原**：印满四方新闻的纸（news=North+East+West+South）
- **新**：印满新闻的纸。news 的真身世很简单：它就是 new（新的）变成的名词——"一堆新事情"。网上流传的"North+East+West+South 首字母"是假的，那是 1640 年一本笑话书里的段子。防伪法：凡说某老词是"首字母缩略"的多半是假的——缩略词是 20 世纪才流行的造词法（laser、scuba 是真缩略，但都是新词）。
- **依据**：Etymonline 直斥 N/E/W/S 说为 "absurd folk etymology"；news 为 new 的复数名词化，仿法语 nouvelles。报告 F-01 / L-09。

### VF-036（报告 F-02 / L-13）WORD_FORMATION_DB · prefixes · pre- · prepare · examples —— 事实错误（严重度 中）

- **原**：pare ➔ prepare（提前准备）
- **新**：（删除本例）prepare 拆不成 pre- + pare：它来自拉丁语 praeparāre（prae"预先" + parāre"准备"），现代英语的 pare（削、剪）是另一个词。pre- 的例词保留 view ➔ preview、school ➔ preschool；prepare 按"不可拆"处理。
- **依据**：Etymonline：prepare < 拉丁 praeparāre；pare 为另一词。报告 F-02 / L-13"拆词三问"。

### VF-037（报告 F-03 / L-13）WORD_FORMATION_DB · prefixes · auto- · automatic · examples —— 事实错误（严重度 中）

- **原**：matic ➔ automatic（自动的）
- **新**：auto-（自己、自动）例词改为：mobile ➔ automobile（汽车）、autograph（亲笔签名）。automatic 是希腊语整体借词（automatos"自己动的"），里面的 "matic" 不是一个词、不是语素，不许拆。
- **依据**：Etymonline：automatic < 希腊 automatos（auto- + -matos"意愿/行动"）。报告 F-03。

### VF-038（报告 F-04）WORD_FORMATION_DB · prefixes · mis- · mistake · examples —— 事实错误（严重度 低）

- **原**：take ➔ mistake（错误）
- **新**：take ➔ mistake（误拿；误解）
- **依据**：报告 F-04：mistake 的 -take 确为 take 词根（此点保留），但其动词义是"误拿、误解"，原 gloss 只给名词义"错误"，与派生演示对不上。

### VF-039（报告 F-05 / L-13）WORD_FORMATION_DB · roots · vis/vid · visit · words —— 事实错误（严重度 中）

- **原**：visit (vis 看 + it 走 ➔ 走过去看望：参观/拜访)
- **新**：visit (vis 看 ➔ 一再去看 ➔ 参观/拜访)——它来自拉丁语 vīsitāre，是 vīsere"去看"的反复体；中间的 -it- 不是"走"（拉丁语"走"是 īre，exit 里的 -it 才是"走"）。
- **依据**：Etymonline：visit < 拉丁 vīsitāre（vīsere 的反复体），vīsere < vidēre"看"。报告 F-05。

### VF-040（报告 F-06）WORD_FORMATION_DB · compounds · strawberry · strawberry · tip —— 全称降格（严重度 低）

- **原**：铺着稻草种植的红浆果
- **新**：红浆果；straw 的来历学界还没有定论——一种说法是莓田里铺稻草护果，另有"茎蔓散乱如草""果面籽粒如草屑"等说法。先记住 straw + berry 的拼写，"为什么叫 straw"标"一种说法"。
- **依据**：报告 F-06：straw 由来词源学未有定论，原 tip 把候选说之一写成定论。

### VF-041（报告 F-07）WORD_FORMATION_DB · prefixes · en- · enjoy · examples —— 分型错误（严重度 低）

- **原**：joy ➔ enjoy (享有/喜爱)（与 rich ➔ enrich 并列作 en- 派生演示）
- **新**：（从 en- 派生演示中移出）enjoy 是经古法语 enjoir 整体借进英语的，不是在英语里用 en- 现场加在 joy 上派生的，不能拿它教孩子类推 en-。en- 例词保留 rich ➔ enrich（使丰富）。
- **依据**：Etymonline：enjoy < 古法语 enjoir。报告 F-07：作历史词源可通，作构词演示误导。

### VF-042（报告 F-08）WORD_FORMATION_DB · family_matrices · teach · teach · opposite —— 分型错误（严重度 低）

- **原**：opposite: learn (学习)
- **新**：opposite: —（teach 没有反义词；learn 是"对转词"——同一件事的施受两面，如 buy/sell，不是反义关系，不要填进 opposite 栏）
- **依据**：报告 F-08：teach/learn 为 converse（施受对转），与同表 happy↔unhappy 的"反义"标准不一致。

### VF-043（报告 R-01 / L-14）WORD_RELATIONS_DB · synonyms · 桌子组 · desk / table · words —— 事实错误（严重度 中）

- **原**：desk（带抽屉用于读书办公的书桌/课桌），table（无抽屉用于吃饭聚餐的餐桌/圆桌）
- **新**：desk（干活的台面：写字、办公、上课用的书桌/课桌），table（摆东西、吃饭的台面：餐桌/桌子）——区别在"干什么活"，不在有没有抽屉：餐桌有抽屉还是 table，课桌没抽屉还是 desk。
- **依据**：报告 R-01 / L-14：原判据"抽屉"错误（餐桌可有抽屉、课桌可无），应以用途区分。

### VF-044（报告 R-02 / C-07）WORD_RELATIONS_DB · synonyms · 英美同义词对 · autumn/fall 等 6 对 · group（类目名与释义） —— 分型错误（严重度 低）

- **原**：组名"英美同义词对"；其中 shop (英：商店) = store (美)
- **新**：组名改为"英美方言等价词"（同一东西在英式/美式里的不同说法，不是同义词）。shop/store 一对改注：shop（商店；英式通用，美式多指小店）= store（商店；美式通用，英式多指大商店）——两边都用，只是重心不同。其余五对（autumn/fall、film/movie、holiday/vacation、football/soccer、sweets/candy）保留。
- **依据**：报告 C-07 / R-02：方言等价词误入同义词类目；shop=store 的英美归属本身不准。

### VF-045（报告 R-02 / C-07）WORD_RELATIONS_DB · category_sets · season & weather · season & weather · hypernym / hyponyms —— 分型错误（严重度 低）

- **原**：hypernym "season & weather (四季与天气)"，hyponyms 混装 spring…winter 与 sunny…cold 共 13 词
- **新**：拆为两个集合：① season（四季）：spring、summer、autumn、winter；② weather（天气）：sunny、rainy、windy、cloudy、snowy、warm、hot、cool、cold。与其他 9 个集合的"单一上位概念"标准对齐。
- **依据**：报告 C-07：一个集合塞两个上位概念，与全表标准不一致。

### VF-046（报告 H-01）HOMOPHONES_DB · HM02 · two · words[two].tip —— 事实错误（严重度 中）

- **原**：中间藏着静音 w（像双胞胎 twin 的 w）
- **新**：中间藏着静音 w（像 write、wrong 里的静音 w 一样，写出来但不发音）
- **依据**：报告 H-01：twin 的 w 是发音的（/twɪn/），类比自相矛盾；two 的 w 不发音属实，改以 write/wrong（或 sword）类比。同库 HM06 用 wrist 静音 w 解释 write 的做法正确，可互参。

## 四、存疑未修正清单

| # | 事项 | 未修正原因 | 处置 |
|---|---|---|---|
| S-1 | 全库音标标准最终选英式还是美式 | 报告 L-12 建议"与教材配套音频一致"，今晚无依据确证教材音频口径 | VF-028/029 已给出两式各自的正确写法并禁止拼接体；标准拍板后全库一次性对齐 |
| S-2 | func_info 其余 19 条逐条文案（VF-033 内） | L-10 只给 everyone / someone 两条定稿示范；其余须逐条按功能目的式人工撰写，凭空代写未经核证的语法说明违反质量纪律 | 模板套话定性删除；19 条列待撰清单，撰写时逐条核语法来源 |
| S-3 | MH 8 条移出 etymology 栏条目的真词源补写（VF-017～VF-024：fish / water / park / play / bag / study / how / I-me-my-mine） | 【单词身世】栏须有 Etymonline/OED 级出处逐条落笔，今晚未逐条查证 | 栏位先清空隔离（错误呈现已消除）；补写列为后续专项，查无出处者永久只留【巧记故事】/【用法说明】 |
| S-4 | 报告统计口径差：VOCAB 主张字段"错误 2 条"、WORD_FORMATION"错误 5 条"，正文可确指者分别只有 1 条（V-01 tomato）与 4 条（F-01/02/03/05） | 报告正文未逐一点名其余 1 条；beautiful 的 eau 释义（V-02）与 mistake gloss（F-04）、teach 对转（F-08）疑为归类所在，但无法确证 | 上述三条均已按事实/分型错误在本包修正（VF-026/038/042）；统计口径差异在此留痕，待复核报告原文计数 |
| S-5 | strawberry 的 straw 来历、book 的 beech 关联 | 词源学本身未有定论（straw）/ 仅为主流假说（beech） | 已在 VF-040/007 中降格为"一种说法/主流假说"并加对冲，不按已确证事实呈现——此为处置完毕的存疑，非遗漏 |
| S-6 | VOCAB_DB theme_macro/theme_sub 分类全量、syllables 切分全量、MH 各条 example_en 例句全量 | 报告明示"未审"（仅抽样目检未见明显问题） | 不在本包范围；建议列入下一轮审查清单 |

（完）
## 复核后修订（T3.review 五项低优先）

依据 `updates/T3.review.md` 的 5 项低严重度问题（L-1～L-5），定点修订 `model/vocab_fixes.yaml` 如下（修正文字段除第 3 项外均未改动）；YAML 已重新解析验证无误。注：复核报告存盘文本止于其第四节，L-1/L-2 的具体条目系按复核表内标注并逐条比对 `~/workspace/content-audit/` 抽取 JSON 原值确认。

1. **L-1 原文字段标点/空格规范化（7 条）**：VF-001、VF-002（引号全角→半角）、VF-036、VF-037、VF-038（括号半角→全角）、VF-039（JSON 原文「vis看+it走」无空格、转写加空格）、VF-043（JSON 中 desk/table 为两个独立数组项、转写合并成句并全角化括号）——各条已加 `note`：「原文字段为规范化转写，逐字原文以 content-audit 抽取 JSON 为准」，并注明各自的规范化方式。
2. **L-2 原文字段混入作者注（4 条）**：VF-028（数据原文仅音标 /ˈwɔːtər/，括注为作者诊断注）、VF-029（数据原文仅音标 /ˈneɪbərhʊd/，括注为作者注）、VF-031（数据原文仅「书，书本」，括注为作者注）、VF-032（数据原文仅「公园」，括注为作者注）——各条已加 `note` 逐项标明数据原文与作者注的构成。原文括注本身保留不删，仅以 note 界定性质。
3. **L-3 VF-005 修辞与史实出入**：修正文原句「scientist 是个"发明出来的词"，年纪比火车还小」已改为「是个"发明出来的词"，出生还不到两百年」，只保留 1833 年 Whewell 仿 artist 类推造词的事实本身，不再与蒸汽机车年代作比较；其余文句未动。
4. **L-4 VF-025 补失效边界注**：已加 `note`（报告 L-07 失效边界）：volcano、tornado 等 -o 词复数 -s / -es 两式并存皆可（volcanos / volcanoes、tornados / tornadoes），属名单外情形，不归本条名单管；拿不准的 -o 词以词典为准。
5. **L-5 VF-004 linked 误指订正**：`linked` 原为 VF-031（VOCAB book 义项补齐，与 friend 无关，系误指），已改为 VF-016——本条「身世≠巧记」的定性依据正是 VF-016 确立的三栏方案；VOCAB_DB G3_130 spelling_alert 的同一故事为合法「巧记」、无修正记录，故不设跨库修正联动。VF-004 记录内已同步加 note 说明。本节同时作为对上文 VF-004 详单中「联动：VF-031」一行的勘误。
