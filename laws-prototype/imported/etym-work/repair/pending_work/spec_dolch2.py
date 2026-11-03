# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['use'] = {
 'chain': [('Latin', 'ūsus', '使用（兼指习惯、熟练）', '古典拉丁时期'),
           ('Old French', 'us', '使用', '古法语时期'),
           ('Middle English', 'use', '使用', '中古英语时期')],
 'fa': '约 1200 年（动词 usen 见载，Etymonline 词条原文记作 c. 1200）',
 'orig': '使用（兼指习惯、熟练）',
 'path': [('使用（兼指习惯、熟练）', '古典拉丁时期', ''),
          ('使用；用途', '现代', '主干义一路没变：经法语进英语后，名词管「使用；用途」，动词管「用」；另由「习惯于用」生出 used to「过去常常」的语法用法——词义没动，多了个语法职务（功能引申）')],
 'mech': 'use 从拉丁语 ūsus 一路直传：意思就是「使用」，两千年没拐弯。',
 'link': '今天的意思「使用」就是最早的意思，没变过。',
 'disp': '拉丁语动词 ūti（ūsus 是它的名词形）本身来源未定，Etymonline 明言 a word of uncertain origin；本档来源链止于拉丁语。古拉丁语另有词形 oeti。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['kind'] = {
 'chain': [('Proto-Indo-European', '*ǵenh₁-', '生育；产生', '原始印欧语时期'),
           ('Proto-Germanic', '*kinþiz', '家族；种族', '原始日耳曼语时期'),
           ('Old English', 'ġecynd', '本性；种族', '古英语时期'),
           ('Middle English', 'kynde', '种类；本性', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 gecynd 起头）',
 'orig': '本性；种族',
 'path': [('本性；种族', '古英语时期', ''),
          ('种类', '中古英语时期', 'ġecynd 先指与生俱来的本性和出身（种族、家族），再转指「按天生特征分出的类别」——从特征本身转到按特征分成的类（转喻）'),
          ('慈祥的；友好的', '现代', '形容词一支从「合乎本性、自然得体」转出「天性善良、待人温和」：生性好，就对人好（词义引申，带感情色彩）')],
 'mech': 'kind 的老根是「生」：生出来的同族先叫「种族、本性」，按本性分堆就成了「种类」，天性好又转出「慈祥」。',
 'link': '今天的两个意思都从「本性；种族」来：按本性分类是「种类」，本性善良是「慈祥」——翻语义路径才看得出它们是同一个词。',
 'disp': '原始日耳曼语词形，Wiktionary 作 *kinþiz，Etymonline 作 *kundjaz，同根异构，不影响主干；前缀 ge- 于 1150–1250 年间脱落（Etymonline）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['myself'] = {
 'chain': [('Old English', 'mē self', '我（加本身）', '古英语时期'),
           ('Middle English', 'meself', '我自己', '中古英语时期')],
 'fa': '约 1200 年（meself 见载；myself 形式约 1500 年出现）',
 'orig': '我（加本身）',
 'path': [('我（加本身）', '古英语时期', ''),
          ('我自己', '现代', '短语 (ic) me self「我-本身」粘合成 meself；约 1500 年前件受 herself 的影响，由宾格 me 类推成属格 my，成 myself——短语凝固成词，中间还经历了一次类推改形（词汇化＋类推）')],
 'mech': 'myself 是把「我 + 本身」这个短语粘成一个词，粘的时候还把 me 顺手改成了 my。',
 'link': '今天的意思「我自己」就是最早短语「我加本身」的意思，粘合后没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['draw'] = {
 'chain': [('Proto-Germanic', '*draganą', '拉；拖；搬运', '原始日耳曼语时期'),
           ('Old English', 'dragan', '拉；拖', '古英语时期'),
           ('Middle English', 'drauen', '拉', '中古英语时期')],
 'fa': '约 1200 年（词形 drauen 见载，Etymonline 记作 c. 1200；其古英语祖先 dragan 更早已有）',
 'orig': '拉；拖',
 'path': [('拉；拖', '古英语时期', ''),
          ('画', '约 1200 年起', '拉着笔尖在纸上拖出线条——「拖笔」这个动作就成了「画」：动作转指用这个动作做出的事（转喻）'),
          ('吸引', '16 世纪后期起', '把人群朝自己「拉」过来，就是吸引——看不见的拉力也叫 draw（比喻）')],
 'mech': 'draw 的老本行是「拉」：拉着笔画出线是「画」，把人拉向自己是「吸引」。',
 'link': '今天的「画；吸引」都从「拉」来：拉笔是画，拉人是吸引——翻语义路径才知道是同一个词。',
 'disp': '印欧层未定论：常说源于 *dʰregʰ-「拉」，Wiktionary 指出也可能是前印欧底层词（与拉丁语 trahō 或同源）；两源一致到原始日耳曼语 *draganą 为止，本档链止于该层。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk', 'ox'], 'grade': 'et_wk_ox'}
