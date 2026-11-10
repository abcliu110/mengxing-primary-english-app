# 全部收尾总底稿——四线完成（`2652bff..HEAD`，check_all 28/28）

> **开工依据**：Priya 2026-11-10 23:09 说“使用多agent同时做，全部做完”——把此前所有能由 agent 做的剩余项一次做完，四线并行。**停止规则仍在**：本波实施中冒出的新发现只记入本底稿，不自动实施；不再开新波，除非 Priya 再点名。Stewart 确认、真机/孩子实测、CB/CG/YL/VB/TM 教师层、重建 445 精灵包、推翻第二波定 C——已定夺不做，一字未动。
>
> **已定夺（本波直接执行）**：白板空包崩溃选 A（只加 wb5.js 守卫兜底）；deadcode 覆盖口径不扩展；病例铁律（已发表文献 + 出处，绝对不编造）。

- 基线：`2652bff`（另一边 20:55 推的 8 条白板动画修复），check_all 27/27。
- 合并：四线共 10 提交（白板守卫 1 + PB 病例 2 + 运行时 3 + 底稿收尾 4）rebase + fast-forward 线性合入，无冲突；总协调人合入时补 2 提交（S-44/生成器冻结跟进修复 1 + 本底稿与总结补记 1）；无 force-push；推送后本地 HEAD = origin/master，工作区干净。
- 工作树：四路 linked worktree 均在 home 磁盘（`~/workspace/finish-*`），未用 /tmp；已清理删除。

## 合并验证（合入后主树重跑，总协调人独立重验）

- `check_all.py`：**28/28“结论：全部通过”**（28 行 PASS，0 FAIL；分母 27→28：新生成器 `gen_phonlaws.py --check` 接入为第 28 项门禁）。
- `gen_laws.py --check`：PASS；`gen_errors.py --check`：PASS（ERRIDX 549 条 / 覆盖 336 律）；`gen_phonlaws.py --check`：PASS（PHONLAWS 逐字节一致，223421 字符，52 条 quiz 104 题，生成标记在位）；`check_upstream.py`：五链全部无未登记漂移。
- `v5check.py` 全库：**FAIL 125 项 / 125 幕（全是 R2-W1；R4-F2 0）**，WARN 116，UNKNOWN 876，覆盖 878 幕，豁免 766——与第八波结束数字一致（守卫是运行时改动，不进 v5check 口径）。
- `durcheck.py`：不合格 **74**（第八波收尾 75 → gen p3_3 补白名单后 74；本次删 2 条孤儿不影响判定）。
- 改动幕 `node --check`：wb5.js 通过；6 幕分节头注通过；其余改动为 py/yaml/json。

## 按线结果

### 1. 运行时打通线（`finish/runtime`，3 提交）✅

- **现行生成链里根本没有产 `var PHONLAWS=` 的工具**（gen_laws 只管 LAWDATA 与 PN/AR/CJ 专区，gen_phonics 只产拼读 DATA/PHX_LETTERS/PHX_SOUNDS）。新增 `laws-prototype/tools/gen_phonlaws.py`（292 行，--check/--write），只替换 quiz 字段、其余 22 字段原样保留，非 quiz 差异即停；生成标记行已补。
- **PHONLAWS 运行时 quiz：52 行全空 → 104 题**（S 86 + SR 18，每条恰 2 题）；主文件 diff 仅 2 增 1 删（标记行 + 字面量替换），非 quiz 字段 0 处差异；文件 13,567,768 → 13,585,156 字符。
- **关键映射**：yaml 题形 `{q, answer, hint}` → 运行时形 `{q, a, h}`（渲染器只读 q.a/q.h，原样照搬会显示 undefined）；无 opts 的题走渲染器既有 reveal 分支，渲染器一字未改。
- **实测（jsdom，真加载整文件）**：S-01、S-03、SR-01 律页各 2 道、题干与 yaml 一致、点「想好了？看答案」后答案显示且与 yaml 一致；复习池新增 `LQ:S-*/SR-*` 104 道（kind 全为 reveal），单题可渲染可 reveal。
- **TA form_building 题缺积木块——无需修，缺口登记与现行代码不符**：`ta_exercises.json` 87 题中 18 道 form_building 全带 `build.blocks`；运行时 RV_TA 1:1；渲染分支齐全；jsdom 实测 TA-01 站页积木按钮 4 个、复习 build 卡 2 张、点积木后拼句行更新。CONTENT_GAP_SUMMARY §五.9 该条作废（见该文件补记）。
- **WA——按任务要求不扩运行时，现状合规**：WA-01~09 lawdata 全为 null，yaml quiz 各 2 题合计 18 题只活在 teaching.yaml/总表；运行时以 `aud: 教师/设计层`、`zone: parents` 存在于 SUPPDATA，律页走教师分支（无「检索练习」段），注入 quiz 也无意义。WA quiz 留在 yaml/总表，不动。

