# 第八波总底稿——24/26 落地，2 件待再定夺（`5887fad..HEAD`，check_all 27/27）

> **开工依据与停止规则（首页置顶）：第七波停止规则是“新发现只记底稿、不自动实施，除非 Priya 再点名”。Priya 2026-11-10 14:42 问 26 件是什么，Muse 列出后她 14:45 点“26 件也你来定”，即全部 26 件点名 + 定夺权委托——此授权仅满足停止规则对这 26 件的例外，不一般解除停止规则。** 本波实施中产生的新发现只记入本底稿，不自动实施；不再开第九波，除非 Priya 再点名。“完”的标准仍是 check_all 绿 + 已知儿童可见内容错误清零；之后下一步是真机/孩子实测。

- 基线：`5887fad`（第七波 + eat 删键 + hold 词页同步），check_all 27/27。
- 合并：四线 + 尾批共 16 提交（主文件 B 5 + 主文件 A 2 + 白板 v5check 3 + 白板场景首批 4 + 尾批 2）rebase + fast-forward 线性合入，无冲突；无 force-push；推送后本地 HEAD = origin/master，工作区干净。
- 工作树：四路 linked worktree 均在 home 磁盘（`~/workspace/wave8-*`），未用 /tmp；已清理删除。

## 合并验证（合入后主树重跑）

- `check_all.py`：**27/27“结论：全部通过”**（含 `check_badge_erridx` 830 行、`check_lawdata_roster`、`jscheck node --check` 门禁）。
- `gen_laws.py --check`：PASS，全部逐字节一致。
- `check_upstream.py`：五链全部无未登记漂移。
- `v5check.py` 全库：**FAIL 125 项 / 125 幕（全是 R2-W1；R4-F2 0）**，WARN 116，UNKNOWN 878，豁免跳过 766，覆盖 878 幕。
- `jscheck.py laws-prototype/mengxing-prototype-v1.html`：node --check OK（41 inline + 0 modules）。
- `wbtextcheck.py`：881 幕，不合格 0（拆节多 6 幕）。
- `grammarcheck.py`（第 13 项修后）：例句库 3806 句，不合格 0。
- `durcheck.py`：不合格 **77**（80→77）；`out/` 比 `durations.json` 新：8（拆节场景，见新发现第 10 项）。
- 拆节 8 幕主树重打包 + 探针：_2 91.9 / 57.0 / 128.4 秒、_3 88.9 / 70.6 / 149.3 秒、gen twins 68.2 / 149.3 秒，0 报错。
- 改动幕 `node --check`：15 幕全部通过。

## 按项结果（26 项定夺；24 项落地，2 项待再定夺）

**白板线 v5check（1–5）：**
1. 16 幕新超 120 秒进白名单 ✅ — `dur_allow.json` 1→17 条（后与第 15 项合计 20 条），逐条注明原因（第八波补朗读句推过 120 秒门限）+ 基线→现值 + 日期 2026-11-10，沿用原文件一空格缩进排版。**纠正一个前提**：grep 证实该文件的消费方是 `durcheck.py`（前缀匹配），不是 `v5check.py`（后者完全不读它）。验证：lab 库实测 `durcheck` 仍为不合格 80（该库是旧基线）；第七波实测时长库模拟：84 幕超限中 12 幕由 ❌ 转白名单，其余 4 幕（hd_g06_1/hd_g29_1/hd_g16_1/hd_g12_1）在该库中为 SKIP 超时无数值，待第 9 项刷新后生效（已生效，见第 15 项：durcheck 80→77）。
2. 两处先读词表尾孤 `'I'` 移位 ✅ — `'Linda is a tall…'` 句词表删尾 `'I'`，移到第 54 行 `'I look forward to it!'` 句词表（改后为 `…look forward to I`）；手写幕 `writing_alchemist_3.js` 直改 2 行；生成幕 `gen_stock_writing_alchemist_3.js` 走 spec 层（`model/specs/stock_writing_alchemist_3.yaml` 改 2 处）重生成，未手改生成文件；重生成前空跑验证无漂移，重生成后 diff 恰为 2 行。验证：`node --check` 两幕通过；v5check 该两幕 FAIL 0 / WARN 0，全库 R2-P1 2→0；打包探针两幕 `__dur=298.6s`、0 报错；打包产物 grep：`'big bright eyes I'` 0 处、`'look forward to I'` 各 1 处。生成幕不在另一线第 10 项的重生成清单中，无冲突。
3. wbtextcheck 路径问题 ✅（只记一笔）— 第七波第 11 项已修好，无动作。
4. spec 与手写幕文本分叉三处 ✅（只记一笔）— 已按 spec 处理，无动作。
5. R2-W1 改按课查 ✅ — `v5check.py` 的 R2-W1 收集改按 `family_key`（与 R4-F2 同口径），复用现成的 `family_sentences()`：auto 幕已读语料取同课各节朗读句 token 并集 + 本幕先读词；oral/poly 不拆节，仍按单幕查。并集 ⊇ 本幕语料，只清假阳性、不新增 FAIL（已用基线 JSON 逐项比对证实：新增 0 项）。v5check 全库 **FAIL 138→125（净减 13），WARN 119 不变**。**定夺预期“3 项清零”为少计**：除 writing_alchemist_1/_p2_1/_p3_1 三幕外，aux_transformer 族与 five_patterns 族另有 10 项净清零；已逐词核实，每词均在同课另一手写分节的朗读句里读到，是同类跨节产物，不是误并；实现严格按定夺执行，未改口径。

