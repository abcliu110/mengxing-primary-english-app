# 第六波主文件线 B 总底稿：第 9、11 项全部落地（2026-11-09）

> 起点 HEAD `788f0bd`（第五波完成，check_all 27/27）；终点 HEAD 见提交清单；
> check_all 仍为 **27 项**，全部通过。
> 定夺：主对话 Muse 已定（第六波第 9、11 项），本波只实施、不重新定夺。
> 工作方式：linked worktree `~/workspace/wave6-main-b`（home 磁盘，非 /tmp），
> 分支 `wave6/main-b`，全部工作在该分支上，master 未动、无 force-push、
> 未 push 到 origin（总协调人统一合并）。

## 0. 提交清单（`788f0bd..HEAD`，线性历史，2 提交 + 本总底稿提交）

| 提交 | 内容 |
|---|---|
| `d53c80e` | Docs：第 9 项 anchorcheck 正式废止（RETIRED 标记 + jscheck 跳过锚点检查） |
| `e30ac13` | Content：第 11 项 v-tech 530 行 data-tec 徽标纳入徽标对账门禁（299→829 行） |
| （本稿提交） | Docs：第六波主文件线 B 总底稿 |

## 1. 按项汇报

### 第 9 项：anchorcheck 正式废止 ✅（`d53c80e`）

- 立 `docs/whiteboard/src/anchorcheck.RETIRED.md`（参照 r2check 前例）：
  废止依据 A 类 116 / B 类 0 / C 类 0，快照在第五波
  `wave5_anchorcheck_triage.json`；本波废止前重跑，116 项与快照逐项一致。
- `jscheck.py` 不再调用 anchorcheck，退出码只由 node --check 决定；
  改前退出码 1（116 项失败），改后退出码 **0**（node --check OK，
  41 inline + 0 modules，无 anchorcheck 行）。
- 调用排查：全仓库 `import anchorcheck` 只剩 jscheck.py（活调用，已跳过）
  与 appwrite.py（死代码：目标老文件已删、调用者全是已执行过的一次性补丁
  脚本、现行流程无引用，未动，见 §4 待定夺 1）。
- `check_js_syntax.py` 逻辑未动，docstring 与通过注记改写为“anchorcheck
  已废止”；`check_all.py` jscheck 行 docstring 同步改写。
  不补锚点、不改期望值、不列入门禁；`anchorcheck.py` 本体保留未删。
  详见 `wave6_item9_anchorcheck_retire.md`。

### 第 11 项：v-tech 区 data-tec 徽标纳入对账 ✅（`e30ac13`）

- 扫面：v-tech 区全部 **530 行** data-tec 行（痛点组 224、路组 153、
  区组 153），**0 行不符、0 行修**，主文件一字未动，故无手术脚本。
- 三组口径（不套 ERRIDX，TEC-* 不入 laws_master）：痛点组徽标 = 路名
  （class ok）；路组徽标 = 区名（class ok）；区组徽标 = 先行（108）/
  进阶（4）/ 顺序见页内（41，按 hint 开头三分），class part。另核对标题
  （530/530 与 TECDAT name 一字相同）、分组归属、18 个分组头计数、
  行集合（痛点对集 224 对、路组/区组 id 集各 153 条恰相等）。
- 门禁扩面：`check_badge_erridx.py` 299 行 → **829 行**，同一脚本、
  同一 check_all 项（项数不变，仍为 27）；`check_all.py` docstring
  徽标行同步改写。门禁先行通过（0 不符，与扫面逐行一致，未为通过而放宽）；
  反向自证 4/4（痛点组/路组/区组徽标、分组头计数各改 1 处，各报且只报
  1 行）。详见 `wave6_item11_vtech_badges.md` +
  `wave6_item11_vtech_selfproof.py`。

## 2. 验证总览（最终 HEAD）

