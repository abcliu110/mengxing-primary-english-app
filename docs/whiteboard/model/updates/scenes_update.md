# T5 更新包 · 白板台词修正集（scenes_update）

数据源：`docs/whiteboard/model/scene_fixes.yaml`（46 条记录 = 问题项 45 条 + ③-C 顺手订正 1 条）。
原文、场景、播出条次 n 均已与源数据 `wb_claims.json` / `wb_know_todo.json` 逐字复核一致。

## 汇总

| 裁定 | 条数 | 播出条次 Σn |
|---|---|---|
| 错误 | 9 | 22 |
| 过度简化 | 36 | 61（见复核注记） |
| **问题项合计** | **45** | **83** |
| 附：基本成立顺手订正 | 1 | 1 |

改写来源构成：报告第 ⑤ 节现成改写（U1–U17）直接采用 19 条；按报告裁定理由/同类 U 条原则自拟 27 条（每条 basis 字段均已标注）。概念框架改写均带学术来源（Langacker/Taylor 识解、Gundel 共知层级、Lyons、Quirk、Tyler & Evans、Comrie、Bauer 形态音位、腓尼基字母名表、Wiktionary 词源）。本批无存疑项。

**复核注记**：过度简化 Σn 按源 JSON 复核为 61，报告口径为 60——差异在格林口诀 [8]：报告记 n=3，源数据 n=4（3 个场景、其中一幕播出两次）。本包以源数据为准，总 Σn 为 83（报告口径 82）。

**关键对齐**：sf-010（hd_g03_1 可数性）修正文与知识模型 `boundedness.yaml` 的 cl-packaging 识解口径逐字同向；sf-029 双栖词处理与模型例外 xc-dual-life 一致；sf-031 冠词口诀与模型 cl-a-first / cl-the-known / cl-zero-func 同口径。旧库中同一错误说法的三份拷贝（GRAMMAR_DB G03、旧 boundedness、hd_g03_1）至此全部有修正文可替换（前两份分别见 T2 与已完成的 boundedness 重写）。

## 修订优先级表（按播出条次 n 降序，同 n 按记录号）