### 2. PB 病例深挖线（`finish/pbcases`，2 提交）✅

- **PB-11 已补 1 条（VEC-056）**：`people could see her strolling on the sky gracefully` → `in the sky`（汉语「上」刀口迁移：天空是三维空间、人在其中）。出处：李欣, 刘文静. 概念迁移视角下中国英语学习者介词误用及分析——以介词 at, on, in 为例[J]. 现代语言学, 2022, 10(6): 1228-1235. DOI: 10.12677/ML.2022.106164（§4.2.2 例(13)，CLEC 四个大学生子库 on 概念负迁移 78 例之一；全文 Scribd 转载 Hans 全文 + 题录页互证；Zhang & Luo 独立旁证 `on the sky` 不可接受）。ERRIDX **548→549 条、覆盖 335→336 律**（来源 lawdata 259 / yaml 136 / zone 154）。
- **PB-04（against/through）、PB-05/06/07（over 三条）留空**：全文读过谢世君 2026（450 例）、王倩 2026（184 例）、郑丽佳 2025（60 例）、吴媛媛/焦新平 2025（只报 in/on 混淆计数），均无 through/against/over 原文错句；over 线索（程焕福/李媛媛 2016 教学实验、马书红 2007 选词填空、Finkbeiner 1998 理论、Chang 2012 测验、NTNU 学位论文比率）均无学习者语料原文错句；词典/教学网站“常见错误”例按口径不用。后续线索（马书红 2007 全文、Chang 2012 全文、CLEC 原始语料检索）已记入总结。
- **郭佳佳 2023 已核实，原“未及独立复核”销项**：Hans 官方页题录（国外英语考试教学与研究, 2023, 5(3): 146-159. DOI: 10.12677/OETPR.2023.53015）+ 全文 PDF 表 8 原文逐字相符（PB-01 `on my opinion` 序号 5、PB-02 `people can be on car` 序号 2、PB-03 `go on bus` 序号 20；27 例总数相符）。PB-01/02/03 病例原文一字未动。
- **E-12 刊期页码仍未核实**：全文已读（sinoss.net PDF，80 名大学生、判断题第 3 题 29 人误判等数据与病例一致），但该版本是 Word 转 PDF、无刊头印记，未见期号页码；多方检索只命中同一全文。diagnosis 里「刊期页码待核」原样保留，E-12 一字未动。

### 3. 白板崩溃守卫线（`finish/wbguard`，1 提交，定夺 A）✅

- `docs/whiteboard/v5/wb5.js` +7/−2：rectOf 里 FI[key] 或 FI[a.ref] 缺失返回 null；drawActor 在 r 为 null 或 IMG[key] 缺失时跳过该演员继续播；anchorOf 同样回落（r 为 null 时 `[x, a.ground ?? 0]`，锚点名缺失时回落矩形底边中点）。主文件一字未动。
- **改前复现**：wa2 stub 的 writing_alchemist_2（DUR 91.9s），实播 8 秒时间卡在 1.0/91.9s，1 个 pageerror `Cannot read properties of undefined (reading 'bottom')`，播放中断。
- **改后探针**：同幕实播 12 秒走到 12.0/91.9s、0 errors；全程 seek 扫测 368 步 0 错；89.9s 起播 5 秒跨结尾循环回开头继续播，0 errors；tense_matrix_1、adj_order_1 两幕实包回归实播 + 扫测 0 errors，截图演员正常可见；node --check 通过；三幕打包 0 报错。
- **限度（未声称修好）**：守卫会掩盖缺帧信号——空 stub 幕静默播完、无任何报错，孩子侧看不到演员也不会有错误提示；缺帧本身一点没修。445 个空 stub 精灵包的重建仍是美术待办。

### 4. 底稿收尾线（`finish/backlog`，4 提交）✅

