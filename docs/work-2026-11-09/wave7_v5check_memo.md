# 第七波白板线 v5check 底稿

> 分支 `wave7/v5check`（工作树 `~/workspace/wave7-v5check`），基线 HEAD `8e278f2`。
> 只做任务书 4 项（第 1、2、4、5 项；第 10 项并入第 4 项）。新发现的待定夺只记入本底稿，不擅自实施。
> 第七波为最后一波自动波；“完”的标准是 check_all 绿 + 已知儿童可见内容错误清零，之后是真机/孩子实测，不是第八波。

## 数字总表

| 时点 | FAIL | 其中 R2-W1 | 其中 R4-F2 | WARN | R2-P1 | R4-WARN | 豁免跳过 |
|---|---|---|---|---|---|---|---|
| 基线 8e278f2 | 439 | 399 | 40 | 105 | 6 | 99 | 748 |
| 第 2 项后 | 439 | 399 | 40 | 107 | 8 | 99 | 748 |
| 第 1 项后 | 439 | 399 | 40 | 101 | 2 | 99 | 748 |
| 第 4 项后 | 399 | 399 | 0 | 113 | 2 | 111 | 748 |
| A-1 后 | 393 | 393 | 0 | 113 | 2 | 111 | 748 |
| A-2 后 | 390 | 390 | 0 | 113 | 2 | 111 | 748 |
| A-3 后 | 384 | 384 | 0 | 113 | 2 | 111 | 748 |
| A-4 后 | 367 | 367 | 0 | 113 | 2 | 111 | 748 |
| A-5 后 | 332 | 332 | 0 | 113 | 2 | 111 | 748 |
| A-6 后 | 323 | 323 | 0 | 113 | 2 | 111 | 748 |
| A-7 后 | 317 | 317 | 0 | 113 | 2 | 111 | 750 |
| A-8a 后 | 293 | 293 | 0 | 113 | 2 | 111 | 750 |
| A-8b 后 | 283 | 283 | 0 | 113 | 2 | 111 | 750 |
| B-1 后 | 267 | 267 | 0 | 113 | 2 | 111 | 750 |
| B-2 后 | 249 | 249 | 0 | 113 | 2 | 111 | 762 |
| B-3 后 | 216 | 216 | 0 | 113 | 2 | 111 | 762 |
| B-4 后 | 193 | 193 | 0 | 113 | 2 | 111 | 762 |
| B-5 后 | 171 | 171 | 0 | 113 | 2 | 111 | 762 |
| B-6 后 | 137 | 137 | 0 | 113 | 2 | 111 | 762 |
| B-7 后 | **135** | **135** | 0 | 113 | 2 | 111 | **766** |

UNKNOWN 870（精灵包 stub）全程未变。FAIL 135 = auto 40 + oral 89 + poly 6。

## 第 1 项：6 项无法归一，各补一句例句（已提交 `b0b0942`）

- `in`×2（fp_economy_3 / gen_phonology_3）：OALD 原句 `Many of the figures were incorrect.`（2026-11-10 网上核实，oxfordlearnersdictionaries.com）。
- `moon`×2（wo_time_week_p2_1 / gen_stock_wo_time_week_p2_1）：OALD 原句 `There's no moon tonight.`（同上核实）。
- `ith`×2（wo_vowel_b_1 / gen_stock_wo_vowel_b_1）：`The old ending was -ith.`——**非 OALD**（-ith 无 OALD 词条），直接英译本幕板上叙述句（古时候这条尾巴是 -ith）。
- 做法：先读词从旧句移到新句（只加句不移词修不好旧项——checker 按句查先读词）。
- 结果：WARN 107 → 101（R2-P1 8 → 2，只剩两处 `'I'`）。

## 第 2 项：checker 收紧单字母先读词（已提交 `bfb287a`）

- `v5check.py` `pre_word_ok`：单字母先读词 `I`/`a` 只按精确匹配通过，不再走屈折口径（`I+s=is` 漏洞已堵）；`'s` 仍豁免（复数标记）。
- 反面验证：旧口径下唯一通过的两处（`writing_alchemist_3.js` + 生成幕，先读词表尾 `'I'`，句中有 `is` 无 `I`）现报 R2-P1。
- 结果：FAIL 不变；WARN 105 → 107（R2-P1 6 → 8）。两处 `'I'` WARN **未修**（本项范围是 checker + 验证 + 重跑，不含内容修）。
- **待定夺（只记，不实施）：** 删两处先读词表尾的孤 `'I'`，或把它移到第 54 行那句（含 `I look forward to it!`）的先读词表。

