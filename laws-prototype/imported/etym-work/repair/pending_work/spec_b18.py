# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['interest'] = {
 'chain': [('Proto-Indo-European', '*h₁es-', '是；在', '原始印欧语时期'),
           ('Latin', 'esse', '是', '拉丁语时期'),
           ('Latin', 'interesse', '在其间；事关重大', '拉丁语时期'),
           ('Medieval Latin', 'interesse', '损失补偿', '中世纪拉丁语时期'),
           ('Middle English', 'interest', '权益', '中古英语时期')],
 'fa': '15 世纪中期见载（Etymonline：mid-15c.，义为「法律上的主张或权利；利害」；早形 interesse 为 14 世纪末）',
 'orig': '事关重大（身在其间）',
 'path': [('事关重大（身在其间）', '拉丁语时期', ''),
          ('兴趣；利息', '现代', 'inter「之间」+ esse「是」：interest 本是动词「（它）事关重大」；金融义 1520 年代，初指违约欠债者的「赔偿」，以别于教会法所禁的 usury「高利贷」；「好奇心」义 18 世纪才生（由利害到兴趣）')],
 'mech': 'interest 是「关我的事」：关钱的是利息，关心的是兴趣。',
 'link': '今天的两义（利息、兴趣）是同一「利害」根上后分出的。',
 'disp': '由「利害」到「利益」的确切语义路径，Etymonline 谓 not entirely clear，登记在案。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['karma'] = {
 'chain': [('Proto-Indo-European', '*kʷer-', '做；形成', '原始印欧语时期'),
           ('Sanskrit', 'kárman', '行为；业', '梵语时期'),
           ('English', 'karma', '业力', '1785 年')],
 'fa': '1785 年见载（Wiktionary：1785，威尔金斯英译《薄伽梵歌》）',
 'orig': '行为；业',
 'path': [('行为；业', '梵语时期', ''),
          ('因果报应；业力', '现代', '词根是「做」：所作所为的总和决定来世之形（1800 年印学语境的定义）；后被西方流行冥想圈层广泛采用（借词守恒）')],
 'mech': 'karma 的底子是「做」：做过什么，就成为什么。',
 'link': '今天的意思「业力」就是本义。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['kowtow'] = {
 'chain': [('Chinese', '叩頭 (kòutóu)', '磕头', '汉语时期'),
           ('English', 'kowtow', '磕头', '1804 年')],
 'fa': '1804 年见载（Etymonline：1804，自汉语 k\'o-t\'ou)',
 'orig': '磕头（叩：敲；头：首）',
 'path': [('磕头（叩：敲；头：首）', '汉语时期', ''),
          ('磕头；卑躬屈膝', '现代', '直译入英的礼名：跪而额触地以示敬服；后喻义「谄媚顺从」由礼生（借词守恒）')],
 'mech': 'kowtow 是「拿头敲地」：汉语的动作，被英语整词搬走。',
 'link': '今天的意思「磕头；卑躬屈膝」礼仪义与喻义并存。',
 'disp': '借自粤语还是官话，两说并存（Wiktionary)，不碍主干。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['ladder'] = {
 'chain': [('Proto-Indo-European', '*ḱley-', '倚靠', '原始印欧语时期'),
           ('Proto-Germanic', '*hlaidrijō', '梯子', '原始日耳曼语时期'),
           ('Old English', 'hlǣder', '梯子', '古英语时期'),
           ('Middle English', 'laddere', '梯子', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE hlæder，义为「梯子、台阶」）',
 'orig': '倚靠之具',
 'path': [('倚靠之具', '原始印欧语时期', ''),
          ('梯子；阶梯', '现代', '词根是「倚」：梯子是斜倚着墙的东西（希腊语 klimax「梯」同根，climax「高潮」是它的远房）；古英语晚期已喻「晋升之阶」（由倚墙到晋升）')],
 'mech': 'ladder 是「倚墙的」：它的名字就是它的用法。',
 'link': '今天的意思「梯子」就是本义。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['lay'] = {
 'chain': [('Proto-Indo-European', '*legʰ-', '躺', '原始印欧语时期'),
           ('Proto-Germanic', '*ligjaną', '躺', '原始日耳曼语时期'),
           ('Proto-Germanic', '*lagjaną', '使躺', '原始日耳曼语时期'),
           ('Old English', 'leċġan', '放；使躺', '古英语时期')],
 'fa': '古英语见载（Etymonline：OE lecgan，义为「放到地上；有序地放」）',
 'orig': '使躺；放',
 'path': [('使躺；放', '原始日耳曼语时期', ''),
          ('放；lay（使躺）', '现代', '使役形变：lay 是 lie「躺」的使役式（「使之躺」），与 fall/fell 同一机制——学习者最头疼的 lie/lay 之分，是一对一千多岁的使役双生子（形变记录）')],
 'mech': 'lay 是「让它躺下」：lie 自己躺，lay 使它躺。',
 'link': '今天的意思「放、置」就是本义（lay an egg、lay a bet 古英语已有）。',
 'disp': '无已知争议（注：俗语 lay 作 lie 的过去式是后世混同，非本词源）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['logic'] = {
 'chain': [('Proto-Indo-European', '*leǵ-', '收集；言说', '原始印欧语时期'),
           ('Ancient Greek', 'lógos', '言辞；理性', '古希腊时期'),
           ('Ancient Greek', 'logikē', '推理之艺', '古希腊时期'),
           ('Middle English', 'logike', '逻辑学', '中古英语时期')],
 'fa': '14 世纪中期进入英语（Etymonline：mid-14c., logike，义为「研究思维形式的哲学分支」）',
 'orig': '推理之艺',
 'path': [('推理之艺', '古希腊时期', ''),
          ('逻辑；逻辑学', '现代', 'lógos 一词兼「话」与「理」：logikē (tekhnē）直译「（关于）言说的（技艺）」——讲理先是讲话的艺术（借词守恒）')],
 'mech': 'logic 的根是 lógos：既是「话」，也是「理」——会说，才讲得清。',
 'link': '今天的意思「逻辑」就是本义。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['marry'] = {
 'chain': [('Latin', 'marītus', '丈夫；已婚男子', '拉丁语时期'),
           ('Latin', 'marītāre', '嫁娶；使成婚', '拉丁语时期'),
           ('Old French', 'marier', '结婚；嫁娶', '古法语时期'),
           ('Middle English', 'marien', '结婚', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300, marien，义为「（父母等）使（子女）成婚；进入婚姻状态」）',
 'orig': '（使成为）丈夫；成婚',
 'path': [('（使成为）丈夫；成婚', '拉丁语时期', ''),
          ('结婚；嫁；娶', '现代', 'marītus 或出印欧语 *mari-「年轻女子」一线（「给（男子）配一个 mari」之说）：梵语 márya「求婚者、青年」、威尔士语 morwyn「少女」同族；它顶替了本族词 hīwian（由丈夫到结婚）')],
 'mech': 'marry 的根上站着「丈夫」：先有成婚的人，后有成婚的事。',
 'link': '今天的意思「结婚」就是本义（主婚者「使成婚」义 1520 年代）。',
 'disp': 'marītus 本身 of uncertain origin（Etymonline/Wiktionary)：*mari 说作 perhaps/possibly，本档主干立于拉丁语并登记。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['mess'] = {
 'chain': [('Latin', 'mittere', '送；放', '拉丁语时期'),
           ('Late Latin', 'missus', '（桌上）摆好的一道菜', '晚期拉丁语时期'),
           ('Old French', 'mes', '一份食物', '古法语时期'),
           ('Middle English', 'mes', '一份食物', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300，义为「一顿饭的食物供给」）',
 'orig': '一份食物（一道菜）',
 'path': [('一份食物（一道菜）', '晚期拉丁语时期', ''),
          ('混乱；脏乱', '现代', '义烂如泥：mes 先是「一道菜」，后指「同桌吃饭的一伙人（原为四人）」(1530 年代食堂义由此），1738 年「给牲口的杂拌饲料」，1828 年「乱七八糟的一堆」，1834 年「混乱局面」（由食物到脏乱）')],
 'mech': 'mess 是从饭桌上烂下来的：菜拌成饲料，饲料烂成了一团糟。',
 'link': '今天的意思「脏乱」与食堂义 mess hall 并存，各表一枝。',
 'disp': 'Wiktionary 另记「糊状物」一义或为 mesh「捣碎」的讹变，与食物主线分列登记。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['microphone'] = {
 'chain': [('Proto-Indo-European', '*bʰeh₂-', '说话', '原始印欧语时期'),
           ('Ancient Greek', 'phōnē', '声音', '古希腊时期'),
           ('Ancient Greek', 'mikros', '小的', '古希腊时期'),
           ('English', 'microphone', '扩声器', '1680 年代')],
 'fa': '1680 年代见载（Etymonline：1680s，义为「供听力不佳者用的耳喇叭」）',
 'orig': '扩小声之器',
 'path': [('扩小声之器', '1680 年代', ''),
          ('麦克风，话筒', '现代', '学造词：micro-「小」+ phone「声」——造来指「把小声音放大」的助听喇叭；1878 年转指扩音电话送话器，1924 年定型为电声转换器；截短 mike (1924）比 mic (1961）还老（学造词）')],
 'mech': 'microphone 出生时是助听器：放大「小」声音的，正是它名字的本义。',
 'link': '今天的意思「话筒」是同一功能（放大声音）的电气化。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}

R = {
 'kill': 'trunk_unsettled（主干复核后）：约 1200 年「击打」、约 1300 年「杀死」；来源三拟并立——未载的古英语 *cyllan（出日耳曼语 *kwuljaną ← 印欧语 *gʷelH-「投掷伤人」)、古英语 cwellan「处死」的变体（quell 一线，牛津/Etymonline 所主但作 probably/perhaps)、古诺斯语 kolla「击头」；无两家确立的同一主干，保持待核',
 'kingly': 'compositional（主干复核后）：king + -ly 透明派生（古英语 *cyninglīċ 已有同构词），现代词义由构词直接可读、无历史漂移；词源叙事在 king 本词，待核保持',
 'koi': 'evidence_gap（主干复核后）：1727 年借自日语 鯉 koi「鲤鱼」，两家缓存仅有此一线记录，原始义项编年与字段无从填实（汉字 鯉 的语源不在缓存内）；按不降格建档原则保持待核',
}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
