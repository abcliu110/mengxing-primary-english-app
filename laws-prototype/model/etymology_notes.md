# 词源数据层交付说明（etymology.json）

## 一、收词总账

- 词库总词数：2,473 条。
- **收录进 etymology.json：2278 条**（verified 1814 + 待核 464；2026-11-02 C 档收尾轮后的最新口径，全程见第十、十一节）。
- **未收（无词源可考/不单独立档）：195 条**，只在本说明里列清单，不进 JSON（用户口径：有则有、无则无，不强行建立）。
- verified 的来源等级构成：二级双源互证 556 条；一级＋二级双源互证 1243 条；一级＋三级互证 13 条；二级＋三级互证 2 条。
- verified 里复用 ETYM_DB 既有已核链作事实底稿的：487 条；其余 1327 条为数据层建设与各修复轮次新核。
- （本节数字为 2026-11-02 修复轮次后的最新口径。此前口径沿革：初建 verified 804（见第八节）→ 同形异词普查订正 801、未收 192→195（第九节）→ 审计后修复轮次 verified 1757、待核 521（第十节）→ C 档收尾轮（243 条全处理）verified 1814、待核 464（第十一节）。）

## 二、待核分账（2026-11-02 主干一致口径两轮重跑后）

两轮重跑已处理全部 1,477 条待核：主干一致者共 1,013 条升 verified（首轮 956 + C 档收尾轮 57）并按新标准建档；保持待核 464 条的 pending_reason 已全部按新口径改写，无未处理余量。旧类别 chain_unparsable / morph_only / chain_mismatch / chain_too_short 至此清零。其中 compositional 355 条属「构词透明、词源叙事归形态层」的分类决定，不是核不到；form_of_* 16 条是已立档基词的屈折形；真正来源未定或来源分歧者 93 条。

- `compositional`：355 条
- `origin_unknown`：35 条
- `trunk_unsettled`：17 条
- `single_source`：13 条
- `origin_unconfirmed`：11 条
- `trunk_divergent`：7 条
- `evidence_gap`：5 条
- `motivation_unsettled`：3 条
- `sources_split`：2 条
- `form_of_be`：1 条
- `form_of_choose`：1 条
- `form_of_drive`：1 条
- `form_of_forget`：1 条
- `form_of_give`：1 条
- `form_of_go`：1 条
- `form_of_goose`：1 条
- `form_of_grow`：1 条
- `form_of_keep`：1 条
- `form_of_lie`：1 条
- `form_of_rise`：1 条
- `form_of_sing`：1 条
- `form_of_take`：1 条
- `form_of_thin`：1 条
- `form_of_throw`：1 条
- `form_of_win`：1 条

待核全表（词｜原因，以 etymology.json 各条 pending_reason 字段为准）：