## 第 4 项：R4-F2 40 项（已提交 `74ef6af`；第 10 项死键清理并入）

- 逐键核对（`wave7_r4f2_dump.txt` / `wave7_r4f2_analysis.txt`）：40 个死键全部无板上内容，**全部删除、零补句**（不编造）。如 `irregular_plural_2` 的 `postmen` 死键是因为 `One postman, two postmen.` 在第 1 幕不在第 2 幕。
- `gen_scene.py` 新增 `crop_acts_to_sentences`（只裁 items 模式，know 模式不动）：复用 v5check 的 `extract_items`/`extract_acts`/`token_covered`/`norm_word`，与 `auto.js:95` 同一匹配规则；`'*'` 键保留；裁空写 `{}`；import 失败大声报错。
- 全量重生成 309 个 items 模式 spec，0 失败；45 个生成幕各改 1 行（ACTS 行），共删 122 个死键（含 32 幕 R4-F2 名单之外的、被手写幕句子在族级掩盖的死键）。4 处可疑删除人工核实无误（`get on` 的 `get` 不在、`look for` 的 `look` 不在、`go` 只在 `Good` 里、`pass` 只在 `passport` 里）。
- 手写幕删 8 幕 14 键；`units.json` 同步 7 处（格式往返已验）。
- 结果：FAIL 439 → 399（R4-F2 40 → **0**）；WARN 101 → 113（R4-WARN 99 → 111：恰为 12 幕新变 ACTS 为空，是诚实信号，非回归）。

## 第 5 项：R2-W1 剩余 399 项，逐幕判断（auto 先行；oral 89 / poly 6 另议）

方法：补句 / 豁免 / 改板三选一，逐幕判断，不批量套用第六波第一批方法。补句只用已核实来源（OALD 原句优先）；核不到的留空记入底稿。

### 批次总表

| 批 | 内容 | FAIL |
|---|---|---|
| A-1（`57d28c5`） | aux_transformer p3_1/p3_2/p3_4/p4_1/p4_4 板上句朗读 | 399 → 393 |
| A-2（`56140a5`） | five_patterns_4 + gen_sentence_2/3 | 393 → 390 |
| A-3（`4fdce75`） | spacetime 1–4 + gen_sentence_1 + bamboo_tree_1 | 390 → 384 |
| A-4（`5f8dbe6`） | letters 2–4、economy_4/phonology_4、eight_endings_1、irregular_plural_2、wo_rule sc_sh/latplural/norse、hd_g13_1 | 384 → 367 |
| A-5（`9d0a726`） | vv_* 短语动词幕 + hd_relations_2 | 367 → 332 |
| A-6（`be013d3`） | assim_1、viewpoint_1–4、wo_time_week_p3_1/p4_1（手+生成） | 332 → 323 |
| A-7（`6daad28`） | stress_rhythm_1–3（手+生成）+ r2skip 新类 `ipa_fragments` | 323 → 317 |
| A-8a（`0be8fbf`） | wo_rule 12 幕（ablaut/c_ch/en_plural/french_s/greek/gvs/hgcs/metath/norman/register/tsl/usuk） | 317 → 293 |
| A-8b（`0283fe8`） | wo_grimm 4 幕 + wo_port_p4_1 | 293 → 283 |
| B-1（`18cf21e`） | hd formation 1–3 + fr02_1/2/3 + fr03_2 + fr04_3 | 283 → 267 |
| B-2（`944e514`） | hd fr06_1/fr07_1/2/3/fr08_1/2/fr09_2/fr10_1/2 + frame_roles 扩词 | 267 → 249 |
| B-3（`2f8435d`） | hd g01–g12 | 249 → 216 |
| B-4（`b29bb6c`） | hd g15–g30 | 216 → 193 |
| B-5（`98a3d6c`） | hd g31–g40 | 193 → 171 |
| B-6（`d0e47f0`） | hd phonics_1–4/poly_law_v16/v41/relations_1/3/sum_how_what_1–3/sum_interrogatives_1–3/sum_pronouns_1–3/sum_syntax_2/3 | 171 → 137 |
| B-7（`14d307c`） | pron_map_1 逐幕 R2SKIP `zis`/`wery` | 137 → 135 |

### A-6 细目

