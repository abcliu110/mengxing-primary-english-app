# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['closet'] = {
 'chain': [('Latin', 'claudere', '关闭', '拉丁语时期'),
           ('Latin', 'clausum', '封闭的空间', '拉丁语时期'),
           ('Old French', 'closet', '小房间', '古法语时期'),
           ('Middle English', 'closet', '壁柜', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「读书祈祷的小密室」）',
 'orig': '小密室',
 'path': [('小密室', '古法语时期', ''),
          ('衣橱，壁柜', '现代', 'clos「围起来的地方」的指小形，与 close 同根：先是关起门读书祈祷的小间，1610 年代转指储物的小间——装东西的 Closet（由静室到储物间）')],
 'mech': 'closet 是「关得起来的小间」：先关人静修，后关衣物。',
 'link': '今天的意思「壁柜」从「小密室」来：关着的空间换了用途。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['birthday'] = {
 'chain': [('Old English', 'ġebyrddæġ', '诞辰纪念日', '古英语时期'),
           ('Middle English', 'birthdai', '生日', '中古英语时期')],
 'fa': '14 世纪晚期见载复合形（Etymonline；古英语 byrddæg 先行）',
 'orig': '诞辰纪念日',
 'path': [('诞辰纪念日', '古英语时期', ''),
          ('生日', '现代', 'birth + day：古时此词先指「出生的周年纪念」（多为国王、圣徒的诞辰），「出生当天」义迟至 1570 年代才立——纪念日先行，本日后到（由周年到本日）')],
 'mech': 'birthday 先过的是「周年」：出生那天，反倒晚了几百年才轮上。',
 'link': '今天的意思「生日（出生日）」是 1570 年代才定型的后来义。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['careful'] = {
 'chain': [('Old English', 'carful', '悲伤的；忧虑的', '古英语时期'),
           ('Middle English', 'careful', '小心的', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：cearful，义为「悲伤的、满怀忧虑的」）',
 'orig': '充满忧虑的',
 'path': [('充满忧虑的', '古英语时期', ''),
          ('小心的，仔细的，认真的', '现代', 'care 本义近「忧、愁」：心里装着忧虑 → 做事不敢马虎——古英语晚期「专注、尽心」义已成主流（由心情到做事态度）')],
 'mech': 'careful 是「心里有事」：忧着虑着，手上就仔细了。',
 'link': '今天的意思「仔细的」从「忧虑的」转来：操心操出了认真。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['wonderful'] = {
 'chain': [('Old English', 'wundorful', '非凡的；超自然的', '古英语时期'),
           ('Middle English', 'wonderful', '极好的', '中古英语时期')],
 'fa': '古英语晚期就已经有了（Etymonline：wunderfoll，义为「非凡的、超自然的」）',
 'orig': '非凡的；超自然的',
 'path': [('非凡的；超自然的', '古英语晚期', ''),
          ('极好的，精彩的，奇妙的', '现代', 'wonder + -ful：先是「怪异到近乎魔法」，约 1200 年「品质高到令人惊奇」，口语里再虚化为一般的「极好」——惊奇感一路磨平（由惊异到赞赏的褪色）')],
 'mech': 'wonderful 是「惊得合不拢嘴」：惊奇说多了，就成了夸奖。',
 'link': '今天的意思「极好的」是惊奇义磨平后的夸奖话。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['review'] = {
 'chain': [('Latin', 'vidēre', '看见', '拉丁语时期'),
           ('Latin', 'revidēre', '再看；回头看', '拉丁语时期'),
           ('Old French', 'reveue', '检阅', '古法语时期'),
           ('Middle English', 'revewe', '复习', '中古英语时期')],
 'fa': '15 世纪中期见载名词（Etymonline：mid-15c.，义为「军队检阅」）',
 'orig': '检阅（再看一遍）',
 'path': [('检阅（再看一遍）', '拉丁语时期', ''),
          ('复习，温习；回顾；评论', '现代', 're-「再」+ vidēre「看」：先是长官把部队再看一遍（检阅），1560 年代「重温、复查」，1640 年代「书评影评」，1705 年成刊物名（由看兵到看书）')],
 'mech': 'review 是「再看一遍」：兵再看、书再看、课再看，都是 review。',
 'link': '今天的意思「复习」就是本义「再看」的课堂版。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['repeat'] = {
 'chain': [('Proto-Indo-European', '*pet-', '冲；飞', '原始印欧语时期'),
           ('Latin', 'petere', '求取；进攻', '拉丁语时期'),
           ('Latin', 'repetere', '再求；重做', '拉丁语时期'),
           ('Old French', 'repeter', '重复', '古法语时期'),
           ('Middle English', 'repeten', '重复', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「把说过的话再说」）',
 'orig': '再次求取；重做',
 'path': [('再次求取；重做', '拉丁语时期', ''),
          ('重复，跟读', '现代', 'petere 是「扑向、求取」：re-「再」——再扑一次、再说一遍。「跟读」（说别人说过的话）义 1590 年代（由再做到再说）')],
 'mech': 'repeat 是「再来一次」：求过的话，再说一遍。',
 'link': '今天的意思「重复」就是构词本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['appear'] = {
 'chain': [('Latin', 'pārēre', '显现；出现', '拉丁语时期'),
           ('Latin', 'appārēre', '出现在眼前', '拉丁语时期'),
           ('Old French', 'aparoir', '出现', '古法语时期'),
           ('Middle English', 'apperen', '出现', '中古英语时期')],
 'fa': '13 世纪晚期进入英语（Etymonline：late 13c.，义为「进入视野」）',
 'orig': '显现出来',
 'path': [('显现出来', '拉丁语时期', ''),
          ('出现，显得', '现代', 'ad-「向」+ pārēre「露面」：从看不见到看得见。14 世纪晚期生「显得、看起来」义——眼里的样子，未必是实情（由显现到表象）')],
 'mech': 'appear 是「露面」：先让人看见，后让人看着像。',
 'link': '今天的意思「出现；显得」同出此源：实义与表象义一墙之隔。',
 'disp': 'pārēre 本身来源未定（de Vaan 谓或出印欧语 *prh-o-「提供」），本档止于拉丁语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {'disappear': 'compositional（主干复核后）：dis-（表逆转）+ appear 构成（15 世纪早期），仿法语 disparaître，曾顶替本土 fordwīnan；构件自明，本词不单独立档，保持待核'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
