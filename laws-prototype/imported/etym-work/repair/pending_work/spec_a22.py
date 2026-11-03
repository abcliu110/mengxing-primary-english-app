# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['person'] = {
 'chain': [('Latin', 'persōna', '演员的面具；角色', '拉丁语时期'),
           ('Old French', 'persone', '人', '古法语时期'),
           ('Middle English', 'persoun', '个人', '中古英语时期')],
 'fa': '约 1200 年进入英语（Etymonline：c. 1200，义为「一个个体、一个人」）',
 'orig': '演员的面具；角色',
 'path': [('演员的面具；角色', '拉丁语时期', ''),
          ('个人', '现代', '戏台上的面具就是「角色」，角色背后就是「人」：拉丁语后起「人」义，教会拉丁语以它译三位一体的「位格」（由面具到人）')],
 'mech': 'person 是「面具」：戴上面具演角色，摘了面具是个人。',
 'link': '今天的意思「个人」从舞台面具转化而来。',
 'disp': 'persōna 或为伊特鲁里亚语 phersu「面具」借词（Klein、Barnhart）；旧说系 personare「透声而呼」有长音困难（OED），de Vaan 无此条。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['house'] = {
 'chain': [('Proto-Germanic', '*hūsą', '房子', '原始日耳曼语时期'),
           ('Old English', 'hūs', '住宅', '古英语时期'),
           ('Middle English', 'hous', '房子，住宅', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：hūs，义为「住所、庇护处」）',
 'orig': '住宅',
 'path': [('住宅', '古英语时期', ''),
          ('房子，住宅', '现代', '日耳曼语通词（德语 Haus、荷兰语 huis 同族）：约 1000 年起兼指「家族、世系」，议院、剧院观众等义皆后起转用（借词守恒式的稳定）')],
 'mech': 'house 是日耳曼人的家：千年本义，派生义一长串。',
 'link': '今天的意思「房子」就是本义，一路没变。',
 'disp': '来源未明（Etymonline 引 OED：of unknown origin），或与 hide「藏」之根相关（perhaps），本档止于日耳曼语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['mirror'] = {
 'chain': [('Proto-Indo-European', '*smey-', '笑；喜悦', '原始印欧语时期'),
           ('Latin', 'mīrārī', '惊奇；注视', '拉丁语时期'),
           ('Old French', 'mireor', '镜子', '古法语时期'),
           ('Middle English', 'mirour', '镜子', '中古英语时期')],
 'fa': '13 世纪中期进入英语（Etymonline：mid-13c.，义为「映照影像的磨光面」）',
 'orig': '照看之器',
 'path': [('照看之器', '古法语时期', ''),
          ('镜子', '现代', 'mireor 字面是「看的东西」——源头在「惊奇、注看着」（mīrārī）：照镜子先是一种「看」，看的对象固化成了器物名（由看到镜）')],
 'mech': 'mirror 是「用来看的」：动作的名字，落在了器物上。',
 'link': '今天的意思「镜子」从「看」的工具义定型。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['temperature'] = {
 'chain': [('Latin', 'temperāre', '按比例调和', '拉丁语时期'),
           ('Latin', 'temperātūra', '调和；适中', '拉丁语时期'),
           ('English', 'temperature', '温度，体温', '15 世纪中期')],
 'fa': '15 世纪中期见载（Etymonline：mid-15c.，义为「调和得当的状态」）',
 'orig': '调和；适中',
 'path': [('调和；适中', '拉丁语时期', ''),
          ('温度，体温', '现代', '旧医学里指四体液（热冷湿干）的配比状态：1670 年（Boyle）科学义「冷热的程度」立——伽利略已先用拉丁语此词作此义（由调和到冷热度）')],
 'mech': 'temperature 先是「配比」：冷热调匀的程度，就是温度。',
 'link': '今天的意思「温度」从「调和状态」科学化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['shine'] = {
 'chain': [('Proto-Germanic', '*skīnaną', '发光', '原始日耳曼语时期'),
           ('Old English', 'sċīnan', '发光；闪耀', '古英语时期'),
           ('Middle English', 'schynen', '照耀，发光', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline：scīnan，义为「发出光」）',
 'orig': '发光',
 'path': [('发光', '古英语时期', ''),
          ('照耀；发光', '现代', '日耳曼语强变化动词（德语 scheinen、荷兰语 schijnen 同族）：本义至今；擦鞋「使发亮」义 1580 年代后起（借词守恒式的稳定）')],
 'mech': 'shine 是日耳曼语的「发光」：老词新用，本义不动。',
 'link': '今天的意思「发光」就是本义，一路没变。',
 'disp': '印欧层 *skai-「发光闪烁」为拟测（perhaps），日耳曼语层无争议。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['date'] = {
 'chain': [('Proto-Indo-European', '*do-', '给', '原始印欧语时期'),
           ('Latin', 'dare', '给予', '拉丁语时期'),
           ('Latin', 'datus', '已给予的', '拉丁语时期'),
           ('Medieval Latin', 'data', '（信上）写定的日期', '中世纪拉丁语时期'),
           ('Middle English', 'date', '日期', '中古英语时期')],
 'fa': '14 世纪初进入英语（Etymonline：early 14c.，义为「一段时间、一个时代」）',
 'orig': '（信件落款的）「已发出」',
 'path': [('（信件落款的）「已发出」', '中世纪拉丁语时期', ''),
          ('日期', '现代', '罗马人写信结尾要写 data（epistola）「（此信）发出于（某地某日）」：datum Romae…——「发出」二字连着的日子，就成了日期本身（由落款语到日期）')],
 'mech': 'date 是信尾巴上的字：写下「寄出」的那天，就是日期。',
 'link': '今天的意思「日期」出自罗马书信的落款格式。',
 'disp': '无已知争议',
 'folk': '同形词 date「海枣」另有来源（希腊语 dáktulos「手指」说本身即疑为对闪米特语词的民间词源式改造，Wiktionary：probably a folk-etymological alteration），非本词', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['quarter'] = {
 'chain': [('Proto-Indo-European', '*kwetwer-', '四', '原始印欧语时期'),
           ('Latin', 'quattuor', '四', '拉丁语时期'),
           ('Latin', 'quartārius', '四分之一', '拉丁语时期'),
           ('Middle English', 'quarter', '一刻钟', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300，义为「任何东西的四分之一」）',
 'orig': '四分之一',
 'path': [('四分之一', '拉丁语时期', ''),
          ('一刻钟（15 分钟）', '现代', '小时的四分之一就是一刻（15 世纪中期 quarter of an hour）：同根的「四等分」还生出宿舍（quarters）、街区诸义（由分数到时段）')],
 'mech': 'quarter 是「四分之一」：一小时切四份，一份十五分钟。',
 'link': '今天的意思「一刻钟」是分数义的定点应用。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['christmas'] = {
 'chain': [('Old English', 'Crist', '基督', '古英语时期'),
           ('Old English', 'mæsse', '弥撒', '古英语时期'),
           ('Old English', 'Cristes mæsse', '基督的弥撒', '古英语时期'),
           ('Middle English', 'Cristemasse', '圣诞节', '中古英语时期')],
 'fa': '古英语晚期就已经有了（Etymonline：Cristes mæsse）',
 'orig': '基督的弥撒（圣餐礼）',
 'path': [('基督的弥撒（圣餐礼）', '古英语时期', ''),
          ('圣诞节', '现代', '纪念基督诞生的那台弥撒，给了整个节日名字：14 世纪中期写成一个词，-mas 从此成「节日」标记（Christmas、Candlemas 等）（由礼仪到节日）')],
 'mech': 'christmas 是「基督的弥撒」：一场礼拜，长成了一个节。',
 'link': '今天的意思「圣诞节」就是本义的节日化。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
