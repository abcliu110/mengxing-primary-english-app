# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['important'] = {
 'chain': [('Latin', 'portāre', '搬运', '拉丁语时期'),
           ('Medieval Latin', 'importāns', '有分量的；重大的', '中世纪拉丁语时期'),
           ('Middle English', 'important', '重要的', '中古英语时期')],
 'fa': '15 世纪中期见载（Etymonline：mid-15c.，义为「有分量、有后果的」）',
 'orig': '有分量的；重大的',
 'path': [('有分量的；重大的', '中世纪拉丁语时期', ''),
          ('重要的，重大的', '现代', '与 import 同根：中世纪拉丁语里 importāre 已有「意味着、要紧」一义，其现在分词 importāns 就是「要紧的」——分量是「带进来的重量」的比喻（由搬运到分量）')],
 'mech': 'important 是「有分量」：带进来的东西够重，才叫重要。',
 'link': '今天的意思「重要的」就是中世纪拉丁语义，一路没变。',
 'disp': '1713 年另有「自负、摆架子」义（Etymonline 并记）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['reporter'] = {
 'chain': [('Old French', 'reporteur', '报告者', '古法语时期'),
           ('Middle English', 'reportour', '记者', '中古英语时期')],
 'fa': '约 1400 年见载（Etymonline：c. 1400 reportour，义为「转述者」）',
 'orig': '转述者（报告者）',
 'path': [('转述者（报告者）', '约 1400 年', ''),
          ('记者，新闻播报员', '现代', '先是泛指「把话带回来的人」（16—17 世纪常含贬义：传话者），1610 年代指记录判例的人，1798 年定型为报社记者；有趣的是法语 reporter 的记者义是 19 世纪从英语回借的（由传话到职业记者，词还出了趟国又回来）')],
 'mech': 'reporter 是「带消息回来的人」：带的话成了新闻，职业就成了记者。',
 'link': '今天的意思「记者」从「转述者」职业化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['wednesday'] = {
 'chain': [('Latin', 'diēs Mercuriī', '墨丘利之日', '拉丁语时期'),
           ('Old English', 'wōdnesdæġ', '沃登之日', '古英语时期'),
           ('Middle English', 'Wednesdai', '星期三', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏同载「Woden 之日」）',
 'orig': '沃登（奥丁）之日',
 'path': [('沃登（奥丁）之日', '古英语时期', ''),
          ('星期三', '现代', '罗马历的「墨丘利日」被日耳曼人译借：以自家主神沃登（奥丁）顶替墨丘利（塔西佗已记此对应）——一周七天，神的名字留到今天（译借造词）')],
 'mech': 'Wednesday 是「奥丁的日子」：罗马的水星日，换上了北欧的主神。',
 'link': '今天的意思「星期三」就是历法本义；拼写里的 d 早已不读（15 世纪起缩读）。',
 'disp': '德语此日作 Mittwoch「周中」（受哥特教会历影响），斯拉夫语 sreda 等同理（Etymonline 并记）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['actor'] = {
 'chain': [('Proto-Indo-European', '*h₂eǵ-', '驱动；赶', '原始印欧语时期'),
           ('Latin', 'agere', '驱动；做', '拉丁语时期'),
           ('Latin', 'āctor', '执行者；经管者', '拉丁语时期'),
           ('Middle English', 'actour', '演员', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「监管人、经管人」）',
 'orig': '经管者；执行者',
 'path': [('经管者；执行者', '拉丁语时期', ''),
          ('男演员，演员', '现代', '拉丁语 āctor 本是「做事的人」（赶牲口的、打官司的、演戏的都算）：入英语先指经管人，1580 年代定型为舞台演员（由泛指做事者到专指演戏者）')],
 'mech': 'actor 是「做事的人」：做的事上了台，就是演员。',
 'link': '今天的意思「演员」是拉丁语多义里留下来的一支。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['active'] = {
 'chain': [('Proto-Indo-European', '*h₂eǵ-', '驱动；赶', '原始印欧语时期'),
           ('Latin', 'āctīvus', '主动的；好动的', '拉丁语时期'),
           ('Old French', 'actif', '活跃的', '古法语时期'),
           ('Middle English', 'actyf', '活跃的', '中古英语时期')],
 'fa': '14 世纪中期进入英语（Etymonline：mid-14c.，义为「乐于入世活动的」）',
 'orig': '乐于（入世）活动的',
 'path': [('乐于（入世）活动的', '14 世纪中期', ''),
          ('活跃的，积极的', '现代', '先与「静修」相对（入世忙碌）；14 世纪晚期有「能动（对被动）」义，1590 年代「精力充沛」义；语法上的「主动语态」15 世纪中期已见（由生活态度到一般性质）')],
 'mech': 'active 是「闲不住」：修士静修，它偏要入世做事。',
 'link': '今天的意思「活跃的」从「乐于活动」泛化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['activity'] = {
 'chain': [('Latin', 'āctīvus', '主动的', '拉丁语时期'),
           ('Medieval Latin', 'āctīvitās', '活动（性）', '中世纪拉丁语时期'),
           ('French', 'activité', '活动', '法语近现代'),
           ('Middle English', 'activity', '活动', '中古英语时期')],
 'fa': '约 1400 年见载（Etymonline：c. 1400，义为「入世的活动生活」）',
 'orig': '入世的活动（生活）',
 'path': [('入世的活动（生活）', '约 1400 年', ''),
          ('活动', '现代', '本是经院哲学的术语（āctīvitās）：1520 年代有「活泼、忙碌的状态」义，1923 年生「（教育）活动课」义（由哲学概念到日常与课堂）')],
 'mech': 'activity 是 active 的名词化：先是哲学词，后是日常词。',
 'link': '今天的意思「活动」从「活动的状态」泛化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {
 'rainy': 'compositional（主干复核后）：rain + -y 形容词，古英语 reġniġ 已成词（日耳曼语 *regnagaz）；构件自明、词义无转折，本词不单独立档，保持待核',
 'strawberry': 'motivation_unsettled（主干复核后）：straw + berry 复合（古英语 strēawberġe）构件无疑，但 straw 的命名理据未定——果实结于草茎状匍匐茎说、采果穿草茎成串说（2024 年专文并列）、果面籽粒如草屑说并存，无定论，保持待核',
}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
