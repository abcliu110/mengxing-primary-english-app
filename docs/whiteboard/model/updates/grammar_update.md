# T2 更新包 · 语法 G01–G40 入模对照表

> 本文件为 T2.review.md 问题 H1 的修复重建版：旧稿在 G06 处截断（G07–G40 对照行与存疑清单缺失），本版整份重建、覆盖旧稿。`grammar.yaml` 本体经独立复核通过（T2.review.md），本次重建未改动模型本体。

## 口径说明

- 范围：GRAMMAR_DB 全部 40 点（G01–G40），从旧库说法 → 知识模型 `docs/whiteboard/model/grammar.yaml`（21 概念 / 61 主张 / 93 例证 / 24 例外 / 12 口诀）。
- **新说法**：一律取自 `grammar.yaml` 本体，逐字引用其主张的 `say` / `statement` 与口诀 `text`，不转述、不改字。
- **原说法**：取自 `~/workspace/content-audit/GRAMMAR_DB.json` 对应条目字段原文逐字节录（`why_explanation`、`chant` 为每点必录；涉及裁定的 `subtitle` / `step3_rules` / `step1_story` / `step1_zh` / `step4_quiz` 一并节录）。
- **裁定与讲法升级条号**：取自 `~/workspace/content-audit/report_grammar.md`——裁定见其 §① 总表，概念层问题见 §②，内容层问题见 §③，讲法升级见 §④（共 14 条，按点号标识为 §④·Gxx）。核对基准为报告所引 Quirk《A Comprehensive Grammar of the English Language》、CGEL、Swan《Practical English Usage》口径与历史语法通行说法；可数性判据与 boundedness 模型对齐。
- 质量纪律：修正文逐条以报告所引来源为据；报告未给来源且无法确证者不入模，列入文末「存疑清单」。模型内两处 note 指向「更新包存疑清单」（g24-going-to、g31-wh-words），即本文件文末清单。
- 记号：**概念改判** = why 的机制被替换；**内容修正** = 规则/测验/译文的事实性订正；**降格** = 全称表述改 tendency 并登记例外；**讲法替换** = 概念无误但 why 换成报告给的儿童版；**规范化** = 内容维持，仅按模型规范分型入模并补例外注记。

## 领域纲领（草案，随本包入模，T7 汇总）

- **核心看法（coreView）**：语法不是背下来的规矩清单，而是说话人为了让听话人准确接收信息而形成的标记系统：形式跟着功能走——数、人称、时、指称、连接，每一种形式变化都在替听话人传递一条信息（几个？谁做的？何时？指哪一个？两句是什么关系？）。儿童学语法 = 学每个形式在『干什么活』。
- **统摄关系（unifies）**：
  - 复数 -s、三单 -s、be 动词变位统一为主谓一致（动词与名词向主语对齐的标记）；冠词、指示代词、物主代词统一为指称管理（帮听话人锁定指哪一个）；did/does 的『回原形』统一为『时态全句只标记一次』；some/any、because/so 统一为说话人的立场与连接选择；语序统一为信息包装（先给事件，后给背景）。
- **与旧库的冲突（conflicts）**：
  - 与旧库口径的冲突集中在两点：①旧库多处把功能标记讲成假机制——G03 物理形状论、G19 补偿/勋章转移、G28 焦点先行思维、G15 语法树会断、G04 重要性在前、G22 统一元音传统，本纲领下一律改判（机制只认功能与可查的历史事实）；②旧库把倾向讲成铁律（一律/绝不/必用/铁律），本纲领下全部降格为 tendency 并强制自带例外注记。

## 总览表

