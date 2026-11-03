# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['happy'] = {
 'chain': [('Old Norse', 'happ', '运气；机会', '古诺斯语时期'),
           ('Middle English', 'hap', '运气', '中古英语时期'),
           ('Middle English', 'happy', '幸运的', '中古英语时期')],
 'fa': '14 世纪末见载（Etymonline：late 14c.，义为「幸运的、得命运眷顾的」）',
 'orig': '幸运的',
 'path': [('幸运的', '中古英语时期', ''),
          ('快乐的，高兴的', '现代', 'hap「运气」今已罕用（存于 happen、perhaps 中）：欧洲多数语言的「幸福」词本义都是「幸运」（从希腊语到爱尔兰语皆然）——运气好，心里就亮了；「满足愉悦」义定型于 1520 年代（由幸运到快乐）')],
 'mech': 'happy 先是「运气好」：好运在前，好心情在后。',
 'link': '今天的意思「快乐」从「幸运」漂来，与 silly 出自 gesælig「有福」是同一条路。',
 'disp': '与古诺斯语 heppinn「幸运」的确切关系作 perhaps/possibly 登记（Wiktionary），主干立于 hap + -y（牛津/Etymonline 一致）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['perform'] = {
 'chain': [('Proto-Indo-European', '*promo-', '向前', '原始印欧语时期'),
           ('Proto-Germanic', '*frumjaną', '促成；完成', '原始日耳曼语时期'),
           ('Frankish', '*frummjan', '完成；供给', '法兰克语时期'),
           ('Old French', 'parfornir', '完成；履行', '古法语时期'),
           ('Middle English', 'parformen', '履行', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300, performen，义为「落实、履行所要求之事」）',
 'orig': '完成；履行',
 'path': [('完成；履行', '古法语时期', ''),
          ('表演，演出；履行', '现代', '词形被 forme「形状」同化改写（parfornir → performer）：今人更把它看作 per- + form；舞台义约 1600 年（由履行到演出）')],
 'mech': 'perform 本义「做完、办到」：把戏演完，也是办到。',
 'link': '今天的意思「表演」是 1600 年前后从「履行」分出的新枝。',
 'disp': '无已知争议（教会拉丁语另有 performo「彻底成形」一词并存）。',
 'folk': '词形受 forme「形式」牵引而改（parfornir → performer），是真实的民间同化改形，今多按 per- + form 理解', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['guest'] = {
 'chain': [('Proto-Indo-European', '*gʰóstis', '陌生人；宾客；主人', '原始印欧语时期'),
           ('Proto-Germanic', '*gastiz', '客人', '原始日耳曼语时期'),
           ('Old English', 'ġiest', '客人', '古英语时期'),
           ('Middle English', 'gest', '客人', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE gæst、giest，义为「不速之客、陌生人」）',
 'orig': '陌生人；客人',
 'path': [('陌生人；客人', '原始印欧语时期', ''),
          ('客人，宾客', '现代', 'Watkins:词根义是「与己有 reciprocal 待客义务的人」——客、主本是一根（拉丁语 hostis 同源：先「陌生人」后「敌人」；host 是同源双式）；今形受古诺斯语 gestr 影响，按本族音变本应成 *yest（由陌生人到宾客）')],
 'mech': 'guest 与 host 是同根：请客与做客，原是同一份义务的两面。',
 'link': '今天的意思「客人」就是本义；「陌生人」一层退到了词根里。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['phone'] = {
 'chain': [('Ancient Greek', 'phōnē', '声音', '古希腊时期'),
           ('English', 'telephone', '电话', '1876 年'),
           ('English', 'phone', '电话', '1884 年')],
 'fa': '1884 年见载（Wiktionary 标 etydate 1884;Etymonline 引 1878 年用例，义为 telephone 的口语缩略）',
 'orig': '电话（telephone 的截短）',
 'path': [('电话（telephone 的截短）', '1876 年', ''),
          ('电话，手机；打电话', '现代', '截短词：先专指听筒（1895 年《世纪词典》),后兼指整机；源头 telephone 的 -phone 出希腊语 phōnē「声音」（截短成词）')],
 'mech': 'phone 是 telephone 的「半截」：剩下的半截恰好是「声音」。',
 'link': '今天的意思「电话」就是截短源头的意思。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['telephone'] = {
 'chain': [('Proto-Indo-European', '*bʰeh₂-', '说话', '原始印欧语时期'),
           ('Ancient Greek', 'phōnē', '声音；话语', '古希腊时期'),
           ('Ancient Greek', 'tēle', '远方', '古希腊时期'),
           ('French', 'téléphone', '远声器', '1830 年前后'),
           ('English', 'telephone', '电话机', '1876 年')],
 'fa': '1835 年见载（Etymonline：1835，义为「以乐音远传文字的系统」）',
 'orig': '（以乐音传信的）远声器',
 'path': [('（以乐音传信的）远声器', '1830 年前后', ''),
          ('电话机', '现代', '学造词：法语 téléphone 先指苏德雷 1828 年的「乐音字母」传信装置（未实用）；贝尔 1876 年把这个现成的名字安到电电话机上（学造词）')],
 'mech': 'telephone 是「远方的声音」：名字比电话机本身早生了四十多年。',
 'link': '今天的意思「电话机」是贝尔给旧名找的新主人。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['town'] = {
 'chain': [('Proto-Indo-European', '*dhu-no-', '围起来的地方', '原始印欧语时期'),
           ('Celtic', '*dunon', '山丘；山寨', '凯尔特语时期'),
           ('Proto-Germanic', '*tunaz', '围地；设防地', '原始日耳曼语时期'),
           ('Old English', 'tūn', '围地；农庄；村落', '古英语时期'),
           ('Middle English', 'toun', '城镇', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE tun，义为「围地、园地、田地；农庄、庄园」）',
 'orig': '围起来的地方；农庄',
 'path': [('围起来的地方；农庄', '古英语时期', ''),
          ('镇，城镇，集镇', '现代', '日耳曼语早期向凯尔特语借 *dunon「山寨」：同根的德语 Zaun 今义「篱笆」、荷兰语 tuin「花园」——围起来先是地，再是村，12 世纪中叶对译法语 ville 后升为「城镇」（由围地到城镇）')],
 'mech': 'town 的祖先是道篱笆：围出一块地，住出一座镇。',
 'link': '今天的意思「城镇」从「围地农庄」长大而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {
 'actress': 'compositional（主干复核后）：actor + -ess（阴性后缀）透明派生，现代词义「女演员」由构词直接可读（1580 年代「做事的女子」、1700 年舞台义为同一构式的义项定型）；词源叙事在 actor 本词，待核保持',
 'snowball': 'compositional（主干复核后）：snow + ball 现代透明复合（约 1400)，词义即「雪做的球」无历史漂移（德语 Schneeball 等为平行同构）；词源叙事归形态层，待核保持',
}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
