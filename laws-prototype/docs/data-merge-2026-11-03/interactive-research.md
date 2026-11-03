# 互动式英语学习形态全网调研备忘

> 调研时间：2026-11-03。方法：逐个打开官网/官方文档/官方帮助页核对机制与规模数字；查不到或只有二手来源的，明确标注。目标：给萌星（单文件 HTML、无后端、TTS 可用、无录音素材库）一份能直接照着做原型的形态目录。
>
> 萌星家底（下文「数据映射」以此为准）：词库 2,486 词 / 规律 456 条 / 口语对话 144 段 / 病例（错句三元组）143 条 / 结构化词素词 926 / 拼读模式 174（11,375 词-模式对）/ 复习题池 1,796 题 / 白板动画多区已有播放器 / 词源档案 2,278 条。
>
> 可实现性口径：**易**＝纯 DOM 点选/输入即可，无新素材；**中**＝需要生成器批量造题或中等交互逻辑；**难**＝需要素材库、精细拖拽或引擎级开发。凡标「需 ASR」的，单文件环境一律按第三部分的替代方案处理。

---

## 一、形态总目录（56 个条目，去重归类后 50+ 种形态）

### A. 听与说

| # | 形态（中/英） | 机制：孩子做什么动作 | 训练 | 代表来源 | 规模/题量参考 | 单文件 | 萌星数据映射 |
|---|---|---|---|---|---|---|---|
| A1 | 听写 Dictation | 听一句/一词，在键盘或字母块上打出所听内容，即时逐词判对错 | 听·写·拼读 | H5P Dictation（即时反馈）；Duolingo「Type what you hear」（有乌龟慢速重播键）；Liveworksheets Listening（TTS 朗读） | H5P 官方 54 种内容类型之一 | 易（TTS 代音频） | 拼读 174 模式的例词 + 规律例句 + 对话句，全可出题 |
| A2 | 听音选词/选图 Listen & Select | 听发音，从 3–4 个词/图中点出听到的那个 | 听·词汇·拼读 | Duolingo 听选；PhonicsPlay「Pick a Picture」（听词在可解码词中选）；DuoRadio「Listen and Select」 | PhonicsPlay 按 Phase 2–5 分级供题 | 易 | 拼读模式内同模式词互为干扰项，天然成组 |
| A3 | 听辨音素 Letter–Sound Matching | 听一个音素，点出/跳上对应的字母组合 | 听·拼读 | Teach Your Monster（Flower Jump：听音跳对字母块；答错多的字母组合会更频繁再现＝自适应） | 该站 30M+ 玩家（官方） | 易 | 174 模式即音素-字素对照表 |
| A4 | 跟读复述 Speak the Sentence | 听范读后对着麦克风复述整句，系统给通过/再试 | 说 | Duolingo 基础语音识别题；H5P Speak the Words（仅 Chrome）；Studycat VoicePlay（端侧儿童语音、按音素给颜色提示） | Studycat 官方称 1,600 万家庭使用（厂商口径） | 难（需 ASR）→替代见三-1 | 对话 144 段可做影子跟读 |
| A5 | 听并录音自比 Listen & Record | 听原声→录自己的声音→两段并排回放自己比 | 说 | British Council Playtime App 的 listen-and-record（听叙述、录音、对比） | BC 官方 App 功能 | 中（录音回放可做，无评分） | 对话句/chant 8 首 |
| A6 | 互动听力剧场 DuoRadio 式 | 听角色主持的类播客短剧，途中弹出配对/理解检查/听选小题 | 听 | Duolingo 官方博客 DuoRadio（角色主持、分级、英英/英汉混合讲解） | 已铺到多门课程（官方博客） | 中（TTS 多角色代演） | 对话 144 段改编为「电台剧+停点题」 |

### B. 读与故事

| # | 形态 | 机制 | 训练 | 代表来源 | 规模参考 | 单文件 | 萌星数据映射 |
|---|---|---|---|---|---|---|---|
| B1 | 互动故事 Stories | 读/听一段对话故事，文中嵌入选择、配对、补句题，答完才推进剧情 | 读·听·词汇 | Duolingo Stories（故事内嵌其全部基础题型，角色配音）；Khan Kids 书中嵌题（角色弹出理解题、点图题） | Stories 已进 100+ 门课程，在 Score 30–59 段开放（Duolingo 官方博客） | 中 | 对话 144 段即故事脚本 |
| B2 | 同步高亮点读 Read-Along | 朗读时逐词高亮跟随，孩子可点任意词单独听发音 | 读·拼读 | Khan Academy Kids（Read-to-Me 逐词高亮与朗读同步；另有自己读模式）；Duolingo ABC（跟读高亮）；Oxford Owl 电子书带音频 | Khan Kids 300+ 本书（官方口径） | 易（TTS+高亮） | 对话/词源故事短句；词页例句 |
| B3 | 分级电子书+读后活动 Leveled eBook + Activities | 读完一本分级书，做配套理解/词汇活动才算完成 | 读 | Oxford Owl（100+ 免费电子书，按 Book Band/拼读阶段分级，多数带音频+读后理解活动，学校家长页核实）；Storyline Online（明星朗读视频+每本书一份 Activity Guide：读前/读中/读后讨论、复述、写作绘画任务）；Reading Eggs（4,000+ 分级电子书带朗读） | Oxford Owl 免费层 100+ 本（官方帮助页） | 中（缺绘本素材，用文字故事代） | 词源 12 张旗舰卡故事化；对话改编短篇 |
| B4 | 文中点选 Mark the Words | 给一段文字，孩子点出所有符合目标的词（如全部过去式），点错扣分 | 读·语法·词汇 | H5P Mark the Words（官方类型：文本中标出目标词） | H5P 54 类型之一 | 易 | 规律例句、对话全文：点冠词/点动词过去式/点词根 |
| B5 | 读指令做事 Reading for Purpose | 读屏幕上的指令（如「Tap the crayon」），按顺序在场景里执行对了才开门/过关 | 读·词汇 | Teach Your Monster Stage 3（读指令并依次执行解锁关卡，官方 mini-games 页） | 3 阶段冒险、官方列为独立机制 | 中（需场景物件图，用 emoji/SVG 代） | 介词区方位指令、课堂指令词 |

