# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['sister'] = {
 'chain': [('Proto-Indo-European', '*swesor', '姐妹', '原始印欧语时期'),
           ('Proto-Germanic', '*swestr-', '姐妹', '原始日耳曼语时期'),
           ('Old English', 'sweostor', '姐妹', '古英语时期'),
           ('Middle English', 'suster', '姐妹', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE sweostor、swuster;13 世纪中 suster)',
 'orig': '姐妹',
 'path': [('姐妹', '原始印欧语时期', ''),
          ('姐；妹', '现代', '印欧语里「最持久不变」的词根之一：梵语 svasar-、拉丁语 soror、俄语 sestra 同源；今形 i 元音是受古诺斯语 systir 沾染而变（借词守恒）')],
 'mech': 'sister 与 father、brother 一样：几千年前的亲属词，原样活到今天。',
 'link': '今天的意思「姐妹」就是本义，一路未变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['handsome'] = {
 'chain': [('Proto-Germanic', '*handusam', '顺手的', '原始日耳曼语时期'),
           ('Middle English', 'handsum', '顺手的', '中古英语时期')],
 'fa': '约 1400 年见载（Etymonline：c. 1400, handsom，义为「易于操作的」）',
 'orig': '顺手的；好用的',
 'path': [('顺手的；好用的', '原始日耳曼语时期', ''),
          ('英俊的，帅气的', '现代', '义步可考：1400 顺手→1550 年代合宜、得体→1580 年代「好看」→1680 年代「（数目）可观、慷慨」：好用生出「顺眼」（由顺手到英俊）')],
 'mech': 'handsome 本是夸东西「顺手好用」：用着顺，看着就顺眼了。',
 'link': '今天的意思「英俊」是「顺手→得体→好看」三步漂来的。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['flower'] = {
 'chain': [('Proto-Indo-European', '*bʰleh₃-', '繁茂；开花', '原始印欧语时期'),
           ('Latin', 'flōs', '花', '拉丁语时期'),
           ('Old French', 'flor', '花', '古法语时期'),
           ('Middle English', 'flour', '花', '中古英语时期')],
 'fa': '约 1200 年进入英语（Etymonline：c. 1200, flour)',
 'orig': '花',
 'path': [('花', '拉丁语时期', ''),
          ('花，花朵', '现代', '与 flour「面粉」本是同一个词（都是「精华」：花是植物的精华，粉是谷物的精华），14 世纪末起拼写分家；它还顶掉了同根的本族词 blossom（由借词压本族）')],
 'mech': 'flower 与 flour 是双胞胎：「精华」一词两用，一管花一管面。',
 'link': '今天的意思「花」就是本义；「精华、鼎盛」义（the flower of youth）是同根旧义的存留。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['bus'] = {
 'chain': [('Latin', 'omnibus', '为所有人', '拉丁语时期'),
           ('English', 'omnibus', '公共马车', '19 世纪初'),
           ('English', 'bus', '公共汽车', '1832 年')],
 'fa': '1832 年见载（Etymonline：1832，义为「公共街道马车」，omnibus 的口语缩略）',
 'orig': '为所有人（的车）',
 'path': [('为所有人（的车）', '拉丁语时期', ''),
          ('公共汽车，巴士', '现代', '截短词：omnibus 是拉丁语与格复数词尾「为一切人」——现代 bus 只剩一个词尾活着；早期写作 \'bus，撇号标示截短，后人忘其出身遂去撇号（截短成词）')],
 'mech': 'bus 的全部身世就是一个拉丁语词尾：omnibus 砍剩 -bus。',
 'link': '今天的意思「公共汽车」从「人人可乘的车」截短而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['hello'] = {
 'chain': [('Old High German', 'hala', '（去）取来！', '古高地德语时期'),
           ('Middle English', 'halouen', '（狩猎时）呼喊', '中古英语时期'),
           ('English', 'holla', '喂！（唤注意）', '1588 年'),
           ('English', 'hello', '你好', '1848 年')],
 'fa': '1848 年作问候语见载（Etymonline：1848，早期用例出美国西部边疆）',
 'orig': '唤人注意之声',
 'path': [('唤人注意之声', '中古英语时期', ''),
          ('你好，喂', '现代', 'hallo/holla 的变体，远源或为古高地德语 halōn「取来」的命令式——摆渡人靠它招呼船夫；电话时代它击败贝尔提议的 ahoy，成为接听第一声（由呼喊到问候）')],
 'mech': 'hello 前身是「喂——」：喊人回头的话，变成了见面第一句。',
 'link': '今天的意思「你好」从「唤注意的呼喊」定型而来。',
 'disp': '与摆渡招呼语的关联作 possibly/OED 引述层面登记。',
 'folk': '民间说 hello 为爱迪生为电话所造——Wiktionary 明言其印刷用例早于电话发明数十年，此说不实', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {'dance': 'origin_unknown（主干复核后）：经古法语 dancier（12 世纪）入英（约 1300)，然法语词本身来历不明——牛津与 Wiktionary 均作 of unknown/uncertain origin；Etymonline 拟低地法兰克语 *dintjan（perhaps，与古弗里斯语 dintje「颤动」相联）仅一家之拟，无第二家互证主干，保持待核'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
