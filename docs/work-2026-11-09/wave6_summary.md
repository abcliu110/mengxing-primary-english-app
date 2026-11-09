# 第六波总底稿——14 项全部落地（`788f0bd..`，check_all 27/27）

> 日期：2026-11-10 · 执行：第六波总协调人 · 基线 `788f0bd`（第五波收尾，check_all 27/27）
> 定夺：主对话 Muse（Priya 2026-11-10 07:20“这 14 件新的也你来定”）
> 实施：四路并行（独立 linked worktree，home 磁盘）→ rebase + fast-forward 线性合并，无冲突外一处（门禁脚本，见“合并”一节）
> 最终验证（合并后主树重跑）：`check_all.py` **27/27“结论：全部通过”**；`v5check.py` 全库 FAIL **439 项 / 411 幕**（R2-W1 399、R4-F2 40），WARN 105（R2-P1 6 + ACTS 为空 99），UNKNOWN 870（精灵包 stub 为 gitignored 本地产物，主树无 stub 故多，FAIL 计数不受影响；与第五波同口径），豁免跳过 748 处。

## 按项汇报

### 白板线

**第 1 项：v5check 基线 782 项 FAIL 立项补，分两步 ✅** — (a) r2skip 豁免机制落地（豁免清单 + `v5check.py` 支持，每类写清豁免理由；旧工具的 `r2skip`（被划掉的错误形式）已查，无可复用的现成清单）；(b) 豁免后重定基线：FAIL **782 → 526**（R2-W1 572→486、R4-F2 210→40），豁免跳过 748 处；(c) 第 1 批按 R2-W1 优先补“板上已有、可直接读”的缺口 87 项（手写 45 幕 + 生成 41 幕，`Time's up!`、`Good morning!` 等逐字照抄，相邻 `'m'` 行现成译文；词根/词块进先读词表；平行补句 4 处；凡需新编例句的一律不编）：FAIL **526 → 439**（R2-W1 486→399，R4-F2 40 不变），新增 FAIL 0 项。剩余 R2-W1 399 项（生成 148 / 手写 251，auto 304 / oral 89 / poly 6）、R4-F2 40 项未清零；oral/poly 另议。底稿 `wave6_item1c_topup1.md`（+ 第 1 项 (a)(b) 底稿）。

**第 2 项：ACTS 为空 107 幕逐幕判断 ✅** — 分类：**补动作 8 / 本来静态 19 / 待确认 80**（逐幕清单 `wave6_item2_acts_empty_classification.json`）。补动作 8 幕：`hd_poly_law_v16_1`（turn on → l_switch）、`vv_fly_core_1`（fly → bird_up, bird_down）、speak 系 5 幕（speak/spoke → l_speak）、`vv_stand_up_1`（stand up → l_sit, l_stand）；判定口径：键须在朗读句里真实触发、帧须看过实物确实画该动作、须有活先例或场景自带规格、帧在 AH=470 下不超画布；名不副实的帧一律不用（l_fall 是骑车摔、l_cake1 是吹蜡烛、plane 宽 1207px 出画布）。落点：生成器新增 `ACTS_REG`（再生唯一来源）、8 个场景文件、`units.json` 8 个 cases 同步、8 个精灵包从 cast/ 重建（FR 核对 8/8）。验证：v5check FAIL 与基线逐项一致（0 新增、0 减少），ACTS 为空 WARN **107 → 99**；build 打包 8/8、node --check 8/8；探针 8 幕时长与 stub 版到 0.1 秒逐项一致，均 ≤60 秒。底稿 `wave6_item2_acts_empty.md`。

**第 3 项：427 个 stub 包不继续重建 ✅（只记一笔）** — 427 包维持 stub（cast/ 无素材），待 CAST 帧重建时再补；与第五波的高频重建记录（47 包）并列。未改代码。

**第 4 项：R2-P1 161 项先读词提醒统一口径 ✅** — 统一格式（写进 `v5check.py` 的 `pre_word_ok`，以现行多数为准）：屈折一致 / 词块（子串或包含）/ 词条占位（something/somebody/be）/ `/` 备选任一合规；其余视为错位，移词或删除。checker 计数 **161 → 28**；22 项归一（手写 13 + 生成 9）；剩余 **6 项**无法归一，逐条记入底稿：`in`×2（fp_economy_3/gen_phonology_3，前缀 in- 无句可落）、`moon`×2（wo_time_week_p2_1/生成版，词源 `= moon + day`）、`ith`×2（wo_vowel_b_1/生成版，古尾巴 -ith）。实施中修正 checker 误判（`'on' ⊂ 'moon'`、`'I' ⊂ 'with'` 短词子串误判通过；t in pre 须 ≥3 字母、pre in t 须 ≥2 字母或 `s`）；基线 WARN 因此订正 133→135（R2-P1 26→28），FAIL 526 不变。底稿 `wave6_item4_p1.md`。

