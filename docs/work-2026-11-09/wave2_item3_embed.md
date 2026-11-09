# 第二波第 3 项：白板嵌入——卡住报告（管线锚点缺失，停手）

> 日期：2026-11-09 · 执行：白板嵌入实施员 · 仓库 master（起始 HEAD b32aa35，已与远端同步，工作区干净）
> 结论先行：**卡住，未嵌入任何一幕（0/578）。** `embed_app.py` 指向的旧文件已删；重定向到现主文件后，管线第一步即失败——现主文件是 2026-11-01 独立新建的原型，从未含过 v5 运行时钩子，17 个锚点全部为 0。按任务第 3 条（管线跑不通先不要硬改主文件大段结构），已停手，只做了一行指针重定向 + 本底稿，未改主文件一字。
> 提交：重定向 1 行 + 本底稿；主文件 `laws-prototype/mengxing-prototype-v1.html` 零改动。

## 0. 实测现状数字（2026-11-09，以磁盘与 units.json 为准）

| 项 | 实测 | 说明 |
|---|---|---|
| units.json 页签（顶层 key） | **232** | 第一波 186→234，3(b) 下线 give 减 2；与前稿一致 |
| units.json 登记 cases（幕）总数 | **578** | 分布：hd 328 / vv 154 / wo 30 / fp 22 / ze 11 / 其他 33；placeholder 0 处 |
| vv 页签 / vv cases | 78 / 154 | 场景文件 `vv_*.js` 154 个一一对应：78 个 ①（含 12 个核心义 `_core_1`）+ 66 个 ② + 10 个 ③（第 4 项拆分产物） |
| 场景磁盘文件总数 | **963** | `docs/whiteboard/v5/scenes/*.js`；已登记 578 个全部在盘（缺 0）；未登记 385 个（其中 `gen_*` 314 个，其余为 p2/p3/p4 变体、hd/wo 试点等） |
| 已打包 `out/*.html` | 89 个 | 旧包（对旧 App 的构建产物），本次未重建；与 578 登记幕无对应关系 |
| 生成器 `--check-only` 报“场景文件 89 个” | 89 | 生成口径，含已删 4 幕的旧口径——**不采用**，以磁盘 963 / 登记 578 为准（任务底稿已有此提示） |
| 现主文件 | **23,563,219 字节 / 22,131 行** | `laws-prototype/mengxing-prototype-v1.html`，嵌入前后体积无变化（未嵌入） |
| 旧文件（删前版，d1c946f^） | 17,575,968 字节 | 含 550 个 `wb5html-` 块、11 处 `WB5_EMBED`（见 §2 对照） |

定夺原文旧数字对照：任务称“79 幕 + 48 页签”已过时（第一波口径）；前稿 §0 的“vv 82 幕”是按“格”计的旧口径，与磁盘文件数 154 不一致——本次以 **232 页签 / 578 幕 / 963 场景文件** 为准。12 核心义幕 placeholder 已清（0 处），与前稿一致；R2 缺口（核心义幕无朗读句）未碰（不在本次范围）。

## 1. embed_app.py 原来怎么做嵌入（读码结论）

`docs/whiteboard/v5/embed_app.py`（用法：`embed_app.py <页签> <幕序号(0起)> <out.html> …`，幂等）：

