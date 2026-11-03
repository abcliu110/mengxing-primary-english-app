# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['wait'] = {
 'chain': [('Proto-Indo-European', '*weǵ-', '醒着；有活力', '原始印欧语时期'),
           ('Proto-Germanic', '*wahtwō', '守望；警戒', '原始日耳曼语时期'),
           ('Frankish', '*wahtōn', '守望', '法兰克语时期'),
           ('Old Northern French', 'waitier', '守望；窥伺', '古北法语时期'),
           ('Middle English', 'waiten', '等待', '中古英语时期')],
 'fa': '约 1200 年进入英语（Etymonline：c. 1200，义为「窥伺、埋伏」）',
 'orig': '守望；埋伏窥伺',
 'path': [('守望；埋伏窥伺', '约 1200 年', ''),
          ('等，等待', '现代', '老根是「醒着」：醒着守着，就是 wait。入英语时先是带敌意的「埋伏盯着」，14 世纪晚期敌意褪去，只剩下「留在原地等」；14 世纪晚期又分出「侍奉」（waiter 的来源）（由窥伺到守候）')],
 'mech': 'wait 是「醒着守着」：守着守着，敌意没了，只剩等待。',
 'link': '今天的意思「等待」从「守望窥伺」褪色而来：盯人变成了等候。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['act'] = {
 'chain': [('Proto-Indo-European', '*h₂eǵ-', '驱动；赶', '原始印欧语时期'),
           ('Latin', 'agere', '驱动；做', '拉丁语时期'),
           ('Latin', 'ācta', '行事记录（公报）', '拉丁语时期'),
           ('Middle English', 'acte', '行为', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「所做之事」）',
 'orig': '所做之事（行为）',
 'path': [('所做之事（行为）', '14 世纪晚期', ''),
          ('表演；行动；（戏剧的）一幕', '现代', '老根是「赶、驱动」：驱动出来的就是「做」；拉丁语里 ācta 是记下来的行事（公报）；戏剧「一幕」义拉丁语已有（1510 年代入英），立法「法案」义 15 世纪早期（多义同源分化）')],
 'mech': 'act 的老根是「赶着走」：赶出来的动作，就是行为。',
 'link': '今天的意思「行为、表演」都从「做」来：台上做的也是 act。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['visitor'] = {
 'chain': [('Anglo-Norman French', 'visitour', '来访者；巡察者', '盎格鲁-诺曼法语时期'),
           ('Middle English', 'visitour', '来访者', '中古英语时期')],
 'fa': '14 世纪晚期见载（Etymonline：late 14c. visitour）',
 'orig': '来访者',
 'path': [('来访者', '14 世纪晚期', ''),
          ('参观者，游客，来访者', '现代', 'visit「去看」的人：法语式 visitour 与本土式 visiter（visit + -er）同期并存数百年，最终 -or 式胜出（双式竞争定型）')],
 'mech': 'visitor 是「来看你的人」：-or 式赢了 -er 式，成了正名。',
 'link': '今天的意思「来访者」就是本义，一路没变。',
 'disp': 'visiter 一式罕见但顽固，奥斯汀、狄更斯仍用（Etymonline 引 OED 1989）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['predict'] = {
 'chain': [('Latin', 'praedicere', '预先宣告', '拉丁语时期'),
           ('English', 'predict', '预测', '1620 年代')],
 'fa': '1620 年代见载（Etymonline：1620s，或为 prediction 的逆构）',
 'orig': '预先宣告',
 'path': [('预先宣告', '拉丁语时期', ''),
          ('预测，预言', '现代', 'prae-「在前」+ dicere「说」：事先说出来。或直接借拉丁语，或从名词 prediction 逆构出动词（构词方向可商榷，词源一致）')],
 'mech': 'predict 是「抢先说」：事情没发生，先说出来。',
 'link': '今天的意思「预测」就是构词本义，一路没变。',
 'disp': '入英路径两说（直借拉丁语 / 自 prediction 逆构），Etymonline 与 Wiktionary 并记，主干一致。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['report'] = {
 'chain': [('Latin', 'reportāre', '带回；转达', '拉丁语时期'),
           ('Old French', 'reporter', '报告；转述', '古法语时期'),
           ('Middle English', 'reporten', '报告', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「一人带给另一人的消息」）',
 'orig': '带回来的（消息）',
 'path': [('带回来的（消息）', '拉丁语时期', ''),
          ('报告，报道；成绩单', '现代', 're-「回」+ portāre「搬」：把见闻搬回来说。15 世纪早期升格为「权威记述」，1660 年代有「调查结果正式陈述」，1873 年学校成绩单义；1580 年代另有「爆响」义（枪炮声如被传报）')],
 'mech': 'report 是「把消息搬回来」：见闻搬回家，就是报告。',
 'link': '今天的意思「报告」从「带回消息」定型：搬运变成了文体。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['fact'] = {
 'chain': [('Proto-Indo-European', '*dʰeh₁-', '放置；做成', '原始印欧语时期'),
           ('Latin', 'factum', '已做之事', '拉丁语时期'),
           ('Middle English', 'fact', '事实', '中古英语时期')],
 'fa': '1530 年代见载现代词形（Etymonline：1530s，义为「行为」）',
 'orig': '已做之事（行为）',
 'path': [('已做之事（行为）', '1530 年代', ''),
          ('事实，真相', '现代', 'factum 是 facere「做」的名词化：「做过的事」。16—17 世纪多指坏事（罪行，after the fact 至今留痕）；1630 年代起转指「确实发生过的状态」，1660 年代经皇家学会（胡克、波义耳等）铸成现代经验义——做过的事推不翻，就是事实（由行为到真值的抽象化）')],
 'mech': 'fact 是「已经做成的事」：做成了，就赖不掉，所以是事实。',
 'link': '今天的意思「事实」从「已做之事」来：发生过，才算数。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['difficult'] = {
 'chain': [('Latin', 'difficilis', '难做的', '拉丁语时期'),
           ('Latin', 'difficultas', '困难', '拉丁语时期'),
           ('Old French', 'difficulté', '困难', '古法语时期'),
           ('Middle English', 'difficulte', '困难', '中古英语时期'),
           ('Middle English', 'difficult', '困难的', '约 1400 年')],
 'fa': '约 1400 年见载（Etymonline：c. 1400，或称「非词源式逆构词」）',
 'orig': '难做的',
 'path': [('难做的', '拉丁语时期', ''),
          ('困难的，难做的', '现代', '英语先借进名词 difficulty（困难），约 1400 年从它身上逆构出形容词 difficult——先有「困难」，后有「困难的」（逆构词成形）')],
 'mech': 'difficult 是从 difficulty 里「倒推」出来的：先借名词，再造形容词。',
 'link': '今天的意思「困难的」就是拉丁源头 difficilis 的本义，绕路回到原点。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['design'] = {
 'chain': [('Latin', 'signum', '记号', '拉丁语时期'),
           ('Latin', 'dēsignāre', '标出；指定', '拉丁语时期'),
           ('Old French', 'designer', '指定；设计', '古法语时期'),
           ('Middle English', 'designen', '设计', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「指定」）',
 'orig': '标出；指定',
 'path': [('标出；指定', '拉丁语时期', ''),
          ('设计；图案', '现代', '老根是 signum「记号」：画个记号标出来，就是「指定」；意大利语 disegnare 16 世纪生出「绘制」义，经法语入英，1630 年代英语 design 有了「画轮廓」，1660 年代「以艺术技巧规划制作」（由标记到图样）')],
 'mech': 'design 是「做记号」：先画个印，再照着做，就是设计。',
 'link': '今天的意思「设计」从「标出、指定」来：记号变成了图纸。',
 'disp': '词头 de- 抑或 dis- 两读并存（Wiktionary 并记），不碍主干。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
