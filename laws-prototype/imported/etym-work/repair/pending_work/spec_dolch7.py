# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['clean'] = {
 'chain': [('Proto-West Germanic', '*klainī', '精致的，细小的；干净的', '原始西日耳曼语时期'),
           ('Old English', 'clǣne', '干净的；纯净的', '古英语时期'),
           ('Middle English', 'clene', '干净的', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 clæne 起头）',
 'orig': '干净的；纯净的',
 'path': [('干净的；纯净的', '古英语时期', ''),
          ('干净的', '现代', '主干义稳定：没脏东西。它的日耳曼亲戚在德语里走成 klein「小」——英语保住了「干净」这一面，德语保住了「细小」那一面（同源分工）')],
 'mech': 'clean 和德语 klein「小」是亲兄弟：一个留下「干净」，一个留下「小」。',
 'link': '今天的意思「干净的」就是最早的意思，一路没变。',
 'disp': '印欧层 *gel-「闪亮」只是推测（Wiktionary 用 perhaps，专家 Boutkan 存疑，见 Etymonline），本档链止于西日耳曼语层，不取推测层。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk', 'ox'], 'grade': 'et_wk_ox'}
S['old'] = {
 'chain': [('Proto-Indo-European', '*h₂el-', '生长；滋养', '原始印欧语时期'),
           ('Proto-Germanic', '*aldaz', '长成的；成年的', '原始日耳曼语时期'),
           ('Old English', 'eald', '老的；年长的', '古英语时期'),
           ('Middle English', 'old', '老的', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 词条以古英语 ald/eald 起头）',
 'orig': '长成的；成年的',
 'path': [('长成的；成年的', '原始日耳曼语时期', ''),
          ('老的；旧的', '现代', '「长成大人」沿时间轴再往前推，就是「活得久」：老的、年长的；再用到没有生命的东西上，就是「旧的」（从人到物的引申）')],
 'mech': 'old 的老根是「长大」：长成了，年头久了，就是老。',
 'link': '今天的意思「老的」从「长成的」顺着时间推来：长大 → 年长 → 老。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['then'] = {
 'chain': [('Proto-Germanic', '*þan', '在那个时候', '原始日耳曼语时期'),
           ('Old English', 'þonne', '在那个时候；那样的话', '古英语时期'),
           ('Middle English', 'thenne', '那时；然后', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 词条以古英语 þanne/þonne 起头）',
 'orig': '在那个时候',
 'path': [('在那个时候', '古英语时期', ''),
          ('那时；然后，接着', '现代', '古英语已有「那样的话（在那种情况下）」；13 世纪晚期添「接着、下一步」——从点出一个时间点，到排事情的先后（词义扩展）')],
 'mech': 'then 出在指示代词「那个」一家：指着那个时间点，就是「那时」。',
 'link': '今天的意思「那时；然后」就是最早的「在那个时候」，一路没变。',
 'disp': 'than 本与 then 同词（Etymonline 注明），后分工：than 管比较，then 管时间。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk', 'ox'], 'grade': 'et_wk_ox'}
S['know'] = {
 'chain': [('Proto-Indo-European', '*ǵneh₃-', '知道', '原始印欧语时期'),
           ('Proto-Germanic', '*knēaną', '知道', '原始日耳曼语时期'),
           ('Old English', 'cnāwan', '知道；认出', '古英语时期'),
           ('Middle English', 'knowen', '知道', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 cnāwan 起头）',
 'orig': '知道；认出',
 'path': [('知道；认出', '古英语时期', ''),
          ('知道，了解，认识', '现代', '义域稳定又宽：认出（见过）、懂得（事实）、会做（技能），英语用一个 know 全包，德语、法语要分两三个词（词义稳定）')],
 'mech': 'know 是印欧语的老动词，拉丁语 gnoscere、希腊语 gignōskein 都是它的亲戚。',
 'link': '今天的意思「知道」就是最早的意思，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['once'] = {
 'chain': [('Old English', 'ǣne', '一次', '古英语时期'),
           ('Old English', 'ānes', '一次（「一」的属格）', '古英语晚期'),
           ('Middle English', 'ones', '一次', '中古英语时期')],
 'fa': '古英语晚期已有 ǣne/ānes；anes 拼法约 1200 年（Etymonline）',
 'orig': '一次',
 'path': [('一次', '中古英语时期', ''),
          ('一次；从前，曾经', '现代', 'once 是 one 的属格（「一的」）转成的副词：数一次 → 只发生一回；中古英语中期再引申「从前（有那么一回）」，回望过去（词义引申）')],
 'mech': 'once = one + 属格 -s：把「一」变成「一次」，是它自己的小变形。',
 'link': '今天的意思「一次」就是最早的意思；「从前」是从「有过一次」回望出来的。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['right'] = {
 'chain': [('Proto-Indo-European', '*h₃reǵ-', '弄直；沿直线行', '原始印欧语时期'),
           ('Proto-Germanic', '*rehtaz', '直的；正直的', '原始日耳曼语时期'),
           ('Old English', 'riht', '直的；正直的，正确的', '古英语时期'),
           ('Middle English', 'riht', '直的；正确的', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 riht 起头）',
 'orig': '直的；正直的',
 'path': [('直的；正直的', '古英语时期', ''),
          ('正确的；右边的', '现代', '「直、不弯」在古英语已引申「合规矩、正确」；方向义「右边」后起——右手是大多数人的「正手、顺手」，于是「正」的一边成了右边（以正定边的引申）')],
 'mech': 'right 的老根是「直」：线直了是直，事对了是正确，手顺了那一边是右。',
 'link': '今天的意思「正确的；右边的」都从「直的」长出来：直 → 正 → 右边。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
