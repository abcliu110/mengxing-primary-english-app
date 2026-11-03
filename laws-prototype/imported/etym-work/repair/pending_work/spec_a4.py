# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['hospital'] = {
 'chain': [('Latin', 'hospes', '主人；客人', '拉丁语时期'),
           ('Late Latin', 'hospitāle', '客舍；旅店', '晚期拉丁语时期'),
           ('Old French', 'hospital', '收容所；客舍', '古法语时期'),
           ('Middle English', 'hospital', '医院', '中古英语时期')],
 'fa': '13 世纪中期进入英语（Etymonline：mid-13c.，义为「济贫收容所」）',
 'orig': '客舍；收容所',
 'path': [('客舍；收容所', '晚期拉丁语时期', ''),
          ('医院', '现代', 'hospes 一词兼指主客两方：「待客」的地方先收留穷人（15 世纪早期），1540 年代专指收治伤病者的机构——与 hostel、hotel 是同源双式（由客舍到病舍）')],
 'mech': 'hospital 是「待客的房子」：先留穷人，后留病人。',
 'link': '今天的意思「医院」从「收容所」定型：收容的对象换成了病人。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['dictionary'] = {
 'chain': [('Proto-Indo-European', '*deyḱ-', '指示；宣告', '原始印欧语时期'),
           ('Latin', 'dictiō', '言辞；词语', '拉丁语时期'),
           ('Medieval Latin', 'dictiōnārium', '词汇集', '中世纪拉丁语时期'),
           ('English', 'dictionary', '词典', '1520 年代')],
 'fa': '1520 年代见载（Etymonline：1520s；中世纪拉丁语词约 1220 年由 Johannes de Garlandia 用作书名）',
 'orig': '词汇集（词语之书）',
 'path': [('词汇集（词语之书）', '中世纪拉丁语时期', ''),
          ('词典，字典', '现代', 'dictio 是「说出来的话」：把词语收成一本书，就是 dictionary。1538 年 Elyot 的《Latin Dictionary》是英语书名用例的先声（由言辞到词书）')],
 'mech': 'dictionary 是「词语的仓库」：说出口的词，收进书里查。',
 'link': '今天的意思「词典」就是造词本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['visit'] = {
 'chain': [('Proto-Indo-European', '*weyd-', '看见', '原始印欧语时期'),
           ('Latin', 'vidēre', '看见', '拉丁语时期'),
           ('Latin', 'vīsitāre', '去看望', '拉丁语时期'),
           ('Old French', 'visiter', '看望；视察', '古法语时期'),
           ('Middle English', 'visiten', '拜访', '中古英语时期')],
 'fa': '13 世纪早期进入英语（Etymonline：early 13c. visiten）',
 'orig': '去看望',
 'path': [('去看望', '拉丁语时期', ''),
          ('拜访，看望，参观', '现代', 'vīsitāre 是 vīsere「看」的反复体：看一趟不够，再三地看——专程去看人（原多指探望病人、囚徒），13 世纪中期泛化为一般拜访（由看的动作到社交拜访）')],
 'mech': 'visit 是「专程去看」：看得勤、看得专程，就是拜访。',
 'link': '今天的意思「拜访」从「去看」来：探望的脚步成了社交的礼节。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['coach'] = {
 'chain': [('Hungarian', 'kocsi', '（Kocs 镇产的）马车', '匈牙利语时期'),
           ('German', 'Kutsche', '马车', '德语时期'),
           ('French', 'coche', '马车', '法语近现代'),
           ('English', 'coach', '教练', '1550 年代')],
 'fa': '1550 年代见载（Etymonline：1550s，义为「四轮大马车」）',
 'orig': '（Kocs 镇的）马车',
 'path': [('（Kocs 镇的）马车', '匈牙利语时期', ''),
          ('教练', '现代', '匈牙利小镇 Kocs 以造车闻名，车以地名：约 1830 年牛津俚语把「载着学生过考试」的家教比作马车，1861 年转入体育——教练是「拉着你过关的车」（由车辆到带人的师傅）')],
 'mech': 'coach 是地名牌马车：车载货，教练载人过关。',
 'link': '今天的意思「教练」从「马车」比喻而来：把人送到终点的人。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['sad'] = {
 'chain': [('Proto-Indo-European', '*seh₂-', '使满足；餍足', '原始印欧语时期'),
           ('Proto-Germanic', '*sadaz', '吃饱的；餍足的', '原始日耳曼语时期'),
           ('Old English', 'sæd', '餍足的；厌倦的', '古英语时期'),
           ('Middle English', 'sad', '悲伤的', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏同载 sæd）',
 'orig': '餍足的；厌倦的',
 'path': [('餍足的；厌倦的', '古英语时期', ''),
          ('难过的，悲伤的', '现代', '与拉丁语 satis「足够」同根：吃饱了 → 沉甸甸 → 疲惫沉重 → 约 1300 年定型为「悲伤」；中古英语另有「稳重、严肃」一路（由沉重到心情）')],
 'mech': 'sad 是「饱到沉重」：心里沉甸甸的，就是难过。',
 'link': '今天的意思「悲伤」从「餍足沉重」转来：满，到沉重，到低落。',
 'disp': '演变路径两说并存（经「疲惫」或经「稳重、严肃」），Etymonline 并记，主干（*seh₂-「满足」）一致。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['television'] = {
 'chain': [('Ancient Greek', 'τῆλε (tēle)', '远方', '古希腊时期'),
           ('French', 'télévision', '远距视觉', '1900 年'),
           ('English', 'television', '电视', '1907 年')],
 'fa': '1907 年见载英语用例（Etymonline：1907，指理论上的图像远传系统；法语 télévision 出 1900 年 Perskyi 论文）',
 'orig': '远距视觉（系统）',
 'path': [('远距视觉（系统）', '1900 年', ''),
          ('电视，电视机', '现代', '希腊语 tēle「远」+ 拉丁语 vision「看」的跨语杂交词：先是纸面上的设想（1907），1927 年指媒介，1941 年指机器本身，1948 年截短作 TV（由设想到媒介到机器）')],
 'mech': 'television 是「在远处看」：希腊词根管距离，拉丁词根管眼睛。',
 'link': '今天的意思「电视」就是造词本义的实物化。',
 'disp': '1900 年首见于法语（Perskyi 会议论文）抑或英语自造，两源表述略异，主干（tele- + vision 的同期造词）一致。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['advice'] = {
 'chain': [('Latin', 'vīsum', '所见之物；看法', '拉丁语时期'),
           ('Old French', 'avis', '意见；看法', '古法语时期'),
           ('Middle English', 'avys', '建议', '中古英语时期')],
 'fa': '13 世纪晚期进入英语（Etymonline：late 13c. auys，义为「意见」）',
 'orig': '（依我）所见；意见',
 'path': [('（依我）所见；意见', '古法语时期', ''),
          ('建议，忠告', '现代', '本是短语 ço m\'est à vis「在我看来」粘合切分出的名词：看法说出口给人参考，14 世纪晚期就是「建议」；词中的 -d- 是 15 世纪受 advise 影响插入的非词源字母（短语凝固 + 字母增生）')],
 'mech': 'advice 是「我的看法」：把看法说给你听，就是建议。',
 'link': '今天的意思「建议」从「看法」来：avis 的 d 是后来硬塞进去的。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['passport'] = {
 'chain': [('French', 'passer', '通过', '法语近现代'),
           ('French', 'passeport', '通行许可', '法语近现代'),
           ('English', 'passport', '护照', '约 1500 年')],
 'fa': '约 1500 年见载（Etymonline：c. 1500 passe-porte，义为「通行授权」）',
 'orig': '通行许可（出港许可）',
 'path': [('通行许可（出港许可）', '约 1500 年', ''),
          ('护照', '现代', 'passer「通过」+ port「海港」：先是准许离港的授权（旧义已佚），1540 年代定型为国家发给的旅行证件（由许可行为到证件本身）')],
 'mech': 'passport 是「放你过港口的条子」：条子在手，处处可走。',
 'link': '今天的意思「护照」从「通行许可」来：许可落成了证件。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
