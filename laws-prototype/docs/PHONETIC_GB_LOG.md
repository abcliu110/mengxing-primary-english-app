# 英式音标对照表 phonetic_gb 生产与收尾日志

- 文件：`laws-prototype/model/phonetic_gb.json`（与 wordbank.json 按 id 一一对应的旁表，合并由父级执行）
- 规模：2,287 条，与词库 id 集合双向对齐（gb∖wb = ∅，wb∖gb = ∅）
- 状态：**待核清零**（gb 空值 0 条）；本日志为收尾终版（2026-11-01）

## 1. 口径

- 目标口音：现代英式 RP（Received Pronunciation），宽式音标（broad transcription），斜杠包裹。
- 记法约定（全表统一）：无音节分点（不写 `.`）；非儿化——词尾及元音前以外的 r 不写，不用 `(r)` 标记（paper /ˈpeɪpə/、car /kɑː/、where /weə/）；词内元音之间的 r 保留（mirror /ˈmɪrə/、story /ˈstɔːri/，属 linking 位置）；次重音 ˌ 保留（如 /ˌɪrɪˈspɒnsəbəl/）；词尾 -y 用 happY 元音 /i/（与现代 RP 词典惯例一致）。
- 已知记法混用（登记，不属错误）：DRESS 元音有 /e/ 与 /ɛ/ 两种写法并存（ɛ 类 65 条，继承自词库 GA 字段原记法，如 alphabet /ˈælfəbɛt/），两者同指 DRESS 集合；弱位 GOOSE 用短 /u/（usual 第二音节、musician 的 /ju/ 等，与剑桥词典弱位写法一致）。如需严格统一为剑桥式 /e/，可另开一线做纯记法归一，不影响音值正确性。

## 2. GA→RP 转换规则表（规则转换类的口径，逐条）

| # | 规则 | 例（GA → RP） |
|---|---|---|
| R1 | LOT：GA 的 /ɑː/（拼写 o 的短读）→ RP /ɒ/；PALM/START 类 /ɑː/ 保留。两类不可凭拼写区分，凡涉案词均经词典核查，不走规则转换 | hot /hɑːt/ → /hɒt/；father /ˈfɑːðər/ → /ˈfɑːðə/ |
| R2 | GOAT：/oʊ/ → /əʊ/ | open /ˈoʊpən/ → /ˈəʊpən/；told /toʊld/ → /təʊld/ |
| R3 | 非儿化（弱读 -er）：词尾 /ər/ → /ə/ | paper /ˈpeɪpər/ → /ˈpeɪpə/；better /ˈbetər/ → /ˈbetə/ |
| R4 | 非儿化（长元音后 r）：/ɑːr/ → /ɑː/，/ɔːr/ → /ɔː/，/ɜːr/ → /ɜː/ | car /kɑːr/ → /kɑː/；heart /hɑːrt/ → /hɑːt/ |
| R5 | 非儿化（央元音化）：/ɪr/ → /ɪə/（NEAR），/eər/ → /eə/（SQUARE），/ʊr/ → /ʊə/（CURE，部分词归 /ɔː/ 逐词核） | here 类、where /weə/；hero 经终检修正为 /ˈhɪərəʊ/（见 §6） |
| R6 | BATH：GA /æ/ → RP /ɑː/ 只限词典裁决词表（ask/bath/class/dance/example/fast/grass/half/laugh/aunt 等）；同为 a 类拼写的 pants、grandpa 等是 TRAP 保留 /æ/——此类一律词典核查，严禁规则化 | grass /ɡræs/ → /ɡrɑːs/；pants /pænts/ → /pænts/（不换） |
| R7 | yod 保留：GA 在冠音（t/d/n/s/z）后脱落的 /j/，RP 恢复 | new /nuː/ → /njuː/；tune → /tjuːn/；news → /njuːz/（终检修正批，见 §6）；/l/ 后 RP 同样脱落，不恢复（glue /ɡluː/ 不动） |
| R8 | -sion 类：GA /ʒən/ 与 RP /ʃən/ 的分工逐词核（-sion 在 t 后多为 /ʃən/） | conversion /kənˈvɜːrʒən/ → /kənˈvɜːʃən/；tension /ˈtɛnʃən/ 两式同 |
| R9 | 其余同形保留：GA 与 RP 一致的音系（KIT/FLEECE/GOOSE 长元音、FACE/PRICE/CHOICE、MOUTH、辅音系统）原样保留 | wreath /riːθ/ → /riːθ/；brown /braʊn/ → /braʊn/ |

