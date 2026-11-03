# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['of'] = {
 'chain': [('Proto-Indo-European', '*h₂epó', '离开', '原始印欧语时期'),
           ('Proto-Germanic', '*ab', '离开；远离', '原始日耳曼语时期'),
           ('Old English', 'of', '从……出来；离开', '古英语时期'),
           ('Middle English', 'of', '……的', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 of 起头）',
 'orig': '从……出来；离开',
 'path': [('从……出来；离开', '古英语时期', ''),
          ('……的（所属）', '现代', 'of 本是重读词 æf「离开」的弱读形（它的重读兄弟就是 off）；中古英语拿它对译拉丁语 de、古法语 de，接管了正在消失的属格词尾的活儿——「从 X 出来的」由此变成「X 的」（借翻译定型的新职能）')],
 'mech': 'of 和 off 本是同一个词的一弱一重：「离开」弱读成 of，管起了「……的」。',
 'link': '今天的意思「……的」是从「从……出来」转职来的：出处变成了所属。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['and'] = {
 'chain': [('Proto-Germanic', '*andi', '随后；接着', '原始日耳曼语时期'),
           ('Old English', 'and', '随后；和', '古英语时期'),
           ('Middle English', 'and', '和', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 and 起头）',
 'orig': '随后；接着',
 'path': [('随后；接着', '古英语时期', ''),
          ('和；并且', '现代', '先排时间（先这件、随后那件），再排并列（这件和那件都在）——讲先后的词转成了连接并列的词（从顺序到并列）')],
 'mech': 'and 先管「接下来」：一件事接着一件事，就是把它们「和」在一起。',
 'link': '今天的意思「和」从「随后、接着」来：顺序排着排着，就成了并列。',
 'disp': '印欧层读法两家不一：Wiktionary 出 *h₂énti「面对面、在……前面」，Etymonline 出词根 *en「在内」并给古英语义「随后、接着」；日耳曼语主干（*andi → and）三家一致，本档原义取 Etymonline 的古英语读法。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['had'] = {
 'chain': [('Proto-Germanic', '*habdaz', '有（的过去形）', '原始日耳曼语时期'),
           ('Old English', 'hæfde', '有了（have 的过去式）', '古英语时期'),
           ('Middle English', 'hadde', '有了', '中古英语时期')],
 'fa': '古英语时期就已经有了（hæfde 为 have 的第一/第三人称过去式）',
 'orig': '有了（have 的过去式）',
 'path': [('有了（have 的过去式）', '古英语时期', ''),
          ('有了', '现代', '词义无变化，只是词形缩合：古英语全形 gehæfd 里 f 与后面辅音同化（同类缩合见 lord、lady、head），落定为 had（词形缩合）')],
 'mech': 'had 是 have 的过去式：老形 gehæfd 的 f 被后面的音吃掉，缩成了 had。',
 'link': '今天的 had 就是古英语 hæfde 的缩形，意思一点没变。',
 'disp': '本档只记 had 这一过去形的形史；have 本词的词源主干另见 have 的记录。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['were'] = {
 'chain': [('Proto-Indo-European', '*h₂wes-', '居住；停留', '原始印欧语时期'),
           ('Proto-Germanic', '*wēzun', '是（的过去复数形）', '原始日耳曼语时期'),
           ('Old English', 'wǣre', '是（的过去式）', '古英语时期'),
           ('Middle English', 'were', '是（的过去式）', '中古英语时期')],
 'fa': '古英语时期就已经有了（wǣre/wǣron 为 wesan「是」的过去式）',
 'orig': '是（的过去式）',
 'path': [('是（的过去式）', '古英语时期', ''),
          ('是（的过去式）', '现代', '词义没动，词形有一段定律：祖先语 *h₂wes-「居住、停留」在日耳曼语里当 be 动词的词干；它的 s 按 Verner 定律浊化成 z，再变成 r——所以单数是 was，复数长出 r 成 were（语音定律造成的单复数异形，Etymonline 专注）')],
 'mech': 'was 和 were 本是一家：复数里的 s 按定律变成了 r，就分出了 were。',
 'link': '今天的 were 就是古英语 wǣre，意思一点没变；变的只是 s 到 r 的读音定律。',
 'disp': '同形的旧名词 wer「男人」（见 werewolf 中的 wer）与本词无关，不混档。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['made'] = {
 'chain': [('Old English', 'macod', '做成的（make 的过去分词）', '古英语时期'),
           ('Middle English', 'maked', '做成的', '中古英语时期')],
 'fa': '古英语时期就已经有了（macod 为 macian「做」的过去分词，Etymonline 与 Wiktionary 同载）',
 'orig': '做成的（make 的过去分词）',
 'path': [('做成的（make 的过去分词）', '古英语时期', ''),
          ('制作了（make 的过去式与过去分词）', '现代', '词义无变化：macod → maked → made 是 make 的弱变化过去形一路简化的结果；make 本词主干已另档核定（见 make），本档只记过去形的形史（词形简化）')],
 'mech': 'made 是 make 的过去形：古英语 macod 一路磨简，成了 made。',
 'link': '今天的 made 就是古英语 macod 的后代，意思一点没变。',
 'disp': '同形异词登记：另有 made「蛆」（古英语 maþu，出原始日耳曼语 *maþô），与本词无关，不混档。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['best'] = {
 'chain': [('Proto-Germanic', '*batistaz', '最好的', '原始日耳曼语时期'),
           ('Old English', 'betst', '最好的', '古英语时期'),
           ('Middle English', 'best', '最好的', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 betst/beste 起头）',
 'orig': '补益最大；最有好处的',
 'path': [('补益最大；最有好处的', '古英语时期', ''),
          ('最好的', '现代', 'best 本来是 bōt「补救、好处」（今仅存于 to boot）的最高级：「最补益的」；古英语晚期起 good 没有自己的最高级，把 better、best 借了过去当班——一个词的比较等级转投另一个词（等级转投，Etymonline 明述）')],
 'mech': 'best 原是「好处」一家的最高级：最有补益的，就是最好的。',
 'link': '今天的意思「最好的」就是「最有补益的」转投给 good 后的岗位，意思守恒。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
