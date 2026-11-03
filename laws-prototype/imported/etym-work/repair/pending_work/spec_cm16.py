# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['frog'] = {
 'chain': [('Proto-West Germanic', '*froggō', '青蛙', '原始西日耳曼语时期'),
           ('Old English', 'frocga', '青蛙', '古英语时期'),
           ('Middle English', 'frogge', '青蛙', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：frogga，frosc 的指小形）',
 'orig': '青蛙',
 'path': [('青蛙', '古英语时期', ''),
          ('青蛙', '现代', '日耳曼语共有的蛙名，各语构形不一：英语取 frosc 的指小形 frogga 一支，本土别形 frosk 在方言里活到 19 世纪')],
 'mech': 'frog 是「小青蛙」出身：frosc 加了指小尾，成了正名。',
 'link': '今天的意思「青蛙」就是本义，一路没变。',
 'disp': '或谓本义「跳者」，出印欧语 *preu-「跳」（Etymonline 作 probably）；-gga 后缀 Watkins 称为「费解的表义后缀」，未定论，本档止于日耳曼语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['wolf'] = {
 'chain': [('Proto-Indo-European', '*wĺ̥kʷos', '狼', '原始印欧语时期'),
           ('Proto-Germanic', '*wulfaz', '狼', '原始日耳曼语时期'),
           ('Old English', 'wulf', '狼', '古英语时期'),
           ('Middle English', 'wolf', '狼', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏同载 wulf）',
 'orig': '狼',
 'path': [('狼', '古英语时期', ''),
          ('狼', '现代', '词义从未变：从梵语 vṛka 到拉丁语 lupus、希腊语 lykos，全家都指狼；复数 f 变 v（wolves）是古英语浊化规则的存续')],
 'mech': 'wolf 是印欧语的老兽名：一大家子语言都拿它指狼。',
 'link': '今天的意思「狼」就是最早的意思，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['sea'] = {
 'chain': [('Proto-Germanic', '*saiwiz', '水域（湖；海）', '原始日耳曼语时期'),
           ('Old English', 'sǣ', '海；湖', '古英语时期'),
           ('Middle English', 'see', '海', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏同载 sǣ）',
 'orig': '水域（海；湖）',
 'path': [('水域（海；湖）', '古英语时期', ''),
          ('海，大海，海洋', '现代', '日耳曼语各语里此词海湖不分（德语 See 阴性为海、阳性为湖）：波罗的海周边水网纵横，海与湖本是一家；英语定在「海」上')],
 'mech': 'sea 是「一大片水」：海也行，湖也行，英语选了海。',
 'link': '今天的意思「海」是古义定型的一半：古时海湖同名。',
 'disp': '日耳曼语以外的来源「全然可疑」（Buck 语）；印欧词源被 Boutkan 质疑，两家深层说法（*sh₂ey-「猛烈」与 *seykʷ-「渗滤」）均未定论，本档止于日耳曼语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['city'] = {
 'chain': [('Proto-Indo-European', '*ḱey-', '躺下；定居', '原始印欧语时期'),
           ('Latin', 'cīvis', '市民', '拉丁语时期'),
           ('Latin', 'cīvitās', '公民身份；公民共同体', '拉丁语时期'),
           ('Old French', 'citet', '城镇', '古法语时期'),
           ('Middle English', 'cite', '城市', '中古英语时期')],
 'fa': '约 1200 年进入英语（Etymonline：c. 1200，经古法语 cite）',
 'orig': '公民身份；公民共同体',
 'path': [('公民身份；公民共同体', '拉丁语时期', ''),
          ('城市，都市', '现代', '老根是「躺下安家」：cīvitās 先指「当市民的资格」，再指「市民这个群体」，入英语时意义从人转到地——拉丁语的「城」本是 urbs，cīvitās 顶了它的位（由人到地的转移）')],
 'mech': 'city 先是「一城的人」：人聚成社群，社群住的地方才叫 city。',
 'link': '今天的意思「城市」从「公民共同体」转来：先有人，后有城。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['bank'] = {
 'chain': [('Proto-Germanic', '*bankiz', '长凳；台子', '原始日耳曼语时期'),
           ('Italian', 'banca', '兑换商的台子', '意大利语时期'),
           ('French', 'banque', '银行', '法语近现代'),
           ('Middle English', 'banke', '银行；河岸', '中古英语时期')],
 'fa': '河岸义中古英语时期已有（出古诺斯语 bakki）；银行义 15 世纪晚期（Etymonline）',
 'orig': '长凳；台子',
 'path': [('长凳；台子', '原始日耳曼语时期', ''),
          ('银行；河岸，岸边', '现代', '同根两路：长凳是「凸起的长条」——北欧语 bakki 指土坡，给了「河岸」；意大利兑换商在长台上摆钱摊，banca 经法语给了「银行」。与 bench 是同源双式（由家具到两义）')],
 'mech': 'bank 是「长条台子」：土的长条是河岸，摆钱的长条是银行。',
 'link': '今天的意思「银行；河岸」同出一根：一张长凳，两个去向。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['club'] = {
 'chain': [('Proto-Germanic', '*klumpô', '块；团', '原始日耳曼语时期'),
           ('Old Norse', 'klubba', '大棒', '古诺斯语时期'),
           ('Middle English', 'clubbe', '俱乐部', '中古英语时期')],
 'fa': '约 1200 年见载（Etymonline：c. 1200，义为「大棒」）',
 'orig': '大棒',
 'path': [('大棒', '约 1200 年', ''),
          ('俱乐部，社团', '现代', '与 clump「团块」同根：先是一根粗棒；1620 年代动词生「聚成一团」，1640 年代名词转指「聚在一起的人」，1660 年代定型为社交俱乐部（由棒到团到社团）')],
 'mech': 'club 是「聚成一团」：棒是团块，人聚起来也是团块。',
 'link': '今天的意思「俱乐部」从「大棒」绕道「团块」而来：聚，就是 club。',
 'disp': '牛津将社团义系于动词 club 的引申、谓其形成「不甚明朗」（formed obscurely），本档从 Etymonline 的「聚成团」演变线。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {
 'rock': 'trunk_unsettled（主干复核后）：中古英语 rokke 为古英语 *rocc（仅见于复合词 stānrocc，属构拟）与古北法语 roche 的合流；法语一线出中世纪拉丁语 rocca（767 年见载），其终极来源未定（凯尔特语说与通俗拉丁语 *rupica 说并存，后者音形不合），牛津明标 of unknown ultimate origin，保持待核',
 'flag': 'origin_unknown（主干复核后）：牛津与 Etymonline 均标来源未定（OED 谓或为拟声的「飘动」造词，亦有接日耳曼语 *flaką「扁平物」说），无可互证主干，保持待核',
}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
