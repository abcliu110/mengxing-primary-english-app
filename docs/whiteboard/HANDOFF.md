# 交接文档（HANDOFF）· 白板动画与新模块

> 更新：2026-10-31 18:33 JST（决策 38 36-② 手工长幕时间窗分节：tense_matrix① 4 节、past_clans① 3 节、adj_order① 3 节（WIP，未嵌入））；2026-10-31 18:31 JST（决策 38 wb5 scene clip 时间窗分节（手工长幕用；WIP，未重建））；2026-10-31 18:26 JST（决策 38 联络表脚本 sheet38.py 入库；runall 进行中（WIP））；2026-10-31 18:21 JST（决策 38 durcheck 接入 runall（仅提示）；wo_port / wo_time / five_patterns / aux 分节重建嵌入（WIP））；2026-10-31 18:15 JST（决策 38 接手断点；ci.py 提交脚本移入仓库（WIP））；2026-10-31 18:13 JST（决策 38 app_check_parts 扩到多节（wo_port / aux① / five_patterns⑤）（WIP））；2026-10-31 18:09 JST（决策 38 36-② split_auto.py：11 个 auto 长幕按讲解段拆节（WIP，未嵌入））；2026-10-31 18:07 JST（决策 38 决策 38 进度块更新；durcheck.py；分节补丁 V2（多节）（WIP））；2026-10-31 18:06 JST（决策 38 分节补丁打进主 HTML（WIP）；app_check_parts 0 不合格，入 runall）；2026-10-31 18:05 JST（决策 38 主 HTML：poly.js 进共享引擎全量重建 + 第 10–15 幕嵌入 + hd_g05 / hd_g19 / wo_grimm 拆分幕（回归通过））；2026-10-31 18:01 JST（决策 38 分节回归脚本 app_check_parts.py（WIP））；2026-10-31 17:57 JST（决策 38 36-② hd_g07① 143 s → 63 s + 89 s（WIP，未嵌入））；2026-10-31 17:56 JST（决策 38 36-② fp_economy① 145 s → 76 s + 77 s（WIP，未嵌入））；2026-10-31 17:55 JST（决策 38 36-② 分节机制 + tense_matrix③ 144 s → 61 s + 85 s（WIP，未嵌入））；2026-10-31 17:54 JST（决策 38 全量重建（poly 并进引擎）+ 第 10–15 幕与拆分幕嵌入；单项回归过（WIP，主 HTML 待 runall））；2026-10-31 17:52 JST（决策 38 36-② 长幕拆分：wo_grimm 174 s → 3 节 65 / 56 / 65 s（WIP，未嵌入））；2026-10-31 17:50 JST（决策 38 36-② 长幕拆分：hd_g19 140 s → 68 s + 74 s（WIP，未嵌入））；2026-10-31 17:49 JST（决策 38 units.json 恢复原缩进（上一提交误整体重排））；2026-10-31 17:49 JST（决策 38 36-② 长幕拆分：hd_g05 148 s → 两幕（WIP，未嵌入））；2026-10-31 17:47 JST（决策 38 第 14 幕 wo_grimm 板上文字面积 43% → 17%）；2026-10-31 17:44 JST（决策 38 主 HTML：口语 144 幕 oral.js + 第 3–9 幕嵌入（17:19 全量重建）回归通过）；2026-10-31 17:42 JST（决策 38 第 15 幕联络表复查修残留（WIP））；2026-10-31 17:37 JST（决策 38 第 15 幕 fp_economy① 喉咙剖面重做（WIP，未嵌入））；2026-10-31 17:34 JST（决策 38 poly.js 并进共享引擎（WIP）；4 个 HD 单元 app_check4 通过）；2026-10-31 17:32 JST（决策 38 wbdupcheck 跳过无 ITEMS 的重做幕；交接断点）；2026-10-31 14:33 JST（决策 37 R37-02 自造象形词源）；2026-10-31 14:22 JST（决策 37 R37-12 过时文案与重复入口）；2026-10-31 14:14 JST（决策 37 R37-14 按钮对比度）；2026-10-31 13:48 JST（决策 37 R37-10 单词表分页）；2026-10-31 13:37 JST（决策 37 R37-09 手机顶栏一层吸顶）；2026-10-31 13:21 JST（决策 37 R37-04 语法 Markdown 反引号）；2026-10-31 13:14 JST（决策 37 R37-13 家长门按钮）；2026-10-31 13:11 JST（决策 37 R37-01 白板手机播放框）；2026-10-31 11:40 JST（决策 36 内容与动画审计修复写入 MASTER_DESIGN，排在决策 35 之后）；2026-10-31 12:10 JST（决策 35 A1 假音标 574 个重生成）；2026-10-31 11:15 JST（决策 35 业务缺陷修复 + 课本同步写入 MASTER_DESIGN，插到 §5 最前）；2026-10-31 11:00 JST（决策 29 O4 手机/平板适配）；2026-10-31 10:40 JST（思维导图分组修正：17 幕重建嵌入）；2026-10-31 10:05 JST（决策 33 ⑤ 单词表合一，决策 33 全部完成）；2026-10-31 09:48 JST（决策 33 ④ 总结表 / 歌谣 / 纠偏并入语法）；2026-10-31 09:38 JST（决策 33 ③ 方法论教室 / 闯关厅收编）；2026-10-31 09:25 JST（决策 33 ② 首页 5 入口）；2026-10-31 04:35 JST（决策 34-B 语法例句库）；2026-10-31 04:20 JST（决策 34-A 词缀实例全量）；2026-10-31 04:00 JST（重复内容合并第 4 步：units.json 名字 + 144 口语幕白板残文）；2026-10-31 03:45 JST（重复内容合并第 3 步：模块互链）；2026-10-31 03:30 JST（重复内容合并第 2 步：别名词条）；2026-10-31 03:10 JST（重复内容合并第 1 步：词卡占位）；2026-10-31 03:00 JST（决策 33 ① 我的学习 + 综合自测）；2026-10-31 02:45 JST（词源第 4 批：Etymonline 1347 / 1487，ETYM_DB 625、MORPH_DB 191；`fetch_etym.py` 加 CDX 回退；剩 140 词 Wayback 限流）；2026-10-31 02:05 JST（词源第 3 批：Etymonline 重抓到 1288 / 1487，ETYM_DB 603、MORPH_DB 182；剩 199 词抓取失败的以后再抓）；2026-10-31 01:05 JST（坏帧返工 ✅、旧 canvas 兜底退役 ✅、人物帧压画质用户叫停；词源 Etymonline 缓存随沙箱重置丢失，正在重抓，见 §5.2 1b）；2026-10-31 00:05 JST（COVERAGE 数字）；2026-10-31 00:02 JST（引擎块再次合并）；2026-10-30 23:45 JST（18 条规律章）；2026-10-30 23:28 JST（格林规则组 4 幕）；2026-10-30 23:22 JST（词源第 2 批）；23:15 JST（合并重复引擎块 + 字体缓存）；23:06 JST（O1 VOCAB_DB 拆分提交）；此前 23:10 JST（用户 22:13 授权完成全部，进度见 §5.2）；22:30 JST（主题思维导图讲解幕 ✅、第一性原理核查 ✅；词源系列待开工，分阶段计划见 §5.1 ⑥）；16:20 JST（删旧 SVG 兜底）；16:10 JST · 最新提交见 `git log -1`（本次：老白板 v5.1 全部替换完成 + 主文件瘦身 + 人物重叠修复）
> 设计稿：`DESIGN_MINDMAP_WORDCARD.md`（用户 2026-10-30 19:39「按照你的来」已确认）：普通单词卡通用模板 ✅；思维导图讲解幕待做。
> 接手先读：本文（现状 + 下一步）→ `MASTER_DESIGN.md`（总设计，§2.9 = v5.1 标准画法）→ `SOP.md`（§17 = v5.1 验收）。流水、历史决策、每幕验收数字都在 `CHANGELOG.md`（文末有本文 16:10 之前的完整快照）。
> 本文只写现状、做法、风险、下一步；做完一件事：流水追加到 CHANGELOG，本文只改现状。

## 0. 用户规矩（必须遵守）

- 中文沟通；直接提交推送 `master`，不新建分支；做完一组就提交推送 + 更新文档，中间不停、不等审片（用户 2026-10-30 14:25）。
- 流程：重画 → R1 零丢失 / 技术验收 → `embed_app.py` 替换进主 App → App 回归 → 提交推送 → 更新 `REDRAW_V5.md`、`CHANGELOG.md`、本文。
- **不提交无用文件**（用户 2026-10-30 15:34）：构建产物、可重建的生成物、截图、`node_modules`、环境文件一律不进仓库；提交前 `git status --short` 逐个核对。已忽略：`docs/whiteboard/v5/out/`、自动生成的角色包 `v5/sprites/*.js`（手工版 tm/pc/ao 保留）、`v5/sprites/src/`、`node_modules/`。
- 练习闭环（决策 14）、新模块、决策 29 软件优化：**用户 2026-10-30 22:13 已授权「完成全部，做一个功能就立即提交，写好交接文档」**，按 §5.2 顺序做；改写 git 历史 / 强推仍不做。
- **分阶段提交**（用户 2026-10-30 21:36）：不攒大提交。每个小阶段（清单 / 分组表 → 版式 → 每批幕嵌入 → App 回归 → 下一项…）单独 commit + push `master`，**每次都同步改本文（现状表、§5.1 进度、风险）和 `CHANGELOG.md` 流水**，任何时候中断，下一个人按 §5.1 接着做。

## 1. 现在做到哪

