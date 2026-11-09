# 第六波第 5 项：MASTER_DESIGN / DESIGN_HANDOFF / HANDOFF 里的 r2check 引用改写（2026-11-10）

> 基线 HEAD `788f0bd`；分支 `wave6/wb-scenes`。
> 任务口径：把三文档里的 r2check 引用改写为现行五步验证管线
> （build 打包、grep 产物、探针时长、wbtextcheck、jscheck）+ v5check，
> 留“r2check.py 已废止”注记；历史记录原样不动（只改验收行/用法块，
> 不动历史叙述段落）。

## 0. 结论

| 文档 | 改前 r2check 行数 | 改写 | 留原样（历史） | 改后剩余 r2check 行 |
|---|---|---|---|---|
| `docs/whiteboard/MASTER_DESIGN.md` | 8 | **5**（L152、L157、L225、L247、L612） | **3**（L240、L672、L877） | 8（5 处为新废止注记行 + 3 处历史行） |
| `docs/whiteboard/DESIGN_HANDOFF.md` | 0 | 0 | 0 | 0 |
| `docs/whiteboard/HANDOFF.md` | 0 | 0 | 0 | 0 |

改写口径与第五波一致（`wave5_wb.md` §5：SOP/CHANGELOG 已改写）：
验收行里的 `r2check --strict` / `r2check 全部` 改为
`v5check.py` + 现行五步验证管线，每处留
“`r2check.py` 已废止，见 `docs/whiteboard/src/r2check.RETIRED.md`”。

## 1. 改写的 5 处（MASTER_DESIGN.md）

| 行 | 位置 | 原文要点 | 改后 |
|---|---|---|---|
| L152 | 决策 23，R1 零丢失 | 白板版验收（清单 ❌0、r2check --strict、R4 全覆盖） | 白板版验收（清单 ❌0、v5check R2/R4 全覆盖 + 现行五步验证管线）+ 废止注记（附五步展开，见 SOP §5） |
| L157 | 决策 24，做法 | `check_upgrade.py` 对照 ❌0；r2check --strict；渲染回归… | `check_upgrade.py` 对照 ❌0；v5check + 现行五步验证管线（废止注记）；渲染回归… |
| L225 | O9 自动化测试与回归，目标列 | 一条命令跑全套：node --check、anchorcheck、r2check 全部、渲染回归… | …、v5check 全部 + 现行五步验证管线（build 打包、grep 产物、探针时长、wbtextcheck、jscheck）、渲染回归… + 废止注记 |
| L247 | 决策 30，D5 R4v2 新验收 | `r2check` 用「动词 → 专属动作」表核对语义 | `v5check.py` 核对静态部分（动作词登记在 `ACTS` 里且挂在朗读句上、演出帧在精灵包 `FI` 里；语义对应与朗读重叠仍按动作联络表人工看，不由脚本代劳）+ 废止注记 |
| L612 | 决策 23–28 总表，① 验收列 | SOP §14 验收清单（清单 ❌0、r2check、R4 全覆盖、回归、挂载、截图） | SOP §14 验收清单（清单 ❌0、v5check + 现行五步验证管线、R4 全覆盖、回归、挂载、截图；废止注记） |

判定理由：5 处都是**现行有效的验收规则/目标规格**（决策 23/24 的
升级流程、O9 尚未实施的测试基座目标、决策 30 的 R4v2 验收、总表的
验收列），读者会按它们执行，故必须改写；其中 L247 的改法与 SOP §16
已改写行逐字同口径。

## 2. 留原样的 3 处（历史事实陈述，一字未动）

| 行 | 位置 | 内容 | 留的理由 |
|---|---|---|---|
| L240 | 决策 30，原因分析 5（2026-10-30 09:14，已核对代码） | `r2check` 只检查某个动作词是否登记了某个 `k.act` 且时间重叠，**不检查语义是否匹配**……`actionWords: []` 直接豁免——adj_order 4 个案例、bamboo_tree ②、fp_zoom_focus ③、wo_vowel_b ① 就是这样通过的 | 2026-10-30 的 dated 诊断：说明旧验收为什么太松、R4v2 为什么产生；是历史事实陈述，不是验收步骤。另：该行是第 2 项静态分类的旁证（bamboo_tree ② 等以空 actionWords 豁免通过），见 `wave6_item2_acts_empty.md` §3 |
| L672 | §2.6 进度（2026-10-29） | 动作库 v1 已实现……port 的 13 个动作词已由小人/搬运工/旅客/信使/场景演出并与朗读同步（`r2check.py` 验收） | 2026-10-29 的 dated 进度记录：当时确实是用 r2check 验收的 |
| L877 | §6 进度追加（2026-10-29 晚），工具行 | 工具：`r2check.py --summary`（按页签汇总）、`r2skip`（被划掉的错误形式）、`check_inventory.py`…… | 2026-10-29 的 dated 工具清单：记录当时在用的工具；不是现行用法块 |

三处均未加行内注记（与第五波处理 SOP/CHANGELOG 历史行的做法一致：
历史行不动，注记记在本底稿）。

## 3. DESIGN_HANDOFF.md / HANDOFF.md：0 处

大小写不敏感 grep（`r2check|r2_check|r2 check`）两文档均为 0 行，
无可改写；本项在这两文档无改动。

## 4. 验证

- `grep -n r2check MASTER_DESIGN.md`：8 行 = 5 处改写行（每行含
  v5check + 五步管线 + 废止注记）+ 3 处历史行（L240、L672、L877，
  与改前逐字一致，`git diff` 只显示 5 处改动，10 行增减）。
- `grep -in r2check DESIGN_HANDOFF.md HANDOFF.md`：0 行。
- 其余 r2check 提及：SOP.md / CHANGELOG.md 已于第五波改写（`d0a53a3`），
  本波未动；`src/r2check.RETIRED.md` 原样在位。

## 5. 新发现（未擅自做）

- **wbtextcheck 跑不起来**（与第 2 项底稿 §7 第 6 条同一发现）：
  五步管线第 ④ 步 `wbtextcheck.py` 读已删老 App，现有仓库跑不起来；
  本波改写的 5 处验收行都指向了这条管线——管线本身断了一步，
  是否修 `wbtextcheck.py`（改读现行主文件）或把第 ④ 步换成别的检查，
  待定夺。
