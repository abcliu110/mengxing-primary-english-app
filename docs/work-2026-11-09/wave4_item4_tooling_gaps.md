# 第四波第 4 项底稿：白板工具缺口三件套（2026-11-09）

- 分支：`wave4/wb-tooling`（自 `59844d7`），未推送、未合并（总协调人统一合并；合并顺序：白板场景分支先合）
- 工作树：`~/workspace/mengxing-wave4-tooling`（linked worktree；主检出当时正被其他并行 wave-4 工作切换分支，故另建工作树隔离提交，主检出只用于跑打包扫测）
- 作者：`guoyun_liu <165559603@qq.com>`（仓库已有配置）
- 提交（每件单独提交，提交前 `git show` 逐行核对落点）：
  1. 4(a) `7217b38` `Bug：白板 470 精灵缺失清单与空 stub 生成脚本（打包失败定位）`——`docs/work-2026-11-09/make_sprite_stubs.py` + `wave4_item4a_sprite_inventory.json`
  2. 4(b) `bd076f7` `Bug：wb13 两生成器过时断言改为实测推导，--check-only 恢复`——`docs/whiteboard/src/wb13/gen_wb13_scenes.py`、`gen_wb13_units.py`
  3. 4(c) 本提交 `Docs：r2check 废止与替代验证法`——`docs/whiteboard/src/r2check.RETIRED.md` + 本底稿

## 0. 环境说明（影响验证口径）

- 打包命令：`WB_FONTS=~/workspace/wbfonts node docs/whiteboard/v5/build.mjs <幕> <out.html>`；
  `pyftsubset` 在 `~/workspace/wbfonts/bin/`，`PATH` 里须有它（否则未命中字体缓存的幕报
  `spawnSync pyftsubset ENOENT`，见 §1.4）。字体目录与文档写的 `wb-fonts` 拼写不同，
  实际是 `~/workspace/wbfonts/`。
- 主检出在工作期间被其他并行 wave-4 工作切换过分支（`wave4/gates` → `wave4/mainfile`，
  提交 `bfe5da7`，未动任何场景文件）；扫测在其上进行，场景集与基线一致（965 幕，
  另 2 幕 `vv_give_on_*` 当时未入库，见 §1.4）。
- 精灵包是 gitignored 本地构建产物（`docs/whiteboard/v5/sprites/.gitignore`：`*.js`，
  手工版 `tm/pc/ao` 除外），**stub 文件本身不入库**；入库的是生成脚本 + 清单，
  任何机器跑脚本即可重建。

## 1. 4(a) 精灵文件缺失致打包失败

### 1.1 缺失清单（实测 2026-11-09，盘点快照）

方法：解析 `docs/whiteboard/v5/scenes/*.js` 里全部
`import * as SP from '../sprites/*.js'`（单/双引号），逐个核对
`docs/whiteboard/v5/sprites/` 是否存在。快照时工作树含未入库的
`vv_give_on_1/2.js`（场景分支工作），故总数 967 幕；基线 `59844d7` 单独为 965 幕。

| 口径 | 数字 |
|---|---|
| 场景文件（快照 / 基线） | 967 / 965 |
| 被引用的精灵包（去重，快照 / 基线） | 580 / 578 |
| 盘上实包（手工 `tm1–5`、`pc1–4`、`ao1–4`） | 13 |
| 盘上已有 44 字节空 stub | 97 |
| **缺失** | **470** |
| 受影响的幕（引用 ≥1 个缺失包；快照与基线相同） | **834**（非 `gen_` 523 + `gen_` 311） |
| 引用精灵包的幕 / 不引用精灵包的幕 | 955 / 12（含 6 个共享 lib，见 §1.4） |