| 项 | 状态 | 提交 |
|---|---|---|
| 决策 32：老白板全部按 v5.1 重画并替换进 App——白板案例 89 幕 + 万能动词剧场 72 幕（共 161 幕） | ✅ 每幕 R1 缺 0、确定性、0 报错，App 回归通过 | `208901e` … `660a1d3` |
| 主文件瘦身：43.05 MB → **16.94 MB**（字体 / 引擎全 App 共用一份） | ✅ | `72c5323` |
| 用户反馈「人物会重合」：自动版面第一块板开场角色和动作角色叠在一起 | ✅ 已修，148 幕自动版面全部重建 | `72c5323` |
| App 内切到第二幕挂载失败（字体缓存后的竞态） | ✅ 已修 | `72c5323` |
| 删除旧 SVG 白板兜底（45 个 `wbmod-*` + 旧引擎），术语小词典改读 `WB_TERMS`，主文件 → **14.12 MB** | ✅ 逐字比对一致，回归通过 | 见 git log |
| 三大厅 HD 剧场 ① 构词法剧场（`vocab_formation` 的 `formationStageCanvas`）3 幕 → v5.1 白板，主文件 **14.50 MB** | ✅ R1 零丢失，App 回归通过 | 见 git log |
| 三大厅 HD 剧场 ② 框架语义 10 个剧场 25 个视角（`vocab_frames` 的 `frameSemanticsCanvas`）→ v5.1，一视角一幕，页签 `hd_fr01`–`hd_fr10` | ✅ R1 零丢失，App 回归通过 | 见 git log |
| 用户反馈「白板太快」：自动版面按阅读速度留时间（中文 5 字/秒、英文 2.2 词/秒，换板前停 1.5 秒），手工幕整体放慢 1.5 倍 | ✅ 全部重建，主文件 14.68 MB | 见 git log |
| docs 清理：删旧 SVG 源码/工具、构建产物、过时素材与报告（299 个文件） | ✅ | `8e38f05` |
| 仓库清理：`v5/out/` 174 个构建产物（约 63 MB）+ 152 个可重建角色包移出 git | ✅ | `72c5323` |
| 普通单词卡 1425 词 × 3 幕 → **一个通用 v5 模板**（`scenes/wordcard_tpl.js` + `wordcard_items.js`），开卡时注入词条现场排版；主文件只增约 7 KB | ✅ 逐词验收 `lab/WORDCARD_TPL_REPORT.md`：R1 缺 0、0 报错、4275/4275 确定；App 回归 55 词 0 不合格 | ac74705 |
| 主题思维导图讲解幕（25 幕，交互导图保留在下方）：分组表 `v5/mindmap_groups.json`、版式 `auto.js` `mindmapBuild`、页签 `hd_mindmap` | ✅ 25 幕 R1 缺 0、确定性、0 报错；`app_check6.py` 25/25（点词开卡 / 缩放 / 拖拽正常） | d5db815 … f25bb23 |
| 自动版面中英混排换行：英文整词不拆、句末标点不落行首（`auto.js`），全部 458 幕 + 模板重建，全量技术回归 0 不合格 | ✅ | ac74705 |
| 决策 33 菜单去重 ①–⑤：我的学习 + 综合自测；首页 5 入口；方法论 / 闯关厅收编；总结表 / 歌谣 / 纠偏并入语法；单词表合一（新结构见 MASTER_DESIGN §1） | ✅ 全部完成，逐段对比 `lab/MENU_D33_AUDIT.md` | ② 见 git log |
| 思维导图分组修正（用户 2026-10-31）：动物里不再单列「蔬菜」（→ 农场和菜园）、城市里「花草树木 / 随身物品 / 价钱」改名（公园里的花草树 / 出门带上 / 便宜和贵）、「这和那」1 词并入「我们、他们、这那」、1–2 词的「更多」组规则补进正式组（剩下的「更多」都 ≥3 词）、「怎样做：……地」→「做事的样子」、颜色与形状「窄厚低 / 巨大最大」→「尺寸大小」、钟表 1 词并入「数字 11–18 和钟表」；`gen_mindmap_groups.py` 支持同名规则合组、条件可写成列表（任一满足） | ✅ 17 幕（2 3 4 6 7 8 9 10 12 13 16 17 18 19 21 23 24）重生成、R1 缺 0、确定性、0 报错，`app_check6.py` 25/25 | 见 git log |
| 决策 37 手机端可用性与内容真实性（R37-01…14，`REQUIREMENTS.md`） | 01 ✅ · 13 ✅ · 04 ✅ · 09 ✅ · 10 ✅ · 14 ✅ · 12 ✅ · 02 ✅ | 见 git log |

不需替换（已在 REDRAW_V5 标注）：`fp_one_king` ①、`fp_zoom_focus` ①（已迁中英对照，只留跳转）；`wo_vowel_kit`（共用小工具）；`verb_demo`、`narrator_demo`（开发样板，App 未挂载）。`REDRAW_V5.md` 里剩下的 1 个 `⬜` 是图例行，不是待办。

## 2. v5 白板怎么工作（接手必看）

- **一幕 = 一个场景文件** `docs/whiteboard/v5/scenes/<页签>_<n>.js`。自动版面幕（148 幕）由 `gen_auto.py` 从旧案例清单生成，调用 `scenes/auto.js`；手工幕 tense_matrix ①–⑤、past_clans ①–④、adj_order ①–④（后者用 `adj_train.js`）。
- **角色**：人物帧库 `v5/sprites/cast/*.webp`（331 帧，进仓库，登记 `v5/CAST_V5.md`）；每幕的角色包 `sprites/<lib>.js` 由 `sprites/build_sprites.py <lib> 帧名…` 生成（不进仓库，`rebuild_all.py` 缺包时按场景 `ACTS` 自动重建，已抽查逐字节一致）。
- **打包** `node v5/build.mjs <scene.js> <out.html> "<标题>"`：输出 = 共享引擎脚本（`engine.js`：wb5 / auto / adj_train / 播放器 / 字体）+ 本幕场景脚本。字体按全 App 字表 `v5/font_chars.txt` 子集化成 woff2（文楷 343 KB、Kalam 14 KB）；新场景有新字时先跑 `python3 v5/gen_font_chars.py`，再全部重建，否则那一幕会多带一份字体。
- **嵌入** `python3 v5/embed_app.py <页签> <序号(0 起)> <out.html> …`：幂等。≥2 KB 的图片 / 字体 data URI 抽成共享块 `wb5blob-<hash>`，引擎整段存成 `gz:` 共享块，其余 HTML gzip+base64；App 运行时 `WB5_MOUNT_V3` 按需解压、同页缓存。无引用的旧共享块自动清掉。
- **一键全部重建**：改了 `wb5.js` / `auto.js` / `player.js` / `engine.js` / 字体后，`python3 docs/whiteboard/v5/rebuild_all.py`（约 10 分钟）。
- **新单元批量流水线**：`python3 v5/do_unit.py v5/units.json <页签>`（生成 → 打包 → `r1v5.py` R1 → 联络表 → embed → `log_done.py` → App 回归）；动作词 → 帧的映射写在 `units.json`。`batch.sh` 有任何一幕失败就不提交。
- **HD Canvas 剧场替换**（三大厅老剧场）：`python3 src/export_hd_inventory.py <单元>` 先导出旧内容清单 `lab/INVENTORY_HD_<单元>_EXPORT.md` → 写 `scenes/hd_<单元>_<n>.js` + `units.json` 登记 → `do_unit.py`（HD 单元没有清单会拒绝运行，回归用 `app_check4.py`）。App 内由 `embed_app.py` 的 `wb5HDHtml / wb5HDAct / wb5HDSwap` 接管：页面里旧 `<canvas id>` 被换成 v5 iframe，挂载表在 `embed_app.py` 的 HD hook（目前 `formationStageCanvas → hd_formation`）。新增 HD 单元 = 加一条 hook。
- **节奏**（2026-10-30 用户：白板太快）：`scenes/auto.js` 的 `readT()` 按小学生阅读速度给每段留时间（中文 5 字/秒、英文 2.2 词/秒），换板前 `HOLD` = 1.5 秒，中文字幕没读完不进下一句；手工幕（tense_matrix / past_clans / adj_order）用 `scene({ stretch: 1.5 })` 整体放慢（`wb5.js` 在 `K.done()` 里缩放时间轴和朗读提示）。用户嫌慢 / 嫌快就只调这两个数，再 `rebuild_all.py`。
- **框架语义挂载**：`wb5HDSwap(canvas, 页签, 幕)` 第三个参数给定时 = 由页面自己的视角按钮选幕，不另出分幕按钮（`hd_fr01`–`hd_fr10`，幕 = pIdx）。导出时 `HD_ACT=0` 固定剧场内动画幕；原 canvas 把核心事物名截到 16 字，清单里已换回全名（只增不减）。
- **验收 / 回归**：单幕 `python3 v5/shots.py <out.html> <png> <秒…>`（确定性、errors、sandbox）；App 内 `app_check.py <页签> <状态字段> <幕数>`（白板案例，如 `tense_matrix tenseIdx 5`、`adj_order adjExIdx 4`、`aux_transformer auxIdx 4`）、`app_check2.py <fp|wo|ze> <幕 id> <幕数>`、`app_check3.py vv_<动词>_<方向>`、`app_check4.py hd_<单元> "navigateTo(...)"`（HD 剧场，检查旧 canvas 已消失、每幕可播）。主脚本语法 + 锚点：`python3 src/jscheck.py`。
- **环境**（沙箱重置后）：pip 会装到用户目录，`install-deps` 写成 `sudo env PYTHONPATH=/home/sandbox/.local/lib/python3.12/site-packages python3 -m playwright install-deps chromium`；`pip install -q numpy pillow playwright fonttools brotli && python3 -m playwright install chromium && sudo python3 -m playwright install-deps chromium`；`cd docs/whiteboard/v5 && npm i`；字体放 `/workspace/work/fonts/wk.ttf`（LXGW WenKai v1.501）、`kalam.ttf`；git 身份丢了就 `git config user.name/user.email` 沿用上一次提交的作者。

