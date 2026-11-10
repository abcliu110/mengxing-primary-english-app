# 第七波主文件线 A 工作底稿：第 13 / 14 / 15 / 16 / 17 项（2026-11-10）

> 定夺（主对话 Muse 已定，不重新定夺）。本线只做这 5 项；第 14、16 项只记
> 一笔，不改代码/文档。第七波为最后一波自动波：新发现的待定夺只记入底稿
> §六，不擅自实施。

## 一、第 13 项：phonics 律页病例口径定版，写进规范 §1

口径（定夺原文）：律页 cases = 该律 PHONLAWS 条目自身 cases（与徽标口径
一致）；ERRIDX 的 56 条是索引层面的病例登记，不直接等于律页 cases；
两者口径不同是设计使然。

实施：`laws-prototype/DATA_SOURCE_SPEC.md` §1 ERRIDX 行，在第六波第 7 项
句（“补齐须先定 phonics 律页病例口径。”）之后追加 1 句：

> （2026-11-10 第七波第 13 项：phonics 律页病例口径定版——律页 cases =
> 该律 PHONLAWS 条目自身 cases，与拼读区徽标口径一致；ERRIDX 的 56 条是
> 索引层面的病例登记（49 行合计），不直接等于律页 cases；两者口径不同是
> 设计使然。49 行维持「索引有 · 律页无」标注，律页 cases 仍为 0 是合规状态，
> 不再追补。）

49 行维持“索引有 · 律页无”标注（第六波第 7 项所加），律页 cases 仍为 0
是合规状态，不再追补；不写新病例内容。

**数字独立复核**（本波 jsdom 运行时实测，非沿用旧数）：PHONLAWS 52 行中
cases==0 且 ERRIDX>0 的行恰为 49 行，ERRIDX 合计 56 条；逐行分布与第六波
第 7 项底稿表一致（S-03/S-33/S-42 与 SR-01/SR-02/SR-07/SR-08 各 2 条，
其余 41 行各 1 条；未标注行仍为 S-14/S-43/SR-04）。ERRIDX 总数 524 /
覆盖 311 律不变（check_all gen_errors --check 通过）。

**规范修订程序注**：按该规范 §8，规范修订须经 Stewart 确认。本句为 §1
补记，与 §6 的 299→830 行历次修订同例，确认待安排——见第 16 项。

## 二、第 14 项：CO-17 不补独立页与练习，维持现状（只记一笔）

CO-17 不补独立规律页与练习，维持现状：#v-grammar2 的 data-law 行
（第六波第 8 项所加）+ 两处原 data-go 深研行（v-vocab、v-grammar2）+
深研单元 `v-u-co17` 可达。理由沿用第六波第 8 项底稿：独立规律页需要完整
律内容，现有材料里没有；无 LAWDATA 条目、无 quiz。ROSTER route 仍为空，
仍是 20 条“暂无讲解页”之一。本项不改代码、不改文档。

## 三、第 15 项：CO-17 两行标题重复，改 data-law 行标题

**改前**（#v-grammar2，紧邻两行）：
- data-law 行：“空心动词 + get 五构造”
- data-go 深研行：“空心动词 + get 五构造（在词汇解码区做深）”

**改后**：data-law 行标题改为 ROSTER[0] 原文（现有材料，逐字核对，未编造）：

> 英语把「做事」交给空心动词：动词管语法，名词装事情；get 一个词收成五个构造

data-go 深研行一字未动。只改标题字面，不删行、不改指向（`data-law="CO-17"`、
徽标 `st deep`「已做深」均未动）、不改 LAWFLAG。

**选此标题的理由**：① 与 ROSTER[0] 逐字一致，是该律在全册名册里的正式
标题，与其他 data-law 行“显示律 headline”的惯例一致；② 与紧邻深研行
标题明显区分；③ 备选“空心动词与 get 五构造”（LESSONS.co17 标题）与深研
行标题只差一字、区分太弱，未采用；④ 不写“（规律页）”类新表述——CO-17
本无独立规律页，写了即失实。

**门禁影响核查**：`tools/check_badge_erridx.py` 对 CO-17 特殊行只核对三事
（徽标 deep/「已做深」、LAWFLAG → u-co17、运行时 ERRIDX 与再生一致），
不核对标题文本；全库 grep 确认无其他脚本断言该行标题。check_all 通过后
亦证实。

## 四、第 16 项：《数据源规范》§6（299→830 行）与 §1 补记：待 Stewart 确认（只记一笔）

§6 静态徽标门禁行数的历次修订（第五波第 8 项 299 行、第六波第 11 项扩至
829 行、第六波第 8 项 + CO-17 深研行 1 行至 830 行）与本波第 13 项的 §1
补记，按规范 §8 均待 Stewart 确认。**本波不代确认**，请总协调人 / Priya
安排 Stewart 确认。本项不改文档。

## 五、第 17 项：C-06/C-07 例外按 id 判定，加注释，不改逻辑

实施：主文件 `preShortTitle` 函数内已有注释（第六波第 10 项）后追加 2 行：

> 第七波第 17 项：例外按 id（C-06/C-07）判定，将来改编号时例外随之
> 失效，须重审；本项只加注释，不改逻辑。

例外逻辑行 `if (id === 'C-06' || id === 'C-07') return s;` 一字未动；
`preBarHTML` 调用点未动；全局冒号/破折号截断与 12 字截断未动。

## 六、前后数字对照

