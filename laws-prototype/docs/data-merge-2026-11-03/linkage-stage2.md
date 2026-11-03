# 知识联动阶段 2 落地报告：关系户口统一 + 相关规律统一渲染 + 对话词锚

2026-11-03。基线：远端 master `e520387`。工作克隆 `~/workspace/work-clones/linkage2`（未 commit、未 push，待主会话验收合并）。
依据：`laws-prototype/docs/data-merge-2026-11-03/knowledge-linkage-design.md` 阶段 2 + `linkage-stage1.md` 现状。

## 回报四数（先给结论）

- **统一户口总条数与构成**：**556 条** = 裁定型 47 条（`relations`，原文一字未动）+ 教学型 509 条（`relations_teaching`，同族 416 / 前置 57 / 对照 36，每条带 `kind` + `src:"lawdata-rel"` 来源标记），全部住 `laws_master.json` 一仓。派生面：LAWDATA 字面量逐字节不变（rel 改由总表派生，525,485 字符与改前全等）；专区 PN 57 + AR 53 + CJ 8 + LAWREG 40 = **158 条**派生 rel 注入专区数据——与普查「双户口规律的教学出边恰为 158 条」分毫不差。
- **三张清单**：查重 **0**（509 与 47 按（起点，终点）有序对交集 0、正反向交集亦 0；教学集内部重复三元组 0、同对多类型 0）；类型冲突 **0**；端点落空 **0**（556 条两端全部落在总表 456 条户口内）。
- **规律关系覆盖率前后**：有关系的规律 223 条（仅 LAWDATA 出边口径）→ **273 条 / 456 = 59.9%**（教学图 241 ∪ 裁定图 40）；能渲染关系的宿主页 **157 页 → 238 页**（LAWDATA 全条 157 + 专区页 81），且渲染内容从「仅出边教学」升级为分组全图（前置双向 / 同族·对照双向并集 / 裁定关联）。
- **对话锚命中数**：对话英文 distinct token **623**（口径：144 条对话的轮次 + 标题行）→ 锚定 **528**（原形直配 449 + 规则剥离 79）、功能词排除 **26**、未命中 **69**；144/144 条对话均有锚，（对话，词形）锚对共 **2,048**。

## 改动清单（6 文件）

| 文件 | 改动 |
|---|---|
| `model/laws_master.json` | 户口迁移：223 条规律的 `lawdata.rel` 迁出为记录级 `relations_teaching`（`{id, kind, src}`，原序保留）；GR-14 的空 `rel:[]` 一并清除。语义对账证明除此之外零字段改动（裁定型 `relations` 47 条原文不动） |
| `tools/gen_laws.py` | 新增 `teach_rel / lawdata_with_rel / strip_rel`：LAWDATA 全条目的 rel 改为从 `relations_teaching` 派生并深校验；`build_pn` / AR 构建 / `build_cj` 注入派生 rel（守卫改为剥 rel 比对 + 现行 rel 若在场须与派生一致）；`build_morph_data` 给 LAWREG 14 条注入 rel（总表无教学关系者删除副本自留 rel） |
| `model/morph_data.json` + `morphology-prototype-v1.html` | LAWREG 14 条新增 `rel` 字段（经 gen_laws→gen_morph 正规通道生成，两文件同步；语义对账：lawreg 之外零改动） |
| `tools/gen_links.py` | LINKIDX 新增四表：`g` 规律邻接（读统一户口）、`z` 专区现行页路由 82（自现行 PN/AR/CJ LAWS 与 LAWREG 字面量解析）、`c` 候选归一 17 对（自裁定关系机械导出）、`d` 对话词锚 144 条；LINKIDX 339,526 → 398,444 字符 |
| `mengxing-prototype-v1.html` | LINKGO 新增 `openLaw`（LAWDATA→专区 live→canon 兜底的统一开法）、`relSectionHTML`（相关规律统一渲染）、`anchorHTML / spWordsHTML / wordGo`（对话锚）；LAW.render 旧「亲戚条目」块被统一区取代（教师层路径同步）；MZ/PN/AR/CJ 规律页各加一处 relSectionHTML 调用；SP 场景页标题行与轮次行内锚 + 每条对话后加词行与二阶折叠 |

## 1. 关系普查与入册

