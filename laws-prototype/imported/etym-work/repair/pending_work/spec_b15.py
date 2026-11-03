# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['bath'] = {
 'chain': [('Proto-Indo-European', '*bʰeh₁-', '使温暖', '原始印欧语时期'),
           ('Proto-Germanic', '*baþą', '浴', '原始日耳曼语时期'),
           ('Old English', 'bæþ', '沐浴', '古英语时期'),
           ('Middle English', 'bath', '洗澡', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE bæð，义为「身体浸入水中；供沐浴的水」）',
 'orig': '加热（以沐浴）',
 'path': [('加热（以沐浴）', '原始印欧语时期', ''),
          ('洗澡；浴缸', '现代', 'Etymonline 明言：词源义是「加热」不是「浸泡」——-th 是「行为」的后缀（birth、death 同班）：古时沐浴先是烧水（由加热到沐浴）')],
 'mech': 'bath 的老底是「烧」：热水备好了，才叫洗澡。',
 'link': '今天的意思「洗澡」就是本义的定型（英国 Bath 市即以温泉得名）。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['bead'] = {
 'chain': [('Proto-Indo-European', '*gʷʰedʰ-', '请求；祈祷', '原始印欧语时期'),
           ('Proto-Germanic', '*bedō', '祷告', '原始日耳曼语时期'),
           ('Old English', 'ġebed', '祷告', '古英语时期'),
           ('Middle English', 'bede', '念珠', '中古英语时期')],
 'fa': '14 世纪中期见载（Etymonline：mid-14c., bede，义为「念珠」）',
 'orig': '祷告',
 'path': [('祷告', '原始日耳曼语时期', ''),
          ('珠子', '现代', '转义靠念珠：玫瑰念珠一颗珠记一遍祷告（bid one\'s beads「数珠祷告」)，「祷告」之名就落到了珠子上；后泛指一切小圆物（水珠、枪的准星）（由祷告到珠子）')],
 'mech': 'bead 先是「一遍祷告」，后是「记祷告的那颗珠」。',
 'link': '今天的意思「珠子」从「祷告」转来（德语同源词 Bitte 今天是「请」）。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['biography'] = {
 'chain': [('Proto-Indo-European', '*gwei-', '活', '原始印欧语时期'),
           ('Ancient Greek', 'bios', '生命', '古希腊时期'),
           ('Medieval Greek', 'biographia', '生命的记述', '中世纪希腊语时期'),
           ('English', 'biography', '传记', '1680 年代')],
 'fa': '1680 年代见载（Etymonline：1680s，义为「个人生平史（作为文学门类）」）',
 'orig': '生命的记述',
 'path': [('生命的记述', '中世纪希腊语时期', ''),
          ('传记', '现代', '晚出希腊语的学造词（古典希腊语无此复合，只用 bios)：经中世纪拉丁语 biographia 入英；1791 年「某一个人的生平史」义定型（学造词）')],
 'mech': 'biography 是「把一生写下来」：bio（命）+ graphia（写）。',
 'link': '今天的意思「传记」就是本义。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['biology'] = {
 'chain': [('Proto-Indo-European', '*gwei-', '活', '原始印欧语时期'),
           ('Ancient Greek', 'bios', '生命', '古希腊时期'),
           ('German', 'Biologie', '生物学', '1802 年'),
           ('English', 'biology', '生物学', '1819 年')],
 'fa': '1819 年见载（Etymonline：1819，义为「生命与生物之学」）',
 'orig': '生命之学',
 'path': [('生命之学', '1802 年', ''),
          ('生物学', '现代', '有据的双生造词：1802 年德国博物学家特雷维拉努斯与法国拉马克同年各自造出此词（德语 Biologie / 法语 biologie)，1819 年入英（学造词）')],
 'mech': 'biology 是 1802 年「撞车」造出的：德法两位学者同年想到同一个词。',
 'link': '今天的意思「生物学」就是造词时的意思（1686 年曾有一孤例作「传记史」，OED 判为孤例）。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['bit'] = {
 'chain': [('Proto-Indo-European', '*bʰeyd-', '劈开', '原始印欧语时期'),
           ('Proto-Germanic', '*bitô', '咬下的一块', '原始日耳曼语时期'),
           ('Old English', 'bita', '一口之量', '古英语时期'),
           ('Middle English', 'bitte', '小块', '中古英语时期')],
 'fa': '约 1200 年见载（Etymonline：c. 1200；bita「咬下的一块」约 1000 年已见）',
 'orig': '咬下的一块',
 'path': [('咬下的一块', '原始日耳曼语时期', ''),
          ('一点，小块；比特', '现代', '与 bite 同根（根义「劈」）：约 1600 年泛指任何小片；计算机 bit 是 1940 年代 binary + digit 的拼合新词（牛津明载），与老 bit 形合而源别（由咬痕到小片）')],
 'mech': 'bit 是「咬痕」：咬下一口，就是一小块。',
 'link': '今天的意思「一点」从「咬下的一块」泛化而来（钻头、马嚼子都是「咬」的部分）。',
 'disp': '计算机义 bit（1948 年前后）为 binary digit 的拼合，与本词为同形新词，登记在案。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['blown'] = {
 'chain': [('Proto-Germanic', '*blēaną', '吹', '原始日耳曼语时期'),
           ('Old English', 'blāwan', '吹', '古英语时期'),
           ('Middle English', 'blawen', '吹（过去分词）', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE blawen,blow 的过去分词）',
 'orig': '吹（过去分词）',
 'path': [('吹（过去分词）', '原始日耳曼语时期', ''),
          ('blow 的过去分词（吹）', '现代', '形变记录：blow 的强变化过去分词（blāwan → blāwen → blown)：15 世纪初作形容词「充气的」，15 世纪末喻「骄傲自满」，1670 年代「喘不上气」（形变记录）')],
 'mech': 'blown 是 blow 的旧式分词：吹满了，就是它。',
 'link': '今天的用法就是本义（花的「盛开」义是 blow 另一词的 geblowenne 一线）。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['boil'] = {
 'chain': [('Proto-Indo-European', '*beu-', '膨胀', '原始印欧语时期'),
           ('Latin', 'bulla', '水泡', '拉丁语时期'),
           ('Latin', 'bullīre', '冒泡；沸腾', '拉丁语时期'),
           ('Middle English', 'boilen', '煮沸', '中古英语时期')],
 'fa': '13 世纪初进入英语（Etymonline：early 13c.，自古法语 bolir)',
 'orig': '冒泡',
 'path': [('冒泡', '拉丁语时期', ''),
          ('煮沸；沸腾', '现代', '借词顶本族：本族旧词是 seethe；bulla「泡」→ bullīre「起泡」——水开的样子就是名字（由气泡到沸腾）')],
 'mech': 'boil 是「冒泡泡」：泡，就是它得名时的样子。',
 'link': '今天的意思「煮沸」就是本义。',
 'disp': '同形异词 boil「疖子」是本族词（古英语 bȳl「肿块」，本应作 bile)，其 oi 拼读或受本动词牵引（Wiktionary)，两词分线登记。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['bough'] = {
 'chain': [('Proto-Indo-European', '*bʰeh₂ǵʰús', '臂', '原始印欧语时期'),
           ('Proto-Germanic', '*bōguz', '肩；上臂', '原始日耳曼语时期'),
           ('Old English', 'bōg', '肩；臂；大枝', '古英语时期'),
           ('Middle English', 'bough', '大树枝', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE bog，义为「肩、臂」，古英语时已扩展指树枝）',
 'orig': '肩；臂',
 'path': [('肩；臂', '原始日耳曼语时期', ''),
          ('大树枝；主枝', '现代', '英语独有的转义：树的「胳膊」就是大枝（与 limb「肢→大枝」同喻）——德语 Bug 至今只指肩、肘、船头（由臂到枝）')],
 'mech': 'bough 是树的胳膊：英语把「臂」借给了树。',
 'link': '今天的意思「大树枝」从「臂」转来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['bull'] = {
 'chain': [('Proto-Indo-European', '*bʰel-', '吹；膨胀', '原始印欧语时期'),
           ('Proto-Germanic', '*bulô', '公牛', '原始日耳曼语时期'),
           ('Old English', 'bula', '公牛', '古英语时期'),
           ('Middle English', 'bule', '公牛', '中古英语时期')],
 'fa': '约 1200 年见载（Etymonline：c. 1200, bule；古诺斯语 boli 与古英语 bula 汇合）',
 'orig': '公牛',
 'path': [('公牛', '原始日耳曼语时期', ''),
          ('公牛', '现代', '或出「吹胀」一根（与 bellows「风箱」、拉丁语 follis「皮囊」同族）：本族 bula 与古诺斯语 boli 两形汇合而成今词（借词守恒）')],
 'mech': 'bull 或是「鼓着劲的那个」：与风箱同根。',
 'link': '今天的意思「公牛」就是本义。',
 'disp': '同形异词 bull「教皇诏书」出拉丁语 bulla「印章」（中世纪义），与本词无关，登记在案；「膨胀」根说为 Wiktionary 词根标注，主干立于日耳曼语 *bulô。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['cent'] = {
 'chain': [('Proto-Indo-European', '*ḱm̥tóm', '一百', '原始印欧语时期'),
           ('Latin', 'centum', '一百', '拉丁语时期'),
           ('Middle English', 'cent', '一百', '中古英语时期')],
 'fa': '14 世纪末见载（Etymonline：late 14c.，义为「一百」）',
 'orig': '一百',
 'path': [('一百', '拉丁语时期', ''),
          ('分（货币单位）', '现代', '17 世纪受 percent 影响转指「百分之一」；1786 年大陆会议采纳为美国货币单位名（一美元的百分之一）——莫里斯 1782 年已提议此名，杰斐逊的十进制方案胜出（由百到百分之一）')],
 'mech': 'cent 本是「一百」：做了分币，就成了「百分之一」。',
 'link': '今天的意思「分」是「百分之一」的定型。',
 'disp': '无已知争议（与 hundred 的 hund 同出印欧语 *ḱm̥tóm)。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['chinese'] = {
 'chain': [('Portuguese', 'chinês', '中国的', '葡萄牙语时期'),
           ('English', 'Chinish', '中国的', '16 世纪'),
           ('English', 'Chinese', '中国的', '1570 年代')],
 'fa': '1570 年代见载（Etymonline：1570s, China + -ese)',
 'orig': '中国的（人；语）',
 'path': [('中国的（人；语）', '1570 年代', ''),
          ('中文；中国人', '现代', '构词受葡萄牙语 chinês 影响，以 -ese 造于 China 之上，顶替旧形 Chinish；俚语 Chinee 是把 Chinese 误作复数而逆构的单数（构词记录）')],
 'mech': 'Chinese 的 -ese 带着葡萄牙味：它把前任 Chinish 换了下来。',
 'link': '今天的意思「中文」就是本义（名词用法约 1600 年起）。',
 'disp': '无已知争议',
 'folk': 'Chinee 是误认 Chinese 为复数所作的逆构单数（Etymonline 明言 on the mistaken notion that Chinese is a plural)，属真实的误构', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['clue'] = {
 'chain': [('Proto-Indo-European', '*glew-', '团成球', '原始印欧语时期'),
           ('Proto-Germanic', '*kliuwīną', '线团', '原始日耳曼语时期'),
           ('Old English', 'clēowen', '线团', '古英语时期'),
           ('Middle English', 'clew', '线团', '中古英语时期')],
 'fa': '15 世纪中拼作 clue（Etymonline：拼写 clue 首见 mid-15c.；「线索」义 1590 年代）',
 'orig': '线团',
 'path': [('线团', '原始日耳曼语时期', ''),
          ('线索；提示', '现代', '神话成词：阿里阿德涅给忒修斯的线团引他出迷宫——「引路之物」1590 年代成专义，1620 年代纯喻义定型；拼写由 clew 改 clue 是 -ue 改形潮的产物（由线团到线索）')],
 'mech': 'clue 是「救命的线团」：顺着它，才能走出迷宫。',
 'link': '今天的意思「线索」就是本义的比喻凝固。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
