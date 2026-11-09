# 第四波总底稿：8 项定夺全部落地（2026-11-09）

> 起点 HEAD `59844d7`；终点 HEAD 见提交清单；check_all 24→**26 项**，全部通过。
> 定夺：主对话 Muse 已定（Priya 2026-11-09 18:21“这 8 件新的也你来定”），本波只实施、不重新定夺。

## 0. 提交清单（`59844d7..HEAD`，线性历史，9 提交，无 force-push）

| 提交 | 内容 |
|---|---|
| `3b6fd16` | Content：第 2 项 give on (onto) 另立 vv_give_on（由已下线 vv_give_on 原文恢复 2 幕） |
| `39c206d` | Content：第 3 项 give back ① 开场句改写为常用搭配事实陈述（只改这一句） |
| `3e56b04` | Bug：第 4(a) 项白板 470 精灵缺失清单与空 stub 生成脚本（打包失败定位） |
| `3c5551e` | Bug：第 4(b) 项 wb13 两生成器过时断言改为实测推导，--check-only 恢复 |
| `edf4936` | Docs：第 4(c) 项 r2check 废止与替代验证法 |
| `5ea1228` | Content：第 5 项 preBarHTML 标题回落加 ROSTER，TA 先修条显示标题 |
| `9082b2f` | Content：第 6 项 E/W 10 行静态徽标与 ERRIDX 对齐（part→ok） |
| `e6c622a` | Content：第 7 项静态徽标 × ERRIDX 对账门禁进 check_all（check_all 24→25 项） |
| `dbf3e58` | Content：第 8 项 jscheck node --check 列为提交门禁（check_all 25→26 项） |
| （本稿后补） | Docs：第四波收尾——docstring 第 8 条同步 + r2check 表述精确化 + 本总底稿 |

实施分工：4 条分支并行（`wave4/wb-scenes`、`wave4/wb-tooling`、`wave4/mainfile`、`wave4/gates`），
总协调人按白板场景 → 白板工具 → 主文件 → 门禁顺序 rebase 合并，全程线性、无合并提交、无冲突
（白板工具分支刻意避开了白板场景分支正在改的 gen_wb13_units.py docstring 区）。

## 1. 按项汇报

### 第 1 项：wb13_phrasal.json 不补 give back 记录 ✅（只记一笔，不改数据）

**定夺**：不补。该文件是 72 格结构，back 不在 6 小品词内；补就要数据方定新 schema（第 7 个小品词或特例格），
为一个例外改结构会开先例，且生成器里已有写死数量的断言（见第 4(b) 项），硬改易连锁破坏；
vv_give_back 页签与场景已独立存在、内容已核实，不依赖这个文件。

**记录在此，免得以后有人当成缺失来“补”**：vv_give_back 有意不在 wb13_phrasal.json 内，独立页签，
来源为被删 8 幕原文（见 `wave3_item3_give_back.md` §1）。同理，give on (onto) 也不在该文件内
（见第 2 项；是否补 give on 记录是新发现待定夺，见 §4）。

### 第 2 项：give on (onto) 另立 vv_give_on ✅（`3b6fd16`）

照第三波 vv_give_back 的做法，由 `d62026c^` 的 `vv_give_on_1/2.js` 原文恢复（与源码 diff 仅文件头 2 行），
`units.json` +1 页签（插在 `vv_give_back` 之后），精灵用第三波同款 44 字节空 stub（gitignored，不入库）。
两句例句逐字在场：`The window gives on the green park.`（① 1 次、② 复述 1 次）、
`The back door gives onto the garden.`（② 1 次）。
数字：页签 233→**234**，vv 页签 79→80，vv 场景文件 156→158，give on 场景 0→**2 幕**。
验证：node --check 2/2、build.mjs 打包 2/2、Playwright 探针 0 报错（① 19.0 秒、② 42.2 秒）。
未核实：真机播放、人物帧实际渲染（空 stub 下帧不画，待 CAST 帧重建）；① 19.0 秒低于 SOP 40–60 秒指引，
系原文内容本身短（6 条、1 句朗读），未擅自加内容凑时长。

### 第 3 项：give back ① 开场句改写 ✅（`39c206d`，只改这一句）

`vv_give_back_1.js` 仅 1 行：
旧：`give back：give 没有常用的 down 搭配，这一格换成 give back：把东西递回原主手里`
新：`give back 是 give 的常用搭配，意思是‘归还’。`
② 末尾「共同点」行残留的「（give 没有常用的 down）」一字未动，记为观察到的残留（见 §4）。
验证：改后 node --check + build.mjs 打包通过，探针 22.2 秒（与第三波改前一致）。

