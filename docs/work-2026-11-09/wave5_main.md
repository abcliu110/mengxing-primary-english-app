# 第五波主文件线总底稿：5 项定夺全部落地（2026-11-09）

> 起点 HEAD `d698a3c`（第四波完成，check_all 26/26）；终点 HEAD 见提交清单；
> check_all 26 → **27 项**，全部通过。
> 定夺：主对话 Muse 已定（Priya 2026-11-09 20:16“第四波新发现的 13 件也你来定”
> 之第 7–11 项），本波只实施、不重新定夺。
> 工作方式：linked worktree `/tmp/wave5-main`，分支 `wave5/main-line`，
> 全部工作在该分支上，master 未动、无 force-push。

## 0. 提交清单（`d698a3c..HEAD`，线性历史，6 提交）

| 提交 | 内容 |
|---|---|
| `1aea7b9` | Content：第 7 项 preLawTitle 改按 hl 值回落，14 个 ptr 条目先修条补 ROSTER 标题 |
| `af5292a` | Content：第 8 项静态徽标门禁扩面至全部 299 行（ERRIDX 区 + 拼读区 + 家长区） |
| `a26393e` | Content：第 8 项 V/CO/QI 41 行静态徽标与 ERRIDX 对齐（part→ok） |
| `d796238` | Content：第 11 项 LAWDATA 对账检查进 check_all（check_all 26→27 项） |
| `45043f6` | Docs：第 9 项 lawdata.cases 与 ERRIDX 口径写进《数据源规范》 |
| `46fb9a7` | Docs：第 10 项 anchorcheck 116 项基线清查分类（A 类 116 / B 类 0 / C 类 0） |
| （本稿提交） | Docs：第五波收尾——总底稿 |

## 1. 按项汇报

### 第 7 项：14 个 ptr 条目先修标题 ✅（`1aea7b9`）

`preLawTitle` 改按 hl 值回落：LAWDATA.hl → ROSTER[0] → 只写编号
（改前是条目级回落，LAWDATA 有条目即只取其 hl）。一行功能改动
（`if (e) return e.hl || '';` → `if (e && e.hl) return e.hl;`）+
两处注释同步。14 个 ptr 条目（C-01/04/06/07/09/10、PR-01/05/07/08、
QI-01/02/05/13）的 ROSTER[0] 标题逐条核对一字相同。
jsdom 全量 453 条 `preBarHTML` 前后比对：**变化 29 条、不变 424 条**，
变化全是裸编号加标题，无已有标题被改；14 个标题的短标题与 `title`
全标题逐条核对一致。C-06/C-07 截后只剩 `a` / `the`（冒号截断的既有
规则结果），未另作处理。详见 `wave5_item7_ptr_titles.md`。

### 第 8 项：其余区静态徽标扩面扫 ✅（`af5292a` + `a26393e`）

扫面：全部 299 行 `urow data-law` 行（v-expr 30、v-expr2 29、v-vocab 43、
v-grammar2 31、v-phon-laws 52、v-parents 114）。
- **修 41 行**：V 区 19 行、CO 区 11 行、QI 区 11 行，part→ok
  （有病例 · 有练习），根因与 E/W/NE 同病（病例波后静态行未跟进）。
  三源核对：ERRIDX 运行时 = 再生，quiz 皆 ≥1（V 皆 1，CO/QI 皆 4）。
- **不修**：拼读区 52 行（口径不同：徽标的“病例”指本律 PHONLAWS 条目
  自身的 cases、“理解探针”指 prb 有无，52/52 一致；硬套 ERRIDX 会
  误判 49 行）；家长区 114 行（计数式徽标逐数核对 0 不符，33 条光秃
  「成人层」三数皆为 0）。
- **不补行**：V-33（ptr 指 morph 区，data-go 深研行 u-v33）、V-40
  （data-go 深研行 u-v40，打包对照单元）、CO-17（无 LAWDATA 条目、
  无独立规律页，data-go 深研行 u-co17）、S-44（LINKIDX z='MZ'，
  内容在 morph 区）。
- 门禁扩面：`check_badge_erridx.py` 59 行 → **299 行**，同一脚本、
  同一 check_all 项（项数不变）；分三区口径比对，运行时 LAWDATA
  改为合并口径（基础 ← PHONLAWS ← SUPPDATA），4 条排除项显式登记
  并核对去处在位。门禁先行失败 41 行（与扫面逐行一致），修复后 PASS；
  反向自证 4/4（ok→part、part→ok、拼读探针半句、家长计数各报且只报
  1 行）。详见 `wave5_item8_other_badges.md`。

