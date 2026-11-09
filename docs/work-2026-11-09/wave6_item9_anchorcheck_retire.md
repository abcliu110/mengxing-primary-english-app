# 第六波第 9 项工作底稿：anchorcheck 正式废止（2026-11-09）

> 定夺（主对话 Muse 已定，第六波第 9 项）：anchorcheck 正式废止。
> 本项只实施、不重新定夺。基线 HEAD `788f0bd`，分支 `wave6/main-b`。
> 实施参照 r2check 前例（`docs/whiteboard/src/r2check.RETIRED.md`）：
> 立 RETIRED 标记，不删文件。

---

## 一、废止依据（第五波第 10 项清查结论，全数复核一致）

- 116 项全部是 A 类（已删旧文件 / 旧白板的残留锚），B 类现文件真实缺失
  0 项，C 类其他 0 项。快照：
  `docs/work-2026-11-09/wave5_anchorcheck_triage.json`。
- 本波废止前在基线 HEAD 上重跑 jscheck：`node --check OK`（41 inline +
  0 modules），anchorcheck FAIL 116 项；116 项原文排序后与第五波快照
  diff **完全一致**（116/116），是冻结基线，不是新增缺失。
- 它守护的写入工具（`insert_wb.py`、`docs/home/step*.py`）均已删除/停用，
  被守护的老合并版主文件已于 2026-11-03 由 `d1c946f` 删除；现行主文件
  从未含这些锚点；登记表 `wb_registry.json` 自 `7f7ecce` 起冻结；
  白板嵌入已定为 C（白板线独立、不嵌入新 App）。

## 二、调用排查：jscheck.py 之外是否还有调用

全仓库 grep `import anchorcheck`（代码调用）只剩两处：

| 调用者 | 状态 | 处理 |
|---|---|---|
| `docs/whiteboard/src/jscheck.py:22` | **现行唯一活调用**：末尾跑 anchorcheck，失败则退出码 1 | 本项跳过调用（见 §三） |
| `docs/whiteboard/src/appwrite.py:8` | **死代码**：`save()` 写前调 `anchorcheck.check(s)`，但 `APP` 指向已被删除的老合并版文件（工作树与 HEAD 里都不存在，`git ls-files` 计数 0）；调用者约 30 个 `patch_*.py` / `build_etym_db.py` / `gen_module_quiz.py` / `split_vocab.py` / `retire_canvas.py` 全是已执行过的一次性补丁脚本；`check_all.py`、`runall.py`、`SOP.md` 均无任何对 appwrite / 这些补丁脚本的现行引用 | **未动**，留待定夺（见 §五） |

其余命中皆为文档记述（`CHANGELOG.md` 历史条目、`HANDOFF.md`、
`MASTER_DESIGN.md`、`SOP.md` §83/§88/§227、`runall.py` 头注），不是
代码调用；另 `insert_wb.py` 已不在仓库。`anchorcheck.py` 本体保留未删
（appwrite 仍 import 它，删文件会让该 import 报错）。

判定：现行流程里只有 jscheck.py 调用 anchorcheck，执行任务书第一分支
（jscheck 里跳过 + 留注记）；appwrite 那个调用不属于现行依赖，故不动它，
如实记入本稿与 RETIRED 标记，交总协调人定夺是否连同 appwrite 一并退役。

## 三、改动

- 新建 `docs/whiteboard/src/anchorcheck.RETIRED.md`：废止依据（A 116 /
  B 0 / C 0、快照路径）、本波改动、残留调用/记述清单、替代验证法
  （build 打包 + grep + durcheck + wbtextcheck + jscheck node --check）、
  不做事项（不补锚点、不改期望值、不列入门禁）。
- `docs/whiteboard/src/jscheck.py`：删末尾 anchorcheck 调用（import、
  check、FAIL anchor 打印、汇总行），退出码只由 node --check 决定；
  头注与末尾留注记指向 RETIRED 标记。未动 node --check 抽取逻辑。
- `laws-prototype/tools/check_js_syntax.py`：逻辑未动（仍只取
  `node --check:` 汇总行定通过与否；anchorcheck 行忽略分支保留作防御性
  代码）；docstring 与通过注记改写为“anchorcheck 已废止”（旧 docstring
  “jscheck 本身还跑 anchorcheck”“没有只跑语法的开关”在新行为下已失实，
  不改会误导后人）。
- `laws-prototype/tools/check_all.py`：jscheck 行 docstring 一行同步改写
  （“anchorcheck 基线不计入”→“anchorcheck 已于 2026-11-09 第六波废止”）。
- 未动：`anchorcheck.py`、`appwrite.py`、`wb_registry.json`、
  `SOP.md` / `HANDOFF.md` / `MASTER_DESIGN.md` / `CHANGELOG.md` /
  `runall.py`（白板线共享文档与 runner，沿 r2check 前例留待总协调人定夺
  是否改写；CHANGELOG 历史条目本就不应改写）。

## 四、验证

- 改前基线（788f0bd）：`python3 docs/whiteboard/src/jscheck.py
  laws-prototype/mengxing-prototype-v1.html` → node --check OK，
  anchorcheck FAIL 116 项，退出码 1；与第五波快照逐项一致。
- 改后：同一命令 → 只输出 `node --check: inline scripts=41,
  lazy modules=0 → OK`，无任何 anchorcheck 行，**退出码 0**。
- `python3 laws-prototype/tools/check_js_syntax.py` → PASS（41 inline +
  0 modules；anchorcheck 已废止注记），退出码 0。
- `python3 laws-prototype/tools/check_all.py` → **27/27，结论：全部通过**
  （见总底稿；项数不变，jscheck 项仍为同一项）。
- 提交前 `python3 -m py_compile` 三个改动 py 文件通过；
  `git show` 逐行核对落点（见提交 d53c80e）。

## 五、未核实项与新发现的待定夺

- 真机未核实：本项只改检查脚本与标记，不改主文件内容与呈现；无真机验证面。
- 待定夺 1：`appwrite.py` + 约 30 个一次性补丁脚本（`patch_*.py` 等）
  是否连同 anchorcheck 一并退役清理。它们的目标文件已删、现行流程无调用，
  但 appwrite 仍是 `save()` 写前 anchorcheck 的唯一残留调用者；本项未擅动，
  请总协调人定夺（删 / 立 RETIRED 标记 / 原样保留作历史脚本）。
- 待定夺 2：`SOP.md` §83/§88/§227、`HANDOFF.md`、`MASTER_DESIGN.md`、
  `runall.py` 头注里仍把 anchorcheck 写成现行检查，是否改写（r2check
  废止时同款问题留到了第六波第 5 项统一改写；anchorcheck 是否同批处理，
  请总协调人定夺）。
- 《数据源规范》§6 未动：本项不涉及数据口径，无需修订。

## 六、提交

- `d53c80e` Docs：anchorcheck 正式废止——立 RETIRED 标记，jscheck 跳过锚点检查
  （`anchorcheck.RETIRED.md` 新建；`jscheck.py`、`check_js_syntax.py`、
  `check_all.py` docstring 同步改写）。
