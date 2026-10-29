# 词源 / 格林定律 / 词根词缀 覆盖率报告（决策 25、26）

> 审计：2026-10-30 01:15 JST。目标词库 = 主 HTML `VOCAB_DB` **1487 词**（G1 66、G2 83、G3 130、G4 206、G5 296、G6 204 课标词 + V6 扩展 500 + 多义 2；`MH_VOCAB_DB` 22 词是其子集）。
> 方法：逐词抓 Wiktionary 英语词条（1487/1487，33 个多词短语无词条），解析词源段模板（inh / der / bor / cog / affix / suffix / prefix / compound）。**以下「候选」都是自动筛出的，入库前逐条用 Etymonline / Wiktionary 核对，核不实的标 ❓ 或不入库。**

## 一、之前（现状）

| 类别 | 现有 | 说明 |
|---|---|---|
| 有出处的词源 | 身世标签 8 词（port 家族）+ 溯源幕 7 个（port、Europe、Bluetooth、格林定律、元音变异 3 幕、时间与度量 2 幕） | `VOCAB_DB.etymology` 1487 条里：「秒懂巧记小故事」985、记忆锦囊模板约 445、其他约 55——**是记忆法，不是词源，全部没有出处**；部分说法有误（如「ear 加 h = hear」） |
| 格林定律配对 | 11 条（SOURCES ④）：p→f 1（foot）、t→th 1（three）、d→t 3（tooth、ten、two）、k→h 3（hundred、heart、hound）+ 定义 / 历史 / 例外 3 条 | **缺** b→p、g→k、kʷ→hw、gʷ→kw、bh→b、dh→d、gh→g 全部 7 组；维尔纳定律只有一句「有例外」；father / mother 等被刻意跳过 |
| 词根词缀 | `affix_root`：积木拆词 748、基础独体 235、其他 504（多为家族串记，不全是真拆分）；`WORD_FORMATION_DB` 合成 25、前缀 20、后缀 12、家族 10、词根 6；`ETYMOLOGY_TREES` 5；`MORPH_DERIVATIONS` 70 | 没有出处；有伪拆分 |

## 二、满足条件的候选（自动筛出，待逐条核）

| 类别 | 候选数 | 来源 |
|---|---|---|
| 有可靠词源 | **1263**（另 66 条词源注明「不详 / 有争议」→ 标 ❓；33 个多词短语按组成词处理） | Wiktionary 词源段有来源模板 |
| 本族词（古英语来的） | 1001 | inh ang / enm |
| 借自拉丁 / 希腊 / 法语 | 432 | der / bor |
| 格林定律候选（本族词且列出拉丁 / 希腊 / 梵语同源词） | **255** | 其中 76 条按词首辅音自动归组，179 条需人工判断（对应在词中或词尾，如 eight / octo、five / pente、mother / mater、cow / bos） |
| 词根词缀可拆（Wiktionary 有拆分模板） | 391 | affix / suffix / prefix / compound |
| 合成词（两半都在词库里） | 95 | 自动切分 |

### 格林定律：按规则组的自动候选（词首辅音）

| 规则 | 现有 | 候选数 | 候选举例（待核） |
|---|---|---|---|
| p→f | foot | 14 | feather, feed, felt, few, fight, find, fire, first, fish, floor, fly, food, for, friend |
| t→th | three | 5 | thank, thin, think, three, thunder |
| k→h | hundred, heart, hound | 14 | hand, hat, have, head, heart, hen, high, hill, hold, home, honey, horn, horse, house |
| kʷ→hw | — | 3 | what, when, why |
| d→t | tooth, ten, two | 7 | talk, teach, toe, tooth, tree, true, two |
| g→k | — | 11 | care, choose, club, cold, comb, cool, corn, cost, king, knee, know |
| gʷ→kw | — | 1 | quick |
| bh→b | — | 12 | bake, bean, bear, bed, bee, birth, black, blow, blue, bread, brother, brown |
| dh→d | — | 3 | day, door, dry |
| gh→g | — | 6 | garden, get, gift, goose, grass, yellow |
| 维尔纳定律 | 无 | 待人工 | father、mother、hundred（-d）、was / were |

## 三、单词其他维度（决策 26，同一批数据）

| 维度 | 现有 | 词库内候选 |
|---|---|---|
| 同音词 | HOMOPHONES_DB 12 组、LIST 16、30 词版 30 | Wiktionary 标出词库内同音 52 词 |
| 反义词 / 近义词 | 反义 24 / 50、近义 11 | 有反义 387 词、有近义 1116 词 |
| 多义词 | has_polysemy 17 | 2 个以上义项 1329 词（3 个以上 1180） |
| 最小对立 | 4 组 | 词库内音标只差一个音的词对 786 对 |
| 搭配 | collocations.verbs 1291 条其实是例句、196 条空；adjs 881 条是模板 | 需重做 |

## 四、之后

（分批补齐后逐批填写：每类入库条数、❓ 条数、未入库条数及原因。）
