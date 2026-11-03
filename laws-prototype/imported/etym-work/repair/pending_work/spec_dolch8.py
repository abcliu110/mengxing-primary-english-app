# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['left'] = {
 'chain': [('Old English', 'lyft', '弱的；笨拙的', '古英语时期'),
           ('Middle English', 'left', '左边的', '中古英语时期')],
 'fa': '约 1200 年见载「左」（Etymonline；其古英语词形为 lyft，义为「弱的」）',
 'orig': '弱的',
 'path': [('弱的', '古英语时期', ''),
          ('左边的', '现代', '左手对大多数人是较弱的那只手，于是「弱」成了这一边的名字（以特征定名）；它顶替了古英语本来的词 winstre（字面「较友善的」——忌讳说法）')],
 'mech': 'left 的老义是「弱」：左手弱，弱的那边就叫 left。',
 'link': '今天的意思「左边的」从「弱的」来：弱的那只手所在的一边。',
 'disp': '更深的来源两说并存：Etymonline 提出可能本是忌讳替换词、或出印欧语 *laiwo-「醒目的」；Wiktionary 接原始日耳曼语 *luft- 与印欧语 *(s)lewp-「软垂」。三家在古英语 lyft「弱的」这一层一致，本档链止于此。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['far'] = {
 'chain': [('Proto-Indo-European', '*per-', '穿过；向前；越过', '原始印欧语时期'),
           ('Proto-Germanic', '*ferro', '远', '原始日耳曼语时期'),
           ('Old English', 'feorr', '远的', '古英语时期'),
           ('Middle English', 'fer', '远的', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 词条以古英语 feorr 起头）',
 'orig': '远的',
 'path': [('远的', '古英语时期', ''),
          ('远的', '现代', '主干义稳定：距离大。老根 *per- 是「穿过、越过」——越过去老远，就是远（距离义由穿越义凝定）')],
 'mech': 'far 的老根是「穿过去、到对面」：走得越过头，就是远。',
 'link': '今天的意思「远的」就是最早的意思，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['do'] = {
 'chain': [('Proto-Indo-European', '*dʰeh₁-', '放；置', '原始印欧语时期'),
           ('Proto-West Germanic', '*dōn', '放；做', '原始西日耳曼语时期'),
           ('Old English', 'dōn', '放；做，实行', '古英语时期'),
           ('Middle English', 'do', '做', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 词条以古英语 don 起头）',
 'orig': '放；做',
 'path': [('放；做', '古英语时期', ''),
          ('做', '现代', '「放、置」义在现代英语里已退出（只剩 do away with 这类短语），「做、执行」坐稳主干；中古英语起它又兼职助动词（Do you...? 里的 do）——词义守成，语法功能扩大')],
 'mech': 'do 的老根是「放下、安置」：把事情放下去办，就是做。',
 'link': '今天的意思「做」就是最早的意思之一；最早还有「放」一面，已退出。',
 'disp': '牛津词源栏缓存为空，本档由 Etymonline 与 Wiktionary 互证；过去式 did 的来历 Wiktionary 有专段（重叠式 *dʰédʰeh₁ti 的后代），与本词主干同根。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['find'] = {
 'chain': [('Proto-Indo-European', '*pent-', '走；踏（路）', '原始印欧语时期'),
           ('Proto-Germanic', '*finþaną', '遇上；发现', '原始日耳曼语时期'),
           ('Old English', 'findan', '遇上；发现，找到', '古英语时期'),
           ('Middle English', 'fynden', '找到', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 词条以古英语 findan 起头）',
 'orig': '遇上；发现',
 'path': [('遇上；发现', '古英语时期', ''),
          ('找到', '现代', '史前日耳曼语里先从印欧词根「走、踏路」长出「在路上遇上」：走着走着碰见了，就是发现、找到（从行路到遇合的引申）')],
 'mech': 'find 的祖先是「走路」：走在路上碰上了东西，就是找到。',
 'link': '今天的意思「找到」从「遇上」来；再往上，它的根是「走」。',
 'disp': '从「走」到「找到」的发展为 Etymonline（引 Watkins）所述，专家 Boutkan 对此表示怀疑（同条注明），主干三家一致，仅登记此疑。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk', 'ox'], 'grade': 'et_wk_ox'}
S['start'] = {
 'chain': [('Proto-Germanic', '*stert-', '猛跳；跌落', '原始日耳曼语时期'),
           ('Old English', 'styrtan', '蹦跳', '古英语时期'),
           ('Middle English', 'sterten', '蹦跳；惊起', '中古英语时期')],
 'fa': '古英语时期已见同源动词 styrtan「蹦跳」（牛津与 Etymonline 同述；Etymonline 注古英语仅北umbria 过去分词有载）',
 'orig': '蹦跳',
 'path': [('蹦跳', '中古英语时期', ''),
          ('开始', '现代', '突然一跳 → 受惊弹起（约 1300）→ 让东西动起来（1660 年代）→ 1821 年起「出发、着手」里「突然」的味道脱落，只剩「动起来」：从猛然的动泛化成一切开始（词义泛化，牛津词源栏明述这一演变）')],
 'mech': 'start 先是「猛地一跳」：跳起来，就是动起来，就是开始。',
 'link': '今天的意思「开始」从「蹦跳」泛化来：突然动 → 动起来 → 开始。',
 'disp': '更深层 Watkins 接印欧语 *ster-「僵硬」，属一家之说，本档链止于日耳曼层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['hold'] = {
 'chain': [('Proto-Germanic', '*haldaną', '看守；照管（牲畜）', '原始日耳曼语时期'),
           ('Old English', 'healdan', '握住；持有；看守', '古英语时期'),
           ('Middle English', 'holden', '握住', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 词条以古英语 haldan/healdan 起头）',
 'orig': '看守；照管（牲畜）',
 'path': [('看守；照管（牲畜）', '原始日耳曼语时期', ''),
          ('握住；举行', '现代', '先是放牧时把牲口看住、守住，再扩展到手里握住、名下持有、心里存着（观点），乃至把一场活动「守」下来办好——举行（从看管到握持再到主持的连环扩展，OED 1989 称此说已被普遍接受）')],
 'mech': 'hold 先是牧人的词：把牛羊看守住；后来手握住、事办成都用它。',
 'link': '今天的意思「握住；举行」从「看守、照管」扩展来：守住牲口 → 握住东西 → 办住一场活动。',
 'disp': '印欧层 *kel-「驱赶」仅 Wiktionary 以 maybe 提出，不入链；主干（日耳曼语 *haldaną「照管」）三家一致。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk', 'ox'], 'grade': 'et_wk_ox'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