缺失按族（前 15，共 110 族）：`hdo` 144、`hdg` 59、`hdpg` 42、`fr` 21、`bt` 5、
`fpat` 5、`at` 4、`fi` 4、`fv` 4、`hdfr` 4、`mc` 4、`wogr` 4、`fe` 3、`fk` 3、`fz` 3，
其余 95 族各 1–2 个。全量逐幕清单见 `wave4_item4a_sprite_inventory.json`
（`rows[]`：每个包的盘上状态 + 引用它的幕；`affected_scenes[]`：834 幕）。

give 家族明细（任务点名的两处）：

| 精灵包 | 盘上状态 | 引用的幕 |
|---|---|---|
| `vvgiveup1.js` | 缺失（本项新建 stub） | `vv_give_up_1.js`、`gen_stock_vv_give_up_1.js` |
| `vvgiveup2.js` | 缺失（本项新建 stub） | `vv_give_up_2.js`、`gen_stock_vv_give_up_2.js` |
| `vvgivedown1.js`、`vvgivedown2.js` | 缺失（本项新建 stub；git 历史从未存在，见 §1.2） | （无场景引用——`vv_give_down_*` 已下线，包悬空） |
| `vvgivein1/2.js`、`vvgiveoff1/2.js`、`vvgiveout1/2.js` | 缺失（本项新建 stub） | 各 2 幕（`vv_give_*_*` + 对应 `gen_stock_*`） |
| `vvgiveback1/2.js`、`vvgivecore1.js`、`vvgiveover1/2.js` | 已有 stub（第三波或更早建） | `vv_give_back_*`、`vv_give_core_1`、`vv_give_over_*` |
| `vvgiveon1/2.js` | 已有 stub（盘点时已在，场景分支侧已建，不计入本项新建） | `vv_give_on_1/2.js`（当时未入库） |

### 1.2 git 历史核查：全部 470 个缺失包都无法恢复

- `git log --all --name-only -- docs/whiteboard/v5/sprites/`：全历史入库过的
  精灵相关文件只有 13 个手工包（`tm/pc/ao`）+ `build_sprites.py` +
  `cast/*.webp` 帧库 + 辅助脚本；**没有任何一个生成包（`vv*`/`hd*`/`fr*` 等）
  进过 git 历史**。
- 单查点名文件 `vvgiveup1.js`、`vvgiveup2.js`、`vvgivedown1.js`、`vvgivedown2.js`、
  `vvgivein1.js`、`vvclimbcore1.js`、`mindmap.js`：`git log --all` 均为空。
  第三波底稿记的“`vvgivedown1/2.js` 在 git 历史里从未存在过”属实，且适用于全部 470 个。
- 结论：无一可从历史恢复；也不编造精灵内容（帧数据只能来自 `cast/` 帧库或手工源图）。

### 1.3 修复：44 字节空 stub（第三波同款）

- stub 字节与第三波同款、与盘上 97 个现有 stub **逐字节一致**：
  `export const FR = {}; export const FI = {};\n`（44 字节，md5 `2ac8eaf8a6df6331982296e84eae2897`；
  注意第一句末是空格不是换行，初版写成换行时 md5 不同，已纠正）。
- 新建 470 个：`vvgiveup1.js`（探针时先行创建）+ 469 个（脚本批量生成）。
  盘上 stub 总数 97 → 567；精灵包现 580 个全齐（13 实包 + 567 stub），缺失 0。
- 生成脚本：`docs/work-2026-11-09/make_sprite_stubs.py`
  （解析场景 import → 核对盘上 → 缺失的写 stub；`--check-only` 只盘点不写；
  `--inventory out.json` 写清单；幂等，已 stub/实包不动）。
- 适用前提（已验证）：stub 只让 esbuild 能解析 `import * as SP`，**不改任何场景文件内容**
  （`git status` 场景文件无改动）；stub 覆盖的幕在播放时无角色帧（`FR`/`FI` 为空），
  属已知缺口——与此前 97 个 stub 幕现状相同，待 CAST 帧重建后才可见人物。
