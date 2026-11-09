# 第三波第 3 项：give back 另立 vv_give_back 工作底稿

> 日期：2026-11-09 · 执行：白板第三波实施员 · 仓库 master（起始 HEAD 0ae1739；实施中远端前进至 e31dc96，已同步，见 §5）
> 定夺（主对话 Muse 已定，不重新定夺）：give back 另立 vv_give_back；以第二波底稿 `wave2_whiteboard_scenes.md` §7.3 照录的被删 8 幕内容原文为来源，不重新编造。白板嵌入已定为 C（白板线独立、不嵌入新 App）——本次只做场景源 + units 登记，不碰主文件、不做嵌入。
> 提交：见 §5（vv_give_back 一 commit）。

## 0. 前后数字

| 项 | 改前 | 改后 |
|---|---|---|
| units.json 页签数 | 232 | **233**（+1 vv_give_back） |
| vv 页签数 | 78 | **79** |
| vv 场景文件（scenes/vv_*.js，不含 gen_stock） | 82 幕 | **84 幕**（+2 give back ①②） |
| give back 场景 | 0（第二波 3(b) 下线 give down/on 时连同删除，全 App 无 give back 场景） | **2 幕**（①②，内容与被删幕一字未动） |
| give on (onto) | 0 幕 | **0 幕（本次不另立）**，只在本底稿 §4 记为后续可选项 |

## 1. 来源：被删内容原文（照录，不编造）

来源有三处，互相印证一致：

1. **git 历史**：`d62026c^` 的 `docs/whiteboard/v5/scenes/vv_give_down_1.js` / `vv_give_down_2.js`（第二波 3(b) 删除前版本）。这两幕标题本身就是「give back ①/②」，units 登记名也是「🎬 万能动词 · give back」。
2. **第二波底稿 §7.3**：give back（归还）：BACK = 回到原来的地方；例句 "Please give back my ruler after class."（下课后请把尺子还给我）、"Give the book back to the library."（把书还给图书馆）。
3. **内容清单**（历史文档，未改）：`docs/whiteboard/lab/INVENTORY_VV_GIVE_DOWN_EXPORT.md`——案例 1（R1 9/9）与案例 2（R1 21/21），与 git 历史两幕的 ITEMS 逐条一致。

`gen_stock_vv_give_down_1/2.js` 与 vv_ 幕内容相同（第二波底稿 §2 已述），不另作来源。被删事实表（model/factsheets）已随源头删除，git 历史可查，未恢复——本次只恢复场景源，不碰模型层。

## 2. 改动

### 2.1 新建场景（2 个文件，内容一字未动）

- `docs/whiteboard/v5/scenes/vv_give_back_1.js`：由 `vv_give_down_1.js`（d62026c^）恢复。ITEMS 9 条、ACTS `{"*": ["l_pencil", "m_lost", "pencil_back"]}` 逐字一致，仅改：文件名/标题 lib 名 `vvgivedown1`→`vvgiveback1`、文件头加恢复说明行。
- `docs/whiteboard/v5/scenes/vv_give_back_2.js`：由 `vv_give_down_2.js`（d62026c^）恢复。ITEMS 21 条、ACTS `{"*": ["l_books", "l_return", "librarian"]}` 逐字一致，仅改同上。

验证：`grep ^(const|import \*|export)` 两幕新旧对照 diff 为空（仅精灵 lib 名不同）；两句核心例句逐字在场：`Please give back my ruler after class.`（①、②复述各 1 次）、`Give the book back to the library.`（② 1 次）。

**原文保留说明**：① 开场字幕与 ② 末尾「共同点」行仍写「give 没有常用的 down 搭配，这一格换成 give back」「（give 没有常用的 down）」——这是被删幕原文，一字未动。措辞里的「这一格」指旧 72 格里的 give down 格；新页签已独立，该句现为「为什么会有 give back 这一幕」的来历说明，未改写（改写即编造新文案，超出本次定夺）。

### 2.2 精灵 stub（本地构建产物，不入库）

- `docs/whiteboard/v5/sprites/vvgiveback1.js` / `vvgiveback2.js`：各 44 字节空 stub（`export const FR = {}; export const FI = {};`），与 `vvgivecore1.js` / `vvgiveover1.js` 同款。`sprites/*.js` 在 `.gitignore` 内，不提交。
- 背景：原 `vvgivedown1/2.js` 在 git 历史里从未存在过（第二波底稿 §2 已记「场景 import 悬空」）；不带 stub 时 `build.mjs`（esbuild 打包）会因 import 缺失失败——实测同批的 `vv_give_up_1.js`（import `vvgiveup1.js`，盘上无文件）打包即失败，是**既有缺口**，不在本次范围。
- 帧本身：ACTS 引用的 6 帧（l_pencil、m_lost、pencil_back、l_books、l_return、librarian）在 `CAST_V5.md` V32 行登记为 give back ①②的帧，✅ 已有；空 stub 意味着打包后人物帧不渲染（与 vv_give_over 等空 stub 幕现状相同），帧画按 CAST 重建属另一工作，不在本项。

### 2.3 units.json 登记（+1 页签）

