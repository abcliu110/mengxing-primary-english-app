# 语法区调研报告：GR-45 现状分析 × 全网语法资料精髓 × 原型设计提案

> 调研日期：2026-11-02。方法沿用 09 号词汇调研范式：候选逐个打开核实、接触等级如实标注、打不开的进缺口总账。本地分析基于 `laws-prototype/model/laws/grammar.yaml`（45 条）、`grammar_ext.yaml`（TA/CO/QI 扩展层 50 条）、词库 law_refs 与 App 主文件实测。

**一句话结论**：语法知识组织的最优精髓是把「体系顺序」与「进入顺序」彻底拆开——后台用一张完整体系图保证不漏（抄 Azar 的图表纲目 × 章振邦的本土体系），前台永远按孩子眼下这一句话的一个具体问题切入（一页一问，抄 Swan 的问题切分 × Murphy 的左讲右练双页），而呈现的骨架用「句子槽位」不用术语（抄 Colourful Semantics 的四问色槽）：**语法区不该是 45 条规律的目录，而该是一张能动手摆句子的工坊台。**

---

## 第一章 · GR-01～45 现状分析

### 1.1 这 45 条是什么：四种成分

| 成分 | 条目 | 性质 |
|---|---|---|
| 纲领与学理 | GR-01 + GR-16～27（共 13 条） | 不是语法事实，是「语法是什么、怎么学」：形式—功能纲领、中介语、noticing、频率、语块、概率语法、语法史总叙事 |
| 形态事实 | GR-02～15、GR-28、GR-29（共 16 条） | 词尾与形态系统：时态标记一次、do 替补、三单源流、复数家族、八个词尾、情态化石、some/any 立场 |
| 句法与短语 | GR-30～38、GR-41～45（共 14 条） | 句子层面的操作：从句、关联词、反意疑问、倒装、only 辖域、使役、标点、形容词座次、名词短语装箱 |
| 规范与变体 | GR-39、GR-40（2 条） | 英美差异、虚拟语气化石 |

关键观察：**近三成（13/45）是「关于语法的理论」，不是语法本身**。这批条目质量高（出处实、机制深），但它们天然属于成人层/引擎层，不该和形态、句法条目一起平铺在儿童面当门面——这是语法区与词汇区最大的不同：V 组的 45 条大多是可直接应用的方法，GR 组有十几条是元理论。

### 1.2 逐条分析表

（病例 = error_cases 是否有真错例（带 wrong/right/诊断，多为 GEC 病例库的真实语料错型）；练习 = quiz 题数，探针仅 GR-33 有）

| 条 | 标题句 | 病例 | 练习 | 使用度注记 |
|---|---|---|---|---|
| GR-01 | 形式跟着功能走：语法形式是装着意义的符号，不是空壳规矩 | 待补 | 题1 | 全组纲领，仅陈列 |
| GR-02 | 一个句子的时态只标记一次：标在第一个动词上，后面的动词回原形 | 真病例 | 题1 | 被 grammar_ext 的 TA 站引用 2 处（原则被用，本区无件） |
| GR-03 | do 是替补队员：英语实义动词丢了自己提问、否定的能力，do 被拉来扛时态 | 真病例 | 题1 | 陈列 |
| GR-04 | 三单 -s 是北方方言留下的幸存者：动词变位大简化后唯一没被磨掉的词尾 | 真病例 | 题1 | 陈列 |
| GR-05 | 名词复数 -s 和三单 -s 不是一家人：长得像，是两条独立源流后来的巧合 | 真病例 | 题1 | 陈列 |
| GR-06 | 不规则过去式按「家族」住：老词靠元音换声留住老样子，高频是它们的保命符 | 真病例 | 题1 | 陈列 |
| GR-07 | 情态动词说的是「力」：must 是一股推力，may 是搬走障碍，can 是自己有劲儿 | 待补 | 题1 | 陈列 |
| GR-08 | 情态动词是语法化的化石：它们曾经是普通动词，所以没有三单 -s、不能连排 | 真病例 | 题1 | 陈列 |
| GR-09 | 否定词会「磨损—加固」打转：not 本来是被喊来帮忙加强否定的，后来自己当了主角 | 待补 | 题1 | 陈列 |
| GR-10 | some / any 是说话人的立场选择，不是「肯定句 some、疑问否定 any」的铁律 | 待补 | 题1 | 陈列 |
| GR-11 | because 和 so 各管一段路：英语一段因果通常只留一个连接点，两个都上是汉语的习惯迁移 | 真病例 | 题1 | 陈列 |
| GR-12 | 主谓一致有三股力在拉：形式、意义、就近——there be 听离它最近的那个名词 | 真病例 | 题1 | 陈列 |
| GR-13 | 所有格 's 是「关联标记」，不是「所有权证书」 | 待补 | 题1 | 陈列 |
| GR-14 | 代词的格跟着位置走：主语位用主格、宾语位用宾格，「讲究过头」也会错 | 真病例 | 题1 | 陈列 |
| GR-15 | a / an 按声音不按字母：耳朵决定，字母只是参考 | 待补 | 题1 | 陈列 |
| GR-16 | 错误是学习者心里的「临时系统」在试单，不是粗心也不是坏习惯 | 真病例 | 题1 | 陈列 |
| GR-17 | 注意到，才学得会：形式被「看见」的那一刻才开始变成自己的 | 待补 | 题1 | 陈列 |
| GR-18 | 把形式拉回交际现场：一边说话解决问题，一边顺手看形式 | 待补 | 题1 | 陈列 |
| GR-19 | 频率在调谐大脑：见得多的先会、不规则的靠见得多才活得下来 | 待补 | 题1 | 被扩展层引用 3 处 |
| GR-20 | 语块先于规则：整句先住进来，语法是后来从里面拆出来的 | 真病例 | 题1 | 被 TA/CO/QI 扩展层引用 5 处，全组最高 |
| GR-21 | 语法讲解的及格线：短、准、够用——先过效率与适切两道检查 | 待补 | 题1 | 陈列 |
| GR-22 | 汉语不标的，英语偏要标：冠词、时态、复数、三单 -s 是中国孩子的错误集中区 | 真病例 | 题1 | 陈列 |
| GR-23 | 输出把「听懂」逼成「会用」：说不出来，才知道自己哪里没真会 | 待补 | 题1 | 陈列 |
| GR-24 | 语法长得像它要说的事：象似性三原则 | 待补 | 题1 | 陈列 |
| GR-25 | 难点可以预测：标记性与「母语没有、目标语偏有」的差值 | 待补 | 题1 | 陈列 |
| GR-26 | 英语把语法搬了家：从屈折综合到语序分析的总叙事 | 待补 | 题1 | 陈列 |
| GR-27 | 语法是概率，不是开关：梯度观与概率语法 | 待补 | 题1 | 陈列 |
| GR-28 | 不规则复数不住单间，住家族宿舍：零复数、变音、-en、外来复数，各是一小家 | 真病例 | 题1 | 陈列 |
| GR-29 | 英语的屈折只剩八个词尾：一张小卡片装下全部「变形负担」 | 真病例 | 题1 | 词库引用最高（51 处）：八个词尾是形态挂接点 |
| GR-30 | 关系从句先分「认人」还是「补一句」：限制性从句负责认出是哪一个，非限制性只是补充情报，逗号就是分界牌 | 真病例 | 题1 | 陈列 |
| GR-31 | 比较级先称「重量」：短词把 -er 缝在身上，长词请 more 来帮忙，双音节词站在两可的门口 | 真病例 | 题1 | 陈列 |
| GR-32 | 关联词成对出门：both…and、either…or 各就其位，并列成分要同形，动词听离它最近的那个主语 | 真病例 | 题1 | 陈列 |
| GR-33 | 反意疑问句是一台回声机：它把主句的助动词和极性翻转着弹回来，升调是真问、降调只要你点头 | 真病例 | 题1·探针5 | 唯一做成学习件者：App 有专属单元 u-gr33「反意疑问三步法」+ 全组仅有的 5 个探针 |
| GR-34 | 倒装有三种活法，形式条件各不相同：呼应式是日常口语，全倒装只请得动名词主语，否定词搬到句首才触发助动词提… | 真病例 | 题1 | 陈列 |
| GR-35 | only 站哪儿就圈哪儿：它的辖域跟着位置与重音走，口语靠重音补位，书面语必须靠站位明说 | 待补 | 题1 | 陈列 |
| GR-36 | 使役动词按力气排队：make 是推着走，let 是放行，have 是派活，get 是说服——形式上只有 … | 真病例 | 题1 | 陈列 |
| GR-37 | 程度词各就各位：so 管形容词，such 管名词短语，too 自带「过头」的否定后果，enough 在形… | 真病例 | 题1 | 陈列 |
| GR-38 | 标点是语法的一部分：英语的逗号扛不起两个完整句子，撇号也不是装饰 | 真病例 | 题1 | 陈列 |
| GR-39 | 英美英语是两套并行标准，不是「一个对一个错」：集体名词、gotten、shall、日期，各有归属 | 待补 | 题1 | 陈列 |
| GR-40 | 虚拟语气只剩几块化石：If I were 的 were 与 suggest that he be，是「过… | 待补 | 题1 | 陈列 |
| GR-41 | 过去的习惯有三兄弟，分工不能串：used to 管今昔对照，would 只回放动作碰不得状态，be us… | 真病例 | 题1 | 陈列 |
| GR-42 | 形容词在很多语言里是「小家庭」：成员可以少到只有 8 个，而且常常像动词或像名词——英语的形容词家庭大规… | 真病例 | 题1 | 陈列 |
| GR-43 | 形容词排队有座次：越靠里的越「长在东西身上」——评价坐最外，颜色、出身、材料贴着名词坐 | 待补 | 题1 | 陈列 |
| GR-44 | 名词短语是一个打包递出去的「指称单位」：包里谁当头、算哪一类，边界是软的、是梯度（Keizer） | 待补 | 题1 | 陈列 |
| GR-45 | 名词短语的装箱规矩：轻的短的在前，重的长的往后挂；「谁的」先看那人在不在眼前（Keizer 的功能解释） | 待补 | 题1 | 陈列 |


### 1.3 使用度三层审计（主会话实测，2026-11-02）

- **上架呈现：45/45。** App LAWDATA 全量在架，每条机制 2–3 节、例句 4、练习题 1；但**探针层近乎缺位**——只有 GR-33 有 5 个探针，其余 44 条为 0。病例：24 条有真病例（GEC 语料错型，带出处与病例号，如 GR-02 的 GEC-001 出自初二写作语料研究），21 条如实标待补。
- **被引用：全覆盖但很薄。** 词库 law_refs 挂到全部 45 条，但总共只有 **279 处**（对比 V 组 1,038 处）——语法条目与词条的天然关联本就弱于词汇，属正常，但也意味着词页不是语法的分发渠道。扩展层（grammar_ext 的 TA 时态站 / CO / QI 共 50 条）只零星回引 GR（GR-20 被引 5 次、GR-19 3 次、GR-02 2 次），**TA 站群与 GR 规律之间没有成体系的挂接**：时态的内容在两处各写了一套，互不引用。
- **做成学习件：1/45。** 只有 GR-33 有专属单元（u-gr33 反意疑问三步法）和探针。其余 44 条全部停在「可读的规律页」。时态方向看似有 TA 18 站在教，但那是动词区的资产、按动词的逻辑组织，不由 GR 驱动——GR-02（时态只标一次）这类最该变成操作件的原则，在 TA 站里只是被顺带用到，没有自己的名字和入口。

### 1.4 现状诊断（一句话）

**语法区是「理论最深、落地最薄」的一个区：45 条里藏着全 App 最好的中国学习者病例库（24 条真语料病例）和一套完整的二语习得学理，但除 GR-33 外没有一条变成孩子能动手的学习件；它陈列的是语法学，而孩子需要的是句子操作。**

---


---

## 第二章 · 著名语法书籍：组织体系与讲法精髓

> 用途：为中国小学生英语规律 App 的语法区设计提供可借鉴 / 可照搬的来源。只做调研，不改 App。
> 方法：以出版社官方页 / 出版社 frontmatter PDF / 作者本人说明 / 完整目录页为优先证据，其次书目页与权威书评；查不到的降级标注，不凭名气补细节。
> 接触等级三档：**实开页面**＝已用 browser_open 打开正文 / 目录 / frontmatter 并据其写作；**仅书目信息**＝只核到书目字段；**仅搜索摘要**＝只见到搜索结果摘要中的目录 / 描述，未打开原页。文末有「缺口总账」。
> 调研日期：2026-11-02。版次以本次核到的最新常用版为准，历史版只作沿革。

### 速读：这批书分四种物种，别混抄

| 物种 | 代表 | 组织原理 | 对 App 语法区的用处 |
|---|---|---|---|
| 自学双页单元书 | Murphy | 一个语法点 = 一个双页（左讲右练），按类聚编、非按难度排序，靠 Study Guide 诊断导流 | **页面模板**最可照搬 |
| 问题条目参考书 | Swan、Parrott | 不按体系顺序教，按「学习者会问 / 会错的问题」切条目 | **入口与索引逻辑**最可照搬（按痛点进） |
| 图表先行教材 | Azar | 一个点 = 一张 chart（形+例+义/用注）先行，后面成梯度练习 | **讲解组件**最可照搬（一图定格） |
| 体系 / 教师理论书 | Celce-Murcia & Larsen-Freeman、Huddleston & Pullum、Quirk、章振邦 | 先立体系纲（维度 / 层次 / 功能），再逐项展开 | 只抄**纲与判据**，不抄正文难度 |
| 教法书 | Thornbury | 不组织语法知识，组织「怎么教」的决策：演绎 / 归纳 / 文本 / 练习 / 纠错 / 整合 | 抄**流程与纠错分寸** |
| 中国传统体系书 | 薄冰、张道真 | 词类逐类 + 动词系统 + 句子成分 / 句型，中文讲解、例句密集 | 抄**中文讲法与英汉对比点**，不抄纲目顺序本身 |

**一句话总括（全批最值得抄的一点）：把「体系顺序」和「进入顺序」拆开——后台用一张完整的体系图保证不漏（Azar / 章振邦式），前台永远按孩子的一个具体问题 / 一个具体错误切成一页一问、左讲右练的最小单元（Swan 的问题切分 × Murphy 的双页模板），这是这批书共同验证过的、唯一同时解决「全」和「学得动」的组织法。**

---

### 1. Raymond Murphy《English Grammar in Use》+《Essential Grammar in Use》

**书目核准**
- *English Grammar in Use: A Self-study Reference and Practice Book for Intermediate Learners of English*，Raymond Murphy，Cambridge University Press。初版 1985；第 5 版 2019（© 1985, 1994, 2004, 2012, 2019）。第 5 版 with answers ISBN 978-1-108-45765-1（据第 5 版版权页信息，搜索摘要核到）。定位 B1–B2，145 单元。
- *Essential Grammar in Use*（通称红色 Elementary 版），同一作者 / 出版社。初版 1990；第 4 版 2015，ISBN 978-1-107-48055-1（with answers，据版权页摘要）。定位 elementary（A1–B1），115 单元。
- 同系列还有 *Advanced Grammar in Use*（Martin Hewings），非 Murphy 著，本稿不展开。

#### 组织体系
- **按语法范畴聚类、单元原子化，不按难度排课序。** 作者在「致学生」中明说：单元「不是按难度排序」「不应从头学到尾」，应按需要选学；不确定学什么先做书后 Study Guide（诊断题）再被导流到对应单元。
- 中级版 145 单元归入约 16 个范畴（据第 3/4 版目录与书评核到的骨架，第 5 版延续此结构、单元数 145）：
  Present and past → Present perfect and past → Future → Modals（can/could/may…）→ If and wish → Passive → Reported speech → Questions and auxiliary verbs → -ing and the infinitive → Articles and nouns → Pronouns and determiners → Relative clauses → Adjectives and adverbs → Conjunctions and prepositions → Prepositions → Phrasal verbs。
- 难啃的大点**拆多单元连排**，不用一单元塞完：如 present perfect 连占数个单元、articles / names with and without *the* 各自成单元（书评举例：第 5 版 Unit 77 专讲 Names with and without *the*）。
- 书后结构固定：7 个 Appendices（不规则动词表 150+、情态 / 缩略 / 拼写、英美差异等）→ Additional Exercises（跨单元综合）→ Study Guide → Key → Index。红色版同构：115 单元 + 7 个 Appendices + Additional Exercises + Study Guide（p.271）+ Key + Index。
- 红色版单元序更贴近初学路径（Unit 1 *am/is/are* 起），但组织原则与中级版完全相同。

#### 呈现精髓
**一句话：一个问题只占一个对开页，左页把话说完，右页立刻练完，不跨页、不回指、不留尾巴。**

左页内部也是固定微结构（据书评对典型单元的拆解）：单元标题直接写成公式原型（如 *Past continuous (I was doing)*）→ 情景例句（常配插图）→ 构成公式（如 *I + was + playing* 的拆法）→ 什么时候用 → 必要时时间轴图。讲解全英文、短句、几乎不用术语行话；标题即例句原型是其标志——目录本身就是一串可读的句子骨架。

#### 例句与练习系统
- 例句：日常情景句为主，左页例句承担「定义」功能（先给场景，再抽公式），不是先定义后举例。
- 右页练习：填空、改写、看图造句、按情景选形式等受控练习，与左页一一对应；书后 Additional Exercises 才做跨点混合。答案在书后（with answers 版），自学可即时自查。
- 诊断系统：Study Guide 是一组诊断题，做错哪组就指向哪几个单元——这是它敢「不按顺序排」的底气。

#### 纠错方式
- 本书无教师纠错论述；纠错被**产品化为自查**：答案键 + 诊断导流 + 学完回左页重读。错误不当场被「讲」，而是被路由回出错的那一页。

#### 对中国小学生的适配
- 能降维用：双页模板、标题=原型句、诊断导流、一个点拆多页。这四样与年龄无关，小学版把左页英文讲解换成「场景图 + 一句中文点破 + 公式条」即可。
- 太成人：全英文讲解、B1 起点、中级版含 reported speech / subjunctive 类内容、练习全是纸面填空、无朗读 / 游戏 / 语音入口；红色版虽为 elementary，仍是成人自学者口吻与生活场景（租房、工作类例句需全换成校园 / 家庭场景）。

#### 可照搬点与不可搬点
- ✅ 照搬：①单元=一对开（App 里=一屏讲解卡 + 一屏练习，不滚动堆叠）；②菜单按范畴聚类但**不锁顺序**，另设「你错哪类 → 推哪页」的诊断入口；③标题写原型句不写术语（写 *I am doing*，不写「现在进行时」打头，术语放小字）；④附录型速查（不规则动词、缩略式）单独成区。
- ❌ 不可搬：难度与内容清单本身；「自学自查」假设（小学生需要即时反馈与朗读校验，不能只给答案键）；全英文讲解。

#### 接触等级
- 中级版：**实开页面**（打开第 5 版介绍 / 书评类页面，核到 145 单元、双页制、附录与 Study Guide 结构；16 范畴骨架由目录类摘要交叉核对）。
- 红色版：**仅搜索摘要**（第 4 版 frontmatter 摘要核到 115 单元、双页制、7 附录、Study Guide 页码；未单独打开其 PDF 正文）。

---

### 2. Michael Swan《Practical English Usage》(PEU)

**书目核准**：Michael Swan，Oxford University Press。初版 1980（作者自述：源于他给新教师做的「典型问题卡片索引」）；第 4 版 2016 年版权 / 2017 年发行（纸版 ISBN 978-0194202411，据 OUP 产品页摘要；年份两说并存，标**待核**到月）。定位 B2–C2，教师与高级学习者。600+ 条目。

#### 组织体系
- **前三版**：600 余条编号条目按标题字母序排列，像词典。
- **第 4 版大改版（作者本人 OUP 博客自述，本次实开核实）**：条目仍独立（「尽可能一条只答一个问题或一小簇问题」），但改为**按主题排**：
  - Part 1 = 一部完整的实用学习者语法：28 个 Section，覆盖「一切会给学习者造成问题的结构点」；每个 Section 开头有该主题的 general notes + 一份「typical learners' problems 典型学习者问题清单」作入口。
  - Part 2 = 词汇问题指南：构词与拼写规则、高优先级词汇领域综述、A–Z 词条问题表。出版社简介作「over 250 common word problems」，作者博客作「nearly 380 word problems」——计数口径不一致，本稿并列登记，不取一为定论。
