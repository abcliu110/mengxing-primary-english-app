# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['chronology'] = {
 'chain': [('Ancient Greek', 'χρόνος (khronos)', '时间', '古希腊时期'),
           ('Modern Latin', 'chronologia', '年代学', '近代拉丁语时期'),
           ('English', 'chronology', '年代学；年表', '1590 年代')],
 'fa': '1590 年代进入英语（Etymonline 与牛津词源栏同载）',
 'orig': '时间的学问',
 'path': [('时间的学问', '近代拉丁语时期', ''),
          ('年表；年代顺序', '现代', 'khronos「时间」＋ -logia「学问」拼成的新词，先指「研究时间的学问」，1610 年代添实指义：把往事按年代排成的表——年表（从学科到成果的转移）')],
 'mech': 'chronology 是「时间的学问」：把时间排排队，就是年表。',
 'link': '今天的意思「年表」是从「时间的学问」落到具体表上的。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['concerto'] = {
 'chain': [('Italian', 'concerto', '协奏曲', '意大利语时期'),
           ('English', 'concerto', '协奏曲', '1730 年')],
 'fa': '1730 年借自意大利语（Etymonline 与牛津词源栏同载）',
 'orig': '协奏曲',
 'path': [('协奏曲', '意大利语时期', ''),
          ('协奏曲', '现代', '词义无变化：意大利语 concerto（源动词 concertare「使和谐」）指独奏与乐队呼应竞奏的曲式，英语原样借入（借词）')],
 'mech': 'concerto 是意大利送来的曲式名：独奏与乐队一唱一和地竞奏。',
 'link': '今天的意思「协奏曲」就是意大利语原义，一路没变。',
 'disp': 'concertare 的更深层来源学界尚有争论（见 concert 词条口径），本档链止于意大利语。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['digestion'] = {
 'chain': [('Latin', 'digerere', '分开搬运；分排', '拉丁语时期'),
           ('Old French', 'digestion', '消化', '古法语时期'),
           ('Middle English', 'digestioun', '消化', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.）',
 'orig': '分开搬运；分排',
 'path': [('分开搬运；分排', '拉丁语时期', ''),
          ('消化', '现代', 'digerere 是 dis-「分开」＋ gerere「搬运」：把东西搬开、排开；其名词 digestio 在借入时已专指肠胃把食物拆开、送进血液的过程（由分送到消化的定型）')],
 'mech': 'digestion 是「把食物搬开、拆开」：拆散了送进血里，就是消化。',
 'link': '今天的意思「消化」从「分开搬运」来：食物被拆开运走，才算消化。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['equation'] = {
 'chain': [('Latin', 'aequātiō', '使相等；均分', '拉丁语时期'),
           ('Middle English', 'equation', '（占星的）均差计算', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（先作占星学术语，Etymonline 与牛津同载）',
 'orig': '使相等；均分',
 'path': [('使相等；均分', '拉丁语时期', ''),
          ('方程式；等式', '现代', 'aequus「平、等」派生：先作占星学算「均差」的术语入英语；1560 年代数学义定型——把式子两边拉平的写法；1650 年代才有一般的「使相等之举」义（术语先行，后泛化）')],
 'mech': 'equation 是「拉平」：两边一样高，就是方程式。',
 'link': '今天的意思「方程式」从「使相等」定型：等号两边相等，才成方程。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['extension'] = {
 'chain': [('Latin', 'extensiō', '伸展', '拉丁语时期'),
           ('Middle English', 'extensioun', '伸展；延伸', '中古英语时期')],
 'fa': '约 1400 年进入英语（Etymonline：c. 1400，初义「肿胀、鼓起」）',
 'orig': '伸展',
 'path': [('伸展', '拉丁语时期', ''),
          ('延伸；分机', '现代', 'extendere 是 ex-「向外」＋ tendere「拉」：向外拉伸；英语初义是「鼓起、胀出」，后归于「伸出去的部分」——1852 年指（铁路等）延长段，1906 年电话分机：从总机伸出去的那条线（从动作到实物再到器物的转移）')],
 'mech': 'extension 是「往外伸」：伸出去的那截路、那条线，都归它管。',
 'link': '今天的意思「延伸；分机」都从「向外伸」来：伸出的部分，伸出的线。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['irrigate'] = {
 'chain': [('Latin', 'irrigāre', '引水湿润', '拉丁语时期'),
           ('English', 'irrigate', '灌溉', '1610 年代')],
 'fa': '1610 年代进入英语（Etymonline 与牛津词源栏同载）',
 'orig': '引水湿润',
 'path': [('引水湿润', '拉丁语时期', ''),
          ('灌溉', '现代', 'in-「向里」＋ rigare「浇水、润湿」：把水引到地里；词义守恒（借词）')],
 'mech': 'irrigate 是「把水引进来」：水进了田，就是灌溉。',
 'link': '今天的意思「灌溉」就是拉丁语原义，一路没变。',
 'disp': 'rigare 本身来源未定：Watkins 接印欧语 *reg-「湿」，de Vaan 另有两说（见 Etymonline），本档链止于拉丁语。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['pathology'] = {
 'chain': [('Ancient Greek', 'πάθος (pathos)', '痛苦；疾病', '古希腊时期'),
           ('French', 'pathologie', '病理学', '法语近现代'),
           ('English', 'pathology', '病理学', '1610 年代')],
 'fa': '1610 年代进入英语（Etymonline：1610s，经法语与医学拉丁语）',
 'orig': '痛苦；疾病（之学）',
 'path': [('痛苦；疾病（之学）', '古希腊时期', ''),
          ('病理学', '现代', 'pathos「痛苦、疾病」＋ -logia「学问」：研究疾病的学问；1842 年添「（心理）异常研究」一支（学科内扩展）')],
 'mech': 'pathology 是「痛苦的学问」：专研究疾病是怎么回事。',
 'link': '今天的意思「病理学」就是「疾病之学」的本义，一路没变。',
 'disp': '古希腊语 pathologia 本指「情感之学」，「疾病之学」古希腊作 pathologike（Etymonline 注明）——今义是医学拉丁语里重新定的。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['reduce'] = {
 'chain': [('Latin', 'reducere', '带回；领回', '拉丁语时期'),
           ('Old French', 'reduire', '带回；减少', '古法语时期'),
           ('Middle English', 'reducen', '带回', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「带回」）',
 'orig': '带回；领回',
 'path': [('带回；领回', '拉丁语时期', ''),
          ('减少；降低', '现代', 're-「回」＋ ducere「领」：先是领回来（今已废）；牛津梳理其台阶：带到另一个状态 → 带到更简单、更低的状态 → 18 世纪晚期「减少、缩小」定型（从领回到降格的逐级转移）')],
 'mech': 'reduce 先是「领回去」：把东西领到更低、更少的状态，就是减少。',
 'link': '今天的意思「减少」从「带回」逐级走来：回 → 变状态 → 变低变少。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
