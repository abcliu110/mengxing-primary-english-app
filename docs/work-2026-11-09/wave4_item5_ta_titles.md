# 第四波第 5 项工作底稿：preBarHTML 标题回落加 ROSTER，TA 先修条显示标题（2026-11-09）

> 定夺（主对话 Muse 已定，不重新定夺）：标题回落链改为 LAWDATA.hl →
> ROSTER/DATA.TA 标题 → 只写编号；已有 LAWDATA 的律渲染一字不变，
> 只有 TA 等非 LAWDATA 律多出标题。
> 实施：`docs/work-2026-11-09/apply_wave4_item5_ta_titles.py`（带断言手术
> 脚本，仿照第三波第 5 项，默认演练，`--apply` 写回）。

---

## 一、实施：新增 `preLawTitle(t)`，preBarHTML 改用它取标题

位置：主文件 LINKGO 块约 2761 行（`preBarHTML`），只动该函数与
其上方注释，另在 `preIsAdult` 之后插入 helper：

```js
/* 先修芯片全标题回落（第四波第 5 项）：LAWDATA 有条目时只取其 hl（无 hl 返回 ''，与改前一致）；
   LAWDATA 无条目时（如 TA 站）取 ROSTER[先修id][0]——已核对与 DATA.TA 的 head 18/18 相同；再无返回 ''。 */
function preLawTitle(t){
  var e = window.LAWDATA && LAWDATA[t];
  if (e) return e.hl || '';
  var r = window.ROSTER && ROSTER[t];
  return (r && r[0]) || '';
}
```

`preBarHTML` 的 chips 映射由

```js
var e = window.LAWDATA && LAWDATA[t];
var title = preShortTitle(e && e.hl);
…
return lawChip(pid, label, e && e.hl ? e.hl : '');
```

改为

```js
var full = preLawTitle(t);
var title = preShortTitle(full);
…
return lawChip(pid, label, full);
```

截断规则不变（`preShortTitle`：冒号/破折号处截断，超 12 字截断加 …）。
`preList / preShortTitle / preIsAdult / preMarkHTML / decorateIndexRows`
未动；`relSectionHTML` 的相关规律芯片（只列编号）不在本次范围。

### 为什么只用 ROSTER、不用 DATA.TA

- ROSTER 条目结构（`var ROSTER`，约 16102 行，全册 456 条）：
  `[标题, 分区, 层级('K' 儿童 / 'T' 成人), 路线, 别名指向]`，
  如 `TA-13: ['时刻表上的将来用现在时：因为时刻表把未来写成了「已定的事实」', 'TA', 'K', 'N', '']`。
  标题在 `[0]`，与 `preIsAdult` 已在用的全局同一来源。
- DATA.TA（VB 脚本块，约 11837 行，18 条）的 `head` 字段与 ROSTER`[0]`
  逐条核对 **18/18 一字相同**，查 DATA.TA 不会多出任何标题；且 DATA
  定义在后方的 VB 脚本块里，不宜从 LINKGO 块跨块引用。故回落链实际
  用 ROSTER 实现，DATA.TA 只作一致性核对，不新造数据源。

### 口径说明：回落以 LAWDATA 条目“有无”为界（见 §五待确认）

任务约束“已有 LAWDATA 的律渲染必须一字不变，只有 TA 等非 LAWDATA
律多出标题”，故 `preLawTitle` 是**条目级**回落，不是 hl 值级回落：
LAWDATA 有条目即只取其 hl（无 hl 返回 `''`，与改前一致），只有
LAWDATA 完全无条目时才取 ROSTER。14 个先修目标在 LAWDATA 里有条目
但无 `hl` 字段（皆为 ptr 型条目：C-01/04/06/07/09/10、PR-01/05/07/08、
QI-01/02/05/13），按此口径仍只写编号、渲染不变；若改按 hl 值回落，
这 14 条会多出 ROSTER 标题，是一行之改（去掉 `if (e)` 守卫），
请总协调人确认是否要改（§五第 1 条）。

