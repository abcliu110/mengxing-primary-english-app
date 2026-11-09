# 第六波第 1 项底稿：v5check 豁免后重定基线（2026-11-10）

> 起点 HEAD `788f0bd`（第五波完成，check_all 27/27）；分支 `wave6/wb-check`，
> 工作树 `~/workspace/wave6-wb-check`（linked worktree，home 磁盘）。
> 定夺：主对话 Muse 已定（Priya 2026-11-10 07:20“第五波新发现的 14 件也你来定”
> 中的白板线第 1、4 项），本波只实施、不重新定夺。
> v5check 不进 check_all（维持 SOP 逐幕验收），见 wave5_wb.md §4.4。

## 0. 前后数字对照（全库重跑，同一台账口径）

| 口径 | 第五波基线（豁免前） | 第六波基线（豁免后） | 变化 |
|---|---|---|---|
| 覆盖 | 870 幕（auto 630 / oral 144 / poly 96） | 870 幕（同） | 0 |
| FAIL | **782 项 / 596 幕** | **526 项 / 498 幕** | −256 项 / −98 幕 |
| R2-W1 | 572 项（auto 446 / oral 90 / poly 36） | **486 项**（auto 391 / oral 89 / poly 6） | −86 项 |
| R4-F2 | 210 项（均为 auto） | **40 项**（均为 auto） | −170 项 |
| R2-S1 / R4-F3 FAIL | 0 / 0 | 0 / 0 | 0 |
| WARN | 268 项（R2-P1 161 + ACTS 为空 107） | **133 项**（R2-P1 26 + ACTS 为空 107） | −135 项 |
| UNKNOWN（R4-F3） | 780 项 | 780 项 | 0（精灵包 stub/缺失未变） |
| 未覆盖 | 87 幕 | 87 幕（同） | 0 |
| 豁免跳过（白板词出现次数） | — | **746 处**（全局 r2skip.json + 逐幕 R2SKIP） | — |
| 未覆盖白板词出现次数 | 约 4762 处 | **3505 处**（853 个不同词） | −1257 处（746 豁免 + 511 不规则同族覆盖） |

基线文件：`wave6_item1_v5check_baseline.json`（本次提交）。第五波基线文件
`wave5_item4_v5check_baseline.json` 未动。两次基线逐项比对：FAIL 项清掉
256 项（R2-W1 −86、R4-F2 −170），（幕，检查）组合清掉 144 组，
**新增 FAIL 0 项**——机制只去假阳性，不掩盖真缺口。

环境说明：UNKNOWN 780 与第五波一致，是在工作树里先跑
`make_sprite_stubs.py`（补 567 个 stub）再跑 `rebuild_highfreq_sprites.py`
（重建 47 个高频真实包，与第五波清单逐包一致）后重跑得到的；精灵包是
gitignored 本地产物，不入库。

## 1. (a) r2skip 豁免机制

### 1.1 旧工具的 r2skip 是否可复用——调查结论：语义可复用，清单不可复用

- `MASTER_DESIGN.md:877` 只在 2026-10-29 进度记录里提了一句工具名
（“工具：`r2check.py --summary`、`r2skip`（被划掉的错误形式）……”），
没有清单、没有字段定义，只是一个名字。**无现成清单可复用。**
- 语义在 `SOP.md §13` 有完整定义：案例对象可写 `r2skip: ["longth"]`，
列出画面上故意展示的错误形式（被划掉的 longth、字幕里的反例 foots），
r2check 不计入 R2（§7 第 3 条：错误形式不读）。**只能用于错误形式或
字母名，不能拿来躲朗读。** 本波复用这个语义，不扩大。
- v5 场景在第五波时 0 处使用该字段（wave5_wb.md §4.2 已核实）；r2check.py
本身已废止（`src/r2check.RETIRED.md`），其代码不复用。

### 1.2 两层机制（都在 `v5check.py` 里实现）

**全局清单 `docs/whiteboard/src/r2skip.json`**（9 类，见该文件；每类有豁免理由）：

