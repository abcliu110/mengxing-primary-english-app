# 世界著名 App「语法首页」设计分析

> 用途：为语法区一级页设计口径提供决策依据。方法：逐个打开真实来源（官网产品页 / 网页版 / 官方帮助文档 / 商店页）核实，只写亲眼所见；每项标接触等级。
> 核查日期：2026-11-02。姊妹文件：同目录 `report.md`（第六章为我方语法区提案，本分析的综合章与之对表）。

**接触等级图例**：网页版实开（本工具直接打开页面读到全文）／官方文档（官方帮助中心、官方博客、官方大纲）／商店页（应用商店官方文案及其镜像）／页面存档互证（官网被反爬或策略拦截，据官方页面存档文本与多个独立目录互证）／未核实（明确标注，不写细节）。

**缺口总账（先说没核到的）**：
- Khan Academy 官网课程页直开被反爬拦截（Client Challenge），其结构据一所大学保存的真实课程页存档文本（CliffsNotes 转存的 Khan 课程页，含页眉与单元掌握度原文）＋多所大学图书馆 LibGuides 的课程目录互证，等级记「页面存档互证」。
- BBC 官网（bbc.co.uk）被本工具策略拦截，结构据 BBC 官方《Course Information》与《Lower Intermediate Syllabus》两份官方大纲文档（Scribd 镜像）核实，等级记「官方文档」。
- Cambridge EGIU App 本体未安装实开：首页形态据官方商店描述（APKPure 等商店镜像的官方文案）＋剑桥大学出版社官方目录 PDF（App 单元与原书目录 1:1）互证；App 内是否有完成度标记，商店文案未提及，记「未核实」。
- Babbel Grammar Guide 帮助页无界面截图文字，话题列表的行样式（图标、副信息）记「未核实」，只写帮助页明文写到的部分。
- Duolingo ABC 未单独核实其内部结构，不在本报告下任何界面结论。

---

## 一、综合类语言 App

### 1. Duolingo（接触等级：官方文档——官方博客《The Science Behind Duolingo's Home Screen Redesign》＋官方 Duolingo for Schools 帮助页）

1. **语法从哪里进**：没有独立语法板块。语法嵌在主学习路径里：讲解收进每个单元开头的 **Guidebook**（官方 Schools 页原文：「each unit will include a Guidebook packed with tips and helpful phrases」，第三方评测一致指出其中主要是语法提示与关键句型）；练习本体在路径课时中混编。官方博客明说新首页的目标是「一条清楚的路」，语法不单列。
2. **一级页分组维度**：三层——**Section（按 CEFR 等级分段**，官方公布的映射：大课 Section 3 末＝A1、4 末＝A2、6 末＝B1、8 末＝B2）→ **Unit（按话题分组**，如食物、旅行）→ **Lesson/Level（路径上的圆节点）**。即：等级作大分组、话题作单元、顺序即路径。
3. **列表一行（节点）的解剖**：路径节点是圆形图标按钮，标题不在行上常驻——**点开节点才弹出该课标题**（第三方评测原文：「To see what a level will teach you, just click on it to read its title」）。真正承担「行标题」职责的是**单元横幅**：写「Unit N」＋一句**能做到什么（can-do）短语**，如用户实录的「Unit 18: Use the present perfect, describe people」「Unit 21: Tell others what to do, discuss student life」——功能式命名，不是术语式。横幅上另有 Guidebook 按钮。
4. **状态与进度**：进度即「你在路上的位置」；已完成节点变**金色**；走完全单元可达 **Legendary** 状态；未到达的节点锁定不可学（可通过单元测试跳级解锁）；练习（Practice）与 Stories 作为特殊节点**内嵌在路径中**，不需要另找复习入口（官方博客原文：Practice is built into your path）。完成过的金节点可点回重学。
5. **明细页**：点节点直接进课时练习流（听、说、读、写混编题）；语法讲解在单元横幅的 Guidebook 里，是脱离练习流的参考页。

### 2. Busuu（接触等级：官方文档——官方帮助页《How can I review my grammar?》实开核实）