规则转换只适用于 R1–R5、R9 中无歧义的机械对应；凡 LOT/PALM/BATH 分界、CURE 归属、yod、-sion 分工等不可规则化处，一律进词典核查类。

## 3. basis 分类统计（终版）

| basis | 条数 | 说明 |
|---|---|---|
| 规则转换 | 1,418 | 按 §2 规则由 GA 机械转换且无歧义者 |
| 词典核查 | 801 | Wiktionary UK/RP 条目逐词核（含 Collins 佐证、合成/派生条目及终检修正条目） |
| 词典核查·剑桥 | 68 | 剑桥词典在线 UK IPA 逐词核（收尾阶段新增 66 条：原待核 65 + koala 终检移交） |
| 待核 | **0** | 清零 |

（收尾前分布：规则转换 1,442 / 词典核查 767 / 剑桥 2 / 待核 76。差额 = 待核 76 条销项 + 终检修正 45 条的 basis 归并。）

## 4. 核查方法与来源

- 主源：剑桥词典在线（dictionary.cambridge.org）UK IPA——检索结果页直接呈现 uk/us 对照行时以 UK 行为准；注意剑桥在线版的 linking-r 上标 ʳ 在文本抽取时会被压平成普通 r（如 colour 呈现 /ˈkʌl.ər/），一律按本表口径归一为 /ə/ 并去掉音节分点。
- 辅源：Wiktionary（en.wiktionary.org）UK/RP 标注条目（前线已完成 767 条）；Collins British English、LDOCE 英式、OED 英式用作交叉佐证（剑桥个别条目不呈现 IPA 行时启用，并在 source 中如实注明实际来源，不冒名剑桥）。
- 佐证词库：本地英式发音词库（窄式转写，含 ɹ/ɐ 等窄式符号）只作旁证，永不直接作填值来源。
- 合成/派生：专名短语与复合词在剑桥无整条目时，以剑桥已核的组成部分合成，并在 source 注明（如 Mid-Autumn Day = mid + autumn + day）；规则派生（复数、比较级、-ing）注明派生路径。
- 纪律：两家词典均查不到才允许保留 gb 空 + 待核 + source 写明渠道与原因——本次无一条需要动用此兜底，76 条全部取到可核值。

## 5. 待核终局清单：清零（76/76 销项）

构成：约 57 条为 Wiktionary 抓取失败改查剑桥；19 条为「骨架不一致自动挂起」逐条人工签核（理由见各行 source，典型：grandfather 剑桥值无 /d/、sandwich 的 d 不发音作 /ˈsænwɪdʒ/、eraser 英式 /z/ 对美式 /s/、number 挂起值漏 /b/ 已驳回、champ 挂起值 /ʃ/ 系误读已驳回、laser 挂起值 /s/ 系拼读式误读已驳回）。