### C. 词汇·配对·拼写

| # | 形态 | 机制 | 训练 | 代表来源 | 规模参考 | 单文件 | 萌星数据映射 |
|---|---|---|---|---|---|---|---|
| C1 | 点选配对 Tap the Pairs / Match Up | 左右两列，依次点一个词和它的释义/图片，配对成功消掉 | 词汇·读 | Duolingo Tap the pairs；Wordwall Match up（拖关键词到释义旁，点选版即 Find the match） | Wordwall 34 模板之一（官方价目页：12 标准+22 附加） | 易 | 词库 2,486、词素 126 页、规律术语 |
| C2 | 翻牌记忆 Memory Pairs | 一格格翻开卡片，凭记忆翻出成对的词-图/词-义 | 词汇 | H5P Memory Game；Wordwall Matching pairs；ABCya Monster Mansion Match；ESL Games Plus Concentration/Memory 系列 | ESL Games Plus 按主题成套出 | 易 | 词-释义、词素-义、反义词对 |
| C3 | 限时速配 Match Race | 倒计时内把一屏词与释义全部配完，比用时/最佳纪录 | 词汇 | Quizlet Match（与时间赛跑配完术语-定义，官方帮助）；ABCya 多款 racing 壳 | Quizlet 3 亿+ 学习集（二手口径，见来源清单） | 易 | 同 C1，题池现成 |
| C4 | 分组分类 Group Sort | 把一堆词卡拖/点进正确的类别箱 | 词汇·拼读·语法 | Wordwall Group sort；Twinkl Sorting Games；TopMarks 分类小游戏群 | Wordwall 34 模板之一 | 易 | 按拼读模式分词、按词性分、按词根家族分 |
| C5 | 真假词分拣 Real vs Nonsense Sort | 逐个读闪出的词，真词丢宝箱、按拼读规则造的假词丢垃圾桶 | 拼读·读 | PhonicsPlay「Buried Treasure」「Picnic on Pluto / Obb and Bob」「Dragon's Den」（同一机制三皮肤：真词喂 Bob、假词喂 Obb） | 按 Phase 2–5 每个音素成套（官方资源页） | 易（假词由模式规则生成） | 174 模式生成假词（如把 cat 的元音换成同模式变体拼出非词），真词来自 11,375 对 |
| C6 | 渐显猜词 Reveal / Guess the Answer | 图或词被遮住，逐步揭开，越早猜中分越高 | 词汇 | Games to Learn English「Reveal」；H5P Guess the Answer | GTLE 全站约 40+ 游戏 | 易 | 词库配 emoji/字谜提示 |
| C7 | 字母重组 Anagram / Word Cruncher | 把打乱的字母按顺序点/拖回正确位置拼出整词 | 写·拼读 | Wordwall Anagram（拖字母归位，官方模板页）；Crickweb「Word Cruncher」（限时按序点字母，点错重来） | Crickweb 全站 252 个免费互动资源（学区汇编口径） | 易 | 词库按词长分级 |
| C8 | 看图/听音拼词 Spell the Word | 看图或听音，用字母块拼出单词 | 写·拼读 | Wordwall Spell the word；Games to Learn English「Spelling Bee」（看图拼词）；ABCya Submarine Spelling | GTLE Hangman 一类即 30 主题×约 25 词 | 易 | 拼读模式例词，拼对即复习模式 |
| C9 | 吊小人 Hangman | 逐个猜字母，错一次画一笔，画完前猜出整词 | 词汇·拼写 | Wordwall / ESL Games Plus / GTLE Hangman（三站都有；GTLE 版式：元音在左、辅音在右，先 Review 再玩） | GTLE：30 主题集 | 易 | 词库主题分组 |
| C10 | 单词搜索 Word Search | 在字母网格里划出藏着的目标词 | 词汇·认词 | Wordwall Wordsearch；H5P Find the Words；ABCya Word Search；Liveworksheets 亦有此元素类型 | 多站标配 | 中（网格生成） | 主题词表（词库分组） |
| C11 | 填字 Crossword | 按图/释义线索在格子里填词交叉 | 词汇·拼写 | Wordwall Crossword；H5P Crossword | 两大模板库标配 | 中（布局算法） | 词-释义对 |
| C12 | 打字竞速 Typing Race | 词从屏幕落下/滚过，限时内打对得分 | 写·拼写 | ABCya「Ghost Typing」「Typing Rocket」 | ABCya 400+ 游戏（厂商口径） | 易 | 高频词表（WEXTRA 频率字段） |
| C13 | 词形变换机 Word Machines | 换掉词的首音或尾音（如 c-at→h-at），机器立刻读出新词并判断真假 | 拼读 | Starfall「Word Machines」（改 CVC 词的首/尾音造新词，官方教师指南）；Starfall ABCs 点读字母 | Starfall 15 本拼读系列配套 | 易 | 174 模式的 onset-rime 切分 |
| C14 | 字母描红 Tracing | 沿虚线描出字母笔顺，描完字母发音 | 写·拼读 | Duolingo ABC（描字母为核心活动之一，官方课程页：phonics/handwriting/sight words 四线）；Khan Kids 描红；Lingokids 描写练习 | Duolingo ABC 700+ 节短课（二手指南口径，官方称每课≤5 分钟、9 个起点级别） | 中（SVG 路径判定） | 26 字母+高频字形，低龄段专用 |

### D. 句法与组句