1. **语法从哪里进**：双通道。主课程课时内嵌语法讲解；另有**独立的 Grammar Review**，从底部 **Review 标签 → Grammar** 进入，是全报告中唯一把「语法复习」做成一级独立入口的综合 App。
2. **一级页分组维度**：Grammar Review 内是**语法话题平铺列表**（topics），不按等级再分组——话题的来源与顺序由主课程进度决定：**学完对应课时才解锁该话题**（帮助页原文：You can unlock individual topics by completing a corresponding lesson within the course）。
3. **列表一行的解剖**：一行＝一个语法话题（术语式话题名）；行/话题页的核心副信息是**掌握度**（见下）。页面顶部另有总入口「Practice now / Practice grammar」——一条**个性化混练**（系统按你的弱项拼题），与「Focused practice」（自选单个话题）并列为两种进入方式。
4. **状态与进度**：每个话题带**四色掌握度**：红 Needs practice → 黄 Improving → 蓝 Strong → 绿 Mastered（帮助页逐字给出四级定义）；话题页有 **0–100% 掌握进度条**（由该话题答题表现算出的 rating 换算，帮助页注明进度条目前仅网页版有）。**没有锁定图标语义**——未解锁话题是「还没学到」，靠回主课程补课解锁。
5. **明细页**：话题专页 = **Tips（讲解）＋ Practice 按钮（练该话题）**，讲解与单点练习同页成对。

### 3. Babbel（接触等级：官方文档——官方帮助中心《Grammar guide》实开核实；课程单元数细节来自第三方评测，已注明）

1. **语法从哪里进**：双通道，与 Busuu 同构。主通道是 CEFR 课程课时内的显性语法讲解（第三方评测一致：每课含语法讲解段）；独立通道是 **Grammar Guide**——App 在 **Practice 标签**、网页版在 **Explore 标签**里（帮助中心原文）。
2. **一级页分组维度**：主课程按 **CEFR 等级分课**（A1–B2/C1，因语言而异），课内按单元序推进（第三方评测例：葡语 A1 12 单元、A2 19 单元、B1 6 单元——评测数据，非官方核实）。Grammar Guide 本身是**话题集合**，帮助页只说「explore different topics」，且其覆盖范围被官方限定为 **A1/A2 初学者**、目前仅德语/西语/法语课程有——即独立语法索引只做入门段。
3. **列表一行的解剖**：帮助页未展示行样式（未核实）。能确认的只有：每个话题页 = **讲解＋例句收在一处**（condensed overview），可反复重看（You can repeat the material as many times as you wish）。
4. **状态与进度**：Grammar Guide 帮助页**没有任何掌握度/完成状态的说明**（与 Busuu 形成对照）；主课程的复习靠独立的 Review（间隔重复）机制承接，不在语法列表行上呈现（第三方评测）。
5. **明细页**：话题页即讲解页（规则＋例句），定位是「查与复习」，训练回到课程/Review。

### 4. Khan Academy · Grammar 课程（接触等级：页面存档互证；年级分段课程另据官方博客）

1. **语法从哪里进**：**独立课程**「Grammar」（Arts and humanities 学科下），有自己的课程首页；另据官方博客（2026），新推出**按年级段分的语法课**（5–6 年级 / 7–8 年级 / 9–10 年级），并已并入同年级的阅读写作课——即同一内容有「独立课程」与「按年级嵌入」两副面孔。
2. **一级页分组维度**：原版全龄课程页页眉写明「**10 UNITS · 100 SKILLS**」。10 个单元的分组是**词类岗位＋句法＋标点＋用法**的体系序：Unit 1 Parts of speech: the noun → 2 the verb → 3 the pronoun → 4 the modifier → 5 the preposition and the conjunction → 6 Punctuation: the comma and the apostrophe → 7 Punctuation: the colon, semicolon, and more → 8 Syntax: sentences and clauses → 9 Syntax: conventions of standard English → 10 Usage and style（存档文本逐字）。
3. **列表一行的解剖**：单元行下是 **skill 行**：技能名（术语式，如「Subject-verb agreement」）＋类型（视频/文章/练习，行内有对应条目）＋**掌握等级标签**；单元末尾固定有 Quiz 与 Unit test，课程末尾有 Course challenge。
4. **状态与进度**：全报告中最细的进度系统：单元行显示 **Unit mastery 百分比＋掌握点数**（存档原文例：「Unit mastery: 100%」「1,300 / 1,300 mastery points」）；每个 skill 五级状态：**Mastered / Proficient / Familiar / Attempted / Not started**，且给出了每级的达成口径（如 Proficient＝练习 100% 答对或在测验中答对 Familiar 技能）。无锁定——全开放，靠掌握度导航。
5. **明细页**：skill 页 = 视频讲解 → 练习 → 单元测验，与首页的掌握度实时联动。

