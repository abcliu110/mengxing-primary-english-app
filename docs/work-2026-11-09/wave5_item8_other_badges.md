# 第五波第 8 项工作底稿：其余区静态徽标扩面扫（2026-11-09）

> 定夺（主对话 Muse 已定）：其余区静态徽标扩面扫，就在这波做；变体口径
> 逐区写明、不硬套 ERRIDX 比对；能进门禁的区扩进门禁。
> 实施：门禁扩面 `laws-prototype/tools/check_badge_erridx.py`（先报 41 行
> 不符）→ 修复 `docs/work-2026-11-09/apply_wave5_item8_other_badges.py`
> （带断言手术脚本，仿照第四波第 6 项，默认演练，`--apply` 写回）。

---

## 一、扫面：全部 299 行静态索引行（`urow data-law` 行）

| 区段 | 行数 | 律族 | 徽标口径 | 结果 |
|---|---|---|---|---|
| #v-expr | 30 | E/W | ERRIDX（第四波已对齐） | 0 不符 |
| #v-expr2 | 29 | NE | ERRIDX（第三波已对齐） | 0 不符 |
| #v-vocab | 43 | V | ERRIDX（与 E/W/NE 同口径） | **19 行 part→ok** |
| #v-grammar2 | 31 | CO/QI | ERRIDX（part 文本同义不同字） | **22 行 part→ok** |
| #v-phon-laws | 52 | S/SR | 本律 cases/prb（不套 ERRIDX） | 0 不符，**不修** |
| #v-parents | 114 | TM/WA/LS/YL/CB/CG/VB | 计数式（探针/病例/练习三数） | 0 不符，**不修** |
| 合计 | 299 | | | **41 行修** |

注：第四波底稿称“其余区 ok 39 处、part 53 处”，与本次实测不符。
本次按 `urow data-law` 行逐行实测（d698a3c）：其余区 ok「有病例 · 有练习」
30 处（V 19 + CO/QI 8 + S/SR 3）、part「有练习 · 查过·没有病例」24 处
（V）、part「有练习 · 还没有病例」23 处（CO/QI）、拼读变体 52 处、家长
计数 114 处。第四波的 39/53 疑为全文件文本计数（含非 urow 行）或旧口径，
本次以逐行实测为准。

## 二、分口径说明（逐区写明）

### 1. ERRIDX 区：#v-expr、#v-expr2、#v-vocab、#v-grammar2（133 行）

口径与第四波门禁一致：有 ERRIDX 病例 + 有练习 → ok「有病例 · 有练习」；
无病例 + 有练习 → part；教师层行挂 `tchr`「教师层」只核对在位。
权威源是 `gen_errors.build` 再生出的 ERRIDX（与 `gen_errors --check`
同口径）；运行时 ERRIDX 须与再生逐律相等；`lawdata.cases` 只作第三源
数字打印，不单独定徽标。

- V 区 part 文本与 E/W/NE 相同（「有练习 · 查过·没有病例」）；
  CO/QI 区 part 文本为「有练习 · 还没有病例」——同义不同字，门禁接受
  两种文本，不强行统一措辞。
- QI 全 15 行的 `lawdata.cases`（0–2）皆小于 ERRIDX（2–4），V-20/21/
  30/32/34–38 等 ptr 条目的运行时 LAWDATA cases 为 0 而 ERRIDX 为 1–2：
  皆因 yaml/zone 病例汇入 ERRIDX。徽标仍以 ERRIDX 为准——与第四波
  门禁口径一致，也是 V-15/21/32/34–38 等 ptr 条目早已挂 ok 的既有做法。
- 根因与 E/W/NE 同病：病例波（ERRIDX 381→524）后静态行未跟进。

### 2. 拼读区 #v-phon-laws（S/SR，52 行）：口径不同，不套 ERRIDX

徽标的“病例”指本律 PHONLAWS 条目自身的 `cases`（规律页实际呈现的
病例），“理解探针”指本律 `prb` 有无：

