# 第七波总底稿——全部完成（HEAD `b41a0d0`，check_all 27/27）

> **停止规则（首页置顶）：第七波是最后一波自动波。** 做完后，不再自动开新波；新的待定夺只记入工作底稿（`docs/work-2026-11-09/`），不自动实施，除非 Priya 再点名。原因：六波下来清单越长越长（8→7→8→13→14→22），且越往后越是内部自洽。**“完”的标准是 check_all 绿 + 已知儿童可见内容错误清零**；之后下一步是真机/孩子实测，不是第八波。

- 基线：`8e278f2`（第六波收尾），check_all 27/27。
- 合并：四线 34 提交（主文件 B 3 + 主文件 A 4 + 白板场景 6 + 白板 v5check 21）rebase + fast-forward 线性合入，无冲突；总协调人合入后补 1 提交（拆节 × R4-F2 交互修补，见下）+ 本底稿 1 提交；无 force-push；推送后本地 HEAD = origin/master，工作区干净。
- 工作树：四路 linked worktree 均在 home 磁盘（`~/workspace/wave7-*`），未用 /tmp；已清理删除。

## 合并验证（合入后主树重跑）

- `check_all.py`：**27/27“结论：全部通过”**（含 `check_badge_erridx` 830 行、`check_lawdata_roster`、`jscheck node --check` 门禁）。
- `jscheck.py laws-prototype/mengxing-prototype-v1.html`：node --check OK（41 inline + 0 modules）；anchorcheck 已废止，无 anchorcheck 行。
- `v5check.py` 全库：**FAIL 138 项 / 138 幕（R2-W1 138、R4-F2 0）**，WARN 115，UNKNOWN 872，豁免跳过 766。相对第六波基线 FAIL 439（R2-W1 399 + R4-F2 40）：**−301**；R4-F2 清零。
- `wbtextcheck.py`（第 11 项修后）：875 幕，0 不合格，退出 0。
- `gen_wb13_scenes.py --check-only`：50 格全覆盖；`gen_wb13_units.py --check-only`：234 页签。
- writing_alchemist 三节重打包 + 探针（合入修补后）：76.4 / 90.1 / 96.6 秒，均 ≤120 秒，0 报错。

## 按项结果（22 项定夺全部落地）

**白板线 v5check（1–5）：**
1. 6 项无法归一各补一句例句 ✅ — `in`×2 用 OALD 原句 `Many of the figures were incorrect.`；`moon`×2 用 OALD 原句 `There's no moon tonight.`；`ith`×2 用板上原话直译 `The old ending was -ith.`（非 OALD，已注明）。R2-P1 8→2。
2. checker 宽松处收紧 ✅ — 单字母先读词 `I`/`a` 只按精确匹配通过（`I+s=is` 漏洞已堵；`'s` 仍豁免为复数标记）。反面验证：旧口径下通过的 `writing_alchemist_3` 及其生成幕现报 R2-P1。两处孤 `'I'` 按任务范围未修，记入新发现。
3. writing_alchemist_1 拆节 ✅ — 按决策 36-② 切 3 节（只在 `'n'` 前下刀），R1 零丢失（原 50 条 = 17/22/11，拼回逐条相等）。探针 76.4 / 90.1 / 96.6 秒（原 252.2 秒），均 ≤120 秒门限；第 3 节超 90 秒目标 6.6 秒。未加节末预测题（会是新编内容；先例拆分都不加）。`units.json` 未动（先例：`_p2_` 幕不在 units 口径内）。
4. R4-F2 40 项 ✅（含第 10 项死键清理）— 40 项逐项核对，全部是无板上内容的死键，**全删、零补句**；`gen_scene.py` 新增 `crop_acts_to_sentences`，生成幕按实际句裁剪 ACTS（全量重生成 309 个 spec，45 幕共删 122 死键）；手写幕删 14 键；`units.json` 同步 7 处。R4-F2 40→0；WARN 99→111（12 幕 ACTS 变空，诚实信号）。**合入后总协调人补修**：拆节把 5 个死键（piano/sweeping/strawberries/sheep/helps）原样抄进第 2、3 节，合入时 v5check R4-F2 回升 10 项；已从两节 ACTS 删净（与第 1 节 `ACTS = {}` 一致），重打包 + 重探针通过，合入后 R4-F2 仍为 0。
5. R2-W1 剩余 399 项下一批 ✅ — auto 逐幕三选一（补句 / 豁免 / 改板），399→135（白板线内数字）；补句只用板上已有词/平行句式或已核实来源；新增豁免两类（`ipa_fragments: [nt]`、`frame_roles` 扩 `speaker/addressee/trigger`，`message` 因是实词刻意不豁免）；`pron_map_1` 错读示范 `zis`/`wery` 用逐幕 R2SKIP。剩余 auto 40 幕全清单记入白板线底稿；oral 89 + poly 6 按任务另议未动。**合入后数字**：R2-W1 138（含拆节跨节产物 3 项，见下）。