### 第 11 项：LAWDATA 对账检查 ✅（`d796238`，check_all 26→27 项）

新建 `laws-prototype/tools/check_lawdata_roster.py`，接进 check_all
（`check_rel_coverage` 之后）。核对三事：① 字面量 + 合并源 = 运行时
条数（基础 224 + PHONLAWS 52 + SUPPDATA 114 = 运行时 390，无重叠）；
② hl == ROSTER[0]（重叠条目，323/323；运行时 390 条全在 ROSTER 中）；
③ 无 hl ⟺ ptr 条目（67/67 同集）。HEAD 上 PASS；反向自证：hl 改名
漂移报 E-01、制造重叠三处子检查同时报、多传参数退出码 2。
详见 `wave5_item11_lawdata_roster.md`。

### 第 9 项：lawdata.cases 与 ERRIDX 口径写进《数据源规范》 ✅（`45043f6`）

`laws-prototype/DATA_SOURCE_SPEC.md` 两处：§1 ERRIDX 行末 +1 段 dated
登记（ERRIDX 是“某律有无病例”的唯一权威源，徽标以它为准；
lawdata.cases 与运行时 LAWDATA cases 只是覆盖不同的另一份镜像；
实测 ERRIDX 在 163 律上多于 lawdata.cases、在 150 律上多于运行时
LAWDATA cases——按基础字面量计为 228 律，两口径都写明；拼读区例外）；
§6 +1 段（徽标门禁与 LAWDATA 对账检查的口径登记）。数字皆由本波
实测脚本得出，163/228 与第四波一致。详见
`wave5_item9_datasource_spec.md`。

### 第 10 项：anchorcheck 116 项基线清查分类 ✅（`46fb9a7`，不修）

分类：**A 类已删旧文件/旧白板的残留锚 116 项、B 类现文件真实缺失的锚
0 项、C 类其他 0 项**。116 = 标记类 60（白板引擎/舞台 12、WO/ZE 总枢 9、
首页改版+HD 导图 8、词源卡 5、练习闭环+总地图 5、口语功能地图 3、
词汇拆分 2、词缀词汇 3、语法例句 4、去重 3、别名词条 3、决策 6
空间隐喻/拼读剧场 3）+ 按需加载模块 43 + 实验室页签舞台 13。
证据：老合并版文件 2026-11-03 由 `d1c946f` 删除（删除前一版含这些
锚点 20 处）；锚点字符串在现行主文件 git 历史上无任何提交；现行主文件
`wbmod-` / `WB_STAGE` / `LAB_GROUPS` 等皆 0 次；e97aaec 与 d698a3c
的 116 项逐项集合比对完全一致。推荐处置：由白板线/总协调人定夺后
正式废止 anchorcheck（立 RETIRED 标记，参照 r2check 前例），不补锚点、
不改期望值、不列入门禁。完整 116 项原文快照与分组明细见
`wave5_anchorcheck_triage.md` +
`wave5_anchorcheck_triage.json`。

## 2. 验证总览（最终 HEAD）

- `python3 laws-prototype/tools/check_all.py`：**27/27，“结论：全部通过”**
  （26 项原有全绿 + 新增 `check_lawdata_roster` PASS；第 8 项门禁扩面
  未新增项，仍为同一 `check_badge_erridx` 项）。
- `python3 laws-prototype/tools/check_badge_erridx.py`：PASS（299 行：
  ERRIDX 区儿童行 112 行徽标全对、教师行 21 行在位，拼读区 52 行、
  家长区 114 行按各自口径全对；ERRIDX 524 条 / 覆盖 311 律）。
- `python3 laws-prototype/tools/check_lawdata_roster.py`：PASS
  （224+52+114=390；hl 323/323；无 hl ⟺ ptr 67）。
- `python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html`：
  **node --check OK**（41 inline + 0 modules）；anchorcheck FAIL **116 项**，
  与 e97aaec 基线逐项集合比对一致（见第 10 项），为基线遗留，非本波引入。
- jsdom：第 7 项 453 条 preBarHTML 改前改后 diff（29 变 / 424 不变）；
  运行时 LAWDATA 390 条、LINKIDX.g 453 条核对一致。
- 其余生成器 `--check`：均在 check_all 链内通过（gen_laws、check_upstream、
  check_rel_coverage 等）；`gen_errors --check` 通过（ERRIDX 524 条）。