- actress｜compositional（主干复核后）：actor + -ess（阴性后缀）透明派生，现代词义「女演员」由构词直接可读（1580 年代「做事的女子」、1700 年舞台义为同一构式的义项定型）；词源叙事在 actor 本词，待核保持
- afternoon｜compositional（主干复核后）：after + noon 透明复合（约 1300)，现代词义由构词直接可读、无历史漂移；词源叙事归形态层，待核保持
- aircraft｜compositional（主干复核后）：air + craft 构词透明，两源一致（Etymonline：1850 年 air-craft，义为『在空中航行的器具』，见于 John Wise 的文字，本指气球、取材于航海 imagery，1907 年后转指飞机、1930 年代起专指飞机；Wiktionary 模板同作 air + -craft『载具』）。craft『航行器具』加 air 已完全说明『航空器』义，虽所指由气球收窄到飞机，词义仍由构词直接给出，按构词透明口径不单独立档
- airline｜compositional（主干复核后）：air + line 构词透明：Etymonline 记其1813年本义为「空中直线」、1853年后用于直达铁路、1914年转指航空公司，Wiktionary 亦作 air + line 复合；词义始终由「空中航线」这一部件组合直接给出，故事在构词层，按项目口径不单独立档
- airmail｜compositional（主干复核后）：构词透明（air + mail），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- airplane｜compositional（主干复核后）：air + plane 复合，1907 年始见（Etymonline），由 aeroplane 改形而来；部件完全说明词义，故事在构词区，不单独立档
- airport｜compositional（主干复核后）：air + port 构词透明，两源一致（Etymonline：1919 年起常用，义为『民用航空运输的设施』，1902 年 Santos-Dumont 曾用它指飞艇的港，port 在此取与 aircraft 相关的『港』义，首指新泽西州大西洋城外的 Bader Field（1910 年开放）；Wiktionary 同作 air + port 复合）。部件义合起来就是『供航空器用的港＝机场』，无额外语义漂移，不单独立档
- angrily｜compositional（主干复核后）：构词透明（angry + -ly（angrily 的基词 angry 与 angr 的关系在他档）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- angry｜compositional（主干复核后）：anger + -y 透明派生（14 世纪末），现代词义即「有怒气的」由 anger 直接可读，无独立漂移链；词源叙事在 anger 本词，待核保持
- antiseptic｜compositional（主干复核后）：anti- + septic 的学理构词，1750 年始见（Etymonline、Wiktionary 一致）；前缀与词根把意思说尽，无独立语义演变链，不单独立档
- anybody｜compositional（主干复核后）：构词透明（any + body），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- anyone｜compositional（主干复核后）：any + one 复合，古英语以来即两词并用，1844 年才合写；构件自明，本词不单独立档，保持待核
- anywhere｜compositional（主干复核后）：构词透明（any + where），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- armchair｜compositional（主干复核后）：构词透明（arm + chair），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- autobus｜single_source（主干复核后）：法语 autobus 借入／auto- + bus 构词仅 Wiktionary 一源成录，Etymonline、牛津无词条；未达双源门，保持待核
- bachelor｜trunk_unsettled（主干复核后）：「a word of uncertain origin」（Etymonline、牛津一致）。三候选并立无定论：中世纪拉丁语 baccalarius「无地佃农」（或出 vacca「牛」，Kitchin 说）、baculum「棍棒」（侍从练棍说）、凯尔特语源说（Wedgwood）；Century Dictionary 谓或为数词混同，保持待核
- bad｜origin_unknown（主干复核后）：c. 1300 前罕见、1400 年前几无亲属词可寻（Etymonline：It has no apparent relatives in other languages）。古英语贬词 bæddel 缩略说三家皆仅作 perhaps/possibly；Wiktionary 另立古诺尔斯语 *badą「麻烦」借词说，无主干可对，保持待核
- badge｜origin_unknown（主干复核后）：三源一致认定来源未定——牛津与 Etymonline 同标 unknown origin（盎格鲁-法语 bage／盎格鲁-拉丁语 bagia「徽记」更上无源）；Wiktionary 提出的原始日耳曼语 *baugaz「环」仅属推测（possibly），无可互证主干，保持待核
- baker｜compositional（主干复核后）：bake + -er 行为人名词，古英语 bæcere 已成词（日耳曼语 *bakārijaz）；构件自明，本词不单独立档，保持待核
- bakery｜compositional（主干复核后）：bake + -ery（表场所后缀）构词透明：1810年「做面包的地方」，取代旧词 bakehouse（约1400年），Etymonline 与 Wiktionary 一致；部件义完全说明词义，不单独立档
- baseball｜compositional（主干复核后）：base + ball 复合，现代义 1845 年美式英语（Etymonline）；部件完全说明词义。附带筛查：Etymonline 明记其 1839 年由 Abner Doubleday 在 Cooperstown 发明之说为 legendary（传说），不入任何正链
- basketball｜compositional（主干复核后）：basket + ball 构词透明，两源一致（Etymonline：1892 年美式英语，玩法就是把 ball 投进 court 两端的 basket；这项运动是 James Naismith 1891 年在马萨诸塞州 Springfield 发明的；Wiktionary 模板同作 basket + ball）。运动名就是玩法的直白描述，部件完全说明词义，不单独立档
- bat｜trunk_unsettled（主干复核后）：两词同形须分线——bat「球棒」古英语 batt 或出凯尔特语（威尔士语 bat「杖」），后受古法语 batte 强化；bat「蝙蝠」为 16 世纪末中古英语 bakke（斯堪的纳维亚来源）的改形，其与古诺斯语 blaka「拍打」的关联 Wiktionary 明言 unclear。两线皆未定，保持待核
- bathroom｜compositional（主干复核后）：bath + room 构词透明：1780年「装有沐浴设备的房间」，20世纪美式转作厕所的委婉说法，Etymonline 与 Wiktionary 一致；委婉用法是语用层面的事，词义由部件直接给出，不单独立档
- beautiful｜compositional（主干复核后）：beauty + -ful 派生，15 世纪中期始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- bedroom｜compositional（主干复核后）：构词透明（bed + room，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- bedtime｜compositional（主干复核后）：bed + time 构词透明，两源一致（Etymonline：13 世纪早期 bed-time『通常上床休息的时间』；Wiktionary：中古英语 bedtyme，并比附更早的古英语 bedtīd『就寝时间』）。部件义即词义、无漂移，不单独立档
- been｜form_of_be（主干复核后）：been 是 be 的过去分词（古英语 (ġe)bēon），形史本身无争议；但 be 为多词根拼合的异干互补动词（*h₁es-／*bʰuH-／*h₂wes- 三系），本库未收 be 的主干词条，been 的深层谱系无从附着，待 be 立档后随附
- beige｜origin_unknown（主干复核后）：古法语 bege「未染色羊毛与棉的本色」（13 世纪）两家一致，但终极来源未明（牛津：of unknown ultimate origin；Etymonline：of obscure origin）；Wiktionary 阿尔卑斯语源经 *bysseus「棉灰」一线为推测链，不足作主干，保持待核
- bell｜origin_unconfirmed（主干复核后）：古英语 belle，日耳曼语内仅见低地一线同源（余皆借词）；Etymonline 拟印欧语拟声根 *bhel-「吼、鸣」（perhaps，与 bellan「吼」相联）；孤证拟声说未获互证，保持待核
- bet｜origin_unconfirmed（主干复核后）：1590 年代见于小偷黑话，三源都拿不出定论——Etymonline 明标 unknown origin，仅猜测或为 abet 的截短、或与 obsolete beet 有关；牛津作 perhaps a shortening of abet；Wiktionary 并列古英语 bet「更好」说与 abet 说，两说未互证到可定案，保持待核
- big｜origin_unknown（主干复核后）：三源一致认定来源未定——牛津明标 of unknown origin，Etymonline 称 obscure origin、或为斯堪的纳维亚方言来源（挪威语 bugge「大人物」），Wiktionary 仅给出 *bugja-「肿起」的推测链；无可互证的主干，保持待核
- birthplace｜compositional（主干复核后）：birth + place 构词透明：约1600年见载，中古英语另有同构旧词 birthstede（约1400年），Etymonline 与 Wiktionary 一致；部件义完全说明词义，不单独立档
- blackberry｜compositional（主干复核后）：black + berry 透明复合（古英语 blaceberian)，因果色得名，构词理据现代仍透明；词源叙事归形态层，待核保持
- blackbird｜compositional（主干复核后）：black + bird 复合，15 世纪晚期始见（Etymonline、Wiktionary 一致）；部件完全说明词义（OED 释其命名理据为歌鸟中唯一的黑羽者，仍是构词层说明），不单独立档
- blackboard｜compositional（主干复核后）：black + board 构词透明，两源一致（Etymonline：1823 年『涂黑、用粉笔书写的板』，尤指教室里用的；Wiktionary 同作 black + board 复合，并注这类板面早期多为黑色石板）。部件完全说明词义，不单独立档
- blueberry｜compositional（主干复核后）：blue + berry 构词透明：约1775年美国英语，以果色加果类名命名，Etymonline 与 Wiktionary 一致；部件义完全说明词义，不单独立档
- bookcase｜compositional（主干复核后）：构词透明（book + case），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- bookmark｜compositional（主干复核后）：book + mark 复合，1840 年始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- bookshop｜compositional（主干复核后）：构词透明（book + shop），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- bookstore｜compositional（主干复核后）：book + store 构词透明，两源一致（Etymonline：1763 年 book-store『卖书的店』；Wiktionary 同作 book + store 复合）。部件义即词义，不单独立档
- boy｜origin_unknown（主干复核后）：牛津与 Etymonline 均明标来源未定；Wiktionary 另立日耳曼语 *bōjô「幼弟」一线，余有古法语 embuie「戴镣者」说与 Liberman「拟声词＋昵称」混合说，并存而无主干互证，保持待核
- building｜compositional（主干复核后）：build + -ing 动名词（约 1300 年「建筑物」义、14 世纪晚期「建造过程」义），构件自明，本词不单独立档，保持待核
- busily｜compositional（主干复核后）：busy + -ly 派生，中古英语 bisiliche 约 1200 年（Etymonline、Wiktionary 一致）；构词透明，基词 busy 的故事归基词，不单独立档
- businessman｜compositional（主干复核后）：business + man 构词透明，两源一致（Etymonline：1826 年『从事商业的男子』，更早有 man of business（1660 年代）；Wiktionary 作 business + -man，并注它取代了更早的 merchant）。部件义即词义『做生意的人』，不单独立档
- butterfly｜motivation_unsettled（主干复核后）：切分 butter + fly 自古英语 buttorflēoge 以来无争议，然命名理据三说并存且皆无定论——（女巫化蝶）偷食黄油的旧信、常见种翅色奶黄、排泄物色（荷兰语同源词 boterschijte）；Etymonline 亦言 of obscure signification。切分成立而理据未定（半透明），保持待核
- campfire｜compositional（主干复核后）：camp + fire 复合，1835 年始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- candlelight｜compositional（主干复核后）：构词透明（candle + light），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- candlestick｜compositional（主干复核后）：构词透明（candle + stick，古英语 candelsticca 已成词，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- centimetre｜single_source（主干复核后）：法语 centimètre 借入（centi- + metre）仅 Wiktionary 一源成录，Etymonline、牛津无词条；未达双源门，保持待核
- changeable｜compositional（主干复核后）：构词透明（change + -able，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- chav｜origin_unconfirmed（主干复核后）：来源未定而仅有或然说：Wiktionary 明标 Origin uncertain，谓 probably 出罗姆语（吉普赛语）一源，比附罗姆语 chavi『男孩子』、ćhavo、chal『男孩』等；Etymonline 谓 2004 年见载指『反社会的年轻人』，apparently 出更早的北英格兰俚语 charver（1997，义为穿名牌运动服的粗野年轻人，来源不确），perhaps 最终出罗姆语。两源都只到『可能罗姆语』为止，具体源词形与传入路径未定，未达主干一致。另：council-housed and violent、Cheltenham average 等首字母缩略说法，Wiktionary 明定为民间词源式的逆构缩略词（backronyms），已否决、不入链
- chosen｜form_of_choose（主干复核后）：chosen 是 choose 的过去分词——中古英语 chosen / ichosen ← 古英语 ġecoren，Etymonline 与 Wiktionary 一致，形史无争议；choose 本词已立档（verified），分词形按 been 先例随基词处理，不单独建档
- classmate｜compositional（主干复核后）：class + mate 复合，1713 年始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- classroom｜compositional（主干复核后）：class + room 构词透明，两源一致（Etymonline：1811 年 class-room『上课的房间』；Wiktionary 同作 class + room 复合）。部件完全说明词义，不单独立档
- cleaner｜compositional（主干复核后）：构词透明（clean + -er），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- clearly｜compositional（主干复核后）：clear + -ly 副词（约 1300 年「清楚地」，1560 年代生「显然」义），构件自明，本词不单独立档，保持待核
- clever｜trunk_unsettled（主干复核后）：「手巧」义（1580 年代）与「脑聪」义（1704）三源一致，但祖先词未有定论——东盎格鲁方言 cliver「善抓取」、东弗里斯兰语 klüfer、挪威方言 klover（或经中古低地德语 klever「粘着」一线）诸说并存，另有古诺斯语 kleyfr「易劈」说；无可互证的单一主干，保持待核
- clickable｜compositional（主干复核后）：构词透明（click + -able（网络时代新构）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- climber｜compositional（主干复核后）：构词透明（climb + -er），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- climbing｜compositional（主干复核后）：构词透明（climb + -ing（动名词常规构成）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- coconut｜compositional（主干复核后）：coco + nut 构词透明：1610年代见载，Etymonline 与 Wiktionary 一致；coco 本身（葡萄牙语「鬼脸」）的故事在基词一边，本词部件义自明，不单独立档
- coexist｜compositional（主干复核后）：co- + exist 透明构词（1670 年代；晚期拉丁语 coexistere 为同构平行），现代词义由构词直接可读、无历史漂移；词源叙事在 exist 本词，待核保持
- colourful｜compositional（主干复核后）：构词透明（colour + -ful），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- commercial｜compositional（主干复核后）：commerce + -al 派生（法语 commercial 同形借形，源头拉丁语 commercium 链在 commerce 名下）；本词自身只是派生形容词，「电视广告」名词义 1935 年由形容词转类，构词层可尽释，不单独立档
- countryside｜compositional（主干复核后）：country + side 复合，15 世纪中期始见，字面「国家的一边/一带」（Etymonline）；部件说明词义，不单独立档
- crosswalk｜compositional（主干复核后）：cross + walk（名词，步道）构词透明，两源一致（Etymonline：1744 年先指『与其他路交叉的花园小径』，1853 年转指行人过街处；Wiktionary 模板同作 cross- + walk）。虽所指由花园小径换到马路，『横穿的步道』仍由部件直接给出，不单独立档
- cuff｜origin_unknown（主干复核后）：中古英语 cuffe「手套、连指手套」；牛津两义皆作 of unknown origin，Etymonline 谓或出中世纪拉丁语 cuffia「头巾」（of uncertain origin, perhaps ultimately from Greek)，Wiktionary 作 of obscure origin。无互证主干，保持待核
- cupcake｜compositional（主干复核后）：cup + cake 构词透明：1828年美国英语，得名或因在杯中烘烤、或因用量杯配比，Etymonline 两说并存但都在部件之内；部件义完全说明词义，不单独立档
- daddy｜compositional（主干复核后）：dad + -y（指小后缀）构词透明，三源一致（Etymonline：约 1500 年，dad 的口语指小形加 -y；牛津：16 世纪早期 dad + -y；Wiktionary 同作 dad + 指小后缀 -y，并注 dad 本身的见载反而晚于 daddy）。部件加亲昵指小义即词义、无漂移，不单独立档
- daily｜compositional（主干复核后）：day + -ly 透明派生（古英语 dæġlīċ 以来），现代词义由构词直接可读、无历史漂移；词源叙事归形态层，待核保持
- dance｜origin_unknown（主干复核后）：经古法语 dancier（12 世纪）入英（约 1300)，然法语词本身来历不明——牛津与 Wiktionary 均作 of unknown/uncertain origin；Etymonline 拟低地法兰克语 *dintjan（perhaps，与古弗里斯语 dintje「颤动」相联）仅一家之拟，无第二家互证主干，保持待核
- dancer｜compositional（主干复核后）：构词透明（dance + -er），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- dark｜origin_unconfirmed（主干复核后）：古英语 deorc 出日耳曼语 *derkaz，深层来历未定——Etymonline 明言 of uncertain etymology，Wiktionary 拟印欧 *dʰerg-「暗淡」作 possibly，牛津作 probably distantly related to German tarnen「隐藏」；拟测未获互证，保持待核
- darkness｜compositional（主干复核后）：dark + -ness 抽象名词（古英语 deorcnes「无光」），构件自明、本义无转折，本词不单独立档，保持待核
- day｜trunk_divergent（主干复核后）：古英语 dæg「日间；一生」与日耳曼语 *dagaz 本身确凿；印欧层分歧——Watkins 作 *agh-「一天」且谓日耳曼语 d- 来源 obscure，Boutkan 作 *dʰegʷʰ-「燃烧」；两家主干不合，保持待核
- daydream｜compositional（主干复核后）：构词透明（day + dream），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- daylight｜compositional（主干复核后）：day + light 构词透明：中古英语 daies liht 本是两词并行（12世纪中叶），约1300年连写，Etymonline 与 Wiktionary 一致；俚语 the daylights「眼珠」（1752年）是旁支，不属词库义主干；部件义自明，不单独立档
- daytime｜compositional（主干复核后）：day + time 复合，1530 年代始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- deeply｜compositional（主干复核后）：构词透明（deep + -ly，古英语 dēoplīċe 已成词，比喻义为常规引申），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- dirty｜compositional（主干复核后）：dirt + -y 派生（早期形 dritty 15 世纪初经音变而来，Etymonline、Wiktionary 一致）；构词透明，不单独立档
- disappear｜compositional（主干复核后）：dis-（表逆转）+ appear 构成（15 世纪早期），仿法语 disparaître，曾顶替本土 fordwīnan；构件自明，本词不单独立档，保持待核
- disconnect｜compositional（主干复核后）：构词透明（dis- + connect），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- dislike｜compositional（主干复核后）：dis- + like 混合构词（1540 年代），曾顶替本土词 mislike；构件自明，本词不单独立档，保持待核
- dodge｜origin_unknown（主干复核后）：三源一致标来源未定：牛津明标 of unknown origin（16 世纪中叶，义为『犹豫、讨价还价』）；Etymonline 谓 origin and sense evolution obscure，1560 年代义为『言行来回游移』（今已废），仅 perhaps 与苏格兰及北英格兰方言 dodd『慢跑』（1570 年代）相关，1680 年代才有『突然闪开躲避』义；Wiktionary 谓或出方言 dod／dodd『慢跑、蹒跚；猛拉』，of uncertain origin，或出未见载的中古英语 *dodden、最终原始日耳曼语 *dud-『移动』皆属推测。最早词形与释义无从定案，保持待核
- dodger｜compositional（主干复核后）：dodge + -er（施事后缀）构词透明：1560年代「闪躲者、耍滑头的人」，Etymonline 与 Wiktionary 一致，词库义「逃避者」由基词加后缀直接给出；corn-dodger「玉米饼」（1831年）Etymonline 谓或为另一词（北方方言 dodge「大块」），与词库义无关，不单独立档
- doe｜origin_unknown（主干复核后）：古英语 dā，牛津与 Etymonline 均作来源未明（Etymonline 另拟凯尔特语借词说）；Wiktionary 则上溯日耳曼语 *daihā、印欧根 *dʰeh₁(y)-「哺乳」（母鹿说）。两系处理互不相容，无两家互证主干，保持待核
- dog｜origin_unknown（主干复核后）：英语词源著名悬案——牛津明标 of unknown origin，Etymonline 称其为「英语词源最大的谜团之一」：古英语 docga 晚出且罕见，本指一种强壮犬种，16 世纪挤走通语 hund（今 hound）成为通名；任何谱系说均无实据，保持待核
- downstairs｜compositional（主干复核后）：down + stairs 构词透明，两源一致（Etymonline：1590 年代由介词短语 down the stairs 凝成，义为『往楼下、到楼下或在楼下』，1819 年作形容词、1843 年作名词；Wiktionary 作 down- + stair + -s 分析）。部件义即词义，不单独立档
- downtown｜compositional（主干复核后）：down + town 构词透明：1787年由短语 down town 入词，本指建在港口高地郊区下方的镇区，Etymonline 与 Wiktionary 一致；部件义完全说明词义，不单独立档
- dragonfly｜compositional（主干复核后）：构词透明（dragon + fly（比喻命名，构词透明）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- drawing｜compositional（主干复核后）：构词透明（draw + -ing（动名词常规构成）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- driven｜form_of_drive（主干复核后）：drive 的过去分词（Etymonline、Wiktionary 一致）；屈折形式随基词 drive 处理，不单独立档。「被驱动的雪」「有干劲的」等形容词义均为分词的引申，随基词登记
- driver｜compositional（主干复核后）：drive + -er 行为人名词（14 世纪晚期，最早义「赶牲口的人」），构件自明，本词不单独立档，保持待核
- duckling｜compositional（主干复核后）：构词透明（duck + -ling），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- dumpling｜origin_unconfirmed（主干复核后）：约1600年诺福克方言词；牛津作「apparently 出罕见形容词 dump『面团状的』」但自注 dumpling 的见载反而早于该形容词，年代自相矛盾；Wiktionary 并列低地德语借词说与 dump + -ling 说，Etymonline 亦作 of uncertain origin，三说均未定论，保持待核
- dwelling｜compositional（主干复核后）：dwell + -ing 动名词，14 世纪中期始见（Etymonline、Wiktionary 一致）；其更早的「迟延、停留」义在基词 dwell 名下，住所义是动名词的常规转指，构词层可尽释，不单独立档
- earphone｜compositional（主干复核后）：构词透明（ear + phone），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- earthquake｜compositional（主干复核后）：earth + quake 构词透明，两源一致（Etymonline：13 世纪晚期 eorthequakynge，由 earth + quake（名词）构成，古英语本有 eorðdyn、eorðbeofung 等旧说法；Wiktionary：中古英语 erthequake，与 earth + quake 复合对应，并注它取代了古英语 eorþbeofung『地摇』）。部件完全说明『地＋震动』之义，不单独立档
- earthworm｜compositional（主干复核后）：earth + worm 透明复合（约 1400)，现代词义由构词直接可读（古英语另有 eorðmata、regnwyrm「雨虫」旧名）；词源叙事归形态层，待核保持
- easily｜compositional（主干复核后）：构词透明（easy + -ly），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- eighteen｜compositional（主干复核后）：eight + -teen（ten 的弱化形）复合数词，古英语 eahtatīene、日耳曼语 *ahtōutehun 两源一致；构件自明，本词不单独立档，保持待核
- eighth｜compositional（主干复核后）：eight + -th 序数词（古英语 eahtoþa 一线），构件自明，本词不单独立档，保持待核
- eighty｜compositional（主干复核后）：eight + -ty（「十」组后缀）复合数词（古英语 hundeahtatiġ 一线），构件自明，本词不单独立档，保持待核
- electrician｜compositional（主干复核后）：electric + -ian（从业者后缀）派生透明：1751年「研究电的科学家」、1869年转「电工」，Etymonline 与 Wiktionary 一致；两次所指都由基词 electric 的当时义决定，派生词随基词处理，不单独立档
- enable｜compositional（主干复核后）：三源一致为 en-（使）+ able 构词（牛津 late Middle English: en-/in- + able；Etymonline 15世纪初「to make able」；Wiktionary enablen = en- + able），部件完全说明词义「使能够」，构词故事在词根词缀区讲，不单独立档。
- ending｜compositional（主干复核后）：现代形 end + -ing 完全透明；古英语已有 endung「终结」同源名词，但现代构词透明，词源叙事归形态层，待核保持
- enjoyable｜compositional（主干复核后）：构词透明（enjoy + -able），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- eraser｜compositional（主干复核后）：erase + -er（工具后缀）派生透明：1790年美国英语，原指刮墨的小刀，1858年转指橡皮，Etymonline 与 Wiktionary 一致；指称物随文具演变而变，「擦除用的工具」之义始终由部件给出，不单独立档
- eventful｜compositional（主干复核后）：构词透明（event + -ful），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- everybody｜compositional（主干复核后）：every + body（body 取已废的「人」义）复合，14 世纪晚期始见（Etymonline、Wiktionary 一致）；部件说明词义，不单独立档
- everyone｜compositional（主干复核后）：构词透明（every + one），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- everything｜compositional（主干复核后）：every + thing 的 univerbation（Etymonline 14世纪晚期 from every + thing；Wiktionary 中古英语 every thing 合并），部件完全说明词义「每件事、一切」，不单独立档。
- exactly｜compositional（主干复核后）：exact + -ly 派生透明：1530年代「精确地」，独立应答用法「没错」1869年才见载，Etymonline 与 Wiktionary 一致；派生词随基词处理，不单独立档
- exam｜single_source（主干复核后）：examination 的学生俚语截短（1848）仅 Etymonline 一源成录，牛津词源栏无载、Wiktionary 无语源节；未达双源门，保持待核
- excitement｜compositional（主干复核后）：构词透明（excite + -ment），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- eyebrow｜compositional（主干复核后）：eye + brow 复合（15 世纪早期；同构的古英语 ēagbrǣw 本指「眼皮」），构件自明，本词不单独立档，保持待核
- eyeglass｜compositional（主干复核后）：构词透明（eye + glass），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- eyelash｜compositional（主干复核后）：构词透明（eye + lash），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- eyesight｜compositional（主干复核后）：构词透明（eye + sight），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- fairground｜compositional（主干复核后）：fair + ground 复合，1741 年始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- faster｜compositional（主干复核后）：构词透明（fast 的比较级（常规屈折）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- feeling｜compositional（主干复核后）：feel + -ing 动名词（12 世纪晚期「触摸、触觉」义，14 世纪中期生「情感」义，15 世纪中期生「看法」义），构件自明，本词不单独立档，保持待核
- fifteen｜compositional（主干复核后）：five + -teen 的数词构式，古英语 fīftīene 以来构词透明、词义无漂移，现代词仍是「五加十」的活构式（与全数词同一口径）；词源叙事归形态层，待核保持
- finally｜compositional（主干复核后）：构词透明（final + -ly），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- firefighter｜compositional（主干复核后）：构词透明（fire + fighter），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- firefly｜compositional（主干复核后）：fire + fly 透明描形复合（1650 年代），因虫体发光得名，构词理据现代仍透明；词源叙事归形态层，待核保持
- fireman｜compositional（主干复核后）：fire + man 复合，14 世纪晚期本义「看火的人」，「消防员」义 1714 年始见（Etymonline）；语义随岗位变迁的理据在构词层可尽释，不单独立档
- fireplace｜compositional（主干复核后）：构词透明（fire + place），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- firework｜compositional（主干复核后）：构词透明（fire + work），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- fisherman｜compositional（主干复核后）：构词透明（fisher + man），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- fishing｜compositional（主干复核后）：构词透明（fish + -ing，动名词常规构成，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- fit｜origin_unknown（主干复核后）：词库义「合身的/健康的」属 fit (adj.)，三源一致称来源不明：牛津「of unknown origin」；Etymonline「mid-15c., of unknown origin」，仅猜测或与中古英语名词 fit「势均力敌的对手」（13世纪中）有关；Wiktionary 同作 uncertain further origin。主干无从建立，保持待核。另两个同形词 fit「一阵发作」（古英语 fitt，来源未定）与 fit「诗节」亦各自未定，均未混入。
- flag｜origin_unknown（主干复核后）：牛津与 Etymonline 均标来源未定（OED 谓或为拟声的「飘动」造词，亦有接日耳曼语 *flaką「扁平物」说），无可互证主干，保持待核
- flashlight｜compositional（主干复核后）：flash + light 构词透明：1886年指灯塔明灭信号灯、1892年摄影闪光装置、1905年才指手电筒，Etymonline 与 Wiktionary 一致；所指随照明技术迁移，「闪光的灯」之义由部件直接给出，不单独立档
- floss｜origin_unknown（主干复核后）：1759 年「粗丝」义；Etymonline 作 of uncertain origin——或出法语 floche ← 拉丁语 floccus（本身 of unknown origin），或为未载的古英语/古诺斯语 fleece 词根方言存留；牛津作 of unknown origin。无互证主干，保持待核
- fog｜trunk_unsettled（主干复核后）：1540 年代「浓雾」义；来源未定——或 foggy 的逆构（foggy 又出 fog「高草、苔沼」一线），或直接借斯堪的纳维亚语（丹麦语 fog「飞沫、雪团」、古诺斯语 fjúka「吹」出日耳曼语 *feukaną）；牛津作 perhaps a back-formation，两路未合，保持待核
- foggy｜compositional（主干复核后）：现代「有雾的」一义由 fog + -y 构成，三源构词一致（Wiktionary suffix fog + -y；Etymonline 1540年代 fog + -y(2)，或斯堪的纳维亚来源）；fog 本身的来源未定已在 fog 条以 trunk_unsettled 登记，foggy 的构词本身透明，不单独立档。Wiktionary 另注 foggy 早期有「长满高草、沼泽的」一义、与「雾」义是否同词未定，该异义不属词库义，未混入。
- football｜compositional（主干复核后）：foot + ball 构词透明：中古英语 fotbal，球的义项可溯至14世纪中叶、运动义约1400年，Etymonline 与 Wiktionary 一致；部件义完全说明词义，不单独立档
- footprint｜compositional（主干复核后）：构词透明（foot + print，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- forecast｜compositional（主干复核后）：fore- + cast 复合，中古英语 forecasten（Etymonline、Wiktionary 一致）；cast 取「谋划、筹划」义，「事先筹划」转「预测」的桥在部件义内可尽释，不单独立档
- foreigner｜compositional（主干复核后）：foreign（已核）+ -er（Etymonline 15世纪初 foreyner = foreign + -er(1)；Wiktionary 中古英语 foreyner，由 forein「外国人」加缀，-er 或受 stranger 类推），部件完全说明词义「外国人」，不单独立档。
- forgetful｜compositional（主干复核后）：forget + -ful 透明派生（14 世纪末 foryetful;Etymonline 称 a curious formation)，现代词义「健忘」由构词直接可读（1550 年代「使人忘却」义仅见于诗）；词源叙事归形态层，待核保持
- forgotten｜form_of_forget（主干复核后）：forgotten 是 forget 的过去分词——古英语 forġeten ← 原始西日耳曼语 *fragetan，Wiktionary 链完整、Etymonline 作15世纪早期分词形容词；forget 本词已立档（verified），分词形随基词处理，不单独建档
- fourteen｜compositional（主干复核后）：four + -teen 复合数词（古英语 fēowertīene 一线），构件自明，本词不单独立档，保持待核
- friendship｜compositional（主干复核后）：friend + -ship 透明派生（古英语 frēondsċiepe 以来构式未变），现代词义由构词直接可读；词源叙事在 friend 本词，待核保持
- fudge｜origin_unconfirmed（主干复核后）：软糖义 1895 年美式英语，出自学生俚语；三源都只给 probably/perhaps 级说法——Etymonline 作 apparently、perhaps 出自动词 fudge 或其名词；牛津作 probably an alteration of obsolete fadge「to fit」，其本身来源未明；Wiktionary 同作 probably a variant of fadge。主干候选一致但全源无定论，保持待核
- funny｜compositional（主干复核后）：fun + -y 构词透明，1756 年始见（Etymonline），「奇怪」义 1806 年；基词 fun 本身尚在待核，派生词按项目口径随基词处理，不单独立档
- fuzz｜origin_unconfirmed（主干复核后）：来源未定且候选互不一致：牛津作「probably of Low German or Dutch origin」（比较荷兰语 voos、低地德语 fussig「海绵状的」）；Etymonline 作 uncertain origin，猜测或为 fuzzy 的逆构；Wiktionary 作 uncertain，另引 OED「或为拟声」。三说无一确立、主干未一致，保持待核；1920年代美语「警察」义来源亦不明（牛津、Etymonline），与词库义「绒毛」分开登记，未混入。
- gamify｜compositional（主干复核后）：构词透明（game + -ify（当代新构）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- gardener｜compositional（主干复核后）：garden 的行为人（或仿古北法语 *gardinier 借/仿造，13 世纪晚期），曾顶替本土 wyrtweard「植物看守」；构件自明，本词不单独立档，保持待核
- geese｜form_of_goose（主干复核后）：goose 的复数，古英语 gēs 经 i-元音变音而来（Etymonline 明示 an instance of i-mutation；Wiktionary 链 gēs < *gansi(z) 一致）；屈折形式随基词 goose 处理，不单独立档
- gill｜origin_unknown（主干复核后）：Etymonline 明标 of unknown origin；与斯堪的纳维亚语（古诺斯语 gjǫlnar）的关联及印欧语 *gʰel-「颌」的谱系均为推测（perhaps/said to be）；牛津词源栏无载，保持待核
- girl｜origin_unknown（主干复核后）：约 1300 年 gyrle「孩子（不分男女）」；Etymonline 明言 of unknown origin；OED 拟未载的古英语 *gyrele 一线被 Liberman 判「音理学上难以接受」，另有 gierela「衣服」说；旧民间说出自拉丁语 garrulus「多嘴的」已被弃置。无互证主干，保持待核
- given｜form_of_give（主干复核后）：三源一致为动词 give 的过去分词（牛津 Middle English: past participle of give；Wiktionary give + 分词后缀 -n；Etymonline 作 past-participle adjective，14世纪晚期起有「命中注定的」、1560年代起「假定的」等分词形容词引申义）。词库亦作「give 的过去分词」处理，其来源链与已核 give 条主干一致（古英语 gefan 一系），分词引申义依附于 give，不单独建档。
- goalkeeper｜compositional（主干复核后）：构词透明（goal + keeper），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- goldfish｜compositional（主干复核后）：gold + fish 构词透明：1690年代见载，Etymonline 与 Wiktionary 一致；鱼自中国引入英国属物种传播史，不构成词源分歧，部件义自明，不单独立档
- gone｜form_of_go（主干复核后）：go 的过去分词（Etymonline、Wiktionary 链 ġegān < *gānaz 一致）；屈折形式随基词 go 处理，不单独立档
- granddaughter｜compositional（主干复核后）：构词透明（grand- + daughter），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- grandma｜compositional（主干复核后）：grand- + ma 的亲昵复合（Etymonline 1793年，为 grandmama（1749）的缩短，grandmother 的亲昵形式；Wiktionary grand + ma，仿 grandmother），部件完全说明词义「奶奶/外婆」，不单独立档。
- grandpa｜compositional（主干复核后）：grand- + pa 构词透明：1814年见载，是 grandpappa（1753年）的截短亲昵形，按 grandfather 仿造，Etymonline 与 Wiktionary 一致；部件义完全说明词义，不单独立档
- grandparent｜compositional（主干复核后）：grand- + parent 复合，1802 年始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- grandson｜compositional（主干复核后）：grand- + son 复合（Etymonline 1580年代 from grand + son；Wiktionary 同），部件完全说明词义「（外）孙子」，不单独立档。
- grapefruit｜motivation_unsettled（主干复核后）：grape + fruit 构词本身无争议（1814年），但命名理据三说并立——果实成串如葡萄（牛津、Wiktionary 主流说）、味道像葡萄（Etymonline 首列说）、由 greatfruit（学名 Citrus grandis「大柑橘」）音同化而来（Ciardi 说，Wiktionary 载）；理据未定，仿 butterfly / peanut 先例保持待核
- grasshopper｜compositional（主干复核后）：grass + hopper 复合（古英语 græshoppa），构件自明，本词不单独立档，保持待核
- grassy｜compositional（主干复核后）：grass + -y 派生，15 世纪中期始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- greenhouse｜compositional（主干复核后）：green + house 复合（Etymonline 1660年代 green + house；Wiktionary 同，注「house for growing greens」，指种蔬菜的房子），部件完全说明词义「温室」，不单独立档。
- grown｜form_of_grow（主干复核后）：grown 是 grow 的过去分词形容词化——14世纪晚期「已长成的」、1640年代「成熟的」，Etymonline 与 Wiktionary（中古英语 growen）一致；grow 本词已立档（verified），分词形随基词处理，不单独建档
- grown-up｜single_source（主干复核后）：grow up 的分词形容词化（14 世纪晚期；名词义 1813）仅 Etymonline 一源成录，余两源无载；未达双源门，保持待核
- haircut｜compositional（主干复核后）：hair + cut 复合，1887 年始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- handbag｜compositional（主干复核后）：构词透明（hand + bag），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- handmade｜compositional（主干复核后）：构词透明（hand + made），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- happily｜compositional（主干复核后）：构词透明（happy + -ly），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- happiness｜compositional（主干复核后）：happy + -ness 派生透明：1520年代「好运」、1590年代转「愉悦满足的心理状态」，Etymonline 与 Wiktionary 一致；义项迁移随基词 happy 的义变，派生词随基词处理，不单独立档
- haystack｜compositional（主干复核后）：构词透明（hay + stack），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- headmaster｜compositional（主干复核后）：head（形容词「首席的」）+ master 复合，1570 年代始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- headphone｜compositional（主干复核后）：head + phone 复合，phone 取自 telephone 的后半（Etymonline 1887年 head + telephone 中截出的第二成分；Wiktionary head + phone），部件完全说明词义「戴在头上的听筒/耳机」，不单独立档。
- healthy｜compositional（主干复核后）：health + -y 派生透明：1550年代见载，更早有同义 healthsome（1530年代），Etymonline 与 Wiktionary 一致；派生词随基词处理，不单独立档
- helpful｜compositional（主干复核后）：help + -ful 派生，14 世纪晚期始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- hers｜compositional（主干复核后）：her + 所有格 -s（Etymonline 约1300年 hires，源自 her，称 double possessive；Wiktionary 中古英语 hires = her + -s），与 yours、theirs 同一构词法，部件完全说明词义「她的（东西）」，不单独立档。
- hiccough｜single_source（主干复核后）：hiccup 因误联 cough 而改拼的变体（1620 年代）仅 Etymonline 一源成录；基词 hiccup 本身尚在待核，保持待核
- highlight｜compositional（主干复核后）：high + light 复合，1650 年代本为绘画术语「画面最亮处」，「精彩部分」比喻义 1855 年（Etymonline）；部件加一层常规比喻即可尽释，理据在构词区，不单独立档
- hometown｜compositional（主干复核后）：home + town 复合（Etymonline 1879年 home + town；Wiktionary 同），部件完全说明词义「家乡」，不单独立档。
- homework｜compositional（主干复核后）：home + work 构词透明：1680年代「在家做的工作」（与店铺、工厂相对），1889年专指学生的家庭作业，Etymonline 与 Wiktionary 一致；场景专化不改变构词透明性，部件义自明，不单独立档
- honeybee｜compositional（主干复核后）：构词透明（honey + bee），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- hopeful｜compositional（主干复核后）：hope + -ful 派生，约 1200 年始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- hopping｜compositional（主干复核后）：构词透明（hop + -ing（动名词常规构成）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- hotter｜compositional（主干复核后）：构词透明（hot 的比较级（常规屈折）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- hough｜single_source（主干复核后）：古英语 hōh「踵」一线仅 Wiktionary 成录，Etymonline 仅转指 hock 词条、牛津无载；未达双源门，保持待核
- housework｜compositional（主干复核后）：构词透明（house + work），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- however｜compositional（主干复核后）：构词透明（how + ever，14 世纪晚期成词），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- hurry｜trunk_unsettled（主干复核后）：1590 年代见载（莎士比亚多用）；两拟并立——或为 harry 的变体，或出中古英语 hurren「急速振动、嗡嗡」（出日耳曼语 *hurza）；牛津作 imitative。路径未定，保持待核
- hutch｜trunk_divergent（主干复核后）：入英主干两说——Etymonline 与牛津作古法语 huche ← 中世纪拉丁语 hutica（来源未定）借入；Wiktionary 则作本土古英语 hwiċe「箱」一线，仅拼写受 huche 影响、且 huche 出自另一日耳曼词根 *hudjō；词本身出自哪条线未定，保持待核
- icy｜compositional（主干复核后）：ice + -y 透明派生（古英语 īsiġ 有同构词，现代用法为中古晚期重构），词义由构词直接可读；词源叙事归形态层，待核保持
- illness｜compositional（主干复核后）：ill（已核）+ -ness（Etymonline 1680年代 ill + -ness；Wiktionary 同），词义随 ill 本身「坏→生病」的专化而定：它约1500年先指「坏品质」，1680年代才指疾病，该段历史已含在 ill 条，不单独立档。
- imbalance｜compositional（主干复核后）：im-（in-「不」的变体）+ balance 构词透明：1891年医学写作中见载，Etymonline 与 Wiktionary 一致；否定前缀加基词，部件义完全说明词义，不单独立档
- impossible｜compositional（主干复核后）：im-（in- 的同化形，义「不」）+ possible，整体出拉丁语 impossibilis 经古法语于 14 世纪晚期入英；否定构件完全透明，本词不单独立档，保持待核
- irresponsible｜compositional（主干复核后）：构词透明（ir- + responsible），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- jam｜origin_unknown（主干复核后）：动词 jam「挤、塞」1706/1719 年见载，of unknown origin（或为中古英语 cham「咬」的变体）；名词「果酱」（1730 年代）当为动词的转用（压碎成酱），然动词本身来历不明，主干缺失，保持待核
- jazz｜origin_unknown（主干复核后）：牛津明标 of unknown origin，Wiktionary 标来源未定（{{unk}}）；Etymonline 长文梳理 jasm（1860「精力」）/ gism（1842）诸说均为 perhaps 级推测；1912年棒球俚语、1915年音乐义的见载年代三源一致，但词的来历无定论，保持待核
- job｜origin_unknown（主干复核后）：1550 年代 jobbe of worke 短语中见载，来源未定——牛津明标 of unknown origin；Etymonline 作 uncertain origin，仅猜测或为 gobbe「团块」之变体（经「一车货」义）；Wiktionary 并列 gobbe / jobben / choppe 三个候选，无一可互证定案，保持待核
- juicy｜compositional（主干复核后）：构词透明（juice + -y），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- jump｜trunk_divergent（主干复核后）：Wiktionary 主张源于原始日耳曼语 *gumbōną「蹦跳」（经中古低地德语或古诺斯语传入），Etymonline 与牛津（据 OED）则认为该词 1520 年代才在英语出现、无更早来源、很可能是拟声造词，德语同源关系无据；两说在主干上对立，保持待核
- keeper｜compositional（主干复核后）：keep + -er 行为人名词（约 1300 年「看守人」义），构件自明，本词不单独立档，保持待核
- kept｜form_of_keep（主干复核后）：keep 的过去式/过去分词，中古英语 kepte < 古英语 cēpte（Wiktionary；Etymonline 同以分词形容词处理）；屈折形式随基词 keep 处理，不单独立档
- ketchup｜trunk_unsettled（主干复核后）：主流说为马来语 kecap ← 闽南语「膎汁」kê-chiap「鱼卤」（Wiktionary 作 probably，Etymonline 转述现代来源同此说但加 possibly），牛津另作粤语 k'ē chap「番茄汁」（perhaps），Etymonline 另载图卢语 kajipu「咖喱」说；三路皆带保留、无两家无条件互证，且 17-18 世纪此词泛指凤尾鱼/蘑菇/牡蛎等多种酱汁、番茄义晚至 19 世纪末，主干未定，保持待核
- keyboard｜compositional（主干复核后）：key + board 复合（Etymonline 1819年，key 取「乐器机件」义 + board，原指钢琴、风琴，1846年推广到其他机器；Wiktionary key + board），部件完全说明词义「键盘」，不单独立档。
- kill｜trunk_unsettled（主干复核后）：约 1200 年「击打」、约 1300 年「杀死」；来源三拟并立——未载的古英语 *cyllan（出日耳曼语 *kwuljaną ← 印欧语 *gʷelH-「投掷伤人」)、古英语 cwellan「处死」的变体（quell 一线，牛津/Etymonline 所主但作 probably/perhaps)、古诺斯语 kolla「击头」；无两家确立的同一主干，保持待核
- kindness｜compositional（主干复核后）：kind + -ness 透明派生（约 1300 kyndenesse「礼貌、善行」以来构式未变），现代词义由构词直接可读；词源叙事在 kind 本词，待核保持
- kingly｜compositional（主干复核后）：king + -ly 透明派生（古英语 *cyninglīċ 已有同构词），现代词义由构词直接可读、无历史漂移；词源叙事在 king 本词，待核保持
- koi｜evidence_gap（主干复核后）：1727 年借自日语 鯉 koi「鲤鱼」，两家缓存仅有此一线记录，原始义项编年与字段无从填实（汉字 鯉 的语源不在缓存内）；按不降格建档原则保持待核
- lain｜form_of_lie（主干复核后）：lie（躺）的过去分词（Etymonline 明示 past participle of lie）；Wiktionary 本词条 Etymology 节混入了同形的 lain「隐瞒」（古诺斯语 leyna 一系）词条内容，与词库义无关；屈折形式随基词 lie 处理，不单独立档
- lazy｜origin_unconfirmed（主干复核后）：1540 年代 laysy「厌于劳作」；Wiktionary 作 origin uncertain，Etymonline 作 a word of unknown origin——Skeat 主低地德语说（中古低地德语 lasich「软弱」← 印欧语 *(s)leg-「松弛」）为今之通说但仍属拟测；另有 lay 派生说（仿 tipsy）。无互证主干，保持待核
- learner｜compositional（主干复核后）：构词透明（learn + -er），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- lice｜single_source（主干复核后）：louse 的复数（古英语 lȳs，元音变音复数）仅 Wiktionary 一源成录，Etymonline（lice 词条为空）、牛津无载；未达双源门，保持待核
- limitable｜compositional（主干复核后）：构词透明（limit + -able），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- lipstick｜compositional（主干复核后）：lip + stick 复合，1880 年始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- log｜origin_unknown（主干复核后）：中古英语 logge，牛津与 Etymonline 均作来源未明（牛津或拟「象征沉重之拟形」）；古诺尔斯语 lág「倒下的树」一线被多位词源学家以语音理由否决，无两家互证主干；「日志」义出航海测程木（log）传统，其源头词本身未定，保持待核
- lonely｜compositional（主干复核后）：lone + -ly（牛津 16世纪晚期 lone + -ly；Etymonline 约1600年「孤单的、无人去的」，1811年起「因缺伴而难过的」；Wiktionary lone + -ly，或作 alonely 的缩短），部件说明词义「孤独的」，情感义是「独处」义的自然引申，不单独立档。
- lorry｜trunk_unsettled（主干复核后）：1838年铁路用语；Etymonline 谓或出动词 lurry「拉、拖」（1570年代，其本身来源未明），Wiktionary 并列 lurry 说与人名 Laurie 说，牛津作 perhaps from the given name Laurie——两候选并立，无一获双源支持，1911年「卡车」义的年代链清楚但词干来历未定，保持待核
- loudly｜compositional（主干复核后）：构词透明（loud + -ly），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- lovable｜compositional（主干复核后）：构词透明（love + -able），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- luckily｜compositional（主干复核后）：lucky + -ly 派生，1520 年代始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- lucky｜compositional（主干复核后）：构词透明（luck + -y，义无漂移），Etymonline（15 世纪中叶始见，先指人、1540 年代指物）与 Wiktionary（中古英语 lukky = luck + -y）构词分析一致，现代义「幸运的」由部件直接给出；牛津词源栏缓存为空。其词源内容在基词 luck 与构词层，本词不单独立档
- lunch｜trunk_unsettled（主干复核后）：lunch「午餐」为 luncheon 的截短（截短年代 Etymonline 作 1786、Wiktionary 梳理作 1829）两源一致；但 luncheon 本身主干未决——OED 谓与「大块（hunk）」旧词（1570 年代）同形、或由 lump 演变，Wiktionary 并存 nuncheon（noon + schench「饮」）改造说与 lunch + -ing 说；上游未定，保持待核
- lunchtime｜compositional（主干复核后）：构词透明（lunch + time），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- maglev｜compositional（主干复核后）：构词透明（magnetic levitation 的缩合混成（mag- + lev-），当代科技术语造词），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- manageable｜compositional（主干复核后）：构词透明（manage + -able），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- messy｜compositional（主干复核后）：构词透明（mess + -y），Etymonline 记 1843 年始见、取 mess 已有的「混乱状态」义加 -y，Wiktionary 同作 mess + -y；「凌乱的」由部件直接给出、无独立漂移（1924 年「不道德」义为次要比喻引申）。其词源内容在基词 mess（已立档）与构词层，本词不单独立档
- midnight｜compositional（主干复核后）：mid- + night 复合（古英语 midniht，日耳曼语 *midjanahts 同构），构件自明，本词不单独立档，保持待核
- mighty｜compositional（主干复核后）：现代形 might + -y 完全透明（古英语 mihtiġ、日耳曼语 *mahtīgaz 的构词在形态层完整可溯）；词义无历史漂移记录，词源叙事归形态层，待核保持
- milkshake｜compositional（主干复核后）：构词透明（milk + shake），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- mini｜compositional（主干复核后）：词库义为形容词「迷你的」，出前缀 mini-（Wiktionary 英语节仅作 From the prefix mini-）；Etymonline 所记 mini 名词（1961年 mini-car 截短、1966年 miniskirt 截短）与词库形容词义不是同一条目，本词按构词透明处理，不单独立档
- misread｜compositional（主干复核后）：构词透明（mis- + read，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- miss｜evidence_gap（主干复核后）：词库义（对女子的称呼）为 mistress 的 17 世纪缩略，Etymonline（miss n.2：by 1700「未婚年轻女子」）与 Wiktionary（From mistress）一致；但 mistress 不在词库、三套缓存均无其条目原文，链条中段（magister 系）证据缺失，按标准不凭记忆建档，保持待核
- misunderstand｜compositional（主干复核后）：mis- + understand 复合，约 1200 年始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- modernize｜compositional（主干复核后）：构词透明（modern + -ize，1680 年代成词，或经法语 moderniser，两说并存于来源），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- monkey｜trunk_unsettled（主干复核后）：牛津标来源未定；主流推测为未见载的中古低地德语 *moneke（1498 年《列那狐》中猿猴之子的名字），其本身或出罗曼语 monne 一族、终极或出阿拉伯语 maimun「吉祥的」（Klein 谓系避讳语），链环多为构拟与或然，未成双源互证，保持待核
- mooncake｜compositional（主干复核后）：构词透明（moon + cake），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- moonlight｜compositional（主干复核后）：moon + light 复合（中古英语 moonelight），构件自明，本词不单独立档，保持待核
- moreover｜compositional（主干复核后）：构词透明（more + over（源短语 and yit more ouer），14 世纪晚期写合），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- motivate｜single_source（主干复核后）：motive + -ate（1863，或仿法语 motiver）仅 Etymonline 一源成录，牛津无载、Wiktionary 仅作对照；未达双源门，保持待核
- motorcycle｜compositional（主干复核后）：构词透明（motor + cycle），Etymonline 记 1895 年始见、释为 motor 与 bicycle 的 -cycle 拼合的混成词，Wiktionary 同作 motor + cycle 复合；「摩托车」由部件完全给出。Wiktionary 另提 1897 年法国 Werner 兄弟的 Motorcyclette 产品，但英语词 1895 年已见载、早于该产品，不作入英主干；本词不单独立档
- mr｜single_source（主干复核后）：Mister 的缩略仅 Wiktionary 一语成录，Etymonline、牛津无独立词源条；未达双源门，保持待核
- mushroom｜trunk_unsettled（主干复核后）：中古经盎格鲁-法语 musherun（古法语 mousseron）入英；深层分歧——OED 谓通常作法语 mousse「苔藓」（出日耳曼语）的派生、Weekley 从之，Klein 谓两者「毫无共同之处」、Barnhart 作 of uncertain origin；晚期拉丁语 mussirio 一形或反借自法语。主干未定，保持待核
- neighbourhood｜compositional（主干复核后）：构词透明（neighbour + -hood（英式拼法）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- newspaper｜compositional（主干复核后）：news + paper 复合，1660 年代始见（作 newes paper，Etymonline、Wiktionary 一致）；构词透明（基词 news 的链已在 news 名下核验），不单独立档
- nineteen｜compositional（主干复核后）：nine + -teen（ten 的弱化形）复合数词，古英语 niġontīene、日耳曼语 *newuntehun 两源一致；构件自明，本词不单独立档，保持待核
- ninety｜compositional（主干复核后）：nine + -ty 的数词构式，古英语 nigontiġ 以来构词透明、词义无漂移（与全数词同一口径）；词源叙事归形态层，待核保持
- nobody｜compositional（主干复核后）：no + body 复合，约 1300 年作 no bodi 两词，14—18 世纪分写、后合写；1580 年代另生「小人物」义；构件自明，本词不单独立档，保持待核
- noisy｜compositional（主干复核后）：构词透明（noise + -y），Etymonline 记 1690 年代始见「发出大声响、满是噪声」，Wiktionary 同作 noise + -y，义无漂移；基词 noise 本身的来源（拉丁语 nausea 与 noxia 两说未定）属基词层争议，不影响本词构词主干。本词不单独立档
- nonfiction｜compositional（主干复核后）：构词透明（non- + fiction），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- nonsense｜compositional（主干复核后）：non- + sense 透明构词（约 1610)，现代词义由构词直接可读、无历史漂移；词源叙事归形态层，待核保持
- nonstop｜compositional（主干复核后）：构词透明（non- + stop），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- notebook｜compositional（主干复核后）：note + book 构词透明：1570年代「可记笔记的本子」，Etymonline 与 Wiktionary 一致；部件义完全说明词义，不单独立档
- noticeable｜compositional（主干复核后）：notice + -able 派生，1796 年始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- oddity｜compositional（主干复核后）：odd + -ity 派生透明：1713年「古怪的特性」、1748年「怪人」，Etymonline 谓其为杂交派生（odd 为日耳曼语、-ity 出法语/拉丁语一线），Wiktionary 一致；派生词随基词处理，不单独立档
- ourselves｜compositional（主干复核后）：构词透明（our + selves（反身构成）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- outside｜compositional（主干复核后）：构词透明（out + side），Etymonline 记名词约 1500 年「外侧、外表」出自 out- + side，形容词 1630 年代、副词 1813 年、介词 1826 年均为同一空间义的常规词性扩展，Wiktionary 同作 out + side 复合；各义均可由部件直接推出。本词不单独立档
- overcoat｜compositional（主干复核后）：over- + coat 构词透明：1802年见载，更早有 overcloth（14世纪晚期）、overgarment（15世纪晚期）等同构旧词，Etymonline 与 Wiktionary 一致；部件义完全说明词义，不单独立档
- overweight｜compositional（主干复核后）：over- + weight 复合，1630 年代始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- painful｜compositional（主干复核后）：构词透明（pain + -ful），Etymonline 记 14 世纪中叶 peineful「伴有疼痛的」（最初指十字架苦难）、约 1400 年转「引起身体疼痛」，Wiktionary 同作中古英语 paynful = pain + -ful；「受痛／致痛」两面均为 -ful 的常规多义，部件已完全说明词义，基词 pain 已立档。本词不单独立档
- pancake｜compositional（主干复核后）：构词透明（pan + cake，约 1400 年成词（或仿中古低地德语 pankôke 的同构复合），义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- panicky｜compositional（主干复核后）：构词透明（panic + -y），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- password｜compositional（主干复核后）：pass + word 构词透明：1798年「区分敌我的通行口令」，Etymonline 与 Wiktionary 一致，Wiktionary 并注计算机义出此口令义；部件义完全说明词义，不单独立档
- pat｜origin_unconfirmed（主干复核后）：来源对起源均只作推测——Etymonline 作「约 1400 年名词『一击』，或许源于拟声（perhaps originally imitative）」，牛津作「probably imitative（很可能拟声）」；Wiktionary 另给古英语 plætt「有声的一击」← 西日耳曼语 *platt ← 日耳曼语 *plat-「击打」的重构链（需假设词中 l 脱落），与拟声说未能互证成一条可确认主干。词库义「轻拍」对应的击打义虽古，起源本身未定，保持待核
- peaceful｜compositional（主干复核后）：peace + -ful（14 世纪早期），曾顶替古英语 friþsum；构件自明，本词不单独立档，保持待核
- peanut｜trunk_unsettled（主干复核后）：Etymonline 作 pea + nut 复合（1807)，然 Wiktionary 明注此形 perhaps a folk etymology of pinda/pinder（源出非洲语言的旧名，南美植物经葡萄牙人传播）；构词理据未定，两说未合，保持待核
- penguin｜origin_unknown（主干复核后）：牛津「of unknown origin」，Etymonline 亦云未明。威尔士语 pen「头」+ gwyn「白」说「常被断言」而未证，拉丁语 pinguis「肥」仅形似，无一家定案；指称转移（1570 年代指北半球大海雀 → 1580 年代南半球企鹅）有据而词形来历无主干可对，保持待核
- pet｜origin_unknown（主干复核后）：牛津与 Etymonline 均明标 unknown origin——1530年代苏格兰及英格兰北部方言词，先指「被宠爱的孩子」（约1500年）后指宠物；Wiktionary 给出苏格兰语 pet ← 苏格兰盖尔语 peata 一线，但明标 uncertain、终极或为前印欧底层词，未达双源互证，保持待核
- photocopy｜compositional（主干复核后）：构词透明（photo-「摄影的」+ copy），Etymonline 记 1924 年动词「作摄影复制」、1934 年名词、1942 年随静电复印普及得今用，Wiktionary 同作 photo- + copy 复合；词义由部件完全给出，属现代技术复合词。本词不单独立档
- photographer｜compositional（主干复核后）：构词透明（photograph + -er），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- photographic｜compositional（主干复核后）：photograph + -ic 派生，1839 年与 photograph 同批见载（Etymonline、Wiktionary 一致）；基词 photograph 的造词链已随 photo 记录登记，本词为常规派生，不单独立档
- pie｜trunk_unsettled（主干复核后）：约 1300 年「馅饼」，中世纪拉丁语 pie 一线或与 pica「喜鹊」相联（以鹊之杂集喻馅之杂合，牛津/Etymonline 皆作 perhaps/possibly)，或出自姓氏 Pie 的创制者；两拟未定，保持待核
- piece｜trunk_unsettled（主干复核后）：经古法语 piece ← 通俗拉丁语 *pettia；深层未定——Wiktionary 标注 of uncertain origin，Etymonline 拟高卢语 *pettsi（出凯尔特语 *kwezd-i- ← 印欧语 *kwezd-「部分」）作 probably，牛津作 of obscure ultimate origin。单线拟测未获第二家确立，保持待核
- pig｜origin_unknown（主干复核后）：中古英语 pigge 本义「小猪」（成年猪旧称 swine），古英语 *picga 仅见于复合词；其深层来历 Etymonline 明言 like dog, its further etymology unknown，OED 记与低地德语 bigge 的关系「音系困难」；牛津另作 picbrēd「猪食」首元说，Pokorny 拟联印欧 *bew-「吹、胀」（并牵 big），三说互不相容且皆带保留，无互证主干，保持待核
- piglet｜compositional（主干复核后）：pig + -let（小称后缀）派生透明：Etymonline 作1883年、Wiktionary 作1855年见载，年份小异而构词一致；派生词随基词处理，不单独立档
- pink｜origin_unconfirmed（主干复核后）：花名 pink 1570 年代始见，来源未明——Etymonline 明标 a word of unknown origin，仅并列两猜测：或出自动词 pink「刺、扎」（取锯齿花瓣），或出自荷兰语 pink「小、窄」（经 pinck oogen「半闭的小眼睛」）；Wiktionary 同标 origin uncertain；牛津只给出「颜色义来自花名」的后段。颜色义的来路（花名转颜色）清楚，但花名本身的主干无源可证，保持待核
- pitch｜origin_unknown（主干复核后）：词库义项为投掷/音高一线（pitch v.1/n.1）；牛津明言此线「或许关联古英语 picung，终极来源未明，词义演变晦暗」（of unknown ultimate origin; sense development obscure），Etymonline 亦称诸义项间关联 obscure，无互证主干。沥青义 pitch（出拉丁语 pix）为同形异词，不属本义项，保持待核
- pizza｜origin_unknown（主干复核后）：意大利语 pizza 本义「饼」，1845 年入英；其意大利语词源 of uncertain origin——希腊语 pēktḗ/pittakion、拉丁语 pīnsere「捣」与 pinza「夹」诸说并立，无一确立，保持待核
- playground｜compositional（主干复核后）：play + ground 现代透明复合（1780 年记录），词义即「玩的场地」无历史漂移（古英语另有 plegstow 同义旧构）；词源叙事归形态层，待核保持
- ploughman｜compositional（主干复核后）：构词透明（plough + man），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- plow｜single_source + 深层未定（主干复核后）：plough 的美式拼法；其谱系仅 Etymonline 成录（古英语 ploh ← 原始日耳曼语 *plōga-，Boutkan 指该词来源未定、或非印欧来源），Wiktionary、牛津无独立词条；且 plough 本词尚在待核，保持待核
- policeman｜compositional（主干复核后）：police + man 构词透明：1790年见载，Etymonline 与 Wiktionary 一致；部件义完全说明词义，不单独立档
- policewoman｜compositional（主干复核后）：构词透明（police + woman），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- politely｜compositional（主干复核后）：构词透明（polite + -ly），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- politician｜compositional（主干复核后）：politics/politic + -ian 派生，1580 年代始见（Etymonline、Wiktionary 一致）；构词透明，其贬义色彩是用法层变化，不单独立档
- popcorn｜compositional（主干复核后）：构词透明（pop + corn，popped corn 的缩略），Etymonline 记 1819 年指「适合爆裂的印第安玉米」、出自 pop + corn，Wiktionary 同作 popped corn 缩略／复合；「爆米花」由部件直接给出。本词不单独立档
- posh｜trunk_unsettled（主干复核后）：缩略词说 port outward, starboard home 三源一致判定无证据，属民间词源、只能登记为被否定条目；正链候选为罗姆语 posh「半（便士）」经俚语「钱」（1830）→「花花公子」（1890）→「豪华的」（1914），Etymonline 与 Wiktionary 倾向此说但均作 most likely / perhaps 级，牛津仅作 perhaps from slang posh，未达主干一致门槛，保持待核
- postcard｜compositional（主干复核后）：post（邮政义）+ card 复合，1870 年始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- postman｜compositional（主干复核后）：构词透明（post「邮件、驿递」+ man），Etymonline 记 1520 年代「骑驿马送信的人」、1758 年即「邮递员」，Wiktionary 同作 post（mail）+ -man 复合；词义由部件完全给出，基词 post 已立档。本词不单独立档
- prawn｜origin_unknown（主干复核后）：牛津与 Etymonline（引 OED「其他语言中无相似名称」）均标 unknown origin，15世纪早期作 prayne；Wiktionary 所举古英语 *prægn 构拟与古法语 *parne 说均被 OED 判为不可信或存疑，无主干可立，保持待核
- preheat｜compositional（主干复核后）：构词透明（pre- + heat），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- preview｜compositional（主干复核后）：pre- + view 复合，动词约 1600 年始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- psychological｜compositional（主干复核后）：构词透明（psychology + -ical），Etymonline 记 1680 年代「关乎作为研究对象的心灵的」、20 世纪初渐转「影响心理／情绪状态的」，Wiktionary 同作 psychology + -ical；后一转义是 -ical 形容词的常规扩展，词义仍由基词 psychology（已立档）加后缀直接给出。本词不单独立档
- pun｜origin_unknown（主干复核后）：1640 年代「双关」义；来源未定——或谓 pundigrion 的截短（pundigrion 本身词源未明），或谓意大利语 puntiglio 的戏谑改形（出拉丁语 punctum「点」），OED 评后说为 pure speculation；牛津作 perhaps。无互证主干，保持待核
- puzzle｜origin_unknown（主干复核后）：动词 1590 年代始见，来源未明——牛津明标 of unknown origin；Etymonline 仅作 possibly frequentative of pose（取 pose 已废的「使困惑」义），属猜测；Wiktionary 标 {{unc}} 并列出与低地德语、弗里斯兰语诸「琐碎劳作」词的同源可能及古英语 puslian 说，但明说中间环节无证据。无可互证主干，保持待核
- quietly｜compositional（主干复核后）：构词透明（quiet + -ly），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- quiz｜origin_unknown（主干复核后）：Wiktionary 明标 unknown origin，Etymonline 明标 of uncertain origin 并列多条互不相容的线索（俚语 quiz「怪人」1782 年、动词或源拉丁语 qui es?「你是谁？」等），牛津仅作 possibly（可能源于 quiz「盯着看」并受 inquisitive 影响）；最早义本身（怪人／考问）亦无定论，无可互证主干。著名的都柏林剧院经理 Daly 赌约造词说属民间词源：Etymonline 引 OED 评为 doubtful、Wiktionary 明记 without evidence，只能作被否定的流传说，不得入链，保持待核
- railway｜compositional（主干复核后）：rail + way 构词透明：1776年泛指铺轨道路、1812年现代义，Etymonline 与 Wiktionary 一致；部件义完全说明词义，不单独立档
- rainbow｜compositional（主干复核后）：rain + bow 通用日耳曼复合（古英语 regnboga 以来），现代词义由构词直接可读、无历史漂移；词源叙事归形态层，待核保持
- raincoat｜compositional（主干复核后）：构词透明（rain + coat），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- raindrop｜compositional（主干复核后）：构词透明（rain + drop，古英语 reġndropa 已成词（原始日耳曼语 *regnadrupô），义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- rainstorm｜compositional（主干复核后）：构词透明（rain + storm），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- rainy｜compositional（主干复核后）：rain + -y 形容词，古英语 reġniġ 已成词（日耳曼语 *regnagaz）；构件自明、词义无转折，本词不单独立档，保持待核
- readable｜compositional（主干复核后）：read + -able 派生，15 世纪初始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- really｜compositional（主干复核后）：构词透明（real + -ly），Etymonline 记约 1400 年「实际上、真实地」（最初指圣餐中基督的真实临在）、15 世纪初通义、约 1600 年纯强调义「确实」，Wiktionary 同作中古英语 really = real + -ly；强调义是「确实」的常规强化，词义由部件直接给出，基词 real 已立档。本词不单独立档
- recycle｜compositional（主干复核后）：re- + cycle 构词透明：1922年工业流程义见载、1960年专指废料再生，Etymonline 与 Wiktionary 一致；前缀「再」加基词，部件义完全说明词义，不单独立档
- refill｜compositional（主干复核后）：re- + fill 复合，动词 1680 年代始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- reliable｜compositional（主干复核后）：构词透明（rely + -able），Etymonline 记 1560 年代苏格兰语 raliabill「可被依靠的」出自 rely + -able，Wiktionary 同作 rely + -able；其后在英国被讥为美式用法的争议是用法史而非词义主干分歧，「可靠的」由部件完全给出。本词不单独立档
- reread｜compositional（主干复核后）：re- + read 构词透明：1782年见载，Etymonline 与 Wiktionary 一致；部件义完全说明词义，不单独立档
- resentful｜compositional（主干复核后）：resent + -ful 派生，1650 年代始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- retell｜compositional（主干复核后）：构词透明（re- + tell），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- rewrite｜compositional（主干复核后）：re- + write 复合，1560 年代本义「书面回复」，「重写」义 1730 年（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- roach｜single_source（主干复核后）：词库义项「蟑螂」为 cockroach 的误拆截短（1830 年，误以为复合词）——此说仅 Etymonline 一家有完整原文在缓存内；Wiktionary 与牛津缓存均只载「拟鲤鱼」义项（古法语 roche，终极来源未明）一线，蟑螂线（含 cucaracha 阶段的民间重塑）无第二家原文互证，保持待核
- rock｜trunk_unsettled（主干复核后）：中古英语 rokke 为古英语 *rocc（仅见于复合词 stānrocc，属构拟）与古北法语 roche 的合流；法语一线出中世纪拉丁语 rocca（767 年见载），其终极来源未定（凯尔特语说与通俗拉丁语 *rupica 说并存，后者音形不合），牛津明标 of unknown ultimate origin，保持待核
- rocky｜compositional（主干复核后）：rock + -y（15 世纪晚期；更早有借法语 roche 的 rochi，约 1300 年）；「不稳」义（1737 年）出自动词 rock；构件自明，本词不单独立档，保持待核
- rose｜form_of_rise（主干复核后）：本条词库义项为 rise 的过去式，属 rise 本词的形变记录（古英语 rās），词源叙事在 rise 条；同形异词 rose「玫瑰」为另一词（拉丁语 rosa ← 希腊语 rhódon ← 伊朗语 *vrda-「花」），不在本条处理范围，待核保持
- ruler｜compositional（主干复核后）：rule + -er 施事名词，两义（统治者 14 世纪晚期；划线工具约 1400 年）均为基词 rule 两义的常规派生，来源记载一致；词源内容在 rule 词条，本词不单独立档
- rung｜evidence_gap（主干复核后）：词库义为 ring 的过去分词；现有缓存来源只成段记载名词 rung「梯档」（古英语 hrung「横杆」，与动词形同形异词），ring 动词过去分词 rung 的形史未见成段记载，不凭通例补档，保持待核
- runner｜compositional（主干复核后）：run + -er 行为人名词（约 1300 年「步行信使」义、14 世纪早期「赛跑者」义），构件自明，本词不单独立档，保持待核
- runner-up｜compositional（主干复核后）：构词透明（run + -er + up（短语名词）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- sadly｜compositional（主干复核后）：sad + -ly 派生透明：中古英语 sadly 约1300年已成词，古义「沉重地、坚实地」随 sad 本身的义变而变，Etymonline 与 Wiktionary 一致；派生词随基词处理，不单独立档
- sadness｜compositional（主干复核后）：构词透明（sad + -ness），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- safely｜compositional（主干复核后）：构词透明（safe + -ly），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- salty｜compositional（主干复核后）：salt + -y 派生，15 世纪中期始见（Etymonline、Wiktionary 一致）；构词透明，其俚语义（粗俗、生气）为用法层引申，不单独立档
- sandstorm｜compositional（主干复核后）：构词透明（sand + storm），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- schoolbag｜compositional（主干复核后）：构词透明（school + bag），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- schoolwork｜compositional（主干复核后）：构词透明（school + work），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- schoolyard｜compositional（主干复核后）：构词透明（school + yard），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- seafood｜compositional（主干复核后）：sea + food 构词透明：1836年美国英语，Etymonline 与 Wiktionary 一致；部件义完全说明词义，不单独立档
- seaside｜compositional（主干复核后）：sea + side 透明复合（约 1200)，现代词义由构词直接可读、无历史漂移；词源叙事归形态层，待核保持
- semicircle｜compositional（主干复核后）：构词透明（semi- + circle，1520 年代，或直接出自拉丁语 semicirculus），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- semifinal｜compositional（主干复核后）：构词透明（semi- + final），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- seventeen｜compositional（主干复核后）：seven + -teen 复合数词（古英语 seofontīene 一线），构件自明，本词不单独立档，保持待核
- seventh｜compositional（主干复核后）：seven + -th 序数词（古英语 seofoþa 一线），构件自明，本词不单独立档，保持待核
- shark｜origin_unknown（主干复核后）：牛津明标来源未定；诸说并存——德语 Schurke「恶棍」说（谓人名义先行、后转指鱼）、玛雅语 xoc 旧说、拉丁语 carcharias 说（缺古法语中间形式）——无一获双源互证，保持待核
- she｜trunk_divergent（主干复核后）：祖先词形两说未决——OED/牛津主古英语阴性人称代词 hēo 的语音演变说（/hjoː/ → /ʃ/，Lass、Fulk）；Etymonline 主阴性指示代词 seo/sio 替代说（hēo 与 he 混同后指示词顶替，如荷兰语 zij、德语 sie 之例）。两家在最近祖先一处主干分歧，保持待核
- shopkeeper｜compositional（主干复核后）：shop + keeper 复合，1520 年代始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- shorten｜compositional（主干复核后）：现代形 short + -en 完全透明，词义即「使变短」无历史漂移记录（中古英语 shortenen 出 short 一线、古英语 sceortian 另有传承，皆在形态层）；词源叙事归形态层，待核保持
- shout｜origin_unknown（主干复核后）：c. 1300 shouten「大声呼喊」，Etymonline「a word of unknown origin」，两候选（shoot 词根「掷声而出」说、古诺尔斯语 skúta「嘲讽」说）皆为 perhaps 级，无主干可对，保持待核
- shown｜single_source（主干复核后）：show 的过去分词（中古英语 schewen 的分词异形）仅 Wiktionary 一源成录，余两源无载；未达双源门，保持待核
- shyly｜compositional（主干复核后）：Etymonline 明作1701年 shy（形容词）+ -ly 构成「以害羞的样子」；Wiktionary 只有 shy + -ly 的词缀模板，无独立来源链；牛津缓存为空。两源都只作构词处理，部件义相加即全词义，词源故事在 shy 本词，本科保持待核、只作构词处理。
- sidewalk｜compositional（主干复核后）：side + walk 构词透明：1721年见载，Etymonline 与 Wiktionary 一致；英式 pavement 只是地域异名，不构成词源分歧，部件义自明，不单独立档
- singer｜compositional（主干复核后）：sing + -er 行为人名词（约 1300 年），顶替古英语 sangere；构件自明，本词不单独立档，保持待核
- sixteen｜compositional（主干复核后）：six + -teen 的数词构式，古英语 sixtīene 以来构词透明、词义无漂移，现代词仍是「六加十」的活构式（与全数词同一口径）；词源叙事归形态层，待核保持
- sixty｜compositional（主干复核后）：six + -ty 的数词构式，古英语 sixtiġ 以来构词透明、词义无漂移（与全数词同一口径）；词源叙事归形态层，待核保持
- sleepy｜compositional（主干复核后）：构词透明（sleep + -y，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- smell｜origin_unconfirmed（主干复核后）：Wiktionary 构拟原始西日耳曼语 *smallijan「闷燃」← 印欧语 *smel-「燃烧、冒烟」一线；牛津明标 of unknown origin，Etymonline 引 OED 谓「无疑出自古英语但未见记载、同源语无对应」；主干未获互证，保持待核
- smog｜compositional（主干复核后）：smoke + fog 混成（blend），1905 年伦敦始见，三源一致（牛津：blend of smoke and fog）；两部件拼合即尽释词义与所指，理据在构词区，不单独立档
- snowball｜compositional（主干复核后）：snow + ball 现代透明复合（约 1400)，词义即「雪做的球」无历史漂移（德语 Schneeball 等为平行同构）；词源叙事归形态层，待核保持
- snowflake｜compositional（主干复核后）：Etymonline 明作1734年 snow + flake 构成「小而轻的雪片」，1899年起有脆弱的比喻用法；Wiktionary 只作 snow + flake 复合（另列德语等同源复合词）；牛津缓存为空。两源都只作构词处理，部件义相加即全词义，保持待核、只作构词处理。
- snowman｜compositional（主干复核后）：snow + man 构词透明：1827年见载，Etymonline 与 Wiktionary 一致；部件义完全说明词义，不单独立档
- snowy｜compositional（主干复核后）：构词透明（snow + -y，古英语 snāwiġ 已成词，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- somebody｜compositional（主干复核后）：Etymonline 明作约1300年起先是两个词、16世纪起连成一词，some + body 构成「不知名的某个人」，1560年代另有「重要人物」义；Wiktionary 作中古英语 sum body、等同 some + body 复合；牛津缓存为空。两源主干都是透明复合，词义由部件直接相加，保持待核、只作构词处理。
- someone｜compositional（主干复核后）：some + one 构词透明：中古英语 sum on 本为两词，1848年合写为一词，Etymonline 与 Wiktionary 一致；部件义完全说明词义，不单独立档
- sometimes｜compositional（主干复核后）：构词透明（some + times），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- somewhere｜compositional（主干复核后）：some + where 复合，12 世纪晚期始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- spacecraft｜compositional（主干复核后）：Etymonline 明作1928年 space + craft 构成「能在太空航行的器具」；Wiktionary 只有 space + -craft（交通工具义）的词缀模板，无独立来源链；牛津缓存为空。两源都只作构词处理，部件义相加即全词义，保持待核、只作构词处理。
- spaceman｜compositional（主干复核后）：space + man 构词透明：1942年「太空人」义，Etymonline 与 Wiktionary 一致；1892年「按篇幅计酬的记者」是同形旧义，与词库义无关，现代义由部件直接给出，不单独立档
- spaceship｜compositional（主干复核后）：space + ship 复合，1894 年始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- sparrowgrass｜evidence_gap（主干复核后）：缓存来源仅 Wiktionary 给出 sparrow + grass 的字面构词分析，Etymonline、牛津无词条；本词与 asparagus 的历史关系未见缓存来源记载，不凭记忆补档，保持待核
- spiv｜origin_unknown（主干复核后）：三源同归未定——牛津「perhaps related to spiffy」，Etymonline 引 Ayto 谓或与 spiff 相连，Wiktionary 标 unknown 并存罗姆语 spiv「麻雀」说；无可互证主干，保持待核
- starfish｜compositional（主干复核后）：star + fish 透明描形复合（1530 年代 starrefyshe)，因五臂星形得名，构词理据现代仍透明；词源叙事归形态层，待核保持
- starlight｜compositional（主干复核后）：Etymonline 明作14世纪晚期 star + light 构成「星星发出的光；星星发亮的时候」；Wiktionary 只作 star + light 复合；牛津缓存为空。两源都只作构词处理，部件义相加即全词义，保持待核、只作构词处理。
- stomachache｜compositional（主干复核后）：构词透明（stomach + ache），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- stormy｜compositional（主干复核后）：storm + -y 形容词（古英语晚期 *stormiġ；14 世纪中期已生比喻义「动荡的」），构件自明，本词不单独立档，保持待核
- storybook｜compositional（主干复核后）：构词透明（story + book），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- strawberry｜motivation_unsettled（主干复核后）：straw + berry 复合（古英语 strēawberġe）构件无疑，但 straw 的命名理据未定——果实结于草茎状匍匐茎说、采果穿草茎成串说（2024 年专文并列）、果面籽粒如草屑说并存，无定论，保持待核
- streamable｜compositional（主干复核后）：构词透明（stream + -able，流媒体时代新构），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- stronger｜compositional（主干复核后）：构词透明（strong 的比较级（常规屈折）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- stuff｜trunk_divergent（主干复核后）：至古法语 estoffe 一致；其来历三家分歧——Wiktionary（引 OED 原典条目）作古高地德语 stoffōn ← 日耳曼语 *stoppōn「填塞」（stop 线），但 Etymonline 转述 OED 对此「有强烈异议」（open to strong objections）、自评 obscure；牛津则作希腊语 stuphein「拉紧」。祖先语言在主干上分歧，保持待核
- submarine｜compositional（主干复核后）：sub- + marine 构词透明：1640年代形容词「海面之下的」，名词「潜艇」（1899年）是 submarine boat 的截短，Etymonline 与 Wiktionary 一致；前缀加基词义自明，不单独立档
- subway｜compositional（主干复核后）：sub- + way 复合，1825 年本义「地下通道」，「地铁」义 1892 年（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- suddenly｜compositional（主干复核后）：构词透明（sudden + -ly，13 世纪晚期成词），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- sunburn｜compositional（主干复核后）：构词透明（sun + burn），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- sunflower｜compositional（主干复核后）：Wiktionary 只作 sun + flower 复合，牛津缓存为空；只有 Etymonline 一家给出超出构词的历史——1560年代先指「向阳花、逐日的花」，1590年代起转指北美引入的 Helianthus 并因花盘样子得名。这段转指史单源独载、无第二独立来源互证，按主干标准不升核；全词仍以 sun + flower 透明复合为主，保持待核、只作构词处理。
- sung｜form_of_sing（主干复核后）：sung 是 sing 的过去分词——中古英语 songen ← 古英语 sungen ← 原生日耳曼语 *sunganaz，Wiktionary 链完整；sing 本词已立档（verified），分词形随基词处理，不单独建档
- sunlight｜compositional（主干复核后）：构词透明（sun + light，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- sunny｜compositional（主干复核后）：构词透明（sun + -y，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- sunrise｜compositional（主干复核后）：构词透明（sun + rise，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- sunset｜compositional（主干复核后）：sun + set 透明复合（14 世纪末），现代词义由构词直接可读、无历史漂移（古英语另有 sunnansetlgong 同义旧构）；词源叙事归形态层，待核保持
- sunshine｜compositional（主干复核后）：构词透明（sun + shine，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- supermarket｜compositional（主干复核后）：super- + market 复合，1933 年美式英语（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- superstar｜compositional（主干复核后）：Etymonline 明作 super- + star 构成，1919年娱乐义（指杂耍明星）、1920年用于体育，同期天文学家偶指特大恒星但罕见；Wiktionary 只有 super- + star 的词缀模板；牛津缓存为空。Wiktionary 只作构词处理、年代与用法全靠 Etymonline 一家，保持待核、只作构词处理（部件为 super-「超级」+ star「明星」）。
- swimmer｜compositional（主干复核后）：构词透明（swim + -er），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- t-shirt｜compositional（主干复核后）：T + shirt 构词透明：1920年以平摊时呈字母 T 形得名（Etymonline），Wiktionary 仅转引 Etymonline、牛津缓存本词无词源栏；命名理据就是部件的形状本身，词义由部件直接给出，按构词处理，不单独立档
- tablecloth｜compositional（主干复核后）：table + cloth 复合，15 世纪中期始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- taken｜form_of_take（主干复核后）：词库义本身即「take 的过去分词」。Etymonline 只一句「take 的过去分词」，不单独立链；Wiktionary 虽给出中古英语 taken ← 古英语 tacen ← 古诺斯语 tekinn ← 原始日耳曼语 *tēkanaz 的完整链，并明注形态上就是 take + -n（过去分词），那是 take 本词的历史，不是 taken 独立的词义史。按形变处理，词源看 take 词条，保持待核。
- tape｜origin_unknown（主干复核后）：古英语 tæppa「窄布条」，来源未明——Etymonline 作 uncertain（Klein 拟出拉丁语 tapete 的回构说），《中古英语大词典》另比弗里西亚语/低地德语「扯、撕」一系，牛津作 perhaps related，两路皆带保留、无互证主干，保持待核
- tasty｜compositional（主干复核后）：构词透明（taste + -y），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- teacher｜compositional（主干复核后）：teach + -er 行为人名词（14 世纪中期；早期另有「食指」别义），构件自明，本词不单独立档，保持待核
- teamwork｜compositional（主干复核后）：构词透明（team + work），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- textbook｜compositional（主干复核后）：text + book 构词透明：1779年「学生课本」义，1730年旧义「行间留空供笔记的书」为同词旧用，Etymonline 与 Wiktionary 一致；现代义由部件直接给出，不单独立档
- theirs｜compositional（主干复核后）：their + 所有格 -s 类推构成，14 世纪初始见（Etymonline、Wiktionary、牛津一致）；构词/类推机制在构词区可尽释，不单独立档
- thinner｜form_of_thin（主干复核后）：词库义是「thin 的比较级（双写 n 加 -er）」，属 thin 的屈折比较级。Wiktionary 分两条：Etymology 1 即比较级 thin + -er（more），Etymology 2 才是名词「稀释剂」thin + -er（施事）；Etymonline 收的只有名词义（1832年指间苗机具、1904年指油漆稀释液），与词库的比较级义不是同一个义项、不能拿来互证词库义。本词按 thin 的形变处理，保持待核。
- thirsty｜compositional（主干复核后）：构词透明（thirst + -y，古英语 þurstiġ 已成词，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- thirteen｜compositional（主干复核后）：three + -teen 复合数词（古英语 þrēotīene 一线），构件自明，本词不单独立档，保持待核
- thrown｜form_of_throw（主干复核后）：thrown 是 throw 的过去分词——中古英语 throwen ← 古英语 þrāwen / ġeþrāwen ← 原生日耳曼语 *þrēanaz，Wiktionary 链完整、Etymonline 仅注其为 throw 的过去分词；throw 本词已立档（verified），分词形随基词处理，不单独建档
- timetable｜compositional（主干复核后）：构词透明（time + table），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- tip｜origin_unknown（主干复核后）：中古英语 tip「尖端」of obscure and uncertain origin（Wiktionary)；动词 tip「倾倒」（约 1300 tippen）a word of uncertain origin，或出斯堪的纳维亚语；诸义（尖端、轻触、小费、提示）的相互关系亦多属 perhaps。无互证主干，保持待核
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
- twentieth｜compositional（主干复核后）：twenty 的序数形（古英语 twēntigoþa 一线），构件自明，本词不单独立档，保持待核
- unbelievable｜compositional（主干复核后）：Etymonline 明作1540年代 un-（不）+ believable 构成「不能相信的、难以置信的」；Wiktionary 作 un-（否定）+ believable 并引 OED；牛津缓存为空。两源都只作构词处理，部件义相加即全词义，保持待核、只作构词处理。
- uncertain｜compositional（主干复核后）：un- + certain 派生透明：14世纪早期见载，Etymonline 与 Wiktionary 一致；否定前缀加基词，派生词随基词处理，不单独立档
- unconscious｜compositional（主干复核后）：un- + conscious 派生，1712 年始见（Etymonline、Wiktionary 一致）；构词透明（心理学名词义为德语 das Unbewusste 的仿译，随基词登记），不单独立档
- underwater｜compositional（主干复核后）：构词透明（under + water），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- underwear｜compositional（主干复核后）：Etymonline 明作1872年 under + wear（名词）构成，因穿在衣服里面得名，并注1891年《世纪词典》称其为行业用语；Wiktionary 作 under + wear 的复合构词（另列荷兰语、德语等对应复合词）；牛津缓存为空。两源都只作构词处理，部件义相加即全词义，保持待核、只作构词处理。
- unfriend｜compositional（主干复核后）：un- + friend 构词透明：名词「敌人」13世纪晚期已见（中古英语 unfreend），动词「删好友」义2007年见载，两次都是 un- 与 friend 的现成组合，Etymonline 与 Wiktionary 一致；部件义完全说明词义，不单独立档
- unhappy｜compositional（主干复核后）：un- + happy 派生，约 1300 年始见，本义「招祸的」（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- unhealthy｜compositional（主干复核后）：构词透明（un- + healthy），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- unlock｜compositional（主干复核后）：现代形 un-（反向）+ lock 完全透明，词义即「开锁」无历史漂移记录（古英语已有 onlūcan/unlucan 同构词，属形态层构词）；词源叙事归形态层，待核保持
- unlucky｜compositional（主干复核后）：构词透明（un- + lucky），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- unpopular｜compositional（主干复核后）：Etymonline 明作1640年代 un-（不）+ popular 构成「不受公众欢迎的」；Wiktionary 只有 un-（否定）+ popular 的词缀模板；牛津缓存为空。两源都只作构词处理，部件义相加即全词义，保持待核、只作构词处理。
- unstable｜compositional（主干复核后）：un- + stable（约 1200）透明构词，诸义（易动、善变、易倒、结构不稳）皆构词直读、无漂移；词源叙事归形态层，待核保持
- unsubscribe｜compositional（主干复核后）：构词透明（un- + subscribe（数字时代新构）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- untidy｜compositional（主干复核后）：un- + tidy 派生透明：13世纪早期本义「不合时宜的」（今废），14世纪中叶转「不整洁的」，Etymonline 与 Wiktionary 一致；义变随 tidy 一线，派生词随基词处理，不单独立档
- unusual｜compositional（主干复核后）：构词透明（un- + usual），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- uphold｜compositional（主干复核后）：up + hold（约 1200）透明构词，现代义由构词直接可读；词源叙事归形态层，待核保持
- upstairs｜compositional（主干复核后）：up + stairs（短语粘合），1590 年代始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- useful｜compositional（主干复核后）：Etymonline 明作1590年代 use（名词）+ -ful 构成「有好处的、能派上用场的」；Wiktionary 作 use + -ful 后缀构词；牛津缓存为空。两源都只作构词处理，部件义相加即全词义，保持待核、只作构词处理。
- useless｜compositional（主干复核后）：构词透明（use + -less），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- usually｜compositional（主干复核后）：构词透明（usual + -ly），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- utterly｜compositional（主干复核后）：utter + -ly 派生透明：14世纪晚期「完全地」，Etymonline 与 Wiktionary 一致；同词早期另有出 utter 动词的「直言地」一线，不属本义主干，派生词随基词处理，不单独立档
- valuable｜compositional（主干复核后）：value + -able 派生，1580 年代始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- villager｜compositional（主干复核后）：Etymonline 明作1560年代 village + -er 构成「住在村子里的人」，并叫读者看 village 词条；Wiktionary 作 village + -er（居民义）的词缀模板；牛津缓存为空。两源都只作构词处理，部件义相加即全词义，词源故事在 village 本词，保持待核、只作构词处理。
- volleyball｜compositional（主干复核后）：构词透明（volley + ball），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- warmly｜compositional（主干复核后）：warm + -ly 派生透明：1520年代指感情「热切地」、1590年代指温度「暖和地」，Etymonline 与 Wiktionary 一致；派生词随基词处理，不单独立档
- washroom｜compositional（主干复核后）：构词透明（wash + room），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- watermelon｜compositional（主干复核后）：构词透明（water + melon，义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- weakness｜compositional（主干复核后）：weak + -ness 派生，约 1300 年始见（Etymonline、Wiktionary 一致）；构词透明，不单独立档
- weekday｜compositional（主干复核后）：week + day 复合，古英语 wicdæġ 已成词、义即「一周之日（尤非周日）」，构件自明；词源归 week、day 两词条，保持待核
- weekend｜compositional（主干复核后）：Etymonline 明作1630年代 week + end 构成，原为北方词、指周六中午到周一早晨，1878年后通行、19世纪末含整个周六；Wiktionary 只作 week + end 复合，其「英格兰北部地区词」的说明明确引的正是 Etymonline，并非独立第二源；牛津缓存为空。超出构词的通行史实为单源（含转引），按主干标准不升核，保持待核、只作构词处理。
- weta｜single_source（主干复核后）：毛利语 wētā 借入仅 Wiktionary 一源成录，Etymonline、牛津无词条；未达双源门，保持待核
- wheelchair｜compositional（主干复核后）：构词透明（wheel + chair），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- whiz｜sources_split（主干复核后）：动词「嗖地飞过」的拟声说仅 Wiktionary 成录；名词「行家里手」（1914）Etymonline 作 whizz 引申与 wizard 截短两说并存；两义项均未达双源一致，保持待核
- widely｜compositional（主干复核后）：wide + -ly 透明派生（1660 年代），现代词义由构词直接可读；词源叙事归形态层，待核保持
- widen｜compositional（主干复核后）：wide + -en（动词后缀）派生透明：约1600年及物「使变宽」、1709年不及物「变宽」，Etymonline 与 Wiktionary 一致；派生词随基词处理，不单独立档
- windy｜compositional（主干复核后）：构词透明（wind + -y，古英语 windiġ 已成词，主干义无漂移），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- winner｜compositional（主干复核后）：win + -er 行为人名词（14 世纪晚期）；构件自明，本词不单独立档，保持待核
- witch｜trunk_divergent（主干复核后）：古英语 wicce/wicca/wiccian 一族本身确凿；深层主干三说分歧——Watkins 作日耳曼语 *wikkjaz「唤亡者」出印欧 *weg-「强壮、活跃」；Kroonen/Wiktionary 作 *wikkōną 出 *weyk-「奉献、分离」（与 victima 同根）；Klein/Weekley 另联 wigle「占卜」、wih「神像」、哥特语 weihs「神圣」。OED 作来源未定，Liberman 谓诸说皆有音义之难，无两家互证主干，保持待核
- won｜form_of_win（主干复核后）：win 的过去式/过去分词（Etymonline 明示；Wiktionary 同注 past participle of win）；屈折形式随基词 win 处理，不单独立档。同形异词登记：won 另有古词「居住」（wunian 一系）与货币单位 won（韩元/原），与词库义无关
- wooden｜compositional（主干复核后）：Etymonline 明作1530年代 wood + -en 构成「木头做的」，1560年代起有「僵硬、笨拙」的比喻义；Wiktionary 作 wood + -en（材料义）后缀构词，并注它逐步取代了旧词 treen；牛津缓存为空。Wiktionary 只作构词处理，比喻义年代靠 Etymonline 一家，全词以 wood + -en 透明派生为主，保持待核、只作构词处理。
- woodpecker｜compositional（主干复核后）：wood + pecker 构词透明：1520年代见载，中古英语另有 wod spek、wodehake 等旧名，Etymonline 与 Wiktionary 一致；现代名由部件直接给出，不单独立档
- woody｜compositional（主干复核后）：wood + -y 透明派生（14 世纪末 wodi)，现代词义由构词直接可读；词源叙事归形态层，待核保持
- worker｜compositional（主干复核后）：work + -er 行为人名词（14 世纪中期），曾顶替旧词 wright；构件自明，本词不单独立档，保持待核
- workplace｜compositional（主干复核后）：构词透明（work + place），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- wrap｜origin_unknown（主干复核后）：中古英语 wrappen「裹、折」，牛津明言 of unknown origin，Etymonline 作 a word of uncertain origin（Watkins 拟或经斯堪的纳维亚语出印欧 *werp-「转、绕」，或为 lap 的变体）；两拟皆带保留，无互证主干，保持待核
- written｜evidence_gap（主干复核后）：write 的过去分词仅见 Wiktionary 构词分析（write + -en），三源均无成段形史记载；且 write 本词谱系未在本轮处理范围，保持待核
- yours｜compositional（主干复核后）：your + -s 类推构成（仿 his、ours），约 1300 年始见（Etymonline、Wiktionary 一致）；构词/类推机制可尽释，不单独立档
- yourself｜compositional（主干复核后）：Etymonline 明作14世纪早期 your + self 构成、是第二人称代词 you 的强调/反身形式，1520年代见复数 yourselves；Wiktionary 作中古英语 yourself、等同 your + -self；牛津缓存为空。两源都只作构词处理，部件义相加即全词义，保持待核、只作构词处理。
- yourselves｜compositional（主干复核后）：构词透明（your + selves（反身构成）），来源构词分析一致；其词源内容在基词与构词层，本词不单独立档
- yummy｜compositional（主干复核后）：yum + -y 派生透明：1899年婴儿语，yum-yum 感叹词1878年已见载，牛津作 yum-yum + -y，Etymonline 与 Wiktionary 一致；拟声基词加形容词后缀，派生透明，不单独立档
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