**白板线场景（6–11、13–18；12 号已决）：**
6. 拆节“第 N 节”按钮接线 ❌ **未实施，待再定夺** — 先查清挂载方式的结果是定夺的前提不存在：现主文件（`19fa921` 复核，计数与 `5887fad` 一致）**一幕 v5 白板都没挂载**——`writing_alchemist` 0 次、`wb5html-` 0、`WB5_EMBED` / `wb5StageHtml` / `wb5Frame` / `wb5-parts` 全部 0；也没有写作炼金宿主页面（`写作炼金` / `炼金炉` / `writeIdx` / `高分作文` 全部 0，51 个 view 无一相关；`作文` 的 249 处全是数据文本）。老分节机制 `patch_wb5_parts.py` 已删，其回归脚本 `app_check_parts.py` 仍指着已删老 App 文件；`v5/out/` 本地是空的。第七波底稿 §26 与 §120 早已记明：头注“第 N 节按钮”指已随老 App 退役的 `patch_wb5_parts.py` 机制，三节目前只能经 `build.mjs` 独立播放，接线进现主文件是另立项。要做成“接线”，须先做：打包三节 + 嵌入主文件 + 装 `WB5_EMBED` 运行时 + 新建宿主页面/入口 + 重造分节切换机制——是一个新功能，不是“最小接线”，超出“不扩大范围”的授权，故未擅自做。建议：先立项把 `writing_alchemist` 挂进主文件，再接线；或改定夺为独立播放页内跳转。
7. 36-②“节末 3 秒预测题” ✅（只记一笔）— 接受现状，不加（全部先例拆分都不加，加须新编题目）。
8. 第 3 节 96.6 秒超 90 秒目标 ✅（只记一笔）— 接受，不换 4 节切法（90 秒是目标、120 秒是门限；4 节切法第七波已试并否决，会劈开公式①）。
9. durations.json 待 `--scan` 刷新 ✅ — 第 17 项装好 1254 后直接用 `durcheck.py --scan` 默认启动（不再需要 1248 绕法）。扫 5 幕：三节 `76.4 / 90.1 / 96.6`（与定夺数字逐字一致；第七波底稿的 76.7/90.7/98.7 未复现，以本次扫描为准）；`writing_alchemist_3` 298.6 未变（第 2 项移 'I' 不改时长）；`gen_stock_writing_alchemist_3` 同值 298.6 新入。条目 549→552；`durcheck` 判定不合格 80→80（_1 由 252.2 降至 76.4 减一失败，gen_stock 新入加一失败，净 0）。
10. 生成幕同缺陷未修 ✅ — `gen_scene.py` 支持 `actorFitW`：items 模式支持 spec 字段（插入或覆盖 Build 调用，auto/oral/poly 三引擎；四条路径单测通过）。此前生成器本就会继承模板值（5 幕模板早有该值，只是生成幕生成于第七波之前才缺失）；spec 字段让它显式、可复现，不依赖模板状态。5 个 spec 加值：`spacetime_2: 440`（飞机），`letters_2` / `phonology_3` / `sentence_4` / `stock_five_patterns_p2_1: 500`（鸟）。5 幕重生成，diff 各仅 1 行。验证：node --check 5/5；打包 5/5；时长探针 0 报错（173.0 / 145.7 / 192.1 / 156.0 / 81.0 秒）；几何探针飞机 1834、鸟 1878 / 1878 / 1853，全部 ≤1880 入窗；截图目视确认整机、整鸟完整。附注：`gen_sentence_4` 的鸟键已被第七波 ACTS 裁剪去掉（ACTS 只剩 `gives`），本次按定夺加的 500 是 dormant、无视觉变化。
11. fly out 飞机映射 ✅ — `vv_fly_out_1/2` 登记 `ACTS = {"fly out": ["plane0", "plane1", "plane2"]}`，头注“ACTS 待配”改为已登记说明；`units.json` 两处 acts 同步（首次用紧凑写法破坏了 `gen_wb13_units.py` 的 canonical indent=1 断言，已改回标准格式并通过）。验证：node --check 2/2；v5check --only FAIL 0 / WARN 0 / UNKNOWN 0（修前各 WARN 1 + UNKNOWN 1）；打包 2/2；时长 22.1 / 33.0 秒与第七波一致（加 ACTS 不改时间轴）；几何探针 1873 / 1873 入窗，截图整机完整。
13. grammarcheck.py 同病 ✅（修，不是退役）— 先查后定：修前启动即 `FileNotFoundError`（写死已删老 App），与修前 wbtextcheck 同病。核实：`GRAMMAR_DB` / `GRAMMAR_EX_JSON` / `INTERROGATIVE_RADAR_DB` / `STRESS_AND_SCHWA_DB` 在现主文件均为 0，全仓库也无 `GRAMMAR_DB` 与雷达/重音表；但例句库现行事实源存在——`lab/GRAMMAR_EXAMPLES.json`（40 课 3806 句，34-B 建库、35-B2 改 5 删 3）。故整表并非无一可跑，不合退役条件。修法（与 wbtextcheck 同法）：接受路径参数、缺省现主文件；① 积木与 ② 的 GRAMMAR_DB 腿、雷达/重音腿无事实源→打印跳过说明、不静默；② 例句库腿可跑（优先 APP 内 `GRAMMAR_EX_JSON`，否则用 lab 文件并注明来源）；BLACK 名单与检查逻辑一字未动。验证：缺省跑例句库 3806 句、不合格 0、exit 0；/tmp 假 App 反向自证：① 两子项（系动词后 O 应为 C、非法角色 X）+ 例句库腿（clean river）+ 雷达腿（重音铁律）各报出，共 4 BAD、exit 1；不存在的文件 exit 2。
14. writing_alchemist_2（267.8 秒）/_3（298.6 秒）拆节 ⚠️ **拆完、“三节各 ≤120 秒”未达成，待再定夺** — `split_auto.py --max 100`（只在 `'n'` 前下刀）。用 `--max 100` 而非 90：`--max 90` 会把 `_3` 切成 4 节且第 3 节估计 135 秒、另带一个 11 秒 stub 节；`--max 100` 得三节；`_2` 两种 `--max` 下刀相同。`_2` 53 条 = 24/16/13、`_3` 50 条 = 21/14/15，拼回与原逐条相等（R1 零丢失；总协调人独立复核：三节 ITEMS 拼回与拆前逐条完全一致）；`'I'` 完好在 `_3` 第 3 节 `I look forward to it!` 句词表（`look forward to I` 1 处，`big bright eyes I` 0 处）；未加节末预测题；`units.json` 未动（`gen_wb13_units --check-only` 234 页签通过）；打包 8/8（build.mjs，WB_FONTS 实包），`node --check` 8/8；打包产物 grep 关键朗读句逐字命中。生成幕 twin（按 five_patterns 先例走 spec+生成器，非手改 GENERATED 文件）：新建 `stock_writing_alchemist_p2_3/p3_3.yaml`（模板=新手写节，items=该节原样，facts 按节裁剪），`gen_scene.py` 生成 `gen_stock_writing_alchemist_p2_3`（ACTS={}，生成器按节裁剪掉 4 个死键）/`p3_3`（ITEMS 与手写节逐条相等）；全长 twin 未动。验证：`check_all.py` 27/27（拆前拆后一致）；`v5check.py` 全库 FAIL 125→125（全是 R2-W1 125 项，**R4-F2 0→0**）；覆盖 872→878 幕；WARN 115→116（新增 gen p2_3 ACTS 空，诚实信号）；UNKNOWN 872→878。按课查下抄进新节的键均在同课朗读句里，**无死键可删**——任务的条件句未触发，手写节 ACTS 保持 split_auto 原样（与 five_patterns 手写节先例一致）。**超限是结构性的**：复述句块（`_3` 11 句约 110 秒、`_2` 8 句约 85 秒）内没有任何 `'n'` 可下刀，含整块复述的最小末节就是 149.3 / 128.4 秒；`_3` 换 4 节切法也无解（估计 [72, 81, 135, 11]，含复述的节仍 ~135–141 秒）。待定夺的出路：(a) 两节进白名单；(b) `_2` 改 4 节手切（24/40/51，约 91.9/57.0/~112/~24，~112 未实测）——但 `_3` 仍无解；(c) 放宽切法允许在复述 `'s'` 前下刀（须新决策）；(d) 删复述句（内容决定，破 R1）。主树重探针复核：_2 91.9 / 57.0 / **128.4** 秒、_3 88.9 / 70.6 / **149.3** 秒、gen twins 68.2 / 149.3 秒，8/8 0 报错，与工作区数字逐字一致。
15. fp 三幕仍 >120 秒 ✅ — 白名单进 `dur_allow.json`（与第 1 项同批同格式）：`fp_economy_3` / `fp_iconicity_2` / `fp_one_king_4`，每条注明原因（单条模式演示，一幕一模式弧线，无已验证的干净切法，拆会断模式叙事）与日期 2026-11-10，附 durations.json 现值 169.4/149.6/163.3 秒（定夺所给第七波探针值 173.4/152.7/162.1 秒一并注明）。diff 仅 3 行新增，JSON 校验通过。验证（`durcheck.py`，实际消费方）：三幕由 ❌ 转白名单，`durcheck 不合格 80→77`；`check_all.py` 27/27。
16. actorFitW 视觉代价 ✅（只记一笔）— 接受现状，不重画帧（重画帧是美术方工作，本波无美术能力；几何修后已验整机/整鸟入窗，缩小的整机教得对，裁掉的机头教得错）；重画小尺寸飞机帧记入美术待办，不在本波。
17. Chromium 1254 ✅ — 重试一次即装上：`pip install playwright`（1.65.0）+ `python3 -m playwright install chromium`，full 158.0.8127.18 与 headless shell 均落盘 `~/.cache/ms-playwright/chromium-1254`；默认启动实测可用。`durcheck` 默认启动失败不再是待定夺；探针脚本仍用 1248 `executable_path`（可用，未改）。
18. 80 幕缺帧接受长期无动作 ✅（只记一笔）— 第七波第 6 项已定，无动作。