| 类 | 词 | 豁免理由 |
|---|---|---|
| contrast | vs | 对比标记 "A vs B"，不是单词 |
| pos_tags | adj、adv、prep、vt、vi | 词性/成分缩写标签（adj. / adv. / Vt / Vi），只作分类标注 |
| pattern_codes | sv、svo、svp、svoo、svoc、oc、io | 句型/成分代码（SV、SVO、OC 宾补、IO 间宾），公式符号 |
| source_names | etymonline、wiktionary、wikipedia | 出处行里的来源名，是出处标注 |
| placeholders | sb、sth | 句式占位符（sb.=某人，sth.=某物），公式符号 |
| family_prefixes | wh、th | 词族前缀标记（wh- 问词家族 / th- 指示词家族）；th 兼序数词尾 |
| ordinal_suffixes | st、nd、rd | 序数词尾（1st/2nd/3rd 切词残留） |
| frame_roles | giver、recipient、theme、agent、patient、experiencer、instrument、location、traveler、destination、wearer、clothing、vehicle | 框架语义「句法结构公式」里的角色名（Giver + V + Recipient + Theme） |
| frame_names | communication、cognition、mental、emotion、perception、motion、transfer、transportation、dressing、wearing、giving、active、directed、result、frame、cause、change | 「X 小剧场 (Y Frame)」标题里的框架名 |

**核查方法（每词全量出现位置都看过，不是抽样）**：对清单里每个词，列出
它在全库所有未覆盖出现位置的 `'w'` 原文，逐类确认只出现在标签 / 公式 /
标题 / 出处行里，从未作为本幕要教的词出现。frame_roles / frame_names 两类
的全部不同原文见实施分析记录（hd_fr02–fr10 各幕的“句法结构公式”与
“X 小剧场 (Y Frame)”标题行）；其余 7 类的出现位置均为同类固定格式
（如 `vs` 只在 "A vs B" 对比标题，`adj` 只在 "adj." / "" 标注，
`sb/sth` 只在 "V + sb. + sth." 公式，`etymonline/wiktionary/wikipedia`
只在 "出处：Etymonline · Wiktionary · Wikipedia" 行）。
**边界**：以下有意不豁免——词尾/词块片段（-ly、-ed、-en、-es、im- 等，
按 SOP §7.1 须“至少单独读一遍”，缺口补法是进先读词表，见 §4）；
音节切分残留（va-CA-tion 里的 ca、重音切分）；古英语原词（scip、mētan
切词残留 tan 等）；框架名之外的实词。新增一类须先在底稿写清理由与全量
核查，否则不许进清单（见 r2skip.json 内注记）。

**逐幕豁免 `const R2SKIP = [...]`**（旧 r2skip 语义，v5 场景内字段）：
v5check 读场景文件里的 `const R2SKIP`，R2-W1 跳过其中列出的词。只用于
故意展示的错误形式。本波 3 处（gen 副本由模板继承再生，见 §1.3）：

| 场景 | R2SKIP | 板上原文 |
|---|---|---|
| wo_vowel_b_1.js | `['longth']` | `long + th = longth` |
| hd_g21_1.js | `['stoped', 'studyed']` | `常错：stoped ✗ → stopped ✓；studyed ✗ → studied ✓` |
| hd_g22_1.js | `['eated']` | `常错：goed ✗ → went ✓；eated ✗ → ate ✓` |

`goed` 未列：同一行里，但 `go` 已在该幕读到，检查口径下 `goed`
按 `go + ed` 规则屈折已算覆盖（假性通过，无害——goed 本就不该读，
检查不报 FAIL 是对的）。`foots` 在 `wo_vowel_a_1.js` 的 `'n'` 讲解
字幕里，R2-W1 只查 `'w'`，本来就不计入，不列。
其余“常错”行（如 `He will goes ✗`、`This blue umbrella is my. ✗`）
里的词都是正确英文词（goes、my……），只是句子用错了地方——它们是
真缺口（正确句里应读到），**不列入 R2SKIP**，留待 §4 补。

### 1.3 生成副本（gen_）的继承方式

`gen_scene.py`（items 模式）除 ITEMS / 标题 / spec.replace 外原样照搬模板，
故模板里加的 `const R2SKIP` 行随再生进入副本。本波再生 3 份
（specs/stock_wo_vowel_b_1.yaml、stock_hd_g21_1.yaml、stock_hd_g22_1.yaml），
`git diff` 逐份核对：每份只 +2 行（注释 + `const R2SKIP`），其余一字未动。
事实表（factsheets/）再生内容与已入库版本一致，无改动。

### 1.4 SOP 更新