- 未做的事：没有用 `build_sprites.py` 从 `cast/` 重建真实包。
  探查结论：部分包可重建（例：`vvgiveup1.js` 需帧 `l_lift0/1/2`，`cast/` 里三者都在，
  场景 `ACTS` 即帧名），但 470 个包逐个定帧名映射是大工程，且不属本项定夺的 stub 口径；
  记为待定夺（见 §5）。

### 1.4 验证：全量打包扫测

破损复现（stub 前）：`vv_give_up_1.js` 打包失败，
`Could not resolve "../sprites/vvgiveup1.js"`（esbuild，exit 1）。
stub 后同幕打包通过（1,115,978 字节）。

全量扫测（2026-11-09，主检出 `wave4/mainfile`/`bfe5da7`，场景与基线一致；
`WB_FONTS=~/workspace/wbfonts`，`PATH` 含 `~/workspace/wbfonts/bin`；
`xargs -P8`，逐幕 `node docs/whiteboard/v5/build.mjs`，产物删后只留结果行）：

| 口径 | 结果 |
|---|---|
| 扫测幕数 | 965（基线全部场景文件） |
| 通过 | **959** |
| 另测通过 | `vv_give_on_1/2.js` 2 幕（当时未入库，从 `wave4/wb-scenes` 临时恢复文件后打包通过，1,115,962 / 1,116,449 字节，测后已删临时文件） |
| 受影响 834 幕 | **0 失败**（逐幕对账，见清单 JSON） |
| 不可打包的 6 个文件（N/A，非失败） | `cmp_lib`、`fb39_lib`、`g14_lib`、`fr_lib`、`hd_poly_g4_157_v2`、`wordcard_items`——均为共享 lib（只 export 命名成员、无 `default` export，被 3–10 幕 import；`wordcard_items` 为 App 运行时共用的词卡模板，0 幕 import），`build.mjs` 要求 `default` export，故天生不可打包；6 个均不引用精灵包，不在受影响集内 |
| 合计可打包幕 | **961/961 通过**（959 + 2） |

扫测中另发现两个环境/口径问题（已处理，非精灵问题）：

1. 首轮 28 幕报 `spawnSync pyftsubset ENOENT`：`pyftsubset` 不在默认 `PATH`（在
   `~/workspace/wbfonts/bin/pyftsubset`，fonttools 4.46.0 已装）；命中字体缓存的幕
   不调它所以通过，未命中的 28 幕失败。补 `PATH` 后 28/28 重跑通过。
   教训：以后跑 `build.mjs` 须同时设 `WB_FONTS` 与 `PATH`（见 §4(c) 替代命令）。
2. 首轮还把 6 个 lib 计为失败；核查后定为 N/A（见上表）。扫测脚本以后应先排除
   无 `default` export 的 lib 文件（本项未改 `build.mjs`，只在底稿记录口径）。

### 1.5 未核实项（4a）

- 真机播放：stub 幕只验证了打包通过，未在真机看人物帧缺失时的实际画面
  （预期无角色、其余内容正常，未验证）。
- 字体缓存：扫测依赖 `/tmp/wb5_fontcache`（首轮已建）；全新机器首次全量扫测会
  逐幕跑 `pyftsubset`，耗时更长，未实测。
- `vvgivedown1/2.js` 的 stub 无场景引用，属“有备无患”——若将来恢复
  `vv_give_down` 场景可直接用；如永不恢复则无害（gitignored，不入库）。

## 2. 4(b) 两处过时断言更新为实测现状

### 2.1 实测现状数字（2026-11-09，基线 `59844d7`）

- `wb13_phrasal.json`：84 页 = 72 格（50 attested + 22 checked_absent）+ 12 核心义。
  attested 50 格 `covered_by_vv` 全为真 → **覆盖 50/50，待新建格 0**。
- `units.json` 页签：基线 **233**；场景分支（`wave4/wb-scenes`）合入 `vv_give_on` 后 **234**。
  构成：186 基线 + 32 格 + 12 核心义 + 3 规律页 + 1 导图 − 2（give_down/on 下线）
  + 1（give_back 手工）+ 1（give_on 手工恢复）= 234。