## 3. 前后数字对照

| | 改前（d698a3c） | 改后（本分支） |
|---|---|---|
| check_all 项数 | 26 | **27**（+check_lawdata_roster；徽标门禁扩面不另增项） |
| check_all 通过 | 26/26 | 27/27 |
| 静态徽标门禁覆盖 | 59 行 | **299 行**（ERRIDX 区 133 + 拼读区 52 + 家长区 114） |
| 静态徽标不符行 | 41 行（V 19 + CO/QI 22，未检出） | 0 行 |
| 先修条裸编号目标 | 14 个 ptr 目标只写编号 | 14 个目标 29 条先修条显示 ROSTER 标题 |
| LAWDATA 对账 | 无检查 | 进链，HEAD 上 PASS（224+52+114=390；hl 323/323） |
| anchorcheck 116 项 | 未分类 | 已分类（A 116 / B 0 / C 0），不修 |

## 4. 同步与提交

- 分支 `wave5/main-line`（基于 d698a3c），6 提交 + 本总底稿提交，线性历史，
  无合并提交、无 force-push；master 未动。推送情况见汇报（SSH 恢复步骤
  已按任务书备好；若推送失败，汇报里写明分支名与提交）。
- 工作树 `/tmp/wave5-main` 汇报后先留着不要删，协调人合并后统一清理。

## 5. 未核实项

- 真机未核实：29 站先修条与 V/CO/QI 徽标的视觉呈现、12 句朗读的真机语音
  听感（前波遗留）、C-06/C-07 芯片短标题只剩 `a` / `the` 的呈现效果。
- /tmp 512M tmpfs 在本波中途多次写满（另一边白板 agent 的大文件所致，
  本波未动他人文件）：第 8 项反向自证中途删自家 3 个 18MB 副本后重做通过；
  第 10 项底稿 `wave5_anchorcheck_triage.md` 因 /tmp 写满未能直接落盘，
  改走 `git hash-object -w` 入库（blob 内容已与 home 磁盘副本逐字节核对
  一致），工作树里该文件暂为 0 字节（` M` 状态），待 /tmp 有空间时
  `git checkout --` 恢复即可，分支内容本身正确无误。

## 6. 新发现的待定夺（均未擅自做）

1. 拼读区 ERRIDX 与律页 cases 的口径分叉（49 行）：是否把拼读律页的
   cases 补齐到与 ERRIDX 一致，或反过来把 ERRIDX 的 S 律病例标为
   “索引有、律页无”（第 8 项底稿 §六）。
2. CO-17（无 LAWDATA 条目、无独立规律页）只在深研组行里出现：是否补
   独立规律页或补 data-law 行（第 8 项底稿 §六）。
3. anchorcheck 是否正式废止（第 10 项推荐；须白板线/总协调人定夺）。
4. C-06/C-07 芯片短标题只剩 `a` / `the`：是否另改截断规则（第 7 项底稿 §五）。
5. v-tech 区数百 `data-tec` 行（TEC-* 自有户口）未纳入本次徽标对账；
   技巧区徽标有无同类漂移，未扫过（第 8 项底稿 §六）。
6. 《数据源规范》§8 规定修订须经 Stewart 确认：第 9 项修订是主对话已定夺
   事项后实施的，Stewart 的确认仍待总协调人安排（第 9 项底稿 §四）。
7. 第四波底稿“其余区 ok 39 处、part 53 处”与本次逐行实测不符（实测 ok 30
   处 + 各变体；见第 8 项底稿 §一注）——第四波数字疑为全文件文本计数或
   旧口径，本次以逐行实测为准，请总协调人知悉。
8. /tmp 512M tmpfs 多次写满：两个 wave5 工作树（主文件线 + 白板线）与
   大量 18MB 临时副本同挤 512M，协调人合并后清理工作树可解；后续大
   波次建议把工作树放 home 磁盘而非 /tmp。

## 7. 工作底稿（`docs/work-2026-11-09/`）

- `wave5_item7_ptr_titles.md`（第 7 项）+ `apply_wave5_item7_ptr_titles.py`
- `wave5_item8_other_badges.md`（第 8 项）+ `apply_wave5_item8_other_badges.py`
- `wave5_item11_lawdata_roster.md`（第 11 项）
- `wave5_item9_datasource_spec.md`（第 9 项）
- `wave5_anchorcheck_triage.md`（第 10 项）+ `wave5_anchorcheck_triage.json`
  （116 项原文快照）
- 本总底稿 `wave5_main.md`
