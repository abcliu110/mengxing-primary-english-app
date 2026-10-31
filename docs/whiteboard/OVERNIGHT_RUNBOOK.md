# 通宵自主运行手册（用户 2026-11-01 02:09 JST 授权：不询问、直接做完、每完成一个任务提交 GitHub）

## 纪律
- 每项任务完成即 `git add -A && git commit` 一次，提交信息以任务号开头（如 `T2 语法入模…`）；push 失败则本地提交保留并在本文件记一笔，继续下一项。
- 开工前在本表把状态改 `进行中（执行者+时间）` 防撞车；完成改 `已完成（commit 短号）`。
- 数据标准执行 DATA_OPTIMIZATION_SOP；架构执行 REWRITE_TECH_PLAN；讲法基线 = 方法研究排行榜 + 15 条设计规则。
- 更新包拍板门今晚按用户指令豁免：审查裁定即执行依据，变更全部留 diff 供用户事后抽查。
- **质量优先（用户 02:10 追加：数据质量与准确性越高越好，优先于进度）**：①每条修正文入模前逐条回查一级来源（词源 Etymonline/OED、语法 CGEL/Swan、释义牛津/剑桥），不凭审查报告转抄；②每个更新包提交前过一道独立复核（复核者对照来源抽查：错误级 100%、其余 ≥30%），复核不过不提交；③查无实据或来源冲突的条目标「存疑」隔离，不许猜测填充；④宁可少交一项，不交一条没把握的数据。

## 任务队列
| 号 | 任务 | 状态 |
|---|---|---|
| T0 | 既有成果入库（方案文档+模型+boundedness 家族+fb39_lib 改名） | 进行中（主会话） |
| T1 | 框架库审查（FRAME_SEMANTICS 等 10 库） | 进行中（子代理 dfd04d1a） |
| T2 | 语法 G01–G40 入模：model/grammar.yaml（纲领+概念+修正后主张+讲法）+ model/updates/grammar_update.md | 待领 |
| T3 | 词汇修正入模：model/vocab_fixes.yaml（12 错误+分型修正+全称降格，含 MH↔VOCAB 联动）+ updates/vocab_update.md | 待领 |
| T4 | 表达修正：model/expressions_fixes.json（DAILY 问题条目修正版）+ 收尾句生成机制 + WRITING 去虚假承诺，updates/expressions_update.md | 待领 |
| T5 | 白板台词修正集：model/scene_fixes.yaml（45 条问题项更正文，hd_g03_1 与 boundedness 模型对齐）+ updates/scenes_update.md | 待领 |
| T6 | 框架库修正入模（待 T1 报告） | 阻塞于 T1 |
| T7 | 领域纲领 v1：model/domains.yaml（每领域 coreView/unifies/conflicts） | 待领（主会话综合，依赖 T2–T6） |
| T8 | 阐述设计基线（研究 15 条规则）并入 REWRITE_TECH_PLAN §3.3 附则 | 待领 |
| T9 | 主 HTML 旧库外科补丁：按 T2–T6 更新包逐项修正旧库原文，抽取脚本复验 DB 可解析 + 抽样回读 | 待领（依赖 T2–T6） |
| T10 | 原理 ①②④⑤⑥ 建模：model/phonology.yaml、letters.yaml、sentence.yaml、rules5.yaml、viewpoint.yaml（名称以内容定）按 THEORY_AUDIT 修复清单 + T5 修正集 | 待领（依赖 T5、T7） |
| T11 | 五大家族场景生成（spec→gen→build→insightcheck 0 失败）+ 独立逻辑审查 | 待领（依赖 T10） |
| T12 | 存量 552 幕按 ~7 模式分批迁移生成 | 待领（依赖 T11） |
| T13 | 参照图库首批：倒/切/装杯/撕纸 动作事实卡（model/refcards/） | 待领 |
| T14 | 全量汇总报告：your_files/optimization-final-report.md（裁定总账+变更总账+剩余风险） | 最后 |

## 关键路径速查
- 模型目录 docs/whiteboard/model/（boundedness.yaml 为格式范本；validate.py 为校验规则）
- 审查报告 ~/workspace/content-audit/report_*.md；理论审计 docs/whiteboard/first_principles/THEORY_AUDIT.md
- 方法研究 ~/workspace/research_notes/best-concept-explanation-methods-20261031-1700/report.md
- 构建：WB_FONTS=$HOME/workspace/wb-fonts PATH=$HOME/workspace/bin:$PATH node build.mjs（在 v5 目录）
- insightcheck 工具 ~/workspace/tools/run_insightcheck.py 等