1. **装运行时（只一次）**：在 `function wbStageHtml(tab, idx, withGloss = true, svgId = "wbStage") {` 之前插入约 200 行 `WB5_EMBED` 运行时（`wb5El / wb5StageHtml / wb5Mount / wb5Blob / WB5_PLAYER_CSS/JS` 等），并改写两处调用点：`wbStageHtml` 遇有 v5 版改走 iframe；`startSuperLabCanvasLoop` 遇 `wb5Frame` 改走 `wb5Mount`。
2. **扩展钩子**：`WB5_EMBED_V2`（fp/wo/ze 舞台）、`WB5_EMBED_VV`（万能动词剧场，`wbLoadModule("vv")` / `VV.has(comboKey)` 处）、`WB5_EMBED_HD2`（三大厅 HD 剧场 canvas 换 iframe，11 条 `HD_HOOKS` 按 canvas id 挂钩：formation / grammar / summary / oral / poly / wordcard / phonics / relations / frames / mindmap）、`WB5_EMBED_TPL`（单词卡模板 `wb5TplSwap`）。
3. **嵌幕**：每幕打包 HTML 经 gzip+base64 存进 `<script type="text/plain" id="wb5html-<页签>-<序号>" data-gz="1">`；≥2 KB 的图片/字体 data URI 按哈希抽成共享块 `wb5blob-<hash>`（引擎脚本整段抽成 `gz:` 共享块）；新块插在第一个 `wb5html-` 块之前（`ANCH`），无引用的旧共享块自动清掉。
4. **依赖**：`APP = ROOT / '萌星小学英语_最终合并版.html'`（已删文件，见 §2）；另有 `rebuild_all.py`（打包全部 `scenes/*_<n>.js` → `out/`，再逐页签调 `embed_app.py`）、`do_unit.py` / `batch.sh`（单页签流水线）、`app_check*.py`（回归，均指向已删旧文件）。

## 2. 卡点：17 个锚点在现主文件里全部为 0

现主文件 `laws-prototype/mengxing-prototype-v1.html` 全文 grep（`python3` 逐字计数，非 `grep -c` 行数）：

| 锚点（embed_app.py 依赖） | 现主文件 | 已删旧文件（d1c946f^） |
|---|---|---|
| `function wbStageHtml(tab, idx, withGloss = true, svgId = "wbStage") {`（运行时安装锚） | 0 | 1 |
| `const wbStage = document.getElementById("wbStage");`（super lab 循环挂钩） | 0 | —（旧文件有 `startSuperLabCanvasLoop` 2 处） |
| `wbLoadModule("vv")` / `VV.has(comboKey)`（VV 剧场钩） | 0 / 0 | 4（wbLoadModule） |
| 11 条 HD canvas（formation / grammar / summary / oral / wordModal / phonics / relations / frameSemantics / mindmap） | 全部 0 | —（旧文件体系） |
| `<script type="text/plain" id="wb5html-`（首块插入锚 `ANCH`） | 0 | 550 块 |
| `wb5html-` / `WB5_EMBED` / `super_lab_hub` / `ZE_READY` / `FP_READY` / `wbmod-` | 全部 0 | 550 / 11 / 11 / 1 / 0 / 3 |
| `wbGlossHtml` / `startWBLoop` / `hdTheaterState` / `superLabState` / `WB_LAB` / `wbStopSpeech` | 全部 0 | —（旧文件体系） |
| `navigateTo(`（旧 App 页面导航，app_check 回归所用） | 0 | — |

### 干跑证据（/tmp 副本，未碰真文件）

把主文件拷到 `/tmp/wb3dry/app.html`、把 `embed_app.py` 同步重定向到该副本后跑：

```
$ python3 /tmp/wb3dry/embed_app.py vv_climb_down 0 docs/whiteboard/v5/out/vv_climb_down_1.html
Traceback (most recent call last):
  File "/tmp/wb3dry/embed_app.py", line 84, in <module>
    i = s.index('function wbStageHtml(tab, idx, withGloss = true, svgId = "wbStage") {')
ValueError: substring not found
```

