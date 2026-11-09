# 第四波第 2 / 3 项：give on 另立 vv_give_on、give back ① 开场句改写 工作底稿

> 日期：2026-11-09 · 执行：白板第四波实施员（场景） · 分支 `wave4/wb-scenes`（从 59844d7）
> 定夺（主对话 Muse 已定，不重新定夺）：第 2 项 give on (onto) 另立 vv_give_on 页签；第 3 项 give back ① 开场句改写为「give back 是 give 的常用搭配，意思是‘归还’。」、其余内容一字不动。
> 提交：两项各单独一 commit（见 §5），不推送、不合并（总协调人统一合并）。

## 0. 前后数字

| 项 | 改前（59844d7） | 改后 |
|---|---|---|
| units.json 页签数 | 233 | **234**（+1 vv_give_on，插在 vv_give_back 之后） |
| vv 页签数 | 79 | **80** |
| vv 场景文件（`scenes/vv_*.js`，`git ls-files` 实测） | 156 | **158**（+2 give on ①②） |
| give on (onto) 场景 | 0 幕（第二波下线时删除） | **2 幕**（①②，内容与被删幕一字未动） |
| give back ① 开场字幕（`vv_give_back_1.js` 的 `['n', …]`） | `give back：give 没有常用的 down 搭配，这一格换成 give back：把东西递回原主手里` | `give back 是 give 的常用搭配，意思是‘归还’。`（只改这一句） |
| 主文件 `laws-prototype/mengxing-prototype-v1.html` | — | **0 改动** |

> 数字勘误：第三波底稿 `wave3_item3_give_back.md` §0 记 vv 场景文件「82→84 幕」，与实测不符——`git ls-tree` 实测 0ae1739（第三波起点）为 154 个 `scenes/vv_*.js`，59844d7 为 156 个（+2 give back ①②），与本次 156→158 衔接；82/84 疑为第三波计数口径有误，特此记下，本稿数字以 `git ls-files` 实测为准。

## 1. 第 2 项来源：被删内容原文（照录，不编造）

三处互相印证一致：

1. **git 历史**：`d62026c^` 的 `docs/whiteboard/v5/scenes/vv_give_on_1.js` / `vv_give_on_2.js`（第二波下线前版本），标题本身就是「give on ①/②」。
2. **第三波底稿 §4**（`wave3_item3_give_back.md`）：ON = 正对着、通到那一面；例句 "The window gives on the green park."（这扇窗户朝向绿色的公园）、"The back door gives onto the garden."（后门通向花园）；ACTS 帧为 `l_shutter` / `l_gdoor`。
3. **内容清单**（历史文档，未改）：`docs/whiteboard/lab/INVENTORY_VV_GIVE_ON_EXPORT.md`——案例 1（R1 6 条）与案例 2（R1 18 条），与 git 历史两幕的 ITEMS 逐条一致。

两句核心例句逐字在场：`The window gives on the green park.`（① 1 次、② 复述 1 次）、`The back door gives onto the garden.`（② 1 次）。另 ② 内还有合成句 `The window gives on the park.` / `The door gives onto the garden.`（原文照录）。

## 2. 第 2 项改动

### 2.1 新建场景（2 个文件，内容一字未动）

- `docs/whiteboard/v5/scenes/vv_give_on_1.js`：由 `vv_give_on_1.js`（d62026c^）恢复。ITEMS 6 条、ACTS `{"*": ["l_shutter"]}` 逐字一致。lib 名 `vvgiveon1` 本就与新文件名一致，无需改；仅文件头加恢复说明行 + 帧出处（`帧 l_shutter 见 CAST_V5.md V30`）。
- `docs/whiteboard/v5/scenes/vv_give_on_2.js`：由 `vv_give_on_2.js`（d62026c^）恢复。ITEMS 18 条、ACTS `{"*": ["l_gdoor"]}` 逐字一致；同上，仅文件头两行。

验证：与 `/tmp/wb4/vv_give_on_{1,2}_src.js`（d62026c^ 原文）`diff` 仅文件头 2 行不同（新增恢复说明行 + 帧出处后缀）；`grep ^(const|import \*|export)` 内容行无差异。

