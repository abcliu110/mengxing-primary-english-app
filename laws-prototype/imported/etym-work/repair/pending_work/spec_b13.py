# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['guitar'] = {
 'chain': [('Ancient Greek', 'kithara', '基萨拉琴', '古希腊时期'),
           ('Latin', 'cithara', '基萨拉琴', '拉丁语时期'),
           ('Arabic', 'qīthāra', '吉他类乐器', '阿拉伯语时期'),
           ('Spanish', 'guitarra', '吉他', '西班牙语时期'),
           ('English', 'guitar', '吉他', '1620 年代')],
 'fa': '1620 年代见载（Etymonline：1620s，经法语 guitare 与西班牙语 guitarra)',
 'orig': '基萨拉琴',
 'path': [('基萨拉琴', '古希腊时期', ''),
          ('吉他', '现代', '古琴环球记：希腊七弦琴 kithara 后世在各地变形存名——cittern、zither、guitar 都是它的后代；今形经西班牙 guitarra 定型（借词守恒）')],
 'mech': 'guitar 是希腊古琴的「西班牙后代」：名字绕了地中海一圈。',
 'link': '今天的意思「吉他」就是本义的定型。',
 'disp': '阿拉伯语 qīthāra 的来源向背未定（或出西班牙语、或出希腊语，旧说常作反向）；kithara 本身或出波斯语 sihtar（perhaps 登记）。',
 'folk': '与 sitar 并无亲缘（Wiktionary 明注 not related to sitar)，形近而源别', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['chess'] = {
 'chain': [('Old Persian', 'xšāyaθiya', '王', '古波斯语时期'),
           ('Persian', 'šāh', '王', '波斯语时期'),
           ('Arabic', 'šāh', '王（棋）', '阿拉伯语时期'),
           ('Medieval Latin', 'scaccus', '棋；将军', '中世纪拉丁语时期'),
           ('Middle English', 'ches', '国际象棋', '中古英语时期')],
 'fa': '13 世纪进入英语（Etymonline：13c.，自古法语 esches「棋子（复数）」）',
 'orig': '王（波斯语 šāh）',
 'path': [('王（波斯语 šāh）', '波斯语时期', ''),
          ('国际象棋', '现代', '以「将军」得名：法语 eschec 本是棋中关键一招「将军」（王危矣），其复数 esches 成了棋名；游戏的本名是梵语 chaturanga「四军」（象、马、车、步），经阿拉伯语 shatranj 一线活在西班牙语 ajedrez 里（由王号到棋名）')],
 'mech': 'chess 的名字是声「将军」：王一受胁，整盘棋就有了名。',
 'link': '今天的意思「国际象棋」就是本义；check、checkmate 同出一源。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['me'] = {
 'chain': [('Proto-Indo-European', '*h₁me-', '我（斜格）', '原始印欧语时期'),
           ('Proto-Germanic', '*miz', '我（与格）', '原始日耳曼语时期'),
           ('Old English', 'mē', '我（与格）', '古英语时期'),
           ('Middle English', 'me', '我（宾格）', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE me（与格）、mec（宾格））',
 'orig': '我（斜格：与格）',
 'path': [('我（斜格：与格）', '原始印欧语时期', ''),
          ('我（宾格）', '现代', '一人称代词的斜格：古英语本有两形——与格 mē 与宾格 mec，后来 mē 一形兼两格，顶掉了 mec；拉丁语 mē、希腊语 emé、梵语 mā 同源（借词守恒）')],
 'mech': 'me 是「我」的受格老形：mec 退场，它一肩挑了两格。',
 'link': '今天的意思「我（宾格）」就是本义的定型（methinks 里还存着它的与格用法）。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['your'] = {
 'chain': [('Proto-Germanic', '*izweraz', '你们的', '原始日耳曼语时期'),
           ('Old English', 'ēower', '你们的', '古英语时期'),
           ('Middle English', 'your', '你的；你们的', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE eower,ġē「你们」的属格）',
 'orig': '你们的',
 'path': [('你们的', '原始日耳曼语时期', ''),
          ('你的；你们的', '现代', '本是「你们（复数）」的属格：二人称单复数合流（you 一词兼两数）之后，它也跟着兼管单数（由复数到通管）')],
 'mech': 'your 本是「你们的」：you 丢了单复数之分，它也一并通吃。',
 'link': '今天的意思「你的」就是本义的扩展（14 世纪中起用于尊称，如 your majesty)。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['he'] = {
 'chain': [('Proto-Indo-European', '*ḱís', '这个', '原始印欧语时期'),
           ('Proto-Germanic', '*hiz', '这个（人）', '原始日耳曼语时期'),
           ('Old English', 'hē', '他', '古英语时期'),
           ('Middle English', 'he', '他', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE he，三人称代词）',
 'orig': '这个（指示词）',
 'path': [('这个（指示词）', '原始印欧语时期', ''),
          ('他（主格）', '现代', '「他」本是「这个」：指示词转作三人称——阴性 hio 中古被 she 一系替换，中性 hit 丢了 h- 成 it；德语 heute「今天」字面「此日」还存着这根（由指示到人称）')],
 'mech': 'he 的老底是指着说的「这个」：指着指着，成了「他」。',
 'link': '今天的意思「他」就是本义的定型。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['him'] = {
 'chain': [('Proto-Germanic', '*himmai', '（对）这个', '原始日耳曼语时期'),
           ('Old English', 'him', '他（与格）', '古英语时期'),
           ('Middle English', 'him', '他（宾格）', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE him,he 的阳性/中性与格）',
 'orig': '（对）这个（与格）',
 'path': [('（对）这个（与格）', '原始日耳曼语时期', ''),
          ('他（宾格）', '现代', '格的合并：宾格本作 hine,10 世纪起与格 him 开始兼并宾格，15 世纪完成——hine 只在方言 \'un 里残存（由与格兼宾格）')],
 'mech': 'him 本是「给他」的形：它把「把他」的形 hine 挤出了标准语。',
 'link': '今天的意思「他（宾格）」就是合并后的定型。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['we'] = {
 'chain': [('Proto-Indo-European', '*wéy', '我们', '原始印欧语时期'),
           ('Proto-Germanic', '*wīz', '我们', '原始日耳曼语时期'),
           ('Old English', 'wē', '我们', '古英语时期'),
           ('Middle English', 'we', '我们', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE we，一人称复数）',
 'orig': '我们',
 'path': [('我们', '原始印欧语时期', ''),
          ('我们（主格）', '现代', '印欧老词（梵语 vayám 同源）：君主自称的「朕」式 royal we 至少在《贝奥武甫》（约 725 年）已见（借词守恒）')],
 'mech': 'we 是印欧语的原装词：三千年前怎么说，今天还怎么说。',
 'link': '今天的意思「我们」就是本义，一路未变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['ours'] = {
 'chain': [('Old English', 'ūre', '我们的', '古英语时期'),
           ('Middle English', 'oures', '我们的（独立形）', '中古英语时期')],
 'fa': '约 1300 年见载（Etymonline：c. 1300, oures，北部英格兰起源）',
 'orig': '我们的（独立形）',
 'path': [('我们的（独立形）', '中古英语时期', ''),
          ('我们的（名物代词）', '现代', '双重属格：our 之外再加属格 -s（仿 his 的样子）造出的独立形，顶掉了中古的 ourn——hers、yours、theirs 都是同班同学（类推成词）')],
 'mech': 'ours 身上有两个「的」：our 已属格，又仿 his 加了 -s。',
 'link': '今天的意思「我们的」就是成词时的意思。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['their'] = {
 'chain': [('Old Norse', 'þeir', '他们', '古诺斯语时期'),
           ('Old Norse', 'þeira', '他们的', '古诺斯语时期'),
           ('Middle English', 'their', '他们的', '中古英语时期')],
 'fa': '约 1200 年见载（Etymonline：c. 1200，自古诺斯语 þierra「他们的」）',
 'orig': '他们的（古诺斯语借词）',
 'path': [('他们的（古诺斯语借词）', '古诺斯语时期', ''),
          ('他们的', '现代', '维京借词：它顶掉了本族的古英语 heora——与 they、them 同批入境，是斯堪的纳维亚移民改写英语代词系统的痕迹（借词代本族）')],
 'mech': 'their 是「进口」的：维京人带来的代词，把本地的 heora 挤走了。',
 'link': '今天的意思「他们的」就是本义（其单数用法自约 1300 年已见）。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['those'] = {
 'chain': [('Old English', 'þās', '这些', '古英语时期'),
           ('Middle English', 'thos', '那些', '中古英语时期')],
 'fa': '约 1300 年见载（Etymonline：c. 1300，中部与南部方言变体）',
 'orig': '这些（þās 的变体）',
 'path': [('这些（þās 的变体）', '古英语时期', ''),
          ('那些', '现代', '改派的复数：它本是 this 的复数 þās（与 these 并行），后被改派作 that 的复数；词尾 -s 部分是仿 these（these 的 -s 本是原装的，非复数词尾）（由近指改远指）')],
 'mech': 'those 本管「这些」：后来被调岗去管「那些」。',
 'link': '今天的意思「那些」就是改派后的定型。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['among'] = {
 'chain': [('Proto-Indo-European', '*mag-', '揉捏', '原始印欧语时期'),
           ('Proto-Germanic', '*mangjaną', '揉合', '原始日耳曼语时期'),
           ('Old English', 'ġemang', '人群；混合', '古英语时期'),
           ('Middle English', 'among', '在……之间', '中古英语时期')],
 'fa': '12 世纪初见载（Etymonline：early 12c.，古英语 ongemang 的缩合）',
 'orig': '在人群（混合）之中',
 'path': [('在人群（混合）之中', '古英语时期', ''),
          ('在（三者及以上）之间', '现代', '短语化石：on gemang 直译「在人堆里」——gemang 出「揉捏」（把人揉成一堆）；12 世纪集体前缀 ge- 脱落，短语焊成一词（缩合化石）')],
 'mech': 'among 是「揉进人堆里」：人揉成一堆，你在其中。',
 'link': '今天的意思「在……之间」就是本义的定型。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['often'] = {
 'chain': [('Proto-Germanic', '*ufta', '屡次', '原始日耳曼语时期'),
           ('Old English', 'oft', '经常', '古英语时期'),
           ('Middle English', 'often', '经常', '中古英语时期')],
 'fa': '13 世纪中期见载（Etymonline：mid-13c., oft 的扩展形）',
 'orig': '屡次',
 'path': [('屡次', '原始日耳曼语时期', ''),
          ('经常', '现代', '词尾的 -n 是借来的：仿它的反义词 seldom（中古 selden）的样子给 oft 加了 -n——一对反义词长得像，是类推的杰作；16 世纪起 often 顶掉 oft 成通式（类推改形）')],
 'mech': 'often 的 n 是向 seldom「借」的：反义词，也要穿同款。',
 'link': '今天的意思「经常」就是本义（读「offen」的发音自 15 世纪已记）。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