| 词 | 终值（RP） | basis |
|---|---|---|
| a / an | /ə/ /eɪ/ /ən/ /æn/ | 词典核查·剑桥 |
| amphibious | /æmˈfɪbiəs/ | 词典核查·剑桥 |
| birthplace | /ˈbɜːθpleɪs/ | 词典核查·剑桥 |
| boil | /bɔɪl/ | 词典核查·剑桥 |
| bookshop | /ˈbʊkʃɒp/ | 词典核查·剑桥 |
| boy | /bɔɪ/ | 词典核查·剑桥 |
| campfire | /ˈkæmpfaɪə/ | 词典核查·剑桥 |
| castles | /ˈkɑːsəlz/ | 词典核查·剑桥 |
| champ | /tʃæmp/ | 词典核查·剑桥 |
| champagne | /ʃæmˈpeɪn/ | 词典核查·剑桥 |
| champion | /ˈtʃæmpiən/ | 词典核查·剑桥 |
| colour | /ˈkʌlə/ | 词典核查·剑桥 |
| colourful | /ˈkʌləfəl/ | 词典核查·剑桥 |
| concerto | /kənˈtʃɜːtəʊ/ | 词典核查·剑桥 |
| crosswalk | /ˈkrɒswɔːk/ | 词典核查·剑桥 |
| dictionaries | /ˈdɪkʃənəriz/ | 词典核查·剑桥 |
| enjoy | /ɪnˈdʒɔɪ/ | 词典核查·剑桥 |
| eraser | /ɪˈreɪzə/ | 词典核查·剑桥 |
| every | /ˈevri/ | 词典核查 |
| everywhere | /ˈevriweə/ | 词典核查·剑桥 |
| eyeglass | /ˈaɪɡlɑːs/ | 词典核查·剑桥 |
| firework | /ˈfaɪəwɜːk/ | 词典核查·剑桥 |
| granddaughter | /ˈɡrændɔːtə/ | 词典核查·剑桥 |
| grandfather | /ˈɡrænfɑːðə/ | 词典核查·剑桥 |
| grandpa | /ˈɡrænpɑː/ | 词典核查·剑桥 |
| grandparent | /ˈɡrænpeərənt/ | 词典核查·剑桥 |
| grandparents | /ˈɡrænpeərənts/ | 词典核查·剑桥 |
| guava | /ˈɡwɑːvə/ | 词典核查 |
| handbag | /ˈhændbæɡ/ | 词典核查·剑桥 |
| handcraft | /ˈhændkrɑːft/ | 词典核查 |
| hard-working | /ˌhɑːdˈwɜːkɪŋ/ | 词典核查·剑桥 |
| history | /ˈhɪstəri/ | 词典核查·剑桥 |
| hopping | /ˈhɒpɪŋ/ | 词典核查 |
| hotdog | /ˈhɒtˌdɒɡ/ | 词典核查·剑桥 |
| hotter | /ˈhɒtə/ | 词典核查 |
| immature | /ˌɪməˈtʃʊə/ | 词典核查·剑桥 |
| joy | /dʒɔɪ/ | 词典核查·剑桥 |
| karma | /ˈkɑːmə/ | 词典核查·剑桥 |
| laser | /ˈleɪzə/ | 词典核查·剑桥 |
| libraries | /ˈlaɪbrəriz/ | 词典核查·剑桥 |
| Mid-Autumn Day | /ˌmɪd ˈɔːtəm deɪ/ | 词典核查 |
| moderate | /ˈmɒdərət/ | 词典核查·剑桥 |
| Mr | /ˈmɪstə/ | 词典核查·剑桥 |
| newspaper | /ˈnjuːzˌpeɪpə/ | 词典核查·剑桥 |
| number | /ˈnʌmbə/ | 词典核查·剑桥 |
| pants | /pænts/ | 词典核查·剑桥 |
| pencil-box | /ˈpensəlbɒks/ | 词典核查 |
| perspective | /pəˈspektɪv/ | 词典核查·剑桥 |
| pianos | /piˈænəʊz/ | 词典核查·剑桥 |
| ping-pong | /ˈpɪŋˌpɒŋ/ | 词典核查·剑桥 |
| point | /pɔɪnt/ | 词典核查·剑桥 |
| postcard | /ˈpəʊstkɑːd/ | 词典核查·剑桥 |
| sandstorm | /ˈsændstɔːm/ | 词典核查·剑桥 |
| sandwich | /ˈsænwɪdʒ/ | 词典核查·剑桥 |
| schoolyard | /ˈskuːljɑːd/ | 词典核查·剑桥 |
| seahorse | /ˈsiːhɔːs/ | 词典核查 |
| spacecraft | /ˈspeɪskrɑːft/ | 词典核查·剑桥 |
| spaceman | /ˈspeɪsmæn/ | 词典核查 |
| sparrowgrass | /ˈspærəʊɡrɑːs/ | 词典核查 |
| stormy | /ˈstɔːmi/ | 词典核查·剑桥 |
| storybook | /ˈstɔːribʊk/ | 词典核查·剑桥 |
| sunglasses | /ˈsʌŋɡlɑːsɪz/ | 词典核查·剑桥 |
| tablecloth | /ˈteɪbəlklɒθ/ | 词典核查·剑桥 |
| Teachers' Day | /ˈtiːtʃəz deɪ/ | 词典核查 |
| teamwork | /ˈtiːmwɜːk/ | 词典核查·剑桥 |
| theatre | /ˈθɪətə/ | 词典核查·剑桥 |
| tired | /taɪəd/ | 词典核查·剑桥 |
| toilet | /ˈtɔɪlət/ | 词典核查·剑桥 |
| traffic | /ˈtræfɪk/ | 词典核查·剑桥 |
| unpopular | /ʌnˈpɒpjələ/ | 词典核查·剑桥 |
| very | /ˈveri/ | 词典核查·剑桥 |
| voice | /vɔɪs/ | 词典核查·剑桥 |
| voyage | /ˈvɔɪɪdʒ/ | 词典核查·剑桥 |
| washroom | /ˈwɒʃruːm/ | 词典核查·剑桥 |
| workplace | /ˈwɜːkpleɪs/ | 词典核查·剑桥 |
| zookeeper | /ˈzuːˌkiːpə/ | 词典核查·剑桥 |

