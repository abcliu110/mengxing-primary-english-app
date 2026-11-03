# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['magician'] = {
 'chain': [('Old French', 'magiciien', '巫师；术士', '古法语时期'),
           ('Middle English', 'magicien', '魔术师', '中古英语时期')],
 'fa': '14 世纪晚期见载（Etymonline：late 14c.，义为「精通魔法者」）',
 'orig': '巫师；术士',
 'path': [('巫师；术士', '古法语时期', ''),
          ('魔术师，魔法师', '现代', 'magic 的行家：先是真会「法术」的人，1590 年代生「变戏法者」义——戏法师接管了巫师的名头（由巫术到舞台技艺）')],
 'mech': 'magician 先是巫师：戏法变多了，巫师就成了魔术师。',
 'link': '今天的意思「魔术师」从「术士」转来：法术搬上了舞台。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['magic'] = {
 'chain': [('Old Persian', 'magush', '祭司（玛吉）', '古波斯语时期'),
           ('Ancient Greek', 'μάγος (magos)', '玛吉祭司；巫师', '古希腊时期'),
           ('Ancient Greek', 'μαγική (magikē)', '玛吉的技艺', '古希腊时期'),
           ('Latin', 'magica', '巫术', '拉丁语时期'),
           ('Middle English', 'magik', '魔法', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c. magike）',
 'orig': '玛吉的技艺（巫术）',
 'path': [('玛吉的技艺（巫术）', '古希腊时期', ''),
          ('魔法，魔术', '现代', '波斯祭司 magush 在希腊人眼里是玩神秘技艺的人：magikē (technē)「玛吉之艺」就是魔法；它顶替了本土 wiccecræft；1811 年生「戏法、障眼法」义（由祭祀秘术到舞台幻术）')],
 'mech': 'magic 是「波斯祭司的本事」：外族的秘术，就是魔法。',
 'link': '今天的意思「魔法、魔术」同出此源。',
 'disp': 'magush 或更出印欧语根 *magh-「能够、有力量」（Etymonline 作 possibly），本档以古波斯语为可证起点。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['inventor'] = {
 'chain': [('Latin', 'invenīre', '遇上；发现', '拉丁语时期'),
           ('Latin', 'inventor', '发现者；创制者', '拉丁语时期'),
           ('English', 'inventor', '发明家', '约 1500 年')],
 'fa': '约 1500 年借自拉丁语（Etymonline：c. 1500，义为「发现者」，今佚）',
 'orig': '发现者',
 'path': [('发现者', '拉丁语时期', ''),
          ('发明家', '现代', '与 invent 同步跨界：1550 年代专指「创制出新东西的人」（由发现者到发明者）')],
 'mech': 'inventor 先是「找到东西的人」：后来他开始无中生有。',
 'link': '今天的意思「发明家」从「发现者」转来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['paint'] = {
 'chain': [('Proto-Indo-European', '*peig-', '切；刻痕', '原始印欧语时期'),
           ('Latin', 'pingere', '绘画；刺绣', '拉丁语时期'),
           ('Old French', 'peindre', '绘画', '古法语时期'),
           ('Middle English', 'peynten', '画', '中古英语时期')],
 'fa': '13 世纪中期进入英语（Etymonline：mid-13c. peinten）',
 'orig': '绘画（本为刻画装饰）',
 'path': [('绘画（本为刻画装饰）', '拉丁语时期', ''),
          ('用颜料画；刷油漆；颜料', '现代', '语义链是「刻痕装饰 → 装饰 → 上色装饰」：拉丁语 pingere 兼「画、绣、文身」；英语 14 世纪早期有「涂色于表面」义（由刻到涂）')],
 'mech': 'paint 是「刻花纹」的后代：刻的变成涂的，装饰没变。',
 'link': '今天的意思「画；油漆」从「装饰」定型。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['stranger'] = {
 'chain': [('Latin', 'extrāneus', '外来的；外人', '拉丁语时期'),
           ('Old French', 'estrangier', '外国人', '古法语时期'),
           ('Middle English', 'straunger', '陌生人', '中古英语时期')],
 'fa': '14 世纪晚期见载（Etymonline：late 14c. straunger）',
 'orig': '外国人；外来者',
 'path': [('外国人；外来者', '拉丁语时期', ''),
          ('陌生人，外地人', '现代', 'OF estrangier 的截短（或 strange + -er 的平行构成）：先指「从别国来的人」，15 世纪扩为「圈子外的人」（由国籍之外到关系之外）')],
 'mech': 'stranger 是「外面来的人」：国门外、圈子外，都是外。',
 'link': '今天的意思「陌生人」从「外国人」泛化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['foreign'] = {
 'chain': [('Proto-Indo-European', '*dʰwer-', '门；门口', '原始印欧语时期'),
           ('Latin', 'forās', '在门外；向外', '拉丁语时期'),
           ('Vulgar Latin', '*forānus', '外来者', '通俗拉丁语时期'),
           ('Old French', 'forain', '外来的', '古法语时期'),
           ('Middle English', 'foreyn', '外国的', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300）',
 'orig': '门外的；外来的',
 'path': [('门外的；外来的', '拉丁语时期', ''),
          ('外国的，对外的', '现代', '与 door 同根的「门外」：门外之地、门外之人。拼写里的 g 不发音——16—17 世纪受 reign、sovereign 的类推硬加的（由门外到外国）')],
 'mech': 'foreign 是「大门外头的」：出了门，就是外国。',
 'link': '今天的意思「外国的」就是「门外」义的放大；g 是后来塞进去的哑字母。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['clear'] = {
 'chain': [('Proto-Indo-European', '*kele-', '喊叫', '原始印欧语时期'),
           ('Latin', 'clārus', '响亮的；明亮的；著名的', '拉丁语时期'),
           ('Old French', 'cler', '明亮的；清楚的', '古法语时期'),
           ('Middle English', 'clere', '清楚的', '中古英语时期')],
 'fa': '约 1300 年进入英语（Etymonline：c. 1300 cler）',
 'orig': '响亮的；明亮的',
 'path': [('响亮的；明亮的', '拉丁语时期', ''),
          ('清澈的，晴朗的，清楚的', '现代', '语义链藏着通感：根是「喊」——声音传得开，如同光线散得开（比较英语 loud 形容颜色、德语 hell 兼「明亮、响亮」）。拉丁语 clārus 三义并存：声响、光明、有名（由声到光）')],
 'mech': 'clear 是「喊得响」变的：声音亮堂，眼睛也就亮堂了。',
 'link': '今天的意思「清楚的」是声音与光在词源里会合的结果。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {'stormy': 'compositional（主干复核后）：storm + -y 形容词（古英语晚期 *stormiġ；14 世纪中期已生比喻义「动荡的」），构件自明，本词不单独立档，保持待核'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
