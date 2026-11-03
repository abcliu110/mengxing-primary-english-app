# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['immortal'] = {
 'chain': [('Proto-Indo-European', '*mer-', '消磨；死', '原始印欧语时期'),
           ('Latin', 'mors', '死亡', '拉丁语时期'),
           ('Latin', 'mortālis', '终有一死的', '拉丁语时期'),
           ('Latin', 'immortālis', '不死的', '拉丁语时期'),
           ('Middle English', 'immortal', '不朽的', '中古英语时期')],
 'fa': '14 世纪晚期见载（Etymonline：late 14c.，义为「不死的」）',
 'orig': '不死的',
 'path': [('不死的', '拉丁语时期', ''),
          ('永生的；不朽的', '现代', 'in-「不」+ mortālis「终有一死」：15 世纪初「名声不朽」义（拉丁语里已有）；波斯「不死军」之名是希腊语 ἀθάνατος 的仿译（由不死到不朽）')],
 'mech': 'immortal 是「死不了」：先是神，后是名。',
 'link': '今天「永生/不朽」两义古时已备。',
 'disp': '波斯精锐得名两说：伤兵速补故「常满」（一说）；或希腊线人混淆古波斯语 *anauša-「不死」与 *anūšiya-「侍从、禁卫」（Wiktionary 并载）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['include'] = {
 'chain': [('Proto-Indo-European', '*(s)kleh₂w-', '钥匙；钩；钉', '原始印欧语时期'),
           ('Latin', 'claudere', '关闭', '拉丁语时期'),
           ('Latin', 'inclūdere', '关入；围入', '拉丁语时期'),
           ('Middle English', 'includen', '包括', '中古英语时期')],
 'fa': '15 世纪初进入英语（Etymonline：early 15c.，义为「（把人或物）关在里面、囚禁」，兼「作为组成部分而含有」）',
 'orig': '关入；围入',
 'path': [('关入；围入', '拉丁语时期', ''),
          ('包括；包含', '现代', 'in-「入」+ claudere「关」（与 close 同源、与 enclose 是同源双式）：关在里面的，就是包含着的（由关入到包含）')],
 'mech': 'include 是「关在里面」：门一关，都算数。',
 'link': '今天的意思「包括」就是本义的抽象化。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['incorrect'] = {
 'chain': [('Latin', 'regere', '引导；扶直', '拉丁语时期'),
           ('Latin', 'corrigere', '扶正；改正', '拉丁语时期'),
           ('Latin', 'incorrectus', '未改正的', '拉丁语时期'),
           ('Middle English', 'incorrect', '不正确的', '中古英语时期')],
 'fa': '15 世纪初见载（Etymonline：early 15c.，义为「未受矫正的（指罪人等）」，今已废）',
 'orig': '未改正的',
 'path': [('未改正的', '拉丁语时期', ''),
          ('不正确的；错误的', '现代', '牛津：后专指「未经校对、错误满篇的书」——1750 年代「事实错误」义由此立（由未校到错误）')],
 'mech': 'incorrect 是「还没改」：没校对的书，错就是错了。',
 'link': '今天的意思「错误」从「未改正」转义而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['inflammable'] = {
 'chain': [('Latin', 'flamma', '火焰', '拉丁语时期'),
           ('Latin', 'inflammāre', '点燃', '拉丁语时期'),
           ('Medieval Latin', 'īnflammābilis', '可点燃的', '中世纪拉丁语时期'),
           ('English', 'inflammable', '易燃的', '约 1600 年')],
 'fa': '约 1600 年见载（Etymonline：c. 1600，义为「能被点燃」；医学「易发炎」义早至 15 世纪初）',
 'orig': '可点燃的',
 'path': [('可点燃的', '拉丁语时期', ''),
          ('易燃的（与 flammable 同义）', '现代', 'in- 是「点入」不是「不」：1980 年代起安全标识怕人误读为「不可燃」，渐弃用它、改用 flammable——一字之差，性命攸关（消歧弃用）')],
 'mech': 'inflammable 与 flammable 同义：坑在 in- 身上。',
 'link': '今天的意思「易燃」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '常见误读是把 in- 当否定前缀——本词 in- 为「进入」义，与「不」无关（Etymonline 安全警示说明）', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['inform'] = {
 'chain': [('Latin', 'forma', '形状', '拉丁语时期'),
           ('Latin', 'īnfōrmāre', '赋形；教导', '拉丁语时期'),
           ('Middle English', 'informen', '通知', '中古英语时期')],
 'fa': '14 世纪初进入英语（Etymonline：early 14c.，义为「就某科目训练、教导」）',
 'orig': '赋形；教导',
 'path': [('赋形；教导', '拉丁语时期', ''),
          ('通知；告知', '现代', 'in-「入」+ forma「形」：给心智「塑形」就是教；14 世纪晚期「报告事实」义立——把形状交到你脑里（由赋形到告知）')],
 'mech': 'inform 是「把形送进去」：知识也是有形状的。',
 'link': '今天的意思「告知」从「塑造心智」转化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['innovation'] = {
 'chain': [('Latin', 'novus', '新的', '拉丁语时期'),
           ('Latin', 'innovāre', '更新；恢复', '拉丁语时期'),
           ('Late Latin', 'innovātiō', '更新', '晚期拉丁语时期'),
           ('Middle English', 'innovacion', '创新', '中古英语时期')],
 'fa': '15 世纪中期见载（Etymonline：mid-15c.，义为「恢复、更新」）',
 'orig': '更新；恢复',
 'path': [('更新；恢复', '拉丁语时期', ''),
          ('创新；新观念，新方法', '现代', 'in-「入」+ novus「新」：1540 年代「引入的新变化」义立——从「翻新」到「首创」（由更新到创新）')],
 'mech': 'innovation 是「把新放进去」：先是修旧，后是立新。',
 'link': '今天的意思「创新」从「更新」强化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['inspect'] = {
 'chain': [('Proto-Indo-European', '*spek-', '观察', '原始印欧语时期'),
           ('Latin', 'specere', '看', '拉丁语时期'),
           ('Latin', 'inspicere', '看进去； examine', '拉丁语时期'),
           ('English', 'inspect', '检查；视察', '1620 年代')],
 'fa': '1620 年代见载（Etymonline：1620s）',
 'orig': '看进去',
 'path': [('看进去', '拉丁语时期', ''),
          ('检查；视察', '现代', 'in-「入」+ specere「看」：目光钻进去看，就是查（由看入到检查）')],
 'mech': 'inspect 是「看进里面」：不是看一眼，是查一遍。',
 'link': '今天的意思「检查」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['interrogate'] = {
 'chain': [('Proto-Indo-European', '*reg-', '沿直线伸展', '原始印欧语时期'),
           ('Latin', 'rogāre', '询问', '拉丁语时期'),
           ('Latin', 'interrogāre', '盘问；讯问', '拉丁语时期'),
           ('English', 'interrogate', '审问', '15 世纪晚期')],
 'fa': '15 世纪晚期见载（Etymonline：late 15c.，自 interrogation 回构或直接出拉丁语分词）',
 'orig': '盘问；司法讯问',
 'path': [('盘问；司法讯问', '拉丁语时期', ''),
          ('审问；讯问', '现代', 'inter-「之间」+ rogāre「问」（本义或「伸出手」）：问答在两人之间来回，就是讯（借词守恒）')],
 'mech': 'interrogate 是「两个人之间的问」：一问一答，步步紧逼。',
 'link': '今天的意思「审问」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
