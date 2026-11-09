# 第六波第 8 项工作底稿：CO-17 补 data-law 行，不补独立规律页（2026-11-10）

> 定夺（主对话 Muse 已定，不重新定夺）：CO-17 无 LAWDATA 条目、无独立
> 规律页，索引里没它的位置就是不可达；独立规律页需要完整律内容，现有
> 材料里没有。只给它加一行 data-law（索引可达），内容以现有 CO-17 材料
> 为准（标题/指向）；无材料的部分留空并记入底稿。

## 一、CO-17 现有材料（实施前实测，不编造）

| 材料 | 内容 |
|---|---|
| ROSTER | `['英语把「做事」交给空心动词：动词管语法，名词装事情；get 一个词收成五个构造', 'CO', 'K', '', '']`——route 为空，即 20 条“暂无讲解页”之一 |
| 运行时 LAWDATA | 无 CO-17 条目（运行时 390 条） |
| laws_master lawdata | 仅 `{cases: 2, id}`——cases 2 条即 ERRIDX 再生 2 条，运行时 ERRIDX 亦 2 条；quiz 0、prb 0、无 hl |
| LINKIDX.g | `{'p': ['CO-12'], 'k': ['CO-02', 'CO-08', 'CO-12']}`——先修 CO-12 |
| 深研单元 | `LESSONS.co17`（`CO-17 · 空心动词与 get 五构造`），视图 `#v-u-co17` |
| 现有索引行 | v-vocab 与 v-grammar2 各一 data-go 深研行 u-co17（徽标 st deep「已做深」）；v-grammar2 的一行为“空心动词 + get 五构造（在词汇解码区做深）” |
| 点行落点 | `LAWFLAG = {'V-33':'u-v33','V-40':'u-v40','GR-33':'u-gr33','CO-17':'u-co17'}`；`LAW.open` 先查 LAWFLAG 再查 LAWDATA；`LINKGO.hasLawPage('CO-17')` 为真——新行点开即进深研单元，无需新接线 |

## 二、实施：新行 + 门禁转特殊行

主文件 `laws-prototype/mengxing-prototype-v1.html`：

1. **新行**（#v-grammar2 构式组，CO-16 行之后、原 data-go 深研行之前）：
   `<div class="urow" data-law="CO-17"><span class="id">CO-17</span><span class="tt">空心动词 + get 五构造</span><span class="st deep">已做深</span></div>`
   标题取自同区现有深研行标题去掉括号说明（“空心动词 + get 五构造”）；
   徽标沿用深研行同款 st deep「已做深」。原两处 data-go 深研行保留不动。
2. **组标题**由“构式（CO-01 – CO-16；CO-17 在词汇解码区已做深）”改为
   “构式（CO-01 – CO-17；CO-17 在词汇解码区已做深）”（只扩范围）。

门禁 `laws-prototype/tools/check_badge_erridx.py`（CO-17 从“排除项”转为
“特殊行”，与 V-33/V-40/S-44 的排除口径并列登记）：

- 行集合：v-grammar2 不再剔除 CO-17，门禁覆盖 **299 → 300 行**。
- 新行只核对三事：徽标 deep/「已做深」；LAWFLAG 指向 u-co17（只在
  `var LAWFLAG={...}` 字面量内核对——全文搜会误中 relSectionHTML 的
  另一张同名映射表，见 §五）；运行时 ERRIDX 与再生一致（2 条）。
  不套 ERRIDX 口径（无 LAWDATA、无 quiz，无从断 ok/part）。
- 其 data-go 深研行仍须在位（去处核对保留）。

同步改写：`tools/check_all.py` docstring 徽标门禁行（299 → 300 行）；
`laws-prototype/DATA_SOURCE_SPEC.md` §6（299 → 300 行 + CO-17 深研行
一句）。§6 修订按该规范 §8 待 Stewart 确认（与第五波第 9 项同例，
见 §六）。

## 三、前后数字对照

| | 改前（7703fc5） | 改后 |
|---|---|---|
| #v-grammar2 data-law 行 | 31 行（CO-01–16 + QI-01–15） | **32 行**（+ CO-17） |
| 静态徽标门禁覆盖 | 299 行 | **300 行** |
| 门禁排除项 | 4 条（V-33、V-40、CO-17、S-44） | 3 条（V-33、V-40、S-44）+ CO-17 特殊行 1 行 |
| CO-17 索引可达 | 仅 data-go 深研行（组内） | data-law 行（CO 序列内）+ 原深研行 |
| ERRIDX CO-17 | 再生 2 / 运行时 2 | 不变 |

## 四、验证结果