- **主题思维导图讲解幕**：页签 `hd_mindmap`（幕号 = VOCAB_DB 子主题首次出现顺序），场景由 `v5/gen_mindmap.py` 从 VOCAB_DB + `mindmap_groups.json` 生成（勿手改场景，改规则 / 数据后重跑），版式 `auto.js` 的 `mindmapBuild`；App 里导图卡片上方的空舞台 `themeMindMapWb5` 由 `wb5HDSwap(…, "hd_mindmap", 幕号)` 换成 iframe，下方交互导图代码未动。回归 `python3 v5/app_check6.py [序号…]`。
- **通用模板幕**（普通单词卡）：App 里只存一幕 `wordcard_tpl`；`embed_app.py` 的 `wb5TplSwap / wb5TplAct`（标记 `WB5_EMBED_TPL`）把词条 JSON 通过 `fr.__wb5Inject` 注入 srcdoc（`WB5_MOUNT_V4`），模板里 `autoBuild` 现场排版。改 `wordcard_items.js` 后：重建模板 → `embed_app.py wordcard_tpl 0 out/wordcard_tpl.html` → `check_wordcard_tpl.py`（分 4 片 `--part k/4`，再 `--merge 4` 出报告）→ `app_check5.py`。
- **全量重建**：`rebuild_all.py`（两路并行；超时后 `--resume` 只补没重建的）→ `check_all_out.py --part k/2` 全量技术回归。`build.mjs` 的临时字体文件已按进程号区分（并行打包曾串字体）。

## 3. 体积现状（主文件 15.63 MB，2026-10-30 23:40；含本轮新模块 + VOCAB 拆分，共享引擎 1 份）

- 人物帧 WebP 共享块约 9.7 MB（366 帧，Q74，最高 520 px）——下一步可压：降到 Q60 / 最高 400 px 预计省 3–4 MB，需看画质。
- 各幕 gzip 后的场景数据约 3–4 MB；共享字体约 0.5 MB；引擎 1 份。
- 旧 SVG 白板模块和引擎已删除（2026-10-30 16:20，`v5/retire_old_wb.py`）；`src/insert_wb.py` 已停用。
- git 历史（`.git` 约 231 MB）里还留着以前提交的构建产物；要瘦历史只能改写历史 + 强推，未经用户同意不做。

## 4. 已知风险

- 共享引擎块已合并回 1 份（2026-10-31 00:02 JST，字表 3329 字，508 幕 + 模板全量重建），主文件 **15.77 MB**。以后再加用到新字的幕，照样「gen_font_chars → rebuild_all」。**沙箱重置后**：按 §2 环境一节重装依赖；`/tmp` 下的字体缓存、日志都会丢，`rebuild_all.py` 中途被重置时主文件可能处在半嵌入状态——直接重跑 `rebuild_all.py` 即可（embed 幂等）。

- ~~临时多两份共享引擎块~~ 已解决（2026-10-30 23:15 JST）：`gen_font_chars.py` + `rebuild_all.py` 全量重建 488 幕，共享引擎块回到 1 份，主文件 17.48 → 15.63 MB；播放器后台暂停（O7）随这次重建生效。`build.mjs` 加了字体子集缓存（`/tmp/wb5_fontcache`，按字体 + 字表哈希，输出逐字节不变），全量重建从约 1 小时降到约 8 分钟（主要耗时变成 embed）。

- 思维导图讲解幕：组合 emoji（👩‍🏫、1️⃣8️⃣ 等）在无头浏览器里拆成两个字显示，是沙箱字体问题，真机应正常——真机审片时留意；幕 9「语法功能与指代」词义很长，116 s（设计目标 60–90 s），内容未删；分组表为规则分组 + 自审，未经用户过目（§6）。

- `rebuild_all.py` 以前不会重建模板幕角色包 `sprites/wordtpl.js`（沙箱重置后整轮在最后一步失败），2026-10-30 已补（按 `wordcard_items.js` 的 ACT_FRAMES 重建）。

- **审片缺口**：161 幕 v5.1 只有样板和 tense_matrix 经用户看过，其余为截图自审；真机（尤其手机）上的加载速度、帧率、英文朗读同步未验证。
- 双人帧（如 `tug` 拔河、give in ②）本身就是一张图里两个人，属正常；若用户仍觉得重叠，需要重画那几张帧。
- cast 帧：`l_lift1/2`、`missw_give`、V29 已返工（2026-10-31）；`l_lift0` 右边缘杠铃片被原图裁到，未动。
- `embed_app.py` 插入新块必须锚在第一个 `<script type="text/plain" id="wb5html-` 前；主脚本注释里也有 `id="wbmod-<id>"` 字样，曾因锚错位置破坏主脚本（已修）。旧引擎删除时误删过通用函数 `stopActiveCanvasLoops`，已从 `2817e97` 主文件恢复后重新嵌入。
- **VOCAB_DB 已拆分（O1）**：主文件里 `const VOCAB_DB` 只剩轻字段，`senses / etymology / memory_tip / example_en …` 等 10 个重字段在 `<script type="application/json" id="VOCAB_HEAVY_JSON">`，词对象原型上的 getter 按需解析。离线工具取全量一律用 `node src/vocab_extract.js <主文件>`（或已改好的合并片段），**不要再直接 eval `const VOCAB_DB`**，否则拿不到重字段。
- 决策 33 ③：闯关厅「感叹句快刀手 / 考场捉虫」仍是手写题，没改成从语法题库出题（语法题库没有现成的四选一格式）；方法论教室「维度八 情景交际 8 大母题」原来就只有标题、内容空，未补。
- 补丁脚本靠字符串锚点改主文件：新补丁先 `assert s.count(锚点) == 1`，并登记进 `src/anchorcheck.py`。

## 5. 下一步（按顺序）

000. **决策 38 白板启发性重做（用户 2026-10-31 14:27「把启发性重做写成决策 38，从报告里列的 15 幕开始重做」，当前最高优先级）**：审计 `lab/audit38/INSIGHT_AUDIT.md`（508 幕 A 0 / B 147 / C 361），方案与 15 幕表在 `MASTER_DESIGN.md` 决策 38，需求 `REQUIREMENTS.md` R38。做法：先建 `v5/lib/concept.js` 概念原语 + `insightcheck.py` → 按表 1→15 逐幕重做（每幕先写啊哈卡，再分镜，再实现；一幕一提交）→ 每幕 390 px 联络表自检 → 15 幕做完交用户审片 → 推广。R37 正在做的那一项收尾提交后再切过来；R37-05（G01）/ 07（长幕）与 38 合并做。
   **进度**：<!--R38P-->基建 ✅（`v5/lib/concept.js` + `src/insightcheck.py` 入 runall）· **15 幕全部重做并嵌入 App（2026-10-31 18:05 JST 50bf076；分节 18:1x）**：1 wordcard_tpl ✅ · 2 hd_oral 144 幕 oral.js ✅ · 3 hd_g18 ✅ 102 s · 4 hd_g19 ✅（拆 2 幕 68 / 74 s）· 5 hd_g14 三幕 ✅ · 6 hd_g05 ✅（拆 2 幕 56 / 97 s）· 7 hd_g07 ✅（分 2 节 63 / 89 s，第 2 节 = 子页签 hd_g07_p2）· 8 hd_g37–39 ✅ · 9 hd_fr01 ✅ · 10 hd_poly 51 幕 ✅（poly.js 进共享引擎）· 11 hd_mindmap 25 幕 ✅ · 12 vv_take_out② ✅ 52 s · 13 tense_matrix③ ✅（分 2 节 61 / 85 s）· 14 wo_grimm ✅（拆 3 节 65 / 56 / 65 s：wo_grimm / wo_grimm_rows / wo_grimm_more）· 15 fp_economy① 喉咙剖面 ✅（分 2 节 76 / 77 s）。啊哈卡 `lab/audit38/aha/01–15`。**下一步：交用户审片（15 幕），用户认可后推广到其余 C 级幕**<!--/R38P-->
   <!--R38BP-->**断点（2026-10-31 18:33 JST）**：wb5.js clip + 10 个分节文件已提交，未全量重建、未嵌入；runall（旧引擎版主 HTML）仍在跑。下一步：runall 过 → 提交主 HTML → `cd v5 && python3 rebuild_all.py`（全量，引擎变了）→ durcheck --scan 全量 → app_check_parts 加 tense_matrix 0 / past_clans 0 / adj_order 0（NONE 改 tense_matrix 1）→ runall → 提交。<!--/R38BP-->
   **做法（接手照抄）**：场景 `import { concept } from '../lib/concept.js'`，`C.aha({see,guess,reveal,rule})` → 画面用 `C.chip / swap / move / drop / split / cover / axis / slot / pic / label / arrow` → 揭晓前 `C.predict(t,{q})`（≥3 s）→ 规则命名处 `C.rule(t)` → `export default … return C.finish()`。import 了 concept.js 的场景自动被 `insightcheck.py` 强制检查（啊哈卡四项、≥3 s 预测、规则晚于第一次预测、板上文字面积 ≤ 40%、0 报错）；没 import 的只报告。啊哈卡文档 `lab/audit38/aha/NN_<幕>.md`。联络表（390 px 宽、8 帧，不入库）：`python3 v5/sheet38.py <out.html> <png> [--times t1,t2,…]`（已入库）。
   **旧断点（已完成，详见 CHANGELOG 2026-10-31 16:51–18:05）**：口语 144 幕 oral.js 三阶段、第 3–15 幕嵌入均已完成并回归。长幕分节机制：`src/patch_wb5_parts.py`（第 2 节 = `<页签>_p2` 子页签同号幕，场景 `v5/scenes/<页签>_p2_<n>.js`，回归 `v5/app_check_parts.py`）；幕号不绑数据的页签（hd_g05 / hd_g19）直接加第 2 幕，单词身世拆成新幕卡（`src/patch_wo_grimm_split.py`）。