**主文件线 A（19–21；20 号为 Priya 专属）：**
19. CO-17 全站标题三种表述 ✅ — 按行类统一，不追求四串全同。实施前全库 grep 核实（四串现状与决策一致）：`data-law="CO-17"` 全库仅 1 行（#v-grammar2，L5732），标题已是 ROSTER[0] 原文“英语把「做事」交给空心动词：动词管语法，名词装事情；get 一个词收成五个构造”，无需改动；他处无 data-law 行。ROSTER[0] 原文另有 4 处是数据内嵌（L2539 病例记录 2 条 + ROSTER 条目 1 条、L16120 索引表 1 条），共 5 次出现，均非标题行，不动。`data-go="u-co17"` 深研行共 3 行：首页旗舰行 L846 已是短标题“空心动词 + get 的五个构造”；v-vocab 行 L1539 是长变体“空心动词：动词管语法，名词装事情；get 一个词收成五个构造”；#v-grammar2 行 L5733 是“空心动词 + get 五构造（在词汇解码区做深）”。第 4 处 `data-go="u-co17"` 是首页痛点卡（L835“先学 CO-17 空心动词”），非标题行，不动。改动（唯一一处，带唯一性断言的 python 手术替换）：L1539 v-vocab 深研行标题 → “空心动词 + get 的五个构造”；因该长标题是 ROSTER[0] 的子串，未用裸串替换，避免误伤 5 处 ROSTER 原文。grep 计数前后：“空心动词 + get 的五个构造” 1 次 → 2 次（L846、L1539）；“空心动词 + get 五构造（在词汇解码区做深）” 1 次 → 1 次（L5733 一字未动）；`data-law="CO-17"` 1 行不变；ROSTER[0] 原文 5 次不变。
20. 规范 §8 的 Stewart 确认 ⏸ **待 Priya 安排，Muse 不代确认，无动作** — 本波唯一不能代决的件，含本次追加的第 21 项闭合句。
21. ERRIDX 56 条是否永远只留索引里 ✅ — 定：永远只留索引里（按现有口径）。仅在规范 `laws-prototype/DATA_SOURCE_SPEC.md` §1 ERRIDX 行（L19）第七波第 13 项口径句后追加一句闭合（锚点断言唯一）：“（2026-11-10 第八波第 21 项：ERRIDX 56 条永远只留索引里，不收进律页——与第七波第 13 项同口径，索引层病例登记与律页 cases 的口径分叉是设计使然，口径闭合；本句按规范 §8 待 Stewart 确认。）”§8 未动；不代 Stewart 确认。