### 静态分析曾走偏、已用运行时纠正

初版底稿曾按主文件第一处 `var LAWDATA` 字面量（224 条）统计，称
24 个先修目标无条目。运行时 jsdom 实测纠正：运行时 LAWDATA 共
**390 条**（基础 224 条 + `PHONLAWS` 合并（约 6814 行）+
`SUPPDATA` 合并（约 14376 行）），CB/CG/LS/VB/YL 类先修目标改前
已有标题（SUPPDATA 带 `hl`，与 ROSTER 标题一字相同，31/31 见 §二）。
真正无条目的先修目标只有 **10 个**。本节与脚本注释已按运行时
真相修正；静态字面量计数不能作为 LAWDATA 覆盖面的依据，特此记录。

## 二、前后数字对照（jsdom 运行时实测）

- 运行时 LAWDATA：390 条；LINKIDX.g：453 条，其中 87 条有先修条；
  不同的先修目标 pid 共 55 个：31 个有 `hl`、14 个有条目无 `hl`、
  10 个无条目。31 个有 `hl` 的，其 `hl` 与 ROSTER`[0]` **31/31 一字相同**，
  故即使回落顺序变化也不会影响它们。
- 全部 453 条 `preBarHTML` 前后比对（jsdom 导出改前/改后全量 JSON 再 diff）：
  **变化 17 条，不变 436 条**。变化的 17 条全部是“裸编号 →《编号 短标题》”
  的加法，无一处删改已有标题：

| 变化的条 | 先修目标 | 改前 | 改后（芯片文案；title 属性为全标题） |
|---|---|---|---|
| TA-03 | TA-01 | `TA-01` | 《TA-01 时态 = 时间 × 看法…》 |
| TA-06 | TA-05 | `TA-05` | 《TA-05 完成体看的是「过去的事和现在的牵连」》 |
| TA-07 | TA-03 | `TA-03` | 《TA-03 体是「看事情的方式」》 |
| TA-09 | TA-05 | `TA-05` | 《TA-05 完成体看的是「过去的事和现在的牵连」》 |
| TA-16 | TA-05 | `TA-05` | 《TA-05 完成体看的是「过去的事和现在的牵连」》 |
| P-01 | P-02 | `P-02` | 《P-02 原型不是凭感觉选的》 |
| P-02 / P-03 / P-07 / P-10 / P-15 | P-01 | `P-01` | 《P-01 一个介词 = 一张原型图…》 |
| P-06 | P-02 | `P-02` | 《P-02 原型不是凭感觉选的》 |
| P-08 | P-03、P-04 | `P-03`、`P-04` | 《P-03 in 的原型是「装进容器」》、《P-04 on 的原型是「贴面加承重」》 |
| P-09 | P-03、P-04、P-05 | `P-03`、`P-04`、`P-05` | 同上 +《P-05 at 的原型是「当成一个点」》 |
| P-13 | P-06 | `P-06` | 《P-06 over 的中心是「在上方」，不是「盖住」》 |
| P-14 | P-05 | `P-05` | 《P-05 at 的原型是「当成一个点」》 |
| P-16 | P-12 | `P-12` | 《P-12 谁做图形谁做背景》 |

- TA 站先修条：**5/5** 出现《TA-xx 标题》（TA-03/06/07/09/16，
  见上表）。注：任务书举例的 TA-13（时刻表）不是先修目标，
  不在本次变化中；其 ROSTER 标题与静态索引行标题在 `preShortTitle`
  截断后同为“时刻表上的将来用现在时”，口径一致。
- P-* 12 条同属“非 LAWDATA 律多出标题”，是回落链的同一类收益，
  非计划外改动。CB/CG/LS/VB/YL 类先修目标改前已有标题，本次 0 变化。
- 仍只写编号的先修目标：14 个 ptr 条目（§一口径说明）与无 ROSTER
  的编号（本次 0 个：55 个先修目标全在 ROSTER 中）。

## 三、验证结果