---

## 二、语法专长类

### 5. Cambridge《English Grammar in Use》官方 App（Murphy；接触等级：商店页＋出版社官方目录 PDF）

1. **语法从哪里进**：这是一个**纯语法独立 App**（书的 App 化），打开即语法目录，没有别的学科。
2. **一级页分组维度**：1:1 照搬原书目录——**语法系统类别分组**：Present and past / Present perfect and past / Future / Modals / Conditionals and 'wish' / Passive / Reported speech / Questions and auxiliary verbs / Articles and nouns / Determiners and pronouns / Relative clauses / Adjectives and adverbs / Conjunctions and prepositions / Prepositions / Verb + preposition / Phrasal verbs 等（出版社官方目录 PDF 逐字核实），组内是 **145 个编号单元**顺序排列。作者在书前言中明说：单元按语法类别组织、**不按难度排序，不应从头学到尾**——目录是「查的序」，不是「学的序」。
3. **列表一行的解剖**：一行＝「**编号＋术语标题＋括号里的例句式模型句**」，如「1 Present continuous (I am doing)」「11 How long have you (been) ...?」「23 I will and I'm going to」。标题本体是术语，模型句承担「这条讲什么」的可读化说明。App 另配 **Study Guide**（诊断题组，做完告诉你该学哪些单元——目录无序的官方解法）和 Glossary。
4. **状态与进度**：商店文案只确认练习**自动批改、可查看正确答案**；单元的「解锁」是**购买解锁**（免费 Starter Pack 含 6 个单元，其余按单元或整包内购），不是学习进度锁定。App 内是否有完成勾/百分比，**未核实**。
5. **明细页**：单元页照搬书的双页模型：左页讲解＋例句、右页练习（App 里为上下/切换呈现，讲解由 Murphy 专为手机改写，商店文案原文）。

### 6. British Council · LearnEnglish（网页版）（接触等级：网页版实开——A1-A2 语法页全文核实；其语法 App 另据商店页）

1. **语法从哪里进**：站内**独立 Grammar 板块**，与 Skills、Vocabulary 并列。
2. **一级页分组维度**：先**按 CEFR 等级带分册**：A1-A2 grammar / B1-B2 grammar / C1 grammar 三页（另有 B1-B2 页 URL 与站内导航互证）；进入某一带之后，语法点是**一页平铺的卡片列表，按字母序**排列（实开所见顺序：Adjectives and prepositions → Articles: 'the' or no article → Comparative adjectives → Infinitive of purpose → Possessive 's → Present simple → Present simple: 'to be' → Question forms，确为字母序）。
3. **列表一行的解剖**：卡片＝**术语式标题**＋一句**问题式副文案**：「Do you know how to use adjectives with prepositions like *interested in* or *similar to*?」——每个卡片都以「Do you know…?」开头并给出该点的典型形式例，然后是「Read more」。无题数、无时长。
4. **状态与进度**：公开网页**无任何状态**（无账号进度、无勾、无锁）——纯开放资源。同名 **LearnEnglish Grammar App**（商店页文案）则是另一副面孔：**四个等级**（Beginner A1 → Advanced C2），每级约 **25 个话题、600+ 道题**，每级内分 **Practice / Test** 两区——App 里有等级与题量，网页上没有。
5. **明细页**：语法点页固定三段式：**先做题自测 → 读讲解 → 再做题验证**（页面导语原文：Start with an exercise… Then, read the explanation… Finally, test your understanding again）。

### 7. BBC Learning English（接触等级：官方文档——BBC 官方课程信息与大纲文档镜像；官网直开被拦截）