| 优先级 | 记录 | 定位 | 裁定 | n | 修订要点 |
|---|---|---|---|---|---|
| 1 | sf-001 | claims[3] · fp_iconicity_1、fp_iconicity_2… | 错误 | 4 | 家族标题降格：删「第一性原理·象形同源」，改「联想工具箱」并明示真来历/联想之别（U1） |
| 2 | sf-011 | claims[2] · fp_economy_2、fp_economy_3… | 过度简化 | 4 | ① 家族标题降格：「同化律」→「省力小机关合集」 |
| 3 | sf-012 | claims[4] · fp_vectors_1、fp_vectors_2… | 过度简化 | 4 | ⑤ 家族标题降格：「几何时空律」→「看图猜+约定例外」 |
| 4 | sf-020 | claims[8] · wo_grimm_1、wo_grimm_more_1… | 过度简化 | 4 | 格林口诀删错误尾句「小词变大词不变」，换借入时间解释 |
| 5 | sf-003 | claims[53] · hd_poly_g4_157_1、hd_poly_g4_157_2… | 错误 | 3 | light 同形异源订正：标题改「两个双胞胎词」，取消伪派生纽带 |
| 6 | sf-004 | claims[54] · hd_poly_g4_157_1、hd_poly_g4_157_2… | 错误 | 3 | 「意象桥梁」降格为明示的联想记忆钩子 |
| 7 | sf-005 | claims[55] · hd_poly_g4_157_1、hd_poly_g4_157_2… | 错误 | 3 | 「引申新义」改同形不同源说明（*leuk- / *legʷʰ-） |
| 8 | sf-006 | claims[20] · fp_iconicity_1 | 错误 | 3 | 字母口诀换真词源：M 水波纹、B 房子、C 骆驼、S 牙齿 + 联想划界讲解（U1） |
| 9 | sf-007 | claims[17] · fp_economy_2 | 错误 | 3 | 术语订正：「同位相撞」→「嘶嘶相撞」（嘶声后元音插入）（U2）；讲解嘶声列举已补 /dʒ/（见勘误 L-1） |
| 10 | sf-014 | claims[32] · fp_zoom_focus_2、fp_zoom_focus_3… | 过度简化 | 3 | ⑥ 家族标题降格：取消「镜头律」假统一，四机关分开讲 |
| 11 | sf-015 | claims[9] · bamboo_tree_1 | 过度简化 | 3 | 谓语「国王」范围收窄到简单句/分句，与同库 [398] 正确版对齐 |
| 12 | sf-016 | claims[21] · fp_iconicity_2 | 过度简化 | 3 | fl/gl/sl 口诀加「多半」与反例（flame、glove、sleep） |
| 13 | sf-017 | claims[22] · fp_iconicity_3 | 过度简化 | 3 | str/sp 口诀限定化，street 剔除并明示拉丁来源（U7） |
| 14 | sf-018 | claims[23] · fp_iconicity_4 | 过度简化 | 3 | tw 全称化降格：「常和『二』是一家」+ twinkle/twirl 反例（原 twig 反例不成立，见勘误 M-1） |
| 15 | sf-019 | claims[24] · fp_one_king_2 | 过度简化 | 3 | to/-ing 二分口诀改「动词决定搭配」（want/enjoy/like 三类） |
| 16 | sf-021 | claims[31] · fp_vectors_4 | 过度简化 | 3 | for 口诀换三站：为了谁/奔着哪儿/持续多久（U8） |
| 17 | sf-023 | claims[33] · fp_zoom_focus_3 | 过度简化 | 3 | 「英语拉镜头」收窄为只管写地址（U14） |
| 18 | sf-002 | know[T51] · hd_g19_1 | 错误 | 1 | 删「勋章转移」伪起源叙事；改功能（单数第三人称徽章）+ 真来历（-es 与 -as 两条独立源流）（U4） |
| 19 | sf-008 | claims[425] · hd_phonics_1 | 错误 | 1 | 「永远 /æ/」降格：默认读法 + 变脸名单（-ll→/ɔː/、w 后→/ɒ/）（U10） |
| 20 | sf-009 | claims[488] · past_clans_4 | 错误 | 1 | teach/-aught 伪因果订正：a 降格为记忆钩子，reach 反例划界（U12） |
| 21 | sf-010 | claims[245] · hd_g03_1 | 过度简化 | 1 | 可数性判据换识解口径（习惯看法），与 boundedness 模型 cl-packaging 对齐（U3） |
| 22 | sf-013 | know[T25] · hd_g14_1 | 过度简化 | 1 | 「原封不动映射」改为原型图第一猜测 + 约定例外单记（Tyler & Evans） |
| 23 | sf-022 | claims[208] · fp_vectors_4 | 过度简化 | 1 | for 讲解句与三站口径对齐，不再只讲「心里朝着目标」 |
| 24 | sf-024 | claims[192] · fp_iconicity_4 | 过度简化 | 1 | twelve 换真词源「十之外剩二」，手指画面与词源分开 |
| 25 | sf-025 | claims[179] · fp_economy_3 | 过度简化 | 1 | in- 补第二义：方向 in-「入」（import/income/inside） |
| 26 | sf-026 | claims[558] · wo_rule_assim_1 | 过度简化 | 1 | 同化讲解补：方向 in- 同样同化（import 的 im-） |
| 27 | sf-027 | claims[211] · fp_zoom_focus_2 | 过度简化 | 1 | 疑问词「总是第一」限定化，补从句居中例（U13） |
| 28 | sf-028 | claims[196] · fp_one_king_2 | 过度简化 | 1 | 动名词/现在分词拆清：「两件马甲」（U9） |
| 29 | sf-029 | claims[246] · hd_g03_1 | 过度简化 | 1 | 双栖词（hair/time/paper/chicken）移出必背不可数名单并注双栖 |
| 30 | sf-030 | claims[250] · hd_g04_1 | 过度简化 | 1 | 「无生命用 of」替换：时间/距离爱用 's，长说法用 of（U11） |
| 31 | sf-031 | claims[257] · hd_g06_1 | 过度简化 | 1 | 冠词总口诀重写（U6）：听话人可识别性 + 做事/东西之别；含 [255] 零冠词框架联动 |
| 32 | sf-032 | claims[299] · hd_g15_1 | 过度简化 | 1 | and/or「铁律」降格为默认规则并登记否定辖域例外 |
| 33 | sf-033 | claims[374] · hd_g33_1 | 过度简化 | 1 | 祈使句问句订正：主语 you 常省略、谓语用原形，Don't/Let's/Please 不冲突 |
| 34 | sf-034 | claims[396] · hd_g39_1 | 过度简化 | 1 | 最高级「必须加 the」降格并补两例外（所有格在前、作副词） |
| 35 | sf-035 | claims[400] · hd_g40_1 | 过度简化 | 1 | G40 规则行：like/love 摘出单选名单，双搭配单列 |
| 36 | sf-036 | claims[401] · hd_g40_1 | 过度简化 | 1 | G40 口诀同步改：like/love 两边站（doing/to do） |
| 37 | sf-037 | claims[515] · tense_matrix_5 | 过度简化 | 1 | 现在完成时口诀换「和现在有关系」（结果+持续两支）（U5） |
| 38 | sf-038 | claims[516] · tense_matrix_5 | 过度简化 | 1 | 同 sf-037（同幕第二行，两行合并为一份新口诀+讲解） |
| 39 | sf-039 | claims[427] · hd_phonics_3 | 过度简化 | 1 | 元音组合口诀加「多半」，ea 变脸单记（U17） |
| 40 | sf-040 | claims[617] · wo_vowel_a_1 | 过度简化 | 1 | i-变音去意愿化：次音节 -i 触发、只作用于特定词形 |
| 41 | sf-041 | claims[675] · ze_same_1 | 过度简化 | 1 | 口诀点明：加 s 的是后面的名词，不是数字 |
| 42 | sf-042 | claims[631] · writing_alchemist_1 | 过度简化 | 1 | 删分数承诺「60 分秒变 100 分」，口号明示为口号 |
| 43 | sf-043 | claims[149] · five_patterns_p2_2 | 过度简化 | 1 | 副词定义改功能定义，-ly 只作识别提示（U15） |
| 44 | sf-044 | claims[646] · ze_be_1 | 过度简化 | 1 | 补丁行：like 的介词身份「像」（I am like my mum）（U16） |
| 45 | sf-045 | claims[481] · metaphor_code_4 | 过度简化 | 1 | forward「总是朝将来」降格：讲时间时多半 + 空间义补充 |
| 46 | sf-046 | claims[534] · wo_europe_1 | 基本成立（顺手订正） | 1 | 【附·不计入45】euro 定名年份订正：1996 → 1995 年 12 月（1999 启用） |

