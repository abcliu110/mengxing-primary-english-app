# workspace 资产导入（2026-11-03）

本目录是 2026-11-03 按 Stewart 指示，把一直住在助手 workspace（仓库外）里的项目资产全量导入仓库的归档区。此前这些资产不在版本控制内，是「多套数据源、同步靠人肉」问题（数据治理审计）的一部分；导入后至少有版本可查。**各子目录保持原始名称与内容，未做删改**。

| 子目录 | 是什么 | 性质 |
|---|---|---|
| `mengxing-etymology-prototype/` | 词源工具链：refresh_et.py（ET 载荷刷新，带断言）、build.py、build_integration.py、patch_grouping.py（待核面板分组补丁，一次性，已执行，2026-11-10 第八波第 25 项退役删除）+ 独立词源原型 | **工具（现行）**：刷新主文件词源载荷就用 refresh_et.py |
| `etym-work/` | 词源数据工场：三源缓存（etymo/ox/wikt，共 7,355 个证据文件）、repair/（含 STANDARDS.md 修复标准与各批补丁）、草稿与解析中间产物、抓取脚本与日志 | **证据与工场档案**：双源互证的证据底子在此；真源仍是 `../model/etymology.json` |
| `etymology-delivery/` | 旧一代词源交付快照（804 verified / 1,477 待核） | ⚠️ **过期归档，绝不是数据源**：内容比现行源落后一代，误用会重演载荷回退事故；仅留档备查 |
| `mengxing-grammar-prototypes/` | 代词/冠词/连词原型全系（pronoun v1–v5、article v1–v3、conjunction v1–v2、白板原型、连词目录源 JSON） | 历史原型：集成进主文件的中转版本，已冻结；现行内容以主文件为准 |
| `mengxing-affix-prototype/` | 词根词缀规律与融合原型全系（morphology-laws v5–v7、fusion v2–v4、方案文档） | 历史原型与方案档案，已冻结 |
| `app-audit-2026-11-03/` | 2026-11-03 全 App 审计：总清单 + 架构/数据治理/动线三份分报告 | 审计档案 |
| `overnight-2026-11-03/` | NEW-C/NEW-T 图鉴对账备忘、词根词缀落地方案备忘 | 决策备忘（待裁项在内） |
| `research_notes/` | 连词与连接副词全球资料调研（2026-11-02） | 调研档案 |

注意：本目录是**归档与工具**，不是新的事实源。各类数据的事实源仍按原登记：词库 `../model/wordbank.json`、词源 `../model/etymology.json`、规律模型 `../model/laws/*.yaml`、主文件 `../mengxing-prototype-v1.html`。
