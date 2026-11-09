# 第二波第 7 项工作底稿：51 口径结论与 TA 5 对迁移（2026-11-09）

> 定夺（Priya 2026-11-09“你自己拍板”，主对话已定夺）：**“51 对”口径以实测
> 70 对为准，51 是旧口径；TA 5 对迁入总表。**本文件只记录实施与核查，
> TODO 文档本身未动（§2.2 文字修改留给总协调人统一改，见 §3）。

---

## 一、51 的来源调查：结论

**结论：在 git 历史与全部文档里找不到 51 的来源；51 与任何实测口径、
任何历史快照的任何口径均不符，应按定夺视为旧口径（ drafting 时的过期/
误计数字），以实测为准。**与 `decisions-2.1-2.2.md` §2.2“最可能是旧快照
口径”的判断一致，本次调查把“最可能”落到了逐项实测上。

### 1.1 各口径实测数（TODO 生成点 e97aaec，2026-11-09 实测）

| 口径 | 实测数 | 测法 |
|---|---|---|
| 总表 `relations_teaching` kind=“前置” | **70 对**（68 个持有律，44 个不同先修目标） | `laws_master.json` 直接计数 |
| 主文件 `LINKIDX.g` p 槽 | **70 条**，与总表一致 | `tools/gen_links.py` 生成计数 |
| 运行时 `LAWDATA` 合并后（字面量 25 ＋ PHONLAWS 0 ＋ SUPPDATA 13） | **38 对** | `gen_laws.collect` + 三字面量合并计数 |
| 主文件全量去重（含时态站行内 DATA 的 5 对 TA 前置） | **75 对** | 全部含 rel 字面量去重（与 decisions 文档一致） |
| 主文件 `"rel":"前置"` 字面出现次数 | **75 次** | 全文正则计数 |
| 上游 yaml `relatives` 前置总数 | **92 对** | 428 条有 relatives 的律合计（含 TA 5、P/PB 23、CO-17 1） |

51 与以上全部数字均不符；持有律数（68/55）、目标数（44）也均不是 51。

### 1.2 历史快照：51 从未出现过

| 提交 | 总表前置 | LAWDATA 字面量前置 |
|---|---|---|
| 57e2544（Wave 1 单一数据源建成） | 0（relations_teaching 尚未建立） | 57 |
| 7b1425e（切换阶段 2：67 条双户口降指针） | 0 | **57 → 25（一步到位，无中间态）** |
| 5cf1750（知识联动阶段 2：关系统一户口） | **57**（509 条教学关系内含前置 57） | 25 |
| 7a53f62（R11-01：补迁 376 条） | **70** | 25 |
| e97aaec（TODO 生成点） | 70 | 25 |

LAWDATA 字面量 57→25 的下降发生在 7b1425e 一个提交内（双户口条目改
指针后 rel 不再进字面量），其间没有碰主文件的提交，故不存在“51”的中
间态；总表口径则为 0→57→70 三档跳变，同样没有 51。

### 1.3 文档搜索

- 全仓 `docs/` 搜“51”+“前置/先修”：只有 TODO §2.2 本句与
  `decisions-2.1-2.2.md` §2.2 标题（标题原文即引 TODO 的说法）两处，
  无任何其他文档、报告或脚本输出过 51 这一口径。
- `git log --all -S "51 个前置"`：仅命中 bea2682（Wave 1 工作底稿）与
  e97aaec（TODO 本身），无更早来源。
- 几个子集猜想均已排除：成人层内 13 对（70−13=57）、TA 除外（70 不含
  TA）、LAWDATA+SUPPDATA（38）、PN/AR 专区 rel（15/16）与各组合
  （25+13+15=53、25+13+16=54）皆不等于 51。

### 1.4 结论

51 无可恢复的来源，应视为 TODO 起草时的过期/误计数字，不再追查；
TODO 口径按定夺更正为实测数（§3 给出准确改法）。

---

## 二、TA 5 对迁移记录

| 持有律（后学） | 先修律 | kind | src | 迁前总表 | 迁后总表 |
|---|---|---|---|---|---|
| TA-03 | TA-01 | 前置 | yaml-relatives | relations_teaching 为 null | 1 条 |
| TA-06 | TA-05 | 前置 | yaml-relatives | null | 1 条 |
| TA-07 | TA-03 | 前置 | yaml-relatives | null | 1 条 |
| TA-09 | TA-05 | 前置 | yaml-relatives | null | 1 条 |
| TA-16 | TA-05 | 前置 | yaml-relatives | null | 1 条 |

交叉核对（实施脚本 `apply_wave2_item7_ta_pre.py` --apply 前全部断言通过）：
每对在三处逐条一致——①上游 `grammar_ext.yaml` 的 `relatives`（master
yaml 分仓即其副本）；②主文件时态站行内 `const DATA` 的 `DATA.TA[].rel`；
③总表迁前为空。src 记 `yaml-relatives`（值取自上游 yaml；DATA.rel 是
同一批边的呈现侧副本）。

前后数字对照：

| 口径 | 迁前 | 迁后 |
|---|---|---|
| 总表 `relations_teaching` 总数 | 885 | **890** |
| 总表 kind=“前置” | 70 | **75** |
| `LINKIDX.g` p 槽（`gen_links.py --write` 再生） | 70 | **75** |
| `LINKIDX.g` 覆盖律数 | 432 | **439**（新增 TA-01/03/05/06/07/09/16 七律入 g） |
| `LINKIDX.g` q 反向 | — | TA-01 q=[TA-03]；TA-03 q=[TA-07]；TA-05 q=[TA-06, TA-09, TA-16] |
| `check_rel_coverage`（LAWDATA.rel 边数） | 727 | 727（不变；LAWDATA.rel 未动） |

