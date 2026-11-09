# 第二波白板场景工作底稿（TODO 1.3 定夺 1/2/3 + 超长幕拆分）

> 日期：2026-11-09 · 执行：白板场景第二波实施员 · 仓库 master（起始 HEAD 93ea75e）
> 范围：只做 3(a)(b)(c) 与第 4 项；未碰主文件、未跑 embed_app.py、未碰 TODO 文档与数据文件。
> 提交：211fd2f（3a）、d62026c（3b）、681395a（第 4 项）；3(c) 未改代码（见 §3，下有卡点）。

## 0. 前后数字总表

| 项 | 改前 | 改后 |
|---|---|---|
| units.json 页签数 | 234 | 232（−2 give 下线；+10 个第 3 幕是 cases 数变化，页签数不变） |
| vv 场景文件（scenes/vv_*.js，不含 gen_stock） | 76 幕（32 格 ×2 + 12 核心义） | 82 幕（+10 个 ③ −4 个 give 下线；另 gen_stock 同删 4；一词多义 3 幕未动） |
| 核心义页签 placeholder | 12 处 | 0 |
| give down / give on 场景 | 各 2 幕（vv_ + gen_stock 各 2） | 0；checked_absent 记录保留 |
| 超 60 秒的 vv ② | 10 幕（60.9–89.0 秒） | 0（拆后 ② 22.7–53.0 秒、③ 42.8–56.3 秒） |
| 第一性原理推广 | — | 未做（样板与 v5.1 标准不符，见 §3） |

## 1. 第 3(a) 项：12 动词核心义页转正为单独 12 幕

定夺：一词一页，不并入各动词首格；去掉占位页标记。

占位标记落点（实查 4 处，wb13_phrasal.json 里无“占位”字样）：
- `docs/whiteboard/src/wb13/gen_wb13_scenes.py`：模块 docstring 第 5 条、core_scenes() docstring、src 注记行。
- `docs/whiteboard/src/wb13/gen_wb13_units.py`：docstring 第 2 条、注释、core 登记 dict 的 `placeholder` 字段、打印文案。
- `docs/whiteboard/v5/units.json`：12 个 `vv_*_core` 页签的 `placeholder` 字段。
- 12 个场景文件 `vv_*_core_1.js` 文件头注释第 2 行。

改动（最小改动，只去占位标记，不加新内容）：
- 生成器两处文案改为“单独 12 幕（2026-11-09 第二波定夺转正）”；units 生成器去掉 `placeholder` 字段。
- 用 import 方式调 `core_scenes()` 只重写 12 幕。重写前验证：poly 3 幕 + vv 抽查 6 幕（get over / go up / stand down 各 2）重生成与磁盘逐字节一致；重写后 diff 每幕仅文件头注释 1 行，内容（ITEMS/ACTS）一字未动。
- units.json：12 页签 `placeholder` 已清，页签总数仍 234（本项），格式 roundtrip 校验通过。

验证：12 幕 `node --check` 通过；`gen_wb13_scenes.py --check-only`（32 格 81 条例句逐字落场景，89 个场景文件——第 4 项改后口径）；`check_all.py` 24/24（见 §5）。

遗留（未擅自补）：12 核心义幕仍无朗读句（R2：板上英文词无例句朗读）。补例句须有核实来源，wb13 规格未给，不编造，待定夺。

提交：211fd2f `Content：1.3 核心义页转正 12 幕`（15 文件），已推送。

## 2. 第 3(b) 项：give down / give on 下线

定夺：两格查证不成立（checked_absent），不再给孩子放教错搭配的场景。

