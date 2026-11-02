# 词源数据层交付说明（etymology.json）

## 一、收词总账

- 词库总词数：2,473 条。
- **收录进 etymology.json：2278 条**（verified 1757 + 待核 521；2026-11-02 审计后修复轮次的最新口径，全程见第十节）。
- **未收（无词源可考/不单独立档）：195 条**，只在本说明里列清单，不进 JSON（用户口径：有则有、无则无，不强行建立）。
- verified 的来源等级构成：二级双源互证 536 条；一级＋二级双源互证 1209 条；一级＋三级互证 12 条。
- verified 里复用 ETYM_DB 既有已核链作事实底稿的：487 条；其余 1270 条为数据层建设与修复轮次新核。
- （本节数字为 2026-11-02 修复轮次后的最新口径。此前口径沿革：初建 verified 804（见第八节）→ 同形异词普查订正 801、未收 192→195（第九节）→ 审计后修复轮次 verified 1757、待核 521（第十节）。）

## 二、待核分账（2026-11-02 主干一致口径重跑后）

重跑处理 1,234 条：主干一致者 956 条升 verified 并按新标准建档；保持待核 278 条的 pending_reason 已按新口径改写（类别如下）；最低频 C 档 243 条未处理，仍保留原口径原因（chain_unparsable / morph_only / chain_mismatch / chain_too_short），逐字未动，留待后续轮次。

- `compositional`：201 条
- `chain_unparsable`：105 条
- `morph_only`：98 条
- `chain_mismatch`：38 条
- `origin_unknown`：27 条
- `trunk_unsettled`：15 条
- `single_source`：13 条
- `trunk_divergent`：7 条
- `evidence_gap`：5 条
- `origin_unconfirmed`：4 条
- `motivation_unsettled`：2 条
- `chain_too_short`：2 条
- `sources_split`：2 条
- `form_of_be`：1 条
- `form_of_rise`：1 条

待核全表（词｜原因，以 etymology.json 各条 pending_reason 字段为准）：