- 配套：在线版 + 87 个 Diagnostic Tests（OUP 产品页摘要），做完测试链回对应 Section——与 Murphy 的 Study Guide 同理：参考书靠诊断获得「课程感」。
- 作者自述改版理由极有价值：字母序对语法问题是坏索引——相关问题被拆散（如可数 / 不可数在 C、其他名词问题在 N），且多数小问题藏在不以其字母开头的条目里，实际全靠书后索引找。第 4 版即是对「纯字母序」的自我否定。

#### 呈现精髓
**一句话：一问一答——条目从学习者真实会问的问题出发，先给可用结论，再给边界与例外，不从体系定义出发。**

源头即如此：它本是「学生犯了错、提了问，系统语法书却找不到好解释」时用的卡片。条目写法（据作者自述与产品描述归纳）：问题标题即条目名（*bring or take?*、*can, could, may or might?*、*classic or classical?*）→ 正确 / 错误对照例 → 规则的可用表述 → 「truth about…」式的破误解（如 the truth about conditionals）→ 英美差异 / 正式度 / 语体注记 → 交叉引用。

#### 例句与练习系统
- 本书**无练习**（这也是个别书评给低分的理由，搜索摘要可见）。例句的职能是「判例」：成对呈现对 / 错、正式 / 口语、可接受 / 不可接受，用例句划边界，而非操练。
- 练习职能被外置到配套 Diagnostic Tests：先测出你在哪类问题上错，再回来读条目。

#### 纠错方式
- 纠错即内容本身：每条就是一次预制纠错——预测学习者会怎么错、为什么错（母语迁移是作者的明确研究兴趣）、正确形式在什么条件下成立。附「learners' most common mistakes 清单」（产品描述核到）。

#### 对中国小学生的适配
- 能降维用：「按问题切条目」的切分法、Section 头的「典型问题清单」作菜单、错例对照的判例式例句。这正对应中国孩子的高频问法（「为什么这里加 the？」「go 的过去式为什么不是 goed？」）。
- 太成人：B2–C2 的问题域（singular they、get 被动、邮件语言、礼貌与冒犯语）大半与小学生无关；条目文字密度高、无图、无练习，孩子不能直接读，只能作 App 后台的「条目蓝本」由设计者改写。

#### 可照搬点与不可搬点
- ✅ 照搬：①语法区前台按「问题」组织条目，体系退居后台与检索；②每个主题页顶部放「孩子最常问的 3–5 个问题」清单，点问进条目——即本项目已定的「面板是索引、点开独立页」原则的出处级佐证；③条目必含错例对照与「什么时候不适用」边界。
- ❌ 不可搬：字母序（作者自己已否定，App 更不应学前三版）；无练习的纯参考形态；成人问题域清单。

#### 接触等级
**实开页面**（实开 OUP 官方博客作者自述全文：卡片起源、1980 初版、字母序之弊、第 4 版 28 Section + 词汇三 Section 的改组、Diagnostic Tests 配套）。

---

### 3. Betty Azar《Understanding and Using English Grammar》

**书目核准**：Betty Schrampfer Azar（Betty S. Azar），第 4 版起与 Stacy A. Hagen 合著，Pearson（Pearson ESL / Longman 品牌），第 5 版 2016，Student Book 509 页。系列三册分级：第 3 版前言（搜索摘要核到）明列——*Basic English Grammar*（红）初级、*Fundamentals of English Grammar*（黑）中级、*Understanding and Using English Grammar*（蓝）中高级。本节以第 5 版目录（实开完整目录页）为准，第 3 版作沿革对照。

#### 组织体系
- **章 = 语法域，节 = 编号小点（章-节号如 9-4），每节一张 chart 打头。** 第 5 版 20 章骨架（实开目录逐章核到）：
  1 Present and past; simple and progressive → 2 Perfect and perfect progressive tenses → 3 Future time → **4 Review of verb tenses（专设复习章）** → 5 Subject-verb agreement → 6 Nouns → 7 Articles → 8 Pronouns → 9 Modals, Part 1 → 10 Modals, Part 2 → 11 The passive → 12 Noun clauses → 13 Adjective clauses → 14 Gerunds and infinitives, Part 1 → 15 同 Part 2 → 16 Coordinating conjunctions → 17 Adverb clauses → 18 Reduction of adverb clauses → 19 Connectives（cause/effect, contrast, condition）→ 20 Conditional sentences and wishes。
  附录 Supplementary Grammar Charts 分 Unit A 基础术语 / B Questions / C Contractions / D Negatives / E Verbs（总复习图），即「低年级内容不占正文、沉到附录速查」。
- 动词系统绝对优先：前 4 章全给动词（时态全景 + 复习），情态拆两章、动名词 / 不定式拆两章——**按学习负荷拆章，不按逻辑对称拆章**。
- 配套生态（前言 / 产品信息核到）：Workbook（自学练习，答案另给）、**Chartbook（只收全部 chart 的单行本）**、Teacher's Guide、Answer Key。第 5 版新增：每章章首 Pretest、章末 Learning Checks、Grammar Coach 视频。

#### 呈现精髓
**一句话：图表先行——先把一个点的「形 + 例 + 义/用」压进一张可贴墙的 chart 把眼睛喂饱，讲解和练习都只是这张图的展开。**

chart 的典型构成：左列形式（结构式 / 词形表）、中列例句、右列或脚注意义与使用条件（如口语缩略、正式 / 非正式差异；第 5 版 chart 明确标注 spoken vs written 差异）。Chartbook 能独立成册，证明 chart 被作者视为可脱离正文的知识本体，不是插图。

#### 例句与练习系统
- 练习梯度是全批书里最完整的：warm-up（chart 前的诱导活动，第 4 版起明确有 innovative warm-up exercises precede the grammar charts）→ 受控练习（填空 / 改错 / 造句）→ 听力（structure-based listening）→ 口语（pair / group）→ 阅读中再遇目标结构 → 章末写作（step-by-step writing + editing checklist）。
- 例句与练习尽量情景化、含生活词汇；错误在练习里以「editing（改错）」题型正式出现，章末写作配编辑清单自查。

#### 纠错方式
- 三层：①练习中的 editing 题（给出含错文本让学生改）；②写作的 editing checklist（按本章点自查）；③章首 Pretest + 章末 Learning Check 构成「先暴露不会 → 学 → 再自测」的闭环。纠错被设计成学习者自己的动作，不是教师批改。

#### 对中国小学生的适配
- 能降维用：chart 组件（一屏一图：形式条 + 例句 + 一句「什么时候用」）、章首小测导学、动词系统优先的排序直觉（小学语法主线本就以 be / 时态 / 人称为轴）、附录沉降基础术语。
- 太成人：从句系统（Ch.12–19 占全书近半）整体超小学范围；chart 文字全英、术语密；练习量巨大且纸面化。

#### 可照搬点与不可搬点
- ✅ 照搬：①每个语法点的第一屏必须是一张 chart，不是文字段落——形式、例句、使用条件三栏同屏；②所有 chart 另行汇成「图册」速查区（对应 App 的规律总览 / 复习地图）；③章首 3 题小测决定从哪节进；④大点拆两段（Part 1 只求会用，Part 2 再讲细），拒绝一次讲全。
- ❌ 不可搬：20 章纲目本身（从句权重）；全英 chart；把复习设为独立章（App 应做成混合复现，而非复习章）。

#### 接触等级
**实开页面**（实开第 5 版完整目录页：20 章 + 附录 A–E 逐节核到，并核到第 5 版新增 Pretest / chart 更新说明；第 3 版 20 章旧序与三册分级由搜索摘要交叉核对）。

---

### 4. Marianne Celce-Murcia & Diane Larsen-Freeman《The Grammar Book》

**书目核准**：*The Grammar Book: Form, Meaning, and Use for English Language Teachers*，Marianne Celce-Murcia & Diane Larsen-Freeman。第 2 版 1999，Heinle & Heinle；第 3 版 2015，Cengage ELT（Heinle / Cengage），软精装 864 页，ISBN 9781305101791（实开书目页核到）。读者是教师与未来教师，不是学习者本人。

#### 组织体系
- **全书 36 章，每章一个结构域，但每章内部一律用同一把三维尺子量：form / meaning / use。** 第 3 版目录（实开核到全 36 章）：
  1 Introduction → 2 Grammatical Terminology → 3 Lexicogrammar → 4 Copular Verbs and Subject-Verb Agreement → 5 Word Order and Phrase Structure (Subject) → 6 More Phrase Structure (Predicate) → 7 The Tense-Aspect System → 8 Modal Auxiliaries → 9 The Tense-Aspect-Modality System **in Discourse** → 10 Negation → 11 Yes/No Questions → 12 Imperatives → 13 Wh-Questions → 14 Tag / Alternative / Exclamatory / Rhetorical Questions → 15 Articles → 16 Reference and Possession → 17 Partitives, Collectives, Quantifiers → 18 Passive Voice → 19 Indirect Objects → 20 Adjectives → 21 Prepositions → 22 Phrasal Verbs → 23 Nonreferential *It* / Existential *There* → 24 Conjunction → 25 Adverbials → 26 Logical Connectors → 27 Conditionals → 28–29 Relative Clauses → 30 Focus and Emphasis → 31–32 Complementation → 33 Reported Speech and Writing → 34–35 Degree（Comparatives / Superlatives）→ 36 Conclusion。书后 Suggested Answers to Chapter Exercises + 四种索引。
- 另有**三层语言观**（据其导论的二手转述，搜索摘要核到）：subsentential 层（词 / 形态）→ sentential 层（句 / 句法）→ suprasentential 层（篇 / 语篇）。第 9 章专讲时-体-情态在语篇中的运作，是「句法必须升到语篇复核」的结构性体现。

#### 呈现精髓（三维框架原典表述，务必引原话口径）
**一句话：任何语法结构都有三面——怎么拼（form）、是什么意思（meaning）、什么时候 / 为什么用它而不用别的（use）；只教对第一面不算教会。**

- 原典引文（经学术文章转引核到）：Larsen-Freeman (2003, p.252)——"grammar structures not only have (morphosyntactic) **form**, [but] they are also used to express **meaning** (semantics) in context-appropriate **use** (pragmatics)"。
- Celce-Murcia & Larsen-Freeman (1999, p.5，转引核到)：学生须能 "use grammar structures **accurately, meaningfully and appropriately**" 才能成功交际——三维与三副词一一对应：form→accurately，meaning→meaningfully，use→appropriately。
- 配套主张（导论转述核到）：给 **reasons 而非 rules**（语言是有机的、规则不是密不透风的公式）；语法是技能而非知识——Larsen-Freeman 另造词 **grammaring**（见 §6 与其 2003 专著），《The Grammar Book》是这一立场的教师版展开。
- 每章的落点是教学：分析完三维后给 teaching suggestions，并指出该结构的学习者难点（本节据第 2 版体例与书目描述归纳，章节内页未逐章实开，标为**体例层面待核**）。

#### 例句与练习系统
- 例句服务于「对比出义」：同一形式换语境、同一意义换形式，用最小对立让 meaning / use 两维显形（如被动语态研究转引：form = be/get + 过去分词 (+by 短语)；meaning = 承受者被推到主语位；use = 何时优先被动而非主动）。
- 练习是给**教师**的章末 exercises（分析题），答案在书后；不是给学生的操练册。

#### 纠错方式
- 无独立纠错章（据目录）；其纠错观内嵌于框架：一个错误先定位是哪一维塌了——形错（accuracy）、义错（meaningfulness）、场合错（appropriateness）——三类错的修法不同。这一点是框架的直接推论，本稿标为推论而非原书目录事实。

#### 对中国小学生的适配
- 能降维用：三维是**后台数据模型**的最佳候选——App 每条语法规律强制三栏：①长什么样 ②表示什么 ③什么场景用它（+什么时候不用）。孩子看到的是第 ③ 栏的场景选择题，教师 / 家长层看全三栏。这与本项目既有的「mechanism + boundary」要求同构：use 维天然承载边界。
- 太成人：36 章内容（complementation、logical connectors 等）与全部学术表述；lexicogrammar、phrase structure rules 等元语言绝不能下放到儿童层。

#### 可照搬点与不可搬点
- ✅ 照搬：三维字段作为语法条目的**必填结构**（缺 use 维不许上线）；「给理由不给规则」作为讲解文案准则；篇章复核意识（一个点最后要回到小短文 / 对话里认一次）。
- ❌ 不可搬：章节纲目、术语、教师练习形态；三维**同时同量**呈现给孩子（原书亦不主张一课塞满三维，转引核到 "not suggested…all in one lesson"）——儿童层应分次露面。

#### 接触等级
**实开页面**（实开第 3 版完整目录书目页：36 章 + 出版信息；三维原典引文由学术转引页搜索摘要核到，页码 p.5 / p.252 为转引所标）。

---

### 5. Martin Parrott《Grammar for English Language Teachers》

**书目核准**：Martin Parrott，Cambridge University Press。初版 2000；第 2 版 2010，精装 ISBN 978-0-521-88505-8 / 平装 978-0-521-71204-0（实开 Cambridge frontmatter 核到）。读者：在职与受训教师。

#### 组织体系
- **五大部分、由小到大爬坡（第 2 版 frontmatter 实开核到全目）**：
  - Part A Words（Ch.1–9）：Nouns → Articles → Quantifiers → Adjectives → Adverbs → Comparatives and superlatives → Prepositions → Verbs (introduction) → Combining words
  - Part B More about verbs and related forms（Ch.10–19）：Multiword verbs → Modal verbs → Infinitive and -ing forms → The present → The future → The past → The present perfect → *used to* and *would* → Reported and direct speech → Conditional sentences
  - Part C Sentence constituents and word order（Ch.20–24）：Sentence constituents: basic principles / major variants → Passive constructions → Discourse markers → Ellipsis and substitution
  - Part D Complex sentences（Ch.25–30）：Finite adverbial clauses → Noun clauses → Relative clauses → Non-finite clauses → Defining and non-defining → Integrating the elements
  - Part E Researching language：Research activities + 音标表 + 索引。
- 注意：第 1 版书目页（搜索摘要）的分部编号与第 2 版有出入（多出 Extension exercises / Pronunciation 等部），引用时须标版次，本稿以第 2 版 frontmatter 为准。
- 章内体例的招牌（出版社简介，搜索摘要核到）：每章含 **'typical difficulties' 专节**——专讲学习者在此点的典型问题与错误，并给出克服办法；另有 consolidation exercises 及答案键（第 1 版副题即 *With Exercises and a Key*）。

#### 呈现精髓
**一句话：不从「规则是什么」写起，从「老师在课堂上会被问住 / 学生会在这里栽」写起——困惑即目录的隐形组织者。**

它与 Swan 的区别：Swan 按学习者的问题切条目给学习者查；Parrott 按教师备课的困惑切章给老师查，并往前一步，要求教师用 Part E 的语料检索活动自己验证规则（规则可被查证、会被语料推翻）。

#### 例句与练习系统
- 例句大量取真实语料（frontmatter 致谢清单实开可见：报刊、小说、广播、教材等出处逐条列明），以真句而非编造句立规。
- 练习是给教师的 consolidation exercises：做完不是练熟结构，而是检验自己是否真懂、能否解释；Part E 的 research activities 教教师查语料、查参考书的方法。

#### 纠错方式
- 'typical difficulties' 即预制纠错库：先归类错误成因（母语迁移 / 过度概括 / 规则本身有例外），再给课堂处理建议。其立场是错误先要被**解释**，才谈得上被纠正。

#### 对中国小学生的适配
- 能降维用：作为**成人层（教师 / 家长角）的蓝本**几乎可直接用——App 每个语法页的成人小字区可按「孩子在这里最容易怎么错 + 为什么 + 在家怎么帮」三段照此体例写；Part A→D 的爬坡序（词 → 动词系统 → 句子骨架 → 复杂句）也可作后台覆盖检查表。
- 太成人：全部内容与文字；research activities 对小学生无意义。

#### 可照搬点与不可搬点
- ✅ 照搬：①每条规律强制附 'typical difficulties' 字段（典型错例 + 成因 + 一句修法）——与本项目病例系统直接对接；②例句优先真语料 / 教材真句、注明出处的做法；③A→D 爬坡作完整性审计的骨架。
- ❌ 不可搬：章节顺序作儿童学习顺序（它是教师查阅序）；让孩子做「研究语言」式活动。

#### 接触等级
**实开页面**（实开 Cambridge 官方 frontmatter PDF：第 2 版版权、ISBN、Part A–E 全目；'typical difficulties' 体例由出版社简介摘要核到）。

---

### 6. Scott Thornbury《How to Teach Grammar》

**书目核准**：Scott Thornbury，Pearson Education（Longman），*How to Teach…* 系列（系列主编 Jeremy Harmer），初版 1999（实开版权页核到）。读者：英语教师（培训中 / 新手 / 有经验者均可）。

#### 组织体系
- **它不组织语法知识，它组织教学决策。** 全书 10 章（实开目录核到）：
  1 What is grammar?（texts / sentences / words / sounds 四层；grammar and meaning；spoken vs written grammar；syllabuses；rules）
  2 Why teach grammar?（正反两案 + **basic principles for grammar teaching**——后文每个样例课都回此章标准接受评议）
  3 How to teach grammar **from rules**（演绎法，4 个样例课）
  4 How to teach grammar **from examples**（归纳法，5 个样例课）
  5 How to teach grammar **through texts**（5 个样例课，含 dictogloss、genre analysis）
  6 How to practise grammar（practice / **accuracy / fluency / restructuring**，6 个样例课）
  7 How to deal with grammar errors（errors 观、responding to errors、reformulation 样例课）
  8 How to integrate grammar（**PPP model vs alternative (task-based) model** 对照 + skills-based / story-based 样例课，含一课 for very young learners）
  9 How to test grammar（discrete-item vs oral performance 两种样例测）
  10 How NOT to teach grammar（反面样例 + caveats）
  书后 Task File + Key + Further reading。
- 体例：每章 = 原理短论 + 若干**完整样例课**（sample lessons，写到步骤）+ 对样例的讨论与按第 2 章标准做的评价 + Conclusions / Looking ahead。样例课是论证单位，不是装饰。

#### 呈现精髓
**一句话：没有唯一正确教法——把每个教法做成一节可照演的样例课，再当场用同一套标准评它，读者学到的是「选法」而不是「一法」。**

- 演绎法一章给出的有效规则呈现标准（实开正文核到）：规则呈现须 **illustrated by examples、short、check understanding、give learners an opportunity to personalise the rule**；并指出让学生互相讲 / 互测规则可能与教师讲解同样有效。
- 归纳一侧的核心词是 consciousness-raising（意识提升）：活动让学习者注意到形式、形成理解，但**不必然要求当场产出**——与「呈现后立即准确产出」的旧 presentation 明确切割（实开正文核到此辨析）。

#### 例句与练习系统
- 练习理论集中在第 6 章三分：为 **accuracy** 的练习、为 **fluency** 的练习、以及促 **restructuring**（学习者内在语法系统重组）的练习——练习的分类不按题型，按它在系统里干什么活。样例含 oral drills、information gap、personalisation、grammar interpretation activity 等。

#### 纠错方式（第 7 章，单列成章是其态度）
- 先问「what are errors、attitudes to error and correction」，再谈 responding：样例课示范两条路线——①拿学习者自己的错误作复习材料（cohesive devices 一课）；②**reformulation**（把学习者的文本用正确自然的形式重述，让其对比发现差距，而非逐处打叉）。（更细的 recast / elicitation 分类未在本次实开页内核到，不扩写。）

#### 对中国小学生的适配
- 能降维用：这是全批里对「App 流程设计」最直接的一本——App 没有教师，它的呈现 / 练习 / 纠错流程必须由产品承担：①每个点提供「先例子后规律」的归纳路径（孩子先看成组场景、点出相同处，规律最后揭晓）；②练习按 accuracy → fluency → restructuring 分层出题；③纠错用 reformulation（把孩子的错句与正确句并排、差异高亮、让他自己说出差在哪），不用红叉 + 规则复读；④第 8 章 story-based 样例证明其框架可下探到 very young learners。
- 太成人：全部讨论文字；PPP / task-based 的课堂组织（小组、信息差需真人互动）App 只能模拟其神、不能搬其形。**注意纠正一个常见误植：E-R-A（Engage–Study–Activate）是 Jeremy Harmer 的框架，不是 Thornbury 本书的框架；本书对照的是 PPP 与 task-based 两种整合模型，不要把 E-R-A 记到 Thornbury 名下。**

