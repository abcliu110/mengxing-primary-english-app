# 三件语法原生互动并入 App · 集成报告

- 日期：2026-11-03（Stewart 拍板「现在就并入：三件装进对应规律页，走总表生成管线」）
- 工作克隆：`~/workspace/work-clones/interact-integ`（基线 HEAD 471337b）——**未 commit、未 push**，待主会话验收合并。
- 依据：`~/workspace/grammar-native-prototype/` v2（grammar-native-prototype-v2.html / generate_items.py / items.json / items_report.txt），机制、组题规则、解析文案口径逐条照移，未改口径。生成器产物与原型 items.json **深比全等**（d6/d2/d24/explain/counts 五个键逐项 deep-equal；support 与原型 data.json 深比全等），是零漂移的机器证据。

## 1. gen_interact 数据通道结论

新建 `laws-prototype/tools/gen_interact.py`，产物 `var INTERACT`（127,155 字符，带 GENERATED 标记）写入主文件。普查结论：

| 数据 | 通道 | 说明 |
|---|---|---|
| GR-02/03/12 规律正文、病例、机制；TA-05/06 headline/mechanism | `model/laws_master.json` | 已登记事实源（lawdata / yaml 分仓） |
| 动词五形式（461 行） | `model/verb_forms_completion.json` | **model/ 有登记事实源**（规范 §1「动词」行 model/verb_*.json），直接读总表 |
| VEC 病例 | `model/verb_error_cases.json` | 同上 |
| TA 练习（TA-06 E4 种子句等） | `model/ta_exercises.json` | model/ 事实源 |
| 词库（三单派生同形校验、名词校验） | `model/wordbank.json` | 已登记事实源 |
| **TN WINS（完成时实验室 5 窗 sent/why/fill/closed + 窗口卡标签）** | **主文件内嵌段只读解析** | **model/ 无事实源文件**：WINS 只存在于主文件 TN 模块（时态车道未生成化）。按 `extract_review_data.py` 先例，生成器只读解析 `const WINS={...}` 与 `data-win` 标签；已在规范 §1 新行登记此通道。WINS 若被 TN 车道改动，生成器的逐字断言立即报错，不会静默漂移 |

保真纪律照原型：每条解析文案/种子句做源内子串断言（CORPUS = 五个 model 源 + 解析出的 WINS/support），任一不符 exit 1。题量断言写死：D6 生成 144（候选 183 等距抽样）、D2 150（v1 原工位 5 题排最前）、D24 生成 139（候选 143），加手工工位后每件恰 150。

原型手工工位（D6 6 工位 / D24 自由台 5 工位 / D24 病例动词判定 6 条）是原型 v1 骨架的手写数据，不在任何 model 源中——按 Stewart「手工工位保留为题集前几题」的指示，在 gen_interact.py 内登记为**定版表**（MANUAL_D6 / MANUAL_D24_FREE / MANUAL_D24_CASE_VERBS）随 INTERACT 一并生成，UI 只读 INTERACT，不回灌原型文件（守规范 §2.3）。

登记与门禁：
- `DATA_SOURCE_SPEC.md` §1 新增数据类「规律互动题集」一行（事实源=各总表+本生成器规则，含 WINS 只读通道说明）。
- `tools/check_all.py` 纳入 gen_interact --check 为**第 12 检**。

## 2. D2 落点（普查结论）

TA-05/TA-06 在 laws_master 中**只有 yaml 分仓、lawdata 为空**——没有 LAWDATA 详情页可装。正式呈现共两处：

1. **动词区时态站** `VB.openTA('TA-05'/'TA-06')`：VB 模块内嵌 TA 数据的讲解页——属 Stewart 自有动词车道（内嵌未生成化），不选（避免动他的车道代码）。
2. **时态区（TN）现在完成时实验室 `#v-tense-perfect`**：WINS 时间窗机制的户口页，D2 题集的 5 道原工位题与全部窗口语义正出自此页——**选此页**。

装法：在实验室实验 6 之后、成人层出处段之前新增一个 `.exp` 块「🛠 操作台 · 时间窗滑门（TA-05 / TA-06 加练台）」，内含 `<div class="ix-slot ix-scope" data-ix="d2">`。未改实验室既有六个实验与文案（lead 的「六个实验」仍指原六件，操作台以「加练台」名义另置）。

## 3. 三件在页内的位置

| 件 | 落点 | 页内位置 |
|---|---|---|
| D6 传送带 | GR-02、GR-03 的 LAWDATA 规律页（`LAW.render` 详情） | 「检索练习」步之后、「相关规律」（LINKGO）段之前，新增一步「🛠 操作台 · 标记只落一次传送带」。经 LAW.render 两处守卫钩子实现：`if(window.IX)h+=IX.lawSectionHtml(d.id)`（仅 GR-02/GR-03/GR-12 返回段，其余返回空串）+ 落盘后 `IX.mountAll()` |
| D24 拔河 | GR-12 规律页同法 | 同位置，标题「🛠 操作台 · 三股力拔河」；自由台与故障工位两张卡同置一段内 |
| D2 时间窗 | TN `#v-tense-perfect` 现在完成时实验室 | 实验 6 后新增 `.exp` 操作台块（静态 HTML 位 + IX 挂载） |