- actress｜compositional（主干复核后）：actor + -ess（阴性后缀）透明派生，现代词义「女演员」由构词直接可读（1580 年代「做事的女子」、1700 年舞台义为同一构式的义项定型）；词源叙事在 actor 本词，待核保持
- afternoon｜compositional（主干复核后）：after + noon 透明复合（约 1300)，现代词义由构词直接可读、无历史漂移；词源叙事归形态层，待核保持
- against｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- aircraft｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- airline｜morph_only：构词拆分（air + line）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- airmail｜compositional（主干复核后）：构词透明（air + mail），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- airplane｜morph_only：构词拆分（air + plane）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- airport｜morph_only：构词拆分（air + port）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- already｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- angrily｜compositional（主干复核后）：构词透明（angry + -ly（angrily 的基词 angry 与 angr 的关系在他档）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- angry｜compositional（主干复核后）：anger + -y 透明派生（14 世纪末），现代词义即「有怒气的」由 anger 直接可读，无独立漂移链；词源叙事在 anger 本词，待核保持
- antiseptic｜morph_only：构词拆分（anti- + septic）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- anybody｜compositional（主干复核后）：构词透明（any + body），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- anyone｜compositional（主干复核后）：any + one 复合，古英语以来即两词并用，1844 年才合写；构件自明，本词不单独立档，保持待核
- anywhere｜compositional（主干复核后）：构词透明（any + where），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- armchair｜compositional（主干复核后）：构词透明（arm + chair），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- autobus｜single_source（主干复核后）：法语 autobus 借入／auto- + bus 构词仅 Wiktionary 一源成录，Etymonline、牛津无词条；未达双源门，保持待核
- bachelor｜trunk_unsettled（主干复核后）：「a word of uncertain origin」（Etymonline、牛津一致）。三候选并立无定论：中世纪拉丁语 baccalarius「无地佃农」（或出 vacca「牛」，Kitchin 说）、baculum「棍棒」（侍从练棍说）、凯尔特语源说（Wedgwood）；Century Dictionary 谓或为数词混同，保持待核
- bad｜origin_unknown（主干复核后）：c. 1300 前罕见、1400 年前几无亲属词可寻（Etymonline：It has no apparent relatives in other languages）。古英语贬词 bæddel 缩略说三家皆仅作 perhaps/possibly；Wiktionary 另立古诺尔斯语 *badą「麻烦」借词说，无主干可对，保持待核
- badge｜origin_unknown（主干复核后）：三源一致认定来源未定——牛津与 Etymonline 同标 unknown origin（盎格鲁-法语 bage／盎格鲁-拉丁语 bagia「徽记」更上无源）；Wiktionary 提出的原始日耳曼语 *baugaz「环」仅属推测（possibly），无可互证主干，保持待核
- badminton｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- baker｜compositional（主干复核后）：bake + -er 行为人名词，古英语 bæcere 已成词（日耳曼语 *bakārijaz）；构件自明，本词不单独立档，保持待核
- bakery｜morph_only：构词拆分（bake + -ery）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- baseball｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- basketball｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- bat｜trunk_unsettled（主干复核后）：两词同形须分线——bat「球棒」古英语 batt 或出凯尔特语（威尔士语 bat「杖」），后受古法语 batte 强化；bat「蝙蝠」为 16 世纪末中古英语 bakke（斯堪的纳维亚来源）的改形，其与古诺斯语 blaka「拍打」的关联 Wiktionary 明言 unclear。两线皆未定，保持待核
- bathroom｜morph_only：构词拆分（bath + room）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- beautiful｜morph_only：构词拆分（beauty + -ful）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- bedroom｜compositional（主干复核后）：构词透明（bed + room，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- bedtime｜morph_only：构词拆分（bed + time）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- been｜form_of_be（主干复核后）：been 是 be 的过去分词（古英语 (ġe)bēon），形史本身无争议；但 be 为多词根拼合的异干互补动词（*h₁es-／*bʰuH-／*h₂wes- 三系），本库未收 be 的主干词条，been 的深层谱系无从附着，待 be 立档后随附
- beige｜origin_unknown（主干复核后）：古法语 bege「未染色羊毛与棉的本色」（13 世纪）两家一致，但终极来源未明（牛津：of unknown ultimate origin；Etymonline：of obscure origin）；Wiktionary 阿尔卑斯语源经 *bysseus「棉灰」一线为推测链，不足作主干，保持待核
- bell｜origin_unconfirmed（主干复核后）：古英语 belle，日耳曼语内仅见低地一线同源（余皆借词）；Etymonline 拟印欧语拟声根 *bhel-「吼、鸣」（perhaps，与 bellan「吼」相联）；孤证拟声说未获互证，保持待核
- below｜morph_only：构词拆分（be- + low）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- bet｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- big｜origin_unknown（主干复核后）：三源一致认定来源未定——牛津明标 of unknown origin，Etymonline 称 obscure origin、或为斯堪的纳维亚方言来源（挪威语 bugge「大人物」），Wiktionary 仅给出 *bugja-「肿起」的推测链；无可互证的主干，保持待核
- bike｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- birthplace｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- blackberry｜compositional（主干复核后）：black + berry 透明复合（古英语 blaceberian)，因果色得名，构词理据现代仍透明；词源叙事归形态层，待核保持
- blackbird｜morph_only：构词拆分（black + bird）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- blackboard｜morph_only：构词拆分（black + board）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- blueberry｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- bookcase｜compositional（主干复核后）：构词透明（book + case），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- bookmark｜morph_only：构词拆分（book + mark）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- bookshop｜compositional（主干复核后）：构词透明（book + shop），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- bookstore｜morph_only：构词拆分（book + store）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- boy｜origin_unknown（主干复核后）：牛津与 Etymonline 均明标来源未定；Wiktionary 另立日耳曼语 *bōjô「幼弟」一线，余有古法语 embuie「戴镣者」说与 Liberman「拟声词＋昵称」混合说，并存而无主干互证，保持待核
- brunch｜morph_only：构词拆分（breakfast + lunch）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- building｜compositional（主干复核后）：build + -ing 动名词（约 1300 年「建筑物」义、14 世纪晚期「建造过程」义），构件自明，本词不单独立档，保持待核
- busily｜morph_only：构词拆分（busy + -ly）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- businessman｜morph_only：构词拆分（business + -man）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- butterfly｜motivation_unsettled（主干复核后）：切分 butter + fly 自古英语 buttorflēoge 以来无争议，然命名理据三说并存且皆无定论——（女巫化蝶）偷食黄油的旧信、常见种翅色奶黄、排泄物色（荷兰语同源词 boterschijte）；Etymonline 亦言 of obscure signification。切分成立而理据未定（半透明），保持待核
- buzz｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- campfire｜morph_only：构词拆分（camp + fire）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- candlelight｜compositional（主干复核后）：构词透明（candle + light），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- candlestick｜compositional（主干复核后）：构词透明（candle + stick，古英语 candelsticca 已成词，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- cello｜morph_only：构词拆分（violoncello）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- centimetre｜single_source（主干复核后）：法语 centimètre 借入（centi- + metre）仅 Wiktionary 一源成录，Etymonline、牛津无词条；未达双源门，保持待核
- champ｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- champagne｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- changeable｜compositional（主干复核后）：构词透明（change + -able，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- chav｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- chemistry｜morph_only：构词拆分（chemist + -ry）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- chick｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- china｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- chosen｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- classmate｜morph_only：构词拆分（class + -mate）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- classroom｜morph_only：构词拆分（class + room）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- cleaner｜compositional（主干复核后）：构词透明（clean + -er），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- clearly｜compositional（主干复核后）：clear + -ly 副词（约 1300 年「清楚地」，1560 年代生「显然」义），构件自明，本词不单独立档，保持待核
- clever｜trunk_unsettled（主干复核后）：「手巧」义（1580 年代）与「脑聪」义（1704）三源一致，但祖先词未有定论——东盎格鲁方言 cliver「善抓取」、东弗里斯兰语 klüfer、挪威方言 klover（或经中古低地德语 klever「粘着」一线）诸说并存，另有古诺斯语 kleyfr「易劈」说；无可互证的单一主干，保持待核
- clickable｜compositional（主干复核后）：构词透明（click + -able（网络时代新构）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- climber｜compositional（主干复核后）：构词透明（climb + -er），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- climbing｜compositional（主干复核后）：构词透明（climb + -ing（动名词常规构成）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- coconut｜morph_only：构词拆分（coco + nut）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- coexist｜compositional（主干复核后）：co- + exist 透明构词（1670 年代；晚期拉丁语 coexistere 为同构平行），现代词义由构词直接可读、无历史漂移；词源叙事在 exist 本词，待核保持
- colourful｜compositional（主干复核后）：构词透明（colour + -ful），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- commercial｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- computer｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- cosmic｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- countryside｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- crosswalk｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- cuff｜origin_unknown（主干复核后）：中古英语 cuffe「手套、连指手套」；牛津两义皆作 of unknown origin，Etymonline 谓或出中世纪拉丁语 cuffia「头巾」（of uncertain origin, perhaps ultimately from Greek)，Wiktionary 作 of obscure origin。无互证主干，保持待核
- cupcake｜morph_only：构词拆分（cup + cake）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- cute｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- daddy｜morph_only：构词拆分（-y）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- daily｜compositional（主干复核后）：day + -ly 透明派生（古英语 dæġlīċ 以来），现代词义由构词直接可读、无历史漂移；词源叙事归形态层，待核保持
- dance｜origin_unknown（主干复核后）：经古法语 dancier（12 世纪）入英（约 1300)，然法语词本身来历不明——牛津与 Wiktionary 均作 of unknown/uncertain origin；Etymonline 拟低地法兰克语 *dintjan（perhaps，与古弗里斯语 dintje「颤动」相联）仅一家之拟，无第二家互证主干，保持待核
- dancer｜compositional（主干复核后）：构词透明（dance + -er），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- dark｜origin_unconfirmed（主干复核后）：古英语 deorc 出日耳曼语 *derkaz，深层来历未定——Etymonline 明言 of uncertain etymology，Wiktionary 拟印欧 *dʰerg-「暗淡」作 possibly，牛津作 probably distantly related to German tarnen「隐藏」；拟测未获互证，保持待核
- darkness｜compositional（主干复核后）：dark + -ness 抽象名词（古英语 deorcnes「无光」），构件自明、本义无转折，本词不单独立档，保持待核
- day｜trunk_divergent（主干复核后）：古英语 dæg「日间；一生」与日耳曼语 *dagaz 本身确凿；印欧层分歧——Watkins 作 *agh-「一天」且谓日耳曼语 d- 来源 obscure，Boutkan 作 *dʰegʷʰ-「燃烧」；两家主干不合，保持待核
- daydream｜compositional（主干复核后）：构词透明（day + dream），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- daylight｜morph_only：构词拆分（day + light）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- daytime｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- deeply｜compositional（主干复核后）：构词透明（deep + -ly，古英语 dēoplīċe 已成词，比喻义为常规引申），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- derby｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- development｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- dirty｜morph_only：构词拆分（dirt + -y）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- disappear｜compositional（主干复核后）：dis-（表逆转）+ appear 构成（15 世纪早期），仿法语 disparaître，曾顶替本土 fordwīnan；构件自明，本词不单独立档，保持待核
- disconnect｜compositional（主干复核后）：构词透明（dis- + connect），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- dislike｜compositional（主干复核后）：dis- + like 混合构词（1540 年代），曾顶替本土词 mislike；构件自明，本词不单独立档，保持待核
- dodge｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- dodger｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- doe｜origin_unknown（主干复核后）：古英语 dā，牛津与 Etymonline 均作来源未明（Etymonline 另拟凯尔特语借词说）；Wiktionary 则上溯日耳曼语 *daihā、印欧根 *dʰeh₁(y)-「哺乳」（母鹿说）。两系处理互不相容，无两家互证主干，保持待核
- dog｜origin_unknown（主干复核后）：英语词源著名悬案——牛津明标 of unknown origin，Etymonline 称其为「英语词源最大的谜团之一」：古英语 docga 晚出且罕见，本指一种强壮犬种，16 世纪挤走通语 hund（今 hound）成为通名；任何谱系说均无实据，保持待核
- doll｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- downstairs｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- downtown｜morph_only：构词拆分（down + town）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- dragonfly｜compositional（主干复核后）：构词透明（dragon + fly（比喻命名，构词透明）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- drawing｜compositional（主干复核后）：构词透明（draw + -ing（动名词常规构成）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- driven｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- driver｜compositional（主干复核后）：drive + -er 行为人名词（14 世纪晚期，最早义「赶牲口的人」），构件自明，本词不单独立档，保持待核
- drunk｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- duckling｜compositional（主干复核后）：构词透明（duck + -ling），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- dumpling｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- dwelling｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- earphone｜compositional（主干复核后）：构词透明（ear + phone），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- earthquake｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- earthworm｜compositional（主干复核后）：earth + worm 透明复合（约 1400)，现代词义由构词直接可读（古英语另有 eorðmata、regnwyrm「雨虫」旧名）；词源叙事归形态层，待核保持
- easily｜compositional（主干复核后）：构词透明（easy + -ly），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- eighteen｜compositional（主干复核后）：eight + -teen（ten 的弱化形）复合数词，古英语 eahtatīene、日耳曼语 *ahtōutehun 两源一致；构件自明，本词不单独立档，保持待核
- eighth｜compositional（主干复核后）：eight + -th 序数词（古英语 eahtoþa 一线），构件自明，本词不单独立档，保持待核
- eighty｜compositional（主干复核后）：eight + -ty（「十」组后缀）复合数词（古英语 hundeahtatiġ 一线），构件自明，本词不单独立档，保持待核
- electrician｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- email｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- enable｜morph_only：构词拆分（en- + able）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- ending｜compositional（主干复核后）：现代形 end + -ing 完全透明；古英语已有 endung「终结」同源名词，但现代构词透明，词源叙事归形态层，待核保持
- enjoyable｜compositional（主干复核后）：构词透明（enjoy + -able），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- eraser｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- eventful｜compositional（主干复核后）：构词透明（event + -ful），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- everybody｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- everyone｜compositional（主干复核后）：构词透明（every + one），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- everything｜morph_only：构词拆分（every + thing）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- exactly｜morph_only：构词拆分（exact + -ly）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- exam｜single_source（主干复核后）：examination 的学生俚语截短（1848）仅 Etymonline 一源成录，牛津词源栏无载、Wiktionary 无语源节；未达双源门，保持待核
- excitement｜compositional（主干复核后）：构词透明（excite + -ment），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- eyebrow｜compositional（主干复核后）：eye + brow 复合（15 世纪早期；同构的古英语 ēagbrǣw 本指「眼皮」），构件自明，本词不单独立档，保持待核
- eyeglass｜compositional（主干复核后）：构词透明（eye + glass），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- eyelash｜compositional（主干复核后）：构词透明（eye + lash），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- eyesight｜compositional（主干复核后）：构词透明（eye + sight），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- fairground｜morph_only：构词拆分（fair + ground）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- fancy｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- faster｜compositional（主干复核后）：构词透明（fast 的比较级（常规屈折）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- feeling｜compositional（主干复核后）：feel + -ing 动名词（12 世纪晚期「触摸、触觉」义，14 世纪中期生「情感」义，15 世纪中期生「看法」义），构件自明，本词不单独立档，保持待核
- fence｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- fifteen｜compositional（主干复核后）：five + -teen 的数词构式，古英语 fīftīene 以来构词透明、词义无漂移，现代词仍是「五加十」的活构式（与全数词同一口径）；词源叙事归形态层，待核保持
- finally｜compositional（主干复核后）：构词透明（final + -ly），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- firefighter｜compositional（主干复核后）：构词透明（fire + fighter），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- firefly｜compositional（主干复核后）：fire + fly 透明描形复合（1650 年代），因虫体发光得名，构词理据现代仍透明；词源叙事归形态层，待核保持
- fireman｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- fireplace｜compositional（主干复核后）：构词透明（fire + place），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- firework｜compositional（主干复核后）：构词透明（fire + work），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- fisherman｜compositional（主干复核后）：构词透明（fisher + man），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- fishing｜compositional（主干复核后）：构词透明（fish + -ing，动名词常规构成，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- fit｜chain_too_short：来源链只对上一站且信息量不足（只到中古英语同形等），不足以立档
- flag｜origin_unknown（主干复核后）：牛津与 Etymonline 均标来源未定（OED 谓或为拟声的「飘动」造词，亦有接日耳曼语 *flaką「扁平物」说），无可互证主干，保持待核
- flashlight｜morph_only：构词拆分（flash + light）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- floss｜origin_unknown（主干复核后）：1759 年「粗丝」义；Etymonline 作 of uncertain origin——或出法语 floche ← 拉丁语 floccus（本身 of unknown origin），或为未载的古英语/古诺斯语 fleece 词根方言存留；牛津作 of unknown origin。无互证主干，保持待核
- flu｜morph_only：构词拆分（influenza）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- fog｜trunk_unsettled（主干复核后）：1540 年代「浓雾」义；来源未定——或 foggy 的逆构（foggy 又出 fog「高草、苔沼」一线），或直接借斯堪的纳维亚语（丹麦语 fog「飞沫、雪团」、古诺斯语 fjúka「吹」出日耳曼语 *feukaną）；牛津作 perhaps a back-formation，两路未合，保持待核
- foggy｜morph_only：构词拆分（fog + -y）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- football｜morph_only：构词拆分（foot + ball）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- footprint｜compositional（主干复核后）：构词透明（foot + print，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- forecast｜morph_only：构词拆分（fore- + cast）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- foreigner｜morph_only：构词拆分（foreign + -er）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- forgetful｜compositional（主干复核后）：forget + -ful 透明派生（14 世纪末 foryetful;Etymonline 称 a curious formation)，现代词义「健忘」由构词直接可读（1550 年代「使人忘却」义仅见于诗）；词源叙事归形态层，待核保持
- forgotten｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- fourteen｜compositional（主干复核后）：four + -teen 复合数词（古英语 fēowertīene 一线），构件自明，本词不单独立档，保持待核
- friendship｜compositional（主干复核后）：friend + -ship 透明派生（古英语 frēondsċiepe 以来构式未变），现代词义由构词直接可读；词源叙事在 friend 本词，待核保持
- fudge｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- funny｜compositional（主干复核后）：fun + -y 构词透明，1756 年始见（Etymonline），「奇怪」义 1806 年；基词 fun 本身尚在待核，派生词按项目口径随基词处理，不单独立档
- fuzz｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- gal｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- gamify｜compositional（主干复核后）：构词透明（game + -ify（当代新构）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- gardener｜compositional（主干复核后）：garden 的行为人（或仿古北法语 *gardinier 借/仿造，13 世纪晚期），曾顶替本土 wyrtweard「植物看守」；构件自明，本词不单独立档，保持待核
- geese｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- gill｜origin_unknown（主干复核后）：Etymonline 明标 of unknown origin；与斯堪的纳维亚语（古诺斯语 gjǫlnar）的关联及印欧语 *gʰel-「颌」的谱系均为推测（perhaps/said to be）；牛津词源栏无载，保持待核
- girl｜origin_unknown（主干复核后）：约 1300 年 gyrle「孩子（不分男女）」；Etymonline 明言 of unknown origin；OED 拟未载的古英语 *gyrele 一线被 Liberman 判「音理学上难以接受」，另有 gierela「衣服」说；旧民间说出自拉丁语 garrulus「多嘴的」已被弃置。无互证主干，保持待核
- given｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- goalkeeper｜compositional（主干复核后）：构词透明（goal + keeper），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- goldfish｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- gone｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- granddaughter｜compositional（主干复核后）：构词透明（grand- + daughter），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- grandma｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- grandpa｜morph_only：构词拆分（grand- + pa）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- grandparent｜morph_only：构词拆分（grand- + parent）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- grandson｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- grapefruit｜morph_only：构词拆分（grape + fruit）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- grasshopper｜compositional（主干复核后）：grass + hopper 复合（古英语 græshoppa），构件自明，本词不单独立档，保持待核
- grassy｜morph_only：构词拆分（grass + -y）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- greenhouse｜morph_only：构词拆分（green + house）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- grown｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- grown-up｜single_source（主干复核后）：grow up 的分词形容词化（14 世纪晚期；名词义 1813）仅 Etymonline 一源成录，余两源无载；未达双源门，保持待核
- haircut｜morph_only：构词拆分（hair + cut）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- handbag｜compositional（主干复核后）：构词透明（hand + bag），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- handmade｜compositional（主干复核后）：构词透明（hand + made），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- haphazard｜morph_only：构词拆分（hap + hazard）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- happily｜compositional（主干复核后）：构词透明（happy + -ly），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- happiness｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- haystack｜compositional（主干复核后）：构词透明（hay + stack），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- headmaster｜morph_only：构词拆分（head + master）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- headphone｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- healthy｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- helpful｜morph_only：构词拆分（help + -ful）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- hers｜morph_only：构词拆分（her + -s）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- hiccough｜single_source（主干复核后）：hiccup 因误联 cough 而改拼的变体（1620 年代）仅 Etymonline 一源成录；基词 hiccup 本身尚在待核，保持待核
- hiccup｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- highlight｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- hometown｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- homework｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- honeybee｜compositional（主干复核后）：构词透明（honey + bee），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- hopeful｜morph_only：构词拆分（hope + -ful）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- hopping｜compositional（主干复核后）：构词透明（hop + -ing（动名词常规构成）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- hotter｜compositional（主干复核后）：构词透明（hot 的比较级（常规屈折）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- hough｜single_source（主干复核后）：古英语 hōh「踵」一线仅 Wiktionary 成录，Etymonline 仅转指 hock 词条、牛津无载；未达双源门，保持待核
- housework｜compositional（主干复核后）：构词透明（house + work），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- however｜compositional（主干复核后）：构词透明（how + ever，14 世纪晚期成词），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- hurry｜trunk_unsettled（主干复核后）：1590 年代见载（莎士比亚多用）；两拟并立——或为 harry 的变体，或出中古英语 hurren「急速振动、嗡嗡」（出日耳曼语 *hurza）；牛津作 imitative。路径未定，保持待核
- hutch｜trunk_divergent（主干复核后）：入英主干两说——Etymonline 与牛津作古法语 huche ← 中世纪拉丁语 hutica（来源未定）借入；Wiktionary 则作本土古英语 hwiċe「箱」一线，仅拼写受 huche 影响、且 huche 出自另一日耳曼词根 *hudjō；词本身出自哪条线未定，保持待核
- icy｜compositional（主干复核后）：ice + -y 透明派生（古英语 īsiġ 有同构词，现代用法为中古晚期重构），词义由构词直接可读；词源叙事归形态层，待核保持
- illness｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- imbalance｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- impossible｜compositional（主干复核后）：im-（in- 的同化形，义「不」）+ possible，整体出拉丁语 impossibilis 经古法语于 14 世纪晚期入英；否定构件完全透明，本词不单独立档，保持待核
- internet｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- invaluable｜morph_only：构词拆分（in- + valuable）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- irresponsible｜compositional（主干复核后）：构词透明（ir- + responsible），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- jam｜origin_unknown（主干复核后）：动词 jam「挤、塞」1706/1719 年见载，of unknown origin（或为中古英语 cham「咬」的变体）；名词「果酱」（1730 年代）当为动词的转用（压碎成酱），然动词本身来历不明，主干缺失，保持待核
- jazz｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- job｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- juicy｜compositional（主干复核后）：构词透明（juice + -y），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- jump｜trunk_divergent（主干复核后）：Wiktionary 主张源于原始日耳曼语 *gumbōną「蹦跳」（经中古低地德语或古诺斯语传入），Etymonline 与牛津（据 OED）则认为该词 1520 年代才在英语出现、无更早来源、很可能是拟声造词，德语同源关系无据；两说在主干上对立，保持待核
- karate｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- kayak｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- keeper｜compositional（主干复核后）：keep + -er 行为人名词（约 1300 年「看守人」义），构件自明，本词不单独立档，保持待核
- kept｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- ketchup｜trunk_unsettled（主干复核后）：主流说为马来语 kecap ← 闽南语「膎汁」kê-chiap「鱼卤」（Wiktionary 作 probably，Etymonline 转述现代来源同此说但加 possibly），牛津另作粤语 k'ē chap「番茄汁」（perhaps），Etymonline 另载图卢语 kajipu「咖喱」说；三路皆带保留、无两家无条件互证，且 17-18 世纪此词泛指凤尾鱼/蘑菇/牡蛎等多种酱汁、番茄义晚至 19 世纪末，主干未定，保持待核
- keyboard｜morph_only：构词拆分（key + board）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- kill｜trunk_unsettled（主干复核后）：约 1200 年「击打」、约 1300 年「杀死」；来源三拟并立——未载的古英语 *cyllan（出日耳曼语 *kwuljaną ← 印欧语 *gʷelH-「投掷伤人」)、古英语 cwellan「处死」的变体（quell 一线，牛津/Etymonline 所主但作 probably/perhaps)、古诺斯语 kolla「击头」；无两家确立的同一主干，保持待核
- kindness｜compositional（主干复核后）：kind + -ness 透明派生（约 1300 kyndenesse「礼貌、善行」以来构式未变），现代词义由构词直接可读；词源叙事在 kind 本词，待核保持
- kingly｜compositional（主干复核后）：king + -ly 透明派生（古英语 *cyninglīċ 已有同构词），现代词义由构词直接可读、无历史漂移；词源叙事在 king 本词，待核保持
- koi｜evidence_gap（主干复核后）：1727 年借自日语 鯉 koi「鲤鱼」，两家缓存仅有此一线记录，原始义项编年与字段无从填实（汉字 鯉 的语源不在缓存内）；按不降格建档原则保持待核
- ladybug｜morph_only：构词拆分（lady + bug）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- lain｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- laser｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- lazy｜origin_unconfirmed（主干复核后）：1540 年代 laysy「厌于劳作」；Wiktionary 作 origin uncertain，Etymonline 作 a word of unknown origin——Skeat 主低地德语说（中古低地德语 lasich「软弱」← 印欧语 *(s)leg-「松弛」）为今之通说但仍属拟测；另有 lay 派生说（仿 tipsy）。无互证主干，保持待核
- leader｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- learner｜compositional（主干复核后）：构词透明（learn + -er），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- lice｜single_source（主干复核后）：louse 的复数（古英语 lȳs，元音变音复数）仅 Wiktionary 一源成录，Etymonline（lice 词条为空）、牛津无载；未达双源门，保持待核
- limitable｜compositional（主干复核后）：构词透明（limit + -able），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- lipstick｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- log｜origin_unknown（主干复核后）：中古英语 logge，牛津与 Etymonline 均作来源未明（牛津或拟「象征沉重之拟形」）；古诺尔斯语 lág「倒下的树」一线被多位词源学家以语音理由否决，无两家互证主干；「日志」义出航海测程木（log）传统，其源头词本身未定，保持待核
- lonely｜morph_only：构词拆分（lone + -ly）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- lorry｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- loudly｜compositional（主干复核后）：构词透明（loud + -ly），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- lovable｜compositional（主干复核后）：构词透明（love + -able），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- luckily｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- lucky｜morph_only：构词拆分（luck + -y）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- luggage｜morph_only：构词拆分（lug + -age）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- lunch｜trunk_unsettled（主干复核后）：lunch「午餐」为 luncheon 的截短（截短年代 Etymonline 作 1786、Wiktionary 梳理作 1829）两源一致；但 luncheon 本身主干未决——OED 谓与「大块（hunk）」旧词（1570 年代）同形、或由 lump 演变，Wiktionary 并存 nuncheon（noon + schench「饮」）改造说与 lunch + -ing 说；上游未定，保持待核
- lunchtime｜compositional（主干复核后）：构词透明（lunch + time），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- maglev｜compositional（主干复核后）：构词透明（magnetic levitation 的缩合混成（mag- + lev-），当代科技术语造词），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- manageable｜compositional（主干复核后）：构词透明（manage + -able），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- math｜morph_only：构词拆分（mathematics）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- messy｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- midnight｜compositional（主干复核后）：mid- + night 复合（古英语 midniht，日耳曼语 *midjanahts 同构），构件自明，本词不单独立档，保持待核
- mighty｜compositional（主干复核后）：现代形 might + -y 完全透明（古英语 mihtiġ、日耳曼语 *mahtīgaz 的构词在形态层完整可溯）；词义无历史漂移记录，词源叙事归形态层，待核保持
- milkshake｜compositional（主干复核后）：构词透明（milk + shake），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- mini｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- misread｜compositional（主干复核后）：构词透明（mis- + read，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- miss｜evidence_gap（主干复核后）：词库义（对女子的称呼）为 mistress 的 17 世纪缩略，Etymonline（miss n.2：by 1700「未婚年轻女子」）与 Wiktionary（From mistress）一致；但 mistress 不在词库、三套缓存均无其条目原文，链条中段（magister 系）证据缺失，按标准不凭记忆建档，保持待核
- misunderstand｜morph_only：构词拆分（mis- + understand）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- mitt｜morph_only：构词拆分（mitten）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- modernize｜compositional（主干复核后）：构词透明（modern + -ize，1680 年代成词，或经法语 moderniser，两说并存于来源），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- mom｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- monkey｜trunk_unsettled（主干复核后）：牛津标来源未定；主流推测为未见载的中古低地德语 *moneke（1498 年《列那狐》中猿猴之子的名字），其本身或出罗曼语 monne 一族、终极或出阿拉伯语 maimun「吉祥的」（Klein 谓系避讳语），链环多为构拟与或然，未成双源互证，保持待核
- mooncake｜compositional（主干复核后）：构词透明（moon + cake），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- moonlight｜compositional（主干复核后）：moon + light 复合（中古英语 moonelight），构件自明，本词不单独立档，保持待核
- moose｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- moreover｜compositional（主干复核后）：构词透明（more + over（源短语 and yit more ouer），14 世纪晚期写合），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- motivate｜single_source（主干复核后）：motive + -ate（1863，或仿法语 motiver）仅 Etymonline 一源成录，牛津无载、Wiktionary 仅作对照；未达双源门，保持待核
- motorcycle｜morph_only：构词拆分（motor + cycle）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- mr｜single_source（主干复核后）：Mister 的缩略仅 Wiktionary 一语成录，Etymonline、牛津无独立词源条；未达双源门，保持待核
- mum｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- mushroom｜trunk_unsettled（主干复核后）：中古经盎格鲁-法语 musherun（古法语 mousseron）入英；深层分歧——OED 谓通常作法语 mousse「苔藓」（出日耳曼语）的派生、Weekley 从之，Klein 谓两者「毫无共同之处」、Barnhart 作 of uncertain origin；晚期拉丁语 mussirio 一形或反借自法语。主干未定，保持待核
- neighbourhood｜compositional（主干复核后）：构词透明（neighbour + -hood（英式拼法）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- newspaper｜morph_only：构词拆分（news + paper）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- nineteen｜compositional（主干复核后）：nine + -teen（ten 的弱化形）复合数词，古英语 niġontīene、日耳曼语 *newuntehun 两源一致；构件自明，本词不单独立档，保持待核
- ninety｜compositional（主干复核后）：nine + -ty 的数词构式，古英语 nigontiġ 以来构词透明、词义无漂移（与全数词同一口径）；词源叙事归形态层，待核保持
- nobody｜compositional（主干复核后）：no + body 复合，约 1300 年作 no bodi 两词，14—18 世纪分写、后合写；1580 年代另生「小人物」义；构件自明，本词不单独立档，保持待核
- noisy｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- nonfiction｜compositional（主干复核后）：构词透明（non- + fiction），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- nonsense｜compositional（主干复核后）：non- + sense 透明构词（约 1610)，现代词义由构词直接可读、无历史漂移；词源叙事归形态层，待核保持
- nonstop｜compositional（主干复核后）：构词透明（non- + stop），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- notebook｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- noticeable｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- o'clock｜chain_too_short：来源链只对上一站且信息量不足（只到中古英语同形等），不足以立档
- oddity｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- ok｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- ourselves｜compositional（主干复核后）：构词透明（our + selves（反身构成）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- outside｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- overcoat｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- overweight｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- painful｜morph_only：构词拆分（pain + -ful）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- pancake｜compositional（主干复核后）：构词透明（pan + cake，约 1400 年成词（或仿中古低地德语 pankôke 的同构复合），义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- panicky｜compositional（主干复核后）：构词透明（panic + -y），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- password｜morph_only：构词拆分（pass + word）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- past｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- pat｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- peaceful｜compositional（主干复核后）：peace + -ful（14 世纪早期），曾顶替古英语 friþsum；构件自明，本词不单独立档，保持待核
- peanut｜trunk_unsettled（主干复核后）：Etymonline 作 pea + nut 复合（1807)，然 Wiktionary 明注此形 perhaps a folk etymology of pinda/pinder（源出非洲语言的旧名，南美植物经葡萄牙人传播）；构词理据未定，两说未合，保持待核
- penguin｜origin_unknown（主干复核后）：牛津「of unknown origin」，Etymonline 亦云未明。威尔士语 pen「头」+ gwyn「白」说「常被断言」而未证，拉丁语 pinguis「肥」仅形似，无一家定案；指称转移（1570 年代指北半球大海雀 → 1580 年代南半球企鹅）有据而词形来历无主干可对，保持待核
- pet｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- photo｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- photocopy｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- photograph｜morph_only：构词拆分（photo + graph）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- photographer｜compositional（主干复核后）：构词透明（photograph + -er），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- photographic｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- photography｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- pie｜trunk_unsettled（主干复核后）：约 1300 年「馅饼」，中世纪拉丁语 pie 一线或与 pica「喜鹊」相联（以鹊之杂集喻馅之杂合，牛津/Etymonline 皆作 perhaps/possibly)，或出自姓氏 Pie 的创制者；两拟未定，保持待核
- piece｜trunk_unsettled（主干复核后）：经古法语 piece ← 通俗拉丁语 *pettia；深层未定——Wiktionary 标注 of uncertain origin，Etymonline 拟高卢语 *pettsi（出凯尔特语 *kwezd-i- ← 印欧语 *kwezd-「部分」）作 probably，牛津作 of obscure ultimate origin。单线拟测未获第二家确立，保持待核
- pig｜origin_unknown（主干复核后）：中古英语 pigge 本义「小猪」（成年猪旧称 swine），古英语 *picga 仅见于复合词；其深层来历 Etymonline 明言 like dog, its further etymology unknown，OED 记与低地德语 bigge 的关系「音系困难」；牛津另作 picbrēd「猪食」首元说，Pokorny 拟联印欧 *bew-「吹、胀」（并牵 big），三说互不相容且皆带保留，无互证主干，保持待核
- piglet｜morph_only：构词拆分（pig + -let）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- pink｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- pitch｜origin_unknown（主干复核后）：词库义项为投掷/音高一线（pitch v.1/n.1）；牛津明言此线「或许关联古英语 picung，终极来源未明，词义演变晦暗」（of unknown ultimate origin; sense development obscure），Etymonline 亦称诸义项间关联 obscure，无互证主干。沥青义 pitch（出拉丁语 pix）为同形异词，不属本义项，保持待核
- pizza｜origin_unknown（主干复核后）：意大利语 pizza 本义「饼」，1845 年入英；其意大利语词源 of uncertain origin——希腊语 pēktḗ/pittakion、拉丁语 pīnsere「捣」与 pinza「夹」诸说并立，无一确立，保持待核
- playground｜compositional（主干复核后）：play + ground 现代透明复合（1780 年记录），词义即「玩的场地」无历史漂移（古英语另有 plegstow 同义旧构）；词源叙事归形态层，待核保持
- ploughman｜compositional（主干复核后）：构词透明（plough + man），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- plow｜single_source + 深层未定（主干复核后）：plough 的美式拼法；其谱系仅 Etymonline 成录（古英语 ploh ← 原始日耳曼语 *plōga-，Boutkan 指该词来源未定、或非印欧来源），Wiktionary、牛津无独立词条；且 plough 本词尚在待核，保持待核
- plus｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- policeman｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- policewoman｜compositional（主干复核后）：构词透明（police + woman），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- politely｜compositional（主干复核后）：构词透明（polite + -ly），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- politician｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- popcorn｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- posh｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- postcard｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- postman｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- prawn｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- preheat｜compositional（主干复核后）：构词透明（pre- + heat），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- preview｜morph_only：构词拆分（pre- + view）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- psychological｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- pun｜origin_unknown（主干复核后）：1640 年代「双关」义；来源未定——或谓 pundigrion 的截短（pundigrion 本身词源未明），或谓意大利语 puntiglio 的戏谑改形（出拉丁语 punctum「点」），OED 评后说为 pure speculation；牛津作 perhaps。无互证主干，保持待核
- putt｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- puzzle｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- quietly｜compositional（主干复核后）：构词透明（quiet + -ly），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- quiz｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- railway｜morph_only：构词拆分（rail + way）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- rainbow｜compositional（主干复核后）：rain + bow 通用日耳曼复合（古英语 regnboga 以来），现代词义由构词直接可读、无历史漂移；词源叙事归形态层，待核保持
- raincoat｜compositional（主干复核后）：构词透明（rain + coat），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- raindrop｜compositional（主干复核后）：构词透明（rain + drop，古英语 reġndropa 已成词（原始日耳曼语 *regnadrupô），义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- rainstorm｜compositional（主干复核后）：构词透明（rain + storm），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- rainy｜compositional（主干复核后）：rain + -y 形容词，古英语 reġniġ 已成词（日耳曼语 *regnagaz）；构件自明、词义无转折，本词不单独立档，保持待核
- readable｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- really｜morph_only：构词拆分（real + -ly）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- recycle｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- refill｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- reliable｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- reread｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- resentful｜morph_only：构词拆分（resent + -ful）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- restroom｜morph_only：构词拆分（rest + room）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- retell｜compositional（主干复核后）：构词透明（re- + tell），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- rev｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- rewrite｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- roach｜single_source（主干复核后）：词库义项「蟑螂」为 cockroach 的误拆截短（1830 年，误以为复合词）——此说仅 Etymonline 一家有完整原文在缓存内；Wiktionary 与牛津缓存均只载「拟鲤鱼」义项（古法语 roche，终极来源未明）一线，蟑螂线（含 cucaracha 阶段的民间重塑）无第二家原文互证，保持待核
- rock｜trunk_unsettled（主干复核后）：中古英语 rokke 为古英语 *rocc（仅见于复合词 stānrocc，属构拟）与古北法语 roche 的合流；法语一线出中世纪拉丁语 rocca（767 年见载），其终极来源未定（凯尔特语说与通俗拉丁语 *rupica 说并存，后者音形不合），牛津明标 of unknown ultimate origin，保持待核
- rocky｜compositional（主干复核后）：rock + -y（15 世纪晚期；更早有借法语 roche 的 rochi，约 1300 年）；「不稳」义（1737 年）出自动词 rock；构件自明，本词不单独立档，保持待核
- rooster｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- rose｜form_of_rise（主干复核后）：本条词库义项为 rise 的过去式，属 rise 本词的形变记录（古英语 rās），词源叙事在 rise 条；同形异词 rose「玫瑰」为另一词（拉丁语 rosa ← 希腊语 rhódon ← 伊朗语 *vrda-「花」），不在本条处理范围，待核保持
- ruler｜compositional（主干复核后）：rule + -er 施事名词，两义（统治者 14 世纪晚期；划线工具约 1400 年）均为基词 rule 两义的常规派生，来源记载一致；词源内容在 rule 词条，本词不单独立档
- rung｜evidence_gap（主干复核后）：词库义为 ring 的过去分词；现有缓存来源只成段记载名词 rung「梯档」（古英语 hrung「横杆」，与动词形同形异词），ring 动词过去分词 rung 的形史未见成段记载，不凭通例补档，保持待核
- runner｜compositional（主干复核后）：run + -er 行为人名词（约 1300 年「步行信使」义、14 世纪早期「赛跑者」义），构件自明，本词不单独立档，保持待核
- runner-up｜compositional（主干复核后）：构词透明（run + -er + up（短语名词）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- sadly｜morph_only：构词拆分（sad + -ly）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- sadness｜compositional（主干复核后）：构词透明（sad + -ness），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- safely｜compositional（主干复核后）：构词透明（safe + -ly），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- salty｜morph_only：构词拆分（salt + -y）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- sandstorm｜compositional（主干复核后）：构词透明（sand + storm），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- sandwich｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- schoolbag｜compositional（主干复核后）：构词透明（school + bag），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- schoolwork｜compositional（主干复核后）：构词透明（school + work），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- schoolyard｜compositional（主干复核后）：构词透明（school + yard），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- seafood｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- seaside｜compositional（主干复核后）：sea + side 透明复合（约 1200)，现代词义由构词直接可读、无历史漂移；词源叙事归形态层，待核保持
- semicircle｜compositional（主干复核后）：构词透明（semi- + circle，1520 年代，或直接出自拉丁语 semicirculus），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- semifinal｜compositional（主干复核后）：构词透明（semi- + final），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- seventeen｜compositional（主干复核后）：seven + -teen 复合数词（古英语 seofontīene 一线），构件自明，本词不单独立档，保持待核
- seventh｜compositional（主干复核后）：seven + -th 序数词（古英语 seofoþa 一线），构件自明，本词不单独立档，保持待核
- shark｜origin_unknown（主干复核后）：牛津明标来源未定；诸说并存——德语 Schurke「恶棍」说（谓人名义先行、后转指鱼）、玛雅语 xoc 旧说、拉丁语 carcharias 说（缺古法语中间形式）——无一获双源互证，保持待核
- she｜trunk_divergent（主干复核后）：祖先词形两说未决——OED/牛津主古英语阴性人称代词 hēo 的语音演变说（/hjoː/ → /ʃ/，Lass、Fulk）；Etymonline 主阴性指示代词 seo/sio 替代说（hēo 与 he 混同后指示词顶替，如荷兰语 zij、德语 sie 之例）。两家在最近祖先一处主干分歧，保持待核
- shopkeeper｜morph_only：构词拆分（shop + keeper）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- shorten｜compositional（主干复核后）：现代形 short + -en 完全透明，词义即「使变短」无历史漂移记录（中古英语 shortenen 出 short 一线、古英语 sceortian 另有传承，皆在形态层）；词源叙事归形态层，待核保持
- shout｜origin_unknown（主干复核后）：c. 1300 shouten「大声呼喊」，Etymonline「a word of unknown origin」，两候选（shoot 词根「掷声而出」说、古诺尔斯语 skúta「嘲讽」说）皆为 perhaps 级，无主干可对，保持待核
- shown｜single_source（主干复核后）：show 的过去分词（中古英语 schewen 的分词异形）仅 Wiktionary 一源成录，余两源无载；未达双源门，保持待核
- shyly｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- sidewalk｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- singer｜compositional（主干复核后）：sing + -er 行为人名词（约 1300 年），顶替古英语 sangere；构件自明，本词不单独立档，保持待核
- sixteen｜compositional（主干复核后）：six + -teen 的数词构式，古英语 sixtīene 以来构词透明、词义无漂移，现代词仍是「六加十」的活构式（与全数词同一口径）；词源叙事归形态层，待核保持
- sixty｜compositional（主干复核后）：six + -ty 的数词构式，古英语 sixtiġ 以来构词透明、词义无漂移（与全数词同一口径）；词源叙事归形态层，待核保持
- sleepy｜compositional（主干复核后）：构词透明（sleep + -y，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- smell｜origin_unconfirmed（主干复核后）：Wiktionary 构拟原始西日耳曼语 *smallijan「闷燃」← 印欧语 *smel-「燃烧、冒烟」一线；牛津明标 of unknown origin，Etymonline 引 OED 谓「无疑出自古英语但未见记载、同源语无对应」；主干未获互证，保持待核
- smog｜morph_only：构词拆分（smoke + fog）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- snowball｜compositional（主干复核后）：snow + ball 现代透明复合（约 1400)，词义即「雪做的球」无历史漂移（德语 Schneeball 等为平行同构）；词源叙事归形态层，待核保持
- snowflake｜morph_only：构词拆分（snow + flake）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- snowman｜morph_only：构词拆分（snow + -man）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- snowy｜compositional（主干复核后）：构词透明（snow + -y，古英语 snāwiġ 已成词，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- soccer｜morph_only：构词拆分（assoc. + -er）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- somebody｜morph_only：构词拆分（some + body）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- someone｜morph_only：构词拆分（some + one）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- sometimes｜compositional（主干复核后）：构词透明（some + times），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- somewhere｜morph_only：构词拆分（some + where）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- spacecraft｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- spaceman｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- spaceship｜morph_only：构词拆分（space + ship）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- sparrowgrass｜evidence_gap（主干复核后）：缓存来源仅 Wiktionary 给出 sparrow + grass 的字面构词分析，Etymonline、牛津无词条；本词与 asparagus 的历史关系未见缓存来源记载，不凭记忆补档，保持待核
- spiv｜origin_unknown（主干复核后）：三源同归未定——牛津「perhaps related to spiffy」，Etymonline 引 Ayto 谓或与 spiff 相连，Wiktionary 标 unknown 并存罗姆语 spiv「麻雀」说；无可互证主干，保持待核
- starfish｜compositional（主干复核后）：star + fish 透明描形复合（1530 年代 starrefyshe)，因五臂星形得名，构词理据现代仍透明；词源叙事归形态层，待核保持
- starlight｜morph_only：构词拆分（star + light）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- stomachache｜compositional（主干复核后）：构词透明（stomach + ache），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- stormy｜compositional（主干复核后）：storm + -y 形容词（古英语晚期 *stormiġ；14 世纪中期已生比喻义「动荡的」），构件自明，本词不单独立档，保持待核
- storybook｜compositional（主干复核后）：构词透明（story + book），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- strawberry｜motivation_unsettled（主干复核后）：straw + berry 复合（古英语 strēawberġe）构件无疑，但 straw 的命名理据未定——果实结于草茎状匍匐茎说、采果穿草茎成串说（2024 年专文并列）、果面籽粒如草屑说并存，无定论，保持待核
- streamable｜compositional（主干复核后）：构词透明（stream + -able，流媒体时代新构），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- stronger｜compositional（主干复核后）：构词透明（strong 的比较级（常规屈折）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- stuff｜trunk_divergent（主干复核后）：至古法语 estoffe 一致；其来历三家分歧——Wiktionary（引 OED 原典条目）作古高地德语 stoffōn ← 日耳曼语 *stoppōn「填塞」（stop 线），但 Etymonline 转述 OED 对此「有强烈异议」（open to strong objections）、自评 obscure；牛津则作希腊语 stuphein「拉紧」。祖先语言在主干上分歧，保持待核
- submarine｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- subway｜morph_only：构词拆分（sub- + way）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- suddenly｜compositional（主干复核后）：构词透明（sudden + -ly，13 世纪晚期成词），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- sunburn｜compositional（主干复核后）：构词透明（sun + burn），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- sunflower｜morph_only：构词拆分（sun + flower）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- sung｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- sunlight｜compositional（主干复核后）：构词透明（sun + light，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- sunny｜compositional（主干复核后）：构词透明（sun + -y，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- sunrise｜compositional（主干复核后）：构词透明（sun + rise，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- sunset｜compositional（主干复核后）：sun + set 透明复合（14 世纪末），现代词义由构词直接可读、无历史漂移（古英语另有 sunnansetlgong 同义旧构）；词源叙事归形态层，待核保持
- sunshine｜compositional（主干复核后）：构词透明（sun + shine，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- supermarket｜morph_only：构词拆分（super- + market）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- superstar｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- swimmer｜compositional（主干复核后）：构词透明（swim + -er），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- t-shirt｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- tablecloth｜morph_only：构词拆分（table + cloth）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- taken｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- tape｜origin_unknown（主干复核后）：古英语 tæppa「窄布条」，来源未明——Etymonline 作 uncertain（Klein 拟出拉丁语 tapete 的回构说），《中古英语大词典》另比弗里西亚语/低地德语「扯、撕」一系，牛津作 perhaps related，两路皆带保留、无互证主干，保持待核
- tasty｜compositional（主干复核后）：构词透明（taste + -y），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- teacher｜compositional（主干复核后）：teach + -er 行为人名词（14 世纪中期；早期另有「食指」别义），构件自明，本词不单独立档，保持待核
- teamwork｜compositional（主干复核后）：构词透明（team + work），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- textbook｜morph_only：构词拆分（text + book）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- theirs｜morph_only：构词拆分（their + -s）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- thinner｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- thirsty｜compositional（主干复核后）：构词透明（thirst + -y，古英语 þurstiġ 已成词，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- thirteen｜compositional（主干复核后）：three + -teen 复合数词（古英语 þrēotīene 一线），构件自明，本词不单独立档，保持待核
- thrown｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- timetable｜compositional（主干复核后）：构词透明（time + table），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- tip｜origin_unknown（主干复核后）：中古英语 tip「尖端」of obscure and uncertain origin（Wiktionary)；动词 tip「倾倒」（约 1300 tippen）a word of uncertain origin，或出斯堪的纳维亚语；诸义（尖端、轻触、小费、提示）的相互关系亦多属 perhaps。无互证主干，保持待核
- tomorrow｜morph_only：构词拆分（to- + morrow）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- toothache｜compositional（主干复核后）：构词透明（tooth + ache），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- toothbrush｜compositional（主干复核后）：构词透明（tooth + brush），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- toothpaste｜compositional（主干复核后）：构词透明（tooth + paste），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- toothpick｜compositional（主干复核后）：构词透明（tooth + pick，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- tourist｜compositional（主干复核后）：tour + -ist 透明派生（1772 年记录，初指「游记作者」为同一构式的职业定型），现代词义由构词直接可读；词源叙事在 tour 本词，待核保持
- toy｜sources_split（主干复核后）：牛津与 Etymonline 均标来源未定（Etymonline 谓现代 toy 或为多词合流）；Wiktionary 主张或出中古荷兰语 tuyg「器具」（cf. speeltuig「玩具」）一线，仅单家主推，不成互证，保持待核
- traveller｜compositional（主干复核后）：构词透明（travel + -er（英式拼法）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- treelet｜compositional（主干复核后）：构词透明（tree + -let），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- trousers｜trunk_unsettled（主干复核后）：出爱尔兰语/苏格兰盖尔语 triubhas「紧身短裤」（1610 年代入英），然盖尔词本身 of uncertain origin；一线谓其反借自诺曼语 trebuz ← 晚期拉丁语 tubruci「腿套」，未获定论；第二个 -r- 或受 drawers 影响，亦无解。主干末端未定，保持待核
- trust｜trunk_divergent（主干复核后）：词根同属日耳曼语 *traust-／*treuw- 家族无争议，但入英路径真分歧——牛津与 Etymonline 作古诺斯语 traust 借词说，Wiktionary 引 Dance (2014) 谓元音不合、应为未见载古英语本土形式 *trust 的存续；借词与存续未定，保持待核
- tub｜origin_unknown（主干复核后）：14 世纪末 tubbe，或借自中古低地德语/中古荷兰语 tubbe，但大陆语词「further etymology unknown / words of uncertain origin」；与拉丁语 tubus（tube）无关，两家一致否认。主干止于借入层、再深未明，保持待核
- tummy｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- tune｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- tv｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- twentieth｜compositional（主干复核后）：twenty 的序数形（古英语 twēntigoþa 一线），构件自明，本词不单独立档，保持待核
- unbelievable｜morph_only：构词拆分（un- + believable）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- uncertain｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- unconscious｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- underwater｜compositional（主干复核后）：构词透明（under + water），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- underwear｜morph_only：构词拆分（under + wear）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- unfriend｜morph_only：构词拆分（un- + friend）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- unhappy｜morph_only：构词拆分（un- + happy）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- unhealthy｜compositional（主干复核后）：构词透明（un- + healthy），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- unlock｜compositional（主干复核后）：现代形 un-（反向）+ lock 完全透明，词义即「开锁」无历史漂移记录（古英语已有 onlūcan/unlucan 同构词，属形态层构词）；词源叙事归形态层，待核保持
- unlucky｜compositional（主干复核后）：构词透明（un- + lucky），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- unpopular｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- unstable｜compositional（主干复核后）：un- + stable（约 1200）透明构词，诸义（易动、善变、易倒、结构不稳）皆构词直读、无漂移；词源叙事归形态层，待核保持
- unsubscribe｜compositional（主干复核后）：构词透明（un- + subscribe（数字时代新构）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- untidy｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- unusual｜compositional（主干复核后）：构词透明（un- + usual），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- uphold｜compositional（主干复核后）：up + hold（约 1200）透明构词，现代义由构词直接可读；词源叙事归形态层，待核保持
- upstairs｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- useful｜morph_only：构词拆分（use + -ful）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- useless｜compositional（主干复核后）：构词透明（use + -less），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- usually｜compositional（主干复核后）：构词透明（usual + -ly），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- utterly｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- valuable｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- villager｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- volleyball｜compositional（主干复核后）：构词透明（volley + ball），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- warmly｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- washroom｜compositional（主干复核后）：构词透明（wash + room），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- watermelon｜compositional（主干复核后）：构词透明（water + melon，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- weakness｜morph_only：构词拆分（weak + -ness）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- weekday｜compositional（主干复核后）：week + day 复合，古英语 wicdæġ 已成词、义即「一周之日（尤非周日）」，构件自明；词源归 week、day 两词条，保持待核
- weekend｜morph_only：构词拆分（week + end）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- weta｜single_source（主干复核后）：毛利语 wētā 借入仅 Wiktionary 一源成录，Etymonline、牛津无词条；未达双源门，保持待核
- wheelchair｜compositional（主干复核后）：构词透明（wheel + chair），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- whiz｜sources_split（主干复核后）：动词「嗖地飞过」的拟声说仅 Wiktionary 成录；名词「行家里手」（1914）Etymonline 作 whizz 引申与 wizard 截短两说并存；两义项均未达双源一致，保持待核
- widely｜compositional（主干复核后）：wide + -ly 透明派生（1660 年代），现代词义由构词直接可读；词源叙事归形态层，待核保持
- widen｜morph_only：构词拆分（wide + -en）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- windy｜compositional（主干复核后）：构词透明（wind + -y，古英语 windiġ 已成词，主干义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- winner｜compositional（主干复核后）：win + -er 行为人名词（14 世纪晚期）；构件自明，本词不单独立档，保持待核
- witch｜trunk_divergent（主干复核后）：古英语 wicce/wicca/wiccian 一族本身确凿；深层主干三说分歧——Watkins 作日耳曼语 *wikkjaz「唤亡者」出印欧 *weg-「强壮、活跃」；Kroonen/Wiktionary 作 *wikkōną 出 *weyk-「奉献、分离」（与 victima 同根）；Klein/Weekley 另联 wigle「占卜」、wih「神像」、哥特语 weihs「神圣」。OED 作来源未定，Liberman 谓诸说皆有音义之难，无两家互证主干，保持待核
- won｜chain_mismatch：Wiktionary 的来源链与 Etymonline/牛津的说法逐站对不上，双源互证未过
- wooden｜morph_only：构词拆分（wood + -en）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- woodpecker｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- woody｜compositional（主干复核后）：wood + -y 透明派生（14 世纪末 wodi)，现代词义由构词直接可读；词源叙事归形态层，待核保持
- worker｜compositional（主干复核后）：work + -er 行为人名词（14 世纪中期），曾顶替旧词 wright；构件自明，本词不单独立档，保持待核
- workplace｜compositional（主干复核后）：构词透明（work + place），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- wrap｜origin_unknown（主干复核后）：中古英语 wrappen「裹、折」，牛津明言 of unknown origin，Etymonline 作 a word of uncertain origin（Watkins 拟或经斯堪的纳维亚语出印欧 *werp-「转、绕」，或为 lap 的变体）；两拟皆带保留，无互证主干，保持待核
- written｜evidence_gap（主干复核后）：write 的过去分词仅见 Wiktionary 构词分析（write + -en），三源均无成段形史记载；且 write 本词谱系未在本轮处理范围，保持待核
- yours｜morph_only：构词拆分（your + -s）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- yourself｜morph_only：构词拆分（your + -self）在两源里能对上，但这个词本身的来源链未达逐站互证，不单独立档为已核
- yourselves｜compositional（主干复核后）：构词透明（your + selves（反身构成）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- yummy｜chain_unparsable：Wiktionary 词源小节里没有能解析的来源链或构词说法（多为散文叙述或来源未定）
- zookeeper｜compositional（主干复核后）：构词透明（zoo + keeper），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档