行内 `DATA.TA[].rel` 的 5 条前置边**本次不删除**：TA 详情页 `VB.openTA`
的“亲戚条”芯片直接读 `DATA.TA[].rel`（openTA 不读 LINKIDX.g），删了
会丢页面上的前置显示；迁入后 DATA.rel 前置边与 LINKIDX.g 对位一致，
不再是户口外自留。单户口的彻底清理（openTA 改读 LINKIDX.g）须另立项
动 VB 代码，不在本项范围。jsdom 核对：LINKIDX.g p 总数 75；
`VB.openTA('TA-03'/'TA-06'/'TA-07'/'TA-09'/'TA-16')` 的“亲戚条”均含
对应“TA-xx · 前置”芯片（见 §4）。

---

## 三、TODO §2.2 的准确改法（给总协调人；TODO 本文件未动）

TODO 原文（`docs/TODO-人工处理清单-2026-11-09.md` 第 62 行，唯一一处
出现 51）：

> LAWDATA 数据层里每条规律有 `"rel": "前置"` 字段（共 51 个前置关系链接），
> 但没有代码把它们渲染成「建议先学 XX」提示，也没有进区前的先修检查。

准确改法（只改数字口径，不改该句其余措辞；其余措辞问题见下）：

> LAWDATA 数据层里每条规律有 `"rel": "前置"` 字段（总表 relations_teaching
> kind="前置" 共 75 对，其中 5 对 TA 前置于第二波由时态站行内 DATA 迁入总表），
> 但没有代码把它们渲染成「建议先学 XX」提示，也没有进区前的先修检查。

说明：
- 用 75（迁移后实测数），不用 70：TODO 改完时迁移已落地，75 才是现行
  真实口径；括号内注明 5 对 TA 的来源，避免后人再问“70 还是 75”。
- “没有代码渲染”一句本身也已过时（详情页底部“相关规律”块早有前置分组；
  第一波已新增详情页顶部先修条与索引行标记），decisions 文档 §2.2
  “现状核查”第 1 点已有记录——是否顺带改这句，由总协调人定夺，本
  底稿只给数字的准确改法，不擅自扩改。
- decisions 文档 §2.2 的标题“51 个前置关系怎么用”是引用 TODO 的旧说法，
  属历史记录，本次不改标题；结论以本底稿为准。

---

## 四、验证结果

- `python3 laws-prototype/tools/gen_links.py --write`：p 槽 70→75，逐字节
  写回通过（LINKIDX 443963 → 444161 字符）。
- `python3 laws-prototype/tools/check_rel_coverage.py`：PASS（727 条边全
  部 ⊆ LINKIDX.g，kind 槽对位）。
- `python3 laws-prototype/tools/gen_laws.py --check`：PASS（稳态）。
- `python3 laws-prototype/tools/check_upstream.py`：五条链全部 PASS。
- `python3 laws-prototype/tools/check_all.py`：24/24 PASS。
- `python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html`：
  node --check OK（41 inline）；anchorcheck 116 项失败，与 e97aaec 基线
  逐项一致（基线遗留，非本项引入）。
- jsdom（`/tmp/domtest/ta_pre_test.js`）：LINKIDX.g p 总数 75；5 站
  openTA“亲戚条”均含对应“TA-xx · 前置”芯片；`LINKGO.preBarHTML('TA-03')`
  返回非空（数据已到位；openTA 本身未接 preBarHTML，见 §5 未核实项）。

## 五、未核实项与遗留观察

- 真机未核实：jsdom 只验数据与芯片文本，未在真实浏览器点开 TA 站看
  “亲戚条”渲染与点击跳转。
- openTA 未接 `LINKGO.preBarHTML` / `relSectionHTML`：TA 站至今只显示
  DATA.rel 的“亲戚条”芯片，不显示 2.2 第一波的顶部先修条（⏳ 建议先学…）
  与底部“🔗 相关规律”块；数据已到位（LINKIDX.g 有 5 站 p/q），接不接
  渲染由总协调人/Priya 定夺，不在本项范围。
- 遗留观察（本次不动，仅登记）：yaml.relatives 与 relations_teaching
  仍有 33 条律不一致——TA 其余关系（同族 24 / 对照 5 / 易混 3）、P-* 19
  律、CO-17（前置 CO-17→CO-12）只在 yaml.relatives/DATA，未进总表。
  其中 kind“易混”不是 gen_links 登记的 kind，整批迁 TA relatives 会
  触发 `教学关系类型未登记：易混` 断言，须先定 kind 口径再议；P-* 属
  Stewart 介词自留线，CO-17 的前置边是否迁入亦须另行定夺。
- NE-01/02/03 三行静态索引徽标与现行 ERRIDX 不符（各有 1–2 条病例却挂
  part），为 1.1 病例波后静态行未跟进的旧口径——第 2 项底稿已登记，
  本次不动。

## 六、改动文件

- `laws-prototype/model/laws_master.json`：TA-03/06/07/09/16 各增 1 条
  relations_teaching（前置，src=yaml-relatives）。
- `laws-prototype/mengxing-prototype-v1.html`：仅 LINKIDX 字面量再生
  （gen_links.py --write）。
- `docs/work-2026-11-09/apply_wave2_item7_ta_pre.py`：迁移脚本（演练/
  写回、双源交叉核对断言）。
- 本文件 `docs/work-2026-11-09/wave2_2.2_70pairs.md`。
