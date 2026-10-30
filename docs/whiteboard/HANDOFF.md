# 交接文档（HANDOFF）· 白板动画与新模块

> 更新：2026-10-30 21:45 JST（主题思维导图讲解幕分阶段进行中，见 §5.1）；16:20 JST（删旧 SVG 兜底）；16:10 JST · 最新提交见 `git log -1`（本次：老白板 v5.1 全部替换完成 + 主文件瘦身 + 人物重叠修复）
> 设计稿：`DESIGN_MINDMAP_WORDCARD.md`（用户 2026-10-30 19:39「按照你的来」已确认）：普通单词卡通用模板 ✅；思维导图讲解幕待做。
> 接手先读：本文（现状 + 下一步）→ `MASTER_DESIGN.md`（总设计，§2.9 = v5.1 标准画法）→ `SOP.md`（§17 = v5.1 验收）。流水、历史决策、每幕验收数字都在 `CHANGELOG.md`（文末有本文 16:10 之前的完整快照）。
> 本文只写现状、做法、风险、下一步；做完一件事：流水追加到 CHANGELOG，本文只改现状。

## 0. 用户规矩（必须遵守）

- 中文沟通；直接提交推送 `master`，不新建分支；做完一组就提交推送 + 更新文档，中间不停、不等审片（用户 2026-10-30 14:25）。
- 流程：重画 → R1 零丢失 / 技术验收 → `embed_app.py` 替换进主 App → App 回归 → 提交推送 → 更新 `REDRAW_V5.md`、`CHANGELOG.md`、本文。
- **不提交无用文件**（用户 2026-10-30 15:34）：构建产物、可重建的生成物、截图、`node_modules`、环境文件一律不进仓库；提交前 `git status --short` 逐个核对。已忽略：`docs/whiteboard/v5/out/`、自动生成的角色包 `v5/sprites/*.js`（手工版 tm/pc/ao 保留）、`v5/sprites/src/`、`node_modules/`。
- 练习闭环（决策 14）、新模块、决策 29 软件优化：等用户点头再开工。
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
- **环境**（沙箱重置后）：`pip install -q numpy pillow playwright fonttools brotli && python3 -m playwright install chromium && sudo python3 -m playwright install-deps chromium`；`cd docs/whiteboard/v5 && npm i`；字体放 `/workspace/work/fonts/wk.ttf`（LXGW WenKai v1.501）、`kalam.ttf`；git 身份丢了就 `git config user.name/user.email` 沿用上一次提交的作者。

- **主题思维导图讲解幕**：页签 `hd_mindmap`（幕号 = VOCAB_DB 子主题首次出现顺序），场景由 `v5/gen_mindmap.py` 从 VOCAB_DB + `mindmap_groups.json` 生成（勿手改场景，改规则 / 数据后重跑），版式 `auto.js` 的 `mindmapBuild`；App 里导图卡片上方的空舞台 `themeMindMapWb5` 由 `wb5HDSwap(…, "hd_mindmap", 幕号)` 换成 iframe，下方交互导图代码未动。回归 `python3 v5/app_check6.py [序号…]`。
- **通用模板幕**（普通单词卡）：App 里只存一幕 `wordcard_tpl`；`embed_app.py` 的 `wb5TplSwap / wb5TplAct`（标记 `WB5_EMBED_TPL`）把词条 JSON 通过 `fr.__wb5Inject` 注入 srcdoc（`WB5_MOUNT_V4`），模板里 `autoBuild` 现场排版。改 `wordcard_items.js` 后：重建模板 → `embed_app.py wordcard_tpl 0 out/wordcard_tpl.html` → `check_wordcard_tpl.py`（分 4 片 `--part k/4`，再 `--merge 4` 出报告）→ `app_check5.py`。
- **全量重建**：`rebuild_all.py`（两路并行；超时后 `--resume` 只补没重建的）→ `check_all_out.py --part k/2` 全量技术回归。`build.mjs` 的临时字体文件已按进程号区分（并行打包曾串字体）。

## 3. 体积现状（主文件 15.55 MB，2026-10-30 21:55；14.68 MB 之后加了单词卡模板等）

- 人物帧 WebP 共享块约 9.7 MB（366 帧，Q74，最高 520 px）——下一步可压：降到 Q60 / 最高 400 px 预计省 3–4 MB，需看画质。
- 各幕 gzip 后的场景数据约 3–4 MB；共享字体约 0.5 MB；引擎 1 份。
- 旧 SVG 白板模块和引擎已删除（2026-10-30 16:20，`v5/retire_old_wb.py`）；`src/insert_wb.py` 已停用。
- git 历史（`.git` 约 231 MB）里还留着以前提交的构建产物；要瘦历史只能改写历史 + 强推，未经用户同意不做。

## 4. 已知风险

- 思维导图讲解幕：组合 emoji（👩‍🏫、1️⃣8️⃣ 等）在无头浏览器里拆成两个字显示，是沙箱字体问题，真机应正常——真机审片时留意；幕 9「语法功能与指代」词义很长，116 s（设计目标 60–90 s），内容未删；分组表为规则分组 + 自审，未经用户过目（§6）。

- `rebuild_all.py` 以前不会重建模板幕角色包 `sprites/wordtpl.js`（沙箱重置后整轮在最后一步失败），2026-10-30 已补（按 `wordcard_items.js` 的 ACT_FRAMES 重建）。

