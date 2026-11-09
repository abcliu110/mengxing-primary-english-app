# 同义／反义 8 字段落位说明（TODO 1.2）

> 对应交付：`docs/work-2026-11-09/synonym_antonym_batch1.json`（数据）、`synonym_antonym_batch1_notes.md`（交付说明）
> 主文件：`laws-prototype/mengxing-prototype-v1.html`（本文只定位、不改动）

## 1. 4 张手工词卡的位置（静态 HTML，九栏卡内同义／反义两格）

| 词 | 视图 id（行） | 同义行 | 反义行 | 现状 |
|---|---|---|---|---|
| play | `vcv-word-play`（L1179） | L1236 | L1237 | `<span class="pending">待补</span>` |
| charge | `vcv-word-charge`（L1244） | L1298 | L1299 | `<span class="pending">待补</span>` |
| light | `vcv-word-light`（L1306） | L1360 | L1361 | `<span class="pending">待补</span>` |
| school | `vcv-word-school`（L1368） | L1453 | L1454 | `<span class="pending">待补</span>` |

四格均为手写静态 HTML（`<tr><td>同义</td><td><span class="pending">待补</span></td></tr>`），不在任何 JS 数据里。

## 2. 动态渲染模板的位置与数据来源

- 模板函数：`openCard(i)`（L1857 起）。同义／反义占位在 **L1954–1955**，硬编码写死：
  `<p>同义：<span class="pending">待补</span></p><p>反义：<span class="pending">待补</span></p>`＋`<p class="small">全库还没有同义 / 反义数据，以后补上。</p>`。
- **数据来源：无。** 动态词页的数据来自三处内联结构，均无同义／反义字段：
  - `WLIST`：词库派生的词行（词形／音标／词性／核心意思／主题／规律引用等）；
  - `WPAGE[i]`（`P`）：`se`（义项与例句）、`pc`（短语组合）、`ho`（同音对照）、`fm`（变形表）、`et`（词源）；
  - `WEXTRA[i]`：课标级别／Dolch 分级／通用词频序／音标来源。
  - 三者皆无 synonym／antonym 字段，占位符是写死的、与数据无关。
- **4 张手工卡不走动态模板**：`openCard` 开头 L1861 `if (r[13]) { vcShow(r[13]); return; }`——WLIST 行的第 14 列（`r[13]`）为旗舰页 id 时直接跳去静态视图 `vcv-word-*`，不执行动态渲染。所以 4 张卡与动态模板是**两条互不相通的渲染路径**，须各接一次数据层（见 §4）。

## 3. 8 个字段在数据层里落在哪里（按义项，不可只填词）

| 卡面字段 | 数据层内容（JSON 内） | 入模后卡面应呈现 |
|---|---|---|
| play 同义 | V1 查无；V2 compete（near）；V3 perform（near） | 按义项分组写“打（球）：compete；弹奏：perform；玩耍：—”，不可只并列两个词 |
| play 反义 | V1 work 待核（不进展示层）；V2／V3／N1 查无 | 入模后仍无可展示反义（展示层定如何写“没有”，不得留“待补”） |
| charge 同义 | V4 accuse（库外已核，须先补词入）；其余查无 | accuse 入库后方可呈现；此前该格无可展示内容 |
| charge 反义 | V3 discharge（库外＋单源待核，不进展示层）；其余查无 | 入模后仍无可展示反义 |
| light 同义 | S2 bright（near）；S3 pale（库外已核，须先补词入）；S1／S4 无（S4 lightweight 单源待核） | 明亮义 bright；浅色义 pale（入库后）；光义／轻义无 |
| light 反义 | S2 dark、S3 dark、S4 heavy（均 gradable）；S1 darkness 待核（不进展示层） | 明亮义／浅色义 dark；轻义 heavy；光义暂无 |
| school 同义 | S1 academy／institute、S4 faction（均库外已核，须先补词入）；其余查无 | 三词入库后按义项呈现；此前该格无可展示内容 |
| school 反义 | 5 义项全部查无 | 入模后该格无可展示内容 |

## 4. 落地方式建议（按 brief §10 入模口径）

**建议：进数据层，不直接填卡面。**

1. **入模落位（发包方执行，brief §7）**：数据文件 `laws-prototype/model/synonym_antonym.json`，活文档 `laws-prototype/model/SYNONYM_ANTONYM.md`，数据总账 `laws-prototype/model/README.md` 登记一行（数据集名／文件／条数／状态）。本批 JSON 已按 §3 格式写好，可直接作为第一批内容。
2. **渲染只读数据层，不手写第二份清单**（brief §10、WORDBANK 规则 3：一词一源）：词页“亲戚”栏目从本层渲染，词页不另行手写第二份关系清单。直接往 4 张卡的 HTML 里填词，会造成卡面与数据层两份清单，日后必漂移；且 4 张卡是静态 HTML，填进去的值无法被“亲戚栏目完整性检查”校验。
3. **两条渲染路径各接一次同一数据层**：
   - 动态模板（`openCard` L1954–1955）：把硬编码占位改为查表渲染——按 `bank_id` 取本层记录，按义项分组呈现全部 verified 关系；无 verified 关系的义项不渲染占位符“待补”（展示层另定“没有”的写法）。
   - 4 张手工卡（L1236–1237 等 8 格）：同义／反义格改为 JS 查表渲染（与动态模板共用同一渲染函数），或入模时由脚本按 `bank_id` 从数据层回填并标注来源——回填只是数据层的投影，卡面本身不存清单。
4. **呈现口径**：按 brief §10 菜单完备性——该词全部义项的全部 verified 关系全量呈现，不许只挑几个“代表”关系；待核关系不进展示层；checked_none 的义项在展示层应呈现为“无”（或省略该义项），由展示层定具体文案，本层不写儿童讲解文案。
5. **前置条件**：out_of_bank 的 7 条已核关系（academy、institute、faction、brightness、illumination、pale、accuse）须发包方先裁定补词入（词库新词先入再用），否则即使入模也无法渲染——卡面相应格在补词前仍为空，这是正确的“宁缺毋滥”，不是缺口。
6. **单文件离线约束**：主文件为单文件原型、数据内联。若离线使用要求数据必须进主文件，入模时把 `model/synonym_antonym.json` 内容内联为同一变量，仍以该 JSON 文件为源、主文件内联值为副本（WORDBANK 规则 3），不得在主文件里另维护一份手写清单。