**白板线场景（6–12）：**
6. 待确认 80 幕缺帧 ✅（只记一笔）— 接受长期无动作，待内容方定映射、美术方画新帧。
7. bird_down 超约 88px ✅ — 根因：帧 684×515，AH=470 下右缘 2008（+88）。5 幕加 `actorFitW: 500`（five_patterns_p2_1、fp_economy_3、fp_iconicity_2、fp_one_king_4、vv_fly_core_1），浏览器实测修后最右像素 ≤1878。代价：演员高 80%。
8. fp_vectors_2 plane0/1/2 超宽 ✅ — 真值右缘 2436（+516）；`actorFitW=500` 修不好（AH=250.7 时三帧 AX 区间无交集），取 440（AH=220.6，右缘 1876）；修后浏览器 1834/1873。代价：飞机演员高 47%。
9. wo_rule eat → l_cake1 错配 ❌ **未改成** — 第一手核实：`l_cake1` 是男孩吹生日蛋糕蜡烛；两幕的 eat 句是吃奶酪 / 吃牛肉猪肉；盘上 343 帧无一张“正在吃”，候选 `m_bread`、`dad_apple` 均已看图否决。错配仍留在两幕，待美术画通用吃帧或内容方删 eat 键。`vv_put_out_1` 的蛋糕幕本身是对的，未动。
10. 死键清理 ✅ — 并入第 4 项，不另立项。
11. wbtextcheck.py ✅ — 修前启动即 `FileNotFoundError`（写死 2026-11-04 已删的老 App）；现接受路径参数、缺省现主文件；②③ 需 `GRAMMAR_DB`，全仓库核实该表已不存在，故无表时只跑 ① 并打印跳过说明。SOP 第 ④ 步恢复可执行。
12. fly out plane 帧 ✅（参数已加，当前 dormant）— 两幕 `ACTS = {}`，根本没有 plane 帧可附着（`flew → plane` 是死键，未补映射）；两幕各加 `actorFitW: 440`，当前无视觉变化，将来登记 plane0/1/2 即生效。打包 + 探针 22.1/33.0 秒、0 报错。

**主文件线 A（13–17）：**
13. phonics 律页病例口径 ✅ — 写进《数据源规范》§1：律页 cases = 该律 PHONLAWS 条目自身 cases（与徽标口径一致）；ERRIDX 的 56 条是索引层面的病例登记，不直接等于律页 cases；两者口径不同是设计使然。49 行维持“索引有 · 律页无”标注，律页 cases 仍为 0 是合规状态，不再追补。
14. CO-17 独立规律页与练习 ✅（只记一笔）— 不补，维持 data-law 行 + 深研单元 `v-u-co17` 可达；ROSTER route 仍为空，仍是 20 条“暂无讲解页”之一。
15. CO-17 两行标题重复 ✅ — data-law 行标题改为 ROSTER[0] 原文“英语把「做事」交给空心动词：动词管语法，名词装事情；get 一个词收成五个构造”（逐字核对，未编造）；深研行一字未动；只改标题字面。
16. 规范 §6/§1 补记待 Stewart 确认 ✅（只记一笔）— 不代确认，提醒 Priya 安排。
17. C-06/C-07 例外按 id 判定 ✅ — 在 `preShortTitle` 注释内追加 2 行（例外按 id 判定，改编号时须重审）；逻辑未动。