- **审片缺口**：161 幕 v5.1 只有样板和 tense_matrix 经用户看过，其余为截图自审；真机（尤其手机）上的加载速度、帧率、英文朗读同步未验证。
- 双人帧（如 `tug` 拔河、give in ②）本身就是一张图里两个人，属正常；若用户仍觉得重叠，需要重画那几张帧。
- cast 帧待返工：`l_lift0–2`（杠铃粘连）、`missw_give`（底部残留）、V29 Leo 黑发。
- `embed_app.py` 插入新块必须锚在第一个 `<script type="text/plain" id="wb5html-` 前；主脚本注释里也有 `id="wbmod-<id>"` 字样，曾因锚错位置破坏主脚本（已修）。旧引擎删除时误删过通用函数 `stopActiveCanvasLoops`，已从 `2817e97` 主文件恢复后重新嵌入。
- 补丁脚本靠字符串锚点改主文件：新补丁先 `assert s.count(锚点) == 1`，并登记进 `src/anchorcheck.py`。

## 5. 下一步（按顺序）

1. 等用户决定：是否再压一轮人物帧画质（§3 第一条）。
2. 三大厅 HD 剧场：构词法 ✅ → 框架语义 ✅ → 易混词 ✅ → 自然拼读 ✅ → 语法总结中心 ✅ → 语法 40 点 ✅（56 幕；三幕内容相同的合并为 1 幕）→ 日常用语 144 句 ✅（每句 1 幕放完整对话）→ 单词卡一词多义 17 词 ✅（51 幕）→ 普通单词卡通用模板 ✅（1425 词，功能词旧版本来就不播动画）→ 主题思维导图讲解幕 ✅（25 幕，见 §5.1）→ **第一性原理总枢余下旧 canvas** → 词源 / 格林定律 / 词根词缀 + 12+6 条规律（逐条核实）→ 文档收尾。
3. 等用户点头：练习闭环 + 总地图（决策 14）、决策 6 剩余三个新模块、决策 29 软件优化。

## 5.1 进行中：主题思维导图讲解幕（分阶段，每阶段一提交）

| 阶段 | 内容 | 状态 |
|---|---|---|
| ① | `src/gen_mindmap_inventory.py` → `lab/INVENTORY_HD_MINDMAP_EXPORT.md`（R1 清单，25 幕 994 条）；`v5/gen_mindmap_groups.py` → `v5/mindmap_groups.json`（规则分组，已自审） | ✅ 本阶段提交 |
| ② | `scenes/auto.js` 新增 `mindmapBuild` 版式 + `v5/gen_mindmap.py`；引擎变了 → `rebuild_all.py` 全量重建（484 幕，主 App 共享引擎块仍只 1 份）；`embed_app.py` 装导图舞台挂钩（无幕时舞台为空、不报错）；主文件 15.47 MB；抽样回归 tense_matrix / hd_formation / fp_economy / 单词卡模板 55 词全过、0 报错 | ✅ 本阶段提交 |
| ③ | 25 幕分 3 批生成 → R1 → 联络表 → 嵌入（1–8 / 9–16 / 17–25），每批一提交 | 第 1 批 幕 1–8（学校与学习 … 服装与穿戴） ✅；第 2 批 幕 9–16（语法功能与指代 … 交通与出行） ✅；第 3 批 幕 17–25（交际与礼仪 … 核心语法功能词） ✅ |
| ④ | `v5/app_check6.py` 全量 App 回归：25/25 合格（讲解幕在导图上方、幕号对、时长 65–116 s；16 节点可点开卡、➕/➖/滚轮缩放、拖拽、复位正常），0 报错；`jscheck` / `anchorcheck` OK；第一性原理总枢 24 幕仍正常 | ✅ 本阶段提交 |
| ⑤ | 第一性原理总枢余下旧 canvas 核查 → 词源 / 格林 / 词根词缀 + 12+6 条 → 文档收尾 | ⬜ |

接手须知：
- 环境按 §2 装好后：`python3 v5/gen_mindmap_groups.py --review`（看逐词分组依据）→ `python3 src/gen_mindmap_inventory.py` → `python3 v5/gen_mindmap.py` → `python3 sprites/build_sprites.py mindmap l_speak l_point l_think l_idea0`（在 v5/ 下）→ 每幕 `node build.mjs scenes/hd_mindmap_<n>.js out/hd_mindmap_<n>.html "<标题>"`、`python3 r1v5.py ../lab/INVENTORY_HD_MINDMAP_EXPORT.md <n> scenes/hd_mindmap_<n>.js ../lab/INVENTORY_HD_MINDMAP_<n>_V5.md`、`python3 shots.py out/hd_mindmap_<n>.html /tmp/x.png 5 25 45 65 85`、`python3 embed_app.py hd_mindmap <n-1> out/hd_mindmap_<n>.html`。
- 幕号 = VOCAB_DB 子主题首次出现顺序（= `mindmap_groups.json` 的 `idx`）；改了 VOCAB_DB 子主题顺序或前 16 个词，要重跑分组表和清单。
- 后台跑长任务：`(setsid nohup python3 rebuild_all.py > /tmp/rb.log 2>&1 < /dev/null &)`；沙箱重置后角色包要全部重建（约 460 个，单线程约 30 分钟，可先并行预生成）。

## 6. 待用户确认

1. 人物帧是否再压画质换体积。
0. 主题思维导图语义分组表 `v5/mindmap_groups.json`（25 个子主题，规则见 `v5/gen_mindmap_groups.py`）有空看一眼；不合适的组名 / 归组直接改规则重跑即可。
2. 161 幕 v5.1 真机审片（`REVIEW_LIST.md`）。
3. 练习闭环（决策 14）是否开工；决策 6 剩余模块位置。