S['hurt'] = {
 'chain': [('Old French', 'hurter', '撞；冲撞', '古法语时期'),
           ('Middle English', 'hurten', '撞；使受伤', '中古英语时期')],
 'fa': '约 1200 年（Etymonline 词条原文记作 c. 1200）',
 'orig': '撞；冲撞',
 'path': [('撞；冲撞', '古法语时期', ''),
          ('使受伤；伤害', '约 1200 年起', '英语一借进来就兼指撞出的后果：从「撞」这个动作转到「撞伤」（转喻：动作转指结果）'),
          ('疼痛；受伤', '现代', '约 1902 年起不及物用法稳固：伤处自己「疼」——感受疼痛的人成了句子主语（主语转移）')],
 'mech': 'hurt 先是「撞」：撞了就会受伤，受伤的地方会疼——词义顺着「撞→伤→疼」一路滑下来。',
 'link': '今天的意思「疼痛；受伤」是从「撞」转来的：撞是因，疼是果，翻语义路径才看得出。',
 'disp': '古法语 hurter 本身来源未定：Etymonline 与 Wiktionary 倾向法兰克语 *hūrt「攻城槌」（与威尔士语 hwrdd「公羊」同源），凯尔特来源说亦有人提；另有说法认为中古英语词可能出自未见载的古英语 *hyrtan。三家一致到古法语 hurter 为止，本档链止于该站。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['drink'] = {
 'chain': [('Proto-Germanic', '*drinkaną', '喝', '原始日耳曼语时期'),
           ('Old English', 'drincan', '喝；吞下', '古英语时期'),
           ('Middle English', 'drynken', '喝', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 词条以古英语 drincan 起头）',
 'orig': '喝；吞下',
 'path': [('喝；吞下', '古英语时期', ''),
          ('喝', '现代', '古英语 drincan 还管「吞没、淹没」（水把东西吞下去），现代收窄到「把液体喝下去」（词义专化）；名词「饮料」古英语晚期已有')],
 'mech': 'drink 本是「吞」：把水吞下去是喝，把东西吞没也是它，后来专管喝这一件事。',
 'link': '今天的意思「喝」是从「喝；吞下」收窄来的，吞没的那一支退出了日常。',
 'disp': '原始日耳曼语 *drinkaną 的更深来源两源都标未定：或与印欧 *dʰrenǵ-「吸入嘴里、啜饮」有关（Wiktionary），Etymonline 亦只说 perhaps from a root meaning "to draw"，本档链止于原始日耳曼语。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk', 'ox'], 'grade': 'et_wk_ox'}
S['stop'] = {
 'chain': [('Proto-Germanic', '*stuppōną', '堵住；塞住', '原始日耳曼语时期'),
           ('Old English', 'stoppian', '堵住；塞住', '古英语时期'),
           ('Middle English', 'stoppen', '堵住', '中古英语时期')],
 'fa': '中古英语时期见载（动词 stoppen；古英语有 forstoppian「堵住」一词）',
 'orig': '堵住；塞住',
 'path': [('堵住；塞住', '古英语时期', ''),
          ('停下；停止', '15 世纪起', '从「把通道堵住」转到「让运动停下来」：路堵了，人就得停——使不能通过，转成使停下（转喻）')],
 'mech': 'stop 先是「堵」：口子堵上、水堵住，后来凡是让东西动不了、进行不下去，都叫 stop。',
 'link': '今天的意思「停下」是从「堵住」转来的：堵住所以停下，翻语义路径才看得出。',
 'disp': '最深层来源两说：多家（牛津从之）认为日耳曼语借自通俗拉丁语 *stuppare「用麻絮塞住」（源头是拉丁语 stuppa「麻絮」）；Barnhart 等主张日耳曼本土词根，Wiktionary 则上溯印欧 *(s)tewp-「推、戳」。三家一致到西日耳曼语一层，本档链止于原始日耳曼语并登记两说。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk', 'ox'], 'grade': 'et_wk_ox'}
S['round'] = {
 'chain': [('Latin', 'rotundus', '圆的；环形的', '古典拉丁时期'),
           ('Vulgar Latin', '*retundus', '圆的', '通俗拉丁语时期'),
           ('Old French', 'roont', '圆的', '古法语时期'),
           ('Middle English', 'round', '圆的', '中古英语时期')],
 'fa': '约 1300 年（Etymonline 词条原文记作 c. 1300）',
 'orig': '圆的；环形的',
 'path': [('圆的；环形的', '古典拉丁时期', ''),
          ('圆的', '现代', '词义一路稳定：rotundus 本从 rota「车轮」派生，「像车轮一样圆」；经法语进英语后仍指圆，14 世纪中又由「圆满无缺」引申出「（数字）完整的、整数的」一支')],
 'mech': 'round 的老祖宗是「车轮」：像轮子一样的东西，就是圆的。',
 'link': '今天的意思「圆的」就是最早的意思，一路没变。',
 'disp': '通俗拉丁语词形，Wiktionary 作 retundus，Etymonline 作 *retundus（同由 rotundus 变来），记法异而所指同。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
