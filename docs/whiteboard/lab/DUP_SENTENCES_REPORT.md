# 白板幕里重复的英文朗读句（重复内容合并第 5 步：只出表和建议，不重建；2026-10-31）

统计脚本与逐句明细在仓库外调查目录（沙箱 /workspace/work/dedup/，不进仓库）；需要时按下面「口径」重算即可。

## 口径
- 遍历 `docs/whiteboard/v5/scenes/*_<n>.js`（不含 `auto.js` / `adj_train.js` / `wordcard_tpl.js` / `wordcard_items.js` 这类引擎和模板文件）。
- 「朗读句」= 自动版面幕的 `['s', 英文, 中文]` 条目，加手工幕（tense_matrix / past_clans / adj_order）里 `K.say(t, '英文', …)` 的字面量和 `en = '…'` 变量；只算至少 2 个英文词的句子。白板上写出来的 `['w', '🧒 角色 A：…']` 文字不算（它和朗读句同句，算进去会把每句翻倍）。
- 比较时忽略大小写、多余空白和句末 . ! ?；同一幕里出现多次只算 1 次。

## 结果
- 不同的朗读句共 **1317** 句；出现在 ≥2 幕的 **85** 句（共 282 次）。其中 **75** 句只在同一个单元内部重复，**10** 句跨单元。
- 与预期的 54 句不同：多出来的主要是万能动词剧场（vv_*，29 句，每个动词短语两幕用同一例句）和多义词剧场（16 句）。如果按「去掉 vv 两幕同句」算是 56 句，最接近预期；口径差异请主代理按需要取舍，E.json 每行都带 `category` 方便筛选。
- 题目里的例子已核实：`hd_oral_sc08` 的「Thank you for telling me.」出现在该单元 11 幕中的 11 幕。

| 分类 | 句数 | 次数 | 建议 |
|---|---|---|---|
| A 日常用语对话模板收尾句 | 14 | 123 | 改写数据源 |
| B HD 剧场多幕共用字幕句 | 16 | 48 | 合并 / 低优先 |
| C 多义词剧场 2 幕同句 | 16 | 32 | 保留（可选改写） |
| D 万能动词剧场两幕同句 | 29 | 58 | 保留 |
| E 跨单元基础短句 | 10 | 21 | 保留 |

**A 类的根源**：主 HTML `DAILY_EXPRESSIONS_DB`（≈1912）每句的 `dialogue` 是三轮对话，第 3 轮（A 的回应）按场景套了同一句模板（SC08 全是「Thank you for telling me.」，SC09 全是「That sounds great!」……），`src/gen_oral_inventory.py` 把它导进清单，场景再原样画出来。要改就改 DB 的 dialogue 第 3 句 → 重跑 `gen_oral_inventory.py` → 16 个口语单元 `do_unit.py` 重建 144 幕 → 嵌入 → `app_check4.py`。**这一步和 D 文件里修口语幕标题残文是同一批幕，建议合成一次重建。** 改数据要注意 R1：清单是从 DB 导出的，DB 改了清单跟着改，R1 仍以新清单为准（这算改内容，需要用户同意）。

### A 日常用语对话模板收尾句（同一单元多幕）（14 句，共 123 次）

处理建议：**改写**（改数据源 DAILY_EXPRESSIONS_DB 每句的 dialogue 第 3 句，按情境写不同的回应）

| 句子 | 次数 | 所在单元 | 所在幕 |
|---|---|---|---|
| Thank you! | 21 | hd_oral_sc05, hd_oral_sc07, hd_oral_sc10, hd_oral_sc16 | hd_oral_sc05_2, hd_oral_sc05_3, hd_oral_sc07_1, hd_oral_sc07_10, hd_oral_sc07_11, hd_oral_sc07_12, hd_oral_sc07_2, hd_oral_sc07_3, hd_oral_sc07_4, hd_oral_sc07_6, hd_oral_sc07_7, hd_oral_sc07_8, hd_oral_sc07_9, hd_oral_sc10_5, hd_oral_sc10_7, hd_oral_sc16_1, hd_oral_sc16_2, hd_oral_sc16_3, hd_oral_sc16_4, hd_oral_sc16_5, hd_oral_sc16_6 |
| That sounds great! | 13 | hd_oral_sc09 | #1, #2, #3, #4, #5, #6, #7, #8, #9, #10, #11, #12, #13 |
| OK. I understand. | 11 | hd_oral_sc03 | #1, #2, #3, #4, #5, #6, #7, #8, #9, #10, #11 |
| OK. I will. | 11 | hd_oral_sc15 | #1, #2, #3, #4, #5, #6, #7, #8, #9, #10, #11 |
| Thank you for telling me. | 11 | hd_oral_sc08 | #1, #2, #3, #4, #5, #6, #7, #8, #9, #10, #11 |
| Thank you. It tastes good. | 10 | hd_oral_sc06 | #1, #2, #3, #4, #5, #6, #7, #8, #9, #10 |
| Nice to meet you, too! | 9 | hd_oral_sc04 | #1, #2, #3, #4, #5, #6, #7, #8, #9 |
| OK! Let's try. | 9 | hd_oral_sc14 | #1, #2, #3, #4, #5, #6, #7, #8, #9 |
| Thank you. I'll have a rest. | 9 | hd_oral_sc12 | #1, #2, #3, #4, #5, #6, #7, #8, #9 |
| Have a nice day! | 6 | hd_oral_sc01 | #1, #2, #3, #4, #5, #7 |
| Thank you! The same to you! | 4 | hd_oral_sc10 | #1, #2, #3, #8 |
| That's all right. | 4 | hd_oral_sc02 | #2, #3, #4, #5 |
| Thanks. I'll call later. | 3 | hd_oral_sc11 | #1, #2, #3 |
| You're welcome! | 2 | hd_oral_sc02 | #1, #6 |

