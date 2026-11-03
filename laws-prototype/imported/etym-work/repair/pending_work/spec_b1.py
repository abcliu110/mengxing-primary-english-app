# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['apple'] = {
 'chain': [('Proto-Indo-European', '*h₂ébōl', '苹果', '原始印欧语时期'),
           ('Proto-Germanic', '*aplaz', '苹果；果实', '原始日耳曼语时期'),
           ('Old English', 'æppel', '苹果；果实', '古英语时期'),
           ('Middle English', 'appel', '苹果', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE æppel，义为「苹果；一切果实」）',
 'orig': '苹果；果实（统称）',
 'path': [('苹果；果实（统称）', '原始日耳曼语时期', ''),
          ('苹果', '现代', '17 世纪前 apple 是「果实」的总名：枣叫「指头苹果」（fingeræppla)、香蕉叫「天堂苹果」；后来各种果实各有专名，它才专指苹果（由统称到专名）')],
 'mech': 'apple 原是「果」的大名：别的果都有了名，它就只剩下苹果。',
 'link': '今天的意思「苹果」是统称窄化后的结果。',
 'disp': '印欧语内各支的精确对应关系与词根原义尚不完全确定（Etymonline：the exact relation and original sense uncertain）。',
 'folk': '伊甸园禁果《创世记》原文未点名，apple 系后世 grafting 而上；一说传统解经作「小麦」，文本本身并无苹果', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['chicken'] = {
 'chain': [('Proto-Germanic', '*kiukīn', '小鸡', '原始日耳曼语时期'),
           ('Old English', 'ċicen', '小鸡', '古英语时期'),
           ('Middle English', 'chiken', '鸡', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE cicen，义为「家母鸡的幼崽」）',
 'orig': '小鸡',
 'path': [('小鸡', '原始日耳曼语时期', ''),
          ('鸡肉；小鸡', '现代', '词根 *keuk- 拟母鸡之声（或即 cock 之根）+ 指小后缀：生来就是「小」字辈；按音变本应变为 *chichen，何以作 chicken，今人亦不知（拟声构词）')],
 'mech': 'chicken 是咯咯声里的小个子：母鸡叫声 + 指小后缀。',
 'link': '今天的意思「鸡」从「小鸡」泛化而来；1610 年代起又指「胆小鬼」（小鸡易惊）。',
 'disp': '日耳曼语构形一说作 *kukkīn（= cock + 指小 -en）；按规则音变应成 *chichen 而未成，原因未明（Etymonline）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['brother'] = {
 'chain': [('Proto-Indo-European', '*bʰréh₂tēr', '兄弟', '原始印欧语时期'),
           ('Proto-Germanic', '*brōþēr', '兄弟', '原始日耳曼语时期'),
           ('Old English', 'brōþor', '兄弟', '古英语时期'),
           ('Middle English', 'brother', '兄弟', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE broþor）',
 'orig': '兄弟',
 'path': [('兄弟', '原始印欧语时期', ''),
          ('兄；弟', '现代', '印欧语里最稳的词之一：梵语 bhrátár-、希腊语 phratér、拉丁语 frater 同出一源，几千年义未改（借词守恒）')],
 'mech': 'brother 是印欧语的「活化石」：各家语言里都还是这个词。',
 'link': '今天的意思「兄弟」就是本义，一路未变。',
 'disp': '无已知争议（注：希腊语 adelphos、西班牙语 hermano 等「兄弟」词是别支的替换，与本词谱系无关）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['father'] = {
 'chain': [('Proto-Indo-European', '*pəter-', '父亲', '原始印欧语时期'),
           ('Proto-Germanic', '*fader', '父亲', '原始日耳曼语时期'),
           ('Old English', 'fæder', '父亲', '古英语时期'),
           ('Middle English', 'fader', '父亲', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE fæder，义为「生子者、最近的男性祖先」）',
 'orig': '父亲',
 'path': [('父亲', '原始印欧语时期', ''),
          ('父亲，爸爸', '现代', '源头或是婴儿呀呀的「pa」声加亲属后缀：它是格林定律的经典例——印欧 p 在日耳曼语变 f（pater → father）')],
 'mech': 'father 开头是孩子的一声「pa」：p 变 f，是日耳曼语的身份证。',
 'link': '今天的意思「父亲」就是本义；-th- 拼写是 15 世纪语音挪移的结果（同 mother、weather)。',
 'disp': '词尾旧说为施事后缀，今多从「pa 婴儿语 + 亲属后缀」之合。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['grandfather'] = {
 'chain': [('French', 'grand-père', '祖父', '法语时期'),
           ('Latin', 'grandis', '大的', '拉丁语时期'),
           ('Middle English', 'grandfadre', '祖父', '中古英语时期')],
 'fa': '15 世纪初见载（Etymonline：early 15c., grand- + father，仿法语 grand-père)',
 'orig': '（大一辈的）祖父',
 'path': [('（大一辈的）祖父', '中古英语时期', ''),
          ('（外）祖父，爷爷，外公', '现代', '仿法语 grand-père 拼成：grand-「大」标出辈分——顶掉了古英语 ealdefæder「老父亲」与 grandsire（成词记录）')],
 'mech': 'grandfather 是「大父亲」：法语给了样板，英语拼出了词。',
 'link': '今天的意思「祖父」就是成词时的意思。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['grandmother'] = {
 'chain': [('French', 'grand-mère', '祖母', '法语时期'),
           ('Latin', 'grandis', '大的', '拉丁语时期'),
           ('Middle English', 'graundmodre', '祖母', '中古英语时期')],
 'fa': '15 世纪初见载（Etymonline：early 15c., grand- + mother，仿法语 grand-mère)',
 'orig': '（大一辈的）祖母',
 'path': [('（大一辈的）祖母', '中古英语时期', ''),
          ('（外）祖母，奶奶，外婆', '现代', '仿法语 grand-mère 拼成，顶掉了古英语 ealdemodor 与早它两百年的 grandame（成词记录）')],
 'mech': 'grandmother 是「大母亲」：与 grandfather 一对，同期仿法语成词。',
 'link': '今天的意思「祖母」就是成词时的意思。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['mother'] = {
 'chain': [('Proto-Indo-European', '*méh₂tēr', '母亲', '原始印欧语时期'),
           ('Proto-Germanic', '*mōdēr', '母亲', '原始日耳曼语时期'),
           ('Old English', 'mōdor', '母亲', '古英语时期'),
           ('Middle English', 'moder', '母亲', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE modor）',
 'orig': '母亲',
 'path': [('母亲', '原始印欧语时期', ''),
          ('母亲，妈妈', '现代', 'Watkins:源出婴儿语 *mā- 加亲属后缀 *-ter-，与 father 的 pa 对镜；-th- 拼写起于 16 世纪初（借词守恒）')],
 'mech': 'mother 开头是孩子的一声「妈」：mā 加上亲属后缀，成了全印欧语的词。',
 'link': '今天的意思「母亲」就是本义，一路未变。',
 'disp': '「渣滓」义一说源荷兰语 modder「污泥」，Wiktionary 注该词并无此义、说不成立倾向另从各语言「母亲→沉淀」平行发展。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {'pig': 'origin_unknown（主干复核后）：中古英语 pigge 本义「小猪」（成年猪旧称 swine），古英语 *picga 仅见于复合词；其深层来历 Etymonline 明言 like dog, its further etymology unknown，OED 记与低地德语 bigge 的关系「音系困难」；牛津另作 picbrēd「猪食」首元说，Pokorny 拟联印欧 *bew-「吹、胀」（并牵 big），三说互不相容且皆带保留，无互证主干，保持待核'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