1. **语法从哪里进**：两条线。一是**等级课程内的固定语法栏目**；二是**独立语法节目系列**（6 Minute Grammar、The Grammar Gameshow、English Class、Grammar with Georgie、Grammar Masterclass 等），按节目（系列）组织。
2. **一级页分组维度**：课程线按**等级分课程**：Lower Intermediate / Intermediate / Upper Intermediate / Towards Advanced；每门课 **30 个单元**，单元按**话题**命名（如 Unit 1 – Nice to meet you!、Unit 2 – What to wear、Unit 27 – Job hunting…），单元内是**固定 5 个 Session 栏目**，语法栏目恒定出现：6 Minute Grammar（音频讲解）＋ Grammar reference（文字参考）＋ 对应练习；大纲表格里每个单元明确标注本单元语法点（Unit 1 = Question forms，Unit 27 = Question tags，Unit 30 = Present and past modals of ability——官方大纲逐字）。节目线则是**系列 → 集**的列表，集标题术语式（「Comparatives: The Grammar Gameshow Episode 15」「Articles: … Episode 28」），视频列表带**时长**（节目页/视频页所见，如 9 分 18 秒）。
3. **列表一行的解剖**：课程线的一行是「Unit 编号＋话题标题」，语法点不在行标题上、在单元内容表里；节目线的一行是「语法点术语＋节目名＋集数（＋时长）」。
4. **状态与进度**：公开课程页与节目页**无完成状态、无锁定、无百分比**（开放广播资源，无账号进度体系；此条据官方大纲与公开页面形态，未见任何进度标记）。
5. **明细页**：单元页 = 5 个 Session 的活动流（听/读/视频/练习混合），语法参考页是单元内的一个固定落点。

### 8. Perfect English Grammar（Seonaid Beckwith；接触等级：网页版实开——免费站练习索引页全文核实；付费课据其官方 Teachable 课程页）

1. **语法从哪里进**：整站即语法。免费站没有「首页推荐流」，**索引页本身就是一级页**：Grammar explanations 索引与 Grammar exercises 索引两张长列表。
2. **一级页分组维度**：**语法系统序**，且时态在最前、按时间线排：Irregular Verbs → Present Simple（be / 其他动词分开）→ Present Continuous → 对比组（Present Simple or Present Continuous?）→ Present Perfect → Past 各时态 → Future 各时态 → Negative Questions → Conditionals → Reported speech → The passive → Relative clauses / pronouns → Reflexive / Possessive → Modal verbs → Verb patterns → Prepositions → Adjectives → Intensifiers → Gerunds and infinitives → …（实开全文顺序）。组与组之间还穿插「X or Y?」**对比组**作为独立分组（如 Past Simple or Present Perfect?）。
3. **列表一行的解剖**：极简——**纯文字链接行，无任何副信息**：术语式行名，靠编号与后缀区分同组练习（「Present Perfect All Forms Mixed Exercise 1 / 2」）。组头是加粗的术语类名（多带冒号，如「Conditionals: Forms」）。
4. **状态与进度**：免费站**完全无状态**（无账号、无勾、无进度）。其付费课（Teachable）换成另一副面孔：**按等级成课**（Ultimate A1 / A2 / B2…），课程页 = Section（话题）→ Lesson 行，**行带视频时长**（如「Lesson 1: Past simple form with irregular verbs (5:42)」），平台提供完成状态——同一作者、免费索引与付费课程用了两套组织（一套系统序、一套等级序）。
5. **明细页**：讲解页 = 一页讲清一个点（规则＋例句＋常见错误），底部链向同点练习；练习页即时判对错。

### 9. 儿童向附记：Lingokids（接触等级：官方文档——官方帮助中心与官网博客）

- **没有语法首页，本节记为「不适用」**：Lingokids 的结构化内容叫 Lessons，按**入学阶段**（Preschool / Kindergarten / 1st Grade Readiness）＋**学科**（Literacy、Maths、Science、SEL、Nutrition、English vocabulary 等）分组；英语内容以**主题词汇**为主，官方材料中没有独立的语法板块或语法列表页（帮助中心 Lessons 条目逐项核实）。App 首页是推荐流（评测所见：Your Daily Picks / Topics / Worlds to Explore / What's New），进度靠每课结尾的**证书**与家长报告呈现，不在列表行上。
- 对我方的含义：主流儿童产品干脆不给低龄段设「语法区」——语法以词汇与句型游戏的形态藏在主题内容里。我方用户是小学段（高于 Lingokids 的 2–8 岁主力段），设独立语法区不算逆行，但这条证据提示：**儿童面的行标题与分组名必须去术语化**，术语只留成人层。

---

## 三、综合对照表

