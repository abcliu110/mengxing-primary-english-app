# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['also'] = {
 'chain': [('Old English', 'eall', '完全；全部', '古英语时期'),
           ('Old English', 'swā', '如此', '古英语时期'),
           ('Old English', 'eallswā', '完全如此；也', '古英语时期'),
           ('Middle English', 'also', '也', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE eallswa，义为「正如、同样」）',
 'orig': '完全如此；同样',
 'path': [('完全如此；同样', '古英语时期', ''),
          ('也', '现代', '缩合化石：all + so 本是 so 的强调形「完全如此」，义渐弱为「另外、也」，顶替了旧词 eke;as 是它的截短双式，15 世纪两者才分清用法（缩合化石）')],
 'mech': 'also 是「一模一样地」弱化成的「也」：as 是它的小个子兄弟。',
 'link': '今天的意思「也」就是本义的弱化。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['quite'] = {
 'chain': [('Latin', 'quiētus', '安静的；自由的', '拉丁语时期'),
           ('Middle English', 'quit', '自由的；清楚的', '中古英语时期'),
           ('Middle English', 'quite', '完全地', '中古英语时期')],
 'fa': '约 1300 年见载（Etymonline：c. 1300，义为「完全地、彻底地」）',
 'orig': '完全地',
 'path': [('完全地', '中古英语时期', ''),
          ('相当；十分', '现代', '著名的「缩水」：本义是斩钉截铁的「完全、彻底」，19 世纪中期才弱化出「相当、还算」——英式 quite 的含糊（到底是全部还是部分）就从这儿来（由完全到相当）')],
 'mech': 'quite 本是「百分之百」：说着说着，打了折。',
 'link': '今天的意思「相当」是本义弱化的结果，与 quit、quiet 同族。',
 'disp': '无已知争议（quite 为 quit 的变体形容词形，细节见 Wiktionary）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['hi'] = {
 'chain': [('Middle English', 'hy', '嘿（唤注意）', '中古英语时期'),
           ('English', 'hi', '嗨', '1862 年')],
 'fa': '1862 年作问候见载（Etymonline：1862，美式英语，首见于堪萨斯印第安人言语的记录）',
 'orig': '唤人注意之声',
 'path': [('唤人注意之声', '中古英语时期', ''),
          ('嗨，你好', '现代', '自然感叹词：hey/hy 的变体，本是「嘿——」的招呼声；20 世纪初才定型为熟人间的问候（1902 年《世纪词典》还只释作惊讶之叹）（由呼喊到问候）')],
 'mech': 'hi 与 hello 同路：先喊人，后问好——只是 hi 更年轻、更随意。',
 'link': '今天的意思「嗨」就是本义的定型。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['top'] = {
 'chain': [('Proto-Germanic', '*tuppaz', '辫；簇；顶', '原始日耳曼语时期'),
           ('Old English', 'topp', '顶；簇', '古英语时期'),
           ('Middle English', 'top', '顶部', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE top、toppa，义为「峰；冠；一簇（毛发）」）',
 'orig': '簇；顶',
 'path': [('簇；顶', '原始日耳曼语时期', ''),
          ('顶部', '现代', '同根的德语 Zopf 今天还只是「辫子」：英语这支把「头顶一簇」泛化成一切「顶」——山顶、桌顶、瓶盖（14-15 世纪逐项扩展）（由发簇到顶部）')],
 'mech': 'top 先是「头顶那一撮」：撮在最高处，就成了「顶」的总名。',
 'link': '今天的意思「顶部」就是本义的泛化。',
 'disp': '日耳曼语之外的更深来源未明（Wiktionary：of unknown ultimate origin；罗曼语诸形多为反借自日耳曼语）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['ache'] = {
 'chain': [('Proto-Germanic', '*akaną', '持续作痛', '原始日耳曼语时期'),
           ('Old English', 'acan', '作痛（动词）', '古英语时期'),
           ('Middle English', 'aken', '疼痛', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE acan，义为「受持续之痛」）',
 'orig': '持续作痛',
 'path': [('持续作痛', '原始日耳曼语时期', ''),
          ('疼痛', '现代', '拼写冤案：本读如 ake（与名词 æce 本是 speak/speech 式的配对），名词读音被动词同化；约 1700 年拼写改作 ache——只因误以为它出自希腊语 akhos「痛苦」（其实那是 awe 的远亲）（误拼成词）')],
 'mech': 'ache 的 ch 是个误会：三百年前，人们以为它姓「希腊」。',
 'link': '今天的意思「疼痛」就是本义，错只错在拼写上。',
 'disp': '日耳曼语 *akanan 或出印欧语 *ag-es-「过失」（perhaps)，或为呻吟的拟声，两拟登记。',
 'folk': '拼写 ache 源于「出自希腊语 akhos」的错误假设（Etymonline 明言 on a false assumption of a Greek origin)，是真实的假词源改形', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['adjective'] = {
 'chain': [('Ancient Greek', 'epithetikón', '被加上的', '古希腊时期'),
           ('Latin', 'adicere', '投向；加上', '拉丁语时期'),
           ('Latin', 'adiectivus', '被加上的', '拉丁语时期'),
           ('Middle English', 'adjectif', '形容词', '中古英语时期')],
 'fa': '14 世纪末见载（Etymonline：late 14c., noun adjective 的省称）',
 'orig': '被加上的（词）',
 'path': [('被加上的（词）', '拉丁语时期', ''),
          ('形容词', '现代', '仿译词：拉丁语 adiectivus 是希腊语 epithetikón 的对译（ad-「向」+ iacere「投」＝「投过去加上去的」）——形容词就是「给名词加上去的词」；epithet「绰号」同源（仿译成词）')],
 'mech': 'adjective 是「附加件」：它的名字就写着自己的用法。',
 'link': '今天的意思「形容词」就是本义。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['another'] = {
 'chain': [('Middle English', 'an other', '另一个', '中古英语时期'),
           ('Middle English', 'another', '另一个', '中古英语时期')],
 'fa': '13 世纪初见载（Etymonline：early 13c., an other 的缩合）',
 'orig': '另一个（an other 的合写）',
 'path': [('另一个（an other 的合写）', '中古英语时期', ''),
          ('另一个；再一个', '现代', '合写化石：直到 16 世纪它还写作两个词 an other（牛津）——古英语本只用 oþer 一词，an other 是中古的新拼法（合写成词）')],
 'mech': 'another 是「粘」成一个词的：an + other 的接缝还在。',
 'link': '今天的意思「另一个」就是本义。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['approach'] = {
 'chain': [('Proto-Indo-European', '*pro-', '在前；向前', '原始印欧语时期'),
           ('Latin', 'prope', '近', '拉丁语时期'),
           ('Late Latin', 'appropiāre', '走近', '晚期拉丁语时期'),
           ('Middle English', 'aprochen', '接近', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300，义为「（在空间上）走近」）',
 'orig': '走近',
 'path': [('走近', '晚期拉丁语时期', ''),
          ('接近；方法，途径', '现代', 'prope「近」加 ad-「向」：14 世纪末起兼指时间与性质上的接近；名词「方法」义是「走近（问题）的方式」的凝固——它顶替了古英语本族词 nēahlǣcan（由走近到途径）')],
 'mech': 'approach 是「往近处走」：处理问题，也是一种走近。',
 'link': '今天的意思「接近；方法」一动一静，同出此源。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['awful'] = {
 'chain': [('Old English', 'eġe', '敬畏；恐惧', '古英语时期'),
           ('Old English', 'eġeful', '令人敬畏的', '古英语时期'),
           ('Middle English', 'agheful', '可怕的', '中古英语时期')],
 'fa': '约 1300 年见载（Etymonline：c. 1300, agheful，义为「值得敬畏的、令人心生畏惧的」；古英语已有 egefull)',
 'orig': '令人敬畏的',
 'path': [('令人敬畏的', '古英语时期', ''),
          ('糟糕的；可怕的', '现代', '贬义化（语义恶化）：本是庄严的褒义词（对神、对王权的敬畏），1809 年弱化为「很坏」，1818 年再作「非常」的强调词——与 awesome 走的是同一条下坡路（由敬畏到糟糕）')],
 'mech': 'awful 掉了价：从前形容神，如今形容烂天气。',
 'link': '今天的意思「糟糕」是敬畏义一路弱化的结果。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['bankrupt'] = {
 'chain': [('Germanic', '*bank-', '长凳', '日耳曼语时期'),
           ('Italian', 'banca', '钱庄（柜台）', '意大利语时期'),
           ('Italian', 'banca rotta', '破板凳', '意大利语时期'),
           ('English', 'bankrupt', '破产的', '1560 年代')],
 'fa': '1560 年代见载（Etymonline：1560s，出意大利语 banca rotta)',
 'orig': '破板凳（倒闭的钱庄）',
 'path': [('破板凳（倒闭的钱庄）', '意大利语时期', ''),
          ('破产的；破产者', '现代', '半仿译：钱庄的柜台本是条长凳（banca，与 bank 同源）；旧俗谓钱商倒闭则凳被砸——Etymonline 谓此多半是比喻；词尾 -rupt 是向拉丁语 rupta「破裂」看齐改的（由破凳到破产）')],
 'mech': 'bankrupt 是「凳子被砸了」：摊子砸了，人就破产了。',
 'link': '今天的意思「破产」就是本义（1580 年代起兼指非金钱的「枯竭」）。',
 'disp': '「砸凳旧俗」说 Etymonline 作 the allusion probably is figurative，登记在案。',
 'folk': '词尾由 rotta 改作 -rupt，是向拉丁语 rupt-「破」的民间同化（牛津明言 due to association with Latin rupt-)', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {
 'hurry': 'trunk_unsettled（主干复核后）：1590 年代见载（莎士比亚多用）；两拟并立——或为 harry 的变体，或出中古英语 hurren「急速振动、嗡嗡」（出日耳曼语 *hurza）；牛津作 imitative。路径未定，保持待核',
 'bat': 'trunk_unsettled（主干复核后）：两词同形须分线——bat「球棒」古英语 batt 或出凯尔特语（威尔士语 bat「杖」），后受古法语 batte 强化；bat「蝙蝠」为 16 世纪末中古英语 bakke（斯堪的纳维亚来源）的改形，其与古诺斯语 blaka「拍打」的关联 Wiktionary 明言 unclear。两线皆未定，保持待核',
}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
