# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['corn'] = {
 'chain': [('Proto-Indo-European', '*ǵerh₂-', '成熟；变老', '原始印欧语时期'),
           ('Proto-Germanic', '*kurną', '谷粒', '原始日耳曼语时期'),
           ('Old English', 'corn', '谷粒；谷物', '古英语时期'),
           ('Middle English', 'corn', '谷物', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE corn，义为「谷类植物的单粒种子；谷物总称」）',
 'orig': '谷粒',
 'path': [('谷粒', '原始日耳曼语时期', ''),
          ('玉米', '现代', '词根是「成熟、磨老」（与 grain 同源双式）：corn 本指「当地的主粮」——英格兰指小麦、苏格兰与爱尔兰指燕麦、德国 Korn 指黑麦；到了美洲，Indian corn 省作 corn，专指玉米（由通名到专名）')],
 'mech': 'corn 是「一地的饭碗」：哪里长什么主粮，它就指什么。',
 'link': '今天（美式）的意思「玉米」是 18 世纪北美省称 Indian corn 的结果。',
 'disp': '同形异词 corn「鸡眼」（足部）出古法语 corne ← 拉丁语 cornu「角」，与本词无关，登记在案。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['dad'] = {
 'chain': [('Nursery speech', 'da da', '（幼儿呼父之声）', '幼儿语时期'),
           ('English', 'dadde', '爸爸', '约 1500 年')],
 'fa': '约 1500 年见载（Etymonline：c. 1500，但必远早于此）',
 'orig': '幼儿的「da, da」（称父亲）',
 'path': [('幼儿的「da, da」（称父亲）', '幼儿语时期', ''),
          ('爸爸', '现代', '幼儿语词：孩子最早发的音节之一——威尔士语 tad、梵语 tatah、拉丁语 tata 各家不约而同（它们多半不是同源，而是各家孩子都这么叫）（幼儿拟音）')],
 'mech': 'dad 没有「祖先词」：它是每个孩子自己「发明」的。',
 'link': '今天的意思「爸爸」就是本义。',
 'disp': '与凯尔特语 *tad 的关系作可能（possibly）登记；诸说同归于幼儿拟音这一大类。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['cousin'] = {
 'chain': [('Latin', 'soror', '姐妹', '拉丁语时期'),
           ('Latin', 'consobrīnus', '姨表兄弟', '拉丁语时期'),
           ('Old French', 'cosin', '侄；亲属；堂表亲', '古法语时期'),
           ('Middle English', 'cosin', '堂（表）亲', '中古英语时期')],
 'fa': '13 世纪初进入英语（Etymonline：early 13c.，义为「比兄弟姐妹更远的旁系血亲」）',
 'orig': '姨表兄弟（母亲姐姐之子）',
 'path': [('姨表兄弟（母亲姐姐之子）', '拉丁语时期', ''),
          ('堂（表）兄弟姐妹', '现代', 'consobrīnus 直译「与（母）姐妹（之子）同（辈）」：拉丁语本只管姨表一支；中古英语用法极宽（孙辈、教子都可称），约 1300 年才收窄为叔伯姑舅的子女（由专称到通称）')],
 'mech': 'cousin 出身很「偏」：它原是姨妈家的孩子，后来管了所有堂表亲。',
 'link': '今天的意思「堂表亲」就是本义的泛化。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['baby'] = {
 'chain': [('Middle English', 'babe', '婴儿（拟幼儿语）', '中古英语时期'),
           ('Middle English', 'babi', '婴儿', '中古英语时期')],
 'fa': '14 世纪末见载（Etymonline：late 14c., babi)',
 'orig': '婴儿（拟幼儿语）',
 'path': [('婴儿（拟幼儿语）', '中古英语时期', ''),
          ('婴儿', '现代', 'babe 的指小形（-y)：babe 本身或出幼儿咿呀之声（与 babble 同类）——孩子的名字，是照着孩子的声音起的（幼儿拟音）')],
 'mech': 'baby 是「把婴儿的咿呀声写成了词」。',
 'link': '今天的意思「婴儿」就是本义（1590 年代起兼指瞳孔里的「小人影」，与 pupil 同喻）。',
 'disp': 'babe 的拟音说作 perhaps/probably（牛津作 probably imitative)，两家同向。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['lock'] = {
 'chain': [('Proto-Germanic', '*luką', '关闭（之具）', '原始日耳曼语时期'),
           ('Old English', 'loc', '闩；围栏', '古英语时期'),
           ('Middle English', 'lok', '锁', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE loc，义为「门闩；关门的器具；屏障、围场」）',
 'orig': '闩；关闭之具',
 'path': [('闩；关闭之具', '原始日耳曼语时期', ''),
          ('锁', '现代', '词根是「关上」：同源的德语 Loch 是「洞」（关出一个口），荷兰语 luik 是「活板门」；约 1300 年起 lock 兼指河渠的「水闸」，1570 年代成船闸系统（由门闩到船闸）')],
 'mech': 'lock 的一家子管的都是「开合口」：锁、洞、闸门同根。',
 'link': '今天的意思「锁」就是本义的定型。',
 'disp': 'OED 谓日耳曼语诸义差异大，或为同根的数个独立构词，登记在案。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['lightning'] = {
 'chain': [('Old English', 'lēoht', '光', '古英语时期'),
           ('Old English', 'lihting', '闪电；黎明', '古英语时期'),
           ('Middle English', 'lightning', '闪电', '中古英语时期')],
 'fa': '古英语晚期见载（Etymonline：late OE，义为「闪电」）',
 'orig': '发亮（之现象）',
 'path': [('发亮（之现象）', '古英语时期', ''),
          ('闪电', '现代', '分化形：lihting 本是 lighten「变亮」的动名词（古时兼指黎明）；后来「闪电」义的拼写丢了 e 成 lightning，与 lightening「变亮（过程）」分家成同源双式（由发亮到闪电）')],
 'mech': 'lightning 与 lightening 是一词分家的双胞胎：一个管闪电，一个管变亮。',
 'link': '今天的意思「闪电」就是本义的定型。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['month'] = {
 'chain': [('Proto-Indo-European', '*meh₁-', '测量', '原始印欧语时期'),
           ('Proto-Indo-European', '*mḗh₁n̥s', '月亮；月份', '原始印欧语时期'),
           ('Proto-Germanic', '*mēnōþs', '月份', '原始日耳曼语时期'),
           ('Old English', 'mōnaþ', '月份', '古英语时期')],
 'fa': '古英语见载（Etymonline：OE monað)',
 'orig': '（一轮）月相周期',
 'path': [('（一轮）月相周期', '原始印欧语时期', ''),
          ('月份', '现代', '与 moon 同根：月亮是古人量时间的尺——「月」本是两次新月之间的间隔（古英语晚期已见此义），词根更深处是「测量」（由月相到月份）')],
 'mech': 'month 是 moon 的「计时版」：一个月，就是月亮圆缺一回。',
 'link': '今天的意思「月份」就是本义的日历化。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['ticket'] = {
 'chain': [('Proto-Indo-European', '*(s)teyg-', '尖；刺', '原始印欧语时期'),
           ('Proto-Germanic', '*stikaną', '刺；粘', '原始日耳曼语时期'),
           ('Frankish', '*stikkjan', '粘贴', '法兰克语时期'),
           ('Old French', 'estiquette', '粘贴的小条', '古法语时期'),
           ('English', 'ticket', '票', '1520 年代')],
 'fa': '1520 年代见载（Etymonline：1520s，义为「短简、单据」，法语 étiquet 的截短）',
 'orig': '粘贴的小条；标签',
 'path': [('粘贴的小条；标签', '古法语时期', ''),
          ('车票；门票', '现代', 'estiquette 字面「粘上去的东西」（告示粘在门墙上）：与 etiquette「礼仪」是同源双式——一个粘成了票，一个粘成了规矩；1670 年代「凭证」义定型（由标签到票证）')],
 'mech': 'ticket 与 etiquette 是同根双式：票是粘的，礼也是「粘」出来的规矩。',
 'link': '今天的意思「票」从「标签、告示条」转来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['west'] = {
 'chain': [('Proto-Indo-European', '*wekʷsperos', '黄昏', '原始印欧语时期'),
           ('Proto-Germanic', '*westrą', '西方', '原始日耳曼语时期'),
           ('Old English', 'west', '西方', '古英语时期'),
           ('Middle English', 'west', '西方', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE west)',
 'orig': '黄昏（日落的方向）',
 'path': [('黄昏（日落的方向）', '原始印欧语时期', ''),
          ('西；西方', '现代', '与拉丁语 vesper、希腊语 hésperos「黄昏」同根：西方是「太阳下班」的方向——德语方言干脆以 abend「黄昏」指西（由黄昏到西方）')],
 'mech': 'west 的底子是「傍晚」：日落在哪边，哪边就是西。',
 'link': '今天的意思「西方」就是本义的方位化（法语 ouest、西班牙语 oeste 反从英语借此词）。',
 'disp': '日耳曼语 *west- 的深层来源 Etymonline 作 of uncertain origin, perhaps 出 *wes-pero-「黄昏」；Wiktionary 与牛津同主黄昏一线，本档从两说之合，保留意见登记在案。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {
 'mushroom': 'trunk_unsettled（主干复核后）：中古经盎格鲁-法语 musherun（古法语 mousseron）入英；深层分歧——OED 谓通常作法语 mousse「苔藓」（出日耳曼语）的派生、Weekley 从之，Klein 谓两者「毫无共同之处」、Barnhart 作 of uncertain origin；晚期拉丁语 mussirio 一形或反借自法语。主干未定，保持待核',
 'girl': 'origin_unknown（主干复核后）：约 1300 年 gyrle「孩子（不分男女）」；Etymonline 明言 of unknown origin；OED 拟未载的古英语 *gyrele 一线被 Liberman 判「音理学上难以接受」，另有 gierela「衣服」说；旧民间说出自拉丁语 garrulus「多嘴的」已被弃置。无互证主干，保持待核',
 'day': 'trunk_divergent（主干复核后）：古英语 dæg「日间；一生」与日耳曼语 *dagaz 本身确凿；印欧层分歧——Watkins 作 *agh-「一天」且谓日耳曼语 d- 来源 obscure，Boutkan 作 *dʰegʷʰ-「燃烧」；两家主干不合，保持待核',
}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