- `python3 laws-prototype/tools/check_all.py`：**27/27，“结论：全部通过”**
  （项数不变；徽标门禁扩面未新增项，仍为同一 `check_badge_erridx` 项；
  jscheck 项仍为同一 `check_js_syntax` 项）。
- `python3 laws-prototype/tools/check_badge_erridx.py`：PASS（829 行：
  ERRIDX 区儿童行 112 行徽标全对、教师行 21 行在位，拼读区 52 行、
  家长区 114 行按各自口径全对；v-tech 530 行按三组口径全对；
  ERRIDX 524 条 / 覆盖 311 律）。
- `python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html`：
  node --check OK（41 inline + 0 modules），退出码 0，无 anchorcheck 行。
- `python3 laws-prototype/tools/check_js_syntax.py`：PASS。
- 反向自证（第 11 项）：4/4 各报且只报 1 行（脚本见 §5）。
- 提交前 `python3 -m py_compile` 改动 py 文件通过；`git show` 逐行核对落点。

## 3. 前后数字对照

| | 改前（788f0bd） | 改后（本分支） |
|---|---|---|
| check_all 项数 | 27 | **27**（不变；两项皆未新增门禁项） |
| check_all 通过 | 27/27 | 27/27 |
| 静态徽标门禁覆盖 | 299 行 | **829 行**（+ v-tech 530 行） |
| 静态徽标不符行 | 0 行 | 0 行（v-tech 530 行全对，无修） |
| jscheck 退出码 | 1（anchorcheck 116 项失败） | **0**（只跑 node --check） |
| anchorcheck 状态 | 基线失败 116 项（未分类处置） | **正式废止**（RETIRED 标记） |

## 4. 同步与提交

- 分支 `wave6/main-b`（基于 788f0bd），2 提交 + 本总底稿提交，线性历史，
  无合并提交、无 force-push；master 未动；**未 push 到 origin**，
  待总协调人统一合并。
- 工作树 `~/workspace/wave6-main-b`（home 磁盘），汇报后先留着不要删，
  协调人合并后统一清理。

## 5. 工作底稿（`docs/work-2026-11-09/`）

- `wave6_item9_anchorcheck_retire.md`（第 9 项）
- `wave6_item11_vtech_badges.md`（第 11 项）
- `wave6_item11_vtech_selfproof.py`（第 11 项反向自证脚本）
- 本总底稿 `wave6_main_b.md`

## 6. 未核实项

- 真机未核实：两项皆不改主文件内容与呈现（第 9 项只改检查脚本与标记；
  第 11 项主文件一字未动），无真机验证面；v-tech 徽标的真实浏览器颜色
  呈现未看（样式未动，应与既有同款一致）。

## 7. 新发现的待定夺（均未擅自做）

1. `appwrite.py` + 约 30 个一次性补丁脚本（`patch_*.py` 等）是否连同
   anchorcheck 一并退役清理（第 9 项底稿 §五）。
2. `SOP.md` §83/§88/§227、`HANDOFF.md`、`MASTER_DESIGN.md`、`runall.py`
   头注里仍把 anchorcheck 写成现行检查，是否改写（第 9 项底稿 §五；
   r2check 同款问题留到了第六波第 5 项统一改写）。
3. v-tech 区组 41 条“顺序见页内”兜底口径：是否应统一改写这 41 条 hint
   开头以消除兜底档，或把该口径成文（第 11 项底稿 §六）。
4. 《数据源规范》§6 的静态徽标门禁行仍写“全部 299 行”，现已是 829 行；
   是否同步修订（§8 规定修订须经 Stewart 确认），请总协调人安排
   （第 11 项底稿 §六）。
5. TECDAT 为主文件内手写字面量，无 model 事实源与生成器；本次对账是
   同一文件内索引行 vs 详情字面量的交叉核对，TECDAT 本身若有错门禁查不出
   （与拼读区口径同构的风险，已登记，第 11 项底稿 §六）。