## 三、未收清单（不进 JSON）

- `词形变化词`：142 条
- `多词条目`：39 条
- `无词源可考`：14 条

未收全表（词｜原因）：

- red｜词形变化词：词形条目，Wiktionary 只标原形「rede」，无独立词源小节；词源随原形词条目（若原形已收录）
- shoes｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「shoe」，无独立词源小节；词源随原形词条目（若原形已收录）
- socks｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「sock」，无独立词源小节；词源随原形词条目（若原形已收录）
- a / an｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- I / me / my / mine｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- you / your / yours｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- ice cream｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- he / him / his｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- she / her / hers｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- it / its / itself｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- evening｜词形变化词：词形条目，Wiktionary 只标原形「even」，无独立词源小节；词源随原形词条目（若原形已收录）
- hotdog｜无词源可考：Wiktionary 无词源小节，Etymonline 与牛津词源栏也都没有可核的来源说法
- pencil box｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- be / am / is / are｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- Ms｜词形变化词：词形条目，Wiktionary 只标原形「M」，无独立词源小节；词源随原形词条目（若原形已收录）
- goes｜词形变化词：词形条目，Wiktionary 只标原形「go」，无独立词源小节；词源随原形词条目（若原形已收录）
- got｜词形变化词：词形条目，Wiktionary 只标原形「get」，无独立词源小节；词源随原形词条目（若原形已收录）
- we / us / our / ours｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- they / them / their / theirs｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- this / that / these / those｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- who / whom｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- how / how many / how much｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- closed｜词形变化词：词形条目，Wiktionary 只标原形「close」，无独立词源小节；词源随原形词条目（若原形已收录）
- sunglasses｜词形变化词：词形条目，Wiktionary 只标原形「sunglass」，无独立词源小节；词源随原形词条目（若原形已收录）
- interesting｜词形变化词：词形条目，Wiktionary 只标原形「interest」，无独立词源小节；词源随原形词条目（若原形已收录）
- tired｜词形变化词：词形条目，Wiktionary 只标原形「tire」，无独立词源小节；词源随原形词条目（若原形已收录）
- shorts｜词形变化词：词形条目，Wiktionary 只标原形「short#Noun」，无独立词源小节；词源随原形词条目（若原形已收录）
- shopping｜词形变化词：词形条目，Wiktionary 只标原形「shop」，无独立词源小节；词源随原形词条目（若原形已收录）
- polar bear｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- grandparents｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「grandparent」，无独立词源小节；词源随原形词条目（若原形已收录）
- parents｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「parent」，无独立词源小节；词源随原形词条目（若原形已收录）
- boots｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「boot」，无独立词源小节；词源随原形词条目（若原形已收录）
- glasses｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「glass」，无独立词源小节；词源随原形词条目（若原形已收录）
- living room｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- chopsticks｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「chopstick」，无独立词源小节；词源随原形词条目（若原形已收录）
- noodles｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「noodle」，无独立词源小节；词源随原形词条目（若原形已收录）
- vegetables｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「vegetable」，无独立词源小节；词源随原形词条目（若原形已收录）
- some / any｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- underground｜词形变化词：词形条目，Wiktionary 只标原形「undergrind」，无独立词源小节；词源随原形词条目（若原形已收录）
- interested｜词形变化词：词形条目，Wiktionary 只标原形「interest」，无独立词源小节；词源随原形词条目（若原形已收录）
- excited｜词形变化词：词形条目，Wiktionary 只标原形「excite」，无独立词源小节；词源随原形词条目（若原形已收录）
- exciting｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「excite」，无独立词源小节；词源随原形词条目（若原形已收录）
- bored｜词形变化词：词形条目，Wiktionary 只标原形「bore」，无独立词源小节；词源随原形词条目（若原形已收录）
- handwriting｜词形变化词：词形条目，Wiktionary 只标原形「handwrite」，无独立词源小节；词源随原形词条目（若原形已收录）
- seahorse｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「sea horse」，无独立词源小节；词源随原形词条目（若原形已收录）
- painting｜词形变化词：词形条目，Wiktionary 只标原形「paint」，无独立词源小节；词源随原形词条目（若原形已收录）
- walking stick｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- hard-working｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「hardworking」，无独立词源小节；词源随原形词条目（若原形已收录）
- drinking｜词形变化词：词形条目，Wiktionary 只标原形「drink」，无独立词源小节；词源随原形词条目（若原形已收录）
- sleeping｜词形变化词：词形条目，Wiktionary 只标原形「sleep」，无独立词源小节；词源随原形词条目（若原形已收录）
- turns｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「turn」，无独立词源小节；词源随原形词条目（若原形已收录）
- shorter｜无词源可考：Wiktionary 无词源小节，Etymonline 与牛津词源栏也都没有可核的来源说法
- older｜无词源可考：Wiktionary 无词源小节，Etymonline 与牛津词源栏也都没有可核的来源说法
- bigger｜无词源可考：Wiktionary 无词源小节，Etymonline 与牛津词源栏也都没有可核的来源说法
- smaller｜无词源可考：Wiktionary 无词源小节，Etymonline 与牛津词源栏也都没有可核的来源说法
- sang｜词形变化词：词形条目，Wiktionary 只标原形「sing」，无独立词源小节；词源随原形词条目（若原形已收录）
- swam｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「swim」，无独立词源小节；词源随原形词条目（若原形已收录）
- drank｜词形变化词：词形条目，Wiktionary 只标原形「drink」，无独立词源小节；词源随原形词条目（若原形已收录）
- moving｜词形变化词：词形条目，Wiktionary 只标原形「move」，无独立词源小节；词源随原形词条目（若原形已收录）
- pen pal｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- background｜词形变化词：词形条目，Wiktionary 只标原形「backgrind」，无独立词源小节；词源随原形词条目（若原形已收录）
- crossing｜词形变化词：词形条目，Wiktionary 只标原形「cross」，无独立词源小节；词源随原形词条目（若原形已收录）
- post office｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- hiking｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「hike」，无独立词源小节；词源随原形词条目（若原形已收录）
- studies｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「study#Noun」，无独立词源小节；词源随原形词条目（若原形已收录）
- worried｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「worry」，无独立词源小节；词源随原形词条目（若原形已收录）
- heavier｜无词源可考：Wiktionary 无词源小节，Etymonline 与牛津词源栏也都没有可核的来源说法
- taller｜无词源可考：Wiktionary 无词源小节，Etymonline 与牛津词源栏也都没有可核的来源说法
- younger｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「junior」，无独立词源小节；词源随原形词条目（若原形已收录）
- cleaned｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「clean」，无独立词源小节；词源随原形词条目（若原形已收录）
- slept｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「sleep」，无独立词源小节；词源随原形词条目（若原形已收录）
- stayed｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「stay」，无独立词源小节；词源随原形词条目（若原形已收录）
- washed｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「wash」，无独立词源小节；词源随原形词条目（若原形已收录）
- watched｜词形变化词：词形条目，Wiktionary 只标原形「watch」，无独立词源小节；词源随原形词条目（若原形已收录）
- bought｜词形变化词：词形条目，Wiktionary 只标原形「buy」，无独立词源小节；词源随原形词条目（若原形已收录）
- rode｜词形变化词：词形条目，Wiktionary 只标原形「ride」，无独立词源小节；词源随原形词条目（若原形已收录）
- dining hall｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- how old / how tall / how heavy｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- tomatoes｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「tomato」，无独立词源小节；词源随原形词条目（若原形已收录）
- potatoes｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「potato」，无独立词源小节；词源随原形词条目（若原形已收录）
- heroes｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「hero」，无独立词源小节；词源随原形词条目（若原形已收录）
- photos｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「photo」，无独立词源小节；词源随原形词条目（若原形已收录）
- pianos｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「piano」，无独立词源小节；词源随原形词条目（若原形已收录）
- zoos｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「zoo」，无独立词源小节；词源随原形词条目（若原形已收录）
- babies｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「baby」，无独立词源小节；词源随原形词条目（若原形已收录）
- cities｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「city」，无独立词源小节；词源随原形词条目（若原形已收录）
- libraries｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「library」，无独立词源小节；词源随原形词条目（若原形已收录）
- dictionaries｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「dictionary」，无独立词源小节；词源随原形词条目（若原形已收录）
- went｜词形变化词：词形条目，Wiktionary 只标原形「go」，无独立词源小节；词源随原形词条目（若原形已收录）
- ate｜词形变化词：词形条目，Wiktionary 只标原形「eat」，无独立词源小节；词源随原形词条目（若原形已收录）
- did｜词形变化词：词形条目，Wiktionary 只标原形「do」，无独立词源小节；词源随原形词条目（若原形已收录）
- brought｜词形变化词：词形条目，Wiktionary 只标原形「bring」，无独立词源小节；词源随原形词条目（若原形已收录）
- caught｜词形变化词：词形条目，Wiktionary 只标原形「catch」，无独立词源小节；词源随原形词条目（若原形已收录）
- took｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「take」，无独立词源小节；词源随原形词条目（若原形已收录）
- came｜词形变化词：词形条目，Wiktionary 只标原形「come」，无独立词源小节；词源随原形词条目（若原形已收录）
- ran｜词形变化词：词形条目，Wiktionary 只标原形「run」，无独立词源小节；词源随原形词条目（若原形已收录）
- wrote｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「write」，无独立词源小节；词源随原形词条目（若原形已收录）
- drew｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「draw」，无独立词源小节；词源随原形词条目（若原形已收录）
- swept｜词形变化词：词形条目，Wiktionary 只标原形「sweep」，无独立词源小节；词源随原形词条目（若原形已收录）
- met｜词形变化词：词形条目，Wiktionary 只标原形「meet」，无独立词源小节；词源随原形词条目（若原形已收录）
- sent｜词形变化词：词形条目，Wiktionary 只标原形「send」，无独立词源小节；词源随原形词条目（若原形已收录）
- spent｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「spend」，无独立词源小节；词源随原形词条目（若原形已收录）
- built｜词形变化词：词形条目，Wiktionary 只标原形「build」，无独立词源小节；词源随原形词条目（若原形已收录）
- found｜词形变化词：词形条目，Wiktionary 只标原形「find」，无独立词源小节；词源随原形词条目（若原形已收录）
- sold｜词形变化词：词形条目，Wiktionary 只标原形「sell」，无独立词源小节；词源随原形词条目（若原形已收录）
- heard｜词形变化词：词形条目，Wiktionary 只标原形「hear」，无独立词源小节；词源随原形词条目（若原形已收录）
- biggest｜无词源可考：Wiktionary 无词源小节，Etymonline 与牛津词源栏也都没有可核的来源说法
- happier｜无词源可考：Wiktionary 无词源小节，Etymonline 与牛津词源栏也都没有可核的来源说法
- leaves｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「leaf」，无独立词源小节；词源随原形词条目（若原形已收录）
- knives｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「knife」，无独立词源小节；词源随原形词条目（若原形已收录）
- wolves｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「wolf」，无独立词源小节；词源随原形词条目（若原形已收录）
- seat belt｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- police station｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- fire station｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- maths｜词形变化词：词形条目，Wiktionary 只标原形「math」，无独立词源小节；词源随原形词条目（若原形已收录）
- PE｜无词源可考：Wiktionary 无词源小节，Etymonline 与牛津词源栏也都没有可核的来源说法
- pencil-box｜无词源可考：Wiktionary 无此词条，Etymonline 与牛津词源栏也都没有条目
- stairs｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「stair」，无独立词源小节；词源随原形词条目（若原形已收录）
- boring｜词形变化词：词形条目，Wiktionary 只标原形「bore」，无独立词源小节；词源随原形词条目（若原形已收录）
- surprised｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「surprise」，无独立词源小节；词源随原形词条目（若原形已收录）
- look for｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- jeans｜词形变化词：词形条目，Wiktionary 只标原形「jean」，无独立词源小节；词源随原形词条目（若原形已收录）
- put on｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- take off｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- try on｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- its｜词形变化词：词形条目，Wiktionary 只标原形「it」，无独立词源小节；词源随原形词条目（若原形已收录）
- in front of｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- police officer｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- seed｜词形变化词：词形条目，Wiktionary 只标原形「see」，无独立词源小节；词源随原形词条目（若原形已收录）
- Spring Festival｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- Mid-Autumn Day｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- Children's Day｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- Teachers' Day｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- National Day｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- New Year｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- Dragon Boat Festival｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- skating｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「skate」，无独立词源小节；词源随原形词条目（若原形已收录）
- skiing｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「ski」，无独立词源小节；词源随原形词条目（若原形已收录）
- cycling｜词形变化词：词形条目，Wiktionary 只标原形「cycle」，无独立词源小节；词源随原形词条目（若原形已收录）
- camping｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「camp」，无独立词源小节；词源随原形词条目（若原形已收录）
- boating｜词形变化词：词形条目，Wiktionary 只标原形「boat」，无独立词源小节；词源随原形词条目（若原形已收录）
- table tennis｜多词条目：短语或词形组，不是单个词，没有单独的词源条目可核
- cola｜词形变化词：词形条目，Wiktionary 只标原形「colon」，无独立词源小节；词源随原形词条目（若原形已收录）
- castles｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「castle」，无独立词源小节；词源随原形词条目（若原形已收录）
- cues｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「cue」，无独立词源小节；词源随原形词条目（若原形已收录）
- easier｜无词源可考：Wiktionary 无词源小节，Etymonline 与牛津词源栏也都没有可核的来源说法
- fought｜词形变化词：词形条目，Wiktionary 只标原形「fight」，无独立词源小节；词源随原形词条目（若原形已收录）
- grew｜词形变化词：词形条目，Wiktionary 只标原形「grow」，无独立词源小节；词源随原形词条目（若原形已收录）
- judged｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「judge」，无独立词源小节；词源随原形词条目（若原形已收录）
- pronounced｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「pronounce」，无独立词源小节；词源随原形词条目（若原形已收录）
- sought｜词形变化词：词形条目，Wiktionary 只标原形「seek」，无独立词源小节；词源随原形词条目（若原形已收录）
- wars｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「war」，无独立词源小节；词源随原形词条目（若原形已收录）
- beers｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「beer」，无独立词源小节；词源随原形词条目（若原形已收录）
- inboard｜无词源可考：Wiktionary 无词源小节，Etymonline 与牛津词源栏也都没有可核的来源说法
- sat｜词形变化词：词形条目，Wiktionary 只标原形「sit」，无独立词源小节；词源随原形词条目（若原形已收录）
- they're｜无词源可考：Wiktionary 无词源小节，Etymonline 与牛津词源栏也都没有可核的来源说法
- begun｜词形变化词：词形条目，Wiktionary 只标原形「begin」，无独立词源小节；词源随原形词条目（若原形已收录）
- forgot｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「forget」，无独立词源小节；词源随原形词条目（若原形已收录）
- ridden｜词形变化词：词形条目，Wiktionary 只标原形「ride」，无独立词源小节；词源随原形词条目（若原形已收录）
- seen｜词形变化词：词形条目，Wiktionary 只标原形「see」，无独立词源小节；词源随原形词条目（若原形已收录）
- spoken｜词形变化词：词形条目，Wiktionary 只标原形「speak」，无独立词源小节；词源随原形词条目（若原形已收录）
- sunk｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「sink」，无独立词源小节；词源随原形词条目（若原形已收录）
- swum｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「swim」，无独立词源小节；词源随原形词条目（若原形已收录）
- woken｜词形变化词：词形条目，Wiktionary 只标原形「wake」，无独立词源小节；词源随原形词条目（若原形已收录）
- worn｜词形变化词：词形条目，Wiktionary 只标原形「wear」，无独立词源小节；词源随原形词条目（若原形已收录）
- rewritten｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「rewrite」，无独立词源小节；词源随原形词条目（若原形已收录）
- rewrote｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「rewrite」，无独立词源小节；词源随原形词条目（若原形已收录）
- undertaken｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「undertake」，无独立词源小节；词源随原形词条目（若原形已收录）
- undertook｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「undertake」，无独立词源小节；词源随原形词条目（若原形已收录）
- became｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「become」，无独立词源小节；词源随原形词条目（若原形已收录）
- began｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「begin」，无独立词源小节；词源随原形词条目（若原形已收录）
- broke｜词形变化词：词形条目，Wiktionary 只标原形「break」，无独立词源小节；词源随原形词条目（若原形已收录）
- chose｜词形变化词：词形条目，Wiktionary 只标原形「choose,chuse<l:archaic,_,spelling>」，无独立词源小节；词源随原形词条目（若原形已收录）
- knew｜词形变化词：词形条目，Wiktionary 只标原形「know」，无独立词源小节；词源随原形词条目（若原形已收录）
- rang｜词形变化词：词形条目，Wiktionary 只标原形「ring」，无独立词源小节；词源随原形词条目（若原形已收录）
- shone｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「shine」，无独立词源小节；词源随原形词条目（若原形已收录）
- showed｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「show」，无独立词源小节；词源随原形词条目（若原形已收录）
- sank｜词形变化词：词形条目，Wiktionary 只标原形「sink」，无独立词源小节；词源随原形词条目（若原形已收录）
- threw｜词形变化词：词形条目，Wiktionary 只标原形「throw」，无独立词源小节；词源随原形词条目（若原形已收录）
- woke｜词形变化词：词形条目，Wiktionary 只标原形「wake」，无独立词源小节；词源随原形词条目（若原形已收录）
- wore｜词形变化词：词形条目，Wiktionary 只标原形「wear」，无独立词源小节；词源随原形词条目（若原形已收录）
- fed｜词形变化词：词形条目，Wiktionary 只标原形「feed」，无独立词源小节；词源随原形词条目（若原形已收录）
- lent｜词形变化词：词形条目，Wiktionary 只标原形「lend」，无独立词源小节；词源随原形词条目（若原形已收录）
- paid｜词形变化词：词形条目，Wiktionary 只标原形「pay」，无独立词源小节；词源随原形词条目（若原形已收录）
- understood｜词形变化词：词形条目，Wiktionary 只标原形「understand」，无独立词源小节；词源随原形词条目（若原形已收录）
- retold｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「retell」，无独立词源小节；词源随原形词条目（若原形已收录）
- upheld｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「uphold」，无独立词源小节；词源随原形词条目（若原形已收录）
- held｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「hold」，无独立词源小节；词源随原形词条目（若原形已收录）
- led｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「lead」，无独立词源小节；词源随原形词条目（若原形已收录）
- risen｜词形变化词：词形条目，Wiktionary 只标原形「rise」，无独立词源小节；词源随原形词条目（若原形已收录）
- slid｜词形变化词：复数/动词变形/同义变体等词形条目，Wiktionary 只标原形「slide」，无独立词源小节；词源随原形词条目（若原形已收录）
- cosmos｜词形变化词：词形条目，Wiktionary 只标原形「cosmo」，无独立词源小节；词源随原形词条目（若原形已收录）
- felt｜词形变化词（2026-11-02 普查订正移出）：feel 的过去式/过去分词；原 verified 记录所系古英语 felt「毛毡」链是另一个同形词，词源随原形 feel（verified 已收录）；订正详见第九节
- saw｜词形变化词（2026-11-02 普查订正移出）：see 的过去式；原 verified 记录所系「锯子」链（古英语 saga）是另一个同形词，词源随原形 see（verified 已收录）；订正详见第九节
- ground｜词形变化词（2026-11-02 普查订正移出）：grind 的过去式/过去分词；原 verified 记录所系名词 ground「地面」链（古英语 grund）是另一个词，词源随原形 grind（verified 已收录）；订正详见第九节

