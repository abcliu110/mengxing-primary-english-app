# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['expensive'] = {
 'chain': [('Latin', 'expendere', '称量付出（钱）', '拉丁语时期'),
           ('English', 'expensive', '花钱大方的', '1620 年代')],
 'fa': '1620 年代见载（Etymonline：1620s，义为「花钱豪爽的」）',
 'orig': '花钱大方的',
 'path': [('花钱大方的', '1620 年代', ''),
          ('昂贵的', '现代', 'expense（花费）＋ -ive：先说人「舍得花钱」（1620 年代），1630 年代转说物「让人大花钱」——同一个 expensive，从花钱的主体滑到费钱的客体（施事到受事的转移），并挤走了旧词 dear 的此义')],
 'mech': 'expensive 先夸人舍得花：舍得到肉疼的东西，就是贵。',
 'link': '今天的意思「昂贵的」从「花钱大方的」转来：主语从人换成了物。',
 'disp': '拉丁语 *expēnsīvus 为后世构拟形（Wiktionary 标星号，引 OED），英语实际构词为 expense + -ive。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['scarf'] = {
 'chain': [('Old Northern French', 'escarpe', '挎带；斜挎的小包', '古北法语时期'),
           ('English', 'scarf', '披带；围巾', '1550 年代')],
 'fa': '1550 年代见载（Etymonline：1550s，义为「斜挎的带子」）',
 'orig': '挎带；斜挎的小包',
 'path': [('挎带；斜挎的小包', '古北法语时期', ''),
          ('围巾，披巾', '现代', 'escarpe 本与「朝圣者挂在脖子上的小包」同词：挎着的带子 → 披在肩上的带状布 → 1844 年起专指保暖的围巾（由佩带到织物的定型）')],
 'mech': 'scarf 先是斜挎的带子和小包：带子宽了、软了，就是围巾。',
 'link': '今天的意思「围巾」从「挎带」来：围着的东西换了材质，位置没换。',
 'disp': '更深两说并存：法兰克语 *skirpja 一线，与中世纪拉丁语 scirpa（出拉丁语 scirpus「灯心草织的小袋」，Klein 谓其来源未定）一线；入英主干（古北法语 escarpe）两源同述。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['umbrella'] = {
 'chain': [('Latin', 'umbra', '影子；阴凉', '拉丁语时期'),
           ('Italian', 'ombrella', '阳伞', '意大利语时期'),
           ('English', 'umbrella', '伞', '约 1600 年')],
 'fa': '约 1600 年借自意大利语（Etymonline：c. 1600）',
 'orig': '小阴凉（阳伞）',
 'path': [('小阴凉（阳伞）', '意大利语时期', ''),
          ('雨伞', '现代', 'umbella 是 umbra「影子」的指小形：「小小一片阴凉」——地中海用来遮阳，到了多雨的英国改行遮雨：同一把伞，换了天气（器物随气候转职）')],
 'mech': 'umbrella 是「小影子」：在意大利挡太阳，在英国挡雨。',
 'link': '今天的意思「雨伞」从「阳伞」转来：遮的东西从日头换成了雨。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['talk'] = {
 'chain': [('Proto-Germanic', '*talōną', '数；讲述', '原始日耳曼语时期'),
           ('Proto-Germanic', '*talkōną', '唠叨；交谈', '原始日耳曼语时期'),
           ('Middle English', 'talken', '说话', '中古英语时期')],
 'fa': '约 1200 年见载（Etymonline：c. 1200）',
 'orig': '讲述；数说',
 'path': [('讲述；数说', '原始日耳曼语时期', ''),
          ('说话，交谈', '现代', 'talk 是 tell/tale 一家的反复体（tell + -k，同 hark 之于 hear）：一遍遍地数说，就是说话、交谈（由叙事到对话的泛化）')],
 'mech': 'talk 是 tell 的「反复版」：你一句我一句地数说，就是交谈。',
 'link': '今天的意思「交谈」从「讲述」泛化来：单向的说变成了双向的谈。',
 'disp': '古英语 *tealcian 为构拟形，未见直接记载（Wiktionary 标星号）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['forest'] = {
 'chain': [('Latin', 'foris', '在外面', '拉丁语时期'),
           ('Late Latin', 'forestis (silva)', '（围场）外面的林子', '晚期拉丁语时期'),
           ('Old French', 'forest', '王室猎苑；森林', '古法语时期'),
           ('Middle English', 'forest', '森林', '中古英语时期')],
 'fa': '13 世纪晚期进入英语（Etymonline：late 13c.，义为「辟为王室猎苑的林地」）',
 'orig': '（围场）外面的林子',
 'path': [('（围场）外面的林子', '晚期拉丁语时期', ''),
          ('森林，林区', '现代', '查理曼法令里的 forestis silva 指围场（park）之外、归王家狩猎的野林；入英语后先指「王室猎苑」，后泛指一切大片林地，并顶替了本土词 wood 的主位（由禁猎地到泛指森林）')],
 'mech': 'forest 是「围墙外面的林子」：王家圈起来打猎的那片野林。',
 'link': '今天的意思「森林」从「王室猎苑」泛化来：禁地变成了通名。',
 'disp': '另有两说并存：法兰克语 *furhisti「冷杉林」说（Wiktionary 并列）与 Buck 的 forum「法庭禁地」说（Etymonline 并引）；foris「门外」说为牛津与 Lexico/AHD 一线所持。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['mountain'] = {
 'chain': [('Proto-Indo-European', '*men-', '凸出；伸出', '原始印欧语时期'),
           ('Latin', 'mōns', '山', '拉丁语时期'),
           ('Old French', 'montaigne', '山', '古法语时期'),
           ('Middle English', 'mountayne', '高山', '中古英语时期')],
 'fa': '约 1200 年进入英语（Etymonline：c. 1200，经古法语 montaigne）',
 'orig': '山',
 'path': [('山', '拉丁语时期', ''),
          ('高山，山岳', '现代', '老根是「凸出来」：地面凸起来的大块就是山。18 世纪前门槛很低，显眼的小丘也算（今 Sussex Downs 式用法是遗存）（借词后守恒）')],
 'mech': 'mountain 的老根是「凸出」：大地凸得够高，就是山。',
 'link': '今天的意思「高山」就是拉丁语原义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['river'] = {
 'chain': [('Proto-Indo-European', '*h₁reyp-', '刮；撕', '原始印欧语时期'),
           ('Latin', 'rīpa', '河岸', '拉丁语时期'),
           ('Vulgar Latin', '*riparia', '河岸；河', '通俗拉丁语时期'),
           ('Middle English', 'ryver', '河', '中古英语时期')],
 'fa': '13 世纪早期进入英语（Etymonline：early 13c.，经盎格鲁-法语 rivere）',
 'orig': '河岸',
 'path': [('河岸', '拉丁语时期', ''),
          ('河，江', '现代', '罗曼语亲戚多守「岸」义（Riviera 是海岸），英语把指岸的词用给了岸边的水本身，并顶替本土词 ea 成为通名（由岸到水的转移）')],
 'mech': 'river 本是「河岸」：站在岸边指水，名字就过给了河。',
 'link': '今天的意思「河」从「河岸」转来：地名换了主人。',
 'disp': '无已知争议',
 'folk': 'river 与拉丁语 rīvus「溪流」并不同源（Wiktionary 明言 Unrelated）——rival、derive 出自 rīvus，不可混谱。', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {'clever': 'trunk_unsettled（主干复核后）：「手巧」义（1580 年代）与「脑聪」义（1704）三源一致，但祖先词未有定论——东盎格鲁方言 cliver「善抓取」、东弗里斯兰语 klüfer、挪威方言 klover（或经中古低地德语 klever「粘着」一线）诸说并存，另有古诺斯语 kleyfr「易劈」说；无可互证的单一主干，保持待核'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