00. **决策 37 手机端可用性与内容真实性（用户 2026-10-31 12:58，优先级最高，先于下面所有项）**：需求 `REQUIREMENTS.md` R37-01…14，方案 `MASTER_DESIGN.md` 决策 37。顺序：01 播放框 → 13 家长门 → 04 反引号 → 09 顶栏 → 10 单词表分页 → 14 对比度 → 12 旧文案 → 02 自造词源 → 03 模板填充 → 08 片头卡 → 06 导图 → 11 方法论页 → 05 G01 重做 → 07 长幕拆分（并入 36-②）。每项一提交，`REQUIREMENTS.md` 状态列同步改。用户 12:59：「把交接文档和设计文档中没有做的任务全部做完，不要询问」——37 做完接着按本节 0 → 0b → 1… 顺序做完全部剩余项。 **进度**：<!--R37P-->01 ✅ · 13 ✅ · 04 ✅ · 09 ✅ · 10 ✅ · 14 ✅ · 12 ✅ · 02 ✅<!--/R37P-->（**14:27 用户改优先级：先做决策 38 的 15 幕样板，R37-03/08/06/11/05/07 暂停；05、07 并入 38。** R37-03 断点：只做了分析未改代码——词卡 collocations.adjs 有 881 词全是「a/the/my + 本词」模板，collocations.verbs 有 406 条「Let's learn and use "X" in a sentence!」、46 条「Morph form: X」占位；导图 25 幕的「常用搭配动词 / 评价形容词」框取的是该主题第一个词的 collocations（如「动物大世界」= The bird can fly.），应在 R37-06 重做导图时一起去掉。）
0. **决策 35 业务缺陷修复 + 课本同步（用户 2026-10-31 10:25，优先级最高，排在下面所有剩余项之前）**：条目、现状数字、目标、方案、验收全在 `MASTER_DESIGN.md` 决策 35；审计报告和清单拷在 `lab/audit35/`（`BIZ_AUDIT.md`、`kebiao2.json` 课标二级 505 词、`kebiao_missing.json` 缺 60、`pep_missing.json` 人教社区表缺词（只作参考）、`fake_phon.json` 假音标 566）。顺序与进度：
   - A 数据底座：A1 音标 ✅（574 个假音标 → CMUdict 重生成，与 Wiktionary 美式逐音素一致 383 个，多音 / 首选读音不常用的 59 个人工定；对照表 `lab/audit35/PHON_FIX.md`；`src/phon_gen.py` 生成、`src/patch_phon.py` 写入、`src/phoncheck.py` 入 runall；一词多义 kind / right / draw 9 幕横幅里的假音标同步改并重建。音标口径仍是美式，英美方案在 A7 定） → A2 补词 ✅ 课标二级 60 词 + Dolch 221 全覆盖（人教社区表缺词待教材核实，见 0c 道 1 进度） → A3 占位例句 ⬜ → A4 模板搭配 ⬜ → A5 课标标记与年级 ⬜ → A6 代词重复 ⬜ → A7 英美拼写 ⬜ → A8 可数性 ⬜
   - B 内容错误：B1 口语第 3 句 ⬜ → B2 语法硬伤 ✅（道 2，对照表 `lab/audit35/GRAMMAR_FIX.md`）→ B3 空章节与旧名 ⬜ → B4 词缀与造词 ⬜
   - C 补数据：C1 最小对立体 ⬜ C2 一词多义 ⬜ C3 口语少的场景 ⬜ C4 闯关题 ⬜ C5 语法测验 ⬜ C6 例句库 ⬜
   - D 原理补缺：D1 语序收敛 ⬜ D2 主谓一致 ⬜ D3 限定词 ⬜ D4 介词空间图 ⬜ D5 语用礼貌 ⬜ D6 音节划分 ⬜ D7 书写与标点 ⬜ D8 时间日期价钱 ⬜ D9 英美差异 ⬜
   - E 课本同步：人教 PEP ⬜ → 外研 ⬜ → 译林 ⬜
0a. **并行与断点规则（用户 2026-10-31 11:40，额度紧）**：并行最多 3 道；只有集成者改主 HTML、跑 runall、commit、push、改 HANDOFF / CHANGELOG；子道只在自己的目录落盘（仓库外 `/workspace/work/par/<道>/`，半成品也随时写盘，每道目录里放 `PROGRESS.md`：做到哪、下一步、产物清单）。任何一项验证通过立即集成、单独提交推送，不攒批。**每次 commit + push 之后立即给用户汇报一次**（一两句：提交号、完成了什么、下一步是什么；用户 2026-10-31 11:48）。三道：
   - 道 1 数据：35-A2 补词 → A3 占位例句 → A4 模板搭配 → A8 可数性 → A5 课标标签 / 年级 → A6 代词合并 → A7 英美拼写（产出 JSON + `src/patch_*.py`）。目录 `par/l1_data/`。进度：A1 ✅ 1d8366f，A2 起 ⬜。
   - 道 2 内容纠错：35-B1 口语第 3 句 → B2 语法硬伤 → B3 空章节与旧文案 → B4 词缀；36-①9 未标注简化里不涉及幕重建的文字。目录 `par/l2_fix/`。⬜
   - 道 3 白板：36-①1–①8、①10–①11 → ②长幕拆分（只改 / 新增 `v5/scenes/*.js`，按场景文件分，不与别的道重叠）。目录 `par/l3_wb/`。⬜
   - 之后：35-C / D / E 与 36-③④⑤。
0c. **多 agent 并行（用户 2026-10-31 12:18 / 12:25：「不要定时任务，立即开多 agent 一起做」）**：定时任务已全部取消，不再新建。协议 `/workspace/work/par/PROTOCOL.md`（沙箱内，不入库）：每道独立 clone `/workspace/work/par/<道>/repo`，只改自己范围；共享文件（主 HTML、units.json、font_chars.txt、runall.py、anchorcheck.py、本文、CHANGELOG）只在推送锁 `/workspace/work/par/push.lock`（mkdir 互斥）内改；rebase 冲突时取上游主 HTML 再重放本次幂等补丁 / embed；每次推送记 `/workspace/work/par/PUSHLOG.md`，每道进度 `/workspace/work/par/<道>/PROGRESS.md`。一道结束后协调者按 PROGRESS 派下一批。第一批（12:22 派出）：
   - 道 1 数据（l1_data）：35-A2 补词 → A3 → A4 → A8 → A5 → A6 → A7，之后 C2 义项数据。范围 VOCAB_DB / VOCAB_HEAVY_JSON、`src/kebiaocheck.py`、`src/datacheck.py`、`src/patch_vocab_*.py`、单词卡模板数据。<!--L1P-->**道 1 进度**：A2 ✅（第 1 批 f63d69e 课标二级缺词 60 个新词条；第 2 批 Dolch：221 个 Dolch 词全部在库——新建 9 词、11 个屈折 / 缩写形式建别名并到原形、was / were / better / best / worse / worst 并到 be / good / bad，WORD_ALIAS 51 → 68，202 个词条打 `dolch` 级别字段，`lab/audit35/A2_DOLCH.md`；`kebiaocheck.py` 课标二级 + Dolch 必须全覆盖；人教社区表缺词只作线索未补，见遗留）· A3 ⬜ → A4 ⬜ → A8 ⬜ → A5 ⬜ → A6 ⬜ → A7 ⬜<!--/L1P-->
   - 道 2 内容（l2_fix）：35-B1 → 36-①10 → B2 → B3 → B4 → C3 → C4 → C5 → C6 → 36-①9 纯文字项。范围 DAILY_EXPRESSIONS_DB、GRAMMAR_DB / 积木 / 测验 / 例句库、口语幕 `hd_oral_*`、闯关厅、单词身世文案。**道 2 进度**<!--L2P-->：B2 ✅（积木 C 表语、G05 / G15 / G22 / G28 / G32 / G35 等、重音规律、例句库；`grammarcheck.py` 入 runall）。**待道 3 / r38 重建**：GRAMMAR_DB 文字改了，`fix36_trunc.py` 补回的 hd_g 板文字（hd_g28 ② 等）需按新 GRAMMAR_DB 重跑；hd_g05_1、fp_economy_3（a/an 方向）、stress_rhythm_1/2、intonation_map_2（名前动后 / 100%）的板书见 GRAMMAR_FIX.md §6<!--/L2P-->
   - 道 3 白板（l3_wb）：36-①1–①8、①9 改幕部分、①11、①12 → ② 长幕拆分。范围：除 `hd_oral_*` 和新原理幕外的现有 `v5/scenes`、`auto.js` / `gen_auto.py` 等生成脚本。道 2 文字纠错波及的 hd_g 幕由道 3 重建。**道 3 进度**：①1 ✅ · ①2 ✅（G07 ②③ 与 G08 ② / G09 ③ 同板仍在白名单，要改 G07 → 留给道 r38 决策 38 第 7 幕）· ①3 ✅（r38 的 8 个语法样板幕在 `lab/audit36/wbtext_allow.json` 白名单）；下一步 ①4（fp_vectors；G14 归 r38）。
   - 道 4 原理（l4_new）：35-D1–D9 → 36-⑤2 新语法点。范围：新页签场景、`content/*.txt`、`src/patch_principle_*.py`、原理 hub 入口。
   - 道 5 课本 / 词源 / 7-8-9（l5_tb）：35-E 人教 PEP → 外研 → 译林；词源补抓 140 词；决策 7、8（家长指南）、9（欧洲文化 6 章 + 美国篇）+ 决策 10 入口。范围：新 screen `textbook`、`lab/textbook_*.json`、ETYM_DB / MORPH_DB、`word_origins/`、新页签场景。
   - 第二批（待第一批交回后派）：36-③ 总结层、④ 加深最浅 10 页、⑤1 / ⑤3–⑤5、35-C1 / C2 幕。
   - 注：旧 `cases/*.js` 白板已被决策 32 v5.1 全部取代、`cases/` 目录已不在 master；沙箱旧 clone 里未推的 fp_boundedness 第 3 幕 v2（6b9cce6）作废不推，原「旧白板剩余幕 / FR01 / 语法 40 点 / 思维导图」各项在 §1、§5 第 2 项已完成。
