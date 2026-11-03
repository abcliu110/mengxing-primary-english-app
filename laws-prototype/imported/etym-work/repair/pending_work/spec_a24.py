# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['palace'] = {
 'chain': [('Latin', 'Palātium', '帕拉蒂尼山', '拉丁语时期'),
           ('Latin', 'palātium', '宫殿', '拉丁语时期'),
           ('Old French', 'palais', '宫殿', '古法语时期'),
           ('Middle English', 'paleys', '宫殿', '中古英语时期')],
 'fa': '13 世纪初进入英语（Etymonline：early 13c.，义为「帝王、主教的官邸」）',
 'orig': '帕拉蒂尼山（山上的皇帝居所）',
 'path': [('帕拉蒂尼山（山上的皇帝居所）', '拉丁语时期', ''),
          ('宫殿', '现代', '罗马七丘之一：奥古斯都的宅邸就在山上，后来尼禄等皇帝的华宫相继——山名先在拉丁语里兼指宫殿，再成通名（由专名到通名）')],
 'mech': 'palace 是「那座山」：皇帝住过的山，名字成了所有宫殿。',
 'link': '今天的意思「宫殿」源自罗马的一座山丘。',
 'disp': '山名 Palātium 本身三说未决：palus「桩」（围栅说）、伊特鲁里亚语与牧神 Pales 相关说、de Vaan 的 palatum「穹顶」说。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['theatre'] = {
 'chain': [('Ancient Greek', 'θεάομαι (theáomai)', '观看', '古希腊时期'),
           ('Ancient Greek', 'θέατρον (théatron)', '观看之所', '古希腊时期'),
           ('Latin', 'theātrum', '剧场', '拉丁语时期'),
           ('Middle English', 'theater', '剧院', '中古英语时期')],
 'fa': '中古英语晚期进入英语（牛津：late Middle English）',
 'orig': '观看之所',
 'path': [('观看之所', '古希腊时期', ''),
          ('剧院', '现代', '字面就是「看的地方」：希腊的半圆剧场对山坡而建，看的人比演的人多（借词守恒）')],
 'mech': 'theatre 是「看的地方」：戏是演给人看的，名字先说了看。',
 'link': '今天的意思「剧院」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['market'] = {
 'chain': [('Latin', 'merx', '货物', '拉丁语时期'),
           ('Latin', 'mercātus', '交易；集市', '拉丁语时期'),
           ('Old French', 'marchié', '市场', '古法语时期'),
           ('Middle English', 'market', '市场', '中古英语时期')],
 'fa': '12 世纪初进入英语（Etymonline：early 12c.，义为「定时买卖牲口与给养的集会」）',
 'orig': '交易；集市',
 'path': [('交易；集市', '拉丁语时期', ''),
          ('市场', '现代', 'merx「货物」的家族（墨丘利 Mercurius 或为交易之神）：13 世纪晚期兼指场所，1680 年代添「供求之市」抽象义（由交易到市场）')],
 'mech': 'market 是「货」的集会：有货要卖，就有了市。',
 'link': '今天的意思「市场」就是本义，一路没变。',
 'disp': '意大利语根 *merk- 或出伊特鲁里亚语（de Vaan 引 Walde-Hoffmann），未定论，本档止于拉丁语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['restaurant'] = {
 'chain': [('Latin', 'restaurāre', '使恢复', '拉丁语时期'),
           ('French', 'restaurer', '使恢复；供食', '法语近现代'),
           ('French', 'restaurant', '滋补的食物', '1765 年前后'),
           ('English', 'restaurant', '餐馆，餐厅', '1806 年前后')],
 'fa': '1806 年前后见载（Etymonline：by 1806，法国语境）',
 'orig': '滋补的食物（汤）',
 'path': [('滋补的食物（汤）', '1765 年前后', ''),
          ('餐馆，餐厅', '现代', '巴黎 Boulanger 约 1765 年卖「恢复元气的浓汤」，店以汤名：卖 restaurant（滋补汤）的店，就叫 restaurant（由食物到店）')],
 'mech': 'restaurant 是「回血汤」：先有汤，后有店。',
 'link': '今天的意思「餐馆」从一道滋补汤的名字长出来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['company'] = {
 'chain': [('Latin', 'pānis', '面包', '拉丁语时期'),
           ('Late Latin', 'compāniō', '同食面包者', '晚期拉丁语时期'),
           ('Old French', 'compaignie', '同伴；团体', '古法语时期'),
           ('Middle English', 'companye', '公司', '中古英语时期')],
 'fa': '12 世纪中期进入英语（Etymonline：mid-12c.，义为「一大群人」）',
 'orig': '同伴（一起吃面包的人）',
 'path': [('同伴（一起吃面包的人）', '晚期拉丁语时期', ''),
          ('公司', '现代', 'com-「一起」+ pānis「面包」：分吃同一块面包的人就是伙伴。14 世纪行会义、1550 年代商业「合伙」义立（由同伴到公司）')],
 'mech': 'company 是「一起吃面包的人」：饭桌上的交情，做成了生意。',
 'link': '今天的意思「公司」从「伙伴」转化而来。',
 'disp': '无已知争议（*compania 名词形未见载，compagnon + -ie 的构词两家并记）',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['corner'] = {
 'chain': [('Proto-Indo-European', '*ker-', '角；头', '原始印欧语时期'),
           ('Latin', 'cornū', '角（犄角）', '拉丁语时期'),
           ('Vulgar Latin', '*corna', '角', '通俗拉丁语时期'),
           ('Old French', 'corne', '角；拐角', '古法语时期'),
           ('Middle English', 'corner', '角落，街角', '中古英语时期')],
 'fa': '13 世纪晚期进入英语（Etymonline：late 13c.，义为「街道或墙相接处」）',
 'orig': '角（犄角）；尖出端',
 'path': [('角（犄角）；尖出端', '拉丁语时期', ''),
          ('角落；街角', '现代', '拉丁语 cornu 只管「角」不管「拐角」（拐角另有 angulus）：法语里「角」义伸出「拐角」义（或仿法兰克语 *hurnijā「角」），英语承之（由犄角到拐角）')],
 'mech': 'corner 是「犄角」走到墙边的样子：尖出来相接的地方。',
 'link': '今天的意思「角落」从「角」转化而来。',
 'disp': '法语「拐角」义或为法兰克语同源词的仿译（possibly calqued），两家并记。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['gate'] = {
 'chain': [('Proto-Germanic', '*gatą', '洞；开口', '原始日耳曼语时期'),
           ('Old English', 'ġeat', '门；通道', '古英语时期'),
           ('Middle English', 'gate', '大门', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：geat，复数 geatu）',
 'orig': '开口；门',
 'path': [('开口；门', '古英语时期', ''),
          ('大门', '现代', '亲属词至今多作「洞、缺口」（荷兰语 gat）与「巷」（德语 Gasse）：墙上开的口装上扇，就是门（由开口到门）')],
 'mech': 'gate 先是「墙上的口」：口上加扇，才成门。',
 'link': '今天的意思「大门」从「开口」定型。',
 'disp': '日耳曼语层以上来源未明（Etymonline：of unknown origin），本档止于日耳曼语层。',
 'folk': '未见流传假词源（词尾 -gate 表「丑闻」出 1972 年水门事件，为后起造词成分，与本词词源无关）', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['toilet'] = {
 'chain': [('Proto-Indo-European', '*tek-', '编织', '原始印欧语时期'),
           ('Latin', 'tēla', '织物；网', '拉丁语时期'),
           ('French', 'toile', '布', '法语近现代'),
           ('French', 'toilette', '小布', '法语近现代'),
           ('English', 'toilet', '洗手间', '1530 年代')],
 'fa': '1530 年代见载（Etymonline：1530s，义为「包衣服的布/袋」）',
 'orig': '小布；包衣物的布',
 'path': [('小布；包衣物的布', '16 世纪', ''),
          ('洗手间', '现代', '委婉的接力：梳妆台上的布 → 梳妆的家伙什 → 梳妆本身（1680 年代）→ 梳妆间（1819）→ 其中的盥洗设备（1895，美式委婉用法）（由布到洗手间）')],
 'mech': 'toilet 是「小布」起家：一路委婉，最后指了马桶。',
 'link': '今天的意思「洗手间」是四步委婉转义的终点。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
