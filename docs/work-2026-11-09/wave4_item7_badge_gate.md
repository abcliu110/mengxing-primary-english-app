# 第四波第 7 项工作底稿：静态徽标 × ERRIDX 对账门禁进 check_all（2026-11-09）

> 定夺（主对话 Muse 已定）：加“静态徽标 × ERRIDX”对账门禁进 check_all，**不做生成化**。
> 实施分支：`wave4/gates`（从 59844d7）；本项单独提交。

---

## 一、接线方式

新脚本 `laws-prototype/tools/check_badge_erridx.py`（参考 `check_rel_coverage.py`
的写法与退出码约定：0=通过、1=断言失败、2=用法/解析错误；接受可选
`<html 路径>` 参数，缺省校验主文件），接进 `laws-prototype/tools/check_all.py`
的 CHECKS 列表末尾（`"check_badge_erridx"`，无参数），并在 check_all.py
模块 docstring 的校验清单里补一行。

门禁逻辑：

- 解析主文件 `#v-expr`（E/W）与 `#v-expr2`（NE）两区，按 `<section>` 边界
  切分、不依赖行号，取出全部静态索引行（`<div class="urow" data-law="…">`），
  每行须恰含 1 个徽标 `<span class="st …">`。
- 徽标口径沿用第二波第 2 项、第三波第 5 项：
  有 ERRIDX 病例 + 有练习 → `st ok`「有病例 · 有练习」；
  无 ERRIDX 病例 + 有练习 → `st part`「有练习 · 查过·没有病例」；
  教师层行挂 `st tchr`「教师层」，只核对在位、不参与徽标比对。
- 权威源是 `gen_errors.py` 从 `laws_master.json` 再生出的 ERRIDX（病例四路
  汇合 lawdata > yaml > zone.data > zone.parts，逐律去重后计数；脚本直接
  import `gen_errors.build`，与 `gen_errors --check` 同口径，不复制生成逻辑）。
  运行时 ERRIDX 须与再生结果逐律相等，否则该行报“ERRIDX 运行时与再生
  不一致”。`laws_master` 的 `lawdata.cases` 与运行时 LAWDATA `cases` 数只
  作第三源数字打印在失败行里，不单独定徽标——yaml/zone 病例会使 ERRIDX
  多于 `lawdata.cases`（全库 163 律如此），以 `lawdata.cases` 为准会误判；
  “有病例”的口径是 ERRIDX（孩子查错句用的索引）里有病例。
- 覆盖面：59 行（E 15 + W 15 + NE 29），行集合须与 laws_master 的 E/W/NE
  律集合恰相等（不多、不少、不重）；其中儿童行 38 行逐行比对徽标，教师行
  21 行只核对在位。另断言儿童行 `quiz ≥ 1`（ok/part 均以“有练习”为前提；
  若某行 quiz 为 0，报“无练习，徽标口径未覆盖”，不猜徽标）。

## 二、验证结果

### 本分支 HEAD（59844d7）上：门禁失败——预期的失败

`python3 laws-prototype/tools/check_badge_erridx.py` 退出码 1，10 行不符：

| 律 | 徽标现为 | 应为 | 病例 ERRIDX 再生 / 运行时 / lawdata.cases / LAWDATA cases | 练习 quiz |
|---|---|---|---|---|
| E-01 | part | ok | 1 / 1 / 1 / 1 | 1 |
| E-03 | part | ok | 1 / 1 / 1 / 1 | 1 |
| E-04 | part | ok | 1 / 1 / 1 / 1 | 1 |
| E-05 | part | ok | 1 / 1 / 1 / 1 | 1 |
| E-07 | part | ok | 1 / 1 / 1 / 1 | 1 |
| E-08 | part | ok | 1 / 1 / 1 / 1 | 1 |
| E-13 | part | ok | 1 / 1 / 1 / 1 | 1 |
| E-15 | part | ok | 1 / 1 / 1 / 1 | 1 |
| W-12 | part | ok | 2 / 2 / 2 / 2 | 1 |
| W-13 | part | ok | 2 / 2 / 2 / 2 | 1 |

