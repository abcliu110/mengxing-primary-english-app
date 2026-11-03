# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['above'] = {
 'chain': [('Proto-Indo-European', '*upo', '在下；自下而上', '原始印欧语时期'),
           ('Old English', 'ufan', '在上', '古英语时期'),
           ('Old English', 'bufan', '在…之上', '古英语时期'),
           ('Old English', 'ābufan', '在上方', '古英语时期'),
           ('Middle English', 'above', '在…上方', '中古英语时期')],
 'fa': '896 年首见（Wiktionary：first attested in 896）',
 'orig': '在（…）之上',
 'path': [('在（…）之上', '古英语时期', ''),
          ('在…斜上方（不接触）', '现代', 'on + bufan（be「靠着」+ ufan「在上」）的复合：有趣的是根 *upo 本义「在下、自下而上」——自下望上去，正是「上」。约 1200 年起兼指地位更高（由空间到等级）')],
 'mech': 'above 是「在上头」：从下面抬头看，它就在上面。',
 'link': '今天的意思「在上方」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['beside'] = {
 'chain': [('Old English', 'sīde', '侧边', '古英语时期'),
           ('Old English', 'be sīdan', '在…旁边', '古英语时期'),
           ('Middle English', 'beside', '在…旁边', '约 1200 年')],
 'fa': '约 1200 年连写成一词（Etymonline：by 1200 as one word）',
 'orig': '在旁边',
 'path': [('在旁边', '古英语时期', ''),
          ('在…旁边', '现代', '古英语本是两个词 be sīdan「挨着边」：中古另有「在外面」义，今只活在 beside oneself「（气得）不像自己了」（字面：在自己之外）（由短语到介词）')],
 'mech': 'beside 是「贴着边」：边上站着，就是旁边。',
 'link': '今天的意思「在旁边」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['than'] = {
 'chain': [('Proto-Indo-European', '*tóm', '那（宾格）', '原始印欧语时期'),
           ('Proto-Germanic', '*þan', '那时；比', '原始日耳曼语时期'),
           ('Old English', 'þanne', '那时；比', '古英语时期'),
           ('Middle English', 'than', '比', '中古英语时期')],
 'fa': '古英语时期就已经有了（与 then 同为一词）',
 'orig': '那时（与 then 同词）',
 'path': [('那时（与 then 同词）', '古英语时期', ''),
          ('比（比较标志）', '现代', '与 then 本是一个词，1700 年前后才分拼写：比较句的骨架是「A 更大，然后（是）B」——次序词被借去领第二个比较项（荷兰语 dan、德语 denn 同例）（由然后到比较）')],
 'mech': 'than 是 then 的分身：先说大的，再说「然后」那个小的。',
 'link': '今天的意思「比」与「那时」本是一词两用。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['either'] = {
 'chain': [('Old English', 'hwæþer', '两者中哪个', '古英语时期'),
           ('Old English', 'ǣġhwæþer', '两者中的每一个', '古英语时期'),
           ('Middle English', 'either', '（否定句）也', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：æghwæðer，义为「两者中的每一个、两者都」）',
 'orig': '两者中的每一个；两者都',
 'path': [('两者中的每一个；两者都', '古英语时期', ''),
          ('（否定句）也不', '现代', 'ā「总是」+ ge-（集合）+ hwæþer「哪个」的复合缩略：13 世纪晚期「二者择一」义立，1828 年否定句末的强调副词用法（也不）成熟（由各一到择一）')],
 'mech': 'either 是「每一个都算」：两个里挑哪个，它都管。',
 'link': '今天的意思从「两者中每一个」收窄、语法化而来。',
 'disp': '/aɪ/ 读法来源较不分明（Wiktionary），词形主干无争议。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['worst'] = {
 'chain': [('Proto-Indo-European', '*wers-', '搅乱；混合', '原始印欧语时期'),
           ('Proto-Germanic', '*wirsistaz', '最坏的', '原始日耳曼语时期'),
           ('Old English', 'wierrest', '最坏的', '古英语时期'),
           ('Middle English', 'worste', '最糟的', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：wirrest，义为「坏到极点」）',
 'orig': '最坏的',
 'path': [('最坏的', '古英语时期', ''),
          ('最糟的', '现代', 'worse 的最高级（比较级词干 *wirs- 的最高级）：Etymonline 谓深根 *wers-「搅乱」与 war 同源——「乱到极点」即「最坏」；古义先指罪恶，12 世纪晚期兼指品质最次（由恶到劣）')],
 'mech': 'worst 是「乱到头」：没有比它更糟的了。',
 'link': '今天的意思「最糟」就是本义，一路没变。',
 'disp': '深层构拟两记（*wers- 最高级 / *ubilaz「恶」的最高级），日耳曼语层词形一致。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['should'] = {
 'chain': [('Old English', 'sċulan', '欠；必须', '古英语时期'),
           ('Old English', 'sċeolde', '本应（过去式）', '古英语时期'),
           ('Middle English', 'scholde', '应该', '中古英语时期')],
 'fa': '约 1200 年见载（Etymonline：c. 1200）',
 'orig': '本应；欠着该做的',
 'path': [('本应；欠着该做的', '古英语时期', ''),
          ('应该', '现代', 'shall 的过去式独立成词：shall 本人的「义务」义几乎掉光，should 倒把古义守住了（义务本是「欠」：欠着的，就该还）；l 音在弱读中脱落（由过去式到情态词）')],
 'mech': 'should 是「欠着的义务」：shall 忘了的，它还记得。',
 'link': '今天的意思「应该」守着这家词最古老的义。',
 'disp': '词干 sceal 更深的谱系争议见 shall 条登记（Boutkan 质疑），本词的直接来源（sceolde 为 sceal 过去式）无争议。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['favourite'] = {
 'chain': [('Latin', 'favēre', '善待；眷顾', '拉丁语时期'),
           ('Latin', 'favor', '善意；恩宠', '拉丁语时期'),
           ('Italian', 'favorito', '受宠的', '意大利语时期'),
           ('English', 'favourite', '最喜欢的', '1580 年代')],
 'fa': '1580 年代见载（Wiktionary：attested from the 1580s）',
 'orig': '受宠爱的（人）',
 'path': [('受宠爱的（人）', '意大利语时期', ''),
          ('最喜欢的', '现代', 'favorito 是 favorire「施恩惠」的分词：先指宫廷里得宠的人，后泛化为「最中意的（物）」（由得宠到喜好）')],
 'mech': 'favourite 是「得宠的」：国王宠谁，谁就是 favourite。',
 'link': '今天的意思「最喜欢的」从「受宠者」泛化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'wk'], 'grade': 'ox_wk'}

R = {'bad': 'origin_unknown（主干复核后）：c. 1300 前罕见、1400 年前几无亲属词可寻（Etymonline：It has no apparent relatives in other languages）。古英语贬词 bæddel 缩略说三家皆仅作 perhaps/possibly；Wiktionary 另立古诺尔斯语 *badą「麻烦」借词说，无主干可对，保持待核'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
