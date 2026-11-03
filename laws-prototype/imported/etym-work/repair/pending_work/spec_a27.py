# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['wear'] = {
 'chain': [('Proto-Indo-European', '*wes-', '穿衣', '原始印欧语时期'),
           ('Proto-Germanic', '*wazjaną', '给穿衣', '原始日耳曼语时期'),
           ('Old English', 'werian', '给穿；覆盖', '古英语时期'),
           ('Middle English', 'weren', '穿；戴', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：werian，义为「给穿上、盖上」）',
 'orig': '给（人）穿衣；覆盖',
 'path': [('给（人）穿衣；覆盖', '古英语时期', ''),
          ('穿；戴；磨损', '现代', '与拉丁语 vestis「衣服」同根（vest 即出此）：先是「给人穿」，后兼「穿在身上」。13 世纪晚期「穿久耗损」义自衣服上长出；中古时又类推 bear、tear 变了强变化（wore/worn）（由穿衣到磨损）')],
 'mech': 'wear 是「往身上穿」：穿久了，自然磨。',
 'link': '今天「穿/磨损」两义同源：穿着即消耗。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['ocean'] = {
 'chain': [('Ancient Greek', 'Ὠκεανός (Ōkeanós)', '环绕大地的大河（海神）', '古希腊时期'),
           ('Latin', 'Ōceanus', '大洋', '拉丁语时期'),
           ('Old French', 'occean', '海洋', '古法语时期'),
           ('Middle English', 'occean', '海洋', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300，义为「地表浩瀚的水体」）',
 'orig': '环绕大地的巨流',
 'path': [('环绕大地的巨流', '古希腊时期', ''),
          ('海洋', '现代', '古人眼里大地是一块圆盘，外围一圈无尽的大河环流——那就是 ōkeanos（亦人格化为海神）。14 世纪起分指各大洋（由环流到海洋）')],
 'mech': 'ocean 是「围着大地的河」：古人的世界地图，边上全是它。',
 'link': '今天的意思「海洋」从环地巨流演变而来。',
 'disp': '希腊语词来源未明（of unknown origin；Beekes 谓或前希腊语），本档止于希腊语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['smoke'] = {
 'chain': [('Proto-Indo-European', '*smeug-', '冒烟', '原始印欧语时期'),
           ('Proto-Germanic', '*smuk-', '烟', '原始日耳曼语时期'),
           ('Old English', 'smoca', '烟', '古英语时期'),
           ('Middle English', 'smoke', '烟；吸烟', '中古英语时期')],
 'fa': '古英语晚期就已经有了（Etymonline：smoca，罕见词）',
 'orig': '烟',
 'path': [('烟', '古英语时期', ''),
          ('烟；吸烟', '现代', '日耳曼语本词（荷兰语 smook、德语 Schmauch 同族）：本义至今；「吸烟」义是烟草传入后的事（借词守恒式的稳定）')],
 'mech': 'smoke 是印欧老根的烟：几千年就管这缕东西。',
 'link': '今天的意思「烟」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['nervous'] = {
 'chain': [('Proto-Indo-European', '*snéh₁wr̥', '筋；腱', '原始印欧语时期'),
           ('Latin', 'nervus', '筋腱；神经', '拉丁语时期'),
           ('Latin', 'nervōsus', '筋腱强健的；有力的', '拉丁语时期'),
           ('Middle English', 'nervous', '紧张的', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「含筋腱的」）',
 'orig': '筋腱强健的；有力的',
 'path': [('筋腱强健的；有力的', '拉丁语时期', ''),
          ('紧张的', '现代', '本是褒义（笔力遒劲也叫 nervous）：1734 年「神经系统失调」义出，1740 年翻成「坐立不安、怯弱」——医学界只好另造 neurological 说回本行（由强到弱的反转）')],
 'mech': 'nervous 先是「筋道足」：后来神经先出了名，它就慌了。',
 'link': '今天的意思「紧张」是 18 世纪反转后的结果。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['tennis'] = {
 'chain': [('Latin', 'tenēre', '持有', '拉丁语时期'),
           ('Old French', 'tenir', '拿；接', '古法语时期'),
           ('Old French', 'tenez', '接住！（发球喊声）', '古法语时期'),
           ('Middle English', 'tennys', '网球', '中古英语时期')],
 'fa': '14 世纪中期见载（Etymonline：mid-14c.，指中世纪室内手球）',
 'orig': '「接住！」（发球时的喊声）',
 'path': [('「接住！」（发球时的喊声）', '古法语时期', ''),
          ('网球', '现代', '发球手喊 tenez「拿好、接住」开局，旁观者拿喊声当了球名：1874 年现代草地网球借此老名（其自造名 sphairistike 太难念而废）（由喊声到球名）')],
 'mech': 'tennis 是喊出来的：「接球！」喊多了，就成了球名。',
 'link': '今天的意思「网球」出自球场上的发球口令。',
 'disp': '喊声说为最通行解释（most likely/apparently）；Century Dictionary 曾斥为「纯属虚构」，异议登记。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['violin'] = {
 'chain': [('Italian', 'viola', '维奥拉琴', '意大利语时期'),
           ('Italian', 'violino', '小提琴', '意大利语时期'),
           ('English', 'violin', '小提琴', '1570 年代')],
 'fa': '1570 年代见载（Etymonline：by 1570s）',
 'orig': '小号的维奥拉琴',
 'path': [('小号的维奥拉琴', '意大利语时期', ''),
          ('小提琴', '现代', 'violino 是 viola 的指小形：中世纪 viola da braccio（臂上维奥拉）的现代小号版（借词守恒）')],
 'mech': 'violin 是「小 viola」：个头小了，音高了。',
 'link': '今天的意思「小提琴」就是借入时的本义，一路没变。',
 'disp': 'viola 更深来源两家均未展开，本档止于意大利语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et'], 'grade': 'ox_et_nowk'}
S['drum'] = {
 'chain': [('Middle Dutch', 'tromme', '鼓', '中古荷兰语时期'),
           ('English', 'drom', '鼓', '15 世纪初')],
 'fa': '15 世纪初见载（Etymonline：early 15c.，作 drom）',
 'orig': '鼓',
 'path': [('鼓', '中古荷兰语时期', ''),
          ('鼓', '现代', '日耳曼通词（德语 Trommel 同族），多半拟鼓声：英语更早的说法 drumslade 出 trommelslag「鼓点」——动作名先行，器物名或为其缩略（拟声借词）')],
 'mech': 'drum 是「咚咚」声里的鼓：先听其声，后有其名。',
 'link': '今天的意思「鼓」就是借入时的本义，一路没变。',
 'disp': '经中古荷兰语或低地德语、与 drumslade 的先后关系两家措辞有差（probably/perhaps），主干一致。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['flute'] = {
 'chain': [('Old Provençal', 'flaut', '笛', '古普罗旺斯语时期'),
           ('Old French', 'flaute', '笛', '古法语时期'),
           ('Middle English', 'fleute', '长笛', '中古英语时期')],
 'fa': '14 世纪初进入英语（Etymonline：early 14c.，义为「牧人的笛」）',
 'orig': '笛',
 'path': [('笛', '古普罗旺斯语时期', ''),
          ('长笛', '现代', '借词守恒：德语 Flöte 等欧洲笛名多出法语此系（借词守恒）')],
 'mech': 'flute 是普罗旺斯的笛：名字随乐器传遍欧洲。',
 'link': '今天的意思「长笛」就是借入时的本义，一路没变。',
 'disp': '普罗旺斯语词来源未决三说：flaujol + laüt 混成说、拉丁语 flātus「吹气」说、拟声说，两家并记未裁，本档止于普罗旺斯语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
