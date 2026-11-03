# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['cover'] = {
 'chain': [('Latin', 'operīre', '合上；盖住', '拉丁语时期'),
           ('Latin', 'cooperīre', '完全盖住', '拉丁语时期'),
           ('Old French', 'covrir', '覆盖；保护', '古法语时期'),
           ('Middle English', 'coveren', '覆盖', '中古英语时期')],
 'fa': '12 世纪中期进入英语（Etymonline：mid-12c.，义为「保护、防御」）',
 'orig': '保护；遮盖',
 'path': [('保护；遮盖', '12 世纪中期', ''),
          ('覆盖，盖住；封面', '现代', 'co- 是加强语气：盖得严严实实。入英语先是「护住」，约 1300 年「遮住」，14 世纪早期才「把东西盖在上面」；名词的「封面」义守着一个面儿（由护到盖）')],
 'mech': 'cover 是「盖严实」：先护住人，再盖住物。',
 'link': '今天的意思「覆盖」是 14 世纪才定型的后来义。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['impolite'] = {
 'chain': [('Latin', 'polīre', '打磨；润饰', '拉丁语时期'),
           ('Latin', 'impolītus', '未打磨的；粗糙的', '拉丁语时期'),
           ('English', 'impolite', '不礼貌的', '1610 年代')],
 'fa': '1610 年代借自拉丁语（Etymonline：1610s，义为「粗糙、未开化的」）',
 'orig': '未打磨的；粗糙的',
 'path': [('未打磨的；粗糙的', '拉丁语时期', ''),
          ('不礼貌的，粗鲁的', '现代', '整体借自拉丁语 impolītus（并非英语现拼 im- + polite）：先说物粗糙，1739 年转说人没教养——「打磨」就是教养的比喻（由物粗到人粗）')],
 'mech': 'impolite 是「没打磨过」：石头粗，人粗，都是没磨。',
 'link': '今天的意思「不礼貌」从「粗糙」转来：polite 的「文雅」本就是磨出来的。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['artist'] = {
 'chain': [('Latin', 'ars', '技艺；艺术', '拉丁语时期'),
           ('Medieval Latin', 'artista', '精通艺术者', '中世纪拉丁语时期'),
           ('French', 'artiste', '艺术家', '法语近现代'),
           ('English', 'artist', '艺术家', '1580 年代')],
 'fa': '1580 年代见载（Etymonline；牛津作 16 世纪早期「自由艺术硕士」）',
 'orig': '精通（自由）艺术者',
 'path': [('精通（自由）艺术者', '中世纪拉丁语时期', ''),
          ('艺术家，画家', '现代', 'ars 是「技艺」：中世纪的 artista 是通七艺的学者，17 世纪泛指任何行家（教授、外科医、厨师都算），18 世纪中期收窄到视觉艺术（由通才到画家）')],
 'mech': 'artist 先是「有学问的通才」：行行出状元，后来专给了画画的。',
 'link': '今天的意思「艺术家」是从大学者收窄来的。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['pianist'] = {
 'chain': [('Italian', 'pianista', '钢琴演奏者', '意大利语时期'),
           ('French', 'pianiste', '钢琴家', '法语近现代'),
           ('English', 'pianist', '钢琴家', '1822 年')],
 'fa': '1822 年见载（Etymonline：1822；1816 年先以法语形 pianiste 入英）',
 'orig': '钢琴演奏者',
 'path': [('钢琴演奏者', '意大利语时期', ''),
          ('钢琴家', '现代', '随乐器西行的人名：意大利造、法国转手、英语收货（借词随乐器）')],
 'mech': 'pianist 是「弹 piano 的人」：琴到哪儿，称呼到哪儿。',
 'link': '今天的意思「钢琴家」就是借入时的本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['piano'] = {
 'chain': [('Italian', 'pianoforte', '弱强琴', '意大利语时期'),
           ('English', 'piano', '钢琴', '1803 年')],
 'fa': '1803 年见载（Etymonline：1803，pianoforte 的截短形）',
 'orig': '弱强琴（能弹强弱的琴）',
 'path': [('弱强琴（能弹强弱的琴）', '意大利语时期', ''),
          ('钢琴', '现代', 'piano「弱」+ forte「强」：老键琴强弱不由人，这台能逐键控强弱，故得名。英语截短成 piano（以功能命名再截短）')],
 'mech': 'piano 的全名是「弱-强琴」：能轻能重，就叫这个名。',
 'link': '今天的意思「钢琴」就是截短时的本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['station'] = {
 'chain': [('Proto-Indo-European', '*steh₂-', '站立', '原始印欧语时期'),
           ('Latin', 'stāre', '站立', '拉丁语时期'),
           ('Latin', 'statiō', '站立处；岗位', '拉丁语时期'),
           ('Middle English', 'stacioun', '车站', '中古英语时期')],
 'fa': '13 世纪晚期进入英语（Etymonline：late 13c.，义为「常驻之地」）',
 'orig': '常驻之地；岗位',
 'path': [('常驻之地；岗位', '拉丁语时期', ''),
          ('车站，站；局，所', '现代', '与 stand 同根的「站」：先是人站岗、驻守的地方，1797 年指驿路停靠点，1830 年用在铁路上——车停靠的「站」，是人站出来的（由驻地到站点）')],
 'mech': 'station 是「站着的地方」：人站岗，车站台，都是站。',
 'link': '今天的意思「车站」从「岗位」转来：停靠点就是站。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['direction'] = {
 'chain': [('Proto-Indo-European', '*reǵ-', '走直线', '原始印欧语时期'),
           ('Latin', 'regere', '引直；引导', '拉丁语时期'),
           ('Latin', 'dīrēctiō', '引直；指引', '拉丁语时期'),
           ('Middle English', 'direccioun', '方向', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「指引的行为」）',
 'orig': '指引（使走直）',
 'path': [('指引（使走直）', '拉丁语时期', ''),
          ('方向；指导说明', '现代', 'dīrigere 是「把（路）弄直、领向某处」：先是「指引」这个动作，1660 年代才有空间「方向」义；「使用说明」义 15 世纪早期已见（由引路到方位与说明）')],
 'mech': 'direction 是「把路领直」：领向哪边，哪边就是方向。',
 'link': '今天的意思「方向」从「指引」的结果沉淀而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['collection'] = {
 'chain': [('Proto-Indo-European', '*leǵ-', '收集；挑选', '原始印欧语时期'),
           ('Latin', 'colligere', '聚拢到一起', '拉丁语时期'),
           ('Latin', 'collēctiō', '收集；聚集', '拉丁语时期'),
           ('Middle English', 'colleccioun', '收藏品', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「收集的行为」）',
 'orig': '收集（行为）',
 'path': [('收集（行为）', '拉丁语时期', ''),
          ('收藏品，收集物', '现代', 'con-「一起」+ legere「拣、采」：先指「收拢」这个动作，约 1400 年转指收拢成的那一堆东西（由动作到成果）')],
 'mech': 'collection 是「拣到一起」：拣的动作，成了拣出的东西。',
 'link': '今天的意思「收藏品」从动作义转来：收什么，就是什么。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