- `wo_rule_assim_1`（手写，无 spec）：前缀表 `In, im, il, ir.`；平行句 `It is illegal.` / `It is irregular.`（与 `It is impossible.` 平行）；先读词 `possible`/`legal`/`regular` 分别借 `impossible`/`illegal`/`irregular` 子串进先读词表；词源表 `Arrive, ad, ripa.`。
- `gen_viewpoint_1`：`I see students interested in science.`（板上同例，与 `I see a man afraid of dogs.` 平行）。
- `gen_viewpoint_2`：`You bought what?`（回声问句板上原句）。
- `gen_viewpoint_3`：`In the morning.` + `See you on Sunday morning.`（与 `See you on Tuesday morning.` 平行）；先读词 `day` 借 `Sunday` 子串（Sunday = sun + day，本幕姐妹幕 wo_time_week_p4_1 的词源）。
- `gen_viewpoint_4`：`I have done my homework.`（公式 have/has + 过去分词（done）的实例；与 gen_sentence_2 的 `done`（另管）不同，此处 `done` 是公式示例分词）。
- `wo_time_week_p3_1`（手+生成）：`Saturday is Saturn's day.`（与 `Thursday is Thor's day.` 平行）；`þunresdæg, Thuresday, Thursday.`（板上词形演变原样朗读；`þunresdæg` 含 þ/æ，checker 的 ASCII 正则从中切出 `unresd`，故 `unresd` 随之覆盖）。
- `wo_time_week_p4_1`（手+生成）：`Sunday is sun plus day. Monday is moon plus day.`（预测题揭晓句）；`September was the seventh month. December was the tenth month.`（板上一句话洞见的实例）。
- 未动（记入剩余）：`five_patterns_p2_4` 的 `do`×2（DO=直接宾语标签，与已豁免的 IO/SVOO 同类，但 `do` 是实词动词、不能进全局豁免）、`for`×1（公式里的 for 备选，for 句型在 p3_4 已读）；`five_patterns_p3_4` 的 `do`×2（同上）；`five_patterns_p3_1` 的 `in`（`arrive IN(AT)` 标签，wave-6 §4 已定留待内容方定夺：豁免/补句/改板）。

### r2skip `frame_roles` 扩词（B-2，随本批进 `r2skip.json`）

- **理由：** 与已豁免的 Giver/Recipient/Theme/Agent/Patient/Experiencer 等同类——框架语义句法结构公式里的角色名，不是本幕要教的词。`frame_roles` 原有词（agent、patient、theme、location、traveler、destination、wearer、clothing、vehicle 等）本身也是实词，豁免口径是“只出现在公式行里”，三词符合同一口径。
- **全量核查（2026-11-10）：** 全库 `w` 行切出 token `speaker`/`addressee` 的只有 `hd_fr08_1.js` 与 `gen_b6pilot_hd_fr08_1.js` 的同一公式行（`Speaker + tell + Addressee + Message`，各 2 处）；`trigger` 只有 `hd_fr10_1.js` 与 `gen_stock_hd_fr10_1.js` 的同一公式行（`Trigger (物/事) + be + exciting / interesting / tiring`，各 2 处）。三词从未作为本幕要教的词出现。
- **不进豁免的反例：** `message` 与三词同在 fr08_1 公式行里，但它同时是 `hd_oral_sc11_5.js` 核心交际句 `Can I take a message?` 里的实词，故不进全局豁免，改在 fr08_1 补句 `Miss White tells the students the message.` 覆盖。
- **新增词：** `frame_roles` 追加 `speaker`、`addressee`、`trigger`。

### B 批细目（B-1～B-7，auto 全部做完）