- **(a) app_check14 修（不是退役）**：修前启动即 `Page.goto: net::ERR_FILE_NOT_FOUND`（已复现）。整表并非无一可跑：① 每课 ≥5 句可静态核查（事实源 `lab/GRAMMAR_EXAMPLES.json`，40 课 3806 句）；②③④ 需已删老 App 的 `grammar_detail` 页 `#grexBox`，现主文件与全仓库 grep 均为 0 次。修法：去掉 Playwright 改静态检查；接受路径参数、缺省现主文件；②③④ 打印跳过说明、不静默。验证：缺省跑 40 课 3806 句、不合格 0、exit 0；假 App 反向自证报 2 BAD、exit 1；不存在的文件 exit 2。
- **(b) durations.json 558→556 条**：`v5/out/` 在工作树与主树均不存在（未入库的本地构建产物），第八波“out/ 比 durations.json 新：8”无法从产物复核；但跟进 `50e46e0` 已补扫 alchemist 场景，且此后场景内容零改动（`fb9a321` 只改 6 幕头注纯注释），无条目需 `--scan` 重扫。仅有的 stale 是 2 条孤儿 `vv_give_down_1`（22.2 秒）/`vv_give_down_2`（46.8 秒），场景已下线，`--scan` 扫不到，手工删除（diff 恰 2 行）；两值均未超门限，durcheck 不合格 74 不变。
- **(c) deadcode 不再依赖 /tmp/acorn**：acorn 8.19.0 `dist/acorn.js` 单文件 + LICENSE 进 `docs/whiteboard/src/vendor/`（MIT，头注写明来源与版本）；`fnranges.js` 改按“仓库内自带 → NODE_PATH/全局 → 旧 /tmp 兜底”顺序 require；`deadcode.py` 去掉 `NODE_PATH=/tmp/acorn/node_modules` 写死。验证（`env -i`、无 /tmp/acorn、无 NODE_PATH）：exit 0，顶层函数 3 个（基线变化：Anim 波新增 `wbRoughify`，第八波时为 2 个）、@keyframes 21 个全有引用；与旧 `/tmp` 原装 acorn 8.19.0 输出逐字节一致。
- **(d) S-44 是真规律缺 yaml，不是占位——已补**：Stewart 2026-11-03 已裁定立条（总表 `established`）；总表 zone 分仓内容完整（headline、两节 beats、statement、boundary、来源 Berko 1958）；运行时已有 RV_GENQ 40 题（逐词核实全是 S-44）；缺的只是 yaml 分仓与 lawdata。补法：`phonics.yaml` 新增 S-44（S 组第 44 条，order 44；例词取词库实有词形 boots/birds/branches/walked/called/decided，六读全覆盖、音标逐词核对；quiz 2 道 walked 读 /t/、birds 读 /z/，与 RV_GENQ 40 题零重词）；meta entry_count 52→53、S 组 43→44 条、quiz 52 条 104 题→53 条 106 题；`laws_master.json` 同步 yaml 分仓 + `yaml_file=phonics.yaml`。验证：`gen_laws.py --write` 主文件零改动、`--check` PASS；`check_upstream` 五链全过（链 a 428→429 条）；`gen_questions.py --check` PASS（RV_GENQ 40 题不变）。
- **(e) 第八波底稿 + 内容缺口总结核对**：#4/#6/#7/#10 跟进收尾已落地；#9→(a)、#10→(b)、#12→(c) 本次落地；#8 无动作；#1/#2/#5/#11/#13 纯记录/观察，只记不做；#3/#14 为方法注记。内容缺口总结剩余项只记不做（见新发现）。

## 合入时总协调做的决定（2 件）

1. **S-44 与 PHONLAWS 生成器冻结的合入冲突——修生成器断言，不加行**。收尾线(d) 给 S-44 补 yaml 后，`gen_phonlaws.py --check` 报错（原断言“S-44 yaml=null”失效）。定夺：改断言为新事实——S-44 有 yaml 且 quiz 恰 2 题（键形同 52 行）、phonics.yaml 与总表分仓一致、且 S-44 不进 EXPECTED_IDS；冻结仍为 52 行 104 题。S-44 的 2 道 quiz 只在 yaml/总表，不进运行时 PHONLAWS（字面量无 S-44 行；加行须生成器支持行新增 + roster 门禁复核，另立项）。提交 `1fea276`；`gen_phonlaws --check` PASS；check_all 28/28。
2. **CONTENT_GAP_SUMMARY.md §四.5 等三条追加 supersede 补记**（原文保留作历史记录）：§四.3（PHONLAWS 生成器缺失）已被 gen_phonlaws.py 取代；§四.5（S-44 不动）已被收尾线(d) 取代；§五.9（TA form_building 缺积木块）已被运行时线实测推翻。

