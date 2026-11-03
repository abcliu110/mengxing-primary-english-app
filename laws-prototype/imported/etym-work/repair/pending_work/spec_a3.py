# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['coat'] = {
 'chain': [('Frankish', '*kotta', '粗布；粗呢外衣', '法兰克语时期'),
           ('Old French', 'cote', '外袍；外衣', '古法语时期'),
           ('Middle English', 'cote', '外衣', '中古英语时期')],
 'fa': '14 世纪早期进入英语（Etymonline：early 14c.，义为「主要外衣、长袍」）',
 'orig': '外衣（粗呢袍）',
 'path': [('外衣（粗呢袍）', '古法语时期', ''),
          ('外衣，大衣', '现代', '本是粗呢做的袍：14 世纪晚期转指动物的「皮毛外衣」，1660 年代又指「一层（漆、膜）」——穿在外面的那一层，都是 coat（由服装到覆盖层）')],
 'mech': 'coat 是「穿在外面的那一层」：人身上的、动物身上的、墙上的，都是它。',
 'link': '今天的意思「外衣」就是本义；「涂层」是它脱了衣服的用法。',
 'disp': '终极来源未定（Etymonline 与牛津同标 unknown）；Wiktionary 另记经拉丁语 cotta 的路径，然西班牙语、意大利语的同形词亦为日耳曼语借词，主干以法兰克语为起点无争议。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['potato'] = {
 'chain': [('Taino', 'batata', '甘薯（红薯）', '泰诺语时期'),
           ('Spanish', 'patata', '甘薯', '西班牙语时期'),
           ('English', 'potato', '马铃薯', '1560 年代')],
 'fa': '1560 年代见载（Etymonline 与牛津同载：义为「甘薯」）',
 'orig': '甘薯（红薯）',
 'path': [('甘薯（红薯）', '泰诺语时期', ''),
          ('马铃薯，土豆', '现代', '海地泰诺语的薯名随西班牙人入欧：先到的新大陆作物是甘薯；1590 年代秘鲁的白薯因同为可食块茎，把名字借了过来并反客为主（以形似转名）')],
 'mech': 'potato 先是红薯的名字：白薯长得像，就把名字继承了。',
 'link': '今天的意思「土豆」是转借来的：名字先给红薯，后给白薯。',
 'disp': '白薯初入欧洲时曾称 Virginia potato，又因地位次要称 bastard potato（Etymonline 并记）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['tomato'] = {
 'chain': [('Nahuatl', 'tomatl', '膨胀的果实', '纳瓦特尔语时期'),
           ('Spanish', 'tomate', '番茄', '西班牙语时期'),
           ('English', 'tomato', '番茄', '1753 年')],
 'fa': '1753 年定型（Etymonline：1753；早形 tomate 约 1600 年）',
 'orig': '番茄（膨胀的果实）',
 'path': [('番茄（膨胀的果实）', '纳瓦特尔语时期', ''),
          ('西红柿，番茄', '现代', '纳瓦特尔语 tomatl 字面是「胀起来的果子」（出 tomana「膨胀」）：经西班牙语入欧；英语拼写改作 -o 是受了 potato 的影响（借词随果子与拼写习惯）')],
 'mech': 'tomato 是「胀鼓鼓的果子」：名字说的就是它的样子。',
 'link': '今天的意思「番茄」就是借入时的本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['jacket'] = {
 'chain': [('Old French', 'jaque', '短上衣；铠衣', '古法语时期'),
           ('Old French', 'jaquet', '短外套', '古法语时期'),
           ('English', 'jacket', '夹克', '15 世纪中期')],
 'fa': '15 世纪中期见载（Etymonline：mid-15c.，义为「男式短衣」）',
 'orig': '短外套',
 'path': [('短外套', '古法语时期', ''),
          ('夹克衫，短上衣', '现代', 'jaque 的指小形：一件短衣。1886 年生「书的护封」义——书穿的「外套」也是 jacket（由衣到封套）')],
 'mech': 'jacket 是「小短衣」：人穿的、书穿的，都是它。',
 'link': '今天的意思「夹克」就是本义，一路没变。',
 'disp': 'jaque 本身两说：或出人名 Jacques（法国农民的通称，谓农民的短衣），或出 jaque de mailles「锁子甲衣」（经西班牙语 jaco 出阿拉伯语 shakk「胸甲」）；牛津作「origin uncertain, perhaps based on Arabic」，本档止于古法语层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['delicious'] = {
 'chain': [('Latin', 'delicere', '引诱；勾起兴味', '拉丁语时期'),
           ('Latin', 'dēliciae', '欢愉；美味', '拉丁语时期'),
           ('Late Latin', 'dēliciōsus', '美味的；精致的', '晚期拉丁语时期'),
           ('Old French', 'delicios', '美味的', '古法语时期'),
           ('Middle English', 'delicious', '美味的', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300，义为「极悦感官的」）',
 'orig': '极悦感官的',
 'path': [('极悦感官的', '约 1300 年', ''),
          ('美味的，可口的', '现代', '老根是「勾、引」（de- + lacere「诱」）：勾人兴味的滋味。入英语时泛指一切感官的至乐，后专宠味觉（由泛悦到专指味道）')],
 'mech': 'delicious 是「勾人的」：勾住舌头的，就是美味。',
 'link': '今天的意思「美味的」从「极悦感官」专一化而来。',
 'disp': 'lacere「诱」本身来源未定（Etymonline 明言 uncertain origin），本档止于 delicere 层。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['exercise'] = {
 'chain': [('Latin', 'arcere', '关住；拦阻', '拉丁语时期'),
           ('Latin', 'exercēre', '使忙碌；操练', '拉丁语时期'),
           ('Latin', 'exercitium', '操练；训练', '拉丁语时期'),
           ('Old French', 'exercice', '锻炼', '古法语时期'),
           ('Middle English', 'exercise', '锻炼', '中古英语时期')],
 'fa': '14 世纪中期进入英语（Etymonline：mid-14c.，义为「运作状态；训练」）',
 'orig': '操练；训练',
 'path': [('操练；训练', '拉丁语时期', ''),
          ('活动，锻炼，做操', '现代', 'exercēre 是「不让闲着、使劲操练」（士兵、骑手的训练）：14 世纪晚期英语有「健身活动」义，17 世纪早期又指学校的「练习题」——练身体与练脑子共用一词（由操练到泛指练习）')],
 'mech': 'exercise 是「不让闲着」：兵要操练，身要锻炼，题要练习。',
 'link': '今天的意思「锻炼」就是拉丁语本义，一路没变。',
 'disp': 'exercēre 的原始构想（ex- + arcere 的结合理据）拉丁语内部亦称 obscure（Etymonline 并记），不碍主干。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['picnic'] = {
 'chain': [('French', 'pique-nique', '各带食物的聚餐', '法语近现代'),
           ('English', 'picnic', '野餐', '1748 年')],
 'fa': '1748 年见载（Etymonline：1748，切斯特菲尔德书信）',
 'orig': '各带食物的聚餐',
 'path': [('各带食物的聚餐', '法语近现代', ''),
          ('野餐', '现代', '本义与户外无关：时髦聚餐，人人自带一份菜；约 1800 年后这项活动在英国立足，场景移到户外，「野餐」义定型（由聚餐形式到户外活动）')],
 'mech': 'picnic 是「一人带一道菜」：凑份子的聚餐，搬到草地上就是野餐。',
 'link': '今天的意思「野餐」从「自带食物的聚餐」演变而来：变的是地点，不是吃法。',
 'disp': '法语词内部来源未定（牛津标 of unknown origin；Etymonline 记其名或出 1649 年讽刺诗中的人物 Pique-Nique），本档以法语借词为可证起点。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['cinema'] = {
 'chain': [('Ancient Greek', 'κίνημα (kinēma)', '运动', '古希腊时期'),
           ('French', 'cinématographe', '电影放映机', '1890 年代'),
           ('French', 'cinéma', '电影院', '法语近现代'),
           ('English', 'cinema', '电影院', '1899 年')],
 'fa': '1899 年见载（Etymonline：1899，义为「电影放映厅」）',
 'orig': '电影放映机（活动影像机）',
 'path': [('电影放映机（活动影像机）', '1890 年代', ''),
          ('电影院', '现代', '卢米埃尔兄弟 1890 年代造词：希腊语 kinēma「运动」+ -graphe「记录」——「记下运动的机器」；法语截短作 cinéma，英语 1899 年借入指放映厅，1914 年有「电影（艺术）」总称义（由机器到场所到艺术）')],
 'mech': 'cinema 是「记录运动的机器」：机器的名字，送给了影院和电影本身。',
 'link': '今天的意思「电影院」从机器名转来：放机器的地方，继承了机器的名。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