- **B-1**（formation/fr02/fr03_2/fr04_3）：复合词表（`Sunflower, watermelon, rainbow, football, classroom.`）、前缀表（`Happy, unhappy. Like, dislike. Polite, impolite. Rewrite, review, return.` / `Subway, supermarket, superman.`）、后缀表（`Careful, careless, carefully.` / `Teacher, doctor, sunny, rainy.` / `Slowly, friendly, lovely.`）、`Mum passes/shows/buys/cooks … a birthday gift …` to/for 平行句、`Go there. Take the ball there.`、`Put on your coat.`。教训：hd/fr 幕末行 `'s'` 无尾逗号，锚点须去掉逗号。
- **B-2**（fr06/fr07/fr08/fr09_2/fr10）：`The cook opens the door with a key.` / `breaks the egg with a spoon.`（公式平行句）；`Amy learns to do it herself.`；`I think that he is very clever.`；`Don't forget to turn off the light!` / `to do your homework.`；`Miss White tells the students to read the story.` / `to do their homework.`（初版只写了 to read，未覆盖 `do`——`tell sb to do` 的 `do` 须字面出现，第二遍补）/ `tells the students the message.`；`Ask a question. Answer the question.`；`Take the bus. Ride my bike.`；fr10 两幕各加 `Ed, ing.` 后缀表 + -ing/-ed 平行句。`frame_roles` 扩词见上节。`fr09_1` 的 `the` 记入剩余（板上是“不加 a/the”禁令）。
- **B-3**（g01–g12）：复数词表（g01 后缀表 `S, es, ies, ves.` + bag/bus/box/watch/dish 表；g02 不规则复数表；g03 不可数三表 + `A cup of water.` + `Mum bought two bottles of milk and three cakes.` / `Milk is good for our health.`；g04 `The legs of the desk.` / `Tom's book. Children's Day.`（先读 `'s`）/ `The teachers' office.`）；g06 the/零冠词七句（`We play football after lunch.` / `The sun rises in the east.` / `She can play the violin.` / `Her brother likes to play basketball after lunch.` / `The sun, the moon, the earth, the sky.` / `The first. The tallest.` / `I go to school by bus.` / `I have lunch at school.`——`have` 初版漏了，第二遍补）；g07_2/3 `He likes me, and I like him.` + 黄金等式句/四宫格句；g08_1/2/3 `Whose book is this?` + 形物代/名物代词表 + 教室楼层句；g09_1/2/3 this/that/these/those 问答句 + 四宫格句；g10_1/2/3 `Would you like some cake? Yes, please.` + 否定/肯定/请求句；g11 `I am happy. I am hungry.` / `My brother is tall and strong.` / `This cake smells good and tastes sweet.` / `A red apple.` / `Something new.` / `Nothing new.` / `Look, sound, smell, taste, feel.`；g12 `I often sing. She is always happy.` / `The children play happily in the park.` / `She is always polite, and she often helps others.`（先读 `be`）/ `Quietly, carefully, happily.`（先读 `ly`）/ `Fast, early, late, hard.` / `Good becomes well.`（`good` 初版只写了 well，第二遍补）/ `I play football well.`。g03/g04/g06 手写幕无 spec。
- **B-4**（g15–g30）：g15 because/so 二选一对照句（`Because it is raining outside, we stay at home.` / `It is raining outside, so we stay at home.`）+ `Which do you like better, tea or milk?` / `I don't like tea or coffee.`；g16 be 三剑客句 + 缩略/全式对照（`I'm ten years old. He's tall.` / `It isn't cold. They aren't here.` / `It is not cold. They are not here.`）+ `Tom and Jim are in Class 1.`（`and` 第二遍补）；g17 过去时七句；g20 `They are doing their homework.` / `Make, making. Run, running. Swim, swimming.` / `He plays football every day.` / `He is running.` / `Look! Listen!`；g21 -ed 三表 + 原句先读 `ed`；g22 高频榜八对 + 分组表（先读 `ought`）/ `I go to school every day.` / `No ed.`（spec 另有同形不变 put/cut 行，生成幕补 `Put, put. Cut, cut.`）；g23 `Went, go. Saw, see.` / `Did you go? Yes, I did. No, I didn't.`；g25 `I'm thirsty. I will get some water.` / `I won't go. I will not go.` / `He will go.`（`goes` 由 go 的 -es 屈折规则覆盖）/ `I am going to visit my grandpa tomorrow.` + 原句先读 `wi`（板上截断 `(wi`）；g26 `Sorry, you can't.` / `He can swim.` + 原句先读 `ca`（板上截断 `ca`）；`to` 记入剩余（只在错句 `Can you to swim?` 里）；g27 `You mustn't cross the road.` / `You don't have to swim here.`；g28 `I play football at school every day.` / `He rides a bike to school at half past seven every day.` / `Who, action, what, how, where, when.`（spec 已删“焦点先行思维”行——定案为假统一概念，禁止再用——两句并在下一行后）；g29 `I am not a doctor.`（先读 `be`）/ `She is not a doctor.` / `It will not rain.` / `It won't rain.`（`won't` 第二遍补）/ `I don't like it.` / `I didn't go.` / `I went to the park.` / `I don't eat meat.` / `He can swim.`（`can` 第二遍补）；g30 `Can he swim?` / `Can he swim? Yes, he can. No, he can't.` / `Did she like cats? Yes, she did.`。g15 手写幕无 spec；g20 spec 为 b6pilot。
- **B-5**（g31–g40）：g31 5W1H 词表句 + `Who's that girl?` / `What time is it? It is three o'clock.` / `Which season do you like best, and why?`（spec 另有 to 回答例，生成幕补 `Why did you come? To help you.`）；g32 How/What 度量句五组；g33 `You stand up. You sit down.`（省略的 you 显形一次）/ `Stand up! Open the door.` / `Please sit down. Sit down, please.` / `Open your book!`（`your/book` 第二遍补）/ `Be quiet!`（`to` 记入剩余：只在错句 `Don't to run.` 里）；g34 `What a nice day!` / `What an interesting day!`（`an`）/ `How nice the day is!` / `What great news it is!`；g35 `There is an apple and three pears on the plate.`（spec 另有口语 There's 复数注，生成幕补 `There's two books on the desk.`；注意：spec 常错行 `... ✓` 的 `✓` 在换行续行上，插入锚点须把续行一并处理，否则 `✓` 会串到新句中文里——已修）；g36 `There is a book and two pens on the desk.` / `I have a book. He has a book.`；g40 八句（want/to do、enjoy/finish/go doing、be good at/thank for、like/love、want/plan/try、ask/tell/teach sb to do；`swim` 记入剩余：只在错句 `I like swim` 里，正确形 swimming 已读）。g33/g40 手写幕无 spec。
- **B-6**（phonics/poly/relations/sum）：phonics_1 `CVC, onset, rime.` / `Cat, bat, hat, fat, mat.` / `Cat, bag, map.` / `Ball, call.`（先读 `ll`）/ `Was, want.`；phonics_2 `Magic E.` / `Cake, kite, nose, cute.`；phonics_3 七句（先读 `ee`/`ai`/`oa`）；phonics_4 `Have, give, love, five.` / `Get, give, girl.` / `Iraq is a name.`；poly_law_v16 `The eye of a needle.`；poly_law_v41 `Banca.` / `Run, OED.` / `Run has 245 meanings.` / `Run has 46 items in OALD and COBUILD.`；relations_1 `Look at the sky!` / `I watch TV. I watch a game.` / `I read a book. I read a map.`；relations_3 `Take off your coat.` / `It's cold outside. Put on your warm coat!` / `She wears glasses.` / `The girl in red is my sister.`；sum_how_what 度量句 + `What a clever boy he is!` / `How clever the boy is!`；sum_interrogatives 词源三元组（生成幕词尾 `-ere`/`-en`/`-at` 用先读补：`ere`/`en`/`at`；spec 独有例 `Tell me what you want.`）；sum_pronouns 主格/宾格表 + `Give it to him.` + 黄金等式句 + 四宫格句；sum_syntax_2 `It is May 1st.` / `I am in Class 2, Grade 5.`；sum_syntax_3 `He goes to school.` / `He went to school.` / `I like cats.` / because/so 对照句 / `There is a book on the desk. I have a book.`。phonics_1/3、poly_law_v16/v41 手写幕无 spec。
- **B-7**（pron_map_1 逐幕 R2SKIP）：见下节。

