# 萌星 App 数据治理与多源一致性审计

- 对象：`laws-prototype/`，以 `mengxing-prototype-v1.html`（下称主文件）为主，兼 `morphology-prototype-v1.html` 与 `model/laws/*.yaml`、 `model/*.json`
- 基线：HEAD `d4367cc`（2026-11-03 全 App 完整性审计提交）
- 性质：只分析、只实测，未改任何代码/数据。所有数字均为本轮在 HEAD 上实测。

## 结论先行

这个项目在**模型层**的治理其实不差：`model/wordbank.json` 被明文定为「唯一事实源」（WORDBANK.md），`model/README.md` 有资产登记表，词源线有全项目唯一一条脚本化刷新通道且当前逐字段对平。真正的病灶在**呈现层**：主文件里几乎每份数据都是「一次性移植/手工波次刷新」的内嵌副本，没有任何常驻同步机制；而规律内容存在系统性的**多户口**——67 条规律在同一个文件里有两份全量副本（LAWDATA + 各专区），另加 YAML 源头共三处事实源，且两份副本的字段结构完全不同，改一处必须手工「翻译」到另一处。昨夜修的拼读内嵌词表过期（d82fcf0）、词源载荷被陈旧副本静默回退（123235a 事件）不是意外，是这个结构必然反复生产的故障类型。本轮实测又在已「刷新对平」的拼读词卡里查出 4 张音标与源不一致——刷新只验了成员资格，没验内容字段。

好消息：本轮高风险实测里，词根 DATA、LAWREG、词源载荷、拼读成员四项当前全部对平（见 §2）。问题不在「现在错了多少」，在「没有任何机制保证下个月还对」。

---

## 1. 资产—源头—同步机制表

| # | 数据资产 | 源头（事实源） | 消费者 | 同步机制 | 本轮状态 |
|---|---|---|---|---|---|
| 1 | 词库主数据 | `model/wordbank.json`（2,473 条，WORDBANK.md 定为唯一事实源） | 一切内容层（经内嵌衍生副本） | 补词波次（人工发起、脚本辅助，脚本多在仓库外 workspace） | 本体在仓内，口径干净 |
| 2 | 拼读 GP 模式 + 成员 | `model/phonics_wordsets.json`（174 模式） | 主文件拼读区内嵌 DATA（patterns.w + bank 词卡） | **手工刷新波**（d82fcf0 刚做一波）；仓内无常驻脚本 | 成员 11,375 对全量对平；词卡内容字段有漂移（§2.4） |
| 3 | 拼读音标 | `model/phonetic_gb.json`（2,287 条）+ 词库 `phonetic_gb` | 拼读词卡、词页落点 | 随刷新波手工带入 | 4 张卡音标与词库源不符（§2.4） |
| 4 | 拼读检查点 | `model/phonics_checkpoints.json` | 主文件内嵌 addendum/检查点数据 | 手工重算波（cf2cdf5 刚做） | 内嵌注记自承「2,287 条基线与 2,352 推导基数不同基，基线统一刷新待后续轮次」 |
| 5 | LAWDATA（224 条规律页数据） | `model/laws/*.yaml`（428 条图鉴入模）+ 入仓后在文件内的二次丰富（案例、探针、成人层补料） | 主文件解码区（lz）渲染 | **无**：全仓与 workspace 均未找到 LAWDATA 生成脚本，系一次性生成后手工维护 | 与专区副本系统性双户口（§3） |
| 6 | LAWREG（16 条规律注册表） | 由 LAWDATA 子集 + 候选规律在文件内策展而成 | 主文件词根区 + morphology 独立文件（两处呈现） | **手工逐字节复制**（两文件间） | 当前两文件逐字节相同（§2.1） |
| 7 | 词根 DATA（groups/pages/words） | 词库 `morph_class` 等字段 + `model/morpheme_expansion.json` + `model/root_inventory.json` | 主文件词根区 + morphology 独立文件 | 手工重推导 + 复制；model/README 曾登记「独立原型待同步」的历史欠账 | 当前两文件逐字节相同；words=2,473 与词库对平（§2.1） |
| 8 | 词源 ET 载荷 | `model/etymology.json`（2,278 条：1816 verified + 462 待核） | 主文件词源区内嵌 `var D` | **脚本**：`refresh_et.py`（断言校验）——全项目唯一脚本化通道，但脚本在仓库外（`~/workspace/mengxing-etymology-prototype/`），未随数据入仓 | 逐字段对平，0 差异（§2.2） |
| 9 | 代词区数据（33 条） | `small_systems.yaml`（PR）+ `grammar.yaml`/`grammar_ext.yaml`（GR-10/13/14、QI）+ 新拟研究 | 主文件代词区（IIFE 内 `var LAWS`） | **一次性手工移植**（经 workspace 原型 v5 中转）；成人层为移植时逐字拷贝的冻结副本 | 与 LAWDATA 双户口 29 条（§3） |
| 10 | 冠词区数据（21 条） | `small_systems.yaml`（C 组）+ `grammar.yaml`（GR-15） | 主文件冠词区 | 一次性手工移植，同上 | 与 LAWDATA 双户口 21 条（§3） |
| 11 | 连词区数据（15 条） | `grammar.yaml`（GR-11/32/38）+ 联网研究（NEW-CJ） | 主文件连词区 | 一次性手工移植（workspace 原型 v2 中转） | 与 LAWDATA 双户口 3 条；12 条新拟未对账（§4） |
| 12 | 动词区数据 | `model/verb_*.json`（义项网络 a/b/c、词形补齐、错误病例）+ `ta_exercises.json` | 主文件 VB 模块内嵌（FORMS DATA、义项网络等） | 手工回灌波；model/README 自登记过「数据尚未回灌原型、原型仍标练习待补」类时滞 | 本轮未做字段级实测（列为未验项） |
| 13 | 介词数据 | `model/laws/prep_*.yaml`（dossiers/thick）+ `model/prep_family*.json` | 主文件介词区内嵌 FAM/FAMS + 仓内两个独立介词原型（1.5MB + 600KB） | 手工（Stewart 自有线） | 多副本并存，未做字段级实测 |
| 14 | 同义/反义数据层 | 无（仅立项简报 `docs/synonym-antonym-datalayer-brief.md`，90bef4f） | — | — | 零数据；简报要求「义项级挂接」，但词库除动词外无义项编号——将新增一套寻址体系（§5） |
| 15 | 各独立原型文件 | 各自的历史快照 | 仓内：phonics/grammar/vocab/verbs/tense/prep×2 原型；workspace：pronoun v5、article v3、conjunction v2、morphology v5–v7、affix 融合 v2–v4 | **无**（集成后即冻结） | 已实测过期：仓内拼读原型仅 144 个 GP（现行 174）；workspace 代词原型 v5 仅 18 条规律 id（集成区 33 条）（§2.5） |