0b. **决策 36 内容与动画审计修复（用户 2026-10-31 11:33 批准，排在决策 35 之后、下面「顺延」各项之前）**：全部条目在 `MASTER_DESIGN.md` 决策 36；审计全文与脚本在 `lab/audit36/`（`CONTENT_AUDIT.md`、`extract.py`、`snap.py`、`scene_items.json.gz`；88 张截图与 508 幕解包 HTML 在仓库外 `/workspace/work/audit2/`，不入库）。与决策 35 重叠的（时间日期价钱 D8、书写 D7、礼貌 D5、a/an 史 B2、口语第 3 轮 B1、模板搭配 A4、短语 A2、可数 A8/D3、介词 D4、语序 D1）合并做，不重复。顺序与进度：
   - ① 白板事实 / 画面错误：①1 能量吸收器串 12 点 ✅（`v5/fix36_mid.py`、对照表 `lab/audit36/R1_36_1_MIDBOARD.md`、`src/wbdupcheck.py` 入 runall；「操作词」总论 = 助动词照妖镜 ④ 末尾「⑥ 操作词总论」，原吸收器板一字不差移入；底层原理 hub 挂入口归道 4） ①2 串板 ✅（`v5/fix36_cross.py`，对照表 `lab/audit36/R1_36_2_CROSS.md`：G08 ①③、G09 ①②、G10 ①–③、G31 ①–③、G32 ③、G34 ①–③、G35 换成本课板，内容取自本课 GRAMMAR_DB；末句中文口诀 → 讲解字幕、字幕给译文；`GRAMMAR_FIXED_ACT` 只留 G07，G08–G10 照常三幕。剩 G07 ②③ 待道 r38） ①3 截断句 + `**` ✅（`v5/fix36_trunc.py`，对照表 `lab/audit36/R1_36_3_TRUNC.md`：44 幕 hd_g 截断句补回 GRAMMAR_DB 原句、按 。！？；】 语义拆行；剥 ** / 反引号；末句字幕口诀 → 译文、口诀进讲解字幕；新检查 `src/wbtextcheck.py` 入 runall；截断实际只在 hd_g（审计的 ~89 幕含口语 / 一词多义，归 r38）；G05/07/14/18/19/37–39 归 r38 白名单） ①4 G14 介词 + fp_vectors ⬜ ①5 万能动词伪搭配 ⬜ ①6 vv 画面不符 ⬜ ①7 hd_fr01 ⬜ ①8 格林定律 ⬜ ①9 未标注简化 / 镜头 / 朗读 ⬜ ①10 口语双角色 ⬜ ①11 单词卡模板 ⬜ ①12 中文讲解与动作 ⬜
   - ② 长幕拆分（wo_port、wo_grimm、wo_time_week、aux_transformer、tense_matrix①（删 a/an 插段）…；`durcheck.py`）⬜
   - ③ 总结层 ③1–③11 ⬜
   - ④ 加深最浅 10 页 ⬜
   - ⑤ 补内容 ⑤1–⑤5（字母书写、短语、读法；新语法点；口语新功能与会话策略；新题型；分级短文）⬜
   - 顺延到决策 35、36 之后：词源补抓 140 词（`fetch_etym.py` 工作区有未提交的旧版页面解析改动，到时先核对）→ 决策 7 → 决策 8（英美对照、大写标点已并入 D9 / D7）→ 决策 9。已完成：思维导图分组修正 2e4fe86、O4 手机 / 平板适配 cf6a9f6、O6 死代码（本提交，决策 35 下达前已改完验完）。

