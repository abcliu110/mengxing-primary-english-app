# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['can'] = {
 'chain': [('Proto-Indo-European', '*ǵneh₃-', '知道', '原始印欧语时期'),
           ('Proto-Germanic', '*kunnaną', '知道；懂得', '原始日耳曼语时期'),
           ('Old English', 'cunnan', '知道；会（做某事）', '古英语时期'),
           ('Middle English', 'connen', '会；能', '中古英语时期')],
 'fa': '古英语时期就已经有了（can 是 cunnan「知道」的单数现在式，Etymonline 词条以此起头）',
 'orig': '知道；懂得（怎么做）',
 'path': [('知道；懂得（怎么做）', '古英语时期', ''),
          ('能，会；可以', '现代', 'cunnan 的「知」本有三层（知事实、认识、知道怎么做）；can 只守住第三层：懂门道 → 有本事做 → 能、会；后来又兼「可以」（许可）（词义专化后再扩展，Etymonline 明述）')],
 'mech': 'can 和 know 是同一个印欧老根的两个孩子：知道怎么做，就是「能」。',
 'link': '今天的意思「能，会」从「知道怎么做」来：先懂，后能。',
 'disp': '同形分立：名词 can「罐头」是另一个词（古英语 canne「杯、容器」），不混档。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['not'] = {
 'chain': [('Proto-West Germanic', '*naiwwiht', '全无；什么也不', '原始西日耳曼语时期'),
           ('Old English', 'nāwiht', '什么也没有', '古英语时期'),
           ('Middle English', 'noht', '不；没有', '中古英语时期')],
 'fa': '13 世纪中期见载 not（Etymonline：mid-13c.，为 noht 的弱读变体）',
 'orig': '什么也没有',
 'path': [('什么也没有', '古英语时期', ''),
          ('不', '现代', 'not 是一串词叠缩的：ne（不）+ ā（永远）+ wiht（东西）=「永无一物」，古英语作 nāwiht「什么也没有」，中古英语缩成 noht，再弱读成 not——从讲内容的「无」缩成纯否定的小词（词组缩合）')],
 'mech': 'not 是「没有一样东西」一路叠缩出来的：nāwiht → noht → not。',
 'link': '今天的意思「不」就是「什么也没有」的缩合形：无，就是不。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['yes'] = {
 'chain': [('Old English', 'ġīese', '愿如此；当然', '古英语时期'),
           ('Middle English', 'yis', '是的', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 gese/ġīese 起头）',
 'orig': '愿如此；当然',
 'path': [('愿如此；当然', '古英语时期', ''),
          ('是，是的', '现代', 'yes 是短语凝成的：ġēa「就这样」（即 yea）+ sīe「愿它成为」（be 的祈愿式）=「愿如此、就这样吧」；它本比 yea 答得更重、更肯定，后来成了通用的肯定答词（短语凝合）')],
 'mech': 'yes 是一句小愿望凝成的词：「愿它如此」——当然，是的。',
 'link': '今天的意思「是的」就是「愿如此」的凝合：答应得干脆，就是 yes。',
 'disp': '牛津称其出自一句未见记载、义为 may it be so 的短语，与 Etymonline 的 ġēa + sīe 分析一致。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['good'] = {
 'chain': [('Proto-Indo-European', '*gʰedʰ-', '结合；合适', '原始印欧语时期'),
           ('Proto-Germanic', '*gōdaz', '合适的；合宜的', '原始日耳曼语时期'),
           ('Old English', 'gōd', '好的；优秀的', '古英语时期'),
           ('Middle English', 'good', '好的', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 gōd 起头）',
 'orig': '合适的；合宜的',
 'path': [('合适的；合宜的', '原始日耳曼语时期', ''),
          ('好的', '现代', '合身、合用 → 称心、优秀：东西「合」了，就是好（从合宜到优良的评价升级）；它的比较级不用自家的规矩形，而是借 better、best（与 best 档互参）')],
 'mech': 'good 的老根是「合」：合得来、合得上，就是好；gather「聚集」是它亲戚。',
 'link': '今天的意思「好的」从「合适的」升上来：合，就是好。',
 'disp': 'Etymonline 称此词词源不甚确定（a word of uncertain etymology, perhaps...），印欧层属推测，日耳曼语主干三家一致。',
 'folk': '民间说法「good 出自 God」不成立：Wiktionary 明言 good 与 gather、together 同根，与 god/God 无关。', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['out'] = {
 'chain': [('Proto-Indo-European', '*úd', '向上；离开', '原始印欧语时期'),
           ('Proto-Germanic', '*ūt', '向外', '原始日耳曼语时期'),
           ('Old English', 'ūt', '向外；出去', '古英语时期'),
           ('Middle English', 'out', '向外', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 ut 起头）',
 'orig': '向外；出去',
 'path': [('向外；出去', '古英语时期', ''),
          ('向外，出去', '现代', '主干义稳定：从里往外。约 1300 年添「到底、完结」（走到外头就是到头），约 1400 年添「（火）熄了」（亮光出去了）（从空间往外到状态到头的引申）')],
 'mech': 'out 的老根带「向上、离去」：从里面出来，就是 out。',
 'link': '今天的意思「向外」就是最早的意思，一路没变。',
 'disp': '印欧词形 Etymonline 作 *uidh-，Wiktionary 作 *úd，同一词根的不同构拟，日耳曼语主干一致。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['now'] = {
 'chain': [('Proto-Indo-European', '*nū', '现在', '原始印欧语时期'),
           ('Proto-Germanic', '*nu', '现在', '原始日耳曼语时期'),
           ('Old English', 'nū', '现在', '古英语时期'),
           ('Middle English', 'nou', '现在', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 nu 起头）',
 'orig': '现在',
 'path': [('现在', '原始印欧语时期', ''),
          ('现在', '现代', '意思几千年没动：印欧语 *nū 就是「现在」，拉丁语 nunc、希腊语 nun 都是它的后代（词义稳定）；古英语起它还常作语气词，无实义')],
 'mech': 'now 是印欧语传下来的「现在」：各家语言里都还是这个音、这个义。',
 'link': '今天的意思「现在」就是最早的意思，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