UI 移植：新作用域 `.ix-scope` + `window.IX`，全部元素 id 带 `ix` 前缀、data 属性带 `ix` 前缀，无全局污染。颜色全走主文件护眼 token（--card/--line/--accent 等与 :root 同名直接继承）；红棕仅解析卡用（--danger #b85a52 / --danger-deep #8A5A48，规范 §2 允许值，定义在 .ix-scope 根）。禁用色扫描 0（奶油纸/亮蓝紫/旧棕金均无）。计时器（puff/shake 的 setTimeout）统一登记，`#v-law-detail` 与 `#v-tense-perfect` 的 MutationObserver 在视图隐藏时清理计时器并取消 D2 拖动态（仿 PN/AR/CJ/MXR 模式）；D2 在实验室视图显示时由同一观察者补挂载。

行为与原型 v2 一致性：状态机、判定规则、文案（含错因解析卡的去重计数「第 N 次撞上」、病例展开、出处行）、换一批轮换（D6 25 批 / D2 30 批 / D24 29 批）、命名收尾卡触发条件全部照移；无计分、无对错弹窗。App 适配仅两处（报告登记）：①组件状态保留在 IX 闭包，规律页重渲染后按状态重建 DOM 并恢复命名卡/解析卡（原型单页无此情形）；②原型遥测 GN.* 在 App 内为空钩子（不接日志）。

## 4. 冒烟结果（jsdom，在真实主文件内实操）

脚本：`ix-verify/ix_smoke.js`，输出存 `ix-verify/smoke-output.txt`。**46/46 PASS**，要点：

- GR-02 开页有 D6 台且已挂载；合法操作（visit 工位点动词盖章）句面 = "I visited Beijing last year." 并过带；故意错着两类（无标记按传送带 → gate_past 解析卡；doesn't 已扛标记再点动词 → double_pres 解析卡），卡面 kid 文案与展开 detail 均与 `INTERACT.explain` 对应条目**逐字相等**（含 VEC-006 note、GEC-001 病例原句）；换一批 25 批整圈回到原批（=150 题轮换）。
- GR-03 同台挂载 ✓。
- GR-12 D24：key 工位押错（押复数）翻盘出 force_form 解析卡（detail 命中 GEC-018 diag）；病例 1 点错绳结不松 + case[0] 解析卡命中，点对 meaning 绳松开且句面 = GR-12 cases[0].right；自由台 29 批。
- 完成时实验室：首题即 TN WINS 原工位（visitBeijing × in the last year），WINS 复盘卡逐字呈现；点「推离现在」牵连线断 → detached 解析卡（TA-05 headline_kid + mechanism text_kid 逐字命中）；推回恢复；完成时插点名图钉（last night）被弹回 → pinPerfect 解析卡（TA-06 headline_kid + mechanism text_adult 命中）；关门窗题落位 → closed 解析卡；30 批整圈轮换。
- 无关规律页（GR-01/V-01/S-01）断言无操作台 ✓；切走视图走观察者清理路径无异常。
- jsdom 环境报错（canvas getContext、scrollTo 未实现）在基线与改后**完全相同**，为 jsdom 限制、非本次引入。

## 5. 不变量核对表

基线 = git HEAD 原文件（471337b）与改后文件各跑同一快照脚本（`ix-verify/ix_snapshot.js`，结果存 `ix-verify/{base,after}/`）：

| 不变量 | 基线 | 改后 | 结论 |
|---|---|---|---|
| 复习池题数 | 1,796 | 1,796 | ✓ |
| 复习池全量 JSON sha256 | 1c30f081… | 1c30f081… | ✓ 逐字节不变（key 序哈希亦同） |
| ET verified / pending（gen_et --check） | 1816 / 462 | 1816 / 462 | ✓ |
| 无关规律页渲染（GR-01/V-01/S-01/E-01/TM-01） | 5 页快照 | sha256 逐页全同 | ✓ 零变化 |
| 目标页 GR-02/GR-03/GR-12 渲染 | — | 与基线的公共前缀+后缀覆盖全长、残余 0 | ✓ 变化仅为一处连续插入（操作台段） |
| `<section>` 开/闭 | 71 / 71 | 71 / 71 | ✓ 平衡（未新增 section） |
| check_all | 11/11（基线） | **12/12**（含新增 gen_interact） | ✓ 全绿 |
| 主文件 git diff | — | 纯插入 784 行 / 0 删除，4 个 hunk（TN 操作台位 +5、LAW 钩子 +1×2、文末 INTERACT+IX +777） | ✓ 无误伤 |

## 6. 改动文件清单（克隆内，未提交）

- 新增 `laws-prototype/tools/gen_interact.py`（生成器，含组题规则+手工工位定版表+WINS 只读通道）
- `laws-prototype/mengxing-prototype-v1.html`（INTERACT 生成段 + IX 样式/引擎 + LAW 两处守卫钩子 + TN 操作台位）
- `laws-prototype/DATA_SOURCE_SPEC.md`（§1 登记一行）
- `laws-prototype/tools/check_all.py`（第 12 检 + docstring 一行）

验收提示：合并前照例 pull；合并后跑 `tools/check_all.py` 应 12/12。若日后 TN 车道修改 WINS，gen_interact --check 会红——按 WINS 新文案重跑 --write 即可（断言会先拦住口径外改动）。
