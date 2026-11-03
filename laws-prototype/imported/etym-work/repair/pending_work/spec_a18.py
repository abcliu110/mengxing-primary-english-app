# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['scissors'] = {
 'chain': [('Latin', 'caedere', '砍；切', '拉丁语时期'),
           ('Late Latin', 'cīsōria', '切割工具（复数）', '晚期拉丁语时期'),
           ('Old French', 'cisoires', '剪刀（复数）', '古法语时期'),
           ('Middle English', 'sisoures', '剪刀', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，作 sisoures；Wiktionary：1350–1400 见载）',
 'orig': '切割工具',
 'path': [('切割工具', '晚期拉丁语时期', ''),
          ('剪刀（复数）', '现代', '拉丁语里本是单件「切割工具」cīsōrium，它的复数 cīsōria 成了词形：两刃的东西，英语干脆按复数过日子（由工具到剪刀）')],
 'mech': 'scissors 是「切割工具」的复数：两片刃，天生一对。',
 'link': '今天的意思「剪刀」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '今拼 sc- 是 16 世纪误认拉丁语 scindere「劈开」的结果（两家一致记载），并非本词词源，是文档在案的讹拼', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['check'] = {
 'chain': [('Persian', 'shāh', '国王', '波斯语时期'),
           ('Arabic', 'shāh', '国王（棋语）', '阿拉伯语时期'),
           ('Medieval Latin', 'scaccus', '将军（棋）', '中世纪拉丁语时期'),
           ('Old French', 'eschec', '将军（棋）', '古法语时期'),
           ('Middle English', 'chek', '检查，核对', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300，义为棋中「将军」的喊声）',
 'orig': '将军（棋中王受攻）',
 'path': [('将军（棋中王受攻）', '古法语时期', ''),
          ('检查，核对', '现代', '王被将军，走投无路——由此生「突然的停顿、阻遏」（1510 年代），再到「防错的手段」：17 世纪晚期「查验准确」义立，1798 年银行支票 cheque 亦出此系（由棋语到核查）')],
 'mech': 'check 是棋桌上的「将军」：王被卡住了，什么都得先查一查。',
 'link': '今天的意思「检查」离棋盘三步之遥，本源在波斯国王。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['fail'] = {
 'chain': [('Latin', 'fallere', '欺骗；使落空', '拉丁语时期'),
           ('Vulgar Latin', '*fallīre', '失败；缺乏', '通俗拉丁语时期'),
           ('Old French', 'falir', '失败；缺乏', '古法语时期'),
           ('Middle English', 'failen', '失败', '中古英语时期')],
 'fa': '约 1200 年进入英语（Etymonline：c. 1200，义为「未能成事」）',
 'orig': '使失望；使落空',
 'path': [('使失望；使落空', '拉丁语时期', ''),
          ('失败；不及格', '现代', 'fallere 先是「绊人、骗人」，转「让人指望落空」：法语里成「缺乏、做不成、断供」，英语接过「失败」主线（由欺骗到落空）')],
 'mech': 'fail 是「指望落了空」：盼着的事没来，就是失败。',
 'link': '今天的意思「失败」从「令人失望」转化而来。',
 'disp': 'fallere 的印欧层：de Vaan 谓源出「绊倒」义之根（梵语 skhalate、希腊语 sphallein 同族），拉丁语「欺骗」为其比喻转义；另一拟 *bʰāl- 说未决，深层止于登记。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['explain'] = {
 'chain': [('Proto-Indo-European', '*pele-', '平；摊开', '原始印欧语时期'),
           ('Latin', 'plānus', '平的', '拉丁语时期'),
           ('Latin', 'explānāre', '摊平；讲明', '拉丁语时期'),
           ('Latin', 'explain', '解释', '15 世纪初')],
 'fa': '15 世纪初见载（Etymonline：early 15c.，义为「使心里明白」）',
 'orig': '摊平；弄平整',
 'path': [('摊平；弄平整', '拉丁语时期', ''),
          ('解释', '现代', 'ex-「出」+ plānus「平」：把皱着的东西摊平，道理就显出来了。17 世纪偶有本义用例（花苞「摊开」成叶）（由摊平到讲明）')],
 'mech': 'explain 是「摊平」：理不顺的话，摊开了说。',
 'link': '今天的意思「解释」是把「摊平」用在了道理上。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['shoulder'] = {
 'chain': [('Proto-West Germanic', '*skuldru', '肩膀', '原始西日耳曼语时期'),
           ('Old English', 'sculdor', '肩膀', '古英语时期'),
           ('Middle English', 'shulder', '肩膀', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：sculdor）',
 'orig': '肩膀',
 'path': [('肩膀', '古英语时期', ''),
          ('肩膀', '现代', '西日耳曼语通词（荷兰语 schouder、德语 Schulter 同形同义）：古义至今不变；动词「以肩推、担起」与「路肩」（1933）皆后起（借词守恒式的稳定）')],
 'mech': 'shoulder 是西日耳曼的老词：千年以来就只管肩膀。',
 'link': '今天的意思「肩膀」就是本义，一路没变。',
 'disp': '来源未明（Etymonline：a word of unknown origin），或与 shield 同源（perhaps），未定论，本档止于西日耳曼语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['toe'] = {
 'chain': [('Proto-Indo-European', '*deyḱ-', '指示；显示', '原始印欧语时期'),
           ('Proto-Germanic', '*taihwǭ', '脚趾', '原始日耳曼语时期'),
           ('Old English', 'tā', '脚趾', '古英语时期'),
           ('Middle English', 'to', '脚趾', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：tā，义为足之趾）',
 'orig': '脚趾',
 'path': [('脚趾', '古英语时期', ''),
          ('脚趾', '现代', 'Watkins 说：指头是「指给人看的」——*deik-「指示」之根（拉丁语 dīcere「说」、digitus「手指」同族）；日耳曼语里专隶于足（由指示到指头）')],
 'mech': 'toe 若有深意，是「用来指的」：手指脚趾，本是一家。',
 'link': '今天的意思「脚趾」就是本义，一路没变。',
 'disp': '*deik- 溯源为 Watkins 的拟测（Etymonline 引述时标为 perhaps prehistorically），日耳曼语层无争议。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['stomach'] = {
 'chain': [('Ancient Greek', 'στόμα (stóma)', '嘴；口', '古希腊时期'),
           ('Ancient Greek', 'στόμαχος (stómakhos)', '咽喉；食道', '古希腊时期'),
           ('Latin', 'stomachus', '食道；胃', '拉丁语时期'),
           ('Old French', 'estomac', '胃', '古法语时期'),
           ('Middle English', 'stomak', '胃，肚子', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.；更早作 stomake，14 世纪早期）',
 'orig': '咽喉；食道',
 'path': [('咽喉；食道', '古希腊时期', ''),
          ('胃；肚子', '现代', '字面就是「口、开口」：古人把各内脏的开口都叫它，后期希腊医家专给了胃；约 1400 年又兼指「肚皮」（由开口到器官）')],
 'mech': 'stomach 是「里面的口」：食物进身的第二张嘴。',
 'link': '今天的意思「胃」是器官名定点后的结果。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['voice'] = {
 'chain': [('Proto-Indo-European', '*wekw-', '说', '原始印欧语时期'),
           ('Latin', 'vōx', '嗓音；声音', '拉丁语时期'),
           ('Old French', 'voiz', '声音', '古法语时期'),
           ('Middle English', 'voice', '嗓音', '中古英语时期')],
 'fa': '13 世纪晚期进入英语（Etymonline：late 13c.，义为发声器官发出的声音）',
 'orig': '嗓音；声音',
 'path': [('嗓音；声音', '拉丁语时期', ''),
          ('嗓音', '现代', '与 vocare「呼唤」同根：中古英语里风声、水声、抽象之「声」都可借它说；语法「语态」义 14 世纪晚期，「发言权」义 15 世纪中期（由声音到意见）')],
 'mech': 'voice 是「说」的声音：先有开口，才有发言权。',
 'link': '今天的意思「嗓音」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