| 点 | 标题 | 概念裁定 | 内容裁定 | 处理 | 讲法升级 |
|---|---|---|---|---|---|
| G01 | 名词单复数规则变化 (-s/-es/-ies/-ves) | 基本成立 | 过度简化（中） | 内容修正+降格 | — |
| G02 | 名词不规则复数变形记 | 基本成立 | 基本成立 | 讲法替换 | §④·G02 |
| G03 | 不可数名词与量词容器 | 错误（高） | 基本成立（中度注记） | 概念改判（错误·高） | §④·G03 |
| G04 | 名词所有格 ('s vs of) | 过度简化（中） | 基本成立（中度注记） | 概念改判+降格 | §④·G04 |
| G05 | 不定冠词 a 与 an 的听音法则 | 成立 | 成立 | 规范化 | — |
| G06 | 定冠词 the 与零冠词 | 基本成立 | 基本成立 | 讲法替换+降格 | §④·G06 |
| G07 | 人称代词主格与宾格 | 基本成立 | 成立 | 规范化 | — |
| G08 | 形容词性 vs 名词性物主代词 | 基本成立 | 基本成立 | 规范化+译文订正 | — |
| G09 | 指示代词四兄妹 this/that/these/those | 基本成立 | 成立 | 规范化 | — |
| G10 | 不定代词 some 与 any | 基本成立 | 基本成立 | 降格 | — |
| G11 | 形容词的位置与系表搭桥 | 基本成立 | 基本成立 | 降格（注记口径） | — |
| G12 | 副词修饰与频率副词位置 | 基本成立 | 成立 | 规范化 | — |
| G13 | 基数词与序数词 | 基本成立 | 成立 | 规范化 | — |
| G14 | 介词 in/on/at 空间图式映射 | 基本成立 | 基本成立 | 讲法替换+降格 | §④·G14 |
| G15 | 连词 and/but/or/because | 过度简化（中） | 基本成立 | 概念改判 | §④·G15 |
| G16 | be 动词现在时 am/is/are | 基本成立 | 成立 | 讲法替换 | §④·G16 |
| G17 | be 动词过去时 was/were | 基本成立 | 成立 | 规范化 | — |
| G18 | 一般现在时：习惯与真理 | 成立 | 成立 | 规范化 | — |
| G19 | 一般现在时三单 -s/-es | 过度简化（中） | 成立 | 概念改判 | §④·G19 |
| G20 | 现在进行时 be + V-ing | 基本成立 | 成立 | 规范化 | — |
| G21 | 一般过去时规则变化 -ed | 成立 | 成立 | 规范化 | — |
| G22 | 一般过去时不规则动词 | 过度简化（低） | 基本成立 | 概念改判 | §④·G22 |
| G23 | 一般过去时否定与疑问（did） | 基本成立 | 成立 | 规范化 | — |
| G24 | 一般将来时 be going to | 基本成立 | 基本成立 | 规范化（存疑 Q1） | — |
| G25 | 一般将来时 will | 成立 | 成立 | 规范化 | — |
| G26 | 情态动词 can/can't | 基本成立 | 成立 | 规范化 | — |
| G27 | 情态动词 must/should/may | 基本成立 | 成立 | 规范化 | — |
| G28 | 陈述句语序：主谓宾 + 先地点后时间 | 过度简化（中） | 过度简化（低） | 概念改判+降格 | §④·G28 |
| G29 | 否定句变形双轨制 | 基本成立 | 基本成立 | 降格 | — |
| G30 | 一般疑问句与怎问怎答 | 基本成立 | 成立 | 规范化 | — |
| G31 | 特殊疑问词 5W1H | 基本成立 | 基本成立 | 降格（存疑 Q2） | — |
| G32 | How 与 What 怎么选 | 基本成立 | 基本成立 | 讲法替换 | §④·G32 |
| G33 | 祈使句 | 基本成立 | 成立 | 规范化 | — |
| G34 | 感叹句 What vs How | 基本成立 | 成立 | 规范化 | — |
| G35 | There be 与就近原则 | 基本成立 | 成立 | 讲法补注 | §④·G35 |
| G36 | There be 与 have/has 分流 | 基本成立 | 成立 | 规范化 | — |
| G37 | 同级比较 as...as | 基本成立 | 成立 | 讲法替换 | §④·G37 |
| G38 | 比较级 -er/more + than | 基本成立 | 成立 | 规范化 | — |
| G39 | 最高级 the + -est/most | 基本成立 | 成立 | 规范化 | — |
| G40 | 动词搭配 like doing / want to do | 基本成立 | 过度简化（低） | 降格+讲法补段 | §④·G40 |

## 逐点对照

### G01 名词单复数规则变化 (-s/-es/-ies/-ves)

- **裁定**：概念层 基本成立 ｜ 内容层 过度简化（中）（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【英语为什么要名词复数尾巴？】汉语靠量词表达数量（一本书、三本书，“书”字本身不变）；而英语把“不止一个”的数量信号直接焊在名词尾巴上（book ➔ books），让听话人一听词尾就知道是一个还是一群！」
  - chant：「单数变复数，一般直接加 s；s/x/ch/sh 结尾加 es；辅音加 y 变 i 加 es；f/fe 结尾多数变 ves，giraffe 只加 s！」
  - step3_rules 规则④：「④ 以 **f 或 fe** 结尾，变 f/fe 为 **v** 再加 **-es**：leaf ➔ leaves, knife ➔ knives」
  - step3_rules 规则⑤（诚实标注，保留）：「⑤ 以 **o** 结尾：potato ➔ **potatoes**, tomato ➔ **tomatoes**, hero ➔ **heroes** 加 **-es**；photo ➔ photos, zoo ➔ zoos, piano ➔ pianos, radio ➔ radios, kangaroo ➔ kangaroos 只加 **-s**。💡「有生命加 es、无生命加 s」只是帮助记忆的口诀，不是真规则（kangaroo 是动物也只加 s），加 -es 的几个词要单独记」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g01-plural-default`（rule）
    - say：「一个变多个，词尾加尾巴：一般加 s，嘶嘶结尾加 es。」
    - statement：「可数名词表复数在词尾加记号：一般加 -s；以 s、x、ch、sh 结尾加 -es（读 /ɪz/，多出一个音节，读得出才加得上）；辅音字母 + y 结尾变 y 为 i 加 -es，元音 + y 直接加 s。」
  - 主张 `g01-ves-list`（tendency）
    - say：「变 ves 的只有一小队名单，其余 f 结尾只加 s。」
    - statement：「以 f 或 fe 结尾的名词里，只有一小队常用词会把 f 变 v 再加 -es（leaf、knife、wife、life、wolf、half、calf、shelf、thief、loaf 等，约十余个，逐个记）；其余 f/fe 结尾的名词只加 -s，那才是大多数。」
    - 例外 `xc-g01-ves-rest`：「roofs、chiefs、proofs、safes、giraffes 只加 -s——只加 s 的是大多数」
  - 口诀 `ch-g01`（mnemonic）：「一般加 s，嘶嘶加 es；辅音 y 变 ies；变 ves 的只有一小队，其余 f 尾只加 s」
  - 主张 `g01-o-words`（mnemonic）
    - say：「o 结尾大多加 s，potato、tomato、hero 加 es 单独记。」
    - statement：「记忆分组：o 结尾名词多数只加 -s；potato、tomato、hero 等少数加 -es，单独记。旧口诀『有生命加 es、无生命加 s』不是真规则（kangaroo 是动物也只加 s），本条只是背诵分组，不作判断依据。」
- **依据**：报告 §③ G01 条：规则④无例外提示、chant 称「多数变 ves」在量化上为假——变 v 者为约十余个常用词的封闭小名单；规则⑤「有生命加 es 不是真规则」的诚实标注保留，定为全库范式（报告总评第 3 条）。入模 g01-ves-list 改登记为 tendency 并配例外 xc-g01-ves-rest，口诀换 ch-g01。

### G02 名词不规则复数变形记

- **裁定**：概念层 基本成立 ｜ 内容层 基本成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么这几个词不加 -s？】它们是古英语里每天挂在嘴边的最高频词（人、孩子、脚、牙、羊、鱼、老鼠），保留了古老的“内部元音变音”或“原形不变”习惯，加了 s 反而算错！」
  - chant：「男女脚牙鹅变 e（man→men, foot→feet, tooth→teeth）；老鼠 mouse 变 mice；孩子 child 变 children；绵羊 sheep 小鹿 deer 小鱼 fish 单复数长一样！」
  - subtitle：「不按常理加 s 的 8 个高频“变身小精灵”」
  - step3_rules 规则③：「③ **单复数同形（永远不加 s）**：**sheep**（绵羊）、**deer**（鹿）、**fish**（鱼的条数）、**Chinese**（中国人）」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g02-irregular-groups`（rule）
    - say：「老词有老变法：换元音、特殊变、或不变，分组记。」
    - statement：「一批最高频的老词不用 -s 表复数，分三组记：换元音组（man→men、foot→feet、tooth→teeth、goose→geese、mouse→mice）；特殊变形组（child→children、woman→women）；同形组（sheep、deer、fish、Chinese 单复数同形）。」
    - 例外 `xc-g02-fishes`：「fishes 在『鱼的种类』义上成立（many fishes in the sea = 许多种鱼）」
  - 口诀 `ch-g02`（mnemonic）：「男女脚牙鹅变 e，老鼠变 mice，孩子变 children；羊鹿鱼和 Chinese，单复数一个样」
  - 主张 `g02-etym`（etymology）
    - statement：「这批词是古英语留下的高频老词：那时表复数靠换中间的元音或干脆不变；后来『加 -s』成了新规矩，新词都照办，老词却保留了老样子。所以这一组没有规律可推，当作老前辈名单逐个记。」
- **依据**：报告 §④·G02 讲法升级：why 压缩过头，换「原住民老词」真实历史叙事全文（g02-etym）；§③ G02 条：subtitle「8 个」与名单实际 11 个（man、woman、foot、tooth、goose、mouse、child、sheep、deer、fish、Chinese）不符，按名单为准；规则③删「永远」，登记 fishes 种类义例外 xc-g02-fishes。

### G03 不可数名词与量词容器

- **裁定**：概念层 错误（高） ｜ 内容层 基本成立（中度注记）（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么面包、水、新闻在英语里不可数？】水（water）、牛奶（milk）、面包（bread，切分后还是面包）、米饭（rice）、纸（paper）没有固定的单个形状，所以不能直接加 a 或 -s，必须装进杯子/切成片（a glass of water / two pieces of bread）来计数！」
  - chant：「金木水火土，肉面茶奶布；液体材料和消息(news)，前不加 a 后无 s，作主语一律配单数 is！想数数量借容器：a cup of / two pieces of！」
  - subtitle：「液体、粉末、整体材料不能直接按个数，要借“容器”来装！」
  - step3_rules 规则①：「① **必背不可数名词**：液体（water, milk, juice, tea, soup, rain, snow）、食物（bread, rice, meat, beef, chicken鸡肉）、抽象与总称（homework作业, housework家务, news新闻, weather天气, music音乐, hair头发, money钱, paper纸, time时间）」
  - step3_rules 规则②：「② **三大铁律**：前面**不加 a/an**；词尾**不加 -s**；作主语时**谓语动词一律用单数 (is / has / V-s)**！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g03-construal`（rule）
    - say：「决定可数不可数的不是形状，是英语的习惯看法。」
    - statement：「决定一个名词能不能直接数，不是它有没有固定形状，而是英语的习惯看法：看成一个个的能数，看成一整摊、一类的不能直接数（判据本体见 boundedness 模型 cl-packaging，此处为 G03 更正口径）。形状分明的 rice、furniture 照样不可数；同一物质换个看法就能数（a cake 一整个 / some cake 一块）。」
  - 口诀 `ch-g03`（rule）：「看法决定数不数：一个个能数，一整摊借单位」
  - 主张 `g03-measure`（rule）
    - say：「不可数名词自己不数，借杯子、片、碗来数。」
    - statement：「不可数名词本身不加 a/an、不加 -s，作主语时谓语用单数；要计数就借单位或容器：数词 + 单位词（复数）+ of + 不可数名词（two pieces of bread、a cup of water），-s 加在单位词上，不加在料本身上。」
    - 例外 `xc-g03-hair-time`：「a hair（一根头发）、two hairs 成立；three times（三次）、times（时代）成立」
    - 例外 `xc-g03-dual`：「cake、paper、glass、chicken 在『整只/整份』看法下直接可数（a cake、a paper 一份报纸），不必借单位」
- **依据**：报告 §② G03 条（概念层错误·高）：形状论被双向证伪（rice、furniture 有形却不可数；cake、paper 双面可数），与已定案识解口径正面冲突，全包最高优先级改判；§④·G03 给出 rice vs beans 最小对立 + 镜头-看法讲法全文；§③ G03 条：「三大铁律」口吻与 hair、time 无限定列不可数一并订正。入模 g03-construal 与 boundedness 模型 cl-packaging 同义互指（见文末互指说明），旧 chant 材质归类口诀与 subtitle 材料归类同步废止，换 ch-g03。

### G04 名词所有格 ('s vs of)

- **裁定**：概念层 过度简化（中） ｜ 内容层 基本成立（中度注记）（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么 the legs of the desk 顺序和汉语相反？】英语习惯把最重要的核心词（the legs 腿）放在最前面，再用 of the desk 挂在后面补充说明是谁的腿！」
  - chant：「有生命加 's（Tom's bag）；s 结尾复数只加撇号 '（teachers' office）；共有只在最后加，各自拥有分别加；无生命用 A of B（B 的 A）！」
  - subtitle：「表达“……的”：有生命加 's，无生命用 of 倒着翻」
  - step3_rules 规则④：「④ **无生命所属**：`the + A + of + B`（a map of China 中国地图）」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g04-s-form`（rule）
    - say：「表『谁的』，先贴 's 标签。」
    - statement：「表所属先试 's：单数名词与不以 s 结尾的复数名词加 's（Tom's book、Children's Day）；以 s 结尾的复数名词只加撇号（the teachers' office）；两人共有在最后一人后加 's，各自拥有则分别加。」
  - 主张 `g04-of-tendency`（tendency）
    - say：「's 是贴身标签，of 是挂在后面的说明牌；先试 's，长短语常用 of。」
    - statement：「of 结构（the legs of the desk）多用于无生命的事物，或所属短语较长、较重时；但这只是倾向：'s 的地盘包括人、动物、国家、组织、时间（today's news、the book's cover 都对），有生命的名词也能用 of（the daughter of the king；a friend of mine 双重所有格必须用 of）。」
    - 例外 `xc-g04-things-s`：「today's news、China's capital、the book's cover、a day's work——无生命照样用 's」
    - 例外 `xc-g04-of-person`：「a friend of mine（双重所有格，必须 of）、the daughter of the king——有生命也能用 of」
  - 口诀 `ch-g04`（mnemonic）：「's 是标签先贴上，又长又重用 of 讲」
- **依据**：报告 §② G04 条：why「把最重要的核心词放最前面」是编造机制，删除；chant/规则④「有生命 's、无生命 of」二分被反例击穿（today's news、the book's cover、a friend of mine）；§④·G04 给出「's 贴身标签 / of 说明牌」讲法全文并降格为倾向。入模 g04-s-form、g04-of-tendency 及例外 xc-g04-things-s、xc-g04-of-person，口诀换 ch-g04。

### G05 不定冠词 a 与 an 的听音法则

- **裁定**：概念层 成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【a 和 an，谁是原形？】an 才是老祖宗：它来自古英语 ān「一」（今天的 one 也是它变来的）。后来在辅音前面，n 慢慢读丢了，就成了 a；在元音前面 n 留了下来（an apple /ən ˈæpl/），两个元音不撞在一起，读起来顺。所以今天选 a 还是 an，只看后面单词“发音的第一个音是不是元音音素”！」
  - chant：「单数可数要加冠词，a/an 小帽戴头顶；辅音音素前戴 a，元音音素前戴 an；an hour（h静音）和 a useful book（u读/juː/）最要当心！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g05-sound-rule`（rule）
    - say：「选 a 还是 an，听第一个音。」
    - statement：「a 与 an 的选择只看后面词的第一个音：辅音音素开头用 a，元音音素开头用 an——看发音，不看字母。h 不发音的 hour 用 an（an hour）；u 读 /juː/ 的 useful、university 用 a。」
- **依据**：报告 §① 双「成立」；§② 其余概念层结论：why 的词源（an ← 古英语 ān、与 one 同源）为真，是全库概念讲法范本。原样规范化入模 g05-sound-rule；词源事实本身登记在 boundedness 模型 cl-a-etym，grammar 侧以 note 指回、不重复登记（见文末互指说明）。

### G06 定冠词 the 与零冠词

- **裁定**：概念层 基本成立 ｜ 内容层 基本成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【the 是从哪来的？】the 意思是“你我都心知肚明的那个（特指）”！而球类运动（play football）重在规则竞技本身，三餐（have lunch）重在日常饮食活动，所以零冠词上阵！」
  - chant：「特指双知用定冠(the)，世上独一太阳蓝天(the sun/sky)；西洋乐器必加 the（play the piano），球类棋类三餐前，冠词统统靠边站（play football / have dinner）！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g06-the-known`（rule）
    - say：「就是那个你我都知道的，用 the。」
    - statement：「the 用于说的人和听的人都能确定是哪一个时：再次提到同一事物、世上独一无二（the sun）、序数词与最高级之前、当场上下文明确的（Pass me the book）。」
  - 主张 `g06-zero-activity`（tendency）
    - say：「说活动不加冠词，说东西要加。」
    - statement：「泛指『做一件事』时多用零冠词：球类棋类（play football）、三餐（have lunch）、学科、by + 交通工具；一旦指某个具体的东西，就恢复冠词（the lunch we had）。分界不在词本身，在这次说的是活动还是东西。」
    - 例外 `xc-g06-piano`：「play the piano——乐器类在教材口径里按『东西』读法加 the，不套活动零冠词」
    - 例外 `xc-g06-the-lunch`：「the lunch we had yesterday——特指某一顿饭时，三餐也要加 the」
  - 主张 `g06-instrument`（rule）
    - say：「弹乐器加 the。」
    - statement：「教材与考试口径：play + the + 西洋乐器（play the piano、play the violin）。」
    - 例外 `xc-g06-us-piano`：「美式日常口语常说 play piano（不加 the）」
- **依据**：报告 §④·G06 讲法升级：why「球类重在规则竞技本身、三餐重在日常饮食活动」含糊不可操作，换「活动 vs 东西」镜头讲法（g06-zero-activity，tendency），分界落在读法而非词本身；the 的判据落到「双方都能确定是哪一个」（g06-the-known，与 boundedness cl-the-known 同义互指）；乐器规则保留（g06-instrument），按 §④·G06 失效边界登记美式 play piano 例外 xc-g06-us-piano。

### G07 人称代词主格与宾格

- **裁定**：概念层 基本成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么汉语都是“我”，英语却要分 I 和 me？】英语给代词穿上了“位置制服”：站在句首指挥动作的主人穿“主格礼服”（I / he / she / we / they），站在动词或介词后面接受动作的对象必须换上“宾格工作服”（me / him / her / us / them）！」
  - chant：「动前主格动后宾，介词后面也用宾！I变me，we变us，he变him，she变her，they变them要记准，只有you和it主宾长相不改变！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g07-case-position`（rule）
    - say：「动词前主格，动词和介词后面宾格。」
    - statement：「人称代词按位置变身：站在动词前作主语用主格（I、you、he、she、it、we、they），站在动词或介词后面作宾语用宾格（me、you、him、her、it、us、them）；you 与 it 主宾同形。」
  - 主张 `g07-polite-order`（tendency）
    - say：「几个人一起提，把自己放最后。」
    - statement：「几个人并列时，礼貌排序是把自己放最后（you, he and I）。国内教辅流传的复数口诀『we, you and they』在英语里并无固定规定，不当规则记。」
    - 例外 `xc-g07-we-they`：「复数并列『we, you and they』无固定规定」
- **依据**：报告 §①（概念基本成立 / 内容成立）；§③ 抽查通过项：主宾格与礼貌排序（含对伪口诀的自我声明）逐条无误。原样规范化入模 g07-case-position、g07-polite-order（tendency）。

### G08 形容词性 vs 名词性物主代词

- **裁定**：概念层 基本成立 ｜ 内容层 基本成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么有了 my 还要发明 mine？】为了避免啰嗦重复！当别人问 Whose book is this? 直接把 my book 合体浓缩成一个词 **mine**（我的书），既简洁又有力！」
  - chant：「形物代(my/your/her/our/their)是粘人精，后面必须跟名词；名物代(mine/yours/hers/ours/theirs)是独行侠，句尾单干不带名！牢记公式：形物代 + 名词 = 名物代！」
  - step1_story：「This is **my** bag. That red one is **yours** (= your bag). / **Her** dress is blue, and **mine** (= my dress) is yellow. / **Our** classroom is on the first floor, and **theirs** is on the second floor.」
  - step1_zh：「这是我的包。那个红色的是你的（包）。她的连衣裙是蓝色的，而我的（连衣裙）是黄色的。我们的教室在一楼，他们的在一楼。」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g08-possessive-pair`（rule）
    - say：「后面有名词用 my，没名词用 mine。」
    - statement：「形容词性物主代词（my、your、her、our、their）后面必须跟名词；名词性物主代词（mine、yours、hers、ours、theirs）等于『形物代 + 名词』的浓缩，单独使用。判断看空格后面有没有名词：有名词选形物代，没名词选名物代。」
- **依据**：报告 §③ G08 条：step1_zh 与原句矛盾——原句 second floor 被译成「一楼」，属内容硬伤（非语法）。**订正译文：「二楼」**，即 step1_zh 第三句应为「我们的教室在一楼，他们的在二楼。」此订正属旧库文本层，随 T9 旧库补丁执行；模型侧 g08-possessive-pair 的规则本身无误（§① 概念/内容均基本成立），规范化入模。

### G09 指示代词四兄妹 this/that/these/those

- **裁定**：概念层 基本成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么指示词也要分单复数？】英语讲究“数的一致”：指着 1 个苹果说 this is an apple，指着一堆苹果必须同步把指示词和系动词都变成复数 these are apples！」
  - chant：「近指单数 this is，远指单数 that is；近指复数 these are，远指复数 those are；问句 This/That 回答用 it，问句 These/Those 回答用 they！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g09-demonstratives`（rule）
    - say：「近单 this、远单 that、近复 these、远复 those。」
    - statement：「指示代词按距离 × 单复数四分：this（近·单）、that（远·单）、these（近·复）、those（远·复），be 动词随之用 is 或 are；问答回应时单数用 it、复数用 they；电话里自报家门用 This is ...，问对方用 Who's that?」
- **依据**：报告 §①（概念基本成立 / 内容成立），§③ 抽查通过。原样规范化入模 g09-demonstratives。

### G10 不定代词 some 与 any

- **裁定**：概念层 基本成立 ｜ 内容层 基本成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么疑问句和否定句要把 some 换成 any？】some 默认“肯定有这么一些”；而在疑问或否定句里换上表示“任何一点”的 any！但如果你端着蛋糕热情邀请别人 Would you like some cake?，你真心希望对方说 Yes，所以保留 some！」
  - chant：「some 和 any 都表“一些”，可数复数不可数都能接；肯定句里用 some，否定疑问换 any；唯有邀请和请求（Would you like / Can I have），满怀诚意还用 some！」
  - step3_rules 规则③：「③ **黄金特例**：表示**诚意邀请 (`Would you like some...?`)** 或 **礼貌请求 (`Can/Could/May I have some...?`)** 的问句，一律用 **some**！」
  - step4_quiz 改错题：「题干：【火眼金睛改错】Can I have any water, Mum? I'm very thirsty.｜选项：把 any 改为 some（礼貌请求用 some） / 把 water 改为 waters / 把 thirsty 改为 hungry｜答案键 ans=0｜explain：礼貌请求用 Can I have some water!」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g10-basic-split`（rule）
    - say：「肯定 some，否定疑问 any。」
    - statement：「some 与 any 都可接可数名词复数或不可数名词；默认分工：肯定句用 some，否定句与一般疑问句用 any。」
  - 主张 `g10-request-some`（tendency）
    - say：「真心请人、开口求人，问句也用 some。」
    - statement：「表示诚意邀请或礼貌请求的问句（Would you like some cake? / Can I have some water?）多用 some，因为说话人期待对方答应。但这是强偏好不是铁律：用 any 并非语法错误，只是语气中性、疏远。」
    - 例外 `xc-g10-any-ok`：「Can I have any water, Mum? 语法成立，只是语气中性、疏远，不显期待」
- **依据**：报告 §③ G10 条：规则③「一律用 some」把强偏好升级成规则；改错题把 "Can I have any water, Mum?" 设为待改错句，但该句语法成立、只是语气中性（Swan 口径）——测验层订正方向：换真正的错句，或题干注明「更礼貌的说法」，随 T9 执行。入模 g10-request-some 降格为 tendency 并登记例外 xc-g10-any-ok；g10-basic-split 规范化。

### G11 形容词的位置与系表搭桥

- **裁定**：概念层 基本成立 ｜ 内容层 基本成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么汉语能说“我开心”，英语说 I happy 却是大错句？】汉语形容词自带“动词光环”；但英语的形容词（happy/tall/hungry）只是静态标签，必须由系动词 **am/is/are/look/feel** 架起一座桥，才能连接主语（I **am** happy）！」
  - chant：「形容词，真奇妙，名词前面戴花帽（a cute cat）；若放主语后，系动词（am/is/are/look/feel/sound）必须来搭桥，千万不能把 be 抛（I am happy）！」
  - step3_rules 规则②：「② **表语搭桥**：主语 + **be** 或 **五大感官系动词 (`look / sound / smell / taste / feel`)** + **形容词**！（⚠️ delicious 本身就是“非常好吃”，一般不说 very delicious，说 smells delicious 即可）」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g11-adj-position`（rule）
    - say：「形容词在名词前面；作谓语要 be 搭桥。」
    - statement：「形容词作定语放在名词前面（a red apple），但修饰 something、anything、nothing 时放在后面（something new）；形容词作表语不能单独连主语，必须由 be 或感官系动词（look、sound、smell、taste、feel）搭桥（I am happy）。」
  - 主张 `g11-very-delicious`（tendency）
    - say：「delicious 已经很『非常』了，一般不再加 very。」
    - statement：「传统教法提醒：delicious 本身已含『非常好吃』，一般不叠加 very。这是风格提醒，不是语法禁区。」
    - 例外 `xc-g11-very-delicious`：「very delicious 在现代英语（尤其美式口语）中常见且可接受」
- **依据**：报告 §③ G11 条：规则②注记「一般不说 very delicious」是传统绝对形容词的风格建议而非语法错误（现代英语尤其美式口语常见且可接受），保留提醒但口径与全库「这不是真规则」式标注对齐。入模 g11-very-delicious 登记为 tendency；g11-adj-position 规范化。

### G12 副词修饰与频率副词位置

- **裁定**：概念层 基本成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么“快乐地唱歌”是 sing happily？】英语先亮出动作 sing（唱），再补充是怎么唱的 happily（快乐地）；而表示频率的 always/often 紧贴在实义动词前面（often sing）或 be 动词后面（is always happy）！」
  - chant：「形容词变副词，词尾常加 -ly（slow→slowly, happy→happily）；fast/hard/early/late/high/well 形副同形或特殊记！频率副词站哪里？be动词后、实义动词前！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g12-adverb-form`（rule）
    - say：「副词管动作，常加 -ly；fast、hard 形副同形，good 变 well。」
    - statement：「方式副词多由形容词加 -ly 构成（slow→slowly、happy→happily），放在实义动词后面修饰动作；fast、early、late、hard 形副同形，good 的副词形式是 well。」
  - 主张 `g12-frequency-position`（rule）
    - say：「频率副词：be 后面，实义动词前面。」
    - statement：「频率副词（always、usually、often、sometimes、never）的位置：放在 be 动词或情态动词之后、实义动词之前。」
- **依据**：报告 §①（概念基本成立 / 内容成立）；§③ 抽查通过项：fast/hard/well 等逐条无误。原样规范化入模 g12-adverb-form、g12-frequency-position。

### G13 基数词与序数词

- **裁定**：概念层 基本成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么楼层、日期、生日要用序数词？】因为一月一日、三楼、第十二个生日都是排在序列里的“第1、第3、第12个位置”，所以必须用序数词（the first / the third / the twelfth）！」
  - chant：「基变序，有规律：一二三特殊记（first/second/third）；八去t（eighth），九去e（ninth）；ve要用f替（fifth/twelfth）；整十y变ie再加th（twentieth）；若是遇到几十几，只变个位就可以（twenty-first）！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g13-ordinals`（rule）
    - say：「一二三特殊，八去 t、九去 e，ve 变 f。」
    - statement：「序数词表『第几个』，前面常加 the。构成要点：first、second、third 特殊记；eight 去 t（eighth）、nine 去 e（ninth）；five、twelve 的 ve 变 f 再加 th（fifth、twelfth）；整十的 y 变 ie 加 th（twentieth）；几十几只变个位（twenty-first）。」
- **依据**：报告 §①（概念基本成立 / 内容成立）；§③ 抽查通过项：序数词变形无误。原样规范化入模 g13-ordinals。

### G14 介词 in/on/at 空间图式映射

- **裁定**：概念层 基本成立 ｜ 内容层 基本成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么汉语一个“在”字，英语却要分 in / on / at？】英语是用**三维空间几何镜头**看世界：包在立体容器内部用 **in**，贴在平面或轴线上用 **on**，聚焦成一个精确小圆点用 **at**！并把这个空间图式原封不动映射到了“时间漏斗”和“抽象状态”上！」
  - chant：「空间看图式：in在立体容器里，on在表面有接触，at锁定精确点！时间看漏斗：年月季节早中晚，范围宽大都用in；具体某天星期几，精准落在on上面；几点几分小圆点，at站在最顶尖！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g14-schema`（rule）
    - say：「in 在里面，on 在面上，at 在一个点。」
    - statement：「in、on、at 的空间图式：in 是进到容器里面（in the box），on 是贴在一个面上（on the desk），at 是盯住一个点（at the door）。先按空间把三个画面记牢。」
  - 主张 `g14-time-borrow`（tendency）
    - say：「时间借空间：长时段 in、某一天 on、钟点 at。」
    - statement：「时间用法是空间图式的借用：长时段像大盒子用 in（in May、in 2026），具体某一天像一个面用 on（on Monday、on June 1st），钟点像一个点用 at（at 7:30）。借用不是百分百对齐，有几个老习惯要单独记（见例外）。」
    - 例外 `xc-g14-at-night`：「at night——夜里用 at，不用 in；at noon 同理」
    - 例外 `xc-g14-on-morning`：「on Sunday morning——in the morning 一旦被某一天锁定，改用 on」
    - 例外 `xc-g14-at-weekend`：「英式英语说 at the weekend，人教版用 on the weekend」
  - 口诀 `ch-g14`（mnemonic）：「年月季节用 in（at night 单记），某天某日用 on，几点几分用 at」
- **依据**：报告 §④·G14 讲法升级：空间图式（in 容器 / on 面 / at 点）是认知语言学正统框架、保留，但删「原封不动映射到时间」的过头承诺，失效边界必须随讲（at night、on Sunday morning 等图式外约定）；§③ G14 条：chant「早中晚都用 in」与自家规则的 at night 自相冲突。入模 g14-schema、g14-time-borrow（tendency），口诀换 ch-g14（已改「at night 单记」）。

### G15 连词 and/but/or/because

- **裁定**：概念层 过度简化（中） ｜ 内容层 基本成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么汉语常说“因为…所以…”，英语却严禁 because 和 so 同句出现？】英语一句简单句只能有一个主干，如果同时放了从属连词 because 和并列连词 so，语法树就断了！所以英语里 **because 和 so 只能二选一**！」
  - chant：「肯定并列用 and，转折对比用 but；疑问选择用 or，否定并列也用 or（I don't have pens or pencils）；因为 because 所以 so，同句绝不一起走！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g15-because-so`（rule）
    - say：「because 和 so 只能选一个用。」
    - statement：「because 与 so 干同一件活（连接原因与结果），但接法不同：because 把原因做成挂在主句上的半句话（Because it rained, we stayed home——前半句自己站不住），so 把两个完整句子并排连起来（It rained, so we stayed home）。同一对句子只能选一种接法，两个一起用等于把同一件事接了两遍。汉语『因为…所以…』是成对关联词，英语不是。」
  - 口诀 `ch-g15`（rule）：「because、so 选一个，同一件事不接两遍」
  - 主张 `g15-and-or`（rule）
    - say：「肯定 and，否定多换 or。」
    - statement：「肯定句并列用 and；否定句表示『两样都不』时，通常把 and 换成 or（I don't like pears or peaches）。」
    - 例外 `xc-g15-and-neg`：「I can't sing and dance 也是对的，意思是『不能边唱边跳』」
- **依据**：报告 §② G15 条：「语法树就断了」是编造机制——because 从句依附的主句本身即完整主干；真因是功能重复：同一对句子不能同时按从属与并列两种关系连接。§④·G15 给出「两种接法不能叠用」讲法全文，并补入原 why 缺失的汉英对比（汉语「因为…所以…」是成对关联词、英语不是）。入模 g15-because-so、g15-and-or，口诀换 ch-g15。

### G16 be 动词现在时 am/is/are

- **裁定**：概念层 基本成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么同样表示“是/在”，英语要分成 am / is / are 三个词？】这叫“主谓一致”——动词根据主语的人称和单复数穿上对应的制服，让听话人光听 am/is/are 就知道主语是谁！」
  - chant：「我(I)用 am，你(you)用 are，is 连着他(he)她(she)它(it)；单数不可数全用 is，复数主语一律 are！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g16-be-present`（rule）
    - say：「I 用 am，单数 is，复数 are。」
    - statement：「be 动词现在时随主语变身：I 用 am；he、she、it、单数名词、不可数名词用 is；you、we、they、复数名词用 are。这叫主谓一致：动词向主语报出自己跟的是哪一档（我 / 单数 / 复数）。am not 没有缩略形式。」
- **依据**：报告 §② G16 条：why「光听 am/is/are 就知道主语是谁」夸大（is 分不清他/她/它），低 severity、改讲法一句即可；§④·G16 给出替换末句（只报「我 / 单数 / 复数」三档）。入模 g16-be-present 的 statement 已含该限定。

### G17 be 动词过去时 was/were

- **裁定**：概念层 基本成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么昨天“在家”不能说 I am at home yesterday？】只要时间发生在过去（yesterday / last week / ago），be 动词必须换上过去时盔甲 **was / were**！」
  - chant：「过去时间看标志（yesterday / last... / ...ago）；现在的 am 和 is 变身 was（含 s 对应单数），现在的 are 变身 were（含 re 对应复数）！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g17-be-past`（rule）
    - say：「am/is 变 was，are 变 were。」
    - statement：「be 动词的过去时：am、is 变 was，are 变 were（否定 wasn't、weren't）；出现 yesterday、last night/week、...ago、in 2020 等过去时间标志时用过去式。」
- **依据**：报告 §①（概念基本成立 / 内容成立）；§③ 抽查通过项：was/were 变形与发音无误。原样规范化入模 g17-be-past。

### G18 一般现在时：习惯与真理

- **裁定**：概念层 成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【一般现在时是“现在这一秒正在做”吗？】不是！它画的是一个跨越过去、现在、未来的时间圆环——如“每天7点起床”“地球绕太阳转”，是经常发生或永远如此的规律！」
  - chant：「一般现在表经常，习惯真理它担当；every day, often 与 usually，看到它们用原形（三单主语加 -s）！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g18-present-meaning`（rule）
    - say：「一般现在时讲习惯和真理，不是正在做。」
    - statement：「一般现在时不是『现在这一秒正在做』，而是表经常反复的习惯、现在的状态与爱好、以及客观真理与自然事实。动词形式：主语不是三单时用原形，是三单时加 -s/-es。」
- **依据**：报告 §① 双「成立」。原样规范化入模 g18-present-meaning。

### G19 一般现在时三单 -s/-es

- **裁定**：概念层 过度简化（中） ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【英语为什么非要给三单动词加 -s？】复数主语名词自带了 -s（The boys like...），而单数第三人称主语没带 -s（The boy...），于是英语把 -s 勋章贴到动词上（The boy likes...），用来精密锁定主语是单数第三人称！」
  - chant：「不是我(I)来不是你(you)，孤身一人他她它；一般现在肯定句，动词必加 s 小尾巴！have 变 has，辅音+y 变 ies，ch/sh/s/x/o 后加 es！does 一出场，动词回原形！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g19-third-s`（rule）
    - say：「主语是单个他她它，动词戴 -s 对暗号。」
    - statement：「一般现在时肯定句里，主语是单个的他/她/它（第三人称单数，含单数名词、不可数名词、everyone 等）时，动词加 -s 或 -es：这是主谓一致留下的主语标记，动词用它表明自己跟的是单数主语。加法：一般加 -s；s、x、ch、sh、o 结尾加 -es；辅音 + y 变 i 加 -es；have 变 has。」
    - 例外 `xc-g19-does`：「does / doesn't 出场后，实义动词恢复原形（Does he like ...?）」
  - 口诀 `ch-g19`（mnemonic）：「主语单个他她它，动词 -s 来对暗号；does 来了 -s 走，动词回到原形样」
  - 主张 `g19-s-history`（etymology）
    - statement：「动词三单 -s 与名词复数 -s 历史上是两个无关的词尾：三单 -s 源自古英语动词变位词尾（北部方言 -es 一支后来胜出，取代了南部的 -eth）；名词复数 -s 源自古英语名词词尾 -as。两者是独立源流，从不存在『名词缺 s 就补到动词上』的转移或补偿。」
- **依据**：报告 §② G19 条：why 的「-s 勋章转移 / 补偿平衡」是伪历史——名词复数 -s 与动词三单 -s 历史上是两个无关词尾，英语从无「名词缺 s 就补到动词上」的机制；§④·G19 给出主谓一致「对暗号」讲法全文及失效边界。入模 g19-third-s 改讲真机制（主谓一致），并新增词源记录 g19-s-history（古英语动词变位词尾，北部诺森布里亚 -es 一支胜出取代南部 -eth；名词复数 -s 源自古英语 -as；两条独立源流、从无转移）；口诀换 ch-g19。复核注记（T2.review §5 L1）：g19-s-history 的 source 目前为转述链，建议后续补一手出处名（历史语法教材 / Wiktionary「-s」词条）。

### G20 现在进行时 be + V-ing

- **裁定**：概念层 基本成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么不能只写 He running，非要写 He is running？】加上 -ing 后的动词（running）变成了描述状态的现在分词，必须请 **am / is / are** 来当支架，组成 `be + doing` 双人组合！」
  - chant：「Look! Listen! 加 Now，现在进行正热闹；结构公式要记牢：be(am/is/are) 加动词 ing，缺了哪一个都报错！直接加、去e加(writing)、双写加(running/swimming)！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g20-progressive`（rule）
    - say：「正在做的事：be 加 doing，两个都不能少。」
    - statement：「现在进行时 = be（am/is/are）+ 动词 -ing，表此时此刻正在发生，信号词有 Look!、Listen!、now、at the moment，两部分缺一不可。-ing 加法：一般直接加；不发音的 e 结尾去 e 再加（writing）；重读闭音节双写尾辅音再加（running、swimming）。」
- **依据**：报告 §①（概念基本成立 / 内容成立）。原样规范化入模 g20-progressive。

### G21 一般过去时规则变化 -ed

- **裁定**：概念层 成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么英语要把过去动词加上 -ed？】英语把过去时间信息直接编码在谓语动词身上（play ➔ played），让听话人一听到词尾 -ed 就知道这是过去的故事！」
  - chant：「一般过去表从前，规则动词加 ed；有 e 直接加个 d（lived），辅音加 y 变 ied（studied），辅元辅要双写加 ed（stopped）！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g21-ed`（rule）
    - say：「过去的事，动词盖 -ed 章。」
    - statement：「规则动词的过去式加 -ed：一般直接加 -ed；以 e 结尾加 -d；辅音 + y 变 i 加 -ed；重读闭音节双写尾字母加 -ed。发音三读：清辅音后读 /t/，浊辅音和元音后读 /d/，/t/、/d/ 后读 /ɪd/。」
- **依据**：报告 §① 双「成立」；§③ 抽查通过项：-ed 变形与发音无误。原样规范化入模 g21-ed。

### G22 一般过去时不规则动词

- **裁定**：概念层 过度简化（低） ｜ 内容层 基本成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么越常用的动词越不按规则加 -ed？】日常最高频动词（go, see, eat, have, do, take, buy）完整保留了古英语“变换内部元音”来表过去的传统！」
  - chant：「go变went，see变saw，eat变ate，have变had，do变did；take→took，make→made，come→came，give→gave；buy→bought，think→thought，teach→taught；put/cut/hurt/read 过去现在长一样！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g22-irregular-past`（rule）
    - say：「老词各有老变法，分组记，没有总规律。」
    - statement：「高频老词的过去式没有总规律，分组逐个记：换元音组（sing→sang、swim→swam、drink→drank）；换词组（go→went，借了 wend 的过去式，与 go 本无词源关系）；带音变的弱变化组（buy→bought、have→had、teach→taught）；同形组（put、cut、hurt、read，拼写不变，read 读音变 /red/）。」
  - 主张 `g22-groups-mnemonic`（mnemonic）
    - say：「分组只是为了好背，不是规律。」
    - statement：「按拼写变化的样子分组背诵（i→a 组、ought 组、同形组等），只是记忆分组法，帮助成串记词；分组不代表这些词有共同的词源或统一的规律。」
- **依据**：报告 §② G22 条：why「完整保留变换内部元音的传统」失实——went 是借 wend 过去式的补格、bought/had 是带音变的弱变化、put/read 是同形，元音变换（ablaut）只覆盖 sing→sang 一类；§④·G22 改讲「老词各有老变法、分组记」。入模 g22-irregular-past 撤统一叙事，g22-groups-mnemonic 单独登记分组口诀（mnemonic 与 rule 分离）。

### G23 一般过去时否定与疑问（did）

- **裁定**：概念层 基本成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么 didn't 后面必须变回 go？】助动词 `did` 像一块强力海绵把整句话的“过去时能量”全部吸光了，后面的实义动词立刻恢复原形！」
  - chant：「过去否定与疑问，请出帮手 did 大人；did 和 didn't 一现身，过去能量全吸尽，后面动词秒回原形（Did you go? / I didn't go）！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g23-did`（rule）
    - say：「did 一出场，动词回原形。」
    - statement：「一般过去时的否定句与疑问句请助动词 did 出场：did 或 didn't 后面的实义动词恢复原形（I didn't go；Did you go?）。因为过去时标记全句只出现一次，由 did 承担，动词不必再变。答句里没有 did 时，动词恢复过去式。」
- **依据**：报告 §①（概念基本成立 / 内容成立）；§② 其余概念层结论：「did 海绵吸走能量」是比喻，但对应的真实分布事实（时态只在助动词上标记一次）准确，比喻忠实于机制，判基本成立；§③ 抽查通过项：助动词还原无误。原样规范化入模 g23-did。

### G24 一般将来时 be going to

- **裁定**：概念层 基本成立 ｜ 内容层 基本成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么 be going to 能表打算？】想象你已经走在路上（I am going to...），下一步自然就是要去做那件事！所以用 `be going to + 动词原形` 表达“计划打算做某事”！」
  - chant：「be going to 表打算，计划安排早做好；be 随主语变 am/is/are，to 后永远接原形！」
  - step4_quiz choice：「题干：My family _____ going to _____ a trip next week.｜选项：is/are; take / will; take / are; taking / is; takes｜答案键 ans=0｜explain：be going to + 动词原形 take！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g24-going-to`（rule）
    - say：「早想好的打算，用 be going to。」
    - statement：「be going to + 动词原形，表心里已经想好的计划、打算，或根据眼前迹象判断就要发生的事；be 随主语变（am/is/are），to 后接原形。标志词：tomorrow、next week、soon 等。」
  - 主张 `g24-etym`（etymology）
    - statement：「be going to 的来历是真实的语法化：它本是『走在去做某事的路上』（运动义的 go + 目的），人已经在路上，下一步自然就是做那件事，于是引申出『打算、将要』。」
- **依据**：报告 §② 其余概念层结论：why 的语法化讲法（be going to 由「走在路上」引申打算）是真实路径；§③ G24 条：step4_quiz choice 把 is/are 并成一个选项（「is/are; take」），属选项设计问题、内容无误——其处置转入文末存疑清单 Q1。入模 g24-going-to、g24-etym（语法化词源）。

### G25 一般将来时 will

- **裁定**：概念层 成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【will 原来是什么意思？】will 本义是“意愿、决心”，演化成通用的将来时助动词“将会……”，不管主语是谁，永远是 `will + 动词原形`！」
  - chant：「将来助动小 will，主语是谁它不管；后面紧接动词原形，否定缩写变成 won't (will not)！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g25-will`（rule）
    - say：「将来用 will，后面跟原形，谁来都不变。」
    - statement：「will + 动词原形表将来（意愿、承诺、临时决定、预测），不随主语的人称和数变化；否定是 won't。will 后面接形容词时不能漏掉原形 be（It will be sunny tomorrow）。」
  - 主张 `g25-etym`（etymology）
    - statement：「will 本义是『意愿、决心』：它来自古英语 willan『想要』，后来演化成通用的将来标记，所以 will 至今带着一点『愿意、承诺』的味道。」
- **依据**：报告 §① 双「成立」；§② 其余概念层结论：why（will 本义意愿）是真词源。原样规范化入模 g25-will、g25-etym。

### G26 情态动词 can/can't

- **裁定**：概念层 基本成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么 He can swims 是错的？】因为情态动词 `can` 不随人称加 s，而且像保护伞一样让后面的动词永远保持原形（He **can swim**）！」
  - chant：「情态动词小能手 can，会做某事本领强；主语是谁它不变，后面动词用原形；否定直接变 can't，疑问把 can 提句首！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g26-can`（rule）
    - say：「can 后面动词用原形，谁来都不变。」
    - statement：「can 表能力（会、能）或许可（可以），不随主语变化，后面紧接动词原形（He can swim）；否定直接变 can't，疑问把 Can 提到句首。」
- **依据**：报告 §①（概念基本成立 / 内容成立）。原样规范化入模 g26-can。

### G27 情态动词 must/should/may

- **裁定**：概念层 基本成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【注意 mustn't 的意思陷阱！】英语里 **mustn't 是口气最严厉的“绝对禁止、千万不准”**（如红灯禁止通行 You mustn't cross the road）！」
  - chant：「情态家族规矩同，后面一律接原形；must 必须，mustn't 严禁；should 应该提建议，May I 开口最礼貌！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g27-modal-family`（rule）
    - say：「mustn't 是禁止，不是『不必』。」
    - statement：「情态动词家族规矩相同：后面接动词原形。must 是『必须』，mustn't 是『严禁、千万不准』（不是『不必』）；should 是『应该』，用于温和建议；may 用在 May I ...? 里表礼貌请求。」
- **依据**：报告 §①（概念基本成立 / 内容成立）；§③ 抽查通过项：mustn't 陷阱等无误。原样规范化入模 g27-modal-family。

### G28 陈述句语序：主谓宾 + 先地点后时间

- **裁定**：概念层 过度简化（中） ｜ 内容层 过度简化（低）（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么汉语说“我每天在学校踢球”，英语却说“我踢球 + 在学校 + 每天”？】英语是**“焦点先行思维（SVO）”**——先把核心骨架 **主语+谓语+宾语 (I play football)** 抛出来，再挂上 **地点 (at school)** 和 **时间 (every day)**！」
  - chant：「汉英排序大不同，英语骨架打先锋：主语+谓语+宾语排前头，方式、地点、时间依次挂句尾！记住口诀：先地点（where），后时间（when）！」
  - step4_quiz fill：「题干：We had a big dinner _____ (at home / last night).｜选项：at home last night（先地点后时间） / last night at home / in home last night / at last night home｜答案键 ans=0｜explain：先地点 at home，后时间 last night！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g28-svo-order`（rule）
    - say：「先说谁做了什么，地点时间排后面。」
    - statement：「英语陈述句先把主干说完——主语 + 谓语 + 宾语，把『谁做了什么』这件事先交代清楚；方式、地点、时间是补充信息，一般排在句尾，想强调时也可以把状语提到句首（Every morning, I read English）。频率副词 always、often 等是另一路，站在主语和谓语之间。」
  - 主张 `g28-place-time`（tendency）
    - say：「句尾一般先地点后时间，反过来也对。」
    - statement：「句尾状语的常见顺序是先地点、后时间（at home last night），但这只是常见倾向：时间排在地点前面（last night at home）同样正确、同样常见。」
    - 例外 `xc-g28-time-first`：「We had a big dinner last night at home.——时间在地点前，完全合乎语法且常见」
  - 口诀 `ch-g28`（mnemonic）：「先说谁做了什么，地点时间随后挂；先地后时是常样，反着说也不算差」
- **依据**：报告 §② G28 条：「焦点先行思维」是自造标签（SVO 只是语序类型学标签，不指「焦点」），与原理⑥已定案的假统一概念同源，撤销；§④·G28 改讲信息顺序（先给事件、后挂背景）并明示「先地点后时间」只是常见顺序。§③ G28 条：fill 题把合乎语法的 "last night at home" 设为错误选项——题目本体改法（改语序排序题，或两序都接受）属测验层、随 T9 执行，模型侧已由例外 xc-g28-time-first 逐字登记原题句为合法语序。入模 g28-svo-order、g28-place-time（tendency），口诀换 ch-g28。

### G29 否定句变形双轨制

- **裁定**：概念层 基本成立 ｜ 内容层 基本成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么绝对不能说 I am not like？】只有系动词和情态动词才能直接加 `not`；普通实义动词（like/go/eat）必须请专职保镖 **don't / doesn't / didn't** 站在它前面！」
  - chant：「变否定分两路：句中有 be 或情态(can/will)，后面直接加上 not；若是只有实义动词，快请 don't / doesn't / didn't 来相助，后面动词回原形，还要把 some 变成 any！」
  - step3_rules 规则②：「② **轨道二（纯实义动词）**：前加 **don't / doesn't / didn't + 动词原形**，且 **some 改 any，and 改 or**」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g29-two-tracks`（rule）
    - say：「有 be、情态直接加 not；只有实义动词，请 don't 来帮忙。」
    - statement：「变否定句分两轨：句中有 be 动词或情态动词（can、will、must、should 等），直接在它们后面加 not；句中只有实义动词时，请 don't、doesn't、didn't 站到动词前面帮忙，其后的实义动词恢复原形。」
  - 主张 `g29-some-any-neg`（tendency）
    - say：「否定句默认 some 变 any，特指的时候可以不变。」
    - statement：「否定句里 some 通常改成 any、and 通常改成 or，这是默认倾向。some 在否定句中可以保留表特指（I didn't buy some of the books = 其中一部分没买），and 也有保留用法——与 G15 的口径一致。」
    - 例外 `xc-g29-some-kept`：「I didn't buy some of the books.（其中一部分没买）——some 在否定句中保留表特指」
    - 例外 `xc-g15-and-neg`：「I can't sing and dance 也是对的，意思是『不能边唱边跳』」
- **依据**：报告 §③ G29 条：chant/规则②把 some→any、and→or 写成无条件替换过头（否定句中 some 可保留表特指、and 有保留用法），且与 G15 规则①的诚实标注口径不一——补同款简化声明。入模 g29-some-any-neg 降格为 tendency 并登记例外；g29-two-tracks 规范化。

### G30 一般疑问句与怎问怎答

- **裁定**：概念层 基本成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【英语一般疑问句为什么要把助动词/be动词提到最前面？】英语采用**“句首信号灯倒装法”**——一开口先把 `Is / Are / Can / Do / Does / Did` 亮在句首第一个词，听话人立刻知道这是一个需要回答 Yes 或 No 的问题！」
  - chant：「一般疑问不用“吗”，句首信号提前挂：有 be 提 be，有 can 提 can，实义动词借 Do/Does/Did 站排头！一二人称要互换，谁问就用谁回答！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g30-yesno`（rule）
    - say：「疑问句把助动词提到最前面，怎问怎答。」
    - statement：「一般疑问句把信号提到句首：有 be 或情态动词就提它们，没有就请 Do、Does、Did 站句首（实义动词随之恢复原形）；一、二人称互换（I/we ↔ you）；简短回答与问句用同一个助动词，答句主语用人称代词（Yes, he does）。」
- **依据**：报告 §①（概念基本成立 / 内容成立）；§③ 抽查通过项：怎问怎答无误。原样规范化入模 g30-yesno。

### G31 特殊疑问词 5W1H

- **裁定**：概念层 基本成立 ｜ 内容层 基本成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么英语疑问词几乎都以 wh- 开头，而且必须放在句首第一个词？】英语把疑问词放在句首第一位（焦点前置），就像给听话人大脑发送一条检索指令：“请立刻去搜索【地点 Where / 时间 When / 人物 Who / 原因 Why】！”」
  - chant：「什么 what 谁是 who，谁的东西用 whose；哪里 where 何时 when，哪一个用 which 选；为什么 why 用 because 答，怎样程度全归 how！」
  - step3_rules 规则③：「③ **Why 与 Because 锁死配对**：用 **Why** 提问，回答必用 **Because...**」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g31-wh-words`（rule）
    - say：「缺什么信息，就派哪个疑问词站句首。」
    - statement：「特殊疑问词按所缺的信息分工并站句首：what（什么）、who（谁）、whose（谁的，问归属，与 Who、Who's 分清）、where（哪里）、when（何时，问任何时间）、which（哪一个）、why（为什么）、how（怎样）；What time 专问钟表上的几点几分。」
  - 主张 `g31-why-answer`（tendency）
    - say：「Why 多用 because 回答，也能用 to 回答。」
    - statement：「Why 提问的回答多用 Because ...（因为……），这是首选而不是唯一：也可以用 to 不定式回答（—Why did you come? —To help you.）。」
    - 例外 `xc-g31-to-answer`：「—Why did you come? —To help you.（用 to 不定式回答 Why，成立）」
  - 口诀 `ch-g31`（mnemonic）：「为什么用 why 来问，because 回答最稳当」
- **依据**：报告 §③ G31 条：规则③「回答必用 Because」过头（to 不定式亦可作答），降格为首选表述；§① 概念/内容均基本成立。入模 g31-wh-words 只登记 wh- 前置事实，g31-why-answer 降格为 tendency，口诀换 ch-g31（「because 回答最稳当」）。原 why 中的自造术语「焦点前置 / 检索指令」隔离处理，见文末存疑清单 Q2。

### G32 How 与 What 怎么选

- **裁定**：概念层 基本成立 ｜ 内容层 基本成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【核心原理揭秘：为什么同样问天气，一句话是 How is the weather? 另一句话却是 What is the weather like?】
• **What 的本质是【疑问代词（替身名词）】**：填补**名词**空缺！在 `What is the weather like?` 里，like 是介词“像……”，后面缺一个**宾语名词**，所以必须派代词 **What** 去当 like 的宾语！
• **How 的本质是【疑问副词（方式与程度探针）】**：修饰动词（问方式 How do you go?）或修饰形容词/副词（问状态程度 How is the weather? / How old / How tall）！没有介词 like 时，直接问状态形容词，必须派副词 **How** 出场！」
  - chant：「What 是代词替名词，追问事物与名称（What colour / What time / What...like）；How 是副词探状态，追问方式与程度！How 加形容词问高低（How old/tall/heavy/long/far），How many 数复数，How much 问价钱和不可数！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g32-how-what`（rule）
    - say：「缺名词用 What，问程度用 How。」
    - statement：「缺的是『东西』就用 What：What 是替身名词，去站名词空缺的位置——What is the weather like? 里 like（像）后面必须跟一个东西，What 就去当这个东西。问程度、状态、方式用 How：How 后跟形容词问『到什么程度』（How old、How is the weather），How many、How much 问的是数量这个程度，仍归 How 家族。」
- **依据**：报告 §② 其余概念层结论：why 的句法分析（代词填名词空缺 / 副词问程度）准确、概念无误，但表述密度超出小学生，属讲法需降维；§④·G32 给出降维全文（What 名词替身 / How 程度探针）并修正判断口诀边界（How many / How much 问数量、仍归 How）。入模 g32-how-what。

### G33 祈使句

- **裁定**：概念层 基本成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么祈使句没有主语，且第一个词永远用动词原形？】因为祈使句直接对眼前的听话人（You）发出指令，省去 You 直接亮出**动词原形**（Sit down! / Open your book!）！」
  - chant：「祈使句，省主语，动词原形站第一（Stand up!）；若表客气加 please，若表禁止 Don't 打底（Don't run!）；拉上伙伴一起干，Let's 加原形笑眯眯！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g33-imperative`（rule）
    - say：「祈使句省主语，动词原形站第一。」
    - statement：「祈使句直接对眼前的听话人发指令，一般省去主语 you，以动词原形开头（Open your book）；接形容词时用 Be + 形容词（Be careful）；加 please 表客气；否定用 Don't + 原形；Let's + 原形是邀伙伴一起做。标语可用 No + 动词-ing（No swimming）。」
- **依据**：报告 §①（概念基本成立 / 内容成立）。原样规范化入模 g33-imperative。

### G34 感叹句 What vs How

- **裁定**：概念层 基本成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么感叹句也是 What 和 How 两大家族？】跟疑问句底层逻辑一模一样！**What 管名词**（`What a nice day!` 核心落脚点是名词 day）；**How 管形容词/副词**（`How nice the day is!` 被感叹的是形容词 nice）！」
  - chant：「感叹句，看尾巴，先把主谓划掉它；剩下核心是名词，快请 What 来当家（单数可数 What a/an，复数不可数只用 What）；剩下只是形容词或副词，一律用 How 别犹豫！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g34-exclamatory`（rule）
    - say：「感叹名词用 What，感叹形容词用 How。」
    - statement：「感叹句与疑问句同理：被感叹的核心是名词用 What（单数可数：What + a/an + 形容词 + 名词；复数与不可数名词只用 What，不加 a/an），核心是形容词或副词用 How（How + 形容词/副词 + 主语 + 谓语）。判断法：划掉句尾的主语和谓语，看剩下的核心词。」
- **依据**：报告 §①（概念基本成立 / 内容成立）；§③ 抽查通过项：How/What 分工无误。原样规范化入模 g34-exclamatory。

### G35 There be 与就近原则

- **裁定**：概念层 基本成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么英语喜欢说 There is a book on the desk？】英语先用引导词 `There` 打头阵，再引出存在的新事物！而且 `be` 动词只看紧挨着它的第一个名词是单是复（就近原则）！」
  - chant：「There be 句型表存在，“某地有某物”记心怀；be 动词是个近视眼，只看身后第一个名：单数不可数用 is，复数紧挨就用 are！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g35-proximity`（rule）
    - say：「There be 看身后第一个名词定单复数。」
    - statement：「There be 表『某处有某物』：There is/are + 事物 + 地点。并列多个事物时，be 的单复数由紧挨着它的第一个名词决定（就近原则）。就近是考试与正式写作的约定，不是英语唯一的说法。」
    - 例外 `xc-g35-theres-plural`：「日常口语里 There's 后跟复数非常常见（There's two books on the desk）」
  - 口诀 `ch-g35`（mnemonic）：「There be 近视眼，身后第一定单复；就近是约定，写作要守住」
- **依据**：报告 §④·G35 讲法补注：chant「近视眼」比喻可用、保留不动，但须在 why 末尾声明「就近是考试与正式写作的约定，不是英语的唯一说法」（口语 There's + 复数常见）；报告 §③ 亦肯定本点规则②的口语注记为全库诚实标注范式。入模 g35-proximity 的 statement 已内嵌约定性声明，口诀换 ch-g35。

### G36 There be 与 have/has 分流

- **裁定**：概念层 基本成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么绝对不能写出 There have / There has？】空间里客观存在某物用 `There is/are`；某人拥有某物用 `主语 + have/has`。写成 There have 就把两条铁轨撞车了！」
  - chant：「汉语一个“有”，英语分两路：某地存在用 There be，某人拥有用 have/has；两条铁轨不交叉，写出 There have 必扣分！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g36-there-vs-have`（rule）
    - say：「『某地有』用 There be，『某人有』用 have。」
    - statement：「汉语的『有』在英语里分两轨：空间里客观存在某物用 There is/are（There is a tree in the garden）；某人拥有某物用主语 + have/has（I have a bike）。两轨不交叉，不存在 There have 这种拼法。」
- **依据**：报告 §①（概念基本成立 / 内容成立）；§③ 抽查通过项：There be 与 have 双轨分工无误。原样规范化入模 g36-there-vs-have。

### G37 同级比较 as...as

- **裁定**：概念层 基本成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么 as...as 中间只能放原级 tall？】既然两人一样高，没有谁比谁更突出，中间自然用不带任何变形的**原形（原级）**！」
  - chant：「两者相比一般高，as...as 架小桥；两个 as 夹中间，形容词副词用原级（as tall as）；若是前者不如后，not as (或 so)...as 记心间！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g37-as-as`（rule）
    - say：「一样高就不用比较级，as 中间放原级。」
    - statement：「as ... as 表两者同级，中间放形容词或副词的原级：比较级是给『不一样』准备的，两边一样时不用。否定式 not as/so ... as 表前者不如后者，中间仍然用原级。」
  - 口诀 `ch-g37`（mnemonic）：「天平两边一样沉，中间原级不加码」
- **依据**：报告 §② 其余概念层结论：原 why 是循环解释（「一样所以用原级」），无信息量但不假；§④·G37 换天平类比三步（像什么 / 像在哪 / 哪里不像，失效边界随讲）。入模 g37-as-as，口诀换 ch-g37。

### G38 比较级 -er/more + than

- **裁定**：概念层 基本成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么短词加 -er，长词前加 more？】单音节短词加 `-er` 轻快（taller）；多音节长词（beautiful/interesting）在前面加独立的 `more` 避免拗口！」
  - chant：「两者相比比高低，比较级配 than 字句；短词尾巴加 -er（去e/双写/变y为i），三音节长词加 more；好(good/well)变better，坏(bad)变worse，多变more，少变less！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g38-comparative`（rule）
    - say：「比高低：短词加 er，长词加 more，后面跟 than。」
    - statement：「比较级表两者比高低：短词尾加 -er（以 e 结尾加 -r；辅音 + y 变 i 加 -er；重读闭音节双写尾字母），长词前面加 more，后面跟 than。good/well 变 better、bad 变 worse、many/much 变 more，单独记。」
    - 例外 `xc-g38-two-syllable`：「两音节词如 clever、quiet 两种形式都有：cleverer 与 more clever 均可」
- **依据**：报告 §①（概念基本成立 / 内容成立）；§③ 抽查通过项：比较级构成与范围词无误。原样规范化入模 g38-comparative。

### G39 最高级 the + -est/most

- **裁定**：概念层 基本成立 ｜ 内容层 成立（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么最高级前面必须加 the？】因为全班最高的人是**唯一锁定（特指）的冠军**，自然要戴上定冠词王冠 **the**（the tallest / the biggest）！」
  - chant：「三者以上选冠军，最高级前戴 the 冠；短词尾巴加 -est，长词前面 the most 站；同类群体用 of all，空间地点用 in the class！」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g39-superlative`（rule）
    - say：「最高的人只有一个，所以戴 the。」
    - statement：「最高级表三者及以上里的『最』：短词尾加 -est，长词前面加 most，前面要加 the——因为最高级把所指唯一锁定（全班最高的那一个），正合 the『就是那一个』的本职。范围词：空间用 in（in our class），同类群体用 of（of all）。good/well 变 the best、bad 变 the worst。」
- **依据**：报告 §①（概念基本成立 / 内容成立）；§② 其余概念层结论：why「最高级使所指唯一可识别、故用 the」是站得住的语义解释。原样规范化入模 g39-superlative。

### G40 动词搭配 like doing / want to do

- **裁定**：概念层 基本成立 ｜ 内容层 过度简化（低）（report_grammar.md §①）
- **原说法节录**（GRAMMAR_DB.json 逐字）：
  - why_explanation：「【为什么不能写 I like swim 或 I want go？】一个简单句只能有一位真正的谓语动词国王！后面的第二个动词必须穿上 **to do（指向未来目标）** 或 **doing（表示习惯体验）** 的礼服！」
  - chant：「一山不容二虎，一句不站两原形！想要计划去未来，want / would like / plan 后接 to do；享受爱好常态事，like / enjoy / finish 后接 doing；Let 和 make 最豪爽，宾语后面接原形；It's time to do 接动作，It's time for 后接名词！」
  - step3_rules 规则①：「① **后接 `V-ing`**：`like / love / enjoy / finish + doing`、`go + doing (swimming/shopping)`、**所有介词后 (`be good at doing / thank you for helping`)**」
- **新说法**（grammar.yaml 逐字）：
  - 主张 `g40-one-finite`（rule）
    - say：「一句话只有一个谓语，第二个动词要变身。」
    - statement：「一个分句里只有一个限定动词作谓语；后面再出现动词，必须变形为 to do 或 doing，不能再用原形（不说 I like swim、I want go）。」
  - 主张 `g40-to-vs-ing`（tendency）
    - say：「想做没做的用 to，做着享受的用 doing；like 两边都行。」
    - statement：「第二个动词选 to do 还是 doing，大方向看动词家族：want、plan、would like 望向一个还没实现的目标，用 to do；enjoy、finish 是泡在活动里（享受或做完），用 doing；like、love 站在中间两可——like doing 多是享受、习惯，like to do 多是觉得该做、选择做。硬搭配先背：enjoy/finish 只接 doing，want/would like 只接 to do，介词后接 doing，let/make + 宾语 + 原形。」
    - 例外 `xc-g40-like-both`：「like to do 成立（I like to swim in the morning = 我选择早上去游泳），与 like doing（享受游泳）意义有别」
    - 例外 `xc-g40-stop-remember`：「stop doing（停下手头的事）与 stop to do（停下来去做另一件事）、remember doing 与 remember to do，换形式即换意思」
  - 口诀 `ch-g40`（mnemonic）：「想做没做 to 来带，做着享受 doing 来；like 两边都能站」
- **依据**：报告 §③ G40 条：规则①/chant 把 like 与 enjoy、finish 并列钉死在 doing 一侧是过度简化（低）——like/love 两可且意义有别（like doing 享受 / like to do 认为好、选择做），原 gloss「to do = 指向未来目标」只是启发式；§④·G40 给出讲法补段（want/plan 望向未实现目标用 to do；enjoy/finish 泡在活动中用 doing；硬搭配边界随讲）。入模 g40-to-vs-ing 降格为 tendency 并登记例外 xc-g40-like-both，g40-one-finite 保留「一位谓语国王」对应的真事实（一分句一个限定动词），口诀换 ch-g40。

## 概念层修正汇总（五处编造机制 + G03）

本包概念层改判共 6 点：G03 为「错误（高）」，其余 5 点（G04、G15、G19、G22、G28）为报告 §② 点名的「编造机制讲成原理」的过度简化。六处共同病灶：用一个好记的故事冒充语言的真实成因——故事预测对了分布，就被当成了原因。处理原则一致：撤销假机制，换真机制入模；故事若还有记忆价值，只能降格登记为 mnemonic 并标注失效边界，不得承载概念。

| 点 | 编造说法（原 why，报告 §② 引文） | 真机制 / 正确口径 | 入模处理 |
|---|---|---|---|
| G03 | 「水、面包、米饭、纸没有固定的单个形状，所以不能直接加 a 或 -s」——物理形状决定可数性 | 可数性是英语的习惯看法（识解）：看成一个个还是看成一整摊；形状论被 rice、furniture（有形不可数）与 cake、paper（双面）双向证伪 | g03-construal 换识解口径，与 boundedness cl-packaging 同义互指；旧 chant、subtitle 的材质/形状归类废止 |
| G04 | 「英语习惯把最重要的核心词放在最前面」+「有生命 's、无生命 of」生物二分 | 's 是默认首选（人、组织、国家、时间尤甚），of 多用于无生命且短语长重时；是倾向不是分工，二者大量重叠 | g04-s-form + g04-of-tendency（标签/说明牌讲法），例外登记报告反例原词 |
| G15 | 「同时放 because 和 so，语法树就断了」 | because 从句依附的主句本身即完整主干，不存在「树断」；真因是功能重复——同一对句子不能同时按从属与并列两种关系连接 | g15-because-so 改讲「两种接法不能叠用」，并补汉英成对关联词对比 |
| G19 | 「名词缺 -s，就把 -s 勋章贴到动词上」补偿平衡叙事 | 主谓一致：动词形式随主语人称/数变化；三单 -s 与复数 -s 历史上是两个无关词尾（前者源自古英语动词变位、北部 -es 胜出，后者源自 -as），从无转移/补偿 | g19-third-s 改讲主谓一致；新增词源记录 g19-s-history 登记两条独立源流 |
| G22 | 「高频动词完整保留了古英语变换内部元音来表过去的传统」 | 元音变换（ablaut）只覆盖 sing→sang 一类；went 是借 wend 过去式的补格，bought/had 是弱变化，put/read 同形——老词各有老变法，没有总规律 | g22-irregular-past 撤统一叙事；g22-groups-mnemonic 只作分组记忆登记 |
| G28 | 「英语是焦点先行思维」——自造标签上升为民族思维原理 | SVO 只是语序类型学标签，不指「焦点」；可讲的真相在信息结构：先给主干事件，状语是可拆卸的补充成分 | g28-svo-order 撤标签、改讲信息顺序；explain 中明文禁用该标签 |

## 存疑清单（未入模，共 2 项）

与 T2.done 台账一致；两项的隔离方式经 T2.review.md §4 复核确认恰当——事实部分均已正确入模，隔离的只是测验设计与术语地位本身。

- **Q1 · G24 测验选项拆分**：原题 step4_quiz choice 题干「My family _____ going to _____ a trip next week.」的正确选项写成「is/are; take」，把两个答案并进一个选项（原文见上 G24 行节录）。报告 §③ G24 条只记形式问题、未给拆分改法；此属测验设计层，不应入主张，模型正确地未为其立 claim。其事实部分（family 等集合名词作主语时单复两可——看作整体用单数、看作成员用复数）已随 g24-going-to 的 note 入模登记。处置：待 T9 旧库补丁处理测验层时拆题（二选一）或改排序题；在此之前隔离存疑，不入模。
- **Q2 · G31 术语「焦点前置 / 检索指令」**：G31 why_explanation 原文含「（焦点前置）」与「检索指令」等表述（原文见上 G31 行 why 节录）。报告 §② 只点名了「检索指令」为修辞，T2 回查原数据确认「焦点前置」亦在原文中（归因经复核属实）。其事实部分（wh- 词前置提问）已入模为 g31-wh-words，该主张 note 明文：「旧 why 的『焦点前置/检索指令』是修辞说法，其中『焦点』一词与 G28 已定案的假统一标签同名，本模型不采用该词，只登记 wh- 前置这一事实」。两个术语的语言学地位无法确证，隔离存疑、不入模；注意与 G28 的「焦点先行思维」区分——后者已按概念改判撤销，不属存疑。

## 与 boundedness 模型的互指说明

- **G03 判据本体在 boundedness**：可数性判据的本体记录是 boundedness 模型的主张 `cl-packaging`——say：「看成一个个的，就能数；看成一摊的，不能直接数。」；statement：「英语数东西先看『看法』：看成一个个独立个体的（苹果、杯子、豌豆），能直接数；看成一摊料、一类事的（水、面包、米饭、作业），不能直接数，要借单位词来数。」。grammar 侧的 `g03-construal` 是 G03 这一知识点的更正口径，显式回指该本体，**全库只有一套判据文本，不存在第二套**（T2.review.md §2(a) 已逐字核对判据同一）。grammar.yaml 全文「形状」仅出现在否定/废止语境，无任何正面陈述形状判据之处。
- **G06 the 判据互指**：grammar 的 `g06-the-known` 与 boundedness 的 `cl-the-known` 同义互指——后者 say：「大家都知道是哪一个，用 the。」，statement：「说的人和听的人都知道指的是哪一个时，用 the。」。
- **G05 词源互指**：a/an 与 the 的词源事实登记在 boundedness 的 `cl-a-etym`——statement：「a / an 来自古英语 ān『一』：an 是原形，在辅音前弱化成 a；the 来自古英语的指示词系统。所以 a 约等于 one，the 约等于『就那个』。」；grammar 的 `g05-sound-rule` 只登记听音规则本体，以 note 指回该词源记录，不重复登记。
- **双面词互指**：grammar 例外 `xc-g03-dual`（cake/paper/glass/chicken 双面词）与 boundedness 的 `cl-whole-material` 对应——后者 say：「整只看，能数；当材料看，不能数。」。
- **校验口径**：`validate.py` 已对 grammar.yaml + boundedness.yaml 联合运行通过（计数与结果见 T2.review.md §1）；须知该校验器为逐文件独立校验、不解析跨文件引用，上述互指以 note 文本实现并经复核人工核对、目标均存在且内容对位（T2.review.md §5 L3，T7 汇总时再议跨文件模式）。

**计数：21 概念 / 61 主张 / 93 例证 / 24 例外 / 12 口诀（与 T2.done 一致；validate.py 对 grammar.yaml 校验通过）。**

（全文完）