- 新增 `"vv_give_back"`（插在 `vv_give_over` 之后）：`field vv / lib vvgiveback / name 🎬 万能动词 · give back`；cases 1/2 标题与 ACTS 与场景文件一致。
- 格式：`json.dumps(indent=1, ensure_ascii=False)` roundtrip 校验通过（与原文件格式一致，无尾换行）。

### 2.4 生成器注记（不改生成逻辑）

- `docs/whiteboard/src/wb13/gen_wb13_units.py` docstring：补记 vv_give_back 为手工登记（场景系手写恢复、非 72 格，不在本脚本生成范围；该脚本基线断言 186 页签已过时，见第二波底稿 §5）。
- 未动：`wb13_phrasal.json`（72 格数据文件，另一同事在做；give back 不是 72 格内的动词×小品词组合，文件中无 give back 记录——是否需在数据层登记，见 §6 待定夺）、`gen_wb13_scenes.py`（72 格 + 12 核心义生成器；give back 不在生成范围）、主文件（0 改动）、`gen_scene.py` 模型 spec（被删的 stock_vv_give_down spec 已删，不恢复——本次只恢复 vv_ 场景源，不恢复模型生成的 gen_stock 副本）。

## 3. 验证

- `node --check`：2 幕通过。
- `node v5/build.mjs` 打包：2 幕通过（① 1,116,099 字节、② 1,116,579 字节；字体 `~/workspace/wbfonts`）。
- 探针（Playwright + 本地 Chromium 缓存，读打包 `out` 的 `window.__dur`，0 报错）：① **22.2 秒**、② **46.8 秒**，控制台 0 error / 0 pageerror。② 在 SOP §1 实验室 40–60 秒指引内，无需拆分；① 22.2 秒低于 40 秒——系原文内容本身短（9 条、1 句朗读），被删前旧剧场 ① 亦仅约 13 秒，未擅自加内容凑时长。
- `gen_wb13_scenes.py --check-only`：未重跑（本次未改该生成器的生成逻辑；12 核心义幕改动见第 7(a) 项底稿，改后重跑见该稿）。
- `laws-prototype/tools/check_all.py`：**24/24 通过**（结论「全部通过」；本项改动前后一致，主文件 0 改动）。
- `docs/whiteboard/src/jscheck.py`：**anchorcheck FAIL 116 项**，与起点 e97aaec 基线一致（FAIL 行清单已存 `/tmp/wb3/jscheck_fail_item3.txt`，116 项 + 1 行汇总；本项不碰主文件，锚点缺失是基线遗留）。

## 4. give on (onto)——本次不另立，只记后续可选项

第二波底稿 §7.3 照录的 give on 内容（门窗朝向/通向）：ON = 正对着、通到那一面；例句 "The window gives on the green park."（这扇窗户朝向绿色的公园）、"The back door gives onto the garden."（后门通向花园）。属正式/书面用法，小学阶段是否值得单独立幕待定。**本次未建 `vv_give_on` 页签、未恢复 `vv_give_on_1/2.js`，未改 units.json 以外的任何登记。** 如以后定夺要立：来源为 `d62026c^` 的 `vv_give_on_1/2.js`（标题「give on ①/②」）+ `INVENTORY_VV_GIVE_ON_EXPORT.md`，做法与本项相同（原文恢复 + units 登记 + 精灵 stub）；注意其 ACTS 帧为 `l_shutter` / `l_gdoor`。

## 5. 同步与提交

- 起点 HEAD 0ae1739；实施中远端前进至 e31dc96（含 8c7c133 Bug R18 + 两处文档提交）。同步时工作区有另一实施员（第 1/2 项）未提交的改动（主文件 +2 行、两份未入库底稿/脚本），未碰；本次 `git pull --rebase` 因工作区不干净被拒后核对：本地 HEAD 已是 e31dc96（= origin/master），无需 rebase。
- 提交（本项单独一 commit，消息参考仓库风格）：`Content：give back 另立 vv_give_back（由已下线 vv_give_down 原文恢复 2 幕）`。推送前再核对 origin/master 是否前进。
- SSH 说明：首次 `git pull --rebase` 报无密钥后，改用 `GIT_SSH_COMMAND='ssh -F /home/hatch/.ssh/config'`（协调提醒给的绕法）通过，未改动信任文件。

## 6. 未核实项与待定夺

- **未核实**：真机播放（探针只读打包 `__dur`，非真机计时）；人物帧实际渲染（空 stub 下帧不画，待 CAST 帧重建后才可见——与 vv_give_over 等幕现状相同）；① 22.2 秒偏短是否接受（内容短是原文如此）。
- **待定夺**：
  1. `wb13_phrasal.json` 是否需补 give back 记录（该文件是 72 格结构，back 不在 6 小品词内；补则需数据方定 schema，本次未动）。
  2. give on (onto) 是否另立（见 §4，内容已留存，只待一句话定夺）。
  3. ① 开场「give 没有常用的 down 搭配，这一格换成 give back」一句在新独立页签下是否改写（本次按「内容原文照录」保留；如要改写需另定夺——改写即新文案）。
  4. `vv_give_up_1.js` 等既有幕 import 的精灵文件盘上缺失、打包失败（本项实测发现的既有缺口，与 give back 无关，帧重建/补 stub 需另派）。
