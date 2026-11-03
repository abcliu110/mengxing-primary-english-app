# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['democracy'] = {
 'chain': [('Ancient Greek', 'δῆμος (dêmos)', '民众（本义：地区）', '古希腊时期'),
           ('Ancient Greek', 'κράτος (krátos)', '权力；统治', '古希腊时期'),
           ('Ancient Greek', 'δημοκρατία (dēmokratía)', '民主政体', '古希腊时期'),
           ('Medieval Latin', 'dēmocratia', '民主', '中世纪拉丁语时期'),
           ('English', 'democracy', '民主', '1570 年代')],
 'fa': '1570 年代见载（Etymonline：1570s）',
 'orig': '民治',
 'path': [('民治', '古希腊时期', ''),
          ('民主；民主政体', '现代', 'dêmos「民众」（本义「地区」）+ krátos「权力」：主权在民的拼词（借词守恒）')],
 'mech': 'democracy 是「民众掌权」：两个希腊词，拼成一个制度。',
 'link': '今天的意思「民主」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['deny'] = {
 'chain': [('Proto-Indo-European', '*ne-', '不', '原始印欧语时期'),
           ('Latin', 'negāre', '说不；拒绝', '拉丁语时期'),
           ('Latin', 'dēnegāre', '断然拒绝', '拉丁语时期'),
           ('Middle English', 'denyen', '否认', '中古英语时期')],
 'fa': '14 世纪初进入英语（Etymonline：early 14c.，义为「宣称不实」）',
 'orig': '说不；拒绝',
 'path': [('说不；拒绝', '拉丁语时期', ''),
          ('否认；拒绝', '现代', 'de-「正式地」+ negāre「说不」：14 世纪晚期「不给」义立（由说不而拒绝）')],
 'mech': 'deny 是「把不说出口」：先是否认，后是回绝。',
 'link': '今天「否认/拒绝」两义同出一个「不」。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['depot'] = {
 'chain': [('Latin', 'pōnere', '放置', '拉丁语时期'),
           ('Latin', 'dēpōnere', '放下；存放', '拉丁语时期'),
           ('Latin', 'dēpositum', '存放之物', '拉丁语时期'),
           ('French', 'dépôt', '仓库', '法语近现代'),
           ('English', 'depot', '仓库；车站', '1795 年')],
 'fa': '1795 年见载（Etymonline：1795，义为「收货存放的仓库」）',
 'orig': '存放处',
 'path': [('存放处', '法语时期', ''),
          ('车站；仓库', '现代', '与 deposit 是同源双式：货物「放下」的地方。1842 年美式英语「火车站」义立（接货送客的存放站）（由存放到车站）')],
 'mech': 'depot 是「放东西的地方」：后来放的是火车和旅客。',
 'link': '今天的意思「车站」从仓库转化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['describe'] = {
 'chain': [('Proto-Indo-European', '*skreybʰ-', '刻；写', '原始印欧语时期'),
           ('Latin', 'scrībere', '写', '拉丁语时期'),
           ('Latin', 'dēscrībere', '写下；描摹', '拉丁语时期'),
           ('Middle English', 'descriven', '描述', '中古英语时期')],
 'fa': '13 世纪中期进入英语（Etymonline：mid-13c.，义为「阐释、说明」，今已废）',
 'orig': '写下；描摹',
 'path': [('写下；描摹', '拉丁语时期', ''),
          ('描述，描写', '现代', 'de-「往下」+ scrībere「写」：把样子「写下来」就是描摹；14 世纪晚期「以动作勾勒」义生（由写下到描摹）')],
 'mech': 'describe 是「用笔描」：写出来的画，就是描述。',
 'link': '今天的意思「描写」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['description'] = {
 'chain': [('Latin', 'dēscrībere', '写下；描摹', '拉丁语时期'),
           ('Latin', 'dēscrīptiō', '描写；摹本', '拉丁语时期'),
           ('Middle English', 'descripcioun', '描述', '中古英语时期')],
 'fa': '14 世纪晚期见载（Etymonline：late 14c.，义为「勾勒描绘的行为」）',
 'orig': '描写；描摹',
 'path': [('描写；描摹', '拉丁语时期', ''),
          ('描述，描写', '现代', 'describe 的动作名词（见彼条）：1781 年「种类」义由「以特征描类」生（由描摹到描写）')],
 'mech': 'description 是 describe 的成品：描下来的，就是描述。',
 'link': '今天的意思「描述」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['despise'] = {
 'chain': [('Proto-Indo-European', '*spek-', '观察', '原始印欧语时期'),
           ('Latin', 'specere', '看', '拉丁语时期'),
           ('Latin', 'dēspicere', '俯视；鄙视', '拉丁语时期'),
           ('Middle English', 'despisen', '鄙视', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300）',
 'orig': '俯视（而轻蔑）',
 'path': [('俯视（而轻蔑）', '拉丁语时期', ''),
          ('鄙视；看不起', '现代', 'de-「向下」+ specere「看」：从高处往下看人，眼神里全是轻慢——Century Dictionary：despise 是「居高位而强蔑之」（由俯视到鄙视）')],
 'mech': 'despise 是「眼皮往下压」：看不起，先是看的位置。',
 'link': '今天的意思「鄙视」就是动作的本义凝固。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['detach'] = {
 'chain': [('Old French', 'attachier', '系上', '古法语时期'),
           ('Old French', 'destachier', '解开', '古法语时期'),
           ('English', 'detach', '分离；拆下', '1680 年代')],
 'fa': '1680 年代见载（Etymonline：1680s，义为「解开、拆分」，尤指派作专差）',
 'orig': '解开；卸下',
 'path': [('解开；卸下', '古法语时期', ''),
          ('分离；拆下', '现代', 'des-（反向）+ attachier「系上」（attach 的反操作）：牛津记 16 世纪晚期有「开枪」义（由解开到分离）')],
 'mech': 'detach 是 attach 的倒放：系上的，再解下来。',
 'link': '今天的意思「分离」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['die'] = {
 'chain': [('Proto-Indo-European', '*dʰew-', '逝去；死', '原始印欧语时期'),
           ('Proto-Germanic', '*dawjaną', '死', '原始日耳曼语时期'),
           ('Old Norse', 'deyja', '死', '古诺尔斯语时期'),
           ('Middle English', 'deyen', '死', '中古英语时期')],
 'fa': '12 世纪中期见载（Etymonline：mid-12c.，作 dien、deighen）',
 'orig': '死',
 'path': [('死', '古诺尔斯语时期', ''),
          ('死；死亡', '现代', '难得的例外：语言一般不借「死」这类核心词，但英语借了诺尔斯语的——本土 steorfan（今 starve）、sweltan 被挤走，或因对此事的敬畏与避讳（借词替换）')],
 'mech': 'die 是维京人带来的死法：本土词不是太熟，就是太重。',
 'link': '今天的意思「死」是借词上位的结果。',
 'disp': '经古诺尔斯语或古丹麦语，两路同源；古英语或曾有同源 *diegan，未见载于存世文献。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
