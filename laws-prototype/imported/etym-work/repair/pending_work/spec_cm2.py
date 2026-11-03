# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['lake'] = {
 'chain': [('Proto-Indo-European', '*laku-', '水体', '原始印欧语时期'),
           ('Latin', 'lacus', '池；湖；盆', '拉丁语时期'),
           ('Old French', 'lac', '湖', '古法语时期'),
           ('Middle English', 'lake', '湖', '中古英语时期')],
 'fa': '12 世纪早期进入英语（Etymonline：early 12c.，经古法语 lac）',
 'orig': '池；湖',
 'path': [('池；湖', '拉丁语时期', ''),
          ('湖，湖泊', '现代', '共同的意象是「洼地里盛着的水」；古英语本土同源词 lacu（溪、池）与法语借词 lac 在中古英语里汇合为 lake——同根的自家词与外来词合成一行（同源汇合）')],
 'mech': 'lake 是「洼地里的水」：本土词和法语借词本是同根亲戚，在英语里合了家。',
 'link': '今天的意思「湖」就是拉丁语 lacus 的本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['zoo'] = {
 'chain': [('English', 'Zoological Gardens', '动物园（伦敦动物学会动物园）', '1828 年'),
           ('English', 'zoo', '动物园', '1847 年')],
 'fa': '1847 年见载口语截短（Etymonline；1866 年已通行）',
 'orig': '动物学园（的截短）',
 'path': [('动物学园（的截短）', '1847 年', ''),
          ('动物园', '现代', '伦敦摄政公园的 Zoological Gardens 太长，口语只取头三个字母 zoo 一音节说完——从专名截短成通名（截短词）')],
 'mech': 'zoo 是 Zoological Gardens 的头一截：名字太长，大家只喊开头。',
 'link': '今天的意思「动物园」就是截短时的本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['autumn'] = {
 'chain': [('Latin', 'autumnus', '秋天', '拉丁语时期'),
           ('Old French', 'automne', '秋天', '古法语时期'),
           ('Middle English', 'autumpne', '秋天', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.）',
 'orig': '秋天',
 'path': [('秋天', '拉丁语时期', ''),
          ('秋天，秋季', '现代', '英语本土本以 harvest（秋收）称这一季；autumn 借入后 16 世纪起顶替它成为季名——harvest 退回「收获」本义（借词顶替本土季名）')],
 'mech': 'autumn 是拉丁语借来的季名：它一来，土话 harvest 就退回田里去了。',
 'link': '今天的意思「秋天」就是拉丁语原义，一路没变。',
 'disp': 'autumnus 本身来源未定：de Vaan 指出印欧语无可构的「秋」词根，或出伊特鲁里亚语（Etymonline 两说并引），本档链止于拉丁语。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['orange'] = {
 'chain': [('Sanskrit', 'nāranga', '橙树', '梵语时期'),
           ('Persian', 'nārang', '橙子', '波斯语时期'),
           ('Arabic', 'nāranj', '橙子', '阿拉伯语时期'),
           ('Old French', 'orenge', '橙子', '古法语时期'),
           ('Middle English', 'orenge', '橙子', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（指果实；颜色义 1510 年代，Etymonline 与牛津同载）',
 'orig': '橙树；橙子',
 'path': [('橙树；橙子', '梵语时期', ''),
          ('橙子；橙色的', '现代', '词从印度一路西行：梵语 → 波斯语 → 阿拉伯语 → 意大利语 arancia（开头的 n- 被冠词吃掉：una narancia → un’arancia）→ 法语 → 英语；1510 年代才添颜色义——先有果，后有色（借词西行，果名转色名）')],
 'mech': 'orange 是橙子坐商路来的名：走丢了开头的 n，才成了 orange。',
 'link': '今天的意思「橙子；橙色」同出一源：先指果子，后指果子的颜色。',
 'disp': '梵语词更深或出达罗毗荼语（Wiktionary 引比较语料）；法国地名 Orange 与本词无关（出高卢语），仅牵引了词形联想。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['rabbit'] = {
 'chain': [('Middle Dutch', 'robbe', '兔子', '中古荷兰语时期'),
           ('Old French', 'rabotte', '小兔', '古法语方言'),
           ('Middle English', 'rabet', '幼兔', '中古英语时期')],
 'fa': '14 世纪晚期见载（Etymonline：late 14c.，义为「幼兔」）',
 'orig': '幼兔',
 'path': [('幼兔', '中古英语时期', ''),
          ('兔子', '现代', '本词原只指幼兔，成年兔另叫 coney；18 世纪起 rabbit 把大小通吃，coney 退出（以幼名代全称）')],
 'mech': 'rabbit 本是「小兔子」的名字：叫着叫着，大小兔子都归它了。',
 'link': '今天的意思「兔子」从「幼兔」扩来：小的名，管了全家。',
 'disp': 'robbe 本身来源未定（Liberman 谓「日耳曼名词＋法语后缀」，见 Etymonline）；入英一线（瓦隆语 robète／法语方言 rabotte 的指小形）两源同述。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['fan'] = {
 'chain': [('Proto-Indo-European', '*h₂weh₁-', '吹', '原始印欧语时期'),
           ('Latin', 'vannus', '簸谷的扇', '拉丁语时期'),
           ('Old English', 'fann', '扬谷的簸箕', '古英语时期'),
           ('Middle English', 'fan', '扇子', '中古英语时期')],
 'fa': '古英语时期已借入（牛津与 Etymonline 都以古英语 fann 起头，源拉丁语 vannus）',
 'orig': '簸谷的扇；扬谷的簸箕',
 'path': [('簸谷的扇；扬谷的簸箕', '古英语时期', ''),
          ('风扇，扇子', '现代', '老本行是扬场：把谷子扬起来，风吹走糠——造风的工具。14 世纪晚期转指一切「造风的器具」，1550 年代手持扇，20 世纪电扇（器具随造风原理演进，名守「造风」之职）')],
 'mech': 'fan 的老根是「吹风」：先帮农民扬谷子，后帮所有人扇风。',
 'link': '今天的意思「风扇」从「扬谷的扇」来：造的都是风。',
 'disp': '同形分立：fan「粉丝、爱好者」（1889 年，美式）是 fanatic 的截短，与本词无关，不混档。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['picture'] = {
 'chain': [('Latin', 'pictūra', '绘画；图画', '拉丁语时期'),
           ('Middle English', 'picture', '绘画；图画', '中古英语时期')],
 'fa': '15 世纪早期进入英语（Etymonline：early 15c.）',
 'orig': '绘画；图画',
 'path': [('绘画；图画', '拉丁语时期', ''),
          ('图画，照片', '现代', 'pingere「画、绣」派生：入英语时兼指「绘画这门 art」与「画出的东西」，前义已废；摄影术后照片也归它管（由绘画到一切图像的扩展）')],
 'mech': 'picture 是「画出来的东西」：画笔能画，相机也能。',
 'link': '今天的意思「图画，照片」从「绘画」扩来：成像的东西都算数。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['rain'] = {
 'chain': [('Proto-Germanic', '*regną', '雨', '原始日耳曼语时期'),
           ('Old English', 'reġn', '雨', '古英语时期'),
           ('Middle English', 'reyn', '雨', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 regn 起头）',
 'orig': '雨',
 'path': [('雨', '古英语时期', ''),
          ('雨；下雨', '现代', '词义从未变：日耳曼语各语同形同义的老词（词义稳定）')],
 'mech': 'rain 是日耳曼语的老天气词，一路就是「雨」。',
 'link': '今天的意思「雨」就是最早的意思，一路没变。',
 'disp': '印欧层未定：Watkins 接 *reg-「湿」（或与拉丁语 rigare「润湿」相关），de Vaan 不取，Wiktionary 并注辅音对应不合；本档链止于日耳曼层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
