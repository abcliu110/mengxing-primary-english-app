# 第三波第 1 项工作底稿：openTA 接标准先修条（2026-11-09）

> 定夺（主对话 Muse 已定）：时态站 openTA 接标准先修条（顶部先修条 +
> 相关规律块）；行内 DATA.rel 的 5 条前置边故意保留。
> 实施：`docs/work-2026-11-09/apply_wave3_item1_openTA.py`（带断言手术脚本，
> 默认演练，`--apply` 写回）。

---

## 一、前置阻塞：HEAD（e31dc96）的 8c7c133 把整站 JS 打断了

### 发现

接完两行、跑 jsdom 验证时，页面脚本报 `SyntaxError: missing ) after argument
list`，`window.show is not a function`，`VB.openTA` 无法执行。排查时本地
HEAD 为 e31dc96（另一实施员刚推送的 8c7c133 等提交在此期间落地）：

- `node --check` 单独验 41 个内联脚本：只有第 13 个（约 8877 行，含 R16
  `.gh` 折叠块）失败，报错点在其第 182 行；
- 同一脚本在 0ae1739（8c7c133 之前）`node --check` 通过（rc=0）；
- 8c7c133「Bug R18」Bug 2 的 diff：删了 `if(allAdult){` 这一行，却留下了它
  的闭合 `}`——新结构里 `forEach(function(gh){…})` 多出一个 `}`，
  括号扫描证实：第 182 行 `}` 后大括号深度归 0，第 183 行 `});` 的 `}`
  使深度变为 -1。

### 影响

第 13 个内联脚本整体解析失败 → `window.show` / `mxBackTo` /
`applyAdultZones` 等均未定义 → 真机上导航（`show('v-ta')` 等）全部失效，
不只是 TA 站。这是 8c7c133 引入的回归，不是本项引入的。

### 修复（单独一 commit，不混入本项）

- 删 1 行：`if(hasAny && onlyAdult) gh.classList.add('adult-row');` 后的
  多余 `  }`（锚点全文全文件唯一 1 处），恢复与删 `if(allAdult){` 之前
  相同的括号结构；其余 8c7c133 改动（probe 提示、错句区静态计数）一字未动。
- 修复后：第 13 脚本 `node --check` 通过；全文件 jscheck `node --check:
  inline scripts=41 → OK`；jsdom 可正常 `VB.openTA`。
- 修复 commit：`Bug：删 8c7c133 误删 if(allAdult){ 后残留的多余 }（第 13 内联
  脚本解析失败，整站 show/导航失效）`（待填哈希，见 §五）。

---

## 二、实施：openTA 内两处接入（主文件 +2 行）

接法照第一波 2.2 的既有调用点，不改共享函数 `preBarHTML` /
`relSectionHTML` 本身：

| 位置 | 接入行 | 对位 |
|---|---|---|
| 顶部：标题 + 时间机器预设行之后、讲解（机制）之前 | `if(window.LINKGO&&LINKGO.preBarHTML){h+=LINKGO.preBarHTML(id);}` | LAW.render（uhead 后、kid 文前）、PN vLaw（正式说法后、kidbox 前）、MZ lawBodyHTML（meta 行后、机制段前） |
| 底部：亲戚条之后、页尾“版式借鉴 Murphy”注记之前 | `if(window.LINKGO){h+=LINKGO.relSectionHTML(id,'sec');}` | LAW.render（练习后、adultHtml 前）的底部相关规律块；flavor `'sec'` 与 PN/AR vLaw 同口径 |

未动：行内 `DATA.rel`（5 条前置边：TA-03→TA-01、TA-06→TA-05、
TA-07→TA-03、TA-09→TA-05、TA-16→TA-05）一字未动，“亲戚条”芯片照常
渲染；`lawSectionHTML`（“这条规律管的词”）未接——任务只定顶部条 +
相关规律块，且 TA 在 LINKIDX.l 里无词关联（返回 `''`，接了也是空）。

---

## 三、前后数字对照

| 口径 | 接入前 | 接入后 |
|---|---|---|
| TA 站出现 `lz-prebar`（顶部先修条） | 0/18 站 | **5/18 站**（TA-03、TA-06、TA-07、TA-09、TA-16，即全部 p 非空站） |
| TA 站出现“🔗 相关规律”块 | 0/18 站 | **18/18 站**（每站 LINKIDX.g 均有 p/q/k/c 至少一组） |
| LINKIDX.g p 槽（TA） | 5 条 | 5 条（未动） |
| LINKIDX.g q 槽（TA） | TA-01→[TA-03]、TA-03→[TA-07]、TA-05→[TA-06、TA-09、TA-16] | 未动 |
| “亲戚条”芯片 | 18 站均有 | 18 站均有（未动；TA-03 仍含 `TA-01 · 前置`） |
| 主文件行数 | openTA +2 行（单计本项两行 +123 字节）；brace 修复 -1 行（单独 commit） | 终验时主文件 18,573,919 字节——含另一实施员未提交的 LINKIDX 再生成行（第 2 项 88 边迁入后的再生，1 行），不属于本项改动，提交时未一并暂存 |

注：18 站全有 g 条目——除 p/q 外，同族/对照也已在总表（k/c 槽），
如 TA-02 的 g 为 `{k:[TA-01,TA-10,TA-11,TA-13,TA-08]}`，故其相关规律块
只出“👨‍👩‍👧 同族”组、无“前置”组、无顶部条，符合“无先修时顶部条整块
不渲染”的 2.2 口径。

---

## 四、验证结果

jsdom（`~/workspace/domtest/node_modules` 的 jsdom，脚本见
`/tmp/domtest/wave3_item1_verify.js`、`wave3_ta_g.js`）：