汇总行：`FAIL: 静态徽标 × ERRIDX 对账失败：10 行不符（共 59 行：儿童行 38、教师行 21）`。
三源在 10 行上完全一致（再生 = 运行时 = lawdata.cases = LAWDATA cases），
NE 15 行儿童行全对——这 10 行就是第 6 项 E/W 扫面要修的漂移（病例波后
静态行未跟进，与第三波第 5 项修 NE-01/02/03 同病）。本分支不含第 6 项
修复，失败是预期的；**没有为通过而放宽门禁**。

`python3 laws-prototype/tools/check_all.py`：**25 项中 24 项 PASS，唯
`check_badge_erridx` FAIL（rc=1）**，其余 24 项（含 `gen_errors --check`）
全部通过。check_all 总数 24 → 25（本项 +1；第 8 项另 +1，见
`wave4_item8_jscheck_gate.md`，合入后为 26）。

### 正向自证：门禁在第 6 项修复后的状态下通过

只改 10 行徽标 part→ok 的 /tmp 副本（`/tmp/wave4_item7_fixed.html`，
仓库文件未动）上跑门禁：

`PASS: 静态徽标 × ERRIDX 对账通过（59 行：儿童行 38 行徽标全对，教师行 21 行在位；ERRIDX 524 条 / 覆盖 311 律，运行时与再生逐律一致）`，退出码 0。

### 反向自证：门禁能抓反方向的错

一次手误的 /tmp 副本把 E-10/E-11 也换成了 ok（两律 ERRIDX 均为 0），
门禁报 4 行不符（E-10、E-11 应为 part；W-12、W-13 仍为 part），
证明 ok/part 双向都受检，不是只报一个方向。

### 用法错误

多传参数时打印 docstring、退出码 2（与 `check_rel_coverage.py` 一致）。

## 三、前后数字对照

| | 改前（59844d7） | 改后（本分支，本项） |
|---|---|---|
| check_all 项数 | 24 | 25（+check_badge_erridx） |
| check_all 通过 | 24/24 | 24/25（唯 badge 门禁失败，见 §二） |
| 静态行覆盖 | 无门禁 | 59 行（儿童 38 逐行比对 + 教师 21 在位） |
| 徽标不符行 | 未检出 | 10 行（E-01/03/04/05/07/08/13/15、W-12/13） |

## 四、改动文件与提交

- `laws-prototype/tools/check_badge_erridx.py`：新建，对账门禁脚本。
- `laws-prototype/tools/check_all.py`：CHECKS 末尾加 `check_badge_erridx` 一项 + docstring 清单补一行。
- 本文件 `docs/work-2026-11-09/wave4_item7_badge_gate.md`。

提交：`wave4/gates` 分支上单独 commit（消息参考仓库风格），未推送、未合并。

## 五、未核实项

- 真机未核实：门禁只做静态文本与数据对账，不渲染页面；徽标颜色呈现
  （`.st.ok` / `.st.part` 样式未动）与 jsdom 无关。
- 第 6 项修复合入后的实测通过：本分支上只做了 /tmp 副本自证；主文件分支
  与本分支合并后，须在合并结果上重跑 `check_all.py`，确认
  `check_badge_erridx` 由 FAIL 转 PASS（总协调人合并时验收）。

## 六、新发现的待定夺

1. **其余区的静态徽标是否同病**：本门禁只覆盖 NE/E/W 两区（59 行）。
   主文件其余区（拼读/词汇/语法等）也有 `st ok/part` 静态行（全文件
   ok「有病例 · 有练习」39 处、part「有练习 · 查过·没有病例」53 处，
   含 NE/E/W 的 9/29 处），是否同样逐行对 ERRIDX、有无同类漂移，未扫过。
   若要扩面，需先确认其余区徽标口径（有“有理解探针”等变体，与 E/W/NE
   的两态口径不同），请总协调人定夺是否另立项。
2. **`lawdata.cases` 与 ERRIDX 的口径说明**：全库 163 律的 ERRIDX 病例数
   多于 `lawdata.cases`（yaml/zone 来源），228 律的 ERRIDX 多于 LAWDATA
   `cases` 数。本门禁已按 ERRIDX 口径实现并在脚本 docstring 里写明；
   若将来有人误以 `lawdata.cases` 为准改徽标，会误判这 163 律，是否把
   该口径写进《数据源规范》，请总协调人定夺。
