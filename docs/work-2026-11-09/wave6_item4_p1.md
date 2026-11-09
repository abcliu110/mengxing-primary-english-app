# 第六波第 4 项底稿：R2-P1 先读词提醒统一口径（2026-11-10）

> 起点 HEAD `788f0bd`（第五波完成）；分支 `wave6/wb-check`，工作树
> `~/workspace/wave6-wb-check`。定夺：主对话 Muse 已定（第五波新发现
> 第 4 项），本波只实施、不重新定夺。R2-P1 是 WARN，不作门禁，不进
> check_all。

## 0. 结果总表

| 口径 | 数字 |
|---|---|
| 第五波 R2-P1 WARN（旧 checker：先读词与句中词形精确比对） | 161 项 |
| checker 改统一口径后（§1，归一前重算） | **28 项** |
| 本波归一（移词/删重复词，§2） | **22 项**（手写幕 13 项 + 生成幕 9 项） |
| 剩余 WARN（无法归一，§3） | **6 项**（手写幕 3 项 + 生成幕 3 项） |
| 全库 FAIL 变化（R2-W1 486 / R4-F2 40） | 0 项新增、0 项清掉（先读词表改动不改变 FAIL 口径） |
| WARN 总数 | 135 → **113**（R2-P1 28 → 6；ACTS 为空 107 未动） |

## 1. 统一口径（v5.1 先读词规范，以现行多数为准）

### 1.1 实测：161 项的现有格式分布

`'s'` 项第 4 元（先读词）是空格分隔的词表，K.say 的 `word:` 参数先单独
读，再读整句。161 项提醒按“先读词与本句的关系”分四类（逐项实测，
见实施分析记录）：

| 类 | 项数（按词计 213 个 miss 词） | 例子 |
|---|---|---|
| 屈折形不一（原形 vs 句中屈折形） | 72 词 | horn/horns、apple/apples、hold/held、save/saves、fall/falling、go/goes、report/reports |
| 词块/词缀（先读词是句中词的子串或包含句中词） | 约 60 词 | im- ← Import、ex- ← Export、-ly ← happily、brush ← toothbrush、foot/ball ← football、's ← books |
| 词条占位（短语动词词条形，句中用真实宾语/屈折形） | 约 40 词 | fall off (something)、get over something、be falling down（句首 be 为不定式标记） |
| 真错位（词与本句完全无关） | 46 项（见 §2 清单） | 多句词表串到一句上、答案词、别句的词 |

现行多数（115/161 项）是前三类——先读词表本来就是“原形/词块/词条形”，
句中用屈折形/真实宾语是设计如此，不是错误。旧 checker 用精确词形比对，
把合法写法全报成了提醒。

### 1.2 统一格式（写进 `v5check.py` 的 `pre_word_ok`，与 SOP §7.1 对齐）

先读词表 = 空格分隔的词表；表中每个词须满足以下任一才算合规：

1. **屈折一致**：原形或屈折形（-s/-es/-ed/-ing/-d；不规则动词同族，
   如 give/gave、go/went）出现在本句中；
2. **词块**：是本句某词的子串（如 im- ← Import，-ly ← happily），或
   包含本句某词（如 toothbrush ← brush）；
3. **词条占位**：something / somebody / someone（短语动词词条的宾语占位，
   句中用真实宾语），或词条首的 be（be falling down 的不定式标记）；
4. **二选一**：`'/'` 连接的备选（如 well/badly），任一备选合规即合规。

其余一律视为错位：把词移到它所属的那句的词表里；已在别句词表里的，
直接删掉（不重复读）；无处可移的，记入 §3 无法归一。

### 1.3 实施中修正的 checker 误判（2 处，附证据）

1. **`'on' ⊂ 'moon'` 误判通过**：规则 (2) 的 `t in pre` 方向（句中词是
   先读词的子串）原先只要求句中词 ≥2 字母，于是 `on`（2 字母）让
   `moon` 误判合规（wo_time_week_p2_1 的 `Monday moon` 未报提醒）。
   修正：该方向只认 ≥3 字母的词块。修正后 R2-P1 28 项（+2 项 moon，
   见 §3）；FAIL 不变。
2. **1 字母先读词误判通过**：`'I' ⊂ 'with'` 同理。修正：`pre in t`
   方向只认 ≥2 字母的先读词，`s`（复数标记）特许 1 字母。修正后
   WARN 总数不变（'I' 一案按 `I + s = is` 的旧屈折口径仍通过，
   见 §4 第 2 条）。