## 十一、C 档收尾轮记录（2026-11-02）

- 缘起与范围：第十节修复轮次留下的 C 档 243 条（chain_unparsable 105 / morph_only 98 / chain_mismatch 38 / chain_too_short 2）本轮按同一主干一致口径与修复标准（repair/STANDARDS.md）全数处理：三批并行逐词回缓存原文判读，主会话独立复验（覆盖、schema、原义=路径首站、禁用套话、抽查回源）后合并。
- 结果：升 verified 57 条；保持待核并按新口径改写 reason 186 条（compositional 154 / form_of_* 14 / origin_unknown 8 / origin_unconfirmed 7 / trunk_unsettled 2 / motivation_unsettled 1（grapefruit））。待核池自此无未处理余量，464 条全部为新口径判定。
- 主会话裁定升核 China（词库专名「中国」）：主干梵语 Cīna → 葡萄牙/西班牙 China → 英语（1550 年代）三源一致；Cīna 再上游的秦（主流）/晋/荆/夜郎四说登记 disputes，不入正链断言；小写 china「瓷器」为 China-ware 截短支线，登记于 modern_meanings_link。
- 地名链头修正（hamburger 先例）：sandwich、champagne、derby、badminton 四词的 semantic_path 起点由地名 gloss 改为英语词本身的首义（原义依次为「三明治（两片面包夹冷肉）」「香槟地区出产的葡萄酒」「德比赛马」「羽毛球（运动）」），地名与人名史保留在 source_chain、mechanism_sentence 与 story_hooks 中。
- 屈折形口径：past、drunk 按 eaten、broken 先例升核（来源链完整且已词汇化）；given、taken、chosen 等按 been 先例保持 form_of_*。截短/缩略词 flu、math、photo、tv、email、bike、cello 等按 phone、fridge 先例升核；laser 为 1960 年真缩略（仿 maser），与民间假缩略说在 folk_etymology_check 中分开登记。
- 民间词源：soccer 的「穿厚袜子得名」说（1905 年美国报纸）、quiz 的达利赌约造词说、baseball 的 Doubleday 发明说均只作被否定对象登记，未入正链；本轮 VETO 维持 0 放行。
- 收尾后总账：verified 1,814 / 待核 464 / 未收 195；JSON 总记录 2,278。覆盖（词库 2,473）：全体 73.4%；高频前 100 词 82%；前 500 词 71.6%（358/500）；Dolch 175/202（86.6%）。
- 全量复验：verified 全部 ≥2 来源、story_hooks ≥2；original_meaning 与 semantic_path 首站 100% 一致；禁用套话全库 0 命中；非首站 how 共 2,092 条、互异 2,087 条（余 5 条为同词多步的合法同述）。

