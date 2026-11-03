# 词表快照（外部资料 · 非事实源）

- 性质：外部词表快照，**不是事实源**，不得作为 App 数据引用；仅作 2026-11-03 词库缺口普查的取数凭据存档（《数据源规范》§5）。
- 检索日期：2026-11-03。
- 内容：wordlist-census-2026-11-03.json —— Dolch 五级服务词 + 名词段（Wikipedia 镜像）、Fry 前 1000（readingblocks 编号表 + nomadkazoku PDF 并集）、剑桥 YLE 官方 PDF 三级合并字母表解析条目（词条原文 + S/M/F 首现级别）、普查归一化口径与缺口清单（含逐词来源与级别）。
- 镜像差异备注：Dolch 镜像 grade2 为 47 词（通行 46，多 "left" 一词）；名词段标称 97 词（与通行 95 版差异：含 goat/woman/women，不含 good-bye）。Fry readingblocks 尾部编号不可靠（731 号缺失、711/712/732 重号），故与 PDF 版取并集；缩写断词（couldn/t/ll 等 10 个伪影）已在普查中剔除并计数。
- 补词字段源 ECDICT 的 csv 快照（66MB）未入库，来源与下载日期登记于 JSON meta 与各新词条 source_ref。