### 逐幕 R2SKIP：pron_map_1 `zis`/`wery`（B-7，随本批进模板层）

- **理由：** 板上 ❌ 行故意展示的错误读音拼写（`zis` = this 误读、`wery` = very 误读），按 SOP §7.3 不读；读出来会教错读音。先例：第六波第 1 项 `hd_g21_1` 的逐幕 R2SKIP `['stoped', 'studyed']`（模板层，生成幕随模板继承）。
- **全量核查（2026-11-10）：** 全库 `zis`/`wery` 只在 `pron_map_1.js` 与 `gen_stock_pron_map_1.js` 出现（各 2 处），均为 ❌ 行；两词不是实词，故不进全局 `r2skip.json`（实词永不豁免的口径不受影响）。
- **实施：** 手写幕模板层加注释 + `const R2SKIP = ['zis', 'wery'];`（ACTS 行后、ITEMS 前）；生成幕由 spec 重生成继承（spec 本身未改）。豁免跳过 762 → 766。
- **不适用同类：** 错句里的实词（`makes`/`me`、`quickly`、`sweetly`、`to`、`swim`）不进逐幕 R2SKIP——词本身是对的，只是句式错；跳过会掩盖“正确句不在板上”的缺口，仍记入剩余。

### A-7 细目

- `stress_rhythm_1`：音节表 `Record, desert, export, import.`（先读词 `re cord de sert ex port` 借子串）；`Here is a present…` 先读词加 `pre sent`（借 `present` 子串）。
- `stress_rhythm_2`：后缀表 `Tion, sion.`；词表 `Direction, invitation.` / `Musician, magician, scientific.` / `Chinese, Japanese, engineer.` / `Blackboard, schoolbag, football, sunflower.`（各组先读词均为音节切分，借子串）；`I love summer vacation!` 先读词加 `va ca`。
- `stress_rhythm_3`：`Schwa is a lazy vowel.`；虚词表 `To, for, of, and, can.`；`I can swim. I can't swim.`（板上 can/can't 对照句去音标版）；`A cup of tea. A cuppa tea.` + `Lots of cups, kind of sweet.`（板上 of 弱读三例）；`I want to visit my grandpa. I wanna visit my grandpa.` + `I'm going to visit my grandpa tomorrow. I'm gonna visit my grandpa tomorrow.`（全式+缩读对照，板上原句）；`Put it on.` + `An apple.`（板上连读二例）。
- `nt` 豁免：见下节（新 r2skip 类 `ipa_fragments`）。