## 四、争议词清单（两说并记，不擅自裁定；以下为 verified 中来源自注未定论者）

- **action**：来源还没有完全定论（Etymonline 原文措辞：“The meaning "noteworthy or important activity" in a modern sense by 1933, as in the figurative phrase a piece of the action (by 1965), perhaps from a sense of action in card-playing jargon attested by 1914”）
- **all**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|all}}, from {{inh|en|ang|eall}}, from {{inh|en|gmw-pro|*all}}, from {{inh|en|gem-pro|*allaz}}, of uncertain origin<ref>{{R:Etymonline}}</ref> but perhaps from {{der|en|ine-pro|*h₂el-|id=all|t=all}}. {{col-top|2|cog}} Cogna…”）
- **april**：来源还没有完全定论（Etymonline 原文措辞：“1300, aueril , from Old French avril (11c.), from Latin (mensis) Aprilis , second month of the ancient Roman calendar, from a stem of uncertain origin and meaning, with month-name suffix -ilis as in Quintilis , Sextilis (the old names of Ju…”）
- **back**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|bak}}, from {{inh|en|ang|bæc}}, from {{inh|en|gmw-pro|*bak}}, from {{inh|en|gem-pro|*baką}}, possibly from {{inh|en|ine-pro|*bʰeg-|t=to bend}}”）
- **beach**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of beach beach (n.) 1530s, "loose, water-worn pebbles of the seashore," probably from a dialectal survival of Old English bece , bece "stream," according to Barnhart from Proto-Germanic *bakiz (source also of Dutch beek ,…”）
- **beak**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of beak beak (n.) mid-13c., "bird's bill," from Old French bec "beak," figuratively "mouth," also "tip or point of a nose, a lance, a ship, or a shoe," from Late Latin beccus (source also of Italian becco , Spanish pico )…”）
- **beer**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of beer beer (n.) alcoholic drink made from grain (generally barley), infused with hops and boiled and fermented, Middle English ber , from Old English beor "strong drink, beer, mead," cognate with Old Frisian biar , Midd…”）
- **better**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of better better (adj., adv.) Middle English bettre , from Old English bettra , earlier betera "of superior quality or excellence," from Proto-Germanic *batizo- , perhaps from PIE *bhad- "good," but Boutkan finds no good …”）
- **black**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|blak}}, {{m|enm|black}}, {{m|enm|blake}}, from {{inh|en|ang|blæc||black, dark", ''also'' "ink}}, from {{inh|en|gmw-pro|*blak}}, from {{inh|en|gem-pro|*blakaz||burnt}}, possibly from {{inh|en|ine-pro|*bʰleg-||to burn, shine…”）
- **blind**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of blind blind (adj.) Old English blind "destitute of sight," also "dark, enveloped in darkness, obscure; unintelligent, lacking mental perception," probably from Proto-Germanic *blindaz "blind" (source also of Old Frisia…”）
- **blood**：来源还没有完全定论（Etymonline 原文措辞：“There seems to have been an avoidance in Germanic, perhaps from taboo, of other PIE words for "blood," such as *esen- (source of poetic Greek ear , Old Latin aser , Sanskrit asrk , Hittite eshar ); also *krew- , which seems to have had a se…”）
- **blouse**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of blouse blouse (n.) "light, loose upper garment of linen or cotton," 1828 (from 1822 as a French word in English), from French blouse , "workman's or peasant's smock" (1788), which is of unknown origin”）
- **boat**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of boat boat (n.) "small open vessel (smaller than a ship ) used to cross waters, propelled by oars, a sail, or (later) an engine," Middle English bot , from Old English bat , from Proto-Germanic *bait- (source also of Ol…”）
- **body**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of body body (n.) Middle English bodi , from Old English bodig "trunk of a man or beast; the whole physical structure of a human or animal; material frame, material existence of a human; main or principal part of anything…”）
- **bone**：来源还没有完全定论（Etymonline 原文措辞：“bone (v.2) especially in bone up "study," 1880s student slang, probably from or reinforced by "Bohn's Classical Library," the popular series in higher education published by German-born English publisher Henry George Bohn (1796-1884) as par…”）
- **boot**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of boot boot (n.1) "covering for the foot and lower leg," early 14c., from Old French bote "boot" (12c.), with corresponding words in Provençal, Spanish, and Medieval Latin, all of unknown origin, perhaps from a Germanic …”）
- **box**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of box box (n.1) "rectangular wooden container," usually with a lid, Old English box , also the name of a type of shrub, from Late Latin buxis , from Greek pyxis "boxwood," pyxion "writing table, box," made of boxwood, fr…”）
- **branch**：来源还没有完全定论（Etymonline 原文措辞：“1300, braunch , "division or subdivision of the stem of a tree or bush" (also used of things resembling a branch in its relation to a trunk, such as geographic features, lines of family descent), from Old French branche "branch, bough, twig…”）
- **brave**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of brave brave (adj.) "exhibiting courage or courageous endurance," late 15c., from French brave , "splendid, valiant," from Italian bravo "brave, bold," originally "wild, savage," a word of uncertain origin”）
- **bride**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of bride bride (n.) "woman newly married or about to be," Old English bryd "bride, betrothed or newly married woman," from Proto-Germanic *bruthiz "woman being married" (source also of Old Frisian breid , Dutch bruid , Ol…”）
- **broad**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of broad broad (adj.) Old English brad "wide, not narrow," also "flat, open, extended," from Proto-Germanic *braidi- (source also of Old Frisian bred , Old Norse breiðr , Dutch breed , German breit , Gothic brouþs ), whic…”）
- **buy**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of buy buy (v.) Middle English bien , from Old English bycgan (past tense bohte ) "get by paying for, acquire the possession of in exchange for something of like value; redeem, ransom; procure; get done," from Proto-Germa…”）
- **cake**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|cake}}, from {{der|en|non|kaka||cake}} (compare {{cog|no|kake}}, Icelandic/Swedish {{m|sv|kaka}}, Danish {{m|da|kage}}), from {{der|en|gem-pro|*kakǭ}}, of disputed origin”）
- **camera**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of camera camera (n.) 1708, "vaulted building; arched roof or ceiling," from Latin camera "a vault, vaulted room" (source also of Italian camera , Spanish camara , French chambre ), from Greek kamara "vaulted chamber, any…”）
- **camp**：来源还没有完全定论（Etymonline 原文措辞：“also from 1520s camp (adj.) "tasteless," 1909, homosexual slang, of uncertain origin, perhaps from mid-17c”）
- **campus**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of campus campus (n.) "college grounds," 1774, from Latin campus "flat land, field," from Proto-Italic *kampo- "field," a word of uncertain origin”）
- **candle**：来源还没有完全定论（Etymonline 原文措辞：“To hold a candle to originally meant "to help in a subordinate capacity," perhaps from the notion of an assistant or apprentice holding a candle for light while the master works, or from devotional candles borne in Church ceremonies (compar…”）
- **cap**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of cap cap (n.) late Old English cæppe "hood, head-covering, cape," a general Germanic borrowing (compare Old Frisian and Middle Dutch kappe , Old High German chappa ) from Late Latin cappa "a cape, hooded cloak" (source …”）
- **card**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of card card (n.1) early 15c., "a playing card," from Old French carte (14c.), from Medieval Latin carta / charta "a card, paper; a writing, a charter," from Latin charta "leaf of paper, a writing, tablet," from Greek kha…”）
- **careless**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of careless careless (adj.) Old English carleas "free from anxiety; unconcerned," from care (n.) + -less ; a compound probably from Proto-Germanic (compare Old Norse kærulauss "quit, free")”）
- **character**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of character character (n.) mid-14c., carecter , "symbol marked or branded on the body;" mid-15c., "symbol or drawing used in sorcery;" late 15c., "alphabetic letter, graphic symbol standing for a sound or syllable;" from…”）
- **cheap**：来源还没有完全定论（Etymonline 原文措辞：“1500, ultimately from Old English noun ceap "traffic, a purchase," from ceapian (v.) "to trade, buy and sell," probably from early Germanic borrowings of Latin caupo "petty tradesman, huckster, peddler," cauponari "to haggle" (see chapman )”）
- **cheer**：来源还没有完全定论（Etymonline 原文措辞：“1200, "the face, countenance," especially as expressing emotion, from Anglo-French chere "the face," Old French chiere "face, countenance, look, expression," from Late Latin cara "face" (source also of Spanish cara ), possibly from Greek ka…”）
- **cheese**：来源还没有完全定论（Etymonline 原文措辞：“This is of unknown origin; perhaps (Watkins) from a PIE root *kwat- "to ferment, become sour" (source also of Prakrit chasi "buttermilk;" Old Church Slavonic kvasu "leaven; fermented drink," kyselu "sour," -kyseti "to turn sour;" Czech kysa…”）
- **cherry**：来源还没有完全定论（Etymonline 原文措辞：“1300, earlier in surname Chyrimuth (1266, literally "Cherry-mouth"); from Anglo-French cherise , from Old North French cherise (Old French, Modern French cerise , 12c.), from Vulgar Latin *ceresia , from late Greek kerasian "cherry," from G…”）
- **chew**：来源还没有完全定论（Etymonline 原文措辞：“This is perhaps from PIE *gyeu- "to chew" (source also of Old Church Slavonic živo "to chew," Lithuanian žiaunos "jaws," Persian javidan "to chew")”）
- **child**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|child}}, from {{inh|en|ang|ċild}}, from {{inh|en|gmw-pro|*kilþ}}, {{m|gmw-pro|*kelþ}}, from {{inh|en|gem-pro|*kelþaz||[[womb]]; [[fetus]]}}, from {{der|en|ine-pro|*ǵelt-||[[womb]]}}, perhaps from {{der|en|ine-pro|*gel-||to…”）
- **chip**：来源还没有完全定论（Etymonline 原文措辞：“To chip in "contribute" (1861) is American English, perhaps from card-playing; but compare chop in "interrupt by remarking" (1540s)”）
- **chorus**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of chorus chorus (n.) 1560s, in drama, "person who speaks the prologue and explains or comments on events on stage," from Latin chorus "a dance in a circle, the persons singing and dancing, the chorus of a tragedy," from …”）
- **circus**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of circus circus (n.) late 14c., in reference to the large, oblong, unroofed enclosures used for races, etc., in ancient Rome, from Latin circus "ring, circular line," which was applied by Romans to circular arenas for pe…”）
- **clock**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of clock clock (n.1) "machine to measure and indicate time mechanically" (since late 1940s also electronically), late 14c., clokke , originally "clock with bells," probably from Middle Dutch clocke (Dutch klok ) "a clock,…”）
- **cloth**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|cloth}}, {{m|enm|clath}}, from {{inh|en|ang|clāþ|t=cloth, clothes, covering, sail}}, from {{inh|en|gmw-pro|*klaiþ}}, from {{inh|en|gem-pro|*klaiþą|t=garment}}, perhaps from {{der|en|ine-pro|*gleyt-|t=to cling to, cleave, s…”）
- **coin**：来源还没有完全定论（Etymonline 原文措辞：“1300, "a wedge, a wedge-shaped piece used for some purpose," from Old French coing (12c.) "a wedge; stamp; piece of money;" usually "corner, angle," from Latin cuneus "a wedge," which is of unknown origin”）
- **come**：来源还没有完全定论（Etymonline 原文措辞：“Modern past tense form came is Middle English, probably from Old Norse kvam , replacing Old English cuom”）
- **crayon**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of crayon crayon (n.) "pencil-shaped piece of colored clay, chalk, etc., used for drawing on paper," 1640s, from French crayon "pencil" (16c.), originally "chalk pencil," from craie "chalk," from Latin creta "chalk, pipe-…”）
- **cream**：来源还没有完全定论（Etymonline 原文措辞：“This word is a blend of Late Latin chrisma "ointment" (from Greek khrisma "unguent;" from PIE root *ghrei- "to rub") and Late Latin cramum "cream," which is of uncertain origin, perhaps from Gaulish”）
- **cross**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of cross cross (n.) Old English cros "instrument of Christ's crucifixion; symbol of Christianity" (mid-10c.), probably from Old Norse or another Scandinavian source, picked up by the Norse from Old Irish cros , from Latin…”）
- **cucumber**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of cucumber cucumber (n.) "common running garden plant," cultivated from earliest times in many Old World countries, also the long, fleshy fruit of the plant, late 14c., cucomer , from Old French cocombre (13c., Modern Fr…”）
- **daughter**：来源还没有完全定论（Etymonline 原文措辞：“Earlier was sonnes wif (early 14c.), earlier still snore , from Old English snoru , cognate with Old Norse snör , archaic German Schnur , from PIE root *snuso- (source also of Sanskrit snuṣa- , Greek nyos , Latin nurus (itself the source of…”）
- **dead**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of dead dead (adj.) Middle English ded , from Old English dead "having ceased to live," also "torpid, dull;" of water, "still, standing," from Proto-Germanic *daudaz (source also of Old Saxon dod , Danish død , Swedish dö…”）
- **dear**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|dere}}, from {{inh|en|ang|dēore}}, {{m|ang|dīere}}, {{m|ang|dīore}}, {{m|ang|dȳre|t=of great value or excellence, expensive, beloved}}, from {{inh|en|gmw-pro|*diurī}}, from {{inh|en|gem-pro|*diurijaz|t=dear, precious; expe…”）
- **december**：来源还没有完全定论（Etymonline 原文措辞：“The -ber in four Latin month names is probably from -bris , an adjectival suffix”）
- **deer**：来源还没有完全定论（Etymonline 原文措辞：“This is perhaps from PIE *dheusom "creature that breathes," from root *dheu- (1) "cloud, breath" (source also of Lithuanian dusti "gasp," dvėsti "gasp, perish;" Old Church Slavonic dychati "breathe")”）
- **degree**：来源还没有完全定论（Etymonline 原文措辞：“(The division of the circle into 360 degrees was known in Babylon and Egypt; the number is perhaps from the daily motion of the sun through the zodiac in the course of a year.) From 1540s as "a measure of heat;" the specific use as a unit o…”）
- **dish**：来源还没有完全定论（Etymonline 原文措辞：“German tischen is "serve the table" and Swedish diska is "to wash dishes." The modern slang meaning "to disparage, denigrate" is attested by 1940s; probably from the same figurative notion in dish it out "administer punishment" (1934)”）
- **drive**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of drive drive (v.) Old English drifan "to compel or urge to move, impel in some direction or manner; to hunt (deer), pursue; to rush against" (class I strong verb; past tense draf , past participle drifen ), from Proto-G…”）
- **duck**：来源还没有完全定论（Etymonline 原文措辞：“duck (n.2) "strong, untwilled linen (later cotton) fabric," used for sails and sailors' clothing, 1630s, from Dutch doeck "linen cloth" (Middle Dutch doec ), from Proto-Germanic *dōkaz , a word of uncertain etymology (source also of German …”）
- **dynamic**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of dynamic dynamic (adj.) by 1812, "pertaining to mechanical forces not in equilibrium, pertaining to force producing motion" (the opposite of static ), from French dynamique introduced by German mathematician Gottfried L…”）
- **earth**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of earth earth (n.) Middle English erthe , from Old English eorþe "ground, soil, dirt, dry land; country, district," also used (along with middangeard ) for "the (material) world, the abode of man" (as opposed to the heav…”）
- **ebb**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of ebb ebb (n.) Old English ebba "falling of the tide, low tide," perhaps from Proto-Germanic *af- (source also of Old Frisian ebba , Old Saxon ebbiunga , Middle Dutch ebbe , Dutch eb , German Ebbe ), from PIE root *apo- …”）
- **echo**：来源还没有完全定论（Wiktionary 原文措辞：“Possibly from the same {{der|en|ine-pro|-}} root as {{m|en|sough}}.”）
- **emu**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of emu emu (n.) large Australian three-toed bird, 1610s, probably from Portuguese ema "crane, ostrich" (which is of unknown origin), perhaps based on a folk-etymology of a native name”）
- **feather**：来源还没有完全定论（Etymonline 原文措辞：“In reference to oars (later paddles, propellers, etc.), "turn the blades in a horizontal position on lifting them from the water at the end of each stroke," to afford as little resistance as possible, it is attested from 1740, perhaps from …”）
- **february**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of February February (n.) month following January, late 14c., ultimately from Latin februarius mensis "month of purification," from februare "to purify," from februa "purifications, expiatory rites" (plural of februum "me…”）
- **feel**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of feel feel (v.) Old English felan "to touch or have a sensory experience of; perceive, sense (something)," in late Old English "have a mental perception," from Proto-Germanic *foljanan (source also of Old Saxon gifolian…”）
- **fetch**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of fetch fetch (v.) Middle English fecchen , from Old English feccan "to bring, bring to; seek, gain, take," apparently a variant of fetian , fatian "bring near, bring back, obtain; induce; marry," which is probably from …”）
- **fever**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of fever fever (n.) earlier also feaver , late Old English fefor , fefer "fever, temperature of the body higher than normal," from Latin febris "fever," related to fovere "to warm, heat," which is probably from PIE root *…”）
- **fight**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of fight fight (v.) Old English feohtan "to combat, contend with weapons, strive; attack; gain by fighting, win" (intransitive; class III strong verb; past tense feaht , past participle fohten ), from Proto-Germanic *fe(u…”）
- **fish**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of fish fish (n.) "a vertebrate which has gills and fins adapting it for living in the water," Old English fisc "fish," from Proto-Germanic *fiskaz (source also of Old Saxon, Old Frisian, Old High German fisc , Old Norse …”）
- **fleece**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of fleece fleece (n.) "wool coat of a sheep," Old English fleos , flies "fleece, wool, fur, sealskin," from West Germanic *flusaz (source also of Middle Dutch vluus , Dutch vlies , Middle High German vlius , German Vlies …”）
- **folk**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|folk}}, from {{inh|en|ang|folc}}, from {{inh|en|gmw-pro|*folk}}, from {{inh|en|gem-pro|*fulką}}, possibly from {{inh|en|ine-pro||*pl̥h₁-gós}}, from {{m|ine-pro|*pleh₁-||to fill}}.  Cognate with {{cog|stq|Foulk}}, {{cog|fy|…”）
- **fork**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of fork fork (n.) Old English forca , force "pitchfork, forked instrument, forked weapon," from a Germanic borrowing (Old Frisian forke , Dutch vork , Old Norse forkr , Danish fork ) of Latin furca "two-pronged fork; pitc…”）
- **fox**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|fox}}, from {{inh|en|ang|fox|t=fox}}, from {{inh|en|gmw-pro|*fuhs}}, from {{inh|en|gem-pro|*fuhsaz|t=fox}}, from {{inh|en|ine-pro|*púḱsos|t=the tailed one}}, possibly from {{m|ine-pro|*puḱ-|t=tail}}. {{col-top|2|cog}} Cogn…”）
- **free**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of free free (adj.) Middle English fre , from Old English freo "exempt from; not in bondage, acting of one's own will," also "noble; joyful," from Proto-Germanic *friaz "beloved; not in bondage" (source also of Old Frisia…”）
- **fresh**：来源还没有完全定论（Etymonline 原文措辞：“slang, probably from German frech "insolent, cheeky," from Old High German freh "covetous," related to Old English frec "greedy, bold" (see freak (n.2))”）
- **fruit**：来源还没有完全定论（Etymonline 原文措辞：“The term also is noted in 1931 as tramp slang for "a girl or woman willing to oblige," probably from the fact of being "easy picking." Fruit salad is attested from 1861; fruit-cocktail from 1900; fruit-bat by 1869”）
- **game**：来源还没有完全定论（Etymonline 原文措辞：“1200 game (adj.1) "lame," 1787, from north Midlands dialect, of unknown origin, perhaps a variant of gammy (tramps' slang) "bad," or from Old North French gambe "leg" (see gambol (n.))”）
- **gift**：来源还没有完全定论（Etymonline 原文措辞：“1300, perhaps from earlier sense of "inspiration, power miraculously bestowed" (late 12c.), as in the Biblical gift of tongues”）
- **gnaw**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|gnawen}}, {{m|enm|gnaȝen}}, from {{inh|en|ang|gnagan}}, from {{inh|en|gmw-pro|*gnagan}}, from {{inh|en|gem-pro|*gnaganą|t=to gnaw}}, probably from {{der|en|ine-pro|*gʰnēgʰ-|t=to gnaw, scratch}}.  Cognate with {{cog|nl|knag…”）
- **gnome**：来源还没有完全定论（Etymonline 原文措辞：“in a treatise by Paracelsus, who gave the name pigmaei or gnomi to elemental earth beings, possibly from Greek *genomos "earth-dweller" (compare thalassonomos "inhabitant of the sea")”）
- **go**：来源还没有完全定论（Etymonline 原文措辞：“A defective verb throughout its recorded history; the Old English past tense was eode , a word of uncertain origin but evidently once a different verb (perhaps connected to Gothic iddja ); it was replaced 1400s by went , past tense of wende…”）
- **great**：来源还没有完全定论（Etymonline 原文措辞：“If the original sense was "coarse," it is perhaps from PIE root *ghreu- "to rub, grind," via the notion of "coarse grain," then "coarse," then "great;" but "the connextion is not free from difficulty" [OED]”）
- **guilt**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of guilt guilt (n.) Old English gylt "crime, sin, moral defect, failure of duty," of unknown origin, though some suspect a connection to Old English gieldan "to pay for, debt," but OED editors find this "inadmissible phon…”）
- **gulf**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|gulf}}, {{m|enm|goulf}}, {{m|enm|golf}}, from {{der|en|fro|golf}}, from {{der|en|it|golfo}}, from {{der|en|la-lat|colfos}}, from {{der|en|grc|κόλπος||bosom, gulf}}, of obscure origin, but possibly from {{der|en|ine-pro|*kʷ…”）
- **hair**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of hair hair (n.) Old English hær "hair, a hair," from Proto-Germanic *hēran (source also of Old Saxon, Old Norse, Old High German har , Old Frisian her , Dutch and German haar "hair"), perhaps from PIE *ghers- "to stand …”）
- **half**：来源还没有完全定论（Etymonline 原文措辞：“Perhaps from PIE root *skel- (1) "to cut," or perhaps a substratum word”）
- **hand**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of hand hand (n.) Old English hond , hand "the human hand;" also "side, part, direction" (in defining position, to either right or left); also "power, control, possession" (on the notion of the hand's grip or hold), from …”）
- **hat**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of hat hat (n.) Old English hæt "hat, head covering" (variously glossing Latin pileus , galerus , mitra , tiara ), from Proto-Germanic *hattuz "hood, cowl" (source also of Frisian hat , Old Norse hattr , höttr "a hood or …”）
- **hearth**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|herth}}, {{m|enm|herthe}}, from {{inh|en|ang|heorþ}}, from {{inh|en|gmw-pro|*herþ}}, from {{inh|en|gem-pro|*herþaz}}, possibly from {{der|en|ine-pro|*kerh₃-||heat; fire}}”）
- **heat**：来源还没有完全定论（Etymonline 原文措辞：“Meaning "a single course in a race," especially a horse race, is from 1660s, perhaps from earlier figurative sense of "violent action; a single intense effort" (late 14c.), or the meaning "run given to a horse to prepare for a race" (1570s)”）
- **help**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of help help (v.) Old English helpan "to help, support, succor; benefit, do good to; cure, amend" (transitive, class III strong verb; past tense healp , past participle holpen ), from Proto-Germanic *helpanan (source also…”）
- **hero**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of hero hero (n.1) late 14c., "man of superhuman strength or physical courage," from Old French heroe (14c., Modern French héros ), from Latin heros (plural heroes ) "hero, demi-god, illustrious man," from Greek hērōs (pl…”）
- **high**：来源还没有完全定论（Etymonline 原文措辞：“The group is of uncertain origin; perhaps related to Lithuanian kaukara "hill," from PIE *kouko-”）
- **honey**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of honey honey (n.) Middle English hony , from Old English hunig "honey," from Proto-Germanic *hunang- (source also of Old Norse hunang , Swedish honung , Old Saxon honeg , Old Frisian hunig , Middle Dutch honich , Dutch …”）
- **hope**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of hope hope (v.) Old English hopian "have the theological virtue of Hope; hope for (salvation, mercy), trust in (God's word)," also "to have trust, have confidence; assume confidently or trust" (that something is or will…”）
- **horse**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of horse horse (n.) "solidungulate perissodactyl mammal of the family Equidæ and genus Equus" [Century Dictionary], Old English hors "horse," from Proto-Germanic *harss- (source also of Old Norse hross , Old Frisian, Old …”）
- **hot**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of hot hot (adj.) Old English hat "hot, flaming, opposite of cold," used of the sun or air, of fire, of objects made hot; also "fervent, fierce, intense, excited," from Proto-Germanic *haita- (source also of Old Saxon and…”）
- **hour**：来源还没有完全定论（Etymonline 原文措辞：“Replaced Old English tid , literally "time" (see tide (n.)) and stund "period of time, point of time, hour," from Proto-Germanic *stundo (compare German Stunde "hour"), which is of uncertain origin”）
- **how**：来源还没有完全定论（Etymonline 原文措辞：“How come? for "why?" is recorded by 1848 [Bartlett], probably from earlier fuller expressions, e.g”）
- **hump**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of hump hump (n.) 1680s (in hump-backed ), of uncertain origin; perhaps from Dutch homp "lump," from Middle Low German hump "bump," from Proto-Germanic *hump- , from PIE *kemb- "to bend, turn, change, exchange" (see chang…”）
- **if**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of if if (conj.) "in case that; granting, allowing, or supposing that; on condition that;" also "although, notwithstanding that," Old English gif (initial g- in Old English pronounced with a sound close to Modern English …”）
- **ill**：来源还没有完全定论（Etymonline 原文措辞：“senses were "malevolent, hurtful, unfortunate, difficult"), from Old Norse illr "evil, bad; hard, difficult; mean, stingy," a word of unknown origin”）
- **inn**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of inn inn (n.) Old English inn "lodging, dwelling, house," probably from inne (adv.) "inside, within" (see in )”）
- **january**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|Januarie}}, {{m|enm|januari}}, re-latinised forms of {{cog|enm|Janevere}}, {{m|enm|Ieneuer}}, from {{der|en|xno|genever}}, from {{der|en|la|Iānuārius||(month) of Janus}}, a compound of {{com|la|Iānus|-ārius||pos1="[[Janus]…”）
- **june**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|June}}, {{m|enm|june}}, re-Latinised variants of earlier {{der|en|enm|Juyn}}, {{m|enm|juyng}}, from {{der|en|fro|juing}}, {{m|fro|juin}}, from {{der|en|la|iūnius}}, the month of the goddess {{m|la|Iuno||Juno}}, perhaps fro…”）
- **keep**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of keep keep (v.) Middle English kēpen , from late Old English cepan (past tense cepte ) "to seize, hold; seek after, desire," also "to observe or carry out in practice; look out for, regard, pay attention to," from Proto…”）
- **key**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of key key (n.1) "instrument for opening locks," Middle English keie , from Old English cæg "metal piece that works a lock, key" literal and figurative ("solution, explanation, one who or that which opens the way or expla…”）
- **kick**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of kick kick (v.) late 14c., "to strike out with the foot," of uncertain origin, perhaps from Old Norse kikna "bend backwards, sink at the knees." "The doubts OED has about the Scandinavian origin of kick are probably unf…”）
- **kid**：来源还没有完全定论（Etymonline 原文措辞：“1200, kide , "the young of a goat," from a Scandinavian source such as Old Norse kið "young goat," from Proto-Germanic *kidjom (source also of Old High German kizzi , German kitze , Danish and Swedish kid ), a word of uncertain origin”）
- **king**：来源还没有完全定论（Etymonline 原文措辞：“This is of uncertain origin”）
- **kiss**：来源还没有完全定论（Etymonline 原文措辞：“The vowel was uncertain through Middle English; for vowel evolution, see bury”）
- **knife**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of knife knife (n.) "hand-held cutting instrument consisting of a short blade and handle," late Old English cnif , probably from Old Norse knifr "knife, dirk," from Proto-Germanic *knibaz (source also of Middle Low German…”）
- **knight**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of knight knight (n.) Old English cniht "boy, youth; servant, attendant," a word common to the nearby Germanic languages (Old Frisian kniucht , Dutch knecht , Middle High German kneht "boy, youth, lad," German Knecht "ser…”）
- **lamp**：来源还没有完全定论（Etymonline 原文措辞：“1200, laumpe , "vessel containing flammable liquid and a wick to lift it by capillary action when lit," from Old French lampe "lamp, lights" (12c.), from Latin lampas "a light, torch, flambeau," from Greek lampas "a torch, oil-lamp, beacon-…”）
- **large**：来源还没有完全定论（Etymonline 原文措辞：“1200 (perhaps late Old English), of persons, "inclined to give or spend freely," also of gifts, "generous, lavish," of areas, "great in expanse." It is from Old French large "broad, wide; generous, bounteous" (12c.), from Latin largus "abun…”）
- **lawn**：来源还没有完全定论（Etymonline 原文措辞：“also from 1540s lawn (n.2) "thin linen or cotton cloth," early 15c., probably from Laon , city in northern France, a center of linen manufacture”）
- **lead**：本条「带领」链（Etymonline (v.1) × Wiktionary）双源对齐、无争议；仅同形词金属「铅」（古英语 lēad）更早来历未有定论，已登记于 JSON 争议栏。2026-11-02 订正，详见第九节。
- **leaf**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of leaf leaf (n.) Old English leaf "leaf of a plant, foliage; page of a book, sheet of paper," from Proto-Germanic *lauba- (source also of Old Saxon lof , Old Norse lauf , Old Frisian laf , Dutch loof , Old High German lo…”）
- **leg**：来源还没有完全定论（Etymonline 原文措辞：“Perhaps from a PIE root meaning "to bend" [Buck]”）
- **letter**：来源还没有完全定论（Etymonline 原文措辞：“1200, "graphic symbol, alphabetic sign, written character conveying information about sound in speech," from Old French letre "character, letter; missive, note," in plural, "literature, writing, learning" (10c., Modern French lettre ), from…”）
- **lie**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of lie lie (v.1) "speak falsely, tell an untruth for the purpose of misleading," Middle English lien , from Old English legan , ligan , earlier leogan "deceive, belie, betray" (class II strong verb; past tense leag , past…”）
- **lift**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|liften}}, {{m|enm|lyften}}, from {{der|en|non|lypta||to lift, air|lit=to raise in the air}}, from {{der|en|gem-pro|*luftijaną||to raise in the air}}, related to {{m|gem-pro|*luftuz||roof, air}}, perhaps from {{der|en|ine-p…”）
- **line**：来源还没有完全定论（Etymonline 原文措辞：“Meaning "one's occupation, branch of business" is from 1630s, according to OED probably from misunderstood KJV translation of II Corinthians x.16, "And not to boast in another mans line of things made ready to our hand," where line translat…”）
- **list**：来源还没有完全定论（Etymonline 原文措辞：“1600 list (v.1) "to tilt, lean, incline to one side," especially of a ship, 1880, earlier spelled lust (1620s), a word of unknown origin”）
- **look**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of look look (v.) Old English locian "use the eyes for seeing, gaze, look, behold, spy," from West Germanic *lokjan (source also of Old Saxon lokon "see, look, spy," Middle Dutch loeken "to look," Old High German luogen ,…”）
- **lot**：来源还没有完全定论（Etymonline 原文措辞：“The whole group is of unknown origin”）
- **low**：来源还没有完全定论（Etymonline 原文措辞：“This is not found in Old English, so the word is probably from Old Norse lagr "low, low-down, short; humble," or a similar Scandinavian source (compare Swedish låg , Danish lav ), from Proto-Germanic *lega- "lying flat, low" (source also of…”）
- **make**：来源还没有完全定论（Etymonline 原文措辞：“1400), make a book "arrange a series of bets" (1828), make hay "to turn over mown grass to expose it to sun." Make the grade is 1912, perhaps from the notion of railway engines going up an incline”）
- **mandate**：来源还没有完全定论（Etymonline 原文措辞：“1500, "a command, a judicial or legal order," from French mandat (15c.) and directly from Latin mandatum "commission, command, order," noun use of neuter past participle of mandare "to order, commit to one's charge," literally "to give into…”）
- **many**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of many many (adj.) "being or consisting of a large number of units or individuals," Middle English mani, manige "indefinitely numerous, many a, much," from Old English monig, manig , from Proto-Germanic *managaz (source …”）
- **march**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of march march (v.) "to walk with measured steps or a regular tread," either individually or as a body, early 15c., from Old French marcher "to stride, march, walk," originally "to trample, tread underfoot," a word of unc…”）
- **match**：本条已按「比赛」链（Etymonline (n.2) × 牛津义项 2 × Wiktionary）重建立档，无未定论；原引文所述「火柴」match (n.1) 是同形异词，其链（古法语 meiche「灯芯」一脉）已登记于 JSON 争议栏。2026-11-02 订正，详见第九节。
- **may**：来源还没有完全定论（Etymonline 原文措辞：“Also used in Old English as a "auxiliary of prediction." May fifth month of the modern calendar, early 12c., Mai , from Old French mai and directly from Latin Majus , Maius mensis "month of May," possibly from Maja , Maia , a Roman earth go…”）
- **mean**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|menen||to intend; remember; lament; comfort}}, from {{inh|en|ang|mǣnan||to mean, complain}}, {{inh|en|gmw-pro|*mainijan}}, from {{inh|en|gem-pro|*mainijaną||to mean, think; complain}}, from {{der|en|ine-pro|*meyn-||to thin…”）
- **metal**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of metal metal (n.) an undecomposable elementary substance having certain recognizable qualities (opacity, conductivity, plasticity, high specific gravity, etc.), mid-13c., from Old French metal "metal; material, substanc…”）
- **metamorphosis**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of metamorphosis metamorphosis (n.) 1530s, "change of form or structure, action or process of changing in form," originally especially by witchcraft, from Latin metamorphosis , from Greek metamorphōsis "a transforming, a …”）
- **mine**：来源还没有完全定论（Etymonline 原文措辞：“1300, from Old French mine "vein, lode; tunnel, shaft; mineral ore; mine" (for coal, tin, etc,) and from Medieval Latin mina , minera "ore," a word of uncertain origin, probably from a Celtic source (compare Welsh mwyn , Irish mein "ore, mi…”）
- **mobile**：来源还没有完全定论（Etymonline 原文措辞：“1540 in Spanish as Mauvila , referring to an Indian group and perhaps from Choctaw (Muskogean) moeli "to paddle." Related: Mobilian”）
- **moon**：来源还没有完全定论（Etymonline 原文措辞：“In Greek, Italic, Celtic, and Armenian the cognate words now mean only "month." Greek selēnē (Lesbian selanna ) is from selas "light, brightness (of heavenly bodies)." Old Norse also had tungl "moon" ("replacing mani in prose" - Buck), evid…”）
- **more**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of more more (adj.) Old English mara "greater, relatively greater, more, stronger, mightier," used as a comparative of micel "great" (see mickle ), from Proto-Germanic *maiz (source also of Old Saxon mera , Old Norse meir…”）
- **moth**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of moth moth (n.) "nocturnal lepidopterous insect," Middle English motthe , from Old English moððe (Northumbrian mohðe ), a common Germanic word (compare Old Norse motti , Middle Dutch motte , Dutch mot , German Motte "mo…”）
- **mouth**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of mouth mouth (n.) Old English muþ "oral opening of an animal or human; opening of anything, door, gate," from Proto-Germanic *muntha- (source also of Old Saxon, Old Frisian muth , Old Norse munnr , Danish mund , Middle …”）
- **mulch**：来源还没有完全定论（Wiktionary 原文措辞：“Probably from {{inh|en|enm|melsche}}, {{m|enm|molsh||soft}}, from {{inh|en|ang|melsċ}}, {{m|ang|milisċ||mellow; mild; sweet|lit=honeyed}}, probably from {{inh|en|gem-pro|*mili||honey}}”）
- **must**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of must must (v.) auxiliary of prediction, "be obliged, be necessarily impelled," from Old English moste , past tense of motan "have to, be able to," from Proto-Germanic *motanan (source also of Old Saxon motan "to be obl…”）
- **narrow**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of narrow narrow (adj.) Middle English narwe , from Old English nearu "of little width, not wide or broad; constricted, limited; petty; causing difficulty, oppressive; strict, severe," from West Germanic *narwaz "narrowne…”）
- **negative**：来源还没有完全定论（Etymonline 原文措辞：“Negative Capability, that is when a man is capable of being in uncertainties, Mysteries, doubts without any irritable reaching after fact and reason”）
- **night**：来源还没有完全定论（Etymonline 原文措辞：“The Germanic words are from PIE *nekwt- "night" (source also of Greek nyx "a night," Latin nox , Old Irish nochd , Sanskrit naktam "at night," Lithuanian naktis "night," Old Church Slavonic nosti , Russian noch' , Welsh henoid "tonight"), a…”）
- **noise**：来源还没有完全定论（Etymonline 原文措辞：“1300, "a sound of any kind from any source," especially a loud and disagreeable sound, from Old French noise "din, disturbance, uproar, brawl" (11c., in modern French only in phrase chercher noise "to pick a quarrel"), also "rumor, report, …”）
- **noodle**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of noodle noodle (n.1) "long, narrow strip of dried dough," 1779, from German Nudel , which is of unknown origin; speculated to be ultimately from Latin minutulus "tiny, very small" or a variant of German Knödel "dumpling…”）
- **north**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of north north Old English norð- (in compounds) "northern, lying to the north" (adj.); norð (adv.) "northwards, to the north, in the north;" from Proto-Germanic *nurtha- (source also of Old Norse norðr , Old Saxon north ,…”）
- **nurse**：来源还没有完全定论（Etymonline 原文措辞：“1500, of unknown origin”）
- **ore**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|or}}, {{m|enm|oor}}, blend of {{inh|en|ang|ōra|t=ore, unwrought metal}}, of uncertain origin, and {{m|ang|ār|t=brass, copper, bronze}}, from {{inh|en|gmw-pro|*aiʀ}}, from {{inh|en|gem-pro|*aiz}}, from {{inh|en|ine-pro|*h₂é…”）
- **peel**：来源还没有完全定论（Etymonline 原文措辞：“Peel out "speed away from a place in a car, on a motorcycle, etc.," is hot-rodders' slang, attested by 1952, perhaps from the notion of leaving behind a "peel" of rubber from the tire as it skids”）
- **pen**：本条已按 (n.1) 羽毛笔链重建（牛津义项 1 × Etymonline (n.1) × Wiktionary Etymology 3），无未定论；原引文所述「羊圈」pen (n.2)（古英语 penn）本身来源未定论，但那是另一个同形词。2026-11-02 订正，详见第九节。
- **pine**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of pine pine (n.) "coniferous tree, tree of the genus Pinus ," Old English pin (in compounds), from Old French pin and directly from Latin pinus "pine, pine-tree, fir-tree," which is perhaps from a PIE *pi-nu- , from root…”）
- **pint**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of pint pint (n.) mid-14c., "liquid measure equal to half a quart;" also "a vessel holding a pint," from Old French pinte "liquid measure, pint" (13c.), probably from Vulgar Latin *pincta (source of Old Provençal, Spanish…”）
- **plant**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of plant plant (n.) Old English plante "young tree or shrub, herb newly planted, a shoot or strip recently sprouted from seed," from Latin planta "sprout, shoot, cutting" (source of Spanish planta , French plante ), which…”）
- **play**：来源还没有完全定论（Etymonline 原文措辞：“This apparently is connected to the root of plight (v.), but the ultimate etymology is uncertain and the phonetic development is difficult to explain”）
- **pollution**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of pollution pollution (n.) mid-14c., pollucioun , "discharge of semen other than during sex," later, "desecration, profanation, defilement, legal or ceremonial uncleanness" (late 14c.), from Late Latin pollutionem (nomin…”）
- **pretty**：来源还没有完全定论（Etymonline 原文措辞：“1300 as a surname), from Old English prættig (West Saxon), pretti (Kentish), *prettig (Mercian) "cunning, skillful, artful, wily, astute," from prætt , *prett "a trick, wile, craft," from Proto-Germanic *pratt- (source also of Old Norse pre…”）
- **proud**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|proud}}, {{m|enm|prout}}, {{m|enm|prut}}, from {{inh|en|ang|prūd}}, {{m|ang|prūt|t=proud, arrogant, haughty}} (compare {{cog|ang|prȳtung|t=pride}}; {{m|ang|prȳde}}, {{m|ang|prȳte|t=pride}}, see also {{ncog|ang|deal}}), pro…”）
- **pudding**：来源还没有完全定论（Etymonline 原文措辞：“1300, "a kind of sausage: the stomach or one of the entrails of a pig, sheep, etc., stuffed with minced meat, suet, blood, and seasoning, boiled and kept till needed," perhaps from a West Germanic stem *pud- "to swell" (source also of Old E…”）
- **pupil**：来源还没有完全定论（Etymonline 原文措辞：“pupa "girl"), probably related to puer "child" (and thus probably from a suffixed form of PIE root *pau- (1) "few, little")”）
- **purple**：来源还没有完全定论（Etymonline 原文措辞：“from Latin purpura "purple color, purple-dyed cloak, purple dye," also "shellfish from which purple was made," and "splendid attire generally." This is from Greek porphyra "purple dye, purple" (compare porphyry ), a word of uncertain origin…”）
- **put**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of put put (v.) Middle English putten , from late Old English *putian , "to thrust, push, shove" (someone or something; a sense now obsolete), also "to move a thing physically so as to place it in some situation," implied…”）
- **question**：来源还没有完全定论（Etymonline 原文措辞：“The figurative sense of "something about which there is uncertainty or doubt" is from 1869”）
- **rude**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of rude rude (adj.) late 13c., "coarse, rough, without finish" (of surfaces), from Old French ruide (13c.) and directly from Latin rudis "rough, crude, unlearned," a word of uncertain etymology, related to rudus "rubble."…”）
- **scrub**：来源还没有完全定论（Etymonline 原文措辞：“1300), which is perhaps from Middle Dutch or Middle Low German schrubben , schrobben "to scrub," or from an unrecorded Old English cognate of these, or from a Scandinavian source (such as Danish skrubbe "to scrub")”）
- **seize**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of seize seize (v.) mid-13c., seisen , "take possession, take possession of" (land, goods, etc.) by force or authority, from Old French seisir "to take possession of, take by force; put in possession of, bestow upon" (Mod…”）
- **seldom**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of seldom seldom (adv.) "rarely, not often, infrequently," late Old English and early Middle English seldum , an alteration of seldan "infrequently, rarely," from Proto-Germanic *selda- "strange, rare" (source also of Old…”）
- **sell**：来源还没有完全定论（Etymonline 原文措辞：“To sell (someone) down the river figuratively is by 1927, probably from or with recollection of slavery days, on notion of sale from the Upper South to the cotton plantations of the Deep South (attested in this literal sense since 1851)”）
- **set**：来源还没有完全定论（Etymonline 原文措辞：“1200; that of "sink down, descend, decline toward and pass below the horizon" (of the sun, moon, or stars) is by mid-13c., perhaps from similar use of the cognates in Scandinavian languages; figurative use of this is from c”）
- **shape**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|schap}}, {{m|enm|schape}}, from {{inh|en|ang|ġesceap||shape, form, created being, creature, creation, dispensation, fate, condition, sex, gender, genitalia}}, from {{inh|en|gmw-pro|*ga-}} + {{m|gmw-pro|*skap}}, from {{inh|…”）
- **ship**：来源还没有完全定论（Etymonline 原文措辞：“Watkins calls this a "Germanic noun of obscure origin." OED says "the ultimate etymology is uncertain." Traditionally since Pokorny it is derived from PIE root *skei- "to cut, split," perhaps on the notion of a tree cut out or hollowed out,…”）
- **shop**：来源还没有完全定论（Etymonline 原文措辞：“1300, "booth or shed for trade or work," perhaps from Old English scoppa , a rare word of uncertain meaning, apparently related to scypen "cowshed," from Proto-Germanic *skoppan "small additional structure" (source also of Old High German s…”）
- **show**：来源还没有完全定论（Etymonline 原文措辞：“The horse-racing sense of "finish third or in the top three" is by 1903, perhaps from an earlier sense in card-playing”）
- **shower**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|schour||shower}}, from {{inh|en|ang|sċūr||shower}}, from {{inh|en|gmw-pro|*skūru||shower}}, from {{inh|en|gem-pro|*skūrō||storm, short shower}}, probably from {{der|en|ine-pro|*(s)ḱēwer-|t=north, north wind, cold wind, rai…”）
- **shun**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of shun shun (v.) Middle English shunnen , "keep out of the way of, avoid (a person or place); refrain from, neglect (a practice or behavior)," from Old English scunian "run away from, avoid; abhor, loathe; seek safety by…”）
- **shy**：来源还没有完全定论（Etymonline 原文措辞：“Cognates outside Germanic are uncertain, unless perhaps in Old Church Slavonic shchuti "to hunt, incite." Italian schivare "to avoid," Old French eschiver "to shun" are Germanic loan-words”）
- **sick**：来源还没有完全定论（Etymonline 原文措辞：“also from 1845 sick (adj.) Middle English sik , from Old English seoc "ill, unwell, diseased, feeble, weak; corrupt; sad, troubled, deeply affected by strong feeling," from Proto-Germanic *seuka- , which is of uncertain origin”）
- **side**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|side}}, from {{inh|en|ang|sīde|t=side, flank}}, from {{inh|en|gem-pro|*sīdǭ|t=side, flank, edge, shore}}, derived from {{m|gem-pro|*sīdaz}}, probably from {{der|en|ine-pro|*seh₁-|t=long, lasting}}”）
- **sign**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|signe}}, {{m|enm|sygne}}, {{m|enm|syng}}, {{m|enm|seine}}, {{m|enm|sine}}, {{m|enm|syne}}, from {{inh|en|ang|seġn|t=sign; mark; token}} and {{der|en|fro|signe}}, {{m|fro|seing||sign; mark; signature}}; both from {{der|en|l…”）
- **slough**：本条「蜕皮」链的远祖原始日耳曼语 *sluk- 出处未有定论（Etymonline 称 of uncertain origin），已记入 JSON 争议栏；同形词「泥沼」slough（古英语 slōh，Etymonline (n.1)）来历同样未定。2026-11-02 订正，详见第九节。
- **slow**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|slaw}}, {{m|enm|slow}}, from {{inh|en|ang|slāw|t=lazy; inert, slow}}, from {{inh|en|gmw-pro|*slaiw}}, from {{inh|en|gem-pro|*slaiwaz|t=blunt; dull; exhausted, faint, sluggish, weak, weary; listless, torpid; dim-witted, slo…”）
- **small**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of small small (adj.) Middle English smal , smale , from Old English smæl "thin, slender, narrow; fine," from Proto-Germanic *smal- "small animal; small" (source also of Old Saxon, Danish, Swedish, Middle Dutch, Dutch, Ol…”）
- **smart**：来源还没有完全定论（Etymonline 原文措辞：“In reference to persons, "quick, active, intelligent, clever," 1620s, perhaps from the notion of "cutting" wit, words, etc., or else "keen in bargaining." From 1718 in cant as "fashionably elegant;" by 1798 as "trim in attire," "ascending f…”）
- **smile**：来源还没有完全定论（Etymonline 原文措辞：“1300, smilen , "assume a facial expression or change of features indicative of amusement and pleasure," perhaps from Middle Low German *smilen (compare Middle High German smielen ) or a Scandinavian source (such as Danish smile "smile," Swe…”）
- **soul**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of soul soul (n.1) "A substantial entity believed to be that in each person which lives, feels, thinks, and wills" [Century Dictionary], Middle English soule , from Old English sawol "spiritual and emotional part of a per…”）
- **soup**：来源还没有完全定论（Etymonline 原文措辞：“also from 1650s soup (v.) "increase the horsepower of an engine," 1921, probably from soup (n.) in slang sense of "narcotic injected into horses to make them run faster" (1911) and influenced by supercharge (v.)”）
- **space**：来源还没有完全定论（Etymonline 原文措辞：“1300, "extent or area; room" (to do something), a shortening of Old French espace "period of time, distance, interval" (12c.), from Latin spatium "room, area, distance, stretch of time," a word of unknown origin (also source of Spanish espa…”）
- **speak**：来源还没有完全定论（Etymonline 原文措辞：“In English the -r- began to drop out in Late West Saxon and was gone by mid-12c., perhaps from influence of Danish spage "crackle," also used in a slang sense of "speak" (compare crack (v.) in slang senses having to do with speech, such as …”）
- **spirit**：来源还没有完全定论（Etymonline 原文措辞：“The Latin word also could mean "disposition, character; high spirit, vigor, courage; pride, arrogance." It is a derivative of spirare "to breathe," and formerly was said to be perhaps from a PIE *(s)peis- "to blow" (source also of Old Churc…”）
- **spook**：来源还没有完全定论（Etymonline 原文措辞：“The word is from Dutch spook , from Middle Dutch spooc , spoocke "a spook, a ghost," from a common Germanic source (German Spuk "ghost, apparition, hobgoblin," Middle Low German spok "spook," Swedish spok "scarecrow," Norwegian spjok "ghost…”）
- **steak**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of steak steak (n.) mid-15c., steke , "thick slice of meat cut for roasting," probably from a Scandinavian source such as Old Norse steik "roast meat," related to steikja "to roast on a spit," and ultimately meaning "some…”）
- **stir**：来源还没有完全定论（Etymonline 原文措辞：“(in phrase on steir ), probably from a Scandinavian source, such as Old Norse styrr "disturbance, tumult," from the same root as stir (v.))”）
- **strong**：来源还没有完全定论（Etymonline 原文措辞：“This is possibly from a PIE *strenk- "tight, narrow" (see string (n.))”）
- **strut**：来源还没有完全定论（Etymonline 原文措辞：“also from 1510s strut (n.1) "supporting brace," 1580s, perhaps from strut (v.), or a cognate word in Scandinavian (compare Norwegian strut "a spout, nozzle") or Low German (compare Low German strutt "rigid"); ultimately from Proto-Germanic …”）
- **take**：来源还没有完全定论（Etymonline 原文措辞：“This is reconstructed to be from Proto-Germanic *takan- (source also of Middle Low German tacken , Middle Dutch taken , Gothic tekan "to touch"), from Germanic root *tak- "to take," which is of uncertain origin, perhaps originally meaning "…”）
- **teethe**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of teethe teethe (v.) "cut teeth, grow teeth," early 15c., tethen , probably from an unrecorded Old English verb *teþan , from toþ "tooth" (from PIE root *dent- "tooth")”）
- **that**：来源还没有完全定论（Etymonline 原文措辞：“colloquial, perhaps from "(cheap) at that (price)," etc”）
- **this**：来源还没有完全定论（Etymonline 原文措辞：“þeos ), probably from a North Sea-region Germanic pronoun *tha-si- , formed by combining the base *þa- (see that ) with -s , which is probably identical with Old English se "the" (representing here "a specific thing"), or with Old English s…”）
- **tiger**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of tiger tiger (n.) Middle English tigre , "large, beautifully striped carnivorous cat living in distant places or mentioned by ancient naturalists," from Old English tigras (plural), also in part from Old French tigre "t…”）
- **tower**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of tower tower (n.1) Middle English tour , "building lofty in proportion to its base width," usually free-standing, often used as a fortification or prison, from Old English torr "tower, watchtower," from Latin turris "a …”）
- **traffic**：来源还没有完全定论（Etymonline 原文措辞：“1500, "transportation of merchandise for the purpose of trade;" 1560s in the wider sense of "trade, commerce; interchange of goods, merchandise, or property;" from French trafique (15c.), from Italian traffico (early 14c.), from trafficare …”）
- **try**：来源还没有完全定论（Etymonline 原文措辞：“1300, trien , "to separate (one thing) from another or others, set apart, distinguish;" especially "separate the good or desired part from the rest," from Anglo-French trier (13c.), Old French trier "to pick out, cull" (12c.), from Gallo-Ro…”）
- **tube**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of tube tube (n.) 1590s, in anatomy and zoology, "hollow organ or passage in the body;" by 1650s as "pipe or hollow cylinder," especially a small one used as a conduit for liquids, from French tube (15c.), from Latin tubu…”）
- **tunnel**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of tunnel tunnel (n.) early 15c., tonnel , tonel , "funnel-shaped wire net into which birds were decoyed," from Old French tonel , tonnelle "net," diminutive of Old French tonne "tun, cask for liquids," which is perhaps f…”）
- **vegetable**：来源还没有完全定论（Etymonline 原文措辞：“vegetable (n.) mid-15c., "non-animal life," originally any plant, probably from vegetable (adj.); the specific sense of "plant cultivated for culinary purposes, edible herb or root" is recorded by 1767”）
- **vein**：来源还没有完全定论（Etymonline 原文措辞：“1300, "a blood vessel," in anatomy, a vein as distinguished by function from an artery, from Old French veine "vein, artery, pulse" (12c.), from Latin vena "a blood vessel," also "a water course, a vein of metal, a person's natural ability …”）
- **wake**：来源还没有完全定论（Etymonline 原文措辞：“In the passive, awaken and waken are preferred, perhaps owing to uncertainty about the past participle of forms of awake and wake”）
- **walk**：来源还没有完全定论（Etymonline 原文措辞：“wealcian "to roll up, curl." Both are from Proto-Germanic *welk- (source also of Old Norse valka "to drag about," Danish valke "to full" (cloth), Middle Dutch walken "to knead, press, full" (cloth), Old High German walchan "to knead," Germa…”）
- **warm**：来源还没有完全定论（Etymonline 原文措辞：“A word of uncertain origin”）
- **week**：来源还没有完全定论（Etymonline 原文措辞：“The vowel sound seems to have been uncertain in Old and Middle English and -e- , -i- , -o- , -u- , -y- , and various diphthongs are attested for it”）
- **welcome**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|welcome}}, {{m|enm|wolcume}}, {{m|enm|wulcume}}, {{m|enm|wilcume}}, from {{inh|en|ang|wilcuma}} {{gloss|“a wished-for guest”; compare also {{m|ang|wilcume||welcome!|pos=interjection}}}}, from {{inh|en|gmw-pro|*willjakwemō}…”）
- **wild**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of wild wild (adj.) Old English wilde , "in the natural state, uncultivated" (of plants, herbs), "untamed, undomesticated" (of animals), from Proto-Germanic *wildia- , a word of uncertain origin, perhaps (Watkins) from PI…”）
- **wind**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of wind wind (n.1) "air naturally in motion; a perceptible current of air from a particular direction;" Old English wind , from Proto-Germanic *winda- , from PIE *wē-nt-o‑ "blowing," suffixed (participial) form of root *w…”）
- **wine**：来源还没有完全定论（Etymonline 原文措辞：“According to Watkins, probably from a lost Mediterranean language word *win-/*woin- "wine." However, Beekes argues that the word is of Indo-European origin, related to Greek itea "willow," Latin vītis "vine," and other words, and that they …”）
- **wing**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of wing wing (n.) late 12c., wenge , "forelimb fitted for flight of a bird or bat," also the part of some insects resembling a wing in form or function, from Old Norse vængr "wing of a bird, aisle, etc." (cognate with Dan…”）
- **winter**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of winter winter (n.) Old English winter (plural wintru, wintras ), "the fourth and coldest season of the year, winter," from Proto-Germanic *wintruz "winter," which is of uncertain etymology”）
- **wonder**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of wonder wonder (n.) Middle English, from Old English wundor "strange or marvelous thing, unheard of or supernatural event; object of astonishment," from Proto-Germanic *wundran (source also of Old Saxon wundar , Middle …”）
- **worm**：来源还没有完全定论（Wiktionary 原文措辞：“From {{inh|en|enm|werm,wirm,worm,worme,wrim,wurm,wyrm,wyrme}}, from {{inh|en|ang|weorm}}, {{m|ang|wurm}}, {{m|ang|wyrm}}, from {{inh|en|gmw-pro|*wurmi}}, from {{inh|en|gem-pro|*wurmiz|t=worm; snake}}, from {{inh|en|ine-pro|*wr̥mis|t=worm; l…”）
- **worth**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of worth worth (adj.) Middle English, from Old English weorþ "having worth, significant, of value;" also "valued, appreciated, deserving; honorable, noble, of high rank;" from Proto-Germanic *wertha- , which is of uncerta…”）
- **yard**：来源还没有完全定论（Etymonline 原文措辞：“Origin and history of yard yard (n.1) "relatively small patch of ground around a dwelling," Middle English yerd , from Old English geard "fenced enclosure, garden, court; residence, house," from Proto-Germanic *gardan- , a word of uncertain…”）
- **yellow**：来源还没有完全定论（Etymonline 原文措辞：“The sense of "cowardly" is attested by 1856, of unknown origin; the color earlier was associated rather with jealousy and envy (17c.)”）

另：因来源互相矛盾被整条降为待核的词，见待核表中 `sources_conflict` 一类；牛津词源栏为压缩表述（跳过中间站直说深层来源）的词不算冲突，已按逐站链立档并在来源里如实标注等级。

## 五、民间词源排查与排除清单

排查口径：全部 verified 记录的 folk_etymology_check 字段已逐条填写；生成机制上所有记录的语义表述只来自来源链与来源原文，结构上不可能写入「首字母缩写成词」式说法。任务书点名、且在词库中的词逐个核对如下：

- **posh**（本次待核，来源未定）：流传说法「port outward, starboard home（去程靠左舷、回程靠右舷）」是首字母缩写编造。Etymonline 原文明说：这一说法「没有任何证据」（there is no evidence for the common derivation from an acronym…），并引 OED 的反对意见；该词更可能出自俚语 posh「钱」一脉。缩写说法不予采信。
- **golf**（本次待核）：流传说法「gentlemen only, ladies forbidden」纯属缩写编造。Etymonline 原文：「尽管网上有这种说法，golf 不是缩写（这个故事似乎始于 1997 年）」；该词是苏格兰语 gouf，来自中古荷兰语 colf「棍棒」。
- **news**（本次待核）：流传说法「north/east/west/south 四个方向首字母」是编造。Etymonline 原文直接称之为「荒谬的民间词源」（the absurd folk etymology）；news 实为 new 的复数形态（late 14c.「新近发生的事」）。
- sirloin（「封爵牛排」国王给牛排封爵的故事）、crap（Crapper 姓氏说）：两词不在本词库，未收录；故事本身亦属民间编造，特此登记备查。

来源原文自带民间词源讨论、已在记录中登记排除的词：

- **april**：流传着与这个词有关的假词源说法，已按来源原文核对排除（原文：“. Old folk etymology connected it with Latin aperire "to open." The name was in English in Latin form from mid-12c.; it replaced Old English Eastermonað , which was named for a fertility goddess (see Easter )”）
- **bridegroom**：流传着与这个词有关的假词源说法，已按来源原文核对排除（原文：“. by folk etymology after groom (n.) "groom, boy, lad" (q.v.)”）
- **butter**：流传着与这个词有关的假词源说法，已按来源原文核对排除（原文：“. This is apparently "cow-cheese," from bous "ox, cow" (from PIE root *gwou- "ox, bull, cow") + tyros "cheese" (from PIE root *teue- "to swell"); but this might be a folk etymology of a Scythian word”）
- **pin**：流传着与这个词有关的假词源说法，已按来源原文核对排除（原文：“. PIN acronym for personal identification number, 1981; from the first it has been used with a redundant number”）

## 六、字段规格问题（执行中发现，供任务书修订参考）

1. **source_chain 各站 gloss 可空**：已核链里不少中间站（尤其拉丁/法语站）在 Wiktionary 模板里本就没有释义参数，两源原文皆然。本库如实留空，不用现代义或邻站义填补；original_meaning 取「最深的有释义站」，与任务书 school 示例（取希腊语站释义）的口径一致。
2. **深层词根站（原始印欧语等）的 period 只能写时期名**：原始印欧语、原始日耳曼语等站没有任何来源给出公历年代，period 一律写「原始印欧语时期」这类时期名，不杜撰年份。first_attested 同理：原生词在来源里通常只给时期（古英语时期/中古英语时期），不给具体年份；有原文世纪记法（如 late 14c.、c. 1200）时照原文引用并注明出处。
3. **一词多链（同形异源）只立一条链**：如 light（光/轻两个来源）、lie（躺/说谎）这类同形异源词，词库只有一个词条。本库只立与词库主义项对应的那一条链（如 light 立「光」链，其本义、语义路径均出自该链），另一条链未并入本档，特此声明以免误读为全貌；两链不合并、不裁定，后续如需可另立分义项档案。
4. **词形变化词不单独立档**：复数、动词变形、拼写变体（如 shoes、goes、closed、hotdog）在 Wiktionary 只有「原形词 + 变形」的标注、没有独立词源小节，归入未收清单并注明原形；词源随原形词档案。词组与词形组（ice cream、he / him / his 等）同样不单独溯源，延续白板线既有口径。
5. **派生词/复合词的链口径**：构词可由两源对上的词（morph 型证据），链取词根词的历史来源链，构词拆分单列在 story_hooks 里注明「拆法在 Etymonline 正文里能对上」，不把构词件硬排进借入链。
6. **等级口径的现实边界**：OED 本体为付费订阅，本次不可达；可达的最高等级来源为牛津大学出版社的 Oxford Learner’s Dictionaries 词源栏（任务书一级口径中的「大学出版社词典的词源栏」）。牛津词源栏是压缩表述，常跳过中间站（如月份词直说 from Latin），只宜作首站/深层来源的互证，不宜单独定全链；逐站链仍以 Wiktionary 解析 × Etymonline 原文对齐为准绳。evidence_grade 已逐词如实标注实际达到的组合，未达一级的写明「待一级复核」。
7. **本义的取站口径**：若已核链延伸到原始印欧语词根站，original_meaning 按链取最深有释义站（词根义，如 school 取到「握住」一层）；任务书示例从希腊语站起算，是因示例链只到希腊语。两口径的差别仅在链的深度，本库以「链有多深、本义取多深」为准，链本身逐站可查。

## 七、自检（交付前按任务书第 7 节口径自抽 20%）

方法：对 verified 记录按序每 5 条抽 1（≥20%），再强制纳入 school/play/charge/light 四个校准词与 posh/golf/news/coach 等点名词，逐条机检三项高危字段：(A) first_attested 若声称引 Etymonline 原文记法，该记法必须真实出现在该词原文里；(B) source_chain 最深一站的词形必须能在 Etymonline 原文或牛津词源栏里找到；(C) original_meaning 必须能回溯到来源链某站释义的中译或 Etymonline 引首释义的中译。另人工通读抽样记录全文字段与来源原文比对。

机检结果：第一轮抽查标出 11 条不合项，逐条追查后确认均为机检口径盲区（希腊词形须按拉丁转写核对、单站外来词的本义走 Etymonline 引文提取路径），其中 contest 一条经人工比对原文确认记录无误；补齐机检口径后重跑，163 条抽查高危字段全部通过。
人工通读另抓出并已回炉修正三类真问题：(1) first_attested 误抓义项/拼写年代（heart 的「-ea- 拼写 c. 1500」、lovely 的义项年代 c. 1300）——已改为只认引言第一个 from 之前的年代记法；(2) about 的本义被现代义引文污染——已改为长释义取第一分句，about 本义订正为「在……外面」；(3) 年代表述「1530s 年」不成话——已改为「约 16 世纪 30 年代（原文记作 1530s）」。四个校准词 school/play/charge/light 终检：school、charge、light 立档内容与校准一致；play 立档且按来源原文登记「更深来源未定论」的争议。

## 八、数据来源与方法备忘

- 来源链底稿：Wiktionary 词条 Etymology 小节（模板链解析，沿用白板线 parse_etym 口径）× Etymonline 词条原文（经 Wayback Machine 存档读取）逐站对齐互证；牛津词源栏作第三源与等级提升；根目录主应用 ETYM_DB 的 625 条既有已核链全量对表复用（方向翻转为旧→新）。
- 英文 gloss 的中文翻译全部为忠实直译，不加演变细节；语义路径、机制句、现代义关联等表述只由已核链数据与词库今义拼接生成，不引入来源之外的说法。
- 抓取缓存（Wiktionary raw / Etymonline 存档页 / 牛津页）在仓库外 ~/workspace/etym-work/，未提交进仓库。

## 九、订正与普查记录（2026-11-02，同形异词串档修复）

### 9.1 缘起与口径

- 缘起：复查发现 verified 记录 **pen** 串档——词库 pen 是「钢笔」，记录却挂了 pen (n.2)「羊圈」（古英语 penn）的链，还在 modern_meanings_link 里硬说与钢笔「同一个词一路变下来」。钢笔 pen 实源自拉丁语 penna「羽毛」，与羊圈 penn 是同形异词、毫无关系。遂对全部 verified 做同形异词普查。
- 口径（与建库一致）：所有订正只许依据仓库外缓存原文（~/workspace/etym-work/ 的 etymo / wikt / ox 三套抓取文本）逐条对齐；原文对不齐就不硬立链——或降待核、或按「词形变化词不单独立档」口径移出归未收；不许凭记忆补链。不许把同形异词的两条链揉成一条；主义项立链，异源同形词登记进 disputes。

### 9.2 普查范围与方法

- 观察名单（已知同形异词）30 词逐词核：pen、match、bank、bat、can、well、fine、fair、kind、bark、mole、rock、seal、yard、pound、mint、date、chest、club、present、patient、spring、watch、wave、sign、nail、leaves/leaf、coach、light。
- 机检标记集：verified 中凡 modern_meanings_link 出现「看不出关系 / 脱钩 / 翻来源链才知道是同一个词 / 差得挺远」类措辞者 236 条（这类措辞是串档高危信号，pen 正是如此），与语义路径用「意思又慢慢变了」无内容模板桥者取并集；连同观察名单中属 verified 者，合计逐条人工复核 **477 条**：每条比对词库义项 × original_meaning × 来源链 × 缓存原文分词条（n.1/n.2、Etymology 分节）。
- 结论分布：已重建 7 条、字段订正 4 条、登记/路径补全 5 条、移出归未收 3 条、无误 458 条。

### 9.3 pen 订正（任务实证条）

- 订正前：链 = 古英语 penn「围地，羊圈，畜栏」→ 中古英语 pen；原义「围地，羊圈，畜栏」；今义关联硬说钢笔与羊圈同源。
- 证据：Etymonline pen (n.1)（late 13c. penne，羽毛做的书写工具 ← 古法语 pene ← 拉丁语 penna「羽毛」← 印欧词根 *pet-「冲；飞」）× Wiktionary pen Etymology 3 同链 × 牛津 pen 词条义项 1。三源对齐，保持 verified（等级：一级＋二级）。
- 订正后：链 = *pet-「冲；飞」→ penna「羽毛（晚期拉丁语转指书写笔）」→ pene「羽毛；羽毛笔」→ penne「羽毛做的书写笔」；原义「羽毛（做的书写笔）」；语义路径 羽毛 → 羽毛笔（借代）→ 一切用墨水写的笔（泛化）；争议栏登记同形异词提醒（羊圈 pen 另是一词）。

### 9.4 match 裁断（重建立链）

- 问题：旧记录链形虽是 mæcca 一脉，但原义取了印欧词根 gloss「揉捏，加工」，机制句写成「揉捏，加工 → 比赛/火柴」两头不靠，争议栏还引了火柴（n.1）的原文。
- 裁断：Etymonline match (n.2)（古英语 ġemæcca「伴侣、般配的人」；对手义约 1300 年、体育比赛义 1540 年代）× Wiktionary Etymology 1 × 牛津义项 2–6，三源对齐——**按「比赛」链重建为 verified**（等级由二级升为一级＋二级），不降待核。
- 订正后：链 = *mag-「揉捏；做得合用」→ *gamakon「合得来」→ ġemæcca「伴侣，配偶」→ mæcca → macche「旗鼓相当的对手」；原义「伴侣，配偶；般配的人」；语义路径 合用 → 伙伴 → 般配的对手 → 比赛。火柴链（古法语 meiche「灯芯」← 拉丁语 myxa ← 希腊语 myxa）只登记进争议栏，不并链。

### 9.5 普查新发现的串档（名单外，逐条已按缓存原文处置）

| 词 | 问题 | 处置 |
|---|---|---|
| mint | 词库只有「薄荷」，记录却挂铸币链（拉丁语 monēta → 古英语 mynet） | 已重建：按薄荷链（希腊语 μίνθη → 拉丁语 mentha → 原始西日耳曼语 *mintā → 古英语 minte，8 世纪）立档；铸币 mint 登记争议栏 |
| lead | 词库「带路，引领」，记录只有一站古英语 lēad 并把「铅；引导」混 gloss | 已重建：按动词链（*leit-「出发」→ *laidjanan → lǣdan → leden）立档；金属「铅」lead（lēad）登记争议栏 |
| sound | 词库「声音」，记录挂的是形容词「健康的」链（古英语 ġesund） | 已重建：按声音链（*swen- → 拉丁语 sonus → 古法语 son → 中古英语 soun）立档；「健康的」「海峡」两同形词登记争议栏 |
| plane | 词库「飞机」，记录只有拉丁语 plānum「平面」一站（几何词的链） | 已重建：按 aeroplane（1907）→ plane（1908，缩略）立档；构词层面待核登记争议栏（Etymonline airplane 词条把 aeroplane 分析为 air + plane (n.1)，仅一处来源，不裁决）。注：普查初稿曾拟登记的「希腊语 πλάνος『漫游』说」经复核在三套缓存原文中均无出处，已按「原文不支持不登记」口径撤下 |
| prize | 词库「奖品」，记录原义与机制取的是「缴获物」链（古法语 prise「抓取」） | 已重建：按奖品链（拉丁语 pretium「价格；报酬」→ 古法语 pris → 中古英语 prise，牛津明言名词是 price 的变体）立档；缴获链登记争议栏；等级升一级＋二级 |
| lie | 链本是「躺」线（liċġan），但原义误取另一同形词的「欺骗，背叛」 | 字段订正：原义改「躺，卧」，路径/机制/今义关联按躺线重写；「说谎」lie（古英语 leōgan）登记争议栏 |
| march | 链形本是三月线，但原义被「边境」march 污染成「边境地带」 | 字段订正：链首补拉丁语 Mārtius 站，原义改「战神马尔斯之月」，初现改约 1200 年；「行军」march 登记争议栏 |
| slough | 链（*sluk-）本是蜕皮线，但原义/今义关联按「泥沼」词写 | 字段订正：原义改「（蛇等）蜕下的皮」，路径改 名词→动词转用；「泥沼」slough（古英语 slōh）登记争议栏 |
| drove | 词库是 drive 的过去式，记录链首缺 drīfan、gloss 偏向派生名词「畜群」 | 字段订正（重建字段）：链补古英语 drīfan「驱赶」站，明示 drove 即 drive 过去式；「畜群」drāf 系同源派生名词，登记说明 |
| felt | 词库是 feel 的过去式/过去分词，记录挂的是「毛毡」（古英语 felt）链——不同词位 | 移出 JSON 归未收（词形变化词，词源随 feel，见第三节）；verified −1 |
| saw | 词库是 see 的过去式，记录挂的是「锯子」链（*sek- → 古英语 saga）——不同词位 | 移出 JSON 归未收（词源随 see）；verified −1 |
| ground | 词库只有 grind 的过去式/过去分词，记录挂的是名词「地面」（古英语 grund）链 | 移出 JSON 归未收（词源随 grind）；verified −1 |

### 9.6 登记/路径补全（链无误，防混淆登记原不完备）

| 词 | 补全内容 |
|---|---|
| light | 词库含「轻的」义而原争议栏称「无已知争议」——补登记：「轻的」light（古英语 lēoht ← 印欧词根 *legwh-「不重」）与本条「光」链是同形异词 |
| ring | 补登记：「（铃）响」ring（古英语 hringan，拟声）与名词「戒指」链是两个词（词库含铃声义） |
| may | 补登记：「可以、可能」may（古英语 magan）与月份 May（拉丁语 Maius）是两个词（词库条目两义并装） |
| mean | 补登记：「刻薄的」mean（Etymonline (adj.2)，上溯拉丁语 mediānus「中间的」）与「意思是」（古英语 mǣnan）不是一条链 |
| spring | 链无误；语义路径原为两级跳，补全中间环节：springing time（14 世纪初）→ spring of the year（16 世纪 20 年代）→ 季节义定型（1540 年代），均出 Etymonline 原文 |

### 9.7 观察名单逐词结论

- 已重建：pen、match、mint（见 9.3–9.5）。
- 无误（链与词库主义项同源）：well（副词 wel 线；词库无「井」义）、fine（古法语 fin 线覆盖「晴朗/身体好」）、yard（古英语 ġeard「院子」）、watch（古英语 wæċċe「守望」→ 观看/手表同线）、sign（拉丁语 signum）、leaf（古英语 lēaf；复数 leaves 是其词形）、spring（另见路径补全）、light（另见登记补全）。
- 待核、不在本轮范围：bank、bat、can、kind、rock、date、club、present、patient；coach（任务明示不在范围）。
- 未收、不在本轮范围：fair、bark、mole、seal、pound、chest、wave、nail、leaves。

### 9.8 机检标记集其余条目结论

- 处置 19 条之外，其余 **458 条无误**：均为同一词的词义引申（原义与今义字面距离大、但来源链连续、有原文可查），如 cloud「岩石→云」、deer「动物→鹿」、magazine「仓库→杂志」、muscle 一类「小老鼠→肌肉」型路径、test「陶罐→考试」、thing「集会→东西」等，不是同形异词串档。
- 无误名单（458 条）：about, access, action, afraid, after, age, ago, agree, all, amphibious, ancient, annex
anything, apathy, april, arm, art, ask, aspect, assist, astronaut, at, away, back
bait, beach, beak, become, behind, belt, between, black, blind, blithe, blood, blouse
blow, body, boot, borough, borrow, branch, brave, breath, bridegroom, bring, broad, brochure
but, calendar, call, camera, camp, campus, cap, captain, card, care, cartoon, carve
chair, champion, charge, cheap, cheer, child, choose, chore, chorus, circle, circus, class
clerk, clock, clothe, cloud, coin, come, compete, compress, confuse, conspicuous, contest, cook
cool, cosmetic, could, courage, course, crayon, cream, credible, cross, crowd, cucumber, cycle
dead, dear, debt, december, deep, deer, degree, desert, detail, dictate, diet, dinner
dinosaur, disagree, discover, dish, doctor, drive, dry, duck, dye, dynamic, each, earth
east, edge, eleven, employ, emu, end, esteem, example, exit, face, fall, famous
farmer, fast, fate, fear, february, ferry, fetch, few, fight, film, fine, flight
folk, follow, foresee, fork, free, friend, friendly, front, fruit, furniture, garage, gentle
geometry, get, glass, glue, go, gold, grade, gray, great, grind, group, guano
guide, hair, handcraft, hard, hardly, headache, heart, hearth, her, here, high, hint
his, hoarse, holiday, home, how, huge, hump, hymn, idea, ill, immediate, influenza
information, ingenious, ingenuous, inject, inn, instant, instrument, january, jealous, join, juice, july
june, just, kid, kitchen, knave, lamp, large, last, late, laundry, lawn, leaf
lend, lesson, liberal, library, lift, like, line, liquor, list, lithe, little, live
load, loathe, look, lose, lot, love, lunatic, machine, magazine, make, man, mandate
many, map, meal, medicine, medium, meet, meeting, mere, message, metamorphosis, minute, mistake
most, motor, mount, mouth, mulch, museum, must, nature, near, neither, never, new
next, nice, ninth, noise, noon, north, nose, nothing, novel, november, nurse, october
offer, office, officer, omnibus, only, open, ought, our, over, pain, pair, panel
panic, paragraph, park, party, pass, pattern, pay, peach, pedal, pension, perfect, perspective
phenomenon, pint, place, plan, plastic, play, point, police, polite, pollution, press, pretty
primate, prince, prospect, protection, proud, pudding, pupil, put, question, quick, race, real
ride, rise, road, robe, rope, rule, sandy, school, science, scope, season, second
see, segment, seize, send, september, set, share, sheaf, shirt, show, shut, side
sight, sign, sine, singe, sink, ski, skin, skirt, slowly, smart, so, society
some, something, soon, soothe, sorry, space, species, specious, spectacle, spectrum, speech, spell
spook, spoon, square, staff, steak, still, stir, storm, strange, strut, stupid, subject
succeed, such, sulfate, sure, susceptible, sweet, synchronize, take, tell, test, thank, thankful
that, the, thin, thing, think, this, throw, thus, tie, time, tough, tray
try, tunnel, turn, uncle, understand, up, vegetable, very, video, visible, vital, vivid
voyage, wake, walk, want, ward, warm, was, watch, way, weather, wedding, week
weird, well, whine, who, whole, wild, will, win, wing, wise, wish, with
without, wonder, wood, woolen, word, worm, worry, worse, worth, wrist, write, wrong
yard, you
- 附带发现（非串档、不在本次口径内）：少数条目 original_meaning 取了同一个词的其他义项 gloss（如 access「进攻」、get「生育」、guide「责备」、headache「棘手的问题」、cucumber「地苹果」、branch「足迹」），属释义偏移，链本身无误，留待释义质量轮次处理。

### 9.9 分账变化

- verified 804 → **801**（重建 7、字段订正 4、补全 5 均不增减；移出 3）。
- etymology.json 总记录 2281 → **2278**；待核 1477 不变；未收 192 → **195**（词形变化词 139 → 142：felt / saw / ground）。
- verified 等级构成：二级 411 → **407**，一级＋二级 385 → **386**，一级＋三级 8 不变（移出 felt、ground 为二级、saw 为一级＋二级；match、prize 重建后牛津栏明确对齐，各由二级升一级＋二级）。
- ETYM_DB 复用/新核：489 / 315 → **487 / 314**（felt、saw 原属复用，ground 属新核）。
- 同步修订：第一节总账、第三节未收清单、第四节 pen / match / lead / slough 四条（原引文系串档词条，已改写并指向本节）。

## 十、审计后修复轮次记录（2026-11-02）

缘起：发包方独立审计判定本数据层「需先修清单再用」——三项系统性问题：① 原义字段成批拿今义/词根义冒充；② 语义路径 how 字段模板化（1,817 步中 5 个套话占 98.2%）；③ 待核双源门过严（逐站全等误杀）。守住的底线：民间词源零混入、链首与首现硬伤率 2.0%（3/149）。以下为修复全程（修复标准全文存于工作区 repair/STANDARDS.md）。

### 10.1 verified 801 条字段修复（四批并行 + 逐批复验 + 合并）
- 修复标准：原义 = 来源链中最早历史词形的本义，且与 semantic_path 首站逐字一致；禁词根义、今义/后起义、同形异词义入原义；how 逐词写实机制（来源支持才点名机制类别），套话列禁用清单，来源未交代者如实留白；mechanism_sentence 只述核心机制、不罗列站义。
- 结果：原义改正 429/801 条（53.5%）；语义路径按来源编年重建/调整 602 条；非首站 how 1,057 条全部重写，合并后 1,057 条互异（套话残留 0）；mechanism_sentence 重写 782 条、保留 19 条；机制如实留白 7 处（yellow「胆怯」义、skirt 一步、fleece/hint/kick 各一步等，均系来源明言未明）。
- 典型病例：school 原义「握住」（词根义）→「闲暇」；circle 原义晚期「圈子」义 →「小圆环」，方向复正；ton 原义「吨」→「大桶」；careless 1560 年代义自原义剔除；june/july 原义系被顶替的古英语旧月名释义（张冠李戴）；headache 原义系 1934 年俚语比喻义；law 原义系词根「躺」。lead 经两轮独立复核确认现行记录干净（审计清单此条多计）。

### 10.2 chain_flags 裁定（四批共标记 63 条）
39 词实际变更：链站 gloss 订正 16（laundry/mandate/minute/guilt/character/debt/diet 等）；补站/换首站/重立主链 9（sine 补梵语 jyā→阿拉伯语 jaib 误读链、press/discover 重立主链、duck/dinosaur/astronaut/cream 补站、nurse 换 nutrix）；未定论标注 4（april/cap/horse/teethe/strong）；disputes 补登记 15 词次（gnome 格言、ear 麦穗、think þyncan 合流、camp 断裂再借等）；scrub 按双源首选重立 schrobben 链首（未降待核）。24 条经复核保持现状（多为「链首词根站作谱系背景」类，与标准一口径一致）。ton 的 tun 补站因三套缓存无独立词条未执行，改 gloss 订正＋同词登记，不虚构。

### 10.3 待核池主干一致重跑
- 新口径：两源在 (a) 谱系主干（语言序列与主要词形走向）、(b) 最早历史词形及其 gloss、(c) 词的义项身份 三处一致即互证通过；中间站粒度/记法差异登记于 disputes，不再否决。真分歧保持待核并写明分歧点。
- 补抓成果并入：Etymonline 缓存 2,201 → 2,447 词条。
- 结果：处理 1,234/1,477。升 verified 956 条（全部按 10.1 新标准建档）；保持待核并改写 reason 278 条（compositional 透明构词 201 / origin_unknown 27 / trunk_unsettled 15 / single_source 13 / trunk_divergent 7 / evidence_gap 5 / origin_unconfirmed 4 / sources_split 2 / motivation_unsettled 2（butterfly、peanut）/ form_of_be、form_of_rise 各 1）。强制下限全达：near-miss 来源补齐者 240/240、chain_mismatch 词库 freq 前 1000 共 130/130、Dolch 89/89。
- 未处理：C 档最低频 243 条（doll、classroom、computer、homework 等现代复合词与晚近造词为主），记录与原因逐字未动，名单见 pending_patch 的 accounting，留待后续轮次。

### 10.4 民间词源复筛
golf、news 本轮升 verified：两词记录均载真实词源（golf ← 荷兰语 colf「球杆」；news ← new 的复数「一堆新事」），且在 folk_etymology_check 中逐字引来源驳斥缩略语伪说（Gentlemen Only… / NEWS 东南西北说）。民间词源在本库中只以「被驳斥对象」身份出现，VETO 口径不变。posh 仍为待核。

### 10.5 修复后总账与覆盖
- verified 1,757 / 待核 521 / 未收 195；JSON 总记录 2,278。
- 覆盖（词库 2,473）：全体 71%；高频前 100 词 81%（修复前 43%）；前 500 词 68%；Dolch 174/202（86%）。
- 全量复验：verified 全部 ≥2 来源；original_meaning 与 semantic_path 首站 100% 一致；禁用套话全库 0 命中；非首站 how 共 2,018 条、互异 2,013 条（余 5 条为同词多步的合法同述）。
- 第四、五节清单为 801 时代快照，其中个别词条状态已经本轮变更，以本节与各记录字段为准。