第 1 项底稿的 WARN 数字已同步订正（133 → 135、R2-P1 26 → 28，
见 `wave6_item1_v5check_baseline.md` 订正注记与基线 json 的
`counts.warn['R2-P1']`）。

## 2. 归一的 22 项（逐条）

只改先读词表（第 4 元），不改句子、不改中文、不改板书。

### 2.1 手写幕 13 项

| 场景 | 改动 | 理由 |
|---|---|---|
| aux_transformer_p3_2 | [9] 词表删 `How`；[2] 词表 `''` → `How` | `How` 属于 [2] 句 `How well Leo can speak English!` |
| bamboo_tree_4 | [47] 词表删 `the`；[41] 词表加 `the`（`on the school playground do exercises`） | `the` 属于 [41] 句 `On the school playground. …` |
| five_patterns_p3_5 | [5] 词表删 `do` | `do` 已在 [2] 句词表（`Ask us to read! Do it now.`） |
| fp_economy_2 | [39] 词表删 `es`；[27] 词表 `buses` → `buses es` | `-es` 属于 [27] 句 `Two buses are coming.`（`es ⊂ buses`） |
| fp_economy_3 | [54] 词表删 `im`；[53] 词表 `impossible` → `impossible im` | `im-` 属于 [53] 句 `It's impossible …`；`in` 无处可移，见 §3 |
| fp_economy_4 | [56] 词表删 `ing`；[36] 词表 `running` → `running ing` | `-ing` 属于 [36] 句 `The dog is running …` |
| fp_vectors_4（2 项） | [44] 词表删 `pen`；[46] 词表删 `at` | `pen` 已在 [45] 句词表（`Look for my pen.`），`at` 已在 [47] 句词表（`Look at me!`） |
| intonation_map_1 | [27] 词表删 `yes no` | `yes`/`no` 已在 [28] 句词表（`Yes or no?`） |
| wo_time_week_p2_1 | [28] 词表删 `Saturday` | `Saturday` 已在 [29] 句词表（`I sleep late on Saturday.`）；`moon` 见 §3 |
| writing_alchemist_1（3 项） | [41] 词表只留 `I like English very much`，其余 9 词分到 [14]/[26]/[38]；[43] 词表删 `had`（→ [26] 词表 `unforgettable had`）；[44] 词表删 `not only but also`（→ [38] 词表 `books not only our study but also`） | [41]/[43]/[44] 的词表是整节词库串到一句上；按句拆分后每词都落在其所属的句 |
| writing_alchemist_3 | [37] 词表删 `but`；[38] 词表加 `but`（`… helpful but also …`） | `but` 属于 [38] 句 `Not only is she … , but she is also …` |
| ze_be_1 | [41] 词表删 `happy`；[37] 词表 `am` → `am happy` | `happy` 属于 [37] 句 `I am happy.` |

### 2.2 生成幕 9 项（spec 改 + `gen_scene.py` 再生，diff 逐份核对只动词表行）

| 生成幕 | spec | 改动（与手写幕模板同一改动） |
|---|---|---|
| gen_stock_aux_transformer_p3_2 | specs/stock_aux_transformer_p3_2.yaml | 同 aux_transformer_p3_2（`How` 移句） |
| gen_stock_bamboo_tree_4 | specs/stock_bamboo_tree_4.yaml | 同 bamboo_tree_4（`the` 移句） |
| gen_stock_five_patterns_p3_5 | specs/stock_five_patterns_p3_5.yaml | 同 five_patterns_p3_5（删 `do`） |
| gen_stock_intonation_map_1 | specs/stock_intonation_map_1.yaml | 同 intonation_map_1（删 `yes no`） |
| gen_stock_wo_time_week_p2_1 | specs/stock_wo_time_week_p2_1.yaml | 同 wo_time_week_p2_1（删 `Saturday`；`moon` 见 §3） |
| gen_stock_writing_alchemist_3 | specs/stock_writing_alchemist_3.yaml | 同 writing_alchemist_3（`but` 移句） |
| gen_phonology_2 | specs/phonology_2.yaml | 同 fp_economy_2（`es` 移句） |
| gen_phonology_3 | specs/phonology_3.yaml | 同 fp_economy_3（`im` 移句；`in` 见 §3） |
| gen_phonology_4 | specs/phonology_4.yaml | 同 fp_economy_4（`ing` 移句） |

