# 决策 35-B2 语法硬伤：改前 → 改后对照表

补丁：`src/patch_b2_grammar.py`（GRAMMAR_DB / 积木渲染 / 重音规律表 / 口腔省力原理 / 疑问词雷达 / 2 条词卡例句）、`src/patch_b2_grex.py`（把 `lab/GRAMMAR_EXAMPLES.json` 写回 GRAMMAR_EX_JSON 块）。防回退：`src/grammarcheck.py`（入 runall）——改前 39 处不合格，改后 0。

## 1. 句子积木：新增 C（表语）角色

渲染：`roleShapePrefix` 新增「◇ 表语」，O 改名「◆ 宾语」（原「◆ 宾/表」）；CSS `.block-chip.role-C` 紫色；图例加「◇ 紫=表语」。判题仍按英文顺序比对，角色只影响颜色和标签。

| 点 | 改前 | 改后 |
|---|---|---|
| G04 | my sister's new bike = O | = C |
| G08 | hers, not mine = O | = C |
| G09 | ducks = O（Are those ducks over there?） | = C |
| G11 | smells / **very delicious** = O | smells / **delicious** = C（delicious 一般不加 very） |
| G16 | very happy = O | = C |
| G17 | very cold = O | = C |
| G25 | sunny and warm = O | = C |
| G27 | keep / quiet = O | = C（keep quiet，keep 是系动词用法） |
| G31 | Whose dictionary = O | = C（this 是主语） |
| G32 | How tall and how heavy = O | = C |
| G34 | How beautiful = O | = C |
| G35 | a **clean** river（清澈的小河） | a **clear** river |
| G37 | as heavy as yours = O | = C |
| G38 | bigger and heavier = O，than a monkey = A | 两块都 = C（比较对象是表语的一部分） |
| G39 | the fastest boy = O | = C（in our class 仍作范围状语 A） |
| G40 | Thank you = V，for helping me = A，learn English = O（拆错） | Thank = V，you = O，for helping me learn English = A |

## 2. 讲解文字

| 点 | 改前 | 改后 | 依据 |
|---|---|---|---|
| G05 原理 | 「a 在元音前……垫一个鼻音 n 变成 an」 | an 是原形（古英语 ān「一」，one 同源），辅音前 n 读丢变成 a；元音前保留 n，不撞车 | Etymonline「a」：「"one" (see an). The disappearance of the -n- before consonants…」 https://www.etymonline.com/word/a |
| G01 规则⑤ | 有生命加 -es，无生命加 -s | 列出 potatoes / tomatoes / heroes 与 photos / zoos / pianos / radios / kangaroos；💡 标明口诀不是真规则（kangaroo 反例）；两道题解析去掉「有生命 / 无生命」 | 审计 3.1 |
| G07 规则③ | 复数按 we, you and they | 单数 you, he and I 保留；⚠️ 复数顺序是国内教辅口诀 | 审计 3.1 |
| G11 规则② | — | 补一句：delicious 本身是「非常好吃」，一般不说 very delicious | 审计 3.1 |
| G15 | 「否定句并列必须换成 or」铁律；改错题 I can't sing and dance 判为错 | 「表示两样都不时通常换成 or」+ ✂️ I can't sing and dance 也对（不能边唱边跳）；改错题换成 Which do you like better, tea and milk?（二选一问句必须 or） | 审计 3.1 |
| G22 规则① | i 变 a 里混进 come→came、run→ran，后接补丁句「注意：……不是 i 变 a」 | 拆成「i 变 a：sing / swim / drink / sit / give」+「o / u 变 a：come / run」，删补丁句 | 审计 3.1 |
| G28 规则② + 改错题 | 「绝不能把时间地点插在主谓之间」「时间词放句尾！」 | 时间、地点短语不插在主谓之间；时间状语常在句尾，也可放句首；⚠️ 频度副词 always / usually / often 就在主谓之间 | 审计 3.1（与 G12、G17、G21 例句一致） |
| G32 规则③ | 「（问外貌性格或天气，What 问事物，How 问程度。How do you like 是对的）」补丁残文 | What is she like? / What's the weather like?；另说明 How do you like…? 里 like 是动词 | 审计 3.1 |
| G35 规则② | 就近原则无说明 | ✂️ 考试按就近原则；口语里也常听到 There's two books… | 决策 36-④ G35 |