## 6. 终检修正（45 条）

终检阶段（格式扫描 + 模式自洽抽验 + 类别横扫）另发现并修正 45 条**非待核**条目的 GA/窄式残留，全部改为词典 RP 值并在 source 中留痕：

- oʊ 残留 1：koala（同时移交剑桥 basis）。
- NEAR 类误作 GA 式 /ɪr/ 3：hero、heroes、zero。
- 韵尾 r 残留 1：inboard（原值沿 Wiktionary 美式重音与 r 音）。
- LOT 误写 /ɔ/ 单独成音 7：job、cot、cost、rock、lot、lost、oil（oil 另漏双元音第二成分）。
- 其他窄式/拼写式残留 8：wrong /ræŋ/→/rɒŋ/、coin、noise（误标重音且 o 代 ɔ）、drawing /ˈdroːrɪŋ/、four /for/、tomorrow（混入 ASCII "ou"）、careful、carefully（eː 代 eə）。
- 重音 GOOSE 误写短 /u/ 13：news、pneumonia、include、remove、crucial、parachute、illusion、typhoon、bridegroom、movable、bamboo、university、ensue。
- yod 脱落未恢复 12：news（上行兼计）、new、New Year、tune、tube、due、duty、Tuesday、suit、supermarket、student、stupid、stupidity（news 重复计数，净 44+heroes 随附 = 45 条）。

