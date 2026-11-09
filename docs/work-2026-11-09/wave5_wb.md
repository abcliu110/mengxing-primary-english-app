# 第五波白板线总底稿（2026-11-09）

> 起点 HEAD `d698a3c`（第四波完成，check_all 26/26）；分支 `wave5/wb-line`，
> 工作树 `/tmp/wave5-wb`（linked worktree，汇报后先留着不要删，协调人合并后统一清理）。
> 定夺：主对话 Muse 已定（Priya 2026-11-09 20:16“第四波新发现的 13 件也你来定”中的
> 白板线 6 项），本波只实施、不重新定夺。

## 0. 提交清单（`d698a3c..HEAD`，线性历史，无 force-push）

| 提交 | 内容 |
|---|---|
| `b5a6158` | Content：第 2 项 give back ② 末尾残留句改写 |
| `8b80462` | Bug：第 3 项高频动词幕 47 个精灵包从 cast/ 重建真实包 |
| `fe04ed3` | Content：第 4 项 v5 原生 R2/R4 轻量静态检查 v5check.py |
| `d0a53a3` | Docs：第 5 项 SOP/CHANGELOG 里 r2check 验收行改写 |
| `d6486ef` | Content：第 6 项 build.mjs lib 分支 + 全量扫测脚本 |
| （本提交） | Docs：本总底稿 |

## 1. 第 1 项：wb13_phrasal.json 不补 give on 记录 ✅（只记一笔，不改数据）

**记录在此，免得以后有人当成缺失来“补”**：vv_give_on 有意不在
wb13_phrasal.json 内，独立页签，来源为被删 8 幕原文（见 wave4 总底稿 §1
give back 的同类记录；give on 做法见 `wave4_item2_give_on.md`，由
`d62026c^` 的 `vv_give_on_1/2.js` 原文恢复）。

该文件是 72 格结构，on 在 6 小品词内但 give on (onto) 是门窗朝向的书面
用法、与 72 格的动词×小品词组合口径不同；补就要数据方定新 schema，
为一个例外改结构会开先例（与 give back 的理由相同，见 wave4 总底稿 §1）。
vv_give_on 页签与场景已独立存在、内容已核实，不依赖这个文件。

验证：该文件 0 改动（`git status` 无此文件）。

## 2. 第 2 项：give back ② 末尾残留句改写 ✅（`b5a6158`）

文件 `docs/whiteboard/v5/scenes/vv_give_back_2.js` 第 28 行，只改这一行，
其余一字未动：

旧：`['w', '共同点：BACK = 回到原来的地方（give 没有常用的 down）'],`
新：`['w', '共同点：BACK = 回到原来的地方'],`

验证：`node --check` 通过；`build.mjs` 打包通过（1,116,527 字节——
注意：该数字是 stub 精灵包下的产物；第 3 项把 `vvgiveback2.js` 重建为
真实包后，第 6 项复测同幕打包产物为 1,211,512 字节，多出的约 95 KB 即
3 帧 webp 数据。解码打包产物（esbuild 把中文转 `\uXXXX`，须先解码再
grep）确认新句在场、旧 parenthetical 不在场。

## 3. 第 3 项：470 个精灵包只重建高频幕真实包 ✅（`8b80462`）

### 3.1 实测：470 个缺失包里多少属于高频动词系列

以第四波清单 `wave4_item4a_sprite_inventory.json`（470 缺失）为准，
核对 give/take/get/turn 四组 vv 幕（含 gen_stock_ 副本）引用的全部包：

| 口径 | 数字 |
|---|---|
| 高频包（四组 vv 幕引用的全部包） | **62** |
| 其中在 470 缺失清单内 | 44（give/take/get/turn 各 11 个） |
| 其中已有 stub（back/on/core/over 系列） | 18 |
| ACTS 有帧且 cast/ 齐全 → 重建 | **47**（43 个缺失包 + 4 个已有 stub 的 back/on 包） |
| ACTS 为空 → 留 stub（空 FR/FI 即正确内容） | 15（14 个 core/over 幕 + vv_take_out_2；场景头注明“ACTS 待配，不编造帧映射”） |
| cast/ 缺帧的高频包 | **0** |
| 重建帧总数 | **129 帧** |