## 十二、清单二 A 节定点修正记录（2026-11-02，复检 6 词）

- school：删原始西日耳曼语 *skōlu 站（牛津 via Latin、Etymonline 均作拉丁语借入，仅 Wiktionary 拟构，已登记 disputes）；拉丁 schola、古英语 scōl、中古英语 scole 三站补 gloss（scōl 作「学校（教学机构）」，从 Etymonline "institution for instruction"）；「场所」义站 period 收正为拉丁语时期；first_attested 由「约 15 世纪」改为古英语已见载（原 15 世纪系误读牛津 sense 9「群」义的 late Middle English）；modern_meanings_link 与 story_hooks 原引旧原义「握住，有，占有」，已按现行原义「空闲时间，闲暇」重写。
- voyage：原义「旅途的给养，盘缠」系误修——传入法语的是 viaticum 在晚期拉丁语里已转成的「旅程」义（牛津、Etymonline 均注明 in late Latin "journey"）。链首改晚期拉丁语 viaticum「旅程」，原义与路径首站同步改「旅程」，盘缠义移 disputes 登记；机制句、link、hooks 随之重写。
- ton：链原只有古法语 tonne 一站，与三源「ton 即 tun 本词」矛盾。补抓 Wiktionary tun 词条后重建链：拉丁 tunna → 原始西日耳曼语 *tunnā → 古英语 tunne → 中古英语 tunne/tonne → ton；古法语 tonne 改登记为拼写影响（非来源）；first_attested、link、hooks 同步改正（旧 hooks 误称「直接来自古法语」「原义是吨」）。
- half：链内古英语 healf 站 gloss 由「一半」改「一侧；一部分」，与顶层原义对齐（牛津：日耳曼基义为 'side'）；原始西日耳曼语、中古英语两站补 gloss；link 与 hooks 原引旧义「一半」已重写。
- import：链内中古英语 importen 站 gloss 由「进口」改「意味着；表示」（Etymonline：early 15c. importen "signify"；货物义 1540 年代才见载）。
- plane：纪年定点核对——plane「飞机」1908 年（Etymonline n.2）与牛津「20 世纪初缩略形」一致，可销；错在 aeroplane 站误系 1907 年（那是 airplane 的年份），aeroplane 本词 1873 年已见载（Etymonline airplane 词条），链 gloss、路径首站 period、机制句已改正，核对结论记入 disputes。
- 附带发现（未修，待立项）：modern_meanings_link 内嵌「最早的意思「…」」引文与现行 original_meaning 字面不一致者 419 条，多数为同义改写；按字面重合度粗筛约 171 条需逐条判定，已抽见 access、ancient、arm、april、black 等确属实质陈旧（引别义/词根义/未定假说）。与本节同属「顶层已改、旁字段未跟上」一类，建议单独一轮逐条回源修正。
## 十三、清单二 B/C 节定点修复记录（2026-11-02，复检 5 词）

