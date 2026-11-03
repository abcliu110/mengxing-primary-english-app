# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['enrich'] = {
 'chain': [('Old French', 'enrichir', '使富有', '古法语时期'),
           ('Middle English', 'enrichen', '使富有', '中古英语时期')],
 'fa': '14 世纪晚期经古法语借入（Etymonline：late 14c.）',
 'orig': '使富有',
 'path': [('使富有', '古法语时期', ''),
          ('使丰富；使富有', '现代', 'en-「使」＋ riche「富」：先指钱财变富；1590 年代转指（内容）充实丰富；约 1600 年「（土地）增肥」、1945 年同位素「浓缩」——富的版图从钱包扩到一切含量（词义扩展）')],
 'mech': 'enrich 是「使……富」：钱富、土肥、含量高，都是富。',
 'link': '今天的意思「使丰富」从「使富有」扩来：富的对象从钱变成了万物。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['simplify'] = {
 'chain': [('Latin', 'simplex', '简单的', '拉丁语时期'),
           ('Medieval Latin', 'simplificāre', '使简单', '中世纪拉丁语时期'),
           ('French', 'simplifier', '简化', '法语近现代'),
           ('English', 'simplify', '简化', '1650 年代')],
 'fa': '1650 年代经法语 simplifier 借入（Etymonline 与牛津同载）',
 'orig': '使简单',
 'path': [('使简单', '中世纪拉丁语时期', ''),
          ('简化', '现代', 'simplex「简单」＋ facere「做」在中世纪拉丁语里拼成「使简单」，经法语入英语；1759 年添「使易于做」义（借词后小幅扩展）')],
 'mech': 'simplify 是拉丁语里拼好的「使简单」：经法语送进英语。',
 'link': '今天的意思「简化」就是「使简单」的本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['cloudy'] = {
 'chain': [('Old English', 'clūdiġ', '多石的；丘陵的', '古英语时期'),
           ('Middle English', 'cloudy', '多云的', '中古英语时期')],
 'fa': '词本身古英语已有（义为「多石的」）；「多云」义约 1300 年（Etymonline）',
 'orig': '多石的；丘陵的',
 'path': [('多石的；丘陵的', '古英语时期', ''),
          ('多云的', '现代', 'cloud 的老根 clūd 本指「岩块、土丘」：天上的云团被看成空中的岩块后，clūdiġ 的意思才跟着基词搬家——约 1300 年指「云的性质」，14 世纪晚期定型「布满云、阴天」（基词转义带动的整体迁移）')],
 'mech': 'cloudy 先说「多石头」：因为古人眼里云就是天上的岩块。',
 'link': '今天的意思「多云的」是跟着 cloud 从「岩块」变「云团」一起搬过来的。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['reader'] = {
 'chain': [('Old English', 'rǣdere', '解读者；顾问；朗读者', '古英语时期'),
           ('Middle English', 'reder', '读者', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 rædere 起头）',
 'orig': '解读者；顾问',
 'path': [('解读者；顾问', '古英语时期', ''),
          ('读者；读物', '现代', 'rǣdan 本兼「解（梦）、出主意、读」：rǣdere 是干这些事的人——解梦者、顾问、朗读者、学者；后来「读」在基词里胜出，reader 收窄为读者；1789 年添「（学校的）读本」义（人转书的转移）')],
 'mech': 'reader 先是「会解读的人」：解梦、参谋、读书都算解读。',
 'link': '今天的意思「读者」从「解读者」收窄来：解的东西只剩文字。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['unfair'] = {
 'chain': [('Old English', 'unfæġer', '不美的；丑的', '古英语时期'),
           ('Middle English', 'unfair', '邪恶的；不公的', '中古英语时期')],
 'fa': '词本身古英语已有（义为「不美的」）；「不公正」义 1713 年始见（Etymonline）',
 'orig': '不美的；丑的',
 'path': [('不美的；丑的', '古英语时期', ''),
          ('不公平的', '现代', 'fair 的老义是「美」：unfair 先是「不美、丑」；约 1300 年转「邪恶的」；1713 年才定型「不公正的」——跟着 fair 从容貌走到品行再走到公道，unfair 一路随行（基词漂移的镜像）')],
 'mech': 'unfair 跟着 fair 走：脸不美 → 心不好 → 事不公。',
 'link': '今天的意思「不公平的」从「不美的」逐级转来：美 → 善 → 公。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['carefully'] = {
 'chain': [('Old English', 'carfullīċe', '悲伤地；用心地', '古英语时期'),
           ('Middle English', 'carfulli', '小心地', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 词条以古英语 carfullice 起头）',
 'orig': '悲伤地；用心地',
 'path': [('悲伤地；用心地', '古英语时期', ''),
          ('小心地，仔细地', '现代', 'care 的老义里有「悲伤、忧虑」：carfullice 先是「满怀忧思地」；古英语晚期「留心地」胜出——心上压着事，做事就仔细（从忧思到留心的收窄）')],
 'mech': 'carefully 是「心上有事」：忧着、惦着，手上自然就仔细。',
 'link': '今天的意思「小心地」从「满怀忧思地」转来：忧思落定为留心。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['heavily'] = {
 'chain': [('Old English', 'hefiġlīċe', '猛烈地；悲伤地；迟缓地', '古英语时期'),
           ('Middle English', 'hevely', '沉重地', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 词条以古英语 hefiglice 起头）',
 'orig': '猛烈地；悲伤地',
 'path': [('猛烈地；悲伤地', '古英语时期', ''),
          ('沉重地；猛烈地', '现代', '古英语 hefiglice 的义项是「猛烈、悲伤、迟缓」，「带着分量地」14 世纪早期才定型——heavy 一家先管感受的「沉」，后管重量的「沉」（从情感到物理的回锚）')],
 'mech': 'heavily 的「沉」先沉在心里：悲伤、猛烈，后来才沉在秤上。',
 'link': '今天的意思「沉重地」从「猛烈地、悲伤地」转来：心的沉变成了物的沉。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['quickly'] = {
 'chain': [('Old English', 'cwiculīċe', '有力地；敏锐地', '古英语晚期'),
           ('Middle English', 'quykly', '迅速地', '中古英语时期')],
 'fa': '「迅速地」义约 1200 年（Etymonline；古英语晚期已有 cwiculice）',
 'orig': '有力地；敏锐地',
 'path': [('有力地；敏锐地', '古英语晚期', ''),
          ('快地，迅速地', '现代', 'quick 的老根 cwic 是「活的」：活泛、有生气 → 动作利落 → 快。副词跟着基词走：cwiculice「有力地」到约 1200 年定型为「迅速地」（基词转义的镜像）')],
 'mech': 'quickly 跟着 quick 走：活蹦乱跳的，就是快的。',
 'link': '今天的意思「迅速地」从「有力地」转来：有生气，就会快。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}

COMP = 'compositional（主干复核后）：构词透明（%s），两源构词分析一致；其词源内容在基词与构词层，本词不单独立档'
R = {
 'modernize': COMP % 'modern + -ize，1680 年代成词，或经法语 moderniser，两说并存于来源',
 'semicircle': COMP % 'semi- + circle，1520 年代，或直接出自拉丁语 semicirculus',
 'snowy': COMP % 'snow + -y，古英语 snāwiġ 已成词，义无漂移',
 'windy': COMP % 'wind + -y，古英语 windiġ 已成词，主干义无漂移',
 'deeply': COMP % 'deep + -ly，古英语 dēoplīċe 已成词，比喻义为常规引申',
 'raindrop': COMP % 'rain + drop，古英语 reġndropa 已成词（原始日耳曼语 *regnadrupô），义无漂移',
 'candlestick': COMP % 'candle + stick，古英语 candelsticca 已成词，义无漂移'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', len(R))