### 新增 r2skip 类 `ipa_fragments`（A-7，随本批进 `r2skip.json`）

- **理由：** 音标转写被 checker 的 ASCII 正则 `[A-Za-z']+` 切碎的残片，不是单词；音标本身是注音符号、按 SOP 不应读；所指实词已朗读。
- **全量核查（2026-11-10）：** 全库 `w` 行切出 token `nt` 的只有两处——`stress_rhythm_3.js` 与 `gen_stock_stress_rhythm_3.js` 的同一行 `I kən ˈSWIM. vs I ˈKɑːNT ˈSWIM.`（`KɑːNT` → `nt`；`k`/`n` 单字母丢弃）。其余 `w` 行无 `nt`。所指实词 `can't` 已在本批新句 `I can swim. I can't swim.` 中朗读。
- **新增类：** `{"id":"ipa_fragments","reason":"音标转写被 ASCII 正则切碎的残片（stress_rhythm_3 板上 I ˈKɑːNT ˈSWIM. 里的 KɑːNT → nt）；音标本身是注音符号、不读，所指实词 can't 已朗读。全库仅此一处（手+生成同幕）。","words":["nt"]}`。
- **注意：** 同类残片 `unresd`（þunresdæg）未进豁免——A-6 已把它随原词 `þunresdæg` 朗读覆盖。`bh/dh/gh/kw` 等 Grimm 辅音符号也不是音标残片，另按词源表处理（见剩余）。

### 记入剩余（不修，待定夺）

- 错误/干扰示范（直接读会教错）：`five_patterns_p2_5`（`makes me happily`，正确句 `It makes me happy.` 不在板上）、`ze_wear_1`（`Wear your coat quickly!`，正确句 `Put on your coat quickly!` 不在板上）、`five_patterns_p3_2`（`sweetly` 是错误填空选项；`ly` 同）、`gen_sentence_4`（`there`，板上明说 there be 另学）、`fp_iconicity_4`（`tween`，板上古英语说法本身可能不精确，不放大）、`hd_g26_1`（`to`，只在错句 `Can you to swim?` 里）、`hd_g33_1`（`to`，只在错句 `Don't to run.` 里）、`hd_g40_1`（`swim`，只在错句 `I like swim` 里；正确形 `swimming` 已读）。
- `pron_map_1` 的 `zis`/`wery` **已处理**（B-7 逐幕 R2SKIP，见上节），不再是剩余。
- 禁令里点名的词：`hd_fr09_1` 的 `the`（板上“句尾用 by + 交通工具单数（零冠词，不加 a/the！）”——任何 `the` 句都会与本幕规则冲突）。
- 标签/公式里的词：`aux_transformer_4` 的 `did`（标签「过去式照妖镜 did」）、`five_patterns_p3_1` 的 `in`（`arrive IN(AT)`）、`five_patterns_p2_4/p3_4` 的 `do`（DO 标签）、`five_patterns_p2_4` 的 `for`（公式备选）。
- 零碎标签/拟声/人名：`look_off_2` 的 `off`、`put_in_2` 的 `min`（minutes 缩写）、`put_off_2` 的 `sat`（星期缩写）、`take_down_1` 的 `spring`（季节标签）、`take_off_1` 的 `ahh`、`turn_out_2` 的 `meow`、`give_back_1` 的 `amy`（人名标签）、`aux_transformer_p3_2` 的 `not`（公式标签 "not 贴身后"；融合式 `cannot`/`can't` 已读）、`aux_transformer_p4_4` 的 `be`/`will`/`not`/`ed`（算子名+后缀标签，无例句）、`gen_sentence_2` 的 `used`（"used to 指过去" 无例句）、`done`（另管）。
- wo_rule / wo_grimm 历史词形（`scipum`、`cildru`、`cirice`、`frater`、`dens`、`pater`、`bh/dh/gh`、`kw` 等）：A-8a/A-8b 已按幕朗读表处理 17 幕 wo 幕；其余未在 R2-W1 名单内的，不再追。
- oral 89 项 / poly 6 项：另议（对话结构 / polyBuild 只读最后一句）。本波未动。
- 第 2 项遗留：两处先读词表尾孤 `'I'`（`writing_alchemist_3` + 生成幕）。
- 第 4 项遗留：12 幕 ACTS 为空（WARN 111 项，诚实信号）。
- **剩余 auto 40 幕全清单**（FAIL 135 − oral 89 − poly 6）：`aux_transformer_4/p3_2/p4_4`（手+生成 6 幕）、`five_patterns_p2_4/p2_5/p3_1/p3_2/p3_4`（手+生成 10 幕）、`fp_iconicity_4`（1 幕）、`gen_sentence_2/4`（2 幕）、`hd_fr09_1`（手+生成 2 幕）、`hd_g26_1`（手+生成 2 幕）、`hd_g33_1`（1 幕，手写无生成）、`hd_g40_1`（1 幕，手写无生成）、`vv_give_back_1`（1 幕）、`vv_look_off_2/vv_put_in_2/vv_put_off_2/vv_take_down_1/vv_take_off_1/vv_turn_out_2`（手+生成 12 幕）、`ze_wear_1`（手+生成 2 幕）。合计 6+10+1+2+2+2+1+1+1+12+2 = 40。

