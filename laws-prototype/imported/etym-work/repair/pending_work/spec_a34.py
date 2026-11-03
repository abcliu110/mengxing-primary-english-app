# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['audible'] = {
 'chain': [('Proto-Indo-European', '*h₂ew-', '感知', '原始印欧语时期'),
           ('Latin', 'audīre', '听', '拉丁语时期'),
           ('Medieval Latin', 'audibilis', '可听见的', '中世纪拉丁语时期'),
           ('English', 'audible', '听得见的', '1520 年代')],
 'fa': '1520 年代见载（Etymonline：1520s，义为「能被听见的」）',
 'orig': '可听见的',
 'path': [('可听见的', '中世纪拉丁语时期', ''),
          ('听得见的', '现代', 'audīre「听」的学理形容词：借词守恒（借词守恒）')],
 'mech': 'audible 是「耳朵够得着的」：声音到了耳边，就是它。',
 'link': '今天的意思「听得见」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['author'] = {
 'chain': [('Proto-Indo-European', '*h₂ewg-', '增加', '原始印欧语时期'),
           ('Latin', 'augēre', '增加；创始', '拉丁语时期'),
           ('Latin', 'auctor', '促生者；创作者', '拉丁语时期'),
           ('Middle English', 'auctour', '作者', '中古英语时期')],
 'fa': '14 世纪中期进入英语（Etymonline：mid-14c.，义为「父亲、创造者、使事成者」）',
 'orig': '促生者；创作者',
 'path': [('促生者；创作者', '拉丁语时期', ''),
          ('作者；作家', '现代', '词源义是「使之生长的人」（augēre「增大」的施事名词）：14 世纪晚期「著述者」义立，与「权威」义同居一词（author 与 authority 至今同枝）（由促生到著述）')],
 'mech': 'author 是「让东西长出来的人」：书，也是种出来的。',
 'link': '今天的意思「作者」从「创始者」专业化而来。',
 'disp': '无已知争议',
 'folk': '拼写 th 非词源成分：15 世纪受 authentic 污染而加（OED，两家并记），拉丁语原形无 h', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['ballet'] = {
 'chain': [('Ancient Greek', 'βαλλίζειν (ballízein)', '跳舞', '古希腊时期'),
           ('Late Latin', 'ballāre', '跳舞', '晚期拉丁语时期'),
           ('Italian', 'ballo', '舞', '意大利语时期'),
           ('Italian', 'balletto', '小舞', '意大利语时期'),
           ('English', 'ballet', '芭蕾舞', '1660 年代')],
 'fa': '1660 年代见载（Etymonline：1660s）',
 'orig': '小舞（曲）',
 'path': [('小舞（曲）', '意大利语时期', ''),
          ('芭蕾舞', '现代', 'balletto 是 ballo「舞」的指小形：借道法语入英时已专指宫廷舞台舞剧（借词守恒）')],
 'mech': 'ballet 是「小舞蹈」：小字辈的舞，跳成了大舞台。',
 'link': '今天的意思「芭蕾」就是借入时的专名义。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['beat'] = {
 'chain': [('Proto-Indo-European', '*bhau-', '击打', '原始印欧语时期'),
           ('Proto-Germanic', '*bautaną', '推；击', '原始日耳曼语时期'),
           ('Old English', 'bēatan', '击打', '古英语时期'),
           ('Middle English', 'beten', '击打；击败', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：bēatan，Ⅶ 类强变化动词）',
 'orig': '击打',
 'path': [('击打', '古英语时期', ''),
          ('击打；击败', '现代', '约 1200 年心脏「撞击胸腔」义；1610 年代「在竞赛中胜过」义——打赢了，就是击败（由打到赢）')],
 'mech': 'beat 是「打」：打在身上是击打，打赢了是击败。',
 'link': '今天的意思「击败」从「打」转化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['believe'] = {
 'chain': [('Proto-Indo-European', '*leubh-', '珍爱；在意', '原始印欧语时期'),
           ('Proto-Germanic', '*galaubijaną', '持有信心', '原始日耳曼语时期'),
           ('Old English', 'ġelīefan', '相信', '古英语时期'),
           ('Middle English', 'beleven', '相信', '中古英语时期')],
 'fa': '古英语晚期就已经有了（牛津：late OE belyfan）',
 'orig': '持有信心（珍视而信）',
 'path': [('持有信心（珍视而信）', '古英语时期', ''),
          ('相信；信任', '现代', 'Etymonline 谓其字面或是「视若珍宝」（*leubh-「爱」）：先是对人有信心，13 世纪中期「认定为真」义立（由珍信到认信）')],
 'mech': 'believe 是「放在心上」：珍重的东西，才肯信。',
 'link': '今天的意思「相信」就是本义的理性化。',
 'disp': '「视若珍宝」的字面解作 perhaps（Etymonline），日耳曼语层无争议。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['bilingual'] = {
 'chain': [('Latin', 'lingua', '舌头；语言', '拉丁语时期'),
           ('Latin', 'bilinguis', '双舌的', '拉丁语时期'),
           ('English', 'bilingual', '双语的', '1818 年')],
 'fa': '1818 年见载（Etymonline：1818，义为「能说两种语言的」）',
 'orig': '双舌的',
 'path': [('双舌的', '拉丁语时期', ''),
          ('能用两种语言的；双语的', '现代', 'bi-「双」+ lingua「舌/语言」：拉丁语里此词还骂人「两面派、口是心非」，英语 1818 年只取了中性的技术义（由双舌到双语）')],
 'mech': 'bilingual 是「两条舌头」：古人拿它骂人，今人拿它夸人。',
 'link': '今天的意思「双语的」是拉丁老词的中性化新用。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}

R = {
 'bachelor': 'trunk_unsettled（主干复核后）：「a word of uncertain origin」（Etymonline、牛津一致）。三候选并立无定论：中世纪拉丁语 baccalarius「无地佃农」（或出 vacca「牛」，Kitchin 说）、baculum「棍棒」（侍从练棍说）、凯尔特语源说（Wedgwood）；Century Dictionary 谓或为数词混同，保持待核',
 'beige': 'origin_unknown（主干复核后）：古法语 bege「未染色羊毛与棉的本色」（13 世纪）两家一致，但终极来源未明（牛津：of unknown ultimate origin；Etymonline：of obscure origin）；Wiktionary 阿尔卑斯语源经 *bysseus「棉灰」一线为推测链，不足作主干，保持待核',
}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