本节由主会话按用户授权直接修复（词源线本轮例外授权），依据复检报告（etym_recheck）清单二 B/C 节与分批明细 recheck_r1、recheck_r3，逐条记改前/改后/依据。除本节 5 条外，其余 2,273 条记录经脚本深比对断言未动。计数变化：verified 1,814 → 1,816、待核 464 → 462（sadly、spaceship 本轮升格）。

- palm（B，链身拆正）：改前 source_chain 为 Latin palma → Old English palm → Middle English palme——古英语站属「棕榈树」义线，与本条 first_attested（c. 1300）、original_meaning（手掌）所属的「手掌」义线被拼成一条。改后手掌线改走 Latin palma → Old French paume, palme → Middle English paume, palme；树义线（经古英语 palma 入英）移入 semantic_path 注文与 disputes 说明，两线同源不同路；story_hooks、modern_meanings_link 内引旧链处同步改正。依据：Etymonline palm n.1（c. 1300, paume, from Old French paume, palme）× n.2（树义 from Old English palma）× Wiktionary 分列两条，本轮已直读 Etymonline 原文。
- paragraph（B，时代订正）：链内 paragraphus 站 lang 由 Latin 改 Medieval Latin、period 由「古典拉丁时期」改「中世纪拉丁语时期」；story_hooks 路线串同步。依据：Etymonline「from Medieval Latin paragraphus "sign indicating the start of a new section of a discourse"」，Wiktionary、牛津系同，本轮已直读 Etymonline 原文。
- lake（C，补注分歧）：记录判定不改，disputes 由「无已知争议」改为三则注记——①首现年代两源口径不一（Etymonline early 12c. 经古法语入英 vs 牛津 late Old English），现值取 Etymonline 口径并注明该字段实为单源口径；②链条合流与最深层构拟分歧（Wiktionary：本土支 OE lacu ← 原始日耳曼语 *lakō ← 印欧语 *leg-，明言与拉丁 lacus 无关，拉丁支另拟 *lókus, *l̥kwés；Etymonline 则统拟 *laku- 并注两支可能合并）；③同形异源的颜料义 lake（1610 年代，经法语 laque 源出 lac 虫胶）不在本链内。依据：Etymonline lake n.1 / n.2 × Wiktionary lake Etymology 1，本轮均已直读原文。
- sadly（C，升格）：待核 → verified。原待核理由（sad + -ly 派生透明、不单独立档）经复检判不实：OED 明言 formed within English、最早证据 before 1375（William of Palerne）；Etymonline 作 c. 1300, "heavily," also "solidly," from sad + -ly，且 "sorrowfully" 义 mid-14c. 才起；Wiktionary 作 From Middle English sadly——三源主干一致且带年代。按 verified 完整规格立档：original_meaning 作「沉重地；坚实地」（非「悲伤地」），语义路径补「悲伤地（14 世纪中期起）→ 令人遗憾的是（句首评论用法）」，升格依据记入该条 disputes。
- spaceship（C，年代裁定后升格）：待核 → verified。构词 space + ship 三源（Etymonline × Merriam-Webster × Dictionary.com）一致、无争议；首现年代三说按引例裁定，全文记入该条 disputes：采 1880 说为首现——连字符形 space-ship 见于 1880 年 1 月 20 日《Pall Mall Gazette》第 4652 期评论 Percy Greg《Across the Zodiac》的文章（"…build a space-ship"，该词不见于小说本身），Merriam-Webster 首见年同作 1880，科幻词源引例一线（Prucher《Brave New Words》/ OED 科幻引例项目）同此引例；1894 说（Etymonline 引 Astor《A Journey in Other Worlds》）系小说内用作飞船名的著名早期用例，长期被误作造词点，不采为首现；1940–45 说（Dictionary.com / Random House、Collins）与同页自述「源出 19、20 世纪科幻」相左，应系该词进入通用词典引文库的年代，不采为首现。
