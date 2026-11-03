# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['again'] = {
 'chain': [('Old English', 'onġēan', '迎面；往回', '古英语时期'),
           ('Middle English', 'agayn', '再；又', '中古英语时期')],
 'fa': '古英语晚期已有 agan 形（Etymonline：late Old English；13 世纪成为「再」的主力词）',
 'orig': '迎面；往回',
 'path': [('迎面；往回', '古英语时期', ''),
          ('再，又', '现代', '本词是 on + -gegn「迎面、对着」：迎面走回去就是「回」；古英语「再」的主力本是 eft，onġēan 常跟在后面加强，13 世纪反客为主；「再来一次」义14 世纪晚期定型；16 世纪「反对」义分给了 against，again 专管「再」（一家分工，词义收窄）')],
 'mech': 'again 先是「往回」：回到原地再走一遍，就是「再」。',
 'link': '今天的意思「再，又」从「往回」来：回头重走，就是再一次。',
 'disp': '硬 -g- 的读音是斯堪的纳维亚影响（Etymonline 注明）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['as'] = {
 'chain': [('Old English', 'eallswā', '完全如此；同样', '古英语时期'),
           ('Middle English', 'alswa', '同样', '中古英语时期')],
 'fa': '约 1200 年见载 as（Etymonline：alswa 的磨短形，约 1400 年定型）',
 'orig': '完全如此；同样',
 'path': [('完全如此；同样', '古英语时期', ''),
          ('像……一样；作为', '现代', 'as 就是 also 的磨短形：eallswā（all + swā「全然如此」）一路磨成 alswa → als → as（词形磨损，意思守恒）；「同样如此」就是「像……一样」')],
 'mech': 'as 是 also 磨短了的影子：说快了，also 就成了 as。',
 'link': '今天的意思「像……一样」就是「完全如此」的本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['shall'] = {
 'chain': [('Proto-Germanic', '*skul-', '欠；负有义务', '原始日耳曼语时期'),
           ('Old English', 'sceal', '欠；应当', '古英语时期'),
           ('Middle English', 'schal', '应当；将要', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 sceal 起头）',
 'orig': '欠；应当',
 'path': [('欠；应当', '古英语时期', ''),
          ('将要；……好吗', '现代', '日耳曼语的基本义大概是「我欠着」：欠着就理应还、理应做（义务）；义务指向的都是还没做的事，于是「应当」长出「将要」（从义务到将来的引申）')],
 'mech': 'shall 的老根是「欠」：欠下的话，就应当做，也就将要做。',
 'link': '今天的意思「将要」从「欠、应当」来：该做的，就是将做的。',
 'disp': '印欧层 *skel-「负义务」为 Watkins、Pokorny 之说，Boutkan 不予印欧谱系、疑为北欧底层创新（Etymonline 两说并引）；本档链止于日耳曼层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['going'] = {
 'chain': [('Old English', 'gānde', '正在去（go 的现在分词）', '古英语时期'),
           ('Middle English', 'goinge', '去着；行进', '中古英语时期')],
 'fa': '名词「行进」约 1300 年见载（Etymonline；分词形 gānde 古英语已有）',
 'orig': '正在去（go 的现在分词）',
 'path': [('正在去（go 的现在分词）', '古英语时期', ''),
          ('去着（go 的现在分词）', '现代', '词义无变化：going 一直是 go 的现在分词（go + -ing）；be going to「将要」是 15 世纪晚期从「正动身去做」转出的（动身去做 = 即将做）（形守恒，短语转义）')],
 'mech': 'going 就是 go 穿上 -ing：正在去，就是 going。',
 'link': '今天的 going 与古英语 gānde 意思一样，都是 go 的现在分词。',
 'disp': '古英语里 go 的动名词本是 gang（行程），going 名词义约 1300 年才出现（Etymonline 注明）。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['does'] = {
 'chain': [('Middle English', 'doþ', '做（do 的第三人称单数）', '中古英语时期'),
           ('Middle English', 'dos', '做（do 的第三人称单数）', '中古英语晚期')],
 'fa': '16—17 世纪在书面英语里顶替 doth 定型（Etymonline）',
 'orig': '做（do 的第三人称单数）',
 'path': [('做（do 的第三人称单数）', '中古英语时期', ''),
          ('做（do 的第三人称单数）', '现代', '词义无变化，只是词尾换人：通行的 -th 尾（doth）本是南方形，北方（诺森布里亚）用 -s 尾（dos）；16—17 世纪 -s 形赢下书面语，成了 does（方言词尾之争，北方胜）')],
 'mech': 'does 是 do 换上北方词尾 -s 的样子：doth 输给了它。',
 'link': '今天的 does 就是 do 的第三人称单数，意思一点没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['white'] = {
 'chain': [('Proto-Indo-European', '*ḱweytós', '明亮的；闪耀的', '原始印欧语时期'),
           ('Proto-Germanic', '*hwītaz', '白的；明亮的', '原始日耳曼语时期'),
           ('Old English', 'hwīt', '明亮的；白的', '古英语时期'),
           ('Middle English', 'whit', '白色的', '中古英语时期')],
 'fa': '古英语晚期已有 hwīt（牛津词源栏：late Old English；义为「明亮的；白的」）',
 'orig': '明亮的；白的',
 'path': [('明亮的；白的', '古英语时期', ''),
          ('白色的', '现代', '老根管的是「亮」：雪和奶的亮法，就是白；后来比喻义「恩惠的、友善的」在中古英语流行过，主干始终是雪奶之色（由亮定色，词义稳定）')],
 'mech': 'white 的老根是「闪亮」：最亮的那种颜色，就是白。',
 'link': '今天的意思「白色的」就是最早的意思，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['blue'] = {
 'chain': [('Proto-Indo-European', '*bʰlēw-', '浅色的（黄、金、灰一带）', '原始印欧语时期'),
           ('Proto-Germanic', '*blēwaz', '蓝色的；深蓝的', '原始日耳曼语时期'),
           ('Frankish', '*blāu', '蓝色的', '法兰克语时期'),
           ('Old French', 'bleu', '蓝色的', '古法语时期'),
           ('Middle English', 'blew', '蓝色的', '中古英语时期')],
 'fa': '约 1300 年见载 bleu/blwe（Etymonline：c. 1300，经古法语 bleu 借入）',
 'orig': '浅色的（黄、金、灰一带）',
 'path': [('浅色的（黄、金、灰一带）', '原始印欧语时期', ''),
          ('蓝色的', '现代', '印欧老颜色词管的是「发亮的浅色」一整带（黄、金、灰、蓝都沾边，各语言各定一色）；日耳曼语定在蓝，法兰克语带进法语 bleu，约 1300 年英语从法语借入（颜色域在各语言里重新划界，借词入户）')],
 'mech': 'blue 是借来的颜色词：它爷爷辈管浅黄色，到日耳曼语定成蓝，再由法语送进英语。',
 'link': '今天的意思「蓝色的」是日耳曼语定的色、法语送的词；再往上，它的根管的是发亮的浅色。',
 'disp': 'Etymonline 明言印欧颜色词定义滑溜（同根在拉丁语作 flavus「黄」）：本词的深层色域本就不定点，主干（日耳曼 *blēwaz「蓝」经法语入英）三家一致。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