#### 可照搬点与不可搬点
- ✅ 照搬：样例课体例→App 的「示范流程」评审法（每个语法单元上线前按同一套标准过一遍：例子够不够、规律短不短、有没有检查理解、有没有 personalise 到孩子自己的生活）；练习三层分类；reformulation 纠错形态。
- ❌ 不可搬：课堂管理层面的全部安排；「教不教语法」的成人辩论本身（但其结论——规则要短、要配例、要查理解——要搬）。

#### 接触等级
**实开页面**（实开 AnyFlip 全书前 50 页：版权、10 章全目、第 1 章正文、演绎呈现标准、consciousness-raising 辨析原文）。

---

### 7. Huddleston & Pullum《The Cambridge Grammar of the English Language》与学生版《A Student's Introduction to English Grammar》

**书目核准**：
- *The Cambridge Grammar of the English Language*（CGEL），Rodney Huddleston & Geoffrey K. Pullum 等，Cambridge University Press，2002；获 Linguistic Society of America 2004 年 Leonard Bloomfield Book Award（书目页摘要核到）。巨型描写参考语法，本稿只登记其地位，不展开内目（未核到其完整目录，见缺口总账）。
- *A Student's Introduction to English Grammar*：第 1 版 2005，Huddleston & Pullum；**第 2 版 2022，Huddleston, Pullum & Brett Reynolds**，Cambridge University Press，精装 ISBN 978-1-316-51464-1 / 平装 978-1-009-08801-5（实开 frontmatter 核到）。本科入门教材，CGEL 的教学缩写本。

#### 组织体系（第 2 版，frontmatter 实开逐章核到）
1 Introduction（the English language；**describing and advising**；structure of sentences；**investigation and disconfirmation**）→ 2 Overview of the book（一章速览全书 16 个主题）→ 3 Verbs and verb phrases（inflection；auxiliaries；perfective / imperfective；**primary tense: present and preterite**；**secondary tense: the perfect**；progressive；modality）→ 4 Complements in clauses（subject / object / predicative complements）→ 5 Nouns and determinatives（number and countability；**determiners and determinatives 之辨**；pronouns；genitive）→ 6 Adjectives and adverbs → 7 Prepositions and particles（**扩大介词范畴**、preposition stranding 等）→ 8 Adjuncts: modifiers and supplements → 9 Negation → 10 Clause type（speech acts；interrogatives；exclamatives；imperatives）→ 11 Subordinate clauses → 12 Relative constructions → 13 Comparatives and superlatives → 14 Non-finite clauses → 15 Coordinations → 16 Information structure（passive、extraposition、existential、it-cleft、pseudo-cleft、dislocation 同归此章——即「信息包装」）。
- 第 1 版目录略有不同（Ch.2 题 *A rapid overview*、末章为 Morphology: words and lexemes），引用须分版。
- 每章末 Exercises on Chapter N；风格为「会话体、低术语」（frontmatter 简介自述：rewritten in an easy-to-read conversational style with a minimum of technical terminology）。

#### 呈现精髓
**一句话：先教「怎么判定一个说法对不对」，再给体系——语法是可证伪的调查，不是背诵的教条。**

- 两个招牌动作：①**descriptive 而非 prescriptive**：第 1 章先分清 describing 与 advising；书中设**专门高亮的 notes**，逐条指出旧传统语法的错误、驳斥规范手册的过度规定（frontmatter 简介原文自述：Errors of the older tradition…are noted and corrected，prescriptive excesses are "firmly rebutted in specially highlighted notes"）。②**术语重铸即观点**：英语只有两个 primary tense（present / preterite，不承认独立 future tense，将来靠情态与安排表达）；perfect 是 secondary tense；determiner 是功能、determinative 是词类——这些命名直接改写了 Murphy / 中国教材的常用讲法，App 立纲时必须知其存在、并明确自家口径取舍，不能混用两套。
- 调查法：给出一个判断 → 找反例 disconfirm → 修订判断。第 1 章把 investigation and disconfirmation 立为方法章。

#### 例句与练习系统
- 例句的职能是**证据**：大量成对的「可接受 / 不可接受 / 边缘」句，用以测试一条概括是否成立。
- 章末练习是分析题（判断、归类、找反例；如第 1 章 word order 题、第 5 章 determiners 题，据教师解答手册摘要），不是产出操练。无情景练习、无梯度。

#### 纠错方式
- 它纠的是**语法书的错**，不是学生的错：高亮 notes 专纠「老师 / 旧书说的 incorrect 其实站不住」。对 App 的意味：凡写「××是错的」，须先过此书一关——许多小学教材的绝对化说法（如某些 split infinitive、句末介词之忌）在 CGEL 体系里不成立。

#### 对中国小学生的适配
- 能降维用：只有两样，但都很硬——①**判据意识**：每条规律要能说出「怎么知道的、反例是什么」，对应本项目「规律须带边界 / 例外」的数据纪律；②**口径裁决参考**：时态命名（两时）、将来表达、限定词等争议点，成人层以此书为仲裁之一。
- 太成人：其余全部。16 章纲目、complements / adjuncts / information structure 等概念、分析型练习，与小学生无关；会话体也是给本科生的会话体。

#### 可照搬点与不可搬点
- ✅ 照搬：高亮 note 的形态→App 的「别被旧说法骗」小卡（只挑与小学点相关的，如句末介词不可怕之类，须逐条核）；disconfirmation 自查流程→规律入库前的反例测试。
- ❌ 不可搬：纲目、术语体系的整套替换（儿童层仍用通行术语 present / past 等，仅在成人层注记 CGEL 口径）；分析练习。

#### 接触等级
**实开页面**（实开第 2 版 Cambridge 官方 frontmatter：版权、ISBN、Ch.1–16 逐节全目、编写自述；CGEL 本体仅书目信息）。

---

### 8. 中国权威三家

#### 8a. 章振邦《新编英语语法教程》（上海外语教育出版社）

**书目核准**：章振邦主编（编者含张月祥），上海外语教育出版社。1980 年代初问世（出版社第 5 版简介语），第 5 版为「十二五」规划教材、除导论外 **40 讲**；第 6 版学生用书 2017-09（豆瓣书目摘要）；第 7 版已见于大学 MOOC 课程用书（**第 7 版年份待核**）。英语专业本科语法课主流教材。

##### 组织体系
- **层次先行、句法主干。** 第 6 版学生用书目录（搜索摘要核到前段）：第 1 讲 语法层次（词素 → 词 → 词组 → 分句 → 句子五级；自由 / 粘附词素；封闭 / 开放词类）→ 第 2 讲 分句结构和基本句型 → … → 名词和名词词组 → 限定词（一）（二）→ 动词和动词词组 → 时与体…
- 40 讲全序（据第 5 版教师用书目录摘要，讲次与学生版 6 版编排有出入，并列登记）：Sentence structure → Subject-verb concord (I)(II) → Noun and noun phrase → Genitive → Determiners (I)(II)–Articles → Pronouns (I)(II) → Verb and verb phrase → Tense and aspect (I)(II) → Means of expressing future time → Passive voice (I)(II) → Subjunctive mood → Auxiliaries (I)(II) → Infinitive (I)(II) → -ing participle → -ed participle → Adjective phrase → Adverb phrase → Comparison → Preposition → Statement / question / command / exclamation → Existential sentence → It-patterns → Coordination → Subordination (I)(II) → Relative clause → Conditional sentence → Direct and indirect speech → Modification → Substitution → Ellipsis → Postponement, fronting and inversion → **From sentence to text**。
- 体系创新（出版社简介 + 新闻综述，搜索摘要核到）：贯彻**层次分析法**；「以句法为主干，以句法带词法，由词法再到句法，再由句法到**章法**」——一般语法书只有词法 + 句法两段，此书第三段讲连句成篇；引进「**两时两体**」的动词体系；将来不立「将来时」，立「将来时间的表示法」专讲；简化虚拟式；**确立限定词为独立词类**（与 §7 CGEL 的 determinative 之辨遥相呼应，是中国教学语法里最早的一支）；注意语法结构与词汇意义、语法与语篇的联系；由规定语法转向描写语法（综述语）。

##### 呈现精髓
**一句话：先给整座楼的楼层图（五层次 + 基本句型），再逐层装修——体系感先于一切细节。**

每讲侧重几个要点，**每个要点之后紧跟练习**（出版社简介原文），边讲边练；练习形式随内容而变、力求启发性与语篇结合，避免机械操练（同简介）。

##### 例句与练习系统 / 纠错方式
- 练习量大且嵌在讲中（非章末集中），含语篇型练习；教师用书含英文讲授提纲与练习参考答案（目录摘要核到）。
- 纠错无专论；其「纠错」体现在概念厘清本身——如主谓一致分两讲、限定词与三类名词的搭配关系先行，把易错点拆细讲透（据目录结构归纳）。

##### 对中国小学生的适配 / 可照搬与不可搬
- ✅ 可搬：①五层次的儿童版——「词 → 小队（词组）→ 一句话 → 一段话」的楼层图可作语法区总地图的骨架；②「将来时间的表示法」口径（不说将来时、说『表示将来的几种办法』）比 16 时态表更适合小学，且与 CGEL 口径暗合；③基本句型先行（先认句子骨架，再往骨架上挂词法）；④要点后即练的节奏。
- ❌ 不可搬：40 讲纲目与深度（从属、替代、省略、移位等讲次）；学术表述；英汉主谓比较等专业内容（其比较意识可留成人层）。

##### 接触等级
**仅搜索摘要**（第 6 版目录前段、第 5 版教师用书 40 讲全序、出版社体系自述均来自搜索结果摘要；另实开一份课后答案页，仅佐证其练习规模，未据其写目录）。

#### 8b. 薄冰《高级英语语法》（商务印书馆等）

**书目核准**：薄冰著 / 主编。受教育部委托编写（商务印书馆 2018 年修订版简介语）；初版年份两说——商务简介作「1990 年初次出版」、二手论述作「1989 年首版」，标**待核**。商务印书馆 2018 修订版 796 页。定位：高校英语专业语法课教材兼学习者参考书。

##### 组织体系
- **基本采用传统英语语法体系**（商务简介原文），适当介绍现代新成果。已核到的目录片段（2002 年世界知识出版社版目录，搜索摘要）：
  第一章 绪论 → 第二章 名词（一、概说 二、名词的数 三、名词的格）→ 第三章 冠词（定冠词 / 不定冠词 / 零冠词）→ 第四章 代词（人称 / 物主 / 自身 / 相互 / 指示 / 疑问 / 关系 / 不定，共九类）→ 第五章 数词 → 第六章 动词概说 → 第七章 动词的时态（现在一般时起逐时展开）→ …（后续章节本次未完整核到，见缺口总账；同系《英语语法手册》的章节序——动词概说 → 时态 → 语态 → … → 句子概说 → 句子成分——可作结构旁证，但不冒充本书目录。）
- 即典型的**词法逐类在前、句法在后**排法：词类逐个讲透（每类内再「概说 → 分项 → 细目」三级展开），动词系统（时态 / 语态 / 语气）居中枢，句子成分与句型殿后。
- 深度标志（二手论述核到）：名词可数性一节用 17 页展开，自创「单念 / 复念 / 零念」之分（另一二手作「单读 / 多读 / 零读」，译词未一，标**待核**）；另有《英语时态》《英语名词的数》《英语冠词》等单行本——薄冰的风格是**一个点挖到底**。

##### 呈现精髓
**一句话：全、细、例句多——一个语法点不讲到穷尽其小类与例外不收笔，心得与新见解夹注其间。**

中文讲解、概念严谨、例证丰富（商务简介原文：「收集语法现象全面，讲解详实，配有丰富例证」）。

##### 例句与练习系统 / 纠错方式
- 例句是其权威来源：以丰富例证支撑每个细目。本次核查**未见本书设练习系统的证据**（商务简介只言例证、未言练习），定位应按纯参考书理解，此点标为「未见」而非断言无练习。
- 纠错方式：无专门机制；靠细目化本身防错——把可数性、时态从属等繁杂处对照讲清（其《大学英语语法》自述对易混时态作比较性分析，此法在高级版中的具体分布**待核**，不移用）。

##### 对中国小学生的适配 / 可照搬与不可搬
- ✅ 可搬：①「一个点挖到底」的**成人层深度储备**：App 每条小学规律背后的例外与细目，可查此书作中文权威源之一；②对照比较的讲法（时态两两比、可数 / 不可数比）可降维成儿童版「双句对照卡」；③中文术语与讲法口径（中国孩子与家长最熟悉的一套话）。
- ❌ 不可搬：词类逐类顺序作学习顺序（孩子会先淹死在名词章）；17 页式细目；无练习、无场景的纯讲授形态。

##### 接触等级
**仅搜索摘要**（商务印书馆内容简介与 2002 版目录片段来自搜索摘要；本次实开的两个页面分别为《薄冰实用英语语法详解》与《魔法英语语法（初中版）》，系薄冰其他著作，未据其冒充本书内容，仅在上文作同系旁证并已注明）。

#### 8c. 张道真《实用英语语法》（外语教学与研究出版社）

**书目核准**：张道真著。初版 1958（多家二手论述一致，标为二手核到）；外语教学与研究出版社 1995 年版为流传最广的引用版（多篇文献著录核到）；后有《张道真英语语法》《张道真英语语法大全》（世界图书出版公司，2019）等衍生版，**版本谱系待核**。本节目录据《张道真英语语法》京东目录页摘要，25 章。

##### 组织体系
- **以动词为纲，语法与词汇糅合**（外研社系简介原文：「将语法和词汇糅为一体，并融入语法学习以动词为纲的新理念」「内容丰富实用，简明易懂，检索方便」）。
- 25 章骨架（目录摘要逐章核到）：第一章 概论（词类 / 句子 / 单词·短语·从句 / 简单句·并列句·复合句）→ 第二章 动词概说 → 第三章 时态 → 第四章 被动语态 → 第五章 虚拟语气 → 第六章 助动词和情态动词 → 第七章 非谓语动词 → **第八章 动词句型（专章）** → 第九章 名词和冠词 → 第十章 代词 → 第十一章 数词和量词 → 第十二章 形容词 → 第十三章 副词 → 第十四章 介词 → 第十五章 连词和感叹词 → 第十六至二十章 句子成分分论（主语 / 谓语 / 宾语 / 定语 / 状语各一章）→ 第二十一章 语序 → 第二十二章 省略句 → 第二十三章 句型的转换 → 第二十四章 构词法 → 第二十五章 标点符号。附录：语法术语表 + 不规则动词表。
- 章内用**连续编号的小条目**（目录中每节下以 (1)(2)(3)… 编号，如「词类(1)、词尾(2)、一个词可以用于不同词类(3)」）——介于体系与条目之间：外有体系序，内可按号检索。

##### 呈现精髓
**一句话：同样的传统体系，张道真赢在「安排与表述」——把动词提到全书之纲，先啃最能带全盘的那一块。**

二手对比论述的共识（知乎长文等，标为二手评价）：薄冰侧重理论创新（研究者爱引），张道真侧重教学实用（普通学习者爱用），差别不在材料有无，在**现有内容的合理安排与恰当表述**。例句多摘自英美原版书籍资料（外研社简介语）。

##### 例句与练习系统 / 纠错方式
- 例句鲜活、与词汇用法交织（讲语法点时连带讲常用词的用法）。
- 本次核查未见独立练习系统 / 纠错专章的证据，按「讲解型参考书」登记（同薄冰条，标未见不臆断）。

##### 对中国小学生的适配 / 可照搬与不可搬
- ✅ 可搬：①**动词为纲的排序**——小学语法的主轴本就是动词（be → 一般现在 → 过去 → 将来表达），张序比薄序（名词开篇）更贴孩子；②动词句型专章意识→App 的「句型骨架」玩法（一个动词带出一串可换词的句子槽）；③编号小条目 = 天然的 App 条目 ID 雏形（条目可检索、可被引用、可被点名纠错）；④简明中文表述的口径样本。
- ❌ 不可搬：虚拟语气等章的深度；成分分论五章的分析式讲法；以成人阅读例句为载体。

##### 接触等级
**仅搜索摘要**（25 章目录与编号体例来自京东目录页摘要；「以动词为纲」等编写自述来自出版社简介摘要；张 / 薄对比为二手评价，已标注）。

---

### 9. 可选加查（两本，降级简述）

#### 9a. Quirk, Greenbaum, Leech & Svartvik《A Comprehensive Grammar of the English Language》（通称 Quirk 绿色大语法）
- **书目**：Longman，1985，1,779 页，索引由 David Crystal 编（Open Library 书目摘要核到）。其缩写本 *A Student's Grammar of the English Language*（Greenbaum & Quirk，Longman，1990）结构同构。
- **纲目（19 章，搜索摘要核到）**：1 The English language → 2 A survey of English grammar → 3 Verbs and auxiliaries → 4 The semantics of the verb phrase → 5 Nouns and determiners → 6 Pronouns and numerals → 7 Adjectives and adverbs → 8 The semantics and grammar of adverbials → 9 Prepositions and prepositional phrases → 10 The simple sentence → 11 Sentence types and discourse functions → 12 Pro-forms and ellipsis → 13 Coordination → 14 The complex sentence → 15 Syntactic and semantic functions of subordinate clauses → 16 Complementation → 17 The noun phrase → 18 Theme, focus, and information processing → **19 From sentence to text**；附录：word-formation / stress, rhythm and intonation / punctuation。
- **价值点**：基于 Survey of English Usage 语料的描写传统（Pearson 简介摘要：authentic examples、语篇特征贯穿全书）；章振邦的「章法」与 Celce-Murcia 的语篇层、CGEL 的 information structure，都能在此找到共同祖先。对 App 只作**成人层仲裁源**登记，不展开。
- **接触等级：仅搜索摘要。**

#### 9b. Michael Lewis《The Lexical Approach》(1993) 等——与语法组织的关系
- Lewis 不是语法书作者，其主张（经学术二手核到原话）：**"Language consists of grammaticalised lexis, not lexicalised grammar"**（Lewis 1993, p.36，转引）。词汇项分类（二手转引）：words / polywords / collocations / institutionalised utterances / sentence frames and heads / text frames。
- 与语法组织**有关但只是一味佐料**：它提示 App 语法区不要只收「规则条」，还要收「句框条」（如 *Would you like…?*、*I'm going to…* 这类半固定框架整体入库、先会用后拆解）——这与本项目既有的 chunks / constructions 结论同向。按任务许可，本条从略，不单列适配分析。
- **接触等级：仅搜索摘要（二手转引）。**《朗文当代英语语法》（L. G. Alexander 系 / Longman 系当代语法）本次未查，记入缺口总账。

---

### 10. 横向对照：五种「切分单位」与 App 的取舍

| 书 | 切分单位 | 检索靠什么 | 练习在哪 | App 应取 |
|---|---|---|---|---|
| Murphy | 单元（1 点 / 对开页） | 目录 + Study Guide 诊断 | 右页 + 书后综合 | 页面模板 + 诊断导流 |
| Swan | 条目（1 问 / 条） | 主题 Section + 索引（旧版字母序已被作者否定） | 无（外置诊断测） | 问题切分 + Section 头问题清单 |
| Azar | 节（1 chart / 节） | 章-节号 | 节后梯度 + Workbook | chart 组件 + 图册速查 |
| Parrott | 章（1 困惑域 / 章） | 教师查阅序 A→D | 章内 consolidation（给教师） | typical difficulties 字段 |
| Thornbury | 样例课（1 教法 / 课） | 决策序（规则 / 例 / 文本 / 练 / 纠 / 合） | 第 6 章三层论 | 流程标准 + reformulation 纠错 |
| Celce-Murcia & L-F | 章（1 结构 / 章）× 三维 | 结构序 | 章末（给教师） | 三维必填字段（后台） |
| Huddleston & Pullum | 章（1 体系块 / 章） | 体系序 + 总览章 | 章末分析题 | 判据 / 口径仲裁（成人层） |
| 章振邦 | 讲（几要点 / 讲） | 层次 + 句型序 | 要点后即练 | 楼层图总地图 + 将来表达口径 |
| 薄冰 | 章-细目（1 类 / 章） | 词类序 | 未见练习系统 | 成人层深度储备（中文） |
| 张道真 | 编号小条目 | 体系序 + 条号 | 未见练习系统 | 动词为纲排序 + 条目 ID 化 |

---

### 缺口总账（如实登记，未查到 / 未打开 / 有冲突）