| 对象 | 语法入口 | 一级页分组维度 | 行标题写法 | 行副信息 | 状态/进度 | 锁定语义 |
|---|---|---|---|---|---|---|
| Duolingo | 嵌主路径（Guidebook 收讲解） | 等级 Section → 话题 Unit → 顺序节点 | 单元横幅＝can-do 功能句；节点点开才见课名 | Guidebook 按钮 | 完成变金色、Legendary、位置即进度 | 顺序未到 |
| Busuu | 独立 Review→Grammar ＋ 课内 | 话题平铺（顺序由课程决定） | 术语式话题名 | 掌握度色点 | 四色掌握度＋0–100% 条（话题页） | 未学对应课＝未解锁 |
| Babbel | 课内讲解 ＋ 独立 Grammar Guide | 课程按等级；Guide 按话题集合（仅 A1/A2） | 术语式话题名（行样式未核实） | 讲解＋例句同页（行副信息未核实） | Guide 无状态说明；复习归 Review 机制 | 无（订阅墙除外） |
| Khan Academy | 独立课程 | 词类岗位＋句法＋标点＋用法（体系序）；新课另按年级段 | 术语式（Unit/skill 名） | 技能类型、Quiz/Unit test | 单元掌握%＋掌握点数；skill 五级标签 | 无锁定 |
| Cambridge EGIU App | 纯语法独立 App | 语法系统类别（书目原序） | 编号＋术语＋括号模型句 | Study Guide 诊断入口、Glossary | 自动批改（完成标记未核实） | 购买解锁 |
| British Council 网页 | 独立 Grammar 板块 | 等级带分册 → 带内字母序平铺 | 术语标题＋「Do you know…?」问题式副文案 | 无 | 无 | 无 |
| British Council App | 独立语法 App | 四个等级 → 每级约 25 话题 | 话题名 | 每级 600+ 题（题量） | Practice / Test 分区 | 等级递进 |
| BBC Learning English | 课程内固定栏目 ＋ 独立节目系列 | 等级课程 → 话题单元 → 固定 Session 栏目；系列 → 集 | 单元＝话题名（语法点在内容表）；集＝术语＋集数 | 时长（视频） | 无 | 无 |
| Perfect English Grammar 免费站 | 整站即语法（索引页） | 语法系统序（时态按时间线居首，含对比组） | 术语式纯链接行 | 无 | 无 | 无 |
| Perfect English Grammar 付费课 | 按等级成课 | 等级 → Section 话题 → Lesson | 术语式课名 | 视频时长 | 平台完成状态 | 订阅/滴发（enroll 后按天解锁，课程页所见） |
| Lingokids | 无语法板块（不适用） | 阶段＋学科；英语按主题词汇 | 主题名 | — | 证书（课末）＋家长报告 | 订阅 |

---

## 四、收敛结论

1. **一级页的本质全是「分组纵向列表」。** 路径（Duolingo）、课程页（Khan、Babbel）、目录（Murphy）、索引（PEG）、分册卡片墙（BC）——形态各异，剥到底都是「分组头＋条目行、点行进明细页」。连 Duolingo 官方对自家首页的定义也是「lessons are grouped into smaller units」沿一条路纵向排布；它标志性的蜿蜒只是这张列表的皮肤。这直接证成了用户「所有的首页的基本设计本质是一个列表」的判断。
2. **分组维度收敛为三类，且与产品定位强绑定**：①**等级序**（CEFR/年级）是综合 App 的默认——Duolingo 的 Section、Busuu/Babbel 的课程、BC 的等级带、BBC 的等级课程、Khan 的新年级课，全用等级作第一分组；②**语法系统序**（类别/岗位）是参考型产品的分组——Murphy 的类别目录、PEG 的系统索引、Khan 原版课的词类岗位序；③**学习顺序**只在路径型产品成立，且它不单独成维，而是把等级序压成一条线。没有任何一家用「错误类型」或「功能站点」作一级分组；最接近的先例是 Khan 的词类岗位（按句子成分分工）与 BBC 单元内的固定栏目（按活动类型分工）。
3. **行标题分两派，且副文案承担「翻译」功能**：参考型用**术语本体**作标题（Murphy、PEG、Khan、BC 标题），但几乎都配一件「把术语翻译成人话」的副信息——Murphy 用括号模型句（I am doing）、BC 用「Do you know how to…?」问题句、Khan 用掌握口径说明；路径/教学型则直接把**功能句**作标题（Duolingo 单元名＝can-do 短语，BBC 单元名＝话题，语法点反而藏进单元内）。规律是：**标题与副文案必有一处说人话**。
4. **状态呈现与账号体系绑定，语义收敛为三类**：有学习记录的产品，行级状态必备且只有三种语义——**完成**（Duolingo 金色）、**程度**（Busuu 四色掌握度＋百分比、Khan 掌握点数＋五级标签）、**未开放**（Duolingo 顺序锁、Busuu 未解锁话题、Murphy 付费墙）。无账号的公共资源（BBC、BC 网页、PEG 免费站）则一律零状态。另注意：主流的「锁」语义是「顺序/前置未达」或「付费」，**没有一家用锁表示「内容尚未生产」**。
5. **回访/复习是独立通道，不堆在列表行上**：Busuu 把 Grammar Review 做成一级标签、Duolingo 把 Practice 节点织进路径并允许金节点点回、Babbel 的复习归 Practice/Review 机制、BC 的明细页用「测→读→再测」在页内闭环——共识是：**首页只负责「找与进」，复习靠另设的回路**。