- `SOP.md §13`：r2skip 注记改写为“v5check.py 已实现 r2skip（第六波第 1 项）：
全局 `src/r2skip.json` + 逐幕 `const R2SKIP`；3 处场景在用”。
- `SOP.md §5`：朗读覆盖检查行的基线指针改为新基线（526 项 / 498 幕），
并保留第五波基线文件的引用。

## 2. 不规则动词同族（R2-W1 与 R2-P1 共用）

旧 r2check 口径只认 -s/-es/-ed/-ing/-d 规则屈折；先读词用原形、句中用
不规则过去式/过去分词（give vs gave、go vs went、hold vs held）是合法
教学写法，不是缺口。`v5check.py` 新增 `IRREGULAR` 同族表（约 80 个常见
不规则动词，原形 → 过去式/过去分词，双向同族），`token_covered` 认同族。
效果：白板词出现次数 511 处由“未覆盖”转为“覆盖”（如板上 `go`、句中
`went`；板上 `went`、句中 `go`）。同族表只列常见动词，不含生僻词；
新增动词须是真实不规则变化，不许为凑数而编。

## 3. R4-F2 按课查（不是放宽，是纠正检查口径）

第五波 R4-F2 210 项里，170 项的 ACTS 键在**同课别节**的朗读句里出现、
0 项在全库任何朗读句里都不出现。根因：`split_auto.py` 拆长幕时
“ACTS / 角色包 / autoBuild 不变”（该脚本第 5 行原话）——每一节都留着
整课的 ACTS 登记；动作在读到词的那一节演出（同 ACTS、同精灵包），
其他节里的同键是同一份登记，不是缺口。按单幕查会把别节的动作误判为缺口。

改法：`v5check.py` 新增 `family_key()`（去 `gen_stock_/gen_b6pilot_/gen_`
前缀、去 `_pN_` 节号）与 `family_sentences()`（同课各节朗读句汇总），
R4-F2 按课查：键只须在同课任一节的朗读句里出现。匹配口径不变
（autoBuild 的连续词匹配 + 屈折口径；不加不规则同族——引擎本身是精确
词匹配，键须按句中词形原样写，见 auto.js 注释“词形原样写，如 running、took”）。
效果：R4-F2 210 → 40，**无一例是“放过”**：170 项都有同课挂接，40 项剩余
见 §5（其中 26 项 gen_、14 项手写，均为 ACTS 键在其课内任何一节都不出现）。

## 4. (c) 补真缺口——本波进度（R2-W1 优先）

本波先完成机制 + 重定基线（§0–§3）；逐幕补缺口的实施见第 4 项底稿与
续补记录（`wave6_item4_p1.md`，R2-P1 归一；R2-W1 逐幕补另记）。
豁免后剩余缺口构成（`wave6_item1_v5check_baseline.json`）：

- R2-W1 486 项：auto 391 / oral 89 / poly 6；手写 297 幕 / gen_ 189 幕。
未覆盖白板词 3505 处 / 853 个不同词；高频仍为功能词与板上短语词
（the 78、to 51、he 50、do 48、it 39、can 38、not 37、day 35、book 35……）。
补法口径：缺的朗读句用板上已有文字补（读板上短语本身，如 `Time's up!`），
不编造新例句；词尾/词块片段（-ly、-ed、-en、-es、im-）进先读词表
（SOP §7.1“至少单独读一遍”）；poly 幕只有 6 项剩余，只能改现有 sayEn /
ex 句，不能加 `'s'` 项（polyBuild 只读最后一个 `'s'`）。
- R4-F2 40 项：见 §5 清单。gen_ 的 26 项须走生成器（spec.replace 或
模板 ACTS 调整）或随模板改；手写 14 项逐幕定（加句挂接或删多余键，
注意 autoBuild 用 ACTS 首键做开场角色帧，删首键会换开场造型）。

## 5. R4-F2 剩余 40 项清单（豁免后基线）

