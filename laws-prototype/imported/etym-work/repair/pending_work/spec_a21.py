# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['onion'] = {
 'chain': [('Proto-Indo-European', '*oi-no-', '一；独一', '原始印欧语时期'),
           ('Latin', 'ūnus', '一', '拉丁语时期'),
           ('Latin', 'ūniō', '洋葱（一体）', '拉丁语时期'),
           ('Old French', 'oignon', '洋葱', '古法语时期'),
           ('Middle English', 'onyoun', '洋葱', '中古英语时期')],
 'fa': '12 世纪初进入英语（Etymonline：early 12c.，作 ungeon、unione）',
 'orig': '一体（层层合成的一个）',
 'path': [('一体（层层合成的一个）', '拉丁语时期', ''),
          ('洋葱', '现代', '乡土拉丁语的命名眼：洋葱层层裹成「一个整体」，不像大蒜分成瓣——ūniō 本义「统一、一」。同词亦指「珍珠」（一串洋葱式的串珠）（由一体到其物）')],
 'mech': 'onion 是「一」：不分瓣，裹成一个整的，就是它。',
 'link': '今天的意思「洋葱」得名于它的「不分家」。',
 'disp': '无已知争议',
 'folk': '未见流传假词源（德语 Zwiebel 的词形曾受民间词源改造，与本词无关，附记）', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['cabbage'] = {
 'chain': [('Latin', 'caput', '头', '拉丁语时期'),
           ('Old French', 'caboche', '头', '古法语时期'),
           ('Middle English', 'caboche', '卷心菜', '中古英语时期')],
 'fa': '15 世纪中期见载（Etymonline：mid-15c.，作 caboge；更早 caboche 14 世纪晚期）',
 'orig': '头',
 'path': [('头', '古法语时期', ''),
          ('卷心菜', '现代', '圆滚滚的「头」（法语方言里 caboche 亦直指此菜）：叶子裹成的头，就叫头（以形喻物）')],
 'mech': 'cabbage 是「长了个头」的菜：菜如其名。',
 'link': '今天的意思「卷心菜」得名于圆头形状。',
 'disp': 'caboche 本身出处各家不一：Etymonline 与 AHD 系之拉丁语 caput 指小形；牛津作 of unknown origin；另有 ca- + boce「肿包」说，主干（法语 caboche「头」）一致，深层止于登记。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['bean'] = {
 'chain': [('Proto-Germanic', '*baunō', '豆', '原始日耳曼语时期'),
           ('Old English', 'bēan', '豆', '古英语时期'),
           ('Middle English', 'bene', '豆子', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：bēan）',
 'orig': '豆',
 'path': [('豆', '古英语时期', ''),
          ('豆子', '现代', '日耳曼语通词（德语 Bohne、荷兰语 boon 同族）：约 1300 年起喻「不值钱的小东西」（a hill of beans）（借词守恒式的稳定）')],
 'mech': 'bean 是日耳曼人的豆：名字古老，本义没动。',
 'link': '今天的意思「豆子」就是本义，一路没变。',
 'disp': '日耳曼语层以下：de Vaan 谓意、斯拉夫、日耳曼三支或是各自从欧洲底层词 *bab-「豆」借入；Watkins 拟重叠印欧根，未一致，本档止于日耳曼语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['yogurt'] = {
 'chain': [('Turkic', '*yoɣ-', '凝结；揉', '突厥语时期'),
           ('Ottoman Turkish', 'yoğurt', '酸奶', '奥斯曼土耳其语时期'),
           ('English', 'yogurt', '酸奶', '1620 年代')],
 'fa': '1620 年代见载（Etymonline：1620s，作 yughurd）',
 'orig': '酸奶（凝结之物）',
 'path': [('酸奶（凝结之物）', '奥斯曼土耳其语时期', ''),
          ('酸奶', '现代', '词根 yoğ 约「使凝结」（与 yoğur「揉捏」同族）：奶凝住了，就是它（借词守恒）')],
 'mech': 'yogurt 是「凝住的奶」：做法写在名字里。',
 'link': '今天的意思「酸奶」就是借入时的本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['menu'] = {
 'chain': [('Proto-Indo-European', '*mei-', '小', '原始印欧语时期'),
           ('Latin', 'minuere', '使变小', '拉丁语时期'),
           ('Latin', 'minūtus', '细小的', '拉丁语时期'),
           ('French', 'menu', '细目', '法语近现代'),
           ('English', 'menu', '菜单', '1837 年')],
 'fa': '1837 年见载（Etymonline：1837，义为「席上菜肴的细目单」）',
 'orig': '细目（小而详尽）',
 'path': [('细目（小而详尽）', '法语时期', ''),
          ('菜单', '现代', 'menu 本是形容词「细小、详尽」：menu de repas 是「一餐的细清单」。1889 年泛指任何细目，1967 年添计算机义（由细小到清单）')],
 'mech': 'menu 是「小字细目」：菜太多了，得列细单。',
 'link': '今天的意思「菜单」就是本义的定型。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['order'] = {
 'chain': [('Proto-Italic', '*ordn-', '排；列', '原始意大利语时期'),
           ('Latin', 'ōrdō', '（织机上的）一排线', '拉丁语时期'),
           ('Old French', 'ordre', '秩序；等级', '古法语时期'),
           ('Middle English', 'ordre', '顺序', '中古英语时期')],
 'fa': '约 1200 年进入英语（Etymonline：c. 1200，义为「守教规的团体」）',
 'orig': '一排线；行列',
 'path': [('一排线；行列', '拉丁语时期', ''),
          ('顺序；点餐（订单）', '现代', '本义是织机上一排待织的线：万事排成队——等级、次序（14 世纪晚期）、命令（1540 年代）、订购单皆由此生（由行列到秩序诸义）')],
 'mech': 'order 是「排成行」：线排齐了，才织得出布。',
 'link': '今天「顺序/订单」诸义同出一源：排队。',
 'disp': '意大利语层以下未明（Watkins 谓或是 *ar-「契合」变体，de Vaan 称语义上可取），本档止于原始意大利语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['parent'] = {
 'chain': [('Proto-Indo-European', '*pere-', '产生；生出', '原始印欧语时期'),
           ('Latin', 'parere', '生育；产生', '拉丁语时期'),
           ('Latin', 'parēns', '生育者（父母）', '拉丁语时期'),
           ('Middle English', 'parent', '父或母', '中古英语时期')],
 'fa': '15 世纪初见载（Etymonline：early 15c.；姓氏用例 12 世纪晚期）',
 'orig': '生育者',
 'path': [('生育者', '拉丁语时期', ''),
          ('父或母（双亲）', '现代', 'parēns 是 parere「生、产」的分词名词化：生你的人。约 1500 年后顶替本土词 elder（借词守恒）')],
 'mech': 'parent 是「生你的人」：词义就写在动作里。',
 'link': '今天的意思「父母」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['people'] = {
 'chain': [('Latin', 'populus', '民众；国民', '拉丁语时期'),
           ('Old French', 'pople', '民众', '古法语时期'),
           ('Middle English', 'peple', '人们', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300）',
 'orig': '民众；国民',
 'path': [('民众；国民', '拉丁语时期', ''),
          ('人们', '现代', '入英语后挤走本土 folk 等词：初作集合单数用（圣经译本 the people is），后复数义定型（借词守恒）')],
 'mech': 'people 是「一国之众」：拉丁语的老词，法语带进来的。',
 'link': '今天的意思「人们」就是借入时的本义，一路没变。',
 'disp': 'populus 本身来源未明（Etymonline：a word of unknown origin）；de Vaan 谓原意大利语根义为「军队」，另有伊特鲁里亚说，未定论，本档止于拉丁语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
