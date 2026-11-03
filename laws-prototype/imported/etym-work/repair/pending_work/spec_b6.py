# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['everywhere'] = {
 'chain': [('Old English', 'æfre', '永远；总是', '古英语时期'),
           ('Old English', 'gehwær', '到处', '古英语时期'),
           ('Middle English', 'eauerihwer', '到处', '中古英语时期')],
 'fa': '约 1200 年见载（Etymonline：c. 1200, eauerihwer，古英语 æfre gehwær 的缩合）',
 'orig': '（总是）在一切地方',
 'path': [('（总是）在一切地方', '古英语时期', ''),
          ('到处，处处，各个地方', '现代', '缩合化石：它不是 every + where——源头是 æfre「永远」+ gehwær「到处」，中间的 -i- 本是前缀；后人按 every+where 读它，形合而源别（缩合脱源）')],
 'mech': 'everywhere 是「缩」出来的：æfre gehwær 连读成一团，再被读成 every+where。',
 'link': '今天的意思「到处」就是本义，缩合只动了形。',
 'disp': '无已知争议',
 'folk': '按 every + where 的通行读法与真实来源不合，Etymonline 明注 Not from every', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['tidy'] = {
 'chain': [('Proto-Germanic', '*tīdiz', '时间', '原始日耳曼语时期'),
           ('Old English', 'tīd', '时节；时间', '古英语时期'),
           ('Middle English', 'tidi', '合时宜的', '中古英语时期')],
 'fa': '13 世纪中期见载（Etymonline：mid-13c., tidi，义为「状况良好、健康、能长」）',
 'orig': '应时的；合时宜的',
 'path': [('应时的；合时宜的', '中古英语时期', ''),
          ('整洁的，整齐的；整理', '现代', 'tide 在此是它的古义「时节、时间」（今义「潮汐」是后起的窄化）：合时节→状况好→（夸人）能干体面→1706 年起「整洁有条理」（由应时到整洁）')],
 'mech': 'tidy 本是「赶上时节」：合时宜的人，做事自然有条理。',
 'link': '今天的意思「整洁」是「合时宜」三步漂来的。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['international'] = {
 'chain': [('Latin', 'inter', '在……之间', '拉丁语时期'),
           ('Latin', 'nātiō', '民族；国家', '拉丁语时期'),
           ('English', 'international', '国际的', '1780 年')],
 'fa': '1780 年见载（Etymonline：1780，杰里米·边沁所造）',
 'orig': '国家之间的（法）',
 'path': [('国家之间的（法）', '1780 年', ''),
          ('国际的，世界的', '现代', '有据可查的造词：边沁在《道德与立法原理引论》（1780）中造它替换「万国法」旧名，并加脚注自承「这是一个新词」；1864 年又成「国际工人协会」的专名（成词记录）')],
 'mech': 'international 是边沁亲手造的：出生证明（他的脚注）至今还在。',
 'link': '今天的意思「国际的」就是造词时的意思。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['dentist'] = {
 'chain': [('Proto-Indo-European', '*dent-', '牙', '原始印欧语时期'),
           ('Latin', 'dēns', '牙', '拉丁语时期'),
           ('French', 'dentiste', '牙医', '18 世纪中叶'),
           ('English', 'dentist', '牙医', '1759 年')],
 'fa': '1759 年见载（Etymonline：1759，自法语 dentiste)',
 'orig': '牙医（法语新词）',
 'path': [('牙医（法语新词）', '18 世纪中叶', ''),
          ('牙科医生，牙医', '现代', '法语 dent「牙」（出拉丁语 dēns)+ -iste：1759 年入英时还被报纸讥为法国腔的新词，本族旧称是 tooth-drawer「拔牙匠」（借词守恒）')],
 'mech': 'dentist 是「牙的人」：法国给的职业名，英国先嫌它洋气。',
 'link': '今天的意思「牙医」就是本义。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['health'] = {
 'chain': [('Proto-Indo-European', '*kailo-', '完整的；无伤的', '原始印欧语时期'),
           ('Proto-Germanic', '*hailitho', '完整（状态）', '原始日耳曼语时期'),
           ('Old English', 'hælþ', '完整无损；健全', '古英语时期'),
           ('Middle English', 'helthe', '健康', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE hælþ，义为「完整、健全无损」）',
 'orig': '完整无损（的状态）',
 'path': [('完整无损（的状态）', '原始日耳曼语时期', ''),
          ('健康，卫生', '现代', '它是 whole 的抽象名词（不是 heal 的——Etymonline 明辨）：同根一族有 hale「健壮」、holy「神圣（完整不可犯）」、heal「使完整」——健康先是「没破损」（由完整到健康）')],
 'mech': 'health 的底子是「整」：人不破、不缺，就是健康。',
 'link': '今天的意思「健康」从「完整无损」收窄到身体这一面（中古时还兼指福祉、平安；1590 年代起作祝酒词）。',
 'disp': '无已知争议',
 'folk': '常被误系于 heal 派生，Etymonline 明言它是 whole 的抽象名词', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['fourth'] = {
 'chain': [('Proto-Germanic', '*fedurþô', '第四', '原始日耳曼语时期'),
           ('Old English', 'fēorþa', '第四', '古英语时期'),
           ('Middle English', 'ferthe', '第四', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE feorða；今形 fourth 为 15 世纪中期改形）',
 'orig': '第四',
 'path': [('第四', '原始日耳曼语时期', ''),
          ('第四（4th)', '现代', '序数词形变：中古作 ferthe,15 世纪中期受基数词 four 牵引改作 fourth——继承形向基数词看齐（类推改形，与 third 的换位同类）')],
 'mech': 'fourth 本作 ferthe：是 four 把它「扶正」成了今天的样子。',
 'link': '今天的意思「第四」就是本义，改形只动了拼法。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['sixth'] = {
 'chain': [('Proto-Germanic', '*sehstô', '第六', '原始日耳曼语时期'),
           ('Old English', 'siexta', '第六', '古英语时期'),
           ('Middle English', 'sixte', '第六', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE syxte；sixth 形 16 世纪定型）',
 'orig': '第六',
 'path': [('第六', '原始日耳曼语时期', ''),
          ('第六（6th)', '现代', '序数词形变：中古作 sixte,16 世纪词尾向 -th 序数格式看齐改作 sixth（类推改形，与 third、fourth 同类）')],
 'mech': 'sixth 的 -th 是后配的：它本作 sixte。',
 'link': '今天的意思「第六」就是本义，改形只动了词尾。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}

R = {
 'rainbow': 'compositional（主干复核后）：rain + bow 通用日耳曼复合（古英语 regnboga 以来），现代词义由构词直接可读、无历史漂移；词源叙事归形态层，待核保持',
 'kindness': 'compositional（主干复核后）：kind + -ness 透明派生（约 1300 kyndenesse「礼貌、善行」以来构式未变），现代词义由构词直接可读；词源叙事在 kind 本词，待核保持',
 'daily': 'compositional（主干复核后）：day + -ly 透明派生（古英语 dæġlīċ 以来），现代词义由构词直接可读、无历史漂移；词源叙事归形态层，待核保持',
 'sixty': 'compositional（主干复核后）：six + -ty 的数词构式，古英语 sixtiġ 以来构词透明、词义无漂移（与全数词同一口径）；词源叙事归形态层，待核保持',
 'ninety': 'compositional（主干复核后）：nine + -ty 的数词构式，古英语 nigontiġ 以来构词透明、词义无漂移（与全数词同一口径）；词源叙事归形态层，待核保持',
}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