- 18 站逐站核对：`hasPre == (p 非空)`、`hasRel == (p/q/k/c 任一非空)`、
  顶部条在“讲解（机制）”之前、相关规律块在“亲戚条”之后、页尾注记之前、
  “亲戚条”保留——**18/18 全部通过**（`ALL 18 STATIONS OK`）。
- p/q 对位抽查 TA-03：顶部条原文
  `⏳ 建议先学 TA-01，再学这一条。`；底部块含 `⏳ 前置 · 先学这个`（TA-01）
  与 `⏭️ 前置 · 学完这条可以学`（TA-07）；“亲戚条”仍含 `TA-01 · 前置`。
- 点击：TA-03 页点顶部条 TA-01 芯片，落地 TA-01 站（`LINKGO.openLaw →
  VB.openTA` 链路通）。
- 无先修站 TA-02：无顶部条；相关规律块只有“同族”组、无“前置”组。

`python3 laws-prototype/tools/check_all.py`：**24/24 PASS**（结论“全部通过”）。

`python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html`：
**node --check OK**（41 inline + 0 modules）；anchorcheck FAIL **116 项**，
与 e97aaec 基线逐项一致（集合比对：only-in-current 与 only-in-e97aaec
均为空），为基线遗留，非本项引入。

补记（顺序修复后重跑，工作树 = 已提交树 + 第 5 项未提交改动）：
jsdom 第 1 项验证 `ALL 18 STATIONS OK`（18 站逐站核对 + TA-03 p/q 对位 +
顶部条芯片点击落地 TA-01）；check_all 24/24、jscheck node --check OK、
anchorcheck 116 项（与 e97aaec 基线逐项一致）——均与修复前一致，顺序
修正未引入回归。

---

## 五、改动文件与提交

- `laws-prototype/mengxing-prototype-v1.html`：brace 修复 -1 行（单独 commit）；
  本项 +2 行（单独 commit）。
- `docs/work-2026-11-09/apply_wave3_item1_openTA.py`：带断言手术脚本
  （演练/写回、openTA 体内重复插入防护、顺序自检）。
- 本文件 `docs/work-2026-11-09/wave3_item1_openTA.md`。

提交：brace 修复 4edcc4f；第 1 项 dc17474；顺序修复见本文件 §八。

提交时注意：工作树里另有同一实施员未提交的 LINKIDX 再生成行（主文件
约 2656 行，第 2 项 88 边迁入后的再生）与白板场景文件改动——本项提交
只暂存本项的两个 openTA hunk（`git apply --cached` 按 hunk 拆分暂存），
不碰他人的改动；推送时本地 HEAD（4b06fae，含他人已提交的 66e577f、
4b06fae）领先 origin（e31dc96）2 提交，一并推送属正常。

---

## 六、未核实项

- 真机未核实：jsdom 只验 HTML 字符串与芯片点击跳转，未在真实浏览器点开
  TA 站看顶部条/相关规律块的视觉呈现与 `.lz-prebar` / `.linkgo-chip`
  样式（两样式均为全局 `<style>`，非 TA 作用域内私有，理论上直接适用）。
- 8c7c133 的其余两处改动（probe 提示、错句区静态计数）未逐项复核——只核
  了 brace 修复本身与全站 check；其计数改动与 ERRIDX 头部（524/469/311）
  的一致性由 check_all 覆盖。

## 七、新发现的待定夺

1. **TA 顶部条/相关规律块的芯片只显示编号、无《标题》**：`preBarHTML`
   的标题取 `LAWDATA[先修id].hl`，TA 不在 LAWDATA 里，按 2.2 模板“无标题
   只写编号”回落（如 `⏳ 建议先学 TA-01，再学这一条。`）。标题其实在
   ROSTER（`TA-01` 首字段）与 DATA.TA（`head`/`kid`）里有。若要显示
   《TA-01 时态 = 时间 × 看法两个开关》，须改共享 `preBarHTML` 的标题回
   落（读 ROSTER 或 TA head），影响全部 75 对先修条的渲染——请 Priya/
   总协调人定夺是否改、改哪一处。本项按既定模板落地，不擅自改共享函数。
2. **8c7c133 推送时 jscheck 未过**：该提交落地时第 13 内联脚本已解析失败，
   建议以后主文件提交前以 `jscheck.py` 的 node --check 为门禁（check_all
   不含 jscheck，未能拦住本次回归）。
3. **TA-02 等 13 站的相关规律块只有同族/对照、无前置**：属数据现状
   （总表 relations_teaching 如此），不在本项范围；是否补前置边是数据议题。

## 八、更正记录：dc17474 的底部块位置错位（按 hunk 暂存时行号错位）

- 手术脚本写回的工作树顺序是对的（亲戚条 → 相关规律块 → 页尾注记），
  jsdom 验证也是在该工作树上跑的、结论属实。
- 但 dc17474 提交时，为避开另一实施员未提交的 LINKIDX 再生成行，改用
  `git diff -U0` 按 hunk 拆分暂存；relSection hunk 的插入点被 git diff
  对齐到了页尾注记行之后（`@@ -11971,0 +11972 @@`），提交后文件里
  顺序变成亲戚条 → 页尾注记 → 相关规律块，与 §二设计、§四验证不符。
  preBar 行不受影响（位置正确）。
- 本修复 commit 把页尾注记行移回相关规律块之后，恢复 §二顺序；修复后
  jsdom 第 1 项验证重跑，18 站仍全部通过（见 §四末尾补记）。
- 教训：-U0 hunk 只含改动行、无上下文锚点，插入点行号在多次提交交错时
  极易错位；以后按 hunk 暂存后，提交前必须用 `git show <commit>` 逐行
  核对落点，不能只看 `git diff --cached --stat` 的行数。