1. 词源补抓：第 4 批已入库（1347 / 1487）；剩 140 词以后再抓（Wayback 限流时整轮只补几个词，隔几小时再跑 §5.2 1b 命令即可）。
1b. 人物帧压画质：用户叫停，不做。
2. 三大厅 HD 剧场：构词法 ✅ → 框架语义 ✅ → 易混词 ✅ → 自然拼读 ✅ → 语法总结中心 ✅ → 语法 40 点 ✅（56 幕；三幕内容相同的合并为 1 幕）→ 日常用语 144 句 ✅（每句 1 幕放完整对话）→ 单词卡一词多义 17 词 ✅（51 幕）→ 普通单词卡通用模板 ✅（1425 词，功能词旧版本来就不播动画）→ 主题思维导图讲解幕 ✅（25 幕，见 §5.1）→ 第一性原理总枢余下旧 canvas ✅（已核查无残留，见 §5.1 ⑤）→ **词源 / 格林定律 / 词根词缀 + 12+6 条规律（逐条核实，分阶段计划见 §5.1 ⑥a–⑥g）**→ 文档收尾。
3. 等用户点头：练习闭环 + 总地图（决策 14）、决策 6 剩余三个新模块、决策 29 软件优化。
4. **菜单去重合并（MASTER_DESIGN 决策 33）**：用户 2026-10-31 02:32 确认先做 ①；**2026-10-31 09:10 用户确认 ②–⑤ 按原方案全部做完**（顺序 ② → ③ → ④ → ⑤，每步 runall --full）。✅ ② 首页 5 入口（2026-10-31 09:25）：`src/patch_menu_home.py`（块 MENU_HOME_V2）——首页「继续上次」之后只剩 5 张入口卡（我的学习 / 综合自测 / 总地图三个按钮移进第 5 张卡）；新 screen `principles_hub`（第一性原理 / 中英对照 / 三大隐喻 / 竹节句，方法论教室暂挂此处）、`practice_hub`（综合自测 / 我的学习 / 闯关游戏厅 / 总地图）；`LAB_GROUPS` 按 B 改成 6 组（单词·发音与拼读 / 构词与变形 / 词语关系、语法·时态 / 句型与写作、底层原理），单词大厅加「🧭 单词专项」区（含原首页元音变异、单词卡 X 光两个按钮 + 单词身世），语法分类页「动词与时态」「句型」末尾挂本类专项；`super_lab_hub` 保留为 13 个页签的内容页，面包屑 / 头部 / 页签条按所属分区，右上「↩ 回到 …」；总地图分区名跟着改。回归 `v5/app_check15.py` 入 runall；390px 截图 `/workspace/work/shots/d33_2_*.png`（不进仓库）。✅ ③ 方法论教室 / 闯关厅收编（2026-10-31 09:38）：`src/patch_menu_hubs.py`（块 MENU_HUBS_V3），逐段对比表 `lab/MENU_D33_AUDIT.md`。闯关厅 `v6_hub` 只剩「🎯 练习与档案 › 🎮 闯关游戏」（单词闪电战原 5 题后接 20 道 VOCAB_DB 出的题）；其余 7 页签搬家（同音词新 13 组 → 拼读同音词页签末尾、反义词新 24 对 → 词语的亲戚反义词页签末尾、12 景口语（9 组独有）→ 口语大厅、金剪刀 → G34、作文 6 篇 → 高分作文炼金炉、词源树 → 构词后缀页签、变形表 70 词 → 构词派生词族页签），旧 `navigateTo('v6_hub', { tab })` 重定向；挂载 `d33Mount()`（noteLastView 里调用，三个单词页渲染函数加包一层）。`method_hub` 不再是菜单：6 个页签单页显示、入口挂到底层原理 / 单词 / 语法句型 / 练习与档案，不带 tab 重定向到底层原理；「十五大王炸」15 张卡都是已有模块的摘要但文字不同，按「不同的保留」留作「📜 十五条规律速查」。12 景口语第 8 组「Did you anything else?」改为「Did you do anything else?」。截图 `/workspace/work/shots/d33_3_*.png`。✅ ④ 总结表 / 歌谣 / 纠偏并入语法（2026-10-31 09:48）：`src/patch_menu_grammar.py`（块 MENU_GRAMMAR_V4）——语法大厅撤总结横幅和歌谣 / 纠偏两张卡（换一行说明）；4 张总结表挂词法（代词矩阵）/ 句型（疑问词、How vs What、语序）类末尾，单表打开、面包屑回所属类；8 首歌谣、5 个纠偏神器、2 个微训练按 `D33_GRAMMAR_EXTRAS` 挂进语法点底部「🎵 歌谣 / 🛡️ 纠偏 / 🔨 微训练」页签（CH01→G16、CH02→G19、CH03→G14、CH04→G32、CH05→G20、CH06→G22、CH07→G07、CH08→G36；DG01→G19、DG02→G36、DG03→G23、DG04→G11、DG05→G14；动词还原→G23、介词投递→G14）；旧 grammar_chants → 对应语法点，纠偏神器页 → G19；`renderGrammarDetailView` 也包一层 noteLastView（上一点 / 下一点后例句库、页签跟着换）。截图 `/workspace/work/shots/d33_4_*.png`。✅ ⑤ 单词表合一（2026-10-31 10:05）：`src/patch_menu_words.py`（块 MENU_WORDS_V5）——新 screen `word_list`（主题 / 词性 / 🔴 不规则闪电词 / 年级 + 搜索），取代 vocab_theme 列表、vocab_sight 浏览、vocab_pos 三个列表页（旧入口重定向带上筛选；词性总纲、闪电词卡样式照搬）；闪电词只留 `sight_type = irregular`，闪认训练也只练不规则词；思维导图页保留（面包屑「📚 单词表 › X · 思维导图」）；4 对重叠子主题（数字与计量 + 数字与数量、色彩与空间方位 + 颜色与形状、个人特征与情绪 + 情感与性格、语法功能与指代 + 核心语法功能词——后一个都是 V6 扩展词库子主题，两组无共同词）在单词表合成一个筛选、导图页互加「🔗 另见」；VOCAB_DB 子主题和导图 25 幕不改。单词大厅两张大卡 + 单词的家 → 单词表 + 闪认训练。MASTER_DESIGN §1 已改写为新结构。截图 `/workspace/work/shots/d33_5_*.png`。✅ ① 已完成（2026-10-31 03:00）：`my_study`「📒 我的学习」+ `self_test`「🎯 综合自测」（`src/patch_my_study.py`，回归 `v5/app_check10.py` 已入 runall；旧 `vocab_my / grammar_my / oral_my` 重定向，localStorage 键与消错规则未动，首页「继续上次」一行加两个入口）。原 5 步：① 档案与自测合一 → ② 首页 5 入口、撤首页 13 张实验室卡 → ③ 方法论 `method_hub`、闯关厅 `v6_hub` 内容并入（先核 `method_hub`「十五大王炸」有无独有内容）→ ④ 四大总结矩阵并入语法各类末尾，歌谣 / 纠偏改为语法点页签 → ⑤ 主题 / 闪电词 / 词性三个列表合成一个可筛选单词表。旧 screen 名全部留重定向，localStorage 学习记录不动。与词卡去重、英美拼写 / 变形词合并显示、`units.json` 改名同步做；白板重复句只出清单。
5. **词缀实例与语法例句全量取（MASTER_DESIGN 决策 34，用户 2026-10-31 02:36 确认）**：词缀从 1487 词全量挂真派生词（Wiktionary / Etymonline 核实，排除假前缀，不设上限），更新 MORPH_DB / 构词页 / 词卡，列出词库无词的词缀；语法 40 点从词例句 + 日常用语 144 句 + 模块英文句按语法特征全量筛，肯定 / 否定 / 疑问、人称分组，人工抽查，每句可朗读，出每点数量表（<5 句单独标）。决策 33 ① 提交后再改主 HTML；词缀、语法各一提交，runall --full。
   - ✅ A 词缀（2026-10-31 04:20）：`src/build_affix_db.py` → `word_origins/AFFIX_WORDS.json` + `AFFIX_REVIEW.md`：80 个词缀里 **59 个**在词库有真派生词，共 **273 对 / 272 词**（-er 32、-y 23、-ly 26…，全表在报告里）；**21 个**单列「词库里没有真派生词」（auto- co- ex- fore- non- pre- tri- -ance -dom -ee -fold -ure -ward 等，有的只有历史拆分候选）。口径：Wiktionary 词源模板或 Etymonline 原句核实；现代透明可分才上 App（含 waiter / leader 这类整词借入但现代可拆的）；**待定 44 对**未上 App——历史拆分 ⚠️（but = be- + out、any、king 等）和屈折形式，要不要进词卡需用户定。`build_etym_db.py morph` 并入派生词：MORPH_DB 191 → **358**（已有条目不覆盖；gentleman / handwriting / health / myself / daddy 5 条与分析稿冲突的保留原记法）。构词页前缀 / 后缀页签末尾挂全部派生词、派生词族页签加按词根归组的词族（`src/patch_affix_vocab.py`，块 AFFIX_VOCAB_V1）；回归 `v5/app_check13.py` 入 runall。分析稿与扫描脚本在仓库外 /workspace/work/d34/。
   - ✅ B 语法例句（2026-10-31 04:35）：句池 2173 句（词库例句 1061、日常用语 525、GRAMMAR_DB 182、各模块约 400），spaCy + 规则按语法特征筛、抽查保留，再去掉含词库外实词的句子（as / than / so / not 这类功能词放过，词库本来没收功能词）→ 40 课共 **3809** 句，每课底部「📚 例句库」按肯定 / 否定 / 疑问 / 祈使 / 感叹筛、按主语人称分组、点句朗读。**没有少于 5 句的点**；少于 15 句：G17 13, G23 13, G37 5, G39 13（G37 as…as 句池里只有这些，建议补句）。数量表 `lab/GRAMMAR_EXAMPLES_REVIEW.md`，数据 `lab/GRAMMAR_EXAMPLES.json`（`src/build_grammar_examples.py` 生成，分析稿在仓库外 /workspace/work/d34/）；补丁 `src/patch_grammar_examples.py`（块 GRAMMAR_EX_V1）；回归 `v5/app_check14.py` 入 runall。**待用户定**：要不要把 the / a / be / can / will / now / great / nice / let 等常用词补进词库（严格「每个词都在词库」口径只有约 1/3 句子能过）；G05 / G08 收窄了范围（只收 an、名词性物主代词）；几百句的大点（G16 / G18 / G14 / G33 / G01 / G11）没逐句通读。
6. **App 内重复内容合并（用户 2026-10-31 02:22，调查草稿在仓库外 /workspace/work/dedup/，结论写进本条）**：每步一提交。
   - ✅ 第 1 步 词卡占位（2026-10-31 03:10）：V6 扩展词 499 个占位巧记（445 个「记忆锦囊：属于【X】高频核心词」+ 54 个「考场必考不规则/拼写变形词」）不再当 💡 巧记显示，改成主题标签 🏷️ X / 🔁 变形词标签；etymology 与 memory_tip 相同的 500 词只出一块；认读卡「拼读规律」后面不再接占位；V6_MORPH 变形词不按拼写查词源（saw / drove / felt 曾查到锯子 / 畜群 / 毛毡）。改在 `src/patch_etym_card.py`（`etymIsPlaceholderTip`）+ `src/patch_dedup_a.py`；`v5/app_check8.py` 加占位词抽查。**未改**：v5 单词卡模板 `wordcard_items.js` 的 box1（要重建模板，且占位句是否删涉及 R1 零丢失基线，需用户点头）；占位词的例句 / 构词字段同样是占位，需逐词补内容（另开任务）。
   - ✅ 第 2 步 重复词条（2026-10-31 03:30）：51 个 V6 空壳词条设别名并到主词条（48 个 V6_MORPH 变形词 → 原形；color → colour、gray → grey；its → it），别名从 VOCAB_DB 列表拿掉（词库显示 1436 条），旧 id / 按词形 / 小测 / 模块小测 / 学习记录都转主词条，主词条卡上显示「过去式：went 🔊」类标签；读档时旧记录并进主 id。课标单列的只合并显示不重定向：center ↔ centre（都是 G5 课标词，**以哪个为主待用户定**）、studies ↔ study、broken（原形 break 词库未收）。代词组 11 组：词组卡链接成员单词卡、单词卡链回词组卡（成员卡是空壳，不复制字段）。没原形的 6 个变形词 was / were / better / best / worse / worst 未动（词库无 be / good / bad）。补丁 `src/patch_dedup_b.py` + 数据 `src/dedup_b_data.json`，回归 `v5/app_check11.py` 入 runall。**注意**：课标没有独立词表文件，年级只能看 id 前缀（G1–G6 课标、V6 扩展）。离线工具（gen_module_quiz / gen_mindmap_groups）还在用含别名的全量词库，以后重生成小测 / 导图时要跳过 `WORD_ALIAS` 的 id。
   - ✅ 第 3 步 模块（2026-10-31 03:45）：代词 G07 / G08 / G09 / G10 与「代词全局原理」的三块「深度机制」演示板一字不差（30 段，同一套画了 5 遍）→ 主讲留代词全局原理三幕全播，G07 只播第 1 幕、G08 第 2 幕、G09 第 3 幕、G10 第 1 幕（`GRAMMAR_FIXED_ACT`，旧文字不删）。复数 3 模块、be / 时态 / 否定疑问 11 模块没有可合并的相同段落（「能量吸收器」板在 G21–25、G29、G30 各是该幕唯一演示板，单幕无法拿掉），只做互链：知识点 4 组（代词 / 名词复数 / be·否定疑问 / 时态）组内各页顶部加「🔗 另见 →」条，并注明 f/fe→ves 两种归类、did「能量吸收器」= 照妖镜 ④。总地图加语法课 40 + 总结页 3 个节点和「🔗 按知识点」一节。补丁 `src/patch_dedup_c.py`（独立块 DEDUP_C_V1，不进 PRACTICE_LOOP；`patch_practice.py` 重跑时已改为不冲掉 MY_STUDY / DEDUP_C 块），回归 `v5/app_check12.py` 入 runall。**内容错误待用户定**：G10（some/any）三幕演示板都与 some/any 无关；G21、G22、G24 放的是「能量吸收器」板，不对题；did 一个东西两套比喻（能量吸收器 / 照妖镜）要统一哪种；aux 与 tense 的「He plays football every day / every afternoon」可统一成同一句。这些都要改场景重建、动 R1 基线。
   - ✅ 第 4 步 units.json 名字（2026-10-31 04:00）：残文不只在 16 个 name 里，144 个口语幕标题全带着，而且没有金句的幕结尾会把标题大字写在白板上（auto.js 写标题）——所以 144 幕结尾原来都画着「R1 零丢失）：日常用语小剧场 …」。已改：16 个 name →「💬 日常用语 · <场景名>」，144 个 case title 与场景文件（第 1 行注释 + `title:`）→「💬 日常用语 · <场景名> · <英文句>」，按 DAILY_EXPRESSIONS_DB 逐幕对上；格林 4 组 name →「🔤 格林定律 · 规则组 ① …」/「🔤 维尔纳定律 · 格林定律的例外」，规律 16 幕 →「🔬 音变规律 N · <App 标题>」；顺带按 RULES_REVIEW 第 7 条把 `wo_rule_norman` 的「巴黎法语的 g」改成「其他地方古法语的 g」。145 幕重打包重嵌入（`rebuild_all.py` 新增 `--tabs=前缀,…` 只重建指定页签），R1 全部缺 0。**根因未改**：以后用清单首行登记 units.json 时要取场景名，不要从第一个「（」截断。
   - ✅ 第 5 步 白板重复句（2026-10-31 04:05，只出表不重建）：`lab/DUP_SENTENCES_REPORT.md`。按「≥2 个英文词的朗读句、忽略大小写和句末标点」统计，出现在 ≥2 幕的是 **85 句**（不是预估的 54 句；去掉万能动词剧场每个短语两幕同句后是 56 句），共 282 次。最该改的是 A 类 14 句 123 次：DAILY_EXPRESSIONS_DB 每条对话第 3 句按场景套同一模板（SC08 全是「Thank you for telling me.」），建议改数据源后与口语幕一起重建（动 R1 基线，待用户定）；万能动词 / 多义词 / 跨单元基础短句建议保留。