## 3. 发音规律表（STRESS_AND_SCHWA_DB）

| 条 | 改前 | 改后 | 依据 |
|---|---|---|---|
| 法则 A | 「名前动后」重音**铁律**；理由「名词静态重心在开头、动词能量冲向词尾」 | 改「规律」：只对一批成对词成立（至少 170 对）；反例 visit / promise 都前重、report / control 都后重；💡 比喻不是原因 | Wikipedia「Initial-stress-derived noun」：「At least 170 verb-noun or verb-adjective pairs exist」 https://en.wikipedia.org/wiki/Initial-stress-derived_noun |
| 法则 B | 后缀「重音磁铁」**定律**，-tion / -ic「重音 100% 吸在前一个音节」，-ee/-ese/-eer「直接吸在后缀上」，合成名词「重音永远在第一个词」 | 「规律」；-tion「几乎总在」，-ic / -ian「通常」（例外 Arabic、politics），-ee 等「通常」（例外 coffee、committee），合成名词「通常」（例外 apple pie） | 常见词典标音 |

## 4. 例句

| 位置 | 改前 | 改后 |
|---|---|---|
| 例句库 G15 / G31、疑问词雷达、词卡 what 例句 | Which season do you like **best**, spring or autumn / summer? | … like **better**, … |
| 例句库 G39 | 同上两句 | 删除（改成 better 后不属于最高级） |
| 例句库 G01 / G03 / G09 / G11 / G18 / G19 | This bowl of noodles smells **very** delicious. | …smells delicious. |
| 例句库 G14 / G35 | There is a **clean** river in the forest. | …a **clear** river… |
| 例句库 G21 | The rain stopped **and look** at the big rainbow! | The rain stopped. Look at the big rainbow! |
| 例句库 G20 | We are going to the supermarket tonight.（进行时表将来，容易和 G24 混） | 从 G20 删除（G28 语序里保留） |
| 词卡 transport（G6_0679）例句 / 义项例句 | Subway is a fast public transport. 地铁是一种快速的公共交通工具。 | Buses and subways are public transport. 公共汽车和地铁都是公共交通工具。 |

例句库 3809 → 3806 句（G39 13 → 11、G20 −1；C6 补句时补回）。

## 5. 口腔省力原理（FIRST_PRINCIPLES_DB，fp_economy）

| 处 | 改前 | 改后 |
|---|---|---|
| 统一规则表 a→an | 「两个元音相撞……插入鼻音 /n/」 | 「历史真相：an 才是原形……辅音前 n 读丢才变成 a；元音前留住 n」 |
| 第三幕 topBanner / 卡片标题 | 元音撞元音加 /n/ 架桥；「元音防卡顿桥梁 (a ➔ an)」 | 留 n 不撞车：an 是原形……；「元音前留住 n (an 是原形，辅音前变 a)」 |

## 6. 没改、待别的道处理

- **白板场景文字未重建**（只改了数据；场景是 R38 / 道 3 的）：`hd_g05_1`（a/an 历史，R38 第 6 幕）、`fp_economy_3`（a→an，R38 第 15 幕）、`hd_g28_1`（「绝不能把时间」）、`stress_rhythm_1/2`、`intonation_map_2`（名前动后 / 100%）。重建时按本表改文字。
- 「Monday is the second day of a week」：当前主文件明文与 469 幕 ITEMS 里都已找不到，未改。
- G14 at the weekend vs on the weekend → 35-A7（英美拼写）统一口径时改。
- 口语对话里的 The rain stopped and look at… 与 12 话题「It's sunny and warm. Put on your jacket!」→ 35-B1。
