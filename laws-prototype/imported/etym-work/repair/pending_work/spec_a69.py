# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['warden'] = {
 'chain': [('Proto-Indo-European', '*wer-', '察觉；警戒', '原始印欧语时期'),
           ('Proto-Germanic', '*wardōną', '看守', '原始日耳曼语时期'),
           ('Frankish', '*warding-', '看守者', '法兰克语时期'),
           ('Middle English', 'wardein', '看守人', '中古英语时期')],
 'fa': '约 1200 年见载（Etymonline：c. 1200，义为「守护者、保卫者」）',
 'orig': '守护者',
 'path': [('守护者', '法兰克语时期', ''),
          ('看守人；管理员；监护人', '现代', '与 guardian 是同源双式：一词走北方 wardein、一词走 gardein，w-/gu- 之分自此始；约 1300 年「监狱长」义（由守护到看守）')],
 'mech': 'warden 是 guardian 的北方兄弟：同根，两种拼法。',
 'link': '今天的意思「看守人」从「守护者」定型而来。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['warranty'] = {
 'chain': [('Old North French', 'warantie', '保障', '古诺曼法语时期'),
           ('Middle English', 'warantye', '保修单', '中古英语时期')],
 'fa': '14 世纪中期见载（Etymonline：mid-14c.，地产交易条款的法律词）',
 'orig': '保障；防护',
 'path': [('保障；防护', '古诺曼法语时期', ''),
          ('保修单；保证，担保', '现代', 'garantie 的北方变体（w-/g- 之分同 warden/guardian）：与 guarantee、guaranty 是同源分枝（借词守恒）')],
 'mech': 'warranty 是 garantie 穿了北方外衣：保的都是同一件事。',
 'link': '今天的意思「担保」就是本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['wilderness'] = {
 'chain': [('Old English', 'wilde', '野生的', '古英语时期'),
           ('Old English', 'dēor', '野兽', '古英语时期'),
           ('Old English', 'wildēornes', '野兽之地', '古英语时期'),
           ('Middle English', 'wildernes', '荒野', '中古英语时期')],
 'fa': '约 1200 年见载（Etymonline：c. 1200，义为「未开垦、只住野兽的土地」）',
 'orig': '野兽之地',
 'path': [('野兽之地', '古英语时期', ''),
          ('荒野；荒地', '现代', '化石复合词：dēor 当时泛指「野兽」（后窄化为「鹿」）：只有野兽住的地方，就是荒野（化石复合）')],
 'mech': 'wilderness 是「野兽的地盘」：deer 那时还是兽的总名。',
 'link': '今天的意思「荒野」就是本义，一路没变。',
 'disp': '构词一说为 wild-deor + 形容词 -en + 属格 -s（Etymonline 并载），牛津主 -ness 说。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['wreath'] = {
 'chain': [('Proto-Indo-European', '*wreyt-', '扭转', '原始印欧语时期'),
           ('Proto-Germanic', '*wrīþô', '缠绕之物', '原始日耳曼语时期'),
           ('Old English', 'wrǣð', '带；绷带', '古英语时期'),
           ('Middle English', 'wrethe', '花环', '中古英语时期')],
 'fa': '中古英语见载（Etymonline：ME wrethe，义为「盘绕成圆之物、扭成的带」）',
 'orig': '缠绕成的带',
 'path': [('缠绕成的带', '原始日耳曼语时期', ''),
          ('花环；花圈', '现代', '字面「绕上去的东西」：1560 年代「花环」义定型；与 writhe 是同源双式，与 wrath 同根（「扭曲」出怒容）（由缠带到花环）')],
 'mech': 'wreath 是「绕成的一圈」：绕的是花，根是「扭」。',
 'link': '今天的意思「花环」就是本义的定型。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}

R = {
 'witch': 'trunk_divergent（主干复核后）：古英语 wicce/wicca/wiccian 一族本身确凿；深层主干三说分歧——Watkins 作日耳曼语 *wikkjaz「唤亡者」出印欧 *weg-「强壮、活跃」；Kroonen/Wiktionary 作 *wikkōną 出 *weyk-「奉献、分离」（与 victima 同根）；Klein/Weekley 另联 wigle「占卜」、wih「神像」、哥特语 weihs「神圣」。OED 作来源未定，Liberman 谓诸说皆有音义之难，无两家互证主干，保持待核',
 'wrap': 'origin_unknown（主干复核后）：中古英语 wrappen「裹、折」，牛津明言 of unknown origin，Etymonline 作 a word of uncertain origin（Watkins 拟或经斯堪的纳维亚语出印欧 *werp-「转、绕」，或为 lap 的变体）；两拟皆带保留，无互证主干，保持待核',
}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
