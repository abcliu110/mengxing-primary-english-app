# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['stamp'] = {
 'chain': [('Proto-Indo-European', '*stebh-', '踏；置稳', '原始印欧语时期'),
           ('Proto-Germanic', '*stamp-', '捣；踩', '原始日耳曼语时期'),
           ('Old English', 'stempan', '舂碎；捣', '古英语时期'),
           ('Middle English', 'stampen', '邮票', '中古英语时期')],
 'fa': '中古英语见载（Etymonline：stampen，义为「捣、捶、碎」）',
 'orig': '舂碎；捣',
 'path': [('舂碎；捣', '古英语时期', ''),
          ('邮票', '现代', '动作生器物：盖印的动作（15 世纪中期「压印」义）先行。邮资最初是在邮件上盖印记，后来粘贴的小纸片问世，名字随记号转到纸片上（由盖印到邮票）')],
 'mech': 'stamp 是「盖下去」的：从前盖的是印，后来贴的是票。',
 'link': '今天的意思「邮票」从盖印动作转指而来。',
 'disp': '印欧根形两拟（*stemb-「踩踏」/ 鼻音化 *stebh-），日耳曼语层无争议。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['my'] = {
 'chain': [('Proto-Indo-European', '*méynos', '我的', '原始印欧语时期'),
           ('Proto-Germanic', '*mīnaz', '我的', '原始日耳曼语时期'),
           ('Old English', 'mīn', '我的', '古英语时期'),
           ('Middle English', 'mi', '我的', '中古英语时期')],
 'fa': '约 1200 年见载（Etymonline：c. 1200，作 mi）',
 'orig': '我的（完整形 mīn）',
 'path': [('我的（完整形 mīn）', '古英语时期', ''),
          ('我的', '现代', 'mīn 本兼「我的」两用：辅音前的名词用缩减形 mi（my father），谓语位置留全形 mine（14 世纪起 my 通行于一切名词前）（由缩减分工）')],
 'mech': 'my 是 mine 站累了的短形：放在名词前，就缩成它。',
 'link': '今天的意思「我的」是 mīn 的缩减定型。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['it'] = {
 'chain': [('Proto-Indo-European', '*ḱe', '这；此处', '原始印欧语时期'),
           ('Proto-Germanic', '*hit', '这个', '原始日耳曼语时期'),
           ('Old English', 'hit', '它', '古英语时期'),
           ('Middle English', 'it', '它', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：hit，中性主宾格）',
 'orig': '它',
 'path': [('它', '古英语时期', ''),
          ('它', '现代', '本是指示词「这个」出身的人称代词：h- 在非重读位置脱落（今 give it to him 里仍弱读），性别消退后专管事物与动物（由指示到人称）')],
 'mech': 'it 是「这个」省了气：说得太勤，h 就掉了。',
 'link': '今天的意思「它」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['us'] = {
 'chain': [('Proto-Indo-European', '*n̥swé', '我们（宾格）', '原始印欧语时期'),
           ('Proto-Germanic', '*uns', '我们（宾格）', '原始日耳曼语时期'),
           ('Old English', 'ūs', '我们（宾格）', '古英语时期'),
           ('Middle English', 'us', '我们（宾格）', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：ūs，we 的宾格与格）',
 'orig': '我们（宾格）',
 'path': [('我们（宾格）', '古英语时期', ''),
          ('我们（宾格）', '现代', '与拉丁语 nōs「我们」同根：词里的鼻音在荷兰语 ons、德语 uns 里还留着，英语因非重读丢了补偿性长音（借词守恒式的稳定）')],
 'mech': 'us 是印欧语的老宾格：几千年只管「我们」被动作碰到的样子。',
 'link': '今天的意思「我们（宾格）」就是本义，一路没变。',
 'disp': 'Watkins 拟 *nes- 系斜格构词，构拟细节与主干无碍。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['they'] = {
 'chain': [('Proto-Germanic', '*þai', '那些（主格复数）', '原始日耳曼语时期'),
           ('Old Norse', 'þeir', '他们', '古诺尔斯语时期'),
           ('Middle English', 'þei', '他们', '中古英语时期')],
 'fa': '1200 年代自斯堪的纳维亚语借入（Wiktionary：borrowed in the 1200s）',
 'orig': '他们（指示代词复数）',
 'path': [('他们（指示代词复数）', '古诺尔斯语时期', ''),
          ('他们；她们；它们', '现代', '英语本土复数 hīe 因元音变化与单数 he/him 混作一团：诺尔斯语 þeir 形义分明，约 1400 年完成替换（Jespersen 称之为同类借词中最重要的一例）；单数 they 1300 年已见（由借入到替换）')],
 'mech': 'they 是维京人带来的：本土词说混了，它来救场。',
 'link': '今天的意思「他们」是借词替换的成果。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['them'] = {
 'chain': [('Old Norse', 'þeir', '他们', '古诺尔斯语时期'),
           ('Old Norse', 'þeim', '对他们（与格）', '古诺尔斯语时期'),
           ('Middle English', 'þem', '他们（宾格）', '中古英语时期')],
 'fa': '12 世纪晚期见载（Etymonline：late 12c.，作 them、theim）',
 'orig': '对他们（与格复数）',
 'path': [('对他们（与格复数）', '古诺尔斯语时期', ''),
          ('他们（宾格）', '现代', '与 they 同批借入：顶替本土 him/heom——后者与单数 him 混淆（由来见 they 条）；性别未明者的单数用法 1742 年见载（由与格到宾格）')],
 'mech': 'them 是 they 的受事版：维京语的与格，英语拿来作宾格。',
 'link': '今天的意思「他们（宾格）」是借词格位转用的结果。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['these'] = {
 'chain': [('Proto-Indo-European', '*só', '这；那', '原始印欧语时期'),
           ('Old English', 'þis', '这', '古英语时期'),
           ('Old English', 'þas', '这些', '古英语时期'),
           ('Middle English', 'þes', '这些', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：þas/þæs，þis 的主宾格复数）',
 'orig': '这些',
 'path': [('这些', '古英语时期', ''),
          ('这些', '现代', 'þas 一词曾兼包 these 与 those 的活：13 世纪晚期与 those 分工定型（this 的复数管近指、that 的复数管远指）（由兼包到分工）')],
 'mech': 'these 是 this 的复数：近处的「这些」，从共用形里分出来的。',
 'link': '今天的意思「这些」是与 those 分工后的结果。',
 'disp': 'OED 自陈此词「历史复杂」（entry 开头即警告），主干（þis 的复数）无异议。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}

R = {'she': 'trunk_divergent（主干复核后）：祖先词形两说未决——OED/牛津主古英语阴性人称代词 hēo 的语音演变说（/hjoː/ → /ʃ/，Lass、Fulk）；Etymonline 主阴性指示代词 seo/sio 替代说（hēo 与 he 混同后指示词顶替，如荷兰语 zij、德语 sie 之例）。两家在最近祖先一处主干分歧，保持待核'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
