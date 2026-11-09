# 第三波第 5 项工作底稿：NE-01/02/03 静态徽标与 ERRIDX 对齐（2026-11-09）

> 定夺（主对话 Muse 已定）：修三处静态徽标到与 ERRIDX 一致。
> 实施：`docs/work-2026-11-09/apply_wave3_item5_ne_badges.py`（带断言手术脚本，
> 沿用第二波第 2 项 `apply_wave2_item2_index_rows.py` 的做法，默认演练，
> `--apply` 写回）。

---

## 一、实施：#v-expr2 三行徽标 part→ok（主文件 1 行改动）

位置：`#v-expr2` 静态索引行（主文件约 6518 行，三行同在 1 个长行内）。
只换徽标，不动标题、不动位置、不动分组（仍在“NE · 地道与流利”组）：

| 行 | 改前 | 改后 |
|---|---|---|
| NE-01 合语法不等于地道：母语者只说「惯例会说的那一种」 | `<span class="st part">有练习 · 查过·没有病例</span>` | `<span class="st ok">有病例 · 有练习</span>` |
| NE-02 说话快得不像现编的：大脑里整存着一座「句干仓库」 | 同上 part | 同上 ok |
| NE-03 学英语的起步单位是整块，不是单词加规则 | 同上 part | 同上 ok |

徽标口径沿用第二波第 2 项（与其余 NE 儿童行一致）：有 ERRIDX 病例 + 有练习
→ ok；无病例 + 有练习 → part。对照锚点 NE-08 / NE-14（各 1 病例 + 1 练习，
挂 ok）未动。

## 二、前后数字对照（三源交叉核对一致）

| 律 | ERRIDX 病例（运行时） | laws_master lawdata.cases | LAWDATA cases_len | quiz | 徽标改前 → 改后 |
|---|---|---|---|---|---|
| NE-01 | 2 | 2 | 2 | 1 | part → **ok** |
| NE-02 | 2 | 2 | 2 | 1 | part → **ok** |
| NE-03 | 1 | 1 | 1 | 1 | part → **ok** |

根因：1.1 病例波（ERRIDX 381→524）后静态行未跟进的旧口径；三条在总表
与运行时早已有病例，静态徽标仍写“没有病例”，是可见的不一致。

排他核对：三行在主文件各只出现 1 次（全文检索 `data-law="NE-01/02/03"`
各 1 处，无转义形式的第二份副本），手术只动这三处；顺序自检
NE-01 < NE-02 < NE-03 < NE-07 通过。

## 三、验证结果

jsdom（脚本 `/tmp/domtest/wave3_item5_verify.js`）：

- `#v-expr2` 三行徽标均为 `st ok | 有病例 · 有练习`——**3/3 通过**；
- 对照锚点 NE-08 / NE-14 仍为 ok，未被误动；
- 运行时复核：ERRIDX 病例 2/2/1、LAWDATA quiz 各 1，与 §二一致。

`python3 laws-prototype/tools/check_all.py`：**24/24 PASS**（与第 1 项终验
同批跑，结论“全部通过”）。

`python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html`：
**node --check OK**（41 inline + 0 modules）；anchorcheck FAIL **116 项**，
与 e97aaec 基线逐项一致（集合比对双向为空），为基线遗留，非本项引入。
（本项只改静态 HTML 文本，不触 JS，jscheck 结果与第 1 项终验相同。）

## 四、改动文件与提交

- `laws-prototype/mengxing-prototype-v1.html`：#v-expr2 一行内三处徽标
  part→ok（单独 commit）。
- `docs/work-2026-11-09/apply_wave3_item5_ne_badges.py`：带断言手术脚本。
- 本文件 `docs/work-2026-11-09/wave3_item5_ne_badges.md`。

提交：git log 按主题查 Content：NE-01/02/03 静态徽标与 ERRIDX 对齐（part→ok）。

## 五、未核实项

- 真机未核实：jsdom 只验 DOM 徽标 class 与文本，未在真实浏览器看
  #v-expr2 的徽标颜色呈现（`.st.ok` 全局样式未动，与 NE-08/NE-14 同款，
  呈现应一致）。
- 顺带发现、未核实：E/W 区静态行是否也有同类“病例波后徽标未跟进”？
  本次只按任务修 NE 三行；全区扫一遍（静态徽标 × ERRIDX）可另立项，
  建议由总协调人定夺是否做——见 §六。

## 六、新发现的待定夺

1. **E/W 区是否同病**：本次只核了 NE-01/02/03 三源。E/W 静态行
   （#v-expr）的 part/ok 徽标是否与现行 ERRIDX（524 条）逐行对得上，
   未扫过。若也有漂移，是同一类修复，可批量另立项。
2. **静态徽标无生成器兜底**：第 2 项底稿已登记——没有任何 gen_* 拥有这批
   静态行，病例数据再变时静态行还会漂。本次仍是手术式修复；是否把
   #v-expr/#v-expr2 索引行生成化（或至少加一道“静态徽标 × ERRIDX”
   对账门禁进 check_all），请总协调人定夺。