帧名来源：各幕 `const ACTS = {...}` 的登记（场景作者登记的演出帧），
不编造；cast/ 帧库共 343 个 webp 帧，43+4=47 个包的帧全部在库。
`vv_take_out_2.js` 的 `ACTS = {}`（该幕不用任何帧），重建零帧包没有
意义，留 stub。

### 3.2 做法

新增 `docs/work-2026-11-09/rebuild_highfreq_sprites.py`（幂等：从场景
ACTS 推导帧 → 核对 cast/ → 调 `sprites/build_sprites.py <lib> <帧…>`
重建 → 逐包核对生成包的 FR 键 == ACTS 帧）与清单
`wave5_item3_highfreq_sprites.json`（62 个包逐包的帧、引用幕、
是否在 470 清单内）。精灵包本身是 gitignored 的本地构建产物
（sprites/.gitignore：`*.js`，手工版除外），不入库；任何机器先跑
`make_sprite_stubs.py` 补齐 stub 再跑本脚本即可复现。

### 3.3 验证：重建幕实测出帧

- 47 包逐包 FR 键核对通过（脚本内 `verify_pack`，帧数 1–3/包）。
- 抽 5 幕打包：vv_give_up_1、vv_give_back_1、vv_take_out_1、
  vv_get_down_1、vv_turn_on_2，产物各含 **3 个** `data:image/webp;base64`
  帧；对照：stub 包下的同款产物为 0 个。另核对 vv_give_up_1 产物含帧名
  l_lift0/1/2 各 3 次。
- 探针（durcheck --scan，Playwright 读打包 `out/` 的 `window.__dur`，
  0 报错）：vv_give_up_1 23.8 秒、vv_give_back_1 22.2 秒、
  vv_take_out_1 22.6 秒、vv_get_down_1 21.5 秒、vv_turn_on_2 38.3 秒。
  时长与 stub 版一致（帧不改变朗读时间轴，符合预期）；探针后
  `durations.json` 已恢复、`out/` 产物已删。
- 其余缺口：重建后仍为 stub 的包共 **427 个**（470 − 43），其中 426 个
  无真实帧、1 个（vvtakeout2）无需帧。427 个包的幕打包仍通过、播放时
  无人物帧（与第四波 stub 现状相同）。

## 4. 第 4 项：v5 原生 R2/R4 轻量静态检查 ✅（`fe04ed3`）

### 4.1 先查规格：R2/R4 在 v5 下到底要求什么

SOP.md §0：R2 = 画面上每个英文单词都要有例句，单词和句子都必须有
语音朗读；R4 = 单词或例句里的动作必须由讲解员小人或场景角色演出来，
和朗读同步；R4v2 = 主动词用专属动作演，actionWords 不为空。
v5 引擎实测（不是推测）：

| 引擎 | 's' 朗读 | ACTS/动作 |
|---|---|---|
| autoBuild（scenes/auto.js 's' 分支） | 每个 's' 项必发一次 K.say；'w' 项只写白板、不单独发 K.say，词级朗读只发生在某条 's' 句里（先读词 word: 或句中词） | 按 ACTS 键在 's' 句里找动作词，找到才排演员关键帧；键不在句里 = 该动作永不演出 |
| oralBuild（scenes/oral.js:132/161） | 每个 's' 项进一个对话轮次、轮次英文必 K.say；核心交际句必 K.say | ACTS 的 M/F/A/B 两组角色帧（oral.js:42-45），以 SP.FI 里有该帧为演出前提 |
| polyBuild（scenes/poly.js:109-111） | 唯一的 's' 项（sayEn）必 K.say，另读 ex1/ex2 中与 sayEn 不同的那一句 | ACTS['*'] 的帧（poly.js:41），以 FI 里有该帧为前提 |
| mindmapBuild / 其他手写幕 | 无统一 ITEMS/'s' 约定 | 无统一 ACTS 约定 |

### 4.2 检查脚本：`docs/whiteboard/src/v5check.py`