- jsdom（`/tmp/wave6a/jsdom_item8.js` + `jsdom_item8b.js`）：v-grammar2
  data-law 行 32 行，CO 序列 CO-01–CO-17 连续；新行紧邻 CO-16 之后、
  data-go 深研行之前；`LAWFLAG['CO-17']` 为 `u-co17`、
  `LINKGO.hasLawPage('CO-17')` 为真；点行后 `.view.on` 由 `v-home`
  变为 `v-u-co17`（且仅该视图在位）；运行时先修标记如期出现
  （`.lz-pre`「⏳ 先修 CO-12」，与 LINKIDX.g CO-17 p 一致；首探针
  因 jsdom DOMContentLoaded 时序未见标记，load 后复核在位——见 §六注）。
- `python3 laws-prototype/tools/check_badge_erridx.py`：**PASS**（300 行：
  ERRIDX 区儿童行 112、教师行 21、拼读区 52、家长区 114、CO-17 深研行
  1 行在位；ERRIDX 524 条 / 覆盖 311 律）。
- 反向自证（/tmp 副本，仓库文件未动）：新行徽标 deep→ok，门禁报且只报
  1 行（CO-17 徽标应为 deep）；只改 LAWFLAG 内 `CO-17 → u-co99`
  （relSectionHTML 的同名映射不动），门禁报且只报 1 行（LAWFLAG 未指
  向 u-co17）——特殊行三项断言双向都受检。
- `python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html`：
  **node --check OK**（41 inline + 0 modules）；anchorcheck FAIL **116 项**，
  为基线遗留（见第五波第 10 项清查），非本项引入。
- 可复现性：手术脚本在 7703fc5 四文件上重跑，输出与当前四文件逐字节
  一致（`/tmp/wave6a/repro`，已清理）。
- `git diff` 核对：主文件 +2/-1 行（新行 1、组标题 1）、门禁 +46/-18 行
  （含 docstring 与特殊处理）、check_all docstring +3/-2、规范 §6 +1/-1。

## 五、改动文件与提交

- `laws-prototype/mengxing-prototype-v1.html`：新行 1 + 组标题 1（单独 commit
  的一部分，见下）。
- `laws-prototype/tools/check_badge_erridx.py`：CO-17 转特殊行。
- `laws-prototype/tools/check_all.py`：docstring 徽标门禁行。
- `laws-prototype/DATA_SOURCE_SPEC.md`：§6 行数同步。
- `docs/work-2026-11-09/apply_wave6_item8_co17_row.py`：带断言手术脚本
  （默认演练，`--apply` 写回；已实施后拒绝重复写回）。
- 本文件 `docs/work-2026-11-09/wave6_item8_co17_row.md`。

提交：分支 `wave6/main-a` 上 `Content：第六波第 8 项——CO-17 补 data-law 行，
不补独立规律页`（基于 7703fc5）。注：LAWFLAG 断言的作用域收紧
（全文搜 → 只在 `var LAWFLAG={...}` 内核对）是在首版 --apply 之后、
提交之前发现的——反向自证 2 暴露全文搜会误中另一张映射表；已同步改
门禁与手术脚本，并以 §四的可复现性重跑验证脚本与门禁一致。

## 六、未核实项与待定夺

- 真机未核实：jsdom 只验 DOM 与点击路由；未在真实浏览器看新行在 CO
  序列里的实际呈现、点行进深研单元后的返回路径（`LAW.back` 回语法区）
  与深研单元本身的显示。
- jsdom 时序注：首探针在构造器返回后立即读 DOM 时新行尚无 `.lz-pre`
  标记（`decorateIndexRows` 挂在 DOMContentLoaded 上，jsdom 里该事件
  在 load 前才派发）；load 事件后复核标记在位（「⏳ 先修 CO-12」），
  其余 31 行同机制，不影响结论。
- **留空记入底稿（定夺原文）**：CO-17 仍无 LAWDATA 条目、无独立规律页、
  无 quiz——新行徽标「已做深」只说明内容在深研单元，不代表它有了规律页
  或练习；ROSTER route 仍为空，仍是 20 条“暂无讲解页”之一。是否补独立
  规律页、是否给它配练习，待 Priya / 总协调人另行定夺，本波不补内容。
- 《数据源规范》§6 本次修订（299 → 300 行 + CO-17 一句）按 §8 待
  Stewart 确认——与第五波第 9 项同例，请总协调人安排。
- 新发现：CO-17 的 data-law 行与紧邻的 data-go 深研行标题几乎相同
  （一为“空心动词 + get 五构造”、一为“空心动词 + get 五构造（在词汇
  解码区做深）”），列表里连着出现两行 CO-17；本次按“加一行”定夺保留
  两行，未合并——是否嫌重复、要不要把深研行改成纯说明行，请总协调人
  定夺。
