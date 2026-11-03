# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['beauty'] = {
 'chain': [('Latin', 'bellus', '漂亮的；俊美的', '拉丁语时期'),
           ('Vulgar Latin', '*bellitātem', '美', '通俗拉丁语时期'),
           ('Old French', 'beauté', '美；美人', '古法语时期'),
           ('Middle English', 'bewty', '美', '中古英语时期')],
 'fa': '14 世纪早期进入英语（Etymonline：early 14c. bealte）',
 'orig': '美（形体之美）',
 'path': [('美（形体之美）', '14 世纪早期', ''),
          ('美，美丽；美人', '现代', 'bellus 在古典拉丁语里多用于女子与孩童：好看的人。入英语后顶替本土词 wlite；14 世纪晚期生出具体义「美人」（由性质到指人）')],
 'mech': 'beauty 是「好看的样子」：从拉丁语的「俊美」一路传下来。',
 'link': '今天的意思「美」就是本义，一路没变。',
 'disp': 'bellus 更深或出印欧语 *dw-en-elo-（*deu-「致敬、行善」的指小形，Watkins 说），两源未展开，本档止于拉丁语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['dangerous'] = {
 'chain': [('Latin', 'dominus', '主人；领主', '拉丁语时期'),
           ('Old French', 'dangier', '权力；伤害力', '古法语时期'),
           ('Anglo-Norman French', 'dangerous', '傲慢的；难打交道的', '12 世纪'),
           ('Middle English', 'daungerous', '危险的', '中古英语时期')],
 'fa': '约 1200 年见载（Etymonline：c. 1200 daungerous，义为「傲慢、苛刻」）',
 'orig': '傲慢的；难打交道的',
 'path': [('傲慢的；难打交道的', '约 1200 年', ''),
          ('危险的', '现代', 'danger 在古法语里先是「（领主的）权势、伤害力」（源头是拉丁语 dominus「主人」）：有权势的人难打交道，故 dangerous 先指「傲慢苛刻」；约 1400 年才转到现代「有危险的」——从施加危险的人滑向带来危险的事（由性情到性质）')],
 'mech': 'dangerous 先骂人傲慢：有权势的人惹不起，后来才轮到事危险。',
 'link': '今天的意思「危险的」从「难打交道的」转来：惹不起的人，变成了碰不得的事。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {
 'toy': 'sources_split（主干复核后）：牛津与 Etymonline 均标来源未定（Etymonline 谓现代 toy 或为多词合流）；Wiktionary 主张或出中古荷兰语 tuyg「器具」（cf. speeltuig「玩具」）一线，仅单家主推，不成互证，保持待核',
 'boy': 'origin_unknown（主干复核后）：牛津与 Etymonline 均明标来源未定；Wiktionary 另立日耳曼语 *bōjô「幼弟」一线，余有古法语 embuie「戴镣者」说与 Liberman「拟声词＋昵称」混合说，并存而无主干互证，保持待核',
 'weekday': 'compositional（主干复核后）：week + day 复合，古英语 wicdæġ 已成词、义即「一周之日（尤非周日）」，构件自明；词源归 week、day 两词条，保持待核',
 'anyone': 'compositional（主干复核后）：any + one 复合，古英语以来即两词并用，1844 年才合写；构件自明，本词不单独立档，保持待核',
 'nobody': 'compositional（主干复核后）：no + body 复合，约 1300 年作 no bodi 两词，14—18 世纪分写、后合写；1580 年代另生「小人物」义；构件自明，本词不单独立档，保持待核',
 'dislike': 'compositional（主干复核后）：dis- + like 混合构词（1540 年代），曾顶替本土词 mislike；构件自明，本词不单独立档，保持待核',
}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
