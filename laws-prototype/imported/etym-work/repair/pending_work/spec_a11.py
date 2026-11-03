# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['biscuit'] = {
 'chain': [('Latin', 'coquere', '烹煮；烤', '拉丁语时期'),
           ('Medieval Latin', 'biscoctum', '烤两遍的（面包）', '中世纪拉丁语时期'),
           ('Old French', 'bescuit', '饼干', '古法语时期'),
           ('Middle English', 'bisquyte', '饼干', '中古英语时期')],
 'fa': '14 世纪早期进入英语（Etymonline：early 14c. besquite）',
 'orig': '烤两遍的（面包）',
 'path': [('烤两遍的（面包）', '中世纪拉丁语时期', ''),
          ('饼干', '现代', 'bis「两回」+ coctus「烤过的」：先烤熟、再低温烘干，耐储存——船粮与军粮的老工艺。19 世纪早期拼写受意大利语 biscotto 影响由 bisket 改作 biscuit（以工艺得名）')],
 'mech': 'biscuit 是「烤两遍的饼」：烤得干，才能放得久。',
 'link': '今天的意思「饼干」就是工艺本义的成品。',
 'disp': '美语 biscuit 指松软小圆面包（1818 年），与英义分化（Etymonline 并记）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['passenger'] = {
 'chain': [('Latin', 'passus', '步子；步幅', '拉丁语时期'),
           ('Old French', 'passagier', '过路的；旅行者', '古法语时期'),
           ('Middle English', 'passager', '乘客', '中古英语时期')],
 'fa': '14 世纪中期见载（Etymonline：mid-14c. passager，义为「过路人、旅客」）',
 'orig': '过路人；旅客',
 'path': [('过路人；旅客', '古法语时期', ''),
          ('乘客，旅客', '现代', 'passage「通道」的形容词作名词：路上走的人。15 世纪早期词中多出一个 -n-（与 messenger 同例的插音）；1510 年代专指付费搭乘公共车辆船只的人（由路人到乘客）')],
 'mech': 'passenger 是「在路上的人」：走着走着，改成了坐着。',
 'link': '今天的意思「乘客」从「过路人」收窄而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['life'] = {
 'chain': [('Proto-Indo-European', '*leyp-', '粘着', '原始印欧语时期'),
           ('Proto-Germanic', '*lībą', '生命；身体', '原始日耳曼语时期'),
           ('Old English', 'līf', '生命', '古英语时期'),
           ('Middle English', 'lyf', '生活；生命', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏同载 līf）',
 'orig': '存续；生命',
 'path': [('存续；生命', '原始日耳曼语时期', ''),
          ('生活；生命，一生', '现代', '演变的链条是「粘住 → 留下 → 活着」：德语亲戚 Leib 至今只指「身体」；「传记」义或是中世纪拉丁语 vīta 的语义借译（义项分化）')],
 'mech': 'life 是「粘住不走」：留得下来，就是活着。',
 'link': '今天的意思「生命」从「存续」来：活，就是撑着留下。',
 'disp': '「粘→留→活」的语义过渡仅见于日耳曼语，Boutkan 称其可解但存争议（Etymonline 并引），主干形式链无异议。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['national'] = {
 'chain': [('Latin', 'nātiō', '出生；民族', '拉丁语时期'),
           ('French', 'national', '国家的', '法语近现代'),
           ('English', 'national', '国家的', '1590 年代')],
 'fa': '1590 年代借自法语（Etymonline：1590s）',
 'orig': '国家的；民族的',
 'path': [('国家的；民族的', '法语近现代', ''),
          ('国家的，全国的，民族的', '现代', 'nātiō 出 nat-「出生」（与 natural 同根）：一同出生的人群就是民族；法语加 -al 成词后整体借入（借词守恒）')],
 'mech': 'national 是「同根生的」：一个民族、一个国家。',
 'link': '今天的意思「国家的」就是借入时的本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['exact'] = {
 'chain': [('Latin', 'agere', '驱动；做', '拉丁语时期'),
           ('Latin', 'exigere', '驱出；按标准称量测定', '拉丁语时期'),
           ('Latin', 'exāctus', '精确的', '拉丁语时期'),
           ('English', 'exact', '准确的', '1530 年代')],
 'fa': '1530 年代见载形容词（Etymonline：1530s；动词义中古英语晚期先行）',
 'orig': '精确的（经测定的）',
 'path': [('精确的（经测定的）', '拉丁语时期', ''),
          ('准确的，精确的', '现代', 'exigere 是 ex- + agere：本义「驱赶出去」，兼「按砝码称量、按标准测定」——称得一丝不差，就是 exact（由称量到精确）')],
 'mech': 'exact 是「上秤称过的」：分量丝毫不差，才叫准确。',
 'link': '今天的意思「精确的」就是拉丁语的测定义。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['geography'] = {
 'chain': [('Ancient Greek', 'γῆ (gē)', '大地', '古希腊时期'),
           ('Ancient Greek', 'γεωγραφία (geōgraphia)', '大地描述', '古希腊时期'),
           ('Latin', 'geōgraphia', '地理学', '拉丁语时期'),
           ('French', 'géographie', '地理学', '法语近现代'),
           ('English', 'geography', '地理（学）', '1540 年代')],
 'fa': '1540 年代见载（Etymonline：1540s，义为描述地表的科学）',
 'orig': '大地描述（学）',
 'path': [('大地描述（学）', '古希腊时期', ''),
          ('地理（学），地理课', '现代', 'gē「大地」+ -graphia「书写、描述」：把大地写下来，就是地理（由描绘到学科）')],
 'mech': 'geography 是「把大地写下来」：地是对象，写是办法。',
 'link': '今天的意思「地理学」就是希腊语本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {
 'eighth': 'compositional（主干复核后）：eight + -th 序数词（古英语 eahtoþa 一线），构件自明，本词不单独立档，保持待核',
 'twentieth': 'compositional（主干复核后）：twenty 的序数形（古英语 twēntigoþa 一线），构件自明，本词不单独立档，保持待核',
}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
