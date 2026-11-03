# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['competition'] = {
 'chain': [('Latin', 'petere', '求取；进攻', '拉丁语时期'),
           ('Latin', 'competere', '一同求取', '拉丁语时期'),
           ('Late Latin', 'competītiō', '角逐；竞争', '晚期拉丁语时期'),
           ('English', 'competition', '比赛，竞赛', '约 1600 年')],
 'fa': '约 1600 年见载（Etymonline：c. 1600，义为「同求一物之争」）',
 'orig': '角逐（古典拉丁语义为「一致」）',
 'path': [('角逐（古典拉丁语义为「一致」）', '晚期拉丁语时期', ''),
          ('比赛，竞赛', '现代', 'com-「一起」+ petere「求取」：同一目标、一起伸手——古典拉丁语 competitio 却作「一致、相合」解，晚期拉丁语翻成「 rival 之争」；1610 年代「竞试」义立（由同求到相争）')],
 'mech': 'competition 是「一块儿伸手抢」：目标只有一个，自然就争。',
 'link': '今天的意思「竞赛」从「同求」翻面而来：古典义竟是「一致」。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['invite'] = {
 'chain': [('Latin', 'invītāre', '邀请；宴请', '拉丁语时期'),
           ('French', 'inviter', '邀请', '法语近现代'),
           ('English', 'invite', '邀请', '1530 年代')],
 'fa': '1530 年代见载（Etymonline：1530s，或为 invitation 的逆构）',
 'orig': '邀请；宴请',
 'path': [('邀请；宴请', '拉丁语时期', ''),
          ('邀请，约请', '现代', '拉丁语 invītāre 兼「请客、款待」：请人来坐下吃饭，就是邀请（借词守恒）')],
 'mech': 'invite 是「请上门」：老义里还管饭。',
 'link': '今天的意思「邀请」就是本义，一路没变。',
 'disp': 'invītāre 本身来源未定（Etymonline 明言 a word of uncertain origin），本档止于拉丁语层；入英路径或经法语、或自 invitation 逆构，并记。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['education'] = {
 'chain': [('Latin', 'dūcere', '引导；带领', '拉丁语时期'),
           ('Latin', 'ēducāre', '养育；培养', '拉丁语时期'),
           ('Latin', 'ēducātiō', '养育；抚养', '拉丁语时期'),
           ('English', 'education', '教育', '1530 年代')],
 'fa': '1530 年代见载（Etymonline：1530s，义为「养育孩子」）',
 'orig': '养育；抚养',
 'path': [('养育；抚养', '拉丁语时期', ''),
          ('教育，培养', '现代', '与 ēdūcere「领出来」同族：把孩子领着、养着、带出本事。原指教养（含训动物），1610 年代「系统学校教育」义立（由养育到教育制度）')],
 'mech': 'education 是「把孩子领出来」：领着长大，就是教育。',
 'link': '今天的意思「教育」从「养育」专业化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['movement'] = {
 'chain': [('Latin', 'movēre', '移动；推动', '拉丁语时期'),
           ('Medieval Latin', 'mōvimentum', '移动', '中世纪拉丁语时期'),
           ('Old French', 'movement', '运动', '古法语时期'),
           ('Middle English', 'mevement', '移动，运动', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「位置的改变」）',
 'orig': '位置的改变（移动）',
 'path': [('位置的改变（移动）', '拉丁语时期', ''),
          ('移动，运动，动作', '现代', 'move 的名词化借词：1776 年音乐「乐章」义（乐曲的一大段「行进」），1828 年政治、社会「运动」义（人群朝着目标移动）（由物理移动到乐章与思潮）')],
 'mech': 'movement 是「动起来」：东西动、人群动、乐曲动，都是它。',
 'link': '今天的意思「运动」物理义与社会义同源：动的方向不同罢了。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['agreement'] = {
 'chain': [('Latin', 'grātus', '令人愉快的', '拉丁语时期'),
           ('Old French', 'agreer', '使合意；同意', '古法语时期'),
           ('Old French', 'agrement', '协议', '古法语时期'),
           ('Middle English', 'agrement', '同意；协议', '中古英语时期')],
 'fa': '约 1400 年见载（Etymonline：c. 1400，义为「相互谅解」）',
 'orig': '相互谅解（合意）',
 'path': [('相互谅解（合意）', '古法语时期', ''),
          ('同意，一致；协议', '现代', '老根是「合口味、称心」（grātus「悦人的」）：你称心、我也称心，就是 agree；15 世纪早期落成文书「协议」（由合意到契约）')],
 'mech': 'agreement 是「彼此称心」：都满意了，才签得成。',
 'link': '今天的意思「协议」从「合意」落纸而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['comfortable'] = {
 'chain': [('Latin', 'fortis', '强壮的', '拉丁语时期'),
           ('Late Latin', 'confortāre', '使坚强；宽慰', '晚期拉丁语时期'),
           ('Old French', 'confortable', '宽慰人的', '古法语时期'),
           ('Middle English', 'comfortable', '舒服的', '中古英语时期')],
 'fa': '14 世纪中期见载（Etymonline：mid-14c.，义为「给予心灵宽慰的」）',
 'orig': '给予宽慰的；使人振作的',
 'path': [('给予宽慰的；使人振作的', '14 世纪中期', ''),
          ('舒服的，舒适的', '现代', '本是主动的「安慰人的」（东西让人宽心），1769 年才有「身体舒适」义，1770 年「安享的状态」——从「它安慰我」翻成「我待着舒服」（施受翻转）')],
 'mech': 'comfortable 先是「会安慰人的」：后来轮到被安慰的人自己舒服。',
 'link': '今天的意思「舒服的」是 18 世纪才翻过来的后来义。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['enjoy'] = {
 'chain': [('Latin', 'gaudēre', '欢喜', '拉丁语时期'),
           ('Old French', 'enjoir', '使欢喜；欢喜', '古法语时期'),
           ('Middle English', 'enjoyen', '享受', '中古英语时期')],
 'fa': '14 世纪晚期进入英语（Etymonline：late 14c.，义为「欢喜」）',
 'orig': '欢喜；使欢喜',
 'path': [('欢喜；使欢喜', '拉丁语时期', ''),
          ('享受…的乐趣；喜爱', '现代', 'en-「使」+ joy：先是（不及物的）「高兴」，15 世纪中期及物「从…中取乐」；方言里甚至有 enjoy bad health 的说法——乐趣义一路磨损（由欢喜到泛用）')],
 'mech': 'enjoy 是「心里有 joy」：乐在其中，就是享受。',
 'link': '今天的意思「享受」从「欢喜」泛化而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {'darkness': 'compositional（主干复核后）：dark + -ness 抽象名词（古英语 deorcnes「无光」），构件自明、本义无转折，本词不单独立档，保持待核'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