**主文件线 B（18–22）：**
18. appwrite.py + 一次性补丁脚本退役清理 ✅ — 删 44 文件（appwrite.py、38 个 `patch_*.py`、`build_etym_db.py`、`gen_module_quiz.py`、`split_vocab.py`、`retire_canvas.py` 及附带数据 `dedup_b_data.json`）；引用核对：现行代码调用 0，`runall.py`/`check_all.py`/CI 均无调用，删后复核 import 零残留；6 处活引用改过去时 + 退役注记。`src/*.py` 81→38。
19. 四处文档 anchorcheck 引用改写 ✅ — 12 处（SOP.md §83/§88/§227、HANDOFF.md、MASTER_DESIGN.md、runall.py 头注），改写为“已废止，见 anchorcheck.RETIRED.md”；历史记录原样不动。
20. v-tech 41 条“顺序见页内”兜底口径成文 ✅ — 写进规范 §6 技巧区（先行 108 / 进阶 4 / 顺序见页内 41 为兜底档）；41 条 hint 一字不动。
21. 规范 §6 同步 ✅（只记一笔）— 现行文字已是“共 830 行”，同步已完成，Stewart 确认待安排。
22. TECDAT 风险登记 ✅ — 写进规范 §6：TECDAT 为主文件内手写字面量，无 model 事实源与生成器；门禁是对同一文件内索引行 vs 详情字面量的交叉核对，TECDAT 本身若有错门禁查不出；不做 model 化。

## 合入后数字总表（主树实测）

| 指标 | 第六波结束（8e278f2） | 第七波合入后 | 变化 |
|---|---|---|---|
| check_all | 27/27 | 27/27 | 0 |
| v5check FAIL | 439（R2-W1 399 + R4-F2 40） | **138（R2-W1 138 + R4-F2 0）** | −301 |
| v5check WARN | 105 | 115 | +10（12 幕 ACTS 变空 + 2 节 ACTS 变空，诚实信号） |
| v5check UNKNOWN（stub） | 870 | 872 | +2（拆节多 2 幕） |
| 豁免跳过 | 748 | 766 | +18 |
| 白板页签 | 234 | 234 | 0 |
| `src/*.py` | 81 | 38 | −43 |

## 拆节跨节产物 3 项（合入后 R2-W1 138 里含 3 项，已逐项核对，接受为已知状态）

R2-W1 按幕查（v5check.py 设计；R4-F2 按课查，`family_key` 把 `_pN_` 节归到同一课）。拆节后三节各有 1 项跨节产物——词在本课他节的朗读句里读到过，本节句里没有：
- 第 1 节：doing / like / very / much（在第 3 节句 `I like English very much.`、`enjoy doing` 里读到）。
- 第 2 节：very / happy / yesterday（在第 3 节句 `We were very happy yesterday.` 里读到）。
- 第 3 节：not / only / but / also（只在口诀行“用感叹句和 not only… but also…”里，全课无朗读句读到；全局豁免不适用——not/but/also 是全库常用实词，不能整词豁免；逐幕 R2SKIP 只用于故意展示的错误形式或字母名，不能拿来躲朗读）。
处置：接受为已知状态，不补句、不豁免、不改板（补句会是重复内容，第 3 节的句须已核实来源，另行定夺）。候选的将来工作：R2-W1 改按课查（与 R4-F2 同口径），**本次未做**。

## 新发现的待定夺（只记入底稿，不自动实施）

**白板线 v5check：**
1. 16 幕时长新超 120 秒（补朗读句后；最大 hd_g40_1 115.9→168.7 秒、hd_g03_1 116.2→161.7 秒）：白名单进 `dur_allow.json` / 删减拆分（会重生 R2-W1）/ 接受超限（改限值），等 Priya 定。
2. 两处先读词表尾孤 `'I'`（writing_alchemist_3 + 生成幕）：删或移位。
3. wbtextcheck.py 路径问题已由第 11 项修好（本波已决）。
4. spec 与手写幕文本分叉三处（g28“焦点先行思维”已删、g31_3/g35/g22 spec 另有例句行）：已按 spec 处理，仅备查。
5. R2-W1 改按课查（见上），本次未做。

