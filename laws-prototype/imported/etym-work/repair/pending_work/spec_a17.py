# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['air'] = {
 'chain': [('Ancient Greek', 'ἀήρ (aḗr)', '雾气；下层大气', '古希腊时期'),
           ('Latin', 'āēr', '空气；下层大气', '拉丁语时期'),
           ('Old French', 'air', '大气；微风', '古法语时期'),
           ('Middle English', 'aire', '空气', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300，义为「环绕地球的无形气体」）',
 'orig': '雾气；下层大气',
 'path': [('雾气；下层大气', '古希腊时期', ''),
          ('空气，天空，大气', '现代', '荷马诗中多指「浓雾浊气」，后世作四大元素之一的「气」：入英语后顶替本土词 lyft。旧化学里 air 泛指任何气体（由雾气到空气）')],
 'mech': 'air 先是「雾」：看不见摸得着的那层气，后来才叫空气。',
 'link': '今天的意思「空气」从「下层浊气」澄清而来。',
 'disp': '希腊语词来源不明（Etymonline：of unknown origin），本档止于希腊语层；牛津另记「神态、曲调」诸义或出法语 air 的另一支（ager「田野」），与本词空气义不同支。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['present'] = {
 'chain': [('Proto-Indo-European', '*es-', '存在；是', '原始印欧语时期'),
           ('Latin', 'esse', '是；在', '拉丁语时期'),
           ('Latin', 'praeesse', '在前；在场', '拉丁语时期'),
           ('Latin', 'praesēns', '在场的；眼前的', '拉丁语时期'),
           ('Middle English', 'present', '现在的；礼物', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300，义为「与某人同处一地」）',
 'orig': '在眼前的；在场的',
 'path': [('在眼前的；在场的', '拉丁语时期', ''),
          ('现在的；出席的；礼物', '现代', 'prae-「在前」+ esse「是」：就在跟前。14 世纪「当下、此刻」义立（在场→当下）；「礼物」义自「呈献之物」——把东西呈到人跟前（由在场分化）')],
 'mech': 'present 是「就在跟前」：跟前的时间是现在，跟前的东西是礼物。',
 'link': '今天「现在/出席/礼物」三义同出一源：在眼前。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['paper'] = {
 'chain': [('Ancient Greek', 'πάπυρος (pápyros)', '纸莎草', '古希腊时期'),
           ('Latin', 'papȳrus', '纸莎草；纸', '拉丁语时期'),
           ('Old French', 'papier', '纸', '古法语时期'),
           ('Middle English', 'paper', '纸', '中古英语时期')],
 'fa': '14 世纪中期进入英语（Etymonline：mid-14c.，义为植物纤维压成的薄片）',
 'orig': '纸莎草；纸',
 'path': [('纸莎草；纸', '拉丁语时期', ''),
          ('纸', '现代', '植物名变材料名（莎草纸）：1640 年代「报纸」义（newspaper 缩略），1660 年代「论文」义（写在纸上的东西管起内容）（由材料到内容）')],
 'mech': 'paper 是「莎草」变来的纸：先有那种草，才有这种纸。',
 'link': '今天的意思「纸」就是本义，报纸与论文是它的转义。',
 'disp': '希腊语 pápyros 本身为外来词，常谓出埃及语（often said to be Egyptian），未确证。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['history'] = {
 'chain': [('Proto-Indo-European', '*weyd-', '看见；知道', '原始印欧语时期'),
           ('Ancient Greek', 'ἵστωρ (hístōr)', '知情者；智者', '古希腊时期'),
           ('Ancient Greek', 'ἱστορίᾱ (historíā)', '探究；叙述', '古希腊时期'),
           ('Latin', 'historia', '史事；叙述', '拉丁语时期'),
           ('Middle English', 'historie', '历史', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「事迹的叙述」，真伪不论）',
 'orig': '探究所得；叙述',
 'path': [('探究所得；叙述', '古希腊时期', ''),
          ('历史', '现代', '*weyd-「看」→「知」：hístōr 是「见过、懂的人」，historíā 是「打听来的学问」。中古英语里它与 story 不分家，15 世纪晚期「过去的记录」义定型（由探究到史学）')],
 'mech': 'history 是「打听出来的事」：问明白了，写下来，就是历史。',
 'link': '今天的意思「历史」从「探究的叙述」专业化而来。',
 'disp': '无已知争议（与 story 同源双式，见 story 条）',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['sentence'] = {
 'chain': [('Proto-Indo-European', '*sent-', '感觉', '原始印欧语时期'),
           ('Latin', 'sentīre', '感觉；认为', '拉丁语时期'),
           ('Latin', 'sententia', '见解；主张', '拉丁语时期'),
           ('Old French', 'sentence', '判决；见解', '古法语时期'),
           ('Middle English', 'sentence', '句子', '中古英语时期')],
 'fa': '约 1200 年进入英语（Etymonline：c. 1200，义为「教义；权威论断」）',
 'orig': '见解；主张',
 'path': [('见解；主张', '拉丁语时期', ''),
          ('句子', '现代', '从「心里的想法」出发三步走：权威的论断（c. 1200）→ 法庭的判决（14 世纪早期）→ 语法上完整的话（15 世纪中期）（由想法到成句）')],
 'mech': 'sentence 先是「脑子里的主张」：说出口成判决，写下来成句子。',
 'link': '今天的意思「句子」是三步转义的终点。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['story'] = {
 'chain': [('Ancient Greek', 'ἱστορίᾱ (historíā)', '探究；叙述', '古希腊时期'),
           ('Latin', 'historia', '史事；叙述', '拉丁语时期'),
           ('Late Latin', 'storia', '故事', '晚期拉丁语时期'),
           ('Old French', 'estoire', '史事；故事', '古法语时期'),
           ('Middle English', 'storie', '故事', '中古英语时期')],
 'fa': '约 1200 年进入英语（Etymonline：c. 1200，义为「往昔要人要事的叙述」）',
 'orig': '史事叙述',
 'path': [('史事叙述', '古法语时期', ''),
          ('故事', '现代', 'historia 的缩略形（首音脱落）：与 history 是同一词的两条路——story 走口语、history 走书面。初义就是「历史」，约 1500 年「虚构故事」义才定型（由史事到虚构）')],
 'mech': 'story 是 history 的口语版：讲着讲着，史事变成了故事。',
 'link': '今天的意思「故事」从「历史叙述」分化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['page'] = {
 'chain': [('Proto-Indo-European', '*peh₂ǵ-', '固定；系牢', '原始印欧语时期'),
           ('Latin', 'pangere', '钉牢；固定', '拉丁语时期'),
           ('Latin', 'pāgina', '订合的纸页', '拉丁语时期'),
           ('French', 'page', '页', '法语近现代'),
           ('English', 'page', '页码', '1580 年代')],
 'fa': '1580 年代见载（Etymonline：1580s，义为书页的一面；更早 pagine 约 1200 年）',
 'orig': '订合的纸页',
 'path': [('订合的纸页', '拉丁语时期', ''),
          ('页码', '现代', '通说：纸页被「钉、订」在一起成册，单页就叫 pāgina；卷轴换成册子后词沿用至今（由订合到页）')],
 'mech': 'page 是「订起来的一张」：没有装订，就没有页。',
 'link': '今天的意思「页」就是本义，一路没变。',
 'disp': '另一说（Ayto、Watkins）：葡萄藤在架上成列 → 卷轴上的字行列，未决；同形词 page「侍童」另有来源（牛津：或出意大利语 paggio），非本词。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['chalk'] = {
 'chain': [('Ancient Greek', 'χάλιξ (khálix)', '小石子', '古希腊时期'),
           ('Latin', 'calx', '石灰石；石灰', '拉丁语时期'),
           ('Proto-West Germanic', '*kalk', '石灰', '原始西日耳曼语时期'),
           ('Old English', 'ċealc', '粉笔（白垩）', '古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：cealc，义为「白垩、石灰、石膏、小石」）',
 'orig': '石灰石；石灰',
 'path': [('石灰石；石灰', '拉丁语时期', ''),
          ('粉笔', '现代', '很早的借词（日耳曼语亲属至今多作「石灰」解）：英格兰南部遍地是那种松软的白垩，英语把词专给了它（由石灰石到白垩）')],
 'mech': 'chalk 是「石灰」落地英格兰：满岛的白石头，让它改了行。',
 'link': '今天的意思「粉笔（白垩）」是石灰在英的特化。',
 'disp': 'khálix 更深的来历无定论（Beekes：no convincing etymology），本档止于希腊语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