- LAWDATA rel 509 条逐条核毕：条目全为 `{id, rel}`，类型分布同族 416 / 前置 57 / 对照 36，分布于 223 条规律；端点 100% 落总表户口（`NE-*` 等均为总表正式记录，非外部 id）。
- 统一结构：记录级并列双仓——`relations`（裁定型，47 条 `{id, rel:注记原文}`，本阶段一字未改）+ `relations_teaching`（教学型，`{id, kind, src}`）。选并列仓而非混编一表：裁定注记是 Stewart 裁定原文，混编必然触碰其结构；两仓同住一表一记录，生成器与索引统一消费，户口已归一。
- 查重口径（起点，终点，类型）：裁定型为自由注记、无三类型可比，故以（起点，终点）对查重——有序对交集 0、任一方向交集 0，无「重复合并为双来源」情形发生；同对端点类型冲突 0；教学集内部重复三元组 0、同对多类型 0。三张清单皆为实测零，非未检。
- 同族/对照的单向登记（同族 150 条、对照 20 条无反向原文）：**不回填数据**（守零编造），由索引层在 `g` 中取双向并集呈现（同族并集 283 对、对照并集 28 对，每条呈现边都至少在一个方向上有原文登记）；前置为有向关系，双向分别呈现（先学这个 / 学完这条可以学），方向语义经 C-02→C-01 实例核对（C-02 登记 C-01 为前置，C-01 为冠词基础条）。

## 2. 生成面改制

- LAWDATA：`build_lawdata` 非双户口分支改为「总表 lawdata 分仓（已无 rel）+ `lawdata_with_rel` 派生 rel（插回 pend 之后、prb 之前，既有字节位）」并深相等断言。结果：**LAWDATA 字面量与改动前逐字节相同**——户口搬了家，副本分毫未动，复习池 6 保池字段天然不受影响（另有 jsdom 全池字节自证，见验证节）。
- 专区：PN/AR/CJ 条目与 LAWREG 条目的 rel 一律由 `teach_rel()` 派生注入（键序为条目末位）；生成器守卫同步升级：内容本体剥 rel 比对、现行 rel 在场时须与派生深相等、LAWREG 总表无关系时副本 rel 强制清除。专区派生合计 158 条 = 双户口规律教学出边总数（这些规律的正页在专区，其关系此前只躺在 LAWDATA 分仓里、专区页不可见——本阶段正式接通）。

## 3. 规律页统一渲染「🔗 相关规律」

- 渲染点 5 处 / 5 个区：LAWDATA（LAW.render 主路径 + 教师层路径）、代词 PN、冠词 AR、连词 CJ、词根 MZ，统一走 `LINKGO.relSectionHTML(id, flavor)`，数据只读 LINKIDX.g（单一户口、单一渲染，无第二份关系存储）。
- 分组：⏳ 前置 · 先学这个（出边）/ ⏭️ 前置 · 学完这条可以学（入边）/ 👨‍👩‍👧 同族 / ⚖️ 对照着看 / 📜 裁定关联（类签 = 注记原文机械截取，悬停显示注记全文）。无任何关系的规律整区不渲染（冒烟以 S-01 实测）。
- 跨区直达 `LINKGO.openLaw(id)`：LAWDATA 有条目（含指针，指针自带分区跳转）→ LAW.open；专区现行页 → 按 `z` 路由 PN/AR/CJ.go、MZ.openLaw；无现行页的候选 id → `c` 归一兜底（如 NEW-P1 → PR-12、NEW-C → S-21）。呈现位候选（NEW-CJ03/08/09）因其专区页实存，live 路由优先于归一，落其呈现位页本身。冒烟实测跨区：代词区 GR-10 页点 GR-27 → 落 LAWDATA 页；GR-38 点 NEW-CJ03 → 落呈现位页。

## 4. 对话词锚

- 规则（写明，按序试探，剥离结果必须命中词库才算数）：
  R0 原形直配；R1 缩约取词头（i'm→i、that's→that）或 n't 取干（can't→can）；R2 -ies→-y；R3 -es 剥离；R4 -s 剥离（-ss 除外）；R5 -ing 剥离 / +e / 尾双字母去重（running→run）；R6 -ed 剥离 / 只剥 d / 去重；R7 -est、-er 剥离 / 去重。不规则变化（went→go 类）不在规则内，不锚。