**主文件线 B（22–27）：**
22. `anchorcheck.py` 本体 ✅ — 删文件（180 行）。理由：唯一调用者 appwrite.py 已删；jscheck 第六波已跳过调用；RETIRED 标记已立。`anchorcheck.RETIRED.md` 同步改一句（原“本体保留、未删除”改为第六波时保留、第八波第 22 项已删本体，git 历史可找回）。删前核实：`*.py` 活 `import anchorcheck` / 调用 0 处；主文件内 `anchorcheck` 0 处；`jscheck.py` 仅剩“已废止”注释/文档字符串。删后全库 grep：仅剩 RETIRED.md 与文档历史注记，无导入/调用残留。
23. `deadcode.py` ✅ — 改目标重跑，不删。`APP` 由已删 `萌星小学英语_最终合并版.html` 改指 `laws-prototype/mengxing-prototype-v1.html`（一行），docstring 补记改指与 runall 状态。试跑：`python3 deadcode.py` 退出 0，3.8 秒，输出“顶层函数 2 个；零引用 0 个（0 轮），约 0 字符；@keyframes 21 个；无引用或不生效 0 个”。交叉核实：直接跑 `fnranges.js`（stderr 空、0 解析报错）确认恰为 2 个顶层函数 `mxAdultOn`（文件内 7 处）、`applyAdultZones`（4 处），均真实被引用；Python 复核 `@keyframes` 21 个、21 个唯一名，全有引用。定夺：跑通且报告可用 → **记入 `runall.py`，仅提示档（WARN）**：Q 插入 `('死代码 deadcode（第八波第 23 项，仅提示）', …)`，WARN 集合同名。只报不判的理由：工具自带说明称动态拼名调用可能误报，且函数覆盖只含顶层声明。`py_compile` 与 WARN/Q 同名核对通过。
24. `fnranges.js` ✅ — 随第 23 项保留（空提交；deadcode 留用，它是 deadcode 的 acorn 依赖；试跑已验：新主文件上 0 解析报错、2 个顶层函数；第七波注释已改过，本项无文件改动）。
25. `imported/patch_grouping.py` ✅ — 退役删除（95 行）+ `imported/README.md` 改过去时（“patch_grouping.py（待核面板分组补丁，一次性，已执行，2026-11-10 第八波第 25 项退役删除）”，`refresh_et.py` 的“工具（现行）”表述不动）。删前核实：全库现行调用 0——同目录 `build.py` / `build_integration.py` / `refresh_et.py` 无引用，主文件内 0 处；仅 README 与第七波底稿历史注记提及。删后 grep 残留仅上述历史注记 + README 新注记。
26. SOP.md L89 引擎回归句 ✅ — 只改一行：`git show HEAD:萌星小学英语_最终合并版.html > 旧.html` 改为 `git show HEAD:laws-prototype/mengxing-prototype-v1.html > 旧.html`。核实：SOP.md 内“最终合并版”残留 0 处。
27. 41 条 hint 是否统一改写 ✅（只记一笔）— 不改，维持三档口径（先行 108 / 进阶 4 / 顺序见页内 41（兜底档））；41 条 hint 一字不动，记为已闭合。

