# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['incredible'] = {
 'chain': [('Latin', 'incrēdibilis', '不可信的', '拉丁语时期'),
           ('Middle English', 'incredible', '难以置信的', '中古英语时期')],
 'fa': '15 世纪早期进入英语（Etymonline：early 15c.；约 1400 年另有一已废义「不轻信的」）',
 'orig': '不可信的',
 'path': [('不可信的', '拉丁语时期', ''),
          ('难以置信的；极好的', '现代', 'in-「不」＋ credibilis「值得信的」：好到、怪到没法信；口语里再顺势夸成「极好的」——难以置信到极点，就是绝佳（程度义的口语升级）')],
 'mech': 'incredible 是「信不了」：好得让人不敢信，就是极好的。',
 'link': '今天的意思「难以置信的」就是拉丁语原义；「极好的」是它在口语里的夸张用法。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['separate'] = {
 'chain': [('Latin', 'sēparāre', '拉开；分开', '拉丁语时期'),
           ('Middle English', 'separaten', '分开', '中古英语时期')],
 'fa': '15 世纪早期进入英语（Etymonline：early 15c.）',
 'orig': '拉开；分开',
 'path': [('拉开；分开', '拉丁语时期', ''),
          ('分开；分开的', '现代', 'se-「分开」＋ parare「备置」：把备在一起的东西拆开；词义守恒，1630 年代添自动义「（东西）分离」、1680 年代「（人）分开」（借词后词性扩展）')],
 'mech': 'separate 是「拆开」：黏在一起的，拉开来，就是分开。',
 'link': '今天的意思「分开」就是拉丁语原义，一路没变。',
 'disp': 'sever 与本词同源异途（经法语的双式词，Etymonline 注明）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['signature'] = {
 'chain': [('Latin', 'signāre', '作记号；签署', '拉丁语时期'),
           ('Medieval Latin', 'signātūra', '签署；印模', '中世纪拉丁语时期'),
           ('Middle French', 'signature', '签名', '中古法语时期')],
 'fa': '1530 年代进入英语（先作苏格兰法律术语，Etymonline 与牛津同载）',
 'orig': '印模；签署',
 'path': [('印模；签署', '中世纪拉丁语时期', ''),
          ('签名', '现代', '古典拉丁语里 signatura 指印章的模子；中世纪作「签署、诏令」；1530 年代作苏格兰法律文件入英语，1570 年代定型为「亲手写下的自己名字」——从打记号到落笔签名（记号的具体化）')],
 'mech': 'signature 是「作记号」的成果：自己亲手作的那个记号，就是签名。',
 'link': '今天的意思「签名」从「签署、印记」定型：官印的印记，落到个人笔下。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['solitary'] = {
 'chain': [('Latin', 'sōlitārius', '独自的', '拉丁语时期'),
           ('Middle English', 'solitarie', '独自的', '中古英语时期')],
 'fa': '14 世纪中期进入英语（Etymonline：mid-14c.，经盎格鲁-法语）',
 'orig': '独自的',
 'path': [('独自的', '拉丁语时期', ''),
          ('独自的，唯一的', '现代', 'solus「独自一个」派生：人独自 → 地方偏僻无人（14 世纪晚期）→ 数目上「唯一的」（1742）——从状态到数量的收窄')],
 'mech': 'solitary 是「一个人」：一个人待着，一个人存在，都是它。',
 'link': '今天的意思「独自的」就是拉丁语原义；「唯一的」是它后添的一支。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['specimen'] = {
 'chain': [('Latin', 'specimen', '标记；范例；证据', '拉丁语时期'),
           ('English', 'specimen', '样品；标本', '1610 年代')],
 'fa': '1610 年代进入英语（初义「范式、模型」，今已废；Etymonline 与牛津同载）',
 'orig': '标记；范例',
 'path': [('标记；范例', '拉丁语时期', ''),
          ('样品；标本', '现代', 'specere 是「看」：给人看、凭它认识事物的那一份——1650 年代定型为「作为一类之代表的单个样本」，1765 年起专指动植物、矿物标本（由展示到取样）')],
 'mech': 'specimen 是「拿给人看的那一份」：看它一个，知它一类。',
 'link': '今天的意思「标本」从「范例、标记」定型：代表整类的那一个。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['stupidity'] = {
 'chain': [('Latin', 'stupiditās', '迟钝；愚蠢', '拉丁语时期'),
           ('English', 'stupidity', '愚蠢', '1540 年代')],
 'fa': '1540 年代进入英语（Etymonline：1540s）',
 'orig': '迟钝；愚蠢',
 'path': [('迟钝；愚蠢', '拉丁语时期', ''),
          ('愚蠢', '现代', '词义守恒：st upidus 本兼「惊呆的」与「迟钝的」，其名词 stupiditas 以「迟钝、愚蠢」借入（借词）')],
 'mech': 'stupidity 是 stupid 的拉丁名词形：脑子钝，就是愚蠢。',
 'link': '今天的意思「愚蠢」就是拉丁语原义，一路没变。',
 'disp': '牛津词源栏缓存为空，本档由 Etymonline 与 Wiktionary 互证。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
