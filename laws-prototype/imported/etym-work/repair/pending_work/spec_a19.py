# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['brush'] = {
 'chain': [('Proto-Germanic', '*bruskaz', '灌木丛；簇', '原始日耳曼语时期'),
           ('Vulgar Latin', '*bruscia', '嫩枝簇', '通俗拉丁语时期'),
           ('Old French', 'broisse', '刷子', '古法语时期'),
           ('Middle English', 'brusshe', '刷子', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「扫尘的刷子」）',
 'orig': '扫尘刷',
 'path': [('扫尘刷', '古法语时期', ''),
          ('刷（刷牙等）', '现代', '「一簇」做成的工具：嫩枝簇（或猪鬃簇）捆起来扫尘，15 世纪晚期添油漆刷义（由簇到刷子）')],
 'mech': 'brush 是「一簇毛」：成簇的东西，捆起来就是刷。',
 'link': '今天的意思「刷子」就是本义，一路没变。',
 'disp': '底层两拟未决：*bruscia「嫩枝簇」线与 *burstiz「猪鬃」线，Wiktionary 并列（or also），Etymonline 亦双 perhaps，主干（法语 broisse ← 日耳曼语簇义之根）一致。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['animal'] = {
 'chain': [('Proto-Indo-European', '*h₂enh₁-', '呼吸', '原始印欧语时期'),
           ('Latin', 'anima', '气息；灵魂', '拉丁语时期'),
           ('Latin', 'animal', '有呼吸的生灵', '拉丁语时期'),
           ('Middle English', 'animal', '动物', '中古英语时期')],
 'fa': '14 世纪初进入英语（Etymonline：early 14c.，义为「一切有知觉的活物」，含人）',
 'orig': '有呼吸的生灵',
 'path': [('有呼吸的生灵', '拉丁语时期', ''),
          ('动物', '现代', 'animālis「有气的」：会喘气的都算。1600 年前在英语里罕用，后挤走 beast 成通称；今多专指非人（由呼吸者到动物）')],
 'mech': 'animal 是「会喘气的」：有气，就是活物。',
 'link': '今天的意思「动物」是「有生之物」收窄后的通称。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['puppy'] = {
 'chain': [('French', 'poupée', '玩偶', '法语近现代'),
           ('English', 'puppy', '小狗', '15 世纪晚期')],
 'fa': '15 世纪晚期见载（Etymonline：late 15c.，义为「妇人的小宠物狗」）',
 'orig': '玩偶似的宠物小狗',
 'path': [('玩偶似的宠物小狗', '15 世纪晚期', ''),
          ('小狗', '现代', '「小狗被当作玩偶宠着」（Century Dictionary）：先是膝上玩具犬，1590 年代转作「幼犬」通称，顶替本土词 whelp（由玩偶到幼犬）')],
 'mech': 'puppy 是「玩偶」：抱着宠的小狗，名字像玩具。',
 'link': '今天的意思「小狗」从「宠物玩具犬」泛化而来。',
 'disp': '法语 poupée 说三方一致但均带保留（likely/perhaps/uncertain），未见竞争谱系。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['kitten'] = {
 'chain': [('Late Latin', 'cattus', '猫', '晚期拉丁语时期'),
           ('Old French', 'chaton', '小猫', '古法语时期'),
           ('Middle English', 'kitoun', '小猫', '中古英语时期')],
 'fa': '14 世纪晚期见载（Etymonline：late 14c.）',
 'orig': '小猫',
 'path': [('小猫', '古法语时期', ''),
          ('小猫', '现代', 'chat「猫」的指小形（安格鲁-诺曼变体 kitoun）：借词守恒；本词与 cat 同根异路（cat 直借、kitten 经法语指小形）（借词守恒）')],
 'mech': 'kitten 是「小一号的 cat」：法语给它加了个小的尾巴。',
 'link': '今天的意思「小猫」就是借入时的本义，一路没变。',
 'disp': '日耳曼语同形词（kitling 等）或有加强作用；纯日耳曼说 Wiktionary 谓「有问题但无法完全排除」。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['turtle'] = {
 'chain': [('Medieval Latin', 'tortuca', '龟', '中世纪拉丁语时期'),
           ('Old French', 'tortue', '龟', '古法语时期'),
           ('Middle English', 'tortou', '龟', '中古英语时期'),
           ('English', 'turtle', '乌龟', '16 世纪中期')],
 'fa': '16 世纪中期见载（牛津：mid 16th cent.；Etymonline：by mid-17c.，原指海龟）',
 'orig': '海龟',
 'path': [('海龟', '16 世纪', ''),
          ('乌龟', '现代', '法语 tortue 被水手按耳熟的 turtel（斑鸠）改造成 turtle——「一时心血来潮的联想」（Century Dictionary）；后泛指陆龟（由音近词牵引改形）')],
 'mech': 'turtle 的长相是借的：水手听错了鸠的名字，安给了龟。',
 'link': '今天的意思「龟」由 tortue 变音而来。',
 'disp': 'tortuca 更深来源未明（a word of unknown origin），本档止于中世纪拉丁语层。',
 'folk': '与 turtel（斑鸠）的牵合是来源一致记载的音近联想，非词源本身。', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['camel'] = {
 'chain': [('Semitic', '*gamal-', '骆驼', '闪米特语时期'),
           ('Ancient Greek', 'κάμηλος (kámēlos)', '骆驼', '古希腊时期'),
           ('Latin', 'camēlus', '骆驼', '拉丁语时期'),
           ('Old English', 'camel', '骆驼', '古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：camel，或经古北法语入）',
 'orig': '骆驼',
 'path': [('骆驼', '古英语时期', ''),
          ('骆驼', '现代', '词随畜走：闪米特语（希伯来语 gamal、阿拉伯语 jamal）→ 希腊 → 拉丁 → 英语。古英语还有个 olfend——把骆驼和象搞混的本土词（借词守恒）')],
 'mech': 'camel 是沙漠原产的名字：一路借到没有骆驼的英格兰。',
 'link': '今天的意思「骆驼」就是借入时的本义，一路没变。',
 'disp': '闪米特层内部或与阿拉伯语 jamala「承担」相关（perhaps），未定。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['spider'] = {
 'chain': [('Proto-Indo-European', '*(s)penh₁-', '抽；纺', '原始印欧语时期'),
           ('Proto-Germanic', '*spinnaną', '纺织', '原始日耳曼语时期'),
           ('Old English', 'spīþra', '蜘蛛（纺织者）', '古英语时期'),
           ('Middle English', 'spithre', '蜘蛛', '中古英语时期')],
 'fa': '古英语晚期就已经有了（牛津：late OE spīthra）',
 'orig': '纺织者（蜘蛛）',
 'path': [('纺织者（蜘蛛）', '古英语时期', ''),
          ('蜘蛛', '现代', '字面就是「纺线工」（spin + 施事后缀）：它不是古英语的常用词（当时多叫 attercop「毒头」），14 世纪才上位（由纺织者专名化）')],
 'mech': 'spider 是「纺织工」：织网的活儿，给了它名字。',
 'link': '今天的意思「蜘蛛」始于对它手艺的命名。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {'penguin': 'origin_unknown（主干复核后）：牛津「of unknown origin」，Etymonline 亦云未明。威尔士语 pen「头」+ gwyn「白」说「常被断言」而未证，拉丁语 pinguis「肥」仅形似，无一家定案；指称转移（1570 年代指北半球大海雀 → 1580 年代南半球企鹅）有据而词形来历无主干可对，保持待核'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
