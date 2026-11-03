# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['dynamite'] = {
 'chain': [('Ancient Greek', 'δύναμις (dýnamis)', '力量', '古希腊时期'),
           ('Swedish', 'dynamit', '炸药', '1867 年'),
           ('English', 'dynamite', '炸药', '1867 年')],
 'fa': '1867 年进入英语（Etymonline 与 Wiktionary 均系于诺贝尔 1867 年造词）',
 'orig': '炸药',
 'path': [('炸药', '1867 年', ''),
          ('炸药', '现代', '诺贝尔以硝化甘油加吸附剂制成，瑞典语名 dynamit：希腊语 dýnamis「力量」+ -ite——力量本身（造词档案）')],
 'mech': 'dynamite 是「把力量装进管里」：诺贝尔的自造词。',
 'link': '今天的意思「炸药」就是造词原义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
# 形态记录（过去分词）
S['eaten'] = {
 'chain': [('Proto-Germanic', '*etanaz', '（已）吃的（分词）', '原始日耳曼语时期'),
           ('Old English', 'eten', '吃过的', '古英语时期'),
           ('Middle English', 'eten', '吃过的', '中古英语时期')],
 'fa': '古英语时期见载（Etymonline：Old English eten，eat 的过去分词）',
 'orig': '吃过的（过去分词）',
 'path': [('吃过的（过去分词）', '古英语时期', ''),
          ('eat 的过去分词（吃）', '现代', 'eat 的强变化分词形：-en 结尾是古分词标志（形态层记录，动词本身见 eat 条）（形式记录）')],
 'mech': 'eaten 是 eat 的「完成脸」：-en 是古英语的分词徽。',
 'link': '它与 eat 是同一个词的两种形貌。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['economic'] = {
 'chain': [('Ancient Greek', 'οἶκος (oîkos)', '房屋', '古希腊时期'),
           ('Ancient Greek', 'νέμειν (némein)', '管理', '古希腊时期'),
           ('Ancient Greek', 'οἰκονομία (oikonomía)', '持家', '古希腊时期'),
           ('Latin', 'oeconomicus', '持家的', '拉丁语时期'),
           ('Middle English', 'economike', '经济的', '中古英语时期')],
 'fa': '晚期中古英语作名词入英（牛津）；形容词义 1590 年代（Etymonline：1590s，义为「与持家有关的」）',
 'orig': '持家的',
 'path': [('持家的', '古希腊时期', ''),
          ('经济的；经济学的', '现代', 'oîkos「家」+ nemein「管」：色诺芬有专著《经济论》讲持家之道。1835 年「经济学的」义立并成主流，economical 守「节俭」旧义（由持家到经济）')],
 'mech': 'economic 先是一个家的账：国家的大账是后来的。',
 'link': '今天的意思「经济的」从「持家」放大而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['economy'] = {
 'chain': [('Ancient Greek', 'οἰκονομία (oikonomía)', '持家', '古希腊时期'),
           ('Latin', 'oeconomia', '持家', '拉丁语时期'),
           ('Middle English', 'yconomye', '经济', '中古英语时期')],
 'fa': '约 1440 年首见（Wiktionary：首载义为「事务管理」，指修道院）；1530 年代「持家」义（Etymonline）',
 'orig': '持家（管家务）',
 'path': [('持家（管家务）', '古希腊时期', ''),
          ('经济；节约', '现代', '「一国的财富与资源」义 1650 年代（political economy 的简称）；1780 年代美国建国者嘴里它还多半只作「节俭」用（由持家到国计）')],
 'mech': 'economy 是「管家」：先管灶台，后管国库。',
 'link': '今天「经济/节约」两义都出自持家。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['editor'] = {
 'chain': [('Latin', 'ēdere', '拿出；出版', '拉丁语时期'),
           ('Latin', 'ēditor', '拿出者；出版者', '拉丁语时期'),
           ('English', 'editor', '编辑；主编', '1640 年代')],
 'fa': '1640 年代见载（Etymonline：1640s，义为「出版者」）',
 'orig': '出版者',
 'path': [('出版者', '拉丁语时期', ''),
          ('编辑；主编', '现代', 'ēditor 本指「办赛会的人、推出者」：1712 年「备稿待印的人」义立，1803 年报界义定型（由推出到编辑）')],
 'mech': 'editor 是「把东西推出来的人」：先推赛会，后推稿件。',
 'link': '今天的意思「编辑」从「出版者」窄化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['effect'] = {
 'chain': [('Proto-Indo-European', '*dʰeh₁-', '安放', '原始印欧语时期'),
           ('Latin', 'facere', '做；造', '拉丁语时期'),
           ('Latin', 'efficere', '做成；完成', '拉丁语时期'),
           ('Latin', 'effectus', '完成；结果', '拉丁语时期'),
           ('Middle English', 'effect', '效果', '中古英语时期')],
 'fa': '14 世纪中期进入英语（Etymonline：mid-14c.，义为「（行为的）执行或完成」）',
 'orig': '完成；结果',
 'path': [('完成；结果', '拉丁语时期', ''),
          ('效果；影响', '现代', 'ex-「透」+ facere「做」：做成了，结果随之而至；「给人的印象」义 1736 年，舞台/音响效果 1881 年（由完成到效果）')],
 'mech': 'effect 是「做完之后」：事成，效至。',
 'link': '今天的意思「效果」就是本义的自然延伸。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['efficient'] = {
 'chain': [('Latin', 'efficere', '做成；完成', '拉丁语时期'),
           ('Latin', 'efficiēns', '致效的', '拉丁语时期'),
           ('English', 'efficient', '高效的', '1398 年')],
 'fa': '1398 年见载（Wiktionary：1398，义为「making 致成」）；Etymonline 作 14 世纪晚期',
 'orig': '致效的（能做成的）',
 'path': [('致效的（能做成的）', '拉丁语时期', ''),
          ('高效的；效率高的', '现代', 'efficere 的分词（见 effect 条）：现义「产出的、熟练的」1787 年定型（由致效到高效）')],
 'mech': 'efficient 是「真能办成事的」：从 effect 的分词来。',
 'link': '今天的意思「高效」是「致效」的现代版。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['eliminate'] = {
 'chain': [('Latin', 'līmen', '门槛', '拉丁语时期'),
           ('Latin', 'ēlīmināre', '逐出门外', '拉丁语时期'),
           ('English', 'eliminate', '消除；淘汰', '1560 年代')],
 'fa': '1560 年代见载（Etymonline：1560s，义为「逐出、扔出门外」）',
 'orig': '逐出门槛',
 'path': [('逐出门槛', '拉丁语时期', ''),
          ('消除；淘汰', '现代', 'ex līmine「越过门槛」：先是字面往外赶，1714 年「作为多余者剔除」义立——淘汰赛里他被「赶出门」（由赶出到淘汰）')],
 'mech': 'eliminate 是「推出门槛」：门外的人，就出局了。',
 'link': '今天的意思「淘汰」就是本义的赛场版。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
