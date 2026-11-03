# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['change'] = {
 'chain': [('Proto-Indo-European', '*kemb-', '弯；转', '原始印欧语时期'),
           ('Celtic', 'cambion', '交换', '凯尔特语时期'),
           ('Late Latin', 'cambīre', '以物易物', '晚期拉丁语时期'),
           ('Old French', 'changier', '改变；交换', '古法语时期'),
           ('Middle English', 'changen', '改变；零钱', '中古英语时期')],
 'fa': '约 1200 年进入英语（Etymonline：c. 1200，义为「使不同」）',
 'orig': '以物易物；交换',
 'path': [('以物易物；交换', '晚期拉丁语时期', ''),
          ('改变；零钱', '现代', '凯尔特语的词（根义或为「弯、转」：转 → 变 → 换）：14 世纪晚期「把大钱换成小钱」义立，零钱即由此生（由交换到改变）')],
 'mech': 'change 是「换」：换东西、换样子、换零钱，都是它。',
 'link': '今天「改变/零钱」两义同源：交换。',
 'disp': '凯尔特来源为通说（held to be），印欧根义推演（弯→转→换）为或然链。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['silver'] = {
 'chain': [('Proto-Germanic', '*silubrą', '银', '原始日耳曼语时期'),
           ('Old English', 'seolfor', '银', '古英语时期'),
           ('Middle English', 'silver', '银；银色的', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：seolfor，义兼「银、银币、钱」）',
 'orig': '银',
 'path': [('银', '古英语时期', ''),
          ('银；银色的', '现代', '它是个「流浪词」（Wanderwort）：日耳曼语、波罗的语、斯拉夫语形近义同，顶替了印欧本名（拉丁语 argentum 一系）（借词守恒式的稳定）')],
 'mech': 'silver 是借遍北欧的银名：来源说不清，行踪很清楚。',
 'link': '今天的意思「银」就是本义，一路没变。',
 'disp': '终极来源未明（of uncertain origin）：或谓日耳曼语借自伊比利亚-凯尔特语创新（借向反转说），未定论，本档止于日耳曼语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['number'] = {
 'chain': [('Proto-Indo-European', '*nem-', '分配；取', '原始印欧语时期'),
           ('Latin', 'numerus', '数；量', '拉丁语时期'),
           ('Old French', 'nombre', '数', '古法语时期'),
           ('Middle English', 'number', '数字，号码', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300，义为「总数、集合之量」）',
 'orig': '数；总量',
 'path': [('数；总量', '拉丁语时期', ''),
          ('数字；号码', '现代', '*nem-「分派」：分着数出来的就是数。14 世纪晚期「数字符号」义立，1879 年电话号码义生（由总量到符号）')],
 'mech': 'number 是「分出来的数」：一份份分好，才能数清。',
 'link': '今天的意思「数字/号码」从「总量」定型。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['zero'] = {
 'chain': [('Sanskrit', 'śūnyá', '空；无', '梵语时期'),
           ('Arabic', 'ṣifr', '空；密码（数字）', '阿拉伯语时期'),
           ('Medieval Latin', 'zephirum', '零', '中世纪拉丁语时期'),
           ('Italian', 'zero', '零', '意大利语时期'),
           ('English', 'zero', '零', '约 1600 年')],
 'fa': '约 1600 年见载（Etymonline：c. 1600）',
 'orig': '空无',
 'path': [('空无', '梵语时期', ''),
          ('零（0）', '现代', '印度的「空」概念西行：梵语 śūnyá 译成阿拉伯语 ṣifr（兼指数字符号 cipher），经中世纪拉丁语 zephirum 缩成意大利语 zero（由空到数）')],
 'mech': 'zero 是「空」的名字：无，也配有个数。',
 'link': '今天的意思「零」是印度数学西传的成果。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['million'] = {
 'chain': [('Latin', 'mīlle', '一千', '拉丁语时期'),
           ('Italian', 'milione', '大千（百万）', '意大利语时期'),
           ('Old French', 'million', '百万', '古法语时期'),
           ('Middle English', 'milioun', '百万', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.）',
 'orig': '大千（一千个一千）',
 'path': [('大千（一千个一千）', '意大利语时期', ''),
          ('百万', '现代', '意大利语给 mille「千」加了大词尾 -one：「好大一个千」就是百万。古希腊人无万以上之名、罗马人止于十万，此名 16 世纪前多为数学家用（由夸大到定数）')],
 'mech': 'million 是「大号的千」：一千个千，名字就是算法。',
 'link': '今天的意思「百万」就是本义的定型。',
 'disp': 'mīlle 本身来源未定，链止于拉丁语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['sock'] = {
 'chain': [('Ancient Greek', 'σύκχος (sýkkhos)', '一种鞋', '古希腊时期'),
           ('Latin', 'soccus', '轻便鞋；拖鞋', '拉丁语时期'),
           ('Old English', 'socc', '拖鞋', '古英语时期'),
           ('Middle English', 'socke', '短袜', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：socc，义为「拖鞋、轻便鞋」）',
 'orig': '轻便鞋；拖鞋',
 'path': [('轻便鞋；拖鞋', '拉丁语时期', ''),
          ('短袜', '现代', '本是喜剧演员的轻鞋（与悲剧的高底靴 buskin 对举）：鞋退了，只剩里面那层——袜（由鞋到袜）')],
 'mech': 'sock 先是「鞋」：喜剧演员的轻鞋，脱剩了袜。',
 'link': '今天的意思「短袜」从「轻便鞋」演变而来。',
 'disp': '希腊语词或为弗里吉亚语等小亚细亚语言借词（perhaps），Beekes 另比高加索来源说。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['pocket'] = {
 'chain': [('Proto-Germanic', '*puhô', '袋；囊', '原始日耳曼语时期'),
           ('Frankish', '*pokō', '口袋', '法兰克语时期'),
           ('Old French', 'poquet', '小袋', '古法语时期'),
           ('Middle English', 'pocket', '衣袋，口袋', '中古英语时期')],
 'fa': '14 世纪中期进入英语（Etymonline：mid-14c.，义为「小袋子」）',
 'orig': '小袋子',
 'path': [('小袋子', '古法语时期', ''),
          ('衣袋，口袋', '现代', 'poquet 是 poque「袋」的指小形（与 poke「大口袋」同源）：初是随身小袋，15 世纪早期「缝在衣服上的袋」义立（由袋子到衣袋）')],
 'mech': 'pocket 是「小号的袋」：缝进衣服里，就成了口袋。',
 'link': '今天的意思「口袋」从独立小袋定型而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['size'] = {
 'chain': [('Proto-Indo-European', '*sed-', '坐', '原始印欧语时期'),
           ('Latin', 'assidēre', '陪坐（任法官助理）', '拉丁语时期'),
           ('Old French', 'assise', '评定；规制', '古法语时期'),
           ('Middle English', 'syse', '大小；尺码', '中古英语时期')],
 'fa': '约 1300 年见载（Etymonline：c. 1300，义含「定额、定制、裁断」）',
 'orig': '定额；规制',
 'path': [('定额；规制', '古法语时期', ''),
          ('大小；尺码', '现代', 'assise 本是「陪坐评议（定额）」：官府定量（粮价、份量）就是规制，量本身就成了「大小」；1590 年代制造业分号义立（由定额到尺码）')],
 'mech': 'size 是「官家定的量」：定下来的数，就是大小。',
 'link': '今天的意思「尺码」从行政定额转化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
