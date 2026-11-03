# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['chronic'] = {
 'chain': [('Ancient Greek', 'χρόνος (khrónos)', '时间', '古希腊时期'),
           ('Ancient Greek', 'χρονικός (khronikós)', '属时间的', '古希腊时期'),
           ('Latin', 'chronicus', '慢性的', '拉丁语时期'),
           ('Middle English', 'cronik', '慢性的', '中古英语时期')],
 'fa': '15 世纪初见载（Etymonline：early 15c.，作 cronik，专说疾病「拖得久」）',
 'orig': '属时间的（拖长了的）',
 'path': [('属时间的（拖长了的）', '古希腊时期', ''),
          ('（疾病）慢性的，长期的', '现代', '字面只是「关于时间」：用在病上，就是「时间拖得长」。17 世纪起染上贬义色彩（由时间长到慢性）')],
 'mech': 'chronic 是「时间病」：不靠猛，靠拖。',
 'link': '今天的意思「慢性」就是本义在医学里的定型。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['cigarette'] = {
 'chain': [('Spanish', 'cigarro', '雪茄', '西班牙语时期'),
           ('French', 'cigarette', '小雪茄', '法语近现代'),
           ('English', 'cigarette', '香烟', '1835 年')],
 'fa': '1835 年见载（Etymonline：1835，美式英语）',
 'orig': '小雪茄',
 'path': [('小雪茄', '法语近现代', ''),
          ('香烟；卷烟', '现代', 'cigare 的指小形（-ette）：细切烟丝裹上纸，就是雪茄的小号本（由小雪茄到纸烟）')],
 'mech': 'cigarette 是「小雪茄」：个头小了，名字带个小尾巴。',
 'link': '今天的意思「香烟」就是借入时的本义。',
 'disp': 'cigarro 更深，牛津谓 probably 出玛雅语 sik’ar「抽烟」，未定论。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['clef'] = {
 'chain': [('Proto-Indo-European', '*klau-', '钩', '原始印欧语时期'),
           ('Latin', 'clāvis', '钥匙', '拉丁语时期'),
           ('French', 'clef', '钥匙；谱号', '法语近现代'),
           ('English', 'clef', '谱号', '1570 年代')],
 'fa': '1570 年代见载（Etymonline：1570s，义为五线谱上定音名的记号）',
 'orig': '钥匙',
 'path': [('钥匙', '拉丁语时期', ''),
          ('（乐谱）谱号', '现代', '中世纪拉丁语已拿 clāvis 指圭多音阶的最低音：谱号是「开谱的钥匙」——定住一行，其余音名才都可知（由钥匙到谱号）')],
 'mech': 'clef 是「钥匙」：谱子锁着，谱号来开。',
 'link': '今天的意思「谱号」是钥匙义的乐理转用。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['codeine'] = {
 'chain': [('Proto-Indo-European', '*keue-', '膨胀；拱空', '原始印欧语时期'),
           ('Ancient Greek', 'κώδεια (kodeia)', '罂粟头', '古希腊时期'),
           ('French', 'codéine', '可待因', '1838 年'),
           ('English', 'codeine', '可待因', '1838 年')],
 'fa': '1838 年见载（Etymonline：1838，作 codeina；今形 1881 年）',
 'orig': '罂粟头（所含的成分）',
 'path': [('罂粟头（所含的成分）', '1838 年', ''),
          ('可待因', '现代', '化学造词：希腊语 kodeia「罂粟的蒴果头」（与「空腔」词同根，取其壳空）+ 化学后缀 -ine（由来源命名）')],
 'mech': 'codeine 是「罂粟头里的 ine」：出身写在名字里。',
 'link': '今天的意思「可待因」就是造词时的本义。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['collaborate'] = {
 'chain': [('Latin', 'labōrāre', '劳动', '拉丁语时期'),
           ('Late Latin', 'collabōrāre', '一同劳动', '晚期拉丁语时期'),
           ('English', 'collaborate', '合作', '1845 年')],
 'fa': '1845 年见载（Etymonline：1845，由 collaborating 推见）',
 'orig': '一同劳动',
 'path': [('一同劳动', '晚期拉丁语时期', ''),
          ('合作；协作', '现代', '逆构词：先有 collaborator「合作者」，再剥回动词（或仿法语 collaborer）。二战时添「通敌合作」恶义（由共事到合作）')],
 'mech': 'collaborate 是「一块儿干活」：labōr 前面加个「同」。',
 'link': '今天的意思「合作」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['college'] = {
 'chain': [('Proto-Indo-European', '*leg-', '收集；挑选', '原始印欧语时期'),
           ('Latin', 'legāre', '委派', '拉丁语时期'),
           ('Latin', 'collega', '同僚', '拉丁语时期'),
           ('Latin', 'collēgium', '同僚团体', '拉丁语时期'),
           ('Middle English', 'college', '学院', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「有共同职分者的组织化团体」，含学者团体）',
 'orig': '同僚团体',
 'path': [('同僚团体', '拉丁语时期', ''),
          ('学院；大学', '现代', 'com-「同」+ legāre「委派」：被选到一起任职的人就是团体。大学里它先指校内的学者共同体，美国用法里渐成高等学府通名（约 1800）（由团体到学府）')],
 'mech': 'college 是「同事们的团」：先有伙计们，后有学校。',
 'link': '今天的意思「学院」从团体义专业化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['combine'] = {
 'chain': [('Proto-Indo-European', '*dwo-', '二', '原始印欧语时期'),
           ('Latin', 'bīnī', '两个两个的', '拉丁语时期'),
           ('Late Latin', 'combīnāre', '两两并合', '晚期拉丁语时期'),
           ('Middle English', 'combynyn', '结合', '中古英语时期')],
 'fa': '15 世纪初见载（Etymonline：early 15c.）',
 'orig': '两两并合（同轭）',
 'path': [('两两并合（同轭）', '晚期拉丁语时期', ''),
          ('结合；联合', '现代', 'com-「同」+ bīnī「成对」：本是把两头牲口套上同一副轭——「并」得成双成对（由套轭到结合）')],
 'mech': 'combine 是「套一副轭」：两个并成一对，就是结合。',
 'link': '今天的意思「结合」就是本义的抽象化。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['combustion'] = {
 'chain': [('Proto-Indo-European', '*heus-', '燃烧', '原始印欧语时期'),
           ('Latin', 'ūrere', '烧；灼', '拉丁语时期'),
           ('Latin', 'combūrere', '烧尽', '拉丁语时期'),
           ('Latin', 'combustiō', '燃烧', '拉丁语时期'),
           ('Middle English', 'combustion', '燃烧', '中古英语时期')],
 'fa': '15 世纪初见载（Etymonline：early 15c.）',
 'orig': '烧尽',
 'path': [('烧尽', '拉丁语时期', ''),
          ('燃烧', '现代', '拆词事故：ambūrere「绕着烧」本是 ambi- + ūrere，后人误拆出 *burere，com- 再与它合成 combūrere「彻底烧」——错拆拆出个正词（由误拆到定型）')],
 'mech': 'combustion 里藏着一次「拆错词」：拆错了，也就将错就错。',
 'link': '今天的意思「燃烧」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
