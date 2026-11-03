# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['width'] = {
 'chain': [('English', 'width', '宽度', '1620 年代')],
 'fa': '1620 年代造词（Etymonline 与牛津同载：仿 breadth 自 wide 造出）',
 'orig': '宽度',
 'path': [('宽度', '1620 年代', ''),
          ('宽度，广度', '现代', 'wide 本有现成的名词 wideness：17 世纪初人们仿 breadth（broad + -th）的样子，用 wide + -th 造出 width 并取而代之；约翰逊斥之为「低俗词」，OED 称「文学造词」（仿样造词胜出）')],
 'mech': 'width 是仿 breadth 造的：有样学样，把 wideness 挤了下去。',
 'link': '今天的意思「宽度」就是造词本义，一路没变。',
 'disp': '或谓仿古诺斯语 vídd，Wiktionary 谓此说不合（该词不见于苏格兰与北部方言），并记不可取。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['door'] = {
 'chain': [('Proto-Indo-European', '*dʰwṓr', '门；门口', '原始印欧语时期'),
           ('Proto-Germanic', '*durz', '门', '原始日耳曼语时期'),
           ('Old English', 'duru', '门', '古英语时期'),
           ('Middle English', 'dore', '门', '中古英语时期')],
 'fa': '约 1200 年定型（Etymonline：c. 1200，两个古英语词合流）',
 'orig': '门；大门',
 'path': [('门；大门', '古英语时期', ''),
          ('门', '现代', '古英语本来有两个门：中性 dor（出单数形）与阴性 duru（出复数形），中古英语里合而为一；印欧语里此词最古的形式常是双数/复数，或因最早的门是两扇对开')],
 'mech': 'door 是两个古词合的家：dor 与 duru，合成了一个 door。',
 'link': '今天的意思「门」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['floor'] = {
 'chain': [('Proto-Indo-European', '*pleh₂-', '平坦的', '原始印欧语时期'),
           ('Proto-Germanic', '*flōraz', '地面；地板', '原始日耳曼语时期'),
           ('Old English', 'flōr', '地板；地面', '古英语时期'),
           ('Middle English', 'floor', '地板', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏同载 flōr）',
 'orig': '地板；地面',
 'path': [('地板；地面', '古英语时期', ''),
          ('地板，地面；楼层', '现代', '老根是「平」：平整的底面。1580 年代生「楼层」义——站的这一层平地，就是一层楼（由底面到层级）')],
 'mech': 'floor 是「平的那一面」：脚下平的，头上叠的，都是它。',
 'link': '今天的意思「地板」就是本义；「层」是站在地板上数出来的。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['cup'] = {
 'chain': [('Latin', 'cūpa', '大桶；木桶', '拉丁语时期'),
           ('Late Latin', 'cuppa', '杯子', '晚期拉丁语时期'),
           ('Old English', 'cuppe', '杯子', '古英语时期'),
           ('Middle English', 'cuppe', '杯子', '中古英语时期')],
 'fa': '古英语时期已借入（牛津：出通俗拉丁语 cuppa）',
 'orig': '杯子（盛液小器）',
 'path': [('杯子（盛液小器）', '古英语时期', ''),
          ('茶杯，杯子；奖杯', '现代', '大桶 cūpa 缩小成 cuppa：装酒的桶 → 喝水的杯；1640 年代「奖杯」义（杯形的奖品）（由容器到奖品）')],
 'mech': 'cup 是小了的大桶：桶盛酒，杯盛水，形制一脉。',
 'link': '今天的意思「杯子」从「桶」缩小而来；「奖杯」是杯子当了奖品。',
 'disp': '古英语里另与本土 copp「圆物、碗」（德语 Kopf「头」同族）合流；De Vaan 谓 *kup- 或为非印欧语借词、诸语辗转相借（Etymonline 并引）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['lemon'] = {
 'chain': [('Arabic', 'laimun', '柠檬（柑橘类）', '阿拉伯语时期'),
           ('Old French', 'limon', '柑橘果', '古法语时期'),
           ('Middle English', 'lymon', '柠檬', '中古英语时期')],
 'fa': '约 1400 年进入英语（Etymonline：c. 1400 lymon，经古法语 limon）',
 'orig': '柑橘类果实',
 'path': [('柑橘类果实', '阿拉伯语时期', ''),
          ('柠檬', '现代', '果子与名字同路西行：9—10 世纪阿拉伯人把原产印度的柑橘带到地中海东岸，词经波斯语、阿拉伯语、法语入英（借词随果子旅行）')],
 'mech': 'lemon 是跟着果子旅行的名字：从印度到阿拉伯，再到欧洲。',
 'link': '今天的意思「柠檬」就是借入时的本义，一路没变。',
 'disp': '更深层：波斯语 līmū 出梵语 nimbū，终极或为南岛语源（马来语 limaw「柑橘」），两源并记；与 lime 为同源双式。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['kangaroo'] = {
 'chain': [('Guugu Yimidhirr', 'gangurru', '大黑袋鼠', '1770 年')],
 'fa': '1770 年见载（库克与班克斯记录，Etymonline 与牛津同载）',
 'orig': '大黑袋鼠',
 'path': [('大黑袋鼠', '1770 年', ''),
          ('袋鼠', '现代', '昆士兰东北部 Guugu Yimidhirr 语里一个具体种名（东部灰袋鼠一类）：欧洲人拿它作了全体袋鼠的通名（由种名到通名）')],
 'mech': 'kangaroo 是土著语里的一个种名：被借来称呼所有的袋鼠。',
 'link': '今天的意思「袋鼠」从具体种名泛化而来。',
 'disp': '词源的确认历经反复：1898 年 Roth 已指出 gang-oo-roo 即该语「袋鼠」，长期被词典家忽略，1972 年 Haviland 田野调查再次证实（Etymonline 引 Dixon）。',
 'folk': '流行说法称 kangaroo 在土著语里意为「我不知道」（问名误会的段子）——Wiktionary 明言此为 popular misconception，该词实有其义（指一种大袋鼠），特此否决。', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['koala'] = {
 'chain': [('Dharuk', 'gula', '考拉', '1808 年')],
 'fa': '1808 年见载（Etymonline：1808，出原住民语名）',
 'orig': '考拉',
 'path': [('考拉', '1808 年', ''),
          ('树袋熊，考拉', '现代', '悉尼地区 Dharuk 语的动物名直接借入（各书记作 koola、kulla、kula 不一）（借词，动物名随记录入英）')],
 'mech': 'koala 是原住民给这种动物的名字：听见什么，就记下什么。',
 'link': '今天的意思「考拉」就是借入时的本义，一路没变。',
 'disp': '或作 gulawany（Wiktionary 并记）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {'shark': 'origin_unknown（主干复核后）：牛津明标来源未定；诸说并存——德语 Schurke「恶棍」说（谓人名义先行、后转指鱼）、玛雅语 xoc 旧说、拉丁语 carcharias 说（缺古法语中间形式）——无一获双源互证，保持待核'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