1. **Murphy 中级版第 5 版官方页未直开**：Cambridge 官网产品页本次未打开；145 单元、第 5 版年份与 ISBN 据版权页摘要 + 书评交叉核对，16 范畴骨架主要据第 3/4 版目录摘要——第 5 版逐单元目录未逐行核。
2. **Murphy 红色版未实开正文**：115 单元与体例据第 4 版 frontmatter 搜索摘要；其逐范畴目录未核。
3. **Swan 年份冲突**：第 4 版 2016（版权）/ 2017（发行）两说未消解；Part 2 词条数 250+（出版社）与近 380（作者博客）口径冲突，未消解。PEU 条目内页（单条写法细节）未实开原书页，条目写法系据作者自述 + 产品描述归纳。
4. **Azar chart 内页未实开**：chart 三栏构成据系列体例与产品描述归纳，未打开某一节的 chart 原页逐栏核对；第 5 版与第 3 版章序差异已注明，勿混引。
5. **《The Grammar Book》章内体例待核**：每章「三维分析 → 教学建议 → 教师练习」的细部体例未逐章实开内页，据第 2 版体例与书目描述归纳；三维引文为学术转引，非原书直引。
6. **Thornbury 第 7 章细目未全开**：实开止于前 50 页与全目；reformulation 样例据目录标题，具体步骤未读原文。E-R-A 误植警告为本稿考辨，非原书内容。
7. **CGEL 本体未查**：只核到学生版；CGEL 自身 21 章级目录未核，如需引用 CGEL 原纲须另查。
8. **章振邦版本编排差异**：第 5 版教师书 40 讲序与第 6 版学生书讲序不完全一致，本稿并列登记；第 7 版年份未核；「两时两体」的具体所指未打开正文核对，只登记出版社原话，未作展开解释。
9. **薄冰《高级英语语法》全目未核到**：仅得绪论至动词时态的目录片段（2002 版）；商务 2018 版全目未打开；初版年 1989 / 1990 两说未消解；「单念 / 复念 / 零念」与「单读 / 多读 / 零读」译词两说未消解；本书有无练习未见证据，未断言。
10. **张道真版本谱系未清**：1958 初版据二手；1995 外研版、2019 世界图书《大全》与本稿 25 章目录（《张道真英语语法》京东页）之间的对应关系未逐版核对。
11. **Quirk 仅摘要**：19 章纲目据 Open Library / Pearson 摘要，未开原书；《朗文当代英语语法》**未查**（任务为可选，本次无余力），如需另立一条。
12. **Lewis 仅二手转引**：原话页码 p.36 据学术论文转引，未开原书。
13. **全批共同缺口**：除 Thornbury 与 Parrott 外，各书的「纠错」多为本稿据其体例的归纳（已在各节标注哪些是原书事实、哪些是推论）；各书例句系统的定量特征（如例句来源比例）均未做抽样统计，不宜在后续设计稿中引用具体比例。

---

*本稿所有「可照搬」均为组织与体例层面的借鉴；各书的例句、练习题与讲解文字受版权保护，App 须自创内容，不得抄录原文。*


---

## 第三章 · 语法网站与专栏：条目组织与呈现

> 任务：为中国小学生英语规律 App 的语法区设计提供可借鉴/照搬的来源。调研日期：2026-11-02（JST）。
> 方法：逐站检索后用页面抓取打开真实页面（首页/索引页 + 语法条目页 + 练习/测验页，能开几页开几页）。打不开、只能看到镜像或二手转述的，如实标在每节「接触等级」与文末「缺口总账」，不凭印象补页面结构。
> 阅读说明：每节固定六栏——**组织体系 / 一个语法点的页面解剖 / 呈现精髓（一句话）/ 对中国小学生的适配 / 可照搬点与不可搬点 / 接触等级**。

---

### 总览速读（11 站一句话定位）

| # | 站点 | 组织骨架 | 单点页核心部件 | 对小学语法区的主要价值 |
|---|---|---|---|---|
| 1 | BBC Learning English | 课程 Unit 制 + 节目制（6 Minute Grammar / Grammar Gameshow）双轨 | Meaning and use → Form → Take note → Spoken English | 「先义后形」参考页骨架；游戏秀式测验包装 |
| 2 | British Council LearnEnglish（Kids / 成人分站） | 成人：CEFR 分级课 + 按词类编的 Reference 双系统；Kids：按活动类型（chant/game/story）不按语法点 | 成人课：Test→Teach→Test；Kids chant：听 chant→找语法→游戏+打印活动 | 唯一真正为儿童设计的语法呈现：语法藏进 chant，不讲规则 |
| 3 | Perfect English Grammar | 一语法点一页，Make（造形）与 Use（用法）拆成两页 | 视频/文字二选一→全人称表格→每小节挂 1–2 个专项练习→PDF | 「单页讲透」的表格密度与练习即时挂接 |
| 4 | Grammar Girl | 无体系，问题驱动的播客/博客单篇 | 听众提问钩子→规则→例句→记忆术（Squiggly/Aardvark 固定角色）→例外 | 记忆术与固定吉祥物角色讲易混点 |
| 5 | Purdue OWL | 参考手册式分级目录（Grammar / Punctuation / Mechanics…） | 编号规则清单，每条 1 规则+例句，无练习闭环（handout 传统） | 规则清单的「编号+例句+例外注」写法，供成人层/教师层 |
| 6 | Woodward English | 编号课表 G-01…：Notes / Games / Video / Video Exercises 四列并行 | 定义→对比表→图表（chart）→视频→Next activity 链 | Summary Chart 收尾一图总括；四列同点多形态 |
| 7 | Test-English | CEFR 分级（A1/A2/B1/B2…）语法点库 | 信息图（form 图）→分小节讲 use→3 个练习（据其条目自述） | 信息图先行：一张图先给全貌再讲细节 |
| 8 | Khan Academy Grammar | 词类→句子→用法/标点的学科纲目，Unit/Lesson 制 | 短视频（David Rheinstrom 讲解）→练习→Unit Test→Course Challenge | 纲目顺序与「视频+自适应练习+单元测」闭环（二手来源，见缺口） |
| 9 | Grammar Monster | 按词类/类别的词典式条目海（自称 2,000+ lessons） | 条目讲解→ confirmatory test（每课至少 1 个多选互动测，可编辑/可打印/可发送） | 「每条目必配一测」且测验可被老师改编、经 URL 发送 |
| 10 | engVid | 老师频道制（多位老师各有主页与全部课程列表） | 白板视频课→课后 quiz→评论区答疑 | 「选老师不选目录」的信任结构；单点只讲一个对比 |
| 11 | English Grammar Revolution | 线性课程制：Get Smart 37 课，按学年周次推进 | 5–15 分钟视频→书面课→≥5 个图式练习→答案册；概念累积复现 | 站点组织/课程形态：小步线性、旧概念在新课中不断复现（图式细节不在本线范围） |

---

### 1. BBC Learning English（BBC 学习英语·语法）

#### 组织体系
双轨并行：
- **课程轨**：按水平分 Course（lower intermediate / intermediate 等），Course 下分 Unit，Unit 内设 Grammar Reference 页签——语法点不独立成站，而是挂在课程单元里（如 Lower Intermediate Unit 8 = 冠词 a/an/the，Unit 5 = have to/must，Unit 23 = 第一条件句，Unit 26 = 现在完成时经验义）。
- **节目轨**：6 Minute Grammar（按 Basic / Intermediate 分两档的音频/视频短节目，一期一个语法点）、The Grammar Gameshow（游戏秀问答节目，一期一个语法点，如「现在完成简单 vs 进行」）、以及把多期节目按语法点打包的 Box Set（如「现在完成时合集：8 课 46 分钟」，内含 6 Minute Grammar 与 Gameshow 混合编排）。同一语法点可在参考页、6 分钟节目、游戏秀三种形态间互链。

#### 一个语法点的页面解剖（以 Grammar Reference「A and an / The」实开页为准）
- 标题即语法点（A and an），先给一句话定义（"A or an means one person or thing"）；
- **分用途编号列举**：a/an 的用途 1) 2)…，每条配斜体例句、关键词加粗；
- **易混对比小节**："A or an?"（按音不按字母：a university / an hour）、"The or zero article?"（用 the 的清单 vs 不用冠词的清单并排）；
- **Take note 专栏**：特殊规则（如 school/hospital 去冠词的「身份义 vs 建筑义」对比例句）；
- **发音小节**（Pronouncing articles：a/an 与 the 的弱读/强读）；
- 同系列其他参考页（have to/must 页、第一条件句页）的固定栏目为：**Meaning and use → Form → Take note → Spoken English**——即先讲「什么意思、什么时候用」，再讲「怎么造句」，最后补口语提示与常见陷阱（don't have to ≠ mustn't 用加粗警告句单列）。
- Gameshow 一期解剖（实开文字稿）：主持人 Will + 「全知声音」Leslie + 两名选手；全期只出 **3 道题**（判断题→追问例句 bonus→看图造句题），每答一题 Leslie 立即给出「为什么」的机制解释（如简单式看「完成量」、进行式看「持续时长」），计分故意荒诞（bonus 19 分、奖品是牙刷），笑点与语法解释严格分工。

#### 呈现精髓
参考页「先义后形、对比成对、陷阱单列」，节目轨把同一个点再演一遍、赛一遍。

#### 对中国小学生的适配
- Grammar Reference 是成人向文本（全英文、无图示分级 scaffolding），小学生不能直读；但其栏目顺序（义→形→注意→口语）可直接作 App 语法页的成人层/讲解脚本骨架，例句密度与对比清单可供备课抽取。
- Gameshow 的「3 题定胜负 + 每题即时讲为什么」非常适合改成课堂/家庭双人问答玩法；荒诞计分对儿童是加分项。
- 冠词是汉语母语者老大难，BBC 把 a/an/the/零冠词放在同一页对比，恰对中国学生的错误图谱。

#### 可照搬点与不可搬点
- **可照搬**：①参考页四栏骨架 Meaning and use / Form / Take note / Spoken English；②「X or Y?」成对对比小节与「用/不用」双清单；③陷阱句加粗单列（don't have to ≠ mustn't 式）；④Gameshow 的「一期一语法点、只出 3 题、每题答后立即给机制解释」结构；⑤Box Set 式按语法点跨节目打包。
- **不可搬**：全英文长文本密度、成人例句语境（accountant 等职业场景需换成儿童生活场景）；6 Minute Grammar 的纯音频讲授对低龄段无效。

#### 接触等级
**实开 3 页（镜像站全文）**：Grammar Reference 冠词页、Grammar Gameshow 一期完整文字稿，另 have to/must、第一条件句两页经检索结果全文片段核读。注意：bbc.co.uk 官网直连页未在本轮打开，实开的是完整转载其课程页内容的镜像站（meleleh.pages.dev / bbcbreakingnews.pages.dev），页面结构与文字为 BBC 原文；6 Minute Grammar 的分档与形态来自 BBC 节目合集目录与 British Council 介绍页的转述。详见缺口总账。

---

### 2. British Council LearnEnglish（Kids 与成人/Teens 分开看）

#### 组织体系
按人群彻底分站，这一点本身就是组织决策：
- **LearnEnglish（成人）**：语法有**双系统**——(a) 分级课：A1-A2 / B1-B2 / C1 三档，每档是一个语法点卡片列表（卡片＝提问式标题，如 "Do you know how to use the present simple?"）；(b) English Grammar Reference：按词类编排的百科式参考书（官方说明明说「organised by parts of speech, like an encyclopaedia，不是用来从头读到尾的」），每页讲解+练习。官方「How to use」页明确教用户区分这两套系统。
- **LearnEnglish Kids（6–11 岁向）**：不设「语法点目录」。语法被拆进活动类型里：**Grammar chants**（语法咏唱）、grammar games、stories、songs 等并列栏目；孩子按「想听 chant / 想玩游戏」进入，不按「现在完成时」进入。Teens 站另为青少年分站（本轮未实开，见缺口）。

#### 一个语法点的页面解剖
**成人课（A1-A2 Present simple 卡片所代表的统一模板，官方自述）**：
1. **Test**：先做练习测已有水平（官方特别标注 "Don't skip this!"）；
2. **Teach**：读讲解；
3. **Test**：再做练习看是否进步；
4. 页底评论区由专家团队答疑，官方称评论区本身是学习资源。

**Kids chant 条目（实开 Grammar chants 索引页）**：每条 chant = 一个小标题故事（"Patrizia's a pilot"、"Please don't shout"、"When I was one I couldn't run"）+ 一句「剧情提问」（What are Patrizia and Tom doing today?）+ 一句**听辨任务**（"Can you hear the present simple and present continuous in the chant?"）+ Read more 进入条目页 + 评论计数。索引页上**不出现任何规则讲解**；配套形态为 chant 音频/视频 + games + printable activities（打印活动页）。

#### 呈现精髓
成人站「先测—再教—再测」的三段闭环；Kids 站把语法降格为「在 chant 里听出来」的听辨任务，规则不出场。

#### 对中国小学生的适配
- 11 站中唯一原生为小学生设计的语法呈现：目标语法点以高频复现的方式埋在有节奏的 chant 里，任务是「听出它」而非「说出规则」——与本项目「机制先行、术语后置」的口径高度合拍，且 chant 标题全是儿童生活场景（上学、喊叫、去年夏天）。
- 成人站的 Test-Teach-Test 适合移植到 App 的家长/高年级层：先暴露错误再给讲解，讲解的价值被前测衬托出来。
- Kids 站的代价：没有系统纲目，家长看不到「学了哪些语法点」；App 若照搬需在成人层补一张语法点地图（chant 标题旁标注目标点，Kids 索引其实已用小字写明，如 "Can you hear the imperatives…"，算是半透明标注）。

#### 可照搬点与不可搬点
- **可照搬**：①Kids：语法点 chant 化——一首 chant 只埋一个（至多两个对比）语法点，配「Can you hear…?」听辨任务 + 游戏 + 可打印活动三件套；②条目标题用剧情句不用术语（"When I was one I couldn't run" 而非 "Modal verbs: could"）；③成人/教师层照搬 Test→Teach→Test 三段式与「Reference 按词类编、课程按级别编」的双系统分工。
- **不可搬**：Kids 站无进度/无纲目的散点陈列（App 需要菜单完备性，不能只陈列精选 chant）；评论区答疑依赖真人专家团队，不可复制。

#### 接触等级
**实开 3 页（官网直连）**：成人 A1-A2 grammar 索引页、官方 How to use the grammar section 说明页、Kids Grammar chants 索引页。未实开：Kids 单条 chant 的内页、成人单个语法课内页、Teens 站（见缺口总账）。

---

### 3. Perfect English Grammar（Seonaid Harvey）

#### 组织体系
个人教师站（站长 Seonaid，剑桥语言学硕士，页面固定有本人照片与 "Hello! I'm Seonaid!" 栏）。组织是**扁平的语法点页库**：顶部导航 Explanations / Exercises / Speaking / Membership / Courses；免费层是「一语法点一页」的讲解页 + 与之互链的练习页群，付费层是按 CEFR 打包的 Ultimate A1/A2… 课程与 PDF 包（Teachable）。关键切分：**同一个时态拆成 Make（怎么造形）与 Use（什么时候用）两页**——如 Present Simple 有 form 页（present-simple.html）与 use 页互链，页首即给二选一分流（"If you'd prefer to learn about how to USE the Present Simple jump to this page"）。

#### 一个语法点的页面解剖（实开 Present Simple form 页）
- 页首三件套：提问式钩子（"Do you know how to make the present simple?"）→ **视频/文字二选一**（"Watch the video here or read the explanation and do the exercises below"）→ 下载 PDF 链接；
- 先讲特殊动词 be，再讲普通动词（顺序本身是教学决策）；
- 每个形态小节 = **全人称对照表**（Positive / Positive Short Form 两列；Negative / Negative short form 两列），be 动词走完肯定→否定→Yes/No 问句→Wh- 问句四步，普通动词重复同一四步；
- **每个小节末尾即时挂练习链接**（"Click here to practise making yes/no questions with 'be'"），讲一段练一段，页末再挂 Mixed exercise 1–4 与全部练习索引；
- 提醒句用口语化加粗短句插在表中（"Don't forget the 's'! Even really advanced students do this!"）；
- 练习页解剖（经检索全文核读）：题干给出词块（如 (you / like cake)?），学习者**键入整句**后点 Check，另有 Show（看答案）与「下载 PDF（含答案）」；练习按形态切分编号（Exercise 1 专项肯定句、5 专项 Yes/No 问句…），Reported Speech 的 PDF 讲义则显示其离线形态：一句规则→成对 Direct/Reported 例句逐项走完全部时态的 backshift，再单列 say/tell 对比与「✗ 不能这样说」反例。

#### 呈现精髓
一页只讲透一个点：全人称表格把形态一次摆全，讲一小节就挂一组整句键入练习。

#### 对中国小学生的适配
- 表格密度与「整句键入」对小学生偏重：低龄段需要把表格改成逐行点亮/拖拽拼句。但「Make 与 Use 分页」对中国课堂极有价值——国内教学常把造形与用法揉在一课里，学生会造句却不知何时用。
- 例句均为成人日常（work, office, coffee），需换儿童场景；语言本身简单（短句、口语化提醒），讲解文风可作中文讲解脚本的语气参照。
- PDF 可带回家的形态适合中国家长打印陪练的习惯。

#### 可照搬点与不可搬点
- **可照搬**：①Make/Use 双页拆分；②「视频或文字二选一」入口；③讲一节挂一练的即时练习链接位；④全人称对照表作为形态总览（App 里可做成可点读表格）；⑤每个讲解页同步产出可打印 PDF。
- **不可搬**：整句键入式练习对低龄段门槛过高；页面长滚动 + 纯文字表格无图像锚点；付费课程墙结构与本站无关。

#### 接触等级
**实开 3 页/件**：Present Simple 讲解页（全文）、Reported Speech PDF 讲义（全文）、Present Simple 练习页与对比练习页经检索结果全文片段核读（键入+Check/Show+PDF 结构据此确认）。

---

### 4. Grammar Girl（Quick and Dirty Tips，Mignon Fogarty）

#### 组织体系
**无纲目、无分级**：以播客节目流为组织——每周一期（已 1,200+ 期），一期解决一个具体问题；网站按时间流与主题标签陈列，另有书籍、LinkedIn Learning 课程、Patreon（无广告版+迷你填字）做外围。权威来自主持人人格（Grammar Girl 人设 + 播客名人堂等资历陈列），不是来自体系完整性。

#### 一个语法点的页面解剖（实开 "Grammar Manners" 期 + affect/effect 期文本）
- **听众提问钩子开场**："Grammar Girl here. Today's topic is…"，紧接具体来信（"Dr. David asked about how he can correct other people's grammar without losing friends…"）——问题先于规则；
- 正文用小标题分段（Always Know Who You Should Correct / How to… / Set a Good Example），段落短、口语化；
- 固定吉祥物角色贯穿全网例句：**Squiggly（蜗牛）与 Aardvark（土豚）**——affect/effect 一期的全部例句都由这两个角色演出（"The arrows affected Aardvark. The effect was eye-popping."）；
- **记忆术是标配部件**：affect/effect 给了多层——首字母句 "a very easy noun" = Affect Verb Effect Noun；后又升级 RAVEN（Remember: Affect Verb, Effect Noun）；且明说边界（"Most of the time, affect is a verb and effect is a noun"，例外另述）；
- 每期 = 音频 + 完整文字稿双形态，文末固定导流（订阅、书籍、其他节目）。

#### 呈现精髓
不讲体系，只解决「你正卡住的那一个问题」，并给一个带固定角色的记忆术让你再也不忘。

#### 对中国小学生的适配
- 「问题钩子」正是中国学生的高频卡点形态（its/it's、their/there 类易混点在小学高年级已出现）；Squiggly/Aardvark 式固定角色演例句，对儿童比成人例句有效得多，且与本项目「一贯角色/舞台」的既有裁定同构。
- 但内容池是成人写作问题（逗号、被动语态礼仪等），选题不可搬，只能搬「单篇结构」；记忆术依赖英文首字母，迁到中文儿童时要重造（如用角色动作而非字母梗）。

#### 可照搬点与不可搬点
- **可照搬**：①条目以真实提问开场（App 可用「小朋友最常问…」）；②每个易混点必配一个记忆术且**明说适用边界**（most of the time…）；③固定吉祥物角色承包全站例句，角色本身成为检索记忆的锚；④一篇一问、短篇幅、音频+文字双形态。
- **不可搬**：无纲目时间流（App 语法区需要可查的体系）；字母型 mnemonic 对中文儿童失效需重造；播客导流尾巴。

#### 接触等级
**实开 1 页（官网直连全文）**：Grammar Manners 期；**检索全文核读 2 件**：affect/effect 期文字（经其 PDF 转载全文）与 15 周年回顾页（官网，含 RAVEN 与漫画来源自述）；播客总目录页（Acast/Simplecast）经检索核读其分期形态。