---

## 2. 现行一致性实测

### 2.1 词根 DATA 与 LAWREG：两文件仍逐字节同源 ✅（但靠手工纪律）
- morph DATA：主文件（偏移 12,837,712 起）与 `morphology-prototype-v1.html` 各 493,525 字符，MD5 同为 `5abe603c1cbe`，**逐字节相等**。
- LAWREG：两文件各 19,987 字符，MD5 同为 `bc150883b080`，**逐字节相等**；16 条 = V-15/20/21/26/30/32/33–38 + GR-28/29 + NEW-C/NEW-T。
- morph DATA.words = 2,473 条，与 `wordbank.json`（2,473）对平；stats 自述 total 2473 / splits 926 / whole 1199 / nosplit 230 / form 118，与词库口径一致。
- 判定：**当前一致，但同步机制是「人肉复制 + 事后审计」**。model/README 2026-11-02 收官条白纸黑字登记过「合并版……现为暂存件……独立原型 morphology-prototype-v1.html 待同步」——这条线历史上就欠过同步债，现在对平是最近一波人工对账的结果，不是机制的结果。

### 2.2 词源载荷：与源逐字段对平 ✅（唯一有脚本的一条线）
- 内嵌 `var D`：verified 1,816 / pending 462 / bankTotal 2,473。
- 与 `model/etymology.json`（2,278 条）比对：verified 词集完全相同，**1,816 条逐字段比对 0 处不一致**；462 条 pending 的 pending_reason 0 处不一致。
- ⚠️ 陷阱副本：`~/workspace/etymology-delivery/etymology.json` 是旧交付快照（804 verified / 1,477 待核，2,281 条），与现行源相差一代。若日后有人误以它为源跑刷新，将重演 123235a 式回退。它与真源同名、路径相近，是当前最危险的一个文件。

### 2.3 词数口径：文案层已清，数据注记层留一处自承分叉
- 主文件用户可见文案：2,473 共 3 处（词根区对账行、ET bankTotal、morph stats），彼此一致；926 已全面取代 547（首页词根卡 d4367cc 已修为「926 条拆分」，全文 547 仅剩数据 id 如 `ADD_0547`，非文案）；1816 共 14 处全一致；**全文无「2,499」字样**——2,499 是拼读词卡张数（内嵌 bank 字典实测 2,499 张卡 / 2,469 个不同词），未被任何文案冒充词汇总数。d4367cc 的计数对账结论在本轮抽验下成立。
- 残留：拼读检查点内嵌注记（addendum_2026_11_02）自述其覆盖对账基线为 2,287、新池推导基数为 2,352，「基线统一刷新待后续轮次」——数据层内部口径分叉，有登记、未销项。
- 另：拼读词卡中 13 张卡的词不在词库内（whom、itself、am、is、are、be、a、an、how many/how much/how old/how tall/how heavy 等功能词与疑问短语）——与 WORDBANK.md「内容侧不许另立词表、例词一律引用词库」纪律正面冲突，尽管多半是功能词的合理例外，但未见例外登记。

