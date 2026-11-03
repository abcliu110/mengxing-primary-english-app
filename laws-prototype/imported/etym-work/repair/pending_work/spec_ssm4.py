# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['colour'] = {
 'chain': [('Latin', 'color', '颜色', '拉丁语时期'),
           ('Old French', 'colour', '颜色', '古法语时期'),
           ('Middle English', 'colur', '颜色', '中古英语时期')],
 'fa': '中古英语时期进入英语（牛津词源栏：from Old French colour, from Latin color）',
 'orig': '颜色',
 'path': [('颜色', '拉丁语时期', ''),
          ('颜色', '现代', '词义一路稳定；colour 是 color 的英式拼法（词尾 -our 为法语影响的拼写传统），美式作 color，其主干记录见 color')],
 'mech': 'colour 与 color 同词异拼：英式多写的 u，是法语拼法留下的印记。',
 'link': '今天的意思「颜色」就是最早的意思，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['metre'] = {
 'chain': [('Ancient Greek', 'μέτρον (metron)', '量度；尺度', '古希腊时期'),
           ('French', 'mètre', '米（长度单位）', '法语近现代')],
 'fa': '18 世纪晚期（长度单位义）经法语 mètre 借入（牛津词源栏）',
 'orig': '量度；尺度',
 'path': [('量度；尺度', '古希腊时期', ''),
          ('米', '现代', '希腊语 metron 泛指「量度、尺子」；法国大革命后创立公制，取 mètre 定为基本长度单位，英语随之借入（泛指量度 → 专名单位）')],
 'mech': 'metre 本是「尺子、量度」：公制把它定成全世界的那把尺的一格。',
 'link': '今天的意思「米」从「量度」专名化来：一格标准长度。',
 'disp': '同源的「诗律」义 metre 是更早经拉丁语 metrum 的另一借入层（牛津分义项注明），本档只记长度单位。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['sceptic'] = {
 'chain': [('Ancient Greek', 'skeptikos', '探究的；怀疑的', '古希腊时期'),
           ('French', 'sceptique', '怀疑论者', '法语近现代'),
           ('English', 'sceptic', '怀疑论者', '16 世纪晚期')],
 'fa': '16 世纪晚期进入英语（牛津词源栏：late 16th cent.，先作哲学义）',
 'orig': '探究；怀疑',
 'path': [('探究；怀疑', '古希腊时期', ''),
          ('怀疑论者', '现代', '希腊语 skepsis 是「探究、审视」：古希腊怀疑派哲学家凡事先查问、不轻断——sceptic 先是这派人的名号，后泛指爱怀疑的人（学派名到性格名的泛化）')],
 'mech': 'sceptic 的老根是「查问」：什么都要先探究一番的人，就是怀疑论者。',
 'link': '今天的意思「怀疑论者」从「探究者」来：先问清楚，才肯相信。',
 'disp': 'sceptic 为英式拼法，美式作 skeptic（同一谱系）；词条 sceptic 本身的借入层（经法语或经拉丁语）牛津作两说并存。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['clover'] = {
 'chain': [('Proto-West Germanic', '*klaibrā', '三叶草', '原始西日耳曼语时期'),
           ('Old English', 'clāfre', '三叶草', '古英语时期'),
           ('Middle English', 'clovere', '三叶草', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 clafre 起头）',
 'orig': '三叶草',
 'path': [('三叶草', '古英语时期', ''),
          ('三叶草；苜蓿', '现代', '词义稳定：一千年指的同一种豆科牧草；今拼法约 1700 年后定型')],
 'mech': 'clover 是日耳曼语的老植物名，一路指的都是三叶草。',
 'link': '今天的意思「三叶草」就是最早的意思，一路没变。',
 'disp': '更深来源未定：Klein 与 Liberman 推测或与 *klaiwaz-「黏糊」（见 clay）有关（Etymonline 引述），本档链止于西日耳曼语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['flak'] = {
 'chain': [('German', 'FlaK', '高射炮', '1938 年'),
           ('English', 'flak', '高射炮火', '1938 年')],
 'fa': '1938 年借自德语（Etymonline 与牛津词源栏同载）',
 'orig': '高射炮',
 'path': [('高射炮', '1938 年', ''),
          ('高射炮火；猛烈批评', '现代', 'FlaK 是德语 Fliegerabwehrkanone「飞行员防御炮」的首字母缩略；1940 年转指炮火本身；约 1963 年美式英语比喻「猛烈批评」——被批得像挨炮火（军事词的日常比喻）')],
 'mech': 'flak 是德语长词的首字母：防空炮的炮火，后来成了「炮轰式批评」。',
 'link': '今天的意思「猛烈批评」从「高射炮火」比喻来：话像炮弹一样砸过来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['ptarmigan'] = {
 'chain': [('Scottish Gaelic', 'tarmachan', '雷鸟', '16 世纪'),
           ('English', 'ptarmigan', '雷鸟', '1590 年代')],
 'fa': '1590 年代借自苏格兰盖尔语 tarmachan；pt- 拼法 1680 年代出现（Etymonline）',
 'orig': '雷鸟',
 'path': [('雷鸟', '16 世纪', ''),
          ('雷鸟', '现代', '词义无变化，只是拼写被「美化」：tarmachan 本无 p，后人误以为它出自希腊语 pteron「翅膀」，硬加上 pt-——一个写错的开头沿用至今（误构拼写）')],
 'mech': 'ptarmigan 开头不发音的 pt，是古人误认希腊亲戚硬加上去的。',
 'link': '今天的意思「雷鸟」就是盖尔语原义，一路没变。',
 'disp': 'tarmachan 本身来源未定（Etymonline 与 Wiktionary 同标 unknown origin）；借入路径与拼写史三家一致。',
 'folk': '拼写 pt- 源于「与希腊语 ptero-（翅）有关」的误认，三家来源一致认定为后人误加——本词的希腊谱系不成立。', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['tofu'] = {
 'chain': [('Chinese', '豆腐 (dòufu)', '豆腐', '汉语'),
           ('Japanese', '豆腐 (tōfu)', '豆腐', '日语'),
           ('English', 'tofu', '豆腐', '1876 年')],
 'fa': '1876 年经日语借入英语（Etymonline 与牛津词源栏同载）',
 'orig': '豆腐',
 'path': [('豆腐', '汉语', ''),
          ('豆腐', '现代', '词义无变化：汉语「豆腐」由「豆」＋「腐」（腐指凝腐、变酸凝固）构成，传入日本读作 tōfu，1876 年英语从日语借入（借词）')],
 'mech': 'tofu 是汉语「豆腐」旅行到日本、再到英语的读音：豆子凝成的腐。',
 'link': '今天的意思「豆腐」就是汉语原义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['sweetmeat'] = {
 'chain': [('Old English', 'swete mete', '甜食', '古英语时期'),
           ('Middle English', 'swete-mete', '糖果；蜜饯', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 词条以古英语 swete mete 起头）',
 'orig': '甜食',
 'path': [('甜食', '古英语时期', ''),
          ('糖果；蜜饯', '现代', '古英语 meat 泛指一切食物：swete mete 就是「甜的食物」；后来 meat 收窄为「肉」，这个复合词成了化石，专指糖果、蜜饯（组成部分变义后整体存古）')],
 'mech': 'sweetmeat 里的 meat 是老意思「食物」：甜的食物，就是糖。',
 'link': '今天的意思「糖果」就是「甜食」的本义；只是 meat 后来专指肉，它才显得奇怪。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