jsdom（脚本 `/tmp/domtest/wave4_item5_prebar_dump.js`，
`NODE_PATH=/home/hatch/workspace/domtest/node_modules`）：

- 改前导出 `wave4_item5_prebar_before.json`（453 条，87 条有先修条）；
  改后导出 `wave4_item5_prebar_after.json`；逐条 diff：**17 条变化、
  436 条一字不变**；17 条变化逐条人工核对为裸编号加标题（§二表），
  无已有标题被改、无 `title` 属性丢失、无 `（给爸爸妈妈看的）` 文案变化。
- 运行时探针（`/tmp/domtest/wave4_item5_runtime_probe.js`，对
  59844d7 原文件）：运行时 LAWDATA 390 条；55 个先修目标
  hl/ROSTER 对照如 §二；`hl` 与 ROSTER`[0]` 31/31 相同；
  DATA.TA head 与 ROSTER`[0]` 18/18 相同。

`python3 laws-prototype/tools/check_all.py`：本分支基底 59844d7 的
check_all 共 24 项（不含徽标门禁——门禁属第四波第 7 项门禁线，
提交 e6061ea，在 `wave4/gates` 分支上）。本项单独验证时未全量重跑
（第 6 项改动同一文件、终验在两项合并后统一跑，见第 6 项底稿 §三，
终验 24/24）；本项只改 JS，徽标门禁的失败项与改前基线相同
（10 行 E/W 徽标，第 6 项修，见另一底稿）。注意：本次工作初期在共享
工作树里跑 check_all 曾见到 `check_badge_erridx` 失败项，那是门禁线
当时在工作树里的未提交版本带进来的，不代表 59844d7 的 check_all
（24 项）本身失败——基底 24 项终验全绿。

`python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html`：
**node --check OK**（41 inline + 0 modules）；anchorcheck FAIL **116 项**，
与 e97aaec 基线逐项集合比对一致（`diff` 为空），为基线遗留，非本项引入。

## 四、改动文件与提交

- `laws-prototype/mengxing-prototype-v1.html`：§2.2 注释 1 行改写、
  新增 `preLawTitle`（8 行）、`preBarHTML` chips 映射 4 行改写（单独 commit）。
- `docs/work-2026-11-09/apply_wave4_item5_ta_titles.py`：带断言手术脚本。
- 本文件 `docs/work-2026-11-09/wave4_item5_ta_titles.md`。

提交：分支 `wave4/mainfile` 上 `Content：preBarHTML 标题回落加 ROSTER，
TA 先修条显示标题`（基于 59844d7；哈希见总协调人的合并记录，
勿在本文中硬编码以免 amend 后失真）。

## 五、未核实项与新发现的待定夺

1. **待确认：14 个 ptr 条目的先修标题是否也补**（C-01/04/06/07/09/10、
   PR-01/05/07/08、QI-01/02/05/13）。本次按任务约束“已有 LAWDATA 的律
   一字不变”未补，仍只写编号。若总协调人改按 hl 值回落（hl 空即取
   ROSTER），这 14 条会多出标题，是一行之改。需 Priya 或总协调人一句话定夺。
2. **未核实：真机未核实**。jsdom 只验 `preBarHTML` 返回的 HTML 字符串；
   未在真实浏览器看 TA-03 等 5 站顶部先修条的实际呈现（芯片换行、
   `title` 悬停提示）。
3. **顺带发现：静态字面量 ≠ 运行时 LAWDATA**。`var LAWDATA` 字面量
   224 条，运行时经 PHONLAWS/SUPPDATA 合并为 390 条；此后凡以
   “LAWDATA 有无”作判断的核对，必须以运行时为准，静态计数会误判
   （本次初版统计即因此走偏，已纠正）。
4. **顺带发现：`hl` 与 ROSTER`[0]` 31/31 相同**。先修目标的两个标题源
   实际同源；将来若一处改名另一处不同步，先修条会取 LAWDATA 的旧名。
   是否需要一道“LAWDATA.hl × ROSTER[0]”对账检查，请总协调人定夺。
