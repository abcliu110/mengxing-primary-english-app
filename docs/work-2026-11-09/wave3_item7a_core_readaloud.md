# 第三波第 7(a) 项：12 核心义幕补朗读句工作底稿

> 日期：2026-11-09 · 执行：白板第三波实施员 · 仓库 master（起始 HEAD 0ae1739；第 3 项提交后 HEAD 4b06fae）
> 定夺（主对话 Muse 已定，不重新定夺）：12 幕核心义场景（vv 的 12 个 `_core_1` 幕）仍无朗读句是 R2 缺口，逐幕补已核实来源的朗读句；不编造，某幕实在核不到就留空并记入底稿。
> 结果先行：**12/12 均补上，留空 0 幕。** 口径为牛津高阶学习者词典（OALD）动词词条义项原句逐字照录，与 V-42「Priya 定用牛津原句」同一口径；中文译文为本幕所加（与格子幕 `ZH` 译文做法相同）。

## 0. 前后数字

| 项 | 改前 | 改后 |
|---|---|---|
| 12 核心义幕含 `['s', …]` 朗读项 | 0/12（R2 缺口；文件头写「无朗读句」） | **12/12，各 1 句** |
| 留空幕 | — | **0** |
| 「无朗读句」字样残留（12 场景 + 生成器） | 15 处（12 场景文件头 + 生成器 3 处，见 §3） | **0** |
| 探针时长（打包 `__dur`，0 报错） | give_core 21.6 秒（第 3 项实测；其余 11 幕未单测） | **25.1–30.4 秒**（12 幕，见 §2） |

## 1. 朗读句清单（逐幕核实来源）

每句均为 OALD（oxfordlearnersdictionaries.com）动词词条义项原句，2026-11-09 当天用搜索与开页核对：

| 动词 | 英文原句（逐字） | 中文译文（本幕所加） | OALD 出处 | 词数 |
|---|---|---|---|---|
| climb | Don't climb too high. | 别爬得太高。 | climb_1 义项 1（go up）Extra Examples（开页核对 L50） | 4 |
| eat | I don't eat meat. | 我不吃肉。 | eat 义项 1（to put food in your mouth, bite it and swallow it） | 4 |
| fall | The leaves were falling from the trees. | 树叶正从树上落下来。 | fall_1 义项 1（drop down） | 6 |
| fly | Geese fly south in the fall. | 大雁秋天往南飞。 | fly_1 义项 1（of bird/insect） | 6 |
| get | What did you get for your birthday? | 你生日收到了什么礼物？ | get 义项 1（receive/obtain） | 7 |
| give | Give your mother the letter. | 把这封信给你妈妈。 | give_1 义项 1（hand/provide） | 5 |
| go | He goes to work by bus. | 他坐公交车去上班。 | American go_1 义项 1（move/travel） | 6 |
| play | Let's play a different game. | 我们换个游戏玩吧。 | play_1 义项 1（of children） | 5 |
| speak | Do you speak English? | 你会说英语吗？ | American speak_1 义项 4（a language） | 4 |
| stand | She was too weak to stand. | 她虚弱得站不起来。 | stand_1 义项 1（on feet/be vertical） | 6 |
| take | Remember to take your coat when you leave. | 走的时候记得带上外套。 | take_1 义项 1（carry/lead） | 8 |
| turn | The wheels of the car began to turn. | 汽车的轮子开始转动了。 | turn 义项 1（move round） | 8 |

选句原则：用动词原形义（核心义），不用短语动词义；短句（SOP §3 例句 4–9 词；fly 句 6 词，climb/eat/speak 句 4 词）；只用小学生可读的词；每句与仓内现有例句查重 0 重复（`grep` 12 句 × 场景/模型/主文件均为 0 命中）。

为什么不用仓内已核例句：`laws-prototype/model/phrasal_combos.json` 156 条已核例句全是短语动词格例句（无裸动词核心义句）；`wb13_phrasal.json` 12 个 `verb_core` 页只有核心义中文、音标与六格总览，无例句字段；词库（`imported/etym-work/vocab.json`）12 动词条目只有中文义，无例句字段。故 12 句全部外取 OALD 原句，无一编造。

## 2. 改动

### 2.1 生成器（`docs/whiteboard/src/wb13/gen_wb13_scenes.py`）

