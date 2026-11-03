# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['farm'] = {
 'chain': [('Latin', 'firmus', '牢固的；固定的', '拉丁语时期'),
           ('Medieval Latin', 'firma', '定额付款（契约）', '中世纪拉丁语时期'),
           ('Old French', 'ferme', '租约；定额租金', '古法语时期'),
           ('Middle English', 'ferme', '农场', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300，义为「定额付款、定额租金」）',
 'orig': '定额租税（固定付款）',
 'path': [('定额租税（固定付款）', '约 1300 年', ''),
          ('农场，农庄', '现代', '先有「按契约定的死数」：交这个数的地 → 14 世纪早期指「租来的地」，1520 年代才定型为「耕地、农场」——农业义其实很晚（Century Dictionary 语，两源同引）（由契约金额到土地）')],
 'mech': 'farm 先是账本上的定额：交租的地，才慢慢叫农场。',
 'link': '今天的意思「农场」从「定额租金」绕了三弯：钱数 → 租约 → 土地。',
 'disp': '中世纪拉丁语 firma 或另受古英语 feorm「给养、租供」影响，其与 firma 的关系学界有争论（Wiktionary 详录两说）；自 firmus 以下的主干两源一致。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['celebrate'] = {
 'chain': [('Latin', 'celeber', '人多的；常被光顾的', '拉丁语时期'),
           ('Latin', 'celebrāre', '隆重庆贺', '拉丁语时期'),
           ('Middle English', 'celebraten', '庆祝', '中古英语时期')],
 'fa': '15 世纪中期进入英语（Etymonline：mid-15c.，原指举行弥撒）',
 'orig': '隆重举行（仪式）',
 'path': [('隆重举行（仪式）', '15 世纪中期', ''),
          ('庆祝，庆贺', '现代', 'celebrāre 的老义是「成群地去、隆重地办」：人多热闹地办仪式；1550 年代泛化为「以欢庆纪念」，1610 年代又有「颂扬」义（由仪式到泛指庆祝）')],
 'mech': 'celebrate 是「大伙儿凑热闹」：人到得齐，事办得隆重，就是庆祝。',
 'link': '今天的意思「庆祝」从「隆重举行仪式」泛化而来。',
 'disp': 'celeber 本身更深来源未定（Etymonline 明言 Its etymology is unknown），本档止于拉丁语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['environment'] = {
 'chain': [('French', 'environnement', '环绕；周围', '法语近现代'),
           ('English', 'environment', '环境', '约 1600 年')],
 'fa': '约 1600 年见载（Etymonline：c. 1600，义为「被环绕的状态」）',
 'orig': '被环绕（的状态）',
 'path': [('被环绕（的状态）', '约 1600 年', ''),
          ('自然环境，周围环境', '现代', '本是 environ「环绕」+ -ment：先指「被围着」这个状态；1827 年卡莱尔用它转译德语 Umgebung，生出「人所处的一切条件」义；1956 年生态学专义定型（由状态到条件的总和）')],
 'mech': 'environment 是「围着你的那一圈」：圈里的条件总和，就是环境。',
 'link': '今天的意思「环境」从「被环绕」抽象化：环绕的东西成了条件。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['easy'] = {
 'chain': [('Old French', 'aisié', '安适的；在闲暇中的', '古法语时期'),
           ('Middle English', 'esy', '容易的', '中古英语时期')],
 'fa': '约 1200 年见载（Etymonline：c. 1200，义为「安适、无不适」）',
 'orig': '安适的；自在的',
 'path': [('安适的；自在的', '约 1200 年', ''),
          ('容易的，不费力的', '现代', '先说人舒服（身子自在、不焦虑），13 世纪晚期转说事不难：做起来让人自在的事，就是容易的（由感受主体的状态到事情的难度）')],
 'mech': 'easy 先是「人自在」：做着不费劲的事，才叫容易。',
 'link': '今天的意思「容易的」从「安适的」转来：主语从人换成了事。',
 'disp': '本词与本土词 ethe（出古英语 īeþe）合流（两源并记）；法语 aise 本身来源未定。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {
 'impossible': 'compositional（主干复核后）：im-（in- 的同化形，义「不」）+ possible，整体出拉丁语 impossibilis 经古法语于 14 世纪晚期入英；否定构件完全透明，本词不单独立档，保持待核',
 'worker': 'compositional（主干复核后）：work + -er 行为人名词（14 世纪中期），曾顶替旧词 wright；构件自明，本词不单独立档，保持待核',
 'singer': 'compositional（主干复核后）：sing + -er 行为人名词（约 1300 年），顶替古英语 sangere；构件自明，本词不单独立档，保持待核',
 'winner': 'compositional（主干复核后）：win + -er 行为人名词（14 世纪晚期）；构件自明，本词不单独立档，保持待核',
}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