## 五、对我方口径的校准

**我方前提（先声明，差异判断以此为准）**：①产品是「规律机」——语法区内容是 GR-45 映射出的学习件，不是语法知识点全集；②用户已裁定**不分学段**，难度靠区内顺序与前置关系承担；③完整性不靠一级页列表保证，而靠后台体系图（Azar×章振邦）＋总论对账；④现口径（2026-11-02 用户裁定）＝**六站点分组的纵向列表**（搭骨架／动词标记／扩展包／连接与从句／句子变身／病句医院），学习件作行，点击进明细页，状态如实标记。

**逐条对照**：

| # | 我方口径 | 与主流的关系 | 判断 |
|---|---|---|---|
| 1 | 一级页是纵向列表、点击进明细页 | 与全部 9 个对象一致（结论 1） | ✅ 主流本式，无分歧 |
| 2 | 以「站点」作分组（功能/操作分工） | 主流无此维度；最近亲是 Khan 词类岗位序与 BBC 固定栏目 | ⚠️ 差异成立：我方分组对象不是知识点而是**句子操作**，岗位/栏目式分工是唯一能装下操作件的维度；且等级维度已被用户裁定排除、系统序已由总论承担。但须知这是无先例的一维，导航成本要靠下面第 6、7 条补 |
| 3 | 行标题用学习件名（多为操作式，如「形容词排队」「反意疑问回声机」） | 与 Duolingo 的 can-do 命名同派；与参考型的术语标题异派 | ✅ 成立，且更适合儿童面（Lingokids 证据：儿童产品全面去术语化）。建议把 GR 编号与术语名降为行内副信息，正对应 BC「术语标题＋问题式副文案」的镜像做法 |
| 4 | 行副信息目前只有「治什么问题」一句 | 主流普遍多挂 1–2 件量化副信息（Khan 的技能数、BC App 的题量、BBC/PEG 付费课的时长） | 🔧 可吸收：每行加**件内计数**（病例 N 条／练习 N 题／步骤 N）其一，再加**预计分钟**；数据现成（病例与 quiz 都在模型里登记），不许估报 |
| 5 | 组头只有站名＋一句话目标＋件数徽标 | Khan 组头带单元掌握度，Duolingo 横幅带 can-do 描述 | 🔧 可吸收：组头补**组级对账计数**「已做实 x/y」（与我方页脚对账行传统同源），进度语义即「生产进度」而非学习进度，措辞须分清 |
| 6 | 无「从哪开始」的导航（无等级坐标） | Murphy 用 Study Guide 诊断解决无序目录的导航问题；Duolingo 用「当前位置」标记；Busuu 用个性化混练作总入口 | 🔧 强烈建议吸收：页首窄带设**分诊入口**——病句医院 GR-22 总站本就是按错误地图分诊，把它升为首页第一行「先测一测，你的句子哪儿不舒服」；另在推荐顺序的首件上标「从这里开始」（对应 Duolingo 的当前节点标记） |
| 7 | 状态只有「已做实／下一批」二态 | 主流状态是学习状态（完成/程度/未开放），与我方的生产状态不同名不同义 | ⚠️ 差异成立但须防误读：我方的二态是**内容生产状态**，主流无此概念。**不要借用 Duolingo/Busuu 的锁图标**——锁在主流语义是「学了就能开」，会误导；继续用文字徽标（已做实／下一批）。待学习记录打通后，再按主流三态补「已学完」勾与掌握程度，届时两种状态分栏呈现，不许混 |
| 8 | 复习靠全 App 复习区（区外） | 与 Busuu Review 标签、Duolingo 路径内 Practice 的「独立回路」共识一致 | ✅ 一致。细节吸收：明细页完成时把该件登记进复习区；首页组头可预留「待复习 N」位，**无数据时不显示**，不许占位假标 |
| 9 | 时态等内容本体在动词区，本区丙类只留原则卡＋指路 | 主流综合 App 都把语法收进一个体系内（无跨区指路先例）；Murphy 的目录则靠 Study Guide 在条目间调度 | ⚠️ 我方特有结构，无主流先例，但与「规律退总论、指路卡」既有口径一致；风险是孩子在两区之间迷路——原则卡在列表中占行时，行右端须有明确的「去动词区 →」出口标记（BBC 大纲把语法栏目恒定放在单元内同一位置，同理：指路行的样式须全区恒定，一眼可认） |