---

### 5. Purdue OWL（普渡大学在线写作实验室·语法）

#### 组织体系
大学写作中心的**参考手册式目录**：General Writing 下分 Grammar、Punctuation、Mechanics 等大类，Grammar 内按主题列 handout（讲义）页——Parts of Speech、Sentence Structure、Verb Tenses、Subject-Verb Agreement、Pronoun Agreement、常见错误等。无分级、无进度、无账号；每页页首带版权与打印声明（"When printing this page, you must include the entire legal notice"），定位是「可打印带走的讲义」，不是课程。

#### 一个语法点的页面解剖（实开 Subject/Verb Agreement 页）
- 一句导语交代本页用途（"This handout gives you several guidelines to help your subjects and verbs agree."）；
- **编号规则清单**：全页 11 条编号规则，每条 = 规则陈述（关键词加粗）+ 1–3 句例句，无图、无视频、无互动；
- 例外与易错点以 Note 形式嵌在条内（dollars 作金额时单数、作钞票时复数）；
- 引用外部权威收尾（The Gregg Reference Manual §10:1001）；
- 全站同类页（如 Verbs with Helpers）同构：编号小节 + 公式化呈现（Have + [VERB+ed]、Is + [VERB+ing]）+ 助动词清单。

#### 呈现精髓
把语法写成可查、可打印的编号规则清单：一条规则一例句，例外注在条内，仅此而已。

#### 对中国小学生的适配
- 儿童不可直用（全学术英文、无图像、无练习）。价值在**成人层**：App 的家长/教师讲解、规则审校可借其「编号+例句+例外注」的严谨写法，尤其主谓一致这类「规则+大量例外」的点，OWL 的清单完整度可作内容审校的对照源（其 11 条覆盖了 and/or 连接、插入语干扰、集合名词、there be 等全部典型陷阱）。
- 公式化写法（Have + [VERB+ed]）对高年级学生的「结构卡」是好形态。

#### 可照搬点与不可搬点
- **可照搬**：①规则编号化 + 每条必配例句 + 例外 Note 内嵌的成人层文档格式；②[公式]式结构呈现（HELPER + VERB）；③「handout 可打印带走」的定位——App 语法点可导出一页纸讲义。
- **不可搬**：无练习、无反馈、无分级的纯参考形态（儿童需要闭环）；学术语域与例句（committee、President accompanied by his wife…）。

#### 接触等级
**实开 1 页（官网直连全文）**：Subject/Verb Agreement；Verbs with Helpers 页经检索结果全文核读；目录结构经二手资源清单核读（见缺口：未实开 Grammar 索引页本身）。

---

### 6. Woodward English（grammar.cl / woodwardenglish.com）

#### 组织体系
**编号课表制**：学生区总表按 G-01、G-02…编号（实见 G-01 There is/are 至 G-31+），每行四列并行——**Grammar Lessons (Notes) / Grammar Games / Video Lessons / Video Exercises**，同一语法点四种形态同表对照；官方明说列表「NOT in any particular order」。另有按水平推进的 General English 课程线（woodwardenglish.com，自称 124 课，Basic→Advanced）与教师资源商店（图表/闪卡/工作纸 PDF，经 Teachers Pay Teachers 售卖）——免费学生站 + 课程站 + 教师商店三层。

#### 一个语法点的页面解剖（实开 Conditionals 页、Subject Pronouns 页）
- 顶部嵌 YouTube 视频（同点视频课）；
- 定义开场 + 首例句拆解（"If it rains, I will cancel the trip." 随即标注哪段是 if-clause、哪段是 main clause）；
- **对照表**承载核心信息（Subject Pronouns 页：代词 × 单复数/人称 × 性别三列全表）；
- 分用途小节（When do you use IT? 列时间/天气/温度三用 + 例句）；
- **Summary Chart 收尾**：一页漫画风图表汇总全点（Conditionals Summary Chart、Subject Pronouns Chart with cartoons），图可单独成为教师打印资源（一词一页 A4 闪卡版）；
- **Next activity 链**：页末不给练习题，而是链向相关 Notes（Would / Zero / First / Second / Third Conditional 分页）与 Games 区，形成「点→点」的网状推进；
- 视频课与文字页互为镜像：视频末尾同样落到 summary chart（Present Simple 视频结构：肯定→否定→问句→总结图表）。

#### 呈现精髓
每个语法点最后都要收成一张可贴墙的 Summary Chart，讲、看、玩、练四列同表任选入口。

#### 对中国小学生的适配
- 11 站中与「界面即内容」最贴合的一家：图表不是装饰，是讲解的最终形态——漫画人物代词图、条件句配对图都可被儿童直接看懂大半，语言负荷低。
- 编号课表 + 四列形态适合改造成 App 的「一个语法点 = 讲解页 / 动画 / 游戏 / 测验」四件套清单；其缺点是学生区无顺序（自认 not in any particular order），App 需自己补学习路径。
- 例句与图表为通用国际学生语境，儿童场景占比中等，需筛选。

#### 可照搬点与不可搬点
- **可照搬**：①Summary Chart 收尾制——每个语法点产出一张总括图（与本项目「规律图」诉求直接对接）；②G-编号总表 + 四列（Notes/Games/Video/Exercises）同点多形态索引；③Next activity 的相关点链接链（对比点互链，如 subject↔object pronouns）；④图表的一词一页闪卡化（可打印贴墙）。
- **不可搬**：无序陈列（需自建路径）；图表为静态 GIF/PDF，App 应做成可交互版而非贴图；教师商店付费墙模式。

#### 接触等级
**实开 2 页（官网直连全文）**：Conditionals、Subject Pronouns；G-编号总表（StudentGamesNotes）经检索结果全文核读（含 G-01–G-31 行与四列表头）；课程站首页经检索核读。

---

### 7. Test-English（test-english.com）

#### 组织体系
**CEFR 分级语法点库**：Grammar Points 按 A1 / A2 / B1 / B2（另有更高档）分栏，每级一组语法点页；站内另有 Listening / Reading / Use of English / Exams 等技能线，语法线与考试线并行。每页 URL 即带级别（/grammar-points/a1/present-simple/），级别写进信息架构。条目由第三方教师资源页转述的定式自述为：每课含**讲解（规则+图表）+ 3 个带答案的练习**。

#### 一个语法点的页面解剖（实开 A1 Present Simple 页）
- 标题即「点名+口号式结构」（"Present simple: I do, I don't, Do I?"）；
- **信息图先行**：第一节 "Present simple form" 先给一句要害（问句/否定要用 do/does、don't/doesn't），随即一张信息图摆全肯定/否定/问句/简答四格（图可经 Pinterest 下载大图）；
- 穿插词典互链：正文中链向自站词典条目解释典型错句（"Our dictionary entry on *do* explains why 'Does she works?' is incorrect"）——**错误例句被做成可点开的讲解锚**；
- 拼写小节单列（he/she/it 的拼写变化）配第二张图，并链向拼写词典条目（studys→studies）；
- 第二大节 "Present simple use" 按用途分小标题（Habits or actions that happen regularly / Permanent situations…），每小节 3–5 句例句、目标结构加粗；
- 本次抓取的文本在 use 节中段结束，练习区未出现在抓取文本内（见缺口）；据该站条目在教师资源页的自述与站内定式，讲解后接 3 个练习（选词/填空类，带答案反馈）。

#### 呈现精髓
先用一张信息图把「形」一次摆全，再按用途逐节展开，典型错句直接链进词典条目。

#### 对中国小学生的适配
- A1 页语言已相当简明，信息图四格（肯定/否定/问句/答句）对小学高年级可直接看懂；「错句做成链接锚」对中国学生的高频错（Does she works?、studys）正是对症形态——错误不是批改时才出现，而是预先写进讲解。
- CEFR 分级与国内年级不对应，App 引用时需做年级映射；练习形态（网页填空）对低龄段仍需游戏化。

#### 可照搬点与不可搬点
- **可照搬**：①信息图先行：语法点页第一屏给全貌图，再逐节展开；②典型错句内嵌为可展开讲解（错句→为什么错→正确形）；③级别写进导航与 URL 的分级信息架构；④一页「讲解+固定数量（3 个）练习」的配额制，便于产能规划。
- **不可搬**：图的静态图片形态（App 应做原生可交互图）；CEFR 标签直贴儿童界面（家长不熟，应转译为年级/课标带）。

#### 接触等级
**实开 1 页（官网直连）**：A1 Present Simple（抓取文本止于 use 节中段，练习区未实见，如实记入缺口）；分级总表与「3 练习」定式经第三方资源目录与教师资源页转述核读。

---

### 8. Khan Academy Grammar（可汗学院·语法）

#### 组织体系（二手来源，见接触等级）
纲目是**学科式三段**：**Parts of Speech（词类）→ Syntax: sentences and clauses（句子与从句）→ Usage and Style（用法与风格）/ 标点**。词类段逐词类深挖：名词（单复数、普通/专名、具体/抽象）、代词（人称、所有格、grammatical person）、动词（时态 present/past/future、体 aspect：simple / perfect / progressive / perfect progressive、linking / helping verbs、不规则动词）、形容词（含冠词、形容词顺序）、副词、介词、连词、感叹词；其后接主谓一致、代词一致、平行结构、修饰语错位、句子类型（简单/并列/复合）与逗号规则等。组织单位为 Unit → Lesson，每课 = 短视频 + 练习，Unit 末有 Unit Test，全课有 Course Challenge；讲解者为专职「resident grammarian」David Rheinstrom，视频以口语化叙事开场（如讲冠词先讲「两头大象的故事」）。

#### 一个语法点的页面解剖（二手来源拼合）
- 短视频讲解（口播+板书式动画，语气口语、常用小故事引入概念）；
- 视频配完整文字稿；
- 紧随的练习为多选题，带自适应难度（据二手概述）；
- 单元测与全课挑战做阶段收口，mastery 积分制驱动推进（Khan 通用机制）。

#### 呈现精髓
按「词→句→用法」的语言学纲目线性推进，每课视频+练习、每单元一测，靠掌握度积分牵引。

#### 对中国小学生的适配
- 纲目顺序（先词类后句子）是美国中小学语法传统，对中国小学英语（以句型/时态为纲、词类术语出现晚）并不合拍：可借其**后段**（句子与用法）与练习闭环，不宜照搬词类开局。
- 视频叙事化引入（故事讲冠词）对儿童友好；但内容定位为中学段，全英文，低龄不可直用。
- 「 resident grammarian 」专人讲解的人格化与 engVid 的老师制相通。

#### 可照搬点与不可搬点
- **可照搬**：①Unit/Lesson/Test/Challenge 的四级收口结构与掌握度推进；②概念用小故事引入再命名（先场景后术语）；③视频必配文字稿（App 可转译为可读讲解）。
- **不可搬**：词类先行的纲目顺序；术语密度（aspect、perfect progressive 等超出小学课标）；自适应题库工程量。

#### 接触等级
**未直开官网（0 页）**。本节依据：检索到的 Khan 课程二手概述（课程结构与课型描述）、EduRev 转载的 Khan 视频文字稿（冠词、aspect、时态等多课实稿）、FTCE 备考路线图对 Khan Grammar 单元的映射表。官网课表页与练习页形态未经实开核验，引用时请按「待核」处理。见缺口总账。

---

### 9. Grammar Monster（grammar-monster.com，Craig Shrives）

#### 组织体系
**词典式条目海 + 人群分流首页**：自称 2,000+ lessons。首页不按级别而按**身份**分流（"What Do You Want?"——母语者进阶 / 学生 / 商务 / 创意写作 / 启蒙教师 / 需要题目的教师…各给样本课入口）；正文按大类组织：Advanced glossaries、Beginners or Kids（Vocabulary / Spelling / Grammar 三子库）、Tests and Games 总表、Word Lists。无学习路径，定位是「查得到、测得了」的工具站；无登录、全免费、广告供养（声明课内无广告）。

#### 一个语法点的页面解剖（据首页与测试总表实开结构 + 站方定式）
- 每课 = 分步讲解（step-by-step lessons）+ **confirmatory test（确认测）**：站方明言「every lesson has at least one multi-choice interactive test」；
- 测验的三个工程特性是其招牌：**editable**（老师可改题）、**printable / 可下载为 Word**、**sendable**（题目与答案数据编码进 URL，老师经 WhatsApp / Google Classroom / Messenger 发链接即可布置，无需账号登录）；
- 独立测试总表按词类分组（Adjectives / Adverbs / … / Verbs）、标点、语法术语定义、易混词四大板块，另有游戏形态：Parts of Speech 故事测（选一个故事→点黄词说词类，10 题 80% 及格）、分桶游戏（点词掉进正确 bucket，错扣 3 条命之一）、Monster Test（限时，拼写/语法/标点三段各 6 题，答速计分）；
- 词汇线另有 83 个类别词表，每类配闪卡+多选题+六种由易到难的游戏（Quick-fire → Match Pairs → Spell → Snake → Word Detective → Memory Challenge）。

#### 呈现精髓
不组织学习路径，只保证「任何条目都查得到且当场测得了」，并把测验做成老师可改、可发、可打印的作业件。

#### 对中国小学生的适配
- 「Beginners or Kids」子库与故事测/分桶游戏是真儿童形态：点词分类、故事里找词类、80% 及格线，都可直接游戏化进 App。
- sendable 的 URL 编码作业对无账号体系的产品是巧妙的低成本方案；但中国场景走 App 内分享即可，不必学 URL 编码本身。
- 条目海无路径，家长会迷路；App 只能借其「条目+测」的原子结构，不能借其信息架构。

#### 可照搬点与不可搬点
- **可照搬**：①**每条目必配 ≥1 个确认测**作为产能验收线；②测验可编辑/可导出（教师端改编权）；③分类游戏模板（点词入桶、故事点词、限时三段测）与「六游戏由易到难」的同词复练阶梯；④首页按身份分流的入口文案法（给家长/老师/学生不同门）。
- **不可搬**：无路径的条目海架构；广告模式；Key Stage 2 等英国学制标签。

#### 接触等级
**实开 2 页（官网直连全文）**：首页、Free Grammar Tests 总表；单个 lesson 页的内部版式未实开（其「讲解+确认测」定式据站方在首页/总表页的明文自述），记入缺口。

---

### 10. engVid（engvid.com）

#### 组织体系
**老师频道制**：站点不以语法纲目为首层，而以老师为首层——Teachers 页逐位列出老师（Gill、Rebecca、Benjamin、Adam、Ronnie、Alex、Emma、Jade、James 等）的人格化自述（背景、风格宣言，如 Ronnie 自称 "a bit of a nutter"、主打 real-life English；Jade 主打信心与动机），每人带 "all lessons by X" 入口；课程再按主题/级别散挂在各位老师名下，同属 engVid 品牌的 YouTube 频道群。学习者先选「跟谁学」，再选学什么。

#### 一个语法点的页面解剖（实开 THIS/THAT/THESE/THOSE 课页所见 + 检索核读）
- 主部件是**白板视频课**（一位老师对镜讲一个点，如 Alex 用近/远×单/复的 2×2 对比讲指示词）；
- 视频下配 **quiz**（学习者评论高频自报分数，如 "My test it's 100% correct"、"6/6"，可确认每课带短测且即时出分）；
- 页面下半是**巨型评论区**兼答疑区：学生追问（his/her 用法、phone 里 this/that 之辨）由老师与其他学生混答——评论量极大（本页抓取 1,700+ 行几乎全为评论），既是社区资产也是页面噪声；
- 课与课之间靠老师页与主题标签聚合，无强制顺序。

#### 呈现精髓
语法被装进「一位你信得过的老师的白板小课」里：一课一个对比，课后小测，疑问留在评论区。

#### 对中国小学生的适配
- 老师人格化对儿童同样有效（固定老师 = 固定角色，与 Grammar Girl 的吉祥物、Woodward 的一贯舞台同构）；2×2 对比板书（近远×单复）是可直接动画化的讲解图式。
- 但 engVid 面向成人自学者：语速、话题、评论区生态均不可搬；其组织对 App 的启示在供给侧——用少数固定「老师角色」承包全部语法讲解，而不是每课换一张面孔。

#### 可照搬点与不可搬点
- **可照搬**：①老师频道制的信息架构（先认人、再选课）与每位老师的风格宣言页；②一课只讲一个对比维度（2×2 板书）；③视频+即时出分短测的固定课型；④评论区高频问题回收为 FAQ/易混点选题（其评论本身就是错误语料库）。
- **不可搬**：开放评论区（儿童产品不可行，需改为预制答疑）；无纲目散挂（App 需另建目录层）；成人话题与考试线（IELTS/TOEFL）。

#### 接触等级
**实开 2 页（官网直连）**：Teachers 页（全文）、THIS/THAT 课页（抓取被评论区淹没，视频/quiz 本体版式未在文本中展开，quiz 存在与计分据评论与检索片段确认——如实记入缺口）。

---

### 11. English Grammar Revolution（Elizabeth O'Brien）

> 范围声明（按任务分工）：本节只查**站点组织与课程形态**；句子图式（diagramming）的方法细节不在本线展开，留交叉引用。

#### 组织体系
一人品牌站（Elizabeth O'Brien，17+ 年语法教学）：免费层是文章/练习页流（如 Sentence Diagramming Puzzles 解谜页、名句图解页）+ 邮件订阅（A Sentence a Day：每日一句经典文学句子练习，月换主题）；付费核心是 **Get Smart Grammar Program** 一套线性课程，学校版 $199 / 家庭版 $149 终身访问，另有配套纸质书（学生册 285 页 / 教师册 335 页）与纪录片《Grammar Revolution》作品牌外围。

#### 一个语法点的页面解剖（以课程形态与免费练习页为准）
- **课程颗粒度**：全程 **37 课**（对齐学年约 37 周；可一日一课 37 天走完），每课 = **5–15 分钟视频 + 书面课 + 至少 5 个练习**，配教师答案册；
- **顺序是卖点**：官方反复强调 "exactly the right order" 与累积复现——「所有概念互相搭建，学难概念时一直在复习易概念」（Recall & Review 条），覆盖范围按词类→句子类型→动词类型→主从句→短语→verbals 推进（详细 scope & sequence 另有图表页）；
- 免费解谜页的课型：给**线索清单**（名言出处/句型/成分提示/图式骨架）→ 学习者先试解 → 答案折叠在页下（"don't scroll down until you want to see it"）→ 逐成分拆解答案 → 导流课程；
- 支持形态：可下载视频、可打印课页、纸书同步，刻意保留纸笔作答（FAQ 明言学生作业不在线保存，"benefits of working on actual paper"）。

#### 呈现精髓
把语法做成一条不分叉的 37 步直线：小步视频+纸上练习，旧概念在每一步新课里被顺带复习。

#### 对中国小学生的适配
- 「37 课对齐学年周次」的节奏设计可供 App 规划学期制路径时参照（中国小学一学期约 18–20 周，需重切颗粒度）；
- 线索→试解→折叠答案的解谜页是好的「先试产出」形态（与本项目 POA 排序口径相合），可用于高年级挑战题；
- 内容为美国母语者语法课（词类/从句术语体系），选题与术语不可搬；纸笔中心与 App 形态相反，只借节奏与复现机制。

#### 可照搬点与不可搬点
- **可照搬**：①固定课数+固定课型（视频→书面→≥5 练）的可预期节奏；②「新课内嵌旧概念复现」的螺旋设计写进课程说明并作为验收项；③解谜页的线索清单+答案折叠（先试后看）；④每日一句的订阅式轻练习（可转 App 每日一题）。
- **不可搬**：母语者术语纲目与名句选材（独立宣言图解等）；纸笔作答中心；一次性买断的课程包装。

#### 接触等级
**实开 1 页（官网直连全文）**：Get Smart 课程页；解谜页经检索结果全文核读（线索/答案结构完整）；图式方法细节按分工未展开。

---

### 横向结论（供语法区设计直接取用）

