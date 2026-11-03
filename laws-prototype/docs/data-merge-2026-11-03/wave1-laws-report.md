# Wave 1 对账报告：规律总表（单一数据源）

- 日期：2026-11-03
- 基线：仓库 HEAD `57a9bb5`（e936652 之后一笔）
- 产出：`laws-prototype/model/laws_master.json`（446 条记录，约 4.5MB，**未 commit**，待主会话验收）
- 纪律执行情况：只新建总表与本报告；主文件 HTML、全部现有数据文件**零改动**（git status 仅多出 laws_master.json 一个未跟踪文件）。

## 一、各源条数（全部实测，与任务书数字逐项对齐）

| 源 | 内容 | 条数 |
|---|---|---|
| A. YAML 模型 | 8 个文件：expression 59 + grammar 45 + grammar_ext 50 + phonics 52 + small_systems 63 + support 70 + teaching 44 + vocab 45 | **428**（id 全唯一） |
| B. LAWDATA | 主文件内 `var LAWDATA` 字面量（node 平衡括号抽取 + 求值） | **224** |
| C1. 代词区 LAWS | PN IIFE `var LAWS`（PR-01 … QI-15） | **33** |
| C2. 冠词区 LAWS | AR IIFE `var LAWS`（C-01 … C-20 + GR-15） | **21** |
| C3. 连词区 LAWS | CJ IIFE `var LAWS`（NEW-CJ01 … NEW-CJ12 + GR-11/32/38） | **15** |
| C4. 词根区 LAWREG | morph IIFE `const LAWREG`（V-15/20/21/26/30/32/33–38、GR-28/29、NEW-C、NEW-T） | **16** |
| C 合计 | | **85** |

专区附属数据（按 id 挂在对应 zone 记录的 extra/adult 字段，一并分仓保存）：PN_EXTRA 11 条、PN_ADULT 28 条、AR_EXTRA 20 条、AR_ADULT 20 条（GR-15 无成人层，与集成时口径一致）。

## 二、并集与按源组合分布

**并集总条数：446 条。**

| 源组合 | 条数 | 说明 |
|---|---|---|
| 仅 YAML | 204 | 图鉴有、App 两套呈现都未收（如 TA 18 条、S/SR 大部） |
| YAML + LAWDATA | 157 | 解码区有页、专区无页 |
| YAML + LAWDATA + 专区 | 67 | 即「双户口」全集（见第三节） |
| 仅专区 | 18 | 全部为新拟候选：NEW-P1–P4、NEW-CJ01–CJ12、NEW-C、NEW-T |
| 仅 LAWDATA / LAWDATA + 专区（无 YAML） | **0** | LAWDATA 的 224 个 id 全部是 YAML 428 的子集，无一例外 |

## 三、67 条双户口落位核对（全数在册）

67 条在总表中全部为 `sources: [yaml, lawdata, zone]` 三源齐全，分区构成与审计数字逐项吻合：

| 专区 | 条数 | 明细 |
|---|---|---|
| 代词区 pron | 29 | PR-01–11、GR-10/13/14、QI-01–15 |
| 冠词区 art | 21 | C-01–20、GR-15 |
| 连词区 conj | 3 | GR-11、GR-32、GR-38 |
| 词根区 morph | 14 | V-15/20/21/26/30/32/33–38、GR-28/29 |
| **合计** | **67** | 与数据治理审计的双户口清单（67 = 29+21+3+14）完全一致 |

附带修正一则旧口径：融合备忘曾称「V-33–V-39 双户口」——实测 V-39 只有 yaml+lawdata 两源（无 LAWREG 记录），双户口的是 V-33–V-38，与全 App 审计总清单的修正一致。

另两处运行时叠加层已查清、未计作独立源：主文件 `PHONLAWS`（52 个 S/SR id）与 `SUPPDATA`（114 个 TM/WA/LS/YL/CB/CG/VB id）的 id 集合**全部落在 YAML 428 之内**，是同一图鉴源的 App 内转写/呈现层，其 YAML 本体已在总表在册。

## 四、冲突处理：已判 0 / 待裁 0

对每条多源记录的四个公共语义槽位做了全量比对（规范化后逐字比较）：

| 槽位 | 取值来源 | 比对结果 |
|---|---|---|
| headline（正式标题） | yaml.headline / lawdata.hl / zone.formal（morph 为 headline） | 凡多源共有的，**全部逐字一致**（224 组 yaml↔lawdata、53 组 zone↔lawdata、14 组 lawreg↔lawdata） |
| kid_headline（孩子版标题） | yaml.headline_kid / lawdata.kid / zone.kid | 全部逐字一致 |
| claim（主张） | yaml.claim.statement / lawdata.cstmt / zone.claim（morph 为 statement） | 全部逐字一致 |
| title（短标题） | 仅专区有（short / _short） | 单源，无冲突可能 |

