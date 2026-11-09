# 第六波主文件线 A 总底稿：第 7、8、10 项全部落地（2026-11-10）

> 起点 HEAD `788f0bd`（第五波完成，check_all 27/27）；终点 HEAD 见提交清单。
> 定夺：主对话 Muse 已定（Priya 2026-11-10 07:20“第五波新发现的 14 件
> 也你来定”之第 7、8、10 项），本波只实施、不重新定夺。
> 工作方式：linked worktree `~/workspace/wave6-main-a`（home 磁盘，非 /tmp），
> 分支 `wave6/main-a`，全部工作在该分支上，master 未动、无 force-push、
> 未 push 到 origin（待总协调人统一合并）。

## 0. 提交清单（`788f0bd..HEAD`，线性历史，4 提交）

| 提交 | 内容 |
|---|---|
| `7703fc5` | Content：第 7 项拼读区 49 行标注“索引有、律页无”，不补律页 cases |
| `e74b6fd` | Content：第 8 项 CO-17 补 data-law 行，不补独立规律页 |
| `5c2d25a` | Content：第 10 项 C-06/C-07 先修芯片显示完整标题 |
| （本稿提交） | Docs：第六波主文件线 A 总底稿 + 规范 §1 第 7 项注记 |

## 1. 按项汇报

### 第 7 项：拼读区 49 行标注“索引有、律页无”✅（`7703fc5`）

口径（脚本实时算出）：PHONLAWS cases == 0 且再生 ERRIDX > 0 的 S/SR 行，
共 49 行（S-01–S-42 除 S-14/S-43 共 41 行 + SR-01/02/03/05/06/07/08/09
共 8 行），ERRIDX 合计 56 条；未标注 3 行 S-14（2/2）、S-43（7/7）、
SR-04（1/1），cases 与 ERRIDX 相等，分叉不存在。实施只做标注：49 行各
+1 个 `<span class="ph-note">索引有 · 律页无</span>`（虚线边框小 pill，
沿用 `.lz-pre` 暖金配色，不用 `st` class，不进徽标门禁计数）、区首
`<p class="sub">` +1 句解释、样式 +1 条。PHONLAWS cases、ERRIDX、徽标、
律页渲染器一字未动；不写新病例内容。jsdom：52 行中标注 49 行，集合与
实时算出名单逐项一致，每行仍恰 1 个 `.st` 徽标。门禁仍 PASS（299 行）。
详见 `wave6_item7_phonics_labels.md`。

### 第 8 项：CO-17 补 data-law 行，不补独立规律页✅（`e74b6fd`）

新行（#v-grammar2 构式组，CO-16 行后）：`CO-17 · 空心动词 + get 五构造`
+ 徽标 st deep「已做深」；标题取自同区现有深研行，组标题范围扩为
CO-01–CO-17；原两处 data-go 深研行保留。点行落点已有：
`LAWFLAG['CO-17']='u-co17'`，`LAW.open` 先查 LAWFLAG，jsdom 点行后
`.view.on` 由 `v-home` 变为 `v-u-co17`；运行时先修标记「⏳ 先修 CO-12」
如期出现。门禁 CO-17 从排除项转为特殊行：覆盖 **299 → 300 行**，特殊行
只核对徽标、LAWFLAG 落点（只在 `var LAWFLAG={...}` 内核对）、运行时
ERRIDX 与再生一致（2 条）；check_all docstring 与规范 §6 行数同步。
反向自证：徽标改错、只改 LAWFLAG 各报且只报 1 行。手术脚本在 7703fc5
四文件上重跑，输出与提交态逐字节一致。详见 `wave6_item8_co17_row.md`。

### 第 10 项：C-06/C-07 先修芯片显示完整标题✅（`5c2d25a`）

`preShortTitle(hl)` → `preShortTitle(hl, id)`，只在 id 为 C-06/C-07 时
返回全标题（跳过冒号截断）；其余律仍按冒号/破折号截断与 12 字截断，
全局截断逻辑一字未动；调用点 `preBarHTML` 传 `t`。jsdom 全量 453 条
`preBarHTML` 前后比对：**变化 4 条（C-08、C-09、C-14、C-19）、不变
449 条**；变化的 4 条逐条核对为芯片文本补全（《C-06 a》→《C-06
a：认出是哪一类就行》；《C-07 the》→《C-07 the：就是那一个》），
`onclick` 与 `title` 属性一字未动；全库再无裸 `a`/`the` 芯片。
详见 `wave6_item10_c0607_chips.md`。