## 5.2 本轮总进度（用户 2026-10-30 22:13「完成全部」；每个功能一提交，接手看这张表）

| # | 项 | 状态 | 提交 |
|---|---|---|---|
| 1a | 词源抓取 / 解析 / 交叉核对工具：`src/fetch_etym.py`（Wiktionary 原文 + Etymonline 经 Wayback 存档）、`src/parse_etym.py` | ✅ | fa2845b |
| 1b | `ETYM_DB` 入库（只收两处互证条目）+ 词卡「📖 词源 📜」与「💡 巧记小故事」分开显示（`src/build_etym_db.py`、`src/patch_etym_card.py`，回归 `v5/app_check8.py`）。2026-10-31 沙箱重置后缓存重抓：Wiktionary 1487 / 1487，Etymonline **1347 / 1487**（2026-10-31 02:45；剩 140 词：Wayback 最新快照常是 Cloudflare 403 页——`fetch_etym.py` 已改为遇 403 去 CDX 取最近一次 200 快照——其余为限流 / 断连，多为变形词 / 派生词）。**补抓**：`cd src && python3 fetch_etym.py etymo 1 & python3 fetch_etym.py etymo-rev 1`（断点续抓，已落盘的跳过；每轮约补 100 词，失败的不落盘下轮重试；不要 `pkill -f fetch_etym`，会连带杀掉当前 shell），抓完 `python3 src/parse_etym.py` → `build_etym_db.py etym` / `morph` → `runall.py` → 改 COVERAGE §7 → 提交 | 🟡 第 4 批入库 **625** 词（G1 34 / G2 38 / G3 60 / G4 82 / G5 97 / G6 64 / V6 248 / POLY 2）；未入库：两处对不上 441、无可解析来源链 155、尚未抓到 123、无英语词源小节 71、词组 37、无词条 35 | e025d90；df2ae6c；第 3 批 本提交 |
| 1c | `MORPH_DB` 真实构词（Wiktionary 构词模板 + 各部分都在 Etymonline 正文出现；`-s` 不再标「复数」） | 🟡 358 词（191 互证 + 决策 34-A 词库派生词 167） | 本提交 |
| 1d | 格林定律按规则组：4 幕 `wo_grimm_voiceless` / `wo_grimm_voiced` / `wo_grimm_aspirate` / `wo_grimm_verner` 并入「格林定律」章（`src/patch_wo_grimm.py`；内容稿 `content/wo_grimm_*_1.txt`；逐条核对 `word_origins/GRIMM_GROUPS.md`：30 对同源词，Etymonline + Wiktionary 都写了才用） | ✅ R1 缺 0、确定性、0 报错；`app_check2.py wo wo_grimm_<组> 1` 4/4 | 本提交 |
| 1e | 音变与词汇规律 12 + 6 条：单词身世总枢「🔤 格林定律」章后新章「🔬 音变与词汇规律」18 条（规律 1 复用 `wo_grimm_verner`、规律 3 复用 `wo_vowel_a`，其余 16 个新幕 `wo_rule_*`；`src/patch_wo_rules.py`；核对 `word_origins/RULES_REVIEW.md`） | ✅ 16 幕 R1 缺 0、0 报错；`app_check2.py` 16/16；总地图按 key 去重 | 本提交 |
| 1f | `word_origins/COVERAGE.md` 数字更新：新增 §7 补齐进度（ETYM 603、MORPH 182、格林 11 → 30 对、规律 18 / 18 条有幕） | ✅（Etymonline 抓完后 §7 数字随 1b 再改一次） | 本提交 |
| 2a | 决策 14 练习闭环 + 总地图：模块白板下方「🎯 小测」（认出 → 选择 → 拼写，3–5 题，题目全部取自 VOCAB_DB，词表 `MODULE_QUIZ_JSON` 由 `src/gen_module_quiz.py` 从该模块白板句子里取课标实词）；答题走现有 `recordQuizResult`（错题本规则不变）；≥60% 点亮 `appState.moduleQuiz`；新页 `app_map` 总地图（39 个模块、三条推荐路径）；首页入口按钮。`src/patch_practice.py`（幂等），回归 `v5/app_check9.py` | ✅（先于 1c–1f 做：Etymonline 存档还在抓） | 58721a8 |
| 2b | 决策 6 剩余：空间隐喻 ✅（实验室「三大隐喻密码」加密码四 + 白板第 4 幕）/ 拼写潜规则 ✅（自然拼读页顶部剧场第四幕，不新开页签）/ 交际句型地图 ✅（口语大厅入口卡 → 新页 `oral_func_map`：白板 2 幕 + 点读句型表）。新内容做幕的通用工具：`v5/new_scene.py content/<幕>.txt`（内容稿 → R1 清单 → 生成 → 打包 → 核对 → 嵌入） | ✅ | 空间隐喻 64f1285；拼写潜规则 5a9e61e；交际句型地图 本提交 |
| 2c | 决策 29 软件优化（O9 → O8 → O2/O7 → O3 → O1 → O4 → O6 → O5） | ✅ O9 ✅ `src/runall.py`；O8 ✅ `src/appwrite.py`；O2/O7 ✅ `src/leakcheck.py` + 播放器后台暂停（随下次 rebuild_all 生效）；O3 ✅ 语音缓存 + 无英文语音提示；O1 ✅ VOCAB_DB 首屏轻字段 + 重字段按需（`src/split_vocab.py`，首屏脚本 2.06 MB → 0.52 MB）；O5 ✅ `src/offlinecheck.py`（代码随 f82736b 误带进，文档补记）；O4 ✅ `src/mobilecheck.py`（390 / 768 / 1024 三视口 24 页：无横向滚动、触控 ≥44 px、文字 ≥12 px，已入 runall）+ `src/patch_mobile.py`（样式块 MOBILE_O4_V1，0.72/0.74rem → 0.75rem）；O6 ✅ `src/deadcode.py`（零引用顶层函数，迭代到不动点，wb5 共享块解压后一起搜；@keyframes 无引用 / 不生效）+ `src/patch_deadcode.py`：删 8 个零引用函数；11 个 @keyframes 写成 `.method-hub @keyframes x`、浏览器整条丢弃（实测 0 个生效），连同 23 处 animation 声明删除，页面前后截图无变化。动态拼名调用扫不出，以后报 ReferenceError 先看 deadcode.py 的 KEEP 白名单 | O9 db0ac3a；O8 f82736b；O2/O7 3740e2f；O3 6e7021d；O1 本提交 |
| 3 | 退役旧 canvas 兜底（第一性原理 + 三大厅 + 实验室 + 词卡）：`src/retire_canvas.py` 截掉 10 个旧绘制循环 → `wb5MissingStage` 提示，再删 10 个无人调用的绘图函数（−91 K 字符）；工具 `src/fnranges.js`（acorn） | ✅ 91 个 HD 单元 app_check4 全过；runall --full 全过 | 本提交 |
| 4 | 人物帧重压 Q60 / 400 px | ⏸ 用户 2026-10-31 00:59「压画质先不做」。注意：`build_sprites.py` 的 MAXH 同时决定人物显示尺寸，直接降到 400 px 人物会变小，要做得先改成「只压编码不改显示尺寸」 | |
| 5 | 坏帧：l_lift1/2 去邻帧残留、missw_give 补下半身 + 去灯塔、V29 l_banana0/2 + l_win0–2 头发改浅棕（`l_lift0` 未动） | ✅ 5 幕重建嵌入，截图自审 + app_check2/3 0 报错 | 本提交 |
| 6 | 文档总收尾：HANDOFF §5.1 ⑥a–⑥g 旧表标成已转 §5.2、⑤ 旧 canvas 改为已退役；COVERAGE §7 数字更新；CHANGELOG 补记 | ✅（词源补抓后数字再改一次） | 本提交 |

