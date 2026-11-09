# 白板课 5 类主题立项 · 交付说明（TODO 1.3）

> 日期：2026-11-09 · 执行：白板课开发员（TODO 1.3）· 仓库 master HEAD e97aaec
> 立项总目录：`docs/whiteboard/src/wb13/`（总索引见该目录 `wb13_index.md`）

## 1. 五类各做了多少页

| # | 主题 | 立项页数 | 新建内容 | 承接已有 v5 场景 |
|---|---|---|---|---|
| 1 | 一词多义：V-16/V-41/V-42 规律页 | **3 页** | 3 幕完整分镜规格（`hd_poly_law_v16/v41/v42`，beats/say/actionWords/terms_gap/sources 全齐） | 逐词白板 17 词 51 幕已存在（hd_poly），本次只做现状登记，未新立逐词幕 |
| 2 | 短语动词 | **84 页** | 84 页内容包：72 格 entries 全文照录 + 12 动词核心义页；其中 **32 格待新建场景**（有引证、无 vv_ 场景） | 20 格已有 vv_ 场景（72 幕）；phrasal_key 2 幕 |
| 3 | 中英对照 | **11 页** | 0 个新场景；11 页分镜规格化 + 逐幕核对（s-items/n-items） | 11 幕全部已有（ze_*_1.js），ZE_READY 已登记 |
| 4 | 思维导图 | **25 页** | 形态定义定稿（讲解幕 + 下方交互导图）+ 25 页分组表 | 25 幕全部已有（hd_mindmap_1–25） |
| 5 | 第一性原理 | **24 幕** | 0 个新场景；24 幕分镜规格化（标题/时长/术语/口诀/现状） | 23 幕已有；2 幕已迁中英对照（不重复建） |
| **合计** | | **147 页** | **3 幕 + 32 格新建** | 其余均已存在 |

84 页口径：84 = 12 动词 × 6 小品词 = 72 格 + 12 动词核心义页（`phrasal_combos.json` meta.grid）。

## 2. 新建/修改了哪些 src 文件

只在 `docs/whiteboard/src/wb13/` 下新建 11 个文件；**未改主文件，未动 `docs/whiteboard/src/` 其他文件，未新建 v5 场景**。

| 文件 | 对应主题 | 页数 |
|---|---|---|
| `wb13/gen_wb13_data.py` | 生成器（短语/导图/逐词三份 JSON 的数据直通脚本，可重跑复核） | — |
| `wb13/wb13_poly_laws.json` | 1 一词多义规律页 | 3 页 |
| `wb13/wb13_poly_laws_storyboard.md` | 1 一词多义规律页（文字分镜） | 3 页 |
| `wb13/wb13_poly_words.json` | 1 一词多义逐词白板现状 | 17 词（现状） |
| `wb13/wb13_phrasal.json` | 2 短语动词 | 84 页 |
| `wb13/wb13_phrasal_coverage.md` | 2 短语动词（覆盖对照表） | 84 页 |
| `wb13/wb13_mindmap.json` | 4 思维导图 | 25 页 |
| `wb13/wb13_mindmap_form.md` | 4 思维导图（形态定义 + 分组表） | 25 页 |
| `wb13/wb13_ze.json` | 3 中英对照 | 11 页 |
| `wb13/wb13_fp.json` | 5 第一性原理 | 24 幕 |
| `wb13/wb13_index.md` | 总索引 + 缺材料标缺总表 | 147 页 |

校验：6 份 JSON 均通过 `json.load`；短语 84 = 72 格 + 12 动词页；导图 25 页场景文件全部存在；中英对照 11 幕逐个计数 s-items 6–9、n-items 9–12；第一性原理 24 幕与 STORYBOARD.md 一致。

## 3. 集成时要跑的命令（⚠️ 重要更正）

**`docs/whiteboard/src/insert_wb.py` 不存在，跑不了。**旧 `cases/*.js` 白板已随决策 32 全部退役（`v5/retire_old_wb.py`），当前白板源是 `docs/whiteboard/v5/scenes/*.js`。集成走 v5 流程（命令均在仓库根目录执行，总协调统一做，本次未跑）：

