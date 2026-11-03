# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['move'] = {
 'chain': [('Proto-Indo-European', '*m(y)ewh₁-', '推动；移动', '原始印欧语时期'),
           ('Latin', 'movēre', '移动；推动', '拉丁语时期'),
           ('Old French', 'movoir', '移动', '古法语时期'),
           ('Middle English', 'meven', '移动', '中古英语时期')],
 'fa': '13 世纪晚期进入英语（Etymonline：late 13c. meven）',
 'orig': '移动；推动',
 'path': [('移动；推动', '拉丁语时期', ''),
          ('移动，搬家', '现代', '身体的动与心的动同期入英：13 世纪晚期既有「挪窝」也有「感动、激起」（affect emotionally）；它顶替了本土词 stir 的主位（借词守恒扩展）')],
 'mech': 'move 是「推开」：东西推开了，人感动了，都是 move。',
 'link': '今天的意思「移动」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['pineapple'] = {
 'chain': [('Middle English', 'pinappel', '松果', '中古英语时期'),
           ('English', 'pineapple', '菠萝', '1660 年代')],
 'fa': '14 世纪晚期见载（义为「松果」；Etymonline 与牛津同载）',
 'orig': '松果',
 'path': [('松果', '14 世纪晚期', ''),
          ('菠萝，凤梨', '现代', 'pine + apple 本指松树上鳞片层叠的「果」——松果；1660 年代热带水果因形似松果借了这个名字，原义只好另造 pine-cone（1690 年代）顶上（以形似转指新物，原义让位）')],
 'mech': 'pineapple 先是松果：新水果长得像松果，就把名字借走了。',
 'link': '今天的意思「菠萝」从「松果」转来：像什么，就叫什么。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['painter'] = {
 'chain': [('Latin', 'pingere', '绘画', '拉丁语时期'),
           ('Latin', 'pictor', '画家', '拉丁语时期'),
           ('Old French', 'peintor', '画家', '古法语时期'),
           ('Middle English', 'peyntour', '画家', '中古英语时期')],
 'fa': '14 世纪早期进入英语（Etymonline：early 14c. peintour）',
 'orig': '画家',
 'path': [('画家', '拉丁语时期', ''),
          ('画家；油漆匠', '现代', '经法语借入的拉丁行为人名词（并非英语 paint 现加 -er）：先指作画的艺术家，约 1400 年兼指刷墙的油漆匠（由艺术到手艺）')],
 'mech': 'painter 是拉丁语 pictor 绕道法语来的：拿笔刷的人。',
 'link': '今天的意思「画家；油漆匠」同源：画布上刷，墙上也刷。',
 'disp': '同形词 painter「系船索」来源未定（牛津单列），不在本档。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['waiter'] = {
 'chain': [('Middle English', 'waiter', '看守人；侍者', '中古英语时期')],
 'fa': '14 世纪晚期见载（Etymonline：late 14c.，义为「看守人、探子」）',
 'orig': '看守人；窥伺者',
 'path': [('看守人；窥伺者', '14 世纪晚期', ''),
          ('（餐厅的）男服务员，侍者', '现代', '出 wait 已佚的「守望」一支：先是守夜盯梢的人；后指在主人桌边伺候的仆人（15 世纪晚期，先行于家庭仆役），1660 年代才专指餐馆侍者（由守望到侍奉）')],
 'mech': 'waiter 先是看守的人：守在桌边伺候，就是侍者。',
 'link': '今天的意思「服务员」从「守望者」转来：守的地方换成了餐桌。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}

R = {
 'gardener': 'compositional（主干复核后）：garden 的行为人（或仿古北法语 *gardinier 借/仿造，13 世纪晚期），曾顶替本土 wyrtweard「植物看守」；构件自明，本词不单独立档，保持待核',
 'baker': 'compositional（主干复核后）：bake + -er 行为人名词，古英语 bæcere 已成词（日耳曼语 *bakārijaz）；构件自明，本词不单独立档，保持待核',
 'runner': 'compositional（主干复核后）：run + -er 行为人名词（约 1300 年「步行信使」义、14 世纪早期「赛跑者」义），构件自明，本词不单独立档，保持待核',
 'keeper': 'compositional（主干复核后）：keep + -er 行为人名词（约 1300 年「看守人」义），构件自明，本词不单独立档，保持待核',
}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