全仓 grep 确认的引用（live 路径 vs 历史/模型）：
- Live：场景文件 4 个（`vv_give_down_1/2.js`、`vv_give_on_1/2.js`）、units.json 2 个页签（含 `checked_absent: true` 标注）、生成器两处注释/代码。
- 同内容生成幕 4 个（`gen_stock_vv_give_down/on_1/2.js`，model/gen_scene.py 产物，无任何 live 引用，内容与 vv_ 幕相同）——一并删除。
- 精灵：`vvgivedown1/2.js`、`vvgiveon1/2.js` 本就不存在（场景 import 悬空），无残留。
- 主文件：`laws-prototype/mengxing-prototype-v1.html` 中 `vv_give_down` / `vv_give_on` / `give back` 出现 0 次——两幕从未嵌进主文件，下线后无任何儿童入口。

改动：
- 删 8 个场景文件（git rm）；units.json 删 `vv_give_down`、`vv_give_on` 两页签（234→232）。
- 生成器：gen_wb13_scenes.py 第 3 条口径 + main() 注释改“已下线”，删去断言里 `or phrasal in ('give down','give on')` 的例外；gen_wb13_units.py 第 6 步改“已下线”，删去写 `checked_absent` 的代码块（页签已不存在）。
- 保留：checked_absent 记录本身未动——`laws-prototype/model/phrasal_combos.json` 两条（give/down、give/on，含 checked_in 词典核查出处）与 `wb13_phrasal.json` 两格（status checked_absent，entries []）原样保留；`vv_give_core_1.js`“查过，没有的搭配：give down / give on”两行是该知识本身，保留。

删完验证：units.json / scenes/ / sprites/ / v5 脚本 / 两生成器中 `vv_give_down|vv_give_on` 残留 0（仅 gen_wb13_units.py docstring 一行下线说明文字）；`gen_wb13_scenes.py --check-only` 通过。

未动、需他人定夺的残留引用（历史记录与模型层，不改历史）：
- `wb13_phrasal.json` 两格的 `v5_scene: ["vv_give_down_1","vv_give_down_2"]` 与 `covered_by_vv: true` 仍指向已删场景——数据文件，另一同事在做，未碰，需数据方清空。
- 模型层：`docs/whiteboard/model/specs/stock_vv_give_down/on_1/2.yaml`（4 个 spec）仍在，gen_stock 删了、spec 未删，重跑模型管线会再生；需模型车道定夺是否删 spec。
- 历史文档（不改）：CHANGELOG、MASTER_DESIGN 决策 36、REDRAW_V5、CAST_V5、lab/audit36、lab/audit38、INVENTORY_VV_GIVE_DOWN/ON_EXPORT.md、model/factsheets、DUP_SENTENCES_REPORT、wb13_phrasal_coverage.md（22/24 行“已有场景”已过时）。

注意：`vv_give_down_1/2.js` 实际讲的是 give back（“give 没有常用的 down 搭配，这一格换成 give back”），give back 本身是成立的搭配；按本次定夺连同删除后，全 App 暂无 give back 场景。MASTER_DESIGN ①5 曾写“give down 格删，give back 独立”——如要保留 give back，需另立 `vv_give_back` 页签（不在本次定夺内，未做）。

提交：d62026c `Content：give down / give on 下线（查证不成立）`（11 文件，+9/−249），已推送。

## 3. 第 3(c) 项：fp_boundedness 样板 4 幕——核对后停手，未推广

定夺原文：样板认可推广，以样板为准；先按 v5.1 标准结构核对样板，不符不要盲推。

### 3.1 口径核对（与现状一致）

- 22 个 canonical + 1 个补充场景：units.json fp 六页签 cases 合计 22（economy 4、iconicity 4、boundedness 4、vectors 4、one_king 3、zoom_focus 3）；`fp_economy_p2_1.js` 场景文件存在、未进 units——口径与上一波底稿一致。
- 样板 = `fp_boundedness_1..4.js`（决策 39 四步剧本）；另有三类同名变体不要混淆：`fp_boundedness_1_hd/_v2/_v3.js` 与 `gen_boundedness_1..4.js`（v3 试点，头注自述“与决策 39 样板的区别”）。

### 3.2 样板 4 幕逐项核对（v5.1 标准 = MASTER_DESIGN §2.9 / SOP §17）

