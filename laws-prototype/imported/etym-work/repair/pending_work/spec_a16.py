# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['zebra'] = {
 'chain': [('Latin', 'equiferus', '野马', '拉丁语时期'),
           ('Vulgar Latin', '*eciferus', '野兽（马）', '通俗拉丁语时期'),
           ('Old Portuguese', 'enzebro', '野驴', '古葡萄牙语时期'),
           ('Portuguese', 'zebra', '斑马', '葡萄牙语时期'),
           ('English', 'zebra', '斑马', '约 1600 年')],
 'fa': '约 1600 年见载（Etymonline：c. 1600；牛津：17 世纪初）',
 'orig': '野驴',
 'path': [('野驴', '古葡萄牙语时期', ''),
          ('斑马', '现代', '名字本是伊比利亚半岛一种已灭绝野驴的：16 世纪欧洲人到了非洲，把同名安到条纹的斑马身上（由野驴转指斑马）')],
 'mech': 'zebra 是「野驴」的名字换了主人：旧主灭绝，新主是斑马。',
 'link': '今天的意思「斑马」是转借来的。',
 'disp': '平流层不确定（牛津：uncertain origin）：*eciferus ← equiferus 一线为传统说法（perhaps ultimately）；另有刚果语（OED 1989）、阿姆哈拉语（Klein）两说未决。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['dolphin'] = {
 'chain': [('Ancient Greek', 'δελφύς (delphýs)', '子宫', '古希腊时期'),
           ('Ancient Greek', 'δελφίς (delphís)', '海豚', '古希腊时期'),
           ('Latin', 'delphīnus', '海豚', '拉丁语时期'),
           ('Middle English', 'delphyn', '海豚', '中古英语时期')],
 'fa': '14 世纪中期进入英语（Etymonline：mid-14c.，作 dolfin）',
 'orig': '海豚',
 'path': [('海豚', '古希腊时期', ''),
          ('海豚', '现代', '名字与「子宫」（delphýs）同族：或取其胎生（不下蛋、直接生崽，在鱼里是异数），或取体态。古英语本名 mereswīn「海猪」被它取代（借词守恒）')],
 'mech': 'dolphin 是「子宫一家」的：因为它像哺乳动物一样生宝宝。',
 'link': '今天的意思「海豚」就是借入时的本义，一路没变。',
 'disp': '命名动机两解（胎生说/体态说），来源未在二者间裁决。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['goat'] = {
 'chain': [('Proto-Germanic', '*gaits', '山羊', '原始日耳曼语时期'),
           ('Old English', 'gāt', '母山羊', '古英语时期'),
           ('Middle English', 'goot', '山羊', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：gāt，义专指母山羊）',
 'orig': '母山羊',
 'path': [('母山羊', '古英语时期', ''),
          ('山羊', '现代', '古英语里公羊另有名字（bucca）：gāt 专指母羊，14 世纪晚期 he-goat、she-goat 分说立起，goat 才成通称（由母羊到通称）')],
 'mech': 'goat 原来只叫母的：公山羊是后来「借」给它的。',
 'link': '今天的意思「山羊」是雌雄通称化后的结果。',
 'disp': '日耳曼语层以下，Wiktionary 谓出底层语言；Etymonline 上溯 PIE *ghaid-o-「小山羊」，未一致，本档止于日耳曼语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['dress'] = {
 'chain': [('Latin', 'regere', '引直；统领', '拉丁语时期'),
           ('Latin', 'dīrigere', '弄直；指引', '拉丁语时期'),
           ('Vulgar Latin', '*dīrēctiāre', '弄直', '通俗拉丁语时期'),
           ('Old French', 'dresser', '整理；准备', '古法语时期'),
           ('Middle English', 'dressen', '穿衣服；连衣裙', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300，义为「弄直；烹调备膳」）',
 'orig': '弄直；整理',
 'path': [('弄直；整理', '古法语时期', ''),
          ('穿衣服；连衣裙', '现代', '「把直、摆正」一路泛化：摆桌、备菜、列队（military dress 至今存古义），14 世纪晚期「穿衣、装饰」义立，名词指衣（由整理到穿衣）')],
 'mech': 'dress 是「摆正」：把自己摆整齐了，就叫穿衣。',
 'link': '今天的意思「穿衣/裙子」是从「整理」里长出来的。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['taxi'] = {
 'chain': [('Latin', 'taxa', '税费；收费', '中世纪拉丁语时期'),
           ('German', 'Taxameter', '计价器', '1890 年'),
           ('French', 'taximètre', '计价器', '法语近现代'),
           ('English', 'taximeter cab', '计程车', '1907 年'),
           ('English', 'taxi', '出租车', '1907 年后')],
 'fa': '1907 年见载（Etymonline：1907，伦敦 3 月引入计程车）',
 'orig': '计程车（装计价器的车）',
 'path': [('计程车（装计价器的车）', '1907 年', ''),
          ('出租车，计程车', '现代', 'taximeter cab 的缩略：新词的卖点是车上的自动计价器（taxa「收费」+ meter「表」），车名先沾了表的光（由计价器车缩略）')],
 'mech': 'taxi 是「计价表车」的简称：先有表，才有车名。',
 'link': '今天的意思「出租车」是缩略后的全称义。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['truck'] = {
 'chain': [('Ancient Greek', 'τροχός (trokhós)', '轮子', '古希腊时期'),
           ('Latin', 'trochus', '铁环；轮', '拉丁语时期'),
           ('English', 'truckle', '小轮；滑轮', '中古英语时期'),
           ('English', 'truck', '卡车', '1610 年代')],
 'fa': '中古英语见「实心木轮」义（牛津）；车辆义 Etymonline 系 1610 年代「小实心轮」',
 'orig': '小实心轮',
 'path': [('小实心轮', '中古英语时期', ''),
          ('卡车，载重汽车', '现代', '轮（舰炮架下的小滚轮）→ 1774 年「载重的手推/马车」→ 1902 年美式英语 motor truck 缩略成汽车义（由轮到整车）')],
 'mech': 'truck 是「轮子」长成的车：先有轮，后有整辆车。',
 'link': '今天的意思「卡车」从「轮」提喻扩展而来。',
 'disp': 'truckle 缩略说两家均带保留（perhaps/probably）；主链走向一致。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['sand'] = {
 'chain': [('Proto-Germanic', '*samdaz', '沙', '原始日耳曼语时期'),
           ('Old English', 'sand', '沙', '古英语时期'),
           ('Middle English', 'sand', '沙', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：sand，自古英语即作「沙」解）',
 'orig': '沙',
 'path': [('沙', '古英语时期', ''),
          ('沙，沙子', '现代', '日耳曼语通名（德语 Sand、荷兰语 zand 同族）：细于砾石的水磨碎屑，本义至今（借词守恒式的稳定）')],
 'mech': 'sand 是日耳曼人自古的沙：名字几千年没动。',
 'link': '今天的意思「沙」就是本义，一路没变。',
 'disp': '日耳曼语层以下，与希腊语 psammos、拉丁语 sabulum 的关系有底层词说（de Vaan、Beekes），未定论，本档止于日耳曼语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['sky'] = {
 'chain': [('Proto-Indo-European', '*(s)kewH-', '遮盖', '原始印欧语时期'),
           ('Proto-Germanic', '*skiwją', '云；云层', '原始日耳曼语时期'),
           ('Old Norse', 'ský', '云', '古诺尔斯语时期'),
           ('Middle English', 'sky', '天，天空', '中古英语时期')],
 'fa': '13 世纪中期进入英语（Etymonline：mid-13c.，义为「云」）',
 'orig': '云',
 'path': [('云', '古诺尔斯语时期', ''),
          ('天，天空', '现代', '「遮盖」之根：云是盖在头顶的东西。约 1300 年「高空、天界」义立，顶替了本土词 heofon（heaven 退守宗教义）（由云到天空）')],
 'mech': 'sky 本来是「云」：云散开的地方，就是天。',
 'link': '今天的意思「天空」从「云」扩展而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