- 改前 `--check-only` 双双失败（实测）：
  `gen_wb13_scenes.py:371` → `AssertionError: 待新建格应为 32，实得 0`；
  `gen_wb13_units.py:47` → `AssertionError: 页签基线应为 186，实得 233`。

### 2.2 改前 → 改后对照表

**`gen_wb13_scenes.py`**

| 位置 | 改前 | 改后 |
|---|---|---|
| `:371` `missing` 断言 | `assert len(missing) == 32`（“32 格”） | `assert not missing`（“无未覆盖格”，从源数据推导；50/50 实测见注释） |
| docstring 输出节 | “32 格 × 2，共 64……合计 89 个新场景文件” | 保留“首次生成 89 个”历史记录，补“2026-11-09 实测 50 格已全部覆盖（50/50），待新建格 0；32 只是首次生成时的待新建数” |
| `files` 构建（原只从 `missing`） | `for p in missing`（现为空，`files` 恒为 15） | 按 32/18 分工：`generated` = ZH 译文表覆盖的 32 格（生成内容校验），`precovered` = 其余 18 格（只校验场景文件在盘）；见 §2.3 |
| `len(files) == 89` 断言 | 硬编码 89 | 推导式 `len(files) == 2*len(generated) + n_split + len(poly_files) + len(core_files)` + `n_split == len(SPLIT_3)`（= 10）；实测 89 不变 |
| 例句自查循环 | `for p in missing`（现为空，恒 vacuously 通过） | `for p in generated`（32 格 81 条词典例句逐字落场景） |
| 打印 | `32 格 …` | `{len(attested)} 格已全部覆盖（本脚本 32 格 + 原有 vv 18 格）；81 条…；场景文件 89 个（首次生成 89 个）` |
| 写盘路径 | 逐文件 assert 后写 | 前置整体拒写断言（场景已存在 89 个时明文拒绝，用 `--check-only` 校验）；首次生成已完成，非 `--check-only` 运行不再写盘 |

**`gen_wb13_units.py`**

| 位置 | 改前 | 改后 |
|---|---|---|
| `:47` 基线断言 | `assert len(U) == 186`（`--check-only` 在此死掉） | 值 186 保留为**首次生成前**的基线前提（注释写明）；`--check-only` 改走新增校验分支，不再经过它 |
| 新增 `--check-only` 校验分支（在 `:47` 之前） | 无 | 校验当前 `units.json` 与源数据一致：50 格页签、12 核心义、3 规律页、`hd_mindmap`、`vv_give_back` 在位；两处顺序断言；总数 `len(U) == 234`（硬编码实测值 + 注释“以第四波 vv_give_on 合入后为准，2026-11-09 实测”）；`vv_give_on` 在位；打印后返回，不写文件 |
| 生成路径重跑保护（`missing`/`cores` 断言后新增） | 无（重跑死在 `tab 已存在`，信息含糊） | `assert missing, '待新建格为 0：首次生成已完成，拒绝重跑（用 --check-only 校验）'` |
| `:125` 总数断言 | `assert len(out) == 186 + 32 + 12 + 3 + 1` | 推导式 `len(out) == len(U) + len(vv_new) + len(poly_new) + 1`（首次生成时 = 186+44+3+1 = 234） |
| 末尾打印 | `页签 186 → …（+32 格 +12 核心义 +3 规律页 +1 导图）` | `页签 {len(U)} → {len(out)}（+{len(missing)} 格 +{len(cores)} 核心义 +{len(poly_new)} 规律页 +1 导图）` |

未动：`gen_wb13_units.py` docstring 第 8 条“基线断言（186 页签）已过时”及全文
第 6/9 条——场景分支正在同一区域改 docstring（其未提交 diff 覆盖行 10–22，
含第 8 条），为避免合并冲突，本项只改代码与代码注释，docstring 文字留给
总协调人合并时裁定（见 §5）。