### 第 4 项：既有缺口三件套 ✅（`3e56b04` / `3c5551e` / `edf4936`）

**(a) 精灵缺失**：实测 965 幕场景、580 个被引用精灵包，**缺失 470 个**，受影响 834 幕。
git 历史核查：全部 470 个都无法恢复（没有任何生成包进过 git 历史；只有 13 个手工 tm/pc/ao 包入库过）。
修复：按第三波同款 44 字节空 stub 批量生成（`make_sprite_stubs.py`，幂等；stub 本身 gitignored 不入库，
入库的是生成脚本 + 清单 `wave4_item4a_sprite_inventory.json`）。stub 只让 esbuild 能解析 import，
不改任何场景文件内容；stub 幕播放时无角色帧（与此前 97 个 stub 幕现状相同，待 CAST 帧重建）。
验证：stub 前 `vv_give_up_1.js` 打包失败复现（`Could not resolve "../sprites/vvgiveup1.js"`），
stub 后通过；全量扫测 965 幕：**959 通过 + 6 个共享 lib N/A**（`cmp_lib` 等天生无 `default` export，
build.mjs 打不进去，定为 N/A），受影响 834 幕 0 失败；另测 `vv_give_on_1/2` 通过。
另：首轮 28 幕报 `pyftsubset ENOENT`——须同时设 `WB_FONTS=~/workspace/wbfonts` 与
`PATH=~/workspace/wbfonts/bin:$PATH`，已记入底稿。

**(b) 过时断言**：`gen_wb13_scenes.py:371` 的 `assert len(missing) == 32` 改为 `assert not missing`
（从源数据推导；实测 50/50，待新建格 0）；`gen_wb13_units.py` 的 `--check-only` 改走新增校验分支
（校验当前 units.json 与源数据一致：50 格页签、12 核心义、3 规律页、`hd_mindmap`、`vv_give_back` 在位；
总数 `len(U) == 234`，硬编码实测值 + 注释“以第四波 vv_give_on 合入后为准，2026-11-09 实测”），
`:125` 总数断言改为推导式；非 `--check-only` 运行明文拒绝重跑、不写盘。
实施中发现的关键事实：32/18 分工——18 格（get 5、give 3、turn 5、take 5）的 75 条词典例句不在生成器
`ZH` 译文表里，且盘上场景不含 wb13 引证例句（属更早的旧 vv 剧场）；`--check-only` 按此分工校验
（32 格生成内容 + 18 格场景文件在盘），不强行纳入。
验证：`gen_wb13_scenes.py --check-only` 通过；`gen_wb13_units.py --check-only` 在合入后通过
（`check-only：页签 234（50 格 + 12 核心义 + 3 规律页 + 1 导图 + 手工 give_back/give_on）；未写文件`）。

**(c) r2check.py 废止**：文件根本不在仓库里——`git log --all` 按路径查无任何提交，
`docs/whiteboard/src/` 全历史文件名里无 `r2` / `insert` 字样；只活在旧开发机本地，随沙箱重置丢失。
依赖已死：insert_wb.py 2026-10-30 停用（`92ea6e3`）；旧主文件已从工作树删除，但 git 历史可找回
（`d1c946f`，提交信息注明“git 历史可整文件找回”）；真正不可恢复的只有 r2check.py / insert_wb.py 本身。
决定：废止，不改写（重写等于新写一个工具，成本过大；v5 里 `s` 项朗读是结构保证，原脚本的 `say` 登记对照已无对应物）。
替代验证法（第三波已定，现行管线）：① build 打包 ② grep 打包产物 ③ 探针时长（durcheck.py）
④ wbtextcheck ⑤ jscheck，见 `wave4_item4_tooling_gaps.md` §3.3。
废止动作：未删任何文件（无文件可删）；立标记 `docs/whiteboard/src/r2check.RETIRED.md`。
留下的真实缺口：词级 R2 与 R4（动作词演出 + 与朗读重叠）在 v5 下目前无自动化检查（见 §4）。

### 第 5 项：preBarHTML 标题回落 ✅（`5ea1228`）

