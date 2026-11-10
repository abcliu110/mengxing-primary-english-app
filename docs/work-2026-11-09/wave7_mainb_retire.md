# 第七波主文件线 B 工作底稿：appwrite + 一次性补丁脚本退役、anchorcheck 引用改写、v-tech 口径与 TECDAT 风险成文（2026-11-10）

> 定夺（主对话 Muse 已定，第七波第 18–22 项）：本稿只实施、不重新定夺。
> 基线 HEAD `8e278f2`，分支 `wave7/mainb`。主文件 `laws-prototype/mengxing-prototype-v1.html` 一字未动。
> 本波为最后一波自动波；新发现的待定夺只记入本稿 §七，不擅自实施。

---

## 一、第 18 项：appwrite.py + 一次性补丁脚本退役清理 ✅

### 1.1 删了什么（44 个文件，git 历史可找回）

`docs/whiteboard/src/` 下：

- `appwrite.py`（写入通道：写前 anchorcheck、写后 jscheck）
- 38 个 `patch_*.py`：patch_a3_examples、patch_a4_collocations、patch_a7_spelling、patch_affix_vocab、patch_b2_grammar、patch_b2_grex、patch_deadcode、patch_dedup_a、patch_dedup_b、patch_dedup_c、patch_etym_card、patch_grammar_examples、patch_menu_grammar、patch_menu_home、patch_menu_hubs、patch_menu_words、patch_metaphor4、patch_mobile、patch_my_study、patch_oral_func、patch_phon、patch_phonics4、patch_practice、patch_r37_contrast、patch_r37_copy、patch_r37_gate、patch_r37_iconic、patch_r37_md、patch_r37_player、patch_r37_topbar、patch_r37_wordlist、patch_r38_wordcard、patch_tts、patch_vocab_add、patch_wb5_parts、patch_wo_grimm、patch_wo_grimm_split、patch_wo_rules
- `build_etym_db.py`、`gen_module_quiz.py`、`split_vocab.py`、`retire_canvas.py`
- 附带数据文件 `dedup_b_data.json`（唯一使用者是已删的 `patch_dedup_b.py`，见 §1.2；其内容 51 条别名已打进老主文件，见 patch_dedup_b.py docstring）

计数：`docs/whiteboard/src/*.py` 81 → **38**；删脚本 43 + 数据文件 1 = **44**。

### 1.2 引用核对（删前全仓库 grep，审计脚本 `wave7_mainb_audit_refs.py`，本目录）

- **现行代码调用：0。** 43 个脚本互相之间只有 import appwrite（`from appwrite import save, APP` / `import appwrite`），无任何现行脚本 import 它们；`runall.py`、`check_all.py`、CI（仓库无 `.github/`）均无调用。删后复核：`import patch_ / from patch_ / import appwrite` 等 import 语句全仓库 **0 残留**。
- **为什么能删（双重死亡证据）：** ① 43 个脚本全部以 `萌星小学英语_最终合并版.html`（仓库根目录）为写入目标，该文件已于 2026-11-03 由 `d1c946f` 删除，工作树与 `git ls-files` 计数均为 0——`appwrite.save()` 读目标文件即报 FileNotFoundError，**一个都跑不起来**；② 现行主文件 `laws-prototype/mengxing-prototype-v1.html` 里两批共 24 个补丁标记/内容标识（标记批：WB5_PARTS_V1、WORD_ALIAS_V1、AFFIX_VOCAB_V1、GRAMMAR_EX_V1、DEDUP_C_V1、MOBILE_O4_V1、MY_STUDY、WO_GRIMM_GROUPS_V1、WO_RULES_CHAPTER_V1、DEDUP_A、MENU_V2、ORAL_FUNC_MAP_V1；内容批：wordFormsHtml、migrateWordAliasRecords、AFFIX_WORDS_JSON、GRAMMAR_EX_JSON、etymIsPlaceholderTip、grexMount、kpMount、MENU_V3/V4/V5、WB5_PARTS、DEDUP_C、MY_STUDY_V1、WO_GRIMM/WO_RULES）**命中 0**——现行主文件从未含这些锚点（与第六波第 9 项结论一致）。
- **已执行过：** 各脚本 docstring 均标幂等/已打过补丁（如 patch_a3「幂等，走 appwrite」、patch_dedup_b「已打过补丁即退出」），CHANGELOG 2407 行记「全部补丁脚本重跑后主文件逐字节不变（幂等）」。
- **现行文档里的活引用（已改，6 处一行）：** 凡以现在时写「由 X 做」的流程句，改成过去时 + 退役注记——`deadcode.py`（删除曾由 patch_deadcode.py 做）、`iconic.py`（判定与原 patch_r37_iconic.py 共用）、`phon_gen.py`（数据进主文件曾由 patch_phon.py 做）、`build_affix_db.py`（build_etym_db.py morph 已把派生词并进 MORPH_DB）、`fnranges.js`（供 deadcode.py 用，原 retire_canvas.py 已退役）、`vocab_extract.js`（工具列表删 gen_module_quiz）。
- **留档未改（历史记述，不是现行调用）：** `CHANGELOG.md` 全部历史条目；`HANDOFF.md` 各决策完成表（L3、L91、L94、L124–131、L140、L142–148，含 appwrite 的 L147 完成行）；`MASTER_DESIGN.md` L222（O6 完成行）、L398（A7 定案）；`REQUIREMENTS.md`、lab/audit35·38、`word_origins/*.md`、`SOP_COGNITIVE_UPGRADE.md`、`lab/MODULE_QUIZ_REPORT.md` 等审计/复核文档；`anchorcheck.py` 内注释（该文件本身已废止，见其 RETIRED 标记）；`v5/app_check*.py` 与 `split_auto.py` 的 docstring 出处注记（回归覆盖的是哪个决策/补丁的活，属出处说明）；`docs/whiteboard/src/anchorcheck.RETIRED.md` 的残留调用清单。
- **不在本次删除集内：** `laws-prototype/imported/mengxing-etymology-prototype/patch_grouping.py`（归档原型区，`imported/README.md` 仍列为词源工具链一部分）——未动，见 §七待定夺 4。