### 2.2 精灵 stub（本地构建产物，不入库）

- `docs/whiteboard/v5/sprites/vvgiveon1.js` / `vvgiveon2.js`：各 44 字节空 stub（`export const FR = {}; export const FI = {};` + 换行），与第三波 `vvgiveback1/2.js` 逐字节相同（`cmp` 通过）。`sprites/*.js` 在 `.gitignore` 内，不提交。
- 背景：原 `vvgiveon1/2.js` 在 git 历史里从未存在过（与第三波 give back 情况相同，场景 import 悬空）；不带 stub 时 `build.mjs`（esbuild 打包）会因 import 缺失失败。
- 帧本身：ACTS 引用的 2 帧（l_shutter、l_gdoor）在 `CAST_V5.md` V30 行登记为 give on ①②的帧，✅ 已有；空 stub 意味着打包后人物帧不渲染（与 vv_give_over 等空 stub 幕现状相同），帧画按 CAST 重建属另一工作，不在本项。

### 2.3 units.json 登记（+1 页签）

- 新增 `"vv_give_on"`（插在 `vv_give_back` 之后）：`field vv / lib vvgiveon / name 🎬 万能动词 · give on`；cases 1/2 标题与 ACTS 与场景文件一致。
- 格式：脚本 `docs/work-2026-11-09/apply_wave4_item2_units.py`（`json.dumps(indent=1, ensure_ascii=False)` roundtrip 校验通过，与原文件格式一致，无尾换行；跑前断言总数 233 且 `vv_give_back` 在索引 79）。

### 2.4 生成器注记（不改生成逻辑）

- `docs/whiteboard/src/wb13/gen_wb13_units.py` docstring：原第 6 条「vv_give_down / vv_give_on 已下线」口径已过期，改为只记 give_down 下线、give_on 于第四波恢复（见第 9 条）；新增第 9 条记 vv_give_on 为手工登记（场景系手写恢复、非 72 格，不在本脚本生成范围）。
- 未动：`wb13_phrasal.json`（72 格数据文件；give on (onto) 是否需在数据层登记与第三波 give back 同问，见 §6）、`gen_wb13_scenes.py`（give on 不在生成范围）、主文件（0 改动）、`gen_scene.py` 模型 spec（只恢复 vv_ 场景源，不恢复模型生成的 gen_stock 副本；与第三波口径一致）。

## 3. 第 3 项改动：give back ① 开场句改写（只改这一句）

- 文件 `docs/whiteboard/v5/scenes/vv_give_back_1.js`，改前已读确认原句现况与第三波底稿一致：`['n', 'give back：give 没有常用的 down 搭配，这一格换成 give back：把东西递回原主手里']`。
- 改后：`['n', 'give back 是 give 的常用搭配，意思是‘归还’。']`（只陈述词典事实，未加新 claims；「把东西递回原主手里」随原句整句替换，不再保留——定夺给出的就是整句新文案）。
- `git diff` 仅此 1 行。其余内容一字不动：② 末尾「共同点」行 `['w', '共同点：BACK = 回到原来的地方（give 没有常用的 down）']`（`vv_give_back_2.js:28`）未碰，只在此记为**观察到的残留**——「give 没有常用的 down」在 ① 已改写后仍留在 ②，措辞上与新开场句并存，是否改写待定夺（本次定夺只改 ① 这一句）。
- 未走生成器：`gen_wb13_scenes.py` 是一次性生成器，该幕是手写恢复场景、不在生成范围——直接改场景文件。

## 4. 验证

- `node --check`：give_on 2/2 通过；give_back_1 改后通过。
- `node v5/build.mjs` 打包（字体 `~/workspace/wbfonts`，`WB_FONTS=$HOME/workspace/wbfonts`）：give_on ① 1,115,977 字节、② 1,116,464 字节；give_back_1 改后 1,116,585 字节。均 2/2 通过。
  - 注意：give_back_1 改后首次打包报 `pyftsubset ENOENT`——新字幕引入新字（是/常用/搭配/意思/归还等），字体子集缓存未命中需现跑 `pyftsubset`；它在 `~/workspace/wbfonts/bin/pyftsubset`，须把该目录加进 `PATH` 后重跑即通过。give_on 两幕命中已有字体缓存，未触发此问题。
