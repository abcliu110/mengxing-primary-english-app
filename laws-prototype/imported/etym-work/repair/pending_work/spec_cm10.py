# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['twin'] = {
 'chain': [('Proto-Indo-European', '*dwino-', '双生的', '原始印欧语时期'),
           ('Proto-Germanic', '*twinaz', '成双的；双生的', '原始日耳曼语时期'),
           ('Old English', 'twinn', '成双的', '古英语时期'),
           ('Middle English', 'twinne', '双胞胎', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏同载 twinn「成双的」）',
 'orig': '成双的',
 'path': [('成双的', '古英语时期', ''),
          ('双胞胎之一', '现代', '老根就是数字「二」（*dwóh₁）：两个一组的，就是 twin。形容词先行，名词指双生子中的一个（由性质到指人）')],
 'mech': 'twin 的老根是「二」：生下来就是两个的，叫 twin。',
 'link': '今天的意思「双胞胎」从「成双」来：二字写在了词根里。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['cookie'] = {
 'chain': [('Proto-Germanic', '*kōkô', '糕饼', '原始日耳曼语时期'),
           ('Dutch', 'koek', '蛋糕', '荷兰语时期'),
           ('Dutch', 'koekje', '小蛋糕', '荷兰语时期'),
           ('English', 'cookie', '曲奇', '1808 年')],
 'fa': '1808 年见载「小甜饼」义（Etymonline，美语，出荷兰语 koekje）',
 'orig': '小蛋糕',
 'path': [('小蛋糕', '荷兰语时期', ''),
          ('曲奇饼干，小甜饼', '现代', 'koek「蛋糕」的指小形：荷兰移民把小圆饼带进美国英语，成了 cookie（借词，食物随人走）')],
 'mech': 'cookie 是荷兰语的「小蛋糕」：名字跟着移民过了大西洋。',
 'link': '今天的意思「曲奇」就是借入时的本义，一路没变。',
 'disp': '1730 年苏格兰语 cookie「素面包」是否为同一词存疑（Etymonline 并记），本档记 1808 年美语一线。',
 'folk': 'cookie 与 cook 并不同源（Wiktionary 明言 Not related to cook）——形近而谱不同。', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['true'] = {
 'chain': [('Proto-Indo-European', '*deru-', '坚牢；稳固', '原始印欧语时期'),
           ('Proto-Germanic', '*triwwiz', '忠实的；可信的', '原始日耳曼语时期'),
           ('Old English', 'trēowe', '忠实可信的', '古英语时期'),
           ('Middle English', 'trewe', '真的', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏同载 trēowe）',
 'orig': '忠实可信的',
 'path': [('忠实可信的', '古英语时期', ''),
          ('真的，真实的，正确的', '现代', '老根是「坚牢」（与 tree 同根：木头般结实）：先说人靠得住（守信、忠实），约 1200 年转说事靠得住（与事实相符）——可信的人 → 可信的话（由品性到真值）')],
 'mech': 'true 是「像木头一样结实」：人结实叫忠实，话结实叫真实。',
 'link': '今天的意思「真的」从「忠实可信」转来：靠得住，就是真。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['august'] = {
 'chain': [('Latin', 'Augustus', '尊崇者（屋大维的尊号）', '拉丁语时期'),
           ('Latin', 'augustus', '八月（奥古斯都之月）', '拉丁语时期'),
           ('Old English', 'Agustus', '八月', '古英语时期'),
           ('Middle English', 'August', '八月', '中古英语时期')],
 'fa': '古英语时期已借入（作 Agustus；中古英语重新拉丁化作 August）',
 'orig': '奥古斯都之月',
 'path': [('奥古斯都之月', '拉丁语时期', ''),
          ('八月', '现代', '月份以罗马皇帝奥古斯都的尊号命名：augustus 本义「尊崇的」。英语古时借作 Agustus，后按拉丁语原形改拼 August（以人名名月份）')],
 'mech': 'August 是皇帝的名字：八月，是奥古斯都的月份。',
 'link': '今天的意思「八月」就是命名时的本义，一路没变。',
 'disp': '尊号 Augustus 本身更深来源两说（古拉丁语 *augos「增长」与 avis「鸟」（占卜观鸟）说）；另有同形形容词 august「庄严的」（1660 年代另行借入），与月份词同源异途，本档只记月份。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['herself'] = {
 'chain': [('Old English', 'hire self', '她自己', '古英语时期'),
           ('Middle English', 'herself', '她自己', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：hire self）',
 'orig': '她自己',
 'path': [('她自己', '古英语时期', ''),
          ('她自己', '现代', '本是与格 hire + self 的短语：14 世纪起 hire 被重新理解为属格 her，短语凝固成 her + self（短语化石，格的再分析）')],
 'mech': 'herself 是「hire self」粘成的：格变了，词合了。',
 'link': '今天的意思「她自己」就是短语本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}

R = {
 'nineteen': 'compositional（主干复核后）：nine + -teen（ten 的弱化形）复合数词，古英语 niġontīene、日耳曼语 *newuntehun 两源一致；构件自明，本词不单独立档，保持待核',
 'building': 'compositional（主干复核后）：build + -ing 动名词（约 1300 年「建筑物」义、14 世纪晚期「建造过程」义），构件自明，本词不单独立档，保持待核',
 'trust': 'trunk_divergent（主干复核后）：词根同属日耳曼语 *traust-／*treuw- 家族无争议，但入英路径真分歧——牛津与 Etymonline 作古诺斯语 traust 借词说，Wiktionary 引 Dance (2014) 谓元音不合、应为未见载古英语本土形式 *trust 的存续；借词与存续未定，保持待核',
}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
