# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['movable'] = {
 'chain': [('Latin', 'movēre', '移动', '拉丁语时期'),
           ('Old French', 'movable', '可移动的', '古法语时期'),
           ('Middle English', 'movable', '可移动的', '中古英语时期')],
 'fa': '14 世纪晚期见载（Etymonline：late 14c.，义为「有动意的」；约 1400 年「可被移动」）',
 'orig': '易动的；可被移动的',
 'path': [('易动的；可被移动的', '古法语时期', ''),
          ('可移动的；可动的', '现代', 'moveable feast 是教会年历里「星期固定、日期浮动」的节日（借词守恒）')],
 'mech': 'movable 是「能挪的」：连节日都能挪。',
 'link': '今天的意思「可移动」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['myth'] = {
 'chain': [('Ancient Greek', 'μῦθος (mŷthos)', '言辞；故事', '古希腊时期'),
           ('Modern Latin', 'mythus', '神话', '近现代拉丁语时期'),
           ('English', 'myth', '神话', '1830 年')],
 'fa': '1830 年见载（Etymonline 与 Wiktionary：1830）',
 'orig': '言辞；故事',
 'path': [('言辞；故事', '古希腊时期', ''),
          ('神话；虚构的故事', '现代', '学理借词：1840 年「不实之说」义立——被当真的故事叫神话，不被当真的也叫 myth（由故事到虚妄）')],
 'mech': 'myth 本是「说出来的事」：信，则为神；不信，则为妄。',
 'link': '今天「神话/虚构」两义同出一「说」。',
 'disp': '希腊语词来源未明（Etymonline：of unknown origin；Beekes 谓「很有可能」出前希腊语），本档止于希腊语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['napkin'] = {
 'chain': [('Latin', 'mappa', '布；餐巾', '拉丁语时期'),
           ('Old French', 'nape', '桌布', '古法语时期'),
           ('Middle English', 'napekyn', '餐巾', '中古英语时期')],
 'fa': '14 世纪晚期见载（Etymonline：late 14c.，义为「餐桌小布」）',
 'orig': '小桌布',
 'path': [('小桌布', '古法语时期', ''),
          ('餐巾；纸巾', '现代', '化石小称词：nape「桌布」+ -kin「小」——拉丁语 mappa 的 m 在古法语里变成 n（同 natte 出 matta）；如今已无人觉出它是「小」字辈（与 apron 的误切分互为镜像）（化石小称）')],
 'mech': 'napkin 是「小桌布」：大桌布缩成了一角。',
 'link': '今天的意思「餐巾」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['nation'] = {
 'chain': [('Proto-Indo-European', '*gene-', '生育', '原始印欧语时期'),
           ('Latin', 'nāscī', '出生', '拉丁语时期'),
           ('Latin', 'nātiō', '出生；族群', '拉丁语时期'),
           ('Middle English', 'nacioun', '民族；国家', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300，义为「有共同血统与语言的一大群人」）',
 'orig': '出生；同源的族群',
 'path': [('出生；同源的族群', '拉丁语时期', ''),
          ('国家；民族', '现代', '字面「被生出来的（那一群）」：16 世纪「政治社会」义渐居主导（由血统到国家）')],
 'mech': 'nation 是「同根生」：先是血亲，后是国民。',
 'link': '今天「国家/民族」两义同出一「生」。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['navigate'] = {
 'chain': [('Proto-Indo-European', '*néh₂us', '船', '原始印欧语时期'),
           ('Latin', 'nāvis', '船', '拉丁语时期'),
           ('Latin', 'nāvigāre', '航行；驾船', '拉丁语时期'),
           ('English', 'navigate', '导航', '1580 年代')],
 'fa': '1580 年代见载（Etymonline：1580s，义为「乘船往来、航行」）',
 'orig': '航行；驾船',
 'path': [('航行；驾船', '拉丁语时期', ''),
          ('导航，确定方向；浏览（网站）', '现代', 'nāvis「船」+ agere「驱使」：1784 年用于气球，1901 年用于飞机——「驾」的对象换了又换（由驾船到导航）')],
 'mech': 'navigate 是「驱船」：船、气球、飞机，最后是网页。',
 'link': '今天的意思「导航」就是本义的扩展。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['navy'] = {
 'chain': [('Proto-Indo-European', '*néh₂us', '船', '原始印欧语时期'),
           ('Latin', 'nāvis', '船', '拉丁语时期'),
           ('Old French', 'navie', '船；船队', '古法语时期'),
           ('Middle English', 'navie', '海军', '中古英语时期')],
 'fa': '14 世纪中期进入英语（Etymonline：mid-14c.，义为「船队」，尤指战船队）',
 'orig': '船队',
 'path': [('船队', '古法语时期', ''),
          ('海军；海军蓝（的）', '现代', '1530 年代「一国的海上力量」义立；navy blue 出自英国海军制服色（由船队到海军）')],
 'mech': 'navy 是「所有的船」：凑成队，就是海军。',
 'link': '今天的意思「海军」从「船队」转义而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['news'] = {
 'chain': [('Middle English', 'new', '新鲜事（名词）', '中古英语时期'),
           ('Middle English', 'newes', '新闻', '中古英语时期')],
 'fa': '14 世纪晚期见载（Etymonline：late 14c.，义为「新鲜事」，new 的复数）',
 'orig': '新鲜事（复数）',
 'path': [('新鲜事（复数）', '中古英语时期', ''),
          ('新闻；消息', '现代', '仿法语 nouvelles、中世纪拉丁语 nova「新事（中性复数）」：1560 年代起被当单数用；1923 年「（广播电视）新闻节目」义（由新事到新闻）')],
 'mech': 'news 是「一堆新事」：多得数不过来，索性当一个词。',
 'link': '今天的意思「新闻」就是本义的集合化。',
 'disp': '无已知争议',
 'folk': '「NEWS 是 North、East、West、South（东南西北）缩略」系著名民间词源，Etymonline 直斥为 absurd folk etymology（1640 年已见于笑话集）；另有 Noteworthy Events, Weather, Sports 一版，同属杜撰，均不采用', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['notch'] = {
 'chain': [('Old French', 'ochier', '刻口', '古法语时期'),
           ('French', 'oche', '刻口', '法语近现代'),
           ('English', 'notch', '凹口；刻痕', '1570 年代')],
 'fa': '1570 年代见载（Etymonline：1570s，义为「V 形刻口」）',
 'orig': '刻口',
 'path': [('刻口', '古法语时期', ''),
          ('凹口；刻痕', '现代', '误切分化石：an otch 被听成 a notch，n 就此过户（同类见 apron、adder）（误切分）')],
 'mech': 'notch 的 n 是「借来的」：本来属于前面的 an。',
 'link': '今天的意思「刻痕」就是本义，一路没变。',
 'disp': '法语 ochier 本身来源未明（两家一致：of unknown origin），本档止于古法语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