再生验证：9 份产物 `git diff` 逐份核对，只动先读词表行（每份 2–4 行），
其余一字未动；事实表（factsheets/）无改动。gen 文件禁止手改，本波
一律走 spec + 再生，未直接改任何 gen 文件。

## 3. 无法归一的 6 项（逐条记入底稿，不谎报清零）

| 场景 | 词 | 无法归一的理由 |
|---|---|---|
| fp_economy_3.js / gen_phonology_3.js（2 项） | `in` | 前缀 `in-`（否定，`in- → im-`）；本幕没有任何一句含 `in-` 词（只有 `impossible` 是 `im-` 形）。移去别句会把前缀误作介词 `in`，删掉会丢前缀教学；留待内容方定夺（是否补一句 `in-` 例句，如 `incorrect`） |
| wo_time_week_p2_1.js / gen_stock_wo_time_week_p2_1.js（2 项） | `moon` | 词源词：`Monday = moon + day`（板上有 `= moon + day` 词源行）；本幕无一句含 `moon`。先读即单独读（SOP §7.1 词根至少单独读一遍），删掉会丢词源教学；留待内容方定夺 |
| wo_vowel_b_1.js / gen_stock_wo_vowel_b_1.js（2 项） | `ith` | 古尾巴 `-ith`（讲解字幕：“古时候这条尾巴是 -ith，里面的 i 像磁铁把 o 拉成了 e”）；本幕无一句含 `ith`。先读即单独读，删掉会丢词缀教学；留待内容方定夺 |

三者共同点：都是“板上有据、先读即单独读、句中无对应词形”的词根/词缀/
词源词。统一口径的规则 (2) 要求词块须在句中有落点，这三词没有落点；
放宽规则会让真正的错位词（如 `How`、`pen`）也漏网，故不放宽，逐条记录。

## 4. 验证

| 验证 | 结果 |
|---|---|
| `python3 docs/whiteboard/src/v5check.py` 全库 | FAIL 526 / 498 幕（R2-W1 486、R4-F2 40），与豁免后基线逐项比对：0 新增、0 清掉；WARN 135 → **113**（R2-P1 28 → **6**；ACTS 为空 107 未动）；UNKNOWN 780 未变 |
| `node --check`（13 个手改场景 + 9 个再生场景） | 全部通过 |
| `build.mjs` 打包抽查（4 幕） | writing_alchemist_1、fp_economy_3、aux_transformer_p3_2、gen_phonology_2 均 exit 0（产物 1.11–1.12 MB）；注：工作树初无 `v5/node_modules`（gitignored），从主仓库 `docs/whiteboard/v5/node_modules` 软链后才通过 |
| 探针时长（durcheck --scan，4 幕） | **未核实**：本机 Playwright 的 chromium_headless_shell 缺失（已装的 -1248 与驱动要的 -1254 版本不一致；`python3 -m playwright install chromium` 后台下载中，至本底稿写成时未完成；探针 4 幕全部 skip，durations.json 未写入新值）。下表是**改前已入库旧值**（非本次实测）：writing_alchemist_1 252.2s、fp_economy_3 169.4s、aux_transformer_p3_2 108.0s（均 >120s 线，是旧账，见 §5 第 3 条）；gen_phonology_2 无旧值。理论影响：本次只动先读词表，按 sayLen 口径（每词约 0.42s）writing_alchemist_1 净 -1 词、其余 3 幕净 0 词，时长变化 ≤1s；须在有浏览器的环境重跑探针确认 |
| `git show` 逐行核对（本提交） | v5check.py 口径修正 + 13 手改场景 + 9 spec + 9 再生场景 + 第 1 项底稿订正 + 本底稿；无其他文件 |

## 5. 新发现的待定夺（均未擅自做）

1. §3 的 6 项无法归一（`in` / `moon` / `ith`）：是否为先读词表立一个
   第 5 类合规口径（“词根/词缀/词源词：板上有据、先读即单独读”），
   还是为它们各补一句含该词的例句，须内容方定夺。
2. checker 已知宽松处（不影响 FAIL，不扩大修补面）：单字母先读词按
   旧屈折口径 `I + s = is` 仍可通过（如 writing_alchemist_3 词表里的
   `I`）；是否收紧，须定夺。
3. writing_alchemist_1 等长幕的时长（252.2s，远超 120s 线）是旧账：
   本波未动（只改先读词表），是否按决策 36-② 拆节，须另立项。
