# 音变与词汇规律 18 条 · 核对记录（决策 25 扩展，HANDOFF §5.2 1e）

> 位置：单词身世总枢「🔤 格林定律」章之后新开一章「🔬 音变与词汇规律」（`src/patch_wo_rules.py`）。规律 1 复用 `wo_grimm_verner`，规律 3 复用 `wo_vowel_a`；其余 16 条每条一个新幕 `wo_rule_*`（内容稿 `content/wo_rule_*_1.txt`）。
> 核对规则（不编造）：每个例词的历史词形 / 来路要求 **Etymonline（经 Wayback 存档）和 Wiktionary 原始 wikitext 都写了**；规律本身的表述（时间、名称、谁提出）以 Wikipedia 对应条目为准。查不到的说法一律删掉或改弱（见「改弱 / 删掉」列）。

| # | 幕 | 例词（两处都对上） | 规律出处 | 改弱 / 删掉 |
|---|---|---|---|---|
| 1 | wo_grimm_verner | was/were；father/brother | Etymonline were；Wikipedia Verner's law | 见 GRIMM_GROUPS.md |
| 2 | wo_rule_gvs | house←hūs、name←nama、meet←mētan | Wikipedia Great Vowel Shift（1400–1700、meet /eː/） | bite：Etymonline 存档无快照，删 |
| 3 | wo_vowel_a | （原幕） | 原幕出处 | — |
| 4 | wo_rule_ablaut | sing/sang/sung、song←sing、ride←rīdan/rād/riden | Wikipedia Germanic strong verb | — |
| 5 | wo_rule_hgcs | water/Wasser、apple/Apfel、ten/zehn、make/machen | Wikipedia High German consonant shift | — |
| 6 | wo_rule_norse | skirt←ON skyrta（=shirt）、kirk←ON kirkja（=church）、dike/ditch | Etymonline | — |
| 7 | wo_rule_norman | war←ONF werre / OF guerre、wardrobe←ONF warderobe、guard/ward、guardian←OF gardien←Frankish *warding- | Etymonline | 「巴黎法语」改成「其他地方的古法语」 |
| 8 | wo_rule_french_s | forest/forêt、beast←beste/bête、hotel←hôtel←ostel、hospital←hospitale | Etymonline | 「现代法语加小帽子代替 s」查无出处，删 |
| 9 | wo_rule_register | cow←cū/beef←buef、sheep←scēap/mutton←moton、pork←porc（法语原义=动物）、ask/question←quaerere | Etymonline 各词条原义 | 不讲「诺曼贵族吃肉」的故事（无出处） |
| 10 | wo_rule_assim | impossible、illegal / irregular（Etymonline：assimilated form of in-）、arrive←ad ripam | Etymonline in- | — |
| 11 | wo_rule_tsl | south→southern、shade→shadow（pronounce→pronunciation 只见 Wikipedia） | Wikipedia Trisyllabic laxing（发生在 GVS 之前） | natural / national / wisdom / fifth：Etymonline 存档无快照，删 |
| 12 | wo_rule_metath | bird←bridd、third←þridda（Etymonline 写 metathesis）、horse←hros/hors、write←wrītan、knight←cniht | Etymonline | 不说「k、w 当年怎么读」（未找到出处），只说古英语里写着 |
| 13 | wo_rule_en_plural | oxen（Etymonline：唯一一直传下来的古英语弱复数）、children（cildru 再加 -en，双重复数） | Etymonline ox / child | — |
| 14 | wo_rule_greek | phone←phōnē、school←skholē、gym←gymnasium | Etymonline | — |
| 15 | wo_rule_usuk | colour/color、centre/center | Wikipedia（Webster、Johnson 1755） | 「更贴近读音」改成「主张改革拼写」 |
| 16 | wo_rule_latplural | cactus→cacti（也作 cactuses）、fungus→fungi、crisis→crises | Wiktionary + Wikipedia English plurals | Etymonline 未写复数，仅两处出处 |
| 17 | wo_rule_sc_sh | ship←scip、fish←fisc、sky←ON ský、skin←ON skinn | Etymonline | — |
| 18 | wo_rule_c_ch | cheese←cyse（德语 Käse）、chin←cin、church←cirice | Etymonline | 「c 碰到前元音」的条件未核出处，改成「一部分 c」 |

验收：16 幕 R1 缺 0（11–17 条 / 幕）、deterministic、0 报错；`app_check2.py wo wo_rule_<规律> 1` 16/16 v5、0 报错。