## 合入后数字总表（主树实测）

| 指标 | 第七波结束（5887fad） | 第八波合入后 | 变化 |
|---|---|---|---|
| check_all | 27/27 | 27/27 | 0 |
| v5check FAIL | 138（R2-W1 138 + R4-F2 0） | **125（R2-W1 125 + R4-F2 0）** | −13 |
| v5check WARN | 119 | 116 | −3 |
| v5check UNKNOWN | 872 | 878 | +6（拆节多 6 幕） |
| v5check 覆盖 | 872 幕 | 878 幕 | +6 |
| 豁免跳过 | 766 | 766 | 0 |
| durcheck 不合格 | 80 | 77 | −3（fp 三幕白名单） |
| dur_allow 条目 | 1 | 20 | +19 |
| durations.json 条目 | 549 | 552 | +3 |
| 白板页签 | 234 | 234 | 0 |
| `src/*.py` | 38 | 37 | −1（anchorcheck.py） |
| wbtextcheck 幕数 | 875 | 881 | +6 |

## 待再定夺（2 件，本波未落地）

1. **第 6 项——拆节“第 N 节”按钮接线**：主文件根本没挂载任何 v5 白板幕，定夺的前提不存在；接线须先做打包三节 + 嵌入主文件 + 装 `WB5_EMBED` 运行时 + 新建宿主页面/入口 + 重造分节切换机制，是一个新功能。出路（二选一）：(a) 先立项把 `writing_alchemist` 挂进主文件，再接线；(b) 改定夺为独立播放页内跳转。第七波底稿 §26/§120 早已记明该机制随老 App 退役。
2. **第 14 项——alchemist_2/_3 第 3 节超 120 秒门限**：拆节已落地（R1 零丢失、探针 0 报错），但 `_2` 第 3 节 128.4 秒、`_3` 第 3 节 149.3 秒过门限；复述句块内无 `'n'` 可下刀，4 节切法对 `_3` 也无解。出路（四选一）：(a) 两节进白名单；(b) `_2` 改 4 节手切（~112 秒未实测，`_3` 仍无解）；(c) 放宽切法允许在复述 `'s'` 前下刀（须新决策）；(d) 删复述句（内容决定，破 R1）。