只做能从场景文件静态验证的要求（轻量），用法
`python3 docs/whiteboard/src/v5check.py [--only <前缀> ...] [--json out.json]`，
有 FAIL 返回 1：

| 检查 | 口径 |
|---|---|
| R2-S1 有朗读句 | auto/oral ≥1 个 's' 项；poly 恰好 1 个（polyBuild 只读最后一个 's'，多个会丢前面的） |
| R2-W1 白板词有句读 | 'w' 项每个英文词（去音标、去 1 字母标签）出现在某句被朗读的句子里；屈折 -s/-es/-ed/-ing/-d 算覆盖；'…ing'、`im-` 类词块按子串算覆盖；先读词（'s' 第 4 元）由 K.say 的 word: 参数先单独读，计入已读 |
| R2-P1 先读词提醒（WARN） | 's' 第 4 元不在该句里或词形不一致（如 give vs gave）；只提醒，不作门禁 |
| R4-F1 ACTS 在位 | const ACTS 存在（三类幕实测 870/870 在位） |
| R4-F2 动作词挂在朗读句上（仅 auto） | ACTS 每个键（'*' 除外）按 autoBuild 匹配口径出现在某句 's' 句里；单字按屈折口径（helps/help、sweeping/sweep 算同一词） |
| R4-F3 演出帧在库 | ACTS 登记的每个帧都在精灵包 FI 里；包是 stub（FI 为空）或缺失时记 UNKNOWN，不算失败 |
| WARN ACTS 为空 | 该幕没排任何动作；“该幕有没有动作词”静态定不了（没有动词词表，不硬编），只计数提醒 |

覆盖：auto 630 + oral 144 + poly 96 = **870 幕**。覆盖外 87 幕只盘点
不判对错：mindmapBuild 25（导图结构，无 ITEMS/'s'）、lightTwinsBuild 3、
buildAdj 4、frBuild 4、其他手写幕 51（各用 kit 的 say() 等不同写法，
无统一约定）、共享 lib/引擎模块 10 个。另：'m' 灰片与 'n' 讲解字幕的
英文词不在 R2-W1 范围内（'m' 多为分类标签/中文）；v5 场景无 r2skip
字段（全库 0 处），故无错误形式豁免口径。

### 4.3 全库基线（2026-11-09，`wave5_item4_v5check_baseline.json`）

| 口径 | 数字 |
|---|---|
| 覆盖 | 870 幕 |
| FAIL | **782 项 / 596 幕**（R2-W1 572：auto 446、oral 90、poly 36；R4-F2 210，均为 auto） |
| R2-S1 / R4-F3 FAIL | **0**（每幕都有朗读句；真实包无一缺帧——与第 3 项重建核对一致） |
| WARN | 268 项（ACTS 为空 107 + R2-P1 161） |
| UNKNOWN | 780 项（均为 R4-F3 精灵包 stub/缺失，帧在库与否验不了） |
| 未覆盖 | 87 幕（见 §4.2） |

抽查验证过 FAIL 是真缺口不是解析假阳性：vv_give_in_1 的白板词
"Time's up!"（time/up）无任何朗读句读到；vv_give_up_2 的
"Healthy teeth!"（healthy）无句读到；vv_give_back_1 的 "Amy / Thanks"
无句读到。R2-W1 高频词：vs（约 50 幕）、adj（26 幕，成分标签）、
etymonline/wiktionary（各 14 幕，白板上的出处名）、it/you/the/do/what/is
等。R4-F2 例：writing_alchemist 的 ACTS 键 strawberries/sheep/helps/
piano/sweeping 不在任何朗读句里——按 autoBuild 的匹配逻辑，这些动作
永不演出。

### 4.4 为什么没进 check_all

782 项 FAIL / 596 幕是内容缺口现状（要补朗读/动作登记，不是改脚本
能消掉的）；进 check_all 当门禁会立刻变红、挡住无关工作。故按任务
口径：**不进 check_all，作为白板线逐幕验收步骤写进 SOP**（见 §5）：
新改的幕跑 `v5check.py --only <幕前缀>` 逐幕过；全库基线只记录、不列
入门禁，见 `wave5_item4_v5check_baseline.json`。

