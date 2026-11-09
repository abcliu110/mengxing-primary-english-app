# 同义／反义数据层 · 第一批（4 旗舰词）交付说明

> 执行日期：2026-11-09 · 任务：TODO 1.2（4 张手工词卡同义／反义 8 字段）· 任务书：`docs/synonym-antonym-datalayer-brief.md`
> 交付物：`docs/work-2026-11-09/synonym_antonym_batch1.json`（本说明的“JSON”）、本说明、`synonym_antonym_apply.md`
> 核源时间：2026-11-09；所引均为当日打开的词典条目页（URL 见 JSON 内 `sources`，条目级）。

## 1. 收词数与分账

| 词 | bank_id | 义项数 | 状态 | 在库已核关系 | 查无（checked_none）关系位 | 待核关系位 |
|---|---|---|---|---|---|---|
| school | G2_081 | 5 | verified | 0 | 10 | 0 |
| play | G2_0489 | 4 | 待核 | 2 | 4 | 2 |
| light | G4_157 | 4 | 待核 | 4 | 2 | 2 |
| charge | ADD_0446 | 4 | 待核 | 0 | 7 | 1 |
| **合计** | — | **17** | **verified 1／待核 3** | **6** | **23** | **5** |

- 关系位口径：每义项 2 个位（同义位＋反义位），17 义项共 34 位；其中已核 6 位、查无 23 位、待核 5 位。
- 义项口径：play、charge 的义项沿用义项网络（`model/verb_sense_networks_a.json`，n 1–4）；school、light 的义项按一级词典（OALD、Cambridge）划分，限小学＋初中范围——light 本页 A2“明亮的；浅色的”按 OALD／Cambridge 拆为两义（本批义项 2 明亮的、义项 3 浅色的），因两义同义不同（明亮义 bright、浅色义 pale）、不可合并。
- 在库已核 6 条（义项级，均一级＋二级双源互证）：
  - play 打（球）义 — 同义 compete（near）
  - play 弹奏义 — 同义 perform（near）
  - light 明亮义 — 同义 bright（near）、反义 dark（gradable）
  - light 浅色义 — 反义 dark（gradable）
  - light 轻义 — 反义 heavy（gradable）
- 状态口径说明：本批 `status` 的 verified＝该词全部义项均已裁定且无待核项（有已核关系，或逐义项查无）；待核＝该词至少有一关系位单源待核。play、light、charge 的已核关系本身已达双源互证，可单独取用，整词标待核只因另有关系位未达标（见 §5）。

## 2. out_of_bank 清单（库外伙伴，须发包方裁定是否补词入再补挂）

### 2.1 已核（双源互证，可入模前提是先补词入）

| 伙伴词 | 挂在哪义 | 关系 | 分级 | 证据（均不含线索级来源） |
|---|---|---|---|---|
| academy | school S1 学校（机构） | 同义 | near | Cambridge 词库 school（place for instruction 组）＋ Collins 词库 school 义 1 |
| institute | school S1 学校（机构） | 同义 | near | Cambridge 词库 school（place for instruction 组）＋ Collins 词库 school 义 1 |
| faction | school S4 学派 | 同义 | near | Cambridge 词库 school（group of people who think alike 组）＋ Collins 词库 school（a group assembled for a common purpose 组） |
| brightness | light S1 光；电灯 | 同义 | near | Cambridge 词库 light（BRIGHTNESS 组）＋ Collins 词库 light 名词义组＋ Merriam-Webster 词库 brightness 页反向列 light（三源） |
| illumination | light S1 光；电灯 | 同义 | near，formal | Cambridge 词库 light（BRIGHTNESS 组，标 formal）＋ Merriam-Webster 词库 illumination 页反向列 light |
| pale | light S3 浅色的 | 同义 | near | Longman pale 条目义 2（SYN light，反向）＋ Collins pale 词条（(of a colour) 义组列 light，反向） |
| accuse | charge V4 指控 | 同义 | near | OALD charge 动词 with crime 义释义（to accuse somebody formally…）＋ Collins 词库 charge（accuse 义组）＋ Merriam-Webster 词库 charging/charged 页（accusing 组） |

### 2.2 未达标候选（不录入关系，仅登记备查）

