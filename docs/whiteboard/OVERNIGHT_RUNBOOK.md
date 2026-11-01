# 通宵自主运行手册（用户 2026-11-01 02:09 JST 授权：不询问、直接做完、每完成一个任务提交 GitHub）

## 纪律
- 每项任务完成即 `git add -A && git commit` 一次，提交信息以任务号开头（如 `T2 语法入模…`）。**推送攒批**（用户 02:16 指示不要再被确认打扰）：push-files 属外部写操作，系统确认卡只在后台等待、不阻塞工作——本地提交逐项照常，推送由接班运行每轮最多一次、合并多项任务一次推完；未推成功的记一笔，下轮补推。
- 开工前在本表把状态改 `进行中（执行者+时间）` 防撞车；完成改 `已完成（commit 短号）`。
- 数据标准执行 DATA_OPTIMIZATION_SOP；架构执行 REWRITE_TECH_PLAN；讲法基线 = 方法研究排行榜 + 15 条设计规则。
- 更新包拍板门今晚按用户指令豁免：审查裁定即执行依据，变更全部留 diff 供用户事后抽查。
- **质量优先（用户 02:10 追加：数据质量与准确性越高越好，优先于进度）**：①每条修正文入模前逐条回查一级来源（词源 Etymonline/OED、语法 CGEL/Swan、释义牛津/剑桥），不凭审查报告转抄；②每个更新包提交前过一道独立复核（复核者对照来源抽查：错误级 100%、其余 ≥30%），复核不过不提交；③查无实据或来源冲突的条目标「存疑」隔离，不许猜测填充；④宁可少交一项，不交一条没把握的数据。

## 任务队列
| 号 | 任务 | 状态 |
|---|---|---|
| T0 | 既有成果入库（方案文档+模型+boundedness 家族+fb39_lib 改名） | 已完成（77bea10，2026-11-01 接班运行核对提交内容与任务范围一致后补标） |
| T1 | 框架库审查（FRAME_SEMANTICS 等 10 库） | 已完成（报告 report_frameworks.md：概念层 3 成立/6 基本成立/1 过度简化；硬伤 T05 伪构词律、T07 light 假词源） |
| T2 语法 G01–G40 入模：model/grammar.yaml + updates/grammar_update.md | 已完成（本体复核通过；update.md 已重建 1025 行、40 点逐字全核，关闭） |
| T3 词汇修正入模（12 错误+分型修正+全称降格，含 MH↔VOCAB 联动）+ updates/vocab_update.md | 已完成（46 条，复核通过，低优先 5 项已修，关闭；注：T3.review.md 存盘文本 §四中部截断，五项修订已由修订者对照抽取 JSON 独立坐实） |
| T4 表达修正（DAILY 问题条目修正版）+ 收尾句生成机制 + WRITING 去虚假承诺 | 已完成（44+1 条，复核通过，残留已修，关闭） |
| T5 白板台词修正集（45 条问题项更正文，hd_g03 对齐）+ updates/scenes_update.md | 已完成（46 条，复核通过，M-1 已修换 twinkle 例并出勘误，关闭） |
| T6 框架库修正入模（ROYAL_TRUMPS 降格+T05 真框架+T09 图式+ZH_EN 维度5 对齐等）| 已完成（62 条，复核回改 7 项全清并检索验证，关闭） |
| T7 领域纲领 v1：model/domains.yaml（每领域 coreView/unifies/conflicts） | 已完成（13 条纲领，已入库） |
| T8 阐述设计基线（研究 15 条规则）并入 REWRITE_TECH_PLAN §3.3 附则 | 已完成（447939c，接班运行核对 §3.3 附则已在位后补标；所谓“待提交”已过时） |
| T9 主 HTML 旧库外科补丁（按 T2–T6 更新包逐项修正旧库原文 + 复验） | 已完成（211 项应用/45 项跳过，四层复验全过，主文件已入库） |
| T10 原理 ①②④⑤⑥ 建模：按 THEORY_AUDIT 修复清单 + T5 修正集 | 已完成（五文件：phonology/letters/sentence/spacetime/viewpoint，validate 全过，关闭） |
| T11 五大家族场景生成（spec→gen→build→insightcheck 0 失败）+ 独立逻辑审查 | 已完成关闭：24 幕全部由模型生成并通过独立审查（① 经一轮返修）。接班运行注：T11.done §七留有两项未决——19 幕 autoBuild 的 insightcheck 字面门禁待 V1 模板层决策（接受等效校验，或立项接 insight 数据后重验），旗舰幕误读探针已写题未实测；本行“关闭”指场景建成 + 独立审查通过，不含这两项验收 |
| T12 存量动画按模式迁移（552 幕分批，先图后迁）| 纠错批全清；B6 245/246、B8 48/48 完成；B7/B9 专项定数（oral 污染 38 幕 87 行、mindmap 3 叶），两批订正进行中；B10/B11 已完成（cron 2026-11-01 08:12 JST 实补，本地 commit 43259be；开局 .git 对象写入 EPERM 故障复发一次、后自行恢复，见待办记账）：B10 22 幕构建全过、官方 insightcheck 覆盖 14 幕不合格 0（builder 8 幕 ic_gen8 等效 7 过 + adj_order_1 分节时长提示 1）；B11 13 幕构建全过、ic_gen8 全过 10 幕 + 3 幕时长超区间登记为存量属性；36 份 spec 存档已填实并通过 yaml 校验；hdg18_1.js 精灵由 0 字节残件按 build_sprites.py 重建（171,043 字节，gitignore 产物） |
| T13 参照图库首批：倒/切/装杯/撕纸 动作事实卡（model/refcards/）| 已完成（4 卡×5 事实，参照图 5 张落盘目视核验，关闭） |
| T14 汇总报告 | 晨间版已完成并补录 B6 试点结论 |