| # | 形态 | 机制 | 训练 | 代表来源 | 规模参考 | 单文件 | 萌星数据映射 |
|---|---|---|---|---|---|---|---|
| D1 | 词块组句 Word Tiles | 点词块依次排成整句（点选式，不必真拖拽） | 语法·写 | Duolingo 词块组句/Sentence shuffle；ESL Games Plus「Sentence Monkey」（拖词补完/组成正确句） | Duolingo 核心题型之一 | 易 | 对话句、规律例句；现有 18 张 build 卡的升级 |
| D2 | 乱句重组 Unjumble | 把整句的词拖/点回正确语序 | 语法 | Wordwall Unjumble（官方模板页：「Drag and drop words to rearrange each sentence into its correct order」）；ISLCollective 视频测验含 unscramble sentences 题型 | ISLCollective 80,000+ 份材料（站方口径） | 易 | 对话 144 段全部句子 |
| D3 | 拖词填空 Drag the Words | 把词从词池拖/点进句中空格 | 语法·词汇 | H5P Drag the Words（官方类型）；Liveworksheets Drag & Drop 元素对 | Liveworksheets 数千份自判分练习（官方 about） | 易 | 规律例句挖空 |
| D4 | 完形填空 Fill in the Blanks | 在空格打字或从选项选词，即时判分（Advanced 版支持多空、提示、容错） | 语法·词汇·写 | H5P Fill in the Blanks / Advanced Fill in the Blanks；Duolingo Complete the translation / Select the missing word | 两大库标配 | 易 | 病例纠正句挖空目标结构 |
| D5 | 补全句子 Complete the Sentence | 给半句，从选项/词池补完后半 | 语法·读 | Wordwall Complete the sentence | 34 模板之一 | 易 | 连词规律（CJ 例句天然是半句+关联词） |
| D6 | 段落/图片排序 Sequencing | 把打乱的段落卡或图卡排回正确顺序 | 读·写 | H5P Sort Paragraphs；H5P Image Sequencing；Crickweb Sentence Maker（拼图词拼句）/排序类资源 | H5P 54 类型之二 | 易 | 对话轮次排序、故事四格 |
| D7 | 句式改写 Rewrite | 给原句和改写要求（换时态/变否定/变问句），打出或拼出新句 | 语法·写 | 各校自制练习的主力形态；萌星四法分析中唯一 A 级改写格（动词三态 461 行）（站方标杆未单列此模板，故标「题库型形态」） | Liveworksheets/ISLC 海量填空题的变体 | 中（判分需规则化） | 动词形式库 461 行、规律改写点 |

### E. 测验与游戏化外壳（壳与题分离：同一题集多壳复用）

| # | 形态 | 机制 | 训练 | 代表来源 | 规模参考 | 单文件 | 萌星数据映射 |
|---|---|---|---|---|---|---|---|
| E1 | 游戏秀答题 Gameshow Quiz | 选择题+倒计时+求助锦囊（双倍分、50/50 砍掉两错项） | 综合 | Wordwall Gameshow quiz（官方模板页）；Quizizz/Wayground Power-Ups 体系（免错、冻结时间、连对保护、×2 分、橡皮擦等，官方博客/帮助） | Wayground 官方列 8 种 Power-Ups | 易 | 复习题池 1,796 直接套壳 |
| E2 | 开箱 Open the Box | 依次点开一个个盒子，盒里是题或奖惩，答了才开下一个 | 综合 | Wordwall Open the box（官方模板页：「Tap each box in turn to open them up and reveal the item inside」） | 34 模板之一 | 易 | 任意题集 |
| E3 | 转盘抽题 Spin the Wheel | 转大转盘随机抽中一题/一词，答对得分 | 综合 | Wordwall Random wheel；ESL Games Plus Wheel games | 两站标配 | 易 | 任意词表/题集 |
| E4 | 随机翻卡 Random Cards / Dialog Cards | 抽一张卡翻面看词/题，可翻转的卡片组自测 | 词汇·综合 | Wordwall Random cards；H5P Dialog Cards（可翻面卡片）；Wordwall Flash cards；Quizlet Flashcards | 多库标配 | 易 | 词卡、规律速查卡 |
| E5 | 是非闪电 True or False | 句子流快速判断对错，连对加分、限时 | 语法·读 | Wordwall True or false；H5P True/False；TopMarks「Hit the Button」式限时快答（官方页：against the clock 快问快答，另有 Daily 10 每日十题） | TopMarks 400+ 游戏（二手指南口径） | 易 | 病例 143（错句/正句各半即成题） |
| E6 | 找配对消除 Find the Match | 点一个答案，与之匹配的另一项被消除，连锁清空全屏 | 词汇 | Wordwall Find the match（官方模板页：「Tap the matching answer to eliminate it. Repeat until all answers are gone」） | 34 模板之一 | 易 | 同 C1 数据 |
| E7 | 打地鼠/气球/飞果 Whack·Pop·Fruit | 正确选项以地鼠/气球/水果形态冒出或飞过，点中得分、点错扣命 | 词汇·拼读 | Wordwall Whack-a-mole、Balloon pop、Flying fruit、Airplane（躲避式） | 均为 22 附加模板内 | 中（动画时序） | 高频词、音素辨认 |
| E8 | 迷宫追逐 Maze Chase | 在迷宫里跑向正确答题区，身后有敌人追 | 综合 | Wordwall Maze chase（官方模板页） | 34 模板之一 | 难（小游戏引擎） | 题池可供题，壳成本高 |
| E9 | 棋盘推进 Board Race | 答对一题前进一格，棋盘上有怪兽/陷阱格，先到终点胜 | 综合 | ESL Games Plus Pirate/Crocodile Board Games（答题推进、打怪）；Baamboozle 团队格子（选编号格答题，混幸运格：偷分、换分、全员+分，官方游戏页实测机制） | Baamboozle 以「格+运气」为核心模式 | 易 | 任意题池；单机版与电脑轮流 |
| E10 | 答题驱动经营/塔防 Answer-to-Build | 答题赚钱/赚材料，用来建塔防线、备菜开店、开工厂滚雪球 | 综合 | Blooket（25+ 模式，官方帮助：Tower Defense 答题赚钱建塔、Café 答题备货招待、Factory 闲置收益、Gold Quest 开箱夺金、Crypto Hack 猜密码偷币等）；Gimkit（答题赚游戏币买升级，Fishtopia 答题得饵钓鱼卖鱼，约 13 种现行模式，多家 2026 评测口径） | Blooket 官方称 2,000 万+ 用户自制题集 | 难（经营壳是独立小游戏）→简化版见二-9 | 题池供题；只借「答题→资源→升级」经济循环 |
| E11 | 自适应学习循环 Learn Mode | 系统按对错自动编排题型（闪卡→选择→拼写→听写轮转），错题自动回收重练直到掌握 | 综合 | Quizlet Learn（官方帮助：Write/Spell 模式已并入 Learn 选项，自适应推进）；Duolingo 路径式复习 | Quizlet 官方帮助现行说明 | 中（编排序列逻辑） | 复习 SRS+错题本已有底座 |
| E12 | 自动组卷 Test Mode | 一键把词表生成整卷（书面/配对/选择/判断混合）并判分出报告 | 综合 | Quizlet Test（官方帮助：自动生成 written/matching/MC/true-false 混合卷） | 同上 | 易 | 词表/规律一键出卷给家长打印或自测 |
| E13 | 看记复述 Watch and Memorize | 词组闪现数秒后消失，凭记忆选出/拼出刚才的内容 | 词汇·记忆 | Wordwall Watch and memorize | 34 模板之一 | 易 | 高频词、短语块 |
| E14 | 有奖有罚 Win or Lose Quiz | 答题中随机插入加倍/清空分格，输赢悬念拉满 | 综合 | Wordwall Win or lose quiz；Pair or No Pair（判断两卡是否成对）；Rank order（把项目排成序）；Speed sorting（限时快速分类） | 均为 Wordwall 附加模板 | 易 | 题池/分类数据 |