| 伙伴词 | 挂在哪义 | 关系 | 现状与缺口 | 建议 |
|---|---|---|---|---|
| discharge | charge V3 充电 | 反义 | 单源：仅 Merriam-Webster 词典 charge 条目释义内提及（in the opposite direction to that of discharge）；OALD 充电义无 opposite 标注，Collins 词库无充电义组，Longman 未能打开核对 | 补查 Longman 充电义；确认后补词入再挂。只挂“充电”义，与“收费”义无关 |
| lightweight | light S4 轻的 | 同义 | 单源：仅 Cambridge 词库 NOT WEIGHING MUCH 组；OALD／Collins／Merriam-Webster 未见登记 | 补第二来源后再议 |
| frolic | play V1 玩耍 | 同义 | 双源但一级一侧为间接共现：Cambridge“amuse oneself”词库页同义组内 play 与 frolic 共现（非 play 条目直接列出）＋ Collins 词库 play 动词义 1 直接列 frolic | 请发包方复核间接共现是否算一级互证；算则补词入再挂 |
| drama | play N1 戏剧 | 同义 | 二级双源、缺一级：Collins 词库 play 名词义 2＋ Merriam-Webster 词库 play 名词 drama 组；OALD／Cambridge 未见同义登记 | 补一级来源后再议 |

## 3. 分歧清单（两说并记，未擅自裁定）

| 词／义项 | 两说 | 处理 |
|---|---|---|
| school S1／college | Collins 列 college 为 school（儿童受教育地）同义；Cambridge 词库未列 college。另 OALD 注明 school 在北美口语中可指大学 | 未录 college，待发包方裁定 |
| school S4／group | Collins 列 group 为 school（学派义）同义；Cambridge 未单列 group，且词库 group（V6_学校_47）义为“小组”、义项不匹配 | 未录 group，待发包方裁定 |
| school S4／doctrine | Cambridge 与 Collins 均列 doctrine 于 school-of-thought 义组；但 doctrine 指学说本身、school 指持此说的人群，边界存疑 | 未录 doctrine，待发包方裁定 |
| light S2／bright | Cambridge 词库列 bright 为 light（明亮义）同义，Longman bright 条目词库框反向列 light；Collins 词库 full of light 组未列 bright（列 brilliant/glowing/sunny/illuminated/luminous） | 按一级双源收录 bright，Collins 未列记为异议、不构成否定 |
| charge V1／bill | Merriam-Webster 词库把 billed 列入 charge（索价义）同义组；Collins 把 bill 列入记账义（enter a debit）同义组；无一级词典列 bill 为 charge 同义 | 未录 bill；另见 JSON 内 charge V1 confusion_notes（bill＝记账义，非索价义） |

## 4. checked_none 清单（已查两家一级＋一家二级，确无可登记关系）

共 23 个关系位（义项×同义／反义），每位的所查词典见 JSON 内对应 `relation_verdict`。汇总如下：

- **school（10 位，全词 5 义项×2 位）**：S1 同义（在库；库外 academy/institute 已核，见 §2.1）／反义；S2 全体师生同义／反义；S3 校舍同义／反义；S4 学派同义（在库；库外 faction 已核）／反义；F1 鱼群同义／反义。所查：Cambridge 词库、OALD school_1、Collins 词库。
- **play（4 位）**：V1 玩耍同义（在库；库外 frolic 见 §2.2）；V2 打（球）反义；V3 弹奏反义；N1 戏剧反义。所查：OALD play 动词／名词条目、Cambridge 词库 play、Collins 词库 play、Merriam-Webster 词库 play。
- **light（2 位）**：S1 光同义（在库；库外 brightness/illumination 已核）；S3 浅色同义（在库；库外 pale 已核）。所查：Cambridge 词库 light、OALD light_1/light_2、Collins 词库 light。
- **charge（7 位）**：V1 收费同义／反义；V2 负责同义／反义；V3 充电同义；V4 指控同义（在库；库外 accuse 已核）／反义。所查：OALD charge_2、Cambridge 词库 charge、Collins 词库 charge、Merriam-Webster 词典／词库 charge。

未录入但曾核查的在库候选（有词典提及、因义项／词性不合而排除）：

- play V1：fun（OALD 词库框列出，但为名词，与动词义项词性不合）；entertain、rest（Merriam-Webster to recreate 组列出，但 entertain＝使别人娱乐、rest＝休息，与“玩耍”义项不合）；have fun（短语，非词库词）。
- light S1：sunlight、daylight（Cambridge BRIGHTNESS 组列出，但为光的种类、不可与 light 互换）；lamp（Collins 列于“发光器具”义组，器具非同义）。
- school S2：student、pupil（指单个学生，不是“全体师生”集合义）。
- school S3：building（上位词，未见任何词典列为同义）。
- charge V1：cost、price、fee（Cambridge 词库所列为名词 charge“费用”义的同义，本批义项为动词“收费”，词性不合）；pay cash（Cambridge 美语词库所列反义为短语，非单词）。
- school F1：shoal（仅聚合站／词典词源注 Compare with shoal，未见允许来源列为同义）。

## 5. 待核清单与原因（5 个关系位，单源，均未写入 JSON 关系数组）