样板 4 幕全部通过的是决策 39 门禁（`insightcheck.py --only` 各幕 ✅，0 不合格）：
- 每幕 C.aha 四项齐 + `// @step1_hook`…`// @step4_punchline` 四段标记齐；预测停顿各 2 个（≥3 秒）；`C.rule` 均在首个停顿结束之后；板上文字 13–17%（≤40%）；concept 动态 72–84%（≥60%）；静态字 8–21%（≤25%）；四段占比 11–12% / 41–44% / 20–28% / 17–24%（目标 15/45/25/15，偏差 ≤±10 个百分点）。

但样板与 v5.1 标准结构不符（逐项证据，4 幕一致）：

| # | v5.1 标准（§2.9 / SOP §17） | 样板实测 | 结论 |
|---|---|---|---|
| 1 | 结构：autoBuild ITEMS / ACTS（SOP §17 验收表第 12 条 actionWords 非空且语义对得上） | 4 幕 `autoBuild\|ITEMS\|CUES\|gsap\|drawFrame` 命中 0；用 wb5 `scene()` + concept.js + `fb39_lib` kit；`ACTS = {}`（void） | ✗ 不是 v5.1 结构，是决策 39（wb5+concept）结构 |
| 2 | 强调色只有一种橙 `#EF7226`（§2.9 A/H，多个强调色不做） | 4 幕均用 BLUE / GREEN / RED / OR 四色（如 _1：BLUE 3、GREEN 9、OR 5、RED 5） | ✗ |
| 3 | 一句一幕约 12 秒（§2.9 C）；第一性原理 35–55 秒（SOP §1）；wb13_fp.json 标称 45–50 秒 | 实测（打包+探针，2026-11-09）：_1 93.4、_2 105.3、_3 107.5、_4 94.8 秒，0 报错 | ✗ 约 2 倍于指引、8 倍于一句一幕 |
| 4 | 单文件 ≤650 KB（§2.9 F） | 打包后每幕约 1.12 MB | ✗ |
| 5 | 文件结构：每幕 scene/player/build/shots + keyframes 联络表（§2.9 G）；朗读点写 CUES（§2.9 E） | 无 CUES、无 shots 联络表；朗读走 kit 的 narr/say | ✗ |
| 6 | 关键姿势帧：每动词 3 帧、走路按距离换帧（§2.9 B） | 无关键帧动作（emoji + concept 组件）；精灵 `sprites/fb39_1..4.js` 本地缺失，insightcheck 打包直接失败，须按 rebuild_all.py 规则补空 stub 才能打包 | ✗（且样板在干净检出下不可直接打包） |

另：仓库记录中样板状态仍是“待用户审片”（HANDOFF.md 决策 39 第 ③ 步：“已嵌入，待用户审片；④ 推广等审片意见再推”），未见审片通过记录；本次任务所称“认可”在仓库里无据。另有一支真正合 §2.9 的样板是 `fp_boundedness_1_hd.js`（全部手绘、单强调色，HANDOFF 记“已验收、未嵌 App，等用户看审片图”）——与决策 39 样板是两条不同路线，推广前须先定以哪支为准。

### 3.3 结论：未推广

- 未改任何 fp 场景、未改 units、不提交 3(c) 代码。卡点：样板符合的是决策 39 门禁，不符合任务所指的 v5.1 标准结构（上表 6 项）；且审片通过无仓库记录。
- 若推广，范围是其余 18 幕 canonical（17 幕 autoBuild：economy_2/3/4、iconicity_1–4、one_king_2/3/4、vectors_1–4、zoom_focus_2/3/4；+ fp_economy_1，决策 38 时代，仅 3 处决策 39 标记），每幕须重写为约 110–150 行手写 wb5+concept 场景（KNOW、啊哈卡、四步剧本、迁移 3 例、锚点预测），内容取 STORYBOARD.md / FIRST_PRINCIPLES_DB，不可现编——工作量约等于重做 4 幕样板的 4 倍以上，非一轮可完成；另须先定夺：以决策 39 样板为准还是以 _hd（§2.9 手绘）为准，以及样板超长（93–108 秒）是否接受。

