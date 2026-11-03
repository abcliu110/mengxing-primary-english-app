# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['tall'] = {
 'chain': [('Old English', 'ġetæl', '敏捷的；得力的', '古英语时期'),
           ('Middle English', 'tal', '俊美的；勇猛的；大的', '中古英语时期')],
 'fa': '词本身古英语已有；「高」义 1520 年代始见（Etymonline）',
 'orig': '敏捷的；得力的',
 'path': [('敏捷的；得力的', '古英语时期', ''),
          ('高的', '现代', '评价词大漂移（OED 直言 remarkable）：能干敏捷 → 俊美、勇猛（14 世纪）→ 大（14 世纪中）→ 个头高（1520 年代）——夸人的词一路从本事夸到身材（词义漂移）')],
 'mech': 'tall 先夸人能干：能干 → 俊美勇猛 → 大个子 → 专指高。',
 'link': '今天的意思「高的」是从「能干、俊美、大」一路夸过来的：最后落在身高上。',
 'disp': '更深层 Wiktionary 接原始日耳曼语 *talaz「顺从的」及印欧语 *dol-，与古英语本义层衔接不密，本档链止于古英语。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['strict'] = {
 'chain': [('Latin', 'strictus', '拉紧的；束紧的', '拉丁语时期'),
           ('Middle English', 'strict', '狭窄的；严格的', '中古英语时期')],
 'fa': '15 世纪早期进入英语（Etymonline：early 15c.，先作物理义「狭窄、拉紧」）',
 'orig': '拉紧的；狭窄的',
 'path': [('拉紧的；狭窄的', '中古英语时期', ''),
          ('严格的', '现代', '拉丁语里本是「抽紧、绑紧」（stringere 的分词）；英语先借作「空间狭窄」，实物义消退后，靠「紧」的感觉活下来：法律严苛（1570 年代）、做事精确（1590 年代）——绷得紧，就是严格（触感转品格）')],
 'mech': 'strict 是「拉紧的绳子」：规矩绷得紧，就是严格。',
 'link': '今天的意思「严格的」从「拉紧的」来：紧，就是严。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['bottle'] = {
 'chain': [('Late Latin', 'buttis', '大桶；酒桶', '晚期拉丁语时期'),
           ('Medieval Latin', 'butticula', '小桶', '中世纪拉丁语时期'),
           ('Old French', 'boteille', '瓶子', '古法语时期'),
           ('Middle English', 'botel', '瓶子', '中古英语时期')],
 'fa': '14 世纪中期进入英语（Etymonline：mid-14c.，最初指皮制瓶）',
 'orig': '小桶',
 'path': [('小桶', '中世纪拉丁语时期', ''),
          ('瓶子', '现代', '大酒桶 buttis 加指小后缀成 butticula「小桶」，经法语 boteille 入英语：装液体的容器一路做小、做精，成了细脖瓶子（容器义缩小专化）')],
 'mech': 'bottle 的祖先是大酒桶：桶做小了、脖子细了，就是瓶子。',
 'link': '今天的意思「瓶子」从「小桶」缩来：同一件装液体的家什，越做越小。',
 'disp': 'buttis 或源于希腊语（Etymonline：perhaps from Greek），本档链止于晚期拉丁语。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['yesterday'] = {
 'chain': [('Old English', 'ġeostran dæġ', '昨天（「昨日」＋「日」）', '古英语时期'),
           ('Middle English', 'yesterday', '昨天', '中古英语时期')],
 'fa': '古英语时期就已经有了（牛津与 Etymonline 都以古英语 ġiestran dæg 起头）',
 'orig': '昨天',
 'path': [('昨天', '古英语时期', ''),
          ('昨天', '现代', '意思一千年没动，只是两个词 ġeostran（昨日）＋ dæġ（日）凝成一个词（词组凝合）；其中 yester- 这块化石在现代英语里只活在 yesterday 中')],
 'mech': 'yesterday 是「昨日＋日」拼成的：前一天，就是昨天。',
 'link': '今天的意思「昨天」就是最早的意思，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['climb'] = {
 'chain': [('Proto-Indo-European', '*gley-', '粘；贴', '原始印欧语时期'),
           ('Proto-Germanic', '*klimbaną', '攀附而上', '原始日耳曼语时期'),
           ('Old English', 'climban', '攀爬', '古英语时期'),
           ('Middle English', 'climben', '攀爬', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 climban 起头）',
 'orig': '攀附而上',
 'path': [('攀附而上', '原始日耳曼语时期', ''),
          ('爬，攀登', '现代', '老根是「粘、贴」：贴着（峭壁、树干）往上挪，就是攀；中古 13 世纪添比喻义「（地位）慢慢爬升」。拼写里的 b 其他日耳曼语早已丢掉，英语留着却不发音（词义扩展，词形存古）')],
 'mech': 'climb 的老根是「粘住」：贴紧了往上贴，就是攀登。',
 'link': '今天的意思「攀登」就是「攀附而上」的本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['birth'] = {
 'chain': [('Proto-Indo-European', '*bʰer-', '携带；生育', '原始印欧语时期'),
           ('Proto-Germanic', '*gaburþiz', '出生', '原始日耳曼语时期'),
           ('Old Norse', 'burðr', '出生', '古诺斯语时期'),
           ('Middle English', 'birthe', '出生', '中古英语时期')],
 'fa': '约 1200 年见载（Etymonline：c. 1200，经古诺斯语借入，顶替同源的古英语 ġebyrd）',
 'orig': '出生',
 'path': [('出生', '中古英语时期', ''),
          ('出生，诞生', '现代', '词义稳定：bear「携带、生（孩子）」加上表过程的后缀 -th（同 bath、death 的 -th），就是「生出来这件事」；1610 年代添「（事物）出现、诞生」（从生孩子到万物生成的扩展）')],
 'mech': 'birth = bear（生）+ -th（事情）：生孩子这件事，就是出生。',
 'link': '今天的意思「出生」就是最早的意思，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['discuss'] = {
 'chain': [('Latin', 'discutere', '击碎；摇散', '拉丁语时期'),
           ('Middle English', 'discussen', '考察；讨论', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「考察、调查」）',
 'orig': '击碎；摇散',
 'path': [('击碎；摇散', '拉丁语时期', ''),
          ('讨论', '现代', '拉丁语里 dis-（分开）＋ quatere（摇）＝把东西摇散、打碎；后古典时代转指把问题「拆开来查」：考察、调查；15 世纪中定型为「辩论、讨论」——把问题砸开了看，就是讨论（从动手拆到动脑拆）')],
 'mech': 'discuss 是「把问题摇散了看」：拆开、抖落、看清，就是讨论。',
 'link': '今天的意思「讨论」从「击碎、摇散」来：先拆开实物，后拆开问题。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['early'] = {
 'chain': [('Old English', 'ǣrlīċ', '早的', '古英语时期'),
           ('Middle English', 'erly', '早的', '中古英语时期')],
 'fa': '古英语时期就已经有了（副词 ǣrlīċe、形容词 ǣrlic，Etymonline 与牛津同载）',
 'orig': '早的',
 'path': [('早的', '古英语时期', ''),
          ('早的；早地', '现代', '意思一千年没动：ǣr「在……之前」（今 ere）加 -ly 构成；古诺斯语 árliga 的同形对它有过加固影响（词义稳定）')],
 'mech': 'early 是「在时间前面」：排在前头，就是早。',
 'link': '今天的意思「早的」就是最早的意思，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
