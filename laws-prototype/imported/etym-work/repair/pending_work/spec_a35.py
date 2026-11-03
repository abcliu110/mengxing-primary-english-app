# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['bishop'] = {
 'chain': [('Proto-Indo-European', '*spek-', '观察', '原始印欧语时期'),
           ('Ancient Greek', 'σκοπός (skopós)', '看守者', '古希腊时期'),
           ('Ancient Greek', 'ἐπίσκοπος (epískopos)', '监督者', '古希腊时期'),
           ('Late Latin', 'episcopus', '主教', '晚期拉丁语时期'),
           ('Old English', 'bisceop', '主教', '古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：bisceop，义兼「主教、大祭司」）',
 'orig': '监督者',
 'path': [('监督者', '古希腊时期', ''),
          ('主教', '现代', 'epi-「在上」+ skopós「看的人」：希腊语里本是各级官员的头衔，教会接去作主教之名。英语 bishop 与法语 évêque 同出一源而面目全非（竟无一字母相同）（由监督到主教）')],
 'mech': 'bishop 是「在上面看着的人」：名字就是职责。',
 'link': '今天的意思「主教」从行政头衔「监督者」转化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['blanket'] = {
 'chain': [('Proto-Germanic', '*blankaz', '白的；闪亮的', '原始日耳曼语时期'),
           ('Old French', 'blanc', '白的', '古法语时期'),
           ('Old French', 'blanchet', '白色粗呢', '古法语时期'),
           ('Middle English', 'blanket', '毯子', '中古英语时期')],
 'fa': '约 1300 年见载（Etymonline：c. 1300，义为「粗白羊毛织物」兼「床盖大毯」）',
 'orig': '白色粗呢（布）',
 'path': [('白色粗呢（布）', '古法语时期', ''),
          ('毯子，毛毯', '现代', 'blanchet 是 blanc「白」的指小形：未染色的白呢裁成大块盖着，就是毯子——词义从布料的颜色走到织物的用途（由白布到毯子）')],
 'mech': 'blanket 是「白布」：没染色的呢子，盖在身上就成了毯。',
 'link': '今天的意思「毯子」从「白粗布」转化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['brilliant'] = {
 'chain': [('Ancient Greek', 'βήρυλλος (bḗryllos)', '绿柱石', '古希腊时期'),
           ('Latin', 'beryllus', '绿柱石', '拉丁语时期'),
           ('Italian', 'brillare', '闪耀', '意大利语时期'),
           ('French', 'brillant', '闪耀的', '法语近现代'),
           ('English', 'brilliant', '明亮的', '1680 年代')],
 'fa': '1680 年代见载（Etymonline：1680s，义为「闪烁着光泽的」）',
 'orig': '（如宝石般）闪亮的',
 'path': [('（如宝石般）闪亮的', '意大利语时期', ''),
          ('明亮的；才华横溢的', '现代', '多半出「像绿柱石一样发光」（*berillare）：钻石的一种切法同期亦叫 brilliant；1848 年「才华出众」比喻义立（由发光到出众）')],
 'mech': 'brilliant 是「宝石的光」：亮到耀眼，就是才华。',
 'link': '今天的意思「才华横溢」从「闪亮」比喻而来。',
 'disp': 'brillare 出 beryllus 一线为两家共同的或然说（probably/perhaps from VL *berillare），主干（法语 brillant ← 意大利语 brillare）一致。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['bush'] = {
 'chain': [('Proto-Germanic', '*busk-', '灌木；丛林', '原始日耳曼语时期'),
           ('Old English', '*bysċ', '灌木', '古英语时期'),
           ('Middle English', 'bush', '灌木', '中古英语时期')],
 'fa': '中古英语见载（古英语词仅见于地名，Etymonline 引 bysc）',
 'orig': '灌木',
 'path': [('灌木', '古英语时期', ''),
          ('灌木', '现代', '日耳曼通词（德语 Busch、荷兰语 bos 同族）：英语形式由本土线与法语 bois、中世纪拉丁语 busca（皆日耳曼出身）交汇加强（借词守恒式的稳定）')],
 'mech': 'bush 是日耳曼的「丛」：几条路带来的都是同一个词。',
 'link': '今天的意思「灌木」就是本义，一路没变。',
 'disp': '入英通道两家侧重不同（本土继承 + 法/拉丁汇合 vs 法语形 + 诺尔斯加强），主干同为日耳曼语 *busk「灌木」。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['butcher'] = {
 'chain': [('Proto-Indo-European', '*bʰuǵ-', '公羊；公山羊', '原始印欧语时期'),
           ('Proto-Germanic', '*bukkaz', '公山羊', '原始日耳曼语时期'),
           ('Old French', 'bouc', '公山羊', '古法语时期'),
           ('Old French', 'bochier', '屠夫', '古法语时期'),
           ('Middle English', 'bocher', '屠夫', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300，义为「为市场宰牲的人」）',
 'orig': '宰山羊的人',
 'path': [('宰山羊的人', '古法语时期', ''),
          ('屠夫；肉商', '现代', '字面多半是「宰公羊的」（bouc「公山羊」+ 职业尾）：古英语本名 flæscmangere「卖肉的」被它取代；1520 年代「残忍杀手」比喻义立（由宰羊到屠宰）')],
 'mech': 'butcher 是「宰羊的」：手艺从山羊身上练出来。',
 'link': '今天的意思「屠夫」从「宰山羊者」泛化而来。',
 'disp': '「宰羊」字面解作 probably（Etymonline）；bouc 的直接来源法兰克语或凯尔特语未分，主干一致。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['caffeine'] = {
 'chain': [('French', 'café', '咖啡', '法语近现代'),
           ('French', 'caféine', '咖啡因', '法语近现代'),
           ('English', 'caffeine', '咖啡因', '1817 年')],
 'fa': '1817 年见载（Etymonline：1817，作 caffein；词名首见于托马斯·汤姆森著述）',
 'orig': '咖啡（中的成分）',
 'path': [('咖啡（中的成分）', '1817 年', ''),
          ('咖啡因', '现代', '化学造词：coffee + 化学后缀 -ine——那种让咖啡提神的生物碱，就按出身命名（由来源命名）')],
 'mech': 'caffeine 是「咖啡里的那个 ine」：名字写明了出身。',
 'link': '今天的意思「咖啡因」就是造词时的本义。',
 'disp': '无已知争议（café 的上游见 coffee 条）',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['calf'] = {
 'chain': [('Proto-Indo-European', '*gel-', '膨胀', '原始印欧语时期'),
           ('Proto-Germanic', '*kalbaz', '幼兽', '原始日耳曼语时期'),
           ('Old English', 'ċealf', '小牛', '古英语时期'),
           ('Middle English', 'calf', '小牛', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：cealf）',
 'orig': '幼兽（小牛）',
 'path': [('幼兽（小牛）', '古英语时期', ''),
          ('小牛', '现代', 'Etymonline 谓或出「膨胀」之根：子宫、胎儿、幼崽一串——「肚子里鼓出来的」就是幼兽。1725 年起兼指海兽幼崽（由牛犊到幼兽）')],
 'mech': 'calf 或是「鼓起来的小东西」：还没生，先在肚子里鼓着。',
 'link': '今天的意思「小牛」就是本义，一路没变。',
 'disp': '深层 *gel- 说作 perhaps。同形词 calf「小腿肚」14 世纪初出古诺尔斯语 kalfi，来源未明（possibly 与本词同根，未证），别条登记，不并链。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['calm'] = {
 'chain': [('Ancient Greek', 'καῦμα (kaûma)', '（日间的）炎热', '古希腊时期'),
           ('Late Latin', 'cauma', '正午酷热', '晚期拉丁语时期'),
           ('Italian', 'calma', '宁静（好天气）', '意大利语时期'),
           ('Middle English', 'calm', '平静的', '中古英语时期')],
 'fa': '14 世纪晚期见载（Etymonline：late 14c.，义为海面「无风无浪」）',
 'orig': '正午酷热（万物静息时）',
 'path': [('正午酷热（万物静息时）', '晚期拉丁语时期', ''),
          ('平静的', '现代', '意大利的正午热得什么都不动：天气「静」下来就叫 calma。1560 年代心境义立（由天静到心静）')],
 'mech': 'calm 先是「热得发蔫的正午」：热到不动，就是平静。',
 'link': '今天的意思「平静」从地中海的午休时刻转化而来。',
 'disp': 'cauma 一线为或然说（Etymonline：probably；Wiktionary：of uncertain origin, may derive），牛津直书「经罗曼语出希腊语 kauma」，主干取此线，深层保留登记。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