### F. 视频·图解·情景·操作

| # | 形态 | 机制 | 训练 | 代表来源 | 规模参考 | 单文件 | 萌星数据映射 |
|---|---|---|---|---|---|---|---|
| F1 | 互动视频 Interactive Video | 视频播到停点自动暂停出题，答完续播；可加书签、跳转 | 听·读·综合 | H5P Interactive Video（官方旗舰类型）；ISLCollective Video Quiz Creator（在视频上加填空/选择/重组句/点图词典题，SLJ 书评核实题型清单）；H5P Course Presentation / Interactive Book（把视频、题、文本装订成册） | ISLC 100 万+ 教师社区（SLJ 口径） | 中（萌星无视频素材→用白板动画代，见二-4） | 白板动画全区存量 |
| F2 | 图解标注 Labelled Diagram | 把标签钉拖/点到图上正确位置 | 词汇·读 | Wordwall Labelled diagram（官方模板页：拖钉到图区）；H5P Drag and Drop（图上落点）；Quizlet Diagram sets（在图上标术语）；Twinkl Interactive Labelling；Crickweb Labelling 系列（Classroom/Animal Labelling） | 四家标配 | 中（需图；SVG/emoji 场景可代） | 介词方位图、身体/教室词、词素拆分图 |
| F3 | 热图点选 Find the Hotspot | 在一张图里点出符合描述的物件（可多热点） | 词汇·听 | H5P Find the Hotspot / Find Multiple Hotspots / Image Hotspots；Twinkl Interactive Hotspots | H5P 54 类型内 | 中（同 F2 素材问题） | 场景词（教室/厨房 SVG 场景） |
| F4 | 图片配对 Image Pairing / Image Quiz | 图与图、图与词互相配对；或看图答题 | 词汇 | H5P Image Pairing；Wordwall Image quiz；Twinkl Polar Pairs | 多库标配 | 易（emoji 代图） | 词库（emoji 可覆盖的名词子集） |
| F5 | 分支情景 Branching Scenario | 读情景→做选择→剧情按选择分叉，不同结局回看 | 读·综合 | H5P Branching Scenario（官方类型：两难情景、选择改路径） | H5P 54 类型之一 | 中（脚本量） | 对话改编为礼貌/课堂情景选择 |
| F6 | 摘要选择 Summary | 读完一段，从句子池里点选真正属于摘要的句子 | 读 | H5P Summary（官方类型） | 同上 | 易 | 词源故事、对话主旨 |
| F7 | 连箭头 Join with Arrows | 在左右两列之间拉线/点连对应项（可视化连线） | 词汇·语法 | Liveworksheets「Join with arrows」（官方帮助：连接两个同值元素）；其元素全家：单选、拖拽对、下拉选择、勾选、填空、听力（TTS）、开口说（麦克风） | 教师可建 10 练习册×120 页、100 名学生（官方帮助） | 易（点选两步代拉线） | 同 C1，视觉更直观 |
| F8 | 是非提问猜谜 Information-Gap Guessing | 只能问是非问题，靠回答逐步缩小范围猜出神秘物 | 说·读·思维 | Games to Learn English「Animal Mystery」（问 yes/no 题缩小范围）；「Hot Seat」（一人描述词、 others 猜）；「Vocab Describer」（读描述点对应图） | GTLE 约 40+ 游戏 | 中（问句需模板化） | 动物/食物词表 + QI 提问规律联动 |
| F9 | 歌曲律动 Song & Chant with Actions | 跟唱时按拍点词/做动作，歌词挖空跟唱 | 听·说·拼读 | Khan Kids 歌曲+律动；British Council 歌曲与动画故事、绕口令；Starfall Songs + Rhymes / 动作歌；Lingokids 原创歌曲 | BC/Khan 官方栏目 | 中（TTS 唱不了→用 chant 节奏朗读代） | GRAMMAR_CHANTS 8 首已有 |
| F10 | 宾果 Bingo | 听/读到自己卡上的词就盖住，连成线获胜 | 听·词汇 | TopMarks Bingo 系列（官方列表：加法/乘除 Bingo 为课堂白板设计）；ABCya Bingo 类 | TopMarks 官方游戏列表 | 易 | 高频词、音素 |

---

## 二、重点推荐 12 种（萌星没有或只有雏形、高质量产品都在用）

按推荐强度排序。每种给：步骤级机制 / 界面要素 / 萌星数据映射 / 为什么排在这里。

### 1. 听写与听拼 Dictation（A1+A2 合并一组件）★★★★★

