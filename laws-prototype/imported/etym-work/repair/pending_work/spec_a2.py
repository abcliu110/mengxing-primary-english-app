# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['elephant'] = {
 'chain': [('Ancient Greek', 'ἐλέφᾱς (elephas)', '大象；象牙', '古希腊时期'),
           ('Latin', 'elephantus', '大象', '拉丁语时期'),
           ('Old French', 'olifant', '大象', '古法语时期'),
           ('Middle English', 'olyfaunt', '大象', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300 olyfaunt）',
 'orig': '大象；象牙',
 'path': [('大象；象牙', '古希腊时期', ''),
          ('大象', '现代', '希腊语里象与象牙同名；英语先作 olyfaunt 入境，1550 年后按拉丁语原形改拼 elephant（借词回拉丁化）')],
 'mech': 'elephant 是象牙的名字先行：牙与象，在希腊语里是一个词。',
 'link': '今天的意思「大象」就是本义，一路没变。',
 'disp': '希腊语词本身或为外来词，或经腓尼基语转手：柏柏尔语 *eḷu、古埃及语 ꜣbw 诸说并存（Wiktionary 与 Etymonline 并记），本档止于希腊语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['panda'] = {
 'chain': [('Nepali', 'nigálya-pónya', '小熊猫（当地名）', '尼泊尔语时期'),
           ('French', 'panda', '熊猫', '法语近现代'),
           ('English', 'panda', '大熊猫', '1835 年')],
 'fa': '1835 年见载（Etymonline：1835，指今称小熊猫的动物）',
 'orig': '小熊猫（尼泊尔土名）',
 'path': [('小熊猫（尼泊尔土名）', '尼泊尔语时期', ''),
          ('大熊猫', '现代', 'panda 或取自尼泊尔、锡金一带土名 nigálya-pónya 的后半（霍奇森记录）：1835 年入英语时指小熊猫；大熊猫 1869 年被发现后先称「杂色熊」，1901 年因确认与小熊猫的亲缘关系而改称 panda（由亲缘转名）')],
 'mech': 'panda 先是小熊猫的名字：大熊猫沾了亲戚的光，继承了名字。',
 'link': '今天的意思「大熊猫」是转来的：先认亲，后改名。',
 'disp': '终极来源未明（Wiktionary 标 unclear ultimate origin），本档以尼泊尔土名为可证起点。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['balloon'] = {
 'chain': [('Proto-Germanic', '*balluz', '球', '原始日耳曼语时期'),
           ('Italian', 'pallone', '大球', '意大利语时期'),
           ('English', 'balloon', '气球', '1570 年代')],
 'fa': '1570 年代见载（Etymonline：1570s，义为「大皮球游戏」）',
 'orig': '大球（游戏用充气皮球）',
 'path': [('大球（游戏用充气皮球）', '1570 年代', ''),
          ('气球', '现代', 'palla「球」+ 大词尾 -one 的「大球」：先是踢着玩的充气大皮球；1784 年蒙戈尔费埃兄弟升空后转指载人气囊，1858 年玩具气球义（由球到囊）')],
 'mech': 'balloon 是「大号的球」：球越吹越大，就飞起来了。',
 'link': '今天的意思「气球」从「大皮球」来：充的气从脚下到了天上。',
 'disp': '入英或部分经法语 ballon（Etymonline 并记），主干一致。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['family'] = {
 'chain': [('Latin', 'famulus', '仆人', '拉丁语时期'),
           ('Latin', 'familia', '一家的仆从（全体）', '拉丁语时期'),
           ('Middle English', 'famylye', '家庭', '中古英语时期')],
 'fa': '15 世纪早期进入英语（Etymonline：early 15c.，义为「一家仆从」）',
 'orig': '一家的仆从（全体）',
 'path': [('一家的仆从（全体）', '拉丁语时期', ''),
          ('家，家庭；家人', '现代', '拉丁语 familia 罕指「父母子女」（那用 domus），本指一户的仆从总称；入英语后 1540 年代指「一户人家（含仆人）」，1660 年代才定型为「父母与孩子」（由仆从总称到血亲核心）')],
 'mech': 'family 先是「全家的仆人」：一屋子人，慢慢只剩自家人。',
 'link': '今天的意思「家庭」从「仆从总称」收窄而来：外人退出，亲人留下。',
 'disp': 'famulus 本身来源未定（Etymonline 明言 unknown origin），本档止于 familia 层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['woman'] = {
 'chain': [('Old English', 'wīf', '女人', '古英语时期'),
           ('Old English', 'wīfmann', '女人（女-人）', '古英语时期'),
           ('Middle English', 'womman', '妇女', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：wīfmann，8 世纪已见复合）',
 'orig': '女人（女-人）',
 'path': [('女人（女-人）', '古英语时期', ''),
          ('成年女子，妇女', '现代', 'wīf 本义就是「女人」，mann 是「人」：拼成「女-人」专指女性。此后两半各自收窄——wīf 只剩「妻子」，man 多指男性——复合词反倒成了通名；复数 women 还保留着原来的元音（复合定型后构件变义）')],
 'mech': 'woman 是「女 + 人」：两半后来都变了义，合起来还是女人。',
 'link': '今天的意思「妇女」就是复合本义；wife 与 man 的今义都是后来收窄的。',
 'disp': '此构形为英语所特有（荷兰语 vrouwmens 平行），牛津并记。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['candy'] = {
 'chain': [('Sanskrit', 'खण्ड (khaṇḍa)', '碎块；冰糖块', '梵语时期'),
           ('Persian', 'qand', '甘蔗糖', '波斯语时期'),
           ('Arabic', 'qandī', '蜜饯的；冰糖', '阿拉伯语时期'),
           ('Old French', 'sucre candi', '冰糖', '古法语时期'),
           ('Middle English', 'sugre candy', '糖果', '中古英语时期')],
 'fa': '13 世纪晚期见载（Etymonline：late 13c.，义为「结晶糖」）',
 'orig': '结晶糖（冰糖）',
 'path': [('结晶糖（冰糖）', '梵语时期', ''),
          ('糖果', '现代', '梵语 khaṇḍa 是「碎块」：糖结晶成块，就是冰糖。词经波斯语、阿拉伯语、法语入英；19 世纪晚期（尤在美国）泛化为一切糖制点心（由冰糖到泛指糖果）')],
 'mech': 'candy 是「糖块」：碎块的糖，成了所有糖果的名字。',
 'link': '今天的意思「糖果」从「冰糖」泛化而来。',
 'disp': '梵语词或更出达罗毗荼语（泰米尔语 kaṇṭu「硬糖」），两源并记「或许」。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['quiet'] = {
 'chain': [('Proto-Indo-European', '*kʷyeh₁-', '休息', '原始印欧语时期'),
           ('Latin', 'quiēs', '安息；平静', '拉丁语时期'),
           ('Old French', 'quiete', '安宁', '古法语时期'),
           ('Middle English', 'quiete', '安静的', '中古英语时期')],
 'fa': '约 1300 年见载名词（Etymonline：c. 1300，义为「免于扰乱的安宁」）',
 'orig': '安息；平静',
 'path': [('安息；平静', '拉丁语时期', ''),
          ('安静的，文静的', '现代', '老根是「歇着」：先指免于战乱的安宁（牛津：原义与战争相对），约 1400 年生「无声」义，并顶替本土词 still 在此义上的主位（由安宁到无声）')],
 'mech': 'quiet 是「歇下来的静」：不打仗、不出声，都是歇着。',
 'link': '今天的意思「安静的」从「安息」来：静，先是太平，后是无声。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {'eighteen': 'compositional（主干复核后）：eight + -teen（ten 的弱化形）复合数词，古英语 eahtatīene、日耳曼语 *ahtōutehun 两源一致；构件自明，本词不单独立档，保持待核'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