- 退出码 1；副本 md5 与原件逐字节一致（`ba5a5df26268f245d6e67ab12836e710`），即失败发生在任何写入之前。
- 即使跳过运行时安装，第二步也会在 `ANCH()` 的 `s.index('<script type="text/plain" id="wb5html-')` 上以同样方式失败——现主文件里连一块可锚定的旧幕都没有。11 条 `HD_HOOKS` 则会静默跳过（`s.count(a) != 1` 时 `continue`），V2/VV 段的 `assert` 同样会炸。
- 历史核查：`git log --all -S 'wbStageHtml' -- laws-prototype/mengxing-prototype-v1.html` 为空；该文件由 `9637c6e`（2026-11-01）新建为“独立 App 原型 v1（六区规律版）”，从未含过上述任何锚点。旧文件由 `d1c946f`（2026-11-03）删除，删前版仍有完整 v5 系统（上表右列）。

### 为什么不是“小修管线可通”

1. **没有可挂的调用点**：现主文件没有超级实验室（`super_lab_hub`）、没有 `wbStageHtml` 舞台渲染器、没有 VV 剧场、没有 11 个 HD canvas、没有 `navigateTo` 导航。v5 运行时要挂上去，得先在新 App 里新建一整套挂载面（舞台渲染 + 分幕切换 + 232 个页签到规律页/词页的映射入口），即任务明令“不要另发明一套”的东西。
2. **映射不存在**：232 个 units 页签名中只有 1 个（`pron_map`）在现主文件出现过；`tense_matrix / five_patterns / fp_economy / vv_go_up / hd_formation / wordcard_tpl` 均为 0。578 幕往哪挂，没有现成答案。
3. **与 App 自己的既定原则冲突**：现主文件内的 `WBIDX` 迁移台账（`renderWbindex`）写明——“老 App 有 549 页 WB5 白板，约 50 个主题。**两条处理原则：不整批搬旧格式；不在新 App 里养第二套播放器。**旧页本体完整保存在版本存档里，只读、随时可查。”各主题状态多为“规律页承接”或“待立项/待重制”（短语动词 vv：“84 页是最大待重制块，须单独立项”；一词多义：“逐词白板未立项”；思维导图：“未承接 · 待立项”）。这与 2026-11-03 Stewart 裁定（删老 App：“老 App 其余内容均被现行 App 覆盖或超越”，借鉴登记 `borrow-backlog.md`）一致。整批嵌 578 幕 iframe + 第二套播放器，等于推翻该裁定与台账原则——须 Priya/总协调人重新定夺，不是实施员能“最小 hooks”绕过的。
4. **体量**：578 幕打包后按旧 App 经验（508 幕约 15.6 MB 载荷，SOP §67）估算将给现 23.6 MB 主文件再加约 15 MB 以上，且 `out/` 现只有 89 个旧包，全量重建（`rebuild_all.py`，约 8 分钟 + embed 时间）须在挂载面定下来之后才有意义。
5. 现主文件自己的白板是另一套引擎：FA 旗舰白板课（wb2 SVG 移植，`wbRenderScene / wbInit` 等）与口语白板样板（`SPWB_SCENES`），不是 v5 iframe 体系——不能把 v5 运行时“顺手”挂到它们上面，那仍是另发明一套。

## 3. 本次实际改动（只两处，均不碰主文件与数据）

1. `docs/whiteboard/v5/embed_app.py`：`APP` 指针由已删的 `'萌星小学英语_最终合并版.html'` 改为 `'laws-prototype/mengxing-prototype-v1.html'`（1 行）。改后重跑仍报 §2 的 `ValueError`（锚点缺失），属预期——指针修对了，管线仍因结构缺失跑不通；该改动不改变主文件行为（脚本只在人工调用时运行）。
2. 本底稿 `docs/work-2026-11-09/wave2_item3_embed.md`。
3. 未碰：主文件、units.json、任何场景/生成器、`laws_master`、relations/synonym 数据、TODO 文档、任何 fp 代码（3(c) 卡住未做，维持）。

## 4. 验证