- **机制拆解**：① 选定一个拼读模式或一组规律例句 → ② 点喇叭播放（TTS），可点「乌龟键」慢速重播（Duolingo 同款设计）→ ③ 孩子用字母块点拼（低年级）或键盘输入（高年级）→ ④ 提交后逐字母标色：对=绿、错=红棕并在错处标出正确字母 → ⑤ 错词自动进错题本并当场再听一遍跟拼 → ⑥ 一组 8 题，结算正确率与连对数。
- **界面要素**：大喇叭键+慢速键、字母块托盘（打乱的字母+2 个干扰字母）、逐字反馈条、进度点。
- **数据映射**：拼读 174 模式 × 11,375 例词是现成题库（同模式词互为听辨干扰项）；规律例句、对话短句做整句听写进阶档。
- **理由**：萌星目前「听」只有被动听白板，没有任何听辨产出闭环；Duolingo、H5P、Liveworksheets 三家都把听写列为标配。TTS 已有，零新素材，是投入产出比最高的新形态。

### 2. 真假词分拣 Real vs Nonsense Sort（C5）★★★★★

- **机制拆解**：① 选一个拼读模式（如 -ight）→ ② 词卡逐张从顶部落下/翻出 → ③ 孩子读出声后点「真词→宝箱」或「假词→垃圾桶」（PhonicsPlay 原版是喂两个外星人）→ ④ 判错时把词按音节/字母块拆开高亮，带读一遍再归类 → ⑤ 10 张一组，结算时列出全部真词带读复习。
- **界面要素**：中央大词卡（大字号）、左右两个投放区（点选代替拖拽）、模式徽章、连对火焰。
- **数据映射**：真词＝该模式在 11,375 对中的真实例词；假词＝生成器按模式规则变造（换首辅音/换同模式拼写变体），生成即可用、无需人工编题——但生成规则要守拼读主干的既有口径，造出的「假词」须确实不是词库 2,486 中的词（生成时查表排除）。
- **理由**：PhonicsPlay 用同一机制撑起三个招牌游戏，证明它对 5–8 岁解码训练的统治力；萌星拼读区目前以展示卡为主，这是把它变「动手练」的最低成本一招，且题量无限。

### 3. 文中点选 Mark the Words（B4）★★★★★

- **机制拆解**：① 给出任务（「点出所有动词过去式」）→ ② 呈现一段 3–5 句的短文/对话 → ③ 孩子逐词点选，点中目标词高亮留痕；点错轻扣分并提示总数还剩几个 → ④ 全部点完结算，漏点的词以虚线框标出并连到对应规律页。
- **界面要素**：可点词的文本区（词与词留足触控间距）、目标计数器（已找 x/共 y）、结算后的「漏网词→规律页」链接。
- **数据映射**：对话 144 段（阶段 2 已做过词锚定 2,048 对，词→词页的映射现成，反过来标词性/时态可复用词库与规律例句标注）；规律例句本身即标准素材。
- **理由**：H5P 独有而国内产品少见；它把「读一段话」变成主动搜寻任务，是语法从「看讲解」到「在真实文本里认出来」的关键一跃。萌星文本与锚定数据都已就位，只差组件。

### 4. 白板停点互动 Interactive Whiteboard-Video（F1 的萌星版）★★★★★

- **机制拆解**：① 白板动画照常播放 → ② 到预设停点自动暂停，弹出 1 道小题（选择/点选/组词块）→ ③ 答对动画续播，答错给出 10 秒提示片段回放再答 → ④ 全片结束出一张「本片 3 个考点」小结卡，错题进错题本。
- **界面要素**：停点标记（进度条上的小圆点）、暂停浮层题卡、续播键；停点数据写进白板脚本的时间轴字段，与现有 MutationObserver 清理机制兼容。
- **数据映射**：各区白板已按「节拍 beats」组织讲解，停点天然落在节拍之间；题目从该规律 quiz 字段取。先给 10 条高流量规律试点，不必全量。
- **理由**：H5P Interactive Video 与 ISLCollective Video Quiz 是全球教师最常用的两个形态，而萌星最大的存量资产恰恰是几百段只能「看」的白板动画——这是把存量变互动的最短路径，别家抄不走。

### 5. 互动故事 Interactive Story（B1）★★★★☆

- **机制拆解**：① 一段 6–10 轮的对话故事逐轮展开（角色气泡+TTS 配音）→ ② 每 2–3 轮插入一个嵌入题（听选、补句词块、理解选择）→ ③ 答错时角色用剧情内台词提示（如「Listen again!」）并重播该轮 → ④ 结尾给三词回顾卡（本故事新词→词页链接）。
- **界面要素**：对话气泡流、角色头像（emoji 即可）、嵌入题卡（与正文同宽不跳页）、结尾回顾卡。
- **数据映射**：口语 144 段对话/16 场景是现成脚本（阶段 2 已完成词锚定）；12 组场景 QA 可做故事后问答。
- **理由**：Duolingo Stories 与 Khan Kids 嵌题书都证明「故事+题」是低龄段留存最高的形态；萌星口语区目前是「看对话」，改成故事流后即成为全站唯一叙事型互动。

### 6. 翻牌记忆配对 Memory Pairs（C2）★★★★☆

- **机制拆解**：① 4×3 或 4×4 卡阵背面朝上 → ② 点翻两张，词-义/词-图成对则留亮消除，不成对翻回 → ③ 记录翻牌次数与用时，结算给星 → ④ 全部消除后整组词带读一遍。
- **界面要素**：卡阵（触控 ≥44px）、对子计数、用时；卡面用词+emoji/中文义。
- **数据映射**：词库主题分组、词素 926 的「词素-义」对、反义词对（同义反义数据层在 Stewart 自己的线，先用词库内可得的对子）。
- **理由**：H5P、Wordwall、ABCya、ESL Games Plus 四家标配，规则零学习成本、低龄最爱；萌星的「配对」目前只在练习题里以选项形式出现，没有记忆翻牌这一经典形态。

### 7. 词形变换机 Word Machine（C13）★★★★☆

