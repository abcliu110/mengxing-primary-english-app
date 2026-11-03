# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['bird'] = {
 'chain': [('Old English', 'bridd', '雏鸟', '古英语时期'),
           ('Middle English', 'bird', '鸟', '中古英语时期')],
 'fa': '古英语时期就已经有了（义为「雏鸟」；14 世纪起渐成通名）',
 'orig': '雏鸟',
 'path': [('雏鸟', '古英语时期', ''),
          ('鸟，小鸟', '现代', '古英语的「鸟」通名本是 fugol（今 fowl）：bridd 只指不会飞的雏鸟；14 世纪起它反客为主成通名，拼写经音位易位 brid → bird（15 世纪完成）（由雏鸟专名到鸟类通名）')],
 'mech': 'bird 本是「雏鸟」：小家伙长大，把全体鸟的名字占了。',
 'link': '今天的意思「鸟」从「雏鸟」泛化而来：幼名成了通名。',
 'disp': '无已知争议',
 'folk': '民间（及旧词典）常将 bird 与 brood、breed 牵合，OED 明斥此说「断不可取」（quite inadmissible）。', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['cat'] = {
 'chain': [('Late Latin', 'cattus', '家猫', '晚期拉丁语时期'),
           ('Proto-Germanic', '*kattuz', '猫', '原始日耳曼语时期'),
           ('Old English', 'catt', '猫', '古英语时期'),
           ('Middle English', 'cat', '猫', '中古英语时期')],
 'fa': '约 700 年见载（Etymonline：Old English catt, c. 700）',
 'orig': '家猫',
 'path': [('家猫', '晚期拉丁语时期', ''),
          ('猫', '现代', '近乎全欧通用的猫名：拉丁语 catta 约公元 75 年已见（马提亚尔），cattus 约 350 年；词随猫走——家猫自近东、埃及扩散，名字跟着进了各语言，并顶替了拉丁语旧名 feles')],
 'mech': 'cat 是跟着猫一起旅行的词：猫到哪儿，它到哪儿。',
 'link': '今天的意思「猫」就是借入时的本义，一路没变。',
 'disp': '终极来源或为亚非语系（努比亚语 kadis、柏柏尔语 kadiska 同义），与家猫的扩散路线相合（两源并记）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['ball'] = {
 'chain': [('Proto-Indo-European', '*bʰel-', '吹；膨胀', '原始印欧语时期'),
           ('Proto-Germanic', '*balluz', '球', '原始日耳曼语时期'),
           ('Middle English', 'bal', '球', '中古英语时期')],
 'fa': '约 1200 年见载（Etymonline：c. 1200）',
 'orig': '球',
 'path': [('球', '原始日耳曼语时期', ''),
          ('球', '现代', '老根是「吹胀」：鼓起来的圆东西就是球（由膨胀到圆体）')],
 'mech': 'ball 是「吹鼓起来的圆」：气一足，就是球。',
 'link': '今天的意思「球」就是本义，一路没变。',
 'disp': '入英路径两说（本土未见载的古英语 *beall 存续说与古诺斯语 bǫllr 借词说），同归日耳曼语 *balluz，主干一致；「舞会」义的 ball 是另一个词（出法语 bal ← 拉丁语 ballare「跳舞」），同形异源。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['kite'] = {
 'chain': [('Old English', 'cȳta', '鸢', '古英语时期'),
           ('Middle English', 'kyte', '风筝', '中古英语时期')],
 'fa': '古英语时期就已经有了（义为猛禽「鸢」；玩具义 1660 年代，Etymonline）',
 'orig': '鸢（一种猛禽）',
 'path': [('鸢（一种猛禽）', '古英语时期', ''),
          ('风筝', '现代', '词或为拟声（仿其鸣叫）：纸鸢在空中盘旋悬停，像鸢鸟一样，1660 年代玩具借了鸟名（以姿态似鸟得名）')],
 'mech': 'kite 先是盘旋的猛禽：纸做的也会盘旋，就叫了同一个名。',
 'link': '今天的意思「风筝」从鸟名转来：飞的样子像，就借了名。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['rice'] = {
 'chain': [('Sanskrit', 'व्रीहि (vrīhi)', '稻', '梵语时期'),
           ('Ancient Greek', 'ὄρυζα (oryza)', '稻米', '古希腊时期'),
           ('Italian', 'riso', '大米', '意大利语时期'),
           ('Old French', 'ris', '大米', '古法语时期'),
           ('Middle English', 'rys', '大米', '中古英语时期')],
 'fa': '13 世纪中期进入英语（Etymonline：mid-13c. ris）',
 'orig': '稻米',
 'path': [('稻米', '梵语时期', ''),
          ('米饭，大米', '现代', '词随粮走：经印度-伊朗语言入希腊语 oryza，再经意大利语、法语入英；实物则由阿拉伯人把稻带进地中海（借词随粮食西行）')],
 'mech': 'rice 是跟着稻子西行的名字：一路吃，一路传。',
 'link': '今天的意思「大米」就是借入时的本义，一路没变。',
 'disp': '梵语以前或谓借自达罗毗荼语（*wariñci）或南亚语系诸说并存，未定论，本档以梵语为可证起点。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['short'] = {
 'chain': [('Proto-Indo-European', '*(s)ker-', '切；割', '原始印欧语时期'),
           ('Proto-Germanic', '*skurtaz', '短的', '原始日耳曼语时期'),
           ('Old English', 'sċeort', '短的', '古英语时期'),
           ('Middle English', 'schort', '短的', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏同载 sceort）',
 'orig': '短的（被切短的）',
 'path': [('短的（被切短的）', '古英语时期', ''),
          ('矮的；短的', '现代', '老根是「切」：被剪掉一截的，就是短的。与 shirt、skirt、curt 同根（由切短到短）')],
 'mech': 'short 是「切短了的」：剪掉一截，自然就短。',
 'link': '今天的意思「短的」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['whose'] = {
 'chain': [('Proto-Indo-European', '*kʷo-', '谁；什么（疑问词干）', '原始印欧语时期'),
           ('Proto-Germanic', '*hwes', '谁的', '原始日耳曼语时期'),
           ('Old English', 'hwæs', '谁的', '古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏同载 hwæs）',
 'orig': '谁的（who 的属格）',
 'path': [('谁的（who 的属格）', '古英语时期', ''),
          ('谁的', '现代', 'who 的属格老形直接存续：古英语 hwā「谁」的属格就是 hwæs；拼写变了，格没变（古格形式存续）')],
 'mech': 'whose 是 who 的「所有格老本」：从古英语一路用到今天。',
 'link': '今天的意思「谁的」就是古属格本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {'monkey': 'trunk_unsettled（主干复核后）：牛津标来源未定；主流推测为未见载的中古低地德语 *moneke（1498 年《列那狐》中猿猴之子的名字），其本身或出罗曼语 monne 一族、终极或出阿拉伯语 maimun「吉祥的」（Klein 谓系避讳语），链环多为构拟与或然，未成双源互证，保持待核'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