1. **单点页部件的公约数**：定义/用途 → 形态表或信息图 → 分用途例句 → 易混对比 → 练习。差异只在顺序：BBC/Perfect 先义后形或先形后练、Test-English 图先行、British Council 先测后教。小学 App 建议合成：**场景/故事引入（Kids chant 式）→ 信息图全貌（Test-English 式）→ 分节讲解+即挂练习（Perfect 式）→ Summary Chart 收尾（Woodward 式）→ 确认测（Grammar Monster 式）**。
2. **两种合法的组织骨架并存**：按级别推进的课程骨架（BC 分级课、Khan 纲目、EGR 37 课）与按词类/主题查的参考骨架（BC Reference、OWL、Grammar Monster）。成熟站点多为双系统：学的走课程，查的走参考——App 语法区宜同样分「学习路径」与「语法索引」两面。
3. **儿童化的关键动作只有一个**：把「规则陈述」换成「可感知的任务」——BC Kids 换成听辨 chant、Grammar Monster 换成点词入桶、Gameshow 换成 3 题竞答、Grammar Girl 换成角色记忆术。术语都退到成人层。
4. **人格锚点普遍存在**：Seonaid、Grammar Girl、engVid 老师团、Elizabeth、Woodward——单点内容由固定面孔/角色承包，与本项目既有的「一贯角色/舞台」裁定一致，语法区应指定固定讲解角色。
5. **练习的最低配置**：每点 ≥1 组即时反馈练习是行业地板（Grammar Monster 明文、Perfect 每节挂练、BC 前后双测）；「整句产出」型（Perfect 键入整句）比纯选择更接近会用，但需按龄降阶为拼句/拖拽。

### 缺口总账（未实开/受限清单）

| 站点 | 缺口 | 影响 |
|---|---|---|
| BBC Learning English | bbc.co.uk 官网直连页未打开；实开为完整转载课程页的镜像站（Grammar Reference 冠词页、Gameshow 文字稿全文）；6 Minute Grammar 仅见节目合集目录与 BC 介绍页转述，未实开其单期页 | 页面结构与文字可信（镜像全文），但官网当前版式（视频/活动区排布）未核 |
| British Council | Kids 单条 chant 内页、成人单个语法课内页、Teens 站均未实开；成人课 Test-Teach-Test 据官方说明页自述 | Kids 条目内页的游戏/打印活动版式未逐项核验 |
| Perfect English Grammar | 练习页未直开（经检索全文片段核读其键入+Check/Show+PDF 结构） | 练习页版式细节（题量排布）为片段级证据 |
| Grammar Girl | 官网单期页仅实开 1 篇；affect/effect 期经 PDF 转载全文核读 | 近期节目页的现行版式（Patreon 导流等）为检索级证据 |
| Purdue OWL | Grammar 索引页未实开（目录结构据二手资源清单）；实开 handout 1 页 | 大类划分以二手清单为准 |
| Woodward English | 学生区总表经检索全文核读，未直开；Games 的游戏页未实开 | 游戏形态（玩法/反馈）未核 |
| Test-English | 实开 A1 页抓取文本止于 use 节中段，练习区未实见；「每课 3 练习」据第三方转述该站自述 | 练习题型与反馈方式未核 |
| Khan Academy | **官网 0 页直开**：课表、视频页、练习页均未实开；全节据二手概述、EduRev 转载视频稿、备考路线图拼合 | 全节按「待核」使用，不得据此断言其现行页面版式 |
| Grammar Monster | 单个 lesson 页未实开；「讲解+确认测」定式据站方首页/总表明文自述 | 条目页内部小节顺序未核 |
| engVid | 课页抓取被评论区淹没，视频与 quiz 本体版式未在文本中展开；quiz 存在据评论自报分数与检索片段 | 课页上半部版式（级别标签、资源下载等）未核 |
| English Grammar Revolution | scope & sequence 详细图表页未打开（仅课程页自述覆盖范围） | 37 课逐课目录未核 |

*成稿说明：本文件只做调研记录，未改动任何 App 文件，未做 git 操作。*


---

## 第四章 · 语法图示化 / 系统化流派

> 任务：为中国小学生英语规律 App 的语法区设计，调研「把语法画出来 / 系统化」的代表做法，提供可借鉴、可照搬的来源。
> 方法：2026-11-02 用 browser_search + browser_open 逐个核实。画法细节（形状 / 颜色 / 线型对应）只写打开页面里出现的内容；不同来源冲突时并列标注，不擅自合并。查不到实据的写入文末「缺口总账」。
> 接触等级定义：**实开** = 已用 browser_open 打开全文/长文并据此写；**摘要** = 只看到论文摘要、书目信息或二手转述；**仅搜索结果** = 只看到搜索结果片段，未打开原文。

### 总览表

| # | 流派 / 做法 | 一句话本质 | 编码维度 | 最适合的语法点 | 接触等级 |
|---|---|---|---|---|---|
| 1 | Reed & Kellogg 句子图式 + Grammar Revolution 复兴 | 一条基线 + 竖线/斜线，把主谓宾与修饰关系画成线图 | 位置 + 线型 | 主谓宾骨架、修饰语挂靠、介词短语、并列/从属 | 实开（Wikipedia + Grammar Revolution 官网） |
| 2 | 蒙台梭利语法符号 + 句子分析 | 每种词类一个可触摸的形状符号，摆在词上方；再用问句箭头拆句子成分 | 形状 + 颜色 + 大小（实体教具） | 词类功能、主谓宾/状语/定语关系 | 实开（Somersfield 学校页 + Trillium 课程页） |
| 3 | Colourful Semantics（Alison Bryan, 1997） | 不讲词类名，按「谁/在做什么/什么/在哪儿」的问题给句子成分上色 | 颜色 + 问题词（+个别形状） |造句完整性、语序、扩句（先口头后书写） | 实开（Structural Learning 教师指南 + Twinkl 官方指南 PDF） |
| 4 | SHAPE CODING（Susan Ebbels, Moor House） | 形状套短语、颜色标词类、箭头标时态、单/双线标单复数，四层叠加 | 形状 + 颜色 + 箭头 + 线数 | 时态形态、主谓一致、被动、问句、动词配价 | 实开（PMC 综述 Balthazar et al. 2020 + Moor House Institute 官页） |
| 5 | 颜色编码在教材/产品中的实现 | 把「每词类一色」做进软件/教材版面，靠颜色顺序记语序 | 颜色（通常仅颜色） | 初学者词类辨认、基本语序 | 实开（Color Key 软件的 TESL-EJ 评测）；Lea / Fitzgerald 为摘要/仅搜索结果 |
| 6 | 构式/情境剧场：Grammar Tales + Story Grammar Marker | 一个故事只教一条规则；或用一串图标把故事骨架（人物→触发→感受→计划→尝试→结果→收尾）串起来复述 | 故事 + 图标链 | 词类/标点规则的情境记忆、叙事结构、时态叙事 | 实开（Grammar Tales 产品页 + SGM 教学资源页）；SGM 图标对照部分为仅搜索结果 |
| 7a | Sentence Combining 句子合并 | 给内核句，让学生合并成更复杂的句子；不讲形式规则也能涨句法成熟度 | 无图示，靠操作 | 扩句、从句、写作句法复杂度 | 仅搜索结果（含研究综述片段，未打开全文） |
| 7b | TPR 全身反应（James Asher） | 先听指令、用全身动作回应，语法靠归纳不靠讲解 | 身体动作 | 祈使句、动词短语、方位/介词的体感理解 | 实开（Wikipedia 长条目） |

**先说最重要的冲突警告（影响 §4 落地）**：SHAPE CODING 的颜色表在两个已打开/已检索的来源之间不一致——Ebbels 2007 原论文表 1（搜索结果片段）作：红=名词、粉=限定词、黄=**动词**、绿=形容词、蓝=**介词**；而 Balthazar, Ebbels & Zwitserlood 2020 综述（PMC 实开）表 3 作：红=名词/代词、粉=限定词、蓝=**动词**、绿=形容词、黄=**介词**。动词与介词的黄/蓝互换。App 若照搬 SHAPE 颜色，必须先以 Moor House 官方现行培训材料为准再定版，不能直接抄本文任一表。详见 §4。

---

### 1. Reed & Kellogg 句子图式（sentence diagramming）及其现代复兴

#### 这套图示长什么样
（据实开的 Wikipedia「Reed–Kellogg sentence diagram」条目）