- `python3 laws-prototype/tools/check_all.py`：**24/24 通过**（“结论：全部通过”；改动前后均通过，主文件零改动）。
- `python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html`：**anchorcheck FAIL 116 项**，与起点 `e97aaec` 的失败集合逐项一致（`diff` FAIL 行排序后完全相同，116=116）。该 116 项本身即独立佐证：jscheck 期待的 `<!-- WB_STAGE:<页签> -->` 等挂载锚在现主文件里同样全部缺失。
- jsdom/Playwright 实测 app 内验证：**未做——无可验证对象**（0 幕挂载，无白板入口、无页签登记可对数）。干跑只做到脚本级（§2），未启动浏览器加载主文件（主文件本身未改动，无需回归探针）。
- 主文件体积：改前 23,563,219 字节 → 改后 23,563,219 字节（md5 `ba5a5df26268f245d6e67ab12836e710`，未变）。

## 5. 未核实项

- 真机播放未核实（无已挂载内容可播）。
- `out/` 89 个旧包是否还能逐幕打包通过未重测（与本次卡点无关；挂载面定下后须全量重建 + `r1v5` + 回归）。
- 578 幕全量嵌入后的真实体积增量未实测（§2 第 4 点为按旧 App 经验的估算）。

## 6. 需定夺（请 Priya / 总协调人三选一）

- **A. 恢复老 App 作嵌入目标**：把 `萌星小学英语_最终合并版.html` 从 git 历史恢复为独立文件（或另立白板 App），`embed_app.py` 指回它，578 幕按原管线嵌入；新 App 不动。代价：两套 App 并存。
- **B. 在新 App 立项设计新挂载面**：先定 232 页签 → 新 App 规律页/词页的映射与入口形态（列表明细/规律页内嵌/独立白板区），再按映射写新挂钩（不是复用旧 `wbStageHtml` 锚点），再全量打包嵌入。这是新设计工作，须先出方案给 Priya 拍板，且须推翻或修订 WBIDX“不养第二套播放器”原则与 2026-11-03 裁定。
- **C. 白板线独立、不嵌入新 App**：578 幕保留在 `docs/whiteboard` 研发线（场景源 + `out/` 打包产物可独立打开播放），新 App 按 WBIDX 台账继续用规律页与新引擎白板承接讲解；嵌入项关闭。

在定夺下来之前，第 3 项无可继续的实施动作；`rebuild_all.py` / `do_unit.py` / `app_check*.py` 同样指向已删旧文件，须随定夺结果一并改（本次未动它们）。

## 7. 定夺：选 C——白板线独立，关闭嵌入项（2026-11-09，主对话拍板）

- **定夺**：选 **C**。白板线独立、不嵌入新 App，关闭嵌入项。理由：现主文件 2026-11-01 新建时从未含 v5 钩子，17 个锚点全为 0；硬嵌要另发明一套挂载面，等于推翻 Priya 2026-11-03 删老 App 的决定和 WBIDX 台账“不在新 App 里养第二套播放器”的原则；578 幕保留在 `docs/whiteboard` 研发线（场景源 + `out/` 打包产物可独立打开播放），新 App 继续用自己的白板引擎承接。
- **已做的保留**：3(a) 12 核心义页转正、3(b) give down/on 下线均保留；本底稿 §3 第 1 点的 `embed_app.py` 指针重定向（e6cb314）保留——指针修对了，管线本身因结构缺失仍跑不通，该改动不改变主文件行为。
- **3(c) fp_boundedness 推广随嵌入关闭一并停手**：样板本身保留（不删），推广不再继续；样板与 v5.1 标准不符的核对结论见 `wave2_whiteboard_scenes.md` §5。
- **备选留档（供 Priya 以后改主意）**：A 恢复老 App 作嵌入目标（新 App 不动，两套 App 并存）；B 在新 App 立项设计新挂载面（先定 232 页签 → 规律页/词页映射与入口形态，须修订 WBIDX 原则与 2026-11-03 裁定）。`rebuild_all.py` / `do_unit.py` / `app_check*.py` 仍指向已删旧文件，随未来定夺结果一并改，本次未动。
