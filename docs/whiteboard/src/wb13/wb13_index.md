# 白板课 5 类主题立项 · 总索引（TODO 1.3）

> 立项目录：`docs/whiteboard/src/wb13/`。全部内容只用仓库已有事实源（规律总表、短语组合、词库、分组表、DESIGN/STORYBOARD 文档）或已登记出处的材料；缺材料处如实标缺、不凑。
> 交付说明与集成命令见 `docs/work-2026-11-09/whiteboard_1.3_note.md`。

## 1. 五类页数总表

| # | 主题 | 立项页数 | 其中新建白板幕 | 其中承接已有 v5 场景 | 机器可读规格 | 文字分镜/形态 |
|---|---|---|---|---|---|---|
| 1 | 一词多义（V-16/V-41/V-42 规律页） | 3 页 | 3 幕（`hd_poly_law_v16/v41/v42`） | 0 | `wb13_poly_laws.json` | `wb13_poly_laws_storyboard.md` |
| 1 附 | 一词多义逐词白板（现状） | 17 词已有（51 幕） | 0（本次不新立逐词） | 17 词 · hd_poly 51 幕 | `wb13_poly_words.json` | 见本表 §3 缺口 |
| 2 | 短语动词 | 84 页 | 32 格待新建场景（另 12 动词核心义页待定形态，见 §3） | 20 格有 vv_ 场景；phrasal_key 2 幕 | `wb13_phrasal.json` | `wb13_phrasal_coverage.md` |
| 3 | 中英对照 | 11 页 | 0 | 11 幕（ze_*_1） | `wb13_ze.json` | `docs/whiteboard/zh_en_hub/DESIGN.md` §2–§3（原文） |
| 4 | 思维导图 | 25 页 | 0 | 25 幕（hd_mindmap_1–25） | `wb13_mindmap.json` | `wb13_mindmap_form.md` |
| 5 | 第一性原理 | 24 幕 | 0 | 23 幕；2 幕已迁中英对照（不重复建） | `wb13_fp.json` | `docs/whiteboard/first_principles/STORYBOARD.md`（原文） |
| **合计** | | **3 + 84 + 11 + 25 + 24 = 147 页** | **3 幕 + 32 格** | 其余均已存在 | | |

## 2. 文件清单（本目录）

| 文件 | 内容 |
|---|---|
| `gen_wb13_data.py` | 数据直通生成器：从 phrasal_combos.json / wordbank.json / mindmap_groups.json / v5 场景目录生成以下三份 JSON（可重跑复核） |
| `wb13_poly_laws.json` | 一词多义 3 页完整分镜规格（beats/say/actionWords/terms_gap/sources） |
| `wb13_poly_laws_storyboard.md` | 一词多义 3 页文字分镜 |
| `wb13_poly_words.json` | 一词多义逐词白板现状：17 词（词、义、场景）+ 缺口 253 词 |
| `wb13_phrasal.json` | 短语动词 84 页：72 格（entries 全文照录）+ 12 动词核心义页 |
| `wb13_phrasal_coverage.md` | 短语动词 84 页覆盖对照表 |
| `wb13_mindmap.json` | 思维导图 25 页分组表（子主题/分支组/词 id） |
| `wb13_mindmap_form.md` | 思维导图形态定义 + 25 页分组表 |
| `wb13_ze.json` | 中英对照 11 页规格（章/要点/来源/现状核对） |
| `wb13_fp.json` | 第一性原理 24 幕规格（标题/时长/术语/口诀/现状核对） |
| `wb13_index.md` | 本文件 |

## 3. 缺材料标缺总表（不凑）

| # | 缺口 | 详情 |
|---|---|---|
| 缺-1 | V-42 两站例句缺 | laws_master 只有 *Hold my hand.* 与 *The hall holds 500 people.*；「控制住」「举行（hold a meeting）」两站例句须从词典/教材核实后补，不得现编。 |
| 缺-2 | 三规律术语小词典待补 | V-16（中心义/原型、隐喻、转喻）、V-41（同形异义、zeugma 轭式测试、义项切分）、V-42（概念隐喻、转喻）的 kid 版术语定义，laws_master 未给，集成时从 claim/mechanism 摘写。 |
| 缺-3 | 短语动词 20 格无内容 | phrasal_combos.json 中 checked_absent 22 格，其中 20 格无场景也无引证：经查证不是成立的短语动词，不编内容；另 2 格（见 coverage 表）已有 vv_ 场景，属历史遗留，集成时定夺保留/下线。 |
| 缺-4 | 短语动词 12 动词核心义页缺形态 | 12 页核心义（词库原义已齐）以何种白板形态呈现未定：是并入各动词首格、还是单独 12 幕，需总协调/ Priya 定夺；本立项只给内容，不定形态。 |
| 缺-5 | 一词多义逐词白板 253 词缺 | 词库 has_polysemy=true 共 270 词，仅 17 词有 hd_poly 逐词白板；其余 253 词的义项数据须先核对（本立项只列现状，不编义项、不新立逐词幕）。 |
| 缺-6 | ze_pronoun 📜 出处未登记 | 古英语名词变格的出处须先登记进 zh_en_hub/SOURCES.md 才可标 📜；未登记前只能标 💡/❓。 |
| 缺-7 | 动作专属登记待核对 | 旧动作库 wb_verbs.js 已随旧引擎退役；V-16/V-42 的 turn on、see、hold 等动作词须在 v5 cast 关键帧体系里登记后才有专属动作 id，本立项只列词、不编造动作 id。 |
| 缺-8 | 思维导图 R37-06 搭配框错 | 导图 25 幕的「常用搭配动词 / 评价形容词」框取主题第一个词的 collocations，内容不对，待重做导图时去掉（HANDOFF §5 R37-06）。 |
| 缺-9 | 第一性原理推广待审片 | fp_boundedness 决策 39 重做 4 幕已嵌入、待用户审片；认可后才推广到其余原理幕，本立项不擅自重做。 |

## 4. 重要更正：TODO 1.3 的三处表述已过时

TODO 清单写于 2026-11-09，但白板研发线（v5.1，决策 32）在此之前已落地，以下三处以仓库现状为准：

1. **「白板源文件在 docs/whiteboard/src/，改 src 后跑 insert_wb.py」已过时**：`docs/whiteboard/src/insert_wb.py` 不存在，旧 `cases/*.js` 白板已随决策 32 全部退役（`v5/retire_old_wb.py`，HANDOFF §3）；当前白板源是 `docs/whiteboard/v5/scenes/*.js`，集成走 `v5/do_unit.py` / `v5/embed_app.py` + `v5/rebuild_all.py`。本次立项按任务约束只落在 `docs/whiteboard/src/wb13/`（内容规格 JSON/MD，可直接转 v5 场景），未新建 v5 场景、未改主文件、未跑任何插入脚本。
2. **「中英对照 11 页：新 App 未设位」已过时**：中英对照总枢已设位（principles_hub 下），11 幕均有 v5 场景（ze_*_1.js，逐个核对 s-items 6–9、n-items 9–12），ZE_READY 登记 11 幕。
3. **「思维导图 25 页：新 App 暂无该形态」「第一性原理：白板在白板研发线」已过时**：hd_mindmap 25 幕与 fp_* 23 幕均已存在并嵌入；形态见 `wb13_mindmap_form.md` §1 与 `first_principles/STORYBOARD.md`。