### 新发现的待定夺（本波新增，只记，不实施）

- **探针时长超限（本波新增句把已接近上限的幕推过 120 秒线）：** 全量扫测：本波改动的 324 幕全部打包成功（`docs/whiteboard/v5/out/`，gitignore），探针 320 幕出 `__dur`、4 幕超时（见漏逗号事故）。**超 120s 共 88 幕**（扫测 84 + 修后复测的 4 幕手写版）。其中**本波新推过线的手写幕 16 幕**（基线 ≤120s → 现 >120s，基线出自 `docs/whiteboard/lab/audit36/durations.json`）：hd_g40_1 115.9→168.7（+52.8）、hd_g03_1 116.2→161.7（+45.5）、hd_g06_1 105.9→148.2（+42.3）、aux_transformer_p4_1 91.6→132.6（+41.0）、hd_g15_1 103.7→137.7（+34.0）、hd_g33_1 100.6→132.6（+32.0）、aux_transformer_p3_4 101.3→132.6（+31.3）、aux_transformer_p3_2 108.0→137.6（+29.6）、hd_g29_1 118.6→147.8（+29.2）、hd_g16_1 92.8→121.6（+28.8）、hd_g12_1 101.7→129.8（+28.1）、hd_g11_1 101.1→124.7（+23.6）、hd_g22_1 114.9→135.6（+20.7）、hd_g20_1 106.4→122.9（+16.5）、wo_grimm_verner_1 112.9→125.1（+12.2）、hd_g30_1 109.0→120.9（+11.9）。其余超限幕分两类：**基线已超 23 幕**（writing_alchemist 298.6s、eight_endings 256.5s 等，最高 298.6s；本波在其中几幕又加了 +30～50s，如 bamboo_tree_1 +43.9、wo_grimm_voiceless_1 +53.6、stress_rhythm_3 +41.3）与**无基线 49 幕**（多为生成幕，时长与手写版一致）。背景：120s 限值此前显然未强制执行——基线库里已有 23 幕超限，`dur_allow.json` 却只有 1 条。**定夺选项：**① 16 幕进 `dur_allow.json` 白名单；② 删减/拆分（会重新产生 R2-W1 未覆盖）；③ 接受超限（改限值/承认 120s 只适用于短幕）。**未擅自选**，等 Priya 定。时长数据存 `docs/work-2026-11-09/wave7_v5check_durations.json`（324 幕全量）。
- **第 2 项遗留**（见上）：两处先读词表尾孤 `'I'`，删或移位。
- **spec 与手写幕文本分叉**（本波遇到的三处，均已按 spec 为准处理，记录备查）：g28 spec 已删“焦点先行思维”行（定案为假统一概念）；g31_3/g35 spec 另有手写幕没有的例句/注释行（to 回答例、There's 口语注），生成幕据此多补一句；g22 spec 另有同形不变 put/cut 行，生成幕据此多补一句。手写幕与 spec 文本不一致是既有现象，非本波引入。
- **`wbtextcheck.py` 目前跑不起来（既有问题，非本波引入）：** 其 `APP` 路径指向仓库根的 `萌星小学英语_最终合并版.html`，该文件已不存在（主文件现为 `laws-prototype/mengxing-prototype-v1.html`）；`check_all.py` 也不调用它。SOP 五步管线第 ④ 步暂无法执行，留待定夺（修路径或废止）。

### 漏逗号事故（B-3/B-4 第二遍插入，探针发现，`d1dee0e` 已修）