| 徽标 | 条件 | 行数 |
|---|---|---|
| ok「有病例 · 有理解探针」 | cases > 0（且 prb > 0） | 3（S-14、S-43、SR-04） |
| part「还没有病例 · 有理解探针」 | cases = 0 且 prb > 0 | 46 |
| part「还没有病例 · 还没有理解探针」 | cases = 0 且 prb = 0 | 3（S-01、S-13、S-23） |

52/52 行与该口径一致。判据：ok 的 3 行恰为仅有的 3 条 cases>0 的律
（S-14 cases=2、S-43 cases=7、SR-04 cases=1）；探针半句与 prb 有无
52/52 一致（S-36/S-42/SR-01 的 prb=5，仍只写“有理解探针”，只认有无、
不认条数）。若硬套 ERRIDX 会误判 49 行：ERRIDX 含 yaml/zone 病例
（如 S-01 lawdata.cases=1、ERRIDX=1），但拼读律页不呈现这些病例——
ERRIDX 与律页 cases 的分叉是口径分叉，不是徽标错误（另见第 9 项
《数据源规范》登记）。门禁按本口径逐行比对，不查 ERRIDX 有无
（但仍查运行时 ERRIDX 与再生逐律相等，即索引本身未陈旧）。

### 3. 家长区 #v-parents（114 行）：计数式徽标，三数逐个对账

徽标形如 `成人层 · 探针×N · 病例×N · 练习×N`，分量只在 >0 时出现：
探针×N = 运行时 LAWDATA 该律 `prb` 条数，病例×N = 再生 ERRIDX 病例数，
练习×N = 运行时 LAWDATA 该律 `quiz` 题数；三数皆为 0 时徽标就是光秃的
「成人层」（33 行，皆为 TM/WA 律，prb=cases=quiz=ERRIDX=0）。
81 条带数行逐数核对 0 不符，33 条光秃行一致。**不修**，门禁按此口径
逐行比对。

### 4. 无本区 data-law 行的 4 条：各有去处，不补行

| 律 | 原因 | 去处（门禁核对在位） |
|---|---|---|
| V-33 | ptr 指向 morph 区（LINKIDX z='MZ'） | v-vocab 里 data-go 深研行 u-v33 |
| V-40 | 打包对照单元深研行，非标准律行 | v-vocab 里 data-go 深研行 u-v40，徽标 st deep「已做深」 |
| CO-17 | 无 LAWDATA 条目、无独立规律页（ROSTER route=''，20 条“暂无讲解页”之一） | v-vocab / v-grammar2 里 data-go 深研行 u-co17（一词多义 V-40–V-45 + CO-17 组） |
| S-44 | 内容在 morph 区（RV_GENQ S-44 屈折三读） | LINKIDX z='MZ' |

另：v-vocab / v-grammar2 里还有 TA 站行（`onclick="VB.openTA(...)"`，
18 行）与 data-go 行（u-s36、u-sr01、u-s42 等），皆无 `data-law`，
不在 299 行口径内；v-tech 区另有数百 `data-tec` 行，属技巧区自有
户口（TEC-*），亦不在本次范围。

## 三、修复：41 行 part→ok（主文件 41 处徽标，只换徽标）

| 区 | 行 | 病例 ERRIDX（再生/运行时） | quiz |
|---|---|---|---|
| V-02/03/06/08/09/11/13/14/17/19/20/24/27/28/29/30/41/42/45（19 行） | part → ok | 1–3（V-24 为 3，其余 1–2） | 1 |
| CO-01/02/05/06/08/09/10/12/14/15/16（11 行） | part → ok | 1–2 | 4 |
| QI-01/02/03/05/06/07/08/09/12/14/15（11 行） | part → ok | 2–4 | 4 |

不动的行：V 区其余 24 行（ok 19 行全对；part 行 V-04/22/23/26/31
的 ERRIDX 皆为 0）；CO/QI 其余 9 行（ok 行 CO-03/04/07/13、
QI-04/10/11/13 全对；CO-11 是唯一正确的 part，ERRIDX 0）。
标题、位置、分组未动；拼读区 52 行与家长区 114 行未动。