新增 `preLawTitle(t)`，回落链 LAWDATA.hl → ROSTER`[0]` → 只写编号；`preBarHTML` 改用它取标题
（截断规则不变，`title` 属性同步为全标题）。只用 ROSTER、未引用 DATA.TA：
已逐条核对 DATA.TA 的 `head` 与 ROSTER`[0]` 18/18 一字相同，ROSTER 结构为 `[标题, 分区, 层级, 路线, 别名]`。
jsdom 全量 453 条 `preBarHTML` 改前改后 diff：**变化 17 条，不变 436 条**，变化全是裸编号加标题——
TA 站 5/5（TA-03←TA-01、TA-06←TA-05、TA-07←TA-03、TA-09←TA-05、TA-16←TA-05），另 P-* 12 条同属
非 LAWDATA 律多出标题；CB/CG/LS/VB/YL 类先修目标改前已有标题（SUPPDATA 带 `hl`），0 变化。
注：运行时 LAWDATA 共 390 条（基础字面量 224 条 + PHONLAWS/SUPPDATA 合并），此后凡以“LAWDATA 有无”
作判断的核对必须以运行时为准；`hl` 与 ROSTER`[0]` 31/31 相同。

### 第 6 项：E/W 区静态徽标对账 ✅（`9082b2f`，修了 10 处）

扫面：#v-expr 全部 30 行（儿童行 23、教师行 7），门禁另复核 NE 29 行。
修了 **10 处**：E-01/03/04/05/07/08/13/15（各 1 病例）、W-12/13（各 2 病例），part→ok。
其余 13 行儿童行无误不动；7 行教师行只核对在位不动。根因与 NE 同病：病例波后静态行未跟进。
四源逐律一致：ERRIDX 运行时 = ERRIDX 再生 = lawdata.cases = LAWDATA cases，quiz 皆 1。

### 第 7 项：徽标对账门禁进 check_all ✅（`e6c622a`，check_all 24→25 项）

新建 `laws-prototype/tools/check_badge_erridx.py`（245 行），接进 `check_all.py` CHECKS 列表。
口径：#v-expr + #v-expr2 全部 59 行（E 15 + W 15 + NE 29；儿童行 38 逐行比对，教师行 21 只核对在位；
行集合须与 laws_master E/W/NE 律集恰相等）。有 ERRIDX 病例 + 有练习 → ok，否则 part。
权威源是 `gen_errors.build` 再生出的 ERRIDX（脚本直接 import，不复制生成逻辑）；`lawdata.cases` /
LAWDATA cases 只作第三源数字打印在失败行里——全库 163 律的 ERRIDX 多于 `lawdata.cases`（yaml/zone 来源），
以其为准会误判，口径已写进脚本 docstring 与底稿。
验证：本分支上门禁如预期失败（10 行 E/W 漂移，与第 6 项逐行一致）；合入第 6 项后 **PASS**
（59 行：儿童行 38 全对，教师行 21 在位；ERRIDX 524 条 / 覆盖 311 律）。

### 第 8 项：jscheck node --check 列为提交门禁 ✅（`dbf3e58`，check_all 25→26 项）

新建 `laws-prototype/tools/check_js_syntax.py`（84 行，薄 wrapper），子进程调
`docs/whiteboard/src/jscheck.py`，只取 `node --check:` 汇总行定通过与否；
`FAIL anchor` 行与 jscheck 退出码一律忽略（anchorcheck 116 项基线不列入）。
验证：当前 HEAD 上 PASS（`node --check: inline scripts=41, lazy modules=0 → OK`）；
反面验证：/tmp 副本把 4edcc4f 删掉的多余 `}` 原样插回，wrapper FAIL，
报 `SyntaxError: missing ) after argument list`（仅含 `applyAdultZones` 的导航脚本失败）。

## 2. 总协调人独立复核（合并后刚跑）

- 本地 HEAD = origin/master，工作区干净（推送后以此为准，见 §3）。
- `check_all.py`：**26/26，“结论：全部通过”**（含新增两门禁）。
- `python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html`：
  node --check OK（41 inline）；anchorcheck FAIL **116 项**，与 e97aaec 基线逐项一致。
- `gen_wb13_scenes.py --check-only`：通过（exit 0）。
- `gen_wb13_units.py --check-only`：通过（exit 0，页签 234）。
- units.json 页签数：**234**（实测）。
- 合并方式：四分支依次 rebase 到 master 后 fast-forward 合并，全程无冲突；
  共享工作树事故：主文件线实施员的第 5 项提交一度误落到 `wave4/wb-scenes` 分支顶（`d19e8c0`），
  已 cherry-pick 到 `wave4/mainfile`（`5ea1228`，代码逐行一致）并把 `wave4/wb-scenes` 指针复位到 `39c206d`，
  内容无丢失。
