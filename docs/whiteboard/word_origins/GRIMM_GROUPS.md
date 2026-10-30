# 格林定律规则组 · 同源词逐条核对（决策 25，HANDOFF §5.2 1d）
> 规则：英文词的 Etymonline 词条（或它指向的 PIE 词根页）和 Wiktionary 英语词条**都写了**同一个拉丁 / 希腊同源形，才放进白板幕。核对脚本思路：读 Etymonline（Wayback 存档）词条 → 取 PIE 词根 → 读词根页同源列表；Wiktionary 读原始 wikitext。规则本身（三组链式音变、s 后不变、维尔纳定律）出自 Wikipedia「Grimm's law」「Verner's law」。派生词（pedal、cardiac、unicorn、captain、dentist、fraternal、foreign）都在 Etymonline 对应词根页的「It might form all or part of」列表里。

| 组 | 英语 | 同源 | Etymonline | Wiktionary | 结论 |
|---|---|---|---|---|---|
| p → f | foot | 拉丁语 pes（ped-） | ped、pes | pes、ped | ✅ 入幕 |
| p → f | father | 拉丁语 pater | pater | pater | ✅ 入幕（规则组 ①） |
| p → f | fish | 拉丁语 piscis | — | piscis | ❌ Etymonline 词条正文与词根页都没写 piscis（只在 Wiktionary） |
| p → f | five | 希腊语 pente | — | — | ❌ 两处都没解析到希腊语 pente 字样 |
| p → f | few | 拉丁语 paucus | paucus | paucus | ✅ 入幕 |
| p → f | fire | 希腊语 pyr | — | pyr | ❌ Etymonline 未写 pyr 同源 |
| p → f | full | 拉丁语 plenus | plenus | plenus | ✅ 入幕 |
| t → th | three | 拉丁语 tres | tres | tres | ✅ 入幕 |
| t → th | thin | 拉丁语 tenuis | tenuis | tenuis | ✅ 入幕 |
| t → th | thunder | 拉丁语 tonare | tonare | tonare | ✅ 入幕 |
| t → th | thou | 拉丁语 tu | tu | tu | ➖ 对上（tu），但 thou 是古语，本幕未用 |
| k → h | heart | 拉丁语 cor / 希腊语 kardia | cor、kardia | cor | ✅ 入幕 |
| k → h | hundred | 拉丁语 centum | centum | centum | ✅ 入幕 |
| k → h | horn | 拉丁语 cornu | cornu | cornu | ✅ 入幕 |
| k → h | head | 拉丁语 caput | caput | caput | ✅ 入幕 |
| k → h | hound | 拉丁语 canis | — | — | ❌ 两处都没对上 canis |
| k → h | hill | 拉丁语 collis | collis | collis | ✅ 入幕 |
| kʷ → hw | what | 拉丁语 quod | quod | quod | ✅ 入幕 |
| kʷ → hw | who | 拉丁语 quis | quis | quis | ✅ 入幕 |
| kʷ → hw | where | 拉丁语 | qua、ubi | qua、ubi | ➖ 只对上 ubi / qua，词形对应不直接，弃用 |
| kʷ → hw | when | 拉丁语 | cum | quando、cum | ➖ 只对上 cum，不是直接对应，弃用 |
| d → t | two | 拉丁语 duo | — | duo | ❌ Etymonline duo 未出现在缓存正文 |
| d → t | ten | 拉丁语 decem | — | decem | ❌ Etymonline 缓存正文里没有 decem |
| d → t | tooth | 拉丁语 dens | dens、dent | dens、dent | ✅ 入幕 |
| d → t | eat | 拉丁语 edere | edere、edo | edo | ✅ 入幕 |
| d → t | sit | 拉丁语 sedere | sedere | sedere | ✅ 入幕 |
| d → t | tree | 希腊语 drys | — | doru | ❌ Etymonline 未写希腊语 drys / doru |
| g → k | knee | 拉丁语 genu | genu | genu | ✅ 入幕 |
| g → k | know | 拉丁语 (g)noscere | gnoscere | — | ❌ Wiktionary 英语词条未写 gnoscere |
| g → k | corn | 拉丁语 granum | — | granum | ❌ Etymonline 未写 granum |
| g → k | cold | 拉丁语 gelidus | gelu | gelu | ✅ 入幕 |
| g → k | kin | 拉丁语 genus | genus | genus | ➖ 两处对上（genus），但 kin 不在课标词表，本幕未用 |
| gʷ → kw | quick | 拉丁语 vivus | vivus | vivus | ➖ 两处对上（vivus），但拉丁语 v 再变一次，小学生难懂，本幕改用 queen / come |
| gʷ → kw | come | 拉丁语 venire | venire | venire | ✅ 入幕 |
| gʷ → kw | queen | 希腊语 gynē | gyne | gyne | ✅ 入幕 |
| bh → b | brother | 拉丁语 frater | frater | frater | ✅ 入幕 |
| bh → b | bear | 拉丁语 ferre | ferre、pherein | fero | ❌ Etymonline ferre 与 Wiktionary fero 词形不同，按规则不算对上 |
| bh → b | blow | 拉丁语 flare | — | — | ❌ 两处都没对上 flare |
| bh → b | beech | 拉丁语 fagus | fagus | fagus | ✅ 入幕 |
| bh → b | bloom | 拉丁语 flos | flos | flos | ✅ 入幕 |
| dh → d | door | 拉丁语 foris / 希腊语 thyra | foris、thyra | foris | ✅ 入幕 |
| dh → d | daughter | 希腊语 thygatēr | thygater | — | ❌ Wiktionary 英语词条未写 thygater |
| dh → d | do | 希腊语 tithēmi | tithenai | — | ❌ Wiktionary 英语词条未写 tithemi |
| dh → d | red | 拉丁语 ruber / 希腊语 erythros | erythros、ruber | ruber | ✅ 入幕 |
| dh → d | middle | 拉丁语 medius | medius | medius | ✅ 入幕 |
| gh → g | goose | 拉丁语 anser / 希腊语 khēn | anser、khen | anser | ✅ 入幕 |
| gh → g | guest | 拉丁语 hostis | — | hostis | ❌ Etymonline 未写 hostis |
| gh → g | garden | 拉丁语 hortus | hortus | hortus | ✅ 入幕 |
| 维尔纳定律 | father | 拉丁语 pater | pater | pater | ✅ 入幕（规则组 ①） |
| 维尔纳定律 | mother | 拉丁语 mater | mater | mater | ➖ 对上（mater）；维尔纳幕只引拼写 -th- 的说明 |
| 维尔纳定律 | were | was | was | was | ✅ 入幕 |
| 维尔纳定律 | lose | forlorn | forlorn | — | ❌ Wiktionary 英语词条未写 forlorn；维尔纳幕引 Wikipedia「Verner's law」 |

幕：`wo_grimm_voiceless`（① p t k → f th h，45 条，178 s）、`wo_grimm_voiced`（② d g gʷ → t k kw，29 条，121 s）、`wo_grimm_aspirate`（③ bh dh gh → b d g，31 条，130 s）、`wo_grimm_verner`（维尔纳定律，21 条，113 s）。