```bash
# 0. 先读本立项规格（内容源）
#    docs/whiteboard/src/wb13/wb13_index.md

# 1. 新建场景：按规格写 v5 场景文件
#    - 一词多义 3 幕：docs/whiteboard/v5/scenes/hd_poly_law_v16_1.js、
#      hd_poly_law_v41_1.js、hd_poly_law_v42_1.js（模板参考 ze_be_1.js 的 autoBuild 写法）
#    - 短语动词 32 格：docs/whiteboard/v5/scenes/vv_<动词>_<小品词>_1.js / _2.js
#      （32 格清单见 wb13_phrasal_coverage.md「待新建场景」列；内容取 wb13_phrasal.json 各格 entries）
#    - 中英对照 / 思维导图 / 第一性原理：无新建场景，只验收已有场景
#    场景模板脚手架：python3 docs/whiteboard/v5/new_scene.py <页签> <序号>

# 2. 登记进 units.json（新页签/新幕），再打包 + 嵌入主文件
python3 docs/whiteboard/v5/do_unit.py docs/whiteboard/v5/units.json <页签>
#  或单幕嵌入：python3 docs/whiteboard/v5/embed_app.py <页签> <序号(0起)> <out.html>
#  改了共享引擎/字体后全量重建：python3 docs/whiteboard/v5/rebuild_all.py

# 3. 验收（按 SOP §5/§17）
python3 docs/whiteboard/src/jscheck.py
python3 docs/whiteboard/v5/app_check.py <页签> <状态字段> <幕数>   # 例：hd_poly_law / vv 组合
python3 docs/whiteboard/v5/app_check2.py <fp|wo|ze> <幕 id> <幕数>  # 中英对照/第一性原理
python3 docs/whiteboard/v5/app_check6.py                              # 思维导图 25 幕
python3 docs/whiteboard/src/r2check.py <幕 id> --strict               # R2 朗读覆盖（如该脚本仍在）
```

**集成前需总协调/ Priya 定夺的三件事**（本立项不定）：
1. 短语动词 12 动词核心义页的白板形态（并入各动词首格，还是单独 12 幕）。
2. `give down`、`give on` 两格：phrasal_combos.json 标 checked_absent（查证不成立），但已有 vv_ 场景——保留还是下线。
3. 第一性原理其余幕是否按决策 39（fp_boundedness 样板）推广重做——样板正在等用户审片。

## 4. 缺材料标缺的部分（共 9 项，不凑）

| # | 缺口 |
|---|---|
| 缺-1 | V-42 两站例句缺：laws_master 只有 *Hold my hand.* 与 *The hall holds 500 people.*；「控制住」「举行（hold a meeting）」例句须从词典/教材核实后补，不得现编。 |
| 缺-2 | 三规律术语小词典待补：V-16（中心义/原型、隐喻、转喻）、V-41（同形异义、zeugma 轭式测试、义项切分）、V-42（概念隐喻、转喻）的 kid 版定义，laws_master 未给。 |
| 缺-3 | 短语动词 20 格无内容：checked_absent 且无场景、无引证，经查证不是成立的短语动词，不编。 |
| 缺-4 | 短语动词 12 动词核心义页缺形态（见 §3 定夺 1）。 |
| 缺-5 | 一词多义逐词白板 253 词缺：词库 has_polysemy=true 共 270 词，仅 17 词有 hd_poly 逐词白板；其余 253 词义项数据须先核对。 |
| 缺-6 | ze_pronoun 📜 出处未登记：古英语名词变格出处须先登记进 zh_en_hub/SOURCES.md 才可标 📜。 |
| 缺-7 | 动作专属登记待核对：旧动作库 wb_verbs.js 已随旧引擎退役；turn on、see、hold 等动作词须在 v5 cast 关键帧体系登记后才有专属动作 id，本立项只列词、不编造 id。 |
| 缺-8 | 思维导图 R37-06 搭配框错：25 幕的「常用搭配动词 / 评价形容词」框取主题第一个词的 collocations，内容不对，待重做导图时去掉。 |
| 缺-9 | 第一性原理推广待审片：fp_boundedness 决策 39 重做 4 幕已嵌入、待用户审片；认可后才推广。 |

另：V-41 actionWords 为空是有意的（例句无动作动词，按 SOP §17 决策 38 第 16 条规则类课不强制动词动作），验收时注明原因，不得硬凑。

## 5. TODO 1.3 三处表述已过时（以仓库现状为准）

1. 「改 src 后跑 insert_wb.py」——insert_wb.py 不存在，旧 cases 白板已退役；当前集成走 v5（见 §3）。
2. 「中英对照 11 页：新 App 未设位」——已设位，11 幕均有 v5 场景且 ZE_READY 已登记。
3. 「思维导图 25 页：新 App 暂无该形态」「第一性原理：白板在白板研发线」——hd_mindmap 25 幕与 fp_* 23 幕均已存在并嵌入。