| 词 | 终值（RP） | source（留痕） |
|---|---|---|
| bamboo | /ˌbæmˈbuː/ | 终检修正：原值 /bæmˈbu/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| bridegroom | /ˈbraɪdɡruːm/ | 终检修正：原值 /ˈbraɪdɡrum/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| careful | /ˈkeəfl/ | 终检修正：原值 /ˈkeːfl/ 为窄式长单音 eː，RP SQUARE 类作 /eə/ |
| carefully | /ˈkeəfəli/ | 终检修正：原值 /ˈkeːfəli/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| coin | /kɔɪn/ | 终检修正：原值 /ˈkoɪn/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| cost | /kɒst/ | 终检修正：原值 /kɔst/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| cot | /kɒt/ | 终检修正：原值 /kɔt/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| crucial | /ˈkruːʃəl/ | 终检修正：原值 /ˈkruʃəl/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| drawing | /ˈdrɔːɪŋ/ | 终检修正：原值 /ˈdroːrɪŋ/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| due | /djuː/ | 终检修正：原值 /duː/ 沿 GA 的 yod 脱落形，RP 保留 /j/（剑桥·Collins RP 值） |
| duty | /ˈdjuːti/ | 终检修正：原值 /ˈduːti/ 沿 GA 的 yod 脱落形，RP 保留 /j/（剑桥·Collins RP 值） |
| ensue | /ɪnˈsjuː/ | 终检修正：原值 /ɪnˈsu/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| four | /fɔː/ | 终检修正：原值 /for/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| hero | /ˈhɪərəʊ/ | Collins British English /ˈhɪərəʊ/；终检修正：规则转换保留了 GA 式 /ɪr/，RP 为 NEAR 类 /ɪə/ |
| heroes | /ˈhɪərəʊz/ | 随 hero 修正：Collins British hero /ˈhɪərəʊ/ 复数加 /z/ |
| illusion | /ɪˈluːʒən/ | 终检修正：原值 /ɪˈluʒən/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| inboard | /ˈɪnbɔːd/ | 终检修正：原值沿 Wiktionary 美式 /ɪnˈbɔːɹd/ 的重音与 r 音；RP 按剑桥 board /bɔːd/、outboard /ˈaʊtbɔːd/ 词族取 /ˈɪnbɔːd/ |
| include | /ɪnˈkluːd/ | 终检修正：原值 /ɪnˈklud/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| job | /dʒɒb/ | 终检修正：原值 /dʒɔb/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| koala | /kəʊˈɑːlə/ | 剑桥词典（Cambridge Dictionary）UK 条目：koala；终检修正：原词典核查值误存 GA 形 /koʊˈɑːlə/（oʊ 残留） |
| lost | /lɒst/ | 终检修正：原值 /lɔst/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| lot | /lɒt/ | 终检修正：原值 /lɔt/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| movable | /ˈmuːvəbəl/ | 终检修正：原值 /ˈmuvəbəl/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| new | /njuː/ | 终检修正：原值 /nuː/ 沿 GA 的 yod 脱落形，RP 保留 /j/（剑桥·Collins RP 值） |
| New Year | /njuː jɪə/ | 终检修正：原值 /nuː jɪə/ 沿 GA 的 yod 脱落形，RP 保留 /j/（剑桥·Collins RP 值） |
| news | /njuːz/ | 终检修正：原值 /nuz/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| noise | /nɔɪz/ | 终检修正：原值 /ˈnoɪz/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| oil | /ɔɪl/ | 终检修正：原值 /ɔl/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| parachute | /ˈpærəʃuːt/ | 终检修正：原值 /ˈpærəʃut/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| pneumonia | /njuːˈməʊniə/ | 终检修正：原值 /nuˈməʊniə/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| remove | /rɪˈmuːv/ | 终检修正：原值 /rɪˈmuv/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| rock | /rɒk/ | 终检修正：原值 /rɔk/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| student | /ˈstjuːdnt/ | 终检修正：原值 /ˈstuːdnt/ 沿 GA 的 yod 脱落形，RP 保留 /j/（剑桥·Collins RP 值） |
| stupid | /ˈstjuːpɪd/ | 终检修正：原值 /ˈstuːpɪd/ 沿 GA 的 yod 脱落形，RP 保留 /j/（剑桥·Collins RP 值） |
| stupidity | /stjuːˈpɪdəti/ | 终检修正：原值 /stuˈpɪdəti/ 沿 GA 的 yod 脱落形，RP 保留 /j/（剑桥·Collins RP 值） |
| suit | /sjuːt/ | 终检修正：原值 /suːt/ 沿 GA 的 yod 脱落形，RP 保留 /j/（剑桥·Collins RP 值） |
| supermarket | /ˌsjuːpəˈmɑːkɪt/ | 终检修正：原值 /ˌsuːpəˈmɑːkɪt/ 沿 GA 的 yod 脱落形，RP 保留 /j/（剑桥·Collins RP 值） |
| tomorrow | /təˈmɒrəʊ/ | 终检修正：原值 /təˈmɒrou/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| tube | /tjuːb/ | 终检修正：原值 /tuːb/ 沿 GA 的 yod 脱落形，RP 保留 /j/（剑桥·Collins RP 值） |
| Tuesday | /ˈtjuːzdeɪ/ | 终检修正：原值 /ˈtuːzdeɪ/ 沿 GA 的 yod 脱落形，RP 保留 /j/（剑桥·Collins RP 值） |
| tune | /tjuːn/ | 终检修正：原值 /tuːn/ 沿 GA 的 yod 脱落形，RP 保留 /j/（剑桥·Collins RP 值） |
| typhoon | /taɪˈfuːn/ | 终检修正：原值 /taɪˈfun/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| university | /ˌjuːnɪˈvɜːsəti/ | 终检修正：原值 /junɪˈvɜːsəti/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| wrong | /rɒŋ/ | 终检修正：原值 /ræŋ/ 为窄式/GA 残留形，改从剑桥·Collins RP 标准值 |
| zero | /ˈzɪərəʊ/ | Collins British English /ˈzɪərəʊ/；终检修正同 hero（NEAR 类 /ɪə/，非 GA 式 /ɪr/） |