### 1.3 未核实项

- 未逐个重跑 43 个脚本（目标文件已不存在，跑即 FileNotFoundError；以目标文件缺失 + import 零残留 + check_all 全绿为证）。
- 2026-10-30/31 补丁内容是否以另一形态存活于现行主文件，未逐条比对：12 个标记/标识命中 0 只证明「锚点形态未搬」，内容本身（如 A3 真例句、A7 英式拼写）的去向属老 App→新 App 迁移的既有问题，不由本次删除改变（删脚本不删现行主文件任何内容）。

## 二、第 19 项：四处文档 anchorcheck 引用改写 ✅（12 处）

凡把 anchorcheck 写成现行检查的地方，改写为「已废止，见 anchorcheck.RETIRED.md」；历史记录原样不动。

| 文件 | 位置 | 改法 |
|---|---|---|
| `docs/whiteboard/SOP.md` | §83（jscheck 条） | 「末尾自动跑 anchorcheck.py」→「末尾不再跑 anchorcheck.py（已于 2026-11-09 第六波废止，见 RETIRED 标记）」 |
| `docs/whiteboard/SOP.md` | §88（五步管线⑤） | 「anchorcheck 116 项基线不列入门禁」→「anchorcheck 已废止，见 RETIRED 标记」 |
| `docs/whiteboard/SOP.md` | §227（验收清单） | 「jscheck.py（含 anchorcheck）通过；node --check 通过」→「jscheck.py（node --check；anchorcheck 已废止）通过」 |
| `docs/whiteboard/HANDOFF.md` | §2 改主文件规矩 L81 | 「登记进 src/anchorcheck.py」→ 旧登记通道已废止 + 旧写入通道 appwrite 已退役（各指 RETIRED 标记与本稿） |
| `docs/whiteboard/HANDOFF.md` | 阶段表④ L165 | 「jscheck / anchorcheck OK」后加「（当时；anchorcheck 已于 2026-11-09 第六波废止）」——历史事实保留，只补废止注记 |
| `docs/whiteboard/MASTER_DESIGN.md` | O8 验收格 L224 | 「jscheck.py 含 anchorcheck」→「jscheck.py（anchorcheck 已废止，见 RETIRED 标记）」 |
| `docs/whiteboard/MASTER_DESIGN.md` | O9 目标格 L225 | 「node --check、anchorcheck、v5check」→ anchorcheck 后加已废止注记（与同格 r2check 注记同款式） |
| `docs/whiteboard/MASTER_DESIGN.md` | 决策 33 L346、决策 34 L369、决策 35 L379、决策 36 L456 | 「走 appwrite.py + anchorcheck」→ 两者各标已退役/已废止（appwrite 指本稿，anchorcheck 指 RETIRED 标记） |
| `docs/whiteboard/src/runall.py` | 头注 L3 | 「jscheck（node --check + anchorcheck）」→「jscheck（node --check；anchorcheck 已废止，见 RETIRED 标记）」 |

未动：`CHANGELOG.md` 全部历史条目；`HANDOFF.md` L104（2026-10-31 多 agent 并行协议，anchorcheck.py 仅列为当时的共享文件之一，非检查表述）；`MASTER_DESIGN.md` L224「已加 anchorcheck.py（63b7be4）」（历史事实）与 O8 目标格「写前校验锚点」（设计意图原文）；`SOP.md` 其余陈旧引用（如 L89 引擎回归取旧文件 `git show HEAD:萌星小学英语_最终合并版.html`，见 §七待定夺 5）。

## 三、第 20 项：v-tech 区组 41 条「顺序见页内」口径成文 ✅（不改 41 条 hint）

《数据源规范》§6 静态徽标门禁段的技巧区句后追加（仅改 §6 一处，§1 未动）：

> 按区组 153 行徽标三分法（2026-11-10 第七波第 20 项成文）：hint 以「先行」开头→「先行」（108 行）、以「进阶」开头→「进阶」（4 行）、其余 hint→「顺序见页内」（41 行）为兜底档，顺序关系在详情页 hint 内文交代，索引行不搬全文；41 条 hint 一字不动。

