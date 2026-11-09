# 第五波第 7 项工作底稿：14 个 ptr 条目先修标题补 ROSTER 标题（2026-11-09）

> 定夺（主对话 Muse 已定，不重新定夺）：给 14 个 ptr 条目补先修标题，
> 来源与第四波第 5 项一致，用 ROSTER，逐条核对一字相同。
> 实施：`docs/work-2026-11-09/apply_wave5_item7_ptr_titles.py`（带断言手术
> 脚本，仿照第四波第 5 项，默认演练，`--apply` 写回）。

---

## 一、实施：preLawTitle 改按 hl 值回落（一行功能改动）

位置：主文件 LINKGO 块约 2761 行（`preLawTitle`），只动该函数与其两处
注释，`preBarHTML / preList / preShortTitle / preIsAdult / preMarkHTML`
未动：

```js
function preLawTitle(t){
  var e = window.LAWDATA && LAWDATA[t];
  if (e && e.hl) return e.hl;          // 改前：if (e) return e.hl || '';
  var r = window.ROSTER && ROSTER[t];
  return (r && r[0]) || '';
}
```

回落链由条目级改为 hl 值级：LAWDATA.hl → ROSTER[0] → 只写编号。
改前 LAWDATA 有条目即只取其 hl（无 hl 返回 `''`），14 个 ptr 条目
（LAWDATA 有条目、无 `hl` 字段）仍只写编号；改后它们回落取 ROSTER 标题。
头注释与 helper 注释同步改写口径（“LAWDATA 有条目时只取其 hl（无 hl
仍只写编号）”→“LAWDATA 无 hl 时回落取 ROSTER[0]”）。

14 条 ROSTER[0] 标题（已逐条核对，与 ROSTER 字面量一字相同）：

| 条目 | ROSTER[0] 全标题 | 芯片短标题（preShortTitle 截断后） |
|---|---|---|
| C-01 | 数不数得清，先看怎么看 | 数不数得清，先看怎么看 |
| C-04 | 换个看法，就换个说法 | 换个看法，就换个说法 |
| C-06 | a：认出是哪一类就行 | a（冒号处截断，既有规则） |
| C-07 | the：就是那一个 | the（冒号处截断，既有规则） |
| C-09 | 「心里有」不等于「对方知道」 | 「心里有」不等于「对方知… |
| C-10 | 中国孩子的冠词错：一个漏，一个滥 | 中国孩子的冠词错 |
| PR-01 | 代词先讲关系，再讲代替 | 代词先讲关系，再讲代替 |
| PR-05 | 英语的人称是「素颜版」 | 英语的人称是「素颜版」 |
| PR-07 | 英语的代词一个都不能少 | 英语的代词一个都不能少 |
| PR-08 | 英语每句都要先摆主语 | 英语每句都要先摆主语 |
| QI-01 | 缺哪块，派哪个疑问词 | 缺哪块，派哪个疑问词 |
| QI-02 | wh- 和 th- 是两家人 | wh- 和 th- 是两… |
| QI-05 | 新货压轴，句尾重读 | 新货压轴，句尾重读 |
| QI-13 | 疑问词要搬家到句首 | 疑问词要搬家到句首 |

截断规则不变（`preShortTitle`：冒号/破折号处截断，超 12 字截断加 …；
`title` 属性为全标题）。C-06/C-07 截后只剩 `a` / `the` 是既有截断
规则的正常结果（与第四波 TA-05 等站同规则），未另作处理。

## 二、前后数字对照（jsdom 运行时实测）

- 运行时 LAWDATA：390 条；LINKIDX.g：453 条，87 条有先修条。
- 全部 453 条 `preBarHTML` 前后比对（jsdom 导出改前/改后全量 JSON 再 diff，
  脚本 `/tmp/wave5/prebar_dump.js`，`LINKGO.preBarHTML`）：
  **变化 29 条，不变 424 条**。变化的 29 条全部是“裸编号 →《编号 短标题》”
  的加法，无一处删改已有标题：

| 先修目标 | 变化的站 |
|---|---|
| C-01 | C-02/03/04/11/16/17/18（7 条） |
| C-04 | C-05 |
| C-06 | C-14、C-19 |
| C-07 | C-08、C-09、C-19 |
| C-09 | C-10、C-20 |
| C-10 | C-20 |
| PR-01 | PR-02/03/04 |
| PR-05 | PR-06、PR-11 |
| PR-07 | PR-08 |
| PR-08 | PR-09、PR-10 |
| QI-01 | QI-04/09/10 |
| QI-02 | QI-03 |
| QI-05 | QI-06、QI-07 |
| QI-13 | QI-14 |

- 14 个标题逐条核对：改后 29 条里每个标题的短标题与上表一致，
  `title` 属性为全标题；不含 14 个目标的变化行 0 条。
- 已有 `hl` 的先修目标不受影响：其 `hl` 与 ROSTER`[0]` 31/31 相同，
  回落顺序变化也不会改动它们（424 条不变中已包含全部 TA/P 站）。
- 67 个 ptr 条目中只有这 14 个是先修目标，其余 53 个（C-02/03/05/08/
  11–20、GR-10/11/13/14/15/28/29/32/38、PR-02/03/04/06/09/10/11、
  QI-03/04/06–12/14/15、V-15/20/21/26/30/32–38）不是先修目标，
  本次无渲染变化。

## 三、验证结果

- jsdom（见 §二）：29 条变化、424 条一字不变；29 条逐条人工核对为
  裸编号加标题，无已有标题被改、无 `title` 属性丢失、无
  「（给爸爸妈妈看的）」文案变化。
- `python3 laws-prototype/tools/check_all.py`：本项只改 JS，改后终验
  在第 8、11 项合并后统一跑（见总底稿）；本项提交前单跑
  `check_js_syntax.py` 与 `gen_laws --check` 通过（见总底稿 §验证）。
- `python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html`：
  **node --check OK**（41 inline + 0 modules）；anchorcheck FAIL **116 项**，
  与 e97aaec 基线逐项集合比对一致（见第 10 项清查底稿），为基线遗留，
  非本项引入。

## 四、改动文件与提交

- `laws-prototype/mengxing-prototype-v1.html`：头注释 2 行、helper 注释
  3 行、`preLawTitle` 1 行（单独 commit）。
- `docs/work-2026-11-09/apply_wave5_item7_ptr_titles.py`：带断言手术脚本。
- 本文件 `docs/work-2026-11-09/wave5_item7_ptr_titles.md`。

提交：分支 `wave5/main-line` 上 `Content：第 7 项 preLawTitle 改按 hl 值回落，
14 个 ptr 条目先修条补 ROSTER 标题`（基于 d698a3c）。

## 五、未核实项

- 真机未核实：jsdom 只验 `preBarHTML` 返回的 HTML 字符串；未在真实
  浏览器看 C-02 等 29 站顶部先修条的实际呈现（芯片换行、`title` 悬停提示）。
- C-06/C-07 芯片短标题只剩 `a` / `the`（冒号截断的既有规则结果）：
  呈现上是否过短，由 Priya 或总协调人定夺是否另改截断规则，本次未动。
