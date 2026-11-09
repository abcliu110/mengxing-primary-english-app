# 第五波第 11 项工作底稿：LAWDATA 对账检查（2026-11-09）

> 定夺（主对话 Muse 已定）：加 LAWDATA 对账检查，进 check_all。
> 实施：新建 `laws-prototype/tools/check_lawdata_roster.py`，接进
> `laws-prototype/tools/check_all.py` 的 CHECKS 列表（`check_rel_coverage`
> 之后），check_all 26 → **27 项**。

---

## 一、为什么要这道检查

- LAWDATA 字面量 224 ≠ 运行时 390（PHONLAWS/SUPPDATA 合并）——
  第四波第 5 项初版统计曾按字面量 224 计数，称 24 个先修目标无条目，
  运行时实测纠正为只有 10 个无条目。静态字面量计数不能作为 LAWDATA
  覆盖面的依据，此后凡以“LAWDATA 有无”作判断的核对必须以运行时为准。
- `hl` 与 ROSTER`[0]` 31/31 相同（先修目标子集）——先修芯片的标题回落
  （preLawTitle：LAWDATA.hl → ROSTER[0]，第五波第 7 项改按 hl 值回落）
  依赖两者一致；一处改名另一处不同步，先修条会悄悄取旧名，无检查拦截。
- 14 个 ptr 条目无 hl、回落取 ROSTER 标题——该结构（无 hl ⟺ ptr）是
  回落的前提，若某条目悄悄多出/丢掉 hl，先修条的标题来源会变。

## 二、检查内容（check_lawdata_roster.py）

1. **字面量 + 合并源 = 运行时条数**：基础字面量 `var LAWDATA=` 224 条
   + `var PHONLAWS=` 52 条 + `var SUPPDATA=` 114 条，三者键集合无重叠，
   按 App 的合并顺序（基础 ← PHONLAWS 覆写 ← SUPPDATA 覆写，与
   `check_rel_coverage.py` 同通道）合并后 390 条。字面量解析沿用
   `check_badge_erridx.py` 的定界扫描（含字符串/注释处理），锚点须
   恰命中 1 处。
2. **hl == ROSTER[0]（重叠条目）**：运行时 LAWDATA 全部 390 条都在
   ROSTER（456 条）中；其中 323 条有 hl 的，hl 与 ROSTER`[0]` 逐条
   一字相同（323/323）。ROSTER 另有 66 条不在运行时 LAWDATA 中
   （NEW-*、P-*、TA 等无 LAWDATA 条目的律），属正常，不断言。
3. **无 hl ⟺ ptr 条目**：67 条无 hl 的条目恰为 67 条 ptr 型条目
   （全在基础字面量内；PHONLAWS/SUPPDATA 条目皆有 hl）。

用法：`python3 tools/check_lawdata_roster.py [<html 路径>]`；
退出码 0=通过、1=断言失败、2=用法/解析错误（与
`check_rel_coverage.py` / `check_badge_erridx.py` 一致）。

## 三、验证结果

- 当前 HEAD 上 **PASS**：
  `PASS: LAWDATA 对账通过（字面量 224 + PHONLAWS 52 + SUPPDATA 114 =`
  `运行时 390 条，无重叠；hl == ROSTER[0] 323/323；无 hl ⟺ ptr 67 条；`
  `ROSTER 456 条）`。
- 反向自证（/tmp 副本，仓库文件未动）：
  - hl 改名漂移（E-01 的 hl 末尾加一字）：FAIL，报
    `hl 与 ROSTER[0] 不一致 1 条：['E-01']`——改名漂移可被抓。
  - 制造重叠（PHONLAWS 字面量里插一条与基础字面量同键的 `"V-01": {}`）：
    FAIL，三处子检查同时报（重叠 1 条；224+53+114=391 ≠ 合并后 390；
    无 hl 68 条 vs ptr 67 条）——合并算术与 ptr 结构双向都受检。
  - 多传参数：打印 docstring、退出码 2。
- 接进链后 `python3 laws-prototype/tools/check_all.py`：**27/27 全部通过**
  （26 项原有全绿 + 新增 `check_lawdata_roster` PASS）。
  第 8 项门禁扩面未新增 check_all 项（同一脚本），故总数 26 → 27
  只因本项 +1。
- `python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html`：
  **node --check OK**（41 inline + 0 modules）；anchorcheck FAIL **116 项**，
  与 e97aaec 基线逐项集合比对一致（见第 10 项清查底稿），为基线遗留，
  非本项引入。

## 四、前后数字对照

| | 改前（d698a3c） | 改后（本分支，本项） |
|---|---|---|
| check_all 项数 | 26 | **27**（+check_lawdata_roster） |
| check_all 通过 | 26/26 | 27/27 |
| LAWDATA 对账 | 无检查（手工数过） | 进链，HEAD 上 PASS（224+52+114=390；hl 323/323；无 hl ⟺ ptr 67） |

## 五、改动文件与提交

- `laws-prototype/tools/check_lawdata_roster.py`：新建，对账检查脚本。
- `laws-prototype/tools/check_all.py`：CHECKS 列表加 `check_lawdata_roster`
  一项（`check_rel_coverage` 之后）+ docstring 清单补一行。
- 本文件 `docs/work-2026-11-09/wave5_item11_lawdata_roster.md`。

提交：分支 `wave5/main-line` 上 `Content：第五波第 11 项——LAWDATA 对账检查进
check_all（check_all 26→27 项）`（基于 d698a3c）。

## 六、未核实项

- 真机未核实：本项只做静态字面量与 ROSTER 对账，不渲染页面；先修条
  在真机上的实际呈现见第 7 项未核实项。
- 本检查不验 LAWDATA 各条目的字段内容（如 cases/quiz/prb 数字）——
  那些由各 gen_* --check 与徽标门禁覆盖；本项只验条数算术与 hl 一致性。