| 词／义项 | 关系位 | 候选伙伴 | 已有来源 | 缺什么 |
|---|---|---|---|---|
| play V1 玩耍 | 反义 | work（V6_职业_1） | OALD play 动词义 1 释义内对比（to enjoy yourself, rather than work）及例句（There's a time to work and a time to play） | 缺第二独立来源以反义栏明列；Cambridge／Collins／Merriam-Webster 均未见反义登记 |
| play N1 戏剧 | 同义 | show（V6_日常_38） | Collins 词库 play 名词义 2 单源 | 缺第二来源；Merriam-Webster drama 组未列 show，OALD／Cambridge 未见登记 |
| light S1 光；电灯 | 反义 | darkness（G6_0858） | OALD light_1 条目例句内对比（many more hours of darkness than light）；Collins blackness 词条反向列 light（不同 headword） | 缺一级词典以反义栏明列；Cambridge 词库 BRIGHTNESS 组无反义，Collins 词库 light 名词义反义栏为空 |
| light S4 轻的 | 同义 | lightweight（库外） | Cambridge 词库 NOT WEIGHING MUCH 组单源 | 缺第二来源；OALD／Collins／Merriam-Webster 未见登记 |
| charge V3 充电 | 反义 | discharge（库外） | Merriam-Webster 词典 charge 条目释义内提及单源 | 缺一级词典以反义栏明列；OALD 无标注，Collins 无充电义组，Longman 未能打开核对 |

## 6. 被排除的义项与口径（不收，不逐词出记录）

- **light 动词义“点燃／照亮”**（light a fire；light up）：词库词性为 n./adj.，本页义项图无动词义项，本批不收。反义 put out 一类亦不在本批。
- **light 名词义“火焰／打火机”（a light）、“眼神／见解”等**：超小学＋初中范围，不收。
- **light 形容词义“不强烈的”（light rain/wind）、“不严重的”、“少量的”**：超本批收词范围（本页 A2 只含明亮／浅色），不收。
- **school 动词义“教育／训练”（to educate or train）**：词库词性为 n.，本页为名词页，动词义不收（Collins 动词义组列 train/educate 等，均与本批无关）。
- **charge “冲锋／猛冲”（rush/attack）、“充满感情”等义**：超小学＋初中范围，不收。
- **play “扮演角色／假装／（比赛）上场”等义**：义项网络未收（网络仅 n 1–4），本批以网络为准，不另立义项。

## 7. 字段规格问题（执行中发现，须发包方定）

1. **partner_sense_n 暂定**：本批 6 条在库关系中，伙伴词尚无自己的同义／反义记录，`partner_sense_n` 按词库 `meaning` 打包义序暂定为 1（如 dark 的词库义打包“黑暗的，暗的；深色的”，light S2 明亮义取其“暗的”一半、S3 浅色义取其“深色”一半，两义共用编号 1）。伙伴词逐词建记录时须复核对齐，入模校验器应以此为准绳。
2. **对称闭合本批无法机检**：brief §4.3 要求义项级互反闭合，但本批只含 4 词记录，伙伴词（compete、perform、bright、dark、heavy）均无本批记录，闭合须待伙伴词扩批补录后校验。JSON 内各条已核关系均已注明来源，供反向补录时复核。
3. **scope 机械判定规则**（本批执行口径，写出备审）：Dolch 有值 → primary_ok；课标一级 → primary_ok、二级 → junior_ok；其余按 `freq_rank`：≤3000 primary_ok、3001–10000 junior_ok、＞10000 或无值 adult_only。后果：ADD 系伙伴词（freq_rank 均为空）一律落 adult_only，如 compete。建议发包方补 ADD 系频次数据或另定阈值。
4. **status 口径**：本批 verified＝全词义项均已裁定且无待核项（见 §1 说明）。若发包方要求“有已核关系即 verified”，则 play、light 应改标 verified 并另列待核项——请裁定。
5. **Longman 未能全程打开**：Longman（ldoceonline.com）本次仅 dark、bright、pale 三条反向条目可查；charge、play、light、school 的 Longman 主条目未能打开核对。checked_none 结论以实际查到的 OALD＋Cambridge＋Collins（／Merriam-Webster）三家为准，Longman 不计入已查来源。
6. **Thesaurus 聚合站、WordNet、培训“替换表”只作线索**：核查中见到的 thesaurus.com、WordNet 派生站（dsynonym、wordcadet、infoplease 等）、bab.la（Oxford Languages 数据聚合）、freethesaurus 镜像、WordReference 词库均未写入任何 `sources`；其中 bab.la 的 Oxford Languages 内容亦按聚合站处理，未作一级证据。
7. **confusion_notes 只写了 4 条**：charge V1（bill＝记账义）、charge V4（accuse 一般指责 vs charge 正式指控）、play V2（compete 只覆盖比赛框）、play V3（perform 更宽，含演戏／跳舞）。其余义项无词典辨析栏依据可写，按 brief 宁可不写。