- 新增 `CORE_READALOUD` dict：动词 →（英文原句，中文译文，OALD 义项出处），附口径注释。
- `core_scenes()`：每幕 ITEMS 在核心义中文行后追加 `['s', 英文, 中文, 动词原形]`（第 4 元 = 先读词；`autoBuild` 的 `K.say` 先读词再读整句，符合 SOP §7）；缺句时 `assert verb in CORE_READALOUD` 直接报错，不静默留空。
- 文件头 docstring 第 5 条与 `core_scenes()` docstring、「无朗读句」src 注记：一并改为朗读句口径；场景文件头第 2 行同步改写为「朗读句：OALD …（2026-11-09 第三波补，中文译文为本幕所加）」。
- 未改 `main()` 与 72 格逻辑：将来全量重跑生成器时 12 幕朗读句自动保留。

### 2.2 场景文件（12 个，用 import 方式调 `core_scenes()` 只重写 12 幕，第二波同款做法）

每幕 diff 恰为 2 处：文件头来源行改写 + 新增 1 条 `['s', …]` 项；其余 ITEMS/ACTS 一字未动：

- `vv_climb_core_1.js`、`vv_eat_core_1.js`、`vv_fall_core_1.js`、`vv_fly_core_1.js`、`vv_get_core_1.js`、`vv_give_core_1.js`、`vv_go_core_1.js`、`vv_play_core_1.js`、`vv_speak_core_1.js`、`vv_stand_core_1.js`、`vv_take_core_1.js`、`vv_turn_core_1.js`。

## 3. 「无朗读句」残留核查

改前 grep：12 场景文件头各 1 处 + 生成器 docstring 第 5 条 + `core_scenes()` docstring + src 注记行。改后 grep：12 场景 + 生成器 **0 处**。其余「无朗读句」字样若在历史底稿中出现（如第二波底稿的遗留记录），属历史记录，不改。

## 4. 验证

- `node --check`：12 幕通过。
- `node v5/build.mjs` 打包：12 幕通过（每幕约 1,116,000 字节；字体 `~/workspace/wbfonts`）；12 句英文逐字出现在打包产物中（`grep` 12/12 命中）。
- 探针（Playwright + 本地 Chromium 缓存，读打包 `__dur`）：12 幕 **0 报错**，时长如下（补句前 give_core 为 21.6 秒，补句后约 +4 秒，符合一条短句的朗读时长）：

| 幕 | 时长（秒） |
|---|---|
| climb / eat / fall / fly / get / give | 27.3 / 25.7 / 26.6 / 25.8 / 26.3 / 26.0 |
| go / play / speak / stand / take / turn | 25.1 / 26.7 / 26.6 / 26.1 / 26.6 / 30.4 |

- `gen_wb13_scenes.py --check-only`：**未通过，但与本次改动无关**——`main()` 断言「待新建格应为 32」实得 0。实测 `wb13_phrasal.json` 中未覆盖的 attested 格确为 0（第二波 §7.1 重跑 `gen_wb13_data.py` 后覆盖已是 50/50）；`main()` 的 32 断言自那时起即已过时。本次 diff 未碰 `main()`（`git diff` 中无 `main/missing/assert len` 行）。`core_scenes()` 本身经 import 调用重写 12 幕成功，生成逻辑无误。
- `r2check.py`：未跑——该脚本依赖已停用的 `insert_wb.py`（HANDOFF：已停用）与已删旧主文件；R2 覆盖改用打包产物 grep + 探针时长佐证（每幕恰 1 条 `s` 项，`grep -c` 12 幕合计 12 条）。
- `laws-prototype/tools/check_all.py`：**24/24 通过**（结论「全部通过」）。
- `docs/whiteboard/src/jscheck.py`：**anchorcheck FAIL 116 项**，FAIL 行集合与第 3 项提交时存的 `/tmp/wb3/jscheck_fail_item3.txt` 逐项一致（`diff` 为空；本项不碰主文件，锚点缺失是基线遗留）。

## 5. 未核实项与待定夺

- **未核实**：真机语音朗读听感（探针只验证打包 0 报错与时长增长，未真机听）；12 句中文译文为本幕所加，未经词典官方译文核对（OALD 无官方中文译文；Cambridge 有官方译文的条目本次未采用——12 句义项在 Cambridge  learner's 词典未逐条比对）。
- **说明**：12 幕时长 25–30 秒，低于 SOP §1 实验室 40–60 秒指引——核心义幕本身是总览页（单词 + 六格清单），内容短是原设计如此；本次只补 1 句朗读，未为凑时长加内容。
- **待定夺**：无新增。遗留一项（供总协调人）：`gen_wb13_scenes.py main()` 的「32 格」断言与 `gen_wb13_units.py` 的「186 页签」断言均已过时（数据现状是覆盖 50/50、页签 233），一次性生成器的基线断言是否统一更新——本次未动（只改生成逻辑，不碰断言口径）。