### 2.3 实施中发现的关键事实：32 / 18 分工

初版把 `files` 改成从全部 50 格生成时，`vv_scenes()` 在 `get up` 格上失败：
`AssertionError: 缺译文："We didn't get up until lunchtime."`。实测确认：

- 18 格（`get` 5、`give` 3、`turn` 5、`take` 5）的 75 条词典例句不在生成器的
  `ZH` 译文表里；且这 18 格的盘上场景**不含** wb13 引证例句（逐字比对 18/18 缺失），
  其例句来自更早的旧 vv 剧场、与 wb13 引证不同句。
- 另 32 格：ZH 全覆盖，盘上场景含全部例句（32/32）。
- 结论：本脚本的生成范围从来就是 32 格，18 格属原有 vv 场景；`--check-only`
  按此分工校验（32 格生成内容 + 18 格场景文件在盘），不强行把 18 格纳入生成器。
  `generated` 的划分标准即“例句全在 `ZH` 里”，与盘上比对结果 32/18 完全一致。

### 2.4 验证

- `gen_wb13_scenes.py --check-only`：**通过**（exit 0）——
  `50 格已全部覆盖（本脚本 32 格 + 原有 vv 18 格）；81 条词典例句全部逐字落场景；场景文件 89 个（首次生成 89 个）`。
  非 `--check-only` 运行：明文拒绝（`场景已存在 89 个，拒绝覆盖（首次生成已完成；用 --check-only 校验）`），不写盘。
- `gen_wb13_units.py --check-only` 在本分支：**失败，但只差总数**（预期合并顺序问题）——
  前面全部在位/顺序断言通过，停在 `页签总数应为 234（vv_give_on 合入后），实得 233`。
  数字未为通过而改错：234 是合入后实测值。
- `gen_wb13_units.py --check-only` 合入后模拟：**通过**（exit 0）——
  用场景分支 `wave4/wb-scenes` 已提交的真实 `units.json`（234 页签，含 `vv_give_on`）
  临时替换本分支文件后重跑，输出
  `check-only：页签 234（50 格 + 12 核心义 + 3 规律页 + 1 导图 + 手工 give_back/give_on）；未写文件`；
  测后已恢复本分支 `units.json`（`git status` 干净）。
- 非 `--check-only` 运行：停在基线断言（`页签基线应为 186（首次生成前），实得 233`），
  不写盘；符合“首次生成已完成、拒绝重跑”的预期。

## 3. 4(c) r2check.py 去向：废止

### 3.1 定位结果：文件根本不在仓库里

- `docs/whiteboard/src/r2check.py`、`r2check.js`、`insert_wb.py`：工作树无，
  `git log --all` 按路径查无任何提交；`docs/whiteboard/src/` 全历史文件名里
  无 `r2` / `insert` 字样。**三个文件从未进过 git**，只活在旧开发机本地，
  随沙箱重置丢失。
- 仓库里引用它的只有文档：`CHANGELOG.md`（§0 用法与基线）、`SOP.md`（§7/§8/§16 验收行）、
  `MASTER_DESIGN.md`、`DESIGN_HANDOFF.md`、`HANDOFF.md`。没有任何 `.py`/`.js`/`.mjs`/`.sh`
  代码调用它；`check_all.py`、`ci.py`、`runall.py` 均不含 `r2check`。
- 依赖已死（与任务所说一致，且有据可查）：
  - `insert_wb.py`：2026-10-30 停用（`HANDOFF.md:62`；`v5/retire_old_wb.py`，
    提交 `92ea6e3`“删除旧 SVG 白板兜底……insert_wb.py 停用”）。
  - 旧主文件（`萌星小学英语_最终合并版.html`）：不在仓库里（现主文件是
    `laws-prototype/mengxing-prototype-v1.html`）；旧白板 `cases/`、`wb_actor.js`、
    `wb_app.js`、`preview.html` 同样不在仓库里。
  - r2check 当年的做法：先 `insert_wb.py` 把白板模块嵌进旧主文件，再从主文件
    抽词/句/`say` 登记做 R2（每词有单读+例句、每句有朗读）与 R4（`actionWords` 对照
    `k.act`/`k.actFx` 登记 + 与朗读重叠）检查；`--strict` 缺项返回 1。

