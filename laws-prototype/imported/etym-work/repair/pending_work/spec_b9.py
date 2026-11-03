# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['warmth'] = {
 'chain': [('Proto-Germanic', '*warmiþu', '温暖（状态）', '原始日耳曼语时期'),
           ('Middle English', 'warmeth', '温暖', '中古英语时期')],
 'fa': '12 世纪末见载（Etymonline：late 12c., warmeth、wearmth，义为「温暖的状态；和煦的气温」）',
 'orig': '温暖（的状态）',
 'path': [('温暖（的状态）', '原始日耳曼语时期', ''),
          ('温暖，暖和；热情', '现代', '-th 是已死的抽象名词后缀（health、truth 同班）：1590 年代转指「（感情的）热忱」，1710 年「火气」，1717 年绘画的「暖色」（由体温到性情）')],
 'mech': 'warmth 是 warm 的「状态证」：-th 后缀与 health 是同一套老模具。',
 'link': '今天的意思「温暖；热情」本义与喻义并存。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['truth'] = {
 'chain': [('Proto-Indo-European', '*deru-', '坚固；稳固', '原始印欧语时期'),
           ('Proto-Germanic', '*treuwaz', '有信义的', '原始日耳曼语时期'),
           ('Old English', 'triewð', '信义；忠诚', '古英语时期'),
           ('Middle English', 'treuth', '真相', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE triewð（西撒克逊）、treowð（麦西亚），义为「信义、忠诚、盟约」）',
 'orig': '信义；忠诚',
 'path': [('信义；忠诚', '原始日耳曼语时期', ''),
          ('事实，真相，真理', '现代', '源头是「坚固」——与 tree 同根（都取「立得稳」）：先指人靠得住（忠诚），14 世纪中才转指「（一句）真话」，1560 年代「与事实相符」义定型；troth「婚约」是其同源双式（由忠诚到真相）')],
 'mech': 'truth 先是「人靠得住」，后是「话靠得住」：根子上是「稳」。',
 'link': '今天的意思「真相」从「忠诚」漂来，与 trust、truce 同族。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['growth'] = {
 'chain': [('Proto-Indo-European', '*gʰreh₁-', '生长', '原始印欧语时期'),
           ('English', 'growth', '生长', '1550 年代')],
 'fa': '1550 年代见载（Etymonline：1550s，义为「生长的阶段」）',
 'orig': '生长（的阶段）',
 'path': [('生长（的阶段）', '1550 年代', ''),
          ('生长，成长，发育', '现代', '有据的成词：grow + -th，仿 health、stealth 的模具在 1550 年代铸成，顶替古英语旧词 grownes；1570 年代「长成的东西」、1580 年代「过程」义（成词记录）')],
 'mech': 'growth 是 16 世纪按 health 的模子新铸的词：模具比词老。',
 'link': '今天的意思「生长」就是成词时的意思。',
 'disp': '无已知争议（古诺斯语 gróðr 为平行同构）。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['chopstick'] = {
 'chain': [('Cantonese', 'gap', '急；快', '粤语时期'),
           ('Chinese Pidgin English', 'chop', '快', '洋泾浜英语时期'),
           ('Chinese', '筷子 (kuaìzi)', '灵巧的小家伙', '汉语时期'),
           ('English', 'chopstick', '筷子', '1690 年代')],
 'fa': '1690 年代作餐具名见载（Etymonline：1690s；牛津作 17 世纪末，洋泾浜英语）',
 'orig': '（洋泾浜）「快」+ 棍',
 'path': [('（洋泾浜）「快」+ 棍', '洋泾浜英语时期', ''),
          ('筷子', '现代', '半仿译：中文「筷子」本义「灵巧/快的小家伙」（快字避「住」「蛀」之讳改从竹头），水手洋泾浜以 chop（出粤语「急」）译其「快」义、stick 译其形——英语独有的造法（仿译成词）')],
 'mech': 'chopstick 是半音半义的「翻译件」：筷子的「快」被译出来了，「筷」只剩根棍。',
 'link': '今天的意思「筷子」就是成词时的意思。',
 'disp': 'Wiktionary 记此词 1615 年先指渔具、1637 年转指餐具（以形似转移），且 18 世纪有「嘴边棍」（chop=下巴）另说；洋泾浜仿译说为牛津、Etymonline 与 Hobson-Jobson(1886）共主。',
 'folk': '未见流传假词源（「嘴边棍」说为 18 世纪旧解，已登记在争议项）', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['dream'] = {
 'chain': [('Proto-Indo-European', '*dʰrewgʰ-', '欺骗', '原始印欧语时期'),
           ('Proto-Germanic', '*draugmaz', '幻象；欺骗', '原始日耳曼语时期'),
           ('Old Norse', 'draumr', '梦', '古诺斯语时期'),
           ('Middle English', 'dream', '梦', '中古英语时期')],
 'fa': '13 世纪中期作「睡梦」见载（Etymonline：mid-13c.)',
 'orig': '幻象',
 'path': [('幻象', '原始日耳曼语时期', ''),
          ('梦，梦想；做梦', '现代', '词根是「骗」：梦是骗人的影子（德语 trügen「欺骗」、古诺斯语 draugr「鬼魂」同源）；中古英语此义由古诺斯语 draumr 强化定型（由幻象到梦境）')],
 'mech': 'dream 的老底是「欺骗」：梦，就是夜里骗眼睛的东西。',
 'link': '今天的意思「梦」就是本义的定型；「梦想」义是其醒时延伸。',
 'disp': '古英语 drēam 见载义只有「欢乐、音乐」——「睡梦」义在古英语文献中缺载，是著名悬案：或为未载的次义，或与同形词相避而不用（OED 1989 说），或本即两词；中古「梦」义之源有古诺斯语 draumr 强化说。本档主干立于日耳曼语 *draugmaz/draumr 一线并如实登记缺环。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['desk'] = {
 'chain': [('Ancient Greek', 'diskos', '圆盘', '古希腊时期'),
           ('Latin', 'discus', '圆盘；盘子', '拉丁语时期'),
           ('Medieval Latin', 'desca', '写字桌', '中世纪拉丁语时期'),
           ('Middle English', 'deske', '书桌', '中古英语时期')],
 'fa': '14 世纪中期进入英语（Etymonline：mid-14c.，义为「专供读写之桌」）',
 'orig': '（写字）桌',
 'path': [('（写字）桌', '中世纪拉丁语时期', ''),
          ('书桌，课桌，办公桌', '现代', '圆盘→盘子→桌面→写字桌：与 disc、dish、disk、dais 是同源一族，德语 Tisch「桌子」也是这个希腊词的后代（由圆盘到书桌）')],
 'mech': 'desk 与 dish 是亲戚：盘子摊平了，就是桌面。',
 'link': '今天的意思「书桌」就是本义的定型（1918 年起兼指报社、机构的「部门」）。',
 'disp': '中世纪拉丁语 desca 或经意大利语 desco（牛津作或出普罗旺斯语 desca「篮子」），主干同归 discus。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['meat'] = {
 'chain': [('Proto-Indo-European', '*mad-', '湿润（指食物质地）', '原始印欧语时期'),
           ('Proto-Germanic', '*mati', '食物', '原始日耳曼语时期'),
           ('Old English', 'mete', '食物', '古英语时期'),
           ('Middle English', 'mete', '肉', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE mete，义为「食物、滋养」）',
 'orig': '食物',
 'path': [('食物', '原始日耳曼语时期', ''),
          ('（动物的）肉', '现代', '本是食物的总名（蔬菜 15 世纪还叫 grene-mete「绿食物」，奶制品叫 white meat「白食物」）：约 1300 年起窄化为「肉」（此前肉叫 flesh-meat）——法语 viande「肉」也是从「食物」窄化的同路词（由统称到专指）')],
 'mech': 'meat 原是「饭」的总名：别的食物都有了专名，它留下管肉。',
 'link': '今天的意思「肉」是总名窄化的结果（sweetmeat「糖果」里还存着旧义）。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['tea'] = {
 'chain': [('Proto-Sino-Tibetan', '*s-la', '叶；茶', '原始汉藏语时期'),
           ('Hokkien', 'tê', '茶', '闽南语时期'),
           ('Dutch', 'thee', '茶', '荷兰语时期'),
           ('English', 'tea', '茶', '1650 年代')],
 'fa': '1650 年代见载（Etymonline：1650s, tay/thea；约 1655 年首现于塞梅多著作英译）',
 'orig': '茶',
 'path': [('茶', '闽南语时期', ''),
          ('茶，茶叶', '现代', '双路入欧：海路经荷兰东印度公司自厦门取闽南语 tê（经马来语 teh）成 tea/thé/Tee 一系；陆路自澳门取官话 chá 成 cha/chai/çay 一系——同一个汉字，两种读音，两种世界地图（借词守恒）')],
 'mech': 'tea 读「tê」，chai 读「chá」：从海上来的是 tea，从陆上来的是 chai。',
 'link': '今天的意思「茶」就是本义，一路未变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['bee'] = {
 'chain': [('Proto-Indo-European', '*bʰey-', '蜂', '原始印欧语时期'),
           ('Proto-Germanic', '*bijǭ', '蜂', '原始日耳曼语时期'),
           ('Old English', 'bēo', '蜜蜂', '古英语时期'),
           ('Middle English', 'be', '蜜蜂', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE beo）',
 'orig': '蜜蜂',
 'path': [('蜜蜂', '原始印欧语时期', ''),
          ('蜜蜂', '现代', '1530 年代起喻「勤劳的人」；1769 年美式英语转指「邻里互助的聚工会」（raising-bee 盖房会、quilting bee 拼被会），1865 年 spelling bee「拼字比赛」由此出（由虫到聚会）')],
 'mech': 'bee 从虫变成了「会」：大家像蜂群一样凑在一起干活、比赛。',
 'link': '今天的意思「蜜蜂」就是本义；「拼字比赛」的 bee 是它的美式喻义。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['ant'] = {
 'chain': [('Proto-Indo-European', '*meh₂y-', '切', '原始印欧语时期'),
           ('West Germanic', '*āmaitijā', '咬断者', '西日耳曼语时期'),
           ('Old English', 'ǣmete', '蚂蚁', '古英语时期'),
           ('Middle English', 'ampte', '蚂蚁', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE æmette；今形 ant 为约 1500 年 ampte 的截短）',
 'orig': '咬断者',
 'path': [('咬断者', '西日耳曼语时期', ''),
          ('蚂蚁', '现代', '构词是「咬掉（*ē- 离 + *mai- 切）」：蚂蚁得名于它咬断东西的本事；旧形 emmet 一直活到 20 世纪（由动作到虫名）')],
 'mech': 'ant 的名字是「小钳子」：咬断者，就是它。',
 'link': '今天的意思「蚂蚁」就是本义，截短只动了形。',
 'disp': '复合构词说作 probably（Wiktionary 标 uncertain and debated, but probably)，Etymonline 直陈此构；本档从两说之合。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['hen'] = {
 'chain': [('Proto-Indo-European', '*kan-', '唱', '原始印欧语时期'),
           ('Proto-Germanic', '*hanjō', '母鸡', '原始日耳曼语时期'),
           ('Old English', 'henn', '母鸡', '古英语时期'),
           ('Middle English', 'hen', '母鸡', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE henn）',
 'orig': '母鸡（「歌者」的阴性）',
 'path': [('母鸡（「歌者」的阴性）', '原始日耳曼语时期', ''),
          ('母鸡', '现代', '它是 *hanan-「公鸡」的阴性形，本义「（报晓）歌唱者」——鸡得名于啼叫，与拉丁语 canō「唱」同根；公鸡的阳性本词在德语 Hahn 里还活着（拟声命名）')],
 'mech': 'hen 是「女歌手」：鸡一家是靠嗓子得的名。',
 'link': '今天的意思「母鸡」就是本义（14 世纪初泛指一切鸟类的雌性）。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {'afternoon': 'compositional（主干复核后）：after + noon 透明复合（约 1300)，现代词义由构词直接可读、无历史漂移；词源叙事归形态层，待核保持'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