## 4. 第 4 项：10 个超长综合幕拆 ② 为 ②+③，不缩内容

清单来源：任务称“whiteboard_1.3_note.md §3”有 10 幕清单——实查该文件 §3 无此清单。清单改为实测确定：探针（Playwright，读打包 `out/*.html` 的 `window.__dur`，0 报错）测 32 幕新 ②，恰好 10 幕超 60 秒，与任务所举“get over ② 89 秒”吻合（实测 89.0 秒）。其余 22 幕 ② 均 ≤60 秒（最高 stand_up ② 58.2 秒），不拆。

拆分做法（生成器 `gen_wb13_scenes.py`：新增 `SPLIT_3` 名单 + `vv_scenes()` 分支）：
- ② 留：次义（n/w/w/s）+ 动词/小品词拆解（m 动词、m 小品词、w 动词核心义、m +）。
- ③ 得：开场（n“全格回顾”/ w“③”）+ 全格义项回顾（每义项 w 例句 + m 释义）+ 共同点 + 重读①句。
- 内容零丢失验证：10 幕逐幕 `新_2 ITEMS + 新_3 ITEMS[2:] == 旧_2 ITEMS`（以 git HEAD 原始 _2 为准）；其余 22 格 _2 与全部 _1 重生成与磁盘逐字节一致；poly 3 + core 12 亦一致。
- units.json：10 页签各加 case `3`（标题 `🎬 万能动词 · {combo} ③`，acts {}）；页签总数不变。
- 精灵：10 个 ③ stub（`vv<动词><小品词>3.js`，与现有 stub 逐字节同款空 FR/FI）——本地构建产物，不入库（rebuild_all.py 会按 ACTS 为空自动重建，见 sprites/.gitignore）；out/ 打包同理不入库。

时长（探针实测，SOP §1 实验室 40–60 秒指引）：

| 组合 | 拆前 ② | 拆后 ② | 拆后 ③ |
|---|---|---|---|
| get over | 89.0 | 53.0 | 48.0 |
| go down | 75.9 | 38.8 | 49.1 |
| go on | 68.7 | 22.9 | 56.3 |
| go off | 68.4 | 23.3 | 55.6 |
| go up | 66.0 | 26.0 | 50.5 |
| go out | 63.8 | 22.7 | 51.7 |
| go over | 62.4 | 26.0 | 46.9 |
| turn over | 62.3 | 29.6 | 44.8 |
| play up | 61.1 | 27.4 | 44.2 |
| play out | 60.9 | 28.6 | 42.8 |

再平衡说明：首版拆分后 get over ③ 72.5 秒、go down ③ 62.3 秒仍超——② 余量大（27.0 / 25.6 秒），把前 3 / 2 对义项回顾留在 ②（生成器 `SPLIT_3_MOVE = {'get over': 3, 'go down': 2}`），③ 开场改称“义项回顾（续）”，内容一字不减；再测 4 幕全部 ≤60 秒（上表）。其余 8 对首版即全部通过，未动。

验证：20 幕 `node --check` 通过；`gen_wb13_scenes.py --check-only`（32 格 81 条例句逐字落场景，场景文件 89 个）；20 幕打包（`node v5/build.mjs`，字体 `~/workspace/wbfonts`，pyftsubset 在该目录 bin/ 下）+ 探针 0 报错、20/20 幕 ≤60 秒；`check_all.py` 24/24（见 §5）。

提交：681395a `Content：10 格超长 ② 拆 ②+③（不缩内容）`（22 文件），已推送。

## 5. 验证总汇