## 新发现（只记入底稿，不自动实施）

**白板线 v5check：**
1. 第 5 项定夺预期“3 项清零”为少计，实际净减 13（已逐词核实，均在同课他节读到）。
2. `dur_allow.json` 的消费方是 `durcheck.py`（前缀匹配），不是 `v5check.py`——底稿前提纠正。
3. linked worktree 缺打包依赖（`v5/node_modules`（esbuild）、精灵包 `sprites/wa3.js`）：临时从主树只读 symlink，探针后删除；后续各线打包探针沿用此法。

**白板线场景：**
4. 第 6 项受阻（见上）。
5. 第 14 项第 3 节超限（见上）；另：`split_auto` 估计对复述尾系统性低估约 17–20%（估计 110→实测 128.4、124→149.3；`_1` 第 3 节当年也是 83→96.6），探针才是门。
6. 全长 twin `gen_stock_writing_alchemist_3.js`（298.6 秒）按 five_patterns 先例保留未动，但它在 durations.json 里，rescan 后仍会报 ❌ 299 秒：白名单 / 删 durations 条目 / 删文件，三选一。`_2` 的 twin `gen_stock_writing_alchemist_2.js` 同样全长未动（不在 durations.json，未被扫描）。
7. `gen_stock_vv_take_off_2` 同缺陷未修：活 `*` 键配 plane0/1/2，静态右缘 2436（超 516px）；模板 `vv_take_off_2.js` 已有 actorFitW 440；第七波 §8 点过名，但第八波定夺第 10 项的枚举漏了它。修法 = spec 加 `actorFitW: 440` + 重生成 + 探针。
8. `hd_sum_pronouns_3` / `gen_stock_hd_sum_pronouns_3` 已核实无缺陷：`*` 键活，但只含 `bird_up`（525×520），静态右缘 1880，不超——不用修。
9. `app_check14.py` 与修前 grammarcheck 同病：第 5 行仍指已删老 App，runall 的语法例句库一步同样会启动即报错；不在本波事项内。
10. `durations.json` 对拆节场景已过期（仍记 `_2` 267.8 / `_3` 298.6 / twin 298.6），durcheck 报 `out/` 比 durations.json 新：8——按 `_1` 先例未动 durations.json，刷新待后续。
11. gen p2_3 探针 68.2 秒，比 ITEMS 完全相同的手写 p2_3（70.6 秒）短 2.4 秒，唯一差别是 ACTS 空 vs 4 键，疑似动作演出开销；仅作观察。