- **机制拆解**：① 机器上显示一个 CVC 词，拆成首音块+韵脚块 → ② 孩子点换首音（或尾音）的转轮 → ③ 新组合立刻由 TTS 读出，并判定真词（亮灯+给中文义）还是假词（摇头+归入假词筐）→ ④ 集满 5 个真词过关，假词筐里的词自动接第 2 种分拣复习。
- **界面要素**：双转轮（首音列/韵脚列）、大词显示、真假指示灯、收集栏。
- **数据映射**：174 模式中 CVC 类模式的 onset-rime 切分 + 11,375 对判真词；与 #2 共用假词判定逻辑，一套生成器两处用。
- **理由**：Starfall 的招牌操作形态，把拼读从「认读」升级为「亲手造词」；和 #2 是一对（造词机造、分拣机判），组件可共建。

### 8. 乱句重组 Unjumble 全量化（D2）★★★★☆

- **机制拆解**：① 一句对话被拆成词块打乱 → ② 点词块依次填入答句槽（点错块点一下退回）→ ③ 卡住时可点「听原句」用 TTS 播一遍 → ④ 拼对后整句带读、标出句中规律点（如关联词变色）。
- **界面要素**：答句槽、词块池、听力提示键、规律点高亮。
- **数据映射**：对话 144 段全部句子 + 规律例句，题量上千；现有组句只有 18 张手工 build 卡，此形态由生成器全量供题。
- **理由**：Wordwall 把 Unjumble 列为标准 12 模板之一、ISLC 视频题也含重组句；萌星组句目前是全站最薄的手工区，生成器一上即补齐。

### 9. 游戏壳层：开箱+转盘+棋盘（E2+E3+E9）★★★★☆

- **机制拆解**：同一题集进场前选壳——① 开箱：12 个盒子依次点开出题，混 2 个运气盒（双倍分/免答券）；② 转盘：转盘抽题型或分值，答对得该分值；③ 棋盘：答对前进、踩到怪兽格退一格、宝箱格得提示。壳只管节奏与奖惩，题目与判分完全复用题池与 RV.finalize。
- **界面要素**：选壳页（三张壳卡）、壳内统一题卡插槽、积分/步数条。
- **数据映射**：复习题池 1,796 题零改动接入；错题本/闯关已有计分口径可复用。
- **理由**：Wordwall（34 模板一键换壳）、Blooket（25+ 模式同一题集）、Baamboozle（格子+运气格）三家共同的产品哲学就是「题不变、壳多变」；萌星题池已经很大，缺的正是壳。这是全站互动感的乘数，不是加数。

### 10. 图解标注 Labelled Diagram（F2）★★★☆☆

- **机制拆解**：① 一张 SVG 场景图（如课桌上下、房间）上有 5–8 个空钉点 → ② 下方给标签词卡，点词卡再点钉点完成标注（两步点选代拖拽）→ ③ 全对后场景「活过来」：点任意物件读出方位句（The cat is under the desk.）。
- **界面要素**：场景图（SVG 手绘简单场景）、钉点、词卡托盘、方位句播报。
- **数据映射**：介词区（PB 介词书房）的方位词与例句是天然题源；身体、教室等场景词从词库取。
- **理由**：Wordwall、H5P、Quizlet、Twinkl 四家都有此形态且都用于「词-位置」绑定；萌星介词区目前零练习题（审计已记），此形态正对口。成本在画 3–5 张 SVG 场景，故排第 10。

### 11. 自适应 Learn 循环（E11）★★★☆☆

- **机制拆解**：① 选一个词表/规律 → ② 系统按「闪卡自认→选择→点选配对→听拼」四题型轮转出题 → ③ 答错的词降级回闪卡重学、答对的词升阶减少复现 → ④ 全表词都升到顶阶才报「掌握」，中途进度可续。
- **界面要素**：掌握度阶梯条（每词一格）、题型自动切换（无选模式页）、结束报告。
- **数据映射**：题池适配器已就位（阶段成果），错题本 mxWrongBookV1 的「跨 2 天×3 对毕业」规则可直接当升阶规则。
- **理由**：Quizlet 把 Write/Spell 都并进 Learn，说明「系统编排」胜过「学生选模式」；萌星已有 SRS 与错题本两块底座，缺的是把它们串成一条编排线——属于把已有资产拧成产品的一步。

### 12. 听辨选词 Listen & Pick（A2 独立版）★★★☆☆

- **机制拆解**：① 播放一个词（TTS，可慢速）→ ② 屏上 4 个拼写相近的词（如 ship/sheep/chip/cheap）点选 → ③ 答错立刻对比播放所点词与正解的发音 → ④ 一组按同一易混音素出题，结算给「本组易混点」卡。
- **界面要素**：播放键、2×2 词卡、对比播放（错时双键并排）。
- **数据映射**：174 模式的最小对立对（同模式/邻模式词）+ 音标字段（words_master 有音标）；四法原型里的判断闪电战可并入此组件当快档。
- **理由**：PhonicsPlay Pick a Picture 与 DuoRadio Listen and Select 的共同形态，专治中国孩子最典型的元音混听；与 #1 听写共用音频与判分底座，边际成本低。

---

## 三、不适合单文件/无后端环境的形态，及替代做法

