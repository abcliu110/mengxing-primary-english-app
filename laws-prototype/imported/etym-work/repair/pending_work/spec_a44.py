# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['employee'] = {
 'chain': [('French', 'employé', '雇员', '法语近现代'),
           ('English', 'employee', '雇员', '19 世纪初')],
 'fa': '19 世纪初见载（Wiktionary 引 OED；Etymonline 作 1850 年，「mainly in U.S. use」）',
 'orig': '被雇的人',
 'path': [('被雇的人', '19 世纪初', ''),
          ('雇员；员工', '现代', 'employ + -ee，仿法语 employé 造：-ee 专表「被……的人」（构成记录）')],
 'mech': 'employee 是「被雇的那个」：-ee 是受事者的名牌。',
 'link': '今天的意思「员工」就是构词原义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['empty'] = {
 'chain': [('Old English', 'ǣmetta', '闲暇', '古英语时期'),
           ('Old English', 'ǣmettiġ', '闲着的；空的', '古英语时期'),
           ('English', 'empty', '空的', '约 1200 年')],
 'fa': '约 1200 年见载（Etymonline：c. 1200，对人义「闲暇、无业、未婚」）',
 'orig': '闲暇的（无事占用的）',
 'path': [('闲暇的（无事占用的）', '古英语时期', ''),
          ('空的；倒空，腾空', '现代', '词义三跳：人「没事占着」→ 处所「没人占着」→ 容器「没东西占着」——希腊语 adeios「空」同路由「无所畏惧」来（Buck 语，中古插入音 -p- 是顺口加的）（由闲置到空无）')],
 'mech': 'empty 本是「闲着」：人先空，物后空。',
 'link': '今天的意思「空」从「无所占用」演化而来。',
 'disp': 'ǣmettiġ 的更深构词两说：Watkins/Wiktionary 作 *uz-「出」+ *mōt-「必须、能力」（印欧根 *med-）；牛津作 ā「无」+ mōt「会面」（moot）。本档止于古英语层，两说登记。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['engineer'] = {
 'chain': [('Proto-Indo-European', '*ǵenh₁-', '生育；产生', '原始印欧语时期'),
           ('Latin', 'gignere', '生育', '拉丁语时期'),
           ('Latin', 'ingenium', '天赋；巧器', '拉丁语时期'),
           ('Old French', 'engigneor', '工程师', '古法语时期'),
           ('Middle English', 'enginour', '工程师', '中古英语时期')],
 'fa': '14 世纪中期进入英语（Etymonline：mid-14c.，义为「军事器械的建造者」）',
 'orig': '攻城器械的设计建造者',
 'path': [('攻城器械的设计建造者', '古法语时期', ''),
          ('工程师', '现代', 'ingenium「天生的巧思」：15 世纪初「发明家、设计师」，约 1600 年非军事义，19 世纪才成通义（故有 civil engineer 的旧区分）；1832 年美式「火车司机」义（由军械到工程）')],
 'mech': 'engineer 是「有巧思的人」：先造攻城机，后修大桥。',
 'link': '今天的意思「工程师」从军械师扩展而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['ensue'] = {
 'chain': [('Proto-Indo-European', '*sekʷ-', '跟随', '原始印欧语时期'),
           ('Latin', 'sequī', '跟随', '拉丁语时期'),
           ('Latin', 'insequī', '紧追；接续', '拉丁语时期'),
           ('Middle English', 'ensue', '随之而来', '约 1400 年')],
 'fa': '约 1400 年进入英语（Etymonline：c. 1400，义为「追寻、紧跟」）',
 'orig': '紧追；跟随',
 'path': [('紧追；跟随', '拉丁语时期', ''),
          ('接着发生；随之而来', '现代', 'in-「贴上」+ sequī「跟」：15 世纪初「作为后果而跟来」义立——结果总是紧跟在原因后面（由紧追到接续）')],
 'mech': 'ensue 是「跟在后头」：先是人追，后是事随。',
 'link': '今天的意思「随之而来」就是本义的抽象化。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['entertain'] = {
 'chain': [('Proto-Indo-European', '*ten-', '拉伸', '原始印欧语时期'),
           ('Latin', 'tenēre', '握持', '拉丁语时期'),
           ('Old French', 'entretenir', '维系；招待', '古法语时期'),
           ('Middle English', 'entertenen', '使娱乐', '中古英语时期')],
 'fa': '15 世纪晚期进入英语（Etymonline：late 15c.，义为「维持、使（某人）处于某种心境」）',
 'orig': '维持；维系',
 'path': [('维持；维系', '古法语时期', ''),
          ('使娱乐；款待', '现代', 'entre-「之间」+ tenir「握」：把人「留住」——15 世纪晚期「留客」义，1620 年代「取乐」义：留住客，还得留住心（由维系到款待取乐）')],
 'mech': 'entertain 是「留人」：留得住人，再留得住笑。',
 'link': '今天「娱乐/款待」两义同出一「留」。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['entry'] = {
 'chain': [('Latin', 'intrā', '在内', '拉丁语时期'),
           ('Latin', 'intrāre', '进入', '拉丁语时期'),
           ('Old French', 'entree', '进入；入口', '古法语时期'),
           ('Middle English', 'entre', '入口；条目', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300，义为「进入的行为/事实；入口」）',
 'orig': '进入；入口',
 'path': [('进入；入口', '古法语时期', ''),
          ('进入；入口；条目', '现代', 'entrer 的阴性分词名词化：约 1500 年「记入（书、表）之物」义立——东西「进了」账本（由进入到条目）')],
 'mech': 'entry 是「进门」：人进门是入口，字进账是条目。',
 'link': '今天三义同出一「进」。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['equal'] = {
 'chain': [('Latin', 'aequus', '平的；均等的', '拉丁语时期'),
           ('Latin', 'aequālis', '均等的', '拉丁语时期'),
           ('Middle English', 'equal', '相等的', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「数量完全相同」）',
 'orig': '平的；均等的',
 'path': [('平的；均等的', '拉丁语时期', ''),
          ('相等的；平等的', '现代', 'aequus 一词兼「平坦」与「公正、公道」：地面平，人也平；equal rights 1752 年（由地平到人平）')],
 'mech': 'equal 是「一碗水端平」：从地面平到人权平。',
 'link': '今天的意思「平等」就是本义的社会版。',
 'disp': 'aequus 本身来源未明（Etymonline：of unknown origin），本档止于拉丁语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {'ending': 'compositional（主干复核后）：现代形 end + -ing 完全透明；古英语已有 endung「终结」同源名词，但现代构词透明，词源叙事归形态层，待核保持'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
