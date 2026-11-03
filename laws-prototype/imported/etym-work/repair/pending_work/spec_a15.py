# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['joy'] = {
 'chain': [('Proto-Indo-European', '*gau-', '欢喜', '原始印欧语时期'),
           ('Latin', 'gaudēre', '欢喜', '拉丁语时期'),
           ('Latin', 'gaudium', '喜悦', '拉丁语时期'),
           ('Late Latin', 'gaudia', '喜悦（原为复数）', '晚期拉丁语时期'),
           ('Old French', 'joie', '欢乐', '古法语时期'),
           ('Middle English', 'joye', '欢乐', '中古英语时期')],
 'fa': '约 1200 年进入英语（Etymonline：c. 1200，义为「愉悦欣喜之情」）',
 'orig': '喜悦',
 'path': [('喜悦', '拉丁语时期', ''),
          ('欢乐，喜悦，乐趣', '现代', '小小的语法事故：gaudium 的中性复数 gaudia 被误当成阴性单数，顺势成了法语 joie 的词形——复数变单数，词义没变（形态误读定型）')],
 'mech': 'joy 是「认错格」的词：复数被看成单数，就这么传了下来。',
 'link': '今天的意思「喜悦」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['height'] = {
 'chain': [('Proto-Germanic', '*hauhiþō', '高处', '原始日耳曼语时期'),
           ('Old English', 'hēahþu', '最高处；顶峰', '古英语时期'),
           ('Middle English', 'heighte', '高度', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：hiehþu，义为「最高处、天界」）',
 'orig': '最高处；顶峰',
 'path': [('最高处；顶峰', '古英语时期', ''),
          ('身高；高度', '现代', 'high + 抽象后缀 -þu（与 width、depth 的 -th 同族）：先指「顶点」本身，13 世纪晚期转指「从底到顶的距离」；今读的 -t 音 19 世纪才定型（弥尔顿还写 highth）（由顶点到距离）')],
 'mech': 'height 先是「山顶」：站在顶上量的那截，才是高度。',
 'link': '今天的意思「高度」从「最高处」转化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['beef'] = {
 'chain': [('Proto-Indo-European', '*gʷṓws', '牛', '原始印欧语时期'),
           ('Latin', 'bōs', '牛', '拉丁语时期'),
           ('Old French', 'buef', '牛；牛肉', '古法语时期'),
           ('Middle English', 'bef', '牛肉', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300，义兼「牛」与「牛肉」）',
 'orig': '牛；牛肉',
 'path': [('牛；牛肉', '古法语时期', ''),
          ('牛肉', '现代', '与 cow 是同源双式（一个印欧根，cow 走本土线、beef 走法语线）：入英语时活牛死牛都指，后来活牛归 cow/ox，beef 专管盘子里的肉（由畜与肉兼指到专指肉）')],
 'mech': 'beef 是法语来的牛：牛在圈里叫 cow，上了桌叫 beef。',
 'link': '今天的意思「牛肉」是分工后的结果。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['coffee'] = {
 'chain': [('Arabic', 'qahwa', '咖啡', '阿拉伯语时期'),
           ('Turkish', 'kahve', '咖啡', '土耳其语时期'),
           ('Dutch', 'koffie', '咖啡', '荷兰语时期'),
           ('English', 'coffee', '咖啡', '约 1600 年')],
 'fa': '约 1600 年见载（Etymonline：c. 1600；早期拼形 chaoua 1598 年）',
 'orig': '咖啡',
 'path': [('咖啡', '阿拉伯语时期', ''),
          ('咖啡', '现代', '词随饮品走：阿拉伯 → 土耳其 → 意大利/荷兰 → 全欧。英格兰 1650 年代引入，1675 年全国咖啡馆逾三千家（借词随饮品扩散）')],
 'mech': 'coffee 是跟着咖啡豆旅行的名字：喝到哪儿，叫到哪儿。',
 'link': '今天的意思「咖啡」就是借入时的本义，一路没变。',
 'disp': 'qahwa 更深两说：阿拉伯语文学者系之于「酒」义一词；Etymonline 谓「或许更可能」出埃塞俄比亚 Kaffa 产地名（当地称 bunn），未定论。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['mango'] = {
 'chain': [('Dravidian', '*mām-kāy', '芒果（树与果）', '达罗毗荼语时期'),
           ('Tamil', 'māṅkāy', '芒果', '泰米尔语时期'),
           ('Portuguese', 'manga', '芒果', '葡萄牙语时期'),
           ('English', 'mango', '芒果', '1580 年代')],
 'fa': '1580 年代见载（Etymonline：1580s，义为芒果树的果实）',
 'orig': '芒果',
 'path': [('芒果', '泰米尔语时期', ''),
          ('芒果', '现代', '泰米尔语 māṅkāy 是「芒果树（mān）+ 果（kāy）」的复合：经马来语 mangga 与葡萄牙语 manga 入英（借词随果子）')],
 'mech': 'mango 是「树上的果」：泰米尔语的名字，跟着果子出了海。',
 'link': '今天的意思「芒果」就是借入时的本义，一路没变。',
 'disp': '词尾 -o 的来历未明（OED 明言 not certain）；入英或经马来语中介，两路并记。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['lion'] = {
 'chain': [('Ancient Greek', 'λέων (leōn)', '狮子', '古希腊时期'),
           ('Latin', 'leō', '狮子', '拉丁语时期'),
           ('Old French', 'lion', '狮子', '古法语时期'),
           ('Middle English', 'lyoun', '狮子', '中古英语时期')],
 'fa': '12 世纪晚期进入英语（Etymonline：late 12c.）',
 'orig': '狮子',
 'path': [('狮子', '古希腊时期', ''),
          ('狮子', '现代', '全欧通用的狮名：拉丁语借遍日耳曼语与欧洲诸语；古英语曾直借作 lēo，后被法语形取代（借词守恒）')],
 'mech': 'lion 是借遍欧洲的名字：哪里都没有本土狮子，名字都是进口的。',
 'link': '今天的意思「狮子」就是借入时的本义，一路没变。',
 'disp': '希腊语词出非印欧语言，或为闪米特语源（希伯来语 labhi「狮子」），Etymonline 作 perhaps，本档止于希腊语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {
 'midnight': 'compositional（主干复核后）：mid- + night 复合（古英语 midniht，日耳曼语 *midjanahts 同构），构件自明，本词不单独立档，保持待核',
 'eyebrow': 'compositional（主干复核后）：eye + brow 复合（15 世纪早期；同构的古英语 ēagbrǣw 本指「眼皮」），构件自明，本词不单独立档，保持待核',
}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