**第 5 项：MASTER_DESIGN/DESIGN_HANDOFF/HANDOFF 的 r2check 引用改写 ✅** — `MASTER_DESIGN.md` 8 处：改写 **5** 处验收行/用法块（L152、L157、L225、L247、L612）为 v5check + 现行五步验证管线，每处留“`r2check.py` 已废止”注记；留原样 **3** 处历史行（L240、L672、L877，2026-10-29/30 的 dated 诊断与进度记录，一字未动）。`DESIGN_HANDOFF.md` / `HANDOFF.md`：大小写不敏感 grep 均为 0 行，无改动。验证：改后 grep 剩余 8 行 = 5 处新注记行 + 3 处历史行。底稿 `wave6_item5_r2check.md`。

**第 6 项：v5check 不进 check_all ✅（只记一笔）** — v5check 维持 SOP 逐幕验收；基线 FAIL 清零（或降到约定阈值）后再议是否进 check_all。未改 check_all。

### 主文件线

**第 7 项：拼读区 49 行标注“索引有、律页无” ✅** — 49 行（PHONLAWS cases==0 且再生 ERRIDX>0，脚本实时算出）各加 `<span class="ph-note">索引有 · 律页无</span>`（虚线边框小 pill，沿用 `.lz-pre` 暖金配色，不用 `st` class，不进徽标门禁计数），区首 `<p class="sub">` +1 句解释，样式 +1 条。未动 PHONLAWS cases、ERRIDX、徽标、律页渲染器；未写新病例内容。数字：49 行 ERRIDX 合计 56 条；未标注 3 行 S-14（2/2）、S-43（7/7）、SR-04（1/1），cases 与 ERRIDX 相等。验证：jsdom 52 行中标注 49 行，集合与算出名单逐项一致，每行仍恰 1 个 `.st` 徽标；门禁 PASS。底稿 `wave6_item7_phonics_labels.md`（“补齐须先定 phonics 律页病例口径”已记入）。

**第 8 项：CO-17 补 data-law 行 ✅** — `#v-grammar2` 构式组 CO-16 行后新增 `<div class="urow" data-law="CO-17">`（标题“空心动词 + get 五构造”取自同区现有深研行，徽标 st deep「已做深」），组标题范围扩为 CO-01–CO-17；原两处 data-go 深研行保留。门禁 CO-17 从排除项转为特殊行（只核对徽标、LAWFLAG 落点、运行时 ERRIDX 与再生一致 2 条，不套 ERRIDX 口径）。数字：#v-grammar2 data-law 行 31→**32 行**。验证：jsdom 点行后 `.view.on` 由 `v-home` 变为 `v-u-co17`（落点已有，`LAWFLAG['CO-17']='u-co17'`，无需新接线）；先修标记「⏳ 先修 CO-12」如期出现；门禁 PASS；反向自证：徽标改错、只改 LAWFLAG 各报且只报 1 行（后者曾暴露全文搜会误中 relSectionHTML 的同名映射表，已收紧为只在 `var LAWFLAG={...}` 内核对）。底稿 `wave6_item8_co17_row.md`。

**第 9 项：anchorcheck 正式废止 ✅** — 立 `docs/whiteboard/src/anchorcheck.RETIRED.md`（参照 r2check 前例，文件本体保留未删）；`jscheck.py` 删末尾 anchorcheck 调用，退出码只由 node --check 决定，头注与末尾留注记指向 RETIRED 标记；`check_js_syntax.py` 逻辑未动、docstring 与通过注记改写为“anchorcheck 已废止”；`check_all.py` jscheck 行 docstring 一行同步。不补锚点、不改期望值、不列入门禁。调用排查：全仓库 `import anchorcheck` 只剩两处——jscheck.py 是现行唯一活调用，已跳过；另一处 `appwrite.py` 的 `save()` 是死代码（`APP` 指向已被删的老合并版文件，调用者约 30 个 `patch_*.py` 等全是已执行过的一次性补丁脚本，check_all/runall/SOP 均无现行引用），未动，已写入 RETIRED 标记与底稿。废止前重跑确认：116 项与第五波快照逐项一致（116/116）。数字：jscheck 退出码 1（anchorcheck FAIL 116 项）→ **0**（只输出 node --check OK，41 inline + 0 modules，无 anchorcheck 行）；check_all 项数不变。底稿 `wave6_item9_anchorcheck_retire.md`。