## 落地提示（给 T9 旧库补丁 / T10–T11 建模生成）

- 家族标题类（sf-001/011/012/014）是 4 幕共用开场行，改一处须四幕同步——正是模型单点事实源要根治的拷贝问题。
- sf-037 与 sf-038 是同幕两行同义口诀，替换时合并为一份（新口诀 + 讲解），不要播两遍。
- sf-030 只替换原口诀末支，其余各支保留；sf-044 是补丁行（原行保留、本幕新增一行）；sf-031 含联动行 wb_claims[255]，替换时一并处理。
- 报告确认的范式（wo_ 词源系列的出处/对冲/例外标注、hd_g07 的口诀与事实之分）不在修订范围，作为全库写作规范保留。

## 勘误（T5 独立复核后修正，2026-11-01）

- **M-1 · sf-018 反例 twig 不成立（中级，已改）**：原修正文称 twig（小树枝）与「二」无关。此误源头为审查报告 ③-B S3 本身的说法，T5 修正集按 S3 自拟时继承。联网核证主流词源一致表明：twig 源出 *dwo-「二」（本义「分叉」，PGmc *twigga「a fork」< PIE *dwi-ko-；Merriam-Webster 注「akin to Old English twā two」），恰是「二」家族，不能作反例。**报告 S3 就此出勘误，以本说明为准。** 处置：反例换为 twinkle（闪烁）——经联网核证（Etymonline https://www.etymonline.com/word/twinkle ；Wiktionary「twinkle」条），twinkle 源出古英语 twinclian「眨眼」，与德语 zwinkern 同族、拟声起源，与 *dwo- 无关；twirl 与「二」无关属实，保留。新修正文：「twinkle（闪烁）、twirl（旋转）和'二'没关系。」scene_fixes.yaml 的 sf-018 已同步更正并在其 erratum 字段留痕。（备选 twitch 经查有来源疑其与 twig 同基，未采用，不凑数。）
- **L-1 · sf-007 嘶声列举补 /dʒ/（低级，已改）**：讲解行原列 s、z、sh、ch，未含 /dʒ/；已补入 /dʒ/ 并加例 judge→judges，与原文列举结构不冲突。口诀行仍为 U2 原文，未动。
- **L-3 · sf-002「只剩下现在时这一枚」不改（低级，留痕）**：该语为 U4 原文的教学化简化，按复核意见保留原样，不作改动，记录备查。