### 3.2 决定：废止，不改写

- 不存在可改的文件，“改成走现行管线”只能是重写一个新工具，成本过大：
  须解析 v5 场景格式（`ITEMS` 的 `w`/`s`/`m`/`n` 项、`ACTS`、精灵 `FI` 帧表），
  还要重新定义 v5 下 R2/R4 的判定口径；原脚本的 `say` 登记对照在 v5 里已无对应物。
- 替代验证法已是第三波定下的现行管线（`wave3_item7a_core_readaloud.md` §70 原话：
  “`r2check.py`：未跑——该脚本依赖已停用的 `insert_wb.py` 与已删旧主文件；
  R2 覆盖改用打包产物 grep + 探针时长佐证”）。本项沿用，不另起新工具。
- 废止动作：**未删任何文件**（无文件可删）；立标记
  `docs/whiteboard/src/r2check.RETIRED.md`（状态、依据、替代命令、未覆盖缺口），
  并在本底稿记录。`SOP.md` / `CHANGELOG.md` 里 `r2check.py ... --strict` 的验收行
  仍指向已废止脚本，本项未动共享规约文档，待总协调人定是否改写（见 §5）。

### 3.3 替代验证方法（哪几条命令、覆盖什么）

| 步骤 | 命令 | 覆盖 | 本项实测 |
|---|---|---|---|
| ① 打包 | `WB_FONTS=~/workspace/wbfonts PATH=~/workspace/wbfonts/bin:$PATH node docs/whiteboard/v5/build.mjs docs/whiteboard/v5/scenes/<幕>.js <out.html> "<标题>"` | 该幕全部 import 可解析、esbuild 打包成功 | §1.4：961 幕全通过 |
| ② grep 打包产物 | 在 `<out.html>` 里 grep 预期内容逐字命中，如每幕 `s` 项英文句、关键例句 | 词典例句/朗读句确实落进产物（R1 文字层面） | §1.4 扫测；第三波 12 幕 `grep -c` 合计 12 条 `s` 项 |
| ③ 探针时长 | `python3 docs/whiteboard/src/durcheck.py --scan <幕前缀>`（Playwright 读打包 `out/` 的 `window.__dur`，写 `lab/audit36/durations.json`；`>120 秒`且不在 `dur_allow.json` 白名单 → 不合格） | 幕时长 sane、产物可加载（`__dur` 读得出） | `durcheck.py --scan vv_give_up`：`scanned 1`，exit 0，`vv_give_up_1: 23.8` 秒；测后 `durations.json` 已恢复、`out/` 产物已删 |
| ④ 文字检查 | `python3 docs/whiteboard/src/wbtextcheck.py` | 场景 `ITEMS` 的 Markdown 残留、截断句、字幕错位 | 未在本项重跑（既有工具，口径见其 docstring） |
| ⑤ 语法检查 | `python3 docs/whiteboard/src/jscheck.py`（`node --check`） | 场景/模块 JS 语法 | 未在本项重跑 |

### 3.4 v5 下 R2 的结构性现状（决定废止的重要依据，实测代码）

- `scenes/auto.js` 的 `autoBuild`：每个 `s` 项必发一次 `K.say(...)`（`auto.js:104`），
  **句子朗读是结构保证**，不用逐幕再查。
- `w` 项（白板词）不单独发 `K.say`，只在某条 `s` 句里作先读词（`word:`）或句中词时
  才被读到；**词级“每个词都被读”在 v5 里没有结构保证**。