## 合入后数字总表（主树实测）

| 指标 | 收尾前（2652bff） | 收尾后 | 变化 |
|---|---|---|---|
| check_all | 27/27 | **28/28** | +1（gen_phonlaws --check 入门禁） |
| v5check FAIL | 125（R2-W1 125 + R4-F2 0） | **125** | 0 |
| v5check WARN / UNKNOWN / 覆盖 | 116 / 876 / 878 | 116 / 876 / 878 | 0 |
| durcheck 不合格 | 74 | 74 | 0 |
| dur_allow 条目 | 24 | 24 | 0 |
| durations.json 条目 | 558 | 556 | −2（孤儿删除） |
| PHONLAWS 运行时 quiz | 0 题（52 行全空） | **104 题**（52 行全有） | +104 |
| ERRIDX | 548 条 / 覆盖 335 律 | **549 条 / 覆盖 336 律** | +1（PB-11） |
| yaml quiz 总数 | 209 题 | **211 题**（+ S-44 2 道） | +2 |
| 白板页签 | 234 | 234 | 0 |
| `src/*.py` | 37 | 37 | 0（+ vendor/acorn.js 1 个 js 文件） |

## 仍未完成项（本次未落地，原因）

1. **PB-04、PB-05/06/07（4 条）**：已发表中国学习者语料中核不到符合格式的原文错句，按铁律留空。后续线索：马书红 2007 全文、Chang 2012 全文、CLEC 原始语料检索。
2. **E-12 刊期页码**：全文已读但无刊头印记，多方检索只命中同一全文；diagnosis 里「刊期页码待核」原样保留。
3. **S-44 的 2 道 quiz 不进运行时 PHONLAWS**：字面量无 S-44 行；加行须生成器支持行新增 + roster 门禁复核，另立项（见合入决定 1）。
4. **其余 16 个 app_check*.py 脚本与修前 check14 同病**（本次新发现，见下）：均把已删老 App 写死为 live 的 `APP` 路径；runall 的 App 回归抽样整段是断的（17 处调用中 16 处启动即报错）。每个脚本都须先查后定修/退，建议单独立项，本次未擅自批量改。

## 新发现（只记入底稿，不自动实施）

- **其余 16 个 app_check*.py 脚本同病**（`app_check.py/2/3/4/5/6/7/8/9/10/11/12/13/15/parts/vocab_add`）：均把已删老 App 写死为 live 的 `APP` 路径；runall 共 17 处调用，修后仍有 16 处启动即报错（快速档 13 处 + `--full` 3 处），以 `app_check8.py` 实测证实（同款 `ERR_FILE_NOT_FOUND`，exit 1）。runall 的 App 回归抽样整段是断的，不止 check14 一步。
- **wb5.js 守卫的限度**：空 stub 幕静默播完、无任何报错，缺帧信号彻底隐身；建议后续在守卫处或验收侧保留可统计的缺帧信号（如计数/日志），否则 445 包的缺失会在探针里彻底隐身。
- **内容缺口总结剩余项（只记不做）**：NEW/P 组 0 练习（规格未提）；OALD 12 句中文译文未对照官方译文核对（第三波遗留）；郭佳佳 2023 本次已核实销项（见 PB 线）。

## 未核实项

- 真机未核实：全部只在 headless Chromium（1248/1254）+ 截图/jsdom 上核实；真机视觉、语音听感、孩子实测均未做。
- 演员缩小后的观感（鸟 80%、飞机 47% 高）只在截图上看过；守卫改后“缺角”形态只在截图上看过（wa2 @10s 只有板书文字与字幕、无演员）。
- 探针只测 `window.__dur` 计算值与播放错误，未真机听语音。
- 12 句 OALD 朗读句的中文译文未经官方译文核对（第三波遗留）。
- Chromium 1254 是第八波新装，未在全新 checkout 上复核安装步骤。

## 工作底稿

- [finish_all_summary.md](sandbox://workspace/mengxing-primary-english-app/docs/work-2026-11-09/finish_all_summary.md)（本底稿）
- 决策与分工见总协调人任务书；各线工作底稿在各线工作树（已清理），关键数字已汇总于上。