**可吸收改进清单（汇总，按优先级）**：
1. 页首窄带第一行＝分诊入口（GR-22 升格）＋「从这里开始」标记（补无等级坐标的导航缺口，抄 Murphy Study Guide 的解法、Duolingo 当前节点的形）。
2. 行副信息补量化件：病例数／练习数＋预计分钟（抄 Khan 技能数、BC App 题量、BBC 时长；全部从模型登记数据实数，不许估）。
3. 组头补「已做实 x/y」对账计数（抄 Khan 单元掌握度的位置，语义换成生产对账）。
4. 行标题维持操作式命名，GR 编号＋术语名降为行内小字副信息（抄 BC 的标题/副文案分工，镜像使用）。
5. 「下一批」坚持文字徽标不用锁图标（主流锁语义不同，防误读）。
6. 指路行（丙类）样式全区恒定：行右端固定「去××区 →」（抄 BBC 固定栏目的位置恒定性）。

## 六、来源清单

- Duolingo 官方博客《The Science Behind Duolingo's Home Screen Redesign》：https://blog.duolingo.com/new-duolingo-home-screen-design/ ；官方 Schools 帮助页：https://duolingoschools.zendesk.com/hc/en-us/articles/6829627901197-The-new-Duolingo-homescreen ；单元横幅 can-do 命名实例（用户实录）：https://charlierose.dev/blogposts/20221126/duolingoupdate.html
- Busuu 官方帮助页《How can I review my grammar?》（实开）：https://help.busuu.com/hc/en-us/articles/12575469156242-How-can-I-review-my-grammar
- Babbel 官方帮助中心《Grammar guide》（实开）：https://support.babbel.com/hc/en-us/articles/19260489559058-Grammar-guide
- Khan Academy Grammar 课程页：https://www.khanacademy.org/humanities/grammar （直开被拦截；结构据课程页存档：https://www.cliffsnotes.com/study-notes/1807821 及华纳大学 LibGuides 目录：https://libguides.warner.edu/c.php?g=775625&p=6144677 ）；年级语法课官方博客：https://blog.khanacademy.org/grade-level-grammar-courses/
- Cambridge EGIU App 商店页（官方文案镜像）：https://apkpure.com/th/english-grammar-in-use/org.cambridge.englishgrammar.egiu ；原书官方目录 PDF（剑桥大学出版社）：https://drupal-s3fs-dev.s3.eu-west-1.amazonaws.com/files/5413/9834/2452/grammar-in-use-intermediate2-students-book-without-answers-and-audio-cd-table-of-contents.pdf ；LearnEnglish Grammar App 商店文案：https://www.appbrain.com/appstore/learnenglish-grammar-uk-ed/ios-488099900
- British Council LearnEnglish A1-A2 grammar（实开）：https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2 ；B1-B2 grammar：https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar
- BBC Learning English 官方课程信息（镜像）：https://www.scribd.com/document/502201746/BBC-Learning-English-Course-Information ；官方 Lower Intermediate 大纲（镜像）：https://www.scribd.com/document/401933022/BBC-LEARNING-ENGLISH-Lower-Intermediate-Syllabus
- Perfect English Grammar 练习索引（实开）：https://www.perfect-english-grammar.com/grammar-exercises.html ；付费课课程页：https://perfect-english-grammar3.teachable.com/p/ultimate-a2 、https://perfect-english-grammar3.teachable.com/p/b2-review-exercises
- Lingokids 官方帮助中心《Lessons》：https://help.lingokids.com/hc/en-us/articles/18982608761106-Lessons ；官方博客（牛津内容 Lessons）：http://lingokids.com/blog/posts/new-english-lessons-with-content-from-oxford-university-press