**白板线场景：**
6. 拆节“第 N 节”按钮接线：机制随老 App 退役，现主文件无接线，三节只能独立播放。
7. 36-②“节末 3 秒预测题”：先例都不加，要加须新编题目。
8. 第 3 节 98.7 秒（合入后重探 96.6 秒）超 90 秒目标：接受或换 4 节切法（会劈开公式①）。
9. durations.json 待 `--scan` 刷新（三节新值 76.4/90.1/96.6 已探针实测；刷新被 Chromium 1254 未装上卡住，durcheck 默认启动仍会失败）。
10. 生成幕同缺陷未修（gen_spacetime_2 等）：须 `gen_scene.py` 支持 actorFitW。
11. fly out 飞机映射未定（`fly out → plane0/1/2` 是否登记）。
12. wo_rule eat 映射仍错：画吃帧或删键。
13. grammarcheck.py 与修前 wbtextcheck 同病（写死已删老 App）。
14. writing_alchemist_2（267.8 秒）/_3（298.6 秒）仍是长幕。
15. fp_economy_3（173.4 秒）/fp_iconicity_2（152.7 秒）/fp_one_king_4（162.1 秒）仍 >120 秒。
16. actorFitW 视觉代价（飞机 47% 高）：另一条路是重画小尺寸飞机帧。
17. Chromium 1254 仍未装上。
18. 80 幕缺帧接受长期无动作（第 6 项已定）。

**主文件线 A：**
19. CO-17 全站标题现为三种表述：是否统一全站 CO-17 标题口径、按哪一处为准。
20. 规范 §8 的 Stewart 确认待安排（第 16 项）。
21. ERRIDX 56 条是否永远只留在索引里、还是将来某波按新口径收进拼读律页。

**主文件线 B：**
22. `anchorcheck.py` 本体现已无任何现行 import 者（唯一调用者 appwrite 已删），是否连同清理。
23. `deadcode.py` 未进 runall，且其 `APP` 仍指已删老主文件（现跑即报错）：保留/修目标/退役。
24. `fnranges.js` 仍由 `deadcode.py` 使用，随第 23 项一并定。
25. `laws-prototype/imported/.../patch_grouping.py`（归档原型区，README 仍列为词源工具链）是否一并退役。
26. SOP.md L89 引擎回归句仍写 `git show HEAD:萌星小学英语_最终合并版.html`，是否改写。
27. 41 条 hint 是否最终统一改写为“先行/进阶”开头以消除兜底档（第六波遗留问题）。

## 执行中发现并已修好的阻塞（总协调人合入时）

- 拆节 × R4-F2 交互：两线分别正确，合起来多出 10 项 R4-F2（死键被拆节抄进第 2、3 节）。已删净，合入后 R4-F2 仍为 0；三节重打包 + 重探针通过。
- 探针发现的漏逗号事故（白板线 v5check 自查自修）：B-3/B-4 第二遍补句 4 行漏尾逗号，幕在浏览器里直接报 `TypeError` 跑不起来；`node --check` 与 v5check 均拦不住，只有打包探针发现。已补逗号重探针通过；教训：改幕必须跑打包探针。

## 未核实项

- 真机未核实：全部只在 headless Chromium 1248 + 截图/jsdom 上核实；真机视觉、语音听感、孩子实测均未做。
- 演员缩小后的观感（鸟 80%、飞机 47% 高）只在截图上看过。
- 8 幕补动作的人物帧实际画面；49 处虚线标注是否与徽标拥挤/小屏换行；CO-17 新长标题实际呈现；C-06/C-07 全标题芯片窄屏呈现。
- 12 句 OALD 朗读句的中文译文未经官方译文核对（第三波遗留）。
- Chromium 1254 未装上（下载断连），durcheck 默认启动仍会失败；`durations.json` 仍是旧值。
- 探针只测 `window.__dur` 计算值，未真机听语音。

## 工作底稿（`docs/work-2026-11-09/`）

- [wave7_summary.md](sandbox://workspace/mengxing-primary-english-app/docs/work-2026-11-09/wave7_summary.md)（本底稿）
- 白板 v5check：[wave7_v5check_memo.md](sandbox://workspace/mengxing-primary-english-app/docs/work-2026-11-09/wave7_v5check_memo.md)（数字表、各批细目、剩余清单、漏逗号事故）
- 白板场景：[wave7_wbscenes_main.md](sandbox://workspace/mengxing-primary-english-app/docs/work-2026-11-09/wave7_wbscenes_main.md)
- 主文件 A：[wave7_maina.md](sandbox://workspace/mengxing-primary-english-app/docs/work-2026-11-09/wave7_maina.md)
- 主文件 B：[wave7_mainb_retire.md](sandbox://workspace/mengxing-primary-english-app/docs/work-2026-11-09/wave7_mainb_retire.md)
