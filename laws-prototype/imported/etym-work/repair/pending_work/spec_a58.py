# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['philosophy'] = {
 'chain': [('Ancient Greek', 'φίλος (phílos)', '爱的；亲爱的', '古希腊时期'),
           ('Ancient Greek', 'σοφία (sophía)', '智慧', '古希腊时期'),
           ('Ancient Greek', 'φιλοσοφία (philosophía)', '对智慧的爱', '古希腊时期'),
           ('Middle English', 'philosophie', '哲学', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300，义为「知识、学问、学术著作」）',
 'orig': '对智慧的爱（求知）',
 'path': [('对智慧的爱（求知）', '古希腊时期', ''),
          ('哲学', '现代', '中世纪时它包揽一切思辨之学（连炼金术都算）：1794 年现代义「最根本事理之学」定型（由博学到哲学）')],
 'mech': 'philosophy 是「爱智慧」：不是拥有，是追求。',
 'link': '今天的意思「哲学」就是本义的定型。',
 'disp': 'sophía 本身来源未明（Beekes，经 Etymonline），本档止于希腊语复合层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['pickle'] = {
 'chain': [('Middle Dutch', 'pekel', '盐卤', '中古荷兰语时期'),
           ('Middle English', 'pikel', '泡菜', '中古英语时期')],
 'fa': '约 1400 年见载（Etymonline：c. 1400，义为「配肉的辣味酱汁」；14 世纪初已作姓氏）',
 'orig': '辣味酱汁（盐卤汁）',
 'path': [('辣味酱汁（盐卤汁）', '中古荷兰语时期', ''),
          ('泡菜；腌制的菜', '现代', '词先指卤汁（约 1500 年「腌肉的盐水」），1707 年转指泡在汁里的黄瓜——汁的名，菜来领（由汁到菜）')],
 'mech': 'pickle 先是那锅汁：菜是来蹭名字的。',
 'link': '今天的意思「泡菜」从卤汁转指所泡之物。',
 'disp': '低地德语区 pekel 终极来源未明（牛津：of unknown ultimate origin）；Klein 拟「中世纪荷兰渔夫之名」一说属推测，登记不采。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['picturesque'] = {
 'chain': [('Latin', 'pictor', '画家', '拉丁语时期'),
           ('Italian', 'pittoresco', '画家式的', '意大利语时期'),
           ('French', 'pittoresque', '如画的', '法语近现代'),
           ('English', 'picturesque', '风景如画的', '1703 年')],
 'fa': '1703 年见载（Etymonline：1703，义为「如画的、别致悦目的」）',
 'orig': '画家式的（如画的）',
 'path': [('画家式的（如画的）', '意大利语时期', ''),
          ('风景如画的；生动的', '现代', '经法语入英：1734 年「（语言）生动的」义；拼写 -tt- 变 -ct- 是受 picture 牵引（由画家式到如画）')],
 'mech': 'picturesque 是「画家眼里的」：值得入画，就是它。',
 'link': '今天的意思「如画」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '拼写 -ct- 系受 picture 类推的改形（牛津明记），属有记录的类推重塑', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['pleasant'] = {
 'chain': [('Latin', 'placēre', '被接受；取悦', '拉丁语时期'),
           ('Old French', 'plaisant', '讨喜的', '古法语时期'),
           ('Middle English', 'plesaunte', '令人愉快的', '中古英语时期')],
 'fa': '14 世纪晚期见载（Etymonline：late 14c.，义含「为上帝所喜悦的」）',
 'orig': '讨人喜欢的',
 'path': [('讨人喜欢的', '拉丁语时期', ''),
          ('令人愉快的；舒适的', '现代', 'plaisir「取悦」的分词：取悦感官、取悦心智（借词守恒）')],
 'mech': 'pleasant 是「正在讨喜的」：please 的分词脸。',
 'link': '今天的意思「愉快」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
# 拼写变体记录（plow 的英式拼写）
S['plough'] = {
 'chain': [('Proto-Germanic', '*plōgaz', '犁；犁地', '原始日耳曼语时期'),
           ('Old English', 'plōh', '犁地（计量）', '古英语时期'),
           ('Old Norse', 'plógr', '犁（农具）', '古诺尔斯语时期'),
           ('Middle English', 'plouh', '犁', '中古英语时期')],
 'fa': '古英语晚期见载（牛津：late OE plōh）',
 'orig': '犁地（的计量）；犁',
 'path': [('犁地（的计量）；犁', '原始日耳曼语时期', ''),
          ('犁；耕地', '现代', '古英语 plōh 本指「一犁之地」（面积单位），农具义随诺尔斯语 plógr 坐实；拼写 plough 1700 年以来为英格兰定式（OED），美式作 plow（拼写变体记录）')],
 'mech': 'plough 先是「一块地」：犁过多少，就是多大的地。',
 'link': '今天的意思「犁」是计量词转指农具的结果。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['pneumonia'] = {
 'chain': [('Proto-Indo-European', '*plew-', '漂浮；流动', '原始印欧语时期'),
           ('Ancient Greek', 'πνεύμων (pneúmōn)', '肺', '古希腊时期'),
           ('Ancient Greek', 'πνευμονία (pneumonía)', '肺病', '古希腊时期'),
           ('English', 'pneumonia', '肺炎', '约 1600 年')],
 'fa': '约 1600 年见载（Etymonline：c. 1600，经现代拉丁语）',
 'orig': '肺病',
 'path': [('肺病', '古希腊时期', ''),
          ('肺炎', '现代', 'pneúmōn「肺」出「漂浮」根——肺轻，能浮在水上，希腊人验尸即以此辨肺（医学借词）')],
 'mech': 'pneumonia 是「肺的病」：词首 p 照例不发音。',
 'link': '今天的意思「肺炎」就是借词原义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['post'] = {
 'chain': [('Latin', 'pōnere', '放置', '拉丁语时期'),
           ('Latin', 'positus', '被安放的', '拉丁语时期'),
           ('Italian', 'posta', '驿站', '意大利语时期'),
           ('French', 'poste', '驿站；邮政', '法语近现代'),
           ('English', 'post', '邮政', '16 世纪')],
 'fa': '16 世纪见载（Etymonline：post「驿站」义 1590 年代，本是军事驻地义；法语 poste 16 世纪已指驿马站）',
 'orig': '驿站（换马中继处）',
 'path': [('驿站（换马中继处）', '意大利语时期', ''),
          ('邮政；张贴', '现代', 'posta 是「（马）被安放之处」：驿路上每站驻人换马、接力送信（Wiktionary 引定义「沿驿道分段驻守、接力传递信件文书的人」）——邮政就是驿传的后代；「张贴」义是把告示「放」上柱子另线（由驿站到邮政）')],
 'mech': 'post 是「安放」：马放在站里，信就跑起来了。',
 'link': '今天的意思「邮政」从驿传制度转来。',
 'disp': '同形异词：「柱子」义 post 出拉丁语 postis「门柱」，为另一词，本条只记邮政线。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}

R = {'pitch': 'origin_unknown（主干复核后）：词库义项为投掷/音高一线（pitch v.1/n.1）；牛津明言此线「或许关联古英语 picung，终极来源未明，词义演变晦暗」（of unknown ultimate origin; sense development obscure），Etymonline 亦称诸义项间关联 obscure，无互证主干。沥青义 pitch（出拉丁语 pix）为同形异词，不属本义项，保持待核'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
