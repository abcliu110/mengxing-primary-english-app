# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['interrupt'] = {
 'chain': [('Latin', 'rumpere', '弄破', '拉丁语时期'),
           ('Latin', 'interrumpere', '从中折断', '拉丁语时期'),
           ('Middle English', 'interrupten', '打断', '中古英语时期')],
 'fa': '约 1400 年进入英语（Etymonline：c. 1400，义为「干涉（法定权利）」）',
 'orig': '从中折断',
 'path': [('从中折断', '拉丁语时期', ''),
          ('打断（说话）；中断，暂停', '现代', 'inter-「之间」+ rumpere「破」：把进行中的东西从腰里截断；「打断说话」义 15 世纪初（拉丁语里已有）（由折断到打断）')],
 'mech': 'interrupt 是「从中掰断」：话、事，一断两截。',
 'link': '今天的意思「打断」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['introduce'] = {
 'chain': [('Proto-Indo-European', '*deuk-', '牵引；带领', '原始印欧语时期'),
           ('Latin', 'dūcere', '带领', '拉丁语时期'),
           ('Latin', 'intrōdūcere', '领进去', '拉丁语时期'),
           ('Middle English', 'introducen', '引进', '中古英语时期')],
 'fa': '15 世纪初进入英语（Etymonline：early 15c.，义为「把（某物）带入」）',
 'orig': '领进去',
 'path': [('领进去', '拉丁语时期', ''),
          ('介绍；引进，采用', '现代', 'intro-「向内」+ dūcere「领」：1550 年代「提出（话题）」，1650 年代「引见（人）」——把人领进圈子（由领进到介绍）')],
 'mech': 'introduce 是「领进门」：领物是引进，领人是介绍。',
 'link': '今天「介绍/引进」两义同出一「领」。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['invisible'] = {
 'chain': [('Latin', 'vidēre', '看', '拉丁语时期'),
           ('Latin', 'vīsibilis', '可见的', '拉丁语时期'),
           ('Late Latin', 'invīsibilis', '看不见的', '晚期拉丁语时期'),
           ('Middle English', 'invisible', '看不见的', '中古英语时期')],
 'fa': '14 世纪中期进入英语（Etymonline：mid-14c.，义为「目光不可感知」）',
 'orig': '看不见的',
 'path': [('看不见的', '晚期拉丁语时期', ''),
          ('看不见的；隐形的', '现代', 'in-「不」+ vīsibilis「可见的」：1640 年代「藏起来不见」义（借词守恒）')],
 'mech': 'invisible 是「看不见」：visible 前面一个「不」。',
 'link': '今天的意思「隐形」就是构词原义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['irregular'] = {
 'chain': [('Latin', 'rēgula', '规尺；规则', '拉丁语时期'),
           ('Latin', 'rēgulāris', '合规的', '拉丁语时期'),
           ('Medieval Latin', 'irrēgulāris', '不合规的', '中世纪拉丁语时期'),
           ('Middle English', 'irreguler', '不规则的', '中古英语时期')],
 'fa': '14 世纪晚期见载（Etymonline：late 14c.，义为「不合教会规条」）',
 'orig': '不合规的（尤指教会规条）',
 'path': [('不合规的（尤指教会规条）', '中世纪拉丁语时期', ''),
          ('不规则的；不规律的', '现代', 'in-「不」+ rēgulāris「有规的」：15 世纪晚期泛指一切不合规，1580 年代「不对称」义（由犯规到不规则）')],
 'mech': 'irregular 是「尺子量不齐的」：先犯教会规，后乱一切规。',
 'link': '今天的意思「不规则」从「不合规」泛化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['irritate'] = {
 'chain': [('Latin', 'irrītāre', '激惹；挑动', '拉丁语时期'),
           ('English', 'irritate', '使恼怒；刺激', '1530 年代')],
 'fa': '1530 年代见载（Etymonline：1530s，义为「激发行动、煽动」）',
 'orig': '激惹；挑动',
 'path': [('激惹；挑动', '拉丁语时期', ''),
          ('使恼怒；刺激', '现代', '「使恼怒」义 1590 年代立：先是煽人行动，后是挠人神经（由挑动到恼怒）')],
 'mech': 'irritate 是「挠」：挠行动是煽动，挠神经是恼火。',
 'link': '今天的意思「恼怒」从「激惹」转义而来。',
 'disp': '更深来源：de Vaan 拟出原始意大利语 *rito-「被搅动的」，与 run 同根（Etymonline 转述 probably），未经定论，本档止于拉丁语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['judge'] = {
 'chain': [('Proto-Indo-European', '*deyḱ-', '指出；宣告', '原始印欧语时期'),
           ('Latin', 'dīcere', '说', '拉丁语时期'),
           ('Latin', 'iūs', '法律；权利', '拉丁语时期'),
           ('Latin', 'iūdex', '法官', '拉丁语时期'),
           ('Middle English', 'juge', '法官；判断', '中古英语时期')],
 'fa': '约 1200 年动词入英（Etymonline：c. 1200，义为「审查、评估」；约 1300 年「审判、判决」）',
 'orig': '法官（宣法者）',
 'path': [('法官（宣法者）', '拉丁语时期', ''),
          ('法官；判断', '现代', 'iūs「法」+ dīcere「说」：法官就是「当众宣说法律的人」；本土词 dēman（见 doom）被它挤走（由宣法到判断）')],
 'mech': 'judge 是「说法律的人」：说出的，就是判决。',
 'link': '今天「法官/判断」两义同出一「宣」。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['kettle'] = {
 'chain': [('Latin', 'catīnus', '深碗；烹器', '拉丁语时期'),
           ('Latin', 'catīllus', '小碗；小锅', '拉丁语时期'),
           ('Proto-Germanic', '*katilaz', '锅；桶', '原始日耳曼语时期'),
           ('Old English', 'ċietel', '水壶；锅', '古英语时期')],
 'fa': '古英语时期见载（Etymonline 与牛津：OE cetil、ċietel）',
 'orig': '深碗；锅',
 'path': [('深碗；锅', '拉丁语时期', ''),
          ('水壶；烧水壶', '现代', '原始日耳曼语里极少的拉丁借词之一（与 pound、cheap 同类，都沾贸易）：随罗马的锅具北上；茶壶义 1769 年（借词守恒）')],
 'mech': 'kettle 是罗马的锅：贸易路上，锅先到了。',
 'link': '今天的意思「水壶」就是本义的专职化。',
 'disp': '借词说为通说（usually regarded），但 de Vaan 谓器皿词多借词、拉丁词本身亦可能借来；另可能与本土日耳曼词相混（两家并记，本档据共指主干立链）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {'ketchup': 'trunk_unsettled（主干复核后）：主流说为马来语 kecap ← 闽南语「膎汁」kê-chiap「鱼卤」（Wiktionary 作 probably，Etymonline 转述现代来源同此说但加 possibly），牛津另作粤语 k\'ē chap「番茄汁」（perhaps），Etymonline 另载图卢语 kajipu「咖喱」说；三路皆带保留、无两家无条件互证，且 17-18 世纪此词泛指凤尾鱼/蘑菇/牡蛎等多种酱汁、番茄义晚至 19 世纪末，主干未定，保持待核'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