## 7. 五模式自洽抽验（成员词含模式音素比例，GA 口径 → GB 口径）

成员名单取自 `model/phonics_wordsets.json`（与终版词库对齐后的成员级词集）；GA 侧按等价音素计（LOT 计 /ɑ/、GOAT 计 /oʊ/、NEAR 计 /ɪr/、er 计 /ɜ/）。

| 模式 | 目标音素 | 成员数 | GA 含等价音素 | GB 含目标音素 | 残差说明 |
|---|---|---|---|---|---|
| GP-o-ɒ | /ɒ/ | 107 | 81（75.7%） | **107（100%）** | 终检前 7 条 LOT 误写 /ɔ/ 已修正（见 §6） |
| GP-ow-əʊ | /əʊ/ | 27 | 27（100%） | **27（100%）** | tomorrow 的 ASCII 残留已修正 |
| GP-ear-ɪə | /ɪə/ | 13 | 12（92.3%） | **13（100%）** | — |
| GP-o-əʊ-open | /əʊ/ | 72 | 72（100%） | 71（98.6%） | yogurt：RP 正值 /ˈjɒɡət/（GA /ˈjoʊɡərt/）——模式归属按 GA 拼写-读音建立，属口径差而非错误，登记保留 |
| GP-er | /ɜː/ | 16 | 16（100%） | 14（87.5%） | clerk /klɑːk/、derby /ˈdɑːbi/：英式 er→/ɑː/ 的著名例外，gb 为正值，模式层应登记为例外而非改值 |

另抽查规则转换类 50 条（随机种子固定）逐条过目：oʊ→əʊ、ər→ə 等转换均正确落地，无 GA 残留（如 told /təʊld/、cello /ˈtʃɛləʊ/、OK /ˌəʊˈkeɪ/、noticeable /ˈnəʊtɪsəbəl/）。

## 8. 典型样例对账

| 词 | 词库 GA | 对照表 RP | basis | 说明 |
|---|---|---|---|---|
| hot | /hɑːt/ | /hɒt/ | 词典核查 |
| father | /ˈfɑːðər/ | /ˈfɑːðə/ | 词典核查 |
| grass | /ɡræs/ | /ɡrɑːs/ | 词典核查 |
| conversion | /kənˈvɜːrʒən/ | /kənˈvɜːʃən/ | 词典核查·剑桥 |
| bath | /bæθ/ | /bɑːθ/ | 词典核查 |
| car | /kɑːr/ | /kɑː/ | 词典核查 |
| pants | /pænts/ | /pænts/ | 词典核查·剑桥 |
| heart | /hɑːrt/ | /hɑːt/ | 词典核查 |
| example | /ɪɡˈzæmpl/ | /ɪɡˈzɑːmpəl/ | 词典核查 |
| laugh | /læf/ | /lɑːf/ | 词典核查 |
| water | /ˈwɔːtər/ | /ˈwɔːtə/ | 词典核查 |
| better | /ˈbetər/ | /ˈbetə/ | 词典核查 |

- **schedule**：不在词库（2,287 条中无此条目），无从对账；如后续入词库，英式正值为 /ˈʃedjuːl/（美式 /ˈskedʒuːl/），入模时须走词典核查。
- **conversion**（SR-06 锚点词，本轮补入词库）：GA /kənˈvɜːrʒən/ → RP /kənˈvɜːʃən/，-sion 在 t 后读 /ʃ/，与 tension/pension 同型，剑桥条目直核。
- **pants**：BATH 陷阱词——拼写同类而 RP 仍为 /pænts/，R6 规则明确禁止对此类词规则化。

## 9. 交付状态

- `phonetic_gb.json`：2,287 条，gb 空值 0，格式自检通过（全部以 / 开头结尾；oʊ/ɚ/ɝ/(r)/音节分点残留均为 0；词尾 r 残留扫描通过，保留的 r 均为元音间 linking 位置或 /x/ 等正值）。
- 本日志即终版生产记录。合并入 wordbank.json（按 id 回填、校验零字段外溢）由父级执行。