**第 10 项：C-06/C-07 短标题修呈现 ✅** — `preShortTitle(hl)` → `preShortTitle(hl, id)`，只在 id 为 C-06/C-07 时返回全标题（跳过冒号截断）；`preBarHTML` 传 `t`；§2.2 注释登记例外。全局截断逻辑一字未动（`preShortTitle` 唯一调用点就是 `preBarHTML`）。数字：jsdom 全量 453 条 `preBarHTML` 前后比对，**变化 4 条（C-08、C-09、C-14、C-19，即引用 C-06/C-07 为先修的站）、不变 449 条**；裸 `《C-06 a》`/`《C-07 the》`由 4 条→**0 条**；`onclick` 与 `title` 属性一字未动。底稿 `wave6_item10_c0607_chips.md`。

**第 11 项：v-tech 区 data-tec 行纳入徽标对账 ✅** — `check_badge_erridx.py` 扩面至 829 行（同一脚本、同一 check_all 项，不新增门禁项）。扫面：**530 行全对，0 行修，主文件一字未动**。三组口径逐组写明、不硬套 ERRIDX（TEC-* 不入 laws_master，ERRIDX 对 TEC 无病例；权威源是主文件内 `var TECDATA=` 153 条 + 同文件 TEC 渲染器的 famName 映射，门禁从文件内正取映射、不另抄）：痛点组 224 行（徽标 = 路名，class ok）、路组 153 行（徽标 = 区名，class ok）、区组 153 行（徽标 = 先行 108 / 进阶 4 / 顺序见页内 41，class part）。另核对标题（530/530 与 TECDAT name 一字相同）、分组归属、18 个分组头计数、行集合（痛点对集 224 对、路组/区组 id 集各 153 条恰相等、无重）。数字：门禁覆盖 299→**829 行**；check_all 项数 27 不变。验证：反向自证 4/4（痛点组/路组/区组徽标、分组头计数各改 1 处，各报且只报 1 行、退出码 1）。底稿 `wave6_item11_vtech_badges.md`。

**第 12 项：Stewart 确认待安排 ✅（只记一笔，不代确认）** — 《数据源规范》§8 规定修订须经 Stewart 确认；第 9 项修订（lawdata.cases 与 ERRIDX 口径）的 Stewart 确认待安排，主对话与实施员均不代确认。提醒 Priya 去安排。

**第 13 项：以第五波逐行实测为准 ✅（只记一笔）** — 第四波“其余区 ok 39 处、part 53 处”作废，以第五波逐行实测（ok 30 处 + 各变体）为准。未改代码。

**第 14 项：大波次工作树放 home 磁盘 ✅** — 记入 `~/AGENTS.md`（操作惯例）；第六波四路 worktree 均放 `~/workspace/wave6-*`（home 磁盘），未用 /tmp。

## 合并（总协调人）

- 四分支（`wave6/wb-check`、`wave6/wb-scenes`、`wave6/main-a`、`wave6/main-b`）按主文件线 B → 主文件线 A → 白板线场景 → 白板线 v5check 顺序 rebase + fast-forward 合并，线性历史，全程 1 处冲突（`wave6/main-a` rebase 时 `check_badge_erridx.py` 与 `check_all.py` 的 docstring/汇总行：A 线 300 行 vs B 线 829 行，手动对成 **830 行** = 829 + CO-17 深研行 1 行，含 CO-17 特殊行段落与 v-tech 三组口径并列；合入后门禁实测 PASS 830 行）。
- 《数据源规范》§6 同步为 830 行（7 个静态索引区）+ v-tech 口径一段；§8 的 Stewart 确认待安排（第 12 项）。
- 合并后主树重跑：`check_all.py` **27/27**；`jscheck` node --check OK（41 inline），无 anchorcheck 行；`gen_wb13_scenes.py --check-only`（50 格）与 `gen_wb13_units.py --check-only`（234 页签）通过；`v5check.py` 全库 FAIL 439/411 幕（与白板线汇报一致）。
- 推送后 `git fetch` 核对本地 HEAD = origin/master，工作区干净；四条 feature 分支与 linked worktree 已清理删除。