## 关键路径速查
- 模型目录 docs/whiteboard/model/（boundedness.yaml 为格式范本；validate.py 为校验规则）
- 审查报告 ~/workspace/content-audit/report_*.md；理论审计 docs/whiteboard/first_principles/THEORY_AUDIT.md
- 方法研究 ~/workspace/research_notes/best-concept-explanation-methods-20261031-1700/report.md
- 构建：WB_FONTS=$HOME/workspace/wb-fonts PATH=$HOME/workspace/bin:$PATH node build.mjs（在 v5 目录）
- insightcheck 工具 ~/workspace/tools/run_insightcheck.py 等

## 待办记账
- 批次1推送待补：本地 447939c..HEAD 的全部文件（T2–T6 成果）两次 push-files 均因运行环境重启未落地，远端仍在 d245b49；本地提交完整无损，由接班运行按攒批纪律补推（清单可由 git diff --name-only 447939c..HEAD 重新生成）。
- 2026-11-01 04:27 JST 接班运行攒批推送尝试失败（本轮唯一一次推送，已用完）：push-files 报错主文件 `萌星小学英语_最终合并版.html`（16,402,938 字节）超过连接器单文件上限 16,006,147 字节，整批未落地。60 文件清单在 `~/workspace/mengxing-push-batch-20261101.lst`（范围 082aec5..HEAD，含 T0/T8/T2–T9 与运行手册，约 18 MB）。建议下轮：先以 59 文件（除主文件外）清单做一次推送，主文件另寻传输途径（直推 git 无凭证、网页上传或 LFS 等），**不得为凑限删改主文件内容**；远端仍在 d245b49，本地提交完整无损。
- 推送机制结论（04:12 记）：push-files 在无人确认时会阻塞至会话被重启杀死——T0/T8 两次成功均因用户当时在线秒点确认。批次2（含 T2–T9 全部成果文件）待用户醒来点一次确认即可补推；本地提交已完整至 T9，无任何丢失风险。主 HTML（17MB）另需单独验证 push-files 的体积上限。
- 流程教训（05:12 记）：大文件单次写入两次出现尾部截断（T2 grammar_update.md、T7 domains.yaml 首写，后者自查修复、前者靠复核抓出）。此后所有大文件交付必须：分块 append 写入 + 写后 grep 自查截断标记 + 解析器校验，三项缺一不算完成。
- T9b（04:14 后补记）：G28 fill 题已按模型失效边界改为判断题（两序都接受），T9 跳过项清零中此项关闭；补丁+复验 10/10，报告 content-audit/T9b_patch_report.md。
- 裁定（主会话）：past_clans_4 时长 253.1s 超参考区间系定稿逐字长度所致，接受并登记，不裁定稿、不调速率凑数。
- 裁定（主会话）：tense_matrix_5 时长超限同 B2b 口径接受登记（基线本已超限，增量全来自定稿逐字长度）。
- 推送限制查实（06:08 定时巡查 + 主会话复核）：主 HTML 现 17,253,215 字节，超 push-files 单文件上限 16,006,147 字节——该文件无法经此通道推送（非确认卡问题）。其余 59 文件批次仍待一次确认。主 HTML 的上 GitHub 路径列入晨间决策（备选：用户本机 git 直推 / 其他通道）。
- 撞车记（06:2x 接班运行）：本运行开局误以为 B6 试点未开始，曾原地重生成 aux_transformer_p2_1 / five_patterns_p2_4 / wo_rule_norse_1 三幕并建裸名 spec；06:17 发现先前派单的 B6 试点已以「原幕不动、新名生成」设计通过（5b93800），本运行三幕改动与三份 spec 及抽取器已全部还原，树已干净。教训：领任务前先查 git log --all（派单代理的提交可能晚于本运行开局快照）。B6 全量由先前派单继续，后续运行勿重复领 B6，改盯 B6 全量落点与 B7–B11。
- 推送再查实（06:2x 本运行唯一一次推送尝试，已用完）：origin/master 在 082aec5（历史瘦身后），本地未推 53 提交/238 文件；237 文件清单（已除主 HTML）推送失败，新原因：push-files 按 UTF-8 快照读文件，T13 的 5 张参照图 JPG（二进制）导致整批报错未落地——非确认卡问题。已生成修正清单 `~/workspace/mengxing-push-batch-20261101-run3.lst`（232 文件 = 238 − 主 HTML − 5 JPG，供下轮推送前按当时 HEAD 重算核对后使用）。主 HTML（17.2MB 超单文件上限）与 5 张 JPG 均需另寻上 GitHub 通道，列入晨间决策。
- 推送清单修正（06:29 定时巡查）：232 文件批次已备妥（~/workspace/mengxing-push-batch-20261101-run3.lst），排除主 HTML（超单文件上限）与 5 张参照 JPG（二进制快照失败）；两类文件改列晨间决策。
- 推送完成（06:42，用户确认）：916 文件批次 push-files ok，远端 master 推进至 735358b。仅余主 HTML（超单文件上限）与 5 张参照 JPG（二进制）未上，待定替代路径。
- 2026-11-01 08:12 JST 接班运行：B10/B11 实补完成（见 T12 行）；开局 .git 对象写入 EPERM 故障复发一次（与 06:56 JST 同型），后自行恢复，B10/B11 已本地提交 43259be；本轮唯一一次 push-files 攒批推送按“5633bb6..HEAD 全部文件（去重、剔除工作树脏文件即主会话 T16 在改文件）”执行（若推送未成功，同样记一笔、下轮补推）。主会话 T16 工作（engine.js/build.mjs/fp_boundedness_1_v3.js/gen_boundedness_1.js/boundedness_1.yaml/props/、T15_pack、teapot/DIAG 记录）本轮未动、未推，属主会话进行中工作。