| | 改前（8e278f2） | 改后 |
|---|---|---|
| #v-grammar2 data-law 行 | 32 行 | 32 行（行数不变，只改 1 行标题） |
| #v-grammar2 CO-17 行数 | 2 行（data-law + data-go） | 2 行 |
| CO-17 data-law 行标题 | 空心动词 + get 五构造 | 英语把「做事」交给空心动词：动词管语法，名词装事情；get 一个词收成五个构造（= ROSTER[0]） |
| 拼读区标注行 | 49 行「索引有 · 律页无」 | 49 行（不变） |
| 拼读律页 cases==0 & ERRIDX>0 | 49 行 / ERRIDX 56 条 | 不变（合规状态） |
| preBarHTML 遍历 | 453 条（87 站有先修条） | 453 条（87 站），裸《C-06 a》/《C-07 the》0 条 |
| C-08/C-09/C-14/C-19 芯片 | 全标题（第六波第 10 项改后） | 不变 |
| 规范 §1 ERRIDX 行 | 无第 13 项口径句 | +1 句口径定版 |
| 规范 §6 行数 | 830 行 | 830 行（本波未改 §6） |

## 七、验证结果

- jsdom（`/tmp/wave7a/jsdom_maina.js`，探针见附注）：ALL PASS——
  #v-grammar2 CO-17 恰 2 行，data-law 标题与 ROSTER[0] 逐字一致、
  data-go 标题不变、两行标题不同、data-law 行紧邻 data-go 行之前、
  两行徽标均为 deep/已做深、#v-grammar2 data-law 行仍 32 行；
  preBarHTML 遍历 453 条、有先修条 87 站、裸芯片 0 条、C-08/C-09/
  C-14/C-19 四站芯片全标题。另独立探针复核 49 行 / ERRIDX 56 条
  （§一）。jsdom 输出里有若干 `Not implemented: scrollTo` 与 gkMeasure
  字体报错，系 jsdom 画布/字体缺省噪音，与本波改动无关（改前基线同类
  探针亦有）。
- `python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html`：
  **node --check OK**（41 inline + 0 modules）；anchorcheck 已废止。
- `python3 laws-prototype/tools/check_all.py`：**27/27 通过**（结论：全部通过）。
  其中 `gen_laws --check`、`check_upstream`（五条上游链无未登记漂移）、
  `check_rel_coverage`（727 条有向边全对）、`check_badge_erridx`
  （830 行）、`check_lawdata_roster`（390 条）均 PASS。
- 手术脚本 `docs/work-2026-11-09/apply_wave7_maina.py`：演练核对通过
  （落点均唯一、标题与 ROSTER[0] 逐字一致）；`--apply` 写回后复核通过；
  重跑拒绝重复写回。脚本写回后复核逻辑曾有一处自检 bug（写回后重用写回前
  的 check()，把“旧行已消失”误报为落点异常），已修为写回后核新状态；
  写回本身无误，`git diff` 逐行核对无误（见 §八）。
- `git diff` 核对：主文件 +4/-2 行（注释 +2、标题 1 行改写）、规范 +1/-1 行
  （同一长行内追加 1 句），落点仅三处，无他处改动。

## 八、改动文件与提交

分支 `wave7/maina`（基于 8e278f2），作者 guoyun_liu <165559603@qq.com>，
**未 push**（总协调人合并后统一推）：

- `laws-prototype/mengxing-prototype-v1.html`：第 15 项标题 1 行、第 17 项
  注释 2 行（各单独 commit）。
- `laws-prototype/DATA_SOURCE_SPEC.md`：第 13 项 §1 口径句 1 句（单独 commit）。
- `docs/work-2026-11-09/apply_wave7_maina.py`：带断言手术脚本（默认演练，
  `--apply` 写回；已实施后拒绝重复写回）。
- 本文件 `docs/work-2026-11-09/wave7_maina.md`。

## 九、未核实项与新发现的待定夺（只列出，不实施）

- 真机未核实：jsdom 只验 DOM 与字符串；未在真实浏览器看 CO-17 新长标题
  在 #v-grammar2 列表里的实际呈现（长标题是否换行拥挤、与深研行并列时
  的视觉区分度）。`.urow .tt` 无省略样式，理论上完整显示，视觉效果待
  真机确认。
- 真机未核实：C-06/C-07 全标题芯片的窄屏呈现（第六波遗留，本波只复核
  字符串未变）。
- **新发现的待定夺（只记入底稿，不实施）**：
  1. CO-17 在 v-vocab 另有两处 data-go 深研行，标题各不相同（“空心动词 +
     get 的五个构造”、“空心动词：动词管语法，名词装事情；get 一个词收成
     五个构造”），加上 #v-grammar2 的两行，全站 CO-17 标题现为三种表述。
     是否统一全站 CO-17 标题口径、按哪一处为准，待 Priya / 总协调人定夺。
  2. 规范 §8 的 Stewart 确认待安排（第 16 项）：§6 行数历次修订与本波 §1
     补记均未确认，请总协调人安排。
  3. 49 行律页 cases 仍为 0 是合规状态（第 13 项定版），但 ERRIDX 56 条是
     否永远只留在索引里、还是将来某波按新口径收进律页，仍待另行定夺；
     本波不补病例。

## 附注：探针复现

- jsdom 主探针：`/tmp/wave7a/jsdom_maina.js`（工作树外临时脚本，未入仓；
  断言见文件头注释；jsdom 取自 `~/workspace/domtest/node_modules/jsdom`）。
- 49 行 / 56 条独立复核：`/tmp/wave7a/dbg_phon2.js`（读运行时 PHONLAWS.cases
  与 ERRIDX.cases 按律计数）。
- 手术脚本可复现：`python3 docs/work-2026-11-09/apply_wave7_maina.py`
  在 8e278f2 上重跑 `--apply` 应得同一 diff（脚本已实施后拒绝重复写回，
  复现时须在干净基线运行）。
