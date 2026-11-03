# -*- coding: utf-8 -*-
import assemble as A

NUM = {
 'eight': ('*oḱtṓw', '*ahtōu', 'eahta', 'eighte', '八'),
 'six': ('*swéḱs', '*sehs', 'six', 'six', '六'),
 'ten': ('*déḱm̥', '*tehun', 'tīen', 'ten', '十'),
 'three': ('*tréyes', '*þrīz', 'þrī', 'thre', '三'),
 'two': ('*dwóh₁', '*twai', 'twā', 'two', '二'),
}
S = {}
for w, (pie, pgm, oe, me, zh) in NUM.items():
    S[w] = {
     'chain': [('Proto-Indo-European', pie, zh, '原始印欧语时期'),
               ('Proto-Germanic', pgm, zh, '原始日耳曼语时期'),
               ('Old English', oe, zh, '古英语时期'),
               ('Middle English', me, zh, '中古英语时期')],
     'fa': '古英语时期就已经有了（Etymonline 词条以古英语词形起头）',
     'orig': zh,
     'path': [(zh, '原始印欧语时期', ''),
              (zh, '现代', '数词的意思几千年没动过：从印欧语、日耳曼语一路传到今天，数的都是同一个数（词义稳定）')],
     'mech': w + ' 是印欧语传下来的老数词，意思从来没变过。',
     'link': '今天的意思「' + zh + '」就是最早的意思，一路没变。',
     'disp': '无已知争议',
     'folk': '未见流传假词源',
     'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['six']['srcs'] = ['ox', 'et', 'wk']; S['six']['grade'] = 'ox_et'
S['ten']['srcs'] = ['ox', 'et', 'wk']; S['ten']['grade'] = 'ox_et'
S['three']['srcs'] = ['ox', 'et', 'wk']; S['three']['grade'] = 'ox_et'
S['two']['srcs'] = ['ox', 'et', 'wk']; S['two']['grade'] = 'ox_et'
S['eight']['fa'] = '古英语时期就已经有了（中古英语作 ehte，约 1200 年；eight 拼法 14 世纪晚期）'
S['in'] = {
 'chain': [('Proto-Indo-European', '*en', '在……里面', '原始印欧语时期'),
           ('Proto-Germanic', '*in', '在……里面', '原始日耳曼语时期'),
           ('Old English', 'in', '在……里面；进入', '古英语时期'),
           ('Middle English', 'in', '在……里面', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 in 起头）',
 'orig': '在……里面；进入',
 'path': [('在……里面；进入', '古英语时期', ''),
          ('在……里面', '现代', '古英语介词 in 与副词 inne（在里面）在中古英语合流成一个词；义域本就宽（在内、进入、在……期间），现代格局基本未变（词形合流，词义稳定）')],
 'mech': 'in 是印欧语的老介词，从祖先语到今天就管一件事：在里面。',
 'link': '今天的意思「在……里面」就是最早的意思，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['under'] = {
 'chain': [('Proto-Indo-European', '*ndher-', '在……下面', '原始印欧语时期'),
           ('Proto-Germanic', '*under', '在……下面', '原始日耳曼语时期'),
           ('Old English', 'under', '在……下面', '古英语时期'),
           ('Middle English', 'under', '在……下面', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 词条以古英语 under 起头）',
 'orig': '在……下面',
 'path': [('在……下面', '古英语时期', ''),
          ('在……下面', '现代', '主干义稳定：位置低、在下方；古英语时已引申「受制于、少于」，14 世纪晚期添「低于（标准、价格）」——从空间的低到程度的低（比喻）')],
 'mech': 'under 的老义就是「在下面」：东西在下面，地位、数量也可以「在下面」。',
 'link': '今天的意思「在……下面」就是最早的意思，一路没变。',
 'disp': 'Wiktionary 指出 under 的「在……之间」一义可能出自另一印欧词根 *h₁entér「在内」与之合流；主干 *ndher-「在下面」三家一致，不影响本档。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk', 'ox'], 'grade': 'et_wk_ox'}

R = {'big': 'origin_unknown（主干复核后）：三源一致认定来源未定——牛津明标 of unknown origin，Etymonline 称 obscure origin、或为斯堪的纳维亚方言来源（挪威语 bugge「大人物」），Wiktionary 仅给出 *bugja-「肿起」的推测链；无可互证的主干，保持待核'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
