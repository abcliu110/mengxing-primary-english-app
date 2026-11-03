# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['ice'] = {
 'chain': [('Proto-Germanic', '*īsą', '冰', '原始日耳曼语时期'),
           ('Old English', 'īs', '冰', '古英语时期'),
           ('Middle English', 'ice', '冰', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 īs 起头）',
 'orig': '冰',
 'path': [('冰', '古英语时期', ''),
          ('冰，冰块', '现代', '词义从未变：古英语里它还是 -i- 的符文字名；15 世纪拼法改作 ice，貌似法语，其实是本土老词')],
 'mech': 'ice 是日耳曼语的冻水老名：一个音节，几千年没变。',
 'link': '今天的意思「冰」就是最早的意思，一路没变。',
 'disp': '更深来源未定（Etymonline 明标 uncertain；或与阿维斯陀语 aexa-「霜」有亲缘，未定论），本档链止于日耳曼语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['fun'] = {
 'chain': [('Middle English', 'fonne', '傻子；受骗者', '中古英语时期'),
           ('English', 'fun', '骗局；恶作剧', '约 1700 年')],
 'fa': '约 1700 年见载名词（Etymonline：c. 1700，义为「骗局、恶作剧」；动词 fun「哄骗」1680 年代先行）',
 'orig': '骗局；恶作剧',
 'path': [('骗局；恶作剧', '约 1700 年', ''),
          ('乐趣，开心', '现代', '出「愚弄」一家（fon「傻子」、fonnen「把人弄傻」）：先指骗人的把戏，1720 年代转指「消遣、乐子」——耍人的戏，耍着耍着成了好玩；make fun of 至今留着老义')],
 'mech': 'fun 先是耍人的把戏：骗局好玩，好玩就成了乐趣。',
 'link': '今天的意思「乐趣」从「恶作剧」转来：逗人玩的，玩出了乐。',
 'disp': 'fon 一族或为斯堪的纳维亚来源（古诺斯语 fáni「自负者」），终极来源未定（两源并记），本档止于中古英语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['broken'] = {
 'chain': [('Proto-Germanic', '*brukanaz', '被打破的（分词）', '原始日耳曼语时期'),
           ('Old English', 'brocen', '破损的', '古英语时期'),
           ('Middle English', 'broken', '坏掉的', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：brocen 为 break 的过去分词形容词）',
 'orig': '被打破的',
 'path': [('被打破的', '古英语时期', ''),
          ('坏掉的，破损的', '现代', 'break 的古过去分词作形容词定型：1590 年代有「（地形）崎岖」与「（语言）不地道」两路引申（由碎裂到不完整）')],
 'mech': 'broken 是 break 的老分词：碎了的，就是坏了的。',
 'link': '今天的意思「坏掉的」就是分词本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['fallen'] = {
 'chain': [('Middle English', 'fallen', '落下的', '中古英语时期')],
 'fa': '约 1400 年见载（Etymonline：c. 1400，fall 的过去分词形容词）',
 'orig': '落下的',
 'path': [('落下的', '约 1400 年', ''),
          ('落下的，倒下的；阵亡的', '现代', 'fall 的 -en 分词作形容词：1620 年代有「（道德上）堕落的」，1765 年「阵亡者」义（the fallen）——落下去的人，各有落法（由物理坠落到道德与生死）')],
 'mech': 'fallen 是 fall 的老分词：落下去的士兵、落下去的人。',
 'link': '今天的意思「倒下的」就是分词本义，比喻义都是从「落」长出来的。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}

R = {
 'rocky': 'compositional（主干复核后）：rock + -y（15 世纪晚期；更早有借法语 roche 的 rochi，约 1300 年）；「不稳」义（1737 年）出自动词 rock；构件自明，本词不单独立档，保持待核',
 'clearly': 'compositional（主干复核后）：clear + -ly 副词（约 1300 年「清楚地」，1560 年代生「显然」义），构件自明，本词不单独立档，保持待核',
 'peaceful': 'compositional（主干复核后）：peace + -ful（14 世纪早期），曾顶替古英语 friþsum；构件自明，本词不单独立档，保持待核',
 'moonlight': 'compositional（主干复核后）：moon + light 复合（中古英语 moonelight），构件自明，本词不单独立档，保持待核',
}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