### 2.4 拼读内嵌数据：成员对平，内容字段已漂移 ⚠️
- 成员资格：内嵌 patterns 与 `phonics_wordsets.json` 逐模式比对——174 个模式 id 全同，**成员对总数同为 11,375，逐模式集合差异 0**。d82fcf0 刷新波的成果属实。
- 内容字段：2,499 张词卡中 **4 张音标与词库 `phonetic_gb` 不符**：heard 卡面 /hɔːd/（源 /hɜːd/）、gas /ɡeəs/（源 /ɡæs/）、toy /taɪ/（源 /tɔɪ/）、math /mɑːθ/（源 /mæθ/）。其中 toy、gas、heard 三张按任何口径都是错音标。
- 判定：刷新波只验了「谁在池子里」，没验「卡面内容等于源」。这是快照病的典型形态：**结构对账通过 ≠ 内容对账通过**。

### 2.5 独立原型文件：已实测过期（冻结快照无人认领）
- 仓内 `phonics-prototype-v1.html`：仅 144 个 GP 模式 id，现行 174；无 GP-eye 等新站——落后整整一代。
- workspace `pronoun-prototype-v5.html`（代词区移植的中转源）：仅 18 个规律 id、无 QI 组；主文件代词区已扩到 33 条。移植后新增的 15 条（QI 全组等）只存在于主文件，workspace 原型作为「源」已经失真。
- workspace `article-prototype-v3.html`、`conjunction-prototype-v2.html` 与集成时点状态一致（连词区最新，尚未分叉）；morphology v5–v7、affix 融合 v2–v4 均为历史方案快照。
- 仓内 `grammar-prototype-v1.html` 另存 GR-01–45 全套一份，与 LAWDATA、grammar.yaml 构成 GR 组的三份拷贝。

---

## 3. 双户口 / 多户口登记清单（同一规律在几处有全量页）

主文件内 **67 条规律有两份全量副本**（LAWDATA 解码区版 + 专区版），加上 YAML 源头即三处事实源。关键问题是两份副本**字段结构完全不同**：LAWDATA 版用 hl/cases/cev/exs/aud/bnd 等字段，专区版用 short/desc/beats/examples/errors/quiz/claim 等字段——不是同一条记录的两个视图，而是两次独立写作。改一处，另一处不会跟上，且无法用脚本自动比对（无公共字段可对齐）。

| 分组 | 双户口条数 | 明细 |
|---|---|---|
| 代词区 ↔ LAWDATA | 29 | PR-01–11（11）+ GR-10/13/14（3）+ QI-01–15（15） |
| 冠词区 ↔ LAWDATA | 21 | C-01–20（20）+ GR-15（1） |
| 连词区 ↔ LAWDATA | 3 | GR-11 / GR-32 / GR-38 |
| 词根区 LAWREG ↔ LAWDATA | 14 | V-15/20/21/26/30/32/33/34/35/36/37/38 + GR-28/29 |
| **合计** | **67** | 占 LAWDATA 224 条的 30% |

个案与放大效应：
- **a/an 一条规律有 4 份拷贝**：C-14 与 GR-15 本就是目录内双登记（Stewart 已裁定暂不合并），两者又各有 LAWDATA 版与冠词区版——2 条 × 2 处 = 4 份全量内容，任何口径修正要改四处。
- **V-39 是单户口**（仅 LAWDATA，无 LAWREG 条目）：任务前提里「V-33–V-39 双户口」需修正为 V-33–38 双户口、V-39 只在解码区。词缀七条在规律层的待遇不对称，未见登记说明。
- **更新不跟随的实证**：2026-11-03 Stewart 的 GR-36「脱帽」口径裁定（58aa636）需要「App 全域清查」式扫改——正因为同一内容散在多份拷贝里，单条裁定也要全文件扫。同理，代词/冠词区的成人层是从 YAML 逐字搬入的冻结副本，YAML 日后修订（如 small_systems.yaml 更新 PR 条 claim）不会流进已集成的区，区内修订也不会回写 YAML，双向断流。
- LAWREG 与 LAWDATA 的 14 条重叠中，headline 文案当前逐字相同（本轮逐条比对 14/14 一致）——说明最近一次对账是认真的；但正文结构不同、各自独立演化，下一次分叉只是时间问题，且**没有任何工具能检出**（两边字段名都不一样）。

---

## 4. 「新拟 · 待对账」存量

全文件扫 `NEW-` / 新拟 / 待对账（主文件 新拟 270 处多为「新拟例句」来源标注，属正常溯源标记；规律级候选如下）：

| 候选 | 数量 | 位置 | 对账状态 |
|---|---|---|---|
| NEW-P1–P4 | 4 条 | 代词区（物主/反身/指示/不定四家） | **从未对账**：区内自标「目录 PR 组暂无定版条目，编号待对账」，无任何后续对账动作记录 |
| NEW-CJ01–CJ12 | 12 条 | 连词区 | 研究有据、区内状态字段明标「尚未与规律目录对账（待对账）；与目录冲突时以目录为准」；未做过图鉴逐条对账 |
| NEW-C 恒常律 | 1 条 | LAWREG（`_role: candidate`，界面渲染「新 · 待对账」徽标） | 已有对账结论（昨夜备忘：实质即 S-21，建议撤销独立候选并入 S-21、LAWREG 只留呈现位），**待 Stew
...[truncated 5127 chars]