### B HD 剧场多幕共用同一句字幕（16 句，共 48 次）

处理建议：**合并/保留**：保留第 1 幕朗读，其余幕换成本幕要点句；或接受（旧 canvas 本来就是这样，低优先）

| 句子 | 次数 | 所在单元 | 所在幕 |
|---|---|---|---|
| I have some storybooks and some milk. | 3 | hd_g10 | #1, #2, #3 |
| I like Miss White, and she likes me too. | 3 | hd_g07 | #1, #2, #3 |
| I like my book. Give it to me. This book is mine! | 3 | hd_sum_pronouns | #1, #2, #3 |
| I played football in the park yesterday. Look at the book on the desk. | 3 | hd_sum_syntax | #1, #2, #3 |
| Look at the tree, I can see a bird! Borrow from vs Lend to! | 3 | hd_relations | #1, #2, #3 |
| This is a red apple here, and that is a pear over there. | 3 | hd_g09 | #1, #2, #3 |
| This is my bag. That red one is yours (= your bag). | 3 | hd_g08 | #1, #2, #3 |
| What a clever boy (he is)! | 3 | hd_g34 | #1, #2, #3 |
| What is the weather like? = How is the weather? How old are you? | 3 | hd_sum_how_what | #1, #2, #3 |
| Where is it? Over there! Whose bag is this? It's mine. | 3 | hd_sum_interrogatives | #1, #2, #3 |
| Write a letter! Look at the first letter 'A'. | 3 | hd_poly_v6_p14 | #1, #2, #3 |
| c-at -> cat! cap -> cape! sheep vs ship! | 3 | hd_phonics | #1, #2, #3 |
| sunflower, unhappy, careful, carefully, friendly | 3 | hd_formation | #1, #2, #3 |
| — Who is that girl? — She is my cousin. | 3 | hd_g31 | #1, #2, #3 |
| 【原理对比1】How is the weather? (无 like，问状态形容词) = What is the weather like? (有介词 like，缺名词宾语用 What!) | 3 | hd_g32 | #1, #2, #3 |
| 【空间图式】The ball is in the box (容器内), on the desk (表面接触), at the door (精确点). | 3 | hd_g14 | #1, #2, #3 |

### C 多义词剧场：3 幕里 2 幕同句（16 句，共 32 次）

处理建议：**保留**（多义词第 2 幕复现第 1 幕例句做对比，属设计内复习）；可选：第 2 幕换成另一义项例句

| 句子 | 次数 | 所在单元 | 所在幕 |
|---|---|---|---|
| Birds can fly in the sky. | 2 | hd_poly_g2_084 | #1, #2 |
| Can you draw a cute panda? | 2 | hd_poly_g3_0790 | #1, #2 |
| Drink more water every day. | 2 | hd_poly_g1_055 | #1, #2 |
| I read an interesting book. | 2 | hd_poly_g1_002 | #1, #2 |
| I'd like an orange. | 2 | hd_poly_g3_113 | #1, #2 |
| It is cold in winter. | 2 | hd_poly_g2_096 | #1, #2 |
| Keep your hands clean. | 2 | hd_poly_g5_250 | #1, #2 |
| Leaves turn yellow in autumn. | 2 | hd_poly_poly_turn | #1, #2 |
| Let's fly a kite in the park. | 2 | hd_poly_g2_080 | #1, #2 |
| Our English teacher is very kind. | 2 | hd_poly_g3_0527 | #1, #2 |
| The boy can run very fast. | 2 | hd_poly_g2_087 | #1, #2 |
| They play football after school. | 2 | hd_poly_g2_0489 | #1, #2 |
| Turn on the light, please. | 2 | hd_poly_g4_157 | #1, #2 |
| Turn right at the library. | 2 | hd_poly_g3_0600 | #1, #2 |
| We study hard at school. | 2 | hd_poly_g4_174 | #1, #2 |
| We watch TV on Sunday. | 2 | hd_poly_poly_watch | #1, #2 |