| 形态 | 为什么不适合 | 替代做法 |
|---|---|---|
| 真语音评分跟读（Duolingo Speak 判分、Studycat VoicePlay 音素级反馈） | 需儿童语音 ASR 模型与端侧/云端识别；浏览器 Web Speech API 对儿童英语识别率不可靠、且需联网与麦克风授权，结果不可控 | **录音自比**（A5）：录自己的声音与 TTS 范读并排回放，孩子自己点「像/再练」；加**影子跟读**（边播边跟、波形只做装饰反馈不做判分）。H5P Speak the Words 官方亦注明仅 Chrome 可用，侧面印证环境依赖 |
| 多人实时对战（Quizlet Live 团队赛、Blooket/Gimkit 全班联机） | 需后端房间、实时同步与教师端 | **同设备轮流制**：Baamboozle 式两人/两队共用一屏轮流选格答题（其官方机制本就是引导员点 Check、口头作答，天然适配单机）；或与电脑对战的棋盘壳（二-9） |
| AI 角色对话/视频通话（Duolingo Roleplay、Video Call，Max 订阅专属） | 依赖大模型后端与实时语音 | **分支对话**（F5）：把对话 144 段改写成带 2–3 个分支选项的脚本对话，选错走「误会分支」再绕回来；脚本全预写、零后端 |
| 大型 2D 游戏世界（Gimkit Fishtopia/Don't Look Down、Teach Your Monster 冒险地图、Wordwall Maze Chase 全版） | 需要游戏引擎、关卡美术与角色动画资产，单文件体积与工时都失控 | 只借**经济循环**（答题→得资源→升级/解锁装扮）与**棋盘推进**，用 emoji/SVG 做棋盘与收集册；Maze Chase 只借「跑向答题区」的简化点选版 |
| 真人视频停点题（H5P Interactive Video 原版、ISLC 视频测验） | 萌星无视频素材库，外部视频不可打包进单文件 | **白板停点**（二-4）：自有白板动画即视频等价物 |
| 精细拖拽类（真拖拽标注、拖词排序的原版手感） | 低龄+触屏下拖拽误操作率高；多家产品（Wordwall Find the match、Duolingo 词块）实际都提供点选等价路径 | 全站统一「点选两步法」：点源→点目标（萌星四法原型已验证此口径，组句/连线均为点选式） |
| 字母描红的笔顺判定（Duolingo ABC/Khan 描红原版） | 需笔迹轨迹判定与字形路径数据 | 降级为「看笔顺动画→点序拼字母」：按正确笔顺顺序点出笔画编号，或用 C7 字母重组替代书写训练（描红列入低龄段远期项） |
| 排行榜/云存档类激励（Blooket 账号体系、Quizlet 班级） | 需账号与后端 | 本地 localStorage 个人最佳纪录（闯关 mxRushBestV1 已是此口径）+ 总地图只读聚合，不做跨人排名 |

---

## 四、来源清单（逐个打开核对；标「二手」者为非官方来源，仅作旁证）

### Duolingo 系
1. Duolingo 官方博客·产品亮点（Stories 进 100+ 课程、题型全景）— https://blog.duolingo.com/product-highlights/
2. Duolingo 官方博客·DuoRadio（听力剧场机制与嵌入题型）— https://blog.duolingo.com/duoradio-listening-practice/
3. Duolingo 官方博客·阅读技能体系 — https://blog.duolingo.com/covering-all-the-bases-duolingos-approach-to-reading-skills/
4. Duolingo ABC 官方·How We Teach（五维读写课程：phonics/音素意识/理解/流利/词汇）— https://abc.duolingo.com/how-we-teach
5. Duolingo ABC 官方葡语站（描字母/sight words 课程线）— https://pt.duolingo.com/abc
6. Duolingo 练习题型清单（二手·粉丝 Wiki，题型名录最全，仅作旁证）— https://duolingo.fandom.com/wiki/Exercise
7. Common Sense Media·Duolingo ABC 评测（二手·权威评测机构：127 单元、描字母与故事细节）— https://www.commonsensemedia.org/app-reviews/duolingo-abc-learn-to-read

### Wordwall（模板 taxonomy 标杆，34 模板）
8. Wordwall 官方·价格页（12 标准+22 附加模板全名单）— https://wordwall.net/cb/price-plans
9. Wordwall 官方·功能页（同内容一键换模板）— https://wordwall.net/features
10. Wordwall 官方模板页·Match up — https://wordwall.net/en/about/template/match
11. Wordwall 官方模板页·Unjumble（机制原文）— https://wordwall.net/about/template/unjumble
12. Wordwall 官方模板页·Anagram — https://wordwall.net/about/template/anagram
13. Wordwall 官方模板页·Open the box — https://wordwall.net/about/template/openthebox
14. Wordwall 官方模板页·Find the match — https://wordwall.net/about/template/findthematch

### H5P（开放内容类型库，54 种）
15. H5P 官方·内容类型总表（Interactive Video、Drag the Words、Mark the Words、Dictation、Branching Scenario 等全类型与说明）— https://h5p.org/content-types-and-applications

### 互动练习题库大户
16. Liveworksheets 官方帮助·如何制作互动练习（单选/拖拽对/箭头连线/听力 TTS/开口说等元素；10 练习册×120 页上限）— https://www.liveworksheets.com/help/get-started/how-do-i-make-interactive-worksheets
17. Liveworksheets 官方·About（数千份自判分练习）— https://www.liveworksheets.com/about
18. ISLCollective 官网（80,000+ 份 ESL 材料，站方口径）— https://en.islcollective.com
19. School Library Journal 书评（二手·权威期刊：Video Quiz 五种题型清单、100 万+ 教师社区）— https://www.slj.com/story/isl-internet-second-language-collective

### 游戏化答题平台
20. Quizlet 官方帮助·学习模式（Learn/Test/Match 现行说明；Gravity 已下线，以此为准）— https://help.quizlet.com/hc/en-us/articles/360030841732-Studying-on-Quizlet
21. Blooket 官方帮助·模式预览（25+ 模式机制逐个说明）— https://help.blooket.com/hc/en-us/articles/21408591795351-Blooket-Game-Mode-Previews
22. Baamboozle 官方游戏页（格子+运气格机制实样）— https://www.baamboozle.com/game/3419523?page=2
23. Baamboozle 官方游戏页（Quiz/Classic 双模式）— https://www.baamboozle.com/game/511805
24. Wayground（原 Quizizz）官方博客·学生激励机制（Power-Ups 清单）— https://wayground.com/blog/top-5-new-quizizz-student-motivators
25. Wayground 官方·课堂游戏指南（模式与题型）— https://wayground.com/learn/education-assessment/best-classroom-games-for-student-engagement-free-tools-and-ideas-for-teachers
26. Gimkit 模式清单（二手·多家 2026 评测交叉核对，官网未逐页打开，模式名以评测共识为准）— gimkit.com（官网域名；具体模式页未核实）