**主文件线 B：**
12. `deadcode.py` 试跑前须先装 acorn：本机 `/tmp/acorn` 已不存在（`fnranges.js` 注释写明的依赖路径），为试跑按工具自带说明执行了 `npm install acorn`（`/tmp/acorn`，acorn 8.19.0，约 100KB，未进仓库）。`/tmp` 是易失的，换机/重启后重跑 `deadcode.py` 仍需先装 acorn——工具注释里已有该说明，未改代码。
13. `deadcode.py` 的 JS 覆盖在新主文件上近乎空洞：全文件直接执行脚本里仅 2 个顶层 `function` 声明，其余代码都在闭包/对象内，工具扫不到；真正起作用的检查是 @keyframes（21 个）。报告本身可用、跑通无噪音，故按定夺留用并入 runall 仅提示档；是否要扩展覆盖口径（如对象方法/箭头函数）是超出本波范围的新议题，未动。
14. 推送时注意：不带 `GIT_SSH_COMMAND='ssh -F /home/hatch/.ssh/config'` 的 `git ls-remote` 会报 host key verification failed；带该变量的 push/fetch 正常。

## 执行中发现并已修好的阻塞（合入时）

- 第 11 项 units.json 同步：首次紧凑写法破坏 `gen_wb13_units.py` canonical indent=1 断言，已改回标准格式并通过（234 页签）。
- 拆节 × R4-F2 交互（第七波教训复核）：按课查下抄进新节的键均在同课朗读句里，无死键可删，条件句未触发，手写节 ACTS 保持 split_auto 原样。
- 合入方式教训：`git rebase master <分支>` 在主树会因分支已签出在另一 worktree 而拒绝（`fatal: 'wave8-mainb' is already used by worktree`）；改在各线工作区内 `git rebase origin/master` 后再 fast-forward 合入，无冲突。另：rebase 保留空提交须加 `--empty=keep`（第 24 项空提交）。

## 未核实项

- 真机未核实：全部只在 headless Chromium（1248 探针 / 1254 已装）+ 截图/jsdom 上核实；真机视觉、语音听感、孩子实测均未做。
- 演员缩小后的观感（鸟 80%、飞机 47% 高）只在截图上看过。
- 探针只测 `window.__dur` 计算值，未真机听语音。
- 12 句 OALD 朗读句的中文译文未经官方译文核对（第三波遗留）。
- 探针脚本仍用 1248 `executable_path`（可用，未改）；durcheck 默认启动现已可用（1254 已装）。
- Chromium 1254 是本次新装（`~/.cache/ms-playwright/chromium-1254`），未在全新 checkout 上复核安装步骤。