- 一条水平**基线（base line）**承载句子骨架：主语写在基线左侧，谓语（必含动词）写在右侧，两者之间一条**贯穿基线的竖线**隔开。
- 动词与宾语之间也有一条分隔线，但**止于基线、不贯穿**：
  - 直接宾语 → **竖线**；
  - 表语（主语补足语，系动词后的名词/形容词）→ **反斜线 `\`，斜向主语**，视觉含义是「补足语回头重命名/描述主语，不是动作的承受者」。
- **修饰语一律掉到基线下方**：形容词（含冠词）、副词写在**斜线**上，挂在它所修饰的词下面。
- **介词短语**：介词写在斜线上，斜线再接一条水平线，介词的宾语写在这条水平线上；整个短语挂在被修饰词下方。
- 并列、从属等结构有扩展画法（条目只说「augmented for coordination and subordinate clauses」，具体画法本文未逐一核实，不展开）。

核心设计思想（条目原文要点）：**位置即论断**——一个词画在哪儿，就是它在句中干什么；画错了，线会「无处可去」，错误自己暴露。

#### 怎么用来学一个语法点
以「Joe kicked the ball high in the air」类句子为例（据实开的 UNG Press Books《Classroom Grammar》搜索/介绍页要点 + Wikipedia）：先只找简单主语和简单动词上基线 → 判断动词是及物还是系动词，决定宾语前用竖线还是斜线 → 再把形容词/副词/介词短语逐个挂到下方。学一个新点 = 多学一种线：如学介词短语，就只新增「斜线+小水平线」这一种挂法，其余不变。

**现代复兴：Grammar Revolution / Elizabeth O'Brien（实开官网 Get Smart Grammar Program 页）**
- 形式：37 课（约一学年），每课 5–15 分钟视频 + 至少 5 道图式练习；内容顺序为词类 → 句子类型 → 动词类型 → 独立/从属分句 → 短语 → 非谓语（verbals），且「所有概念互相叠建，做新课时持续复习旧概念」。
- 卖点话术（官网原文）：图式的视觉性 + 拼图感（puzzle-like）帮助记忆；面向对象为 **5 年级至成人**、家庭学校与课堂教师（另一访谈页称其课程为 fifth graders through adults）。
- 定价（官网实开时所见）：学校版（每教师）终身数字访问 $199，家庭版 $149；另有软封面学生/教师用书。此为 2026-11-02 打开页面所载，非长期承诺价。

#### 证据或沿革
- 起源：Alonzo Reed 与 Brainerd Kellogg，1877 年《Higher Lessons in English》；更早有 S. W. Clark 1860 年的气球式图式，未流行（Wikipedia 条目，援引 Florey 2006《Sister Bernadette's Barking Dog》）。
- 地位：1970 年代在美国失去部分支持，欧洲本就不常用；被视为与学术语言学的句法树相对的「传统」系统。条目指出它同时体现了现代句法树的两种关系：基线上的等高排列+竖/斜线 ≈ 成分（constituency）关系，修饰语下挂 ≈ 依存（dependency）关系。
- **效果证据要诚实**：本轮未检索到「图式教学能提升写作」的强实证；相反，§7a 的句子合并研究传统中，图式组常被用作**对照组**且增益弱于句子合并组（Mellon 研究，见 §7a，仅搜索结果）。图式的价值主张主要是「让结构可见、便于讨论和自查」，不是已被证明的写作增益手段。

#### 对中国小学生的适配
- 适配点：与语文课已有的「主谓宾/定状补」话语部分相通；基线骨架对四年级以上、已能认词类的孩子可作**总览图/复习图**；线型区分「宾语 vs 表语」恰好命中中国学生高频混淆点（动作承受者 vs 回指主语）。
- 不适配点：全套图式符号学习成本高，低年级（1–3 年级）和英语词类概念尚不稳的孩子会把精力花在画线规则而非英语本身；原系统为英语母语者书面语设计，画法随句子复杂迅速膨胀。

#### 可照搬点与不可搬点
- **可照搬**：①「骨架先上基线、修饰后下挂」的两步呈现顺序——App 里先只亮主谓宾、再逐层展开修饰，正合「界面即内容形式」；②宾语竖线 / 表语斜线的**线型语义**，是现成的视觉隐喻；③O'Brien 的课程序列与「每课一新线型+旧图持续复现」的节奏。
- **不可搬**：整套 Reed-Kellogg 扩展画法（从句、非谓语的全部图式）不要整体移植到小学端；不要把「会画图」设为通关目标——图是理解的脚手架，不是考点本身。

#### 接触等级
**实开**：Wikipedia 条目、Grammar Revolution 官网 Get Smart 页。辅助：UNG Press Books 介绍页、Really Learn English 访谈页为搜索结果片段（仅搜索结果）。

---

### 2. 蒙台梭利语法符号系统（Montessori grammar symbols）与句子分析

#### 这套图示长什么样
（据实开的 Somersfield Academy 学校页，九种词类符号全表）

| 词类 | 符号 |
|---|---|
| 名词 Noun | 大的**黑色三角形** |
| 冠词 Article | 小的**浅蓝色三角形** |
| 形容词 Adjective | 中号**深蓝色三角形** |
| 动词 Verb | 大的**红色圆形** |
| 介词 Preposition | **绿色新月形（crescent）** |
| 副词 Adverb | 小的**橙色圆形** |
| 代词 Pronoun | 高的**紫色三角形** |
| 连词 Conjunction | 小的**粉色短条（bar）** |
| 感叹词 Interjection | **金色三角形叠在金色圆形之上** |

设计逻辑（多页互证，要点）：符号系统是**家族式**的——名词家族都是三角形（名词/冠词/形容词/代词靠大小、深浅、高矮区分），动词家族都是圆形（动词大红圆=能量与运动，副词是依附它的小橙圆）。孩子先学「功能」不先学「名称」：初期叫命名词（naming word）、动作词（action word）、描述词（describing word），词类术语后置（Arborland 介绍页，搜索结果）。

**句子分析（Sentence Analysis）材料**（Somersfield 页 + Trillium Montessori 课程页，均为实开）：把句子「break up」成成分，用材料（大图、Prepared Sentences、练习册、Sentence Analysis Boxes 与 Charts、带问句的箭头）呈现成分间关系；进阶路线从「1 主语 + 1 谓语」起步，逐步到直接宾语、间接宾语、状语扩展、定语扩展、同位语，最终步为「2 主语 + 1 谓语 + 2 直接宾语」（Somersfield 页称材料共七步、每步建于前一步；Trillium 页称起始句型为主语+谓语+直接宾语，随后间接宾语，再到各类从句与简单/并列/复合/并列复合句——两页的起始描述略有出入，此处并列保留）。

#### 怎么用来学一个语法点
以学形容词为例的典型流程（综合实开页）：① 先有词类功能的感官/动作引入（如动词先玩「照卡片做动作」的 charades，名词先给实物贴标签）；② 认识该词类的符号；③ 语法盒（Grammar Boxes）：每个盒子聚焦一种词类，内含符号与句子卡，孩子读句子、把对应木质符号**摆在每个词的上方**；④ 命令卡（Command Cards）：如「Walk slowly over to the door」，孩子照做，在真实动作中体会副词修饰动词；⑤ 句子分析阶段：把句子剪/摆成成分，用问句箭头追问每部分跟谁发生关系。符号摆错位、或「每个符号都要找到位置」的自检，构成即时反馈。

#### 证据或沿革
- 蒙台梭利本人自 20 世纪初发展该套语言材料（Ebbels 2007 综述转述：此类视觉编码法在 20 世纪初已用于儿童，Montessori 1918）。它是后文 §5 Lea 颜色方案、§4 SHAPE CODING 的共同祖先之一（PMC 综述实开确认 SHAPE CODING 融合了 Lea 与 Bryan 两系，而视觉编码传统可溯至 Montessori）。
- 证据形态要诚实：本轮打开的均为学校/课程实践页，**没有检索到针对蒙氏语法符号本身的对照实验**；其「证据」是百年课堂沿用与体系完整性，不是 RCT。

#### 对中国小学生的适配
- 适配点：实体可触摸、低文字门槛，特别适合 1–3 年级「先功能后术语」的顺序——与本 App「先场景后术语」的接地气标准同向；三角形家族/圆形家族的**形状家族隐喻**能把「形容词是名词的小伙伴」这类关系一次讲清；命令卡与 TPR（§7b）天然衔接。
- 不适配点：九符号全套对课时有限的中国课堂偏重；介词「绿新月」等个别符号的形状隐喻对中国孩子不自明，需要本地化的形状故事；蒙氏原体系依赖实体教具与教师呈现（presentation），直接搬到屏幕会丢掉触觉通道。

#### 可照搬点与不可搬点
- **可照搬**：①形状家族制（同词类家族同形状、靠大小/色深分工）——这是全套最值得抄的一点，App 里可作词类层的统一视觉语法；②「符号摆在词上方」的标注交互（拖拽符号到词上、错位即时反馈）；③句子分析的问句箭头（谁做的？对谁做的？）与七步扩句进阶。
- **不可搬**：不要照搬「术语后置到几乎不教」的极端——中国课标考试要认词类名，App 应在功能熟练后明确给出术语（蒙氏小学高段本身也给术语）；实体教具的慢节奏呈现不可原样移植为 App 的推进速度。

#### 接触等级
**实开**：Somersfield Academy 页（符号全表+句子分析七步）、Trillium Montessori 课程页（语法盒/命令卡/句子分析进阶）。辅助：Alison's Montessori、Montessori Daoshi、Arborland 等页为仅搜索结果。

---

### 3. Colourful Semantics（Alison Bryan）

#### 这套图示长什么样
（据实开的 Twinkl 指南 PDF《A Twinkl Guide to Colourful Semantics》，信息源标注为 The Communication Trust；与 Structural Learning 教师指南互证）

按**语义角色 + 提问词**上色，不按词类上色：

| 提问 | 颜色/形状 | 句子成分 |
|---|---|---|
| Who? 谁 | **橙色 orange** | 主语（人/拟人化角色） |
| What doing? 在做什么 | **黄色 yellow** | 动词短语 |
| What? 什么 | **绿色 green** | 宾语/事物 |
| Where? 在哪儿 | **蓝色 blue** | 地点（介词短语） |
| When? 何时 | **棕色 brown** | 时间 |
| To whom? 给谁 | **粉色 pink** | 间接宾语 |
| How? 怎样 | **黑色 black** | 方式 |
| Why? 为何 / 连接 | **紫色 purple** | 原因；紫色长方形也用作连接词（joining words，据另一 Twinkl 指南页，搜索结果） |
| What like? 什么样 | **云朵形 cloud** | 形容词（可「漂浮」到被描述词上方） |
| Whose? 谁的 | **星形 star**（另一指南作 spiky cloud 尖云形，两说并列） | 物主代词 |

细节（Twinkl 指南实开）：系动词（copula，如 is/was）用**黄色菱形（diamond）**呈现，仍属「doing」家族；介词可作「小蓝词（little blue words）」单独引入以专攻介词。官方例句：「Sahira is rolling the ball in the park to Harriet」——Sahira=橙、is rolling=黄、the ball=绿、in the park=蓝、to Harriet=粉。

#### 怎么用来学一个语法点
活动流程（Structural Learning EYFS/KS1 指南，实开）：① 先教橙+黄两色（最小完整句，如 The dog is barking），稳固后逐个加绿、再加蓝，一次只加一色；② 五分钟课型：教师先示范拼一句（边放色卡边自言自语）→ 全班看图共拼 → 两人/个人用自己的色卡拼并说出 → 2–3 人汇报；③ 顺序铁律：**先说后写**——先在颜色垫上说熟，再迁移到带浅色块的书写线，然后色块→彩点→素线，逐步撤除（fade）；④ 找词诀窍（Twinkl 指南）：先找动词（黄），再反问 who kicked? / kicked what? / where? 逐个定位其余颜色。

#### 证据或沿革
- 起源：英国言语治疗师 Alison Bryan 1997 年提出（Bryan 1997, 收于 Chiat, Law & Marshall 编《Language Disorders in Children and Adults》；后续自述为 Bryan 2008「Colourful semantics: thematic role therapy」）。
- 证据：Bolderson et al. (2011)《Colourful semantics: A clinical investigation》, Child Language Teaching and Therapy 27(3): 344–353——Structural Learning 页称其在受控条件下、5–6 岁儿童上显示语法与平均句长改善，干预形态为每周两次、持续数周。学校场景的混合方法评估（2024，Structural Learning 页 Further Reading 所引）称小组干预显著提升句子结构与言语长度；同时该页诚实提示：增益在句子层面指标上比标准化测验上更清楚，学校端证据仍在发展中。

#### 对中国小学生的适配
- 这是与中国小学生**最贴**的一套：它绕开词类术语、用孩子能懂的问题（谁？在干嘛？）组织句子，正对中国学生两大痛点——句子成分残缺（漏主语/漏宾语）与语序受中文干扰。EAL（英语为附加语言）儿童正是其英国课堂的主要受益人群之一，Structural Learning 页专门论述了用图+色给非母语儿童显形语序的用法。
- 注意移植成本：颜色表必须**全 App 统一且长期不变**（该体系明确「specific colours and shapes that must be followed」）；棕色（when）与中文教材常见的时间标注习惯无冲突，但紫色一色两用（why 与连接词）在 Twinkl 两个版本间表述不一，落地前要定版。

#### 可照搬点与不可搬点
- **可照搬**：①问题词驱动的成分槽（橙黄绿蓝四槽起步）可直接做 App 造句器的骨架；②「先说后写、颜色逐步撤除」的脚手架撤除路径；③云朵形形容词「可漂浮」——形容词位置灵活这一英语特点被形状本身讲清了；④先找动词再反问的定位算法，可做成 App 的自检提示逻辑。
- **不可搬**：不要把它的颜色与 SHAPE CODING / 蒙氏颜色混用在同一界面层（见 §4 冲突警告与文末综合）；其原始人群是语言障碍儿童，节奏（两色停留数周）对普通中国小学生太慢，应压缩为「两色一课起步、四色快速合流」。

#### 接触等级
**实开**：Structural Learning「Colourful Semantics in EYFS and KS1」、Twinkl 指南 PDF（经 Alfred Sutton Primary 学校站托管）。辅助：London Speech and Feeding、Twinkl 博客指南等为仅搜索结果。

---

### 4. SHAPE CODING（Susan Ebbels）

#### 这套图示长什么样
（据实开的 Balthazar, Ebbels & Zwitserlood 2020, Language, Speech, and Hearing Services in Schools 51: 226–246, PMC 全文）

四层编码叠加：

**第一层：形状 = 短语/句法角色（每个形状绑定一个提问词）**

| 形状 | 提问 | 句法角色 |
|---|---|---|
| 椭圆 Oval | Who/what? | 外部论元名词短语（主动句主语） |
| 长方形 Rectangle | Who/what? | 内部论元名词短语（宾语等，嵌在其他形状内） |
| 云朵 Cloud | What like / how feel? | 形容词短语 |
| 半圆 Semicircle | Where? | 通常为介词短语 |
| 六边形 Hexagon | What doing? | 动词短语 |
| 菱形 Diamond | — | 助动词 / 系动词 / 情态动词 |
| 三角形 Triangle | When? | 时间成分 |
| 旗形 Flag | How? | 方式成分 |

形状可**互相嵌套**（如长方形宾语嵌进六边形动词短语），也可移动并留下痕迹（trace），用黑箭头连回原位——这是它能画被动句和问句移位的关键，也是它自称胜过「只有颜色」系统之处（Ebbels 2007 原文要点：shapes can be placed inside each other, thus showing hierarchical structure; shapes can be moved around to show question and passive formation）。

**第二层：颜色 = 词类（2020 综述表 3）**

| 颜色 | 词类 | 例 |
|---|---|---|
| 红 Red | 名词与代词 | dog, chair, he, him |
| 粉 Pink | 限定词与物主代词 | the, a, his |
| 蓝 Blue | 动词 | sleep, snore |
| 绿 Green | 形容词 | small, sad |
| 黄 Yellow | 介词 | on, under, beside |
| 棕 Brown | 副词 | slowly, fast |
| 紫 Purple | 并列连词 | and, but, or |
| 橙 Orange | 从属连词 | when, if, because |

> ⚠️ **版本冲突（必须在落地前裁决）**：Ebbels 2007 原论文（Child Language Teaching and Therapy 23(1): 67–93）表 1（本轮仅见搜索结果片段，未打开全文）作：红=名词/代词、粉=限定词/所有格、黄=**动词**、绿=形容词、蓝=**介词**、紫=并列连词、橙=从属连词。即 2007 版与 2020 版的**动词/介词黄蓝互换**。可能原因（版本演变 / 转载讹误）本轮无法判定。Moor House Institute 官页（实开）只确认四层构成（形状=句法结构、颜色=词类、箭头=时态体、线=性与复数），未给出逐项颜色表。**结论：形状表与箭头/线规则可据 2020 综述放心用；颜色表须另行核对 Moor House 现行官方材料后定版。**

**第三层：单/双线 = 单复数与主谓一致**：单数名词/动词下划单线，复数下划双线；椭圆里红色双线就要求菱形里的蓝色助动词也是双线（are/were），以此堵「the boys is running」「the boy and his dog is running」类错误。

**第四层：箭头 = 时态**：有时态的动词带竖箭头——箭头在**线条中点 = 现在时**，在**左端 = 过去时**；进行分词的 -ing 下划锯齿线（zigzag）表持续体；过去分词另有向左的水平箭头（据 SHAPE CODING 官方幻灯，搜索结果：horizontal arrow pointing left = past participle；vertical arrow = finite verb）。教学口令：每个句子必须有「一个向下的箭头」（即一个有时态的动词），且须与 When 三角形里的时间箭头对齐。

#### 怎么用来学一个语法点
标准七步（2020 综述「Practicalities」节，实开）：① 治疗师选定目标结构，用 SHAPE CODING 演示并用小人偶在形状上演出来；② 按目标做形状模板（纸面/覆膜形状/App）；③ 师幼轮流按模板造句（口头/书写/App 内）；④ 轮流用小人偶把对方的句子演出来（尤其服务于理解目标）；⑤ 讨论并改正「改变了意思或不符合模板」的错误；⑥ 撤掉模板再产出，再拿模板回来核对；⑦ 泛化阶段：创设必用该结构的情境，口头提醒规则（「oops, you missed a diamond」）。

入门路径：从孩子已会说的完整句开始，最常见起点是主谓句「the man is laughing」（现在进行时）——先让孩子懂「the man 进椭圆、回答 who?；laughing 进六边形、回答 what doing?」，覆膜形状背面写问题、正面写短语，翻转即见问答对应；再进主谓宾「the dog is chewing a bone」，点明「what doing 的答案可以不止一个词」。

个案示例（过去时形态，Calder et al. 研究线）：用后箭头表过去时间、在六边形蓝词上加 -ed 并标注其 /t, d, ɪd/ 三种读音（SHAPE CODING 官网研究海报，搜索结果）。

#### 证据或沿革
这是本调研中**证据最硬**的一套（2020 综述表 1 汇总，均为 DLD 儿童研究）：
- RCT 1（Ebbels et al. 2007）：11–16 岁，N=27，动词配价产出，SHAPE CODING 组 vs 对照 d=1.3（大效应），维持 3 个月，泛化到未教动词。
- RCT 2（Ebbels et al. 2014）：11–16 岁，N=14，并列连词理解，d=1.6；等待对照接受干预后 d=2.1；TROG-2 泛化 d=1.4，维持 4 个月。
- 过去时形态（Calder et al. 2020）：5;10–6;8 岁，N=9，每周 2 次、10 周、每课 50 试次；8/9 在已教动词上显著进步（d=0.9），7/9 泛化到未教动词（d=0.8），维持 5 周——这是与小学低龄段最接近的一条。
- 其他：被动与 wh- 问句（Ebbels & van der Lely 2001，多重基线）、单复数助动词（Tobin & Ebbels 2019，含唐氏儿童，d=0.92）、聋童个案（10 次 30 分钟个训后目标与未目标动词均显著进步，UCL 章节摘要）。
- 沿革：Ebbels 明言该系统融合 Lea（1970）Colour Pattern Scheme 与 Bryan（1997）Colourful Semantics 并加以扩展（加形状与箭头以编码复杂句法与动词形态）；SHAPE CODING 为 Moor House School & College 的英国注册商标（No. 3284600）。

#### 对中国小学生的适配
- 适配点：中国小学生的高频硬伤——三单 -s、过去时 -ed、be 动词单复数、进行时漏 be——全部落在它的第四层（箭头）与第三层（单双线）的射程内，且有低龄段（6 岁）证据。它是唯一能把**形态**（词尾）画出来的系统，Colourful Semantics 画不了词尾。
- 不适配点：全系统学习负担最重（8 形状 + 8 颜色 + 线 + 箭头），原设计是个训/小组治疗工具、由治疗师按孩子缺陷逐项启用（「only some aspects will be required」），不是全班统一进度课；App 若整套端给普通小学生，必然过载。

#### 可照搬点与不可搬点
- **可照搬**：①「只启用当前目标需要的那几件编码」原则——App 按语法点逐个解锁编码维度（学时态才出箭头，学一致才出双线）；②时态箭头位置语义（中点=现在、左端=过去）与「每句必须有一个向下箭头」的自检口令；③单/双线一致性校验做成 App 的自动检查（主语双线↔动词必须双线）；④七步流程中的「撤模板→再产出→拿模板核对」与「用小人偶演对方的句子」可直接转成 App 关卡与情境剧。
- **不可搬**：颜色表在版本冲突裁决前不可照搬（见上）；形状全套（旗形、云朵等）不必全抄，抄「椭圆主语/六边形动词短语/长方形宾语」三件核心即可；商标与官方 App/培训为商业体系，借鉴机制可以，名称与图稿不可冒用。

#### 接触等级
**实开**：PMC 综述全文（含表 1–3、七步流程、证据汇总）、Moor House Institute 官页。Ebbels 2007 原论文颜色表与官方幻灯的时态箭头细节为**仅搜索结果**（PDF 未打开）；聋童章节为**摘要**。

---

### 5. 颜色编码句法在教材 / 产品中的实现

本节的任务是找「找得到的具体产品」。结论先行：**名为《Grammar in Colour》的教材本轮未核实到**（见缺口总账）；核实到的具体实现有以下三个，恰好构成一条历史链。

#### 5.1 Lea 的 Colour Pattern Scheme（1970）——链条的源头
- **长什么样**：按句子的表层结构给**词类**上色（名词、动词、形容词各一色），与 Colourful Semantics 的「按语义角色上色」相对（Ebbels 2007 综述语，搜索结果）。SHAPE CODING 的基本颜色「with a few minor modifications」即沿用 Lea 的表（Ebbels & van der Lely 2001，搜索结果）。
- **沿革**：Lea, J. (1965)「A language system for children suffering from receptive aphasia」, Speech Pathology and Therapy 8: 58–68；Lea, J. (1970)《The colour pattern scheme: a method of remedial language teaching》, Moor House School 出版（书目信息据 Open Library 页，搜索结果）。
- **接触等级：摘要/仅搜索结果**——原书未打开，逐项颜色表**未核实**，App 不可据本节配色。

#### 5.2 Fitzgerald Key（Edith Fitzgerald, 1926/1929）——聋教育中的六栏句格
- **长什么样**：一个按疑问词与符号分栏的**六栏（six-column）方案**，栏头代表句子成分与功能；学生按栏位顺序（主语、动词、宾语、形容短语等）把词放进对应栏，拼出线性正确句，并用它自查自纠（据聋教育课程史综述，搜索结果）。后世在 AAC（辅助沟通）领域的 Modified Fitzgerald Key 把它颜色化：如绿=动词、黄=代词、橙=名词（Communication Community 页，搜索结果）；亦有聋生英语电子书设计采用「名词蓝、动词红、补足语绿」的 Fitzgerald 式配色（Mendeley 数据集论文，搜索结果）——**两个来源配色互不相同**，说明该传统在传播中并无统一色表，不可当标准抄。
- **沿革**：Edith Mansford Fitzgerald《Straight Language for the Deaf》（1926），作者本人为聋人教师；该法曾用于美国约四分之三的聋校（Wikipedia 条目，搜索结果）。课程史综述同时指出：Wing Symbols、Five Slate、Fitzgerald Key 这代「盒子式造句」系统**没有正式效果研究，只有轶事性口碑**，其泛化目标是否达成存疑。
- **接触等级：仅搜索结果**（本轮未打开任一 Fitzgerald 原文页）。

#### 5.3 产品实证：Introductory English Grammar and Vocabulary with Color Key（实开评测）
- **产品形态**：English Computerized Learning Inc. 的软件（下载/订阅制），面向初学英语者：20 个语法单元、695 个词汇、577 张图、41 个练习。TESL-EJ 2007 年评测（Vol. 11 No. 2）实开。
- **图示长什么样**：句中**每个词都按其词类着色**，屏幕左侧常驻图例（legend）；教学逻辑是让学习者把「颜色顺序」记成语序——评测原文举例：学习者会记住「绿色（代词）在黑色（动词）之前」，于是知道 I walk 对、Walk I 错。单元结构为：词汇表 → 简短定义 + 结构「公式」+ 例句 → 选择题练习（含图片题），另有前后测（各 46 题，题中词同样着色）。
- **评测的批评（对 App 设计直接有用）**：① 只靠颜色增强输入对色盲者不友好，应叠加字号/高亮/声音等其他线索（引 Jamieson et al. 2004）；② 着色的词类没有随手可查的定义链接，学生离开软件后难以自产句子；③ 练习全是选择题式操练，缺少真实互动任务；④ 前测时学生还没学过色表，颜色只会造成干扰。
- **证据定位**：其理论依据是「视觉增强（visual enhancement）能提升对语言形式的注意」（评测引 Chapelle 2003; Jamieson, Chapelle & Preiss 2004），属注意引导层面的依据，非该产品自身的对照实验。

#### 本节小结：教材色码的共同规律
三个实现共享同一机制——**颜色的价值不在认词类，而在把语序变成可记忆的颜色串**；共同教训也一致：色表不统一则跨教材迁移归零、纯颜色对色盲与低龄前测阶段是负担、颜色必须与「能产出句子」的任务绑定才有效。对本 App 的直接含义：**自选一套色表、全 App 终身一致，比抄任何名家色表更重要**；且颜色之外必须叠加形状或位置冗余编码（这正是 SHAPE CODING 在 Lea 之上加形状的原因）。

#### 接触等级
5.1 **摘要**；5.2 **仅搜索结果**；5.3 **实开**（TESL-EJ 评测全文）。

---

### 6. 构式 / 情境剧场类：故事呈现语法

#### 6.1 Grammar Tales（Scholastic）——一本绘本一条规则

##### 这套图示长什么样
不是图示系统，而是「故事即讲解」：盒装 10 本全彩绘本（每本 16 页，8"×10"）+ 120 页教学指导（含每本的迷你书版本与练习页）。10 本各攻一条 usage/mechanics 规则：名词、动词、形容词、副词、代词、大写、逗号、引号、句子结构、校对（各产品页列目略有出入：有的列出形容词未列副词、有的相反，此处合并列出并注明）。定位 Grades 3 & Up，初版 2004 年，ISBN 9780545067706（产品页实开）。

##### 怎么用来学一个语法点
读 aloud 一个荒诞好笑的故事，目标规则在故事里被反复、夸张地「演」出来（如某角色只会说名词），读后再用教学指导中的课与迷你书复现、练习。规则不是先定义后举例，而是**先在情节里出丑/出彩，再被点名**。

##### 证据或沿革
商业出版物，无公开效果研究（本轮未检索到）。其可考的「沿革价值」在品类层面：Scholastic Teaching Resources 的成熟产品线、2004 年至今多渠道在售，证明「一故事一规则」在小学中段（Grade 3+）有稳定市场形态。

##### 对中国小学生的适配 / 可照搬与不可搬
- 可照搬：**一集一规则、规则由角色行为承担**的结构——与本 App 已定的白板剧场/情境剧路线（先故事、后冻结标注）同构；10 本的选题清单（词类五件 + 标点四件 + 句子结构）可作小学语法「规则剧场」的选题参照。
- 不可搬：原书笑点与文化梗为英语母语儿童写，文本不可直译套用；它教的是 usage/mechanics（用法与书写规范），不教句法结构本身，不能替代 §3/§4 的结构图示。故事必须用中国孩子的生活场景重写（接地气标准）。

##### 接触等级
**实开**（DK Outlet 的 Scholastic 产品页）；其余书目信息为仅搜索结果。

#### 6.2 Story Grammar Marker（SGM, MindWing Concepts）——图标链复述法

##### 这套图示长什么样
一根「标记棒」上串一排图标，每个图标 = 一个故事语法成分（据 SGM 演示文稿，搜索结果；成分清单与实开的 Speechy Musings 教学资源页互证）：
脸 Face = 人物 Character；星 Star = 背景 Setting（何时何地）；鞋 Shoe = 触发事件 Kick-Off（开场「踢球」把故事踢动）；心 Heart = 感受/内部反应；手 Hand = 计划 Plan；指环 Rings = 尝试/行动 Attempts（可多次）；蝴蝶结 Bow = 直接结果 Consequence（把故事「系上」）；心+线 Hearts & Strings = 结局 Resolution（感受+教训）。
教学资源页（实开）的九成分版作：人物、背景、起始事件（Liftoff）、问题、感受、计划、行动、解决、收尾反应——与 SGM 图标版是同一骨架的两种切分。

##### 怎么用来学一个语法点
三级进阶（教学资源页实开）：Level 1 用海报/图标/配对卡逐个认成分 → Level 2 把成分归入开头/中间/结尾并练过渡词 → Level 3 在 15 篇 3–5 段的完整短故事里标出全部成分，再用图形组织器（graphic organizer）自己编故事。它本身教的是**叙事结构**而非句法；与语法的接口在：用图标链逼出 because / so / then 等连接与从句，以及过去时叙事的一致性。

##### 证据或沿革
SGM 由 Maryellen Rooney Moreau（MindWing Concepts）开发（演示文稿，搜索结果）；其实践资源宣称附 ASHA 系统综述的故事语法干预引文页（教学资源页原文：includes an evidence-based practice page with research citations from ASHA's systematic review on story grammar interventions）——本轮未打开该综述原文，证据强度记为**资源方宣称、未独立核实**。

##### 对中国小学生的适配 / 可照搬与不可搬
- 可照搬：图标链是「看图写话/故事复述」的现成骨架，中国语文课本就有看图说话传统，迁移成本低；「鞋=触发事件」这类**图标隐喻命名**值得学——每个图标自带一个孩子能复述的比喻。
- 不可搬：SGM 是叙事工具，不是语法图示；不要把它当语法区的结构方案，它只能作「故事语法/时态叙事」子模块的骨架。图标与 MindWing 为商业产品，借鉴成分切分可，图稿不可抄。

##### 接触等级
成分与三级流程 **实开**（Teachers Pay Teachers 资源页）；图标-成分对照表 **仅搜索结果**（SlideToDoc 演示文稿 + MindWing 官方博客搜索片段）。

---

### 7. 其他强相关做法

#### 7a. Sentence Combining 句子合并（经典研究线）

##### 这套做法长什么样
无图示，是一种「操作式」语法学习：给学生几个内核句（kernel sentences），要求合并成一个更成熟的句子（如把「The dog barked. The dog was big.」合并为带定语/状语的单句），另有反向的 decombining（拆句）练习。它在本文中的位置特殊：**它是图示化路线最强的对照证据**——多项经典研究中，图式/形式语法组恰是被它击败的对照组。

##### 怎么用来学一个语法点
以学定语从句为例：不讲「关系代词」定义，直接给内核句组与合并信号（提示词/下划线），让学生在合并操作中自己用出 who/which 结构；教师只评判合并结果的自然度。O'Hare (1973) 的关键设计正是**完全不教形式语法术语**、只做合并练习。

##### 证据或沿革（本节全部为仅搜索结果，未打开全文，数字转引自研究综述片段，引用时请回查原文）
- Mellon (1969, NCTE Research Report)：250 名七年级生三组对照——普通语法组、图式组、合并+语法组；合并组一年增益为对照组的 2–3 倍（据综述片段）。另一综述的表述更谨慎：Mellon 组「句法流利度有增益、整体写作质量无增益」，两说并列。
- O'Hare (1973)：七年级生只做合并练习（不教形式规则），句法与整体写作质量均优于只学形式语法的对照组。
- Daiker, Kerek & Morenberg (1978/79)：大学一年级生经不到一年的合并练习，句法成熟度从高三水平升至大二/大三水平。
- Graham & Perin (2007) 青少年写作元分析：4–9 年级 5 项研究，句子合并对写作质量平均效应量 0.50（中等）（据 MTSU 学位论文转引）。
- Hillocks (1984/86) 综述结论：句子合并在提升句法复杂度上 consistently 优于教词类、画图式、教转换语法规则等其他语法途径（据学位论文综述片段）。
- 反方声音同样在案：Ney (1976) 未发现合并组增益；研究间在练习量、年龄、评分标准上变量难控（WAC 综述片段）。故结论应表述为「证据总体偏正、非无争议」。

##### 对中国小学生的适配 / 可照搬与不可搬
- 可照搬：这是对 App 语法区**性价比最高的一条**——「给内核句→拖拽合并→对比原句」天然是触屏交互，且不需要孩子先懂任何术语；与 §3 的颜色槽结合（先按色槽摆对成分，再学合并）可形成「摆句→扩句→并句」的进阶链。中国学生作文句子短、并列流水句多，正是合并练习的靶心。
- 不可搬：经典证据人群是英语母语 7 年级与大学生，外推到中国小学生 EFL 场景需本地验证；合并练习若无意义语境会退化为机械操练，需嵌入故事/场景。

##### 接触等级
**仅搜索结果**（综述与学位论文片段；Mellon/O'Hare 原始报告未打开）。

#### 7b. TPR 全身反应（Total Physical Response, James Asher）

##### 这套做法长什么样
无纸面图示，图示在身体上：教师用目标语发指令并示范全身动作，学生用全身动作回应，先不要求开口。语法不显性教授，靠输入归纳（Wikipedia 条目原文：Grammar is not taught explicitly but can be learned from the language input；lessons are organized around grammar, and in particular around the verb，以祈使句为课堂主轴）。

##### 怎么用来学一个语法点
以学介词短语为例：指令从已知词的新组合开始滚雪球——「Stand up」→「Stand up and clap」→「Put the book **on** the table / **under** the chair」，学生靠动作对错证明理解；新词每课限量（Asher 建议每小时 12–36 词，视水平与班额）；错误少纠正（像父母对幼儿那样，初学阶段多放过）。进阶活动为角色扮演、小品、故事讲述；（与故事结合的 TPR Storytelling 另成 TPRS 一系，源头为 Blaine Ray，本条目注明二者不要混淆。）

##### 证据或沿革（据实开的 Wikipedia 长条目）
- James Asher（圣何塞州立大学心理学教授）基于对幼儿一语习得的观察提出三假设：语言主要靠听学得；学习须调动右脑（运动）；学习不应有压力。主著《Learning Another Language through Actions》(1977)。
- Asher 自称 TPR 是「field 中被研究得最充分的方法之一」，其本人俄语学习实验中成人组优于儿童组；土耳其 2018 年研究（Oflaz）：每周 2 小时、6 周，高焦虑学生焦虑降至中等水平且更愿意开口；2025 年 EFL 词汇对照研究：TPR 组后测显著高于 Kahoot 组（条目转引，本轮未打开原文）。
- 批评（条目 Reception 节）：常被指只适合初学者；过度使用祈使句会让学习者在真实交际中显得无礼；不给学生创造性表达自己想法的机会；害羞学生适应难。

##### 对中国小学生的适配 / 可照搬与不可搬
- 可照搬：App 端的等价物是「角色按指令动起来」的动画/拖拽——让屏幕小人执行孩子拼出的句子（put the cat under the box），动作对错即语法对错的反馈。这与蒙氏命令卡（§2）、SHAPE 的「小人偶演句子」（§4）是同一机制的三种实现，可互为印证。最适合：动词短语、方位介词、祈使句、进行时（正在做动作）。
- 不可搬：TPR 的语法观是「不教、靠归纳」，与本 App「规律要显性总结」的定位相反——只借它的**验证方式**（用动作证明理解），不借它的隐性语法立场；其证据多为词汇/听力层面，不可宣称它能教时态形态。

##### 接触等级
**实开**（Wikipedia 条目全文）；条目内转引的 2018/2025 研究为**摘要**级。

---

### 综合：给语法区设计的取舍建议（基于以上实据）

1. **分层选型，不要一套打天下**：低龄/造句层抄 Colourful Semantics（问题词色槽，先说后写、渐撤）；形态层抄 SHAPE CODING 的箭头与单双线（时态、一致、三单、-ed，这是其他系统画不出的）；总览/复习层借 Reed-Kellogg 的「基线骨架+下挂修饰」两步展开；词类视觉语言借蒙氏的形状家族制。四个系统各管一层，恰好互不重叠。
2. **颜色只能有一套主人**：Colourful Semantics 按角色上色、SHAPE/Lea 按词类上色，两套颜色在同一界面必然打架（且 SHAPE 自身还有 2007/2020 版本冲突）。App 须先定一条总规：哪个层用角色色、哪个层用词类色、永不混层；色表一经选定全 App 终身一致（§5 的历史教训）。
3. **颜色之外必须有冗余编码**：形状/位置/线型至少再叠一维（Color Key 评测对色盲的批评 + SHAPE 在 Lea 之上加形状的演化，都指向同一结论）。
4. **练习形态优先抄句子合并**：图示负责「看懂结构」，合并负责「用出结构」；经典研究里恰是操作（合并）而非画图带来了写作增益。语法区的产出关卡应以合并/扩句为主、画图辨认为辅。
5. **故事层用 Grammar Tales 式「一集一规则」+ SGM 图标链**：规则由角色行为承担、图标各带一个可复述的隐喻名；但文本必须按中国孩子的生活场景重写，不可直译。
6. **每个图示都要预设撤除路径**：Colourful Semantics 的「色块→彩点→素线」是全场最完整的脚手架撤除设计，App 的每个视觉编码都应有同样的淡出阶梯，避免孩子对颜色/形状形成依赖。

### 缺口总账（未核实，不许据此落地）

| # | 缺口 | 状态 |
|---|---|---|
| G1 | 名为《Grammar in Colour》的具体教材/产品 | 多轮检索未找到同名可信产品页；找到的是 Color Key 软件（§5.3）与 Lea/Fitzgerald 传统。「Grammar in Colour」可能为任务方的泛称或某小众产品，未核实到即不存在于本文结论中 |
| G2 | SHAPE CODING 颜色表 2007 vs 2020 冲突（动词/介词黄蓝互换） | 两说均有出处、无法在本轮判定；须查 Moor House 现行官方培训材料/官方 App 后定版 |
| G3 | Lea Colour Pattern Scheme 逐项颜色表 | 原书（1970）未打开，仅有「按词类上色」的二手概括 |
| G4 | Fitzgerald Key 六栏的逐栏栏头与符号 | 仅搜索结果层面的概括（六栏、疑问词+符号），栏头原文未核实；且后世改版配色互不一致 |
| G5 | Colourful Semantics 的 Whose 形状（星形 vs 尖云形）与紫色分工（why vs 连接词） | Twinkl 不同版本表述不一，落地前需定版 |
| G6 | 蒙氏句子分析的箭头问句全表（如各成分对应的标准问句与箭头颜色） | 本轮只核实到「七步进阶 + 问句箭头材料」的概括层；Montessori Commons 的分级呈现页仅见搜索片段，未打开 |
| G7 | Reed-Kellogg 从句/非谓语的扩展画法细节 | Wikipedia 只提「有扩展画法」，未逐一核实；小学段大概率用不到，暂缺 |
| G8 | 句子合并经典研究（Mellon 1969 / O'Hare 1973）原始报告 | 仅综述转引，效应数字引用前须回查原文；且存在 Ney (1976) 等反例 |
| G9 | Story Grammar Marker 的 ASHA 系统综述原文 | 仅见资源方的「附引文页」宣称，未独立核实证据强度 |
| G10 | Grammar Revolution 对低龄（<5 年级）的适用性 | 官网自述对象为 5 年级至成人；其向低龄下探的效果无来源支持 |

### 主要来源清单（实开页）

- Wikipedia: Reed–Kellogg sentence diagram — https://en.wikipedia.org/wiki/Reed%E2%80%93Kellogg_sentence_diagram
- Grammar Revolution: Get Smart Grammar Program — https://www.english-grammar-revolution.com/get-smart-grammar-program.html
- Somersfield Academy: The Montessori Approach to the Language Arts — https://mysomersfield.com/news/the-montessori-approach-to-the-language-arts-phonics-amp-word-study
- Trillium Montessori: Montessori Elementary Language Curriculum — https://www.trilliummontessori.org/montessori-elementary-language-curriculum/
- Structural Learning: Colourful Semantics in EYFS and KS1 — https://www.structural-learning.com/post/colourful-semantics-eyfs-ks1
- Twinkl: A Twinkl Guide to Colourful Semantics（PDF） — https://alfredsuttonprimary.co.uk/wp-content/uploads/sites/8/2024/09/Colourful-semantics-guide.pdf
- Balthazar, Ebbels & Zwitserlood (2020), PMC — https://pmc.ncbi.nlm.nih.gov/articles/PMC7225018/
- Moor House Institute: SHAPE CODING™ System — https://www.moorhouseinstitute.com/shape-coding-system/
- TESL-EJ 11(2): Introductory English Grammar and Vocabulary with Color Key 评测 — http://tesl-ej.org/ej42/m3.html
- Scholastic Grammar Tales 产品页 — https://shop.dkoutlet.com/grammar-tales-bxs
- Speechy Musings: Learning Identifying Story Grammar Parts（TpT） — https://www.teacherspayteachers.com/Product/Learning-Identifying-Story-Grammar-Parts-in-Narratives-Stories-Speech-Therapy-3451176
- Wikipedia: Total physical response — https://en.wikipedia.org/wiki/Total_Physical_Response

*成稿日期：2026-11-02。本文件仅为调研稿，未改动任何 App 文件，未做 git 操作。*

---

## 第五章 · 综合缺口总账

各路自身的缺口总账附在各章文末（书籍线 13 条、网站线、图示线 10 条），此处只记跨章与分析侧的缺口：

1. **Khan Academy 语法纲目未直开核实**（网站线）：官网 0 页打开，该节据二手概述与转载拼合，纲目细节标「待核」——若提案要引用其纲目顺序，须补核后才可作为定版依据（本提案未依赖它）。
2. **BBC 栏目为镜像全文核实**（网站线）：bbc.co.uk 直连未开，条目结构据完整转载页核读，结构可信、版式细节（配色/组件）未亲见。
3. **SHAPE CODING 配色版本冲突**（图示线 G2）：2007 原论文与 2020 综述的动词/介词配色互换（黄↔蓝）。落地任何颜色编码前，必须查 Moor House 现行官方材料定版，不可直接抄任一表——本提案因此只抄它的「箭头表时态、单双线表一致」画法，不抄配色表。
4. **《Grammar in Colour》同名教材未核实到**（图示线 G1）：该节以实证到的 Color Key 软件与 Lea/Fitzgerald 颜色传统替代，未编造该书内容。
5. **分析侧口径差**：App 语法区首页徽标显示「有病例 18」，与模型层实测真病例 24 条不一致——渲染/计数口径待查（不影响本报告以模型层为准的结论，但集成前要对齐）。
6. **grammar_ext 的 CO（17 条）/QI（15 条）两族未逐条深查**：本报告只核了它们对 GR 的引用计数，其内容与 GR-30/32/33 等句法条目的重叠程度未逐条比对——原型第一批若动句法站，需先补这轮比对。
7. **中国语法书三本仅搜索摘要级接触**（书籍线）：章振邦/薄冰/张道真的纲目骨架来自出版社与书目页摘要，未开样章；提案中引用其体系处只用了纲目层级的大结构（词法/句法、句子成分体系），未引细节。

---


---

## 第六章 · 语法区原型设计提案

### 6.1 第一性组织：四种纲的利弊与推荐

语法是句子系统，「按什么排」决定孩子第一眼看到的是目录还是操作台。四种候选纲：

| 纲 | 排法 | 利 | 弊 |
|---|---|---|---|
| 形式纲 | 按形态清单排（时态→一致→复数→比较级…） | 完整、好对账，Azar 20 章与章振邦都证明它是最稳的**后台体系** | 前台就是「知识点目录」——现 GR 列表的病根；孩子看到条目，看不到句子 |
| 岗位纲 | 按词类排（名词岗/动词岗/形容词岗…） | 与词根区的词类观一致、好定位 | 语法的大头是词与词的**关系**（一致、语序、辖域），岗位装不下关系；且名词/代词/冠词已有专区，必然重复建区 |
| 功能纲 | 按语法在干什么活排（指认→述说→修饰→连接→聚焦） | 最贴 GR-01 自己的纲领（形式跟着功能走），解释力强 | 分类抽象，孩子拿它当不了操作台；适合做成人层体系图与条目归类维度 |
| **句子骨架纲** | 按句子的槽位与操作排（谁→做什么→什么/怎样→扩展→连接） | 一切语法操作都发生在一句话里，骨架是唯一能**动手**的纲：Colourful Semantics 四问色槽、蒙台梭利句子分析、SHAPE CODING 三家都证明孩子能直接操作槽位；且天然给出课序（先骨架、后扩展、再连接） | 形态细节（词尾规则）不在骨架本身——需在槽位上挂「标记站」承接，正好由动词区 TA 与形态规律分工 |

**推荐：前台骨架纲 + 后台形式纲 + 条目按功能问题切分。** 即书籍线结论的落地形态：体系顺序（Azar×章振邦的形式纲体系图）藏进成人层保证不漏；进入顺序永远是孩子这一句话的一个问题（Swan 的一页一问切分 × Murphy 的左讲右练模板）；操作的骨架是句子槽位（Colourful Semantics）。

**界面如何反映这个结构**：语法区首页不是列表，是一张**句子工坊台**——一条可操作的句子骨架横在页面上：〔谁〕〔做什么〕〔什么·怎样〕三个大槽，槽下挂「扩展挂钩」，句尾留「连接口」。每个槽位与每种操作是一个站点面板，点开进该站的学习件。孩子打开语法区第一眼看到的，就是语法的形状：一句话的骨架，和它身上能做的全部操作。45 条规律一条不上首页——它们退到总论（成人层体系图）与各学习件的页脚「依据」里。

### 6.2 与相邻区的边界

- **时态/体 → 学在动词区，本区只留原则页。** TA 18 站 + 时间机器是既成资产，不搬不动。GR-02（时态只标一次）、GR-03（do 替补）在本区做成「原则卡 + 直达按钮」：讲清为什么，练习跳 TA 对应站。工坊台的〔做什么〕槽点开先见这两张原则卡，再进 TA。这样终结目前「两处各写一套、互不引用」的状态：原则归 GR、操练归 TA，引用关系在数据层登记死。
- **动词形态（三单、过去式家族、八词尾）→ 规则在本区，操练在动词区/词根区。** GR-04/06/29 在本区只讲源流与机制（它们本来就是史话型条目），变形表与词族操练留在动词区现有页面，本区页脚挂直达。
- **句型/句子操作 → 归语法区。** 这是骨架纲的主场：GR-30/32/33/34/35/38 的学习件在本区建。动词区的「句型四分表」是动词搭配视角（动词后跟什么），与本区互链不合并——四分表管动词选宾语，本区管句子层面的连接、语序与辖域。
- **冠词/代词 → 系统在各专区，本区只留原则与指路。** GR-15（a/an 听声音）、GR-14（格随位置）、GR-13（所有格是关联标记）各做一张原则卡并指路专区，主体教学不重复建。
- **名词短语与形容词座次（GR-43/44/45）→ 归语法区。** 它们是句子槽位内部的装箱规矩（骨架的「扩展包」站），不是词条知识，不进词汇区。

### 6.3 GR-45 去向（按语法实际重定的四类）

| 去向 | 条数 | 条目与落点 |
|---|---|---|
| **甲 · 可操作学习件**（句子工坊的站点） | 16 | GR-02 句子手术·标记一次（错句台）／GR-07 情态力场（推力·障碍拖拽图）／GR-11 连接口·because-so 二选一／GR-12 一致配对台（三力拉锯可视）／GR-22 病句医院总站（按错误集中区地图分诊）／GR-28 复数家族宿舍（分家游戏）／GR-30 从句认人牌／GR-31 比较级天平／GR-32 关联词成对门／GR-33 反意疑问回声机（已有件，收编为样板）／GR-35 only 辖域滑杆／GR-36 使役力气队／GR-38 标点手术／GR-43 形容词排队（拖拽座次）／GR-44 名词短语装箱（一）／GR-45 名词短语装箱（二·轻重排队） |
| **乙 · 引擎与呈现规则**（不当页面，当产品逻辑） | 7 | GR-01 全区呈现纲领（一页一问、左讲右练的模板来源）／GR-17 noticing → 例句高亮与「先看见」呈现规则／GR-19 频率 → 站点排序与复现引擎／GR-20 语块先行 → 课序原则（整句先行、规则后拆）／GR-21 讲解及格线 → 每个学习件的文案验收标准／GR-25 难点预测 → 中国孩子错误权重，决定站点优先级／GR-27 概率口径 → 全区文案禁用绝对化表述（说「多半」不说「总是」） |
| **丙 · 原则页 + 指路**（本体在别区） | 8 | GR-03 → TA 的 do 站／GR-04 → 动词区三单页／GR-06 → 动词区过去式家族／GR-13 → 代词区所有格／GR-14 → 代词区格系统／GR-15 → 冠词区 a/an／GR-29 → 动词区/词根区八词尾卡／GR-41 → 动词区 used to 三兄弟 |
| **丁 · 成人层/总论**（学理与史话） | 14 | GR-05（复数与三单两条源流）／GR-08（情态化石）／GR-09（否定磨损史）／GR-10（some/any 立场，成人层讲透、儿童面靠语块）／GR-16（中介语——病句医院的成人层总纲）／GR-18（focus on form）／GR-23（输出假设）／GR-24（象似性）／GR-26（语法搬家史）／GR-34（倒装三活法，进阶总论）／GR-37（程度词系统）／GR-39（英美两套标准）／GR-40（虚拟语气化石）／GR-42（形容词类型学） |

合计 16+7+8+14 = 45，一条不落。与词汇区四去向的差别：语法的甲类不是「生成页面」而是「生成操作件」——因为语法的最小可用单位不是词条页，是一次句子操作。

### 6.4 一级页面形态：「句子工坊」

吸取词汇区的教训（45 条平铺 = 陈列，不是产品），一级页具体形态：

1. **工坊台（主体）**：一条大句子骨架（槽位色块，配色定版前先用形状+问题词区分，不抢跑 SHAPE CODING 的冲突配色），下挂六个站点面板（带件数徽标）：
   - 站一 · 搭骨架（谁 / 做什么 / 什么·怎样）——骨架摆句件
   - 站二 · 动词标记（GR-02/03 原则卡 + 跳 TA 的门）
   - 站三 · 扩展包（GR-43/44/45 装箱与排队 + GR-28 复数宿舍）
   - 站四 · 连接与从句（GR-11/30/32 + GR-35 辖域滑杆）
   - 站五 · 句子变身（GR-31 天平 / GR-36 力气队 / GR-07 力场 / GR-33 回声机）
   - 站六 · 句子手术（病句医院：GR-22 分诊台 + GR-38 标点手术 + 24 条真病例按错型分科）
2. **页首窄带**：继续上次的站 · 病句医院直达 · 规律总论（成人层，45 条按形式纲体系图收纳）。
3. **页脚对账行**：工坊件 N · 已收编规律 M/45 · 病例 K（真病例数）——完备性写在明处，口径同词汇区列表。

### 6.5 第一批原型范围（先验证形态的 3+1）

1. **句子骨架工坊**（站一+站三核心）：四问色槽摆句（谁/做什么/什么/在哪儿）+ 形容词排队拖拽（GR-43）作扩展挂件。**抄谁**：Colourful Semantics 的问题色槽与「颜色逐步撤除」的脚手架淡出；蒙台梭利符号只取极简形状标主谓宾；页面模板抄 Murphy 左讲右练。
2. **病句医院 · 标记一次 + 主谓一致**（GR-02 + GR-12）：拿 GEC-001（He doesn't plays）等真病例做手术台流程（病句 → 选病因 → 动手改 → 同类题自测）。**抄谁**：Swan 的一页一问切分；一致关系标注抄 SHAPE CODING 的单双线画法（不抄其配色）；分诊逻辑来自 GR-22/GR-25 自己的错误权重。
3. **反意疑问回声机收编**（GR-33）：已有的 u-gr33 单元按工坊台样式重挂，验证「旧已做深件」与新站点的衔接方式（这是全区唯一现成件，当样板用）。
4. **总论页骨架**（成人层）：形式纲体系图草图——以 Azar 20 章纲目为经、章振邦词法/句法体系为纬，把 45 条 GR + TA/CO/QI 的归属全部标在图上，一图对账「谁归谁」，边界争议在图上当场暴露。

### 6.6 与词汇区改造的同与异

同：规律退总论、真病例优先、完备性对账、引擎规则不当页面。异：词汇的枢纽是**词**（所以一级是全词列表），语法的枢纽是**句子操作**（句子无穷无尽，列不完）——所以一级必须是操作台而不是清单。谁要是把语法区做成「全部规律列表」或「全部例句列表」，都是把词汇区的答案抄错了地方。
