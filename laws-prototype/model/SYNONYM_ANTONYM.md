# 同义 / 反义数据层（活文档）

> 事实源：`laws-prototype/model/synonym_antonym.json`（本批 4 条记录，2026-11-09 第一批）
> 任务书：`docs/synonym-antonym-datalayer-brief.md`；交付说明：`docs/work-2026-11-09/synonym_antonym_batch1_notes.md`；
> 落位说明：`docs/work-2026-11-09/synonym_antonym_apply.md`
> 生成器：`laws-prototype/tools/gen_synonym.py`（`--check` / `--write`）；主文件内嵌副本：`var SYNANT`（词汇模块 IIFE 内，`var WEXTRA` 行之后，带 GENERATED 标记）
> 总账登记：`laws-prototype/model/README.md` 第 19 行

## 规模（第一批，2026-11-09）

| 词 | bank_id | 义项数 | 状态 | 在库已核关系 | 查无关系位 | 待核关系位 |
|---|---|---|---|---|---|---|
| school | G2_081 | 5 | verified | 0 | 10 | 0 |
| play | G2_0489 | 4 | 待核 | 2 | 4 | 2 |
| light | G4_157 | 4 | 待核 | 4 | 2 | 2 |
| charge | ADD_0446 | 4 | 待核 | 0 | 7 | 1 |
| 合计 | — | 17 | verified 1／待核 3 | 6 | 23 | 5 |

- 在库已核 6 条（义项级，均一级＋二级双源互证；即 JSON 里 `synonyms` / `antonyms` 数组中实际列出的关系）：
  - play 打（球）义 — 同义 compete（near）
  - play 弹奏义 — 同义 perform（near）
  - light 明亮义 — 同义 bright（near）、反义 dark（gradable）
  - light 浅色义 — 反义 dark（gradable）
  - light 轻义 — 反义 heavy（gradable）
- 状态口径：整词 `status` 的 verified＝该词全部义项均已裁定且无待核项；待核＝至少有一关系位单源待核。play、light、charge 的已核关系本身已达双源互证，可单独取用（见 notes §1）。

## 渲染口径（展示层只读本层，不手写第二份清单）

- 两条渲染路径共用同一查表渲染函数（主文件词汇模块 IIFE 内，`openCard` 之前）：
  - 动态模板 `openCard()`：同义／反义卡改读 `SYNANT`，按 `bank_id`（WLIST 行第 21 列 `r[20]`）取记录，按义项分组呈现全部已核关系。
  - 4 张手工旗舰卡（play / charge / light / school）：同义／反义格 `<td id="sa-<词>-syn|ant">`，由 `fillFlagshipSynAnt()` 在模块加载时按同一函数回填；静态 HTML 里不存清单。
- 只呈现 JSON 数组里实际列出的关系（即 6 条已核关系）。`checked_none`（23 位）与待核（5 位：play V1 反义 work、play N1 同义 show、light S1 反义 darkness、light S4 同义 lightweight、charge V3 反义 discharge）不进展示层；库外已核 7 条（academy、institute、faction、brightness、illumination、pale、accuse）因词未入词库，本次不挂，只留在 notes §2.1。
- 无已核关系的格写「暂无已核同义」/「暂无已核反义」，不留「待补」字样；无记录的词（本批之外）同样处理。
- 义项级红线：heavy 只挂 light「轻的」义、discharge 只挂 charge「充电」义（discharge 本批待核，不进展示层）。
- 伙伴词一律渲染为可点芯片（`VC.openCard(<WLIST 下标>)`，数字下标，不在 onclick 里传文本）；伙伴词在词库中无词页时只列词形、不出死按钮（`bankIdx` 查不到时退为 off 芯片）。
- scope 提醒：6 条中 compete 为 `adult_only`（按 notes §7.3 的机械判定：ADD 系伙伴词 freq_rank 为空），其余 5 条为 `primary_ok`。本次按 1.2 验收结论 6 条全量呈现；compete 是否只在成人层呈现，待 Priya 裁定（见下「待裁定」）。

## 生成口径

- 内嵌副本 `var SYNANT` 是事实源的逐字副本（同一 JSON 数组单行序列化，`</` 转义），不是手写清单；改数据只改 `model/synonym_antonym.json`，再跑 `python3 laws-prototype/tools/gen_synonym.py --write`。
- 生成器断言（任一不过即 FAIL，不写回）：记录字段齐全；每条关系带出处；伙伴词 `bank_id` 必须在词库（`model/wordbank.json` 的 `id`）中解析到、词形与词库一致；`partner_sense_n` 为 ≥1 的整数；记录按词形排序、bank_id 唯一。
- 对称闭合暂不能机检：本批只含 4 词记录，伙伴词（compete、perform、bright、dark、heavy）均无本批记录，闭合须待伙伴词扩批补录后校验（notes §7.2）。
- `check_all.py` 暂未接入本生成器（保持 24 项不变）；校验时单独跑 `gen_synonym.py --check`。是否接入 check_all 由总协调人定。

## 待裁定（转自 notes §7，未擅自裁定）

1. `partner_sense_n` 暂定：伙伴词尚无自己的同义／反义记录，编号按词库 `meaning` 打包义序暂定为 1（如 dark 的两义共用编号 1）；伙伴词逐词建记录时须复核对齐。
2. 对称闭合本批无法机检（见上）。
3. scope 机械判定规则（Dolch→primary_ok；课标一级→primary_ok、二级→junior_ok；其余按 freq_rank ≤3000 primary_ok、3001–10000 junior_ok、＞10000 或无值 adult_only）：ADD 系伙伴词一律落 adult_only，建议补 ADD 系频次数据或另定阈值。
4. status 口径：若要求「有已核关系即 verified」，则 play、light 应改标 verified 并另列待核项——请裁定。
5. Longman 本次仅 dark、bright、pale 三条反向条目可查；charge、play、light、school 的 Longman 主条目未能打开核对。
6. compete（adult_only）是否只在成人层呈现，待 Priya 裁定；本次 6 条全量呈现。
7. 库外已核 7 条（academy、institute、faction、brightness、illumination、pale、accuse）须先补词入词库再补挂；另有 4 条未达标候选（discharge、lightweight、frolic、drama）见 notes §2.2。

## 变更日志

- 2026-11-09 第一批入模：4 词 17 义项 6 条已核关系（play 2、light 4；school、charge 本批无可展示关系）；生成器 `gen_synonym.py` 新建，主文件 `var SYNANT` + 共享渲染函数 + 旗舰卡回填 + 动态模板接线。