| 场景 | 键 | 备注 |
|---|---|---|
| gen_letters_1.js | open、swims、put、catch | 模板 fp_iconicity_1 的 ACTS 全套继承，本幕句中无此词 |
| gen_letters_2.js | flies、go | 同上 |
| gen_letters_3.js | come、look | 同上 |
| gen_sentence_4.js | fly、pass、reading | 模板 ACTS 全套继承 |
| gen_spacetime_2.js | get on | 同上 |
| gen_spacetime_4.js | look for、look at | 同上 |
| gen_stock_intonation_map_2.js | look | 同上（模板 intonation_map_2） |
| gen_stock_intonation_map_3.js | jump | 同上 |
| gen_stock_irregular_plural_2.js | postmen | 键是名词（复数人），非动作词，须定夺删键还是加句 |
| gen_stock_pron_map_3.js | think | 同上 |
| gen_stock_writing_alchemist_2.js | piano、strawberries、sheep | 系列共用 ACTS，本幕句中无此词 |
| gen_stock_writing_alchemist_3.js | sweeping | 同上 |
| gen_viewpoint_1.js | tell | 模板 ACTS 全套继承 |
| gen_viewpoint_2.js | runs | 同上 |
| gen_viewpoint_4.js | play、reading | 同上 |
| intonation_map_2.js | look | 手写：ACTS 键与本幕句不挂接 |
| intonation_map_3.js | jump | 手写：同上 |
| irregular_plural_2.js | postmen | 手写：键是名词，须定夺 |
| pron_map_3.js | think | 手写：同上 |
| wo_rule_assim_1.js | think | 手写：同上 |
| writing_alchemist_1.js | piano、sweeping、strawberries、sheep、helps | 系列共用 ACTS；piano/sweeping/strawberries/sheep 是名词性键，helps 是动词 |
| writing_alchemist_2.js | piano、strawberries、sheep | 同上 |
| writing_alchemist_3.js | sweeping | 同上 |

生成幕的 ACTS 来自模板（`gen_scene.py`：“编排（ACTS、版面引擎）留在模板”），
故 gen_ 剩余项的根治须动生成器或模板，不是逐幕手改（gen 文件禁止手改）。

## 6. 验证

| 验证 | 结果 |
|---|---|
| `python3 docs/whiteboard/src/v5check.py --json wave6_item1_v5check_baseline.json` | FAIL 526 / 498 幕；WARN 133；UNKNOWN 780；与第五波基线逐项比对：FAIL 项清掉 256 项，（幕，检查）组合清掉 144 组，新增 0 项 |
| 新旧基线逐项 diff（scene, code） | 仅减少，无新增、无改动 |
| `node --check`（3 个手改场景 + 3 个再生场景） | 全部通过 |
| `git show` 逐行核对（本提交） | v5check.py 机制改动 + r2skip.json + 3 手改场景 + 3 再生场景 + SOP 两行 + 本底稿 + 基线 json；精灵包/事实表无入库改动 |
| build 打包抽查、探针抽查 | 见续补记录（随逐幕补缺口的提交做，不在本机制提交里） |
| `check_all.py` | 未跑（v5check 不进 check_all；本波不改 check_all 口径；总协调人合并后重跑为准） |

## 7. 未核实项

- 真机未核实：v5check 仍是静态 token 比对，未在真机听语音（与此前各波一致）。
- 豁免清单的 9 类只核查了“未覆盖出现位置”；某词在别幕已被读到的
出现位置不在豁免影响范围内（豁免只跳过未覆盖 token），无影响。
- `IRREGULAR` 同族表约 80 词，未逐词核对全部过去式/过去分词拼写以外的
教学适用性（如 dreamt/dreamed 并列）；表内词形均来自常规不规则动词表，
未编造。

## 8. 新发现的待定夺（均未擅自做）

1. R2-W1 剩余 486 项的补量：本波补到能补的为止，剩余如实记入续补记录；
是否立项全清、排期多久，须定夺。
2. R4-F2 剩余 40 项中名词性 ACTS 键（postmen、piano、strawberries、sheep、
sweeping、helps 除外）：删键还是为它加句，须内容方逐幕定夺——删键改
ACTS 首键会换开场角色帧，加句是新内容。
3. gen_ 幕的 ACTS 全套继承模板：是否改 `gen_scene.py`，让生成时按生成后
的 ITEMS 裁剪 ACTS（只留本幕句中出现的键），须定夺——改生成器影响
314 个生成幕的再生 diff，须先试点。
4. 音节切分残留（ca、ee、tan 等）与古英语原词（scip 等）的 R2-W1 剩余：
checker 无法建模，须人工逐幕验收还是另立豁免类，须定夺。
5. ACTS 为空的 107 幕（WARN 不变）：仍待内容方逐幕判断（第五波遗留）。
6. v5check 全库基线将来是否进 check_all：现 498 幕 FAIL，进则立刻变红；
待缺口收敛后再议（第五波遗留）。