- 收尾小修（本稿提交）：gen_wb13_units.py docstring 第 8 条同步为“--check-only 已恢复为校验模式”；
  r2check 两处表述精确化（“不在仓库里”→“已从工作树删除，但 git 历史可找回”）。

## 3. 同步与提交

- 推送后本地 HEAD = origin/master，工作区干净（以实际推送结果为准）。

## 4. 新发现的待定夺（均未擅自做）

**白板线：**
1. wb13_phrasal.json 是否补 give on 记录（与第 1 项 give back 同类问题）。
2. give back ② 末尾「共同点」行残留的「（give 没有常用的 down）」是否改写（本次只改了 ① 开场句）。
3. 470 个精灵包是否用 `build_sprites.py` 从 `cast/` 重建真实包（stub 只解决打包，stub 幕无人物帧；
   部分包可重建，470 个逐一定帧名映射是大工程；或只重建高频幕如 give/take/get/turn 系列）。
4. v5 原生 R2/R4 静态检查做不做（废止 r2check 后，词级 R2 与 R4 无自动化检查；629 幕 auto 幕句子朗读有结构保证，
   `w` 词单读与 330 幕手写幕无保证）。
5. SOP.md / CHANGELOG.md 里 `r2check.py --strict` 验收行是否改写为 §3.3 的三步管线，还是保留历史记录原样。
6. 6 个共享 lib（`cmp_lib` 等）是否应进打包扫测口径（维持 N/A，还是给 `build.mjs` 加一个“lib 只做 `node --check`”的分支）。

**主文件线：**
7. 14 个 ptr 条目的先修标题是否也补（C-01/04/06/07/09/10、PR-01/05/07/08、QI-01/02/05/13：
   在 LAWDATA 里有条目但无 `hl`，本次按“已有 LAWDATA 的律一字不变”未补、仍只写编号；
   若改按 hl 值回落，这 14 条会多出 ROSTER 标题，是一行之改）。
8. 其余区静态徽标是否同病（门禁只覆盖 NE/E/W；其余区 ok「有病例 · 有练习」39 处、part 53 处，
   且有“有理解探针”等变体口径不同，是否扩面另立项）。
9. `lawdata.cases` 与 ERRIDX 口径是否写进《数据源规范》（徽标以 ERRIDX 为准，不以 lawdata.cases 为准），以免后人误改。
10. anchorcheck 116 项基线是否另立项（本波门禁刻意排除；若将来要列为门禁，需白板线先定夺补锚点、更新还是废止 anchorcheck）。
11. LAWDATA 字面量 224 ≠ 运行时 390，`hl` 与 ROSTER`[0]` 31/31 相同、改名会漂移，是否加对账检查。

**承接未决（前波遗留，本波未碰）：**
12. P-* 56 条 + CO-17 3 条按 kind 口径一并迁入总表（第三波）；如另有裁定可整组回滚。
13. 完整 JS 外置（D1，18.7MB）+ CSS 外置，已记为上线待办（须先改生成器输出路径）。

## 5. 未核实项

- 真机未核实：TA 站顶部先修条与 NE/E/W 徽标的视觉呈现、12 句朗读的真机语音听感（第三波遗留）、
  give on / give back 人物帧实际渲染（空 stub，待 CAST 帧重建）、stub 幕在真机上无人物帧时的实际画面。
- 字体缓存：全量打包扫测依赖 `/tmp/wb5_fontcache`；全新机器首次全量扫测会逐幕跑 `pyftsubset`，耗时更长，未实测。
- 12 句中文译文未经官方译文核对（OALD 无官方中文译文，第三波遗留）。

## 6. 工作底稿（`docs/work-2026-11-09/`）

- `wave4_item2_give_on.md`（第 2、3 项）、`wave4_item4_tooling_gaps.md`（第 4 项）、
  `wave4_item4a_sprite_inventory.json`（470 缺失清单）、`make_sprite_stubs.py`（stub 生成脚本）、
  `wave4_item5_ta_titles.md`（第 5 项）、`wave4_item6_ew_badges.md`（第 6 项）、
  `wave4_item7_badge_gate.md`（第 7 项）、`wave4_item8_jscheck_gate.md`（第 8 项）、
  `apply_wave4_item2_units.py`、`apply_wave4_item5_ta_titles.py`、`apply_wave4_item6_ew_badges.py`、
  本总底稿 `wave4_summary.md`。
