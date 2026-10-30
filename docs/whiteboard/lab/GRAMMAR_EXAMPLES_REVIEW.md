# 语法例句全量取核对报告（决策 34-B）

> 由 `src/build_grammar_examples.py` 生成（2026-10-31）。句池：词库例句、日常用语 144 句、GRAMMAR_DB 和各模块英文句，去重后 2173 句；按语法特征自动筛选 + 人工抽查，再去掉含词库外实词的句子。每句在 App 里都能点读。

## 数字

- 共 **3809** 句（一句可属多个语法点）
- 少于 5 句的语法点：无
- 少于 15 句的：G17（13）、G23（13）、G37（5）、G39（13）

## 每个语法点

| 点 | 名称 | 句数 | 肯定 | 否定 | 疑问 | 祈使 | 感叹 | 原有例句 | 因含词库外实词去掉 | 判定特征 |
|---|---|---|---|---|---|---|---|---|---|---|
| G01 | 名词单复数规则变化 (-s/-es/-ies/-ves) | 326 | 251 | 5 | 26 | 40 | 4 | 4 | 72 | 名词复数且为规则变化：spaCy 标 NNS，且词形 = 原形 + s / es / 辅音y→ies / f(e)→ves；排除 glasses、trousers、clothes 等只用复数的词 |
| G02 | 名词不规则复数变形记 (children / feet / sheep) | 27 | 26 | 0 | 0 | 1 | 0 | 3 | 7 | 不规则复数词表 children/men/women/teeth/feet/mice/geese/people/-men；sheep/fish/deer 仅在前有 2 以上数词或 these/those/many 时算 |
| G03 | 不可数名词与量词容器 (water / bread / a cup of) | 45 | 24 | 2 | 7 | 12 | 0 | 3 | 3 | 容器量词 `cup/glass/bottle/piece/bowl/bag… of + 不可数/食物名词`；或不可数名词（water/milk/bread/rice/juice/homework…）前有 some/any/much/a little/a lot of/how much |
| G04 | 名词所有格 ('s 有生命 vs of 无生命) | 27 | 20 | 0 | 6 | 1 | 0 | 2 | 5 | 名词所有格 's / s'（前一词为名词且依存为 poss），或 `the + N + of + the/专名 N`（排除量词、a lot of、in front of 等） |
| G05 | 不定冠词 a 与 an 的听音法则 | 34 | 26 | 0 | 0 | 7 | 1 | 4 | 7 | an + 元音音素词；或 a + u/eu/one 开头而读辅音的词（a university / a useful）。只含普通 a 的句子不算（a 是主角的句子没法机判，且量太大） |
| G06 | 定冠词 the 与零冠词（球类三餐 vs 西洋乐器） | 66 | 55 | 3 | 4 | 4 | 0 | 4 | 9 | play the + 乐器；play + 球类/棋类（零冠词）；have/eat + 三餐（零冠词）；the sun/moon/sky/earth/world；by + 交通工具；go to school/bed（零冠词） |
| G07 | 人称代词主格与宾格 (I vs me / he vs him) | 79 | 43 | 0 | 13 | 23 | 0 | 4 | 27 | 宾格代词 me/him/us/them（her 仅作宾语时）出现在宾语/介词宾语位置 |
| G08 | 形容词性物主代词 vs 名词性物主代词 (my vs mine) | 19 | 12 | 1 | 6 | 0 | 0 | 4 | 4 | 名词性物主代词 mine/yours/hers/ours/theirs（或独立的 his），或 Whose 问句；同句的形容词性物主代词一并标出。只有 my/your 的句子不算（不是对比主角） |
| G09 | 指示代词四兄妹 (this / that / these / those) | 92 | 53 | 2 | 30 | 7 | 0 | 4 | 22 | this/that/these/those 作限定词或代词（spaCy DT；排除关系词/连词 that） |
| G10 | 不定代词 some 与 any 的地盘分工 | 46 | 19 | 5 | 9 | 13 | 0 | 5 | 8 | some/any 作限定词或代词，及 something/anything/someone/anyone/somebody/anybody/somewhere/anywhere |
| G11 | 形容词的位置与系表搭桥铁律 | 242 | 200 | 5 | 20 | 13 | 4 | 3 | 54 | 形容词作表语：acomp 依存于 be/look/feel/smell/taste/sound/get/turn/become/keep 等系动词；或形容词后置于 something/anything/nothing |
| G12 | 副词修饰动作与频率副词位置 (fast / happily / always) | 89 | 63 | 2 | 4 | 16 | 4 | 3 | 20 | 频率副词 always/usually/often/sometimes/never；或修饰动词的方式副词（-ly，及 fast/well/hard/early/late） |
| G13 | 基数词与序数词变形黄金口诀 (one→first, twelve→twelfth) | 105 | 94 | 0 | 0 | 11 | 0 | 3 | 22 | 序数词（first…twentieth、21st 等）或数词词形的基数词（two…hundred，不含 one） |
| G14 | 介词专项：in / on / at 空间图式 ➔ 时间 ➔ 状态隐喻映射 | 315 | 250 | 1 | 17 | 47 | 0 | 3 | 87 | in/on/at 作介词带宾语（排除 look at、put on、turn on 等短语动词）；按宾语分「时间 / 地点·状态」 |
| G15 | 连词逻辑关系网 (and / but / or / because) | 48 | 36 | 5 | 5 | 2 | 0 | 3 | 15 | but/or/so 并列；because 从句；and 连接两个带主语的分句 |
| G16 | be 动词现在时三剑客 (am / is / are) | 487 | 389 | 8 | 82 | 0 | 8 | 3 | 98 | am/is/are 作句子主动词（系动词，不是进行时/被动的助动词，不含 there be） |
| G17 | be 动词过去时双子星 (was / were) | 13 | 10 | 1 | 1 | 0 | 1 | 5 | 6 | was/were 作句子主动词（系动词） |
| G18 | 一般现在时：习惯作息与客观真理 | 356 | 304 | 13 | 37 | 0 | 2 | 3 | 67 | 实义动词一般现在时：VBP/VBZ 主动词无助动词，或 do/does + 原形（否定/疑问）；祈使句不算 |
| G19 | 一般现在时第三人称单数（三单小尾巴 -s/-es） | 151 | 131 | 6 | 12 | 0 | 2 | 3 | 38 | G18 中的第三人称单数：VBZ 实义动词（含 has），或 does/doesn't + 原形 |
| G20 | 现在进行时 (am/is/are + V-ing) | 70 | 64 | 0 | 5 | 0 | 1 | 3 | 22 | am/is/are + V-ing（排除 be going to + 原形 和 How is it going） |
| G21 | 一般过去时规则变化 (-ed 变形与发音) | 48 | 47 | 0 | 1 | 0 | 0 | 3 | 26 | 实义动词 VBD 且为规则 -ed / -d / 辅音y→ied / 双写 + ed |
| G22 | 一般过去时不规则动词高频榜 (go→went / see→saw) | 102 | 97 | 3 | 0 | 0 | 2 | 3 | 41 | 实义动词 VBD 不规则（went/saw/had/put…，不含 was/were） |
| G23 | 一般过去时否定与疑问（did 能量吸收器） | 13 | 0 | 6 | 7 | 0 | 0 | 6 | 4 | did/didn't + 原形；Did 开头问句；简略回答里的 didn't |
| G24 | 一般将来时：be going to + 动词原形 | 19 | 14 | 0 | 5 | 0 | 0 | 5 | 4 | am/is/are(+not) + going to + 动词原形（含疑问句倒装） |
| G25 | 一般将来时：will + 动词原形 | 17 | 12 | 1 | 1 | 3 | 0 | 4 | 9 | will/'ll/won't + 动词原形 |
| G26 | 情态动词 can / can't（能力与许可） | 87 | 37 | 10 | 39 | 0 | 1 | 4 | 16 | can/can't/cannot + 动词原形 |
| G27 | 情态动词家族：must / mustn't / should / may | 22 | 11 | 1 | 10 | 0 | 0 | 4 | 3 | must/mustn't/should/may + 动词原形 |
| G28 | 肯定陈述句黄金语序：主谓宾 + 先地点后时间 | 18 | 18 | 0 | 0 | 0 | 0 | 2 | 6 | 肯定陈述句中「地点状语」（in/at/on/to + 场所名词，或 home/here/there）在「时间状语」（every day、at 7:30、yesterday、in summer…）之前 |
| G29 | 否定句变形双轨制（be/情态 vs 实义动词借 don't/doesn't/didn't） | 39 | 0 | 39 | 0 | 0 | 0 | 5 | 3 | 否定陈述句（含 not/n't），按「be/情态 + not」与「借 do/does/did」分轨；祈使否定归 G33 |
| G30 | 一般疑问句与“怎问怎答”铁律 | 101 | 11 | 7 | 83 | 0 | 0 | 6 | 13 | 以 be/do/情态动词开头的一般疑问句；以及「Yes/No, 代词 + 助动词(n't).」简略回答 |
| G31 | 特殊疑问词全家福 (5W1H 精准分工) | 134 | 0 | 0 | 134 | 0 | 0 | 7 | 15 | 以 What/Where/When/Who/Whose/Which/Why/How 开头的问句 |
| G32 | 深度原理突破：How 与 What 到底怎么选？ | 48 | 0 | 0 | 48 | 0 | 0 | 2 | 4 | How 开头的问句；What … like? ；What + 名词（What colour/time/day…）开头的问句；How about |
| G33 | 祈使句：指令、礼貌请求与禁止标语 (Open... / Don't... / Let's...) | 276 | 0 | 0 | 0 | 276 | 0 | 4 | 118 | 祈使句：动词原形开头无主语、Don't/Never/Please/Let('s)/Be 开头、No + V-ing |
| G34 | 感叹句双雄：What (a/an) vs How 秒判法则 | 25 | 0 | 0 | 0 | 0 | 25 | 5 | 7 | What (a/an) + (形容词) + 名词 (+ 主谓)! 或 How + 形容词/副词 (+ 主谓)! |
| G35 | There be 存现句与“就近原则” | 45 | 44 | 0 | 1 | 0 | 0 | 3 | 6 | There is/are/was/were/will be，及 Is/Are there 倒装 |
| G36 | There be 与 have/has 的“有”字双轨分流 | 53 | 47 | 2 | 4 | 0 | 0 | 3 | 8 | have/has/had 作「拥有」主动词带宾语（排除 have breakfast/fun/a look/a class 等轻动词用法与 have a cold 等病症）；There be 见 G35，两点合并展示即「有」字双轨 |
| G37 | 同级比较：as + 原级 + as（和……一样） | 5 | 4 | 1 | 0 | 0 | 0 | 5 | 2 | as + (副词) + 形容词/副词 + as（排除 as soon as / as well as） |
| G38 | 比较级：-er / more... + than（两者比高低） | 23 | 20 | 0 | 2 | 1 | 0 | 3 | 2 | 比较级 JJR/RBR（-er、better）或 more + 形容词/副词；排除 elder/other 及 more + 名词 |
| G39 | 最高级：the + -est / most...（三者及以上夺冠） | 13 | 7 | 0 | 6 | 0 | 0 | 3 | 1 | 最高级 JJS/RBS 或 the most + 形容词；排除 best friend / best wishes |
| G40 | 动词核心搭配黄金句型 (like doing / want to do / It's time...) | 84 | 67 | 2 | 9 | 6 | 0 | 4 | 69 | like/love/enjoy/finish/practise + V-ing；go + V-ing；want/plan/try/hope… + to do；would like；let/make/help sb do；ask/tell/teach sb to do；介词 + V-ing；It's time to/for |

## 说明与待定

- 词库没收 a / the / be / can / will 等功能词，也没有 now、last、great、nice、let 等常用词，按「每个词都在词库」严格口径只有约 1/3 的句子能过；这里用「实词都在词库」口径。要不要把这些常用词补进词库，需用户定。
- G05 只收 an 和「a + u 读 /juː/」的句子，G08 只收名词性物主代词和 Whose 问句（普通 a、my 的句子太多、不典型）。
- G16、G18、G14、G33、G01、G11 几百句的大点只做了自动清理（混时态、超长句、套语、片段）+ 抽查，没有逐句通读。