- `node --check`：12 核心义幕、20 拆分幕通过。
- `gen_wb13_scenes.py --check-only`：通过（32 格 81 条词典例句逐字落场景；场景文件 89 个）。
- `gen_wb13_units.py`：未重跑（一次性生成器，基线断言 186 页签已过时）；仅 `py_compile` 通过 + units.json roundtrip 校验。
- `laws-prototype/tools/check_all.py`：24/24 通过（跑了两次：3(a)(b) 后与第 4 项后，结论均为“全部通过”）。
- 探针（Playwright + 本地 Chromium 缓存）：32 幕 ② 时长、20 幕拆分后时长、4 幕 fp 样板时长，全部 0 报错。
- 未做：主文件嵌入（下一轮同事的工作）；真机/真人审片（时长为探针读 `__dur`，非真机播放计时）。

## 6. 环境备注（供下一轮参考）

- 本机 Playwright Python 原未安装，`pip install --break-system-packages playwright` 后可用（Chromium 缓存 `~/.cache/ms-playwright/chromium-1248` 已有）。
- 打包字体不在默认 `/workspace/work/fonts`，在 `~/workspace/wbfonts`（`WB_FONTS` 环境变量 + `PATH` 加 `~/workspace/wbfonts/bin` 取 pyftsubset）。
- 工作区同时有并行同事的未提交改动（主文件、laws_master、expression.yaml、sync_lawdata.py、apply_wave2_item2_ne_dual.py），本次三提交均只加了自己的文件，未碰他人改动。

## 7. 3(b) 收尾（总协调人补记，2026-11-09）

### 7.1 wb13_phrasal.json 覆盖标记同步（gen_wb13_data.py 重跑）
- 收尾核查发现 `wb13_phrasal.json` 的 `covered_by_vv`/`v5_scene` 是 `gen_wb13_data.py` 按磁盘上 `vv_*_?.js` 文件存在性算出的派生字段；3(b) 删场景后未重跑，give down/on 两格仍 `covered_by_vv: true`、指向已删文件（悬空指针）。
- 重跑后 give down/on 两格 `covered: false`、`v5_scene: []`；其余字段（entries/content_gap）一字未动，mindmap/poly-words 两输出逐字节一致。
- 附带发现：该文件自第一波 79 幕建成后从未重跑，一直是旧状态——`vv_scenes_cover_cells` 20、`missing_attested_cells` 32；重跑后恢复真实值：覆盖 50（全部 50 个 attested 格）、缺 attested 0、缺 absent 22。第一波遗留的陈旧口径本次一并纠正。

### 7.2 下线源头清理（防重生）
- `gen_scene.py`（`docs/whiteboard/model/gen_scene.py`）按 `model/specs/<scene>.yaml` 生成 `v5/scenes/<scene>.js` 并写出对应事实表；4 个 stock spec 仍在，重跑即再生已删的 gen_stock 场景。已删 4 个 spec（`stock_vv_give_down_1/2.yaml`、`stock_vv_give_on_1/2.yaml`）及 4 张对应事实表（生成物，随源头同删）。`gen_scene.py` 只接受显式 spec 路径、不遍历 specs/，无批量脚本引用；其余 7 个 `stock_vv_give_*` spec（in/off/out/up，均为成立搭配）原样保留。specs 总数 360→356。

### 7.3 下线带走的有效内容（留待定夺，不在本次定夺内）
- 被删的 8 幕实际讲的并非不存在的搭配，而是借格讲的成立搭配，内容现已无场景承载：
  - **give back（归还）**：give down 4 幕讲的内容。BACK = 回到原来的地方；例句 "Please give back my ruler after class."（下课后请把尺子还给我）、"Give the book back to the library."（把书还给图书馆）。小学常用搭配，全 App 现无 give back 场景；MASTER_DESIGN ①5 曾写“give back 独立”——如要保留须另立 `vv_give_back` 场景。
  - **give on (onto)（门窗）朝向/通向**：give on 4 幕讲的内容。ON = 正对着、通到那一面；例句 "The window gives on the green park."（这扇窗户朝向绿色的公园）、"The back door gives onto the garden."（后门通向花园）。属正式/书面用法，小学阶段是否值得单独立幕待定。
- 上述两段内容原文已从被删事实表照录于此；事实表原件已随源头删除，git 历史（d62026c 之前）可查。