本轮已定的设计决定（用户授权自行决定，理由写在 CHANGELOG）：
- **12 + 6 条规律幕的位置**：放在单词身世总枢，紧跟「🔤 格林定律」章之后新开一章「🔬 音变与词汇规律」；格林定律的规则组幕直接并入原「格林定律」章（和 `wo_grimm` 并列）。
- **词卡词源展示**：真实词源（`ETYM_DB`，两处互证）放第一块，标「📖 真实词源 📜」并附两个出处链接；原「巧记小故事」原文保留，改成第二块「💡 巧记小故事（帮助记忆的联想，不是真实词源）」；没有核实词源的词，第一块写「暂未收录」而不是空着。
- **Etymonline 访问**：沙箱直连被 Cloudflare 拦（403 / 无头浏览器超时），改读 Wayback Machine 存档（`web.archive.org/web/2026id_/…`，zstd 压缩，用 curl 解）；并发会被断连，单连接 + 1.5 秒间隔，正反两个进程。

## 5.1 进行中：主题思维导图讲解幕（分阶段，每阶段一提交）

| 阶段 | 内容 | 状态 |
|---|---|---|
| ① | `src/gen_mindmap_inventory.py` → `lab/INVENTORY_HD_MINDMAP_EXPORT.md`（R1 清单，25 幕 994 条）；`v5/gen_mindmap_groups.py` → `v5/mindmap_groups.json`（规则分组，已自审） | ✅ 本阶段提交 |
| ② | `scenes/auto.js` 新增 `mindmapBuild` 版式 + `v5/gen_mindmap.py`；引擎变了 → `rebuild_all.py` 全量重建（484 幕，主 App 共享引擎块仍只 1 份）；`embed_app.py` 装导图舞台挂钩（无幕时舞台为空、不报错）；主文件 15.47 MB；抽样回归 tense_matrix / hd_formation / fp_economy / 单词卡模板 55 词全过、0 报错 | ✅ 本阶段提交 |
| ③ | 25 幕分 3 批生成 → R1 → 联络表 → 嵌入（1–8 / 9–16 / 17–25），每批一提交 | 第 1 批 幕 1–8（学校与学习 … 服装与穿戴） ✅；第 2 批 幕 9–16（语法功能与指代 … 交通与出行） ✅；第 3 批 幕 17–25（交际与礼仪 … 核心语法功能词） ✅ |
| ④ | `v5/app_check6.py` 全量 App 回归：25/25 合格（讲解幕在导图上方、幕号对、时长 65–116 s；16 节点可点开卡、➕/➖/滚轮缩放、拖拽、复位正常），0 报错；`jscheck` / `anchorcheck` OK；第一性原理总枢 24 幕仍正常 | ✅ 本阶段提交 |
| ⑤ | 第一性原理总枢余下旧 canvas 核查：`v5/app_check7.py` 6 原理 × 4 幕——22 幕 v5 iframe、2 幕（fp_one_king ①、fp_zoom_focus ①）是迁去中英对照的跳转，页面上已无任何旧 canvas，0 报错。旧 canvas 代码（`startFirstPrinciplesCanvasLoop` 的 canvas 分支、`wbStageHtml` 的 `firstPrinciplesCanvas` 兜底）只在缺 v5 幕时才会用到，2026-10-31 已退役（§5.2 第 3 项） | ✅ 本阶段提交（无需改 App） |
| ⑥ | 词源 / 格林定律 / 词根词缀 + 12+6 条规律（逐条核实） | 🟡 已转到 §5.2 第 1 项执行（下面 ⑥a–⑥g 只留作历史对照）。原记录（2026-10-30 22:30）：原审计用的 Wiktionary 抓取缓存 `work/etym` 随沙箱重置丢失，要重抓 1487 词（API 可用，已试 foot）；之后每条都要对照 Etymonline / Wiktionary 人工核实，是多轮的研究工作量，按下面 ⑥a–⑥g 分阶段做，每阶段一提交 |
| ⑥a | ✅ 见 §5.2 1a。`src/fetch_etym.py`：按 VOCAB_DB 抓 Wiktionary wikitext（限速、断点续抓）→ `work/etym/`（缓存不进仓库）；`src/parse_etym.py` 解析词源 / 同源 / 构词模板 → 候选表 `word_origins/CANDIDATES_*.md`（进仓库，标「候选，未核」） | ✅ |
| ⑥b | 格林定律 p→f 组（COVERAGE §3 候选 14 个）逐条核实（Etymonline + Wiktionary 两处都对上才入库，否则写原因）→ 数据 + 白板模板幕 | ✅ 见 §5.2 1d（`wo_grimm_voiceless`） |
| ⑥c | 格林其余规则组（t→th、k→h、kʷ→hw、d→t、g→k、gʷ→kw、bh→b、dh→d、gh→g）+ 维尔纳定律，每组一提交 | ✅ 见 §5.2 1d（按清浊 / 送气合成 3 幕 + 维尔纳 1 幕） |
| ⑥d | 词源 `ETYM_DB`（按年级 G1→G6→V6，每年级一提交；旧「巧记小故事」保留并标 💡） | 🟡 见 §5.2 1b（展示方式已按 22:13 授权自行决定） |
| ⑥e | 词根词缀 `MORPH_DB`（按词缀族，每族一提交；伪拆分加 R3 纠正） | 🟡 见 §5.2 1c |
| ⑥f | 音变与词汇规律 12 + 6 条（COVERAGE §4），每条：核实可匹配词 → 一个白板模板幕 | ✅ 见 §5.2 1e（挂在单词身世总枢新章「🔬 音变与词汇规律」） |
| ⑥g | 每批后更新 `word_origins/COVERAGE.md` 数字 | 🟡 见 §5.2 1f |
| ⑦ | 文档收尾（本轮：HANDOFF 现状表 / §5.1 / §6、REDRAW_V5 H 节、CHANGELOG、设计稿 §1.7 已同步；全部完成后再做总收尾） | 🟡 本轮已同步 |

接手须知：
- 环境按 §2 装好后：`python3 v5/gen_mindmap_groups.py --review`（看逐词分组依据）→ `python3 src/gen_mindmap_inventory.py` → `python3 v5/gen_mindmap.py` → `python3 sprites/build_sprites.py mindmap l_speak l_point l_think l_idea0`（在 v5/ 下）→ 每幕 `node build.mjs scenes/hd_mindmap_<n>.js out/hd_mindmap_<n>.html "<标题>"`、`python3 r1v5.py ../lab/INVENTORY_HD_MINDMAP_EXPORT.md <n> scenes/hd_mindmap_<n>.js ../lab/INVENTORY_HD_MINDMAP_<n>_V5.md`、`python3 shots.py out/hd_mindmap_<n>.html /tmp/x.png 5 25 45 65 85`、`python3 embed_app.py hd_mindmap <n-1> out/hd_mindmap_<n>.html`。
- 幕号 = VOCAB_DB 子主题首次出现顺序（= `mindmap_groups.json` 的 `idx`）；改了 VOCAB_DB 子主题顺序或前 16 个词，要重跑分组表和清单。
- 后台跑长任务：`(setsid nohup python3 rebuild_all.py > /tmp/rb.log 2>&1 < /dev/null &)`；沙箱重置后角色包要全部重建（约 460 个，单线程约 30 分钟，可先并行预生成）。

## 6. 待用户确认

0d. ~~菜单去重合并方案（决策 33）~~：用户 2026-10-31 09:10 确认按原方案执行，①–⑤ 已全部完成。可再看：十五条规律速查是否保留、闯关游戏语法题是否改从题库出。原方案：首页 5 入口（单词 / 语法 / 口语 / 底层原理 / 练习与档案），撤掉王炸实验室入口与首页 13 卡、方法论教室、4 合 1 闯关厅、四大总结矩阵独立页、三套档案页。
1. ~~人物帧是否再压画质换体积~~：用户 2026-10-31「先不做」。
0c. 词源 / 格林 / 规律系列开工前要定两件事：①「音变与词汇规律」12+6 条模板幕放在 App 哪里；② 旧「巧记小故事」改标 💡 后在词卡上怎么和真词源并排显示（见 §5.1 ⑥）。
0b. ~~各厅旧 canvas 兜底代码~~（已按 22:13 授权退役，2026-10-31）（第一性原理 `firstPrinciplesCanvas`、三大厅 HD 剧场旧循环）现在都只在缺 v5 幕时才跑，是否统一退役删掉（可省主文件体积，但没了兜底）。
0. 主题思维导图语义分组表 `v5/mindmap_groups.json`（2026-10-31 已按用户点名的 6 处问题修正）（25 个子主题，规则见 `v5/gen_mindmap_groups.py`）有空看一眼；不合适的组名 / 归组直接改规则重跑即可。
2. 161 幕 v5.1 真机审片（`REVIEW_LIST.md`）。
3. 练习闭环（决策 14）是否开工；决策 6 剩余模块位置。