## 5. 第 5 项：SOP.md / CHANGELOG.md 里 r2check 验收行改写 ✅（`d0a53a3`）

- SOP.md：§5 的 R2/R4 两验收行改写为 v5check.py + 现行五步验证管线
  （① build 打包 ② grep 打包产物 ③ 探针时长 durcheck ④ wbtextcheck
  ⑤ jscheck）；§14、§16 的两处打勾项与 §17 表第 12 行的 `r2check.py`
  改为 `v5check.py --only`（§16 注明：动词→专属动作的语义对应与朗读
  重叠仍按动作联络表人工看，不由脚本代劳）；§13 r2skip 行补注
  “r2check 已废止，v5check 暂未实现 r2skip，v5 场景目前 0 处使用该字段”。
- CHANGELOG.md：§0“朗读覆盖检查用法”块改写为五步管线 + v5check 用法
  与基线；2026-10-29 的全 App 基线与复算两行历史记录一字未动（不抹历史）。
- 每处都留了“r2check.py 已废止，见 docs/whiteboard/src/r2check.RETIRED.md”
  的历史注记。SOP/CHANGELOG 其余历史章节里的 r2check 出现（如 P1–P4
  推广记录）是 2026-10-29 的 dated 历史，未动；MASTER_DESIGN.md /
  DESIGN_HANDOFF.md / HANDOFF.md 里的 r2check 引用本次未动（任务只定
  两处文档）。
- 验证：grep 两文档，SOP 剩余 r2check 出现均为废止注记行；CHANGELOG
  §0 剩余出现为历史记录行 + 新注记行。

## 6. 第 6 项：build.mjs 加“lib 只做 node --check”分支 ✅（待补提交）

### 6.1 build.mjs 的 lib 分支

在读场景源码后、字体子集化之前加分支：去掉注释（字符串感知，如
cmp_lib.js 首行注释就写着“无 export default”，朴素正则会误判）后
找 `export default` 语句；没有则只跑 `node --check`，打印
`LIB-NODE-CHECK OK (no default export; node --check only, not bundled)`
后退出 0，不跑字体子集化、不写 out。语法错则 node --check 非零退出
（反面验证：无 default export 且语法错的 /tmp 文件 → exit 1）。

### 6.2 扫测脚本：`docs/whiteboard/v5/sweep_scenes.py`

第四波是临时 xargs 扫测，口径只留在底稿里；本脚本把扫测固定下来
（8 并行，`--only` 可单跑前缀，`--keep-out` 可留产物抽查）：
每幕调 build.mjs，exit 0 + LIB-NODE-CHECK 行 → lib；exit 0 → bundled；
非零 → FAIL。lib 集合与预期不一致时整体 FAIL——防止某幕丢了
export default 被误算成 lib。

### 6.3 全量扫测结果（2026-11-09）