- 探针（Playwright + 本地 Chromium，波次脚本 `/tmp/wb4/probe.py`，复用第三波 `/tmp/wb3/probe.py`，读打包 `out` 的 `window.__dur`，4 秒等待）：give_on ① **19.0 秒**、② **42.2 秒**；give_back_1 改后 **22.2 秒**（与第三波改前实测 22.2 秒一致）；控制台 **0 error / 0 pageerror**（三幕合计）。
  - ① 19.0 秒低于 SOP §1 实验室 40–60 秒指引——系原文内容本身短（6 条、1 句朗读；清单注案例 1 约 7 秒），与第三波 give_back ①（22.2 秒）同理，未擅自加内容凑时长；② 42.2 秒在指引内，无需拆分。
- `laws-prototype/tools/check_all.py`：**24/24 通过**（结论「全部通过」；本分支基线，主文件 0 改动）。
  - 注意：重跑时曾出现一次 `gen_laws --check` FAIL（`UnicodeDecodeError`，主文件 5,627,902 字节处）——当时共用工作区另一实施员正在改写主文件（未提交的 `M laws-prototype/mengxing-prototype-v1.html`），系其中途写入的瞬态；直接重跑 `gen_laws.py --check` 已 PASS，随后整轮 `check_all.py` 重跑 exit=0、24 项全 PASS。失败与本项改动无关（本项未碰主文件）。
- `docs/whiteboard/src/jscheck.py`：未重跑（本次不碰主文件；anchorcheck 116 项基线失败见第三波底稿 §3，与本项无关）。

## 5. 同步与提交

- 起点 HEAD 59844d7，分支 `wave4/wb-scenes`，未推送、未合并。
- 提交 1（第 2 项）：`Content：give on (onto) 另立 vv_give_on（由已下线 vv_give_on 原文恢复 2 幕）`——含 `scenes/vv_give_on_1.js`、`scenes/vv_give_on_2.js`、`v5/units.json`、`src/wb13/gen_wb13_units.py`（docstring 注记）、`docs/work-2026-11-09/apply_wave4_item2_units.py`。
- 提交 2（第 3 项）：`Content：give back ① 开场句改写为常用搭配事实陈述（只改这一句）`——含 `scenes/vv_give_back_1.js`（1 行）+ 本底稿。
- 精灵 stub（`sprites/vvgiveon1/2.js`）在 `.gitignore` 内，不提交；打包产物在 `/tmp/wb4/`（`vv_give_on_1/2.html`、`vv_give_back_1.html`、探针脚本 `probe.py`）。
- **并发说明**：同一工作区另有第四波实施员共用检出（分支 `wave4/gates`、`wave4/mainfile`、`wave4/wb-tooling`）。实施中对方切走分支并提交 e6061ea（第 7 项门禁）到 `wave4/gates`，一度使本工作区 HEAD 落在 e6061ea；核对确认对方提交只含 `check_all.py`、`check_badge_erridx.py` 与其底稿，未碰本项文件，本项未提交改动完好，随后切回 `wave4/wb-scenes` 继续。另其间工作区出现未入库的 `laws-prototype/tools/check_js_syntax.py`（第四波第 8 项，另一实施员的在途工作），未碰、未提交。

## 6. 未核实项与待定夺

- **未核实**：真机播放（探针只读打包 `__dur`，非真机计时）；人物帧实际渲染（空 stub 下帧不画，待 CAST 帧重建后才可见——与 vv_give_over 等幕现状相同）；① 19.0 秒偏短是否接受（内容短是原文如此，与第三波 give_back ① 同理）。
- **待定夺**：
  1. `wb13_phrasal.json` 是否需补 give on 记录（72 格结构，on 在 6 小品词内但 give on 已下线又恢复；补则需数据方定 schema，本次未动——与第三波 give back 的同类问题并列）。
  2. give_back ② 末尾「共同点」行残留的「（give 没有常用的 down）」是否改写（见 §3；本次定夺只改 ①，未动）。
  3. `vv_give_up_1.js` 等既有幕 import 的精灵文件盘上缺失、打包失败（第三波已记的既有缺口，与本项无关）。