## 2. 验证总览（最终 HEAD `5c2d25a` + 本稿提交前）

- `python3 laws-prototype/tools/check_all.py`：**27/27，“结论：全部通过”**
  （项数不变；徽标门禁内部 299 → 300 行，同一项）。
- `python3 laws-prototype/tools/check_badge_erridx.py`：**PASS**（300 行：
  ERRIDX 区儿童行 112、教师行 21、拼读区 52、家长区 114、CO-17 深研行 1；
  ERRIDX 524 条 / 覆盖 311 律）。
- `python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html`：
  **node --check OK**（41 inline + 0 modules）；anchorcheck FAIL **116 项**，
  与 788f0bd 基线逐项集合比对完全一致（见 §5），为基线遗留，非本波引入。
- jsdom：三项探针见各底稿 §四（49 行标注集合、CO-17 点行路由、453 条
  先修条 diff）。

## 3. 前后数字对照

| | 改前（788f0bd） | 改后（本分支） |
|---|---|---|
| check_all 项数 / 通过 | 27 / 27 | 27 / 27 |
| 静态徽标门禁覆盖 | 299 行 | **300 行**（+ CO-17 深研行 1） |
| 拼读索引“索引有 · 律页无”标注 | 0 行 | **49 行**（另 3 行无分叉） |
| #v-grammar2 data-law 行 | 31 行 | **32 行**（+ CO-17） |
| 先修条裸 `a`/`the` 芯片 | 4 条 | **0 条** |
| anchorcheck | 116 项 | 116 项（集合一致） |

## 4. 同步与提交

- 分支 `wave6/main-a`（基于 788f0bd），3 个 Content 提交 + 本 Docs 提交，
  线性历史，无合并提交、无 force-push；master 未动，**未 push 到 origin**，
  待总协调人统一合并。
- 工作树 `~/workspace/wave6-main-a`（home 磁盘），汇报后先留着不要删，
  协调人合并后统一清理。

## 5. 未核实项

- 真机未核实：49 处虚线标注的实际呈现（与徽标是否拥挤、小屏换行）、
  CO-17 新行在 CO 序列里的实际呈现与点行进深研单元后的返回路径、
  C-08/C-09/C-14/C-19 四站先修条长芯片的实际呈现。jsdom 只验 DOM 结构、
  文本与点击路由。
- anchorcheck 116 项：本波未动（第六波第 9 项已定正式废止，由白板线/
  总协调人执行，本线只比对集合确认无新增）。

## 6. 新发现的待定夺（均未擅自做）

1. **补齐须先定 phonics 律页病例口径**（第 7 项定夺原文，本波只记录）：
   49 行律页 cases 仍为 0、ERRIDX 56 条仍只在索引里；是否收进拼读律页、
   按什么口径收，待 Priya / 总协调人定夺。
2. CO-17 仍无 LAWDATA 条目、无独立规律页、无 quiz——新行徽标「已做深」
   只说明内容在深研单元；是否补独立规律页、是否配练习，待另行定夺。
3. CO-17 的 data-law 行与紧邻的 data-go 深研行标题几乎相同，列表里连着
   出现两行 CO-17；是否嫌重复、要不要把深研行改成纯说明行，待定夺。
4. 《数据源规范》§6 本次修订（299 → 300 行 + CO-17 一句）与 §1 补记
   （第 7 项注记）按 §8 待 Stewart 确认——与第五波第 9 项同例，请总协调
   人安排。
5. 第 10 项例外按 id 判定：若将来 C-06/C-07 改编号，例外随之失效回落为
   旧截断，需重审（底稿已登记）。

## 7. 工作底稿（`docs/work-2026-11-09/`）

- `wave6_item7_phonics_labels.md`（第 7 项）+
  `apply_wave6_item7_phonics_labels.py`
- `wave6_item8_co17_row.md`（第 8 项）+
  `apply_wave6_item8_co17_row.py`
- `wave6_item10_c0607_chips.md`（第 10 项）+
  `apply_wave6_item10_c0607_chips.py`
- 本总底稿 `wave6_main_a.md`
