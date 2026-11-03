# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['village'] = {
 'chain': [('Latin', 'villa', '乡间庄园', '拉丁语时期'),
           ('Latin', 'villaticum', '农庄（带附属房舍）', '拉丁语时期'),
           ('Old French', 'vilage', '成群的房舍', '古法语时期'),
           ('Middle English', 'village', '村庄', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.）',
 'orig': '成群的房舍（农庄）',
 'path': [('成群的房舍（农庄）', '古法语时期', ''),
          ('村庄，村镇', '现代', '一座庄园带着附属房舍：房舍成群就是村。本土的 wic、þorp、ham 被它挤出日常，只活在地名后缀 -wick、-thorpe、-ham 里')],
 'mech': 'village 是「庄园的房舍群」：房子聚起来，就是村。',
 'link': '今天的意思「村庄」就是借入时的本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['vacation'] = {
 'chain': [('Latin', 'vacāre', '空着；得空', '拉丁语时期'),
           ('Latin', 'vacātiō', '免于职务的空闲', '拉丁语时期'),
           ('Old French', 'vacacion', '空缺；假期', '古法语时期'),
           ('Middle English', 'vacacioun', '假期', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「免于事务的自由」）',
 'orig': '免于职务的空闲',
 'path': [('免于职务的空闲', '拉丁语时期', ''),
          ('假期', '现代', 'vacāre 是「空出来」：公职免了、人空了，就是假期。15 世纪中期专指学校、法院的休止期；1878 年成为美语里 holiday 的对应词（由空闲到制度假期）')],
 'mech': 'vacation 是「空出来的日子」：活儿停了，人放假。',
 'link': '今天的意思「假期」从「免于职务」定型：空档成了假日。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['straight'] = {
 'chain': [('Proto-West Germanic', '*strakkjan', '拉伸', '原始西日耳曼语时期'),
           ('Old English', 'ġestreaht', '被拉伸的', '古英语时期'),
           ('Middle English', 'streight', '直的', '中古英语时期')],
 'fa': '14 世纪早期见载（Etymonline：early 14c.，义为「不弯曲的」）',
 'orig': '被拉直的',
 'path': [('被拉直的', '古英语时期', ''),
          ('笔直的；直接的', '现代', 'straight 本是 stretch 的过去分词：绳子拉紧了就是直的；再引申为道路「不绕弯」、为人「坦率」、说话「不打折扣」（由形到品的引申）')],
 'mech': 'straight 是「被拉紧的」：绳子一拉，就直了。',
 'link': '今天的意思「直的」就是本义「拉直的」，一路没变。',
 'disp': '部分义项与 strait「狭窄」（出拉丁语 strictus）合流，但两词并不同源（Wiktionary 明标 noncog），本档只记 stretch 一线。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['helmet'] = {
 'chain': [('Germanic', 'helm', '头盔', '日耳曼语时期'),
           ('Old French', 'heaumet', '小头盔', '古法语时期'),
           ('Middle English', 'helmet', '头盔', '中古英语时期')],
 'fa': '15 世纪中期见载（Etymonline：mid-15c.）',
 'orig': '小头盔',
 'path': [('小头盔', '古法语时期', ''),
          ('头盔，安全帽', '现代', 'helme 的指小形 heaumet 入英语作 helmet，反把本家 helm 挤成了专门词：小盔成了通名（指小形夺通名的反转）')],
 'mech': 'helmet 本是「小号的盔」：小的后来成了正名。',
 'link': '今天的意思「头盔」从指小形来：-et 已不表小，只表盔。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['tonight'] = {
 'chain': [('Old English', 'tō niht', '在今晚', '古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏同载 tō niht）',
 'orig': '在今晚',
 'path': [('在今晚', '古英语时期', ''),
          ('在今晚，今夜', '现代', 'to + night 的短语化石：一直写成两个词到 18 世纪，此后带连字符 to-night，直到 20 世纪初才合写（由短语到单词的凝固）')],
 'mech': 'tonight 是「to + night」粘成的：今晚，就是今晚。',
 'link': '今天的意思「今晚」就是短语本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['trip'] = {
 'chain': [('Middle Dutch', 'trippen', '轻跳；跺脚', '中古荷兰语时期'),
           ('Old French', 'triper', '跳跃；以脚击地', '古法语时期'),
           ('Middle English', 'trippen', '轻快踏步；跳舞', '中古英语时期')],
 'fa': '14 世纪晚期见载（Etymonline：late 14c. trippen，义为「轻盈踏步、跳舞」）',
 'orig': '轻快地踏步；跳舞',
 'path': [('轻快地踏步；跳舞', '中古英语时期', ''),
          ('旅行，旅程', '现代', '先有「脚步轻快地走」：15 世纪中叶生出「绊倒」义；名词的「旅程」义自轻快的短途步行引申——出去轻快地走一趟，就是 a trip（由步态到行程）')],
 'mech': 'trip 先是脚步声：轻快地走一趟，就是一次旅行。',
 'link': '今天的意思「旅行」从「轻快步行」引申：走法变成了行程。',
 'disp': '入英路径两说并存（法语 triper 与中古荷兰语直入），同出日耳曼语源头（牛津并记），主干一致。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['pilot'] = {
 'chain': [('Ancient Greek', 'πηδόν (pēdon)', '舵桨', '古希腊时期'),
           ('Medieval Greek', '*pedotes', '舵手', '中世纪希腊语时期'),
           ('Italian', 'piloto', '领航员', '意大利语时期'),
           ('French', 'pillote', '领航员', '法语近现代'),
           ('English', 'pilot', '飞行员', '1510 年代')],
 'fa': '1510 年代见载（Etymonline：1510s，义为「掌船的人」）',
 'orig': '掌舵者',
 'path': [('掌舵者', '1510 年代', ''),
          ('飞行员', '现代', '希腊语 pēdon 是「舵桨」：掌桨的人先领船进出港，1848 年领气球上天，1907 年领飞机——领航的活没变，换的是载具')],
 'mech': 'pilot 是「掌舵的人」：从船到气球到飞机，一直在领航。',
 'link': '今天的意思「飞行员」从「舵手」转来：舵换成了驾驶舱。',
 'disp': '意大利语里 -d- 变 -l-（pedoto → piloto）的音变属「萨宾式 -l-」现象（Etymonline 并注）；中世纪希腊语 *pedotes 为未见载构拟形。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['scientist'] = {
 'chain': [('Latin', 'scientia', '知识；科学', '拉丁语时期'),
           ('English', 'scientist', '科学家', '1834 年')],
 'fa': '1834 年 3 月造词（Etymonline 与 Wiktionary 同载：惠威尔 William Whewell 在《Quarterly Review》书评中造）',
 'orig': '从事科学的人',
 'path': [('从事科学的人', '1834 年', ''),
          ('科学家', '现代', '1834 年之前英语没有统称：philosophers 太宽太高，惠威尔仿 artist 的样子用拉丁词根 scientia + -ist 造出 scientist，同一段里还造了 physicist（有案可稽的个人造词）')],
 'mech': 'scientist 是 1834 年现造的：没有现成的词，就仿 artist 造一个。',
 'link': '今天的意思「科学家」就是造词时的定义，一路没变。',
 'disp': '1778 年有过孤例 sciencist，1885 年 scientician 亦曾行世，均未成气候（Etymonline 并记）。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