| 口径 | 数字 |
|---|---|
| 扫测文件 | **967**（scenes/*.js 全部） |
| bundled | **957** |
| lib node --check | **10**（cmp_lib、fb39_lib、g14_lib、fr_lib、hd_poly_g4_157_v2、wordcard_items + auto、adj_train、oral、poly） |
| FAIL | **0** |

与第四波口径的对账：第四波 965 文件 = 959 bundled + 6 lib；
本波 967 = 961 + 6（+2 vv_give_on 幕）→ 再 −4/+4：4 个引擎模块
（auto/adj_train/oral/poly）从 bundled 桶挪到 lib 桶。挪桶的原因是
实测发现：这 4 个模块以前被计为 bundled，只是因为 build.mjs 的
shared 插件把对它们自身的 stdin import 解析成了共享命名空间桩、
空打也通过——那个“通过”是空洞的；它们和 6 个 lib 一样没有
export default、一样是被别的幕 import 的共享代码，故与 lib 同口径。
其代码随 engine.js 打进每一幕的产物，不存在覆盖丢失；每一幕真实
场景（957）仍逐幕打包通过。

### 6.4 扫测中发现的真问题：/tmp 写满（已修）

首轮全量扫测中途死掉、无报错，查因是 /tmp（512M tmpfs）写满
（ENOSPC）：build.mjs 每幕在 /tmp 留一份子集化 woff2（~600KB–1.2MB）
与字表 txt，从不删除；967 幕全量跑必写满。另扫测产物本身峰值约
1.1GB，也不能放 /tmp。修复（与本项同批提交）：
- build.mjs：子集化产物进内存（data URI）后立即删本次的临时文件
  （字表 txt + 两份 woff2）；字体缓存 /tmp/wb5_fontcache 保留
  （全量跑后 1.3M → 15M，是预期的共享缓存）。
- sweep_scenes.py：产物临时目录改放 `$HOME/wave5-sweep-tmp`（大盘），
  扫完删除。
修复后复核：单幕打包无 /tmp 残留；fp_ 27 幕 27/27 通过（修复前同批
27 FAIL 全是 ENOSPC）；全量 967 幕 0 FAIL。

## 7. 验证总表

| 验证 | 结果 |
|---|---|
| 第 2 项 node --check + build.mjs 打包 + 解码 grep 产物 | 通过（§2） |
| 第 3 项 47 包 FR 键核对 + 5 幕打包出帧 + 探针 5 幕 | 通过（§3.3） |
| 第 4 项 v5check --only 抽查（vv_give_back_1 FAIL 1 项为真缺口；poly 样幕通过）+ 全库基线 | 通过（§4.3） |
| 第 5 项 grep 两文档剩余 r2check 行 | 通过（§5） |
| 第 6 项 6 lib 分支 + 坏语法反面验证 + 全量扫测 | 通过（§6.3：967 = 957 bundled + 10 lib + 0 FAIL，两遍一致） |
| check_all.py | **26/26，“结论：全部通过”** |
| jscheck.py（主文件路径参数） | node --check OK（41 inline 脚本）；anchorcheck FAIL 116 项，与基线一致 |
| gen_wb13_scenes/units --check-only | 通过（50/50 格；页签 234） |

## 8. 未核实项

- 真机未核实：重建 47 包的人物帧在真机上的实际画面（打包产物含帧、
  探针读到时长，但未在真机看帧是否画对位置/比例）；stub 幕同前。
- v5check 的朗读覆盖是静态 token 比对，未在真机听语音（与此前各波一致）。
- 全量扫测依赖 /tmp/wb5_fontcache；全新机器首次扫测会逐幕跑 pyftsubset，耗时更长，未实测。

## 9. 新发现的待定夺（均未擅自做）

1. v5check 基线 782 项 FAIL / 596 幕是否立项补（R2-W1 572 + R4-F2 210）：
   补朗读/动作登记是内容工作，需逐幕定；另 'vs'、'adj' 成分标签、
   etymonline/wiktionary 出处名这类“板上有字但不应读”的词，是否要
   一个 v5 版 r2skip 豁免机制（v5 场景目前 0 处用 r2skip，v5check 暂未实现）。
2. ACTS 为空的 107 幕（WARN）：其中多少幕本应有动作、多少幕确实无动作，
   需内容方逐幕判断（无动词词表，脚本定不了）。
3. 427 个仍为 stub 的精灵包是否继续重建（cast/ 帧库只覆盖高频 47 包的
   帧；其余包的帧映射与美术素材缺口未盘点）。
4. R2-P1 的 161 项先读词提醒（如 give vs gave）是否要统一口径（先读词
   用原形、句里用过去式，是否接受）。
5. SOP/CHANGELOG 之外的 MASTER_DESIGN.md / DESIGN_HANDOFF.md / HANDOFF.md
   里的 r2check 引用是否也改写（本次任务只定两处文档，未动）。
6. v5check 全库基线是否将来进 check_all（现 596 幕 FAIL，进则立刻变红；
   待内容缺口收敛后再议）。

## 10. 工作底稿（`docs/work-2026-11-09/`）

- 本总底稿 `wave5_wb.md`；`rebuild_highfreq_sprites.py` +
  `wave5_item3_highfreq_sprites.json`（第 3 项）；
  `wave5_item4_v5check_baseline.json`（第 4 项基线）；
  另第 6 项扫测脚本 `docs/whiteboard/v5/sweep_scenes.py`。