核对（主文件未动，实测数与第六波第 11 项一致）：`<span class="st part">先行</span>` 108、`<span class="st part">进阶</span>` 4、`<span class="st part">顺序见页内</span>` 41、「顺序见页内」全文出现 41 次。

## 四、第 21 项：§6「全部 299 行」已同步为 830 行（只记一笔，不改文档）✅

《数据源规范》§6 静态徽标门禁段现行文字已是「……第六波第 11 项再扩面至全部 829 行、2026-11-10 第六波第 8 项 + CO-17 深研行 1 行，共 830 行」，**同步已完成**。Stewart 确认待安排（与主文件线 A 第 16 项并列提醒）。本项未改任何文档。

## 五、第 22 项：TECDAT 无 model 事实源、门禁查不出其本身错误——登记为已知风险 ✅（不做 model 化）

《数据源规范》§6 同段技巧区句后追加（与第 20 项同一 hunk，§1 未动），底稿同步登记：

> 已知风险（2026-11-10 第七波第 22 项登记，不做 model 化）：TECDAT 为主文件内手写字面量，无 model 事实源与生成器；门禁是对同一文件内索引行 vs 详情字面量的交叉核对，TECDAT 本身若有错门禁查不出。

代码一字未动；未做 model 化。

## 六、验证（2026-11-10，基线 8e278f2 之上）

- 删后复核：`import patch_ / from patch_ / import appwrite / from appwrite / import build_etym / import gen_module / import split_vocab / import retire_canvas` 全仓库 **0 残留**；`docs/whiteboard/src/*.py` 81 → **38**；`git ls-files` 中已删 44 文件计数 0。
- `python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html` → `node --check: inline scripts=41, lazy modules=0 → OK`，无 anchorcheck 行，**退出码 0**。
- `python3 laws-prototype/tools/check_all.py` → **27/27，结论：全部通过**。
- `python3 laws-prototype/tools/gen_laws.py --check` → CHECK: PASS（稳态），退出码 0。
- `python3 laws-prototype/tools/check_upstream.py` → 五条上游链全部无未登记漂移，退出码 0。
- `python3 laws-prototype/tools/check_rel_coverage.py` → PASS（LAWDATA.rel 727 条边 ⊆ LINKIDX.g，覆盖 320 条规律），退出码 0。
- 改动的 py 文件 `python3 -m py_compile` 通过；两处 js 注释改动 `node --check` 通过。
- 提交前 `git show` 逐行核对落点（见各提交）。

## 七、未核实项与新发现的待定夺（只列出，不实施）

- 真机未核实：本项只删脚本、改文档注记与规范文字，不改主文件内容与呈现；无真机验证面。
- 待定夺 1：`anchorcheck.py` 本体现已无任何现行 import 者（唯一调用者 appwrite.py 已删；jscheck.py 第六波已跳过调用）。是否连同退役清理（删文件 / 立 RETIRED 标记已立，是否再删本体），请总协调人定夺。本项未动它。
- 待定夺 2：`deadcode.py` 未进 `runall.py`，且其 `APP` 仍指已删的 `萌星小学英语_最终合并版.html`——现跑即 FileNotFoundError。它是否仍需保留/修目标/退役，请总协调人定夺。本项只改了它的一行 docstring，未动逻辑与目标。
- 待定夺 3：`docs/whiteboard/src/fnranges.js` 仍由 `deadcode.py` 使用（acorn 依赖），本次只改了它的注释，未删。随待定夺 2 一并定。
- 待定夺 4：`laws-prototype/imported/mengxing-etymology-prototype/patch_grouping.py`（归档原型区，`imported/README.md` 仍列为词源工具链一部分）是否一并退役，请总协调人定夺。本项未动。
- 待定夺 5：`SOP.md` L89 引擎回归句仍写 `git show HEAD:萌星小学英语_最终合并版.html > 旧.html`（目标文件已删），是否改写，请总协调人定夺。本项未动（不在第 19 项点名范围内）。
- 待定夺 6：第 20 项成文后，41 条 hint 是否最终统一改写为「先行：……」/「进阶：……」以消除兜底档（第六波第 11 项待定夺 1 的原问题），仍待 Priya/总协调人定夺；本项只成文，未改任何一条 hint。

## 八、提交

- 提交 1（第 18 项）：Docs：appwrite + 43 个一次性补丁脚本退役清理——删 44 文件，6 处活引用改写（`wave7_mainb_audit_refs.py` 审计脚本 + 本稿同批入）。
- 提交 2（第 19 项）：Docs：anchorcheck 引用改写——SOP 3 处、HANDOFF 2 处、MASTER_DESIGN 6 处、runall.py 头注 1 处。
- 提交 3（第 20 + 22 项）：Docs：《数据源规范》§6 技巧区口径——v-tech 区组 41 条「顺序见页内」成文 + TECDAT 已知风险登记（第 21 项只记本稿 §四，不改文档）。