- **现象：** 全量探针扫测时 `hd_g06_1`、`hd_g12_1`、`hd_g16_1`、`hd_g29_1` 超时（`window.__dur` 20s 不出现）；单幕复测报 `TypeError: E is not iterable`，`__dur` 为 `undefined`——幕在浏览器里根本跑不起来。
- **根因：** 四幕各有一行第二遍补句行尾漏了逗号（如 `['s', 'I have lunch at school.', '我在学校吃午饭。']` 后无 `,`）。JS 里 `[...] [...]` 被解析为成员访问而非两个数组元素，`ITEMS` 里多出一个 `undefined` 元素，运行时解构失败。四行全是第二遍补句（第一遍 v5check 漏词后追加的那句：g06 `I have lunch at school.`、g12 `Good becomes well.`、g16 `Tom and Jim are in Class 1.`、g29 `He can swim.`）。
- **为什么三道关都没拦住：** `node --check` 只查语法——成员访问是合法语法；`v5check.py` 用正则读文本——句子照样被检测到（FAIL 照常下降）；只有打包后真跑浏览器才暴露。**教训：改完幕必须跑打包探针，`node --check` + v5check 不够。** 另：全波次改动幕逐行扫描（行尾 `']` 无逗号、下一行是新行）确认仅此 4 处，无同类残留。
- **修复：** 各补一个逗号（`d1dee0e`，4 文件各 1 行）；`node --check` 通过；重打包重探针 4 幕均出 `__dur`（148.2/129.8/121.6/147.8s，无 pageerror）；v5check FAIL 135 / WARN 113 不变。基线库四幕原有时长 105.9/101.7/92.8/118.6s——修后均过 120s 线，计入上条“新推过线 16 幕”。
- **精灵包说明：** 打包需 `docs/whiteboard/v5/sprites/` 里的角色包文件；worktree 新建时该目录只有 361 个 tracked 文件（其余为 gitignore 的本地生成物），本波从主仓库目录 `~/workspace/mengxing-primary-english-app/docs/whiteboard/v5/sprites/` 用 `cp -n` 补了 224 个（共 585 个），不进版本控制；`git status` 干净。

## 验证（最终，2026-11-10）

- 每批：`python3 docs/whiteboard/src/v5check.py` 重跑 + 相关幕 `node --check`。最终数字：**FAIL 135 项 / 135 幕；WARN 113 项（R2-P1 2 + R4-WARN 111）；UNKNOWN 870 项；豁免跳过 766 处**。基线 FAIL 439（R2-W1 399 + R4-F2 40）→ 135（R2-W1 135，R4-F2 0）。R2-W1 135 = auto 剩余 40 + oral 89 + poly 6。
- `python3 laws-prototype/tools/check_all.py`：**27/27 通过**（`jscheck` node --check、`check_lawdata_roster`、`check_badge_erridx` 830 行、`gen_schema`、`gen_contrast`、`check_rel_coverage` 等）。v5check 不进 check_all。
- `python3 docs/whiteboard/src/wb13/gen_wb13_scenes.py --check-only`：通过（50 格已全部覆盖，场景文件 89 个）。
- `python3 docs/whiteboard/src/wb13/gen_wb13_units.py --check-only`：通过（页签 234）。
- `node build.mjs` 打包：本波改动的 **324 幕全部打包成功**（`docs/whiteboard/v5/out/`，约 1.1MB/幕）；产物逐字命中抽查 7/7（`A cup of water`、`Milk is good for our health`、`Miss White tells the students to do their homework`、`I go swimming. I go shopping`、`Thank you for helping me`、`He goes to school`、`Because it is raining, we stay at home`）。
- 探针时长：Chromium 1248 headless shell `executable_path`（`~/.cache/ms-playwright/chromium_headless_shell-1248/.../chrome-headless-shell`；1248 全浏览器也在 `~/.cache/ms-playwright/chromium-1248/`；`durcheck.py` 默认启动的 1254 未装）。Python 无 playwright 模块，探针用 Node playwright（`~/workspace/hanzi-app/node_modules/playwright`）。全量 324 幕：320 幕出 `__dur`，4 幕超时（漏逗号事故，见上，`d1dee0e` 已修，重测 4 幕均出时长）。**超 120s 共 88 幕**，其中本波新推过线 16 幕手写版（见“新发现的待定夺”）；基线已超 23 幕、无基线 49 幕。时长数据：`docs/work-2026-11-09/wave7_v5check_durations.json`。
- 未核实项：**真机/孩子实测**（语音听感、拖拽手感、视觉叠放均未核实）；`wbtextcheck.py` 跑不起来（见上，既有路径问题）；探针只测了 `window.__dur` 计算值，未逐幕听完验证朗读内容与屏幕文字一致；oral 89 / poly 6 未动。
