# 第五波第 9 项工作底稿：lawdata.cases 与 ERRIDX 口径写进《数据源规范》（2026-11-09）

> 定夺（主对话 Muse 已定）：把 lawdata.cases 与 ERRIDX 的口径写进
> 《数据源规范》，徽标以 ERRIDX 为准。
> 实施：只改 `laws-prototype/DATA_SOURCE_SPEC.md` 两处（§1 ERRIDX 行、
> §6 校验门），不改任何数据与代码。

---

## 一、写进规范的内容

### §1「错句反查索引（ERRIDX）」行末（新增 dated 登记）

- ERRIDX（`tools/gen_errors.py` 的 `gen_errors.build` 再生结果）是
  “某律有无病例”的**唯一权威源**，静态徽标对账
  （`tools/check_badge_erridx.py`）以它为准。
- `laws_master` 的 `lawdata.cases` 与运行时 LAWDATA 的 `cases` 只是
  覆盖不同的**另一份镜像**：lawdata.cases 是 ERRIDX 四路汇合的第一路。
- 实测数字（2026-11-09，现行数据）：ERRIDX 524 条 / 覆盖 311 律，
  来源 lawdata 259 / yaml 111 / zone 154；ERRIDX 在全库 **163 律**上
  多于 lawdata.cases（yaml/zone 病例汇入所致）、在 **150 律**上多于
  运行时 LAWDATA cases（按基础字面量计为 228 律——第四波底稿的 228
  即按基础字面量计，本次两口径都写明，免得以后对不上）。
  以 lawdata.cases 或 LAWDATA cases 为准改徽标会误判这 163/150 律。
- 例外：拼读区（S/SR）徽标的“病例”不指 ERRIDX，指本律 PHONLAWS
  条目自身的 cases（规律页实际呈现的病例），ERRIDX 在该区 49 行上
  多于律页 cases，属口径分叉、不是徽标错误（见第 8 项底稿 §二与
  门禁 docstring）。

数字核对方法：`gen_errors.build(master, contrast)` 再生 ERRIDX 逐律
计数，对 `lawdata.cases`（总表）与运行时 LAWDATA `cases`（基础字面量
← PHONLAWS ← SUPPDATA 合并）逐律比大小；ERRIDX 在任何一律上都不
少于 lawdata.cases（0 律反向），与“lawdata 是第一路汇合源”一致。

### §6 校验门（新增一段）

- 静态徽标门禁（第四波第 7 项立、第五波第 8 项扩面至全部 299 行）：
  `tools/check_badge_erridx.py`（check_all 第 26 项），分三区口径
  （ERRIDX 区 133 行 / 拼读区 52 行 / 家长区 114 行）。
- LAWDATA 对账检查（第五波第 11 项）：`tools/check_lawdata_roster.py`
  （check_all 第 25 项），基础字面量 224 + PHONLAWS 52 + SUPPDATA 114
  = 运行时 390 条、hl == ROSTER[0]、无 hl ⟺ ptr。

## 二、验证结果

- 本项只改文档，不改数据与代码：`python3 laws-prototype/tools/check_all.py`
  终验在第 11 项合并后统一跑（见总底稿），27/27 全部通过；改规范本身
  不影响任何检查项。
- 数字复核：163 / 150 / 228 三数皆由本波实测脚本得出（见 §一），
  与第四波门禁底稿的 163 一致；228 与第四波的 228 一致（口径为基础
  字面量），150 为本次新增的运行时口径数。

## 三、改动文件与提交

- `laws-prototype/DATA_SOURCE_SPEC.md`：§1 ERRIDX 行 +1 段（dated 登记）、
  §6 +1 段（两门禁口径登记）。
- 本文件 `docs/work-2026-11-09/wave5_item9_datasource_spec.md`。

提交：分支 `wave5/main-line` 上 `Docs：第五波第 9 项——lawdata.cases 与 ERRIDX
口径写进《数据源规范》`（基于 d698a3c）。

## 四、未核实项

- 规范 §8 规定“本规范的修订须经 Stewart 确认”：本次修订是主对话 Muse
  的已定夺事项（第五波第 9 项）后实施的，但 Stewart 的确认仍待总协调人
  安排，本项只负责把口径写进去，不代确认。
- §1 ERRIDX 行正文里的旧数（381 条 / 217 律、来源 116/111/154 等
  2026-11-04 历史登记）未动：本次只在行末追加 2026-11-09 现行口径
  登记，未重写整行历史——旧数作为历史记录保留，全行重写须另立项。
