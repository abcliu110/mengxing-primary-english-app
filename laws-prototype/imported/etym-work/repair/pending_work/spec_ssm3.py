# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['himself'] = {
 'chain': [('Old English', 'him selfum', '他自己', '古英语时期'),
           ('Middle English', 'hymself', '他自己', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 词条以古英语 him selfum 起头）',
 'orig': '他自己',
 'path': [('他自己', '古英语时期', ''),
          ('他自己', '现代', '意思一千年没动：him（他的与格）＋ selfum（self 的屈折形）两个词凝成一个反身代词（词组凝合）')],
 'mech': 'himself 是 him + self 凝成的：指着他本人，就是他自己。',
 'link': '今天的意思「他自己」就是最早的意思，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['neighbour'] = {
 'chain': [('Old English', 'nēahġebūr', '住在近处的人', '古英语时期'),
           ('Middle English', 'neighebour', '邻居', '中古英语时期')],
 'fa': '古英语时期就已经有了（牛津词源栏以古英语 nēahgebūr 起头）',
 'orig': '住在近处的人',
 'path': [('住在近处的人', '古英语时期', ''),
          ('邻居', '现代', '意思守恒：nēah「近」＋ ġebūr「住户、农人」——住得近的人就是邻居（古英语复合词直接传今）；本拼法为英式，美式作 neighbor')],
 'mech': 'neighbour 是「近＋住户」：住在近旁的人，就是邻居。',
 'link': '今天的意思「邻居」就是最早的意思，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'wk'], 'grade': 'ox_wk'}
S['invitation'] = {
 'chain': [('Latin', 'invītātio', '邀请（行为）', '拉丁语时期'),
           ('Middle English', 'invitacioun', '邀请', '中古英语时期')],
 'fa': '15 世纪中期进入英语（Etymonline：mid-15c.，义为「邀请之举、恳请」）',
 'orig': '邀请（行为）',
 'path': [('邀请（行为）', '拉丁语时期', ''),
          ('邀请；请柬', '现代', '先指「邀请这件事」，1610 年代添「说出口、写下来的邀请形式」——请柬、邀请函（从行为到文书的转移）')],
 'mech': 'invitation 先是「请人这件事」，后来请柬本身也叫了这个名。',
 'link': '今天的意思里「请柬」一支是从「邀请行为」转移到文书上的。',
 'disp': '其动词 invitare 的后半元素来源未定（Watkins 与 de Vaan 各有推测，见 Etymonline），本档链止于拉丁语 invītātio。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['apply'] = {
 'chain': [('Latin', 'applicare', '贴到……上；接合', '拉丁语时期'),
           ('Old French', 'aploiier', '使用；贴附', '古法语时期'),
           ('Middle English', 'apply', '贴附；使用', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.）',
 'orig': '贴到……上；接合',
 'path': [('贴到……上；接合', '拉丁语时期', ''),
          ('申请；应用；涂抹', '现代', 'applicare 是 ad-「向」＋ plicare「折」：把东西折贴上去——约 1400 年「为某目的使用」（应用）；15 世纪初「（药膏）敷在身上」（涂抹，还留着贴的动作）；1851 年「投件求职」（申请：把自己贴到岗位上去）')],
 'mech': 'apply 的老动作是「贴」：药贴在身上，力用在事上，人投到岗位上。',
 'link': '今天三个意思同出一源：贴上去——涂抹是贴，应用是贴合使用，申请是把自己贴上。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et'],
 'grade': '一级＋二级双源互证（牛津大学出版社词源栏 × Etymonline；Wiktionary 该词条仅作转指，未作旁证）'}
S['admissible'] = {
 'chain': [('Latin', 'admittere', '准许进入', '拉丁语时期'),
           ('Medieval Latin', 'admissibilis', '可准许的', '中世纪拉丁语时期'),
           ('Middle French', 'admissible', '可容许的', '中古法语时期'),
           ('English', 'admissible', '可采纳的', '17 世纪初')],
 'fa': '1610 年代见载（Etymonline：1610s，义为「可容许的」）',
 'orig': '可准许（进入）的',
 'path': [('可准许（进入）的', '中世纪拉丁语时期', ''),
          ('可采纳的', '现代', 'admittere 是 ad-「向」＋ mittere「送」：送进去、放行；1849 年定型法律义「（证据）可采纳的」——能放进门的，才能摆上法庭（从放行实物到采信证据）')],
 'mech': 'admissible 是「能放进门的」：证据过了门，才算数。',
 'link': '今天的法律义「可采纳的」从「准许进入」来：先进得了门，再谈采信。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['itch'] = {
 'chain': [('Proto-West Germanic', '*jukkjan', '痒', '原始西日耳曼语时期'),
           ('Old English', 'ġiċċe', '痒', '古英语时期'),
           ('Middle English', 'icche', '痒', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 gicce/giccan 起头）',
 'orig': '痒',
 'path': [('痒', '古英语时期', ''),
          ('发痒；渴望', '现代', '主干义稳定：皮肤发痒。13 世纪初添比喻义「心里痒痒、急着想做」——坐不住的感觉同皮肤痒一样难耐（身体感到心理的比喻）')],
 'mech': 'itch 是皮肤的「痒」：心里痒起来，就是急着想做一件事。',
 'link': '今天的意思「痒」就是最早的意思；「渴望」是从痒得难受借来的感觉。',
 'disp': '更深来源未定（Wiktionary 明标 of unknown origin）；西日耳曼语主干（*jukkjan → ġiċċe）三家一致，本档链止于此。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['hoe'] = {
 'chain': [('Proto-Indo-European', '*kau-', '砍；劈', '原始印欧语时期'),
           ('Proto-Germanic', '*hawwaną', '砍', '原始日耳曼语时期'),
           ('Frankish', '*hauwā', '锄头', '法兰克语时期'),
           ('Old French', 'houe', '锄头', '古法语时期'),
           ('Middle English', 'howe', '锄头', '中古英语时期')],
 'fa': '14 世纪中期进入英语（Etymonline：mid-14c.，经古法语 houe 借入）',
 'orig': '砍；劈',
 'path': [('砍；劈', '原始印欧语时期', ''),
          ('锄头', '现代', '工具以其动作得名：*hawwaną 是「砍、劈」，干这活的家伙在法兰克语里叫 *hauwā，经法语入英语——动作凝成工具名（以动作名器物）')],
 'mech': 'hoe 的名字来自它的动作：砍土、劈土的东西，就是锄头。',
 'link': '今天的意思「锄头」是从「砍」凝成的工具名，义在器物上落定。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {'hutch': 'trunk_divergent（主干复核后）：入英主干两说——Etymonline 与牛津作古法语 huche ← 中世纪拉丁语 hutica（来源未定）借入；Wiktionary 则作本土古英语 hwiċe「箱」一线，仅拼写受 huche 影响、且 huche 出自另一日耳曼词根 *hudjō；词本身出自哪条线未定，保持待核'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
