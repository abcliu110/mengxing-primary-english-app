# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['safety'] = {
 'chain': [('Proto-Indo-European', '*sol-', '完整；无恙', '原始印欧语时期'),
           ('Latin', 'salvus', '平安无恙的', '拉丁语时期'),
           ('Medieval Latin', 'salvitās', '平安', '中世纪拉丁语时期'),
           ('Old French', 'sauvete', '平安；保障', '古法语时期'),
           ('Middle English', 'savete', '安全', '中古英语时期')],
 'fa': '14 世纪早期进入英语（Etymonline：early 14c. savete）',
 'orig': '免于伤害（平安无恙）',
 'path': [('免于伤害（平安无恙）', '14 世纪早期', ''),
          ('安全，平安', '现代', '老根是「完整、没破损」：人没伤、东西没坏，就是 safe；14 世纪晚期又指「保平安的器具」（safeguard 一路）（由状态到器具）')],
 'mech': 'safety 是「完好无损」：没伤着，就是安全。',
 'link': '今天的意思「安全」就是本义「无恙」，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['partner'] = {
 'chain': [('Latin', 'partītiō', '划分；分份', '拉丁语时期'),
           ('Old French', 'parçon', '份额', '古法语时期'),
           ('Old French', 'parçonier', '共同继承人；合伙人', '古法语时期'),
           ('Middle English', 'partener', '伙伴', '中古英语时期')],
 'fa': '约 1300 年见载（Etymonline：c. 1300 partiner）',
 'orig': '分份者（共同继承人）',
 'path': [('分份者（共同继承人）', '约 1300 年', ''),
          ('搭档，伙伴', '现代', '本词本是 parcener「共同分家产的人」：分同一份的人就是伙伴；英语里因联想到 part 把首音节改成了 part-（民间联想改形，来源书明载）；商业合伙义 1520 年代，配偶义 1749 年')],
 'mech': 'partner 是「分同一份的人」：同分一份，自然是伙伴。',
 'link': '今天的意思「伙伴」从「共分者」来：先分，后伴。',
 'disp': '另或出古法语 part tenour「持份者」（Etymonline 并记），主干一致。',
 'folk': '首音节 part- 是说话人联想 part 造成的改形——来源书明载的「望文生改」，非词源本身，已如实登记。', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['movie'] = {
 'chain': [('English', 'moving picture', '活动电影', '1896 年'),
           ('English', 'movie', '电影', '1912 年')],
 'fa': '1912 年见载（Etymonline：1912，或 1908；美语）',
 'orig': '活动电影',
 'path': [('活动电影', '1896 年', ''),
          ('电影', '现代', 'moving picture「会动的画」截短加 -ie 成 movie：新发明先有全名，再有昵称式短名（截短造词）')],
 'mech': 'movie 是 moving picture 的短名：会动的画，叫顺口了。',
 'link': '今天的意思「电影」就是截短时的本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['centre'] = {
 'chain': [('Ancient Greek', 'κέντρον (kentron)', '尖点；圆规的定点', '古希腊时期'),
           ('Latin', 'centrum', '中心', '拉丁语时期'),
           ('French', 'centre', '中心', '法语近现代'),
           ('Middle English', 'centre', '中心', '中古英语时期')],
 'fa': '中古英语晚期进入英语（牛津：late Middle English，经法语 centre 或直承拉丁语 centrum）',
 'orig': '尖点；圆规的定点',
 'path': [('尖点；圆规的定点', '古希腊时期', ''),
          ('中心，中央', '现代', 'kentron 出自动词 kentein「刺」：画圆时圆规不动的那只尖脚扎住的点，就是圆心；后泛指一切中心（由定点到泛指中心）。本词为 center 的英式拼写')],
 'mech': 'centre 是圆规扎住的那个点：圆心，就是中心。',
 'link': '今天的意思「中心」从「圆规定点」泛化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['bed'] = {
 'chain': [('Proto-Germanic', '*badją', '安息处；地块', '原始日耳曼语时期'),
           ('Old English', 'bedd', '床；苗圃', '古英语时期'),
           ('Middle English', 'bed', '床', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 bedd 起头）',
 'orig': '床；苗圃',
 'path': [('床；苗圃', '古英语时期', ''),
          ('床', '现代', '古英语里 bedd 一词两用：睡的床与种的地（丹麦语 bed 至今只剩「苗圃」义）；河床义 1580 年代、地层义 1680 年代都是「平展的底层」引申')],
 'mech': 'bed 是「铺平了躺/种的一块地方」：床和苗圃本是一家。',
 'link': '今天的意思「床」是古义的一半：另一半「苗圃」在 flower bed 里还活着。',
 'disp': '更深或接印欧语根 *bʰedʰ-「挖」（谓睡处为挖出的凹地），Boutkan 存疑（谓日耳曼人未必掘地而眠），Etymonline 亦作「或许」；本档链止于日耳曼语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['bicycle'] = {
 'chain': [('Ancient Greek', 'κύκλος (kyklos)', '圆；轮', '古希腊时期'),
           ('French', 'bicycle', '双轮车', '1847 年'),
           ('English', 'bicycle', '自行车', '1868 年')],
 'fa': '1868 年见载（Etymonline 与 Wiktionary 同载，法语 1847 年先行）',
 'orig': '双轮（车）',
 'path': [('双轮（车）', '1847 年', ''),
          ('自行车，脚踏车', '现代', 'bi-「二」+ kyklos「轮」：两个轮子的车。词与车一同顶替了旧名 velocipede（新造词随新器物定型）')],
 'mech': 'bicycle 是「两只轮子」：数轮子起的名字。',
 'link': '今天的意思「自行车」就是造词本义，一路没变。',
 'disp': '是否经法语入英小有分歧（个别词典谓或为英语自造，然 1868 年引文皆在法国语境），主干一致。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['close'] = {
 'chain': [('Proto-Indo-European', '*klau-', '钩；栓', '原始印欧语时期'),
           ('Latin', 'claudere', '关闭；堵住', '拉丁语时期'),
           ('Old French', 'clos', '关住的', '古法语时期'),
           ('Middle English', 'closen', '关闭', '中古英语时期')],
 'fa': '约 1200 年见载动词（Etymonline：c. 1200 close (v.)）',
 'orig': '关住的',
 'path': [('关住的', '拉丁语时期', ''),
          ('关，关闭；靠近的', '现代', '老根是「钩、门栓」：栓上就是关。形容词的「近」义出自「关得严、没缝隙」一线：1520 年代有「走近」义，门关紧无缝 → 距离小 → 关系亲密（由封严到贴近）')],
 'mech': 'close 的老根是门栓：栓紧了没缝，所以「近」。',
 'link': '今天的意思「关」与「靠近」同源：关严实了，就是贴得近。',
 'disp': '动词亦部分承古英语 beclysan「关入」（Etymonline 并记），主干为拉丁语一线。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['world'] = {
 'chain': [('Proto-Germanic', '*weraldiz', '人的时代；人生', '原始日耳曼语时期'),
           ('Old English', 'weorold', '人生世事；世界', '古英语时期'),
           ('Middle English', 'world', '世界', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏同载复合词源）',
 'orig': '人的时代（人生世事）',
 'path': [('人的时代（人生世事）', '古英语时期', ''),
          ('世界，天下，地球', '现代', 'wer「人」+ ald「时代」的复合词：字面是「人的年岁」。古英语里它指人间生活与尘世（与来世相对），并不指大地；约 1200 年扩指物理世界，1713 年有「行星」义（由人生到宇宙的扩展）')],
 'mech': 'world 是「人的时代」：先有人间，后有世界。',
 'link': '今天的意思「世界」从「人生世事」扩来：人住的地方，慢慢成了整个世界。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
