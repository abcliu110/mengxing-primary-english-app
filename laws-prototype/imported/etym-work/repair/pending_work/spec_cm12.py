# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['natural'] = {
 'chain': [('Proto-Indo-European', '*ǵenh₁-', '出生；产生', '原始印欧语时期'),
           ('Latin', 'nāscor', '出生', '拉丁语时期'),
           ('Latin', 'nātūrālis', '与生俱来的', '拉丁语时期'),
           ('Old French', 'naturel', '天然的', '古法语时期'),
           ('Middle English', 'natural', '自然的', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300 naturel，义为「生来如此的性情」）',
 'orig': '与生俱来的',
 'path': [('与生俱来的', '约 1300 年', ''),
          ('自然的，天然的', '现代', '老根是「生」：生下来就有的性情 → 14 世纪早期指「自然界的」，约 1400 年指「非人工的」——从出生自带，扩到天地自生（由禀性到自然）')],
 'mech': 'natural 是「生出来的样子」：天生的，就是自然的。',
 'link': '今天的意思「自然的」从「与生俱来的」扩来：人天生，物也天生。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['feet'] = {
 'chain': [('Proto-Indo-European', '*pódes', '脚（复数）', '原始印欧语时期'),
           ('Proto-Germanic', '*fōtiz', '脚（复数）', '原始日耳曼语时期'),
           ('Old English', 'fēt', '脚（复数）', '古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与 Wiktionary 同载 fēt 为 foot 的古复数）',
 'orig': '脚（复数）',
 'path': [('脚（复数）', '古英语时期', ''),
          ('脚，双脚（foot 的复数）', '现代', 'foot 的古复数：不用加 -s，而是词根元音变音（i-变音）——fōt → fēt；这种「变个音就是复数」的老办法在德语 Füße 里也一样')],
 'mech': 'feet 是变了音的复数：foot 把 ō 唱成 ē，就成了两只脚。',
 'link': '今天的意思「双脚」就是古复数本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['teeth'] = {
 'chain': [('Proto-Indo-European', '*h₃dóntes', '牙齿（复数）', '原始印欧语时期'),
           ('Proto-Germanic', '*tanþiz', '牙齿（复数）', '原始日耳曼语时期'),
           ('Old English', 'tēþ', '牙齿（复数）', '古英语时期')],
 'fa': '古英语时期就已经有了（Wiktionary 载 tēþ 为 tōþ 的复数主格）',
 'orig': '牙齿（复数）',
 'path': [('牙齿（复数）', '古英语时期', ''),
          ('牙齿（tooth 的复数）', '现代', 'tooth 的古复数，同 feet 一例：靠词根元音变音（i-变音）成复数，不加 -s（老式复数存续）')],
 'mech': 'teeth 与 feet 同款：元音一变，单数变复数。',
 'link': '今天的意思「牙齿（复数）」就是古复数本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['men'] = {
 'chain': [('Proto-Germanic', '*manniz', '人（复数）', '原始日耳曼语时期'),
           ('Old English', 'menn', '人们', '古英语时期'),
           ('Middle English', 'men', '男人们', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与 Wiktionary 同载 menn「人们」）',
 'orig': '人们（man 的复数）',
 'path': [('人们（man 的复数）', '古英语时期', ''),
          ('男人们（man 的复数）', '现代', 'man 的古复数，同样靠 i-变音（a → e）；古英语晚期还可作不定代词「人们、有人」（老式复数存续）')],
 'mech': 'men 是 man 变了音的复数：a 唱成 e，人就多了。',
 'link': '今天的意思「男人们」即古复数，专指男性是 man 词义收窄后的结果。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['children'] = {
 'chain': [('Old English', 'ċildru', '孩子们', '古英语时期'),
           ('Middle English', 'childre', '孩子们', '中古英语时期'),
           ('Middle English', 'children', '孩子们', '中古英语时期')],
 'fa': '古英语时期已有复数 ċildru（Wiktionary 与 Etymonline 同载其演变）',
 'orig': '孩子们',
 'path': [('孩子们', '古英语时期', ''),
          ('孩子们，儿童（child 的复数）', '现代', '英语里罕见的「双复数」：古英语复数后缀 -ru（ċildru）先行，中古英语 childre 还不够，又叠加一层 -en——两个复数标记摞在一起，就是 children（复数叠加定型）')],
 'mech': 'children 是「复数 + 复数」：-ru 嫌不够，再加 -en。',
 'link': '今天的意思「孩子们」就是双复数本义，一路没变。',
 'disp': '方言里还存单层复数 childer（Etymonline 并记）。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['transport'] = {
 'chain': [('Proto-Indo-European', '*per-', '通过；带领', '原始印欧语时期'),
           ('Latin', 'portāre', '搬运', '拉丁语时期'),
           ('Latin', 'trānsportāre', '搬过界', '拉丁语时期'),
           ('Old French', 'transporter', '运送', '古法语时期'),
           ('Middle English', 'transporten', '运送', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c. transporten）',
 'orig': '搬运过界',
 'path': [('搬运过界', '拉丁语时期', ''),
          ('交通运输；运送', '现代', 'trans-「到对面」+ portāre「搬」：把东西搬到对岸去。约 1500 年生出「（感情）冲昏头」，1660 年代「流放（罪犯）」——搬人也是 transport（由搬物到搬人搬情）')],
 'mech': 'transport 是「搬到对面去」：货过去、人过去，都算。',
 'link': '今天的意思「运输」就是构词本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['import'] = {
 'chain': [('Latin', 'portāre', '搬运', '拉丁语时期'),
           ('Latin', 'importāre', '带入；进口', '拉丁语时期'),
           ('Middle English', 'importen', '进口', '中古英语时期')],
 'fa': '15 世纪早期进入英语（Etymonline：early 15c. importen，义为「表示、意味着」）',
 'orig': '带入（在英语里先作「意味着」）',
 'path': [('带入（在英语里先作「意味着」）', '15 世纪早期', ''),
          ('进口，输入', '现代', 'in-「入」+ portāre「搬」：奇怪的是英语先用它表「（话里）带进意思」即「意味着」（中世纪拉丁语已有此转义），1540 年代才有「从外国搬进货物」，1580 年代又有「要紧」（be important 与它同根同路）（由表意到搬货）')],
 'mech': 'import 是「往里搬」：先搬意思，后搬货物。',
 'link': '今天的意思「进口」从「带入」来：搬什么都行，先是意思，后是货。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['support'] = {
 'chain': [('Latin', 'portāre', '搬运', '拉丁语时期'),
           ('Latin', 'supportāre', '从下面托举；搬上来', '拉丁语时期'),
           ('Old French', 'supporter', '支撑；忍耐', '古法语时期'),
           ('Middle English', 'supporten', '支持', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c. supporten，义为「托住；忍耐」）',
 'orig': '从下面托住；忍耐',
 'path': [('从下面托住；忍耐', '14 世纪晚期', ''),
          ('支持，拥护，支撑', '现代', 'sub-「从下」+ portāre「搬」：在底下扛着。入英语时兼有「忍耐」义（牛津：原义即 tolerate）；15 世纪早期「供给生计」，1952 年「（球迷）支持球队」（由托物到撑人撑队）')],
 'mech': 'support 是「在底下扛着」：扛东西、扛人、扛球队，都是撑。',
 'link': '今天的意思「支持」从「托住」来：底下有人扛，上面才站得住。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