### D 万能动词剧场：两幕同一例句（29 句，共 58 次）

处理建议：**保留**（vv 两幕：① 讲 ② 复现，设计内）

| 句子 | 次数 | 所在单元 | 所在幕 |
|---|---|---|---|
| Can you help me give out the notebooks? | 2 | vv_give_out | #1, #2 |
| Don't look away from the blackboard. | 2 | vv_look_off | #1, #2 |
| Don't put off your homework until tomorrow. | 2 | vv_put_off | #1, #2 |
| Get in the car quickly! It's raining. | 2 | vv_get_in | #1, #2 |
| Get off the bus at the hospital. | 2 | vv_get_off | #1, #2 |
| He got out of the taxi at the gate. | 2 | vv_get_out | #1, #2 |
| He took up painting last summer. | 2 | vv_take_up | #1, #2 |
| I usually get up at 6:30 every morning. | 2 | vv_get_up | #1, #2 |
| Let's get on the bus at the next stop. | 2 | vv_get_on | #1, #2 |
| Look down from the top of the mountain! | 2 | vv_look_down | #1, #2 |
| Look in the box! What's inside? | 2 | vv_look_in | #1, #2 |
| Look out! A fast bike is coming! | 2 | vv_look_out | #1, #2 |
| Never give up! You can do it! | 2 | vv_give_up | #1, #2 |
| Open the window and take in fresh air! | 2 | vv_take_in | #1, #2 |
| Please give back my ruler after class. | 2 | vv_give_down | #1, #2 |
| Please give in your test papers now. | 2 | vv_give_in | #1, #2 |
| Please take out your English book. | 2 | vv_take_out | #1, #2 |
| Please turn down the TV. Baby is sleeping. | 2 | vv_turn_down | #1, #2 |
| Please turn in your homework on time. | 2 | vv_turn_in | #1, #2 |
| Please turn on the light. It's dark. | 2 | vv_turn_on | #1, #2 |
| Put down your pencil and look at me. | 2 | vv_put_down | #1, #2 |
| Put on your warm hat and gloves! | 2 | vv_put_on | #1, #2 |
| Put your toys in the toy box. | 2 | vv_put_in | #1, #2 |
| Remember to turn off the TV before bed. | 2 | vv_turn_off | #1, #2 |
| The cat got down from the tall tree. | 2 | vv_get_down | #1, #2 |
| The flowers give off a sweet smell. | 2 | vv_give_off | #1, #2 |
| The weather turned out sunny and warm! | 2 | vv_turn_out | #1, #2 |
| The window gives on the green park. | 2 | vv_give_on | #1, #2 |
| Turn up the music! Let's dance! | 2 | vv_turn_up | #1, #2 |

### E 跨单元的基础短句（10 句，共 21 次）

处理建议：**保留**（不同模块各自引用最基础的课标短句，复用有益；不合并）

| 句子 | 次数 | 所在单元 | 所在幕 |
|---|---|---|---|
| I like apples. | 3 | intonation_map, wo_rule_hgcs, ze_be | intonation_map_1, wo_rule_hgcs_1, ze_be_1 |
| A book. Three books. | 2 | eight_endings, ze_mark | eight_endings_1, ze_mark_1 |
| Decem means ten. | 2 | wo_grimm, wo_time_week | wo_grimm_1, wo_time_week_1 |
| December is the last month. | 2 | wo_grimm, wo_time_week | wo_grimm_1, wo_time_week_1 |
| Feet has the letters ee. | 2 | wo_vowel_a, wo_vowel_b | wo_vowel_a_1, wo_vowel_b_1 |
| I am happy. | 2 | hd_phonics, ze_be | hd_phonics_4, ze_be_1 |
| I go to school. | 2 | wo_rule_greek, ze_subject | wo_rule_greek_1, ze_subject_1 |
| I have ten fingers. | 2 | wo_grimm, wo_time_num | wo_grimm_1, wo_time_num_1 |
| I love my mom. | 2 | hd_phonics, ze_same | hd_phonics_4, ze_same_1 |
| Nice to meet you! | 2 | hd_oral_sc04, wo_rule_gvs | hd_oral_sc04_10, wo_rule_gvs_1 |