- 命中账（distinct token 623）：原形 449；contract-head 15、n't-stem 1、strip-s 37、strip-ing 14、ing+e 2、ing-undouble 1、strip-es 3、strip-ed 2、ed-undouble 2、ies→y 2（规则命中计 528，含原形）；功能词排除 26（命中词库但 `wordbank.is_function_word` 有标记，含 the/can/what/when/yourself 等，按词库现成标记口径不锚）；未命中 69——构成实测：专名（Sarah/Mike/Beijing 等）、叹词（oh/aha/mmm）、单字母碎片（对话里的选项字母），及库外内容词（excuse、dropped、congratulations、practice、problem 等——drop/score/excuse 经核确实不在 2,473 词库，非规则缺口）。
- 与阶段 1 备忘口径差异说明：备忘「625 distinct / 464 在词库」为当时粗测（token 化口径未存档）；本阶段口径 = 轮次 + 标题行、token 正则 `[A-Za-z]+(?:'[A-Za-z]+)?`、小写折叠，实测 623 distinct、原形直配在库 475（449 锚定 + 26 功能排除中原形命中者）。数字以本报告口径为准。
- 产物与呈现：锚表为 LINKIDX.d（gen_links 管辖、GENERATED 标记、入门禁第 11 检）；SP 场景页标题行与每轮英文行内锚（虚线下划线，点词进词页，与整句点读以 stopPropagation 分工；无词页的词不伪装可点）；每条对话后加「🧩 这条对话里的词」芯片行。
- 对话↔规律只做二阶：词行下折叠区「经这个词关联的规律（对话本身没有语法标注，这里是经词页中转找到的）」，以「词 → 规律号」对呈现（每条对话至多 12 对），点规律号经 openLaw 直达。不给对话贴任何语法标注。
- 范围注记：场景问答 12 组无稳定 id（仅 title/q/a），本阶段未锚（需先立 id 户口，另行立项）；拍手歌 8 首不在本单「对话」范围，未锚。

## 5. LINKIDX 扩展对账

| 边 | 数 | 对账 |
|---|---|---|
| 教学关系（定向） | 509（前置 57 / 同族 416 / 对照 36） | = 总表 relations_teaching 逐条计数；生成器对端点逐条断言在册 |
| 裁定关系 | 47（出边 r 与入边 s 各 47） | = 总表 relations 逐条计数 |
| 同族并集 / 对照并集 | 283 对 / 28 对 | (416+150)/2、(36+20)/2，与单向登记数吻合 |
| g 覆盖规律 | 273 | = 教学图 241 ∪ 裁定图 40（交集 8） |
| z 路由 | 82 | = PN 33 + AR 21 + CJ 12 + LAWREG 16（现行字面量解析） |
| c 归一 | 17 对 | NEW-P1–P4、NEW-C/T、NEW-CJ02/04/05/06/07/10/11/12、NEW-CJ03/08/09 |
| d 对话锚 | 144 条 / 2,048 对 | 144 条对话全部有锚 |

阶段 1 旧边计数全部复现（拼读 11,375 对 / 词→规律 3,618 / 反转 3,255 / 词源 2,278 / 过关站 604 / TEC 89 个 id），无一漂移。

## 验证

- `tools/check_all.py` **11/11 全绿**（检数不变；gen_links 仍为第 11 检，gen_laws/gen_morph/gen_et/extract_review 等逐字节 PASS）。
- **复习池逐字节不变自证**：jsdom 实跑 `RV.buildPool()` 改前/改后全量 JSON 对比——1,796 题，855,045 字节，sha256 同为 `1c30f081…`。
- jsdom 冒烟 **35 过 / 1 伪影**（脚本 `/tmp/smoke-env/smoke_linkage2.js`）：五区各抽 1 条有关系规律，相关规律分组渲染 + 芯片点穿落点全对（E-01→E-02、GR-10→PR-15 同区 / GR-10→GR-27 跨区、C-02→C-01 前置、GR-38→NEW-CJ03 呈现位、V-33→V-35）；S-01 无关系整区不渲染；canon 兜底 NEW-P1→PR-12 落通；口语 SC01 行内锚 + 词行渲染、点 Nice 落 nice 词页、EXP_102 二阶折叠含明示口径、anchorHTML 对 dropped（库外）不成锚。唯一失败项为 canvas `font` 的 jsdomError——以原版 HEAD 同法对照，同错复现，系 jsdom 无 canvas 的既有伪影（阶段 1 已登记），与本次改动无关。
- 不变量：ET 1816/462 不变（gen_et 逐字节 PASS）；section 数同口径 69 → 69；script 块 24 个语法错误 0；总表除 rel 迁出外零字段改动（语义对账通过）；morph_data 除 LAWREG rel 外零改动（语义对账通过）。

## 纪律执行

- 关系零编造：556 条全部来自 LAWDATA rel 原文（迁册）与总表现有 relations（原文未改）；同族/对照只在呈现层取并集，不回填数据；屈折剥离只用上列写明规则，规则外一律不锚；功能词排除依据词库自有 `is_function_word` 标记，未自编名单。
- 生成段边界：户口迁移与派生全走 gen_laws / gen_links 正规通道并守 --check；手写编辑只落在 LINKGO 助手、五个渲染调用点、SP 渲染与 linkgo 样式等手写区，他人生成段（LAWDATA / 专区数据 / SP_DATA / ET 载荷）经各 gen_* --check 逐字节证明未被手改（LAWDATA 更是与改前全等）。
- 新代码避开 `window.PN` 等字面量（openLaw 用 `window[z]` 动态访问），未触发 gen_laws find_block 首命中脆弱点。
