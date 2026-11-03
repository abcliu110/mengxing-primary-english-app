# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['too'] = {
 'chain': [('Old English', 'tō', '向；到（重读时兼「也」）', '古英语时期'),
           ('Middle English', 'to', '也；太', '中古英语时期')],
 'fa': '「也」义古英语已有，「太」义约 1300 年；too 的 -oo 拼法 16 世纪定型（Etymonline）',
 'orig': '也；此外',
 'path': [('也；此外', '古英语时期', ''),
          ('也；太', '现代', 'too 本是 to 的重读形：tō 的副词用法先有「另外、也」——来自「分开、另在一边」的意思；添的东西过了头，就是「太」（约 1300）（从额外到过量）；16 世纪用 -oo 拼法把重读的它与介词 to 分家')],
 'mech': 'too 是 to 被重读时的样子：另在一边添一份是「也」，添过头是「太」。',
 'link': '今天的意思「也；太」是同一个「额外添上」长出的两头。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['gave'] = {
 'chain': [('Old English', 'ġæf', '给（give 的过去式）', '古英语时期'),
           ('Middle English', 'gaf', '给（过去式）', '中古英语时期')],
 'fa': '古英语时期就已经有了（ġæf/ġeaf 为 give 的过去式，Wiktionary 链载）',
 'orig': '给（give 的过去式）',
 'path': [('给（give 的过去式）', '古英语时期', ''),
          ('给（过去式）', '现代', '词义无变化：gave 一直是强变化动词 give 的过去式（i → a 的元音交替是日耳曼强变化的正规律）；give 本词主干已另档核定（见 give），本档只记过去形的形史')],
 'mech': 'gave 是 give 的过去式：元音 i 换成 a，是老强变化动词的规矩变法。',
 'link': '今天的 gave 就是古英语 ġæf，意思一点没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['around'] = {
 'chain': [('Middle English', 'on round', '在圆周上；环绕', '中古英语时期'),
           ('Middle English', 'arounde', '在……周围', '中古英语晚期')],
 'fa': '约 1300 年见载（Etymonline：from phrase on round）',
 'orig': '在圆周上；环绕',
 'path': [('在圆周上；环绕', '中古英语时期', ''),
          ('在……周围；到处', '现代', '短语 on round「在圆上」凝成一个词：贴着圆周 → 在四周；1776 年美式英语添「到处（无固定方向）」——绕着圈走，就是到处（短语凝合后扩展）')],
 'mech': 'around 是 on round 凝成的：沿着圆走一圈，就是在周围。',
 'link': '今天的意思「在……周围」就是「在圆周上」的凝合形，意思守恒。',
 'disp': '组成部分 round 是经法语借入的词（Wiktionary 注明），其自身谱系见 round 的记录口径。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['off'] = {
 'chain': [('Proto-Indo-European', '*h₂epo', '从；离开', '原始印欧语时期'),
           ('Proto-Germanic', '*ab', '从；离开', '原始日耳曼语时期'),
           ('Old English', 'of（æf）', '离开；远离', '古英语时期'),
           ('Middle English', 'of', '离开', '中古英语时期')],
 'fa': '约 1200 年起作 of 的重读变体分立（Etymonline：by c. 1200 as an emphatic form of of）',
 'orig': '离开；远离',
 'path': [('离开；远离', '古英语时期', ''),
          ('离开；（电器）关着', '现代', 'off 是 of 的重读分身：17 世纪分工落定，off 守住「离开、脱离」的老义，弱读的 of 转去管「……的」；1861 年添「（机器、电器）关着」——脱离了运转，就是关（老义的现代应用）')],
 'mech': 'off 和 of 本是一个词：重读的 off 守「离开」，弱读的 of 管「……的」。',
 'link': '今天的意思「离开」就是最早的意思；「关着」是「脱离（运转）」的新岗位。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['said'] = {
 'chain': [('Old English', 'sǣde', '说（say 的过去式）', '古英语时期'),
           ('Middle English', 'seide', '说（过去式）', '中古英语时期')],
 'fa': '古英语时期就已经有了（sǣde 为 say 的过去式，Wiktionary 链载）',
 'orig': '说（say 的过去式）',
 'path': [('说（say 的过去式）', '古英语时期', ''),
          ('说（过去式与过去分词）', '现代', '词义无变化：said 是 say 的弱变化过去形（say + -ed 在古英语作 sǣde，元音缩短是规矩现象）；say 本词主干已另档核定（见 say），本档只记过去形的形史')],
 'mech': 'said 是 say 的过去式：古英语 sǣde 的元音缩短，落成了 said。',
 'link': '今天的 said 就是古英语 sǣde，意思一点没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S["don't"] = {
 'chain': [('English', 'do not', '不做', '17 世纪'),
           ('English', "don't", '不', '17 世纪')],
 'fa': '1630 年代见载于剧本（Etymonline：recorded in plays from 1630s）',
 'orig': '不做（do not 的缩约）',
 'path': [('不做（do not 的缩约）', '17 世纪', ''),
          ('不', '现代', '词义无变化：do not 在口语里连读缩合成 don\'t（缩约词）；伊丽莎白时代剧本里它也曾是 done it 的缩约（Etymonline 注）')],
 'mech': "don't 是 do not 说快了粘在一起的样子，意思一点没变。",
 'link': "今天的 don't 就是 17 世纪的缩约形，意思守恒。",
 'disp': "缩约后元音读作 /oʊ/ 的来历，Wiktionary 标注尚待解释（rfe），不影响缩约本身的认定。",
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['has'] = {
 'chain': [('Middle English', 'haves', '有（have 的第三人称单数）', '中古英语时期'),
           ('Middle English', 'has', '有（第三人称单数）', '中古英语晚期')],
 'fa': '中古英语时期见载 has/haves 等形（Wiktionary 链载）',
 'orig': '有（have 的第三人称单数）',
 'path': [('有（have 的第三人称单数）', '中古英语时期', ''),
          ('有（第三人称单数）', '现代', '词义无变化：has 是 have 换上 -s 词尾的第三人称单数形，顶替了更老的 hath（have + -th）；have 本词主干已另档核定（见 have），本档只记这一词尾形的形史')],
 'mech': 'has 是 have 的第三人称单数：-th 词尾换成 -s，就是 has。',
 'link': '今天的 has 与中古英语 has 同形同义，一点没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}

R = {
 'funny': 'compositional（主干复核后）：fun + -y 构词透明，1756 年始见（Etymonline），「奇怪」义 1806 年；基词 fun 本身尚在待核，派生词按项目口径随基词处理，不单独立档',
 'been': 'form_of_be（主干复核后）：been 是 be 的过去分词（古英语 (ġe)bēon），形史本身无争议；但 be 为多词根拼合的异干互补动词（*h₁es-／*bʰuH-／*h₂wes- 三系），本库未收 be 的主干词条，been 的深层谱系无从附着，待 be 立档后随附'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
