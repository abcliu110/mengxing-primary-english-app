# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['fly'] = {
 'chain': [('Proto-Indo-European', '*plew-', '流动；飞', '原始印欧语时期'),
           ('Proto-Germanic', '*fleuganą', '飞', '原始日耳曼语时期'),
           ('Old English', 'flēogan', '飞', '古英语时期'),
           ('Middle English', 'flien', '飞', '中古英语时期')],
 'fa': '古英语时期就已经有了（牛津词源栏以古英语 flēogan 起头）',
 'orig': '流动；飞',
 'path': [('流动；飞', '原始印欧语时期', ''),
          ('飞', '现代', '印欧词根 *plew- 本管「流动、飞、奔跑」一串快速移动，日耳曼语这一支专走「飞」：鸟和昆虫离地而行（词义专化）')],
 'mech': 'fly 的老根是「快速地动」：水流动、鸟飞翔本是一回事，后来它专管「飞」。',
 'link': '今天的意思「飞」是从「流动；飞」专化来的，流动那一面退出了这个词。',
 'disp': '同形分立登记：名词 fly「苍蝇」是同根的另一个词（古英语 flēoge「会飞的（虫）」），本档只记动词「飞」。印欧词根 Wiktionary 作 *plewk-，Watkins 作 *pleu-，同根异构。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['cold'] = {
 'chain': [('Proto-Indo-European', '*gel-', '冷；结冰', '原始印欧语时期'),
           ('Proto-Germanic', '*kaldaz', '冷的', '原始日耳曼语时期'),
           ('Old English', 'cald', '冷的', '古英语时期'),
           ('Middle English', 'cold', '冷的', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 cald 起头）',
 'orig': '冷；结冰',
 'path': [('冷；结冰', '原始印欧语时期', ''),
          ('冷的', '现代', '主干义稳定：温度低。古英语晚期已引申「（态度）冷淡」，14 世纪中添「（尸体般）凉透的」等支义，核心没动（词义稳定，外围扩展）')],
 'mech': 'cold 的老根 *gel- 就是「冷到结冰」，拉丁语 gelu「霜」是它的亲戚。',
 'link': '今天的意思「冷的」就是最早的意思，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['when'] = {
 'chain': [('Proto-Germanic', '*hwan', '在什么时候', '原始日耳曼语时期'),
           ('Old English', 'hwonne', '何时', '古英语时期'),
           ('Middle English', 'whanne', '何时', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 词条以古英语 hwænne/hwonne 起头）',
 'orig': '在什么时候；何时',
 'path': [('在什么时候；何时', '原始日耳曼语时期', ''),
          ('什么时候；当……时', '现代', '疑问用法（问时间）13 世纪早期确立；连词「当……时」古英语晚期已有——问时间的词转职引导时间从句（功能引申），核心义没变')],
 'mech': 'when 出在疑问代词的老词干上：问「什么」的一家，把管时间的那个分出来，就是 when。',
 'link': '今天的意思「什么时候」就是最早的意思，一路没变。',
 'disp': '印欧层为疑问/关系代词词干：Etymonline 与牛津作 *kwo-，Wiktionary 具体作 *kʷís，同属一系，不影响主干。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk', 'ox'], 'grade': 'et_wk_ox'}
S['brown'] = {
 'chain': [('Proto-Indo-European', '*bher-', '明亮的；棕色的', '原始印欧语时期'),
           ('Proto-Germanic', '*brūnaz', '棕色的；暗色的', '原始日耳曼语时期'),
           ('Old English', 'brūn', '暗色的；昏暗的', '古英语时期'),
           ('Middle English', 'broun', '棕色的', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 词条以古英语 brun 起头）',
 'orig': '暗色的；昏暗的',
 'path': [('暗色的；昏暗的', '古英语时期', ''),
          ('棕色的', '现代', '古英语 brūn 先泛指「暗、昏暗」（也带「闪光」一面），13 世纪起颜色义定型，专指棕色（词义专化）')],
 'mech': 'brown 先只是「暗」：暗色里最常见的那一档，慢慢就被它专名占住了。',
 'link': '今天的意思「棕色的」是从「暗色的」专化来的：先是泛泛的暗，后专指棕。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk', 'ox'], 'grade': 'et_wk_ox'}
S['first'] = {
 'chain': [('Proto-Indo-European', '*per-', '向前；在……之前', '原始印欧语时期'),
           ('Proto-Germanic', '*furistaz', '最先的；居首的', '原始日耳曼语时期'),
           ('Old English', 'fyrest', '最先的；居首的', '古英语时期'),
           ('Middle English', 'first', '第一', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 fyrst 起头）',
 'orig': '最先的；居首的',
 'path': [('最先的；居首的', '古英语时期', ''),
          ('第一', '现代', 'first 本是 fore「在前」的最高级：在所有人前面，就是第一；义一路稳定。同源的德语 Fürst「君主」正是「（生而）居首者」——排第一的人成了王（同源词旁证）')],
 'mech': 'first 是 fore 的最高级：站在最前面的，就是第一名。',
 'link': '今天的意思「第一」就是最早的「最先的；居首的」，一路没变。',
 'disp': '古英语更常用的最高级本是 forma（后作中古英语 firme，已佚），fyrest 是同义的另一构形（Etymonline 注明）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {'jump': 'trunk_divergent（主干复核后）：Wiktionary 主张源于原始日耳曼语 *gumbōną「蹦跳」（经中古低地德语或古诺斯语传入），Etymonline 与牛津（据 OED）则认为该词 1520 年代才在英语出现、无更早来源、很可能是拟声造词，德语同源关系无据；两说在主干上对立，保持待核'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