- 629 幕用 `autoBuild`，330 幕手写（不走 `autoBuild`），手写幕连句子朗读都没有结构保证。
- 因此废止后留下的真实缺口：**词级 R2 与 R4（动作词演出 + 与朗读重叠）在 v5 下目前
  无自动化检查**。如需补，建议新写 v5 原生静态检查（解析 `ITEMS` + `ACTS` + 精灵 `FI`），
  而不是复活 r2check（见 §5）。

## 4. 验证总表

| 验证 | 结果 |
|---|---|
| stub 前破损复现（`vv_give_up_1`） | 失败 `Could not resolve "../sprites/vvgiveup1.js"` ✓ |
| stub 后同幕打包 | 通过，1,115,978 字节 ✓ |
| 全量打包扫测 965 幕 | 959 通过 + 6 lib N/A；受影响 834 幕 0 失败 ✓ |
| `vv_give_on_1/2` 另测（临时恢复） | 通过，1,115,962 / 1,116,449 字节 ✓ |
| `gen_wb13_scenes.py --check-only` | 通过（exit 0）✓ |
| `gen_wb13_units.py --check-only`（本分支） | 仅总数 233 vs 234 失败，预期合并顺序问题 ✓ |
| `gen_wb13_units.py --check-only`（`wave4/wb-scenes` 真实 234 页签模拟） | 通过（exit 0）✓ |
| 探针 `durcheck.py --scan vv_give_up` | `scanned 1`，exit 0，`__dur` 23.8 秒 ✓ |
| 两生成器非 `--check-only` 运行 | 均明文拒绝重跑，不写盘 ✓ |
| `git show` 逐提交核对 | 见提交记录（总协调人合并时复核） |

## 5. 未核实项与新发现的待定夺

1. **470 个精灵包是否用 `build_sprites.py` 从 `cast/` 重建真实包？**
   stub 只解决打包，stub 幕无人物帧。部分包可重建（如 `vvgiveup1.js` ← `l_lift0/1/2`，
   `cast/` 里都有），但 470 个逐一定帧名映射是大工程；另 `cast/` 是否覆盖全部
   470 个包的帧未逐个核对。定夺：维持 stub（打包通过即可）、排期重建、还是只重建
   高频幕（如 give/take/get/turn 系列）？
2. **v5 原生 R2/R4 静态检查做不做？**（§3.4）废止 r2check 后，词级 R2 与 R4
   无自动化检查；629 幕 auto 幕句子朗读有结构保证，`w` 词单读与 330 幕手写幕无保证。
   定夺：接受缺口（人工抽查）、还是立项新写一个解析 `ITEMS` + `ACTS` + `FI` 的检查？
3. **`SOP.md` / `CHANGELOG.md` 里 `r2check.py --strict` 验收行是否改写？**
   本项未动共享规约文档；定夺：改写为 §3.3 的三步管线，还是保留历史记录原样？
4. **`gen_wb13_units.py` docstring 第 8 条“基线断言已过时”是否更新？**
   本项为避与场景分支的 docstring 改动（行 10–22）冲突未动；合并时总协调人裁定
   是否由场景分支侧或本分支侧同步一句话（`--check-only` 已恢复为校验模式）。
5. **6 个共享 lib（`cmp_lib` 等）是否应进打包扫测口径？**
   它们天生无 `default` export、`build.mjs` 打不进去；本项定为 N/A。定夺：
   维持 N/A、还是给 `build.mjs` 加一个“lib 只做 `node --check`”的分支？
6. **主检出共享工作树被并行工作切换分支**：本次为隔离提交另建了 linked worktree
   `~/workspace/mengxing-wave4-tooling`；stub 文件在主检出
   （`~/workspace/mengxing-primary-english-app/docs/whiteboard/v5/sprites/`，
   gitignored）。合并后如需在干净检出复现打包扫测，须先跑
   `python3 docs/work-2026-11-09/make_sprite_stubs.py` 重建 stub。