## 四、门禁扩面（check_badge_erridx.py，check_all 项数不变）

- 覆盖 59 行 → **299 行**（ERRIDX 区儿童行 112 + 教师行 21 + 拼读区
  52 + 家长区 114），同一脚本、同一 check_all 项，项数仍为 26（第 11 项
  另 +1，见总底稿）。
- 新增：运行时 LAWDATA 合并（基础字面量 ← PHONLAWS ← SUPPDATA，与
  `check_rel_coverage.py` 同通道，此前门禁只读基础字面量 224 条，
  查不到 S/SR 与家长区律的 quiz/prb）；分三区口径比对（§二）；
  每区行集合与 laws_master 对应律集逐区核对，4 条排除项显式登记并
  核对去处在位（V-33/V-40/CO-17 的 data-go 行、S-44 的 LINKIDX z='MZ'）。
- check_all.py docstring 徽标门禁行同步改写。

验证：
- 门禁先行失败（扩面后、修复前）：**41 行不符**（V 19 + CO/QI 22），
  拼读区、家长区、行集合 0 不符——与 §一扫面逐行一致，未为通过而
  放宽门禁。
- 修复后门禁 **PASS**（299 行：ERRIDX 区儿童行 112 行徽标全对、教师行
  21 行在位，拼读区 52 行、家长区 114 行按各自口径全对；ERRIDX 524 条 /
  覆盖 311 律，运行时与再生逐律一致）。
- 反向自证（/tmp 副本，仓库文件未动）：V-01 ok→part、CO-11 part→ok、
  S-01 探针半句改错、TM-01 探针计数 1→2，各报且只报 1 行不符——
  四区口径双向都受检。（注：自证中途 /tmp 512M tmpfs 一度写满，
  删自家 3 个 18MB 副本后重做通过；工作树 /tmp/wave5-main 本身 204M，
  未动。）
- `python3 laws-prototype/tools/check_all.py`：终验在第 11 项合并后
  统一跑（见总底稿）；本项提交前单跑徽标门禁 PASS。

## 五、改动文件与提交

- `laws-prototype/tools/check_badge_erridx.py`：扩面至 299 行（单独 commit）。
- `laws-prototype/tools/check_all.py`：docstring 徽标门禁行改写（同上 commit）。
- `laws-prototype/mengxing-prototype-v1.html`：V/CO/QI 41 行徽标 part→ok
  （单独 commit）。
- `docs/work-2026-11-09/apply_wave5_item8_other_badges.py`：带断言手术脚本。
- 本文件 `docs/work-2026-11-09/wave5_item8_other_badges.md`。

提交：分支 `wave5/main-line` 上两提交（门禁扩面、41 行修复），基于 d698a3c。

## 六、未核实项与新发现的待定夺

- 真机未核实：只验 DOM 徽标 class 与文本，未在真实浏览器看 #v-vocab /
  #v-grammar2 的徽标颜色呈现（`.st.ok` 全局样式未动，与 E-02 等同款，
  呈现应一致）。
- 拼读区 ERRIDX 与律页 cases 的口径分叉（49 行）：本次按律页口径核对
  通过、未修徽标；是否应把拼读律页的 cases 补齐到与 ERRIDX 一致
  （即 S 律页也呈现 yaml/zone 病例），或反过来把 ERRIDX 的 S 律病例
  标为“索引有、律页无”，请总协调人定夺——本项未擅自改任何一方数据。
- CO-17（无 LAWDATA 条目、无独立规律页）只在深研组行里出现：是否应
  给它补独立规律页或补 data-law 行，请总协调人定夺，本项未补。
- v-tech 区数百 `data-tec` 行（TEC-* 自有户口）未纳入本次徽标对账；
  技巧区徽标有无同类漂移，未扫过。