扩展普查（非 canonical 槽位，同法比对）：受众（yaml.audience↔lawdata.aud，59 组）、主张类型（claim.type↔ctype，224 组）、适用范围（claim.scope↔scope，195 组）——**同样全部逐字一致**。

**结论：canonical 冲突总数 = 0（已判 0、待裁 0）。** Stewart 的「脱帽」裁定（58aa636）已在各源内先行清完（GR-36 三源 headline 均为箭头口径版、逐字相同），本波无一处需要动用裁定规则。

必须说清的一点：冲突为零不等于双户口没代价。三源的**正文结构互不相同**（YAML 的 mechanism/error_cases、LAWDATA 的 mech/cases/prb、专区的 beats/errors/groups 是三套字段体系），不存在可逐项对判的同名槽位——这正是双户口的真实形态：不是内容打架，而是同一内容存了三套结构、机器无法自动比对。本波按合并规则将三套正文**按源分仓全量保留**（见第六节零丢失验证）；正文级的字段映射与合并属于后续「切换生成」波次，不在本波范围。

已登记的关系（写在记录的 relations 字段，未合并）：
- **C-14 ↔ GR-15**：目录内双登记，Stewart 已裁定暂不合并——总表保持两条独立记录。
- **NEW-C ↔ S-21**：过夜对账备忘判定其实质对应 S-21（建议撤销独立候选并入、LAWREG 只留呈现位），**Stewart 尚未裁定**，暂保持独立。
- **NEW-T ↔ S-30 / S-18**：备忘判定 -s 三读对应 S-30、垫音机制对应 S-18、-ed 清浊对为真空白（建议立 S-44），**Stewart 尚未裁定**，暂保持独立。

## 五、跳过项登记（本波未纳入）

| 跳过项 | 数量 | 理由 |
|---|---|---|
| GP 拼读模式 | laws/*.yaml 内 **0 条** | GP 模式不在 laws YAML 中（在 model/phonics_wordsets.json），属拼读总表波次 |
| prep_*.yaml 介词档案 | 4 个文件、72 个词条档案（dossiers_a 15 + dossiers_b 14 + thick_a 14 + thick_b 29） | 介词线后置；且其内容为词级 dossiers，非规律条目 |
| techniques.yaml（TEC） | 153 条 | 技巧条，不在图鉴 428 规律目录内；App 内另有 TECDATA 一套，待后续波次处理 |
| probes*.yaml（PRB） | 331 条（40+91+200） | 理解探针条目，非规律本体；探针内容已随 LAWDATA 各条的 prb 字段分仓保存于总表 |
| small_systems 内的 P-01–19 / PB-01–13 | 已纳入（计入 428） | 它们身在 small_systems.yaml（非 prep_*.yaml），且 428 基线本含此 32 条；在此登记备查 |

## 六、零丢失验证（抽验 + 全量复核）

方法：合并完成后，用**独立的第二次抽取**（重新从主文件与 YAML 源抽全量）与总表逐记录、逐叶字段深比对。

- 全量深比对：YAML 428 条 / LAWDATA 224 条 / 专区 85 条，共 **48,005 个叶字段，不一致 = 0**。
- 随机/代表抽验 5 条（覆盖全部源组合类型），逐字段核对无丢失：
  - S-01（仅 YAML）：yaml 38 叶字段全等
  - W-08（YAML+LAWDATA，种子随机）：47 + 42 叶字段全等
  - C-14（三源）：68 + 70 + 50 叶字段全等
  - V-33（三源·词根）：87 + 53 + 56 叶字段全等
  - NEW-CJ01（仅专区）：54 叶字段全等
- 每条记录的三源原始对象按源分仓原样保存（yaml / lawdata / zone.data + zone.extra + zone.adult），canonical 仅为标题/孩子版标题/主张/短标题/分组的已判定公共槽位，不覆盖任何源字段。

## 七、待主会话/Stewart 后续事项（不在本波执行）

1. laws_master.json 的 commit 与否由主会话验收后决定（本波未 commit）。
2. 「切换生成」（App 内嵌副本改由总表生成、LAWDATA 降指针）是独立波次，需逐区渲染对比验证后再动主文件。
3. NEW-C / NEW-T 的归并裁定（并入 S-21 / 立 S-44）仍待 Stewart 拍板，裁定后总表按裁定调整记录关系。
4. TEC 153 与 PRB 331 是否另波入表，待定。