### 低龄拼读与阅读
27. PhonicsPlay 官方·Picnic on Pluto（真假词分拣）— https://www.phonicsplay.co.uk/resources/phase/3/picniconpluto
28. PhonicsPlay 官方·Buried Treasure — https://www.phonicsplay.co.uk/resources/phase/5/buriedtreasure
29. PhonicsPlay 官方·Picture Match（听词选词）— https://www.phonicsplay.co.uk/PictureMatch.html
30. Teach Your Monster to Read 官方·总览 — https://www.teachyourmonster.org/teach-your-monster-to-read-overview/
31. Teach Your Monster to Read 官方·小游戏清单（字母音匹配、读指令做事等机制原文）— https://www.teachyourmonster.org/teach-your-monster-to-read-mini-games/
32. Khan Academy Kids 官方·ELA 课程（逐词高亮点读、书中嵌题）— https://www.khanacademy.org/kids/ela
33. Starfall 官方教师指南·一年级阅读（Word Machines 等）— https://teach.starfall.com/guides/first/reading
34. Starfall 官方教师指南·幼儿园阅读 — https://teach.starfall.com/guides/kindergarten/reading
35. Reading Eggs 官网（120 课/12 地图、4,000+ 电子书；厂商口径）— readingeggs.ca（官网域名，专题页链接未单独保留）
36. Oxford Owl 官方·免费电子书库（100+ 本、按级别筛选）— https://www.oxfordowl.co.uk/for-home/find-a-book/library-page?view=details&query=&type=book&age_group=Age+3-4&book=&book_type=&series=
37. Oxford Owl 官方·About（OUP 出品、家校双区）— https://www.oxfordowl.co.uk/welcome-back/for-home/christmas/about-oxford-owl-christmas
38. Storyline Online 官网（明星朗读+每书 Activity Guide）— storylineonline.net（官网域名）
39. British Council LearnEnglish Kids（游戏/歌曲/故事栏目；Playtime 的 listen-and-record 经其 App 页核对；个别游戏名含二手汇编，已在正文标注）— britishcouncil.org 旗下 LearnEnglish Kids（专题页链接未单独保留）
40. Lingokids 官网/帮助（活动量数字各页面不一致：4,000+ 活动与 1,200+ 两种口径并存，正文按「厂商口径、数字有出入」处理）— lingokids.com（官网域名）
41. Studycat 官方博客（VoicePlay 端侧语音、Hear-Learn-Say-Use 方法论）— https://studycat.com/blog/the-best-rated-kids-language-android-app-for-fun-fast-vocabulary-growth/
42. Studycat 产品页（经其新闻稿引用核对）— https://studycat.com/products/english/

### 课堂游戏站与白板资源站
43. ESL Games Plus 官方·游戏总览（Sentence Monkey、棋盘游戏、记忆游戏等）— https://www.eslgamesplus.com/fun-games/
44. Games to Learn English 官方·Hangman（30 主题集与版式）— https://www.gamestolearnenglish.com/hangman/
45. Games to Learn English 官方·白板游戏页 — https://www.gamestolearnenglish.com/pages/interactive-whiteboard-games/
46. Games to Learn English 官方·教师区（约 40+ 游戏规模）— https://www.gamestolearnenglish.com/teachers-section/getlink
47. Twinkl Go 官方博客·什么是 Twinkl Go（资源类型清单）— https://www.twinkl.com.sa/blog/what-is-twinkl-go
48. Twinkl 官方博客·Twinkl Go 在线游戏（Polar Pairs、Press the Button 等）— https://www.twinkl.co.za/blog/online-games-for-kids-with-twinkl-go
49. ABCya 官网（400+ 游戏、按年级与类型组织；厂商口径）— https://www.abcya.com
50. PBS KIDS 官方·游戏区 — https://pbskids.org/games
51. PBS KIDS Games 应用页（280+ 免费课程游戏；应用商店官方描述）— Google Play「PBS KIDS Games」词条
52. TopMarks 官方·KS1 搜索页（Hit the Button、Daily 10 等机制原文）— https://www.topmarks.co.uk/Search.aspx?AgeGroup=2
53. TopMarks 官方·Words and Spelling Games（5–7 岁：Sighties、Karate Cats 等）— https://www.topmarks.co.uk/english-games/5-7-years/words-and-spelling
54. TopMarks 官方·Hit the Button（限时快答机制原文）— http://topmarks.co.uk/maths-games/hit-the-button
55. TopMarks 官方·Times Tables Games（Bingo 等课堂白板资源）— http://www.topmarks.co.uk/maths-games/7-11-years/times-tables
56. Crickweb 官方·Key Stage 1（53 个免费资源、Word Cruncher 等）— http://www.crickweb.co.uk/Key-Stage-1.html
57. Crickweb 官方·Literacy Links（Sentence Maker、Compound Words 等）— http://www.crickweb.co.uk/links-literacy.html
58. Crickweb·KS1 Literacy（15 个互动资源，经学校页引用核对）— http://www.crickweb.co.uk/ks1literacy.html

### 旁证与汇编（二手，仅用于规模数字交叉核对）
59. Structural Learning·TopMarks 教师指南（二手：400+ 游戏口径）— https://www.structural-learning.com/post/top-marks-a-teachers-guide
60. Burnaby 学区·资源汇编（二手：Crickweb 252 资源口径）— https://learning.burnabyschools.ca/resources/
61. SuperParent·Duolingo ABC 发布报道（二手）— https://www.superparent.com/duolingo-abc-wants-to-help-littles-learn-to-read/
62. EIN Presswire·Studycat 新闻稿（二手·厂商稿：VoicePlay 与零压力设计细节）— https://www.einpresswire.com/article-print/859104288/studycat-elevates-kids-english-language-app-with-zero-pressure-gameplay-to-boost-focus
63. 51Talk·少儿英语对比文（二手：Duolingo ABC 700+ 课口径旁证）— https://www.51talk.com/articles/choosing-one-on-one-english-for-kids-curriculum-and-teachers-explained/

> 未核实声明：Gimkit 官网模式页、Lingokids 与 Reading Eggs 的确切活动量、Quizlet「3 亿+ 学习集」均为二手口径，正文已逐处标注，未作为机制依据；British Council 个别游戏名（Wordshake 等）来自二手汇编，未逐个在官网打开核对，正文不以其为机制依据。