## 新发现的待定夺（四线汇报汇总，均未擅自做）

**白板线 v5check（第 1、4 项）：**
1. §4 项的 6 项无法归一（`in`/`moon`/`ith`）：是否为先读词表立第 5 类合规口径（“词根/词缀/词源词：板上有据、先读即单独读”），还是各补一句含该词的例句。
2. checker 已知宽松处：单字母先读词 `I` 按旧屈折口径 `I+s=is` 仍可通过，是否收紧。
3. writing_alchemist_1 等长幕（260s，远超 120s 线）是旧账，本波未动，是否按决策 36-② 拆节须另立项。
4. R4-F2 40 项：writing_alchemist 的名词键（postmen/piano/strawberries/sheep）删键还是补句；`gen_scene.py` 是否应按生成幕裁剪 ACTS。
5. R2-W1 剩余 399 项的下一批排期：oral/poly 另议；其余多为“词在中文讲解/公式/标签里、无句可读”，须逐幕判断补句、豁免还是改板，不可批量套用本批方法。

**白板线场景（第 2、5 项）：**
6. 待确认 80 幕的缺帧怎么办（内容方定映射 / 美术方画新帧 / 接受长期无动作）。
7. `bird_down` 超约 88px 是否回修先例幕 `five_patterns_p2_1`。
8. `fp_vectors_2` 的 `plane0/1/2` 同样超宽（约 930px），是否立项修。
9. `wo_rule` 的 `eat` → `l_cake1` 是错配（帧是吹蜡烛），是否改。
10. 死键清理（基线 R4-F2 210 项 FAIL 里含一批死键）是否立项。
11. **`wbtextcheck.py` 跑不起来**：读已删老 App 且无路径参数，SOP 五步管线第 ④ 步在仓库里是断的；是否修脚本或换检查（本波改写的 5 处验收行都指向了这条管线）。
12. `fly out` 的 plane 帧尺寸问题：重画小尺寸飞机帧，或加 `actorFitW`。

**主文件线 A（第 7、8、10 项）：**
13. 补齐须先定 phonics 律页病例口径（49 行律页 cases 仍为 0、ERRIDX 56 条仍只在索引里）。
14. CO-17 是否补独立规律页、是否配练习（仍无 LAWDATA、无 quiz，ROSTER route 仍为空）。
15. CO-17 的 data-law 行与紧邻的 data-go 深研行标题几乎相同、连着出现两行，是否嫌重复。
16. 《数据源规范》§6（299→830 行）与 §1 补记（第 7 项注记）按 §8 待 Stewart 确认。
17. 第 10 项例外按 id 判定：C-06/C-07 若将来改编号，例外失效回落为旧截断，需重审。

**主文件线 B（第 9、11 项）：**
18. `appwrite.py` + 约 30 个一次性补丁脚本是否连同 anchorcheck 一并退役清理。
19. `SOP.md` §83/§88/§227、`HANDOFF.md`、`MASTER_DESIGN.md`、`runall.py` 头注仍把 anchorcheck 写成现行检查，是否改写（r2check 同款问题留到了第六波第 5 项统一改写）。
20. v-tech 区组 41 条“顺序见页内”兜底口径：是否统一改写这 41 条 hint 开头以消除兜底档，或把该口径成文。
21. 《数据源规范》§6 仍写“全部 299 行”，现已是 830 行；是否同步修订（§8 规定须经 Stewart 确认）。——注：合并时总协调人已把 §6 同步为 830 行；Stewart 确认仍待安排（见第 12 项）。
22. TECDAT 为主文件内手写字面量、无 model 事实源与生成器；本次是对同一文件内索引行 vs 详情字面量的交叉核对，TECDAT 本身若有错门禁查不出（与拼读区口径同构的风险，已登记）。

## 未核实项

真机未核实：49 处虚线标注是否与徽标拥挤/小屏换行；CO-17 新行实际呈现与点行进深研单元后的返回路径；C-08/C-09/C-14/C-19 四站长芯片在窄屏是否拥挤；8 幕人物帧实际画面；`bird_down` 约 88px 右缘超出只在静态尺寸上算过；v5check 未在真机听语音；重建精灵包画面同前。另：Chromium 1254 未装上（下载断连），下次 `durcheck.py` 默认启动仍会失败，需另行下载或继续用 1248 的 `executable_path` 方式。
