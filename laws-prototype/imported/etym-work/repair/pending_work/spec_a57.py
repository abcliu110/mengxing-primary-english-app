# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['parachute'] = {
 'chain': [('French', 'para-', '防护', '法语近现代'),
           ('French', 'chute', '坠落', '法语近现代'),
           ('French', 'parachute', '降落伞', '1784 年'),
           ('English', 'parachute', '降落伞', '1784 年')],
 'fa': '1784 年见载（Etymonline：1784，与首次实际试用同年，巴黎）',
 'orig': '防坠之具',
 'path': [('防坠之具', '1784 年', ''),
          ('降落伞', '现代', '法国航空家 Blanchard 的混血造词：para-「防」（如 parasol 防阳）+ chute「坠落」——字面「防坠落之物」（造词档案）')],
 'mech': 'parachute 是「防摔的」：名字就是功能说明书。',
 'link': '今天的意思「降落伞」就是造词原义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['parallel'] = {
 'chain': [('Proto-Indo-European', '*al-', '在彼方', '原始印欧语时期'),
           ('Ancient Greek', 'ἄλλος (állos)', '其他的', '古希腊时期'),
           ('Ancient Greek', 'παράλληλος (parállēlos)', '彼此并列的', '古希腊时期'),
           ('Middle English', 'parallel', '平行的', '中古英语时期')],
 'fa': '1540 年代见载（Etymonline：1540s，几何义）',
 'orig': '彼此并列的',
 'path': [('彼此并列的', '古希腊时期', ''),
          ('平行的；平行线', '现代', 'para-「在旁」+ allēlois「彼此」：约 1600 年喻义「（趋向）相同」（由并列到平行）')],
 'mech': 'parallel 是「你挨着我」：肩并肩，永不相交。',
 'link': '今天的意思「平行」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['patient'] = {
 'chain': [('Proto-Indo-European', '*peh₁-', '伤害；忍受', '原始印欧语时期'),
           ('Latin', 'patī', '忍受；遭受', '拉丁语时期'),
           ('Latin', 'patiēns', '忍受着的', '拉丁语时期'),
           ('Middle English', 'pacient', '有耐心的；病人', '中古英语时期')],
 'fa': '14 世纪中期进入英语（Etymonline：mid-14c.，形容词义「能忍受不幸而不怨」；名词（病人）义 14 世纪晚期）',
 'orig': '忍受着的',
 'path': [('忍受着的', '拉丁语时期', ''),
          ('有耐心的；病人', '现代', '一个词两条路：忍得住性子的，是「有耐心的」；忍着病痛的，是「病人」（由忍受到耐心/病人）')],
 'mech': 'patient 是「扛着的人」：扛脾气是耐心，扛病痛是病人。',
 'link': '今天双义同出一「忍」。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['payment'] = {
 'chain': [('Latin', 'pācāre', '平定；偿清', '拉丁语时期'),
           ('Old French', 'paiement', '付款', '古法语时期'),
           ('Middle English', 'paiement', '付款', '中古英语时期')],
 'fa': '14 世纪晚期见载（Etymonline：late 14c.，义为「支付、偿还债务的行为」）',
 'orig': '偿付；付款',
 'path': [('偿付；付款', '古法语时期', ''),
          ('付款；支付的款项', '现代', '法语借词（paiier「付」，源头是「使平息、了结」）：15 世纪中期「付出的款项」义立（借词守恒）')],
 'mech': 'payment 是「了账的那笔」：付了，心就平了。',
 'link': '今天的意思「付款」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['pedestrian'] = {
 'chain': [('Proto-Indo-European', '*ped-', '脚', '原始印欧语时期'),
           ('Latin', 'pēs', '脚', '拉丁语时期'),
           ('Latin', 'pedester', '步行的；平淡的', '拉丁语时期'),
           ('English', 'pedestrian', '乏味的；行人', '1716 年')],
 'fa': '1716 年见载（Etymonline：1716，指文章「散文式的、乏味的」）',
 'orig': '步行的；平淡的（散文式的）',
 'path': [('步行的；平淡的（散文式的）', '拉丁语时期', ''),
          ('行人，步行者；乏味的，单调的', '现代', '拉丁语里 pedester 与 equester「骑马的」相对：步行者只能写散文，上马的才配诗——英语先借「乏味」义（1716），1791 年才添「步行的」义（由平淡到行人）')],
 'mech': 'pedestrian 是「用脚走的」：文章用脚走，就叫乏味。',
 'link': '今天「行人/乏味」两义同出一「步行」。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['perceive'] = {
 'chain': [('Proto-Indo-European', '*kap-', '抓取', '原始印欧语时期'),
           ('Latin', 'capere', '拿；抓', '拉丁语时期'),
           ('Latin', 'percipere', '完全抓住；领悟', '拉丁语时期'),
           ('Middle English', 'perceyven', '察觉', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300，义为「察觉、得知」，尤指亲历而知）',
 'orig': '完全抓住（领悟）',
 'path': [('完全抓住（领悟）', '拉丁语时期', ''),
          ('察觉；理解', '现代', 'per-「彻底」+ capere「抓」：与 conceive、deceive、receive 同根四兄弟，perceive 抓的是「理」（由抓住到察觉）')],
 'mech': 'perceive 是「一把抓住」：手抓物，脑抓理。',
 'link': '今天的意思「察觉」就是本义的比喻面。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['permissible'] = {
 'chain': [('Latin', 'mittere', '送；放行', '拉丁语时期'),
           ('Latin', 'permittere', '放行；允许', '拉丁语时期'),
           ('Medieval Latin', 'permissibilis', '可允许的', '中世纪拉丁语时期'),
           ('Middle English', 'permyssyble', '许可的', '中古英语时期')],
 'fa': '15 世纪初见载（Etymonline：early 15c.，义为「可被允许的」）',
 'orig': '可放行的',
 'path': [('可放行的', '中世纪拉丁语时期', ''),
          ('许可的；可容许的', '现代', 'per-「通过」+ mittere「送」：能被「放过去」的，就是许可的（由放行到许可）')],
 'mech': 'permissible 是「关卡肯放的」：放行，即许可。',
 'link': '今天的意思「可容许」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['persuade'] = {
 'chain': [('Proto-Indo-European', '*sweh₂d-', '甘甜；合意', '原始印欧语时期'),
           ('Latin', 'suādēre', '劝说', '拉丁语时期'),
           ('Latin', 'persuādēre', '说服', '拉丁语时期'),
           ('English', 'persuade', '说服', '1510 年代')],
 'fa': '1510 年代见载（Etymonline：1510s，义为「使（人）相信」）',
 'orig': '说到（完全信服）',
 'path': [('说到（完全信服）', '拉丁语时期', ''),
          ('说服；劝说', '现代', 'per-「到底」+ suādēre「劝」（与 sweet 同根：话要甜）：1530 年代「以论证使人从」义（由劝到说服）')],
 'mech': 'persuade 是「把话说甜、说透」：sweet 的亲戚。',
 'link': '今天的意思「说服」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
