# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['honest'] = {
 'chain': [('Latin', 'honōs', '荣誉', '拉丁语时期'),
           ('Latin', 'honestus', '受尊敬的', '拉丁语时期'),
           ('Middle English', 'honest', '诚实的', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300，义为「体面的、受尊敬的」，兼「无欺诈」）',
 'orig': '受尊敬的；体面的',
 'path': [('受尊敬的；体面的', '拉丁语时期', ''),
          ('诚实的；正直的', '现代', '「配得上荣誉」先指门面体面：约 1400 年「公平交易、不说谎」成主导义（由体面到诚实）')],
 'mech': 'honest 先是「有面子」，后是「有良心」。',
 'link': '今天的意思「诚实」从「受尊敬」内化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
# 拼写变体记录（humor 的英式拼写）
S['humour'] = {
 'chain': [('Proto-Indo-European', '*wegʷ-', '湿', '原始印欧语时期'),
           ('Latin', 'ūmor', '液体；湿气', '拉丁语时期'),
           ('Middle English', 'humour', '幽默', '中古英语时期')],
 'fa': '中古英语时期见载（牛津：via OF from Latin humor「湿气」）',
 'orig': '液体；体液',
 'path': [('液体；体液', '拉丁语时期', ''),
          ('幽默（英式拼写，美式拼作 humor）', '现代', '古希腊医学「四体液」说：体液配比定性情→「气质」→16 世纪「心境、怪念头」→窄化为「诙谐」。拼写的 h 是后加的：拉丁语本作 ūmor 无 h，因误联 humus「土」而添（词义主干见 humor，本条记英式拼写形）')],
 'mech': 'humour 是「体液」变的笑：先是水，后是性情，最后是笑点。',
 'link': '今天的意思「幽默」从医学体液说一路转来。',
 'disp': '无已知争议',
 'folk': '词首 h 系民间词源：拉丁语本词正确作 ūmor（无 h），因误与 humus「泥土」相联而添 h（Wiktionary 明记为 folk etymological）', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['illegal'] = {
 'chain': [('Latin', 'lēx', '法律', '拉丁语时期'),
           ('Latin', 'lēgālis', '合法的', '拉丁语时期'),
           ('Medieval Latin', 'illēgālis', '非法的', '中世纪拉丁语时期'),
           ('English', 'illegal', '违法的', '1630 年代')],
 'fa': '1630 年代见载（Etymonline：1630s，义为「与法律相抵触的」）',
 'orig': '不合法的',
 'path': [('不合法的', '中世纪拉丁语时期', ''),
          ('违法的；非法的', '现代', 'in-「不」+ lēgālis「合法」：Century Dictionary 辨它指「实质抵触法律」，重于程序不合规（借词守恒）')],
 'mech': 'illegal 是 legal 前面加的「不」：出界，就是违法。',
 'link': '今天的意思「非法」就是构词原义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['illiterate'] = {
 'chain': [('Latin', 'lītera', '字母', '拉丁语时期'),
           ('Latin', 'līterātus', '识字的', '拉丁语时期'),
           ('Latin', 'illīterātus', '无学识的', '拉丁语时期'),
           ('Middle English', 'illiterat', '不识字的', '中古英语时期')],
 'fa': '15 世纪初见载（Etymonline：early 15c.，义为「未受教育、不能读写」，原义指不懂拉丁文）',
 'orig': '不懂拉丁文的（无学识的）',
 'path': [('不懂拉丁文的（无学识的）', '拉丁语时期', ''),
          ('不识字的；文盲的', '现代', 'in-「不」+ līterātus「备有字母的」：中世纪「识字」就是识拉丁文，古英语曾逐字仿译 unstæfwīs「不识字母的」（由不懂拉丁到不识字）')],
 'mech': 'illiterate 是「字母没进门的人」：当年字母只有一种，拉丁的。',
 'link': '今天的意思「不识字」就是本义的泛化。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['illuminate'] = {
 'chain': [('Latin', 'lūmen', '光', '拉丁语时期'),
           ('Latin', 'illūmināre', '照亮', '拉丁语时期'),
           ('English', 'illuminate', '照亮；阐明', '约 1500 年')],
 'fa': '约 1500 年见载（Etymonline：c. 1500，由 illumination 回构或直接出拉丁语分词）',
 'orig': '照亮',
 'path': [('照亮', '拉丁语时期', ''),
          ('照亮，照明；阐明', '现代', 'in-「上」+ lūmen「光」：先有 14 世纪晚期的 enlumyen——给手抄本描金饰彩的「照亮」（由照亮到阐明）')],
 'mech': 'illuminate 是「把光放上去」：纸亮了，理也亮了。',
 'link': '今天「照明/阐明」两义同出一「光」。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['illusion'] = {
 'chain': [('Latin', 'lūdere', '游戏；戏耍', '拉丁语时期'),
           ('Latin', 'illūdere', '嘲弄；戏耍', '拉丁语时期'),
           ('Latin', 'illūsiō', '嘲弄', '拉丁语时期'),
           ('Middle English', 'illusioun', '幻觉', '中古英语时期')],
 'fa': '14 世纪中期进入英语（Etymonline：mid-14c.，义为「嘲弄、讥讽」；14 世纪晚期「欺骗性的表象」）',
 'orig': '嘲弄；戏耍',
 'path': [('嘲弄；戏耍', '拉丁语时期', ''),
          ('幻觉；错觉', '现代', '字面「拿（人）开玩笑」：教会拉丁语里转出「欺骗性表象」义——眼睛被耍了，就是幻觉（由戏耍到错觉）')],
 'mech': 'illusion 是「被耍了」：耍你的是你的眼睛。',
 'link': '今天的意思「错觉」从「戏弄」转义而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['immature'] = {
 'chain': [('Latin', 'mātūrus', '成熟的', '拉丁语时期'),
           ('Latin', 'immātūrus', '未熟的；不合时宜的', '拉丁语时期'),
           ('English', 'immature', '不成熟的', '1540 年代')],
 'fa': '1540 年代见载（Etymonline：1540s，义为「不合时宜的、早夭的」）',
 'orig': '未熟的；不合时宜的',
 'path': [('未熟的；不合时宜的', '拉丁语时期', ''),
          ('不成熟的；幼稚的', '现代', 'in-「不」+ mātūrus「熟」：16 世纪多指早逝，1640 年代「未充分发育」成主义，1920 年指心智（由未熟到幼稚）')],
 'mech': 'immature 是「果子没熟」：先说命，后说人。',
 'link': '今天的意思「不成熟」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['immerse'] = {
 'chain': [('Latin', 'mergere', '浸；沉', '拉丁语时期'),
           ('Latin', 'immergere', '浸入', '拉丁语时期'),
           ('English', 'immerse', '使沉浸；浸泡', '15 世纪初')],
 'fa': '15 世纪初见载（Etymonline：early 15c.，见于分词 immersed；牛津作 17 世纪初）',
 'orig': '浸入',
 'path': [('浸入', '拉丁语时期', ''),
          ('使沉浸；浸泡', '现代', 'in-「入」+ mergere「浸」：1660 年代喻指沉浸于学业、激情（由浸水到沉浸）')],
 'mech': 'immerse 是「整个人没进水里」：后没进书里、事里。',
 'link': '今天的意思「沉浸」就是本义的比喻化。',
 'disp': '首载年代两家小出入（Etymonline 15 世纪初分词、牛津 17 世纪初动词），登记。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
